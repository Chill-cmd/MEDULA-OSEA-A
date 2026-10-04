"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SourceBadge } from "@/components/ui/Badge";
import { MCQ } from "@/components/hematologia/MCQ";
import { OrderExercise } from "@/components/hematologia/OrderExercise";
import { HEMATO_CLINICAL_CASES, type HematoClinicalCase } from "@/lib/hematologia";
import { CLINICAL_CASES_VACCINATION } from "@/lib/content";

type Case =
  | (HematoClinicalCase & { source: "hemato" })
  | { id: string; type: "mcq"; source: "vax"; category: "Vacunación México"; vignette: string; question: string; options: string[]; correct: number; explain: string; sourceTag: "HTML" | "PDF" | "HTML+PDF" };

const CASES: Case[] = [
  ...HEMATO_CLINICAL_CASES.map((c) => ({ ...c, source: "hemato" as const })),
  ...CLINICAL_CASES_VACCINATION.map((c) => ({
    id: c.id,
    type: "mcq" as const,
    source: "vax" as const,
    category: "Vacunación México" as const,
    vignette: c.vignette,
    question: c.question,
    options: c.options,
    correct: c.correct,
    explain: c.explain,
    sourceTag: c.source as "HTML" | "PDF" | "HTML+PDF",
  })),
];

const categoryColor: Record<string, string> = {
  "Hematología": "var(--accent-amber)",
  "Inmunología": "var(--accent-indigo)",
  "Vacunación México": "var(--accent-red)",
};

export function ClinicalClient() {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);
  const c = CASES[idx];
  const goNext = () => { setIdx((i) => (i + 1) % CASES.length); setKey((k) => k + 1); };

  return (
    <div>
      <div className="flex justify-between font-mono text-xs uppercase text-[var(--foreground-faint)]">
        <span>Caso {idx + 1} / {CASES.length}</span>
        <span>Recuperación activa</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-[var(--background-elevated)]">
        <div className="h-full rounded-full bg-[var(--accent-blue)] transition-all" style={{ width: `${(idx / CASES.length) * 100}%` }} />
      </div>

      <Card className="mt-5" key={key}>
        <div className="mb-3 flex items-center justify-between">
          <Badge style={{ color: categoryColor[c.category], borderColor: categoryColor[c.category] }}>{c.category}</Badge>
          {c.source === "vax" && <SourceBadge source={c.sourceTag} />}
        </div>
        <p className="text-sm italic text-[var(--foreground-faint)]">{c.vignette}</p>
        {c.type === "order" ? (
          <div className="mt-3">
            <p className="text-base font-semibold">{c.question}</p>
            <div className="mt-3">
              <OrderExercise items={c.items} correctOrder={c.correctOrder} explain={c.explain} onNext={goNext} />
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <MCQ stem={c.question} options={c.options} correct={c.correct} explain={c.explain} onNext={goNext} />
          </div>
        )}
      </Card>
    </div>
  );
}
