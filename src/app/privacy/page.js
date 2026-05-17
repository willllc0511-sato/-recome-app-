export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">プライバシーポリシー</h1>

        <div className="space-y-8 text-sm text-gray-800 leading-relaxed">
          <section>
            <h2 className="text-base font-bold text-gray-800 mb-2">1. 個人情報の取得</h2>
            <p>合同会社Will（以下「当社」）は、本サービス「また来てね！」の提供にあたり、以下の個人情報を取得します。</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>店舗オーナー様：氏名、メールアドレス、電話番号、店舗情報</li>
              <li>来店者様：LINEの表示名、LINE ユーザーID、来店履歴</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-800 mb-2">2. 利用目的</h2>
            <p>取得した個人情報は、以下の目的で利用します。</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>本サービスの提供・運営</li>
              <li>来店後のお礼メッセージ、口コミ依頼、再来店メッセージの送信</li>
              <li>お問い合わせへの対応</li>
              <li>サービスの改善・新機能の開発</li>
              <li>利用料金の請求</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-800 mb-2">3. 第三者提供</h2>
            <p>当社は、以下の場合を除き、個人情報を第三者に提供しません。</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>ご本人の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>サービス提供に必要な業務委託先（Stripe, Firebase, LINE）への提供</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-800 mb-2">4. 外部サービスの利用</h2>
            <p>本サービスでは以下の外部サービスを利用しています。各サービスのプライバシーポリシーもご確認ください。</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>LINE Messaging API（LINEヤフー株式会社）</li>
              <li>Firebase / Google Cloud（Google LLC）</li>
              <li>Stripe（Stripe, Inc.）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-800 mb-2">5. 個人情報の管理</h2>
            <p>当社は、個人情報の漏洩・滅失・毀損を防止するため、適切なセキュリティ対策を講じます。</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-800 mb-2">6. 開示・訂正・削除</h2>
            <p>ご本人から個人情報の開示・訂正・削除のご請求があった場合は、本人確認のうえ速やかに対応いたします。</p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-800 mb-2">7. お問い合わせ</h2>
            <p>個人情報の取り扱いに関するお問い合わせは下記までご連絡ください。</p>
            <p className="mt-2">
              合同会社Will<br />
              〒892-0853 鹿児島県鹿児島市城山町9番2号<br />
              メール：support@will0511.com
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-800 mb-2">8. 改定</h2>
            <p>本ポリシーは、法令の変更やサービス内容の変更に伴い、予告なく改定することがあります。改定後のポリシーは本ページに掲載した時点で効力を生じます。</p>
          </section>

          <p className="text-xs text-gray-400 mt-4">制定日：2026年5月17日</p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <a href="/lp" className="text-blue-600 text-sm hover:underline">← トップページに戻る</a>
        </div>
      </div>
    </div>
  )
}
