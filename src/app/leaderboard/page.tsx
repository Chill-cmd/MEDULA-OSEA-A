import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Leaderboard — VaxLab México" };

export default function LeaderboardPage() {
  return (
    <PhasePlaceholder
      phase="Fase 4-5 · Pantalla de proyección"
      title="LIVE LEADERBOARD"
      description="Ranking en tiempo real pensado para proyectarse: 🥇🥈🥉 + resto de participantes, con animación 'NEW LEADER' cuando cambia el primer lugar."
      needsSupabase
    />
  );
}
