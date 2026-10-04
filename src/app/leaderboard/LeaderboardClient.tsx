"use client";

import { useEffect, useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase/client";

interface Row {
  attemptId: string;
  name: string;
  score: number;
  completed: boolean;
}

const MEDALS = ["🥇", "🥈", "🥉"];

export function LeaderboardClient() {
  const [rows, setRows] = useState<Row[]>([]);
  const [gameTitle, setGameTitle] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [prevLeaderId, setPrevLeaderId] = useState<string | null>(null);
  const [justChanged, setJustChanged] = useState(false);

  useEffect(() => {
    let active = true;
    async function poll() {
      const { data: game } = await supabase
        .from("games")
        .select("id, title")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!active) return;
      if (!game) {
        setLoaded(true);
        return;
      }
      setGameTitle(game.title);

      const { data: attempts } = await supabase
        .from("attempts")
        .select("id, participant_id, total_score, completed")
        .eq("game_id", game.id)
        .order("total_score", { ascending: false });
      if (!active || !attempts) return;

      const participantIds = attempts.map((a) => a.participant_id);
      const { data: participants } = await supabase.from("participants").select("id, name").in("id", participantIds);
      const nameById = new Map((participants ?? []).map((p) => [p.id, p.name]));

      const newRows = attempts.map((a) => ({
        attemptId: a.id,
        name: nameById.get(a.participant_id) ?? "—",
        score: a.total_score,
        completed: a.completed,
      }));

      if (newRows[0] && newRows[0].attemptId !== prevLeaderId) {
        if (prevLeaderId !== null) {
          setJustChanged(true);
          setTimeout(() => setJustChanged(false), 2000);
        }
        setPrevLeaderId(newRows[0].attemptId);
      }

      setRows(newRows);
      setLoaded(true);
    }
    poll();
    const interval = setInterval(poll, 2500);
    return () => {
      active = false;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loaded && rows.length === 0) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <p className="text-sm text-[var(--foreground-muted)]">Todavía no hay ninguna partida de Vax Arena con jugadores.</p>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {gameTitle && <CardLabel className="block text-center">{gameTitle}</CardLabel>}
      {justChanged && (
        <p className="mt-2 text-center font-tech text-sm uppercase tracking-wide text-[var(--accent-red)]">¡Nuevo líder!</p>
      )}
      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <Card key={r.attemptId} className="flex items-center justify-between py-3.5">
            <div className="flex items-center gap-3">
              <span className="w-8 text-center font-tech text-lg">{MEDALS[i] ?? i + 1}</span>
              <span className="font-semibold">{r.name}</span>
              {!r.completed && <span className="font-tech text-[10px] uppercase text-[var(--foreground-faint)]">jugando…</span>}
            </div>
            <span className="font-tech text-lg font-bold text-[var(--accent-blue)]">{r.score}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
