"use client";

import { useEffect, useState } from "react";
import Section from "./Section";

import AchievementsCounter from "@/components/gamification/AchievementsCounter";
import MissionsPanel from "@/components/gamification/MissionsPanel";

import { getCompletedMissionsCount } from "@/components/gamification/missionsStore";
import { MISSIONS } from "@/components/gamification/missionsCatalog";
import { onMissionUnlocked } from "@/components/gamification/missionsEvents";

const totalMissions = MISSIONS.length;

type FooterCopy = {
  brand: string;
  tagline: string;

  missionsLabel: string;
  missionsCta: string;

  navTitle?: string;
  nav: {
    home: string;
    services: string;
    projects: string;
    about: string;
    faq: string;
    contact: string;
    whatIsGuigolo: string;
  };

  copyrightSuffix: string;
};

type Props = {
  copy: FooterCopy;
  locale: "es" | "en";
};

export default function Footer({ copy, locale }: Props) {
  const [open, setOpen] = useState(false);
  const [missionsDone, setMissionsDone] = useState(0);

  useEffect(() => {
    // Mantiene igual el HTML inicial del servidor y del cliente.
    setMissionsDone(getCompletedMissionsCount());

    const off = onMissionUnlocked(() => {
      setMissionsDone(getCompletedMissionsCount());
    });

    return () => off();
  }, []);

  // ✅ Links dentro del home con locale
  const homeHash = (hash: string) => `/${locale}${hash}`;

  // ✅ Página aparte con locale
  const whatIsHref = `/${locale}/what-is-guigolo`;

  return (
    <Section className="bg-black">
      <MissionsPanel open={open} onClose={() => setOpen(false)} />

      <div className="py-14">
        <div className="h-px w-full bg-white/10" />

        {/* Layout principal: 3 bloques */}
        <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:items-start">
          {/* 1) Brand */}
          <div className="space-y-3">
            <p className="text-white font-semibold tracking-wide">{copy.brand}</p>
            <p className="text-white/60 max-w-xl">{copy.tagline}</p>

            <p className="text-[11px] tracking-[0.22em] text-white/35">
              MODULE · FOOTER SIGNAL
            </p>
          </div>

          {/* 2) Gamification */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <AchievementsCounter />

              <button
                type="button"
                onClick={() => setOpen(true)}
                className="whitespace-nowrap rounded-full border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-2 text-[11px] tracking-[0.22em] text-neutral-white/70 hover:border-neutral-white/25 transition"
              >
                {copy.missionsLabel}: {missionsDone}/{totalMissions} · {copy.missionsCta}
              </button>
            </div>

            <p className="text-white/45 text-sm leading-relaxed max-w-[36rem]">
              {/* micro-copy opcional (si no quieres, bórralo) */}
              {locale === "es"
                ? "Tip: si desbloqueaste algo, abre “Misiones” y presume tantito."
                : "Tip: if you unlocked something, open “Missions” and flex a little."}
            </p>
          </div>

          {/* 3) Nav */}
          <div className="space-y-4 lg:justify-self-end">
            <p className="text-white/70 text-xs tracking-[0.22em] uppercase">
              {copy.navTitle ?? (locale === "es" ? "Navegación" : "Navigation")}
            </p>

            <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <a href={homeHash("#home")} className="text-white/60 hover:text-white transition">
                {copy.nav.home}
              </a>

              <a href={whatIsHref} className="text-white/60 hover:text-white transition">
                {copy.nav.whatIsGuigolo}
              </a>

              <a href={homeHash("#services")} className="text-white/60 hover:text-white transition">
                {copy.nav.services}
              </a>

              <a href={homeHash("#projects")} className="text-white/60 hover:text-white transition">
                {copy.nav.projects}
              </a>

              <a href={homeHash("#about")} className="text-white/60 hover:text-white transition">
                {copy.nav.about}
              </a>

              <a href={homeHash("#faq")} className="text-white/60 hover:text-white transition">
                {copy.nav.faq}
              </a>

              <a href={homeHash("#contacto")} className="text-white/60 hover:text-white transition">
                {copy.nav.contact}
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-white/10" />

        <p className="mt-8 text-xs text-white/40">
          © {new Date().getFullYear()} {copy.copyrightSuffix}
        </p>
      </div>
    </Section>
  );
}
