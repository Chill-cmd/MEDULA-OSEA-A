import { CardLabel } from "@/components/ui/Card";
import { ScheduleClient } from "./ScheduleClient";

export const metadata = { title: "Esquema México — VaxLab México" };

export default function MexicoSchedulePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <CardLabel>Módulo 4 · Life Course Vaccination Map</CardLabel>
      <h1 className="mt-1 mb-2 text-2xl font-bold sm:text-3xl">Esquema Nacional de Vacunación — México</h1>
      <p className="max-w-2xl text-sm text-[var(--foreground-muted)]">
        Recorre el esquema por etapa de vida, o sigue a un paciente ficticio desde el nacimiento. Todas las
        vacunas, edades y dosis provienen de tu archivo de evidencia; lo que falta está marcado explícitamente.
      </p>
      <div className="mt-8">
        <ScheduleClient />
      </div>
    </div>
  );
}
