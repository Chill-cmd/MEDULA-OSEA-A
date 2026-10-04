import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Vax Arena — Juego en vivo" };

export default function ArenaGamePage() {
  return (
    <PhasePlaceholder
      phase="Fase 4 · Vax Arena"
      title="PREGUNTA 00 / 10"
      description="Pantalla de pregunta en vivo: cronómetro de 10s con décimas, 4 opciones grandes (A-D), bloqueo tras seleccionar (LOCKED), y cálculo de score server-side (500 + segundos restantes × 50)."
      needsSupabase
    />
  );
}
