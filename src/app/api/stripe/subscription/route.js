import { getStripe } from '@/lib/stripe'
import { db } from '@/lib/firebase'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')

    if (!shopId) {
      return Response.json({ error: '店舗IDが必要です' }, { status: 400 })
    }

    const shopSnap = await db.collection('shops').doc(shopId).get()
    if (!shopSnap.exists) {
      return Response.json({ error: '店舗が見つかりません' }, { status: 404 })
    }

    const shop = shopSnap.data()
    if (!shop.stripe_subscription_id) {
      return Response.json({
        status: shop.subscription_status || 'unknown',
        nextBillingDate: null,
      })
    }

    const stripe = getStripe()
    const subscription = await stripe.subscriptions.retrieve(shop.stripe_subscription_id)

    return Response.json({
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      nextBillingDate: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null,
    })
  } catch (err) {
    console.error('subscription info error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
