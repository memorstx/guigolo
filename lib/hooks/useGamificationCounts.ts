"use client";

import { useSyncExternalStore } from "react";
import { onAchievementUnlocked } from "@/components/gamification/achievementEvents";
import { onMissionUnlocked } from "@/components/gamification/missionsEvents";

// Las lecturas no deben crear datos ni modificar localStorage durante render.
function countStoredEntries(storageKey: string, field: "unlocked" | "completed") {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return 0;

    const state: unknown = JSON.parse(raw);
    if (!state || typeof state !== "object" || !("version" in state) || state.version !== 1) return 0;

    const entries = (state as Record<string, unknown>)[field];
    if (!entries || typeof entries !== "object" || Array.isArray(entries)) return 0;
    return Object.keys(entries).length;
  } catch {
    return 0;
  }
}

const readAchievementCount = () => countStoredEntries("guigolo_achievements_v1", "unlocked");
const readMissionCount = () => countStoredEntries("guigolo_missions_v1", "completed");

const subscribeAchievements = (notify: () => void) => onAchievementUnlocked(notify);
const subscribeMissions = (notify: () => void) => onMissionUnlocked(notify);

export function useAchievementCount(): number | null {
  return useSyncExternalStore<number | null>(
    subscribeAchievements,
    readAchievementCount,
    () => null
  );
}

export function useMissionCount(): number {
  return useSyncExternalStore(subscribeMissions, readMissionCount, () => 0);
}
