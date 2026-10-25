// Scores y escalas por órganos y sistemas: nefrología, cirugía, gastro/hepatología, hematología, endocrinología.
// Verificados contra las publicaciones originales o fuentes oficiales (ver `ref` de cada herramienta). verif: 2026-10.
import { rd, pts, band, U } from '../h.js';

// ───────── ayudas locales ─────────
const f = (x, d = 1) => (x == null ? '—' : String(rd(x, d)).replace('.', ','));
const pct = (x, d = 1) => f(x * 100, d) + ' %';
const SN = (si = 1) => [['no', 'No', 0], ['si', 'Sí', si]];
const sexo = [['m', 'Masculino'], ['f', 'Femenino']];
const clamp = (x, a, b) => Math.min(Math.max(x, a), b);
const logit = z => 1 / (1 + Math.exp(-z));

// Unidades alternativas específicas de este archivo (→ unidad canónica de cada entrada)
const ACR_MMOL = { u: 'mg/mmol', f: x => x * 8.84 };            // CAC mg/mmol → mg/g
const UREA_MG = { u: 'urea mg/dL', f: x => x / 6.006 };         // urea mg/dL → urea mmol/L
const BUN_MG = { u: 'BUN mg/dL', f: x => x / 2.801 };           // BUN mg/dL → urea mmol/L
const BUN_DE_UREA = { u: 'urea mg/dL', f: x => x / 2.14 };      // urea mg/dL → BUN mg/dL
const BUN_DE_UREA_MMOL = { u: 'urea mmol/L', f: x => x * 2.801 };// urea mmol/L → BUN mg/dL
const FOSF_MMOL = { u: 'mmol/L', f: x => x * 3.097 };           // fosfato mmol/L → mg/dL
const TG_MG = { u: 'mg/dL', f: x => x / 88.57 };                // triglicéridos mg/dL → mmol/L
const FIB_MG = { u: 'mg/dL', f: x => x / 100 };                 // fibrinógeno mg/dL → g/L

// Entradas frecuentes
const nCr = (id = 'cr', l = 'Creatinina sérica') => ({ t: 'num', id, l, u: 'mg/dL', min: 0.1, max: 25, step: 0.01, alt: [U.creat_umol] });
const nBili = (id = 'bili', l = 'Bilirrubina total') => ({ t: 'num', id, l, u: 'mg/dL', min: 0.1, max: 80, step: 0.1, alt: [U.bili_umol] });
const nAlb = (id = 'alb', l = 'Albúmina sérica') => ({ t: 'num', id, l, u: 'g/dL', min: 0.5, max: 7, step: 0.1, alt: [U.alb_gl] });
const nEdad = (id = 'edad', l = 'Edad', min = 18) => ({ t: 'num', id, l, u: 'años', min, max: 120, step: 1 });

// Tabla de conversión EPTS (OPTN, tabla 2024: candidatos adultos en lista al 31/12/2024). Límite inferior del EPTS crudo para cada percentil 0–100.
const EPTS_TABLA = [-Infinity, 0.01184827379332, 0.21310210737676, 0.40252326481930, 0.52800000000000, 0.61801976010923, 0.71057871011496, 0.78782781442424, 0.85771064385749, 0.92387462259398, 0.98764264652321, 1.04590485968515, 1.09933073333614, 1.15638329911020, 1.20971321013005, 1.25784543260537, 1.30468387455511, 1.35114305270363, 1.39696372347707, 1.44043463381246, 1.48161190965092, 1.52021149897331, 1.55920533880904, 1.59484531143053, 1.62808213552361, 1.65982819986311, 1.69011088295688, 1.72058765890643, 1.74844920196828, 1.77551471594798, 1.80172896022488, 1.82626695257618, 1.85104928131417, 1.87446885694730, 1.89736960985626, 1.92001468736874, 1.94089972738606, 1.96259067534531, 1.98299520876112, 2.00301505817933, 2.02300693973232, 2.04283275957921, 2.06033324099255, 2.07901711156742, 2.09753586134351, 2.11445516769336, 2.13195550992471, 2.14932717316906, 2.16505133470226, 2.18131759069131, 2.19695261029016, 2.21262422997947, 2.22883854789024, 2.24526417931112, 2.26074101528416, 2.27693086926763, 2.29203216974675, 2.30747364818617, 2.32239630390144, 2.33719849418207, 2.35233619399769, 2.36720658011572, 2.38223956194387, 2.39716290212183, 2.41171798708993, 2.42672344324962, 2.44241981474590, 2.45704382237689, 2.47204106776181, 2.48615153831781, 2.50130321697467, 2.51610951403148, 2.53117864476386, 2.54691372810912, 2.56188750397993, 2.57783580816370, 2.59371564589885, 2.60883983572895, 2.62490395223486, 2.64215263518138, 2.65902464065708, 2.67751421968340, 2.69582272416153, 2.71585259723488, 2.73434907597536, 2.75311920676514, 2.77272279260780, 2.79350504661888, 2.81476309520569, 2.83763973196257, 2.85957991275097, 2.88260648450195, 2.90694476081954, 2.93331208731685, 2.96201988546123, 2.99154579542839, 3.02388623085550, 3.06016380052332, 3.10215168515328, 3.15286397325764, 3.23640591422491];

// ───────── POSSUM: entradas y puntajes compartidos (POSSUM y P-POSSUM) ─────────
const POSSUM_IN = [
  { t: 'head', l: 'Puntaje fisiológico (12 variables)' },
  nEdad(),
  { t: 'sel', id: 'card', l: 'Signos cardíacos / Rx de tórax', o: [[1, 'Sin falla cardíaca', 1], [2, 'Diuréticos, digoxina, antianginosos o antihipertensivos', 2], [4, 'Edema periférico, warfarina o cardiomegalia limítrofe', 4], [8, 'Ingurgitación yugular o cardiomegalia', 8]] },
  { t: 'sel', id: 'resp', l: 'Antecedentes respiratorios / Rx de tórax', o: [[1, 'Sin disnea', 1], [2, 'Disnea de esfuerzo o EPOC leve', 2], [4, 'Disnea limitante (un tramo de escalera) o EPOC moderada', 4], [8, 'Disnea de reposo (FR ≥30/min), fibrosis o consolidación', 8]] },
  { t: 'num', id: 'pas', l: 'Presión arterial sistólica', u: 'mmHg', min: 30, max: 300, step: 1 },
  { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 10, max: 250, step: 1 },
  { t: 'num', id: 'gcs', l: 'Escala de Glasgow', u: 'puntos', min: 3, max: 15, step: 1 },
  { t: 'num', id: 'hb', l: 'Hemoglobina', u: 'g/dL', min: 2, max: 25, step: 0.1, alt: [U.hb_gl] },
  { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 200, step: 0.1 },
  { t: 'num', id: 'urea', l: 'Urea', u: 'mmol/L', min: 0.5, max: 100, step: 0.1, alt: [UREA_MG, BUN_MG] },
  { t: 'num', id: 'na', l: 'Sodio', u: 'mEq/L', min: 90, max: 200, step: 1 },
  { t: 'num', id: 'k', l: 'Potasio', u: 'mEq/L', min: 1, max: 10, step: 0.1 },
  { t: 'sel', id: 'ecg', l: 'ECG', o: [[1, 'Normal', 1], [4, 'Fibrilación auricular con FC 60–90', 4], [8, 'Otra arritmia, ≥5 extrasístoles/min, ondas Q o cambios del ST/T', 8]] },
  { t: 'head', l: 'Puntaje de gravedad operatoria (6 variables)' },
  { t: 'sel', id: 'grav', l: 'Magnitud de la cirugía', o: [[1, 'Menor', 1], [2, 'Intermedia (moderada)', 2], [4, 'Mayor', 4], [8, 'Mayor+', 8]] },
  { t: 'sel', id: 'nproc', l: 'Número de procedimientos', o: [[1, 'Uno', 1], [4, 'Dos', 4], [8, 'Más de dos', 8]] },
  { t: 'num', id: 'perd', l: 'Pérdida hemática total', u: 'mL', min: 0, max: 50000, step: 10 },
  { t: 'sel', id: 'soil', l: 'Contaminación peritoneal', o: [[1, 'Ninguna', 1], [2, 'Menor (líquido seroso)', 2], [4, 'Pus localizado', 4], [8, 'Contenido intestinal libre, pus o sangre', 8]] },
  { t: 'sel', id: 'malig', l: 'Neoplasia', o: [[1, 'No', 1], [2, 'Solo tumor primario', 2], [4, 'Metástasis ganglionares', 4], [8, 'Metástasis a distancia', 8]] },
  { t: 'sel', id: 'urg', l: 'Modo de cirugía', o: [[1, 'Programada', 1], [4, 'Urgencia: reanimación posible, cirugía <24 h del ingreso', 4], [8, 'Emergencia: cirugía inmediata (<2 h)', 8]] }
];
function possumPS(v) {
  const a = v.edad <= 60 ? 1 : v.edad <= 70 ? 2 : 4;
  const s = v.pas; const sbp = s <= 89 ? 8 : s <= 99 ? 4 : s <= 109 ? 2 : s <= 130 ? 1 : s <= 170 ? 2 : 4;
  const p = v.fc; const hr = p <= 39 ? 8 : p <= 49 ? 2 : p <= 80 ? 1 : p <= 100 ? 2 : p <= 120 ? 4 : 8;
  const g = v.gcs; const gc = g >= 15 ? 1 : g >= 12 ? 2 : g >= 9 ? 4 : 8;
  const h = v.hb; const hb = h < 10 ? 8 : h < 11.5 ? 4 : h < 13 ? 2 : h <= 16 ? 1 : h <= 17 ? 2 : h <= 18 ? 4 : 8;
  const w = v.gb; const wb = w <= 3 ? 4 : w < 4 ? 2 : w <= 10 ? 1 : w <= 20 ? 2 : 4;
  const u = v.urea; const ur = u <= 7.5 ? 1 : u <= 10 ? 2 : u <= 15 ? 4 : 8;
  const n = v.na; const na = n >= 136 ? 1 : n >= 131 ? 2 : n >= 126 ? 4 : 8;
  const k = v.k; const kk = k < 2.9 ? 8 : k < 3.2 ? 4 : k < 3.5 ? 2 : k <= 5 ? 1 : k <= 5.3 ? 2 : k < 6 ? 4 : 8;
  return a + sbp + hr + gc + hb + wb + ur + na + kk + +v.card + +v.resp + +v.ecg;
}
function possumOS(v) {
  const b = v.perd; const bl = b <= 100 ? 1 : b <= 500 ? 2 : b < 1000 ? 4 : 8;
  return +v.grav + +v.nproc + bl + +v.soil + +v.malig + +v.urg;
}
const POSSUM_TV = { edad: 50, card: 1, resp: 1, pas: 120, fc: 70, gcs: 15, hb: 14, gb: 7, urea: 5, na: 140, k: 4, ecg: 1, grav: 1, nproc: 1, perd: 50, soil: 1, malig: 1, urg: 1 };
const POSSUM_TV2 = { edad: 75, card: 4, resp: 2, pas: 95, fc: 110, gcs: 14, hb: 10.5, gb: 15, urea: 12, na: 132, k: 3.3, ecg: 4, grav: 8, nproc: 4, perd: 800, soil: 8, malig: 2, urg: 8 };
// PS2 = 4+4+2+4+4+2+4+2+4+2+2+4 = 38 · OS2 = 8+4+4+8+2+8 = 34

// Tabla 5 de Fardet 2014 (probabilidad de síndrome hemofagocítico por HScore)
const HS_T5 = [[90, '<1'], [100, '1'], [110, '3'], [120, '5'], [130, '9'], [140, '16'], [150, '25'], [160, '40'], [170, '54'], [180, '70'], [190, '80'], [200, '88'], [210, '93'], [220, '96'], [230, '98'], [240, '99'], [250, '>99']];

