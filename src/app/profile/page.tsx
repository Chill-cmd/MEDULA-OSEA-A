import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Mi Becker Lab — Becker Lab" };

export default function ProfilePage() {
  return (
    <PhasePlaceholder
      phase="Fase 5-6 · Mi Becker Lab"
      title="MI BECKER LAB"
      description="Dashboard de progreso educativo: módulos vistos, microlabs completados, casos resueltos, fortalezas y contenidos por revisar. Ningún 'nivel inmunológico' artificial — solo progreso de aprendizaje real."
      needsSupabase
    />
  );
}
