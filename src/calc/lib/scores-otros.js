// Scores y escalas: nutrición/fragilidad/comorbilidad, obstetricia, pediatría, reumatología y dermatología.
import { rd, pts, band, U } from '../h.js';

// ── ayudas locales ──────────────────────────────────────────────
const S = (id, l, o, x = {}) => ({ t: 'sel', id, l, o, ...x });
const N = (id, l, u, min, max, step, x = {}) => ({ t: 'num', id, l, u, min, max, step, ...x });
const C = (id, l, p = 1) => ({ t: 'chk', id, l, pts: p });
const H = l => ({ t: 'head', l });
const SN = [['si', 'Sí'], ['no', 'No']];
const fx = (x, d = 1) => String(rd(x, d)).replace('.', ',');
const pcr_mgdl = { u: 'mg/dL', f: x => x * 10 };   // PCR mg/dL → mg/L
const pcr_mgl = { u: 'mg/L', f: x => x / 10 };     // PCR mg/L → mg/dL
const VERIF = '2026-10';
// calc(v, P): P = suma de puntos de las entradas sel/chk de la herramienta
const T = t => { const c = t.calc; if (c && c.length > 1) t.calc = v => c(v, pts(v, t.in)); return t; };

const TOOLS = [
  // ═══════════════════════════ NUTRICIÓN / FRAGILIDAD / COMORBILIDAD ═══════════════════════════
  {
    id: 'must', m: 's', cat: 'nutricion', tags: [],
    n: 'MUST (Malnutrition Universal Screening Tool)', sig: 'MUST', syn: ['cribado nutricional', 'desnutricion', 'bapen'],
    tipo: 'escala clínica',
    fin: 'Tamizaje del riesgo de desnutrición en adultos (hospital, comunidad y residencias).',
    ver: 'MUST, BAPEN 2003 (5 pasos; pasos 1–3 puntúan)',
    formula: 'Paso 1 — IMC: > 20 (> 30 obeso) = 0; 18,5–20 = 1; < 18,5 = 2\nPaso 2 — pérdida de peso no planificada en 3–6 meses: < 5 % = 0; 5–10 % = 1; > 10 % = 2\nPaso 3 — efecto de enfermedad aguda (paciente agudamente enfermo y sin ingesta, o con probable falta de ingesta, > 5 días) = 2\nTotal: 0 riesgo bajo · 1 riesgo medio · ≥ 2 riesgo alto',
    in: [
      N('peso', 'Peso', 'kg', 20, 300, 0.1, { alt: [U.lb] }),
      N('talla', 'Talla', 'cm', 100, 230, 0.5, { alt: [U.inch] }),
      S('pp', 'Pérdida de peso no planificada en los últimos 3–6 meses', [['0', '< 5 %', 0], ['1', '5–10 %', 1], ['2', '> 10 %', 2]]),
      S('ag', 'Efecto de enfermedad aguda: paciente agudamente enfermo y sin ingesta nutricional (o probable falta de ingesta) por > 5 días', [['no', 'No', 0], ['si', 'Sí', 2]])
    ],
    calc: v => {
      const imc = v.peso / (v.talla / 100) ** 2;
      const p1 = imc > 20 ? 0 : imc >= 18.5 ? 1 : 2;
      const r = p1 + pts(v, [{ t: 'sel', id: 'pp', o: [['0', '', 0], ['1', '', 1], ['2', '', 2]] }, { t: 'sel', id: 'ag', o: [['no', '', 0], ['si', '', 2]] }]);
      return { r, d: 0, lab: 'MUST', ...band(r, [[0, 0, 'Riesgo bajo de desnutrición', 'ok'], [1, 1, 'Riesgo medio de desnutrición', 'warn'], [2, 6, 'Riesgo alto de desnutrición', 'bad']]),
        more: [['IMC', fx(imc) + ' kg/m²'], ['Puntos por IMC', String(p1)]], note: imc > 30 ? 'IMC > 30: obesidad (el paso 1 puntúa 0).' : '' };
    },
    ref: 'Elia M (ed). The «MUST» report. Nutritional screening of adults: a multidisciplinary responsibility. Redditch: BAPEN; 2003.',
    url: 'https://www.bapen.org.uk/screening-and-must/must/must-toolkit/the-must-itself/',
    verif: VERIF,
    pop: 'Adultos en todos los ámbitos asistenciales (hospital, ambulatorio, residencias).',
    lim: 'Es un tamizaje, no una valoración nutricional completa. No validado en embarazo, lactancia ni pediatría. Con edemas, ascitis, yesos o amputaciones el IMC y el peso pierden validez (BAPEN ofrece criterios subjetivos alternativos).',
    tests: [
      { v: { peso: 50, talla: 165, pp: '1', ag: 'no' }, r: 3 },   // IMC 18,4 → 2 + 1
      { v: { peso: 70, talla: 170, pp: '0', ag: 'no' }, r: 0 },
      { v: { peso: 70, talla: 170, pp: '0', ag: 'si' }, r: 2 }
    ]
  },
  {
    id: 'nrs-2002', m: 's', cat: 'nutricion', tags: [],
    n: 'NRS-2002 (Nutritional Risk Screening 2002)', sig: 'NRS-2002', syn: ['kondrup', 'riesgo nutricional', 'espen'],
    tipo: 'escala clínica',
    fin: 'Detecta pacientes hospitalizados en riesgo nutricional que se benefician de soporte nutricional.',
    ver: 'Kondrup 2003 (ESPEN) — tamizaje final',
    formula: 'Tamizaje inicial (si alguna respuesta es «sí», pasar al final): IMC < 20,5; pérdida de peso en 3 meses; ingesta reducida en la última semana; enfermedad grave.\nTamizaje final = deterioro del estado nutricional (0–3) + gravedad de la enfermedad (0–3) + 1 si edad ≥ 70 años.\n≥ 3: en riesgo nutricional → iniciar plan nutricional; < 3: repetir semanalmente.',
    in: [
      S('nut', 'Deterioro del estado nutricional', [
        ['0', 'Ausente (0): estado nutricional normal', 0],
        ['1', 'Leve (1): pérdida de peso > 5 % en 3 meses, o ingesta 50–75 % del requerimiento en la última semana', 1],
        ['2', 'Moderado (2): pérdida de peso > 5 % en 2 meses, o IMC 18,5–20,5 + estado general deteriorado, o ingesta 25–60 % del requerimiento en la última semana', 2],
        ['3', 'Grave (3): pérdida de peso > 5 % en 1 mes (> 15 % en 3 meses), o IMC < 18,5 + estado general deteriorado, o ingesta 0–25 % del requerimiento en la última semana', 3]]),
      S('enf', 'Gravedad de la enfermedad (aumento de requerimientos)', [
        ['0', 'Ausente (0): requerimientos normales', 0],
        ['1', 'Leve (1): fractura de cadera; pacientes crónicos, en especial con complicaciones agudas: cirrosis, EPOC, hemodiálisis crónica, diabetes, oncológicos', 1],
        ['2', 'Moderada (2): cirugía abdominal mayor, ACV, neumonía grave, neoplasia hematológica', 2],
        ['3', 'Grave (3): traumatismo de cráneo, trasplante de médula ósea, paciente de terapia intensiva (APACHE II > 10)', 3]]),
      N('edad', 'Edad', 'años', 18, 120, 1)
    ],
    calc: v => {
      const ed = v.edad >= 70 ? 1 : 0;
      const r = +v.nut + +v.enf + ed;
      return { r, d: 0, lab: 'NRS-2002', ...band(r, [[0, 2, 'Sin riesgo nutricional actual: repetir el tamizaje semanalmente', 'ok'], [3, 7, 'En riesgo nutricional: indicación de plan de soporte nutricional', 'bad']]),
        more: [['Punto por edad ≥ 70 años', String(ed)]] };
    },
    ref: 'Kondrup J, Rasmussen HH, Hamberg O, Stanga Z; Ad Hoc ESPEN Working Group. Nutritional risk screening (NRS 2002): a new method based on an analysis of controlled clinical trials. Clin Nutr. 2003;22(3):321-336.',
    url: 'https://doi.org/10.1016/S0261-5614(02)00214-5',
    verif: VERIF,
    pop: 'Adultos hospitalizados (desarrollado sobre ensayos controlados de soporte nutricional).',
    lim: 'Pensado para pacientes internados; no validado en pediatría ni en el ámbito ambulatorio. Ante duda entre dos categorías se elige según la sección más afectada; la puntuación de la enfermedad se ajusta por analogía a los ejemplos.',
    tests: [
      { v: { nut: '2', enf: '2', edad: 75 }, r: 5 },
      { v: { nut: '1', enf: '1', edad: 50 }, r: 2 }
    ]
  },
  {
    id: 'mna-sf', m: 's', cat: 'nutricion', tags: [],
    n: 'MNA-SF (Mini Nutritional Assessment, forma corta)', sig: 'MNA-SF', syn: ['mini nutritional', 'mna', 'adulto mayor nutricion'],
    tipo: 'escala clínica',
    fin: 'Tamizaje de desnutrición y riesgo de desnutrición en adultos mayores.',
    ver: 'MNA-SF revisada (Kaiser 2009), con circunferencia de pantorrilla como alternativa al IMC',
    formula: 'A ingesta (0–2) + B pérdida de peso (0–3) + C movilidad (0–2) + D estrés/enfermedad aguda (0/2) + E problemas neuropsicológicos (0–2) + F1 IMC (0–3) [o F2 circunferencia de pantorrilla: < 31 cm = 0, ≥ 31 cm = 3]\n12–14 estado nutricional normal · 8–11 riesgo de desnutrición · 0–7 desnutrición',
    in: [
      S('a', 'A. ¿Disminuyó la ingesta en los últimos 3 meses por pérdida de apetito, problemas digestivos o dificultad para masticar o tragar?', [['0', 'Disminución grave de la ingesta', 0], ['1', 'Disminución moderada', 1], ['2', 'Sin disminución', 2]]),
      S('b', 'B. Pérdida de peso en los últimos 3 meses', [['0', 'Mayor de 3 kg', 0], ['1', 'No sabe', 1], ['2', 'Entre 1 y 3 kg', 2], ['3', 'Sin pérdida de peso', 3]]),
      S('c', 'C. Movilidad', [['0', 'Cama o sillón', 0], ['1', 'Se levanta de la cama/sillón pero no sale', 1], ['2', 'Sale de su domicilio', 2]]),
      S('d', 'D. ¿Sufrió estrés psicológico o enfermedad aguda en los últimos 3 meses?', [['0', 'Sí', 0], ['2', 'No', 2]]),
      S('e', 'E. Problemas neuropsicológicos', [['0', 'Demencia o depresión grave', 0], ['1', 'Demencia leve', 1], ['2', 'Sin problemas psicológicos', 2]]),
      H('F. IMC (F1) o, si no se dispone de IMC, circunferencia de pantorrilla (F2)'),
      N('peso', 'Peso', 'kg', 20, 250, 0.1, { req: 0, alt: [U.lb] }),
      N('talla', 'Talla', 'cm', 100, 220, 0.5, { req: 0, alt: [U.inch] }),
      N('cp', 'Circunferencia de pantorrilla (solo si no hay IMC)', 'cm', 10, 70, 0.5, { req: 0, alt: [U.inch] })
    ],
    calc: v => {
      let f, fl;
      if (v.peso != null && v.talla != null) {
        const imc = v.peso / (v.talla / 100) ** 2;
        f = imc < 19 ? 0 : imc < 21 ? 1 : imc < 23 ? 2 : 3; fl = ['F1 · IMC', fx(imc) + ' kg/m² → ' + f + ' pts'];
      } else if (v.cp != null) { f = v.cp < 31 ? 0 : 3; fl = ['F2 · Pantorrilla', fx(v.cp) + ' cm → ' + f + ' pts']; }
      else return null;
      const r = +v.a + +v.b + +v.c + +v.d + +v.e + f;
      return { r, d: 0, lab: 'MNA-SF', ...band(r, [[12, 14, 'Estado nutricional normal', 'ok'], [8, 11, 'Riesgo de desnutrición', 'warn'], [0, 7, 'Desnutrición', 'bad']]), more: [fl] };
    },
    ref: 'Kaiser MJ, Bauer JM, Ramsch C, et al. Validation of the Mini Nutritional Assessment short-form (MNA-SF): a practical tool for identification of nutritional status. J Nutr Health Aging. 2009;13(9):782-788. · Rubenstein LZ, Harker JO, Salvà A, Guigoz Y, Vellas B. Screening for undernutrition in geriatric practice: developing the short-form MNA (MNA-SF). J Gerontol A Biol Sci Med Sci. 2001;56(6):M366-M372.',
    url: 'https://doi.org/10.1007/s12603-009-0214-7',
    verif: VERIF,
    pop: 'Adultos ≥ 65 años (comunidad, internación, residencias).',
    lim: 'Ingresar peso y talla (F1); usar la pantorrilla (F2) solo si no se puede obtener el IMC. Un resultado anormal requiere valoración nutricional completa. Instrumento con derechos de Nestlé; uso clínico libre.',
    tests: [
      { v: { a: '2', b: '3', c: '2', d: '2', e: '2', peso: 70, talla: 170 }, r: 14 },
      { v: { a: '1', b: '1', c: '1', d: '0', e: '1', cp: 29 }, r: 4 },
      { v: { a: '2', b: '2', c: '2', d: '2', e: '1', peso: 52, talla: 160 }, r: 10 }   // IMC 20,3 → 1
    ]
  },
  {
    id: 'frail-scale', m: 's', cat: 'nutricion', tags: [],
    n: 'Escala FRAIL', sig: 'FRAIL', syn: ['fragilidad', 'morley', 'frail scale'],
    tipo: 'escala clínica',
    fin: 'Tamizaje rápido de fragilidad por autorreporte (5 preguntas).',
    ver: 'FRAIL (Morley 2012; IANA Task Force)',
    formula: 'Fatiga + Resistencia + Deambulación + Enfermedades (≥ 5 de 11) + pérdida de peso (> 5 % en 1 año), 1 punto c/u\n0 robusto · 1–2 prefrágil · 3–5 frágil',
    in: [
      S('fat', '¿Cuánto tiempo durante las últimas 4 semanas se sintió cansado/a?', [['1', 'Todo el tiempo', 1], ['2', 'La mayor parte del tiempo', 1], ['3', 'Parte del tiempo', 0], ['4', 'Un poco del tiempo', 0], ['5', 'Nunca', 0]]),
      S('res', 'Solo/a y sin ayudas, ¿tiene dificultad para subir 10 escalones sin descansar?', [['si', 'Sí', 1], ['no', 'No', 0]]),
      S('amb', 'Solo/a y sin ayudas, ¿tiene dificultad para caminar varios cientos de metros (una cuadra)?', [['si', 'Sí', 1], ['no', 'No', 0]]),
      H('Enfermedades diagnosticadas por un médico (puntúa si ≥ 5 de 11)'),
      C('hta', 'Hipertensión arterial'), C('dbt', 'Diabetes'), C('can', 'Cáncer (excepto cáncer de piel menor)'), C('epoc', 'Enfermedad pulmonar crónica'),
      C('iam', 'Infarto de miocardio'), C('icc', 'Insuficiencia cardíaca congestiva'), C('ang', 'Angina'), C('asma', 'Asma'),
      C('art', 'Artritis'), C('acv', 'ACV'), C('renal', 'Enfermedad renal'),
      S('pp', '¿Perdió más del 5 % de su peso en el último año?', [['si', 'Sí', 1], ['no', 'No', 0]])
    ],
    calc: v => {
      const n = ['hta', 'dbt', 'can', 'epoc', 'iam', 'icc', 'ang', 'asma', 'art', 'acv', 'renal'].filter(k => v[k]).length;
      const ill = n >= 5 ? 1 : 0;
      const r = (['1', '2'].includes(String(v.fat)) ? 1 : 0) + (v.res == 'si' ? 1 : 0) + (v.amb == 'si' ? 1 : 0) + ill + (v.pp == 'si' ? 1 : 0);
      return { r, d: 0, lab: 'FRAIL', ...band(r, [[0, 0, 'Robusto', 'ok'], [1, 2, 'Prefrágil', 'warn'], [3, 5, 'Frágil', 'bad']]), more: [['Enfermedades', n + ' de 11 → ' + ill + ' pto']] };
    },
    ref: 'Morley JE, Malmstrom TK, Miller DK. A simple frailty questionnaire (FRAIL) predicts outcomes in middle aged African Americans. J Nutr Health Aging. 2012;16(7):601-608.',
    url: 'https://doi.org/10.1007/s12603-012-0084-2',
    verif: VERIF,
    pop: 'Adultos de mediana edad y mayores en la comunidad (validación inicial en afroamericanos de 49–65 años; luego en múltiples cohortes geriátricas).',
    lim: 'Autorreporte: depende de la comprensión y la memoria del paciente. Es tamizaje; no reemplaza la valoración geriátrica integral.',
    tests: [
      { v: { fat: '2', res: 'si', amb: 'no', pp: 'si' }, r: 3 },
      { v: { fat: '5', res: 'no', amb: 'no', pp: 'no', hta: 1, dbt: 1, icc: 1, art: 1, renal: 1 }, r: 1 }
    ]
  },
  {
    id: 'fried', m: 's', cat: 'nutricion', tags: [],
    n: 'Fenotipo de fragilidad de Fried', sig: '', syn: ['fragilidad', 'chs', 'fried frailty phenotype'],
    tipo: 'criterio diagnóstico',
    fin: 'Clasifica fragilidad física según 5 criterios objetivos y autorreferidos.',
    ver: 'Fried 2001 (Cardiovascular Health Study), puntos de corte originales',
    formula: '1 punto por criterio:\n1) Pérdida de peso no intencional ≥ 4,5 kg (10 lb) en el último año\n2) Debilidad: fuerza de prensión ≤ corte por sexo e IMC — Varones: IMC ≤ 24 → ≤ 29 kg; 24,1–26 → ≤ 30; 26,1–28 → ≤ 30; > 28 → ≤ 32 · Mujeres: IMC ≤ 23 → ≤ 17; 23,1–26 → ≤ 17,3; 26,1–29 → ≤ 18; > 29 → ≤ 21\n3) Agotamiento: respuesta 2 o 3 a cualquiera de los 2 ítems de la CES-D\n4) Lentitud: tiempo para caminar 15 pies (4,57 m) — Varones: talla ≤ 173 cm → ≥ 7 s; > 173 → ≥ 6 s · Mujeres: talla ≤ 159 cm → ≥ 7 s; > 159 → ≥ 6 s\n5) Baja actividad física (Minnesota Leisure Time): varones < 383 kcal/semana; mujeres < 270 kcal/semana\n0 robusto · 1–2 prefrágil · ≥ 3 frágil',
    in: [
      S('sexo', 'Sexo', [['m', 'Masculino'], ['f', 'Femenino']]),
      S('pp', 'Pérdida de peso no intencional ≥ 4,5 kg en el último año', [['si', 'Sí'], ['no', 'No']]),
      N('peso', 'Peso', 'kg', 25, 250, 0.1, { alt: [U.lb] }),
      N('talla', 'Talla', 'cm', 100, 220, 0.5, { alt: [U.inch] }),
      N('grip', 'Fuerza de prensión (mejor de 3 intentos, mano dominante, dinamómetro)', 'kg', 0, 100, 0.1),
      S('ces1', 'CES-D: «Sentí que todo lo que hacía era un esfuerzo» — en la última semana', [['0', '0 · Rara vez o nunca (< 1 día)'], ['1', '1 · Algo o poco (1–2 días)'], ['2', '2 · Moderadamente (3–4 días)'], ['3', '3 · La mayor parte del tiempo']]),
      S('ces2', 'CES-D: «No tenía ganas de hacer nada» (could not get going) — en la última semana', [['0', '0 · Rara vez o nunca (< 1 día)'], ['1', '1 · Algo o poco (1–2 días)'], ['2', '2 · Moderadamente (3–4 días)'], ['3', '3 · La mayor parte del tiempo']]),
      N('marcha', 'Tiempo para caminar 15 pies (4,57 m) a paso habitual', 's', 1, 120, 0.1),
      N('kcal', 'Gasto en actividad física (Minnesota Leisure Time Activity)', 'kcal/semana', 0, 20000, 1)
    ],
    calc: v => {
      const m = v.sexo == 'm';
      const imc = v.peso / (v.talla / 100) ** 2;
      const cg = m ? (imc <= 24 ? 29 : imc <= 26 ? 30 : imc <= 28 ? 30 : 32) : (imc <= 23 ? 17 : imc <= 26 ? 17.3 : imc <= 29 ? 18 : 21);
      const cm = m ? (v.talla <= 173 ? 7 : 6) : (v.talla <= 159 ? 7 : 6);
      const ck = m ? 383 : 270;
      const c = [v.pp == 'si', v.grip <= cg, +v.ces1 >= 2 || +v.ces2 >= 2, v.marcha >= cm, v.kcal < ck];
      const r = c.filter(Boolean).length;
      const nm = ['Pérdida de peso', 'Debilidad', 'Agotamiento', 'Lentitud', 'Baja actividad'];
      return { r, d: 0, lab: 'Criterios de Fried', ...band(r, [[0, 0, 'Robusto (no frágil)', 'ok'], [1, 2, 'Prefrágil', 'warn'], [3, 5, 'Frágil', 'bad']]),
        more: [['Criterios presentes', c.map((x, i) => x ? nm[i] : null).filter(Boolean).join(', ') || 'ninguno'], ['Corte de prensión aplicado', '≤ ' + fx(cg) + ' kg (IMC ' + fx(imc) + ')'], ['Corte de marcha aplicado', '≥ ' + cm + ' s'], ['Corte de actividad', '< ' + ck + ' kcal/semana']] };
    },
    ref: 'Fried LP, Tangen CM, Walston J, et al. Frailty in older adults: evidence for a phenotype. J Gerontol A Biol Sci Med Sci. 2001;56(3):M146-M156.',
    url: 'https://doi.org/10.1093/gerona/56.3.M146',
    verif: VERIF,
    pop: 'Adultos ≥ 65 años de la comunidad (Cardiovascular Health Study, EE. UU.).',
    lim: 'Los cortes de prensión, marcha y actividad son los cuantiles (20 % inferior) de la cohorte CHS y pueden no trasladarse a otras poblaciones; muchos estudios usan adaptaciones (p. ej., 4 m de marcha u otros cuestionarios de actividad) que no son equivalentes. Excluye por diseño a pacientes con Parkinson, ACV previo, demencia o depresión en tratamiento.',
    tests: [
      { v: { sexo: 'm', pp: 'si', peso: 70, talla: 170, grip: 25, ces1: '2', ces2: '0', marcha: 8, kcal: 1000 }, r: 4 },
      { v: { sexo: 'f', pp: 'no', peso: 60, talla: 160, grip: 22, ces1: '1', ces2: '1', marcha: 5, kcal: 500 }, r: 0 },
      { v: { sexo: 'f', pp: 'no', peso: 60, talla: 160, grip: 17.2, ces1: '1', ces2: '3', marcha: 5, kcal: 500 }, r: 2 }  // IMC 23,4 → corte 17,3
    ]
  },
  {
    id: 'charlson', m: 's', cat: 'nutricion', tags: ['s:epidemiologia'],
    n: 'Índice de comorbilidad de Charlson', sig: 'CCI', syn: ['charlson', 'comorbilidades', 'charlson age'],
    tipo: 'score pronóstico',
    fin: 'Cuantifica la carga de comorbilidad y estima el riesgo de mortalidad a largo plazo.',
    ver: 'Pesos originales de Charlson 1987; ajuste opcional por edad (Charlson 1994)',
    formula: '1 punto: IAM, ICC, enfermedad vascular periférica, enfermedad cerebrovascular, demencia, EPOC, conectivopatía, úlcera péptica, hepatopatía leve, diabetes sin daño de órgano blanco\n2 puntos: hemiplejía, enfermedad renal moderada-grave, diabetes con daño de órgano blanco, tumor sólido (sin metástasis), leucemia, linfoma\n3 puntos: hepatopatía moderada-grave\n6 puntos: tumor sólido metastásico, sida\nAjuste por edad (opcional): 50–59 = +1; 60–69 = +2; 70–79 = +3; ≥ 80 = +4\nSupervivencia estimada a 10 años = 0,983^(e^(0,9 × puntaje)) — fórmula de uso difundido (p. ej., MDCalc) derivada de la cohorte de Charlson 1987; se aplica al puntaje ajustado por edad si se ingresó la edad.',
    in: [
      H('1 punto'),
      C('iam', 'Infarto de miocardio (antecedente)'), C('icc', 'Insuficiencia cardíaca congestiva'), C('evp', 'Enfermedad vascular periférica (incluye aneurisma de aorta ≥ 6 cm)'),
      C('cv', 'Enfermedad cerebrovascular (ACV con secuela leve o nula, o AIT)'), C('dem', 'Demencia'), C('epoc', 'Enfermedad pulmonar crónica'),
      C('ctd', 'Enfermedad del tejido conectivo'), C('ulc', 'Úlcera péptica'),
      H('2 puntos'),
      C('hemi', 'Hemiplejía', 2), C('renal', 'Enfermedad renal moderada o grave (Cr > 3 mg/dL, diálisis, trasplante o uremia)', 2), C('leu', 'Leucemia (aguda o crónica)', 2), C('lin', 'Linfoma', 2),
      H('6 puntos'),
      C('sida', 'Sida (no solo VIH positivo)', 6),
      H('Categorías excluyentes'),
      S('dbt', 'Diabetes', [['0', 'No', 0], ['1', 'Sin daño de órgano blanco (1)', 1], ['2', 'Con daño de órgano blanco: retinopatía, nefropatía, neuropatía (2)', 2]]),
      S('hep', 'Hepatopatía', [['0', 'No', 0], ['1', 'Leve: hepatitis crónica o cirrosis sin hipertensión portal (1)', 1], ['3', 'Moderada o grave: cirrosis con hipertensión portal, con o sin sangrado variceal (3)', 3]]),
      S('tum', 'Tumor sólido', [['0', 'No', 0], ['2', 'Sin metástasis (2)', 2], ['6', 'Metastásico (6)', 6]]),
      N('edad', 'Edad (opcional, para el ajuste por edad)', 'años', 0, 120, 1, { req: 0 })
    ],
    calc: (v, P) => {
      const base = P;
      const pe = v.edad == null ? null : v.edad >= 80 ? 4 : v.edad >= 70 ? 3 : v.edad >= 60 ? 2 : v.edad >= 50 ? 1 : 0;
      const r = base + (pe || 0);
      const sv = 100 * Math.pow(0.983, Math.exp(0.9 * r));
      return { r, d: 0, lab: pe == null ? 'Charlson (sin ajuste por edad)' : 'Charlson ajustado por edad',
        interp: 'Supervivencia estimada a 10 años: ' + fx(sv, 0) + ' %', lvl: '',
        more: [['Puntaje por comorbilidades', String(base)], ['Puntos por edad', pe == null ? 'no ingresada' : String(pe)]] };
    },
    ref: 'Charlson ME, Pompei P, Ales KL, MacKenzie CR. A new method of classifying prognostic comorbidity in longitudinal studies: development and validation. J Chronic Dis. 1987;40(5):373-383. · Charlson M, Szatrowski TP, Peterson J, Gold J. Validation of a combined comorbidity index. J Clin Epidemiol. 1994;47(11):1245-1251.',
    url: 'https://doi.org/10.1016/0021-9681(87)90171-8',
    verif: VERIF,
    pop: 'Pacientes internados en clínica médica (derivación, 1984) y mujeres con cáncer de mama (validación); ampliamente usado en otras poblaciones.',
    lim: 'La supervivencia a 10 años es una estimación poblacional de una cohorte de los años 80, no un pronóstico individual. El tumor sólido cuenta si estuvo activo o tratado en los últimos 5 años. Existen versiones con pesos actualizados (Quan 2011) que no son las aplicadas aquí.',
    tests: [
      { v: { icc: 1, dbt: '2', tum: '0', hep: '0', edad: 72 }, r: 6 },
      { v: { dbt: '0', hep: '0', tum: '0' }, r: 0, },
      { v: { epoc: 1, dbt: '1', hep: '0', tum: '0' }, r: 2 }
    ]
  },
  {
    id: 'elixhauser-vw', m: 's', cat: 'nutricion', tags: ['s:epidemiologia'],
    n: 'Índice de comorbilidad de Elixhauser (van Walraven)', sig: '', syn: ['elixhauser', 'van walraven', 'comorbilidades'],
    tipo: 'score pronóstico',
    fin: 'Resume en un puntaje único las 30 comorbilidades de Elixhauser para estimar el riesgo de muerte intrahospitalaria.',
    ver: 'Sistema de puntos de van Walraven 2009 (30 comorbilidades de Elixhauser 1998)',
    formula: 'Suma de pesos: ICC 7 · arritmias 5 · valvulopatía −1 · circulación pulmonar 4 · vascular periférica 2 · HTA 0 · parálisis 7 · otros trastornos neurológicos 6 · EPOC 3 · diabetes (no complicada o complicada) 0 · hipotiroidismo 0 · insuficiencia renal 5 · hepatopatía 11 · úlcera péptica sin sangrado 0 · sida/VIH 0 · linfoma 9 · cáncer metastásico 12 · tumor sólido sin metástasis 4 · AR/colagenopatías 0 · coagulopatía 3 · obesidad −4 · pérdida de peso 6 · trastornos hidroelectrolíticos 5 · anemia por pérdida de sangre −2 · anemia carencial −2 · alcohol 0 · drogas −7 · psicosis 0 · depresión −3\nJerarquía: el cáncer metastásico excluye el tumor sólido. Rango −19 a 89.',
    in: [
      C('icc', 'Insuficiencia cardíaca congestiva (+7)', 7), C('arr', 'Arritmias cardíacas (+5)', 5), C('valv', 'Valvulopatía (−1)', -1),
      C('pulm', 'Trastornos de la circulación pulmonar (+4)', 4), C('evp', 'Enfermedad vascular periférica (+2)', 2), C('hta', 'Hipertensión, no complicada o complicada (0)', 0),
      C('par', 'Parálisis (+7)', 7), C('neu', 'Otros trastornos neurológicos (+6)', 6), C('epoc', 'Enfermedad pulmonar crónica (+3)', 3),
      C('dbt', 'Diabetes, no complicada o complicada (0)', 0), C('hipot', 'Hipotiroidismo (0)', 0), C('ir', 'Insuficiencia renal (+5)', 5),
      C('hep', 'Hepatopatía (+11)', 11), C('ulc', 'Úlcera péptica sin sangrado (0)', 0), C('vih', 'Sida/VIH (0)', 0), C('lin', 'Linfoma (+9)', 9),
      S('tum', 'Cáncer', [['0', 'No', 0], ['4', 'Tumor sólido sin metástasis (+4)', 4], ['12', 'Cáncer metastásico (+12)', 12]]),
      C('ar', 'Artritis reumatoidea / colagenopatías (0)', 0), C('coag', 'Coagulopatía (+3)', 3), C('obes', 'Obesidad (−4)', -4),
      C('pp', 'Pérdida de peso (+6)', 6), C('hidro', 'Trastornos de líquidos y electrolitos (+5)', 5), C('anps', 'Anemia por pérdida de sangre (−2)', -2),
      C('anc', 'Anemia carencial (−2)', -2), C('alc', 'Abuso de alcohol (0)', 0), C('drog', 'Abuso de drogas (−7)', -7), C('psi', 'Psicosis (0)', 0), C('dep', 'Depresión (−3)', -3)
    ],
    calc: (v, P) => {
      const r = P;
      return { r, d: 0, lab: 'Elixhauser (van Walraven)', interp: 'Puntaje continuo: a mayor valor, mayor riesgo de muerte intrahospitalaria (sin bandas de corte en la fuente).', lvl: '' };
    },
    ref: 'van Walraven C, Austin PC, Jennings A, Quan H, Forster AJ. A modification of the Elixhauser comorbidity measures into a point system for hospital death using administrative data. Med Care. 2009;47(6):626-633. · Elixhauser A, Steiner C, Harris DR, Coffey RM. Comorbidity measures for use with administrative data. Med Care. 1998;36(1):8-27.',
    url: 'https://doi.org/10.1097/MLR.0b013e31819432e5',
    verif: VERIF,
    pop: 'Altas hospitalarias de adultos (Ottawa, Canadá; bases administrativas con códigos CIE).',
    lim: 'Diseñado para datos administrativos (códigos CIE presentes al ingreso), no para la valoración clínica al lado de la cama. Los pesos negativos reflejan asociaciones en datos administrativos, no un efecto protector. Herramienta de ajuste de riesgo poblacional, no pronóstico individual.',
    tests: [
      { v: { icc: 1, arr: 1, tum: '12' }, r: 24 },
      { v: { obes: 1, dep: 1, tum: '0' }, r: -7 },
      { v: { hep: 1, coag: 1, hidro: 1, tum: '4' }, r: 23 }
    ]
  },

  // ═══════════════════════════ OBSTETRICIA ═══════════════════════════
  {
    id: 'bishop', m: 's', cat: 'obstetricia', tags: [],
    n: 'Score de Bishop', sig: '', syn: ['bishop', 'maduracion cervical', 'induccion del parto', 'cuello favorable'],
    tipo: 'escala clínica',
    fin: 'Evalúa las condiciones cervicales para predecir el éxito de la inducción del trabajo de parto.',
    ver: 'Bishop 1964 original (5 parámetros, 0–13). No incluye la versión modificada con longitud cervical.',
    formula: 'Dilatación: cerrado 0 · 1–2 cm 1 · 3–4 cm 2 · ≥ 5 cm 3\nBorramiento: 0–30 % 0 · 40–50 % 1 · 60–70 % 2 · ≥ 80 % 3\nAltura de la presentación: −3 0 · −2 1 · −1/0 2 · +1/+2 3\nConsistencia: firme 0 · media 1 · blanda 2\nPosición: posterior 0 · media 1 · anterior 2\nInterpretación (ACOG 2009): ≤ 6 cuello desfavorable; > 8 probabilidad de parto vaginal tras inducción similar al trabajo de parto espontáneo.',
    in: [
      S('dil', 'Dilatación', [['0', 'Cerrado', 0], ['1', '1–2 cm', 1], ['2', '3–4 cm', 2], ['3', '≥ 5 cm', 3]]),
      S('bor', 'Borramiento', [['0', '0–30 %', 0], ['1', '40–50 %', 1], ['2', '60–70 %', 2], ['3', '≥ 80 %', 3]]),
      S('alt', 'Altura de la presentación (estación)', [['0', '−3', 0], ['1', '−2', 1], ['2', '−1 / 0', 2], ['3', '+1 / +2', 3]]),
      S('cons', 'Consistencia', [['0', 'Firme', 0], ['1', 'Media', 1], ['2', 'Blanda', 2]]),
      S('pos', 'Posición', [['0', 'Posterior', 0], ['1', 'Media', 1], ['2', 'Anterior', 2]])
    ],
    calc: (v, P) => {
      const r = P;
      return { r, d: 0, lab: 'Bishop', ...band(r, [[0, 6, 'Cuello desfavorable (≤ 6)', 'warn'], [7, 8, 'Intermedio (7–8): sin categoría definida en la fuente', ''], [9, 13, 'Cuello favorable (> 8)', 'ok']]) };
    },
    ref: 'Bishop EH. Pelvic scoring for elective induction. Obstet Gynecol. 1964;24:266-268. · ACOG Practice Bulletin No. 107: Induction of labor. Obstet Gynecol. 2009;114(2 Pt 1):386-397.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/14199536/',
    verif: VERIF,
    pop: 'Embarazadas a término; el trabajo original se desarrolló en multíparas para inducción electiva.',
    lim: 'Valor predictivo modesto, menor en nulíparas. Variabilidad entre observadores. Los umbrales intermedios (7–8) no tienen interpretación consensuada.',
    tests: [
      { v: { dil: '1', bor: '1', alt: '1', cons: '1', pos: '0' }, r: 4 },
      { v: { dil: '2', bor: '2', alt: '2', cons: '2', pos: '2' }, r: 10 }
    ]
  },
  {
    id: 'is-obstetrico', m: 's', cat: 'obstetricia', tags: ['s:uti'],
    n: 'Índice de shock obstétrico', sig: 'IS', syn: ['shock index', 'indice de choque', 'hemorragia posparto', 'codigo rojo'],
    tipo: 'índice',
    fin: 'Relación FC/PAS para detectar compromiso hemodinámico en la hemorragia posparto.',
    ver: 'Umbrales de Nathan 2015 (BJOG): 0,9 y 1,7',
    formula: 'IS = FC (lpm) / PAS (mmHg)\n< 0,9: dentro del rango esperado en el puerperio inmediato (0,7–0,9)\n≥ 0,9: umbral propuesto para identificar necesidad de derivación / cuidados de mayor nivel\n≥ 1,7: necesidad de atención urgente («disparador rojo»)',
    in: [
      N('fc', 'Frecuencia cardíaca', 'lpm', 20, 250, 1),
      N('pas', 'Presión arterial sistólica', 'mmHg', 30, 260, 1)
    ],
    calc: v => {
      const r = v.fc / v.pas;
      const b = r >= 1.7 ? ['≥ 1,7: necesidad de atención urgente', 'bad'] : r >= 0.9 ? ['≥ 0,9: alerta — umbral propuesto para derivación a mayor complejidad', 'warn'] : ['< 0,9: dentro del rango esperado en el puerperio', 'ok'];
      return { r: rd(r, 2), d: 2, lab: 'Índice de shock', interp: b[0], lvl: b[1] };
    },
    ref: 'Nathan HL, El Ayadi A, Hezelgrave NL, et al. Shock index: an effective predictor of outcome in postpartum haemorrhage? BJOG. 2015;122(2):268-275.',
    url: 'https://doi.org/10.1111/1471-0528.13206',
    verif: VERIF,
    pop: 'Puérperas con hemorragia posparto (estudio retrospectivo, centro terciario del Reino Unido).',
    lim: 'Umbrales derivados de un estudio retrospectivo unicéntrico; la sensibilidad del 0,9 para ingreso a UTI fue alta pero con especificidad baja. Betabloqueantes, dolor, fiebre o anemia previa alteran el índice. Complementa, no reemplaza, la estimación de la pérdida y la evaluación clínica.',
    tests: [
      { v: { fc: 120, pas: 100 }, r: 1.2 },
      { v: { fc: 80, pas: 110 }, r: 0.73 },
      { v: { fc: 140, pas: 80 }, r: 'urgente' }
    ]
  },
  {
    id: 'meows', m: 's', cat: 'obstetricia', tags: ['s:uti'],
    n: 'MEOWS (escala obstétrica de alerta temprana)', sig: 'MEOWS', syn: ['alerta temprana obstetrica', 'early warning obstetric'],
    tipo: 'escala clínica',
    fin: 'Detección precoz del deterioro clínico materno por signos vitales con umbrales amarillos y rojos.',
    ver: 'CEMACH 2007 / Singh 2012 — no implementada',
    ref: 'Singh S, McGlennan A, England A, Simons R. A validation study of the CEMACH recommended modified early obstetric warning system (MEOWS). Anaesthesia. 2012;67(1):12-18.',
    url: 'https://doi.org/10.1111/j.1365-2044.2011.06896.x',
    verif: VERIF,
    pop: 'Embarazadas y puérperas internadas.',
    lim: 'Existen múltiples versiones institucionales con umbrales distintos.',
    pend: 'No se pudo verificar la tabla exacta de umbrales de Singh 2012: las reproducciones secundarias consultadas difieren (p. ej., PAS amarilla 150–160 vs 150–180 mmHg; saturación). Usar la planilla MEOWS vigente en la institución.'
  },

  // ═══════════════════════════ PEDIATRÍA ═══════════════════════════
  {
    id: 'apgar', m: 's', cat: 'pediatria', tags: ['s:obstetricia'],
    n: 'Puntaje de Apgar', sig: '', syn: ['apgar', 'recien nacido', 'neonato'],
    tipo: 'escala clínica',
    fin: 'Describe el estado del recién nacido al minuto y a los 5 minutos de vida (y cada 5 min si < 7).',
    ver: 'Apgar 1953; interpretación según AAP/ACOG 2015',
    formula: 'Suma de 5 ítems (0–2): frecuencia cardíaca, esfuerzo respiratorio, tono muscular, irritabilidad refleja, color\n7–10 tranquilizador · 4–6 moderadamente anormal · 0–3 bajo',
    in: [
      S('fc', 'Frecuencia cardíaca', [['0', 'Ausente', 0], ['1', '< 100 lpm', 1], ['2', '≥ 100 lpm', 2]]),
      S('resp', 'Esfuerzo respiratorio', [['0', 'Ausente', 0], ['1', 'Lento, irregular, llanto débil', 1], ['2', 'Bueno, llanto vigoroso', 2]]),
      S('tono', 'Tono muscular', [['0', 'Flácido', 0], ['1', 'Cierta flexión de extremidades', 1], ['2', 'Movimiento activo', 2]]),
      S('refl', 'Irritabilidad refleja (respuesta a la sonda nasal o estímulo)', [['0', 'Sin respuesta', 0], ['1', 'Mueca', 1], ['2', 'Llanto, tos o estornudo', 2]]),
      S('color', 'Color', [['0', 'Azul o pálido', 0], ['1', 'Cuerpo rosado, extremidades azules (acrocianosis)', 1], ['2', 'Completamente rosado', 2]])
    ],
    calc: (v, P) => {
      const r = P;
      return { r, d: 0, lab: 'Apgar', ...band(r, [[7, 10, 'Tranquilizador (7–10)', 'ok'], [4, 6, 'Moderadamente anormal (4–6)', 'warn'], [0, 3, 'Bajo (0–3)', 'bad']]) };
    },
    ref: 'Apgar V. A proposal for a new method of evaluation of the newborn infant. Curr Res Anesth Analg. 1953;32(4):260-267. · American Academy of Pediatrics Committee on Fetus and Newborn; ACOG Committee on Obstetric Practice. The Apgar score. Pediatrics. 2015;136(4):819-822.',
    url: 'https://doi.org/10.1542/peds.2015-2651',
    verif: VERIF,
    pop: 'Recién nacidos (término y pretérmino).',
    lim: 'No sirve para decidir el inicio de la reanimación ni, aislado, para diagnosticar asfixia o predecir el pronóstico neurológico. Influido por prematurez, fármacos maternos, malformaciones y por la propia reanimación.',
    tests: [
      { v: { fc: '2', resp: '2', tono: '2', refl: '2', color: '1' }, r: 9 },
      { v: { fc: '1', resp: '1', tono: '1', refl: '0', color: '0' }, r: 3 }
    ]
  },
  {
    id: 'pews-brighton', m: 's', cat: 'pediatria', tags: ['s:uti'],
    n: 'PEWS de Brighton (alerta temprana pediátrica)', sig: 'PEWS', syn: ['pews', 'monaghan', 'alerta temprana pediatrica', 'deterioro clinico'],
    tipo: 'escala clínica',
    fin: 'Detección precoz del deterioro clínico en niños internados.',
    ver: 'Brighton PEWS (Monaghan 2005), con +2 por nebulizaciones cada 15 min y +2 por vómitos posoperatorios persistentes (máx. 13)',
    formula: 'Conducta (0–3) + Cardiovascular (0–3) + Respiratorio (0–3) + 2 si nebulizaciones cada 15 min (incluye continuas) + 2 si vómitos persistentes posoperatorios\nLos «parámetros normales» de FC y FR se toman según la tabla por edad de la institución.',
    in: [
      S('cond', 'Conducta', [['0', 'Juega / apropiada', 0], ['1', 'Dormido', 1], ['2', 'Irritable', 2], ['3', 'Letárgico / confuso o respuesta reducida al dolor', 3]]),
      S('cv', 'Cardiovascular', [['0', 'Rosado o relleno capilar 1–2 s', 0], ['1', 'Pálido o relleno capilar 3 s', 1], ['2', 'Grisáceo o relleno capilar 4 s o taquicardia 20 lpm sobre lo normal', 2], ['3', 'Grisáceo y moteado o relleno capilar ≥ 5 s o taquicardia 30 lpm sobre lo normal o bradicardia', 3]]),
      S('resp', 'Respiratorio', [['0', 'Dentro de parámetros normales, sin tiraje', 0], ['1', 'FR > 10 sobre lo normal o uso de músculos accesorios o FiO₂ ≥ 30 % o ≥ 3 L/min', 1], ['2', 'FR > 20 sobre lo normal o tiraje / tiraje traqueal o FiO₂ ≥ 40 % o ≥ 6 L/min', 2], ['3', 'FR 5 por debajo de lo normal con tiraje esternal, traqueal o quejido, o FiO₂ ≥ 50 % o ≥ 8 L/min', 3]]),
      S('neb', 'Nebulizaciones cada 15 minutos (o continuas)', [['no', 'No', 0], ['si', 'Sí (+2)', 2]]),
      S('vom', 'Vómitos persistentes en el posoperatorio', [['no', 'No', 0], ['si', 'Sí (+2)', 2]])
    ],
    calc: (v, P) => {
      const r = P;
      const tres = [v.cond, v.cv, v.resp].some(x => String(x) == '3');
      return { r, d: 0, lab: 'PEWS', interp: r >= 4 ? '≥ 4: punto de corte asociado a deterioro (Elencwajg 2020)' : '< 4', lvl: r >= 4 || tres ? 'warn' : 'ok',
        note: 'La respuesta (frecuencia de controles, aviso médico, consulta a UTIP) depende del algoritmo de escalamiento institucional.' + (tres ? ' Hay un dominio con 3 puntos.' : '') };
    },
    ref: 'Monaghan A. Detecting and managing deterioration in children. Paediatr Nurs. 2005;17(1):32-35. · Elencwajg M, Grisolía NA, Meregalli C, et al. Utilidad de un score de alerta temprana como predictor precoz de deterioro clínico en niños hospitalizados. Arch Argent Pediatr. 2020;118(6):399-404.',
    url: 'https://doi.org/10.5546/aap.2020.399',
    verif: VERIF,
    pop: 'Niños internados en sala general (desarrollado en el Royal Alexandra Children\'s Hospital, Brighton; validado en Argentina por Elencwajg 2020).',
    lim: 'Las reproducciones de la tabla original difieren en detalles (p. ej., flujo de O₂ 3 vs 4 L/min para 1 punto); se usa la versión reproducida por Akre 2010 y Elencwajg 2020. No hay un umbral de acción universal: el corte ≥ 4 proviene de Elencwajg 2020. Requiere tablas de signos vitales por edad.',
    tests: [
      { v: { cond: '1', cv: '1', resp: '2', neb: 'si', vom: 'no' }, r: 6 },
      { v: { cond: '0', cv: '0', resp: '0', neb: 'no', vom: 'no' }, r: 0 }
    ]
  },
  {
    id: 'gcs-pediatrico', m: 's', cat: 'pediatria', tags: ['s:neuro', 's:trauma'],
    n: 'Glasgow pediátrico', sig: 'GCS-P', syn: ['glasgow pediatrico', 'pgcs', 'escala de coma pediatrica', 'lactante'],
    tipo: 'escala clínica',
    fin: 'Nivel de conciencia en niños, con respuesta verbal y motora adaptadas a la etapa preverbal (< 2 años).',
    ver: 'GCS pediátrica con adaptación preverbal (< 2 años) según Holmes 2005 / PECARN',
    formula: 'GCS = ocular (1–4) + verbal (1–5) + motora (1–6) = 3–15\nVerbal < 2 años: 5 balbucea, arrulla · 4 llanto irritable · 3 llora al dolor · 2 gime al dolor · 1 ninguna\nMotora < 2 años: 6 movimientos espontáneos normales · 5 retira al tacto · 4 retira al dolor · 3 flexión anormal · 2 extensión anormal · 1 ninguna\nGravedad (TEC): 13–15 leve · 9–12 moderado · 3–8 grave',
    in: [
      S('grupo', 'Grupo de edad', [['pre', '< 2 años (preverbal)'], ['ver', '≥ 2 años (verbal)']]),
      S('o', 'Apertura ocular', [['4', '4 · Espontánea', 4], ['3', '3 · A la voz', 3], ['2', '2 · Al dolor', 2], ['1', '1 · Ninguna', 1]]),
      S('vb', 'Respuesta verbal (elegir la descripción del grupo de edad)', [
        ['5', '5 · < 2 a: balbucea, arrulla · ≥ 2 a: orientado', 5], ['4', '4 · < 2 a: llanto irritable · ≥ 2 a: confuso', 4],
        ['3', '3 · < 2 a: llora al dolor · ≥ 2 a: palabras inapropiadas', 3], ['2', '2 · < 2 a: gime al dolor · ≥ 2 a: sonidos incomprensibles', 2], ['1', '1 · Ninguna', 1]]),
      S('mo', 'Respuesta motora (elegir la descripción del grupo de edad)', [
        ['6', '6 · < 2 a: movimientos espontáneos normales · ≥ 2 a: obedece órdenes', 6], ['5', '5 · < 2 a: retira al tacto · ≥ 2 a: localiza el dolor', 5],
        ['4', '4 · Retira al dolor', 4], ['3', '3 · Flexión anormal (decorticación)', 3], ['2', '2 · Extensión anormal (descerebración)', 2], ['1', '1 · Ninguna', 1]])
    ],
    calc: (v, P) => {
      const r = P;
      return { r, d: 0, lab: 'GCS pediátrico', ...band(r, [[13, 15, 'Leve (13–15)', 'ok'], [9, 12, 'Moderado (9–12)', 'warn'], [3, 8, 'Grave (3–8)', 'bad']]),
        more: [['Componentes', `O${v.o} V${v.vb} M${v.mo}`], ['Escala verbal/motora', v.grupo == 'pre' ? 'preverbal (< 2 años)' : 'verbal (≥ 2 años)']] };
    },
    ref: 'Holmes JF, Palchak MJ, MacFarlane T, Kuppermann N. Performance of the pediatric Glasgow Coma Scale in children with blunt head trauma. Acad Emerg Med. 2005;12(9):814-819. · Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet. 1974;2(7872):81-84.',
    url: 'https://doi.org/10.1197/j.aem.2005.04.019',
    verif: VERIF,
    pop: 'Niños con traumatismo de cráneo cerrado (servicio de emergencias; validación de la versión preverbal en < 2 años).',
    lim: 'Existen varias adaptaciones pediátricas con descriptores distintos (James y Trauner 1985, Adelaide, GCS-P oficial); documentar los componentes (O-V-M) más que el total. Intubación, sedación, edema palpebral o hipoxia/hipotensión invalidan componentes: registrar «NT».',
    tests: [
      { v: { grupo: 'pre', o: '4', vb: '5', mo: '6' }, r: 15 },
      { v: { grupo: 'pre', o: '2', vb: '3', mo: '4' }, r: 9 },
      { v: { grupo: 'ver', o: '1', vb: '2', mo: '3' }, r: 'grave' }
    ]
  },
  {
    id: 'pim3', m: 's', cat: 'pediatria', tags: ['s:uti'],
    n: 'PIM 3 (Pediatric Index of Mortality 3)', sig: 'PIM3', syn: ['pim', 'mortalidad pediatrica', 'utip', 'pediatric index of mortality'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de muerte en terapia intensiva pediátrica con datos de la primera hora del ingreso.',
    ver: 'PIM3 (Straney 2013), ecuación logística publicada',
    formula: 'logit = 3,8233·pupilas − 0,5378·electivo + 0,9763·ARM + 0,0671·|EB| − 0,0431·PAS + 0,1716·(PAS²/1000) + 0,4214·(100·FiO₂/PaO₂) − 1,2246·recuperación de cirugía cardíaca con CEC − 0,8762·cirugía cardíaca sin CEC − 1,5164·cirugía no cardíaca + 1,6225·diagnóstico de muy alto riesgo + 1,0725·alto riesgo − 2,1766·bajo riesgo − 1,7928\nRiesgo de muerte = e^logit / (1 + e^logit)\nDatos faltantes: EB = 0; si falta PaO₂ o FiO₂, 100·FiO₂/PaO₂ = 0,23.',
    in: [
      S('pup', 'Pupilas: ambas > 3 mm y fijas a la luz (primera hora)', [['0', 'No', 0], ['1', 'Sí', 1]]),
      S('elec', 'Ingreso electivo (programado; incluye posoperatorio programado)', [['0', 'No', 0], ['1', 'Sí', 1]]),
      S('arm', 'Ventilación mecánica en la primera hora (incluye CPAP/VNI)', [['0', 'No', 0], ['1', 'Sí', 1]]),
      N('pas', 'PAS al ingreso (paro cardíaco = 0; shock con PA no registrable = 30)', 'mmHg', 0, 300, 1),
      N('eb', 'Exceso de base (arterial o capilar)', 'mmol/L', -50, 50, 0.1, { req: 0 }),
      N('fio2', 'FiO₂ en el momento de la PaO₂', 'fracción (0,21–1)', 0.21, 1, 0.01, { req: 0 }),
      N('pao2', 'PaO₂ arterial (primera hora)', 'mmHg', 5, 700, 1, { req: 0, alt: [U.kpa] }),
      S('rec', 'Recuperación de cirugía o procedimiento como motivo principal de ingreso', [['0', 'No', 0], ['cec', 'Cirugía cardíaca con circulación extracorpórea', 0], ['ncec', 'Cirugía cardíaca sin circulación extracorpórea', 0], ['nc', 'Procedimiento no cardíaco', 0]]),
      S('dx', 'Diagnóstico de riesgo (elegir la categoría más grave presente)', [
        ['0', 'Ninguno', 0],
        ['b', 'Bajo riesgo (motivo principal): asma, bronquiolitis, crup, apnea obstructiva del sueño, cetoacidosis diabética, convulsiones', 0],
        ['a', 'Alto riesgo: hemorragia cerebral espontánea, miocardiopatía o miocarditis, síndrome de corazón izquierdo hipoplásico, enfermedad neurodegenerativa, enterocolitis necrotizante (motivo principal)', 0],
        ['ma', 'Muy alto riesgo: paro cardíaco previo al ingreso, inmunodeficiencia combinada grave, leucemia/linfoma después de la primera inducción, receptor de TMO, insuficiencia hepática como motivo principal', 0]])
    ],
    calc: v => {
      const ratio = v.fio2 != null && v.pao2 != null ? 100 * v.fio2 / v.pao2 : 0.23;
      const eb = v.eb != null ? Math.abs(v.eb) : 0;
      const x = 3.8233 * +v.pup - 0.5378 * +v.elec + 0.9763 * +v.arm + 0.0671 * eb - 0.0431 * v.pas + 0.1716 * (v.pas * v.pas / 1000) + 0.4214 * ratio
        - 1.2246 * (v.rec == 'cec') - 0.8762 * (v.rec == 'ncec') - 1.5164 * (v.rec == 'nc')
        + 1.6225 * (v.dx == 'ma') + 1.0725 * (v.dx == 'a') - 2.1766 * (v.dx == 'b') - 1.7928;
      const p = 100 * Math.exp(x) / (1 + Math.exp(x));
      return { r: rd(p, 1), u: '%', d: 1, lab: 'Riesgo de muerte estimado', interp: '', lvl: '',
        more: [['Logit PIM3', fx(x, 3)], ['100·FiO₂/PaO₂ usado', fx(ratio, 3) + (v.fio2 != null && v.pao2 != null ? '' : ' (por defecto)')]] };
    },
    ref: 'Straney L, Clements A, Parslow RC, et al; ANZICS Paediatric Study Group and the Paediatric Intensive Care Audit Network. Paediatric index of mortality 3: an updated model for predicting mortality in pediatric intensive care. Pediatr Crit Care Med. 2013;14(7):673-681. · ANZICS. ANZPICR PIM2/PIM3 Information Booklet (2019).',
    url: 'https://doi.org/10.1097/PCC.0b013e31829760cf',
    verif: VERIF,
    pop: 'Niños ingresados a UTIP (Australia, Nueva Zelanda, Reino Unido e Irlanda, 2010–2011).',
    lim: 'Diseñado para comparar mortalidad observada/esperada entre unidades; su uso para el pronóstico individual es limitado. Usar los valores de la primera hora (desde el primer contacto con el equipo de UTIP). Recalibrar localmente: puede sobre- o subestimar en otros sistemas de salud.',
    tests: [
      { v: { pup: '0', elec: '0', arm: '0', pas: 120, rec: '0', dx: '0' }, r: 1.2, tol: 0.05 },
      { v: { pup: '1', elec: '0', arm: '1', pas: 60, eb: -12, fio2: 1, pao2: 80, rec: '0', dx: 'ma' }, r: 98.2, tol: 0.1 }
    ]
  },
  {
    id: 'prism-3', m: 's', cat: 'pediatria', tags: ['s:uti'],
    n: 'PRISM III (Pediatric Risk of Mortality III)', sig: 'PRISM III', syn: ['prism', 'mortalidad pediatrica'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de mortalidad en terapia intensiva pediátrica a partir de variables fisiológicas.',
    ver: 'PRISM III (Pollack 1996)',
    ref: 'Pollack MM, Patel KM, Ruttimann UE. PRISM III: an updated Pediatric Risk of Mortality score. Crit Care Med. 1996;24(5):743-752.',
    url: 'https://doi.org/10.1097/00003246-199605000-00004',
    verif: VERIF,
    pop: 'Niños ingresados a UTIP (EE. UU.).',
    lim: 'Herramienta bajo licencia.',
    pend: 'PRISM III es una herramienta con licencia (Children\'s National / Virtual Pediatric Systems): los coeficientes de la ecuación de riesgo de mortalidad no son de dominio público. Usar PIM3 o el software licenciado.'
  },
  {
    id: 'westley', m: 's', cat: 'pediatria', tags: ['s:resp-infecto'],
    n: 'Score de Westley (crup)', sig: '', syn: ['westley', 'crup', 'laringotraqueitis', 'laringitis'],
    tipo: 'escala clínica',
    fin: 'Gradúa la gravedad del crup (laringotraqueobronquitis).',
    ver: 'Westley 1978; bandas de gravedad de la guía Alberta TOP (2008)',
    formula: 'Conciencia (0/5) + cianosis (0/4/5) + estridor (0–2) + entrada de aire (0–2) + tiraje (0–3) = 0–17\n≤ 2 leve · 3–7 moderado · 8–11 grave · ≥ 12 insuficiencia respiratoria inminente',
    in: [
      S('conc', 'Nivel de conciencia', [['0', 'Normal (incluye dormido)', 0], ['5', 'Desorientado', 5]]),
      S('cian', 'Cianosis', [['0', 'Ausente', 0], ['4', 'Con la agitación', 4], ['5', 'En reposo', 5]]),
      S('estr', 'Estridor', [['0', 'Ausente', 0], ['1', 'Con la agitación', 1], ['2', 'En reposo', 2]]),
      S('aire', 'Entrada de aire', [['0', 'Normal', 0], ['1', 'Disminuida', 1], ['2', 'Muy disminuida', 2]]),
      S('tir', 'Tiraje', [['0', 'Ausente', 0], ['1', 'Leve', 1], ['2', 'Moderado', 2], ['3', 'Grave', 3]])
    ],
    calc: (v, P) => {
      const r = P;
      return { r, d: 0, lab: 'Westley', ...band(r, [[0, 2, 'Crup leve (≤ 2)', 'ok'], [3, 7, 'Crup moderado (3–7)', 'warn'], [8, 11, 'Crup grave (8–11)', 'bad'], [12, 17, 'Insuficiencia respiratoria inminente (≥ 12)', 'bad']]) };
    },
    ref: 'Westley CR, Cotton EK, Brooks JG. Nebulized racemic epinephrine by IPPB for the treatment of croup: a double-blind study. Am J Dis Child. 1978;132(5):484-487. · Alberta Medical Association, Toward Optimized Practice (TOP). Guideline for the diagnosis and management of croup. 2008 (actualizaciones posteriores).',
    url: 'https://doi.org/10.1001/archpedi.1978.02120300044008',
    verif: VERIF,
    pop: 'Niños con crup (ensayo original en niños internados; bandas de gravedad de consenso para emergencias).',
    lim: 'Las bandas de gravedad no provienen del trabajo original sino de la guía Alberta TOP. Variabilidad entre observadores, sobre todo en entrada de aire y tiraje. Un puntaje bajo no descarta otras causas de estridor.',
    tests: [
      { v: { conc: '0', cian: '0', estr: '1', aire: '0', tir: '1' }, r: 2 },
      { v: { conc: '0', cian: '0', estr: '2', aire: '1', tir: '2' }, r: 5 },
      { v: { conc: '5', cian: '4', estr: '2', aire: '2', tir: '3' }, r: 'inminente' }
    ]
  },
  {
    id: 'tal-modificado', m: 's', cat: 'pediatria', tags: ['s:resp-infecto'],
    n: 'Score de Tal modificado (bronquiolitis)', sig: 'MTS', syn: ['tal', 'bronquiolitis', 'obstruccion bronquial', 'modified tal'],
    tipo: 'escala clínica',
    fin: 'Gradúa la gravedad de la bronquiolitis en lactantes.',
    ver: 'Tal modificado con saturación de O₂ en lugar de cianosis (McCallum 2013; validación de Golan-Tripto 2018)',
    formula: 'FR (0–3, por edad) + sibilancias/crepitantes (0–3) + SpO₂ aire ambiente (0–3) + uso de músculos accesorios (0–3) = 0–12\nFR < 6 meses: ≤ 40 0 · 41–55 1 · 56–70 2 · ≥ 71 3 — FR ≥ 6 meses: ≤ 30 0 · 31–45 1 · 46–60 2 · ≥ 61 3\nSpO₂: ≥ 95 % 0 · 92–94 % 1 · 90–91 % 2 · ≤ 89 % 3\n≤ 5 leve · 6–10 moderada · ≥ 11 grave (Golan-Tripto 2018)',
    in: [
      S('edad', 'Edad', [['m', '< 6 meses'], ['M', '≥ 6 meses']]),
      N('fr', 'Frecuencia respiratoria (contar 30 s × 2)', 'rpm', 5, 150, 1),
      S('sib', 'Sibilancias / crepitantes', [['0', 'Ausentes', 0], ['1', 'Solo espiratorias', 1], ['2', 'Inspiratorias y espiratorias, audibles solo con estetoscopio', 2], ['3', 'Inspiratorias y espiratorias, audibles sin estetoscopio', 3]]),
      N('sat', 'SpO₂ con aire ambiente', '%', 50, 100, 1),
      S('mus', 'Uso de músculos accesorios', [['0', 'Sin tiraje', 0], ['1', 'Tiraje intercostal leve', 1], ['2', 'Tiraje intercostal moderado', 2], ['3', 'Tiraje intercostal moderado o marcado con cabeceo o tiraje traqueal', 3]])
    ],
    calc: v => {
      const c = v.edad == 'm' ? [40, 55, 70] : [30, 45, 60];
      const pf = v.fr <= c[0] ? 0 : v.fr <= c[1] ? 1 : v.fr <= c[2] ? 2 : 3;
      const ps = v.sat >= 95 ? 0 : v.sat >= 92 ? 1 : v.sat >= 90 ? 2 : 3;
      const r = pf + ps + +v.sib + +v.mus;
      return { r, d: 0, lab: 'Tal modificado', ...band(r, [[0, 5, 'Bronquiolitis leve (≤ 5)', 'ok'], [6, 10, 'Bronquiolitis moderada (6–10)', 'warn'], [11, 12, 'Bronquiolitis grave (≥ 11)', 'bad']]),
        more: [['Puntos FR', String(pf)], ['Puntos SpO₂', String(ps)]] };
    },
    ref: 'Golan-Tripto I, Goldbart A, Akel K, Dizitzer Y, Novack V, Tal A. Modified Tal Score: validated score for prediction of bronchiolitis severity. Pediatr Pulmonol. 2018;53(6):796-801. · McCallum GB, Morris PS, Wilson CC, et al. Severity scoring systems: are they internally valid, reliable and predictive of oxygen use in children with acute bronchiolitis? Pediatr Pulmonol. 2013;48(8):797-803. · Tal A, Bavilski C, Yohai D, et al. Dexamethasone and salbutamol in the treatment of acute wheezing in infants. Pediatrics. 1983;71(1):13-18.',
    url: 'https://doi.org/10.1002/ppul.24007',
    verif: VERIF,
    pop: 'Lactantes < 12 meses con bronquiolitis aguda (validación unicéntrica, Israel, n = 50).',
    lim: 'Validación con muestra pequeña; otras publicaciones usan bandas distintas (p. ej., grave ≥ 9). La SpO₂ debe medirse con aire ambiente tras 5 minutos; si el paciente ya recibe O₂, el ítem pierde validez. Varía con la aspiración de secreciones, el llanto y la fiebre.',
    tests: [
      { v: { edad: 'm', fr: 50, sib: '1', sat: 96, mus: '1' }, r: 3 },
      { v: { edad: 'M', fr: 62, sib: '3', sat: 89, mus: '2' }, r: 11 },
      { v: { edad: 'm', fr: 60, sib: '2', sat: 93, mus: '2' }, r: 7 }
    ]
  },
  {
    id: 'silverman-andersen', m: 's', cat: 'pediatria', tags: ['s:resp-infecto'],
    n: 'Score de Silverman-Andersen', sig: '', syn: ['silverman', 'dificultad respiratoria neonatal', 'recien nacido'],
    tipo: 'escala clínica',
    fin: 'Cuantifica la dificultad respiratoria en el recién nacido.',
    ver: 'Silverman y Andersen 1956 (5 signos, 0–2 cada uno)',
    formula: 'Movimiento toracoabdominal + tiraje intercostal + retracción xifoidea + aleteo nasal + quejido espiratorio, 0–2 cada uno = 0–10\n0 = sin dificultad; a mayor puntaje, mayor dificultad respiratoria.',
    in: [
      S('tor', 'Movimientos toracoabdominales (tórax superior)', [['0', 'Sincrónicos', 0], ['1', 'Retraso en la inspiración (tórax inmóvil, abdomen en movimiento)', 1], ['2', 'Disociación toracoabdominal (bamboleo / «sube y baja»)', 2]]),
      S('tic', 'Tiraje intercostal (tórax inferior)', [['0', 'Ausente', 0], ['1', 'Apenas visible', 1], ['2', 'Marcado', 2]]),
      S('xif', 'Retracción xifoidea', [['0', 'Ausente', 0], ['1', 'Apenas visible', 1], ['2', 'Marcada', 2]]),
      S('ale', 'Aleteo nasal', [['0', 'Ausente', 0], ['1', 'Mínimo', 1], ['2', 'Marcado', 2]]),
      S('que', 'Quejido espiratorio', [['0', 'Ausente', 0], ['1', 'Audible solo con estetoscopio', 1], ['2', 'Audible sin estetoscopio', 2]])
    ],
    calc: (v, P) => {
      const r = P;
      return { r, d: 0, lab: 'Silverman-Andersen', interp: r == 0 ? 'Sin signos de dificultad respiratoria' : 'Dificultad respiratoria: ' + r + '/10 (a mayor puntaje, mayor gravedad)', lvl: r == 0 ? 'ok' : 'warn' };
    },
    ref: 'Silverman WA, Andersen DH. A controlled clinical trial of effects of water mist on obstructive respiratory signs, death rate and necropsy findings among premature infants. Pediatrics. 1956;17(1):1-10.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/13353856/',
    verif: VERIF,
    pop: 'Recién nacidos prematuros (ensayo original); de uso general en neonatología.',
    lim: 'El trabajo original no define bandas de gravedad; las categorías (leve/moderada/grave) varían entre protocolos. No reemplaza gasometría ni la evaluación de la necesidad de soporte.',
    tests: [
      { v: { tor: '0', tic: '1', xif: '1', ale: '0', que: '0' }, r: 2 },
      { v: { tor: '2', tic: '2', xif: '2', ale: '1', que: '2' }, r: 9 }
    ]
  },

  // ═══════════════════════════ REUMATOLOGÍA ═══════════════════════════
  {
    id: 'das28', m: 's', cat: 'reuma', tags: [],
    n: 'DAS28 (artritis reumatoidea)', sig: 'DAS28', syn: ['das 28', 'actividad artritis reumatoidea', 'das28 vsg', 'das28 pcr'],
    tipo: 'índice',
    fin: 'Mide la actividad de la artritis reumatoidea con 28 articulaciones, reactante de fase aguda y valoración global del paciente.',
    ver: 'DAS28-VSG (Prevoo 1995) y DAS28-PCR, seleccionable',
    formula: 'DAS28-VSG = 0,56·√NAD28 + 0,28·√NAT28 + 0,70·ln(VSG) + 0,014·EGP\nDAS28-PCR = 0,56·√NAD28 + 0,28·√NAT28 + 0,36·ln(PCR [mg/L] + 1) + 0,014·EGP + 0,96\nNAD: articulaciones dolorosas · NAT: tumefactas · EGP: evaluación global del paciente (EVA 0–100 mm)\nRemisión < 2,6 · baja ≤ 3,2 · moderada > 3,2–5,1 · alta > 5,1',
    in: [
      S('ver', 'Versión', [['vsg', 'DAS28-VSG'], ['pcr', 'DAS28-PCR']]),
      N('nad', 'Articulaciones dolorosas (de 28)', '', 0, 28, 1),
      N('nat', 'Articulaciones tumefactas (de 28)', '', 0, 28, 1),
      N('egp', 'Evaluación global de la actividad por el paciente (EVA)', 'mm (0–100)', 0, 100, 1),
      N('vsg', 'VSG (si DAS28-VSG)', 'mm/h', 1, 200, 1, { req: 0 }),
      N('pcr', 'PCR (si DAS28-PCR)', 'mg/L', 0, 500, 0.1, { req: 0, alt: [pcr_mgdl] })
    ],
    calc: v => {
      const j = 0.56 * Math.sqrt(v.nad) + 0.28 * Math.sqrt(v.nat) + 0.014 * v.egp;
      let r;
      if (v.ver == 'vsg') { if (v.vsg == null) return null; r = j + 0.70 * Math.log(v.vsg); }
      else { if (v.pcr == null) return null; r = j + 0.36 * Math.log(v.pcr + 1) + 0.96; }
      const b = r < 2.6 ? ['Remisión (< 2,6)', 'ok'] : r <= 3.2 ? ['Actividad baja (≤ 3,2)', 'ok'] : r <= 5.1 ? ['Actividad moderada (> 3,2–5,1)', 'warn'] : ['Actividad alta (> 5,1)', 'bad'];
      return { r: rd(r, 2), d: 2, lab: v.ver == 'vsg' ? 'DAS28-VSG' : 'DAS28-PCR', interp: b[0], lvl: b[1],
        note: v.ver == 'pcr' ? 'Los umbrales se derivaron para DAS28-VSG; el DAS28-PCR tiende a dar valores menores y puede sobreestimar la remisión.' : '' };
    },
    ref: 'Prevoo MLL, van \'t Hof MA, Kuper HH, et al. Modified disease activity scores that include twenty-eight-joint counts. Arthritis Rheum. 1995;38(1):44-48. · Fransen J, van Riel PLCM. The Disease Activity Score and the EULAR response criteria. Clin Exp Rheumatol. 2005;23(5 Suppl 39):S93-S99.',
    url: 'https://doi.org/10.1002/art.1780380107',
    verif: VERIF,
    pop: 'Adultos con artritis reumatoidea.',
    lim: 'No evalúa pies ni tobillos. La VSG/PCR varían por edad, sexo, anemia o infección intercurrente. La remisión DAS28 admite articulaciones tumefactas residuales; para remisión estricta usar SDAI/CDAI o criterios ACR/EULAR Boolean.',
    tests: [
      { v: { ver: 'vsg', nad: 4, nat: 2, egp: 50, vsg: 20 }, r: 4.31, tol: 0.01 },
      { v: { ver: 'pcr', nad: 4, nat: 2, egp: 50, pcr: 10 }, r: 4.04, tol: 0.01 },
      { v: { ver: 'vsg', nad: 0, nat: 0, egp: 10, vsg: 8 }, r: 'remisión' }
    ]
  },
  {
    id: 'cdai', m: 's', cat: 'reuma', tags: [],
    n: 'CDAI (Clinical Disease Activity Index)', sig: 'CDAI', syn: ['actividad artritis reumatoidea', 'cdai'],
    tipo: 'índice',
    fin: 'Actividad de la artritis reumatoidea sin reactantes de fase aguda (resultado inmediato en consultorio).',
    ver: 'CDAI (Aletaha 2005)',
    formula: 'CDAI = NAD28 + NAT28 + EGP (0–10) + EGM (0–10)\nRemisión ≤ 2,8 · baja ≤ 10 · moderada ≤ 22 · alta > 22',
    in: [
      N('nad', 'Articulaciones dolorosas (de 28)', '', 0, 28, 1),
      N('nat', 'Articulaciones tumefactas (de 28)', '', 0, 28, 1),
      N('egp', 'Evaluación global por el paciente', '0–10', 0, 10, 0.1),
      N('egm', 'Evaluación global por el médico', '0–10', 0, 10, 0.1)
    ],
    calc: v => {
      const r = v.nad + v.nat + v.egp + v.egm;
      const b = r <= 2.8 ? ['Remisión (≤ 2,8)', 'ok'] : r <= 10 ? ['Actividad baja (≤ 10)', 'ok'] : r <= 22 ? ['Actividad moderada (> 10–22)', 'warn'] : ['Actividad alta (> 22)', 'bad'];
      return { r: rd(r, 1), d: 1, lab: 'CDAI', interp: b[0], lvl: b[1] };
    },
    ref: 'Aletaha D, Nell VPK, Stamm T, et al. Acute phase reactants add little to composite disease activity indices for rheumatoid arthritis: validation of a clinical activity score. Arthritis Res Ther. 2005;7(4):R796-R806. · Aletaha D, Smolen J. The Simplified Disease Activity Index (SDAI) and the Clinical Disease Activity Index (CDAI): a review of their usefulness and validity in rheumatoid arthritis. Clin Exp Rheumatol. 2005;23(5 Suppl 39):S100-S108.',
    url: 'https://doi.org/10.1186/ar1740',
    verif: VERIF,
    pop: 'Adultos con artritis reumatoidea.',
    lim: 'Las evaluaciones globales deben estar en escala 0–10 (no 0–100). No incluye pies ni tobillos.',
    tests: [
      { v: { nad: 5, nat: 3, egp: 6, egm: 5 }, r: 19 },
      { v: { nad: 0, nat: 1, egp: 1, egm: 0.5 }, r: 2.5 }
    ]
  },
  {
    id: 'sdai', m: 's', cat: 'reuma', tags: [],
    n: 'SDAI (Simplified Disease Activity Index)', sig: 'SDAI', syn: ['actividad artritis reumatoidea', 'sdai'],
    tipo: 'índice',
    fin: 'Actividad de la artritis reumatoidea: CDAI más PCR.',
    ver: 'SDAI (Smolen 2003)',
    formula: 'SDAI = NAD28 + NAT28 + EGP (0–10) + EGM (0–10) + PCR (mg/dL)\nRemisión ≤ 3,3 · baja ≤ 11 · moderada ≤ 26 · alta > 26',
    in: [
      N('nad', 'Articulaciones dolorosas (de 28)', '', 0, 28, 1),
      N('nat', 'Articulaciones tumefactas (de 28)', '', 0, 28, 1),
      N('egp', 'Evaluación global por el paciente', '0–10', 0, 10, 0.1),
      N('egm', 'Evaluación global por el médico', '0–10', 0, 10, 0.1),
      N('pcr', 'PCR', 'mg/dL', 0, 50, 0.01, { alt: [pcr_mgl] })
    ],
    calc: v => {
      const r = v.nad + v.nat + v.egp + v.egm + v.pcr;
      const b = r <= 3.3 ? ['Remisión (≤ 3,3)', 'ok'] : r <= 11 ? ['Actividad baja (≤ 11)', 'ok'] : r <= 26 ? ['Actividad moderada (> 11–26)', 'warn'] : ['Actividad alta (> 26)', 'bad'];
      return { r: rd(r, 1), d: 1, lab: 'SDAI', interp: b[0], lvl: b[1] };
    },
    ref: 'Smolen JS, Breedveld FC, Schiff MH, et al. A simplified disease activity index for rheumatoid arthritis for use in clinical practice. Rheumatology (Oxford). 2003;42(2):244-257. · Aletaha D, Smolen J. Clin Exp Rheumatol. 2005;23(5 Suppl 39):S100-S108.',
    url: 'https://doi.org/10.1093/rheumatology/keg072',
    verif: VERIF,
    pop: 'Adultos con artritis reumatoidea.',
    lim: 'La PCR va en mg/dL (no mg/L): verificar la unidad del laboratorio. No incluye pies ni tobillos.',
    tests: [
      { v: { nad: 5, nat: 3, egp: 6, egm: 5, pcr: 2.4 }, r: 21.4 },
      { v: { nad: 0, nat: 0, egp: 1, egm: 1, pcr: 0.3 }, r: 2.3 }
    ]
  },
  {
    id: 'sledai-2k', m: 's', cat: 'reuma', tags: [],
    n: 'SLEDAI-2K (actividad del lupus)', sig: 'SLEDAI-2K', syn: ['sledai', 'lupus', 'les actividad'],
    tipo: 'índice',
    fin: 'Mide la actividad del lupus eritematoso sistémico según 24 descriptores presentes en los últimos 10 días.',
    ver: 'SLEDAI-2000 (Gladman 2002): permite puntuar exantema, alopecia, úlceras mucosas y proteinuria persistentes',
    formula: 'Suma de los descriptores presentes en los últimos 10 días (0–105)\n8: convulsión, psicosis, síndrome orgánico cerebral, trastorno visual, par craneal, cefalea lúpica, ACV, vasculitis\n4: artritis, miositis, cilindros urinarios, hematuria, proteinuria, piuria\n2: exantema, alopecia, úlceras mucosas, pleuresía, pericarditis, complemento bajo, anti-ADN elevado\n1: fiebre, trombocitopenia, leucopenia',
    in: [
      H('8 puntos'),
      C('conv', 'Convulsión de inicio reciente (excluye causas metabólicas, infecciosas o farmacológicas)', 8),
      C('psic', 'Psicosis: alteración de la percepción de la realidad (alucinaciones, incoherencia, pensamiento ilógico, conducta desorganizada); excluye uremia y fármacos', 8),
      C('sob', 'Síndrome orgánico cerebral: alteración de la función mental con desorientación, memoria u otras funciones intelectuales, de inicio rápido y fluctuante', 8),
      C('vis', 'Trastorno visual: alteraciones retinianas del LES (cuerpos citoides, hemorragias, exudados, neuritis óptica); excluye HTA, infección o fármacos', 8),
      C('npc', 'Trastorno de pares craneales: neuropatía sensitiva o motora craneal de inicio reciente', 8),
      C('cef', 'Cefalea lúpica: grave y persistente, puede ser migrañosa, sin respuesta a analgésicos narcóticos', 8),
      C('acv', 'ACV de inicio reciente (excluye aterosclerosis o HTA)', 8),
      C('vasc', 'Vasculitis: ulceración, gangrena, nódulos digitales dolorosos, infartos periungueales, hemorragias en astilla, o confirmación por biopsia/angiografía', 8),
      H('4 puntos'),
      C('art', 'Artritis: ≥ 2 articulaciones con dolor y signos inflamatorios (dolor a la palpación, tumefacción o derrame)', 4),
      C('mio', 'Miositis: dolor/debilidad muscular proximal con CPK/aldolasa elevadas, EMG o biopsia compatibles', 4),
      C('cil', 'Cilindros urinarios: hemáticos o granulosos', 4),
      C('hem', 'Hematuria: > 5 eritrocitos/campo (excluye litiasis, infección u otras causas)', 4),
      C('prot', 'Proteinuria: > 0,5 g/24 h', 4),
      C('piu', 'Piuria: > 5 leucocitos/campo (excluye infección)', 4),
      H('2 puntos'),
      C('exa', 'Exantema de tipo inflamatorio', 2), C('alo', 'Alopecia: pérdida de pelo anormal, en placas o difusa', 2),
      C('ulc', 'Úlceras mucosas orales o nasales', 2),
      C('ple', 'Pleuresía: dolor pleurítico con frote, derrame o engrosamiento pleural', 2),
      C('peri', 'Pericarditis: dolor pericárdico con al menos frote, derrame, o confirmación por ECG o ecocardiograma', 2),
      C('comp', 'Complemento bajo: CH50, C3 o C4 por debajo del límite inferior del laboratorio', 2),
      C('adn', 'Anti-ADN elevado: por encima del rango normal del laboratorio', 2),
      H('1 punto'),
      C('fieb', 'Fiebre > 38 °C (excluye infección)', 1),
      C('plaq', 'Trombocitopenia < 100 000/mm³ (excluye fármacos)', 1),
      C('leuc', 'Leucopenia < 3000/mm³ (excluye fármacos)', 1)
    ],
    calc: (v, P) => {
      const r = P;
      return { r, d: 0, lab: 'SLEDAI-2K', interp: r == 0 ? 'Sin actividad según SLEDAI-2K' : 'Puntaje de actividad (sin bandas de gravedad en la fuente original)', lvl: '' };
    },
    ref: 'Gladman DD, Ibañez D, Urowitz MB. Systemic lupus erythematosus disease activity index 2000. J Rheumatol. 2002;29(2):288-291. · Bombardier C, Gladman DD, Urowitz MB, Caron D, Chang CH. Derivation of the SLEDAI. Arthritis Rheum. 1992;35(6):630-640.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/11838846/',
    verif: VERIF,
    pop: 'Pacientes con lupus eritematoso sistémico (cohortes de Toronto).',
    lim: 'Solo registra presencia/ausencia, no gravedad dentro de cada descriptor. Atribuir cada hallazgo al lupus (excluir infección, fármacos, otras causas). Ventana de 10 días previos. Las categorías de actividad (leve/moderada/alta) varían entre estudios.',
    tests: [
      { v: { art: 1, comp: 1, adn: 1, exa: 1 }, r: 10 },
      { v: { conv: 1, prot: 1, plaq: 1 }, r: 13 },
      { v: {}, r: 0 }
    ]
  },
  {
    id: 'bvas3', m: 's', cat: 'reuma', tags: [],
    n: 'BVAS v3 (Birmingham Vasculitis Activity Score)', sig: 'BVAS', syn: ['bvas', 'vasculitis', 'birmingham'],
    tipo: 'índice',
    fin: 'Mide la actividad de las vasculitis sistémicas por órganos y sistemas.',
    ver: 'BVAS versión 3 (Mukhtyar 2009)',
    ref: 'Mukhtyar C, Lee R, Brown D, et al. Modification and validation of the Birmingham Vasculitis Activity Score (version 3). Ann Rheum Dis. 2009;68(12):1827-1832.',
    url: 'https://doi.org/10.1136/ard.2008.101279',
    verif: VERIF,
    pop: 'Adultos con vasculitis sistémica (principalmente asociadas a ANCA).',
    lim: 'Requiere el formulario oficial y entrenamiento.',
    pend: 'No se pudo verificar ítem por ítem el formulario BVAS v3 (56 ítems en 9 sistemas, con pesos distintos para enfermedad nueva/empeorada vs persistente y topes por sistema). Usar el formulario oficial.'
  },
  {
    id: 'frax', m: 's', cat: 'reuma', tags: ['s:endocrino'],
    n: 'FRAX (riesgo de fractura a 10 años)', sig: 'FRAX', syn: ['frax', 'osteoporosis', 'fractura de cadera'],
    tipo: 'score pronóstico',
    fin: 'Probabilidad a 10 años de fractura osteoporótica mayor y de cadera.',
    ver: 'FRAX (Universidad de Sheffield / FRAXplus)',
    ref: 'Kanis JA, Johnell O, Oden A, Johansson H, McCloskey E. FRAX and the assessment of fracture probability in men and women from the UK. Osteoporos Int. 2008;19(4):385-397.',
    url: 'https://frax.shef.ac.uk/FRAX/',
    verif: VERIF,
    pop: 'Adultos de 40–90 años; modelos calibrados por país (incluye Argentina).',
    lim: 'Usar la calculadora oficial con el modelo de Argentina.',
    pend: 'Algoritmo propietario no publicado (modelos específicos por país). Calcular en la herramienta oficial: frax.shef.ac.uk / fraxplus.org.'
  },

  // ═══════════════════════════ DERMATOLOGÍA ═══════════════════════════
  {
    id: 'scorad', m: 's', cat: 'dermato', tags: ['s:pediatria'],
    n: 'SCORAD (dermatitis atópica)', sig: 'SCORAD', syn: ['dermatitis atopica', 'eccema', 'scoring atopic dermatitis'],
    tipo: 'índice',
    fin: 'Gravedad de la dermatitis atópica combinando extensión, intensidad y síntomas subjetivos.',
    ver: 'SCORAD (European Task Force on Atopic Dermatitis 1993); bandas de Oranje 2007',
    formula: 'SCORAD = A/5 + 7·B/2 + C\nA: extensión (% de superficie corporal, regla de los nueves; 0–100)\nB: intensidad = eritema + edema/pápulas + exudado/costras + excoriaciones + liquenificación + sequedad (0–3 c/u; 0–18), evaluadas en un área representativa (la sequedad, en piel no afectada)\nC: prurito + insomnio (EVA 0–10 c/u, promedio de los últimos 3 días/noches; 0–20)\nSCORAD objetivo = A/5 + 7·B/2\nSCORAD: < 25 leve · 25–50 moderada · > 50 grave — Objetivo: < 15 leve · 15–40 moderada · > 40 grave',
    in: [
      N('a', 'A. Extensión (regla de los nueves; en < 2 años usar proporciones pediátricas)', '% SC', 0, 100, 1),
      H('B. Intensidad (0 ausente · 1 leve · 2 moderada · 3 grave)'),
      ...[['eri', 'Eritema'], ['ede', 'Edema / pápulas'], ['exu', 'Exudado / costras'], ['exc', 'Excoriaciones'], ['liq', 'Liquenificación'], ['seq', 'Sequedad (en piel no afectada)']]
        .map(([id, l]) => S(id, l, [['0', '0 · Ausente'], ['1', '1 · Leve'], ['2', '2 · Moderada'], ['3', '3 · Grave']])),
      H('C. Síntomas subjetivos (promedio de los últimos 3 días/noches)'),
      N('pru', 'Prurito (EVA)', '0–10', 0, 10, 0.5),
      N('ins', 'Pérdida de sueño (EVA)', '0–10', 0, 10, 0.5)
    ],
    calc: v => {
      const B = ['eri', 'ede', 'exu', 'exc', 'liq', 'seq'].reduce((t, k) => t + +v[k], 0);
      const obj = v.a / 5 + 7 * B / 2;
      const r = obj + v.pru + v.ins;
      const b = r < 25 ? ['Leve (< 25)', 'ok'] : r <= 50 ? ['Moderada (25–50)', 'warn'] : ['Grave (> 50)', 'bad'];
      return { r: rd(r, 1), d: 1, lab: 'SCORAD', interp: b[0], lvl: b[1],
        more: [['SCORAD objetivo', fx(obj) + (obj < 15 ? ' (leve)' : obj <= 40 ? ' (moderada)' : ' (grave)')], ['B (intensidad)', B + '/18']] };
    },
    ref: 'European Task Force on Atopic Dermatitis. Severity scoring of atopic dermatitis: the SCORAD index. Dermatology. 1993;186(1):23-31. · Oranje AP, Glazenburg EJ, Wolkerstorfer A, de Waard-van der Spek FB. Practical issues on interpretation of scoring atopic dermatitis: the SCORAD index, objective SCORAD and the three-item severity score. Br J Dermatol. 2007;157(4):645-648.',
    url: 'https://doi.org/10.1159/000247298',
    verif: VERIF,
    pop: 'Niños y adultos con dermatitis atópica.',
    lim: 'La extensión excluye la sequedad aislada. El componente subjetivo (C) depende del paciente o cuidador y puede faltar en lactantes; en ese caso usar el SCORAD objetivo. Variabilidad entre observadores en la intensidad.',
    tests: [
      { v: { a: 30, eri: '2', ede: '1', exu: '1', exc: '2', liq: '1', seq: '2', pru: 6, ins: 4 }, r: 47.5 },
      { v: { a: 5, eri: '1', ede: '0', exu: '0', exc: '1', liq: '0', seq: '1', pru: 2, ins: 0 }, r: 13.5 }
    ]
  },
  {
    id: 'pasi', m: 's', cat: 'dermato', tags: [],
    n: 'PASI (Psoriasis Area and Severity Index)', sig: 'PASI', syn: ['psoriasis', 'pasi'],
    tipo: 'índice',
    fin: 'Gravedad de la psoriasis en placas según extensión y características de las lesiones en 4 regiones.',
    ver: 'PASI (Fredriksson y Pettersson 1978)',
    formula: 'PASI = Σ región [peso × (E + I + D) × A]\nPesos: cabeza 0,1 · miembros superiores 0,2 · tronco 0,3 · miembros inferiores 0,4\nE eritema, I induración, D descamación: 0 ninguna · 1 leve · 2 moderada · 3 marcada · 4 muy marcada\nA (área afectada de la región): 0 = 0 % · 1 < 10 % · 2 10–29 % · 3 30–49 % · 4 50–69 % · 5 70–89 % · 6 90–100 %\nRango 0–72',
    in: (() => {
      const sev = [['0', '0 · Ninguna'], ['1', '1 · Leve'], ['2', '2 · Moderada'], ['3', '3 · Marcada'], ['4', '4 · Muy marcada']];
      const area = [['0', '0 · Sin compromiso'], ['1', '1 · < 10 %'], ['2', '2 · 10–29 %'], ['3', '3 · 30–49 %'], ['4', '4 · 50–69 %'], ['5', '5 · 70–89 %'], ['6', '6 · 90–100 %']];
      return [['c', 'Cabeza y cuello'], ['s', 'Miembros superiores'], ['t', 'Tronco'], ['i', 'Miembros inferiores (incluye glúteos)']].flatMap(([k, l]) => [
        H(l), S(k + 'e', l + ' · eritema', sev), S(k + 'i', l + ' · induración', sev), S(k + 'd', l + ' · descamación', sev), S(k + 'a', l + ' · área afectada', area)]);
    })(),
    calc: v => {
      const w = { c: 0.1, s: 0.2, t: 0.3, i: 0.4 };
      const reg = Object.keys(w).map(k => w[k] * (+v[k + 'e'] + +v[k + 'i'] + +v[k + 'd']) * +v[k + 'a']);
      const r = reg.reduce((a, b) => a + b, 0);
      return { r: rd(r, 1), d: 1, lab: 'PASI', interp: r > 10 ? '> 10: psoriasis grave según la «regla de los 10» (Finlay 2005)' : '≤ 10', lvl: r > 10 ? 'bad' : '',
        more: [['Cabeza', fx(reg[0])], ['Miembros superiores', fx(reg[1])], ['Tronco', fx(reg[2])], ['Miembros inferiores', fx(reg[3])]] };
    },
    ref: 'Fredriksson T, Pettersson U. Severe psoriasis — oral therapy with a new retinoid. Dermatologica. 1978;157(4):238-244. · Finlay AY. Current severe psoriasis and the rule of tens. Br J Dermatol. 2005;152(5):861-867.',
    url: 'https://doi.org/10.1159/000250839',
    verif: VERIF,
    pop: 'Adultos con psoriasis en placas.',
    lim: 'Poco sensible en enfermedad leve o localizada (palmoplantar, ungueal, cuero cabelludo). La respuesta al tratamiento suele expresarse como PASI 75/90/100 (reducción porcentual respecto del basal). Variabilidad entre observadores en la estimación del área.',
    tests: [
      { v: { ce: '2', ci: '1', cd: '1', ca: '2', se: '2', si: '2', sd: '1', sa: '2', te: '2', ti: '2', td: '2', ta: '2', ie: '3', ii: '2', id: '2', ia: '3' }, r: 14.8 },
      { v: { ce: '0', ci: '0', cd: '0', ca: '0', se: '0', si: '0', sd: '0', sa: '0', te: '1', ti: '1', td: '1', ta: '1', ie: '0', ii: '0', id: '0', ia: '0' }, r: 0.9 }
    ]
  },
  {
    id: 'push', m: 's', cat: 'dermato', tags: ['s:cirugia'],
    n: 'PUSH 3.0 (Pressure Ulcer Scale for Healing)', sig: 'PUSH', syn: ['ulcera por presion', 'escara', 'lesion por presion', 'cicatrizacion'],
    tipo: 'escala clínica',
    fin: 'Seguimiento de la evolución (cicatrización) de lesiones por presión a lo largo del tiempo.',
    ver: 'PUSH Tool 3.0 (NPUAP 1998)',
    formula: 'PUSH = puntaje de área (0–10) + exudado (0–3) + tipo de tejido (0–4) = 0–17\nÁrea = largo × ancho (cm²): 0 → 0 · < 0,3 → 1 · 0,3–0,6 → 2 · 0,7–1,0 → 3 · 1,1–2,0 → 4 · 2,1–3,0 → 5 · 3,1–4,0 → 6 · 4,1–8,0 → 7 · 8,1–12,0 → 8 · 12,1–24,0 → 9 · > 24,0 → 10\nExudado: ninguno 0 · escaso 1 · moderado 2 · abundante 3\nTejido: cerrada 0 · epitelial 1 · granulación 2 · esfacelo 3 · necrótico 4',
    in: [
      N('largo', 'Largo máximo (cefalocaudal)', 'cm', 0, 100, 0.1),
      N('ancho', 'Ancho máximo (perpendicular al largo)', 'cm', 0, 100, 0.1),
      S('exu', 'Cantidad de exudado (tras retirar el apósito, antes de aplicar tópicos)', [['0', 'Ninguno', 0], ['1', 'Escaso', 1], ['2', 'Moderado', 2], ['3', 'Abundante', 3]]),
      S('tej', 'Tipo de tejido (el peor presente en el lecho)', [['0', 'Cerrada / resurgida', 0], ['1', 'Tejido epitelial (superficial)', 1], ['2', 'Tejido de granulación', 2], ['3', 'Esfacelo', 3], ['4', 'Tejido necrótico (escara)', 4]])
    ],
    calc: v => {
      const a = v.largo * v.ancho;
      // bandas publicadas a 1 decimal: los valores intermedios se asignan por redondeo a 0,1 cm²
      const pa = a == 0 ? 0 : a < 0.3 ? 1 : a < 0.65 ? 2 : a < 1.05 ? 3 : a < 2.05 ? 4 : a < 3.05 ? 5 : a < 4.05 ? 6 : a < 8.05 ? 7 : a < 12.05 ? 8 : a < 24.05 ? 9 : 10;
      const r = pa + +v.exu + +v.tej;
      return { r, d: 0, lab: 'PUSH', interp: 'Comparar con mediciones previas: el descenso indica cicatrización (17 = peor, 0 = cerrada)', lvl: '',
        more: [['Área', fx(a, 2) + ' cm² → ' + pa + ' pts']] };
    },
    ref: 'National Pressure Ulcer Advisory Panel. PUSH Tool 3.0. 1998. · Stotts NA, Rodeheaver GT, Thomas DR, et al. An instrument to measure healing in pressure ulcers: development and validation of the Pressure Ulcer Scale for Healing (PUSH). J Gerontol A Biol Sci Med Sci. 2001;56(12):M795-M799.',
    url: 'https://doi.org/10.1093/gerona/56.12.M795',
    verif: VERIF,
    pop: 'Pacientes con lesiones por presión (internados, residencias, domicilio).',
    lim: 'Mide evolución, no gravedad ni estadio; no valora profundidad, socavamiento ni infección. Medir siempre con la misma técnica y en el mismo momento de la curación.',
    tests: [
      { v: { largo: 3, ancho: 2, exu: '2', tej: '3' }, r: 12 },
      { v: { largo: 0, ancho: 0, exu: '0', tej: '0' }, r: 0 },
      { v: { largo: 0.5, ancho: 0.5, exu: '1', tej: '2' }, r: 4 }
    ]
  }
];

export default TOOLS.map(T);
