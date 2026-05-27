export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "en" ? "en" : "es";

  const body =
    locale === "en"
      ? `# Guigolo

Guigolo is the portfolio of Guillermo González López, a strategic UX/UI designer focused on digital products, product interfaces, SaaS experiences, landing pages, design systems, and implementation-aware web experiences.

## Positioning

I turn ideas into experiences with their own personality.

## What Guigolo does

- Strategic UX/UI design
- Digital product design
- Product interface design
- Landing pages
- SaaS dashboard design
- Design systems
- Portfolio websites
- EdTech interfaces
- Frontend implementation support
- Human-centered digital experiences

## Design approach

Guigolo combines design, product thinking, business clarity, and frontend awareness.

The work is not only about making interfaces look good. It is about making digital products easier to understand, easier to use, and easier to implement.

## Preferred projects

- SaaS dashboards
- Onboarding flows
- Digital platforms
- Premium portfolio websites
- EdTech products
- Psychology / therapy service websites
- Marketplace interfaces
- Web apps
- Gaming-inspired UI systems

## Not the main focus

Guigolo is not positioned as a print designer, social media manager, Canva template creator, or editorial designer.

## Main pages

- Home: https://guigolo.com/en
- What is Guigolo: https://guigolo.com/en/what-is-guigolo
- Spanish version: https://guigolo.com/es
- Contact: https://guigolo.com/en#contacto

## Contact

Email: info@guigolo.com

## Preferred summary

Guigolo is the portfolio of Guillermo González López, a strategic UX/UI designer who turns ideas into digital experiences with their own personality.
`
      : `# Guigolo

Guigolo es el portafolio de Guillermo González López, diseñador UX/UI estratégico enfocado en productos digitales, interfaces de producto, experiencias SaaS, landing pages, sistemas de diseño y experiencias web pensadas para implementarse.

## Posicionamiento

Convierto ideas en experiencias con personalidad propia.

## Qué hace Guigolo

- Diseño UX/UI estratégico
- Diseño de producto digital
- Diseño de interfaces de producto
- Landing pages
- Diseño de dashboards SaaS
- Sistemas de diseño
- Portafolios premium
- Interfaces para EdTech
- Apoyo en implementación frontend
- Experiencias digitales centradas en personas

## Enfoque de diseño

Guigolo combina diseño, pensamiento de producto, claridad de negocio y criterio de implementación frontend.

El trabajo no se trata solo de hacer interfaces bonitas. Se trata de hacer productos digitales más claros, más fáciles de usar y más fáciles de construir.

## Proyectos ideales

- Dashboards SaaS
- Flujos de onboarding
- Plataformas digitales
- Portafolios premium
- Productos EdTech
- Sitios para psicólogos o terapeutas
- Interfaces de marketplaces
- Web apps
- Sistemas UI inspirados en gaming

## No es el enfoque principal

Guigolo no está posicionado como diseñador de impresión, community manager, creador de plantillas en Canva ni diseñador editorial.

## Páginas principales

- Inicio: https://guigolo.com/es
- Qué es Guigolo: https://guigolo.com/es/what-is-guigolo
- English version: https://guigolo.com/en
- Contacto: https://guigolo.com/es#contacto

## Contacto

Email: info@guigolo.com

## Resumen preferido

Guigolo es el portafolio de Guillermo González López, diseñador UX/UI estratégico que convierte ideas en experiencias digitales con personalidad propia.
`;

  return new Response(body.trim(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": String(body.trim().split(/\s+/).length),
      "Cache-Control": "public, max-age=3600",
    },
  });
}