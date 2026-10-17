import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { detectCrawler } from "@/lib/crawlerDetection";

export const runtime = "nodejs";

const METRICS = new Set(["LCP", "INP", "CLS", "FCP", "TTFB"]);
const RATINGS = new Set(["good", "needs-improvement", "poor"]);

type Payload = {
  path?: string;
  metricId?: string;
  metricName?: string;
  value?: number;
  rating?: string;
  navigationType?: string;
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

  const path = clean(payload.path, 1000);
  const metricId = clean(payload.metricId, 160);
  const metricName = clean(payload.metricName, 20);
  const rating = clean(payload.rating, 40);
  const navigationType = clean(payload.navigationType, 80);
  const value = Number(payload.value);

  if (
    !path ||
    !path.startsWith("/") ||
    !metricId ||
    !metricName ||
    !METRICS.has(metricName) ||
    !Number.isFinite(value) ||
    value < 0
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const safeRating = rating && RATINGS.has(rating) ? rating : null;
  const sql = neon(databaseUrl);





  await sql`
    INSERT INTO performance_events (
      path,
      metric_id,
      metric_name,
      value,
      rating,
      navigation_type
    )
    VALUES (
      ${path},
      ${metricId},
      ${metricName},
      ${value},
      ${safeRating},
      ${navigationType}
    )
    ON CONFLICT (metric_id, metric_name)
    DO UPDATE SET
      seen_at = NOW(),
      path = EXCLUDED.path,
      value = EXCLUDED.value,
      rating = EXCLUDED.rating,
      navigation_type = EXCLUDED.navigation_type
  `;

  return new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
