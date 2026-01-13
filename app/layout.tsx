import "./globals.css";

export const metadata = {
  title: "Guigolo · UX/UI con intención y corazón",
  description:
    "Portafolio de Guillermo González López. Diseño interfaces claras, sensibles y estratégicas para productos digitales reales.",
  openGraph: {
    title: "Guigolo · UX/UI con intención y corazón",
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
    title: "Guigolo · UX/UI con intención y corazón",
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
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
