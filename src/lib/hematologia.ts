/**
 * CONTENIDO DE HEMATOLOGÍA Y MÉDULA ÓSEA.
 *
 * Portado íntegramente desde el simulador original "Laboratorio de Fisiología
 * Hematopoyética" (proyecto MEDULA-OSEA), fusionado aquí dentro de Becker Lab.
 * Fuente de la sección de RM: Londoño MA, Vallejo JM, Manzano AC. Rev Colomb
 * Radiol. 2015;26(2):4206-12. El resto del contenido sigue bibliografía
 * estándar de fisiología/hematología/inmunología (Guyton y Hall, Abbas, Ganong).
 *
 * El módulo original de "Células Presentadoras de Antígeno" se fusionó dentro
 * de /immunology (mismo tema que la cascada de Becker Lab). Los casos clínicos
 * se fusionaron dentro de /clinical, junto al caso HSCT de vacunación.
 */

export const SRC_MRI = "Londoño MA, Vallejo JM, Manzano AC. Rev Colomb Radiol. 2015;26(2):4206-12";

export interface MarrowType {
  name: string;
  cellPct: number;
  fatCellPct: number;
  chem: { fat: number; water: number; protein: number };
  function: string;
  color: string;
}

export const MARROW_COMPOSITION: { red: MarrowType; yellow: MarrowType } = {
  red: {
    name: "Médula ósea roja",
    cellPct: 60,
    fatCellPct: 40,
    chem: { fat: 40, water: 40, protein: 20 },
    function:
      "Es el sitio de la hematopoyesis activa. Está ricamente vascularizada para facilitar la liberación de células hacia los sinusoides.",
    color: "var(--accent-red)",
  },
  yellow: {
    name: "Médula ósea amarilla",
    cellPct: 5,
    fatCellPct: 95,
    chem: { fat: 80, water: 15, protein: 5 },
    function:
      "Compuesta casi en su totalidad por tejido adiposo. Su función hematopoyética es mínima; está pobremente vascularizada en comparación con la médula roja.",
    color: "var(--accent-amber)",
  },
};

export interface MriSequence {
  label: string;
  yellow: { gray: string; desc: string };
  red: { gray: string; desc: string };
  why: string;
}

export const MRI_SEQUENCES: Record<"T1" | "T2" | "STIR", MriSequence> = {
  T1: {
    label: "Potenciada en T1",
    yellow: { gray: "#f2f2f2", desc: "Señal alta — la grasa acorta el T1, por lo que la médula amarilla se ve tan brillante como la grasa subcutánea." },
    red: { gray: "#5c5c5c", desc: "Señal intermedia-baja por su alto contenido celular y de agua, aunque suele ser más brillante que el músculo o los discos intervertebrales." },
    why: "Las secuencias T1 son muy sensibles a la grasa. El T1 corto de la grasa produce señal alta, mientras que el mayor contenido celular y de agua de la médula roja reduce su señal relativa. Esta es la secuencia con mayor contraste entre médula roja y amarilla.",
  },
  T2: {
    label: "Potenciada en T2",
    yellow: { gray: "#d8d8d8", desc: "Señal alta, similar a T1." },
    red: { gray: "#9a9a9a", desc: "Señal intermedia — sigue siendo menor que la de la grasa, pero la diferencia entre médula roja y amarilla es menos marcada que en T1." },
    why: "Tanto la grasa como el agua aportan señal T2 considerable, por lo que la diferencia en el tiempo de relajación entre médula roja y amarilla es menor en T2 que en T1. El contraste grasa/médula roja es real, pero menos llamativo.",
  },
  STIR: {
    label: "STIR (supresión grasa)",
    yellow: { gray: "#161616", desc: "La señal se anula — STIR suprime la grasa, así que la médula amarilla se ve oscura." },
    red: { gray: "#b8b8b8", desc: "Señal relativamente más alta una vez suprimida la grasa, porque el contenido de agua y células de la médula roja no se anula." },
    why: "STIR (Short TI Inversion Recovery) usa un pulso de inversión programado para anular la señal de la grasa. Con la grasa suprimida, la médula roja puede verse relativamente brillante — este hallazgo normal no debe confundirse con el realce por contraste de una secuencia T1 con gadolinio, que es un fenómeno completamente distinto.",
  },
};

export interface AgeStageRegions {
  skull: string; spine: string; chest: string; pelvis: string;
  humProxL: string; humProxR: string; humDiaL: string; humDiaR: string;
  femProxL: string; femProxR: string; femDiaL: string; femDiaR: string;
  handL: string; handR: string; footL: string; footR: string;
}

export interface AgeStage { id: string; label: string; text: string; regions: AgeStageRegions }

