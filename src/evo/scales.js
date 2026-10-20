// Escalas clínicas incorporadas (versiones de uso habitual) y catálogos de los componentes especiales.
// Solo datos y cálculos puros.

// [valor, descripción]; p = cómo se escribe en la evolución
export const SCALES = {
  hh: { l: 'Hunt-Hess', p: 'Hunt-Hess {v}', o: [['I', 'Asintomático, o cefalea leve y rigidez de nuca leve'], ['II', 'Cefalea moderada a severa, rigidez de nuca; sin déficit neurológico salvo parálisis de par craneal'], ['III', 'Somnolencia, confusión o déficit focal leve'], ['IV', 'Estupor, hemiparesia moderada a severa; posible rigidez de descerebración precoz y trastornos vegetativos'], ['V', 'Coma profundo, rigidez de descerebración, aspecto moribundo']] },
  wfns: { l: 'WFNS', p: 'WFNS {v}', o: [['I', 'Glasgow 15, sin déficit motor'], ['II', 'Glasgow 13–14, sin déficit motor'], ['III', 'Glasgow 13–14, con déficit motor'], ['IV', 'Glasgow 7–12, con o sin déficit motor'], ['V', 'Glasgow 3–6, con o sin déficit motor']] },
  mfisher: { l: 'Fisher modificada', p: 'Fisher modificada {v}', o: [['0', 'Sin HSA ni hemorragia intraventricular'], ['1', 'HSA focal o difusa fina, sin hemorragia intraventricular'], ['2', 'HSA focal o difusa fina, con hemorragia intraventricular'], ['3', 'HSA gruesa, sin hemorragia intraventricular'], ['4', 'HSA gruesa, con hemorragia intraventricular']] },
  mrs: { l: 'Rankin modificada (mRS)', p: 'mRS {v}', o: [['0', 'Sin síntomas'], ['1', 'Sin discapacidad significativa pese a los síntomas'], ['2', 'Discapacidad leve: independiente para las actividades básicas'], ['3', 'Discapacidad moderada: requiere alguna ayuda, camina sin asistencia'], ['4', 'Discapacidad moderadamente grave: no camina sin asistencia'], ['5', 'Discapacidad grave: postrado, incontinente, requiere atención constante'], ['6', 'Muerte']] },
  rass: { l: 'RASS', p: 'RASS {v}', o: [['+4', 'Combativo'], ['+3', 'Muy agitado'], ['+2', 'Agitado'], ['+1', 'Inquieto'], ['0', 'Alerta y calmo'], ['-1', 'Somnoliento'], ['-2', 'Sedación leve'], ['-3', 'Sedación moderada'], ['-4', 'Sedación profunda'], ['-5', 'No despertable']] },
  eva: { l: 'EVA', p: 'EVA {v}/10', o: Array.from({ length: 11 }, (_, i) => [String(i), i == 0 ? 'Sin dolor' : i == 10 ? 'Peor dolor imaginable' : '']) },
  marshall: { l: 'Marshall (TC)', p: 'Marshall {v}', o: [['I', 'Lesión difusa I: sin patología visible en la TC'], ['II', 'Lesión difusa II: cisternas presentes, desviación de línea media 0–5 mm, sin lesión hiperdensa mayor de 25 mL'], ['III', 'Lesión difusa III (edema): cisternas comprimidas o ausentes, desviación 0–5 mm'], ['IV', 'Lesión difusa IV (desviación): desviación mayor de 5 mm, sin lesión mayor de 25 mL'], ['V', 'Lesión con efecto de masa evacuada'], ['VI', 'Lesión con efecto de masa no evacuada (mayor de 25 mL)']] },
  ashworth: { l: 'Ashworth modificada', p: 'Ashworth modificada {v}', o: [['0', 'Sin aumento del tono'], ['1', 'Leve aumento, con resistencia al final del arco'], ['1+', 'Leve aumento, con resistencia en menos de la mitad del arco'], ['2', 'Aumento marcado en la mayor parte del arco'], ['3', 'Aumento considerable, movilización pasiva difícil'], ['4', 'Segmento rígido']] },
  mjoa: { l: 'mJOA', p: 'mJOA {v}/18', o: Array.from({ length: 19 }, (_, i) => [String(18 - i), 18 - i >= 15 ? 'Mielopatía leve o ausente' : 18 - i >= 12 ? 'Moderada' : 'Severa']) },
  nurick: { l: 'Nurick', p: 'Nurick {v}', o: [['0', 'Signos radiculares, sin mielopatía'], ['1', 'Mielopatía sin alteración de la marcha'], ['2', 'Alteración leve de la marcha, trabaja'], ['3', 'Alteración de la marcha que impide trabajar'], ['4', 'Camina solo con ayuda'], ['5', 'Postrado o en silla de ruedas']] },
  frankel: { l: 'Frankel', p: 'Frankel {v}', o: [['A', 'Lesión completa: sin función motora ni sensitiva'], ['B', 'Solo sensitivo'], ['C', 'Motor no útil'], ['D', 'Motor útil'], ['E', 'Sin déficit']] }
};

