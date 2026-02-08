export type ContactOrigin = {
  fromPath: string;      // pathname + search
  fromHash: string;      // hash actual (si existe)
  fromScrollY: number;   // scroll exacto
  ctaId: string;         // identificador del botón
  ts: number;            // timestamp
};

const KEY = "contact_origin_v1";

export function saveContactOrigin(ctaId: string) {
  if (typeof window === "undefined") return;

  const origin: ContactOrigin = {
    fromPath: window.location.pathname + window.location.search,
    fromHash: window.location.hash || "",
    fromScrollY: Math.max(0, Math.floor(window.scrollY)),
    ctaId,
    ts: Date.now(),
  };

  sessionStorage.setItem(KEY, JSON.stringify(origin));
}

export function readContactOrigin(): ContactOrigin | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ContactOrigin;
  } catch {
    return null;
  }
}

export function clearContactOrigin() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}
