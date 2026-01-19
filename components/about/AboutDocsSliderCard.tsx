"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useMemo, useState } from "react";
import { slides } from "./AboutDocsSliderCard.data";

export default function AboutDocsSliderCard() {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 30200,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay]
  );

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden border border-neutral-white/10 bg-neutral-black-900/35 px-10 py-10 cursor-grab active:cursor-grabbing order-2 sm:order-1 lg:col-span-2 select-none">
      {/* Chip grande opaco */}
      <div className="inline-flex rounded-full bg-cyan-10 px-4 py-2 text-[11px] tracking-widest text-neutral-white/70">
        PORTAFOLIO 
      </div>

      <div className="absolute right-8 top-8 opacity-70">
        <Image src="/brand/about/icon-blueprint.svg" alt="" width={26} height={26} />
      </div>

     
      {/* Carousel */}
      <div className="mt-8">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((s) => (
              <div
                key={s.title}
                className="min-w-0 flex-[0_0_100%] pr-6"
              >
                <div className="relative h-[304px] overflow-hidden border-neutral-white/10 bg-neutral-black-900/40">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 90vw, 600px"
                  />
                </div>

                <div className="mt-4">
                  <div className="text-[12px] tracking-widest text-neutral-white/85">
                    {s.title}
                  </div>
                  <div className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-neutral-white/65">
                    {s.desc}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-neutral-white/10 bg-neutral-black-900/30 px-3 py-1 text-[11px] text-neutral-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-5 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={[
                "h-2 w-2 rounded-full border border-neutral-white/20 transition",
                i === selected ? "bg-accent-lime" : "bg-transparent",
              ].join(" ")}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
