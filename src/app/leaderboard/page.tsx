import { CardLabel } from "@/components/ui/Card";
import { LeaderboardClient } from "./LeaderboardClient";

export const metadata = { title: "Tabla de Posiciones — Becker Lab" };

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6">
      <CardLabel>Pantalla de proyección</CardLabel>
      <h1 className="mt-2 mb-8 text-3xl font-black">TABLA DE POSICIONES EN VIVO</h1>
      <LeaderboardClient />
    </div>
  );
}
