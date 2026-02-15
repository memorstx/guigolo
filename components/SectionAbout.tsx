"use client";

import Image from "next/image";
import AboutDocsSliderCard from "./about/AboutDocsSliderCard";
import { ABOUT_DOC_SLIDES_BASE } from "./about/AboutDocsSliderCard.data";

type AboutCopy = {
  header: {
    kicker: string;
    headline: string;
    body: string;
  };
  cards: {
    personality: { chip: string; title: string; desc: string; watermark: string };
    style: { chip: string; title: string; desc: string; watermark: string };
    likes: { chip: string; title: string; desc: string; watermark: string };
    purpose: { chip: string; title: string; desc: string; watermark: string };
    mindset: { chip: string; title: string; desc: string; watermark: string };
  };
  value: {
    chip: string;
    title: string;
    body: string;
    cta: string;
  };
  docsSlides: Record<
    string,
    { title: string; desc: string; tags: string[] }
  >;
};

type SmallCardProps = {
  chip: string;
  title: string;
  desc: string;
  mascotSrc?: string;
  watermark?: string;

  className?: string;
  chipClassName?: string;
  titleClassName?: string;
  descClassName?: string;
  watermarkClassName?: string;
};

function SmallCard({
  chip,
  title,
  desc,
  mascotSrc,
  watermark,
  className,
  chipClassName,
  titleClassName,
  descClassName,
  watermarkClassName,
}: SmallCardProps) {
  return (
    <div
      className={[
        "relative h-full overflow-hidden border border-dashed border-[#ededed1a] bg-neutral-black-900/35 px-10 py-10",
        className ?? "",
      ].join(" ")}
    >
      {/* watermark */}
      {watermark && (
        <div
          className={[
            "pointer-events-none absolute inset-x-10 top-6 left-0 select-none text-3xl font-semibold tracking-[0.05em] text-accent-cyan-10 opacity-30 lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl",
            watermarkClassName ?? "",
          ].join(" ")}
        >
          {watermark}
        </div>
      )}

      <div className="flex flex-col align-items-self-end">
        {/* chip */}
        <div
          className={[
            "inline-flex w-fit border border-[#ededed1a] px-4 py-2 text-[11px] tracking-widest text-neutral-white/70",
            chipClassName ?? "",
          ].join(" ")}
        >
          {chip}
        </div>

        {/* icon */}
        <div className="mt-4">
          <Image
            src="/brand/about/icon-blueprint.svg"
            alt=""
            width={32}
            height={32}
            className="h-auto w-[32px] md:w-[32px] lg:w-[40px] xl:w-[48px] 2xl:w-[72px]"
          />
        </div>

        <h3 className={["mt-7 heading-h3", titleClassName ?? ""].join(" ")}>
          {title}
        </h3>

        <p
          className={[
            "mt-4 text-[clamp(0.95rem,1.15vw,1.125rem)] leading-relaxed xl:text-[clamp(1.05rem,.95vw,1.2rem)] xl:leading-relaxed 2xl:text-[clamp(1.25rem,1.2vw,1.5rem)] text-neutral-white/70",
            descClassName ?? "",
          ].join(" ")}
        >
          {desc}
        </p>
      </div>

      {/* mascot */}
      {mascotSrc && (
        <div className="absolute bottom-6 right-8">
          <Image src={mascotSrc} alt="" width={76} height={76} className="select-none" />
        </div>
      )}
    </div>
  );
}

