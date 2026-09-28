import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import CaseStudy from "@/components/projects/bongodex/bongodex-case-study";
import { bongodexCase, type Locale } from "@/components/projects/bongodex/bongodex.case";

const SUPPORTED: Locale[] = ["es", "en"];
type Params = Promise<{ locale: string }>;
function normalizeLocale(input: string): Locale { return SUPPORTED.includes(input as Locale) ? (input as Locale) : "es"; }

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  const copy = bongodexCase[locale];
  const canonical = `https://guigolo.com/${locale}/projects/bongodex/platform`;
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: { canonical, languages: { es: "https://guigolo.com/es/projects/bongodex/platform", en: "https://guigolo.com/en/projects/bongodex/platform" } },
    openGraph: { title: copy.meta.title, description: copy.meta.description, url: canonical, siteName: "Guigolo", type: "article", locale: locale === "es" ? "es_MX" : "en_US", images: [{ url: "/brand/projects/bongodex/case-study/01-bongodex-cover.png", width: 1600, height: 1000, alt: "bongodex case study" }] },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale: rawLocale } = await params;
  const locale = normalizeLocale(rawLocale);
  return <SiteShell locale={locale}><CaseStudy locale={locale} copy={bongodexCase[locale]} /></SiteShell>;
}
