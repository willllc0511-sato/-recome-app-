'use client'

import { useTransition, useState } from 'react'
import { updateShop } from './actions'

const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
const labelClass = "block text-base font-bold text-gray-700 mb-2"

function Section({ title, children }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 space-y-4">
      <h3 className="text-base font-bold text-gray-800">{title}</h3>
      {children}
    </div>
  )
}

export default function ShopSettingsForm({ shop }) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState(null)
  const [reviewMsg, setReviewMsg] = useState(shop.review_request_message ?? '')
  const [revisitMsg, setRevisitMsg] = useState(shop.revisit_message_template ?? '')

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    startTransition(async () => {
      const result = await updateShop(shop.id, formData)
      setMessage(result)
      setTimeout(() => setMessage(null), 3000)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>

      {/* master_prompt は非表示（データは保持） */}
      <input type="hidden" name="master_prompt_current" value={shop.master_prompt ?? ''} />
      <input type="hidden" name="coupon_text_current" value={shop.coupon_text ?? ''} />

      {/* 基本情報 */}
      <Section title="基本情報">
        <div>
          <label className={labelClass}>店名</label>
          <input
            name="name"
            defaultValue={shop.name ?? ''}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Google口コミページのURL</label>
          <input
            name="google_review_url"
            type="url"
            defaultValue={shop.google_review_url ?? ''}
            className={inputClass}
          />
        </div>
      </Section>

      {/* お店の特徴 */}
      <Section title="お店の特徴">
        <div>
          <label className={labelClass}>強み・特徴</label>
          <textarea
            name="shop_features"
            rows={3}
            defaultValue={shop.shop_features ?? ''}
            placeholder="例：自家製麺が自慢、駅徒歩3分、キッズスペースあり、20年の実績"
            className={`${inputClass} resize-none`}
          />
          <p className="text-xs text-gray-400 mt-1">口コミ依頼文や返信文の生成に使われます</p>
        </div>
      </Section>

      {/* メッセージ設定 */}
      <Section title="メッセージ設定">
        <div>
          <label className={labelClass}>口コミお願いメッセージ</label>
          <textarea
            name="review_request_message"
            rows={4}
            value={reviewMsg}
            onChange={(e) => setReviewMsg(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div>
          <label className={labelClass}>何日後に再来店メッセージを送るか</label>
          <div className="flex items-center gap-3">
            <span className="text-base text-gray-600">最終来店から</span>
            <input
              name="default_notify_days"
              type="number"
              min={1}
              defaultValue={shop.default_notify_days ?? 30}
              className="w-24 border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="text-base text-gray-600">日後</span>
          </div>
        </div>
        <div>
          <label className={labelClass}>再来店メッセージ</label>
          <textarea
            name="revisit_message_template"
            rows={4}
            value={revisitMsg}
            onChange={(e) => setRevisitMsg(e.target.value)}
            className={`${inputClass} resize-none`}
          />
        </div>
      </Section>

      {/* クーポン・サービス */}
      <Section title="クーポン・サービス">
        <div>
          <label className={labelClass}>再来店クーポン・サービス内容</label>
          <input
            name="coupon_text"
            defaultValue={shop.coupon_text ?? ''}
            className={inputClass}
          />
        </div>
      </Section>

      {/* プレビュー */}
      {(reviewMsg || revisitMsg) && (
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="text-base font-bold text-gray-700 mb-3">お客さんにはこう届きます</h3>
          <div className="bg-blue-50 rounded-2xl p-5 space-y-5">
            {reviewMsg && (
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">口コミお願いメッセージ</p>
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">店</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm max-w-xs">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{reviewMsg}</p>
                  </div>
                </div>
              </div>
            )}
            {revisitMsg && (
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">再来店メッセージ</p>
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">店</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm max-w-xs">
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{revisitMsg}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pt-4 flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="disabled:opacity-50 text-white text-base font-bold px-10 py-4 rounded-xl transition-opacity"
          style={{ background: 'linear-gradient(135deg, #4a7dff, #3a6aee)' }}
        >
          {isPending ? '保存中...' : '設定を保存する'}
        </button>
        {message && (
          <span className={`text-base ${message.success ? 'text-green-600' : 'text-red-600'}`}>
            {message.message}
          </span>
        )}
      </div>
    </form>
  )
}
