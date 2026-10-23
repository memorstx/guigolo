"use client";

import { useAchievementCount } from "@/lib/hooks/useGamificationCounts";
import { ACHIEVEMENTS } from "./achievementsCatalog";

export default function AchievementsCounter() {
  const total = ACHIEVEMENTS.length;
  const count = useAchievementCount();

  return (
    <div className="whitespace-nowrap rounded-full border border-neutral-white/10 bg-neutral-black-900/40 px-4 py-2 text-[11px] tracking-[0.22em] text-neutral-white/60">
      LOGROS: {count ?? "—"}/{total}
    </div>
  );
}
