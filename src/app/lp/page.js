'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({ shopName: '', name: '', email: '', phone: '' })

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('お問い合わせありがとうございます。3営業日以内にご連絡します。')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">

      {/* ナビバー */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-950/90 backdrop-blur-md border-b border-blue-800/50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Link" width={40} height={40} className="h-10 w-auto" />
            <span className="text-2xl font-bold text-white">Link<span className="text-blue-400">.</span></span>
          </div>
          <a href="#contact" className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-full text-sm font-medium transition">
            お問い合わせ
          </a>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-orange-500/20 text-orange-300 px-4 py-1.5 rounded-full text-sm mb-6">
            🎉 今なら初月無料！
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            LINEで<span className="text-blue-400">再来店</span>と<br />
            <span className="text-green-400">Googleの口コミ</span>を<br />
            自動で増やす
          </h1>
          <p className="text-blue-200 text-lg mb-8">
            お客様がLINEを友だち追加するだけ。<br />
            あとは全部、自動。
          </p>
          <a href="#contact" className="inline-block bg-blue-500 hover:bg-blue-400 text-white px-10 py-4 rounded-full text-lg font-bold transition shadow-lg shadow-blue-500/30">
            無料で相談する
          </a>
        </div>
      </section>

      {/* 実績バー */}
      <section className="py-6 px-4">
        <div className="max-w-3xl mx-auto bg-blue-800/30 rounded-2xl p-6 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-white">82<span className="text-2xl">%</span></div>
            <div className="text-blue-300 text-sm mt-1">再来店率UP</div>
          </div>
          <div className="text-center border-x border-blue-700">
            <div className="text-5xl font-bold text-white">4.2<span className="text-2xl">倍</span></div>
            <div className="text-blue-300 text-sm mt-1">口コミ増加</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white">30<span className="text-2xl">日</span></div>
            <div className="text-blue-300 text-sm mt-1">無料お試し</div>
          </div>
        </div>
      </section>

      {/* お悩み */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            こんなお悩みありませんか？
          </h2>
          <div className="space-y-4">
            {[
              '「口コミをお客さんに頼みづらい…」',
              '「一度来たお客さんがなかなか戻ってこない…」',
              '「忙しくて集客まで手が回らない…」',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 bg-blue-800/30 rounded-xl px-5 py-4 border border-blue-700/40">
                <span className="text-blue-400 text-xl font-bold flex-shrink-0">0{i + 1}</span>
                <p className="text-white text-base">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-blue-300 mt-6 text-base">
            Linkがその悩みを、全部まとめて解決します。
          </p>
        </div>
      </section>

      {/* 仕組み */}
      <section className="py-12 px-4 bg-blue-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Linkの仕組み
          </h2>
          <p className="text-blue-300 text-center text-sm mb-8">お店側の手間はゼロ。QRコードを置くだけ。</p>

          {/* フロー */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-center mb-8">
            {[
              { icon: '🏪', label: '来店' },
              { icon: '📱', label: 'LINE友だち追加' },
              { icon: '💬', label: '自動メッセージ' },
              { icon: '⭐', label: '満足度確認' },
              { icon: '📝', label: '口コミ依頼' },
            ].map((step, i, arr) => (
              <div key={i} className="flex md:flex-row flex-col items-center">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-blue-700/50 rounded-full flex items-center justify-center text-2xl border border-blue-500/40">
                    {step.icon}
                  </div>
                  <div className="text-white text-xs mt-1.5 font-medium text-center">{step.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="text-blue-400 text-xl md:mx-2 my-1 md:my-0 rotate-90 md:rotate-0">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3 bg-blue-800/20 rounded-xl p-4">
              <span className="text-green-400 text-xl flex-shrink-0">✅</span>
              <div>
                <div className="text-white font-medium">満足度が高い方だけに口コミを依頼</div>
                <div className="text-blue-300 text-sm mt-0.5">Google直リンク付きで自然にレビューへ誘導</div>
              </div>
            </div>
            <div className="flex gap-3 bg-blue-800/20 rounded-xl p-4">
              <span className="text-green-400 text-xl flex-shrink-0">✅</span>
              <div>
                <div className="text-white font-medium">低評価のお客様には改善ヒアリング</div>
                <div className="text-blue-300 text-sm mt-0.5">口コミは頼まず、不満を直接ヒアリング</div>
              </div>
            </div>
            <div className="flex gap-3 bg-blue-800/20 rounded-xl p-4">
              <span className="text-green-400 text-xl flex-shrink-0">✅</span>
              <div>
                <div className="text-white font-medium">再来店メッセージを自動送信</div>
                <div className="text-blue-300 text-sm mt-0.5">設定した日数後にクーポン付きで自動配信</div>
              </div>
            </div>
            <div className="flex gap-3 bg-blue-800/20 rounded-xl p-4">
              <span className="text-green-400 text-xl flex-shrink-0">✅</span>
              <div>
                <div className="text-white font-medium">お店の手間はゼロ</div>
                <div className="text-blue-300 text-sm mt-0.5">全て自動。設定後はほったらかしでOK</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お客様の声 */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            お客様の声
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-800/30 rounded-xl p-5 border border-blue-700/50">
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-white text-sm leading-relaxed mb-4">
                「口コミが3ヶ月で12件増えて、Google検索からの新規のお客さんが明らかに増えました」
              </p>
              <div className="text-blue-400 text-xs">居酒屋オーナー A様（鹿児島市）</div>
            </div>
            <div className="bg-blue-800/30 rounded-xl p-5 border border-blue-700/50">
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-white text-sm leading-relaxed mb-4">
                「設定だけお願いしたら、あとは何もしなくていいのが本当にラク。お客様が自然に口コミを書いてくれるようになりました」
              </p>
              <div className="text-blue-400 text-xs">美容室オーナー B様（霧島市）</div>
            </div>
            <div className="bg-blue-800/30 rounded-xl p-5 border border-blue-700/50">
              <div className="text-yellow-400 text-lg mb-3">★★★★★</div>
              <p className="text-white text-sm leading-relaxed mb-4">
                「一度来たきりのお客さんが、LINEメッセージがきっかけでまた来てくれるようになりました」
              </p>
              <div className="text-blue-400 text-xs">整体院オーナー C様（鹿児島市）</div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プラン */}
      <section id="pricing" className="py-12 px-4 bg-blue-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-2">料金プラン</h2>
          <p className="text-blue-300 text-center text-sm mb-2">シンプルな月額制。いつでも解約OK。</p>
          <p className="text-blue-200 text-center text-sm font-medium mb-8">
            初期費用 <span className="text-white font-bold">5万円</span>
            <span className="text-blue-400 text-xs">（税別・1回のみ）</span>
            　＋　月額プランを選択
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-blue-800/40 rounded-2xl p-6 border border-blue-700/50">
              <h3 className="text-white font-bold text-lg mb-1">ベーシック</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">2</span>
                <span className="text-blue-300 text-lg">万円/月</span>
                <span className="text-blue-400 text-xs ml-1">（税別）</span>
              </div>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 再来店メッセージ自動送信</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 口コミ自動依頼</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 完全自動運用</li>
              </ul>
            </div>

            <div className="bg-blue-600/40 rounded-2xl p-6 border-2 border-blue-400 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-4 py-1 rounded-full font-bold">
                人気No.1
              </div>
              <h3 className="text-white font-bold text-lg mb-1">スタンダード</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">5</span>
                <span className="text-blue-300 text-lg">万円/月</span>
                <span className="text-blue-400 text-xs ml-1">（税別）</span>
              </div>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> ベーシック全機能</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 月次サポート</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 相談し放題</li>
              </ul>
            </div>

            <div className="bg-blue-800/40 rounded-2xl p-6 border border-blue-700/50">
              <h3 className="text-white font-bold text-lg mb-1">プロ</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">7</span>
                <span className="text-blue-300 text-lg">万円/月</span>
                <span className="text-blue-400 text-xs ml-1">（税別）</span>
              </div>
              <ul className="space-y-2 text-sm text-blue-200">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> スタンダード全機能</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 投稿・返信代行</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 月次レポート</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* キャンペーン */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-600/20 to-yellow-600/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-orange-300 text-sm mb-2">🎉 スタートダッシュキャンペーン</div>
            <h2 className="text-3xl font-bold text-white">今なら初月無料！</h2>
            <p className="text-blue-200 text-base mt-2">
              初期費用5万円＋月額のみ。<br className="md:hidden" />初月は月額0円でスタートできます。
            </p>
          </div>

          <div className="bg-blue-800/40 rounded-2xl p-6 border border-orange-500/30 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-orange-400 text-2xl">🛡️</span>
              <div>
                <div className="text-white font-bold text-lg">成果保証</div>
                <p className="text-blue-200 text-sm mt-1">
                  3ヶ月使って口コミが1件も増えなければ、全額返金します。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-600/20 rounded-2xl p-5 border border-green-500/30 mb-4">
            <div className="text-green-300 font-bold mb-3">🤝 お店同士の紹介割引</div>
            <p className="text-blue-200 text-sm mb-4">
              お知り合いのお店をご紹介いただくと、紹介されたお店は<strong className="text-white">初期費用1万円OFF</strong>、紹介してくださったお店は<strong className="text-white">月額から1万円値引き</strong>します。
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-900/50 rounded-xl p-3 text-center">
                <div className="text-green-300 text-xs mb-1">紹介された方</div>
                <div className="text-white font-bold text-lg">初期費1万円OFF</div>
              </div>
              <div className="bg-blue-900/50 rounded-xl p-3 text-center">
                <div className="text-green-300 text-xs mb-1">紹介した方</div>
                <div className="text-white font-bold text-lg">翌月1万円OFF</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-600/20 rounded-2xl p-5 border border-yellow-500/30">
            <div className="text-yellow-300 font-bold mb-2">💛 紹介パートナー制度</div>
            <p className="text-blue-200 text-sm">
              店舗をお持ちでない方でも参加できます。お店をご紹介いただき、導入が決まれば<strong className="text-white">一律5,000円</strong>の報酬をお支払いします（紹介から2ヶ月目末にお支払い）。紹介コードを発行しますのでお気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      {/* 導入の流れ */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            最短3日で開始
          </h2>
          <div className="grid grid-cols-4 gap-3 text-center">
            {[
              { n: '1', label: '無料相談', color: 'bg-blue-600' },
              { n: '2', label: 'ヒアリング', color: 'bg-blue-600' },
              { n: '3', label: '初期設定', color: 'bg-blue-600' },
              { n: '4', label: '開始！', color: 'bg-green-500' },
            ].map((step) => (
              <div key={step.n}>
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-white font-bold text-lg">{step.n}</span>
                </div>
                <div className="text-white text-sm font-medium">{step.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 bg-blue-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            よくある質問
          </h2>
          <div className="space-y-3">
            {[
              { q: 'LINE公式アカウントがなくても大丈夫？', a: 'はい、ゼロから全て設定します。' },
              { q: '本当に何もしなくていい？', a: 'QRコードを置くだけ。あとは全自動です。' },
              { q: 'いつでも解約できる？', a: '契約の縛りなし。翌月から停止できます。' },
              { q: '成果保証の条件は？', a: '3ヶ月で口コミが1件も増えなければ、全額返金します。' },
            ].map((item, index) => (
              <div key={index} className="bg-blue-800/30 rounded-xl border border-blue-700/50 overflow-hidden">
                <button
                  className="w-full text-left px-5 py-4 flex justify-between items-center"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-white text-base pr-4">{item.q}</span>
                  <span className="text-blue-400 text-xl flex-shrink-0">{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-4">
                    <p className="text-blue-300 text-base">{item.a}</p>
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
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            お問い合わせ
          </h2>
          <p className="text-blue-300 text-center text-sm mb-8">
            まずは無料相談から。3営業日以内に返信します。
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-800/30 rounded-2xl p-6 border border-blue-700/50">
              <h3 className="text-white font-bold mb-4">📝 フォームで相談</h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text" required
                  className="w-full bg-blue-900/50 border border-blue-600/50 rounded-lg px-4 py-3 text-white text-base placeholder-blue-400/60 focus:outline-none focus:border-blue-400"
                  placeholder="店舗名"
                  value={formData.shopName}
                  onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                />
                <input
                  type="text" required
                  className="w-full bg-blue-900/50 border border-blue-600/50 rounded-lg px-4 py-3 text-white text-base placeholder-blue-400/60 focus:outline-none focus:border-blue-400"
                  placeholder="お名前"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="email" required
                  className="w-full bg-blue-900/50 border border-blue-600/50 rounded-lg px-4 py-3 text-white text-base placeholder-blue-400/60 focus:outline-none focus:border-blue-400"
                  placeholder="メールアドレス"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <input
                  type="tel"
                  className="w-full bg-blue-900/50 border border-blue-600/50 rounded-lg px-4 py-3 text-white text-base placeholder-blue-400/60 focus:outline-none focus:border-blue-400"
                  placeholder="電話番号（任意）"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white py-3 rounded-xl font-bold transition text-base"
                >
                  送信する
                </button>
              </form>
            </div>

            <div className="bg-blue-800/30 rounded-2xl p-6 border border-blue-700/50 flex flex-col">
              <h3 className="text-white font-bold mb-4">💬 LINEで相談</h3>
              <p className="text-blue-300 text-sm mb-4">LINEでもお気軽にどうぞ！</p>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-36 h-36 bg-white rounded-2xl flex items-center justify-center mb-4 p-2">
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
                  className="bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-xl font-bold transition text-base"
                >
                  LINEで友だち追加
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要 */}
      <section className="py-10 px-4 bg-blue-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-white text-center mb-4">会社概要</h2>
          <div className="bg-blue-800/30 rounded-xl p-4 border border-blue-700/50">
            <table className="w-full text-sm">
              <tbody>
                {[
                  { label: '会社名', content: '合同会社Will' },
                  { label: '代表者', content: '髙城 智' },
                  { label: '所在地', content: '鹿児島市城山町9番2号' },
                ].map(({ label, content }) => (
                  <tr key={label} className="border-b border-blue-700/50">
                    <td className="py-2.5 text-blue-300 w-1/3">{label}</td>
                    <td className="py-2.5 text-white">{content}</td>
                  </tr>
                ))}
                <tr className="border-b border-blue-700/50">
                  <td className="py-2.5 text-blue-300">電話番号</td>
                  <td className="py-2.5"><a href="tel:09026640511" className="text-blue-400 hover:underline">090-2664-0511</a></td>
                </tr>
                <tr className="border-b border-blue-700/50">
                  <td className="py-2.5 text-blue-300">メール</td>
                  <td className="py-2.5"><a href="mailto:sa-taki@will0511.com" className="text-blue-400 hover:underline">sa-taki@will0511.com</a></td>
                </tr>
                <tr className="border-b border-blue-700/50">
                  <td className="py-2.5 text-blue-300">法人番号</td>
                  <td className="py-2.5">
                    <a href="https://www.houjin-bangou.nta.go.jp/henkorireki-johoto.html?selHouzinNo=1340003003411" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      1340003003411
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 text-blue-300">ホームページ</td>
                  <td className="py-2.5"><a href="https://will0511.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">will0511.com</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-6 px-4 border-t border-blue-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Image src="/logo.png" alt="Link" width={28} height={28} className="h-7 w-auto" />
            <span className="text-lg font-bold text-white">Link<span className="text-blue-400">.</span></span>
          </div>
          <p className="text-blue-400 text-xs">© 2026 合同会社Will</p>
        </div>
      </footer>
    </div>
  )
}
