// Fórmulas (m: 'f') — ácido-base, medio interno, fluidos, fármacos, hemodinamia, respiratorio, nefrología, antropometría.
// Verificado 2026-10. Ver docs/ESQUEMA_CALCULADORAS.md.
import { rd, band, U } from '../h.js';

// ---------- ayudas locales ----------
const fm = (x, d = 1) => (x == null || !isFinite(x) ? '—' : rd(x, d).toLocaleString('es-AR', { maximumFractionDigits: d }));
const num = (id, l, u, min, max, extra = {}) => ({ t: 'num', id, l, u, min, max, ...extra });
const SEXO = { t: 'sel', id: 'sexo', l: 'Sexo biológico', o: [['m', 'Masculino'], ['f', 'Femenino']] };
const CRU = { u: 'mmol/L', f: x => x * 11.312 };            // creatinina urinaria mmol/L → mg/dL
const UA_UMOL = { u: 'µmol/L', f: x => x / 59.48 };          // ácido úrico µmol/L → mg/dL
const FIO2P = { u: '%', f: x => x / 100 };                   // FiO2 % → fracción
const KG = [U.lb], CM = [U.inch];
const PESO = (id = 'peso', l = 'Peso') => num(id, l, 'kg', 1, 350, { step: 0.1, alt: KG });
const TALLA = (id = 'talla', l = 'Talla', extra = {}) => num(id, l, 'cm', 50, 250, { alt: CM, ...extra });
const FIO2 = num('fio2', 'FiO₂', 'fracción (0,21–1)', 0.21, 1, { step: 0.01, alt: [FIO2P] });
const mosteller = (p, t) => Math.sqrt(p * t / 3600);
const ibwDevine = (sexo, cm) => (sexo == 'f' ? 45.5 : 50) + 2.3 * (cm / 2.54 - 60);
const pbwArds = (sexo, cm) => (sexo == 'f' ? 45.5 : 50) + 0.91 * (cm - 152.4);
const TBWF = { t: 'sel', id: 'act', l: 'Fracción de agua corporal total (Adrogué–Madias)', o: [['0.6', 'Niño u hombre < 65 años (0,6)'], ['0.5', 'Mujer < 65 años u hombre ≥ 65 años (0,5)'], ['0.45', 'Mujer ≥ 65 años (0,45)']] };
const kdigoG = e => band(e, [[90, 1e9, 'G1 (≥ 90): normal o alto — requiere marcador de daño renal para definir ERC', 'ok'], [60, 89.999, 'G2 (60–89): levemente disminuido — requiere marcador de daño renal para definir ERC', 'ok'], [45, 59.999, 'G3a (45–59): leve a moderadamente disminuido', 'warn'], [30, 44.999, 'G3b (30–44): moderada a gravemente disminuido', 'warn'], [15, 29.999, 'G4 (15–29): gravemente disminuido', 'bad'], [0, 14.999, 'G5 (< 15): falla renal', 'bad']]);
const KDIGO_REF = 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024;105(4S):S117–S314.';
const AB_REF = 'Adrogué HJ, Madias NE. Secondary responses to altered acid-base status: the rules of engagement. J Am Soc Nephrol. 2010;21:920–923.';
const AM_REF = 'Adrogué HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342:1581–1589; Adrogué HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342:1493–1499.';

