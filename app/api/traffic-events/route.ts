import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { detectCrawler } from "@/lib/crawlerDetection";

export const runtime = "nodejs";

type Payload = {
  sessionId?: string;
  path?: string;
  query?: string | null;
  referrer?: string | null;
  isEntry?: boolean;
};

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  return value.slice(0, max);
}

function parseQuery(query: string | null) {
  const params = new URLSearchParams(query || "");

  return {
    utmSource: clean(params.get("utm_source"), 255),
    utmMedium: clean(params.get("utm_medium"), 255),
    utmCampaign: clean(params.get("utm_campaign"), 255),
    utmContent: clean(params.get("utm_content"), 255),
  };
}

function hostFromReferrer(referrer: string | null) {
  if (!referrer) return null;

  try {
    return new URL(referrer).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return null;
  }
}

function canonicalSource(value: string | null) {
  if (!value) return null;

  const source = value.toLowerCase().trim().replace(/^www\./, "");

  const aliases: Array<[string, string]> = [
    ["chatgpt", "chatgpt.com"],
    ["openai", "chatgpt.com"],
    ["claude", "claude.ai"],
    ["anthropic", "claude.ai"],
    ["perplexity", "perplexity.ai"],
    ["gemini", "gemini.google.com"],
    ["copilot", "copilot.microsoft.com"],
    ["grok", "grok.com"],
    ["deepseek", "deepseek.com"],
    ["mistral", "mistral.ai"],
    ["meta.ai", "meta.ai"],
    ["google", "google"],
    ["bing", "bing"],
    ["duckduckgo", "duckduckgo"],
    ["linkedin", "linkedin.com"],
    ["indeed", "indeed.com"],
    ["behance", "behance.net"],
    ["github", "github.com"],
    ["reddit", "reddit.com"],
    ["twitter", "x.com"],
    ["x.com", "x.com"],
    ["facebook", "facebook.com"],
    ["instagram", "instagram.com"],
    ["discord", "discord.com"],
  ];

  return aliases.find(([needle]) => source.includes(needle))?.[1] ?? source;
}

function sourceType(source: string, utmMedium: string | null) {
  if (utmMedium === "ai_referral") return "ai";

  if (
    ["chatgpt.com", "claude.ai", "perplexity.ai", "gemini.google.com", "copilot.microsoft.com", "grok.com", "deepseek.com", "mistral.ai", "meta.ai"].includes(source)
  ) {
    return "ai";
  }

  if (["google", "bing", "duckduckgo"].includes(source)) return "search";
  if (["linkedin.com", "reddit.com", "x.com", "facebook.com", "instagram.com", "discord.com"].includes(source)) return "social";
  if (source === "indeed.com") return "jobs";
  if (["behance.net", "github.com"].includes(source)) return "portfolio";
  if (source === "direct") return "direct";
  if (source === "internal") return "internal";

  return "other";
}

function localeFromPath(path: string) {
  if (path === "/en" || path.startsWith("/en/")) return "en";
  if (path === "/es" || path.startsWith("/es/")) return "es";
  return "other";
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
  const query = clean(payload.query, 4000);
  const referrer = clean(payload.referrer, 2000);

  if (!sessionId || !path || !path.startsWith("/")) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const utm = parseQuery(query);
  const referrerHost = hostFromReferrer(referrer);
  const ownHost = requestUrl.hostname.toLowerCase().replace(/^www\./, "");

  let source: string;

  if (utm.utmSource) {
    source = canonicalSource(utm.utmSource) || "direct";
  } else if (!referrerHost) {
    source = "direct";
  } else if (referrerHost === ownHost) {
    source = "internal";
  } else {
    source = canonicalSource(referrerHost) || referrerHost;
  }

  const type = sourceType(source, utm.utmMedium);
  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS traffic_events (
      id BIGSERIAL PRIMARY KEY,
      seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      query_string TEXT,
      referrer TEXT,
      source TEXT NOT NULL,
      source_type TEXT NOT NULL,
      locale TEXT NOT NULL,
      is_entry BOOLEAN NOT NULL DEFAULT FALSE,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS traffic_events_seen_at_idx
    ON traffic_events (seen_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS traffic_events_session_idx
    ON traffic_events (session_id)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS traffic_events_source_idx
    ON traffic_events (source, source_type)
  `;

  await sql`
    INSERT INTO traffic_events (
      session_id,
      path,
      query_string,
      referrer,
      source,
      source_type,
      locale,
      is_entry,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content
    )
    VALUES (
      ${sessionId},
      ${path},
      ${query},
      ${referrer},
      ${source},
      ${type},
      ${localeFromPath(path)},
      ${Boolean(payload.isEntry)},
      ${utm.utmSource},
      ${utm.utmMedium},
      ${utm.utmCampaign},
      ${utm.utmContent}
    )
  `;

  return new NextResponse(null, {
    status: 204,
    headers: { "Cache-Control": "no-store" },
  });
}
