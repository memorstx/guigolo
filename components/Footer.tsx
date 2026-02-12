"use client";

import { useEffect, useState } from "react";
import Section from "./Section";

import AchievementsCounter from "@/components/gamification/AchievementsCounter";
import MissionsPanel from "@/components/gamification/MissionsPanel";

import { getCompletedMissionsCount } from "@/components/gamification/missionsStore";
import { MISSIONS } from "@/components/gamification/missionsCatalog";
import { onMissionUnlocked } from "@/components/gamification/missionsEvents";

const totalMissions = MISSIONS.length;

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [missionsDone, setMissionsDone] = useState<number>(0);

  useEffect(() => {
    setMissionsDone(getCompletedMissionsCount());

    const off = onMissionUnlocked(() => {
      setMissionsDone(getCompletedMissionsCount());
    });

    return () => off();
  }, []);

  return (
    <Section className="py-14 bg-black">
      <MissionsPanel open={open} onClose={() => setOpen(false)} />

      <div className="h-px w-full bg-white/10" />

      <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-white font-semibold tracking-wide">GUIGOLO</p>
          <p className="mt-2 text-white/60 max-w-xl">
            Diseño con intención. Sistema con claridad. Experiencias que se sienten.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start md:justify-end gap-3">
          <AchievementsCounter />

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="whitespace-nowrap rounded-full border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-2 text-[11px] tracking-[0.22em] text-neutral-white/70 hover:border-neutral-white/25 transition"
          >
            MISIONES: {missionsDone}/{totalMissions} · VER
          </button>

          <a href="#projects" className="text-sm text-white/60 hover:text-white transition">
            Proyectos
          </a>
          <a href="#contacto" className="text-sm text-white/60 hover:text-white transition">
            Contacto
          </a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition">
            Arriba
          </a>
        </div>
      </div>

      <p className="mt-10 text-xs text-white/40">
        © {new Date().getFullYear()} GUIGOLO · MODULE · FOOTER SIGNAL
      </p>
    </Section>
  );
}
