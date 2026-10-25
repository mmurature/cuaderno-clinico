// Scores y escalas: neuro, trauma y anestesia.
import { pts, band } from '../h.js';
import { isncsci, DERM, KEYM } from '../../evo/scales.js';

/* ---------- ayudas locales ---------- */
const S = (id, l, o) => ({ t: 'sel', id, l, o });
const yn = (id, l, p = 1) => S(id, l, [['no', 'No', 0], ['si', 'Sí', p]]);
const H = l => ({ t: 'head', l });
const si = (v, k) => v[k] === 'si';
// etiquetas de los ítems con «Sí»
const met = (v, ins) => ins.filter(i => i.t == 'sel' && v[i.id] === 'si').map(i => i.l);

/* ---------- Glasgow ---------- */
const gcsIn = [
  S('e', 'Apertura ocular (E)', [['4', '4 · Espontánea'], ['3', '3 · Al sonido (estímulo verbal)'], ['2', '2 · A la presión (estímulo doloroso)'], ['1', '1 · Ninguna'], ['NT', 'NT · No evaluable (ojos cerrados por edema, vendaje)']]),
  S('vb', 'Respuesta verbal (V)', [['5', '5 · Orientada'], ['4', '4 · Confusa'], ['3', '3 · Palabras (inapropiadas)'], ['2', '2 · Sonidos (incomprensibles)'], ['1', '1 · Ninguna'], ['T', 'T · Intubado / traqueostomizado'], ['NT', 'NT · No evaluable por otro factor']]),
  S('mo', 'Respuesta motora (M)', [['6', '6 · Obedece órdenes'], ['5', '5 · Localiza'], ['4', '4 · Flexión normal (retira)'], ['3', '3 · Flexión anormal'], ['2', '2 · Extensión'], ['1', '1 · Ninguna'], ['NT', 'NT · No evaluable (parálisis, sedación/bloqueo)']])
];

/* ---------- NIHSS ---------- */
const UN_AMP = ['UN', 'UN · Amputación o artrodesis (no se suma; consignar motivo)'];
const armO = [['0', '0 · Sin caída: mantiene 90° (o 45°) los 10 s completos', 0], ['1', '1 · Cae: desciende antes de los 10 s sin tocar la cama', 1], ['2', '2 · Algún esfuerzo contra la gravedad: no alcanza o no mantiene la posición, cae a la cama', 2], ['3', '3 · Sin esfuerzo contra la gravedad: el miembro cae', 3], ['4', '4 · Sin movimiento', 4], UN_AMP];
const legO = [['0', '0 · Sin caída: mantiene 30° los 5 s completos', 0], ['1', '1 · Cae antes de los 5 s sin tocar la cama', 1], ['2', '2 · Algún esfuerzo contra la gravedad: cae a la cama antes de los 5 s', 2], ['3', '3 · Sin esfuerzo contra la gravedad: cae inmediatamente', 3], ['4', '4 · Sin movimiento', 4], UN_AMP];
const nihIn = [
  S('n1a', '1a. Nivel de conciencia', [['0', '0 · Alerta, respuestas vivas', 0], ['1', '1 · No alerta, pero despierta con estímulo menor', 1], ['2', '2 · No alerta, requiere estimulación repetida o dolorosa para moverse', 2], ['3', '3 · Solo respuestas reflejas motoras/autonómicas, o arreactivo', 3]]),
  S('n1b', '1b. Preguntas (mes y edad)', [['0', '0 · Ambas correctas', 0], ['1', '1 · Una correcta', 1], ['2', '2 · Ninguna correcta', 2]]),
  S('n1c', '1c. Órdenes (abrir/cerrar ojos, apretar/soltar la mano)', [['0', '0 · Ambas correctas', 0], ['1', '1 · Una correcta', 1], ['2', '2 · Ninguna correcta', 2]]),
  S('n2', '2. Mirada conjugada horizontal', [['0', '0 · Normal', 0], ['1', '1 · Parálisis parcial de la mirada', 1], ['2', '2 · Desviación forzada o parálisis total no vencida por maniobras oculocefálicas', 2]]),
  S('n3', '3. Campos visuales', [['0', '0 · Sin pérdida visual', 0], ['1', '1 · Hemianopsia parcial', 1], ['2', '2 · Hemianopsia completa', 2], ['3', '3 · Hemianopsia bilateral (ceguera, incluida la cortical)', 3]]),
  S('n4', '4. Parálisis facial', [['0', '0 · Movimientos simétricos normales', 0], ['1', '1 · Paresia menor (surco nasogeniano borrado, asimetría al sonreír)', 1], ['2', '2 · Parálisis parcial (total o casi total de la hemicara inferior)', 2], ['3', '3 · Parálisis completa uni o bilateral (superior e inferior)', 3]]),
  S('n5a', '5a. Motor brazo izquierdo', armO), S('n5b', '5b. Motor brazo derecho', armO),
  S('n6a', '6a. Motor pierna izquierda', legO), S('n6b', '6b. Motor pierna derecha', legO),
  S('n7', '7. Ataxia de miembros', [['0', '0 · Ausente (también si no comprende o está pléjico)', 0], ['1', '1 · Presente en un miembro', 1], ['2', '2 · Presente en dos miembros', 2], UN_AMP]),
  S('n8', '8. Sensibilidad', [['0', '0 · Normal, sin pérdida', 0], ['1', '1 · Pérdida leve a moderada', 1], ['2', '2 · Pérdida severa a total', 2]]),
  S('n9', '9. Lenguaje', [['0', '0 · Sin afasia', 0], ['1', '1 · Afasia leve a moderada', 1], ['2', '2 · Afasia severa', 2], ['3', '3 · Mutismo, afasia global', 3]]),
  S('n10', '10. Disartria', [['0', '0 · Normal', 0], ['1', '1 · Leve a moderada', 1], ['2', '2 · Severa (ininteligible) o mutismo/anartria', 2], ['UN', 'UN · Intubado u otra barrera física (no se suma; consignar motivo)']]),
  S('n11', '11. Extinción e inatención (negligencia)', [['0', '0 · Sin alteración', 0], ['1', '1 · Inatención o extinción en una modalidad (visual, táctil, auditiva, espacial o personal)', 1], ['2', '2 · Hemi-inatención profunda o extinción en más de una modalidad', 2]])
];

/* ---------- ASPECTS ---------- */
const ASP = [['C', 'Caudado (C)'], ['L', 'Lenticular (L)'], ['IC', 'Cápsula interna (IC)'], ['I', 'Cinta insular (I)'], ['M1', 'M1 · corteza ACM anterior'], ['M2', 'M2 · corteza ACM lateral al ribete insular'], ['M3', 'M3 · corteza ACM posterior'], ['M4', 'M4 · ACM anterior, nivel supraganglionar'], ['M5', 'M5 · ACM lateral, nivel supraganglionar'], ['M6', 'M6 · ACM posterior, nivel supraganglionar']];
const aspIn = ASP.map(([k, l]) => S('a' + k, l, [['0', 'Normal', 0], ['1', 'Cambio isquémico temprano (hipodensidad o borramiento)', 1]]));

/* ---------- ICH / FUNC ---------- */
const ichIn = [
  S('gcs', 'Glasgow al ingreso', [['a', '13–15', 0], ['b', '5–12', 1], ['c', '3–4', 2]]),
  S('vol', 'Volumen del hematoma (ABC/2)', [['a', '< 30 cm³', 0], ['b', '≥ 30 cm³', 1]]),
  yn('ivh', 'Volcado intraventricular'),
  S('loc', 'Origen', [['a', 'Supratentorial', 0], ['b', 'Infratentorial', 1]]),
  S('age', 'Edad', [['a', '< 80 años', 0], ['b', '≥ 80 años', 1]])
];
const funcIn = [
  S('vol', 'Volumen del hematoma (ABC/2)', [['a', '< 30 cm³', 4], ['b', '30–60 cm³', 2], ['c', '> 60 cm³', 0]]),
  S('age', 'Edad', [['a', '< 70 años', 2], ['b', '70–79 años', 1], ['c', '≥ 80 años', 0]]),
  S('loc', 'Localización', [['a', 'Lobar', 2], ['b', 'Profunda', 1], ['c', 'Infratentorial', 0]]),
  S('gcs', 'Glasgow', [['a', '≥ 9', 2], ['b', '≤ 8', 0]]),
  S('cog', 'Deterioro cognitivo previo al ictus', [['no', 'No', 1], ['si', 'Sí', 0]])
];

/* ---------- ABCD² ---------- */
const abcdIn = [
  S('age', 'A · Edad', [['a', '< 60 años', 0], ['b', '≥ 60 años', 1]]),
  S('bp', 'B · Presión arterial en la primera evaluación', [['a', 'PAS < 140 y PAD < 90 mmHg', 0], ['b', 'PAS ≥ 140 o PAD ≥ 90 mmHg', 1]]),
  S('cl', 'C · Clínica', [['a', 'Otros síntomas', 0], ['b', 'Trastorno del habla sin debilidad', 1], ['c', 'Debilidad unilateral', 2]]),
  S('du', 'D · Duración de los síntomas', [['a', '< 10 min', 0], ['b', '10–59 min', 1], ['c', '≥ 60 min', 2]]),
  yn('dm', 'D · Diabetes')
];

/* ---------- Canadian CT Head ---------- */
const cchrHi = [yn('h1', 'Glasgow < 15 a las 2 h del traumatismo'), yn('h2', 'Sospecha de fractura de cráneo abierta o con hundimiento'), yn('h3', 'Signos de fractura de base de cráneo (hemotímpano, ojos de mapache, otorraquia/rinorraquia de LCR, signo de Battle)'), yn('h4', 'Vómitos ≥ 2 episodios'), yn('h5', 'Edad ≥ 65 años')];
const cchrMd = [yn('m1', 'Amnesia retrógrada (de lo ocurrido antes del impacto) ≥ 30 min'), yn('m2', 'Mecanismo peligroso (peatón embestido por vehículo, eyectado del vehículo, caída de > 3 pies [~0,9 m] o > 5 escalones)')];

/* ---------- New Orleans ---------- */
const nocIn = [yn('c1', 'Cefalea'), yn('c2', 'Vómitos'), yn('c3', 'Edad > 60 años'), yn('c4', 'Intoxicación por drogas o alcohol'), yn('c5', 'Amnesia anterógrada persistente (déficit de memoria de corto plazo)'), yn('c6', 'Trauma visible por encima de las clavículas'), yn('c7', 'Convulsión')];

/* ---------- Canadian C-Spine ---------- */
const ccsHi = [yn('h1', 'Edad ≥ 65 años'), yn('h2', 'Mecanismo peligroso (caída ≥ 3 pies [~0,9 m] o 5 escalones; carga axial sobre la cabeza, p. ej. zambullida; colisión a alta velocidad [> 100 km/h], vuelco o eyección; vehículo recreativo motorizado; colisión en bicicleta)'), yn('h3', 'Parestesias en las extremidades')];
const ccsLo = [yn('l1', 'Colisión simple por alcance posterior (excluye: empujado al tránsito, embestido por colectivo/camión, vuelco, embestido a alta velocidad)'), yn('l2', 'Sentado en la guardia'), yn('l3', 'Deambuló en algún momento tras el trauma'), yn('l4', 'Dolor cervical de comienzo diferido'), yn('l5', 'Ausencia de dolor a la palpación de la línea media cervical')];

/* ---------- NEXUS ---------- */
const nexIn = [yn('x1', 'Dolor a la palpación de la línea media cervical posterior'), yn('x2', 'Evidencia de intoxicación'), yn('x3', 'Alteración del estado de alerta'), yn('x4', 'Déficit neurológico focal'), yn('x5', 'Lesión dolorosa distractora')];

/* ---------- Ottawa ---------- */
const oaIn = [
  H('Tobillo'), yn('t0', 'Dolor en la zona maleolar'), yn('t1', 'Dolor óseo a la palpación del borde posterior o la punta del maléolo externo (6 cm distales)'), yn('t2', 'Dolor óseo a la palpación del borde posterior o la punta del maléolo interno (6 cm distales)'),
  H('Pie'), yn('p0', 'Dolor en la zona del mediopié'), yn('p1', 'Dolor óseo a la palpación de la base del 5.º metatarsiano'), yn('p2', 'Dolor óseo a la palpación del escafoides (navicular)'),
  H('Carga'), yn('w', 'Incapacidad de cargar peso (4 pasos) inmediatamente después del trauma y en la guardia')
];
const okIn = [yn('k1', 'Edad ≥ 55 años'), yn('k2', 'Dolor a la palpación aislado de la rótula (sin otro dolor óseo de la rodilla)'), yn('k3', 'Dolor a la palpación de la cabeza del peroné'), yn('k4', 'Incapacidad de flexionar a 90°'), yn('k5', 'Incapacidad de cargar peso (4 pasos) inmediatamente después del trauma y en la guardia')];

