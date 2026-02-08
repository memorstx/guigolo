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

  // ---- 1) SCROLL REAL (anti scroll programático) ----
  const sawHumanScrollRef = useRef(false);
  const maxScrollRatioRef = useRef(0);

  useEffect(() => {
    const onWheel = () => (sawHumanScrollRef.current = true);
    const onTouchMove = () => (sawHumanScrollRef.current = true);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const onScroll = () => {
      // si no hubo wheel/touchmove, no contamos
      if (!sawHumanScrollRef.current) return;

      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollable = Math.max(1, doc.scrollHeight - doc.clientHeight);
      const ratio = scrollTop / scrollable;

      if (ratio > maxScrollRatioRef.current) maxScrollRatioRef.current = ratio;

      // umbral: 35% del sitio scrolleado manualmente
      if (!hasAchievement("explorer") && maxScrollRatioRef.current >= 0.35) {
        unlockAchievement("explorer");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
  const didUserInteractProjectsRef = useRef(false);

  useEffect(() => {
    const root = document.getElementById(projectsId);
    if (!root) return;

    // A) Click en PREVIOUS/NEXT (tus botones son reales)
    const onClickCapture = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // intenta detectar tus botones por texto (robusto sin tocar tu código)
      const btn = target.closest("button");
      if (!btn) return;

      const txt = (btn.textContent || "").trim().toUpperCase();
      if (txt === "PREVIOUS" || txt === "NEXT") {
        didUserInteractProjectsRef.current = true;
        if (!hasAchievement("projects_gallery")) {
          unlockAchievement("projects_gallery");
        }
      }
    };

    // B) Swipe / drag manual (pointer)
    const onPointerDown = () => {
      didUserInteractProjectsRef.current = true;
      if (!hasAchievement("projects_gallery")) {
        unlockAchievement("projects_gallery");
      }
    };

    root.addEventListener("click", onClickCapture, true);
    root.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      root.removeEventListener("click", onClickCapture, true);
      root.removeEventListener("pointerdown", onPointerDown as any);
    };
  }, [projectsId]);
}
