DROP TABLE IF EXISTS urls;
CREATE TABLE IF NOT EXISTS urls (short_path TEXT, original_url TEXT);
INSERT INTO urls (short_path, original_url) VALUES ('x.com', 'example.com');
