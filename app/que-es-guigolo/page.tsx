// app/que-es-guigolo/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

import NavbarSecondary from "@/components/NavbarSecondary";
import FAQSection from "@/components/Faq";
import IllustrationSlot from "@/components/ui/IllustrationSlot";
import BlueprintCard from "@/components/ui/BlueprintCard";
import { QUE_ES_GUIGOLO_FAQS } from "@/components/faq/que-es-guigolo.faq.data";


export const metadata: Metadata = {
  title: "¿Qué es Guigolo?",
  description:
    "Guigolo no es gigoló. Es la marca de Guillermo González López: UX/UI y web con intención. Guigolo / Gigolo / Gigoló, explicado claro, humano y sin drama.",
  alternates: {
    canonical: "https://guigolo.com/que-es-guigolo",
  },
  openGraph: {
    title: "¿Qué es Guigolo? (y por qué no es gigoló)",
    description:
      "Storytelling + desambiguación: Guigolo (marca) vs gigoló (término). UX/UI y web con sensibilidad y precisión.",
    url: "https://guigolo.com/que-es-guigolo",
    siteName: "Guigolo",
    images: [
      {
        url: "/og/cover-social.png",
        width: 1200,
        height: 630,
        alt: "Guigolo · ¿Qué es Guigolo?",
      },
    ],
    locale: "es_MX",
    type: "article",
  },
};

