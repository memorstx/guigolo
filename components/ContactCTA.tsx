"use client";

import Image from "next/image";
import Link from "next/link";
import ContactLink from "./ui/ContactLink";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative w-full bg-neutral-black-900 overflow-hidden">
      {/* Fondo: glow + grid (sin assets) */}
      <div className="pointer-events-none absolute inset-0">
        {/* glow */}
        <div
          className="absolute -top-24 right-[-10%] h-[520px] w-[520px] rounded-full blur-[80px] opacity-25"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(163,255,0,0.9), rgba(163,255,0,0) 60%)",
          }}
        />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20 relative">
        <div className="grid items-center gap-10 md:grid-cols-[420px_1fr] lg:grid-cols-[520px_1fr]">
          {/* IZQUIERDA: ilustración */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-[520px] select-none">
              <Image
                src="/brand/cta/cta-illustration.png"
                alt=""
                width={900}
                height={900}
                priority={false}
                draggable={false}
                className="h-auto w-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              />
            </div>
          </div>

          {/* DERECHA: texto + botón */}
          <div className="text-center md:text-left">
            {/* Chip */}
            <div className="inline-flex items-center gap-2 rounded-md border border-neutral-white/10 bg-neutral-black-900/30 px-4 py-2 text-[11px] tracking-[0.35em] text-neutral-white/70">
              LISTO PARA CONSTRUIR
              <span className="h-1 w-1 rounded-full bg-accent-lime/80" />
            </div>

            <h2 className="mt-5 heading-h2 tracking-tight text-left text-neutral-white">
              ¿TE GUSTARÍA QUE TRABAJÁRAMOS JUNTOS?
            </h2>

            {/* Línea blueprint */}
            <div className="mt-4 h-px w-full max-w-[520px] mx-auto md:mx-0 bg-gradient-to-r from-neutral-white/0 via-neutral-white/20 to-neutral-white/0" />

            {/* Subcopy */}
            <p className="mt-5 text-neutral-white/70 text-[14px] md:text-[15px] leading-relaxed max-w-[560px] mx-auto md:mx-0">
              Si tu negocio fuera un rompecabezas, yo sería la pieza que lo completa.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-4">
              {/* Botón */}
              <ContactLink
                ctaId="cta-ready-to-build"
                className="
                  group inline-flex items-center gap-3
                  rounded-md bg-accent-lime
                  px-8 py-3
                  text-[13px] font-semibold tracking-[0.22em]
                  text-black
                  shadow-[0_0_0_2px_rgba(0,0,0,0.25)]
                  hover:brightness-110
                  transition
                "
              >
                CONTACTAR
                <span
                  aria-hidden
                  className="text-[16px] leading-none transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </ContactLink>


              {/* Micro CTA secundario */}
              <span className="text-[12px] tracking-[0.18em] text-neutral-white/45">
                RESPUESTA EN 24–48H
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
