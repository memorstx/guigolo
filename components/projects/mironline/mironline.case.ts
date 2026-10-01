export type Locale = "es" | "en";

type Stat = { value: string; label: string; note?: string };
type Card = { title: string; body: string };
type Interaction = { title: string; body: string; meta: string };

export type MironlineCaseCopy = {
  meta: { title: string; description: string };
  back: string;
  eyebrow: string;
  title: string;
  headline: string;
  intro: string;
  facts: Array<{ label: string; value: string }>;
  quickStats: Stat[];
  nav: Array<{ id: string; label: string }>;
  sections: {
    product: {
      kicker: string;
      title: string;
      body: string[];
      ecosystem: Array<{ label: string; value: string }>;
    };
    audience: {
      kicker: string;
      title: string;
      intro: string;
      profiles: Array<{
        typeLabel: string;
        role: string;
        context: string;
        needs: string[];
        story: string;
        asset: "studentUser" | "teacherUser";
      }>;
      storyLabel: string;
      architectureTitle: string;
      architectureIntro: string;
      architecture: Array<{ label: string; items: string[] }>;
      flowTitle: string;
      flow: string[];
      note: string;
    };
    challenge: {
      kicker: string;
      title: string;
      statement: string;
      context: string[];
      reportsTitle: string;
      reports: Array<{ label: string; body: string }>;
      constraintsTitle: string;
      constraints: string[];
    };
    role: {
      kicker: string;
      title: string;
      body: string[];
      teamTitle: string;
      team: string[];
      workflowTitle: string;
      workflow: string[];
      workingTitle: string;
      workingBody: string;
      reverseTitle: string;
      reverseBody: string;
    };
    research: {
      kicker: string;
      title: string;
      intro: string;
      signals: Card[];
    };
    principles: {
      kicker: string;
      title: string;
      items: Card[];
    };
    player: {
      kicker: string;
      title: string;
      intro: string;
      statLabel: string;
      interactions: Interaction[];
    };
    iteration: {
      kicker: string;
      title: string;
      intro: string;
      beforeTitle: string;
      beforeBody: string;
      afterTitle: string;
      afterBody: string;
      feedbackTitle: string;
      feedback: string[];
      outcomeTitle: string;
      outcomeBody: string;
    };
    system: {
      kicker: string;
      title: string;
      intro: string;
      points: string[];
      designToCodeLabel: string;
      designToCode: string;
      codeToDesignLabel: string;
      codeToDesign: string;
    };
    responsive: {
      kicker: string;
      title: string;
      intro: string;
      points: string[];
    };
    professional: {
      kicker: string;
      title: string;
      intro: string;
      areasTitle: string;
      areas: string[];
      threeDTitle: string;
      threeDBody: string;
      flowTitle: string;
      threeDSteps: string[];
      interactiveLabel: string;
      externalLabel: string;
    };
    teachers: {
      kicker: string;
      title: string;
      intro: string;
      points: string[];
    };
    measure: {
      kicker: string;
      title: string;
      intro: string;
      sources: Card[];
      loop: string[];
    };
    impact: {
      kicker: string;
      title: string;
      intro: string;
      stats: Stat[];
      supportTitle: string;
      supportBody: string;
      productTitle: string;
      productBody: string;
    };
    beyond: {
      kicker: string;
      title: string;
      body: string[];
      quote: string;
    };
  };
  assetLabels: Record<string, string>;
  cta: { label: string; title: string; body: string; button: string };
};

