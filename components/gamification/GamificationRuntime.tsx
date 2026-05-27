"use client";

import { useEffect, useState } from "react";
import GamificationBoot from "./Boot";
import TriggersBoot from "./TriggersBoot";
import MissionsBoot from "./MissionsBoot";
import AchievementsUI from "./AchievementsUI";

export default function GamificationRuntime() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idleCallback =
      window.requestIdleCallback ??
      ((callback: IdleRequestCallback) => {
        return window.setTimeout(() => {
          callback({
            didTimeout: false,
            timeRemaining: () => 0,
          } as IdleDeadline);
        }, 1800);
      });

    const cancelIdleCallback =
      window.cancelIdleCallback ?? ((id: number) => window.clearTimeout(id));

    const id = idleCallback(
      () => {
        setReady(true);
      },
      { timeout: 2500 }
    );

    return () => cancelIdleCallback(id);
  }, []);

  if (!ready) return null;

  return (
    <>
      <GamificationBoot />
      <TriggersBoot />
      <MissionsBoot />
      <AchievementsUI />
    </>
  );
}