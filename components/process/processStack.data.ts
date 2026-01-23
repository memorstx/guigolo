export type ProcessCard = {
  id: string;
  phase: string;      // ej: "PHASE_01"
  title: string;      // ej: "CONTEXTO"
  body: string;       // párrafo principal
  output?: string;    // ej: "Output: ..."
};

export const PROCESS_STACK: ProcessCard[] = [
  {
    id: "phase-01",
    phase: "PHASE_01",
    title: "CONTEXTO",
    body:
      "Primero te escucho. Quiero entender tu idea, qué buscas lograr y para quién es. Aquí vemos si hacemos buen equipo y dejamos claro qué sí y qué no desde el inicio.",
    output: "Output: claridad total y expectativas alineadas.",
  },
  {
    id: "phase-02",
    phase: "PHASE_02",
    title: "CONEXIÓN",
    body:
      "Hago las preguntas necesarias para bajar tu idea a algo concreto. Traducimos lo que necesitas en objetivos claros y prioridades reales.",
    output: "Output: objetivos definidos y próximos pasos claros.",
  },
  {
    id: "phase-03",
    phase: "PHASE_03",
    title: "ESTRATEGIA",
    body:
      "Con la información clara, armo un plan. Definimos qué se va a hacer, cómo, en cuánto tiempo y con qué entregables. Sin sorpresas después.",
    output: "Output: roadmap claro y propuesta bien definida.",
  },
  {
    id: "phase-04",
    phase: "PHASE_04",
    title: "CONSTRUCCIÓN",
    body:
      "Diseño, pruebo y ajusto cada parte del proyecto. Te mantengo al tanto para que siempre sepas qué se está haciendo y por qué.",
    output: "Output: diseño funcional, probado y bien pensado.",
  },
  {
    id: "phase-05",
    phase: "PHASE_05",
    title: "ENTREGA",
    body:
      "Antes de entregar, reviso cada detalle. Te dejo todo listo para usar: archivos, documentación y soporte inicial si lo necesitas.",
    output: "Output: producto listo para usarse y crecer.",
  },
];