export const mironlineCase: Record<Locale, MironlineCaseCopy> = {
  es: {
    meta: {
      title: "mironline · Case study | Guigolo",
      description:
        "Caso de estudio de mironline: diseño UX/UI y frontend durante la transición de actividades heredadas de Flash hacia una plataforma web responsive.",
    },
    back: "Volver a proyectos",
    eyebrow: "CASE STUDY · EDTECH · 2021—2023",
    title: "mironline",
    headline: "Diseño e implementación de una plataforma educativa en transición a web responsive.",
    intro:
      "Entre 2021 y 2023 trabajé en mironline como Diseñador UI/UX + Frontend. Convertía contenido pedagógico en interfaces, implementaba gran parte del frontend y revisaba qué pasaba después de publicar para decidir qué ajustar.",
    facts: [
      { label: "ROL", value: "UI/UX Designer + Frontend" },
      { label: "PERIODO", value: "Oct 2021 — Oct 2023" },
      { label: "PRODUCTO", value: "Plataforma educativa de inglés" },
      {
        label: "STACK",
        value:
          "Figma · HTML · CSS · JavaScript · Bootstrap · jQuery · GitLab · Google Analytics",
      },
    ],
    quickStats: [
      {
        value: "30+",
        label: "tipos de interacción",
        note: "Ejercicios de práctica, evaluación y feedback.",
      },
      {
        value: "6",
        label: "áreas de Professional English",
        note: "Contenido relacionado con distintas licenciaturas.",
      },
      {
        value: "≈20%",
        label: "más uso desde mobile",
        note: "Aumento aproximado que recuerdo durante la etapa responsive.",
      },
    ],
    nav: [
      { id: "context", label: "Contexto" },
      { id: "problem", label: "Problema" },
      { id: "audience", label: "Usuarios" },
      { id: "scope", label: "Alcance" },
      { id: "research", label: "Investigación" },
      { id: "definition", label: "Definición" },
      { id: "ideation", label: "Ideación" },
      { id: "iteration", label: "Iteración" },
      { id: "system", label: "Sistema" },
      { id: "validation", label: "Validación" },
      { id: "results", label: "Resultados" },
    ],
    sections: {
      product: {
        kicker: "01",
        title: "Contexto",
        body: [
          "mironline acompañaba cursos de inglés de bachillerato y licenciatura. Los alumnos trabajaban con docentes y libros, y la plataforma servía para practicar, completar actividades y revisar su avance.",
          "Además de General English, existía Professional English. Las actividades cambiaban según el área de estudio del alumno, así que el producto tenía que soportar formatos muy distintos sin perder consistencia.",
        ],
        ecosystem: [
          { label: "CLASE", value: "Docente + programa" },
          { label: "LIBRO", value: "Contenido y secuencia" },
          { label: "MIRONLINE", value: "Práctica digital" },
          { label: "DATOS", value: "Progreso y desempeño" },
        ],
      },
      audience: {
        kicker: "03",
        title: "Quién usa mironline",
        intro:
          "La plataforma tenía dos recorridos principales. El alumno entraba para practicar y avanzar en su curso; el docente necesitaba revisar grupos, calificaciones y progreso. Sus necesidades eran distintas, pero compartían la misma información académica.",
        profiles: [
          {
            typeLabel: "Usuario principal",
            role: "Estudiante",
            context:
              "Practica inglés dentro de un curso y resuelve actividades desde computadora, tablet o celular.",
            needs: [
              "Entender qué hacer en cada actividad.",
              "Mantener disponible el contexto mientras responde.",
              "Recibir feedback después de una respuesta.",
              "Consultar su avance dentro del curso.",
            ],
            story:
              "Como estudiante, necesito mantener disponible el contenido que estoy usando mientras respondo, para no perder el contexto.",
            asset: "studentUser",
          },
          {
            typeLabel: "Usuario de seguimiento",
            role: "Docente",
            context:
              "Da seguimiento a grupos y revisa cómo avanzan los alumnos dentro de sus cursos.",
            needs: [
              "Consultar grupos y alumnos.",
              "Revisar calificaciones.",
              "Ver progreso y desempeño.",
              "Dar seguimiento académico sin recorrer demasiadas pantallas.",
            ],
            story:
              "Como docente, necesito consultar avance, calificaciones y desempeño por grupo, para dar seguimiento al curso.",
            asset: "teacherUser",
          },
        ],
        storyLabel: "Necesidad resumida",
        architectureTitle: "Cómo se organizaba la información",
        architectureIntro:
          "mironline conectaba la práctica del alumno con la información que el docente necesitaba para dar seguimiento.",
        architecture: [
          {
            label: "Estudiante",
            items: ["Curso", "Contenido y actividades", "Feedback", "Progreso"],
          },
          {
            label: "Docente",
            items: ["Grupos", "Alumnos", "Calificaciones", "Seguimiento"],
          },
        ],
        flowTitle: "Flujo principal del estudiante",
        flow: [
          "Entrar al curso",
          "Abrir actividad",
          "Leer instrucción",
          "Responder",
          "Recibir feedback",
          "Continuar",
        ],
        note:
          "Estos perfiles y necesidades resumen patrones observados durante el trabajo; no son personas ficticias creadas para el portafolio.",
      },
      challenge: {
        kicker: "02",
        title: "El problema",
        statement:
          "El contenido académico seguía siendo útil, pero una parte importante de la experiencia dependía de tecnología que ya impedía usarla con normalidad.",
        context: [
          "Cuando mi rol pasó a UI/UX + frontend en 2021, mironline ya tenía años de cursos y actividades publicadas. Muchas habían sido construidas con Flash y estaban pensadas principalmente para computadora.",
          "Para un alumno, ese problema no se veía como una decisión tecnológica: veía una pantalla en blanco, un ejercicio que no abría en su celular, un aviso de navegador incompatible o un reproductor que tardaba demasiado.",
          "Parte de mi trabajo también era revisar los reportes que llegaban a soporte y conversar con el equipo académico sobre lo que estaba fallando. Esas señales, junto con Analytics y los datos internos de uso, ayudaban a decidir qué migrar y qué ajustar primero.",
          "El reto no era copiar cada pantalla de Flash en HTML. Había que conservar lo que cada ejercicio quería enseñar o evaluar y reconstruir la interacción para web, responsive y navegadores actuales.",
        ],
        reportsTitle: "Lo que veía el alumno",
        reports: [
          { label: "Pantalla", body: "La actividad se queda en blanco." },
          { label: "Celular", body: "En mi celular no abre." },
          { label: "Navegador", body: "El navegador dice que no es compatible." },
          { label: "Carga", body: "El reproductor tarda demasiado en cargar." },
        ],
        constraintsTitle: "Lo que la solución tenía que conservar",
        constraints: [
          "El objetivo académico de cada actividad.",
          "Uso en computadora, tablet y celular.",
          "Compatibilidad entre navegadores y equipos.",
          "Reglas compartidas entre ejercicios diferentes.",
        ],
      },
      role: {
        kicker: "03",
        title: "Alcance y rol",
        body: [
          "Las actividades normalmente comenzaban en documentos de Word preparados por docentes y diseñadores instruccionales. Yo definía cómo convertir ese contenido en una interacción: jerarquía, instrucciones, controles, estados, feedback y comportamiento responsive.",
          "Después implementaba la mayor parte del frontend con HTML, CSS y JavaScript. Eso hacía que diseño y desarrollo estuvieran muy cerca y permitía ajustar una solución mientras todavía se estaba construyendo.",
        ],
        teamTitle: "Equipo",
        team: [
          "1 developer",
          "1 diseñador gráfico",
          "docentes",
          "diseñadores instruccionales",
          "pedagogos",
        ],
        workflowTitle: "Flujo de trabajo",
        workflow: [
          "entender la actividad",
          "definir interacción",
          "probar o prototipar",
          "implementar",
          "publicar",
          "revisar datos y comentarios",
          "ajustar",
        ],
        workingTitle: "Forma de trabajo",
        workingBody:
          "El trabajo era iterativo y cercano a una dinámica ágil: entender, definir, prototipar o probar técnicamente, implementar, publicar y ajustar. Para UX tomaba recursos de investigación, prototipado y validación según lo que pedía cada problema, sin forzar un framework completo.",
        reverseTitle: "Exploración técnica",
        reverseBody:
          "En integraciones como Sketchfab primero probaba qué permitía la API. Cuando la interacción ya funcionaba, documentaba ese patrón en Figma para reutilizarlo después.",
      },
      research: {
        kicker: "04",
        title: "Investigación",
        intro:
          "Las decisiones salían de varias fuentes que ya formaban parte del trabajo diario. No todo era una sesión formal de research; muchas veces el problema aparecía en soporte, en Analytics o directamente en lo que comentaban alumnos y docentes después de un release.",
        signals: [
          {
            title: "Soporte",
            body:
              "Tickets sobre compatibilidad, navegación, pantallas vacías y actividades que no cargaban.",
          },
          {
            title: "Google Analytics",
            body:
              "Tráfico, dispositivos, navegadores y comportamiento general de uso.",
          },
          {
            title: "Datos internos",
            body:
              "Progreso, calificaciones, desempeño y finalización de actividades.",
          },
          {
            title: "Alumnos y docentes",
            body:
              "Comentarios posteriores a releases y conversaciones directas dentro del entorno académico.",
          },
        ],
      },
      principles: {
        kicker: "05",
        title: "Definición",
        items: [
          {
            title: "Contexto disponible",
            body:
              "La información necesaria para responder debía permanecer cerca, especialmente en lecturas y ejercicios largos.",
          },
          {
            title: "Foco por tarea",
            body:
              "La pantalla debía mostrar lo necesario para el paso actual y reducir elementos que compitieran por atención.",
          },
          {
            title: "Patrones compartidos",
            body:
              "Botones, estados y feedback debían comportarse de forma parecida aunque cambiara el tipo de actividad.",
          },
        ],
      },
      player: {
        kicker: "06",
        title: "Ideación",
        intro:
          "A partir de esos criterios fui diseñando y reutilizando patrones para distintos objetivos de aprendizaje. Algunas actividades eran simples; otras mezclaban lectura, audio, video o modelos 3D.",
        statLabel: "30+ patrones de interacción",
        interactions: [
          {
            title: "Multiple choice",
            body:
              "Preguntas con dos, tres o cuatro opciones y estados de selección, error y acierto.",
            meta: "CHOICE",
          },
          {
            title: "Reading",
            body:
              "Lecturas con preguntas y distintas formas de mantener disponible el texto mientras el alumno respondía.",
            meta: "READ",
          },
          {
            title: "Fill in the blank",
            body:
              "Campos dentro de frases para completar palabras y recibir feedback después de responder.",
            meta: "WRITE",
          },
          {
            title: "Matching & ordering",
            body:
              "Actividades para relacionar elementos u ordenar partes de una frase.",
            meta: "MATCH",
          },
          {
            title: "Audio + texto",
            body:
              "Lecturas donde el texto se resaltaba al mismo tiempo que avanzaba el audio.",
            meta: "LISTEN",
          },
          {
            title: "Modelos 3D",
            body:
              "Ejercicios con modelos navegables, hotspots, pistas, preguntas y feedback.",
            meta: "EXPLORE",
          },
        ],
      },
      iteration: {
        kicker: "07",
        title: "Hipótesis e iteración",
        intro:
          "Una de las actividades combinaba una lectura con diez preguntas. La primera versión mostraba todo al mismo tiempo. Después de publicarla aparecieron comentarios sobre la cantidad de contenido en pantalla.",
        beforeTitle: "Primera propuesta",
        beforeBody:
          "Lectura completa y diez preguntas visibles en una sola vista.",
        afterTitle: "Solución",
        afterBody:
          "Lectura disponible todo el tiempo y una pregunta por paso.",
        feedbackTitle: "Hallazgos",
        feedback: [
          "Los alumnos sentían que había demasiado contenido junto.",
          "Los docentes querían que la lectura siguiera disponible mientras respondían.",
          "Ocultar y volver a mostrar el texto agregaba pasos innecesarios.",
        ],
        outcomeTitle: "Validación",
        outcomeBody:
          "Después del cambio los comentarios fueron mejores y vimos mayor finalización frente a las variantes más densas.",
      },
      system: {
        kicker: "08",
        title: "Sistema de diseño",
        intro:
          "Con más de 30 tipos de interacción, resolver cada pantalla desde cero dejó de ser práctico. Fui construyendo componentes y reglas en Figma a partir de lo que ya funcionaba en producción.",
        points: [
          "colores y espaciados",
          "botones e inputs",
          "variantes y estados",
          "feedback de error y acierto",
          "componentes reutilizables",
          "responsive",
          "light y dark mode",
        ],
        designToCodeLabel: "Design → Code",
        designToCode: "Figma → componente → frontend → revisión",
        codeToDesignLabel: "Code → Design",
        codeToDesign:
          "prueba en código → ajuste → patrón funcional → documentación en Figma",
      },
      responsive: {
        kicker: "09",
        title: "Adaptación responsive",
        intro:
          "El celular dejó de tratarse como una versión reducida del escritorio. Cada actividad se revisaba según el espacio disponible y el tipo de interacción.",
        points: [
          "Cambiar el orden del contenido cuando hacía falta.",
          "Mantener controles y estados fáciles de encontrar.",
          "Evitar acciones que dependieran de hover.",
          "Revisar la actividad en distintos navegadores y tamaños.",
        ],
      },
      professional: {
        kicker: "10",
        title: "Aplicación especializada",
        intro:
          "Professional English llevaba el mismo sistema a contenido relacionado con seis áreas académicas. La interacción tenía que adaptarse al tipo de vocabulario y a la situación que se quería practicar.",
        areasTitle: "Áreas de Professional English",
        areas: [
          "Agricultura y medio ambiente",
          "Ciencias computacionales",
          "Ciencias sociales y humanidades",
          "Construcción e ingeniería",
          "Ciencias de la salud",
          "Economía y administración",
        ],
        threeDTitle: "Interacción 3D",
        threeDBody:
          "En algunas actividades de Ciencias de la Salud trabajé con modelos preparados en Blender y 3ds Max e integrados con Sketchfab. Sobre el modelo agregaba hotspots, preguntas, pistas y feedback.",
        flowTitle: "Flujo de interacción",
        threeDSteps: [
          "explorar",
          "localizar",
          "consultar una pista",
          "responder",
          "ver feedback",
        ],
        interactiveLabel: "3D interactivo",
        externalLabel: "Ver en Sketchfab",
      },
      teachers: {
        kicker: "11",
        title: "Experiencia docente",
        intro:
          "La plataforma también tenía vistas para consultar grupos, calificaciones, progreso y seguimiento académico. Aquí el problema era ordenar más información sin volver lenta la consulta.",
        points: [
          "grupos y alumnos",
          "calificaciones",
          "progreso por curso",
          "seguimiento académico",
          "desempeño",
        ],
      },
      measure: {
        kicker: "12",
        title: "Validación",
        intro:
          "No siempre había tiempo para hacer pruebas formales antes del desarrollo. Muchas veces validábamos internamente, publicábamos y después revisábamos el comportamiento real para decidir el siguiente ajuste.",
        sources: [
          {
            title: "Google Analytics",
            body: "dispositivos · navegadores · tráfico · uso",
          },
          {
            title: "Datos internos",
            body: "progreso · finalización · calificaciones · desempeño",
          },
          {
            title: "Soporte",
            body: "errores · compatibilidad · navegación",
          },
          {
            title: "Comentarios",
            body: "alumnos · docentes · equipo académico",
          },
        ],
        loop: ["publicar", "revisar", "ajustar", "volver a publicar"],
      },
      impact: {
        kicker: "13",
        title: "Resultados",
        intro:
          "Parte del cambio se veía en Analytics y otra parte en soporte. Los problemas de compatibilidad y navegación que antes aparecían con frecuencia fueron dejando de ser tickets recurrentes.",
        stats: [
          {
            value: "≈20%",
            label: "más uso desde mobile",
            note: "Aumento aproximado que recuerdo durante la transición responsive.",
          },
          {
            value: "30+",
            label: "tipos de interacción",
            note: "Distintas actividades construidas sobre reglas compartidas.",
          },
          {
            value: "6",
            label: "áreas profesionales",
            note: "Contenido de inglés aplicado a diferentes campos académicos.",
          },
        ],
        supportTitle: "Soporte",
        supportBody:
          "Antes era común recibir reportes de pantallas blancas, incompatibilidad de navegador o actividades que no abrían desde celular. Después de migrar más contenido a web y mejorar el responsive, ese tipo de reporte se volvió poco frecuente.",
        productTitle: "Adopción del producto",
        productBody:
          "mironline empezó como complemento de los libros, pero terminó ocupando más espacio en demostraciones y congresos. Las experiencias interactivas y Professional English servían para mostrar el producto frente a otras instituciones.",
      },
      beyond: {
        kicker: "14",
        title: "Evolución del producto",
        body: [
          "Durante mi tiempo en el Centro de Lenguas participé en congresos donde se presentaban los libros y mironline a docentes, universidades y editoriales. En las demostraciones se mostraban algunas de las actividades más visuales, incluidos modelos 3D.",
          "Ver el producto fuera del entorno diario de desarrollo ayudaba a entender qué partes eran fáciles de explicar y cuáles necesitaban más trabajo dentro de la propia plataforma.",
        ],
        quote:
          "Después de mironline empecé a pensar mucho más en los problemas que una persona puede tener antes de que necesite escribir a soporte.",
      },
    },
    assetLabels: {
      dashboard: "Dashboard del estudiante",
      player: "Learning player",
      before: "Primera propuesta",
      after: "Solución",
      responsive: "Comportamiento responsive",
      system: "Sistema de componentes",
      studentUser: "Perfil de estudiante",
      teacherUser: "Perfil de docente",
      teacher: "Vista para docentes",
      analytics: "Analytics y reportes internos",
      beyond: "Libros, plataforma y congresos",
      research: "Evidencia y señales de uso",
      process: "Proceso de diseño e implementación",
      gallery: "Galería de interacciones",
      problem: "Síntesis de investigación y hallazgos",
    },
    cta: {
      label: "FIN DEL CASO",
      title: "mironline",
      body:
        "Este proyecto fue donde empecé a trabajar diseño e implementación como partes del mismo proceso.",
      button: "Volver a proyectos",
    },
  },
  en: {
    meta: {
      title: "mironline · Case study | Guigolo",
      description:
        "mironline case study: UX/UI design and frontend work during the transition from Flash-based activities to a responsive web platform.",
    },
    back: "Back to projects",
    eyebrow: "CASE STUDY · EDTECH · 2021—2023",
    title: "mironline",
    headline: "Design and frontend work for an education platform moving to responsive web.",
    intro:
      "Between 2021 and 2023 I worked on mironline as a UI/UX Designer + Frontend. I translated learning content into interfaces, implemented much of the frontend, and reviewed what happened after release to decide what needed another pass.",
    facts: [
      { label: "ROLE", value: "UI/UX Designer + Frontend" },
      { label: "PERIOD", value: "Oct 2021 — Oct 2023" },
      { label: "PRODUCT", value: "English learning platform" },
      {
        label: "STACK",
        value:
          "Figma · HTML · CSS · JavaScript · Bootstrap · jQuery · GitLab · Google Analytics",
      },
    ],
    quickStats: [
      {
        value: "30+",
        label: "interaction types",
        note: "Exercises for practice, assessment and feedback.",
      },
      {
        value: "6",
        label: "Professional English areas",
        note: "Content tied to different fields of study.",
      },
      {
        value: "≈20%",
        label: "more mobile usage",
        note: "Approximate increase I remember during the responsive phase.",
      },
    ],
    nav: [
      { id: "context", label: "Context" },
      { id: "problem", label: "Problem" },
      { id: "audience", label: "Users" },
      { id: "scope", label: "Scope" },
      { id: "research", label: "Research" },
      { id: "definition", label: "Definition" },
      { id: "ideation", label: "Ideation" },
      { id: "iteration", label: "Iteration" },
      { id: "system", label: "System" },
      { id: "validation", label: "Validation" },
      { id: "results", label: "Results" },
    ],
    sections: {
      product: {
        kicker: "01",
        title: "Context",
        body: [
          "mironline supported English courses for high school and university students. Students worked with teachers and books, while the platform handled practice, activities and progress tracking.",
          "Alongside General English there was Professional English. Activities changed depending on the student's field of study, so the product needed to support very different formats without losing consistency.",
        ],
        ecosystem: [
          { label: "CLASS", value: "Teacher + syllabus" },
          { label: "BOOK", value: "Content + sequence" },
          { label: "MIRONLINE", value: "Digital practice" },
          { label: "DATA", value: "Progress + performance" },
        ],
      },
      audience: {
        kicker: "03",
        title: "Who uses mironline",
        intro:
          "The platform had two main journeys. Students used it to practice and move through a course; teachers needed to review groups, grades and progress. Their needs were different, but both depended on the same academic information.",
        profiles: [
          {
            typeLabel: "Primary user",
            role: "Student",
            context:
              "Practices English within a course and completes activities on desktop, tablet or mobile.",
            needs: [
              "Understand what to do in each activity.",
              "Keep relevant context available while answering.",
              "Receive feedback after an answer.",
              "Check progress within the course.",
            ],
            story:
              "As a student, I need the content I am using to remain available while I answer, so I do not lose context.",
            asset: "studentUser",
          },
          {
            typeLabel: "Follow-up user",
            role: "Teacher",
            context:
              "Follows groups and reviews how students are progressing through their courses.",
            needs: [
              "Check groups and students.",
              "Review grades.",
              "See progress and performance.",
              "Follow academic progress without navigating through too many screens.",
            ],
            story:
              "As a teacher, I need to review progress, grades and performance by group, so I can follow the course.",
            asset: "teacherUser",
          },
        ],
        storyLabel: "Need summary",
        architectureTitle: "How information was organized",
        architectureIntro:
          "mironline connected student practice with the information teachers needed for academic follow-up.",
        architecture: [
          {
            label: "Student",
            items: ["Course", "Content and activities", "Feedback", "Progress"],
          },
          {
            label: "Teacher",
            items: ["Groups", "Students", "Grades", "Follow-up"],
          },
        ],
        flowTitle: "Student main flow",
        flow: [
          "Enter course",
          "Open activity",
          "Read instruction",
          "Answer",
          "Receive feedback",
          "Continue",
        ],
        note:
          "These profiles and needs summarize patterns observed during the work; they are not fictional personas created for the portfolio.",
      },
      challenge: {
        kicker: "02",
        title: "The problem",
        statement:
          "The academic content was still useful, but an important part of the experience depended on technology that was getting in the way of using it normally.",
        context: [
          "When my role shifted to UI/UX + frontend in 2021, mironline already had years of published courses and activities. Many had been built with Flash and were designed mainly for desktop use.",
          "For a student, this did not look like a technical decision: it looked like a blank screen, an exercise that would not open on a phone, an unsupported-browser message or a player that took too long to load.",
          "Part of my work also included reviewing reports that reached support and talking with the academic team about what was failing. Those signals, together with Analytics and internal usage data, helped decide what needed to be migrated or adjusted first.",
          "The challenge was not to copy every Flash screen into HTML. Each exercise still had to preserve what it was meant to teach or assess while being rebuilt for the web, responsive layouts and current browsers.",
        ],
        reportsTitle: "What the student experienced",
        reports: [
          { label: "Screen", body: "The activity is just a blank screen." },
          { label: "Mobile", body: "It does not open on my phone." },
          { label: "Browser", body: "The browser says it is unsupported." },
          { label: "Loading", body: "The player takes too long to load." },
        ],
        constraintsTitle: "What the solution had to preserve",
        constraints: [
          "The learning goal of each activity.",
          "Use across desktop, tablet and mobile.",
          "Compatibility across browsers and devices.",
          "Shared rules across different exercises.",
        ],
      },
      role: {
        kicker: "03",
        title: "Scope and role",
        body: [
          "Activities usually started as Word documents prepared by teachers and instructional designers. I defined how that content would become an interaction: hierarchy, instructions, controls, states, feedback and responsive behavior.",
          "I then implemented most of the frontend with HTML, CSS and JavaScript. Design and development stayed close, which made it easier to adjust a solution while it was still being built.",
        ],
        teamTitle: "Team",
        team: [
          "1 developer",
          "1 graphic designer",
          "teachers",
          "instructional designers",
          "pedagogues",
        ],
        workflowTitle: "Workflow",
        workflow: [
          "understand the activity",
          "define interaction",
          "test or prototype",
          "implement",
          "release",
          "review data and comments",
          "adjust",
        ],
        workingTitle: "Ways of working",
        workingBody:
          "The work was iterative and close to an agile way of working: understand, define, prototype or test technically, implement, release and adjust. For UX, I used research, prototyping and validation practices as each problem required, rather than forcing a full framework every time.",
        reverseTitle: "Technical exploration",
        reverseBody:
          "For integrations such as Sketchfab, I first tested what the API allowed. Once the interaction worked, I documented the pattern in Figma so it could be reused later.",
      },
      research: {
        kicker: "04",
        title: "Research",
        intro:
          "Decisions came from several sources already present in the day-to-day work. Not everything was a formal research session; sometimes the problem showed up in support, Analytics or comments from students and teachers after a release.",
        signals: [
          {
            title: "Support",
            body:
              "Tickets about compatibility, navigation, blank screens and activities that failed to load.",
          },
          {
            title: "Google Analytics",
            body: "Traffic, devices, browsers and general usage behavior.",
          },
          {
            title: "Internal data",
            body: "Progress, grades, performance and activity completion.",
          },
          {
            title: "Students and teachers",
            body:
              "Post-release comments and direct conversations in the academic environment.",
          },
        ],
      },
      principles: {
        kicker: "05",
        title: "Definition",
        items: [
          {
            title: "Available context",
            body:
              "Information needed to answer should stay nearby, especially in readings and longer exercises.",
          },
          {
            title: "Task focus",
            body:
              "The screen should show what matters for the current step and reduce competing elements.",
          },
          {
            title: "Shared patterns",
            body:
              "Buttons, states and feedback should behave consistently even when the activity type changes.",
          },
        ],
      },
      player: {
        kicker: "06",
        title: "Ideation",
        intro:
          "Using those criteria, I designed and reused patterns for different learning goals. Some activities were simple; others combined reading, audio, video or 3D models.",
        statLabel: "30+ interaction patterns",
        interactions: [
          {
            title: "Multiple choice",
            body:
              "Questions with two, three or four options and clear selection, error and success states.",
            meta: "CHOICE",
          },
          {
            title: "Reading",
            body:
              "Reading tasks with different ways to keep the text available while students answered.",
            meta: "READ",
          },
          {
            title: "Fill in the blank",
            body:
              "Inputs inside sentences with feedback after the student submits an answer.",
            meta: "WRITE",
          },
          {
            title: "Matching & ordering",
            body: "Exercises for matching items or ordering parts of a sentence.",
            meta: "MATCH",
          },
          {
            title: "Audio + text",
            body:
              "Readings where the text was highlighted in sync with the audio.",
            meta: "LISTEN",
          },
          {
            title: "3D models",
            body:
              "Navigable models with hotspots, hints, questions and feedback.",
            meta: "EXPLORE",
          },
        ],
      },
      iteration: {
        kicker: "07",
        title: "Hypothesis and iteration",
        intro:
          "One activity combined a reading with ten questions. The first version displayed everything at once. After release, comments started to point to the amount of content on screen.",
        beforeTitle: "First proposal",
        beforeBody: "Full reading and ten visible questions in one view.",
        afterTitle: "Solution",
        afterBody: "Reading always available and one question per step.",
        feedbackTitle: "Findings",
        feedback: [
          "Students felt there was too much content on one page.",
          "Teachers wanted the reading to stay available while students answered.",
          "Hiding and reopening the text added unnecessary steps.",
        ],
        outcomeTitle: "Validation",
        outcomeBody:
          "After the change, comments improved and completion was higher than in denser variants.",
      },
      system: {
        kicker: "08",
        title: "Design system",
        intro:
          "With more than 30 interaction types, solving every screen from scratch stopped being practical. I built components and rules in Figma based on what was already working in production.",
        points: [
          "colors and spacing",
          "buttons and inputs",
          "variants and states",
          "error and success feedback",
          "reusable components",
          "responsive",
          "light and dark mode",
        ],
        designToCodeLabel: "Design → Code",
        designToCode: "Figma → component → frontend → review",
        codeToDesignLabel: "Code → Design",
        codeToDesign:
          "code test → adjustment → working pattern → Figma documentation",
      },
      responsive: {
        kicker: "09",
        title: "Responsive adaptation",
        intro:
          "Mobile stopped being treated as a reduced desktop version. Each activity was reviewed based on available space and the type of interaction.",
        points: [
          "Reorder content when needed.",
          "Keep controls and states easy to find.",
          "Avoid interactions that depend on hover.",
          "Review activities across browsers and screen sizes.",
        ],
      },
      professional: {
        kicker: "10",
        title: "Specialized application",
        intro:
          "Professional English applied the same system to content across six academic areas. The interaction had to fit the vocabulary and situation being practiced.",
        areasTitle: "Professional English areas",
        areas: [
          "Agriculture and Environment",
          "Computer Science",
          "Social Sciences and Humanities",
          "Construction and Engineering",
          "Health Sciences",
          "Economics and Administration",
        ],
        threeDTitle: "3D interaction",
        threeDBody:
          "For some Health Sciences activities I worked with models prepared in Blender and 3ds Max and integrated through Sketchfab. I added hotspots, questions, hints and feedback around the model.",
        flowTitle: "Interaction flow",
        threeDSteps: [
          "explore",
          "locate",
          "check a hint",
          "answer",
          "view feedback",
        ],
        interactiveLabel: "Interactive 3D",
        externalLabel: "View on Sketchfab",
      },
      teachers: {
        kicker: "11",
        title: "Teacher experience",
        intro:
          "The platform also included views for groups, grades, progress and academic follow-up. Here the challenge was organizing more information without making it slow to scan.",
        points: [
          "groups and students",
          "grades",
          "course progress",
          "academic follow-up",
          "performance",
        ],
      },
      measure: {
        kicker: "12",
        title: "Validation",
        intro:
          "There was not always time for formal testing before development. We often validated internally, released, and then reviewed real behavior to decide the next adjustment.",
        sources: [
          {
            title: "Google Analytics",
            body: "devices · browsers · traffic · usage",
          },
          {
            title: "Internal data",
            body: "progress · completion · grades · performance",
          },
          {
            title: "Support",
            body: "errors · compatibility · navigation",
          },
          {
            title: "Comments",
            body: "students · teachers · academic team",
          },
        ],
        loop: ["release", "review", "adjust", "release again"],
      },
      impact: {
        kicker: "13",
        title: "Results",
        intro:
          "Part of the change showed up in Analytics and part of it in support. Compatibility and navigation issues that used to appear frequently stopped being recurring tickets.",
        stats: [
          {
            value: "≈20%",
            label: "more mobile usage",
            note: "Approximate increase I remember during the responsive transition.",
          },
          {
            value: "30+",
            label: "interaction types",
            note: "Different activities built on shared rules.",
          },
          {
            value: "6",
            label: "professional areas",
            note: "English content applied to different academic fields.",
          },
        ],
        supportTitle: "Support",
        supportBody:
          "Blank screens, browser incompatibility and activities that would not open on mobile used to be common reports. After moving more content to the web and improving responsive behavior, those reports became uncommon.",
        productTitle: "Product adoption",
        productBody:
          "mironline started as a companion to the books, but it gradually took a larger role in demos and conferences. Interactive exercises and Professional English helped present the product to other institutions.",
      },
      beyond: {
        kicker: "14",
        title: "Product evolution",
        body: [
          "During my time at the Language Center I took part in conferences where the books and mironline were presented to teachers, universities and publishers. Demos included some of the more visual activities, including 3D models.",
          "Seeing the product outside day-to-day development made it easier to notice which parts were easy to explain and which still needed work inside the platform.",
        ],
        quote:
          "After mironline I started thinking much more about the problems a person might hit before they ever need to contact support.",
      },
    },
    assetLabels: {
      dashboard: "Student dashboard",
      player: "Learning player",
      before: "First proposal",
      after: "Solution",
      responsive: "Responsive behavior",
      system: "Component system",
      studentUser: "Student profile",
      teacherUser: "Teacher profile",
      teacher: "Teacher view",
      analytics: "Analytics and internal reporting",
      beyond: "Books, platform and conferences",
      research: "Usage evidence and signals",
      process: "Design and implementation process",
      gallery: "Interaction gallery",
      problem: "Research synthesis and findings",
    },
    cta: {
      label: "END OF CASE",
      title: "mironline",
      body:
        "This project was where design and implementation started to become parts of the same process for me.",
      button: "Back to projects",
    },
  },
};
