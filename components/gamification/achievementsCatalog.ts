
import type { AchievementId } from "./achievementsStore";

export type AchievementMeta = {
  id: AchievementId;
  title: string;
  description: string;
  icon?: string; // ruta en /public
  totalWeight?: number; // por si luego haces scoring
};

export const ACHIEVEMENTS: AchievementMeta[] = [
  {
    id: "first_step",
    title: "Primer paso",
    description: "Entraste al universo Guigolo.",
    icon: "/achievements/first_step.png",
  },
  {
    id: "visual_match",
    title: "Match visual",
    description: "Volviste otro día. Eso se aprecia 💛",
    icon: "/achievements/visual_match.png",
  },
  {
    id: "explorer",
    title: "Explorador",
    description: "Te aventaste un buen recorrido del sitio.",
    icon: "/achievements/explorer.png",
  },
  {
    id: "services_decoded",
    title: "Servicios descifrados",
    description: "Le diste click para entender cómo puedo ayudarte.",
    icon: "/achievements/services_decoded.png",
  },
  {
    id: "projects_gallery",
    title: "Galería viva",
    description: "Navegaste proyectos con intención (no por autoplay).",
    icon: "/achievements/projects_gallery.png",
  },
  {
    id: "almost_talked",
    title: "Casi hablamos",
    description: "Llegaste al formulario. Ya casi 👀",
    icon: "/achievements/almost_talked.png",
  },
  {
    id: "took_courage",
    title: "Tomaste valor",
    description: "Empezaste a escribir. Respeto 🫡",
    icon: "/achievements/took_courage.png",
  },
  {
    id: "first_contact",
    title: "Primer contacto",
    description: "Me mandaste mensaje. Ya estamos del mismo lado 💚",
    icon: "/achievements/first_contact.png",
  },
];

// lookup rápido
export const ACH_BY_ID = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a])
) as Record<AchievementId, AchievementMeta>;