export const GCS = {
  o: [[4, 'Espontánea'], [3, 'Al estímulo verbal'], [2, 'Al estímulo doloroso'], [1, 'Ninguna']],
  v: [[5, 'Orientada'], [4, 'Confusa'], [3, 'Palabras inapropiadas'], [2, 'Sonidos incomprensibles'], [1, 'Ninguna'], ['T', 'Intubado (T)']],
  m: [[6, 'Obedece órdenes'], [5, 'Localiza el estímulo'], [4, 'Retira'], [3, 'Flexión anormal'], [2, 'Extensión'], [1, 'Ninguna']]
};

export const NIHSS = [
  ['1a', 'Nivel de conciencia', ['Alerta', 'No alerta, despierta con estímulo menor', 'No alerta, requiere estimulación repetida o dolorosa', 'Solo respuestas reflejas o arreactivo']],
  ['1b', 'Preguntas (mes y edad)', ['Ambas correctas', 'Una correcta', 'Ninguna correcta']],
  ['1c', 'Órdenes (ojos y mano)', ['Ambas correctas', 'Una correcta', 'Ninguna correcta']],
  ['2', 'Mirada', ['Normal', 'Parálisis parcial de la mirada', 'Desviación forzada o parálisis total']],
  ['3', 'Campos visuales', ['Sin pérdida visual', 'Hemianopsia parcial', 'Hemianopsia completa', 'Hemianopsia bilateral (ceguera)']],
  ['4', 'Parálisis facial', ['Normal', 'Paresia menor', 'Parálisis parcial', 'Parálisis completa']],
  ['5a', 'Motor brazo izquierdo', ['Sin claudicación', 'Claudica antes de 10 s', 'Algún esfuerzo contra la gravedad', 'Sin esfuerzo contra la gravedad', 'Sin movimiento'], 1],
  ['5b', 'Motor brazo derecho', ['Sin claudicación', 'Claudica antes de 10 s', 'Algún esfuerzo contra la gravedad', 'Sin esfuerzo contra la gravedad', 'Sin movimiento'], 1],
  ['6a', 'Motor pierna izquierda', ['Sin claudicación', 'Claudica antes de 5 s', 'Algún esfuerzo contra la gravedad', 'Sin esfuerzo contra la gravedad', 'Sin movimiento'], 1],
  ['6b', 'Motor pierna derecha', ['Sin claudicación', 'Claudica antes de 5 s', 'Algún esfuerzo contra la gravedad', 'Sin esfuerzo contra la gravedad', 'Sin movimiento'], 1],
  ['7', 'Ataxia de miembros', ['Ausente', 'Presente en un miembro', 'Presente en dos miembros'], 1],
  ['8', 'Sensibilidad', ['Normal', 'Pérdida leve a moderada', 'Pérdida severa o total']],
  ['9', 'Lenguaje', ['Normal', 'Afasia leve a moderada', 'Afasia severa', 'Mutismo o afasia global']],
  ['10', 'Disartria', ['Normal', 'Leve a moderada', 'Severa o anartria'], 1],
  ['11', 'Extinción e inatención', ['Ninguna', 'En una modalidad', 'Profunda o en más de una modalidad']]
]; // el 4.º elemento indica que admite «NV» (no valorable: amputación, fusión articular, intubación)

