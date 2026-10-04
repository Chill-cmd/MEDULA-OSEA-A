"use client";

import { useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { HEMATO_TREE, type HematoNode } from "@/lib/hematologia";

function findNode(id: string, node: HematoNode = HEMATO_TREE): HematoNode | null {
  if (node.id === id) return node;
  if (node.children) {
    for (const c of node.children) {
      const f = findNode(id, c);
      if (f) return f;
    }
  }
  return null;
}

const SECTIONS: { key: keyof HematoNode["info"]; label: string }[] = [
  { key: "origin", label: "Origen" },
  { key: "function", label: "Función" },
  { key: "location", label: "Ubicación" },
  { key: "characteristics", label: "Características" },
  { key: "fate", label: "Destino" },
];

function InfoPanel({ node }: { node: HematoNode }) {
  return (
    <Card>
      <h3 className="font-bold">{node.name}</h3>
      <div className="mt-3 space-y-2">
        {SECTIONS.map((s) => (
          <details key={s.key} className="rounded-lg border border-[var(--border)] bg-[var(--background-elevated)] px-3 py-2">
            <summary className="cursor-pointer text-sm font-semibold">{s.label}</summary>
            <p className="mt-2 text-sm text-[var(--foreground-muted)]">{node.info[s.key]}</p>
          </details>
        ))}
      </div>
    </Card>
  );
}

function TreeButton({
  id, name, variant, selected, onSelect,
}: { id: string; name: string; variant?: "myeloid" | "lymphoid"; selected: string | null; onSelect: (id: string) => void }) {
  const active = selected === id;
  const borderColor = variant === "myeloid" ? "var(--accent-red)" : variant === "lymphoid" ? "var(--accent-indigo)" : undefined;
  return (
    <button
      onClick={() => onSelect(id)}
      style={{ borderColor: active ? "var(--accent-blue)" : borderColor }}
      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "bg-[var(--accent-blue-dim)] text-[var(--accent-blue)]" : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
      }`}
    >
      {name}
    </button>
  );
}

export function HematoTreeModule() {
  const [selected, setSelected] = useState<string | null>(null);
  const node = selected ? findNode(selected) : null;

  return (
    <div>
      <CardLabel>Módulo 02 · Hematopoyesis</CardLabel>
      <h1 className="mt-1 mb-2 text-2xl font-bold">Árbol de Linaje de la Célula Madre Hematopoyética</h1>
      <p className="max-w-2xl text-sm text-[var(--foreground-muted)]">
        Haz clic en cualquier célula para revelar su origen, función, ubicación, características y destino.
      </p>

      <Card className="mt-6">
        <div className="flex justify-center">
          <TreeButton id="hsc" name={HEMATO_TREE.name} selected={selected} onSelect={setSelected} />
        </div>
        <div className="my-3 text-center text-xl text-[var(--foreground-faint)]">↓</div>
        <div className="grid gap-5 sm:grid-cols-2">
          {HEMATO_TREE.children!.map((branch) => (
            <div key={branch.id} className="text-center">
              <div className="flex justify-center">
                <TreeButton id={branch.id} name={branch.name} variant={branch.branch} selected={selected} onSelect={setSelected} />
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {branch.children!.map((c) => (
                  <TreeButton key={c.id} id={c.id} name={c.name} variant={branch.branch} selected={selected} onSelect={setSelected} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {node && <div className="mt-5"><InfoPanel node={node} /></div>}
    </div>
  );
}
