"use client";

import { useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/hematologia/Stepper";
import { WbcCellSvg } from "@/components/hematologia/svg";
import { WBC_TYPES, EXTRAV_STAGES } from "@/lib/hematologia";

type Sub = "cells" | "extrav";

function CellsTab() {
  const [active, setActive] = useState(WBC_TYPES[0].id);
  const w = WBC_TYPES.find((x) => x.id === active)!;
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {WBC_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            style={t.id === active ? { background: t.color, borderColor: t.color, color: "#04121a" } : { borderColor: "var(--border)" }}
            className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-[var(--foreground-muted)]"
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.color }} />
            {t.name}
          </button>
        ))}
      </div>
      <Card className="mt-4">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex justify-center"><WbcCellSvg type={w} /></div>
          <div>
            <h3 className="font-bold" style={{ color: w.color }}>{w.name}</h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]"><b className="text-[var(--foreground)]">Morfología:</b> {w.morphology}</p>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]"><b className="text-[var(--foreground)]">Función:</b> {w.func}</p>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]"><b className="text-[var(--foreground)]">Rol fisiológico:</b> {w.role}</p>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]"><b className="text-[var(--foreground)]">Destino:</b> {w.fate}</p>
            <p className="mt-2 text-sm text-[var(--warning)]"><b>Correlación clínica:</b> {w.clinical}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ExtravTab() {
  const [idx, setIdx] = useState(0);
  const xs = [20, 90, 160, 230, 280, 320], ys = [20, 15, 15, 10, 55, 55];
  const [whyOpen, setWhyOpen] = useState(false);
  return (
    <Card>
      <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-gradient-to-b from-[#0c1620] to-[#0a0f16] px-5 py-7">
        <div className="relative my-5 h-[120px] border-y-2 border-dotted border-[var(--border)]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="absolute bottom-0 h-4 w-[34px] rounded-t-sm border border-[var(--border)] bg-[var(--background-elevated)]" style={{ left: i * 46 + 10 }} />
          ))}
          <div
            className="absolute flex h-6.5 w-6.5 items-center justify-center rounded-full text-[11px] text-white transition-all duration-700"
            style={{ left: xs[idx], top: ys[idx], width: 26, height: 26, background: "var(--accent-blue)", boxShadow: "0 0 14px rgba(45,212,255,.5)", transform: idx >= 4 ? "scale(0.85)" : "scale(1)" }}
          >
            GB
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Stepper
          stages={EXTRAV_STAGES}
          onIndexChange={setIdx}
          renderStage={(s, i) => ({
            visual: <></>,
            caption: (
              <>
                <h3 className="font-bold">{i + 1}. {s.name}{s.tag && <span className="ml-2 inline-block rounded-full border border-[var(--border)] bg-[var(--background-elevated)] px-2.5 py-0.5 font-mono text-[10px] uppercase text-[var(--foreground-muted)]">{s.tag}</span>}</h3>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{s.desc}</p>
              </>
            ),
          })}
        />
      </div>
      <div className="mt-3 flex justify-center">
        <Button variant="secondary" size="sm" onClick={() => setWhyOpen((v) => !v)}>¿Por qué?</Button>
      </div>
      {whyOpen && (
        <p className="mt-3 rounded-xl border border-dashed border-[var(--border)] bg-[var(--background-elevated)] p-3.5 text-sm text-[var(--foreground-muted)]">
          ¿Por qué un leucocito debe adherirse firmemente antes de atravesar el endotelio? El flujo sanguíneo genera un estrés de cizallamiento continuo. Una unión débil, mediada por selectinas, sería arrastrada antes de que la célula pudiera deslizarse entre las uniones endoteliales — la adhesión firme mediada por integrinas la ancla el tiempo suficiente para que ocurra la diapédesis.
        </p>
      )}
    </Card>
  );
}

export function WbcModule() {
  const [sub, setSub] = useState<Sub>("cells");
  return (
    <div>
      <CardLabel>Módulo 05 · Leucocitos</CardLabel>
      <h1 className="mt-1 mb-4 text-2xl font-bold">Cinco Tipos Celulares y Extravasación</h1>
      <div className="mb-6 flex flex-wrap gap-1 border-b border-[var(--border)]">
        {([{ id: "cells", label: "Tipos celulares" }, { id: "extrav", label: "Simulador de extravasación" }] as { id: Sub; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setSub(t.id)}
            className={`border-b-2 px-3.5 py-2.5 text-sm font-semibold transition-colors ${
              sub === t.id ? "border-[var(--accent-blue)] text-[var(--foreground)]" : "border-transparent text-[var(--foreground-muted)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {sub === "cells" ? <CellsTab /> : <ExtravTab />}
    </div>
  );
}
