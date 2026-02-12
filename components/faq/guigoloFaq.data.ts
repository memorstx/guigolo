// components/guigolo/guigoloFaq.data.ts
export type FAQItem = {
  id: string;
  q: string;
  a: string;
};

export const GUIGOLO_FAQS: FAQItem[] = [
  {
    id: "guigolo-vs-gigolo",
    q: "¿Guigolo es lo mismo que gigoló?",
    a: "No. “Guigolo” es mi marca (Gui-Go-Lo: Guillermo González López). “Gigoló” es otra palabra con otro significado. Esta página existe justo para evitar ese malentendido.",
  },
  {
    id: "por-que-nombre",
    q: "¿Por qué ese nombre?",
    a: "Porque es corto, recordable y viene de mi nombre. No es una ocurrencia “edgy”: es una firma creativa con intención.",
  },
  {
    id: "como-se-pronuncia",
    q: "¿Cómo se pronuncia?",
    a: "Guí-go-lo. Tres sílabas. Si lo dices así, ya estamos del mismo lado. 🤝",
  },
  {
    id: "como-lo-escribo",
    q: "¿Cómo se escribe para no regarla?",
    a: "Guigolo (con “u”). Evita “gigolo”. Si dudas: copia/pega desde mi sitio y listo.",
  },
  {
    id: "por-que-hacer-pagina",
    q: "¿Por qué hacer una página solo para esto?",
    a: "Porque la marca también es claridad. Si el nombre genera ruido, lo convierto en contexto, historia y confianza. Y se acabó el tema.",
  },
];
