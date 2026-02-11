"use client";

import { emitMissionUnlocked } from "./missionsEvents";

export type MissionId =
  | "mission_route"
  | "mission_attention"
  | "mission_contact"
  | "mission_easter";

type CompletedEntry = { at: number };

export type MissionsStateV1 = {
  version: 1;
  completed: Partial<Record<MissionId, CompletedEntry>>;
};

const STORAGE_KEY = "guigolo_missions_v1";
const VERSION: MissionsStateV1["version"] = 1;

function safeParse(json: string | null) {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function defaultState(): MissionsStateV1 {
  return { version: VERSION, completed: {} };
}

export function getMissionsState(): MissionsStateV1 {
  if (typeof window === "undefined") return defaultState();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = safeParse(raw);

  if (!parsed || typeof parsed !== "object" || parsed.version !== VERSION) {
    const st = defaultState();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
    return st;
  }

  return parsed as MissionsStateV1;
}

function save(st: MissionsStateV1) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(st));
}

export function hasMission(id: MissionId) {
  const st = getMissionsState();
  return Boolean(st.completed?.[id]);
}

export function completeMission(id: MissionId) {
  const st = getMissionsState();
  const now = Date.now();

  if (st.completed?.[id]) return { completedNow: false, state: st };

  st.completed = st.completed || {};
  st.completed[id] = { at: now };

  save(st);

  emitMissionUnlocked({ id, at: now });

  return { completedNow: true, state: st };
}

export function getCompletedMissionsCount() {
  const st = getMissionsState();
  return Object.keys(st.completed || {}).length;
}

export function resetMissions() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
