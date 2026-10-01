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
    history: {
      kicker: string;
      title: string;
      intro: string;
      productLabel: string;
      experienceLabel: string;
      milestones: Array<{
        year: string;
        title: string;
        body: string;
        activities?: string[];
        phase?: "product" | "ux";
      }>;
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
      teacherFlowTitle: string;
      teacherFlow: string[];
      relationTitle: string;
      relation: string;
      note: string;
    };
    pedagogy: {
      kicker: string;
      title: string;
      intro: string;
      body: string[];
      points: Card[];
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
    analysis: {
      kicker: string;
      title: string;
      intro: string;
      findingsTitle: string;
      findings: Card[];
      heuristicTitle: string;
      heuristicIntro: string;
      heuristics: Array<{
        title: string;
        issue: string;
        implication: string;
      }>;
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
      questionsTitle: string;
      questions: string[];
      sourcesTitle: string;
      signals: Card[];
      incidenceLabel: string;
      incidenceValue: string;
      incidenceNote: string;
      boardLabel: string;
      boardValue: string;
      boardNote: string;
      boardBreakdown: Array<{ label: string; value: string }>;
      hypothesesTitle: string;
      signalLabel: string;
      assumptionLabel: string;
      validationLabel: string;
      hypotheses: Array<{
        title: string;
        signal: string;
        assumption: string;
        validation: string;
      }>;
    };
    principles: {
      kicker: string;
      title: string;
      intro: string;
      challengeLabel: string;
      challenge: string;
      principlesLabel: string;
      items: Card[];
      criteriaTitle: string;
      criteria: string[];
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
    headline: "De Flash a una experiencia web responsive.",
    intro:
      "mironline combina práctica de inglés general y profesional con seguimiento académico para estudiantes y docentes de educación superior en Latinoamérica. Entre 2021 y 2023 participé en su etapa de modernización como UI/UX Designer + Frontend.",
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
      { id: "product", label: "Producto" },
      { id: "audience", label: "Usuarios" },
      { id: "problem", label: "Problema" },
      { id: "pedagogy", label: "Contexto pedagógico" },
      { id: "research", label: "Investigación" },
      { id: "analysis", label: "Análisis" },
      { id: "definition", label: "Definición" },
      { id: "scope", label: "Alcance" },
      { id: "ideation", label: "Ideación" },
      { id: "iteration", label: "Iteración" },
      { id: "system", label: "Sistema" },
      { id: "responsive", label: "Responsive" },
      { id: "professional", label: "Aplicación" },
      { id: "teacher", label: "Docentes" },
      { id: "validation", label: "Validación" },
      { id: "results", label: "Resultados" },
    ],
    sections: {
      product: {
        kicker: "01",
        title: "Contexto",
        body: [
          "mironline es una plataforma en línea de práctica de inglés para estudiantes y docentes de educación superior en Latinoamérica. Surgió como evolución de Make It Real! Online, el componente digital que complementaba una serie de libros con práctica adicional.",
          "El producto fue creciendo hasta integrar General English y Professional English: actividades de gramática, vocabulario, lectura y escritura, seguimiento de progreso y contenidos especializados por área profesional. También incorporó audio, video, modelos 3D y experiencias 360°.",
          "El libro marcaba parte de la secuencia académica; mironline extendía esa práctica en digital y conectaba lo que hacía el estudiante con la información que el docente necesitaba para dar seguimiento.",
        ],
        ecosystem: [
          { label: "LIBROS", value: "Contenido y secuencia" },
          { label: "GENERAL ENGLISH", value: "Práctica del idioma" },
          { label: "PROFESSIONAL ENGLISH", value: "6 áreas profesionales" },
          { label: "SEGUIMIENTO", value: "Progreso y desempeño" },
        ],
      },
      history: {
        kicker: "01",
        title: "Origen del producto",
        intro:
          "mironline evolucionó a partir de un producto que ya llevaba varios años acompañando materiales impresos y práctica digital.",
        productLabel: "Origen y evolución",
        experienceLabel: "UX / Producto",
        milestones: [
          {
            year: "2014",
            title: "Make It Real! Online",
            body: "Se consolida el componente digital de práctica que acompañaba a los materiales impresos.",
            phase: "product",
          },
          {
            year: "2017",
            title: "Adaptación para Latinoamérica",
            body: "El producto se reestructura para educación superior y contextos latinoamericanos.",
            phase: "product",
          },
          {
            year: "2017–2018",
            title: "mironline",
            body: "Se desarrolla el LMS y se amplía la práctica con General English y Professional English.",
            phase: "product",
          },
          {
            year: "2021–2023",
            title: "Modernización UX/UI",
            body: "Periodo documentado en este caso: migración web, responsive, sistema de interacción, validación e iteración.",
            phase: "product",
          },
        ],
      },
      audience: {
        kicker: "03",
        title: "Usuarios",
        intro:
          "La experiencia conectaba dos necesidades complementarias: practicar y avanzar en el curso, y dar seguimiento académico. Las láminas resumen el contexto de cada perfil; aquí destaco únicamente lo que condicionaba la interfaz.",
        profiles: [
          {
            typeLabel: "Usuario principal",
            role: "Estudiante",
            context:
              "Usa mironline para practicar y resolver actividades desde distintos dispositivos.",
            needs: [
              "Instrucciones claras por actividad.",
              "Contexto visible mientras responde.",
              "Feedback y avance fáciles de entender.",
            ],
            story:
              "Como estudiante, necesito mantener disponible el contenido que estoy usando mientras respondo, para no perder el contexto.",
            asset: "studentUser",
          },
          {
            typeLabel: "Usuario de seguimiento",
            role: "Docente",
            context:
              "Usa la plataforma para revisar cómo avanzan sus grupos y detectar dónde hace falta seguimiento.",
            needs: [
              "Consulta rápida por grupo y alumno.",
              "Progreso, calificaciones y desempeño.",
              "Seguimiento sin recorrer demasiadas pantallas.",
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
          "Revisar avance",
        ],
        teacherFlowTitle: "Flujo principal del docente",
        teacherFlow: [
          "Entrar a la plataforma",
          "Revisar grupos",
          "Consultar alumnos",
          "Ver progreso y calificaciones",
          "Detectar necesidades",
          "Dar seguimiento",
        ],
        relationTitle: "Cómo se relacionan",
        relation:
          "El estudiante genera actividad, respuestas y progreso; la plataforma organiza esa información para que el docente pueda revisar desempeño y dar seguimiento al curso.",
        note:
          "Estos perfiles condensan patrones reales de uso observados en estudiantes y docentes a lo largo del proyecto.",
      },
      pedagogy: {
        kicker: "04",
        title: "Análisis del contexto",
        intro:
          "mironline no era sólo una colección de ejercicios. Las decisiones de interfaz convivían con un modelo pedagógico, distintos niveles de inglés y necesidades concretas de estudiantes y docentes.",
        body: [
          "El material de trabajo del proyecto conectaba análisis situacional, necesidades del estudiante, uso del inglés en clase, ciclos de enseñanza y autonomía. Esa estructura ayudaba a entender por qué una interacción no podía diseñarse únicamente por apariencia.",
          "Para producto, esto se traducía en una condición simple: la tecnología debía hacer más accesible la actividad sin romper la intención académica que había detrás.",
        ],
        points: [
          {
            title: "Contexto antes que patrón",
            body: "Syllabus, necesidades de estudiantes y preparación docente condicionaban la experiencia.",
          },
          {
            title: "Más de una forma de aprender",
            body: "Texto, contenido, tareas, habilidades, comunicación y descubrimiento convivían en el mismo producto.",
          },
          {
            title: "Distintos niveles",
            body: "La experiencia debía funcionar para grupos mixtos y favorecer autonomía e interacción.",
          },
          {
            title: "Diseñar sin perder el objetivo",
            body: "Cada componente tenía que ser consistente sin convertir actividades distintas en la misma interacción.",
          },
        ],
      },
      challenge: {
        kicker: "02",
        title: "El problema",
        statement:
          "El contenido académico seguía siendo útil, pero una parte importante de la experiencia dependía de tecnología que ya impedía usarla con normalidad.",
        context: [
          "Para 2021, mironline ya acumulaba años de cursos y actividades publicadas. Parte de ese contenido dependía de Flash*, una tecnología utilizada durante años para ejecutar experiencias multimedia e interactivas dentro del navegador.",
          "Cuando los navegadores dejaron de soportarla, el problema se volvió visible para el usuario: pantallas en blanco, actividades que no abrían en celular, avisos de incompatibilidad o reproductores que tardaban demasiado.",
          "La modernización no consistía en copiar cada pantalla antigua a HTML. Cada actividad debía conservar lo que buscaba enseñar o evaluar mientras se reconstruía para web responsive y navegadores actuales.",
          "*Adobe terminó el soporte de Flash Player en 2020 y bloqueó su ejecución en 2021. La plataforma necesitaba sustituir esa dependencia por tecnologías web actuales.",
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
      analysis: {
        kicker: "06",
        title: "Analysis",
        intro:
          "Grouping reports, data and observations revealed recurring patterns. The issue was not one screen: there was technical friction, inconsistent activities and moments where students lost information needed to learn and answer.",
        findingsTitle: "Key findings",
        findings: [
          {
            title: "Compatibility",
            body: "Flash, browsers and desktop-first behavior were blocking activities that still had academic value.",
          },
          {
            title: "Continuity",
            body: "Readings, instructions and feedback needed to remain close to the task to prevent context loss.",
          },
          {
            title: "Consistency",
            body: "Different activities handled controls, states and navigation in different ways.",
          },
          {
            title: "Scalability",
            body: "With dozens of interaction types, solving each activity from scratch was no longer sustainable.",
          },
        ],
        heuristicTitle: "Heuristic lens",
        heuristicIntro:
          "As an analysis framework, several findings also align with established usability principles. This is not presented as a formal heuristic evaluation performed during the project, but as a way to relate observed problems to recognized design criteria.",
        heuristics: [
          {
            title: "Visibility of system status",
            issue: "Slow loading, unclear feedback and uncertainty about whether an answer had been recorded.",
            implication: "The interface needed to communicate loading, answers, errors, success and progress in a timely way.",
          },
          {
            title: "Consistency and standards",
            issue: "Controls, navigation and states varied across activity types.",
            implication: "Shared patterns reduced relearning between exercises.",
          },
          {
            title: "Recognition rather than recall",
            issue: "Students had to return to readings or instructions in order to answer.",
            implication: "Relevant context needed to remain visible or be recoverable with little effort.",
          },
          {
            title: "Error prevention and recovery",
            issue: "Incompatibilities, blocked activities and lost progress interrupted the task.",
            implication: "The experience needed to prevent dead ends and explain how to continue when something failed.",
          },
        ],
      },
      role: {
        kicker: "03",
        title: "Alcance y rol",
        body: [
          "Dentro de esa modernización, mi alcance cubría el recorrido entre contenido pedagógico, diseño de interacción y frontend. Las actividades solían comenzar como documentos preparados por docentes y diseño instruccional; el trabajo de producto consistía en convertirlos en una experiencia usable y consistente.",
          "Mi responsabilidad incluía definir jerarquía, instrucciones, controles, estados, feedback y comportamiento responsive, además de implementar gran parte de esas decisiones en HTML, CSS y JavaScript. Diseño y desarrollo ocurrían muy cerca, así que una solución podía ajustarse mientras se construía y después de publicarse.",
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
        kicker: "05",
        title: "Research",
        intro:
          "After identifying the technical friction, research needed to separate access problems from comprehension, cognitive-load and academic-follow-up problems. The question was not only whether an activity opened, but whether it let students learn, answer and continue without losing context.",
        questionsTitle: "Research questions",
        questions: [
          "At what point does an activity break and what prevents the student from continuing?",
          "What changes across desktop, tablet, mobile and different browsers?",
          "What information needs to remain visible while a student answers?",
          "What feedback confirms that an answer was recorded and what happens next?",
          "What does a teacher need to identify progress, lag or learning difficulties?",
          "Which learning goal must remain intact even when the interaction changes?",
        ],
        sourcesTitle: "Evidence sources",
        signals: [
          {
            title: "Support",
            body:
              "Tickets and reports about access, compatibility, navigation, blank screens and activities that failed to load.",
          },
          {
            title: "Google Analytics",
            body:
              "Devices, browsers, traffic and broad usage behavior.",
          },
          {
            title: "Academic data",
            body:
              "Progress, grades, performance and activity completion.",
          },
          {
            title: "Students and teachers",
            body:
              "Post-release comments, classroom questions and direct conversations about the learning experience.",
          },
        ],
        incidenceLabel: "Reported incidents",
        incidenceValue: "≈30%",
        incidenceNote:
          "During the observed period, the volume of support tickets and feedback placed incidents at roughly one third of active students. This is used as an operational project estimate rather than a census measurement.",
        boardLabel: "Synthesized user signals",
        boardValue: "25",
        boardNote:
          "Count of the visible student and teacher statements grouped in the analysis board; these are documented signals, not unique participants.",
        boardBreakdown: [
          { label: "Students", value: "13 · 52%" },
          { label: "Teachers", value: "12 · 48%" },
        ],
        hypothesesTitle: "Working hypotheses",
        signalLabel: "Signal",
        assumptionLabel: "Assumption",
        validationLabel: "Validate with",
        hypotheses: [
          {
            title: "Stable access",
            signal:
              "Blank screens, incompatibility, slow loading and blocked activities before the task even started.",
            assumption:
              "Removing legacy dependencies and normalizing compatibility should let more students start and finish activities without support.",
            validation:
              "Review support tickets, successful loading in current browsers and activity completion.",
          },
          {
            title: "Persistent context",
            signal:
              "Readings and instructions disappeared or were separated from the response area.",
            assumption:
              "Keeping required content close to the task should reduce memory load and improve continuity while answering.",
            validation:
              "Observe completion, reported questions and comments about reading, instructions and feedback.",
          },
          {
            title: "Lower cognitive load",
            signal:
              "Some activities presented too much information, too many questions and too many controls at once.",
            assumption:
              "Showing only what is needed for the current step should make the task easier to identify and continue.",
            validation:
              "Compare variants, review drop-off and record recurring questions during use.",
          },
          {
            title: "Visible academic follow-up",
            signal:
              "Teachers needed to review groups, progress, grades and performance across scattered information.",
            assumption:
              "Grouping information by group and student should make it faster to identify who needs follow-up.",
            validation:
              "Contrast the experience with teachers and review use of progress and grade views.",
          },
        ],
      },
      analysis: {
        kicker: "06",
        title: "Analysis",
        intro:
          "Grouping reports, usage data and observations revealed recurring patterns. The issue was not one screen: there was technical friction, inconsistent interactions and moments where students lost context.",
        findings: [
          {
            title: "Compatibility",
            body: "Flash, browser limitations and desktop-first behavior were blocking activities that still had academic value.",
          },
          {
            title: "Continuity",
            body: "Readings, instructions and feedback needed to remain close to the task to prevent context loss.",
          },
          {
            title: "Consistency",
            body: "Different activities handled controls, states and navigation in different ways.",
          },
          {
            title: "Scalability",
            body: "With dozens of interaction types, solving each activity from scratch was no longer sustainable.",
          },
        ],
      },
      role: {
        kicker: "03",
        title: "Scope and role",
        body: [
          "Within that modernization, my scope covered the path between learning content, interaction design and frontend. Activities often started as documents prepared by teachers and instructional designers; the product work was turning them into a usable and consistent experience.",
          "My responsibility included hierarchy, instructions, controls, states, feedback and responsive behavior, as well as implementing much of those decisions in HTML, CSS and JavaScript. Design and development stayed close, so a solution could be adjusted while it was being built and again after release.",
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
        kicker: "05",
        title: "Research",
        intro:
          "After identifying the technical friction, research focused on understanding where tasks broke, what changed across devices, and what information students and teachers needed in order to continue.",
        questionsTitle: "Research questions",
        questions: [
          "At what point does an activity break and what prevents the student from continuing?",
          "What changes across desktop, tablet and mobile?",
          "What information needs to remain visible while a student answers?",
          "What does a teacher need to review progress without navigating through too many screens?",
        ],
        sourcesTitle: "Evidence sources",
        signals: [
          {
            title: "Support",
            body:
              "Tickets and reports about compatibility, navigation, blank screens and activities that failed to load.",
          },
          {
            title: "Google Analytics",
            body:
              "Devices, browsers, traffic and broad usage behavior.",
          },
          {
            title: "Internal data",
            body:
              "Progress, grades, performance and activity completion.",
          },
          {
            title: "Students and teachers",
            body:
              "Post-release comments, classroom questions and direct conversations with the team.",
          },
        ],
        incidenceLabel: "Incidents during the period",
        incidenceValue: "≈3 in 10 students",
        incidenceNote:
          "Approximate figure remembered from the project: around three in ten students reported some kind of incident. Informal student comments and recurring teacher feedback added further context.",
        hypothesesTitle: "Working hypotheses",
        hypotheses: [
          {
            title: "Stabilize access",
            body:
              "Migrating legacy activities and resolving compatibility should reduce blocks before starting or continuing an activity.",
          },
          {
            title: "Keep context visible",
            body:
              "Keeping readings, instructions and feedback close to the task should reduce unnecessary steps and context loss.",
          },
          {
            title: "Make follow-up visible",
            body:
              "Grouping progress, grades and performance should make it easier for teachers to identify where follow-up is needed.",
          },
        ],
      },
      principles: {
        kicker: "06",
        title: "Definition",
        intro:
          "The synthesis did not become a feature list. We used it to define what needed to remain stable across activities and what could vary according to the learning goal.",
        challengeLabel: "Design challenge",
        challenge:
          "How could we migrate more than 30 interaction types to responsive web without losing the learning goal or designing every activity from scratch?",
        principlesLabel: "Design principles",
        items: [
          {
            title: "Context available",
            body:
              "Information needed to answer had to remain close, especially in readings and longer exercises.",
          },
          {
            title: "Focus per task",
            body:
              "The screen should show what is needed for the current step and reduce elements competing for attention.",
          },
          {
            title: "Shared patterns",
            body:
              "Buttons, states and feedback should behave consistently even when the activity type changed.",
          },
        ],
        criteriaTitle: "Acceptance criteria",
        criteria: [
          "Work in current browsers without depending on plugins.",
          "Adapt to desktop, tablet and mobile.",
          "Keep instructions, context and feedback available during the task.",
          "Reuse controls, states and rules across different exercise types.",
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
      problem: "Problem symptoms in the experience",
      analysis: "Findings synthesis",
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
