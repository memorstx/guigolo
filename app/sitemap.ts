import type { MetadataRoute } from "next";
const baseUrl = "https://guigolo.com";
const locales = ["es", "en"];
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/what-is-guigolo", "/projects/mironline/platform", "/projects/bongodex/platform"];
  return locales.flatMap((locale) => routes.map((route) => ({
    url: `${baseUrl}/${locale}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : route.startsWith("/projects/") ? 0.85 : 0.8,
  })));
}
