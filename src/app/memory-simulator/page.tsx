import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Simulador de Respuesta de Memoria — Becker Lab" };

export default function MemorySimulatorPage() {
  return (
    <PhasePlaceholder
      phase="Módulo 5 · Fase 2"
      title="Simulador de Respuesta de Memoria"
      description="Visualización conceptual de primera exposición → células de memoria → refuerzo → respuesta secundaria, basada en el mecanismo de centros germinales (PDF). Sin cifras artificiales: la curva es conceptual porque ningún documento aporta valores numéricos de cinética."
    />
  );
}
