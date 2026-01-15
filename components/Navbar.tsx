"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import IconHome from "./icons/IconHome";
import IconAbout from "./icons/IconAbout";
import IconContact from "./icons/IconContact";
import IconProjects from "./icons/IconProjects";
import IconServices from "./icons/IconServices";

const navItems = [
  { href: "#home", label: "HOME", Icon: IconHome },
  { href: "#about", label: "ABOUT ME", Icon: IconAbout },
  { href: "#projects", label: "PROJECTS", Icon: IconProjects },
  { href: "#services", label: "SERVICES", Icon: IconServices },
  { href: "#contacto", label: "CONTACT", Icon: IconContact },
];


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Bloquear scroll cuando el overlay está abierto
  useEffect(() => {
    if (!menuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const H = 64;
  const LEFT_W = 256;
  const RIGHT_W = 654;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* DESKTOP */}
      <div className="relative hidden lg:block">
        <div className="relative w-full" style={{ height: H }}>
          {/* Izquierda */}
          <Image
            src="/brand/nav/nav-plate-left.svg"
            alt=""
            width={LEFT_W}
            height={H}
            priority
            className="absolute left-[1px] top-0 select-none"
            draggable={false}
          />

          {/* Centro */}
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

          {/* Derecha */}
          <Image
            src="/brand/nav/nav-plate-right.svg"
            alt=""
            width={RIGHT_W}
            height={H}
            priority
            className="absolute right-[1px] top-0 select-none"
            draggable={false}
          />

          {/* Contenido encima */}
          <div className="absolute inset-0">
            <div
              className="mx-auto flex h-full items-center justify-between px-20"
              style={{ maxWidth: LEFT_W + RIGHT_W + 1200 }}
            >
              <Link href="#home" className="flex items-center gap-3">
                <Image src="/brand/logo.svg" alt="Guigolo" width={144} height={24} />
              </Link>

              <nav className="flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-2 text-xs tracking-widest text-neutral-white/70 hover:text-accent-lime transition"
                  >
                    {(() => {
                      const Icon = item.Icon;
                      return <Icon className="h-3.5 w-3.5 text-current opacity-80" />;
                    })()}


                    <span className="uppercase">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="relative lg:hidden">
        {menuOpen && (
          <div className="fixed inset-0 z-[999] bg-neutral-black-900/95 backdrop-blur-md flex flex-col items-center justify-center gap-8">
            {/* Botón cerrar */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-neutral-white/80 text-2xl"
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Links */}
            <nav className="flex flex-col items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-2xl tracking-widest text-neutral-white/70 hover:text-accent-lime transition"
                >
                  {(() => {
                    const Icon = item.Icon;
                    return <Icon className="h-3.5 w-3.5 text-current opacity-80" />;
                  })()}


                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <Link
              href="#contacto"
              onClick={() => setMenuOpen(false)}
              className="mt-6 rounded-md bg-accent-lime px-8 py-3 text-black font-medium"
            >
              Contactar
            </Link>
          </div>
        )}

        <div className="flex h-[64px] items-center justify-between px-5 backdrop-blur-[4px] opacity-85 bg-black">
          <Link href="#home">
            <Image src="/brand/isologo.svg" alt="Guigolo" width={32} height={32} />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-md border border-neutral-white/10 bg-neutral-black-900/40 px-3 py-2 text-neutral-white/80"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
