import { supabaseAdmin } from '@/lib/supabase'

const CRON_SECRET = process.env.CRON_SECRET

/**
 * GET /api/cron/send-review-requests
 * LINE友だち追加から約1時間後にGoogle口コミ依頼メッセージを送信するCronジョブ
 * Vercel Cronにより毎時0分に実行される
 */
export async function GET(request) {
  // CRON_SECRET が設定されている場合は認証チェック
  if (CRON_SECRET) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      console.warn('[send-review-requests] 認証失敗')
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  console.log('[send-review-requests] 開始')

  // 友だち追加から23〜25時間の顧客を対象にする（毎日3時UTC実行）
  const now = new Date()
  const from = new Date(now.getTime() - 25 * 60 * 60 * 1000).toISOString()
  const to = new Date(now.getTime() - 23 * 60 * 60 * 1000).toISOString()

  // 対象顧客を取得（未送信かつ友だち追加から約1時間経過）
  const { data: customers, error } = await supabaseAdmin
    .from('customers')
    .select(
      `id, shop_id, line_user_id, display_name, created_at,
       shops ( id, line_channel_access_token, google_review_url )`
    )
    .eq('is_active', true)
    .not('line_user_id', 'is', null)
    .is('review_request_sent_at', null)
    .gte('created_at', from)
    .lte('created_at', to)

  if (error) {
    console.error('[send-review-requests] 顧客取得失敗', error)
    return Response.json({ error: 'データベースエラー' }, { status: 500 })
  }

  // google_review_url が設定されている店舗の顧客のみに絞り込む
  const targets = customers.filter((c) => c.shops?.google_review_url)

  console.log(
    `[send-review-requests] 送信対象: ${targets.length}/${customers.length}件`
  )

  const results = await Promise.allSettled(
    targets.map((customer) => processReviewRequest(customer))
  )

  const succeeded = results.filter((r) => r.status === 'fulfilled').length
  const failed = results.filter((r) => r.status === 'rejected').length

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(
        `[send-review-requests] 処理失敗 customerId=${targets[i].id}`,
        r.reason
      )
    }
  })

  console.log(`[send-review-requests] 完了 成功=${succeeded} 失敗=${failed}`)

  return Response.json({ processed: targets.length, succeeded, failed })
}

/**
 * 1顧客に口コミ依頼メッセージを送信し、送信済みフラグを更新する
 */
async function processReviewRequest(customer) {
  const shop = customer.shops
  const lineToken =
    shop?.line_channel_access_token ?? process.env.LINE_CHANNEL_ACCESS_TOKEN

  if (!lineToken) {
    throw new Error('LINE Channel Access Token が未設定です')
  }

  const message = buildReviewMessage(shop.google_review_url)

  await sendLineMessage(customer.line_user_id, message, lineToken)

  // 送信済みフラグを更新（二重送信防止）
  const { error } = await supabaseAdmin
    .from('customers')
    .update({ review_request_sent_at: new Date().toISOString() })
    .eq('id', customer.id)

  if (error) {
    console.error('[send-review-requests] 送信済みフラグ更新失敗', {
      customerId: customer.id,
      error,
    })
  }

  // message_logs に保存
  await saveMessageLog(customer, message)
}

/**
 * 口コミ依頼メッセージ本文を生成する
 */
function buildReviewMessage(googleReviewUrl) {
  return `本日はご来店ありがとうございました！\nよろしければ、Googleで口コミをいただけると嬉しいです🙏\n▼口コミはこちら\n${googleReviewUrl}`
}

/**
 * LINE Messaging API でプッシュメッセージを送信する
 */
async function sendLineMessage(lineUserId, message, accessToken) {
  const res = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      to: lineUserId,
      messages: [{ type: 'text', text: message }],
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`LINE送信失敗: status=${res.status} body=${body}`)
  }
}

/**
 * message_logs テーブルに送信履歴を保存する
 */
async function saveMessageLog(customer, content) {
  const { error } = await supabaseAdmin.from('message_logs').insert({
    shop_id: customer.shop_id,
    customer_id: customer.id,
    line_user_id: customer.line_user_id,
    message_type: 'text',
    content,
    direction: 'outbound',
    status: 'sent',
    metadata: { trigger: 'cron/send-review-requests' },
  })

  if (error) {
    console.error('[send-review-requests] ログ保存失敗', {
      customerId: customer.id,
      error,
    })
  }
}
