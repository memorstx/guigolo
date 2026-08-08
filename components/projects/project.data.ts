export type FeaturedProjectBase = {
  id: string;
  companyLogo: string;
  image: string;
  linkUrl: string;
  access?: string;
};

export const FEATURED_PROJECTS_BASE: FeaturedProjectBase[] = [
  {
    id: "academia-platform-project",
    companyLogo: "/brand/projects/academia-global/logo-ag.png",
    image: "/brand/projects/academia-global/cover_plataforma_educativa.png",
    linkUrl: "/projects/ag/platform",
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
    id: "latiendita-puntodeventa-project",
    companyLogo: "/brand/projects/tiendita/logo-tiendita.png",
    image: "/brand/projects/tiendita/cover_puntodeventa.png",
    linkUrl: "/projects/tiendita/pos",
  },
];
