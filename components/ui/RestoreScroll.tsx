"use client";

import { useEffect } from "react";
import { readContactOrigin } from "./contactOrigin";

export default function RestoreScroll() {
  useEffect(() => {
    const o = readContactOrigin();
    if (!o) return;

    // Solo restauramos si NO hay hash (si hay hash, el browser ya resuelve)
    if (window.location.hash) return;

    // Si vienes de otra página y quieres volver exacto:
    // Usa una marca en sessionStorage para no hacerlo siempre.
    const key = "restore_scroll_once_v1";
    const shouldRestore = sessionStorage.getItem(key);
    if (shouldRestore !== "1") return;

    sessionStorage.removeItem(key);
    window.scrollTo({ top: o.fromScrollY, behavior: "instant" as any });
  }, []);

  return null;
}