export const AGE_STAGES: AgeStage[] = [
  { id: "fetal", label: "Fetal",
    text: "Las diáfisis y metáfisis de los huesos largos muestran señal T1 baja porque predomina la médula roja. Las epífisis aún no osificadas son cartilaginosas y muestran señal T1 intermedia por su alto contenido de agua.",
    regions: { skull: "cartilage", spine: "red", chest: "red", pelvis: "red", humProxL: "red", humProxR: "red", humDiaL: "red", humDiaR: "red", femProxL: "red", femProxR: "red", femDiaL: "red", femDiaR: "red", handL: "cartilage", handR: "cartilage", footL: "cartilage", footR: "cartilage" } },
  { id: "newborn", label: "Recién nacido",
    text: "Cuando las epífisis comienzan a osificarse, aparece médula grasa en los nuevos centros de osificación como focos de señal alta en T1. Las falanges y metatarsianos mantienen señal alta en T2 por el abundante contenido de agua del cartílago.",
    regions: { skull: "red", spine: "red", chest: "red", pelvis: "red", humProxL: "redyellow", humProxR: "redyellow", humDiaL: "red", humDiaR: "red", femProxL: "redyellow", femProxR: "redyellow", femDiaL: "red", femDiaR: "red", handL: "red", handR: "red", footL: "red", footR: "red" } },
  { id: "y1", label: "1 año",
    text: "La conversión medular inicia en las falanges de manos y pies cerca del final del primer año, completándose alrededor del año de edad. La conversión también comienza en las diáfisis femorales.",
    regions: { skull: "red", spine: "red", chest: "red", pelvis: "red", humProxL: "red", humProxR: "red", humDiaL: "redyellow", humDiaR: "redyellow", femProxL: "red", femProxR: "red", femDiaL: "redyellow", femDiaR: "redyellow", handL: "yellow", handR: "yellow", footL: "yellow", footR: "yellow" } },
  { id: "y10", label: "10 años",
    text: "Hacia los 10 años, la médula grasa ocupa la mayor parte de las regiones diafisarias de las extremidades y el cráneo; la médula roja persiste solo en las metáfisis. El esqueleto axial (columna, tórax, pelvis) conserva mayormente médula roja durante la primera década, y se convierte después con un patrón menos predecible.",
    regions: { skull: "yellow", spine: "red", chest: "red", pelvis: "red", humProxL: "red", humProxR: "red", humDiaL: "yellow", humDiaR: "yellow", femProxL: "red", femProxR: "red", femDiaL: "yellow", femDiaR: "yellow", handL: "yellow", handR: "yellow", footL: "yellow", footR: "yellow" } },
  { id: "adol", label: "10–25 años (Adolescente)",
    text: "La señal de médula grasa ahora predomina en toda la extremidad, pero persiste médula roja residual en las metáfisis femoral y humeral — se observa como señal T1 relativamente más alta en las diáfisis, donde ahora predomina la grasa. La conversión axial continúa, de forma desigual.",
    regions: { skull: "yellow", spine: "redyellow", chest: "red", pelvis: "red", humProxL: "redyellow", humProxR: "redyellow", humDiaL: "yellow", humDiaR: "yellow", femProxL: "redyellow", femProxR: "redyellow", femDiaL: "yellow", femDiaR: "yellow", handL: "yellow", handR: "yellow", footL: "yellow", footR: "yellow" } },
  { id: "adult", label: "25+ años (Adulto)",
    text: "El patrón adulto se alcanza alrededor de los 25 años: la médula roja persiste en el esqueleto axial, el esternón, las costillas y el fémur/húmero proximales. Una banda de señal T1 baja (remanente del cartílago de crecimiento) sigue separando la epífisis de la diáfisis, adelgazándose hasta una línea residual una vez que se cierra.",
    regions: { skull: "yellow", spine: "red", chest: "red", pelvis: "red", humProxL: "red", humProxR: "red", humDiaL: "yellow", humDiaR: "yellow", femProxL: "red", femProxR: "red", femDiaL: "yellow", femDiaR: "yellow", handL: "yellow", handR: "yellow", footL: "yellow", footR: "yellow" } },
];

export const REGION_COLOR: Record<string, string> = {
  red: "var(--accent-red)",
  yellow: "var(--accent-amber)",
  redyellow: "#c77a5a",
  cartilage: "#5fa8c9",
};

export interface HematoNodeInfo { origin: string; function: string; location: string; characteristics: string; fate: string }
export interface HematoNode { id: string; name: string; branch?: "myeloid" | "lymphoid"; info: HematoNodeInfo; children?: HematoNode[] }

