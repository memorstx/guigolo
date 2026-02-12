import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Link from "next/dist/client/link";
import PageFrame from "@/components/layout/PageFrame";

export const metadata = {
  title: "Changelog",
  description: "Version history of the Guigolo platform.",
  robots: {
    index: false,
    follow: false,
  },
};


export default function ChangelogPage() {
  return (
    <SiteShell>
        <main className="text-neutral-white">
            <PageFrame variant="prose" className="py-24">
                <div className="space-y-16"></div>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-neutral-white/50 hover:text-neutral-white transition group"
                >
                    <span className="transition-transform group-hover:-translate-x-1">
                    ←
                    </span>
                    Volver al inicio
                </Link>
                <section className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Changelog</h1>
                <p className="text-neutral-400">
                    Official version history of the Guigolo platform.
                </p>
                </section>

                <section className="space-y-6 border-t border-neutral-white/10 pt-10">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold">[1.0.0] — Baseline Snapshot</h2>
                    <p className="text-neutral-500">
                    Initial public structured release of the platform.
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                    <h3 className="text-lg font-semibold mb-2">Added</h3>
                    <ul className="list-disc list-inside space-y-1 text-neutral-300">
                        <li>Next.js App Router architecture</li>
                        <li>TypeScript integration</li>
                        <li>TailwindCSS styling system</li>
                        <li>Core sections (Hero, About, Services, Projects, FAQ, Contact)</li>
                        <li>Gamification system (missions & achievements)</li>
                        <li>SEO layer (robots, sitemap, JSON-LD)</li>
                        <li>Open Graph metadata</li>
                        <li>Analytics integration</li>
                    </ul>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-2">Technical Foundation</h3>
                    <ul className="list-disc list-inside space-y-1 text-neutral-300">
                        <li>Component-based architecture</li>
                        <li>Feature-based folder organization</li>
                        <li>Data separated for projects/FAQ</li>
                    </ul>
                    </div>

                    <div>
                    <h3 className="text-lg font-semibold mb-2">Known Limitations</h3>
                    <ul className="list-disc list-inside space-y-1 text-neutral-300">
                        <li>No automated testing suite</li>
                        <li>No formal design system documentation</li>
                        <li>No CI/CD pipeline defined</li>
                        <li>No advanced analytics setup (beyond current integration)</li>
                    </ul>
                    </div>
                </div>
                </section>

                <section className="border-t border-neutral-white/10 pt-10 text-neutral-500 text-sm space-y-1">
                <p>This project follows Semantic Versioning (MAJOR.MINOR.PATCH).</p>
                <p>Version 1.0.0 represents the baseline architectural state of the platform.</p>
                </section>
            </PageFrame>
        </main>
    </SiteShell>
  );
}
