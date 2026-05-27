export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "en" ? "en" : "es";

  const body =
    locale === "en"
      ? `# Guigolo

Guigolo is the portfolio of Guillermo González López, a UI designer and frontend developer focused on clear, human and strategic digital interfaces.

## Services

- UI Design
- UX Design
- Frontend Development
- Design Systems
- Interactive Web Experiences
- Emotional Branding

## Main pages

- Home: https://guigolo.com/en
- What is Guigolo: https://guigolo.com/en/what-is-guigolo
- Contact: https://guigolo.com/en#contacto

## Contact

Email: info@guigolo.com
`
      : `# Guigolo

Guigolo es el portafolio de Guillermo González López, diseñador UI y desarrollador frontend enfocado en interfaces digitales claras, humanas y estratégicas.

## Servicios

- Diseño UI
- Diseño UX
- Desarrollo frontend
- Sistemas de diseño
- Experiencias web interactivas
- Branding emocional

## Páginas principales

- Inicio: https://guigolo.com/es
- Qué es Guigolo: https://guigolo.com/es/what-is-guigolo
- Contacto: https://guigolo.com/es#contacto

## Contacto

Email: info@guigolo.com
`;

  return new Response(body.trim(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Markdown-Tokens": String(body.trim().split(/\s+/).length),
      "Cache-Control": "public, max-age=3600",
    },
  });
}