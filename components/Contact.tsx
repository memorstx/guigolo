"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import { readContactOrigin, clearContactOrigin, type ContactOrigin } from "@/components/ui/contactOrigin";


const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqqzvro"; 

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [origin, setOrigin] = useState<ContactOrigin | null>(null);

  useEffect(() => {
    setOrigin(readContactOrigin());
  }, []);


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section className="py-24 bg-neutral-black-900">
      <div
        id="contacto"
        className="scroll-mt-28 rounded-2xl border border-neutral-white/10 bg-neutral-black-800/40 p-10"
      >

        <p className="text-neutral-white/50 text-sm tracking-widest uppercase">
          Contact
        </p>

        <h2 className="mt-4 text-heading-lg font-display uppercase text-neutral-white">
          Hagamos match: tú traes la idea, yo la convierto en experiencia.
        </h2>

        <p className="mt-5 text-body-md text-neutral-white/70 max-w-2xl">
          Escríbeme y te respondo con claridad: alcance, tiempos y siguientes pasos.
        </p>

        <form onSubmit={onSubmit} className="mt-10 grid gap-4 max-w-2xl">
          {/* Honeypot anti-spam (déjalo tal cual) */}
          <input type="text" name="_gotcha" className="hidden" />
          
          <input type="hidden" name="origin_path" value={origin?.fromPath ?? ""} />
          <input type="hidden" name="origin_hash" value={origin?.fromHash ?? ""} />
          <input type="hidden" name="origin_scrollY" value={origin ? String(origin.fromScrollY) : ""} />
          <input type="hidden" name="origin_cta" value={origin?.ctaId ?? ""} />

          <div className="grid gap-2">
            <label className="text-label-sm uppercase text-neutral-white/60">
              Tu nombre
            </label>
            <input
              name="name"
              required
              className="w-full rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white outline-none focus:border-accent-lilac/60"
              placeholder="Tu nombre"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-label-sm uppercase text-neutral-white/60">
              Tu correo
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white outline-none focus:border-accent-lilac/60"
              placeholder="tu@email.com"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-label-sm uppercase text-neutral-white/60">
              Mensaje
            </label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white outline-none focus:border-accent-lilac/60"
              placeholder="Qué estás construyendo y qué necesitas de mí…"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 inline-flex w-fit items-center justify-center rounded-md bg-accent-lilac px-7 py-3 font-medium text-neutral-white hover:opacity-90 transition disabled:opacity-60"
          >
            {status === "sending" ? "Enviando…" : "Enviar mensaje →"}
          </button>

          {/* Mensaje de estado (ya con tu vibe, sin salirte de tu sitio) */}
          {status === "success" && (
            <div className="rounded-md border border-neutral-white/10 bg-accent-cyan-10 px-4 py-3 text-neutral-white/80">
              <div>Listo ✅ Ya me llegó tu mensaje. Te escribo pronto 💝</div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const o = readContactOrigin();
                    if (!o) return;

                    // Regresar a página + hash si existe, o a scroll exacto si no
                    const url = `${o.fromPath}${o.fromHash || ""}`;
                    window.location.href = url;

                    sessionStorage.setItem("restore_scroll_once_v1", "1");
                    window.location.href = url;

                  }}
                  className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition w-full sm:w-auto text-center"
                >
                  Volver a donde estaba
                </button>

                <button
                  type="button"
                  onClick={() => {
                    clearContactOrigin();
                    window.location.href = "/#projects";
                  }}
                  className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full sm:w-auto text-center"
                >
                  Seguir explorando
                </button>
              </div>
            </div>
          )}


          {status === "error" && (
            <div className="rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white/80">
              Algo falló 😅 Intenta otra vez o escríbeme directo por email: <a href="mailto:info@guigolo.com">info@guigolo.com</a>
            </div>
          )}

          <p className="text-xs text-neutral-white/40">
            MODULE · CONTACT CHANNEL
          </p>
        </form>
      </div>
    </Section>
  );
}
