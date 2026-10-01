"use client";

import { useEffect } from "react";
import { reportClientError } from "@/components/ErrorTracker";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportClientError({
      type: "render",
      message: error.message || "Render error",
      stack: error.stack || error.digest || null,
    });
  }, [error]);

  return (
    <html lang="es">
      <body className="grid min-h-screen place-items-center bg-neutral-950 px-6 text-neutral-100">
        <main className="max-w-lg text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
            guigolo
          </p>
          <h1 className="mt-4 text-3xl font-semibold">Algo falló al cargar esta vista.</h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            El error ya quedó registrado para revisión.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-7 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-neutral-200 transition hover:bg-white/[0.09]"
          >
            Intentar de nuevo
          </button>
        </main>
      </body>
    </html>
  );
}
