"use client";

import Link from "next/link";
import React from "react";
import { saveContactOrigin } from "./contactOrigin";

type Props = React.PropsWithChildren<{
  ctaId: string;
  className?: string;
  // por defecto manda a /#contacto (funciona desde cualquier página)
  href?: string;
}>;

export default function ContactLink({
  ctaId,
  className = "",
  href = "/#contacto",
  children,
}: Props) {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    saveContactOrigin(ctaId);

    const path = window.location.pathname;
    const isHome = path === "/" || path === "/es" || path === "/en";

    const el = document.getElementById("contacto");

    if (isHome && el) {
      e.preventDefault();

      // Scroll suave aunque ya exista #contacto
      el.scrollIntoView({ behavior: "smooth", block: "start" });

      // Mantener el hash bonito sin depender de que "cambie"
      if (window.location.hash !== "#contacto") {
        history.pushState(null, "", "#contacto");
      }
    }
    // Si no es Home, dejamos que navegue a /#contacto normal
  };

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
