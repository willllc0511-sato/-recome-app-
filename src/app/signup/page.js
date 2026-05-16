'use client'

import { useState } from 'react'

const BRAND_BLUE = '#4ba3d8'

const OPTIONS = [
  { key: 'line_setup', label: 'LINE公式アカウント開設代行', price: 15000 },
  { key: 'google_setup', label: 'Googleビジネスプロフィール開設代行', price: 15000 },
  { key: 'homepage', label: 'ホームページ制作（1ページ）', price: 80000 },
]

const STARTER_PACK_PRICE = 100000
const SETUP_FEE = 10000
const MONTHLY_FEE = 1980

export default function SignupPage() {
  const [form, setForm] = useState({ shopName: '', email: '', phone: '' })
  const [selectedOptions, setSelectedOptions] = useState({
    line_setup: false,
    google_setup: false,
    homepage: false,
  })
  const [starterPack, setStarterPack] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const isCanceled = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('canceled') === '1'

  const optionsTotal = starterPack
    ? STARTER_PACK_PRICE
    : OPTIONS.reduce((sum, opt) => sum + (selectedOptions[opt.key] ? opt.price : 0), 0)

  const initialTotal = SETUP_FEE + optionsTotal

  function handleOptionChange(key) {
    if (starterPack) return
    setSelectedOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function handleStarterPackChange() {
    setStarterPack((prev) => !prev)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          options: starterPack
            ? { starter_pack: true }
            : selectedOptions,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || '申し込みに失敗しました')
      }

      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <a href="/lp">
            <img src="/logo-full.png" alt="また来てね！" className="h-10" />
          </a>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">お申し込み</h1>
        <p className="text-gray-500 mb-8">お店の情報を入力して「決済に進む」を押してください。</p>

        {isCanceled && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-xl px-4 py-3 mb-6 text-sm">
            お支払いがキャンセルされました。もう一度お試しください。
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        {/* 基本プラン */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6">
          <p className="text-sm font-bold text-gray-700 mb-2">基本プラン（必須）</p>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">初期費用（1回のみ）</span>
            <span className="text-base font-bold text-gray-800">{SETUP_FEE.toLocaleString()}円</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">月額利用料</span>
            <span className="text-base font-bold text-gray-800">{MONTHLY_FEE.toLocaleString()}円/月</span>
          </div>
        </div>

        {/* 追加オプション */}
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 mb-4">
          <p className="text-sm font-bold text-gray-700 mb-3">追加オプション（任意）</p>
          {OPTIONS.map((opt) => (
            <label
              key={opt.key}
              className={`flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 cursor-pointer ${
                starterPack ? 'opacity-40 pointer-events-none' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={starterPack || selectedOptions[opt.key]}
                  onChange={() => handleOptionChange(opt.key)}
                  disabled={starterPack}
                  className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
                />
                <span className="text-sm text-gray-700">{opt.label}</span>
              </div>
              <span className="text-sm font-bold text-gray-800 whitespace-nowrap ml-2">{opt.price.toLocaleString()}円</span>
            </label>
          ))}
        </div>

        {/* スターターパック */}
        <div className={`border-2 rounded-xl px-5 py-4 mb-6 transition ${
          starterPack ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
        }`}>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={starterPack}
                onChange={handleStarterPackChange}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
              />
              <div>
                <span className="text-sm font-bold text-gray-800">スターターパック</span>
                <p className="text-xs text-gray-500 mt-0.5">上記オプション全部入り（10,000円おトク）</p>
              </div>
            </div>
            <span className="text-base font-bold text-gray-800 whitespace-nowrap ml-2">{STARTER_PACK_PRICE.toLocaleString()}円</span>
          </label>
        </div>

        {/* 合計金額 */}
        <div className="bg-gray-100 rounded-xl px-5 py-4 mb-8">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">初回お支払い</span>
            <span className="text-lg font-bold text-gray-900">{initialTotal.toLocaleString()}円</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">翌月以降</span>
            <span className="text-base font-bold text-gray-700">{MONTHLY_FEE.toLocaleString()}円/月</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">※ 税別</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">お店の名前</label>
            <input
              type="text"
              required
              value={form.shopName}
              onChange={(e) => setForm({ ...form, shopName: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">メールアドレス</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-base font-bold text-gray-700 mb-2">電話番号（任意）</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white text-lg font-bold py-4 rounded-xl transition hover:opacity-90 disabled:opacity-50"
            style={{ background: BRAND_BLUE }}
          >
            {loading ? '処理中...' : '決済に進む'}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed">
          「決済に進む」を押すと、Stripeの安全な決済画面に移動します。<br />
          カード情報はStripeが管理し、当社では保持しません。
        </p>
      </main>
    </div>
  )
}
