type SeoJsonLdProps = {
  locale: "es" | "en";
};

export default function SeoJsonLd({ locale }: SeoJsonLdProps) {
  const baseUrl = "https://guigolo.com";
  const pageUrl = `${baseUrl}/${locale}`;

  const isSpanish = locale === "es";

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
        jobTitle: isSpanish
          ? "Diseñador UX/UI estratégico para productos digitales"
          : "Strategic UX/UI Designer for digital products",
        description: isSpanish
          ? "Especialista en experiencias digitales estratégicas con identidad propia. Convierte ideas en interfaces, productos y sistemas web claros, humanos e implementables."
          : "Specialist in strategic digital experiences with their own identity. Turns ideas into clear, human and implementation-aware interfaces, products and web systems.",
        knowsAbout: [
          "UX/UI Design",
          "Product Design",
          "Landing Pages",
          "SaaS Dashboards",
          "Design Systems",
          "Frontend Implementation",
          "EdTech Platforms",
          "Portfolio Websites",
          "Interface Design",
          "Digital Product Strategy",
          "User Experience",
          "Interactive Web Experiences",
        ],
        hasOccupation: {
          "@type": "Occupation",
          name: isSpanish
            ? "Diseñador UX/UI estratégico"
            : "Strategic UX/UI Designer",
          skills: [
            "Figma",
            "UX/UI Design",
            "Product Design",
            "Design Systems",
            "Frontend Implementation",
            "Next.js",
            "React",
            "Tailwind CSS",
            "TypeScript",
            "Vercel",
          ],
        },
        sameAs: ["https://www.linkedin.com/in/guigolo"],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Guigolo",
        description: isSpanish
          ? "Portafolio de Guillermo González López, especialista en UX/UI estratégico, producto digital y experiencias web con identidad propia."
          : "Portfolio of Guillermo González López, specialist in strategic UX/UI, digital product design and web experiences with their own identity.",
        inLanguage: isSpanish ? "es-MX" : "en-US",
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
        areaServed: [
          {
            "@type": "Country",
            name: "Mexico",
          },
          {
            "@type": "Place",
            name: "LATAM",
          },
          {
            "@type": "VirtualLocation",
            url: baseUrl,
          },
        ],
        slogan: isSpanish
          ? "Convierto ideas en experiencias con personalidad propia."
          : "I turn ideas into experiences with their own personality.",
        serviceType: [
          "UX/UI Design",
          "Product Design",
          "Landing Pages",
          "Design Systems",
          "SaaS Dashboard Design",
          "Portfolio Website Design",
          "Frontend Implementation",
          "EdTech Interface Design",
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