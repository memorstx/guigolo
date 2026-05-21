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
      title: "Guigolo · Diseño centrado en usuario y negocio",
      description:
        "Diseño que impulsa, conecta y acompaña tu visión. Interfaces humanas, claras y con intención.",
      url: canonical,
      siteName: "Guigolo",
      images: [
        {
          url: "/og/cover-social.png",
          width: 1200,
          height: 630,
          alt: "Guigolo · Portafolio UX/UI",
        },
      ],
      locale: locale === "es" ? "es_MX" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Guigolo · Diseño centrado en usuario y negocio",
      description:
        "Diseño que impulsa, conecta y acompaña tu visión. Interfaces humanas, claras y con intención.",
      images: ["/og/cover-social.png"],
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