// Músculos para el examen motor detallado: [clave, nombre (plural para «debilidad de …»), raíz, miembro]
export const MUSCLES = [
  ['del', 'deltoides', 'C5', 's'], ['bic', 'bíceps', 'C5-C6', 's'], ['tri', 'tríceps', 'C7', 's'], ['exm', 'extensores de muñeca', 'C6', 's'],
  ['flm', 'flexores de muñeca', 'C7', 's'], ['exd', 'extensores de dedos', 'C7', 's'], ['flp', 'flexores de los dedos', 'C8', 's'], ['int', 'interóseos', 'T1', 's'],
  ['flc', 'flexores de cadera', 'L2', 'i'], ['exr', 'extensores de rodilla', 'L3', 'i'], ['dfl', 'dorsiflexores del tobillo', 'L4', 'i'],
  ['elh', 'extensor largo del hallux', 'L5', 'i'], ['fpl', 'flexores plantares', 'S1', 'i']
];

export const REFLEXES = [['bic', 'bicipital'], ['tri', 'tricipital'], ['est', 'estilorradial'], ['pat', 'patelar'], ['aqu', 'aquíleo']];
export const ROT_V = ['0', '+', '++', '+++', '++++'];

export const SENS_T = [['hipo', 'Hipoestesia'], ['anes', 'Anestesia'], ['hiper', 'Hiperestesia'], ['hialg', 'Hiperalgesia'], ['alod', 'Alodinia'], ['pares', 'Parestesias'], ['dises', 'Disestesias'], ['hipop', 'Hipopalestesia']];
export const SENS_M = [['tac', 'táctil'], ['dol', 'dolorosa'], ['ter', 'térmica'], ['vib', 'vibratoria'], ['pro', 'propioceptiva']];
export const SENS_D = [['hemi', 'Hemicuerpo'], ['ms', 'Miembro superior'], ['mi', 'Miembro inferior'], ['derm', 'Dermatoma (raíz)'], ['nerv', 'Territorio nervioso'], ['nivel', 'Nivel sensitivo'], ['guante', 'En guante'], ['calcetin', 'En calcetín'], ['tronco', 'Tronco'], ['cara', 'Cara'], ['silla', 'Silla de montar / perineal']];

export const CONC = ['Vigil', 'Somnoliento', 'Obnubilado', 'Estuporoso', 'Comatoso'];
export const CONC_MOD = ['Agitado', 'Confuso', 'Fluctuante'];

export const O2 = [['aa', 'al aire ambiente'], ['cn', 'con cánula nasal'], ['ms', 'con máscara simple'], ['mr', 'con máscara con reservorio'], ['vt', 'con máscara Venturi'], ['af', 'con cánula nasal de alto flujo'], ['vni', 'con ventilación no invasiva'], ['arm', 'en asistencia respiratoria mecánica']];

