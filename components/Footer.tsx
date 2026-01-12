import Section from "./Section";

export default function Footer() {
  return (
    <Section className="py-14 bg-black">
      <div className="h-px w-full bg-white/10" />

      <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-white font-semibold tracking-wide">GUIGOLO</p>
          <p className="mt-2 text-white/60 max-w-xl">
            Diseño con intención. Sistema con claridad. Experiencias que se sienten.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a href="#projects" className="text-sm text-white/60 hover:text-white transition">
            Proyectos
          </a>
          <a href="#contacto" className="text-sm text-white/60 hover:text-white transition">
            Contacto
          </a>
          <a href="#" className="text-sm text-white/60 hover:text-white transition">
            Arriba
          </a>
        </div>
      </div>

      <p className="mt-10 text-xs text-white/40">
        © {new Date().getFullYear()} GUIGOLO · MODULE · FOOTER SIGNAL
      </p>
    </Section>
  );
}
