-- Non-destructive migration; run before enabling the flush endpoint.
ALTER TABLE crawler_events ADD COLUMN IF NOT EXISTS ingest_id TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS crawler_events_ingest_id_unique ON crawler_events (ingest_id);
