"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Syringe } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/learn", label: "Aprender" },
  { href: "/hematologia", label: "Hematología" },
  { href: "/mexico-schedule", label: "Esquema México" },
  { href: "/memory-simulator", label: "Simulador" },
  { href: "/clinical", label: "Casos clínicos" },
  { href: "/microlabs", label: "Microlab" },
  { href: "/arena", label: "Vax Arena" },
  { href: "/about", label: "Acerca de" },
];

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-blue-dim)] text-[var(--accent-blue)]">
            <Syringe size={16} strokeWidth={2.25} />
          </span>
          <span className="font-tech text-sm font-bold tracking-tight">
            BECKER <span className="text-[var(--accent-red)]">LAB</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-[13px] font-medium">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-[var(--foreground-muted)] transition-colors hover:text-[var(--foreground)]",
                pathname === l.href && "bg-[var(--background-elevated)] text-[var(--foreground)]",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/arena/join"
            className="rounded-full bg-[var(--accent-red)] px-4 py-2 text-xs font-bold tracking-wide text-white transition hover:brightness-110"
          >
            ENTRAR A VAX ARENA
          </Link>
        </div>

        <button
          className="lg:hidden rounded-lg p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-[var(--border)] px-4 py-3 flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2.5 text-sm text-[var(--foreground-muted)]",
                pathname === l.href && "bg-[var(--background-elevated)] text-[var(--foreground)]",
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/arena/join"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-[var(--accent-red)] px-4 py-2.5 text-center text-xs font-bold tracking-wide text-white"
          >
            ENTRAR A VAX ARENA
          </Link>
        </nav>
      )}
    </header>
  );
}