export default [
  // ════════════════════════════ NEFROLOGÍA ════════════════════════════
  {
    id: 'kdigo-lra', m: 's', cat: 'nefrologia', tags: ['s:uti'],
    n: 'KDIGO: lesión renal aguda (estadificación)', sig: 'KDIGO LRA', syn: ['injuria renal aguda', 'ira', 'aki', 'insuficiencia renal aguda', 'fracaso renal agudo'],
    tipo: 'clasificación',
    fin: 'Define y estadifica la lesión renal aguda por creatinina respecto de la basal y por diuresis en ventanas de tiempo.',
    ver: 'KDIGO Clinical Practice Guideline for Acute Kidney Injury 2012',
    formula: 'Definición: ↑ Cr ≥0,3 mg/dL en ≤48 h, o Cr ≥1,5 × basal (conocida o presunta en los 7 días previos), o diuresis <0,5 mL/kg/h durante ≥6 h.\nEstadio 1: Cr 1,5–1,9 × basal o ↑ ≥0,3 mg/dL; diuresis <0,5 mL/kg/h por 6–12 h.\nEstadio 2: Cr 2,0–2,9 × basal; diuresis <0,5 mL/kg/h por ≥12 h.\nEstadio 3: Cr ≥3,0 × basal, o Cr ≥4,0 mg/dL, o inicio de TRR, o <18 años con TFGe <35 mL/min/1,73 m²; diuresis <0,3 mL/kg/h por ≥24 h o anuria ≥12 h.\nSe asigna el estadio más alto entre creatinina y diuresis. Diuresis = volumen / (peso × horas).',
    in: [
      { t: 'head', l: 'Criterio de creatinina (completar los tres o dejar vacío)' },
      { t: 'num', id: 'cr0', l: 'Creatinina basal', u: 'mg/dL', min: 0.1, max: 25, step: 0.01, alt: [U.creat_umol], req: 0 },
      { t: 'num', id: 'cr1', l: 'Creatinina actual (máxima)', u: 'mg/dL', min: 0.1, max: 25, step: 0.01, alt: [U.creat_umol], req: 0 },
      { t: 'sel', id: 'vent', l: 'Tiempo en que se produjo el aumento', req: 0, o: [['48', 'En ≤48 h'], ['7d', 'Entre 48 h y 7 días (basal conocida o presunta en los 7 días previos)'], ['mas', 'Más de 7 días o desconocido']] },
      { t: 'head', l: 'Criterio de diuresis (completar los tres o dejar vacío)' },
      { t: 'num', id: 'peso', l: 'Peso', u: 'kg', min: 1, max: 400, step: 0.1, alt: [U.lb], req: 0 },
      { t: 'num', id: 'vol', l: 'Volumen de orina en la ventana', u: 'mL', min: 0, max: 30000, step: 1, req: 0 },
      { t: 'num', id: 'hs', l: 'Duración de la ventana de medición', u: 'h', min: 1, max: 168, step: 0.5, req: 0 },
      { t: 'head', l: 'Otros criterios de estadio 3' },
      { t: 'chk', id: 'trr', l: 'Inicio de terapia de reemplazo renal' },
      { t: 'chk', id: 'ped', l: 'Paciente <18 años con TFGe <35 mL/min/1,73 m²' }
    ],
    calc: v => {
      const crAny = [v.cr0, v.cr1, v.vent].some(x => x != null), crOk = v.cr0 != null && v.cr1 != null && v.vent != null;
      const uoAny = [v.peso, v.vol, v.hs].some(x => x != null), uoOk = v.peso != null && v.vol != null && v.hs != null;
      if ((crAny && !crOk) || (uoAny && !uoOk)) return null;
      if (!crOk && !uoOk && !v.trr && !v.ped) return null;
      const more = [], notes = [];
      let sCr = 0, sUo = 0;
      if (crOk) {
        const ratio = v.cr1 / v.cr0, dif = rd(v.cr1 - v.cr0, 2);
        const lra = (v.vent == '48' && dif >= 0.3) || (v.vent != 'mas' && rd(ratio, 2) >= 1.5);
        if (lra) sCr = rd(ratio, 2) >= 3 || v.cr1 >= 4 ? 3 : rd(ratio, 2) >= 2 ? 2 : 1;
        else if (v.vent == 'mas' && (ratio >= 1.5 || dif >= 0.3)) notes.push('El aumento de creatinina no ocurrió dentro de la ventana temporal de KDIGO (≤48 h / ≤7 días): no define LRA; considerar enfermedad renal aguda o crónica.');
        more.push(['Cr actual / basal', f(ratio, 2) + ' ×'], ['Δ creatinina', f(dif, 2) + ' mg/dL'], ['Estadio por creatinina', sCr ? String(sCr) : 'sin criterio']);
      }
      if (uoOk) {
        const tasa = v.vol / (v.peso * v.hs);
        if (v.vol == 0 && v.hs >= 12) sUo = 3;
        else if (tasa < 0.3 && v.hs >= 24) sUo = 3;
        else if (tasa < 0.5 && v.hs >= 12) sUo = 2;
        else if (tasa < 0.5 && v.hs >= 6) sUo = 1;
        if (tasa < 0.5 && v.hs < 6) notes.push('Ventana de diuresis <6 h: insuficiente para aplicar el criterio KDIGO.');
        more.push(['Diuresis', f(tasa, 2) + ' mL/kg/h en ' + f(v.hs, 1) + ' h'], ['Estadio por diuresis', sUo ? String(sUo) : 'sin criterio']);
      }
      let s = Math.max(sCr, sUo);
      if (v.trr || v.ped) { s = 3; more.push(['Criterio adicional', v.trr ? 'inicio de TRR' : 'pediátrico: TFGe <35']); }
      if (!crOk) notes.push('Sin criterio de creatinina evaluado.');
      if (!uoOk) notes.push('Sin criterio de diuresis evaluado.');
      return {
        r: s ? 'Estadio ' + s : 'Sin criterios de LRA', lab: 'KDIGO',
        interp: s ? 'Lesión renal aguda KDIGO estadio ' + s : 'No cumple criterios KDIGO de LRA con los datos ingresados',
        lvl: s == 3 ? 'bad' : s ? 'warn' : 'ok', more, note: notes.join(' ') || undefined
      };
    },
    ref: 'Kidney Disease: Improving Global Outcomes (KDIGO) Acute Kidney Injury Work Group. KDIGO Clinical Practice Guideline for Acute Kidney Injury. Kidney Int Suppl. 2012;2(1):1–138.',
    url: 'https://kdigo.org/guidelines/acute-kidney-injury/',
    verif: '2026-10',
    pop: 'Adultos y niños hospitalizados; criterios de consenso (no derivados de una cohorte única).',
    lim: 'La creatinina basal suele ser estimada o desconocida, lo que puede sub o sobreestadificar. La diuresis depende de sondaje y registro horario confiable; el peso a usar (real o ideal) no está definido por KDIGO. La creatinina se altera por masa muscular, dilución y fármacos. No reemplaza la evaluación etiológica.',
    tests: [
      { v: { cr0: 1, cr1: 1.6, vent: '7d' }, r: 'Estadio 1' },
      { v: { cr0: 0.8, cr1: 1.1, vent: '48' }, r: 'Estadio 1' },
      { v: { cr0: 1, cr1: 3.2, vent: '48' }, r: 'Estadio 3' },
      { v: { peso: 70, vol: 300, hs: 12 }, r: 'Estadio 2' },
      { v: { cr0: 1, cr1: 1.2, vent: '48', peso: 80, vol: 1500, hs: 24 }, r: 'Sin criterios' }
    ]
  },
  {
    id: 'kdigo-erc', m: 's', cat: 'nefrologia', tags: [],
    n: 'KDIGO: clasificación de la enfermedad renal crónica (G × A)', sig: 'KDIGO ERC', syn: ['erc', 'ckd', 'enfermedad renal cronica', 'insuficiencia renal cronica', 'mapa de calor'],
    tipo: 'clasificación',
    fin: 'Clasifica la ERC por categoría de filtrado (G1–G5) y de albuminuria (A1–A3) y asigna el nivel de riesgo del mapa de calor KDIGO.',
    ver: 'KDIGO 2012, ratificada sin cambios de categorías en KDIGO 2024',
    formula: 'G1 ≥90 · G2 60–89 · G3a 45–59 · G3b 30–44 · G4 15–29 · G5 <15 mL/min/1,73 m².\nA1 CAC <30 mg/g (<3 mg/mmol) · A2 30–300 mg/g (3–30 mg/mmol) · A3 >300 mg/g (>30 mg/mmol).\nRiesgo: verde (bajo) G1–G2 A1 · amarillo (moderadamente aumentado) G1–G2 A2, G3a A1 · naranja (alto) G1–G2 A3, G3a A2, G3b A1 · rojo (muy alto) G3a A3, G3b A2–A3, G4 y G5 cualquier A.',
    in: [
      { t: 'num', id: 'tfg', l: 'TFG (estimada o medida)', u: 'mL/min/1,73 m²', min: 0, max: 200, step: 1 },
      { t: 'sel', id: 'alb', l: 'Categoría de albuminuria', o: [['A1', 'A1 — normal a levemente aumentada: CAC <30 mg/g (<3 mg/mmol); CPC <150 mg/g; tira reactiva negativa a trazas'], ['A2', 'A2 — moderadamente aumentada: CAC 30–300 mg/g (3–30 mg/mmol); CPC 150–500 mg/g; trazas a +'], ['A3', 'A3 — gravemente aumentada: CAC >300 mg/g (>30 mg/mmol); CPC >500 mg/g; + o más']] },
      { t: 'chk', id: 'dano', l: 'Otro marcador de daño renal (sedimento, alteraciones tubulares, histología, imagen o trasplante renal)' }
    ],
    calc: v => {
      const t = v.tfg;
      const G = t >= 90 ? 'G1' : t >= 60 ? 'G2' : t >= 45 ? 'G3a' : t >= 30 ? 'G3b' : t >= 15 ? 'G4' : 'G5';
      const A = v.alb;
      const M = { G1: { A1: 0, A2: 1, A3: 2 }, G2: { A1: 0, A2: 1, A3: 2 }, G3a: { A1: 1, A2: 2, A3: 3 }, G3b: { A1: 2, A2: 3, A3: 3 }, G4: { A1: 3, A2: 3, A3: 3 }, G5: { A1: 3, A2: 3, A3: 3 } };
      const k = M[G][A];
      const R = [['Riesgo bajo (verde)', 'ok'], ['Riesgo moderadamente aumentado (amarillo)', 'warn'], ['Riesgo alto (naranja)', 'bad'], ['Riesgo muy alto (rojo)', 'bad']][k];
      const sinErc = (G == 'G1' || G == 'G2') && A == 'A1' && !v.dano;
      return {
        r: G + ' ' + A, lab: 'Categoría KDIGO',
        interp: sinErc ? 'Sin criterios de ERC (G1–G2 sin albuminuria ni otro marcador de daño)' : R[0],
        lvl: sinErc ? 'ok' : R[1],
        note: 'La ERC exige alteración de estructura o función renal durante >3 meses; una sola determinación no alcanza.' + (t < 15 ? ' G5: falla renal.' : '')
      };
    },
    ref: 'Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group. KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease. Kidney Int. 2024;105(4S):S117–S314.',
    url: 'https://doi.org/10.1016/j.kint.2023.10.018',
    verif: '2026-10',
    pop: 'Adultos con ERC; mapa de calor derivado del metaanálisis del CKD Prognosis Consortium.',
    lim: 'Las equivalencias CAC/CPC/tira reactiva son aproximadas; preferir CAC en orina. La TFGe es menos precisa en extremos de masa muscular, embarazo, amputados e insuficiencia renal aguda. El nivel de riesgo es poblacional (mortalidad, eventos CV, progresión), no individual.',
    tests: [
      { v: { tfg: 50, alb: 'A2' }, r: 'G3a A2' },
      { v: { tfg: 50, alb: 'A2' }, r: 'alto' },
      { v: { tfg: 10, alb: 'A1' }, r: 'G5 A1' },
      { v: { tfg: 95, alb: 'A1' }, r: 'Sin criterios' },
      { v: { tfg: 70, alb: 'A2' }, r: 'moderadamente' }
    ]
  },
  {
    id: 'kfre', m: 's', cat: 'nefrologia', tags: [],
    n: 'Kidney Failure Risk Equation (4 variables)', sig: 'KFRE', syn: ['tangri', 'riesgo de falla renal', 'riesgo de dialisis'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de falla renal (diálisis o trasplante) a 2 y 5 años en ERC G3–G5.',
    ver: 'KFRE 4 variables, recalibración multinacional de Tangri 2016 (Norteamérica / fuera de Norteamérica)',
    formula: 'L = −0,2201 × (edad/10 − 7,036) + 0,2467 × (varón − 0,5642) − 0,5567 × (TFGe/5 − 7,222) + 0,4510 × (ln CAC[mg/g] − 5,137)\nRiesgo(t) = 1 − S₀(t)^exp(L)\nS₀ fuera de Norteamérica: 2 años 0,9832 · 5 años 0,9365\nS₀ Norteamérica: 2 años 0,9750 · 5 años 0,9240',
    in: [
      nEdad(),
      { t: 'sel', id: 'sexo', l: 'Sexo', o: sexo },
      { t: 'num', id: 'tfg', l: 'TFGe', u: 'mL/min/1,73 m²', min: 1, max: 89, step: 1 },
      { t: 'num', id: 'acr', l: 'Cociente albúmina/creatinina en orina', u: 'mg/g', min: 0.1, max: 20000, step: 0.1, alt: [ACR_MMOL] },
      { t: 'sel', id: 'reg', l: 'Calibración', o: [['nna', 'Fuera de Norteamérica (incluye Latinoamérica)'], ['na', 'Norteamérica']] }
    ],
    calc: v => {
      const L = -0.2201 * (v.edad / 10 - 7.036) + 0.2467 * ((v.sexo == 'm' ? 1 : 0) - 0.5642) - 0.5567 * (v.tfg / 5 - 7.222) + 0.4510 * (Math.log(v.acr) - 5.137);
      const S = v.reg == 'na' ? [0.9750, 0.9240] : [0.9832, 0.9365];
      const r2 = 1 - Math.pow(S[0], Math.exp(L)), r5 = 1 - Math.pow(S[1], Math.exp(L));
      const notes = [];
      if (v.tfg >= 60 || v.tfg < 10) notes.push('TFGe fuera del rango de validación (10–60 mL/min/1,73 m²).');
      return {
        r: rd(r5 * 100, 1), u: '%', d: 1, lab: 'Riesgo de falla renal a 5 años',
        more: [['Riesgo a 2 años', pct(r2)], ['Calibración', v.reg == 'na' ? 'Norteamérica' : 'fuera de Norteamérica']],
        lvl: r5 >= 0.05 ? 'warn' : '', note: notes.join(' ') || undefined
      };
    },
    ref: 'Tangri N, Grams ME, Levey AS, et al. Multinational assessment of accuracy of equations for predicting risk of kidney failure: a meta-analysis. JAMA. 2016;315(2):164–174.',
    url: 'https://doi.org/10.1001/jama.2015.18202',
    verif: '2026-10',
    pop: 'Adultos con ERC G3–G5 (TFGe 10–60) de 31 cohortes en 30 países (CKD Prognosis Consortium).',
    lim: 'No aplica a pacientes ya en diálisis, trasplantados ni con LRA. Validada con TFGe por MDRD/CKD-EPI; la calibración puede variar según población (en algunas cohortes sobreestima el riesgo). No considera el riesgo competitivo de muerte en ancianos. KDIGO 2024 usa el riesgo a 5 años ≥3–5 % como referencia para derivación a nefrología.',
    tests: [
      // L = -0.2201*(6-7.036) + 0.2467*(1-0.5642) - 0.5567*(6-7.222) + 0.4510*(ln300-5.137) = 0.2280+0.1075+0.6803+0.2557 = 1.2715
      { v: { edad: 60, sexo: 'm', tfg: 30, acr: 300, reg: 'nna' }, r: 20.9, tol: 0.1 },
      { v: { edad: 60, sexo: 'm', tfg: 30, acr: 300, reg: 'na' }, r: 24.6, tol: 0.1 },
      { v: { edad: 70, sexo: 'f', tfg: 45, acr: 30, reg: 'nna' }, r: 1.0, tol: 0.1 }
    ]
  },
  {
    id: 'mcmahon', m: 's', cat: 'nefrologia', tags: ['s:uti', 's:trauma'],
    n: 'McMahon Score (rabdomiólisis)', sig: '', syn: ['rabdomiolisis', 'cpk', 'ck', 'riesgo de dialisis'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de requerir terapia de reemplazo renal o de muerte en pacientes con rabdomiólisis (CK >5000 U/L) a partir de datos del ingreso.',
    ver: 'McMahon et al., JAMA Intern Med 2013',
    formula: 'Edad: ≤50: 0 · 51–70: 1,5 · 71–80: 2,5 · >80: 3\nSexo femenino: 1\nCreatinina inicial: <1,4: 0 · 1,4–2,2: 1,5 · >2,2 mg/dL: 3\nCalcio inicial <7,5 mg/dL: 2\nCK inicial >40 000 U/L: 2\nCausa distinta de convulsiones, síncope, ejercicio, estatinas o miositis: 3\nFosfato inicial: <4,0: 0 · 4,0–5,4: 1,5 · >5,4 mg/dL: 3\nBicarbonato inicial <19 mEq/L: 2\nTotal 0–20; <6: bajo riesgo.',
    in: [
      nEdad(),
      { t: 'sel', id: 'sexo', l: 'Sexo', o: [['m', 'Masculino', 0], ['f', 'Femenino', 1]] },
      nCr('cr', 'Creatinina inicial'),
      { t: 'num', id: 'ca', l: 'Calcio total inicial', u: 'mg/dL', min: 2, max: 20, step: 0.1, alt: [U.ca_mmol] },
      { t: 'num', id: 'ck', l: 'CK inicial', u: 'U/L', min: 0, max: 2000000, step: 1 },
      { t: 'sel', id: 'causa', l: 'Causa de la rabdomiólisis', o: [['benigna', 'Convulsiones, síncope, ejercicio, estatinas o miositis', 0], ['otra', 'Otra causa', 3]] },
      { t: 'num', id: 'fosf', l: 'Fosfato inicial', u: 'mg/dL', min: 0.2, max: 30, step: 0.1, alt: [FOSF_MMOL] },
      { t: 'num', id: 'hco3', l: 'Bicarbonato inicial', u: 'mEq/L', min: 1, max: 60, step: 1 }
    ],
    calc: v => {
      const e = v.edad <= 50 ? 0 : v.edad <= 70 ? 1.5 : v.edad <= 80 ? 2.5 : 3;
      const c = v.cr < 1.4 ? 0 : v.cr <= 2.2 ? 1.5 : 3;
      const p = v.fosf < 4 ? 0 : v.fosf <= 5.4 ? 1.5 : 3;
      const s = e + c + p + (v.ca < 7.5 ? 2 : 0) + (v.ck > 40000 ? 2 : 0) + (v.hco3 < 19 ? 2 : 0) + pts(v, [{ t: 'sel', id: 'sexo', o: [['f', '', 1]] }, { t: 'sel', id: 'causa', o: [['otra', '', 3]] }]);
      return {
        r: s, u: 'puntos', d: 1,
        interp: s < 6 ? 'Bajo riesgo (<6) de TRR o muerte' : 'No es de bajo riesgo (≥6): mayor riesgo de TRR o muerte',
        lvl: s < 6 ? 'ok' : 'bad'
      };
    },
    ref: 'McMahon GM, Zeng X, Waikar SS. A risk prediction score for kidney failure or mortality in rhabdomyolysis. JAMA Intern Med. 2013;173(19):1821–1828.',
    url: 'https://doi.org/10.1001/jamainternmed.2013.9774',
    verif: '2026-10',
    pop: 'Adultos con CK >5000 U/L dentro de los 3 días de internación (derivación: 2 hospitales de Boston; validación externa: cohorte MIMIC-II).',
    lim: 'Estudio retrospectivo. Usa valores iniciales; no evalúa la evolución. Las causas traumáticas e isquémicas suman 3 puntos. No define conducta: un score bajo no excluye LRA.',
    tests: [
      { v: { edad: 30, sexo: 'm', cr: 1.0, ca: 9, ck: 20000, causa: 'benigna', fosf: 3.5, hco3: 24 }, r: 0 },
      { v: { edad: 75, sexo: 'f', cr: 2.5, ca: 7, ck: 50000, causa: 'otra', fosf: 6, hco3: 15 }, r: 18.5 },
      { v: { edad: 60, sexo: 'm', cr: 1.5, ca: 8.5, ck: 30000, causa: 'otra', fosf: 4.5, hco3: 22 }, r: 7.5 }
    ]
  },
  {
    id: 'epts', m: 's', cat: 'nefrologia', tags: [],
    n: 'EPTS (Estimated Post-Transplant Survival)', sig: 'EPTS', syn: ['trasplante renal', 'supervivencia postrasplante', 'kdpi', 'optn', 'unos'],
    tipo: 'score pronóstico',
    fin: 'Estima la supervivencia esperada del candidato adulto a trasplante renal, expresada como percentil respecto de la lista de espera de EE. UU.',
    ver: 'Fórmula OPTN (guía de abril 2024) con tabla de conversión 2024 (lista al 31/12/2024)',
    formula: 'EPTS crudo = 0,047 × máx(edad − 25, 0) − 0,015 × DM × máx(edad − 25, 0) + 0,398 × trasplante previo − 0,237 × DM × trasplante previo + 0,315 × ln(años de diálisis + 1) − 0,099 × DM × ln(años de diálisis + 1) + 0,130 × (años de diálisis = 0) − 0,348 × DM × (años de diálisis = 0) + 1,262 × DM\nEdad y años de diálisis en años fraccionarios. El EPTS (%) es el percentil de la tabla de conversión OPTN vigente.',
    in: [
      { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 100, step: 0.1 },
      { t: 'sel', id: 'dm', l: 'Diabetes (cualquier tipo, actual)', o: [['no', 'No'], ['si', 'Sí']] },
      { t: 'sel', id: 'tx', l: 'Trasplante de órgano sólido previo', o: [['no', 'No'], ['si', 'Sí']] },
      { t: 'num', id: 'dial', l: 'Tiempo en diálisis (0 si no inició)', u: 'años', min: 0, max: 60, step: 0.1 }
    ],
    calc: v => {
      const dm = v.dm == 'si' ? 1 : 0, tx = v.tx == 'si' ? 1 : 0, a = Math.max(v.edad - 25, 0), ld = Math.log(v.dial + 1), d0 = v.dial == 0 ? 1 : 0;
      const raw = 0.047 * a - 0.015 * dm * a + 0.398 * tx - 0.237 * dm * tx + 0.315 * ld - 0.099 * dm * ld + 0.130 * d0 - 0.348 * dm * d0 + 1.262 * dm;
      let p = 0; for (let i = 0; i < EPTS_TABLA.length; i++) if (raw >= EPTS_TABLA[i]) p = i;
      return {
        r: p, u: '%', d: 0, lab: 'EPTS',
        interp: p <= 20 ? 'EPTS ≤20 %: mayor supervivencia esperada (en la política OPTN, prioridad para riñones con KDPI ≤20 %)' : 'EPTS >20 %',
        lvl: '', more: [['EPTS crudo', f(raw, 4)]]
      };
    },
    ref: 'Organ Procurement and Transplantation Network (OPTN). A Guide to Calculating and Interpreting the Estimated Post-Transplant Survival (EPTS) Score Used in the Kidney Allocation System. HRSA/OPTN; 2024. Tabla de conversión EPTS 2024.',
    url: 'https://optn.transplant.hrsa.gov/data/allocation-calculators/epts-calculator/',
    verif: '2026-10',
    pop: 'Candidatos adultos a trasplante renal en la lista de espera de EE. UU. (SRTR/OPTN).',
    lim: 'Diseñado para la asignación de órganos en EE. UU.; el percentil se calcula contra la lista estadounidense y la tabla se actualiza cada año (acá: tabla 2024). No es un predictor validado de supervivencia individual en Argentina ni se usa en el sistema del INCUCAI. Verificar contra la calculadora oficial OPTN antes de usarlo para decisiones.',
    tests: [
      { v: { edad: 50, dm: 'no', tx: 'no', dial: 2 }, r: 21 },   // crudo 1,5211
      { v: { edad: 25, dm: 'no', tx: 'no', dial: 0 }, r: 1 },    // crudo 0,130
      { v: { edad: 60, dm: 'si', tx: 'no', dial: 0 }, r: 47 }    // crudo 2,164
    ]
  },

  // ════════════════════════════ CIRUGÍA ════════════════════════════
  {
    id: 'alvarado', m: 's', cat: 'cirugia', tags: [],
    n: 'Score de Alvarado (MANTRELS)', sig: 'MANTRELS', syn: ['apendicitis', 'apendicitis aguda', 'alvarado'],
    tipo: 'regla de decisión',
    fin: 'Estima la probabilidad de apendicitis aguda con síntomas, signos y laboratorio.',
    ver: 'Alvarado 1986 (original, 10 puntos)',
    formula: 'Migración del dolor a FID 1 · anorexia 1 · náuseas/vómitos 1 · dolor a la palpación en FID 2 · rebote 1 · temperatura ≥37,3 °C 1 · leucocitosis >10 000/µL 2 · desviación a la izquierda (neutrófilos >75 %) 1.\nTotal 0–10: 5–6 compatible · 7–8 probable · 9–10 muy probable.',
    in: [
      { t: 'chk', id: 'mig', l: 'Migración del dolor a fosa ilíaca derecha', pts: 1 },
      { t: 'chk', id: 'anor', l: 'Anorexia (o acetonuria)', pts: 1 },
      { t: 'chk', id: 'nv', l: 'Náuseas o vómitos', pts: 1 },
      { t: 'chk', id: 'fid', l: 'Dolor a la palpación en fosa ilíaca derecha', pts: 2 },
      { t: 'chk', id: 'reb', l: 'Dolor a la descompresión (rebote)', pts: 1 },
      { t: 'num', id: 'temp', l: 'Temperatura', u: '°C', min: 30, max: 45, step: 0.1, alt: [U.f_temp] },
      { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 200, step: 0.1 },
      { t: 'num', id: 'neu', l: 'Neutrófilos', u: '%', min: 0, max: 100, step: 1 }
    ],
    calc: function (v) {
      const s = pts(v, this.in) + (v.temp >= 37.3 ? 1 : 0) + (v.gb > 10 ? 2 : 0) + (v.neu > 75 ? 1 : 0);
      return {
        r: s, u: 'puntos', d: 0,
        ...band(s, [[0, 4, 'Por debajo del umbral de 5 puntos del trabajo original', 'ok'], [5, 6, 'Compatible con apendicitis aguda', 'warn'], [7, 8, 'Apendicitis probable', 'bad'], [9, 10, 'Apendicitis muy probable', 'bad']])
      };
    },
    ref: 'Alvarado A. A practical score for the early diagnosis of acute appendicitis. Ann Emerg Med. 1986;15(5):557–564.',
    url: 'https://doi.org/10.1016/S0196-0644(86)80993-3',
    verif: '2026-10',
    pop: '305 pacientes con dolor abdominal sugestivo de apendicitis (adultos y niños) en un hospital de EE. UU.',
    lim: 'Sobreestima la probabilidad en mujeres en edad fértil y es menos preciso en niños, ancianos e inmunosuprimidos. Mejor para descartar (score bajo) que para confirmar. Los scores AIR y AAS tienen mejor discriminación en estudios posteriores.',
    tests: [
      { v: { mig: true, anor: true, nv: true, fid: true, reb: true, temp: 38, gb: 15, neu: 85 }, r: 10 },
      { v: { fid: true, temp: 37, gb: 9, neu: 60 }, r: 2 },
      { v: { mig: true, fid: true, temp: 37.5, gb: 12, neu: 70 }, r: 6 }
    ]
  },
  {
    id: 'air', m: 's', cat: 'cirugia', tags: [],
    n: 'Appendicitis Inflammatory Response Score', sig: 'AIR', syn: ['apendicitis', 'andersson'],
    tipo: 'regla de decisión',
    fin: 'Estratifica la probabilidad de apendicitis aguda (y de apendicitis avanzada) en baja, indeterminada o alta.',
    ver: 'Andersson y Andersson 2008',
    formula: 'Vómitos 1 · dolor en FID 1 · defensa/rebote: leve 1, moderada 2, intensa 3 · temperatura ≥38,5 °C 1 · PMN 70–84 % 1, ≥85 % 2 · leucocitos 10,0–14,9 ×10³/µL 1, ≥15,0 2 · PCR 10–49 mg/L 1, ≥50 2.\nTotal 0–12: 0–4 baja · 5–8 indeterminada · 9–12 alta probabilidad.',
    in: [
      { t: 'chk', id: 'vom', l: 'Vómitos', pts: 1 },
      { t: 'chk', id: 'fid', l: 'Dolor en fosa ilíaca derecha', pts: 1 },
      { t: 'sel', id: 'def', l: 'Rebote o defensa muscular', o: [[0, 'Ausente', 0], [1, 'Leve', 1], [2, 'Moderada', 2], [3, 'Intensa', 3]] },
      { t: 'num', id: 'temp', l: 'Temperatura', u: '°C', min: 30, max: 45, step: 0.1, alt: [U.f_temp] },
      { t: 'num', id: 'neu', l: 'Neutrófilos (PMN)', u: '%', min: 0, max: 100, step: 1 },
      { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 200, step: 0.1 },
      { t: 'num', id: 'pcr', l: 'Proteína C reactiva', u: 'mg/L', min: 0, max: 1000, step: 1 }
    ],
    calc: function (v) {
      const s = pts(v, this.in) + (v.temp >= 38.5 ? 1 : 0) + (v.neu >= 85 ? 2 : v.neu >= 70 ? 1 : 0) + (v.gb >= 15 ? 2 : v.gb >= 10 ? 1 : 0) + (v.pcr >= 50 ? 2 : v.pcr >= 10 ? 1 : 0);
      return { r: s, u: 'puntos', d: 0, ...band(s, [[0, 4, 'Baja probabilidad', 'ok'], [5, 8, 'Probabilidad indeterminada', 'warn'], [9, 12, 'Alta probabilidad', 'bad']]) };
    },
    ref: 'Andersson M, Andersson RE. The appendicitis inflammatory response score: a tool for the diagnosis of acute appendicitis that outperforms the Alvarado score. World J Surg. 2008;32(8):1843–1849.',
    url: 'https://doi.org/10.1007/s00268-008-9649-y',
    verif: '2026-10',
    pop: '545 pacientes (niños y adultos) con sospecha de apendicitis en Suecia.',
    lim: 'La graduación de la defensa es subjetiva. La PCR temprana (<12 h) puede ser normal. Validado como herramienta de estratificación, no de diagnóstico.',
    tests: [
      { v: { vom: true, fid: true, def: 2, temp: 38.6, neu: 86, gb: 16, pcr: 60 }, r: 11 },
      { v: { def: 0, temp: 37, neu: 60, gb: 8, pcr: 5 }, r: 0 },
      { v: { fid: true, def: 1, temp: 37.8, neu: 75, gb: 12, pcr: 20 }, r: 5 }
    ]
  },
  {
    id: 'aas', m: 's', cat: 'cirugia', tags: [],
    n: 'Adult Appendicitis Score', sig: 'AAS', syn: ['apendicitis', 'sammalkorpi'],
    tipo: 'regla de decisión',
    fin: 'Estratifica el riesgo de apendicitis aguda en adultos en bajo, intermedio y alto.',
    ver: 'Sammalkorpi et al. 2014',
    formula: 'Dolor en FID 2 · migración del dolor a FID 2 · dolor a la palpación en FID 3 (mujeres de 16–49 años: 1) · defensa leve 2, moderada/intensa 4\nLeucocitos (×10³/µL): ≥7,2 y <10,9: 1 · ≥10,9 y <14,0: 2 · ≥14,0: 3\nNeutrófilos: ≥62 y <75 %: 2 · ≥75 y <83 %: 3 · ≥83 %: 4\nPCR con síntomas <24 h (mg/L): ≥4 y <11: 2 · ≥11 y <25: 3 · ≥25 y <83: 5 · ≥83: 1\nPCR con síntomas ≥24 h (mg/L): ≥12 y <53: 2 · ≥53 y <152: 2 · ≥152: 1\nTotal: 0–10 bajo · 11–15 intermedio · ≥16 alto.',
    in: [
      { t: 'sel', id: 'sexo', l: 'Sexo', o: sexo },
      nEdad('edad', 'Edad', 16),
      { t: 'chk', id: 'dol', l: 'Dolor en fosa ilíaca derecha', pts: 2 },
      { t: 'chk', id: 'mig', l: 'Migración del dolor a fosa ilíaca derecha', pts: 2 },
      { t: 'chk', id: 'palp', l: 'Dolor a la palpación en fosa ilíaca derecha' },
      { t: 'sel', id: 'def', l: 'Defensa', o: [[0, 'Ausente', 0], [2, 'Leve', 2], [4, 'Moderada o intensa', 4]] },
      { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 200, step: 0.1 },
      { t: 'num', id: 'neu', l: 'Neutrófilos', u: '%', min: 0, max: 100, step: 1 },
      { t: 'num', id: 'pcr', l: 'Proteína C reactiva', u: 'mg/L', min: 0, max: 1000, step: 1 },
      { t: 'sel', id: 'tiempo', l: 'Duración de los síntomas', o: [['lt24', 'Menos de 24 h'], ['ge24', '24 h o más']] }
    ],
    calc: v => {
      let s = (v.dol ? 2 : 0) + (v.mig ? 2 : 0) + +v.def;
      if (v.palp) s += v.sexo == 'f' && v.edad >= 16 && v.edad <= 49 ? 1 : 3;
      s += v.gb >= 14 ? 3 : v.gb >= 10.9 ? 2 : v.gb >= 7.2 ? 1 : 0;
      s += v.neu >= 83 ? 4 : v.neu >= 75 ? 3 : v.neu >= 62 ? 2 : 0;
      const c = v.pcr;
      s += v.tiempo == 'lt24' ? (c >= 83 ? 1 : c >= 25 ? 5 : c >= 11 ? 3 : c >= 4 ? 2 : 0) : (c >= 152 ? 1 : c >= 12 ? 2 : 0);
      return { r: s, u: 'puntos', d: 0, ...band(s, [[0, 10, 'Riesgo bajo', 'ok'], [11, 15, 'Riesgo intermedio', 'warn'], [16, 23, 'Riesgo alto', 'bad']]) };
    },
    ref: 'Sammalkorpi HE, Mentula P, Leppäniemi A. A new adult appendicitis score improves diagnostic accuracy of acute appendicitis — a prospective study. BMC Gastroenterol. 2014;14:114.',
    url: 'https://doi.org/10.1186/1471-230X-14-114',
    verif: '2026-10',
    pop: '829 adultos (≥16 años) con sospecha de apendicitis en Helsinki (derivación y validación).',
    lim: 'Solo adultos. La PCR puntúa de forma no lineal según la duración de los síntomas (valores muy altos suman menos). Aplicable al momento de la consulta; no reemplaza la imagen en riesgo intermedio.',
    tests: [
      { v: { sexo: 'm', edad: 30, dol: true, mig: true, palp: true, def: 4, gb: 15, neu: 85, pcr: 30, tiempo: 'lt24' }, r: 23 },
      { v: { sexo: 'f', edad: 25, palp: true, def: 0, gb: 8, neu: 70, pcr: 20, tiempo: 'ge24' }, r: 6 },
      { v: { sexo: 'f', edad: 55, dol: true, palp: true, def: 2, gb: 11, neu: 76, pcr: 100, tiempo: 'lt24' }, r: 13 }
    ]
  },
  {
    id: 'bisap', m: 's', cat: 'cirugia', tags: ['s:gastro'],
    n: 'BISAP (pancreatitis aguda)', sig: 'BISAP', syn: ['pancreatitis', 'bedside index for severity in acute pancreatitis'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de mortalidad intrahospitalaria en pancreatitis aguda dentro de las primeras 24 h.',
    ver: 'Wu et al. 2008',
    formula: '1 punto cada uno (0–5): BUN >25 mg/dL · alteración del estado mental (GCS <15) · SIRS (≥2 criterios) · edad >60 años · derrame pleural en imagen.\nScore ≥3: mayor riesgo de mortalidad.',
    in: [
      { t: 'num', id: 'bun', l: 'BUN (nitrógeno ureico)', u: 'mg/dL', min: 1, max: 300, step: 1, alt: [BUN_DE_UREA, BUN_DE_UREA_MMOL] },
      { t: 'chk', id: 'mental', l: 'Alteración del estado mental (Glasgow <15)' },
      { t: 'chk', id: 'sirs', l: 'SIRS: ≥2 de T >38 o <36 °C, FC >90, FR >20 o PaCO₂ <32, leucocitos >12 000 o <4000 o >10 % formas inmaduras' },
      nEdad(),
      { t: 'chk', id: 'derr', l: 'Derrame pleural en imagen' }
    ],
    calc: function (v) {
      const s = pts(v, this.in) + (v.bun > 25 ? 1 : 0) + (v.edad > 60 ? 1 : 0);
      return { r: s, u: 'puntos', d: 0, interp: s >= 3 ? 'Score ≥3: mayor riesgo de mortalidad intrahospitalaria' : 'Score <3: menor riesgo de mortalidad', lvl: s >= 3 ? 'bad' : 'ok' };
    },
    ref: 'Wu BU, Johannes RS, Sun X, Tabak Y, Conwell DL, Banks PA. The early prediction of mortality in acute pancreatitis: a large population-based study. Gut. 2008;57(12):1698–1703.',
    url: 'https://doi.org/10.1136/gut.2008.152702',
    verif: '2026-10',
    pop: '>17 000 casos de pancreatitis aguda en 212 hospitales de EE. UU. (derivación 2000–2001) y >18 000 (validación 2004–2005).',
    lim: 'Diseñado para las primeras 24 h. Sensibilidad moderada para predecir pancreatitis grave. No reemplaza la reevaluación ni la clasificación de Atlanta.',
    tests: [
      { v: { bun: 30, sirs: true, edad: 65 }, r: 3 },
      { v: { bun: 10, edad: 40 }, r: 0 },
      { v: { bun: 40, mental: true, sirs: true, edad: 70, derr: true }, r: 5 }
    ]
  },
  {
    id: 'ranson', m: 's', cat: 'cirugia', tags: ['s:gastro'],
    n: 'Criterios de Ranson (pancreatitis aguda)', sig: 'Ranson', syn: ['pancreatitis', 'ranson'],
    tipo: 'score pronóstico',
    fin: 'Estima la gravedad de la pancreatitis aguda con 5 criterios al ingreso y 6 (no biliar) o 5 (biliar) a las 48 h.',
    ver: 'Ranson 1974 (no biliar/alcohólica) y Ranson 1982 (biliar)',
    formula: 'NO BILIAR — Ingreso: edad >55 · leucocitos >16 000 · glucemia >200 mg/dL · LDH >350 U/L · AST >250 U/L. 48 h: caída del Hto >10 puntos · ↑ BUN >5 mg/dL · Ca <8 mg/dL · PaO₂ <60 mmHg · déficit de bases >4 mEq/L · secuestro de líquidos >6 L.\nBILIAR — Ingreso: edad >70 · leucocitos >18 000 · glucemia >220 · LDH >400 · AST >250. 48 h: caída del Hto >10 · ↑ BUN >2 · Ca <8 · déficit de bases >5 · secuestro de líquidos >4 L.\n1 punto por criterio; ≥3: pancreatitis grave.',
    in: [
      { t: 'sel', id: 'etio', l: 'Etiología / versión', o: [['nobil', 'No biliar (Ranson 1974)'], ['bil', 'Biliar (Ranson 1982)']] },
      { t: 'sel', id: 'fase', l: 'Momento de la evaluación', o: [['ing', 'Solo ingreso'], ['48', 'Ingreso + 48 h']] },
      { t: 'head', l: 'Al ingreso' },
      nEdad(),
      { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 200, step: 0.1 },
      { t: 'num', id: 'glu', l: 'Glucemia', u: 'mg/dL', min: 10, max: 2000, step: 1, alt: [U.glu_mmol] },
      { t: 'num', id: 'ldh', l: 'LDH', u: 'U/L', min: 0, max: 20000, step: 1 },
      { t: 'num', id: 'ast', l: 'AST (GOT)', u: 'U/L', min: 0, max: 20000, step: 1 },
      { t: 'head', l: 'A las 48 h' },
      { t: 'num', id: 'hto', l: 'Descenso del hematocrito', u: 'puntos %', min: -50, max: 50, step: 0.1, req: 0 },
      { t: 'num', id: 'bun', l: 'Aumento del BUN', u: 'mg/dL', min: -200, max: 200, step: 0.1, req: 0 },
      { t: 'num', id: 'ca', l: 'Calcio sérico', u: 'mg/dL', min: 2, max: 20, step: 0.1, alt: [U.ca_mmol], req: 0 },
      { t: 'num', id: 'pao2', l: 'PaO₂ (solo no biliar)', u: 'mmHg', min: 10, max: 700, step: 1, alt: [U.kpa], req: 0 },
      { t: 'num', id: 'de', l: 'Déficit de bases', u: 'mEq/L', min: -40, max: 40, step: 0.1, req: 0 },
      { t: 'num', id: 'liq', l: 'Secuestro de líquidos estimado (ingresos − egresos)', u: 'L', min: -30, max: 50, step: 0.1, req: 0 }
    ],
    calc: v => {
      const b = v.etio == 'bil';
      let s = (v.edad > (b ? 70 : 55)) + (v.gb > (b ? 18 : 16)) + (v.glu > (b ? 220 : 200)) + (v.ldh > (b ? 400 : 350)) + (v.ast > 250);
      const ing = s;
      if (v.fase == '48') {
        const need = ['hto', 'bun', 'ca', 'de', 'liq'].concat(b ? [] : ['pao2']);
        if (need.some(k => v[k] == null)) return null;
        s += (v.hto > 10) + (v.bun > (b ? 2 : 5)) + (v.ca < 8) + (b ? 0 : v.pao2 < 60) + (v.de > (b ? 5 : 4)) + (v.liq > (b ? 4 : 6));
        return {
          r: s, u: 'criterios', d: 0, lab: 'Ranson total (' + (b ? 'biliar' : 'no biliar') + ')',
          interp: s >= 3 ? 'Pancreatitis grave (≥3 criterios)' : 'Pancreatitis no grave por Ranson (<3 criterios)', lvl: s >= 3 ? 'bad' : 'ok',
          more: [['Criterios al ingreso', ing + '/5'], ['Criterios a las 48 h', (s - ing) + '/' + (b ? 5 : 6)]]
        };
      }
      return {
        r: s, u: 'criterios', d: 0, lab: 'Ranson al ingreso (' + (b ? 'biliar' : 'no biliar') + ')',
        interp: s >= 3 ? '≥3 criterios ya al ingreso: pancreatitis grave' : 'Evaluación incompleta: completar los criterios de las 48 h', lvl: s >= 3 ? 'bad' : 'warn'
      };
    },
    ref: 'Ranson JH, Rifkind KM, Roses DF, Fink SD, Eng K, Spencer FC. Prognostic signs and the role of operative management in acute pancreatitis. Surg Gynecol Obstet. 1974;139(1):69–81. — Ranson JH. Etiological and prognostic factors in human acute pancreatitis: a review. Am J Gastroenterol. 1982;77(9):633–638.',
    verif: '2026-10',
    pop: 'Pacientes con pancreatitis aguda en Nueva York (series de los años 70; mayoría alcohólica en 1974).',
    lim: 'Requiere 48 h para completarse; no es útil para reevaluaciones posteriores. Desarrollado antes de la clasificación de Atlanta y con manejo de otra época; precisión moderada. El secuestro de líquidos depende del balance registrado.',
    tests: [
      { v: { etio: 'nobil', fase: 'ing', edad: 60, gb: 18, glu: 150, ldh: 400, ast: 100 }, r: 3 },
      { v: { etio: 'bil', fase: '48', edad: 75, gb: 10, glu: 250, ldh: 300, ast: 300, hto: 12, bun: 3, ca: 7.5, de: 3, liq: 2 }, r: 6 },
      { v: { etio: 'nobil', fase: '48', edad: 40, gb: 12, glu: 120, ldh: 200, ast: 50, hto: 5, bun: 2, ca: 8.5, pao2: 55, de: 5, liq: 7 }, r: 3 }
    ]
  },
  {
    id: 'atlanta-2012', m: 's', cat: 'cirugia', tags: ['s:gastro', 's:uti'],
    n: 'Clasificación de Atlanta revisada (pancreatitis aguda)', sig: 'Atlanta 2012', syn: ['pancreatitis', 'gravedad pancreatitis', 'atlanta'],
    tipo: 'clasificación',
    fin: 'Clasifica la gravedad de la pancreatitis aguda en leve, moderadamente grave o grave según falla orgánica y complicaciones.',
    ver: 'Atlanta revisada 2012 (Banks et al., Gut 2013)',
    formula: 'Leve: sin falla orgánica y sin complicaciones locales ni sistémicas.\nModeradamente grave: falla orgánica transitoria (<48 h) y/o complicaciones locales y/o exacerbación de comorbilidad.\nGrave: falla orgánica persistente (>48 h), única o múltiple.\nFalla orgánica: puntaje de Marshall modificado ≥2 en sistema respiratorio, renal o cardiovascular.',
    in: [
      { t: 'sel', id: 'fo', l: 'Falla orgánica (Marshall modificado ≥2)', o: [['no', 'Ausente'], ['trans', 'Transitoria (resuelve en <48 h)'], ['pers', 'Persistente (>48 h)']] },
      { t: 'chk', id: 'loc', l: 'Complicaciones locales (colección líquida aguda, colección necrótica aguda, pseudoquiste, necrosis encapsulada u otras)' },
      { t: 'chk', id: 'sist', l: 'Complicación sistémica: exacerbación de comorbilidad preexistente' }
    ],
    calc: v => {
      if (v.fo == 'pers') return { r: 'Grave', interp: 'Pancreatitis aguda grave (falla orgánica persistente)', lvl: 'bad' };
      if (v.fo == 'trans' || v.loc || v.sist) return { r: 'Moderadamente grave', interp: 'Pancreatitis aguda moderadamente grave', lvl: 'warn' };
      return { r: 'Leve', interp: 'Pancreatitis aguda leve', lvl: 'ok' };
    },
    ref: 'Banks PA, Bollen TL, Dervenis C, et al.; Acute Pancreatitis Classification Working Group. Classification of acute pancreatitis — 2012: revision of the Atlanta classification and definitions by international consensus. Gut. 2013;62(1):102–111.',
    url: 'https://doi.org/10.1136/gutjnl-2012-302779',
    verif: '2026-10',
    pop: 'Adultos con pancreatitis aguda; clasificación de consenso internacional.',
    lim: 'La categoría definitiva requiere seguir la evolución >48 h; en las primeras horas solo es provisoria. Las complicaciones locales se definen por imagen (idealmente TC con contraste después de 72 h).',
    tests: [
      { v: { fo: 'no' }, r: 'Leve' },
      { v: { fo: 'pers' }, r: 'Pancreatitis aguda grave' },
      { v: { fo: 'no', loc: true }, r: 'Moderadamente grave' },
      { v: { fo: 'trans' }, r: 'Moderadamente grave' }
    ]
  },
  {
    id: 'clavien-dindo', m: 's', cat: 'cirugia', tags: ['s:anestesia'],
    n: 'Clasificación de Clavien-Dindo (complicaciones quirúrgicas)', sig: 'Clavien-Dindo', syn: ['complicaciones postoperatorias', 'clavien', 'dindo'],
    tipo: 'clasificación',
    fin: 'Gradúa las complicaciones postoperatorias según el tratamiento necesario para resolverlas.',
    ver: 'Dindo, Demartines y Clavien 2004',
    formula: 'I: desvío del curso postoperatorio normal sin necesidad de tratamiento farmacológico, quirúrgico, endoscópico ni radiológico (se permiten antieméticos, antipiréticos, analgésicos, diuréticos, electrolitos, fisioterapia y apertura de herida infectada en la cama).\nII: requiere fármacos distintos de los permitidos en grado I; incluye transfusiones y nutrición parenteral.\nIIIa: intervención quirúrgica, endoscópica o radiológica sin anestesia general. IIIb: bajo anestesia general.\nIVa: complicación con riesgo vital (incluye SNC) que requiere UTI, disfunción de un órgano (incluye diálisis). IVb: disfunción multiorgánica.\nV: muerte.\nSufijo «d»: complicación presente al alta (discapacidad).',
    in: [
      { t: 'sel', id: 'g', l: 'Grado', o: [['I', 'I — sin tratamiento específico (solo los fármacos permitidos)'], ['II', 'II — tratamiento farmacológico, transfusión o NPT'], ['IIIa', 'IIIa — intervención sin anestesia general'], ['IIIb', 'IIIb — intervención bajo anestesia general'], ['IVa', 'IVa — riesgo vital, falla de un órgano (incluye diálisis)'], ['IVb', 'IVb — disfunción multiorgánica'], ['V', 'V — muerte del paciente']] },
      { t: 'chk', id: 'd', l: 'La complicación persiste al momento del alta (sufijo «d»)' }
    ],
    calc: v => {
      const d = v.d && v.g != 'V';
      return {
        r: 'Grado ' + v.g + (d ? '-d' : ''), lvl: /^I$|^II$/.test(v.g) ? 'warn' : 'bad',
        interp: { I: 'Complicación menor', II: 'Complicación que requiere tratamiento farmacológico', IIIa: 'Requiere intervención sin anestesia general', IIIb: 'Requiere intervención bajo anestesia general', IVa: 'Complicación con riesgo vital (falla de un órgano)', IVb: 'Complicación con riesgo vital (falla multiorgánica)', V: 'Muerte' }[v.g],
        note: d ? 'Sufijo «d»: requiere seguimiento para evaluar la complicación por completo.' : undefined
      };
    },
    ref: 'Dindo D, Demartines N, Clavien PA. Classification of surgical complications: a new proposal with evaluation in a cohort of 6336 patients and results of a survey. Ann Surg. 2004;240(2):205–213.',
    url: 'https://doi.org/10.1097/01.sla.0000133083.54934.ae',
    verif: '2026-10',
    pop: '6336 pacientes de cirugía general electiva (Zúrich); validada por encuesta internacional.',
    lim: 'Gradúa por el tratamiento, no por la gravedad intrínseca; se clasifica la complicación más grave. El AIT no se considera grado IV. Para la carga total de complicaciones existe el Comprehensive Complication Index.',
    tests: [
      { v: { g: 'IIIb' }, r: 'Grado IIIb' },
      { v: { g: 'II', d: true }, r: 'Grado II-d' },
      { v: { g: 'V', d: true }, r: 'Muerte' }
    ]
  },
  {
    id: 'caprini', m: 's', cat: 'cirugia', tags: ['s:anestesia', 's:hematologia'],
    n: 'Caprini: riesgo de tromboembolismo venoso quirúrgico', sig: 'Caprini RAM', syn: ['tev', 'tvp', 'tromboprofilaxis', 'trombosis', 'caprini'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de tromboembolismo venoso en pacientes quirúrgicos para orientar la tromboprofilaxis.',
    ver: 'Caprini Risk Assessment Model 2005 (Dis Mon 2005); categorías de riesgo ACCP 2012',
    formula: '1 punto: edad 41–60 · cirugía menor · cirugía mayor en el último mes · ICC (<1 mes) · sepsis (<1 mes) · enfermedad pulmonar grave incl. neumonía (<1 mes) · función pulmonar alterada (EPOC) · IAM · EII · edema de MMII actual · várices · IMC >25 · paciente clínico en reposo · otros factores · (mujer) ACO/TRH, embarazo o puerperio (<1 mes), antecedente de muerte fetal inexplicada, ≥3 abortos espontáneos o parto prematuro con toxemia o RCIU.\n2 puntos: edad 61–74 · cirugía mayor (>45 min) · laparoscópica (>45 min) · artroscópica · neoplasia actual o previa · en cama >72 h · yeso inmovilizador (<1 mes) · acceso venoso central.\n3 puntos: edad ≥75 · antecedente de TVP/TEP · antecedente familiar de trombosis · factor V Leiden · protrombina 20210A · anticoagulante lúpico · anticuerpos anticardiolipina · homocisteína elevada · TIH · otra trombofilia.\n5 puntos: artroplastia mayor electiva de MMII · fractura de cadera, pelvis o pierna (<1 mes) · ACV (<1 mes) · politraumatismo (<1 mes) · lesión medular aguda con parálisis (<1 mes).',
    in: [
      { t: 'sel', id: 'edad', l: 'Edad', o: [['40', '≤40 años', 0], ['60', '41–60 años', 1], ['74', '61–74 años', 2], ['75', '≥75 años', 3]] },
      { t: 'sel', id: 'cx', l: 'Cirugía actual', o: [['no', 'Sin cirugía', 0], ['menor', 'Cirugía menor', 1], ['mayor', 'Cirugía mayor (>45 min)', 2], ['lap', 'Laparoscópica (>45 min)', 2], ['artros', 'Artroscópica', 2], ['artro', 'Artroplastia mayor electiva de miembro inferior', 5]] },
      { t: 'sel', id: 'mov', l: 'Movilidad', o: [['normal', 'Deambula normalmente', 0], ['reposo', 'Paciente clínico en reposo en cama', 1], ['cama72', 'Confinado en cama >72 h', 2]] },
      { t: 'head', l: '1 punto' },
      { t: 'chk', id: 'cxmes', l: 'Cirugía mayor en el último mes' },
      { t: 'chk', id: 'icc', l: 'Insuficiencia cardíaca (<1 mes)' },
      { t: 'chk', id: 'sepsis', l: 'Sepsis (<1 mes)' },
      { t: 'chk', id: 'pulm', l: 'Enfermedad pulmonar grave, incluida neumonía (<1 mes)' },
      { t: 'chk', id: 'epoc', l: 'Función pulmonar alterada (EPOC)' },
      { t: 'chk', id: 'iam', l: 'Infarto agudo de miocardio' },
      { t: 'chk', id: 'eii', l: 'Enfermedad inflamatoria intestinal' },
      { t: 'chk', id: 'edema', l: 'Edema actual de miembros inferiores' },
      { t: 'chk', id: 'var', l: 'Várices' },
      { t: 'chk', id: 'imc', l: 'IMC >25 kg/m²' },
      { t: 'chk', id: 'otros', l: 'Otros factores de riesgo' },
      { t: 'chk', id: 'aco', l: 'Mujer: anticonceptivos orales o terapia hormonal' },
      { t: 'chk', id: 'emb', l: 'Mujer: embarazo o puerperio (<1 mes)' },
      { t: 'chk', id: 'obst', l: 'Mujer: muerte fetal inexplicada, ≥3 abortos espontáneos, o parto prematuro con toxemia o RCIU' },
      { t: 'head', l: '2 puntos' },
      { t: 'chk', id: 'neo', l: 'Neoplasia actual o previa', pts: 2 },
      { t: 'chk', id: 'yeso', l: 'Yeso inmovilizador (<1 mes)', pts: 2 },
      { t: 'chk', id: 'cvc', l: 'Acceso venoso central', pts: 2 },
      { t: 'head', l: '3 puntos' },
      { t: 'chk', id: 'tev', l: 'Antecedente de TVP o TEP', pts: 3 },
      { t: 'chk', id: 'fam', l: 'Antecedente familiar de trombosis', pts: 3 },
      { t: 'chk', id: 'fvl', l: 'Factor V Leiden positivo', pts: 3 },
      { t: 'chk', id: 'pt', l: 'Mutación de protrombina 20210A', pts: 3 },
      { t: 'chk', id: 'al', l: 'Anticoagulante lúpico positivo', pts: 3 },
      { t: 'chk', id: 'acl', l: 'Anticuerpos anticardiolipina elevados', pts: 3 },
      { t: 'chk', id: 'hcy', l: 'Homocisteína sérica elevada', pts: 3 },
      { t: 'chk', id: 'tih', l: 'Trombocitopenia inducida por heparina', pts: 3 },
      { t: 'chk', id: 'tromb', l: 'Otra trombofilia congénita o adquirida', pts: 3 },
      { t: 'head', l: '5 puntos' },
      { t: 'chk', id: 'fx', l: 'Fractura de cadera, pelvis o pierna (<1 mes)', pts: 5 },
      { t: 'chk', id: 'acv', l: 'ACV (<1 mes)', pts: 5 },
      { t: 'chk', id: 'poli', l: 'Politraumatismo (<1 mes)', pts: 5 },
      { t: 'chk', id: 'med', l: 'Lesión medular aguda con parálisis (<1 mes)', pts: 5 }
    ],
    calc: function (v) {
      const s = pts(v, this.in);
      const orig = s <= 1 ? 'bajo' : s == 2 ? 'moderado' : s <= 4 ? 'alto' : 'muy alto';
      return {
        r: s, u: 'puntos', d: 0,
        ...band(s, [[0, 0, 'Riesgo muy bajo (ACCP 2012: 0)', 'ok'], [1, 2, 'Riesgo bajo (ACCP 2012: 1–2)', 'ok'], [3, 4, 'Riesgo moderado (ACCP 2012: 3–4)', 'warn'], [5, 200, 'Riesgo alto (ACCP 2012: ≥5)', 'bad']]),
        more: [['Categoría original Caprini 2005', orig + ' (0–1 bajo · 2 moderado · 3–4 alto · ≥5 muy alto)']]
      };
    },
    ref: 'Caprini JA. Thrombosis risk assessment as a guide to quality patient care. Dis Mon. 2005;51(2–3):70–78. — Gould MK, Garcia DA, Wren SM, et al. Prevention of VTE in nonorthopedic surgical patients: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed: ACCP Evidence-Based Clinical Practice Guidelines. Chest. 2012;141(2 Suppl):e227S–e277S.',
    url: 'https://doi.org/10.1016/j.disamonth.2005.02.003',
    verif: '2026-10',
    pop: 'Pacientes quirúrgicos (validación retrospectiva de Bahl 2010 en >8000 pacientes de cirugía general, vascular y urológica).',
    lim: 'Existen varias versiones del modelo (2005, 2010, 2013) con ítems y puntos distintos; acá se usa la de 2005. Los umbrales de «muy alto riesgo» varían por especialidad. Varios ítems son subjetivos. No evalúa el riesgo de sangrado.',
    tests: [
      { v: { edad: '74', cx: 'mayor', mov: 'normal', neo: true }, r: 6 },
      { v: { edad: '40', cx: 'menor', mov: 'normal' }, r: 1 },
      { v: { edad: '75', cx: 'artro', mov: 'cama72', tev: true, imc: true }, r: 14 },
      { v: { edad: '60', cx: 'lap', mov: 'normal' }, r: 'moderado' }
    ]
  },
  {
    id: 'possum', m: 's', cat: 'cirugia', tags: ['s:anestesia'],
    n: 'POSSUM (morbilidad y mortalidad quirúrgica)', sig: 'POSSUM', syn: ['riesgo quirurgico', 'copeland', 'mortalidad operatoria'],
    tipo: 'score pronóstico',
    fin: 'Estima la morbilidad y la mortalidad a 30 días con un puntaje fisiológico y uno de gravedad operatoria; útil para auditoría ajustada por riesgo.',
    ver: 'Copeland et al. 1991 (ecuaciones originales)',
    formula: 'PF = suma de 12 variables fisiológicas (1, 2, 4 u 8 cada una; 12–88). PO = suma de 6 variables operatorias (6–48).\nMorbilidad: ln[R/(1−R)] = −5,91 + 0,16 × PF + 0,19 × PO\nMortalidad: ln[R/(1−R)] = −7,04 + 0,13 × PF + 0,16 × PO',
    in: POSSUM_IN,
    calc: v => {
      const ps = possumPS(v), os = possumOS(v);
      const mo = logit(-5.91 + 0.16 * ps + 0.19 * os), mt = logit(-7.04 + 0.13 * ps + 0.16 * os);
      return {
        r: rd(mo * 100, 1), u: '%', d: 1, lab: 'Morbilidad estimada (30 días)',
        more: [['Mortalidad estimada (POSSUM)', pct(mt)], ['Puntaje fisiológico', String(ps)], ['Puntaje operatorio', String(os)]],
        lvl: mt >= 0.1 ? 'bad' : mt >= 0.05 ? 'warn' : '',
        note: 'POSSUM sobreestima la mortalidad en pacientes de bajo riesgo; para mortalidad preferir P-POSSUM.'
      };
    },
    ref: 'Copeland GP, Jones D, Walters M. POSSUM: a scoring system for surgical audit. Br J Surg. 1991;78(3):355–360.',
    url: 'https://doi.org/10.1002/bjs.1800780327',
    verif: '2026-10',
    pop: '1440 pacientes de cirugía general (programada y de urgencia) en el Reino Unido.',
    lim: 'Las variables operatorias se conocen recién al final de la cirugía. Sobreestima la mortalidad (sobre todo en bajo riesgo: piso ~1 %). Diseñado para comparación de resultados (auditoría), no para decisiones individuales. Existen variantes por especialidad (Cr-POSSUM, V-POSSUM, O-POSSUM).',
    tests: [
      // PF 12, PO 6: morbilidad logit −2,85 → 5,47 %; mortalidad logit −4,52 → 1,08 %
      { v: POSSUM_TV, r: 5.5, tol: 0.06 },
      // PF 38, PO 34: morbilidad logit −5,91 + 6,08 + 6,46 = 6,63 → 99,87 %
      { v: POSSUM_TV2, r: 99.9, tol: 0.06 }
    ]
  },
  {
    id: 'p-possum', m: 's', cat: 'cirugia', tags: ['s:anestesia'],
    n: 'P-POSSUM (mortalidad quirúrgica, Portsmouth)', sig: 'P-POSSUM', syn: ['portsmouth possum', 'riesgo quirurgico', 'mortalidad operatoria'],
    tipo: 'score pronóstico',
    fin: 'Estima la mortalidad hospitalaria postoperatoria con las mismas variables de POSSUM y una ecuación recalibrada.',
    ver: 'Prytherch et al. 1998 (Portsmouth)',
    formula: 'Mismos puntajes fisiológico (PF) y operatorio (PO) que POSSUM.\nMortalidad: ln[R/(1−R)] = −9,065 + 0,1692 × PF + 0,1550 × PO',
    in: POSSUM_IN,
    calc: v => {
      const ps = possumPS(v), os = possumOS(v);
      const mt = logit(-9.065 + 0.1692 * ps + 0.1550 * os);
      return {
        r: rd(mt * 100, 2), u: '%', d: 2, lab: 'Mortalidad estimada',
        more: [['Puntaje fisiológico', String(ps)], ['Puntaje operatorio', String(os)]],
        lvl: mt >= 0.1 ? 'bad' : mt >= 0.05 ? 'warn' : ''
      };
    },
    ref: 'Prytherch DR, Whiteley MS, Higgins B, Weaver PC, Prout WG, Powell SJ. POSSUM and Portsmouth POSSUM for predicting mortality. Br J Surg. 1998;85(9):1217–1220.',
    url: 'https://doi.org/10.1046/j.1365-2168.1998.00840.x',
    verif: '2026-10',
    pop: '10 000 pacientes de cirugía general y vascular en Portsmouth (Reino Unido).',
    lim: 'Usa variables intraoperatorias; diseñado para auditoría. Puede subestimar la mortalidad en cirugía de urgencia de alto riesgo y en ancianos; calibración variable según país y especialidad.',
    tests: [
      // PF 12, PO 6: logit −6,1046 → 0,222 %
      { v: POSSUM_TV, r: 0.22, tol: 0.01 },
      // PF 38, PO 34: logit −9,065 + 6,4296 + 5,27 = 2,6346 → 93,31 %
      { v: POSSUM_TV2, r: 93.31, tol: 0.05 }
    ]
  },
  {
    id: 'mpi', m: 's', cat: 'cirugia', tags: ['s:infectologia'],
    n: 'Índice de Peritonitis de Mannheim', sig: 'MPI', syn: ['peritonitis', 'mannheim'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de muerte en pacientes con peritonitis secundaria a partir de datos clínicos e intraoperatorios.',
    ver: 'Wacha y Linder 1987',
    formula: 'Edad >50 años 5 · sexo femenino 5 · falla orgánica 7 · neoplasia 4 · duración preoperatoria >24 h 4 · origen no colónico 4 · peritonitis difusa generalizada 6 · exudado: claro 0, turbio/purulento 6, fecaloideo 12.\nTotal 0–47; >26: alto riesgo de mortalidad.',
    in: [
      nEdad(),
      { t: 'sel', id: 'sexo', l: 'Sexo', o: [['m', 'Masculino', 0], ['f', 'Femenino', 5]] },
      { t: 'chk', id: 'fo', l: 'Falla orgánica (renal, pulmonar, shock u obstrucción intestinal según definición original)', pts: 7 },
      { t: 'chk', id: 'neo', l: 'Neoplasia', pts: 4 },
      { t: 'chk', id: 'dur', l: 'Duración de la peritonitis >24 h antes de la cirugía', pts: 4 },
      { t: 'chk', id: 'orig', l: 'Origen de la sepsis no colónico', pts: 4 },
      { t: 'chk', id: 'dif', l: 'Peritonitis difusa generalizada', pts: 6 },
      { t: 'sel', id: 'exu', l: 'Exudado', o: [['claro', 'Claro', 0], ['pur', 'Turbio o purulento', 6], ['fec', 'Fecaloideo', 12]] }
    ],
    calc: function (v) {
      const s = pts(v, this.in) + (v.edad > 50 ? 5 : 0);
      const g = s < 21 ? '<21' : s <= 29 ? '21–29' : '>29';
      return {
        r: s, u: 'puntos', d: 0, interp: s > 26 ? 'MPI >26: alto riesgo de mortalidad (umbral original)' : 'MPI ≤26: menor riesgo de mortalidad (umbral original)', lvl: s > 26 ? 'bad' : s >= 21 ? 'warn' : 'ok',
        more: [['Grupo de Billing 1994', g + ' (mortalidad creciente: <21, 21–29, >29)']]
      };
    },
    ref: 'Wacha H, Linder MM, Feldmann U, Wesch G, Gundlach E, Steifensand RA. Mannheim peritonitis index — prediction of risk of death from peritonitis: construction of a statistical and validation of an empirically based index. Theor Surg. 1987;1:169–177. — Billing A, Fröhlich D, Schildberg FW. Prediction of outcome using the Mannheim peritonitis index in 2003 patients. Br J Surg. 1994;81(2):209–213.',
    url: 'https://doi.org/10.1002/bjs.1800810217',
    verif: '2026-10',
    pop: 'Pacientes operados por peritonitis secundaria (Alemania; validación multicéntrica europea de 2003 pacientes).',
    lim: 'Parte de los datos se obtienen durante la cirugía. La mortalidad por grupo varía entre series y contextos. La definición de falla orgánica es la del índice original, no SOFA.',
    tests: [
      { v: { edad: 40, sexo: 'm', exu: 'claro' }, r: 0 },
      { v: { edad: 60, sexo: 'f', fo: true, dif: true, exu: 'fec' }, r: 35 },
      { v: { edad: 55, sexo: 'm', dur: true, orig: true, exu: 'pur' }, r: 19 }
    ]
  },

  // ════════════════════════════ GASTRO / HEPATOLOGÍA ════════════════════════════
  {
    id: 'child-pugh', m: 's', cat: 'gastro', tags: [],
    n: 'Child-Pugh', sig: 'CTP', syn: ['child', 'cirrosis', 'child turcotte pugh', 'hepatopatia'],
    tipo: 'clasificación',
    fin: 'Clasifica la gravedad de la cirrosis (A, B, C) con 3 parámetros de laboratorio y 2 clínicos.',
    ver: 'Pugh 1973 con RIN en lugar de tiempo de protrombina; umbrales de bilirrubina modificados para colestasis (CBP/CEP)',
    formula: 'Bilirrubina (mg/dL): <2: 1 · 2–3: 2 · >3: 3 (CBP/CEP: <4: 1 · 4–10: 2 · >10: 3)\nAlbúmina (g/dL): >3,5: 1 · 2,8–3,5: 2 · <2,8: 3\nRIN: <1,7: 1 · 1,7–2,3: 2 · >2,3: 3\nAscitis: ausente 1 · leve/controlada 2 · moderada-grave/refractaria 3\nEncefalopatía: ausente 1 · grado 1–2 2 · grado 3–4 3\nA: 5–6 · B: 7–9 · C: 10–15',
    in: [
      nBili(),
      nAlb(),
      { t: 'num', id: 'inr', l: 'RIN (INR)', u: '', min: 0.5, max: 15, step: 0.01 },
      { t: 'sel', id: 'asc', l: 'Ascitis', o: [['no', 'Ausente', 1], ['leve', 'Leve o controlada con diuréticos', 2], ['grave', 'Moderada a grave, o refractaria', 3]] },
      { t: 'sel', id: 'enc', l: 'Encefalopatía hepática', o: [['no', 'Ausente', 1], ['12', 'Grado 1–2 (o controlada con tratamiento)', 2], ['34', 'Grado 3–4 (o refractaria)', 3]] },
      { t: 'sel', id: 'col', l: 'Tipo de hepatopatía', o: [['no', 'No colestásica'], ['si', 'Colestásica (colangitis biliar primaria o colangitis esclerosante primaria)']] }
    ],
    calc: function (v) {
      const b = v.col == 'si' ? (v.bili < 4 ? 1 : v.bili <= 10 ? 2 : 3) : (v.bili < 2 ? 1 : v.bili <= 3 ? 2 : 3);
      const a = v.alb > 3.5 ? 1 : v.alb >= 2.8 ? 2 : 3;
      const i = v.inr < 1.7 ? 1 : v.inr <= 2.3 ? 2 : 3;
      const s = b + a + i + pts(v, this.in);
      const c = s <= 6 ? 'A' : s <= 9 ? 'B' : 'C';
      return { r: 'Clase ' + c + ' (' + s + ' puntos)', interp: { A: 'Child-Pugh A: enfermedad compensada', B: 'Child-Pugh B: compromiso funcional significativo', C: 'Child-Pugh C: enfermedad descompensada' }[c], lvl: c == 'A' ? 'ok' : c == 'B' ? 'warn' : 'bad' };
    },
    ref: 'Pugh RN, Murray-Lyon IM, Dawson JL, Pietroni MC, Williams R. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973;60(8):646–649.',
    url: 'https://doi.org/10.1002/bjs.1800600817',
    verif: '2026-10',
    pop: 'Originalmente, pacientes cirróticos sometidos a cirugía por várices esofágicas; luego ampliado a pronóstico general de la cirrosis.',
    lim: 'La ascitis y la encefalopatía son subjetivas. El original usaba prolongación del TP en segundos (1–4, 4–6, >6 s); el RIN no está estandarizado para hepatopatía. La albúmina y el RIN se alteran por infusiones y anticoagulantes. Para priorización de trasplante se usa MELD.',
    tests: [
      { v: { bili: 1, alb: 4, inr: 1.1, asc: 'no', enc: 'no', col: 'no' }, r: 'Clase A (5' },
      { v: { bili: 4, alb: 2.5, inr: 2, asc: 'grave', enc: '12', col: 'no' }, r: 'Clase C (13' },
      { v: { bili: 2.5, alb: 3.0, inr: 1.5, asc: 'leve', enc: 'no', col: 'no' }, r: 'Clase B (8' },
      { v: { bili: 3.5, alb: 3.6, inr: 1.2, asc: 'no', enc: 'no', col: 'si' }, r: 'Clase A (5' }
    ]
  },
  {
    id: 'meld-na', m: 's', cat: 'gastro', tags: ['f:gastro'],
    n: 'MELD-Na (UNOS/OPTN 2016)', sig: 'MELD-Na', syn: ['meld', 'meld sodio', 'trasplante hepatico', 'cirrosis'],
    tipo: 'score pronóstico',
    fin: 'Estima la mortalidad a 90 días en cirrosis y prioriza la lista de trasplante hepático (fórmula OPTN vigente desde 2016 hasta MELD 3.0).',
    ver: 'MELD(i) y MELD-Na según política OPTN/UNOS (enero 2016)',
    formula: 'Límites: valores <1,0 se llevan a 1,0 (Cr, bilirrubina, RIN); Cr máx. 4,0; diálisis ≥2 veces en la última semana o ≥24 h de hemodiálisis continua → Cr = 4,0; Na entre 125 y 137.\nMELD(i) = 0,957 × ln(Cr) + 0,378 × ln(bili) + 1,120 × ln(RIN) + 0,643; se redondea a un decimal y se multiplica por 10.\nSi MELD(i) >11: MELD = MELD(i) + 1,32 × (137 − Na) − [0,033 × MELD(i) × (137 − Na)].\nResultado redondeado al entero; máximo 40.',
    in: [
      nCr(),
      nBili(),
      { t: 'num', id: 'inr', l: 'RIN (INR)', u: '', min: 0.5, max: 15, step: 0.01 },
      { t: 'num', id: 'na', l: 'Sodio', u: 'mEq/L', min: 90, max: 200, step: 1 },
      { t: 'sel', id: 'dial', l: 'Diálisis ≥2 veces en la última semana o ≥24 h de HDVVC', o: [['no', 'No'], ['si', 'Sí']] }
    ],
    calc: v => {
      const cr = v.dial == 'si' ? 4 : clamp(v.cr, 1, 4), bi = Math.max(v.bili, 1), inr = Math.max(v.inr, 1), na = clamp(v.na, 125, 137);
      const mi = rd(0.957 * Math.log(cr) + 0.378 * Math.log(bi) + 1.120 * Math.log(inr) + 0.643, 1) * 10;
      let m = mi > 11 ? mi + 1.32 * (137 - na) - 0.033 * mi * (137 - na) : mi;
      m = Math.min(Math.round(m), 40);
      return {
        r: m, u: 'puntos', d: 0, lab: 'MELD-Na', more: [['MELD (sin sodio)', String(rd(mi, 0))]],
        ...band(m, [[0, 9, 'Mortalidad a 3 meses baja en la cohorte original MELD (<10)', 'ok'], [10, 19, 'MELD 10–19', 'warn'], [20, 29, 'MELD 20–29', 'bad'], [30, 40, 'MELD ≥30: mortalidad a 3 meses alta', 'bad']])
      };
    },
    ref: 'Kim WR, Biggins SW, Kremers WK, et al. Hyponatremia and mortality among patients on the liver-transplant waiting list. N Engl J Med. 2008;359(10):1018–1026. — OPTN/UNOS. Policy 9: Allocation of Livers and Liver-Intestines (MELD-Na, vigente desde 11/01/2016).',
    url: 'https://doi.org/10.1056/NEJMoa0801209',
    verif: '2026-10',
    pop: 'Adultos con cirrosis en lista de trasplante hepático (OPTN/SRTR, EE. UU.).',
    lim: 'Reemplazado en la asignación OPTN por MELD 3.0 (julio 2023). El RIN y la creatinina dependen del laboratorio; la creatinina subestima la disfunción renal en mujeres y sarcopénicos. No captura complicaciones como ascitis refractaria, encefalopatía o hepatocarcinoma (excepciones).',
    tests: [
      { v: { cr: 1, bili: 1, inr: 1, na: 140, dial: 'no' }, r: 6 },
      { v: { cr: 2, bili: 5, inr: 2, na: 130, dial: 'no' }, r: 30 },
      { v: { cr: 1, bili: 10, inr: 1.5, na: 125, dial: 'si' }, r: 36 }
    ]
  },
  {
    id: 'meld-3', m: 's', cat: 'gastro', tags: ['f:gastro'],
    n: 'MELD 3.0', sig: 'MELD 3.0', syn: ['meld', 'meld 3', 'trasplante hepatico', 'cirrosis'],
    tipo: 'score pronóstico',
    fin: 'Estima la mortalidad a 90 días en cirrosis incorporando sexo y albúmina; usado por OPTN para la asignación hepática desde 2023.',
    ver: 'Kim et al. 2021 (MELD 3.0, adoptado por OPTN en julio 2023)',
    formula: 'Límites: bilirrubina, Cr y RIN <1,0 → 1,0; Cr máx. 3,0 (diálisis ≥2 veces en la última semana o ≥24 h de HDVVC → 3,0); Na 125–137; albúmina 1,5–3,5 g/dL.\nMELD 3.0 = 1,33 × (mujer) + 4,56 × ln(bili) + 0,82 × (137 − Na) − 0,24 × (137 − Na) × ln(bili) + 9,09 × ln(RIN) + 11,14 × ln(Cr) + 1,85 × (3,5 − alb) − 1,83 × (3,5 − alb) × ln(Cr) + 6\nRedondeado al entero; máximo 40.\nSupervivencia a 90 días = 0,946^exp(0,17698 × MELD 3.0 − 3,56)',
    in: [
      { t: 'sel', id: 'sexo', l: 'Sexo', o: sexo },
      nBili(),
      { t: 'num', id: 'na', l: 'Sodio', u: 'mEq/L', min: 90, max: 200, step: 1 },
      { t: 'num', id: 'inr', l: 'RIN (INR)', u: '', min: 0.5, max: 15, step: 0.01 },
      nCr(),
      nAlb(),
      { t: 'sel', id: 'dial', l: 'Diálisis ≥2 veces en la última semana o ≥24 h de HDVVC', o: [['no', 'No'], ['si', 'Sí']] }
    ],
    calc: v => {
      const bi = Math.max(v.bili, 1), inr = Math.max(v.inr, 1), cr = v.dial == 'si' ? 3 : clamp(v.cr, 1, 3), na = clamp(v.na, 125, 137), al = clamp(v.alb, 1.5, 3.5);
      const lb = Math.log(bi), lc = Math.log(cr);
      const raw = 1.33 * (v.sexo == 'f' ? 1 : 0) + 4.56 * lb + 0.82 * (137 - na) - 0.24 * (137 - na) * lb + 9.09 * Math.log(inr) + 11.14 * lc + 1.85 * (3.5 - al) - 1.83 * (3.5 - al) * lc + 6;
      const m = Math.min(Math.round(raw), 40);
      const sup = Math.pow(0.946, Math.exp(0.17698 * m - 3.56));
      return {
        r: m, u: 'puntos', d: 0, lab: 'MELD 3.0',
        more: [['Supervivencia estimada a 90 días', pct(sup)], ['Mortalidad estimada a 90 días', pct(1 - sup)]],
        lvl: m >= 30 ? 'bad' : m >= 20 ? 'warn' : ''
      };
    },
    ref: 'Kim WR, Mannalithara A, Heimbach JK, et al. MELD 3.0: the Model for End-Stage Liver Disease updated for the modern era. Gastroenterology. 2021;161(6):1887–1895.e4.',
    url: 'https://doi.org/10.1053/j.gastro.2021.08.050',
    verif: '2026-10',
    pop: 'Adultos inscriptos en lista de trasplante hepático en EE. UU. (OPTN/SRTR 2016–2018; derivación y validación).',
    lim: 'Derivado en población de lista de espera estadounidense. Las mismas limitaciones de laboratorio que MELD (RIN, creatinina). La albúmina se altera con infusiones. En 12–17 años OPTN aplica la misma fórmula; no usar en <12 años (PELD).',
    tests: [
      // todo en los límites inferiores: 0 + 0 + 0 − 0 + 0 + 0 + 0 − 0 + 6 = 6
      { v: { sexo: 'm', bili: 1, na: 140, inr: 1, cr: 1, alb: 4, dial: 'no' }, r: 6 },
      // mujer, bili 3, Na 130, RIN 1,8, Cr 1,5, alb 2,8: 1,33+5,0098+5,74−1,8457+5,3430+4,5168+1,295−0,5194+6 = 26,87 → 27
      { v: { sexo: 'f', bili: 3, na: 130, inr: 1.8, cr: 1.5, alb: 2.8, dial: 'no' }, r: 27 },
      { v: { sexo: 'm', bili: 1, na: 140, inr: 1, cr: 1, alb: 4, dial: 'si' }, r: 18 }
    ]
  },
  {
    id: 'glasgow-blatchford', m: 's', cat: 'gastro', tags: [],
    n: 'Glasgow-Blatchford (hemorragia digestiva alta)', sig: 'GBS', syn: ['blatchford', 'hda', 'hemorragia digestiva alta', 'sangrado digestivo'],
    tipo: 'score pronóstico',
    fin: 'Estima la necesidad de intervención (transfusión, endoscopia terapéutica o cirugía) o muerte en la hemorragia digestiva alta, antes de la endoscopia.',
    ver: 'Blatchford et al. 2000',
    formula: 'Urea (mmol/L): 6,5–<8: 2 · 8–<10: 3 · 10–<25: 4 · ≥25: 6\nHb varones (g/dL): 12–<13: 1 · 10–<12: 3 · <10: 6 · mujeres: 10–<12: 1 · <10: 6\nPAS (mmHg): 100–109: 1 · 90–99: 2 · <90: 3\nFC ≥100: 1 · melena 1 · síncope 2 · hepatopatía 2 · insuficiencia cardíaca 2\nTotal 0–23.',
    in: [
      { t: 'num', id: 'urea', l: 'Urea', u: 'mmol/L', min: 0.5, max: 150, step: 0.1, alt: [UREA_MG, BUN_MG] },
      { t: 'sel', id: 'sexo', l: 'Sexo', o: sexo },
      { t: 'num', id: 'hb', l: 'Hemoglobina', u: 'g/dL', min: 2, max: 25, step: 0.1, alt: [U.hb_gl] },
      { t: 'num', id: 'pas', l: 'Presión arterial sistólica', u: 'mmHg', min: 30, max: 300, step: 1 },
      { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 20, max: 250, step: 1 },
      { t: 'chk', id: 'mel', l: 'Melena', pts: 1 },
      { t: 'chk', id: 'sinc', l: 'Síncope', pts: 2 },
      { t: 'chk', id: 'hep', l: 'Hepatopatía (antecedente o evidencia clínica/laboratorio)', pts: 2 },
      { t: 'chk', id: 'ic', l: 'Insuficiencia cardíaca (antecedente o evidencia)', pts: 2 }
    ],
    calc: function (v) {
      const u = v.urea < 6.5 ? 0 : v.urea < 8 ? 2 : v.urea < 10 ? 3 : v.urea < 25 ? 4 : 6;
      const h = v.sexo == 'm' ? (v.hb >= 13 ? 0 : v.hb >= 12 ? 1 : v.hb >= 10 ? 3 : 6) : (v.hb >= 12 ? 0 : v.hb >= 10 ? 1 : 6);
      const p = v.pas >= 110 ? 0 : v.pas >= 100 ? 1 : v.pas >= 90 ? 2 : 3;
      const s = u + h + p + (v.fc >= 100 ? 1 : 0) + pts(v, this.in);
      return {
        r: s, u: 'puntos', d: 0,
        interp: s == 0 ? 'GBS 0: muy bajo riesgo de necesitar intervención' : s == 1 ? 'GBS 1: muy bajo riesgo según las guías actuales (umbral ≤1)' : 'GBS ≥2: no es de bajo riesgo',
        lvl: s <= 1 ? 'ok' : s >= 8 ? 'bad' : 'warn'
      };
    },
    ref: 'Blatchford O, Murray WR, Blatchford M. A risk score to predict need for treatment for upper-gastrointestinal haemorrhage. Lancet. 2000;356(9238):1318–1321. — Gralnek IM, Stanley AJ, Morris AJ, et al. Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage (NVUGIH): ESGE Guideline – Update 2021. Endoscopy. 2021;53(3):300–332.',
    url: 'https://doi.org/10.1016/S0140-6736(00)02816-6',
    verif: '2026-10',
    pop: '1748 pacientes con hemorragia digestiva alta en Escocia (derivación y validación).',
    lim: 'No predice bien la mortalidad aislada. El original no incluye la edad. La urea se eleva por la digestión de sangre y por insuficiencia renal. Las guías ESGE 2021 consideran GBS ≤1 como muy bajo riesgo para manejo ambulatorio.',
    tests: [
      { v: { urea: 5, sexo: 'm', hb: 14, pas: 120, fc: 80 }, r: 0 },
      { v: { urea: 12, sexo: 'm', hb: 9, pas: 95, fc: 110, mel: true }, r: 14 },
      { v: { urea: 7, sexo: 'f', hb: 11, pas: 105, fc: 90, sinc: true }, r: 6 }
    ]
  },
  {
    id: 'rockall', m: 's', cat: 'gastro', tags: [],
    n: 'Score de Rockall (hemorragia digestiva alta)', sig: 'Rockall', syn: ['hda', 'hemorragia digestiva alta', 'resangrado', 'mortalidad'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de muerte y resangrado en la hemorragia digestiva alta; versión clínica (pre-endoscopia) y completa (con hallazgos endoscópicos).',
    ver: 'Rockall et al. 1996 (clínico 0–7; completo 0–11)',
    formula: 'Edad: <60: 0 · 60–79: 1 · ≥80: 2\nShock: sin shock (PAS ≥100 y FC <100) 0 · taquicardia (PAS ≥100 y FC ≥100) 1 · hipotensión (PAS <100) 2\nComorbilidad: ninguna 0 · insuficiencia cardíaca, cardiopatía isquémica u otra mayor 2 · insuficiencia renal, insuficiencia hepática o neoplasia diseminada 3\nDiagnóstico (solo completo): Mallory-Weiss o sin lesión ni estigmas 0 · otros diagnósticos 1 · neoplasia del tubo digestivo alto 2\nEstigmas de hemorragia reciente (solo completo): ninguno o mancha oscura 0 · sangre en tubo digestivo alto, coágulo adherido, vaso visible o sangrado activo 2',
    in: [
      { t: 'sel', id: 'modo', l: 'Versión', o: [['pre', 'Clínico (pre-endoscopia)'], ['comp', 'Completo (post-endoscopia)']] },
      nEdad(),
      { t: 'num', id: 'pas', l: 'Presión arterial sistólica', u: 'mmHg', min: 30, max: 300, step: 1 },
      { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 20, max: 250, step: 1 },
      { t: 'sel', id: 'com', l: 'Comorbilidad', o: [['0', 'Ninguna mayor', 0], ['2', 'Insuficiencia cardíaca, cardiopatía isquémica u otra comorbilidad mayor', 2], ['3', 'Insuficiencia renal, insuficiencia hepática o neoplasia diseminada', 3]] },
      { t: 'head', l: 'Solo para el score completo' },
      { t: 'sel', id: 'dx', l: 'Diagnóstico endoscópico', req: 0, o: [['0', 'Mallory-Weiss, o sin lesión y sin estigmas', 0], ['1', 'Todos los otros diagnósticos', 1], ['2', 'Neoplasia del tubo digestivo alto', 2]] },
      { t: 'sel', id: 'srh', l: 'Estigmas de hemorragia reciente', req: 0, o: [['0', 'Ninguno o solo mancha oscura', 0], ['2', 'Sangre en tubo digestivo alto, coágulo adherido, vaso visible o sangrado activo', 2]] }
    ],
    calc: v => {
      const e = v.edad < 60 ? 0 : v.edad < 80 ? 1 : 2;
      const sh = v.pas < 100 ? 2 : v.fc >= 100 ? 1 : 0;
      let s = e + sh + +v.com;
      if (v.modo == 'comp') {
        if (v.dx == null || v.srh == null) return null;
        s += +v.dx + +v.srh;
        return { r: s, u: 'puntos', d: 0, lab: 'Rockall completo', interp: s <= 2 ? 'Rockall completo ≤2: bajo riesgo de resangrado y muerte' : 'Rockall completo >2: no es de bajo riesgo', lvl: s <= 2 ? 'ok' : s >= 8 ? 'bad' : 'warn' };
      }
      return { r: s, u: 'puntos', d: 0, lab: 'Rockall clínico', interp: s == 0 ? 'Rockall clínico 0: bajo riesgo de mortalidad' : 'Rockall clínico >0: completar con la endoscopia', lvl: s == 0 ? 'ok' : s >= 4 ? 'bad' : 'warn' };
    },
    ref: 'Rockall TA, Logan RF, Devlin HB, Northfield TC. Risk assessment after acute upper gastrointestinal haemorrhage. Gut. 1996;38(3):316–321.',
    url: 'https://doi.org/10.1136/gut.38.3.316',
    verif: '2026-10',
    pop: '4185 pacientes con hemorragia digestiva alta en el Reino Unido (auditoría nacional 1993), validado en 1625.',
    lim: 'Diseñado para predecir mortalidad; predice peor la necesidad de intervención que el Glasgow-Blatchford. La versión clínica es menos precisa. Los estigmas dependen del momento y la interpretación de la endoscopia.',
    tests: [
      { v: { modo: 'pre', edad: 50, pas: 120, fc: 80, com: '0' }, r: 0 },
      { v: { modo: 'comp', edad: 85, pas: 90, fc: 110, com: '3', dx: '2', srh: '2' }, r: 11 },
      { v: { modo: 'comp', edad: 65, pas: 120, fc: 105, com: '0', dx: '1', srh: '0' }, r: 3 }
    ]
  },
  {
    id: 'oakland', m: 's', cat: 'gastro', tags: [],
    n: 'Score de Oakland (hemorragia digestiva baja)', sig: 'Oakland', syn: ['hdb', 'hemorragia digestiva baja', 'alta segura'],
    tipo: 'score pronóstico',
    fin: 'Identifica pacientes con hemorragia digestiva baja con baja probabilidad de evento adverso, candidatos a alta y seguimiento ambulatorio.',
    ver: 'Oakland et al. 2017',
    formula: 'Edad: <40: 0 · 40–69: 1 · ≥70: 2 · sexo masculino 1 · internación previa por HDB 1 · sangre en tacto rectal 1\nFC: <70: 0 · 70–89: 1 · 90–109: 2 · ≥110: 3\nPAS: 50–89: 5 · 90–119: 4 · 120–129: 3 · 130–159: 2 · ≥160: 0\nHb (g/dL): 3,6–6,9: 22 · 7,0–8,9: 17 · 9,0–10,9: 13 · 11,0–12,9: 8 · 13,0–15,9: 4 · ≥16,0: 0\nTotal 0–35; ≤8: probabilidad ≥95 % de alta segura.',
    in: [
      nEdad(),
      { t: 'sel', id: 'sexo', l: 'Sexo', o: [['f', 'Femenino', 0], ['m', 'Masculino', 1]] },
      { t: 'sel', id: 'prev', l: 'Internación previa por hemorragia digestiva baja', o: SN(1) },
      { t: 'sel', id: 'tr', l: 'Tacto rectal', o: [['no', 'Sin sangre', 0], ['si', 'Con sangre', 1]] },
      { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 20, max: 250, step: 1 },
      { t: 'num', id: 'pas', l: 'Presión arterial sistólica', u: 'mmHg', min: 50, max: 300, step: 1 },
      { t: 'num', id: 'hb', l: 'Hemoglobina', u: 'g/dL', min: 3.6, max: 25, step: 0.1, alt: [U.hb_gl] }
    ],
    calc: function (v) {
      const e = v.edad < 40 ? 0 : v.edad < 70 ? 1 : 2;
      const fc = v.fc < 70 ? 0 : v.fc < 90 ? 1 : v.fc < 110 ? 2 : 3;
      const p = v.pas < 90 ? 5 : v.pas < 120 ? 4 : v.pas < 130 ? 3 : v.pas < 160 ? 2 : 0;
      const h = v.hb < 7 ? 22 : v.hb < 9 ? 17 : v.hb < 11 ? 13 : v.hb < 13 ? 8 : v.hb < 16 ? 4 : 0;
      const s = e + fc + p + h + pts(v, this.in);
      return { r: s, u: 'puntos', d: 0, interp: s <= 8 ? 'Score ≤8: probabilidad ≥95 % de alta segura (sin evento adverso)' : 'Score >8: no cumple criterio de alta segura', lvl: s <= 8 ? 'ok' : 'warn' };
    },
    ref: 'Oakland K, Jairath V, Uberoi R, et al. Derivation and validation of a novel risk score for safe discharge after acute lower gastrointestinal bleeding: a modelling study. Lancet Gastroenterol Hepatol. 2017;2(9):635–643.',
    url: 'https://doi.org/10.1016/S2468-1253(17)30150-4',
    verif: '2026-10',
    pop: '2336 pacientes con hemorragia digestiva baja (auditoría del Reino Unido 2015), validado en 288.',
    lim: 'No aplicable si PAS <50 mmHg o Hb <3,6 g/dL (fuera de las bandas). No evalúa causa del sangrado. La guía BSG 2019 usa ≤8 para alta con estudio ambulatorio.',
    tests: [
      { v: { edad: 30, sexo: 'f', prev: 'no', tr: 'no', fc: 65, pas: 165, hb: 16 }, r: 0 },
      { v: { edad: 75, sexo: 'm', prev: 'si', tr: 'si', fc: 115, pas: 85, hb: 6 }, r: 35 },
      { v: { edad: 50, sexo: 'm', prev: 'no', tr: 'si', fc: 80, pas: 135, hb: 14 }, r: 10 }
    ]
  },
  {
    id: 'fib-4', m: 's', cat: 'gastro', tags: ['f:gastro'],
    n: 'FIB-4 (fibrosis hepática)', sig: 'FIB-4', syn: ['fibrosis', 'esteatosis', 'masld', 'higado graso', 'hepatitis c'],
    tipo: 'índice',
    fin: 'Estima no invasivamente la probabilidad de fibrosis hepática avanzada.',
    ver: 'Sterling 2006 (cortes 1,45/3,25 en HIV/HCV); cortes 1,30/2,67 en EHGNA/MASLD (Shah 2009) y 2,0 inferior en ≥65 años (McPherson 2017)',
    formula: 'FIB-4 = edad (años) × AST (U/L) / [plaquetas (10⁹/L) × √ALT (U/L)]\nMASLD: <1,30 (≥65 años: <2,0) bajo riesgo · 1,30–2,67 indeterminado · >2,67 alto riesgo de fibrosis avanzada.\nHCV/HIV: <1,45 baja probabilidad · 1,45–3,25 indeterminado · >3,25 alta probabilidad de fibrosis avanzada.',
    in: [
      nEdad(),
      { t: 'num', id: 'ast', l: 'AST (GOT)', u: 'U/L', min: 1, max: 20000, step: 1 },
      { t: 'num', id: 'alt', l: 'ALT (GPT)', u: 'U/L', min: 1, max: 20000, step: 1 },
      { t: 'num', id: 'plt', l: 'Plaquetas', u: '×10³/µL', min: 1, max: 2000, step: 1 },
      { t: 'sel', id: 'etio', l: 'Contexto', o: [['masld', 'Enfermedad hepática esteatósica (MASLD/EHGNA)'], ['hcv', 'Hepatitis C o coinfección HIV/HCV (cortes originales)']] }
    ],
    calc: v => {
      const x = v.edad * v.ast / (v.plt * Math.sqrt(v.alt));
      let lo, hi;
      if (v.etio == 'hcv') { lo = 1.45; hi = 3.25; } else { lo = v.edad >= 65 ? 2.0 : 1.30; hi = 2.67; }
      const it = x < lo ? ['Bajo riesgo de fibrosis avanzada (<' + f(lo, 2) + ')', 'ok'] : x > hi ? ['Alto riesgo de fibrosis avanzada (>' + f(hi, 2) + ')', 'bad'] : ['Zona indeterminada (' + f(lo, 2) + '–' + f(hi, 2) + '): requiere otra prueba (p. ej. elastografía)', 'warn'];
      return { r: rd(x, 2), d: 2, interp: it[0], lvl: it[1], note: v.edad < 35 ? 'Menor confiabilidad en <35 años.' : undefined };
    },
    ref: 'Sterling RK, Lissen E, Clumeck N, et al. Development of a simple noninvasive index to predict significant fibrosis in patients with HIV/HCV coinfection. Hepatology. 2006;43(6):1317–1325. — Shah AG, Lydecker A, Murray K, et al. Comparison of noninvasive markers of fibrosis in patients with nonalcoholic fatty liver disease. Clin Gastroenterol Hepatol. 2009;7(10):1104–1112. — McPherson S, Hardy T, Dufour JF, et al. Age as a confounding factor for the accurate non-invasive diagnosis of advanced NAFLD fibrosis. Am J Gastroenterol. 2017;112(5):740–751.',
    url: 'https://doi.org/10.1002/hep.21178',
    verif: '2026-10',
    pop: 'Derivación: 832 pacientes coinfectados HIV/HCV (APRICOT). Validación posterior en HCV y EHGNA.',
    lim: 'Pierde precisión en <35 años y en ancianos; no válido en hepatitis aguda, elevación de transaminasas de causa no hepática ni trombocitopenia de otra causa. No sirve para seguimiento de respuesta al tratamiento.',
    tests: [
      { v: { edad: 50, ast: 40, alt: 25, plt: 200, etio: 'masld' }, r: 2.0 },
      { v: { edad: 60, ast: 100, alt: 64, plt: 100, etio: 'hcv' }, r: 7.5 },
      { v: { edad: 70, ast: 30, alt: 36, plt: 220, etio: 'masld' }, r: 'Bajo riesgo' }
    ]
  },
  {
    id: 'maddrey', m: 's', cat: 'gastro', tags: [],
    n: 'Función discriminante de Maddrey (hepatitis alcohólica)', sig: 'mDF', syn: ['hepatitis alcoholica', 'maddrey', 'funcion discriminante'],
    tipo: 'score pronóstico',
    fin: 'Identifica hepatitis alcohólica grave con alta mortalidad a corto plazo.',
    ver: 'Función discriminante modificada (Carithers 1989, coeficiente 4,6)',
    formula: 'mDF = 4,6 × (TP del paciente − TP control) [segundos] + bilirrubina total (mg/dL)\n≥32: hepatitis alcohólica grave.',
    in: [
      { t: 'num', id: 'tp', l: 'Tiempo de protrombina del paciente', u: 's', min: 5, max: 200, step: 0.1 },
      { t: 'num', id: 'tpc', l: 'Tiempo de protrombina control', u: 's', min: 5, max: 30, step: 0.1 },
      nBili()
    ],
    calc: v => {
      const x = 4.6 * (v.tp - v.tpc) + v.bili;
      return { r: rd(x, 1), d: 1, interp: x >= 32 ? 'Hepatitis alcohólica grave (mDF ≥32)' : 'mDF <32: no grave', lvl: x >= 32 ? 'bad' : 'ok' };
    },
    ref: 'Maddrey WC, Boitnott JK, Bedine MS, Weber FL Jr, Mezey E, White RI Jr. Corticosteroid therapy of alcoholic hepatitis. Gastroenterology. 1978;75(2):193–199. — Carithers RL Jr, Herlong HF, Diehl AM, et al. Methylprednisolone therapy in patients with severe alcoholic hepatitis: a randomized multicenter trial. Ann Intern Med. 1989;110(9):685–690.',
    url: 'https://doi.org/10.7326/0003-4819-110-9-685',
    verif: '2026-10',
    pop: 'Pacientes con hepatitis alcohólica en ensayos de corticoides.',
    lim: 'Depende del TP control y de la tromboplastina del laboratorio (variabilidad entre centros). Bilirrubina en mg/dL. No válido con anticoagulación. MELD y la escala de Glasgow para hepatitis alcohólica son alternativas.',
    tests: [
      { v: { tp: 20, tpc: 12, bili: 10 }, r: 46.8 },
      { v: { tp: 13, tpc: 12, bili: 3 }, r: 7.6 }
    ]
  },
  {
    id: 'lille', m: 's', cat: 'gastro', tags: [],
    n: 'Modelo de Lille (respuesta a corticoides en hepatitis alcohólica)', sig: 'Lille', syn: ['hepatitis alcoholica', 'corticoides', 'lille'],
    tipo: 'score pronóstico',
    fin: 'Evalúa al día 7 la respuesta a corticoides en hepatitis alcohólica grave; un valor alto indica no respuesta y mayor mortalidad a 6 meses.',
    ver: 'Louvet et al. 2007',
    formula: 'R = 3,19 − 0,101 × edad (años) + 0,147 × albúmina día 0 (g/L) + 0,0165 × [bilirrubina día 0 − bilirrubina día 7] (µmol/L) − 0,206 × insuficiencia renal (Cr >1,3 mg/dL = 1) − 0,0065 × bilirrubina día 0 (µmol/L) − 0,0096 × TP (s)\nLille = e^(−R) / (1 + e^(−R))\n≥0,45: no respondedor.',
    in: [
      nEdad(),
      nAlb('alb', 'Albúmina (día 0)'),
      nBili('b0', 'Bilirrubina total (día 0)'),
      nBili('b7', 'Bilirrubina total (día 7)'),
      nCr('cr', 'Creatinina (día 0)'),
      { t: 'num', id: 'tp', l: 'Tiempo de protrombina (día 0)', u: 's', min: 5, max: 200, step: 0.1 }
    ],
    calc: v => {
      const alb = v.alb * 10, b0 = v.b0 * 17.1, b7 = v.b7 * 17.1, ir = v.cr > 1.3 ? 1 : 0;
      const R = 3.19 - 0.101 * v.edad + 0.147 * alb + 0.0165 * (b0 - b7) - 0.206 * ir - 0.0065 * b0 - 0.0096 * v.tp;
      const L = Math.exp(-R) / (1 + Math.exp(-R));
      return { r: rd(L, 3), d: 3, interp: L >= 0.45 ? 'No respondedor (≥0,45): mayor mortalidad a 6 meses' : 'Respondedor (<0,45)', lvl: L >= 0.45 ? 'bad' : 'ok' };
    },
    ref: 'Louvet A, Naveau S, Abdelnour M, et al. The Lille model: a new tool for therapeutic strategy in patients with severe alcoholic hepatitis treated with steroids. Hepatology. 2007;45(6):1348–1354.',
    url: 'https://doi.org/10.1002/hep.21607',
    verif: '2026-10',
    pop: '295 pacientes con hepatitis alcohólica grave (mDF ≥32) tratados con prednisolona en Francia (derivación) y 118 (validación).',
    lim: 'Solo para pacientes que recibieron corticoides; se calcula al día 7 (también validado al día 4). Unidades originales: albúmina en g/L y bilirrubina en µmol/L (acá se convierten). El TP depende del laboratorio.',
    tests: [
      // edad 50, alb 2,5 g/dL (25 g/L), bili0 15 mg/dL (256,5), bili7 10 (171), Cr 1,0, TP 20:
      // R = 3,19 − 5,05 + 3,675 + 1,41075 − 0 − 1,66725 − 0,192 = 1,3665 → Lille 0,2031
      { v: { edad: 50, alb: 2.5, b0: 15, b7: 10, cr: 1.0, tp: 20 }, r: 0.203, tol: 0.002 },
      // edad 60, alb 2,8 (28), bili0 20 (342), bili7 22 (376,2), Cr 1,8, TP 25:
      // R = 3,19 − 6,06 + 4,116 − 0,5643 − 0,206 − 2,223 − 0,24 = −1,9873 → Lille 0,8795
      { v: { edad: 60, alb: 2.8, b0: 20, b7: 22, cr: 1.8, tp: 25 }, r: 0.879, tol: 0.002 }
    ]
  },

  // ════════════════════════════ HEMATOLOGÍA ════════════════════════════
  {
    id: '4ts', m: 's', cat: 'hematologia', tags: ['s:infectologia'],
    n: '4Ts (trombocitopenia inducida por heparina)', sig: '4Ts', syn: ['tih', 'hit', 'trombocitopenia por heparina'],
    tipo: 'regla de decisión',
    fin: 'Estima la probabilidad pretest de trombocitopenia inducida por heparina.',
    ver: 'Lo et al. 2006',
    formula: 'Cuatro ítems de 0–2 puntos (trombocitopenia, timing, trombosis, otras causas). Total 0–8: 0–3 baja · 4–5 intermedia · 6–8 alta probabilidad.',
    in: [
      { t: 'sel', id: 'trombo', l: 'Trombocitopenia', o: [[2, 'Caída >50 % y nadir ≥20 ×10³/µL', 2], [1, 'Caída 30–50 % o nadir 10–19 ×10³/µL', 1], [0, 'Caída <30 % o nadir <10 ×10³/µL', 0]] },
      { t: 'sel', id: 'timing', l: 'Momento de la caída', o: [[2, 'Inicio claro entre los días 5–10, o ≤1 día con exposición a heparina en los 30 días previos', 2], [1, 'Compatible con días 5–10 pero no claro (faltan recuentos), inicio después del día 10, o ≤1 día con exposición en los 30–100 días previos', 1], [0, 'Caída <4 días sin exposición reciente a heparina', 0]] },
      { t: 'sel', id: 'tromb', l: 'Trombosis u otras secuelas', o: [[2, 'Trombosis nueva confirmada, necrosis cutánea, o reacción sistémica aguda tras bolo de HNF', 2], [1, 'Trombosis progresiva o recurrente, lesiones cutáneas no necrotizantes, o sospecha de trombosis no confirmada', 1], [0, 'Ninguna', 0]] },
      { t: 'sel', id: 'otras', l: 'Otras causas de trombocitopenia', o: [[2, 'Ninguna aparente', 2], [1, 'Posibles', 1], [0, 'Definidas', 0]] }
    ],
    calc: function (v) {
      const s = pts(v, this.in);
      return { r: s, u: 'puntos', d: 0, ...band(s, [[0, 3, 'Baja probabilidad de TIH', 'ok'], [4, 5, 'Probabilidad intermedia de TIH', 'warn'], [6, 8, 'Alta probabilidad de TIH', 'bad']]) };
    },
    ref: 'Lo GK, Juhl D, Warkentin TE, Sigouin CS, Eichler P, Greinacher A. Evaluation of pretest clinical score (4 T\'s) for the diagnosis of heparin-induced thrombocytopenia in two clinical settings. J Thromb Haemost. 2006;4(4):759–765.',
    url: 'https://doi.org/10.1111/j.1538-7836.2006.01787.x',
    verif: '2026-10',
    pop: 'Pacientes con sospecha de TIH en Hamilton (Canadá) y Greifswald (Alemania).',
    lim: 'Alto valor predictivo negativo con score bajo; un score intermedio o alto requiere confirmación de laboratorio (anti-PF4 y prueba funcional). La concordancia entre observadores es variable, sobre todo en UTI.',
    tests: [
      { v: { trombo: 2, timing: 2, tromb: 2, otras: 2 }, r: 8 },
      { v: { trombo: 1, timing: 0, tromb: 0, otras: 1 }, r: 2 },
      { v: { trombo: 2, timing: 1, tromb: 0, otras: 1 }, r: 'intermedia' }
    ]
  },
  {
    id: 'plasmic', m: 's', cat: 'hematologia', tags: ['s:nefrologia'],
    n: 'PLASMIC Score (púrpura trombótica trombocitopénica)', sig: 'PLASMIC', syn: ['ptt', 'adamts13', 'microangiopatia trombotica', 'mat'],
    tipo: 'regla de decisión',
    fin: 'Estima la probabilidad de deficiencia grave de ADAMTS13 (PTT) en pacientes con microangiopatía trombótica.',
    ver: 'Bendapudi et al. 2017',
    formula: '1 punto cada uno (0–7): plaquetas <30 ×10³/µL · hemólisis (reticulocitos >2,5 %, haptoglobina indetectable o bilirrubina indirecta >2 mg/dL) · sin cáncer activo · sin trasplante de órgano sólido ni de células progenitoras · VCM <90 fL · RIN <1,5 · creatinina <2,0 mg/dL.\n0–4 bajo · 5 intermedio · 6–7 alto riesgo.',
    in: [
      { t: 'num', id: 'plt', l: 'Plaquetas', u: '×10³/µL', min: 0, max: 2000, step: 1 },
      { t: 'sel', id: 'hem', l: 'Hemólisis (reticulocitos >2,5 %, haptoglobina indetectable o bilirrubina indirecta >2 mg/dL)', o: SN(1) },
      { t: 'sel', id: 'can', l: 'Cáncer activo (tratado en el último año)', o: [['no', 'No', 1], ['si', 'Sí', 0]] },
      { t: 'sel', id: 'tx', l: 'Antecedente de trasplante de órgano sólido o de células progenitoras', o: [['no', 'No', 1], ['si', 'Sí', 0]] },
      { t: 'num', id: 'vcm', l: 'VCM', u: 'fL', min: 40, max: 150, step: 0.1 },
      { t: 'num', id: 'inr', l: 'RIN (INR)', u: '', min: 0.5, max: 15, step: 0.01 },
      nCr()
    ],
    calc: function (v) {
      const s = pts(v, this.in) + (v.plt < 30 ? 1 : 0) + (v.vcm < 90 ? 1 : 0) + (v.inr < 1.5 ? 1 : 0) + (v.cr < 2 ? 1 : 0);
      return { r: s, u: 'puntos', d: 0, ...band(s, [[0, 4, 'Riesgo bajo de deficiencia grave de ADAMTS13', 'ok'], [5, 5, 'Riesgo intermedio', 'warn'], [6, 7, 'Riesgo alto de deficiencia grave de ADAMTS13 (PTT)', 'bad']]) };
    },
    ref: 'Bendapudi PK, Hurwitz S, Fry A, et al. Derivation and external validation of the PLASMIC score for rapid assessment of adults with thrombotic microangiopathies: a cohort study. Lancet Haematol. 2017;4(4):e157–e164.',
    url: 'https://doi.org/10.1016/S2352-3026(17)30026-1',
    verif: '2026-10',
    pop: 'Adultos con microangiopatía trombótica (esquistocitos y trombocitopenia) en Boston, con validación externa.',
    lim: 'No reemplaza la medición de ADAMTS13. Menor rendimiento en ancianos y en series con alta prevalencia de causas secundarias. Definición de cáncer activo: tratado en el último año.',
    tests: [
      { v: { plt: 15, hem: 'si', can: 'no', tx: 'no', vcm: 85, inr: 1.1, cr: 1.2 }, r: 7 },
      { v: { plt: 60, hem: 'si', can: 'si', tx: 'no', vcm: 95, inr: 1.8, cr: 3 }, r: 2 },
      { v: { plt: 20, hem: 'si', can: 'no', tx: 'no', vcm: 92, inr: 1.6, cr: 1.0 }, r: 'intermedio' }
    ]
  },
  {
    id: 'isth-cid', m: 's', cat: 'hematologia', tags: ['s:uti'],
    n: 'ISTH: coagulación intravascular diseminada manifiesta', sig: 'ISTH CID', syn: ['cid', 'dic', 'coagulacion intravascular diseminada'],
    tipo: 'criterio diagnóstico',
    fin: 'Puntúa la probabilidad de CID manifiesta en pacientes con una enfermedad de base asociada a CID.',
    ver: 'ISTH/SSC 2001 (Taylor et al.), CID manifiesta',
    formula: 'Requisito: enfermedad de base asociada a CID.\nPlaquetas: ≥100 ×10³/µL 0 · 50–<100 1 · <50 2\nMarcador de fibrina (dímero D/PDF): sin aumento 0 · aumento moderado 2 · aumento marcado 3\nProlongación del TP: <3 s 0 · 3–6 s 1 · >6 s 2\nFibrinógeno: ≥1,0 g/L 0 · <1,0 g/L 1\n≥5: compatible con CID manifiesta (repetir a diario) · <5: sugestivo de CID no manifiesta (repetir en 1–2 días).',
    in: [
      { t: 'sel', id: 'base', l: '¿Tiene una enfermedad de base asociada a CID?', o: [['si', 'Sí'], ['no', 'No']] },
      { t: 'num', id: 'plt', l: 'Plaquetas', u: '×10³/µL', min: 0, max: 2000, step: 1 },
      { t: 'sel', id: 'dd', l: 'Marcador de fibrina (dímero D o PDF) según el valor de corte del ensayo local', o: [[0, 'Sin aumento', 0], [2, 'Aumento moderado', 2], [3, 'Aumento marcado', 3]] },
      { t: 'num', id: 'tp', l: 'Prolongación del TP sobre el control', u: 's', min: -10, max: 200, step: 0.1 },
      { t: 'num', id: 'fib', l: 'Fibrinógeno', u: 'g/L', min: 0, max: 15, step: 0.01, alt: [FIB_MG] }
    ],
    calc: function (v) {
      if (v.base == 'no') return { r: 'No aplica', interp: 'El algoritmo ISTH solo se usa con una enfermedad de base asociada a CID', lvl: '' };
      const s = (v.plt < 50 ? 2 : v.plt < 100 ? 1 : 0) + +v.dd + (v.tp > 6 ? 2 : v.tp >= 3 ? 1 : 0) + (v.fib < 1 ? 1 : 0);
      return {
        r: s, u: 'puntos', d: 0,
        interp: s >= 5 ? 'Compatible con CID manifiesta (repetir el score a diario)' : 'Sugestivo (no confirmatorio) de CID no manifiesta: repetir en 1–2 días',
        lvl: s >= 5 ? 'bad' : 'warn'
      };
    },
    ref: 'Taylor FB Jr, Toh CH, Hoots WK, Wada H, Levi M; Scientific Subcommittee on Disseminated Intravascular Coagulation (DIC) of the International Society on Thrombosis and Haemostasis (ISTH). Towards definition, clinical and laboratory criteria, and a scoring system for disseminated intravascular coagulation. Thromb Haemost. 2001;86(5):1327–1330.',
    url: 'https://doi.org/10.1055/s-0037-1616068',
    verif: '2026-10',
    pop: 'Definición de consenso ISTH; validada luego en pacientes críticos (Bakhtiari 2004) y sepsis.',
    lim: 'Las categorías del dímero D («moderado» y «marcado») dependen del ensayo y de los cortes que defina cada laboratorio; el usuario elige la categoría. El TP se expresa como prolongación en segundos sobre el control. El fibrinógeno es reactante de fase aguda y puede ser normal en CID. No aplicable sin enfermedad de base.',
    tests: [
      { v: { base: 'si', plt: 40, dd: 3, tp: 7, fib: 0.8 }, r: 8 },
      { v: { base: 'si', plt: 120, dd: 2, tp: 2, fib: 2.5 }, r: 2 },
      { v: { base: 'no', plt: 40, dd: 3, tp: 7, fib: 0.8 }, r: 'No aplica' }
    ]
  },
  {
    id: 'hscore', m: 's', cat: 'hematologia', tags: ['s:reuma', 's:uti'],
    n: 'HScore (síndrome hemofagocítico reactivo)', sig: 'HScore', syn: ['hlh', 'linfohistiocitosis hemofagocitica', 'sindrome hemofagocitico', 'sam', 'activacion macrofagica'],
    tipo: 'score pronóstico',
    fin: 'Estima la probabilidad de síndrome hemofagocítico reactivo en adultos.',
    ver: 'Fardet et al. 2014',
    formula: 'Inmunosupresión conocida (HIV o tratamiento prolongado con corticoides, ciclosporina o azatioprina) 18\nTemperatura: <38,4: 0 · 38,4–39,4: 33 · >39,4 °C: 49\nOrganomegalia: hepatomegalia o esplenomegalia 23 · ambas 38\nCitopenias (Hb ≤9,2 g/dL, leucocitos ≤5,0 ×10³/µL, plaquetas ≤110 ×10³/µL): 1 línea 0 · 2 líneas 24 · 3 líneas 34\nFerritina (ng/mL): <2000: 0 · 2000–6000: 35 · >6000: 50\nTriglicéridos (mmol/L): <1,5: 0 · 1,5–4: 44 · >4: 64\nFibrinógeno ≤2,5 g/L: 30 · AST ≥30 U/L: 19 · hemofagocitosis en médula ósea: 35\nProbabilidad: modelo logístico del trabajo original; se muestra la Tabla 5 (169 puntos ≈ corte óptimo).',
    in: [
      { t: 'sel', id: 'inm', l: 'Inmunosupresión conocida (HIV, corticoides prolongados, ciclosporina, azatioprina)', o: SN(18) },
      { t: 'num', id: 'temp', l: 'Temperatura máxima', u: '°C', min: 30, max: 45, step: 0.1, alt: [U.f_temp] },
      { t: 'sel', id: 'org', l: 'Organomegalia', o: [['no', 'No', 0], ['una', 'Hepatomegalia o esplenomegalia', 23], ['ambas', 'Hepatomegalia y esplenomegalia', 38]] },
      { t: 'num', id: 'hb', l: 'Hemoglobina', u: 'g/dL', min: 1, max: 25, step: 0.1, alt: [U.hb_gl] },
      { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 500, step: 0.1 },
      { t: 'num', id: 'plt', l: 'Plaquetas', u: '×10³/µL', min: 0, max: 2000, step: 1 },
      { t: 'num', id: 'ferr', l: 'Ferritina', u: 'ng/mL', min: 0, max: 500000, step: 1 },
      { t: 'num', id: 'tg', l: 'Triglicéridos (en ayunas)', u: 'mmol/L', min: 0.1, max: 100, step: 0.01, alt: [TG_MG] },
      { t: 'num', id: 'fib', l: 'Fibrinógeno', u: 'g/L', min: 0, max: 15, step: 0.01, alt: [FIB_MG] },
      { t: 'num', id: 'ast', l: 'AST (GOT)', u: 'U/L', min: 0, max: 50000, step: 1 },
      { t: 'sel', id: 'mo', l: 'Hemofagocitosis en aspirado de médula ósea', o: [['no', 'No (o no realizado)', 0], ['si', 'Sí', 35]] }
    ],
    calc: function (v) {
      const nc = (v.hb <= 9.2) + (v.gb <= 5) + (v.plt <= 110);
      const s = pts(v, this.in) + (v.temp > 39.4 ? 49 : v.temp >= 38.4 ? 33 : 0) + (nc == 3 ? 34 : nc == 2 ? 24 : 0)
        + (v.ferr > 6000 ? 50 : v.ferr >= 2000 ? 35 : 0) + (v.tg > 4 ? 64 : v.tg >= 1.5 ? 44 : 0) + (v.fib <= 2.5 ? 30 : 0) + (v.ast >= 30 ? 19 : 0);
      let p;
      if (s < 90) p = '<1 %';
      else if (s >= 250) p = '>99 %';
      else {
        const i = HS_T5.findIndex(([x]) => x > s) - 1, a = HS_T5[i], b = HS_T5[i + 1];
        p = a[0] == s ? a[1] + ' %' : 'entre ' + a[1] + ' % (' + a[0] + ' pts) y ' + b[1] + ' % (' + b[0] + ' pts)';
      }
      return {
        r: s, u: 'puntos', d: 0,
        interp: s >= 169 ? 'HScore ≥169: alta probabilidad de síndrome hemofagocítico (corte óptimo)' : 'HScore <169: por debajo del corte óptimo',
        lvl: s >= 169 ? 'bad' : s >= 130 ? 'warn' : 'ok',
        more: [['Probabilidad (Tabla 5, Fardet 2014)', p], ['Citopenias', nc + ' línea(s)']]
      };
    },
    ref: 'Fardet L, Galicier L, Lambotte O, et al. Development and validation of the HScore, a score for the diagnosis of reactive hemophagocytic syndrome. Arthritis Rheumatol. 2014;66(9):2613–2620.',
    url: 'https://doi.org/10.1002/art.38690',
    verif: '2026-10',
    pop: '312 adultos con sospecha de síndrome hemofagocítico reactivo en Francia (derivación) y validación interna.',
    lim: 'El trabajo original no publica los coeficientes del modelo logístico; la probabilidad se informa por los valores tabulados (Tabla 5). Corte óptimo 169 (sensibilidad 93 %, especificidad 86 %). Si no se hizo el aspirado de médula, se puntúa 0 en ese ítem. No validado en niños.',
    tests: [
      // inm 18 + temp 39,6 → 49 + ambas 38 + 3 citopenias 34 + ferr 8000 → 50 + TG 4,5 → 64 + fib 1,5 → 30 + AST 100 → 19 + MO 35 = 337
      { v: { inm: 'si', temp: 39.6, org: 'ambas', hb: 8, gb: 2, plt: 50, ferr: 8000, tg: 4.5, fib: 1.5, ast: 100, mo: 'si' }, r: 337 },
      // temp 38,5 → 33 + una 23 + 2 citopenias 24 + ferr 3000 → 35 + TG 2 → 44 + fib 3 → 0 + AST 40 → 19 = 178
      { v: { inm: 'no', temp: 38.5, org: 'una', hb: 9, gb: 4, plt: 150, ferr: 3000, tg: 2, fib: 3, ast: 40, mo: 'no' }, r: 178 },
      { v: { inm: 'no', temp: 37, org: 'no', hb: 13, gb: 7, plt: 250, ferr: 500, tg: 1, fib: 4, ast: 20, mo: 'no' }, r: 0 }
    ]
  },
  {
    id: 'padua', m: 's', cat: 'hematologia', tags: ['s:uti'],
    n: 'Padua Prediction Score (TEV en pacientes clínicos)', sig: 'Padua', syn: ['tev', 'tromboprofilaxis', 'tvp', 'padua'],
    tipo: 'score pronóstico',
    fin: 'Identifica pacientes clínicos internados con alto riesgo de tromboembolismo venoso.',
    ver: 'Barbar et al. 2010',
    formula: 'Cáncer activo 3 · TEV previo (excluida trombosis superficial) 3 · movilidad reducida (≥3 días) 3 · trombofilia conocida 3 · trauma o cirugía reciente (≤1 mes) 2 · edad ≥70 años 1 · insuficiencia cardíaca y/o respiratoria 1 · IAM o ACV isquémico agudo 1 · infección aguda y/o enfermedad reumatológica 1 · obesidad (IMC ≥30) 1 · tratamiento hormonal en curso 1.\n≥4: alto riesgo de TEV.',
    in: [
      { t: 'chk', id: 'can', l: 'Cáncer activo (metástasis locales o a distancia y/o quimio o radioterapia en los últimos 6 meses)', pts: 3 },
      { t: 'chk', id: 'tev', l: 'TEV previo (excluida trombosis venosa superficial)', pts: 3 },
      { t: 'chk', id: 'mov', l: 'Movilidad reducida: reposo en cama (con uso del baño) por ≥3 días', pts: 3 },
      { t: 'chk', id: 'tromb', l: 'Trombofilia conocida (déficit de antitrombina, proteína C o S, factor V Leiden, protrombina G20210A, síndrome antifosfolípido)', pts: 3 },
      { t: 'chk', id: 'cx', l: 'Trauma y/o cirugía reciente (≤1 mes)', pts: 2 },
      { t: 'chk', id: 'edad', l: 'Edad ≥70 años', pts: 1 },
      { t: 'chk', id: 'ic', l: 'Insuficiencia cardíaca y/o respiratoria', pts: 1 },
      { t: 'chk', id: 'iam', l: 'IAM o ACV isquémico agudo', pts: 1 },
      { t: 'chk', id: 'inf', l: 'Infección aguda y/o enfermedad reumatológica', pts: 1 },
      { t: 'chk', id: 'ob', l: 'Obesidad (IMC ≥30 kg/m²)', pts: 1 },
      { t: 'chk', id: 'horm', l: 'Tratamiento hormonal en curso', pts: 1 }
    ],
    calc: function (v) {
      const s = pts(v, this.in);
      return { r: s, u: 'puntos', d: 0, interp: s >= 4 ? 'Alto riesgo de TEV (≥4)' : 'Bajo riesgo de TEV (<4)', lvl: s >= 4 ? 'bad' : 'ok', more: [['TEV sintomático a 90 días sin profilaxis (cohorte original)', s >= 4 ? '11 % en alto riesgo' : '0,3 % en bajo riesgo']] };
    },
    ref: 'Barbar S, Noventa F, Rossetto V, et al. A risk assessment model for the identification of hospitalized medical patients at risk for venous thromboembolism: the Padua Prediction Score. J Thromb Haemost. 2010;8(11):2450–2457.',
    url: 'https://doi.org/10.1111/j.1538-7836.2010.04044.x',
    verif: '2026-10',
    pop: '1180 pacientes clínicos internados en Padua (Italia).',
    lim: 'Cohorte única de un centro; validación externa con resultados variables. No aplica a pacientes quirúrgicos (usar Caprini). No evalúa riesgo de sangrado (ver IMPROVE Bleeding).',
    tests: [
      { v: { can: true, mov: true, edad: true }, r: 7 },
      { v: { inf: true, ob: true }, r: 2 },
      { v: { tev: true, edad: true }, r: 'Alto riesgo' }
    ]
  },
  {
    id: 'improve-tev', m: 's', cat: 'hematologia', tags: ['s:uti'],
    n: 'IMPROVE: riesgo de TEV (7 factores)', sig: 'IMPROVE VTE', syn: ['tev', 'tromboprofilaxis', 'improve'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de tromboembolismo venoso a 3 meses en pacientes clínicos internados.',
    ver: 'Modelo asociativo de 7 factores (Spyropoulos et al. 2011)',
    formula: 'TEV previo 3 · trombofilia conocida 2 · parálisis actual de miembros inferiores 2 · cáncer actual 2 · inmovilización ≥7 días 1 · internación en UTI/unidad coronaria 1 · edad >60 años 1.\nTotal 0–12. Riesgo de TEV a 3 meses (cohorte IMPROVE): 0: 0,4 % · 1: 0,6 % · 2: 1,0 % · 3: 1,7 % · 4: 2,9 % · ≥5: 7,2 %.',
    in: [
      { t: 'chk', id: 'tev', l: 'TEV previo', pts: 3 },
      { t: 'chk', id: 'tromb', l: 'Trombofilia conocida', pts: 2 },
      { t: 'chk', id: 'par', l: 'Parálisis actual de miembros inferiores', pts: 2 },
      { t: 'chk', id: 'can', l: 'Cáncer actual', pts: 2 },
      { t: 'chk', id: 'inm', l: 'Inmovilización ≥7 días (inmediatamente antes y durante la internación)', pts: 1 },
      { t: 'chk', id: 'uti', l: 'Internación en UTI o unidad coronaria', pts: 1 },
      { t: 'chk', id: 'edad', l: 'Edad >60 años', pts: 1 }
    ],
    calc: function (v) {
      const s = pts(v, this.in);
      const R = ['0,4', '0,6', '1,0', '1,7', '2,9'][s] || '7,2';
      return { r: s, u: 'puntos', d: 0, interp: 'Riesgo de TEV a 3 meses ≈ ' + R + ' % (cohorte de derivación)', lvl: s >= 4 ? 'bad' : s >= 2 ? 'warn' : 'ok', note: 'En validaciones externas se usa ≥2 como umbral de riesgo aumentado.' };
    },
    ref: 'Spyropoulos AC, Anderson FA Jr, FitzGerald G, et al.; IMPROVE Investigators. Predictive and associative models to identify hospitalized medical patients at risk for VTE. Chest. 2011;140(3):706–714.',
    url: 'https://doi.org/10.1378/chest.10-1944',
    verif: '2026-10',
    pop: '15 156 pacientes clínicos internados del registro internacional IMPROVE (52 hospitales, 12 países).',
    lim: 'Registro observacional; parte de los pacientes recibió profilaxis. La versión IMPROVEDD agrega el dímero D (≥2 × LSN, 2 puntos). No evalúa riesgo de sangrado.',
    tests: [
      { v: { tev: true, can: true, edad: true }, r: 6 },
      { v: { edad: true }, r: 1 },
      { v: { uti: true, edad: true }, r: '1,0 %' }
    ]
  },
  {
    id: 'improve-sangrado', m: 's', cat: 'hematologia', tags: ['s:uti'],
    n: 'IMPROVE: riesgo de sangrado', sig: 'IMPROVE Bleeding', syn: ['sangrado', 'hemorragia', 'tromboprofilaxis', 'improve'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de sangrado mayor o clínicamente relevante en los 14 días posteriores al ingreso en pacientes clínicos internados.',
    ver: 'Decousus et al. 2011',
    formula: 'Úlcera gastroduodenal activa 4,5 · sangrado en los 3 meses previos 4 · plaquetas <50 ×10³/µL 4 · edad ≥85 años 3,5 (40–84: 1,5) · insuficiencia hepática (RIN >1,5) 2,5 · insuficiencia renal grave (TFG <30) 2,5 (moderada 30–59: 1) · internación en UTI/unidad coronaria 2,5 · catéter venoso central 2 · enfermedad reumática 2 · cáncer actual 2 · sexo masculino 1.\n≥7: riesgo de sangrado aumentado.',
    in: [
      nEdad(),
      { t: 'sel', id: 'sexo', l: 'Sexo', o: [['f', 'Femenino', 0], ['m', 'Masculino', 1]] },
      { t: 'num', id: 'tfg', l: 'TFG', u: 'mL/min/1,73 m²', min: 0, max: 200, step: 1 },
      { t: 'num', id: 'plt', l: 'Plaquetas', u: '×10³/µL', min: 0, max: 2000, step: 1 },
      { t: 'chk', id: 'ulc', l: 'Úlcera gastroduodenal activa', pts: 4.5 },
      { t: 'chk', id: 'sang', l: 'Sangrado en los 3 meses previos al ingreso', pts: 4 },
      { t: 'chk', id: 'hep', l: 'Insuficiencia hepática (RIN >1,5)', pts: 2.5 },
      { t: 'chk', id: 'uti', l: 'Internación en UTI o unidad coronaria', pts: 2.5 },
      { t: 'chk', id: 'cvc', l: 'Catéter venoso central', pts: 2 },
      { t: 'chk', id: 'reu', l: 'Enfermedad reumática', pts: 2 },
      { t: 'chk', id: 'can', l: 'Cáncer actual', pts: 2 }
    ],
    calc: function (v) {
      const s = pts(v, this.in) + (v.edad >= 85 ? 3.5 : v.edad >= 40 ? 1.5 : 0) + (v.tfg < 30 ? 2.5 : v.tfg < 60 ? 1 : 0) + (v.plt < 50 ? 4 : 0);
      return { r: s, u: 'puntos', d: 1, interp: s >= 7 ? 'Riesgo de sangrado aumentado (≥7)' : 'Sin riesgo de sangrado aumentado (<7)', lvl: s >= 7 ? 'bad' : 'ok' };
    },
    ref: 'Decousus H, Tapson VF, Bergmann JF, et al.; IMPROVE Investigators. Factors at admission associated with bleeding risk in medical patients: findings from the IMPROVE investigators. Chest. 2011;139(1):69–79.',
    url: 'https://doi.org/10.1378/chest.09-3081',
    verif: '2026-10',
    pop: '10 866 pacientes clínicos internados del registro IMPROVE.',
    lim: 'Validación externa con discriminación moderada. Diseñado para pacientes clínicos, no quirúrgicos. Un score ≥7 no contraindica por sí solo la profilaxis: se integra con el riesgo trombótico.',
    tests: [
      { v: { edad: 50, sexo: 'm', tfg: 90, plt: 200 }, r: 2.5 },
      { v: { edad: 88, sexo: 'f', tfg: 25, plt: 40, ulc: true }, r: 14.5 },
      { v: { edad: 70, sexo: 'm', tfg: 45, plt: 150, uti: true, cvc: true }, r: 8 }
    ]
  },

  // ════════════════════════════ ENDOCRINOLOGÍA ════════════════════════════
  {
    id: 'findrisc', m: 's', cat: 'endocrino', tags: [],
    n: 'FINDRISC (riesgo de diabetes tipo 2)', sig: 'FINDRISC', syn: ['diabetes', 'riesgo de diabetes', 'finnish diabetes risk score'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de desarrollar diabetes tipo 2 en los próximos 10 años.',
    ver: 'Lindström y Tuomilehto 2003 (versión de 8 ítems con antecedente familiar ampliado)',
    formula: 'Edad: <45: 0 · 45–54: 2 · 55–64: 3 · >64: 4\nIMC: <25: 0 · 25–30: 1 · >30: 3\nCintura varones: <94: 0 · 94–102: 3 · >102 cm: 4 · mujeres: <80: 0 · 80–88: 3 · >88 cm: 4\nActividad física ≥30 min/día: no 2 · frutas/verduras a diario: no 1 · antihipertensivos: sí 2 · glucemia elevada previa: sí 5\nAntecedente familiar de diabetes: abuelos, tíos o primos 3 · padres, hermanos o hijos 5\nRiesgo a 10 años: <7 bajo (1/100) · 7–11 levemente elevado (1/25) · 12–14 moderado (1/6) · 15–20 alto (1/3) · >20 muy alto (1/2).',
    in: [
      nEdad(),
      { t: 'sel', id: 'sexo', l: 'Sexo', o: sexo },
      { t: 'num', id: 'peso', l: 'Peso', u: 'kg', min: 20, max: 400, step: 0.1, alt: [U.lb] },
      { t: 'num', id: 'talla', l: 'Talla', u: 'cm', min: 100, max: 250, step: 0.5, alt: [U.inch] },
      { t: 'num', id: 'cint', l: 'Perímetro de cintura (a nivel del ombligo)', u: 'cm', min: 40, max: 250, step: 0.5, alt: [U.inch] },
      { t: 'sel', id: 'act', l: '¿Realiza al menos 30 min de actividad física por día?', o: [['si', 'Sí', 0], ['no', 'No', 2]] },
      { t: 'sel', id: 'veg', l: '¿Come verduras o frutas todos los días?', o: [['si', 'Todos los días', 0], ['no', 'No todos los días', 1]] },
      { t: 'sel', id: 'hta', l: '¿Toma o tomó medicación antihipertensiva regularmente?', o: SN(2) },
      { t: 'sel', id: 'glu', l: '¿Alguna vez le encontraron glucemia elevada (control, enfermedad, embarazo)?', o: SN(5) },
      { t: 'sel', id: 'fam', l: 'Familiares con diabetes', o: [['no', 'No', 0], ['seg', 'Abuelos, tíos o primos hermanos', 3], ['pri', 'Padres, hermanos o hijos', 5]] }
    ],
    calc: function (v) {
      const imc = v.peso / (v.talla / 100) ** 2;
      const e = v.edad < 45 ? 0 : v.edad < 55 ? 2 : v.edad < 65 ? 3 : 4;
      const b = imc < 25 ? 0 : imc <= 30 ? 1 : 3;
      const c = v.sexo == 'm' ? (v.cint < 94 ? 0 : v.cint <= 102 ? 3 : 4) : (v.cint < 80 ? 0 : v.cint <= 88 ? 3 : 4);
      const s = e + b + c + pts(v, this.in);
      return {
        r: s, u: 'puntos', d: 0, more: [['IMC', f(imc, 1) + ' kg/m²']],
        ...band(s, [[0, 6, 'Riesgo bajo: ~1 de cada 100 desarrollará diabetes en 10 años', 'ok'], [7, 11, 'Riesgo levemente elevado: ~1 de cada 25', 'ok'], [12, 14, 'Riesgo moderado: ~1 de cada 6', 'warn'], [15, 20, 'Riesgo alto: ~1 de cada 3', 'bad'], [21, 26, 'Riesgo muy alto: ~1 de cada 2', 'bad']])
      };
    },
    ref: 'Lindström J, Tuomilehto J. The diabetes risk score: a practical tool to predict type 2 diabetes risk. Diabetes Care. 2003;26(3):725–731.',
    url: 'https://doi.org/10.2337/diacare.26.3.725',
    verif: '2026-10',
    pop: 'Adultos finlandeses de 35–64 años sin diabetes (cohortes poblacionales 1987 y 1992), seguimiento 10 años.',
    lim: 'Las categorías de riesgo son las del cuestionario finlandés; su calibración varía según población. Los puntos de corte de cintura son europeos. El ítem de antecedente familiar de segundo grado se agregó en la versión de difusión. No diagnostica diabetes.',
    tests: [
      // edad 50 (2), IMC 27,8 (1), cintura varón 98 (3), act no (2), veg si (0), hta si (2), glu no (0), fam pri (5) = 15
      { v: { edad: 50, sexo: 'm', peso: 85, talla: 175, cint: 98, act: 'no', veg: 'si', hta: 'si', glu: 'no', fam: 'pri' }, r: 15 },
      { v: { edad: 30, sexo: 'f', peso: 55, talla: 165, cint: 70, act: 'si', veg: 'si', hta: 'no', glu: 'no', fam: 'no' }, r: 0 },
      { v: { edad: 70, sexo: 'f', peso: 90, talla: 160, cint: 100, act: 'no', veg: 'no', hta: 'si', glu: 'si', fam: 'pri' }, r: 26 }
    ]
  },
  {
    id: 'ada-riesgo', m: 's', cat: 'endocrino', tags: [],
    n: 'Test de riesgo de diabetes de la ADA', sig: 'ADA Risk Test', syn: ['diabetes', 'prediabetes', 'riesgo de diabetes', 'ada'],
    tipo: 'regla de decisión',
    fin: 'Identifica personas con alto riesgo de diabetes tipo 2 no diagnosticada (o prediabetes) para indicar estudio.',
    ver: 'Bang et al. 2009 (base del cuestionario de la ADA)',
    formula: 'Edad: <40: 0 · 40–49: 1 · 50–59: 2 · ≥60: 3 · sexo masculino 1 · diabetes gestacional previa 1 · familiar de primer grado con diabetes 1 · hipertensión 1 · físicamente inactivo 1\nIMC: <25: 0 · 25–<30: 1 · 30–<40: 2 · ≥40: 3\nTotal 0–11; ≥5: alto riesgo.',
    in: [
      nEdad(),
      { t: 'sel', id: 'sexo', l: 'Sexo', o: [['f', 'Femenino', 0], ['m', 'Masculino', 1]] },
      { t: 'sel', id: 'dg', l: 'Diabetes gestacional previa (solo mujeres)', o: [['no', 'No o no corresponde', 0], ['si', 'Sí', 1]] },
      { t: 'sel', id: 'fam', l: 'Padre, madre, hermano o hermana con diabetes', o: SN(1) },
      { t: 'sel', id: 'hta', l: 'Hipertensión arterial diagnosticada', o: SN(1) },
      { t: 'sel', id: 'act', l: '¿Es físicamente activo?', o: [['si', 'Sí', 0], ['no', 'No', 1]] },
      { t: 'num', id: 'peso', l: 'Peso', u: 'kg', min: 20, max: 400, step: 0.1, alt: [U.lb] },
      { t: 'num', id: 'talla', l: 'Talla', u: 'cm', min: 100, max: 250, step: 0.5, alt: [U.inch] }
    ],
    calc: function (v) {
      const imc = v.peso / (v.talla / 100) ** 2;
      const e = v.edad < 40 ? 0 : v.edad < 50 ? 1 : v.edad < 60 ? 2 : 3;
      const b = imc < 25 ? 0 : imc < 30 ? 1 : imc < 40 ? 2 : 3;
      const s = e + b + pts(v, this.in) - (v.sexo == 'm' && v.dg == 'si' ? 1 : 0);
      return { r: s, u: 'puntos', d: 0, more: [['IMC', f(imc, 1) + ' kg/m²']], interp: s >= 5 ? 'Alto riesgo (≥5): corresponde estudiar diabetes/prediabetes' : 'Riesgo no elevado (<5)', lvl: s >= 5 ? 'bad' : 'ok' };
    },
    ref: 'Bang H, Edwards AM, Bomback AS, et al. Development and validation of a patient self-assessment score for diabetes risk. Ann Intern Med. 2009;151(11):775–783.',
    url: 'https://doi.org/10.7326/0003-4819-151-11-200912010-00005',
    verif: '2026-10',
    pop: 'Adultos ≥20 años de NHANES 1999–2004 (EE. UU.), validado en NHANES 2005–2006 y ARIC/CHS.',
    lim: 'El cuestionario de la ADA usa una tabla peso/talla equivalente a estos cortes de IMC; en asiáticos-americanos el riesgo aumenta con IMC menores. Detecta diabetes no diagnosticada, no predice incidencia. No diagnostica.',
    tests: [
      // edad 55 (2) + varón (1) + fam (1) + hta (0) + inactivo (1) + IMC 31,1 (2) = 7
      { v: { edad: 55, sexo: 'm', dg: 'no', fam: 'si', hta: 'no', act: 'no', peso: 95, talla: 175 }, r: 7 },
      { v: { edad: 35, sexo: 'f', dg: 'no', fam: 'no', hta: 'no', act: 'si', peso: 60, talla: 165 }, r: 0 },
      { v: { edad: 45, sexo: 'f', dg: 'si', fam: 'si', hta: 'si', act: 'si', peso: 72, talla: 165 }, r: 5 }
    ]
  },
  {
    id: 'burch-wartofsky', m: 's', cat: 'endocrino', tags: ['s:uti'],
    n: 'Escala de Burch-Wartofsky (tormenta tiroidea)', sig: 'BWPS', syn: ['tormenta tiroidea', 'crisis tirotoxica', 'tirotoxicosis'],
    tipo: 'criterio diagnóstico',
    fin: 'Estima la probabilidad de tormenta tiroidea en pacientes con tirotoxicosis.',
    ver: 'Burch y Wartofsky 1993',
    formula: 'Temperatura (°C): 37,2–37,7: 5 · 37,8–38,2: 10 · 38,3–38,8: 15 · 38,9–39,3: 20 · 39,4–39,9: 25 · ≥40,0: 30\nSNC: ausente 0 · leve (agitación) 10 · moderado (delirio, psicosis, letargo extremo) 20 · grave (convulsiones, coma) 30\nGastrointestinal-hepático: ausente 0 · moderado (diarrea, náuseas/vómitos, dolor abdominal) 10 · grave (ictericia inexplicada) 20\nFC: 90–109: 5 · 110–119: 10 · 120–129: 15 · 130–139: 20 · ≥140: 25\nInsuficiencia cardíaca: ausente 0 · leve (edema pedio) 5 · moderada (rales bibasales) 10 · grave (edema pulmonar) 15\nFibrilación auricular 10 · evento desencadenante 10\n≥45: muy sugestivo · 25–44: sugestivo de tormenta inminente · <25: poco probable.',
    in: [
      { t: 'num', id: 'temp', l: 'Temperatura', u: '°C', min: 30, max: 45, step: 0.1, alt: [U.f_temp] },
      { t: 'sel', id: 'snc', l: 'Efectos sobre el sistema nervioso central', o: [[0, 'Ausentes', 0], [10, 'Leves (agitación)', 10], [20, 'Moderados (delirio, psicosis, letargo extremo)', 20], [30, 'Graves (convulsiones, coma)', 30]] },
      { t: 'sel', id: 'gi', l: 'Disfunción gastrointestinal-hepática', o: [[0, 'Ausente', 0], [10, 'Moderada (diarrea, náuseas/vómitos, dolor abdominal)', 10], [20, 'Grave (ictericia inexplicada)', 20]] },
      { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 20, max: 300, step: 1 },
      { t: 'sel', id: 'ic', l: 'Insuficiencia cardíaca', o: [[0, 'Ausente', 0], [5, 'Leve (edema pedio)', 5], [10, 'Moderada (rales bibasales)', 10], [15, 'Grave (edema pulmonar)', 15]] },
      { t: 'sel', id: 'fa', l: 'Fibrilación auricular', o: SN(10) },
      { t: 'sel', id: 'des', l: 'Evento desencadenante', o: SN(10) }
    ],
    calc: function (v) {
      const t = rd(v.temp, 1);
      const tp = t < 37.2 ? 0 : t < 37.8 ? 5 : t < 38.3 ? 10 : t < 38.9 ? 15 : t < 39.4 ? 20 : t < 40 ? 25 : 30;
      const hr = v.fc < 90 ? 0 : v.fc < 110 ? 5 : v.fc < 120 ? 10 : v.fc < 130 ? 15 : v.fc < 140 ? 20 : 25;
      const s = tp + hr + pts(v, this.in);
      return { r: s, u: 'puntos', d: 0, ...band(s, [[0, 24, 'Tormenta tiroidea poco probable', 'ok'], [25, 44, 'Sugestivo de tormenta tiroidea inminente', 'warn'], [45, 200, 'Muy sugestivo de tormenta tiroidea', 'bad']]) };
    },
    ref: 'Burch HB, Wartofsky L. Life-threatening thyrotoxicosis. Thyroid storm. Endocrinol Metab Clin North Am. 1993;22(2):263–277.',
    url: 'https://doi.org/10.1016/S0889-8529(18)30165-8',
    verif: '2026-10',
    pop: 'Escala empírica basada en la experiencia clínica y la literatura; sin cohorte de derivación formal.',
    lim: 'Solo en pacientes con tirotoxicosis. Alta sensibilidad pero baja especificidad (sobrediagnostica). Los rangos de temperatura en °C son la conversión de los originales en °F. No reemplaza el juicio clínico; ver también criterios JTA.',
    tests: [
      // 39,5 °C (25) + SNC moderado (20) + GI moderado (10) + FC 135 (20) + IC leve (5) + FA (10) + desencadenante (10) = 100
      { v: { temp: 39.5, snc: 20, gi: 10, fc: 135, ic: 5, fa: 'si', des: 'si' }, r: 100 },
      { v: { temp: 37, snc: 0, gi: 0, fc: 100, ic: 0, fa: 'no', des: 'no' }, r: 5 },
      { v: { temp: 38, snc: 10, gi: 0, fc: 115, ic: 0, fa: 'no', des: 'si' }, r: 40 }
    ]
  },
  {
    id: 'jta-tormenta', m: 's', cat: 'endocrino', tags: ['s:uti'],
    n: 'Criterios de la Japan Thyroid Association para tormenta tiroidea', sig: 'JTA', syn: ['tormenta tiroidea', 'akamizu', 'crisis tirotoxica'],
    tipo: 'criterio diagnóstico',
    fin: 'Clasifica la tormenta tiroidea como definida (TS1) o sospechada (TS2) según combinaciones de manifestaciones.',
    ver: 'Akamizu et al. 2012 (JTA, 2.ª edición)',
    formula: 'Requisito: tirotoxicosis (T3L y/o T4L elevadas).\nManifestaciones: SNC (inquietud, delirio, psicosis, somnolencia, coma; Glasgow ≤14) · fiebre ≥38 °C · taquicardia ≥130 lpm (incluida FA) · insuficiencia cardíaca (edema pulmonar, rales en más de la mitad del campo pulmonar, shock cardiogénico, NYHA IV o Killip ≥III) · GI/hepáticas (náuseas, vómitos, diarrea o bilirrubina total ≥3,0 mg/dL).\nTS1: tirotoxicosis + SNC + ≥1 de las otras cuatro; o tirotoxicosis + ≥3 de fiebre, taquicardia, IC o GI/hepáticas.\nTS2: tirotoxicosis + 2 de fiebre, taquicardia, IC o GI/hepáticas; o criterios de TS1 sin T3L/T4L disponibles.',
    in: [
      { t: 'sel', id: 'tx', l: 'Tirotoxicosis', o: [['conf', 'Confirmada (T3L y/o T4L elevadas)'], ['nd', 'Sospechada, sin T3L/T4L disponibles'], ['no', 'Ausente']] },
      { t: 'chk', id: 'snc', l: 'SNC: inquietud, delirio, psicosis, somnolencia/letargo o coma (Glasgow ≤14)' },
      { t: 'chk', id: 'fie', l: 'Fiebre ≥38 °C' },
      { t: 'chk', id: 'taq', l: 'Taquicardia ≥130 lpm (incluida fibrilación auricular)' },
      { t: 'chk', id: 'ic', l: 'Insuficiencia cardíaca: edema pulmonar, rales en más de la mitad del pulmón, shock cardiogénico, NYHA IV o Killip ≥III' },
      { t: 'chk', id: 'gi', l: 'GI/hepáticas: náuseas, vómitos, diarrea o bilirrubina total ≥3,0 mg/dL' }
    ],
    calc: v => {
      const o = (v.fie ? 1 : 0) + (v.taq ? 1 : 0) + (v.ic ? 1 : 0) + (v.gi ? 1 : 0);
      const ts1 = (v.snc && o >= 1) || o >= 3;
      const more = [['Manifestaciones no SNC', o + '/4'], ['SNC', v.snc ? 'sí' : 'no']];
      if (v.tx == 'no') return { r: 'No cumple', interp: 'Sin tirotoxicosis no se aplican los criterios', lvl: 'ok', more };
      if (v.tx == 'conf') {
        if (ts1) return { r: 'TS1', interp: 'TS1: tormenta tiroidea definida', lvl: 'bad', more };
        if (o == 2) return { r: 'TS2', interp: 'TS2: tormenta tiroidea sospechada', lvl: 'bad', more };
        return { r: 'No cumple', interp: 'No cumple criterios de TS1 ni TS2', lvl: 'warn', more };
      }
      if (ts1) return { r: 'TS2', interp: 'TS2: cumple criterios de TS1 sin T3L/T4L disponibles', lvl: 'bad', more };
      return { r: 'No cumple', interp: 'Sin T3L/T4L, solo puede clasificarse como TS2 si cumple las combinaciones de TS1', lvl: 'warn', more };
    },
    ref: 'Akamizu T, Satoh T, Isozaki O, et al.; Japan Thyroid Association. Diagnostic criteria, clinical features, and incidence of thyroid storm based on nationwide surveys. Thyroid. 2012;22(7):661–679.',
    url: 'https://doi.org/10.1089/thy.2011.0334',
    verif: '2026-10',
    pop: 'Casos de tormenta tiroidea de encuestas nacionales en Japón (2004–2008).',
    lim: 'Se excluyen las manifestaciones claramente explicadas por otra enfermedad (p. ej. neumonía, hipertermia maligna, ACV, IAM, hepatitis viral); si no se puede distinguir y la causa es el desencadenante, se atribuyen a la tormenta. Menos sensible que Burch-Wartofsky, más específica.',
    tests: [
      { v: { tx: 'conf', snc: true, fie: true }, r: 'TS1' },
      { v: { tx: 'conf', fie: true, taq: true }, r: 'TS2' },
      { v: { tx: 'nd', fie: true, taq: true, gi: true }, r: 'TS2' },
      { v: { tx: 'conf', fie: true }, r: 'No cumple' }
    ]
  },
  {
    id: 'cad-ehh', m: 's', cat: 'endocrino', tags: ['s:uti'],
    n: 'Criterios diagnósticos de cetoacidosis diabética y estado hiperglucémico hiperosmolar', sig: 'CAD / EHH', syn: ['cad', 'cetoacidosis', 'ehh', 'hiperosmolar', 'crisis hiperglucemica', 'dka', 'hhs'],
    tipo: 'criterio diagnóstico',
    fin: 'Evalúa los criterios de CAD (con su gravedad) y de EHH en adultos según el consenso internacional 2024.',
    ver: 'Consenso ADA/EASD/JBDS/AACE/DTS 2024 (Umpierrez et al.)',
    formula: 'CAD (los tres): D glucemia ≥200 mg/dL o diabetes conocida · K β-hidroxibutirato ≥3,0 mmol/L o cetonuria ≥2+ · A pH <7,3 y/o bicarbonato <18 mmol/L.\nGravedad de CAD (no se requieren todos los parámetros): leve pH 7,25–7,30, HCO₃ 15–18, alerta · moderada pH 7,00–7,24, HCO₃ 10–<15, alerta/somnoliento · grave pH <7,00, HCO₃ <10, β-OHB >6 mmol/L, estupor/coma.\nEHH: glucemia ≥600 mg/dL · osmolalidad efectiva >300 mOsm/kg [2 × Na + glucosa (mmol/L)] o total >320 [efectiva + urea (mmol/L)] · sin cetosis significativa (β-OHB <3,0 o cetonuria <2+) · pH ≥7,3 y HCO₃ ≥15.',
    in: [
      { t: 'num', id: 'glu', l: 'Glucemia plasmática', u: 'mg/dL', min: 10, max: 5000, step: 1, alt: [U.glu_mmol] },
      { t: 'sel', id: 'dm', l: 'Diabetes conocida', o: [['si', 'Sí'], ['no', 'No']] },
      { t: 'num', id: 'bohb', l: 'β-hidroxibutirato en sangre', u: 'mmol/L', min: 0, max: 30, step: 0.1, req: 0 },
      { t: 'sel', id: 'ceto', l: 'Cetonuria (tira reactiva)', req: 0, o: [['neg', 'Negativa'], ['1', 'Trazas o 1+'], ['2', '2+ o más']] },
      { t: 'num', id: 'ph', l: 'pH (venoso o arterial)', u: '', min: 6.5, max: 7.8, step: 0.01 },
      { t: 'num', id: 'hco3', l: 'Bicarbonato', u: 'mmol/L', min: 0, max: 60, step: 0.1 },
      { t: 'num', id: 'na', l: 'Sodio medido', u: 'mmol/L', min: 90, max: 200, step: 1 },
      { t: 'num', id: 'urea', l: 'Urea (para osmolalidad total)', u: 'mmol/L', min: 0.5, max: 150, step: 0.1, alt: [UREA_MG, BUN_MG], req: 0 },
      { t: 'sel', id: 'mental', l: 'Estado mental (para gravedad de CAD)', req: 0, o: [['alerta', 'Alerta'], ['somn', 'Somnoliento'], ['coma', 'Estupor o coma']] }
    ],
    calc: v => {
      if (v.bohb == null && v.ceto == null) return null;
      const ket = (v.bohb != null && v.bohb >= 3) || v.ceto == '2';
      const gmm = v.glu / 18.016;
      const eff = 2 * v.na + gmm, tot = v.urea != null ? eff + v.urea : null;
      const cad = (v.glu >= 200 || v.dm == 'si') && ket && (v.ph < 7.3 || v.hco3 < 18);
      const ehh = v.glu >= 600 && (eff > 300 || (tot != null && tot > 320)) && !ket && v.ph >= 7.3 && v.hco3 >= 15;
      const more = [['Osmolalidad efectiva', f(eff, 0) + ' mOsm/kg']];
      if (tot != null) more.push(['Osmolalidad total', f(tot, 0) + ' mOsm/kg']);
      const notes = [];
      if (cad) {
        const grave = v.ph < 7 || v.hco3 < 10 || (v.bohb != null && v.bohb > 6) || v.mental == 'coma';
        const mod = v.ph < 7.25 || v.hco3 < 15 || v.mental == 'somn';
        const g = grave ? 'grave' : mod ? 'moderada' : 'leve';
        if (v.glu < 250) notes.push('Glucemia <250 mg/dL: CAD euglucémica (considerar iSGLT2, embarazo, ayuno).');
        if (v.glu >= 600 && eff > 300) notes.push('Glucemia ≥600 mg/dL con osmolalidad efectiva >300: rasgos mixtos CAD-EHH.');
        if (v.mental == null) notes.push('Sin estado mental: la gravedad se asignó solo con los parámetros de laboratorio.');
        notes.push('Gravedad asignada por el parámetro más grave presente.');
        return { r: 'CAD ' + g, interp: 'Cumple criterios de cetoacidosis diabética, gravedad ' + g, lvl: g == 'leve' ? 'warn' : 'bad', more, note: notes.join(' ') };
      }
      if (ehh) return { r: 'EHH', interp: 'Cumple criterios de estado hiperglucémico hiperosmolar', lvl: 'bad', more };
      if (v.glu >= 600 && (eff > 300 || (tot != null && tot > 320))) notes.push('Hiperglucemia e hiperosmolalidad sin cumplir el resto de los criterios de EHH (revisar cetosis y acidosis).');
      if (ket && !(v.ph < 7.3 || v.hco3 < 18)) notes.push('Cetosis sin acidosis.');
      return { r: 'No cumple criterios de CAD ni de EHH', lvl: 'ok', more, note: notes.join(' ') || undefined };
    },
    ref: 'Umpierrez GE, Davis GM, ElSayed NA, et al. Hyperglycemic crises in adults with diabetes: a consensus report. Diabetes Care. 2024;47(8):1257–1275.',
    url: 'https://doi.org/10.2337/dci24-0032',
    verif: '2026-10',
    pop: 'Adultos con diabetes y crisis hiperglucémica (consenso de expertos).',
    lim: 'Se requiere β-hidroxibutirato o cetonuria; la tira reactiva detecta acetoacetato y subestima la cetosis. El consenso aclara que no hace falta cumplir todos los parámetros de una categoría de gravedad; acá se asigna la más grave alcanzada (criterio conservador). No aplicable a niños (usar criterios ISPAD). La glucosa se convierte a mmol/L dividiendo por 18.',
    tests: [
      { v: { glu: 450, dm: 'si', bohb: 7, ph: 6.95, hco3: 6, na: 135 }, r: 'CAD grave' },
      { v: { glu: 350, dm: 'si', ceto: '2', ph: 7.27, hco3: 16, na: 138, mental: 'alerta' }, r: 'CAD leve' },
      { v: { glu: 900, dm: 'si', bohb: 0.5, ph: 7.38, hco3: 22, na: 150 }, r: 'EHH' },
      { v: { glu: 150, dm: 'no', bohb: 0.2, ph: 7.4, hco3: 24, na: 140 }, r: 'No cumple' }
    ]
  }
];
