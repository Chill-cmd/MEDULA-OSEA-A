import Link from "next/link";
import { Brain, FlaskConical, Map, FileQuestion, FolderOpen, Stethoscope } from "lucide-react";
import { Card, CardLabel } from "@/components/ui/Card";

const MODULES = [
  { href: "/immunology", icon: Brain, title: "Immunology Lab", desc: "La cascada antígeno → memoria, interactiva.", status: "Disponible" },
  { href: "/vaccines", icon: FlaskConical, title: "Vaccine Explorer", desc: "Tipos de vacuna y su mecanismo.", status: "Disponible" },
  { href: "/mexico-schedule", icon: Map, title: "Esquema México", desc: "Life Course Map + modo paciente.", status: "Disponible" },
  { href: "/memory-simulator", icon: FileQuestion, title: "Memory Response Simulator", desc: "Primera exposición vs. refuerzo.", status: "Fase 2" },
  { href: "/microlabs", icon: FolderOpen, title: "Microlab", desc: "Retos de 30-60 segundos.", status: "Fase 2" },
  { href: "/clinical", icon: Stethoscope, title: "Clinical Decision Lab", desc: "Casos clínicos con consecuencias.", status: "Fase 3" },
];

export const metadata = { title: "Aprender — VaxLab México" };

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <CardLabel>Learn Mode</CardLabel>
      <h1 className="mt-1 mb-2 text-2xl font-bold sm:text-3xl">Understand before you compete.</h1>
      <p className="max-w-xl text-sm text-[var(--foreground-muted)]">
        Cada módulo usa únicamente contenido verificado de tu investigación. Sin cronómetro, a tu ritmo.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {MODULES.map((m) => (
          <Link key={m.href} href={m.href}>
            <Card className="flex h-full items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--background-elevated)] text-[var(--accent-blue)]">
                <m.icon size={20} />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{m.title}</h3>
                  <span className="font-tech text-[10px] uppercase text-[var(--foreground-faint)]">{m.status}</span>
                </div>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{m.desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
