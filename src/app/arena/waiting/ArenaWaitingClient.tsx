"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardLabel } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";
import { ARENA_STORAGE_KEYS, type GameStatus } from "@/lib/arena/types";

export function ArenaWaitingClient() {
  const router = useRouter();
  const [status, setStatus] = useState<GameStatus | null>(null);
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [notReady, setNotReady] = useState(false);

  useEffect(() => {
    const gameId = localStorage.getItem(ARENA_STORAGE_KEYS.gameId);
    if (!gameId) {
      Promise.resolve().then(() => setNotReady(true));
      return;
    }

    let active = true;
    async function poll() {
      const { data: game } = await supabase.from("games").select("status, title").eq("id", gameId!).single();
      const { count: c } = await supabase
        .from("attempts")
        .select("id", { count: "exact", head: true })
        .eq("game_id", gameId!);
      if (!active || !game) return;
      setStatus(game.status);
      setTitle(game.title);
      setCount(c ?? 0);
      if (game.status === "in_progress") router.push("/arena/game");
      if (game.status === "finished") router.push("/arena/results");
    }

    poll();
    const interval = setInterval(poll, 2000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [router]);

  if (notReady) {
    return (
      <Card className="mx-auto max-w-sm text-center">
        <p className="text-sm text-[var(--foreground-muted)]">Primero debes unirte a una partida.</p>
        <LinkButton href="/arena/join" variant="danger" className="mt-4">
          Ir a entrar
        </LinkButton>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-sm text-center">
      <CardLabel>{title || "Vax Arena"}</CardLabel>
      <div className="my-6 flex justify-center">
        <span className="h-3 w-3 animate-ping rounded-full bg-[var(--accent-blue)]" />
      </div>
      <h2 className="text-xl font-bold">Esperando al profesor…</h2>
      <p className="mt-2 text-sm text-[var(--foreground-muted)]">
        {count} {count === 1 ? "jugador conectado" : "jugadores conectados"}
      </p>
      {status === "paused" && (
        <p className="mt-4 text-xs text-[var(--warning)]">La partida está en pausa.</p>
      )}
    </Card>
  );
}
