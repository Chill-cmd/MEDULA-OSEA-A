"use client";

import { useEffect, useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";
import { ARENA_STORAGE_KEYS } from "@/lib/arena/types";

interface AttemptRow {
  id: string;
  gameTitle: string;
  score: number;
  completed: boolean;
  startedAt: string;
}

export function ProfileClient() {
  const [name, setName] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<AttemptRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const participantId = localStorage.getItem(ARENA_STORAGE_KEYS.participantId);
    const storedName = localStorage.getItem(ARENA_STORAGE_KEYS.participantName);
    Promise.resolve().then(() => setName(storedName));
    if (!participantId) {
      Promise.resolve().then(() => setLoaded(true));
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("attempts")
        .select("id, total_score, completed, started_at, games(title)")
        .eq("participant_id", participantId)
        .order("started_at", { ascending: false });

      setAttempts(
        (data ?? []).map((a) => ({
          id: a.id,
          gameTitle: (a.games as unknown as { title: string } | null)?.title ?? "Vax Arena",
          score: a.total_score,
          completed: a.completed,
          startedAt: a.started_at,
        })),
      );
      setLoaded(true);
    })();
  }, []);

  if (loaded && !name) {
    return (
      <Card className="mx-auto max-w-sm text-center">
        <p className="text-sm text-[var(--foreground-muted)]">Aún no te has unido a ninguna partida de Vax Arena en este dispositivo.</p>
        <LinkButton href="/arena/join" variant="danger" className="mt-4">
          Entrar a la Arena
        </LinkButton>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="text-center">
        <CardLabel>Mi Becker Lab</CardLabel>
        <h1 className="mt-1 text-2xl font-bold">{name}</h1>
      </Card>

      <div className="mt-6">
        <h2 className="mb-3 font-bold">Historial de Vax Arena</h2>
        {attempts.length === 0 ? (
          <Card>
            <p className="text-sm text-[var(--foreground-muted)]">Todavía no has jugado ninguna partida.</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {attempts.map((a) => (
              <Card key={a.id} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="font-semibold">{a.gameTitle}</p>
                  <p className="text-xs text-[var(--foreground-faint)]">
                    {new Date(a.startedAt).toLocaleDateString("es-MX")} · {a.completed ? "Completada" : "En progreso"}
                  </p>
                </div>
                <span className="font-tech text-lg font-bold text-[var(--accent-blue)]">{a.score}</span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
