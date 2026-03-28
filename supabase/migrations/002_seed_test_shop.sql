-- ============================================================
-- 002_seed_test_shop.sql
-- テスト用店舗データの挿入
-- ============================================================

INSERT INTO shops (
  id,
  name,
  line_channel_id,
  settings
) VALUES (
  gen_random_uuid(),
  'テスト店舗',
  'YOUR_LINE_CHANNEL_ID',
  '{}'
)
RETURNING id, name;
-- 実行後に表示される id を .env.local の NEXT_PUBLIC_SHOP_ID に設定してください
