import type { Metadata } from "next";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import LogoutButton from "./logout-button";
import AdminNav from "../admin-nav";
import ChartCanvas from "@/components/admin/ChartCanvas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Crawler Radar · Guigolo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const PAGE_SIZE = 20;
const SYSTEM_PATHS = ["/robots.txt", "/sitemap.xml"];

const categoryLabels: Record<string, string> = {
  "ai-search": "IA · búsqueda",
  "ai-training": "IA · entrenamiento",
  "ai-user": "IA · usuario",
  search: "Buscadores",
  "seo-audit": "SEO",
  "social-preview": "Social",
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
          <p className="mt-4 text-neutral-400">Falta DATABASE_URL.</p>
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
        COUNT(DISTINCT path) FILTER (
          WHERE path NOT IN ('/robots.txt', '/sitemap.xml')
        )::text AS unique_content_paths,
        MAX(seen_at)::text AS last_seen
      FROM crawler_events
    `,
    sql`
      SELECT
        bot_name,
        COUNT(*)::text AS visits
      FROM crawler_events
      GROUP BY bot_name
      ORDER BY COUNT(*) DESC, MAX(seen_at) DESC
      LIMIT 8
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
        COUNT(*)::text AS visits
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
  const filtersActive = Boolean(
    botFilter || categoryFilter || scopeFilter !== "all" || pathQuery
  );

  const dailyLabels = dailyRows.map((row) => formatDay(String(row.day)));
  const dailyValues = dailyRows.map((row) => Number(row.visits ?? 0));

  const typeLabels = categoryRows.map(
    (row) => categoryLabels[String(row.category)] ?? String(row.category)
  );
  const typeValues = categoryRows.map((row) => Number(row.visits ?? 0));

  const pathLabels = topPathRows.map((row) => String(row.path));
  const pathValues = topPathRows.map((row) => Number(row.visits ?? 0));

  const botLabels = botRows.map((row) => String(row.bot_name));
  const botValues = botRows.map((row) => Number(row.visits ?? 0));

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

        <AdminNav current="crawlers" />

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Solicitudes" value={String(summary.total_events ?? "0")} />
          <Stat label="Crawlers" value={String(summary.unique_bots ?? "0")} />
          <Stat label="URLs rastreadas" value={String(summary.unique_content_paths ?? "0")} />
          <Stat label="Última actividad" value={formatDate(summary.last_seen)} />
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
          <Panel>
            <Eyebrow>Actividad</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Últimos 14 días</h2>
            <ChartCanvas
              type="line"
              labels={dailyLabels}
              datasets={[{ label: "Solicitudes", data: dailyValues }]}
              height={260}
              legend={false}
            />
          </Panel>

          <Panel>
            <Eyebrow>Distribución</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Tipos</h2>
            <ChartCanvas
              type="doughnut"
              labels={typeLabels}
              datasets={[{ label: "Solicitudes", data: typeValues }]}
              height={260}
            />
          </Panel>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <Panel>
            <Eyebrow>Contenido</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Páginas rastreadas</h2>
            <ChartCanvas
              type="bar"
              labels={pathLabels}
              datasets={[{ label: "Solicitudes", data: pathValues }]}
              horizontal
              height={300}
              legend={false}
            />
          </Panel>

          <Panel>
            <Eyebrow>Crawlers</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Actividad por crawler</h2>
            <ChartCanvas
              type="bar"
              labels={botLabels}
              datasets={[{ label: "Solicitudes", data: botValues }]}
              horizontal
              height={300}
              legend={false}
            />
          </Panel>
        </section>

        <details
          className="group mt-8 rounded-[24px] border border-white/[0.08] bg-white/[0.018]"
          open={filtersActive || currentPage > 1}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-6">
            <div>
              <Eyebrow>Historial</Eyebrow>
              <div className="mt-2 text-lg font-medium">Accesos</div>
            </div>
            <span className="text-xs text-neutral-600">
              {filteredCount.toLocaleString("es-MX")}
            </span>
          </summary>

          <div className="border-t border-white/[0.07] px-5 pb-6 pt-5 sm:px-6">
            <form
              method="get"
              className="grid gap-2 sm:grid-cols-2 xl:grid-cols-[170px_180px_170px_220px_auto]"
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
                aria-label="Buscar URL"
                className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-200 outline-none placeholder:text-neutral-700 focus:border-violet-400/50"
              />

              <button
                type="submit"
                className="rounded-xl bg-violet-300 px-4 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-violet-200"
              >
                Filtrar
              </button>
            </form>

            {filtersActive ? (
              <div className="mt-3">
                <Link
                  href="/admin/crawlers"
                  className="text-xs text-violet-300 hover:text-violet-200"
                >
                  Limpiar filtros
                </Link>
              </div>
            ) : null}

            <div className="mt-5 space-y-2">
              {recentRows.length ? (
                recentRows.map((event) => (
                  <article
                    key={String(event.id)}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.018] px-4 py-4"
                  >
                    <div className="grid gap-3 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center">
                      <div>
                        <div className="font-medium text-neutral-100">
                          {String(event.bot_name)}
                        </div>
                        <div className="mt-1 text-[11px] text-neutral-600">
                          {categoryLabels[String(event.category)] ?? String(event.category)}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm text-violet-200">
                            {String(event.path)}
                            {event.query_string ? `?${String(event.query_string)}` : ""}
                          </span>
                          <span className="shrink-0 rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] text-neutral-600">
                            {isSystemPath(event.path) ? "sistema" : "contenido"}
                          </span>
                        </div>
                      </div>

                      <time className="text-xs text-neutral-600 md:text-right">
                        {formatDate(event.seen_at)}
                      </time>
                    </div>

                    <details className="mt-3 border-t border-white/[0.06] pt-3 text-xs text-neutral-600">
                      <summary className="cursor-pointer select-none text-neutral-500 hover:text-neutral-300">
                        Detalles
                      </summary>
                      <div className="mt-3 grid gap-2 break-all leading-5 sm:grid-cols-2">
                        <div><span className="text-neutral-700">Método:</span> {String(event.http_method || "—")}</div>
                        <div><span className="text-neutral-700">Vercel ID:</span> {String(event.vercel_id || "—")}</div>
                        <div className="sm:col-span-2"><span className="text-neutral-700">User-Agent:</span> {String(event.user_agent || "—")}</div>
                        {event.referrer ? (
                          <div className="sm:col-span-2"><span className="text-neutral-700">Referrer:</span> {String(event.referrer)}</div>
                        ) : null}
                      </div>
                    </details>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center text-sm text-neutral-600">
                  Sin registros.
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-5">
              <p className="text-xs text-neutral-600">
                Página {currentPage} de {totalPages}
              </p>
              <div className="flex gap-2">
                {currentPage > 1 ? (
                  <Link
                    href={buildHref(currentPage - 1, filters)}
                    className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-300"
                  >
                    ←
                  </Link>
                ) : null}
                {currentPage < totalPages ? (
                  <Link
                    href={buildHref(currentPage + 1, filters)}
                    className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-300"
                  >
                    →
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </details>

        <div className="h-12" />
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

function Stat({ label, value }: { label: string; value: string }) {
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
