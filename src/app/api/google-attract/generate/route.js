import Anthropic from '@anthropic-ai/sdk'
import { db } from '@/lib/firebase'

const anthropic = new Anthropic()

const SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID

const PROMPTS = {
  posts: (shop, options) => `あなたは地域店舗のGoogleビジネスプロフィール運用の専門家です。
以下の店舗情報をもとに、Googleビジネスプロフィールに投稿できる文章を生成してください。

## 店舗情報
- 店舗名: ${shop.name || '未設定'}
- 業種: ${options.businessType || '飲食店'}
- 強み・特徴: ${options.strength || '特になし'}
- ターゲット客層: ${options.target || '地域のお客様'}

## 生成する投稿タイプ
${options.postTypes?.join('\n') || '- 最新情報投稿\n- 新メニュー・商品紹介投稿\n- 再来店向け投稿'}

## 出力ルール
- 各投稿は150文字以内（Googleビジネスプロフィールの推奨文字数）
- 地域名や店舗名を自然に含める
- 行動を促すCTA（来店・予約・電話など）を含める
- 絵文字は1〜2個まで、自然に使う
- 投稿の狙い（なぜこの投稿が来店につながるか）を1行で添える

以下のMarkdown形式で出力してください:

# Google投稿案

## 投稿1：（投稿タイプ名）
**タイトル：** （10文字以内）
**本文：** （投稿本文）
**おすすめ写真：** （どんな写真を添えるべきか）
**投稿の狙い：** （1行で）

（投稿タイプの数だけ繰り返し）`,

  review_reply: (shop, options) => `あなたは地域店舗のGoogle口コミ返信の専門家です。
以下の店舗情報と口コミ内容をもとに、丁寧で誠実な返信文を生成してください。

## 店舗情報
- 店舗名: ${shop.name || '未設定'}
- 業種: ${options.businessType || '飲食店'}

## 口コミ内容
評価: ${options.rating || '5'}つ星
内容: ${options.reviewContent || '（口コミ内容なし）'}

## 出力ルール
- 口コミへの感謝を述べる
- 具体的な内容に触れて「ちゃんと読んでいる」ことを伝える
- 再来店を促す一言を自然に添える
- ネガティブな口コミには謝罪＋改善姿勢を示す
- 200文字以内
- 店舗オーナーとして返信する口調

以下の形式で出力:

# 口コミ返信文

**返信文：**
（返信内容）

**返信のポイント：** （なぜこの返信が効果的か1行で）`,

  profile_check: (shop, options) => `あなたは地域店舗のGoogleビジネスプロフィール最適化の専門家です。
以下の店舗情報をもとに、Googleビジネスプロフィールの改善チェックリストを作成してください。

## 店舗情報
- 店舗名: ${shop.name || '未設定'}
- 業種: ${options.businessType || '飲食店'}
- 現在の設定状況: ${options.currentStatus || '不明'}

## 出力ルール
- チェック項目は優先度順に並べる
- 各項目に「なぜ重要か」を1行で添える
- 具体的なアクション（何をすればいいか）を明記
- 10項目以内

以下の形式で出力:

# Googleビジネスプロフィール改善チェック

## 優先度：高
- [ ] （チェック項目）
  → やること：（具体的アクション）
  → 理由：（なぜ重要か）

## 優先度：中
- [ ] （チェック項目）
  → やること：（具体的アクション）
  → 理由：（なぜ重要か）

## 優先度：低
- [ ] （チェック項目）
  → やること：（具体的アクション）
  → 理由：（なぜ重要か）`,

  monthly_plan: (shop, options) => `あなたは地域店舗のGoogleビジネスプロフィール運用の専門家です。
以下の店舗情報をもとに、1ヶ月分の投稿スケジュールを作成してください。

## 店舗情報
- 店舗名: ${shop.name || '未設定'}
- 業種: ${options.businessType || '飲食店'}
- 強み・特徴: ${options.strength || '特になし'}
- 対象月: ${options.month || '今月'}

## 出力ルール
- 週2回の投稿ペース（月8回）
- 投稿タイプをバランスよく配分
- 季節イベント・地域行事を考慮
- 各投稿の本文案も含める（150文字以内）

以下の形式で出力:

# ${options.month || '今月'}の投稿スケジュール

## 第1週
### 投稿1（○曜日）：（投稿タイプ）
**本文：** （投稿案）
**写真：** （推奨写真）

### 投稿2（○曜日）：（投稿タイプ）
**本文：** （投稿案）
**写真：** （推奨写真）

（第4週まで繰り返し）`,

  improvement_memo: (shop, options) => `あなたは地域店舗のGoogle集客コンサルタントです。
以下の店舗情報をもとに、店舗オーナー向けの改善メモを作成してください。

## 店舗情報
- 店舗名: ${shop.name || '未設定'}
- 業種: ${options.businessType || '飲食店'}
- 強み・特徴: ${options.strength || '特になし'}
- 現在の課題: ${options.challenge || '集客が伸びない'}

## 出力ルール
- 専門用語は避け、店舗オーナーがすぐ理解できる言葉で
- 「今日からできること」を3つ以上含める
- Google検索・Googleマップでの見え方を意識した提案
- 合同会社Willが代行できることも明記

以下の形式で出力:

# 店舗改善メモ

## 現状の課題
（1〜2行で）

## 今日からできること
1. （具体的アクション）
2. （具体的アクション）
3. （具体的アクション）

## Willが代行できること
- （サービス内容）

## 1ヶ月後の目標
（具体的な数値目標や状態）`,
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { type, options } = body

    if (!type || !PROMPTS[type]) {
      return Response.json({ error: '無効な生成タイプです' }, { status: 400 })
    }

    const shopSnap = await db.collection('shops').doc(SHOP_ID).get()
    if (!shopSnap.exists) {
      return Response.json({ error: '店舗データが見つかりません' }, { status: 404 })
    }
    const shop = { id: shopSnap.id, ...shopSnap.data() }

    const prompt = PROMPTS[type](shop, options || {})

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]?.text || ''

    return Response.json({ result: content })
  } catch (e) {
    console.error('Google Attract generate error:', e)
    return Response.json({ error: e.message || '生成に失敗しました' }, { status: 500 })
  }
}
