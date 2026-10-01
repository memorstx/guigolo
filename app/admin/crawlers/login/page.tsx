import type { Metadata } from "next";
import CrawlerLoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Acceso · Crawler Radar",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

type Props = {
  searchParams: Promise<{ next?: string | string[] }>;
};

export default async function CrawlerLoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const candidate = Array.isArray(params.next) ? params.next[0] : params.next;
  const nextPath =
    candidate?.startsWith("/admin/crawlers") &&
    !candidate.startsWith("/admin/crawlers/login")
      ? candidate
      : "/admin/crawlers";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070709] px-5 py-12 text-neutral-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_15%,rgba(139,92,246,0.15),transparent_28%),radial-gradient(circle_at_80%_75%,rgba(34,211,238,0.08),transparent_32%)]" />

      <section className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-neutral-950/80 p-7 shadow-2xl shadow-black/30 backdrop-blur sm:p-9">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              guigolo · private analytics
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Crawler Radar
            </h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/10 text-xl">
            ◎
          </div>
        </div>

        <p className="text-sm leading-6 text-neutral-400">
          Acceso privado al historial de crawlers y automatizaciones que recorren
          guigolo.com.
        </p>

        <CrawlerLoginForm nextPath={nextPath} />

        <p className="mt-6 text-xs leading-5 text-neutral-600">
          “Recordarme” guarda una sesión segura en este navegador; la contraseña
          no se guarda dentro de guigolo.
        </p>
      </section>
    </main>
  );
}