// Laboratorio: [clave, rótulo, unidad, mín, máx, decimales, miles]
export const LAB = [
  ['hb', 'Hb', 'g/dL', 12, 16, 1], ['hto', 'Hto', '%', 36, 48, 0], ['gb', 'leucocitos', '/mm³', 4000, 10000, 0, 1], ['plq', 'plaquetas', '/mm³', 150000, 450000, 0, 1],
  ['glu', 'glucemia', 'mg/dL', 70, 110, 0], ['ur', 'urea', 'mg/dL', 15, 45, 0], ['cr', 'creatinina', 'mg/dL', 0.6, 1.2, 2],
  ['na', 'Na', 'mEq/L', 135, 145, 0], ['k', 'K', 'mEq/L', 3.5, 5, 1], ['cl', 'Cl', 'mEq/L', 98, 107, 0], ['ca', 'Ca', 'mg/dL', 8.5, 10.5, 1], ['mg', 'Mg', 'mg/dL', 1.7, 2.4, 1],
  ['pcr', 'PCR', 'mg/L', 0, 5, 1], ['pct', 'procalcitonina', 'ng/mL', 0, 0.5, 2], ['tp', 'TP', '%', 70, 100, 0], ['rin', 'RIN', '', 0.8, 1.2, 2], ['kptt', 'KPTT', 's', 25, 35, 0],
  ['ph', 'pH', '', 7.35, 7.45, 2], ['pco2', 'pCO₂', 'mmHg', 35, 45, 0], ['po2', 'pO₂', 'mmHg', 80, 100, 0], ['hco3', 'HCO₃⁻', 'mEq/L', 22, 26, 0], ['lac', 'lactato', 'mmol/L', 0.5, 2, 1]
];

// Dispositivos: [nombre, género (m/f), propiedades]
// p: permeabilidad · e: estado (abierto/cerrado) · n: nivel cmH₂O · d: débito · c: características · s: sitio · v: valor de PIC
export const DEVICES = {
  'Vía venosa periférica': ['f', 'ps'], 'Catéter venoso central': ['m', 'ps'], 'PICC': ['m', 'ps'], 'Catéter arterial': ['m', 'ps'],
  'SNG': ['f', 'pedc'], 'Sonda vesical': ['f', 'pdc'], 'Gastrostomía': ['f', 'ps'],
  'DVE': ['m', 'pendcs'], 'Drenaje lumbar': ['m', 'pendcs'], 'Drenaje subdural': ['m', 'pedcs'], 'Drenaje subgaleal': ['m', 'pedcs'], 'Sensor de PIC': ['m', 'vs'],
  'Drenaje pleural': ['m', 'pdcs'], 'Drenaje quirúrgico': ['m', 'pdcs'], 'Otro dispositivo': ['m', 'pedcs']
};
export const DEV_EST = { 'SNG': ['a débito', 'cerrada', 'en alimentación'], _: ['abierto', 'cerrado', 'clampado'] };
export const DEV_CAR = ['seroso', 'serohemático', 'hemático', 'claro (cristal de roca)', 'xantocrómico', 'turbio', 'purulento', 'bilioso', 'fecaloide', 'alimentario'];
export const DEV_SITE = [['ok', 'sin signos inflamatorios'], ['eri', 'con eritema'], ['sec', 'con secreción'], ['inf', 'con signos de infección']];

/* -------------------- ISNCSCI (ASIA) -------------------- */
export const DERM = ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12', 'L1', 'L2', 'L3', 'L4', 'L5', 'S1', 'S2', 'S3', 'S4-5'];
export const KEYM = [['C5', 'Flexores del codo'], ['C6', 'Extensores de muñeca'], ['C7', 'Extensores del codo'], ['C8', 'Flexores profundos del dedo medio'], ['T1', 'Abductor del meñique'], ['L2', 'Flexores de cadera'], ['L3', 'Extensores de rodilla'], ['L4', 'Dorsiflexores del tobillo'], ['L5', 'Extensor largo del hallux'], ['S1', 'Flexores plantares']];
const LEVELS = ['C1', ...DERM]; // índice 0 = C1
const li = l => LEVELS.indexOf(l);
const num = v => (v === '' || v == null || v == 'NT' ? null : +v);

