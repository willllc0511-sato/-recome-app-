import { db } from '@/lib/firebase'
import AdminClient from './AdminClient'

export const revalidate = 0

const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID

export default async function AdminPage() {
  let shop = null
  let shopError = null
  let customers = []
  let fatalError = null

  try {
    const [shopSnap, customersSnap] = await Promise.all([
      db.collection('shops').doc(SHOP_ID).get(),
      db.collection('customers')
        .where('shop_id', '==', SHOP_ID)
        .orderBy('last_visited_at', 'desc')
        .get(),
    ])

    if (shopSnap.exists) {
      shop = { id: shopSnap.id, ...shopSnap.data() }
    } else {
      shopError = `SHOP_ID (${SHOP_ID}) に一致する店舗が見つかりません`
    }

    customers = customersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    fatalError = e?.message ?? String(e)
  }

  if (fatalError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-lg max-w-xl w-full">
          <p className="font-semibold mb-2">管理画面の読み込みに失敗しました</p>
          <pre className="text-xs whitespace-pre-wrap font-mono">{fatalError}</pre>
          <p className="text-xs mt-3 text-red-500">
            SHOP_ID: {SHOP_ID ?? '未設定'}
          </p>
        </div>
      </div>
    )
  }

  return <AdminClient shop={shop} shopError={shopError} customers={customers} />
}
