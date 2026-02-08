"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getAchievementsState, getUnlockedCount } from "./achievementsStore";
import { ACH_BY_ID, ACHIEVEMENTS } from "./achievementsCatalog";
import { onAchievementUnlocked } from "./achievementEvents";

type ToastState = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

export default function AchievementsUI() {
  const total = ACHIEVEMENTS.length;

  const [unlockedCount, setUnlockedCount] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Mantener contador actualizado
  useEffect(() => {
    // al montar, sincroniza
    setUnlockedCount(getUnlockedCount());

    // escuchar eventos de desbloqueo
    const off = onAchievementUnlocked(({ id }) => {
      setUnlockedCount(getUnlockedCount());

      const meta = ACH_BY_ID[id];
      if (!meta) return;

      setToast({
        id,
        title: meta.title,
        description: meta.description,
        image: meta.image,
      });

      // auto-hide
      window.setTimeout(() => setToast(null), 4200);
    });

    return () => off();
  }, []);

  // Si el storage se resetea manualmente en DevTools y recargas:
  useEffect(() => {
    // solo para mantener consistencia
    const st = getAchievementsState();
    setUnlockedCount(Object.keys(st.unlocked || {}).length);
  }, []);

  return (
    <>
      {/* HUD mini (arriba derecha, discreto) */}
      <div className="fixed top-4 right-4 z-[60] hidden sm:block">
        <div className="rounded-full border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-2 text-[11px] tracking-[0.22em] text-neutral-white/70 backdrop-blur">
          LOGROS: {unlockedCount ?? "—"}/{total}
        </div>
      </div>

      {/* HUD móvil (abajo centro) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] sm:hidden">
        <div className="rounded-full border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-2 text-[11px] tracking-[0.22em] text-neutral-white/70 backdrop-blur">
          LOGROS: {unlockedCount ?? "—"}/{total}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[70] max-w-[340px] w-[calc(100vw-3rem)] sm:w-[340px]">
          <div className="rounded-2xl border border-neutral-white/10 bg-neutral-black-900/80 backdrop-blur p-4 shadow-[0_0_2rem_rgba(0,0,0,0.35)]">
            <div className="flex gap-3 items-start">
              {/* Imagen opcional */}
              {toast.image ? (
                <div className="shrink-0 relative w-14 h-14 rounded-xl bg-neutral-black-800/60 border border-neutral-white/10 overflow-hidden">
                  <Image
                    src={toast.image}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="56px"
                    onError={() => {
                      // si no existe, solo la quitamos silenciosamente
                      setToast((t) => (t ? { ...t, image: undefined } : t));
                    }}
                  />
                </div>
              ) : (
                <div className="shrink-0 w-14 h-14 rounded-xl bg-accent-cyan-10/40 border border-neutral-white/10 flex items-center justify-center text-neutral-white/70">
                  ✦
                </div>
              )}

              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.28em] text-accent-lime/80">
                  LOGRO DESBLOQUEADO
                </div>
                <div className="mt-1 text-neutral-white font-semibold">
                  {toast.title}
                </div>
                <div className="mt-1 text-[13px] leading-relaxed text-neutral-white/70">
                  {toast.description}
                </div>
              </div>
            </div>

            <div className="mt-3 text-[10px] tracking-[0.28em] text-neutral-white/35">
              {(unlockedCount ?? 0)}/{total}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
