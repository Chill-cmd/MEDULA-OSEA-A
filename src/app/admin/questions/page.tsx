import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Admin · Preguntas — Becker Lab" };

export default function AdminQuestionsPage() {
  return (
    <PhasePlaceholder
      phase="Fase 5 · Panel de Fuentes de Contenido"
      title="/admin/questions"
      description="CRUD de preguntas (crear, editar, activar/desactivar, categorizar) con el campo source_reference obligatorio para trazabilidad académica — de qué parte de tu investigación sale cada pregunta."
      needsSupabase
    />
  );
}
