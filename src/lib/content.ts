/**
 * ÚNICA FUENTE DE VERDAD DE CONTENIDO MÉDICO.
 *
 * Todo lo exportado aquí proviene literalmente de:
 *  - [HTML] evidencia_vacunacion_mexico_2026.html
 *  - [PDF]  INMUNIZACIONES_Y_ENVM-2.pdf
 *  - [BIBLIOGRAFÍA] ampliación bibliográfica estándar, autorizada explícitamente
 *    por el autor del proyecto para los dos huecos reales de la investigación
 *    (Activa vs. Pasiva, Adulto Mayor). Siempre citada y renderizada con su
 *    propio distintivo visual — nunca mezclada en silencio con HTML/PDF.
 *
 * Nada en este archivo fue inventado sin decirlo. Donde ni la investigación
 * ni la bibliografía cubren algo que el diseño original pedía, el valor es
 * UNAVAILABLE. Ver VAXLAB_ARQUITECTURA_CONTENIDO.md para el razonamiento completo.
 */

export const UNAVAILABLE = "[CONTENIDO NO DISPONIBLE EN LA INVESTIGACIÓN]";

export type SourceTag = "HTML" | "PDF" | "HTML+PDF" | "BIBLIOGRAFÍA";

export interface ImmunologyStage {
  id: string;
  order: number;
  title: string;
  shortLabel: string;
  explanation: string;
  whyItMatters: string;
  source: SourceTag;
}

export const IMMUNOLOGY_CASCADE: ImmunologyStage[] = [
  {
    id: "antigeno",
    order: 1,
    title: "Antígeno",
    shortLabel: "Antígeno",
    explanation:
      "Un antígeno vacunal (atenuado, inactivado, de ARNm o subunidades proteicas) ingresa al organismo.",
    whyItMatters:
      "Es el punto de partida artificial y controlado: se expone al sistema inmune a un antígeno sin que el paciente sufra la enfermedad real.",
    source: "PDF",
  },
  {
    id: "presentacion",
    order: 2,
    title: "Presentación / Reconocimiento",
    shortLabel: "Presentación",
    explanation:
      "Las células dendríticas (APCs) capturan y procesan el antígeno, presentando péptidos vía CMH-I (para linfocitos CD8+ citotóxicos) o CMH-II (para linfocitos CD4+ cooperadores).",
    whyItMatters:
      "La vía de presentación (CMH-I vs. CMH-II) determina qué tipo de linfocito T se activará — es la decisión que distingue inmunidad citotóxica de inmunidad cooperadora.",
    source: "PDF",
  },
  {
    id: "activacion",
    order: 3,
    title: "Activación inmunitaria",
    shortLabel: "Activación",
    explanation:
      "En los ganglios linfáticos, la cooperación T-B en los centros germinales induce la maduración de la afinidad y el cambio de clase isotípica (de IgM a IgG, IgA o IgE).",
    whyItMatters:
      "Sin esta cooperación T-B, la respuesta de anticuerpos sería de baja afinidad y de vida corta — los centros germinales son donde se 'perfecciona' la respuesta.",
    source: "PDF",
  },
  {
    id: "efectora",
    order: 4,
    title: "Respuesta efectora",
    shortLabel: "Efectora",
    explanation:
      "Expansión clonal mediada por células dendríticas y cooperación T-B; linfocitos T CD4+/CD8+ y anticuerpos neutralizantes actúan contra el antígeno.",
    whyItMatters:
      "Esta es la fase que el cuerpo usaría para combatir la infección real si ocurriera — la vacuna la produce sin el daño de la enfermedad.",
    source: "PDF",
  },
  {
    id: "memoria",
    order: 5,
    title: "Memoria inmunológica",
    shortLabel: "Memoria",
    explanation:
      "Se generan células plasmáticas de larga vida y linfocitos B/T de memoria, que se alojan en el nicho óseo (médula ósea) y otros tejidos.",
    whyItMatters:
      "La memoria es lo que distingue una vacuna de un tratamiento puntual: el organismo 'recuerda' el antígeno durante meses o años.",
    source: "HTML+PDF",
  },
  {
    id: "secundaria",
    order: 6,
    title: "Respuesta secundaria",
    shortLabel: "2ª Respuesta",
    explanation:
      "Ante una reexposición (infección real o refuerzo vacunal), la respuesta es más rápida y de mayor magnitud. Ejemplo documentado: la inmunidad híbrida (infección previa + vacuna) sostiene >95% de efectividad contra hospitalización por COVID-19 a los 11 meses.",
    whyItMatters:
      "Es la base de por qué existen los esquemas de refuerzo y por qué la inmunidad híbrida supera a la de una sola fuente (solo infección o solo vacuna).",
    source: "HTML",
  },
];

