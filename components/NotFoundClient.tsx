"use client";

import Image from "next/image";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageFrame from "@/components/layout/PageFrame";

type Locale = "es" | "en";

type NotFoundCopy = {
  kicker: string;
  title: string;
  body: string;
  ctaHome: string;
  ctaContact: string;
  help1: string;
  help2: string;
  imgAlt: string;
};

const COPY: Record<Locale, NotFoundCopy> = {
  es: {
    kicker: "ERROR 404",
    title: "Esta página no existe",
    body:
      "Puede que el link esté mal, que la página se haya movido, o que el internet te esté jugando chueco. No pasa nada: te regreso al camino.",
    ctaHome: "Volver al inicio",
    ctaContact: "Contacto",
    help1: "Si llegaste aquí desde un link dentro del sitio, avísame y lo arreglo.",
    help2: "Tip: si buscabas un proyecto, vuelve al inicio y entra a “Proyectos”.",
    imgAlt: "Ilustración de página no encontrada",
  },
  en: {
    kicker: "ERROR 404",
    title: "This page doesn’t exist",
    body:
      "The link might be wrong, the page moved, or the internet is messing with you. No worries — I’ll guide you back.",
    ctaHome: "Back to home",
    ctaContact: "Contact",
    help1: "If you got here from a link inside the site, tell me and I’ll fix it.",
    help2: "Tip: if you were looking for a project, go home and open “Projects”.",
    imgAlt: "Page not found illustration",
  },
};

export default function NotFoundClient({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  const homeHref = `/${locale}`;
  const contactHref = `/${locale}#contacto`;

  return (
    <SiteShell locale={locale}>
      <main className="text-neutral-white">
        <PageFrame variant="prose" className="py-10">
          <section className="space-y-5">
            <div className="flex items-center justify-center min-h-[220px]">
              <Image
                src="/brand/errors/404-illustration.svg"
                alt={t.imgAlt}
                width={420}
                height={220}
                className="h-auto w-full max-w-[260px] opacity-90"
                priority
              />
            </div>

            <header className="space-y-4">
              <div className="text-[12px] tracking-[0.35em] text-accent-lime/80">
                {t.kicker}
              </div>

              <h1 className="text-4xl font-bold tracking-tight">{t.title}</h1>

              <p className="text-neutral-300 leading-relaxed">{t.body}</p>
            </header>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={homeHref}
                className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full sm:w-auto text-center"
              >
                {t.ctaHome}
              </Link>

              <Link
                href={contactHref}
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium border border-neutral-white/15 text-neutral-white hover:border-neutral-white/30 transition"
              >
                {t.ctaContact}
              </Link>
            </div>

            <div className="border-t border-neutral-white/10 pt-8 text-neutral-500 text-sm space-y-2">
              <p>{t.help1}</p>
              <p className="text-neutral-600">{t.help2}</p>
            </div>
          </section>
        </PageFrame>
      </main>
    </SiteShell>
  );
}
