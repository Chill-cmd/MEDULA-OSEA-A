# Becker Lab

> Inmunología • Vacunación • Decisión Clínica
> *"Comprende la inmunidad. Aplica el esquema. Toma decisiones."*

Plataforma educativa que fusiona **Becker Lab** (laboratorio interactivo de inmunología y vacunación) con **Vax Arena** (competencia clínica en tiempo real) en una sola experiencia: aprender → competir → detectar debilidades → volver a aprender.

**Estado actual: Fase 1 (Fundamentos) + parte de Fase 2 (Becker Lab), completas y funcionando.** El resto está planeado en fases, con placeholders honestos en la app (nunca enlaces muertos) que explican exactamente qué falta y por qué.

---

## ⚠️ Regla de contenido (léela antes de tocar `src/lib/content.ts`)

Todo el contenido médico de este proyecto proviene **exclusivamente** de dos documentos:

1. `evidencia_vacunacion_mexico_2026.html` — esquema nacional, KPIs, inmunología, poblaciones especiales, matriz de literatura.
2. `INMUNIZACIONES_Y_ENVM-2.pdf` — hematopoyesis, inmunología general, tipos de vacuna, normativa de banco de sangre.

Donde algo que el diseño original pedía **no** aparece en ninguno de los dos, el valor es literalmente el string `UNAVAILABLE` (`"[CONTENIDO NO DISPONIBLE EN LA INVESTIGACIÓN]"`), definido en `src/lib/content.ts`. **No reemplaces un `UNAVAILABLE` con conocimiento general sin decírselo explícitamente al autor del proyecto** — ver `VAXLAB_ARQUITECTURA_CONTENIDO.md` para el razonamiento completo, incluida una discrepancia real entre las dos fuentes (ventana de reinicio de vacunas inactivadas post-trasplante: 3-6 meses según el HTML, 6-12 meses según el PDF) que se muestra, no se resuelve en silencio.

**Excepción autorizada — tag `"BIBLIOGRAFÍA"`:** por pedido explícito del autor del proyecto, dos huecos puntuales se rellenaron con bibliografía médica estándar (no con las dos fuentes originales): el comparador **Inmunización activa vs. pasiva** (`/immunology`) y el esquema geriátrico de **Adulto mayor** (`/mexico-schedule`). Ambos están marcados en toda la UI con `SourceBadge` de borde punteado rojo y el ícono 📚, distinto de los badges sólidos de HTML/PDF, precisamente para que nunca se confundan con un dato oficial mexicano verificado en la investigación.

---

## 1. Arquitectura

- **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4** (tokens vía `@theme`/CSS variables en `globals.css`, no `tailwind.config.js`).
- **Una sola fuente de verdad de contenido**: `src/lib/content.ts` — todo dato médico vive ahí, tipado, con su `source: "HTML" | "PDF" | "HTML+PDF" | "BIBLIOGRAFÍA"`. Ninguna página tiene strings médicos hardcodeados fuera de este archivo.
- **Componentes de UI reutilizables**: `src/components/ui/` (Button, Card, Badge/SourceBadge).
- **Framer Motion** para la animación de la red molecular del hero (respeta `prefers-reduced-motion`).
- **Supabase** (`@supabase/supabase-js`) para Fase 4 en adelante (Vax Arena en tiempo real) — el esquema SQL ya está escrito, pero el cliente aún no está conectado a un proyecto real (ver sección 6).

### Sitemap implementado

| Ruta | Estado |
|---|---|
| `/` | ✅ Completo — hero, Learn/Arena mode, módulos, KPIs |
| `/learn` | ✅ Completo — hub de módulos |
| `/immunology` | ✅ Completo — cascada interactiva + comparador innata/adaptativa |
| `/vaccines` | ✅ Completo — 2 tarjetas (atenuadas, inactivadas) |
| `/mexico-schedule` | ✅ Completo — Life Course Map + Modo "sigue a un paciente" |
| `/about` | ✅ Completo — fuentes, metodología, glosario, disclaimer |
| `/memory-simulator` | 🟡 Placeholder — Fase 2 |
| `/microlabs` | 🟡 Placeholder — Fase 2 |
| `/clinical` | 🟡 Placeholder — Fase 3 |
| `/arena`, `/arena/join`, `/arena/waiting`, `/arena/game`, `/arena/results` | 🟡 Placeholder — Fase 4 (requiere Supabase) |
| `/leaderboard` | 🟡 Placeholder — Fase 4-5 |
| `/profile` | 🟡 Placeholder — Fase 5-6 |
| `/admin`, `/admin/questions`, `/admin/game` | 🟡 Placeholder — Fase 5 (requiere Supabase Auth) |

### Flujo de usuario (diseñado, parcialmente implementado)

