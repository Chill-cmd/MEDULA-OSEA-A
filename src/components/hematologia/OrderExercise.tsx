"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface OrderExerciseProps {
  items: string[];
  correctOrder: number[];
  explain: string;
  onNext?: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function OrderExercise({ items, correctOrder, explain, onNext }: OrderExerciseProps) {
  const [pool, setPool] = useState(() => shuffle(items.map((label, i) => ({ label, i }))));
  const [slots, setSlots] = useState<{ label: string; i: number }[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);

  function reset() {
    setPool(shuffle(items.map((label, i) => ({ label, i }))));
    setSlots([]);
    setChecked(null);
  }

  return (
    <div>
      <p className="text-xs text-[var(--foreground-faint)]">Haz clic en los pasos de abajo para colocarlos en orden.</p>
      <div className="mt-3 flex min-h-[48px] flex-wrap gap-2">
        {pool.length === 0 && <span className="text-xs text-[var(--foreground-faint)]">—</span>}
        {pool.map((p) => (
          <button
            key={p.i}
            onClick={() => {
              setPool(pool.filter((x) => x.i !== p.i));
              setSlots([...slots, p]);
            }}
            className="rounded-lg border border-[var(--border)] bg-[var(--background-elevated)] px-3.5 py-2 text-sm font-semibold"
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="mt-3 flex min-h-[48px] flex-wrap gap-2 rounded-xl border border-dashed border-[var(--border)] p-2">
        {slots.length === 0 && <span className="text-xs text-[var(--foreground-faint)] p-2">Coloca aquí los pasos, en orden.</span>}
        {slots.map((p, si) => (
          <button
            key={p.i}
            onClick={() => {
              setSlots(slots.filter((x) => x.i !== p.i));
              setPool([...pool, p]);
            }}
            className="rounded-lg border border-[var(--accent-blue)] bg-[var(--background-elevated)] px-3.5 py-2 text-sm font-semibold"
          >
            {si + 1}. {p.label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            const order = slots.map((p) => p.i);
            const ok = order.length === correctOrder.length && order.every((v, i) => v === correctOrder[i]);
            setChecked(ok);
          }}
        >
          Verificar orden
        </Button>
        <Button variant="ghost" size="sm" onClick={reset}>Reiniciar</Button>
      </div>
      {checked !== null && (
        <>
          <p
            className="mt-4 rounded-xl border-l-2 p-4 text-sm text-[var(--foreground-muted)]"
            style={{ borderColor: checked ? "var(--success)" : "var(--danger)" }}
          >
            {explain}
          </p>
          {onNext && (
            <div className="mt-4">
              <Button variant="primary" size="sm" onClick={onNext}>Siguiente caso →</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
