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
    <div className="relative overflow-hidden lg:mt-10 border border-neutral-white/10 bg-neutral-black-900/35 px-10 py-10 cursor-grab active:cursor-grabbing order-2 sm:order-1 lg:col-span-2 select-none">
     
      {/* Carousel */}
      <div className="mt-8">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {slides.map((s) => (
              <div
                key={s.title}
                className="min-w-0 flex-[0_0_100%] pr-6 "
              >
                

                <div className="mt-4 flex flex-col items-center">
                  <div className="text-[neutral-white] heading-h3 text-center">
                    {s.title}
                  </div>
                  <div className="mt-2 text-[clamp(0.95rem,1.15vw,1.125rem)] leading-relaxed xl:text-[clamp(1.05rem,.95vw,1.2rem)] xl:leading-relaxed 2xl:text-[clamp(1.25rem,1.2vw,1.5rem)] text-neutral-white/70 text-center">
                    {s.desc}
                  </div>

                  <div className="relative w-full mt-7 h-[304px] overflow-hidden border-neutral-white/10 bg-neutral-black-900/40">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      className="object-contain w-full aspect-ratio-[16/9]"
                      sizes="(max-width: 1024px) 90vw, 700px"
                    />
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
        <div className="mt-5 flex items-center gap-2 ">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={[
                "h-4 w-4 rounded-full border border-neutral-white/20 transition",
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
