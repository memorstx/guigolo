"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ProcessCard } from "./process/processStack.data";
import { PROCESS_STACK } from "./process/processStack.data";

type Props = {
  items?: ProcessCard[];
  title?: string;
  className?: string;
};

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function hash01(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

function pick<T>(arr: T[], t01: number) {
  return arr[Math.floor(t01 * arr.length) % arr.length];
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function ProcessStackScroll({
  items = PROCESS_STACK,
  title = "ASÍ CONVIERTO UNA IDEA EN UNA EXPERIENCIA REAL",
  className = "",
}: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const stickyWrapRef = useRef<HTMLDivElement | null>(null);

  const [vh, setVh] = useState(800);
  const [titleH, setTitleH] = useState(120);
  const [stickyH, setStickyH] = useState(600);
  const [scrollY, setScrollY] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      setVh(window.innerHeight || 800);

      const th = titleRef.current?.getBoundingClientRect().height ?? 120;
      setTitleH(Math.ceil(th));

      const sh = stickyWrapRef.current?.getBoundingClientRect().height ?? 600;
      setStickyH(Math.ceil(sh));
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (titleRef.current) ro.observe(titleRef.current);
    if (stickyWrapRef.current) ro.observe(stickyWrapRef.current);

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY || 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const stepPx = useMemo(() => Math.round(vh * 0.92), [vh]);
  const totalSteps = Math.max(0, items.length - 1);

  // ✅ Track = altura del sticky wrapper + (pasos) + aire final
  const trackH = useMemo(() => {
    const exitPad = Math.round(vh * 0.2);
    return stickyH + totalSteps * stepPx + exitPad;
  }, [stickyH, totalSteps, stepPx, vh]);

  const progress = useMemo(() => {
    const el = sectionRef.current;
    if (!el) return 0;

    const rect = el.getBoundingClientRect();
    const sectionTop = (window.scrollY || 0) + rect.top;

    // ✅ La animación corre mientras el sticky wrapper está “pegado”
    const start = sectionTop;
    const p = (scrollY - start) / stepPx;

    return clamp(p, 0, totalSteps);
  }, [scrollY, stepPx, totalSteps]);

  const jitter = useMemo(() => {
    const angles = [1, -1, 2, -2];
    const xs = [-8, -4, -2, 0, 2, 4, 8];
    const ys = [0, 2, 4, 6, 8];
    return items.map((it) => {
      const r1 = hash01(it.id + "_a");
      const r2 = hash01(it.id + "_x");
      const r3 = hash01(it.id + "_y");
      return {
        rot: pick(angles, r1),
        x: pick(xs, r2),
        y: pick(ys, r3),
      };
    });
  }, [items]);

  // antes: stackTop dependía de titleH + 24
  // ahora: stack va DENTRO del mismo sticky wrapper, así que solo usamos separaciones normales
  const stackGap = 14;

  return (
    <section
      ref={sectionRef}
      className={["relative w-full", className].join(" ")}
      style={{ minHeight: trackH }}
    >
      <div className="absolute inset-0 -z-10 bg-neutral-black-900" />

      {/* ✅ UN SOLO STICKY WRAPPER: título + stack */}
      <div
        ref={stickyWrapRef}
        className="sticky top-0 z-30 bg-neutral-black-900/85 backdrop-blur-[2px]"
      >
        {/* TÍTULO (ya NO es sticky) */}
        <div
          ref={titleRef}
          className={[
            "pt-16"
          ].join(" ")}
        >
          <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 pt-24 2xl:pt-32 md:pt-8 text-center">
            <div className="text-[12px] tracking-[0.35em] text-accent-lime/80">
              MI PROCESO
            </div>
            <h2 className="mt-4 heading-h2 tracking-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* stack zone */}
        <div
          className="z-20"
          style={{
            paddingTop: stackGap,
            height: Math.round(vh * 0.72) + stackGap,
          }}
        >
          <div className="mx-auto w-full px-4 xl:px-[128px] ">
            <div className="relative mx-auto w-full">
              {items.map((card, i) => {
                const rel = i - progress;

                const depthBehind = Math.max(0, Math.floor(-rel));
                const isIncoming = rel > 0 && rel < 1.25;
                const isVisible = rel <= 0.15 && depthBehind <= 4;
                const shouldRender = isVisible || isIncoming;
                if (!shouldRender) return null;

                const local = clamp(progress - Math.floor(progress), 0, 1);
                const t = easeOutExpo(local);

                const base = jitter[i];

                const incomingT = clamp(1 - rel, 0, 1);
                const incomingEase = easeOutExpo(incomingT);

                const depth = rel <= 0 ? clamp(-rel, 0, 4) : 0;

                const stackY = depth * 10 + base.y;
                const stackX = depth * 2 + base.x;

                const scale = 1 - depth * 0.03;
                const opacity = 1 - depth * 0.14;

                const riseFrom = 768; 
                const incomingY = lerp(riseFrom, 0, incomingEase);

                const rotControlled = rel <= 0 ? lerp(base.rot, 0, t * 0.05) : base.rot;

                const zIndex = 1000 - (rel > 0 ? 0 : Math.floor(depth) * 10);

                const cardW = "w-full max-w-[464px] md:max-w-[512px] lg:max-w-[640px]";
                const cardBase =
                  "border border-neutral-white/10 bg-[radial-gradient(56.49%_59.99%_at_58.01%_57.28%,#313133_0%,#0C0C0C_100%)]";

                return (
                  <article
                    key={card.id}
                    className={[
                      "absolute left-1/2 top-10 2xl:top-24",
                      "origin-center",
                      "rounded-none",
                      "shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
                      cardBase,
                      cardW,
                    ].join(" ")}
                    style={{
                      transform: `translate3d(-50%, ${isIncoming ? incomingY : stackY}px, 0) translate3d(${stackX}px, 0, 0) rotate(${rotControlled}deg) scale(${scale})`,
                      opacity: isIncoming ? 1 : opacity,
                      zIndex,
                      willChange: "transform, opacity",
                    }}
                  >
                    <div className="relative py-8 px-16 md:py-14 md:px-16">
                      <div className="absolute inset-0 pointer-events-none border border-neutral-white/10" />

                      <div className="text-neutral-white/10 font-semibold tracking-[0.12em] uppercase text-[clamp(1.25rem,4vw,2.2rem)] leading-none select-none">
                        {card.phase}
                      </div>

                      <h3 className="mt-4 text-neutral-white font-semibold tracking-[0.14em] uppercase text-[clamp(1.05rem,2.4vw,1.45rem)]">
                        {card.title}
                      </h3>

                      <p className="mt-4 text-body-premium">
                        {card.body}
                      </p>

                      {card.output ? (
                        <p className="mt-4 text-body-premium text-weight-100 text-neutral-white/60">
                          {card.output}
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              })}

              <div className="invisible select-none pointer-events-none h-[clamp(18rem,34vw,26rem)]" />
            </div>
          </div>
        </div>
      </div>

      {/* aire final */}
      <div style={{ height: Math.round(vh * 0.2) }} />
    </section>
  );
}
