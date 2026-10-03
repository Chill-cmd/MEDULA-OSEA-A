import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "My VaxLab — VaxLab México" };

export default function ProfilePage() {
  return (
    <PhasePlaceholder
      phase="Fase 5-6 · My VaxLab"
      title="MY VAXLAB"
      description="Dashboard de progreso educativo: módulos vistos, microlabs completados, casos resueltos, fortalezas y contenidos por revisar. Ningún 'nivel inmunológico' artificial — solo progreso de aprendizaje real."
      needsSupabase
    />
  );
}
