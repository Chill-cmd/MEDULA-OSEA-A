"use client";

import { useState } from "react";
import { Shield, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SourceBadge } from "@/components/ui/Badge";
import { VACCINE_TYPES } from "@/lib/content";

export function VaccinesClient() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {VACCINE_TYPES.map((v) => {
        const open = openId === v.id;
        return (
          <button key={v.id} onClick={() => setOpenId(open ? null : v.id)} className="text-left">
            <Card className={open ? "border-[var(--accent-blue)]" : undefined}>
              <div className="flex items-center gap-2">
                {v.id === "atenuadas" ? (
                  <ShieldAlert size={18} className="text-[var(--warning)]" />
                ) : (
                  <Shield size={18} className="text-[var(--accent-blue)]" />
                )}
                <h3 className="font-bold">{v.type}</h3>
              </div>
              <p className="mt-3 text-xs uppercase tracking-wide text-[var(--foreground-faint)]">Cómo funciona</p>
              <p className="mt-1 text-sm text-[var(--foreground-muted)]">{v.mechanism}</p>
              {open && (
                <>
                  <p className="mt-4 text-xs uppercase tracking-wide text-[var(--foreground-faint)]">
                    Precaución en pacientes hematopoyéticos
                  </p>
                  <p className="mt-1 text-sm text-[var(--foreground-muted)]">{v.precaution}</p>
                </>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-[var(--accent-blue)]">{open ? "Ocultar detalle ↑" : "Ver detalle ↓"}</span>
                <SourceBadge source={v.source} />
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
