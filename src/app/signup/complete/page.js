export default function SignupCompletePage() {
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-lg mx-auto">
          <img src="/logo-full.png" alt="また来てね！" className="h-10" />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-6">🎉</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">お申し込み完了！</h1>
        <p className="text-base text-gray-600 leading-relaxed mb-8">
          ありがとうございます。<br />
          ご登録のメールアドレスに管理画面のURLをお送りしました。
        </p>

        <div className="bg-white border border-gray-200 rounded-xl p-6 text-left mb-8">
          <h2 className="text-base font-bold text-gray-700 mb-3">これからの流れ</h2>
          <ol className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-3">
              <span className="font-bold text-base flex-shrink-0" style={{ color: '#4ba3d8' }}>1</span>
              <span>届いたメールから管理画面を開いて、お店の情報を入力してください</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-base flex-shrink-0" style={{ color: '#4ba3d8' }}>2</span>
              <span>初期設定のサポートが必要な場合は、お気軽にご連絡ください</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-base flex-shrink-0" style={{ color: '#4ba3d8' }}>3</span>
              <span>QRコードをお店に設置すれば、あとは自動で動きます</span>
            </li>
          </ol>
        </div>

        <div className="space-y-3">
          <a
            href="/admin"
            className="block w-full text-white text-base font-bold py-4 rounded-xl transition hover:opacity-90"
            style={{ background: '#4ba3d8' }}
          >
            管理画面を開く
          </a>
          <p className="text-sm text-gray-500">
            お問い合わせ：<a href="tel:09026640511" className="underline" style={{ color: '#4ba3d8' }}>090-2664-0511</a>
          </p>
        </div>
      </main>
    </div>
  )
}
