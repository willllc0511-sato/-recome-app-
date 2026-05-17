'use client'
import { useState, useEffect, useRef } from 'react'

/* ─── 定数 ─── */
const BLUE = '#4ba3d8'
const GREEN = '#8cc63f'
const DARK = '#333333'
const GRAY = '#6b7280'
const LIGHT_BG = '#e8f2fb'
const LINE_GREEN = '#06C755'

/* ─── フェードイン ─── */
function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('lp-show'); ob.unobserve(el) } },
      { threshold: 0.08 }
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <div ref={ref} className={`lp-hide ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── アコーディオン ─── */
function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-200">
      <button className="w-full text-left py-4 flex justify-between items-center" onClick={() => setOpen(!open)}>
        <span className="text-base font-medium text-gray-800">{title}</span>
        <span className="text-xl flex-shrink-0 ml-4 transition-transform duration-300"
          style={{ color: GRAY, transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
      </button>
      <div className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '400px' : '0', opacity: open ? 1 : 0 }}>
        <div className="pb-4">{children}</div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════ */
export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [form, setForm] = useState({ shopName: '', name: '', email: '', phone: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'sa-taki@will0511.com',
          subject: `【LP問い合わせ】${form.shopName}`,
          body_html: `<h2>LPからの問い合わせ</h2><p><b>お店の名前:</b> ${form.shopName}</p><p><b>お名前:</b> ${form.name}</p><p><b>メール:</b> ${form.email}</p><p><b>電話番号:</b> ${form.phone || '未入力'}</p>`,
        }),
      })
      setSent(true)
    } catch {
      alert('送信に失敗しました。LINEからお問い合わせください。')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans JP','Hiragino Sans',sans-serif" }}>
      <style>{`
        .lp-hide{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}
        .lp-show{opacity:1;transform:translateY(0)}
        .lp-keep{word-break:keep-all;line-break:strict;overflow-wrap:break-word}
        .wave-bg{background:linear-gradient(160deg,#e8f2fb 0%,#ddeaf6 30%,#e2eef8 70%,#eaf2fc 100%);position:relative;overflow:hidden}
        .wave-bg::before{content:'';position:absolute;top:0;right:-20%;width:80%;height:100%;background:radial-gradient(ellipse at 70% 50%,rgba(75,163,216,.06) 0%,transparent 70%);pointer-events:none}
        .wave-bg::after{content:'';position:absolute;bottom:-10%;left:-20%;width:80%;height:60%;background:radial-gradient(ellipse at 30% 80%,rgba(75,163,216,.06) 0%,transparent 70%);pointer-events:none}
        .cta-green{background:${GREEN};color:#fff;font-weight:700;border-radius:9999px;transition:transform .2s,box-shadow .2s}
        .cta-green:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(140,198,63,.35)}
        .cta-outline{border:2px solid #d1d5db;color:${DARK};font-weight:700;border-radius:9999px;transition:background .2s}
        .cta-outline:hover{background:#f9fafb}
        .cta-blue{background:${BLUE};color:#fff;font-weight:700;border-radius:9999px;transition:transform .2s,box-shadow .2s}
        .cta-blue:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(75,163,216,.35)}
      `}</style>

      {/* ═══════════════════════════════════
          HEADER（見本準拠：ロゴ左 + ハンバーガー右）
         ═══════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <img src="/logo-full.png" alt="また来てね！" className="h-8" />
          {/* デスクトップナビ */}
          <div className="hidden md:flex items-center gap-7">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">機能</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">料金</a>
            <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900">よくある質問</a>
            <a href="/signup" className="cta-green text-sm px-5 py-2">無料で始める</a>
          </div>
          {/* ハンバーガー */}
          <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)} aria-label="メニュー">
            <div className="space-y-1.5">
              <span className="block w-6 h-0.5 bg-gray-700 transition-all" style={mobileMenu ? { transform: 'rotate(45deg) translate(4px,4px)' } : {}} />
              <span className="block w-6 h-0.5 bg-gray-700 transition-all" style={{ opacity: mobileMenu ? 0 : 1 }} />
              <span className="block w-6 h-0.5 bg-gray-700 transition-all" style={mobileMenu ? { transform: 'rotate(-45deg) translate(4px,-4px)' } : {}} />
            </div>
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-100 px-5 py-4 space-y-3">
            {[['機能','#features'],['料金','#pricing'],['よくある質問','#faq']].map(([l,h]) => (
              <a key={l} href={h} className="block text-base text-gray-700" onClick={() => setMobileMenu(false)}>{l}</a>
            ))}
            <a href="/signup" className="block text-center cta-green py-3 text-base">無料で始める</a>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════
          セクション1：ファーストビュー（hero.png準拠）
         ═══════════════════════════════════ */}
      <section className="wave-bg pt-20 pb-8 md:pt-28 md:pb-16 px-5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:gap-12">
          {/* テキストカラム */}
          <div className="flex-1 text-center md:text-left relative z-10">
            {/* バッジ */}
            <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-4 py-1.5 mb-5 shadow-sm border border-gray-100">
              <span className="font-bold text-sm" style={{ color: LINE_GREEN }}>LINE</span>
              <span className="text-gray-300 text-xs">×</span>
              <span className="font-bold text-sm" style={{ color: BLUE }}>Google口コミ</span>
            </div>

            {/* メインコピー */}
            <h1 className="text-[26px] md:text-[44px] font-bold leading-snug mb-4 lp-keep" style={{ color: DARK }}>
              来店後の<br className="md:hidden" />
              <span className="relative inline-block">
                &ldquo;ありがとう&rdquo;
                <span className="absolute -bottom-0.5 left-0 right-0 h-1.5 rounded-full opacity-30" style={{ background: GREEN }} />
              </span>
              と<br />
              口コミ<span className="font-bold" style={{ color: BLUE }}>依頼</span>を、<span style={{ color: GREEN }}>自動化</span>。
            </h1>

            {/* サブコピー */}
            <p className="text-sm md:text-base leading-relaxed mb-6 lp-keep" style={{ color: GRAY }}>
              お礼メッセージ、Google口コミのお願い、<br className="md:hidden" />
              再来店メッセージまで、<br className="md:hidden" />
              お店はただもらうだけ。かんたんに使えます。
            </p>

            {/* 料金バッジ */}
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <span className="text-xs font-bold text-white px-3 py-1 rounded-full" style={{ background: GREEN }}>初月<br />無料</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-gray-500">月額</span>
                <span className="text-[36px] md:text-[44px] font-bold" style={{ color: DARK }}>1,980</span>
                <span className="text-sm text-gray-500">円〜</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-6 -mt-3 text-center md:text-left">いつでも解約OK</p>

            {/* CTA */}
            <div className="flex flex-col gap-3 max-w-xs mx-auto md:mx-0">
              <a href="/signup" className="cta-green flex items-center justify-center gap-2 py-3.5 text-base">
                <span>🎁</span> 無料で始める <span>→</span>
              </a>
              <a href="https://lin.ee/RZSpkK3" target="_blank" rel="noopener noreferrer"
                className="cta-outline flex items-center justify-center gap-2 py-3.5 text-base">
                <span>💬</span> 相談してみる <span>→</span>
              </a>
            </div>
          </div>

          {/* スマホモック */}
          <div className="flex-1 flex justify-center mt-10 md:mt-0 relative z-10">
            <div className="w-[260px] md:w-[300px] bg-white rounded-[32px] shadow-2xl border-[6px] border-gray-200 overflow-hidden">
              {/* ステータスバー */}
              <div className="bg-white px-4 pt-2 pb-1 flex justify-between items-center">
                <span className="text-[10px] text-gray-400">9:41</span>
                <div className="flex gap-1">
                  <div className="w-3 h-2 rounded-sm bg-gray-300" />
                  <div className="w-3 h-2 rounded-sm bg-gray-300" />
                  <div className="w-4 h-2 rounded-sm bg-gray-400" />
                </div>
              </div>
              {/* LINEヘッダー */}
              <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
                <img src="/logo-icon.png" alt="" className="w-7 h-7" />
                <span className="text-sm font-bold text-gray-800">また来てね！</span>
              </div>
              {/* チャット */}
              <div className="px-3 py-3 space-y-2.5" style={{ background: '#e8f4f8', minHeight: 280 }}>
                {/* Bot */}
                <div className="flex gap-2 items-start">
                  <img src="/logo-icon.png" alt="" className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5" />
                  <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-[11px] text-gray-700 shadow-sm max-w-[80%] leading-relaxed">
                    ご来店ありがとうございました！😊<br />本日のサービスはいかがでしたか？
                  </div>
                </div>
                {/* User */}
                <div className="flex justify-end">
                  <div className="rounded-2xl rounded-tr-sm px-3 py-2 text-[11px] text-white shadow-sm" style={{ background: LINE_GREEN }}>
                    とても良かったです！
                  </div>
                </div>
                {/* Bot */}
                <div className="flex gap-2 items-start">
                  <img src="/logo-icon.png" alt="" className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5" />
                  <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 text-[11px] text-gray-700 shadow-sm max-w-[80%] leading-relaxed">
                    ありがとうございます！✨<br />よろしければGoogle口コミもお願いできますか？⭐
                  </div>
                </div>
                {/* 機能カード */}
                <div className="grid grid-cols-2 gap-1.5 mt-2">
                  {[
                    { icon: '💌', label: 'お礼メッセージ' },
                    { icon: '⭐', label: 'Google口コミ依頼' },
                    { icon: '📩', label: '不満の声キャッチ' },
                    { icon: '🔁', label: '再来店メッセージ' },
                  ].map((c) => (
                    <div key={c.label} className="bg-white rounded-lg px-2 py-1.5 text-center shadow-sm">
                      <div className="text-base">{c.icon}</div>
                      <div className="text-[8px] text-gray-600 font-medium mt-0.5">{c.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          セクション2：できること + 4機能（features.png準拠）
         ═══════════════════════════════════ */}
      <section id="features" className="py-14 md:py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-bold text-center mb-2" style={{ color: DARK }}>
              また来てね！で<span style={{ color: BLUE }}>できること</span>
            </h2>
            <p className="text-sm text-center mb-10" style={{ color: GRAY }}>
              来店後のフォローを、自動でやさしく仕組み化。
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {[
              { icon: '💌', title: 'お礼メッセージ\n自動配信', desc: '来店後に自動でお礼が届く', bg: '#eef7ff' },
              { icon: '⭐', title: 'Google口コミ\n自動依頼', desc: '満足した方にだけ\n口コミをお願い', bg: '#fef9ee' },
              { icon: '📩', title: '不満の声は\nお店へ直接', desc: '悪い口コミになる前に\nキャッチ', bg: '#f0fdf4' },
              { icon: '🔁', title: '再来店メッセージ\n自動送信', desc: '忘れた頃にそっと\nリマインド', bg: '#fef2f2' },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="rounded-2xl p-5 md:p-6 text-center h-full shadow-sm border border-gray-100" style={{ background: c.bg }}>
                  <div className="text-3xl md:text-4xl mb-3">{c.icon}</div>
                  <h3 className="text-sm md:text-base font-bold mb-1 whitespace-pre-line" style={{ color: DARK }}>{c.title}</h3>
                  <p className="text-xs md:text-sm whitespace-pre-line" style={{ color: GRAY }}>{c.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* かんたん4ステップ */}
          <FadeIn>
            <h3 className="text-lg md:text-2xl font-bold text-center mt-14 mb-8" style={{ color: DARK }}>
              かんたん<span style={{ color: BLUE }}>4</span>ステップ
            </h3>
          </FadeIn>
          <div className="space-y-5 max-w-sm mx-auto">
            {[
              { n: '1', icon: '📱', title: 'QRコードを置く' },
              { n: '2', icon: '👆', title: 'お客さんが読み取る' },
              { n: '3', icon: '✉️', title: 'お礼+口コミ依頼が届く' },
              { n: '4', icon: '📨', title: '再来店メッセージが届く' },
            ].map((s, i) => (
              <FadeIn key={s.n} delay={i * 80}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-bold flex-shrink-0" style={{ background: BLUE }}>
                    {s.n}
                  </div>
                  <div className="text-2xl flex-shrink-0">{s.icon}</div>
                  <span className="text-base font-medium" style={{ color: DARK }}>{s.title}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 max-w-xs mx-auto mt-10">
            <a href="/signup" className="cta-blue flex items-center justify-center gap-2 py-3.5 text-base">
              無料で始める <span>→</span>
            </a>
            <a href="https://lin.ee/RZSpkK3" target="_blank" rel="noopener noreferrer"
              className="cta-outline flex items-center justify-center gap-2 py-3 text-base">
              相談してみる <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          セクション3：他社比較 / おすすめ業種 / 安心要素（difference.png準拠）
         ═══════════════════════════════════ */}
      <section className="wave-bg py-14 md:py-20 px-5">
        <div className="max-w-3xl mx-auto">
          {/* 他社との違い */}
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-bold text-center mb-2" style={{ color: DARK }}>
              他のサービスとの<span style={{ color: BLUE }}>違い</span>
            </h2>
            <p className="text-xs text-center mb-8" style={{ color: GRAY }}>
              口コミを集めるだけでなく、次の来店につなげます。
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="py-3 px-3 text-left bg-gray-50 text-gray-500 font-medium w-[30%]" />
                    <th className="py-3 px-2 text-center font-bold" style={{ color: GREEN }}>また来てね！</th>
                    <th className="py-3 px-2 text-center text-gray-400 font-medium">他社</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: '来店後のお礼', ours: 'また来てね！', check: true, others: '自動送信' },
                    { label: '口コミ依頼', ours: 'また来てね！', check: true, others: '自動でお願い' },
                    { label: '再来店フォロー', ours: 'また来てね！', check: true, others: 'リマインドまで' },
                    { label: '不満の声の受け止め', ours: 'また来てね！', check: true, others: 'お店に直接届く' },
                  ].map((r, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="py-3 px-3 text-gray-600 text-xs">{r.label}</td>
                      <td className="py-3 px-2 text-center">
                        <span className="text-xs font-bold" style={{ color: GREEN }}>✓</span>
                      </td>
                      <td className="py-3 px-2 text-center text-xs text-gray-400">×</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* おすすめ業種 */}
          <FadeIn>
            <h3 className="text-lg md:text-2xl font-bold text-center mt-14 mb-2" style={{ color: DARK }}>
              こんなお店に<span style={{ color: GREEN }}>おすすめ</span>
            </h3>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-4 gap-3 mt-6 max-w-sm mx-auto">
              {[
                { icon: '🍽️', label: '飲食店' },
                { icon: '💇', label: '美容室' },
                { icon: '💆', label: '整体院' },
                { icon: '✨', label: 'サロン' },
              ].map((b) => (
                <div key={b.label} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl mb-1">{b.icon}</div>
                  <div className="text-xs font-medium" style={{ color: DARK }}>{b.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* 安心要素 */}
          <FadeIn>
            <h3 className="text-lg md:text-2xl font-bold text-center mt-14 mb-6" style={{ color: DARK }}>
              安心して始められます
            </h3>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
              {[
                { icon: '¥0', label: '初期費用無料', sub: '' },
                { icon: '🔄', label: 'いつでも解約OK', sub: '' },
                { icon: '📱', label: 'パソコン不要', sub: 'シンプル操作' },
              ].map((a) => (
                <div key={a.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="text-2xl mb-1 font-bold" style={{ color: GREEN }}>{a.icon}</div>
                  <div className="text-xs font-bold" style={{ color: DARK }}>{a.label}</div>
                  {a.sub && <div className="text-[10px] text-gray-400 mt-0.5">{a.sub}</div>}
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <div className="flex flex-col gap-3 max-w-xs mx-auto mt-10">
            <a href="/signup" className="cta-green flex items-center justify-center gap-2 py-3.5 text-base">
              🎁 無料で始める <span>→</span>
            </a>
            <a href="https://lin.ee/RZSpkK3" target="_blank" rel="noopener noreferrer"
              className="cta-outline flex items-center justify-center gap-2 py-3 text-base">
              💬 LINEで相談 <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          セクション4：料金 / FAQ / お問い合わせ（pricing.png準拠）
         ═══════════════════════════════════ */}

      {/* 料金 */}
      <section id="pricing" className="py-14 md:py-20 px-5 bg-white">
        <div className="max-w-md mx-auto">
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-bold text-center mb-8" style={{ color: DARK }}>料金</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="flex justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">初期費用</div>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: DARK }}>10,000</span>
                  <span className="text-sm text-gray-500 ml-1">円</span>
                </div>
                <div className="text-[10px] text-gray-400">（税別）</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">月額</div>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl md:text-4xl font-bold" style={{ color: BLUE }}>1,980</span>
                  <span className="text-sm text-gray-500 ml-1">円/月</span>
                </div>
                <div className="text-[10px] text-gray-400">（税別）</div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mb-6">初月無料・いつでも解約OK</p>
            <a href="/signup" className="cta-green flex items-center justify-center gap-2 py-3.5 text-base max-w-xs mx-auto">
              🎁 無料で始める <span>→</span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20 px-5" style={{ background: '#eef4fb' }}>
        <div className="max-w-md mx-auto">
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-bold text-center mb-8" style={{ color: DARK }}>よくある質問</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div>
              {[
                { q: 'LINE公式アカウントがなくても大丈夫？', a: 'はい。開設代行オプションもあるので、ゼロから始められます。' },
                { q: '本当に何もしなくていい？', a: 'QRコードを置くだけ。あとは全部自動です。' },
                { q: 'いつでも解約できる？', a: 'はい。縛りなし。翌月から停止できます。' },
                { q: '悪い口コミが増えたりしない？', a: '満足した方にだけ口コミをお願い。不満の声はお店に直接届きます。' },
              ].map((item, i) => (
                <Accordion key={i} title={item.q}>
                  <p className="text-sm text-gray-600">{item.a}</p>
                </Accordion>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* お問い合わせ */}
      <section id="contact" className="py-14 md:py-20 px-5 bg-white">
        <div className="max-w-md mx-auto">
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-bold text-center mb-8" style={{ color: DARK }}>お問い合わせ</h2>
          </FadeIn>
          <FadeIn delay={100}>
            {sent ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">✅</div>
                <p className="text-lg font-bold text-gray-800 mb-2">送信しました</p>
                <p className="text-sm text-gray-500">3営業日以内にご連絡します</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { k: 'shopName', t: 'text', p: 'お店の名前', r: true },
                  { k: 'name', t: 'text', p: 'お名前', r: true },
                  { k: 'email', t: 'email', p: 'メールアドレス', r: true },
                  { k: 'phone', t: 'tel', p: '電話番号（任意）', r: false },
                ].map((f) => (
                  <div key={f.k}>
                    <label className="text-xs text-gray-500 mb-1 block">{f.p}</label>
                    <input type={f.t} required={f.r} placeholder={f.t === 'email' ? 'example@example.com' : f.t === 'tel' ? '090-1234-5678' : ''}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': BLUE }}
                      value={form[f.k]}
                      onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} />
                  </div>
                ))}
                <button type="submit" disabled={sending}
                  className="cta-green w-full py-3.5 text-base disabled:opacity-50 flex items-center justify-center">
                  {sending ? '送信中...' : '送信する'}
                </button>
              </form>
            )}
          </FadeIn>

          {/* LINE相談 */}
          <FadeIn delay={200}>
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-base font-bold text-center mb-4" style={{ color: DARK }}>LINEで相談</h3>
              <div className="flex flex-col items-center gap-4">
                <div className="w-36 h-36 bg-white rounded-xl flex items-center justify-center border border-gray-200 p-1">
                  <img src="https://qr-official.line.me/gs/M_586adnax_GW.png" alt="LINE QRコード" className="w-full h-full object-contain" />
                </div>
                <a href="https://lin.ee/RZSpkK3" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-white font-bold px-8 py-3 rounded-full text-base" style={{ background: LINE_GREEN }}>
                  <span>💬</span> LINEで友だち追加
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ フッター ═══════ */}
      {mounted && (
        <footer className="py-6 px-5 border-t border-gray-100" style={{ background: '#eef4fb' }}>
          <div className="max-w-4xl mx-auto text-center">
            <img src="/logo-full.png" alt="また来てね！" className="h-7 mx-auto mb-2" />
            <div className="flex items-center justify-center gap-3">
              <a href="/tokushoho" className="text-gray-400 text-[10px] hover:text-gray-600 underline">特定商取引法に基づく表記</a>
              <span className="text-gray-300 text-[10px]">|</span>
              <a href="/privacy" className="text-gray-400 text-[10px] hover:text-gray-600 underline">プライバシーポリシー</a>
            </div>
            <p className="text-gray-400 text-[10px] mt-1">© 2026 合同会社Will</p>
          </div>
        </footer>
      )}
    </div>
  )
}
