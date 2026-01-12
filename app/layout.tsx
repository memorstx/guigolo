import "./globals.css";

export const metadata = {
  title: "Guigolo · UX/UI con intención y corazón",
  description:
    "Portafolio de Guillermo González López. Diseño interfaces claras, sensibles y estratégicas para productos digitales reales.",
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
