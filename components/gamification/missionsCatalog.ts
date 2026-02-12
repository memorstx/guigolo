import type { MissionId } from "./missionsStore";

export type MissionMeta = {
  id: MissionId;
  title: string;
  description: string;
};

export const MISSIONS: MissionMeta[] = [
  {
    id: "mission_route",
    title: "Ruta completa",
    description:
      "Explora el sitio con calma: revisa servicios y navega varios proyectos.",
  },
  {
    id: "mission_attention",
    title: "Me quedé a ver",
    description:
      "Quédate un rato en Proyectos y luego en Sobre mí. Sin prisa, como quien sí quiere entender.",
  },
  {
    id: "mission_contact",
    title: "Hablemos en serio",
    description:
      "Abre el formulario, escribe un mensaje y envíalo.",
  },
  {
    id: "mission_easter",
    title: "Curioso de corazón",
    description:
      'Easter egg: escribe "GUIGOLO" con tu teclado en cualquier parte del sitio.',
  },
];

export const MISSION_BY_ID = Object.fromEntries(
  MISSIONS.map((m) => [m.id, m])
) as Record<MissionId, MissionMeta>;
