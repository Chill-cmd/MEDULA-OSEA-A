-- ============================================================================
-- VAXLAB MÉXICO — Esquema de base de datos (Supabase / PostgreSQL)
-- Fase 1 deliverable. Ejecutar en el SQL Editor de tu proyecto de Supabase.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- participants: cada persona que entra a Vax Arena
-- ---------------------------------------------------------------------------
create table if not exists participants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  student_code text not null,
  created_at timestamptz not null default now(),
  unique (student_code)
);

-- ---------------------------------------------------------------------------
-- games: una "partida" de Vax Arena (controlada desde /admin/game)
-- ---------------------------------------------------------------------------
create type game_status as enum ('lobby', 'in_progress', 'paused', 'finished');

create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status game_status not null default 'lobby',
  current_question_index int not null default 0,
  question_started_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- questions: banco de preguntas, con trazabilidad a la investigación
-- ---------------------------------------------------------------------------
create type question_category as enum ('immunology', 'vaccines', 'mexico', 'clinical');
create type question_difficulty as enum ('recall', 'comprehension', 'application', 'clinical_case');

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  category question_category not null,
  difficulty question_difficulty not null default 'recall',
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option char(1) not null check (correct_option in ('A', 'B', 'C', 'D')),
  explanation text not null,
  -- Trazabilidad académica obligatoria: de qué parte de la investigación sale.
  source_reference text not null,
  time_limit_seconds int not null default 10,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- attempts: UN SOLO INTENTO por participante por juego (regla fundamental)
-- ---------------------------------------------------------------------------
create table if not exists attempts (
  id uuid primary key default gen_random_uuid(),
  participant_id uuid not null references participants (id) on delete cascade,
  game_id uuid not null references games (id) on delete cascade,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  completed boolean not null default false,
  total_score int not null default 0,
  unique (participant_id, game_id) -- hace cumplir "un solo intento" a nivel de base de datos
);

-- ---------------------------------------------------------------------------
-- answers: cada respuesta individual, con tiempo calculado server-side
-- ---------------------------------------------------------------------------
create table if not exists answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references attempts (id) on delete cascade,
  question_id uuid not null references questions (id),
  selected_option char(1) check (selected_option in ('A', 'B', 'C', 'D')),
  correct boolean not null default false,
  response_time_ms int not null,
  score int not null default 0,
  answered_at timestamptz not null default now(),
  unique (attempt_id, question_id) -- una sola respuesta por pregunta
);

-- ---------------------------------------------------------------------------
-- learning_progress: progreso educativo (no clínico, no "nivel inmunológico")
-- ---------------------------------------------------------------------------
create table if not exists learning_progress (
  participant_id uuid not null references participants (id) on delete cascade,
  module text not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (participant_id, module)
);

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------
create index if not exists idx_answers_attempt on answers (attempt_id);
create index if not exists idx_attempts_game on attempts (game_id);
create index if not exists idx_questions_category on questions (category) where active = true;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table participants enable row level security;
alter table games enable row level security;
alter table questions enable row level security;
alter table attempts enable row level security;
alter table answers enable row level security;
alter table learning_progress enable row level security;

-- Lectura pública de preguntas ACTIVAS, pero SIN exponer correct_option/explanation
-- hasta que el profesor revele la respuesta. Esto se aplica a nivel de vista,
-- no de tabla (ver vista `questions_public` abajo) — la tabla `questions` en sí
-- solo debe ser legible por el rol de servicio (service_role), nunca por anon.
create policy "games: lectura pública de estado" on games
  for select using (true);

create policy "participants: cualquiera puede registrarse" on participants
  for insert with check (true);

create policy "participants: lectura de su propio registro" on participants
  for select using (true);

create policy "attempts: lectura pública (para leaderboard)" on attempts
  for select using (true);

create policy "attempts: insertar solo si no existe intento previo" on attempts
  for insert with check (
    not exists (
      select 1 from attempts a
      where a.participant_id = attempts.participant_id
        and a.game_id = attempts.game_id
    )
  );

-- answers y questions (con correct_option) solo vía service_role (API routes
-- del servidor con la service key), nunca expuestas directamente al cliente.
-- No se crean políticas de SELECT público para `questions` ni `answers`:
-- por defecto, con RLS activo y sin política, el acceso anon queda bloqueado.

-- ---------------------------------------------------------------------------
-- Vista pública segura: preguntas SIN la respuesta correcta ni la explicación
-- ---------------------------------------------------------------------------
create view questions_public as
  select id, category, difficulty, question, option_a, option_b, option_c, option_d, time_limit_seconds
  from questions
  where active = true;
