import type { Metadata } from "next";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import AdminNav from "../admin-nav";
import LogoutButton from "../crawlers/logout-button";
import ChartCanvas from "@/components/admin/ChartCanvas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Performance · Guigolo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const ratingLabels: Record<string, string> = {
  good: "Bueno",
  "needs-improvement": "Mejorable",
  poor: "Pobre",
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

function formatMetric(name: string, value: unknown) {
  if (value === null || value === undefined) return "—";

  const number = Number(value);
  if (!Number.isFinite(number)) return "—";

  if (name === "CLS") return number.toFixed(3);
  return `${Math.round(number).toLocaleString("es-MX")} ms`;
}

export default async function PerformancePage() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">Performance</h1>
          <p className="mt-4 text-neutral-400">Falta DATABASE_URL.</p>
        </div>
      </main>
    );
  }

  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS performance_events (
      id BIGSERIAL PRIMARY KEY,
      seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      path TEXT NOT NULL,
      metric_id TEXT NOT NULL,
      metric_name TEXT NOT NULL,
      value DOUBLE PRECISION NOT NULL,
      rating TEXT,
      navigation_type TEXT
    )
  `;

  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS performance_events_metric_idx
    ON performance_events (metric_id, metric_name)
  `;

  const [
    summaryRows,
    ratingRows,
    dailyLcpRows,
    lcpPageRows,
    inpPageRows,
    recentRows,
  ] = await Promise.all([
    sql`
      SELECT
        percentile_cont(0.75) WITHIN GROUP (ORDER BY value)
          FILTER (WHERE metric_name = 'LCP') AS lcp_p75,
        percentile_cont(0.75) WITHIN GROUP (ORDER BY value)
          FILTER (WHERE metric_name = 'INP') AS inp_p75,
        percentile_cont(0.75) WITHIN GROUP (ORDER BY value)
          FILTER (WHERE metric_name = 'CLS') AS cls_p75,
        COUNT(*) FILTER (
          WHERE metric_name IN ('LCP', 'INP', 'CLS')
        )::text AS samples
      FROM performance_events
    `,
    sql`
      SELECT
        COALESCE(rating, 'unknown') AS rating,
        COUNT(*)::text AS samples
      FROM performance_events
      WHERE metric_name IN ('LCP', 'INP', 'CLS')
      GROUP BY COALESCE(rating, 'unknown')
      ORDER BY COUNT(*) DESC
    `,
    sql`
      SELECT
        DATE_TRUNC(
          'day',
          seen_at AT TIME ZONE 'America/Mexico_City'
        )::date::text AS day,
        percentile_cont(0.75) WITHIN GROUP (ORDER BY value) AS p75
      FROM performance_events
      WHERE metric_name = 'LCP'
        AND seen_at >= NOW() - INTERVAL '13 days'
      GROUP BY day
      ORDER BY day ASC
    `,
    sql`
      SELECT
        path,
        percentile_cont(0.75) WITHIN GROUP (ORDER BY value) AS p75,
        COUNT(*)::text AS samples
      FROM performance_events
      WHERE metric_name = 'LCP'
      GROUP BY path
      HAVING COUNT(*) >= 1
      ORDER BY percentile_cont(0.75) WITHIN GROUP (ORDER BY value) DESC
      LIMIT 8
    `,
    sql`
      SELECT
        path,
        percentile_cont(0.75) WITHIN GROUP (ORDER BY value) AS p75,
        COUNT(*)::text AS samples
      FROM performance_events
      WHERE metric_name = 'INP'
      GROUP BY path
      HAVING COUNT(*) >= 1
      ORDER BY percentile_cont(0.75) WITHIN GROUP (ORDER BY value) DESC
      LIMIT 8
    `,
    sql`
      SELECT
        id::text,
        seen_at::text,
        path,
        metric_name,
        value,
        rating,
        navigation_type
      FROM performance_events
      ORDER BY seen_at DESC
      LIMIT 18
    `,
  ]);

  const summary = summaryRows[0] ?? {};

  const ratingLabelsList = ratingRows.map(
    (row) => ratingLabels[String(row.rating)] ?? String(row.rating)
  );
  const ratingValues = ratingRows.map((row) => Number(row.samples ?? 0));

  const dailyLabels = dailyLcpRows.map((row) => formatDay(String(row.day)));
  const dailyValues = dailyLcpRows.map((row) => Math.round(Number(row.p75 ?? 0)));

  const lcpLabels = lcpPageRows.map((row) => String(row.path));
  const lcpValues = lcpPageRows.map((row) => Math.round(Number(row.p75 ?? 0)));

  const inpLabels = inpPageRows.map((row) => String(row.path));
  const inpValues = inpPageRows.map((row) => Math.round(Number(row.p75 ?? 0)));

  return (
    <main className="min-h-screen bg-[#070709] px-5 py-8 text-neutral-100 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              guigolo · admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Performance
            </h1>
            <p className="mt-3 text-sm text-neutral-500">guigolo.com</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/performance"
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-neutral-200"
            >
              Actualizar
            </Link>
            <LogoutButton />
          </div>
        </header>

        <AdminNav current="performance" />

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="LCP p75" value={formatMetric("LCP", summary.lcp_p75)} />
          <Stat label="INP p75" value={formatMetric("INP", summary.inp_p75)} />
          <Stat label="CLS p75" value={formatMetric("CLS", summary.cls_p75)} />
          <Stat label="Muestras" value={String(summary.samples ?? "0")} />
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
          <Panel>
            <Eyebrow>LCP</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Últimos 14 días</h2>
            <ChartCanvas
              type="line"
              labels={dailyLabels}
              datasets={[{ label: "LCP p75", data: dailyValues }]}
              height={260}
              legend={false}
            />
          </Panel>

          <Panel>
            <Eyebrow>Core Web Vitals</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Estado</h2>
            <ChartCanvas
              type="doughnut"
              labels={ratingLabelsList}
              datasets={[{ label: "Muestras", data: ratingValues }]}
              height={260}
            />
          </Panel>
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-2">
          <Panel>
            <Eyebrow>LCP</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Por página</h2>
            <ChartCanvas
              type="bar"
              labels={lcpLabels}
              datasets={[{ label: "LCP p75 · ms", data: lcpValues }]}
              horizontal
              height={300}
              legend={false}
            />
          </Panel>

          <Panel>
            <Eyebrow>INP</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Por página</h2>
            <ChartCanvas
              type="bar"
              labels={inpLabels}
              datasets={[{ label: "INP p75 · ms", data: inpValues }]}
              horizontal
              height={300}
              legend={false}
            />
          </Panel>
        </section>

        <details className="mt-8 rounded-[24px] border border-white/[0.08] bg-white/[0.018]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-6">
            <div>
              <Eyebrow>Muestras</Eyebrow>
              <div className="mt-2 text-lg font-medium">Recientes</div>
            </div>
            <span className="text-xs text-neutral-600">
              {String(summary.samples ?? "0")}
            </span>
          </summary>

          <div className="grid gap-2 border-t border-white/[0.07] px-5 pb-6 pt-5 lg:grid-cols-2 sm:px-6">
            {recentRows.length ? (
              recentRows.map((event) => (
                <article
                  key={String(event.id)}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.018] px-4 py-4"
                >
                  <div className="grid gap-3 sm:grid-cols-[70px_minmax(0,1fr)_auto] sm:items-center">
                    <div>
                      <div className="text-sm font-medium text-neutral-100">
                        {String(event.metric_name)}
                      </div>
                      <div className="mt-1 text-[10px] text-neutral-600">
                        {event.rating
                          ? ratingLabels[String(event.rating)] ?? String(event.rating)
                          : "—"}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-xs text-violet-200">
                        {String(event.path)}
                      </div>
                      <div className="mt-1 text-[10px] text-neutral-700">
                        {formatMetric(String(event.metric_name), event.value)}
                      </div>
                    </div>

                    <time className="text-[10px] text-neutral-700 sm:text-right">
                      {formatDate(event.seen_at)}
                    </time>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center text-sm text-neutral-600 lg:col-span-2">
                Sin datos todavía.
              </div>
            )}
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
