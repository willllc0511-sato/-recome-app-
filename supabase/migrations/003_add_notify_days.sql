-- ============================================================
-- 003_add_notify_days.sql
-- 再来店通知日数カラムの追加
-- ============================================================

-- 店舗ごとのデフォルト通知日数（例: 30日来店がなければ通知）
ALTER TABLE shops
  ADD COLUMN IF NOT EXISTS default_notify_days INT NOT NULL DEFAULT 30;

-- 顧客ごとの上書き通知日数（NULLの場合は shops.default_notify_days を使用）
ALTER TABLE customers
  ADD COLUMN IF NOT EXISTS notify_days_override INT;
