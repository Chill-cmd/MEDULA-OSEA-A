import { CardLabel } from "@/components/ui/Card";
import { AdminQuestionsClient } from "./AdminQuestionsClient";

export const metadata = { title: "Admin · Preguntas — Becker Lab" };

export default function AdminQuestionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="mb-8 text-center">
        <CardLabel>Fase 5 · Panel de Fuentes de Contenido</CardLabel>
        <h1 className="mt-2 text-2xl font-bold">Banco de Preguntas de Vax Arena</h1>
      </div>
      <AdminQuestionsClient />
    </div>
  );
}
