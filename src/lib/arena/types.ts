export type GameStatus = "lobby" | "in_progress" | "paused" | "finished";
export type QuestionCategory = "immunology" | "vaccines" | "mexico" | "clinical";
export type QuestionDifficulty = "recall" | "comprehension" | "application" | "clinical_case";

export interface Game {
  id: string;
  title: string;
  status: GameStatus;
  current_question_index: number;
  question_started_at: string | null;
  created_at: string;
}

export interface Participant {
  id: string;
  name: string;
  student_code: string;
  created_at: string;
}

export interface Attempt {
  id: string;
  participant_id: string;
  game_id: string;
  started_at: string;
  completed_at: string | null;
  completed: boolean;
  total_score: number;
}

export interface QuestionPublic {
  id: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  time_limit_seconds: number;
}

export const CATEGORY_ORDER: QuestionCategory[] = ["immunology", "vaccines", "mexico", "clinical"];

export const CATEGORY_LABEL: Record<QuestionCategory, string> = {
  immunology: "Inmunología",
  vaccines: "Vacunas",
  mexico: "México",
  clinical: "Decisión Clínica",
};

export const CATEGORY_MODULE_LINK: Record<QuestionCategory, { href: string; label: string }> = {
  immunology: { href: "/immunology", label: "Laboratorio de Inmunología" },
  vaccines: { href: "/vaccines", label: "Explorador de Vacunas" },
  mexico: { href: "/mexico-schedule", label: "Esquema México" },
  clinical: { href: "/clinical", label: "Laboratorio de Decisión Clínica" },
};

export function sortQuestions<T extends { category: QuestionCategory; id: string }>(questions: T[]): T[] {
  return questions.slice().sort((a, b) => {
    const diff = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    if (diff !== 0) return diff;
    return a.id.localeCompare(b.id);
  });
}

export const ARENA_STORAGE_KEYS = {
  participantId: "arena_participant_id",
  participantName: "arena_participant_name",
  gameId: "arena_game_id",
  attemptId: "arena_attempt_id",
} as const;
