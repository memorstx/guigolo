"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "guigolo_traffic_session";
const ENTRY_KEY = "guigolo_traffic_entry";

function sessionId() {
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const next =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  sessionStorage.setItem(SESSION_KEY, next);
  return next;
}

export default function TrafficTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled || !pathname || pathname.startsWith("/admin")) return;
    if (document.querySelector('[data-guigolo-not-found="true"]')) return;

    const isEntry = sessionStorage.getItem(ENTRY_KEY) !== "1";

    const payload = {
      sessionId: sessionId(),
      path: window.location.pathname,
      query: window.location.search.slice(1) || null,
      referrer: document.referrer || null,
      isEntry,
    };

    void fetch("/api/traffic-events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
      cache: "no-store",
    })
      .then(() => {
        if (isEntry) sessionStorage.setItem(ENTRY_KEY, "1");
      })
      .catch(() => undefined);
  }, [enabled, pathname]);

  return null;
}
