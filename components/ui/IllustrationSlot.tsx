// components/ui/IllustrationSlot.tsx
type Props = {
  title: string;
  subtitle?: string;
  aspect?: "square" | "video" | "portrait";
};

export default function IllustrationSlot({
  title,
  subtitle,
  aspect = "video",
}: Props) {
  const aspectClass =
    aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
        ? "aspect-[3/4]"
        : "aspect-video";

  return (
    <div className="relative overflow-hidden border border-dashed border-neutral-white/15 bg-neutral-black-900/35">
      <div className="pointer-events-none absolute inset-0 opacity-70 about-chip" />
      <div className={`relative ${aspectClass} w-full`}>
        <div className="absolute inset-0 grid place-items-center p-10 text-center">
          <div>
            <div className="text-[12px] tracking-[0.35em] text-neutral-white/40">
              {title}
            </div>
            {subtitle ? (
              <div className="mt-4 text-neutral-white/65 text-[14px] leading-relaxed max-w-[44ch]">
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
