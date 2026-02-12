import { NextRequest, NextResponse } from "next/server";

const locales = ["es", "en"] as const;

function hasLocale(pathname: string) {
  return locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

function isPublicFile(pathname: string) {
  return pathname.includes(".");
}

const LATAM = new Set([
  "MX","AR","BO","BR","CL","CO","CR","CU","DO","EC","SV","GT","HN","NI","PA","PY","PE","PR","UY","VE",
]);

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || isPublicFile(pathname)) {
    return NextResponse.next();
  }

  // Si ya trae /es o /en, no tocar
  if (hasLocale(pathname)) return NextResponse.next();

  // 1) Si el usuario ya eligió idioma antes (cookie)
  const pref = req.cookies.get("guigolo_locale")?.value;
  if (pref === "es" || pref === "en") {
    return NextResponse.redirect(new URL(`/${pref}${pathname}${search}`, req.url));
  }

  // 2) Detectar por país (Vercel suele mandar este header)
  const country = (req.headers.get("x-vercel-ip-country") || "").toUpperCase();

  const detected = LATAM.has(country) ? "es" : "en";

  return NextResponse.redirect(new URL(`/${detected}${pathname}${search}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
