"use client";

import { useEffect, useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_LABEL, type QuestionCategory } from "@/lib/arena/types";

const PASSCODE_KEY = "arena_admin_passcode";

interface FullQuestion {
  id: string;
  category: QuestionCategory;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
  source_reference: string;
  active: boolean;
}

function PasscodeGate({ onUnlock }: { onUnlock: (passcode: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <Card className="mx-auto max-w-sm text-center">
      <CardLabel>Acceso de profesor</CardLabel>
      <h2 className="mt-2 text-lg font-bold">Código de profesor</h2>
      <input
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-4 w-full rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-2.5 text-center text-sm outline-none focus:border-[var(--accent-blue)]"
        placeholder="Código"
      />
      <Button
        className="mt-4 w-full"
        onClick={() => {
          sessionStorage.setItem(PASSCODE_KEY, value);
          onUnlock(value);
        }}
      >
        Entrar
      </Button>
    </Card>
  );
}

export function AdminQuestionsClient() {
  const [passcode, setPasscode] = useState<string | null>(null);
  const [questions, setQuestions] = useState<FullQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(PASSCODE_KEY);
    if (stored) Promise.resolve().then(() => setPasscode(stored));
  }, []);

  useEffect(() => {
    if (!passcode) return;
    fetch(`/api/admin/arena/questions?passcode=${encodeURIComponent(passcode)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          sessionStorage.removeItem(PASSCODE_KEY);
          setPasscode(null);
        } else {
          setQuestions(data.questions);
        }
      });
  }, [passcode]);

  if (!passcode) return <PasscodeGate onUnlock={setPasscode} />;
  if (error) return <p className="text-center text-sm text-[var(--danger)]">{error}</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      <p className="mb-2 text-center text-sm text-[var(--foreground-muted)]">
        {questions.length} preguntas activas. Edición desde el panel llegará más adelante — por ahora, cualquier cambio se hace vía SQL
        Editor de Supabase.
      </p>
      {questions.map((q, i) => (
        <Card key={q.id}>
          <div className="flex items-start justify-between gap-3">
            <Badge>{CATEGORY_LABEL[q.category]}</Badge>
            <span className="font-tech text-[10px] text-[var(--foreground-faint)]">#{i + 1}</span>
          </div>
          <p className="mt-2 font-semibold">{q.question}</p>
          <ul className="mt-2 space-y-1 text-sm text-[var(--foreground-muted)]">
            {(["A", "B", "C", "D"] as const).map((k) => {
              const text = { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d }[k];
              return (
                <li key={k} className={k === q.correct_option ? "font-semibold text-[var(--success)]" : ""}>
                  {k}. {text} {k === q.correct_option && "✓"}
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-xs text-[var(--foreground-faint)]">{q.explanation}</p>
          <p className="mt-2 font-tech text-[10px] text-[var(--foreground-faint)]">Fuente: {q.source_reference}</p>
        </Card>
      ))}
    </div>
  );
}
