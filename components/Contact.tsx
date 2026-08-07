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

const CONTACT_ENDPOINT = "/api/contact";

type Status = "idle" | "sending" | "success" | "error";

type ContactCopy = {
  kicker: string;
  headline: string;
  body: string;

  success: {
    title: string;
    body: string;
    primaryBtn: string;
    secondaryBtn: string;
  };

  error: {
    titlePrefix: string;
    backBtn: string;
    exploreBtn: string;
    retryBtn: string;
  };

  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    helper: string;
    sending: string;
    submit: string;
    footer: string;
  };
};

type Props = {
  copy: ContactCopy;
  locale: "es" | "en";
};

export default function Contact({ copy, locale }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [origin, setOrigin] = useState<ContactOrigin | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  const almostUnlockedRef = useRef(false);
  const humanIntentRef = useRef(false);
  const dwellTimerRef = useRef<number | null>(null);

  const courageUnlockedRef = useRef(false);

  const markCourage = () => {
    if (courageUnlockedRef.current) return;
    courageUnlockedRef.current = true;
    unlockAchievement("took_courage");
  };

  const homeHash = (hash: string) => `/${locale}${hash}`;

  useEffect(() => {
    // sessionStorage sólo existe en el navegador; leerlo aquí evita hydration mismatch.
    setStatus(
      sessionStorage.getItem("contact_sent_v1") === "1" ? "success" : "idle"
    );
    setOrigin(readContactOrigin());
  }, []);

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

    const addIntentListeners = () => {
      el.addEventListener("wheel", markIntent, { passive: true });
      el.addEventListener("touchmove", markIntent, { passive: true });
      el.addEventListener("pointerdown", markIntent, { passive: true });
      el.addEventListener("keydown", markIntent);
    };

    const removeIntentListeners = () => {
      el.removeEventListener("wheel", markIntent);
      el.removeEventListener("touchmove", markIntent);
      el.removeEventListener("pointerdown", markIntent);
      el.removeEventListener("keydown", markIntent);
    };

    addIntentListeners();

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const visible = !!entry?.isIntersecting;
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const DWELL_MS = isMobile ? 2400 : 1400;

        if (!visible) {
          clearDwell();
          resetIntent();
          return;
        }

        if (almostUnlockedRef.current) return;

        resetIntent();
        clearDwell();

        dwellTimerRef.current = window.setTimeout(() => {
          if (almostUnlockedRef.current) return;
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
      const res = await fetch(CONTACT_ENDPOINT, {
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
          {copy.kicker}
        </p>

        <h2 className="mt-4 text-heading-lg font-display uppercase text-neutral-white">
          {copy.headline}
        </h2>

        <p className="mt-5 text-body-md text-neutral-white/70 max-w-2xl">
          {copy.body}
        </p>

        {/* ✅ SUCCESS */}
        {status === "success" && (
          <div className="mt-10 max-w-2xl rounded-md border border-neutral-white/10 bg-accent-cyan-10 px-4 py-4 text-neutral-white/80">
            <div className="text-neutral-white/90">
              {copy.success.title}
            </div>

            <div className="mt-2 text-sm text-neutral-white/70">
              {copy.success.body}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  clearContactOrigin();
                  window.location.href = homeHash("#projects");
                }}
                className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full sm:w-auto text-center"
              >
                {copy.success.primaryBtn}
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
                {copy.success.secondaryBtn}
              </button>
            </div>
          </div>
        )}

        {/* ✅ ERROR */}
        {status === "error" && (
          <div className="mt-10 max-w-2xl rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-4 text-neutral-white/80">
            <div>
              {copy.error.titlePrefix}{" "}
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
                {copy.error.backBtn}
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = homeHash("#projects"))}
                className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full sm:w-auto text-center"
              >
                {copy.error.exploreBtn}
              </button>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="rounded-md border border-neutral-white/20 px-6 py-3 text-neutral-white/90 hover:border-neutral-white/40 transition w-full sm:w-auto text-center"
              >
                {copy.error.retryBtn}
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
                {copy.form.nameLabel}
              </label>
              <input
                name="name"
                required
                className="w-full rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white outline-none focus:border-accent-lilac/60"
                placeholder={copy.form.namePlaceholder}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-label-sm uppercase text-neutral-white/60">
                {copy.form.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white outline-none focus:border-accent-lilac/60"
                placeholder={copy.form.emailPlaceholder}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-label-sm uppercase text-neutral-white/60">
                {copy.form.messageLabel}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-md border border-neutral-white/10 bg-neutral-black-900/60 px-4 py-3 text-neutral-white outline-none focus:border-accent-lilac/60"
                placeholder={copy.form.messagePlaceholder}
                onChange={(e) => {
                  if (e.target.value.trim().length >= 50) {
                    markCourage();
                  }
                }}
              />
              <p className="text-xs text-neutral-white/45">
                {copy.form.helper}
              </p>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-2 inline-flex w-fit items-center justify-center rounded-md bg-accent-lilac px-7 py-3 font-medium text-neutral-white hover:opacity-90 transition disabled:opacity-60"
            >
              {status === "sending" ? copy.form.sending : copy.form.submit}
            </button>

            <p className="text-xs text-neutral-white/40">{copy.form.footer}</p>
          </form>
        )}
      </div>
    </Section>
  );
}
