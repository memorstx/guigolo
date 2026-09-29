"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "guigolo_traffic_session";

type ActionDetail = {
  type?: string;
  label?: string;
  href?: string;
};

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

function sendAction(type: string, label: string, href: string | null) {
  const payload = {
    sessionId: sessionId(),
    path: window.location.pathname,
    actionType: type,
    actionLabel: label,
    href,
  };

  void fetch("/api/action-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
    cache: "no-store",
  }).catch(() => undefined);
}

function classify(anchor: HTMLAnchorElement) {
  const rawHref = anchor.getAttribute("href");
  if (!rawHref) return null;

  if (rawHref.startsWith("mailto:")) {
    return { type: "email_click", label: rawHref.replace(/^mailto:/, ""), href: rawHref };
  }

  if (rawHref.startsWith("tel:")) {
    return { type: "phone_click", label: rawHref.replace(/^tel:/, ""), href: rawHref };
  }

  if (/wa\.me|whatsapp\.com/i.test(rawHref)) {
    return { type: "whatsapp_click", label: "WhatsApp", href: rawHref };
  }

  let url: URL;

  try {
    url = new URL(rawHref, window.location.href);
  } catch {
    return null;
  }

  const pathname = url.pathname;
  const host = url.hostname.replace(/^www\./, "");

  if (
    pathname.includes("/go/resume") ||
    /\/(resume|cv)(\/|$)/i.test(pathname) ||
    (/\.(pdf)$/i.test(pathname) && /(resume|cv)/i.test(pathname))
  ) {
    return { type: "resume_open", label: pathname, href: url.href };
  }

  if (url.hash === "#contacto" || pathname.endsWith("/contacto")) {
    return { type: "contact_open", label: "Contacto", href: url.href };
  }

  if (url.origin === window.location.origin) {
    if (/^\/(es|en)\/projects\//.test(pathname) || pathname.startsWith("/projects/")) {
      return { type: "project_open", label: pathname, href: url.href };
    }

    const currentLocale = window.location.pathname.startsWith("/en") ? "en" : "es";
    const nextLocale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : pathname === "/es" || pathname.startsWith("/es/") ? "es" : null;

    if (nextLocale && nextLocale !== currentLocale) {
      return { type: "locale_switch", label: nextLocale.toUpperCase(), href: url.href };
    }

    return null;
  }

  if (["bongodex.com", "mironline.io", "academiaglobal.mx"].includes(host)) {
    return { type: "project_external", label: host, href: url.href };
  }

  return { type: "external_click", label: host, href: url.href };
}

export default function ActionTracker({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled || !pathname || pathname.startsWith("/admin")) return;
    if (document.querySelector("[data-guigolo-not-found]")) return;

    const handleClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target : null;
      if (!element) return;

      const explicit = element.closest<HTMLElement>("[data-guigolo-action]");
      if (explicit) {
        const type = explicit.dataset.guigoloAction;
        if (!type) return;

        const label =
          explicit.dataset.guigoloLabel ||
          explicit.textContent?.trim().slice(0, 160) ||
          type;
        const href =
          explicit instanceof HTMLAnchorElement ? explicit.href : null;

        sendAction(type, label, href);
        return;
      }

      const anchor = element.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const action = classify(anchor);
      if (!action) return;

      sendAction(action.type, action.label, action.href);
    };

    const handleCustom = (event: Event) => {
      const detail = (event as CustomEvent<ActionDetail>).detail;
      if (!detail?.type) return;

      sendAction(
        detail.type,
        detail.label?.slice(0, 160) || detail.type,
        detail.href || null
      );
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("guigolo:action", handleCustom as EventListener);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("guigolo:action", handleCustom as EventListener);
    };
  }, [enabled, pathname]);

  return null;
}
