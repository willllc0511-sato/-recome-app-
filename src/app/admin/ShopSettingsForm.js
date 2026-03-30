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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-bold text-gray-700 mb-2">店名</label>
        <input
          name="name"
          defaultValue={shop.name ?? ''}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* master_prompt は非表示（データは保持） */}
      <input type="hidden" name="master_prompt_current" value={shop.master_prompt ?? ''} />

      <div>
        <label className="block text-lg font-bold text-gray-700 mb-2">クーポン内容</label>
        <input type="hidden" name="coupon_text_current" value={shop.coupon_text ?? ''} />
        <textarea
          name="coupon_text"
          rows={3}
          placeholder={shop.coupon_text ?? '例：次回ご来店時、トリートメント無料サービス'}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        {shop.coupon_text && (
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input type="checkbox" name="coupon_text_clear" value="1" className="w-5 h-5 rounded" />
            <span className="text-base text-red-500">現在の設定を削除する</span>
          </label>
        )}
        <p className="mt-2 text-base text-gray-500">設定するとメッセージにクーポン情報を含めて送信します</p>
      </div>

      <div>
        <label className="block text-lg font-bold text-gray-700 mb-2">Googleレビューリンク</label>
        <input
          name="google_review_url"
          type="url"
          defaultValue={shop.google_review_url ?? ''}
          placeholder="例：https://g.page/r/xxxxxxxxxxxxxxxx/review"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-base text-gray-500">設定するとLINE友だち追加から約1時間後に口コミ依頼メッセージを1回だけ自動送信します</p>
      </div>

      <div>
        <label className="block text-lg font-bold text-gray-700 mb-2">
          再来店メッセージを送るタイミング
        </label>
        <div className="flex items-center gap-3">
          <span className="text-lg text-gray-600">最終来店から</span>
          <input
            name="default_notify_days"
            type="number"
            min={1}
            defaultValue={shop.default_notify_days ?? 30}
            className="w-24 border border-gray-300 rounded-lg px-4 py-3 text-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-lg text-gray-600">日後</span>
        </div>
        <p className="mt-2 text-base text-gray-500">最終来店日からこの日数が経過した顧客に、AIが作成した再来店メッセージを自動送信します。同じ顧客には同じ間隔で繰り返し送信されます。</p>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-lg font-medium px-8 py-4 rounded-lg transition-colors min-h-[52px]"
        >
          {isPending ? '保存中...' : '保存する'}
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
