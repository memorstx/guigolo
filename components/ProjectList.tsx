import Section from "./Section";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "GUIGOLO · Visual Engine",
    tagline:
      "Un sistema visual diseñado para unir emoción, claridad y precisión estratégica.",
    context: "CREATIVE TECHNOLOGY",
    stack: "FIGMA · FRONTEND",
    role: "UX/UI · SYSTEM DESIGN",
    status: "LIVE",
    access: "SYSTEM BREAKDOWN",
    linkLabel: "guigolo.com",
    linkHref: "https://guigolo.com",
  },
  {
    title: "ACADEMIA GLOBAL",
    tagline:
      "Rediseño un sistema académico complejo para hacerlo claro, usable y fácil de gestionar.",
    context: "EDTECH SYSTEM",
    stack: "FIGMA",
    role: "UI/UX DESIGNER",
    status: "CASE STUDY",
    access: "DESIGN PROCESS",
    linkLabel: "academiaglobal.mx",
    linkHref: "https://academiaglobal.mx",
  },
  {
    title: "MIRONLINE",
    tagline:
      "Diseño una experiencia de aprendizaje interactiva, gamificada y centrada en el progreso real.",
    context: "LEARNING EXPERIENCE",
    stack: "FIGMA · PHP · MYSQL",
    role: "UX/UI · FRONTEND",
    status: "LIVE",
    access: "CASE STUDY",
    linkLabel: "mironline.io",
    linkHref: "https://mironline.io",
  },
  {
    title: "TSF · Tu Streamer Favorito",
    tagline:
      "Una experiencia lúdica diseñada para conectar juego, entretenimiento y participación.",
    context: "ENTERTAINMENT APP",
    stack: "FIGMA",
    role: "UI DESIGNER",
    status: "ARCHIVED",
    access: "UI OVERVIEW",
    // sin link porque está archived
  },
];

export default function ProjectsList() {
  return (
    <Section className="pb-24 bg-black">
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}
