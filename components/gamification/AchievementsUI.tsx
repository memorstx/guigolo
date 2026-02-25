"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getUnlockedCount } from "./achievementsStore";
import { onAchievementUnlocked } from "./achievementEvents";
import { ACHIEVEMENTS } from "./achievementsCatalog";

type Locale = "es" | "en";

type ToastState = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
};

function getLocaleFromPath(): Locale {
  if (typeof window === "undefined") return "es";
  const seg = window.location.pathname.split("/")[1];
  return seg === "en" ? "en" : "es";
}

const UI = {
  es: {
    unlockedKicker: "logro desbloqueado",
    fallbackTitle: "Logro desbloqueado",
    progress: "Progreso",
  },
  en: {
    unlockedKicker: "achievement unlocked",
    fallbackTitle: "Achievement unlocked",
    progress: "Progress",
  },
} as const;

export default function AchievementsUI() {
  const total = ACHIEVEMENTS.length;

  const [unlockedCount, setUnlockedCount] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const hideTimerRef = useRef<number | null>(null);

  const locale = useMemo(() => getLocaleFromPath(), []);
  const t = UI[locale];

  const byId = useMemo(() => {
    const m = new Map<string, { title: string; description?: string; icon?: string }>();
    ACHIEVEMENTS.forEach((a) => {
      m.set(a.id, {
        title: a.title[locale],
        description: a.description?.[locale],
        icon: a.icon,
      });
    });
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  useEffect(() => {
    // Inicial
    setUnlockedCount(getUnlockedCount());

    // Escuchar logros
    const off = onAchievementUnlocked(({ id }) => {
      setUnlockedCount(getUnlockedCount());

      const meta = byId.get(id);

      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);

      setToast({
        id,
        title: meta?.title ?? t.fallbackTitle,
        description: meta?.description,
        icon: meta?.icon,
      });

      hideTimerRef.current = window.setTimeout(() => {
        setToast(null);
        hideTimerRef.current = null;
      }, 9500);
    });

    return () => {
      off();
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [byId, t.fallbackTitle]);

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 right-6 z-[80] max-w-[360px]">
          <div className="rounded-2xl border border-neutral-white/10 bg-neutral-black-900/80 backdrop-blur px-5 py-4 shadow-[0_0_2.5rem_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-3">
              {/* ✅ Ilustración / Icon como tú lo tenías */}
              {toast.icon ? (
                <img
                  src={toast.icon}
                  alt=""
                  className="h-[7.5rem] w-[7.5rem] rounded-xl border border-neutral-white/10 object-cover shrink-0"
                  draggable={false}
                />
              ) : null}

              <div className="min-w-0">
                <div className="text-[9px] tracking-[0.35em] text-accent-lime/80 uppercase">
                  {t.unlockedKicker}
                </div>

                <div className="mt-2 text-neutral-white font-semibold">
                  {toast.title}
                </div>

                {toast.description ? (
                  <div className="mt-1 text-sm text-neutral-white/70 font-light">
                    {toast.description}
                  </div>
                ) : null}

                <div className="mt-3 text-[10px] tracking-[0.28em] text-neutral-white/35 uppercase">
                  {t.progress}: {unlockedCount ?? "—"}/{total}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
