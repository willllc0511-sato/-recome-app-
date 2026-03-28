-- ============================================================
-- 店舗設定テーブル
-- ============================================================
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,                        -- 店舗名
  line_channel_id TEXT,                      -- LINE チャネルID
  line_channel_secret TEXT,                  -- LINE チャネルシークレット
  line_channel_access_token TEXT,            -- LINE アクセストークン
  anthropic_api_key TEXT,                    -- Anthropic APIキー（店舗ごとに持つ場合）
  settings JSONB DEFAULT '{}',              -- その他設定（自由形式）
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 顧客管理テーブル
-- ============================================================
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  line_user_id TEXT,                         -- LINE ユーザーID
  display_name TEXT,                         -- 表示名
  phone TEXT,                                -- 電話番号
  email TEXT,                                -- メールアドレス
  memo TEXT,                                 -- メモ・備考
  tags TEXT[] DEFAULT '{}',                  -- タグ（複数）
  last_visited_at TIMESTAMPTZ,               -- 最終来店日
  visit_count INT NOT NULL DEFAULT 0,        -- 来店回数
  is_active BOOLEAN NOT NULL DEFAULT TRUE,  -- 有効フラグ
  metadata JSONB DEFAULT '{}',              -- 追加情報（自由形式）
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_customers_shop_id ON customers(shop_id);
CREATE INDEX idx_customers_line_user_id ON customers(line_user_id);

-- ============================================================
-- 送信履歴テーブル
-- ============================================================
CREATE TABLE message_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  line_user_id TEXT,                         -- LINE ユーザーID（顧客削除後も記録）
  message_type TEXT NOT NULL,               -- 'text' | 'image' | 'flex' など
  content TEXT,                              -- 送信メッセージ内容
  direction TEXT NOT NULL,                  -- 'outbound'（店→顧客）| 'inbound'（顧客→店）
  status TEXT NOT NULL DEFAULT 'sent',      -- 'sent' | 'failed' | 'pending'
  error_message TEXT,                        -- エラー内容（失敗時）
  metadata JSONB DEFAULT '{}',              -- 追加情報（自由形式）
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_message_logs_shop_id ON message_logs(shop_id);
CREATE INDEX idx_message_logs_customer_id ON message_logs(customer_id);
CREATE INDEX idx_message_logs_sent_at ON message_logs(sent_at DESC);

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

CREATE TRIGGER shops_updated_at
  BEFORE UPDATE ON shops
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
