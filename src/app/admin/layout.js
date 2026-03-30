import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export default function AdminLayout({ children }) {
  return (
    <div
      className={`${notoSansJP.variable} admin-root`}
      style={{ fontFamily: 'var(--font-noto-sans-jp), sans-serif', fontWeight: 500 }}
    >
      <style>{`
        .admin-root a { color: #2563eb; }
        .admin-root a:hover { text-decoration: underline; }
      `}</style>
      {children}
    </div>
  )
}
