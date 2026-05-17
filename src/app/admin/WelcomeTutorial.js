'use client'

import { useState } from 'react'

const STEPS = [
  {
    title: 'ようこそ！',
    body: '「また来てね！」は、来店後の口コミ・再来店をサポートするツールです。',
    image: null,
  },
  {
    title: 'まずは店舗設定',
    body: 'メニューの「店舗設定」から、店名とGoogle口コミURLを登録してください。これだけで準備完了です。',
    action: 'settings',
    actionLabel: '店舗設定を開く',
  },
  {
    title: '口コミ依頼文を作る',
    body: '来店客に口コミを書いてもらうための文面を、AIが4パターン作ります。コピーしてLINEやチラシに使えます。',
  },
  {
    title: '口コミに返信する',
    body: 'もらった口コミを貼り付けると、返信文を自動で作ります。毎回考える手間がなくなります。',
  },
  {
    title: '毎月チェックする',
    body: '「今月のGoogleチェック」で、Googleビジネスプロフィールの改善点を5つ提案します。',
  },
]

export default function WelcomeTutorial({ onClose, onNavigate }) {
  const [step, setStep] = useState(0)
  const current = STEPS[step]
  const isLast = step === STEPS.length - 1

  function handleAction() {
    if (current.action) {
      onClose()
      onNavigate(current.action)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      {/* 進捗バー */}
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="px-6 py-8">
        {/* ステップ番号 */}
        <p className="text-xs text-gray-400 mb-3">{step + 1} / {STEPS.length}</p>

        {/* タイトル */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">{current.title}</h2>

        {/* 本文 */}
        <p className="text-sm text-gray-600 leading-relaxed mb-6">{current.body}</p>

        {/* アクションボタン（店舗設定への誘導など） */}
        {current.action && (
          <button
            onClick={handleAction}
            className="mb-4 text-sm text-blue-600 font-medium hover:underline"
          >
            → {current.actionLabel}
          </button>
        )}

        {/* ナビゲーション */}
        <div className="flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep(s => s - 1)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 戻る
            </button>
          ) : (
            <div />
          )}

          {isLast ? (
            <button
              onClick={onClose}
              className="text-white text-sm font-bold px-8 py-3 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #4a7dff, #3a6aee)' }}
            >
              はじめる
            </button>
          ) : (
            <button
              onClick={() => setStep(s => s + 1)}
              className="text-white text-sm font-bold px-8 py-3 rounded-xl"
              style={{ background: 'linear-gradient(135deg, #4a7dff, #3a6aee)' }}
            >
              次へ →
            </button>
          )}
        </div>

        {/* スキップ */}
        {!isLast && (
          <button
            onClick={onClose}
            className="block mx-auto mt-4 text-xs text-gray-400 hover:text-gray-600"
          >
            スキップ
          </button>
        )}
      </div>
    </div>
  )
}
