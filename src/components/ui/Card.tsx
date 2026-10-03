import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass glass-hover rounded-[var(--radius-lg)] p-5 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}

export function CardLabel({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-tech text-[11px] uppercase tracking-[0.12em] text-[var(--foreground-faint)]",
        className,
      )}
      {...props}
    />
  );
}
