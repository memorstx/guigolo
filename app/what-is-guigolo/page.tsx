import type { Metadata } from "next";
import Link from "next/link";
import FeedbackButtons from "@/components/FeedbackButtons";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "What is Guigolo? | Marca, significado y origen",
  description:
    "Guigolo no es gigoló. Es la marca personal de Guillermo González López. Descubre el origen del nombre, por qué no lleva acento y qué representa.",
  openGraph: {
    title: "What is Guigolo?",
    description:
      "Guigolo no es gigoló. Es una marca personal nacida de un nombre propio.",
    url: "https://guigolo.com/what-is-guigolo",
    siteName: "Guigolo",
    type: "article",
  },
};

export default function WhatIsGuigoloPage() {
  return (
    <>
    <Navbar />
    <main className="bg-neutral-black-900 text-neutral-white">
      <article className="mx-auto max-w-[820px] px-6 md:px-12 lg:px-0 py-24 space-y-16 leading-relaxed">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-white/50 hover:text-neutral-white transition group"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Volver al inicio
        </Link>

        {/* HERO */}
        <header className="space-y-6">
          <h1 className="heading-h2">
            Guigolo no es gigoló.
          </h1>
          <p className="text-neutral-white/70 text-lg">
            Es una marca personal. Es una firma. Es un nombre que parece otra
            cosa… hasta que lo entiendes.
          </p>
        </header>

        {/* CUERPO */}
        <section className="space-y-6 text-neutral-white/75 text-[16px] font-light">
          <p>
            Lo voy a decir primero, sin rodeos: Guigolo no es gigoló. No es una
            provocación sexual, no es un chiste interno, no es una estrategia
            polémica. Es mi nombre convertido en identidad.
          </p>

          <p>
            Mi nombre es Guillermo González López. Tres palabras largas. Tres
            sonidos fuertes. Tres sílabas que, sin planearlo demasiado,
            empezaron a unirse: Gui – Go – Lo. Y de pronto, ahí estaba.
            Guigolo.
          </p>

          <p>
            No nació en una agencia. No fue resultado de un focus group. Fue
            una síntesis natural. Una firma escondida dentro del propio nombre.
          </p>
        </section>

        {/* CONFUSIÓN */}
        <section className="space-y-6 text-neutral-white/75 font-light">
          <h2 className="text-xl font-semibold tracking-tight">
            La confusión (inevitable)
          </h2>

          <p>
            “Gigoló” viene del francés y en español lleva acento en la última
            sílaba. Es un término cultural con significado propio. Guigolo no
            es eso. Tiene una letra más. Tiene otra raíz. Tiene otra intención.
          </p>

          <p>
            Donde uno es un sustantivo heredado, el otro es una palabra creada.
            Una cosa es un término. La otra es una identidad.
          </p>
        </section>

        {/* ACENTO */}
        <section className="space-y-6 text-neutral-white/75 font-light">
          <h2 className="text-xl font-semibold tracking-tight">
            El acento que decidí quitar
          </h2>

          <p>
            Mi apellido es López. Con acento. Correctamente escrito. Y lo
            respeto así.
          </p>

          <p>
            Pero cuando construí el dominio, entendí algo práctico: los
            navegadores no manejan bien los acentos en URLs. Se transforman en
            caracteres extraños, se escriben mal, se olvidan.
          </p>

          <p>
            Así que tomé una decisión consciente: Guigolo no llevaría acento.
            No por ignorancia lingüística, sino por claridad digital.
          </p>

          <p>
            En branding, a veces la pureza tipográfica cede ante la usabilidad.
            En internet, la simplicidad gana.
          </p>
        </section>

        {/* REAPROPIACIÓN */}
        <section className="space-y-6 text-neutral-white/75 font-light">
          <h2 className="text-xl font-semibold tracking-tight">
            De fricción a identidad
          </h2>

          <p>
            Pude haber cambiado el nombre para evitar la duda. Pero las marcas
            interesantes no nacen perfectas. Nacen con conversación.
          </p>

          <p>
            Si alguien duda, lo explico. Si alguien pregunta, cuento la
            historia. Y en ese pequeño momento incómodo, la palabra deja de ser
            ruido y se convierte en narrativa.
          </p>

          <p>
            Eso también es diseño.
          </p>
        </section>

        {/* SISTEMA */}
        <section className="space-y-6 text-neutral-white/75 font-light">
          <h2 className="text-xl font-semibold tracking-tight">
            Más que un nombre
          </h2>

          <p>
            Guigolo no es solo una combinación de sílabas. Es un sistema.
            Tipografía. Ritmo. Espacio. Contraste. Intención.
          </p>

          <p>
            Si te interesa ver cómo se construye esa identidad visual, puedes
            explorarlo aquí:
          </p>

          <p>
            <Link
              href="/brandbook"
              className="text-accent-lime hover:underline"
            >
              Ver brandbook →
            </Link>
          </p>
        </section>

        {/* HUMANO */}
        <section className="space-y-6 text-neutral-white/75 font-light">
          <p>
            Y detrás del nombre hay alguien. Alguien que ajusta interlineados
            como si fueran notas musicales. Que cree que una interfaz puede ser
            clara sin dejar de ser cálida.
          </p>

          <p>
            Si quieres conocer esa parte más personal:
          </p>

          <p>
            <Link
              href="/#about"
              className="text-accent-lime hover:underline"
            >
              Ver sobre mí →
            </Link>
          </p>
        </section>

        {/* RESUMEN */}
        <section className="space-y-4 text-neutral-white/70 border-t border-neutral-white/10 pt-12 font-bold">
          <p>
            Entonces, ¿qué es Guigolo?
          </p>
          <ul className="list-disc list-inside space-y-2 font-light">
            <li>No es gigoló.</li>
            <li>Viene de Guillermo González López.</li>
            <li>No lleva acento por claridad digital.</li>
            <li>Es una marca personal de diseño.</li>
          </ul>
        </section>

        {/* MICRO FEEDBACK */}
        <section className="space-y-6 pt-12 border-t border-neutral-white/10 font-light">
          <h2 className="text-lg font-semibold">
            ¿Qué sentiste la primera vez que leíste “Guigolo”?
          </h2>

          <FeedbackButtons />
        </section>
      </article>
    </main>
    </>
  );
}
