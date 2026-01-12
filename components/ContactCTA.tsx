import Section from "./Section";

export default function ContactCTA() {
  return (
    <Section className="py-24 bg-black">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <p className="text-white/50 text-sm tracking-widest uppercase">
          Ready to connect
        </p>

        <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white">
          Si tu idea necesita claridad, ritmo y corazón… ya sabes dónde encontrarme.
        </h2>

        <p className="mt-5 text-white/70 max-w-2xl mx-auto">
          Cuéntame qué estás construyendo y te respondo con un plan claro, sin rodeos.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#contacto"
            className="px-7 py-3 rounded-md bg-lime-400 text-black font-medium hover:bg-lime-300 transition"
          >
            Iniciar conversación →
          </a>
        </div>

        <p className="mt-6 text-xs text-white/40">
          MODULE · CONTACT PROTOCOL
        </p>
      </div>
    </Section>
  );
}
