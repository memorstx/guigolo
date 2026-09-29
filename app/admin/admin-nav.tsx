import Link from "next/link";

type Section = "crawlers" | "traffic" | "actions" | "performance" | "404s";

export default function AdminNav({ current }: { current: Section }) {
  const items: Array<{ key: Section; label: string; href: string }> = [
    { key: "crawlers", label: "Crawlers", href: "/admin/crawlers" },
    { key: "traffic", label: "Tráfico", href: "/admin/traffic" },
    { key: "actions", label: "Acciones", href: "/admin/actions" },
    { key: "performance", label: "Performance", href: "/admin/performance" },
    { key: "404s", label: "404", href: "/admin/404s" },
  ];

  return (
    <nav className="mt-5 flex gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.018] p-1">
      {items.map((item) => {
        const active = item.key === current;

        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-xl px-4 py-2 text-xs transition ${
              active
                ? "bg-white/[0.08] text-neutral-100"
                : "text-neutral-500 hover:bg-white/[0.04] hover:text-neutral-300"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
