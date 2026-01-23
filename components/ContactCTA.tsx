"use client";

import Image from "next/image";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative w-full bg-neutral-black-900">
      <div className="mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
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
                className="h-auto w-full"
              />
            </div>
          </div>

          {/* DERECHA: texto + botón */}
          <div className="text-center md:text-left">
            <h2
              id="cta-title"
              className="heading-h3 tracking-tight text-neutral-white"
            >
              ¿TE GUSTARÍA QUE TRABAJÁRAMOS JUNTOS?
            </h2>

            <div className="mt-6 flex justify-center md:justify-start">
              <Link
                href="#contacto"
                className="
                  inline-flex items-center gap-3
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
                <span aria-hidden className="text-[16px] leading-none">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
