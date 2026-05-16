'use client'

import { useState, useEffect } from 'react'

const STATUS_LABELS = {
  active: { label: '有効', color: 'text-green-700 bg-green-50 border-green-200' },
  past_due: { label: '一時停止', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  canceled: { label: '解約済み', color: 'text-red-700 bg-red-50 border-red-200' },
  unpaid: { label: '未払い', color: 'text-red-700 bg-red-50 border-red-200' },
  pending: { label: '手続き中', color: 'text-gray-700 bg-gray-50 border-gray-200' },
}

export default function SubscriptionSection({ shopId }) {
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)

  useEffect(() => {
    fetch(`/api/stripe/subscription?shopId=${shopId}`)
      .then((res) => res.json())
      .then(setInfo)
      .catch(() => setInfo(null))
      .finally(() => setLoading(false))
  }, [shopId])

  async function handlePortal() {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'エラーが発生しました')
      }
    } catch {
      alert('エラーが発生しました')
    } finally {
      setPortalLoading(false)
    }
  }

  const status = info?.cancelAtPeriodEnd ? 'canceled' : (info?.status || 'pending')
  const statusInfo = STATUS_LABELS[status] || STATUS_LABELS.pending

  const nextDate = info?.nextBillingDate
    ? new Date(info.nextBillingDate).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—'

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">契約情報・お支払い</h2>

      {loading ? (
        <p className="text-sm text-gray-400">読み込み中...</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">プラン</span>
              <span className="text-sm font-bold text-gray-800">また来てね！月額プラン</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">月額</span>
              <span className="text-sm font-bold text-gray-800">1,980円（税別）</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">次回請求日</span>
              <span className="text-sm font-bold text-gray-800">{nextDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ステータス</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusInfo.color}`}>
                {info?.cancelAtPeriodEnd ? `解約予定（${nextDate}まで利用可）` : statusInfo.label}
              </span>
            </div>
          </div>

          <button
            onClick={handlePortal}
            disabled={portalLoading}
            className="w-full border border-gray-300 text-gray-700 text-sm font-bold py-3 rounded-xl transition hover:bg-gray-50 disabled:opacity-50"
          >
            {portalLoading ? '処理中...' : 'お支払いと解約の管理'}
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center">
            カード変更・請求履歴・領収書・解約はこちらから
          </p>
        </>
      )}
    </section>
  )
}
