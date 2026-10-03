import Link from "next/link";
import { PROJECT_META } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 text-xs text-[var(--foreground-faint)] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-tech">
          VAXLAB MÉXICO · <Link href="/about" className="underline hover:text-[var(--foreground)]">{PROJECT_META.disclaimer}</Link>
        </p>
        <p>© {new Date().getFullYear()} · Fase 1 — Foundation</p>
      </div>
    </footer>
  );
}
