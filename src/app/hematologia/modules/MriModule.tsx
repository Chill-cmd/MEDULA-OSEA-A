"use client";

import { useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Stepper } from "@/components/hematologia/Stepper";
import { SkeletonSvg, LongBoneSvg, MriScanSvg } from "@/components/hematologia/svg";
import { MARROW_COMPOSITION, MRI_SEQUENCES, AGE_STAGES, REGION_COLOR, SRC_MRI } from "@/lib/hematologia";

type Tab = "comp" | "seq" | "age" | "zoom";
type SeqKey = "T1" | "T2" | "STIR";

function SourceChip() {
  return (
    <Badge className="border-[var(--accent-amber)]/40 text-[var(--accent-amber)]">
      📎 Fuente: {SRC_MRI}
    </Badge>
  );
}

function CompositionTab() {
  const boxes = [MARROW_COMPOSITION.red, MARROW_COMPOSITION.yellow];
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {boxes.map((m) => (
          <Card key={m.name}>
            <h4 className="flex items-center gap-2 font-bold">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: m.color }} />
              {m.name}
            </h4>
            <div className="mt-3 text-xs">
              <div className="flex justify-between text-[var(--foreground-faint)]"><span>Células hematopoyéticas</span><span>{m.cellPct}%</span></div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--background-elevated)]"><div className="h-full rounded-full" style={{ width: `${m.cellPct}%`, background: m.color }} /></div>
              <div className="mt-3 flex justify-between text-[var(--foreground-faint)]"><span>Adipocitos</span><span>{m.fatCellPct}%</span></div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-[var(--background-elevated)]"><div className="h-full rounded-full bg-[var(--foreground-faint)]" style={{ width: `${m.fatCellPct}%` }} /></div>
            </div>
            <table className="mt-4 w-full text-xs">
              <thead><tr className="text-[var(--foreground-faint)]"><th className="text-left font-normal uppercase">Composición química</th><th /></tr></thead>
              <tbody className="text-[var(--foreground-muted)]">
                <tr className="border-t border-[var(--border)]"><td className="py-1.5">Grasa</td><td className="py-1.5 text-right">{m.chem.fat}%</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="py-1.5">Agua</td><td className="py-1.5 text-right">{m.chem.water}%</td></tr>
                <tr className="border-t border-[var(--border)]"><td className="py-1.5">Proteínas</td><td className="py-1.5 text-right">{m.chem.protein}%</td></tr>
              </tbody>
            </table>
            <p className="mt-3 text-sm text-[var(--foreground-muted)]">{m.function}</p>
          </Card>
        ))}
      </div>
      <div className="mt-4"><SourceChip /></div>
    </div>
  );
}

