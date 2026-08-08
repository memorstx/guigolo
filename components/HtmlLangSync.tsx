"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = pathname?.startsWith("/en") ? "en" : "es";
  }, [pathname]);

  return null;
}
