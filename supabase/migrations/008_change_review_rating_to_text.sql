-- review_ratingをINTからTEXTに変更（good/normal/bad を格納するため）
ALTER TABLE customers ALTER COLUMN review_rating TYPE TEXT USING review_rating::TEXT;
