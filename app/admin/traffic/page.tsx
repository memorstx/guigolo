import type { Metadata } from "next";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import AdminNav from "../admin-nav";
import LogoutButton from "../crawlers/logout-button";
import ChartCanvas from "@/components/admin/ChartCanvas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tráfico · Guigolo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const sourceTypeLabels: Record<string, string> = {
  ai: "IA",
  search: "Buscadores",
  social: "Social",
  jobs: "Empleo",
  portfolio: "Portafolio",
  direct: "Directo",
  internal: "Interno",
  other: "Otros",
};

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

export default async function TrafficPage() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">Tráfico</h1>
          <p className="mt-4 text-neutral-400">Falta DATABASE_URL.</p>
        </div>
      </main>
    );
  }

  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS traffic_events (
      id BIGSERIAL PRIMARY KEY,
      seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      query_string TEXT,
      referrer TEXT,
      source TEXT NOT NULL,
      source_type TEXT NOT NULL,
      locale TEXT NOT NULL,
      is_entry BOOLEAN NOT NULL DEFAULT FALSE,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS traffic_events_seen_at_idx
    ON traffic_events (seen_at DESC)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS traffic_events_session_idx
    ON traffic_events (session_id)
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS traffic_events_source_idx
    ON traffic_events (source, source_type)
  `;

  const [
    summaryRows,
    dailyRows,
    typeRows,
    sourceRows,
    landingRows,
    recentRows,
  ] = await Promise.all([
    sql`
      SELECT
        COUNT(*)::text AS pageviews,
        COUNT(DISTINCT session_id)::text AS sessions,
        COUNT(*) FILTER (WHERE is_entry AND source_type = 'ai')::text AS ai_entries,
        MAX(seen_at)::text AS last_seen
      FROM traffic_events
    `,
    sql`
      SELECT
        DATE_TRUNC(
          'day',
          seen_at AT TIME ZONE 'America/Mexico_City'
        )::date::text AS day,
        COUNT(*) FILTER (WHERE is_entry)::text AS sessions
      FROM traffic_events
      WHERE seen_at >= NOW() - INTERVAL '27 days'
      GROUP BY day
      ORDER BY day ASC
    `,
    sql`
      SELECT
        source_type,
        COUNT(*)::text AS visits
      FROM traffic_events
      WHERE is_entry
        AND source_type <> 'internal'
      GROUP BY source_type
      ORDER BY COUNT(*) DESC
    `,
    sql`
      SELECT
        source,
        COUNT(*)::text AS visits
      FROM traffic_events
      WHERE is_entry
        AND source_type <> 'internal'
      GROUP BY source
      ORDER BY COUNT(*) DESC
      LIMIT 8
    `,
    sql`
      SELECT
        path,
        COUNT(*)::text AS visits
      FROM traffic_events
      WHERE is_entry
      GROUP BY path
      ORDER BY COUNT(*) DESC
      LIMIT 8
    `,
    sql`
      SELECT
        id::text,
        seen_at::text,
        path,
        source,
        source_type,
        locale,
        referrer,
        utm_campaign
      FROM traffic_events
      WHERE is_entry
      ORDER BY seen_at DESC
      LIMIT 12
    `,
  ]);

  const summary = summaryRows[0] ?? {};

  const dailyLabels = dailyRows.map((row) => formatDay(String(row.day)));
  const dailyValues = dailyRows.map((row) => Number(row.sessions ?? 0));

  const typeLabels = typeRows.map(
    (row) => sourceTypeLabels[String(row.source_type)] ?? String(row.source_type)
  );
  const typeValues = typeRows.map((row) => Number(row.visits ?? 0));

  const sourceLabels = sourceRows.map((row) =>
    String(row.source) === "direct" ? "Directo" : String(row.source)
  );
  const sourceValues = sourceRows.map((row) => Number(row.visits ?? 0));

  const landingLabels = landingRows.map((row) => String(row.path));
  const landingValues = landingRows.map((row) => Number(row.visits ?? 0));

  return (
    <main className="min-h-screen bg-[#070709] px-5 py-8 text-neutral-100 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              guigolo · admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tráfico
            </h1>
            <p className="mt-3 text-sm text-neutral-500">guigolo.com</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/traffic"
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-neutral-200"
            >
              Actualizar
            </Link>
            <LogoutButton />
          </div>
        </header>

        <AdminNav current="traffic" />

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Sesiones" value={String(summary.sessions ?? "0")} />
          <Stat label="Páginas vistas" value={String(summary.pageviews ?? "0")} />
          <Stat label="Entradas desde IA" value={String(summary.ai_entries ?? "0")} />
          <Stat label="Última visita" value={formatDate(summary.last_seen)} />
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
          <Panel>
            <Eyebrow>Sesiones</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Últimos 28 días</h2>
            <ChartCanvas
              type="line"
              labels={dailyLabels}
              datasets={[{ label: "Sesiones", data: dailyValues }]}
              height={260}
              legend={false}
            />
          </Panel>

          <Panel>
            <Eyebrow>Origen</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Canales</h2>
            <ChartCanvas
              type="doughnut"
              labels={typeLabels}
              datasets={[{ label: "Entradas", data: typeValues }]}
              height={260}
            />
          </Panel>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <Panel>
            <Eyebrow>Referidos</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Fuentes</h2>
            <ChartCanvas
              type="bar"
              labels={sourceLabels}
              datasets={[{ label: "Entradas", data: sourceValues }]}
              horizontal
              height={300}
              legend={false}
            />
          </Panel>

          <Panel>
            <Eyebrow>Entrada</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Landing pages</h2>
            <ChartCanvas
              type="bar"
              labels={landingLabels}
              datasets={[{ label: "Entradas", data: landingValues }]}
              horizontal
              height={300}
              legend={false}
            />
          </Panel>
        </section>

        <section className="mt-8 pb-14">
          <div>
            <Eyebrow>Reciente</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Últimas entradas</h2>
          </div>

          <div className="mt-5 grid gap-2 lg:grid-cols-2">
            {recentRows.length ? (
              recentRows.map((event) => (
                <article
                  key={String(event.id)}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.018] px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="truncate text-sm text-violet-200">
                        {String(event.path)}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-neutral-600">
                        <span>
                          {String(event.source) === "direct"
                            ? "Directo"
                            : String(event.source)}
                        </span>
                        <span>·</span>
                        <span>
                          {sourceTypeLabels[String(event.source_type)] ??
                            String(event.source_type)}
                        </span>
                        <span>·</span>
                        <span>{String(event.locale).toUpperCase()}</span>
                      </div>
                    </div>

                    <time className="shrink-0 text-[11px] text-neutral-700">
                      {formatDate(event.seen_at)}
                    </time>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-12 text-center text-sm text-neutral-600 lg:col-span-2">
                Sin datos todavía.
              </div>
            )}
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
