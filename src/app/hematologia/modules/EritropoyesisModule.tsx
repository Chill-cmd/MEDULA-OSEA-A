"use client";

import { useMemo, useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Stepper } from "@/components/hematologia/Stepper";
import { EryCellSvg } from "@/components/hematologia/svg";
import { ERY_STAGES } from "@/lib/hematologia";

function Toggle({ label, value, onToggle }: { label: string; value: "normal" | "low"; onToggle: () => void }) {
  const low = value === "low";
  return (
    <button
      onClick={onToggle}
      className="rounded-full border px-4 py-2 text-xs font-semibold"
      style={low ? { background: "var(--warning)", color: "#04121a", borderColor: "var(--warning)" } : { borderColor: "var(--border)", color: "var(--foreground-muted)" }}
    >
      {label}: {low ? "BAJO" : "NORMAL"}
    </button>
  );
}

function Flow({ nodes, hotIndex }: { nodes: string[]; hotIndex: number | ((i: number) => boolean) }) {
  const isHot = typeof hotIndex === "function" ? hotIndex : (i: number) => i === hotIndex;
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 py-4">
      {nodes.map((n, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span
            className="rounded-lg border px-3 py-2 text-center text-xs font-semibold"
            style={isHot(i) ? { borderColor: "var(--accent-blue)", boxShadow: "0 0 14px rgba(45,212,255,.25)" } : { borderColor: "var(--border)" }}
          >
            {n}
          </span>
          {i < nodes.length - 1 && <span className="text-[var(--foreground-faint)]">→</span>}
        </span>
      ))}
    </div>
  );
}

export function EritropoyesisModule() {
  const [o2, setO2] = useState(95);
  const [renal, setRenal] = useState(100);
  const [iron, setIron] = useState<"normal" | "low">("normal");
  const [b12, setB12] = useState<"normal" | "low">("normal");
  const [folate, setFolate] = useState<"normal" | "low">("normal");

  const { epoLevel, hot, notes } = useMemo(() => {
    const hypoxicDrive = 100 - o2;
    const epoLevel = Math.max(5, Math.round((20 + hypoxicDrive * 2.4) * (renal / 100)));
    const hot = epoLevel > 45;
    const notes: string[] = [];
    if (renal < 60) notes.push("La función renal reducida limita la capacidad de síntesis de EPO, atenuando la respuesta incluso bajo hipoxia (anemia de la enfermedad renal crónica).");
    if (iron === "low") notes.push("La deficiencia de hierro limita la síntesis de hemoglobina a pesar de un estímulo eritroide adecuado.");
    if (b12 === "low" || folate === "low") notes.push("La deficiencia de B12/folato altera la síntesis de ADN durante la maduración, produciendo precursores grandes de aspecto inmaduro (patrón megaloblástico).");
    if (o2 < 75) notes.push("La hipoxia tisular está impulsando un aumento en la síntesis de EPO vía la vía renal de HIF.");
    return { epoLevel, hot, notes };
  }, [o2, renal, iron, b12, folate]);

  return (
    <div>
      <CardLabel>Módulo 03 · Eritropoyesis</CardLabel>
      <h1 className="mt-1 mb-4 text-2xl font-bold">De la Célula Madre al Eritrocito</h1>

      <Card>
        <Stepper
          stages={ERY_STAGES}
          renderStage={(s, i, n) => ({
            visual: <EryCellSvg stage={s} />,
            caption: (
              <>
                <h3 className="font-bold">{i + 1}/{n}. {s.name}</h3>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{s.desc}</p>
                <div className="mx-auto mt-4 max-w-sm space-y-2.5 text-left">
                  <div>
                    <div className="flex justify-between text-xs text-[var(--foreground-faint)]"><span>Tamaño celular relativo</span></div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--background-elevated)]"><div className="h-full rounded-full bg-[var(--accent-blue)]" style={{ width: `${Math.round((s.size / 70) * 100)}%` }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[var(--foreground-faint)]"><span>Condensación nuclear</span><span>{s.nucleus > 0 ? `${Math.round(((70 - s.nucleus) / 70) * 100)}%` : "Enucleado"}</span></div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--background-elevated)]"><div className="h-full rounded-full bg-[var(--accent-indigo)]" style={{ width: `${s.nucleus > 0 ? Math.round(((70 - s.nucleus) / 70) * 100) : 100}%` }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-[var(--foreground-faint)]"><span>Contenido de hemoglobina</span><span>{s.hb}%</span></div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--background-elevated)]"><div className="h-full rounded-full bg-[var(--accent-red)]" style={{ width: `${s.hb}%` }} /></div>
                  </div>
                </div>
              </>
            ),
          })}
        />
      </Card>

      <Card className="mt-5">
        <h3 className="font-bold">Simulador de Retroalimentación de EPO</h3>
        <p className="-mt-1 text-xs text-[var(--foreground-faint)]">Modelo educativo — no es un simulador de dosificación terapéutica.</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="flex justify-between text-xs font-mono text-[var(--foreground-muted)]"><span>OXÍGENO TISULAR</span><span>{o2}%</span></label>
            <input type="range" min={50} max={100} value={o2} onChange={(e) => setO2(+e.target.value)} className="mt-2 w-full accent-[var(--accent-blue)]" />
            <label className="mt-4 flex justify-between text-xs font-mono text-[var(--foreground-muted)]"><span>FUNCIÓN RENAL</span><span>{renal}%</span></label>
            <input type="range" min={10} max={100} value={renal} onChange={(e) => setRenal(+e.target.value)} className="mt-2 w-full accent-[var(--accent-blue)]" />
            <div className="mt-4 flex flex-wrap gap-2">
              <Toggle label="HIERRO" value={iron} onToggle={() => setIron(iron === "normal" ? "low" : "normal")} />
              <Toggle label="VITAMINA B12" value={b12} onToggle={() => setB12(b12 === "normal" ? "low" : "normal")} />
              <Toggle label="FOLATO" value={folate} onToggle={() => setFolate(folate === "normal" ? "low" : "normal")} />
            </div>
          </div>
          <div>
            <Flow nodes={["Riñón", `EPO ≈ ${epoLevel}`, "Estímulo eritroide", "Reticulocitos", "Eritrocitos"]} hotIndex={(i) => (i === 0 ? renal < 60 : hot)} />
            <div className="text-sm text-[var(--foreground-muted)]">
              {notes.length ? notes.map((n, i) => <p key={i}>• {n}</p>) : <p>Estado basal — no se detecta un estímulo significativo.</p>}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
