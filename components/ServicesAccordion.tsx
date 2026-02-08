"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { SERVICES } from "./services/servicesData";
import Link from "next/link";
import ContactLink from "@/components/ui/ContactLink";




type Props = {
  autoMs?: number;
  pauseMs?: number;
};

export default function ServicesAccordion({ autoMs = 50000, pauseMs = 45000 }: Props) {
  const items = useMemo(() => SERVICES, []);
  const [active, setActive] = useState(0);

  const intervalRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);

  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement | null>(null);

  const [desktopRailH, setDesktopRailH] = useState<number | null>(null);
  const [railW, setRailW] = useState<number>(0);

  const clearTimers = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    intervalRef.current = null;
    pauseTimeoutRef.current = null;
  };

  const startAutoplay = () => {
    clearTimers();
    intervalRef.current = window.setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, autoMs);
  };

  useEffect(() => {
    startAutoplay();
    return () => clearTimers();
  }, [autoMs, items.length]);

  const onSelect = (idx: number) => {
    setActive(idx);
    clearTimers();
    pauseTimeoutRef.current = window.setTimeout(() => {
      startAutoplay();
    }, pauseMs);
  };

  const ACTIVE_FLEX = 7;
  const INACTIVE_FLEX = 2;

  const activeShare =
    items.length <= 1
      ? 1
      : ACTIVE_FLEX / (ACTIVE_FLEX + (items.length - 1) * INACTIVE_FLEX);

  const measureWidthPx = railW > 0 ? Math.max(320, Math.floor(railW * activeShare)) : 0;

  useEffect(() => {
    const calc = () => {
      const hs = measureRefs.current
        .map((el) => (el ? el.getBoundingClientRect().height : 0))
        .filter((n) => n > 0);
      if (!hs.length) return;
      setDesktopRailH(Math.ceil(Math.max(...hs)));
    };

    const ro = new ResizeObserver(() => {
      const w = railRef.current?.getBoundingClientRect().width ?? 0;
      setRailW(Math.floor(w));
      requestAnimationFrame(calc);
    });

    if (railRef.current) ro.observe(railRef.current);
    measureRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });

    const onResize = () => {
      const w = railRef.current?.getBoundingClientRect().width ?? 0;
      setRailW(Math.floor(w));
      requestAnimationFrame(calc);
    };

    window.addEventListener("resize", onResize);
    requestAnimationFrame(onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [items.length]);

  return (
    <section id="services" className="mx-auto px-4 pb-24 pt-[120px] sm:pt-[48px] sm:px-[1rem] md:px-[48px] lg:px-[96px] xl:px-[128px] 2xl:px-[144px] 3xl:px-[244px] 4xl:px-[320px]">
      <div className="w-full mx-auto text-center">
        
        <p className="text-[12px] tracking-widest text-accent-lime/80">
          Cómo puedo ayudarte
        </p>

        <h2 className="mt-3 heading-h2 tracking-tight uppercase">
          Servicios enfocados en claridad, experiencia y resultados reales.
        </h2>


        <div className="mt-10">
          <div className="flex flex-col gap-3 md:hidden">
            {items.map((item, idx) => {
              const isActive = idx === active;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect(idx)}
                  className={[
                    "relative overflow-hidden text-left border border-neutral-gray-600/40",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/60",
                    "transition-[max-height,background-color,box-shadow,border-color] duration-500 ease-out",
                    "w-full",
                    isActive
                      ? "max-h-[60rem] bg-neutral-black-800 border-neutral-white/10 shadow-[0_0_3.75rem_rgba(0,0,0,0.65)]"
                      : "max-h-[5.75rem] bg-neutral-black-800/60 hover:border-neutral-white/10",
                  ].join(" ")}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-black-800/30 via-neutral-black-900/60 to-neutral-black-900" />

                  <div className="relative z-10 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] tracking-[0.96px] text-neutral-white/60 uppercase">
                          {item.iconLabel}
                        </p>
                        <h3 className="mt-2 text-heading-lg uppercase">
                          {item.title}
                        </h3>
                      </div>

                      <div
                        className={[
                          "shrink-0 border border-neutral-white/15",
                          "w-10 h-10 flex items-center justify-center",
                          isActive ? "bg-accent-cyan-10" : "bg-neutral-black-900/30",
                        ].join(" ")}
                        aria-hidden="true"
                      >
                        <span className="text-neutral-white/70 text-xs">✦</span>
                      </div>
                    </div>

                    <div
                      className={[
                        "transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "opacity-100 delay-100" : "opacity-0 delay-0",
                      ].join(" ")}
                      style={{ willChange: "opacity" }}
                    >
                      <div className="mt-6 flex items-center justify-center">
                        <div className="relative" style={{ width: "clamp(14rem, 60vw, 24rem)" }}>
                          <div className="relative aspect-square">
                            <Image src={item.imageSrc} alt={item.title} fill className="object-contain" sizes="100vw" />
                          </div>
                        </div>
                      </div>

                      <p className="mt-6 text-body-lg text-neutral-white/80 leading-[1.45] max-w-[36rem]">
                        {item.description}
                      </p>

                      
                    </div>

                    
                  </div>
                </button>
              );
            })}
          </div>

          <div className="hidden md:block">
            <div className="absolute -left-[99999px] -top-[99999px] opacity-0 pointer-events-none">
              <div className="flex gap-0">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    ref={(el) => {
                      measureRefs.current[idx] = el;
                    }}
                    style={{ width: measureWidthPx ? `${measureWidthPx}px` : "40vw" }}
                    className="border border-neutral-white/10 bg-neutral-black-800"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] tracking-[0.96px] text-neutral-white/60 uppercase">{item.iconLabel}</p>
                          <h3 className="mt-2 text-heading-lg uppercase">{item.title}</h3>
                        </div>
                        <div className="shrink-0 border border-neutral-white/15 w-10 h-10" />
                      </div>
                    </div>

                    <div className="px-6 pb-6">
                      <div className="mt-2 flex items-center justify-center">
                        <div className="relative" style={{ width: "clamp(12rem, 20vw, 20rem)" }}>
                          <div className="aspect-square" />
                        </div>
                      </div>

                      <p className="mt-6 text-body-lg text-neutral-white/80 leading-[1.45] max-w-[36rem]">{item.description}</p>
                      
                    </div>

                    
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full mx-auto py-24">
              <div
                ref={railRef}
                className="flex items-stretch w-full"
                style={{
                  height: desktopRailH ?? undefined,
                  minHeight: "clamp(22rem,32vw,36rem)",
                }}
              >
                {items.map((item, idx) => {
                  const isActive = idx === active;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelect(idx)}
                      className={[
                        "relative overflow-hidden text-left border min-w-0",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/60",
                        "transition-[flex,box-shadow,border-color,background-color] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                        "flex flex-col h-[110%] xl:h-[120%] 2xl:h-[130%]",
                        isActive
                          ? "bg-[radial-gradient(50%_75%_at_50%_57.28%,#0082ff26_0%,#000000_100%)] border-dashed border-2 shadow-[0_0_2rem_rgba(0,0,0,0.25)] border-neutral-white/50"
                          : "bg-neutral-black-800/40 border-dashed border-2 border-neutral-gray-600/40 hover:border-neutral-white/10",
                      ].join(" ")}
                      style={{
                        flex: isActive ? `${ACTIVE_FLEX} 1 0%` : `${INACTIVE_FLEX} 1 0%`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-neutral-black-800/30 via-neutral-black-900/60 to-neutral-black-900" />

                      <div
                        className={[
                          "absolute inset-0 transition-opacity duration-500",
                          isActive ? "opacity-0" : "opacity-100",
                        ].join(" ")}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative" style={{ width: "clamp(12rem, 20vw, 22rem)" }}>
                            <div className="relative aspect-square">
                              <Image
                                src={item.imageSrc}
                                alt=""
                                fill
                                className="object-contain grayscale opacity-35"
                                sizes="300px"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-neutral-black-900/75" />
                      </div>

                      <div className="relative z-10 p-6">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[10px] tracking-[0.96px] text-neutral-white/60 uppercase">
                              {item.iconLabel}
                            </p>
                            <h3 className="mt-2 text-heading-lg uppercase">
                              {item.title}
                            </h3>
                          </div>

                          <div
                            className={[
                              "shrink-0 border border-neutral-white/15",
                              "w-10 h-10 flex items-center justify-center",
                              isActive ? "bg-accent-cyan-10" : "bg-neutral-black-900/30",
                            ].join(" ")}
                            aria-hidden="true"
                          >
                            <span className="text-neutral-white/70 text-xs">✦</span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 px-6 pb-6 flex-1 flex flex-col min-w-0 justify-center items-center text-center">
                        <div className="mt-2 flex items-center justify-center">
                          <div
                            className={[
                              "relative transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                              isActive ? "opacity-100 delay-100" : "opacity-0 delay-0",
                            ].join(" ")}
                            style={{ width: "clamp(12rem, 18vw, 28rem)", willChange: "opacity" }}
                          >
                            <div className="relative aspect-square">
                              <Image src={item.imageSrc} alt={item.title} fill className="object-contain" sizes="320px" />
                            </div>
                          </div>
                        </div>

                        <div
                          className={[
                            "mt-6 transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
                            isActive ? "opacity-100 delay-100" : "opacity-0 delay-0 pointer-events-none select-none",
                          ].join(" ")}
                          style={{ willChange: "opacity" }}
                        >
                          <p className="text-[clamp(0.95rem,1.15vw,1.125rem)] leading-relaxed xl:text-[clamp(1.05rem,.95vw,1.2rem)] xl:leading-relaxed 2xl:text-[clamp(1.25rem,1.2vw,1.5rem)] text-neutral-white/70 max-w-[768px] xl:max-w-[1024px] 2xl:max-w-[1256px] text-center sm:text-center md:text-center">
                            {item.description}
                          </p>

                          
                        </div>

                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        {/* CTA final servicios */}
        <div className="mt-12 lg:mt-28 flex flex-col items-center gap-4">
           <p className="text-neutral-white/70 text-[clamp(0.95rem,1.05vw,1.125rem)] max-w-[56rem] text-center">
            ¿No sabes exactamente qué necesitas? No pasa nada: lo aterrizamos juntos.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <ContactLink
              ctaId="services-primary-contact"
              className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full sm:w-auto text-center"
            >
              Ayúdame a definirlo
            </ContactLink>

            <ContactLink
              ctaId="services-secondary-contact"
              className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition w-full sm:w-auto text-center"
            >
              No sé, pero quiero ayuda 😅
            </ContactLink>
          </div>
        </div>


        </div>


      </div>
    </section>
  );
}
