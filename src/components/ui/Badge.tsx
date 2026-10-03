import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { SourceTag } from "@/lib/content";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background-elevated)] px-2.5 py-1 font-tech text-[10px] uppercase tracking-wider text-[var(--foreground-muted)]",
        className,
      )}
      {...props}
    />
  );
}

const sourceStyle: Record<SourceTag, string> = {
  HTML: "border-[var(--accent-blue-dim)] text-[var(--accent-blue)]",
  PDF: "border-[var(--accent-indigo)]/40 text-[var(--accent-indigo)]",
  "HTML+PDF": "border-[var(--success)]/40 text-[var(--success)]",
  "BIBLIOGRAFÍA": "border-dashed border-[var(--accent-red)]/50 text-[var(--accent-red)]",
};

const sourceTitle: Record<SourceTag, string> = {
  HTML: "Procedencia verificada del dato",
  PDF: "Procedencia verificada del dato",
  "HTML+PDF": "Procedencia verificada del dato",
  "BIBLIOGRAFÍA": "Dato NO presente en la investigación original — relleno con bibliografía médica estándar, no es información oficial mexicana",
};

export function SourceBadge({ source }: { source: SourceTag }) {
  return (
    <Badge className={sourceStyle[source]} title={sourceTitle[source]}>
      <span>{source === "BIBLIOGRAFÍA" ? "📚" : "📌"}</span>
      Fuente: {source}
    </Badge>
  );
}

export function UnavailableBadge() {
  return (
    <Badge className="border-[var(--warning)]/40 text-[var(--warning)]">
      Sin datos en la investigación
    </Badge>
  );
}
