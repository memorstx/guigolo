import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = ["es", "en"] as const;
type Locale = (typeof SUPPORTED)[number];

function pickLocaleFromAcceptLanguage(al: string | null): Locale {
  const header = (al || "").toLowerCase();

  // Parse simple y suficiente: "es-MX,es;q=0.9,en-US;q=0.8,en;q=0.7"
  const parts = header
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  const candidates: { locale: Locale; q: number; order: number }[] = [];

  parts.forEach((part, idx) => {
    const [langRaw, ...params] = part.split(";").map((s) => s.trim());
    const qParam = params.find((p) => p.startsWith("q="));
    const q = qParam ? Number(qParam.replace("q=", "")) : 1;

    const lang = (langRaw || "").toLowerCase();

    // Normaliza a "es" o "en" si empieza con eso
    let locale: Locale | null = null;
    if (lang.startsWith("es")) locale = "es";
    if (lang.startsWith("en")) locale = "en";

    if (locale) candidates.push({ locale, q: Number.isFinite(q) ? q : 1, order: idx });
  });

  if (!candidates.length) return "es";

  // Mayor q gana. Si empatan, el que aparece primero gana.
  candidates.sort((a, b) => (b.q - a.q) || (a.order - b.order));

  return candidates[0]!.locale;
}

function isPublicFile(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/og") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/services") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/hero") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".txt") ||
    pathname.endsWith(".xml") ||
    pathname.endsWith(".json")
  );
}

// ✅ Next.js 16: debe exportar `proxy` o default function
export function proxy(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, search } = url;

  if (isPublicFile(pathname)) return NextResponse.next();

  // Ya trae locale
  if (pathname === "/es" || pathname.startsWith("/es/")) return NextResponse.next();
  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  const locale = pickLocaleFromAcceptLanguage(req.headers.get("accept-language"));

  // Root "/" → /es o /en
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${locale}${search}`, req.url));
  }

  // Cualquier ruta sin prefijo → /{locale}/...
  return NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, req.url));
}

export default proxy;
