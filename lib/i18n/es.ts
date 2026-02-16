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
  contact: {
    kicker: "CONTACTO",
    headline: "Hagamos match: tú traes la idea, yo la convierto en experiencia.",
    body: "Escríbeme y te respondo con claridad: alcance, tiempos y siguientes pasos.",

    success: {
      title: "Listo ✅ Ya me llegó tu mensaje. Te escribo pronto 💝",
      body: "Si quieres, puedes seguir explorando o enviar otro mensaje.",
      primaryBtn: "Seguir explorando",
      secondaryBtn: "Enviar otro mensaje",
    },

    error: {
      titlePrefix: "Algo falló 😅 Intenta otra vez o escríbeme directo por email:",
      backBtn: "Volver a donde estaba",
      exploreBtn: "Seguir explorando",
      retryBtn: "Reintentar aquí",
    },

    form: {
      nameLabel: "Tu nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Tu correo",
      emailPlaceholder: "tu@email.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Qué estás construyendo y qué necesitas de mí…",
      helper: "No tiene que estar perfecto. Escríbelo como lo tengas en la cabeza.",
      sending: "Enviando…",
      submit: "Enviar mensaje →",
      footer: "MODULE · CONTACT CHANNEL",
    },
  },
  footer: {
    brand: "GUIGOLO",
    tagline: "Diseño con intención. Sistema con claridad. Experiencias que se sienten.",
    missionsLabel: "MISIONES",
    missionsCta: "VER",
    nav: {
      projects: "Proyectos",
      contact: "Contacto",
      top: "Arriba",
    },
    copyrightSuffix: "GUIGOLO · MODULE · FOOTER SIGNAL",
  },
  whatIsGuigolo: {
    meta: {
      title: "¿Qué es Guigolo? | Marca, significado y origen",
      description:
        "Guigolo no es gigoló. Es la marca personal de Guillermo González López. Descubre el origen del nombre, por qué no lleva acento y qué representa.",
      ogTitle: "¿Qué es Guigolo?",
      ogDescription:
        "Guigolo no es gigoló. Es una marca personal nacida de un nombre propio.",
    },

    backToHome: "Volver al inicio",

    heroTitle: "Guigolo no es gigoló.",
    heroSubtitle:
      "Es una marca personal. Es una firma. Es un nombre que parece otra cosa… hasta que lo entiendes.",

    intro: [
      "Lo voy a decir primero, sin rodeos: Guigolo no es gigoló. No es una provocación sexual, no es un chiste interno, no es una estrategia polémica. Es mi nombre convertido en identidad.",
      "Mi nombre es Guillermo González López. Tres palabras largas. Tres sonidos fuertes. Tres sílabas que, sin planearlo demasiado, empezaron a unirse: Gui – Go – Lo. Y de pronto, ahí estaba. Guigolo.",
      "No nació en una agencia. No fue resultado de un focus group. Fue una síntesis natural. Una firma escondida dentro del propio nombre.",
    ],

    confusionTitle: "La confusión (inevitable)",
    confusion: [
      "“Gigoló” viene del francés y en español lleva acento en la última sílaba. Es un término cultural con significado propio. Guigolo no es eso. Tiene una letra más. Tiene otra raíz. Tiene otra intención.",
      "Donde uno es un sustantivo heredado, el otro es una palabra creada. Una cosa es un término. La otra es una identidad.",
    ],

    accentTitle: "El acento que decidí quitar",
    accent: [
      "Mi apellido es López. Con acento. Correctamente escrito. Y lo respeto así.",
      "Pero cuando construí el dominio, entendí algo práctico: los navegadores no manejan bien los acentos en URLs. Se transforman en caracteres extraños, se escriben mal, se olvidan.",
      "Así que tomé una decisión consciente: Guigolo no llevaría acento. No por ignorancia lingüística, sino por claridad digital.",
      "En branding, a veces la pureza tipográfica cede ante la usabilidad. En internet, la simplicidad gana.",
    ],

    reclaimTitle: "De fricción a identidad",
    reclaim: [
      "Pude haber cambiado el nombre para evitar la duda. Pero las marcas interesantes no nacen perfectas. Nacen con conversación.",
      "Si alguien duda, lo explico. Si alguien pregunta, cuento la historia. Y en ese pequeño momento incómodo, la palabra deja de ser ruido y se convierte en narrativa.",
      "Eso también es diseño.",
    ],

    systemTitle: "Más que un nombre",
    system: [
      "Guigolo no es solo una combinación de sílabas. Es un sistema. Tipografía. Ritmo. Espacio. Contraste. Intención.",
      "Si te interesa ver cómo se construye esa identidad visual, puedes explorarlo aquí:",
    ],
    brandbookHref: "/brandbook",
    brandbookCta: "Ver brandbook →",

    human: [
      "Y detrás del nombre hay alguien. Alguien que ajusta interlineados como si fueran notas musicales. Que cree que una interfaz puede ser clara sin dejar de ser cálida.",
      "Si quieres conocer esa parte más personal:",
    ],
    aboutCta: "Ver sobre mí →",

    summaryTitle: "Entonces, ¿qué es Guigolo?",
    summaryBullets: [
      "No es gigoló.",
      "Viene de Guillermo González López.",
      "No lleva acento por claridad digital.",
      "Es una marca personal de diseño.",
    ],

    feedback: {
      question: "¿Qué sentiste la primera vez que leíste “Guigolo”?",
      thanks: "Gracias por tu reacción ✨",
      options: [
        { id: "confused", label: "Me confundió", emoji: "😵‍💫" },
        { id: "intrigued", label: "Me intrigó", emoji: "👀" },
        { id: "smiled", label: "Me hizo sonreír", emoji: "😄" },
        { id: "clear", label: "Lo entendí rápido", emoji: "⚡️" },
      ] as const,

    },
  },
  notFound: {
    illustrationAlt: "Ilustración de página no encontrada",
    kicker: "ERROR 404",
    title: "Esta página no existe",
    body: "Puede que el link esté mal, que la página se haya movido, o que el internet te esté jugando chueco. No pasa nada: te regreso al camino.",
    primaryCta: "Volver al inicio",
    secondaryCta: "Contacto",
    helpLine1: "Si llegaste aquí desde un link dentro del sitio, avísame y lo arreglo.",
    helpLine2: "Tip: si estabas buscando un proyecto, vuelve al inicio y entra a “Proyectos”.",
  },



};
