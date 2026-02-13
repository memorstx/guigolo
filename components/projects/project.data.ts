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
  access?: string; // ruta bonita (texto)
};

export const projects: ProjectItem[] = [
  {
    id: "academia-platform-project",
    companyLogo: "/brand/projects/academia-global/logo-ag.png",
    title: "ACADEMIA GLOBAL",
    sector: "EdTech · Rediseño de plataforma educativa",
    description: [
      "Rediseño un campus para que aprender se sienta claro, medible y motivador.",
      "Sistema visual e interacción enfocados en progreso, jerarquía de información y decisiones rápidas.",
    ],
    image: "/brand/projects/academia-global/cover_plataforma_educativa.png",
    stack: "Figma, HTML5, CSS, JavaScript",
    role: "UI Designer & Web development",
    linkLabel: "Ver caso",
    linkUrl: "/projects/ag/platform",
    access: "guigolo.com/projects/ag/platform",
  },

  {
    id: "academia-administrator-project",
    companyLogo: "/brand/projects/academia-global/logo-ag.png",
    title: "ACADEMIA GLOBAL",
    sector: "EdTech · Rediseño de Control Escolar",
    description: [
      "Rediseño un sistema académico complejo para hacerlo claro, usable y fácil de operar.",
      "Priorizo jerarquía de datos y reducción de carga cognitiva en tareas administrativas críticas.",
    ],
    image: "/brand/projects/academia-global/cover_administrador.png",
    stack: "Figma, HTML5, CSS, JavaScript",
    role: "UI Designer & Web development",
    linkLabel: "Ver caso",
    linkUrl: "/projects/ag/administrator",
    access: "guigolo.com/projects/ag/administrator",
  },

  {
    id: "molcajete-landing-mcts-project",
    companyLogo: "/brand/projects/molcajete/logo-molcajete.png",
    title: "MOLCAJETE",
    sector: "Salud · Rediseño de landing",
    description: [
      "Diseño una experiencia clara y empática para decisiones importantes sobre salud femenina.",
      "Estructura enfocada en confianza, accesibilidad y guía suave sin frialdad médica.",
    ],
    image: "/brand/projects/molcajete/cover_mcts.png",
    stack: "Figma, Astro, Tailwind CSS, JavaScript",
    role: "UI Designer & Web development",
    linkLabel: "Ver caso",
    linkUrl: "/projects/molcajete/mjcts",
    access: "guigolo.com/projects/molcajete/mjcts",
  },

  {
    id: "molcajete-landing-ideasid-project",
    companyLogo: "/brand/projects/molcajete/logo-molcajete.png",
    title: "MOLCAJETE",
    sector: "E-commerce · Diseño de landing",
    description: [
      "Interfaz pensada para comunicar valor rápido y guiar la decisión sin fricción.",
      "Jerarquía, ritmo y CTAs claros: claridad primero, estética después.",
    ],
    image: "/brand/projects/molcajete/cover_ideasid.png",
    stack: "Figma, Astro, Tailwind CSS, JavaScript",
    role: "UI Designer & Web development",
    linkLabel: "Ver caso",
    linkUrl: "/projects/molcajete/ideasid",
    access: "guigolo.com/projects/molcajete/ideasid",
  },

  {
    id: "brosvalley-tsf-application-project",
    companyLogo: "/brand/projects/brosvalley/logo-brosvalley.png",
    title: "TU STREAMER FAVORITO",
    sector: "Gaming · Diseño de app móvil (concepto)",
    description: [
      "Exploración de app gamificada para conectar entretenimiento, juego y comunidad.",
      "Proyecto conceptual para experimentar con interacción, sistema visual y engagement.",
    ],
    image: "/brand/projects/brosvalley/cover_tsf.png",
    stack: "Figma, Adobe Illustrator",
    role: "UX/UI Designer",
    linkLabel: "Ver caso",
    linkUrl: "/projects/brosvalley/tsf",
    access: "guigolo.com/projects/brosvalley/tsf",
  },

  {
    id: "latiendita-puntodeventa-project",
    companyLogo: "/brand/projects/tiendita/logo-tiendita.png",
    title: "PUNTO DE VENTA",
    sector: "Retail · Diseño de sistema POS",
    description: [
      "Un sistema diseñado para simplificar ventas, reducir errores y dar control al negocio.",
      "UX para usuarios no técnicos: rapidez, legibilidad y prevención de fallos en contexto real.",
    ],
    image: "/brand/projects/tiendita/cover_puntodeventa.png",
    stack: "Figma, HTML5, CSS, JavaScript, PHP, MySQL",
    role: "UX/UI Designer & Web development",
    linkLabel: "Ver caso",
    linkUrl: "/projects/tiendita",
    access: "guigolo.com/projects/tiendita",
  },

  {
    id: "mironline-platform-project",
    companyLogo: "/brand/projects/mironline/logo-mironline.png",
    title: "MIRONLINE",
    sector: "EdTech · Plataforma para práctica de inglés",
    description: [
      "Plataforma de práctica de inglés con actividades por niveles y enfoque en progreso.",
      "Diseño interactivo pensado para mantener claridad, motivación y continuidad.",
    ],
    image: "/brand/projects/mironline/cover-mironline.png",
    stack: "Figma, HTML5, CSS, JavaScript, PHP, MySQL, Blender",
    role: "Web development & UI/3D Designer",
    linkLabel: "Sitio público",
    linkUrl: "https://mironline.io",
    access: "guigolo.com/projects/mironline",
  },
];
