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
  companyLogo?: string;
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
  locale: "es" | "en";
};

const AUTOPLAY_MS = 7500;
const PAUSE_AFTER_ACTION_MS = 12000;

function localizeHref(href: string | undefined, locale: "es" | "en") {
  if (!href || !href.startsWith("/")) return href;
  if (href.startsWith("/es/") || href.startsWith("/en/")) return href;
  return `/${locale}${href}`;
}

export default function ProjectsSection({ items, copy, locale }: Props) {
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
    { loop: true, align: "center", skipSnaps: false, dragFree: false },
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
    pauseTimerRef.current = window.setTimeout(safePlay, PAUSE_AFTER_ACTION_MS);
  }, [safePlay, safeStop]);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setSelected(emblaApi.selectedScrollSnap());
    const pointerDown = () => {
      setIsDragging(true);
      safeStop();
    };
    const pointerUp = () => {
      setIsDragging(false);
      pauseAfterUserAction();
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", pointerDown);
    emblaApi.on("pointerUp", pointerUp);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", pointerDown);
      emblaApi.off("pointerUp", pointerUp);
    };
  }, [emblaApi, onSelect, pauseAfterUserAction, safeStop]);

  useEffect(
    () => () => {
      if (pauseTimerRef.current) window.clearTimeout(pauseTimerRef.current);
    },
    []
  );

  const goPrev = () => {
    emblaApi?.scrollPrev();
    pauseAfterUserAction();
  };

  const goNext = () => {
    emblaApi?.scrollNext();
    pauseAfterUserAction();
  };

  const goTo = (index: number) => {
    emblaApi?.scrollTo(index);
    pauseAfterUserAction();
  };

  return (
    <section id="projects" className="relative w-full overflow-hidden bg-neutral-black-900">
      <div className="pointer-events-none select-none overflow-hidden py-3">
        <div className="whitespace-nowrap text-[12px] tracking-[0.45em] text-neutral-white/10">
          {`${copy.band} · `.repeat(40)}
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 pb-10 pt-12 text-center md:px-12 lg:px-24">
        <div className="text-[12px] tracking-[0.35em] text-accent-purple/80">
          {copy.kicker}
        </div>
        <h2 className="mt-4 heading-h2 tracking-tight uppercase">
          {copy.headline}
        </h2>
      </div>

      {/* El viewport es deliberadamente más ancho que el contenido de home.
          Así los slides vecinos siguen asomándose como en la versión original. */}
      <div className="mx-auto w-full max-w-[1500px] px-3 sm:px-5 md:px-8">
        <div
          ref={emblaRef}
          data-projects-viewport
          onDragStart={(event) => event.preventDefault()}
          className={`overflow-hidden touch-pan-y select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div className="flex -ml-4 md:-ml-6">
            {items.map((project, index) => (
              <div
                key={project.id}
                id={project.id}
                data-project-slide={index}
                className="min-w-0 flex flex-[0_0_94%] pl-4 sm:basis-[88%] md:basis-[82%] md:pl-6 lg:basis-[76%] xl:basis-[70%] 2xl:basis-[66%]"
              >
                <div
                  className={`flex h-full w-full transform-gpu will-change-transform transition-[opacity,transform] duration-500 ease-out ${
                    selected === index
                      ? "scale-100 opacity-100"
                      : "scale-[0.975] opacity-30 md:opacity-42"
                  }`}
                >
                  <ProjectSlide
                    item={{
                      ...project,
                      linkUrl: localizeHref(project.linkUrl, locale),
                    }}
                    index={index}
                    active={selected === index}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 text-[12px] tracking-[0.25em] text-neutral-white/50 md:gap-6">
          <div className="flex min-w-0 items-center justify-center gap-2 md:gap-3">
            {items.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`${copy.kicker} ${index + 1}`}
                aria-current={selected === index ? "true" : undefined}
                className={`h-[3px] transition-[width,background-color,opacity] duration-300 ${
                  selected === index
                    ? "w-10 bg-accent-purple md:w-14"
                    : "w-5 bg-neutral-white/20 hover:bg-accent-lime/70 md:w-8"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              type="button"
              onClick={goPrev}
              className="group inline-flex items-center gap-2 transition hover:text-neutral-white focus-visible:text-accent-purple focus-visible:outline-none"
            >
              <ArrowLeft />
              <span>{copy.prev}</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              className="group inline-flex items-center gap-2 transition hover:text-neutral-white focus-visible:text-accent-purple focus-visible:outline-none"
            >
              <span>{copy.next}</span>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto px-6 pb-12 md:px-12 lg:px-24">
        <div className="mx-auto max-w-[56rem] border border-neutral-white/10 bg-neutral-black-800/40 p-6 text-center md:p-8">
          <p className="text-[clamp(0.95rem,1.05vw,1.125rem)] text-neutral-white/70">
            {copy.ctaBody}
          </p>
          <div className="mt-5 flex justify-center">
            <ContactLink
              ctaId="projects-contact"
              className="w-full rounded-md bg-accent-purple px-6 py-3 text-center font-medium text-black sm:w-auto"
            >
              {copy.ctaButton}
            </ContactLink>
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
      className={`relative w-full overflow-hidden rounded-md border bg-neutral-black-800/45 transition-[border-color,background-color,box-shadow] duration-500 ${
        active
          ? "border-accent-purple/30 shadow-[0_28px_90px_rgba(0,0,0,.42)]"
          : "border-neutral-white/10"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 z-20 h-px ${
          active
            ? "bg-gradient-to-r from-transparent via-accent-purple/80 to-transparent"
            : "bg-neutral-white/10"
        }`}
      />

      {/* En desktop la proporción de la card parte de una imagen 1600×1000.
          La imagen ocupa toda su columna: no hay marco vertical ni huecos falsos. */}
      <div className="grid lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,.82fr)] lg:items-stretch">
        <ProjectMedia item={item} active={active} />

        <div className="flex min-h-0 flex-col border-t border-neutral-white/10 px-6 py-6 sm:px-7 md:px-8 lg:border-l lg:border-t-0 lg:px-7 lg:py-7 xl:px-8">
          <div className="flex items-start justify-between gap-4">
            {item.companyLogo ? (
              <Image
                src={item.companyLogo}
                alt=""
                width={300}
                height={80}
                className="h-[27px] w-auto object-contain sm:h-[30px]"
                draggable={false}
              />
            ) : (
              <span className="font-display text-[11px] tracking-[0.25em] text-accent-purple/80">
                product / digital
              </span>
            )}
            <span className="text-[10px] tracking-[0.25em] text-accent-lime/75">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-4 heading-h3 tracking-tight normal-case">{item.title}</h3>
          <p className="mt-1.5 text-[12px] leading-5 text-neutral-white/55 sm:text-[13px]">
            {item.sector}
          </p>

          <div className="mt-4 space-y-2.5 text-[12px] leading-[1.65] text-neutral-white/68 sm:text-[13px]">
            {description.map((text, descriptionIndex) => (
              <p key={descriptionIndex}>{text}</p>
            ))}
          </div>

          <div className="mt-auto pt-5">
            <div className="grid grid-cols-[64px_1fr] gap-x-4 gap-y-2.5 border-t border-neutral-white/10 pt-4 text-[10px] leading-5 sm:grid-cols-[76px_1fr] sm:text-[11px]">
              <SpecLabel>STACK</SpecLabel>
              <SpecValue>{item.stack}</SpecValue>
              <SpecLabel>ROLE</SpecLabel>
              <SpecValue>{item.role}</SpecValue>
            </div>

            {(item.linkUrl || item.access) && (
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-white/10 pt-4 text-[10px] tracking-[0.16em] sm:text-[11px]">
                {item.linkUrl ? (
                  <Link
                    href={item.linkUrl}
                    draggable={false}
                    className="group inline-flex items-center gap-2 text-accent-purple transition hover:text-neutral-white"
                  >
                    <span>{item.linkLabel ?? "Ver caso"}</span>
                    <ArrowUpRight />
                  </Link>
                ) : null}

                {item.access ? (
                  <Link
                    href={item.access}
                    target="_blank"
                    rel="noreferrer"
                    draggable={false}
                    className="group inline-flex min-w-0 items-center gap-2 text-accent-lime/65 transition hover:text-accent-lime"
                  >
                    <span className="max-w-[190px] truncate">{item.access}</span>
                    <ArrowUpRight />
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectMedia({ item, active }: { item: ProjectItem; active: boolean }) {
  return (
    <div className="relative aspect-[16/10] min-h-[260px] w-full overflow-hidden bg-neutral-black-900 lg:aspect-auto lg:min-h-[390px] xl:min-h-[410px]">
      <Image
        src={item.image}
        alt=""
        fill
        className="object-cover object-center select-none"
        draggable={false}
        sizes="(min-width: 1536px) 48vw, (min-width: 1280px) 50vw, (min-width: 1024px) 58vw, 100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-black-900/18 via-transparent to-neutral-black-900/5" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_14%,rgba(188,167,255,.09),transparent_33%),radial-gradient(circle_at_12%_86%,rgba(198,255,0,.045),transparent_28%)]" />
      {active ? (
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent-purple/20" />
      ) : null}
    </div>
  );
}

function SpecLabel({ children }: { children: React.ReactNode }) {
  return <div className="tracking-[0.2em] text-neutral-white/35">{children}</div>;
}

function SpecValue({ children }: { children: React.ReactNode }) {
  return <div className="text-neutral-white/70">{children}</div>;
}

function ArrowLeft() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none">
      <path d="M16 10H4M4 10l4.5-4.5M4 10l4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none">
      <path d="M4 10h12M16 10l-4.5-4.5M16 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none">
      <path d="M6 14L14 6M8 6h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
