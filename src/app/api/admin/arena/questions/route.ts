import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sortQuestions } from "@/lib/arena/types";

export async function GET(req: NextRequest) {
  const passcode = req.nextUrl.searchParams.get("passcode");
  if (passcode !== process.env.ARENA_ADMIN_PASSCODE) {
    return NextResponse.json({ error: "Código de profesor incorrecto" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("questions")
    .select("id, category, difficulty, question, option_a, option_b, option_c, option_d, correct_option, explanation, source_reference, time_limit_seconds, active");
  if (error) {
    return NextResponse.json({ error: "No se pudo leer el banco de preguntas" }, { status: 500 });
  }
  return NextResponse.json({ questions: sortQuestions(data ?? []) });
}