```
ENTRA → EXPLORA (Learn Mode) → COMPRENDE (Immunology/Vaccines) → PRACTICA (Microlabs)
→ RESUELVE CASOS (Clinical Lab) → ENTRA A VAX ARENA → COMPITE → RECIBE RESULTADOS
→ IDENTIFICA DEBILIDADES (Smart Review) → REGRESA AL MÓDULO CORRESPONDIENTE
```

---

## 2. Fases restantes (sin saltarse ninguna, sin simplificar el producto)

| Fase | Contenido | Requiere Supabase |
|---|---|---|
| ✅ 1 — Fundamentos | Next.js, design system, navegación, Home | No |
| 🟡 2 — Becker Lab | Inmunología/Vacunas/México (listos) + Simulador de Memoria + Microlabs (pendientes) | No |
| ⬜ 3 — Clinical Lab | Casos clínicos (caso ancla: protocolo HSCT) | No |
| ⬜ 4 — Vax Arena | Join/Waiting/Game/Results, cronómetro server-side, scoring, intento único | **Sí** |
| ⬜ 5 — Realtime + Admin | Supabase Realtime, Control Room, CRUD de preguntas, QR | **Sí** |
| ⬜ 6 — Polish | Accesibilidad fina, animaciones de transición, auditoría responsive | No |

---

## 3. Instalación y ejecución local

Requiere Node.js 18.18+ (se construyó y probó con Node 22).

```bash
cd vaxlab-mexico
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). También puedes compilar y correr en modo producción:

```bash
npm run build
npm run start
```

---

## 4. Variables de entorno

Copia `.env.local.example` a `.env.local` y rellena con las llaves de **tu propio** proyecto de Supabase (ver sección 6):

```bash
cp .env.local.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...   # solo servidor, nunca al cliente
```

La app funciona sin estas variables para todo lo que ya está implementado (Fases 1-3); solo son necesarias a partir de Fase 4.

---

## 5. Publicar en Vercel

1. Sube este proyecto a un repositorio de GitHub (nuevo, propio).
2. En [vercel.com/new](https://vercel.com/new), importa el repositorio.
3. Framework preset: **Next.js** (detectado automáticamente).
4. En "Environment Variables", agrega las tres variables de la sección 4 (cuando tengas tu proyecto de Supabase).
5. Deploy. Cada push a la rama principal vuelve a desplegar automáticamente.

---

## 6. Conectar tu propio proyecto de Supabase (necesario desde Fase 4)

Yo no puedo crear esta cuenta por ti — requiere tu propio correo/login.

1. Crea una cuenta gratuita en [supabase.com](https://supabase.com) → "New Project".
2. Copia la **Project URL** y la **anon public key** desde *Project Settings → API* → pégalas en `.env.local`.
3. Copia también la **service_role key** (sección *Project API keys*, marcada como secreta) → `SUPABASE_SERVICE_ROLE_KEY`. **Nunca la expongas con el prefijo `NEXT_PUBLIC_`.**
4. En el *SQL Editor* de Supabase, ejecuta en orden:
   - `supabase/schema.sql` (tablas, tipos, RLS, vista pública)
   - `supabase/seed.sql` (26 preguntas reales, ya verificadas, con `source_reference`)
5. En *Database → Replication*, habilita Realtime para las tablas `games`, `attempts` y `answers`.

---

## 7. Cómo entrar al panel de profesor (cuando exista, Fase 5)

`/admin` quedará protegido con Supabase Auth (email/contraseña o magic link). El primer usuario administrador se crea manualmente desde el dashboard de Supabase (*Authentication → Users → Add user*) y se marca como profesor con una columna `role` en una tabla `admins` (a diseñar en Fase 5).

## 8. Cómo añadir o modificar preguntas

- **Ahora (Fase 1-3):** edita directamente `supabase/seed.sql` (o inserta filas en la tabla `questions` desde el SQL Editor de Supabase una vez creado tu proyecto). Cada pregunta **debe** llevar `source_reference` citando de dónde sale.
- **A partir de Fase 5:** desde `/admin/questions`, con un formulario CRUD completo.

## 9. Generar el código QR

Aún no implementado en la UI (es trivial una vez que `/arena/join` tenga una URL pública real). Mientras tanto, puedes generar uno gratis en [qr-code-generator.com](https://www.qr-code-generator.com) apuntando a `https://TU-DOMINIO.vercel.app/arena/join`, o instalar el paquete `qrcode` (`npm install qrcode`) cuando lleguemos a Fase 5 para generarlo dentro de `/admin/game`.

---

## 10. Stack

Next.js 16 · TypeScript · React 19 · Tailwind CSS v4 · Framer Motion · Lucide Icons · Supabase (`supabase-js`) · clsx + tailwind-merge.

Sin dependencias innecesarias: no se agregó ningún componente de UI pesado (shadcn/ui, Radix, etc.) — los primitivos de `src/components/ui/` son intencionalmente simples y ya cumplen la identidad visual pedida (glassmorphism moderado, bordes luminosos discretos, microinteracciones).
