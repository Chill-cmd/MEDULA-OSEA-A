import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Resultados — VaxLab México" };

export default function ArenaResultsPage() {
  return (
    <PhasePlaceholder
      phase="Fase 4-5 · Vax Arena"
      title="VAX ARENA CHAMPION"
      description="Podio final + perfil individual (aciertos, accuracy, tiempo promedio) + Smart Review: recomendación personalizada de a qué módulo de VaxLab regresar según las categorías falladas."
      needsSupabase
    />
  );
}
