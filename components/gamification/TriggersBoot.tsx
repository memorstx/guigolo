"use client";

import useAchievementTriggers from "./useAchievmentsTrigger";

export default function TriggersBoot() {
  useAchievementTriggers({
    servicesId: "services",
    projectsId: "projects",
  });

  return null;
}
