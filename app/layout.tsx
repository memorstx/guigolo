import "./globals.css";
import { Unbounded, Anta } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { HtmlLangSync } from "../components/HtmlLangSync";
import TrafficTracker from "../components/TrafficTracker";
import ActionTracker from "../components/ActionTracker";
import PerformanceTracker from "../components/PerformanceTracker";
import ErrorTracker from "../components/ErrorTracker";
import ThirdPartyAnalytics from "../components/ThirdPartyAnalytics";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-unbounded",
});

const anta = Anta({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://guigolo.com"),
  title: {
    default: "Guigolo · Diseño centrado en usuario y negocio",
    template: "%s | Guigolo",
  },
  description:
    "Portafolio de Guillermo González López. Diseño interfaces claras, sensibles y estratégicas para productos digitales reales.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Guigolo · Diseño centrado en usuario y negocio",
    description:
      "Diseño que impulsa, conecta y acompaña tu visión. Interfaces humanas, claras y con intención.",
    url: "https://guigolo.com",
    siteName: "Guigolo",
    images: [
      {
        url: "/og/cover_social.png",
        width: 1200,
        height: 630,
        alt: "Guigolo · Portafolio UX/UI",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guigolo · Diseño centrado en usuario y negocio",
    description:
      "Diseño que impulsa, conecta y acompaña tu visión. Interfaces humanas, claras y con intención.",
    images: ["/og/cover_social.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProd = process.env.VERCEL_ENV === "production";
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const HJ_ID = process.env.NEXT_PUBLIC_HJ_ID;
  const HJ_SV = process.env.NEXT_PUBLIC_HJ_SV || "6";

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${unbounded.variable} ${anta.variable}`}>
        <Script id="html-lang" strategy="beforeInteractive">
          {`document.documentElement.lang = location.pathname.startsWith('/en') ? 'en' : 'es';`}
        </Script>
        <HtmlLangSync />
        <TrafficTracker enabled={isProd} />
        <ActionTracker enabled={isProd} />
        <PerformanceTracker enabled={isProd} />
        <ErrorTracker enabled={isProd} />

        {children}

        {isProd ? (
          <ThirdPartyAnalytics
            gaId={GA_ID}
            hotjarId={HJ_ID}
            hotjarVersion={HJ_SV}
          />
        ) : null}

        <Analytics />
      </body>
    </html>
  );
}
