import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Join Arena — VaxLab México" };

export default function ArenaJoinPage() {
  return (
    <PhasePlaceholder
      phase="Fase 4 · Vax Arena"
      title="ENTER THE ARENA"
      description="Formulario de ingreso (Nombre + Matrícula/código) y registro de intento único en base de datos. La tabla participants/attempts ya está diseñada — ver el esquema SQL en el README."
      needsSupabase
    />
  );
}
