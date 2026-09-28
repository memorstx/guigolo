import type { Metadata } from "next";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Crawler Radar · Guigolo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const categoryLabels: Record<string, string> = {
  "ai-search": "IA · búsqueda",
  "ai-training": "IA · entrenamiento",
  "ai-user": "IA · acción de usuario",
  search: "Buscador",
  "seo-audit": "SEO / auditoría",
  "social-preview": "Vista previa social",
  automation: "Automatización",
};

function formatDate(value: unknown) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date(String(value)));
}

export default async function CrawlerRadarPage() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">Crawler Radar</h1>
          <p className="mt-4 text-neutral-400">
            Falta configurar DATABASE_URL en Vercel.
          </p>
        </div>
      </main>
    );
  }

  const sql = neon(databaseUrl);

  const summaryRows = await sql`
    SELECT
      COUNT(*)::text AS total_events,
      COUNT(DISTINCT bot_name)::text AS unique_bots,
      MIN(seen_at)::text AS first_seen,
      MAX(seen_at)::text AS last_seen
    FROM crawler_events
  `;

  const botRows = await sql`
    SELECT
      bot_name,
      category,
      COUNT(*)::text AS visits,
      MAX(seen_at)::text AS last_seen
    FROM crawler_events
    GROUP BY bot_name, category
    ORDER BY COUNT(*) DESC, MAX(seen_at) DESC
    LIMIT 30
  `;

  const recentRows = await sql`
    SELECT
      id::text,
      seen_at::text,
      bot_name,
      category,
      path,
      referrer
    FROM crawler_events
    ORDER BY seen_at DESC
    LIMIT 100
  `;

  const summary = summaryRows[0] ?? {};

  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-12 text-neutral-100 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-violet-300">
            guigolo · private analytics
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Crawler Radar</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400">
            Historial propio de bots y procesos automatizados que solicitaron
            páginas de guigolo.com. La identidad se basa en el User-Agent
            declarado.
          </p>
        </div>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Solicitudes registradas" value={String(summary.total_events ?? "0")} />
          <Stat label="Bots distintos" value={String(summary.unique_bots ?? "0")} />
          <Stat label="Primer registro" value={formatDate(summary.first_seen)} />
          <Stat label="Último registro" value={formatDate(summary.last_seen)} />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-medium">Quién ha pasado por aquí</h2>

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-white/[0.04] text-neutral-400">
                  <tr>
                    <th className="px-5 py-4 font-medium">Crawler</th>
                    <th className="px-5 py-4 font-medium">Tipo</th>
                    <th className="px-5 py-4 font-medium">Solicitudes</th>
                    <th className="px-5 py-4 font-medium">Última vez</th>
                  </tr>
                </thead>
                <tbody>
                  {botRows.length ? (
                    botRows.map((bot) => (
                      <tr
                        key={`${String(bot.bot_name)}-${String(bot.category)}`}
                        className="border-t border-white/10"
                      >
                        <td className="px-5 py-4 font-medium text-neutral-100">
                          {String(bot.bot_name)}
                        </td>
                        <td className="px-5 py-4 text-neutral-400">
                          {categoryLabels[String(bot.category)] ?? String(bot.category)}
                        </td>
                        <td className="px-5 py-4 text-neutral-300">
                          {String(bot.visits)}
                        </td>
                        <td className="px-5 py-4 text-neutral-400">
                          {formatDate(bot.last_seen)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-5 py-10 text-center text-neutral-500">
                        Todavía no hay crawlers registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mt-10 pb-12">
          <h2 className="text-xl font-medium">Últimos accesos</h2>

          <div className="mt-4 space-y-2">
            {recentRows.length ? (
              recentRows.map((event) => (
                <article
                  key={String(event.id)}
                  className="grid gap-2 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 md:grid-cols-[180px_1fr_auto]"
                >
                  <div>
                    <div className="font-medium">{String(event.bot_name)}</div>
                    <div className="mt-1 text-xs text-neutral-500">
                      {categoryLabels[String(event.category)] ?? String(event.category)}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-sm text-violet-200">
                      {String(event.path)}
                    </div>
                    {event.referrer ? (
                      <div className="mt-1 truncate text-xs text-neutral-600">
                        ref: {String(event.referrer)}
                      </div>
                    ) : null}
                  </div>

                  <time className="text-xs text-neutral-500">
                    {formatDate(event.seen_at)}
                  </time>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center text-sm text-neutral-500">
                El radar ya está listo. El historial empezará con la primera
                visita automatizada después del despliegue.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-xs uppercase tracking-[0.12em] text-neutral-500">
        {label}
      </div>
      <div className="mt-3 text-xl font-medium text-neutral-100">{value}</div>
    </div>
  );
}