export const INNATE_VS_ADAPTIVE = {
  innata: {
    title: "Inmunidad innata",
    description:
      "Respuesta biológica veloz y carente de especificidad frente a la invasión de microorganismos patógenos. Funciona como la principal barrera protectora anatómica y fisiológica: superficies epiteliales, células fagocíticas (macrófagos y neutrófilos) y el sistema de complemento, aislando y destruyendo infecciones en sus primeras etapas antes de que se active una respuesta más compleja.",
    clinicalNote:
      "La migración de leucocitos desde el flujo sanguíneo hacia los tejidos dañados permite la digestión de bacterias y la secreción de sustancias proinflamatorias — indispensable para frenar la septicemia.",
    source: "PDF" as SourceTag,
  },
  adaptativa: {
    title: "Inmunidad adquirida (adaptativa)",
    description:
      "Se caracteriza por su precisión molecular extrema y su habilidad única para establecer memoria inmunológica permanente: identifica antígenos exactos y organiza un ataque celular más agresivo y sostenido ante cualquier reinfección por el mismo patógeno, orquestado por la maduración de linfocitos T y B y la secreción de anticuerpos específicos.",
    clinicalNote:
      "Se origina en órganos linfoides primarios (timo, médula ósea). Fallas en la maduración de estas células precursoras son responsables directas de inmunodeficiencias graves o patologías autoinmunes.",
    source: "PDF" as SourceTag,
  },
};

export interface VaccineTypeCard {
  id: string;
  type: string;
  mechanism: string;
  precaution: string;
  source: SourceTag;
}

export interface ActivePassiveSide {
  title: string;
  origin: string;
  timeToProtection: string;
  memory: string;
  duration: string;
  examples: string;
  source: SourceTag;
}

/**
 * Módulo 2 — Activa vs. Pasiva.
 * Ninguno de los dos documentos define este eje de clasificación con ejemplos
 * y duración comparada (ver arquitectura de contenido). Autorizado por el
 * autor del proyecto a completarse con bibliografía estándar (Abbas, 2020),
 * EXCEPTO el ejemplo de inmunoglobulina anti-D, que sí aparece literalmente
 * en el PDF (NOM-253) y se cita como tal.
 */
export const ACTIVE_VS_PASSIVE: { activa: ActivePassiveSide; pasiva: ActivePassiveSide } = {
  activa: {
    title: "Inmunización activa",
    origin: "El propio sistema inmune del paciente genera la respuesta, tras exponerse a un antígeno (vacuna o infección natural).",
    timeToProtection: "Lenta en aparecer (días a semanas) — requiere activación, expansión clonal y maduración de la respuesta.",
    memory: "Sí: genera células B/T de memoria, alojadas en el nicho óseo.",
    duration: "Prolongada — meses, años, a veces de por vida, gracias a la memoria inmunológica.",
    examples: "Todas las vacunas del esquema mexicano (BCG, Hexavalente, SRP, VPH, etc.).",
    source: "BIBLIOGRAFÍA",
  },
  pasiva: {
    title: "Inmunización pasiva",
    origin: "Transferencia directa de anticuerpos ya formados, de una fuente externa al paciente — el paciente no produce su propia respuesta.",
    timeToProtection: "Inmediata — protección disponible desde el momento de la administración.",
    memory: "No: al no activarse el propio sistema inmune, no se generan células de memoria.",
    duration: "Transitoria — dura lo que la vida media de los anticuerpos transferidos (semanas a meses).",
    examples: "Profilaxis con inmunoglobulina anti-D en mujeres Rh negativo, para evitar la aloinmunización materno-fetal (ejemplo citado literalmente en la investigación, NOM-253-SSA1-2012).",
    source: "PDF",
  },
};

