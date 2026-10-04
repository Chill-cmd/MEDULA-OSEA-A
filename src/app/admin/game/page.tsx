import { CardLabel } from "@/components/ui/Card";
import { AdminGameClient } from "./AdminGameClient";

export const metadata = { title: "Admin · Partida — Becker Lab" };

export default function AdminGamePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <CardLabel>Fase 5 · Gestión de Partidas</CardLabel>
        <h1 className="mt-2 text-2xl font-bold">Sala de Control de Vax Arena</h1>
      </div>
      <AdminGameClient />
    </div>
  );
}
