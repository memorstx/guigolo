import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageFrame from "@/components/layout/PageFrame";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="text-neutral-white">
        <PageFrame variant="prose" className="py-24">
          <section className="space-y-10">
            {/* Ilustración (slot) */}
            <div className="border border-neutral-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-center min-h-[220px]">
                {/* TODO: Inserta aquí tu SVG */}
                {/* Ejemplo:
                    <My404Illustration className="w-full max-w-sm opacity-90" />
                */}
                <div className="text-neutral-500 text-sm">
                  [SVG Illustration Placeholder]
                </div>
              </div>
            </div>

            {/* Copy */}
            <header className="space-y-4">
              <p className="text-neutral-400 text-sm tracking-wide uppercase">
                Error 404
              </p>

              <h1 className="text-4xl font-bold tracking-tight">
                Esta página no existe
              </h1>

              <p className="text-neutral-300 leading-relaxed">
                Puede que el link esté mal, que la página se haya movido, o que
                el internet te esté jugando chueco. No pasa nada: te regreso al
                camino.
              </p>
            </header>

            {/* Acciones */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium
                           bg-neutral-white text-neutral-black-900 hover:opacity-90 transition"
              >
                Volver al inicio
              </Link>

              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium
                           border border-neutral-white/15 text-neutral-white hover:border-neutral-white/30 transition"
              >
                Contacto
              </Link>
            </div>

            {/* Ayuda adicional */}
            <div className="border-t border-neutral-white/10 pt-8 text-neutral-500 text-sm space-y-2">
              <p>
                Si llegaste aquí desde un link dentro del sitio, avísame y lo
                arreglo.
              </p>
              <p className="text-neutral-600">
                Tip: si estabas buscando un proyecto, vuelve al inicio y entra a
                “Proyectos”.
              </p>
            </div>
          </section>
        </PageFrame>
      </main>
    </SiteShell>
  );
}
