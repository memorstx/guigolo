"use client";

import { useEffect, useState } from "react";
import { getUnlockedCount } from "./achievementsStore";
import { ACHIEVEMENTS } from "./achievementsCatalog";
import { onAchievementUnlocked } from "./achievementEvents";

export default function AchievementsCounter() {
  const total = ACHIEVEMENTS.length;
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // El primer render debe ser idéntico en servidor y cliente.
    // localStorage sólo se consulta después de hidratar en el navegador.
    setCount(getUnlockedCount());

    const off = onAchievementUnlocked(() => {
      setCount(getUnlockedCount());
    });

    return () => off();
  }, []);

  return (
    <div className="whitespace-nowrap rounded-full border border-neutral-white/10 bg-neutral-black-900/40 px-4 py-2 text-[11px] tracking-[0.22em] text-neutral-white/60">
      LOGROS: {count ?? "—"}/{total}
    </div>
  );
}
