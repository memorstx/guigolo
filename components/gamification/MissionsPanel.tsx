"use client";

import { useEffect, useState } from "react";
import { MISSIONS } from "./missionsCatalog";
import {
  getCompletedMissionsCount,
  hasMission,
  type MissionId,
} from "./missionsStore";
import { onMissionUnlocked } from "./missionsEvents";
import { usePathname } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Locale = "es" | "en";

type LocalizedText =
  | string
  | {
      es?: string;
      en?: string;
    };

type Mission = {
  id: MissionId;
  title: LocalizedText;
  description?: LocalizedText;
};

function getLocaleFromPath(pathname: string | null): Locale {
  const seg = (pathname || "/").split("/")[1];
  return seg === "en" ? "en" : "es";
}

function pickLocalized(value: LocalizedText | undefined, locale: Locale): string {
  if (!value) return "";
  if (typeof value === "string") return value;

  return value[locale] ?? value.es ?? value.en ?? "";
}

const UI_COPY: Record<
  Locale,
  {
    titleKicker: string;
    progress: string;
    subtitle: string;
    close: string;
    reward: string;
    rewardLocked: string;
    rewardUnlockMissionName: string;
    rewardTitle: string;
    rewardHint: string;
    ownerChecklistTitle: string;
    tip: string;
    doneEmoji: string;
    pendingEmoji: string;
  }
> = {
  es: {
    titleKicker: "Misiones",
    progress: "Progreso",
    subtitle: "Nivel 3 · macro-logros (con intención)",
    close: "Cerrar",
    reward: "Recompensa",
    rewardLocked: "Se desbloquea al completar",
    rewardUnlockMissionName: "Intención de contacto",
    rewardTitle: "Diagnóstico Express",
    rewardHint: "Si decides escribirme, menciona este código:",
    ownerChecklistTitle: "Checklist privada",
    tip: "Consejo: esto vive en tu Footer para no estorbar.",
    doneEmoji: "✅",
    pendingEmoji: "⏳",
  },
  en: {
    titleKicker: "Missions",
    progress: "Progress",
    subtitle: "Level 3 · macro-achievements (with intent)",
    close: "Close",
    reward: "Reward",
    rewardLocked: "Unlocks after completing",
    rewardUnlockMissionName: "Contact intent",
    rewardTitle: "Express Diagnostic",
    rewardHint: "If you decide to message me, mention this code:",
    ownerChecklistTitle: "Private checklist",
    tip: "Tip: keep this in your Footer so it doesn’t get in the way.",
    doneEmoji: "✅",
    pendingEmoji: "⏳",
  },
};

export default function MissionsPanel({ open, onClose }: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  const total = MISSIONS.length;
  const [done, setDone] = useState<number>(() => {
    if (typeof window === "undefined") return 0;

    return getCompletedMissionsCount();
  });

  useEffect(() => {
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
  const isOwner =
    typeof window !== "undefined" &&
    localStorage.getItem("guigolo_owner") === "1";

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
              {UI_COPY[locale].titleKicker}
            </div>
            <div className="mt-2 text-neutral-white font-semibold">
              {UI_COPY[locale].progress}: {done}/{total}
            </div>
            <div className="mt-1 text-sm text-neutral-white/60">
              {UI_COPY[locale].subtitle}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-neutral-white/15 px-3 py-2 text-neutral-white/80 hover:border-neutral-white/35 transition"
          >
            {UI_COPY[locale].close}
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {(MISSIONS as Mission[]).map((mission) => {
            const ok = hasMission(mission.id);

            const title = pickLocalized(mission.title, locale) || mission.id;
            const description = pickLocalized(mission.description, locale);

            return (
              <div
                key={mission.id}
                className={[
                  "rounded-xl border px-4 py-3",
                  ok
                    ? "border-accent-lime/30 bg-accent-cyan-10/20"
                    : "border-neutral-white/10 bg-neutral-black-800/30",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="text-neutral-white font-medium">{title}</div>
                  <div className="text-sm">
                    {ok
                      ? UI_COPY[locale].doneEmoji
                      : UI_COPY[locale].pendingEmoji}
                  </div>
                </div>

                {description ? (
                  <div className="mt-1 text-sm text-neutral-white/65">
                    {description}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-white/10 bg-neutral-black-800/35 p-4">
          <div className="text-[10px] tracking-[0.35em] text-neutral-white/45 uppercase">
            {UI_COPY[locale].reward}
          </div>

          {!contactUnlocked ? (
            <div className="mt-2 text-sm text-neutral-white/70">
              {UI_COPY[locale].rewardLocked}{" "}
              <span className="text-neutral-white/90">
                {UI_COPY[locale].rewardUnlockMissionName}
              </span>
              .
            </div>
          ) : (
            <>
              <div className="mt-2 text-neutral-white font-semibold">
                {UI_COPY[locale].rewardTitle}
              </div>
              <div className="mt-1 text-sm text-neutral-white/70">
                {UI_COPY[locale].rewardHint}
              </div>
              <div className="mt-3 rounded-lg border border-neutral-white/10 bg-neutral-black-900/60 px-3 py-2 text-neutral-white/90 tracking-[0.22em]">
                MATCH-03
              </div>

              {isOwner ? (
                <>
                  <div className="mt-5 text-neutral-white font-semibold">
                    {UI_COPY[locale].ownerChecklistTitle}
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-neutral-white/70 list-disc pl-5">
                    <li>
                      {locale === "en"
                        ? "What action should people complete in 5 seconds?"
                        : "¿Qué acción quieres que la gente complete en 5 segundos?"}
                    </li>
                    <li>
                      {locale === "en"
                        ? "What’s the main doubt users have when they land?"
                        : "¿Qué duda principal tiene el usuario al llegar?"}
                    </li>
                    <li>
                      {locale === "en"
                        ? "What trust proof do they see before the CTA?"
                        : "¿Qué prueba de confianza ve antes del CTA?"}
                    </li>
                    <li>
                      {locale === "en"
                        ? "What friction exists (confusing text, too much scroll, broken links)?"
                        : "¿Qué fricción existe (texto confuso, demasiado scroll, links rotos)?"}
                    </li>
                    <li>
                      {locale === "en"
                        ? 'What metric defines “it worked” (contacts, leads, time, clicks)?'
                        : '¿Qué métrica define “sí funcionó” (contactos, leads, tiempo, clicks)?'}
                    </li>
                  </ul>
                </>
              ) : null}
            </>
          )}
        </div>

        <div className="mt-4 text-[10px] tracking-[0.28em] text-neutral-white/35 uppercase">
          {UI_COPY[locale].tip}
        </div>
      </aside>
    </>
  );
}