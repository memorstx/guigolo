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
      "Te escucho para entender tu idea, qué quieres lograr y para quién es. Aquí definimos si hacemos buen equipo y dejamos claras las expectativas desde el inicio.",
    output: "Output: claridad y punto de partida definido.",
  },
  {
    id: "phase-02",
    phase: "PHASE_02",
    title: "CONEXIÓN",
    body:
      "Tomo todo lo que me compartiste y lo traduzco en objetivos claros. Aterrizamos el problema real que vamos a resolver.",
    output: "Output: objetivos claros y problema bien definido.",
  },
  {
    id: "phase-03",
    phase: "PHASE_03",
    title: "ESTRATEGIA",
    body:
      "Con el problema claro, defino el camino. Decidimos qué se va a hacer, qué no, y cómo vamos a llegar al resultado.",
    output: "Output: plan claro y decisiones bien tomadas.",
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
      "Reviso cada detalle antes de entregar. Te dejo todo listo para usar, con archivos, documentación y soporte inicial.",
    output: "Output: producto listo para usarse y crecer.",
  },
];
