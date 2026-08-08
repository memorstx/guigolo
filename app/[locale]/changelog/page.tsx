import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import PageFrame from "@/components/layout/PageFrame";

export const metadata: Metadata = {
  title: "Changelog | Guigolo",
  description: "Official version history of the Guigolo platform.",
  robots: { index: false, follow: false }, // ✅ no indexar el changelog
};

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <SiteShell locale={locale as "es" | "en"}>
      <main className="text-neutral-white">
        <PageFrame variant="prose" className="py-24">
          <article className="leading-relaxed space-y-6">
            <h1>Changelog</h1>
            <p>Official version history of the Guigolo platform.</p>

            {/* ⬇️ AQUÍ VA EL CONTENIDO NUEVO */}
            <section className="space-y-10">
              <div>
                <h2>[1.3.0] — Static Runtime + Language UX</h2>

                <h3>Added</h3>
                <ul>
                  <li>Selector visual <code>ES / EN</code> en el header, responsive y conservando ruta, query y hash.</li>
                  <li>Sincronización temprana del atributo <code>lang</code> del documento según la ruta activa.</li>
                </ul>

                <h3>Changed</h3>
                <ul>
                  <li>Español (<code>/es</code>) pasa a ser el idioma por defecto.</li>
                  <li>Locales conocidos (<code>es</code> y <code>en</code>) se prerenderizan para reducir trabajo en runtime.</li>
                  <li>Rutas de contenido para agentes y markdown se sirven de forma estática cuando aplica.</li>
                </ul>

                <h3>Fixed</h3>
                <ul>
                  <li>Eliminado el Proxy global que podía ejecutarse en solicitudes que no necesitaban lógica de servidor.</li>
                  <li>Corregidos hydration mismatches en contadores, misiones, feedback y estado del formulario.</li>
                  <li>Corregidas imágenes Open Graph y Twitter en metadata global y en “What is Guigolo”.</li>
                  <li>El acceso externo de proyectos ya no se renderiza cuando no existe una URL.</li>
                  <li>Labels del formulario asociados explícitamente con sus campos.</li>
                </ul>
              </div>

              <div>
                <h2>[1.2.0] — i18n + Locale Routing (es/en)</h2>

                <h3>Added</h3>
                <ul>
                  <li>Routing por idioma con <code>/es</code> y <code>/en</code> (App Router).</li>
                  <li>Detección inicial de idioma (cookie / headers) y navegación consistente por locale.</li>
                  <li>Diccionarios por sección (home) para mantener copy escalable.</li>
                </ul>

                <h3>Changed</h3>
                <ul>
                  <li><code>SiteShell</code> ahora recibe <code>locale</code> y construye UI (Navbar/Footer) desde diccionario.</li>
                  <li>Home y secciones (Hero/Services/Projects/Process/CTA/FAQ/Contact/Footer) migradas a <code>dict</code>.</li>
                </ul>

                <h3>Fixed</h3>
                <ul>
                  <li>Bug donde el locale quedaba <code>undefined</code> por params async en Next (se resolvió con <code>await params</code>).</li>
                  <li>Navegación a anchors respetando el locale actual (ej. <code>/en#projects</code>).</li>
                </ul>
              </div>

              <div>
                <h2>[1.1.0] — Performance + LCP Cleanup</h2>

                <h3>Changed</h3>
                <ul>
                  <li>Reordenamiento del contenido (misiones/boots debajo del hero) para mejorar carga percibida.</li>
                  <li>Ajustes al asset principal del hero para mejorar el descubrimiento del LCP.</li>
                </ul>

                <h3>Fixed</h3>
                <ul>
                  <li>Optimización del LCP (reducción del “element render delay” asociado al hero).</li>
                  <li>Mitigaciones de warnings/ruido en auditorías (mejor señal, menos pánico).</li>
                </ul>
              </div>

              <div>
                <h2>[1.0.1] — Content Structure + UX Polish</h2>

                <h3>Added</h3>
                <ul>
                  <li>Sección de Proyectos con copy por item desde diccionario (merge por <code>id</code>).</li>
                  <li>Micro-feedback en “What is Guigolo” con GA event y persistencia local.</li>
                  <li>CTA “Contact” con tracking de origen (<code>ctaId</code> + scroll state) en sessionStorage.</li>
                </ul>

                <h3>Changed</h3>
                <ul>
                  <li>Servicios: copy del encabezado/CTA final movido a diccionario (i18n-ready).</li>
                  <li>Process: título/copy preparado para dict (misma técnica de secciones anteriores).</li>
                </ul>

                <h3>Fixed</h3>
                <ul>
                  <li>Errores TS por tipos/props al pasar copy (Props tipados y merges controlados).</li>
                </ul>
              </div>

              {/* ver 1.0.0  */}
              <div>
                <h2>[1.0.0] — Baseline Snapshot</h2>
                <p>Initial public structured release of the platform.</p>

                <h3>Added</h3>
                <ul>
                  <li>Next.js App Router architecture</li>
                  <li>TypeScript integration</li>
                  <li>TailwindCSS styling system</li>
                  <li>Core sections (Hero, About, Services, Projects, FAQ, Contact)</li>
                  <li>Gamification system (missions & achievements)</li>
                  <li>SEO layer (robots, sitemap, JSON-LD)</li>
                  <li>Open Graph metadata</li>
                  <li>Analytics integration</li>
                </ul>

                <h3>Technical Foundation</h3>
                <ul>
                  <li>Component-based architecture</li>
                  <li>Feature-based folder organization</li>
                  <li>Data separated for projects/FAQ</li>
                </ul>

                <h3>Known Limitations</h3>
                <ul>
                  <li>No automated testing suite</li>
                  <li>No formal design system documentation</li>
                  <li>No CI/CD pipeline defined</li>
                  <li>No advanced analytics setup (beyond current integration)</li>
                </ul>

                <p>This project follows Semantic Versioning (MAJOR.MINOR.PATCH).</p>
                <p>Version 1.0.0 represents the baseline architectural state of the platform.</p>
              </div>
            </section>
          </article>
        </PageFrame>
      </main>
    </SiteShell>
  );
}
