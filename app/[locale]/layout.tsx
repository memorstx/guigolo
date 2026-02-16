import type { Metadata } from "next";

const SUPPORTED = ["es", "en"] as const;
type Locale = (typeof SUPPORTED)[number];

function normalizeLocale(input: string): Locale {
  return SUPPORTED.includes(input as Locale) ? (input as Locale) : "es";
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = normalizeLocale(raw);

  const baseUrl = "https://guigolo.com";
  const canonical = `${baseUrl}/${locale}`;

  return {
    alternates: {
      canonical,
      languages: {
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      url: canonical,
      locale: locale === "es" ? "es_MX" : "en_US",
    },
  };
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
