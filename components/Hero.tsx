import Section from "./Section";

export default function Hero() {
  return (
    <Section className="min-h-screen flex items-center bg-neutral-black-900">
      <div className="w-full text-center">
        <h1 className="font-display text-heading-xl uppercase text-white-100">
          <span className="text-accent-lime">La conexión real</span>{" "}
          empieza donde termina lo estético.
        </h1>

        <p className="mt-6 text-body-lg text-white/70">
          Diseño interfaces claras, sensibles y humanas para productos digitales reales.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-md bg-accent-lime text-neutral-black-900 font-medium hover:bg-lime-300 transition">
            Sí, eso quiero
          </button>

          <a
            href="#projects"
            className="px-6 py-3 rounded-md border border-neutral-white/30 text-neutral-white hover:border-white hover:text-white transition text-center">
            Ver proyecto
          </a>

        </div>
      </div>
    </Section>
  );
}
