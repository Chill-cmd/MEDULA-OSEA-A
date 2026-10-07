/**
 * Banco de preguntas de ARENA BECKER 1V1.
 *
 * Fusiona el banco ya verificado de Hematología (HEMATO_QUESTION_BANK, en
 * src/lib/hematologia.ts — médula ósea, hematopoyesis, eritrocitos,
 * leucocitos, monocitos, CPA/MHC) con preguntas nuevas de inmunización y
 * anticuerpos basadas en bibliografía estándar de inmunología (Abbas,
 * Guyton y Hall) y en el contenido de vacunación ya verificado en
 * src/lib/content.ts. Ningún dato es inventado: son hechos de fisiología
 * básica ampliamente establecidos en la literatura médica.
 */

import { HEMATO_QUESTION_BANK } from "@/lib/hematologia";

export type DuelTopic =
  | "Médula ósea"
  | "Hematopoyesis"
  | "Eritrocitos"
  | "Leucocitos"
  | "Monocitos/Macrófagos"
  | "CPA / MHC"
  | "Inmunización"
  | "Anticuerpos"
  | "Correlación clínica";

export interface DuelQuestion {
  id: string;
  topic: DuelTopic;
  stem: string;
  options: string[];
  correct: number;
  explain: string;
}

const TAG_TO_TOPIC: Record<string, DuelTopic> = {
  marrow: "Médula ósea",
  eryth: "Hematopoyesis",
  rbc: "Eritrocitos",
  wbc: "Leucocitos",
  mono: "Monocitos/Macrófagos",
  apc: "CPA / MHC",
};

const FROM_HEMATOLOGIA: DuelQuestion[] = HEMATO_QUESTION_BANK.map((q, i) => ({
  id: `hema-${i}`,
  topic: TAG_TO_TOPIC[q.tag] ?? "Correlación clínica",
  stem: q.stem,
  options: q.options,
  correct: q.correct,
  explain: q.explain,
}));