export const HEMATO_TREE: HematoNode = {
  id: "hsc", name: "Célula Madre Hematopoyética",
  info: { origin: "Reside en el nicho hematopoyético de la médula ósea roja, anclada a células del estroma y al endotelio sinusoidal.", function: "Pluripotente y autorrenovable; da origen a todos los linajes de células sanguíneas.", location: "Médula ósea roja (esqueleto axial y huesos largos proximales en el adulto).", characteristics: "Poco frecuente, en su mayoría quiescente, con baja tasa mitótica; la división asimétrica mantiene la reserva de células madre.", fate: "Se diferencia en progenitores mieloides o linfoides bajo la señalización de citocinas (SCF, IL-3, TPO, entre otras)." },
  children: [
    { id: "myeloid", name: "Progenitor Mieloide", branch: "myeloid",
      info: { origin: "Deriva de la célula madre hematopoyética (progenitor mieloide común / CFU-GEMM).", function: "Se compromete hacia los destinos eritroide, granulocítico, monocítico y megacariocítico.", location: "Médula ósea roja.", characteristics: "Responde a SCF, IL-3 y GM-CSF.", fate: "Se ramifica en las líneas eritroide, granulocito/monocito y megacariocito." },
      children: [
        { id: "ery", name: "Eritrocito", info: { origin: "A través de las etapas BFU-E → CFU-E → eritroblasto.", function: "Transporta O2 y CO2 en la sangre.", location: "Sangre periférica.", characteristics: "Anucleado, bicóncavo, vida media de ~120 días.", fate: "Es retirado por macrófagos esplénicos/hepáticos al llegar a la senescencia." } },
        { id: "plt", name: "Plaquetas", info: { origin: "Fragmentos citoplasmáticos del megacariocito.", function: "Hemostasia primaria — forman el tapón plaquetario y favorecen la coagulación.", location: "Sangre periférica.", characteristics: "Anucleadas, vida media de ~7-10 días.", fate: "Son eliminadas por el bazo y el sistema reticuloendotelial." } },
        { id: "neu", name: "Neutrófilo", info: { origin: "Progenitor granulocito-monocito.", function: "Fagocito de primera respuesta contra bacterias.", location: "Sangre, y luego tejidos durante la inflamación.", characteristics: "Núcleo multilobulado, el leucocito más abundante.", fate: "Vida corta; muere en el sitio de infección formando pus." } },
        { id: "eos", name: "Eosinófilo", info: { origin: "Progenitor granulocito-monocito.", function: "Defensa contra parásitos multicelulares; modula reacciones alérgicas.", location: "Sangre y tejidos mucosos.", characteristics: "Núcleo bilobulado, gránulos eosinofílicos (rojo-anaranjados).", fate: "Migra al tejido y se degranula contra parásitos grandes." } },
        { id: "bas", name: "Basófilo", info: { origin: "Progenitor granulocito-monocito.", function: "Libera histamina y heparina en la hipersensibilidad inmediata.", location: "Sangre (el granulocito menos abundante).", characteristics: "Núcleo frecuentemente oculto por gránulos densos púrpura-azulados.", fate: "Contribuye a las respuestas alérgicas y antiparasitarias." } },
        { id: "mono", name: "Monocito", info: { origin: "Progenitor granulocito-monocito.", function: "Precursor circulante de macrófagos tisulares y de algunas células dendríticas.", location: "Sangre, y luego tejidos.", characteristics: "El leucocito más grande, núcleo arriñonado.", fate: "Se diferencia en macrófago o en célula dendrítica derivada de monocito." } },
      ] },
    { id: "lymphoid", name: "Progenitor Linfoide", branch: "lymphoid",
      info: { origin: "Deriva de la célula madre hematopoyética (progenitor linfoide común).", function: "Da origen a las células de la inmunidad adaptativa además de las células NK.", location: "Médula ósea roja, con maduración adicional en otros sitios (timo para linfocitos T).", characteristics: "Responde a IL-7 y citocinas relacionadas.", fate: "Se ramifica en los linajes T, B y NK." },
      children: [
        { id: "tcell", name: "Linfocito T", info: { origin: "Progenitor linfoide común; madura en el timo.", function: "Inmunidad celular — destrucción citotóxica CD8+, coordinación auxiliar CD4+.", location: "Sangre, ganglios linfáticos, timo (maduración).", characteristics: "Expresa un receptor de célula T más CD4 o CD8.", fate: "Se diferencia en linfocitos T efectores o de memoria tras reconocer el antígeno." } },
        { id: "bcell", name: "Linfocito B", info: { origin: "Progenitor linfoide común; madura en la médula ósea.", function: "Inmunidad humoral — se diferencia en células plasmáticas secretoras de anticuerpos; también actúa como célula presentadora de antígeno.", location: "Sangre, ganglios linfáticos, bazo.", characteristics: "Inmunoglobulina de superficie (receptor de célula B).", fate: "Se convierte en célula plasmática o linfocito B de memoria tras la activación." } },
        { id: "nk", name: "Célula NK", info: { origin: "Progenitor linfoide común.", function: "Citotoxicidad innata contra células infectadas por virus y células tumorales, sin sensibilización previa.", location: "Sangre y tejidos.", characteristics: "Linfocito grande y granular; carece de un receptor de antígeno reordenado.", fate: "Destruye blancos que carecen de expresión normal de MHC I (“missing self”)." } },
      ] },
  ],
};

export interface EryStage { id: string; name: string; size: number; nucleus: number; chroma: string; hb: number; cyto: string; desc: string }

export const ERY_STAGES: EryStage[] = [
  { id: "hsc", name: "Célula Madre Hematopoyética", size: 70, nucleus: 60, chroma: "open", hb: 0, cyto: "#7a8aa0", desc: "Residente pluripotente de la médula; aún no comprometida con ningún linaje." },
  { id: "myprog", name: "Progenitor Mieloide", size: 66, nucleus: 56, chroma: "open", hb: 0, cyto: "#7a8aa0", desc: "Se compromete hacia la rama mieloide, incluyendo el destino eritroide." },
  { id: "bfue", name: "BFU-E", size: 60, nucleus: 50, chroma: "open", hb: 0, cyto: "#6f84a8", desc: "Unidad formadora de brote eritroide. Progenitor temprano, responde principalmente a SCF/IL-3, débilmente a EPO." },
  { id: "cfue", name: "CFU-E", size: 54, nucleus: 44, chroma: "open", hb: 5, cyto: "#6a7fb0", desc: "Unidad formadora de colonias eritroides. Muy sensible a EPO; el principal blanco de la eritropoyetina." },
  { id: "proery", name: "Proeritroblasto", size: 50, nucleus: 40, chroma: "fine", hb: 8, cyto: "#4d6fc7", desc: "Primer precursor eritroide morfológicamente reconocible. Núcleo grande con cromatina fina; comienza el citoplasma profundamente basofílo." },
  { id: "baso", name: "Eritroblasto basófilo", size: 42, nucleus: 32, chroma: "coarser", hb: 20, cyto: "#4457b3", desc: "Célula más pequeña, la cromatina sigue condensándose. Citoplasma profundamente basofílo por la abundancia de ribosomas que sintetizan globina." },
  { id: "poly", name: "Eritroblasto policromatófilo", size: 34, nucleus: 22, chroma: "clumped", hb: 50, cyto: "#8a6f9e", desc: "El citoplasma se torna azul-rosado mixto conforme se acumula hemoglobina junto a ribosomas residuales." },
  { id: "ortho", name: "Eritroblasto ortocromático", size: 26, nucleus: 12, chroma: "pyknotic", hb: 80, cyto: "#c96a7a", desc: "Núcleo pequeño y picnótico, citoplasma eosinofílico (rosado) dominado por hemoglobina. Última etapa antes de la expulsión nuclear." },
  { id: "retic", name: "Reticulocito", size: 22, nucleus: 0, chroma: "none", hb: 95, cyto: "#d9727a", desc: "Enucleado. El ARN ribosómico residual (visible como retículo con tinción supravital) aún permite algo de síntesis de hemoglobina. Madura en la sangre en 1–2 días." },
  { id: "mature", name: "Eritrocito", size: 20, nucleus: 0, chroma: "none", hb: 100, cyto: "#e0505a", desc: "Eritrocito maduro, bicóncavo y anucleado, completamente cargado de hemoglobina. Circula durante aproximadamente 120 días." },
];

