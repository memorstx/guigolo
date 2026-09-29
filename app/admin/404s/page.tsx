import type { Metadata } from "next";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import AdminNav from "../admin-nav";
import LogoutButton from "../crawlers/logout-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "404 · Guigolo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const PAGE_SIZE = 50;

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

  await sql`
    CREATE INDEX IF NOT EXISTS not_found_events_seen_at_idx
    ON not_found_events (seen_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS not_found_events_path_idx
    ON not_found_events (path)
  `;

  const [
    summaryRows,
    topPathRows,
    sourceRows,
    sourceFilterRows,
    countRows,
  ] = await Promise.all([
    sql`
      SELECT
        COUNT(*)::text AS total_events,
        COUNT(DISTINCT path)::text AS unique_paths,
        COUNT(DISTINCT source_host) FILTER (WHERE source_host IS NOT NULL)::text AS unique_sources,
        MAX(seen_at)::text AS last_seen
      FROM not_found_events
    `,
    sql`
      SELECT
        path,
        COUNT(*)::text AS visits,
        MAX(seen_at)::text AS last_seen
      FROM not_found_events
      GROUP BY path
      ORDER BY COUNT(*) DESC, MAX(seen_at) DESC
      LIMIT 10
    `,
    sql`
      SELECT
        COALESCE(source_host, 'direct') AS source,
        COUNT(*)::text AS visits
      FROM not_found_events
      GROUP BY COALESCE(source_host, 'direct')
      ORDER BY COUNT(*) DESC
      LIMIT 10
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
      bot_name,
      bot_category
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

        <section className="mt-8 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel>
            <Eyebrow>URLs</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Más frecuentes</h2>

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
                        {formatDate(row.last_seen)}
                      </div>
                    </div>
                    <span className="rounded-lg bg-white/[0.04] px-2.5 py-1 text-xs tabular-nums text-neutral-300">
                      {String(row.visits)}
                    </span>
                  </div>
                ))
              ) : (
                <EmptyText>Sin registros.</EmptyText>
              )}
            </div>
          </Panel>

          <Panel>
            <Eyebrow>Origen</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Referidos</h2>

            <div className="mt-6 space-y-4">
              {sourceRows.length ? (
                sourceRows.map((row) => (
                  <div
                    key={String(row.source)}
                    className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0"
                  >
                    <span className="truncate text-sm text-neutral-300">
                      {String(row.source) === "direct" ? "Directo" : String(row.source)}
                    </span>
                    <span className="text-xs tabular-nums text-neutral-600">
                      {String(row.visits)}
                    </span>
                  </div>
                ))
              ) : (
                <EmptyText>Sin referidos.</EmptyText>
              )}
            </div>
          </Panel>
        </section>

        <section className="mt-10 pb-14">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Historial</Eyebrow>
              <h2 className="mt-2 text-2xl font-medium">Accesos 404</h2>
              <p className="mt-2 text-sm text-neutral-600">
                {filteredCount.toLocaleString("es-MX")} registros · {PAGE_SIZE} por página
              </p>
            </div>

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
          </div>

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
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.018] px-4 py-4 transition hover:border-white/[0.13] hover:bg-white/[0.028] sm:px-5"
                >
                  <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto] md:items-center">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="truncate text-sm text-violet-200">
                          {String(event.path)}
                          {event.query_string ? `?${String(event.query_string)}` : ""}
                        </span>
                        {event.bot_name ? (
                          <span className="rounded-full bg-violet-300/10 px-2 py-0.5 text-[10px] text-violet-200">
                            {String(event.bot_name)}
                          </span>
                        ) : null}
                      </div>

                      {event.referrer ? (
                        <div className="mt-1 truncate text-[11px] text-neutral-700">
                          {String(event.referrer)}
                        </div>
                      ) : null}
                    </div>

                    <div className="text-xs text-neutral-600">
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
                    <div className="mt-3 break-all leading-5">
                      <span className="text-neutral-700">User-Agent:</span>{" "}
                      {String(event.user_agent || "—")}
                    </div>
                  </details>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-12 text-center text-sm text-neutral-600">
                Sin registros.
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
