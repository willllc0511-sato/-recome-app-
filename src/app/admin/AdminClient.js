'use client'

import { useState } from 'react'
import AdminShell from './AdminShell'
import ShopSettingsForm from './ShopSettingsForm'
import ReviewTools from './ReviewTools'
import SubscriptionSection from './SubscriptionSection'
import TutorialContent from './TutorialContent'

const HOME_CARDS = [
  { id: 'review_request', icon: '📝', title: '口コミ依頼文を作る', desc: '来店客に口コミを書いてもらう文面を作成' },
  { id: 'revisit', icon: '💌', title: 'また来てねメッセージを作る', desc: '再来店を促すメッセージを設定・確認' },
  { id: 'review_reply', icon: '💬', title: '口コミ返信AI', desc: 'もらった口コミへの返信文を自動生成' },
  { id: 'google_check', icon: '✅', title: '今月のGoogleチェック', desc: '今月やるべき改善を5つ提案' },
]

export default function AdminClient({ shop, shopError, customers }) {
  const [currentPage, setCurrentPage] = useState('home')

  if (shopError) {
    return (
      <AdminShell currentPage={currentPage} onNavigate={setCurrentPage}>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          <p className="font-medium">店舗データの取得に失敗しました</p>
          <p className="mt-1 font-mono">{shopError}</p>
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell currentPage={currentPage} onNavigate={setCurrentPage}>
      {/* ホーム */}
      {currentPage === 'home' && (
        <div className="space-y-5">
          <p className="text-base font-bold text-gray-800">何をしますか？</p>
          <div className="grid grid-cols-2 gap-3">
            {HOME_CARDS.map(card => (
              <button
                key={card.id}
                onClick={() => setCurrentPage(card.id)}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-left hover:border-blue-300 hover:shadow-md transition-all"
              >
                <span className="text-2xl block mb-2">{card.icon}</span>
                <h3 className="text-sm font-bold text-gray-800 mb-1">{card.title}</h3>
                <p className="text-xs text-gray-500">{card.desc}</p>
              </button>
            ))}
          </div>

          {/* 初期設定の誘導 */}
          {shop && !shop.google_review_url && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-4">
              <p className="text-sm font-bold text-yellow-800 mb-1">まずやること</p>
              <p className="text-sm text-yellow-700">
                「店舗設定」からGoogle口コミURLとメッセージを登録してください。
              </p>
              <button
                onClick={() => setCurrentPage('settings')}
                className="mt-2 text-sm text-blue-600 font-medium hover:underline"
              >
                → 店舗設定を開く
              </button>
            </div>
          )}

          {/* 使い方ガイド */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
            <p className="text-sm font-bold text-gray-700 mb-2">使い方</p>
            <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside">
              <li>上のカードをタップして文章を作成</li>
              <li>生成された文章を「コピー」</li>
              <li>Googleビジネスプロフィールや LINEに貼り付けて使う</li>
            </ol>
          </div>
        </div>
      )}

      {/* 店舗設定 */}
      {currentPage === 'settings' && (
        <div className="space-y-4">
          <button onClick={() => setCurrentPage('home')} className="text-sm text-blue-600 hover:underline">← ホーム</button>
          <h2 className="text-xl font-bold text-gray-800">店舗設定</h2>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            {shop ? (
              <ShopSettingsForm shop={shop} />
            ) : (
              <p className="text-sm text-red-500">店舗データがありません</p>
            )}
          </div>
        </div>
      )}

      {/* 口コミ依頼文 */}
      {currentPage === 'review_request' && (
        <div className="space-y-4">
          <button onClick={() => setCurrentPage('home')} className="text-sm text-blue-600 hover:underline">← ホーム</button>
          {shop && <ReviewTools shop={shop} initialTab="review_request" />}
        </div>
      )}

      {/* また来てねメッセージ */}
      {currentPage === 'revisit' && (
        <div className="space-y-4">
          <button onClick={() => setCurrentPage('home')} className="text-sm text-blue-600 hover:underline">← ホーム</button>
          {shop && <ReviewTools shop={shop} initialTab="revisit" />}
        </div>
      )}

      {/* 口コミ返信AI */}
      {currentPage === 'review_reply' && (
        <div className="space-y-4">
          <button onClick={() => setCurrentPage('home')} className="text-sm text-blue-600 hover:underline">← ホーム</button>
          {shop && <ReviewTools shop={shop} initialTab="review_reply" />}
        </div>
      )}

      {/* 今月のGoogleチェック */}
      {currentPage === 'google_check' && (
        <div className="space-y-4">
          <button onClick={() => setCurrentPage('home')} className="text-sm text-blue-600 hover:underline">← ホーム</button>
          {shop && <ReviewTools shop={shop} initialTab="google_check" />}
        </div>
      )}

      {/* お客さん一覧 */}
      {currentPage === 'customers' && (
        <div className="space-y-4">
          <button onClick={() => setCurrentPage('home')} className="text-sm text-blue-600 hover:underline">← ホーム</button>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">お客さん一覧</h2>
            <span className="text-base text-gray-500">{customers.length} 人</span>
          </div>

          {customers.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              まだお客さんのデータがありません
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <table className="w-full text-base">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-5 py-4 font-medium text-gray-600">お名前</th>
                    <th className="text-left px-5 py-4 font-medium text-gray-600">最後に来た日</th>
                    <th className="text-right px-5 py-4 font-medium text-gray-600">来店回数</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4 text-gray-800">{customer.display_name ?? '—'}</td>
                      <td className="px-5 py-4 text-gray-600">
                        {customer.last_visited_at
                          ? new Date(customer.last_visited_at).toLocaleDateString('ja-JP')
                          : '—'}
                      </td>
                      <td className="px-5 py-4 text-right text-gray-800">
                        {customer.visit_count ?? 0} 回
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 契約・お支払い */}
      {currentPage === 'subscription' && (
        <div className="space-y-4">
          <button onClick={() => setCurrentPage('home')} className="text-sm text-blue-600 hover:underline">← ホーム</button>
          <h2 className="text-xl font-bold text-gray-800">契約・お支払い</h2>
          {shop && <SubscriptionSection shopId={shop.id} />}
        </div>
      )}

      {/* 使い方 */}
      {currentPage === 'tutorial' && (
        <div className="space-y-4">
          <button onClick={() => setCurrentPage('home')} className="text-sm text-blue-600 hover:underline">← ホーム</button>
          <h2 className="text-xl font-bold text-gray-800">使い方</h2>
          <TutorialContent />
        </div>
      )}
    </AdminShell>
  )
}
