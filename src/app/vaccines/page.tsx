import { CardLabel } from "@/components/ui/Card";
import { VaccinesClient } from "./VaccinesClient";

export const metadata = { title: "Explorador de Vacunas — Becker Lab" };

export default function VaccinesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <CardLabel>Módulo 3 · Explorador de Vacunas</CardLabel>
      <h1 className="mt-1 mb-2 text-2xl font-bold sm:text-3xl">Tipos de vacuna</h1>
      <p className="max-w-xl text-sm text-[var(--foreground-muted)]">
        Solo se muestran los tipos de vacuna descritos en la investigación: virus atenuados e
        inactivadas/subunidades.
      </p>
      <div className="mt-8">
        <VaccinesClient />
      </div>
    </div>
  );
}
