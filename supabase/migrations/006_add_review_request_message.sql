-- 口コミ依頼メッセージ・再来店メッセージをオーナーが自由に設定できるよう追加
ALTER TABLE shops ADD COLUMN IF NOT EXISTS review_request_message TEXT;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS revisit_message_template TEXT;
