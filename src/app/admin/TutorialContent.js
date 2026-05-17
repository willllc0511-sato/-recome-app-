'use client'

const steps = [
  {
    emoji: '✏️',
    title: 'お店の情報を入れる',
    body: 'メニューの「店舗設定」から、店名・Google口コミURL・メッセージを入力して保存します。',
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
    emoji: '📝',
    title: '口コミ・再来店ツールを使う',
    body: null,
    list: [
      { label: '口コミ依頼文', text: '来店客に口コミを書いてもらうための文面をAIが作成します' },
      { label: '口コミ返信AI', text: 'もらった口コミを貼り付けると、返信文を自動で作れます' },
      { label: 'Googleチェック', text: '毎月やるべき改善を5つ提案してくれます' },
    ],
  },
]

export default function TutorialContent() {
  return (
    <div className="space-y-6">
      {steps.map((step, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-base">
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-800 mb-1">
              {step.emoji} {step.title}
            </h3>
            {step.body && (
              <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
            )}
            {step.list && (
              <ul className="space-y-2 mt-1">
                {step.list.map((item, j) => (
                  <li key={j} className="text-sm text-gray-600 leading-relaxed">
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
  )
}
