import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = ["es", "en"] as const;
type Locale = (typeof SUPPORTED)[number];

function detectLocale(req: NextRequest): Locale {
  const al = req.headers.get("accept-language") || "";
  const lower = al.toLowerCase();

  // Si el navegador prefiere inglés → en, si no → es (por defecto)
  if (lower.startsWith("en") || lower.includes("en-")) return "en";
  return "es";
}

function isPublicFile(pathname: string) {
  // Archivos y rutas que NO queremos redirigir
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

  // No tocar assets / api / _next
  if (isPublicFile(pathname)) return NextResponse.next();

  // Ya trae locale
  if (pathname === "/es" || pathname.startsWith("/es/")) return NextResponse.next();
  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  // Root "/" → manda a /es o /en según navegador
  const locale = detectLocale(req);

  if (pathname === "/") {
    const dest = new URL(`/${locale}${search}`, req.url);
    return NextResponse.redirect(dest);
  }

  // Cualquier ruta sin prefijo → la empujamos a /{locale}/...
  const dest = new URL(`/${locale}${pathname}${search}`, req.url);
  return NextResponse.redirect(dest);
}

// También vale export default (por si acaso)
export default proxy;
