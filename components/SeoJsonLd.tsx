type SeoJsonLdProps = {
  locale: "es" | "en";
};

export default function SeoJsonLd({ locale }: SeoJsonLdProps) {
  const baseUrl = "https://guigolo.com";
  const pageUrl = `${baseUrl}/${locale}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Guillermo González López",
        alternateName: ["Guigolo", "Memo"],
        url: baseUrl,
        email: "info@guigolo.com",
        jobTitle:
          locale === "es"
            ? "Diseñador UI y desarrollador frontend"
            : "UI Designer and Frontend Developer",
        knowsAbout: [
          "UI Design",
          "UX Design",
          "Frontend Development",
          "Design Systems",
          "Interactive Web Experiences",
          "Creative Development",
          "Emotional Branding",
        ],
        sameAs: [
          "https://www.linkedin.com/in/guigolo",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Guigolo",
        inLanguage: locale === "es" ? "es-MX" : "en-US",
        publisher: {
          "@id": `${baseUrl}/#person`,
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        name: "Guigolo",
        url: pageUrl,
        email: "info@guigolo.com",
        founder: {
          "@id": `${baseUrl}/#person`,
        },
        areaServed: ["Mexico", "Remote"],
        serviceType: [
          "UI Design",
          "UX Design",
          "Frontend Development",
          "Web Design",
          "Design Systems",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}