const NEW_QUESTIONS: DuelQuestion[] = [
  {
    id: "duel-epo-sitio",
    topic: "Hematopoyesis",
    stem: "¿Dónde se produce principalmente la eritropoyetina (EPO)?",
    options: ["Médula ósea", "Riñón", "Hígado", "Bazo"],
    correct: 1,
    explain: "La EPO se produce principalmente en células peritubulares del riñón; una fracción menor se produce en el hígado.",
  },
  {
    id: "duel-cpa-profesional",
    topic: "CPA / MHC",
    stem: "¿Cuál de las siguientes es una célula presentadora de antígeno (CPA) profesional?",
    options: ["Eritrocito", "Célula dendrítica", "Plaqueta", "Neutrófilo"],
    correct: 1,
    explain: "Las CPA profesionales son: células dendríticas, macrófagos y linfocitos B — expresan MHC I y II y moléculas coestimuladoras.",
  },
  {
    id: "duel-mhc1-cd",
    topic: "CPA / MHC",
    stem: "¿MHC I se asocia principalmente con linfocitos CD4+ o CD8+?",
    options: ["CD4+", "CD8+", "Con ambos por igual", "Con ninguno"],
    correct: 1,
    explain: "MHC I presenta péptidos endógenos a linfocitos T citotóxicos CD8+.",
  },
  {
    id: "duel-mhc2-antigeno",
    topic: "CPA / MHC",
    stem: "¿MHC II presenta antígenos exógenos o endógenos?",
    options: ["Exógenos", "Endógenos", "Ambos", "Ninguno"],
    correct: 0,
    explain: "MHC II presenta antígenos exógenos (fagocitados/endocitados) a linfocitos T colaboradores CD4+.",
  },
  {
    id: "duel-igg-placenta",
    topic: "Anticuerpos",
    stem: "¿Qué inmunoglobulina atraviesa la placenta?",
    options: ["IgM", "IgA", "IgG", "IgE"],
    correct: 2,
    explain: "IgG es la única inmunoglobulina que cruza la placenta, dando inmunidad pasiva transitoria al recién nacido.",
  },
  {
    id: "duel-igm-primaria",
    topic: "Anticuerpos",
    stem: "¿Qué inmunoglobulina se produce primero en una respuesta inmune primaria?",
    options: ["IgG", "IgM", "IgA", "IgD"],
    correct: 1,
    explain: "IgM es la primera en aparecer en la respuesta primaria, antes del cambio de clase a IgG/IgA/IgE.",
  },
  {
    id: "duel-iga-mucosas",
    topic: "Anticuerpos",
    stem: "¿Qué inmunoglobulina predomina en secreciones mucosas (saliva, leche materna, moco intestinal)?",
    options: ["IgA", "IgE", "IgG", "IgM"],
    correct: 0,
    explain: "IgA secretora es el anticuerpo predominante en las superficies mucosas.",
  },
  {
    id: "duel-ige-alergia",
    topic: "Anticuerpos",
    stem: "¿Qué inmunoglobulina participa en reacciones alérgicas y en la defensa antiparasitaria?",
    options: ["IgE", "IgG", "IgA", "IgM"],
    correct: 0,
    explain: "IgE se une a mastocitos y basófilos, mediando hipersensibilidad tipo I (alergias) y respuesta antiparasitaria.",
  },
  {
    id: "duel-plasmatica",
    topic: "Anticuerpos",
    stem: "¿Qué célula se diferencia en célula plasmática productora de anticuerpos?",
    options: ["Linfocito T", "Linfocito B", "Monocito", "Célula NK"],
    correct: 1,
    explain: "Tras activarse, el linfocito B se diferencia en célula plasmática secretora de anticuerpos.",
  },
  {
    id: "duel-activa-pasiva",
    topic: "Inmunización",
    stem: "¿Cuál es la diferencia principal entre inmunización activa y pasiva?",
    options: [
      "No hay diferencia real",
      "En la activa el propio organismo genera la respuesta; en la pasiva se transfieren anticuerpos ya formados",
      "La pasiva siempre genera memoria inmunológica",
      "La activa es siempre más rápida que la pasiva",
    ],
    correct: 1,
    explain: "Activa = el paciente produce su propia respuesta (memoria, pero lenta). Pasiva = se transfieren anticuerpos externos (inmediata, pero transitoria y sin memoria).",
  },
  {
    id: "duel-activa-memoria",
    topic: "Inmunización",
    stem: "¿Por qué la inmunización activa ofrece protección prolongada?",
    options: [
      "Porque los anticuerpos transferidos duran años",
      "Porque genera células B y T de memoria",
      "Porque no requiere refuerzos nunca",
      "Porque actúa en segundos",
    ],
    correct: 1,
    explain: "La inmunización activa genera linfocitos B/T de memoria de larga vida, la base de la protección duradera.",
  },
  {
    id: "duel-inactivada-mhc",
    topic: "Inmunización",
    stem: "Las vacunas inactivadas o de subunidades presentan el antígeno principalmente vía:",
    options: ["MHC I", "MHC II", "Receptor Fc", "Complemento"],
    correct: 1,
    explain: "El antígeno exógeno de las vacunas inactivadas/subunidades se procesa y presenta vía MHC II a linfocitos CD4+.",
  },
  {
    id: "duel-vivos-contraindicacion",
    topic: "Inmunización",
    stem: "¿Qué tipo de vacuna está contraindicada en inmunodepresión severa?",
    options: ["Inactivadas", "Virus vivos atenuados", "Subunidades proteicas", "Ninguna lo está"],
    correct: 1,
    explain: "Las vacunas de virus vivos atenuados pueden causar infección sistémica descontrolada en pacientes severamente inmunodeprimidos.",
  },
  {
    id: "duel-neutrofilia",
    topic: "Correlación clínica",
    stem: "Un paciente con neutrofilia marcada probablemente cursa con:",
    options: ["Infección viral", "Infección bacteriana aguda", "Alergia", "Infección parasitaria"],
    correct: 1,
    explain: "La neutrofilia es un marcador clásico de infección bacteriana aguda.",
  },
  {
    id: "duel-linfocitosis",
    topic: "Correlación clínica",
    stem: "La linfocitosis (aumento de linfocitos) es típica de:",
    options: ["Infecciones bacterianas", "Infecciones virales", "Reacciones alérgicas", "Parasitosis"],
    correct: 1,
    explain: "La linfocitosis suele observarse en infecciones virales.",
  },
  {
    id: "duel-eosinofilia",
    topic: "Correlación clínica",
    stem: "La eosinofilia (aumento de eosinófilos) sugiere principalmente:",
    options: ["Infección bacteriana", "Infección parasitaria o alergia", "Infección viral", "Monocitosis"],
    correct: 1,
    explain: "La eosinofilia es característica de infecciones parasitarias y procesos alérgicos.",
  },
];

export const DUEL_QUESTION_BANK: DuelQuestion[] = [...FROM_HEMATOLOGIA, ...NEW_QUESTIONS];

export function shuffleDuelQuestions(): DuelQuestion[] {
  const a = DUEL_QUESTION_BANK.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
