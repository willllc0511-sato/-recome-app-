import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic()

const PROMPTS = {
  review_request: (options) => `あなたは地域店舗の口コミ集めの専門家です。
来店客にGoogle口コミを書いてもらうための依頼文を生成してください。

## 店舗情報
- 店舗名: ${options.shopName}
- 業種: ${options.businessType || ''}
- お店の特徴: ${options.shopFeatures || ''}
- Google口コミURL: ${options.googleReviewUrl || '（後で挿入）'}
- 来店のお礼文: ${options.thanksMessage || ''}
- 口コミを書いてほしい理由: ${options.reason || 'お店の改善に活かしたい'}

## 出力ルール
- 4パターン生成する（やわらかい版・丁寧版・短め版・LINE送信用）
- 各パターンは150文字以内
- Google口コミURLを自然に組み込む
- 押し付けがましくない、自然な依頼文にする
- 「よかったら」「もしお時間あれば」などの柔らかい導入を使う

以下の形式で出力:

# Google口コミ依頼文

## やわらかい版
（本文）

## 丁寧版
（本文）

## 短め版
（本文）

## LINE送信用
（本文）`,

  review_reply: (options) => `あなたは地域店舗のオーナーとして、Google口コミに返信してください。

## 店舗情報
- 店舗名: ${options.shopName}
- 業種: ${options.businessType || ''}
- お店の特徴: ${options.shopFeatures || ''}

## お客様の口コミ
- 星評価: ${options.rating}つ星
- 内容: ${options.reviewContent}

## 出力ルール
- 口コミへの感謝を述べる
- 具体的な内容に触れて「読んでいる」ことを伝える
- 再来店を促す一言を自然に添える
- 星3以下の場合は謝罪＋改善姿勢を示す
- 150文字以内
- 店舗オーナーの自然な口調

以下の形式で出力:

# 口コミ返信文

（返信文）`,

  google_check: (options) => `あなたは地域店舗のGoogleビジネスプロフィール改善アドバイザーです。
今月やるべきことを5つ、チェックリスト形式で出してください。

## 店舗情報
- 店舗名: ${options.shopName}
- 業種: ${options.businessType || ''}
- お店の特徴: ${options.shopFeatures || ''}
- 今月: ${options.currentMonth}

## 出力ルール
- 5項目のみ（多すぎると実行されない）
- 各項目は具体的で、今日すぐできるレベル
- 季節・時期に合った提案を含める
- 専門用語は使わない
- 所要時間の目安を添える

以下の形式で出力:

# 今月のGoogleチェック（${options.currentMonth}）

- [ ] （項目1）（所要時間）
- [ ] （項目2）（所要時間）
- [ ] （項目3）（所要時間）
- [ ] （項目4）（所要時間）
- [ ] （項目5）（所要時間）`,
}

export async function POST(request) {
  try {
    const { type, options } = await request.json()

    if (!type || !PROMPTS[type]) {
      return Response.json({ error: '無効な生成タイプです' }, { status: 400 })
    }

    const prompt = PROMPTS[type](options)

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    })

    const content = message.content[0]?.text || ''
    return Response.json({ result: content })
  } catch (e) {
    console.error('AI generate error:', e)
    return Response.json({ error: e.message || '生成に失敗しました' }, { status: 500 })
  }
}
