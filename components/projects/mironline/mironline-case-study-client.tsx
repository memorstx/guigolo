"use client";

import Image from "next/image";
import Script from "next/script";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import styles from "./mironline-case-study.module.css";

type Interaction = { title: string; body: string; meta: string };

type CompareCopy = {
  beforeTitle: string;
  beforeBody: string;
  afterTitle: string;
  afterBody: string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible ? "true" : "false"}
      className={`${styles.reveal} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ReadingMock({ focused = false }: { focused?: boolean }) {
  return (
    <div className="grid min-h-full gap-5 bg-neutral-black-900 p-5 md:grid-cols-[1.12fr_0.88fr] md:p-8">
      <div className="bg-neutral-black-800/60 p-5 md:p-7">
        <div className="h-2 w-28 bg-neutral-white/20" />
        <div className="mt-7 space-y-3">
          {Array.from({ length: 11 }).map((_, index) => (
            <div
              key={index}
              className={`h-[6px] bg-neutral-white/10 ${
                index % 4 === 0
                  ? "w-full"
                  : index % 4 === 1
                    ? "w-[88%]"
                    : index % 4 === 2
                      ? "w-[75%]"
                      : "w-[93%]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className={focused ? "flex flex-col justify-center" : "grid gap-3"}>
        {Array.from({ length: focused ? 1 : 5 }).map((_, index) => (
          <div key={index} className="bg-neutral-black-800/60 p-4 md:p-5">
            <div className="h-2 w-28 bg-neutral-white/20" />
            <div className="mt-4 space-y-2">
              <div className="h-10 bg-neutral-white/[0.035]" />
              <div className="h-10 bg-neutral-white/[0.035]" />
            </div>
          </div>
        ))}
        {focused ? <div className="mt-6 h-2 w-24 bg-accent-purple/60" /> : null}
      </div>
    </div>
  );
}

export function BeforeAfterCompare({
  beforeSrc,
  afterSrc,
  beforeExists,
  afterExists,
  copy,
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeExists: boolean;
  afterExists: boolean;
  copy: CompareCopy;
}) {
  const [position, setPosition] = useState(52);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const updateFromPointer = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(92, Math.max(8, next)));
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event.clientX);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    updateFromPointer(event.clientX);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div>
      <div
        ref={frameRef}
        className="relative aspect-[16/10] min-h-[360px] cursor-ew-resize overflow-hidden bg-neutral-black-900 select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          dragging.current = false;
        }}
      >
        <div className="absolute inset-0">
          {afterExists ? (
            <Image
              src={afterSrc}
              alt={copy.afterTitle}
              fill
              className="object-contain"
              sizes="100vw"
              draggable={false}
            />
          ) : (
            <ReadingMock focused />
          )}
        </div>

        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-neutral-black-900"
          style={{ width: `${position}%` }}
        >
          <div
            className="absolute inset-y-0 left-0"
            style={{ width: `${10000 / position}%` }}
          >
            {beforeExists ? (
              <Image
                src={beforeSrc}
                alt={copy.beforeTitle}
                fill
                className="object-contain"
                sizes="100vw"
                draggable={false}
              />
            ) : (
              <ReadingMock />
            )}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-20 w-px bg-accent-purple/90 shadow-[0_0_24px_rgba(188,167,255,0.30)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-neutral-black-900 shadow-[0_0_0_1px_rgba(188,167,255,.68)]">
            <span className="absolute inset-0 -rotate-45 grid place-items-center text-[13px] text-accent-purple">
              ↔
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute left-5 top-5 z-30 text-[10px] tracking-[0.2em] text-neutral-white/55 uppercase md:left-8 md:top-8">
          {copy.beforeTitle}
        </div>
        <div className="pointer-events-none absolute right-5 top-5 z-30 text-[10px] tracking-[0.2em] text-accent-purple/80 uppercase md:right-8 md:top-8">
          {copy.afterTitle}
        </div>
      </div>

      <div className="mt-7 grid gap-7 md:grid-cols-2 md:gap-12">
        <p className="text-[13px] leading-relaxed text-neutral-white/55 md:text-[14px]">
          {copy.beforeBody}
        </p>
        <p className="text-[13px] leading-relaxed text-neutral-white/75 md:text-[14px]">
          {copy.afterBody}
        </p>
      </div>
    </div>
  );
}

