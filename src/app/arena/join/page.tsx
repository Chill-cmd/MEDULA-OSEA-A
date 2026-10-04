import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Unirse a la Arena — Becker Lab" };

export default function ArenaJoinPage() {
  return (
    <PhasePlaceholder
      phase="Fase 4 · Vax Arena"
      title="ENTRAR A LA ARENA"
      description="Formulario de ingreso (Nombre + Matrícula/código) y registro de intento único en base de datos. La tabla participants/attempts ya está diseñada — ver el esquema SQL en el README."
      needsSupabase
    />
  );
}
