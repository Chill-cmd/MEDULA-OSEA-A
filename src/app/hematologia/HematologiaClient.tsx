"use client";

import { useState } from "react";
import * as Icons from "lucide-react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { HEMATOLOGIA_MODULES } from "@/lib/hematologia";
import { MriModule } from "./modules/MriModule";
import { HematoTreeModule } from "./modules/HematoTreeModule";
import { EritropoyesisModule } from "./modules/EritropoyesisModule";
import { RbcModule } from "./modules/RbcModule";
import { WbcModule } from "./modules/WbcModule";
import { MonocitosModule } from "./modules/MonocitosModule";
import { QuizModule } from "./modules/QuizModule";

const MODULE_ICONS: Record<string, Icons.LucideIcon> = {
  mri: Icons.CircleDot,
  hemato: Icons.GitBranch,
  eryth: Icons.Droplet,
  rbc: Icons.CircleEqual,
  wbc: Icons.Shield,
  mono: Icons.Hexagon,
  quiz: Icons.CheckCircle2,
};

export function HematologiaClient() {
  const [active, setActive] = useState<string | null>(null);

  if (active) {
    return (
      <div>
        <Button variant="ghost" size="sm" onClick={() => setActive(null)} className="mb-5">
          ← Volver a módulos
        </Button>
        {active === "mri" && <MriModule onNavigate={setActive} />}
        {active === "hemato" && <HematoTreeModule />}
        {active === "eryth" && <EritropoyesisModule />}
        {active === "rbc" && <RbcModule />}
        {active === "wbc" && <WbcModule />}
        {active === "mono" && <MonocitosModule />}
        {active === "quiz" && <QuizModule />}
      </div>
    );
  }

  return (
    <div>
      <CardLabel>Laboratorio de Fisiología Hematopoyética</CardLabel>
      <h1 className="mt-1 mb-2 text-2xl font-bold sm:text-3xl">De la médula ósea a la sangre y la inmunidad</h1>
      <p className="max-w-2xl text-sm text-[var(--foreground-muted)]">
        Explora de dónde vienen las células sanguíneas, cómo funcionan, cómo se regulan y cómo se conectan con la
        inmunidad — fundamentado en la fisiología de la RM de médula ósea y en la enseñanza clásica de hematología.
        El módulo de Células Presentadoras de Antígeno vive ahora dentro de{" "}
        <a href="/immunology" className="underline hover:text-[var(--foreground)]">Immunology Lab</a>, y los casos
        clínicos de hematología se fusionaron en{" "}
        <a href="/clinical" className="underline hover:text-[var(--foreground)]">Clinical Decision Lab</a>.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HEMATOLOGIA_MODULES.map((m) => {
          const Icon = MODULE_ICONS[m.id] ?? Icons.Circle;
          return (
            <button key={m.id} onClick={() => setActive(m.id)} className="text-left">
              <Card className="h-full">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--background-elevated)]" style={{ color: m.color }}>
                    <Icon size={18} />
                  </span>
                  <span className="font-tech text-[10px] text-[var(--foreground-faint)]">MÓDULO {m.num}</span>
                </div>
                <h3 className="mt-4 font-bold">{m.title}</h3>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{m.desc}</p>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
