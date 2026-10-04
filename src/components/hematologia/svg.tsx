import type { AgeStageRegions, EryStage, WbcType } from "@/lib/hematologia";
import { REGION_COLOR } from "@/lib/hematologia";

export function SkeletonSvg({ regions, width = 160 }: { regions: AgeStageRegions; width?: number }) {
  const fill = (k: keyof AgeStageRegions) => REGION_COLOR[regions[k]] || "var(--background-elevated)";
  return (
    <svg viewBox="0 0 240 420" width={width} height={width * 1.75} xmlns="http://www.w3.org/2000/svg">
      <g stroke="#0a0d12" strokeWidth={2}>
        <ellipse cx={120} cy={28} rx={24} ry={27} fill={fill("skull")} />
        <rect x={92} y={70} width={56} height={72} rx={14} fill={fill("chest")} />
        <rect x={112} y={66} width={16} height={150} rx={7} fill={fill("spine")} />
        <rect x={88} y={216} width={64} height={38} rx={12} fill={fill("pelvis")} />
        <rect x={52} y={88} width={17} height={32} rx={6} fill={fill("humProxL")} />
        <rect x={171} y={88} width={17} height={32} rx={6} fill={fill("humProxR")} />
        <rect x={53} y={120} width={14} height={58} rx={6} fill={fill("humDiaL")} />
        <rect x={173} y={120} width={14} height={58} rx={6} fill={fill("humDiaR")} />
        <circle cx={60} cy={192} r={11} fill={fill("handL")} />
        <circle cx={180} cy={192} r={11} fill={fill("handR")} />
        <rect x={94} y={256} width={20} height={36} rx={7} fill={fill("femProxL")} />
        <rect x={126} y={256} width={20} height={36} rx={7} fill={fill("femProxR")} />
        <rect x={96} y={292} width={16} height={86} rx={7} fill={fill("femDiaL")} />
        <rect x={128} y={292} width={16} height={86} rx={7} fill={fill("femDiaR")} />
        <ellipse cx={104} cy={390} rx={15} ry={9} fill={fill("footL")} />
        <ellipse cx={136} cy={390} rx={15} ry={9} fill={fill("footR")} />
      </g>
    </svg>
  );
}

