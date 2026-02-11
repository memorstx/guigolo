// components/ui/BlueprintCard.tsx
import type { ReactNode } from "react";

type Props = {
  chip: string;
  title: string;
  desc: string;
  watermark?: string;
  icon?: ReactNode;
};

export default function BlueprintCard({ chip, title, desc, watermark, icon }: Props) {
  return (
    <div className="relative h-full overflow-hidden border border-dashed border-neutral-white/15 bg-neutral-black-900/35 p-8 md:p-10">
      <div className="pointer-events-none absolute inset-0 opacity-70 about-chip" />

      {watermark ? (
        <div className="pointer-events-none absolute -top-2 left-8 select-none text-[44px] md:text-[52px] font-semibold tracking-[0.08em] text-accent-cyan-10 opacity-25">
          {watermark}
        </div>
      ) : null}

      <div className="relative">
        <div className="inline-flex w-fit items-center gap-3 border border-neutral-white/10 bg-neutral-black-900/20 px-4 py-2 text-[11px] tracking-widest text-neutral-white/70">
          {icon ? (
            <span className="text-neutral-white/70" aria-hidden="true">
              {icon}
            </span>
          ) : null}
          <span>{chip}</span>
        </div>

        <h3 className="mt-7 heading-h3 tracking-tight text-neutral-white/90">{title}</h3>
        <p className="mt-4 text-neutral-white/70 text-[14px] md:text-[15px] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
