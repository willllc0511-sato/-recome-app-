'use client'

import { useTransition, useState } from 'react'
import { updateShop } from './actions'

const inputClass = "w-full border border-[#ddd] border-[1.5px] rounded-[8px] px-[12px] py-[10px] text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
const labelClass = "block text-[13px] font-bold text-[#444] mb-1.5"
const divider = <hr className="border-0 border-t border-[#eee]" />

export default function ShopSettingsForm({ shop }) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState(null)

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
    <form onSubmit={handleSubmit} className="space-y-4" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>

      <div>
        <label className={labelClass}>店舗名</label>
        <input
          name="name"
          defaultValue={shop.name ?? ''}
          className={inputClass}
        />
      </div>

      {divider}

      {/* master_prompt は非表示（データは保持） */}
      <input type="hidden" name="master_prompt_current" value={shop.master_prompt ?? ''} />
      <input type="hidden" name="coupon_text_current" value={shop.coupon_text ?? ''} />

      <div>
        <label className={labelClass}>特典・サービス内容</label>
        <input
          name="coupon_text"
          defaultValue={shop.coupon_text ?? ''}
          className={inputClass}
        />
      </div>

      {divider}

      <div>
        <label className={labelClass}>Googleレビューリンク</label>
        <input
          name="google_review_url"
          type="url"
          defaultValue={shop.google_review_url ?? ''}
          className={inputClass}
        />
      </div>

      {divider}

      <div>
        <label className={labelClass}>口コミ依頼メッセージ</label>
        <textarea
          name="review_request_message"
          rows={5}
          defaultValue={shop.review_request_message ?? ''}
          className={`${inputClass} resize-none`}
        />
      </div>

      {divider}

      <div>
        <label className={labelClass}>再来店メッセージの送信タイミング</label>
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-gray-600">最終来店から</span>
          <input
            name="default_notify_days"
            type="number"
            min={1}
            defaultValue={shop.default_notify_days ?? 30}
            className="w-20 border border-[#ddd] border-[1.5px] rounded-[8px] px-[12px] py-[10px] text-[14px] text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="text-[14px] text-gray-600">日後</span>
        </div>
      </div>

      {divider}

      <div>
        <label className={labelClass}>再来店メッセージ</label>
        <textarea
          name="revisit_message_template"
          rows={5}
          defaultValue={shop.revisit_message_template ?? ''}
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="pt-2 flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="disabled:opacity-50 text-white text-[14px] font-bold px-8 py-3 rounded-[10px] transition-opacity"
          style={{ background: 'linear-gradient(135deg, #4a7dff, #3a6aee)' }}
        >
          {isPending ? '保存中...' : '保存する'}
        </button>
        {message && (
          <span className={`text-[14px] ${message.success ? 'text-green-600' : 'text-red-600'}`}>
            {message.message}
          </span>
        )}
      </div>
    </form>
  )
}
