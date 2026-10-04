"use client";

import { useMemo, useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/hematologia/Stepper";

type Tab = "structure" | "oxygen" | "co2" | "lifespan";

function o2sat(po2: number, p50: number) {
  const n = 2.7;
  return (100 * Math.pow(po2, n)) / (Math.pow(p50, n) + Math.pow(po2, n));
}

function O2Curve({ po2Marker, p50, baseP50 }: { po2Marker: number; p50: number; baseP50: number }) {
  const x0 = 36, x1 = 286, y0 = 176, y1 = 18;
  const toX = (po2: number) => x0 + (po2 / 100) * (x1 - x0);
  const toY = (sat: number) => y0 + (sat / 100) * (y1 - y0);
  const path = useMemo(() => {
    let p = "";
    for (let po2 = 0; po2 <= 100; po2 += 2) {
      const sat = o2sat(po2, p50);
      p += (po2 === 0 ? "M" : "L") + toX(po2).toFixed(1) + " " + toY(sat).toFixed(1) + " ";
    }
    return p;
  }, [p50]);
  const basePath = useMemo(() => {
    let p = "";
    for (let po2 = 0; po2 <= 100; po2 += 4) {
      const sat = o2sat(po2, baseP50);
      p += (po2 === 0 ? "M" : "L") + toX(po2).toFixed(1) + " " + toY(sat).toFixed(1) + " ";
    }
    return p;
  }, [baseP50]);
  const markerSat = o2sat(po2Marker, p50);
  return (
    <svg viewBox="0 0 300 210" style={{ width: "100%", maxWidth: 320 }}>
      <line x1={x0} y1={y0} x2={x1} y2={y0} stroke="var(--border)" strokeWidth={1} />
      <line x1={x0} y1={y0} x2={x0} y2={y1} stroke="var(--border)" strokeWidth={1} />
      <text x={(x0 + x1) / 2} y={204} fill="var(--foreground-faint)" fontSize={10} fontFamily="var(--font-mono)" textAnchor="middle">PO2 (mmHg)</text>
      <text x={14} y={(y0 + y1) / 2} fill="var(--foreground-faint)" fontSize={10} fontFamily="var(--font-mono)" textAnchor="middle" transform={`rotate(-90 14 ${(y0 + y1) / 2})`}>SaO2 (%)</text>
      <path d={basePath} fill="none" stroke="var(--foreground-faint)" strokeWidth={1.5} strokeDasharray="4 3" />
      <path d={path} fill="none" stroke="var(--accent-blue)" strokeWidth={2.5} />
      <line x1={toX(po2Marker)} y1={y0} x2={toX(po2Marker)} y2={toY(markerSat)} stroke="var(--accent-red)" strokeWidth={1} strokeDasharray="3 3" />
      <circle cx={toX(po2Marker)} cy={toY(markerSat)} r={5} fill="var(--accent-red)" stroke="#04121a" strokeWidth={1.5} />
    </svg>
  );
}

function StructureTab() {
  const [squeezed, setSqueezed] = useState(false);
  return (
    <Card>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="text-center">
          <svg viewBox="0 0 200 140" width={200} height={140} style={{ maxWidth: 280, width: "100%", height: "auto", margin: "0 auto", display: "block" }}>
            <g style={{ transformBox: "fill-box", transformOrigin: "center", transition: "transform .8s ease", transform: squeezed ? "scaleX(1.5) scaleY(0.55)" : "none" }}>
              <ellipse cx={100} cy={70} rx={85} ry={42} fill="#c9414c" stroke="#0a0d12" strokeWidth={2} />
              <ellipse cx={100} cy={70} rx={55} ry={20} fill="#e0505a" opacity={0.65} />
            </g>
          </svg>
          <div className="mt-3 flex justify-center">
            <Button variant="secondary" size="sm" onClick={() => { setSqueezed(true); setTimeout(() => setSqueezed(false), 1400); }}>
              Simular paso capilar
            </Button>
          </div>
        </div>
        <ul className="list-disc space-y-3 pl-5 text-sm text-[var(--foreground-muted)]">
          <li><b className="text-[var(--foreground)]">Disco bicóncavo</b> — aumenta la superficie disponible para el intercambio de gases.</li>
          <li><b className="text-[var(--foreground)]">Sin núcleo ni organelos</b> — maximiza el espacio interno para la hemoglobina.</li>
          <li><b className="text-[var(--foreground)]">Citoesqueleto de espectrina</b> — le da a la membrana flexible su deformabilidad.</li>
          <li><b className="text-[var(--foreground)]">Deformabilidad</b> — permite que la célula de ~7-8μm se deslice por capilares más estrechos.</li>
        </ul>
      </div>
    </Card>
  );
}

function OxygenTab() {
  const [po2, setPo2] = useState(40);
  const [ph, setPh] = useState(740);
  const [co2, setCo2] = useState(40);
  const p50 = 26.8 + (7.4 - ph / 100) * 30 + (co2 - 40) * 0.15;
  const sat = o2sat(po2, p50);
  const shift = p50 > 27.5 ? "A LA DERECHA (↓ afinidad por O2 — efecto Bohr)" : p50 < 26 ? "A LA IZQUIERDA (↑ afinidad por O2)" : "cerca del valor basal";
  return (
    <>
      <Card>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <O2Curve po2Marker={po2} p50={p50} baseP50={26.8} />
            <p className="mt-2 font-mono text-xs text-[var(--foreground-muted)]">
              P50 ≈ {p50.toFixed(1)} mmHg · curva desplazada {shift}<br />
              Con PO2 {po2} mmHg → SaO2 ≈ {sat.toFixed(0)}%
            </p>
          </div>
          <div>
            <label className="flex justify-between text-xs font-mono text-[var(--foreground-muted)]"><span>PO2 (mmHg)</span><span>{po2}</span></label>
            <input type="range" min={10} max={100} value={po2} onChange={(e) => setPo2(+e.target.value)} className="mt-2 w-full accent-[var(--accent-blue)]" />
            <label className="mt-4 flex justify-between text-xs font-mono text-[var(--foreground-muted)]"><span>pH</span><span>{(ph / 100).toFixed(2)}</span></label>
            <input type="range" min={710} max={760} value={ph} onChange={(e) => setPh(+e.target.value)} className="mt-2 w-full accent-[var(--accent-blue)]" />
            <label className="mt-4 flex justify-between text-xs font-mono text-[var(--foreground-muted)]"><span>PCO2 (mmHg)</span><span>{co2}</span></label>
            <input type="range" min={20} max={80} value={co2} onChange={(e) => setCo2(+e.target.value)} className="mt-2 w-full accent-[var(--accent-blue)]" />
            <p className="mt-4 text-xs text-[var(--foreground-faint)]">Curva punteada = basal (pH 7.40, PCO2 40). Curva sólida = condiciones actuales. Esquema simplificado con fines didácticos, no es una medición de un paciente real.</p>
          </div>
        </div>
      </Card>
      <Card className="mt-5">
        <h3 className="text-center font-bold">Pulmón → Hemoglobina + O2 → Tejido</h3>
        <div className="flex flex-wrap items-center justify-center gap-1.5 py-4">
          {["Alvéolo (PO2 alta)", "Hb + O2 ↔ HbO2", "Tejido (PO2 baja, se libera O2)"].map((n, i, arr) => (
            <span key={n} className="flex items-center gap-1.5">
              <span className="rounded-lg border border-[var(--border)] px-3 py-2 text-center text-xs font-semibold">{n}</span>
              {i < arr.length - 1 && <span className="text-[var(--foreground-faint)]">→</span>}
            </span>
          ))}
        </div>
      </Card>
    </>
  );
}

const CO2_STAGES = [
  { name: "Producción tisular de CO2", desc: "El tejido en metabolismo produce CO2 como subproducto de la respiración." },
  { name: "El CO2 entra al eritrocito", desc: "El CO2 difunde desde el plasma hacia el eritrocito." },
  { name: "Anhidrasa carbónica", desc: "La anhidrasa carbónica, abundante dentro del eritrocito, cataliza rápidamente CO2 + H2O → H2CO3." },
  { name: "Disociación", desc: "El ácido carbónico se disocia en H+ y HCO3⁻. La hemoglobina amortigua la mayor parte del H+." },
  { name: "Intercambio de cloruro", desc: "El HCO3⁻ sale hacia el plasma a través del intercambiador banda 3, a cambio de Cl⁻ que entra a la célula para preservar la electroneutralidad." },
];

function CO2Tab() {
  return (
    <Card>
      <Stepper
        stages={CO2_STAGES}
        interval={2600}
        renderStage={(s, i) => ({
          visual: (
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {CO2_STAGES.map((st, si) => (
                <span key={st.name} className="flex items-center gap-1.5">
                  <span className="rounded-lg border px-3 py-2 text-center text-xs font-semibold" style={si === i ? { borderColor: "var(--accent-blue)", boxShadow: "0 0 14px rgba(45,212,255,.25)" } : { borderColor: "var(--border)" }}>{st.name}</span>
                  {si < CO2_STAGES.length - 1 && <span className="text-[var(--foreground-faint)]">→</span>}
                </span>
              ))}
            </div>
          ),
          caption: <><h3 className="font-bold">{i + 1}. {s.name}</h3><p className="mt-1 text-sm text-[var(--foreground-muted)]">{s.desc}</p></>,
        })}
      />
    </Card>
  );
}

function LifespanTab() {
  const [day, setDay] = useState(0);
  const t = day / 120;
  const r = Math.round(0xe0 - (0xe0 - 0x8a) * t), g = Math.round(0x50 - (0x50 - 0x4a) * t), b = Math.round(0x5a - (0x5a - 0x4a) * t);
  const col = `rgb(${r},${g},${b})`;
  return (
    <Card>
      <label className="flex justify-between text-xs font-mono text-[var(--foreground-muted)]"><span>DÍAS EN CIRCULACIÓN</span><span>{day}</span></label>
      <input type="range" min={0} max={120} value={day} onChange={(e) => setDay(+e.target.value)} className="mt-2 w-full accent-[var(--accent-blue)]" />
      <div className="mt-6 flex justify-center">
        {day < 120 ? (
          <svg viewBox="0 0 180 180" width={180} height={180}><ellipse cx={90} cy={90} rx={34} ry={20} fill={col} stroke="#0a0d12" strokeWidth={2} /></svg>
        ) : (
          <svg viewBox="0 0 180 180" width={180} height={180}>
            <ellipse cx={90} cy={90} rx={46} ry={34} fill="var(--accent-orange)" opacity={0.9} />
            <ellipse cx={72} cy={90} rx={13} ry={13} fill="#8a4a4a" />
          </svg>
        )}
      </div>
      <div className="mx-auto mt-3 max-w-md text-center text-sm text-[var(--foreground-muted)]">
        {day < 120
          ? day < 100
            ? <p>Un eritrocito maduro circulando con normalidad, transportando O2 y CO2.</p>
            : <p>Acercándose a la senescencia: la deformabilidad de la membrana disminuye con la edad.</p>
          : <p><b className="text-[var(--foreground)]">Día ≈120:</b> el eritrocito senescente es reconocido y fagocitado por macrófagos del bazo y el hígado. La hemoglobina se degrada: el <b className="text-[var(--foreground)]">hierro</b> se recicla hacia la médula (vía transferrina) para apoyar la nueva eritropoyesis, la globina se reduce a aminoácidos, y el hemo se convierte en bilirrubina.</p>}
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <Button variant="secondary" size="sm" onClick={() => setDay(120)}>Ir al día 120</Button>
        <Button variant="ghost" size="sm" onClick={() => setDay(0)}>Reiniciar</Button>
      </div>
    </Card>
  );
}

export function RbcModule() {
  const [tab, setTab] = useState<Tab>("structure");
  const tabs: { id: Tab; label: string }[] = [
    { id: "structure", label: "Estructura" },
    { id: "oxygen", label: "Oxígeno" },
    { id: "co2", label: "CO2 / equilibrio ácido-base" },
    { id: "lifespan", label: "Vida media" },
  ];
  return (
    <div>
      <CardLabel>Módulo 04 · Fisiología del Eritrocito</CardLabel>
      <h1 className="mt-1 mb-4 text-2xl font-bold">Estructura, Transporte de Gases y Vida Media</h1>
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
      {tab === "structure" && <StructureTab />}
      {tab === "oxygen" && <OxygenTab />}
      {tab === "co2" && <CO2Tab />}
      {tab === "lifespan" && <LifespanTab />}
    </div>
  );
}
