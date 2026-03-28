import Anthropic from '@anthropic-ai/sdk'
import { supabaseAdmin } from '@/lib/supabase'

const CRON_SECRET = process.env.CRON_SECRET
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

/**
 * GET /api/cron/check-customers
 * 再来店が必要な顧客を検出してLINEメッセージを送信するCronジョブ
 */
export async function GET(request) {
  // CRON_SECRET が設定されている場合は認証チェック
  if (CRON_SECRET) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      console.warn('[check-customers] 認証失敗')
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  console.log('[check-customers] 開始')

  // 1. アクティブな顧客を店舗情報付きで取得
  const { data: customers, error } = await supabaseAdmin
    .from('customers')
    .select(
      `id, shop_id, line_user_id, display_name, memo, tags,
       last_visited_at, visit_count, notify_days_override,
       shops ( id, name, line_channel_access_token, default_notify_days, master_prompt, coupon_text )`
    )
    .eq('is_active', true)
    .not('line_user_id', 'is', null)
    .not('last_visited_at', 'is', null)

  if (error) {
    console.error('[check-customers] 顧客取得失敗', error)
    return Response.json({ error: 'データベースエラー' }, { status: 500 })
  }

  // 2. 通知条件を満たす顧客を絞り込む
  const now = new Date()
  const targets = customers.filter((customer) => {
    const notifyDays =
      customer.notify_days_override ?? customer.shops?.default_notify_days ?? 30
    const lastVisited = new Date(customer.last_visited_at)
    const daysSince = (now - lastVisited) / (1000 * 60 * 60 * 24)
    return daysSince >= notifyDays
  })

  console.log(
    `[check-customers] 通知対象: ${targets.length}/${customers.length}件`
  )

  // 3. 対象顧客にメッセージを送信
  const results = await Promise.allSettled(
    targets.map((customer) => processCustomer(customer))
  )

  const succeeded = results.filter((r) => r.status === 'fulfilled').length
  const failed = results.filter((r) => r.status === 'rejected').length

  results.forEach((r, i) => {
    if (r.status === 'rejected') {
      console.error(
        `[check-customers] 処理失敗 customerId=${targets[i].id}`,
        r.reason
      )
    }
  })

  console.log(`[check-customers] 完了 成功=${succeeded} 失敗=${failed}`)

  return Response.json({ processed: targets.length, succeeded, failed })
}

/**
 * 1顧客に対してメッセージ生成→LINE送信→ログ保存を行う
 */
async function processCustomer(customer) {
  const shop = customer.shops
  const lineToken = shop?.line_channel_access_token ?? LINE_CHANNEL_ACCESS_TOKEN

  if (!lineToken) {
    throw new Error('LINE Channel Access Token が未設定です')
  }

  // Claude APIでメッセージ生成
  const message = await generateMessage(customer, shop)

  // LINE Messaging APIで送信
  await sendLineMessage(customer.line_user_id, message, lineToken)

  // message_logs に保存
  await saveMessageLog(customer, message, 'sent', null)
}

/**
 * Claude APIを使って再来店促進メッセージを生成する
 */
async function generateMessage(customer, shop) {
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY })

  const lastVisitedStr = new Date(customer.last_visited_at).toLocaleDateString(
    'ja-JP',
    { year: 'numeric', month: 'long', day: 'numeric' }
  )

  const persona = shop?.master_prompt
    ? `あなたは以下の特徴を持つ美容サロンのスタッフです。\n${shop.master_prompt}`
    : `あなたは美容サロンのスタッフです。丁寧で温かみのある文体でメッセージを書いてください。`

  const lines = [
    `${persona}`,
    ``,
    `以下の顧客情報をもとに、再来店を促す短いLINEメッセージを日本語で生成してください。`,
    ``,
    `顧客情報：`,
    `- 名前: ${customer.display_name ?? 'お客様'}`,
    `- 来店回数: ${customer.visit_count}回`,
    `- 最終来店日: ${lastVisitedStr}`,
  ]

  if (customer.memo) lines.push(`- メモ: ${customer.memo}`)
  if (customer.tags?.length) lines.push(`- タグ: ${customer.tags.join(', ')}`)
  if (shop?.name) lines.push(``, `店舗名: ${shop.name}`)
  if (shop?.coupon_text) lines.push(`クーポン: ${shop.coupon_text}`)

  lines.push(
    ``,
    `メッセージは100〜150文字程度にしてください。メッセージのみを出力し、前置きや説明は不要です。`
  )

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 300,
    messages: [{ role: 'user', content: lines.join('\n') }],
  })

  return response.content[0].text.trim()
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
async function saveMessageLog(customer, content, status, errorMessage) {
  const { error } = await supabaseAdmin.from('message_logs').insert({
    shop_id: customer.shop_id,
    customer_id: customer.id,
    line_user_id: customer.line_user_id,
    message_type: 'text',
    content,
    direction: 'outbound',
    status,
    error_message: errorMessage ?? null,
    metadata: { trigger: 'cron/check-customers' },
  })

  if (error) {
    console.error('[check-customers] ログ保存失敗', { customerId: customer.id, error })
  }
}
