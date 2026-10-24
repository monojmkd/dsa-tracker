-- Optional: the API creates this automatically on first request.
CREATE TABLE IF NOT EXISTS problems (
  id         text PRIMARY KEY,
  data       jsonb NOT NULL,
  updated_at bigint NOT NULL DEFAULT 0
);
