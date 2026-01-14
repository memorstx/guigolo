import Section from "./Section";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-neutral-black-900/70 backdrop-blur border-b border-neutral-white/10">
      <Section className="py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-neutral-white font-semibold tracking-wide">
            GUIGOLO
          </a>

          <div className="flex items-center gap-4">
            <a
              href="#projects"
              className="text-sm text-neutral-white/70 hover:text-white transition"
            >
              Proyectos
            </a>
            <a
              href="#contacto"
              className="text-sm text-neutral-white/70 hover:text-white transition"
            >
              Contacto
            </a>

            <a
              href="#contacto"
              className="hidden sm:inline-flex px-4 py-2 rounded-md bg-accent-lime text-neutral-black-900 text-sm font-medium hover:bg-lime-300 transition"
            >
              Contratar →
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
