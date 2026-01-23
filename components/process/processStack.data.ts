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
      "Escucho tu idea, tus objetivos y a tus usuarios. Aquí defino si soy la persona correcta para tu proyecto y alineamos expectativas desde el inicio.",
    output: "Output: claridad, enfoque y dirección real.",
  },
  {
    id: "phase-02",
    phase: "PHASE_02",
    title: "TÍTULO 2",
    body:
      "Escucho tu idea, tus objetivos y a tus usuarios. Aquí defino si soy la persona correcta para tu proyecto y alineamos expectativas desde el inicio.",
    output: "Output: claridad, enfoque y dirección real.",
  },
  {
    id: "phase-03",
    phase: "PHASE_03",
    title: "TÍTULO 3",
    body:
      "Escucho tu idea, tus objetivos y a tus usuarios. Aquí defino si soy la persona correcta para tu proyecto y alineamos expectativas desde el inicio.",
    output: "Output: claridad, enfoque y dirección real.",
  },
  {
    id: "phase-04",
    phase: "PHASE_04",
    title: "TÍTULO 4",
    body:
      "Escucho tu idea, tus objetivos y a tus usuarios. Aquí defino si soy la persona correcta para tu proyecto y alineamos expectativas desde el inicio.",
    output: "Output: claridad, enfoque y dirección real.",
  },
];
