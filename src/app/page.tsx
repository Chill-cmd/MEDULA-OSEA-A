import Link from "next/link";
import { Brain, Swords, FlaskConical, Map, FileQuestion, Stethoscope, ArrowRight, Dna } from "lucide-react";
import { MoleculeNetwork } from "@/components/home/MoleculeNetwork";
import { Card, CardLabel } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { KPIS, PROJECT_META } from "@/lib/content";

const MODULES = [
  { href: "/immunology", icon: Brain, title: "Laboratorio de Inmunología", desc: "Antígeno → memoria inmunológica, más CPA y MHC.", difficulty: "🟢 BASE" },
  { href: "/hematologia", icon: Dna, title: "Hematología y Médula Ósea", desc: "RM de médula ósea, hematopoyesis, eritrocitos y leucocitos.", difficulty: "🟢 BASE" },
  { href: "/vaccines", icon: FlaskConical, title: "Explorador de Vacunas", desc: "Tipos de vacuna y su mecanismo inmunológico.", difficulty: "🟢 BASE" },
  { href: "/mexico-schedule", icon: Map, title: "Esquema México", desc: "Mapa de vacunación por etapa de vida, interactivo.", difficulty: "🟡 CLÍNICO" },
  { href: "/memory-simulator", icon: FileQuestion, title: "Respuesta de Memoria", desc: "Por qué existen los refuerzos (booster).", difficulty: "🟡 CLÍNICO" },
  { href: "/clinical", icon: Stethoscope, title: "Laboratorio de Decisión Clínica", desc: "Casos clínicos de hematología, inmunología y vacunación.", difficulty: "🔴 DESAFÍO" },
  { href: "/arena", icon: Swords, title: "Vax Arena", desc: "Compite en tiempo real. Un solo intento.", difficulty: "🔴 DESAFÍO" },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border)]">
        <MoleculeNetwork />
        <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-24 text-center sm:px-6 sm:pt-28 sm:pb-32">
          <span className="font-tech inline-block rounded-full border border-[var(--border-strong)] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[var(--foreground-muted)]">
            {PROJECT_META.tagline}
          </span>
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
            BECKER <span className="text-[var(--accent-red)]">LAB</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-[var(--foreground-muted)] sm:text-lg">
            Del mecanismo inmunológico a la decisión clínica.
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm italic text-[var(--foreground-faint)]">
            &ldquo;{PROJECT_META.conceptMessage}&rdquo;
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/learn" size="lg" variant="primary">
              EXPLORAR BECKER LAB <ArrowRight size={18} />
            </LinkButton>
            <LinkButton href="/arena/join" size="lg" variant="danger">
              ENTRAR A VAX ARENA <Swords size={16} />
            </LinkButton>
          </div>
        </div>
      </section>

      {/* LEARN / ARENA MODE */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card className="border-[var(--accent-blue-dim)]">
            <div className="flex items-center gap-2 text-[var(--accent-blue)]">
              <Brain size={18} />
              <span className="font-tech text-xs uppercase tracking-wider">Modo Aprender</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">Comprende antes de competir.</h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              Explora la inmunología, el esquema nacional de vacunación y casos clínicos a tu ritmo, sin cronómetro.
            </p>
          </Card>
          <Card className="border-[var(--accent-red-dim)]">
            <div className="flex items-center gap-2 text-[var(--accent-red)]">
              <Swords size={18} />
              <span className="font-tech text-xs uppercase tracking-wider">Modo Arena</span>
            </div>
            <h3 className="mt-3 text-xl font-bold">Demuestra lo que sabes.</h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">
              Competencia en vivo, con cronómetro, leaderboard y un solo intento por participante.
            </p>
          </Card>
        </div>
      </section>

      {/* MODULE GRID */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <CardLabel>Módulos</CardLabel>
        <h2 className="mt-1 mb-6 text-2xl font-bold">Recorre Becker Lab</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((m) => (
            <Link key={m.href} href={m.href}>
              <Card className="h-full">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--background-elevated)] text-[var(--accent-blue)]">
                    <m.icon size={18} />
                  </span>
                  <span className="font-tech text-[10px] text-[var(--foreground-faint)]">{m.difficulty}</span>
                </div>
                <h3 className="mt-4 font-bold">{m.title}</h3>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{m.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* KPI DASHBOARD */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <CardLabel>Evidencia</CardLabel>
        <h2 className="mt-1 mb-6 text-2xl font-bold">Indicadores clave</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {KPIS.map((k) => (
            <Card key={k.id}>
              <div
                className="font-tech text-3xl font-black"
                style={{
                  color:
                    k.tone === "success" ? "var(--success)" : k.tone === "warning" ? "var(--warning)" : "var(--foreground)",
                }}
              >
                {k.value}
              </div>
              <p className="mt-1 text-sm font-semibold">{k.label}</p>
              <p className="mt-1 text-xs text-[var(--foreground-muted)]">{k.description}</p>
              <p className="mt-3 border-t border-[var(--border)] pt-2 font-tech text-[10px] text-[var(--foreground-faint)]">
                {k.citation}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
