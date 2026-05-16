'use client'

import { useState, useEffect } from 'react'

const steps = [
  {
    emoji: '✏️',
    title: 'お店の情報を入れる',
    body: '店名、再来店クーポン、Google口コミページのURL、口コミお願いメッセージ、再来店メッセージを入力して「設定を保存する」を押します。',
  },
  {
    emoji: '📱',
    title: 'QRコードをお店に置く',
    body: '保存できたら、お店の入口やレジ横にQRコードを置きます。お客さんがそれを読むとLINE友だちに追加されます。',
  },
  {
    emoji: '🤖',
    title: 'あとは自動で動きます',
    body: null,
    list: [
      { label: '来店直後', text: 'お礼と特典のメッセージが届きます' },
      { label: '約1日後', text: '感想を聞くメッセージが届きます（Google口コミへの誘導もこのとき）' },
      { label: '設定した日数後', text: '「またお待ちしております」のメッセージが届きます' },
    ],
  },
  {
    emoji: '📢',
    title: 'Google集客サポートを使う',
    body: null,
    list: [
      { label: '投稿文の作成', text: 'Googleビジネスプロフィールに投稿する文章をAIが作成します' },
      { label: '口コミ返信', text: 'お客様の口コミに合った返信文を生成します' },
      { label: '月間スケジュール', text: '1ヶ月分の投稿計画を自動で作れます' },
    ],
  },
  {
    emoji: '💬',
    title: '困ったときは',
    body: '画面下に「お問い合わせ」のリンクがあります。何かあったらそこから連絡できます。',
  },
]

export default function TutorialModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border border-blue-500 text-blue-600 hover:bg-blue-50 text-sm font-bold px-4 py-2 rounded-lg transition flex-shrink-0"
      >
        使い方を見る
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          {/* 背景オーバーレイ */}
          <div className="absolute inset-0 bg-black/50" />

          {/* モーダル本体 */}
          <div
            className="relative bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">使い方</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1"
              >
                ✕
              </button>
            </div>

            {/* ステップ一覧 */}
            <div className="px-6 py-5 space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  {/* 番号 */}
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-base">
                    {i + 1}
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {step.emoji} {step.title}
                    </h3>
                    {step.body && (
                      <p className="text-base text-gray-600 leading-relaxed">{step.body}</p>
                    )}
                    {step.list && (
                      <ul className="space-y-2 mt-1">
                        {step.list.map((item, j) => (
                          <li key={j} className="text-base text-gray-600 leading-relaxed">
                            <span className="font-bold text-blue-600">{item.label}：</span>
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 閉じるボタン */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-2xl">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white text-base font-bold py-3 rounded-xl transition"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
