import "./globals.css";
import { Unbounded, Anta } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"

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

export const metadata = {
  title: "Guigolo · Diseño centrado en usuario y negocio",
  description:
    "Portafolio de Guillermo González López. Diseño interfaces claras, sensibles y estratégicas para productos digitales reales.",
  openGraph: {
    title: "Guigolo · Diseño centrado en usuario y negocio",
    description:
      "Diseño que impulsa, conecta y acompaña tu visión. Interfaces humanas, claras y con intención.",
    url: "https://guigolo.vercel.app",
    siteName: "Guigolo",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProd = process.env.VERCEL_ENV === "production";
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es">
      <body className={`${unbounded.variable} ${anta.variable}`}>
        {children}

        <Analytics />
        
      </body>
    </html>
  );
}

