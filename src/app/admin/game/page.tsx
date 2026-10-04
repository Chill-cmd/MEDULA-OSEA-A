import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Admin · Partida — Becker Lab" };

export default function AdminGamePage() {
  return (
    <PhasePlaceholder
      phase="Fase 5 · Gestión de Partidas"
      title="/admin/game"
      description="Crear y administrar partidas de Vax Arena: seleccionar set de preguntas por ronda, generar el código QR de acceso, y lanzar la cuenta regresiva 3-2-1-VACCINATE!"
      needsSupabase
    />
  );
}
