import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Sala de Espera — Becker Lab" };

export default function ArenaWaitingPage() {
  return (
    <PhasePlaceholder
      phase="Fase 4 · Vax Arena"
      title="SALA DE ESPERA"
      description='"Esperando al profesor…" + número de jugadores conectados, sincronizado vía Supabase Realtime.'
      needsSupabase
    />
  );
}
