"use client";

import { useEffect, useMemo, useState } from "react";
import { MISSIONS, MISSION_BY_ID } from "./missionsCatalog";
import { getMissionsState, getCompletedMissionsCount, hasMission } from "./missionsStore";
import { onMissionUnlocked } from "./missionsEvents";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MissionsPanel({ open, onClose }: Props) {
  const total = MISSIONS.length;
  const [done, setDone] = useState<number>(0);

  useEffect(() => {
    setDone(getCompletedMissionsCount());

    const off = onMissionUnlocked(() => {
      setDone(getCompletedMissionsCount());
    });

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onEsc);
    return () => {
      off();
      window.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);

  const contactUnlocked = hasMission("mission_contact");

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="
          fixed right-0 top-0 z-[100]
          h-dvh w-[min(420px,92vw)]
          border-l border-neutral-white/10
          bg-neutral-black-900/95
          shadow-[0_0_3rem_rgba(0,0,0,0.6)]
          px-5 py-5
        "
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] tracking-[0.35em] text-accent-lime/80 uppercase">
              Misiones
            </div>
            <div className="mt-2 text-neutral-white font-semibold">
              Progreso: {done}/{total}
            </div>
            <div className="mt-1 text-sm text-neutral-white/60">
              Nivel 3 · macro-logros (con intención)
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-neutral-white/15 px-3 py-2 text-neutral-white/80 hover:border-neutral-white/35 transition"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {MISSIONS.map((m) => {
            const ok = hasMission(m.id);
            return (
              <div
                key={m.id}
                className={[
                  "rounded-xl border px-4 py-3",
                  ok
                    ? "border-accent-lime/30 bg-accent-cyan-10/20"
                    : "border-neutral-white/10 bg-neutral-black-800/30",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-neutral-white font-medium">
                    {m.title}
                  </div>
                  <div className="text-sm">
                    {ok ? "✅" : "⏳"}
                  </div>
                </div>

                <div className="mt-1 text-sm text-neutral-white/65">
                  {m.description}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-white/10 bg-neutral-black-800/35 p-4">
          <div className="text-[10px] tracking-[0.35em] text-neutral-white/45 uppercase">
            Recompensa
          </div>

          {!contactUnlocked ? (
            <div className="mt-2 text-sm text-neutral-white/70">
              Se desbloquea al completar <span className="text-neutral-white/90">Intención de contacto</span>.
            </div>
          ) : (
            <>
              <div className="mt-2 text-neutral-white font-semibold">
                Diagnóstico Express
              </div>
              <div className="mt-1 text-sm text-neutral-white/70">
                Si decides escribirme, menciona este código:
              </div>
              <div className="mt-3 rounded-lg border border-neutral-white/10 bg-neutral-black-900/60 px-3 py-2 text-neutral-white/90 tracking-[0.22em]">
                MATCH-03
              </div>

              <div className="mt-5 text-neutral-white font-semibold">
                Checklist privada
              </div>
              <ul className="mt-2 space-y-2 text-sm text-neutral-white/70 list-disc pl-5">
                <li>¿Qué acción quieres que la gente complete en 5 segundos?</li>
                <li>¿Qué duda principal tiene el usuario al llegar?</li>
                <li>¿Qué prueba de confianza ve antes del CTA?</li>
                <li>¿Qué fricción existe (texto confuso, demasiado scroll, links rotos)?</li>
                <li>¿Qué métrica define “sí funcionó” (contactos, leads, tiempo, clicks)?</li>
              </ul>
            </>
          )}
        </div>

        <div className="mt-4 text-[10px] tracking-[0.28em] text-neutral-white/35 uppercase">
          Consejo: esto vive en tu Footer para no estorbar.
        </div>
      </aside>
    </>
  );
}
