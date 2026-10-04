"use client";

import { useMemo, useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MCQ } from "@/components/hematologia/MCQ";
import { HEMATO_QUESTION_BANK, type BankQuestion } from "@/lib/hematologia";

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestion(missed: Record<string, number>, usedRecently: BankQuestion[]): BankQuestion {
  let pool = HEMATO_QUESTION_BANK.filter((q) => !usedRecently.includes(q));
  if (pool.length === 0) pool = HEMATO_QUESTION_BANK.slice();
  const missedTags = Object.keys(missed).filter((t) => missed[t] > 0);
  let candidates = pool;
  if (missedTags.length && Math.random() < 0.5) {
    const weighted = pool.filter((q) => missedTags.includes(q.tag));
    if (weighted.length) candidates = weighted;
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function PracticeMode() {
  const [missed, setMissed] = useState<Record<string, number>>({});
  const [usedRecently, setUsedRecently] = useState<BankQuestion[]>([]);
  const [current, setCurrent] = useState<BankQuestion>(() => pickQuestion({}, []));

  function next() {
    const q = pickQuestion(missed, usedRecently);
    setUsedRecently((prev) => {
      const updated = [...prev, q];
      return updated.length > 8 ? updated.slice(1) : updated;
    });
    setCurrent(q);
  }

  const tags = Object.keys(missed).filter((t) => missed[t] > 0);

  return (
    <div className="grid gap-4 sm:grid-cols-[1fr_260px]">
      <Card key={current.stem}>
        <MCQ
          stem={current.stem}
          options={current.options}
          correct={current.correct}
          explain={current.explain}
          onAnswered={(ok) => {
            setMissed((m) => {
              const n = { ...m };
              if (!ok) n[current.tag] = (n[current.tag] || 0) + 1;
              else if (n[current.tag]) n[current.tag] = Math.max(0, n[current.tag] - 1);
              return n;
            });
          }}
          onNext={next}
        />
      </Card>
      <Card>
        <h3 className="text-sm font-bold">Conceptos a repasar</h3>
        <div className="mt-2 space-y-1 text-xs text-[var(--foreground-muted)]">
          {tags.length ? tags.map((t) => (
            <div key={t} className="flex justify-between border-b border-[var(--border)] py-1">
              <span>{t}</span><span>×{missed[t]}</span>
            </div>
          )) : <p>Nada marcado todavía — sigue así.</p>}
        </div>
      </Card>
    </div>
  );
}

function ExamMode() {
  const set = useMemo(() => shuffle(HEMATO_QUESTION_BANK).slice(0, Math.min(18, HEMATO_QUESTION_BANK.length)), []);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<{ q: BankQuestion; ok: boolean }[]>([]);
  const [key, setKey] = useState(0);

  if (idx >= set.length) {
    const correctCount = answers.filter((a) => a.ok).length;
    const pct = Math.round((correctCount / set.length) * 100);
    const wrong = answers.filter((a) => !a.ok);
    const topics = [...new Set(wrong.map((a) => a.q.tag))];
    return (
      <div>
        <div className="py-8 text-center">
          <div className="font-mono text-5xl font-black text-[var(--accent-blue)]">{pct}%</div>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">{correctCount} / {set.length} correctas</p>
        </div>
        <Card>
          {topics.length ? (
            <>
              <h3 className="font-bold">Temas para repasar</h3>
              <div className="mt-2 flex flex-wrap gap-2">{topics.map((t) => <Badge key={t}>{t}</Badge>)}</div>
            </>
          ) : <p className="text-sm text-[var(--foreground-muted)]">Excelente — no se detectaron temas débiles en esta ronda.</p>}
        </Card>
        {wrong.length > 0 && (
          <Card className="mt-4">
            <h3 className="font-bold">Repaso</h3>
            <div className="mt-2 space-y-3">
              {wrong.map((a, i) => (
                <div key={i} className="border-b border-[var(--border)] pb-3 last:border-0">
                  <div className="flex justify-between gap-2 text-sm"><span>{a.q.stem}</span><span className="shrink-0 text-[var(--danger)]">Fallada</span></div>
                  <p className="mt-1 text-xs text-[var(--foreground-faint)]">{a.q.explain}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
        <div className="mt-4">
          <Button variant="primary" onClick={() => { setIdx(0); setAnswers([]); setKey((k) => k + 1); }}>Repetir examen</Button>
        </div>
      </div>
    );
  }

  const q = set[idx];
  return (
    <div key={key}>
      <div className="flex justify-between font-mono text-xs uppercase text-[var(--foreground-faint)]">
        <span>Pregunta {idx + 1} / {set.length}</span><span>Modo examen</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--background-elevated)]">
        <div className="h-full rounded-full bg-[var(--accent-blue)]" style={{ width: `${(idx / set.length) * 100}%` }} />
      </div>
      <Card className="mt-4" key={q.stem}>
        <MCQ
          stem={q.stem}
          options={q.options}
          correct={q.correct}
          explain={q.explain}
          onAnswered={(ok) => setAnswers((a) => [...a, { q, ok }])}
          onNext={() => setIdx((i) => i + 1)}
        />
      </Card>
    </div>
  );
}

export function QuizModule() {
  const [mode, setMode] = useState<"practice" | "exam">("practice");
  return (
    <div>
      <CardLabel>Módulo 07 · Ponte a Prueba</CardLabel>
      <h1 className="mt-1 mb-4 text-2xl font-bold">Recuperación Activa y Modo Examen</h1>
      <div className="mb-5 flex flex-wrap gap-2">
        <Button variant={mode === "practice" ? "primary" : "secondary"} size="sm" onClick={() => setMode("practice")}>Práctica (ponte a prueba)</Button>
        <Button variant={mode === "exam" ? "primary" : "secondary"} size="sm" onClick={() => setMode("exam")}>Modo examen (18 preguntas)</Button>
      </div>
      {mode === "practice" ? <PracticeMode key="practice" /> : <ExamMode key="exam" />}
    </div>
  );
}
