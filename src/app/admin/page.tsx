import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Admin — Becker Lab" };

export default function AdminPage() {
  return (
    <PhasePlaceholder
      phase="Fase 5 · Sala de Control del Profesor"
      title="SALA DE CONTROL DE VAX ARENA"
      description="Ruta protegida (Supabase Auth): jugadores conectados, pregunta actual, respuestas recibidas, tiempo restante, leaderboard, y controles START / PAUSE / NEXT / SHOW ANSWER / SHOW LEADERBOARD / FINAL ROUND / END GAME."
      needsSupabase
    />
  );
}
