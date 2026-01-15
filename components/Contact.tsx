"use client";

import { useState } from "react";
import Section from "./Section";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqqzvro"; 

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

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
        className="rounded-2xl border border-neutral-white/10 bg-neutral-black-800/40 p-10"
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
              Listo ✅ Ya me llegó tu mensaje. Te escribo pronto 💝
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
