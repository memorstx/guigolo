import type { Metadata } from "next";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import AdminNav from "../admin-nav";
import LogoutButton from "../crawlers/logout-button";
import ChartCanvas from "@/components/admin/ChartCanvas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acciones · Guigolo",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const actionLabels: Record<string, string> = {
  contact_open: "Abrir contacto",
  contact_submit: "Enviar contacto",
  email_click: "Correo",
  phone_click: "Teléfono",
  whatsapp_click: "WhatsApp",
  resume_open: "CV",
  project_open: "Abrir proyecto",
  project_external: "Sitio de proyecto",
  locale_switch: "Cambiar idioma",
  external_click: "Enlace externo",
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

export default async function ActionsPage() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return (
      <main className="min-h-screen bg-neutral-950 px-6 py-16 text-neutral-100">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-semibold">Acciones</h1>
          <p className="mt-4 text-neutral-400">Falta DATABASE_URL.</p>
        </div>
      </main>
    );
  }

  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS action_events (
      id BIGSERIAL PRIMARY KEY,
      seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      session_id TEXT NOT NULL,
      path TEXT NOT NULL,
      action_type TEXT NOT NULL,
      action_label TEXT,
      href TEXT
    )
  `;

  const [summaryRows, typeRows, pathRows, sourceRows, recentRows] =
    await Promise.all([
      sql`
        SELECT
          COUNT(*)::text AS total_actions,
          COUNT(DISTINCT session_id)::text AS sessions,
          COUNT(*) FILTER (
            WHERE action_type IN (
              'contact_submit',
              'email_click',
              'phone_click',
              'whatsapp_click',
              'resume_open'
            )
          )::text AS key_actions,
          COUNT(*) FILTER (
            WHERE action_type = 'contact_submit'
          )::text AS contacts
        FROM action_events
      `,
      sql`
        SELECT action_type, COUNT(*)::text AS actions
        FROM action_events
        GROUP BY action_type
        ORDER BY COUNT(*) DESC
        LIMIT 10
      `,
      sql`
        SELECT path, COUNT(*)::text AS actions
        FROM action_events
        GROUP BY path
        ORDER BY COUNT(*) DESC
        LIMIT 8
      `,
      sql`
        SELECT
          COALESCE(entry.source_type, 'other') AS source_type,
          COUNT(*)::text AS actions
        FROM action_events a
        LEFT JOIN LATERAL (
          SELECT source_type
          FROM traffic_events t
          WHERE t.session_id = a.session_id
            AND t.is_entry
          ORDER BY t.seen_at ASC
          LIMIT 1
        ) entry ON true
        GROUP BY COALESCE(entry.source_type, 'other')
        ORDER BY COUNT(*) DESC
      `,
      sql`
        SELECT
          a.id::text,
          a.seen_at::text,
          a.path,
          a.action_type,
          a.action_label,
          a.href,
          COALESCE(entry.source, '—') AS source,
          COALESCE(entry.source_type, 'other') AS source_type
        FROM action_events a
        LEFT JOIN LATERAL (
          SELECT source, source_type
          FROM traffic_events t
          WHERE t.session_id = a.session_id
            AND t.is_entry
          ORDER BY t.seen_at ASC
          LIMIT 1
        ) entry ON true
        ORDER BY a.seen_at DESC
        LIMIT 16
      `,
    ]);

  const summary = summaryRows[0] ?? {};

  const typeLabels = typeRows.map(
    (row) => actionLabels[String(row.action_type)] ?? String(row.action_type)
  );
  const typeValues = typeRows.map((row) => Number(row.actions ?? 0));

  const pathLabels = pathRows.map((row) => String(row.path));
  const pathValues = pathRows.map((row) => Number(row.actions ?? 0));

  const sourceLabels = sourceRows.map(
    (row) => sourceTypeLabels[String(row.source_type)] ?? String(row.source_type)
  );
  const sourceValues = sourceRows.map((row) => Number(row.actions ?? 0));

  return (
    <main className="min-h-screen bg-[#070709] px-5 py-8 text-neutral-100 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 border-b border-white/[0.07] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">
              guigolo · admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Acciones
            </h1>
            <p className="mt-3 text-sm text-neutral-500">guigolo.com</p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin/actions"
              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-neutral-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-neutral-200"
            >
              Actualizar
            </Link>
            <LogoutButton />
          </div>
        </header>

        <AdminNav current="actions" />

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Stat label="Acciones" value={String(summary.total_actions ?? "0")} />
          <Stat label="Sesiones con acción" value={String(summary.sessions ?? "0")} />
          <Stat label="Acciones clave" value={String(summary.key_actions ?? "0")} />
          <Stat label="Contactos enviados" value={String(summary.contacts ?? "0")} />
        </section>

        <section className="mt-8 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel>
            <Eyebrow>Interacción</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Acciones</h2>
            <ChartCanvas
              type="bar"
              labels={typeLabels}
              datasets={[{ label: "Acciones", data: typeValues }]}
              horizontal
              height={300}
              legend={false}
            />
          </Panel>

          <Panel>
            <Eyebrow>Origen</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Canales</h2>
            <ChartCanvas
              type="doughnut"
              labels={sourceLabels}
              datasets={[{ label: "Acciones", data: sourceValues }]}
              height={300}
            />
          </Panel>
        </section>

        <section className="mt-4">
          <Panel>
            <Eyebrow>Páginas</Eyebrow>
            <h2 className="mt-2 text-xl font-medium">Dónde interactúan</h2>
            <ChartCanvas
              type="bar"
              labels={pathLabels}
              datasets={[{ label: "Acciones", data: pathValues }]}
              horizontal
              height={300}
              legend={false}
            />
          </Panel>
        </section>

        <details className="mt-8 rounded-[24px] border border-white/[0.08] bg-white/[0.018]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-6">
            <div>
              <Eyebrow>Historial</Eyebrow>
              <div className="mt-2 text-lg font-medium">Actividad reciente</div>
            </div>
            <span className="text-xs text-neutral-600">
              {String(summary.total_actions ?? "0")}
            </span>
          </summary>

          <div className="grid gap-2 border-t border-white/[0.07] px-5 pb-6 pt-5 lg:grid-cols-2 sm:px-6">
            {recentRows.length ? (
              recentRows.map((event) => (
                <article
                  key={String(event.id)}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.018] px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-sm text-neutral-100">
                        {actionLabels[String(event.action_type)] ??
                          String(event.action_type)}
                      </div>
                      <div className="mt-1 truncate text-[11px] text-violet-200">
                        {String(event.action_label || event.path)}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-neutral-600">
                        <span>{String(event.path)}</span>
                        <span>·</span>
                        <span>
                          {sourceTypeLabels[String(event.source_type)] ??
                            String(event.source_type)}
                        </span>
                        {String(event.source) !== "—" ? (
                          <>
                            <span>·</span>
                            <span>{String(event.source)}</span>
                          </>
                        ) : null}
                      </div>
                    </div>

                    <time className="shrink-0 text-[10px] text-neutral-700">
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
