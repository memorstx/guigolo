

"use client";

export type AchievementId =
| "first_step"
| "explorer"
| "curious"
| "observer"
| "map_complete"
| "services_decoded"
| "projects_gallery"
| "read_between_lines"
| "critical_thinker"
| "good_eye"
| "curious_player"
| "visual_match"
| "almost_talked"
| "took_courage"
| "first_contact";

type UnlockedEntry = {
    at: number;   // timestamp primera vez
    count: number; // para acumulables
};

export type AchievementsStateV1 = {
    version: 1;
    unlocked: Partial<Record<AchievementId, UnlockedEntry>>;
    stats: {
        visits: number;
        firstVisitAt: number;
        lastVisitAt: number;
        lastSeenDate: string; // YYYY-MM-DD (por si volvió después de varios días)
    };
};

import { emitAchievementUnlocked } from "./achievementEvents";
const STORAGE_KEY = "guigolo_achievements_v1";
const VERSION: AchievementsStateV1["version"] = 1;

function todayKey(d = new Date()) {
  // YYYY-MM-DD
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function safeParse(json: string | null) {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function defaultState(): AchievementsStateV1 {
  const now = Date.now();
  return {
    version: VERSION,
    unlocked: {},
    stats: {
      visits: 0,
      firstVisitAt: now,
      lastVisitAt: now,
      lastSeenDate: todayKey(),
    },
  };
}

export function getAchievementsState(): AchievementsStateV1 {
  if (typeof window === "undefined") return defaultState();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = safeParse(raw);

  // Si no existe o está roto -> estado default
  if (!parsed || typeof parsed !== "object") {
    const st = defaultState();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
    return st;
  }

  // Migración simple por versión
  if (parsed.version !== VERSION) {
    const st = defaultState();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
    return st;
  }

  return parsed as AchievementsStateV1;
}

function save(state: AchievementsStateV1) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function trackVisit(): { isNewDay: boolean; state: AchievementsStateV1 } {
  const st = getAchievementsState();
  const now = Date.now();
  const today = todayKey();

  const isNewDay = st.stats.lastSeenDate !== today;

  st.stats.visits = (st.stats.visits ?? 0) + 1;
  st.stats.lastVisitAt = now;
  st.stats.lastSeenDate = today;

  // si es la primera vez, ajusta firstVisitAt
  if (!st.stats.firstVisitAt) st.stats.firstVisitAt = now;

  save(st);

    return { isNewDay, state: st };

}

export function hasAchievement(id: AchievementId): boolean {
  const st = getAchievementsState();
  return Boolean(st.unlocked?.[id]);
}

export function unlockAchievement(
  id: AchievementId,
  opts?: { accumulative?: boolean }
): { unlockedNow: boolean; state: AchievementsStateV1; entry: UnlockedEntry } {
  const st = getAchievementsState();
  const now = Date.now();

  const existing = st.unlocked?.[id];

  // Si ya existe:
  if (existing) {
    if (opts?.accumulative) {
      existing.count += 1;
      save(st);
    }
    return { unlockedNow: false, state: st, entry: existing };
  }

  // Si no existe:
  const entry: UnlockedEntry = { at: now, count: 1 };
    st.unlocked = st.unlocked || {};
    st.unlocked[id] = entry;

    save(st);

    // avisar a la UI (toast)
    emitAchievementUnlocked({ id, at: entry.at });

    return { unlockedNow: true, state: st, entry };

}

export function incrementAchievement(
  id: AchievementId
): { unlockedNow: boolean; state: AchievementsStateV1; entry: UnlockedEntry } {
  // atajo para acumulables
  return unlockAchievement(id, { accumulative: true });
}

export function getUnlockedCount(): number {
  const st = getAchievementsState();
  return Object.keys(st.unlocked || {}).length;
}

export function resetAchievements() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
