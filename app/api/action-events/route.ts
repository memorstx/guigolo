import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { detectCrawler } from "@/lib/crawlerDetection";

export const runtime = "nodejs";

const ACTION_TYPES = new Set([
  "contact_open",
  "contact_submit",
  "email_click",
  "phone_click",
  "whatsapp_click",
  "resume_open",
  "project_open",
  "project_external",
  "locale_switch",
  "external_click",
]);

type Payload = {
  sessionId?: string;
  path?: string;
  actionType?: string;
  actionLabel?: string;
  href?: string | null;
};

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  return value.slice(0, max);
}

export async function POST(request: Request) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  const userAgent = clean(request.headers.get("user-agent"), 2000) || "";

  if (detectCrawler(userAgent)) {
    return new NextResponse(null, { status: 204 });
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

  const sessionId = clean(payload.sessionId, 100);
  const path = clean(payload.path, 1000);
  const actionType = clean(payload.actionType, 80);
  const actionLabel = clean(payload.actionLabel, 160);
  const href = clean(payload.href, 2000);

  if (
    !sessionId ||
    !path ||
    !path.startsWith("/") ||
    !actionType ||
    !ACTION_TYPES.has(actionType)
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS action_events (
      id BIGSERIAL PRIMARY KEY,
      seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      action_type TEXT NOT NULL,
      action_label TEXT,
      href TEXT
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS action_events_seen_at_idx
    ON action_events (seen_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS action_events_session_idx
    ON action_events (session_id)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS action_events_type_idx
    ON action_events (action_type)
  `;

  await sql`
    INSERT INTO action_events (
      session_id,
      path,
      action_type,
      action_label,
      href
    )
    VALUES (
      ${sessionId},
      ${path},
      ${actionType},
      ${actionLabel},
      ${href}
    )
  `;

  return new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
