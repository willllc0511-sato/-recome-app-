-- 口コミ依頼機能追加
-- shops テーブルに Google レビューリンクを追加
ALTER TABLE shops ADD COLUMN IF NOT EXISTS google_review_url TEXT;

-- customers テーブルに口コミ依頼送信済み日時を追加（二重送信防止）
ALTER TABLE customers ADD COLUMN IF NOT EXISTS review_request_sent_at TIMESTAMPTZ;