export default function SectionAbout({ copy }: { copy: AboutCopy }) {
  const slides = ABOUT_DOC_SLIDES_BASE.map((b) => {
    const t = copy.docsSlides[b.id];
    return {
      id: b.id,
      image: b.image,
      title: t?.title ?? "",
      desc: t?.desc ?? "",
      tags: t?.tags ?? [],
    };
  });

  return (
    <section id="about" className="relative">
      <div className="mx-auto px-4 pb-24 pt-[120px] sm:pt-[48px] sm:px-[1rem] md:px-[48px] lg:px-[96px] xl:px-[128px] 2xl:px-[144px] 3xl:px-[244px] 4xl:px-[320px]">
        {/* Header */}
        <div className="text-center">
          <div className="text-[12px] tracking-widest text-accent-lime/80">
            {copy.header.kicker}
          </div>

          <h2 className="mt-3 heading-h2 tracking-tight">
            {copy.header.headline}
          </h2>

          <p
            className="
              max-w-[680px]
              xl:max-w-[768px]
              2xl:max-w-[980px]
              3xl:max-w-[1024px]
              4xl:max-w-[1256px]
              mx-auto
              mt-3
              text-neutral-white/65
              text-[clamp(0.95rem,1.15vw,1.125rem)]
              text-center
              leading-relaxed
              xl:text-[clamp(1.05rem,.95vw,1.2rem)]
              xl:leading-relaxed
              2xl:text-[clamp(1.25rem,1.2vw,1.5rem)]
            "
          >
            {copy.header.body}
          </p>
        </div>

        {/* Grid principal */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="mt-0 lg:mt-8 xl:mt-8 2xl:mt-10 3xl:mt-[6rem] 4xl:mt-[12rem]">
            <SmallCard
              chip={copy.cards.personality.chip}
              title={copy.cards.personality.title}
              desc={copy.cards.personality.desc}
              watermark={copy.cards.personality.watermark}
              className="lg:mt-10 text-left lg:text-right"
              watermarkClassName="opacity-20"
            />
          </div>

          <div className=" bg-neutral-black-900/35">
            <Image
              src="/brand/about/about-photo-guigolo.png"
              alt="Guigolo"
              width={900}
              height={900}
              className="h-full w-full object-cover"
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              priority
            />
          </div>

          <div className="mt-0 lg:mt-8 xl:mt-8 2xl:mt-10 3xl:mt-[6rem] 4xl:mt-[12rem]">
            <SmallCard
              chip={copy.cards.style.chip}
              title={copy.cards.style.title}
              desc={copy.cards.style.desc}
              watermark={copy.cards.style.watermark}
              className="lg:mt-10"
            />
          </div>

          <SmallCard
            chip={copy.cards.likes.chip}
            title={copy.cards.likes.title}
            desc={copy.cards.likes.desc}
            watermark={copy.cards.likes.watermark}
            className="lg:mt-10 text-left lg:text-right"
          />

          <SmallCard
            chip={copy.cards.purpose.chip}
            title={copy.cards.purpose.title}
            desc={copy.cards.purpose.desc}
            watermark={copy.cards.purpose.watermark}
            className="border md:text-center border-dashed lg:border-none"
          />

          <SmallCard
            chip={copy.cards.mindset.chip}
            title={copy.cards.mindset.title}
            desc={copy.cards.mindset.desc}
            watermark={copy.cards.mindset.watermark}
            className="lg:mt-10"
          />
        </div>

        {/* Fila final */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="relative flex flex-col overflow-hidden justify-start sm:justify-center lg:mt-10 lg:text-right border border-neutral-white/10 bg-neutral-black-900/35 px-10 py-10 lg:col-span-1 order-2 md:order-1">
            <div className="inline-flex border-2 sm:self-center border-[#ededed1a] px-4 py-2 text-[11px] tracking-widest text-neutral-white/70 w-fit align-self-center">
              {copy.value.chip}
            </div>

            <h3 className="mt-7 heading-h3 sm:text-center">
              {copy.value.title}
            </h3>

            <p className="mt-4 text-left sm:text-center text-[clamp(0.95rem,1.15vw,1.125rem)] leading-relaxed xl:text-[clamp(1.05rem,.95vw,1.2rem)] xl:leading-relaxed 2xl:text-[clamp(1.25rem,1.2vw,1.5rem)] text-neutral-white/70">
              {copy.value.body}
            </p>

            <div className="mt-8 flex flex-col items-baseline sm:items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex justify-start items-start sm:items-center sm:justify-center rounded-md bg-accent-lime px-10 py-3 text-[12px] font-semibold tracking-widest text-black shadow-[0_0_0_2px_rgba(0,0,0,0.25)]"
              >
                {copy.value.cta} <span className="ml-2">↗</span>
              </a>
            </div>
          </div>

          <AboutDocsSliderCard slides={slides} />
        </div>
      </div>
    </section>
  );
}
