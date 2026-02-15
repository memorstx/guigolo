import { NextRequest, NextResponse } from "next/server";

const locales = ["es", "en"] as const;
type Locale = (typeof locales)[number];

const LATAM = new Set([
  "MX","AR","BO","BR","CL","CO","CR","CU","DO","EC","SV","GT","HN","NI","PA","PY","PE","PR","UY","VE",
]);

function hasLocale(pathname: string) {
  return locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

function isPublicFile(pathname: string) {
  return pathname.includes(".");
}

function detectLocale(req: NextRequest): Locale {
  // 1) Idioma del navegador (Accept-Language)
  const accept = (req.headers.get("accept-language") || "").toLowerCase();

  // Preferencia explícita por orden del header: si empieza con es → es, si empieza con en → en
  // (más correcto que "includes", porque "includes" detecta es aunque esté al final con q=0.1)
  if (accept.startsWith("es")) return "es";
  if (accept.startsWith("en")) return "en";

  // 2) País por IP (Vercel)
  const country = (req.headers.get("x-vercel-ip-country") || "").toUpperCase();
  if (country) return LATAM.has(country) ? "es" : "en";

  // 3) Default
  return "en"; // cámbialo a "es" si quieres default español
}

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || isPublicFile(pathname)) {
    return NextResponse.next();
  }

  if (hasLocale(pathname)) return NextResponse.next();

  const detected = detectLocale(req);
  return NextResponse.redirect(new URL(`/${detected}${pathname}${search}`, req.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
