import { getStripe } from '@/lib/stripe'
import { db } from '@/lib/firebase'

export async function POST(request) {
  try {
    const stripe = getStripe()
    const { shopName, email, phone, options } = await request.json()

    if (!shopName || !email) {
      return Response.json({ error: '店名とメールアドレスは必須です' }, { status: 400 })
    }

    // 選択されたオプションを判定
    const isStarterPack = options?.starter_pack === true
    const hasLineSetup = isStarterPack || options?.line_setup === true
    const hasGoogleSetup = isStarterPack || options?.google_setup === true
    const hasHomepage = isStarterPack || options?.homepage === true

    // Firestore に仮shop作成（subscription_status: pending + オプション記録）
    const shopRef = await db.collection('shops').add({
      name: shopName,
      email,
      phone: phone || null,
      subscription_status: 'pending',
      has_line_setup: hasLineSetup,
      has_google_setup: hasGoogleSetup,
      has_homepage: hasHomepage,
      starter_pack: isStarterPack,
      created_at: new Date().toISOString(),
    })

    // Stripe Customer 作成
    const customer = await stripe.customers.create({
      email,
      name: shopName,
      phone: phone || undefined,
      metadata: { shop_id: shopRef.id },
    })

    // shop に stripe_customer_id を保存
    await shopRef.update({ stripe_customer_id: customer.id })

    // line_items 構築
    const lineItems = [
      // 月額プラン（必須）
      { price: process.env.STRIPE_PRICE_MONTHLY, quantity: 1 },
      // 初期費用（1回限り、必須）
      { price: process.env.STRIPE_PRICE_SETUP, quantity: 1 },
    ]

    // オプション追加
    if (isStarterPack) {
      lineItems.push({ price: process.env.STRIPE_PRICE_STARTER_PACK, quantity: 1 })
    } else {
      if (options?.line_setup) {
        lineItems.push({ price: process.env.STRIPE_PRICE_LINE_SETUP, quantity: 1 })
      }
      if (options?.google_setup) {
        lineItems.push({ price: process.env.STRIPE_PRICE_GOOGLE_SETUP, quantity: 1 })
      }
      if (options?.homepage) {
        lineItems.push({ price: process.env.STRIPE_PRICE_HOMEPAGE, quantity: 1 })
      }
    }

    // Checkout Session 作成
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'https://recome-app.vercel.app'

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      line_items: lineItems,
      success_url: `${origin}/signup/complete?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/signup?canceled=1`,
      metadata: {
        shop_id: shopRef.id,
        starter_pack: isStarterPack ? 'true' : 'false',
        has_line_setup: hasLineSetup ? 'true' : 'false',
        has_google_setup: hasGoogleSetup ? 'true' : 'false',
        has_homepage: hasHomepage ? 'true' : 'false',
      },
    })

    return Response.json({ url: session.url, shopId: shopRef.id })
  } catch (err) {
    console.error('checkout error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
