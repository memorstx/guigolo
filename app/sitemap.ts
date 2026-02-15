import type { MetadataRoute } from "next";

const baseUrl = "https://guigolo.com";

const locales = ["es", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/what-is-guigolo",
  ];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    }))
  );
}
