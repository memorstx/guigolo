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
  nav: {
    projects: string;
    contact: string;
    top: string;
  };
  copyrightSuffix: string;
};

type Props = {
  copy: FooterCopy;
  locale: "es" | "en";
};

export default function Footer({ copy, locale }: Props) {
  const [open, setOpen] = useState(false);
  const [missionsDone, setMissionsDone] = useState<number>(0);

  useEffect(() => {
    setMissionsDone(getCompletedMissionsCount());

    const off = onMissionUnlocked(() => {
      setMissionsDone(getCompletedMissionsCount());
    });

    return () => off();
  }, []);

  const homeHash = (hash: string) => `/${locale}${hash}`;

  return (
    <Section className="py-14 bg-black">
      <MissionsPanel open={open} onClose={() => setOpen(false)} />

      <div className="h-px w-full bg-white/10" />

      <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-white font-semibold tracking-wide">{copy.brand}</p>
          <p className="mt-2 text-white/60 max-w-xl">
            {copy.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start md:justify-end gap-3">
          <AchievementsCounter />

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="whitespace-nowrap rounded-full border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-2 text-[11px] tracking-[0.22em] text-neutral-white/70 hover:border-neutral-white/25 transition"
          >
            {copy.missionsLabel}: {missionsDone}/{totalMissions} · {copy.missionsCta}
          </button>

          <a
            href={homeHash("#projects")}
            className="text-sm text-white/60 hover:text-white transition"
          >
            {copy.nav.projects}
          </a>

          <a
            href={homeHash("#contacto")}
            className="text-sm text-white/60 hover:text-white transition"
          >
            {copy.nav.contact}
          </a>

          <a
            href={homeHash("#home")}
            className="text-sm text-white/60 hover:text-white transition"
          >
            {copy.nav.top}
          </a>
        </div>
      </div>

      <p className="mt-10 text-xs text-white/40">
        © {new Date().getFullYear()} {copy.copyrightSuffix}
      </p>
    </Section>
  );
}
