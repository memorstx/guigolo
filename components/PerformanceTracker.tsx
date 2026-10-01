"use client";

import { useReportWebVitals } from "next/web-vitals";

const CORE_METRICS = new Set(["LCP", "INP", "CLS", "FCP", "TTFB"]);

export default function PerformanceTracker({ enabled }: { enabled: boolean }) {
  useReportWebVitals((metric) => {
    if (!enabled || !CORE_METRICS.has(metric.name)) return;
    if (window.location.pathname.startsWith("/admin")) return;
    if (document.querySelector('[data-guigolo-not-found="true"]')) return;

    const payload = {
      path: window.location.pathname,
      metricId: metric.id,
      metricName: metric.name,
      value: metric.value,
      rating: metric.rating,
      navigationType: metric.navigationType,
    };

    void fetch("/api/performance-events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
      cache: "no-store",
    }).catch(() => undefined);
  });

  return null;
}
