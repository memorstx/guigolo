import type { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";

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
      title:
        locale === "es"
          ? "Guigolo · UX/UI estratégico para productos digitales"
          : "Guigolo · Strategic UX/UI for digital products",

      description:
        locale === "es"
          ? "Portafolio de Guillermo González López. Diseño experiencias digitales estratégicas con identidad propia para productos, SaaS, interfaces y plataformas web."
          : "Portfolio of Guillermo González López. I design strategic digital experiences with their own identity for products, SaaS platforms and web interfaces.",

      url: canonical,

      siteName: "Guigolo",

      images: [
        {
          url: "/og/og_v2.png",
          width: 1200,
          height: 630,
          alt:
            locale === "es"
              ? "Guigolo · UX/UI estratégico para productos digitales"
              : "Guigolo · Strategic UX/UI for digital products",
        },
      ],

      locale: locale === "es" ? "es_MX" : "en_US",

      type: "website",
    },

    twitter: {
      card: "summary_large_image",

      title:
        locale === "es"
          ? "Guigolo · UX/UI estratégico para productos digitales"
          : "Guigolo · Strategic UX/UI for digital products",

      description:
        locale === "es"
          ? "Diseño productos digitales, interfaces y experiencias web con identidad, claridad y enfoque estratégico."
          : "I design digital products, interfaces and web experiences with identity, clarity and strategic thinking.",

      images: ["/og/og_v2.png"],
    },
  };
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SeoJsonLd locale="es" />
      {children}
    </>
  );
}
