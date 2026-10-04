"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

interface StepperProps<T> {
  stages: T[];
  renderStage: (stage: T, index: number, total: number) => { visual: React.ReactNode; caption: React.ReactNode };
  interval?: number;
  onFinalStage?: (isFinal: boolean) => void;
  onIndexChange?: (index: number) => void;
}

export function Stepper<T>({ stages, renderStage, interval = 2200, onFinalStage, onIndexChange }: StepperProps<T>) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    onFinalStage?.(idx === stages.length - 1);
    onIndexChange?.(idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, stages.length]);

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setIdx((i) => {
        if (i >= stages.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, interval, stages.length]);

  const stage = stages[idx];
  const { visual, caption } = renderStage(stage, idx, stages.length);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex min-h-[180px] items-center justify-center">{visual}</div>
      <div className="max-w-xl text-center">{caption}</div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {stages.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPlaying(false);
              setIdx(i);
            }}
            className={`h-2.5 w-2.5 rounded-full border transition-colors ${
              i === idx
                ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]"
                : i < idx
                  ? "border-[var(--border)] bg-[var(--foreground-faint)]"
                  : "border-[var(--border)] bg-[var(--background-elevated)]"
            }`}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={idx === 0}
          onClick={() => {
            setPlaying(false);
            setIdx((i) => Math.max(0, i - 1));
          }}
        >
          ← Atrás
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            if (playing) {
              setPlaying(false);
            } else {
              if (idx >= stages.length - 1) setIdx(0);
              setPlaying(true);
            }
          }}
        >
          {playing ? "❚❚ Pausa" : "▶ Reproducir"}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={idx === stages.length - 1}
          onClick={() => {
            setPlaying(false);
            setIdx((i) => Math.min(stages.length - 1, i + 1));
          }}
        >
          Siguiente →
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setPlaying(false);
            setIdx(0);
          }}
        >
          Reiniciar
        </Button>
      </div>
    </div>
  );
}
