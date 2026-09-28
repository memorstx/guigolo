export type FeaturedProjectBase = {
  id: string;
  companyLogo?: string;
  image: string;
  linkUrl?: string;
  access?: string;
};

export const FEATURED_PROJECTS_BASE: FeaturedProjectBase[] = [
  {
    id: "academia-platform-project",
    companyLogo: "/brand/projects/academia-global/logo-ag.png",
    image: "/brand/projects/academia-global/cover_plataforma_educativa.png",

    // Case study pendiente.
    // Cuando esté listo, sólo vuelve a activar esta línea:
    // linkUrl: "/projects/ag/platform",

    access: "https://academiaglobal.mx",
  },
  {
    id: "mironline-platform-project",
    companyLogo: "/brand/projects/mironline/logo-mironline.png",
    image: "/brand/projects/mironline/cover-mironline.png",
    linkUrl: "/projects/mironline/platform",
    access: "https://mironline.io",
  },
  {
    id: "bongodex-platform-project",
    image: "/brand/projects/bongodex/case-study/01-bongodex-cover.png",

    // Case study pendiente.
    // La ruta y el código siguen existiendo; sólo ocultamos "Ver caso" por ahora.
    // Cuando esté listo, vuelve a activar:
    // linkUrl: "/projects/bongodex/platform",

    access: "https://bongodex.com",
  },
];
