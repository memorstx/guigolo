"use client";

import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ProjectItem } from "@/components/projects/project.data";

type Props = {
  items: ProjectItem[];
};

export default function ProjectsSection({ items }: Props) {
  // Timings (decididos para “scan + lectura”)
  const AUTOPLAY_MS = 7500; // cambia solo cada 7.5s
  const PAUSE_AFTER_ACTION_MS = 12000; // si el usuario da click, le damos 12s para leer

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: AUTOPLAY_MS,
        stopOnInteraction: false, // no se apaga para siempre
        stopOnMouseEnter: true,   // hover pausa (desktop)
      }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [autoplay]
  );

  const [selected, setSelected] = useState(0);
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

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    // Si el usuario swipes/drag: también pausamos un ratito para que lea
    emblaApi.on("pointerUp", pauseAfterUserAction);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerUp", pauseAfterUserAction);
    };
  }, [emblaApi, onSelect, pauseAfterUserAction]);

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

  return (
    <section id="projects" className="relative w-full bg-neutral-black-900">
      {/* Banda repetida (decor) */}
      <div className="pointer-events-none select-none overflow-hidden py-3">
        <div className="whitespace-nowrap text-[12px] tracking-[0.45em] text-neutral-white/10">
          {"PROJECTS · ".repeat(40)}
        </div>
      </div>

      {/* Header centrado */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 pt-12 pb-10 text-center">
        <div className="text-[12px] tracking-[0.35em] text-accent-lime/80">
          PROJECTS
        </div>

        <h2 className="mt-4 heading-h2 tracking-tight uppercase">
          Proyectos reales que convierten ideas en producto
        </h2>
      </div>

      {/* Carrusel FULL-BLEED (sin padding externo) */}
      <div className="w-full">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {items.map((p) => (
              <div
                key={p.id}
                className="min-w-0 flex-[0_0_100%]"
              >
                <ProjectSlide item={p} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer: contador + prev/next */}
        <div className="mx-auto px-6 md:px-12 lg:px-24 py-6">
          <div className="flex items-center justify-between text-neutral-white/50 text-[12px] tracking-[0.25em]">
            <div>
              {String(selected + 1).padStart(1, "0")}/{items.length}
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={goPrev}
                className="hover:text-neutral-white transition"
              >
                PREVIOUS
              </button>

              <button
                type="button"
                onClick={goNext}
                className="hover:text-neutral-white transition"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>

        {/* CTA final proyectos */}
        <div className="mx-auto px-6 md:px-12 lg:px-24 pb-12">
          <div className="mx-auto max-w-[56rem] border border-neutral-white/10 bg-neutral-black-800/40 p-6 md:p-8 text-center">
            <p className="text-neutral-white/70 text-[clamp(0.95rem,1.05vw,1.125rem)]">
              ¿Quieres ver más o entender cómo trabajo?
            </p>

            <div className="mt-5 flex flex-wrap gap-4 justify-center">
              {
                /*
                
              <Link
                href="/projects"
                className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition w-full sm:w-auto text-center"
              >
                Ver todos los proyectos
              </Link>
                */

              }

              <Link
                href="#contacto"
                className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full sm:w-auto text-center"
              >
                Hablemos de tu proyecto
              </Link>
            </div>
          </div>
        </div>


        {/* Banda repetida (decor) */}
        <div className="pointer-events-none select-none overflow-hidden py-3">
          <div className="whitespace-nowrap text-[12px] tracking-[0.45em] text-neutral-white/10">
            {"PROJECTS · ".repeat(40)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectSlide({ item }: { item: ProjectItem }) {
  const isExternal = item.linkUrl.startsWith("http");
  return (
    <div className="w-full">
      <div
        className="
          grid grid-cols-1
          
          
          2xl:grid-cols-[1fr_minmax(420px,620px)]
          gap-0
        "
      >
        {/* ✅ PANEL INFO (en móvil arriba) */}
        <div
          className="
            order-1 2xl:order-2
            relative
            bg-neutral-black-900/25
            border-neutral-white/10
            border-b lg:border-b-0
            lg:border-l
          "
        >
          <div className="px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
            {/* logo */}
            <div className="flex items-center gap-3">
              <Image
                src={item.companyLogo}
                alt=""
                width={300}
                height={26}
                className="h-[28px] w-auto sm:h-[32px]"
                draggable={false}
              />
            </div>

            <h3 className="mt-4 heading-h3 tracking-tight">
              {item.title}
            </h3>

            <div className="mt-2 text-neutral-white/70 text-[14px] leading-relaxed">
              {item.sector}
            </div>

            {/* descripción */}
            <div className="mt-6 space-y-4 text-neutral-white/70 text-[14px] leading-relaxed">
              {item.description.map((t, idx) => (
                <p key={idx}>{t}</p>
              ))}
            </div>

            {/* specs */}
            <div className="mt-8 grid grid-cols-[100px_1fr] sm:grid-cols-[110px_1fr] gap-x-5 gap-y-3 text-[12px] leading-relaxed">
              <SpecLabel>STACK</SpecLabel>
              <SpecValue>{item.stack}</SpecValue>

              <SpecLabel>ROLE</SpecLabel>
              <SpecValue>{item.role}</SpecValue>

              <SpecLabel>LINK</SpecLabel>
              <SpecValue>
                
                
                <Link
                  href={item.linkUrl}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="hover:text-neutral-white transition underline decoration-neutral-white/20 hover:decoration-neutral-white/50"
                >
                  {item.linkLabel}
                </Link>
              </SpecValue>

              <SpecLabel>ACCESS</SpecLabel>
              <SpecValue className="opacity-50">
                {item.access ? item.access : "—"}
              </SpecValue>
            </div>
          </div>
        </div>

        {/* ✅ IMAGEN (en móvil abajo) */}
        <div className="order-2 2xl:order-1 relative w-full">
          <div className="relative w-full aspect-video overflow-hidden bg-neutral-black-900/40">
            <Image
              src={item.image}
              alt=""
              fill
              className="object-cover select-none"
              draggable={false}
              // sizes realistas: en desktop la imagen es grande, en móvil ocupa ancho completo
              sizes="(min-width: 1024px) calc(100vw - 520px), 100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}


function SpecLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-neutral-white/45 tracking-[0.28em]">
      {children}
    </div>
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
    <div className={`text-neutral-white/75 ${className}`}>
      {children}
    </div>
  );
}
