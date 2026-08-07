"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import IconHome from "./icons/IconHome";
import IconAbout from "./icons/IconAbout";
import IconContact from "./icons/IconContact";
import IconProjects from "./icons/IconProjects";
import IconServices from "./icons/IconServices";
import LanguageSwitch from "./LanguageSwitch";

type NavbarDict = {
  nav: {
    home: string;
    services: string;
    projects: string;
    about: string;
    contact: string;
    contactCta?: string;
  };
};

export default function Navbar({ dict }: { dict: NavbarDict }) {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en") ? "en" : "es";
  const toAnchor = (hash: string) => `/${locale}${hash}`;
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "#home", label: dict.nav.home, Icon: IconHome },
    { href: "#services", label: dict.nav.services, Icon: IconServices },
    { href: "#projects", label: dict.nav.projects, Icon: IconProjects },
    { href: "#about", label: dict.nav.about, Icon: IconAbout },
    { href: "#contacto", label: dict.nav.contact, Icon: IconContact },
  ];

  useEffect(() => {
    if (!menuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const H = 64;
  const LEFT_W = 256;
  const RIGHT_W = 654;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* DESKTOP */}
      <div className="relative hidden lg:block">
        <div className="relative w-full" style={{ height: H }}>
          <Image
            src="/brand/nav/nav-plate-left.svg"
            alt=""
            width={LEFT_W}
            height={H}
            priority
            className="absolute left-[1px] top-0 select-none"
            draggable={false}
          />

          <div
            className="absolute top-0 select-none"
            style={{
              left: LEFT_W,
              right: RIGHT_W,
              height: H,
              backgroundImage: "url(/brand/nav/nav-plate-center.svg)",
              backgroundRepeat: "repeat-x",
              backgroundPosition: "top left",
            }}
          />

          <Image
            src="/brand/nav/nav-plate-right.svg"
            alt=""
            width={RIGHT_W}
            height={H}
            priority
            className="absolute right-[1px] top-0 select-none"
            draggable={false}
          />

          <div className="absolute inset-0">
            <div
              className="mx-auto flex h-full items-center justify-between px-10 xl:px-16 2xl:px-20"
              style={{ maxWidth: LEFT_W + RIGHT_W + 1200 }}
            >
              <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3">
                <Image
                  src="/brand/logo.svg"
                  alt="Guigolo"
                  width={144}
                  height={24}
                  className="h-auto w-[120px] xl:w-[150px] 2xl:w-[170px]"
                />
              </Link>

              <div className="flex min-w-0 items-center gap-3 xl:gap-5">
                <nav className="flex items-center gap-3 xl:gap-5 2xl:gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={toAnchor(item.href)}
                      className="group flex items-center gap-1.5 whitespace-nowrap text-[0.66rem] leading-relaxed tracking-widest text-neutral-white/70 transition hover:text-accent-lime xl:gap-2 xl:text-[0.72rem] 2xl:text-[0.8rem] 3xl:text-[0.86rem] 4xl:text-[1rem]"
                    >
                      {(() => {
                        const Icon = item.Icon;
                        return (
                          <Icon className="h-3.5 w-3.5 shrink-0 text-current opacity-80" />
                        );
                      })()}

                      <span className="uppercase">{item.label}</span>
                    </Link>
                  ))}
                </nav>

                <div className="ml-1 h-5 w-px bg-neutral-white/10" aria-hidden="true" />
                <LanguageSwitch locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET */}
      <div className="relative lg:hidden">
        {menuOpen && (
          <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-8 bg-neutral-black-900/95 px-6 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-white/10 bg-neutral-black-900/60 text-xl text-neutral-white/80 transition hover:border-neutral-white/25 hover:text-accent-lime"
              aria-label={locale === "es" ? "Cerrar menú" : "Close menu"}
            >
              ✕
            </button>

            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={toAnchor(item.href)}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-[clamp(.95rem,4vw,1.15rem)] tracking-widest text-neutral-white/70 transition hover:text-accent-lime"
                >
                  {(() => {
                    const Icon = item.Icon;
                    return (
                      <Icon className="h-4 w-4 shrink-0 text-current opacity-80" />
                    );
                  })()}

                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <Link
              href={toAnchor("#contacto")}
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-md bg-accent-lime px-8 py-3 font-medium text-black transition hover:brightness-110"
            >
              {dict.nav.contactCta ?? dict.nav.contact}
            </Link>
          </div>
        )}

        <div className="flex h-[64px] items-center justify-between gap-3 bg-black/85 px-4 backdrop-blur-[6px] sm:px-5">
          <Link href={toAnchor("#home")} className="shrink-0">
            <Image src="/brand/isologo.svg" alt="Guigolo" width={32} height={32} />
          </Link>

          <div className="ml-auto flex items-center gap-2.5">
            <LanguageSwitch locale={locale} compact />

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 min-w-10 items-center justify-center rounded-md border border-neutral-white/10 bg-neutral-black-900/40 px-3 text-neutral-white/80 transition hover:border-neutral-white/20 hover:text-accent-lime"
              aria-label={locale === "es" ? "Abrir menú" : "Open menu"}
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
