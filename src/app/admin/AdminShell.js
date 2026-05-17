'use client'

import { useState, useEffect } from 'react'

const MENU_ITEMS = [
  { id: 'home', label: 'ホーム', icon: '🏠' },
  { id: 'settings', label: '店舗設定', icon: '⚙️' },
  { id: 'review_request', label: '口コミ依頼文', icon: '📝' },
  { id: 'revisit', label: 'また来てねメッセージ', icon: '💌' },
  { id: 'review_reply', label: '口コミ返信AI', icon: '💬' },
  { id: 'google_check', label: '今月のGoogleチェック', icon: '✅' },
  { id: 'customers', label: 'お客さん一覧', icon: '👥' },
  { id: 'subscription', label: '契約・お支払い', icon: '💳' },
  { id: 'tutorial', label: '使い方', icon: '📖' },
]

export default function AdminShell({ children, currentPage, onNavigate, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white px-4 py-4 border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => onNavigate('home')}>
            <img src="/logo-full.png" alt="また来てね！" style={{ height: '48px' }} />
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="block w-5 h-0.5 bg-gray-700 rounded-full"></span>
            <span className="block w-5 h-0.5 bg-gray-700 rounded-full"></span>
            <span className="block w-5 h-0.5 bg-gray-700 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* ハンバーガーメニュー */}
      {menuOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <span className="text-base font-bold text-gray-800">メニュー</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1"
              >
                ✕
              </button>
            </div>
            <nav className="py-2">
              {MENU_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMenuOpen(false) }}
                  className={`w-full text-left px-5 py-3.5 text-base flex items-center gap-3 transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              {onLogout && (
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm('ログアウトしますか？')) {
                        onLogout()
                        setMenuOpen(false)
                      }
                    }}
                    className="w-full text-left px-5 py-3.5 text-base flex items-center gap-3 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <span>🚪</span>
                    <span>ログアウト</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
}
