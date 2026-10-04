import { CardLabel } from "@/components/ui/Card";
import { ClinicalClient } from "./ClinicalClient";

export const metadata = { title: "Laboratorio de Decisión Clínica — Becker Lab" };

export default function ClinicalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <CardLabel>Módulo 7 · Clinical Decision Lab</CardLabel>
      <h1 className="mt-1 mb-2 text-2xl font-bold sm:text-3xl">Casos clínicos</h1>
      <p className="max-w-xl text-sm text-[var(--foreground-muted)]">
        Casos breves de razonamiento clínico que combinan hematología, inmunología y el protocolo de revacunación
        post-trasplante — resolubles 100% con la investigación y bibliografía citadas en cada caso.
      </p>
      <div className="mt-8">
        <ClinicalClient />
      </div>
    </div>
  );
}
