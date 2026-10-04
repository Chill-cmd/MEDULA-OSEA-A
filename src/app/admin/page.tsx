import { Settings, FileQuestion } from "lucide-react";
import { Card, CardLabel } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";

export const metadata = { title: "Admin — Becker Lab" };

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
      <CardLabel>Fase 5 · Sala de Control del Profesor</CardLabel>
      <h1 className="mt-2 text-2xl font-bold">Panel de administración</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-[var(--foreground-muted)]">
        Protegido con un código de profesor (no es una cuenta completa todavía, pero nadie puede controlar la partida ni ver las
        respuestas correctas sin el código).
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <Settings className="mx-auto text-[var(--accent-blue)]" size={22} />
          <h3 className="mt-3 font-bold">Gestión de Partidas</h3>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">Crear, iniciar y controlar partidas de Vax Arena en vivo.</p>
          <LinkButton href="/admin/game" className="mt-4 w-full">
            Ir a Partidas
          </LinkButton>
        </Card>
        <Card>
          <FileQuestion className="mx-auto text-[var(--accent-blue)]" size={22} />
          <h3 className="mt-3 font-bold">Banco de Preguntas</h3>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">Revisa las 26 preguntas, respuestas correctas y sus fuentes.</p>
          <LinkButton href="/admin/questions" variant="secondary" className="mt-4 w-full">
            Ir a Preguntas
          </LinkButton>
        </Card>
      </div>
    </div>
  );
}