export default [
  // =====================================================================
  // ÁCIDO-BASE
  // =====================================================================
  {
    id: 'henderson-hasselbalch', m: 'f', cat: 'acido-base', tags: [],
    n: 'Ecuación de Henderson–Hasselbalch', sig: 'HH', syn: ['ph calculado', 'bicarbonato calculado', 'coherencia gasometria'],
    tipo: 'cálculo',
    fin: 'Calcula el pH a partir de HCO₃⁻ y pCO₂, o el HCO₃⁻ a partir de pH y pCO₂. Sirve para chequear la coherencia interna de un gasometría.',
    ver: 'Forma clínica con pKa 6,1 y coeficiente de solubilidad del CO₂ 0,03 mmol/L/mmHg',
    formula: 'pH = 6,1 + log₁₀ [HCO₃⁻ / (0,03 × pCO₂)]\nHCO₃⁻ = 0,03 × pCO₂ × 10^(pH − 6,1)',
    in: [
      { t: 'sel', id: 'modo', l: 'Calcular', o: [['ph', 'pH (a partir de HCO₃⁻ y pCO₂)'], ['hco3', 'HCO₃⁻ (a partir de pH y pCO₂)']] },
      num('pco2', 'pCO₂', 'mmHg', 5, 200, { alt: [U.kpa] }),
      num('hco3', 'HCO₃⁻ (si se calcula el pH)', 'mEq/L', 1, 80, { req: 0 }),
      num('ph', 'pH (si se calcula el HCO₃⁻)', '', 6.5, 8, { step: 0.01, req: 0 })
    ],
    calc: v => {
      if (v.modo == 'ph') { if (v.hco3 == null) return null; const ph = 6.1 + Math.log10(v.hco3 / (0.03 * v.pco2)); return { r: rd(ph, 2), u: '', d: 2, lab: 'pH calculado', note: 'Si difiere en más de ~0,03 del pH medido, revisar la muestra o el cálculo del HCO₃⁻ del equipo.' }; }
      if (v.ph == null) return null; const h = 0.03 * v.pco2 * 10 ** (v.ph - 6.1);
      return { r: rd(h, 1), u: 'mEq/L', d: 1, lab: 'HCO₃⁻ calculado' };
    },
    ref: 'Berend K, de Vries APJ, Gans ROB. Physiological approach to assessment of acid-base disturbances. N Engl J Med. 2014;371:1434–1445.',
    url: 'https://doi.org/10.1056/NEJMra1003327', verif: '2026-10',
    pop: 'Plasma arterial a 37 °C.',
    lim: 'El pKa (6,1) y la solubilidad del CO₂ (0,03) se asumen constantes; varían algo con temperatura, pH y fuerza iónica. Los gasómetros miden pH y pCO₂ y calculan el HCO₃⁻ con esta misma ecuación.',
    tests: [{ v: { modo: 'ph', pco2: 40, hco3: 24 }, r: 7.4 }, { v: { modo: 'hco3', pco2: 40, ph: 7.4 }, r: 23.9 }, { v: { modo: 'ph', pco2: 60, hco3: 30 }, r: 7.32 }]
  },
  {
    id: 'anion-gap', m: 'f', cat: 'acido-base', tags: ['f:endocrino'],
    n: 'Anion gap (brecha aniónica)', sig: 'AG', syn: ['brecha anionica', 'hiato anionico', 'gap'],
    tipo: 'cálculo',
    fin: 'Estima los aniones no medidos del plasma; ayuda a clasificar una acidosis metabólica (con AG elevado o normal).',
    ver: 'Fórmula clásica sin potasio (opcional con K⁺)',
    formula: 'AG = Na⁺ − (Cl⁻ + HCO₃⁻)\nAG con K = (Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻)',
    in: [num('na', 'Na⁺', 'mEq/L', 90, 200), num('cl', 'Cl⁻', 'mEq/L', 50, 160), num('hco3', 'HCO₃⁻', 'mEq/L', 1, 60), num('k', 'K⁺ (opcional)', 'mEq/L', 1, 10, { step: 0.1, req: 0 })],
    calc: v => { const ag = v.na - (v.cl + v.hco3); const more = []; if (v.k != null) more.push(['AG con K⁺', fm(ag + v.k, 1) + ' mEq/L']); return { r: rd(ag, 1), u: 'mEq/L', d: 0, lab: 'Anion gap (sin K⁺)', more, note: 'Interpretar con el rango de referencia de tu laboratorio y corregir por albúmina si está baja.' }; },
    ref: 'Kraut JA, Madias NE. Serum anion gap: its uses and limitations in clinical medicine. Clin J Am Soc Nephrol. 2007;2:162–174.',
    url: 'https://doi.org/10.2215/CJN.03020906', verif: '2026-10',
    pop: 'Adultos; valores de referencia dependientes del analizador.',
    lim: 'El rango normal depende del método (con electrodos ion-selectivos actuales suele ser más bajo que el clásico 12 ± 4); usar el del laboratorio. La hipoalbuminemia lo reduce y puede enmascarar un AG elevado. Litio, hipercalcemia, hipermagnesemia, paraproteinemias (IgG) y bromuro pueden bajarlo.',
    tests: [{ v: { na: 140, cl: 104, hco3: 24 }, r: 12 }, { v: { na: 135, cl: 100, hco3: 10, k: 4 }, r: 25 }]
  },
  {
    id: 'anion-gap-albumina', m: 'f', cat: 'acido-base', tags: ['f:endocrino'],
    n: 'Anion gap corregido por albúmina', sig: 'AGc', syn: ['anion gap ajustado', 'figge'],
    tipo: 'cálculo',
    fin: 'Ajusta el anion gap por la hipoalbuminemia, que lo baja y puede ocultar una acidosis con AG elevado.',
    ver: 'Corrección de Figge 1998 (2,5 mEq/L por cada g/dL de albúmina)',
    formula: 'AGc = AG + 2,5 × (albúmina normal − albúmina medida) [g/dL]\nAG = Na⁺ − (Cl⁻ + HCO₃⁻)',
    in: [num('na', 'Na⁺', 'mEq/L', 90, 200), num('cl', 'Cl⁻', 'mEq/L', 50, 160), num('hco3', 'HCO₃⁻', 'mEq/L', 1, 60), num('alb', 'Albúmina', 'g/dL', 0.5, 7, { step: 0.1, alt: [U.alb_gl] }), num('albn', 'Albúmina normal de referencia (vacío = 4,0)', 'g/dL', 3, 5.5, { step: 0.1, req: 0, alt: [U.alb_gl] })],
    calc: v => { const n = v.albn ?? 4; const ag = v.na - (v.cl + v.hco3); const c = ag + 2.5 * (n - v.alb); return { r: rd(c, 1), u: 'mEq/L', d: 1, lab: 'AG corregido', more: [['AG sin corregir', fm(ag, 1) + ' mEq/L'], ['Albúmina de referencia usada', fm(n, 1) + ' g/dL']] }; },
    ref: 'Figge J, Jabor A, Kazda A, Fencl V. Anion gap and hypoalbuminemia. Crit Care Med. 1998;26:1807–1810.',
    url: 'https://doi.org/10.1097/00003246-199811000-00019', verif: '2026-10',
    pop: 'Pacientes críticos con hipoalbuminemia.',
    lim: 'El factor 2,5 es una aproximación (el original estima 2,3–2,5 mEq/L por g/dL). La albúmina normal de referencia varía entre fuentes (4,0–4,4 g/dL): usar la del laboratorio. No corrige por fosfato ni por otras proteínas.',
    tests: [{ v: { na: 140, cl: 104, hco3: 24, alb: 2 }, r: 17 }, { v: { na: 138, cl: 108, hco3: 18, alb: 2.4, albn: 4.4 }, r: 17 }]
  },
  {
    id: 'winter', m: 'f', cat: 'acido-base', tags: [],
    n: 'Fórmula de Winter (pCO₂ esperada en acidosis metabólica)', sig: '', syn: ['winters', 'compensacion respiratoria acidosis metabolica'],
    tipo: 'cálculo',
    fin: 'Calcula la pCO₂ esperada por compensación respiratoria en una acidosis metabólica, para detectar un trastorno respiratorio asociado.',
    ver: 'Albert, Dell y Winters 1967',
    formula: 'pCO₂ esperada = 1,5 × HCO₃⁻ + 8 (± 2) mmHg',
    in: [num('hco3', 'HCO₃⁻', 'mEq/L', 1, 30), num('pco2', 'pCO₂ medida (opcional)', 'mmHg', 5, 150, { req: 0, alt: [U.kpa] })],
    calc: v => {
      const e = 1.5 * v.hco3 + 8; const o = { r: rd(e, 1), u: 'mmHg', d: 1, lab: 'pCO₂ esperada', more: [['Rango', fm(e - 2, 1) + ' a ' + fm(e + 2, 1) + ' mmHg']] };
      if (v.pco2 != null) { if (v.pco2 > e + 2) Object.assign(o, { interp: 'pCO₂ mayor que la esperada: sugiere acidosis respiratoria asociada', lvl: 'warn' }); else if (v.pco2 < e - 2) Object.assign(o, { interp: 'pCO₂ menor que la esperada: sugiere alcalosis respiratoria asociada', lvl: 'warn' }); else Object.assign(o, { interp: 'pCO₂ dentro de lo esperado: compensación respiratoria adecuada', lvl: 'ok' }); }
      return o;
    },
    ref: 'Albert MS, Dell RB, Winters RW. Quantitative displacement of acid-base equilibrium in metabolic acidosis. Ann Intern Med. 1967;66:312–322.',
    url: 'https://doi.org/10.7326/0003-4819-66-2-312', verif: '2026-10',
    pop: 'Acidosis metabólica en estado estable (la compensación tarda 12–24 h en completarse).',
    lim: 'Aplica solo a acidosis metabólica primaria. Antes de que la compensación se complete, la comparación no es válida.',
    tests: [{ v: { hco3: 12 }, r: 26 }, { v: { hco3: 10, pco2: 35 }, r: 'acidosis respiratoria' }]
  },
  {
    id: 'comp-alcalosis-metabolica', m: 'f', cat: 'acido-base', tags: [],
    n: 'Compensación respiratoria esperada en alcalosis metabólica', sig: '', syn: ['pco2 esperada alcalosis metabolica'],
    tipo: 'cálculo',
    fin: 'Estima la pCO₂ esperada por hipoventilación compensadora en una alcalosis metabólica.',
    ver: 'Regla de 0,7 mmHg de pCO₂ por cada mEq/L de aumento del HCO₃⁻ (rango 0,6–0,75)',
    formula: 'pCO₂ esperada = 40 + 0,7 × (HCO₃⁻ − 24) mmHg\nRango orientativo: 40 + 0,6 × ΔHCO₃⁻ a 40 + 0,75 × ΔHCO₃⁻',
    in: [num('hco3', 'HCO₃⁻', 'mEq/L', 24.1, 70), num('pco2', 'pCO₂ medida (opcional)', 'mmHg', 5, 150, { req: 0, alt: [U.kpa] })],
    calc: v => {
      const d = v.hco3 - 24, e = 40 + 0.7 * d, lo = 40 + 0.6 * d, hi = 40 + 0.75 * d;
      const o = { r: rd(e, 1), u: 'mmHg', d: 1, lab: 'pCO₂ esperada', more: [['Rango orientativo', fm(lo, 1) + ' a ' + fm(hi, 1) + ' mmHg']] };
      if (v.pco2 != null) { if (v.pco2 > hi) Object.assign(o, { interp: 'pCO₂ mayor que la esperada: sugiere acidosis respiratoria asociada', lvl: 'warn' }); else if (v.pco2 < lo) Object.assign(o, { interp: 'pCO₂ menor que la esperada: sugiere alcalosis respiratoria asociada', lvl: 'warn' }); else Object.assign(o, { interp: 'pCO₂ dentro del rango orientativo', lvl: 'ok' }); }
      return o;
    },
    ref: AB_REF + ' Rango 0,6–0,75: MSD Manual Professional, «Primary Changes and Compensations in Simple Acid-Base Disorders».',
    url: 'https://doi.org/10.1681/ASN.2009121211', verif: '2026-10',
    pop: 'Alcalosis metabólica en estado estable.',
    lim: 'Es la regla de compensación menos precisa. La pCO₂ compensadora rara vez supera ~55 mmHg; la hipoxemia limita la hipoventilación.',
    tests: [{ v: { hco3: 36 }, r: 48.4 }, { v: { hco3: 34, pco2: 60 }, r: 'acidosis respiratoria' }]
  },
  {
    id: 'comp-acidosis-respiratoria', m: 'f', cat: 'acido-base', tags: [],
    n: 'Compensación metabólica esperada en acidosis respiratoria', sig: '', syn: ['hco3 esperado acidosis respiratoria', 'hipercapnia'],
    tipo: 'cálculo',
    fin: 'Estima el HCO₃⁻ esperado en una acidosis respiratoria aguda o crónica, para detectar un trastorno metabólico asociado.',
    ver: 'Reglas de Adrogué y Madias 2010: aguda 0,1 y crónica 0,35 mEq/L por mmHg',
    formula: 'Aguda: HCO₃⁻ esperado = 24 + 0,1 × (pCO₂ − 40)\nCrónica: HCO₃⁻ esperado = 24 + 0,35 × (pCO₂ − 40)',
    in: [{ t: 'sel', id: 'fase', l: 'Evolución', o: [['a', 'Aguda (minutos a horas)'], ['c', 'Crónica (≥ 3–5 días)']] }, num('pco2', 'pCO₂', 'mmHg', 40.1, 200, { alt: [U.kpa] }), num('hco3', 'HCO₃⁻ medido (opcional)', 'mEq/L', 1, 80, { req: 0 })],
    calc: v => { const k = v.fase == 'c' ? 0.35 : 0.1; const e = 24 + k * (v.pco2 - 40); const more = [['Factor usado', fm(k, 2) + ' mEq/L por mmHg']]; if (v.hco3 != null) more.push(['Diferencia medido − esperado', fm(v.hco3 - e, 1) + ' mEq/L']); return { r: rd(e, 1), u: 'mEq/L', d: 1, lab: 'HCO₃⁻ esperado', more, note: 'Un HCO₃⁻ claramente mayor que el esperado sugiere alcalosis metabólica asociada; claramente menor, acidosis metabólica asociada.' }; },
    ref: AB_REF, url: 'https://doi.org/10.1681/ASN.2009121211', verif: '2026-10',
    pop: 'Adultos con acidosis respiratoria primaria.',
    lim: 'Reglas empíricas derivadas de estudios en humanos y animales; los márgenes son de unos ± 2 mEq/L. La forma crónica requiere días de evolución para la adaptación renal.',
    tests: [{ v: { fase: 'a', pco2: 60 }, r: 26 }, { v: { fase: 'c', pco2: 60 }, r: 31 }]
  },
  {
    id: 'comp-alcalosis-respiratoria', m: 'f', cat: 'acido-base', tags: [],
    n: 'Compensación metabólica esperada en alcalosis respiratoria', sig: '', syn: ['hco3 esperado alcalosis respiratoria', 'hipocapnia'],
    tipo: 'cálculo',
    fin: 'Estima el HCO₃⁻ esperado en una alcalosis respiratoria aguda o crónica.',
    ver: 'Reglas de Adrogué y Madias 2010: aguda 0,2 y crónica 0,4 mEq/L por mmHg',
    formula: 'Aguda: HCO₃⁻ esperado = 24 − 0,2 × (40 − pCO₂)\nCrónica: HCO₃⁻ esperado = 24 − 0,4 × (40 − pCO₂)',
    in: [{ t: 'sel', id: 'fase', l: 'Evolución', o: [['a', 'Aguda'], ['c', 'Crónica (≥ 2–3 días)']] }, num('pco2', 'pCO₂', 'mmHg', 5, 39.9, { alt: [U.kpa] }), num('hco3', 'HCO₃⁻ medido (opcional)', 'mEq/L', 1, 80, { req: 0 })],
    calc: v => { const k = v.fase == 'c' ? 0.4 : 0.2; const e = 24 - k * (40 - v.pco2); const more = [['Factor usado', fm(k, 2) + ' mEq/L por mmHg']]; if (v.hco3 != null) more.push(['Diferencia medido − esperado', fm(v.hco3 - e, 1) + ' mEq/L']); return { r: rd(e, 1), u: 'mEq/L', d: 1, lab: 'HCO₃⁻ esperado', more, note: 'Un HCO₃⁻ claramente menor que el esperado sugiere acidosis metabólica asociada; claramente mayor, alcalosis metabólica asociada.' }; },
    ref: AB_REF, url: 'https://doi.org/10.1681/ASN.2009121211', verif: '2026-10',
    pop: 'Adultos con alcalosis respiratoria primaria.',
    lim: 'Reglas empíricas; algunas fuentes usan 0,5 para la forma crónica. El HCO₃⁻ compensador rara vez baja de ~12–15 mEq/L.',
    tests: [{ v: { fase: 'a', pco2: 30 }, r: 22 }, { v: { fase: 'c', pco2: 30 }, r: 20 }]
  },
  {
    id: 'delta-gap', m: 'f', cat: 'acido-base', tags: [],
    n: 'Delta gap y delta ratio', sig: 'ΔAG/ΔHCO₃⁻', syn: ['delta delta', 'delta ratio', 'trastorno mixto'],
    tipo: 'cálculo',
    fin: 'En una acidosis con AG elevado, compara el aumento del AG con la caída del HCO₃⁻ para buscar un trastorno metabólico mixto.',
    ver: 'Rastegar 2007',
    formula: 'AG = Na⁺ − (Cl⁻ + HCO₃⁻)\nΔAG (delta gap) = AG − AG normal\nΔHCO₃⁻ = HCO₃⁻ normal − HCO₃⁻\nDelta ratio = ΔAG / ΔHCO₃⁻',
    in: [num('na', 'Na⁺', 'mEq/L', 90, 200), num('cl', 'Cl⁻', 'mEq/L', 50, 160), num('hco3', 'HCO₃⁻', 'mEq/L', 1, 40), num('agn', 'AG normal de referencia (vacío = 12)', 'mEq/L', 3, 20, { req: 0 }), num('hn', 'HCO₃⁻ normal de referencia (vacío = 24)', 'mEq/L', 20, 30, { req: 0 })],
    calc: v => {
      const agn = v.agn ?? 12, hn = v.hn ?? 24; const ag = v.na - (v.cl + v.hco3), dag = ag - agn, dh = hn - v.hco3;
      if (dh <= 0) return { r: '—', lab: 'Delta ratio', interp: 'No aplicable: el HCO₃⁻ no está descendido', more: [['AG', fm(ag, 1) + ' mEq/L'], ['Delta gap', fm(dag, 1) + ' mEq/L']] };
      const dr = dag / dh;
      const b = band(dr, [[-1e9, 0.9999, 'Delta ratio < 1: sugiere acidosis metabólica con AG normal (hiperclorémica) asociada', 'warn'], [1, 2, 'Delta ratio 1–2: compatible con acidosis con AG elevado no complicada', 'ok'], [2.0001, 1e9, 'Delta ratio > 2: sugiere alcalosis metabólica asociada (o HCO₃⁻ previo elevado por acidosis respiratoria crónica)', 'warn']]);
      return { r: rd(dr, 2), u: '', d: 2, lab: 'Delta ratio', ...b, more: [['AG', fm(ag, 1) + ' mEq/L'], ['Delta gap (ΔAG)', fm(dag, 1) + ' mEq/L'], ['ΔHCO₃⁻', fm(dh, 1) + ' mEq/L'], ['Referencias usadas', 'AG ' + fm(agn, 0) + ' · HCO₃⁻ ' + fm(hn, 0)]] };
    },
    ref: 'Rastegar A. Use of the ΔAG/ΔHCO3− ratio in the diagnosis of mixed acid-base disorders. J Am Soc Nephrol. 2007;18:2429–2431.',
    url: 'https://doi.org/10.1681/ASN.2006121408', verif: '2026-10',
    pop: 'Acidosis metabólica con anion gap elevado.',
    lim: 'Solo tiene sentido si el AG está elevado. Es orientativo: en la acidosis láctica el ratio suele rondar 1,6 y en la cetoacidosis ~1 (por pérdida urinaria de cetoaniones). Depende mucho de los valores normales elegidos; corregir el AG por albúmina si está baja.',
    tests: [{ v: { na: 140, cl: 100, hco3: 10 }, r: 1.29 }, { v: { na: 140, cl: 110, hco3: 14 }, r: 0.4 }]
  },

  // =====================================================================
  // MEDIO INTERNO
  // =====================================================================
  {
    id: 'sodio-corregido-glucemia', m: 'f', cat: 'medio-interno', tags: ['f:neuro', 'f:endocrino'],
    n: 'Sodio corregido por hiperglucemia', sig: 'Na corr', syn: ['katz', 'hillier', 'pseudohiponatremia', 'hiponatremia hiperglucemica'],
    tipo: 'cálculo',
    fin: 'Estima la natremia que tendría el paciente con glucemia normal, para evaluar el estado real del agua en la hiperglucemia.',
    ver: 'Factor de Katz 1973 (1,6) o de Hillier 1999 (2,4), seleccionable',
    formula: 'Na corregido = Na medido + factor × (glucemia − 100) / 100\nfactor = 1,6 (Katz) o 2,4 (Hillier) mEq/L por cada 100 mg/dL',
    in: [{ t: 'sel', id: 'fac', l: 'Factor de corrección', o: [['1.6', 'Katz 1973: 1,6 mEq/L por 100 mg/dL'], ['2.4', 'Hillier 1999: 2,4 mEq/L por 100 mg/dL']] }, num('na', 'Na⁺ medido', 'mEq/L', 90, 200), num('glu', 'Glucemia', 'mg/dL', 100, 3000, { alt: [U.glu_mmol] })],
    calc: v => { const f = +v.fac; const c = v.na + f * (v.glu - 100) / 100; return { r: rd(c, 1), u: 'mEq/L', d: 1, lab: 'Na⁺ corregido', more: [['Factor usado', (f == 1.6 ? 'Katz 1,6' : 'Hillier 2,4') + ' mEq/L por 100 mg/dL']] }; },
    ref: 'Katz MA. Hyperglycemia-induced hyponatremia—calculation of expected serum sodium depression. N Engl J Med. 1973;289:843–844. Hillier TA, Abbott RD, Barrett EJ. Hyponatremia: evaluating the correction factor for hyperglycemia. Am J Med. 1999;106:399–403.',
    url: 'https://doi.org/10.1016/S0002-9343(99)00055-8', verif: '2026-10',
    pop: 'Katz: modelo teórico. Hillier: voluntarios sanos con hiperglucemia inducida (somatostatina + dextrosa).',
    lim: 'Hillier mostró que la relación no es lineal: por encima de ~400 mg/dL el descenso es mayor (2,4 o más). Ninguno de los factores reemplaza el seguimiento seriado de la natremia y la osmolalidad.',
    tests: [{ v: { fac: '1.6', na: 128, glu: 600 }, r: 136 }, { v: { fac: '2.4', na: 128, glu: 600 }, r: 140 }]
  },
  {
    id: 'osmolalidad-calculada', m: 'f', cat: 'medio-interno', tags: ['f:neuro', 'f:endocrino'],
    n: 'Osmolalidad plasmática calculada', sig: 'Osm calc', syn: ['osmolaridad', 'tonicidad', 'osmolaridad efectiva'],
    tipo: 'estimación',
    fin: 'Estima la osmolalidad plasmática a partir de sodio, glucosa y urea; informa también la osmolalidad efectiva (tonicidad), sin urea.',
    ver: 'Fórmula habitual 2·Na + glucosa/18 + urea/6 (BUN/2,8)',
    formula: 'Osm calculada = 2 × Na⁺ + glucosa [mg/dL] / 18 + urea [mg/dL] / 6\n(equivale a + BUN [mg/dL] / 2,8)\nOsm efectiva (tonicidad) = 2 × Na⁺ + glucosa / 18',
    in: [num('na', 'Na⁺', 'mEq/L', 90, 200), num('glu', 'Glucemia', 'mg/dL', 10, 3000, { alt: [U.glu_mmol] }), num('urea', 'Urea (opcional)', 'mg/dL', 1, 800, { req: 0, alt: [U.bun_mgdl, U.urea_mmol] })],
    calc: v => { const ef = 2 * v.na + v.glu / 18.016; const t = v.urea != null ? ef + v.urea / 6.006 : ef; return { r: rd(t, 0), u: 'mOsm/kg', d: 0, lab: v.urea != null ? 'Osmolalidad calculada (Na, glucosa, urea)' : 'Osmolalidad calculada (Na y glucosa, sin urea)', more: [['Osmolalidad efectiva (tonicidad)', fm(ef, 0) + ' mOsm/kg'], ['Variables usadas', v.urea != null ? 'Na⁺, glucosa y urea' : 'Na⁺ y glucosa (sin urea)']] }; },
    ref: 'Rasouli M. Basic concepts and practical equations on osmolality: biochemical approach. Clin Biochem. 2016;49:936–941.',
    url: 'https://doi.org/10.1016/j.clinbiochem.2016.06.001', verif: '2026-10',
    pop: 'Adultos.',
    lim: 'Es una estimación: no detecta osmoles no medidos (etanol, metanol, etilenglicol, manitol). La urea atraviesa membranas y no genera tonicidad; para evaluar el riesgo de edema cerebral usar la osmolalidad efectiva. Existen variantes de la fórmula con otros coeficientes.',
    tests: [{ v: { na: 140, glu: 90, urea: 30 }, r: 290 }, { v: { na: 140, glu: 180 }, r: 290 }]
  },
  {
    id: 'osmolal-gap', m: 'f', cat: 'medio-interno', tags: ['f:endocrino'],
    n: 'Osmolal gap (brecha osmolar)', sig: 'OG', syn: ['gap osmolar', 'hiato osmolar', 'alcoholes toxicos', 'metanol', 'etilenglicol'],
    tipo: 'cálculo',
    fin: 'Diferencia entre la osmolalidad medida y la calculada; un valor elevado sugiere osmoles no medidos (p. ej., alcoholes tóxicos).',
    ver: 'Osmolalidad calculada = 2·Na + glucosa/18 + urea/6 (+ etanol/4,6 opcional)',
    formula: 'OG = Osm medida − Osm calculada\nOsm calculada = 2 × Na⁺ + glucosa/18 + urea/6 [+ etanol (mg/dL)/4,6]',
    in: [num('om', 'Osmolalidad medida', 'mOsm/kg', 150, 500), num('na', 'Na⁺', 'mEq/L', 90, 200), num('glu', 'Glucemia', 'mg/dL', 10, 3000, { alt: [U.glu_mmol] }), num('urea', 'Urea', 'mg/dL', 1, 800, { alt: [U.bun_mgdl, U.urea_mmol] }), num('eth', 'Etanol (opcional)', 'mg/dL', 0, 1000, { req: 0, alt: [{ u: 'mmol/L', f: x => x * 4.607 }] })],
    calc: v => {
      let c = 2 * v.na + v.glu / 18.016 + v.urea / 6.006; if (v.eth != null) c += v.eth / 4.607; const g = v.om - c;
      return { r: rd(g, 0), u: 'mOsm/kg', d: 0, lab: 'Osmolal gap', interp: g > 10 ? 'Mayor de 10 mOsm/kg: sugiere osmoles no medidos' : 'No supera 10 mOsm/kg', lvl: g > 10 ? 'warn' : '', more: [['Osmolalidad calculada', fm(c, 0) + ' mOsm/kg'], ['Etanol incluido', v.eth != null ? 'sí (÷ 4,6)' : 'no']] };
    },
    ref: 'Kraut JA, Kurtz I. Toxic alcohol ingestions: clinical features, diagnosis, and management. Clin J Am Soc Nephrol. 2008;3:208–225.',
    url: 'https://doi.org/10.2215/CJN.03220807', verif: '2026-10',
    pop: 'Sospecha de intoxicación por alcoholes tóxicos.',
    lim: 'El rango normal es amplio (aprox. −10 a +10) y varía entre personas: un gap «normal» no descarta intoxicación, sobre todo si es tardía (el tóxico ya se metabolizó y predomina la acidosis con AG elevado). Medir la osmolalidad por descenso crioscópico. El factor del etanol varía entre fuentes (3,7 a 4,6).',
    tests: [{ v: { om: 320, na: 140, glu: 90, urea: 30 }, r: 30 }, { v: { om: 300, na: 140, glu: 90, urea: 30, eth: 46 }, r: 0, tol: 1 }]
  },
  {
    id: 'calcio-corregido', m: 'f', cat: 'medio-interno', tags: ['f:endocrino'],
    n: 'Calcio corregido por albúmina', sig: 'Ca corr', syn: ['payne', 'calcemia corregida'],
    tipo: 'estimación',
    fin: 'Estima el calcio total que tendría el paciente con albúmina normal.',
    ver: 'Fórmula de Payne 1973 (0,8 mg/dL por g/dL de albúmina, referencia 4 g/dL)',
    formula: 'Ca corregido = Ca total + 0,8 × (4 − albúmina [g/dL]) mg/dL',
    in: [num('ca', 'Calcio total', 'mg/dL', 2, 20, { step: 0.1, alt: [U.ca_mmol] }), num('alb', 'Albúmina', 'g/dL', 0.5, 7, { step: 0.1, alt: [U.alb_gl] })],
    calc: v => { const c = v.ca + 0.8 * (4 - v.alb); return { r: rd(c, 1), u: 'mg/dL', d: 1, lab: 'Calcio corregido', more: [['En mmol/L', fm(c / 4.008, 2)]], note: 'Ante decisiones clínicas, medir calcio iónico.' }; },
    ref: 'Payne RB, Little AJ, Williams RB, Milner JR. Interpretation of serum calcium in patients with abnormal serum proteins. Br Med J. 1973;4:643–646.',
    url: 'https://doi.org/10.1136/bmj.4.5893.643', verif: '2026-10',
    pop: 'Adultos con albúmina alterada.',
    lim: 'LIMITACIÓN IMPORTANTE: concuerda mal con el calcio iónico, sobre todo en pacientes críticos, con ERC, alteraciones ácido-base o hipoalbuminemia marcada; puede clasificar mal la calcemia. Las guías KDIGO desaconsejan usarla en ERC. Si está disponible, el calcio iónico es la medición de referencia.',
    tests: [{ v: { ca: 7.5, alb: 2.5 }, r: 8.7 }, { v: { ca: 9, alb: 4 }, r: 9 }]
  },
  {
    id: 'adrogue-madias', m: 'f', cat: 'medio-interno', tags: ['f:neuro'],
    n: 'Fórmula de Adrogué–Madias', sig: '', syn: ['cambio de sodio', 'solucion hipertonica', 'correccion de natremia', 'hiponatremia', 'hipernatremia'],
    tipo: 'estimación',
    fin: 'Estima cuánto cambia la natremia con 1 litro de la solución elegida.',
    ver: 'Adrogué y Madias, NEJM 2000 (Na⁺ + K⁺ de la solución)',
    formula: 'ΔNa⁺ por litro = [(Na⁺ + K⁺) de la solución − Na⁺ sérico] / (ACT + 1)\nACT = peso × fracción de agua corporal',
    in: [
      { t: 'sel', id: 'sol', l: 'Solución (Na⁺ + K⁺, mEq/L)', o: [['855', 'NaCl 5 % (855)'], ['513', 'NaCl 3 % (513)'], ['154', 'NaCl 0,9 % (154)'], ['134', 'Ringer lactato (Na 130 + K 4 = 134)'], ['145', 'Plasma-Lyte 148 (Na 140 + K 5 = 145)'], ['77', 'NaCl 0,45 % (77)'], ['34', 'NaCl 0,2 % en dextrosa 5 % (34)'], ['0', 'Dextrosa 5 % (0)'], ['otro', 'Otra (ingresar Na⁺ + K⁺)']] },
      num('otro', 'Na⁺ + K⁺ de la otra solución', 'mEq/L', 0, 1000, { req: 0 }),
      num('kadd', 'K⁺ agregado a la solución (opcional)', 'mEq/L', 0, 200, { req: 0 }),
      num('na', 'Na⁺ sérico', 'mEq/L', 90, 200), PESO(), TBWF
    ],
    calc: v => {
      let s = v.sol == 'otro' ? v.otro : +v.sol; if (s == null) return null; s += v.kadd || 0;
      const act = v.peso * +v.act, d = (s - v.na) / (act + 1);
      return { r: rd(d, 1), u: 'mEq/L por litro infundido', d: 1, lab: 'Cambio estimado de Na⁺', more: [['Na⁺ + K⁺ de la solución usada', fm(s, 0) + ' mEq/L'], ['Agua corporal total', fm(act, 1) + ' L'], ['Na⁺ estimado tras 1 L', fm(v.na + d, 1) + ' mEq/L']], note: 'No contempla pérdidas (diuresis, drenajes) ni otros aportes; controlar natremia seriada.' };
    },
    ref: AM_REF, url: 'https://doi.org/10.1056/NEJM200005253422107', verif: '2026-10',
    pop: 'Adultos y niños con disnatremias.',
    lim: 'Supone un sistema cerrado: subestima o sobreestima el cambio real si hay diuresis acuosa (p. ej., al corregir hipovolemia, suspender desmopresina o tiazidas), con riesgo de sobrecorrección y desmielinización osmótica. Es una estimación para planificar, no un reemplazo del control frecuente del Na⁺.',
    tests: [{ v: { sol: '513', na: 110, peso: 60, act: '0.5' }, r: 13 }, { v: { sol: '154', na: 120, peso: 70, act: '0.6' }, r: 0.8, tol: 0.05 }, { v: { sol: 'otro', otro: 200, kadd: 20, na: 125, peso: 50, act: '0.45' }, r: 4.0 }]
  },
  {
    id: 'deficit-sodio', m: 'f', cat: 'medio-interno', tags: [],
    n: 'Déficit de sodio en hiponatremia', sig: '', syn: ['deficit de na', 'hiponatremia'],
    tipo: 'estimación',
    fin: 'Estima la cantidad de sodio que separa la natremia actual de un valor objetivo.',
    ver: 'Fórmula basada en el agua corporal total',
    formula: 'Déficit de Na⁺ (mEq) = ACT × (Na⁺ objetivo − Na⁺ actual)\nACT = peso × fracción de agua corporal',
    in: [num('na', 'Na⁺ actual', 'mEq/L', 90, 145), num('obj', 'Na⁺ objetivo', 'mEq/L', 100, 145), PESO(), TBWF],
    calc: v => { if (v.obj <= v.na) return { r: '—', lab: 'Déficit de Na⁺', interp: 'El objetivo debe ser mayor que la natremia actual' }; const act = v.peso * +v.act; const d = act * (v.obj - v.na); return { r: rd(d, 0), u: 'mEq', d: 0, lab: 'Déficit de Na⁺', more: [['Agua corporal total', fm(act, 1) + ' L'], ['Equivale a NaCl 3 % (513 mEq/L)', fm(d / 513 * 1000, 0) + ' mL'], ['Ascenso planteado', fm(v.obj - v.na, 1) + ' mEq/L']], note: 'El objetivo y la velocidad de corrección son decisiones clínicas aparte; respetar los límites de corrección diaria.' }; },
    ref: AM_REF, url: 'https://doi.org/10.1056/NEJM200005253422107', verif: '2026-10',
    pop: 'Hiponatremia en adultos.',
    lim: 'Supone un sistema cerrado y no considera pérdidas de agua o sodio en curso. No indica la velocidad segura de corrección. Preferir la fórmula de Adrogué–Madias para planificar por litro y controlar natremia seriada.',
    tests: [{ v: { na: 120, obj: 130, peso: 60, act: '0.5' }, r: 300 }, { v: { na: 115, obj: 121, peso: 80, act: '0.6' }, r: 288 }]
  },
  {
    id: 'deficit-agua-libre', m: 'f', cat: 'medio-interno', tags: ['f:neuro'],
    n: 'Déficit de agua libre en hipernatremia', sig: 'DAL', syn: ['agua libre', 'hipernatremia', 'deficit de agua'],
    tipo: 'estimación',
    fin: 'Estima el volumen de agua libre necesario para llevar la natremia al valor objetivo.',
    ver: 'Fórmula basada en el agua corporal total',
    formula: 'Déficit de agua libre (L) = ACT × (Na⁺ actual / Na⁺ objetivo − 1)\nACT = peso × fracción de agua corporal',
    in: [num('na', 'Na⁺ actual', 'mEq/L', 141, 200), num('obj', 'Na⁺ objetivo (vacío = 140)', 'mEq/L', 130, 150, { req: 0 }), PESO(), TBWF],
    calc: v => { const o = v.obj ?? 140; if (v.na <= o) return { r: '—', lab: 'Déficit de agua libre', interp: 'La natremia actual no supera el objetivo' }; const act = v.peso * +v.act; const d = act * (v.na / o - 1); return { r: rd(d, 1), u: 'L', d: 1, lab: 'Déficit de agua libre', more: [['Agua corporal total', fm(act, 1) + ' L'], ['Na⁺ objetivo usado', fm(o, 0) + ' mEq/L']], note: 'No incluye pérdidas en curso (insensibles, diuresis, digestivas).' }; },
    ref: AM_REF, url: 'https://doi.org/10.1056/NEJM200005183422006', verif: '2026-10',
    pop: 'Hipernatremia en adultos.',
    lim: 'Supone un sistema cerrado y no contempla pérdidas en curso, que hay que sumar. En la hipernatremia, la ACT real suele ser menor que la estimada por fracciones estándar. No define la velocidad de corrección.',
    tests: [{ v: { na: 160, peso: 70, act: '0.6' }, r: 6 }, { v: { na: 155, obj: 145, peso: 60, act: '0.45' }, r: 1.9, tol: 0.05 }]
  },
  {
    id: 'anion-gap-urinario', m: 'f', cat: 'medio-interno', tags: ['f:acido-base', 'f:nefrologia'],
    n: 'Anion gap urinario', sig: 'AGu', syn: ['brecha anionica urinaria', 'acidosis tubular renal', 'amonio urinario'],
    tipo: 'cálculo',
    fin: 'Estima indirectamente la excreción urinaria de amonio en la acidosis metabólica hiperclorémica (AG plasmático normal).',
    ver: 'Batlle 1988',
    formula: 'AG urinario = Na⁺u + K⁺u − Cl⁻u',
    in: [num('una', 'Na⁺ urinario', 'mEq/L', 0, 400), num('uk', 'K⁺ urinario', 'mEq/L', 0, 400), num('ucl', 'Cl⁻ urinario', 'mEq/L', 0, 400)],
    calc: v => { const g = v.una + v.uk - v.ucl; return { r: rd(g, 0), u: 'mEq/L', d: 0, lab: 'AG urinario', interp: g < 0 ? 'Negativo: compatible con excreción de amonio conservada (p. ej., pérdida digestiva de bicarbonato)' : g > 0 ? 'Positivo: sugiere excreción renal de amonio disminuida (p. ej., acidosis tubular renal distal)' : 'Cero: no discriminativo', lvl: '' }; },
    ref: 'Batlle DC, Hizon M, Cohen E, Gutterman C, Gupta R. The use of the urinary anion gap in the diagnosis of hyperchloremic metabolic acidosis. N Engl J Med. 1988;318:594–599.',
    url: 'https://doi.org/10.1056/NEJM198803103181002', verif: '2026-10',
    pop: 'Acidosis metabólica hiperclorémica (AG plasmático normal).',
    lim: 'No es válido si hay aniones no medidos en orina (cetoaniones, hipurato por tolueno, D-lactato, penicilinas), si el Na⁺ urinario es < 20–25 mEq/L (hipovolemia) o en poliuria. Es un estimador indirecto: el amonio urinario medido o el gap osmolar urinario son más precisos.',
    tests: [{ v: { una: 40, uk: 30, ucl: 90 }, r: -20 }, { v: { una: 60, uk: 30, ucl: 70 }, r: 20 }]
  },

  // =====================================================================
  // FLUIDOS
  // =====================================================================
  {
    id: 'mantenimiento-adultos', m: 'f', cat: 'fluidos', tags: [],
    n: 'Mantenimiento de fluidos en adultos', sig: '', syn: ['holliday segar', '4-2-1', 'nice cg174', 'hidratacion de mantenimiento', 'plan de hidratacion'],
    tipo: 'cálculo',
    fin: 'Estima el requerimiento diario de agua de mantenimiento según el método elegido.',
    ver: 'NICE CG174 (25–30 mL/kg/día; 20–25 en poblaciones de riesgo) · Holliday–Segar · regla 4-2-1',
    formula: 'NICE CG174: 25–30 mL/kg/día (considerar 20–25 en ancianos/frágiles, insuficiencia renal o cardíaca, desnutrición o riesgo de realimentación)\nHolliday–Segar: 100 mL/kg (primeros 10 kg) + 50 mL/kg (10–20 kg) + 20 mL/kg (> 20 kg) por día\n4-2-1: 4 mL/kg/h (primeros 10 kg) + 2 mL/kg/h (10–20 kg) + 1 mL/kg/h (> 20 kg)',
    in: [{ t: 'sel', id: 'met', l: 'Método', o: [['n25', 'NICE CG174: 25 mL/kg/día'], ['n30', 'NICE CG174: 30 mL/kg/día'], ['n20', 'NICE CG174 poblaciones de riesgo: 20 mL/kg/día'], ['hs', 'Holliday–Segar (100/50/20 mL/kg/día)'], ['421', 'Regla 4-2-1 (mL/kg/h)']] }, PESO()],
    calc: v => {
      const p = v.peso; let d, nom;
      if (v.met == 'hs') { d = p <= 10 ? 100 * p : p <= 20 ? 1000 + 50 * (p - 10) : 1500 + 20 * (p - 20); nom = 'Holliday–Segar'; }
      else if (v.met == '421') { d = 24 * (p <= 10 ? 4 * p : p <= 20 ? 40 + 2 * (p - 10) : 60 + (p - 20)); nom = 'Regla 4-2-1'; }
      else { const k = { n25: 25, n30: 30, n20: 20 }[v.met]; d = k * p; nom = 'NICE CG174 ' + k + ' mL/kg/día'; }
      const more = [['Por hora', fm(d / 24, 0) + ' mL/h'], ['Método', nom]];
      if (v.met.startsWith('n')) more.push(['Electrolitos y glucosa NICE (aprox.)', 'Na⁺, K⁺ y Cl⁻ ~1 mmol/kg/día c/u; glucosa 50–100 g/día']);
      let note = 'Requerimiento de mantenimiento: no incluye déficit previo ni pérdidas en curso.';
      if (v.met == 'hs' || v.met == '421') note += ' Holliday–Segar y 4-2-1 se derivaron en pediatría; en adultos tienden a dar volúmenes mayores que la recomendación NICE.';
      if (p > 100) note += ' En obesidad, NICE sugiere usar el peso ideal para el cálculo.';
      return { r: rd(d, 0), u: 'mL/día', d: 0, lab: 'Agua de mantenimiento', more, note };
    },
    ref: 'National Institute for Health and Care Excellence. Intravenous fluid therapy in adults in hospital (CG174). 2013, actualizada 2017. Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. 1957;19:823–832.',
    url: 'https://www.nice.org.uk/guidance/cg174', verif: '2026-10',
    pop: 'NICE: adultos internados. Holliday–Segar / 4-2-1: niños (extrapolado a adultos).',
    lim: 'Es un punto de partida, no una indicación. Reevaluar con clínica, balance, natremia y función renal. En insuficiencia cardíaca o renal, ancianos frágiles, desnutrición o riesgo de síndrome de realimentación, NICE sugiere 20–25 mL/kg/día. En neurocríticos, el tipo de solución (evitar hipotónicas) importa tanto como el volumen.',
    tests: [{ v: { met: 'n25', peso: 70 }, r: 1750 }, { v: { met: 'hs', peso: 70 }, r: 2500 }, { v: { met: '421', peso: 70 }, r: 2640 }]
  },
  {
    id: 'velocidad-infusion-mlh', m: 'f', cat: 'fluidos', tags: [],
    n: 'Velocidad de infusión (mL/h)', sig: '', syn: ['ml por hora', 'bomba de infusion', 'goteo por hora'],
    tipo: 'cálculo',
    fin: 'Calcula la velocidad en mL/h para pasar un volumen en un tiempo dado.',
    ver: 'Cálculo aritmético',
    formula: 'Velocidad (mL/h) = volumen (mL) / tiempo (h)',
    in: [num('vol', 'Volumen', 'mL', 1, 20000), num('h', 'Tiempo', 'h', 0.05, 72, { step: 0.05 })],
    calc: v => ({ r: rd(v.vol / v.h, 1), u: 'mL/h', d: 1, lab: 'Velocidad', more: [['Por minuto', fm(v.vol / v.h / 60, 2) + ' mL/min']] }),
    ref: 'Cálculo aritmético (volumen / tiempo).', verif: '2026-10',
    pop: 'General.', lim: 'Verificar la programación de la bomba y la compatibilidad de la solución.',
    tests: [{ v: { vol: 1000, h: 8 }, r: 125 }, { v: { vol: 500, h: 0.5 }, r: 1000 }]
  },
  {
    id: 'goteo', m: 'f', cat: 'fluidos', tags: [],
    n: 'Goteo (gotas/min)', sig: '', syn: ['macrogotero', 'microgotero', 'gotas por minuto', 'factor de goteo'],
    tipo: 'cálculo',
    fin: 'Calcula las gotas por minuto para pasar un volumen en un tiempo dado según el factor de goteo del equipo.',
    ver: 'Cálculo aritmético',
    formula: 'Gotas/min = volumen (mL) × factor de goteo (gotas/mL) / tiempo (min)\nMacrogotero habitual 20 gotas/mL; microgotero 60 gotas/mL (gotas/min = mL/h)',
    in: [num('vol', 'Volumen', 'mL', 1, 20000), num('h', 'Tiempo', 'h', 0.05, 72, { step: 0.05 }), { t: 'sel', id: 'fg', l: 'Factor de goteo del equipo', o: [['20', 'Macrogotero 20 gotas/mL'], ['60', 'Microgotero 60 gotas/mL'], ['15', 'Macrogotero 15 gotas/mL'], ['10', 'Macrogotero 10 gotas/mL']] }],
    calc: v => { const g = v.vol * +v.fg / (v.h * 60); return { r: rd(g, 0), u: 'gotas/min', d: 0, lab: 'Goteo', more: [['Velocidad equivalente', fm(v.vol / v.h, 1) + ' mL/h'], ['Factor usado', v.fg + ' gotas/mL']] }; },
    ref: 'Cálculo aritmético; factor de goteo según el fabricante del equipo.', verif: '2026-10',
    pop: 'General.', lim: 'Confirmar el factor de goteo impreso en el envase del equipo. El goteo por gravedad es impreciso: para fármacos críticos usar bomba.',
    tests: [{ v: { vol: 1000, h: 8, fg: '20' }, r: 42 }, { v: { vol: 500, h: 24, fg: '60' }, r: 21 }]
  },
  {
    id: 'balance-acumulado', m: 'f', cat: 'fluidos', tags: ['f:nefrologia'],
    n: 'Balance hídrico acumulado', sig: '', syn: ['balance de fluidos', 'ingresos egresos', 'balance positivo'],
    tipo: 'cálculo',
    fin: 'Suma los balances diarios (ingresos − egresos) para obtener el balance acumulado.',
    ver: 'Cálculo aritmético, hasta 5 períodos',
    formula: 'Balance de cada período = ingresos − egresos\nBalance acumulado = Σ balances',
    in: [
      { t: 'head', l: 'Período 1' }, num('i1', 'Ingresos período 1', 'mL', 0, 50000), num('e1', 'Egresos período 1', 'mL', 0, 50000),
      { t: 'head', l: 'Períodos siguientes (opcionales)' },
      num('i2', 'Ingresos período 2', 'mL', 0, 50000, { req: 0 }), num('e2', 'Egresos período 2', 'mL', 0, 50000, { req: 0 }),
      num('i3', 'Ingresos período 3', 'mL', 0, 50000, { req: 0 }), num('e3', 'Egresos período 3', 'mL', 0, 50000, { req: 0 }),
      num('i4', 'Ingresos período 4', 'mL', 0, 50000, { req: 0 }), num('e4', 'Egresos período 4', 'mL', 0, 50000, { req: 0 }),
      num('i5', 'Ingresos período 5', 'mL', 0, 50000, { req: 0 }), num('e5', 'Egresos período 5', 'mL', 0, 50000, { req: 0 })
    ],
    calc: v => {
      let t = 0; const more = []; let inc = 0;
      for (let k = 1; k <= 5; k++) { const i = v['i' + k], e = v['e' + k]; if (i == null && e == null) continue; if (i == null || e == null) { inc++; continue; } const b = i - e; t += b; more.push(['Período ' + k, (b > 0 ? '+' : '') + fm(b, 0) + ' mL']); }
      return { r: rd(t, 0), u: 'mL', d: 0, lab: 'Balance acumulado', more, note: inc ? 'Hay ' + inc + ' período(s) con solo ingresos o solo egresos: no se sumaron.' : 'Las pérdidas insensibles solo se incluyen si se cargaron en egresos.' };
    },
    ref: 'Cálculo aritmético (ingresos − egresos).', verif: '2026-10',
    pop: 'Pacientes internados.', lim: 'Depende de la exactitud del registro. Las pérdidas insensibles (≈ 0,5–1 mL/kg/h, más con fiebre o ARM sin humidificación) suelen no registrarse.',
    tests: [{ v: { i1: 2500, e1: 2000, i2: 3000, e2: 1800 }, r: 1700 }, { v: { i1: 1500, e1: 2200 }, r: -700 }]
  },
  {
    id: 'sobrecarga-hidrica', m: 'f', cat: 'fluidos', tags: ['f:nefrologia', 'f:pediatria'],
    n: 'Porcentaje de sobrecarga hídrica', sig: '%FO', syn: ['fluid overload', 'sobrecarga de volumen', 'goldstein'],
    tipo: 'índice',
    fin: 'Expresa el balance acumulado como porcentaje del peso basal.',
    ver: 'Goldstein 2001',
    formula: '% sobrecarga = (ingresos − egresos [L]) / peso basal [kg] × 100',
    in: [num('ing', 'Ingresos acumulados', 'mL', 0, 100000), num('egr', 'Egresos acumulados', 'mL', 0, 100000), PESO('peso', 'Peso basal (al ingreso)')],
    calc: v => { const p = (v.ing - v.egr) / 1000 / v.peso * 100; return { r: rd(p, 1), u: '%', d: 1, lab: 'Sobrecarga hídrica', interp: p >= 10 ? '≥ 10 %: umbral asociado a mayor mortalidad en estudios observacionales' : '', lvl: p >= 10 ? 'warn' : '', more: [['Balance', fm(v.ing - v.egr, 0) + ' mL']] }; },
    ref: 'Goldstein SL, Currier H, Graf JM, Cosio CC, Brewer ED, Sachdeva R. Outcome in children receiving continuous venovenous hemofiltration. Pediatrics. 2001;107:1309–1312. Bouchard J, Soroko SB, Chertow GM, et al. Fluid accumulation, survival and recovery of kidney function in critically ill patients with acute kidney injury. Kidney Int. 2009;76:422–427.',
    url: 'https://doi.org/10.1542/peds.107.6.1309', verif: '2026-10',
    pop: 'Niños en hemofiltración (Goldstein); adultos críticos con IRA (Bouchard).',
    lim: 'Asociación observacional, no umbral terapéutico. Depende de la calidad del registro y no incluye pérdidas insensibles salvo que se registren.',
    tests: [{ v: { ing: 10000, egr: 6000, peso: 40 }, r: 10 }, { v: { ing: 8000, egr: 6600, peso: 70 }, r: 2 }]
  },
  {
    id: 'parkland', m: 'f', cat: 'fluidos', tags: [],
    n: 'Fórmula de Parkland (reanimación en quemados)', sig: '', syn: ['quemados', 'baxter', 'reanimacion quemaduras', 'superficie corporal quemada'],
    tipo: 'cálculo',
    fin: 'Estima el volumen de cristaloides para las primeras 24 h tras una quemadura extensa.',
    ver: 'Parkland (Baxter) 4 mL/kg/%SCQ; consenso ABA 2–4 mL/kg/%SCQ (seleccionable)',
    formula: 'Volumen 24 h = factor (mL) × peso (kg) × % SCQ (2.º y 3.er grado)\nMitad en las primeras 8 h desde la quemadura, mitad en las 16 h siguientes',
    in: [{ t: 'sel', id: 'f', l: 'Factor', o: [['4', 'Parkland clásico: 4 mL/kg/%SCQ'], ['2', 'Extremo inferior del consenso ABA: 2 mL/kg/%SCQ'], ['3', 'Intermedio: 3 mL/kg/%SCQ']] }, PESO(), num('scq', 'Superficie corporal quemada (2.º y 3.er grado)', '%', 1, 100)],
    calc: v => { const t = +v.f * v.peso * v.scq; return { r: rd(t, 0), u: 'mL en 24 h', d: 0, lab: 'Volumen estimado', more: [['Primeras 8 h', fm(t / 2, 0) + ' mL (' + fm(t / 16, 0) + ' mL/h)'], ['16 h siguientes', fm(t / 2, 0) + ' mL (' + fm(t / 32, 0) + ' mL/h)'], ['Factor usado', v.f + ' mL/kg/%SCQ']], note: v.scq < 20 ? 'Las fórmulas de reanimación se aplican habitualmente a quemaduras ≥ 20 % SCQ en adultos.' : 'Las 8 h se cuentan desde el momento de la quemadura, no desde el ingreso.' }; },
    ref: 'Baxter CR, Shires T. Physiological response to crystalloid resuscitation of severe burns. Ann N Y Acad Sci. 1968;150:874–894. Pham TN, Cancio LC, Gibran NS. American Burn Association practice guidelines burn shock resuscitation. J Burn Care Res. 2008;29:257–266.',
    url: 'https://doi.org/10.1097/BCR.0b013e31815f3876', verif: '2026-10',
    pop: 'Adultos con quemaduras ≥ 20 % SCQ.',
    lim: 'Solo estima el volumen inicial: se titula según diuresis horaria y clínica. Tiende a sobrestimar o subestimar en lesión inhalatoria, eléctricas, retraso en la reanimación, obesidad y niños (en estos se suma mantenimiento). Seguir el protocolo del centro de quemados.',
    tests: [{ v: { f: '4', peso: 70, scq: 30 }, r: 8400 }, { v: { f: '2', peso: 80, scq: 40 }, r: 6400 }]
  },
  {
    id: 'tasa-ultrafiltracion', m: 'f', cat: 'fluidos', tags: ['f:nefrologia', 's:nefrologia'],
    n: 'Tasa de ultrafiltración (mL/kg/h)', sig: 'UFR', syn: ['ultrafiltracion', 'hemodialisis', 'uf'],
    tipo: 'cálculo',
    fin: 'Calcula la tasa de ultrafiltración de una sesión de diálisis normalizada por peso.',
    ver: 'Cálculo aritmético; umbral de Flythe 2011',
    formula: 'UFR = volumen ultrafiltrado (mL) / [peso (kg) × duración (h)]',
    in: [num('uf', 'Volumen ultrafiltrado', 'mL', 1, 15000), PESO('peso', 'Peso (posdiálisis / seco)'), num('h', 'Duración de la sesión', 'h', 0.5, 24, { step: 0.25 })],
    calc: v => { const r = v.uf / (v.peso * v.h); return { r: rd(r, 1), u: 'mL/kg/h', d: 1, lab: 'Tasa de ultrafiltración', interp: r > 13 ? '> 13 mL/kg/h: asociada a mayor morbimortalidad cardiovascular (Flythe 2011)' : '≤ 13 mL/kg/h', lvl: r > 13 ? 'warn' : '', more: [['mL/h', fm(v.uf / v.h, 0)]] }; },
    ref: 'Flythe JE, Kimmel SE, Brunelli SM. Rapid fluid removal during dialysis is associated with cardiovascular morbidity and mortality. Kidney Int. 2011;79:250–257.',
    url: 'https://doi.org/10.1038/ki.2010.383', verif: '2026-10',
    pop: 'Pacientes en hemodiálisis crónica tres veces por semana.',
    lim: 'Umbral derivado de un estudio observacional en hemodiálisis crónica; otros trabajos encontraron riesgo desde ~10 mL/kg/h. No aplica directamente a terapias continuas en críticos.',
    tests: [{ v: { uf: 3000, peso: 70, h: 4 }, r: 10.7 }, { v: { uf: 4000, peso: 60, h: 4 }, r: 16.7 }]
  },
  {
    id: 'volumen-tiempo-velocidad', m: 'f', cat: 'fluidos', tags: ['f:farmacos'],
    n: 'Conversión volumen / tiempo / velocidad', sig: '', syn: ['cuanto tarda', 'tiempo de infusion', 'volumen infundido'],
    tipo: 'conversión',
    fin: 'Despeja cualquiera de las tres variables (volumen, tiempo o velocidad) a partir de las otras dos.',
    ver: 'Cálculo aritmético',
    formula: 'Velocidad (mL/h) = volumen / tiempo\nTiempo (h) = volumen / velocidad\nVolumen (mL) = velocidad × tiempo',
    in: [{ t: 'sel', id: 'que', l: 'Calcular', o: [['vel', 'Velocidad'], ['t', 'Tiempo'], ['vol', 'Volumen']] }, num('vol', 'Volumen', 'mL', 0.1, 50000, { req: 0 }), num('t', 'Tiempo', 'h', 0.01, 240, { req: 0, step: 0.01 }), num('vel', 'Velocidad', 'mL/h', 0.1, 5000, { req: 0 })],
    calc: v => {
      if (v.que == 'vel') { if (v.vol == null || v.t == null) return null; return { r: rd(v.vol / v.t, 1), u: 'mL/h', d: 1, lab: 'Velocidad' }; }
      if (v.que == 't') { if (v.vol == null || v.vel == null) return null; const h = v.vol / v.vel; return { r: rd(h, 2), u: 'h', d: 2, lab: 'Tiempo', more: [['En horas y minutos', Math.floor(h) + ' h ' + Math.round((h % 1) * 60) + ' min']] }; }
      if (v.vel == null || v.t == null) return null; return { r: rd(v.vel * v.t, 0), u: 'mL', d: 0, lab: 'Volumen' };
    },
    ref: 'Cálculo aritmético.', verif: '2026-10',
    pop: 'General.', lim: 'Completar las dos variables que corresponden a lo que se quiere calcular.',
    tests: [{ v: { que: 'vel', vol: 500, t: 4 }, r: 125 }, { v: { que: 't', vol: 1000, vel: 80 }, r: 12.5 }, { v: { que: 'vol', vel: 21, t: 24 }, r: 504 }]
  },

  // =====================================================================
  // FÁRMACOS
  // =====================================================================
  {
    id: 'dosis-peso', m: 'f', cat: 'farmacos', tags: ['f:pediatria', 'f:neuro'],
    n: 'Dosis por peso (mg/kg, mcg/kg)', sig: '', syn: ['dosis por kilo', 'mg/kg', 'mcg/kg'],
    tipo: 'dosificación',
    fin: 'Calcula la dosis total a partir de una dosis por kilo indicada por la ficha técnica o el protocolo.',
    ver: 'Cálculo aritmético',
    formula: 'Dosis total = dosis por kg × peso',
    in: [num('d', 'Dosis por kg', '', 0.0001, 100000, { step: 0.001 }), { t: 'sel', id: 'u', l: 'Unidad', o: [['mg', 'mg/kg'], ['mcg', 'mcg/kg'], ['UI', 'UI/kg'], ['mEq', 'mEq/kg']] }, PESO(), num('max', 'Dosis máxima de la ficha (opcional, misma unidad)', '', 0.0001, 1e7, { req: 0, step: 0.001 })],
    calc: v => { const t = v.d * v.peso; const o = { r: rd(t, 3), u: v.u, d: 2, lab: 'Dosis total' }; if (v.max != null && t > v.max) Object.assign(o, { interp: 'Supera la dosis máxima ingresada (' + fm(v.max, 3) + ' ' + v.u + ')', lvl: 'bad' }); if (v.u == 'mcg' && t >= 1000) o.more = [['En mg', fm(t / 1000, 3)]]; return o; },
    ref: 'Cálculo aritmético; la dosis por kg proviene de la ficha técnica del producto o del protocolo institucional.', verif: '2026-10',
    pop: 'General.', lim: 'Verificar qué peso indica la ficha (real, ideal, ajustado o magro), sobre todo en obesidad, y respetar dosis máximas. No reemplaza la ficha técnica.',
    tests: [{ v: { d: 15, u: 'mg', peso: 20 }, r: 300 }, { v: { d: 1, u: 'mcg', peso: 70, max: 50 }, r: 70 }]
  },
  {
    id: 'dosis-superficie', m: 'f', cat: 'farmacos', tags: ['f:pediatria'],
    n: 'Dosis por superficie corporal (mg/m²)', sig: '', syn: ['mg/m2', 'quimioterapia', 'superficie corporal'],
    tipo: 'dosificación',
    fin: 'Calcula la dosis total a partir de una dosis por m² de superficie corporal.',
    ver: 'Superficie corporal ingresada o calculada por Mosteller',
    formula: 'Dosis total = dosis (por m²) × SC\nSC (Mosteller) = √(talla [cm] × peso [kg] / 3600)',
    in: [num('d', 'Dosis por m²', 'mg/m²', 0.0001, 100000, { step: 0.001 }), num('sc', 'Superficie corporal (si se conoce)', 'm²', 0.1, 4, { step: 0.01, req: 0 }), PESO('peso', 'Peso (si no se ingresa SC)'), TALLA('talla', 'Talla (si no se ingresa SC)', { req: 0 })].map(i => (i.id == 'peso' ? { ...i, req: 0 } : i)),
    calc: v => { let sc = v.sc, met = 'ingresada'; if (sc == null) { if (v.peso == null || v.talla == null) return null; sc = mosteller(v.peso, v.talla); met = 'Mosteller'; } return { r: rd(v.d * sc, 2), u: 'mg', d: 1, lab: 'Dosis total', more: [['Superficie corporal', fm(sc, 2) + ' m² (' + met + ')']] }; },
    ref: 'Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317:1098.',
    url: 'https://doi.org/10.1056/NEJM198710223171717', verif: '2026-10',
    pop: 'General (oncología, pediatría).', lim: 'Confirmar en el protocolo qué fórmula de SC usa y si hay tope de SC (p. ej., 2 m²) o ajuste en obesidad. La unidad de salida es la misma que la de la dosis por m² (mg u otra).',
    tests: [{ v: { d: 100, peso: 70, talla: 170 }, r: 181.8 }, { v: { d: 75, sc: 1.9 }, r: 142.5 }]
  },
  {
    id: 'dosis-a-volumen', m: 'f', cat: 'farmacos', tags: ['f:pediatria'],
    n: 'Conversión de dosis a volumen según concentración', sig: '', syn: ['cuantos ml', 'volumen a cargar', 'concentracion'],
    tipo: 'conversión',
    fin: 'Calcula cuántos mL cargar para administrar una dosis con una presentación de concentración conocida.',
    ver: 'Cálculo aritmético',
    formula: 'Volumen (mL) = dosis / concentración\n% (p/v) = g por 100 mL (1 % = 10 mg/mL)',
    in: [num('d', 'Dosis', '', 0.0001, 1e7, { step: 0.001 }), { t: 'sel', id: 'ud', l: 'Unidad de la dosis', o: [['mg', 'mg'], ['mcg', 'mcg'], ['g', 'g'], ['UI', 'UI'], ['mEq', 'mEq']] }, num('c', 'Concentración', '', 0.0001, 1e7, { step: 0.001 }), { t: 'sel', id: 'uc', l: 'Unidad de la concentración', o: [['mg', 'mg/mL'], ['mcg', 'mcg/mL'], ['g', 'g/mL'], ['pct', '% (g/100 mL)'], ['UI', 'UI/mL'], ['mEq', 'mEq/mL']] }],
    calc: v => {
      const mass = { g: 1000, mg: 1, mcg: 0.001 }; const cm = { g: 1000, mg: 1, mcg: 0.001, pct: 10 };
      let vol;
      if (v.ud in mass && v.uc in cm) vol = v.d * mass[v.ud] / (v.c * cm[v.uc]);
      else if (v.ud == v.uc) vol = v.d / v.c;
      else return { r: 'Unidades incompatibles', lab: 'Volumen', interp: 'La dosis y la concentración deben expresarse en unidades compatibles (masa con masa, UI con UI, mEq con mEq)', lvl: 'bad' };
      return { r: rd(vol, 2), u: 'mL', d: 2, lab: 'Volumen a administrar' };
    },
    ref: 'Cálculo aritmético; la concentración figura en el rótulo del producto.', verif: '2026-10',
    pop: 'General.', lim: 'Verificar la concentración en el rótulo (algunas presentaciones expresan sal y no base). Doble control para fármacos de alto riesgo.',
    tests: [{ v: { d: 500, ud: 'mg', c: 100, uc: 'mg' }, r: 5 }, { v: { d: 2, ud: 'g', c: 10, uc: 'pct' }, r: 20 }, { v: { d: 5000, ud: 'UI', c: 5000, uc: 'UI' }, r: 1 }]
  },
  {
    id: 'velocidad-infusion-dosis', m: 'f', cat: 'farmacos', tags: ['f:neuro', 'f:fluidos'],
    n: 'Velocidad de infusión según dosis, concentración y peso', sig: '', syn: ['bomba', 'mcg/kg/min', 'ml/h', 'infusion continua', 'noradrenalina', 'goteo de farmaco'],
    tipo: 'dosificación',
    fin: 'Convierte una dosis de infusión continua (p. ej., mcg/kg/min) en velocidad de bomba (mL/h) según la preparación.',
    ver: 'Cálculo aritmético',
    formula: 'Concentración = cantidad de fármaco / volumen de la preparación\nmL/h = dosis × [peso si es por kg] × [60 si es por minuto] / concentración (en unidades compatibles)',
    in: [
      num('d', 'Dosis', '', 0.0001, 1e6, { step: 0.001 }),
      { t: 'sel', id: 'ud', l: 'Unidad de la dosis', o: [['mcg/kg/min', 'mcg/kg/min'], ['mcg/min', 'mcg/min'], ['mcg/kg/h', 'mcg/kg/h'], ['mg/kg/h', 'mg/kg/h'], ['mg/h', 'mg/h'], ['mg/min', 'mg/min'], ['UI/kg/h', 'UI/kg/h'], ['UI/h', 'UI/h'], ['UI/min', 'UI/min']] },
      num('cant', 'Cantidad de fármaco en la preparación', '', 0.0001, 1e7, { step: 0.001 }),
      { t: 'sel', id: 'uc', l: 'Unidad de esa cantidad', o: [['mg', 'mg'], ['mcg', 'mcg'], ['g', 'g'], ['UI', 'UI']] },
      num('vol', 'Volumen total de la preparación', 'mL', 1, 5000),
      PESO('peso', 'Peso (si la dosis es por kg)')
    ].map(i => (i.id == 'peso' ? { ...i, req: 0 } : i)),
    calc: v => {
      const [du, ...rest] = v.ud.split('/'); const perKg = rest.includes('kg'), perMin = rest.includes('min');
      if (perKg && v.peso == null) return null;
      const toMcg = { g: 1e6, mg: 1000, mcg: 1 };
      let rate, conc, cu;
      if (du == 'UI' || v.uc == 'UI') { if (du != v.uc) return { r: 'Unidades incompatibles', lab: 'Velocidad', interp: 'Dosis y preparación deben estar ambas en UI o ambas en masa', lvl: 'bad' }; conc = v.cant / v.vol; rate = v.d; cu = 'UI/mL'; }
      else { conc = v.cant * toMcg[v.uc] / v.vol; rate = v.d * toMcg[du]; cu = 'mcg/mL'; }
      if (perKg) rate *= v.peso; if (perMin) rate *= 60;
      const mlh = rate / conc;
      return { r: rd(mlh, 2), u: 'mL/h', d: 1, lab: 'Velocidad de bomba', more: [['Concentración de la preparación', fm(conc, 3) + ' ' + cu], ['Dosis horaria total', fm(rate, 2) + (cu == 'UI/mL' ? ' UI/h' : ' mcg/h')]] };
    },
    ref: 'Cálculo aritmético de concentraciones y velocidades.', verif: '2026-10',
    pop: 'General (UTI, quirófano, unidad coronaria).', lim: 'Verificar la preparación real (cantidad y volumen final, incluido el volumen del fármaco si es relevante) y las unidades de la indicación. Doble control para fármacos de alto riesgo. No reemplaza los protocolos de dilución estándar del hospital.',
    tests: [{ v: { d: 0.1, ud: 'mcg/kg/min', cant: 4, uc: 'mg', vol: 250, peso: 70 }, r: 26.25 }, { v: { d: 1000, ud: 'UI/h', cant: 25000, uc: 'UI', vol: 250 }, r: 10 }, { v: { d: 2, ud: 'mg/kg/h', cant: 1000, uc: 'mg', vol: 100, peso: 50 }, r: 10 }]
  },
  {
    id: 'diluciones', m: 'f', cat: 'farmacos', tags: [],
    n: 'Diluciones y concentración final', sig: 'C₁V₁ = C₂V₂', syn: ['dilucion', 'concentracion final', 'c1v1'],
    tipo: 'cálculo',
    fin: 'Calcula la concentración final de una dilución o el volumen de solución madre necesario para una concentración deseada.',
    ver: 'Ecuación de dilución C₁·V₁ = C₂·V₂',
    formula: 'C₁ × V₁ = C₂ × V₂\nConcentración final C₂ = C₁ × V₁ / V₂\nVolumen de solución madre V₁ = C₂ × V₂ / C₁\n(V₂ = volumen final total)',
    in: [
      { t: 'sel', id: 'que', l: 'Calcular', o: [['c2', 'Concentración final'], ['v1', 'Volumen de solución madre necesario']] },
      num('c1', 'Concentración de la solución madre (C₁)', 'unid./mL', 0.000001, 1e7, { step: 0.0001 }),
      num('v2', 'Volumen final total (V₂)', 'mL', 0.01, 10000, { step: 0.01 }),
      num('v1', 'Volumen de solución madre (V₁) — para calcular C₂', 'mL', 0.001, 10000, { req: 0, step: 0.001 }),
      num('c2', 'Concentración deseada (C₂) — para calcular V₁', 'unid./mL', 0.000001, 1e7, { req: 0, step: 0.0001 })
    ],
    calc: v => {
      if (v.que == 'c2') { if (v.v1 == null) return null; if (v.v1 > v.v2) return { r: '—', interp: 'V₁ no puede superar el volumen final', lvl: 'bad' }; return { r: rd(v.c1 * v.v1 / v.v2, 4), u: 'unid./mL (misma unidad que C₁)', d: 4, lab: 'Concentración final' }; }
      if (v.c2 == null) return null; if (v.c2 > v.c1) return { r: '—', interp: 'La concentración deseada no puede superar la de la solución madre', lvl: 'bad' };
      const v1 = v.c2 * v.v2 / v.c1; return { r: rd(v1, 3), u: 'mL', d: 2, lab: 'Volumen de solución madre', more: [['Diluyente a agregar', fm(v.v2 - v1, 2) + ' mL']] };
    },
    ref: 'Ecuación de dilución (conservación de la masa de soluto).', verif: '2026-10',
    pop: 'General.', lim: 'Usar la misma unidad de concentración en C₁ y C₂ (mg/mL, mcg/mL, UI/mL, %). Supone volúmenes aditivos.',
    tests: [{ v: { que: 'c2', c1: 1, v1: 4, v2: 250 }, r: 0.016 }, { v: { que: 'v1', c1: 50, c2: 2, v2: 100 }, r: 4 }]
  },
  {
    id: 'conversion-unidades-dosis', m: 'f', cat: 'farmacos', tags: ['f:medio-interno'],
    n: 'Conversión de unidades de dosis (g/mg/mcg, mmol/mEq)', sig: '', syn: ['meq a mg', 'mmol', 'miliequivalentes', 'cloruro de potasio', 'conversion de unidades'],
    tipo: 'conversión',
    fin: 'Convierte entre unidades de masa y, para iones y sales frecuentes, entre mg, mmol y mEq.',
    ver: 'Masas molares IUPAC; mEq = mmol × valencia',
    formula: 'mmol = mg / masa molar (g/mol)\nmEq = mmol × valencia\n1 g = 1000 mg = 10⁶ mcg = 10⁹ ng',
    in: [
      num('x', 'Cantidad', '', 0.000001, 1e9, { step: 0.0001 }),
      { t: 'sel', id: 'de', l: 'Unidad de origen', o: [['g', 'g'], ['mg', 'mg'], ['mcg', 'mcg'], ['ng', 'ng'], ['mmol', 'mmol'], ['mEq', 'mEq']] },
      { t: 'sel', id: 'a', l: 'Unidad de destino', o: [['g', 'g'], ['mg', 'mg'], ['mcg', 'mcg'], ['ng', 'ng'], ['mmol', 'mmol'], ['mEq', 'mEq']] },
      { t: 'sel', id: 'sp', l: 'Sustancia (necesaria para mmol/mEq)', o: [['', 'Ninguna (solo masa)'], ['na', 'Sodio Na⁺ (22,99 g/mol; valencia 1)'], ['k', 'Potasio K⁺ (39,10; 1)'], ['cl', 'Cloro Cl⁻ (35,45; 1)'], ['ca', 'Calcio Ca²⁺ (40,08; 2)'], ['mg', 'Magnesio Mg²⁺ (24,31; 2)'], ['hco3', 'Bicarbonato HCO₃⁻ (61,02; 1)'], ['nacl', 'Cloruro de sodio NaCl (58,44; 1)'], ['kcl', 'Cloruro de potasio KCl (74,55; 1)'], ['nahco3', 'Bicarbonato de sodio NaHCO₃ (84,01; 1)'], ['mgso4', 'Sulfato de magnesio heptahidratado MgSO₄·7H₂O (246,47; 2)'], ['cacl2', 'Cloruro de calcio dihidratado CaCl₂·2H₂O (147,01; 2)']], req: 0 }
    ],
    calc: v => {
      const SP = { na: [22.99, 1], k: [39.098, 1], cl: [35.45, 1], ca: [40.078, 2], mg: [24.305, 2], hco3: [61.017, 1], nacl: [58.44, 1], kcl: [74.55, 1], nahco3: [84.007, 1], mgso4: [246.47, 2], cacl2: [147.01, 2] };
      const M = { g: 1000, mg: 1, mcg: 1e-3, ng: 1e-6 }; const s = v.sp ? SP[v.sp] : null;
      const needs = !(v.de in M && v.a in M);
      if (needs && !s) return { r: 'Elegir una sustancia', lab: 'Conversión', interp: 'Para convertir a o desde mmol/mEq hace falta la masa molar y la valencia', lvl: 'warn' };
      let mg = v.de in M ? v.x * M[v.de] : v.de == 'mmol' ? v.x * s[0] : v.x / s[1] * s[0];
      const out = v.a in M ? mg / M[v.a] : v.a == 'mmol' ? mg / s[0] : mg / s[0] * s[1];
      const more = []; if (s) more.push(['mg', fm(mg, 3)], ['mmol', fm(mg / s[0], 3)], ['mEq', fm(mg / s[0] * s[1], 3)]);
      if (['nacl', 'kcl', 'nahco3', 'mgso4', 'cacl2'].includes(v.sp)) more.push(['Nota', 'mmol y mEq expresados del catión (1 mmol de sal = 1 mmol de catión)']);
      return { r: rd(out, 4), u: v.a, d: 3, lab: 'Resultado', more };
    },
    ref: 'Masas atómicas estándar IUPAC (Prohaska T, et al. Standard atomic weights of the elements 2021. Pure Appl Chem. 2022;94:573–600).',
    url: 'https://doi.org/10.1515/pac-2019-0603', verif: '2026-10',
    pop: 'General.', lim: 'Las sales hidratadas tienen distinta masa molar que las anhidras: confirmar en el rótulo qué forma contiene el producto. El fosfato no se incluye porque su valencia depende del pH. El gluconato de calcio no se incluye por la variabilidad de sus presentaciones (verificar el calcio elemental en el rótulo).',
    tests: [{ v: { x: 1, de: 'g', a: 'mEq', sp: 'kcl' }, r: 13.41 }, { v: { x: 500, de: 'mcg', a: 'mg', sp: '' }, r: 0.5 }, { v: { x: 2, de: 'mmol', a: 'mEq', sp: 'ca' }, r: 4 }, { v: { x: 1, de: 'g', a: 'mEq', sp: 'mgso4' }, r: 8.11 }]
  },
  {
    id: 'equivalencia-corticoides', m: 'f', cat: 'farmacos', tags: ['f:endocrino', 'f:neuro'],
    n: 'Equivalencias de corticoides', sig: '', syn: ['dexametasona', 'prednisona', 'metilprednisolona', 'hidrocortisona', 'betametasona', 'corticoides equivalentes'],
    tipo: 'conversión',
    fin: 'Convierte una dosis de un glucocorticoide sistémico a la dosis equivalente (en potencia glucocorticoidea) de otro.',
    ver: 'Tabla de Liu et al. 2013 (adaptada de NICE y Furst): dosis equivalentes en mg',
    formula: 'Dosis equivalente = dosis × (dosis equivalente del destino / dosis equivalente del origen)\nDosis equivalentes (mg): hidrocortisona 20 · cortisona 25 · prednisona 5 · prednisolona 5 · metilprednisolona 4 · triamcinolona 4 · dexametasona 0,75 · betametasona 0,6\nFludrocortisona: sin dosis glucocorticoidea equivalente (potencia mineralocorticoidea 125–150)',
    in: [
      num('d', 'Dosis', 'mg', 0.01, 5000, { step: 0.01 }),
      { t: 'sel', id: 'de', l: 'Corticoide de origen', o: [['hc', 'Hidrocortisona'], ['co', 'Cortisona'], ['pd', 'Prednisona'], ['pl', 'Prednisolona'], ['mp', 'Metilprednisolona'], ['tr', 'Triamcinolona'], ['dx', 'Dexametasona'], ['bm', 'Betametasona'], ['fl', 'Fludrocortisona']] },
      { t: 'sel', id: 'a', l: 'Corticoide de destino', o: [['hc', 'Hidrocortisona'], ['co', 'Cortisona'], ['pd', 'Prednisona'], ['pl', 'Prednisolona'], ['mp', 'Metilprednisolona'], ['tr', 'Triamcinolona'], ['dx', 'Dexametasona'], ['bm', 'Betametasona'], ['fl', 'Fludrocortisona']] }
    ],
    calc: v => {
      const E = { hc: 20, co: 25, pd: 5, pl: 5, mp: 4, tr: 4, dx: 0.75, bm: 0.6 };
      const N = { hc: 'hidrocortisona', co: 'cortisona', pd: 'prednisona', pl: 'prednisolona', mp: 'metilprednisolona', tr: 'triamcinolona', dx: 'dexametasona', bm: 'betametasona' };
      if (v.de == 'fl' || v.a == 'fl') return { r: 'No convertible', lab: 'Equivalencia', interp: 'La fludrocortisona se usa por su efecto mineralocorticoide y no tiene dosis glucocorticoidea equivalente en la tabla', lvl: 'warn', note: 'Referencia de la fuente: el efecto mineralocorticoide de 0,1 mg de fludrocortisona se aproxima al de 20 mg de hidrocortisona o 50 mg de prednisona.' };
      const r = v.d * E[v.a] / E[v.de];
      return { r: rd(r, 2), u: 'mg de ' + N[v.a], d: 2, lab: 'Dosis equivalente', more: [['Equivalencias usadas', fm(E[v.de], 2) + ' mg ' + N[v.de] + ' ≈ ' + fm(E[v.a], 2) + ' mg ' + N[v.a]]], note: 'Equivalencia solo glucocorticoidea; la actividad mineralocorticoidea y la duración de acción difieren.' };
    },
    ref: 'Liu D, Ahmet A, Ward L, et al. A practical guide to the monitoring and management of the complications of systemic corticosteroid therapy. Allergy Asthma Clin Immunol. 2013;9:30 (tabla 3, adaptada de NICE 2012 y Furst y Saag 2012).',
    url: 'https://doi.org/10.1186/1710-1492-9-30', verif: '2026-10',
    pop: 'Uso sistémico oral o intravenoso.',
    lim: 'Equivalencias aproximadas, válidas solo para vía oral/IV; la potencia por vía intramuscular, intraarticular o inhalada difiere. No considera la actividad mineralocorticoidea (hidrocortisona y cortisona la tienen; dexametasona y betametasona casi nula) ni la duración de acción (corta, intermedia, prolongada). Otras fuentes citan betametasona 0,75 mg.',
    tests: [{ v: { d: 50, de: 'pd', a: 'dx' }, r: 7.5 }, { v: { d: 100, de: 'hc', a: 'mp' }, r: 20 }, { v: { d: 16, de: 'dx', a: 'pd' }, r: 106.67 }]
  },
  {
    id: 'equivalencia-opioides', m: 'f', cat: 'farmacos', tags: [],
    n: 'Equivalencias de opioides (MME, miligramos equivalentes de morfina oral)', sig: 'MME', syn: ['morfina equivalente', 'rotacion de opioides', 'conversion opioides', 'oxicodona', 'tramadol', 'fentanilo'],
    tipo: 'conversión',
    fin: 'Calcula la dosis diaria total en miligramos equivalentes de morfina oral (MME) y, de forma orientativa, la dosis teórica de otro opioide oral con reducción por tolerancia cruzada incompleta.',
    ver: 'Factores de conversión de la guía CDC 2022',
    formula: 'MME/día = Σ (dosis diaria × factor CDC)\nFactores (mg/día VO): codeína 0,15 · tramadol 0,2 · tapentadol 0,4 · morfina 1 · hidrocodona 1 · oxicodona 1,5 · oxicodona-morfona (oximorfona) 3 · hidromorfona 5 · metadona 4,7 · fentanilo transdérmico 2,4 por mcg/h\nDosis teórica del destino = MME / factor del destino; luego reducir 25–50 %',
    in: [
      { t: 'head', l: 'Opioides actuales (dosis total diaria)' },
      { t: 'sel', id: 'o1', l: 'Opioide 1', o: [['cod', 'Codeína VO (mg/día)'], ['tra', 'Tramadol VO (mg/día)'], ['tap', 'Tapentadol VO (mg/día)'], ['mor', 'Morfina VO (mg/día)'], ['hcd', 'Hidrocodona VO (mg/día)'], ['oxy', 'Oxicodona VO (mg/día)'], ['oxm', 'Oximorfona VO (mg/día)'], ['hm', 'Hidromorfona VO (mg/día)'], ['met', 'Metadona VO (mg/día)'], ['fen', 'Fentanilo transdérmico (mcg/h)']] },
      num('d1', 'Dosis opioide 1', 'mg/día (parche: mcg/h)', 0.1, 10000, { step: 0.1 }),
      { t: 'sel', id: 'o2', l: 'Opioide 2 (opcional)', req: 0, o: [['cod', 'Codeína VO (mg/día)'], ['tra', 'Tramadol VO (mg/día)'], ['tap', 'Tapentadol VO (mg/día)'], ['mor', 'Morfina VO (mg/día)'], ['hcd', 'Hidrocodona VO (mg/día)'], ['oxy', 'Oxicodona VO (mg/día)'], ['oxm', 'Oximorfona VO (mg/día)'], ['hm', 'Hidromorfona VO (mg/día)'], ['met', 'Metadona VO (mg/día)'], ['fen', 'Fentanilo transdérmico (mcg/h)']] },
      num('d2', 'Dosis opioide 2', 'mg/día (parche: mcg/h)', 0.1, 10000, { step: 0.1, req: 0 }),
      { t: 'head', l: 'Conversión orientativa (opcional)' },
      { t: 'sel', id: 'dst', l: 'Opioide oral de destino', req: 0, o: [['cod', 'Codeína VO'], ['tra', 'Tramadol VO'], ['tap', 'Tapentadol VO'], ['mor', 'Morfina VO'], ['hcd', 'Hidrocodona VO'], ['oxy', 'Oxicodona VO'], ['oxm', 'Oximorfona VO'], ['hm', 'Hidromorfona VO'], ['met', 'Metadona VO — NO SOPORTADO'], ['fen', 'Fentanilo transdérmico — NO SOPORTADO']] }
    ],
    calc: v => {
      const F = { cod: 0.15, tra: 0.2, tap: 0.4, mor: 1, hcd: 1, oxy: 1.5, oxm: 3, hm: 5, met: 4.7, fen: 2.4 };
      const NM = { cod: 'codeína', tra: 'tramadol', tap: 'tapentadol', mor: 'morfina', hcd: 'hidrocodona', oxy: 'oxicodona', oxm: 'oximorfona', hm: 'hidromorfona', met: 'metadona', fen: 'fentanilo transdérmico' };
      const items = [[v.o1, v.d1]]; if (v.o2 && v.d2 != null) items.push([v.o2, v.d2]);
      let mme = 0; const more = []; for (const [o, d] of items) { const x = d * F[o]; mme += x; more.push([NM[o] + ' ' + fm(d, 1) + (o == 'fen' ? ' mcg/h' : ' mg/día'), fm(x, 1) + ' MME (factor ' + fm(F[o], 2) + ')']); }
      const notes = ['Los factores CDC estiman MME para evaluar riesgo; la propia CDC advierte que no son una tabla de rotación. Tolerancia cruzada incompleta: si se rota, reducir 25–50 % la dosis teórica y titular con rescates y monitoreo.'];
      if (items.some(([o]) => o == 'met')) notes.push('Metadona: el factor 4,7 solo sirve para estimar MME; su equivalencia real es no lineal y dependiente de la dosis. La rotación hacia o desde metadona NO está soportada.');
      if (items.some(([o]) => o == 'fen')) notes.push('Fentanilo transdérmico: el parche tarda 12–24 h en alcanzar niveles y persiste tras retirarlo; no está pensado para convertir dosis.');
      if (v.dst) {
        if (v.dst == 'met' || v.dst == 'fen') more.push(['Conversión al destino', 'No soportada (' + NM[v.dst] + '): requiere protocolo específico y experiencia']);
        else if (items.some(([o]) => o == 'met')) more.push(['Conversión al destino', 'No soportada cuando el origen incluye metadona']);
        else { const t = mme / F[v.dst]; more.push(['Dosis teórica de ' + NM[v.dst], fm(t, 1) + ' mg/día (sin reducir)'], ['Con reducción del 25–50 %', fm(t * 0.5, 1) + ' a ' + fm(t * 0.75, 1) + ' mg/día']); }
      }
      return { r: rd(mme, 1), u: 'MME/día', d: 1, lab: 'Dosis diaria en equivalentes de morfina oral', more, note: notes.join(' '), lvl: mme >= 50 ? 'warn' : '', interp: mme >= 50 ? 'CDC 2022: con ≥ 50 MME/día aumenta el riesgo sin beneficio adicional esperable para la mayoría de los pacientes; reevaluar riesgo-beneficio' : '' };
    },
    ref: 'Dowell D, Ragan KR, Jones CM, Baldwin GT, Chou R. CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022. MMWR Recomm Rep. 2022;71(No. RR-3):1–95 (tabla de factores de conversión MME).',
    url: 'https://doi.org/10.15585/mmwr.rr7103a1', verif: '2026-10',
    pop: 'Adultos ambulatorios con dolor (excluye cáncer activo, cuidados paliativos y fin de vida, y anemia falciforme según la guía).',
    lim: 'ADVERTENCIA: herramienta de estimación, no de prescripción. Tolerancia cruzada incompleta: reducir 25–50 % al rotar y titular. Solo vía oral (y fentanilo transdérmico como origen); no incluye vías parenterales, buprenorfina ni fentanilo transmucoso. Metadona: no soportada para conversión. Fentanilo transdérmico: no soportado como destino. Ajustar en insuficiencia renal o hepática, ancianos y uso concomitante de benzodiacepinas u otros depresores. Consultar a dolor/paliativos ante dosis altas.',
    tests: [{ v: { o1: 'oxy', d1: 40 }, r: 60 }, { v: { o1: 'mor', d1: 60, o2: 'tra', d2: 200, dst: 'oxy' }, r: 100 }, { v: { o1: 'fen', d1: 25 }, r: 60 }]
  },
  {
    id: 'dosis-carga-mantenimiento', m: 'f', cat: 'farmacos', tags: [],
    n: 'Dosis de carga y de mantenimiento (farmacocinética)', sig: 'DC / DM', syn: ['dosis de carga', 'volumen de distribucion', 'clearance', 'farmacocinetica', 'concentracion objetivo'],
    tipo: 'dosificación',
    fin: 'Calcula dosis de carga y de mantenimiento a partir de los parámetros farmacocinéticos del fármaco y la concentración objetivo.',
    ver: 'Ecuaciones farmacocinéticas de un compartimento',
    formula: 'Dosis de carga = Vd (L/kg) × peso × Cp objetivo (mg/L) / (F × S)\nDosis de mantenimiento por intervalo = CL (L/h) × Css (mg/L) × τ (h) / (F × S)\nF = biodisponibilidad (IV = 1); S = fracción de sal (opcional)',
    in: [
      PESO(),
      { t: 'head', l: 'Dosis de carga' },
      num('vd', 'Volumen de distribución', 'L/kg', 0.01, 100, { step: 0.01, req: 0 }),
      num('cp', 'Concentración plasmática objetivo', 'mg/L', 0.0001, 10000, { step: 0.0001, req: 0 }),
      { t: 'head', l: 'Dosis de mantenimiento' },
      num('cl', 'Clearance', '', 0.0001, 10000, { step: 0.0001, req: 0 }),
      { t: 'sel', id: 'ucl', l: 'Unidad del clearance', o: [['Lh', 'L/h'], ['Lkgh', 'L/kg/h'], ['mlmin', 'mL/min'], ['mlkgmin', 'mL/kg/min']], req: 0 },
      num('css', 'Concentración media en estado estable objetivo', 'mg/L', 0.0001, 10000, { step: 0.0001, req: 0 }),
      num('tau', 'Intervalo de dosis (τ)', 'h', 0.5, 168, { step: 0.5, req: 0 }),
      { t: 'head', l: 'Común' },
      num('f', 'Biodisponibilidad F (vacío = 1, IV)', 'fracción', 0.01, 1, { step: 0.01, req: 0 }),
      num('s', 'Fracción de sal S (vacío = 1)', 'fracción', 0.01, 1, { step: 0.01, req: 0 })
    ],
    calc: v => {
      const F = (v.f ?? 1) * (v.s ?? 1); const more = []; let ld = null, md = null;
      if (v.vd != null && v.cp != null) { ld = v.vd * v.peso * v.cp / F; more.push(['Dosis de carga', fm(ld, 1) + ' mg']); }
      if (v.cl != null && v.ucl && v.css != null && v.tau != null) {
        const clh = { Lh: v.cl, Lkgh: v.cl * v.peso, mlmin: v.cl * 60 / 1000, mlkgmin: v.cl * v.peso * 60 / 1000 }[v.ucl];
        md = clh * v.css * v.tau / F; more.push(['Dosis de mantenimiento', fm(md, 1) + ' mg cada ' + fm(v.tau, 1) + ' h'], ['Clearance usado', fm(clh, 3) + ' L/h']);
      }
      if (ld == null && md == null) return null;
      more.push(['F × S usado', fm(F, 2)]);
      return { r: rd(ld ?? md, 1), u: 'mg', d: 1, lab: ld != null ? 'Dosis de carga' : 'Dosis de mantenimiento por intervalo', more, note: 'Los parámetros (Vd, CL, F) deben provenir de la ficha técnica o de monitoreo farmacocinético del propio paciente.' };
    },
    ref: 'Rowland M, Tozer TN. Clinical Pharmacokinetics and Pharmacodynamics: Concepts and Applications. 4.ª ed. Lippincott Williams & Wilkins; 2011.', verif: '2026-10',
    pop: 'Fármacos con cinética lineal, modelo de un compartimento.',
    lim: 'Modelo simplificado: no aplica a cinética no lineal (fenitoína), modelos multicompartimentales relevantes ni cambios rápidos de función renal o hepática. La Css calculada es la media del intervalo; picos y valles requieren otras ecuaciones. No reemplaza el monitoreo de niveles.',
    tests: [{ v: { peso: 70, vd: 0.7, cp: 15 }, r: 735 }, { v: { peso: 70, cl: 5, ucl: 'Lh', css: 10, tau: 12 }, r: 600 }, { v: { peso: 70, vd: 0.5, cp: 20, f: 0.8 }, r: 875 }]
  },
  {
    id: 'ajuste-dosis-renal', m: 'f', cat: 'farmacos', tags: ['f:nefrologia'],
    n: 'Ajuste de dosis según función renal', sig: '', syn: ['ajuste renal', 'dosis en insuficiencia renal'],
    tipo: 'dosificación',
    fin: 'Ajustar la dosis de un fármaco según la función renal.',
    ver: '—',
    pend: 'No existe una fórmula genérica válida: el ajuste depende de cada fármaco (fracción de eliminación renal, metabolitos activos, margen terapéutico) y del parámetro de función renal que usó la ficha técnica (habitualmente CrCl por Cockcroft–Gault, a veces eGFR). Consultar la ficha técnica o fuentes específicas del fármaco. Para estimar la función renal usar las herramientas «Cockcroft–Gault» y «CKD-EPI 2021».',
    ref: 'Ficha técnica (información para prescribir) de cada producto.',
    lim: 'Pendiente por diseño: requiere información específica de cada fármaco.'
  },

  // =====================================================================
  // HEMODINAMIA
  // =====================================================================
  {
    id: 'pam', m: 'f', cat: 'hemodinamia', tags: ['f:neuro'],
    n: 'Presión arterial media', sig: 'PAM', syn: ['tam', 'tension arterial media', 'presion media'],
    tipo: 'estimación',
    fin: 'Estima la presión arterial media a partir de la sistólica y la diastólica.',
    ver: 'Fórmula clásica PAD + 1/3 de la presión diferencial',
    formula: 'PAM = PAD + (PAS − PAD) / 3 = (PAS + 2 × PAD) / 3',
    in: [num('pas', 'Presión sistólica (PAS)', 'mmHg', 30, 300), num('pad', 'Presión diastólica (PAD)', 'mmHg', 10, 200)],
    calc: v => { if (v.pad >= v.pas) return { r: '—', interp: 'La PAD debe ser menor que la PAS', lvl: 'bad' }; return { r: rd(v.pad + (v.pas - v.pad) / 3, 0), u: 'mmHg', d: 0, lab: 'PAM', more: [['Presión diferencial', fm(v.pas - v.pad, 0) + ' mmHg']] }; },
    ref: 'Meaney E, Alva F, Moguel R, Meaney A, Alva J, Webel R. Formula and nomogram for the sphygmomanometric calculation of the mean arterial pressure. Heart. 2000;84:64.',
    url: 'https://doi.org/10.1136/heart.84.1.64', verif: '2026-10',
    pop: 'Adultos.', lim: 'Es una estimación; la PAM medida por línea arterial (integral de la curva) es la de referencia. Menos precisa con taquicardia extrema o en presiones diferenciales muy amplias.',
    tests: [{ v: { pas: 120, pad: 80 }, r: 93 }, { v: { pas: 90, pad: 60 }, r: 70 }]
  },
  {
    id: 'indice-shock', m: 'f', cat: 'hemodinamia', tags: [],
    n: 'Índice de shock', sig: 'IS', syn: ['shock index', 'allgower'],
    tipo: 'índice',
    fin: 'Relación entre frecuencia cardíaca y presión sistólica; se eleva en la hipovolemia y el shock.',
    ver: 'Allgöwer y Burri 1967',
    formula: 'IS = FC / PAS',
    in: [num('fc', 'Frecuencia cardíaca', 'lpm', 20, 300), num('pas', 'Presión sistólica', 'mmHg', 30, 300)],
    calc: v => { const i = v.fc / v.pas; return { r: rd(i, 2), u: '', d: 2, lab: 'Índice de shock', ...band(i, [[0, 0.7, 'Dentro del rango descripto en adultos sanos (0,5–0,7)', 'ok'], [0.7001, 0.9999, 'Por encima del rango normal', 'warn'], [1, 100, '≥ 1: se asocia a hipovolemia significativa y peor evolución', 'bad']]) }; },
    ref: 'Allgöwer M, Burri C. «Schockindex». Dtsch Med Wochenschr. 1967;92:1947–1950.',
    url: 'https://doi.org/10.1055/s-0028-1106070', verif: '2026-10',
    pop: 'Adultos con trauma, hemorragia o sepsis.', lim: 'Influido por betabloqueantes, marcapasos, dolor, ansiedad, embarazo y edad avanzada. Los umbrales de riesgo varían entre estudios y poblaciones; no aplicar valores de adultos a niños.',
    tests: [{ v: { fc: 120, pas: 90 }, r: 1.33 }, { v: { fc: 70, pas: 120 }, r: 0.58 }]
  },
  {
    id: 'indice-shock-modificado', m: 'f', cat: 'hemodinamia', tags: [],
    n: 'Índice de shock modificado', sig: 'ISM', syn: ['modified shock index', 'msi'],
    tipo: 'índice',
    fin: 'Relación entre frecuencia cardíaca y presión arterial media; incorpora la diastólica.',
    ver: 'Liu et al. 2012',
    formula: 'ISM = FC / PAM\nPAM = PAD + (PAS − PAD) / 3 (si no se ingresa directamente)',
    in: [num('fc', 'Frecuencia cardíaca', 'lpm', 20, 300), num('pam', 'PAM (si se conoce)', 'mmHg', 20, 250, { req: 0 }), num('pas', 'PAS (si no se ingresa PAM)', 'mmHg', 30, 300, { req: 0 }), num('pad', 'PAD (si no se ingresa PAM)', 'mmHg', 10, 200, { req: 0 })],
    calc: v => { let p = v.pam; if (p == null) { if (v.pas == null || v.pad == null) return null; p = v.pad + (v.pas - v.pad) / 3; } const i = v.fc / p; return { r: rd(i, 2), u: '', d: 2, lab: 'Índice de shock modificado', ...band(i, [[0, 0.6999, '< 0,7: por debajo del rango normal descripto; asociado a mayor mortalidad en la serie original', 'warn'], [0.7, 1.3, '0,7–1,3: rango normal descripto', 'ok'], [1.3001, 100, '> 1,3: asociado a mayor mortalidad en la serie original', 'bad']]), more: [['PAM usada', fm(p, 0) + ' mmHg']] }; },
    ref: 'Liu YC, Liu JH, Fang ZA, et al. Modified shock index and mortality rate of emergency patients. World J Emerg Med. 2012;3:114–117.',
    url: 'https://doi.org/10.5847/wjem.j.issn.1920-8642.2012.02.006', verif: '2026-10',
    pop: 'Pacientes adultos en el departamento de emergencias (serie retrospectiva).',
    lim: 'Validación limitada (un centro, retrospectivo). Mismos factores de confusión que el índice de shock (betabloqueantes, marcapasos, dolor).',
    tests: [{ v: { fc: 120, pam: 70 }, r: 1.71 }, { v: { fc: 80, pas: 120, pad: 80 }, r: 0.86 }]
  },
  {
    id: 'ppc', m: 'f', cat: 'hemodinamia', tags: ['f:neuro'],
    n: 'Presión de perfusión cerebral', sig: 'PPC', syn: ['cpp', 'perfusion cerebral', 'presion intracraneana', 'pic'],
    tipo: 'cálculo',
    fin: 'Calcula la presión de perfusión cerebral a partir de la PAM y la presión intracraneana.',
    ver: 'Definición fisiológica; objetivo de la Brain Trauma Foundation 2016',
    formula: 'PPC = PAM − PIC',
    in: [num('pam', 'PAM', 'mmHg', 20, 250), num('pic', 'PIC', 'mmHg', -10, 150)],
    calc: v => { const p = v.pam - v.pic; return { r: rd(p, 0), u: 'mmHg', d: 0, lab: 'PPC', ...band(p, [[-1e9, 59.999, 'Por debajo del rango objetivo de la BTF para TCE grave (60–70 mmHg)', 'bad'], [60, 70, 'Dentro del rango objetivo de la BTF para TCE grave (60–70 mmHg)', 'ok'], [70.001, 1e9, 'Por encima del rango objetivo de la BTF para TCE grave (60–70 mmHg)', 'warn']]), note: 'Nivelar el transductor arterial a la altura del trago (agujero de Monro) para que la PAM refleje la presión a nivel cerebral.' }; },
    ref: 'Carney N, Totten AM, O’Reilly C, et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition. Neurosurgery. 2017;80:6–15.',
    url: 'https://doi.org/10.1227/NEU.0000000000001432', verif: '2026-10',
    pop: 'Rango objetivo definido para TCE grave en adultos.',
    lim: 'El rango 60–70 mmHg es de la BTF para TCE grave; otras patologías (HSA, ACV, pediatría) tienen objetivos distintos y la autorregulación individual puede variar. La PAM debe medirse a nivel del trago.',
    tests: [{ v: { pam: 90, pic: 15 }, r: 75 }, { v: { pam: 80, pic: 25 }, r: 55 }]
  },
  {
    id: 'rvs', m: 'f', cat: 'hemodinamia', tags: [],
    n: 'Resistencia vascular sistémica', sig: 'RVS', syn: ['resistencias periefericas', 'svr', 'poscarga'],
    tipo: 'cálculo',
    fin: 'Estima la resistencia vascular sistémica a partir de PAM, PVC y gasto cardíaco.',
    ver: 'Ecuación hemodinámica (ley de Ohm) con factor 80 para dyn·s·cm⁻⁵',
    formula: 'RVS (dyn·s·cm⁻⁵) = 80 × (PAM − PVC) / GC (L/min)\nÍndice de RVS = 80 × (PAM − PVC) / IC',
    in: [num('pam', 'PAM', 'mmHg', 20, 250), num('pvc', 'PVC', 'mmHg', -5, 40), num('gc', 'Gasto cardíaco', 'L/min', 0.5, 20, { step: 0.1 }), num('sc', 'Superficie corporal (opcional, para el índice)', 'm²', 0.3, 3.5, { step: 0.01, req: 0 })],
    calc: v => { const r = 80 * (v.pam - v.pvc) / v.gc; const more = [['En unidades Wood', fm((v.pam - v.pvc) / v.gc, 1) + ' UW']]; if (v.sc != null) more.push(['Índice de RVS', fm(r * v.sc, 0) + ' dyn·s·cm⁻⁵·m²']); return { r: rd(r, 0), u: 'dyn·s·cm⁻⁵', d: 0, lab: 'RVS', more, note: 'Rango de referencia habitual en adultos: 800–1200 dyn·s·cm⁻⁵.' }; },
    ref: 'Cálculo hemodinámico estándar: Vincent JL. Understanding cardiac output. Crit Care. 2008;12:174.',
    url: 'https://doi.org/10.1186/cc6975', verif: '2026-10',
    pop: 'Adultos con monitoreo hemodinámico.', lim: 'Es un valor derivado: arrastra el error del gasto cardíaco medido. No es una medición directa del tono vascular.',
    tests: [{ v: { pam: 90, pvc: 8, gc: 5 }, r: 1312 }, { v: { pam: 65, pvc: 10, gc: 8 }, r: 550 }]
  },
  {
    id: 'gasto-cardiaco', m: 'f', cat: 'hemodinamia', tags: [],
    n: 'Gasto cardíaco (Fick o VS × FC)', sig: 'GC', syn: ['volumen minuto cardiaco', 'fick', 'cardiac output', 'contenido arterial de oxigeno'],
    tipo: 'cálculo',
    fin: 'Calcula el gasto cardíaco por el principio de Fick (con VO₂ medido o estimado) o como volumen sistólico × frecuencia cardíaca.',
    ver: 'Principio de Fick; VO₂ estimado 125 mL/min/m²',
    formula: 'Fick: GC (L/min) = VO₂ (mL/min) / [(CaO₂ − CvO₂) × 10]\nCaO₂ = 1,34 × Hb × SaO₂ + 0,003 × PaO₂ (mL O₂/dL)\nCvO₂ = 1,34 × Hb × SvO₂ + 0,003 × PvO₂\nVO₂ estimado = 125 mL/min/m² × SC\nAlternativa: GC = VS (mL) × FC / 1000',
    in: [
      { t: 'sel', id: 'met', l: 'Método', o: [['fick', 'Fick (contenidos de O₂)'], ['vs', 'Volumen sistólico × FC']] },
      { t: 'head', l: 'Fick' },
      num('hb', 'Hemoglobina', 'g/dL', 2, 25, { step: 0.1, req: 0, alt: [U.hb_gl] }),
      num('sao2', 'SaO₂', '%', 30, 100, { req: 0 }), num('pao2', 'PaO₂', 'mmHg', 20, 700, { req: 0, alt: [U.kpa] }),
      num('svo2', 'SvO₂ (sangre venosa mixta)', '%', 5, 100, { req: 0 }), num('pvo2', 'PvO₂', 'mmHg', 5, 200, { req: 0, alt: [U.kpa] }),
      num('vo2', 'VO₂ medido (vacío = estimado)', 'mL/min', 50, 2000, { req: 0 }),
      num('sc', 'Superficie corporal (para VO₂ estimado)', 'm²', 0.3, 3.5, { step: 0.01, req: 0 }),
      { t: 'head', l: 'VS × FC' },
      num('vs', 'Volumen sistólico', 'mL', 5, 250, { req: 0 }), num('fc', 'Frecuencia cardíaca', 'lpm', 20, 300, { req: 0 })
    ],
    calc: v => {
      if (v.met == 'vs') { if (v.vs == null || v.fc == null) return null; return { r: rd(v.vs * v.fc / 1000, 2), u: 'L/min', d: 2, lab: 'Gasto cardíaco (VS × FC)' }; }
      if ([v.hb, v.sao2, v.pao2, v.svo2, v.pvo2].some(x => x == null)) return null;
      let vo2 = v.vo2, est = false; if (vo2 == null) { if (v.sc == null) return null; vo2 = 125 * v.sc; est = true; }
      const ca = 1.34 * v.hb * v.sao2 / 100 + 0.003 * v.pao2, cv = 1.34 * v.hb * v.svo2 / 100 + 0.003 * v.pvo2, dif = ca - cv;
      if (dif <= 0) return { r: '—', interp: 'La diferencia arteriovenosa de O₂ debe ser positiva', lvl: 'bad' };
      const gc = vo2 / (dif * 10);
      return { r: rd(gc, 2), u: 'L/min', d: 2, lab: 'Gasto cardíaco (Fick)', more: [['CaO₂', fm(ca, 1) + ' mL/dL'], ['CvO₂', fm(cv, 1) + ' mL/dL'], ['Diferencia a-v O₂', fm(dif, 2) + ' mL/dL'], ['VO₂ usado', fm(vo2, 0) + ' mL/min' + (est ? ' (ESTIMADO 125 mL/min/m²)' : ' (medido)')], ...(v.sc != null ? [['Índice cardíaco', fm(gc / v.sc, 2) + ' L/min/m²']] : [])], note: est ? 'VO₂ estimado: puede diferir mucho del real en críticos, sepsis, fiebre, sedación o hipotermia; el resultado es aproximado.' : '' };
    },
    ref: 'Fick A. Über die Messung des Blutquantums in den Herzventrikeln. Sitzungsber Phys Med Ges Würzburg. 1870. LaFarge CG, Miettinen OS. The estimation of oxygen consumption. Cardiovasc Res. 1970;4:23–30.',
    url: 'https://doi.org/10.1093/cvr/4.1.23', verif: '2026-10',
    pop: 'Adultos con muestras arterial y venosa mixta (catéter en arteria pulmonar).',
    lim: 'Requiere sangre venosa mixta (arteria pulmonar); la venosa central sobreestima la SvO₂. El VO₂ estimado (125 mL/min/m²) es una aproximación con error importante. No válido con shunts intracardíacos.',
    tests: [{ v: { met: 'fick', hb: 15, sao2: 98, pao2: 95, svo2: 75, pvo2: 40, vo2: 250 }, r: 5.22 }, { v: { met: 'vs', vs: 70, fc: 75 }, r: 5.25 }, { v: { met: 'fick', hb: 10, sao2: 95, pao2: 80, svo2: 60, pvo2: 32, sc: 1.8 }, r: 4.65 }]
  },
  {
    id: 'indice-cardiaco', m: 'f', cat: 'hemodinamia', tags: [],
    n: 'Índice cardíaco', sig: 'IC', syn: ['cardiac index'],
    tipo: 'cálculo',
    fin: 'Normaliza el gasto cardíaco por la superficie corporal.',
    ver: 'GC / SC (Mosteller si no se ingresa SC)',
    formula: 'IC (L/min/m²) = GC (L/min) / SC (m²)\nSC (Mosteller) = √(talla × peso / 3600)',
    in: [num('gc', 'Gasto cardíaco', 'L/min', 0.5, 20, { step: 0.1 }), num('sc', 'Superficie corporal (si se conoce)', 'm²', 0.3, 3.5, { step: 0.01, req: 0 }), { ...PESO('peso', 'Peso (si no se ingresa SC)'), req: 0 }, TALLA('talla', 'Talla (si no se ingresa SC)', { req: 0 })],
    calc: v => { let sc = v.sc, m = 'ingresada'; if (sc == null) { if (v.peso == null || v.talla == null) return null; sc = mosteller(v.peso, v.talla); m = 'Mosteller'; } const i = v.gc / sc; return { r: rd(i, 2), u: 'L/min/m²', d: 2, lab: 'Índice cardíaco', more: [['SC usada', fm(sc, 2) + ' m² (' + m + ')']], note: 'Rango de referencia habitual en adultos: 2,5–4,0 L/min/m².' }; },
    ref: 'Vincent JL. Understanding cardiac output. Crit Care. 2008;12:174. Mosteller RD. N Engl J Med. 1987;317:1098.',
    url: 'https://doi.org/10.1186/cc6975', verif: '2026-10',
    pop: 'Adultos.', lim: 'Arrastra el error del método de medición del GC. En obesidad extrema, la normalización por SC puede subestimar el gasto adecuado.',
    tests: [{ v: { gc: 5, sc: 2 }, r: 2.5 }, { v: { gc: 4, peso: 70, talla: 170 }, r: 2.2 }]
  },

  // =====================================================================
  // RESPIRATORIO
  // =====================================================================
  {
    id: 'pafi', m: 'f', cat: 'respiratorio', tags: [],
    n: 'Relación PaO₂/FiO₂', sig: 'PaFi', syn: ['pafi', 'p/f', 'kirby', 'sdra', 'indice de oxigenacion'],
    tipo: 'índice',
    fin: 'Cuantifica la hipoxemia; clasifica la gravedad del SDRA según la definición de Berlín y la definición global 2023.',
    ver: 'Definición de Berlín 2012 y definición global 2023',
    formula: 'PaFi = PaO₂ (mmHg) / FiO₂ (fracción)',
    in: [num('pao2', 'PaO₂', 'mmHg', 20, 700, { alt: [U.kpa] }), FIO2],
    calc: v => { const r = v.pao2 / v.fio2; return { r: rd(r, 0), u: 'mmHg', d: 0, lab: 'PaO₂/FiO₂', ...band(r, [[300.0001, 1e9, '> 300: no cumple el criterio de oxigenación de SDRA', 'ok'], [200.0001, 300, '> 200 a ≤ 300: rango de SDRA leve', 'warn'], [100.0001, 200, '> 100 a ≤ 200: rango de SDRA moderado', 'bad'], [0, 100, '≤ 100: rango de SDRA grave', 'bad']]), note: 'La gravedad del SDRA requiere el resto de los criterios (Berlín: con PEEP/CPAP ≥ 5 cmH₂O; definición global: en no intubados, CNAF ≥ 30 L/min o VNI/CPAP ≥ 5 cmH₂O).' }; },
    ref: 'ARDS Definition Task Force; Ranieri VM, et al. Acute respiratory distress syndrome: the Berlin Definition. JAMA. 2012;307:2526–2533. Matthay MA, Arabi Y, Arroliga AC, et al. A new global definition of acute respiratory distress syndrome. Am J Respir Crit Care Med. 2024;209:37–47.',
    url: 'https://doi.org/10.1001/jama.2012.5669', verif: '2026-10',
    pop: 'Adultos con insuficiencia respiratoria aguda.', lim: 'Depende de la FiO₂ real (imprecisa con dispositivos de bajo flujo), del nivel de PEEP y de la altitud. Un valor bajo por sí solo no es diagnóstico de SDRA.',
    tests: [{ v: { pao2: 90, fio2: 0.5 }, r: 180 }, { v: { pao2: 95, fio2: 0.21 }, r: 452 }]
  },
  {
    id: 'safi', m: 'f', cat: 'respiratorio', tags: [],
    n: 'Relación SpO₂/FiO₂', sig: 'SaFi', syn: ['safi', 's/f', 'sdra sin gasometria'],
    tipo: 'índice',
    fin: 'Alternativa no invasiva a la PaFi; la definición global de SDRA 2023 la acepta cuando la SpO₂ es ≤ 97 %.',
    ver: 'Definición global de SDRA 2023',
    formula: 'SaFi = SpO₂ (%) / FiO₂ (fracción)',
    in: [num('spo2', 'SpO₂', '%', 50, 100), FIO2, { t: 'sel', id: 'ctx', l: 'Situación', o: [['int', 'Intubado (permite graduar gravedad)'], ['noint', 'No intubado (CNAF ≥ 30 L/min o VNI/CPAP ≥ 5)']] }],
    calc: v => {
      const r = v.spo2 / v.fio2; const o = { r: rd(r, 0), u: '', d: 0, lab: 'SpO₂/FiO₂' };
      if (v.spo2 > 97) return { ...o, interp: 'SpO₂ > 97 %: la SaFi no es válida para clasificar (curva de disociación aplanada)', lvl: 'warn' };
      if (v.ctx == 'noint') return { ...o, ...(r <= 315 ? { interp: '≤ 315: cumple el criterio de oxigenación de la definición global (no intubados)', lvl: 'warn' } : { interp: '> 315: no cumple el criterio de oxigenación', lvl: 'ok' }) };
      return { ...o, ...band(r, [[315.0001, 1e9, '> 315: no cumple el criterio de oxigenación de SDRA', 'ok'], [235.0001, 315, '> 235 a ≤ 315: rango de SDRA leve (intubado)', 'warn'], [148.0001, 235, '> 148 a ≤ 235: rango de SDRA moderado (intubado)', 'bad'], [0, 148, '≤ 148: rango de SDRA grave (intubado)', 'bad']]) };
    },
    ref: 'Matthay MA, Arabi Y, Arroliga AC, et al. A new global definition of acute respiratory distress syndrome. Am J Respir Crit Care Med. 2024;209:37–47.',
    url: 'https://doi.org/10.1164/rccm.202303-0558WS', verif: '2026-10',
    pop: 'Adultos con insuficiencia respiratoria aguda.', lim: 'Solo válida con SpO₂ ≤ 97 %. La oximetría es menos exacta con mala perfusión, carboxihemoglobina, metahemoglobina y en pieles oscuras (puede sobrestimar la saturación).',
    tests: [{ v: { spo2: 92, fio2: 0.4, ctx: 'int' }, r: 230 }, { v: { spo2: 94, fio2: 0.21, ctx: 'noint' }, r: 448 }]
  },
  {
    id: 'gas-alveolar', m: 'f', cat: 'respiratorio', tags: ['f:acido-base'],
    n: 'Ecuación del gas alveolar', sig: 'PAO₂', syn: ['presion alveolar de oxigeno', 'pao2 alveolar'],
    tipo: 'cálculo',
    fin: 'Estima la presión alveolar de oxígeno.',
    ver: 'Forma simplificada (sin término de corrección por FiO₂)',
    formula: 'PAO₂ = FiO₂ × (Patm − PH₂O) − PaCO₂ / R\nPH₂O = 47 mmHg (37 °C) · Patm por defecto 760 mmHg · R por defecto 0,8',
    in: [FIO2, num('paco2', 'PaCO₂', 'mmHg', 5, 200, { alt: [U.kpa] }), num('patm', 'Presión atmosférica (vacío = 760)', 'mmHg', 300, 800, { req: 0, alt: [U.kpa] }), num('rq', 'Cociente respiratorio R (vacío = 0,8)', '', 0.6, 1.2, { step: 0.01, req: 0 })],
    calc: v => { const pa = v.patm ?? 760, rq = v.rq ?? 0.8; const p = v.fio2 * (pa - 47) - v.paco2 / rq; return { r: rd(p, 0), u: 'mmHg', d: 0, lab: 'PAO₂', more: [['Patm y R usados', fm(pa, 0) + ' mmHg · ' + fm(rq, 2)]] }; },
    ref: 'Curran-Everett D. A classic learning opportunity from Fenn, Rahn, and Otis (1946): the alveolar gas equation. Adv Physiol Educ. 2006;30:58–62.',
    url: 'https://doi.org/10.1152/advan.00076.2005', verif: '2026-10',
    pop: 'General.', lim: 'Asume estado estable y temperatura de 37 °C. En altura, ingresar la presión barométrica local (Buenos Aires ≈ 760 mmHg). El R real varía con la dieta y la nutrición.',
    tests: [{ v: { fio2: 0.21, paco2: 40 }, r: 100 }, { v: { fio2: 0.5, paco2: 40, patm: 760 }, r: 307 }]
  },
  {
    id: 'gradiente-aa', m: 'f', cat: 'respiratorio', tags: ['f:acido-base'],
    n: 'Gradiente alveoloarterial de O₂', sig: 'G(A-a)O₂', syn: ['gradiente a-a', 'diferencia alveolo arterial'],
    tipo: 'cálculo',
    fin: 'Diferencia entre la PAO₂ calculada y la PaO₂ medida; distingue hipoxemia por hipoventilación (gradiente normal) de alteraciones V/Q, shunt o difusión.',
    ver: 'Ecuación del gas alveolar simplificada; valor esperado por edad de Mellemgaard 1966',
    formula: 'G(A-a) = PAO₂ − PaO₂\nPAO₂ = FiO₂ × (Patm − 47) − PaCO₂ / 0,8\nEsperado por edad (aire ambiente) = 2,5 + 0,21 × edad (mmHg)',
    in: [FIO2, num('pao2', 'PaO₂', 'mmHg', 20, 700, { alt: [U.kpa] }), num('paco2', 'PaCO₂', 'mmHg', 5, 200, { alt: [U.kpa] }), num('edad', 'Edad (opcional, para el valor esperado)', 'años', 1, 120, { req: 0 }), num('patm', 'Presión atmosférica (vacío = 760)', 'mmHg', 300, 800, { req: 0, alt: [U.kpa] })],
    calc: v => {
      const pa = v.patm ?? 760; const PA = v.fio2 * (pa - 47) - v.paco2 / 0.8; const g = PA - v.pao2; const o = { r: rd(g, 0), u: 'mmHg', d: 0, lab: 'Gradiente A-a', more: [['PAO₂ calculada', fm(PA, 0) + ' mmHg']] };
      if (v.edad != null) { const e = 2.5 + 0.21 * v.edad; o.more.push(['Esperado para la edad (aire ambiente)', fm(e, 0) + ' mmHg']); if (v.fio2 <= 0.215) Object.assign(o, g > e ? { interp: 'Mayor que el esperado para la edad', lvl: 'warn' } : { interp: 'Dentro de lo esperado para la edad', lvl: 'ok' }); else o.note = 'El valor esperado por edad solo es válido respirando aire ambiente (FiO₂ 0,21); con FiO₂ mayor el gradiente normal aumenta.'; }
      return o;
    },
    ref: 'Mellemgaard K. The alveolar-arterial oxygen difference: its size and components in normal man. Acta Physiol Scand. 1966;67:10–20.',
    url: 'https://doi.org/10.1111/j.1748-1716.1966.tb03281.x', verif: '2026-10',
    pop: 'Valores esperados de adultos sanos respirando aire ambiente.', lim: 'El gradiente normal aumenta con la FiO₂ y la edad; la interpretación es más confiable con FiO₂ 0,21. Usa R = 0,8 y la ecuación simplificada.',
    tests: [{ v: { fio2: 0.21, pao2: 90, paco2: 40, edad: 40 }, r: 10 }, { v: { fio2: 0.21, pao2: 60, paco2: 30, edad: 30 }, r: 52 }]
  },
  {
    id: 'vt-pbw', m: 'f', cat: 'respiratorio', tags: ['f:antropometria'],
    n: 'Volumen corriente por peso corporal predicho', sig: 'VT/PBW', syn: ['ventilacion protectora', 'ardsnet', '6 ml/kg', 'volumen tidal'],
    tipo: 'cálculo',
    fin: 'Calcula el volumen corriente objetivo en mL/kg de peso predicho y, si se ingresa el VT actual, cuántos mL/kg representa.',
    ver: 'Peso predicho ARDSNet 2000',
    formula: 'PBW hombres = 50 + 0,91 × (talla [cm] − 152,4)\nPBW mujeres = 45,5 + 0,91 × (talla [cm] − 152,4)\nVT objetivo = mL/kg × PBW',
    in: [SEXO, TALLA(), { t: 'sel', id: 'mlkg', l: 'mL/kg de PBW objetivo', o: [['6', '6 mL/kg'], ['4', '4 mL/kg'], ['5', '5 mL/kg'], ['7', '7 mL/kg'], ['8', '8 mL/kg']] }, num('vt', 'VT actual (opcional)', 'mL', 50, 2000, { req: 0 })],
    calc: v => { const p = pbwArds(v.sexo, v.talla); if (p <= 0) return null; const t = +v.mlkg * p; const more = [['Peso corporal predicho', fm(p, 1) + ' kg'], ['Rango ARDSNet 4–8 mL/kg', fm(4 * p, 0) + '–' + fm(8 * p, 0) + ' mL']]; if (v.vt != null) more.push(['VT actual', fm(v.vt / p, 1) + ' mL/kg PBW']); return { r: rd(t, 0), u: 'mL', d: 0, lab: 'VT a ' + v.mlkg + ' mL/kg PBW', more }; },
    ref: 'Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome. N Engl J Med. 2000;342:1301–1308.',
    url: 'https://doi.org/10.1056/NEJM200005043421801', verif: '2026-10',
    pop: 'Adultos con SDRA en ventilación mecánica.', lim: 'Usar siempre la talla medida (no estimada a ojo). El PBW no es válido en tallas muy bajas (< 152 cm da valores bajos). La elección del VT es una decisión clínica; el protocolo ARDSNet también usa presión meseta ≤ 30 cmH₂O.',
    tests: [{ v: { sexo: 'm', talla: 175, mlkg: '6' }, r: 423 }, { v: { sexo: 'f', talla: 160, mlkg: '6', vt: 450 }, r: 314 }]
  },
  {
    id: 'ventilacion-minuto', m: 'f', cat: 'respiratorio', tags: [],
    n: 'Ventilación minuto', sig: 'VE', syn: ['volumen minuto', 'minute ventilation'],
    tipo: 'cálculo',
    fin: 'Calcula la ventilación minuto a partir del volumen corriente y la frecuencia respiratoria.',
    ver: 'Cálculo fisiológico',
    formula: 'VE (L/min) = VT (mL) × FR / 1000',
    in: [num('vt', 'Volumen corriente', 'mL', 20, 3000), num('fr', 'Frecuencia respiratoria', 'rpm', 1, 80)],
    calc: v => ({ r: rd(v.vt * v.fr / 1000, 2), u: 'L/min', d: 1, lab: 'Ventilación minuto' }),
    ref: 'West JB, Luks AM. West’s Respiratory Physiology: The Essentials. 11.ª ed. Wolters Kluwer; 2021.', verif: '2026-10',
    pop: 'General.', lim: 'Incluye el espacio muerto: no equivale a la ventilación alveolar.',
    tests: [{ v: { vt: 500, fr: 14 }, r: 7 }, { v: { vt: 420, fr: 22 }, r: 9.24 }]
  },
  {
    id: 'compliance', m: 'f', cat: 'respiratorio', tags: [],
    n: 'Compliance estática y dinámica', sig: 'Cst / Cdyn', syn: ['distensibilidad', 'compliance pulmonar', 'mecanica respiratoria'],
    tipo: 'cálculo',
    fin: 'Calcula la compliance del sistema respiratorio en ventilación mecánica.',
    ver: 'Cálculo de mecánica respiratoria',
    formula: 'Compliance estática = VT / (Pmeseta − PEEP)\nCompliance dinámica = VT / (Ppico − PEEP)\n(mL/cmH₂O)',
    in: [num('vt', 'Volumen corriente', 'mL', 20, 3000), num('peep', 'PEEP (total si se midió)', 'cmH₂O', 0, 40), num('pplat', 'Presión meseta', 'cmH₂O', 1, 80, { req: 0 }), num('ppico', 'Presión pico', 'cmH₂O', 1, 100, { req: 0 })],
    calc: v => {
      if (v.pplat == null && v.ppico == null) return null; const more = []; let st = null, dy = null;
      if (v.pplat != null) { if (v.pplat <= v.peep) return { r: '—', interp: 'La presión meseta debe ser mayor que la PEEP', lvl: 'bad' }; st = v.vt / (v.pplat - v.peep); }
      if (v.ppico != null && v.ppico > v.peep) { dy = v.vt / (v.ppico - v.peep); more.push(['Compliance dinámica', fm(dy, 1) + ' mL/cmH₂O']); }
      if (st != null) more.unshift(['Compliance estática', fm(st, 1) + ' mL/cmH₂O']);
      if (st != null && v.ppico != null) more.push(['Ppico − Pmeseta (componente resistivo)', fm(v.ppico - v.pplat, 0) + ' cmH₂O']);
      return { r: rd(st ?? dy, 1), u: 'mL/cmH₂O', d: 1, lab: st != null ? 'Compliance estática' : 'Compliance dinámica', more };
    },
    ref: 'Hess DR. Respiratory mechanics in mechanically ventilated patients. Respir Care. 2014;59:1773–1794.',
    url: 'https://doi.org/10.4187/respcare.03410', verif: '2026-10',
    pop: 'Pacientes en ventilación mecánica controlada por volumen.', lim: 'La estática requiere pausa inspiratoria y paciente sin esfuerzo propio. La dinámica incluye la resistencia de la vía aérea y del tubo. Usar la PEEP total si hay auto-PEEP.',
    tests: [{ v: { vt: 450, peep: 10, pplat: 25, ppico: 32 }, r: 30 }, { v: { vt: 500, peep: 5, ppico: 30 }, r: 20 }]
  },
  {
    id: 'driving-pressure', m: 'f', cat: 'respiratorio', tags: [],
    n: 'Driving pressure (presión de distensión)', sig: 'ΔP', syn: ['presion de conduccion', 'presion motriz', 'amato'],
    tipo: 'cálculo',
    fin: 'Diferencia entre la presión meseta y la PEEP; se asoció con la mortalidad en SDRA.',
    ver: 'Amato 2015',
    formula: 'ΔP = Pmeseta − PEEP (cmH₂O)\nEquivale a VT / compliance estática',
    in: [num('pplat', 'Presión meseta', 'cmH₂O', 1, 80), num('peep', 'PEEP (total si se midió)', 'cmH₂O', 0, 40), num('vt', 'VT (opcional, para la compliance)', 'mL', 20, 3000, { req: 0 })],
    calc: v => { const d = v.pplat - v.peep; if (d <= 0) return { r: '—', interp: 'La presión meseta debe ser mayor que la PEEP', lvl: 'bad' }; const o = { r: rd(d, 0), u: 'cmH₂O', d: 0, lab: 'Driving pressure', interp: d > 15 ? '> 15 cmH₂O: por encima del valor asociado a mayor riesgo en el análisis de Amato' : '≤ 15 cmH₂O', lvl: d > 15 ? 'warn' : 'ok' }; if (v.vt != null) o.more = [['Compliance estática', fm(v.vt / d, 1) + ' mL/cmH₂O']]; return o; },
    ref: 'Amato MBP, Meade MO, Slutsky AS, et al. Driving pressure and survival in the acute respiratory distress syndrome. N Engl J Med. 2015;372:747–755.',
    url: 'https://doi.org/10.1056/NEJMsa1410639', verif: '2026-10',
    pop: 'Adultos con SDRA en ventilación mecánica controlada (reanálisis de ensayos clínicos).', lim: 'Requiere pausa inspiratoria sin esfuerzo del paciente. La asociación con la mortalidad es continua; el umbral de 15 cmH₂O es orientativo y proviene de análisis secundarios, no de un ensayo que lo use como objetivo.',
    tests: [{ v: { pplat: 28, peep: 10 }, r: 18 }, { v: { pplat: 22, peep: 8, vt: 420 }, r: 14 }]
  },
  {
    id: 'rox', m: 'f', cat: 'respiratorio', tags: [],
    n: 'Índice ROX', sig: 'ROX', syn: ['canula nasal de alto flujo', 'cnaf', 'alto flujo', 'roca'],
    tipo: 'score pronóstico',
    fin: 'Predice el éxito o el fracaso (necesidad de intubación) de la cánula nasal de alto flujo en insuficiencia respiratoria aguda hipoxémica.',
    ver: 'Roca et al. 2019 (cohorte de validación)',
    formula: 'ROX = (SpO₂ [%] / FiO₂ [fracción]) / FR [rpm]',
    in: [num('spo2', 'SpO₂', '%', 50, 100), FIO2, num('fr', 'Frecuencia respiratoria', 'rpm', 5, 80), { t: 'sel', id: 'h', l: 'Tiempo desde el inicio de la CNAF', o: [['2', '2 h'], ['6', '6 h'], ['12', '12 h'], ['otro', 'Otro momento']] }],
    calc: v => {
      const r = v.spo2 / v.fio2 / v.fr; const o = { r: rd(r, 2), u: '', d: 2, lab: 'Índice ROX' };
      if (v.h == 'otro') return { ...o, note: 'Los umbrales se validaron a las 2, 6 y 12 h de iniciada la CNAF; en otros momentos no hay puntos de corte validados.' };
      const lo = { 2: 2.85, 6: 3.47, 12: 3.85 }[v.h];
      if (r >= 4.88) return { ...o, interp: '≥ 4,88 a las ' + v.h + ' h: asociado a menor riesgo de intubación', lvl: 'ok' };
      if (r < lo) return { ...o, interp: '< ' + fm(lo, 2) + ' a las ' + v.h + ' h: asociado a alto riesgo de fracaso de la CNAF', lvl: 'bad' };
      return { ...o, interp: 'Entre ' + fm(lo, 2) + ' y 4,88: zona intermedia; repetir la medición', lvl: 'warn' };
    },
    ref: 'Roca O, Caralt B, Messika J, et al. An index combining respiratory rate and oxygenation to predict outcome of nasal high-flow therapy. Am J Respir Crit Care Med. 2019;199:1368–1376.',
    url: 'https://doi.org/10.1164/rccm.201803-0589OC', verif: '2026-10',
    pop: 'Adultos con neumonía e insuficiencia respiratoria aguda hipoxémica tratados con CNAF.', lim: 'Validado en neumonía; su desempeño en otras causas (COVID-19, EPOC, inmunosuprimidos) es variable. No reemplaza el juicio clínico ni debe demorar la intubación indicada. SpO₂ en %, FiO₂ en fracción.',
    tests: [{ v: { spo2: 95, fio2: 0.5, fr: 25, h: '6' }, r: 7.6 }, { v: { spo2: 88, fio2: 0.8, fr: 40, h: '2' }, r: 2.75 }, { v: { spo2: 92, fio2: 0.6, fr: 35, h: '12' }, r: 'zona intermedia' }]
  },
  {
    id: 'ventilacion-alveolar', m: 'f', cat: 'respiratorio', tags: [],
    n: 'Ventilación alveolar', sig: 'VA', syn: ['espacio muerto', 'ventilacion efectiva'],
    tipo: 'cálculo',
    fin: 'Estima la ventilación que efectivamente participa del intercambio gaseoso.',
    ver: 'Cálculo fisiológico',
    formula: 'VA (L/min) = (VT − VD) × FR / 1000',
    in: [num('vt', 'Volumen corriente', 'mL', 20, 3000), num('vd', 'Espacio muerto', 'mL', 0, 2000), num('fr', 'Frecuencia respiratoria', 'rpm', 1, 80)],
    calc: v => { if (v.vd >= v.vt) return { r: '—', interp: 'El espacio muerto debe ser menor que el VT', lvl: 'bad' }; return { r: rd((v.vt - v.vd) * v.fr / 1000, 2), u: 'L/min', d: 2, lab: 'Ventilación alveolar', more: [['Ventilación minuto', fm(v.vt * v.fr / 1000, 2) + ' L/min'], ['VD/VT', fm(v.vd / v.vt, 2)]] }; },
    ref: 'West JB, Luks AM. West’s Respiratory Physiology: The Essentials. 11.ª ed. Wolters Kluwer; 2021.', verif: '2026-10',
    pop: 'General.', lim: 'El espacio muerto anatómico se aproxima a ~2,2 mL/kg de peso ideal; el fisiológico puede ser mucho mayor en enfermedad pulmonar y solo se mide con capnografía volumétrica o Bohr–Enghoff.',
    tests: [{ v: { vt: 500, vd: 150, fr: 12 }, r: 4.2 }, { v: { vt: 400, vd: 200, fr: 30 }, r: 6 }]
  },

  // =====================================================================
  // NEFROLOGÍA
  // =====================================================================
  {
    id: 'ckd-epi-2021-cr', m: 'f', cat: 'nefrologia', tags: [],
    n: 'CKD-EPI 2021 (creatinina, sin raza)', sig: 'eGFRcr', syn: ['filtrado glomerular', 'tfg', 'egfr', 'ckd epi'],
    tipo: 'estimación',
    fin: 'Estima el filtrado glomerular a partir de la creatinina sérica, edad y sexo.',
    ver: 'CKD-EPI 2021, sin coeficiente racial',
    formula: 'eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^−1,200 × 0,9938^edad × 1,012 [mujer]\nκ = 0,7 (mujer) · 0,9 (hombre); α = −0,241 (mujer) · −0,302 (hombre)',
    in: [num('cr', 'Creatinina sérica (IDMS)', 'mg/dL', 0.1, 25, { step: 0.01, alt: [U.creat_umol] }), num('edad', 'Edad', 'años', 18, 120), SEXO],
    calc: v => { const f = v.sexo == 'f', k = f ? 0.7 : 0.9, a = f ? -0.241 : -0.302, x = v.cr / k; const e = 142 * Math.min(x, 1) ** a * Math.max(x, 1) ** -1.2 * 0.9938 ** v.edad * (f ? 1.012 : 1); return { r: rd(e, 0), u: 'mL/min/1,73 m²', d: 0, lab: 'eGFR', ...kdigoG(e) }; },
    ref: 'Inker LA, Eneanya ND, Coresh J, et al. New creatinine- and cystatin C–based equations to estimate GFR without race. N Engl J Med. 2021;385:1737–1749. Categorías: ' + KDIGO_REF,
    url: 'https://doi.org/10.1056/NEJMoa2102953', verif: '2026-10',
    pop: 'Adultos (≥ 18 años) de cohortes de EE. UU. y otros países.', lim: 'Solo adultos y función renal estable: no válida en IRA. Menos precisa con masa muscular extrema (amputados, sarcopenia, cuadriplejía, fisicoculturistas), dietas vegetarianas o suplementos de creatina, embarazo y extremos de peso. Para dosificar fármacos, la ficha técnica puede requerir CrCl (Cockcroft–Gault) o eGFR no indexado.',
    tests: [{ v: { cr: 1, edad: 50, sexo: 'f' }, r: 69 }, { v: { cr: 0.8, edad: 60, sexo: 'm' }, r: 101 }, { v: { cr: 2.5, edad: 70, sexo: 'm' }, r: 27 }]
  },
  {
    id: 'ckd-epi-2021-cr-cys', m: 'f', cat: 'nefrologia', tags: [],
    n: 'CKD-EPI 2021 (creatinina y cistatina C)', sig: 'eGFRcr-cys', syn: ['cistatina', 'filtrado glomerular', 'egfr combinado'],
    tipo: 'estimación',
    fin: 'Estima el filtrado glomerular combinando creatinina y cistatina C; es la ecuación más precisa de la familia CKD-EPI.',
    ver: 'CKD-EPI 2021 creatinina–cistatina C, sin coeficiente racial',
    formula: 'eGFR = 135 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^−0,544 × min(Scys/0,8, 1)^−0,323 × max(Scys/0,8, 1)^−0,778 × 0,9961^edad × 0,963 [mujer]\nκ = 0,7 (mujer) · 0,9 (hombre); α = −0,219 (mujer) · −0,144 (hombre)',
    in: [num('cr', 'Creatinina sérica (IDMS)', 'mg/dL', 0.1, 25, { step: 0.01, alt: [U.creat_umol] }), num('cys', 'Cistatina C (estandarizada)', 'mg/L', 0.1, 15, { step: 0.01 }), num('edad', 'Edad', 'años', 18, 120), SEXO],
    calc: v => { const f = v.sexo == 'f', k = f ? 0.7 : 0.9, a = f ? -0.219 : -0.144, x = v.cr / k, y = v.cys / 0.8; const e = 135 * Math.min(x, 1) ** a * Math.max(x, 1) ** -0.544 * Math.min(y, 1) ** -0.323 * Math.max(y, 1) ** -0.778 * 0.9961 ** v.edad * (f ? 0.963 : 1); return { r: rd(e, 0), u: 'mL/min/1,73 m²', d: 0, lab: 'eGFR', ...kdigoG(e) }; },
    ref: 'Inker LA, Eneanya ND, Coresh J, et al. New creatinine- and cystatin C–based equations to estimate GFR without race. N Engl J Med. 2021;385:1737–1749. Categorías: ' + KDIGO_REF,
    url: 'https://doi.org/10.1056/NEJMoa2102953', verif: '2026-10',
    pop: 'Adultos (≥ 18 años).', lim: 'No válida en IRA. La cistatina C se altera con corticoides en dosis altas, disfunción tiroidea, inflamación, obesidad y tabaquismo. Requiere cistatina estandarizada (IFCC/ERM-DA471).',
    tests: [{ v: { cr: 1, cys: 1, edad: 50, sexo: 'm' }, r: 88 }, { v: { cr: 0.7, cys: 0.8, edad: 40, sexo: 'f' }, r: 111 }]
  },
  {
    id: 'ckd-epi-2012-cys', m: 'f', cat: 'nefrologia', tags: [],
    n: 'CKD-EPI 2012 (cistatina C)', sig: 'eGFRcys', syn: ['cistatina', 'filtrado glomerular'],
    tipo: 'estimación',
    fin: 'Estima el filtrado glomerular a partir de la cistatina C sola; útil cuando la creatinina es poco confiable por masa muscular.',
    ver: 'CKD-EPI 2012 cistatina C',
    formula: 'eGFR = 133 × min(Scys/0,8, 1)^−0,499 × max(Scys/0,8, 1)^−1,328 × 0,996^edad × 0,932 [mujer]',
    in: [num('cys', 'Cistatina C (estandarizada)', 'mg/L', 0.1, 15, { step: 0.01 }), num('edad', 'Edad', 'años', 18, 120), SEXO],
    calc: v => { const y = v.cys / 0.8; const e = 133 * Math.min(y, 1) ** -0.499 * Math.max(y, 1) ** -1.328 * 0.996 ** v.edad * (v.sexo == 'f' ? 0.932 : 1); return { r: rd(e, 0), u: 'mL/min/1,73 m²', d: 0, lab: 'eGFR', ...kdigoG(e) }; },
    ref: 'Inker LA, Schmid CH, Tighiouart H, et al. Estimating glomerular filtration rate from serum creatinine and cystatin C. N Engl J Med. 2012;367:20–29. Categorías: ' + KDIGO_REF,
    url: 'https://doi.org/10.1056/NEJMoa1114248', verif: '2026-10',
    pop: 'Adultos (≥ 18 años).', lim: 'No válida en IRA. Alterada por corticoides en dosis altas, disfunción tiroidea, inflamación y obesidad. Requiere cistatina estandarizada.',
    tests: [{ v: { cys: 1, edad: 50, sexo: 'm' }, r: 81 }, { v: { cys: 0.8, edad: 30, sexo: 'f' }, r: 110 }]
  },
  {
    id: 'cockcroft-gault', m: 'f', cat: 'nefrologia', tags: ['f:farmacos'],
    n: 'Cockcroft–Gault (clearance de creatinina)', sig: 'CrCl', syn: ['clearance de creatinina estimado', 'ajuste renal de farmacos'],
    tipo: 'estimación',
    fin: 'Estima el clearance de creatinina (no el filtrado glomerular); es el parámetro usado en muchas fichas técnicas para ajustar dosis.',
    ver: 'Cockcroft y Gault 1976 (factor 0,85 en mujeres)',
    formula: 'CrCl (mL/min) = (140 − edad) × peso (kg) / (72 × Scr [mg/dL]) × 0,85 [mujer]\nPeso ideal (Devine) = 50 (H) / 45,5 (M) + 2,3 × (pulgadas − 60)\nPeso ajustado = ideal + 0,4 × (real − ideal)',
    in: [num('edad', 'Edad', 'años', 18, 120), PESO('peso', 'Peso real'), SEXO, num('cr', 'Creatinina sérica', 'mg/dL', 0.1, 25, { step: 0.01, alt: [U.creat_umol] }), { t: 'sel', id: 'pt', l: 'Peso a usar', o: [['real', 'Peso real'], ['ideal', 'Peso ideal (Devine)'], ['ajust', 'Peso ajustado (factor 0,4)']] }, TALLA('talla', 'Talla (para peso ideal o ajustado)', { req: 0 })],
    calc: v => {
      let w = v.peso, nom = 'real';
      if (v.pt != 'real') { if (v.talla == null) return null; const ibw = ibwDevine(v.sexo, v.talla); w = v.pt == 'ideal' ? ibw : ibw + 0.4 * (v.peso - ibw); nom = v.pt == 'ideal' ? 'ideal (Devine)' : 'ajustado (0,4)'; }
      const c = (140 - v.edad) * w / (72 * v.cr) * (v.sexo == 'f' ? 0.85 : 1);
      return { r: rd(c, 0), u: 'mL/min', d: 0, lab: 'Clearance de creatinina estimado', more: [['Peso usado', fm(w, 1) + ' kg (' + nom + ')']], note: 'Es CrCl en mL/min (no indexado), no eGFR en mL/min/1,73 m².' };
    },
    ref: 'Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16:31–41.',
    url: 'https://doi.org/10.1159/000180580', verif: '2026-10',
    pop: 'Hombres adultos internados (el factor 0,85 para mujeres fue propuesto, no medido).', lim: 'Estima clearance de creatinina, que sobreestima el filtrado real por secreción tubular. Se derivó con métodos de creatinina no estandarizados (los métodos IDMS actuales dan valores algo más bajos). En obesidad el resultado depende mucho del peso elegido; la ficha técnica del fármaco puede indicar cuál usar. No válida en IRA.',
    tests: [{ v: { edad: 60, peso: 70, sexo: 'm', cr: 1, pt: 'real' }, r: 78 }, { v: { edad: 80, peso: 60, sexo: 'f', cr: 1.2, pt: 'real' }, r: 35 }, { v: { edad: 50, peso: 120, sexo: 'm', cr: 1, pt: 'ajust', talla: 175 }, r: 113 }]
  },
  {
    id: 'clearance-creatinina-orina', m: 'f', cat: 'nefrologia', tags: [],
    n: 'Clearance de creatinina por orina temporizada', sig: 'CrCl medido', syn: ['orina de 24 horas', 'clearance medido', 'depuracion de creatinina'],
    tipo: 'cálculo',
    fin: 'Mide el clearance de creatinina a partir de una recolección de orina temporizada.',
    ver: 'Definición de clearance renal',
    formula: 'CrCl (mL/min) = Ucr × volumen urinario (mL) / (Scr × tiempo [min])\nIndexado = CrCl × 1,73 / SC',
    in: [num('ucr', 'Creatinina urinaria', 'mg/dL', 1, 1000, { alt: [CRU] }), num('vol', 'Volumen de orina recolectado', 'mL', 10, 10000), num('h', 'Tiempo de recolección', 'h', 1, 48), num('scr', 'Creatinina sérica', 'mg/dL', 0.1, 25, { step: 0.01, alt: [U.creat_umol] }), num('sc', 'Superficie corporal (opcional, para indexar)', 'm²', 0.3, 3.5, { step: 0.01, req: 0 })],
    calc: v => { const c = v.ucr * v.vol / (v.scr * v.h * 60); const more = [['Flujo urinario', fm(v.vol / (v.h * 60), 2) + ' mL/min']]; if (v.sc != null) more.push(['Indexado a 1,73 m²', fm(c * 1.73 / v.sc, 0) + ' mL/min/1,73 m²']); more.push(['Creatinina excretada', fm(v.ucr * v.vol / 100, 0) + ' mg en ' + fm(v.h, 0) + ' h']); return { r: rd(c, 0), u: 'mL/min', d: 0, lab: 'Clearance de creatinina', more, note: 'Para chequear que la recolección esté completa, la excreción de 24 h suele rondar 20–25 mg/kg/día en hombres y 15–20 mg/kg/día en mujeres.' }; },
    ref: 'Levey AS, Inker LA. Assessment of glomerular filtration rate in health and disease: a state of the art review. Clin Pharmacol Ther. 2017;102:405–419.',
    url: 'https://doi.org/10.1002/cpt.729', verif: '2026-10',
    pop: 'General.', lim: 'El error más frecuente es la recolección incompleta o excesiva. Sobreestima el filtrado por secreción tubular de creatinina, más cuanto menor es el filtrado. Requiere función renal estable durante la recolección.',
    tests: [{ v: { ucr: 100, vol: 1440, h: 24, scr: 1 }, r: 100 }, { v: { ucr: 60, vol: 2000, h: 24, scr: 2 }, r: 42 }]
  },
  {
    id: 'fena', m: 'f', cat: 'nefrologia', tags: ['f:medio-interno'],
    n: 'Fracción excretada de sodio', sig: 'FeNa', syn: ['fena', 'excrecion fraccional de sodio', 'prerrenal', 'necrosis tubular'],
    tipo: 'cálculo',
    fin: 'En la injuria renal aguda oligúrica, ayuda a diferenciar la azoemia prerrenal de la necrosis tubular aguda.',
    ver: 'Espinel 1976; Miller 1978',
    formula: 'FeNa (%) = (Na⁺u × Cr pl) / (Na⁺ pl × Cr u) × 100',
    in: [num('una', 'Na⁺ urinario', 'mEq/L', 1, 400), num('pna', 'Na⁺ plasmático', 'mEq/L', 90, 200), num('ucr', 'Creatinina urinaria', 'mg/dL', 1, 1000, { alt: [CRU] }), num('pcr', 'Creatinina plasmática', 'mg/dL', 0.1, 25, { step: 0.01, alt: [U.creat_umol] })],
    calc: v => { const f = v.una * v.pcr / (v.pna * v.ucr) * 100; return { r: rd(f, 2), u: '%', d: 2, lab: 'FeNa', ...band(f, [[0, 0.9999, '< 1 %: compatible con azoemia prerrenal', 'ok'], [1, 2, '1–2 %: indeterminado', 'warn'], [2.0001, 1e9, '> 2 %: compatible con necrosis tubular aguda', 'bad']]) }; },
    ref: 'Espinel CH. The FENa test: use in the differential diagnosis of acute renal failure. JAMA. 1976;236:579–581. Miller TR, Anderson RJ, Linas SL, et al. Urinary diagnostic indices in acute renal failure: a prospective study. Ann Intern Med. 1978;89:47–50.',
    url: 'https://doi.org/10.1001/jama.1976.03270060029022', verif: '2026-10',
    pop: 'Adultos con injuria renal aguda oligúrica.', lim: 'No confiable con diuréticos (usar FeUrea), ERC previa, glucosuria, bicarbonaturia, contraste o mioglobinuria. Puede ser < 1 % en NTA por contraste, rabdomiólisis, sepsis o glomerulonefritis, y > 2 % en prerrenal con ERC.',
    tests: [{ v: { una: 20, pna: 140, ucr: 100, pcr: 2 }, r: 0.29 }, { v: { una: 60, pna: 135, ucr: 50, pcr: 3 }, r: 2.67 }]
  },
  {
    id: 'feurea', m: 'f', cat: 'nefrologia', tags: ['f:medio-interno'],
    n: 'Fracción excretada de urea', sig: 'FeUrea', syn: ['feun', 'excrecion fraccional de urea', 'diureticos'],
    tipo: 'cálculo',
    fin: 'Alternativa a la FeNa en pacientes que recibieron diuréticos, para orientar a azoemia prerrenal.',
    ver: 'Carvounis 2002',
    formula: 'FeUrea (%) = (urea u × Cr pl) / (urea pl × Cr u) × 100',
    in: [num('uu', 'Urea urinaria', 'mg/dL', 1, 10000, { alt: [U.urea_mmol, U.bun_mgdl] }), num('pu', 'Urea plasmática', 'mg/dL', 1, 800, { alt: [U.urea_mmol, U.bun_mgdl] }), num('ucr', 'Creatinina urinaria', 'mg/dL', 1, 1000, { alt: [CRU] }), num('pcr', 'Creatinina plasmática', 'mg/dL', 0.1, 25, { step: 0.01, alt: [U.creat_umol] })],
    calc: v => { const f = v.uu * v.pcr / (v.pu * v.ucr) * 100; return { r: rd(f, 1), u: '%', d: 1, lab: 'FeUrea', ...(f <= 35 ? { interp: '≤ 35 %: compatible con azoemia prerrenal', lvl: 'ok' } : { interp: '> 35 %: no sugiere azoemia prerrenal', lvl: 'warn' }) }; },
    ref: 'Carvounis CP, Nisar S, Guro-Razuman S. Significance of the fractional excretion of urea in the differential diagnosis of acute renal failure. Kidney Int. 2002;62:2223–2229.',
    url: 'https://doi.org/10.1046/j.1523-1755.2002.00683.x', verif: '2026-10',
    pop: 'Adultos con injuria renal aguda, con o sin diuréticos.', lim: 'Usar urea (o BUN) en las mismas unidades en orina y plasma. Menos confiable en ancianos, sepsis, diuréticos osmóticos y acetazolamida. Estudios posteriores mostraron desempeño variable.',
    tests: [{ v: { uu: 500, pu: 100, ucr: 100, pcr: 2 }, r: 10 }, { v: { uu: 300, pu: 120, ucr: 40, pcr: 3 }, r: 18.8 }]
  },
  {
    id: 'fe-acido-urico', m: 'f', cat: 'nefrologia', tags: ['f:medio-interno', 'f:endocrino'],
    n: 'Fracción excretada de ácido úrico', sig: 'FEAU', syn: ['feua', 'excrecion fraccional de urato', 'siadh', 'hiponatremia'],
    tipo: 'cálculo',
    fin: 'En la hiponatremia, una FEAU elevada orienta a SIADH, incluso en pacientes con diuréticos.',
    ver: 'Fenske 2008',
    formula: 'FEAU (%) = (ácido úrico u × Cr pl) / (ácido úrico pl × Cr u) × 100',
    in: [num('uua', 'Ácido úrico urinario', 'mg/dL', 0.1, 500, { step: 0.1, alt: [UA_UMOL] }), num('pua', 'Ácido úrico plasmático', 'mg/dL', 0.1, 30, { step: 0.1, alt: [UA_UMOL] }), num('ucr', 'Creatinina urinaria', 'mg/dL', 1, 1000, { alt: [CRU] }), num('pcr', 'Creatinina plasmática', 'mg/dL', 0.1, 25, { step: 0.01, alt: [U.creat_umol] })],
    calc: v => { const f = v.uua * v.pcr / (v.pua * v.ucr) * 100; return { r: rd(f, 1), u: '%', d: 1, lab: 'FEAU', ...(f > 12 ? { interp: '> 12 %: en hiponatremia, orienta a SIAD (VPP 100 % en el estudio original)', lvl: 'warn' } : { interp: '≤ 12 %: no alcanza el punto de corte para SIAD', lvl: '' }) }; },
    ref: 'Fenske W, Störk S, Koschker AC, et al. Value of fractional uric acid excretion in differential diagnosis of hyponatremic patients on diuretics. J Clin Endocrinol Metab. 2008;93:2991–2997.',
    url: 'https://doi.org/10.1210/jc.2008-0330', verif: '2026-10',
    pop: 'Adultos con hiponatremia hipoosmolar, con o sin diuréticos.', lim: 'El punto de corte aplica solo en el contexto de hiponatremia. También se eleva en pérdida cerebral de sal, síndrome de Fanconi y con fármacos uricosúricos (losartán, dosis altas de salicilatos).',
    tests: [{ v: { uua: 40, pua: 3, ucr: 50, pcr: 0.6 }, r: 16 }, { v: { uua: 30, pua: 6, ucr: 100, pcr: 1 }, r: 5 }]
  },
  {
    id: 'relacion-urea-creatinina', m: 'f', cat: 'nefrologia', tags: [],
    n: 'Relación urea/creatinina', sig: 'BUN/Cr', syn: ['relacion bun creatinina', 'azoemia prerrenal', 'hemorragia digestiva'],
    tipo: 'índice',
    fin: 'Relación entre urea (o BUN) y creatinina séricas; informa ambas expresiones.',
    ver: 'Cálculo directo; BUN = urea / 2,14',
    formula: 'Relación urea/Cr = urea (mg/dL) / Cr (mg/dL)\nRelación BUN/Cr = [urea / 2,14] / Cr\n(si se ingresa BUN, se convierte a urea × 2,14)',
    in: [num('urea', 'Urea (o BUN con la unidad alternativa)', 'mg/dL', 1, 800, { alt: [U.bun_mgdl, U.urea_mmol] }), num('cr', 'Creatinina sérica', 'mg/dL', 0.1, 25, { step: 0.01, alt: [U.creat_umol] })],
    calc: v => { const bun = v.urea / 2.14; return { r: rd(bun / v.cr, 1), u: '', d: 1, lab: 'BUN/creatinina', more: [['Urea/creatinina', fm(v.urea / v.cr, 1)], ['BUN equivalente', fm(bun, 1) + ' mg/dL']], note: 'Clásicamente BUN/Cr > 20 (urea/Cr > ~43) se asoció a azoemia prerrenal o hemorragia digestiva alta, pero su precisión diagnóstica es baja.' }; },
    ref: 'Uchino S, Bellomo R, Goldsmith D. The meaning of the blood urea nitrogen/creatinine ratio in acute kidney injury. Clin Kidney J. 2012;5:187–191.',
    url: 'https://doi.org/10.1093/ckj/sfs013', verif: '2026-10',
    pop: 'Adultos.', lim: 'La urea aumenta con hipercatabolismo, corticoides, sangrado digestivo, dieta hiperproteica y nutrición enteral; baja con hepatopatía y desnutrición. No discrimina con precisión prerrenal de NTA. Atención a la unidad: urea ≠ BUN (urea = BUN × 2,14).',
    tests: [{ v: { urea: 120, cr: 2 }, r: 28 }, { v: { urea: 42.8, cr: 1 }, r: 20 }]
  },
  {
    id: 'upcr', m: 'f', cat: 'nefrologia', tags: [],
    n: 'Relación proteína/creatinina urinaria', sig: 'UPCR', syn: ['proteinuria', 'indice proteina creatinina', 'muestra aislada'],
    tipo: 'cálculo',
    fin: 'Estima la proteinuria a partir de una muestra aislada de orina; clasifica según categorías KDIGO.',
    ver: 'KDIGO 2012/2024 (categorías A1–A3 equivalentes)',
    formula: 'UPCR (mg/g) = proteína u (mg/dL) / creatinina u (mg/dL) × 1000\nmg/mmol = mg/g / 8,84',
    in: [num('prot', 'Proteína urinaria', 'mg/dL', 0.1, 5000, { step: 0.1, alt: [{ u: 'g/L', f: x => x * 100 }] }), num('ucr', 'Creatinina urinaria', 'mg/dL', 1, 1000, { alt: [CRU] })],
    calc: v => { const r = v.prot / v.ucr * 1000; return { r: rd(r, 0), u: 'mg/g', d: 0, lab: 'Proteína/creatinina', ...band(r, [[0, 149.999, '< 150 mg/g: normal a levemente aumentada (equivale a A1)', 'ok'], [150, 500, '150–500 mg/g: moderadamente aumentada (equivale a A2)', 'warn'], [500.001, 1e9, '> 500 mg/g: gravemente aumentada (equivale a A3)', 'bad']]), more: [['En mg/mmol', fm(r / 8.84, 1)], ['Estimación aproximada', fm(r / 1000, 2) + ' g/día']] }; },
    ref: KDIGO_REF + ' KDIGO 2012 Clinical Practice Guideline for the Evaluation and Management of CKD. Kidney Int Suppl. 2013;3:1–150.',
    url: 'https://doi.org/10.1016/j.kint.2023.10.018', verif: '2026-10',
    pop: 'Adultos.', lim: 'La equivalencia mg/g ≈ g/día asume una excreción de creatinina de ~1 g/día; falla con masa muscular extrema. Preferir la primera orina de la mañana. Fiebre, ejercicio, ITU e hiperglucemia elevan transitoriamente la proteinuria.',
    tests: [{ v: { prot: 50, ucr: 100 }, r: 500 }, { v: { prot: 15, ucr: 150 }, r: 100 }]
  },
  {
    id: 'uacr', m: 'f', cat: 'nefrologia', tags: ['f:endocrino', 'f:cardiologia'],
    n: 'Relación albúmina/creatinina urinaria', sig: 'UACR', syn: ['microalbuminuria', 'albuminuria', 'rac', 'cociente albumina creatinina'],
    tipo: 'clasificación',
    fin: 'Cuantifica la albuminuria en una muestra aislada y la clasifica en categorías KDIGO A1–A3.',
    ver: 'KDIGO 2012/2024',
    formula: 'UACR (mg/g) = albúmina u (mg/L) / creatinina u (mg/dL) × 100\nmg/mmol = mg/g / 8,84\nA1 < 30 · A2 30–300 · A3 > 300 mg/g',
    in: [num('alb', 'Albúmina urinaria', 'mg/L', 0.1, 20000, { step: 0.1, alt: [{ u: 'mg/dL', f: x => x * 10 }] }), num('ucr', 'Creatinina urinaria', 'mg/dL', 1, 1000, { alt: [CRU] })],
    calc: v => { const r = v.alb / v.ucr * 100; return { r: rd(r, 1), u: 'mg/g', d: 1, lab: 'Albúmina/creatinina', ...band(r, [[0, 29.999, 'A1 (< 30 mg/g): normal a levemente aumentada', 'ok'], [30, 300, 'A2 (30–300 mg/g): moderadamente aumentada', 'warn'], [300.001, 1e9, 'A3 (> 300 mg/g): gravemente aumentada', 'bad']]), more: [['En mg/mmol', fm(r / 8.84, 1)]], note: 'La categoría requiere confirmación (2 de 3 muestras en 3–6 meses).' }; },
    ref: KDIGO_REF, url: 'https://doi.org/10.1016/j.kint.2023.10.018', verif: '2026-10',
    pop: 'Adultos.', lim: 'Variabilidad biológica alta: confirmar con muestras repetidas. Fiebre, ejercicio intenso, ITU, insuficiencia cardíaca e hiperglucemia marcada la elevan transitoriamente.',
    tests: [{ v: { alb: 30, ucr: 100 }, r: 30 }, { v: { alb: 10, ucr: 200 }, r: 5 }, { v: { alb: 400, ucr: 80 }, r: 'A3' }]
  },
  {
    id: 'clearance-agua-libre', m: 'f', cat: 'nefrologia', tags: ['f:medio-interno', 'f:neuro'],
    n: 'Clearance de agua libre', sig: 'CH₂O', syn: ['agua libre', 'diabetes insipida', 'poliuria'],
    tipo: 'cálculo',
    fin: 'Estima el volumen de agua libre de solutos que el riñón excreta (positivo) o reabsorbe (negativo).',
    ver: 'Definición clásica basada en osmolalidad',
    formula: 'CH₂O = V × (1 − Osm u / Osm pl)',
    in: [num('vol', 'Volumen de orina', 'mL', 1, 30000), num('h', 'Período', 'h', 0.5, 48, { step: 0.5 }), num('uosm', 'Osmolalidad urinaria', 'mOsm/kg', 20, 1500), num('posm', 'Osmolalidad plasmática', 'mOsm/kg', 200, 450)],
    calc: v => { const c = v.vol * (1 - v.uosm / v.posm); return { r: rd(c / v.h * 24 / 1000, 2), u: 'L/día', d: 2, lab: 'Clearance de agua libre', more: [['En el período', fm(c, 0) + ' mL en ' + fm(v.h, 1) + ' h'], ['Clearance osmolar', fm(v.vol * v.uosm / v.posm / v.h * 24 / 1000, 2) + ' L/día']], interp: c > 0 ? 'Positivo: excreción neta de agua libre' : c < 0 ? 'Negativo: reabsorción neta de agua libre' : 'Cero: orina isoosmolar' }; },
    ref: 'Rose BD, Post TW. Clinical Physiology of Acid-Base and Electrolyte Disorders. 5.ª ed. McGraw-Hill; 2001.', verif: '2026-10',
    pop: 'General.', lim: 'Incluye la urea, que no influye sobre la natremia: para predecir el efecto sobre el Na⁺ es mejor el clearance de agua libre de electrolitos.',
    tests: [{ v: { vol: 2000, h: 24, uosm: 600, posm: 290 }, r: -2.14 }, { v: { vol: 6000, h: 24, uosm: 100, posm: 300 }, r: 4 }]
  },
  {
    id: 'clearance-agua-libre-electrolitos', m: 'f', cat: 'nefrologia', tags: ['f:medio-interno', 'f:neuro'],
    n: 'Clearance de agua libre de electrolitos', sig: 'CeH₂O', syn: ['agua libre de electrolitos', 'hiponatremia', 'hipernatremia'],
    tipo: 'cálculo',
    fin: 'Estima el agua libre de electrolitos excretada; predice mejor que el clearance osmolar el efecto de la diuresis sobre la natremia.',
    ver: 'Rose 1986',
    formula: 'CeH₂O = V × [1 − (Na⁺u + K⁺u) / Na⁺ pl]',
    in: [num('vol', 'Volumen de orina', 'mL', 1, 30000), num('h', 'Período', 'h', 0.5, 48, { step: 0.5 }), num('una', 'Na⁺ urinario', 'mEq/L', 0, 400), num('uk', 'K⁺ urinario', 'mEq/L', 0, 400), num('pna', 'Na⁺ plasmático', 'mEq/L', 90, 200)],
    calc: v => { const c = v.vol * (1 - (v.una + v.uk) / v.pna); return { r: rd(c / v.h * 24 / 1000, 2), u: 'L/día', d: 2, lab: 'Clearance de agua libre de electrolitos', more: [['En el período', fm(c, 0) + ' mL en ' + fm(v.h, 1) + ' h']], interp: c > 0 ? 'Positivo: la diuresis tiende a aumentar la natremia' : c < 0 ? 'Negativo: la diuresis tiende a disminuir la natremia' : 'Cero: la diuresis no modifica la natremia' }; },
    ref: 'Rose BD. New approach to disturbances in the plasma sodium concentration. Am J Med. 1986;81:1033–1040.',
    url: 'https://doi.org/10.1016/0002-9343(86)90401-8', verif: '2026-10',
    pop: 'Disnatremias.', lim: 'No incluye las pérdidas insensibles ni los aportes, que también modifican la natremia. Los electrolitos urinarios pueden cambiar rápido: repetir.',
    tests: [{ v: { vol: 2000, h: 24, una: 50, uk: 20, pna: 140 }, r: 1 }, { v: { vol: 1000, h: 12, una: 150, uk: 30, pna: 120 }, r: -1 }]
  },
  {
    id: 'ktv', m: 'f', cat: 'nefrologia', tags: ['s:nefrologia'],
    n: 'Kt/V (Daugirdas de segunda generación, single-pool)', sig: 'spKt/V', syn: ['dosis de dialisis', 'adecuacion de hemodialisis', 'daugirdas'],
    tipo: 'cálculo',
    fin: 'Estima la dosis de hemodiálisis entregada en una sesión.',
    ver: 'Daugirdas 1993 (segunda generación); objetivos KDOQI 2015',
    formula: 'spKt/V = −ln(R − 0,008 × t) + (4 − 3,5 × R) × UF / P\nR = urea posdiálisis / urea prediálisis; t = horas; UF = litros ultrafiltrados; P = peso posdiálisis (kg)',
    in: [num('pre', 'Urea (o BUN) prediálisis', 'mg/dL', 5, 800, { alt: [U.urea_mmol] }), num('post', 'Urea (o BUN) posdiálisis', 'mg/dL', 1, 800, { alt: [U.urea_mmol] }), num('t', 'Duración de la sesión', 'h', 0.5, 12, { step: 0.05 }), num('uf', 'Ultrafiltración', 'L', 0, 10, { step: 0.1 }), PESO('peso', 'Peso posdiálisis')],
    calc: v => { const R = v.post / v.pre; const a = R - 0.008 * v.t; if (R >= 1 || a <= 0) return null; const k = -Math.log(a) + (4 - 3.5 * R) * v.uf / v.peso; return { r: rd(k, 2), u: '', d: 2, lab: 'spKt/V', ...band(k, [[-1e9, 1.1999, '< 1,2: por debajo de la dosis mínima KDOQI (3 sesiones/semana)', 'bad'], [1.2, 1.3999, '1,2–1,39: alcanza el mínimo pero no el objetivo KDOQI de 1,4', 'warn'], [1.4, 1e9, '≥ 1,4: alcanza el objetivo KDOQI (3 sesiones/semana)', 'ok']]), more: [['URR', fm((1 - R) * 100, 1) + ' %']] }; },
    ref: 'Daugirdas JT. Second generation logarithmic estimates of single-pool variable volume Kt/V: an analysis of error. J Am Soc Nephrol. 1993;4:1205–1213. National Kidney Foundation. KDOQI Clinical Practice Guideline for Hemodialysis Adequacy: 2015 update. Am J Kidney Dis. 2015;66:884–930.',
    url: 'https://doi.org/10.1053/j.ajkd.2015.07.015', verif: '2026-10',
    pop: 'Adultos en hemodiálisis crónica tres veces por semana.', lim: 'Los objetivos (≥ 1,4; mínimo 1,2) son para esquemas de 3 sesiones semanales. La muestra posdiálisis debe tomarse con técnica estandarizada (bajo flujo) para evitar el efecto de recirculación. Urea y BUN dan el mismo cociente, pero pre y post deben estar en la misma unidad.',
    tests: [{ v: { pre: 60, post: 20, t: 4, uf: 3, peso: 70 }, r: 1.32 }, { v: { pre: 150, post: 40, t: 4, uf: 2, peso: 60 }, r: 1.55 }]
  },
  {
    id: 'urr', m: 'f', cat: 'nefrologia', tags: ['s:nefrologia'],
    n: 'Tasa de reducción de urea', sig: 'URR', syn: ['porcentaje de reduccion de urea', 'pru', 'adecuacion de dialisis'],
    tipo: 'cálculo',
    fin: 'Porcentaje de descenso de la urea durante una sesión de hemodiálisis.',
    ver: 'KDOQI 2006',
    formula: 'URR (%) = (urea pre − urea post) / urea pre × 100',
    in: [num('pre', 'Urea (o BUN) prediálisis', 'mg/dL', 5, 800, { alt: [U.urea_mmol] }), num('post', 'Urea (o BUN) posdiálisis', 'mg/dL', 1, 800, { alt: [U.urea_mmol] })],
    calc: v => { if (v.post >= v.pre) return { r: '—', interp: 'La urea posdiálisis debe ser menor que la prediálisis', lvl: 'bad' }; const u = (v.pre - v.post) / v.pre * 100; return { r: rd(u, 1), u: '%', d: 1, lab: 'URR', ...(u >= 65 ? { interp: '≥ 65 %: alcanza el mínimo KDOQI 2006', lvl: 'ok' } : { interp: '< 65 %: por debajo del mínimo KDOQI 2006', lvl: 'bad' }) }; },
    ref: 'National Kidney Foundation. KDOQI Clinical Practice Guidelines for Hemodialysis Adequacy, update 2006. Am J Kidney Dis. 2006;48(Suppl 1):S2–S90.',
    url: 'https://doi.org/10.1053/j.ajkd.2006.03.051', verif: '2026-10',
    pop: 'Adultos en hemodiálisis crónica tres veces por semana.', lim: 'No considera la ultrafiltración ni la generación de urea durante la sesión: el Kt/V es la medida preferida. Requiere muestra posdiálisis con técnica estandarizada.',
    tests: [{ v: { pre: 60, post: 20 }, r: 66.7 }, { v: { pre: 100, post: 40 }, r: 60 }]
  },

  // =====================================================================
  // ANTROPOMETRÍA
  // =====================================================================
  {
    id: 'imc', m: 'f', cat: 'antropometria', tags: ['f:nutricion', 'f:obstetricia'],
    n: 'Índice de masa corporal', sig: 'IMC', syn: ['bmi', 'quetelet', 'obesidad', 'sobrepeso'],
    tipo: 'índice',
    fin: 'Relación peso/talla²; clasifica el estado nutricional en adultos según la OMS.',
    ver: 'Clasificación OMS 2000',
    formula: 'IMC = peso (kg) / talla (m)²',
    in: [PESO(), TALLA()],
    calc: v => { const i = v.peso / (v.talla / 100) ** 2; return { r: rd(i, 1), u: 'kg/m²', d: 1, lab: 'IMC', ...band(i, [[0, 18.4999, 'Bajo peso (< 18,5)', 'warn'], [18.5, 24.9999, 'Rango normal (18,5–24,9)', 'ok'], [25, 29.9999, 'Sobrepeso / preobesidad (25–29,9)', 'warn'], [30, 34.9999, 'Obesidad clase I (30–34,9)', 'bad'], [35, 39.9999, 'Obesidad clase II (35–39,9)', 'bad'], [40, 1e9, 'Obesidad clase III (≥ 40)', 'bad']]) }; },
    ref: 'World Health Organization. Obesity: preventing and managing the global epidemic. Report of a WHO consultation. WHO Technical Report Series 894. Ginebra: OMS; 2000.',
    url: 'https://iris.who.int/handle/10665/42330', verif: '2026-10',
    pop: 'Adultos (≥ 18–20 años). En embarazo se usa el IMC pregestacional.', lim: 'No distingue masa grasa de magra ni la distribución de la grasa. En niños y adolescentes usar percentilos o puntaje Z por edad y sexo. Algunas poblaciones asiáticas tienen mayor riesgo a IMC más bajos.',
    tests: [{ v: { peso: 70, talla: 170 }, r: 24.2 }, { v: { peso: 95, talla: 170 }, r: 'Obesidad clase I' }]
  },
  {
    id: 'sc-mosteller', m: 'f', cat: 'antropometria', tags: ['f:farmacos', 'f:pediatria', 'f:obstetricia'],
    n: 'Superficie corporal (Mosteller)', sig: 'SC', syn: ['bsa', 'superficie corporal', 'm2'],
    tipo: 'estimación',
    fin: 'Estima la superficie corporal para dosificación e indexación de parámetros fisiológicos.',
    ver: 'Mosteller 1987',
    formula: 'SC (m²) = √(talla [cm] × peso [kg] / 3600)',
    in: [PESO(), TALLA()],
    calc: v => ({ r: rd(mosteller(v.peso, v.talla), 2), u: 'm²', d: 2, lab: 'Superficie corporal' }),
    ref: 'Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317:1098.',
    url: 'https://doi.org/10.1056/NEJM198710223171717', verif: '2026-10',
    pop: 'Adultos y niños (simplificación de Gehan y George).', lim: 'Diferencias menores con Du Bois y otras fórmulas; mayores en obesidad extrema y lactantes. Verificar qué fórmula exige el protocolo.',
    tests: [{ v: { peso: 70, talla: 170 }, r: 1.82 }, { v: { peso: 20, talla: 110 }, r: 0.78 }]
  },
  {
    id: 'sc-dubois', m: 'f', cat: 'antropometria', tags: ['f:farmacos'],
    n: 'Superficie corporal (Du Bois)', sig: 'SC', syn: ['bsa', 'du bois'],
    tipo: 'estimación',
    fin: 'Estima la superficie corporal con la fórmula clásica de Du Bois.',
    ver: 'Du Bois y Du Bois 1916',
    formula: 'SC (m²) = 0,007184 × peso [kg]^0,425 × talla [cm]^0,725',
    in: [PESO(), TALLA()],
    calc: v => ({ r: rd(0.007184 * v.peso ** 0.425 * v.talla ** 0.725, 2), u: 'm²', d: 2, lab: 'Superficie corporal', more: [['Mosteller (comparación)', fm(mosteller(v.peso, v.talla), 2) + ' m²']] }),
    ref: 'Du Bois D, Du Bois EF. A formula to estimate the approximate surface area if height and weight be known. Arch Intern Med. 1916;17:863–871.',
    url: 'https://doi.org/10.1001/archinte.1916.00080130010002', verif: '2026-10',
    pop: 'Derivada en 9 sujetos adultos.', lim: 'Muestra de derivación muy pequeña; subestima la SC en obesidad y en niños pequeños.',
    tests: [{ v: { peso: 70, talla: 170 }, r: 1.81 }, { v: { peso: 100, talla: 180 }, r: 2.2 }]
  },
  {
    id: 'peso-ideal', m: 'f', cat: 'antropometria', tags: ['f:farmacos', 'f:nutricion'],
    n: 'Peso ideal', sig: 'PI', syn: ['ibw', 'devine', 'robinson', 'miller', 'hamwi'],
    tipo: 'estimación',
    fin: 'Estima el peso ideal según la fórmula elegida (Devine, Robinson, Miller o Hamwi).',
    ver: 'Devine 1974 · Robinson 1983 · Miller 1983 · Hamwi 1964',
    formula: 'Peso (kg) = base + incremento × (talla en pulgadas − 60)\nDevine: H 50 + 2,3 · M 45,5 + 2,3\nRobinson: H 52 + 1,9 · M 49 + 1,7\nMiller: H 56,2 + 1,41 · M 53,1 + 1,36\nHamwi: H 48 + 2,7 · M 45,5 + 2,2\n(1 pulgada = 2,54 cm)',
    in: [{ t: 'sel', id: 'f', l: 'Fórmula', o: [['devine', 'Devine'], ['robinson', 'Robinson'], ['miller', 'Miller'], ['hamwi', 'Hamwi']] }, SEXO, TALLA()],
    calc: v => { const C = { devine: { m: [50, 2.3], f: [45.5, 2.3] }, robinson: { m: [52, 1.9], f: [49, 1.7] }, miller: { m: [56.2, 1.41], f: [53.1, 1.36] }, hamwi: { m: [48, 2.7], f: [45.5, 2.2] } }; const [b, k] = C[v.f][v.sexo]; const p = b + k * (v.talla / 2.54 - 60); return { r: rd(p, 1), u: 'kg', d: 1, lab: 'Peso ideal (' + v.f.charAt(0).toUpperCase() + v.f.slice(1) + ')', note: v.talla < 152.4 ? 'Talla < 152,4 cm (60 pulgadas): las fórmulas no están diseñadas para este rango y el resultado es poco confiable.' : '' }; },
    ref: 'Pai MP, Paloucek FP. The origin of the «ideal» body weight equations. Ann Pharmacother. 2000;34:1066–1069 (revisión de Devine 1974, Robinson 1983, Miller 1983 y Hamwi 1964).',
    url: 'https://doi.org/10.1345/aph.19381', verif: '2026-10',
    pop: 'Adultos; derivadas de tablas actuariales y para dosificación (Devine: gentamicina).', lim: 'No son «ideales» en sentido fisiológico; ninguna se validó formalmente para dosificación. No válidas por debajo de 152,4 cm ni en niños. Indicar siempre cuál se usó.',
    tests: [{ v: { f: 'devine', sexo: 'm', talla: 180 }, r: 75 }, { v: { f: 'robinson', sexo: 'f', talla: 165 }, r: 57.4 }, { v: { f: 'miller', sexo: 'm', talla: 175 }, r: 68.7 }, { v: { f: 'hamwi', sexo: 'f', talla: 160 }, r: 52.1 }]
  },
  {
    id: 'peso-predicho-ardsnet', m: 'f', cat: 'antropometria', tags: ['f:respiratorio'],
    n: 'Peso corporal predicho (ARDSNet)', sig: 'PBW', syn: ['peso predicho', 'pbw', 'ventilacion protectora'],
    tipo: 'estimación',
    fin: 'Calcula el peso corporal predicho por sexo y talla, usado para fijar el volumen corriente.',
    ver: 'ARDS Network 2000',
    formula: 'PBW hombres = 50 + 0,91 × (talla [cm] − 152,4)\nPBW mujeres = 45,5 + 0,91 × (talla [cm] − 152,4)',
    in: [SEXO, TALLA()],
    calc: v => { const p = pbwArds(v.sexo, v.talla); return { r: rd(p, 1), u: 'kg', d: 1, lab: 'Peso corporal predicho', more: [['VT 6 mL/kg', fm(6 * p, 0) + ' mL'], ['VT 8 mL/kg', fm(8 * p, 0) + ' mL']], note: v.talla < 152.4 ? 'Talla < 152,4 cm: fuera del rango de la fórmula.' : '' }; },
    ref: 'Acute Respiratory Distress Syndrome Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome. N Engl J Med. 2000;342:1301–1308.',
    url: 'https://doi.org/10.1056/NEJM200005043421801', verif: '2026-10',
    pop: 'Adultos en ventilación mecánica.', lim: 'Depende de la talla medida; no válido en niños ni en tallas muy bajas.',
    tests: [{ v: { sexo: 'm', talla: 175 }, r: 70.6 }, { v: { sexo: 'f', talla: 160 }, r: 52.4 }]
  },
  {
    id: 'peso-ajustado', m: 'f', cat: 'antropometria', tags: ['f:farmacos', 'f:nutricion'],
    n: 'Peso ajustado en obesidad', sig: 'PA', syn: ['abw', 'adjusted body weight', 'peso de dosificacion'],
    tipo: 'estimación',
    fin: 'Estima un peso intermedio entre el ideal y el real para dosificar ciertos fármacos en obesidad.',
    ver: 'Peso ideal (Devine) + factor × exceso de peso; factor seleccionable (habitual 0,4)',
    formula: 'Peso ajustado = PI + factor × (peso real − PI)\nPI (Devine) = 50 (H) / 45,5 (M) + 2,3 × (pulgadas − 60)',
    in: [SEXO, TALLA(), PESO('peso', 'Peso real'), { t: 'sel', id: 'fac', l: 'Factor', o: [['0.4', '0,4 (el más usado; p. ej., aminoglucósidos)'], ['0.3', '0,3'], ['0.25', '0,25']] }],
    calc: v => { const ibw = ibwDevine(v.sexo, v.talla); const f = +v.fac; const a = ibw + f * (v.peso - ibw); return { r: rd(a, 1), u: 'kg', d: 1, lab: 'Peso ajustado', more: [['Peso ideal (Devine)', fm(ibw, 1) + ' kg'], ['Factor usado', fm(f, 2)], ['Peso real / ideal', fm(v.peso / ibw * 100, 0) + ' %']], note: v.peso < ibw * 1.2 ? 'El peso real es < 120 % del ideal: el peso ajustado suele reservarse para pesos ≥ 120 % del ideal.' : '' }; },
    ref: 'Bauer LA, Edwards WA, Dellinger EP, Simonowitz DA. Influence of weight on aminoglycoside pharmacokinetics in normal weight and morbidly obese patients. Eur J Clin Pharmacol. 1983;24:643–647. Erstad BL. Dosing of medications in morbidly obese patients in the intensive care unit setting. Intensive Care Med. 2004;30:18–32.',
    url: 'https://doi.org/10.1007/BF00542215', verif: '2026-10',
    pop: 'Adultos con obesidad (peso ≥ 120 % del ideal).', lim: 'El factor depende del fármaco (0,4 se derivó para aminoglucósidos); la ficha técnica o el protocolo definen qué peso usar. No es un peso «nutricional» validado universalmente.',
    tests: [{ v: { sexo: 'm', talla: 175, peso: 120, fac: '0.4' }, r: 90.3 }, { v: { sexo: 'f', talla: 160, peso: 100, fac: '0.3' }, r: 66.9 }]
  },
  {
    id: 'peso-magro', m: 'f', cat: 'antropometria', tags: ['f:farmacos'],
    n: 'Peso magro', sig: 'LBW', syn: ['masa magra', 'lean body weight', 'janmahasatian', 'boer'],
    tipo: 'estimación',
    fin: 'Estima el peso magro (masa libre de grasa) para dosificación en obesidad y normalización de volúmenes.',
    ver: 'Janmahasatian 2005 o Boer 1984 (seleccionable)',
    formula: 'Janmahasatian: H = 9270 × peso / (6680 + 216 × IMC) · M = 9270 × peso / (8780 + 244 × IMC)\nBoer: H = 0,407 × peso + 0,267 × talla [cm] − 19,2 · M = 0,252 × peso + 0,473 × talla − 48,3',
    in: [{ t: 'sel', id: 'f', l: 'Fórmula', o: [['jan', 'Janmahasatian 2005'], ['boer', 'Boer 1984']] }, SEXO, PESO(), TALLA()],
    calc: v => { const imc = v.peso / (v.talla / 100) ** 2; const m = v.sexo == 'm'; const l = v.f == 'jan' ? 9270 * v.peso / ((m ? 6680 : 8780) + (m ? 216 : 244) * imc) : m ? 0.407 * v.peso + 0.267 * v.talla - 19.2 : 0.252 * v.peso + 0.473 * v.talla - 48.3; return { r: rd(l, 1), u: 'kg', d: 1, lab: 'Peso magro (' + (v.f == 'jan' ? 'Janmahasatian' : 'Boer') + ')', more: [['IMC', fm(imc, 1) + ' kg/m²'], ['% del peso total', fm(l / v.peso * 100, 0) + ' %']] }; },
    ref: 'Janmahasatian S, Duffull SB, Ash S, Ward LC, Byrne NM, Green B. Quantification of lean bodyweight. Clin Pharmacokinet. 2005;44:1051–1065. Boer P. Estimated lean body mass as an index for normalization of body fluid volumes in humans. Am J Physiol. 1984;247:F632–F636.',
    url: 'https://doi.org/10.2165/00003088-200544100-00004', verif: '2026-10',
    pop: 'Janmahasatian: adultos con IMC 17–67 (referencia DEXA). Boer: adultos.', lim: 'No válidas con alteraciones marcadas del agua corporal (edema, ascitis), en atletas muy musculosos ni en niños. Boer pierde precisión en obesidad extrema.',
    tests: [{ v: { f: 'jan', sexo: 'm', peso: 80, talla: 180 }, r: 61.7 }, { v: { f: 'boer', sexo: 'm', peso: 80, talla: 180 }, r: 61.4 }, { v: { f: 'jan', sexo: 'f', peso: 100, talla: 165 }, r: 52.3 }]
  },
  {
    id: 'agua-corporal-total', m: 'f', cat: 'antropometria', tags: ['f:medio-interno'],
    n: 'Agua corporal total', sig: 'ACT', syn: ['tbw', 'watson', 'total body water'],
    tipo: 'estimación',
    fin: 'Estima el agua corporal total por la fórmula de Watson o por fracción del peso.',
    ver: 'Watson 1980 o fracción del peso (Adrogué–Madias)',
    formula: 'Watson hombres: 2,447 − 0,09516 × edad + 0,1074 × talla [cm] + 0,3362 × peso [kg]\nWatson mujeres: −2,097 + 0,1069 × talla + 0,2466 × peso\nFracción: peso × 0,6 (niño u hombre < 65) · 0,5 (mujer < 65 u hombre ≥ 65) · 0,45 (mujer ≥ 65)',
    in: [{ t: 'sel', id: 'met', l: 'Método', o: [['watson', 'Watson 1980'], ['frac', 'Fracción del peso']] }, PESO(), SEXO, num('edad', 'Edad', 'años', 1, 120), TALLA('talla', 'Talla (para Watson)', { req: 0 })],
    calc: v => {
      if (v.met == 'watson') { if (v.talla == null) return null; const t = v.sexo == 'm' ? 2.447 - 0.09516 * v.edad + 0.1074 * v.talla + 0.3362 * v.peso : -2.097 + 0.1069 * v.talla + 0.2466 * v.peso; return { r: rd(t, 1), u: 'L', d: 1, lab: 'Agua corporal total (Watson)', more: [['Fracción del peso', fm(t / v.peso, 2)]], note: v.edad < 18 ? 'Watson se derivó en adultos.' : '' }; }
      const f = v.edad < 18 ? 0.6 : v.sexo == 'm' ? (v.edad >= 65 ? 0.5 : 0.6) : (v.edad >= 65 ? 0.45 : 0.5);
      return { r: rd(v.peso * f, 1), u: 'L', d: 1, lab: 'Agua corporal total (fracción)', more: [['Fracción usada', fm(f, 2)]] };
    },
    ref: 'Watson PE, Watson ID, Batt RD. Total body water volumes for adult males and females estimated from simple anthropometric measurements. Am J Clin Nutr. 1980;33:27–39. ' + AM_REF,
    url: 'https://doi.org/10.1093/ajcn/33.1.27', verif: '2026-10',
    pop: 'Watson: adultos (referencia por dilución isotópica).', lim: 'Estimaciones poblacionales: alteradas por edema, deshidratación, obesidad y caquexia. La fracción 0,6 en niños se refiere a niños mayores; los lactantes tienen más agua corporal.',
    tests: [{ v: { met: 'watson', peso: 70, sexo: 'm', edad: 40, talla: 175 }, r: 41 }, { v: { met: 'watson', peso: 60, sexo: 'f', edad: 30, talla: 160 }, r: 29.8 }, { v: { met: 'frac', peso: 70, sexo: 'f', edad: 70 }, r: 31.5 }]
  },
  {
    id: 'perdida-peso', m: 'f', cat: 'antropometria', tags: ['f:nutricion'],
    n: 'Porcentaje de pérdida de peso', sig: '', syn: ['perdida de peso involuntaria', 'glim', 'desnutricion'],
    tipo: 'cálculo',
    fin: 'Calcula el porcentaje de pérdida de peso respecto del peso habitual y lo compara con los criterios fenotípicos GLIM.',
    ver: 'Criterios GLIM 2019',
    formula: '% pérdida = (peso habitual − peso actual) / peso habitual × 100\nGLIM: > 5 % en los últimos 6 meses o > 10 % en más de 6 meses\nGravedad: moderada 5–10 % (≤ 6 m) o 10–20 % (> 6 m); grave > 10 % (≤ 6 m) o > 20 % (> 6 m)',
    in: [PESO('hab', 'Peso habitual'), PESO('act', 'Peso actual'), { t: 'sel', id: 'per', l: 'Período de la pérdida', o: [['le6', 'Últimos 6 meses'], ['gt6', 'Más de 6 meses']] }],
    calc: v => {
      const p = (v.hab - v.act) / v.hab * 100; const o = { r: rd(p, 1), u: '%', d: 1, lab: 'Pérdida de peso', note: 'GLIM requiere además un criterio etiológico (ingesta reducida o inflamación/enfermedad) para diagnosticar desnutrición.' };
      if (p <= 0) return { ...o, interp: 'Sin pérdida de peso' };
      const [m, s] = v.per == 'le6' ? [5, 10] : [10, 20];
      if (p > s) return { ...o, interp: 'Cumple el criterio fenotípico GLIM de pérdida de peso, en rango de desnutrición grave', lvl: 'bad' };
      if (p > m) return { ...o, interp: 'Cumple el criterio fenotípico GLIM de pérdida de peso, en rango de desnutrición moderada', lvl: 'warn' };
      return { ...o, interp: 'No alcanza el criterio GLIM de pérdida de peso', lvl: 'ok' };
    },
    ref: 'Cederholm T, Jensen GL, Correia MITD, et al. GLIM criteria for the diagnosis of malnutrition — A consensus report from the global clinical nutrition community. Clin Nutr. 2019;38:1–9.',
    url: 'https://doi.org/10.1016/j.clnu.2018.08.002', verif: '2026-10',
    pop: 'Adultos.', lim: 'Depende de un peso habitual confiable (a menudo referido). Edema, ascitis o deshidratación distorsionan el peso. No es un diagnóstico por sí solo.',
    tests: [{ v: { hab: 80, act: 72, per: 'le6' }, r: 10 }, { v: { hab: 80, act: 72, per: 'le6' }, r: 'moderada' }, { v: { hab: 70, act: 52, per: 'gt6' }, r: 'grave' }]
  },
  {
    id: 'cambio-peso-internacion', m: 'f', cat: 'antropometria', tags: ['f:nutricion', 'f:fluidos'],
    n: 'Cambio porcentual de peso durante la internación', sig: '', syn: ['variacion de peso', 'peso diario'],
    tipo: 'cálculo',
    fin: 'Calcula la variación porcentual del peso respecto del peso de ingreso.',
    ver: 'Cálculo aritmético',
    formula: 'Cambio (%) = (peso actual − peso de ingreso) / peso de ingreso × 100',
    in: [PESO('ing', 'Peso al ingreso'), PESO('act', 'Peso actual'), num('dias', 'Días de internación (opcional)', 'días', 0, 1000, { req: 0 })],
    calc: v => { const c = (v.act - v.ing) / v.ing * 100; const more = [['Diferencia', (v.act - v.ing > 0 ? '+' : '') + fm(v.act - v.ing, 1) + ' kg']]; if (v.dias) more.push(['Por día', fm((v.act - v.ing) / v.dias, 2) + ' kg/día']); return { r: rd(c, 1), u: '%', d: 1, lab: 'Cambio de peso', interp: c > 0 ? 'Aumento de peso' : c < 0 ? 'Descenso de peso' : 'Sin cambio', more, note: 'Los cambios rápidos de peso en la internación suelen reflejar agua (balance, edema), no masa tisular.' }; },
    ref: 'Cálculo aritmético.', verif: '2026-10',
    pop: 'Pacientes internados.', lim: 'Pesar en las mismas condiciones (misma balanza, hora y ropa). En críticos, el peso refleja sobre todo el balance hídrico.',
    tests: [{ v: { ing: 70, act: 66.5 }, r: -5 }, { v: { ing: 60, act: 63, dias: 6 }, r: 5 }]
  }
];
