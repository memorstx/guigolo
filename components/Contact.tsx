import Section from "./Section";

const EMAIL = "tucorreo@ejemplo.com"; // ← CAMBIA ESTO por tu correo real

export default function Contact() {
  return (
    <Section className="py-24 bg-black">
      <div id="contacto" className="rounded-2xl border border-white/10 bg-white/5 p-10">
        <p className="text-white/50 text-sm tracking-widest uppercase">
          Contact
        </p>

        <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-white">
          Hagamos match: tú traes la idea, yo la convierto en experiencia.
        </h2>

        <p className="mt-5 text-white/70 max-w-2xl">
          Escríbeme y te respondo con claridad: alcance, tiempos y siguientes pasos.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center">
          <a
            href={`mailto:${EMAIL}`}
            className="px-7 py-3 rounded-md bg-lime-400 text-black font-medium hover:bg-lime-300 transition text-center"
          >
            Enviar email →
          </a>

          <div className="rounded-md border border-white/10 bg-black/40 px-5 py-3 text-white/80">
            {EMAIL}
          </div>
        </div>

        <p className="mt-6 text-xs text-white/40">
          MODULE · CONTACT CHANNEL
        </p>
      </div>
    </Section>
  );
}
