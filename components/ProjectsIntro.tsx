import Section from "./Section";

export default function ProjectsIntro() {
  return (
    <Section className="py-20 bg-neutral-black-900" id="projects">
      <div className="flex items-end justify-between gap-8">
        <div>
          <p className="text-neutral-gray-500 text-sm tracking-widest uppercase">
            Projects
          </p>

          <h2 className="font-display text-heading-lg uppercase tracking-heading-lg text-white-100">
            Proyectos realizados
          </h2>

          <p className="mt-4 text-neutral-white/70 max-w-2xl">
            Una selección de proyectos donde la emoción se convierte en estructura funcional.
          </p>
        </div>

        <div className="hidden md:block text-neutral-white/30 text-xs">
          MODULE · PROJECTS INDEX
        </div>
      </div>

      <div className="mt-10 h-px w-full bg-white/10" />
    </Section>
  );
}
