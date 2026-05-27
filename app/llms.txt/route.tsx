export async function GET() {
  const body = `
# Guigolo

Guigolo is the personal portfolio and design identity of Guillermo González López.

The site focuses on:
- UI design
- UX systems
- Frontend development
- interactive web experiences
- emotionally-driven interfaces
- gamified portfolio experiences

Main URLs:
- https://guigolo.com/es
- https://guigolo.com/en
- https://guigolo.com/es/what-is-guigolo
- https://guigolo.com/en/what-is-guigolo

Topics:
- UI Design
- UX Design
- Frontend Development
- Creative Development
- Design Systems
- Portfolio Experiences
- Gamification
- Emotional Branding

Author:
Guillermo González López
https://guigolo.com

Contact:
info@guigolo.com

Social:
https://linkedin.com/in/guigolo
https://facebook.com/guigolo

This website is available in English and Spanish.
`;

  return new Response(body.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}