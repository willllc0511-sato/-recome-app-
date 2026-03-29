"use client";

import { useState } from "react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    store: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: "導入にどれくらい時間がかかりますか？",
      a: "ヒアリングから納品まで、通常3〜5営業日で完了します。LINE・Google設定からメッセージのカスタマイズまですべてお任せいただけます。",
    },
    {
      q: "LINEやGoogleの設定が難しそうで不安です",
      a: "ご安心ください。導入パックにはLINE公式アカウントおよびGoogleビジネスプロフィールの設定代行が含まれています。オーナー様は情報をお伝えいただくだけです。",
    },
    {
      q: "途中でプランを変更できますか？",
      a: "はい。月末締めで翌月からプランの変更が可能です。事業の成長に合わせてアップグレードいただける設計になっています。",
    },
    {
      q: "解約はいつでもできますか？",
      a: "月額プランは月末までにご連絡いただければ翌月から解約可能です。縛りや違約金は一切ありません。",
    },
  ];

  const monthlyPlans = [
    {
      name: "ベーシック",
      price: "20,000",
      popular: false,
      features: [
        "LINE再来店リマインド",
        "口コミ自動依頼（Google）",
        "顧客管理ダッシュボード",
        "メールサポート",
      ],
      cta: "このプランで始める",
    },
    {
      name: "スタンダード",
      price: "50,000",
      popular: true,
      features: [
        "LINE再来店リマインド",
        "口コミ自動依頼（Google）",
        "顧客管理ダッシュボード",
        "月次サポート・運用相談",
        "効果レポート共有",
        "チャット・電話サポート",
      ],
      cta: "このプランで始める",
    },
    {
      name: "プロ",
      price: "70,000",
      popular: false,
      features: [
        "LINE再来店リマインド",
        "口コミ自動依頼（Google）",
        "顧客管理ダッシュボード",
        "月次サポート・運用相談",
        "SNS投稿代行",
        "口コミ返信代行",
        "詳細分析レポート",
        "専任担当者",
      ],
      cta: "このプランで始める",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "お問い合わせ",
      desc: "フォームまたはLINEでご連絡ください。1営業日以内に担当者からご連絡します。",
      icon: "💬",
    },
    {
      num: "02",
      title: "ヒアリング・設定代行",
      desc: "お店の情報をお伺いし、LINE・Google・Linkをすべて設定します。",
      icon: "⚙️",
    },
    {
      num: "03",
      title: "メッセージ納品",
      desc: "再来店・口コミ依頼メッセージをカスタマイズして納品します。",
      icon: "✉️",
    },
    {
      num: "04",
      title: "全自動で稼働スタート",
      desc: "納品後はLinkが自動で動き続けます。オーナーの追加作業はゼロです。",
      icon: "🚀",
    },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif" }}>

      {/* ─── ナビ ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow">
              <span className="text-white font-black text-sm">L</span>
            </div>
            <span className="font-black text-xl text-gray-900 tracking-tight">Link</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-gray-600 font-medium">
            <a href="#features" className="hover:text-blue-600 transition-colors">機能</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">料金</a>
            <a href="#flow" className="hover:text-blue-600 transition-colors">導入の流れ</a>
          </div>
          <a
            href="#contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            無料相談する
          </a>
        </div>
      </nav>

      {/* ─── ヒーロー ─── */}
      <section className="relative pt-20 overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-600">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs sm:text-sm px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            再来店促進 &amp; 口コミ自動依頼 — 全部まとめてお任せ
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.15] mb-6 tracking-tight">
            お客様が<span className="text-yellow-300">自然と戻ってくる</span><br />
            仕組みを、全自動で。
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Linkは、LINE再来店促進と口コミ自動依頼を一括で代行・自動化するサービスです。<br className="hidden sm:block" />
            設定から運用まで、オーナーの手間はゼロ。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-black px-8 py-4 rounded-xl text-base sm:text-lg transition-all duration-200 shadow-2xl hover:-translate-y-0.5"
            >
              無料相談・お見積りはこちら →
            </a>
            <a
              href="#features"
              className="border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl text-base sm:text-lg transition-all duration-200"
            >
              サービスを見る
            </a>
          </div>
          <p className="text-blue-300 text-xs mt-5">初期費用あり・縛りなし・いつでも解約可</p>
        </div>

        {/* 実績バー */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pb-14">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:p-6 grid grid-cols-3 divide-x divide-white/20 text-center">
            {[
              { num: "82%", label: "再来店率の向上" },
              { num: "4.2倍", label: "口コミ投稿数の増加" },
              { num: "500+", label: "導入店舗数" },
            ].map((item, i) => (
              <div key={i} className="px-2 sm:px-4">
                <div className="text-2xl sm:text-4xl font-black text-yellow-300">{item.num}</div>
                <div className="text-blue-200 text-xs sm:text-sm mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── お悩み ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Pain Points</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              こんなお悩み、<span className="text-blue-600">ありませんか？</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "😔",
                title: "新規客は来るのに\nリピーターが増えない",
                desc: "集客に費用をかけても一度来たお客様が戻ってこない。新規コストばかりが膨らんでしまう。",
              },
              {
                icon: "😰",
                title: "口コミが少なくて\n検索に出てこない",
                desc: "Google口コミは集客に直結するのに増やし方がわからない。直接お願いするのも気が引ける。",
              },
              {
                icon: "😓",
                title: "LINEやSNSの運用に\n手が回らない",
                desc: "やった方がいいのはわかっているが、日々の業務で精一杯。仕組みを作る時間も余裕もない。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-3 whitespace-pre-line leading-snug">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <div className="inline-block bg-blue-600 text-white text-base sm:text-lg font-bold px-8 py-4 rounded-2xl shadow-lg">
              その悩み、Linkがまるごと解決します ✓
            </div>
          </div>
        </div>
      </section>

      {/* ─── 機能 ─── */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Features</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Linkで<span className="text-blue-600">できること</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              2つの自動化機能で、売上アップを継続的に実現します
            </p>
          </div>

          <div className="space-y-8">
            {/* 再来店促進 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 sm:p-10 border border-blue-100">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                    🔄
                  </div>
                </div>
                <div className="flex-1">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">機能 01</span>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">LINE 再来店促進</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                    来店から一定期間が経過したお客様に、LINEで自動メッセージを送信。
                    クーポン・誕生日メッセージ・季節のご案内もすべて自動。
                    一度設定すれば、あとはLinkが動き続けます。
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { title: "最適タイミングで自動送信", desc: "来店7日・30日・90日後など、リピートしやすいタイミングで配信" },
                      { title: "パーソナライズメッセージ", desc: "名前・来店回数・メニューに合わせた個別メッセージで開封率UP" },
                      { title: "クーポン・特典自動発行", desc: "割引券や限定特典を自動配布して再来店を後押し" },
                    ].map((f, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-blue-100">
                        <div className="font-bold text-gray-900 text-xs sm:text-sm mb-1">{f.title}</div>
                        <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 口コミ自動依頼 */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 sm:p-10 border border-emerald-100">
              <div className="flex flex-col sm:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                    ⭐
                  </div>
                </div>
                <div className="flex-1">
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full mb-3">機能 02</span>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">口コミ自動依頼</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
                    来店後の満足度が高いタイミングで、LINEからGoogleの口コミページへ自動誘導。
                    直接お願いする気まずさをゼロにしながら、口コミを着実に積み上げます。
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { title: "来店直後に自動送信", desc: "満足度が最も高い来店翌日前後にGoogle口コミへ自動誘導" },
                      { title: "直リンクで投稿ハードル最小化", desc: "口コミページへのワンタップリンクで投稿率が大幅UP" },
                      { title: "口コミ件数をモニタリング", desc: "投稿数・評価の推移をダッシュボードで可視化" },
                    ].map((f, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-emerald-100">
                        <div className="font-bold text-gray-900 text-xs sm:text-sm mb-1">{f.title}</div>
                        <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 他社比較 ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Comparison</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              他社・相場との<span className="text-blue-600">比較</span>
            </h2>
            <p className="text-gray-500 mt-3 text-sm">Linkは、代行 + 自動化 + 継続サポートをまとめて提供します</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left text-sm font-bold text-gray-500 pb-4 pr-4 w-1/4"></th>
                  <th className="pb-4 px-3 w-1/4">
                    <div className="bg-blue-600 text-white rounded-xl py-3 px-4 text-center">
                      <div className="text-xs font-bold opacity-80 mb-0.5">おすすめ</div>
                      <div className="text-base font-black">Link</div>
                    </div>
                  </th>
                  <th className="pb-4 px-3 w-1/4">
                    <div className="bg-gray-100 rounded-xl py-3 px-4 text-center">
                      <div className="text-xs text-gray-400 mb-0.5">一般的な</div>
                      <div className="text-base font-bold text-gray-600">MEO業者</div>
                    </div>
                  </th>
                  <th className="pb-4 px-3 w-1/4">
                    <div className="bg-gray-100 rounded-xl py-3 px-4 text-center">
                      <div className="text-xs text-gray-400 mb-0.5">一般的な</div>
                      <div className="text-base font-bold text-gray-600">SNS代行</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    label: "初期費用",
                    link: "5万円（設定込み）",
                    meo: "5〜30万円",
                    sns: "5〜20万円",
                  },
                  {
                    label: "月額費用",
                    link: "2〜7万円",
                    meo: "3〜10万円",
                    sns: "5〜15万円",
                  },
                  {
                    label: "LINE再来店自動化",
                    link: "✓",
                    meo: "—",
                    sns: "△（手動）",
                    highlight: true,
                  },
                  {
                    label: "口コミ自動依頼",
                    link: "✓",
                    meo: "✓",
                    sns: "—",
                    highlight: true,
                  },
                  {
                    label: "設定・初期対応",
                    link: "✓ 全代行",
                    meo: "△ 一部のみ",
                    sns: "△ 一部のみ",
                  },
                  {
                    label: "月次サポート・相談",
                    link: "✓（スタンダード〜）",
                    meo: "—",
                    sns: "✓（別途費用）",
                  },
                  {
                    label: "縛り・違約金",
                    link: "なし",
                    meo: "あり（6〜12ヶ月）",
                    sns: "あり",
                  },
                ].map((row, i) => (
                  <tr key={i} className={row.highlight ? "bg-blue-50/50" : ""}>
                    <td className="py-4 pr-4 text-sm font-semibold text-gray-700">{row.label}</td>
                    <td className="py-4 px-3 text-center">
                      <span className={`text-sm font-bold ${row.link.startsWith("✓") ? "text-blue-600" : "text-gray-900"}`}>
                        {row.link}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className={`text-sm ${row.meo === "—" ? "text-gray-300" : "text-gray-500"}`}>
                        {row.meo}
                      </span>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <span className={`text-sm ${row.sns === "—" ? "text-gray-300" : "text-gray-500"}`}>
                        {row.sns}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-blue-600 rounded-2xl p-5 sm:p-6 text-white text-center">
            <p className="font-bold text-base sm:text-lg">
              Linkは「LINE再来店 + 口コミ依頼 + 設定代行 + サポート」を業界最安水準でまとめて提供
            </p>
          </div>
        </div>
      </section>

      {/* ─── 期待できる効果 ─── */}
      <section className="py-20 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-blue-300 font-bold text-xs uppercase tracking-widest mb-2">Results</p>
            <h2 className="text-3xl sm:text-4xl font-black">
              導入後に<span className="text-yellow-300">期待できる効果</span>
            </h2>
            <p className="text-blue-300 text-xs mt-3">業界調査データ・導入店舗の平均値に基づく</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              { num: "82", unit: "%", label: "再来店率向上", sub: "業界平均比で約2倍" },
              { num: "4.2", unit: "倍", label: "口コミ投稿数増加", sub: "導入3ヶ月後" },
              { num: "30", unit: "%↑", label: "月間売上アップ", sub: "導入6ヶ月後の平均" },
              { num: "0", unit: "h", label: "追加業務時間", sub: "完全自動化でゼロ" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/15 rounded-2xl p-5 sm:p-6 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-3xl sm:text-5xl font-black text-yellow-300 leading-none mb-2">
                  {item.num}<span className="text-xl sm:text-2xl">{item.unit}</span>
                </div>
                <div className="font-bold text-white text-sm sm:text-base mb-1">{item.label}</div>
                <div className="text-blue-300 text-xs">{item.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-blue-400 text-xs mt-8">
            ※ 効果には店舗・業種による個人差があります。保証するものではありません。
          </p>
        </div>
      </section>

      {/* ─── 料金プラン ─── */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              シンプルな<span className="text-blue-600">料金プラン</span>
            </h2>
          </div>

          {/* 導入パック */}
          <div className="mb-12">
            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
              導入パック
              <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full">最初に一度だけ</span>
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-7 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex-1">
                  <div className="text-4xl sm:text-5xl font-black text-blue-700 mb-1">
                    ¥50,000
                    <span className="text-base font-semibold text-gray-500 ml-2">（一括・税抜）</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    はじめの設定・代行をすべてお任せいただけるパックです。
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  {[
                    "ヒアリング",
                    "LINE公式設定代行",
                    "Googleビジネス設定代行",
                    "Linkシステム設定",
                    "メッセージカスタマイズ",
                    "納品・動作確認",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue-500 font-bold flex-shrink-0">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 月額プラン */}
          <div>
            <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">2</span>
              月額運用プラン
              <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full">導入後・毎月</span>
            </h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {monthlyPlans.map((plan, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl border-2 p-7 flex flex-col transition-all duration-200 ${
                    plan.popular
                      ? "border-blue-600 shadow-2xl bg-gradient-to-b from-blue-700 to-blue-900 text-white"
                      : "border-gray-200 bg-white hover:border-blue-200 hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-black px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                      人気No.1
                    </div>
                  )}
                  <div className={`text-xs font-bold mb-1 ${plan.popular ? "text-blue-200" : "text-blue-600"}`}>
                    {plan.name}
                  </div>
                  <div className="mb-5">
                    <span className={`text-3xl sm:text-4xl font-black ${plan.popular ? "text-white" : "text-gray-900"}`}>
                      ¥{plan.price}
                    </span>
                    <span className={`text-xs ml-1 ${plan.popular ? "text-blue-200" : "text-gray-500"}`}>/月（税抜）</span>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-7 text-sm">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className={`mt-0.5 flex-shrink-0 ${plan.popular ? "text-yellow-300" : "text-blue-500"}`}>✓</span>
                        <span className={plan.popular ? "text-blue-100" : "text-gray-600"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`block text-center font-bold py-3 rounded-xl transition-all duration-200 text-sm ${
                      plan.popular
                        ? "bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-lg"
                        : "bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm mt-8">
            全プラン縛りなし・いつでも解約可能。まずはお気軽にご相談ください。
          </p>
        </div>
      </section>

      {/* ─── 導入の流れ ─── */}
      <section id="flow" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">How to Start</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">導入の流れ</h2>
            <p className="text-gray-500 mt-3 text-sm">最短3〜5営業日で自動化スタート</p>
          </div>

          <div className="relative">
            <div className="hidden sm:block absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
            <div className="grid sm:grid-cols-4 gap-6 sm:gap-4">
              {steps.map((step, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center shadow-lg mb-4 z-10">
                    <span className="text-white/60 text-xs font-bold leading-none">{step.num}</span>
                    <span className="text-xl leading-none mt-0.5">{step.icon}</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              よくある<span className="text-blue-600">質問</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-200 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-sm sm:text-base pr-4">{faq.q}</span>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-lg leading-none transition-transform duration-200 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 会社概要 ─── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">Company</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">会社概要</h2>
          </div>
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-7 sm:px-10 py-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-2xl">W</span>
              </div>
              <div>
                <div className="text-white font-black text-lg sm:text-xl">合同会社Will</div>
                <div className="text-blue-200 text-sm">地域の事業者とテクノロジーをつなぐ</div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { label: "会社名", value: "合同会社Will" },
                { label: "所在地", value: "鹿児島県" },
                { label: "事業内容", value: "通信事業 / ITソリューション提供 / SaaS事業（Link）" },
                { label: "サービス概要", value: "Line活用による再来店促進・口コミ自動依頼サービス「Link」の開発・提供" },
                { label: "サポート時間", value: "平日 9:00〜18:00（メール・LINE・電話）" },
              ].map((row, i) => (
                <div key={i} className="flex flex-col sm:flex-row px-7 sm:px-10 py-4 gap-1 sm:gap-6">
                  <div className="text-gray-400 text-xs sm:text-sm font-semibold sm:w-36 flex-shrink-0 pt-0.5">{row.label}</div>
                  <div className="text-gray-800 text-sm font-medium">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 問い合わせ ─── */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-400/10 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-blue-300 font-bold text-xs uppercase tracking-widest mb-2">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              まずは<span className="text-yellow-300">無料でご相談ください</span>
            </h2>
            <p className="text-blue-100 mt-3 text-sm">お見積り・ご質問・デモのご依頼など、お気軽にどうぞ</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {/* フォーム */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-2xl">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-5">✅</div>
                  <h3 className="text-xl font-black text-gray-900 mb-3">送信しました！</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    お問い合わせありがとうございます。<br />
                    1営業日以内に担当者よりご連絡いたします。
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-black text-gray-900 mb-6">お問い合わせフォーム</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        お名前 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="山田 太郎"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        店舗名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.store}
                        onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                        placeholder="○○ サロン"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        メールアドレス <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@mail.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">電話番号</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="090-0000-0000"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">ご要望・ご質問</label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="プランについての質問、デモ希望など"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
                    >
                      送信する →
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* LINE + 対応時間 */}
            <div className="flex flex-col gap-5">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-7 flex-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-white font-black">LINEで相談する</div>
                    <div className="text-blue-200 text-xs">お気軽にメッセージを</div>
                  </div>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed mb-5">
                  LINEからのお問い合わせも受け付けています。QRコードを読み取って友だち追加してください。
                </p>
                {/* QRコードスペース */}
                <div className="bg-white rounded-2xl p-5 flex flex-col items-center gap-3">
                  <div className="w-36 h-36 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-300 gap-2">
                    <svg className="w-10 h-10 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span className="text-xs font-medium">QRコードを配置</span>
                  </div>
                  <span className="text-gray-400 text-xs font-semibold">LINE公式アカウント QRコード</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 sm:p-6">
                <div className="text-white font-bold text-sm mb-3">サポート対応時間</div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "平日", time: "9:00〜18:00" },
                    { day: "土曜", time: "10:00〜15:00" },
                    { day: "日・祝", time: "休業" },
                  ].map((r, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-blue-200">{r.day}</span>
                      <span className={r.time === "休業" ? "text-blue-400" : "text-white font-medium"}>{r.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-2xl p-5">
                <div className="text-yellow-300 font-black text-sm mb-1">30日間、無料でお試し</div>
                <div className="text-blue-100 text-xs leading-relaxed">
                  まずは導入パックなしでベーシックプランをお試しいただけます。詳しくはお問い合わせください。
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── フッター ─── */}
      <footer className="bg-gray-950 text-gray-500 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
              <span className="text-white font-black text-xs">L</span>
            </div>
            <span className="text-white font-bold">Link</span>
            <span className="text-gray-600 text-xs ml-1">by 合同会社Will</span>
          </div>
          <div className="flex gap-5 text-xs">
            <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-white transition-colors">利用規約</a>
            <a href="#contact" className="hover:text-white transition-colors">お問い合わせ</a>
          </div>
          <div className="text-xs text-gray-600">© 2024 合同会社Will. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
