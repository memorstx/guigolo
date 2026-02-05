// components/services/servicesData.ts
export type ServiceItem = {
  id: string;
  title: string;
  iconLabel: string; // texto mini arriba cuando está contraída
  description: string;
  imageSrc: string; // desde /public
};

export const SERVICES: ServiceItem[] = [
  {
    id: "design",
    title: "DISEÑO",
    iconLabel: "DISEÑO",
    description:
      "Cuando necesitas que algo se vea bien, pero sobre todo se entienda mejor.",
    imageSrc: "/services/design.webp",
  },
  {
    id: "experiencia",
    title: "EXPERIENCIA",
    iconLabel: "EXPERIENCIA",
    description:
      "Cuando las personas se pierden, dudan o no saben qué hacer en tu producto.",
    imageSrc: "/services/experience.webp",
  },
  {
    id: "identidad",
    title: "IDENTIDAD",
    iconLabel: "IDENTIDAD",
    description:
      "Cuando tu marca no se siente coherente o no transmite confianza real.",
    imageSrc: "/services/identity.webp",
  },
  {
    id: "interaccion",
    title: "INTERACCIÓN",
    iconLabel: "INTERACCIÓN",
    description:
      "Cuando el diseño necesita cobrar vida y funcionar en el mundo real.",
    imageSrc: "/services/interaction.webp",
  },
  /*
  {
    id: "conversion",
    title: "CONVERSIÓN",
    iconLabel: "CONVERSIÓN",
    description:
      "Hago que el diseño empuje a la acción: mensajes, jerarquía y confianza para convertir sin presionar.",
    imageSrc: "/services/conversion.webp",
  },
  {
    id: "conexion",
    title: "CONEXIÓN",
    iconLabel: "CONEXIÓN",
    description:
      "Diseño experiencias que conectan: cercanas, coherentes y con personalidad para que la gente vuelva.",
    imageSrc: "/services/connection.webp",
  },
  */
];
