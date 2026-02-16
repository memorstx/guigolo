import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageFrame from "@/components/layout/PageFrame";
import FeedbackButtons from "@/components/FeedbackButtons";
import { getDict } from "@/lib/i18n/getDict";

type Params = Promise<{ locale: "es" | "en" }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  const m = dict.whatIsGuigolo.meta;

  const baseUrl = "https://guigolo.com";
  const url = `${baseUrl}/${locale}/what-is-guigolo`;

  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDescription,
      url,
      siteName: "Guigolo",
      type: "article",
    },
    alternates: {
      canonical: url,
      languages: {
        es: `${baseUrl}/es/what-is-guigolo`,
        en: `${baseUrl}/en/what-is-guigolo`,
      },
    },
  };
}

export default async function WhatIsGuigoloPage({
  params,
}: {
  params: Promise<{ locale: "es" | "en" }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const copy = dict.whatIsGuigolo;

  const homeHref = `/${locale}`;
  const aboutHref = `/${locale}#about`;

  return (
    <SiteShell locale={locale}>
      <main className="text-neutral-white">
        <PageFrame variant="prose" className="py-24">
          <article className="leading-relaxed">
            {/* Back */}
            <Link
              href={homeHref}
              className="inline-flex items-center gap-2 text-sm text-neutral-white/50 hover:text-neutral-white transition group"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              {copy.backToHome}
            </Link>

            {/* HERO */}
            <header className="mt-10 space-y-5">
              <h1 className="heading-h2">{copy.heroTitle}</h1>
              <p className="text-neutral-white/70 text-lg">{copy.heroSubtitle}</p>
            </header>

            {/* INTRO */}
            <section className="mt-12 space-y-6 text-neutral-white/75 text-[16px] font-light">
              {copy.intro.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </section>

            {/* CONFUSION */}
            <section className="mt-12 text-neutral-white/75 font-light">
              <h2 className="text-xl font-semibold tracking-tight mb-5">
                {copy.confusionTitle}
              </h2>
              <div className="space-y-6">
                {copy.confusion.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* ACCENT */}
            <section className="mt-12 text-neutral-white/75 font-light">
              <h2 className="text-xl font-semibold tracking-tight mb-5">
                {copy.accentTitle}
              </h2>
              <div className="space-y-6">
                {copy.accent.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* RECLAIM */}
            <section className="mt-12 text-neutral-white/75 font-light">
              <h2 className="text-xl font-semibold tracking-tight mb-5">
                {copy.reclaimTitle}
              </h2>
              <div className="space-y-6">
                {copy.reclaim.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </section>

            {/* SYSTEM */}
            <section className="mt-12 text-neutral-white/75 font-light">
              <h2 className="text-xl font-semibold tracking-tight mb-5">
                {copy.systemTitle}
              </h2>
              <div className="space-y-6">
                {copy.system.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}

                <p>
                  <Link
                    href={copy.brandbookHref}
                    className="text-accent-lime hover:underline"
                  >
                    {copy.brandbookCta}
                  </Link>
                </p>
              </div>
            </section>

            {/* HUMAN */}
            <section className="mt-12 text-neutral-white/75 font-light">
              <div className="space-y-6">
                {copy.human.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}

                <p>
                  <Link
                    href={aboutHref}
                    className="text-accent-lime hover:underline"
                  >
                    {copy.aboutCta}
                  </Link>
                </p>
              </div>
            </section>

            {/* SUMMARY */}
            <section className="mt-14 space-y-4 text-neutral-white/70 border-t border-neutral-white/10 pt-12">
              <p className="font-semibold">{copy.summaryTitle}</p>
              <ul className="list-disc list-inside space-y-2 font-light">
                {copy.summaryBullets.map((li: string, i: number) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            </section>

            {/* FEEDBACK */}
            <section className="mt-12 space-y-6 pt-12 border-t border-neutral-white/10 font-light">
              <h2 className="text-lg font-semibold">
                {copy.feedback.question}
              </h2>

              <FeedbackButtons
                pageId="what-is-guigolo"
                options={copy.feedback.options as any}
                thanksText={copy.feedback.thanks}
              />
            </section>
          </article>
        </PageFrame>
      </main>
    </SiteShell>
  );
}
