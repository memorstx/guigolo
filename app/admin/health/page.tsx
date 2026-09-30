import type { Metadata } from "next";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import AdminNav from "../admin-nav";
import LogoutButton from "../crawlers/logout-button";
import ChartCanvas from "@/components/admin/ChartCanvas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Health · Guigolo",
  robots: { index: false, follow: false, nocache: true },
};

const typeLabels: Record<string, string> = {
  runtime: "JavaScript",
  unhandled_rejection: "Promise",
  render: "Render",
};

function formatDate(value: unknown) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date(String(value)));
}

export default async function HealthPage() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">Health</h1>
          <p className="mt-4 text-neutral-400">Falta DATABASE_URL.</p>
        </div>
      </main>
    );
  }

  const sql = neon(databaseUrl);
  const startedAt = Date.now();

  await sql`SELECT 1 AS ok`;
  const databaseLatency = Date.now() - startedAt;

  await sql`
    CREATE TABLE IF NOT EXISTS error_events (
      id BIGSERIAL PRIMARY KEY,
      seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      path TEXT NOT NULL,
      error_type TEXT NOT NULL,
      message TEXT NOT NULL,
      stack TEXT,
      source TEXT,
      line_number INTEGER,
      column_number INTEGER,
      user_agent TEXT
    )
  `;

  const [summaryRows, typeRows, pathRows, recentRows] = await Promise.all([
    sql`
      SELECT
        COUNT(*) FILTER (WHERE seen_at >= NOW() - INTERVAL '24 hours')::text AS last_24h,
        COUNT(*) FILTER (WHERE seen_at >= NOW() - INTERVAL '7 days')::text AS last_7d,
        MAX(seen_at)::text AS last_error
      FROM error_events
    `,
    sql`
      SELECT error_type, COUNT(*)::text AS total
      FROM error_events
      WHERE seen_at >= NOW() - INTERVAL '7 days'
      GROUP BY error_type
      ORDER BY COUNT(*) DESC
    `,
    sql`
      SELECT path, COUNT(*)::text AS total
      FROM error_events
      WHERE seen_at >= NOW() - INTERVAL '7 days'
      GROUP BY path
      ORDER BY COUNT(*) DESC, MAX(seen_at) DESC
      LIMIT 8
    `,
    sql`
      SELECT
        id::text,
        seen_at::text,
        path,
        error_type,
        message,
        source,
        line_number,
        column_number
      FROM error_events
      ORDER BY seen_at DESC
      LIMIT 20
    `,
  ]);

  const summary = summaryRows[0] ?? {};
  const errorTypeLabels = typeRows.map(
    (row) => typeLabels[String(row.error_type)] ?? String(row.error_type)
  );
  const errorTypeValues = typeRows.map((row) => Number(row.total ?? 0));
  const pathLabels = pathRows.map((row) => String(row.path));
  const pathValues = pathRows.map((row) => Number(row.total ?? 0));

  return (
    <main className="min-h-screen bg-[#070709] px-5 py-8 text-neutral-100 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              guigolo · admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Health
            </h1>
            <p className="mt-3 text-sm text-neutral-500">
              Estado actual y errores del sitio público.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/health"
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-neutral-200"
            >
              Actualizar
            </Link>
            <LogoutButton />
          </div>
        </header>

        <AdminNav current="health" />

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="App" value="Online" detail="Esta vista respondió correctamente." />
          <Stat label="Database" value="Online" detail={`${databaseLatency} ms al consultar Neon`} />
          <Stat label="Errores · 24 h" value={String(summary.last_24h ?? "0")} />
          <Stat label="Último error" value={formatDate(summary.last_error)} />
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]">
          <Panel>
            <Eyebrow>Errores · 7 días</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Por tipo</h2>
            <ChartCanvas
              type="doughnut"
              labels={errorTypeLabels}
              datasets={[{ label: "Errores", data: errorTypeValues }]}
              height={280}
            />
          </Panel>

          <Panel>
            <Eyebrow>Rutas · 7 días</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Dónde están ocurriendo</h2>
            <ChartCanvas
              type="bar"
              labels={pathLabels}
              datasets={[{ label: "Errores", data: pathValues }]}
              horizontal
              height={280}
              legend={false}
            />
          </Panel>
        </section>

        <details className="mt-8 rounded-[24px] border border-white/[0.08] bg-white/[0.018]" open>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-6">
            <div>
              <Eyebrow>Diagnóstico</Eyebrow>
              <div className="mt-2 text-lg font-medium">Errores recientes</div>
            </div>
            <span className="text-xs text-neutral-600">
              {String(summary.last_7d ?? "0")} · 7 días
            </span>
          </summary>

          <div className="grid gap-2 border-t border-white/[0.07] px-5 pb-6 pt-5 sm:px-6">
            {recentRows.length ? (
              recentRows.map((event) => (
                <article
                  key={String(event.id)}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.018] px-4 py-4"
                >
                  <div className="grid gap-3 lg:grid-cols-[130px_minmax(0,1fr)_auto] lg:items-start">
                    <div>
                      <div className="text-xs font-medium text-violet-200">
                        {typeLabels[String(event.error_type)] ?? String(event.error_type)}
                      </div>
                      <time className="mt-1 block text-[10px] text-neutral-700">
                        {formatDate(event.seen_at)}
                      </time>
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-xs text-neutral-300">
                        {String(event.path)}
                      </div>
                      <div className="mt-2 break-words text-xs leading-relaxed text-neutral-500">
                        {String(event.message)}
                      </div>
                      {event.source ? (
                        <div className="mt-2 truncate text-[10px] text-neutral-700">
                          {String(event.source)}
                          {event.line_number ? `:${String(event.line_number)}` : ""}
                          {event.column_number ? `:${String(event.column_number)}` : ""}
                        </div>
                      ) : null}
                    </div>

                    <span className="text-[10px] text-neutral-700">public</span>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center text-sm text-neutral-600">
                No hay errores registrados. Buena señal; tampoco significa uptime perfecto.
              </div>
            )}
          </div>
        </details>

        <p className="mt-5 text-xs leading-relaxed text-neutral-600">
          Health confirma disponibilidad al momento de abrir esta vista y registra errores del navegador/render.
          No sustituye un monitor externo de uptime durante las 24 horas.
        </p>

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

function Stat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/[0.08] bg-white/[0.02] p-5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-600">
        {label}
      </div>
      <div className="mt-3 text-xl font-medium text-neutral-100 sm:text-2xl">
        {value}
      </div>
      {detail ? <div className="mt-2 text-[10px] text-neutral-600">{detail}</div> : null}
    </div>
  );
}
