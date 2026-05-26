"use client";

import { useEffect, useState } from "react";

export type OptionId = "confused" | "intrigued" | "smiled" | "clear";

export type Option = {
  id: OptionId;
  label: string;
  emoji: string;
};

type Props = {
  pageId: string;
  options: Option[];
  thanksText?: string;
};

type WindowWithGtag = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    params: {
      feeling: Option["id"];
      page: string;
    }
  ) => void;
};

const STORAGE_KEY = "guigolo_micro_feedback_v1";

export default function FeedbackButtons({
  pageId,
  options,
  thanksText = "Gracias por tu reacción ✨",
}: Props) {
  const [selected, setSelected] = useState<Option["id"] | null>(() => {
    if (typeof window === "undefined") return null;

    const saved = window.localStorage.getItem(STORAGE_KEY);
    const isValid = options.some((option) => option.id === saved);

    return isValid ? (saved as Option["id"]) : null;
  });

  useEffect(() => {
    if (!selected) return;

    window.localStorage.setItem(STORAGE_KEY, selected);
  }, [selected]);

  const fireGA = (value: Option["id"]) => {
    const gtag = (window as WindowWithGtag).gtag;

    if (!gtag) return;

    gtag("event", "guigolo_micro_feedback", {
      feeling: value,
      page: pageId,
    });
  };

  const handleClick = (value: Option["id"]) => {
    if (selected) return;

    setSelected(value);
    fireGA(value);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          const isLocked = selected !== null && !isSelected;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleClick(opt.id)}
              disabled={isLocked || isSelected}
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
              <span>{opt.label}</span>
              {isSelected ? (
                <span className="ml-1 text-neutral-white/70">(listo)</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {selected ? (
        <p className="text-neutral-white/60 text-sm">{thanksText}</p>
      ) : (
        <p className="text-neutral-white/50 text-sm" />
      )}
    </div>
  );
}