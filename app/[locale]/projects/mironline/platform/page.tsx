import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import CaseStudyPage from "@/components/projects/mironline/mironline-case-study";
import { mironlineCase, type Locale } from "@/components/projects/mironline/mironline.case";

const SUPPORTED: Locale[] = ["es", "en"];

type Params = Promise<{ locale: string }>;

function normalizeLocale(input: string): Locale {
  return SUPPORTED.includes(input as Locale) ? (input as Locale) : "es";
}


export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const copy = mironlineCase[locale];
  const baseUrl = "https://guigolo.com";
  const canonical = `${baseUrl}/${locale}/projects/mironline/platform`;

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical,
      languages: {
        es: `${baseUrl}/es/projects/mironline/platform`,
        en: `${baseUrl}/en/projects/mironline/platform`,
      },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: canonical,
      siteName: "Guigolo",
      type: "article",
      locale: locale === "es" ? "es_MX" : "en_US",
      images: [
        {
          url: "/brand/projects/mironline/cover-mironline.png",
          width: 1200,
          height: 778,
          alt: "mironline case study",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: ["/brand/projects/mironline/cover-mironline.png"],
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);

  return (
    <SiteShell locale={locale}>
      <CaseStudyPage locale={locale} copy={mironlineCase[locale]} />
    </SiteShell>
  );
}
