"use client";

import { useMemo, useState } from "react";
import type { FAQItem } from "./faq/faq.data.ts";

type Props = {
  items: FAQItem[];
  defaultOpenId?: string;
};

export default function FAQSection({ items, defaultOpenId }: Props) {
  const firstId = items[0]?.id;
  const initial = defaultOpenId ?? firstId ?? null;

  const [openId, setOpenId] = useState<string | null>(initial);

  const onToggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <section id="faq" className="relative w-full bg-neutral-black-900">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-20">
        {/* Title */}
        <h2 className="text-center text-neutral-white/90 tracking-[0.18em] font-semibold text-[clamp(1.25rem,2vw,2rem)]">
          PREGUNTAS FRECUENTES
        </h2>

        {/* List */}
        <div className="mx-auto mt-14 max-w-[980px]">
          <ul className="divide-y divide-dashed divide-neutral-white/15">
            {items.map((it) => {
              const isOpen = openId === it.id;

              return (
                <li key={it.id} className="py-8">
                  <button
                    type="button"
                    onClick={() => onToggle(it.id)}
                    className="group flex w-full items-start justify-between gap-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${it.id}`}
                  >
                    <div>
                      <div className="text-[clamp(1rem,1.25vw,1.25rem)] font-semibold tracking-tight text-neutral-white/90">
                        {it.q}
                      </div>

                      {/* Answer (solo visible cuando open) */}
                      <div
                        id={`faq-panel-${it.id}`}
                        className={[
                          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                          isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0",
                        ].join(" ")}
                      >
                        <div className="overflow-hidden">
                          <p className="text-neutral-white/60 leading-relaxed text-[clamp(0.95rem,1vw,1.05rem)] max-w-[820px]">
                            {it.a}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Icon */}
                    <Chevron
                      className={[
                        "mt-1 shrink-0 transition-transform duration-300",
                        isOpen ? "rotate-180 text-neutral-white/80" : "rotate-90 text-neutral-white/45",
                        "group-hover:text-neutral-white/80",
                      ].join(" ")}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Chevron({ className = "" }: { className?: string }) {
  // triangulito tipo el mock (chevron play)
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={20}
      height={20}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 5l11 7-11 7V5z"
        fill="currentColor"
      />
    </svg>
  );
}
