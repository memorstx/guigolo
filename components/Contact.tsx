"use client";

import { useEffect, useRef, useState } from "react";
import Section from "./Section";
import {
  readContactOrigin,
  clearContactOrigin,
  type ContactOrigin,
} from "@/components/ui/contactOrigin";
import { unlockAchievement } from "./gamification/achievementsStore";
import { completeMission } from "./gamification/missionsStore";


const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqqzvro";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [origin, setOrigin] = useState<ContactOrigin | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  // --- almost_talked (anti-autoscroll + “se quedó”) ---
  const almostUnlockedRef = useRef(false);
  const humanIntentRef = useRef(false);
  const dwellTimerRef = useRef<number | null>(null);

  // --- took_courage ---
  const COURAGE_MIN_CHARS = 50;
  const courageUnlockedRef = useRef(false);

  const markCourage = () => {
    if (courageUnlockedRef.current) return;
    courageUnlockedRef.current = true;
    unlockAchievement("took_courage");
  };

  useEffect(() => {
    setOrigin(readContactOrigin());

    // ✅ Si en esta sesión ya envió, mostramos success y ocultamos form
    const sent = sessionStorage.getItem("contact_sent_v1");
    if (sent === "1") setStatus("success");
  }, []);

  // ✅ almost_talked: visible + intención humana + dwell
  useEffect(() => {
    const el = document.getElementById("contacto");
    if (!el) return;

    const clearDwell = () => {
      if (dwellTimerRef.current) window.clearTimeout(dwellTimerRef.current);
      dwellTimerRef.current = null;
    };

    const resetIntent = () => {
      humanIntentRef.current = false;
    };

    const markIntent = () => {
      humanIntentRef.current = true;
    };

    // Solo cuenta intención dentro de la sección
    const addIntentListeners = () => {
      el.addEventListener("wheel", markIntent, { passive: true });
      el.addEventListener("touchmove", markIntent, { passive: true });
      el.addEventListener("pointerdown", markIntent, { passive: true });
      el.addEventListener("keydown", markIntent);
    };

    const removeIntentListeners = () => {
      el.removeEventListener("wheel", markIntent as any);
      el.removeEventListener("touchmove", markIntent as any);
      el.removeEventListener("pointerdown", markIntent as any);
      el.removeEventListener("keydown", markIntent as any);
    };

    addIntentListeners();

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = !!entry?.isIntersecting;
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const DWELL_MS = isMobile ? 2400 : 1400;


        // Si sale, limpiamos timers para que no “robe” unlock después
        if (!visible) {
          clearDwell();
          resetIntent();
          return;
        }

        if (almostUnlockedRef.current) return;

        // Al entrar visible, reiniciamos intención y arrancamos dwell
        resetIntent();
        clearDwell();

        // ⏱️ Tiene que quedarse un ratito (lectura real, no “pasé volando”)
        dwellTimerRef.current = window.setTimeout(() => {
          if (almostUnlockedRef.current) return;

          // ✅ condición clave: hubo intención humana dentro de contacto
          if (!humanIntentRef.current) return;

          almostUnlockedRef.current = true;
          unlockAchievement("almost_talked");
        }, DWELL_MS); 
      },
      { threshold: 0.6 }
    );

    io.observe(el);

    return () => {
      clearDwell();
      removeIntentListeners();
      io.disconnect();
    };
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
        unlockAchievement("first_contact");
        completeMission("mission_contact");
        form.reset();
        sessionStorage.setItem("contact_sent_v1", "1");
        setStatus("success");

      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const goBackToOrigin = () => {
    const o = readContactOrigin();
    if (!o) return;

    const url = `${o.fromPath}${o.fromHash || ""}`;
    sessionStorage.setItem("restore_scroll_once_v1", "1");
    window.location.href = url;
  };

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

        {/* ✅ SUCCESS */}
        {status === "success" && (
          <div className="mt-10 max-w-2xl rounded-md border border-neutral-white/10 bg-accent-cyan-10 px-4 py-4 text-neutral-white/80">
            <div className="text-neutral-white/90">
              Listo ✅ Ya me llegó tu mensaje. Te escribo pronto 💝
            </div>

            <div className="mt-2 text-sm text-neutral-white/70">
              Si quieres, puedes seguir explorando o enviar otro mensaje.
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
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

              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  formRef.current?.reset();
                  sessionStorage.removeItem("contact_sent_v1");
                }}
                className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition w-full sm:w-auto text-center"
              >
                Enviar otro mensaje
              </button>
            </div>
          </div>
        )}

        {/* ✅ ERROR */}
        {status === "error" && (
          <div className="mt-10 max-w-2xl rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-4 text-neutral-white/80">
            <div>
              Algo falló 😅 Intenta otra vez o escríbeme directo por email:{" "}
              <a
                className="underline decoration-neutral-white/20 hover:decoration-neutral-white/50"
                href="mailto:info@guigolo.com"
              >
                info@guigolo.com
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={goBackToOrigin}
                className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition w-full sm:w-auto text-center"
              >
                Volver a donde estaba
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = "/#projects")}
                className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full sm:w-auto text-center"
              >
                Seguir explorando
              </button>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition w-full sm:w-auto text-center"
              >
                Reintentar aquí
              </button>
            </div>
          </div>
        )}

        {/* ✅ FORM */}
        {status !== "success" && (
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="mt-10 grid gap-4 max-w-2xl"
          >
            <input type="text" name="_gotcha" className="hidden" />

            <input type="hidden" name="origin_path" value={origin?.fromPath ?? ""} />
            <input type="hidden" name="origin_hash" value={origin?.fromHash ?? ""} />
            <input
              type="hidden"
              name="origin_scrollY"
              value={origin ? String(origin.fromScrollY) : ""}
            />
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
                onChange={(e) => {
                  if (e.target.value.trim().length >= COURAGE_MIN_CHARS) {
                    markCourage();
                  }
                }}
              />
              <p className="text-xs text-neutral-white/45">
                No tiene que estar perfecto. Escríbelo como lo tengas en la cabeza.
              </p>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex w-fit items-center justify-center rounded-md bg-accent-lilac px-7 py-3 font-medium text-neutral-white hover:opacity-90 transition disabled:opacity-60"
            >
              {status === "sending" ? "Enviando…" : "Enviar mensaje →"}
            </button>

            <p className="text-xs text-neutral-white/40">MODULE · CONTACT CHANNEL</p>
          </form>
        )}
      </div>
    </Section>
  );
}
