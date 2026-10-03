import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Admin — VaxLab México" };

export default function AdminPage() {
  return (
    <PhasePlaceholder
      phase="Fase 5 · Professor Control Room"
      title="VAX ARENA CONTROL ROOM"
      description="Ruta protegida (Supabase Auth): jugadores conectados, pregunta actual, respuestas recibidas, tiempo restante, leaderboard, y controles START / PAUSE / NEXT / SHOW ANSWER / SHOW LEADERBOARD / FINAL ROUND / END GAME."
      needsSupabase
    />
  );
}