export const VACCINE_TYPES: VaccineTypeCard[] = [
  {
    id: "atenuadas",
    type: "Virus atenuados",
    mechanism:
      "Infección subclínica que estimula una inmunidad celular y humoral robusta.",
    precaution:
      "Contraindicadas en inmunodepresión severa o en el periodo post-trasplante de progenitores hematopoyéticos (TPH) reciente, por riesgo de infección sistémica descontrolada.",
    source: "PDF",
  },
  {
    id: "inactivadas",
    type: "Inactivadas / Subunidades",
    mechanism:
      "Presentación antigénica exógena al complejo mayor de histocompatibilidad (CMH-II).",
    precaution:
      "Seguras incluso en pacientes hematopoyéticos, aunque pueden requerir refuerzos adicionales por una respuesta inmune disminuida.",
    source: "PDF",
  },
];

export type LifeStageId =
  | "nacimiento"
  | "lactante"
  | "infancia"
  | "adolescencia"
  | "adulto"
  | "adulto_mayor"
  | "grupos_especiales";

export interface LifeStage {
  id: LifeStageId;
  label: string;
  ageRange: string;
  icon: string;
}

export const LIFE_STAGES: LifeStage[] = [
  { id: "nacimiento", label: "Nacimiento", ageRange: "Al nacer", icon: "baby" },
  { id: "lactante", label: "Lactante", ageRange: "2, 4 y 6 meses", icon: "milk" },
  { id: "infancia", label: "Infancia", ageRange: "12 y 18 meses", icon: "footprints" },
  { id: "adolescencia", label: "Adolescencia", ageRange: "10-14 años", icon: "graduation-cap" },
  { id: "adulto", label: "Adulto", ageRange: "Refuerzos / campañas", icon: "user" },
  { id: "adulto_mayor", label: "Adulto mayor", ageRange: "60+ años (bibliografía)", icon: "user-round" },
  { id: "grupos_especiales", label: "Grupos especiales", ageRange: "Post-trasplante (TPH)", icon: "shield-alert" },
];

export interface VaccineEntry {
  id: string;
  stage: LifeStageId;
  vaccine: string;
  protectsAgainst: string;
  ageOrDose: string;
  booster: string;
  clinicalNote: string;
  coverage?: { value: string; label: string };
  source: SourceTag;
  conflictingSource?: string;
}

