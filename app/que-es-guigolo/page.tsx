// app/que-es-guigolo/page.tsx
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "¿Qué es Guigolo? (no, no es gigoló) · Guillermo González López",
  description:
    "Guigolo (Guillermo González López) no es gigoló. Aquí explico el origen del nombre, cómo se pronuncia (Guí-go-lo), por qué existe la confusión Guigolo / Gigolo / Gigoló, y cómo lo convertí en una marca de diseño UX/UI y web.",
  openGraph: {
    title: "¿Qué es Guigolo? (no, no es gigoló)",
    description:
      "Origen del nombre, pronunciación y desambiguación Guigolo / Gigolo / Gigoló. Storytelling + autoridad de marca.",
    url: "https://guigolo.com/que-es-guigolo",
    siteName: "Guigolo",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Guigolo · ¿Qué es Guigolo?",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "¿Qué es Guigolo? (no, no es gigoló)",
    description:
      "Origen del nombre, pronunciación y desambiguación Guigolo / Gigolo / Gigoló.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return (
    <main className="bg-neutral-black-900">
      <Navbar />
      
      <Footer />
    </main>
  );
}
