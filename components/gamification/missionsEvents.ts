"use client";

export type MissionUnlockedPayload = {
  id: string;
  at: number;
};

const EVT = "guigolo_mission_unlocked_v1";

export function emitMissionUnlocked(payload: MissionUnlockedPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVT, { detail: payload }));
}

export function onMissionUnlocked(
  cb: (payload: MissionUnlockedPayload) => void
) {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const ce = e as CustomEvent<MissionUnlockedPayload>;
    if (!ce.detail) return;
    cb(ce.detail);
  };

  window.addEventListener(EVT, handler as EventListener);
  return () => window.removeEventListener(EVT, handler as EventListener);
}