function SequenceTab() {
  const [seq, setSeq] = useState<SeqKey>("T1");
  const [isolate, setIsolate] = useState<"red" | "yellow" | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const S = MRI_SEQUENCES[seq];
  const epiMetaColor = isolate === "yellow" ? "#2c333d" : S.red.gray;
  const diaColor = isolate === "red" ? "#2c333d" : S.yellow.gray;

  if (compareOpen) {
    return (
      <Card>
        <h3 className="text-center font-bold">Comparación de secuencias</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {(["T1", "T2", "STIR"] as SeqKey[]).map((k) => {
            const Sk = MRI_SEQUENCES[k];
            return (
              <Card key={k}>
                <h4 className="font-bold">{Sk.label}</h4>
                <div className="mx-auto mt-2 max-w-[180px]">
                  <MriScanSvg epi={Sk.red.gray} meta={Sk.red.gray} dia={Sk.yellow.gray} seqLabel={k} seed={3} />
                </div>
                <p className="mt-2 text-xs text-[var(--foreground-muted)]">Amarilla: {Sk.yellow.desc}</p>
                <p className="mt-2 text-xs text-[var(--foreground-muted)]">Roja: {Sk.red.desc}</p>
              </Card>
            );
          })}
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="secondary" size="sm" onClick={() => setCompareOpen(false)}>← Volver a vista única</Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MRI_SEQUENCES) as SeqKey[]).map((k) => (
          <button
            key={k}
            onClick={() => setSeq(k)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              k === seq ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-[#04121a]" : "border-[var(--border)] text-[var(--foreground-muted)]"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <div className="mx-auto max-w-[260px]"><MriScanSvg epi={epiMetaColor} meta={epiMetaColor} dia={diaColor} seqLabel={seq} planeLabel="COR FÉMUR" seed={5} /></div>
        <div>
          <h3 className="font-bold">{S.label}</h3>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]"><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm align-middle" style={{ background: "var(--accent-amber)" }} /><b className="text-[var(--foreground)]">Zona de médula amarilla (diáfisis):</b> {S.yellow.desc}</p>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]"><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm align-middle" style={{ background: "var(--accent-red)" }} /><b className="text-[var(--foreground)]">Zona de médula roja (metáfisis/epífisis):</b> {S.red.desc}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" onClick={() => setWhyOpen((v) => !v)}>¿Por qué?</Button>
            <Button variant="secondary" size="sm" onClick={() => setCompareOpen(true)}>Comparar todo</Button>
            <Button variant="secondary" size="sm" onClick={() => setIsolate(isolate === "red" ? null : "red")}>Mostrar médula roja</Button>
            <Button variant="secondary" size="sm" onClick={() => setIsolate(isolate === "yellow" ? null : "yellow")}>Mostrar médula amarilla</Button>
          </div>
          {whyOpen && <p className="mt-3 rounded-xl border border-dashed border-[var(--border)] bg-[var(--background-elevated)] p-3.5 text-sm text-[var(--foreground-muted)]">{S.why}</p>}
        </div>
      </div>
      <p className="mt-4 text-xs text-[var(--foreground-faint)]">Esquema de señal simulado, no es la imagen de un paciente real.</p>
      <div className="mt-2"><SourceChip /></div>
    </Card>
  );
}

function AgeTab() {
  const [ageIdx, setAgeIdx] = useState(5);
  const st = AGE_STAGES[ageIdx];
  const labels: Record<string, string> = { red: "Médula roja", redyellow: "En conversión", yellow: "Médula amarilla", cartilage: "Cartílago (no osificado)" };
  return (
    <Card>
      <label className="flex justify-between text-xs font-mono text-[var(--foreground-muted)]"><span>EDAD</span><span>{st.label}</span></label>
      <input type="range" min={0} max={AGE_STAGES.length - 1} step={1} value={ageIdx} onChange={(e) => setAgeIdx(+e.target.value)} className="mt-2 w-full accent-[var(--accent-blue)]" />
      <div className="mt-1 flex justify-between text-[10px] text-[var(--foreground-faint)]">{AGE_STAGES.map((s) => <span key={s.id}>{s.label}</span>)}</div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="flex justify-center"><SkeletonSvg regions={st.regions} /></div>
        <div>
          <div className="mx-auto mb-4 max-w-[160px]"><LongBoneSvg epi={REGION_COLOR[st.regions.femProxL]} meta={REGION_COLOR[st.regions.femProxL]} dia={REGION_COLOR[st.regions.femDiaL]} /></div>
          <p className="text-sm text-[var(--foreground-muted)]">{st.text}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["red", "redyellow", "yellow", "cartilage"] as const).map((k) => (
              <Badge key={k}><span className="mr-1 inline-block h-2 w-2 rounded-full" style={{ background: REGION_COLOR[k] }} />{labels[k]}</Badge>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-xs text-[var(--foreground-faint)]">
        La conversión medular es más rápida en niñas que en niños; hay variación individual entre estudios, por lo que la interpretación siempre se hace caso por caso. Esquema didáctico simplificado basado en Londoño et al., 2015.
      </p>
      <div className="mt-2"><SourceChip /></div>
    </Card>
  );
}

const ZOOM_STAGES = [
  { name: "Corte de RM", size: 70, color: "#3a3a3a", desc: "Una imagen potenciada en T1 de la región del cuerpo vertebral que seleccionaste.", mri: true },
  { name: "Hueso cortical", size: 100, color: "#cbb98a", desc: "La capa externa densa del hueso.", mri: false },
  { name: "Hueso esponjoso (trabecular)", size: 130, color: "#b79e6b", desc: "Hueso interno poroso que brinda soporte estructural.", mri: false },
  { name: "Trabéculas", size: 160, color: "#a98c55", desc: "Puentes óseos que dan andamiaje al espacio medular.", mri: false },
  { name: "Médula ósea roja", size: 190, color: "#e0505a", desc: "El tejido hematopoyético que llena el espacio entre las trabéculas.", mri: false },
  { name: "Nicho hematopoyético", size: 210, color: "#c94550", desc: "Un microambiente de células del estroma y del endotelio que sostiene a las células madre.", mri: false },
  { name: "Célula madre hematopoyética", size: 60, color: "#35c7ff", desc: "El origen pluripotente de todos los linajes sanguíneos. Aquí termina el módulo radiológico; a continuación comienza la fisiología celular.", mri: false },
];

function ZoomTab({ onContinue }: { onContinue: () => void }) {
  const [isFinal, setIsFinal] = useState(false);
  return (
    <Card>
      <h3 className="text-center font-bold">Zoom a la médula activa</h3>
      <div className="mt-4">
        <Stepper
          stages={ZOOM_STAGES}
          interval={2200}
          onFinalStage={setIsFinal}
          renderStage={(s, i) => ({
            visual: s.mri
              ? <div style={{ width: 220 }}><MriScanSvg epi="#5c5c5c" meta="#5c5c5c" dia="#f2f2f2" seqLabel="T1" planeLabel="SAG COLUMNA" seed={9} /></div>
              : <div style={{ width: s.size, height: s.size, borderRadius: "50%", background: s.color, boxShadow: `0 0 30px ${s.color}55` }} />,
            caption: <><h3 className="font-bold">{i + 1}. {s.name}</h3><p className="mt-1 text-sm text-[var(--foreground-muted)]">{s.desc}</p></>,
          })}
        />
      </div>
      {isFinal && (
        <div className="mt-4 flex justify-center">
          <Button variant="primary" onClick={onContinue}>Continuar a Hematopoyesis →</Button>
        </div>
      )}
    </Card>
  );
}

export function MriModule({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [tab, setTab] = useState<Tab>("comp");
  const tabs: { id: Tab; label: string }[] = [
    { id: "comp", label: "Composición" },
    { id: "seq", label: "T1 / T2 / STIR" },
    { id: "age", label: "Conversión por edad" },
    { id: "zoom", label: "Zoom a la médula" },
  ];
  return (
    <div>
      <CardLabel>Módulo 01 · Radiología</CardLabel>
      <h1 className="mt-1 mb-4 text-2xl font-bold">Resonancia de Médula Ósea</h1>
      <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-l-4 border-[var(--border)] border-l-[var(--warning)] bg-[var(--background-card)] p-3.5 text-sm text-[var(--foreground-muted)]">
        <span>⚠️</span>
        <p className="m-0"><b className="text-[var(--warning)]">Simulación educativa:</b> la RM muestra la composición y distribución de la médula ósea, no células hematopoyéticas individuales (nunca se ven en una RM BFU-E, CFU-E, eritroblastos, reticulocitos ni leucocitos individuales).</p>
      </div>
      <div className="mb-6 flex flex-wrap gap-1 border-b border-[var(--border)]">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`border-b-2 px-3.5 py-2.5 text-sm font-semibold transition-colors ${
              tab === t.id ? "border-[var(--accent-blue)] text-[var(--foreground)]" : "border-transparent text-[var(--foreground-muted)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === "comp" && <CompositionTab />}
      {tab === "seq" && <SequenceTab />}
      {tab === "age" && <AgeTab />}
      {tab === "zoom" && <ZoomTab onContinue={() => onNavigate("hemato")} />}
    </div>
  );
}