export default function QueEsGuigoloPage() {
  return (
    <main className="bg-neutral-black-900">
      <NavbarSecondary
        items={[
          { href: "/", label: "INICIO" },
          { href: "#confusion", label: "LA CONFUSIÓN" },
          { href: "#origen", label: "ORIGEN" },
          { href: "#que-hago", label: "QUÉ HAGO" },
          { href: "#proceso", label: "CÓMO PIENSO" },
          { href: "#contacto", label: "CONTACTO" },
        ]}
      />

      {/* HERO */}
      <section id="top" className="relative w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-14">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div>
              <div className="text-[12px] tracking-[0.35em] text-accent-lime/80">
                QUE ES GUIGOLO
              </div>

              <h1 className="mt-4 font-semibold tracking-tight leading-[1.06] text-neutral-white text-[clamp(1.75rem,4.2vw,4rem)]">
                <span className="text-gradient-anim">GUIGOLO</span> no es{" "}
                <span className="text-neutral-white/70">gigoló</span>.
              </h1>

              <p className="mt-5 text-neutral-white/70 leading-relaxed text-[clamp(1rem,1.15vw,1.15rem)] max-w-[58ch]">
                Es mi marca como diseñador UX/UI y web: romance-tech, claridad y decisiones con intención.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/#services"
                  className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)]"
                  aria-label="Ver servicios en la página principal"
                >
                  Ver servicios
                </Link>

                <Link
                  href="#contacto"
                  className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition"
                  aria-label="Ir a contacto"
                >
                  Contactar
                </Link>
              </div>

              <div className="mt-8 text-[12px] tracking-[0.28em] text-neutral-white/35">
                Pronunciación: <span className="text-neutral-white/60">gui-go-lo</span>.
              </div>
            </div>

            <div>
              <IllustrationSlot
                title="ILUSTRACIÓN / BLOQUE VISUAL"
                subtitle="[PONER_AQUI] escena cute-cyber para desambiguación"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LA CONFUSIÓN */}
      <section id="confusion" className="relative w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-14 md:py-16">
          <Header
            kicker="LA CONFUSIÓN"
            title="Sí, lo sé. Suena raro."
            desc="Y no estás mal: existe “gigoló”. Pero Guigolo es otra cosa."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <BlueprintCard
              chip="EN CRISTAL"
              title="La palabra existe"
              desc="“Gigoló” se entiende con una connotación sexual. Cero es mi tema."
              watermark="GIGOLÓ"
            />
            <BlueprintCard
              chip="SIN DRAMA"
              title="La gente pregunta"
              desc="Y está bien. Prefiero aclararlo directo a que se quede flotando incómodo."
              watermark="¿?"
            />
            <BlueprintCard
              chip="REENCADRE"
              title="Lo convierto en señal"
              desc="Si notas el detalle, ya conectaste con mi forma de pensar: intención primero."
              watermark="SIGNAL"
            />
          </div>
        </div>
      </section>

      {/* ORIGEN */}
      <section id="origen" className="relative w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-14 md:py-16">
          <Header
            kicker="ORIGEN DEL NOMBRE"
            title="Guillermo González López → Guigolo"
            desc="No fue un truco. Fue una firma compacta."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
            <BlueprintCard
              chip="ETIMOLOGÍA CASERA"
              title="Tres sílabas, una entidad"
              desc="Tomo el inicio de mi nombre y apellidos. Suena futurista, se recuerda fácil, y ya me pertenece."
              watermark="GUI-GO-LO"
            />
            <BlueprintCard
              chip="REGLA"
              title="Cómo se escribe"
              desc="Guigolo (con “u”). Si ves “Gigolo” sin u, es otra cosa."
              watermark="U"
            />
          </div>
        </div>
      </section>

      {/* REAPROPIACIÓN */}
      <section id="reapropiacion" className="relative w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-14 md:py-16">
          <Header
            kicker="REAPROPIACIÓN"
            title="Lo raro se vuelve marca"
            desc="No escondo el tema: lo convierto en historia y claridad."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <BlueprintCard
              chip="POSICIONAMIENTO"
              title="Diseño que siente"
              desc="Si mi marca te hace pausar, mi trabajo también: pero con intención, no con ruido."
              watermark="FEEL"
            />
            <BlueprintCard
              chip="PROMESA"
              title="Claridad sin perder alma"
              desc="Interfaces que se entienden al escaneo, y se quedan por cómo te tratan."
              watermark="CLARITY"
            />
          </div>
        </div>
      </section>

      {/* QUÉ HAGO */}
      <section id="que-hago" className="relative w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-14 md:py-16">
          <Header
            kicker="QUÉ HAGO"
            title="Diseño productos digitales con nervio y estructura"
            desc="No es “hacer pantallas bonitas”. Es convertir intención en experiencia usable."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <BlueprintCard
              chip="UX/UI"
              title="Experiencias claras"
              desc="Mapeo decisiones, reduzco fricción y diseño flujos que no te sueltan."
              watermark="UX"
            />
            <BlueprintCard
              chip="UI SYSTEM"
              title="Sistemas consistentes"
              desc="Componentes, tokens y reglas para que tu producto crezca sin romperse."
              watermark="UI"
            />
            <BlueprintCard
              chip="WEB"
              title="Producción real"
              desc="Si hace falta, lo llevo a código con performance, accesibilidad y orden."
              watermark="SHIP"
            />
          </div>
        </div>
      </section>

      {/* CÓMO PIENSO / PROCESO */}
      <section id="proceso" className="relative w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-14 md:py-16">
          <Header
            kicker="CÓMO PIENSO"
            title="Investigo, decido, pruebo, y documento"
            desc="Lo romántico vive en el detalle. Lo profesional, en el método."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-4">
            <StepCard n="01" title="Contexto" desc="[PONER_AQUI] objetivo, usuario, restricciones, negocio." />
            <StepCard n="02" title="Arquitectura" desc="[PONER_AQUI] flujos, jerarquía, contenido, decisiones." />
            <StepCard n="03" title="Interfaz" desc="[PONER_AQUI] sistema visual, componentes, estados." />
            <StepCard n="04" title="Entrega" desc="[PONER_AQUI] handoff, docs, checklist, próximos pasos." />
          </div>
        </div>
      </section>

      {/* LOGO MINI CASE */}
      <section id="logo" className="relative w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-14 md:py-16">
          <Header
            kicker="MINI CASE"
            title="Cómo hice mi logo"
            desc="Un logo no es dibujo. Es una decisión que se sostiene en contextos reales."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <IllustrationSlot
              title="[PONER_AQUI] logo / isotipo"
              subtitle="Exporta una imagen o SVG y colócalo aquí"
            />

            <div className="grid gap-6">
              <BlueprintCard
                chip="OBJETIVO"
                title="Recordable en 1 segundo"
                desc="[PONER_AQUI] qué debía comunicar: futuro tierno, precisión, calidez, tech."
                watermark="GOAL"
              />
              <BlueprintCard
                chip="REGLAS"
                title="Que sobreviva al mundo"
                desc="[PONER_AQUI] legible en tamaños chicos, funciona en oscuro, y no depende del color."
                watermark="RULES"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GUSTOS / OBSESIONES */}
      <section id="gustos" className="relative w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-14 md:py-16">
          <Header
            kicker="HUMANO"
            title="Gustos, obsesiones y combustible"
            desc="Porque sí: también diseño con café y curiosidad."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <BulletCard
              title="Me enciende"
              items={["UI limpia con intención", "Micro-interacciones con sentido", "Sistemas de diseño", "Historias que se sienten"]}
              watermark="SPARK"
            />
            <BulletCard
              title="Me calma"
              items={["Café", "Gatos", "Ritmo visual", "Orden que se nota sin gritar"]}
              watermark="CALM"
            />
            <BulletCard
              title="Me obsesiona"
              items={["Claridad al escaneo", "Accesibilidad real", "Performance", "Detalles “blueprint”"]}
              watermark="FOCUS"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={QUE_ES_GUIGOLO_FAQS} defaultOpenId="no-es-gigolo" />

      {/* CIERRE + CTA */}
      <section id="contacto" className="relative w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-16 md:py-20">
          <div className="relative overflow-hidden border border-dashed border-neutral-white/15 bg-neutral-black-900/35 p-10 md:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-70 about-chip" />

            <div className="relative">
              <div className="text-[12px] tracking-[0.35em] text-accent-lime/80">
                RESUMEN
              </div>

              <h2 className="mt-4 heading-h2 tracking-tight text-left">
                Guigolo es mi forma de diseñar: humano, preciso y con intención.
              </h2>

              <p className="mt-5 text-neutral-white/70 leading-relaxed max-w-[75ch]">
                Si llegaste hasta aquí, ya hicimos lo más difícil: aclarar el nombre y conectar la vibra.
                Lo demás es diseño.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/#services"
                  className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium"
                  aria-label="Ver servicios en la página principal"
                >
                  Ver servicios
                </Link>

                <Link
                  href="/#contacto"
                  className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition"
                  aria-label="Ir a contacto en la página principal"
                >
                  Ir a contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Header({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <header className="text-center">
      <div className="text-[12px] tracking-[0.35em] text-accent-lime/80">
        {kicker}
      </div>
      <h2 className="mt-4 heading-h2 tracking-tight">{title}</h2>
      {desc ? (
        <p className="mt-4 mx-auto max-w-[70ch] text-neutral-white/70 leading-relaxed text-[clamp(1rem,1.1vw,1.15rem)]">
          {desc}
        </p>
      ) : null}
    </header>
  );
}

