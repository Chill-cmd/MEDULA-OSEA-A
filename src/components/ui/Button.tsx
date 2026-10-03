import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--accent-blue)] text-[#04121a] border border-transparent hover:brightness-110",
  secondary:
    "bg-transparent text-[var(--foreground)] border border-[var(--border-strong)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]",
  ghost:
    "bg-transparent text-[var(--foreground-muted)] border border-transparent hover:text-[var(--foreground)]",
  danger:
    "bg-[var(--accent-red)] text-white border border-transparent hover:brightness-110",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-xs px-3.5 py-2 gap-1.5",
  md: "text-sm px-5 py-2.5 gap-2",
  lg: "text-base px-7 py-3.5 gap-2.5",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

interface LinkButtonProps {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function LinkButton({ href, variant = "primary", size = "md", className, children }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold tracking-tight transition-all duration-200 active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
