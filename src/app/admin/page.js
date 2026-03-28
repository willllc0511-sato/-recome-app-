import { supabaseAdmin } from '@/lib/supabase'

export const revalidate = 0

export default async function AdminPage() {
  const { data: customers, error } = await supabaseAdmin
    .from('customers')
    .select('id, display_name, last_visited_at, visit_count')
    .order('last_visited_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-800">管理画面</h1>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-700">顧客一覧</h2>
          {customers && (
            <span className="text-sm text-gray-500">{customers.length} 件</span>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            データの取得に失敗しました: {error.message}
          </div>
        )}

        {customers && customers.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            顧客データがありません
          </div>
        )}

        {customers && customers.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">名前</th>
                  <th className="text-left px-6 py-3 font-medium text-gray-600">最終来店日</th>
                  <th className="text-right px-6 py-3 font-medium text-gray-600">来店回数</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{customer.display_name ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {customer.last_visited_at
                        ? new Date(customer.last_visited_at).toLocaleDateString('ja-JP')
                        : '—'}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-800">
                      {customer.visit_count ?? 0} 回
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
