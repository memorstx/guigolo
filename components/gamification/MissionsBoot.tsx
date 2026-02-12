"use client";

import useMissionsTrigger from "./useMissionsTrigger";

export default function MissionsBoot() {
  useMissionsTrigger({
    projectsId: "projects",
    aboutId: "about",
    projectsMs: 20000,
    aboutMs: 15000,
  });

  return null;
}
