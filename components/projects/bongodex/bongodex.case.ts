export type Locale = "es" | "en";

type InfoItem = { title: string; body: string };
type Metric = { value: string; label: string; note?: string };

export type BongodexCaseCopy = {
  meta: { title: string; description: string };
  back: string;
  title: string;
  headline: string;
  intro: string;
  facts: { label: string; value: string }[];
  context: { title: string; body: string[]; audience: string };
  problem: { title: string; statement: string; body: string; questions: string[] };
  research: { title: string; intro: string; sources: InfoItem[] };
  hypothesis: { title: string; statement: string; rules: InfoItem[] };
  prototype: { title: string; body: string[]; loop: string[]; turningPoint: string };
  brand: { title: string; body: string; principles: InfoItem[] };
  architecture: { title: string; body: string; categories: InfoItem[]; rule: string };
  collection: { title: string; body: string; details: string[] };
  overview: { title: string; body: string; modes: InfoItem[] };
  engagement: {
    title: string;
    intro: string;
    battleTitle: string;
    battleBody: string;
    activityTitle: string;
    activityBody: string;
  };
  trust: { title: string; body: string; states: InfoItem[] };
  validation: { title: string; body: string; metrics: Metric[]; learning: string };
  evolution: { title: string; body: string[] };
  assetLabels: Record<string, string>;
  footer: { label: string; title: string; body: string; button: string };
};