function StepCard({ n, title, desc }: { n: string; title: string; desc: string }) {
  return (
    <div className="relative overflow-hidden border border-dashed border-neutral-white/15 bg-neutral-black-900/35 p-7">
      <div className="pointer-events-none absolute inset-0 opacity-70 about-chip" />
      <div className="relative">
        <div className="text-[12px] tracking-[0.28em] text-neutral-white/40">{n}</div>
        <div className="mt-3 font-semibold tracking-widest text-neutral-white/90">
          {title}
        </div>
        <p className="mt-3 text-neutral-white/70 text-[13px] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

function BulletCard({
  title,
  items,
  watermark,
}: {
  title: string;
  items: string[];
  watermark: string;
}) {
  return (
    <div className="relative overflow-hidden border border-dashed border-neutral-white/15 bg-neutral-black-900/35 p-8">
      <div className="pointer-events-none absolute inset-0 opacity-70 about-chip" />
      <div className="pointer-events-none absolute -top-2 left-6 select-none text-[44px] font-semibold tracking-[0.08em] text-accent-cyan-10 opacity-25">
        {watermark}
      </div>
      <div className="relative">
        <h3 className="heading-h3 text-neutral-white/90">{title}</h3>
        <ul className="mt-5 space-y-2 text-neutral-white/70 text-[14px] leading-relaxed">
          {items.map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent-lime/80" aria-hidden="true" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
