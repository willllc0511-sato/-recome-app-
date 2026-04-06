-- 星評価振り分け機能
ALTER TABLE customers ADD COLUMN IF NOT EXISTS review_rating INT;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS review_rating_responded_at TIMESTAMPTZ;
ALTER TABLE shops ADD COLUMN IF NOT EXISTS owner_line_user_id TEXT;
