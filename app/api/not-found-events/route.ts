import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { detectCrawler } from "@/lib/crawlerDetection";

export const runtime = "nodejs";

type Payload = {
  path?: string;
  query?: string | null;
  referrer?: string | null;
};

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  return value.slice(0, max);
}

function sourceHost(referrer: string | null) {
  if (!referrer) return null;

  try {
    return new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");

  if (origin && origin !== requestUrl.origin) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const path = clean(payload.path, 1000);
  const query = clean(payload.query, 4000);
  const referrer = clean(payload.referrer, 2000);
  const userAgent = clean(request.headers.get("user-agent"), 2000);

  if (!path || !path.startsWith("/")) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const crawler = detectCrawler(userAgent || "");
  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS not_found_events (
      id BIGSERIAL PRIMARY KEY,
      seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      path TEXT NOT NULL,
      query_string TEXT,
      referrer TEXT,
      source_host TEXT,
      user_agent TEXT,
      bot_name TEXT,
      bot_category TEXT
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS not_found_events_seen_at_idx
    ON not_found_events (seen_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS not_found_events_path_idx
    ON not_found_events (path)
  `;

  await sql`
    INSERT INTO not_found_events (
      path,
      query_string,
      referrer,
      source_host,
      user_agent,
      bot_name,
      bot_category
    )
    VALUES (
      ${path},
      ${query},
      ${referrer},
      ${sourceHost(referrer)},
      ${userAgent},
      ${crawler?.name ?? null},
      ${crawler?.category ?? null}
    )
  `;

  return new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
