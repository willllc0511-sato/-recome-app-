'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({
    shopName: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('お問い合わせありがとうございます。3営業日以内にご連絡します。')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">
      {/* ナビバー */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-950/90 backdrop-blur-md border-b border-blue-800/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">
            Link<span className="text-blue-400">.</span>
          </div>
          <a href="#contact" className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-medium transition">
            無料相談する
          </a>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-orange-500/20 text-orange-300 px-4 py-1 rounded-full text-sm mb-4">
            🎉 初月無料キャンペーン中
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            LINEで<span className="text-blue-400">再来店</span>と<span className="text-green-400">口コミ</span>を<br />
            自動で増やす
          </h1>
          <p className="text-blue-200 mb-6">
            友だち登録したお客様に自動でメッセージ。<br className="md:hidden" />
            あなたは何もしなくてOK。
          </p>
          <a href="#contact" className="inline-block bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-full text-lg font-medium transition shadow-lg shadow-blue-500/30">
            無料で相談する
          </a>
        </div>
      </section>

      {/* 実績バー */}
      <section className="py-6 px-4">
        <div className="max-w-3xl mx-auto bg-blue-800/30 rounded-2xl p-4 grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">82<span className="text-lg">%</span></div>
            <div className="text-blue-300 text-xs">再来店率UP</div>
          </div>
          <div className="text-center border-x border-blue-700">
            <div className="text-2xl font-bold text-white">4.2<span className="text-lg">倍</span></div>
            <div className="text-blue-300 text-xs">口コミ増加</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">30<span className="text-lg">日</span></div>
            <div className="text-blue-300 text-xs">無料お試し</div>
          </div>
        </div>
      </section>

      {/* できること（シンプル版） */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            Linkがやってくれること
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-600/20 rounded-xl p-5 border border-blue-500/30">
              <div className="text-blue-400 text-2xl mb-2">📨</div>
              <h3 className="text-white font-bold mb-1">再来店メッセージ</h3>
              <p className="text-blue-300 text-sm">20日後に「お久しぶりです！」とクーポン付きで自動送信</p>
            </div>
            <div className="bg-green-600/20 rounded-xl p-5 border border-green-500/30">
              <div className="text-green-400 text-2xl mb-2">⭐</div>
              <h3 className="text-white font-bold mb-1">口コミ依頼</h3>
              <p className="text-blue-300 text-sm">翌日に「口コミお願いします」とGoogle直リンク付きで自動送信</p>
            </div>
          </div>
        </div>
      </section>

      {/* 管理画面プレビュー */}
      <section className="py-10 px-4 bg-blue-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            設定はとってもカンタン
          </h2>
          <p className="text-blue-300 text-sm mb-6">店名とクーポン内容を入れるだけ。あとは自動。</p>
          <div className="bg-white rounded-xl p-4 shadow-xl max-w-sm mx-auto">
            <div className="text-left">
              <div className="text-gray-800 font-bold text-sm mb-3">Link 管理画面</div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500 text-xs">店名</div>
                  <div className="bg-gray-100 rounded px-3 py-2 text-gray-700">あなたのお店</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">クーポン内容</div>
                  <div className="bg-gray-100 rounded px-3 py-2 text-gray-700">次回10%OFF</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs">Googleレビューリンク</div>
                  <div className="bg-gray-100 rounded px-3 py-2 text-gray-400 text-xs">https://g.page/r/...</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="bg-blue-500 text-white text-center py-2 rounded text-sm">保存する</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン（月額を先に） */}
      <section id="pricing" className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white text-center mb-2">
            料金プラン
          </h2>
          <p className="text-blue-300 text-center text-sm mb-8">シンプルな月額制。いつでも解約OK。</p>
          
          {/* 月額プラン */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* ベーシック */}
            <div className="bg-blue-800/30 rounded-xl p-5 border border-blue-700/50">
              <h3 className="text-white font-bold mb-1">ベーシック</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold text-white">2</span>
                <span className="text-blue-300">万円/月</span>
              </div>
              <ul className="space-y-1 text-sm text-blue-200">
                <li>✓ 再来店メッセージ</li>
                <li>✓ 口コミ自動依頼</li>
                <li>✓ 完全自動運用</li>
              </ul>
            </div>

            {/* スタンダード */}
            <div className="bg-blue-600/30 rounded-xl p-5 border-2 border-blue-400 relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-0.5 rounded-full">
                人気
              </div>
              <h3 className="text-white font-bold mb-1">スタンダード</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold text-white">5</span>
                <span className="text-blue-300">万円/月</span>
              </div>
              <ul className="space-y-1 text-sm text-blue-200">
                <li>✓ ベーシック全機能</li>
                <li>✓ 月次サポート</li>
                <li>✓ 相談し放題</li>
              </ul>
            </div>

            {/* プロ */}
            <div className="bg-blue-800/30 rounded-xl p-5 border border-blue-700/50">
              <h3 className="text-white font-bold mb-1">プロ</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold text-white">7</span>
                <span className="text-blue-300">万円/月</span>
              </div>
              <ul className="space-y-1 text-sm text-blue-200">
                <li>✓ スタンダード全機能</li>
                <li>✓ 投稿・返信代行</li>
                <li>✓ 月次レポート</li>
              </ul>
            </div>
          </div>

          {/* 導入パック（後ろに配置） */}
          <div className="bg-blue-800/20 rounded-xl p-4 border border-blue-700/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <h3 className="text-white font-medium">初期設定（導入パック）</h3>
                <p className="text-blue-400 text-xs">LINE・Google設定・QRコード発行・使い方説明</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">5</span>
                <span className="text-blue-300">万円</span>
                <span className="text-blue-400 text-xs ml-1">(税別・1回のみ)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* キャンペーン */}
      <section className="py-10 px-4 bg-gradient-to-r from-orange-600/20 to-yellow-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-orange-300 text-sm mb-2">🎉 スタートダッシュキャンペーン</div>
          <h2 className="text-xl font-bold text-white mb-6">今だけの特典</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-800/40 rounded-xl p-4 border border-orange-500/30">
              <div className="text-orange-400 font-bold mb-1">特典1</div>
              <div className="text-white font-bold">初月無料</div>
              <p className="text-blue-300 text-xs">まず1ヶ月試してから決められる</p>
            </div>
            <div className="bg-blue-800/40 rounded-xl p-4 border border-orange-500/30">
              <div className="text-orange-400 font-bold mb-1">特典2</div>
              <div className="text-white font-bold">成果保証</div>
              <p className="text-blue-300 text-xs">3ヶ月で口コミ0件なら全額返金</p>
            </div>
          </div>

          {/* 紹介割引 */}
          <div className="bg-green-600/20 rounded-xl p-4 border border-green-500/30">
            <div className="text-green-300 text-sm mb-1">🤝 紹介割引</div>
            <div className="text-white font-bold mb-2">お友達紹介でWでお得</div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-900/50 rounded-lg p-2">
                <div className="text-green-300 text-xs">紹介された方</div>
                <div className="text-white font-bold">導入費1万円OFF</div>
              </div>
              <div className="bg-blue-900/50 rounded-lg p-2">
                <div className="text-green-300 text-xs">紹介した方</div>
                <div className="text-white font-bold">翌月1万円OFF</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 導入の流れ */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white text-center mb-8">
            最短3日で開始
          </h2>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="text-white text-xs font-medium">相談</div>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="text-white text-xs font-medium">ヒアリング</div>
            </div>
            <div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="text-white text-xs font-medium">設定</div>
            </div>
            <div>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">4</span>
              </div>
              <div className="text-white text-xs font-medium">開始！</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ（シンプル版） */}
      <section className="py-10 px-4 bg-blue-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white text-center mb-6">
            よくある質問
          </h2>
          <div className="space-y-3">
            {[
              { q: 'LINE公式アカウントがなくても大丈夫？', a: 'はい、ゼロから全て設定します。' },
              { q: '本当に何もしなくていい？', a: 'はい、QRコードを置くだけ。あとは全自動です。' },
              { q: 'いつでも解約できる？', a: 'はい、契約の縛りなし。翌月から停止できます。' },
              { q: '成果保証の条件は？', a: '3ヶ月で口コミ0件なら運用費全額返金。' },
            ].map((item, index) => (
              <div key={index} className="bg-blue-800/30 rounded-lg border border-blue-700/50 overflow-hidden">
                <button
                  className="w-full text-left p-3 flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-white text-sm pr-2">{item.q}</span>
                  <span className="text-blue-400 flex-shrink-0">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="px-3 pb-3">
                    <p className="text-blue-300 text-sm">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section id="contact" className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-white text-center mb-2">
            お問い合わせ
          </h2>
          <p className="text-blue-300 text-center text-sm mb-6">
            まずは無料相談から。3営業日以内に返信します。
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* フォーム */}
            <div className="bg-blue-800/30 rounded-xl p-5 border border-blue-700/50">
              <h3 className="text-white font-bold text-sm mb-4">📝 フォームで相談</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    className="w-full bg-blue-900/50 border border-blue-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-blue-400/50 focus:outline-none focus:border-blue-400"
                    placeholder="店舗名"
                    value={formData.shopName}
                    onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    required
                    className="w-full bg-blue-900/50 border border-blue-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-blue-400/50 focus:outline-none focus:border-blue-400"
                    placeholder="お名前"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    className="w-full bg-blue-900/50 border border-blue-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-blue-400/50 focus:outline-none focus:border-blue-400"
                    placeholder="メールアドレス"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    className="w-full bg-blue-900/50 border border-blue-600/50 rounded-lg px-3 py-2 text-white text-sm placeholder-blue-400/50 focus:outline-none focus:border-blue-400"
                    placeholder="電話番号（任意）"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white py-2.5 rounded-lg font-medium transition text-sm"
                >
                  送信する
                </button>
              </form>
            </div>

            {/* LINE */}
            <div className="bg-blue-800/30 rounded-xl p-5 border border-blue-700/50 flex flex-col">
              <h3 className="text-white font-bold text-sm mb-4">💬 LINEで相談</h3>
              <p className="text-blue-300 text-sm mb-4">
                LINEでもお気軽にどうぞ！
              </p>
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* QRコード */}
                <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mb-3 p-2">
                  <img 
                    src="https://qr-official.line.me/gs/M_586adnax_GW.png" 
                    alt="LINE QRコード"
                    className="w-full h-full object-contain"
                  />
                </div>
                <a
                  href="https://lin.ee/RZSpkK3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-400 text-white px-6 py-2.5 rounded-lg font-medium transition text-sm inline-flex items-center gap-2"
                >
                  LINEで友だち追加
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要 */}
      <section className="py-8 px-4 bg-blue-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-white text-center mb-4">会社概要</h2>
          <div className="bg-blue-800/30 rounded-xl p-4 border border-blue-700/50">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-blue-700/50">
                  <td className="py-2 text-blue-300 w-1/3">会社名</td>
                  <td className="py-2 text-white">合同会社Will</td>
                </tr>
                <tr className="border-b border-blue-700/50">
                  <td className="py-2 text-blue-300">所在地</td>
                  <td className="py-2 text-white">鹿児島県</td>
                </tr>
                <tr className="border-b border-blue-700/50">
                  <td className="py-2 text-blue-300">代表</td>
                  <td className="py-2 text-white">高城 智</td>
                </tr>
                <tr>
                  <td className="py-2 text-blue-300">Web</td>
                  <td className="py-2">
                    <a href="https://will0511.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      will0511.com
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-6 px-4 border-t border-blue-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-lg font-bold text-white mb-2">
            Link<span className="text-blue-400">.</span>
          </div>
          <p className="text-blue-400 text-xs">
            © 2026 合同会社Will
          </p>
        </div>
      </footer>
    </div>
  )
}
