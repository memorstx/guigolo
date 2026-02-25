export type Locale = "es" | "en";

export type Mission = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export const MISSIONS: Mission[] = [
  {
    id: "mission_scroll",
    title: {
      es: "Explora el sitio",
      en: "Explore the site",
    },
    description: {
      es: "Recorre al menos una sección y entiende el vibe.",
      en: "Visit at least one section and get the vibe.",
    },
  },
  {
    id: "mission_projects",
    title: {
      es: "Ve proyectos",
      en: "Check projects",
    },
    description: {
      es: "Pasa por la sección de proyectos y abre al menos uno.",
      en: "Visit the projects section and open at least one.",
    },
  },
  {
    id: "mission_about",
    title: {
      es: "Conóceme",
      en: "Get to know me",
    },
    description: {
      es: "Llega a “Sobre mí” y lee aunque sea una tarjeta.",
      en: "Reach the “About” section and read at least one card.",
    },
  },
  {
    id: "mission_contact",
    title: {
      es: "Intención de contacto",
      en: "Contact intent",
    },
    description: {
      es: "Llega a contacto y quédate un ratito (no es scroll-drive-by).",
      en: "Reach contact and stay a bit (no scroll-drive-by).",
    },
  },
  {
    id: "mission_send",
    title: {
      es: "Envia el mensaje",
      en: "Send the message",
    },
    description: {
      es: "Completa el formulario y manda tu mensaje.",
      en: "Fill the form and send your message.",
    },
  },
];

export const MISSION_BY_ID: Record<string, Mission> = Object.fromEntries(
  MISSIONS.map((m) => [m.id, m])
);

/**
 * Helper opcional por si lo necesitas en UI:
 * getMissionText("mission_contact","es") -> {title, description}
 */
export function getMissionText(id: string, locale: Locale) {
  const m = MISSION_BY_ID[id];
  if (!m) return null;
  return {
    title: m.title[locale],
    description: m.description[locale],
  };
}
