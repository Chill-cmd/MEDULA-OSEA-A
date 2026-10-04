import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Resultados — Becker Lab" };

export default function ArenaResultsPage() {
  return (
    <PhasePlaceholder
      phase="Fase 4-5 · Vax Arena"
      title="CAMPEÓN DE VAX ARENA"
      description="Podio final + perfil individual (aciertos, precisión, tiempo promedio) + Revisión Inteligente: recomendación personalizada de a qué módulo de Becker Lab regresar según las categorías falladas."
      needsSupabase
    />
  );
}
