import { getStripe } from '@/lib/stripe'
import { db } from '@/lib/firebase'

export async function POST(request) {
  try {
    const stripe = getStripe()
    const { shopId } = await request.json()

    if (!shopId) {
      return Response.json({ error: '店舗IDが必要です' }, { status: 400 })
    }

    const shopSnap = await db.collection('shops').doc(shopId).get()
    if (!shopSnap.exists) {
      return Response.json({ error: '店舗が見つかりません' }, { status: 404 })
    }

    const shop = shopSnap.data()
    if (!shop.stripe_customer_id) {
      return Response.json({ error: 'Stripe顧客情報がありません' }, { status: 400 })
    }

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'https://recome-app.vercel.app'

    const session = await stripe.billingPortal.sessions.create({
      customer: shop.stripe_customer_id,
      return_url: `${origin}/admin`,
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('portal error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
