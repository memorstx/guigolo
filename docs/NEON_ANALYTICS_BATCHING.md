# Neon crawler-event batching (review branch)

## Purpose
Preserve every raw crawler event and existing dashboard queries while reducing Neon writes. Requests enqueue into durable Upstash Redis; a daily Vercel Cron bulk-inserts into Neon (up to 3,000 items per run). **Do not merge or deploy until verified.**

## Required before deploying
1. On the target Neon branch, run `db/migrations/20261017_crawler_ingest_id.sql` once. The new unique index guarantees retry idempotency; existing history is preserved.
2. Provision persistent Upstash Redis. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` as Vercel environment variables for the environment being tested.
3. Add a strong `CRON_SECRET` to Vercel. Leave existing `CRAWLER_INGEST_SECRET` and `DATABASE_URL` in place.
4. Deploy this branch to Preview and validate ingestion, Redis queue length, manual authorized cron execution, dashboard filters, history, charts, timestamps, and duplicate-proof retries.
5. Simulate Redis and Neon outages; verify queued items survive and are replayed. Monitor queue size and database writes.

## Important limitations
- Dashboard data has up to about one day delay until flush; raw events are not intentionally discarded.
- Cron caps each execution at 3,000 items and 60 seconds; backlogs can accumulate if events exceed capacity. Set queue-size alerts, and adjust frequency/capacity after measuring usage.
- If Upstash is down or unconfigured, crawler ingestion falls back to immediate Neon INSERT to retain functionality, which can increase Neon usage.
- Existing traffic/action/performance/error/not-found ingestion continues writing directly to Neon. This change doesn't guarantee you will remain under monthly Neon limits.
- Five ingestion handlers no longer attempt DDL on every event. Existing tables and indexes must be created through migrations on any fresh database.
- This branch has not been proven by end-to-end tests or a preview deployment yet; don't assume the cost reduction is validated.

## Verification checklist
- Typecheck (`pnpm exec tsc --noEmit`) and lint (`pnpm lint`).
- Ingest a crawler event; response 204 and Redis queue length increases.
- Execute `GET /api/cron/flush-crawlers` with `Authorization: Bearer <CRON_SECRET>`; verify exactly one saved row retaining `seen_at`.
- Repeat with same event ID / crash-retry case; no duplicate rows.
- Confirm chart time ranges, full history, pagination, search, and filters match previous behavior.
- Compare Neon compute use against real baseline and verify Upstash quota and retention settings.
