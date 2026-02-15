import { title } from "process";

export const es = {
  nav: {
    home: "Inicio",
    services: "Servicios",
    projects: "Proyectos",
    process: "Proceso",
    about: "Sobre mí",
    faq: "FAQ",
    contact: "Contacto",
  },
  hero: {
    titleAccent: "Diseñador UX/UI",
    titleRest: "que convierte ideas en productos claros",
    body: "Ayudo a startups y emprendedores a diseñar (y si lo necesitas, construir) experiencias rápidas, claras y listas para convertir.",
    ctaContact: "Contactar",
    ctaProjects: "Ver proyectos",
  },
  services: {
    kicker: "Cómo puedo ayudarte",
    headline: "Servicios enfocados en claridad, experiencia y resultados reales.",
    items: {
      design: {
        title: "DISEÑO",
        iconLabel: "DISEÑO",
        description: "Cuando necesitas que algo se vea bien...",
      },
      experiencia: {
        title: "EXPERIENCIA",
        iconLabel: "EXPERIENCIA",
        description: "Cuando las personas se pierden...",
      },
      identidad: {
        title: "IDENTIDAD",
        iconLabel: "IDENTIDAD",
        description: "Cuando tu marca no se siente coherente...",
      },
      interaccion: {
        title: "INTERACCIÓN",
        iconLabel: "INTERACCIÓN",
        description: "Cuando el diseño necesita cobrar vida...",
      },
    },
    cta:{
      title: "¿Quieres saber más?",
      description: "¿No sabes exactamente qué necesitas? No pasa nada: lo aterrizamos juntos.",
      primaryButton: "Ayúdame a definirlo",
      secondaryButton: "No sé, pero quiero ayuda🥹",
    }
  },
  projects: {
    band: "PROYECTOS",
    kicker: "PROYECTOS",
    headline: "Proyectos reales que convierten ideas en producto",
    prev: "ANTERIOR",
    next: "SIGUIENTE",
    ctaBody: "Ok, tu turno. ¿Qué quieres construir?",
    ctaButton: "Hablemos de tu proyecto",

    items: {
      "academia-platform-project": {
        title: "ACADEMIA GLOBAL",
        sector: "EdTech · Rediseño de plataforma educativa",
        description: [
          "Rediseño un campus para que aprender se sienta claro, medible y motivador.",
          "Sistema visual e interacción enfocados en progreso, jerarquía de información y decisiones rápidas."
        ],
        stack: "Figma, HTML5, CSS, JavaScript",
        role: "UI Designer & Web Development",
        linkLabel: "Ver caso"
      },

      "mironline-platform-project": {
        title: "MIRONLINE",
        sector: "EdTech · Plataforma de aprendizaje",
        description: [
          "Experiencia centrada en claridad, estructura y confianza.",
          "Diseño pensado para guiar al usuario sin fricción."
        ],
        stack: "Figma, UI System",
        role: "UI Designer",
        linkLabel: "Ver caso"
      },

      "latiendita-puntodeventa-project": {
        title: "LA TIENDITA",
        sector: "Retail · Punto de venta",
        description: [
          "Interfaz hecha para operar rápido y sin errores.",
          "Jerarquía y flujo pensados para decisiones en segundos."
        ],
        stack: "Figma, UI",
        role: "UI Designer",
        linkLabel: "Ver caso"
      }
    }
  },
  process: {
    kicker: "MI PROCESO",
    title: "ASÍ CONVIERTO UNA IDEA EN UNA EXPERIENCIA REAL",
    items: {
      "phase-01": {
        title: "CONTEXTO",
        body:
          "Te escucho para entender tu idea, qué quieres lograr y para quién es. Aquí definimos si hacemos buen equipo y dejamos claras las expectativas desde el inicio.",
        output: "Output: claridad y punto de partida definido.",
      },
      "phase-02": {
        title: "CONEXIÓN",
        body:
          "Tomo todo lo que me compartiste y lo traduzco en objetivos claros. Aterrizamos el problema real que vamos a resolver.",
        output: "Output: objetivos claros y problema bien definido.",
      },
      "phase-03": {
        title: "ESTRATEGIA",
        body:
          "Con el problema claro, defino el camino. Decidimos qué se va a hacer, qué no, y cómo vamos a llegar al resultado.",
        output: "Output: plan claro y decisiones bien tomadas.",
      },
      "phase-04": {
        title: "CONSTRUCCIÓN",
        body:
          "Diseño, pruebo y ajusto cada parte del proyecto. Te mantengo al tanto para que siempre sepas qué se está haciendo y por qué.",
        output: "Output: diseño funcional, probado y bien pensado.",
      },
      "phase-05": {
        title: "ENTREGA",
        body:
          "Reviso cada detalle antes de entregar. Te dejo todo listo para usar, con archivos, documentación y soporte inicial.",
        output: "Output: producto listo para usarse y crecer.",
      },
    },
  },
  about: {
    header: {
      kicker: "FRAMEWORK DE HABILIDADES",
      headline: "EL NÚCLEO QUE DEFINE MI MANERA DE DISEÑAR",
      body:
        "Soy diseñador UX/UI y transformo sensibilidad y estrategia en interfaces suaves, claras y sencillas para el usuario.",
    },

    cards: {
      personality: {
        chip: "FEELING NODE",
        watermark: "FEELING NODE",
        title: "MI PERSONALIDAD",
        desc:
          "Soy curioso, sensible, empático, entregado, intuitivo, agradecido, detallista, creativo y auténtico.",
      },
      style: {
        chip: "VISUAL FLOW UNIT",
        watermark: "VISUAL FLOW UNIT",
        title: "MI ESTILO",
        desc:
          "Soy coherente, directo, minimalista, expresivo, emocional, ingenioso, observador y propositivo.",
      },
      likes: {
        chip: "HUMAN INPUT FILTER",
        watermark: "HUMAN INPUT FILTER",
        title: "MIS GUSTOS",
        desc:
          "El café, el chocolate, los gatos, los videojuegos, lo romántico y las ideas que nacen en silencio.",
      },
      purpose: {
        chip: "CORE SIGNAL SYNC",
        watermark: "CORE SIGNAL SYNC",
        title: "MI PROPÓSITO",
        desc:
          "Conectar con las emociones de los demás y convertirlas en experiencias únicas.",
      },
      mindset: {
        chip: "SENSE-LAYER v4.2",
        watermark: "SENSE-LAYER v4.2",
        title: "MI MENTALIDAD",
        desc:
          "Consciente, reflexivo, equilibrado, responsable, soñador, perseverante, en construcción constante.",
      },
    },

    value: {
      chip: "VALUE UNIQUE",
      title: "MI PROPUESTA DE VALOR",
      body:
        "Me enfoco en crear productos útiles y estratégicos que impulsen tus resultados desde el primer clic.",
      cta: "CONTACTAR",
    },

    docsSlides: {
      "slide-1": {
        title: "UI KIT + TOKENS",
        desc:
          "Tipografía, colores y escalas listas para implementarse sin perder el vibe.",
        tags: ["Tokens", "UI Kit", "Escalas"],
      },
      "slide-2": {
        title: "RITMO, CLARIDAD Y FLUIDEZ",
        desc:
          "Estructura y consistencia visual para que todo se sienta intencional.",
        tags: ["Grid", "Jerarquía", "Consistencia"],
      },
      "slide-3": {
        title: "DISEÑO HECHO A LA MEDIDA",
        desc:
          "Pantallas y componentes pensados para negocio + usuario, sin relleno.",
        tags: ["UX", "UI", "Producto"],
      },
      "slide-4": {
        title: "PERFORMANCE + A11Y",
        desc:
          "Buenas prácticas listas para que tu sitio cargue bien y se use mejor.",
        tags: ["A11y", "HTML", "Optimización"],
      },
    },
  },
  cta: {
    chip: "LISTO PARA CONSTRUIR",
    headline: "¿TE GUSTARÍA QUE TRABAJÁRAMOS JUNTOS?",
    subcopy: "Si tu negocio fuera un rompecabezas, yo sería la pieza que lo completa.",
    button: "CONTACTAR",
    micro: "RESPUESTA EN 24–48H",
  },
  faq: {
    title: "PREGUNTAS FRECUENTES",
    items: {
      servicios: {
        q: "¿QUÉ HACES EXACTAMENTE?",
        a: "Te ayudo a diseñar tu sitio web o aplicación para que la gente lo entienda, lo use sin frustrarse y tenga ganas de seguir ahí. No solo se ve bonito: se siente claro. Si lo necesitas, también puedo ayudarte a llevar ese diseño a algo que ya funcione en la vida real.",
      },
      empresas: {
        q: "¿CON QUIÉN TRABAJAS?",
        a: "Trabajo con personas y equipos que tienen una idea, producto o negocio y quieren ordenarlo mejor. Puede ser un emprendimiento, una startup o un equipo dentro de una empresa. No importa el tamaño: importa que el proyecto sea real.",
      },
      costo: {
        q: "¿CUÁNTO CUESTA TRABAJAR CONTIGO?",
        a: "Depende de lo que necesites y del tamaño del proyecto. Primero platicamos bien qué quieres lograr y qué se va a hacer. Con eso te doy un rango claro. Si no te conviene o no es el momento, te lo digo directo.",
      },
      pago: {
        q: "¿CÓMO SE REALIZA EL PAGO?",
        a: "Normalmente se empieza con un anticipo y el resto se paga conforme avanzamos. En proyectos más grandes se divide por etapas, para que siempre veas resultados antes de seguir.",
      },
      tiempo: {
        q: "¿CUÁNTO TIEMPO TARDA UN PROYECTO?",
        a: "Depende de qué tan grande sea y de qué tan rápido podamos revisar avances juntos. Algunos trabajos pueden tomar una o dos semanas; proyectos más completos suelen tardar entre tres y seis semanas. Todo se acuerda desde el inicio.",
      },
    },
  },


};
