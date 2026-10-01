import type { Metadata } from "next";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import AdminNav from "./admin-nav";
import LogoutButton from "./crawlers/logout-button";
import ChartCanvas from "@/components/admin/ChartCanvas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Overview · Guigolo",
  robots: { index: false, follow: false, nocache: true },
};

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
  return name === "CLS" ? number.toFixed(3) : `${Math.round(number)} ms`;
}

export default async function AdminOverviewPage() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">Overview</h1>
          <p className="mt-4 text-neutral-400">Falta DATABASE_URL.</p>
        </div>
      </main>
    );
  }

  const sql = neon(databaseUrl);
  const tableRows = await sql`
    SELECT
      to_regclass('public.traffic_events')::text AS traffic,
      to_regclass('public.action_events')::text AS actions,
      to_regclass('public.crawler_events')::text AS crawlers,
      to_regclass('public.not_found_events')::text AS not_found,
      to_regclass('public.performance_events')::text AS performance,
      to_regclass('public.error_events')::text AS errors
  `;

  const tables = tableRows[0] ?? {};
  const has = (key: string) => Boolean(tables[key]);

  const empty: Record<string, unknown>[] = [];

  const [
    trafficSummary,
    actionSummary,
    crawlerSummary,
    notFoundSummary,
    errorSummary,
    performanceSummary,
    dailyTraffic,
    sourceRows,
  ] = await Promise.all([
    has("traffic")
      ? sql`
          SELECT
            COUNT(*) FILTER (WHERE is_entry AND seen_at >= NOW() - INTERVAL '7 days')::text AS entries,
            COUNT(DISTINCT session_id) FILTER (WHERE seen_at >= NOW() - INTERVAL '7 days')::text AS sessions
          FROM traffic_events
        `
      : Promise.resolve(empty),
    has("actions")
      ? sql`
          SELECT
            COUNT(*) FILTER (WHERE seen_at >= NOW() - INTERVAL '7 days')::text AS actions,
            COUNT(*) FILTER (
              WHERE seen_at >= NOW() - INTERVAL '7 days'
                AND action_type IN ('contact_open','contact_submit','email_click','phone_click','whatsapp_click','resume_open')
            )::text AS key_actions,
            COUNT(*) FILTER (
              WHERE seen_at >= NOW() - INTERVAL '7 days'
                AND action_type = 'contact_submit'
            )::text AS contacts
          FROM action_events
        `
      : Promise.resolve(empty),
    has("crawlers")
      ? sql`
          SELECT COUNT(*) FILTER (WHERE seen_at >= NOW() - INTERVAL '7 days')::text AS requests
          FROM crawler_events
        `
      : Promise.resolve(empty),
    has("not_found")
      ? sql`
          SELECT COUNT(*) FILTER (WHERE seen_at >= NOW() - INTERVAL '7 days')::text AS total
          FROM not_found_events
        `
      : Promise.resolve(empty),
    has("errors")
      ? sql`
          SELECT COUNT(*) FILTER (WHERE seen_at >= NOW() - INTERVAL '7 days')::text AS total
          FROM error_events
        `
      : Promise.resolve(empty),
    has("performance")
      ? sql`
          SELECT
            percentile_cont(0.75) WITHIN GROUP (ORDER BY value)
              FILTER (WHERE metric_name = 'LCP') AS lcp,
            percentile_cont(0.75) WITHIN GROUP (ORDER BY value)
              FILTER (WHERE metric_name = 'INP') AS inp,
            percentile_cont(0.75) WITHIN GROUP (ORDER BY value)
              FILTER (WHERE metric_name = 'CLS') AS cls
          FROM performance_events
          WHERE seen_at >= NOW() - INTERVAL '7 days'
        `
      : Promise.resolve(empty),
    has("traffic")
      ? sql`
          SELECT
            DATE_TRUNC('day', seen_at AT TIME ZONE 'America/Mexico_City')::date::text AS day,
            COUNT(*) FILTER (WHERE is_entry)::text AS entries
          FROM traffic_events
          WHERE seen_at >= NOW() - INTERVAL '13 days'
          GROUP BY day
          ORDER BY day ASC
        `
      : Promise.resolve(empty),
    has("traffic")
      ? sql`
          SELECT source, COUNT(*)::text AS entries
          FROM traffic_events
          WHERE is_entry
            AND seen_at >= NOW() - INTERVAL '7 days'
            AND source_type <> 'internal'
          GROUP BY source
          ORDER BY COUNT(*) DESC
          LIMIT 8
        `
      : Promise.resolve(empty),
  ]);

  const traffic = trafficSummary[0] ?? {};
  const actions = actionSummary[0] ?? {};
  const crawlers = crawlerSummary[0] ?? {};
  const notFound = notFoundSummary[0] ?? {};
  const errors = errorSummary[0] ?? {};
  const performance = performanceSummary[0] ?? {};

  const dayLabels = dailyTraffic.map((row) => formatDay(String(row.day)));
  const dayValues = dailyTraffic.map((row) => Number(row.entries ?? 0));
  const sourceLabels = sourceRows.map((row) =>
    String(row.source) === "direct" ? "Directo" : String(row.source)
  );
  const sourceValues = sourceRows.map((row) => Number(row.entries ?? 0));

  return (
    <main className="min-h-screen bg-[#070709] px-5 py-8 text-neutral-100 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              guigolo · admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Overview
            </h1>
            <p className="mt-3 text-sm text-neutral-500">
              Qué está pasando en guigolo.com sin brincar entre módulos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-neutral-200"
            >
              Actualizar
            </Link>
            <LogoutButton />
          </div>
        </header>

        <AdminNav current="overview" />

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Sesiones · 7 días" value={String(traffic.sessions ?? "0")} />
          <Stat label="Entradas · 7 días" value={String(traffic.entries ?? "0")} />
          <Stat label="Acciones clave · 7 días" value={String(actions.key_actions ?? "0")} />
          <Stat label="Contactos · 7 días" value={String(actions.contacts ?? "0")} />
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-[1.35fr_0.85fr]">
          <Panel>
            <Eyebrow>Audiencia</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Entradas · últimos 14 días</h2>
            <ChartCanvas
              type="line"
              labels={dayLabels}
              datasets={[{ label: "Entradas", data: dayValues }]}
              height={270}
              legend={false}
            />
          </Panel>

          <Panel>
            <Eyebrow>Adquisición</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Principales fuentes · 7 días</h2>
            <ChartCanvas
              type="doughnut"
              labels={sourceLabels}
              datasets={[{ label: "Entradas", data: sourceValues }]}
              height={270}
            />
          </Panel>
        </section>

        <section className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Signal href="/admin/actions" label="Acciones" value={String(actions.actions ?? "0")} note="7 días" />
          <Signal href="/admin/crawlers" label="Crawler requests" value={String(crawlers.requests ?? "0")} note="7 días" />
          <Signal href="/admin/404s" label="404" value={String(notFound.total ?? "0")} note="7 días" />
          <Signal href="/admin/health" label="Errores" value={String(errors.total ?? "0")} note="7 días" />
        </section>

        <section className="mt-4 grid gap-4 lg:grid-cols-3">
          <Panel>
            <Eyebrow>Core Web Vitals</Eyebrow>
            <h2 className="mt-3 text-lg font-medium">LCP p75</h2>
            <p className="mt-5 text-3xl font-semibold">{formatMetric("LCP", performance.lcp)}</p>
          </Panel>
          <Panel>
            <Eyebrow>Core Web Vitals</Eyebrow>
            <h2 className="mt-3 text-lg font-medium">INP p75</h2>
            <p className="mt-5 text-3xl font-semibold">{formatMetric("INP", performance.inp)}</p>
          </Panel>
          <Panel>
            <Eyebrow>Core Web Vitals</Eyebrow>
            <h2 className="mt-3 text-lg font-medium">CLS p75</h2>
            <p className="mt-5 text-3xl font-semibold">{formatMetric("CLS", performance.cls)}</p>
          </Panel>
        </section>

        <div className="mt-8 rounded-[24px] border border-white/[0.08] bg-white/[0.018] p-5 sm:p-6">
          <Eyebrow>Privacidad de medición</Eyebrow>
          <h2 className="mt-2 text-lg font-medium">El admin no forma parte de la audiencia.</h2>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-neutral-500">
            Las rutas /admin no alimentan Tráfico, Acciones ni Performance propios, y GA4/Hotjar
            tampoco se cargan cuando entras directamente al admin. Así tus revisiones internas no
            inflan las métricas del portafolio.
          </p>
        </div>

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
      <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-600">{label}</div>
      <div className="mt-3 text-2xl font-medium text-neutral-100">{value}</div>
    </div>
  );
}

function Signal({
  href,
  label,
  value,
  note,
}: {
  href: string;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-5 transition hover:border-violet-300/20 hover:bg-white/[0.035]"
    >
      <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-600">{label}</div>
      <div className="mt-3 text-2xl font-medium text-neutral-100">{value}</div>
      <div className="mt-2 text-[10px] text-neutral-700">{note}</div>
    </Link>
  );
}
