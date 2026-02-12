"use client";

import { useEffect, useState } from "react";

const OPTIONS = [
  { id: "confused", label: "Me confundió", emoji: "😵‍💫" },
  { id: "intrigued", label: "Me intrigó", emoji: "👀" },
  { id: "smiled", label: "Me hizo sonreír", emoji: "😄" },
  { id: "clear", label: "Lo entendí rápido", emoji: "⚡️" },
] as const;

type OptionId = (typeof OPTIONS)[number]["id"];

const STORAGE_KEY = "guigolo_micro_feedback_v1";

export default function FeedbackButtons() {
  const [selected, setSelected] = useState<OptionId | null>(null);

  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved && OPTIONS.some((o) => o.id === saved)) {
      setSelected(saved as OptionId);
    }
  }, []);

  const fireGA = (value: OptionId) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "guigolo_micro_feedback", {
        feeling: value,
        page: "what-is-guigolo",
      });
    }
  };

  const handleClick = (value: OptionId) => {
    // Si ya eligió, NO registramos otra vez
    if (selected) return;

    setSelected(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
    fireGA(value);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          const isLocked = selected !== null && !isSelected;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleClick(opt.id)}
              disabled={isLocked || isSelected} // bloquea los demás y también evita re-click del mismo
              aria-pressed={isSelected}
              className={[
                "group inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition select-none",
                isSelected
                  ? "border-neutral-white/60 bg-neutral-white/10 text-neutral-white shadow-[0_0_0_2px_rgba(255,255,255,0.06)]"
                  : "border-neutral-white/20 text-neutral-white/80 hover:border-neutral-white/40 hover:text-neutral-white",
                isLocked ? "opacity-40 cursor-not-allowed" : "",
              ].join(" ")}
            >
              <span className="text-base">{opt.emoji}</span>
              <span>{opt.label}.</span>
              {isSelected ? (
                <span className="ml-1 text-neutral-white/70">(listo)</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {selected ? (
        <p className="text-neutral-white/60 text-sm">
          Gracias por tu reacción ✨
        </p>
      ) : (
        <p className="text-neutral-white/50 text-sm">
          
        </p>
      )}
    </div>
  );
}
