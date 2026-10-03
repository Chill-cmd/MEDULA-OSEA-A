import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Clinical Decision Lab — VaxLab México" };

export default function ClinicalPage() {
  return (
    <PhasePlaceholder
      phase="Módulo 7 · Fase 3"
      title="Clinical Decision Lab"
      description="Casos clínicos resolubles 100% con tu investigación: el protocolo de revacunación post-trasplante (HSCT) es el caso ancla, ya que es el único escenario con datos suficientes (ventanas de tiempo, tipo de vacuna, justificación inmunológica) para construir un caso sin inventar nada."
    />
  );
}