export const NATIONAL_SCHEDULE: VaccineEntry[] = [
  {
    id: "bcg",
    stage: "nacimiento",
    vaccine: "BCG",
    protectsAgainst: "Tuberculosis meníngea",
    ageOrDose: "Dosis única, al nacer",
    booster: "—",
    clinicalNote: "—",
    source: "HTML",
  },
  {
    id: "hepb-neonatal",
    stage: "nacimiento",
    vaccine: "Hepatitis B",
    protectsAgainst: "Hepatitis B",
    ageOrDose: "Dosis neonatal",
    booster: "—",
    clinicalNote: "—",
    source: "HTML",
  },
  {
    id: "hexavalente",
    stage: "lactante",
    vaccine: "Hexavalente acelular",
    protectsAgainst: "Difteria, tos ferina, tétanos, Hib, hepatitis B, poliomielitis",
    ageOrDose: "3 dosis: 2, 4 y 6 meses",
    booster: "—",
    clinicalNote: "Cobertura nacional por debajo del umbral óptimo de 95%.",
    coverage: { value: "84.2%", label: "Cobertura nacional" },
    source: "HTML",
  },
  {
    id: "rotavirus",
    stage: "lactante",
    vaccine: "Rotavirus",
    protectsAgainst: "Gastroenteritis por rotavirus",
    ageOrDose: "Esquema de 2 y 4 (y 6, según presentación) meses",
    booster: "—",
    clinicalNote: "—",
    source: "HTML",
  },
  {
    id: "neumococo-1-2",
    stage: "lactante",
    vaccine: "Neumococo conjugada",
    protectsAgainst: "Enfermedad neumocócica",
    ageOrDose: "1ª dosis (2 m) y 2ª dosis (4 m)",
    booster: "Refuerzo a los 12 meses",
    clinicalNote: "—",
    source: "HTML",
  },
  {
    id: "srp-1",
    stage: "infancia",
    vaccine: "SRP (triple viral) — 1ª dosis",
    protectsAgainst: "Sarampión, rubéola, parotiditis",
    ageOrDose: "12 meses",
    booster: "2ª dosis obligatoria a los 18 meses",
    clinicalNote:
      "Cobertura nacional de 1ª dosis: 79.9% (meta OMS/nacional: 95%). Esta brecha motivó campañas de recuperación en 2026.",
    coverage: { value: "79.9%", label: "Cobertura SRP1 (meta 95%)" },
    source: "HTML",
  },
  {
    id: "srp-2",
    stage: "infancia",
    vaccine: "SRP (triple viral) — 2ª dosis",
    protectsAgainst: "Sarampión, rubéola, parotiditis",
    ageOrDose: "18 meses",
    booster: "Refuerzo obligatorio de la 1ª dosis",
    clinicalNote: "—",
    source: "HTML",
  },
  {
    id: "neumococo-refuerzo",
    stage: "infancia",
    vaccine: "Neumococo conjugada — refuerzo",
    protectsAgainst: "Enfermedad neumocócica",
    ageOrDose: "12 meses",
    booster: "—",
    clinicalNote: "—",
    source: "HTML",
  },
  {
    id: "vph",
    stage: "adolescencia",
    vaccine: "VPH",
    protectsAgainst: "Virus del papiloma humano",
    ageOrDose: "Niñas de 10-14 años / 5º de primaria",
    booster: UNAVAILABLE,
    clinicalNote:
      "Las estrategias de dosis única o esquemas simplificados en escuelas lograron adherencia de >80% en cohortes urbanas mexicanas (Soto-De León et al., 2023).",
    coverage: { value: "82%", label: "Adherencia en cohortes urbanas" },
    source: "HTML",
  },
  {
    id: "td-tdap",
    stage: "adulto",
    vaccine: "Td / Tdap",
    protectsAgainst: "Tétanos, difteria (Tdap incluye tos ferina)",
    ageOrDose: "Refuerzos periódicos; indicada en mujeres embarazadas",
    booster: UNAVAILABLE,
    clinicalNote: "—",
    source: "HTML",
  },
  {
    id: "campana-invernal",
    stage: "adulto",
    vaccine: "Influenza + COVID-19 + Neumococo (campaña combinada)",
    protectsAgainst: "Influenza estacional, COVID-19, enfermedad neumocócica",
    ageOrDose: "Campaña invernal anual",
    booster: "—",
    clinicalNote:
      "Más de 16.5 millones de dosis distribuidas por el IMSS, priorizando grupos vulnerables y adultos mayores (sin ficha individualizada por vacuna/edad para adulto mayor en la investigación).",
    coverage: { value: ">16.5M", label: "Dosis distribuidas (IMSS)" },
    source: "HTML",
  },
  {
    id: "adulto-mayor-influenza",
    stage: "adulto_mayor",
    vaccine: "Influenza (inactivada)",
    protectsAgainst: "Influenza estacional",
    ageOrDose: "1 dosis anual",
    booster: "Anual, cada temporada",
    clinicalNote:
      "La investigación no incluye una ficha de esquema geriátrico propia; esta entrada resume el principio general de inmunosenescencia (declive de la respuesta inmune con la edad) y las vacunas habitualmente recomendadas en el adulto mayor según bibliografía estándar de inmunización. No son cifras ni esquema oficial mexicano.",
    source: "BIBLIOGRAFÍA",
  },
  {
    id: "adulto-mayor-neumococo",
    stage: "adulto_mayor",
    vaccine: "Neumocócica (conjugada y/o polisacárida 23-valente)",
    protectsAgainst: "Enfermedad neumocócica invasiva y neumonía",
    ageOrDose: "Según esquema del país/institución",
    booster: UNAVAILABLE,
    clinicalNote:
      "Recomendación general por inmunosenescencia, tomada de bibliografía estándar de inmunización geriátrica, no de la investigación original.",
    source: "BIBLIOGRAFÍA",
  },
  {
    id: "adulto-mayor-rzv",
    stage: "adulto_mayor",
    vaccine: "Herpes zóster (RZV recombinante)",
    protectsAgainst: "Herpes zóster y neuralgia postherpética",
    ageOrDose: "Habitualmente desde los 50-60 años, 2 dosis",
    booster: "—",
    clinicalNote:
      "La investigación sí reporta la efectividad de RZV (68.2%), pero únicamente en el contexto de receptores de trasplante hematopoyético (ver 'Grupos especiales'), no como recomendación general del adulto mayor. Esta ficha extiende la indicación a población geriátrica general por bibliografía estándar.",
    source: "BIBLIOGRAFÍA",
  },
  {
    id: "adulto-mayor-tdap",
    stage: "adulto_mayor",
    vaccine: "Td / Tdap — refuerzo",
    protectsAgainst: "Tétanos, difteria (Tdap incluye tos ferina)",
    ageOrDose: "Refuerzo cada 10 años",
    booster: "—",
    clinicalNote: "Continuación del esquema de refuerzos del adulto; mismo principio, bibliografía estándar.",
    source: "BIBLIOGRAFÍA",
  },
  {
    id: "hsct-inactivadas",
    stage: "grupos_especiales",
    vaccine: "Inactivadas (Influenza, COVID-19, Neumococo conjugada, Hexavalente/Tdap)",
    protectsAgainst: "Según biológico",
    ageOrDose: "Inicio a los 3-6 meses post-trasplante",
    booster: "—",
    clinicalNote:
      "Las APCs están en fase de reactivación en esta ventana post-trasplante.",
    source: "HTML",
    conflictingSource:
      "El PDF reporta un rango ligeramente distinto para el reinicio de inactivadas: \"6 a 12 meses posteriores al trasplante, una vez recuperada la subpoblación linfocitaria CD4+\" (Sánchez Guijo, 2020). Ambos valores se muestran porque ninguna de las dos fuentes se descarta por sí sola.",
  },
  {
    id: "hsct-rzv",
    stage: "grupos_especiales",
    vaccine: "RZV (Herpes Zóster recombinante)",
    protectsAgainst: "Herpes zóster / neuralgia postherpética",
    ageOrDose: "6-12 meses post-trasplante",
    booster: "—",
    clinicalNote: "Efectividad demostrada en receptores HSCT.",
    coverage: { value: "68.2%", label: "Efectividad en HSCT (Silva-Pinto et al., 2024)" },
    source: "HTML",
  },
  {
    id: "hsct-vivos",
    stage: "grupos_especiales",
    vaccine: "Virus vivos atenuados (SRP / Varicela)",
    protectsAgainst: "Sarampión, rubéola, parotiditis / Varicela",
    ageOrDose: "Solo después de 24 meses post-trasplante",
    booster: "—",
    clinicalNote:
      "Únicamente indicadas tras la suspensión total de inmunosupresores y en ausencia de enfermedad injerto contra huésped (EICH) activa. Consistente con la Tabla 2 del PDF: los vivos atenuados están contraindicados en inmunodepresión severa o post-TPH reciente.",
    source: "HTML+PDF",
  },
];

