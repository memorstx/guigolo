"use client";

import { usePathname, useRouter } from "next/navigation";

type Locale = "es" | "en";

type Props = {
  locale: Locale;
  compact?: boolean;
};

function getLocalizedPath(pathname: string, nextLocale: Locale) {
  if (pathname === "/es" || pathname === "/en") return `/${nextLocale}`;

  if (pathname.startsWith("/es/")) {
    return pathname.replace(/^\/es(?=\/)/, `/${nextLocale}`);
  }

  if (pathname.startsWith("/en/")) {
    return pathname.replace(/^\/en(?=\/)/, `/${nextLocale}`);
  }

  return `/${nextLocale}`;
}

export default function LanguageSwitch({ locale, compact = false }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();
  const nextLocale: Locale = locale === "es" ? "en" : "es";

  const changeLanguage = () => {
    const nextPath = getLocalizedPath(pathname, nextLocale);
    const search = typeof window !== "undefined" ? window.location.search : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    router.push(`${nextPath}${search}${hash}`, { scroll: false });
  };

  const label =
    locale === "es" ? "Cambiar idioma a inglés" : "Switch language to Spanish";

  return (
    <button
      type="button"
      onClick={changeLanguage}
      aria-label={label}
      title={label}
      className={`group relative isolate shrink-0 overflow-hidden rounded-full border border-neutral-white/15 bg-neutral-black-900/70 p-[3px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_0_18px_rgba(20,177,255,0.06)] backdrop-blur-md transition duration-300 hover:border-[rgba(20,177,255,0.35)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03),0_0_24px_rgba(20,177,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-black-900 ${
        compact ? "h-9 w-[92px]" : "h-9 w-[96px]"
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[3px] rounded-full bg-[linear-gradient(115deg,rgba(156,255,0,0.05),transparent_38%,rgba(20,177,255,0.07))] opacity-80"
      />

      <span
        aria-hidden="true"
        className={`absolute bottom-[3px] left-[3px] top-[3px] w-[calc(50%-3px)] rounded-full border border-accent-lime/40 bg-accent-lime shadow-[0_0_15px_rgba(156,255,0,0.18)] transition-transform duration-300 ease-out ${
          locale === "es" ? "translate-x-0" : "translate-x-full"
        }`}
      />

      <span className="relative z-10 grid h-full grid-cols-2 items-center text-[10px] font-semibold tracking-[0.16em]">
        <span
          className={`flex h-full items-center justify-center transition-colors duration-300 ${
            locale === "es" ? "text-neutral-black-900" : "text-neutral-white/55"
          }`}
        >
          ES
        </span>
        <span
          className={`flex h-full items-center justify-center transition-colors duration-300 ${
            locale === "en" ? "text-neutral-black-900" : "text-neutral-white/55"
          }`}
        >
          EN
        </span>
      </span>

      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[14px] w-px -translate-x-1/2 -translate-y-1/2 bg-neutral-white/10"
      />
    </button>
  );
}
