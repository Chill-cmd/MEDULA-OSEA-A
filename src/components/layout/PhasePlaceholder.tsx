import { LinkButton } from "@/components/ui/Button";
import { CardLabel } from "@/components/ui/Card";
import { ConstructionIcon } from "lucide-react";

interface Props {
  title: string;
  phase: string;
  description: string;
  needsSupabase?: boolean;
}

export function PhasePlaceholder({ title, phase, description, needsSupabase }: Props) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--background-elevated)] text-[var(--accent-blue)]">
        <ConstructionIcon size={24} />
      </span>
      <CardLabel>{phase}</CardLabel>
      <h1 className="mt-2 text-2xl font-bold">{title}</h1>
      <p className="mt-3 text-sm text-[var(--foreground-muted)]">{description}</p>
      {needsSupabase && (
        <p className="mt-4 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 p-3 text-xs text-[var(--foreground-muted)]">
          Esta sección requiere un proyecto de Supabase conectado (tiempo real + base de datos). Ver{" "}
          <code className="font-tech">README.md</code> para los pasos de configuración.
        </p>
      )}
      <LinkButton href="/learn" variant="secondary" size="sm" className="mt-6">
        ← Volver a Aprender
      </LinkButton>
    </div>
  );
}
