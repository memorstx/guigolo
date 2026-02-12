"use client";

import { useEffect, useRef } from "react";
import { completeMission, hasMission } from "./missionsStore";

// helper: espera a que exista el elemento (evita “no lo encontró y ya se rindió”)
function waitForEl(id: string, tries = 25, delayMs = 120): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    let n = 0;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) return resolve(el);
      n += 1;
      if (n >= tries) return resolve(null);
      window.setTimeout(tick, delayMs);
    };
    tick();
  });
}

type Config = {
  projectsId?: string; // default "projects"
  aboutId?: string;    // default "about"
  projectsMs?: number; // default 20000
  aboutMs?: number;    // default 15000
};

export default function useMissionsTrigger(cfg: Config = {}) {
  const projectsId = cfg.projectsId ?? "projects";
  const aboutId = cfg.aboutId ?? "about";
  const projectsMs = cfg.projectsMs ?? 20_000;
  const aboutMs = cfg.aboutMs ?? 15_000;

  // “interacción humana” (anti-autoplay / anti-scroll programático)
  const humanRef = useRef(false);

  useEffect(() => {
    const markHuman = () => (humanRef.current = true);

    window.addEventListener("wheel", markHuman, { passive: true });
    window.addEventListener("touchmove", markHuman, { passive: true });
    window.addEventListener("pointerdown", markHuman, { passive: true });
    window.addEventListener("keydown", markHuman);

    return () => {
      window.removeEventListener("wheel", markHuman);
      window.removeEventListener("touchmove", markHuman);
      window.removeEventListener("pointerdown", markHuman);
      window.removeEventListener("keydown", markHuman);
    };
  }, []);

  // ---- MISSION: Atención real (tiempo real en Projects + About) ----
  const pVisibleRef = useRef(false);
  const aVisibleRef = useRef(false);

  const pMsRef = useRef(0);
  const aMsRef = useRef(0);

  const pDoneRef = useRef(false);
  const aDoneRef = useRef(false);

  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);

  useEffect(() => {
    let ioP: IntersectionObserver | null = null;
    let ioA: IntersectionObserver | null = null;

    const stopLoop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTickRef.current = null;
    };

    const startLoop = () => {
      if (rafRef.current) return;

      const loop = () => {
        // si ya se completó la misión, adiós
        if (hasMission("mission_attention")) {
          stopLoop();
          return;
        }

        // solo cuenta tiempo si hubo interacción humana
        if (!humanRef.current) {
          lastTickRef.current = performance.now();
          rafRef.current = requestAnimationFrame(loop);
          return;
        }

        const now = performance.now();
        const prev = lastTickRef.current ?? now;
        const dt = Math.max(0, now - prev);
        lastTickRef.current = now;

        if (pVisibleRef.current && !pDoneRef.current) pMsRef.current += dt;
        if (aVisibleRef.current && !aDoneRef.current) aMsRef.current += dt;

        if (!pDoneRef.current && pMsRef.current >= projectsMs) pDoneRef.current = true;
        if (!aDoneRef.current && aMsRef.current >= aboutMs) aDoneRef.current = true;

        if (pDoneRef.current && aDoneRef.current) {
          completeMission("mission_attention");
          stopLoop();
          return;
        }

        rafRef.current = requestAnimationFrame(loop);
      };

      lastTickRef.current = performance.now();
      rafRef.current = requestAnimationFrame(loop);
    };

    const init = async () => {
      const pEl = await waitForEl(projectsId);
      const aEl = await waitForEl(aboutId);

      // si no existen, no rompas la app
      if (!pEl && !aEl) return;

      if (pEl) {
        ioP = new IntersectionObserver(
          (entries) => {
            const v = entries.some((e) => e.isIntersecting);
            pVisibleRef.current = v;
            if (v) startLoop();
          },
          { threshold: 0.6 }
        );
        ioP.observe(pEl);
      }

      if (aEl) {
        ioA = new IntersectionObserver(
          (entries) => {
            const v = entries.some((e) => e.isIntersecting);
            aVisibleRef.current = v;
            if (v) startLoop();
          },
          { threshold: 0.6 }
        );
        ioA.observe(aEl);
      }
    };

    init();

    return () => {
      ioP?.disconnect();
      ioA?.disconnect();
      stopLoop();
    };
  }, [projectsId, aboutId, projectsMs, aboutMs]);
}
