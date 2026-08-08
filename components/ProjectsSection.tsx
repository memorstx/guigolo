"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ContactLink from "./ui/ContactLink";

type ProjectsCopy = {
  band: string;
  kicker: string;
  headline: string;
  prev: string;
  next: string;
  ctaBody: string;
  ctaButton: string;
};

type ProjectItem = {
  id: string;
  companyLogo: string;
  title?: string;
  sector?: string;
  description?: string[];
  stack?: string;
  role?: string;
  linkUrl?: string;
  linkLabel?: string;
  access?: string;
  image: string;
};

type Props = {
  items: ProjectItem[];
  copy: ProjectsCopy;
};

const AUTOPLAY_MS = 7500;
const PAUSE_AFTER_ACTION_MS = 12000;

export default function ProjectsSection({ items, copy }: Props) {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_MS,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      dragFree: false,
    },
    [autoplay]
  );

  const [selected, setSelected] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pauseTimerRef = useRef<number | null>(null);

  const safeStop = useCallback(() => {
    try {
      autoplay.stop();
    } catch {}
  }, [autoplay]);

  const safePlay = useCallback(() => {
    try {
      autoplay.play();
    } catch {}
  }, [autoplay]);

  const pauseAfterUserAction = useCallback(() => {
    safeStop();

    if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = window.setTimeout(() => {
      safePlay();
    }, PAUSE_AFTER_ACTION_MS);
  }, [safePlay, safeStop]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onPointerDown = useCallback(() => {
    setIsDragging(true);
    safeStop();
  }, [safeStop]);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
    pauseAfterUserAction();
  }, [pauseAfterUserAction]);

  useEffect(() => {
    if (!emblaApi) return;

    setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi, onPointerDown, onPointerUp, onSelect]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
    };
  }, []);

  const goPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    pauseAfterUserAction();
  }, [emblaApi, pauseAfterUserAction]);

  const goNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    pauseAfterUserAction();
  }, [emblaApi, pauseAfterUserAction]);

  const goTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      pauseAfterUserAction();
    },
    [emblaApi, pauseAfterUserAction]
  );

  return (
    <section id="projects" className="relative w-full bg-neutral-black-900">
      {/* Banda repetida (decor) */}
      <div className="pointer-events-none select-none overflow-hidden py-3">
        <div className="whitespace-nowrap text-[12px] tracking-[0.45em] text-neutral-white/10">
          {`${copy.band} · `.repeat(40)}
        </div>
      </div>

      {/* Header */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 pt-12 pb-10 text-center">
        <div className="text-[12px] tracking-[0.35em] text-accent-lime/80">
          {copy.kicker}
        </div>

        <h2 className="mt-4 heading-h2 tracking-tight uppercase">
          {copy.headline}
        </h2>
      </div>

      {/* Carrusel editorial: slide activo centrado + previews laterales */}
      <div className="w-full">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24">
          <div
            ref={emblaRef}
            data-projects-viewport
            onDragStart={(event) => event.preventDefault()}
            className={`overflow-hidden touch-pan-y select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            {/* IMPORTANTE: esta sigue siendo la primera .flex y cada slide conserva
                min-w-0 + flex-[0_0_100%] porque los logros/misiones observan esa estructura. */}
            <div className="flex -ml-4 md:-ml-6">
              {items.map((project, index) => (
                <div
                  key={project.id}
                  id={project.id}
                  data-project-slide={index}
                  className="min-w-0 flex flex-[0_0_100%] pl-4 md:basis-[88%] md:pl-6 xl:basis-[78%] 2xl:basis-[72%]"
                >
                  {/* Embla controla el transform del slide exterior cuando loop=true.
                      El efecto visual vive en este wrapper interno para no pelear con el motor. */}
                  <div
                    className={`
                      flex h-full w-full transform-gpu will-change-transform
                      transition-[opacity,transform] duration-500 ease-out
                      ${
                        selected === index
                          ? "scale-100 opacity-100"
                          : "scale-[0.985] opacity-45 md:opacity-55"
                      }
                    `}
                  >
                    <ProjectSlide
                      item={project}
                      index={index}
                      active={selected === index}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-6">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 md:gap-6 text-[12px] tracking-[0.25em] text-neutral-white/50">
            <div className="flex min-w-0 items-center justify-center gap-2 md:gap-3">
              {items.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${copy.kicker} ${index + 1}`}
                  aria-current={selected === index ? "true" : undefined}
                  className={`
                    h-[3px] transition-[width,background-color,opacity] duration-300
                    ${
                      selected === index
                        ? "w-10 bg-accent-lime opacity-100 md:w-14"
                        : "w-5 bg-neutral-white/20 opacity-70 hover:bg-neutral-white/40 md:w-8"
                    }
                  `}
                />
              ))}
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              <button
                type="button"
                onClick={goPrev}
                className="group inline-flex items-center gap-2 transition hover:text-neutral-white focus-visible:outline-none focus-visible:text-accent-lime"
              >
                <ArrowLeft />
                <span>{copy.prev}</span>
              </button>

              <button
                type="button"
                onClick={goNext}
                className="group inline-flex items-center gap-2 transition hover:text-neutral-white focus-visible:outline-none focus-visible:text-accent-lime"
              >
                <span>{copy.next}</span>
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* CTA final proyectos */}
        <div className="mx-auto px-6 md:px-12 lg:px-24 pb-12">
          <div className="mx-auto max-w-[56rem] border border-neutral-white/10 bg-neutral-black-800/40 p-6 md:p-8 text-center">
            <p className="text-neutral-white/70 text-[clamp(0.95rem,1.05vw,1.125rem)]">
              {copy.ctaBody}
            </p>

            <div className="mt-5 flex flex-wrap gap-4 justify-center">
              <ContactLink
                ctaId="projects-contact"
                className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full sm:w-auto text-center"
              >
                {copy.ctaButton}
              </ContactLink>
            </div>
          </div>
        </div>

        {/* Banda repetida (decor) */}
        <div className="pointer-events-none select-none overflow-hidden py-3">
          <div className="whitespace-nowrap text-[12px] tracking-[0.45em] text-neutral-white/10">
            {`${copy.band} · `.repeat(40)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectSlide({
  item,
  index,
  active,
}: {
  item: ProjectItem;
  index: number;
  active: boolean;
}) {
  const description = item.description ?? [];

  return (
    <article
      draggable={false}
      className={`
        relative h-full w-full overflow-hidden rounded-md border bg-neutral-black-800/35
        transition-[border-color,background-color,box-shadow] duration-500
        ${
          active
            ? "border-accent-lime/25 bg-neutral-black-800/55 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            : "border-neutral-white/10"
        }
      `}
    >
      {/* Acento superior y glow muy sutil, usando la misma paleta del sitio */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 z-20 h-px transition-opacity duration-500 ${
          active
            ? "bg-gradient-to-r from-transparent via-accent-lime/70 to-transparent opacity-100"
            : "bg-neutral-white/10 opacity-60"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 -top-24 z-0 h-64 w-64 rounded-full bg-accent-cyan-10 blur-3xl transition-opacity duration-500 ${
          active ? "opacity-60" : "opacity-0"
        }`}
      />

      <div className="relative z-10 grid h-full grid-cols-1 xl:grid-cols-[minmax(0,1.18fr)_minmax(300px,0.82fr)]">
        {/* IMAGEN: más contenida; sin crop y con sizes deliberadamente generoso para evitar pixelación */}
        <div className="order-1 flex border-b border-neutral-white/10 bg-neutral-black-900/35 p-4 md:p-5 xl:border-b-0 xl:border-r xl:p-5">
          <div className="relative aspect-[3/2] w-full self-start overflow-hidden rounded-md border border-neutral-white/10 bg-neutral-black-900">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-contain select-none"
              draggable={false}
              sizes="(min-width: 1536px) 48vw, (min-width: 1280px) 56vw, (min-width: 768px) 82vw, 100vw"
            />

            <div className="pointer-events-none absolute left-0 top-0 p-4 text-[10px] tracking-[0.28em] text-neutral-white/45">
              <span className="border border-neutral-white/10 bg-neutral-black-900/75 px-3 py-2 backdrop-blur-sm">
                CASE {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <CornerMarks />
          </div>
        </div>

        {/* INFO */}
        <div className="order-2 relative h-full">
          <div className="flex h-full flex-col px-6 py-7 sm:px-7 sm:py-8 md:px-8 md:py-8 xl:px-7 xl:py-7">
            <div className="flex items-start justify-between gap-4">
              <Image
                src={item.companyLogo}
                alt=""
                width={300}
                height={80}
                className="h-[28px] w-auto object-contain sm:h-[32px]"
                draggable={false}
                sizes="300px"
              />

              <div className="hidden text-[10px] tracking-[0.28em] text-neutral-white/25 sm:block">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            <h3 className="mt-4 heading-h3 tracking-tight">{item.title}</h3>

            <div className="mt-2 text-[14px] leading-relaxed text-neutral-white/70">
              {item.sector}
            </div>

            <div className="mt-5 space-y-3 text-[14px] leading-relaxed text-neutral-white/70">
              {description.map((text, descriptionIndex) => (
                <p key={descriptionIndex}>{text}</p>
              ))}
            </div>

            <div className="mt-auto border-t border-neutral-white/10 pt-5">
              <div className="grid grid-cols-[90px_1fr] gap-x-5 gap-y-3 text-[12px] leading-relaxed sm:grid-cols-[110px_1fr]">
                <SpecLabel>STACK</SpecLabel>
                <SpecValue>{item.stack}</SpecValue>

                <SpecLabel>ROLE</SpecLabel>
                <SpecValue>{item.role}</SpecValue>

                {item.access ? (
                  <>
                    <SpecLabel>ACCESS</SpecLabel>
                    <SpecValue className="min-w-0">
                      <Link
                        href={item.access}
                        draggable={false}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate underline decoration-neutral-white/20 underline-offset-4 transition hover:text-white hover:decoration-accent-lime/60"
                      >
                        {item.access}
                      </Link>
                    </SpecValue>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function SpecLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-neutral-white/45 tracking-[0.28em]">{children}</div>
  );
}

function SpecValue({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`text-neutral-white/75 ${className}`}>{children}</div>
  );
}

function ArrowLeft() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
      fill="none"
    >
      <path
        d="M16 10H4M4 10l4.5-4.5M4 10l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
    >
      <path
        d="M4 10h12M16 10l-4.5-4.5M16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CornerMarks() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-accent-lime/45" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-accent-lime/45" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-neutral-white/25" />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-neutral-white/25" />
    </div>
  );
}
