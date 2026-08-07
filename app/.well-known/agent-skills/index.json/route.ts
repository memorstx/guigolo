export const dynamic = "force-static";

export async function GET() {
  const body = {
    $schema: "https://agentskills.io/skill-schema.json",
    skills: [
      {
        name: "portfolio-navigation",
        type: "discovery",
        description:
          "Explore Guigolo portfolio pages, projects, process, and design philosophy.",
        url: "https://guigolo.com/es",
      },
      {
        name: "what-is-guigolo",
        type: "content",
        description:
          "Explains the meaning, identity, philosophy, and branding behind Guigolo.",
        url: "https://guigolo.com/es/what-is-guigolo",
      },
      {
        name: "contact-guigolo",
        type: "contact",
        description:
          "Contact Guillermo González López for UI design, frontend, UX, or creative web development work.",
        url: "https://guigolo.com/es#contacto",
      },
    ],
  };

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}