export interface WbcType { id: string; name: string; color: string; nucleus: string; morphology: string; func: string; role: string; fate: string; clinical: string }

export const WBC_TYPES: WbcType[] = [
  { id: "neu", name: "Neutrófilo", color: "var(--accent-blue)", nucleus: "multilobed",
    morphology: "Núcleo multilobulado (3-5 lóbulos), gránulos finos y neutros (lilas).",
    func: "Fagocito de primera respuesta; engulle y destruye bacterias mediante estallido oxidativo y enzimas granulares.",
    role: "El leucocito circulante más abundante (~50-70% del diferencial); central en la inflamación aguda.",
    fate: "Vida corta (horas a ~1-2 días); muere en el sitio de infección, contribuyendo a la formación de pus.",
    clinical: "La neutrofilia es un marcador clásico de infección bacteriana aguda." },
  { id: "eos", name: "Eosinófilo", color: "#e07a3f", nucleus: "bilobed",
    morphology: "Núcleo bilobulado, gránulos eosinofílicos grandes (rojo-anaranjados).",
    func: "Defiende contra parásitos multicelulares; libera la proteína básica mayor; modula reacciones alérgicas/de hipersensibilidad.",
    role: "Fracción minoritaria de los leucocitos; aumenta durante infección parasitaria o alergia.",
    fate: "Migra hacia tejidos mucosos; se degranula al contacto con parásitos grandes.",
    clinical: "La eosinofilia sugiere infección parasitaria, asma o enfermedad alérgica." },
  { id: "bas", name: "Basófilo", color: "#7a5fc9", nucleus: "obscured",
    morphology: "Núcleo frecuentemente oculto por gránulos densos y gruesos púrpura-azulados.",
    func: "Libera histamina y heparina; participa en la hipersensibilidad inmediata (tipo I).",
    role: "El granulocito menos abundante en sangre; su contraparte tisular es el mastocito.",
    fate: "Se degranula rápidamente tras el entrecruzamiento de IgE.",
    clinical: "Mediador central de las reacciones alérgicas y anafilácticas." },
  { id: "lym", name: "Linfocito", color: "var(--accent-indigo)", nucleus: "round-large",
    morphology: "Núcleo grande y redondo, delgado borde de citoplasma.",
    func: "Los linfocitos T median la inmunidad celular; los B producen anticuerpos; las NK aportan citotoxicidad innata.",
    role: "El segundo leucocito más abundante; el núcleo de la inmunidad adaptativa.",
    fate: "Vida larga; los subtipos de memoria pueden persistir por años.",
    clinical: "La linfocitosis es típica de infecciones virales; la linfopenia puede reflejar inmunosupresión." },
  { id: "mon", name: "Monocito", color: "var(--accent-orange)", nucleus: "kidney-shaped",
    morphology: "El leucocito más grande; núcleo arriñonado/en herradura, abundante citoplasma gris-azulado.",
    func: "Precursor circulante que se convierte en macrófago tisular o célula dendrítica.",
    role: "Conecta la defensa fagocítica innata con la presentación de antígeno a la inmunidad adaptativa.",
    fate: "Abandona la sangre en 1-3 días para poblar los tejidos.",
    clinical: "La monocitosis puede observarse en infección crónica y algunos trastornos hematológicos." },
];

export interface SimpleStage { id: string; name: string; desc: string; tag?: string | null }

export const EXTRAV_STAGES: SimpleStage[] = [
  { id: "margin", name: "Marginación", desc: "El flujo sanguíneo alterado y la activación endotelial hacen que los leucocitos se desplacen del flujo axial hacia la pared del vaso.", tag: null },
  { id: "roll", name: "Rodamiento", desc: "Las selectinas (E-/P-selectina en el endotelio, sialil-Lewis X en el leucocito) forman uniones débiles y transitorias — el leucocito rueda sobre la pared.", tag: "Selectinas" },
  { id: "activate", name: "Activación", desc: "Las quimiocinas expuestas en el endotelio activan una señalización de dentro hacia afuera que cambia las integrinas del leucocito a un estado de alta afinidad.", tag: null },
  { id: "adhere", name: "Adhesión", desc: "Las integrinas de alta afinidad (LFA-1, VLA-4) se unen a ICAM-1/VCAM-1 en el endotelio, produciendo un arresto firme.", tag: "Integrinas" },
  { id: "diapedesis", name: "Diapédesis", desc: "El leucocito se desliza entre las uniones de las células endoteliales (mediado por PECAM-1/CD31) hacia el tejido.", tag: null },
  { id: "chemotaxis", name: "Quimiotaxis", desc: "El leucocito migra direccionalmente siguiendo un gradiente de quimiocinas/quimioatrayentes hacia el sitio de infección o lesión.", tag: null },
];

