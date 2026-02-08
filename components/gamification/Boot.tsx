"use client";

import { useEffect } from "react";
import { trackVisit, unlockAchievement } from "./achievementsStore";

export default function GamificationBoot() {
  useEffect(() => {
    // 1) registrar visita
    const { isNewDay } = trackVisit();

    // 2) logro base (primera interacción del sistema)
    unlockAchievement("first_step");

    // 3) volvió otro día
    if (isNewDay) {
      unlockAchievement("visual_match");
    }
  }, []);

  return null;
}