export const PATIENT_JOURNEY = [
  "Nacimiento — BCG + Hepatitis B",
  "2 meses — Hexavalente (1ª) + Rotavirus + Neumococo (1ª)",
  "4 meses — Hexavalente (2ª) + Rotavirus + Neumococo (2ª)",
  "6 meses — Hexavalente (3ª)",
  "12 meses — SRP (1ª) + Neumococo (refuerzo)",
  "18 meses — SRP (2ª, refuerzo obligatorio)",
  "10-14 años — VPH (si es niña)",
  "Adulto — Td/Tdap, campaña invernal (Influenza + COVID-19 + Neumococo)",
];

export interface KPI {
  id: string;
  label: string;
  value: string;
  description: string;
  citation: string;
  tone: "success" | "warning" | "neutral";
}

export const KPIS: KPI[] = [
  {
    id: "hibrida",
    label: "Inmunidad híbrida (11 meses)",
    value: ">95%",
    description: "Efectividad sostenida contra hospitalización por COVID-19 grave.",
    citation: "Bobrovitz et al., Lancet Infect Dis (2023)",
    tone: "success",
  },
  {
    id: "srp",
    label: "Cobertura SRP1 México",
    value: "79.9%",
    description: "Meta oficial: 95.0%. Brecha que motivó campañas de recuperación en 2026.",
    citation: "Informes de Salud, Cámara de Diputados (2026)",
    tone: "warning",
  },
  {
    id: "ra",
    label: "Seroconversión en Artritis Reumatoide",
    value: "88.1%",
    description: "Respuesta humoral efectiva pese al uso de inmunomoduladores.",
    citation: "Estudios en Inmunocomprometidos (2024)",
    tone: "success",
  },
  {
    id: "rzv",
    label: "Efectividad RZV post-HSCT",
    value: "68.2%",
    description: "Vacuna recombinante contra Herpes Zóster en receptores de trasplante.",
    citation: "Vaccines / Silva-Pinto et al. (2024-2025)",
    tone: "neutral",
  },
  {
    id: "hexa",
    label: "Cobertura Hexavalente",
    value: "84.2%",
    description: "Protección colectiva frente a poliomielitis y difteria, bajo el umbral de 95%.",
    citation: "HTML — Evidencia Vacunación México 2026",
    tone: "warning",
  },
  {
    id: "jn1",
    label: "Refuerzo actualizado vs. JN.1",
    value: "+54%",
    description: "Protección incremental contra infección sintomática frente a no vacunados.",
    citation: "Link-Gelles et al., MMWR/CDC (2024)",
    tone: "success",
  },
];

