"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase/client";
import { ARENA_STORAGE_KEYS, sortQuestions, CATEGORY_LABEL, type QuestionPublic } from "@/lib/arena/types";

type AnswerResult = { correct: boolean; correctOption: string; explanation: string; score: number; totalScore: number };

const OPTION_KEYS = ["A", "B", "C", "D"] as const;

export function ArenaGameClient() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionPublic[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [questionStartedAt, setQuestionStartedAt] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [notReady, setNotReady] = useState(false);
  const submittingRef = useRef(false);
  const lastSeenIndexRef = useRef<number | null>(null);

  useEffect(() => {
    supabase
      .from("questions_public")
      .select("*")
      .then(({ data }) => setQuestions(sortQuestions((data as QuestionPublic[]) ?? [])));
  }, []);

  useEffect(() => {
    const gameId = localStorage.getItem(ARENA_STORAGE_KEYS.gameId);
    if (!gameId) {
      Promise.resolve().then(() => setNotReady(true));
      return;
    }
    let active = true;
    async function poll() {
      const { data: game } = await supabase
        .from("games")
        .select("status, current_question_index, question_started_at")
        .eq("id", gameId!)
        .single();
      if (!active || !game) return;
      setStatus(game.status);
      if (game.status === "finished") {
        router.push("/arena/results");
        return;
      }
      if (lastSeenIndexRef.current !== game.current_question_index) {
        lastSeenIndexRef.current = game.current_question_index;
        setIndex(game.current_question_index);
        setQuestionStartedAt(game.question_started_at);
        setPicked(null);
        setResult(null);
        setRemaining(9999);
        submittingRef.current = false;
      }
    }
    poll();
    const interval = setInterval(poll, 1000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [router]);

  const current = index !== null ? questions[index] : null;

  const submit = useCallback(
    async (option: string | null) => {
      if (submittingRef.current || !current || !questionStartedAt) return;
      submittingRef.current = true;
      setPicked(option ?? "—");
      const attemptId = localStorage.getItem(ARENA_STORAGE_KEYS.attemptId);
      const responseTimeMs = Date.now() - new Date(questionStartedAt).getTime();
      const res = await fetch("/api/arena/submit-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attempt_id: attemptId, question_id: current.id, selected_option: option, response_time_ms: responseTimeMs }),
      });
      const data = await res.json();
      if (res.ok) setResult(data);
    },
    [current, questionStartedAt],
  );

  // Single source of truth for the countdown: computes the remaining time AND
  // decides to auto-submit a null answer in the same tick, so there is no
  // separate effect that can read a stale "remaining" value from the
  // previous question and fire a premature submit.
  useEffect(() => {
    if (!current || !questionStartedAt) return;
    let timedOut = false;
    const tick = () => {
      const elapsed = (Date.now() - new Date(questionStartedAt).getTime()) / 1000;
      const r = Math.max(0, current.time_limit_seconds - elapsed);
      setRemaining(r);
      if (r <= 0 && !timedOut) {
        timedOut = true;
        submit(null);
      }
    };
    tick();
    const t = setInterval(tick, 100);
    return () => clearInterval(t);
  }, [current, questionStartedAt, submit]);

  if (notReady) {
    return (
      <Card className="mx-auto max-w-sm text-center">
        <p className="text-sm text-[var(--foreground-muted)]">Primero debes unirte a una partida.</p>
      </Card>
    );
  }

  if (status === "paused") {
    return (
      <Card className="mx-auto max-w-sm text-center">
        <h2 className="text-xl font-bold">Partida en pausa</h2>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">Espera a que el profesor reanude.</p>
      </Card>
    );
  }

  if (!current) {
    return (
      <Card className="mx-auto max-w-sm text-center">
        <p className="text-sm text-[var(--foreground-muted)]">Cargando pregunta…</p>
      </Card>
    );
  }

  const options = [current.option_a, current.option_b, current.option_c, current.option_d];
  const pct = (remaining / current.time_limit_seconds) * 100;

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center justify-between font-mono text-xs uppercase text-[var(--foreground-faint)]">
        <span>
          Pregunta {(index ?? 0) + 1} / {questions.length}
        </span>
        <span>{CATEGORY_LABEL[current.category]}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--background-elevated)]">
        <div
          className="h-full rounded-full bg-[var(--accent-red)] transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-right font-mono text-xs text-[var(--foreground-faint)]">{remaining.toFixed(1)}s</p>

      <Card className="mt-5">
        <h2 className="text-lg font-bold">{current.question}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {options.map((opt, i) => {
            const key = OPTION_KEYS[i];
            const locked = picked !== null;
            const isPicked = picked === key;
            const isCorrect = result && result.correctOption === key;
            let cls = "border-[var(--border)] hover:border-[var(--accent-blue)]";
            if (result) {
              if (isCorrect) cls = "border-[var(--success)] bg-[var(--success)]/10";
              else if (isPicked) cls = "border-[var(--danger)] bg-[var(--danger)]/10";
            } else if (isPicked) {
              cls = "border-[var(--accent-blue)] bg-[var(--accent-blue-dim)]";
            }
            return (
              <button
                key={key}
                disabled={locked}
                onClick={() => submit(key)}
                className={`rounded-xl border p-4 text-left text-sm font-semibold transition-colors disabled:cursor-default ${cls}`}
              >
                <span className="mr-2 font-tech text-xs text-[var(--foreground-faint)]">{key}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {result && (
          <div className="mt-5 rounded-xl border-l-2 border-[var(--accent-blue)] bg-[var(--background-elevated)] p-4 text-sm">
            <p className="font-bold" style={{ color: result.correct ? "var(--success)" : "var(--danger)" }}>
              {result.correct ? `¡Correcto! +${result.score} puntos` : "Incorrecto"}
            </p>
            <p className="mt-2 text-[var(--foreground-muted)]">{result.explanation}</p>
            <p className="mt-3 font-mono text-xs text-[var(--foreground-faint)]">Puntaje total: {result.totalScore}</p>
            <p className="mt-2 text-xs text-[var(--foreground-faint)]">Esperando la siguiente pregunta del profesor…</p>
          </div>
        )}
      </Card>
    </div>
  );
}
