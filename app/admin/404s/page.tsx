import type { Metadata } from "next";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import AdminNav from "../admin-nav";
import LogoutButton from "../crawlers/logout-button";
import ChartCanvas from "@/components/admin/ChartCanvas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "404 · Guigolo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const PAGE_SIZE = 20;

type SearchParams = {
  page?: string | string[];
  q?: string | string[];
  source?: string | string[];
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

function buildHref(
  page: number,
  filters: { q: string; source: string }
) {
  const params = new URLSearchParams();

  if (page > 1) params.set("page", String(page));
  if (filters.q) params.set("q", filters.q);
  if (filters.source) params.set("source", filters.source);

  const query = params.toString();
  return query ? `/admin/404s?${query}` : "/admin/404s";
}

export default async function NotFoundAnalyticsPage({ searchParams }: Props) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">404</h1>
          <p className="mt-4 text-neutral-400">Falta DATABASE_URL.</p>
        </div>
      </main>
    );
  }

  const params = await searchParams;
  const requestedPage = Math.max(1, Number.parseInt(param(params.page), 10) || 1);
  const pathQuery = param(params.q).trim().slice(0, 160);
  const sourceFilter = param(params.source).trim().slice(0, 255);
  const filters = { q: pathQuery, source: sourceFilter };
  const pathPattern = `%${pathQuery}%`;
  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS not_found_events (
      id BIGSERIAL PRIMARY KEY,
      seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      path TEXT NOT NULL,
      query_string TEXT,
      referrer TEXT,
      source_host TEXT,
      user_agent TEXT,
      bot_name TEXT,
      bot_category TEXT
    )
  `;

  const [summaryRows, topPathRows, sourceRows, sourceFilterRows, countRows] =
    await Promise.all([
      sql`
        SELECT
          COUNT(*)::text AS total_events,
          COUNT(DISTINCT path)::text AS unique_paths,
          COUNT(DISTINCT source_host) FILTER (WHERE source_host IS NOT NULL)::text AS unique_sources,
          MAX(seen_at)::text AS last_seen
        FROM not_found_events
      `,
      sql`
        SELECT path, COUNT(*)::text AS visits
        FROM not_found_events
        GROUP BY path
        ORDER BY COUNT(*) DESC, MAX(seen_at) DESC
        LIMIT 8
      `,
      sql`
        SELECT COALESCE(source_host, 'direct') AS source, COUNT(*)::text AS visits
        FROM not_found_events
        GROUP BY COALESCE(source_host, 'direct')
        ORDER BY COUNT(*) DESC
        LIMIT 8
      `,
      sql`
        SELECT DISTINCT source_host
        FROM not_found_events
        WHERE source_host IS NOT NULL
        ORDER BY source_host ASC
      `,
      sql`
        SELECT COUNT(*)::text AS total
        FROM not_found_events
        WHERE
          (${pathQuery} = '' OR path ILIKE ${pathPattern})
          AND (
            ${sourceFilter} = ''
            OR (${sourceFilter} = 'direct' AND source_host IS NULL)
            OR source_host = ${sourceFilter}
          )
      `,
    ]);

  const filteredCount = Number(countRows[0]?.total ?? 0);
  const totalPages = Math.max(1, Math.ceil(filteredCount / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const offset = (currentPage - 1) * PAGE_SIZE;

  const recentRows = await sql`
    SELECT
      id::text,
      seen_at::text,
      path,
      query_string,
      referrer,
      source_host,
      user_agent,
      bot_name
    FROM not_found_events
    WHERE
      (${pathQuery} = '' OR path ILIKE ${pathPattern})
      AND (
        ${sourceFilter} = ''
        OR (${sourceFilter} = 'direct' AND source_host IS NULL)
        OR source_host = ${sourceFilter}
      )
    ORDER BY seen_at DESC
    LIMIT ${PAGE_SIZE}
    OFFSET ${offset}
  `;

  const summary = summaryRows[0] ?? {};
  const filtersActive = Boolean(pathQuery || sourceFilter);

  const pathLabels = topPathRows.map((row) => String(row.path));
  const pathValues = topPathRows.map((row) => Number(row.visits ?? 0));
  const sourceLabels = sourceRows.map((row) =>
    String(row.source) === "direct" ? "Directo" : String(row.source)
  );
  const sourceValues = sourceRows.map((row) => Number(row.visits ?? 0));

  return (
    <main className="min-h-screen bg-[#070709] px-5 py-8 text-neutral-100 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              guigolo · admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              404
            </h1>
            <p className="mt-3 text-sm text-neutral-500">guigolo.com</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/404s"
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-neutral-200"
            >
              Actualizar
            </Link>
            <LogoutButton />
          </div>
        </header>

        <AdminNav current="404s" />

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Registros" value={String(summary.total_events ?? "0")} />
          <Stat label="URLs" value={String(summary.unique_paths ?? "0")} />
          <Stat label="Referidos" value={String(summary.unique_sources ?? "0")} />
          <Stat label="Último" value={formatDate(summary.last_seen)} />
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <Panel>
            <Eyebrow>URLs</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Más frecuentes</h2>
            <ChartCanvas
              type="bar"
              labels={pathLabels}
              datasets={[{ label: "Errores", data: pathValues }]}
              horizontal
              height={300}
              legend={false}
            />
          </Panel>

          <Panel>
            <Eyebrow>Origen</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Referidos</h2>
            <ChartCanvas
              type="doughnut"
              labels={sourceLabels}
              datasets={[{ label: "Errores", data: sourceValues }]}
              height={300}
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
              <div className="mt-2 text-lg font-medium">Accesos 404</div>
            </div>
            <span className="text-xs text-neutral-600">
              {filteredCount.toLocaleString("es-MX")}
            </span>
          </summary>

          <div className="border-t border-white/[0.07] px-5 pb-6 pt-5 sm:px-6">
            <form
              method="get"
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[220px_220px_auto]"
            >
              <input
                name="q"
                defaultValue={pathQuery}
                placeholder="Buscar URL…"
                aria-label="Buscar URL"
                className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-200 outline-none placeholder:text-neutral-700 focus:border-violet-400/50"
              />

              <select
                name="source"
                defaultValue={sourceFilter}
                aria-label="Filtrar por referido"
                className="rounded-xl border border-white/10 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-300 outline-none focus:border-violet-400/50"
              >
                <option value="">Todos los referidos</option>
                <option value="direct">Directo</option>
                {sourceFilterRows.map((row) => (
                  <option key={String(row.source_host)} value={String(row.source_host)}>
                    {String(row.source_host)}
                  </option>
                ))}
              </select>

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
                  href="/admin/404s"
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
                    <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto] md:items-center">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate text-sm text-violet-200">
                            {String(event.path)}
                            {event.query_string ? `?${String(event.query_string)}` : ""}
                          </span>
                          {event.bot_name ? (
                            <span className="shrink-0 rounded-full bg-violet-300/10 px-2 py-0.5 text-[10px] text-violet-200">
                              {String(event.bot_name)}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="truncate text-xs text-neutral-600">
                        {event.source_host ? String(event.source_host) : "Directo"}
                      </div>

                      <time className="text-xs text-neutral-600 md:text-right">
                        {formatDate(event.seen_at)}
                      </time>
                    </div>

                    <details className="mt-3 border-t border-white/[0.06] pt-3 text-xs text-neutral-600">
                      <summary className="cursor-pointer select-none text-neutral-500 hover:text-neutral-300">
                        Detalles
                      </summary>
                      <div className="mt-3 space-y-2 break-all leading-5">
                        {event.referrer ? (
                          <div><span className="text-neutral-700">Referrer:</span> {String(event.referrer)}</div>
                        ) : null}
                        <div><span className="text-neutral-700">User-Agent:</span> {String(event.user_agent || "—")}</div>
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
