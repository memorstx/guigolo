import Section from "./Section";

export default function ProjectsIntro() {
  return (
    <Section className="py-20 bg-black">
      <div className="flex items-end justify-between gap-8">
        <div>
          <p className="text-white/50 text-sm tracking-widest uppercase">
            Projects
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">
            Proyectos realizados
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl">
            Una selección de proyectos donde la emoción se convierte en estructura funcional.
          </p>
        </div>

        <div className="hidden md:block text-white/30 text-xs">
          MODULE · PROJECTS INDEX
        </div>
      </div>

      <div className="mt-10 h-px w-full bg-white/10" />
    </Section>
  );
}
