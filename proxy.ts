import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { detectCrawler } from "@/lib/crawlerDetection";
import {
  CRAWLER_SESSION_COOKIE,
  verifyCrawlerSession,
} from "@/lib/crawlerSession";

const AI_SOURCES = [
  {
    source: "chatgpt.com",
    matches: ["chatgpt.com", "openai.com", "chatgpt"],
  },
  {
    source: "claude.ai",
    matches: ["claude.ai", "anthropic.com", "claude"],
  },
  {
    source: "perplexity.ai",
    matches: ["perplexity.ai", "perplexity"],
  },
  {
    source: "gemini.google.com",
    matches: ["gemini.google.com", "gemini"],
  },
  {
    source: "copilot.microsoft.com",
    matches: ["copilot.microsoft.com", "microsoftcopilot", "copilot"],
  },
  {
    source: "grok.com",
    matches: ["grok.com", "grok"],
  },
  {
    source: "deepseek.com",
    matches: ["chat.deepseek.com", "deepseek.com", "deepseek"],
  },
  {
    source: "mistral.ai",
    matches: ["chat.mistral.ai", "mistral.ai", "mistral"],
  },
  {
    source: "meta.ai",
    matches: ["meta.ai"],
  },
] as const;

function normalizeAiSource(value: string | null) {
  if (!value) return null;

  const normalized = value.toLowerCase().trim();

  return (
    AI_SOURCES.find(({ matches }) =>
      matches.some((match) => normalized.includes(match))
    )?.source ?? null
  );
}

function sourceFromReferrer(referrer: string | null) {
  if (!referrer) return null;

  try {
    return normalizeAiSource(new URL(referrer).hostname);
  } catch {
    return null;
  }
}

function contentFromPath(pathname: string) {
  const withoutLocale = pathname
    .replace(/^\/(es|en)(?=\/|$)/, "")
    .replace(/^\/+|\/+$/g, "");

  if (!withoutLocale) return "home";

  return withoutLocale
    .replace(/[^a-z0-9]+/gi, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
}

async function protectAdmin(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) {
    return null;
  }

  if (pathname === "/admin/crawlers/login") {
    return null;
  }

  const user = process.env.CRAWLER_DASHBOARD_USER || "guigolo";
  const password = process.env.CRAWLER_DASHBOARD_PASSWORD;
  const signingSecret = process.env.CRAWLER_INGEST_SECRET;

  if (!password || !signingSecret) {
    return new NextResponse("Crawler Radar no está configurado.", {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const token = request.cookies.get(CRAWLER_SESSION_COOKIE)?.value;
  const validSession = await verifyCrawlerSession(token, user, signingSecret);

  if (validSession) {
    return null;
  }

  const loginUrl = new URL("/admin/crawlers/login", request.url);
  loginUrl.searchParams.set(
    "next",
    `${request.nextUrl.pathname}${request.nextUrl.search}`
  );

  return NextResponse.redirect(loginUrl);
}

function logCrawler(request: NextRequest, event: NextFetchEvent) {
  const userAgent = request.headers.get("user-agent") || "";
  const crawler = detectCrawler(userAgent);
  const ingestSecret = process.env.CRAWLER_INGEST_SECRET;

  if (!crawler || !ingestSecret) {
    return;
  }

  const payload = {
    botName: crawler.name,
    category: crawler.category,
    path: request.nextUrl.pathname,
    query: request.nextUrl.searchParams.toString() || null,
    method: request.method,
    userAgent,
    referrer: request.headers.get("referer"),
    vercelId: request.headers.get("x-vercel-id"),
  };

  const endpoint = new URL("/api/crawler-events", request.url);

  event.waitUntil(
    fetch(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-crawler-ingest-secret": ingestSecret,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
      .then(() => undefined)
      .catch(() => undefined)
  );
}

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const dashboardResponse = await protectAdmin(request);

  if (dashboardResponse) {
    return dashboardResponse;
  }

  if (request.method === "GET") {
    logCrawler(request, event);
  }

  const url = request.nextUrl.clone();

  const sourceFromUtm = normalizeAiSource(url.searchParams.get("utm_source"));
  const sourceFromHeader = sourceFromReferrer(request.headers.get("referer"));
  const aiSource = sourceFromUtm ?? sourceFromHeader;

  if (!aiSource) {
    return NextResponse.next();
  }

  let changed = false;

  if (!url.searchParams.has("utm_source")) {
    url.searchParams.set("utm_source", aiSource);
    changed = true;
  }

  if (!url.searchParams.has("utm_medium")) {
    url.searchParams.set("utm_medium", "ai_referral");
    changed = true;
  }

  if (!url.searchParams.has("utm_campaign")) {
    url.searchParams.set("utm_campaign", "portfolio_discovery");
    changed = true;
  }

  if (!url.searchParams.has("utm_content")) {
    url.searchParams.set("utm_content", contentFromPath(url.pathname));
    changed = true;
  }

  return changed ? NextResponse.redirect(url, 307) : NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|woff|woff2|ttf|otf)$).*)",
  ],
};
