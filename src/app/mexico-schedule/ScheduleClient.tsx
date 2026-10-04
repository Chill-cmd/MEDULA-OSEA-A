"use client";

import { useMemo, useState } from "react";
import * as Icons from "lucide-react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SourceBadge, Badge } from "@/components/ui/Badge";
import {
  LIFE_STAGES,
  NATIONAL_SCHEDULE,
  PATIENT_JOURNEY,
  HSCT_PROTOCOL,
  UNAVAILABLE,
  type LifeStageId,
} from "@/lib/content";

const iconMap: Record<string, Icons.LucideIcon> = {
  baby: Icons.Baby,
  milk: Icons.Milk,
  footprints: Icons.Footprints,
  "graduation-cap": Icons.GraduationCap,
  user: Icons.User,
  "user-round": Icons.UserRound,
  "shield-alert": Icons.ShieldAlert,
};

export function ScheduleClient() {
  const [stage, setStage] = useState<LifeStageId>("nacimiento");
  const [mode, setMode] = useState<"map" | "patient">("map");

  const entries = useMemo(() => NATIONAL_SCHEDULE.filter((e) => e.stage === stage), [stage]);
  const activeStage = LIFE_STAGES.find((s) => s.id === stage)!;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant={mode === "map" ? "primary" : "secondary"} size="sm" onClick={() => setMode("map")}>
          Mapa de Etapas de Vida
        </Button>
        <Button variant={mode === "patient" ? "primary" : "secondary"} size="sm" onClick={() => setMode("patient")}>
          Modo: sigue a un paciente
        </Button>
      </div>

      {mode === "map" ? (
        <>
          {/* Timeline of stages */}
          <div className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
            {LIFE_STAGES.map((s) => {
              const Icon = iconMap[s.icon] ?? Icons.Circle;
              const activeBtn = s.id === stage;
              return (
                <button
                  key={s.id}
                  onClick={() => setStage(s.id)}
                  className={`flex min-w-[128px] flex-col items-center gap-2 rounded-2xl border px-4 py-4 transition-colors ${
                    activeBtn
                      ? "border-[var(--accent-blue)] bg-[var(--accent-blue-dim)]"
                      : "border-[var(--border)] bg-[var(--background-card)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <Icon size={20} className={activeBtn ? "text-[var(--accent-blue)]" : "text-[var(--foreground-muted)]"} />
                  <span className="text-sm font-semibold">{s.label}</span>
                  <span className="font-tech text-[10px] text-[var(--foreground-faint)]">{s.ageRange}</span>
                </button>
              );
            })}
          </div>

          {/* Vaccines for selected stage */}
          <div>
            <CardLabel>{activeStage.label}</CardLabel>
            <h2 className="mt-1 mb-4 text-xl font-bold">
              Vacunas — {activeStage.ageRange === UNAVAILABLE ? "sin ficha dedicada" : activeStage.ageRange}
            </h2>

            {entries.length === 0 ? (
              <Card>
                <p className="text-sm text-[var(--foreground-muted)]">
                  {UNAVAILABLE}. La campaña invernal menciona a este grupo de forma genérica, sin una ficha de
                  vacuna/edad/dosis propia en la investigación.
                </p>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {entries.map((e) => (
                  <Card key={e.id}>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold">{e.vaccine}</h3>
                      <SourceBadge source={e.source} />
                    </div>
                    <dl className="mt-3 space-y-2 text-sm">
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-[var(--foreground-faint)]">Protege contra</dt>
                        <dd className="text-[var(--foreground-muted)]">{e.protectsAgainst}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-[var(--foreground-faint)]">Edad / dosis</dt>
                        <dd className="text-[var(--foreground-muted)]">{e.ageOrDose}</dd>
                      </div>
                      <div>
                        <dt className="text-xs uppercase tracking-wide text-[var(--foreground-faint)]">Refuerzo</dt>
                        <dd className="text-[var(--foreground-muted)]">{e.booster}</dd>
                      </div>
                      {e.clinicalNote !== "—" && (
                        <div>
                          <dt className="text-xs uppercase tracking-wide text-[var(--foreground-faint)]">Dato clínico</dt>
                          <dd className="text-[var(--foreground-muted)]">{e.clinicalNote}</dd>
                        </div>
                      )}
                    </dl>
                    {e.coverage && (
                      <div className="mt-3 rounded-lg bg-[var(--background-elevated)] px-3 py-2">
                        <span className="font-tech text-lg font-bold text-[var(--accent-blue)]">{e.coverage.value}</span>
                        <span className="ml-2 text-xs text-[var(--foreground-faint)]">{e.coverage.label}</span>
                      </div>
                    )}
                    {e.conflictingSource && (
                      <p className="mt-3 rounded-lg border border-[var(--warning)]/30 bg-[var(--warning)]/5 p-2.5 text-xs text-[var(--foreground-muted)]">
                        ⚠️ {e.conflictingSource}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {stage === "grupos_especiales" && (
              <div className="mt-6">
                <CardLabel>Protocolo de reinicio inmunológico (HSCT)</CardLabel>
                <div className="mt-3 space-y-2">
                  {HSCT_PROTOCOL.map((p) => (
                    <div key={p.window} className="flex gap-3 rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-3.5">
                      <Badge className="h-fit shrink-0 border-[var(--accent-blue-dim)] text-[var(--accent-blue)]">{p.window}</Badge>
                      <div>
                        <p className="text-sm font-semibold">{p.title}</p>
                        <p className="mt-0.5 text-xs text-[var(--foreground-muted)]">{p.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <PatientJourney />
      )}
    </div>
  );
}

function PatientJourney() {
  const [step, setStep] = useState(0);
  const progress = Math.round(((step + 1) / PATIENT_JOURNEY.length) * 100);

  return (
    <div>
      <p className="mb-1 text-xs text-[var(--foreground-faint)]">
        PROGRESO {progress}% — recorrido educativo, no es un porcentaje de inmunidad real.
      </p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--background-elevated)]">
        <div
          className="h-full rounded-full bg-[var(--accent-blue)] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8 space-y-3">
        {PATIENT_JOURNEY.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors ${
              i <= step
                ? "border-[var(--accent-blue)]/40 bg-[var(--accent-blue-dim)]"
                : "border-[var(--border)] bg-[var(--background-card)] opacity-60"
            }`}
          >
            <span className="font-tech text-xs text-[var(--foreground-faint)]">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-2">
        <Button variant="secondary" size="sm" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
          Anterior
        </Button>
        <Button
          size="sm"
          disabled={step === PATIENT_JOURNEY.length - 1}
          onClick={() => setStep((s) => Math.min(PATIENT_JOURNEY.length - 1, s + 1))}
        >
          Siguiente etapa
        </Button>
      </div>
    </div>
  );
}
