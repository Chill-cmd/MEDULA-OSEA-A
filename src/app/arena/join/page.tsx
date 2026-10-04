import { CardLabel } from "@/components/ui/Card";
import { ArenaJoinClient } from "./ArenaJoinClient";

export const metadata = { title: "Unirse a la Arena — Becker Lab" };

export default function ArenaJoinPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-14 text-center sm:px-6">
      <CardLabel>Fase 4 · Vax Arena</CardLabel>
      <h1 className="mt-2 text-3xl font-black">ENTRAR A LA ARENA</h1>
      <p className="mx-auto mt-3 max-w-sm text-sm text-[var(--foreground-muted)]">
        Escribe tu nombre y tu matrícula/código. Solo tienes un intento por partida.
      </p>
      <div className="mt-8">
        <ArenaJoinClient />
      </div>
    </div>
  );
}
