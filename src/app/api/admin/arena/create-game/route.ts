import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { passcode, title } = body ?? {};

  if (passcode !== process.env.ARENA_ADMIN_PASSCODE) {
    return NextResponse.json({ error: "Código de profesor incorrecto" }, { status: 401 });
  }
  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Falta el título de la partida" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("games")
    .insert({ title, status: "lobby", current_question_index: 0 })
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "No se pudo crear la partida" }, { status: 500 });
  }
  return NextResponse.json({ game: data });
}
