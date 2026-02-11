// components/NavbarSecondary.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };

export default function NavbarSecondary({ items }: { items: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
              className="mx-auto flex h-full items-center justify-between px-20"
              style={{ maxWidth: LEFT_W + RIGHT_W + 1200 }}
            >
              <Link href="/" className="flex items-center gap-3" aria-label="Ir a inicio">
                <Image
                  src="/brand/logo.svg"
                  alt="Guigolo"
                  width={144}
                  height={24}
                  className="h-auto w-[120px] md:w-[130px] lg:w-[140px] xl:w-[160px]"
                />
              </Link>

              <nav className="flex items-center gap-6">
                {items.map((it) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    className="text-xs tracking-widest text-neutral-white/70 hover:text-accent-lime transition uppercase md:text-[clamp(0.7rem,1vw,.75rem)] xl:text-[clamp(.75rem,1vw,.8rem)] 2xl:text-[clamp(.8rem,1vw,.85rem)] 3xl:text-[clamp(.85rem,1vw,.9rem)]"
                  >
                    {it.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="relative lg:hidden">
        {menuOpen ? (
          <div className="fixed inset-0 z-[999] bg-neutral-black-900/95 backdrop-blur-md flex flex-col items-center justify-center gap-8">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-neutral-white/80 text-2xl"
              aria-label="Cerrar menú"
            >
              ✕
            </button>

            <nav className="flex flex-col items-center gap-6">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-neutral-white/80 hover:text-accent-lime transition tracking-widest uppercase text-[clamp(1.05rem,3.5vw,1.6rem)]"
                >
                  {it.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/#contacto"
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-md bg-accent-lime px-8 py-3 text-black font-medium"
              aria-label="Ir a contacto"
            >
              Contactar
            </Link>
          </div>
        ) : null}

        <div className="flex h-[64px] items-center justify-between px-5 backdrop-blur-[4px] opacity-90 bg-black">
          <Link href="/" aria-label="Ir a inicio">
            <Image src="/brand/isologo.svg" alt="Guigolo" width={32} height={32} />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-md border border-neutral-white/10 bg-neutral-black-900/40 px-3 py-2 text-neutral-white/80"
            aria-label="Abrir menú"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
