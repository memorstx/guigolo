import type { MissionId } from "./missionsStore";

export type MissionMeta = {
  id: MissionId;
  title: string;
  description: string;
};

export const MISSIONS: MissionMeta[] = [
  {
    id: "mission_route",
    title: "Recorrido consciente",
    description:
      "Se completa cuando desbloqueas: Explorador + Servicios descifrados + Galería viva.",
  },
  {
    id: "mission_attention",
    title: "Atención real",
    description:
      "Se completa si te quedas viendo Projects (~20s) y About (~15s) con intención (no autoplay).",
  },
  {
    id: "mission_contact",
    title: "Intención de contacto",
    description:
      "Se completa si llegas al formulario, empiezas a escribir y envías un mensaje.",
  },
  {
    id: "mission_easter",
    title: "Curiosidad avanzada",
    description:
      'Se completa con un easter egg: escribe la secuencia de teclas "GUIGOLO".',
  },
];

export const MISSION_BY_ID = Object.fromEntries(
  MISSIONS.map((m) => [m.id, m])
) as Record<MissionId, MissionMeta>;
