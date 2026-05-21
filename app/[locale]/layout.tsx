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
        "Diseño que impulsa, conecta y acompaña tu visión.",
      url: canonical,
      siteName: "Guigolo",
      images: [
        {
          url: "/og/og_v2.png",
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
      title:
        locale === "es"
          ? "Guigolo · Diseño UX/UI para productos digitales"
          : "Guigolo · UX/UI Design for Digital Products",
      description:
      locale === "es"
        ? "Portafolio de Guillermo González López. Diseño interfaces claras, humanas y estratégicas para productos digitales, marcas y experiencias web."
        : "Guillermo González López portfolio. I design clear, human and strategic interfaces for digital products, brands and web experiences.",
      images: ["/og/og_v2.png"],
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
