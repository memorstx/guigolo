import type { AchievementId } from "./achievementsStore";

export type AchievementMeta = {
  id: AchievementId;
  title: string;
  description: string;
  icon?: string;
  howItWorks: {
    trigger: string;
    behavior: string;
    whyItMatters: string;
  };
};

export const ACHIEVEMENTS: AchievementMeta[] = [
  {
    id: "first_step",
    title: "Primer paso",
    description: "Todo empieza con una mirada curiosa. Gracias por estar aquí 💜",
    icon: "/achievements/first_step.svg",
    howItWorks: {
      trigger: "Se activa automáticamente al cargar el sitio por primera vez.",
      behavior: "Presencia inicial.",
      whyItMatters:
        "Marca el punto de entrada al sitio. Sirve como referencia base para todos los demás logros.",
    },
  },
  {
    id: "visual_match",
    title: "Match visual",
    description: "Reencuentro desbloqueado 💛",
    icon: "/achievements/visual_match.svg",
    howItWorks: {
      trigger: "Se activa cuando el usuario regresa al sitio en otro día.",
      behavior: "Interés recurrente.",
      whyItMatters:
        "Diferencia una visita casual de alguien que vuelve por afinidad o curiosidad real.",
    },
  },
  {
    id: "explorer",
    title: "Explorador",
    description: "Mirar con calma también es una decisión.",
    icon: "/achievements/explorer.svg",
    howItWorks: {
      trigger:
        "Se activa cuando el usuario hace scroll manual y recorre al menos una parte significativa del sitio.",
      behavior: "Exploración activa.",
      whyItMatters:
        "Evita contar scroll automático o clics rápidos. Indica que el usuario realmente recorrió el contenido.",
    },
  },
  {
    id: "services_decoded",
    title: "Servicios descifrados",
    description: "No todos leen esto. Tú sí.",
    icon: "/achievements/services_decoded.svg",
    howItWorks: {
      trigger:
        "Se activa después de interactuar varias veces con las cards de servicios.",
      behavior: "Búsqueda de entendimiento.",
      whyItMatters:
        "Detecta cuando alguien intenta comprender qué ofreces, no solo verlo por encima.",
    },
  },
  {
    id: "projects_gallery",
    title: "Galería viva",
    description: "Explorar proyectos dice más que mil palabras.",
    icon: "/achievements/projects_gallery.svg",
    howItWorks: {
      trigger:
        "Se activa tras interactuar varias veces con la galería de proyectos.",
      behavior: "Evaluación consciente.",
      whyItMatters:
        "Distingue interacción humana del autoplay. Indica interés real en el trabajo mostrado.",
    },
  },
  {
    id: "almost_talked",
    title: "Casi hablamos",
    description: "Ya casi nos conocemos.",
    icon: "/achievements/almost_talked.svg",
    howItWorks: {
      trigger:
        "Se activa cuando el usuario llega al formulario desde un CTA y el formulario es visible en pantalla.",
      behavior: "Intención de contacto.",
      whyItMatters:
        "Marca el punto previo a la conversación. Es interés explícito, aunque aún sin enviar mensaje.",
    },
  },
  {
    id: "took_courage",
    title: "Tomaste valor",
    description: "Empezaste a escribir. Respeto 🫡",
    icon: "/achievements/took_courage.svg",
    howItWorks: {
      trigger:
        "Se activa cuando el usuario escribe un número mínimo de caracteres en el mensaje.",
      behavior: "Compromiso emocional.",
      whyItMatters:
        "Escribir no es accidental. Indica que el usuario ya formuló una idea o necesidad real.",
    },
  },
  {
    id: "first_contact",
    title: "Primer contacto",
    description: "Me mandaste mensaje. Ya estamos del mismo lado 💚",
    icon: "/achievements/first_contact.svg",
    howItWorks: {
      trigger: "Se activa al enviar el formulario correctamente.",
      behavior: "Acción directa.",
      whyItMatters:
        "Marca el inicio formal de una conversación. Es el objetivo principal del sistema.",
    },
  },
];

export const ACH_BY_ID = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a])
) as Record<AchievementId, AchievementMeta>;
