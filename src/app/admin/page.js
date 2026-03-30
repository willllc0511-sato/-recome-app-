import { supabaseAdmin } from '@/lib/supabase'
import ShopSettingsForm from './ShopSettingsForm'

export const revalidate = 0

const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID

export default async function AdminPage() {
  let shop = null
  let shopError = null
  let customers = []
  let customersError = null
  let fatalError = null

  try {
    const [shopResult, customersResult] = await Promise.all([
      supabaseAdmin
        .from('shops')
        .select('id, name, master_prompt, coupon_text, default_notify_days, google_review_url')
        .eq('id', SHOP_ID)
        .single(),
      supabaseAdmin
        .from('customers')
        .select('id, display_name, last_visited_at, visit_count')
        .eq('shop_id', SHOP_ID)
        .order('last_visited_at', { ascending: false }),
    ])
    shop = shopResult.data
    shopError = shopResult.error
    customers = customersResult.data ?? []
    customersError = customersResult.error
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
            SHOP_ID: {SHOP_ID ?? '未設定'} / Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ?? '未設定'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 px-6 py-4">
        <h1 className="text-2xl font-bold text-white">Link 管理画面</h1>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">

        {/* お店設定 */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-6">お店設定</h2>
          {shopError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
              <p className="font-medium">店舗データの取得に失敗しました</p>
              <p className="mt-1 font-mono">{shopError.message}</p>
            </div>
          )}
          {shop ? (
            <ShopSettingsForm shop={shop} />
          ) : !shopError ? (
            <p className="text-sm text-red-500">
              SHOP_ID ({SHOP_ID}) に一致する店舗が見つかりません
            </p>
          ) : null}
        </section>

        {/* 顧客一覧 */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-700">顧客一覧</h2>
            {customers && (
              <span className="text-base text-gray-500">{customers.length} 件</span>
            )}
          </div>

          {customersError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              データの取得に失敗しました: {customersError.message}
            </div>
          )}

          {customers && customers.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              顧客データがありません
            </div>
          )}

          {customers && customers.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full text-base">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 font-medium text-gray-600">名前</th>
                    <th className="text-left px-6 py-4 font-medium text-gray-600">最終来店日</th>
                    <th className="text-right px-6 py-4 font-medium text-gray-600">来店回数</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-5 text-gray-800">{customer.display_name ?? '—'}</td>
                      <td className="px-6 py-5 text-gray-600">
                        {customer.last_visited_at
                          ? new Date(customer.last_visited_at).toLocaleDateString('ja-JP')
                          : '—'}
                      </td>
                      <td className="px-6 py-5 text-right text-gray-800">
                        {customer.visit_count ?? 0} 回
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </main>
    </div>
  )
}
