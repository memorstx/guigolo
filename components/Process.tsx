import Section from "./Section";

const steps = [
  {
    code: "PHASE_01",
    title: "Contexto",
    desc: "Entiendo tu idea, objetivos y usuarios antes de diseñar cualquier pantalla.",
    output: "OUTPUT · enfoque y dirección",
  },
  {
    code: "PHASE_02",
    title: "Conexión",
    desc: "Alineamos visión, prioridades y expectativas para avanzar sin sorpresas.",
    output: "OUTPUT · objetivos claros",
  },
  {
    code: "PHASE_03",
    title: "Estrategia",
    desc: "Defino alcance, ritmo y entregables para diseñar con claridad y control.",
    output: "OUTPUT · roadmap de diseño",
  },
  {
    code: "PHASE_04",
    title: "Construcción",
    desc: "Diseño, itero y documento decisiones manteniendo comunicación constante.",
    output: "OUTPUT · diseño funcional",
  },
  {
    code: "PHASE_05",
    title: "Entrega",
    desc: "Dejo todo listo para producción: handoff, documentación y siguientes pasos.",
    output: "OUTPUT · listo para desarrollar",
  },
];

export default function Process() {
  return (
    <Section className="py-24 bg-black">
      <div className="flex items-end justify-between gap-8">
        <div>
          <p className="text-white/50 text-sm tracking-widest uppercase">
            Workflow
          </p>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-white">
            Así convierto una idea en una experiencia real
          </h2>

          <p className="mt-4 text-white/70 max-w-2xl">
            Un proceso claro, humano y estructurado para evitar fricción desde el primer día.
          </p>
        </div>

        <div className="hidden md:block text-white/30 text-xs">
          MODULE · WORKFLOW PROTOCOL
        </div>
      </div>

      <div className="mt-10 h-px w-full bg-white/10" />

      <div className="mt-10 grid gap-4">
        {steps.map((s) => (
          <div
            key={s.code}
            className="rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div>
                <p className="text-[10px] tracking-widest uppercase text-white/40">
                  {s.code}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-white/70">{s.desc}</p>
              </div>

              <div className="md:text-right">
                <p className="text-xs text-white/40">{s.output}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
