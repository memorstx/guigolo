// /components/gamification/achievementEvents.ts
"use client";

import type { AchievementId } from "./achievementsStore";

export type AchievementUnlockedEvent = {
  id: AchievementId;
  at: number;
};

const EVENT_NAME = "guigolo:achievement_unlocked_v1";

export function emitAchievementUnlocked(e: AchievementUnlockedEvent) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: e }));
}

export function onAchievementUnlocked(
  handler: (e: AchievementUnlockedEvent) => void
) {
  const listener = (ev: Event) => {
    const ce = ev as CustomEvent<AchievementUnlockedEvent>;
    if (!ce.detail?.id) return;
    handler(ce.detail);
  };

  window.addEventListener(EVENT_NAME, listener as any);
  return () => window.removeEventListener(EVENT_NAME, listener as any);
}