// a = { m: {C5d: 5, …}, lt: {C2d: 2, …}, pp: {…}, vac: 'si'|'no', dap: 'si'|'no' }
export function isncsci(a) {
  const side = ['d', 'i'], res = { sl: {}, ml: {}, zs: {}, zm: {}, nt: false };
  const sens = (k, l, s) => { const v = num((a[k] || {})[l + s]); if (v == null) res.nt = true; return v == null ? 2 : v; };
  const mot = (l, s) => { const v = num((a.m || {})[l + s]); if (v == null) res.nt = true; return v == null ? 5 : v; };
  side.forEach(s => {
    // nivel sensitivo: dermatoma más caudal con tacto y pinchazo normales, con todos los rostrales normales
    let sl = 'C1';
    for (const d of DERM) { if (sens('lt', d, s) == 2 && sens('pp', d, s) == 2) sl = d; else break; }
    if (sl == 'S4-5') sl = 'INT';
    res.sl[s] = sl;
    // nivel motor
    const SLi = sl == 'INT' ? LEVELS.length : li(sl);
    let ml = null;
    if (SLi <= li('C4')) ml = sl;
    else {
      const UE = ['C5', 'C6', 'C7', 'C8', 'T1'], LE = ['L2', 'L3', 'L4', 'L5', 'S1'];
      const walk = (arr, above) => { for (let i = 0; i < arr.length; i++) { const g = mot(arr[i], s); if (g == 5) continue; return g >= 3 ? arr[i] : (i ? arr[i - 1] : above); } return null; };
      ml = walk(UE, 'C4');
      if (!ml) {
        if (SLi < li('L1')) ml = SLi >= li('T1') ? sl : 'T1';
        else { ml = walk(LE, 'L1'); if (!ml) ml = SLi > li('S1') ? sl : 'S1'; }
      }
    }
    res.ml[s] = ml;
  });
  const rank = l => (l == 'INT' ? LEVELS.length : li(l));
  const all = [res.sl.d, res.sl.i, res.ml.d, res.ml.i].sort((x, y) => rank(x) - rank(y));
  res.nli = all[0];
  const s45 = s => sens('lt', 'S4-5', s) > 0 || sens('pp', 'S4-5', s) > 0;
  const sacral = s45('d') || s45('i') || a.dap == 'si' || a.vac == 'si';
  const KM = KEYM.map(k => k[0]);
  const allNormal = side.every(s => DERM.every(d => sens('lt', d, s) == 2 && sens('pp', d, s) == 2) && KM.every(k => mot(k, s) == 5)) && a.vac != 'no' && a.dap != 'no';
  if (allNormal) res.ais = 'E';
  else if (!sacral) res.ais = 'A';
  else {
    // ¿motor completo? sin contracción anal voluntaria y sin función motora más de 3 niveles por debajo del nivel motor de cada lado
    const motorBelow = s => KM.some(k => rank(k) > rank(res.ml[s]) + 3 && mot(k, s) > 0);
    if (a.vac != 'si' && !motorBelow('d') && !motorBelow('i')) res.ais = 'B';
    else {
      const below = []; side.forEach(s => KM.forEach(k => { if (rank(k) > rank(res.nli)) below.push(mot(k, s)); }));
      res.ais = below.length && below.filter(g => g >= 3).length >= below.length / 2 ? 'D' : 'C';
    }
  }
  // zonas de preservación parcial: dermatoma o miotoma más caudal con alguna función, por debajo del nivel
  side.forEach(s => {
    if (!s45(s) && a.dap != 'si') {
      let z = res.sl[s];
      DERM.forEach(d => { if (rank(d) > rank(res.sl[s]) && (sens('lt', d, s) > 0 || sens('pp', d, s) > 0)) z = d; });
      res.zs[s] = z;
    }
    if (a.vac != 'si') {
      let z = res.ml[s];
      KM.forEach(k => { if (rank(k) > rank(res.ml[s]) && mot(k, s) > 0) z = k; });
      res.zm[s] = z;
    }
  });
  const sum = (ks, f) => side.reduce((t, s) => t + ks.reduce((u, k) => u + f(k, s), 0), 0);
  res.uems = sum(KM.slice(0, 5), mot); res.lems = sum(KM.slice(5), mot);
  res.ltt = sum(DERM, (d, s) => sens('lt', d, s)); res.ppt = sum(DERM, (d, s) => sens('pp', d, s));
  return res;
}
