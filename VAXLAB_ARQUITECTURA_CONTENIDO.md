# VAXLAB MÉXICO — Arquitectura de Contenido (Paso 1-2)
### Extracción fiel de tus dos fuentes. Cero contenido inventado.

> **Regla aplicada:** todo lo que sigue proviene literalmente de `evidencia_vacunacion_mexico_2026.html` [FUENTE: HTML] o de `INMUNIZACIONES_Y_ENVM-2.pdf` [FUENTE: PDF]. Donde el prompt pide algo que ninguno de los dos contiene, está marcado `[CONTENIDO NO DISPONIBLE EN LA INVESTIGACIÓN]`.

---

## ⚠️ HALLAZGO CRÍTICO — léelo antes de seguir

Tu PDF se titula "INMUNIZACIONES Y ENVM", pero su contenido real es:
1. Ontogenia y fisiología de la hematopoyesis (fases mesoblástica/hepática/medular).
2. Inmunología celular/molecular general (APCs, CMH-I/II, centros germinales) — **no específica de México**.
3. Normativa de **banco de sangre y transfusión** (NOM-253-SSA1-2012, NOM-EM-003-SSA-1994) — hemocomponentes, hemovigilancia, no vacunación.
4. Una sección literalmente llamada "Esquema Nacional de Vacunación en México (ENVM)" que **solo describe qué es el ENVM en 2 párrafos genéricos — no lista ninguna vacuna, edad ni dosis**.
5. Glosario y bibliografía (Abbas, Guyton y Hall, Ruiz Argüelles, Langman, Sánchez Guijo, + las 2 NOM).

**El esquema real de vacunación (vacunas/edades/dosis) vive en tu HTML, no en el PDF.** Lo fusiono igual, pero quiero que sepas exactamente de dónde sale cada dato antes de que lo veas en la plataforma.

---

## 1. IDENTIDAD Y MENSAJE — [FUENTE: tu prompt, no requiere fuente médica]
- Nombre: **VAXLAB MÉXICO** · Subtítulo: *Immunology • Vaccination • Clinical Decision*
- Modo competitivo interno: **VAX ARENA**
- Mensaje: *"Comprende la inmunidad. Aplica el esquema. Toma decisiones."*
- Dos modos visibles desde el inicio: 🧠 **LEARN MODE** (*Understand before you compete*) / ⚔️ **ARENA MODE** (*Prove what you know*)

---

## 2. INMUNOLOGÍA (para Módulo 1 — Immunology Lab)

**Cascada: Antígeno → presentación/reconocimiento → activación → efectora → memoria → respuesta secundaria**

| Etapa | Contenido verificado | Fuente |
|---|---|---|
| Captura de antígeno | Células dendríticas procesan y presentan péptidos antigénicos | PDF |
| Presentación/reconocimiento | Vía CMH-I (linfocitos CD8+ citotóxicos) o CMH-II (linfocitos CD4+ cooperadores) | PDF |
| Activación | Cooperación T-B en centros germinales de ganglios linfáticos; migración de APCs al ganglio | HTML + PDF (coinciden) |
| Respuesta efectora | Hipermutación somática B, cambio de clase isotípica (IgM→IgG, IgA o IgE), expansión clonal T CD4+/CD8+ | PDF |
| Memoria inmunológica | Células plasmáticas de larga vida + linfocitos B/T de memoria, alojados en el **nicho óseo** | HTML ("3. Nicho Óseo") + PDF |
| Respuesta secundaria | Neutralización cruzada contra linajes emergentes (ejemplo dado: inmunidad híbrida vs. variantes SARS-CoV-2) | HTML |

**Inmunidad innata** [FUENTE: PDF]: respuesta rápida, inespecífica — barreras epiteliales, fagocitos (macrófagos/neutrófilos), sistema de complemento. La migración leucocitaria desde sangre hacia tejido dañado permite digestión bacteriana y secreción de sustancias proinflamatorias, preparando el terreno para la inmunidad adaptativa.