export interface LiteratureItem {
  year: string;
  title: string;
  authors: string;
  journal: string;
  type: string;
  category: "Memoria" | "COVID-19" | "Trasplante" | "México";
  population: string;
  findings: string;
  slideQuote: string;
  doi: string;
  star: boolean;
}

export const LITERATURE: LiteratureItem[] = [
  {
    year: "2023", star: true,
    title: "Protective effectiveness of previous SARS-CoV-2 infection and hybrid immunity",
    authors: "Bobrovitz N. et al.", journal: "Lancet Infect Dis",
    type: "Revisión Sistemática / Metaanálisis", category: "Memoria",
    population: "Global (cohorte multipaís)",
    findings: "La inmunidad híbrida (infección + vacuna) confirió protección sostenida >95% contra hospitalización o enfermedad severa a los 11 meses.",
    slideQuote: "Inmunidad híbrida otorga >95% de protección severa a 11 meses post-vacunación.",
    doi: "10.1016/S1473-3099(22)00801-5",
  },
  {
    year: "2025", star: true,
    title: "Vaccination coverage and guidelines in hematopoietic stem cell transplant patients",
    authors: "Bouzas-Rodríguez A. et al.", journal: "Vaccines",
    type: "Estudio Observacional / Guía", category: "Trasplante",
    population: "Receptores de trasplante de células madre (HSCT)",
    findings: "Identifica brechas de adherencia en el reinicio de esquemas vacunales tras la reconstitución inmunológica.",
    slideQuote: "El reinicio vacunal post-trasplante debe iniciar a los 3-6 meses tras la pérdida de memoria previa.",
    doi: "10.3390/vaccines13030257",
  },
  {
    year: "2024", star: false,
    title: "Vaccination after haematopoietic stem cell transplant: a systematic review",
    authors: "Silva-Pinto A. et al.", journal: "Vaccines",
    type: "Revisión Sistemática", category: "Trasplante",
    population: "Pacientes post-HSCT adulto y pediátrico",
    findings: "Efectividad del 68.2% para la vacuna recombinante contra Herpes Zóster (RZV).",
    slideQuote: "68.2% de efectividad de la vacuna RZV en pacientes con reconstitución hematopoyética.",
    doi: "10.3390/vaccines12121449",
  },
  {
    year: "2024", star: true,
    title: "Effectiveness and Safety of the COVID-19 Vaccine in Patients with Rheumatoid Arthritis",
    authors: "González-Serna et al.", journal: "Rheumatology Clinical Studies",
    type: "Estudio de Cohorte Retrospectivo", category: "COVID-19",
    population: "Pacientes inmunocomprometidos con Artritis Reumatoide",
    findings: "88.1% de los pacientes desarrollaron respuesta de anticuerpos suficiente.",
    slideQuote: "88.1% de seroconversión positiva en Artritis Reumatoide tras esquema vacunal.",
    doi: "10.1016/j.jaut.2024.10321",
  },
  {
    year: "2024", star: false,
    title: "Early estimates of updated 2023-2024 COVID-19 vaccine effectiveness",
    authors: "Link-Gelles R. et al.", journal: "MMWR / CDC",
    type: "Estudio de Cohorte Epidemiológico", category: "COVID-19",
    population: "Población general expuesta a linaje JN.1",
    findings: "Las dosis de refuerzo actualizadas brindaron un 54% de protección incremental.",
    slideQuote: "Refuerzo actualizado incrementa 54% la protección contra infección sintomática.",
    doi: "10.15585/mmwr.mm7304a2",
  },
  {
    year: "2023", star: false,
    title: "The Emergence of Hybrid Variants of SARS-CoV-2: Towards Hybrid Immunity",
    authors: "Chavda V.P. et al.", journal: "Vaccines",
    type: "Revisión Narrativa Inmunológica", category: "Memoria",
    population: "Modelado inmunológico de células B y T",
    findings: "Demuestra la activación coordinada de APCs y la selección clonal en centros germinales.",
    slideQuote: "La vacunación optimiza la calidad de las células B de memoria en el nicho de médula ósea.",
    doi: "10.3390/vaccines11040764",
  },
  {
    year: "2024", star: true,
    title: "Informe Nacional de Cobertura Vacunal y Sarampión en México",
    authors: "Secretaría de Salud / CeNSIA", journal: "Gaceta de Salud México",
    type: "Informe Epidemiológico Oficial", category: "México",
    population: "Población infantil mexicana",
    findings: "Cobertura de SRP1 en 79.9%, con campañas prioritarias de recuperación en 2026.",
    slideQuote: "Cobertura SRP1 en México de 79.9%; meta nacional de 95%.",
    doi: "https://www.gob.mx/salud/censia",
  },
  {
    year: "2023", star: false,
    title: "HPV Vaccination Coverage and Herd Protection in Latin America",
    authors: "Soto-De León S. et al.", journal: "Pan Am J Public Health",
    type: "Estudio Transversal", category: "México",
    population: "Adolescentes femeninas (10-14 años)",
    findings: "Las estrategias de dosis única o esquemas simplificados de VPH en escuelas mejoraron la adherencia al 82%.",
    slideQuote: "Vacunación escolar contra VPH logra esquemas completos en >80% de adolescentes evaluadas.",
    doi: "10.26633/RPSP.2023.45",
  },
  {
    year: "2022", star: false,
    title: "Durability of B cell and T cell immune memory after vaccination",
    authors: "Sette A., Crotty S.", journal: "Nat Rev Immunol",
    type: "Revisión Inmunológica", category: "Memoria",
    population: "Modelos humanos inmunológicos",
    findings: "Las células T CD4+ y CD8+ de memoria permanecen estables por más de 12 meses.",
    slideQuote: "Células T de memoria perduran estables >12 meses y previenen enfermedad grave.",
    doi: "10.1038/s41577-021-00650-8",
  },
];

