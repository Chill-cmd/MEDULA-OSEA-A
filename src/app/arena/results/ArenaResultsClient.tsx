"use client";

import { useEffect, useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";
import { ARENA_STORAGE_KEYS, CATEGORY_LABEL, CATEGORY_MODULE_LINK, type QuestionCategory } from "@/lib/arena/types";

interface ResultsData {
  participantName: string;
  totalScore: number;
  correctCount: number;
  totalAnswered: number;
  weakCategories: QuestionCategory[];
  rank: number | null;
  totalPlayers: number;
}

export function ArenaResultsClient() {
  const [data, setData] = useState<ResultsData | null>(null);
  const [notReady, setNotReady] = useState(false);

  useEffect(() => {
    const attemptId = localStorage.getItem(ARENA_STORAGE_KEYS.attemptId);
    const gameId = localStorage.getItem(ARENA_STORAGE_KEYS.gameId);
    const name = localStorage.getItem(ARENA_STORAGE_KEYS.participantName) ?? "Jugador";
    if (!attemptId || !gameId) {
      Promise.resolve().then(() => setNotReady(true));
      return;
    }

    (async () => {
      const { data: attempt } = await supabase.from("attempts").select("total_score").eq("id", attemptId).single();
      const { data: answers } = await supabase.from("answers").select("correct, question_id").eq("attempt_id", attemptId);
      const { data: questions } = await supabase.from("questions_public").select("id, category");
      const { data: allAttempts } = await supabase
        .from("attempts")
        .select("id, total_score")
        .eq("game_id", gameId)
        .order("total_score", { ascending: false });

      const categoryById = new Map((questions ?? []).map((q) => [q.id, q.category as QuestionCategory]));
      const wrongCategories = new Set<QuestionCategory>();
      (answers ?? []).forEach((a) => {
        if (!a.correct) {
          const cat = categoryById.get(a.question_id);
          if (cat) wrongCategories.add(cat);
        }
      });

      const rankIndex = (allAttempts ?? []).findIndex((a) => a.id === attemptId);

      setData({
        participantName: name,
        totalScore: attempt?.total_score ?? 0,
        correctCount: (answers ?? []).filter((a) => a.correct).length,
        totalAnswered: (answers ?? []).length,
        weakCategories: Array.from(wrongCategories),
        rank: rankIndex >= 0 ? rankIndex + 1 : null,
        totalPlayers: (allAttempts ?? []).length,
      });
    })();
  }, []);

  if (notReady) {
    return (
      <Card className="mx-auto max-w-sm text-center">
        <p className="text-sm text-[var(--foreground-muted)]">No se encontró ningún intento de Vax Arena en este dispositivo.</p>
        <LinkButton href="/arena/join" variant="danger" className="mt-4">
          Ir a entrar
        </LinkButton>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="mx-auto max-w-sm text-center">
        <p className="text-sm text-[var(--foreground-muted)]">Cargando resultados…</p>
      </Card>
    );
  }

  const accuracy = data.totalAnswered ? Math.round((data.correctCount / data.totalAnswered) * 100) : 0;

  return (
    <div className="mx-auto max-w-lg">
      <div className="text-center">
        <CardLabel>Resultados · {data.participantName}</CardLabel>
        <h1 className="mt-2 text-3xl font-black">
          {data.rank === 1 ? "¡CAMPEÓN DE VAX ARENA!" : "PARTIDA TERMINADA"}
        </h1>
      </div>

      <Card className="mt-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-tech text-3xl font-black text-[var(--accent-blue)]">{data.totalScore}</div>
            <p className="mt-1 text-xs text-[var(--foreground-faint)]">PUNTOS</p>
          </div>
          <div>
            <div className="font-tech text-3xl font-black">{accuracy}%</div>
            <p className="mt-1 text-xs text-[var(--foreground-faint)]">PRECISIÓN</p>
          </div>
          <div>
            <div className="font-tech text-3xl font-black">
              {data.rank ?? "—"}
              <span className="text-base text-[var(--foreground-faint)]">/{data.totalPlayers}</span>
            </div>
            <p className="mt-1 text-xs text-[var(--foreground-faint)]">LUGAR</p>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-[var(--foreground-muted)]">
          {data.correctCount} de {data.totalAnswered} respuestas correctas.
        </p>
      </Card>

      <Card className="mt-5">
        <h3 className="font-bold">Revisión Inteligente</h3>
        {data.weakCategories.length ? (
          <>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              Fallaste al menos una pregunta de estas categorías — te recomendamos repasarlas:
            </p>
            <div className="mt-3 space-y-2">
              {data.weakCategories.map((cat) => (
                <LinkButton key={cat} href={CATEGORY_MODULE_LINK[cat].href} variant="secondary" size="sm" className="w-full justify-between">
                  {CATEGORY_LABEL[cat]} → {CATEGORY_MODULE_LINK[cat].label}
                </LinkButton>
              ))}
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm text-[var(--success)]">Excelente — no se detectaron categorías débiles.</p>
        )}
      </Card>

      <div className="mt-6 flex justify-center gap-3">
        <LinkButton href="/leaderboard" variant="primary">
          Ver tabla de posiciones
        </LinkButton>
        <LinkButton href="/learn" variant="ghost">
          Volver a Aprender
        </LinkButton>
      </div>
    </div>
  );
}
