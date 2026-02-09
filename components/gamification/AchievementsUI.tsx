"use client";

import { useEffect, useMemo, useState } from "react";
import { getUnlockedCount } from "./achievementsStore";
import { onAchievementUnlocked } from "./achievementEvents";
import { ACHIEVEMENTS } from "./achievementsCatalog";

type ToastState = {
  id: string;
  title: string;
  description?: string;
};

export default function AchievementsUI() {
  const total = ACHIEVEMENTS.length;
  const [unlockedCount, setUnlockedCount] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const byId = useMemo(() => {
    const m = new Map<string, { title: string; description?: string }>();
    ACHIEVEMENTS.forEach(a =>
      m.set(a.id, { title: a.title, description: a.description })
    );
    return m;
  }, []);

  useEffect(() => {
    // Inicial
    setUnlockedCount(getUnlockedCount());

    // Escuchar logros
    const off = onAchievementUnlocked(({ id }) => {
      setUnlockedCount(getUnlockedCount());

      const meta = byId.get(id);
      setToast({
        id,
        title: meta?.title ?? "Logro desbloqueado",
        description: meta?.description,
      });

      // ⏱️ Toast dura ~6.5s
      setTimeout(() => setToast(null), 6500);
    });

    return () => off();
  }, [byId]);

  return (
    <>
      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[80] max-w-[360px]">
          <div className="rounded-2xl border border-neutral-white/10 bg-neutral-black-900/80 backdrop-blur px-5 py-4 shadow-[0_0_2.5rem_rgba(0,0,0,0.35)]">
            <div className="text-[10px] tracking-[0.35em] text-accent-lime/80 uppercase">
              logro desbloqueado
            </div>

            <div className="mt-2 text-neutral-white font-semibold">
              {toast.title}
            </div>

            {toast.description && (
              <div className="mt-1 text-sm text-neutral-white/70">
                {toast.description}
              </div>
            )}

            <div className="mt-3 text-[10px] tracking-[0.28em] text-neutral-white/35 uppercase">
              Progreso: {unlockedCount ?? "—"}/{total}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
