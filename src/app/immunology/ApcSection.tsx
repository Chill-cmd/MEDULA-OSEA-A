"use client";

import { useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Stepper } from "@/components/hematologia/Stepper";
import { APC_TYPES, MHC_SCENARIOS, INNATE_ADAPTIVE_STAGES, ANTIGEN_PRESENTATION_STAGES } from "@/lib/hematologia";

function Flow({ nodes, hot }: { nodes: string[]; hot: number }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 py-2">
      {nodes.map((n, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="rounded-lg border px-3 py-2 text-center text-xs font-semibold" style={i === hot ? { borderColor: "var(--accent-blue)", boxShadow: "0 0 14px rgba(45,212,255,.25)" } : { borderColor: "var(--border)" }}>{n}</span>
          {i < nodes.length - 1 && <span className="text-[var(--foreground-faint)]">→</span>}
        </span>
      ))}
    </div>
  );
}

function MhcClassifier() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [idx, setIdx] = useState(0);
  const pool = showAdvanced ? MHC_SCENARIOS : MHC_SCENARIOS.filter((s) => !s.advanced);
  const sc = pool[idx % pool.length];
  const [picked, setPicked] = useState<"I" | "II" | null>(null);

  return (
    <Card>
      <label className="flex items-center gap-2 text-xs text-[var(--foreground-muted)]">
        <input type="checkbox" checked={showAdvanced} onChange={(e) => { setShowAdvanced(e.target.checked); setIdx(0); setPicked(null); }} />
        Mostrar avanzado: presentación cruzada
      </label>
      <p className="mt-3 text-sm">{sc.desc}</p>
      <p className="text-sm text-[var(--foreground-muted)]">¿Por cuál vía debería presentarse este antígeno?</p>
      <div className="mt-4 flex flex-wrap gap-4">
        {(["I", "II"] as const).map((opt) => {
          const answered = picked !== null;
          const isCorrect = opt === sc.correct;
          let cls = "border-dashed border-[var(--border)]";
          if (answered && isCorrect) cls = "border-[var(--success)] bg-[var(--success)]/10";
          else if (answered && opt === picked && !isCorrect) cls = "border-[var(--danger)] bg-[var(--danger)]/10";
          return (
            <button
              key={opt}
              disabled={answered}
              onClick={() => setPicked(opt)}
              className={`flex-1 min-w-[160px] rounded-xl border-2 p-5 text-center transition-colors disabled:cursor-default ${cls}`}
            >
              <h4 className="font-bold">MHC {opt}</h4>
              <p className="mt-1 text-xs text-[var(--foreground-faint)]">→ Linfocito T {opt === "I" ? "citotóxico CD8+" : "colaborador CD4+"}</p>
            </button>
          );
        })}
      </div>
      {picked && <p className="mt-4 rounded-xl border-l-2 border-[var(--accent-blue)] bg-[var(--background-elevated)] p-4 text-sm text-[var(--foreground-muted)]">{sc.explain}</p>}
      {picked && (
        <button
          onClick={() => { setIdx((i) => i + 1); setPicked(null); }}
          className="mt-4 rounded-full border border-[var(--border-strong)] px-3.5 py-2 text-xs font-semibold hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)]"
        >
          Siguiente escenario →
        </button>
      )}
    </Card>
  );
}

export function ApcSection() {
  return (
    <div className="space-y-10">
      <div>
        <CardLabel>Células Presentadoras de Antígeno</CardLabel>
        <h2 className="mt-1 mb-4 text-xl font-bold">Tipos de CPA</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {APC_TYPES.map((a) => (
            <Card key={a.id}>
              <h4 className="font-bold">{a.name}</h4>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">{a.role}</p>
              <p className="mt-2 text-xs text-[var(--foreground-faint)]">{a.mhc}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <CardLabel>Vía de presentación del antígeno</CardLabel>
        <h2 className="mt-1 mb-4 text-xl font-bold">Del antígeno a la célula T</h2>
        <Card>
          <Stepper
            stages={ANTIGEN_PRESENTATION_STAGES}
            renderStage={(s, i) => ({
              visual: <Flow nodes={ANTIGEN_PRESENTATION_STAGES.map((st) => st.name)} hot={i} />,
              caption: <><h3 className="font-bold">{i + 1}. {s.name}</h3><p className="mt-1 text-sm text-[var(--foreground-muted)]">{s.desc}</p></>,
            })}
          />
        </Card>
      </div>

      <div>
        <CardLabel>Simulador de MHC</CardLabel>
        <h2 className="mt-1 mb-4 text-xl font-bold">¿MHC I o MHC II?</h2>
        <MhcClassifier />
      </div>

      <div>
        <CardLabel>Innata → Adaptativa</CardLabel>
        <h2 className="mt-1 mb-4 text-xl font-bold">El puente hacia la inmunidad adaptativa</h2>
        <Card>
          <Stepper
            interval={2400}
            stages={INNATE_ADAPTIVE_STAGES}
            renderStage={(s, i) => ({
              visual: <Flow nodes={INNATE_ADAPTIVE_STAGES.map((st) => st.name)} hot={i} />,
              caption: <><h3 className="font-bold">{i + 1}. {s.name}</h3><p className="mt-1 text-sm text-[var(--foreground-muted)]">{s.desc}</p></>,
            })}
          />
          <p className="mt-3 text-center text-sm text-[var(--foreground-muted)]">
            Por esto las células presentadoras de antígeno conectan la inmunidad innata con la adaptativa: un
            centinela innato (la célula dendrítica) dispara una respuesta específica y adaptativa de linfocitos T.
          </p>
        </Card>
      </div>
    </div>
  );
}
