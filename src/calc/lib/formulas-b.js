// Fórmulas (m: 'f') — cardiología, neuro, hematología, gastro, endocrino, nutrición, obstetricia, pediatría, epidemiología.
// Verificación: 2026-10. Ver docs/ESQUEMA_CALCULADORAS.md.
import { rd, band, days, U } from '../h.js';

// ───────────────────────── ayudas locales ─────────────────────────
const fx = (x, d = 1) => { const r = rd(x, d); return r == null ? '—' : String(r).replace('.', ','); };
const pc = (p, d = 1) => fx(p * 100, d) + ' %';
const isoHoy = () => { const t = new Date(); return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0'); };
const sumarDias = (iso, n) => { const [y, m, d] = iso.split('-').map(Number); const t = new Date(Date.UTC(y, m - 1, d) + n * 864e5); return String(t.getUTCDate()).padStart(2, '0') + '/' + String(t.getUTCMonth() + 1).padStart(2, '0') + '/' + t.getUTCFullYear(); };
const Z95 = 1.959964;

// Unidades alternativas propias
const A = {
  k_ul: { u: '×10³/µL', f: x => x * 1000 },
  g9_l: { u: '×10⁹/L', f: x => x * 1000 },
  fe_umol: { u: 'µmol/L', f: x => x * 5.585 },     // hierro → µg/dL (PM 55,85)
  col_mmol: { u: 'mmol/L', f: x => x * 38.67 },    // colesterol → mg/dL
  tg_mmol: { u: 'mmol/L', f: x => x * 88.57 },     // triglicéridos → mg/dL
  mm_cm: { u: 'mm', f: x => x / 10 },              // → cm
  mv_mm: { u: 'mV', f: x => x * 10 }               // → mm (calibración 10 mm/mV)
};

// IC de Wilson para una proporción x/n
function wilson(x, n, z = Z95) {
  if (!(n > 0)) return null;
  const p = x / n, z2 = z * z, den = 1 + z2 / n;
  const c = (p + z2 / (2 * n)) / den, h = (z * Math.sqrt(p * (1 - p) / n + z2 / (4 * n * n))) / den;
  return [Math.max(0, c - h), Math.min(1, c + h)];
}
const icTxt = (ic, d = 1) => (ic ? `IC 95 % ${pc(ic[0], d)} – ${pc(ic[1], d)}` : 'IC no calculable');

// Riesgos en dos grupos (tratamiento/expuestos vs control/no expuestos) — compartido por RR, RAR, RRR, NNT, NNH
function riesgos(eT, nT, eC, nC) {
  if (eT > nT || eC > nC) return null;
  const pT = eT / nT, pC = eC / nC;
  const wT = wilson(eT, nT), wC = wilson(eC, nC);
  // Diferencia pC − pT con IC de Newcombe (método 10, híbrido de Wilson)
  const dif = pC - pT;
  const lo = dif - Math.sqrt((pC - wC[0]) ** 2 + (wT[1] - pT) ** 2);
  const hi = dif + Math.sqrt((wC[1] - pC) ** 2 + (pT - wT[0]) ** 2);
  // RR = pT/pC con IC logarítmico (Katz)
  let rr = null, rrIc = null;
  if (pC > 0) {
    rr = pT / pC;
    if (eT > 0 && eC > 0) { const se = Math.sqrt(1 / eT - 1 / nT + 1 / eC - 1 / nC); rrIc = [Math.exp(Math.log(rr) - Z95 * se), Math.exp(Math.log(rr) + Z95 * se)]; }
  }
  return { pT, pC, dif, difIc: [lo, hi], rr, rrIc };
}
// IC del NNT a partir del IC de la diferencia de riesgos (Altman 1998)
function nntIc(lo, hi, pos, neg) {
  const f = x => fx(Math.abs(1 / x), 1);
  if (lo > 0) return `IC 95 % ${f(hi)} a ${f(lo)} (${pos})`;
  if (hi < 0) return `IC 95 % ${f(lo)} a ${f(hi)} (${neg})`;
  return `IC 95 %: ${pos} ${f(hi)} a ∞ a ${neg} ${f(lo)} (el IC de la diferencia incluye 0)`;
}

// Probabilidad posprueba por Bayes
const bayes = (se, sp, prev) => ({ vpp: se * prev / (se * prev + (1 - sp) * (1 - prev)), vpn: sp * (1 - prev) / (sp * (1 - prev) + (1 - se) * prev) });

const EVT = [
  { t: 'head', l: 'Grupo tratamiento / expuesto' },
  { t: 'num', id: 'eT', l: 'Con evento', u: 'n', min: 0, step: 1 },
  { t: 'num', id: 'nT', l: 'Total del grupo', u: 'n', min: 1, step: 1 },
  { t: 'head', l: 'Grupo control / no expuesto' },
  { t: 'num', id: 'eC', l: 'Con evento', u: 'n', min: 0, step: 1 },
  { t: 'num', id: 'nC', l: 'Total del grupo', u: 'n', min: 1, step: 1 }
];
const REF_IC = 'Newcombe RG. Interval estimation for the difference between independent proportions: comparison of eleven methods. Stat Med. 1998;17:873–890. · Altman DG. Confidence intervals for the number needed to treat. BMJ. 1998;317:1309–1312. · Katz D, Baptista J, Azen SP, Pike MC. Obtaining confidence intervals for the risk ratio in cohort studies. Biometrics. 1978;34:469–474.';

const QA = [['0.10', 'α = 0,10 (bilateral)'], ['0.05', 'α = 0,05 (bilateral)'], ['0.01', 'α = 0,01 (bilateral)']];
const ZA = { '0.10': 1.644854, '0.05': 1.959964, '0.01': 2.575829 };
const QB = [['0.80', 'Potencia 80 %'], ['0.90', 'Potencia 90 %'], ['0.95', 'Potencia 95 %']];
const ZB = { '0.80': 0.841621, '0.90': 1.281552, '0.95': 1.644854 };

// Composición electrolítica de pérdidas digestivas (MSD Manual, rango mEq/L)
const GI = {
  gastrico: ['Gástrico', [20, 80], [5, 20], [100, 150]],
  pancreatico: ['Pancreático', [120, 140], [5, 15], [90, 120]],
  delgado: ['Intestino delgado', [100, 140], [5, 15], [90, 130]],
  biliar: ['Biliar', [120, 140], [5, 15], [80, 120]],
  ileostomia: ['Ileostomía', [45, 135], [3, 15], [20, 115]],
  diarrea: ['Diarrea', [10, 90], [10, 80], [10, 110]]
};

// Requerimientos nutricionales por kg (rango [mín, máx], peso a usar, fuente)
const KCAL = {
  aspen22: [12, 25, 'peso actual', 'ASPEN 2022, paciente crítico, primeros 7–10 días'],
  aspen16_ob1: [11, 14, 'peso actual', 'ASPEN/SCCM 2016, crítico con IMC 30–50'],
  aspen16_ob2: [22, 25, 'peso ideal', 'ASPEN/SCCM 2016, crítico con IMC > 50'],
  espen_pm65: [27, 27, 'peso actual', 'ESPEN 2018, paciente polimórbido de clínica médica > 65 años (GET)'],
  espen_bajo: [30, 30, 'peso actual', 'ESPEN 2018, paciente polimórbido con bajo peso grave (alcanzar lento: riesgo de realimentación)'],
  espen_ger: [30, 30, 'peso actual', 'ESPEN 2019 geriatría, valor orientativo para adultos mayores']
};
const PROT = {
  aspen_uti: [1.2, 2.0, 'peso actual', 'ASPEN/SCCM 2016 (reafirmado por ASPEN 2022), paciente crítico'],
  aspen_ob1: [2.0, 2.0, 'peso ideal', 'ASPEN/SCCM 2016, crítico con IMC 30–40'],
  aspen_ob2: [2.5, 2.5, 'peso ideal', 'ASPEN/SCCM 2016, crítico con IMC ≥ 40 (hasta 2,5 g/kg)'],
  espen_uti: [1.3, 1.3, 'peso actual', 'ESPEN 2019, paciente crítico (alcanzar en forma progresiva)'],
  espen_pm: [1.0, 1.0, 'peso actual', 'ESPEN 2018, paciente polimórbido de clínica médica (mínimo)'],
  espen_ger: [1.0, 1.0, 'peso actual', 'ESPEN 2019 geriatría, adulto mayor (mínimo)'],
  kdoqi_dial: [1.0, 1.2, 'peso actual', 'KDOQI 2020, ERC 5D en hemodiálisis o diálisis peritoneal, metabólicamente estable']
};
const rangoTxt = (a, b, d = 0) => (a == b ? fx(a, d) : fx(a, d) + '–' + fx(b, d));

export default [
  // ═══════════════════════════ CARDIOLOGÍA ═══════════════════════════
  {
    id: 'qtc', m: 'f', cat: 'cardiologia', tags: [],
    n: 'QT corregido', sig: 'QTc', syn: ['qt corregido', 'bazett', 'fridericia', 'framingham', 'hodges', 'qt largo'],
    tipo: 'cálculo',
    fin: 'Corrige el intervalo QT por frecuencia cardíaca con el método elegido, para evaluar QT prolongado o corto.',
    ver: 'Bazett 1920 · Fridericia 1920 · Framingham (Sagie 1992) · Hodges 1983 — se indica el método usado',
    formula: 'RR (s) = 60 / FC\nBazett: QTc = QT / √RR\nFridericia: QTc = QT / ∛RR\nFramingham: QTc = QT + 154 × (1 − RR)\nHodges: QTc = QT + 1,75 × (FC − 60)\n(QT y QTc en ms; RR en segundos)',
    in: [
      { t: 'sel', id: 'met', l: 'Método', o: [['bazett', 'Bazett'], ['fridericia', 'Fridericia'], ['framingham', 'Framingham (Sagie)'], ['hodges', 'Hodges']] },
      { t: 'num', id: 'qt', l: 'QT medido', u: 'ms', min: 150, max: 800 },
      { t: 'head', l: 'Ingresar FC o intervalo RR (si se cargan ambos, se usa el RR)' },
      { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 20, max: 300, req: 0 },
      { t: 'num', id: 'rr', l: 'Intervalo RR', u: 'ms', min: 200, max: 3000, req: 0 },
      { t: 'sel', id: 'sexo', l: 'Sexo (para interpretar)', req: 0, o: [['m', 'Masculino'], ['f', 'Femenino']] }
    ],
    calc: v => {
      const rr = v.rr != null ? v.rr / 1000 : v.fc != null ? 60 / v.fc : null;
      if (!rr) return null;
      const fc = 60 / rr, qt = v.qt;
      const M = { bazett: ['Bazett', qt / Math.sqrt(rr)], fridericia: ['Fridericia', qt / Math.cbrt(rr)], framingham: ['Framingham', qt + 154 * (1 - rr)], hodges: ['Hodges', qt + 1.75 * (fc - 60)] };
      const [nom, q] = M[v.met];
      let interp = '', lvl = '';
      const lim = v.sexo == 'f' ? 460 : v.sexo == 'm' ? 450 : null;
      if (q <= 390) { interp = 'QTc ≤ 390 ms: QT corto (AHA/ACCF/HRS 2009)'; lvl = 'warn'; }
      else if (lim != null) { interp = q >= lim ? `QTc prolongado (≥ ${lim} ms en ${v.sexo == 'f' ? 'mujeres' : 'varones'}, AHA/ACCF/HRS 2009)` : `Dentro del rango normal (< ${lim} ms en ${v.sexo == 'f' ? 'mujeres' : 'varones'})`; lvl = q >= lim ? 'warn' : 'ok'; }
      else interp = 'Indicar sexo para interpretar (prolongado ≥ 450 ms varones, ≥ 460 ms mujeres)';
      if (q > 500) { interp += '. QTc > 500 ms: riesgo particularmente alto de torsade de pointes'; lvl = 'bad'; }
      return { r: rd(q, 0), u: 'ms', d: 0, lab: 'QTc (' + nom + ')', interp, lvl, more: [['Método', nom], ['FC usada', fx(fc, 0) + ' lpm'], ['RR usado', fx(rr * 1000, 0) + ' ms']] };
    },
    ref: 'Bazett HC. An analysis of the time-relations of electrocardiograms. Heart. 1920;7:353–370. · Fridericia LS. Die Systolendauer im Elektrokardiogramm bei normalen Menschen und bei Herzkranken. Acta Med Scand. 1920;53:469–486. · Sagie A, Larson MG, Goldberg RJ, Bengtson JR, Levy D. An improved method for adjusting the QT interval for heart rate (the Framingham Heart Study). Am J Cardiol. 1992;70:797–801. · Hodges M, Salerno D, Erlien D. Bazett\'s QT correction reviewed: evidence that a linear QT correction for heart rate is better. J Am Coll Cardiol. 1983;1:694 (resumen). · Rautaharju PM, Surawicz B, Gettes LS. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram, Part IV: the ST segment, T and U waves, and the QT interval. Circulation. 2009;119:e241–e250.',
    url: 'https://doi.org/10.1161/CIRCULATIONAHA.108.191096',
    verif: '2026-10',
    pop: 'Adultos. Framingham derivada en 5018 participantes del Framingham Heart Study.',
    lim: 'Bazett sobrecorrige con FC altas y subcorrige con FC bajas; AHA/ACCF/HRS 2009 recomienda fórmulas lineales o Fridericia/Framingham antes que Bazett. Poco confiable en FA (promediar varios RR), con QRS ancho (BRR, marcapasos) o FC extremas. Umbrales de síndrome de QT largo congénito difieren (ESC 2022: ≥ 480 ms). Un QTc aislado no es un diagnóstico.',
    tests: [
      { v: { met: 'bazett', qt: 400, fc: 75 }, r: 447, tol: 1 },
      { v: { met: 'fridericia', qt: 400, fc: 75, sexo: 'm' }, r: 431, tol: 1 },
      { v: { met: 'framingham', qt: 400, rr: 800 }, r: 431, tol: 1 },
      { v: { met: 'hodges', qt: 400, fc: 100, sexo: 'f' }, r: 470, tol: 0.5 },
      { v: { met: 'fridericia', qt: 400, fc: 60, sexo: 'm' }, r: 'normal' }
    ]
  },
  {
    id: 'fc-ecg', m: 'f', cat: 'cardiologia', tags: [],
    n: 'Frecuencia cardíaca a partir del ECG', sig: 'FC', syn: ['frecuencia cardiaca ecg', 'cuadrados grandes', 'cuadrados pequeños', '300', '1500', 'seis segundos'],
    tipo: 'cálculo',
    fin: 'Calcula la frecuencia cardíaca desde el trazado de ECG a 25 mm/s por tres métodos habituales.',
    ver: 'Métodos clásicos para papel a 25 mm/s (1 cuadrado grande = 5 mm = 0,2 s; 1 pequeño = 1 mm = 0,04 s)',
    formula: 'Método 300: FC = 300 / n.º de cuadrados grandes entre dos R\nMétodo 1500: FC = 1500 / n.º de cuadrados pequeños entre dos R\nMétodo 6 s: FC = n.º de complejos QRS en 6 s (30 cuadrados grandes) × 10',
    in: [
      { t: 'sel', id: 'met', l: 'Método', o: [['300', '300 / cuadrados grandes'], ['1500', '1500 / cuadrados pequeños'], ['6s', 'Complejos en 6 segundos × 10']] },
      { t: 'num', id: 'n', l: 'Cuadrados entre R–R, o complejos QRS en 6 s', u: 'n', min: 0.5, max: 500, step: 0.5 }
    ],
    calc: v => {
      const fc = v.met == '300' ? 300 / v.n : v.met == '1500' ? 1500 / v.n : v.n * 10;
      const nom = { '300': 'método 300', '1500': 'método 1500', '6s': 'método de 6 segundos' }[v.met];
      return { r: rd(fc, 0), u: 'lpm', d: 0, lab: 'FC (' + nom + ')', more: [['RR estimado', fx(60000 / fc, 0) + ' ms']], note: v.met == '6s' ? 'Método de elección si el ritmo es irregular.' : 'Válido solo con ritmo regular.' };
    },
    ref: 'Hampton J, Hampton J. The ECG Made Easy. 9th ed. Elsevier; 2019. · Kligfield P, Gettes LS, Bailey JJ, et al. Recommendations for the standardization and interpretation of the electrocardiogram, Part I. Circulation. 2007;115:1306–1324 (velocidad estándar 25 mm/s).',
    url: 'https://doi.org/10.1161/CIRCULATIONAHA.106.180200',
    verif: '2026-10',
    pop: 'Cualquier ECG registrado a 25 mm/s.',
    lim: 'Supone papel a 25 mm/s (a 50 mm/s los resultados se duplican). Los métodos 300 y 1500 requieren ritmo regular; con ritmo irregular usar el de 6 s o el promedio de varios ciclos. Con FC altas el método 300 pierde precisión.',
    tests: [
      { v: { met: '300', n: 4 }, r: 75 },
      { v: { met: '1500', n: 20 }, r: 75 },
      { v: { met: '6s', n: 7 }, r: 70 }
    ]
  },
  {
    id: 'eje-qrs', m: 'f', cat: 'cardiologia', tags: [],
    n: 'Eje eléctrico del QRS', sig: 'ÂQRS', syn: ['eje electrico', 'eje del qrs', 'desviacion del eje'],
    tipo: 'cálculo',
    fin: 'Estima el eje eléctrico medio del QRS en el plano frontal a partir de la amplitud neta del QRS en DI y aVF.',
    ver: 'Fórmula corregida de Novosel (1999) sobre el sistema hexaxial',
    formula: 'Amplitud neta = onda positiva − onda negativa (mm o mV)\nθ = atan2( 2 × aVF / √3 , DI )  (en grados)\nNormal −30° a +90°; desviación izquierda −30° a −90°; derecha +90° a +180°; extrema −90° a −180°',
    in: [
      { t: 'num', id: 'di', l: 'Amplitud neta del QRS en DI', u: 'mm', min: -50, max: 50, step: 0.5, alt: [A.mv_mm] },
      { t: 'num', id: 'avf', l: 'Amplitud neta del QRS en aVF', u: 'mm', min: -50, max: 50, step: 0.5, alt: [A.mv_mm] }
    ],
    calc: v => {
      if (v.di == 0 && v.avf == 0) return null;
      const t = Math.atan2(2 * v.avf / Math.sqrt(3), v.di) * 180 / Math.PI;
      const simple = Math.atan2(v.avf, v.di) * 180 / Math.PI;
      let interp, lvl;
      if (t >= -30 && t <= 90) { interp = 'Eje normal (−30° a +90°)'; lvl = 'ok'; }
      else if (t < -30 && t >= -90) { interp = 'Desviación del eje a la izquierda (−30° a −90°)'; lvl = 'warn'; }
      else if (t > 90) { interp = 'Desviación del eje a la derecha (+90° a +180°)'; lvl = 'warn'; }
      else { interp = 'Eje extremo / indeterminado (−90° a −180°)'; lvl = 'warn'; }
      return { r: rd(t, 0), u: '°', d: 0, lab: 'Eje del QRS', interp, lvl, more: [['Sin corrección √3 (atan2 aVF/DI)', fx(simple, 0) + '°']] };
    },
    ref: 'Novosel D, Noll G, Lüscher TF. Corrected formula for the calculation of the electrical heart axis. Croat Med J. 1999;40:77–79. · Surawicz B, Childers R, Deal BJ, Gettes LS. AHA/ACCF/HRS recommendations for the standardization and interpretation of the electrocardiogram, Part III: intraventricular conduction disturbances. Circulation. 2009;119:e235–e240.',
    url: 'https://doi.org/10.1161/CIRCULATIONAHA.108.191095',
    verif: '2026-10',
    pop: 'Adultos (los rangos normales en niños y recién nacidos son distintos).',
    lim: 'Modelo idealizado (triángulo de Einthoven equilátero, torso homogéneo): es una estimación. La amplitud neta no equivale al área del QRS; con QRS pequeños o isodifásicos en ambas derivaciones el resultado es inestable. Se muestra también el valor sin la corrección √3, que otras calculadoras usan. Rangos de clasificación para adultos.',
    tests: [
      { v: { di: 10, avf: 10 }, r: 49, tol: 1 },
      { v: { di: -5, avf: 10 }, r: 113, tol: 1 },
      { v: { di: 10, avf: -10 }, r: 'izquierda' }
    ]
  },
  {
    id: 'cornell-hvi', m: 'f', cat: 'cardiologia', tags: [],
    n: 'Índice de Cornell para HVI', sig: 'Cornell', syn: ['hipertrofia ventricular izquierda', 'hvi ecg', 'producto de cornell', 'voltaje de cornell'],
    tipo: 'criterio diagnóstico',
    fin: 'Aplica el criterio de voltaje de Cornell (y, opcionalmente, el producto de Cornell) para hipertrofia ventricular izquierda en el ECG.',
    ver: 'Voltaje de Cornell con umbrales por sexo (Casale 1985) · Producto de Cornell (Molloy 1992)',
    formula: 'Voltaje de Cornell = R en aVL + S en V3 (mm)\nHVI: > 28 mm en varones; > 20 mm en mujeres\nProducto de Cornell = (RaVL + SV3 [+ 8 mm en mujeres]) × duración del QRS (ms); HVI si ≥ 2440 mm·ms',
    in: [
      { t: 'sel', id: 'sexo', l: 'Sexo', o: [['m', 'Masculino'], ['f', 'Femenino']] },
      { t: 'num', id: 'ravl', l: 'Onda R en aVL', u: 'mm', min: 0, max: 60, step: 0.5, alt: [A.mv_mm] },
      { t: 'num', id: 'sv3', l: 'Onda S en V3 (valor absoluto)', u: 'mm', min: 0, max: 80, step: 0.5, alt: [A.mv_mm] },
      { t: 'num', id: 'qrs', l: 'Duración del QRS (para el producto, opcional)', u: 'ms', min: 40, max: 250, req: 0 }
    ],
    calc: v => {
      const cv = v.ravl + v.sv3, um = v.sexo == 'f' ? 20 : 28;
      const pos = cv > um;
      const more = [['Umbral de voltaje', '> ' + um + ' mm (' + (v.sexo == 'f' ? 'mujeres' : 'varones') + ')']];
      let prod = null;
      if (v.qrs != null) {
        prod = (cv + (v.sexo == 'f' ? 8 : 0)) * v.qrs;
        more.push(['Producto de Cornell', fx(prod, 0) + ' mm·ms ' + (prod >= 2440 ? '(≥ 2440: criterio de HVI)' : '(< 2440)')]);
      }
      const alg = pos || (prod != null && prod >= 2440);
      return { r: rd(cv, 1), u: 'mm', d: 1, lab: 'Voltaje de Cornell', interp: pos ? 'Cumple criterio de voltaje de Cornell para HVI' : 'No cumple criterio de voltaje de Cornell', lvl: alg ? 'warn' : 'ok', more };
    },
    ref: 'Casale PN, Devereux RB, Kligfield P, et al. Electrocardiographic detection of left ventricular hypertrophy: development and prospective validation of improved criteria. J Am Coll Cardiol. 1985;6:572–580. · Molloy TJ, Okin PM, Devereux RB, Kligfield P. Electrocardiographic detection of left ventricular hypertrophy by the simple QRS voltage-duration product. J Am Coll Cardiol. 1992;20:1180–1186.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/1401620/',
    verif: '2026-10',
    pop: 'Adultos, validado contra masa ventricular izquierda por ecocardiograma.',
    lim: 'Alta especificidad pero baja sensibilidad: un resultado negativo no descarta HVI. Requiere calibración estándar (10 mm/mV). No aplicable con BCRI, marcapasos ni preexcitación. Otros estudios usaron una corrección femenina distinta para el producto; aquí se usa la de Molloy (+8 mm). El ecocardiograma es la referencia.',
    tests: [
      { v: { sexo: 'm', ravl: 12, sv3: 18 }, r: 30 },
      { v: { sexo: 'f', ravl: 8, sv3: 10 }, r: 'no cumple' },
      { v: { sexo: 'f', ravl: 10, sv3: 12, qrs: 100 }, r: 'cumple criterio' }
    ]
  },
  {
    id: 'fevi-clasif', m: 'f', cat: 'cardiologia', tags: [],
    n: 'Fracción de eyección: clasificación de la IC', sig: 'FEVI', syn: ['fevi', 'fraccion de eyeccion', 'icfer', 'icfelr', 'icfep', 'hfref', 'hfpef', 'hfmref'],
    tipo: 'clasificación',
    fin: 'Registra una FEVI medida (eco, RMN, etc.) y la clasifica según la definición universal de insuficiencia cardíaca. No estima la FEVI.',
    ver: 'Definición universal de IC 2021 (HFSA/HFA/JHFS), concordante con ESC 2021',
    formula: 'IC con FEVI reducida (ICFEr): FEVI ≤ 40 %\nIC con FEVI levemente reducida (ICFElr): 41–49 %\nIC con FEVI preservada (ICFEp): ≥ 50 %\nIC con FEVI mejorada: FEVI basal ≤ 40 %, aumento ≥ 10 puntos y segunda medición > 40 %',
    in: [
      { t: 'num', id: 'fevi', l: 'FEVI medida', u: '%', min: 5, max: 90 },
      { t: 'num', id: 'prev', l: 'FEVI previa (opcional, para IC con FEVI mejorada)', u: '%', min: 5, max: 90, req: 0 }
    ],
    calc: v => {
      const f = v.fevi;
      let interp = f <= 40 ? 'IC con FEVI reducida (ICFEr, ≤ 40 %)' : f < 50 ? 'IC con FEVI levemente reducida (ICFElr, 41–49 %)' : 'IC con FEVI preservada (ICFEp, ≥ 50 %)';
      if (v.prev != null && v.prev <= 40 && f > 40 && f - v.prev >= 10) interp = 'IC con FEVI mejorada (basal ≤ 40 %, aumento ≥ 10 puntos, actual > 40 %)';
      return { r: rd(f, 0), u: '%', d: 0, lab: 'FEVI', interp, lvl: f <= 40 ? 'bad' : f < 50 ? 'warn' : 'ok', note: 'La categoría aplica solo a pacientes con diagnóstico clínico de insuficiencia cardíaca.' };
    },
    ref: 'Bozkurt B, Coats AJS, Tsutsui H, et al. Universal definition and classification of heart failure. J Card Fail. 2021;27:387–413. · McDonagh TA, Metra M, Adamo M, et al. 2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure. Eur Heart J. 2021;42:3599–3726.',
    url: 'https://doi.org/10.1016/j.cardfail.2021.01.022',
    verif: '2026-10',
    pop: 'Adultos con insuficiencia cardíaca.',
    lim: 'Solo clasifica: la FEVI varía según método (eco 2D/3D, RMN, ventriculografía) y operador. Una FEVI ≥ 50 % no descarta IC ni la confirma: el diagnóstico de ICFEp requiere evidencia de disfunción diastólica/presiones de llenado elevadas o péptidos natriuréticos.',
    tests: [
      { v: { fevi: 35 }, r: 'reducida' },
      { v: { fevi: 45 }, r: 'levemente reducida' },
      { v: { fevi: 55 }, r: 'preservada' },
      { v: { fevi: 48, prev: 30 }, r: 'mejorada' }
    ]
  },

  // ═══════════════════════════ NEURO ═══════════════════════════
  {
    id: 'abc2-hic', m: 'f', cat: 'neuro', tags: [],
    n: 'Volumen de hematoma intracerebral (ABC/2)', sig: 'ABC/2', syn: ['volumen hematoma', 'hic', 'hemorragia intracerebral', 'kothari', 'abc/3'],
    tipo: 'estimación',
    fin: 'Estima el volumen de un hematoma intraparenquimatoso en TC aproximándolo a un elipsoide.',
    ver: 'Kothari 1996 (ABC/2); variante ABC/3 para hematomas irregulares (Huttner 2006)',
    formula: 'A = diámetro mayor en el corte con mayor área (cm)\nB = diámetro perpendicular a A en ese corte (cm)\nC = n.º de cortes con hematoma × espesor de corte (cm); cada corte cuenta 1 si su área es ≥ 75 % del corte de referencia, 0,5 si es 25–75 % y 0 si es < 25 %\nVolumen (mL) = A × B × C / 2   (o / 3 en la variante ABC/3)',
    in: [
      { t: 'sel', id: 'div', l: 'Divisor', o: [['2', 'ABC/2 (Kothari, hematoma regular)'], ['3', 'ABC/3 (hematoma irregular, Huttner)']] },
      { t: 'num', id: 'a', l: 'A: diámetro mayor', u: 'cm', min: 0.1, max: 20, step: 0.1, alt: [A.mm_cm] },
      { t: 'num', id: 'b', l: 'B: diámetro perpendicular', u: 'cm', min: 0.1, max: 20, step: 0.1, alt: [A.mm_cm] },
      { t: 'num', id: 'c', l: 'C: altura (cortes ponderados × espesor)', u: 'cm', min: 0.1, max: 20, step: 0.1, alt: [A.mm_cm] }
    ],
    calc: v => {
      const vol = v.a * v.b * v.c / +v.div;
      return { r: rd(vol, 1), u: 'mL', d: 1, lab: 'Volumen (ABC/' + v.div + ')', more: [['Método', v.div == '2' ? 'ABC/2 (Kothari 1996)' : 'ABC/3 (Huttner 2006)']], note: vol >= 30 ? 'Volumen ≥ 30 mL: suma 1 punto en el ICH score (Hemphill 2001).' : '' };
    },
    ref: 'Kothari RU, Brott T, Broderick JP, et al. The ABCs of measuring intracerebral hemorrhage volumes. Stroke. 1996;27:1304–1305. · Huttner HB, Steiner T, Hartmann M, et al. Comparison of ABC/2 estimation technique to computer-assisted planimetric analysis in warfarin-related intracerebral parenchymal hemorrhage. Stroke. 2006;37:404–408. · Hemphill JC 3rd, et al. The ICH score. Stroke. 2001;32:891–897.',
    url: 'https://doi.org/10.1161/01.STR.27.8.1304',
    verif: '2026-10',
    pop: 'Hemorragia intracerebral espontánea en TC (Kothari); hemorragia asociada a warfarina con forma irregular (Huttner, n = 83).',
    lim: 'Estimación geométrica: sobreestima hematomas irregulares o multilobulados (≈ 15 % en Huttner) y es menos exacta en hematomas grandes, con volcado ventricular o asociados a anticoagulantes. La planimetría es la referencia. No usar para hematomas extraaxiales.',
    tests: [
      { v: { div: '2', a: 4, b: 3, c: 2.5 }, r: 15 },
      { v: { div: '3', a: 6, b: 4, c: 5 }, r: 40 }
    ]
  },
  {
    id: 'vol-elipsoide', m: 'f', cat: 'neuro', tags: [],
    n: 'Volumen de lesión a partir de dimensiones', sig: '', syn: ['volumen tumor', 'elipsoide', 'volumen de lesion', 'pi/6'],
    tipo: 'estimación',
    fin: 'Estima el volumen de una lesión aproximadamente elipsoidal a partir de sus tres diámetros ortogonales.',
    ver: 'Fórmula del elipsoide con diámetros (V = π/6 · a · b · c)',
    formula: 'V = π/6 × a × b × c  (≈ 0,524 × a × b × c)\na, b, c = diámetros máximos en tres ejes ortogonales (cm) → V en cm³ = mL',
    in: [
      { t: 'num', id: 'a', l: 'Diámetro a (p. ej., anteroposterior)', u: 'cm', min: 0.01, max: 30, step: 0.1, alt: [A.mm_cm] },
      { t: 'num', id: 'b', l: 'Diámetro b (p. ej., transversal)', u: 'cm', min: 0.01, max: 30, step: 0.1, alt: [A.mm_cm] },
      { t: 'num', id: 'c', l: 'Diámetro c (p. ej., craneocaudal)', u: 'cm', min: 0.01, max: 30, step: 0.1, alt: [A.mm_cm] }
    ],
    calc: v => ({ r: rd(Math.PI / 6 * v.a * v.b * v.c, 2), u: 'mL (cm³)', d: 2, lab: 'Volumen (elipsoide π/6)', more: [['Aproximación ABC/2', fx(v.a * v.b * v.c / 2, 2) + ' mL']] }),
    ref: 'Volumen del elipsoide: V = 4/3·π·(a/2)(b/2)(c/2) = π/6·a·b·c. Su simplificación ABC/2 (π/6 ≈ 1/2) se describe en: Kothari RU, Brott T, Broderick JP, et al. The ABCs of measuring intracerebral hemorrhage volumes. Stroke. 1996;27:1304–1305.',
    url: 'https://doi.org/10.1161/01.STR.27.8.1304',
    verif: '2026-10',
    pop: 'Lesiones de forma aproximadamente elipsoidal en TC/RMN (tumores, quistes, colecciones).',
    lim: 'Método indicado: elipsoide con diámetros máximos ortogonales. Sobre o subestima lesiones irregulares, lobuladas, quísticas-necróticas o con márgenes mal definidos; la volumetría segmentada es la referencia. Los criterios de respuesta (RANO, etc.) usan mediciones propias, no este volumen.',
    tests: [
      { v: { a: 3, b: 2, c: 2 }, r: 6.28 },
      { v: { a: 1, b: 1, c: 1 }, r: 0.52 }
    ]
  },
  {
    id: 'dve-debito', m: 'f', cat: 'neuro', tags: [],
    n: 'Volumen de drenaje y balance de LCR (DVE)', sig: 'DVE', syn: ['drenaje ventricular externo', 'debito dve', 'lcr', 'drenaje lumbar'],
    tipo: 'cálculo',
    fin: 'Suma el débito de LCR de hasta cuatro períodos y calcula el débito horario promedio y su proyección a 24 h.',
    ver: 'Cálculo aritmético; producción de LCR de referencia según Sakka 2011',
    formula: 'Volumen total = Σ volúmenes de cada período\nDébito horario = volumen total / Σ horas\nProyección 24 h = débito horario × 24',
    in: [
      { t: 'num', id: 'v1', l: 'Período 1: volumen', u: 'mL', min: 0, max: 2000 },
      { t: 'num', id: 'h1', l: 'Período 1: duración', u: 'h', min: 0.25, max: 48, step: 0.25 },
      { t: 'num', id: 'v2', l: 'Período 2: volumen', u: 'mL', min: 0, max: 2000, req: 0 },
      { t: 'num', id: 'h2', l: 'Período 2: duración', u: 'h', min: 0.25, max: 48, step: 0.25, req: 0 },
      { t: 'num', id: 'v3', l: 'Período 3: volumen', u: 'mL', min: 0, max: 2000, req: 0 },
      { t: 'num', id: 'h3', l: 'Período 3: duración', u: 'h', min: 0.25, max: 48, step: 0.25, req: 0 },
      { t: 'num', id: 'v4', l: 'Período 4: volumen', u: 'mL', min: 0, max: 2000, req: 0 },
      { t: 'num', id: 'h4', l: 'Período 4: duración', u: 'h', min: 0.25, max: 48, step: 0.25, req: 0 }
    ],
    calc: v => {
      let V = 0, H = 0;
      for (const k of [1, 2, 3, 4]) {
        const a = v['v' + k], b = v['h' + k];
        if (a == null && b == null) continue;
        if (a == null || b == null) return null; // período incompleto
        V += a; H += b;
      }
      const ph = V / H;
      return { r: rd(V, 0), u: 'mL', d: 0, lab: 'Volumen total en ' + fx(H, 2) + ' h', more: [['Débito horario promedio', fx(ph, 1) + ' mL/h'], ['Proyección a 24 h', fx(ph * 24, 0) + ' mL/24 h']], note: 'Referencia fisiológica: producción de LCR ≈ 0,3–0,4 mL/min (≈ 500 mL/día, ≈ 20 mL/h) en el adulto.' };
    },
    ref: 'Sakka L, Coll G, Chazal J. Anatomy and physiology of cerebrospinal fluid. Eur Ann Otorhinolaryngol Head Neck Dis. 2011;128:309–316.',
    url: 'https://doi.org/10.1016/j.anorl.2011.03.002',
    verif: '2026-10',
    pop: 'Pacientes con drenaje ventricular externo o lumbar.',
    lim: 'Cálculo aritmético; no define metas de drenaje (dependen de la altura del sistema, la PIC y la indicación). La proyección a 24 h supone un débito constante. Verificar que la cámara se haya vaciado y registrado correctamente; el débito depende de la altura del punto cero y del cierre del sistema.',
    tests: [
      { v: { v1: 60, h1: 6, v2: 40, h2: 6 }, r: 100 },
      { v: { v1: 240, h1: 24 }, r: 240 }
    ]
  },

  // ═══════════════════════════ HEMATOLOGÍA ═══════════════════════════
  {
    id: 'ran', m: 'f', cat: 'hematologia', tags: [],
    n: 'Recuento absoluto de neutrófilos', sig: 'RAN', syn: ['neutrofilos absolutos', 'anc', 'neutropenia'],
    tipo: 'cálculo',
    fin: 'Calcula el recuento absoluto de neutrófilos (segmentados + cayados) y gradúa la neutropenia según CTCAE.',
    ver: 'Fórmula estándar; graduación CTCAE v5.0 (NCI 2017)',
    formula: 'RAN (/µL) = leucocitos (/µL) × (% segmentados + % cayados) / 100',
    in: [
      { t: 'num', id: 'gb', l: 'Leucocitos', u: '/µL', min: 0, max: 500000, alt: [A.k_ul, A.g9_l] },
      { t: 'num', id: 'seg', l: 'Neutrófilos segmentados', u: '%', min: 0, max: 100 },
      { t: 'num', id: 'cay', l: 'Cayados (bandas)', u: '%', min: 0, max: 100, req: 0 }
    ],
    calc: v => {
      if (v.seg + (v.cay || 0) > 100) return null;
      const r = v.gb * (v.seg + (v.cay || 0)) / 100;
      const b = band(r, [[0, 499.9999, 'Neutropenia grado 4 (< 500/µL, CTCAE v5.0)', 'bad'], [500, 999.9999, 'Neutropenia grado 3 (500–999/µL)', 'bad'], [1000, 1499.9999, 'Neutropenia grado 2 (1000–1499/µL)', 'warn'], [1500, 1e9, '≥ 1500/µL: sin neutropenia de grado ≥ 2 (grado 1 = < LIN del laboratorio y ≥ 1500/µL)', 'ok']]);
      return { r: rd(r, 0), u: '/µL', d: 0, lab: 'RAN', ...b, more: [['RAN', fx(r / 1000, 2) + ' ×10⁹/L']], note: v.cay == null ? 'Sin % de cayados: se calculó solo con segmentados.' : '' };
    },
    ref: 'National Cancer Institute. Common Terminology Criteria for Adverse Events (CTCAE) v5.0. 2017 — «Neutrophil count decreased».',
    url: 'https://ctep.cancer.gov/protocoldevelopment/electronic_applications/ctc.htm',
    verif: '2026-10',
    pop: 'Adultos; la graduación CTCAE se diseñó para eventos adversos en oncología.',
    lim: 'Si el contador informa neutrófilos absolutos, preferir ese valor. Algunas personas de ascendencia africana o de Medio Oriente tienen RAN basal más bajo sin riesgo infeccioso (neutropenia étnica benigna / fenotipo Duffy-nulo). Rangos pediátricos distintos.',
    tests: [
      { v: { gb: 8000, seg: 60, cay: 5 }, r: 5200 },
      { v: { gb: 1200, seg: 30 }, r: 360 },
      { v: { gb: 2000, seg: 55, cay: 5 }, r: 'grado 2' }
    ]
  },
  {
    id: 'retic-abs', m: 'f', cat: 'hematologia', tags: [],
    n: 'Recuento absoluto de reticulocitos', sig: '', syn: ['reticulocitos absolutos'],
    tipo: 'cálculo',
    fin: 'Convierte el porcentaje de reticulocitos en recuento absoluto usando el recuento de glóbulos rojos.',
    ver: 'Fórmula estándar',
    formula: 'Reticulocitos absolutos (×10³/µL) = % reticulocitos / 100 × GR (×10⁶/µL) × 1000',
    in: [
      { t: 'num', id: 'ret', l: 'Reticulocitos', u: '%', min: 0, max: 60, step: 0.1 },
      { t: 'num', id: 'gr', l: 'Glóbulos rojos', u: '×10⁶/µL', min: 0.3, max: 9, step: 0.01, alt: [{ u: '×10¹²/L', f: x => x }] }
    ],
    calc: v => { const r = v.ret / 100 * v.gr * 1000; return { r: rd(r, 1), u: '×10³/µL', d: 1, lab: 'Reticulocitos absolutos', more: [['Equivalente', fx(r, 1) + ' ×10⁹/L']] }; },
    ref: 'Hillman RS, Ault KA, Leporrier M, Rinder HM. Hematology in Clinical Practice. 5th ed. McGraw-Hill (Lange); 2010.',
    verif: '2026-10',
    pop: 'Evaluación de anemia.',
    lim: 'Los valores de referencia dependen del método y del laboratorio. No corrige por grado de anemia ni por maduración (ver índice de producción reticulocitaria).',
    tests: [
      { v: { ret: 2, gr: 4 }, r: 80 },
      { v: { ret: 1.5, gr: 4.5 }, r: 67.5 }
    ]
  },
  {
    id: 'retic-corr', m: 'f', cat: 'hematologia', tags: [],
    n: 'Índice de reticulocitos corregido (por hematocrito)', sig: 'IRC', syn: ['reticulocitos corregidos', 'indice reticulocitario'],
    tipo: 'índice',
    fin: 'Corrige el porcentaje de reticulocitos por el grado de anemia.',
    ver: 'Corrección por hematocrito con Hto de referencia 45 %',
    formula: 'Reticulocitos corregidos (%) = % reticulocitos × Hto del paciente / 45',
    in: [
      { t: 'num', id: 'ret', l: 'Reticulocitos', u: '%', min: 0, max: 60, step: 0.1 },
      { t: 'num', id: 'hto', l: 'Hematocrito', u: '%', min: 5, max: 70 }
    ],
    calc: v => ({ r: rd(v.ret * v.hto / 45, 2), u: '%', d: 2, lab: 'Reticulocitos corregidos' }),
    ref: 'Hillman RS, Ault KA, Leporrier M, Rinder HM. Hematology in Clinical Practice. 5th ed. McGraw-Hill (Lange); 2010. · The Blood Project. What is a reticulocyte production (maturation) index?',
    url: 'https://www.thebloodproject.com/ufaq/what-is-a-reticulocyte-production-maturation-index/',
    verif: '2026-10',
    pop: 'Adultos con anemia.',
    lim: 'El Hto de referencia de 45 % corresponde a varones adultos; algunas fuentes usan 40 % en mujeres (subestimaría la corrección). No corrige por la salida precoz de reticulocitos (ver índice de producción reticulocitaria).',
    tests: [
      { v: { ret: 6, hto: 30 }, r: 4 },
      { v: { ret: 5, hto: 25 }, r: 2.78 }
    ]
  },
  {
    id: 'ipr', m: 'f', cat: 'hematologia', tags: [],
    n: 'Índice de producción reticulocitaria', sig: 'IPR', syn: ['rpi', 'indice de produccion reticulocitaria', 'factor de maduracion'],
    tipo: 'índice',
    fin: 'Estima si la respuesta medular a la anemia es adecuada, corrigiendo por anemia y por tiempo de maduración de los reticulocitos.',
    ver: 'Hillman–Finch; factor de maduración por hematocrito',
    formula: 'Reticulocitos corregidos = % reticulocitos × Hto / 45\nFactor de maduración (días): Hto 36–45 % → 1,0; 26–35 % → 1,5; 16–25 % → 2,0; ≤ 15 % → 2,5\nIPR = reticulocitos corregidos / factor de maduración',
    in: [
      { t: 'num', id: 'ret', l: 'Reticulocitos', u: '%', min: 0, max: 60, step: 0.1 },
      { t: 'num', id: 'hto', l: 'Hematocrito', u: '%', min: 5, max: 70 }
    ],
    calc: v => {
      const fm = v.hto >= 36 ? 1 : v.hto >= 26 ? 1.5 : v.hto >= 16 ? 2 : 2.5;
      const ipr = v.ret * v.hto / 45 / fm;
      const b = ipr < 2 ? { interp: 'IPR < 2: respuesta medular inadecuada (anemia hipoproliferativa)', lvl: 'warn' } : ipr > 3 ? { interp: 'IPR > 3: respuesta medular adecuada (orienta a pérdida o hemólisis)', lvl: 'ok' } : { interp: 'IPR 2–3: zona intermedia', lvl: '' };
      return { r: rd(ipr, 2), u: '', d: 2, lab: 'IPR', ...b, more: [['Factor de maduración', fx(fm, 1) + ' días'], ['Reticulocitos corregidos', fx(v.ret * v.hto / 45, 2) + ' %']], note: v.hto > 45 ? 'Hto > 45 %: el índice no está pensado para pacientes sin anemia.' : '' };
    },
    ref: 'Hillman RS, Ault KA, Leporrier M, Rinder HM. Hematology in Clinical Practice. 5th ed. McGraw-Hill (Lange); 2010. · The Blood Project. What is a reticulocyte production (maturation) index?',
    url: 'https://www.thebloodproject.com/ufaq/what-is-a-reticulocyte-production-maturation-index/',
    verif: '2026-10',
    pop: 'Adultos con anemia.',
    lim: 'El factor de maduración es aproximado y supone salida precoz de reticulocitos proporcional a la anemia (presencia de policromatofilia). Los puntos de corte varían entre textos. No reemplaza el frotis ni el estudio etiológico.',
    tests: [
      { v: { ret: 6, hto: 30 }, r: 2.67 },
      { v: { ret: 5, hto: 25 }, r: 1.39 },
      { v: { ret: 12, hto: 30 }, r: 'adecuada' }
    ]
  },
  {
    id: 'mentzer', m: 'f', cat: 'hematologia', tags: [],
    n: 'Índice de Mentzer', sig: '', syn: ['mentzer', 'talasemia', 'ferropenia', 'microcitosis'],
    tipo: 'índice',
    fin: 'Orienta en la microcitosis entre rasgo talasémico y ferropenia.',
    ver: 'Mentzer 1973',
    formula: 'Índice de Mentzer = VCM (fL) / GR (×10⁶/µL)\n< 13: sugiere rasgo talasémico; > 13: sugiere ferropenia',
    in: [
      { t: 'num', id: 'vcm', l: 'VCM', u: 'fL', min: 40, max: 130 },
      { t: 'num', id: 'gr', l: 'Glóbulos rojos', u: '×10⁶/µL', min: 0.5, max: 9, step: 0.01, alt: [{ u: '×10¹²/L', f: x => x }] }
    ],
    calc: v => {
      const m = v.vcm / v.gr;
      const b = m < 13 ? { interp: '< 13: sugiere rasgo talasémico', lvl: 'warn' } : m > 13 ? { interp: '> 13: sugiere ferropenia', lvl: 'warn' } : { interp: '= 13: indeterminado', lvl: '' };
      return { r: rd(m, 1), u: '', d: 1, lab: 'Índice de Mentzer', ...b };
    },
    ref: 'Mentzer WC Jr. Differentiation of iron deficiency from thalassaemia trait. Lancet. 1973;1(7808):882.',
    url: 'https://doi.org/10.1016/S0140-6736(73)91446-3',
    verif: '2026-10',
    pop: 'Pacientes con anemia microcítica (descripto en niños).',
    lim: 'Solo orientativo: la ferropenia y la talasemia pueden coexistir; sensibilidad y especificidad moderadas. Confirmar con ferritina/estudio del hierro y electroforesis de hemoglobina (HbA2).',
    tests: [
      { v: { vcm: 65, gr: 5.5 }, r: 11.8 },
      { v: { vcm: 70, gr: 3.5 }, r: 20 }
    ]
  },
  {
    id: 'sat-transferrina', m: 'f', cat: 'hematologia', tags: [],
    n: 'Saturación de transferrina', sig: 'IST', syn: ['saturacion de transferrina', 'tsat', 'indice de saturacion', 'ferropenia', 'hemocromatosis'],
    tipo: 'cálculo',
    fin: 'Calcula el porcentaje de saturación de la transferrina con hierro.',
    ver: 'Fórmula estándar (hierro sérico / capacidad total de fijación)',
    formula: 'Saturación (%) = hierro sérico (µg/dL) / CTFH (µg/dL) × 100',
    in: [
      { t: 'num', id: 'fe', l: 'Hierro sérico', u: 'µg/dL', min: 1, max: 1000, alt: [A.fe_umol] },
      { t: 'num', id: 'ctfh', l: 'Capacidad total de fijación del hierro (CTFH/TIBC)', u: 'µg/dL', min: 50, max: 1000, alt: [A.fe_umol] }
    ],
    calc: v => {
      const s = v.fe / v.ctfh * 100;
      const b = s < 20 ? { interp: '< 20 %: compatible con ferropenia (interpretar con ferritina; criterio ESC 2021 en IC, KDIGO en ERC)', lvl: 'warn' } : s > 45 ? { interp: '> 45 %: saturación elevada; umbral de sospecha de sobrecarga de hierro (EASL 2022)', lvl: 'warn' } : { interp: '20–45 %', lvl: 'ok' };
      return { r: rd(s, 1), u: '%', d: 1, lab: 'Saturación de transferrina', ...b };
    },
    ref: 'McDonagh TA, et al. 2021 ESC Guidelines for heart failure. Eur Heart J. 2021;42:3599–3726 (ferropenia: ferritina < 100 µg/L o 100–299 µg/L con saturación < 20 %). · European Association for the Study of the Liver. EASL Clinical Practice Guidelines on haemochromatosis. J Hepatol. 2022;77:479–502.',
    url: 'https://doi.org/10.1016/j.jhep.2022.03.033',
    verif: '2026-10',
    pop: 'Adultos.',
    lim: 'Si el laboratorio informa transferrina (mg/dL) en vez de CTFH, la CTFH ≈ transferrina × 1,25–1,4 según método: preferir la saturación informada. El hierro sérico varía con el ritmo circadiano, la ingesta reciente y la inflamación. No diagnostica por sí sola ferropenia ni hemocromatosis.',
    tests: [
      { v: { fe: 50, ctfh: 400 }, r: 12.5 },
      { v: { fe: 150, ctfh: 300 }, r: 50 }
    ]
  },
  {
    id: 'ganzoni', m: 'f', cat: 'hematologia', tags: [],
    n: 'Déficit de hierro (Ganzoni)', sig: '', syn: ['ganzoni', 'deficit de hierro', 'hierro endovenoso', 'hierro total'],
    tipo: 'dosificación',
    fin: 'Estima el déficit total de hierro corporal para planificar la reposición parenteral.',
    ver: 'Ganzoni 1970; depósitos de 500 mg (≥ 35 kg) o 15 mg/kg (< 35 kg), como en las fichas técnicas de hierro EV',
    formula: 'Déficit de hierro (mg) = peso (kg) × (Hb objetivo − Hb actual) (g/dL) × 2,4 + hierro de depósito (mg)\n(2,4 = 0,0034 × 0,07 × 10 000: contenido de hierro de la Hb 0,34 % × volemia 7 % del peso)',
    in: [
      { t: 'num', id: 'peso', l: 'Peso', u: 'kg', min: 1, max: 300, alt: [U.lb] },
      { t: 'num', id: 'hb', l: 'Hb actual', u: 'g/dL', min: 2, max: 20, step: 0.1, alt: [U.hb_gl] },
      { t: 'num', id: 'obj', l: 'Hb objetivo (habitual: 15 g/dL si ≥ 35 kg; 13 g/dL si < 35 kg)', u: 'g/dL', min: 8, max: 16, step: 0.1, alt: [U.hb_gl] },
      { t: 'sel', id: 'dep', l: 'Hierro de depósito', o: [['500', '500 mg (≥ 35 kg)'], ['15kg', '15 mg/kg (< 35 kg)'], ['0', 'No incluir depósitos']] }
    ],
    calc: v => {
      if (v.obj <= v.hb) return { r: 'Hb actual ≥ objetivo', u: '', note: 'La fórmula no aplica: no hay déficit de Hb respecto del objetivo.' };
      const dep = v.dep == '500' ? 500 : v.dep == '15kg' ? 15 * v.peso : 0;
      const hb = v.peso * (v.obj - v.hb) * 2.4;
      return { r: rd(hb + dep, 0), u: 'mg', d: 0, lab: 'Déficit total de hierro', more: [['Hierro de la Hb', fx(hb, 0) + ' mg'], ['Depósitos', fx(dep, 0) + ' mg']], note: 'Estimación del déficit, no una prescripción: la dosis máxima por infusión y el esquema dependen del preparado.' };
    },
    ref: 'Ganzoni AM. Intravenöse Eisen-Dextran-Therapie: therapeutische und experimentelle Möglichkeiten [Intravenous iron-dextran: therapeutic and experimental possibilities]. Schweiz Med Wochenschr. 1970;100:301–303.',
    verif: '2026-10',
    pop: 'Ferropenia con anemia en adultos y niños (con ajuste de depósitos y objetivo < 35 kg).',
    lim: 'Usar el peso real; en obesidad o embarazo algunos esquemas usan peso previo/ideal. Subestima el déficit con pérdidas continuas y no aplica a anemias no ferropénicas. Hb objetivo y depósitos son decisiones explícitas del usuario. Varios hierros EV actuales (carboximaltosa, derisomaltosa) proponen tablas simplificadas por peso y Hb en su ficha técnica.',
    tests: [
      { v: { peso: 70, hb: 9, obj: 15, dep: '500' }, r: 1508 },
      { v: { peso: 30, hb: 8, obj: 13, dep: '15kg' }, r: 810 }
    ]
  },
  {
    id: 'transf-incremento-hb', m: 'f', cat: 'hematologia', tags: [],
    n: 'Cálculos transfusionales (incremento esperado de Hb)', sig: '', syn: ['transfusion', 'globulos rojos', 'incremento de hemoglobina', 'unidades'],
    tipo: 'estimación',
    fin: 'Estimación del incremento de Hb por unidad de concentrado de glóbulos rojos.',
    ver: '—',
    pend: 'El incremento «≈ 1 g/dL (o 3 % de Hto) por unidad» es una aproximación empírica que depende del volumen y Hto de la unidad, la volemia y las pérdidas en curso; no se encontró una fórmula validada de uso general en adultos. Las fórmulas de volumen a transfundir son pediátricas y quedan fuera de este archivo.',
    ref: 'Pendiente de fuente validada.',
    lim: 'Sin cálculo hasta disponer de una fórmula validada.',
    in: []
  },

  // ═══════════════════════════ GASTRO ═══════════════════════════
  {
    id: 'de-ritis', m: 'f', cat: 'gastro', tags: [],
    n: 'Relación AST/ALT (De Ritis)', sig: 'AST/ALT', syn: ['de ritis', 'got/gpt', 'cociente ast alt'],
    tipo: 'índice',
    fin: 'Cociente entre aminotransferasas, usado como orientación etiológica en hepatopatías.',
    ver: 'De Ritis 1957; interpretación > 2 según Cohen y Kaplan 1979',
    formula: 'Relación de De Ritis = AST (GOT) / ALT (GPT)  (ambas en U/L)',
    in: [
      { t: 'num', id: 'ast', l: 'AST (GOT)', u: 'U/L', min: 1, max: 50000 },
      { t: 'num', id: 'alt', l: 'ALT (GPT)', u: 'U/L', min: 1, max: 50000 }
    ],
    calc: v => {
      const r = v.ast / v.alt;
      return { r: rd(r, 2), u: '', d: 2, lab: 'AST/ALT', interp: r > 2 ? '> 2: sugestivo de hepatopatía alcohólica (Cohen y Kaplan 1979)' : '', lvl: r > 2 ? 'warn' : '' };
    },
    ref: 'De Ritis F, Coltorti M, Giusti G. An enzymic test for the diagnosis of viral hepatitis: the transaminase serum activities. Clin Chim Acta. 1957;2:70–74. · Cohen JA, Kaplan MM. The SGOT/SGPT ratio — an indicator of alcoholic liver disease. Dig Dis Sci. 1979;24:835–838.',
    url: 'https://doi.org/10.1007/BF01324898',
    verif: '2026-10',
    pop: 'Adultos con alteración del hepatograma.',
    lim: 'Orientativo, no diagnóstico. El cociente también aumenta en cirrosis de cualquier causa, enfermedad de Wilson, injuria muscular (la AST no es hepatoespecífica) y hemólisis. Variabilidad entre laboratorios (presencia o no de piridoxal-5-fosfato en el ensayo).',
    tests: [
      { v: { ast: 120, alt: 50 }, r: 2.4 },
      { v: { ast: 40, alt: 80 }, r: 0.5 }
    ]
  },
  {
    id: 'indice-r-dili', m: 'f', cat: 'gastro', tags: [],
    n: 'Índice R para injuria hepática por fármacos', sig: 'R', syn: ['dili', 'hepatotoxicidad', 'indice r', 'r ratio', 'rucam'],
    tipo: 'clasificación',
    fin: 'Clasifica el patrón de injuria hepática (hepatocelular, mixto o colestásico) en la sospecha de DILI.',
    ver: 'Consenso CIOMS (Bénichou 1990), usado por RUCAM y EASL 2019',
    formula: 'R = (ALT / LSN de ALT) / (FAL / LSN de FAL)\nR ≥ 5: hepatocelular · 2 < R < 5: mixto · R ≤ 2: colestásico',
    in: [
      { t: 'num', id: 'alt', l: 'ALT (GPT)', u: 'U/L', min: 1, max: 50000 },
      { t: 'num', id: 'altl', l: 'Límite superior normal de ALT', u: 'U/L', min: 5, max: 200 },
      { t: 'num', id: 'fal', l: 'Fosfatasa alcalina', u: 'U/L', min: 1, max: 20000 },
      { t: 'num', id: 'fall', l: 'Límite superior normal de FAL', u: 'U/L', min: 20, max: 1000 }
    ],
    calc: v => {
      const r = (v.alt / v.altl) / (v.fal / v.fall);
      const interp = r >= 5 ? 'Patrón hepatocelular (R ≥ 5)' : r <= 2 ? 'Patrón colestásico (R ≤ 2)' : 'Patrón mixto (2 < R < 5)';
      return { r: rd(r, 2), u: '', d: 2, lab: 'Índice R', interp, lvl: 'warn', more: [['ALT × LSN', fx(v.alt / v.altl, 1)], ['FAL × LSN', fx(v.fal / v.fall, 1)]] };
    },
    ref: 'Bénichou C. Criteria of drug-induced liver disorders. Report of an international consensus meeting. J Hepatol. 1990;11:272–276. · European Association for the Study of the Liver. EASL Clinical Practice Guidelines: Drug-induced liver injury. J Hepatol. 2019;70:1222–1261.',
    url: 'https://doi.org/10.1016/j.jhep.2019.02.014',
    verif: '2026-10',
    pop: 'Sospecha de injuria hepática inducida por fármacos o tóxicos.',
    lim: 'Usar valores del mismo momento, idealmente los primeros de la injuria; el patrón puede cambiar en la evolución. La FAL puede elevarse por causa ósea, embarazo o crecimiento. Variante «R nuevo» (nR) usa ALT o AST, la mayor. Solo clasifica el patrón: no establece causalidad (para eso, RUCAM).',
    tests: [
      { v: { alt: 400, altl: 40, fal: 150, fall: 120 }, r: 8 },
      { v: { alt: 80, altl: 40, fal: 480, fall: 120 }, r: 0.5 },
      { v: { alt: 120, altl: 40, fal: 120, fall: 120 }, r: 'mixto' }
    ]
  },
  {
    id: 'perdidas-gi', m: 'f', cat: 'gastro', tags: ['f:medio-interno', 'f:fluidos'],
    n: 'Estimación de electrolitos en pérdidas gastrointestinales', sig: '', syn: ['perdidas digestivas', 'sng', 'ileostomia', 'fistula', 'debito gastrico', 'reposicion'],
    tipo: 'estimación',
    fin: 'Estima el rango de Na⁺, K⁺ y Cl⁻ perdido a partir del volumen medido y la composición habitual del líquido digestivo.',
    ver: 'Composición de líquidos corporales según MSD Manual (rangos en mEq/L)',
    formula: 'Pérdida estimada (mEq) = volumen (L) × concentración típica (mEq/L), con los extremos del rango\nRangos (Na⁺ / K⁺ / Cl⁻, mEq/L): gástrico 20–80 / 5–20 / 100–150 · pancreático 120–140 / 5–15 / 90–120 · intestino delgado 100–140 / 5–15 / 90–130 · biliar 120–140 / 5–15 / 80–120 · ileostomía 45–135 / 3–15 / 20–115 · diarrea 10–90 / 10–80 / 10–110',
    in: [
      { t: 'sel', id: 'tipo', l: 'Tipo de líquido', o: Object.entries(GI).map(([k, x]) => [k, x[0]]) },
      { t: 'num', id: 'vol', l: 'Volumen medido', u: 'mL', min: 1, max: 20000 }
    ],
    calc: v => {
      const [nom, na, k, cl] = GI[v.tipo], L = v.vol / 1000;
      const rg = x => fx(x[0] * L, 0) + '–' + fx(x[1] * L, 0) + ' mEq';
      return { r: fx(na[0] * L, 0) + '–' + fx(na[1] * L, 0), u: 'mEq de Na⁺', lab: 'Na⁺ estimado perdido (' + nom.toLowerCase() + ')', more: [['K⁺', rg(k)], ['Cl⁻', rg(cl)], ['Volumen', fx(v.vol, 0) + ' mL']], note: 'Estimación orientativa, no una indicación de reposición. HCO₃⁻ no incluido: la fuente consultada no informa sus valores. Si la pérdida es importante o persistente, medir electrolitos en el líquido.' };
    },
    ref: 'MSD Manual Professional Edition. Tabla: Composition of Body Fluids (composición de los líquidos corporales).',
    url: 'https://www.merckmanuals.com/professional/multimedia/table/composition-of-body-fluids',
    verif: '2026-10',
    pop: 'Adultos con pérdidas digestivas (SNG, ostomías, fístulas, diarrea).',
    lim: 'Rangos amplios y variables entre pacientes y a lo largo del día; los valores medidos en el líquido son preferibles. No incluye bicarbonato ni H⁺. No considera pérdidas insensibles ni el estado de volumen. No constituye una orden de reposición.',
    tests: [
      { v: { tipo: 'gastrico', vol: 1000 }, r: '20–80' },
      { v: { tipo: 'ileostomia', vol: 1500 }, r: '68–203' }
    ]
  },

  // ═══════════════════════════ ENDOCRINO ═══════════════════════════
  {
    id: 'osm-efectiva', m: 'f', cat: 'endocrino', tags: ['f:medio-interno'],
    n: 'Osmolalidad efectiva (tonicidad)', sig: 'Osm ef', syn: ['tonicidad', 'osmolalidad efectiva', 'ehh', 'estado hiperosmolar'],
    tipo: 'cálculo',
    fin: 'Calcula la osmolalidad plasmática efectiva (sin urea), usada en el diagnóstico del estado hiperglucémico hiperosmolar.',
    ver: 'Consenso ADA/EASD/JBDS/AACE/DTS 2024 sobre crisis hiperglucémicas',
    formula: 'Osmolalidad efectiva (mOsm/kg) = 2 × Na⁺ (mEq/L) + glucosa (mg/dL) / 18\n(con glucosa en mmol/L: 2 × Na⁺ + glucosa)',
    in: [
      { t: 'num', id: 'na', l: 'Sodio', u: 'mEq/L', min: 90, max: 200 },
      { t: 'num', id: 'glu', l: 'Glucosa', u: 'mg/dL', min: 10, max: 3000, alt: [U.glu_mmol] }
    ],
    calc: v => {
      const o = 2 * v.na + v.glu / 18;
      return { r: rd(o, 0), u: 'mOsm/kg', d: 0, lab: 'Osmolalidad efectiva', interp: o > 300 ? '> 300 mOsm/kg: cumple el criterio de hiperosmolalidad del EHH (consenso 2024; requiere además glucosa ≥ 600 mg/dL y ausencia de cetoacidosis significativa)' : '', lvl: o > 300 ? 'warn' : '' };
    },
    ref: 'Umpierrez GE, Davis GM, ElSayed NA, et al. Hyperglycemic crises in adults with diabetes: a consensus report. Diabetes Care. 2024;47:1257–1275.',
    url: 'https://doi.org/10.2337/dci24-0032',
    verif: '2026-10',
    pop: 'Adultos con diabetes y crisis hiperglucémica.',
    lim: 'Calculada: no reemplaza la osmolalidad medida. Excluye la urea (osmol ineficaz). Con hipertrigliceridemia o hiperproteinemia el Na⁺ por fotometría indirecta puede ser falsamente bajo (pseudohiponatremia). El consenso 2009 usaba > 320 mOsm/kg.',
    tests: [
      { v: { na: 140, glu: 180 }, r: 290 },
      { v: { na: 150, glu: 900 }, r: 'cumple' }
    ]
  },
  {
    id: 'ldl-friedewald', m: 'f', cat: 'endocrino', tags: ['f:cardiologia'],
    n: 'LDL por Friedewald', sig: 'LDL-c', syn: ['ldl calculado', 'friedewald', 'colesterol ldl'],
    tipo: 'estimación',
    fin: 'Estima el colesterol LDL a partir del colesterol total, HDL y triglicéridos.',
    ver: 'Friedewald 1972',
    formula: 'LDL (mg/dL) = CT − HDL − TG / 5\n(en mmol/L: LDL = CT − HDL − TG / 2,2)\nNo válida con TG ≥ 400 mg/dL (≥ 4,5 mmol/L)',
    in: [
      { t: 'num', id: 'ct', l: 'Colesterol total', u: 'mg/dL', min: 50, max: 1000, alt: [A.col_mmol] },
      { t: 'num', id: 'hdl', l: 'Colesterol HDL', u: 'mg/dL', min: 5, max: 200, alt: [A.col_mmol] },
      { t: 'num', id: 'tg', l: 'Triglicéridos', u: 'mg/dL', min: 10, max: 10000, alt: [A.tg_mmol] }
    ],
    calc: v => {
      if (v.tg >= 400) return { r: 'No válida (TG ≥ 400 mg/dL)', u: '', lvl: 'warn', note: 'Solicitar LDL directo o usar otra ecuación validada.' };
      const l = v.ct - v.hdl - v.tg / 5;
      if (l <= 0) return null;
      return { r: rd(l, 0), u: 'mg/dL', d: 0, lab: 'LDL calculado', more: [['LDL', fx(l / 38.67, 2) + ' mmol/L'], ['Colesterol no-HDL', fx(v.ct - v.hdl, 0) + ' mg/dL']] };
    },
    ref: 'Friedewald WT, Levy RI, Fredrickson DS. Estimation of the concentration of low-density lipoprotein cholesterol in plasma, without use of the preparative ultracentrifuge. Clin Chem. 1972;18:499–502.',
    url: 'https://doi.org/10.1093/clinchem/18.6.499',
    verif: '2026-10',
    pop: 'Adultos en ayunas, sin hiperlipoproteinemia tipo III.',
    lim: 'Inválida con TG ≥ 400 mg/dL y en disbetalipoproteinemia; subestima el LDL con TG altos o LDL bajo (< 70 mg/dL), justamente en pacientes con metas estrictas. Las ecuaciones de Martin-Hopkins o Sampson (NIH) son más exactas en esos casos. Conversión: colesterol mg/dL ÷ 38,67 = mmol/L; TG ÷ 88,57.',
    tests: [
      { v: { ct: 200, hdl: 50, tg: 150 }, r: 120 },
      { v: { ct: 180, hdl: 40, tg: 100 }, r: 120 },
      { v: { ct: 250, hdl: 40, tg: 450 }, r: 'no válida' }
    ]
  },
  {
    id: 'homa-ir', m: 'f', cat: 'endocrino', tags: ['s:endocrino'],
    n: 'HOMA-IR', sig: 'HOMA-IR', syn: ['homa', 'resistencia a la insulina', 'insulinorresistencia'],
    tipo: 'índice',
    fin: 'Estima la resistencia a la insulina a partir de glucosa e insulina en ayunas.',
    ver: 'Modelo HOMA1 (Matthews 1985), aproximación lineal',
    formula: 'HOMA-IR = glucosa en ayunas (mg/dL) × insulina en ayunas (µU/mL) / 405\n(con glucosa en mmol/L: glucosa × insulina / 22,5)',
    in: [
      { t: 'num', id: 'glu', l: 'Glucosa en ayunas', u: 'mg/dL', min: 30, max: 600, alt: [U.glu_mmol] },
      { t: 'num', id: 'ins', l: 'Insulina en ayunas', u: 'µU/mL', min: 0.5, max: 500, step: 0.1 }
    ],
    calc: v => ({ r: rd(v.glu * v.ins / 405, 2), u: '', d: 2, lab: 'HOMA-IR', note: 'Sin punto de corte universal: depende de la población, la edad y el ensayo de insulina.' }),
    ref: 'Matthews DR, Hosker JP, Rudenski AS, Naylor BA, Treacher DF, Turner RC. Homeostasis model assessment: insulin resistance and β-cell function from fasting plasma glucose and insulin concentrations in man. Diabetologia. 1985;28:412–419.',
    url: 'https://doi.org/10.1007/BF00280883',
    verif: '2026-10',
    pop: 'Adultos, uso epidemiológico y de investigación.',
    lim: 'Herramienta de investigación/epidemiológica, no diagnóstica. Los ensayos de insulina no están estandarizados (valores no comparables entre laboratorios). No válido en tratados con insulina ni en diabetes con déficit de secreción marcado. El modelo HOMA2 (calculadora de la Universidad de Oxford) es la versión actualizada.',
    tests: [
      { v: { glu: 100, ins: 10 }, r: 2.47 },
      { v: { glu: 90, ins: 5 }, r: 1.11 }
    ]
  },

  // ═══════════════════════════ NUTRICIÓN ═══════════════════════════
  {
    id: 'req-energetico', m: 'f', cat: 'nutricion', tags: [],
    n: 'Requerimiento energético estimado (kcal/kg/día)', sig: '', syn: ['calorias', 'kcal/kg', 'requerimiento calorico', 'aspen', 'espen'],
    tipo: 'estimación',
    fin: 'Estima el aporte energético diario con el método de kcal por kg según la guía y situación clínica elegidas.',
    ver: 'ASPEN 2022 (crítico) · ASPEN/SCCM 2016 (crítico obeso) · ESPEN 2018 (polimórbido) · ESPEN 2019 (geriatría)',
    formula: 'Energía (kcal/día) = peso (kg) × kcal/kg/día de la situación elegida\n• ASPEN 2022, crítico (primeros 7–10 días): 12–25 kcal/kg peso actual\n• ASPEN/SCCM 2016, crítico IMC 30–50: 11–14 kcal/kg peso actual\n• ASPEN/SCCM 2016, crítico IMC > 50: 22–25 kcal/kg peso ideal\n• ESPEN 2018, polimórbido > 65 años: 27 kcal/kg\n• ESPEN 2018, polimórbido con bajo peso grave: 30 kcal/kg\n• ESPEN 2019, adulto mayor: 30 kcal/kg (valor orientativo)',
    in: [
      { t: 'sel', id: 'sit', l: 'Situación clínica / guía', o: Object.entries(KCAL).map(([k, x]) => [k, x[3] + ' — ' + rangoTxt(x[0], x[1]) + ' kcal/kg (' + x[2] + ')']) },
      { t: 'num', id: 'peso', l: 'Peso (el indicado en la opción: actual o ideal)', u: 'kg', min: 2, max: 400, alt: [U.lb] }
    ],
    calc: v => {
      const [a, b, p, s] = KCAL[v.sit];
      return { r: rangoTxt(a * v.peso, b * v.peso), u: 'kcal/día', lab: 'Energía estimada', more: [['Fuente', s], ['Peso a usar', p]], note: 'Estimación; la calorimetría indirecta es la referencia cuando está disponible.' };
    },
    ref: 'Compher C, Bingham AL, McCall M, et al. Guidelines for the provision of nutrition support therapy in the adult critically ill patient: the American Society for Parenteral and Enteral Nutrition. JPEN J Parenter Enteral Nutr. 2022;46:12–41. · McClave SA, Taylor BE, Martindale RG, et al. Guidelines for the provision and assessment of nutrition support therapy in the adult critically ill patient: SCCM and A.S.P.E.N. JPEN J Parenter Enteral Nutr. 2016;40:159–211. · Gomes F, Schuetz P, Bounoure L, et al. ESPEN guidelines on nutritional support for polymorbid internal medicine patients. Clin Nutr. 2018;37:336–353. · Volkert D, Beck AM, Cederholm T, et al. ESPEN guideline on clinical nutrition and hydration in geriatrics. Clin Nutr. 2019;38:10–47.',
    url: 'https://doi.org/10.1002/jpen.2267',
    verif: '2026-10',
    pop: 'Adultos hospitalizados según la población de cada guía.',
    lim: 'Las ecuaciones por kg son imprecisas en extremos de peso, edema o amputaciones. En el crítico, ESPEN 2019 recomienda nutrición hipocalórica (< 70 % del gasto estimado) en la fase temprana. Progresar lentamente si hay riesgo de síndrome de realimentación. No es una prescripción.',
    tests: [
      { v: { sit: 'aspen22', peso: 70 }, r: '840–1750' },
      { v: { sit: 'espen_pm65', peso: 70 }, r: '1890' },
      { v: { sit: 'aspen16_ob2', peso: 60 }, r: '1320–1500' }
    ]
  },
  {
    id: 'req-proteico', m: 'f', cat: 'nutricion', tags: [],
    n: 'Requerimiento proteico estimado (g/kg/día)', sig: '', syn: ['proteinas', 'g/kg', 'requerimiento de proteinas'],
    tipo: 'estimación',
    fin: 'Estima el aporte proteico diario por kg según la guía y situación clínica elegidas.',
    ver: 'ASPEN/SCCM 2016–ASPEN 2022 · ESPEN 2019 (UTI) · ESPEN 2018 (polimórbido) · ESPEN 2019 (geriatría) · KDOQI 2020',
    formula: 'Proteínas (g/día) = peso (kg) × g/kg/día de la situación elegida\n• Crítico (ASPEN/SCCM 2016; ASPEN 2022): 1,2–2,0 g/kg peso actual\n• Crítico IMC 30–40 (ASPEN/SCCM 2016): 2,0 g/kg peso ideal\n• Crítico IMC ≥ 40 (ASPEN/SCCM 2016): hasta 2,5 g/kg peso ideal\n• Crítico (ESPEN 2019): 1,3 g/kg, progresivo\n• Polimórbido clínica médica (ESPEN 2018): ≥ 1,0 g/kg\n• Adulto mayor (ESPEN 2019): ≥ 1,0 g/kg\n• ERC 5D en diálisis estable (KDOQI 2020): 1,0–1,2 g/kg',
    in: [
      { t: 'sel', id: 'sit', l: 'Situación clínica / guía', o: Object.entries(PROT).map(([k, x]) => [k, x[3] + ' — ' + rangoTxt(x[0], x[1], 1) + ' g/kg (' + x[2] + ')']) },
      { t: 'num', id: 'peso', l: 'Peso (el indicado en la opción: actual o ideal)', u: 'kg', min: 2, max: 400, alt: [U.lb] }
    ],
    calc: v => {
      const [a, b, p, s] = PROT[v.sit];
      return { r: rangoTxt(a * v.peso, b * v.peso), u: 'g/día', lab: 'Proteínas estimadas', more: [['Fuente', s], ['Peso a usar', p]], note: 'Estimación; ajustar a función renal, hepática y evolución clínica.' };
    },
    ref: 'McClave SA, et al. SCCM/A.S.P.E.N. guidelines, adult critically ill patient. JPEN J Parenter Enteral Nutr. 2016;40:159–211. · Compher C, et al. ASPEN critical care guidelines. JPEN J Parenter Enteral Nutr. 2022;46:12–41. · Singer P, Blaser AR, Berger MM, et al. ESPEN guideline on clinical nutrition in the intensive care unit. Clin Nutr. 2019;38:48–79. · Gomes F, et al. ESPEN guidelines on nutritional support for polymorbid internal medicine patients. Clin Nutr. 2018;37:336–353. · Volkert D, et al. ESPEN guideline on clinical nutrition and hydration in geriatrics. Clin Nutr. 2019;38:10–47. · Ikizler TA, Burrowes JD, Byham-Gray LD, et al. KDOQI clinical practice guideline for nutrition in CKD: 2020 update. Am J Kidney Dis. 2020;76(3 Suppl 1):S1–S107.',
    url: 'https://doi.org/10.1016/j.clnu.2018.08.037',
    verif: '2026-10',
    pop: 'Adultos según la población de cada guía.',
    lim: 'Las recomendaciones difieren entre guías y se basan mayormente en evidencia de baja calidad. En ERC sin diálisis, hepatopatía, quemados o pérdidas proteicas aumentadas los objetivos son otros. No es una prescripción.',
    tests: [
      { v: { sit: 'aspen_uti', peso: 70 }, r: '84–140' },
      { v: { sit: 'espen_uti', peso: 80 }, r: '104' }
    ]
  },
  {
    id: 'harris-benedict', m: 'f', cat: 'nutricion', tags: [],
    n: 'Harris–Benedict (gasto energético basal)', sig: 'HB', syn: ['harris benedict', 'gasto basal', 'metabolismo basal', 'roza shizgal'],
    tipo: 'estimación',
    fin: 'Estima el gasto energético basal con la ecuación de Harris–Benedict original o su revisión de Roza y Shizgal.',
    ver: 'Original 1919 o revisión de Roza–Shizgal 1984 (se indica la usada)',
    formula: 'Original (1919):\n  Varón: 66,4730 + 13,7516·P + 5,0033·T − 6,7550·E\n  Mujer: 655,0955 + 9,5634·P + 1,8496·T − 4,6756·E\nRoza–Shizgal (1984):\n  Varón: 88,362 + 13,397·P + 4,799·T − 5,677·E\n  Mujer: 447,593 + 9,247·P + 3,098·T − 4,330·E\n(P = peso kg; T = talla cm; E = edad años; resultado en kcal/día)',
    in: [
      { t: 'sel', id: 'ver', l: 'Versión', o: [['1919', 'Original (Harris y Benedict 1919)'], ['1984', 'Revisada (Roza y Shizgal 1984)']] },
      { t: 'sel', id: 'sexo', l: 'Sexo', o: [['m', 'Masculino'], ['f', 'Femenino']] },
      { t: 'num', id: 'peso', l: 'Peso', u: 'kg', min: 20, max: 300, alt: [U.lb] },
      { t: 'num', id: 'talla', l: 'Talla', u: 'cm', min: 100, max: 230, alt: [U.inch] },
      { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 15, max: 110 }
    ],
    calc: v => {
      const C = { '1919': { m: [66.4730, 13.7516, 5.0033, 6.7550], f: [655.0955, 9.5634, 1.8496, 4.6756] }, '1984': { m: [88.362, 13.397, 4.799, 5.677], f: [447.593, 9.247, 3.098, 4.330] } }[v.ver][v.sexo];
      const g = C[0] + C[1] * v.peso + C[2] * v.talla - C[3] * v.edad;
      return { r: rd(g, 0), u: 'kcal/día', d: 0, lab: 'Gasto energético basal (' + (v.ver == '1919' ? 'Harris–Benedict 1919' : 'Roza–Shizgal 1984') + ')', note: 'Gasto basal: no incluye actividad ni estrés.' };
    },
    ref: 'Harris JA, Benedict FG. A biometric study of human basal metabolism. Proc Natl Acad Sci USA. 1918;4:370–373 (monografía completa: Carnegie Institution of Washington, Publ. n.º 279; 1919). · Roza AM, Shizgal HM. The Harris Benedict equation reevaluated: resting energy requirements and the body cell mass. Am J Clin Nutr. 1984;40:168–182.',
    url: 'https://doi.org/10.1093/ajcn/40.1.168',
    verif: '2026-10',
    pop: 'Adultos sanos (derivación original en 239 sujetos).',
    lim: 'Derivada en adultos sanos, mayormente jóvenes y de peso normal: tiende a sobreestimar en población actual y es imprecisa en obesidad, enfermedad crítica y edades extremas. Los factores de actividad/estrés no forman parte de la ecuación original. La calorimetría indirecta es la referencia.',
    tests: [
      { v: { ver: '1919', sexo: 'm', peso: 70, talla: 175, edad: 30 }, r: 1702 },
      { v: { ver: '1919', sexo: 'f', peso: 60, talla: 165, edad: 40 }, r: 1347 },
      { v: { ver: '1984', sexo: 'm', peso: 70, talla: 175, edad: 30 }, r: 1696 }
    ]
  },
  {
    id: 'mifflin', m: 'f', cat: 'nutricion', tags: [],
    n: 'Mifflin–St Jeor (gasto energético en reposo)', sig: '', syn: ['mifflin', 'st jeor', 'gasto en reposo', 'ger'],
    tipo: 'estimación',
    fin: 'Estima el gasto energético en reposo con la ecuación de Mifflin–St Jeor.',
    ver: 'Mifflin–St Jeor 1990',
    formula: 'GER (kcal/día) = 10·P + 6,25·T − 5·E + 5 (varón) / − 161 (mujer)\n(P = peso kg; T = talla cm; E = edad años)',
    in: [
      { t: 'sel', id: 'sexo', l: 'Sexo', o: [['m', 'Masculino'], ['f', 'Femenino']] },
      { t: 'num', id: 'peso', l: 'Peso', u: 'kg', min: 20, max: 300, alt: [U.lb] },
      { t: 'num', id: 'talla', l: 'Talla', u: 'cm', min: 100, max: 230, alt: [U.inch] },
      { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 15, max: 110 }
    ],
    calc: v => ({ r: rd(10 * v.peso + 6.25 * v.talla - 5 * v.edad + (v.sexo == 'm' ? 5 : -161), 0), u: 'kcal/día', d: 0, lab: 'Gasto energético en reposo', note: 'En reposo: no incluye actividad ni estrés.' }),
    ref: 'Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51:241–247.',
    url: 'https://doi.org/10.1093/ajcn/51.2.241',
    verif: '2026-10',
    pop: 'Adultos sanos de 19–78 años, con peso normal y obesidad (n = 498).',
    lim: 'Considerada de las más exactas en adultos sanos y con obesidad, pero imprecisa en el paciente crítico, en extremos de edad y con alteraciones de composición corporal. La calorimetría indirecta es la referencia.',
    tests: [
      { v: { sexo: 'm', peso: 70, talla: 175, edad: 30 }, r: 1649, tol: 1 },
      { v: { sexo: 'f', peso: 60, talla: 165, edad: 40 }, r: 1270, tol: 1 }
    ]
  },

  // ═══════════════════════════ OBSTETRICIA ═══════════════════════════
  {
    id: 'eg-fum', m: 'f', cat: 'obstetricia', tags: [],
    n: 'Edad gestacional según FUM', sig: 'EG', syn: ['edad gestacional', 'fum', 'semanas de embarazo'],
    tipo: 'cálculo',
    fin: 'Calcula la edad gestacional en semanas y días desde la fecha de última menstruación hasta una fecha de referencia.',
    ver: 'Cálculo por FUM (ACOG/AIUM/SMFM, Committee Opinion 700, 2017)',
    formula: 'EG = (fecha de referencia − FUM) en días → semanas completas + días',
    in: [
      { t: 'date', id: 'fum', l: 'Fecha de última menstruación (FUM)' },
      { t: 'date', id: 'ref', l: 'Fecha de referencia (vacío = hoy)', req: 0 }
    ],
    calc: v => {
      if (!v.fum) return null;
      const ref = v.ref || isoHoy();
      const d = days(v.fum, ref);
      if (d < 0 || d > 320) return null;
      const w = Math.floor(d / 7), r = d % 7;
      return { r: `${w} sem ${r} d`, u: '', lab: 'Edad gestacional por FUM', more: [['Días desde FUM', String(d)], ['Fecha de referencia', sumarDias(ref, 0)], ['Fecha probable de parto', sumarDias(v.fum, 280)]], note: v.ref ? '' : 'Calculada al día de hoy.' };
    },
    ref: 'American College of Obstetricians and Gynecologists. Committee Opinion No. 700: Methods for estimating the due date. Obstet Gynecol. 2017;129:e150–e154.',
    url: 'https://doi.org/10.1097/AOG.0000000000002046',
    verif: '2026-10',
    pop: 'Embarazadas con FUM confiable y ciclos regulares.',
    lim: 'Supone ciclos de 28 días con ovulación el día 14. ACOG recomienda confirmar o redefinir la EG con ecografía del primer trimestre (LCC), que prevalece si la discrepancia supera el umbral para la EG. No válida con FUM incierta, ciclos irregulares, anticoncepción hormonal reciente o reproducción asistida (usar la fecha de transferencia).',
    tests: [
      { v: { fum: '2026-01-01', ref: '2026-04-01' }, r: '12 sem 6 d' },
      { v: { fum: '2025-12-01', ref: '2026-03-15' }, r: '14 sem 6 d' }
    ]
  },
  {
    id: 'fpp-naegele', m: 'f', cat: 'obstetricia', tags: [],
    n: 'Fecha probable de parto (Naegele)', sig: 'FPP', syn: ['fecha probable de parto', 'naegele', 'fpp'],
    tipo: 'cálculo',
    fin: 'Calcula la fecha probable de parto sumando 280 días a la FUM.',
    ver: 'Regla de Naegele (FUM + 280 días), según ACOG Committee Opinion 700',
    formula: 'FPP = FUM + 280 días (40 semanas)',
    in: [{ t: 'date', id: 'fum', l: 'Fecha de última menstruación (FUM)' }],
    calc: v => (v.fum ? { r: sumarDias(v.fum, 280), u: '', lab: 'Fecha probable de parto', more: [['37 semanas (término)', sumarDias(v.fum, 259)], ['42 semanas', sumarDias(v.fum, 294)]] } : null),
    ref: 'American College of Obstetricians and Gynecologists. Committee Opinion No. 700: Methods for estimating the due date. Obstet Gynecol. 2017;129:e150–e154.',
    url: 'https://doi.org/10.1097/AOG.0000000000002046',
    verif: '2026-10',
    pop: 'Embarazadas con FUM confiable y ciclos regulares de 28 días.',
    lim: 'Supone ciclo de 28 días. Solo una minoría de los partos ocurre en la FPP. Si hay ecografía del primer trimestre, la FPP se define según ACOG por la combinación FUM/ecografía. En reproducción asistida se calcula desde la transferencia.',
    tests: [
      { v: { fum: '2026-01-01' }, r: '08/10/2026' },
      { v: { fum: '2025-05-20' }, r: '24/02/2026' }
    ]
  },

  // ═══════════════════════════ PEDIATRÍA ═══════════════════════════
  {
    id: 'schwartz-bedside', m: 'f', cat: 'pediatria', tags: ['f:nefrologia'],
    n: 'Filtrado glomerular por Schwartz bedside', sig: 'eGFR', syn: ['schwartz', 'filtrado pediatrico', 'ckid', 'fg niños'],
    tipo: 'estimación',
    fin: 'Estima el filtrado glomerular en niños a partir de talla y creatinina sérica (método enzimático).',
    ver: 'Schwartz «bedside» 2009 (CKiD), creatinina trazable a IDMS',
    formula: 'eFG (mL/min/1,73 m²) = 0,413 × talla (cm) / creatinina (mg/dL)',
    in: [
      { t: 'num', id: 'talla', l: 'Talla', u: 'cm', min: 40, max: 200, alt: [U.inch] },
      { t: 'num', id: 'cr', l: 'Creatinina sérica (enzimática/IDMS)', u: 'mg/dL', min: 0.1, max: 20, step: 0.01, alt: [U.creat_umol] }
    ],
    calc: v => ({ r: rd(0.413 * v.talla / v.cr, 1), u: 'mL/min/1,73 m²', d: 1, lab: 'eFG (Schwartz bedside)' }),
    ref: 'Schwartz GJ, Muñoz A, Schneider MF, et al. New equations to estimate GFR in children with CKD. J Am Soc Nephrol. 2009;20:629–637.',
    url: 'https://doi.org/10.1681/ASN.2008030287',
    verif: '2026-10',
    pop: 'Niños de 1–16 años con ERC (cohorte CKiD, FG medido por iohexol ≈ 15–75 mL/min/1,73 m²).',
    lim: 'Requiere creatinina por método enzimático/IDMS (con Jaffé sobreestima). Menos exacta con FG normal o alto, en desnutrición, amputaciones o masa muscular alterada, en recién nacidos y en insuficiencia renal aguda (creatinina no estable). No usar la constante clásica 0,55 con creatinina IDMS.',
    tests: [
      { v: { talla: 120, cr: 0.8 }, r: 61.95, tol: 0.1 },
      { v: { talla: 100, cr: 0.5 }, r: 82.6 }
    ]
  },
  {
    id: 'holliday-segar', m: 'f', cat: 'pediatria', tags: ['f:fluidos'],
    n: 'Mantenimiento de fluidos pediátrico (Holliday–Segar)', sig: '4-2-1', syn: ['holliday segar', '4-2-1', 'fluidos de mantenimiento', 'hidratacion parenteral'],
    tipo: 'cálculo',
    fin: 'Calcula el volumen de mantenimiento diario (100-50-20 mL/kg) y horario (4-2-1 mL/kg/h) en pediatría.',
    ver: 'Holliday–Segar 1957 (volumen); tipo de solución según AAP 2018',
    formula: 'Diario: 100 mL/kg los primeros 10 kg + 50 mL/kg de 11 a 20 kg + 20 mL/kg por cada kg > 20\nHorario (4-2-1): 4 mL/kg/h los primeros 10 kg + 2 mL/kg/h de 11 a 20 kg + 1 mL/kg/h por cada kg > 20',
    in: [{ t: 'num', id: 'peso', l: 'Peso', u: 'kg', min: 0.5, max: 150, step: 0.1, alt: [U.lb] }],
    calc: v => {
      const p = v.peso;
      const dia = 100 * Math.min(p, 10) + 50 * Math.max(0, Math.min(p, 20) - 10) + 20 * Math.max(0, p - 20);
      const h = 4 * Math.min(p, 10) + 2 * Math.max(0, Math.min(p, 20) - 10) + Math.max(0, p - 20);
      return { r: rd(dia, 0), u: 'mL/día', d: 0, lab: 'Mantenimiento diario', more: [['Ritmo horario (4-2-1)', fx(h, 1) + ' mL/h'], ['Diario / 24', fx(dia / 24, 1) + ' mL/h']], note: 'AAP 2018 (28 días a 18 años): usar soluciones isotónicas con KCl y dextrosa apropiados como mantenimiento, para reducir el riesgo de hiponatremia. El volumen puede requerir restricción (SIHAD, IC, enfermedad renal).' };
    },
    ref: 'Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. 1957;19:823–832. · Feld LG, Neuspiel DR, Foster BA, et al. Clinical practice guideline: maintenance intravenous fluids in children. Pediatrics. 2018;142:e20183083 (tipo de solución).',
    url: 'https://doi.org/10.1542/peds.2018-3083',
    verif: '2026-10',
    pop: 'Niños fuera del período neonatal (AAP 2018: 28 días a 18 años; excluye neonatos < 28 días).',
    lim: 'Estima necesidades basales de agua derivadas del gasto calórico de niños sanos; no incluye déficit ni pérdidas en curso. Muchos pacientes hospitalizados (posoperatorio, enfermedad del SNC, neumonía) tienen ADH elevada y requieren menos volumen. No aplica a neonatos. La guía AAP 2018 respalda el tipo de solución, no el volumen.',
    tests: [
      { v: { peso: 25 }, r: 1600 },
      { v: { peso: 8 }, r: 800 },
      { v: { peso: 15 }, r: 1250 }
    ]
  },
  {
    id: 'deficit-agua-ped', m: 'f', cat: 'pediatria', tags: ['f:medio-interno'],
    n: 'Déficit de agua libre pediátrico', sig: 'DAL', syn: ['deficit de agua libre', 'hipernatremia pediatrica', 'agua libre'],
    tipo: 'estimación',
    fin: 'Estima el déficit de agua libre en hipernatremia a partir del agua corporal total con fracción explícita por edad.',
    ver: 'Fórmula clásica de déficit de agua libre; fracción de ACT 0,6 en niños (Adrogué–Madias 2000)',
    formula: 'ACT (L) = fracción × peso (kg)\nDéficit de agua libre (L) = ACT × (Na⁺ actual / Na⁺ objetivo − 1)',
    in: [
      { t: 'num', id: 'peso', l: 'Peso', u: 'kg', min: 0.5, max: 150, step: 0.1, alt: [U.lb] },
      { t: 'sel', id: 'fr', l: 'Fracción de agua corporal total', o: [['0.6', 'Niño ≥ 1 año: 0,6 (Adrogué–Madias 2000)'], ['otra', 'Otra (ingresar abajo; p. ej., recién nacido o lactante)']] },
      { t: 'num', id: 'frx', l: 'Fracción de ACT (si eligió «otra»)', u: '', min: 0.4, max: 0.85, step: 0.01, req: 0 },
      { t: 'num', id: 'na', l: 'Na⁺ actual', u: 'mEq/L', min: 140, max: 220 },
      { t: 'num', id: 'obj', l: 'Na⁺ objetivo (habitualmente 140)', u: 'mEq/L', min: 130, max: 150 }
    ],
    calc: v => {
      const f = v.fr == 'otra' ? v.frx : +v.fr;
      if (f == null || v.na <= v.obj) return null;
      const act = f * v.peso, d = act * (v.na / v.obj - 1);
      return { r: rd(d, 2), u: 'L', d: 2, lab: 'Déficit de agua libre', more: [['Fracción de ACT usada', fx(f, 2)], ['ACT', fx(act, 2) + ' L'], ['Equivalente', fx(d * 1000, 0) + ' mL']], note: 'No incluye mantenimiento ni pérdidas en curso. Estimación, no una orden: la velocidad de corrección del Na⁺ se define aparte.' };
    },
    ref: 'Adrogué HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342:1493–1499. · Friis-Hansen B. Body water compartments in children: changes during growth and related changes in body composition. Pediatrics. 1961;28:169–181 (ACT mayor en recién nacidos y lactantes).',
    url: 'https://doi.org/10.1056/NEJM200005183422006',
    verif: '2026-10',
    pop: 'Niños con hipernatremia hipovolémica o por pérdida de agua libre.',
    lim: 'La fracción de ACT es una aproximación: en recién nacidos y lactantes pequeños es mayor (Friis-Hansen 1961), y debe elegirse explícitamente. Supone que no hay pérdidas de solutos; subestima el requerimiento si hay pérdidas en curso. Controlar Na⁺ seriado; la fórmula no indica velocidad de corrección.',
    tests: [
      { v: { peso: 20, fr: '0.6', na: 160, obj: 140 }, r: 1.71 },
      { v: { peso: 10, fr: 'otra', frx: 0.7, na: 155, obj: 140 }, r: 0.75 }
    ]
  },
  {
    id: 'correccion-electrolitos-ped', m: 'f', cat: 'pediatria', tags: [],
    n: 'Corrección de electrolitos pediátrica', sig: '', syn: ['deficit de sodio pediatrico', 'correccion de potasio', 'electrolitos niños'],
    tipo: 'dosificación',
    fin: 'Cálculo del déficit y la reposición de electrolitos en pediatría.',
    ver: '—',
    pend: 'No se encontró una fórmula pediátrica validada de corrección de electrolitos con evidencia propia; las fórmulas de déficit de sodio/potasio son extrapolaciones de adultos y los esquemas de reposición dependen de protocolos institucionales.',
    ref: 'Pendiente de fuente validada.',
    lim: 'Sin cálculo hasta disponer de una fórmula validada.',
    in: []
  },

  // ═══════════════════════════ EPIDEMIOLOGÍA ═══════════════════════════
  {
    id: 'tabla-2x2-diag', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Tabla 2×2 diagnóstica', sig: '2×2', syn: ['sensibilidad', 'especificidad', 'vpp', 'vpn', 'lr+', 'lr-', 'razon de verosimilitud', 'tabla de contingencia'],
    tipo: 'cálculo',
    fin: 'Calcula sensibilidad, especificidad, valores predictivos y razones de verosimilitud con IC 95 % a partir de una tabla 2×2.',
    ver: 'Definiciones estándar; IC de Wilson para proporciones y logarítmico (Simel 1991) para LR',
    formula: 'VP = a, FP = b, FN = c, VN = d\nSe = a/(a+c) · Sp = d/(b+d) · VPP = a/(a+b) · VPN = d/(c+d)\nLR+ = Se/(1−Sp) · LR− = (1−Se)/Sp\nIC 95 % de proporciones: Wilson\nIC 95 % de LR: exp(ln LR ± 1,96·EE); EE(ln LR+) = √(1/a − 1/(a+c) + 1/b − 1/(b+d)); EE(ln LR−) = √(1/c − 1/(a+c) + 1/d − 1/(b+d))',
    in: [
      { t: 'num', id: 'a', l: 'Verdaderos positivos (a)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'b', l: 'Falsos positivos (b)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'c', l: 'Falsos negativos (c)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'd', l: 'Verdaderos negativos (d)', u: 'n', min: 0, step: 1 }
    ],
    calc: v => {
      const { a, b, c, d } = v;
      if (a + c == 0 || b + d == 0) return null;
      const se = a / (a + c), sp = d / (b + d), n = a + b + c + d;
      const more = [
        ['Especificidad', pc(sp) + ' (' + icTxt(wilson(d, b + d)) + ')'],
        ['VPP', a + b ? pc(a / (a + b)) + ' (' + icTxt(wilson(a, a + b)) + ')' : 'no calculable'],
        ['VPN', c + d ? pc(d / (c + d)) + ' (' + icTxt(wilson(d, c + d)) + ')' : 'no calculable']
      ];
      const lrp = sp < 1 ? se / (1 - sp) : null, lrn = sp > 0 ? (1 - se) / sp : null;
      const lic = (lr, x, nx, y, ny) => (lr && x > 0 && y > 0 ? ` (IC 95 % ${fx(Math.exp(Math.log(lr) - Z95 * Math.sqrt(1 / x - 1 / nx + 1 / y - 1 / ny)), 2)} – ${fx(Math.exp(Math.log(lr) + Z95 * Math.sqrt(1 / x - 1 / nx + 1 / y - 1 / ny)), 2)})` : '');
      more.push(['LR+', lrp != null ? fx(lrp, 2) + lic(lrp, a, a + c, b, b + d) : 'no calculable (Sp = 100 %)']);
      more.push(['LR−', lrn != null ? fx(lrn, 3) + lic(lrn, c, a + c, d, b + d) : 'no calculable']);
      more.push(['Exactitud', pc((a + d) / n)], ['Prevalencia en la muestra', pc((a + c) / n)]);
      return { r: rd(se * 100, 1), u: '%', d: 1, lab: 'Sensibilidad (' + icTxt(wilson(a, a + c)) + ')', more, note: 'VPP y VPN valen solo para una prevalencia igual a la de la muestra.' };
    },
    ref: 'Wilson EB. Probable inference, the law of succession, and statistical inference. J Am Stat Assoc. 1927;22:209–212. · Simel DL, Samsa GP, Matchar DB. Likelihood ratios with confidence: sample size estimation for diagnostic test studies. J Clin Epidemiol. 1991;44:763–770. · Altman DG, Bland JM. Diagnostic tests 1–3. BMJ. 1994;308:1552; 309:102; 309:162.',
    url: 'https://doi.org/10.1016/0895-4356(91)90128-V',
    verif: '2026-10',
    pop: 'Estudios de exactitud diagnóstica con prueba de referencia.',
    lim: 'Los valores dependen del espectro de pacientes y de la calidad de la prueba de referencia (sesgos de verificación y espectro). Con celdas en 0 algunos IC no son calculables. VPP/VPN cambian con la prevalencia.',
    tests: [
      { v: { a: 90, b: 20, c: 10, d: 80 }, r: 90 },
      { v: { a: 45, b: 10, c: 5, d: 40 }, r: 90 }
    ]
  },
  {
    id: 'sensibilidad', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Sensibilidad', sig: 'Se', syn: ['sensibilidad', 'tasa de verdaderos positivos'],
    tipo: 'cálculo',
    fin: 'Proporción de enfermos con prueba positiva, con IC 95 % de Wilson.',
    ver: 'Definición estándar; IC de Wilson',
    formula: 'Se = VP / (VP + FN)',
    in: [
      { t: 'num', id: 'vp', l: 'Verdaderos positivos', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'fn', l: 'Falsos negativos', u: 'n', min: 0, step: 1 }
    ],
    calc: v => (v.vp + v.fn ? { r: rd(100 * v.vp / (v.vp + v.fn), 1), u: '%', d: 1, lab: 'Sensibilidad', interp: icTxt(wilson(v.vp, v.vp + v.fn)) } : null),
    ref: 'Altman DG, Bland JM. Diagnostic tests 1: sensitivity and specificity. BMJ. 1994;308:1552. · Wilson EB. J Am Stat Assoc. 1927;22:209–212.',
    url: 'https://doi.org/10.1136/bmj.308.6943.1552',
    verif: '2026-10',
    pop: 'Estudios de exactitud diagnóstica.',
    lim: 'Depende del espectro de enfermedad de la muestra. Para todos los índices juntos usar la tabla 2×2 diagnóstica.',
    tests: [
      { v: { vp: 90, fn: 10 }, r: 90 },
      { v: { vp: 45, fn: 15 }, r: 75 },
      { v: { vp: 90, fn: 10 }, r: '82,6 % – 94,5 %' }
    ]
  },
  {
    id: 'especificidad', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Especificidad', sig: 'Sp', syn: ['especificidad', 'tasa de verdaderos negativos'],
    tipo: 'cálculo',
    fin: 'Proporción de sanos con prueba negativa, con IC 95 % de Wilson.',
    ver: 'Definición estándar; IC de Wilson',
    formula: 'Sp = VN / (VN + FP)',
    in: [
      { t: 'num', id: 'vn', l: 'Verdaderos negativos', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'fp', l: 'Falsos positivos', u: 'n', min: 0, step: 1 }
    ],
    calc: v => (v.vn + v.fp ? { r: rd(100 * v.vn / (v.vn + v.fp), 1), u: '%', d: 1, lab: 'Especificidad', interp: icTxt(wilson(v.vn, v.vn + v.fp)) } : null),
    ref: 'Altman DG, Bland JM. Diagnostic tests 1: sensitivity and specificity. BMJ. 1994;308:1552. · Wilson EB. J Am Stat Assoc. 1927;22:209–212.',
    url: 'https://doi.org/10.1136/bmj.308.6943.1552',
    verif: '2026-10',
    pop: 'Estudios de exactitud diagnóstica.',
    lim: 'Depende de la población sin enfermedad incluida. Para todos los índices juntos usar la tabla 2×2 diagnóstica.',
    tests: [
      { v: { vn: 80, fp: 20 }, r: 80 },
      { v: { vn: 95, fp: 5 }, r: 95 }
    ]
  },
  {
    id: 'vpp', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Valor predictivo positivo', sig: 'VPP', syn: ['valor predictivo positivo', 'vpp', 'probabilidad posprueba'],
    tipo: 'cálculo',
    fin: 'Probabilidad de enfermedad con prueba positiva para una prevalencia dada (teorema de Bayes).',
    ver: 'Teorema de Bayes',
    formula: 'VPP = Se × P / [Se × P + (1 − Sp) × (1 − P)]   (P = prevalencia o probabilidad preprueba)',
    in: [
      { t: 'num', id: 'se', l: 'Sensibilidad', u: '%', min: 0, max: 100, step: 0.1 },
      { t: 'num', id: 'sp', l: 'Especificidad', u: '%', min: 0, max: 100, step: 0.1 },
      { t: 'num', id: 'p', l: 'Prevalencia / probabilidad preprueba', u: '%', min: 0.01, max: 99.99, step: 0.01 }
    ],
    calc: v => { const se = v.se / 100, sp = v.sp / 100, p = v.p / 100; if (se * p + (1 - sp) * (1 - p) == 0) return null; return { r: rd(100 * bayes(se, sp, p).vpp, 1), u: '%', d: 1, lab: 'VPP' }; },
    ref: 'Altman DG, Bland JM. Diagnostic tests 2: predictive values. BMJ. 1994;309:102.',
    url: 'https://doi.org/10.1136/bmj.309.6947.102',
    verif: '2026-10',
    pop: 'Cualquier prueba con Se y Sp conocidas.',
    lim: 'Supone que Se y Sp son transportables a la población donde se aplica. El VPP cae marcadamente con prevalencias bajas.',
    tests: [
      { v: { se: 90, sp: 80, p: 10 }, r: 33.3 },
      { v: { se: 90, sp: 80, p: 50 }, r: 81.8 }
    ]
  },
  {
    id: 'vpn', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Valor predictivo negativo', sig: 'VPN', syn: ['valor predictivo negativo', 'vpn'],
    tipo: 'cálculo',
    fin: 'Probabilidad de ausencia de enfermedad con prueba negativa para una prevalencia dada (teorema de Bayes).',
    ver: 'Teorema de Bayes',
    formula: 'VPN = Sp × (1 − P) / [Sp × (1 − P) + (1 − Se) × P]',
    in: [
      { t: 'num', id: 'se', l: 'Sensibilidad', u: '%', min: 0, max: 100, step: 0.1 },
      { t: 'num', id: 'sp', l: 'Especificidad', u: '%', min: 0, max: 100, step: 0.1 },
      { t: 'num', id: 'p', l: 'Prevalencia / probabilidad preprueba', u: '%', min: 0.01, max: 99.99, step: 0.01 }
    ],
    calc: v => { const se = v.se / 100, sp = v.sp / 100, p = v.p / 100; if (sp * (1 - p) + (1 - se) * p == 0) return null; return { r: rd(100 * bayes(se, sp, p).vpn, 1), u: '%', d: 1, lab: 'VPN', more: [['Probabilidad de enfermedad con prueba negativa', pc(1 - bayes(se, sp, p).vpn)]] }; },
    ref: 'Altman DG, Bland JM. Diagnostic tests 2: predictive values. BMJ. 1994;309:102.',
    url: 'https://doi.org/10.1136/bmj.309.6947.102',
    verif: '2026-10',
    pop: 'Cualquier prueba con Se y Sp conocidas.',
    lim: 'Supone que Se y Sp son transportables a la población donde se aplica. El VPN cae con prevalencias altas.',
    tests: [
      { v: { se: 90, sp: 80, p: 10 }, r: 98.6 },
      { v: { se: 90, sp: 80, p: 50 }, r: 88.9 }
    ]
  },
  {
    id: 'lr', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Razones de verosimilitud (LR+ y LR−)', sig: 'LR', syn: ['likelihood ratio', 'razon de verosimilitud', 'cociente de probabilidad', 'lr+', 'lr-', 'fagan'],
    tipo: 'cálculo',
    fin: 'Calcula LR+ y LR− desde sensibilidad y especificidad y, opcionalmente, la probabilidad posprueba.',
    ver: 'Definición estándar; probabilidad posprueba por odds (Bayes)',
    formula: 'LR+ = Se / (1 − Sp) · LR− = (1 − Se) / Sp\nOdds preprueba = P / (1 − P); odds posprueba = odds preprueba × LR; probabilidad = odds / (1 + odds)',
    in: [
      { t: 'num', id: 'se', l: 'Sensibilidad', u: '%', min: 0, max: 100, step: 0.1 },
      { t: 'num', id: 'sp', l: 'Especificidad', u: '%', min: 0, max: 100, step: 0.1 },
      { t: 'num', id: 'p', l: 'Probabilidad preprueba (opcional)', u: '%', min: 0.01, max: 99.99, step: 0.01, req: 0 }
    ],
    calc: v => {
      const se = v.se / 100, sp = v.sp / 100;
      if (sp >= 1 || sp <= 0) return null;
      const lp = se / (1 - sp), ln = (1 - se) / sp;
      const more = [['LR−', fx(ln, 3)]];
      if (v.p != null) {
        const o = v.p / (100 - v.p), pp = x => pc(o * x / (1 + o * x));
        more.push(['Probabilidad posprueba si positiva', pp(lp)], ['Probabilidad posprueba si negativa', pp(ln)]);
      }
      return { r: rd(lp, 2), u: '', d: 2, lab: 'LR+', more, note: 'Para IC de los LR, cargar los recuentos en la tabla 2×2 diagnóstica.' };
    },
    ref: 'Deeks JJ, Altman DG. Diagnostic tests 4: likelihood ratios. BMJ. 2004;329:168–169.',
    url: 'https://doi.org/10.1136/bmj.329.7458.168',
    verif: '2026-10',
    pop: 'Cualquier prueba con Se y Sp conocidas.',
    lim: 'Los LR dependen del espectro de la población donde se estimaron. Sin IC al partir de porcentajes.',
    tests: [
      { v: { se: 90, sp: 80 }, r: 4.5 },
      { v: { se: 50, sp: 50, p: 20 }, r: 1 }
    ]
  },
  {
    id: 'riesgo-relativo', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Riesgo relativo', sig: 'RR', syn: ['riesgo relativo', 'razon de riesgos', 'risk ratio'],
    tipo: 'cálculo',
    fin: 'Cociente entre el riesgo del evento en expuestos/tratados y en no expuestos/control, con IC 95 % logarítmico.',
    ver: 'IC 95 % por método logarítmico (Katz 1978)',
    formula: 'RR = [eT / nT] / [eC / nC]\nIC 95 % = exp(ln RR ± 1,96 × √(1/eT − 1/nT + 1/eC − 1/nC))',
    in: EVT,
    calc: v => {
      const x = riesgos(v.eT, v.nT, v.eC, v.nC);
      if (!x || x.rr == null) return null;
      return { r: rd(x.rr, 2), u: '', d: 2, lab: 'RR', interp: x.rrIc ? `IC 95 % ${fx(x.rrIc[0], 2)} – ${fx(x.rrIc[1], 2)}` : 'IC no calculable (celda en 0)', more: [['Riesgo en tratados/expuestos', pc(x.pT)], ['Riesgo en control/no expuestos', pc(x.pC)]] };
    },
    ref: 'Katz D, Baptista J, Azen SP, Pike MC. Obtaining confidence intervals for the risk ratio in cohort studies. Biometrics. 1978;34:469–474.',
    url: 'https://doi.org/10.2307/2530610',
    verif: '2026-10',
    pop: 'Estudios de cohortes y ensayos clínicos (no en casos y controles: usar OR).',
    lim: 'No calculable si no hay eventos en el grupo control; el IC logarítmico no se calcula con celdas en 0. Un RR no transmite el riesgo basal: informar también la diferencia absoluta.',
    tests: [
      { v: { eT: 20, nT: 100, eC: 10, nC: 100 }, r: 2 },
      { v: { eT: 20, nT: 100, eC: 10, nC: 100 }, r: '0,99 – 4,05' },
      { v: { eT: 15, nT: 200, eC: 30, nC: 200 }, r: 0.5 }
    ]
  },
  {
    id: 'odds-ratio', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Odds ratio', sig: 'OR', syn: ['odds ratio', 'razon de odds', 'razon de momios'],
    tipo: 'cálculo',
    fin: 'Calcula la razón de odds de una tabla 2×2 con IC 95 % logarítmico (Woolf).',
    ver: 'IC 95 % por método logarítmico de Woolf (1955)',
    formula: 'OR = (a × d) / (b × c)\nIC 95 % = exp(ln OR ± 1,96 × √(1/a + 1/b + 1/c + 1/d))\na = casos expuestos · b = controles expuestos · c = casos no expuestos · d = controles no expuestos',
    in: [
      { t: 'num', id: 'a', l: 'Casos (con evento) expuestos (a)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'b', l: 'Controles (sin evento) expuestos (b)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'c', l: 'Casos (con evento) no expuestos (c)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'd', l: 'Controles (sin evento) no expuestos (d)', u: 'n', min: 0, step: 1 }
    ],
    calc: v => {
      const { a, b, c, d } = v;
      if (a == 0 || b == 0 || c == 0 || d == 0) return { r: 'No calculable con celdas en 0', u: '', note: 'Con celdas en 0 se requieren métodos exactos o corrección (p. ej., +0,5 de Haldane–Anscombe), no implementados aquí.' };
      const or = a * d / (b * c), se = Math.sqrt(1 / a + 1 / b + 1 / c + 1 / d);
      return { r: rd(or, 2), u: '', d: 2, lab: 'OR', interp: `IC 95 % ${fx(Math.exp(Math.log(or) - Z95 * se), 2)} – ${fx(Math.exp(Math.log(or) + Z95 * se), 2)}` };
    },
    ref: 'Woolf B. On estimating the relation between blood group and disease. Ann Hum Genet. 1955;19:251–253.',
    url: 'https://doi.org/10.1111/j.1469-1809.1955.tb01348.x',
    verif: '2026-10',
    pop: 'Estudios de casos y controles, transversales y regresión logística.',
    lim: 'El OR se aproxima al RR solo si el evento es raro (< 10 %); con eventos frecuentes exagera la asociación. IC aproximado; con recuentos pequeños usar métodos exactos.',
    tests: [
      { v: { a: 20, b: 80, c: 10, d: 90 }, r: 2.25 },
      { v: { a: 30, b: 70, c: 30, d: 70 }, r: 1 }
    ]
  },
  {
    id: 'rar', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Reducción absoluta del riesgo', sig: 'RAR', syn: ['reduccion absoluta del riesgo', 'diferencia de riesgos', 'arr'],
    tipo: 'cálculo',
    fin: 'Diferencia de riesgo del evento entre control y tratamiento, con IC 95 % de Newcombe (basado en Wilson).',
    ver: 'IC 95 % por método 10 de Newcombe (1998)',
    formula: 'RAR = riesgo control − riesgo tratamiento = eC/nC − eT/nT\nIC 95 %: Newcombe (híbrido de intervalos de Wilson)',
    in: EVT,
    calc: v => {
      const x = riesgos(v.eT, v.nT, v.eC, v.nC);
      if (!x) return null;
      return { r: rd(x.dif * 100, 2), u: 'puntos %', d: 2, lab: x.dif >= 0 ? 'RAR' : 'RAR negativa (aumento absoluto del riesgo)', interp: `IC 95 % ${fx(x.difIc[0] * 100, 2)} a ${fx(x.difIc[1] * 100, 2)} puntos %`, more: [['Riesgo control', pc(x.pC)], ['Riesgo tratamiento', pc(x.pT)]] };
    },
    ref: REF_IC,
    url: 'https://doi.org/10.1002/(SICI)1097-0258(19980430)17:8<873::AID-SIM779>3.0.CO;2-I',
    verif: '2026-10',
    pop: 'Ensayos clínicos y cohortes.',
    lim: 'Depende del riesgo basal y del tiempo de seguimiento: informar el horizonte temporal. Valores negativos indican aumento del riesgo con el tratamiento.',
    tests: [
      { v: { eT: 10, nT: 100, eC: 20, nC: 100 }, r: 10 },
      { v: { eT: 30, nT: 200, eC: 40, nC: 200 }, r: 5 }
    ]
  },
  {
    id: 'rrr', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Reducción relativa del riesgo', sig: 'RRR', syn: ['reduccion relativa del riesgo', 'rrr', 'eficacia'],
    tipo: 'cálculo',
    fin: 'Proporción en que el tratamiento reduce el riesgo respecto del control, con IC 95 % derivado del RR.',
    ver: 'RRR = 1 − RR; IC derivado del IC logarítmico del RR (Katz)',
    formula: 'RRR = (riesgo control − riesgo tratamiento) / riesgo control = 1 − RR\nIC 95 % = 1 − límites del IC 95 % del RR',
    in: EVT,
    calc: v => {
      const x = riesgos(v.eT, v.nT, v.eC, v.nC);
      if (!x || x.rr == null) return null;
      return { r: rd((1 - x.rr) * 100, 1), u: '%', d: 1, lab: 'RRR', interp: x.rrIc ? `IC 95 % ${fx((1 - x.rrIc[1]) * 100, 1)} % a ${fx((1 - x.rrIc[0]) * 100, 1)} %` : 'IC no calculable (celda en 0)', more: [['RR', fx(x.rr, 2)], ['RAR', fx(x.dif * 100, 2) + ' puntos %']] };
    },
    ref: REF_IC,
    url: 'https://doi.org/10.2307/2530610',
    verif: '2026-10',
    pop: 'Ensayos clínicos y cohortes.',
    lim: 'La RRR es constante entre riesgos basales distintos y por eso sobredimensiona el beneficio en pacientes de bajo riesgo: informar siempre junto a la RAR y el NNT.',
    tests: [
      { v: { eT: 10, nT: 100, eC: 20, nC: 100 }, r: 50 },
      { v: { eT: 30, nT: 200, eC: 40, nC: 200 }, r: 25 }
    ]
  },
  {
    id: 'nnt', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Número necesario a tratar', sig: 'NNT', syn: ['numero necesario a tratar', 'nnt', 'nntb'],
    tipo: 'cálculo',
    fin: 'Pacientes que hay que tratar para evitar un evento adicional, con IC 95 % (Altman).',
    ver: 'NNT = 1/RAR; IC por inversión del IC de Newcombe de la RAR (Altman 1998)',
    formula: 'NNT = 1 / RAR (RAR como proporción)\nIC 95 % = 1 / límites del IC 95 % de la RAR; si ese IC incluye 0, el IC del NNT incluye ∞ (NNT beneficio … ∞ … NNT daño)',
    in: EVT,
    calc: v => {
      const x = riesgos(v.eT, v.nT, v.eC, v.nC);
      if (!x) return null;
      if (x.dif == 0) return { r: 'No calculable (RAR = 0)', u: '' };
      if (x.dif < 0) return { r: 'Sin beneficio: el tratamiento aumenta el riesgo', u: '', note: 'NNH = ' + fx(1 / -x.dif, 1) + ' (ver herramienta NNH).' };
      return { r: rd(1 / x.dif, 1), u: 'pacientes', d: 1, lab: 'NNT (redondear hacia arriba: ' + Math.ceil(1 / x.dif - 1e-9) + ')', interp: nntIc(x.difIc[0], x.difIc[1], 'NNT beneficio', 'NNT daño'), more: [['RAR', fx(x.dif * 100, 2) + ' puntos %']] };
    },
    ref: REF_IC,
    url: 'https://doi.org/10.1136/bmj.317.7168.1309',
    verif: '2026-10',
    pop: 'Ensayos clínicos y cohortes.',
    lim: 'Válido para el riesgo basal y el tiempo de seguimiento del estudio; no extrapolar a poblaciones con otro riesgo sin recalcular. Por convención se redondea hacia arriba.',
    tests: [
      { v: { eT: 10, nT: 100, eC: 20, nC: 100 }, r: 10 },
      { v: { eT: 30, nT: 200, eC: 40, nC: 200 }, r: 20 }
    ]
  },
  {
    id: 'nnh', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Número necesario para dañar', sig: 'NNH', syn: ['numero necesario para dañar', 'nnh', 'nntd', 'efecto adverso'],
    tipo: 'cálculo',
    fin: 'Pacientes tratados necesarios para que ocurra un efecto adverso adicional, con IC 95 % (Altman).',
    ver: 'NNH = 1/AAR; IC por inversión del IC de Newcombe (Altman 1998)',
    formula: 'Aumento absoluto del riesgo (AAR) = riesgo de efecto adverso con tratamiento − riesgo con control\nNNH = 1 / AAR',
    in: [
      { t: 'head', l: 'Grupo tratamiento' },
      { t: 'num', id: 'eT', l: 'Con efecto adverso', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'nT', l: 'Total del grupo', u: 'n', min: 1, step: 1 },
      { t: 'head', l: 'Grupo control' },
      { t: 'num', id: 'eC', l: 'Con efecto adverso', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'nC', l: 'Total del grupo', u: 'n', min: 1, step: 1 }
    ],
    calc: v => {
      // reutiliza riesgos() intercambiando grupos: diferencia = pT − pC
      const x = riesgos(v.eC, v.nC, v.eT, v.nT);
      if (!x) return null;
      if (x.dif == 0) return { r: 'No calculable (AAR = 0)', u: '' };
      if (x.dif < 0) return { r: 'Sin aumento del riesgo de efecto adverso con el tratamiento', u: '' };
      return { r: rd(1 / x.dif, 1), u: 'pacientes', d: 1, lab: 'NNH (redondear hacia abajo: ' + Math.floor(1 / x.dif + 1e-9) + ')', interp: nntIc(x.difIc[0], x.difIc[1], 'NNT daño', 'NNT beneficio'), more: [['AAR', fx(x.dif * 100, 2) + ' puntos %'], ['Riesgo con tratamiento', pc(x.pC)], ['Riesgo con control', pc(x.pT)]] };
    },
    ref: REF_IC,
    url: 'https://doi.org/10.1136/bmj.317.7168.1309',
    verif: '2026-10',
    pop: 'Ensayos clínicos y cohortes.',
    lim: 'Válido para el tiempo de seguimiento y la definición de efecto adverso del estudio. Por convención conservadora se redondea hacia abajo.',
    tests: [
      { v: { eT: 15, nT: 100, eC: 5, nC: 100 }, r: 10 },
      { v: { eT: 30, nT: 200, eC: 20, nC: 200 }, r: 20 }
    ]
  },
  {
    id: 'ic-proporcion', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Intervalo de confianza de una proporción (Wilson)', sig: 'IC', syn: ['intervalo de confianza', 'wilson', 'proporcion'],
    tipo: 'cálculo',
    fin: 'Calcula una proporción con su intervalo de confianza por el método score de Wilson.',
    ver: 'Wilson 1927 (recomendado por Newcombe 1998 frente al de Wald)',
    formula: 'p = x / n\nIC = [p + z²/2n ± z·√(p(1−p)/n + z²/4n²)] / (1 + z²/n)',
    in: [
      { t: 'num', id: 'x', l: 'Eventos (x)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'n', l: 'Total (n)', u: 'n', min: 1, step: 1 },
      { t: 'sel', id: 'nc', l: 'Nivel de confianza', o: [['90', '90 %'], ['95', '95 %'], ['99', '99 %']] }
    ],
    calc: v => {
      if (v.x > v.n) return null;
      const z = { '90': 1.644854, '95': 1.959964, '99': 2.575829 }[v.nc];
      const ic = wilson(v.x, v.n, z);
      return { r: rd(100 * v.x / v.n, 1), u: '%', d: 1, lab: 'Proporción', interp: `IC ${v.nc} % ${pc(ic[0])} – ${pc(ic[1])}` };
    },
    ref: 'Wilson EB. Probable inference, the law of succession, and statistical inference. J Am Stat Assoc. 1927;22:209–212. · Newcombe RG. Two-sided confidence intervals for the single proportion: comparison of seven methods. Stat Med. 1998;17:857–872.',
    url: 'https://doi.org/10.1080/01621459.1927.10502953',
    verif: '2026-10',
    pop: 'Proporciones binomiales.',
    lim: 'Supone muestreo aleatorio e independencia. Para comparar dos proporciones usar RAR (IC de Newcombe).',
    tests: [
      { v: { x: 90, n: 100, nc: '95' }, r: 90 },
      { v: { x: 0, n: 10, nc: '95' }, r: 0 },
      { v: { x: 0, n: 10, nc: '95' }, r: '0 % – 27,8 %' }
    ]
  },
  {
    id: 'kappa-cohen', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Kappa de Cohen (acuerdo 2×2)', sig: 'κ', syn: ['kappa', 'concordancia', 'acuerdo interobservador'],
    tipo: 'índice',
    fin: 'Mide el acuerdo entre dos observadores para una variable dicotómica corrigiendo por el acuerdo esperado por azar.',
    ver: 'Cohen 1960; interpretación de Landis y Koch 1977',
    formula: 'n = a + b + c + d; Po = (a + d) / n\nPe = [(a + b)(a + c) + (c + d)(b + d)] / n²\nκ = (Po − Pe) / (1 − Pe)\nEE aproximado (Cohen 1960) = √[Po(1 − Po) / (n(1 − Pe)²)]',
    in: [
      { t: 'num', id: 'a', l: 'Ambos «sí» (a)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'b', l: 'Obs. 1 «sí», obs. 2 «no» (b)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'c', l: 'Obs. 1 «no», obs. 2 «sí» (c)', u: 'n', min: 0, step: 1 },
      { t: 'num', id: 'd', l: 'Ambos «no» (d)', u: 'n', min: 0, step: 1 }
    ],
    calc: v => {
      const { a, b, c, d } = v, n = a + b + c + d;
      if (!n) return null;
      const po = (a + d) / n, pe = ((a + b) * (a + c) + (c + d) * (b + d)) / (n * n);
      if (pe >= 1) return null;
      const k = (po - pe) / (1 - pe), se = Math.sqrt(po * (1 - po) / (n * (1 - pe) ** 2));
      const bd = k < 0 ? ['Pobre (< 0)', 'bad'] : k <= 0.2 ? ['Leve (0–0,20)', 'warn'] : k <= 0.4 ? ['Aceptable (0,21–0,40)', 'warn'] : k <= 0.6 ? ['Moderado (0,41–0,60)', ''] : k <= 0.8 ? ['Considerable (0,61–0,80)', 'ok'] : ['Casi perfecto (0,81–1)', 'ok'];
      return { r: rd(k, 3), u: '', d: 3, lab: 'κ', interp: 'Acuerdo ' + bd[0].toLowerCase() + ' (Landis y Koch)', lvl: bd[1], more: [['Acuerdo observado', pc(po)], ['Acuerdo esperado por azar', pc(pe)], ['IC 95 % aproximado', fx(k - Z95 * se, 3) + ' a ' + fx(k + Z95 * se, 3)]] };
    },
    ref: 'Cohen J. A coefficient of agreement for nominal scales. Educ Psychol Meas. 1960;20:37–46. · Landis JR, Koch GG. The measurement of observer agreement for categorical data. Biometrics. 1977;33:159–174.',
    url: 'https://doi.org/10.2307/2529310',
    verif: '2026-10',
    pop: 'Dos observadores, variable dicotómica.',
    lim: 'κ depende de la prevalencia y del sesgo entre observadores (paradojas de kappa): con prevalencias extremas puede ser bajo pese a alto acuerdo. Las categorías de Landis y Koch son arbitrarias. El IC usa el EE aproximado de Cohen.',
    tests: [
      { v: { a: 20, b: 5, c: 10, d: 15 }, r: 0.4 },
      { v: { a: 45, b: 5, c: 5, d: 45 }, r: 0.8 }
    ]
  },
  {
    id: 'n-dos-proporciones', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Tamaño muestral: comparación de dos proporciones', sig: 'n', syn: ['tamaño muestral', 'tamaño de muestra', 'calculo de n', 'potencia'],
    tipo: 'cálculo',
    fin: 'Calcula el tamaño muestral por grupo para detectar una diferencia entre dos proporciones independientes con α bilateral y potencia dadas.',
    ver: 'Aproximación normal sin y con corrección de continuidad (Fleiss, Levin, Paik 2003), grupos iguales',
    formula: 'n por grupo = [z₁₋α/₂ · √(2·p̄·q̄) + z₁₋β · √(p₁q₁ + p₂q₂)]² / (p₁ − p₂)²,  p̄ = (p₁ + p₂)/2, q = 1 − p\nCon corrección de continuidad: n′ = n/4 · [1 + √(1 + 4 / (n·|p₁ − p₂|))]²',
    in: [
      { t: 'num', id: 'p1', l: 'Proporción esperada grupo 1', u: '%', min: 0.1, max: 99.9, step: 0.1 },
      { t: 'num', id: 'p2', l: 'Proporción esperada grupo 2', u: '%', min: 0.1, max: 99.9, step: 0.1 },
      { t: 'sel', id: 'al', l: 'Nivel α', o: QA },
      { t: 'sel', id: 'pw', l: 'Potencia (1 − β)', o: QB }
    ],
    calc: v => {
      const p1 = v.p1 / 100, p2 = v.p2 / 100;
      if (p1 == p2) return null;
      const za = ZA[v.al], zb = ZB[v.pw], pm = (p1 + p2) / 2, dd = Math.abs(p1 - p2);
      const n = (za * Math.sqrt(2 * pm * (1 - pm)) + zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2 / dd ** 2;
      const nc = n / 4 * (1 + Math.sqrt(1 + 4 / (n * dd))) ** 2;
      const N = Math.ceil(n - 1e-9);
      return { r: N, u: 'por grupo', d: 0, lab: 'n por grupo (sin corrección)', more: [['Total', String(2 * N)], ['Con corrección de continuidad', Math.ceil(nc - 1e-9) + ' por grupo']], note: 'No incluye pérdidas de seguimiento: ajustar n / (1 − proporción de pérdidas).' };
    },
    ref: 'Fleiss JL, Levin B, Paik MC. Statistical Methods for Rates and Proportions. 3rd ed. Wiley; 2003. Cap. 4.',
    url: 'https://doi.org/10.1002/0471445428',
    verif: '2026-10',
    pop: 'Ensayos y estudios con dos grupos independientes de igual tamaño y desenlace binario.',
    lim: 'Aproximación normal; con proporciones extremas o n pequeño usar métodos exactos. Supone aleatorización 1:1, contraste bilateral y ausencia de pérdidas. Para no inferioridad, cluster o grupos desiguales se requieren otras fórmulas.',
    tests: [
      { v: { p1: 30, p2: 15, al: '0.05', pw: '0.80' }, r: 121, tol: 0 },
      { v: { p1: 50, p2: 40, al: '0.05', pw: '0.90' }, r: 519, tol: 0 }
    ]
  },
  {
    id: 'n-una-proporcion', m: 'f', cat: 'epidemiologia', tags: ['s:epidemiologia'],
    n: 'Tamaño muestral: estimación de una proporción', sig: 'n', syn: ['tamaño muestral prevalencia', 'tamaño de muestra proporcion', 'precision'],
    tipo: 'cálculo',
    fin: 'Calcula el tamaño muestral para estimar una proporción con una precisión absoluta dada.',
    ver: 'Aproximación normal (Lwanga y Lemeshow, OMS 1991), con corrección opcional por población finita',
    formula: 'n = z²₁₋α/₂ · p · (1 − p) / d²   (d = precisión absoluta, mitad del ancho del IC)\nPoblación finita N: n′ = n / [1 + (n − 1) / N]',
    in: [
      { t: 'num', id: 'p', l: 'Proporción esperada (50 % si se desconoce)', u: '%', min: 0.1, max: 99.9, step: 0.1 },
      { t: 'num', id: 'dp', l: 'Precisión absoluta (±)', u: 'puntos %', min: 0.1, max: 50, step: 0.1 },
      { t: 'sel', id: 'al', l: 'Nivel α (confianza = 1 − α)', o: QA },
      { t: 'num', id: 'N', l: 'Tamaño de la población (opcional)', u: 'n', min: 1, step: 1, req: 0 }
    ],
    calc: v => {
      const p = v.p / 100, d = v.dp / 100, z = ZA[v.al];
      const n = z * z * p * (1 - p) / (d * d);
      const more = [];
      if (v.N != null) more.push(['Corregido por población finita', String(Math.ceil(n / (1 + (n - 1) / v.N) - 1e-9))]);
      return { r: Math.ceil(n - 1e-9), u: 'sujetos', d: 0, lab: 'n necesario', more, note: 'No incluye ajuste por no respuesta ni efecto de diseño (muestreo por conglomerados).' };
    },
    ref: 'Lwanga SK, Lemeshow S. Sample size determination in health studies: a practical manual. Geneva: World Health Organization; 1991.',
    url: 'https://iris.who.int/handle/10665/40062',
    verif: '2026-10',
    pop: 'Estudios descriptivos (prevalencia) con muestreo aleatorio simple.',
    lim: 'Aproximación normal: poco exacta con proporciones cercanas a 0 o 1 o precisión relativa grande. Para muestreo complejo multiplicar por el efecto de diseño. La potencia no interviene en la estimación de una proporción.',
    tests: [
      { v: { p: 50, dp: 5, al: '0.05' }, r: 385, tol: 0 },
      { v: { p: 20, dp: 5, al: '0.05' }, r: 246, tol: 0 }
    ]
  }
];
