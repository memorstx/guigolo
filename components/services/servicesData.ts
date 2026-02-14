// components/services/servicesData.ts

export type ServiceItemBase = {
  id: string;
  imageSrc: string;
};

export const SERVICES_BASE: ServiceItemBase[] = [
  { id: "design", imageSrc: "/services/design.webp" },
  { id: "experiencia", imageSrc: "/services/experience.webp" },
  { id: "identidad", imageSrc: "/services/identity.webp" },
  { id: "interaccion", imageSrc: "/services/interaction.webp" },
];
