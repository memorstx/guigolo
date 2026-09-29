"use client";

import { useEffect, useRef } from "react";

export default function NotFoundTracker() {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;

    const payload = {
      path: window.location.pathname,
      query: window.location.search.slice(1) || null,
      referrer: document.referrer || null,
    };

    void fetch("/api/not-found-events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
      cache: "no-store",
    }).catch(() => undefined);
  }, []);

  return null;
}