export const MONO_STAGES: SimpleStage[] = [
  { id: "blood", name: "Monocito en sangre", desc: "Circula durante 1–3 días como fagocito de vigilancia, listo para responder a señales inflamatorias." },
  { id: "migrate", name: "Migración endotelial", desc: "Sigue la misma secuencia de rodamiento → adhesión → diapédesis que otros leucocitos para entrar al tejido." },
  { id: "tissue", name: "Tejido", desc: "Una vez en el tejido, el monocito encuentra citocinas locales y señales microbianas que dirigen su diferenciación." },
  { id: "macro", name: "Macrófago / célula dendrítica", desc: "Se diferencia en un macrófago de tipo residente (o en una célula dendrítica derivada de monocito), asumiendo funciones fagocíticas y de presentación de antígeno." },
];

export const MONO_CHIP_INFO: Record<string, string> = {
  "Producción de citocinas": "Libera TNF-α, IL-1 e IL-6 para coordinar y amplificar la respuesta inflamatoria.",
  "Eliminación de detritos": "Fagocita células muertas, patógenos y detritos tisulares, manteniendo limpio el tejido.",
  "Reparación tisular": "Secreta factores de crecimiento que promueven la angiogénesis y la remodelación tras una lesión.",
  "Presentación de antígeno": "Procesa el antígeno capturado y exhibe péptidos en MHC II a linfocitos T CD4+, conectando con la inmunidad adaptativa.",
};

export interface ApcType { id: string; name: string; role: string; mhc: string }

export const APC_TYPES: ApcType[] = [
  { id: "dc", name: "Célula Dendrítica", role: "La CPA profesional más potente; captura antígeno en el tejido periférico y migra a los ganglios linfáticos para activar linfocitos T vírgenes.", mhc: "MHC I y II; capacidad única de presentación cruzada." },
  { id: "mac", name: "Macrófago", role: "Fagocita patógenos y detritos; presenta péptidos procesados principalmente a linfocitos T efectores/de memoria ya diferenciados, de forma local.", mhc: "MHC I y II." },
  { id: "bc", name: "Linfocito B", role: "Captura antígeno mediante su receptor de célula B con alta especificidad; lo presenta a linfocitos T colaboradores para obtener la ayuda necesaria para el cambio de clase de anticuerpos.", mhc: "MHC I y II." },
];

export interface MhcScenario { id: number; desc: string; correct: "I" | "II"; explain: string; advanced?: boolean }

export const MHC_SCENARIOS: MhcScenario[] = [
  { id: 1, desc: "Una proteína viral se sintetiza en el citoplasma de una célula epitelial infectada.", correct: "I", explain: "Las proteínas endógenas/citosólicas son degradadas por el proteasoma, transportadas por TAP hacia el retículo endoplásmico, y cargadas en MHC I para la vigilancia de linfocitos T citotóxicos CD8+." },
  { id: 2, desc: "Una bacteria extracelular es fagocitada por un macrófago.", correct: "II", explain: "Los antígenos exógenos capturados por fagocitosis se degradan en la vía endolisosómica y se cargan en MHC II para linfocitos T colaboradores CD4+." },
  { id: 3, desc: "Una proteína propia se degrada durante el recambio intracelular normal.", correct: "I", explain: "El MHC I exhibe continuamente una muestra de proteínas intracelulares (mayormente propias) en prácticamente todas las células nucleadas, permitiendo la vigilancia inmunitaria ante cualquier anomalía." },
  { id: 4, desc: "Un antígeno tumoral se sintetiza dentro de una célula cancerosa.", correct: "I", explain: "Al ser una proteína endógena/citosólica, sigue la vía proteasoma/TAP/MHC I, permitiendo que los linfocitos T CD8+ reconozcan y destruyan la célula tumoral." },
  { id: 5, desc: "Una toxina es captada por endocitosis mediada por receptor en una célula dendrítica.", correct: "II", explain: "El material extracelular endocitado se procesa en endosomas/lisosomas y se presenta vía MHC II a linfocitos T CD4+." },
  { id: 6, desc: "[Avanzado] Una célula dendrítica captura un antígeno viral de células infectadas moribundas y lo presenta de forma cruzada.", correct: "I", explain: "La presentación cruzada es la excepción: las células dendríticas pueden dirigir antígeno exógeno hacia el MHC I, activando linfocitos T CD8+ incluso cuando la célula dendrítica nunca fue infectada.", advanced: true },
];

export const INNATE_ADAPTIVE_STAGES: SimpleStage[] = [
  { id: "pathogen", name: "Patógeno", desc: "Un patógeno atraviesa una barrera tisular periférica." },
  { id: "dc", name: "Célula Dendrítica", desc: "Una célula dendrítica residente, centinela de la inmunidad innata, encuentra al patógeno." },
  { id: "capture", name: "Captura del Antígeno", desc: "La célula dendrítica captura y procesa el antígeno, y luego madura — aumentando MHC y moléculas coestimuladoras (CD80/86)." },
  { id: "node", name: "Ganglio Linfático", desc: "La célula dendrítica madura migra por vía linfática hacia el ganglio linfático regional." },
  { id: "present", name: "Presentación del Antígeno", desc: "Presenta el péptido procesado vía MHC I o II a linfocitos T vírgenes circulantes." },
  { id: "activation", name: "Activación de la Célula T", desc: "El reconocimiento por el receptor de célula T (TCR) más la coestimulación activa y expande clonalmente al linfocito T específico." },
  { id: "adaptive", name: "Inmunidad Adaptativa", desc: "Los linfocitos T efectores y la ayuda a linfocitos B impulsan una respuesta adaptativa dirigida — la célula dendrítica ha conectado la inmunidad innata con la adaptativa." },
];