export const bongodexCase: Record<Locale, BongodexCaseCopy> = {
  es: {
    meta: {
      title: "bongodex · Case study | Guigolo",
      description:
        "Proceso de producto, UX/UI y frontend detrás de bongodex, una experiencia para entender y seguir colecciones de Bongo Cat a partir del inventario real de Steam.",
    },
    back: "Volver a proyectos",
    title: "bongodex",
    headline: "Una forma más clara de entender lo que tienes, lo que cambia y lo que todavía falta en tu colección.",
    intro:
      "En Bongo Cat, buena parte de la colección vive en el inventario de Steam. Steam sabe qué items tienes, pero no te explica la historia detrás de esa colección. bongodex nació para convertir esos datos en algo que un jugador pueda recorrer, comparar y seguir con contexto.",
    facts: [
      { label: "ROL", value: "Product Designer + Frontend" },
      { label: "PRODUCTO", value: "Herramienta para coleccionistas de Bongo Cat" },
      { label: "STACK", value: "Next.js · React · Tailwind · Prisma · Neon" },
      { label: "DATOS", value: "Inventario de Steam + catálogo propio" },
    ],
    context: {
      title: "Contexto",
      body: [
        "Bongo Cat entrega skins, hats, emojis y otros objetos que terminan guardados en Steam. Cuando la colección crece, esa lista deja de responder preguntas sencillas: qué pertenece a un evento, qué rareza tengo, qué se repite o cuánto me falta para completar algo.",
        "El producto está pensado para dos extremos que conviven en el mismo juego: quien apenas empieza a coleccionar y quien ya revisa eventos, rarezas y faltantes con mucha más intención.",
      ],
      audience:
        "La meta no era hacer otro catálogo del juego. Era darle sentido al inventario de una persona.",
    },
    problem: {
      title: "Problema",
      statement: "Una lista de items puede ser correcta y aun así decir muy poco sobre una colección.",
      body:
        "La API podía decirme qué había en el inventario. El problema de UX empezaba después: había que relacionar cada item con tipo, rareza, evento, origen y estado de propiedad sin convertir la pantalla en una tabla imposible de leer.",
      questions: [
        "¿Qué tengo realmente?",
        "¿Qué está duplicado?",
        "¿De qué evento viene?",
        "¿Qué me falta cuando ya llevo suficiente progreso?",
      ],
    },
    research: {
      title: "Investigación",
      intro:
        "La investigación ocurrió pegada al producto. Trabajé con inventarios reales, revisé cómo respondía Steam y observé qué información empezaba a faltar conforme la colección se hacía más grande.",
      sources: [
        {
          title: "Inventario real",
          body:
            "El dato de propiedad era el punto de partida. También aparecían duplicados, respuestas parciales, inventarios privados y estados que no podían tratarse como si fueran lo mismo.",
        },
        {
          title: "Estructura del catálogo",
          body:
            "Nuevos tipos y eventos obligaban a revisar si la taxonomía seguía teniendo sentido. La clasificación terminó siendo parte del problema de producto, no sólo de contenido.",
        },
        {
          title: "Uso del producto",
          body:
            "Con bongodex ya en uso, las dudas y comentarios empezaron a girar alrededor de categorías, comportamiento y nuevas funciones. Eso ayudó a decidir qué convenía resolver después.",
        },
        {
          title: "Analítica",
          body:
            "Las sesiones y la navegación entre vistas servían para saber si la experiencia estaba funcionando como producto y no sólo como una ficha de consulta.",
        },
      ],
    },
    hypothesis: {
      title: "Hipótesis",
      statement:
        "Si el inventario se enriquece con contexto y la interfaz cambia según el avance de la colección, una misma experiencia puede servir tanto a quien empieza como a quien ya colecciona en serio.",
      rules: [
        {
          title: "Propiedad antes que faltantes",
          body:
            "Una cuenta nueva necesita entender qué tiene. Mostrar ausencias demasiado pronto sólo añade ruido.",
        },
        {
          title: "Progreso cuando aporta algo",
          body:
            "Los faltantes ganan peso cuando la colección supera 50% de completado y ya existe intención real de cerrar sets o eventos.",
        },
        {
          title: "Dimensiones separadas",
          body:
            "Tipo, rareza y evento responden preguntas diferentes. Mezclarlos en una sola jerarquía hacía más difícil filtrar y explicar la colección.",
        },
      ],
    },
    prototype: {
      title: "Prototipado",
      body: [
        "El primer enfoque se parecía más a un catálogo: mucha información útil en una sola superficie. Funcionaba para descubrir items, pero se quedaba corto cuando la pregunta cambiaba de ‘qué existe’ a ‘qué tengo yo’.",
        "Ahí apareció la separación que hoy sostiene el producto. Collection quedó como espacio para explorar el inventario. Overview se volvió la lectura resumida de una cuenta. Las ideas pasaban por Figma o directamente por frontend según cuánto dependieran de datos reales.",
      ],
      loop: ["idea", "Figma", "frontend", "inventario real", "ajuste"],
      turningPoint:
        "El cambio importante fue dejar de diseñar una lista de objetos y empezar a diseñar estados de colección.",
    },
    brand: {
      title: "Sistema visual",
      body:
        "La identidad tenía que convivir con arte muy distinto entre items. Por eso la interfaz se mantuvo oscura, contenida y con color reservado para jerarquía, rareza, estado y feedback.",
      principles: [
        {
          title: "El item lleva el protagonismo",
          body:
            "Cards, fondos y chrome se mantienen atrás para que skins, hats y otros coleccionables sigan siendo lo primero que ves.",
        },
        {
          title: "Color con trabajo",
          body:
            "Los acentos ayudan a distinguir información y estados. No todas las superficies necesitan competir por atención.",
        },
        {
          title: "Una misma familia",
          body:
            "Collection, Overview, Activity y Battle usan el mismo ritmo, iconografía y comportamiento aunque resuelvan tareas diferentes.",
        },
      ],
    },
    architecture: {
      title: "Arquitectura de información",
      body:
        "La taxonomía tuvo que acomodarse a cómo Bongo Cat crece. Reservé categorías principales para conceptos estables y dejé espacio para subtipos y nuevos orígenes sin romper la navegación.",
      categories: [
        { title: "Skins", body: "Coleccionables principales y base de Bongo Battle." },
        { title: "Hats", body: "Categoría independiente dentro del inventario." },
        { title: "Emojis", body: "Módulo propio con orígenes como Standard, Achievements o Pase." },
        { title: "Consumables", body: "Categoría extensible; Fireworks vive aquí como subtipo." },
      ],
      rule:
        "Rareza y evento atraviesan varias categorías. Se modelan como dimensiones distintas para no convertir el catálogo en carpetas superpuestas.",
    },
    collection: {
      title: "Collection",
      body:
        "Collection es la superficie de exploración. Aquí importa poder recorrer lo que existe, reconocer lo que ya pertenece al inventario y abrir cada item sin perder el contexto de la colección.",
      details: [
        "inventario real separado de duplicados",
        "lectura por tipo, rareza y evento",
        "favoritos y acceso al detalle",
        "navegación centrada en /collection, no en el catálogo legado",
      ],
    },
    overview: {
      title: "Overview",
      body:
        "Overview responde otra pregunta: ‘¿cómo va mi colección?’. La pantalla cambia su prioridad según la cantidad de información disponible y el avance real de la cuenta.",
      modes: [
        {
          title: "Nuevo / casual",
          body:
            "Primero muestra lo que ya tienes. Rarezas con cero items permanecen fuera hasta que exista algo que contar.",
        },
        {
          title: "Coleccionista",
          body:
            "Cuando el progreso supera 50%, aparecen faltantes, porcentaje por evento y una lectura más profunda de la colección.",
        },
        {
          title: "Eventos",
          body:
            "Cada evento calcula su avance con su total real. Un Advent de 25 items no se compara contra una meta inventada de 14 o 20.",
        },
      ],
    },
    engagement: {
      title: "Expansión del producto",
      intro:
        "Una vez que la colección y sus datos fueron confiables, pude usarlos para crear experiencias que Steam no ofrece.",
      battleTitle: "Bongo Battle",
      battleBody:
        "Daily League trabaja sólo con skins. Ocho compiten en doce duelos de liga; los cuatro mejores avanzan a semifinales y final. El player vive en una ruta aislada para que durante el duelo no haya menús compitiendo por atención.",
      activityTitle: "Activity",
      activityBody:
        "Activity reúne cosas que sí vale la pena volver a consultar: nuevos items detectados, llegadas por link, disponibilidad de Battle y novedades. El drawer y la vista completa comparten estado, y borrar una entrada permite deshacer la acción durante unos segundos.",
    },
    trust: {
      title: "Estados y confianza",
      body:
        "Steam puede tardar, ocultar un inventario o entregar sólo una parte. Para el usuario, esos casos pueden parecer ‘no hay nada’, pero significan cosas completamente distintas. La interfaz necesita decir qué sabe antes de sacar una conclusión.",
      states: [
        { title: "Loading", body: "La consulta sigue en curso." },
        { title: "Privado", body: "El inventario existe, pero no es accesible." },
        { title: "Vacío", body: "La cuenta es accesible y realmente no tiene items." },
        { title: "Error", body: "Falló Steam o una dependencia temporal." },
        { title: "Parcial", body: "Hay datos útiles, pero todavía no están completos." },
        { title: "Listo", body: "Inventario y catálogo pueden cruzarse con normalidad." },
      ],
    },
    validation: {
      title: "Validación",
      body:
        "Con el producto en producción, la señal que me interesaba era si la gente recorría más de una superficie y encontraba razones para quedarse. Los primeros 90 días dieron una base suficiente para seguir invirtiendo en profundidad, no sólo en más items.",
      metrics: [
        { value: "1,096", label: "sesiones", note: "primeros 90 días" },
        { value: "3.82", label: "vistas por sesión", note: "navegación entre vistas" },
        { value: "8m06s", label: "promedio por sesión", note: "tiempo medio registrado" },
      ],
      learning:
        "La validación también cambió el tipo de problemas que resuelvo: cada nueva feature obliga a revisar categorías, estados y prioridades del sistema completo.",
    },
    evolution: {
      title: "Evolución",
      body: [
        "bongodex sigue cambiando porque Bongo Cat también cambia. Nuevos eventos, tipos de item y formas de conseguirlos obligan a revisar si el modelo de información sigue siendo suficiente.",
        "La siguiente etapa no consiste en llenar el producto de módulos. Consiste en mantener una colección fácil de leer aunque debajo haya cada vez más reglas, datos y excepciones.",
      ],
    },
    assetLabels: {
      cover: "Vista general de bongodex",
      research: "Señales de investigación y datos de inventario",
      prototype: "Evolución del prototipo",
      brand: "Sistema visual de bongodex",
      collection: "Vista Collection",
      overview: "Vista Overview",
      battle: "Bongo Battle",
      activity: "Activity",
      states: "Estados de inventario",
      system: "Arquitectura y sistema de producto",
    },
    footer: {
      label: "PRODUCT CASE",
      title: "Diseñar bongodex significa decidir qué vale la pena mostrar antes de diseñar cómo se ve.",
      body:
        "Es el proyecto donde más directamente conecto producto, UX/UI, frontend, datos y decisiones que siguen cambiando después del release.",
      button: "Volver a proyectos",
    },
  },
  en: {
    meta: {
      title: "bongodex · Case study | Guigolo",
      description:
        "Product, UX/UI and frontend process behind bongodex, an experience for understanding and tracking Bongo Cat collections from real Steam inventory data.",
    },
    back: "Back to projects",
    title: "bongodex",
    headline: "A clearer way to understand what you own, what changes, and what is still missing from your collection.",
    intro:
      "In Bongo Cat, much of the collection lives inside Steam inventory. Steam knows which items you own, but it does not explain the story behind that collection. bongodex turns those raw records into something a player can browse, compare and follow with context.",
    facts: [
      { label: "ROLE", value: "Product Designer + Frontend" },
      { label: "PRODUCT", value: "Collector tool for Bongo Cat players" },
      { label: "STACK", value: "Next.js · React · Tailwind · Prisma · Neon" },
      { label: "DATA", value: "Steam inventory + custom catalog" },
    ],
    context: {
      title: "Context",
      body: [
        "Bongo Cat gives players skins, hats, emojis and other objects that end up stored in Steam. As a collection grows, that list stops answering simple questions: which event something belongs to, what rarity you own, what is duplicated or how close you are to completing a set.",
        "The product needs to work for two very different stages: someone who just started collecting and someone actively chasing events, rarities and missing items.",
      ],
      audience:
        "The goal was not another game catalog. It was to make one person's inventory understandable.",
    },
    problem: {
      title: "Problem",
      statement: "An item list can be technically correct and still say very little about a collection.",
      body:
        "The API could tell me what was in the inventory. The UX problem started after that: each item had to be connected to type, rarity, event, origin and ownership state without turning the screen into an unreadable data table.",
      questions: [
        "What do I actually own?",
        "What is duplicated?",
        "Which event does it come from?",
        "What am I missing once progress becomes meaningful?",
      ],
    },
    research: {
      title: "Research",
      intro:
        "Research stayed close to the product. I worked with real inventories, checked how Steam responded and watched which information became harder to understand as collections grew.",
      sources: [
        { title: "Real inventory", body: "Ownership was the starting point, but duplicates, partial responses, private inventories and errors all required different UI states." },
        { title: "Catalog structure", body: "New types and events kept testing whether the taxonomy still made sense. Classification became a product problem, not just content organization." },
        { title: "Product use", body: "Once bongodex was live, questions and feedback centered on categories, behavior and new features, which helped prioritize the next problems." },
        { title: "Analytics", body: "Sessions and movement between views helped show whether this was becoming a product rather than a single lookup page." },
      ],
    },
    hypothesis: {
      title: "Hypothesis",
      statement:
        "If inventory is enriched with collection context and the interface adapts to progress, the same product can serve both new and advanced collectors.",
      rules: [
        { title: "Ownership before gaps", body: "A new account first needs to understand what it owns. Missing items too early only add noise." },
        { title: "Progress when it matters", body: "Missing items become useful once completion passes 50% and the user has a reason to finish sets or events." },
        { title: "Separate dimensions", body: "Type, rarity and event answer different questions. Mixing them into one hierarchy made filtering and explanation harder." },
      ],
    },
    prototype: {
      title: "Prototyping",
      body: [
        "The first approach looked more like a catalog: lots of useful information in one surface. It worked for discovering items, but not when the question shifted from ‘what exists’ to ‘what do I own?’",
        "That split became the foundation of the current product. Collection became the inventory exploration space. Overview became the account summary. Ideas moved through Figma or directly into frontend depending on how much they depended on real data.",
      ],
      loop: ["idea", "Figma", "frontend", "real inventory", "adjust"],
      turningPoint:
        "The important shift was moving from designing an item list to designing collection states.",
    },
    brand: {
      title: "Visual system",
      body:
        "The identity needed to work with very different item artwork. The interface therefore stays dark and restrained, while color is reserved for hierarchy, rarity, state and feedback.",
      principles: [
        { title: "Items lead", body: "Cards, backgrounds and chrome stay behind so skins, hats and other collectibles remain the first thing you notice." },
        { title: "Color has a job", body: "Accents distinguish information and states instead of making every surface compete for attention." },
        { title: "One product family", body: "Collection, Overview, Activity and Battle share rhythm, iconography and behavior even though they solve different tasks." },
      ],
    },
    architecture: {
      title: "Information architecture",
      body:
        "The taxonomy had to accommodate how Bongo Cat grows. Main categories are reserved for stable concepts, while subtypes and new origins can expand without breaking navigation.",
      categories: [
        { title: "Skins", body: "Main collectibles and the only category used by Bongo Battle." },
        { title: "Hats", body: "An independent inventory category." },
        { title: "Emojis", body: "Its own module with origins such as Standard, Achievements and Pass." },
        { title: "Consumables", body: "An expandable category; Fireworks lives here as a subtype." },
      ],
      rule:
        "Rarity and event cross several categories, so they remain separate dimensions instead of overlapping folders.",
    },
    collection: {
      title: "Collection",
      body:
        "Collection is the exploration surface. It lets people browse what exists, recognize what is already owned and open individual items without losing collection context.",
      details: [
        "real inventory separated from duplicates",
        "reading by type, rarity and event",
        "favorites and item detail",
        "navigation centered on /collection, not the legacy catalog",
      ],
    },
    overview: {
      title: "Overview",
      body:
        "Overview answers a different question: ‘how is my collection doing?’. The screen changes priority based on how much information exists and how far the account has progressed.",
      modes: [
        { title: "New / casual", body: "Starts with what you own. Rarities with zero items stay hidden until there is something useful to say." },
        { title: "Collector", body: "After 50% completion, missing items, event progress and deeper collection information become more prominent." },
        { title: "Events", body: "Each event uses its real total. A 25-item Advent set is not measured against an arbitrary shared target." },
      ],
    },
    engagement: {
      title: "Product expansion",
      intro:
        "Once collection data became reliable, it could support experiences that Steam does not provide.",
      battleTitle: "Bongo Battle",
      battleBody:
        "Daily League uses skins only. Eight enter twelve league matches; the top four advance to semifinals and the final. The player lives on its own route so side navigation does not compete with the duel.",
      activityTitle: "Activity",
      activityBody:
        "Activity collects things worth revisiting: newly detected items, arrivals through shared links, Battle availability and product updates. The drawer and full view stay synchronized, and deleting an entry includes a short undo window.",
    },
    trust: {
      title: "States and trust",
      body:
        "Steam may respond slowly, hide an inventory or return only part of it. To a user, all of those can look like ‘nothing is here’, but they mean different things. The interface needs to explain what it knows before drawing a conclusion.",
      states: [
        { title: "Loading", body: "The request is still in progress." },
        { title: "Private", body: "The inventory exists but cannot be accessed." },
        { title: "Empty", body: "The account is accessible and truly has no items." },
        { title: "Error", body: "Steam or a temporary dependency failed." },
        { title: "Partial", body: "Useful data exists, but it is not complete yet." },
        { title: "Ready", body: "Inventory and catalog can be matched normally." },
      ],
    },
    validation: {
      title: "Validation",
      body:
        "Once the product was live, the signal I cared about was whether people moved beyond one surface and found reasons to stay. The first 90 days gave enough evidence to keep investing in depth rather than simply adding more items.",
      metrics: [
        { value: "1,096", label: "sessions", note: "first 90 days" },
        { value: "3.82", label: "views per session", note: "movement between views" },
        { value: "8m06s", label: "average session", note: "recorded mean" },
      ],
      learning:
        "Validation also changed the kind of problems I solve: each new feature now forces a review of categories, states and priorities across the product.",
    },
    evolution: {
      title: "Evolution",
      body: [
        "bongodex keeps changing because Bongo Cat changes too. New events, item types and acquisition methods keep testing whether the information model is still enough.",
        "The next stage is not about filling the product with modules. It is about keeping the collection easy to read while the rules, data and edge cases underneath continue to grow.",
      ],
    },
    assetLabels: {
      cover: "bongodex overview",
      research: "Research signals and inventory data",
      prototype: "Prototype evolution",
      brand: "bongodex visual system",
      collection: "Collection view",
      overview: "Overview view",
      battle: "Bongo Battle",
      activity: "Activity",
      states: "Inventory states",
      system: "Product architecture and system",
    },
    footer: {
      label: "PRODUCT CASE",
      title: "Designing bongodex starts with deciding what deserves to be visible before deciding how it looks.",
      body:
        "This is the project where product, UX/UI, frontend, data and post-release decisions are most directly connected in my work.",
      button: "Back to projects",
    },
  },
};
