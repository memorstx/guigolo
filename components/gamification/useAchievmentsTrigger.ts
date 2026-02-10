"use client";

import { useEffect, useRef } from "react";
import { hasAchievement, unlockAchievement } from "./achievementsStore";

type TriggersConfig = {
  servicesId?: string; // default: "services"
  projectsId?: string; // default: "projects"
};

export default function useAchievementTriggers(cfg: TriggersConfig = {}) {
  const servicesId = cfg.servicesId ?? "services";
  const projectsId = cfg.projectsId ?? "projects";

  // ---- 1) SCROLL REAL (anti scroll programático + lectura) ----
  const lastHumanInputAtRef = useRef(0);
  const maxScrollRatioRef = useRef(0);
  const ignoreScrollUntilRef = useRef(0);
  const explorerTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const markHuman = () => {
      lastHumanInputAtRef.current = Date.now();
    };

    // 1) Detectores de interacción humana real
    const onWheel = () => markHuman();
    const onTouchMove = () => markHuman();
    const onKeyDown = (e: KeyboardEvent) => {
      // teclas que suelen representar scroll/lectura
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
      if (keys.includes(e.key)) markHuman();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    // 2) Bloqueo temporal: si hay navegación por hash, ignorar scroll inmediato
    const lockScroll = (ms = 1200) => {
      ignoreScrollUntilRef.current = Date.now() + ms;
    };

    const onHashChange = () => lockScroll(1200);

    // También bloquea si el usuario hace click en un link a "#algo"
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;

      const a = t.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;

      // clicks que causan jump/scroll automático
      lockScroll(1200);
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onDocClick, true);

    // 3) Scroll handler: solo cuenta si hubo input humano RECIENTE
    const onScroll = () => {
    const now = Date.now();
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const THRESHOLD = isMobile ? 0.55 : 0.35; // móvil pide más
      if (!hasAchievement("explorer") && maxScrollRatioRef.current >= THRESHOLD) {
        unlockAchievement("explorer");
      }


      // si está en ventana bloqueada (hash/cta jump), ignorar
      if (now < ignoreScrollUntilRef.current) return;

      // si no hubo input humano reciente, ignorar
      if (now - lastHumanInputAtRef.current > 800) return;

      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollable = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const ratio = scrollTop / scrollable;

      if (ratio > maxScrollRatioRef.current) maxScrollRatioRef.current = ratio;

      // Solo para stats: llegar a cierto punto
      // (no desbloqueamos aquí; desbloqueamos por "lectura" abajo)
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // 4) "Se quedó a leer": si una sección clave está visible 2.8s, gana explorer
    const startExplorerTimer = () => {
      if (hasAchievement("explorer")) return;
      if (explorerTimerRef.current) return;

      explorerTimerRef.current = window.setTimeout(() => {
        explorerTimerRef.current = null;

        // Revalidamos: sigue habiendo intención (input reciente) y no es scroll automático
        const now2 = Date.now();
        if (now2 < ignoreScrollUntilRef.current) return;
        if (now2 - lastHumanInputAtRef.current > 2500) return;

        unlockAchievement("explorer");
      }, 2800);
    };

    const cancelExplorerTimer = () => {
      if (!explorerTimerRef.current) return;
      window.clearTimeout(explorerTimerRef.current);
      explorerTimerRef.current = null;
    };

    // Observamos secciones “relevantes” para lectura
    const idsToWatch = [servicesId, projectsId, "about", "faq", "contacto"].filter(Boolean);
    const els = idsToWatch
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io =
      els.length > 0
        ? new IntersectionObserver(
            (entries) => {
              // Si el usuario está “viendo” una sección (60% visible), iniciamos timer
              const anyGood = entries.some((en) => en.isIntersecting && en.intersectionRatio >= 0.6);

              if (!anyGood) {
                cancelExplorerTimer();
                return;
              }

              // Solo arranca si hubo interacción humana reciente (no solo autoplay/scroll automático)
              const now3 = Date.now();
              if (now3 < ignoreScrollUntilRef.current) return;
              if (now3 - lastHumanInputAtRef.current > 1200) return;

              startExplorerTimer();
            },
            { threshold: [0.6] }
          )
        : null;

    io?.disconnect();
    els.forEach((el) => io?.observe(el));

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onDocClick, true);
      window.removeEventListener("scroll", onScroll);

      cancelExplorerTimer();
      io?.disconnect();
    };
  }, [servicesId, projectsId]);


  // ---- 2) SERVICES: contar clicks humanos en cards ----
  const servicesClicksRef = useRef(0);

  useEffect(() => {
    const root = document.getElementById(servicesId);
    if (!root) return;

    // marcamos interacción SOLO si hubo pointer real
    const onClickCapture = (e: Event) => {
      if (hasAchievement("services_decoded")) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // contamos clicks en botones dentro de la sección (tus cards son <button>)
      const btn = target.closest("button");
      if (!btn) return;

      servicesClicksRef.current += 1;

      // umbral: 2 interacciones reales
      if (servicesClicksRef.current >= 2) {
        unlockAchievement("services_decoded");
      }
    };

    root.addEventListener("click", onClickCapture, true);

    return () => {
      root.removeEventListener("click", onClickCapture, true);
    };
  }, [servicesId]);

  // ---- 3) PROJECTS: solo interacción humana (no autoplay) ----
    // ---- 3) PROJECTS: progreso real (snaps únicos) ----
  const projectsInteractedRef = useRef(false);
  const seenSlidesRef = useRef<Set<number>>(new Set());
  const unlockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.getElementById(projectsId);
    if (!root) return;

    // detecta cuántos slides hay (Embla usa flex children dentro del track)
    const getTotalSlides = () => {
      // tu estructura: #projects -> ... -> emblaRef -> .flex -> children
      // buscamos el primer ".flex" dentro de la sección y contamos sus hijos
      const track = root.querySelector(".flex");
      const total = track?.children?.length ?? 0;
      return Math.max(1, total);
    };

    const required = () => {
      const total = getTotalSlides();
      return Math.ceil(total / 2); // mitad + 1 cuando es impar (2/3, 4/7, etc.)
    };

    const markInteraction = () => {
      projectsInteractedRef.current = true;
    };

    // cada vez que el carrusel se “mueve”, intentamos registrar el slide visible
    // pero solo si hubo interacción humana antes (anti-autoplay)
    const tryRegisterVisible = () => {
      if (!projectsInteractedRef.current) return;
      if (hasAchievement("projects_gallery")) return;

      // intentamos encontrar el slide "más visible"
      // tus slides son: <div className="min-w-0 flex-[0_0_100%]">
      const slides = Array.from(
        root.querySelectorAll<HTMLElement>(".min-w-0.flex-\\[0_0_100\\%\\]")
      );

      if (!slides.length) return;

      const viewport = root.querySelector<HTMLElement>("[class*='overflow-hidden']");
      const vr = viewport?.getBoundingClientRect() ?? root.getBoundingClientRect();

      let bestIdx = 0;
      let bestScore = -Infinity;

      slides.forEach((el, idx) => {
        const r = el.getBoundingClientRect();
        const overlap = Math.max(0, Math.min(r.right, vr.right) - Math.max(r.left, vr.left));
        const score = overlap; // el que más overlap horizontal tiene = el visible
        if (score > bestScore) {
          bestScore = score;
          bestIdx = idx;
        }
      });

      seenSlidesRef.current.add(bestIdx);

      // ✅ condición: visitó suficientes slides únicos
      if (seenSlidesRef.current.size >= required()) {
        unlockAchievement("projects_gallery");
      }
    };

    // A) clicks en PREVIOUS/NEXT cuentan como interacción humana
    const onClickCapture = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest("button");
      if (!btn) return;

      const txt = (btn.textContent || "").trim().toUpperCase();
      if (txt === "PREVIOUS" || txt === "NEXT") {
        markInteraction();

        // espera un poquito a que el carrusel termine el snap y registra
        if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = window.setTimeout(tryRegisterVisible, 250);
      }
    };

    // B) swipe/drag manual cuenta como interacción humana
    const onPointerDown = () => {
      markInteraction();
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = window.setTimeout(tryRegisterVisible, 250);
    };

    // C) “scroll end” aproximado: cuando termina el movimiento (transitionend)
    // sirve para registrar bien el slide visible después del snap
    const onTransitionEnd = () => {
      if (!projectsInteractedRef.current) return;
      tryRegisterVisible();
    };

    root.addEventListener("click", onClickCapture, true);
    root.addEventListener("pointerdown", onPointerDown, { passive: true });

    // enganchar transitionend a cualquier elemento que transicione dentro del carrusel
    const track = root.querySelector(".flex");
    track?.addEventListener("transitionend", onTransitionEnd);

    // por si el usuario se queda viendo el carrusel y luego interactúa:
    // registramos el slide actual inmediatamente después de la primera interacción
    const onFirstInteraction = () => {
      markInteraction();
      tryRegisterVisible();
      window.removeEventListener("keydown", onFirstInteraction);
    };
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    return () => {
      root.removeEventListener("click", onClickCapture, true);
      root.removeEventListener("pointerdown", onPointerDown as any);
      track?.removeEventListener("transitionend", onTransitionEnd);
      if (unlockTimerRef.current) window.clearTimeout(unlockTimerRef.current);
    };
  }, [projectsId]);

}