**Inmunidad adquirida/adaptativa** [FUENTE: PDF]: precisión molecular + memoria inmunológica permanente; origen en órganos linfoides primarios (timo, médula ósea). Fallas en esta maduración → inmunodeficiencia grave o autoinmunidad.

**Árbol de diferenciación de células inmunes** (Figura 1 del PDF) — mieloide (basófilo, eosinófilo, neutrófilo, monocito → macrófago/célula dendrítica) y linfoide (T-killer, T-helper, B-cell, NK) desde la célula madre. *(Esta figura es reutilizable como referencia visual del Knowledge Map.)*

---

## 3. ACTIVA VS. PASIVA (Módulo 2)

`[CONTENIDO NO DISPONIBLE EN LA INVESTIGACIÓN]` — **ninguno de los dos documentos define explícitamente "inmunización activa" vs. "pasiva" con ejemplos, origen de protección, tiempo o duración comparada.** El PDF solo distingue *tipos de vacuna* (vivas atenuadas vs. inactivadas/subunidades — ver Tabla 2 abajo), no activa/pasiva como eje de clasificación con ejemplos concretos (ej. inmunoglobulinas = pasiva).

**Actualización:** el autor del proyecto autorizó explícitamente rellenar este módulo con bibliografía estándar (Abbas, 2020), citada como `BIBLIOGRAFÍA` — ver `src/lib/content.ts` → `ACTIVE_VS_PASSIVE`, renderizado en `/immunology`. El ejemplo de inmunoglobulina anti-D en el lado "pasiva" sí proviene literalmente del PDF (NOM-253-SSA1-2012) y se cita como tal.

---

## 4. VACCINE EXPLORER (Módulo 3) — Tabla 2 del PDF, única fuente con esta estructura

| Tipo | Mecanismo inmunológico principal | Precaución en pacientes hematopoyéticos |
|---|---|---|
| **Virus atenuados** | Infección subclínica que estimula inmunidad celular y humoral robusta | **Contraindicadas** en inmunodepresión severa o post-TPH reciente (Abbas, 2020) |
| **Inactivadas / Subunidades** | Presentación antigénica exógena al CMH-II | Seguras, aunque pueden requerir refuerzos por respuesta inmune disminuida (Sánchez Guijo, 2020) |

*(Solo 2 tipos de vacuna tienen datos suficientes — el prompt pide "no agregar tipos no incluidos en tu investigación", así que el Vaccine Explorer arranca con exactamente estas 2 tarjetas.)*

---

## 5. ESQUEMA NACIONAL DE VACUNACIÓN MÉXICO (Módulo 4 — Life Course Map) — [FUENTE: HTML]

