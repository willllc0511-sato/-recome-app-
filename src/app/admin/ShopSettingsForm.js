'use client'

import { useTransition, useState } from 'react'
import { updateShop } from './actions'

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">店名</label>
        <input
          name="name"
          defaultValue={shop.name ?? ''}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          オーナーの人柄・口調の説明
        </label>
        <textarea
          name="master_prompt"
          defaultValue={shop.master_prompt ?? ''}
          rows={4}
          placeholder="例：明るく親しみやすい口調で、お客様を下の名前で呼ぶ。絵文字を適度に使う。"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">
          設定するとこの内容をもとにAIがメッセージを生成します
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">クーポン内容</label>
        <textarea
          name="coupon_text"
          defaultValue={shop.coupon_text ?? ''}
          rows={3}
          placeholder="例：次回ご来店時、トリートメント無料サービス"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">通知日数（日）</label>
        <input
          name="default_notify_days"
          type="number"
          min={1}
          defaultValue={shop.default_notify_days ?? 30}
          className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-400 mt-1">最終来店からこの日数が経過した顧客に通知します</p>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
        >
          {isPending ? '保存中...' : '保存する'}
        </button>
        {message && (
          <span className={`text-sm ${message.success ? 'text-green-600' : 'text-red-600'}`}>
            {message.message}
          </span>
        )}
      </div>
    </form>
  )
}
