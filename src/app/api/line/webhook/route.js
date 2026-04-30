import { validateSignature } from '@line/bot-sdk'
import { db } from '@/lib/firebase'

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN
const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID

async function sendLineMessage(lineUserId, text, accessToken) {
  const res = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      to: lineUserId,
      messages: [{ type: 'text', text }],
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`LINE送信失敗: status=${res.status} body=${body}`)
  }
}

/**
 * LINEプロフィールを取得する
 */
async function getLineProfile(userId) {
  const res = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    },
  })
  if (!res.ok) {
    console.error('[webhook] プロフィール取得失敗', { userId, status: res.status })
    return null
  }
  return res.json()
}

/**
 * shop_id + line_user_id で既存顧客を検索する
 */
async function findCustomerByLineUserId(lineUserId) {
  const snap = await db.collection('customers')
    .where('shop_id', '==', SHOP_ID)
    .where('line_user_id', '==', lineUserId)
    .limit(1)
    .get()
  if (snap.empty) return null
  const doc = snap.docs[0]
  return { id: doc.id, ...doc.data() }
}

/**
 * 友だち追加（follow）イベントを処理する
 */
async function handleFollowEvent(event) {
  const lineUserId = event.source?.userId
  console.log('[webhook] followイベント受信', { lineUserId })

  if (!lineUserId) {
    console.error('[webhook] followイベント: userId が取得できませんでした')
    return
  }

  // プロフィール取得
  const profile = await getLineProfile(lineUserId)
  console.log('[webhook] プロフィール取得結果', { displayName: profile?.displayName ?? null })

  // 既存顧客チェック（重複登録防止）
  const existing = await findCustomerByLineUserId(lineUserId)

  if (existing) {
    console.log('[webhook] 再フォロー: is_active を true に更新', { customerId: existing.id })
    try {
      await db.collection('customers').doc(existing.id).update({
        is_active: true,
        updated_at: new Date().toISOString(),
      })
      console.log('[webhook] 再フォロー更新成功')
    } catch (e) {
      console.error('[webhook] 再フォロー更新失敗', e)
    }
    return
  }

  // 新規顧客として登録
  try {
    await db.collection('customers').add({
      shop_id: SHOP_ID,
      line_user_id: lineUserId,
      display_name: profile?.displayName ?? null,
      metadata: profile
        ? {
            picture_url: profile.pictureUrl ?? null,
            language: profile.language ?? null,
          }
        : {},
      is_active: true,
      visit_count: 0,
      last_visited_at: null,
      review_request_sent_at: null,
      review_rating: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    console.log('[webhook] 新規顧客登録成功', { lineUserId, displayName: profile?.displayName })
  } catch (e) {
    console.error('[webhook] 新規顧客登録失敗', e)
  }
}

/**
 * postbackイベント（星評価回答）を処理する
 */
async function handlePostbackEvent(event) {
  const lineUserId = event.source?.userId
  if (!lineUserId) return

  const params = new URLSearchParams(event.postback?.data ?? '')
  if (params.get('action') !== 'review_rating') return

  const rating = params.get('rating')
  if (!['good', 'normal', 'bad'].includes(rating)) return

  console.log('[webhook] postback: 評価受信', { lineUserId, rating })

  // 顧客情報を取得
  const customer = await findCustomerByLineUserId(lineUserId)
  if (!customer) {
    console.error('[webhook] postback: 顧客取得失敗', { lineUserId })
    return
  }

  // 店舗情報を取得
  const shopSnap = await db.collection('shops').doc(SHOP_ID).get()
  const shop = shopSnap.exists ? shopSnap.data() : null

  // 評価を保存
  try {
    await db.collection('customers').doc(customer.id).update({
      review_rating: rating,
      review_rating_responded_at: new Date().toISOString(),
    })
  } catch (e) {
    console.error('[webhook] postback: 評価保存失敗', e)
  }

  const lineToken = shop?.line_channel_access_token ?? CHANNEL_ACCESS_TOKEN

  if (rating === 'good' || rating === 'normal') {
    // 好評価 → Googleレビューリンクを送信
    const googleUrl = shop?.google_review_url
    const message = googleUrl
      ? `ありがとうございます！\nぜひGoogleで口コミをお願いします🙏\n▼口コミはこちら\n${googleUrl}`
      : 'ありがとうございます！またのご来店をお待ちしております😊'
    await sendLineMessage(lineUserId, message, lineToken)
    console.log('[webhook] postback: 好評価 → Googleレビューリンク送信', { lineUserId, rating })
  } else {
    // 低評価 → お礼メッセージ + 店舗オーナーへ通知
    await sendLineMessage(
      lineUserId,
      '貴重なご意見ありがとうございます。今後の改善に活かさせていただきます。',
      lineToken
    )
    if (shop?.owner_line_user_id) {
      const name = customer.display_name ?? 'お客様'
      const notify = `【口コミ通知】\n${name}さんから「ご意見がある」の評価がありました。\n改善が必要な点をご確認ください。`
      await sendLineMessage(shop.owner_line_user_id, notify, lineToken)
        .catch((e) => console.error('[webhook] postback: オーナー通知失敗', e))
    }
    console.log('[webhook] postback: 低評価 → お礼メッセージ＋オーナー通知', { lineUserId })
  }
}

/**
 * フォロー解除（unfollow）イベントを処理する
 */
async function handleUnfollowEvent(event) {
  const lineUserId = event.source?.userId
  console.log('[webhook] unfollowイベント受信', { lineUserId })

  if (!lineUserId) return

  const customer = await findCustomerByLineUserId(lineUserId)
  if (!customer) {
    console.error('[webhook] unfollow: 顧客が見つかりません', { lineUserId })
    return
  }

  try {
    await db.collection('customers').doc(customer.id).update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    console.log('[webhook] unfollow更新成功', { lineUserId })
  } catch (e) {
    console.error('[webhook] unfollow更新失敗', e)
  }
}

/**
 * POST /api/line/webhook
 */
export async function POST(request) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-line-signature')

  // 署名検証
  if (!signature || !validateSignature(rawBody, CHANNEL_SECRET, signature)) {
    console.warn('[webhook] 署名検証失敗')
    return new Response('Unauthorized', { status: 401 })
  }

  let body
  try {
    body = JSON.parse(rawBody)
  } catch {
    console.error('[webhook] JSONパース失敗', rawBody)
    return new Response('Bad Request', { status: 400 })
  }

  console.log('[webhook] イベント受信', { eventCount: body.events?.length ?? 0 })

  // イベントを並列処理
  await Promise.all(
    (body.events ?? []).map((event) => {
      switch (event.type) {
        case 'follow':
          return handleFollowEvent(event)
        case 'unfollow':
          return handleUnfollowEvent(event)
        case 'postback':
          return handlePostbackEvent(event)
        default:
          console.log('[webhook] 未処理イベント', { type: event.type })
          return Promise.resolve()
      }
    })
  )

  return new Response('OK', { status: 200 })
}
