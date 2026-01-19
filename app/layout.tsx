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

  const HJ_ID = process.env.NEXT_PUBLIC_HJ_ID;
  const HJ_SV = process.env.NEXT_PUBLIC_HJ_SV || "6";


  return (
    <html lang="es">
      <body className={`${unbounded.variable} ${anta.variable}`}>
        {children}

        {/* Google Analytics — SOLO producción */}
        {isProd && GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        ) : null}

        {/* Hotjar — SOLO producción */}
        {isProd && HJ_ID ? (
          <Script
            id="hotjar-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${HJ_ID},hjsv:${HJ_SV}};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `,
            }}
          />
        ) : null}


        <Analytics />
        
      </body>
    </html>
  );
}

