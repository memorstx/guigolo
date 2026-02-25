import type { AchievementId } from "./achievementsStore";

type I18nText = {
  es: string;
  en: string;
};

export type AchievementMeta = {
  id: AchievementId;
  title: I18nText;
  description: I18nText;
  icon?: string;
  howItWorks: {
    trigger: I18nText;
    behavior: I18nText;
    whyItMatters: I18nText;
  };
};

export const ACHIEVEMENTS: AchievementMeta[] = [
  {
    id: "first_step",
    title: { es: "Primer paso", en: "First step" },
    description: {
      es: "Todo empieza con una mirada curiosa. Gracias por estar aquí 💜",
      en: "Everything starts with curious eyes. Thanks for being here 💜",
    },
    icon: "/achievements/first_step.svg",
    howItWorks: {
      trigger: {
        es: "Se activa automáticamente al cargar el sitio por primera vez.",
        en: "Automatically unlocks the first time the site loads.",
      },
      behavior: { es: "Presencia inicial.", en: "First presence." },
      whyItMatters: {
        es: "Marca el punto de entrada al sitio. Sirve como referencia base para todos los demás logros.",
        en: "Marks the entry point. It becomes the baseline reference for all other achievements.",
      },
    },
  },
  {
    id: "visual_match",
    title: { es: "Match visual", en: "Visual match" },
    description: { es: "Reencuentro desbloqueado 💛", en: "Reunion unlocked 💛" },
    icon: "/achievements/visual_match.svg",
    howItWorks: {
      trigger: {
        es: "Se activa cuando el usuario regresa al sitio en otro día.",
        en: "Unlocks when the user returns on a different day.",
      },
      behavior: { es: "Interés recurrente.", en: "Recurring interest." },
      whyItMatters: {
        es: "Diferencia una visita casual de alguien que vuelve por afinidad o curiosidad real.",
        en: "Separates a casual visit from someone returning out of real interest or curiosity.",
      },
    },
  },
  {
    id: "explorer",
    title: { es: "Explorador", en: "Explorer" },
    description: {
      es: "Mirar con calma también es una decisión.",
      en: "Taking your time is a choice, too.",
    },
    icon: "/achievements/explorer.svg",
    howItWorks: {
      trigger: {
        es: "Se activa cuando el usuario hace scroll manual y recorre al menos una parte significativa del sitio.",
        en: "Unlocks after manual scrolling through a meaningful part of the site.",
      },
      behavior: { es: "Exploración activa.", en: "Active exploration." },
      whyItMatters: {
        es: "Evita contar scroll automático o clics rápidos. Indica que el usuario realmente recorrió el contenido.",
        en: "Avoids counting autoplay/quick taps. Signals real content exploration.",
      },
    },
  },
  {
    id: "services_decoded",
    title: { es: "Servicios descifrados", en: "Services decoded" },
    description: { es: "No todos leen esto. Tú sí.", en: "Not everyone reads this. You did." },
    icon: "/achievements/services_decoded.svg",
    howItWorks: {
      trigger: {
        es: "Se activa después de interactuar varias veces con las cards de servicios.",
        en: "Unlocks after multiple interactions with the services cards.",
      },
      behavior: { es: "Búsqueda de entendimiento.", en: "Seeking understanding." },
      whyItMatters: {
        es: "Detecta cuando alguien intenta comprender qué ofreces, no solo verlo por encima.",
        en: "Detects when someone is trying to understand what you offer, not just skimming.",
      },
    },
  },
  {
    id: "projects_gallery",
    title: { es: "Galería viva", en: "Living gallery" },
    description: {
      es: "Explorar proyectos dice más que mil palabras.",
      en: "Exploring projects speaks louder than words.",
    },
    icon: "/achievements/projects_gallery.svg",
    howItWorks: {
      trigger: {
        es: "Se activa tras interactuar varias veces con la galería de proyectos.",
        en: "Unlocks after multiple interactions with the projects gallery.",
      },
      behavior: { es: "Evaluación consciente.", en: "Conscious evaluation." },
      whyItMatters: {
        es: "Distingue interacción humana del autoplay. Indica interés real en el trabajo mostrado.",
        en: "Separates human interaction from autoplay. Indicates real interest in the work shown.",
      },
    },
  },
  {
    id: "almost_talked",
    title: { es: "Casi hablamos", en: "Almost talked" },
    description: { es: "Ya casi nos conocemos.", en: "We almost met." },
    icon: "/achievements/almost_talked.svg",
    howItWorks: {
      trigger: {
        es: "Se activa cuando el usuario llega al formulario desde un CTA y el formulario es visible en pantalla.",
        en: "Unlocks when the user reaches the contact form from a CTA and the form is visible.",
      },
      behavior: { es: "Intención de contacto.", en: "Contact intent." },
      whyItMatters: {
        es: "Marca el punto previo a la conversación. Es interés explícito, aunque aún sin enviar mensaje.",
        en: "Marks the moment before conversation. Clear interest, even without sending yet.",
      },
    },
  },
  {
    id: "took_courage",
    title: { es: "Tomaste valor", en: "Took courage" },
    description: { es: "Empezaste a escribir. Respeto 🫡", en: "You started typing. Respect 🫡" },
    icon: "/achievements/took_courage.svg",
    howItWorks: {
      trigger: {
        es: "Se activa cuando el usuario escribe un número mínimo de caracteres en el mensaje.",
        en: "Unlocks when the user types a minimum number of characters.",
      },
      behavior: { es: "Compromiso emocional.", en: "Emotional commitment." },
      whyItMatters: {
        es: "Escribir no es accidental. Indica que el usuario ya formuló una idea o necesidad real.",
        en: "Typing isn’t accidental. It means the user already formed a real need or idea.",
      },
    },
  },
  {
    id: "first_contact",
    title: { es: "Primer contacto", en: "First contact" },
    description: {
      es: "Me mandaste mensaje. Ya estamos del mismo lado 💚",
      en: "You sent a message. We’re on the same side now 💚",
    },
    icon: "/achievements/first_contact.svg",
    howItWorks: {
      trigger: { es: "Se activa al enviar el formulario correctamente.", en: "Unlocks when the form is submitted successfully." },
      behavior: { es: "Acción directa.", en: "Direct action." },
      whyItMatters: {
        es: "Marca el inicio formal de una conversación. Es el objetivo principal del sistema.",
        en: "Marks the formal start of a conversation. It’s the main system goal.",
      },
    },
  },
];

export const ACH_BY_ID = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a])
) as Record<AchievementId, AchievementMeta>;
