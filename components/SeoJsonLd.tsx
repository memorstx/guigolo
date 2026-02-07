export function SeoJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://guigolo.com/#website",
        "url": "https://guigolo.com/",
        "name": "Guigolo",
        "description":
          "Portafolio de Guillermo González López. Diseño interfaces claras, sensibles y estratégicas para productos digitales reales.",
        "inLanguage": "es-MX"
      },
      {
        "@type": "Person",
        "@id": "https://guigolo.com/#person",
        "name": "Guillermo González López",
        "alternateName": ["Guigolo", "Memo"],
        "url": "https://guigolo.com/",
        "jobTitle": ["Diseñador UX/UI", "Diseñador Web", "Front-end Developer"],
        "worksFor": {
          "@type": "Organization",
          "name": "Guigolo Studio",
        },
        "sameAs": [
          "https://www.linkedin.com/in/guigolo",
          // "https://github.com/[PONER_AQUI]",
          // "https://www.behance.net/[PONER_AQUI]"
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
