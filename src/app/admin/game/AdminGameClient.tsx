"use client";

import { useEffect, useState } from "react";
import { Card, CardLabel } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { supabase } from "@/lib/supabase/client";
import type { Game } from "@/lib/arena/types";

const PASSCODE_KEY = "arena_admin_passcode";

function PasscodeGate({ onUnlock }: { onUnlock: (passcode: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <Card className="mx-auto max-w-sm text-center">
      <CardLabel>Acceso de profesor</CardLabel>
      <h2 className="mt-2 text-lg font-bold">Código de profesor</h2>
      <input
        type="password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-4 w-full rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-2.5 text-center text-sm outline-none focus:border-[var(--accent-blue)]"
        placeholder="Código"
      />
      <Button
        className="mt-4 w-full"
        onClick={() => {
          sessionStorage.setItem(PASSCODE_KEY, value);
          onUnlock(value);
        }}
      >
        Entrar
      </Button>
    </Card>
  );
}

export function AdminGameClient() {
  const [passcode, setPasscode] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("Vax Arena");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(PASSCODE_KEY);
    if (stored) Promise.resolve().then(() => setPasscode(stored));
  }, []);

  useEffect(() => {
    if (!passcode) return;
    let active = true;
    async function poll() {
      const { data } = await supabase.from("games").select("*").order("created_at", { ascending: false });
      if (!active) return;
      setGames((data as Game[]) ?? []);
      const entries = await Promise.all(
        (data ?? []).map(async (g) => {
          const { count } = await supabase.from("attempts").select("id", { count: "exact", head: true }).eq("game_id", g.id);
          return [g.id, count ?? 0] as const;
        }),
      );
      if (!active) return;
      setCounts(Object.fromEntries(entries));
      const { count: qCount } = await supabase.from("questions_public").select("id", { count: "exact", head: true });
      if (active) setTotalQuestions(qCount ?? null);
    }
    poll();
    const interval = setInterval(poll, 3000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [passcode]);

  async function createGame() {
    setError(null);
    const res = await fetch("/api/admin/arena/create-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode, title }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      if (res.status === 401) {
        sessionStorage.removeItem(PASSCODE_KEY);
        setPasscode(null);
      }
    }
  }

  async function control(gameId: string, action: string) {
    setError(null);
    const res = await fetch("/api/admin/arena/control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode, game_id: gameId, action }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error);
  }

  if (!passcode) return <PasscodeGate onUnlock={setPasscode} />;

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <h2 className="font-bold">Crear nueva partida</h2>
        <div className="mt-3 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-blue)]"
          />
          <Button onClick={createGame}>Crear</Button>
        </div>
        {error && <p className="mt-2 text-sm text-[var(--danger)]">{error}</p>}
      </Card>

      <div className="mt-6 space-y-3">
        {games.map((g) => (
          <Card key={g.id}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">{g.title}</p>
                <p className="text-xs text-[var(--foreground-faint)]">
                  {new Date(g.created_at).toLocaleString("es-MX")} · {counts[g.id] ?? 0} jugador(es)
                </p>
              </div>
              <Badge
                className={
                  g.status === "in_progress"
                    ? "border-[var(--success)]/40 text-[var(--success)]"
                    : g.status === "finished"
                      ? "border-[var(--foreground-faint)]/40"
                      : "border-[var(--warning)]/40 text-[var(--warning)]"
                }
              >
                {g.status}
              </Badge>
            </div>

            {g.status === "in_progress" && (
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">
                Pregunta {g.current_question_index + 1} / {totalQuestions ?? "?"}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {g.status === "lobby" && (
                <Button size="sm" onClick={() => control(g.id, "start")}>
                  Iniciar partida
                </Button>
              )}
              {g.status === "in_progress" && (
                <>
                  <Button size="sm" onClick={() => control(g.id, "next")}>
                    Siguiente pregunta
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => control(g.id, "pause")}>
                    Pausar
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => control(g.id, "finish")}>
                    Terminar
                  </Button>
                </>
              )}
              {g.status === "paused" && (
                <Button size="sm" onClick={() => control(g.id, "resume")}>
                  Reanudar
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
