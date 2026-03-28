-- ============================================================
-- 001_initial.sql
-- 初期テーブル作成: shops / customers / message_logs
-- ============================================================

-- ============================================================
-- 店舗設定テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS shops (
  id                        UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name                      TEXT        NOT NULL,
  line_channel_id           TEXT,
  line_channel_secret       TEXT,
  line_channel_access_token TEXT,
  anthropic_api_key         TEXT,
  settings                  JSONB       NOT NULL DEFAULT '{}',
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 顧客管理テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS customers (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id         UUID        NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  line_user_id    TEXT,
  display_name    TEXT,
  phone           TEXT,
  email           TEXT,
  memo            TEXT,
  tags            TEXT[]      NOT NULL DEFAULT '{}',
  last_visited_at TIMESTAMPTZ,
  visit_count     INT         NOT NULL DEFAULT 0,
  is_active       BOOLEAN     NOT NULL DEFAULT TRUE,
  metadata        JSONB       NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customers_shop_id     ON customers(shop_id);
CREATE INDEX IF NOT EXISTS idx_customers_line_user_id ON customers(line_user_id);

-- ============================================================
-- 送信履歴テーブル
-- ============================================================
CREATE TABLE IF NOT EXISTS message_logs (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id       UUID        NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  customer_id   UUID        REFERENCES customers(id) ON DELETE SET NULL,
  line_user_id  TEXT,
  message_type  TEXT        NOT NULL,
  content       TEXT,
  direction     TEXT        NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status        TEXT        NOT NULL DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'failed')),
  error_message TEXT,
  metadata      JSONB       NOT NULL DEFAULT '{}',
  sent_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_message_logs_shop_id     ON message_logs(shop_id);
CREATE INDEX IF NOT EXISTS idx_message_logs_customer_id ON message_logs(customer_id);
CREATE INDEX IF NOT EXISTS idx_message_logs_sent_at     ON message_logs(sent_at DESC);

-- ============================================================
-- updated_at 自動更新トリガー
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER shops_updated_at
  BEFORE UPDATE ON shops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
