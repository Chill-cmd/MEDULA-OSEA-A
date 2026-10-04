"use client";

import { useState } from "react";
import { ArrowDown, HelpCircle } from "lucide-react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SourceBadge } from "@/components/ui/Badge";
import { IMMUNOLOGY_CASCADE, INNATE_VS_ADAPTIVE, ACTIVE_VS_PASSIVE } from "@/lib/content";
import { ApcSection } from "./ApcSection";

export function ImmunologyClient() {
  const [activeId, setActiveId] = useState(IMMUNOLOGY_CASCADE[0].id);
  const [showWhy, setShowWhy] = useState(false);
  const active = IMMUNOLOGY_CASCADE.find((s) => s.id === activeId)!;

  return (
    <div className="space-y-10">
      {/* Cascade */}
      <div>
        <CardLabel>Módulo 1 · Laboratorio de Inmunología</CardLabel>
        <h1 className="mt-1 mb-2 text-2xl font-bold sm:text-3xl">
          Antígeno → Memoria inmunológica
        </h1>
        <p className="max-w-2xl text-sm text-[var(--foreground-muted)]">
          Haz clic en cada etapa de la cascada para ver su explicación y su correlación clínica.
        </p>

        <div className="mt-8 flex flex-col items-center gap-1">
          {IMMUNOLOGY_CASCADE.map((stage, i) => (
            <div key={stage.id} className="flex w-full max-w-md flex-col items-center">
              <button
                onClick={() => {
                  setActiveId(stage.id);
                  setShowWhy(false);
                }}
                className={`w-full rounded-2xl border px-5 py-3.5 text-left transition-colors ${
                  activeId === stage.id
                    ? "border-[var(--accent-blue)] bg-[var(--accent-blue-dim)]"
                    : "border-[var(--border)] bg-[var(--background-card)] hover:border-[var(--border-strong)]"
                }`}
              >
                <span className="font-tech text-[10px] text-[var(--foreground-faint)]">
                  {String(stage.order).padStart(2, "0")}
                </span>
                <p className="font-semibold">{stage.title}</p>
              </button>
              {i < IMMUNOLOGY_CASCADE.length - 1 && (
                <ArrowDown size={16} className="my-1 text-[var(--foreground-faint)]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <Card className="mx-auto max-w-2xl">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold">{active.title}</h2>
          <SourceBadge source={active.source} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[var(--foreground-muted)]">
          {active.explanation}
        </p>
        <div className="mt-4">
          <Button variant="secondary" size="sm" onClick={() => setShowWhy((v) => !v)}>
            <HelpCircle size={14} /> ¿Por qué importa?
          </Button>
          {showWhy && (
            <p className="mt-3 rounded-xl border-l-2 border-[var(--accent-blue)] bg-[var(--background-elevated)] p-4 text-sm text-[var(--foreground-muted)]">
              {active.whyItMatters}
            </p>
          )}
        </div>
      </Card>

      {/* Active vs passive — comparator */}
      <div>
        <CardLabel>Inmunidad innata vs. adaptativa</CardLabel>
        <h2 className="mt-1 mb-4 text-xl font-bold">Comparador</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <h3 className="font-bold text-[var(--accent-blue)]">{INNATE_VS_ADAPTIVE.innata.title}</h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">{INNATE_VS_ADAPTIVE.innata.description}</p>
            <p className="mt-3 text-xs text-[var(--foreground-faint)]">{INNATE_VS_ADAPTIVE.innata.clinicalNote}</p>
            <div className="mt-3"><SourceBadge source={INNATE_VS_ADAPTIVE.innata.source} /></div>
          </Card>
          <Card>
            <h3 className="font-bold text-[var(--accent-red)]">{INNATE_VS_ADAPTIVE.adaptativa.title}</h3>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">{INNATE_VS_ADAPTIVE.adaptativa.description}</p>
            <p className="mt-3 text-xs text-[var(--foreground-faint)]">{INNATE_VS_ADAPTIVE.adaptativa.clinicalNote}</p>
            <div className="mt-3"><SourceBadge source={INNATE_VS_ADAPTIVE.adaptativa.source} /></div>
          </Card>
        </div>
      </div>

      {/* Active vs passive immunization — comparator */}
      <div>
        <CardLabel>Inmunización activa vs. pasiva</CardLabel>
        <h2 className="mt-1 mb-1 text-xl font-bold">¿Quién genera la respuesta?</h2>
        <p className="mb-4 text-sm text-[var(--foreground-muted)]">
          No confundir con &ldquo;atenuadas vs. inactivadas&rdquo; (eso es un tipo de vacuna). Esto es sobre el
          origen de los anticuerpos: ¿los produce el propio paciente o se transfieren ya hechos?
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["activa", ACTIVE_VS_PASSIVE.activa, "var(--accent-blue)"],
              ["pasiva", ACTIVE_VS_PASSIVE.pasiva, "var(--accent-red)"],
            ] as const
          ).map(([key, side, color]) => (
            <Card key={key}>
              <h3 className="font-bold" style={{ color }}>
                {side.title}
              </h3>
              <dl className="mt-3 space-y-2.5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[var(--foreground-faint)]">Origen</dt>
                  <dd className="text-[var(--foreground-muted)]">{side.origin}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[var(--foreground-faint)]">
                    Tiempo hasta protección
                  </dt>
                  <dd className="text-[var(--foreground-muted)]">{side.timeToProtection}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[var(--foreground-faint)]">Memoria inmunológica</dt>
                  <dd className="text-[var(--foreground-muted)]">{side.memory}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[var(--foreground-faint)]">Duración</dt>
                  <dd className="text-[var(--foreground-muted)]">{side.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-[var(--foreground-faint)]">Ejemplos</dt>
                  <dd className="text-[var(--foreground-muted)]">{side.examples}</dd>
                </div>
              </dl>
              <div className="mt-3">
                <SourceBadge source={side.source} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ApcSection />
    </div>
  );
}
