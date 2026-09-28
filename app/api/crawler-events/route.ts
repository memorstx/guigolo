import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  botName?: string;
  category?: string;
  path?: string;
  query?: string | null;
  method?: string;
  userAgent?: string;
  referrer?: string | null;
  vercelId?: string | null;
};

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  return value.slice(0, max);
}

export async function POST(request: Request) {
  const ingestSecret = process.env.CRAWLER_INGEST_SECRET;
  const databaseUrl = process.env.DATABASE_URL;

  if (!ingestSecret || !databaseUrl) {
    return NextResponse.json(
      { ok: false, error: "Crawler logging is not configured." },
      { status: 503 }
    );
  }

  if (request.headers.get("x-crawler-ingest-secret") !== ingestSecret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let payload: Payload;

  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const botName = clean(payload.botName, 120);
  const category = clean(payload.category, 60);
  const path = clean(payload.path, 1000);
  const method = clean(payload.method, 12);
  const userAgent = clean(payload.userAgent, 2000);

  if (!botName || !category || !path || !method || !userAgent) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sql = neon(databaseUrl);

  await sql`
    INSERT INTO crawler_events (
      bot_name,
      category,
      path,
      query_string,
      http_method,
      user_agent,
      referrer,
      vercel_id
    )
    VALUES (
      ${botName},
      ${category},
      ${path},
      ${clean(payload.query, 4000)},
      ${method},
      ${userAgent},
      ${clean(payload.referrer, 2000)},
      ${clean(payload.vercelId, 300)}
    )
  `;

  return new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