export const HSCT_PROTOCOL = [
  {
    window: "3 a 6 meses",
    title: "Inicio de biológicos inactivados",
    detail:
      "Vacunas inactivadas contra Influenza, COVID-19, Neumococo conjugada y Hexavalente/Tdap. Las APCs están en reactivación.",
  },
  {
    window: "6 a 12 meses",
    title: "Vacuna recombinante Herpes Zóster (RZV)",
    detail: "Efectividad demostrada del 68.2% para prevenir neuralgia postherpética y reactivación viral.",
  },
  {
    window: ">24 meses",
    title: "Vacunas de virus vivos atenuados (SRP / Varicela)",
    detail:
      "Solo indicadas tras la suspensión total de inmunosupresores y ausencia de enfermedad injerto contra huésped (EICH).",
  },
];

export const GLOSSARY: { term: string; definition: string }[] = [
  { term: "Aloinmunización", definition: "Proceso inmunológico mediante el cual el organismo genera anticuerpos dirigidos contra antígenos extraños presentes en células de un donante compatible." },
  { term: "Célula Madre Hematopoyética (CMH)", definition: "Célula precursora pluripotencial dotada de capacidad de autorrenovación para sostener la producción sanguínea durante toda la vida." },
  { term: "Expansión Clonal", definition: "Multiplicación masiva y selectiva de un clon linfocitario específico tras el reconocimiento antigénico en los órganos linfoides secundarios." },
  { term: "Hemovigilancia", definition: "Conjunto de procedimientos de control y seguimiento estructurados para detectar, registrar y prevenir incidentes adversos en la cadena transfusional." },
  { term: "Inmunización", definition: "Inducción dirigida de una respuesta inmunitaria adaptativa y protectora frente a microorganismos mediante la administración de antígenos." },
  { term: "Opsonización", definition: "Marcaje de elementos patógenos con moléculas séricas para facilitar su reconocimiento y fagocitosis por parte de los fagocitos profesionales." },
  { term: "Nadir", definition: "Punto mínimo de descenso en las cuentas celulares sanguíneas posterior a la aplicación de quimioterapia o tratamientos mielosupresores." },
];

