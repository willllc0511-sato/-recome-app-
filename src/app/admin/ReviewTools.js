'use client'

import { useState } from 'react'

const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
const labelClass = "block text-base font-bold text-gray-700 mb-2"

const TABS = [
  { id: 'review_request', label: '口コミ依頼文' },
  { id: 'revisit', label: 'また来てねメッセージ' },
  { id: 'review_reply', label: '口コミ返信AI' },
  { id: 'google_check', label: '今月のGoogleチェック' },
]

export default function ReviewTools({ shop }) {
  const [activeTab, setActiveTab] = useState('review_request')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  // 口コミ返信AI用
  const [reviewContent, setReviewContent] = useState('')
  const [rating, setRating] = useState('5')

  // 口コミ依頼文用
  const [businessType, setBusinessType] = useState('')
  const [reason, setReason] = useState('')

  // Googleチェック用
  const [googleCheckEnabled, setGoogleCheckEnabled] = useState(true)

  async function handleGenerate(type) {
    setLoading(true)
    setResult('')
    setCopied(false)

    const now = new Date()
    const currentMonth = `${now.getFullYear()}年${now.getMonth() + 1}月`

    const options = {
      shopName: shop.name || '',
      businessType,
      googleReviewUrl: shop.google_review_url || '',
      thanksMessage: '',
      reason,
      reviewContent,
      rating,
      currentMonth,
    }

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, options }),
      })
      const data = await res.json()
      if (data.error) {
        setResult(`エラー: ${data.error}`)
      } else {
        setResult(data.result)
      }
    } catch (e) {
      setResult(`エラー: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800">口コミ・再来店ツール</h2>

      {/* タブ */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setResult('') }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 口コミ依頼文 */}
      {activeTab === 'review_request' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <p className="text-sm text-gray-600">来店客にGoogle口コミを書いてもらうための依頼文を生成します。</p>
          <div>
            <label className={labelClass}>業種</label>
            <input
              value={businessType}
              onChange={e => setBusinessType(e.target.value)}
              placeholder="例：ラーメン店、美容室、整体院"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>口コミを書いてほしい理由（任意）</label>
            <input
              value={reason}
              onChange={e => setReason(e.target.value)}
              placeholder="例：お店の改善に活かしたい、スタッフの励みになる"
              className={inputClass}
            />
          </div>
          {!shop.google_review_url && (
            <p className="text-sm text-orange-600">※ Google口コミURLが未設定です。上の設定欄で先に登録してください。</p>
          )}
          <button
            onClick={() => handleGenerate('review_request')}
            disabled={loading}
            className="w-full disabled:opacity-50 text-white text-base font-bold py-4 rounded-xl transition-opacity"
            style={{ background: 'linear-gradient(135deg, #4a7dff, #3a6aee)' }}
          >
            {loading ? '生成中...' : '依頼文を生成する'}
          </button>
        </div>
      )}

      {/* また来てねメッセージ */}
      {activeTab === 'revisit' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <p className="text-sm text-gray-600">再来店メッセージは上の「お店設定」で直接編集できます。</p>
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-700 mb-2">現在のメッセージ：</p>
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {shop.revisit_message_template || '（未設定）'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm font-bold text-gray-700 mb-1">設定：</p>
            <p className="text-sm text-gray-600">
              最終来店から <span className="font-bold text-blue-600">{shop.default_notify_days || 30}日後</span> に自動送信
            </p>
          </div>
        </div>
      )}

      {/* 口コミ返信AI */}
      {activeTab === 'review_reply' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <p className="text-sm text-gray-600">お客様の口コミを貼り付けると、返信文を生成します。</p>
          <div>
            <label className={labelClass}>業種</label>
            <input
              value={businessType}
              onChange={e => setBusinessType(e.target.value)}
              placeholder="例：ラーメン店、美容室、整体院"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>星評価</label>
            <div className="flex gap-2">
              {['5', '4', '3', '2', '1'].map(r => (
                <button
                  key={r}
                  onClick={() => setRating(r)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    rating === r
                      ? 'bg-yellow-100 border-yellow-400 border text-yellow-800'
                      : 'bg-gray-100 border border-gray-300 text-gray-600'
                  }`}
                >
                  {'★'.repeat(Number(r))}{'☆'.repeat(5 - Number(r))}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>口コミ本文</label>
            <textarea
              value={reviewContent}
              onChange={e => setReviewContent(e.target.value)}
              rows={4}
              placeholder="お客様の口コミ内容を貼り付けてください"
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            onClick={() => handleGenerate('review_reply')}
            disabled={loading || !reviewContent}
            className="w-full disabled:opacity-50 text-white text-base font-bold py-4 rounded-xl transition-opacity"
            style={{ background: 'linear-gradient(135deg, #4a7dff, #3a6aee)' }}
          >
            {loading ? '生成中...' : '返信文を生成する'}
          </button>
        </div>
      )}

      {/* 今月のGoogleチェック */}
      {activeTab === 'google_check' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">今月やるべきGoogleビジネスプロフィールの改善を提案します。</p>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={googleCheckEnabled}
                onChange={e => setGoogleCheckEnabled(e.target.checked)}
                className="rounded"
              />
              有効
            </label>
          </div>
          {googleCheckEnabled ? (
            <>
              <div>
                <label className={labelClass}>業種</label>
                <input
                  value={businessType}
                  onChange={e => setBusinessType(e.target.value)}
                  placeholder="例：ラーメン店、美容室、整体院"
                  className={inputClass}
                />
              </div>
              <button
                onClick={() => handleGenerate('google_check')}
                disabled={loading}
                className="w-full disabled:opacity-50 text-white text-base font-bold py-4 rounded-xl transition-opacity"
                style={{ background: 'linear-gradient(135deg, #4a7dff, #3a6aee)' }}
              >
                {loading ? '生成中...' : '今月のチェックを生成する'}
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-400 py-4 text-center">Googleチェックはオフになっています</p>
          )}
        </div>
      )}

      {/* 結果表示 */}
      {(result || loading) && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-gray-800">生成結果</h3>
            {result && !loading && (
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                {copied ? '✓ コピーしました' : 'コピーする'}
              </button>
            )}
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-500">AIが文章を作成中...</span>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 rounded-lg p-4 font-sans leading-relaxed">
              {result}
            </pre>
          )}
        </div>
      )}
    </section>
  )
}
