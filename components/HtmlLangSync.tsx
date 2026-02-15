"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    const isEn = pathname?.startsWith("/en");
    document.documentElement.lang = isEn ? "en" : "es";
  }, [pathname]);

  return null;
}