| Etapa de vida | Vacuna | Protege contra | Edad/dosis | Refuerzo | Dato clínico |
|---|---|---|---|---|---|
| **Nacimiento** | BCG | Tuberculosis meníngea | Dosis única, al nacer | — | — |
| **Nacimiento** | Hepatitis B | Hepatitis B | Dosis neonatal | — | — |
| **Lactante (2, 4 y 6 meses)** | Hexavalente acelular | Difteria, Tos ferina, Tétanos, Hib, Hepatitis B, Polio | 3 dosis (2, 4, 6 m) | — | Cobertura nacional: **84.2%** (meta 95%) |
| **Lactante (2, 4 y 6 meses)** | Rotavirus | Gastroenteritis por rotavirus | Según esquema de 2, 4 (y 6 si aplica) meses | — | — |
| **Lactante (2, 4 y 6 meses)** | Neumococo conjugada | Enfermedad neumocócica | 1ª y 2ª dosis (2 y 4 m) | Refuerzo a los 12 m | — |
| **Infancia (12 y 18 meses)** | SRP (triple viral) | Sarampión, Rubéola, Parotiditis | 1ª dosis a los 12 m | 2ª dosis a los 18 m (obligatoria) | Cobertura SRP1 nacional: **79.9%** (meta OMS/nacional: 95%) — brecha que motivó jornadas de recuperación en 2026 |
| **Infancia (12 meses)** | Neumococo | (ver arriba) | Refuerzo a los 12 m | — | — |
| **Adolescencia** | VPH | Virus del Papiloma Humano | Niñas 10-14 años / 5º de primaria | `[CONTENIDO NO DISPONIBLE EN LA INVESTIGACIÓN]` (nº de dosis no especificado) | Adherencia a esquema completo >80% en cohortes urbanas (Soto-De León et al., 2023) |
| **Adultos** | Td / Tdap | Tétanos, Difteria (/Tos ferina) | Refuerzos; indicada en mujeres embarazadas | `[CONTENIDO NO DISPONIBLE EN LA INVESTIGACIÓN]` | — |
| **Adultos / campaña invernal** | Influenza, COVID-19, Neumococo (combinadas) | Influenza estacional, COVID-19, enfermedad neumocócica | Campaña invernal anual | — | >16.5 millones de dosis distribuidas por IMSS en grupos vulnerables y adultos mayores |
| **Adulto mayor (dedicado)** | Ver actualización abajo | — | — | — | Solo se mencionaba como destinatario de la campaña invernal, sin ficha propia |
| **Grupos especiales (post-TPH / inmunocomprometidos)** | Inactivadas (Influenza, COVID-19, Neumococo conjugada, Hexavalente/Tdap) | — | Inicio a los **3-6 meses post-trasplante** | — | APCs en reactivación |
| **Grupos especiales (post-TPH)** | RZV (Herpes Zóster recombinante) | Herpes Zóster / neuralgia postherpética | **6-12 meses post-trasplante** | — | Efectividad demostrada: **68.2%** en receptores HSCT (Silva-Pinto et al., 2024) |
| **Grupos especiales (post-TPH)** | Virus vivos atenuados (SRP / Varicela) | — | Solo **>24 meses** post-trasplante | — | Únicamente tras suspensión total de inmunosupresores y sin EICH activa |

**Nota cruzada con el PDF:** el PDF confirma, desde la fisiología, por qué el protocolo HSCT del HTML tiene esa lógica — Tabla 2 del PDF dice que las vacunas vivas atenuadas están contraindicadas en inmunodepresión severa/post-TPH reciente, y el PDF añade (texto, no tabla) que el reinicio de esquemas inactivados generalmente ocurre "a partir de los 6 a 12 meses posteriores al trasplante, una vez recuperada la subpoblación linfocitaria CD4+" — un dato ligeramente distinto al "3-6 meses" del HTML para inactivadas. **Dejo ambos números visibles con su fuente citada en vez de elegir uno silenciosamente** — esto es exactamente el tipo de discrepancia entre fuentes que tu regla "no inventes" me pide exponer, no resolver por mi cuenta.

**"Modo sigue a un paciente"**: con los datos disponibles, el recorrido real que puedo construir sin inventar nada es: `Nacimiento (BCG+HepB) → 2m (Hexavalente+Rotavirus+Neumococo) → 4m (Hexavalente+Rotavirus+Neumococo) → 6m (Hexavalente) → 12m (SRP1+Neumococo refuerzo) → 18m (SRP2) → 10-14 años (VPH, si es niña) → adulto (Td/Tdap, campaña invernal)`.

**Actualización — Adulto mayor:** el autor del proyecto autorizó rellenar esta etapa con bibliografía estándar de inmunización geriátrica (influenza anual, neumocócica, herpes zóster, Td/Tdap) — ver `src/lib/content.ts` → entradas `adulto-mayor-*` en `NATIONAL_SCHEDULE`, todas tageadas `BIBLIOGRAFÍA` y claramente diferenciadas en la UI del dato oficial mexicano.

---

## 6. MEMORY RESPONSE SIMULATOR (Módulo 5)

