"use client";

import Image from "next/image";
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
