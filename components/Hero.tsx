"use client";

import Link from "next/link";

type Layer = {
  src: string;
  className: string;
  float: string; // clase de animación
};

const layers: Layer[] = [
  {
    src: "/brand/hero/char-blue.svg",
    className: "left-[-2%] top-[46%] w-[30%]",
    float: "float-slow-1",
  },
  {
    src: "/brand/hero/char-pink.svg",
    className: "left-[28%] top-[30%] w-[16%]",
    float: "float-slow-2",
  },
  {
    src: "/brand/hero/char-green.svg",
    className: "right-[17%] top-[12%] w-[37%]",
    float: "float-slow-3",
  },
  {
    src: "/brand/hero/char-yellow.svg",
    className: "right-[16.3%] bottom-[19%] w-[29.5%]",
    float: "float-slow-4",
  },
];

export default function Hero() {
  return (
    <section id="home" className="relative">
      <div className="mx-auto pt-24 sm:pt-18 md:pt-8 lg:pt-8 xl:pt-4 2xl:pt-3 3xl:pt-2 4xl:pt-2 px-6 md:pl-[48px] md:pr-[48px] lg:pl-[96px] xl:pl-[128px] 2xl:pl-[144px] 3xl:pl-[244px] 4xl:pl-[320px] pb-12 ">
        <div className="grid items-center lg:grid-cols-2">
          {/* IZQUIERDA */}
          <div className="pr-0 md:pt-[96px] md:pb-[96px]">
            <h1 className="font-semibold tracking-tight leading-[125%] text-neutral-white text-[clamp(1.5rem,3.75vw,3rem)] md:text-[clamp(1.25rem,3.25vw,3.75rem)] lg:text-[clamp(1.5rem,2.75vw,3rem)] xl:text-[clamp(2rem,2.25vw,3.5rem)] 2xl:text-[clamp(3rem,2vw,4.75rem)] text-center sm:text-center md:text-center lg:text-left xl:text-left 2xl:text-left 3xl:text-left 4xl:text-left ">
              <span className="text-gradient-anim">LA CONEXIÓN REAL</span>{" "}
              EMPIEZA DONDE TERMINA LO ESTÉTICO.
            </h1>

            <p className="mt-5 text-[clamp(0.95rem,1.15vw,1.125rem)] leading-relaxed xl:text-[clamp(1.05rem,.95vw,1.2rem)] xl:leading-relaxed 2xl:text-[clamp(1.25rem,1.2vw,1.5rem)] text-neutral-white/70 max-w-[768px] xl:max-w-[1024px] 2xl:max-w-[1256px] text-center sm:text-center md:text-center lg:text-left xl:text-left 2xl:text-left 3xl:text-left 4xl:text-left">
              Diseño productos digitales que se sienten desde el primer clic.
            </p>

            <p className="mt-3 text-[clamp(0.95rem,1.15vw,1.125rem)] leading-relaxed xl:text-[clamp(1.05rem,.95vw,1.2rem)] xl:leading-relaxed 2xl:text-[clamp(1.25rem,1.2vw,1.5rem)] text-neutral-white/70 max-w-[768px] xl:max-w-[1024px] 2xl:max-w-[1256px] text-center sm:text-center md:text-center lg:text-left xl:text-left 2xl:text-left 3xl:text-left 4xl:text-left">
              ¿Quieres crear algo que hable sin palabras y se quede sin pedir permiso? 😏
            </p>

            <div className="mt-7 flex flex-wrap gap-4 justify-center lg:justify-start xl:justify-start 2xl:justify-start 3xl:justify-start 4xl:justify-start">
              <Link
                href="#contacto"
                className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full md:w-auto lg:w-auto xl:w-auto 2xl:w-auto 3xl:w-auto 4xl:w-auto text-center"
              >
                Sí, ¡eso quiero!
              </Link>

              <Link
                href="#projects"
                className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition w-full md:w-auto lg:w-auto xl:w-auto 2xl:w-auto 3xl:w-auto 4xl:w-auto text-center"
              >
                Ver proyectos
              </Link>
            </div>
          </div>

          {/* DERECHA */}
          <div className="relative lg:pr-0">
            <div className="relative w-full  mx-auto lg:my-0">
              <div className="relative w-full aspect-[1/1.05] md:aspect-[1/1] lg:aspect-[1/1.1]">

                <img
                  src="/brand/hero/scene.svg"
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-contain select-none"
                />

                {layers.map((l) => (
                  <img
                    key={l.src}
                    src={l.src}
                    alt=""
                    draggable={false}
                    className={[
                      "absolute select-none will-change-transform",
                      l.float,
                      l.className,
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