function InteractionMock({ selected }: { selected: number }) {
  const mode = selected % 6;

  if (mode === 0) {
    return (
      <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`min-h-20 p-5 ${
              index === 1 ? "bg-accent-cyan-10" : "bg-neutral-white/[0.035]"
            }`}
          >
            <div className="h-2 w-2/3 bg-neutral-white/20" />
          </div>
        ))}
      </div>
    );
  }

  if (mode === 1) {
    return (
      <div className="grid w-full max-w-4xl gap-5 md:grid-cols-[1.15fr_.85fr]">
        <div className="min-h-60 bg-neutral-white/[0.035] p-6">
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`h-[6px] bg-neutral-white/10 ${
                  index % 3 === 0 ? "w-full" : index % 3 === 1 ? "w-[84%]" : "w-[68%]"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center bg-neutral-white/[0.035] p-6">
          <div className="h-2 w-1/2 bg-neutral-white/20" />
          <div className="mt-6 h-11 bg-neutral-white/[0.05]" />
          <div className="mt-3 h-11 bg-neutral-white/[0.05]" />
        </div>
      </div>
    );
  }

  if (mode === 2) {
    return (
      <div className="w-full max-w-3xl">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="min-h-24 bg-neutral-white/[0.035] p-5">
              <div className="h-2 w-3/4 bg-neutral-white/20" />
              <div className="mt-7 h-7 w-16 bg-accent-purple/15" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mode === 3) {
    return (
      <div className="relative h-64 w-64 rounded-full bg-accent-cyan-10 shadow-[0_0_80px_rgba(20,177,255,.08)]">
        {[
          [24, 26],
          [58, 20],
          [42, 48],
          [68, 62],
          [22, 70],
        ].map(([left, top], index) => (
          <span
            key={index}
            className="absolute h-3 w-3 bg-accent-purple shadow-[0_0_18px_rgba(188,167,255,.28)]"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
      </div>
    );
  }

  if (mode === 4) {
    return (
      <div className="w-full max-w-4xl">
        <div className="mb-5 h-2 w-32 bg-neutral-white/20" />
        <div className="h-3 w-full overflow-hidden bg-neutral-white/[0.04]">
          <div className="h-full w-[64%] bg-accent-purple/45" />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_.7fr]">
          <div className="min-h-52 bg-neutral-white/[0.035]" />
          <div className="min-h-52 bg-accent-cyan-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl py-12">
      <div className="mx-auto h-1 w-[82%] bg-gradient-to-r from-transparent via-neutral-white/20 to-transparent" />
      <div className="mx-auto mt-12 flex max-w-2xl items-center justify-between gap-5">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`aspect-square flex-1 ${
              index === 1 ? "bg-accent-cyan-10" : "bg-neutral-white/[0.035]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function InteractionStage({ interactions }: { interactions: Interaction[] }) {
  const [selected, setSelected] = useState(0);
  const current = useMemo(
    () => interactions[selected] ?? interactions[0],
    [interactions, selected]
  );

  const previous = () =>
    setSelected((value) => (value - 1 + interactions.length) % interactions.length);
  const next = () => setSelected((value) => (value + 1) % interactions.length);

  return (
    <div className="relative overflow-hidden bg-[radial-gradient(60%_75%_at_50%_50%,rgba(20,177,255,0.09),rgba(16,16,16,0)_72%)]">
      <div className="absolute left-0 top-0 select-none text-[clamp(6rem,18vw,16rem)] font-bold leading-[.75] tracking-[-.08em] text-neutral-white/[0.025]">
        {String(selected + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10 grid min-h-[620px] items-center gap-10 py-10 lg:grid-cols-[.7fr_1.3fr] lg:py-16">
        <div className="self-end lg:self-center">
          <p className="text-[10px] tracking-[0.24em] text-accent-purple/75 uppercase">
            {current.meta}
          </p>
          <h3 className="mt-4 text-[clamp(2rem,4.5vw,4.8rem)] font-semibold leading-[1.02] tracking-[-.035em] text-neutral-white uppercase">
            {current.title}
          </h3>
          <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-neutral-white/60 md:text-[15px]">
            {current.body}
          </p>

          <div className="mt-9 flex items-center gap-7">
            <button
              type="button"
              onClick={previous}
              aria-label="Anterior"
              className="text-3xl text-neutral-white/40 transition hover:-translate-x-1 hover:text-neutral-white focus-visible:outline-none focus-visible:text-accent-purple"
            >
              ←
            </button>
            <div className="text-[11px] tracking-[0.2em] text-neutral-white/35">
              {String(selected + 1).padStart(2, "0")} / {String(interactions.length).padStart(2, "0")}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              className="text-3xl text-neutral-white/40 transition hover:translate-x-1 hover:text-neutral-white focus-visible:outline-none focus-visible:text-accent-purple"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative min-h-[390px] bg-neutral-white/[0.018] p-5 md:p-8 lg:min-h-[500px] lg:p-10">
          <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative z-10 flex min-h-[350px] items-center justify-center lg:min-h-[420px]">
            <InteractionMock selected={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}


type PanZoomInstance = {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  center: () => void;
  fit: () => void;
  resize: () => void;
  destroy: () => void;
};

type PanZoomFactory = (
  element: SVGSVGElement,
  options: {
    zoomEnabled: boolean;
    panEnabled: boolean;
    controlIconsEnabled: boolean;
    fit: boolean;
    center: boolean;
    minZoom: number;
    maxZoom: number;
    dblClickZoomEnabled: boolean;
    mouseWheelZoomEnabled: boolean;
  }
) => PanZoomInstance;

type PedagogyNode = {
  id: string;
  label: string;
  detail: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: "root" | "primary" | "secondary";
};

const pedagogyEdges = [
  ["root", "situational"],
  ["root", "needs"],
  ["root", "classroom"],
  ["root", "cycles"],
  ["root", "mixed"],
  ["situational", "syllabus"],
  ["situational", "students"],
  ["situational", "teachers"],
  ["syllabus", "context"],
  ["students", "specific"],
  ["teachers", "elt"],
  ["needs", "englishNeed"],
  ["needs", "reading"],
  ["englishNeed", "studyWork"],
  ["reading", "readingSkill"],
  ["classroom", "english"],
  ["english", "mainLanguage"],
  ["cycles", "teachingModel"],
  ["cycles", "communication"],
  ["mixed", "discovery"],
  ["discovery", "positive"],
  ["positive", "levels"],
  ["mixed", "spanishElt"],
  ["spanishElt", "cognates"],
  ["spanishElt", "nativeLanguage"],
] as const;

function pedagogyNodes(locale: "es" | "en"): PedagogyNode[] {
  const es = locale === "es";

  return [
    { id: "root", label: es ? "Racional pedagógico" : "Pedagogical rationale", detail: es ? "El material conectaba contexto, necesidades, enseñanza y autonomía dentro de una misma lógica." : "The material connected context, needs, teaching and learner autonomy within one rationale.", x: 570, y: 34, w: 260, h: 72, tone: "root" },
    { id: "situational", label: es ? "Análisis situacional" : "Situational analysis", detail: es ? "El diseño partía del contexto académico, el syllabus y las necesidades de estudiantes y docentes." : "The rationale started from the academic context, syllabus, and student and teacher needs.", x: 80, y: 160, w: 210, h: 62, tone: "primary" },
    { id: "needs", label: es ? "Necesidades del estudiante" : "Student needs analysis", detail: es ? "Se consideraban necesidades relacionadas con estudio, desarrollo profesional, trabajo y habilidades como lectura." : "Needs included study, professional development, work, and skills such as reading.", x: 350, y: 160, w: 220, h: 62, tone: "primary" },
    { id: "classroom", label: es ? "Inglés en clase" : "Classroom English", detail: es ? "El inglés se planteaba como lengua principal dentro de la experiencia de clase." : "English was positioned as the main classroom language.", x: 620, y: 160, w: 190, h: 62, tone: "primary" },
    { id: "cycles", label: es ? "Ciclos y comunicación" : "Teaching cycles & communication", detail: es ? "El enfoque combinaba enseñanza basada en texto, contenido, tareas y habilidades, con comunicación como parte del ciclo." : "The approach combined text-, content-, task- and skills-based teaching, with communication as part of the cycle.", x: 860, y: 160, w: 235, h: 62, tone: "primary" },
    { id: "mixed", label: es ? "Niveles mixtos y autonomía" : "Mixed levels & learner autonomy", detail: es ? "El enfoque contemplaba grupos con distintos niveles y promovía exploración, descubrimiento e interacción positiva." : "The approach considered mixed-level groups and promoted exploration, discovery and positive interaction.", x: 1140, y: 160, w: 230, h: 62, tone: "primary" },

    { id: "syllabus", label: "Syllabus", detail: es ? "El syllabus se evaluaba respecto al contexto UAEH." : "The syllabus was considered against the UAEH context.", x: 10, y: 300, w: 150, h: 54, tone: "secondary" },
    { id: "students", label: es ? "Estudiantes" : "Students", detail: es ? "El análisis situacional contemplaba necesidades específicas del alumnado." : "The situational analysis considered students' specific needs.", x: 175, y: 300, w: 150, h: 54, tone: "secondary" },
    { id: "teachers", label: es ? "Docentes" : "Teachers", detail: es ? "También se contemplaba la preparación ELT de los docentes." : "Teachers' ELT preparation was also considered.", x: 340, y: 300, w: 150, h: 54, tone: "secondary" },
    { id: "context", label: es ? "Contexto UAEH" : "UAEH context", detail: es ? "El documento señala que el syllabus no siempre era adecuado para el contexto." : "The source notes that the syllabus was not always appropriate for the context.", x: 10, y: 405, w: 150, h: 54, tone: "secondary" },
    { id: "specific", label: es ? "Necesidades específicas" : "Specific needs", detail: es ? "Las necesidades específicas del estudiante formaban parte del análisis." : "Students' specific needs were part of the analysis.", x: 175, y: 405, w: 150, h: 54, tone: "secondary" },
    { id: "elt", label: es ? "Preparación ELT" : "ELT preparation", detail: es ? "La preparación de los docentes era otra condición del contexto." : "Teacher preparation was another contextual condition.", x: 340, y: 405, w: 150, h: 54, tone: "secondary" },

    { id: "englishNeed", label: es ? "Necesidad de inglés" : "Need English", detail: es ? "El inglés se relacionaba con estudio, desarrollo profesional y trabajo." : "English was linked to study, professional development and work.", x: 360, y: 510, w: 180, h: 54, tone: "secondary" },
    { id: "reading", label: es ? "Lectura" : "Reading", detail: es ? "La lectura aparece identificada como una habilidad importante." : "Reading is identified as an important skill.", x: 555, y: 510, w: 150, h: 54, tone: "secondary" },
    { id: "studyWork", label: es ? "Estudio · desarrollo · trabajo" : "Study · development · work", detail: es ? "Tres contextos de uso señalados en el material." : "Three usage contexts identified in the source.", x: 345, y: 615, w: 210, h: 54, tone: "secondary" },
    { id: "readingSkill", label: es ? "Habilidad importante" : "Important skill", detail: es ? "La lectura se priorizaba dentro del aprendizaje." : "Reading was highlighted within the learning model.", x: 570, y: 615, w: 170, h: 54, tone: "secondary" },

    { id: "english", label: "English", detail: es ? "El idioma se colocaba al centro del trabajo en clase." : "English was placed at the center of classroom work.", x: 660, y: 300, w: 140, h: 54, tone: "secondary" },
    { id: "mainLanguage", label: es ? "Lengua principal" : "Main classroom language", detail: es ? "El documento lo describe como la lengua principal del aula." : "The source describes English as the main classroom language.", x: 645, y: 405, w: 175, h: 54, tone: "secondary" },

    { id: "teachingModel", label: es ? "Texto · contenido · tareas · habilidades" : "Text · content · tasks · skills", detail: es ? "La enseñanza combinaba distintos tipos de actividad y contenido." : "Teaching combined different types of activity and content.", x: 850, y: 300, w: 245, h: 54, tone: "secondary" },
    { id: "communication", label: es ? "Comunicación" : "Communication", detail: es ? "Cada ciclo de enseñanza comenzaba con comunicación." : "Each teaching cycle began with communication.", x: 925, y: 405, w: 170, h: 54, tone: "secondary" },

    { id: "discovery", label: es ? "Descubrimiento" : "Discovery approach", detail: es ? "El alumnado exploraba y descubría rasgos del idioma objetivo." : "Students explored and discovered features of the target language.", x: 1140, y: 300, w: 185, h: 54, tone: "secondary" },
    { id: "positive", label: es ? "Interacción positiva" : "Positive interaction", detail: es ? "El enfoque de descubrimiento buscaba promover interacción positiva." : "The discovery approach aimed to promote positive interaction.", x: 1140, y: 405, w: 185, h: 54, tone: "secondary" },
    { id: "levels", label: es ? "Alumnos con distintos niveles" : "Weaker & stronger students", detail: es ? "La interacción contemplaba alumnos con fortalezas y niveles distintos." : "Interaction considered students with different strengths and levels.", x: 1140, y: 510, w: 210, h: 54, tone: "secondary" },
    { id: "spanishElt", label: es ? "Español + ELT UAEH" : "Spanish + UAEH ELT", detail: es ? "El material conecta el contexto lingüístico local con la enseñanza de inglés." : "The material connects the local language context with English teaching.", x: 880, y: 510, w: 200, h: 54, tone: "secondary" },
    { id: "cognates", label: es ? "Uso de cognados" : "Use of cognates", detail: es ? "Los cognados aparecen como recurso dentro de ese contexto." : "Cognates appear as one resource within that context.", x: 810, y: 615, w: 165, h: 54, tone: "secondary" },
    { id: "nativeLanguage", label: es ? "Lengua materna común" : "Common native language", detail: es ? "Compartir lengua materna también formaba parte del contexto de aprendizaje." : "A common native language was also part of the learning context.", x: 990, y: 615, w: 185, h: 54, tone: "secondary" },
  ];
}

export function PedagogyMap({ locale }: { locale: "es" | "en" }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const panZoomRef = useRef<PanZoomInstance | null>(null);
  const [selectedId, setSelectedId] = useState("root");
  const nodes = useMemo(() => pedagogyNodes(locale), [locale]);
  const nodeById = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes]
  );
  const selected = nodeById.get(selectedId) ?? nodes[0];

  const initialize = useCallback(() => {
    if (!svgRef.current || panZoomRef.current) return;

    const factory = (
      window as unknown as { svgPanZoom?: PanZoomFactory }
    ).svgPanZoom;

    if (!factory) return;

    panZoomRef.current = factory(svgRef.current, {
      zoomEnabled: true,
      panEnabled: true,
      controlIconsEnabled: false,
      fit: true,
      center: true,
      minZoom: 0.55,
      maxZoom: 3.5,
      dblClickZoomEnabled: true,
      mouseWheelZoomEnabled: true,
    });
  }, []);

  useEffect(() => {
    initialize();

    const instance = panZoomRef.current;
    if (!instance || !svgRef.current) return;

    const observer = new ResizeObserver(() => {
      instance.resize();
      instance.fit();
      instance.center();
    });

    observer.observe(svgRef.current.parentElement ?? svgRef.current);

    return () => {
      observer.disconnect();
      instance.destroy();
      panZoomRef.current = null;
    };
  }, [initialize]);

  const fit = () => {
    panZoomRef.current?.resetZoom();
    panZoomRef.current?.fit();
    panZoomRef.current?.center();
  };

  return (
    <div className={styles.pedagogyMapShell}>
      <Script
        id="svg-pan-zoom"
        src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/dist/svg-pan-zoom.min.js"
        strategy="afterInteractive"
        onLoad={initialize}
      />

      <div className={styles.pedagogyToolbar}>
        <div>
          <p className={styles.microLabel}>
            {locale === "es" ? "MAPA INTERACTIVO" : "INTERACTIVE MAP"}
          </p>
          <p className={styles.pedagogyHint}>
            {locale === "es"
              ? "Arrastra para recorrer · usa zoom · selecciona un nodo"
              : "Drag to explore · zoom · select a node"}
          </p>
        </div>

        <div className={styles.pedagogyControls}>
          <button type="button" onClick={() => panZoomRef.current?.zoomOut()} aria-label={locale === "es" ? "Alejar" : "Zoom out"}>
            −
          </button>
          <button type="button" onClick={fit} aria-label={locale === "es" ? "Ajustar diagrama" : "Fit diagram"}>
            ↙↗
          </button>
          <button type="button" onClick={() => panZoomRef.current?.zoomIn()} aria-label={locale === "es" ? "Acercar" : "Zoom in"}>
            +
          </button>
        </div>
      </div>

      <div className={styles.pedagogyViewport}>
        <svg
          ref={svgRef}
          viewBox="0 0 1400 720"
          role="img"
          aria-label={
            locale === "es"
              ? "Mapa interactivo del contexto pedagógico de mironline"
              : "Interactive map of mironline's pedagogical context"
          }
        >
          <defs>
            <marker id="pedagogyArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" className={styles.pedagogyArrow} />
            </marker>
          </defs>

          <g className={styles.pedagogyScene}>
            {pedagogyEdges.map(([from, to]) => {
              const source = nodeById.get(from);
              const target = nodeById.get(to);
              if (!source || !target) return null;

              const x1 = source.x + source.w / 2;
              const y1 = source.y + source.h;
              const x2 = target.x + target.w / 2;
              const y2 = target.y;
              const midY = y1 + (y2 - y1) / 2;

              return (
                <path
                  key={`${from}-${to}`}
                  d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                  className={styles.pedagogyEdge}
                  markerEnd="url(#pedagogyArrow)"
                />
              );
            })}

            {nodes.map((node) => {
              const active = selectedId === node.id;

              return (
                <g
                  key={node.id}
                  role="button"
                  tabIndex={0}
                  aria-label={node.label}
                  onClick={() => setSelectedId(node.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedId(node.id);
                    }
                  }}
                  className={styles.pedagogyNode}
                  data-tone={node.tone}
                  data-active={active ? "true" : "false"}
                >
                  <rect x={node.x} y={node.y} width={node.w} height={node.h} rx="18" />
                  <foreignObject x={node.x + 14} y={node.y + 8} width={node.w - 28} height={node.h - 16}>
                    <div className={styles.pedagogyNodeLabel}>{node.label}</div>
                  </foreignObject>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className={styles.pedagogyDetail} aria-live="polite">
        <p className={styles.microLabel}>
          {locale === "es" ? "LECTURA DEL NODO" : "NODE DETAIL"}
        </p>
        <h3>{selected.label}</h3>
        <p>{selected.detail}</p>
      </div>
    </div>
  );
}
