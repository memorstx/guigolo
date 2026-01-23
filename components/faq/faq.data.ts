export type FAQItem = {
  id: string;
  q: string;
  a: string;
};

export const FAQS: FAQItem[] = [
  {
    id: "servicios",
    q: "¿QUÉ SERVICIOS TE OFREZCO EXACTAMENTE?",
    a: "Diseño de pantallas para tu proyecto web o aplicación móvil, además de llevarlos a producción en caso de que lo necesites. Adicionalmente te ofrezco servicios de consultoría durante el proceso de diseño.",
  },
  {
    id: "empresas",
    q: "¿CON QUÉ EMPRESAS TRABAJAS?",
    a: "Trabajo con emprendedores, startups y equipos dentro de empresas que necesitan mejorar UX/UI, claridad del producto y conversión. Si tienes un proyecto real, lo podemos aterrizar aunque tu equipo sea pequeño.",
  },
  {
    id: "costo",
    q: "¿CUÁNTO CUESTA UN PROYECTO?",
    a: "Depende del alcance (pantallas, flujo, research, UI kit, handoff). Primero definimos objetivos y entregables, y después te paso un rango claro. Sin humo: si no te conviene, te lo digo.",
  },
  {
    id: "pago",
    q: "¿CUÁLES SON LAS CONDICIONES DE PAGO PARA UN PROYECTO?",
    a: "Normalmente trabajo con anticipo para iniciar y pagos por hitos. Si el proyecto es grande, se divide por fases para que siempre estés viendo avance real.",
  },
  {
    id: "tiempo",
    q: "¿CUÁNTO TIEMPO TARDA UN PROYECTO?",
    a: "Depende del tamaño y de qué tan rápido tengamos feedback. Un sprint de diseño puede ser de 1 a 2 semanas; un proyecto completo, de 3 a 6 semanas. Se define con calendario desde el inicio.",
  },
];
