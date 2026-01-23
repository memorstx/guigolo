export type FAQItem = {
  id: string;
  q: string;
  a: string;
};

export const FAQS: FAQItem[] = [
  {
    id: "servicios",
    q: "¿QUÉ HACES EXACTAMENTE?",
    a: "Te ayudo a diseñar tu sitio web o aplicación para que la gente lo entienda, lo use sin frustrarse y tenga ganas de seguir ahí. No solo se ve bonito: se siente claro. Si lo necesitas, también puedo ayudarte a llevar ese diseño a algo que ya funcione en la vida real."
  },
  {
    id: "empresas",
    q: "¿CON QUIÉN TRABAJAS?",
    a: "Trabajo con personas y equipos que tienen una idea, producto o negocio y quieren ordenarlo mejor. Puede ser un emprendimiento, una startup o un equipo dentro de una empresa. No importa el tamaño: importa que el proyecto sea real."
  },
  {
    id: "costo",
    q: "¿CUÁNTO CUESTA TRABAJAR CONTIGO?",
    a: "Depende de lo que necesites y del tamaño del proyecto. Primero platicamos bien qué quieres lograr y qué se va a hacer. Con eso te doy un rango claro. Si no te conviene o no es el momento, te lo digo directo."
  },
  {
    id: "pago",
    q: "¿CÓMO SE REALIZA EL PAGO?",
    a: "Normalmente se empieza con un anticipo y el resto se paga conforme avanzamos. En proyectos más grandes se divide por etapas, para que siempre veas resultados antes de seguir."
  },
  {
    id: "tiempo",
    q: "¿CUÁNTO TIEMPO TARDA UN PROYECTO?",
    a: "Depende de qué tan grande sea y de qué tan rápido podamos revisar avances juntos. Algunos trabajos pueden tomar una o dos semanas; proyectos más completos suelen tardar entre tres y seis semanas. Todo se acuerda desde el inicio."
  }
];
