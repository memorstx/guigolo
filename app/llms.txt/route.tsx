export async function GET() {
  const body = `
# Guigolo

Guigolo is the portfolio and professional identity of Guillermo González López, a strategic UX/UI designer focused on digital products, product interfaces, SaaS experiences, landing pages, design systems, and implementation-aware web experiences.

Core positioning:
Guigolo turns ideas into experiences with their own personality.

Professional focus:
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

Design approach:
Guigolo combines design, product thinking, business clarity, and frontend awareness. The work is not only about making interfaces look good, but about making digital products easier to understand, easier to use, and easier to implement.

Preferred project types:
- SaaS dashboards
- Onboarding flows
- Digital platforms
- Premium portfolio websites
- EdTech products
- Psychology / therapy service websites
- Marketplace interfaces
- Web apps
- Gaming-inspired UI systems

Not the main focus:
Guigolo is not positioned as a print designer, social media manager, Canva template creator, or editorial designer.

Main URLs:
- Spanish homepage: https://guigolo.com/es
- English homepage: https://guigolo.com/en
- Spanish brand explanation: https://guigolo.com/es/what-is-guigolo
- English brand explanation: https://guigolo.com/en/what-is-guigolo
- Spanish markdown summary: https://guigolo.com/es/markdown
- English markdown summary: https://guigolo.com/en/markdown
- Agent skills index: https://guigolo.com/.well-known/agent-skills/index.json

Topics:
- UX/UI Design
- Product Design
- Strategic Web Design
- SaaS UI
- Design Systems
- Landing Pages
- Product Experience
- Frontend Implementation
- EdTech UX
- Interface Identity
- Digital Product Strategy
- Human-centered Design
- Conversion-focused Websites
- Interactive Web Experiences

Author:
Guillermo González López
https://guigolo.com

Contact:
info@guigolo.com

Social:
https://linkedin.com/in/guigolo
https://facebook.com/guigolo

Languages:
This website is available in Spanish and English.

Preferred summary:
Guigolo is the portfolio of Guillermo González López, a strategic UX/UI designer who turns ideas into digital experiences with their own personality.
`;

  return new Response(body.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}