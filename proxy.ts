import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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

export function proxy(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.next();
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
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\..*).*)",
  ],
};
