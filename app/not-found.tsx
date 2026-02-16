import { headers } from "next/headers";
import NotFoundClient from "@/components/NotFoundClient";

function detectLocaleFromAcceptLanguage(al: string | null): "es" | "en" {
  const s = (al || "").toLowerCase();
  if (s.startsWith("en") || s.includes("en-")) return "en";
  return "es";
}

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const h = await headers();
  const al = h.get("accept-language");
  const locale = detectLocaleFromAcceptLanguage(al);

  return <NotFoundClient locale={locale} />;
}
