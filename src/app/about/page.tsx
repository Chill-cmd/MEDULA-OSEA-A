import { Card, CardLabel } from "@/components/ui/Card";
import { GLOSSARY, PROJECT_META } from "@/lib/content";

export const metadata = { title: "Acerca de — Becker Lab" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <CardLabel>Acerca de Becker Lab</CardLabel>
      <h1 className="mt-1 mb-6 text-2xl font-bold sm:text-3xl">Acerca del proyecto</h1>

      <Card className="mb-4">
        <h2 className="font-bold">Propósito educativo</h2>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          Becker Lab fusiona un laboratorio interactivo de inmunología/vacunación con una competencia
          clínica en tiempo real (Vax Arena), siguiendo el ciclo: aprender → competir → detectar
          debilidades → volver a aprender.
        </p>
      </Card>

      <Card className="mb-4">
        <h2 className="font-bold">Fuentes del contenido</h2>
        <ul className="mt-2 space-y-1 text-sm text-[var(--foreground-muted)]">
          {PROJECT_META.sources.map((s) => (
            <li key={s.label}>
              <span className="font-semibold text-[var(--foreground)]">{s.type}:</span> {s.label}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-[var(--foreground-faint)]">
          Ningún dato de vacunas, edades, dosis, cifras o recomendaciones fue generado fuera de estas dos
          fuentes. Donde la investigación no cubre algo que el diseño original pedía, la plataforma lo
          marca explícitamente en vez de completarlo con conocimiento general.
        </p>
      </Card>

      <Card className="mb-4">
        <h2 className="font-bold">Metodología</h2>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          Construcción por fases (Fundamentos → Becker Lab → Laboratorio Clínico → Vax Arena → Tiempo
          Real/Admin → Pulido final), priorizando siempre la trazabilidad del dato médico sobre la velocidad de entrega.
        </p>
      </Card>

      <Card className="mb-4">
        <h2 className="mb-3 font-bold">Glosario</h2>
        <dl className="space-y-3 text-sm">
          {GLOSSARY.map((g) => (
            <div key={g.term}>
              <dt className="font-semibold">{g.term}</dt>
              <dd className="text-[var(--foreground-muted)]">{g.definition}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <div className="rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 p-4 text-sm text-[var(--foreground-muted)]">
        ⚠️ {PROJECT_META.disclaimer}
      </div>
    </div>
  );
}
