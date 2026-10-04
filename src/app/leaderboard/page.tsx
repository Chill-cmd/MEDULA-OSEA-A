import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Tabla de Posiciones — Becker Lab" };

export default function LeaderboardPage() {
  return (
    <PhasePlaceholder
      phase="Fase 4-5 · Pantalla de proyección"
      title="TABLA DE POSICIONES EN VIVO"
      description="Ranking en tiempo real pensado para proyectarse: 🥇🥈🥉 + resto de participantes, con animación 'NUEVO LÍDER' cuando cambia el primer lugar."
      needsSupabase
    />
  );
}
