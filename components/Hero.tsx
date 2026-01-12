export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-black">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
          <span className="text-lime-400">La conexión real</span>{" "}
          empieza donde termina lo estético.
        </h1>

        <p className="mt-6 text-lg text-white/70">
          Diseño interfaces claras, sensibles y humanas para productos digitales reales.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-md bg-lime-400 text-black font-medium hover:bg-lime-300 transition">
            Sí, eso quiero
          </button>

          <button className="px-6 py-3 rounded-md border border-white/30 text-white hover:border-white transition">
            Ver proyectos
          </button>
        </div>
      </div>
    </section>
  );
}
