export default function TokushohoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">特定商取引法に基づく表記</h1>

        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            {[
              ['販売業者', '合同会社Will'],
              ['代表者', '髙城 智'],
              ['所在地', '鹿児島県鹿児島市城山町9番2号'],
              ['連絡先', 'メール：support@will0511.com\n※お問い合わせはメールにてお願いいたします'],
              ['サービス名', 'また来てね！'],
              ['販売価格', '月額プラン：管理画面内の料金ページに記載\n※税込価格で表示しています'],
              ['支払方法', 'クレジットカード（Stripe決済）'],
              ['支払時期', 'お申し込み時に初回決済、以降毎月自動更新'],
              ['サービス提供時期', 'お申し込み完了後、即時ご利用いただけます'],
              ['解約方法', '管理画面内「契約情報・お支払い」セクションからいつでも解約できます'],
              ['返金・キャンセル', '月途中の解約の場合、残日数分の日割り返金は行いません。\n解約後も当月末までご利用いただけます。'],
              ['動作環境', 'インターネット接続環境、LINE公式アカウント'],
            ].map(([label, value]) => (
              <tr key={label}>
                <th className="text-left py-4 pr-4 font-bold text-gray-700 align-top w-36">{label}</th>
                <td className="py-4 text-gray-800 whitespace-pre-wrap">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <a href="/lp" className="text-blue-600 text-sm hover:underline">← トップページに戻る</a>
        </div>
      </div>
    </div>
  )
}
