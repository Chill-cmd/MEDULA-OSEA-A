import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sortQuestions } from "@/lib/arena/types";

type Action = "start" | "next" | "finish" | "pause" | "resume";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { passcode, game_id, action } = body as { passcode?: string; game_id?: string; action?: Action } ?? {};

  if (passcode !== process.env.ARENA_ADMIN_PASSCODE) {
    return NextResponse.json({ error: "Código de profesor incorrecto" }, { status: 401 });
  }
  if (!game_id || !action) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const { data: game, error: gameErr } = await supabaseAdmin
    .from("games")
    .select("id, status, current_question_index")
    .eq("id", game_id)
    .single();
  if (gameErr || !game) {
    return NextResponse.json({ error: "Partida no encontrada" }, { status: 404 });
  }

  if (action === "start") {
    const { data, error } = await supabaseAdmin
      .from("games")
      .update({ status: "in_progress", current_question_index: 0, question_started_at: new Date().toISOString() })
      .eq("id", game_id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: "No se pudo iniciar" }, { status: 500 });
    return NextResponse.json({ game: data });
  }

  if (action === "pause") {
    const { data, error } = await supabaseAdmin.from("games").update({ status: "paused" }).eq("id", game_id).select().single();
    if (error) return NextResponse.json({ error: "No se pudo pausar" }, { status: 500 });
    return NextResponse.json({ game: data });
  }

  if (action === "resume") {
    const { data, error } = await supabaseAdmin
      .from("games")
      .update({ status: "in_progress", question_started_at: new Date().toISOString() })
      .eq("id", game_id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: "No se pudo reanudar" }, { status: 500 });
    return NextResponse.json({ game: data });
  }

  if (action === "next") {
    const { data: allQuestions } = await supabaseAdmin.from("questions").select("id, category").eq("active", true);
    const ordered = sortQuestions(allQuestions ?? []);
    const nextIndex = game.current_question_index + 1;
    const finished = nextIndex >= ordered.length;

    const { data, error } = await supabaseAdmin
      .from("games")
      .update(
        finished
          ? { status: "finished" }
          : { current_question_index: nextIndex, question_started_at: new Date().toISOString(), status: "in_progress" },
      )
      .eq("id", game_id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: "No se pudo avanzar" }, { status: 500 });
    return NextResponse.json({ game: data, totalQuestions: ordered.length });
  }

  if (action === "finish") {
    const { data, error } = await supabaseAdmin.from("games").update({ status: "finished" }).eq("id", game_id).select().single();
    if (error) return NextResponse.json({ error: "No se pudo terminar" }, { status: 500 });
    return NextResponse.json({ game: data });
  }

  return NextResponse.json({ error: "Acción inválida" }, { status: 400 });
}
