import Section from "./Section";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqqzvro"; 

export default function Contact() {
  return (
    <Section className="py-24 bg-neutral-black-900">
      <div
        id="contacto"
        className="rounded-2xl border border-neutral-white/10 bg-neutral-black-800/40 p-10"
      >
        <p className="text-neutral-white/50 text-sm tracking-widest uppercase">
          Contact
        </p>

        <h2 className="mt-4 text-heading-lg font-display uppercase text-neutral-white">
          Hagamos match: tú traes la idea, yo la convierto en experiencia.
        </h2>

        <p className="mt-5 text-body-md text-neutral-white/70 max-w-2xl">
          Escríbeme y te respondo con claridad: alcance, tiempos y siguientes pasos.
        </p>

        <form
          action={FORMSPREE_ENDPOINT}
          method="POST"
          className="mt-10 grid gap-4 max-w-2xl"
        >
          {/* Honeypot field to prevent spam bots */}
          <input type="text" name="_gotcha" className="hidden" />

          <div className="grid gap-2">
            <label className="text-label-sm uppercase text-neutral-white/60">
              Tu nombre
            </label>
            <input
              name="name"
              required
              className="w-full rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white outline-none focus:border-accent-lilac/60"
              placeholder="Memo del futuro cliente 😌"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-label-sm uppercase text-neutral-white/60">
              Tu correo
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white outline-none focus:border-accent-lilac/60"
              placeholder="tu@email.com"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-label-sm uppercase text-neutral-white/60">
              Mensaje
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white outline-none focus:border-accent-lilac/60"
              placeholder="Qué estás construyendo y qué necesitas de mí…"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-fit items-center justify-center rounded-md bg-accent-lilac px-7 py-3 font-medium text-neutral-white hover:opacity-90 transition"
          >
            Enviar mensaje →
          </button>

          <p className="text-xs text-neutral-white/40">
            MODULE · CONTACT CHANNEL · Formspree
          </p>
        </form>
      </div>
    </Section>
  );
}
