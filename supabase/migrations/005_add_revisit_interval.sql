-- 再来店メッセージ送信間隔（日数）をshopsテーブルに追加
ALTER TABLE shops
  ADD COLUMN IF NOT EXISTS revisit_message_interval_days INT NOT NULL DEFAULT 20;
