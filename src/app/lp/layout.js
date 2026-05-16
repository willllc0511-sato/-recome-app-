export const metadata = {
  title: 'また来てね！ | 来店後のお礼と口コミ依頼を自動化',
  description:
    '来店後の"ありがとう"と口コミ依頼を自動化。お礼メッセージ、Google口コミのお願い、再来店メッセージまで全自動。月額1,980円、初月無料。',
  openGraph: {
    title: 'また来てね！ | 来店後のお礼と口コミ依頼を自動化',
    description:
      'お礼メッセージ、Google口コミのお願い、再来店メッセージまで、お店はただもらうだけ。月額1,980円・初月無料。',
    url: 'https://recome-app.vercel.app/lp',
    siteName: 'また来てね！',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/logo-full.png', width: 1200, height: 630, alt: 'また来てね！' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'また来てね！ | 来店後のお礼と口コミ依頼を自動化',
    description: 'お礼メッセージ、Google口コミの依頼、再来店メッセージ。ぜんぶ自動。月額1,980円・初月無料。',
    images: ['/logo-full.png'],
  },
}

export default function LpLayout({ children }) {
  return children
}
