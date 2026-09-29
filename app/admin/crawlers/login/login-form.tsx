"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function CrawlerLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/crawler-session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: String(form.get("username") || ""),
          password: String(form.get("password") || ""),
          remember: form.get("remember") === "on",
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        setError(payload.error || "No pude iniciar sesión.");
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("No pude conectar con el radar. Intenta otra vez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-neutral-500">
          Usuario
        </span>
        <input
          name="username"
          autoComplete="username"
          defaultValue="guigolo"
          required
          className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-neutral-100 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.055]"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.16em] text-neutral-500">
          Contraseña
        </span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5 text-sm text-neutral-100 outline-none transition focus:border-violet-400/60 focus:bg-white/[0.055]"
        />
      </label>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-400">
        <input
          name="remember"
          type="checkbox"
          defaultChecked
          className="h-4 w-4 accent-violet-400"
        />
        Recordarme durante 30 días
      </label>

      {error ? (
        <p className="rounded-xl border border-red-400/20 bg-red-400/[0.07] px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-2xl bg-violet-300 px-4 py-3.5 text-sm font-semibold text-neutral-950 transition hover:bg-violet-200 disabled:cursor-wait disabled:opacity-60"
      >
        {loading ? "Entrando…" : "Entrar al radar"}
      </button>
    </form>
  );
}
