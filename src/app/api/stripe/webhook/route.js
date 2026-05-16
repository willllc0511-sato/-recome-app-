import { getStripe } from '@/lib/stripe'
import { db } from '@/lib/firebase'
import nodemailer from 'nodemailer'

export async function POST(request) {
  const stripe = getStripe()
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return Response.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const shopId = session.metadata?.shop_id
        if (!shopId) break

        const subscriptionId = session.subscription
        const customerId = session.customer

        // オプション情報をmetadataから取得して保存
        const updateData = {
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          subscription_status: 'active',
          subscription_started_at: new Date().toISOString(),
        }

        // metadataにオプション情報があれば上書き保存
        if (session.metadata?.starter_pack) {
          updateData.starter_pack = session.metadata.starter_pack === 'true'
          updateData.has_line_setup = session.metadata.has_line_setup === 'true'
          updateData.has_google_setup = session.metadata.has_google_setup === 'true'
          updateData.has_homepage = session.metadata.has_homepage === 'true'
        }

        await db.collection('shops').doc(shopId).update(updateData)

        // 管理画面URLとログイン情報をメール送信
        const shopSnap = await db.collection('shops').doc(shopId).get()
        const shop = shopSnap.data()

        if (shop?.email) {
          await sendWelcomeEmail(shop.email, shop.name, shopId, shop)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        const customerId = subscription.customer

        const shopSnap = await db.collection('shops')
          .where('stripe_customer_id', '==', customerId)
          .limit(1)
          .get()

        if (!shopSnap.empty) {
          await shopSnap.docs[0].ref.update({
            subscription_status: subscription.status,
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        const customerId = subscription.customer

        const shopSnap = await db.collection('shops')
          .where('stripe_customer_id', '==', customerId)
          .limit(1)
          .get()

        if (!shopSnap.empty) {
          await shopSnap.docs[0].ref.update({
            subscription_status: 'canceled',
          })
        }
        break
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }

  return Response.json({ received: true })
}

async function sendWelcomeEmail(to, shopName, shopId, shop) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const adminUrl = `https://recome-app.vercel.app/admin`

  // 購入オプションの一覧を作成
  const purchasedOptions = []
  if (shop.starter_pack) {
    purchasedOptions.push('スターターパック（LINE開設代行・Googleビジネスプロフィール開設代行・ホームページ制作）')
  } else {
    if (shop.has_line_setup) purchasedOptions.push('LINE公式アカウント開設代行')
    if (shop.has_google_setup) purchasedOptions.push('Googleビジネスプロフィール開設代行')
    if (shop.has_homepage) purchasedOptions.push('ホームページ制作（1ページ）')
  }

  const optionsHtml = purchasedOptions.length > 0
    ? `<h3>ご購入オプション</h3><ul>${purchasedOptions.map(o => `<li>${o}</li>`).join('')}</ul><p style="font-size: 13px; color: #666;">オプションの作業は順次ご連絡いたします。</p><hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />`
    : ''

  await transporter.sendMail({
    from: `"また来てね！" <${process.env.SMTP_FROM_EMAIL}>`,
    to,
    subject: '【また来てね！】お申し込みありがとうございます',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #4ba3d8;">お申し込みありがとうございます</h2>
        <p><strong>${shopName}</strong> 様</p>
        <p>「また来てね！」へのお申し込みが完了しました。</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        ${optionsHtml}
        <h3>管理画面</h3>
        <p>以下のURLから管理画面にアクセスできます。</p>
        <p><a href="${adminUrl}" style="color: #4ba3d8;">${adminUrl}</a></p>
        <p style="font-size: 13px; color: #666;">店舗ID: ${shopId}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p>初期設定のサポートが必要な場合は、お気軽にご連絡ください。</p>
        <p style="font-size: 13px; color: #999;">合同会社Will<br/>090-2664-0511<br/>sa-taki@will0511.com</p>
      </div>
    `,
  })
}
