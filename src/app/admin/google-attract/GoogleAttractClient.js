'use client'

import { useState } from 'react'

const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
const labelClass = "block text-base font-bold text-gray-700 mb-2"

const TABS = [
  { id: 'posts', label: 'Google投稿文', icon: '📝' },
  { id: 'review_reply', label: '口コミ返信', icon: '💬' },
  { id: 'profile_check', label: 'プロフィール改善', icon: '✅' },
  { id: 'monthly_plan', label: '月間投稿案', icon: '📅' },
  { id: 'improvement_memo', label: '改善メモ', icon: '📋' },
]

const POST_TYPES = [
  '最新情報投稿',
  '新メニュー・商品紹介投稿',
  '季節キャンペーン投稿',
  '再来店向け投稿',
  'テレビ出演・メディア掲載実績の再利用投稿',
  '雨の日・平日・週末向け投稿',
]

export default function GoogleAttractClient({ shop }) {
  const [activeTab, setActiveTab] = useState('posts')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  // Form state
  const [businessType, setBusinessType] = useState('')
  const [strength, setStrength] = useState('')
  const [target, setTarget] = useState('')
  const [selectedPostTypes, setSelectedPostTypes] = useState(['最新情報投稿', '新メニュー・商品紹介投稿', '再来店向け投稿'])
  const [reviewContent, setReviewContent] = useState('')
  const [rating, setRating] = useState('5')
  const [currentStatus, setCurrentStatus] = useState('')
  const [month, setMonth] = useState('')
  const [challenge, setChallenge] = useState('')

  async function handleGenerate() {
    setLoading(true)
    setResult('')
    setCopied(false)

    const options = { businessType, strength, target }

    if (activeTab === 'posts') {
      options.postTypes = selectedPostTypes
    } else if (activeTab === 'review_reply') {
      options.reviewContent = reviewContent
      options.rating = rating
    } else if (activeTab === 'profile_check') {
      options.currentStatus = currentStatus
    } else if (activeTab === 'monthly_plan') {
      options.month = month
    } else if (activeTab === 'improvement_memo') {
      options.challenge = challenge
    }

    try {
      const res = await fetch('/api/google-attract/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: activeTab, options }),
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

  function togglePostType(type) {
    setSelectedPostTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1>
            <img src="/logo-full.png" alt="また来てね！" style={{ height: '56px' }} />
          </h1>
          <a
            href="/admin"
            className="text-sm text-blue-600 hover:underline"
          >
            ← 管理画面に戻る
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* タイトル */}
        <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-5">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Google集客サポート</h2>
          <p className="text-sm text-gray-600">
            Googleマップで見つけてもらい、来店理由を作る投稿文を作成します。
          </p>
        </div>

        {/* 店舗基本情報入力 */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-800">店舗情報（生成の参考にします）</h3>
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
            <label className={labelClass}>強み・特徴</label>
            <input
              value={strength}
              onChange={e => setStrength(e.target.value)}
              placeholder="例：自家製麺、駅徒歩3分、キッズスペースあり"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>ターゲット客層</label>
            <input
              value={target}
              onChange={e => setTarget(e.target.value)}
              placeholder="例：30代女性、ファミリー、ビジネスマン"
              className={inputClass}
            />
          </div>
        </section>

        {/* タブ切り替え */}
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
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* タブごとの追加入力 */}
        <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
          {activeTab === 'posts' && (
            <>
              <h3 className="text-base font-bold text-gray-800">投稿タイプを選択</h3>
              <div className="flex flex-wrap gap-2">
                {POST_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => togglePostType(type)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedPostTypes.includes(type)
                        ? 'bg-blue-100 border-blue-400 border text-blue-800'
                        : 'bg-gray-100 border border-gray-300 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {selectedPostTypes.includes(type) ? '✓ ' : ''}{type}
                  </button>
                ))}
              </div>
            </>
          )}

          {activeTab === 'review_reply' && (
            <>
              <h3 className="text-base font-bold text-gray-800">口コミ内容を入力</h3>
              <div>
                <label className={labelClass}>星評価</label>
                <select
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  className={inputClass}
                >
                  <option value="5">★★★★★（5）</option>
                  <option value="4">★★★★☆（4）</option>
                  <option value="3">★★★☆☆（3）</option>
                  <option value="2">★★☆☆☆（2）</option>
                  <option value="1">★☆☆☆☆（1）</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>口コミ本文</label>
                <textarea
                  value={reviewContent}
                  onChange={e => setReviewContent(e.target.value)}
                  rows={4}
                  placeholder="お客様の口コミ内容をコピペしてください"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </>
          )}

          {activeTab === 'profile_check' && (
            <>
              <h3 className="text-base font-bold text-gray-800">現在の設定状況</h3>
              <div>
                <label className={labelClass}>今のプロフィールの状況を教えてください</label>
                <textarea
                  value={currentStatus}
                  onChange={e => setCurrentStatus(e.target.value)}
                  rows={3}
                  placeholder="例：写真は5枚だけ、営業時間は設定済み、説明文は未記入"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </>
          )}

          {activeTab === 'monthly_plan' && (
            <>
              <h3 className="text-base font-bold text-gray-800">月間スケジュール設定</h3>
              <div>
                <label className={labelClass}>対象月</label>
                <input
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  placeholder="例：2026年6月"
                  className={inputClass}
                />
              </div>
            </>
          )}

          {activeTab === 'improvement_memo' && (
            <>
              <h3 className="text-base font-bold text-gray-800">改善メモ設定</h3>
              <div>
                <label className={labelClass}>現在の課題</label>
                <textarea
                  value={challenge}
                  onChange={e => setChallenge(e.target.value)}
                  rows={3}
                  placeholder="例：口コミが少ない、検索で上位に出ない、投稿が続かない"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </>
          )}

          {/* 生成ボタン */}
          <div className="pt-2">
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full disabled:opacity-50 text-white text-base font-bold px-10 py-4 rounded-xl transition-opacity"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
            >
              {loading ? '生成中...' : 'AIで生成する'}
            </button>
          </div>
        </section>

        {/* 結果表示 */}
        {(result || loading) && (
          <section className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-500">AIが文章を作成中...</span>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 rounded-lg p-4 font-sans leading-relaxed">
                  {result}
                </pre>
              </div>
            )}
          </section>
        )}

        {/* 使い方メモ */}
        <section className="bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-4">
          <h3 className="text-sm font-bold text-yellow-800 mb-2">使い方</h3>
          <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
            <li>上部に店舗情報を入力する（毎回自動保存はされません）</li>
            <li>タブで生成したい内容を選ぶ</li>
            <li>「AIで生成する」を押す</li>
            <li>生成された文章を「コピーする」でコピー</li>
            <li>Googleビジネスプロフィールに貼り付けて投稿</li>
          </ol>
        </section>
      </main>
    </div>
  )
}