/* ---------- SINS ---------- */
const sinsIn = [
  S('loc', 'Localización', [['a', 'Unión (occipucio–C2, C7–T2, T11–L1, L5–S1)', 3], ['b', 'Columna móvil (C3–C6, L2–L4)', 2], ['c', 'Semirrígida (T3–T10)', 1], ['d', 'Rígida (S2–S5)', 0]]),
  S('pain', 'Dolor', [['a', 'Sí, mecánico (alivia en reposo / empeora con el movimiento o la carga)', 3], ['b', 'Ocasional, no mecánico', 1], ['c', 'Sin dolor', 0]]),
  S('bone', 'Lesión ósea', [['a', 'Lítica', 2], ['b', 'Mixta (lítica/blástica)', 1], ['c', 'Blástica', 0]]),
  S('ali', 'Alineación radiográfica', [['a', 'Subluxación/traslación presente', 4], ['b', 'Deformidad de novo (cifosis/escoliosis)', 2], ['c', 'Normal', 0]]),
  S('col', 'Colapso del cuerpo vertebral', [['a', '> 50 % de colapso', 3], ['b', '< 50 % de colapso', 2], ['c', 'Sin colapso con > 50 % del cuerpo comprometido', 1], ['d', 'Ninguno de los anteriores', 0]]),
  S('pl', 'Compromiso posterolateral (faceta, pedículo o articulación costovertebral: fractura o reemplazo tumoral)', [['a', 'Bilateral', 3], ['b', 'Unilateral', 1], ['c', 'Ninguno', 0]])
];

/* ---------- ASIA ---------- */
const SENS_O = [['0', '0 · Ausente'], ['1', '1 · Alterada'], ['2', '2 · Normal'], ['NT', 'NT · No evaluable']];
const MOT_O = [['0', '0 · Parálisis total'], ['1', '1 · Contracción palpable o visible'], ['2', '2 · Movimiento activo sin gravedad'], ['3', '3 · Contra gravedad'], ['4', '4 · Contra resistencia moderada'], ['5', '5 · Normal'], ['NT', 'NT · No evaluable']];
const SIDE = [['d', 'derecha'], ['i', 'izquierda']];
const asiaIn = [
  H('Motor: músculos clave'),
  ...SIDE.flatMap(([s, sl]) => KEYM.map(([k, n]) => S(`m_${k}${s}`, `${k} ${sl} · ${n}`, MOT_O))),
  H('Contracción anal voluntaria y presión anal profunda'),
  S('vac', 'Contracción anal voluntaria (CAV)', [['si', 'Sí'], ['no', 'No']]),
  S('dap', 'Presión anal profunda (PAP)', [['si', 'Sí'], ['no', 'No']]),
  H('Sensibilidad: tacto fino'),
  ...SIDE.flatMap(([s, sl]) => DERM.map(d => S(`lt_${d}${s}`, `${d} ${sl} · tacto fino`, SENS_O))),
  H('Sensibilidad: pinchazo'),
  ...SIDE.flatMap(([s, sl]) => DERM.map(d => S(`pp_${d}${s}`, `${d} ${sl} · pinchazo`, SENS_O)))
];
const asiaMap = v => {
  const a = { m: {}, lt: {}, pp: {}, vac: v.vac, dap: v.dap };
  SIDE.forEach(([s]) => {
    KEYM.forEach(([k]) => { a.m[k + s] = v[`m_${k}${s}`]; });
    DERM.forEach(d => { a.lt[d + s] = v[`lt_${d}${s}`]; a.pp[d + s] = v[`pp_${d}${s}`]; });
  });
  return a;
};
// generador de casos de prueba: sensibilidad normal hasta `sl` y `below` por debajo; motor por función
const asiaCase = (sl, below, mot, vac, dap) => {
  const v = { vac, dap }, idx = DERM.indexOf(sl);
  SIDE.forEach(([s]) => {
    DERM.forEach((d, i) => { const x = i <= idx ? '2' : below; v[`lt_${d}${s}`] = x; v[`pp_${d}${s}`] = x; });
    KEYM.forEach(([k]) => { v[`m_${k}${s}`] = String(mot(k)); });
  });
  return v;
};
const lvl = l => (l == 'INT' ? 'intacto' : l || '—');

/* ---------- KPS / ECOG ---------- */
const KPS = [[100, 'Normal; sin quejas ni evidencia de enfermedad'], [90, 'Capaz de realizar actividad normal; signos o síntomas menores'], [80, 'Actividad normal con esfuerzo; algunos signos o síntomas'], [70, 'Se vale por sí mismo; incapaz de realizar actividad normal o trabajo activo'], [60, 'Requiere asistencia ocasional, pero puede atender la mayoría de sus necesidades'], [50, 'Requiere asistencia considerable y atención médica frecuente'], [40, 'Discapacitado; requiere cuidados y asistencia especiales'], [30, 'Severamente discapacitado; está indicada la internación, aunque la muerte no es inminente'], [20, 'Muy enfermo; internación necesaria; requiere tratamiento de sostén activo'], [10, 'Moribundo; procesos fatales que progresan rápidamente'], [0, 'Muerte']];

/* ---------- ASA ---------- */
const ASA = [
  ['I', 'ASA I · Paciente sano. Ej.: sano, no fumador, consumo de alcohol nulo o mínimo'],
  ['II', 'ASA II · Enfermedad sistémica leve, sin limitación funcional sustancial. Ej.: tabaquista actual, bebedor social, embarazo, obesidad (IMC 30–40), DBT/HTA bien controladas, enfermedad pulmonar leve'],
  ['III', 'ASA III · Enfermedad sistémica grave, con limitación funcional sustancial. Ej.: DBT o HTA mal controladas, EPOC, obesidad mórbida (IMC ≥ 40), hepatitis activa, dependencia o abuso de alcohol, marcapasos, reducción moderada de la FEy, ERC terminal en diálisis programada, antecedente (> 3 meses) de IAM, ACV, AIT o enfermedad coronaria/stents'],
  ['IV', 'ASA IV · Enfermedad sistémica grave que es una amenaza constante para la vida. Ej.: IAM, ACV, AIT o enfermedad coronaria/stents recientes (< 3 meses), isquemia cardíaca en curso o disfunción valvular grave, reducción grave de la FEy, shock, sepsis, CID, insuficiencia renal aguda o ERC terminal sin diálisis programada'],
  ['V', 'ASA V · Paciente moribundo que no se espera que sobreviva sin la operación. Ej.: aneurisma abdominal/torácico roto, politraumatismo grave, hemorragia intracraneal con efecto de masa, isquemia intestinal con patología cardíaca significativa o disfunción multiorgánica'],
  ['VI', 'ASA VI · Paciente con muerte encefálica declarada cuyos órganos se ablacionan para donación']
];

/* ---------- STOP-Bang ---------- */
const sbStop = [yn('s', 'S · ¿Ronca fuerte (se escucha a través de una puerta cerrada o su pareja lo codea)?'), yn('t', 'T · ¿Se siente cansado o somnoliento durante el día con frecuencia?'), yn('o', 'O · ¿Alguien observó que deja de respirar o se ahoga durante el sueño?'), yn('p', 'P · ¿Tiene o se trata por hipertensión arterial?')];
const sbBang = [yn('b', 'B · IMC > 35 kg/m²'), yn('a', 'A · Edad > 50 años'), yn('n', 'N · Circunferencia de cuello > 40 cm'), yn('g', 'G · Sexo masculino')];