export function LongBoneSvg({ epi, meta, dia }: { epi: string; meta: string; dia: string }) {
  return (
    <svg viewBox="0 0 160 320" width={160} height={320} style={{ width: "100%", height: "auto", display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <g stroke="#0a0d12" strokeWidth={2}>
        <ellipse cx={80} cy={26} rx={34} ry={22} fill={epi} />
        <path d="M50 42 L110 42 L96 78 L64 78 Z" fill={meta} />
        <rect x={60} y={78} width={40} height={160} fill={dia} />
        <path d="M64 238 L96 238 L110 274 L50 274 Z" fill={meta} />
        <ellipse cx={80} cy={292} rx={34} ry={22} fill={epi} />
      </g>
    </svg>
  );
}

let grainSeq = 0;

export function MriScanSvg({
  epi, meta, dia, seqLabel = "T1", planeLabel = "COR", seed,
}: { epi: string; meta: string; dia: string; seqLabel?: string; planeLabel?: string; seed?: number }) {
  grainSeq++;
  const fid = `mriGrain${grainSeq}`;
  return (
    <svg viewBox="0 0 280 340" width={280} height={340} style={{ width: "100%", height: "auto", display: "block", background: "#000", borderRadius: 6 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={fid}>
          <feTurbulence type="fractalNoise" baseFrequency={0.85} numOctaves={2} seed={seed || 7} stitchTiles="stitch" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.5 0.5 0.5 0 0" result="g" />
          <feComponentTransfer in="g"><feFuncA type="linear" slope={0.16} intercept={0} /></feComponentTransfer>
        </filter>
        <radialGradient id={`${fid}v`} cx="50%" cy="46%" r="65%">
          <stop offset="60%" stopColor="#000" stopOpacity={0} />
          <stop offset="100%" stopColor="#000" stopOpacity={0.75} />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={280} height={340} fill="#050505" />
      <g stroke="#000" strokeWidth={1.5} strokeLinejoin="round">
        <ellipse cx={140} cy={46} rx={40} ry={26} fill={epi} />
        <path d="M104 66 Q95 84 100 96 L180 96 Q185 84 176 66 Z" fill={meta} />
        <rect x={100} y={96} width={80} height={150} fill={dia} />
        <path d="M100 246 Q95 258 104 276 L176 276 Q185 258 180 246 Z" fill={meta} />
        <ellipse cx={140} cy={298} rx={40} ry={26} fill={epi} />
      </g>
      <rect x={0} y={0} width={280} height={340} fill={`url(#${fid})`} />
      <rect x={0} y={0} width={280} height={340} fill={`url(#${fid}v)`} />
      <g fontFamily="var(--font-mono)" fill="#8fe6a8" fontSize={11}>
        <text x={10} y={18}>{seqLabel}</text>
        <text x={10} y={332}>{planeLabel}</text>
        <text x={270} y={18} textAnchor="end">TR 550</text>
        <text x={270} y={32} textAnchor="end">TE 11</text>
        <text x={270} y={332} textAnchor="end">SIMULADO</text>
      </g>
      <text x={14} y={170} fill="#8fe6a8" fontFamily="var(--font-mono)" fontSize={13}>L</text>
      <line x1={20} y1={300} x2={20} y2={320} stroke="#8fe6a8" strokeWidth={1} />
      <line x1={16} y1={300} x2={24} y2={300} stroke="#8fe6a8" strokeWidth={1} />
      <line x1={16} y1={320} x2={24} y2={320} stroke="#8fe6a8" strokeWidth={1} />
    </svg>
  );
}

export function EryCellSvg({ stage }: { stage: EryStage }) {
  const d = stage.size, nd = stage.nucleus, cyto = stage.cyto;
  const cx = 90, cy = 90;
  let nucFill = "#2a3341";
  if (stage.chroma === "fine") nucFill = "#3b4a63";
  if (stage.chroma === "coarser") nucFill = "#2f3d54";
  if (stage.chroma === "clumped") nucFill = "#242f42";
  if (stage.chroma === "pyknotic") nucFill = "#12181f";
  const dip = nd > 0 ? Math.max(6, d * 0.18) : d * 0.28;
  return (
    <svg viewBox="0 0 180 180" width={200} height={200}>
      <ellipse cx={cx} cy={cy} rx={d} ry={d} fill={cyto} stroke="#0a0d12" strokeWidth={2} />
      {nd === 0 && stage.id === "mature" && <ellipse cx={cx} cy={cy} rx={dip} ry={dip} fill={cyto} opacity={0.55} />}
      {nd > 0 && <circle cx={cx} cy={cy} r={nd} fill={nucFill} stroke="#0a0d12" strokeWidth={2} />}
      {nd === 0 && stage.id === "retic" && (
        <g opacity={0.5}>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            const x1 = cx + Math.cos(a) * 6, y1 = cy + Math.sin(a) * 6;
            const x2 = cx + Math.cos(a) * (d * 0.5), y2 = cy + Math.sin(a) * (d * 0.5);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0a0d12" strokeWidth={1} />;
          })}
        </g>
      )}
    </svg>
  );
}

export function WbcCellSvg({ type }: { type: WbcType }) {
  const cx = 60, cy = 60, r = 52;
  let inner: React.ReactNode = null;
  if (type.id === "neu") {
    inner = [[45, 45], [75, 45], [45, 75], [75, 75]].map((p, i) => (
      <circle key={i} cx={p[0]} cy={p[1]} r={12} fill="#e7ecf2" />
    ));
  } else if (type.id === "eos") {
    inner = (
      <>
        <circle cx={48} cy={52} r={14} fill="#e7ecf2" />
        <circle cx={74} cy={68} r={14} fill="#e7ecf2" />
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * 6.28, rad = 22 + ((i % 3) * 8);
          return <circle key={i} cx={cx + Math.cos(a) * rad} cy={cy + Math.sin(a) * rad} r={3} fill={type.color} />;
        })}
      </>
    );
  } else if (type.id === "bas") {
    inner = (
      <>
        {Array.from({ length: 26 }).map((_, i) => {
          const a = (i / 26) * 6.28 * 3, rad = i % 40;
          return <circle key={i} cx={cx + Math.cos(a) * rad} cy={cy + Math.sin(a) * rad} r={4} fill={type.color} />;
        })}
      </>
    );
  } else if (type.id === "lym") {
    inner = <circle cx={60} cy={60} r={38} fill="#2a3341" />;
  } else if (type.id === "mon") {
    inner = <path d="M40 40 C30 55 35 80 55 82 C75 84 82 65 72 50 C64 40 48 32 40 40 Z" fill="#2a3341" />;
  }
  return (
    <svg viewBox="0 0 120 120" width={150} height={150}>
      <circle cx={cx} cy={cy} r={r} fill="#39424f" stroke="#0a0d12" strokeWidth={2} />
      {inner}
    </svg>
  );
}
