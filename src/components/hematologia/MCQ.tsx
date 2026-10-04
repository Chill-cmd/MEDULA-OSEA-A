"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface MCQProps {
  stem: string;
  options: string[];
  correct: number;
  explain: string;
  onAnswered?: (correct: boolean) => void;
  onNext?: () => void;
  nextLabel?: string;
}

export function MCQ({ stem, options, correct, explain, onAnswered, onNext, nextLabel = "Continuar →" }: MCQProps) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div>
      <p className="text-base font-semibold">{stem}</p>
      <div className="mt-4 space-y-2">
        {options.map((opt, i) => {
          const answered = picked !== null;
          const isCorrect = i === correct;
          const isPicked = i === picked;
          let cls = "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent-blue)]";
          if (answered && isCorrect) cls = "border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]";
          else if (answered && isPicked && !isCorrect) cls = "border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]";
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => {
                if (answered) return;
                setPicked(i);
                onAnswered?.(i === correct);
              }}
              className={`block w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <>
          <p className="mt-4 rounded-xl border-l-2 border-[var(--accent-blue)] bg-[var(--background-elevated)] p-4 text-sm text-[var(--foreground-muted)]">
            {explain}
          </p>
          {onNext && (
            <div className="mt-4">
              <Button variant="primary" size="sm" onClick={onNext}>{nextLabel}</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
