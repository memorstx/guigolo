import Section from "./Section";
import ProjectCard from "./ProjectCard";

export default function ProjectsList() {
  return (
    <Section className="pb-24 bg-black">
      <ProjectCard
        project={{
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
        }}
      />
    </Section>
  );
}
