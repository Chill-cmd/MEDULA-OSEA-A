import { PhasePlaceholder } from "@/components/layout/PhasePlaceholder";

export const metadata = { title: "Microlab — VaxLab México" };

export default function MicrolabsPage() {
  return (
    <PhasePlaceholder
      phase="Módulo 6 · Fase 2"
      title="Microlab"
      description="Retos de 30-60 segundos: ordenar el mecanismo (antígeno → activación → respuesta → memoria), clasificar tipos de vacuna, y relacionar vacuna con etapa de vida — todo con drag-and-drop y usando exclusivamente el contenido ya verificado en /lib/content.ts."
    />
  );
}
