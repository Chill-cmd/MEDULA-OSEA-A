import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sortQuestions } from "@/lib/arena/types";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { attempt_id, question_id, selected_option, response_time_ms } = body ?? {};

  if (!attempt_id || !question_id || typeof response_time_ms !== "number") {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  if (selected_option !== null && !["A", "B", "C", "D"].includes(selected_option)) {
    return NextResponse.json({ error: "Opción inválida" }, { status: 400 });
  }

  const { data: attempt, error: attemptErr } = await supabaseAdmin
    .from("attempts")
    .select("id, game_id, completed, total_score")
    .eq("id", attempt_id)
    .single();
  if (attemptErr || !attempt) {
    return NextResponse.json({ error: "Intento no encontrado" }, { status: 404 });
  }
  if (attempt.completed) {
    return NextResponse.json({ error: "Este intento ya fue completado" }, { status: 409 });
  }

  const { data: game, error: gameErr } = await supabaseAdmin
    .from("games")
    .select("id, status, current_question_index")
    .eq("id", attempt.game_id)
    .single();
  if (gameErr || !game || game.status !== "in_progress") {
    return NextResponse.json({ error: "La partida no está activa" }, { status: 409 });
  }

  const { data: allQuestions } = await supabaseAdmin
    .from("questions")
    .select("id, category, correct_option, explanation, time_limit_seconds")
    .eq("active", true);
  const ordered = sortQuestions(allQuestions ?? []);
  const currentQuestion = ordered[game.current_question_index];

  if (!currentQuestion || currentQuestion.id !== question_id) {
    return NextResponse.json({ error: "Esta pregunta ya no está activa" }, { status: 409 });
  }

  const correct = selected_option === currentQuestion.correct_option;
  const remainingSeconds = Math.max(0, currentQuestion.time_limit_seconds - response_time_ms / 1000);
  const score = correct ? Math.round(500 + remainingSeconds * 50) : 0;

  const { error: insertErr } = await supabaseAdmin.from("answers").insert({
    attempt_id,
    question_id,
    selected_option,
    correct,
    response_time_ms: Math.round(response_time_ms),
    score,
  });
  if (insertErr) {
    if (insertErr.code === "23505") {
      return NextResponse.json({ error: "Ya respondiste esta pregunta" }, { status: 409 });
    }
    return NextResponse.json({ error: "No se pudo guardar la respuesta" }, { status: 500 });
  }

  const newTotal = attempt.total_score + score;
  const isLast = game.current_question_index >= ordered.length - 1;
  await supabaseAdmin
    .from("attempts")
    .update({
      total_score: newTotal,
      completed: isLast,
      completed_at: isLast ? new Date().toISOString() : null,
    })
    .eq("id", attempt_id);

  return NextResponse.json({
    correct,
    correctOption: currentQuestion.correct_option,
    explanation: currentQuestion.explanation,
    score,
    totalScore: newTotal,
  });
}