export const ANTIGEN_PRESENTATION_STAGES: SimpleStage[] = [
  { id: "antigeno", name: "Antígeno", desc: "Se encuentra un antígeno extraño (proteína o fragmento microbiano)." },
  { id: "captura", name: "Captura", desc: "La CPA lo captura por fagocitosis o endocitosis mediada por receptor." },
  { id: "procesamiento", name: "Procesamiento", desc: "Proteasas (endosómicas/lisosómicas para material exógeno, o el proteasoma para proteínas citosólicas) fragmentan el antígeno." },
  { id: "peptido", name: "Péptido", desc: "Se genera un fragmento peptídico corto." },
  { id: "carga", name: "Carga en el MHC", desc: "El péptido se carga en el surco de una molécula de MHC I o MHC II." },
  { id: "celulat", name: "Célula T", desc: "El complejo péptido-MHC se exhibe y es reconocido por un receptor de célula T." },
];

export type ClinicalCaseCategory = "Hematología" | "Inmunología" | "Vacunación México";
export interface ClinicalCaseMCQ { id: string; type: "mcq"; category: ClinicalCaseCategory; vignette: string; question: string; options: string[]; correct: number; explain: string }
export interface ClinicalCaseOrder { id: string; type: "order"; category: ClinicalCaseCategory; vignette: string; question: string; items: string[]; correctOrder: number[]; explain: string }
export type HematoClinicalCase = ClinicalCaseMCQ | ClinicalCaseOrder;

export const HEMATO_CLINICAL_CASES: HematoClinicalCase[] = [
  { id: "c1", type: "mcq", category: "Hematología",
    vignette: "Un paciente de 45 años sube a un campamento a 4500 m de altitud y presenta disnea leve. La oximetría de pulso marca 88%.",
    question: "¿Qué ocurre con la producción de EPO?",
    options: ["La EPO disminuye", "La EPO aumenta", "La EPO no cambia"], correct: 1,
    explain: "La hipoxia tisular estimula a las células peritubulares renales (vía HIF) para aumentar la síntesis de eritropoyetina, incrementando el estímulo eritroide." },
  { id: "c2", type: "mcq", category: "Hematología",
    vignette: "Un paciente presenta enfermedad renal crónica avanzada (TFG 15 mL/min).",
    question: "¿Cómo se afecta la eritropoyesis?",
    options: ["Aumenta por mayor filtración de EPO", "Disminuye por menor síntesis renal de EPO", "No se afecta", "Aumenta por retención de hierro"], correct: 1,
    explain: "El parénquima renal dañado produce menos EPO, disminuyendo el estímulo eritroide — el mecanismo detrás de la anemia de la enfermedad renal crónica." },
  { id: "c3", type: "order", category: "Hematología",
    vignette: "Un neutrófilo debe abandonar el torrente sanguíneo para llegar a un foco de infección.",
    question: "Ordena estos eventos en la secuencia correcta.",
    items: ["Rodamiento", "Adhesión", "Diapédesis", "Quimiotaxis"], correctOrder: [0, 1, 2, 3],
    explain: "Secuencia completa: marginación → rodamiento (selectinas) → activación → adhesión (integrinas) → diapédesis → quimiotaxis hacia el gradiente de quimiocinas." },
  { id: "c4", type: "mcq", category: "Inmunología",
    vignette: "Una célula dendrítica captura una bacteria extracelular y presenta un péptido derivado de ella unido a MHC II en su superficie.",
    question: "¿Qué linfocito reconoce principalmente esta presentación?",
    options: ["Linfocito T CD4+", "Linfocito T CD8+"], correct: 0,
    explain: "El MHC II es reconocido por linfocitos T colaboradores CD4+, consistente con la vía exógena/fagocítica de procesamiento del antígeno." },
];

export interface BankQuestion { tag: string; stem: string; options: string[]; correct: number; explain: string }

