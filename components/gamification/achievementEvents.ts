"use client";

import type { AchievementId } from "./achievementsStore";

export type AchievementUnlockedPayload = {
  id: AchievementId;
  at: number;
};

const EVENT_NAME = "guigolo:achievement_unlocked";

export function emitAchievementUnlocked(payload: AchievementUnlockedPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: payload }));
}

export function onAchievementUnlocked(
  cb: (payload: AchievementUnlockedPayload) => void
) {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const ce = e as CustomEvent<AchievementUnlockedPayload>;
    cb(ce.detail);
  };

  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
