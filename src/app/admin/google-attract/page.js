import { db } from '@/lib/firebase'
import GoogleAttractClient from './GoogleAttractClient'

export const revalidate = 0

const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID

export default async function GoogleAttractPage() {
  let shop = null

  try {
    const shopSnap = await db.collection('shops').doc(SHOP_ID).get()
    if (shopSnap.exists) {
      shop = { id: shopSnap.id, ...shopSnap.data() }
    }
  } catch (e) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-lg max-w-xl w-full">
          <p className="font-semibold mb-2">読み込みに失敗しました</p>
          <pre className="text-xs whitespace-pre-wrap font-mono">{e?.message}</pre>
        </div>
      </div>
    )
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <p className="text-red-500">店舗データが見つかりません (SHOP_ID: {SHOP_ID})</p>
      </div>
    )
  }

  return <GoogleAttractClient shop={shop} />
}
