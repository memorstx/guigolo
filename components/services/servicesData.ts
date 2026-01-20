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
      "Transformo ideas en interfaces claras y sensibles que conectan rápido y funcionan sin fricción emocional.",
    imageSrc: "/services/design.webp",
  },
  {
    id: "experiencia",
    title: "EXPERIENCIA",
    iconLabel: "EXPERIENCIA",
    description:
      "Creo flujos humanos y memorables que guían al usuario con claridad, emoción y control, sin confusión.",
    imageSrc: "/services/experience.webp",
  },
  {
    id: "identidad",
    title: "IDENTIDAD",
    iconLabel: "IDENTIDAD",
    description:
      "Construyo identidad visual con intención: coherente, reconocible y lista para crecer con tu producto.",
    imageSrc: "/services/identity.webp",
  },
  {
    id: "interaccion",
    title: "INTERACCIÓN",
    iconLabel: "INTERACCIÓN",
    description:
      "Diseño microinteracciones con precisión para que cada gesto se sienta natural, útil y hasta adorable.",
    imageSrc: "/services/interaction.webp",
  },
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
];
