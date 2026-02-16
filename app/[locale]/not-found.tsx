import { headers } from "next/headers";
import NotFoundClient from "@/components/NotFoundClient";

function pickLocaleFromAcceptLanguage(al: string | null): "es" | "en" {
  const header = (al || "").toLowerCase();
  const parts = header.split(",").map((p) => p.trim()).filter(Boolean);

  const candidates: { locale: "es" | "en"; q: number; order: number }[] = [];

  parts.forEach((part, idx) => {
    const [langRaw, ...params] = part.split(";").map((s) => s.trim());
    const qParam = params.find((p) => p.startsWith("q="));
    const q = qParam ? Number(qParam.replace("q=", "")) : 1;

    const lang = (langRaw || "").toLowerCase();

    let locale: "es" | "en" | null = null;
    if (lang.startsWith("es")) locale = "es";
    if (lang.startsWith("en")) locale = "en";

    if (locale) candidates.push({ locale, q: Number.isFinite(q) ? q : 1, order: idx });
  });

  if (!candidates.length) return "es";
  candidates.sort((a, b) => (b.q - a.q) || (a.order - b.order));
  return candidates[0]!.locale;
}

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const h = await headers();
  const al = h.get("accept-language");
  const locale = pickLocaleFromAcceptLanguage(al);

  return <NotFoundClient locale={locale} />;
}
