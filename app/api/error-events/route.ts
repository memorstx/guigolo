import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { detectCrawler } from "@/lib/crawlerDetection";

export const runtime = "nodejs";

const ERROR_TYPES = new Set(["runtime", "unhandled_rejection", "render"]);

type Payload = {
  path?: string;
  errorType?: string;
  message?: string;
  stack?: string | null;
  source?: string | null;
  line?: number | null;
  column?: number | null;
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

  const requestUrl = new URL(request.url);
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  const userAgent = clean(request.headers.get("user-agent"), 2000) || "";

  if (detectCrawler(userAgent)) {
    return new NextResponse(null, { status: 204 });
  }

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
  const errorType = clean(payload.errorType, 80);
  const message = clean(payload.message, 1200);
  const stack = clean(payload.stack, 8000);
  const source = clean(payload.source, 2000);
  const line = Number.isFinite(Number(payload.line)) ? Number(payload.line) : null;
  const column = Number.isFinite(Number(payload.column)) ? Number(payload.column) : null;

  if (
    !path ||
    !path.startsWith("/") ||
    path.startsWith("/admin") ||
    !errorType ||
    !ERROR_TYPES.has(errorType) ||
    !message
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sql = neon(databaseUrl);




  await sql`
    INSERT INTO error_events (
      path,
      error_type,
      message,
      stack,
      source,
      line_number,
      column_number,
      user_agent
    )
    VALUES (
      ${path},
      ${errorType},
      ${message},
      ${stack},
      ${source},
      ${line},
      ${column},
      ${userAgent}
    )
  `;

  return new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