export default [
  /* ======================= NEURO ======================= */
  {
    id: 'gcs', m: 's', cat: 'neuro', tags: ['s:uti', 's:trauma'], n: 'Escala de coma de Glasgow (adultos)', sig: 'GCS', syn: ['glasgow', 'coma'],
    tipo: 'escala clínica', fin: 'Cuantifica el nivel de conciencia por apertura ocular, respuesta verbal y motora.',
    ver: 'Teasdale y Jennett 1974, con la nomenclatura actualizada de Teasdale 2014 (estímulo «a la presión», NT)',
    formula: 'GCS = E (1–4) + V (1–5) + M (1–6); total 3–15. Se registra siempre por componentes (p. ej., E3 V4 M6).\nSi un componente es no evaluable (NT, o V = T en intubados) no se informa un total de 15 puntos: se consignan los componentes.',
    in: gcsIn,
    calc: v => {
      const e = v.e, vb = v.vb, mo = v.mo, comp = `E${e} V${vb} M${mo}`;
      const nums = [e, vb, mo].every(x => /^\d$/.test(String(x)));
      if (nums) {
        const t = +e + +vb + +mo;
        return { r: t, d: 0, lab: 'GCS', u: '/15', more: [['Componentes', comp]], ...band(t, [[13, 15, 'Leve (13–15) en TEC', 'ok'], [9, 12, 'Moderado (9–12) en TEC', 'warn'], [3, 8, 'Grave (≤ 8) en TEC', 'bad']]) };
      }
      const em = /^\d$/.test(String(e)) && /^\d$/.test(String(mo)) ? +e + +mo : null;
      return { r: comp, lab: 'GCS por componentes', lvl: '', interp: 'Total de 15 no calculable: componente no evaluable', more: em != null && vb == 'T' ? [['Suma E + M (con sufijo T)', em + 'T']] : [], note: 'En intubados, las convenciones para informar un total («10T», V = 1) varían entre centros y no forman parte de la escala original; informar los componentes.' };
    },
    ref: 'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. A practical scale. Lancet. 1974;2(7872):81-84. · Teasdale G, Maas A, Lecky F, et al. The Glasgow Coma Scale at 40 years: standing the test of time. Lancet Neurol. 2014;13(8):844-854.',
    url: 'https://www.glasgowcomascale.org/', verif: '2026-10',
    pop: 'Adultos con alteración de la conciencia (traumática o no). Para menores de 2 años existe la versión pediátrica.',
    lim: 'Sedación, bloqueo neuromuscular, intoxicación, afasia, edema palpebral e intubación interfieren. Las bandas leve/moderado/grave son de uso en TEC. La respuesta motora es el componente con mayor valor pronóstico; registrar la mejor respuesta.',
    tests: [{ v: { e: '3', vb: '4', mo: '6' }, r: 13 }, { v: { e: '1', vb: '1', mo: '2' }, r: 4 }, { v: { e: '3', vb: 'T', mo: '5' }, r: 'E3 VT M5' }]
  },
  {
    id: 'four', m: 's', cat: 'neuro', tags: ['s:uti'], n: 'FOUR Score (Full Outline of UnResponsiveness)', sig: 'FOUR', syn: ['four score', 'wijdicks'],
    tipo: 'escala clínica', fin: 'Evalúa el coma con cuatro componentes (ojos, motor, tronco, respiración), útil en pacientes intubados.',
    ver: 'Wijdicks 2005 (Mayo Clinic)', formula: 'Ojos (0–4) + Motor (0–4) + Tronco encefálico (0–4) + Respiración (0–4) = 0–16.',
    in: [
      S('e', 'Respuesta ocular (E)', [['4', '4 · Párpados abiertos o abiertos a la orden; sigue con la mirada o parpadea a la orden', 4], ['3', '3 · Párpados abiertos pero no sigue con la mirada', 3], ['2', '2 · Párpados cerrados, se abren a la voz fuerte', 2], ['1', '1 · Párpados cerrados, se abren al dolor', 1], ['0', '0 · Párpados permanecen cerrados con el dolor', 0]]),
      S('mo', 'Respuesta motora (M)', [['4', '4 · Hace pulgar arriba, puño o signo de la paz a la orden', 4], ['3', '3 · Localiza el dolor', 3], ['2', '2 · Respuesta en flexión al dolor', 2], ['1', '1 · Respuesta en extensión al dolor', 1], ['0', '0 · Sin respuesta al dolor o estado de mioclonías generalizadas', 0]]),
      S('b', 'Reflejos de tronco (B)', [['4', '4 · Reflejos pupilares y corneales presentes', 4], ['3', '3 · Una pupila midriática y fija', 3], ['2', '2 · Reflejo pupilar o corneal ausente', 2], ['1', '1 · Reflejos pupilar y corneal ausentes', 1], ['0', '0 · Reflejos pupilar, corneal y tusígeno ausentes', 0]]),
      S('r', 'Respiración (R)', [['4', '4 · No intubado, patrón respiratorio regular', 4], ['3', '3 · No intubado, respiración de Cheyne-Stokes', 3], ['2', '2 · No intubado, respiración irregular', 2], ['1', '1 · Respira por encima de la frecuencia del respirador', 1], ['0', '0 · Respira a la frecuencia del respirador o apnea', 0]])
    ],
    calc: function (v) { const t = pts(v, this.in); return { r: t, d: 0, u: '/16', lab: 'FOUR', more: [['Componentes', `E${v.e} M${v.mo} B${v.b} R${v.r}`]], note: t === 0 ? 'FOUR 0: obliga a considerar la evaluación de muerte encefálica según protocolo (la escala no la diagnostica).' : '' }; },
    ref: 'Wijdicks EFM, Bamlet WR, Maramattom BV, Manno EM, McClelland RL. Validation of a new coma scale: the FOUR score. Ann Neurol. 2005;58(4):585-593.',
    url: 'https://doi.org/10.1002/ana.20611', verif: '2026-10',
    pop: 'Adultos internados en UTI con alteración de la conciencia (validación en Mayo Clinic, 120 pacientes).',
    lim: 'Sin bandas de gravedad oficiales: interpretar por componentes. Sedación y bloqueo neuromuscular interfieren. No reemplaza al Glasgow en protocolos de TEC.',
    tests: [{ v: { e: '4', mo: '4', b: '4', r: '4' }, r: 16 }, { v: { e: '1', mo: '2', b: '3', r: '1' }, r: 7 }]
  },
  {
    id: 'nihss', m: 's', cat: 'neuro', n: 'NIH Stroke Scale', sig: 'NIHSS', syn: ['nih', 'escala de ictus', 'acv'],
    tipo: 'escala clínica', fin: 'Cuantifica el déficit neurológico en el ACV agudo (15 ítems).',
    ver: 'NIHSS versión NINDS (formulario oficial), ítems 1a–11',
    formula: 'Suma de los 15 ítems (0–42). Los ítems marcados UN (amputación/artrodesis en motor y ataxia; intubación o barrera física en disartria) no se puntúan y se deja constancia del motivo.',
    in: nihIn,
    calc: function (v) {
      const t = pts(v, this.in), un = this.in.filter(i => v[i.id] === 'UN').map(i => i.l.split('.')[0]);
      return { r: t, d: 0, u: '/42', lab: 'NIHSS', interp: 'La escala NINDS no define bandas de gravedad oficiales.', more: un.length ? [['Ítems UN (no sumados)', un.join(', ')]] : [], note: (un.length ? 'Puntaje con ítems no evaluables: el total subestima el déficit en esos dominios. ' : '') + (v.n1a === '3' ? 'Paciente en coma (1a = 3): seguir las instrucciones del formulario NINDS para el resto de los ítems.' : '') };
    },
    ref: 'Brott T, Adams HP Jr, Olinger CP, et al. Measurements of acute cerebral infarction: a clinical examination scale. Stroke. 1989;20(7):864-870. · National Institute of Neurological Disorders and Stroke. NIH Stroke Scale (formulario oficial).',
    url: 'https://www.ninds.nih.gov/health-information/stroke/assess-and-treat/nih-stroke-scale', verif: '2026-10',
    pop: 'Adultos con ACV agudo (isquémico o hemorrágico); usada en ensayos y para decisiones de reperfusión.',
    lim: 'Puntuar lo que el paciente hace, no lo que se cree que podría hacer; registrar en orden y sin volver atrás. Subestima déficits de circulación posterior. Requiere entrenamiento/certificación para buena confiabilidad.',
    tests: [
      { v: { n1a: '0', n1b: '0', n1c: '0', n2: '0', n3: '0', n4: '0', n5a: '0', n5b: '0', n6a: '0', n6b: '0', n7: '0', n8: '0', n9: '0', n10: '0', n11: '0' }, r: 0 },
      { v: { n1a: '1', n1b: '2', n1c: '1', n2: '2', n3: '2', n4: '2', n5a: '0', n5b: '4', n6a: '0', n6b: '3', n7: '0', n8: '2', n9: '3', n10: 'UN', n11: '1' }, r: 23 }
    ]
  },
  {
    id: 'aspects', m: 's', cat: 'neuro', n: 'ASPECTS (Alberta Stroke Program Early CT Score)', sig: 'ASPECTS', syn: ['alberta'],
    tipo: 'score pronóstico', fin: 'Cuantifica los cambios isquémicos tempranos en la TC sin contraste en el territorio de la ACM.',
    ver: 'Barber 2000 (TC sin contraste, territorio de la ACM)',
    formula: 'Se parte de 10 y se resta 1 por cada una de las 10 regiones con cambio isquémico temprano (2 cortes axiales: ganglionar y supraganglionar).',
    in: aspIn,
    calc: function (v) {
      const inv = this.in.filter(i => v[i.id] === '1').map(i => i.l.split(' ')[0]), t = 10 - pts(v, this.in);
      return { r: t, d: 0, u: '/10', lab: 'ASPECTS', interp: t <= 7 ? 'ASPECTS ≤ 7: en la serie original se asoció a peor evolución funcional y mayor riesgo de hemorragia sintomática tras trombólisis' : 'ASPECTS > 7', lvl: t <= 7 ? 'bad' : 'ok', more: inv.length ? [['Regiones afectadas', inv.join(', ')]] : [] };
    },
    ref: 'Barber PA, Demchuk AM, Zhang J, Buchan AM. Validity and reliability of a quantitative computed tomography score in predicting outcome of hyperacute stroke before thrombolytic therapy. Lancet. 2000;355(9216):1670-1674.',
    url: 'https://doi.org/10.1016/S0140-6736(00)02237-6', verif: '2026-10',
    pop: 'ACV isquémico agudo de circulación anterior (ACM), TC sin contraste en las primeras horas.',
    lim: 'Solo territorio de la ACM (para circulación posterior existe pc-ASPECTS). Variabilidad interobservador; depende de la ventana y del tiempo de evolución. Los umbrales para trombectomía dependen de cada guía/ensayo.',
    tests: [{ v: Object.fromEntries(ASP.map(([k]) => ['a' + k, '0'])), r: 10 }, { v: { ...Object.fromEntries(ASP.map(([k]) => ['a' + k, '0'])), aL: '1', aI: '1', aM2: '1', aM5: '1' }, r: 6 }]
  },
  {
    id: 'hunt-hess', m: 's', cat: 'neuro', n: 'Escala de Hunt y Hess', sig: 'HH', syn: ['hunt hess', 'hsa', 'hemorragia subaracnoidea'],
    tipo: 'clasificación', fin: 'Gradúa la gravedad clínica de la hemorragia subaracnoidea aneurismática.',
    ver: 'Hunt y Hess 1968 (con el modificador original por enfermedad sistémica o vasoespasmo)',
    formula: 'Grado I–V según la clínica. Según el trabajo original, la enfermedad sistémica grave (HTA, DBT, arterioesclerosis severa, EPOC) o el vasoespasmo severo en la arteriografía ubican al paciente en la categoría siguiente, menos favorable.',
    in: [
      S('g', 'Cuadro clínico', [['1', 'I · Asintomático, o cefalea mínima y leve rigidez de nuca'], ['2', 'II · Cefalea moderada a severa, rigidez de nuca, sin déficit neurológico salvo parálisis de par craneal'], ['3', 'III · Somnolencia, confusión o déficit focal leve'], ['4', 'IV · Estupor, hemiparesia moderada a severa, posible rigidez de descerebración temprana y trastornos vegetativos'], ['5', 'V · Coma profundo, rigidez de descerebración, aspecto moribundo']]),
      yn('mod', 'Enfermedad sistémica grave o vasoespasmo severo en la arteriografía (modificador original)')
    ],
    calc: v => { const R = ['I', 'II', 'III', 'IV', 'V']; const g = Math.min(5, +v.g + (si(v, 'mod') ? 1 : 0)); return { r: 'Grado ' + R[g - 1], lvl: g >= 4 ? 'bad' : g == 3 ? 'warn' : 'ok', more: si(v, 'mod') ? [['Grado clínico sin modificador', R[+v.g - 1]]] : [], note: si(v, 'mod') ? 'Muchas series actuales informan el grado sin el modificador: aclarar cuál se usa.' : '' }; },
    ref: 'Hunt WE, Hess RM. Surgical risk as related to time of intervention in the repair of intracranial aneurysms. J Neurosurg. 1968;28(1):14-20.',
    url: 'https://doi.org/10.3171/jns.1968.28.1.0014', verif: '2026-10',
    pop: 'Hemorragia subaracnoidea aneurismática; se diseñó para estimar el riesgo quirúrgico.',
    lim: 'Términos subjetivos (somnolencia, estupor) con variabilidad interobservador. Graduar tras la reanimación inicial; puede cambiar con hidrocefalia o resangrado.',
    tests: [{ v: { g: '2', mod: 'no' }, r: 'Grado II' }, { v: { g: '4', mod: 'si' }, r: 'Grado V' }, { v: { g: '5', mod: 'si' }, r: 'Grado V' }]
  },
  {
    id: 'wfns', m: 's', cat: 'neuro', n: 'Escala WFNS para hemorragia subaracnoidea', sig: 'WFNS', syn: ['world federation', 'hsa'],
    tipo: 'clasificación', fin: 'Gradúa la HSA aneurismática según el Glasgow y la presencia de déficit motor.',
    ver: 'WFNS 1988 (Drake, comité de la World Federation of Neurosurgical Societies)',
    formula: 'I: GCS 15 sin déficit motor · II: GCS 13–14 sin déficit · III: GCS 13–14 con déficit · IV: GCS 7–12 con o sin déficit · V: GCS 3–6 con o sin déficit.',
    in: [{ t: 'num', id: 'gcs', l: 'Glasgow', u: 'puntos', min: 3, max: 15, step: 1 }, S('mot', 'Déficit motor mayor (focal)', [['no', 'Ausente'], ['si', 'Presente']])],
    calc: v => {
      const g = Math.round(v.gcs), d = v.mot === 'si';
      let r;
      if (g <= 6) r = 'V'; else if (g <= 12) r = 'IV'; else if (g <= 14) r = d ? 'III' : 'II'; else r = d ? null : 'I';
      if (!r) return { r: 'No definido', lvl: 'warn', interp: 'La escala original no define la combinación GCS 15 con déficit motor', note: 'Consignar GCS y déficit por separado.' };
      return { r: 'Grado ' + r, lvl: r == 'IV' || r == 'V' ? 'bad' : r == 'III' ? 'warn' : 'ok' };
    },
    ref: 'Drake CG. Report of World Federation of Neurological Surgeons Committee on a Universal Subarachnoid Hemorrhage Grading Scale. J Neurosurg. 1988;68(6):985-986.',
    url: 'https://doi.org/10.3171/jns.1988.68.6.0985', verif: '2026-10',
    pop: 'Hemorragia subaracnoidea aneurismática.',
    lim: 'Graduar tras la reanimación inicial. El déficit motor se refiere a déficit focal mayor (no a paresia de par craneal). Gran heterogeneidad pronóstica dentro del grado IV.',
    tests: [{ v: { gcs: 14, mot: 'si' }, r: 'Grado III' }, { v: { gcs: 15, mot: 'no' }, r: 'Grado I' }, { v: { gcs: 9, mot: 'no' }, r: 'Grado IV' }]
  },
  {
    id: 'fisher-mod', m: 's', cat: 'neuro', n: 'Escala de Fisher modificada', sig: 'mFisher', syn: ['fisher', 'claassen', 'vasoespasmo'],
    tipo: 'clasificación', fin: 'Clasifica la HSA en la TC según el espesor del sangrado y la presencia de hemorragia intraventricular, para estimar riesgo de vasoespasmo.',
    ver: 'Fisher modificada (Frontera 2006)',
    formula: 'Grado 0–4 según HSA (ausente / fina / gruesa) y hemorragia intraventricular (HIV) en ventrículos laterales. HSA gruesa: llena por completo al menos una cisterna o cisura.',
    in: [S('g', 'Hallazgo en la TC', [['0', '0 · Sin HSA ni HIV'], ['1', '1 · HSA focal o difusa fina, sin HIV'], ['2', '2 · HSA focal o difusa fina, con HIV'], ['3', '3 · HSA gruesa (focal o difusa), sin HIV'], ['4', '4 · HSA gruesa (focal o difusa), con HIV']])],
    calc: v => ({ r: 'Grado ' + v.g, interp: 'El riesgo de vasoespasmo sintomático aumenta con el grado (Frontera 2006)', lvl: +v.g >= 3 ? 'bad' : +v.g >= 1 ? 'warn' : 'ok' }),
    ref: 'Frontera JA, Claassen J, Schmidt JM, et al. Prediction of symptomatic vasospasm after subarachnoid hemorrhage: the modified Fisher scale. Neurosurgery. 2006;59(1):21-27.',
    url: 'https://doi.org/10.1227/01.NEU.0000218821.34014.1B', verif: '2026-10',
    pop: 'HSA aneurismática; TC inicial.',
    lim: 'Se basa en la TC de ingreso (idealmente < 72 h). No se muestran porcentajes de vasoespasmo por grado porque no pudieron verificarse contra el texto original. No confundir con la escala de Fisher original (1980).',
    tests: [{ v: { g: '3' }, r: 'Grado 3' }, { v: { g: '0' }, r: 'Grado 0' }]
  },
  {
    id: 'ich-score', m: 's', cat: 'neuro', n: 'ICH Score (hemorragia intracerebral)', sig: 'ICH', syn: ['hemphill', 'hic', 'hematoma intraparenquimatoso'],
    tipo: 'score pronóstico', fin: 'Estima la mortalidad a 30 días en la hemorragia intracerebral espontánea.',
    ver: 'Hemphill 2001', formula: 'GCS 3–4: 2 · GCS 5–12: 1 · volumen ≥ 30 cm³: 1 · volcado ventricular: 1 · origen infratentorial: 1 · edad ≥ 80: 1 (total 0–6).',
    in: ichIn,
    calc: function (v) { const t = pts(v, this.in), M = ['0 %', '13 %', '26 %', '72 %', '97 %', '100 %', 'sin pacientes en la serie (se estima 100 %)']; return { r: t, d: 0, u: '/6', lab: 'ICH Score', interp: 'Mortalidad a 30 días en la cohorte de derivación: ' + M[t], lvl: t >= 3 ? 'bad' : t >= 1 ? 'warn' : 'ok' }; },
    ref: 'Hemphill JC 3rd, Bonovich DC, Besmertis L, Manley GT, Johnston SC. The ICH score: a simple, reliable grading scale for intracerebral hemorrhage. Stroke. 2001;32(4):891-897.',
    url: 'https://doi.org/10.1161/01.STR.32.4.891', verif: '2026-10',
    pop: 'Hemorragia intracerebral espontánea (no traumática) en adultos; cohorte de derivación de 152 pacientes.',
    lim: 'Las limitaciones del soporte vital en la cohorte pueden haber influido en la mortalidad (profecía autocumplida). No usar como único criterio para limitar el tratamiento. Volumen por ABC/2 en la TC inicial.',
    tests: [{ v: { gcs: 'b', vol: 'b', ivh: 'si', loc: 'a', age: 'a' }, r: 3 }, { v: { gcs: 'a', vol: 'a', ivh: 'no', loc: 'a', age: 'a' }, r: 0 }, { v: { gcs: 'c', vol: 'b', ivh: 'si', loc: 'b', age: 'b' }, r: 6 }]
  },
  {
    id: 'func-score', m: 's', cat: 'neuro', n: 'FUNC Score (hemorragia intracerebral)', sig: 'FUNC', syn: ['rost', 'hic', 'independencia funcional'],
    tipo: 'score pronóstico', fin: 'Estima la probabilidad de independencia funcional a 90 días tras una hemorragia intracerebral.',
    ver: 'Rost 2008', formula: 'Volumen < 30: 4, 30–60: 2, > 60 cm³: 0 · edad < 70: 2, 70–79: 1, ≥ 80: 0 · lobar: 2, profunda: 1, infratentorial: 0 · GCS ≥ 9: 2, ≤ 8: 0 · sin deterioro cognitivo previo: 1 (total 0–11; mayor = mejor).',
    in: funcIn,
    calc: function (v) {
      const t = pts(v, this.in);
      const p = t <= 4 ? '0 %' : t <= 7 ? '13 %' : t == 8 ? '42 %' : t <= 10 ? '66 %' : '82 %';
      return { r: t, d: 0, u: '/11', lab: 'FUNC', interp: `Independencia funcional (GOS ≥ 4) a 90 días: ${p} de los pacientes con ese puntaje en la serie original`, lvl: t <= 7 ? 'bad' : t <= 8 ? 'warn' : 'ok' };
    },
    ref: 'Rost NS, Smith EE, Chang Y, et al. Prediction of functional outcome in patients with primary intracerebral hemorrhage: the FUNC score. Stroke. 2008;39(8):2304-2309.',
    url: 'https://doi.org/10.1161/STROKEAHA.107.512202', verif: '2026-10',
    pop: 'Hemorragia intracerebral primaria en adultos (cohorte de 629 pacientes, Massachusetts General Hospital).',
    lim: 'Grupos de probabilidad: 0–4, 5–7, 8, 9–10 y 11 (serie completa). Afectado por las decisiones de limitación terapéutica. No usar como único criterio de pronóstico individual.',
    tests: [{ v: { vol: 'a', age: 'a', loc: 'a', gcs: 'a', cog: 'no' }, r: 11 }, { v: { vol: 'b', age: 'b', loc: 'b', gcs: 'b', cog: 'no' }, r: 5 }]
  },
  {
    id: 'mrs', m: 's', cat: 'neuro', n: 'Escala de Rankin modificada', sig: 'mRS', syn: ['rankin', 'discapacidad'],
    tipo: 'escala clínica', fin: 'Mide el grado de discapacidad o dependencia global, sobre todo tras un ACV.',
    ver: 'Rankin modificada (van Swieten 1988)', formula: 'Grado único 0–6 según el nivel funcional global.',
    in: [S('g', 'Nivel funcional', [['0', '0 · Sin síntomas'], ['1', '1 · Sin discapacidad significativa pese a los síntomas: puede realizar sus tareas y actividades habituales'], ['2', '2 · Discapacidad leve: incapaz de realizar todas sus actividades previas, pero se vale por sí mismo sin ayuda'], ['3', '3 · Discapacidad moderada: requiere alguna ayuda, pero camina sin asistencia'], ['4', '4 · Discapacidad moderadamente grave: no camina sin asistencia y no puede atender sus necesidades corporales sin ayuda'], ['5', '5 · Discapacidad grave: postrado, incontinente, requiere cuidados de enfermería y atención constantes'], ['6', '6 · Muerte']])],
    calc: v => ({ r: +v.g, d: 0, lab: 'mRS', interp: v.g <= 2 ? 'mRS 0–2: independencia funcional (punto de corte habitual en ensayos)' : 'mRS ≥ 3: dependencia o muerte', lvl: v.g <= 2 ? 'ok' : 'bad' }),
    ref: 'van Swieten JC, Koudstaal PJ, Visser MC, Schouten HJ, van Gijn J. Interobserver agreement for the assessment of handicap in stroke patients. Stroke. 1988;19(5):604-607.',
    url: 'https://doi.org/10.1161/01.STR.19.5.604', verif: '2026-10',
    pop: 'Pacientes con ACV u otras lesiones neurológicas; desenlace estándar en ensayos de ACV.',
    lim: 'Variabilidad interobservador (mejora con entrevista estructurada). Mide discapacidad global, no la causa. El corte 0–2 vs. 3–6 es una convención de ensayos, no parte de la escala.',
    tests: [{ v: { g: '3' }, r: 3 }, { v: { g: '1' }, r: 1 }]
  },
  {
    id: 'abcd2', m: 's', cat: 'neuro', n: 'ABCD² (riesgo de ACV tras AIT)', sig: 'ABCD²', syn: ['abcd2', 'ait', 'accidente isquemico transitorio'],
    tipo: 'score pronóstico', fin: 'Estima el riesgo temprano de ACV tras un accidente isquémico transitorio.',
    ver: 'Johnston 2007', formula: 'Edad ≥ 60: 1 · PA ≥ 140/90: 1 · debilidad unilateral: 2 (trastorno del habla sin debilidad: 1) · duración ≥ 60 min: 2 (10–59 min: 1) · diabetes: 1 (total 0–7).',
    in: abcdIn,
    calc: function (v) {
      const t = pts(v, this.in);
      const g = t <= 3 ? ['bajo (0–3)', '1,0 %', '1,2 %', '3,1 %', 'ok'] : t <= 5 ? ['moderado (4–5)', '4,1 %', '5,9 %', '9,8 %', 'warn'] : ['alto (6–7)', '8,1 %', '11,7 %', '17,8 %', 'bad'];
      return { r: t, d: 0, u: '/7', lab: 'ABCD²', interp: 'Riesgo ' + g[0], lvl: g[4], more: [['ACV a 2 días', g[1]], ['ACV a 7 días', g[2]], ['ACV a 90 días', g[3]]] };
    },
    ref: 'Johnston SC, Rothwell PM, Nguyen-Huynh MN, et al. Validation and refinement of scores to predict very early stroke risk after transient ischaemic attack. Lancet. 2007;369(9558):283-292.',
    url: 'https://doi.org/10.1016/S0140-6736(07)60150-0', verif: '2026-10',
    pop: 'Pacientes con AIT diagnosticado clínicamente (cohortes de EE. UU. y Reino Unido).',
    lim: 'Las guías actuales desaconsejan usarlo solo para decidir internación o estudios: un puntaje bajo no excluye estenosis carotídea, FA u otra causa de alto riesgo. Riesgos de la validación combinada original.',
    tests: [{ v: { age: 'b', bp: 'b', cl: 'c', du: 'c', dm: 'si' }, r: 7 }, { v: { age: 'b', bp: 'a', cl: 'b', du: 'b', dm: 'no' }, r: 3 }]
  },
  {
    id: 'canadian-ct-head', m: 's', cat: 'neuro', tags: ['s:trauma'], n: 'Regla canadiense de TC de cráneo', sig: 'CCHR', syn: ['canadian ct head rule', 'tec leve', 'tomografia craneo'],
    tipo: 'regla de decisión', fin: 'Identifica a qué pacientes con TEC leve se les debe hacer TC de cerebro.',
    ver: 'Stiell 2001',
    formula: 'TC indicada si hay ≥ 1 criterio de alto riesgo (de intervención neuroquirúrgica) o de riesgo medio (de lesión cerebral en TC).\nInclusión: TEC cerrado con pérdida de conciencia, amnesia definida o desorientación presenciada, GCS 13–15, dentro de las 24 h.\nExclusión: < 16 años, TEC mínimo (sin los anteriores), sin historia clara de trauma, lesión penetrante o fractura con hundimiento evidente, déficit focal agudo, inestabilidad hemodinámica por trauma mayor, convulsión previa a la evaluación, coagulopatía o anticoagulación oral, reconsulta por el mismo trauma, embarazo.',
    in: [S('apl', '¿Cumple los criterios de inclusión y ninguno de exclusión?', [['si', 'Sí'], ['no', 'No']]), H('Alto riesgo'), ...cchrHi, H('Riesgo medio'), ...cchrMd],
    calc: v => {
      if (v.apl !== 'si') return { r: 'Regla no aplicable', lvl: 'warn', interp: 'El paciente no cumple los criterios de la regla: decidir la TC por criterio clínico' };
      const hi = met(v, cchrHi), md = met(v, cchrMd);
      if (hi.length || md.length) return { r: 'Regla positiva: TC indicada', lvl: 'bad', interp: hi.length ? 'Alto riesgo de necesidad de intervención neuroquirúrgica' : 'Riesgo medio: lesión cerebral clínicamente importante en la TC', more: [...hi.map(x => ['Alto riesgo', x]), ...md.map(x => ['Riesgo medio', x])] };
      return { r: 'Regla negativa', lvl: 'ok', interp: 'Ningún criterio de riesgo: la regla no indica TC' };
    },
    ref: 'Stiell IG, Wells GA, Vandemheen K, et al. The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001;357(9266):1391-1396.',
    url: 'https://doi.org/10.1016/S0140-6736(00)04561-X', verif: '2026-10',
    pop: 'Adultos (≥ 16 años) con TEC leve (GCS 13–15) y pérdida de conciencia, amnesia o desorientación, en las primeras 24 h.',
    lim: 'No aplica a anticoagulados ni a pacientes con coagulopatía, convulsión o déficit focal. La regla no reemplaza el juicio clínico ni la observación.',
    tests: [{ v: { apl: 'si', h1: 'no', h2: 'no', h3: 'no', h4: 'no', h5: 'si', m1: 'no', m2: 'no' }, r: 'positiva' }, { v: { apl: 'si', h1: 'no', h2: 'no', h3: 'no', h4: 'no', h5: 'no', m1: 'no', m2: 'no' }, r: 'negativa' }, { v: { apl: 'no', h1: 'no', h2: 'no', h3: 'no', h4: 'no', h5: 'no', m1: 'no', m2: 'no' }, r: 'no aplicable' }]
  },
  {
    id: 'new-orleans', m: 's', cat: 'neuro', tags: ['s:trauma'], n: 'Criterios de Nueva Orleans (TEC leve)', sig: 'NOC', syn: ['new orleans criteria', 'tec leve', 'haydel'],
    tipo: 'regla de decisión', fin: 'Identifica qué pacientes con TEC leve y GCS 15 requieren TC de cerebro.',
    ver: 'Haydel 2000', formula: 'TC indicada si hay ≥ 1 de: cefalea, vómitos, edad > 60, intoxicación por drogas/alcohol, amnesia anterógrada persistente, trauma visible por encima de las clavículas, convulsión.\nAplica a TEC cerrado con pérdida de conciencia, GCS 15 y examen neurológico normal.',
    in: [S('apl', '¿TEC cerrado con pérdida de conciencia, GCS 15 y examen neurológico normal?', [['si', 'Sí'], ['no', 'No']]), ...nocIn],
    calc: v => {
      if (v.apl !== 'si') return { r: 'Regla no aplicable', lvl: 'warn', interp: 'La regla solo se validó en GCS 15 con pérdida de conciencia y examen normal' };
      const c = met(v, nocIn);
      return c.length ? { r: 'Regla positiva: TC indicada', lvl: 'bad', more: c.map(x => ['Criterio', x]) } : { r: 'Regla negativa', lvl: 'ok', interp: 'Ningún criterio presente: la regla no indica TC' };
    },
    ref: 'Haydel MJ, Preston CA, Mills TJ, Luber S, Blaudeau E, DeBlieux PM. Indications for computed tomography in patients with minor head injury. N Engl J Med. 2000;343(2):100-105.',
    url: 'https://doi.org/10.1056/NEJM200007133430204', verif: '2026-10',
    pop: 'Pacientes ≥ 3 años con TEC cerrado, pérdida de conciencia, GCS 15 y examen neurológico normal, dentro de las 24 h.',
    lim: 'Muy sensible pero poco específica (más TC que la regla canadiense). No aplica a GCS < 15 ni a pacientes sin pérdida de conciencia.',
    tests: [{ v: { apl: 'si', c1: 'si', c2: 'no', c3: 'no', c4: 'no', c5: 'no', c6: 'no', c7: 'no' }, r: 'positiva' }, { v: { apl: 'si', c1: 'no', c2: 'no', c3: 'no', c4: 'no', c5: 'no', c6: 'no', c7: 'no' }, r: 'negativa' }]
  },
  {
    id: 'rotterdam', m: 's', cat: 'neuro', tags: ['s:trauma'], n: 'Rotterdam CT Score', sig: '', syn: ['rotterdam', 'tec grave', 'tomografia'],
    tipo: 'score pronóstico', fin: 'Clasifica la TC en el TEC y estima la mortalidad a 6 meses.',
    ver: 'Maas 2005', formula: 'Cisternas basales (normales 0, comprimidas 1, ausentes 2) + desviación de línea media (≤ 5 mm 0, > 5 mm 1) + lesión de masa epidural (presente 0, ausente 1) + HIV o HSA traumática (ausente 0, presente 1) + 1 → total 1–6. Una TC normal suma 2.',
    in: [
      S('cis', 'Cisternas basales', [['a', 'Normales', 0], ['b', 'Comprimidas', 1], ['c', 'Ausentes', 2]]),
      S('ms', 'Desviación de la línea media', [['a', 'Sin desviación o ≤ 5 mm', 0], ['b', '> 5 mm', 1]]),
      S('epi', 'Lesión de masa epidural', [['a', 'Presente', 0], ['b', 'Ausente', 1]]),
      S('ivh', 'Hemorragia intraventricular o HSA traumática', [['a', 'Ausente', 0], ['b', 'Presente', 1]])
    ],
    calc: function (v) { const t = pts(v, this.in) + 1, M = ['0 %', '7 %', '16 %', '26 %', '53 %', '61 %']; return { r: t, d: 0, u: '/6', lab: 'Rotterdam', interp: 'Mortalidad a 6 meses (serie de derivación, adultos): ' + M[t - 1], lvl: t >= 5 ? 'bad' : t >= 3 ? 'warn' : 'ok' }; },
    ref: 'Maas AIR, Hukkelhoven CWPM, Marshall LF, Steyerberg EW. Prediction of outcome in traumatic brain injury with computed tomographic characteristics: a comparison between the computed tomographic classification and combinations of computed tomographic predictors. Neurosurgery. 2005;57(6):1173-1182.',
    url: 'https://doi.org/10.1227/01.NEU.0000186013.63046.6B', verif: '2026-10',
    pop: 'TEC moderado a grave (cohorte de ensayos de tirilazad, adultos).',
    lim: 'Mortalidades de la serie original (verificadas con fuente secundaria: Radiopaedia); no considera clínica (edad, pupilas, GCS), que se integran en modelos como IMPACT o CRASH.',
    tests: [{ v: { cis: 'a', ms: 'a', epi: 'b', ivh: 'a' }, r: 2 }, { v: { cis: 'c', ms: 'b', epi: 'b', ivh: 'b' }, r: 6 }]
  },
  {
    id: 'marshall', m: 's', cat: 'neuro', tags: ['s:trauma'], n: 'Clasificación tomográfica de Marshall', sig: 'Marshall', syn: ['marshall', 'tcdb', 'tec'],
    tipo: 'clasificación', fin: 'Clasifica la TC en el TEC según la lesión difusa y las lesiones de masa.',
    ver: 'Marshall 1991 (Traumatic Coma Data Bank)', formula: 'Seis categorías según cisternas, desviación de línea media y lesiones hiperdensas o mixtas > 25 mL (evacuadas o no).',
    in: [S('g', 'Hallazgo en la TC', [['I', 'I · Lesión difusa I: sin patología intracraneal visible'], ['II', 'II · Lesión difusa II: cisternas presentes, desviación 0–5 mm y/o lesiones presentes, sin lesión hiperdensa o mixta > 25 mL (puede incluir fragmentos óseos y cuerpos extraños)'], ['III', 'III · Lesión difusa III (tumefacción): cisternas comprimidas o ausentes, desviación 0–5 mm, sin lesión hiperdensa o mixta > 25 mL'], ['IV', 'IV · Lesión difusa IV (desviación): desviación > 5 mm, sin lesión hiperdensa o mixta > 25 mL'], ['V', 'V · Lesión de masa evacuada: cualquier lesión evacuada quirúrgicamente'], ['VI', 'VI · Lesión de masa no evacuada: lesión hiperdensa o mixta > 25 mL no evacuada']])],
    calc: v => ({ r: 'Marshall ' + v.g, lvl: ['I', 'II'].includes(v.g) ? 'ok' : 'bad' }),
    ref: 'Marshall LF, Marshall SB, Klauber MR, et al. A new classification of head injury based on computerized tomography. J Neurosurg. 1991;75(Suppl):S14-S20.',
    url: 'https://doi.org/10.3171/sup.1991.75.1s.0s14', verif: '2026-10',
    pop: 'TEC grave (Traumatic Coma Data Bank).',
    lim: 'Clasificación descriptiva; no incluye HSA traumática ni hemorragia intraventricular (sí el Rotterdam). No se muestran desenlaces por categoría. Reclasificar con TC de control.',
    tests: [{ v: { g: 'III' }, r: 'Marshall III' }, { v: { g: 'VI' }, r: 'Marshall VI' }]
  },
  {
    id: 'rass', m: 's', cat: 'neuro', tags: ['s:uti'], n: 'Escala de agitación-sedación de Richmond', sig: 'RASS', syn: ['richmond', 'sedacion', 'agitacion'],
    tipo: 'escala clínica', fin: 'Mide el nivel de agitación o sedación en pacientes críticos.',
    ver: 'Sessler 2002', formula: 'Observación (+4 a 0) → si no está alerta, estímulo verbal (−1 a −3) → si no responde, estímulo físico (−4 a −5).',
    in: [S('g', 'Nivel', [['4', '+4 · Combativo: violento, peligro inmediato para el personal'], ['3', '+3 · Muy agitado: se tira o se quita tubos o catéteres; agresivo'], ['2', '+2 · Agitado: movimientos frecuentes sin propósito, lucha con el respirador'], ['1', '+1 · Inquieto: ansioso, movimientos no agresivos ni vigorosos'], ['0', '0 · Alerta y tranquilo'], ['-1', '−1 · Somnoliento: no del todo alerta, se mantiene despierto > 10 s (apertura ocular y contacto visual) a la voz'], ['-2', '−2 · Sedación leve: despierta brevemente a la voz, contacto visual < 10 s'], ['-3', '−3 · Sedación moderada: movimiento o apertura ocular a la voz, sin contacto visual'], ['-4', '−4 · Sedación profunda: sin respuesta a la voz; movimiento o apertura ocular al estímulo físico'], ['-5', '−5 · No despertable: sin respuesta a la voz ni al estímulo físico']])],
    calc: v => { const g = +v.g; return { r: (g > 0 ? '+' : '') + g, lab: 'RASS', interp: g > 0 ? 'Agitación' : g == 0 ? 'Alerta y tranquilo' : g >= -3 ? 'Sedación' : 'Sedación profunda / no despertable (CAM-ICU no evaluable)', lvl: g == 0 ? 'ok' : Math.abs(g) >= 3 ? 'bad' : 'warn' }; },
    ref: 'Sessler CN, Gosnell MS, Grap MJ, et al. The Richmond Agitation-Sedation Scale: validity and reliability in adult intensive care unit patients. Am J Respir Crit Care Med. 2002;166(10):1338-1344.',
    url: 'https://doi.org/10.1164/rccm.2107138', verif: '2026-10',
    pop: 'Adultos en UTI, ventilados o no.',
    lim: 'El objetivo de sedación depende de la indicación (p. ej., RASS 0 a −2 en sedación liviana). Paso previo obligatorio del CAM-ICU.',
    tests: [{ v: { g: '-2' }, r: '-2' }, { v: { g: '3' }, r: '+3' }]
  },
  {
    id: 'cam-icu', m: 's', cat: 'neuro', tags: ['s:uti'], n: 'CAM-ICU (delirio en UTI)', sig: 'CAM-ICU', syn: ['delirio', 'confusion assessment method'],
    tipo: 'criterio diagnóstico', fin: 'Detecta delirio en pacientes críticos, incluso ventilados.',
    ver: 'Ely 2001; algoritmo del manual de entrenamiento CAM-ICU (errores > 2 en atención)',
    formula: 'Requiere RASS ≥ −3. Delirio = característica 1 (comienzo agudo o curso fluctuante) + característica 2 (inatención) + [característica 3 (nivel de conciencia alterado: RASS ≠ 0) o característica 4 (pensamiento desorganizado)].',
    in: [
      S('rass', 'RASS actual', [['4', '+4'], ['3', '+3'], ['2', '+2'], ['1', '+1'], ['0', '0'], ['-1', '−1'], ['-2', '−2'], ['-3', '−3'], ['-4', '−4'], ['-5', '−5']]),
      S('f1', '1 · Cambio agudo respecto del estado mental basal o curso fluctuante en las últimas 24 h', [['no', 'No'], ['si', 'Sí']]),
      S('f2', '2 · Inatención: errores al apretar con la «A» (SAVEAHAART)', [['no', '0–2 errores'], ['si', '> 2 errores']]),
      S('f4', '4 · Pensamiento desorganizado: errores en las 4 preguntas sí/no + la orden', [['no', '0–1 error'], ['si', '> 1 error']])
    ],
    calc: v => {
      const r = +v.rass;
      if (r <= -4) return { r: 'No evaluable', lvl: 'warn', interp: 'RASS −4 o −5: reevaluar cuando el paciente esté más despierto' };
      const f3 = r !== 0, pos = si(v, 'f1') && si(v, 'f2') && (f3 || si(v, 'f4'));
      return { r: pos ? 'CAM-ICU positivo' : 'CAM-ICU negativo', lvl: pos ? 'bad' : 'ok', interp: pos ? 'Delirio presente' : 'Sin delirio en esta evaluación', more: [['Característica 3 (RASS ≠ 0)', f3 ? 'Presente' : 'Ausente']] };
    },
    ref: 'Ely EW, Inouye SK, Bernard GR, et al. Delirium in mechanically ventilated patients: validity and reliability of the Confusion Assessment Method for the Intensive Care Unit (CAM-ICU). JAMA. 2001;286(21):2703-2710.',
    url: 'https://www.icudelirium.org/medical-professionals/delirium/monitoring-delirium-in-the-icu', verif: '2026-10',
    pop: 'Adultos en UTI, ventilados o no, con RASS ≥ −3.',
    lim: 'Evaluación puntual: el delirio fluctúa, repetir al menos una vez por turno. La sordera, la ceguera o el idioma pueden dificultar las pruebas. Es una herramienta de detección, no un diagnóstico etiológico.',
    tests: [{ v: { rass: '-1', f1: 'si', f2: 'si', f4: 'no' }, r: 'positivo' }, { v: { rass: '0', f1: 'si', f2: 'si', f4: 'no' }, r: 'negativo' }, { v: { rass: '-4', f1: 'si', f2: 'si', f4: 'si' }, r: 'No evaluable' }]
  },
  {
    id: 'asia', m: 's', cat: 'neuro', tags: ['s:trauma'], n: 'ASIA / ISNCSCI (lesión medular)', sig: 'AIS', syn: ['isncsci', 'asia', 'lesion medular', 'frankel'],
    tipo: 'clasificación', fin: 'Clasifica la lesión medular: grado AIS, nivel neurológico, niveles motores y sensitivos y zonas de preservación parcial.',
    ver: 'ISNCSCI, revisión 2019 (ASIA/ISCoS)',
    formula: 'Nivel sensitivo: dermatoma más caudal con tacto fino y pinchazo normales (2) y todos los rostrales normales. Nivel motor: músculo clave más caudal con fuerza ≥ 3 con los rostrales en 5. NNL = el más rostral de los cuatro niveles.\nAIS A: sin función sacra (S4-5 sensibilidad, PAP, CAV). B: sensitivo incompleto sin función motora > 3 niveles por debajo del nivel motor. C: motor incompleto con < la mitad de los músculos clave por debajo del NNL con fuerza ≥ 3. D: ≥ la mitad con fuerza ≥ 3. E: normal.',
    in: asiaIn,
    calc: v => {
      const r = isncsci(asiaMap(v)), side = s => `D ${lvl(r[s].d)} · I ${lvl(r[s].i)}`;
      const more = [['Nivel neurológico (NNL)', lvl(r.nli)], ['Nivel sensitivo', side('sl')], ['Nivel motor', side('ml')]];
      if (r.zs.d || r.zs.i) more.push(['ZPP sensitiva', `D ${r.zs.d || 'NA'} · I ${r.zs.i || 'NA'}`]);
      if (r.zm.d || r.zm.i) more.push(['ZPP motora', `D ${r.zm.d || 'NA'} · I ${r.zm.i || 'NA'}`]);
      more.push(['Motor MMSS / MMII', `${r.uems}/50 · ${r.lems}/50`], ['Tacto fino / pinchazo', `${r.ltt}/112 · ${r.ppt}/112`]);
      const D = { A: 'Completa', B: 'Sensitiva incompleta', C: 'Motora incompleta', D: 'Motora incompleta', E: 'Normal' };
      return { r: 'AIS ' + r.ais, interp: D[r.ais] + (r.ais == 'E' ? ' (solo corresponde E si hubo déficit documentado previamente)' : ''), lvl: r.ais == 'E' ? 'ok' : r.ais == 'D' ? 'warn' : 'bad', more, note: r.nt ? 'Hay elementos NT: se tomaron como normales para el cálculo; la clasificación es provisoria.' : '' };
    },
    ref: 'American Spinal Injury Association. International Standards for Neurological Classification of Spinal Cord Injury (ISNCSCI), revised 2019. · Rupp R, Biering-Sørensen F, Burns SP, et al. International Standards for Neurological Classification of Spinal Cord Injury: revised 2019. Top Spinal Cord Inj Rehabil. 2021;27(2):1-22.',
    url: 'https://asia-spinalinjury.org/international-standards-neurological-classification-sci-isncsci-worksheet/', verif: '2026-10',
    pop: 'Lesión medular traumática (y aplicable a otras mielopatías) en pacientes evaluables y colaboradores.',
    lim: 'Algoritmo simplificado: no considera músculos no clave para distinguir B/C ni asteriscos de la revisión 2019 (deficiencias no medulares). Requiere el examen completo; con NT la clasificación es provisoria. Contrastar casos dudosos con la calculadora oficial de ISNCSCI.',
    tests: [
      { v: asiaCase('C5', '0', k => (k == 'C5' ? 5 : 0), 'no', 'no'), r: 'AIS A' },
      { v: asiaCase('C6', '1', k => ({ C5: 5, C6: 4, C7: 2 })[k] ?? 1, 'no', 'no'), r: 'AIS C' },
      { v: asiaCase('S4-5', '2', () => 5, 'si', 'si'), r: 'AIS E' },
      { v: asiaCase('T10', '1', k => (KEYM.findIndex(x => x[0] == k) < 5 ? 5 : 0), 'no', 'no'), r: 'AIS B' }
    ]
  },
  {
    id: 'sins', m: 's', cat: 'neuro', tags: ['s:trauma'], n: 'SINS (Spinal Instability Neoplastic Score)', sig: 'SINS', syn: ['inestabilidad', 'metastasis vertebral', 'columna tumoral'],
    tipo: 'score pronóstico', fin: 'Evalúa la inestabilidad mecánica de la columna por enfermedad neoplásica.',
    ver: 'Fisher 2010 (Spine Oncology Study Group)', formula: 'Localización (0–3) + dolor (0–3) + lesión ósea (0–2) + alineación (0–4) + colapso (0–3) + compromiso posterolateral (0–3) = 0–18.',
    in: sinsIn,
    calc: function (v) { const t = pts(v, this.in); return { r: t, d: 0, u: '/18', lab: 'SINS', ...band(t, [[0, 6, 'Estable (0–6)', 'ok'], [7, 12, 'Potencialmente inestable / indeterminado (7–12): se recomienda consulta quirúrgica', 'warn'], [13, 18, 'Inestable (13–18): se recomienda consulta quirúrgica', 'bad']]) }; },
    ref: 'Fisher CG, DiPaola CP, Ryken TC, et al. A novel classification system for spinal instability in neoplastic disease: an evidence-based approach and expert consensus from the Spine Oncology Study Group. Spine (Phila Pa 1976). 2010;35(22):E1221-E1229.',
    url: 'https://doi.org/10.1097/BRS.0b013e3181e16ae2', verif: '2026-10',
    pop: 'Pacientes con tumores vertebrales (metástasis o mieloma).',
    lim: 'Evalúa estabilidad mecánica, no compresión medular ni pronóstico oncológico. Puntuar el nivel más afectado. Recomendación de consulta quirúrgica para SINS ≥ 7 según el trabajo original.',
    tests: [{ v: { loc: 'a', pain: 'a', bone: 'a', ali: 'a', col: 'a', pl: 'a' }, r: 18 }, { v: { loc: 'c', pain: 'b', bone: 'b', ali: 'c', col: 'c', pl: 'b' }, r: 5 }]
  },
  {
    id: 'noms', m: 's', cat: 'neuro', tags: ['s:trauma'], n: 'Marco NOMS (metástasis vertebrales)', sig: 'NOMS', syn: ['neurologico oncologico mecanico sistemico', 'bilsky', 'escc'],
    tipo: 'regla de decisión', fin: 'Ordena la decisión terapéutica en metástasis vertebrales por cuatro dominios: neurológico, oncológico, mecánico y sistémico.',
    ver: 'NOMS (Laufer 2013, MSKCC); ESCC según Bilsky 2010',
    formula: 'N: grado de compresión epidural (ESCC de Bilsky) + mielopatía/radiculopatía: bajo grado (0, 1a, 1b, 1c) vs. alto grado (2, 3).\nO: radiosensibilidad de la histología a la radioterapia convencional (cEBRT).\nM: inestabilidad mecánica (SINS).\nS: enfermedad sistémica y comorbilidades: tolerancia a la cirugía.\nNo tiene puntaje: combina los cuatro dominios en vías descritas.',
    in: [
      S('escc', 'N · Compresión epidural (ESCC, Bilsky) en RM T2', [['0', '0 · Enfermedad solo ósea'], ['1a', '1a · Compromiso epidural sin deformación del saco dural'], ['1b', '1b · Deformación del saco dural sin contacto con la médula'], ['1c', '1c · Deformación del saco con contacto medular, sin compresión'], ['2', '2 · Compresión medular con LCR visible alrededor'], ['3', '3 · Compresión medular sin LCR visible']]),
      S('mielo', 'N · Mielopatía o síndrome de cauda equina', [['no', 'No'], ['si', 'Sí']]),
      S('hist', 'O · Histología (respuesta a cEBRT)', [['rs', 'Radiosensible (p. ej., linfoma, mieloma/plasmocitoma, seminoma, mama, próstata, ovario, neuroendocrino)'], ['rr', 'Radiorresistente (p. ej., renal, tiroides, hepatocarcinoma, colon, pulmón no células pequeñas, melanoma, sarcoma)']]),
      S('mec', 'M · Estabilidad mecánica (SINS)', [['e', 'Estable (SINS 0–6)'], ['p', 'Potencialmente inestable (SINS 7–12)'], ['i', 'Inestable (SINS 13–18)']]),
      S('sis', 'S · ¿Tolera la cirugía (enfermedad sistémica, comorbilidades, expectativa de vida)?', [['si', 'Sí'], ['no', 'No']])
    ],
    calc: v => {
      const hg = ['2', '3'].includes(v.escc), rs = v.hist === 'rs', op = v.sis === 'si';
      let rad;
      if (!hg) rad = rs ? 'Bajo grado + radiosensible: el marco describe cEBRT' : 'Bajo grado + radiorresistente: el marco describe radiocirugía estereotáctica (SRS)';
      else if (rs) rad = 'Alto grado + radiosensible: el marco describe cEBRT' + (si(v, 'mielo') ? ' (con mielopatía, la actualización del marco considera cirugía de entrada)' : '');
      else rad = op ? 'Alto grado + radiorresistente: el marco describe cirugía de separación seguida de SRS' : 'Alto grado + radiorresistente sin tolerancia a la cirugía: el marco describe radioterapia (cEBRT/SRS)';
      const mec = v.mec === 'i' ? 'Inestable: el marco indica estabilización (abierta o percutánea / cementación), independiente de la radioterapia' : v.mec === 'p' ? 'Indeterminado: estabilización según criterio del cirujano' : 'Estable: no requiere estabilización por este dominio';
      return {
        r: (hg ? 'ESCC alto grado' : 'ESCC bajo grado') + ' · ' + (rs ? 'radiosensible' : 'radiorresistente'), lvl: hg || v.mec === 'i' ? 'bad' : 'warn',
        more: [['N', `ESCC ${v.escc}${si(v, 'mielo') ? ', con mielopatía' : ''} → ${hg ? 'alto' : 'bajo'} grado`], ['O', rs ? 'Radiosensible a cEBRT' : 'Radiorresistente a cEBRT'], ['M', mec], ['S', op ? 'Tolera cirugía' : 'No tolera cirugía: limita las opciones quirúrgicas'], ['Vía descrita (N + O + S)', rad]],
        note: 'Marco orientativo para la discusión multidisciplinaria (columna, radioterapia, oncología); no es una indicación automática.'
      };
    },
    ref: 'Laufer I, Rubin DG, Lis E, et al. The NOMS framework: approach to the treatment of spinal metastatic tumors. Oncologist. 2013;18(6):744-751. · Bilsky MH, Laufer I, Fourney DR, et al. Reliability analysis of the epidural spinal cord compression scale. J Neurosurg Spine. 2010;13(3):324-328.',
    url: 'https://doi.org/10.1634/theoncologist.2012-0293', verif: '2026-10',
    pop: 'Adultos con metástasis vertebrales (tumores sólidos y hematológicos).',
    lim: 'Marco de decisión, sin puntaje ni validación pronóstica. La disponibilidad de SRS cambia las vías. El manejo del grado 1c y de la mielopatía con alto grado radiosensible varía entre versiones del marco. Con primario desconocido y mielopatía se maneja como radiorresistente.',
    tests: [{ v: { escc: '3', mielo: 'si', hist: 'rr', mec: 'e', sis: 'si' }, r: 'alto grado' }, { v: { escc: '1a', mielo: 'no', hist: 'rs', mec: 'i', sis: 'si' }, r: 'bajo grado · radiosensible' }]
  },
  {
    id: 'karnofsky', m: 's', cat: 'neuro', n: 'Escala de Karnofsky', sig: 'KPS', syn: ['karnofsky', 'performance status', 'estado funcional'],
    tipo: 'escala clínica', fin: 'Mide el estado funcional global del paciente oncológico (0–100).',
    ver: 'Karnofsky y Burchenal 1949', formula: 'Puntaje de 0 a 100 en saltos de 10 según la descripción funcional.',
    in: [S('g', 'Estado funcional', KPS.map(([p, t]) => [String(p), `${p} · ${t}`]))],
    calc: v => { const g = +v.g; return { r: g, d: 0, u: '%', lab: 'KPS', ...band(g, [[80, 100, 'Capaz de realizar actividad normal y trabajar; no requiere cuidados especiales (80–100)', 'ok'], [50, 70, 'Incapaz de trabajar; puede vivir en su casa y atender la mayoría de sus necesidades con ayuda variable (50–70)', 'warn'], [0, 40, 'Incapaz de cuidarse por sí mismo; requiere cuidados institucionales u hospitalarios equivalentes (0–40)', 'bad']]) }; },
    ref: 'Karnofsky DA, Burchenal JH. The clinical evaluation of chemotherapeutic agents in cancer. En: MacLeod CM, ed. Evaluation of Chemotherapeutic Agents. New York: Columbia University Press; 1949:191-205.',
    verif: '2026-10',
    pop: 'Pacientes oncológicos; muy usado en neurooncología (gliomas, metástasis cerebrales).',
    lim: 'Variabilidad interobservador. Mezcla dependencia funcional y necesidad de atención médica. Valorar el estado habitual reciente, no un momento agudo transitorio.',
    tests: [{ v: { g: '70' }, r: 70 }, { v: { g: '40' }, r: 40 }]
  },
  {
    id: 'ecog', m: 's', cat: 'neuro', n: 'Escala ECOG (Performance Status)', sig: 'ECOG', syn: ['zubrod', 'who performance status', 'estado funcional'],
    tipo: 'escala clínica', fin: 'Mide el estado funcional del paciente oncológico (0–5).',
    ver: 'ECOG / Oken 1982', formula: 'Grado único 0–5.',
    in: [S('g', 'Estado funcional', [['0', '0 · Totalmente activo, capaz de realizar todas sus actividades previas sin restricción'], ['1', '1 · Restringido en actividad física intensa, ambulatorio y capaz de realizar trabajo liviano o sedentario'], ['2', '2 · Ambulatorio y capaz de cuidarse por sí mismo, pero no de trabajar; levantado más del 50 % de las horas de vigilia'], ['3', '3 · Capacidad limitada de autocuidado; en cama o sillón más del 50 % de las horas de vigilia'], ['4', '4 · Totalmente discapacitado; no puede cuidarse; confinado a cama o sillón'], ['5', '5 · Muerte']])],
    calc: v => ({ r: 'ECOG ' + v.g, lvl: +v.g <= 1 ? 'ok' : +v.g == 2 ? 'warn' : 'bad' }),
    ref: 'Oken MM, Creech RH, Tormey DC, et al. Toxicity and response criteria of the Eastern Cooperative Oncology Group. Am J Clin Oncol. 1982;5(6):649-655.',
    url: 'https://ecog-acrin.org/resources/ecog-performance-status/', verif: '2026-10',
    pop: 'Pacientes oncológicos adultos; criterio de inclusión frecuente en ensayos.',
    lim: 'Escala gruesa (6 niveles); variabilidad interobservador entre los grados 1 y 2.',
    tests: [{ v: { g: '2' }, r: 'ECOG 2' }, { v: { g: '0' }, r: 'ECOG 0' }]
  },

  /* ======================= TRAUMA ======================= */
  {
    id: 'canadian-c-spine', m: 's', cat: 'trauma', tags: ['s:neuro'], n: 'Regla canadiense de columna cervical', sig: 'CCR', syn: ['canadian c-spine rule', 'columna cervical', 'radiografia cervical'],
    tipo: 'regla de decisión', fin: 'Identifica qué pacientes alertas y estables con trauma requieren imágenes de columna cervical.',
    ver: 'Stiell 2001',
    formula: '1) ¿Algún factor de alto riesgo? → imágenes.\n2) Si no: ¿algún factor de bajo riesgo que permita evaluar la movilidad? Si no hay ninguno → imágenes.\n3) Si hay: ¿puede rotar activamente el cuello 45° a derecha e izquierda? No → imágenes; sí → sin imágenes.\nInclusión: alerta (GCS 15), estable, con dolor cervical o sin dolor pero con lesión visible por encima de las clavículas, sin deambular y con mecanismo peligroso.',
    in: [S('apl', '¿Cumple la inclusión (GCS 15, estable) y ninguna exclusión?', [['si', 'Sí'], ['no', 'No']]), H('1. Alto riesgo'), ...ccsHi, H('2. Bajo riesgo'), ...ccsLo, H('3. Rotación'),
      S('rot', 'Rotación activa del cuello 45° a derecha e izquierda', [['si', 'Puede'], ['no', 'No puede'], ['ne', 'No evaluada (por alto riesgo o sin factor de bajo riesgo)']])],
    calc: v => {
      if (v.apl !== 'si') return { r: 'Regla no aplicable', lvl: 'warn', interp: 'No cumple los criterios de la regla: decidir por criterio clínico' };
      const hi = met(v, ccsHi), lo = met(v, ccsLo);
      if (hi.length) return { r: 'Regla positiva: imágenes indicadas', lvl: 'bad', interp: 'Factor de alto riesgo presente', more: hi.map(x => ['Alto riesgo', x]) };
      if (!lo.length) return { r: 'Regla positiva: imágenes indicadas', lvl: 'bad', interp: 'Sin factores de bajo riesgo: no se puede evaluar la movilidad con seguridad' };
      if (v.rot === 'ne') return { r: 'Incompleta: evaluar rotación', lvl: 'warn', interp: 'Hay factor de bajo riesgo: corresponde evaluar la rotación activa', more: lo.map(x => ['Bajo riesgo', x]) };
      return v.rot === 'si' ? { r: 'Regla negativa: sin imágenes', lvl: 'ok', interp: 'Factor de bajo riesgo y rota 45° a ambos lados', more: lo.map(x => ['Bajo riesgo', x]) } : { r: 'Regla positiva: imágenes indicadas', lvl: 'bad', interp: 'No puede rotar 45° a ambos lados' };
    },
    ref: 'Stiell IG, Wells GA, Vandemheen KL, et al. The Canadian C-spine rule for radiography in alert and stable trauma patients. JAMA. 2001;286(15):1841-1848.',
    url: 'https://doi.org/10.1001/jama.286.15.1841', verif: '2026-10',
    pop: 'Adultos (≥ 16 años) alertas (GCS 15) y estables con trauma cervical.',
    lim: 'Exclusiones: < 16 años, GCS < 15, signos vitales anormales (PAS < 90, FR < 10 o > 24), lesión > 48 h, trauma penetrante, parálisis aguda, enfermedad vertebral conocida (espondilitis anquilosante, AR, estenosis, cirugía cervical previa), reconsulta, embarazo. La regla no evalúa la necesidad de RM ni reemplaza el juicio clínico.',
    tests: [
      { v: { apl: 'si', h1: 'si', h2: 'no', h3: 'no', l1: 'no', l2: 'no', l3: 'no', l4: 'no', l5: 'no', rot: 'ne' }, r: 'positiva' },
      { v: { apl: 'si', h1: 'no', h2: 'no', h3: 'no', l1: 'no', l2: 'si', l3: 'si', l4: 'no', l5: 'si', rot: 'si' }, r: 'negativa' },
      { v: { apl: 'si', h1: 'no', h2: 'no', h3: 'no', l1: 'no', l2: 'si', l3: 'no', l4: 'no', l5: 'no', rot: 'no' }, r: 'positiva' }
    ]
  },
  {
    id: 'nexus', m: 's', cat: 'trauma', tags: ['s:neuro'], n: 'Criterios NEXUS (columna cervical)', sig: 'NEXUS', syn: ['nexus', 'columna cervical', 'hoffman'],
    tipo: 'regla de decisión', fin: 'Identifica pacientes con trauma de bajo riesgo de lesión cervical que no requieren imágenes.',
    ver: 'NEXUS (Hoffman 2000)', formula: 'Sin imágenes solo si están ausentes los 5 criterios: dolor en la línea media cervical posterior, intoxicación, alteración del estado de alerta, déficit neurológico focal y lesión dolorosa distractora. Con ≥ 1 presente → imágenes.',
    in: nexIn,
    calc: v => { const c = met(v, nexIn); return c.length ? { r: 'Regla positiva: imágenes indicadas', lvl: 'bad', more: c.map(x => ['Criterio presente', x]) } : { r: 'Regla negativa: bajo riesgo, sin imágenes', lvl: 'ok', interp: 'Los 5 criterios de bajo riesgo se cumplen' }; },
    ref: 'Hoffman JR, Mower WR, Wolfson AB, Todd KH, Zucker MI. Validity of a set of clinical criteria to rule out injury to the cervical spine in patients with blunt trauma. N Engl J Med. 2000;343(2):94-99.',
    url: 'https://doi.org/10.1056/NEJM200007133430203', verif: '2026-10',
    pop: 'Pacientes con trauma cerrado en los que se plantea imagen cervical (incluyó niños, con pocos menores de 2 años).',
    lim: 'Menor especificidad que la regla canadiense. Precaución en ancianos (≥ 65) por menor sensibilidad. Las definiciones de «lesión distractora» e «intoxicación» son operativas y subjetivas.',
    tests: [{ v: { x1: 'no', x2: 'no', x3: 'no', x4: 'no', x5: 'no' }, r: 'negativa' }, { v: { x1: 'si', x2: 'no', x3: 'no', x4: 'no', x5: 'si' }, r: 'positiva' }]
  },
  {
    id: 'ottawa-tobillo', m: 's', cat: 'trauma', n: 'Reglas de Ottawa para tobillo y pie', sig: '', syn: ['ottawa ankle rules', 'esguince', 'radiografia tobillo'],
    tipo: 'regla de decisión', fin: 'Indica cuándo pedir radiografía de tobillo o de pie en el trauma agudo de tobillo.',
    ver: 'Stiell 1992/1993',
    formula: 'Rx de tobillo si hay dolor en la zona maleolar y: dolor óseo en el borde posterior o la punta de algún maléolo (6 cm distales) o incapacidad de cargar peso (4 pasos) inmediatamente y en la guardia.\nRx de pie si hay dolor en el mediopié y: dolor óseo en la base del 5.º metatarsiano o en el escafoides, o incapacidad de cargar peso.',
    in: oaIn,
    calc: v => {
      const w = si(v, 'w'), tob = si(v, 't0') && (si(v, 't1') || si(v, 't2') || w), pie = si(v, 'p0') && (si(v, 'p1') || si(v, 'p2') || w);
      const r = tob && pie ? 'Regla positiva: Rx de tobillo y de pie' : tob ? 'Regla positiva: Rx de tobillo' : pie ? 'Regla positiva: Rx de pie' : 'Regla negativa: sin radiografía';
      const all = oaIn.filter(i => i.t == 'sel' && !['t0', 'p0'].includes(i.id) && v[i.id] === 'si').map(i => ['Criterio', i.l]);
      return { r, lvl: tob || pie ? 'bad' : 'ok', more: all };
    },
    ref: 'Stiell IG, Greenberg GH, McKnight RD, Nair RC, McDowell I, Worthington JR. A study to develop clinical decision rules for the use of radiography in acute ankle injuries. Ann Emerg Med. 1992;21(4):384-390. · Stiell IG, Greenberg GH, McKnight RD, et al. Decision rules for the use of radiography in acute ankle injuries. Refinement and prospective validation. JAMA. 1993;269(9):1127-1132.',
    url: 'https://doi.org/10.1001/jama.1993.03500090063034', verif: '2026-10',
    pop: 'Adultos (≥ 18 años en la validación original) con trauma agudo de tobillo.',
    lim: 'No aplica en intoxicación, lesiones múltiples dolorosas, alteración de la sensibilidad, embarazo, TEC, reconsulta tardía (> 10 días). La regla está diseñada para descartar fracturas clínicamente significativas.',
    tests: [{ v: { t0: 'si', t1: 'si', t2: 'no', p0: 'no', p1: 'no', p2: 'no', w: 'no' }, r: 'Rx de tobillo' }, { v: { t0: 'si', t1: 'no', t2: 'no', p0: 'si', p1: 'no', p2: 'no', w: 'no' }, r: 'negativa' }, { v: { t0: 'no', t1: 'no', t2: 'no', p0: 'si', p1: 'si', p2: 'no', w: 'no' }, r: 'Rx de pie' }]
  },
  {
    id: 'ottawa-rodilla', m: 's', cat: 'trauma', n: 'Regla de Ottawa para rodilla', sig: '', syn: ['ottawa knee rule', 'radiografia rodilla'],
    tipo: 'regla de decisión', fin: 'Indica cuándo pedir radiografía en el trauma agudo de rodilla.',
    ver: 'Stiell 1995', formula: 'Rx de rodilla si hay ≥ 1 de: edad ≥ 55, dolor aislado a la palpación de la rótula, dolor en la cabeza del peroné, incapacidad de flexionar a 90°, incapacidad de cargar peso (4 pasos) inmediatamente y en la guardia.',
    in: okIn,
    calc: v => { const c = met(v, okIn); return c.length ? { r: 'Regla positiva: Rx de rodilla', lvl: 'bad', more: c.map(x => ['Criterio', x]) } : { r: 'Regla negativa: sin radiografía', lvl: 'ok' }; },
    ref: 'Stiell IG, Greenberg GH, Wells GA, et al. Derivation of a decision rule for the use of radiography in acute knee injuries. Ann Emerg Med. 1995;26(4):405-413. · Stiell IG, Greenberg GH, Wells GA, et al. Prospective validation of a decision rule for the use of radiography in acute knee injuries. JAMA. 1996;275(8):611-615.',
    url: 'https://doi.org/10.1001/jama.1996.03530320035031', verif: '2026-10',
    pop: 'Adultos (≥ 18 años) con trauma agudo de rodilla (< 7 días).',
    lim: 'No aplica en lesiones aisladas de piel, lesión > 7 días, reconsulta, alteración de la conciencia, paraplejía, lesiones múltiples. Evalúa fractura, no lesión ligamentaria o meniscal.',
    tests: [{ v: { k1: 'no', k2: 'no', k3: 'si', k4: 'no', k5: 'no' }, r: 'positiva' }, { v: { k1: 'no', k2: 'no', k3: 'no', k4: 'no', k5: 'no' }, r: 'negativa' }]
  },
  {
    id: 'gustilo', m: 's', cat: 'trauma', n: 'Clasificación de Gustilo-Anderson (fracturas expuestas)', sig: '', syn: ['gustilo', 'fractura expuesta', 'fractura abierta'],
    tipo: 'clasificación', fin: 'Clasifica las fracturas expuestas según la herida, el daño de partes blandas, la contaminación y la lesión vascular.',
    ver: 'Gustilo-Anderson 1976, con subtipos III de Gustilo 1984',
    formula: 'I: herida limpia ≤ 1 cm · II: herida > 1 cm sin daño extenso de partes blandas · IIIA: cobertura adecuada pese a laceración extensa o colgajos, o trauma de alta energía · IIIB: pérdida extensa de partes blandas con despegamiento perióstico y exposición ósea (suele requerir colgajo) · IIIC: lesión arterial que requiere reparación.',
    in: [S('g', 'Tipo', [['I', 'I · Herida limpia ≤ 1 cm'], ['II', 'II · Herida > 1 cm sin daño extenso de partes blandas, colgajos ni avulsiones'], ['IIIA', 'IIIA · Cobertura ósea adecuada pese a laceración extensa o colgajos, o trauma de alta energía independientemente del tamaño de la herida'], ['IIIB', 'IIIB · Pérdida extensa de partes blandas con despegamiento perióstico y exposición ósea; habitualmente requiere cobertura con colgajo'], ['IIIC', 'IIIC · Fractura expuesta con lesión arterial que requiere reparación']])],
    calc: v => ({ r: 'Gustilo ' + v.g, lvl: v.g == 'I' ? 'warn' : 'bad' }),
    ref: 'Gustilo RB, Anderson JT. Prevention of infection in the treatment of one thousand and twenty-five open fractures of long bones: retrospective and prospective analyses. J Bone Joint Surg Am. 1976;58(4):453-458. · Gustilo RB, Mendoza RM, Williams DN. Problems in the management of type III (severe) open fractures: a new classification of type III open fractures. J Trauma. 1984;24(8):742-746.',
    url: 'https://doi.org/10.2106/00004623-197658040-00004', verif: '2026-10',
    pop: 'Fracturas expuestas de huesos largos.',
    lim: 'La clasificación definitiva se hace en quirófano tras el desbridamiento, no en la guardia. Concordancia interobservador moderada. Ciertas situaciones (contaminación de campo, armas de alta energía, segmentarias) se consideran tipo III independientemente del tamaño de la herida.',
    tests: [{ v: { g: 'IIIB' }, r: 'Gustilo IIIB' }, { v: { g: 'I' }, r: 'Gustilo I' }]
  },

  /* ======================= ANESTESIA ======================= */
  {
    id: 'asa', m: 's', cat: 'anestesia', tags: ['s:cirugia'], n: 'Clasificación del estado físico ASA', sig: 'ASA', syn: ['asa', 'riesgo anestesico', 'american society of anesthesiologists'],
    tipo: 'clasificación', fin: 'Clasifica el estado físico preoperatorio del paciente.',
    ver: 'ASA Physical Status Classification System, última enmienda 13/12/2020 (ASA 2020)',
    formula: 'Clases I–VI con ejemplos de adultos de la ASA; sufijo «E» si es una emergencia (la demora en el tratamiento aumentaría significativamente la amenaza para la vida o para una parte del cuerpo).',
    in: [S('g', 'Clase', ASA), S('e', 'Cirugía de emergencia (modificador E)', [['no', 'No'], ['si', 'Sí']])],
    calc: v => ({ r: 'ASA ' + v.g + (si(v, 'e') ? '-E' : ''), lvl: ['I', 'II'].includes(v.g) ? 'ok' : v.g == 'III' ? 'warn' : 'bad', note: v.g == 'VI' && si(v, 'e') ? 'El modificador E no suele aplicarse a ASA VI.' : '' }),
    ref: 'American Society of Anesthesiologists. ASA Physical Status Classification System. Approved by the ASA House of Delegates October 15, 2014; last amended December 13, 2020.',
    url: 'https://www.asahq.org/standards-and-practice-parameters/statement-on-asa-physical-status-classification-system', verif: '2026-10',
    pop: 'Pacientes que van a recibir anestesia o sedación (la ASA ofrece también ejemplos pediátricos y obstétricos).',
    lim: 'No es por sí sola una estimación del riesgo perioperatorio (no considera el tipo de cirugía). Variabilidad interobservador; los ejemplos son orientativos y no exhaustivos.',
    tests: [{ v: { g: 'III', e: 'si' }, r: 'ASA III-E' }, { v: { g: 'I', e: 'no' }, r: 'ASA I' }]
  },
  {
    id: 'stop-bang', m: 's', cat: 'anestesia', tags: ['s:resp-infecto'], n: 'STOP-Bang (apnea obstructiva del sueño)', sig: 'STOP-Bang', syn: ['stopbang', 'apnea del sueño', 'saos', 'aos'],
    tipo: 'score pronóstico', fin: 'Tamiza el riesgo de apnea obstructiva del sueño moderada a grave antes de una cirugía.',
    ver: 'Chung 2008, con la estratificación de Chung 2012/2016',
    formula: '1 punto por cada «sí» (0–8). Bajo 0–2 · intermedio 3–4 · alto 5–8, o ≥ 2 de los 4 ítems STOP + sexo masculino, IMC > 35 o cuello > 40 cm.',
    in: [H('STOP'), ...sbStop, H('Bang'), ...sbBang],
    calc: v => {
      const st = sbStop.filter(i => si(v, i.id)).length, t = st + sbBang.filter(i => si(v, i.id)).length;
      const hi = t >= 5 || (st >= 2 && (si(v, 'g') || si(v, 'b') || si(v, 'n')));
      return { r: t, d: 0, u: '/8', lab: 'STOP-Bang', interp: hi ? 'Riesgo alto de AOS moderada a grave' : t >= 3 ? 'Riesgo intermedio de AOS' : 'Riesgo bajo de AOS', lvl: hi ? 'bad' : t >= 3 ? 'warn' : 'ok', note: hi && t < 5 ? 'Riesgo alto por la combinación de ≥ 2 ítems STOP con sexo masculino, IMC > 35 o cuello > 40 cm.' : '' };
    },
    ref: 'Chung F, Yegneswaran B, Liao P, et al. STOP questionnaire: a tool to screen patients for obstructive sleep apnea. Anesthesiology. 2008;108(5):812-821. · Chung F, Subramanyam R, Liao P, et al. High STOP-Bang score indicates a high probability of obstructive sleep apnoea. Br J Anaesth. 2012;108(5):768-775. · Chung F, Abdullah HR, Liao P. STOP-Bang Questionnaire: a practical approach to screen for obstructive sleep apnea. Chest. 2016;149(3):631-638.',
    url: 'http://www.stopbang.ca/', verif: '2026-10',
    pop: 'Adultos en evaluación preoperatoria (validado en clínicas prequirúrgicas).',
    lim: 'Alta sensibilidad, baja especificidad con puntajes bajos-intermedios. No diagnostica AOS (requiere polisomnografía). El sitio oficial actual usa cuello ≥ 43 cm en hombres y ≥ 41 cm en mujeres; aquí se usa el corte original > 40 cm.',
    tests: [{ v: { s: 'si', t: 'si', o: 'no', p: 'no', b: 'no', a: 'no', n: 'no', g: 'si' }, r: 'alto' }, { v: { s: 'no', t: 'no', o: 'no', p: 'si', b: 'no', a: 'si', n: 'no', g: 'no' }, r: 2 }, { v: { s: 'si', t: 'no', o: 'no', p: 'si', b: 'no', a: 'si', n: 'no', g: 'no' }, r: 'intermedio' }]
  },
  {
    id: 'ariscat', m: 's', cat: 'anestesia', tags: ['s:cirugia', 's:resp-infecto'], n: 'ARISCAT (complicaciones pulmonares posoperatorias)', sig: 'ARISCAT', syn: ['canet', 'riesgo pulmonar', 'complicaciones respiratorias'],
    tipo: 'score pronóstico', fin: 'Estima el riesgo de complicaciones pulmonares posoperatorias.',
    ver: 'Canet 2010 (estudio ARISCAT, Cataluña)',
    formula: 'Edad (≤ 50: 0; 51–80: 3; > 80: 16) + SpO₂ preoperatoria (≥ 96 %: 0; 91–95 %: 8; ≤ 90 %: 24) + infección respiratoria en el último mes (17) + anemia Hb ≤ 10 g/dL (11) + incisión (periférica 0; abdominal alta 15; intratorácica 24) + duración (≤ 2 h: 0; > 2–3 h: 16; > 3 h: 23) + urgencia (8).\nBajo < 26 · intermedio 26–44 · alto ≥ 45.',
    in: [
      S('age', 'Edad', [['a', '≤ 50 años', 0], ['b', '51–80 años', 3], ['c', '> 80 años', 16]]),
      S('spo2', 'SpO₂ preoperatoria (aire ambiente, decúbito supino)', [['a', '≥ 96 %', 0], ['b', '91–95 %', 8], ['c', '≤ 90 %', 24]]),
      yn('inf', 'Infección respiratoria en el último mes', 17),
      yn('an', 'Anemia preoperatoria (Hb ≤ 10 g/dL)', 11),
      S('inc', 'Incisión quirúrgica', [['a', 'Periférica', 0], ['b', 'Abdominal alta', 15], ['c', 'Intratorácica', 24]]),
      S('dur', 'Duración de la cirugía', [['a', '≤ 2 h', 0], ['b', '> 2 a 3 h', 16], ['c', '> 3 h', 23]]),
      yn('urg', 'Cirugía de urgencia', 8)
    ],
    calc: function (v) {
      const t = pts(v, this.in);
      const b = t < 26 ? ['Riesgo bajo (< 26)', '1,6 %', 'ok'] : t < 45 ? ['Riesgo intermedio (26–44)', '13,3 %', 'warn'] : ['Riesgo alto (≥ 45)', '42,1 %', 'bad'];
      return { r: t, d: 0, lab: 'ARISCAT', interp: b[0], lvl: b[2], more: [['Complicaciones pulmonares (validación)', b[1]]] };
    },
    ref: 'Canet J, Gallart L, Gomar C, et al. Prediction of postoperative pulmonary complications in a population-based surgical cohort. Anesthesiology. 2010;113(6):1338-1350.',
    url: 'https://doi.org/10.1097/ALN.0b013e3181fc6e0a', verif: '2026-10',
    pop: 'Adultos sometidos a cirugía con anestesia general, neuroaxial o regional (cohorte poblacional de Cataluña).',
    lim: 'Complicaciones pulmonares compuestas (infección respiratoria, insuficiencia respiratoria, derrame pleural, atelectasia, neumotórax, broncoespasmo, neumonitis aspirativa) durante la internación. Tasas del subgrupo de validación. Excluye procedimientos obstétricos, trasplante y procedimientos con anestesia local o sedación.',
    tests: [{ v: { age: 'b', spo2: 'b', inf: 'no', an: 'no', inc: 'b', dur: 'b', urg: 'no' }, r: 42 }, { v: { age: 'a', spo2: 'a', inf: 'no', an: 'no', inc: 'a', dur: 'a', urg: 'no' }, r: 0 }, { v: { age: 'c', spo2: 'c', inf: 'no', an: 'no', inc: 'a', dur: 'a', urg: 'si' }, r: 'alto' }]
  },
  {
    id: 'rcri', m: 's', cat: 'anestesia', tags: ['s:cardiologia', 's:cirugia'], n: 'Índice de riesgo cardíaco revisado (Lee)', sig: 'RCRI', syn: ['lee', 'riesgo cardiaco', 'goldman revisado'],
    tipo: 'score pronóstico', fin: 'Estima el riesgo de complicaciones cardíacas mayores en cirugía no cardíaca.',
    ver: 'Lee 1999; riesgos actualizados según la guía de la Canadian Cardiovascular Society (Duceppe 2017)',
    formula: '1 punto por cada uno: cirugía de alto riesgo (intraperitoneal, intratorácica o vascular suprainguinal), cardiopatía isquémica, insuficiencia cardíaca, enfermedad cerebrovascular (ACV/AIT), insulina preoperatoria, creatinina > 2 mg/dL (0–6).',
    in: [
      yn('s', 'Cirugía de alto riesgo (intraperitoneal, intratorácica o vascular suprainguinal)'),
      yn('ihd', 'Cardiopatía isquémica (IAM previo, prueba de esfuerzo positiva, angina actual, uso de nitratos u ondas Q patológicas)'),
      yn('chf', 'Insuficiencia cardíaca (antecedente de edema pulmonar, disnea paroxística nocturna, rales bilaterales o R3, redistribución vascular en la Rx)'),
      yn('cvd', 'Enfermedad cerebrovascular (ACV o AIT)'),
      yn('ins', 'Tratamiento preoperatorio con insulina'),
      yn('cr', 'Creatinina preoperatoria > 2 mg/dL (> 176,8 µmol/L)')
    ],
    calc: function (v) {
      const t = pts(v, this.in), k = Math.min(t, 3);
      const lee = ['0,4 %', '0,9 %', '6,6 %', '11 %'][k], dc = ['3,9 %', '6,0 %', '10,1 %', '15,0 %'][k];
      return { r: t, d: 0, u: '/6', lab: 'RCRI', interp: 'Clase ' + ['I', 'II', 'III', 'IV'][k], lvl: k == 0 ? 'ok' : k == 1 ? 'warn' : 'bad', more: [['Muerte, IAM o paro cardíaco a 30 días (CCS 2017)', dc], ['Complicación cardíaca mayor (Lee 1999, validación)', lee]] };
    },
    ref: 'Lee TH, Marcantonio ER, Mangione CM, et al. Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery. Circulation. 1999;100(10):1043-1049. · Duceppe E, Parlow J, MacDonald P, et al. Canadian Cardiovascular Society Guidelines on Perioperative Cardiac Risk Assessment and Management for Patients Who Undergo Noncardiac Surgery. Can J Cardiol. 2017;33(1):17-32.',
    url: 'https://doi.org/10.1161/01.CIR.100.10.1043', verif: '2026-10',
    pop: 'Adultos ≥ 50 años sometidos a cirugía mayor no cardíaca electiva (cohorte original, Boston).',
    lim: 'Las tasas originales (Lee) usaban CK-MB y subestiman el riesgo frente a la vigilancia con troponinas; por eso se muestran también las estimaciones actualizadas de la CCS 2017. No aplica a cirugía cardíaca ni a urgencias.',
    tests: [{ v: { s: 'si', ihd: 'si', chf: 'no', cvd: 'no', ins: 'no', cr: 'no' }, r: 2 }, { v: { s: 'si', ihd: 'si', chf: 'si', cvd: 'si', ins: 'no', cr: 'no' }, r: 'Clase IV' }]
  },
  {
    id: 'apfel', m: 's', cat: 'anestesia', n: 'Score de Apfel (náuseas y vómitos posoperatorios)', sig: 'Apfel', syn: ['nvpo', 'ponv', 'nauseas posoperatorias'],
    tipo: 'score pronóstico', fin: 'Estima el riesgo de náuseas y vómitos posoperatorios en adultos con anestesia general inhalatoria.',
    ver: 'Apfel 1999 (score simplificado de 4 factores)', formula: '1 punto por cada uno: sexo femenino, no fumador, antecedente de NVPO o cinetosis, opioides posoperatorios (0–4).',
    in: [yn('f', 'Sexo femenino'), yn('nf', 'No fumador'), yn('h', 'Antecedente de NVPO o cinetosis'), yn('op', 'Uso previsto de opioides posoperatorios')],
    calc: function (v) { const t = pts(v, this.in), R = ['10 %', '21 %', '39 %', '61 %', '79 %']; return { r: t, d: 0, u: '/4', lab: 'Apfel', interp: 'Riesgo estimado de NVPO: ' + R[t], lvl: t <= 1 ? 'ok' : t == 2 ? 'warn' : 'bad' }; },
    ref: 'Apfel CC, Läärä E, Koivuranta M, Greim CA, Roewer N. A simplified risk score for predicting postoperative nausea and vomiting: conclusions from cross-validations between two centers. Anesthesiology. 1999;91(3):693-700.',
    url: 'https://doi.org/10.1097/00000542-199909000-00022', verif: '2026-10',
    pop: 'Adultos con anestesia general balanceada con agentes inhalatorios (centros de Finlandia y Alemania).',
    lim: 'No validado en niños (existe el score POVOC/Eberhart). Riesgos aproximados de la serie original; menores con anestesia total intravenosa y profilaxis.',
    tests: [{ v: { f: 'si', nf: 'si', h: 'no', op: 'si' }, r: 3 }, { v: { f: 'no', nf: 'no', h: 'no', op: 'no' }, r: 0 }]
  }
];
