export const ROUTES = {
  whatIsGuigolo: {
    es: "/que-es-guigolo",
    en: "/what-is-guigolo",
  },
  // agregar más páginas aquí:
  // services: { es: "/servicios", en: "/services" },
} as const;

export type RouteKey = keyof typeof ROUTES;
export type Locale = "es" | "en";

export function getLocalizedPath(key: RouteKey, locale: Locale) {
  return ROUTES[key][locale];
}
