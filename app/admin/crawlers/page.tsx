import type { Metadata } from "next";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import LogoutButton from "./logout-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Crawler Radar · Guigolo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const PAGE_SIZE = 50;
const SYSTEM_PATHS = ["/robots.txt", "/sitemap.xml"];

const categoryLabels: Record<string, string> = {
  "ai-search": "IA · búsqueda",
  "ai-training": "IA · entrenamiento",
  "ai-user": "IA · acción de usuario",
  search: "Buscador",
  "seo-audit": "SEO / auditoría",
  "social-preview": "Vista previa social",
  automation: "Automatización",
};

const scopeLabels: Record<string, string> = {
  all: "Todo",
  content: "Contenido",
  system: "robots / sitemap",
};

type SearchParams = {
  page?: string | string[];
  bot?: string | string[];
  category?: string | string[];
  scope?: string | string[];
  q?: string | string[];
};

type Props = {
  searchParams: Promise<SearchParams>;
};

function param(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function formatDate(value: unknown) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date(String(value)));
}

function formatDay(value: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date(`${value}T12:00:00-06:00`));
}

function isSystemPath(path: unknown) {
  return SYSTEM_PATHS.includes(String(path));
}

function buildHref(
  page: number,
  filters: { bot: string; category: string; scope: string; q: string }
) {
  const params = new URLSearchParams();

  if (page > 1) params.set("page", String(page));
  if (filters.bot) params.set("bot", filters.bot);
  if (filters.category) params.set("category", filters.category);
  if (filters.scope !== "all") params.set("scope", filters.scope);
  if (filters.q) params.set("q", filters.q);

  const query = params.toString();
  return query ? `/admin/crawlers?${query}` : "/admin/crawlers";
}

