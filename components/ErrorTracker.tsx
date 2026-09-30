"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type ErrorPayload = {
  type: string;
  message: string;
  stack?: string | null;
  source?: string | null;
  line?: number | null;
  column?: number | null;
};

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  return value.slice(0, max);
}

function describeReason(reason: unknown) {
  if (reason instanceof Error) {
    return {
      message: reason.message || reason.name || "Unhandled rejection",
      stack: reason.stack || null,
    };
  }

  if (typeof reason === "string") {
    return { message: reason, stack: null };
  }

  try {
    return {
      message: JSON.stringify(reason).slice(0, 1200),
      stack: null,
    };
  } catch {
    return { message: "Unhandled rejection", stack: null };
  }
}

export function reportClientError(payload: ErrorPayload) {
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/admin")) return;

  void fetch("/api/error-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      path: window.location.pathname,
      errorType: clean(payload.type, 80),
      message: clean(payload.message, 1200),
      stack: clean(payload.stack, 8000),
      source: clean(payload.source, 2000),
      line: payload.line ?? null,
      column: payload.column ?? null,
    }),
    keepalive: true,
    cache: "no-store",
  }).catch(() => undefined);
}

export default function ErrorTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled || !pathname || pathname.startsWith("/admin")) return;

    const onError = (event: ErrorEvent) => {
      reportClientError({
        type: "runtime",
        message: event.message || event.error?.message || "JavaScript error",
        stack: event.error instanceof Error ? event.error.stack : null,
        source: event.filename || null,
        line: event.lineno || null,
        column: event.colno || null,
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = describeReason(event.reason);

      reportClientError({
        type: "unhandled_rejection",
        message: reason.message,
        stack: reason.stack,
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, [enabled, pathname]);

  return null;
}
