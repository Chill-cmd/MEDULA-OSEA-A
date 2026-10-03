import { Swords } from "lucide-react";
import { Card, CardLabel } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";

const ROUNDS = [
  { n: "Round 1", title: "Immunology", ready: true },
  { n: "Round 2", title: "Vaccines", ready: true },
  { n: "Round 3", title: "México", ready: true },
  { n: "Round 4", title: "Clinical Decision", ready: "partial" as const },
  { n: "Final", title: "Clinical Boss", ready: "partial" as const },
];

export const metadata = { title: "Vax Arena — VaxLab México" };

export default function ArenaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-red)]/15 text-[var(--accent-red)]">
        <Swords size={24} />
      </span>
      <CardLabel>Competitive Mode</CardLabel>
      <h1 className="mt-2 text-3xl font-black">VAX ARENA</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-[var(--foreground-muted)]">
        Cronómetro en vivo, puntuación por velocidad, leaderboard en tiempo real y un solo intento por
        participante. Motor de tiempo real: Fase 4-5 del proyecto.
      </p>

      <div className="mt-8 space-y-2 text-left">
        {ROUNDS.map((r) => (
          <Card key={r.n} className="flex items-center justify-between py-3.5">
            <div>
              <span className="font-tech text-[10px] uppercase text-[var(--foreground-faint)]">{r.n}</span>
              <p className="font-semibold">{r.title}</p>
            </div>
            <span
              className={`font-tech text-[10px] uppercase ${
                r.ready === true ? "text-[var(--success)]" : "text-[var(--warning)]"
              }`}
            >
              {r.ready === true ? "Preguntas listas" : "Parcial — ver banco en content.ts"}
            </span>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 p-4 text-left text-xs text-[var(--foreground-muted)]">
        El motor multijugador en tiempo real (Supabase Realtime + validación de tiempo del lado del
        servidor) corresponde a Fase 4-5. Requiere que conectes tu propio proyecto de Supabase — ver{" "}
        <code className="font-tech">README.md</code>.
      </div>

      <LinkButton href="/arena/join" variant="danger" size="lg" className="mt-8">
        ENTER THE ARENA
      </LinkButton>
    </div>
  );
}