export default async function CrawlerRadarPage({ searchParams }: Props) {
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

  const params = await searchParams;
  const requestedPage = Math.max(1, Number.parseInt(param(params.page), 10) || 1);
  const botFilter = param(params.bot).slice(0, 120);
  const categoryFilter = param(params.category).slice(0, 60);
  const requestedScope = param(params.scope);
  const scopeFilter = ["content", "system"].includes(requestedScope)
    ? requestedScope
    : "all";
  const pathQuery = param(params.q).trim().slice(0, 120);
  const filters = {
    bot: botFilter,
    category: categoryFilter,
    scope: scopeFilter,
    q: pathQuery,
  };

  const sql = neon(databaseUrl);
  const pathPattern = `%${pathQuery}%`;

  const [
    summaryRows,
    botRows,
    categoryRows,
    topPathRows,
    dailyRows,
    filterBotRows,
    filteredCountRows,
  ] = await Promise.all([
    sql`
      SELECT
        COUNT(*)::text AS total_events,
        COUNT(DISTINCT bot_name)::text AS unique_bots,
        COUNT(*) FILTER (
          WHERE path NOT IN ('/robots.txt', '/sitemap.xml')
        )::text AS content_events,
        COUNT(DISTINCT path) FILTER (
          WHERE path NOT IN ('/robots.txt', '/sitemap.xml')
        )::text AS unique_content_paths,
        MIN(seen_at)::text AS first_seen,
        MAX(seen_at)::text AS last_seen
      FROM crawler_events
    `,
    sql`
      SELECT
        bot_name,
        category,
        COUNT(*)::text AS visits,
        COUNT(DISTINCT path)::text AS unique_paths,
        MIN(seen_at)::text AS first_seen,
        MAX(seen_at)::text AS last_seen
      FROM crawler_events
      GROUP BY bot_name, category
      ORDER BY COUNT(*) DESC, MAX(seen_at) DESC
      LIMIT 30
    `,
    sql`
      SELECT
        category,
        COUNT(*)::text AS visits
      FROM crawler_events
      GROUP BY category
      ORDER BY COUNT(*) DESC
    `,
    sql`
      SELECT
        path,
        COUNT(*)::text AS visits,
        COUNT(DISTINCT bot_name)::text AS bots,
        MAX(seen_at)::text AS last_seen
      FROM crawler_events
      WHERE path NOT IN ('/robots.txt', '/sitemap.xml')
      GROUP BY path
      ORDER BY COUNT(*) DESC, MAX(seen_at) DESC
      LIMIT 8
    `,
    sql`
      SELECT
        DATE_TRUNC(
          'day',
          seen_at AT TIME ZONE 'America/Mexico_City'
        )::date::text AS day,
        COUNT(*)::text AS visits
      FROM crawler_events
      WHERE seen_at >= NOW() - INTERVAL '13 days'
      GROUP BY day
      ORDER BY day ASC
    `,
    sql`
      SELECT DISTINCT bot_name
      FROM crawler_events
      ORDER BY bot_name ASC
    `,
    sql`
      SELECT COUNT(*)::text AS total
      FROM crawler_events
      WHERE
        (${botFilter} = '' OR bot_name = ${botFilter})
        AND (${categoryFilter} = '' OR category = ${categoryFilter})
        AND (
          ${scopeFilter} = 'all'
          OR (${scopeFilter} = 'content' AND path NOT IN ('/robots.txt', '/sitemap.xml'))
          OR (${scopeFilter} = 'system' AND path IN ('/robots.txt', '/sitemap.xml'))
        )
        AND (${pathQuery} = '' OR path ILIKE ${pathPattern})
    `,
  ]);

  const filteredCount = Number(filteredCountRows[0]?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const offset = (currentPage - 1) * PAGE_SIZE;

  const recentRows = await sql`
    SELECT
      id::text,
      seen_at::text,
      bot_name,
      category,
      path,
      query_string,
      http_method,
      user_agent,
      referrer,
      vercel_id
    FROM crawler_events
    WHERE
      (${botFilter} = '' OR bot_name = ${botFilter})
      AND (${categoryFilter} = '' OR category = ${categoryFilter})
      AND (
        ${scopeFilter} = 'all'
        OR (${scopeFilter} = 'content' AND path NOT IN ('/robots.txt', '/sitemap.xml'))
        OR (${scopeFilter} = 'system' AND path IN ('/robots.txt', '/sitemap.xml'))
      )
      AND (${pathQuery} = '' OR path ILIKE ${pathPattern})
    ORDER BY seen_at DESC
    LIMIT ${PAGE_SIZE}
    OFFSET ${offset}
  `;

  const summary = summaryRows[0] ?? {};
  const totalEvents = Math.max(1, Number(summary.total_events ?? 0));
  const maxDaily = Math.max(
    1,
    ...dailyRows.map((row) => Number(row.visits ?? 0))
  );
  const filtersActive = Boolean(
    botFilter || categoryFilter || scopeFilter !== "all" || pathQuery
  );

  return (
    <main className="min-h-screen bg-[#070709] px-5 py-8 text-neutral-100 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              guigolo · admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Crawler Radar
            </h1>
            <p className="mt-3 text-sm text-neutral-500">guigolo.com</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/crawlers"
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-neutral-200"
            >
              Actualizar
            </Link>
            <LogoutButton />
          </div>
        </header>

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label="Solicitudes"
            value={String(summary.total_events ?? "0")}
          />
          <Stat
            label="Crawlers"
            value={String(summary.unique_bots ?? "0")}
          />
          <Stat
            label="URLs rastreadas"
            value={String(summary.unique_content_paths ?? "0")}
          />
          <Stat
            label="Última actividad"
            value={formatDate(summary.last_seen)}
          />
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-[1.45fr_0.85fr]">
          <Panel>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Eyebrow>Actividad</Eyebrow>
                <h2 className="mt-2 text-xl font-medium">Últimos 14 días</h2>
              </div>
            </div>

            <div className="mt-8 flex h-44 items-end gap-2 border-b border-white/[0.08] pb-3">
              {dailyRows.length ? (
                dailyRows.map((row) => {
                  const visits = Number(row.visits ?? 0);
                  const height = Math.max(8, Math.round((visits / maxDaily) * 100));

                  return (
                    <div
                      key={String(row.day)}
                      className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
                      title={`${formatDay(String(row.day))}: ${visits} solicitudes`}
                    >
                      <span className="text-[10px] text-neutral-600 opacity-0 transition group-hover:opacity-100">
                        {visits}
                      </span>
                      <div
                        className="w-full max-w-10 rounded-t-lg bg-gradient-to-t from-violet-500/50 to-violet-300 transition group-hover:from-violet-400 group-hover:to-cyan-300"
                        style={{ height: `${height}%` }}
                      />
                      <span className="hidden whitespace-nowrap text-[10px] text-neutral-600 sm:block">
                        {formatDay(String(row.day))}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-neutral-600">
                  Todavía no hay actividad suficiente para graficar.
                </div>
              )}
            </div>
          </Panel>

          <Panel>
            <Eyebrow>Distribución</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Por tipo de crawler</h2>

            <div className="mt-6 space-y-5">
              {categoryRows.length ? (
                categoryRows.map((row) => {
                  const visits = Number(row.visits ?? 0);
                  const percentage = Math.max(
                    2,
                    Math.round((visits / totalEvents) * 100)
                  );

                  return (
                    <div key={String(row.category)}>
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="text-neutral-300">
                          {categoryLabels[String(row.category)] ?? String(row.category)}
                        </span>
                        <span className="text-neutral-600">{visits}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                        <div
                          className="h-full rounded-full bg-violet-300/80"
                          style={{ width: `${Math.min(100, percentage)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <EmptyText>Sin categorías todavía.</EmptyText>
              )}
            </div>
          </Panel>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel>
            <Eyebrow>Contenido</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Páginas más rastreadas</h2>

            <div className="mt-6 space-y-2">
              {topPathRows.length ? (
                topPathRows.map((row, index) => (
                  <div
                    key={String(row.path)}
                    className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-3"
                  >
                    <span className="text-xs tabular-nums text-neutral-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm text-violet-200">
                        {String(row.path)}
                      </div>
                      <div className="mt-1 text-[11px] text-neutral-600">
                        {String(row.bots)} crawler{Number(row.bots) === 1 ? "" : "s"} · última {formatDate(row.last_seen)}
                      </div>
                    </div>
                    <span className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-xs tabular-nums text-neutral-300">
                      {String(row.visits)}
                    </span>
                  </div>
                ))
              ) : (
                <EmptyText>
                  Los crawlers todavía sólo han consultado infraestructura del sitio.
                </EmptyText>
              )}
            </div>
          </Panel>

          <Panel>
            <Eyebrow>Crawlers</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Crawlers</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="text-xs text-neutral-600">
                  <tr>
                    <th className="pb-3 pr-4 font-medium">Crawler</th>
                    <th className="pb-3 pr-4 font-medium">Tipo</th>
                    <th className="pb-3 pr-4 font-medium">Solicitudes</th>
                    <th className="pb-3 pr-4 font-medium">URLs</th>
                    <th className="pb-3 font-medium">Última vez</th>
                  </tr>
                </thead>
                <tbody>
                  {botRows.map((bot) => (
                    <tr key={`${String(bot.bot_name)}-${String(bot.category)}`} className="border-t border-white/[0.07]">
                      <td className="py-4 pr-4">
                        <div className="font-medium text-neutral-100">
                          {String(bot.bot_name)}
                        </div>
                        <div className="mt-1 text-[10px] text-neutral-700">
                          desde {formatDate(bot.first_seen)}
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-neutral-500">
                        {categoryLabels[String(bot.category)] ?? String(bot.category)}
                      </td>
                      <td className="py-4 pr-4 tabular-nums text-neutral-300">
                        {String(bot.visits)}
                      </td>
                      <td className="py-4 pr-4 tabular-nums text-neutral-300">
                        {String(bot.unique_paths)}
                      </td>
                      <td className="py-4 text-neutral-500">
                        {formatDate(bot.last_seen)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </section>

        <section className="mt-10 pb-14">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Historial</Eyebrow>
              <h2 className="mt-2 text-2xl font-medium">Todos los accesos</h2>
              <p className="mt-2 text-sm text-neutral-500">
                {filteredCount.toLocaleString("es-MX")} registros · {PAGE_SIZE} por página
              </p>
            </div>

            <form
              method="get"
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[170px_180px_170px_220px_auto]"
            >
              <select
                name="bot"
                defaultValue={botFilter}
                aria-label="Filtrar por crawler"
                className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-300 outline-none focus:border-violet-400/50"
              >
                <option value="">Todos los crawlers</option>
                {filterBotRows.map((row) => (
                  <option key={String(row.bot_name)} value={String(row.bot_name)}>
                    {String(row.bot_name)}
                  </option>
                ))}
              </select>

              <select
                name="category"
                defaultValue={categoryFilter}
                aria-label="Filtrar por tipo"
                className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-300 outline-none focus:border-violet-400/50"
              >
                <option value="">Todos los tipos</option>
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                name="scope"
                defaultValue={scopeFilter}
                aria-label="Filtrar por contenido"
                className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-300 outline-none focus:border-violet-400/50"
              >
                {Object.entries(scopeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <input
                name="q"
                defaultValue={pathQuery}
                placeholder="Buscar URL…"
                aria-label="Buscar por URL"
                className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-200 outline-none placeholder:text-neutral-700 focus:border-violet-400/50"
              />

              <button
                type="submit"
                className="rounded-xl bg-violet-300 px-4 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-violet-200"
              >
                Filtrar
              </button>
            </form>
          </div>

          {filtersActive ? (
            <div className="mt-3">
              <Link href="/admin/crawlers" className="text-xs text-violet-300 hover:text-violet-200">
                Limpiar filtros
              </Link>
            </div>
          ) : null}

          <div className="mt-5 space-y-2">
            {recentRows.length ? (
              recentRows.map((event) => (
                <article
                  key={String(event.id)}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.018] px-4 py-4 transition hover:border-white/[0.13] hover:bg-white/[0.028] sm:px-5"
                >
                  <div className="grid gap-3 md:grid-cols-[190px_minmax(0,1fr)_auto] md:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-neutral-100">
                          {String(event.bot_name)}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] ${isSystemPath(event.path) ? "bg-neutral-800 text-neutral-500" : "bg-violet-300/10 text-violet-200"}`}>
                          {isSystemPath(event.path) ? "infraestructura" : "contenido"}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-neutral-600">
                        {categoryLabels[String(event.category)] ?? String(event.category)}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-sm text-violet-200">
                        {String(event.path)}
                        {event.query_string ? `?${String(event.query_string)}` : ""}
                      </div>
                      {event.referrer ? (
                        <div className="mt-1 truncate text-[11px] text-neutral-700">
                          ref: {String(event.referrer)}
                        </div>
                      ) : null}
                    </div>

                    <time className="text-xs text-neutral-600 md:text-right">
                      {formatDate(event.seen_at)}
                    </time>
                  </div>

                  <details className="mt-3 border-t border-white/[0.06] pt-3 text-xs text-neutral-600">
                    <summary className="cursor-pointer select-none text-neutral-500 hover:text-neutral-300">
                      Detalles técnicos
                    </summary>
                    <div className="mt-3 grid gap-2 break-all leading-5 sm:grid-cols-2">
                      <div><span className="text-neutral-700">Método:</span> {String(event.http_method || "—")}</div>
                      <div><span className="text-neutral-700">Vercel ID:</span> {String(event.vercel_id || "—")}</div>
                      <div className="sm:col-span-2"><span className="text-neutral-700">User-Agent:</span> {String(event.user_agent || "—")}</div>
                    </div>
                  </details>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-12 text-center text-sm text-neutral-600">
                No hay registros que coincidan con esos filtros.
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-5">
            <p className="text-xs text-neutral-600">
              Página {currentPage} de {totalPages}
            </p>
            <div className="flex gap-2">
              {currentPage > 1 ? (
                <Link
                  href={buildHref(currentPage - 1, filters)}
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-300 transition hover:bg-white/[0.04]"
                >
                  ← Anterior
                </Link>
              ) : (
                <span className="rounded-xl border border-white/[0.05] px-3 py-2 text-xs text-neutral-700">
                  ← Anterior
                </span>
              )}

              {currentPage < totalPages ? (
                <Link
                  href={buildHref(currentPage + 1, filters)}
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-300 transition hover:bg-white/[0.04]"
                >
                  Siguiente →
                </Link>
              ) : (
                <span className="rounded-xl border border-white/[0.05] px-3 py-2 text-xs text-neutral-700">
                  Siguiente →
                </span>
              )}
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.018] p-5 sm:p-6">
      {children}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.18em] text-violet-300/80">
      {children}
    </p>
  );
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return <p className="py-6 text-sm text-neutral-600">{children}</p>;
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-600">
        {label}
      </div>
      <div className="mt-3 text-xl font-medium text-neutral-100 sm:text-2xl">
        {value}
      </div>
    </div>
  );
}