Conceptual, tal como pide el prompt ("no agregues cifras artificiales... la gráfica debe ser conceptual si tu investigación no da valores"):
`Primera exposición → respuesta primaria (lenta, IgM predominante) → células de memoria (nicho óseo) → refuerzo/booster → respuesta secundaria (más rápida, más intensa, IgG)` — [FUENTE: PDF, mecanismo de centros germinales + memoria B/T].
**Si un día me das cifras reales de cinética (títulos de anticuerpos en el tiempo), la curva deja de ser conceptual.** Por ahora, ningún documento trae esos valores — no voy a inventar un eje Y con números.

---

## 7. KPIs / DASHBOARD GENERAL — [FUENTE: HTML, tabla de KPIs]

| Métrica | Valor | Fuente citada en el HTML |
|---|---|---|
| Efectividad inmunidad híbrida (COVID-19 severo, 11 meses) | >95% | Bobrovitz et al., Lancet Infect Dis (2023) |
| Cobertura SRP1 México | 79.9% (meta 95%) | Informes de Salud, Cámara de Diputados (2026) |
| Seroconversión en Artritis Reumatoide | 88.1% | Estudios Inmunocomprometidos (2024) |
| Efectividad RZV post-HSCT | 68.2% | Vaccines / Silva-Pinto et al. (2024-2025) |
| Cobertura Hexavalente | 84.2% | HTML |
| Protección incremental refuerzo JN.1 | 54% | Link-Gelles et al., MMWR/CDC (2024) |
| Adherencia VPH escolar (cohortes urbanas) | >80% (82%) | Soto-De León et al. (2023) |
| Memoria T CD4+/CD8+ estable | >12 meses | Sette & Crotty, Nat Rev Immunol (2022) |
| Dosis campaña invernal IMSS | >16.5 millones | HTML |

---

## 8. BANCO DE PREGUNTAS — fuentes utilizables por categoría

- **ROUND 1 · IMMUNOLOGY** → cascada APC/CMH-I-II/centros germinales/memoria (PDF) + innata vs. adaptativa (PDF). ✅ Suficiente para 8-10 preguntas Recall/Comprensión.
- **ROUND 2 · VACCINES** → Tabla 2 del PDF (atenuadas vs. inactivadas) + KPIs del HTML. ✅ Suficiente para 6-8 preguntas, limitado por solo tener 2 tipos de vacuna.
- **ROUND 3 · MÉXICO** → esquema de la sección 5 arriba + KPIs de cobertura. ✅ Suficiente para 8-10 preguntas, con huecos donde puse placeholder.
- **ROUND 4 · CLINICAL DECISION** → protocolo HSCT (HTML) + Tabla 2 del PDF (contraindicación de vivos atenuados) + NOM-253. ✅ Parcial.
- **FINAL · CLINICAL BOSS** → caso HSCT — ✅ Resoluble 100% con tus datos.

---

## 9. LITERATURA (para la sección "Content Source Panel" / trazabilidad)

Los 9 artículos de tu matriz HTML (Bobrovitz 2023, Bouzas-Rodríguez 2025, Silva-Pinto 2024, González-Serna 2024, Link-Gelles 2024, Chavda 2023, Secretaría de Salud/CeNSIA 2024, Soto-De León 2023, Sette & Crotty 2022) se cargan tal cual, con su DOI, como `source_reference` de cada pregunta que los use.

---

## RESUMEN DE DECISIÓN

Fase 1 (Foundation) y parte de Fase 2 (VaxLab) ya están construidas sobre esta arquitectura de contenido. Las dos ampliaciones bibliográficas (Activa/Pasiva, Adulto Mayor) ya fueron autorizadas por el autor del proyecto e incorporadas, claramente etiquetadas. Para Vax Arena se necesitará una cuenta gratuita de Supabase (el autor del proyecto debe crearla él mismo) — los pasos exactos están en el README, sección 6.
