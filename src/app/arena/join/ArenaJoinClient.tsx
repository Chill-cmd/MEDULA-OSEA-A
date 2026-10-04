"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";
import { ARENA_STORAGE_KEYS } from "@/lib/arena/types";

export function ArenaJoinClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !code.trim()) {
      setError("Escribe tu nombre y tu matrícula/código.");
      return;
    }
    setLoading(true);

    const { data: game, error: gameErr } = await supabase
      .from("games")
      .select("id, status")
      .in("status", ["lobby", "in_progress"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (gameErr || !game) {
      setError("No hay ninguna partida activa ahora mismo. Pide a tu profesor que inicie una.");
      setLoading(false);
      return;
    }

    let participantId: string;
    const { data: existingParticipant } = await supabase
      .from("participants")
      .select("id, name")
      .eq("student_code", code.trim())
      .maybeSingle();

    if (existingParticipant) {
      participantId = existingParticipant.id;
    } else {
      const { data: newParticipant, error: pErr } = await supabase
        .from("participants")
        .insert({ name: name.trim(), student_code: code.trim() })
        .select("id")
        .single();
      if (pErr || !newParticipant) {
        setError("No se pudo registrar tu participación. Intenta de nuevo.");
        setLoading(false);
        return;
      }
      participantId = newParticipant.id;
    }

    const { data: existingAttempt } = await supabase
      .from("attempts")
      .select("id, completed")
      .eq("participant_id", participantId)
      .eq("game_id", game.id)
      .maybeSingle();

    let attemptId: string;
    if (existingAttempt) {
      attemptId = existingAttempt.id;
      if (existingAttempt.completed) {
        localStorage.setItem(ARENA_STORAGE_KEYS.participantId, participantId);
        localStorage.setItem(ARENA_STORAGE_KEYS.participantName, name.trim());
        localStorage.setItem(ARENA_STORAGE_KEYS.gameId, game.id);
        localStorage.setItem(ARENA_STORAGE_KEYS.attemptId, attemptId);
        router.push("/arena/results");
        return;
      }
    } else {
      const { data: newAttempt, error: aErr } = await supabase
        .from("attempts")
        .insert({ participant_id: participantId, game_id: game.id })
        .select("id")
        .single();
      if (aErr || !newAttempt) {
        setError("Ya tienes un intento registrado para esta partida.");
        setLoading(false);
        return;
      }
      attemptId = newAttempt.id;
    }

    localStorage.setItem(ARENA_STORAGE_KEYS.participantId, participantId);
    localStorage.setItem(ARENA_STORAGE_KEYS.participantName, name.trim());
    localStorage.setItem(ARENA_STORAGE_KEYS.gameId, game.id);
    localStorage.setItem(ARENA_STORAGE_KEYS.attemptId, attemptId);

    router.push(game.status === "in_progress" ? "/arena/game" : "/arena/waiting");
  }

  return (
    <Card className="mx-auto max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-mono uppercase text-[var(--foreground-faint)]">Nombre</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-blue)]"
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <label className="text-xs font-mono uppercase text-[var(--foreground-faint)]">Matrícula / código</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="mt-1 w-full rounded-xl border border-[var(--border)] bg-[var(--background-elevated)] px-4 py-2.5 text-sm outline-none focus:border-[var(--accent-blue)]"
            placeholder="Tu matrícula"
          />
        </div>
        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}
        <Button type="submit" variant="danger" size="lg" disabled={loading} className="w-full">
          {loading ? "Entrando..." : "ENTRAR A LA ARENA"}
        </Button>
      </form>
    </Card>
  );
}