export const HEMATO_QUESTION_BANK: BankQuestion[] = [
  { tag: "marrow", stem: "¿Cuál es la composición celular aproximada de la médula ósea roja?", options: ["95% adipocitos / 5% células hematopoyéticas", "60% células hematopoyéticas / 40% adipocitos", "80% agua / 20% proteínas", "100% células hematopoyéticas"], correct: 1, explain: "La médula roja es aproximadamente 60% células hematopoyéticas y 40% adipocitos (Londoño et al., 2015)." },
  { tag: "marrow", stem: "¿Cuál es la composición química aproximada de la médula amarilla?", options: ["40% grasa / 40% agua / 20% proteínas", "80% grasa / 15% agua / 5% proteínas", "20% grasa / 60% agua / 20% proteínas", "100% grasa"], correct: 1, explain: "Químicamente, la médula amarilla es aproximadamente 80% grasa, 15% agua y 5% proteínas." },
  { tag: "marrow", stem: "En una RM potenciada en T1, la señal de la médula amarilla (grasa) es:", options: ["Baja, similar al músculo", "Alta, similar a la grasa subcutánea", "Ausente", "Idéntica a la del agua"], correct: 1, explain: "El T1 corto de la grasa le da a la médula amarilla señal alta en T1, similar a la grasa subcutánea." },
  { tag: "marrow", stem: "¿Qué logra una secuencia STIR?", options: ["Aumenta el contraste con gadolinio", "Suprime la señal de la grasa", "Elimina la señal del agua", "Aumenta la señal del hueso cortical"], correct: 1, explain: "STIR (Short TI Inversion Recovery) anula la señal de la grasa, haciendo que la médula roja sea relativamente más visible." },
  { tag: "marrow", stem: "En un adulto (>25 años), ¿dónde predomina la médula ósea roja?", options: ["Diáfisis de los huesos largos de las extremidades", "Esqueleto axial, esternón, costillas y fémur/húmero proximales", "Falanges de manos y pies", "Exclusivamente el cráneo"], correct: 1, explain: "El patrón adulto conserva médula roja en el esqueleto axial, esternón, costillas y el fémur y húmero proximales." },
  { tag: "marrow", stem: "¿Alrededor de qué edad se alcanza típicamente el patrón adulto de distribución medular?", options: ["5 años", "10 años", "25 años", "60 años"], correct: 2, explain: "El patrón medular adulto generalmente se alcanza hacia los 25 años de edad." },
  { tag: "eryth", stem: "¿Cuál es el primer precursor eritroide morfológicamente reconocible?", options: ["BFU-E", "CFU-E", "Proeritroblasto", "Reticulocito"], correct: 2, explain: "El proeritroblasto es la primera etapa identificable por morfología estándar en la línea eritroide." },
  { tag: "eryth", stem: "¿Entre qué dos etapas ocurre la enucleación?", options: ["Proeritroblasto → eritroblasto basófilo", "Eritroblasto ortocromático → reticulocito", "Reticulocito → eritrocito", "BFU-E → CFU-E"], correct: 1, explain: "El eritroblasto ortocromático expulsa su núcleo picnótico para convertirse en reticulocito." },
  { tag: "eryth", stem: "¿Qué progenitor eritroide es más sensible a la EPO?", options: ["BFU-E", "CFU-E", "Proeritroblasto", "Célula madre hematopoyética"], correct: 1, explain: "El CFU-E es el principal blanco de la EPO, más que el BFU-E, que es más temprano." },
  { tag: "eryth", stem: "¿Qué le ocurre a la EPO durante la hipoxia tisular?", options: ["Disminuye", "Aumenta", "No cambia", "Se destruye"], correct: 1, explain: "La hipoxia incrementa la síntesis renal de EPO vía la vía de HIF, estimulando la eritropoyesis." },
  { tag: "eryth", stem: "Una disminución marcada de la función renal típicamente causa:", options: ["Aumento de EPO y eritropoyesis", "Disminución de EPO y eritropoyesis (anemia de la ERC)", "Ningún cambio en la eritropoyesis", "Deficiencia aislada de hierro"], correct: 1, explain: "La menor masa/función renal reduce la síntesis de EPO, produciendo la anemia característica de la enfermedad renal crónica." },
  { tag: "eryth", stem: "¿Qué característica describe mejor a un reticulocito?", options: ["Totalmente maduro, sin ARN residual", "Anucleado con ARN ribosómico residual, madura en 1-2 días en sangre", "Aún tiene núcleo", "Se encuentra solo en médula, nunca en sangre"], correct: 1, explain: "Los reticulocitos están enucleados pero conservan ARN ribosómico (el “retículo”), y maduran en la sangre periférica en 1-2 días." },
  { tag: "rbc", stem: "¿Cuál es la vida media promedio de un eritrocito maduro?", options: ["30 días", "120 días", "1 año", "10 días"], correct: 1, explain: "Los eritrocitos maduros circulan aproximadamente 120 días antes de ser retirados." },
  { tag: "rbc", stem: "¿Dónde se retiran principalmente los eritrocitos senescentes?", options: ["Riñón", "Bazo e hígado (macrófagos)", "Pulmones", "Solo en la médula ósea"], correct: 1, explain: "Los macrófagos esplénicos y hepáticos fagocitan los eritrocitos envejecidos y reciclan su hierro." },
  { tag: "rbc", stem: "La forma bicóncava del eritrocito sirve principalmente para:", options: ["Aumentar la superficie y la deformabilidad para el intercambio de gases", "Almacenar reservas de oxígeno", "Anclar el núcleo", "Aumentar la rigidez"], correct: 0, explain: "El disco bicóncavo aumenta la relación superficie/volumen y permite la deformabilidad necesaria para atravesar capilares." },
  { tag: "rbc", stem: "Un aumento de CO2 / caída del pH desplaza la curva de disociación de oxihemoglobina:", options: ["A la izquierda, aumentando la afinidad por O2", "A la derecha, disminuyendo la afinidad por O2 (efecto Bohr)", "No tiene efecto", "Elimina la unión cooperativa"], correct: 1, explain: "El efecto Bohr: más CO2/menor pH desplaza la curva a la derecha, favoreciendo la liberación de O2 al tejido metabólicamente activo." },
  { tag: "rbc", stem: "¿Dónde ocurre principalmente la reacción de la anhidrasa carbónica (CO2 + H2O ↔ H2CO3)?", options: ["En el plasma", "Dentro del eritrocito", "En el epitelio alveolar", "Solo en el túbulo renal"], correct: 1, explain: "La anhidrasa carbónica es abundante dentro del eritrocito, convirtiendo rápidamente el CO2 y el agua en ácido carbónico." },
  { tag: "rbc", stem: "En el intercambio de cloruro, cuando el HCO3⁻ sale del eritrocito hacia el plasma:", options: ["Entra Na+ para equilibrar la carga", "Entra Cl⁻ a través del intercambiador banda 3", "Sale K+ de la célula", "Nada más se mueve"], correct: 1, explain: "El intercambiador aniónico banda 3 (AE1) intercambia el HCO3⁻ que sale por Cl⁻ que entra, preservando la electroneutralidad." },
  { tag: "wbc", stem: "¿Cuál es el leucocito circulante más abundante?", options: ["Eosinófilo", "Basófilo", "Neutrófilo", "Monocito"], correct: 2, explain: "Los neutrófilos constituyen aproximadamente 50-70% del diferencial leucocitario normal." },
  { tag: "wbc", stem: "Un núcleo bilobulado con gránulos rojo-anaranjados, activo contra parásitos, describe al:", options: ["Neutrófilo", "Eosinófilo", "Basófilo", "Linfocito"], correct: 1, explain: "Los eosinófilos tienen un característico núcleo bilobulado y gránulos eosinofílicos, y actúan contra parásitos grandes." },
  { tag: "wbc", stem: "¿Las selectinas median qué paso de la extravasación?", options: ["Adhesión firme", "Rodamiento", "Diapédesis", "Quimiotaxis"], correct: 1, explain: "Las uniones mediadas por selectinas son débiles y transitorias, produciendo el rodamiento sobre el endotelio." },
  { tag: "wbc", stem: "¿Las integrinas median qué paso de la extravasación?", options: ["Rodamiento", "Adhesión firme (arresto)", "Solo la marginación", "Ninguna de las anteriores"], correct: 1, explain: "Las integrinas de alta afinidad (LFA-1, VLA-4) se unen a ICAM-1/VCAM-1 endoteliales para producir el arresto firme." },
  { tag: "wbc", stem: "PECAM-1/CD31 se asocia principalmente con:", options: ["Rodamiento", "Diapédesis (transmigración)", "Quimiotaxis", "Marginación"], correct: 1, explain: "Las interacciones de PECAM-1 en las uniones endoteliales ayudan al leucocito a deslizarse hacia el tejido." },
  { tag: "mono", stem: "En el tejido, un monocito típicamente se diferencia en:", options: ["Neutrófilo", "Macrófago (o célula dendrítica derivada de monocito)", "Linfocito", "Eritrocito"], correct: 1, explain: "Una vez en el tejido, los monocitos se diferencian en macrófagos o, en algunos contextos, en células dendríticas." },
  { tag: "mono", stem: "¿Cuál NO es una función típica del macrófago?", options: ["Fagocitosis de detritos", "Producción de citocinas", "Secreción de anticuerpos", "Presentación de antígeno"], correct: 2, explain: "La secreción de anticuerpos es función de las células plasmáticas (linfocitos B diferenciados), no de los macrófagos." },
  { tag: "mono", stem: "¿Qué citocinas producen clásicamente los monocitos/macrófagos activados?", options: ["TNF-α, IL-1, IL-6", "Insulina, glucagón", "Eritropoyetina, trombopoyetina", "Solo IgG"], correct: 0, explain: "TNF-α, IL-1 e IL-6 son citocinas proinflamatorias distintivas liberadas por monocitos/macrófagos activados." },
  { tag: "apc", stem: "Las moléculas MHC clase I presentan antígeno principalmente a:", options: ["Linfocitos T CD4+", "Linfocitos T CD8+", "Linfocitos B", "Células NK"], correct: 1, explain: "El MHC I presenta péptidos endógenos a linfocitos T citotóxicos CD8+." },
  { tag: "apc", stem: "Las moléculas MHC clase II presentan antígeno principalmente a:", options: ["Linfocitos T CD8+", "Linfocitos T CD4+", "Neutrófilos", "Eritrocitos"], correct: 1, explain: "El MHC II presenta péptidos exógenos/fagocitados a linfocitos T colaboradores CD4+." },
  { tag: "apc", stem: "Una bacteria extracelular fagocitada por un macrófago se procesa y presenta vía:", options: ["Solo MHC I", "MHC II", "Ninguna vía", "Fusión directa de membrana, sin MHC"], correct: 1, explain: "El material extracelular fagocitado sigue la vía exógena hacia el MHC II." },
  { tag: "apc", stem: "Una proteína viral producida en el citoplasma de una célula infectada se presenta vía:", options: ["MHC I (vía endógena/proteasoma/TAP)", "Solo MHC II", "Ninguna vía", "Solo por células dendríticas"], correct: 0, explain: "Las proteínas citosólicas son degradadas por el proteasoma, transportadas vía TAP, y cargadas en el MHC I." },
  { tag: "apc", stem: "La presentación cruzada se refiere a:", options: ["Linfocitos B presentando a linfocitos T", "Células dendríticas presentando antígeno exógeno vía MHC I a linfocitos T CD8+", "MHC I presentando solo péptidos propios", "Macrófagos ignorando el antígeno fagocitado"], correct: 1, explain: "La presentación cruzada es la capacidad especializada de las células dendríticas de dirigir antígeno exógeno hacia el MHC I." },
  { tag: "apc", stem: "¿Qué células expresan MHC clase I?", options: ["Solo las CPA profesionales", "Solo los linfocitos B", "Prácticamente todas las células nucleadas", "Solo los eritrocitos"], correct: 2, explain: "El MHC I se expresa en casi todas las células nucleadas, a diferencia del MHC II, restringido principalmente a las CPA profesionales." },
];

