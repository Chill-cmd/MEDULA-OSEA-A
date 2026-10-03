import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Waiting Room — VaxLab México" };

export default function ArenaWaitingPage() {
  return (
    <PhasePlaceholder
      phase="Fase 4 · Vax Arena"
      title="WAITING ROOM"
      description='"Esperando al profesor…" + número de jugadores conectados, sincronizado vía Supabase Realtime.'
      needsSupabase
    />
  );
}
