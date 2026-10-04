"use client";

import { useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/hematologia/Stepper";
import { MONO_STAGES, MONO_CHIP_INFO } from "@/lib/hematologia";

const CHIP_LABELS = Object.keys(MONO_CHIP_INFO);

export function MonocitosModule() {
  const [phagoOn, setPhagoOn] = useState(false);
  const [phagoDone, setPhagoDone] = useState(false);
  const [chipInfo, setChipInfo] = useState<string | null>(null);

  function runPhago() {
    setPhagoOn(true);
    setPhagoDone(false);
    setTimeout(() => setPhagoDone(true), 950);
  }
  function resetPhago() {
    setPhagoOn(false);
    setPhagoDone(false);
  }

  return (
    <div>
      <CardLabel>Módulo 06 · Monocitos</CardLabel>
      <h1 className="mt-1 mb-4 text-2xl font-bold">Sangre → Tejido → Macrófago</h1>

      <Card>
        <Stepper
          stages={MONO_STAGES}
          renderStage={(s, i) => ({
            visual: (
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {MONO_STAGES.map((st, si) => (
                  <span key={st.id} className="flex items-center gap-1.5">
                    <span className="rounded-lg border px-3 py-2 text-center text-xs font-semibold" style={si === i ? { borderColor: "var(--accent-blue)", boxShadow: "0 0 14px rgba(45,212,255,.25)" } : { borderColor: "var(--border)" }}>{st.name}</span>
                    {si < MONO_STAGES.length - 1 && <span className="text-[var(--foreground-faint)]">→</span>}
                  </span>
                ))}
              </div>
            ),
            caption: <><h3 className="font-bold">{i + 1}. {s.name}</h3><p className="mt-1 text-sm text-[var(--foreground-muted)]">{s.desc}</p></>,
          })}
        />
      </Card>

      <Card className="mt-5">
        <h3 className="text-center font-bold">Fagocitosis</h3>
        <div className="relative mx-auto mt-3 flex h-[220px] w-[220px] items-center justify-center">
          <svg viewBox="0 0 200 200" width={220} height={220}>
            <path d="M50 60 C30 90 40 150 90 160 C140 170 170 130 150 90 C135 60 90 40 50 60 Z" fill="var(--accent-orange)" opacity={0.9} />
          </svg>
          <div
            className="absolute h-[18px] w-[18px] rounded-full bg-[var(--accent-red)] transition-all duration-1000"
            style={{ left: phagoOn ? 96 : 16, top: phagoOn ? 96 : 20, opacity: phagoDone ? 0 : 1 }}
          />
          <div
            className="absolute h-4 w-4 rounded-full bg-[#12181f] transition-opacity duration-500"
            style={{ left: 96, top: 96, opacity: phagoDone ? 1 : 0 }}
          />
        </div>
        <div className="mt-3 flex justify-center gap-2">
          <Button variant="primary" size="sm" onClick={runPhago}>Simular fagocitosis</Button>
          <Button variant="ghost" size="sm" onClick={resetPhago}>Reiniciar</Button>
        </div>
        <p className="mt-2 min-h-[20px] text-center text-sm text-[var(--foreground-muted)]">
          {phagoDone ? "La partícula es englobada en un fagosoma, que se fusiona con un lisosoma (fagolisosoma) para su degradación." : ""}
        </p>
      </Card>

      <Card className="mt-5">
        <h3 className="font-bold">Funciones del Macrófago</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {CHIP_LABELS.map((label) => (
            <button
              key={label}
              onClick={() => setChipInfo(MONO_CHIP_INFO[label])}
              className="rounded-full border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-2 text-sm font-semibold text-[var(--foreground-muted)] hover:border-[var(--accent-blue)]"
            >
              {label}
            </button>
          ))}
        </div>
        {chipInfo && <p className="mt-3 text-sm text-[var(--foreground-muted)]">{chipInfo}</p>}
      </Card>
    </div>
  );
}
