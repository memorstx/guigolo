export type ProjectItem = {
  id: string;
  companyLogo: string; // /public...
  title: string;
  sector: string;
  description: string[]; // 1–2 párrafos
  image: string; // imagen grande izquierda
  stack: string;
  role: string;
  linkLabel: string;
  linkUrl: string;
  access?: string; // por ahora lo dejamos “inactivo” (texto)
};

export const projects: ProjectItem[] = [
  
  {
    id: "academia-platform-project",
    companyLogo: "/brand/projects/academia-global/logo-ag.png",
    title: "ACADEMIA GLOBAL",
    sector: "Rediseño campus educativo [Edtech sector]",
    description: [
      "Rediseño una plataforma educativa para que aprender se sienta claro, medible y motivador.",
      "Sistema visual y de interacción enfocado en seguimiento académico, comprensión del progreso y toma de decisiones informadas por parte de estudiantes y docentes.",
    ],
    image: "/brand/projects/academia-global/cover_plataforma_educativa.png",
    stack: "Figma, HTML5, CSS, JavaScript",
    role: "UI Designer & Web development",
    linkLabel: "academiaglobal.mx",
    linkUrl: "https://academiaglobal.mx",
    access: "guigolo.com/projects/ag/platform",
  },

  {
    id: "academia-administrator-project",
    companyLogo: "/brand/projects/academia-global/logo-ag.png",
    title: "ACADEMIA GLOBAL",
    sector: "Rediseño Control Escolar [Edtech sector]",
    description: [
      "Rediseño un sistema académico complejo para hacerlo claro, usable y fácil de gestionar.",
      "Interfaz enfocada en organizar procesos escolares, seguimiento académico y toma de decisiones administrativas. El diseño prioriza jerarquía visual, claridad de datos y reducción de carga cognitiva para usuarios con tareas críticas.",
    ],
    image: "/brand/projects/academia-global/cover_administrador.png",
    stack: "Figma, HTML5, CSS, JavaScript",
    role: "UI Designer & Web development",
    linkLabel: "academiaglobal.mx",
    linkUrl: "https://academiaglobal.mx",
    access: "guigolo.com/projects/ag/platform",
  },

  {
    id: "molcajete-landing-mcts-project",
    companyLogo: "/brand/projects/molcajete/logo-molcajete.png",
    title: "MOLCAJETE",
    sector: "Rediseño Landing Page [Health sector]",
    description: [
      "Diseño una experiencia clara y empática para acompañar decisiones importantes sobre salud femenina.",
      "Una landing enfocada en generar confianza desde el primer contacto, priorizando claridad, cercanía y accesibilidad. El diseño busca reducir ansiedad, guiar con suavidad y comunicar profesionalismo sin frialdad médica.",
    ],
    image: "/brand/projects/molcajete/cover_mcts.png",
    stack: "Figma, Astro, Tailwind CSS, JavaScript",
    role: "UI Designer & Web development",
    linkLabel: "molcajete.com",
    linkUrl: "https://molcajete.com",
    access: "guigolo.com/projects/molcajete/mjcts",
  },

  {
    id: "molcajete-landing-ideasid-project",
    companyLogo: "/brand/projects/molcajete/logo-molcajete.png",
    title: "MOLCAJETE",
    sector: "Diseño Landing Page [e-commerce sector]",
    description: [
      "Una interfaz pensada para comunicar valor rápido y convertir visitas en clientes potenciales.",
      "Diseño visual orientado a productos físicos, donde la jerarquía, el ritmo y los llamados a la acción guían la decisión del usuario sin fricción. Claridad primero, estética después.",
    ],
    image: "/brand/projects/molcajete/cover_ideasid.png",
    stack: "Figma, Astro, Tailwind CSS, JavaScript",
    role: "UI Designer & Web development",
    linkLabel: "molcajete.com",
    linkUrl: "https://molcajete.com",
    access: "guigolo.com/projects/molcajete/ideasid",
  },

  {
    id: "brosvalley-tsf-application-project",
    companyLogo: "/brand/projects/brosvalley/logo-brosvalley.png",
    title: "TU STREAMER FAVORITO",
    sector: "Diseño aplicación móvil [Videogames sector]",
    description: [
      "Una experiencia lúdica diseñada para conectar entretenimiento, juego y comunidad.",
      "Diseño de una app móvil gamificada enfocada en engagement y mecánicas simples de interacción. El proyecto fue publicado y posteriormente archivado, conservando valor como exploración de diseño y experiencia de usuario.",
    ],
    image: "/brand/projects/brosvalley/cover_tsf.png",
    stack: "Figma, Adobe Illustrator",
    role: "UX/UI Designer",
    linkLabel: "brosvalley.com",
    linkUrl: "https://brosvalley.com",
    access: "guigolo.com/projects/brosvalley/tsf",
  },

  {
    id: "latiendita-puntodeventa-project",
    companyLogo: "/brand/projects/tiendita/logo-tiendita.png",
    title: "PUNTO DE VENTA",
    sector: "Diseño sistema POS [Retail sector]",
    description: [
      "Un sistema diseñado para simplificar ventas y dar control real a pequeños negocios.",
      "Interfaz funcional y directa para gestión de productos, ventas y clientes. Pensado para usuarios no técnicos, priorizando rapidez, legibilidad y reducción de errores en contextos reales.",
    ],
    image: "/brand/projects/tiendita/cover_puntodeventa.png",
    stack: "Figma, HTML5, CSS, JavaScript, PHP, MySQL",
    role: "UX/UI Designer & Web development",
    linkLabel: "guigolo.com/projects/tiendita",
    linkUrl: "guigolo.com/projects/tiendita",
    access: "guigolo.com/projects/tiendita",
  },

  {
    id: "mironline-platform-project",
    companyLogo: "/brand/projects/mironline/logo-mironline.png",
    title: "MIRONLINE",
    sector: "Desarrollo web y diseño interactivo e-learning [Edtech sector]",
    description: [
      "Diseño una experiencia de aprendizaje interactiva, gamificada y centrada en el progreso real.",
      "Aplicación educativa pensada para mantener motivación, claridad y continuidad. Combina contenido, métricas y feedback visual para acompañar al usuario durante todo el proceso.",
    ],
    image: "/brand/projects/mironline/cover-mironline.png",
    stack: "Figma, HTML5, CSS, JavaScript, PHP, MySQL, Blender",
    role: "Web development & UI/3D Designer",
    linkLabel: "mironline.com",
    linkUrl: "https://mironline.com",
    access: "guigolo.com/projects/mironline",
  },
  
];
