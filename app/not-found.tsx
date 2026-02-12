import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import PageFrame from "@/components/layout/PageFrame";
import Image from "next/image";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <SiteShell>
      <main className="text-neutral-white">
        <PageFrame variant="prose" className="py-8">
          <section className="space-y-5">
            {/* Ilustración (slot) */}
            <div>
              <div className="flex items-center justify-center min-h-[220px]">
               
                <div className="text-neutral-500 text-sm">
                  <Image
                    src="/brand/errors/404-illustration.svg"
                    alt="Ilustración de página no encontrada"
                    width={420}
                    height={220}
                    className="h-auto w-full max-w-[260px] opacity-90"
                    priority
                    />

                </div>
              </div>
            </div>

            {/* Copy */}
            <header className="space-y-4">
              <div className="text-[12px] tracking-[0.35em] text-accent-lime/80">
              ERROR 404
            </div>

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
                className="rounded-md bg-accent-lime px-6 py-3 text-black font-medium shadow-[0_0_0_2px_rgba(0,0,0,0.25)] w-full md:w-auto lg:w-auto xl:w-auto 2xl:w-auto 3xl:w-auto 4xl:w-auto text-center"
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
