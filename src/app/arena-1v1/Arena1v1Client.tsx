"use client";

import { useMemo, useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { shuffleDuelQuestions, type DuelQuestion, type DuelTopic } from "@/lib/arena1v1/questions";

type Phase = "start" | "playing" | "finished";
type TopicStats = Record<string, { correct: number; total: number }>;

const ROUND_OPTIONS = [6, 10, 14];

export function Arena1v1Client() {
  const [phase, setPhase] = useState<Phase>("start");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [roundCount, setRoundCount] = useState(10);
  const [presentation, setPresentation] = useState(false);

  const [questions, setQuestions] = useState<DuelQuestion[]>([]);
  const [roundIndex, setRoundIndex] = useState(0);
  const [turn, setTurn] = useState<1 | 2>(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [topicStats, setTopicStats] = useState<TopicStats>({});

  const p1 = name1.trim() || "Equipo Rojo";
  const p2 = name2.trim() || "Equipo Azul";
  const current = questions[roundIndex];

  function startDuel() {
    const shuffled = shuffleDuelQuestions().slice(0, roundCount);
    setQuestions(shuffled);
    setRoundIndex(0);
    setTurn(1);
    setScore1(0);
    setScore2(0);
    setSelected(null);
    setAnswered(false);
    setTopicStats({});
    setPhase("playing");
  }

  function resetDuel() {
    setPhase("start");
  }

  function answer() {
    if (selected === null || !current || answered) return;
    setAnswered(true);
    const correct = selected === current.correct;
    if (correct) {
      if (turn === 1) setScore1((s) => s + 1);
      else setScore2((s) => s + 1);
    }
    setTopicStats((prev) => {
      const t = prev[current.topic] ?? { correct: 0, total: 0 };
      return { ...prev, [current.topic]: { correct: t.correct + (correct ? 1 : 0), total: t.total + 1 } };
    });
  }

  function nextQuestion() {
    if (roundIndex + 1 >= questions.length) {
      setPhase("finished");
      return;
    }
    setRoundIndex((i) => i + 1);
    setTurn((t) => (t === 1 ? 2 : 1));
    setSelected(null);
    setAnswered(false);
  }

  function endDuel() {
    setPhase("finished");
  }

  const { strengths, review } = useMemo(() => {
    const strengths: DuelTopic[] = [];
    const review: DuelTopic[] = [];
    (Object.keys(topicStats) as DuelTopic[]).forEach((topic) => {
      const { correct, total } = topicStats[topic];
      if (total === 0) return;
      if (correct / total >= 0.7) strengths.push(topic);
      else review.push(topic);
    });
    return { strengths, review };
  }, [topicStats]);

  const totalAnswered = Object.values(topicStats).reduce((a, t) => a + t.total, 0);
  const totalCorrect = Object.values(topicStats).reduce((a, t) => a + t.correct, 0);
  const pct = totalAnswered ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  const txt = (normal: string, big: string) => (presentation ? big : normal);

  if (phase === "start") {
    return (
      <div className="mx-auto max-w-lg text-center">
        <CardLabel>Competencia 1v1</CardLabel>
        <h1 className="mt-2 text-4xl font-black sm:text-5xl">ARENA BECKER 1V1</h1>
        <p className="mx-auto mt-3 max-w-md text-[var(--foreground-muted)]">
          Competencia en vivo del Sistema Hematopoyético.
        </p>

        <Card className="mt-8 text-left">
          <label className="text-xs font-mono uppercase text-[var(--foreground-faint)]">Jugador 1</label>
          <input
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="Equipo Rojo"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-3 text-base outline-none focus:border-[var(--accent-red)]"
          />
          <label className="mt-4 block text-xs font-mono uppercase text-[var(--foreground-faint)]">Jugador 2</label>
          <input
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="Equipo Azul"
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-3 text-base outline-none focus:border-[var(--accent-blue)]"
          />

          <label className="mt-5 block text-xs font-mono uppercase text-[var(--foreground-faint)]">Número de preguntas</label>
          <div className="mt-2 flex gap-2">
            {ROUND_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setRoundCount(n)}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                  roundCount === n
                    ? "border-[var(--accent-blue)] bg-[var(--accent-blue-dim)] text-[var(--accent-blue)]"
                    : "border-[var(--border)] text-[var(--foreground-muted)]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          <Button variant="danger" size="lg" className="mt-6 w-full" onClick={startDuel}>
            ENTRAR A LA ARENA
          </Button>
        </Card>
      </div>
    );
  }

  if (phase === "finished") {
    const winner = score1 === score2 ? null : score1 > score2 ? p1 : p2;
    return (
      <div className="mx-auto max-w-lg text-center">
        <CardLabel>Duelo terminado</CardLabel>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">
          {winner ? `Ganador: ${winner}` : "¡Empate!"}
        </h1>
        <p className="mt-2 font-tech text-2xl font-bold">
          {p1} {score1} — {score2} {p2}
        </p>
        <p className="mt-1 text-sm text-[var(--foreground-muted)]">{pct}% de aciertos combinados</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card className="text-left">
            <h3 className="font-bold text-[var(--success)]">Fortalezas</h3>
            {strengths.length ? (
              <ul className="mt-2 space-y-1 text-sm text-[var(--foreground-muted)]">
                {strengths.map((t) => (
                  <li key={t}>• {t}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-[var(--foreground-faint)]">Ninguna con ≥70% todavía.</p>
            )}
          </Card>
          <Card className="text-left">
            <h3 className="font-bold text-[var(--warning)]">Temas para repasar</h3>
            {review.length ? (
              <ul className="mt-2 space-y-1 text-sm text-[var(--foreground-muted)]">
                {review.map((t) => (
                  <li key={t}>• {t}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-[var(--foreground-faint)]">Ningún tema débil detectado.</p>
            )}
          </Card>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Button variant="primary" size="lg" onClick={startDuel}>
            Jugar de nuevo
          </Button>
          <Button variant="ghost" size="lg" onClick={resetDuel}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  // phase === "playing"
  if (!current) return null;
  const turnName = turn === 1 ? p1 : p2;

  return (
    <div className={presentation ? "mx-auto max-w-4xl" : "mx-auto max-w-2xl"}>
      <div className="flex items-center justify-between">
        <div className={txt("grid grid-cols-2 gap-3 text-sm", "grid grid-cols-2 gap-6 text-2xl")}>
          <div className="rounded-xl border border-[var(--accent-red)]/40 bg-[var(--accent-red)]/10 px-4 py-2 text-center">
            <div className="font-semibold">{p1}</div>
            <div className={txt("font-tech text-xl font-bold text-[var(--accent-red)]", "font-tech text-4xl font-bold text-[var(--accent-red)]")}>{score1}</div>
          </div>
          <div className="rounded-xl border border-[var(--accent-blue)]/40 bg-[var(--accent-blue)]/10 px-4 py-2 text-center">
            <div className="font-semibold">{p2}</div>
            <div className={txt("font-tech text-xl font-bold text-[var(--accent-blue)]", "font-tech text-4xl font-bold text-[var(--accent-blue)]")}>{score2}</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setPresentation((v) => !v)}>
          {presentation ? "Modo normal" : "Modo presentación"}
        </Button>
      </div>

      <div className={txt("mt-5 text-center font-tech text-sm uppercase tracking-wide", "mt-6 text-center font-tech text-2xl uppercase tracking-wide")}>
        Turno de: <span className={turn === 1 ? "text-[var(--accent-red)]" : "text-[var(--accent-blue)]"}>{turnName}</span>
      </div>
      <p className={txt("mt-1 text-center text-xs text-[var(--foreground-faint)]", "mt-2 text-center text-base text-[var(--foreground-faint)]")}>
        Pregunta {roundIndex + 1} / {questions.length} · {current.topic}
      </p>

      <Card className="mt-5">
        <h2 className={txt("text-lg font-bold", "text-3xl font-bold")}>{current.stem}</h2>
        <div className={txt("mt-5 grid gap-3 sm:grid-cols-2", "mt-8 grid gap-5 sm:grid-cols-2")}>
          {current.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === current.correct;
            let cls = "border-[var(--border)] hover:border-[var(--accent-blue)]";
            if (answered) {
              if (isCorrect) cls = "border-[var(--success)] bg-[var(--success)]/10";
              else if (isSelected) cls = "border-[var(--danger)] bg-[var(--danger)]/10";
            } else if (isSelected) {
              cls = "border-[var(--accent-blue)] bg-[var(--accent-blue-dim)]";
            }
            return (
              <button
                key={i}
                disabled={answered}
                onClick={() => setSelected(i)}
                className={`rounded-xl border text-left font-semibold transition-colors disabled:cursor-default ${cls} ${txt(
                  "p-4 text-sm",
                  "p-6 text-xl",
                )}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={txt(
            "mt-5 rounded-xl border-l-2 border-[var(--accent-blue)] bg-[var(--background-elevated)] p-4 text-sm",
            "mt-6 rounded-xl border-l-4 border-[var(--accent-blue)] bg-[var(--background-elevated)] p-6 text-xl",
          )}>
            <p className="font-bold" style={{ color: selected === current.correct ? "var(--success)" : "var(--danger)" }}>
              {selected === current.correct ? `¡Correcto, ${turnName}!` : "Incorrecto"}
            </p>
            <p className="mt-2 text-[var(--foreground-muted)]">{current.explain}</p>
          </div>
        )}

        <div className={txt("mt-5 flex flex-wrap gap-2", "mt-6 flex flex-wrap gap-3")}>
          {!answered ? (
            <Button variant="primary" size={presentation ? "lg" : "md"} disabled={selected === null} onClick={answer}>
              Responder
            </Button>
          ) : (
            <Button variant="primary" size={presentation ? "lg" : "md"} onClick={nextQuestion}>
              Siguiente pregunta
            </Button>
          )}
          <Button variant="secondary" size={presentation ? "lg" : "md"} onClick={startDuel}>
            Reiniciar duelo
          </Button>
          <Button variant="danger" size={presentation ? "lg" : "md"} onClick={endDuel}>
            Terminar duelo
          </Button>
        </div>
      </Card>
    </div>
  );
}