export interface HemModule { id: string; num: string; title: string; desc: string; color: string }

export const HEMATOLOGIA_MODULES: HemModule[] = [
  { id: "mri", num: "01", title: "Resonancia de Médula Ósea", desc: "Médula roja vs. amarilla, señal T1/T2/STIR, conversión por edad.", color: "var(--accent-amber)" },
  { id: "hemato", num: "02", title: "Hematopoyesis", desc: "Árbol interactivo del linaje de la célula madre.", color: "var(--accent-blue)" },
  { id: "eryth", num: "03", title: "Eritropoyesis", desc: "Maduración por etapas y el ciclo de retroalimentación de la EPO.", color: "var(--accent-red)" },
  { id: "rbc", num: "04", title: "Fisiología del Eritrocito", desc: "Estructura, transporte de O2/CO2, equilibrio ácido-base, vida media.", color: "#e0505a" },
  { id: "wbc", num: "05", title: "Leucocitos", desc: "Cinco tipos celulares más el simulador de extravasación.", color: "var(--accent-blue)" },
  { id: "mono", num: "06", title: "Monocitos", desc: "De la sangre al tejido al macrófago, y fagocitosis.", color: "var(--accent-orange)" },
  { id: "quiz", num: "07", title: "Ponte a Prueba", desc: "Banco de recuperación activa más un modo examen cronometrado.", color: "var(--success)" },
];
