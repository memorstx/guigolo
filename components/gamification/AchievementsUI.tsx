"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getUnlockedCount } from "./achievementsStore";
import { onAchievementUnlocked } from "./achievementEvents";
import { ACHIEVEMENTS } from "./achievementsCatalog";

type ToastState = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
};

export default function AchievementsUI() {
  const total = ACHIEVEMENTS.length;
  const [unlockedCount, setUnlockedCount] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const hideTimerRef = useRef<number | null>(null);

  const byId = useMemo(() => {
    const m = new Map<string, { title: string; description?: string; icon?: string }>();
    ACHIEVEMENTS.forEach((a) =>
      m.set(a.id, { title: a.title, description: a.description, icon: (a as any).icon })
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

      // Si hay un toast activo, reiniciamos el timer para que no se "pisen"
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);

      setToast({
        id,
        title: meta?.title ?? "Logro desbloqueado",
        description: meta?.description,
        icon: meta?.icon,
      });

      // ⏱️ Toast dura ~6.5s
      hideTimerRef.current = window.setTimeout(() => {
        setToast(null);
        hideTimerRef.current = null;
      }, 9500);
    });

    return () => {
      off();
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [byId]);

  return (
    <>
      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[80] max-w-[360px]">
          <div className="rounded-2xl border border-neutral-white/10 bg-neutral-black-900/80 backdrop-blur px-5 py-4 shadow-[0_0_2.5rem_rgba(0,0,0,0.35)]">
            <div className="flex items-start gap-3">
              {toast.icon ? (
                <img
                  src={toast.icon}
                  alt=""
                  className="h-12 w-12 rounded-xl border border-neutral-white/10 object-cover shrink-0"
                  draggable={false}
                />
              ) : null}

              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.35em] text-accent-lime/80 uppercase">
                  logro desbloqueado
                </div>

                <div className="mt-2 text-neutral-white font-semibold">
                  {toast.title}
                </div>

                {toast.description ? (
                  <div className="mt-1 text-sm text-neutral-white/70">
                    {toast.description}
                  </div>
                ) : null}

                <div className="mt-3 text-[10px] tracking-[0.28em] text-neutral-white/35 uppercase">
                  Progreso: {unlockedCount ?? "—"}/{total}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
