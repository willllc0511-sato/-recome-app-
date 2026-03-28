import { validateSignature } from '@line/bot-sdk'
import { supabaseAdmin } from '@/lib/supabase'

const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN
const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID

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
  const { data: existing, error: selectError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('shop_id', SHOP_ID)
    .eq('line_user_id', lineUserId)
    .maybeSingle()

  if (selectError) {
    console.error('[webhook] 既存顧客チェック失敗', selectError)
    return
  }

  if (existing) {
    console.log('[webhook] 再フォロー: is_active を true に更新', { customerId: existing.id })
    const { error: updateError } = await supabaseAdmin
      .from('customers')
      .update({ is_active: true, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (updateError) console.error('[webhook] 再フォロー更新失敗', updateError)
    else console.log('[webhook] 再フォロー更新成功')
    return
  }

  // 新規顧客として登録
  const { error: insertError } = await supabaseAdmin.from('customers').insert({
    shop_id: SHOP_ID,
    line_user_id: lineUserId,
    display_name: profile?.displayName ?? null,
    metadata: profile
      ? {
          picture_url: profile.pictureUrl ?? null,
          language: profile.language ?? null,
        }
      : {},
  })

  if (insertError) {
    console.error('[webhook] 新規顧客登録失敗', insertError)
  } else {
    console.log('[webhook] 新規顧客登録成功', { lineUserId, displayName: profile?.displayName })
  }
}

/**
 * フォロー解除（unfollow）イベントを処理する
 */
async function handleUnfollowEvent(event) {
  const lineUserId = event.source?.userId
  console.log('[webhook] unfollowイベント受信', { lineUserId })

  if (!lineUserId) return

  const { error } = await supabaseAdmin
    .from('customers')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('shop_id', SHOP_ID)
    .eq('line_user_id', lineUserId)

  if (error) console.error('[webhook] unfollow更新失敗', error)
  else console.log('[webhook] unfollow更新成功', { lineUserId })
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
        default:
          console.log('[webhook] 未処理イベント', { type: event.type })
          return Promise.resolve()
      }
    })
  )

  return new Response('OK', { status: 200 })
}