export interface VaccinationClinicalCase {
  id: string;
  vignette: string;
  question: string;
  options: string[];
  correct: number;
  explain: string;
  source: SourceTag;
}

/**
 * Casos clínicos de vacunación — protocolo HSCT. Mismas preguntas ya
 * verificadas de supabase/seed.sql (ronda "clinical"), reutilizadas aquí
 * para el Clinical Decision Lab fusionado con los casos de hematología.
 */
export const CLINICAL_CASES_VACCINATION: VaccinationClinicalCase[] = [
  {
    id: "vax-c1",
    vignette: "Un paciente recibió un trasplante de progenitores hematopoyéticos hace 4 meses.",
    question: "¿Qué tipo de vacunas puede empezar a recibir?",
    options: ["Virus vivos atenuados (SRP)", "Vacunas inactivadas (Influenza, COVID-19, Neumococo, Hexavalente/Tdap)", "Ninguna vacuna por 2 años", "Solo vacunas orales"],
    correct: 1,
    explain: "Entre 3 y 6 meses post-trasplante se inician las vacunas inactivadas; las APCs están en reactivación.",
    source: "HTML",
  },
  {
    id: "vax-c2",
    vignette: "El mismo paciente, a los 8 meses post-trasplante.",
    question: "¿Qué podría recibir adicionalmente?",
    options: ["SRP y Varicela (vivos atenuados)", "RZV (Herpes Zóster recombinante)", "Ninguna vacuna adicional", "BCG"],
    correct: 1,
    explain: "Entre 6 y 12 meses post-trasplante corresponde la vacuna RZV (68.2% de efectividad).",
    source: "HTML",
  },
  {
    id: "vax-c3",
    vignette: "El mismo paciente pregunta cuándo podría recibir finalmente SRP o Varicela.",
    question: "¿Cuándo podría recibir vacunas de virus vivos atenuados?",
    options: ["A los 6 meses", "Nunca", "Después de 24 meses, sin inmunosupresores y sin EICH activa", "A los 3 meses"],
    correct: 2,
    explain: "Los vivos atenuados solo se indican >24 meses post-trasplante, sin inmunosupresión y sin enfermedad injerto contra huésped.",
    source: "HTML+PDF",
  },
];

export const PROJECT_META = {
  name: "Becker Lab",
  tagline: "Inmunología • Vacunación • Decisión Clínica",
  conceptMessage: "Comprende la inmunidad. Aplica el esquema. Toma decisiones.",
  disclaimer:
    "Herramienta educativa. No sustituye recomendaciones clínicas oficiales ni valoración médica.",
  sources: [
    { label: "Evidencia Científica y Esquema Nacional de Vacunación México 2026", type: "HTML (archivo base)" },
    { label: "Inmunizaciones y ENVM", type: "PDF (hematopoyesis, inmunología general, NOM-253/NOM-EM-003)" },
    { label: "Londoño MA, Vallejo JM, Manzano AC. Rev Colomb Radiol. 2015;26(2):4206-12 — más bibliografía estándar de fisiología/hematología/inmunología (Guyton y Hall, Abbas, Ganong)", type: "BIBLIOGRAFÍA (módulo Hematología y Médula Ósea)" },
  ],
};
