"use client";

import Image from "next/image";
import AboutDocsSliderCard from "./about/AboutDocsSliderCard";

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

        <h3
          className={[
            "mt-7 heading-h3",
            titleClassName ?? "",
          ].join(" ")}
        >
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

export default function SectionAbout() {
  return (
    <section id="about" className="relative">
      {/* padding lateral 96px */}
      <div className="mx-auto px-4 pb-24 pt-[120px] sm:pt-[48px] sm:px-[1rem] md:px-[48px] lg:px-[96px] xl:px-[128px] 2xl:px-[144px] 3xl:px-[244px] 4xl:px-[320px]
        ">
        {/* Header */}
        <div className="text-center">
          <div className="text-[12px] tracking-widest text-accent-lime/80">
            FRAMEWORK DE HABILIDADES
          </div>

          <h2 className="
            mt-3 
            font-semibold 
            tracking-thig 
            leading-[125%] 
            text-neutral-white 
            text-center sm:text-center 
            text-[clamp(1.25rem,3.75vw,2.25rem)] 
            md:text-[clamp(1.25rem,3.25vw,3.75rem)] 
            md:text-center 
            lg:text-[clamp(1.5rem,2.75vw,3rem)] 
            lg:text-center 
            xl:text-[clamp(2rem,1vw,3.5rem)] 
            xl:text-center 
            2xl:text-[clamp(2.25rem,1vw,3.75rem)] 
            2xl:text-center
            3xl:text-[clamp(2.5rem,1vw,4rem)] 
            3xl:text-center
            4xl:text-[clamp(2.5rem,1vw,4.5rem)]
            4xl:text-center
          ">
            
            EL NÚCLEO QUE DEFINE MI MANERA DE DISEÑAR
          </h2>

          <p className="
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
            ">
            Soy diseñador UX/UI y transformo sensibilidad y estrategia en interfaces suaves,
            claras y sencillas para el usuario.
          </p>
        </div>

        {/* Grid principal 3 columnas (2 filas) */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {/* Row 1 */}
          <div className="mt-0 lg:mt-8 xl:mt-8 2xl:mt-10 3xl:mt-[6rem] 4xl:mt-[12rem]">
            <SmallCard
            chip="FEELING NODE"
            title="MI PERSONALIDAD"
            desc="Soy curioso, sensible, empático, entregado, intuitivo, agradecido, detallista, creativo y auténtico."
            //mascotSrc="/brand/about/mascot-orange.svg"
            watermark="FEELING NODE"
            className="lg:mt-10 text-left lg:text-right"
            watermarkClassName="opacity-20"

          />
          </div>

          {/* Foto (columna centro, fila 1) */}
          <div className=" bg-neutral-black-900/35
                 ">

            {/* tu imagen, cámbiala a tu ruta real si ya la tienes */}
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
              chip="VISUAL FLOW UNIT"
              title="MI ESTILO"
              desc="Soy coherente, directo, minimalista, expresivo, emocional, ingenioso, observador y propositivo."
              //mascotSrc="/brand/about/mascot-banana.svg"
              watermark="VISUAL FLOW UNIT"
              className="lg:mt-10"
            />
          </div>

          {/* Row 2 */}
          
          <SmallCard
            chip="HUMAN INPUT FILTER"
            title="MIS GUSTOS"
            desc="El café, el chocolate, los gatos, los videojuegos, lo romántico y las ideas que nacen en silencio."
            //mascotSrc="/brand/about/mascot-paper.svg"
            watermark="HUMAN INPUT FILTER"
            className="lg:mt-10 text-left lg:text-right"
          />
           
          <SmallCard
            chip="CORE SIGNAL SYNC"
            title="MI PROPÓSITO"
            desc="Conectar con las emociones de los demás y convertirlas en experiencias únicas."
            //mascotSrc="/brand/about/mascot-purple.svg"
            watermark="CORE SIGNAL SYNC"
            className="border md:text-center border-dashed lg:border-none"
          />

          <SmallCard
            chip="SENSE-LAYER v4.2"
            title="MI MENTALIDAD"
            desc="Consciente, reflexivo, equilibrado, responsable, soñador, perseverante, en construcción constante."
            watermark="SENSE-LAYER v4.2"
            className="lg:mt-10"
          />
        </div>

        {/* Fila final 50/50 (misma sección, otro grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* MI PROPUESTA DE VALOR */}
          <div className="relative flex flex-col overflow-hidden justify-center lg:mt-10 lg:text-right border border-neutral-white/10 bg-neutral-black-900/35 px-10 py-10 lg:col-span-1 order-2 md:order-1">
            <div className="inline-flex border-2 self-center border-[#ededed1a] px-4 py-2 text-[11px] tracking-widest text-neutral-white/70 w-fit align-self-center">
              VALUE UNIQUE
            </div>


            <h3 className="mt-7 heading-h3 md:text-center">
              MI PROPUESTA DE VALOR
            </h3>

            <p className="
            mt-4 
            text-left
            md:text-center
            text-[clamp(0.95rem,1.15vw,1.125rem)] 
            leading-relaxed 
            xl:text-[clamp(1.05rem,.95vw,1.2rem)] 
            xl:leading-relaxed 
            2xl:text-[clamp(1.25rem,1.2vw,1.5rem)]  text-neutral-white/70">
              Me enfoco en crear productos útiles y estratégicos que impulsen tus resultados desde el primer clic.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center rounded-md bg-accent-lime px-10 py-3 text-[12px] font-semibold tracking-widest text-black shadow-[0_0_0_2px_rgba(0,0,0,0.25)]"
              >
                CONTACTAR <span className="ml-2">↗</span>
              </a>

              { /* íconos sociales simples */ }
             
              <div>
                {/*
                
                 <div className="flex items-center gap-6 text-neutral-white/70">
                <a href="#contacto" aria-label="Email" className="hover:text-neutral-white">
                  ✉
                </a>
                <a href="#" aria-label="GitHub" className="hover:text-neutral-white">
                  ⌂
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-neutral-white">
                  in
                </a>
              </div>
                
                */}
              </div>

            </div>

            
          </div>

          {/* DOCUMENTACIÓN COMPLETA (carousel) */}
          <AboutDocsSliderCard />
        </div>
      </div>
    </section>
  );
}
