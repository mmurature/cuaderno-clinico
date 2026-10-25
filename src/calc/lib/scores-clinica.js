// Scores y escalas clínicas: cardiología, UTI, respiratorio/infecto e infectología.
// Puntos y umbrales verificados contra la publicación original o guía oficial (ver `ref`).
import { rd, pts, band, U } from '../h.js';

const V = '2026-10';
// Primer umbral superado: x < t → p
const lt = (x, rows, last) => { for (const [t, p] of rows) if (x < t) return p; return last; };
// x ≤ t → p
const le = (x, rows, last) => { for (const [t, p] of rows) if (x <= t) return p; return last; };
// x ≥ t → p
const ge = (x, rows, last) => { for (const [t, p] of rows) if (x >= t) return p; return last; };
const coma = (x, d = 1) => String(rd(x, d)).replace('.', ',');
const CRP_MGDL = { u: 'mg/dL', f: x => x * 10 }; // PCR mg/dL → mg/L

// ───────────────────────────── CARDIOLOGÍA ─────────────────────────────

const I_VASC = [
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'sel', id: 'sexo', l: 'Sexo', o: [['m', 'Masculino', 0], ['f', 'Femenino', 1]] },
  { t: 'chk', id: 'ic', l: 'Insuficiencia cardíaca o disfunción sistólica del VI moderada-grave' },
  { t: 'chk', id: 'hta', l: 'Hipertensión arterial' },
  { t: 'chk', id: 'dm', l: 'Diabetes mellitus' },
  { t: 'chk', id: 'acv', l: 'ACV, AIT o tromboembolismo previo', pts: 2 },
  { t: 'chk', id: 'vasc', l: 'Enfermedad vascular (IAM previo, enfermedad arterial periférica o placa aórtica)' }
];
const I_VA = I_VASC.filter(i => i.id != 'sexo');
const edadVasc = e => (e >= 75 ? 2 : e >= 65 ? 1 : 0);

const I_HASBLED = [
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'chk', id: 'hta', l: 'HTA no controlada (PAS > 160 mmHg)' },
  { t: 'chk', id: 'renal', l: 'Función renal anormal (diálisis, trasplante renal o creatinina ≥ 2,26 mg/dL [200 µmol/L])' },
  { t: 'chk', id: 'hep', l: 'Función hepática anormal (hepatopatía crónica/cirrosis, o bilirrubina > 2× LSN con AST/ALT/FA > 3× LSN)' },
  { t: 'chk', id: 'acv', l: 'ACV previo' },
  { t: 'chk', id: 'sang', l: 'Sangrado mayor previo o predisposición al sangrado (p. ej., anemia, diátesis)' },
  { t: 'chk', id: 'inr', l: 'RIN lábil (inestable/elevado o tiempo en rango terapéutico < 60%)' },
  { t: 'chk', id: 'drog', l: 'Fármacos que predisponen al sangrado (antiagregantes, AINE)' },
  { t: 'chk', id: 'alc', l: 'Consumo de alcohol ≥ 8 tragos por semana' }
];

const I_HEART = [
  { t: 'sel', id: 'h', l: 'Historia (anamnesis)', o: [[0, 'Levemente sospechosa', 0], [1, 'Moderadamente sospechosa', 1], [2, 'Altamente sospechosa', 2]] },
  { t: 'sel', id: 'e', l: 'ECG', o: [[0, 'Normal', 0], [1, 'Alteración inespecífica de la repolarización (BCR, HVI, marcapasos, digoxina, etc.)', 1], [2, 'Desviación significativa del ST', 2]] },
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'sel', id: 'r', l: 'Factores de riesgo (HTA, hipercolesterolemia, DM, obesidad IMC > 30, tabaquismo actual o cese < 3 meses, antecedente familiar)', o: [[0, 'Ningún factor de riesgo conocido', 0], [1, '1 o 2 factores de riesgo', 1], [2, '≥ 3 factores de riesgo o enfermedad aterosclerótica conocida', 2]] },
  { t: 'sel', id: 't', l: 'Troponina inicial', o: [[0, '≤ límite normal', 0], [1, '1 a 3 veces el límite normal', 1], [2, '> 3 veces el límite normal', 2]] }
];

const I_TIMI = [
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'chk', id: 'fr', l: '≥ 3 factores de riesgo coronario (antecedente familiar, HTA, hipercolesterolemia, DM, tabaquismo actual)' },
  { t: 'chk', id: 'ecc', l: 'Enfermedad coronaria conocida (estenosis ≥ 50%)' },
  { t: 'chk', id: 'aas', l: 'Uso de AAS en los últimos 7 días' },
  { t: 'chk', id: 'ang', l: 'Angina grave reciente (≥ 2 episodios en las últimas 24 h)' },
  { t: 'chk', id: 'st', l: 'Desviación del ST ≥ 0,5 mm en el ECG de ingreso' },
  { t: 'chk', id: 'mk', l: 'Marcadores de necrosis miocárdica elevados' }
];

const I_TIMIS = [
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'chk', id: 'ant', l: 'Antecedente de DM, HTA o angina' },
  { t: 'num', id: 'pas', l: 'PAS al ingreso', u: 'mmHg', min: 30, max: 300, step: 1 },
  { t: 'num', id: 'fc', l: 'FC al ingreso', u: 'lpm', min: 20, max: 300, step: 1 },
  { t: 'sel', id: 'killip', l: 'Clase Killip', o: [[1, 'I', 0], [2, 'II', 2], [3, 'III', 2], [4, 'IV', 2]] },
  { t: 'num', id: 'peso', l: 'Peso', u: 'kg', min: 20, max: 300, step: 0.1, alt: [U.lb] },
  { t: 'chk', id: 'stant', l: 'Supradesnivel del ST anterior o BCRI' },
  { t: 'chk', id: 't4', l: 'Tiempo hasta el tratamiento > 4 h' }
];
const TIMIS_M = [0.8, 1.6, 2.2, 4.4, 7.3, 12.4, 16.1, 23.4, 26.8];

const I_GRACE = [
  { t: 'sel', id: 'sca', l: 'Tipo de SCA', o: [['sest', 'SCA sin elevación del ST'], ['cest', 'SCA con elevación del ST']] },
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'num', id: 'fc', l: 'FC al ingreso', u: 'lpm', min: 20, max: 300, step: 1 },
  { t: 'num', id: 'pas', l: 'PAS al ingreso', u: 'mmHg', min: 30, max: 300, step: 1 },
  { t: 'num', id: 'cr', l: 'Creatinina sérica inicial', u: 'mg/dL', min: 0.1, max: 20, step: 0.01, alt: [U.creat_umol] },
  { t: 'sel', id: 'killip', l: 'Clase Killip', o: [[1, 'I — sin IC', 0], [2, 'II — rales, S3, ingurgitación yugular', 20], [3, 'III — edema agudo de pulmón', 39], [4, 'IV — shock cardiogénico', 59]] },
  { t: 'chk', id: 'paro', l: 'Paro cardíaco al ingreso', pts: 39 },
  { t: 'chk', id: 'st', l: 'Desviación del segmento ST', pts: 28 },
  { t: 'chk', id: 'enz', l: 'Marcadores cardíacos elevados', pts: 14 }
];

const I_H2 = [
  { t: 'num', id: 'imc', l: 'IMC', u: 'kg/m²', min: 10, max: 80, step: 0.1 },
  { t: 'chk', id: 'hta', l: 'Tratamiento con ≥ 2 antihipertensivos' },
  { t: 'chk', id: 'fa', l: 'Fibrilación auricular (paroxística o persistente)', pts: 3 },
  { t: 'num', id: 'psap', l: 'PSAP estimada por ecocardiograma', u: 'mmHg', min: 5, max: 150, step: 1 },
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'num', id: 'ee', l: 'Relación E/e′ (promedio)', u: '', min: 1, max: 60, step: 0.1 }
];

const FRAM_MAY = [
  ['dpn', 'Disnea paroxística nocturna u ortopnea'],
  ['yug', 'Ingurgitación yugular'],
  ['rales', 'Rales pulmonares'],
  ['cardio', 'Cardiomegalia radiológica'],
  ['eap', 'Edema agudo de pulmón'],
  ['s3', 'Galope S3'],
  ['pvc', 'Presión venosa central > 16 cmH₂O'],
  ['tc', 'Tiempo circulatorio ≥ 25 s'],
  ['rhy', 'Reflujo hepatoyugular'],
  ['peso', 'Pérdida de peso ≥ 4,5 kg en 5 días en respuesta al tratamiento (mayor o menor)']
];
const FRAM_MEN = [
  ['edema', 'Edema bilateral de tobillos'],
  ['tos', 'Tos nocturna'],
  ['disnea', 'Disnea de esfuerzo ante actividades habituales'],
  ['hepato', 'Hepatomegalia'],
  ['derrame', 'Derrame pleural'],
  ['cv', 'Capacidad vital reducida en 1/3 del máximo registrado'],
  ['taqui', 'Taquicardia (FC ≥ 120 lpm)']
];
const I_FRAM = [
  { t: 'head', l: 'Criterios mayores' },
  ...FRAM_MAY.map(([id, l]) => ({ t: 'chk', id, l })),
  { t: 'head', l: 'Criterios menores (solo si no son atribuibles a otra causa)' },
  ...FRAM_MEN.map(([id, l]) => ({ t: 'chk', id, l }))
];

// ───────────────────────────── UTI ─────────────────────────────

const I_SOFA = [
  { t: 'head', l: 'Peor valor de las últimas 24 h' },
  { t: 'num', id: 'pao2', l: 'PaO₂', u: 'mmHg', min: 20, max: 700, step: 1, alt: [U.kpa] },
  { t: 'num', id: 'fio2', l: 'FiO₂', u: '%', min: 21, max: 100, step: 1 },
  { t: 'sel', id: 'sop', l: 'Soporte respiratorio', o: [[0, 'Sin soporte ventilatorio'], [1, 'Con soporte ventilatorio (VM invasiva o no invasiva)']] },
  { t: 'num', id: 'plq', l: 'Plaquetas', u: '×10³/µL', min: 0, max: 2000, step: 1 },
  { t: 'num', id: 'bili', l: 'Bilirrubina total', u: 'mg/dL', min: 0, max: 80, step: 0.1, alt: [U.bili_umol] },
  { t: 'sel', id: 'cv', l: 'Cardiovascular (vasoactivos en µg/kg/min, administrados ≥ 1 h)', o: [
    [0, 'PAM ≥ 70 mmHg sin vasoactivos', 0],
    [1, 'PAM < 70 mmHg', 1],
    [2, 'Dopamina ≤ 5 o dobutamina (cualquier dosis)', 2],
    [3, 'Dopamina > 5, o adrenalina ≤ 0,1, o noradrenalina ≤ 0,1', 3],
    [4, 'Dopamina > 15, o adrenalina > 0,1, o noradrenalina > 0,1', 4]] },
  { t: 'num', id: 'gcs', l: 'Glasgow (estimado sin sedación)', u: 'pts', min: 3, max: 15, step: 1 },
  { t: 'num', id: 'cr', l: 'Creatinina', u: 'mg/dL', min: 0.1, max: 30, step: 0.01, alt: [U.creat_umol] },
  { t: 'num', id: 'diu', l: 'Diuresis de 24 h (opcional)', u: 'mL/día', min: 0, max: 20000, step: 10, req: 0 }
];

const I_APACHE = [
  { t: 'head', l: 'Peor valor de las primeras 24 h en UTI' },
  { t: 'num', id: 'temp', l: 'Temperatura (rectal)', u: '°C', min: 20, max: 45, step: 0.1, alt: [U.f_temp] },
  { t: 'num', id: 'pam', l: 'Presión arterial media', u: 'mmHg', min: 10, max: 250, step: 1 },
  { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 0, max: 300, step: 1 },
  { t: 'num', id: 'fr', l: 'Frecuencia respiratoria (ventilado o no)', u: 'rpm', min: 0, max: 100, step: 1 },
  { t: 'num', id: 'fio2', l: 'FiO₂', u: '%', min: 21, max: 100, step: 1 },
  { t: 'num', id: 'pao2', l: 'PaO₂', u: 'mmHg', min: 20, max: 700, step: 1, alt: [U.kpa] },
  { t: 'num', id: 'paco2', l: 'PaCO₂', u: 'mmHg', min: 5, max: 200, step: 1, alt: [U.kpa] },
  { t: 'num', id: 'ph', l: 'pH arterial', u: '', min: 6.5, max: 8, step: 0.01 },
  { t: 'num', id: 'na', l: 'Sodio', u: 'mEq/L', min: 90, max: 200, step: 1 },
  { t: 'num', id: 'k', l: 'Potasio', u: 'mEq/L', min: 1, max: 12, step: 0.1 },
  { t: 'num', id: 'cr', l: 'Creatinina', u: 'mg/dL', min: 0.1, max: 30, step: 0.01, alt: [U.creat_umol] },
  { t: 'sel', id: 'ira', l: 'Insuficiencia renal aguda', o: [[0, 'No'], [1, 'Sí (duplica los puntos de creatinina)']] },
  { t: 'num', id: 'hto', l: 'Hematocrito', u: '%', min: 5, max: 80, step: 0.1 },
  { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 300, step: 0.1 },
  { t: 'num', id: 'gcs', l: 'Glasgow', u: 'pts', min: 3, max: 15, step: 1 },
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 16, max: 120, step: 1 },
  { t: 'sel', id: 'cron', l: 'Salud crónica: insuficiencia orgánica grave (hepática, CV, respiratoria, renal) o inmunocompromiso previos al ingreso', o: [
    [0, 'No', 0],
    ['elec', 'Sí — posoperatorio de cirugía programada', 2],
    ['urg', 'Sí — paciente no quirúrgico o posoperatorio de urgencia', 5]] }
];

const I_SAPS = [
  { t: 'head', l: 'Peor valor de las primeras 24 h en UTI' },
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 0, max: 300, step: 1 },
  { t: 'num', id: 'pas', l: 'PAS', u: 'mmHg', min: 0, max: 300, step: 1 },
  { t: 'num', id: 'temp', l: 'Temperatura máxima', u: '°C', min: 25, max: 45, step: 0.1, alt: [U.f_temp] },
  { t: 'sel', id: 'vm', l: 'Ventilación mecánica o CPAP', o: [[0, 'No'], [1, 'Sí']] },
  { t: 'num', id: 'pao2', l: 'PaO₂ (solo si VM/CPAP)', u: 'mmHg', min: 20, max: 700, step: 1, alt: [U.kpa], req: 0 },
  { t: 'num', id: 'fio2', l: 'FiO₂ (solo si VM/CPAP)', u: '%', min: 21, max: 100, step: 1, req: 0 },
  { t: 'num', id: 'diu', l: 'Diuresis de 24 h', u: 'mL/día', min: 0, max: 20000, step: 10 },
  { t: 'num', id: 'urea', l: 'Urea sérica', u: 'mg/dL', min: 1, max: 700, step: 1, alt: [U.bun_mgdl, U.urea_mmol] },
  { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 300, step: 0.1 },
  { t: 'num', id: 'k', l: 'Potasio', u: 'mEq/L', min: 1, max: 12, step: 0.1 },
  { t: 'num', id: 'na', l: 'Sodio', u: 'mEq/L', min: 90, max: 200, step: 1 },
  { t: 'num', id: 'hco3', l: 'Bicarbonato sérico', u: 'mEq/L', min: 1, max: 60, step: 1 },
  { t: 'num', id: 'bili', l: 'Bilirrubina total', u: 'mg/dL', min: 0, max: 80, step: 0.1, alt: [U.bili_umol] },
  { t: 'num', id: 'gcs', l: 'Glasgow (estimado previo a la sedación)', u: 'pts', min: 3, max: 15, step: 1 },
  { t: 'sel', id: 'cron', l: 'Enfermedad crónica', o: [[0, 'Ninguna de las listadas', 0], ['meta', 'Cáncer metastásico', 9], ['hem', 'Neoplasia hematológica', 10], ['sida', 'SIDA', 17]] },
  { t: 'sel', id: 'ing', l: 'Tipo de ingreso', o: [['prog', 'Quirúrgico programado', 0], ['med', 'Clínico (médico)', 6], ['urg', 'Quirúrgico no programado', 8]] }
];

const I_NEWS = [
  { t: 'num', id: 'fr', l: 'Frecuencia respiratoria', u: 'rpm', min: 0, max: 80, step: 1 },
  { t: 'sel', id: 'esc', l: 'Escala de SpO₂', o: [[1, 'Escala 1 (habitual)'], [2, 'Escala 2: insuficiencia respiratoria hipercápnica con SpO₂ objetivo 88–92% (indicada por un médico)']] },
  { t: 'num', id: 'spo2', l: 'SpO₂', u: '%', min: 50, max: 100, step: 1 },
  { t: 'sel', id: 'o2', l: 'Aire u oxígeno', o: [[0, 'Aire ambiente', 0], [1, 'Oxígeno suplementario', 2]] },
  { t: 'num', id: 'pas', l: 'PAS', u: 'mmHg', min: 30, max: 300, step: 1 },
  { t: 'num', id: 'fc', l: 'Pulso', u: 'lpm', min: 10, max: 300, step: 1 },
  { t: 'sel', id: 'conc', l: 'Conciencia (ACVPU)', o: [[0, 'Alerta', 0], [1, 'Confusión nueva, respuesta a la voz, al dolor o sin respuesta', 3]] },
  { t: 'num', id: 'temp', l: 'Temperatura', u: '°C', min: 25, max: 45, step: 0.1, alt: [U.f_temp] }
];

const I_MEWS = [
  { t: 'num', id: 'pas', l: 'PAS', u: 'mmHg', min: 30, max: 300, step: 1 },
  { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 10, max: 300, step: 1 },
  { t: 'num', id: 'fr', l: 'Frecuencia respiratoria', u: 'rpm', min: 0, max: 80, step: 1 },
  { t: 'num', id: 'temp', l: 'Temperatura', u: '°C', min: 25, max: 45, step: 0.1, alt: [U.f_temp] },
  { t: 'sel', id: 'avpu', l: 'Nivel de conciencia (AVPU)', o: [['A', 'Alerta', 0], ['V', 'Responde a la voz', 1], ['P', 'Responde al dolor', 2], ['U', 'Sin respuesta', 3]] }
];

const I_SIRS = [
  { t: 'num', id: 'temp', l: 'Temperatura', u: '°C', min: 25, max: 45, step: 0.1, alt: [U.f_temp] },
  { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 10, max: 300, step: 1 },
  { t: 'num', id: 'fr', l: 'Frecuencia respiratoria', u: 'rpm', min: 0, max: 80, step: 1 },
  { t: 'num', id: 'paco2', l: 'PaCO₂ (opcional)', u: 'mmHg', min: 5, max: 200, step: 1, alt: [U.kpa], req: 0 },
  { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 300, step: 0.1 },
  { t: 'num', id: 'cay', l: 'Formas inmaduras (cayados) (opcional)', u: '%', min: 0, max: 100, step: 1, req: 0 }
];

const CFS = [
  [1, 'Muy en forma — robusto, activo, enérgico y motivado; hace ejercicio regularmente'],
  [2, 'En forma — sin síntomas de enfermedad activa, pero menos en forma que la categoría 1; ejercicio ocasional'],
  [3, 'Maneja bien sus problemas de salud — problemas médicos bien controlados, aunque con síntomas ocasionales; no es activo más allá de caminar'],
  [4, 'Fragilidad muy leve — no depende de otros en lo cotidiano, pero los síntomas limitan sus actividades; se queja de estar «lento» o cansado'],
  [5, 'Fragilidad leve — enlentecimiento evidente; necesita ayuda en AIVD de alta exigencia (finanzas, transporte, tareas pesadas)'],
  [6, 'Fragilidad moderada — necesita ayuda en todas las actividades fuera de casa y en las tareas del hogar; problemas con escaleras; ayuda mínima para bañarse'],
  [7, 'Fragilidad grave — dependencia total para el cuidado personal (por causa física o cognitiva), pero estable y sin alto riesgo de morir en ~6 meses'],
  [8, 'Fragilidad muy grave — dependencia total, acercándose al final de la vida; no se recuperaría de una enfermedad leve'],
  [9, 'Enfermedad terminal — expectativa de vida < 6 meses, sin otra evidencia de fragilidad']
];

const I_BRADEN = [
  { t: 'sel', id: 'sen', l: 'Percepción sensorial', o: [[1, '1 — Completamente limitada', 1], [2, '2 — Muy limitada', 2], [3, '3 — Levemente limitada', 3], [4, '4 — Sin alteración', 4]] },
  { t: 'sel', id: 'hum', l: 'Humedad', o: [[1, '1 — Constantemente húmeda', 1], [2, '2 — Muy húmeda', 2], [3, '3 — Ocasionalmente húmeda', 3], [4, '4 — Raramente húmeda', 4]] },
  { t: 'sel', id: 'act', l: 'Actividad', o: [[1, '1 — En cama', 1], [2, '2 — En silla', 2], [3, '3 — Camina ocasionalmente', 3], [4, '4 — Camina con frecuencia', 4]] },
  { t: 'sel', id: 'mov', l: 'Movilidad', o: [[1, '1 — Completamente inmóvil', 1], [2, '2 — Muy limitada', 2], [3, '3 — Levemente limitada', 3], [4, '4 — Sin limitaciones', 4]] },
  { t: 'sel', id: 'nut', l: 'Nutrición (patrón habitual)', o: [[1, '1 — Muy pobre', 1], [2, '2 — Probablemente inadecuada', 2], [3, '3 — Adecuada', 3], [4, '4 — Excelente', 4]] },
  { t: 'sel', id: 'fri', l: 'Fricción y cizallamiento', o: [[1, '1 — Problema', 1], [2, '2 — Problema potencial', 2], [3, '3 — Sin problema aparente', 3]] }
];

const I_MORSE = [
  { t: 'sel', id: 'caida', l: 'Antecedente de caídas (inmediato o en los últimos 3 meses)', o: [[0, 'No', 0], [1, 'Sí', 25]] },
  { t: 'sel', id: 'dx2', l: 'Diagnóstico secundario (≥ 2 diagnósticos médicos)', o: [[0, 'No', 0], [1, 'Sí', 15]] },
  { t: 'sel', id: 'ayuda', l: 'Ayuda para deambular', o: [[0, 'Ninguna, reposo en cama o asistido por enfermería', 0], [1, 'Muletas, bastón o andador', 15], [2, 'Se apoya en los muebles para caminar', 30]] },
  { t: 'sel', id: 'via', l: 'Vía venosa o heparinizada', o: [[0, 'No', 0], [1, 'Sí', 20]] },
  { t: 'sel', id: 'marcha', l: 'Marcha', o: [[0, 'Normal, en reposo en cama o en silla de ruedas', 0], [1, 'Débil', 10], [2, 'Alterada', 20]] },
  { t: 'sel', id: 'mental', l: 'Estado mental', o: [[0, 'Consciente de sus propias limitaciones', 0], [1, 'Sobreestima su capacidad u olvida sus limitaciones', 15]] }
];

// ───────────────────────────── RESPIRATORIO / INFECTO ─────────────────────────────

const I_CURB = [
  { t: 'chk', id: 'conf', l: 'Confusión (nueva desorientación en persona, lugar o tiempo, o AMT ≤ 8)' },
  { t: 'num', id: 'urea', l: 'Urea sérica', u: 'mg/dL', min: 1, max: 700, step: 1, alt: [U.urea_mmol, U.bun_mgdl] },
  { t: 'num', id: 'fr', l: 'Frecuencia respiratoria', u: 'rpm', min: 0, max: 80, step: 1 },
  { t: 'num', id: 'pas', l: 'PAS', u: 'mmHg', min: 30, max: 300, step: 1 },
  { t: 'num', id: 'pad', l: 'PAD', u: 'mmHg', min: 10, max: 200, step: 1 },
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 }
];
const I_CRB = I_CURB.filter(i => i.id != 'urea');
const curbItems = (v, urea) => {
  const c = { C: !!v.conf, R: v.fr >= 30, B: v.pas < 90 || v.pad <= 60, A: v.edad >= 65 };
  if (urea) c.U = v.urea / 6.006 > 7;
  return c;
};

const I_PSI = [
  { t: 'head', l: 'Datos demográficos' },
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'sel', id: 'sexo', l: 'Sexo', o: [['m', 'Masculino'], ['f', 'Femenino']] },
  { t: 'chk', id: 'geri', l: 'Residente en hogar geriátrico / institución', pts: 10 },
  { t: 'head', l: 'Comorbilidades' },
  { t: 'chk', id: 'neo', l: 'Enfermedad neoplásica (activa o diagnosticada en el último año, salvo carcinoma basocelular o espinocelular de piel)', pts: 30 },
  { t: 'chk', id: 'hep', l: 'Hepatopatía (cirrosis o hepatitis crónica activa)', pts: 20 },
  { t: 'chk', id: 'ic', l: 'Insuficiencia cardíaca', pts: 10 },
  { t: 'chk', id: 'acv', l: 'Enfermedad cerebrovascular', pts: 10 },
  { t: 'chk', id: 'renal', l: 'Enfermedad renal crónica', pts: 10 },
  { t: 'head', l: 'Examen físico' },
  { t: 'chk', id: 'mental', l: 'Alteración del estado mental (desorientación, estupor o coma)', pts: 20 },
  { t: 'num', id: 'fr', l: 'Frecuencia respiratoria', u: 'rpm', min: 0, max: 80, step: 1 },
  { t: 'num', id: 'pas', l: 'PAS', u: 'mmHg', min: 30, max: 300, step: 1 },
  { t: 'num', id: 'temp', l: 'Temperatura', u: '°C', min: 25, max: 45, step: 0.1, alt: [U.f_temp] },
  { t: 'num', id: 'fc', l: 'Pulso', u: 'lpm', min: 10, max: 300, step: 1 },
  { t: 'head', l: 'Laboratorio e imágenes (no se requieren si cumple clase I)' },
  { t: 'num', id: 'ph', l: 'pH arterial', u: '', min: 6.5, max: 8, step: 0.01, req: 0 },
  { t: 'num', id: 'urea', l: 'Urea sérica', u: 'mg/dL', min: 1, max: 700, step: 1, alt: [U.bun_mgdl, U.urea_mmol], req: 0 },
  { t: 'num', id: 'na', l: 'Sodio', u: 'mEq/L', min: 90, max: 200, step: 1, req: 0 },
  { t: 'num', id: 'glu', l: 'Glucemia', u: 'mg/dL', min: 10, max: 2000, step: 1, alt: [U.glu_mmol], req: 0 },
  { t: 'num', id: 'hto', l: 'Hematocrito', u: '%', min: 5, max: 80, step: 0.1, req: 0 },
  { t: 'num', id: 'pao2', l: 'PaO₂ (o completar SpO₂)', u: 'mmHg', min: 20, max: 700, step: 1, alt: [U.kpa], req: 0 },
  { t: 'num', id: 'spo2', l: 'SpO₂ (si no hay PaO₂)', u: '%', min: 40, max: 100, step: 1, req: 0 },
  { t: 'chk', id: 'derr', l: 'Derrame pleural en la radiografía', pts: 10 }
];
const PSI_CL = [['I', '0,1%', 'ok'], ['II', '0,6%', 'ok'], ['III', '0,9%', 'warn'], ['IV', '9,3%', 'bad'], ['V', '27,0%', 'bad']];

const I_WPE = [
  { t: 'chk', id: 'tvp', l: 'Signos y síntomas clínicos de TVP (edema de MI y dolor a la palpación de venas profundas)', pts: 3 },
  { t: 'chk', id: 'alt', l: 'TEP es el diagnóstico más probable (o igual de probable que otro)', pts: 3 },
  { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 10, max: 300, step: 1 },
  { t: 'chk', id: 'inm', l: 'Inmovilización ≥ 3 días o cirugía en las 4 semanas previas', pts: 1.5 },
  { t: 'chk', id: 'prev', l: 'TVP o TEP previos', pts: 1.5 },
  { t: 'chk', id: 'hemop', l: 'Hemoptisis', pts: 1 },
  { t: 'chk', id: 'neo', l: 'Cáncer activo (en tratamiento, tratado en los últimos 6 meses o paliativo)', pts: 1 }
];

const I_WDVT = [
  { t: 'chk', id: 'neo', l: 'Cáncer activo (tratamiento en curso, en los últimos 6 meses o paliativo)' },
  { t: 'chk', id: 'par', l: 'Parálisis, paresia o inmovilización reciente con yeso de MI' },
  { t: 'chk', id: 'cama', l: 'Reposo en cama reciente ≥ 3 días o cirugía mayor (anestesia general o regional) en las últimas 12 semanas' },
  { t: 'chk', id: 'dolor', l: 'Dolor localizado a lo largo del sistema venoso profundo' },
  { t: 'chk', id: 'pierna', l: 'Edema de todo el miembro inferior' },
  { t: 'chk', id: 'pant', l: 'Aumento del diámetro de la pantorrilla ≥ 3 cm respecto de la contralateral (10 cm por debajo de la tuberosidad tibial)' },
  { t: 'chk', id: 'fovea', l: 'Edema con fóvea limitado a la pierna sintomática' },
  { t: 'chk', id: 'colat', l: 'Venas superficiales colaterales (no varicosas)' },
  { t: 'chk', id: 'prev', l: 'TVP previa documentada' },
  { t: 'chk', id: 'altdx', l: 'Diagnóstico alternativo al menos tan probable como TVP', pts: -2 }
];

const I_GEN = [
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'chk', id: 'prev', l: 'TVP o TEP previos', pts: 3 },
  { t: 'chk', id: 'cir', l: 'Cirugía (anestesia general) o fractura de MI en el último mes', pts: 2 },
  { t: 'chk', id: 'neo', l: 'Neoplasia maligna activa (sólida o hematológica, activa o considerada curada hace < 1 año)', pts: 2 },
  { t: 'chk', id: 'dolor', l: 'Dolor unilateral de miembro inferior', pts: 3 },
  { t: 'chk', id: 'hemop', l: 'Hemoptisis', pts: 2 },
  { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 10, max: 300, step: 1 },
  { t: 'chk', id: 'palp', l: 'Dolor a la palpación venosa profunda de MI y edema unilateral', pts: 4 }
];
const I_GENS = I_GEN.map(i => (i.t == 'chk' ? { ...i, pts: 1 } : i));

const I_PERC = [
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'num', id: 'fc', l: 'Frecuencia cardíaca', u: 'lpm', min: 10, max: 300, step: 1 },
  { t: 'num', id: 'spo2', l: 'SpO₂ (aire ambiente)', u: '%', min: 40, max: 100, step: 1 },
  { t: 'chk', id: 'edema', l: 'Edema unilateral de miembro inferior' },
  { t: 'chk', id: 'hemop', l: 'Hemoptisis' },
  { t: 'chk', id: 'cir', l: 'Cirugía o trauma (que requirió anestesia general u hospitalización) en las últimas 4 semanas' },
  { t: 'chk', id: 'prev', l: 'TEP o TVP previos' },
  { t: 'chk', id: 'horm', l: 'Uso de estrógenos (anticonceptivos orales, terapia hormonal)' }
];

const I_PESI = [
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'sel', id: 'sexo', l: 'Sexo', o: [['m', 'Masculino', 10], ['f', 'Femenino', 0]] },
  { t: 'chk', id: 'neo', l: 'Cáncer (activo o antecedente)', pts: 30 },
  { t: 'chk', id: 'ic', l: 'Insuficiencia cardíaca crónica', pts: 10 },
  { t: 'chk', id: 'epc', l: 'Enfermedad pulmonar crónica', pts: 10 },
  { t: 'num', id: 'fc', l: 'Pulso', u: 'lpm', min: 10, max: 300, step: 1 },
  { t: 'num', id: 'pas', l: 'PAS', u: 'mmHg', min: 30, max: 300, step: 1 },
  { t: 'num', id: 'fr', l: 'Frecuencia respiratoria', u: 'rpm', min: 0, max: 80, step: 1 },
  { t: 'num', id: 'temp', l: 'Temperatura', u: '°C', min: 25, max: 45, step: 0.1, alt: [U.f_temp] },
  { t: 'chk', id: 'mental', l: 'Alteración del estado mental (desorientación, letargo, estupor o coma)', pts: 60 },
  { t: 'num', id: 'spo2', l: 'SpO₂ (con o sin O₂)', u: '%', min: 40, max: 100, step: 1 }
];

const I_SPESI = [
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 18, max: 120, step: 1 },
  { t: 'chk', id: 'neo', l: 'Cáncer' },
  { t: 'chk', id: 'cp', l: 'Enfermedad cardiopulmonar crónica (insuficiencia cardíaca o enfermedad pulmonar crónica)' },
  { t: 'num', id: 'fc', l: 'Pulso', u: 'lpm', min: 10, max: 300, step: 1 },
  { t: 'num', id: 'pas', l: 'PAS', u: 'mmHg', min: 30, max: 300, step: 1 },
  { t: 'num', id: 'spo2', l: 'SpO₂', u: '%', min: 40, max: 100, step: 1 }
];

const I_CENTOR = [
  { t: 'chk', id: 'exu', l: 'Exudado o tumefacción amigdalina' },
  { t: 'chk', id: 'adn', l: 'Adenopatías cervicales anteriores dolorosas o aumentadas de tamaño' },
  { t: 'chk', id: 'fiebre', l: 'Temperatura > 38 °C' },
  { t: 'chk', id: 'tos', l: 'Ausencia de tos' },
  { t: 'num', id: 'edad', l: 'Edad', u: 'años', min: 3, max: 120, step: 1 }
];

// ───────────────────────────── INFECTOLOGÍA ─────────────────────────────

const DUKE_MAY = [
  ['mmic', 'Microbiológico: microorganismo típico en ≥ 2 hemocultivos separados; atípico en ≥ 3; PCR/secuenciación en sangre positiva para Coxiella burnetii, Bartonella spp. o Tropheryma whipplei; IgG fase I anti-C. burnetii > 1:800 o aislamiento en un hemocultivo; IgG anti-Bartonella (IFI) ≥ 1:800'],
  ['mimg', 'Imagen: ecocardiograma o TC cardíaca con vegetación, perforación o aneurisma valvar, absceso, seudoaneurisma o fístula intracardíaca; regurgitación nueva significativa; dehiscencia parcial nueva de prótesis; o PET/TC con ¹⁸F-FDG con captación anormal en válvula, injerto o cable de dispositivo (según tipo de prótesis y tiempo desde el implante)'],
  ['mqx', 'Quirúrgico: evidencia de EI por inspección directa intraoperatoria, sin criterio mayor de imagen ni confirmación histológica o microbiológica posterior']
];
const DUKE_MEN = [
  ['pred', 'Predisposición: EI previa, prótesis valvular, reparación valvular previa, cardiopatía congénita, valvulopatía más que leve, dispositivo electrónico cardíaco endovascular, miocardiopatía hipertrófica obstructiva o uso de drogas inyectables'],
  ['fiebre', 'Fiebre > 38,0 °C'],
  ['vasc', 'Fenómenos vasculares (clínicos o por imágenes): émbolos arteriales, infartos pulmonares sépticos, absceso cerebral o esplénico, aneurisma micótico, hemorragia intracraneal, hemorragias conjuntivales, lesiones de Janeway, púrpura purulenta'],
  ['inmuno', 'Fenómenos inmunológicos: factor reumatoideo positivo, nódulos de Osler, manchas de Roth o glomerulonefritis por inmunocomplejos'],
  ['micro', 'Microbiológico menor: hemocultivos con microorganismo compatible que no cumple criterio mayor, o cultivo/PCR/secuenciación positivos de otro sitio estéril no cardíaco'],
  ['img', 'Imagen menor: captación anormal en PET/TC con ¹⁸F-FDG dentro de los 3 meses del implante de prótesis valvular, injerto aórtico o dispositivo'],
  ['ex', 'Examen físico: soplo regurgitante nuevo a la auscultación, si no se dispone de ecocardiograma']
];
const I_DUKE = [
  { t: 'head', l: 'Criterios patológicos' },
  { t: 'chk', id: 'pat1', l: 'Microorganismos identificados en vegetación, tejido cardíaco, válvula o prótesis explantada, injerto o émbolo (cultivo, tinción, inmunología, PCR, secuenciación o hibridación in situ) en un contexto clínico de EI activa' },
  { t: 'chk', id: 'pat2', l: 'Histología con endocarditis activa en vegetación, tejido cardíaco, válvula, injerto o émbolo' },
  { t: 'head', l: 'Criterios clínicos mayores' },
  ...DUKE_MAY.map(([id, l]) => ({ t: 'chk', id, l })),
  { t: 'head', l: 'Criterios clínicos menores' },
  ...DUKE_MEN.map(([id, l]) => ({ t: 'chk', id, l })),
  { t: 'head', l: 'Criterios de rechazo' },
  { t: 'chk', id: 'rch1', l: 'Diagnóstico alternativo firme que explica los hallazgos' },
  { t: 'chk', id: 'rch2', l: 'Ausencia de recurrencia pese a < 4 días de tratamiento antibiótico' },
  { t: 'chk', id: 'rch3', l: 'Sin evidencia patológica o macroscópica de EI en cirugía o autopsia, con < 4 días de antibióticos' }
];

const I_LRINEC = [
  { t: 'num', id: 'pcr', l: 'PCR', u: 'mg/L', min: 0, max: 1000, step: 0.1, alt: [CRP_MGDL] },
  { t: 'num', id: 'gb', l: 'Leucocitos', u: '×10³/µL', min: 0, max: 300, step: 0.1 },
  { t: 'num', id: 'hb', l: 'Hemoglobina', u: 'g/dL', min: 1, max: 25, step: 0.1, alt: [U.hb_gl] },
  { t: 'num', id: 'na', l: 'Sodio', u: 'mEq/L', min: 90, max: 200, step: 1 },
  { t: 'num', id: 'cr', l: 'Creatinina', u: 'mg/dL', min: 0.1, max: 30, step: 0.01, alt: [U.creat_umol] },
  { t: 'num', id: 'glu', l: 'Glucemia', u: 'mg/dL', min: 10, max: 2000, step: 1, alt: [U.glu_mmol] }
];

export default [
  // ═════════════ CARDIOLOGÍA ═════════════
  {
    id: 'cha2ds2-vasc', m: 's', cat: 'cardiologia', n: 'CHA₂DS₂-VASc', sig: 'CHA₂DS₂-VASc',
    syn: ['chads vasc', 'chadsvasc', 'fibrilacion auricular', 'riesgo de acv', 'anticoagulacion'],
    tipo: 'score pronóstico',
    fin: 'Estratifica el riesgo de ACV y tromboembolismo sistémico en fibrilación auricular no valvular.',
    ver: 'Lip 2010 (Euro Heart Survey); categorías según ESC 2020 (sexo femenino como modificador). La ESC 2024 lo reemplazó por CHA₂DS₂-VA.',
    formula: 'IC 1 · HTA 1 · edad ≥ 75 años 2 · DM 1 · ACV/AIT/TE 2 · enfermedad vascular 1 · edad 65–74 años 1 · sexo femenino 1 (máx. 9).\nCategorías ESC 2020: 0 (H) / 1 (M) bajo; 1 (H) / 2 (M) intermedio; ≥ 2 (H) / ≥ 3 (M) alto.',
    in: I_VASC,
    calc: v => {
      const s = pts(v, I_VASC) + edadVasc(v.edad), sinSexo = s - (v.sexo == 'f' ? 1 : 0);
      const b = sinSexo == 0 ? ['Riesgo bajo', 'ok'] : sinSexo == 1 ? ['Riesgo intermedio (1 factor no sexual)', 'warn'] : ['Riesgo alto (≥ 2 factores no sexuales)', 'bad'];
      return { r: s, u: 'pts', d: 0, interp: b[0], lvl: b[1], note: v.sexo == 'f' ? 'El sexo femenino es un modificador de riesgo: por sí solo (puntaje 1) no eleva el riesgo.' : '' };
    },
    ref: 'Lip GYH, Nieuwlaat R, Pisters R, Lane DA, Crijns HJGM. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach: the Euro Heart Survey on Atrial Fibrillation. Chest. 2010;137(2):263-272. · Hindricks G, et al. 2020 ESC Guidelines for the diagnosis and management of atrial fibrillation. Eur Heart J. 2021;42(5):373-498.',
    url: 'https://doi.org/10.1378/chest.09-1584', verif: V,
    pop: 'Pacientes con fibrilación auricular no valvular (Euro Heart Survey, n = 1084 sin anticoagulación).',
    lim: 'No aplica a FA con estenosis mitral moderada-grave ni prótesis mecánica. La indicación de anticoagulación requiere evaluar también el riesgo de sangrado y la situación clínica. La ESC 2024 recomienda CHA₂DS₂-VA (sin sexo).',
    tests: [
      { v: { edad: 72, sexo: 'f', hta: true }, r: 3 },
      { v: { edad: 50, sexo: 'm' }, r: 'bajo' },
      { v: { edad: 80, sexo: 'm', acv: true, dm: true }, r: 5 }
    ]
  },
  {
    id: 'cha2ds2-va', m: 's', cat: 'cardiologia', n: 'CHA₂DS₂-VA', sig: 'CHA₂DS₂-VA',
    syn: ['chads va', 'fibrilacion auricular', 'esc 2024', 'riesgo de acv'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo tromboembólico en fibrilación auricular sin incluir el sexo, según la guía ESC 2024.',
    ver: 'ESC 2024 (Van Gelder et al.): CHA₂DS₂-VASc sin el criterio de sexo femenino.',
    formula: 'IC 1 · HTA 1 · edad ≥ 75 años 2 · DM 1 · ACV/AIT/TE 2 · enfermedad vascular 1 · edad 65–74 años 1 (máx. 8).\nESC 2024: ≥ 2 → ACO recomendada (clase I); 1 → ACO a considerar (clase IIa).',
    in: I_VA,
    calc: v => {
      const s = pts(v, I_VA) + edadVasc(v.edad);
      const b = band(s, [[0, 0, 'Riesgo bajo', 'ok'], [1, 1, 'Riesgo intermedio (umbral clase IIa de la ESC 2024)', 'warn'], [2, 8, 'Riesgo alto (umbral clase I de la ESC 2024)', 'bad']]);
      return { r: s, u: 'pts', d: 0, ...b };
    },
    ref: 'Van Gelder IC, Rienstra M, Bunting KV, et al. 2024 ESC Guidelines for the management of atrial fibrillation developed in collaboration with the European Association for Cardio-Thoracic Surgery (EACTS). Eur Heart J. 2024;45(36):3314-3414.',
    url: 'https://doi.org/10.1093/eurheartj/ehae176', verif: V,
    pop: 'Pacientes con fibrilación auricular (adoptado por la ESC 2024 a partir de las cohortes de CHA₂DS₂-VASc).',
    lim: 'No aplica a FA con estenosis mitral moderada-grave ni prótesis mecánica. La guía considera otros factores de riesgo no incluidos (p. ej., cáncer, ERC, biomarcadores). El score no reemplaza la evaluación del riesgo hemorrágico.',
    tests: [
      { v: { edad: 72, hta: true }, r: 2 },
      { v: { edad: 60 }, r: 0 },
      { v: { edad: 66 }, r: 'intermedio' }
    ]
  },
  {
    id: 'has-bled', m: 's', cat: 'cardiologia', n: 'HAS-BLED', sig: 'HAS-BLED',
    syn: ['hasbled', 'riesgo de sangrado', 'anticoagulacion', 'fibrilacion auricular'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de sangrado mayor a un año en pacientes con fibrilación auricular anticoagulados.',
    ver: 'Pisters 2010 (Euro Heart Survey).',
    formula: 'Un punto por cada ítem: HTA no controlada (PAS > 160), función renal anormal, función hepática anormal, ACV, sangrado, RIN lábil, edad > 65 años, fármacos (antiagregantes/AINE), alcohol (máx. 9). ≥ 3 = alto riesgo.',
    in: I_HASBLED,
    calc: v => {
      const s = pts(v, I_HASBLED) + (v.edad > 65 ? 1 : 0);
      return { r: s, u: 'pts', d: 0, ...(s >= 3 ? { interp: 'Riesgo de sangrado alto (≥ 3)', lvl: 'bad' } : { interp: 'Riesgo de sangrado no alto (< 3)', lvl: 'ok' }),
        note: s >= 3 ? 'Un puntaje alto indica corregir los factores modificables y un seguimiento más estrecho; no contraindica por sí solo la anticoagulación.' : '' };
    },
    ref: 'Pisters R, Lane DA, Nieuwlaat R, de Vos CB, Crijns HJGM, Lip GYH. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation: the Euro Heart Survey. Chest. 2010;138(5):1093-1100.',
    url: 'https://doi.org/10.1378/chest.10-0134', verif: V,
    pop: 'Pacientes con fibrilación auricular del Euro Heart Survey (n = 3978).',
    lim: 'Capacidad discriminativa moderada. La «L» (RIN lábil) solo aplica a antagonistas de vitamina K. No debe usarse para negar la anticoagulación.',
    tests: [
      { v: { edad: 70, hta: true, drog: true }, r: 3 },
      { v: { edad: 60 }, r: 0 }
    ]
  },
  {
    id: 'heart-score', m: 's', cat: 'cardiologia', n: 'HEART Score', sig: 'HEART',
    syn: ['heart', 'dolor toracico', 'sindrome coronario agudo', 'guardia'],
    tipo: 'score pronóstico',
    fin: 'Estratifica el riesgo de eventos cardíacos adversos mayores (MACE) a 6 semanas en pacientes con dolor torácico en guardia.',
    ver: 'Six 2008; validación prospectiva Backus 2013.',
    formula: 'Historia 0–2 · ECG 0–2 · Edad (< 45 = 0; 45–64 = 1; ≥ 65 = 2) · Factores de riesgo 0–2 · Troponina 0–2 (máx. 10).\n0–3 bajo · 4–6 intermedio · 7–10 alto.',
    in: I_HEART,
    calc: v => {
      const s = pts(v, I_HEART) + (v.edad >= 65 ? 2 : v.edad >= 45 ? 1 : 0);
      const b = band(s, [[0, 3, 'Riesgo bajo (MACE a 6 semanas 0,9–1,7%)', 'ok'], [4, 6, 'Riesgo intermedio (MACE 12–16,6%)', 'warn'], [7, 10, 'Riesgo alto (MACE 50–65%)', 'bad']]);
      return { r: s, u: 'pts', d: 0, ...b };
    },
    ref: 'Six AJ, Backus BE, Kelder JC. Chest pain in the emergency room: value of the HEART score. Neth Heart J. 2008;16(6):191-196. · Backus BE, Six AJ, Kelder JC, et al. A prospective validation of the HEART score for chest pain patients at the emergency department. Int J Cardiol. 2013;168(3):2153-2158.',
    url: 'https://doi.org/10.1007/BF03086144', verif: V,
    pop: 'Adultos con dolor torácico en el departamento de emergencias (Países Bajos).',
    lim: 'No aplica a IAMCEST ni a pacientes inestables. Validado con troponina convencional; con troponina de alta sensibilidad se usa en combinación con algoritmos seriados. Componente «historia» subjetivo.',
    tests: [
      { v: { h: 1, e: 0, edad: 50, r: 1, t: 0 }, r: 3 },
      { v: { h: 2, e: 2, edad: 70, r: 2, t: 2 }, r: 10 }
    ]
  },
  {
    id: 'timi-scasest', m: 's', cat: 'cardiologia', n: 'TIMI para AI / IAMSEST', sig: 'TIMI',
    syn: ['timi', 'angina inestable', 'iamsest', 'scasest', 'sindrome coronario'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de muerte, IAM o revascularización urgente a 14 días en angina inestable / IAM sin elevación del ST.',
    ver: 'TIMI UA/NSTEMI (Antman 2000). Para IAMCEST usar la versión TIMI STEMI.',
    formula: 'Un punto por cada ítem: edad ≥ 65, ≥ 3 FR coronario, enfermedad coronaria conocida (≥ 50%), AAS en 7 días, ≥ 2 anginas en 24 h, desviación del ST ≥ 0,5 mm, marcadores elevados (máx. 7).',
    in: I_TIMI,
    calc: v => {
      const s = pts(v, I_TIMI) + (v.edad >= 65 ? 1 : 0);
      const ev = s <= 1 ? '4,7%' : s == 2 ? '8,3%' : s == 3 ? '13,2%' : s == 4 ? '19,9%' : s == 5 ? '26,2%' : '40,9%';
      return { r: s, u: 'pts', d: 0, interp: `Muerte, IAM o revascularización urgente a 14 días: ${ev}`, lvl: s <= 2 ? 'ok' : s <= 4 ? 'warn' : 'bad' };
    },
    ref: 'Antman EM, Cohen M, Bernink PJ, et al. The TIMI risk score for unstable angina/non-ST elevation MI: a method for prognostication and therapeutic decision making. JAMA. 2000;284(7):835-842.',
    url: 'https://doi.org/10.1001/jama.284.7.835', verif: V,
    pop: 'Pacientes con AI/IAMSEST de los ensayos TIMI 11B y ESSENCE.',
    lim: 'Derivado en población de ensayos clínicos (era previa a la troponina ultrasensible). GRACE tiene mejor discriminación para mortalidad.',
    tests: [
      { v: { edad: 70, fr: true, aas: true, st: true }, r: 4 },
      { v: { edad: 50 }, r: '4,7%' }
    ]
  },
  {
    id: 'timi-scacest', m: 's', cat: 'cardiologia', n: 'TIMI para IAMCEST', sig: 'TIMI STEMI',
    syn: ['timi stemi', 'iamcest', 'supradesnivel st', 'infarto'],
    tipo: 'score pronóstico',
    fin: 'Estima la mortalidad a 30 días en IAM con elevación del ST candidato a fibrinólisis.',
    ver: 'TIMI STEMI (Morrow 2000).',
    formula: 'Edad 65–74 = 2, ≥ 75 = 3 · DM/HTA/angina 1 · PAS < 100 = 3 · FC > 100 = 2 · Killip II–IV 2 · peso < 67 kg 1 · ST anterior o BCRI 1 · tiempo al tratamiento > 4 h 1 (máx. 14).',
    in: I_TIMIS,
    calc: v => {
      const s = pts(v, I_TIMIS) + (v.edad >= 75 ? 3 : v.edad >= 65 ? 2 : 0) + (v.pas < 100 ? 3 : 0) + (v.fc > 100 ? 2 : 0) + (v.peso < 67 ? 1 : 0);
      const m = s > 8 ? '35,9%' : coma(TIMIS_M[s]) + '%';
      return { r: s, u: 'pts', d: 0, interp: `Mortalidad a 30 días: ${m}`, lvl: s <= 2 ? 'ok' : s <= 4 ? 'warn' : 'bad' };
    },
    ref: 'Morrow DA, Antman EM, Charlesworth A, et al. TIMI risk score for ST-elevation myocardial infarction: a convenient, bedside, clinical score for risk assessment at presentation: an intravenous nPA for treatment of infarcting myocardium early II trial substudy. Circulation. 2000;102(17):2031-2037.',
    url: 'https://doi.org/10.1161/01.CIR.102.17.2031', verif: V,
    pop: 'Pacientes con IAMCEST elegibles para fibrinólisis (ensayo InTIME II).',
    lim: 'Derivado en pacientes tratados con fibrinolíticos; puede subestimar o sobrestimar el riesgo en la era de angioplastia primaria.',
    tests: [
      { v: { edad: 70, ant: true, pas: 120, fc: 80, killip: 1, peso: 80, stant: true }, r: 4 },
      { v: { edad: 80, pas: 90, fc: 110, killip: 3, peso: 60, ant: true, stant: true, t4: true }, r: 14 },
      { v: { edad: 50, pas: 130, fc: 70, killip: 1, peso: 75 }, r: '0,8%' }
    ]
  },
  {
    id: 'grace-intrahosp', m: 's', cat: 'cardiologia', n: 'GRACE (mortalidad intrahospitalaria)', sig: 'GRACE',
    syn: ['grace', 'sindrome coronario agudo', 'mortalidad hospitalaria', 'scasest', 'scacest'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de muerte intrahospitalaria en síndromes coronarios agudos con y sin elevación del ST.',
    ver: 'GRACE intrahospitalario, nomograma de Granger 2003 (no GRACE 2.0).',
    formula: 'Suma de puntos: edad, FC, PAS, creatinina, Killip (0/20/39/59), paro al ingreso 39, desviación del ST 28, marcadores elevados 14.\nSCASEST: ≤ 108 bajo (< 1%), 109–140 intermedio (1–3%), > 140 alto (> 3%).\nSCACEST: ≤ 125 bajo (< 2%), 126–154 intermedio (2–5%), ≥ 155 alto (> 5%).',
    in: I_GRACE,
    calc: v => {
      const pe = lt(v.edad, [[30, 0], [40, 8], [50, 25], [60, 41], [70, 58], [80, 75], [90, 91]], 100);
      const pf = lt(v.fc, [[50, 0], [70, 3], [90, 9], [110, 15], [150, 24], [200, 38]], 46);
      const pp = lt(v.pas, [[80, 58], [100, 53], [120, 43], [140, 34], [160, 24], [200, 10]], 0);
      const pc = lt(v.cr, [[0.4, 1], [0.8, 4], [1.2, 7], [1.6, 10], [2, 13], [4, 21]], 28);
      const s = pe + pf + pp + pc + pts(v, I_GRACE);
      const b = v.sca == 'sest'
        ? band(s, [[0, 108, 'Riesgo bajo (mortalidad intrahospitalaria < 1%)', 'ok'], [109, 140, 'Riesgo intermedio (1–3%)', 'warn'], [141, 999, 'Riesgo alto (> 3%)', 'bad']])
        : band(s, [[0, 125, 'Riesgo bajo (mortalidad intrahospitalaria < 2%)', 'ok'], [126, 154, 'Riesgo intermedio (2–5%)', 'warn'], [155, 999, 'Riesgo alto (> 5%)', 'bad']]);
      return { r: s, u: 'pts', d: 0, ...b, more: [['Edad', pe], ['FC', pf], ['PAS', pp], ['Creatinina', pc]] };
    },
    ref: 'Granger CB, Goldberg RJ, Dabbous O, et al. Predictors of hospital mortality in the global registry of acute coronary events. Arch Intern Med. 2003;163(19):2345-2353.',
    url: 'https://doi.org/10.1001/archinte.163.19.2345', verif: V,
    pop: 'Pacientes con SCA (IAMCEST, IAMSEST y angina inestable) del registro multinacional GRACE (n = 11 389).',
    lim: 'Categorías de riesgo según las usadas en guías ACC/AHA y ESC. GRACE 2.0 (calculadora en línea) usa ecuaciones continuas y estima también mortalidad a 6 meses–3 años. Usar los valores del ingreso.',
    tests: [
      { v: { sca: 'sest', edad: 70, fc: 80, pas: 130, cr: 1.0, killip: 1, st: true, enz: true }, r: 167 },
      { v: { sca: 'sest', edad: 45, fc: 65, pas: 150, cr: 0.9, killip: 1 }, r: 'bajo' },
      { v: { sca: 'cest', edad: 85, fc: 120, pas: 85, cr: 2.5, killip: 4, paro: true, st: true, enz: true }, r: 329 }
    ]
  },
  {
    id: 'killip-kimball', m: 's', cat: 'cardiologia', n: 'Clasificación de Killip-Kimball', sig: 'Killip',
    syn: ['killip', 'insuficiencia cardiaca en iam', 'shock cardiogenico'],
    tipo: 'clasificación',
    fin: 'Clasifica la gravedad de la insuficiencia cardíaca en el IAM agudo según el examen físico.',
    ver: 'Killip y Kimball 1967.',
    formula: 'I: sin signos de IC · II: rales en < 50% de los campos, S3, ingurgitación yugular · III: edema agudo de pulmón (rales > 50%) · IV: shock cardiogénico.',
    in: [{ t: 'sel', id: 'k', l: 'Clase', o: [
      [1, 'I — Sin signos de insuficiencia cardíaca'],
      [2, 'II — Rales en < 50% de los campos pulmonares, S3 o ingurgitación yugular'],
      [3, 'III — Edema agudo de pulmón (rales en > 50% de los campos)'],
      [4, 'IV — Shock cardiogénico (hipotensión, hipoperfusión periférica)']] }],
    calc: v => {
      const k = +v.k, m = ['6%', '17%', '38%', '81%'][k - 1];
      return { r: 'Killip ' + ['I', 'II', 'III', 'IV'][k - 1], interp: `Mortalidad hospitalaria en la serie original: ${m}`, lvl: k == 1 ? 'ok' : k == 2 ? 'warn' : 'bad' };
    },
    ref: 'Killip T 3rd, Kimball JT. Treatment of myocardial infarction in a coronary care unit. A two year experience with 250 patients. Am J Cardiol. 1967;20(4):457-464.',
    url: 'https://doi.org/10.1016/0002-9149(67)90023-9', verif: V,
    pop: 'Pacientes con IAM internados en unidad coronaria (n = 250), era previa a la reperfusión.',
    lim: 'Las mortalidades corresponden a la serie de 1967; actualmente son menores, pero la clase mantiene valor pronóstico.',
    tests: [{ v: { k: 1 }, r: 'Killip I' }, { v: { k: 4 }, r: '81%' }]
  },
  {
    id: 'nyha', m: 's', cat: 'cardiologia', n: 'Clase funcional NYHA', sig: 'NYHA',
    syn: ['clase funcional', 'new york heart association', 'disnea', 'insuficiencia cardiaca'],
    tipo: 'clasificación',
    fin: 'Clasifica la limitación funcional por síntomas en pacientes con cardiopatía/insuficiencia cardíaca.',
    ver: 'NYHA, Criteria Committee, 9.ª ed. (1994).',
    formula: 'I: sin limitación · II: limitación leve (síntomas con actividad habitual) · III: limitación marcada (síntomas con actividad menor a la habitual) · IV: síntomas en reposo.',
    in: [{ t: 'sel', id: 'c', l: 'Clase', o: [
      [1, 'I — Sin limitación de la actividad física; la actividad habitual no causa síntomas'],
      [2, 'II — Limitación leve; cómodo en reposo, la actividad habitual causa fatiga, palpitaciones o disnea'],
      [3, 'III — Limitación marcada; cómodo en reposo, actividad menor que la habitual causa síntomas'],
      [4, 'IV — Incapacidad de realizar cualquier actividad sin síntomas; síntomas en reposo']] }],
    calc: v => ({ r: 'NYHA ' + ['I', 'II', 'III', 'IV'][+v.c - 1], lvl: ['ok', 'warn', 'bad', 'bad'][+v.c - 1] }),
    ref: 'The Criteria Committee of the New York Heart Association. Nomenclature and Criteria for Diagnosis of Diseases of the Heart and Great Vessels. 9th ed. Boston: Little, Brown & Co; 1994:253-256.',
    verif: V,
    pop: 'Pacientes con cardiopatía; ampliamente usada en insuficiencia cardíaca.',
    lim: 'Subjetiva, con variabilidad interobservador; puede cambiar con el tratamiento. No equivale a los estadios ACC/AHA (A–D).',
    tests: [{ v: { c: 2 }, r: 'NYHA II' }, { v: { c: 4 }, r: 'NYHA IV' }]
  },
  {
    id: 'h2fpef', m: 's', cat: 'cardiologia', n: 'H₂FPEF', sig: 'H₂FPEF',
    syn: ['h2fpef', 'icfep', 'insuficiencia cardiaca con fraccion de eyeccion preservada', 'hfpef'],
    tipo: 'score pronóstico',
    fin: 'Estima la probabilidad de insuficiencia cardíaca con fracción de eyección preservada en pacientes con disnea no explicada.',
    ver: 'Reddy 2018, versión de puntaje entero (0–9). No incluye el modelo continuo.',
    formula: 'IMC > 30 kg/m² 2 · ≥ 2 antihipertensivos 1 · FA 3 · PSAP > 35 mmHg 1 · edad > 60 años 1 · E/e′ > 9 1 (máx. 9).\n0–1 probabilidad baja · 2–5 intermedia · 6–9 alta.',
    in: I_H2,
    calc: v => {
      const s = pts(v, I_H2) + (v.imc > 30 ? 2 : 0) + (v.psap > 35 ? 1 : 0) + (v.edad > 60 ? 1 : 0) + (v.ee > 9 ? 1 : 0);
      const b = band(s, [[0, 1, 'Probabilidad baja de ICFEp', 'ok'], [2, 5, 'Probabilidad intermedia: requiere estudios adicionales', 'warn'], [6, 9, 'Probabilidad alta de ICFEp', 'bad']]);
      return { r: s, u: 'pts', d: 0, ...b };
    },
    ref: 'Reddy YNV, Carter RE, Obokata M, Redfield MM, Borlaug BA. A simple, evidence-based approach to help guide diagnosis of heart failure with preserved ejection fraction. Circulation. 2018;138(9):861-870.',
    url: 'https://doi.org/10.1161/CIRCULATIONAHA.118.034646', verif: V,
    pop: 'Pacientes euvolémicos con disnea no explicada y FEVI ≥ 50% derivados a cateterismo con ejercicio (Mayo Clinic).',
    lim: 'La probabilidad individual exacta requiere el modelo continuo publicado por los autores (no incluido: no se pudieron verificar los coeficientes). Requiere ecocardiograma; si no se puede estimar la PSAP, el puntaje es incompleto. Rendimiento menor en obesidad extrema y en otras poblaciones.',
    tests: [
      { v: { imc: 32, hta: true, fa: true, psap: 40, edad: 70, ee: 12 }, r: 9 },
      { v: { imc: 25, psap: 30, edad: 50, ee: 7 }, r: 'baja' }
    ]
  },
  {
    id: 'framingham-ic', m: 's', cat: 'cardiologia', n: 'Criterios de Framingham para insuficiencia cardíaca', sig: 'Framingham',
    syn: ['framingham', 'insuficiencia cardiaca', 'criterios mayores menores'],
    tipo: 'criterio diagnóstico',
    fin: 'Criterios clínicos para el diagnóstico de insuficiencia cardíaca congestiva.',
    ver: 'McKee 1971 (Framingham Heart Study).',
    formula: 'Diagnóstico: ≥ 2 criterios mayores, o 1 mayor + ≥ 2 menores. Los menores solo cuentan si no son atribuibles a otra causa. La pérdida de peso con tratamiento puede contar como mayor o menor.',
    in: I_FRAM,
    calc: v => {
      const M = FRAM_MAY.filter(([id]) => v[id]).length, m = FRAM_MEN.filter(([id]) => v[id]).length;
      const ok = M >= 2 || (M >= 1 && m >= 2);
      return { r: ok ? 'Cumple criterios de IC' : 'No cumple criterios', interp: `${M} mayor(es), ${m} menor(es)`, lvl: ok ? 'bad' : 'ok' };
    },
    ref: 'McKee PA, Castelli WP, McNamara PM, Kannel WB. The natural history of congestive heart failure: the Framingham study. N Engl J Med. 1971;285(26):1441-1446.',
    url: 'https://doi.org/10.1056/NEJM197112232852601', verif: V,
    pop: 'Cohorte poblacional de Framingham (Massachusetts).',
    lim: 'Alta sensibilidad y especificidad moderada. No distingue fenotipos por FEVI. No incluye péptidos natriuréticos ni ecocardiograma. Los hallazgos de autopsia del original no se incluyen.',
    tests: [
      { v: { dpn: true, yug: true }, r: 'Cumple' },
      { v: { rales: true, edema: true, tos: true }, r: 'Cumple' },
      { v: { rales: true, edema: true }, r: 'No cumple' }
    ]
  },
  {
    id: 'precise-dapt', m: 's', cat: 'cardiologia', n: 'PRECISE-DAPT', sig: 'PRECISE-DAPT',
    syn: ['precise dapt', 'doble antiagregacion', 'sangrado', 'dapt'],
    tipo: 'score pronóstico',
    fin: 'Estima el riesgo de sangrado durante la doble antiagregación plaquetaria tras una angioplastia coronaria.',
    ver: 'Costa 2017.',
    ref: 'Costa F, van Klaveren D, James S, et al. Derivation and validation of the predicting bleeding complications in patients undergoing stent implantation and subsequent dual antiplatelet therapy (PRECISE-DAPT) score: a pooled analysis of individual-patient datasets from clinical trials. Lancet. 2017;389(10073):1025-1034.',
    url: 'https://doi.org/10.1016/S0140-6736(17)30397-5', verif: V,
    pop: 'Pacientes con angioplastia coronaria y doble antiagregación (8 ensayos clínicos).',
    lim: 'Puntaje ≥ 25 = alto riesgo de sangrado según la publicación.',
    pend: 'El puntaje se obtiene de un nomograma gráfico (Hb, leucocitos, edad, ClCr, sangrado previo) cuyos puntos por valor no se pudieron verificar contra la fuente; usar la calculadora oficial (precisedaptscore.com).'
  },

  // ═════════════ UTI ═════════════
  {
    id: 'sofa', m: 's', cat: 'uti', tags: ['s:infectologia'], n: 'SOFA', sig: 'SOFA',
    syn: ['sofa', 'disfuncion organica', 'sepsis', 'falla multiorganica', 'sepsis-3'],
    tipo: 'score pronóstico',
    fin: 'Cuantifica la disfunción de seis sistemas orgánicos; un aumento ≥ 2 puntos por infección define sepsis (Sepsis-3).',
    ver: 'SOFA original (Vincent 1996); definición de sepsis Sepsis-3 (Singer 2016).',
    formula: 'Respiratorio (PaO₂/FiO₂: < 400 = 1; < 300 = 2; < 200 con soporte = 3; < 100 con soporte = 4) · Coagulación (plaquetas < 150/100/50/20) · Hígado (bilirrubina 1,2–1,9 / 2,0–5,9 / 6,0–11,9 / ≥ 12 mg/dL) · Cardiovascular (PAM y vasoactivos) · SNC (Glasgow 13–14 / 10–12 / 6–9 / < 6) · Renal (creatinina 1,2–1,9 / 2,0–3,4 / 3,5–4,9 o diuresis < 500 mL/d / ≥ 5,0 o < 200 mL/d). 0–4 por sistema; máx. 24.',
    in: I_SOFA,
    calc: v => {
      const pf = v.pao2 / (v.fio2 / 100);
      let r = pf >= 400 ? 0 : pf >= 300 ? 1 : 2;
      if (v.sop == 1 && pf < 200) r = pf < 100 ? 4 : 3;
      const c = lt(v.plq, [[20, 4], [50, 3], [100, 2], [150, 1]], 0);
      const h = lt(v.bili, [[1.2, 0], [2, 1], [6, 2], [12, 3]], 4);
      const cv = +v.cv;
      const n = v.gcs == 15 ? 0 : v.gcs >= 13 ? 1 : v.gcs >= 10 ? 2 : v.gcs >= 6 ? 3 : 4;
      let k = lt(v.cr, [[1.2, 0], [2, 1], [3.5, 2], [5, 3]], 4);
      if (v.diu != null) k = Math.max(k, v.diu < 200 ? 4 : v.diu < 500 ? 3 : 0);
      const s = r + c + h + cv + n + k;
      return { r: s, u: 'pts', d: 0, interp: s >= 2 ? 'SOFA ≥ 2: en contexto de infección, compatible con disfunción orgánica (sepsis) si representa un aumento ≥ 2 respecto del basal' : 'SOFA < 2', lvl: s >= 2 ? 'bad' : 'ok',
        more: [['PaO₂/FiO₂', String(Math.round(pf))], ['Respiratorio', r], ['Coagulación', c], ['Hígado', h], ['Cardiovascular', cv], ['SNC', n], ['Renal', k]] };
    },
    ref: 'Vincent JL, Moreno R, Takala J, et al. The SOFA (Sepsis-related Organ Failure Assessment) score to describe organ dysfunction/failure. Intensive Care Med. 1996;22(7):707-710. · Singer M, Deutschman CS, Seymour CW, et al. The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):801-810.',
    url: 'https://doi.org/10.1007/BF01709751', verif: V,
    pop: 'Pacientes críticos adultos en UTI.',
    lim: 'Usar el peor valor de cada sistema en las últimas 24 h. El SOFA basal se asume 0 si no hay disfunción previa conocida. En pacientes sedados usar el Glasgow estimado previo a la sedación. No es una herramienta de tamizaje ni define por sí sola el tratamiento.',
    tests: [
      { v: { pao2: 90, fio2: 21, sop: 0, plq: 250, bili: 0.8, cv: 0, gcs: 15, cr: 0.9 }, r: 0 },
      { v: { pao2: 80, fio2: 50, sop: 1, plq: 90, bili: 2.5, cv: 3, gcs: 9, cr: 2.2, diu: 400 }, r: 16 },
      { v: { pao2: 60, fio2: 40, sop: 0, plq: 140, bili: 1.0, cv: 1, gcs: 14, cr: 1.0 }, r: 5 }
    ]
  },
  {
    id: 'qsofa', m: 's', cat: 'uti', tags: ['s:infectologia'], n: 'qSOFA', sig: 'qSOFA',
    syn: ['quick sofa', 'qsofa', 'sepsis', 'sepsis-3'],
    tipo: 'regla de decisión',
    fin: 'Identifica, fuera de UTI, pacientes con sospecha de infección con mayor riesgo de mala evolución.',
    ver: 'Sepsis-3 (Seymour 2016).',
    formula: 'FR ≥ 22 rpm · alteración del sensorio (Glasgow < 15) · PAS ≤ 100 mmHg. Positivo: ≥ 2 de 3.',
    in: [
      { t: 'num', id: 'fr', l: 'Frecuencia respiratoria', u: 'rpm', min: 0, max: 80, step: 1 },
      { t: 'num', id: 'pas', l: 'PAS', u: 'mmHg', min: 30, max: 300, step: 1 },
      { t: 'sel', id: 'ment', l: 'Estado mental', o: [[0, 'Sin alteración (Glasgow 15)'], [1, 'Alteración del sensorio (Glasgow < 15)']] }
    ],
    calc: v => {
      const s = (v.fr >= 22 ? 1 : 0) + (v.pas <= 100 ? 1 : 0) + (+v.ment ? 1 : 0);
      return { r: s, u: '/3', d: 0, interp: s >= 2 ? 'qSOFA positivo (≥ 2): mayor riesgo de mortalidad o estadía prolongada en UTI; evaluar disfunción orgánica (SOFA)' : 'qSOFA negativo (< 2)', lvl: s >= 2 ? 'bad' : 'ok' };
    },
    ref: 'Seymour CW, Liu VX, Iwashyna TJ, et al. Assessment of clinical criteria for sepsis: for the Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3). JAMA. 2016;315(8):762-774.',
    url: 'https://doi.org/10.1001/jama.2016.0288', verif: V,
    pop: 'Adultos con sospecha de infección fuera de la UTI (cohortes de EE. UU. y Alemania).',
    lim: 'Baja sensibilidad: no sirve como herramienta de tamizaje ni para descartar sepsis (la Surviving Sepsis Campaign 2021 desaconseja usarlo solo). No es criterio diagnóstico de sepsis.',
    tests: [
      { v: { fr: 24, pas: 95, ment: 0 }, r: 2 },
      { v: { fr: 18, pas: 120, ment: 0 }, r: 'negativo' }
    ]
  },
  {
    id: 'apache-ii', m: 's', cat: 'uti', n: 'APACHE II', sig: 'APACHE II',
    syn: ['apache', 'apache 2', 'gravedad uti', 'mortalidad uti'],
    tipo: 'score pronóstico',
    fin: 'Clasifica la gravedad de la enfermedad en pacientes críticos a partir de la fisiología aguda, la edad y la salud crónica.',
    ver: 'Knaus 1985. Se muestra solo el puntaje (la mortalidad requiere el peso de la categoría diagnóstica).',
    formula: 'APS (12 variables fisiológicas, 0–4 c/u; creatinina × 2 si IRA; Glasgow = 15 − GCS) + edad (≤ 44 = 0; 45–54 = 2; 55–64 = 3; 65–74 = 5; ≥ 75 = 6) + salud crónica (5 no quirúrgico/urgencia; 2 cirugía programada). Oxigenación: FiO₂ ≥ 50% → gradiente A–a; FiO₂ < 50% → PaO₂. Máx. 71.',
    in: I_APACHE,
    calc: v => {
      const f = v.fio2 / 100;
      const aa = f * (760 - 47) - v.paco2 / 0.8 - v.pao2;
      const ox = f >= 0.5 ? ge(aa, [[500, 4], [350, 3], [200, 2]], 0) : v.pao2 > 70 ? 0 : v.pao2 >= 61 ? 1 : v.pao2 >= 55 ? 3 : 4;
      const p = {
        temp: ge(v.temp, [[41, 4], [39, 3], [38.5, 1], [36, 0], [34, 1], [32, 2], [30, 3]], 4),
        pam: ge(v.pam, [[160, 4], [130, 3], [110, 2], [70, 0], [50, 2]], 4),
        fc: ge(v.fc, [[180, 4], [140, 3], [110, 2], [70, 0], [55, 2], [40, 3]], 4),
        fr: ge(v.fr, [[50, 4], [35, 3], [25, 1], [12, 0], [10, 1], [6, 2]], 4),
        ox,
        ph: ge(v.ph, [[7.7, 4], [7.6, 3], [7.5, 1], [7.33, 0], [7.25, 2], [7.15, 3]], 4),
        na: ge(v.na, [[180, 4], [160, 3], [155, 2], [150, 1], [130, 0], [120, 2], [111, 3]], 4),
        k: ge(v.k, [[7, 4], [6, 3], [5.5, 1], [3.5, 0], [3, 1], [2.5, 2]], 4),
        cr: ge(v.cr, [[3.5, 4], [2, 3], [1.5, 2], [0.6, 0]], 2) * (+v.ira ? 2 : 1),
        hto: ge(v.hto, [[60, 4], [50, 2], [46, 1], [30, 0], [20, 2]], 4),
        gb: ge(v.gb, [[40, 4], [20, 2], [15, 1], [3, 0], [1, 2]], 4),
        gcs: 15 - v.gcs
      };
      const aps = Object.values(p).reduce((a, b) => a + b, 0);
      const pe = v.edad >= 75 ? 6 : v.edad >= 65 ? 5 : v.edad >= 55 ? 3 : v.edad >= 45 ? 2 : 0;
      const pc = pts(v, I_APACHE);
      return { r: aps + pe + pc, u: 'pts', d: 0, lvl: aps + pe + pc >= 25 ? 'bad' : aps + pe + pc >= 15 ? 'warn' : 'ok',
        more: [['APS (fisiología aguda)', aps], ['Edad', pe], ['Salud crónica', pc], [f >= 0.5 ? 'Gradiente A–a (mmHg)' : 'PaO₂ (mmHg)', String(Math.round(f >= 0.5 ? aa : v.pao2))]],
        note: 'El color es orientativo: la mortalidad estimada depende de la categoría diagnóstica de ingreso (Knaus 1985).' };
    },
    ref: 'Knaus WA, Draper EA, Wagner DP, Zimmerman JE. APACHE II: a severity of disease classification system. Crit Care Med. 1985;13(10):818-829.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/3928249/', verif: V,
    pop: 'Adultos en UTI (13 hospitales de EE. UU., n = 5815); excluye quemados, coronarios y cirugía cardíaca.',
    lim: 'Usar el peor valor de las primeras 24 h. Gradiente A–a calculado a nivel del mar (Patm 760 mmHg, cociente respiratorio 0,8). Temperatura original rectal. Calibración desactualizada (sobrestima mortalidad en cohortes actuales). Insuficiencia orgánica crónica según definiciones de Knaus (cirrosis por biopsia, NYHA IV, EPOC grave, diálisis, inmunosupresión).',
    tests: [
      { v: { temp: 37, pam: 90, fc: 80, fr: 16, fio2: 21, pao2: 90, paco2: 40, ph: 7.4, na: 140, k: 4, cr: 1, ira: 0, hto: 40, gb: 8, gcs: 15, edad: 40, cron: 0 }, r: 0 },
      { v: { temp: 39.5, pam: 90, fc: 120, fr: 16, fio2: 21, pao2: 90, paco2: 40, ph: 7.4, na: 140, k: 4, cr: 1, ira: 0, hto: 40, gb: 8, gcs: 13, edad: 70, cron: 'urg' }, r: 17 },
      { v: { temp: 37, pam: 60, fc: 80, fr: 30, fio2: 60, pao2: 70, paco2: 40, ph: 7.2, na: 140, k: 4, cr: 2.5, ira: 1, hto: 40, gb: 8, gcs: 15, edad: 50, cron: 0 }, r: 16 }
    ]
  },
  {
    id: 'saps-ii', m: 's', cat: 'uti', n: 'SAPS II', sig: 'SAPS II',
    syn: ['saps', 'saps 2', 'simplified acute physiology score', 'mortalidad uti'],
    tipo: 'score pronóstico',
    fin: 'Estima la mortalidad hospitalaria de pacientes críticos a partir de 17 variables de las primeras 24 h en UTI.',
    ver: 'Le Gall 1993, con ecuación logística original.',
    formula: '17 variables (12 fisiológicas, edad, tipo de ingreso y 3 enfermedades crónicas). Máx. 163.\nlogit = −7,7631 + 0,0737 × SAPS II + 0,9971 × ln(SAPS II + 1); mortalidad = e^logit / (1 + e^logit).',
    in: I_SAPS,
    calc: v => {
      let pf = 0;
      if (+v.vm) {
        if (v.pao2 == null || v.fio2 == null) return { r: 'Incompleto', interp: 'Con VM/CPAP hay que cargar PaO₂ y FiO₂', lvl: '' };
        const x = v.pao2 / (v.fio2 / 100); pf = x < 100 ? 11 : x < 200 ? 9 : 6;
      }
      const s =
        lt(v.edad, [[40, 0], [60, 7], [70, 12], [75, 15], [80, 16]], 18) +
        lt(v.fc, [[40, 11], [70, 2], [120, 0], [160, 4]], 7) +
        lt(v.pas, [[70, 13], [100, 5], [200, 0]], 2) +
        (v.temp >= 39 ? 3 : 0) + pf +
        lt(v.diu, [[500, 11], [1000, 4]], 0) +
        lt(v.urea, [[60, 0], [180, 6]], 10) +
        lt(v.gb, [[1, 12], [20, 0]], 3) +
        lt(v.k, [[3, 3], [5, 0]], 3) +
        lt(v.na, [[125, 5], [145, 0]], 1) +
        lt(v.hco3, [[15, 6], [20, 3]], 0) +
        lt(v.bili, [[4, 0], [6, 4]], 9) +
        lt(v.gcs, [[6, 26], [9, 13], [11, 7], [14, 5]], 0) +
        pts(v, I_SAPS);
      const lg = -7.7631 + 0.0737 * s + 0.9971 * Math.log(s + 1), m = 100 / (1 + Math.exp(-lg));
      return { r: s, u: 'pts', d: 0, interp: `Mortalidad hospitalaria estimada: ${coma(m)}%`, lvl: m < 10 ? 'ok' : m < 40 ? 'warn' : 'bad', more: [['Mortalidad estimada', coma(m) + '%']] };
    },
    ref: 'Le Gall JR, Lemeshow S, Saulnier F. A new Simplified Acute Physiology Score (SAPS II) based on a European/North American multicenter study. JAMA. 1993;270(24):2957-2963.',
    url: 'https://doi.org/10.1001/jama.1993.03510240069035', verif: V,
    pop: 'Adultos en UTI clínicas y quirúrgicas de Europa y Norteamérica (n = 12 997); excluye quemados, coronarios y cirugía cardíaca.',
    lim: 'Peor valor de las primeras 24 h. Urea: umbrales originales en BUN 28/84 mg/dL (≈ urea 60/180 mg/dL; 10/30 mmol/L). Enfermedad crónica es una única variable en el original. Calibración desactualizada (tiende a sobrestimar la mortalidad); la ecuación no es aplicable a decisiones individuales.',
    tests: [
      { v: { edad: 30, fc: 80, pas: 120, temp: 37, vm: 0, diu: 1500, urea: 30, gb: 8, k: 4, na: 140, hco3: 24, bili: 1, gcs: 15, cron: 0, ing: 'prog' }, r: 0 },
      { v: { edad: 65, fc: 130, pas: 85, temp: 38, vm: 1, pao2: 80, fio2: 50, diu: 800, urea: 100, gb: 22, k: 4, na: 140, hco3: 18, bili: 1, gcs: 15, cron: 0, ing: 'med' }, r: 52 },
      { v: { edad: 65, fc: 130, pas: 85, temp: 38, vm: 1, pao2: 80, fio2: 50, diu: 800, urea: 100, gb: 22, k: 4, na: 140, hco3: 18, bili: 1, gcs: 15, cron: 0, ing: 'med' }, r: '50,7%' }
    ]
  },
  {
    id: 'news2', m: 's', cat: 'uti', n: 'NEWS2', sig: 'NEWS2',
    syn: ['news', 'national early warning score', 'alerta temprana', 'deterioro clinico'],
    tipo: 'escala clínica',
    fin: 'Detecta deterioro clínico agudo a partir de signos vitales, para escalar la respuesta asistencial.',
    ver: 'NEWS2, Royal College of Physicians 2017 (escalas 1 y 2 de SpO₂).',
    formula: 'FR, SpO₂ (escala 1 o 2), O₂ suplementario (2), PAS, pulso, conciencia (ACVPU: nueva confusión o V/P/U = 3), temperatura; 0–3 por parámetro.\n0–4 bajo (3 en un solo parámetro = bajo-medio) · 5–6 medio · ≥ 7 alto.',
    in: I_NEWS,
    calc: v => {
      const p = [
        le(v.fr, [[8, 3], [11, 1], [20, 0], [24, 2]], 3),
        0,
        +v.o2 ? 2 : 0,
        le(v.pas, [[90, 3], [100, 2], [110, 1], [219, 0]], 3),
        le(v.fc, [[40, 3], [50, 1], [90, 0], [110, 1], [130, 2]], 3),
        +v.conc ? 3 : 0,
        le(v.temp, [[35, 3], [36, 1], [38, 0], [39, 1]], 2)
      ];
      if (+v.esc == 2) p[1] = (v.spo2 >= 93 && +v.o2) ? le(v.spo2, [[94, 1], [96, 2]], 3) : v.spo2 >= 88 ? 0 : le(v.spo2, [[83, 3], [85, 2]], 1);
      else p[1] = le(v.spo2, [[91, 3], [93, 2], [95, 1]], 0);
      const s = p.reduce((a, b) => a + b, 0), red = p.some((x, i) => i != 2 && x == 3);
      const b = s >= 7 ? ['Riesgo clínico alto: respuesta de emergencia', 'bad'] : s >= 5 ? ['Riesgo clínico medio: respuesta urgente', 'warn'] : red ? ['Riesgo bajo-medio (3 en un parámetro): evaluación urgente en sala', 'warn'] : ['Riesgo clínico bajo', 'ok'];
      return { r: s, u: 'pts', d: 0, interp: b[0], lvl: b[1] };
    },
    ref: 'Royal College of Physicians. National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS. Updated report of a working party. London: RCP; 2017.',
    url: 'https://www.rcp.ac.uk/improving-care/resources/national-early-warning-score-news-2/', verif: V,
    pop: 'Adultos (≥ 16 años) hospitalizados o en atención prehospitalaria/guardia.',
    lim: 'No validado en embarazadas ni menores de 16 años. La escala 2 solo se usa con indicación médica en insuficiencia respiratoria hipercápnica. Usar mediciones simultáneas actuales. La respuesta escalonada depende del protocolo institucional.',
    tests: [
      { v: { fr: 16, esc: 1, spo2: 97, o2: 0, pas: 120, fc: 75, conc: 0, temp: 37 }, r: 0 },
      { v: { fr: 26, esc: 1, spo2: 90, o2: 1, pas: 95, fc: 125, conc: 1, temp: 39.5 }, r: 17 },
      { v: { fr: 18, esc: 2, spo2: 90, o2: 1, pas: 120, fc: 80, conc: 0, temp: 37 }, r: 2 },
      { v: { fr: 18, esc: 2, spo2: 97, o2: 1, pas: 120, fc: 80, conc: 0, temp: 37 }, r: 5 }
    ]
  },
  {
    id: 'mews', m: 's', cat: 'uti', n: 'MEWS (Modified Early Warning Score)', sig: 'MEWS',
    syn: ['mews', 'modified early warning score', 'alerta temprana'],
    tipo: 'escala clínica',
    fin: 'Identifica pacientes internados con riesgo de deterioro, ingreso a UTI o muerte.',
    ver: 'Subbe 2001.',
    formula: 'PAS (≤ 70 = 3; 71–80 = 2; 81–100 = 1; 101–199 = 0; ≥ 200 = 2) · FC (≤ 40 = 2; 41–50 = 1; 51–100 = 0; 101–110 = 1; 111–129 = 2; ≥ 130 = 3) · FR (< 9 = 2; 9–14 = 0; 15–20 = 1; 21–29 = 2; ≥ 30 = 3) · Temperatura (< 35 = 2; 35–38,4 = 0; ≥ 38,5 = 2) · AVPU (A 0; V 1; P 2; U 3). ≥ 5 = riesgo aumentado.',
    in: I_MEWS,
    calc: v => {
      const s = le(v.pas, [[70, 3], [80, 2], [100, 1], [199, 0]], 2) +
        le(v.fc, [[40, 2], [50, 1], [100, 0], [110, 1], [129, 2]], 3) +
        lt(v.fr, [[9, 2], [15, 0], [21, 1], [30, 2]], 3) +
        lt(v.temp, [[35, 2], [38.5, 0]], 2) + pts(v, I_MEWS);
      return { r: s, u: 'pts', d: 0, interp: s >= 5 ? 'MEWS ≥ 5: mayor riesgo de muerte e ingreso a UTI' : 'MEWS < 5', lvl: s >= 5 ? 'bad' : s >= 3 ? 'warn' : 'ok' };
    },
    ref: 'Subbe CP, Kruger M, Rutherford P, Gemmel L. Validation of a modified Early Warning Score in medical admissions. QJM. 2001;94(10):521-526.',
    url: 'https://doi.org/10.1093/qjmed/94.10.521', verif: V,
    pop: 'Pacientes adultos ingresados a una unidad de admisión médica (Reino Unido, n = 673).',
    lim: 'Existen múltiples variantes locales de MEWS con distintos umbrales; esta es la de Subbe 2001. Para adultos el NHS recomienda NEWS2. El color intermedio (3–4) es orientativo, no de la fuente.',
    tests: [
      { v: { pas: 120, fc: 80, fr: 12, temp: 37, avpu: 'A' }, r: 0 },
      { v: { pas: 75, fc: 135, fr: 32, temp: 39, avpu: 'P' }, r: 12 }
    ]
  },
  {
    id: 'sirs', m: 's', cat: 'uti', tags: ['s:infectologia'], n: 'Criterios de SIRS', sig: 'SIRS',
    syn: ['sirs', 'respuesta inflamatoria sistemica', 'sepsis 1'],
    tipo: 'criterio diagnóstico',
    fin: 'Define el síndrome de respuesta inflamatoria sistémica (consenso ACCP/SCCM 1991).',
    ver: 'Bone 1992 (consenso ACCP/SCCM). Sepsis-3 ya no usa SIRS para definir sepsis.',
    formula: 'Temperatura > 38 °C o < 36 °C · FC > 90 lpm · FR > 20 rpm o PaCO₂ < 32 mmHg · Leucocitos > 12 000/µL, < 4000/µL o > 10% de formas inmaduras. SIRS: ≥ 2 criterios.',
    in: I_SIRS,
    calc: v => {
      const c = [v.temp > 38 || v.temp < 36, v.fc > 90, v.fr > 20 || (v.paco2 != null && v.paco2 < 32), v.gb > 12 || v.gb < 4 || (v.cay != null && v.cay > 10)];
      const s = c.filter(Boolean).length;
      return { r: s, u: '/4', d: 0, interp: s >= 2 ? 'Cumple criterios de SIRS (≥ 2)' : 'No cumple criterios de SIRS', lvl: s >= 2 ? 'warn' : 'ok' };
    },
    ref: 'Bone RC, Balk RA, Cerra FB, et al. Definitions for sepsis and organ failure and guidelines for the use of innovative therapies in sepsis. The ACCP/SCCM Consensus Conference Committee. Chest. 1992;101(6):1644-1655.',
    url: 'https://doi.org/10.1378/chest.101.6.1644', verif: V,
    pop: 'Adultos; definición de consenso, no derivada estadísticamente.',
    lim: 'Poco específico (presente en muchos pacientes internados sin infección) y no sensible para sepsis. Sepsis-3 define sepsis por disfunción orgánica (SOFA).',
    tests: [
      { v: { temp: 38.5, fc: 100, fr: 18, gb: 9 }, r: 2 },
      { v: { temp: 37, fc: 80, fr: 16, gb: 8 }, r: 'No cumple' }
    ]
  },
  {
    id: 'clinical-frailty-scale', m: 's', cat: 'uti', tags: ['s:nutricion'], n: 'Escala Clínica de Fragilidad (Rockwood)', sig: 'CFS',
    syn: ['cfs', 'fragilidad', 'rockwood', 'clinical frailty scale'],
    tipo: 'escala clínica',
    fin: 'Gradúa la fragilidad global de adultos mayores según juicio clínico (función, comorbilidad y dependencia).',
    ver: 'CFS versión 2.0 (Rockwood y Theou 2020), 9 niveles.',
    formula: 'Juicio clínico del estado basal (≈ 2 semanas antes de la enfermedad aguda): 1 muy en forma … 9 enfermedad terminal. ≥ 5 = frágil.',
    in: [{ t: 'sel', id: 'c', l: 'Nivel (estado basal previo a la enfermedad aguda)', o: CFS.map(([k, l]) => [k, k + ' — ' + l]) }],
    calc: v => {
      const c = +v.c;
      const i = c <= 3 ? 'No frágil' : c == 4 ? 'Fragilidad muy leve' : c == 9 ? 'Enfermedad terminal' : 'Frágil';
      const nom = CFS[c - 1][1].split(' — ')[0];
      return { r: c, u: '/9', d: 0, interp: i == nom ? i : i + ' — ' + nom, lvl: c <= 3 ? 'ok' : c == 4 ? 'warn' : 'bad' };
    },
    ref: 'Rockwood K, Song X, MacKnight C, et al. A global clinical measure of fitness and frailty in elderly people. CMAJ. 2005;173(5):489-495. · Rockwood K, Theou O. Using the Clinical Frailty Scale in allocating scarce health care resources. Can Geriatr J. 2020;23(3):210-215.',
    url: 'https://doi.org/10.5770/cgj.23.463', verif: V,
    pop: 'Adultos ≥ 65 años (Canadian Study of Health and Aging).',
    lim: 'No validada en menores de 65 años ni en discapacidad estable aislada (p. ej., parálisis cerebral, discapacidad intelectual). En demencia, el nivel refleja la gravedad. Evaluar el estado basal, no el agudo. No debe usarse aislada para decisiones de limitación del esfuerzo terapéutico.',
    tests: [{ v: { c: 3 }, r: 'No frágil' }, { v: { c: 6 }, r: 'Frágil' }]
  },
  {
    id: 'braden', m: 's', cat: 'uti', n: 'Escala de Braden', sig: 'Braden',
    syn: ['braden', 'lesiones por presion', 'escaras', 'ulceras por presion'],
    tipo: 'escala clínica',
    fin: 'Estima el riesgo de desarrollar lesiones por presión.',
    ver: 'Bergstrom y Braden 1987; categorías de riesgo de uso habitual (Ayello y Braden 2002).',
    formula: 'Seis subescalas: percepción sensorial, humedad, actividad, movilidad, nutrición (1–4) y fricción/cizallamiento (1–3). Total 6–23 (menor puntaje = mayor riesgo).\n≤ 9 muy alto · 10–12 alto · 13–14 moderado · 15–18 leve · ≥ 19 sin riesgo.',
    in: I_BRADEN,
    calc: v => {
      const s = pts(v, I_BRADEN);
      const b = band(s, [[6, 9, 'Riesgo muy alto', 'bad'], [10, 12, 'Riesgo alto', 'bad'], [13, 14, 'Riesgo moderado', 'warn'], [15, 18, 'Riesgo leve', 'warn'], [19, 23, 'Sin riesgo aumentado', 'ok']]);
      return { r: s, u: 'pts', d: 0, ...b };
    },
    ref: 'Bergstrom N, Braden BJ, Laguzza A, Holman V. The Braden Scale for Predicting Pressure Sore Risk. Nurs Res. 1987;36(4):205-210. · Ayello EA, Braden B. How and why to do pressure ulcer risk assessment. Adv Skin Wound Care. 2002;15(3):125-131.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/3299278/', verif: V,
    pop: 'Pacientes adultos hospitalizados.',
    lim: 'El punto de corte original fue ≤ 16 (≤ 18 en adultos mayores y algunas poblaciones). No reemplaza la valoración de la piel ni el juicio clínico. Para pediatría usar Braden Q.',
    tests: [
      { v: { sen: 4, hum: 4, act: 4, mov: 4, nut: 4, fri: 3 }, r: 23 },
      { v: { sen: 2, hum: 2, act: 1, mov: 2, nut: 2, fri: 1 }, r: 10 }
    ]
  },
  {
    id: 'morse-caidas', m: 's', cat: 'uti', n: 'Escala de caídas de Morse', sig: 'Morse',
    syn: ['morse', 'riesgo de caidas', 'caidas', 'fall scale'],
    tipo: 'escala clínica',
    fin: 'Estima el riesgo de caídas en pacientes hospitalizados.',
    ver: 'Morse 1989.',
    formula: 'Antecedente de caídas 25 · diagnóstico secundario 15 · ayuda para deambular 0/15/30 · vía venosa 20 · marcha 0/10/20 · estado mental 0/15 (máx. 125).\nBandas habituales: 0–24 bajo · 25–44 moderado · ≥ 45 alto.',
    in: I_MORSE,
    calc: v => {
      const s = pts(v, I_MORSE);
      return { r: s, u: 'pts', d: 0, ...band(s, [[0, 24, 'Riesgo bajo', 'ok'], [25, 44, 'Riesgo moderado', 'warn'], [45, 125, 'Riesgo alto (≥ 45)', 'bad']]) };
    },
    ref: 'Morse JM, Morse RM, Tylko SJ. Development of a scale to identify the fall-prone patient. Can J Aging. 1989;8(4):366-377.',
    url: 'https://doi.org/10.1017/S0714980800008576', verif: V,
    pop: 'Pacientes adultos hospitalizados (agudos, crónicos y de larga estancia).',
    lim: 'Morse propuso ≥ 45 como corte de alto riesgo y recomienda que cada institución ajuste los umbrales a su población; las bandas 0–24/25–44 son de uso habitual. No validada en pediatría.',
    tests: [
      { v: { caida: 1, dx2: 1, ayuda: 1, via: 1, marcha: 1, mental: 0 }, r: 85 },
      { v: { caida: 0, dx2: 1, ayuda: 0, via: 0, marcha: 0, mental: 0 }, r: 'bajo' }
    ]
  },

  // ═════════════ RESPIRATORIO / INFECTO ═════════════
  {
    id: 'curb-65', m: 's', cat: 'resp-infecto', tags: ['s:infectologia'], n: 'CURB-65', sig: 'CURB-65',
    syn: ['curb65', 'curb', 'neumonia', 'nac', 'neumonia aguda de la comunidad'],
    tipo: 'score pronóstico',
    fin: 'Estima la mortalidad a 30 días en neumonía adquirida en la comunidad.',
    ver: 'Lim 2003 (BTS).',
    formula: 'Confusión · Urea > 7 mmol/L (> 42 mg/dL; BUN > 19,6 mg/dL) · FR ≥ 30 · PAS < 90 o PAD ≤ 60 · edad ≥ 65. Un punto c/u (máx. 5).\n0–1 bajo · 2 intermedio · 3–5 alto.',
    in: I_CURB,
    calc: v => {
      const s = Object.values(curbItems(v, true)).filter(Boolean).length;
      const b = band(s, [[0, 1, 'Riesgo bajo (mortalidad a 30 días 1,5%)', 'ok'], [2, 2, 'Riesgo intermedio (9,2%)', 'warn'], [3, 5, 'Riesgo alto (22%)', 'bad']]);
      return { r: s, u: '/5', d: 0, ...b };
    },
    ref: 'Lim WS, van der Eerden MM, Laing R, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58(5):377-382.',
    url: 'https://doi.org/10.1136/thorax.58.5.377', verif: V,
    pop: 'Adultos con NAC en hospitales del Reino Unido, Nueva Zelanda y Países Bajos (n = 1068).',
    lim: 'Subestima la gravedad en jóvenes con hipoxemia o comorbilidades; no incluye oxigenación. La decisión de internación requiere juicio clínico.',
    tests: [
      { v: { conf: true, urea: 60, fr: 32, pas: 100, pad: 70, edad: 70 }, r: 4 },
      { v: { urea: 30, fr: 18, pas: 120, pad: 80, edad: 40 }, r: 0 },
      { v: { urea: 30, fr: 18, pas: 120, pad: 60, edad: 70 }, r: 'intermedio' }
    ]
  },
  {
    id: 'crb-65', m: 's', cat: 'resp-infecto', n: 'CRB-65', sig: 'CRB-65',
    syn: ['crb65', 'neumonia', 'nac', 'atencion primaria'],
    tipo: 'score pronóstico',
    fin: 'Estima la mortalidad en neumonía de la comunidad sin necesidad de laboratorio (ámbito ambulatorio).',
    ver: 'Bauer 2006 / BTS 2009.',
    formula: 'Confusión · FR ≥ 30 · PAS < 90 o PAD ≤ 60 · edad ≥ 65. Un punto c/u (máx. 4).\n0 bajo (< 1%) · 1–2 intermedio (1–10%) · 3–4 alto (> 10%).',
    in: I_CRB,
    calc: v => {
      const s = Object.values(curbItems(v, false)).filter(Boolean).length;
      return { r: s, u: '/4', d: 0, ...band(s, [[0, 0, 'Riesgo bajo (mortalidad < 1%)', 'ok'], [1, 2, 'Riesgo intermedio (1–10%)', 'warn'], [3, 4, 'Riesgo alto (> 10%)', 'bad']]) };
    },
    ref: 'Bauer TT, Ewig S, Marre R, Suttorp N, Welte T; CAPNETZ Study Group. CRB-65 predicts death from community-acquired pneumonia. J Intern Med. 2006;260(1):93-101. · Lim WS, Baudouin SV, George RC, et al. BTS guidelines for the management of community acquired pneumonia in adults: update 2009. Thorax. 2009;64 Suppl 3:iii1-55.',
    url: 'https://doi.org/10.1111/j.1365-2796.2006.01657.x', verif: V,
    pop: 'Adultos con NAC, ambulatorios e internados (red CAPNETZ, Alemania).',
    lim: 'Mismas limitaciones que CURB-65: no considera oxigenación ni comorbilidades.',
    tests: [
      { v: { fr: 18, pas: 120, pad: 80, edad: 40 }, r: 0 },
      { v: { conf: true, fr: 32, pas: 85, pad: 50, edad: 80 }, r: 4 }
    ]
  },
  {
    id: 'psi-port', m: 's', cat: 'resp-infecto', n: 'PSI / PORT (Pneumonia Severity Index)', sig: 'PSI',
    syn: ['psi', 'port', 'fine', 'pneumonia severity index', 'neumonia', 'nac'],
    tipo: 'score pronóstico',
    fin: 'Estratifica en 5 clases de riesgo de mortalidad a 30 días a los adultos con neumonía adquirida en la comunidad.',
    ver: 'Fine 1997 (PORT), algoritmo de dos pasos.',
    formula: 'Paso 1 — Clase I: ≤ 50 años, sin neoplasia, hepatopatía, IC, ACV ni ERC, y sin alteración mental, pulso ≥ 125, FR ≥ 30, PAS < 90 ni T < 35 o ≥ 40 °C.\nPaso 2 — Puntos: edad (mujer −10), institucionalizado 10, neoplasia 30, hepatopatía 20, IC 10, ACV 10, ERC 10, alteración mental 20, FR ≥ 30 20, PAS < 90 20, T < 35 o ≥ 40 15, pulso ≥ 125 10, pH < 7,35 30, BUN ≥ 30 mg/dL 20, Na < 130 20, glucemia ≥ 250 10, Hto < 30% 10, PaO₂ < 60 o SpO₂ < 90% 10, derrame pleural 10.\nII ≤ 70 · III 71–90 · IV 91–130 · V > 130.',
    in: I_PSI,
    calc: v => {
      const com = v.neo || v.hep || v.ic || v.acv || v.renal;
      const ex = v.mental || v.fc >= 125 || v.fr >= 30 || v.pas < 90 || v.temp < 35 || v.temp >= 40;
      if (v.edad <= 50 && !com && !ex) return { r: 'Clase I', interp: 'Mortalidad a 30 días en la cohorte de validación: 0,1%', lvl: 'ok' };
      const faltan = ['ph', 'urea', 'na', 'glu', 'hto'].filter(k => v[k] == null);
      if (v.pao2 == null && v.spo2 == null) faltan.push('PaO₂ o SpO₂');
      if (faltan.length) return { r: 'Incompleto', interp: 'No cumple criterios de clase I: completar laboratorio (' + faltan.join(', ') + ')', lvl: '' };
      const s = v.edad - (v.sexo == 'f' ? 10 : 0) + pts(v, I_PSI) +
        (v.fr >= 30 ? 20 : 0) + (v.pas < 90 ? 20 : 0) + (v.temp < 35 || v.temp >= 40 ? 15 : 0) + (v.fc >= 125 ? 10 : 0) +
        (v.ph < 7.35 ? 30 : 0) + (v.urea / 2.14 >= 30 ? 20 : 0) + (v.na < 130 ? 20 : 0) + (v.glu >= 250 ? 10 : 0) + (v.hto < 30 ? 10 : 0) +
        ((v.pao2 != null && v.pao2 < 60) || (v.spo2 != null && v.spo2 < 90) ? 10 : 0);
      const k = s <= 70 ? 1 : s <= 90 ? 2 : s <= 130 ? 3 : 4, c = PSI_CL[k];
      return { r: 'Clase ' + c[0], interp: `${s} puntos · mortalidad a 30 días en la cohorte de validación: ${c[1]}`, lvl: c[2], more: [['Puntos', s]] };
    },
    ref: 'Fine MJ, Auble TE, Yealy DM, et al. A prediction rule to identify low-risk patients with community-acquired pneumonia. N Engl J Med. 1997;336(4):243-250.',
    url: 'https://doi.org/10.1056/NEJM199701233360402', verif: V,
    pop: 'Adultos inmunocompetentes con NAC (derivación MedisGroups n = 14 199; validación PORT n = 2287).',
    lim: 'Peso elevado de la edad: subestima la gravedad en jóvenes y la sobrestima en ancianos. No evalúa factores sociales ni hipoxemia como criterio de internación. BUN = urea/2,14. Mortalidades de la cohorte PORT.',
    tests: [
      { v: { edad: 40, sexo: 'm', fr: 18, pas: 120, temp: 37.5, fc: 90 }, r: 'Clase I' },
      { v: { edad: 75, sexo: 'f', ic: true, fr: 32, pas: 110, temp: 38, fc: 110, ph: 7.4, urea: 80, na: 135, glu: 120, hto: 38, spo2: 88 }, r: 'Clase IV' },
      { v: { edad: 60, sexo: 'm', fr: 20, pas: 120, temp: 37, fc: 90, ph: 7.4, urea: 40, na: 140, glu: 100, hto: 40, spo2: 96 }, r: 'Clase II' },
      { v: { edad: 60, sexo: 'm', fr: 20, pas: 120, temp: 37, fc: 90 }, r: 'Incompleto' }
    ]
  },
  {
    id: 'wells-tep', m: 's', cat: 'resp-infecto', n: 'Wells para TEP', sig: 'Wells TEP',
    syn: ['wells', 'tep', 'tromboembolismo pulmonar', 'embolia pulmonar', 'probabilidad clinica'],
    tipo: 'regla de decisión',
    fin: 'Estima la probabilidad clínica pretest de tromboembolismo pulmonar.',
    ver: 'Wells 2000; interpretación en dos niveles (Wells 2000) y en tres niveles (Wells 1998/2001).',
    formula: 'Signos de TVP 3 · TEP diagnóstico más probable 3 · FC > 100 1,5 · inmovilización/cirugía reciente 1,5 · TVP/TEP previos 1,5 · hemoptisis 1 · cáncer 1 (máx. 12,5).\nDos niveles: ≤ 4 TEP improbable · > 4 probable. Tres niveles: < 2 baja · 2–6 intermedia · > 6 alta.',
    in: I_WPE,
    calc: v => {
      const s = pts(v, I_WPE) + (v.fc > 100 ? 1.5 : 0);
      const t2 = s > 4 ? 'TEP probable (> 4)' : 'TEP improbable (≤ 4)', t3 = s < 2 ? 'baja' : s <= 6 ? 'intermedia' : 'alta';
      return { r: s, u: 'pts', d: 1, interp: `${t2} · probabilidad ${t3} (tres niveles)`, lvl: s > 6 ? 'bad' : s > 4 ? 'warn' : 'ok' };
    },
    ref: 'Wells PS, Anderson DR, Rodger M, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the models utility with the SimpliRED D-dimer. Thromb Haemost. 2000;83(3):416-420. · Wells PS, Anderson DR, Rodger M, et al. Excluding pulmonary embolism at the bedside without diagnostic imaging. Ann Intern Med. 2001;135(2):98-107.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/10744147/', verif: V,
    pop: 'Pacientes ambulatorios e internados con sospecha de TEP (Canadá).',
    lim: 'El ítem «TEP diagnóstico más probable» es subjetivo. No aplicable en embarazadas sin validación específica (usar algoritmos adaptados). Integrar con dímero D y algoritmos diagnósticos.',
    tests: [
      { v: { tvp: true, alt: true, fc: 110 }, r: 7.5 },
      { v: { fc: 80, hemop: true }, r: 'improbable' }
    ]
  },
  {
    id: 'wells-tvp', m: 's', cat: 'resp-infecto', n: 'Wells para TVP', sig: 'Wells TVP',
    syn: ['wells', 'tvp', 'trombosis venosa profunda', 'probabilidad clinica'],
    tipo: 'regla de decisión',
    fin: 'Estima la probabilidad clínica pretest de trombosis venosa profunda de miembros inferiores.',
    ver: 'Wells modificado 2003 (incluye TVP previa); interpretación en dos niveles. Tres niveles según Wells 1997 como referencia.',
    formula: '1 punto c/u: cáncer activo, parálisis/yeso, reposo ≥ 3 días o cirugía mayor ≤ 12 semanas, dolor en trayecto venoso profundo, edema de toda la pierna, pantorrilla ≥ 3 cm, edema con fóvea, colaterales superficiales, TVP previa; −2 si diagnóstico alternativo igual o más probable.\nDos niveles: ≥ 2 TVP probable · < 2 improbable. Tres niveles: ≤ 0 baja · 1–2 intermedia · ≥ 3 alta.',
    in: I_WDVT,
    calc: v => {
      const s = pts(v, I_WDVT);
      const t3 = s <= 0 ? 'baja' : s <= 2 ? 'intermedia' : 'alta';
      return { r: s, u: 'pts', d: 0, interp: `${s >= 2 ? 'TVP probable (≥ 2)' : 'TVP improbable (< 2)'} · probabilidad ${t3} (tres niveles)`, lvl: s >= 3 ? 'bad' : s >= 2 ? 'warn' : 'ok' };
    },
    ref: 'Wells PS, Anderson DR, Rodger M, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003;349(13):1227-1235. · Wells PS, Anderson DR, Bormanis J, et al. Value of assessment of pretest probability of deep-vein thrombosis in clinical management. Lancet. 1997;350(9094):1795-1798.',
    url: 'https://doi.org/10.1056/NEJMoa023153', verif: V,
    pop: 'Pacientes ambulatorios con sospecha de primer episodio o recurrencia de TVP.',
    lim: 'La versión de tres niveles se derivó sin el ítem de TVP previa. Menor rendimiento en internados, ancianos y embarazadas. Integrar con dímero D y ecografía.',
    tests: [
      { v: { neo: true, pierna: true, pant: true }, r: 3 },
      { v: { dolor: true, altdx: true }, r: -1 },
      { v: { dolor: true, fovea: true }, r: 'probable' }
    ]
  },
  {
    id: 'ginebra-revisado', m: 's', cat: 'resp-infecto', n: 'Score de Ginebra revisado', sig: 'Ginebra',
    syn: ['geneva', 'ginebra', 'tep', 'tromboembolismo pulmonar'],
    tipo: 'regla de decisión',
    fin: 'Estima la probabilidad clínica pretest de TEP con variables objetivas.',
    ver: 'Ginebra revisado (Le Gal 2006), versión original con puntos ponderados.',
    formula: 'Edad > 65 1 · TVP/TEP previos 3 · cirugía o fractura ≤ 1 mes 2 · neoplasia activa 2 · dolor unilateral de MI 3 · hemoptisis 2 · FC 75–94 3, ≥ 95 5 · dolor a la palpación venosa y edema unilateral 4.\nTres niveles: 0–3 baja · 4–10 intermedia · ≥ 11 alta. Dos niveles: ≤ 5 improbable · ≥ 6 probable.',
    in: I_GEN,
    calc: v => {
      const s = pts(v, I_GEN) + (v.edad > 65 ? 1 : 0) + (v.fc >= 95 ? 5 : v.fc >= 75 ? 3 : 0);
      const t = s <= 3 ? ['baja (prevalencia de TEP 8%)', 'ok'] : s <= 10 ? ['intermedia (28%)', 'warn'] : ['alta (74%)', 'bad'];
      return { r: s, u: 'pts', d: 0, interp: `Probabilidad ${t[0]} · ${s >= 6 ? 'TEP probable' : 'TEP improbable'} (dos niveles)`, lvl: t[1] };
    },
    ref: 'Le Gal G, Righini M, Roy PM, et al. Prediction of pulmonary embolism in the emergency department: the revised Geneva score. Ann Intern Med. 2006;144(3):165-171. · Konstantinides SV, Meyer G, et al. 2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism. Eur Heart J. 2020;41(4):543-603.',
    url: 'https://doi.org/10.7326/0003-4819-144-3-200602070-00004', verif: V,
    pop: 'Pacientes ambulatorios con sospecha de TEP en guardias de Suiza y Francia.',
    lim: 'Validado en pacientes ambulatorios de guardia. Integrar con dímero D y algoritmos diagnósticos.',
    tests: [
      { v: { edad: 70, fc: 100, dolor: true }, r: 9 },
      { v: { edad: 40, fc: 70 }, r: 'baja' }
    ]
  },
  {
    id: 'ginebra-simplificado', m: 's', cat: 'resp-infecto', n: 'Score de Ginebra revisado simplificado', sig: 'Ginebra simpl.',
    syn: ['geneva simplificado', 'ginebra simplificado', 'tep'],
    tipo: 'regla de decisión',
    fin: 'Versión simplificada (1 punto por ítem) del score de Ginebra revisado para probabilidad pretest de TEP.',
    ver: 'Klok 2008.',
    formula: '1 punto c/u: edad > 65, TVP/TEP previos, cirugía o fractura ≤ 1 mes, neoplasia activa, dolor unilateral de MI, hemoptisis, dolor a la palpación venosa y edema unilateral; FC 75–94 1, ≥ 95 2.\nTres niveles: 0–1 baja · 2–4 intermedia · ≥ 5 alta. Dos niveles: ≤ 2 improbable · ≥ 3 probable.',
    in: I_GENS,
    calc: v => {
      const s = pts(v, I_GENS) + (v.edad > 65 ? 1 : 0) + (v.fc >= 95 ? 2 : v.fc >= 75 ? 1 : 0);
      const t = s <= 1 ? ['baja', 'ok'] : s <= 4 ? ['intermedia', 'warn'] : ['alta', 'bad'];
      return { r: s, u: 'pts', d: 0, interp: `Probabilidad ${t[0]} · ${s >= 3 ? 'TEP probable' : 'TEP improbable'} (dos niveles)`, lvl: t[1] };
    },
    ref: 'Klok FA, Mos ICM, Nijkeuter M, et al. Simplification of the revised Geneva score for assessing clinical probability of pulmonary embolism. Arch Intern Med. 2008;168(19):2131-2136.',
    url: 'https://doi.org/10.1001/archinte.168.19.2131', verif: V,
    pop: 'Pacientes con sospecha de TEP (cohortes de validación del score de Ginebra revisado y Christopher).',
    lim: 'Rendimiento similar al score original. Integrar con dímero D y algoritmos diagnósticos.',
    tests: [
      { v: { edad: 70, fc: 100, dolor: true }, r: 4 },
      { v: { edad: 40, fc: 70 }, r: 'improbable' }
    ]
  },
  {
    id: 'perc', m: 's', cat: 'resp-infecto', n: 'Criterios PERC', sig: 'PERC',
    syn: ['perc', 'pulmonary embolism rule-out criteria', 'tep', 'descartar tep'],
    tipo: 'regla de decisión',
    fin: 'Permite descartar TEP sin estudios adicionales en pacientes con baja probabilidad pretest cuando no hay ningún criterio presente.',
    ver: 'Kline 2004 (8 criterios).',
    formula: 'Edad ≥ 50 · FC ≥ 100 · SpO₂ < 95% (aire ambiente) · edema unilateral de MI · hemoptisis · cirugía o trauma ≤ 4 semanas · TEP/TVP previos · uso de estrógenos. PERC negativo = ningún criterio presente.',
    in: I_PERC,
    calc: v => {
      const n = pts(v, I_PERC) + (v.edad >= 50 ? 1 : 0) + (v.fc >= 100 ? 1 : 0) + (v.spo2 < 95 ? 1 : 0);
      return n == 0
        ? { r: 'PERC negativo', interp: 'Ningún criterio presente: con probabilidad pretest baja (< 15%), riesgo de TEP < 2%', lvl: 'ok' }
        : { r: 'PERC positivo', interp: `${n} criterio(s) presente(s): no permite descartar TEP con esta regla`, lvl: 'warn' };
    },
    ref: 'Kline JA, Mitchell AM, Kabrhel C, Richman PB, Courtney DM. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004;2(8):1247-1255.',
    url: 'https://doi.org/10.1111/j.1538-7836.2004.00790.x', verif: V,
    pop: 'Pacientes de guardia con sospecha de TEP y baja probabilidad clínica (EE. UU.).',
    lim: 'Solo aplicar si la probabilidad pretest es baja (gestalt < 15%). No aplicable en internados, embarazadas ni en poblaciones con alta prevalencia de TEP.',
    tests: [
      { v: { edad: 35, fc: 80, spo2: 98 }, r: 'negativo' },
      { v: { edad: 55, fc: 80, spo2: 98 }, r: 'positivo' }
    ]
  },
  {
    id: 'pesi', m: 's', cat: 'resp-infecto', n: 'PESI (Pulmonary Embolism Severity Index)', sig: 'PESI',
    syn: ['pesi', 'tep', 'pronostico tep', 'mortalidad tep'],
    tipo: 'score pronóstico',
    fin: 'Estima la mortalidad a 30 días en tromboembolismo pulmonar agudo confirmado.',
    ver: 'PESI original (Aujesky 2005), 11 variables, 5 clases.',
    formula: 'Edad (años) + sexo masculino 10 + cáncer 30 + IC 10 + enfermedad pulmonar crónica 10 + pulso ≥ 110 20 + PAS < 100 30 + FR ≥ 30 20 + T < 36 °C 20 + alteración mental 60 + SpO₂ < 90% 20.\nI ≤ 65 · II 66–85 · III 86–105 · IV 106–125 · V > 125.',
    in: I_PESI,
    calc: v => {
      const s = v.edad + pts(v, I_PESI) + (v.fc >= 110 ? 20 : 0) + (v.pas < 100 ? 30 : 0) + (v.fr >= 30 ? 20 : 0) + (v.temp < 36 ? 20 : 0) + (v.spo2 < 90 ? 20 : 0);
      const c = s <= 65 ? ['I', 'muy bajo (0–1,6%)', 'ok'] : s <= 85 ? ['II', 'bajo (1,7–3,5%)', 'ok'] : s <= 105 ? ['III', 'intermedio (3,2–7,1%)', 'warn'] : s <= 125 ? ['IV', 'alto (4,0–11,4%)', 'bad'] : ['V', 'muy alto (10,0–24,5%)', 'bad'];
      return { r: s, u: 'pts', d: 0, interp: `Clase ${c[0]} — riesgo ${c[1]} de mortalidad a 30 días`, lvl: c[2] };
    },
    ref: 'Aujesky D, Obrosky DS, Stone RA, et al. Derivation and validation of a prognostic model for pulmonary embolism. Am J Respir Crit Care Med. 2005;172(8):1041-1046.',
    url: 'https://doi.org/10.1164/rccm.200506-862OC', verif: V,
    pop: 'Pacientes con TEP agudo confirmado (hospitales de Pensilvania, n = 10 354 derivación).',
    lim: 'Rangos de mortalidad según las cohortes citadas en la guía ESC 2019. No incluye disfunción del VD ni troponina, necesarias para la estratificación completa.',
    tests: [
      { v: { edad: 50, sexo: 'f', fc: 90, pas: 120, fr: 18, temp: 37, spo2: 96 }, r: 50 },
      { v: { edad: 70, sexo: 'm', neo: true, fc: 115, pas: 95, fr: 20, temp: 37, spo2: 88 }, r: 180 }
    ]
  },
  {
    id: 'spesi', m: 's', cat: 'resp-infecto', n: 'sPESI (PESI simplificado)', sig: 'sPESI',
    syn: ['spesi', 'pesi simplificado', 'tep', 'pronostico tep'],
    tipo: 'score pronóstico',
    fin: 'Versión simplificada del PESI para identificar TEP de bajo riesgo de mortalidad a 30 días.',
    ver: 'Jiménez 2010.',
    formula: '1 punto c/u: edad > 80 · cáncer · enfermedad cardiopulmonar crónica · pulso ≥ 110 · PAS < 100 · SpO₂ < 90%. 0 = bajo riesgo; ≥ 1 = riesgo no bajo.',
    in: I_SPESI,
    calc: v => {
      const s = pts(v, I_SPESI) + (v.edad > 80 ? 1 : 0) + (v.fc >= 110 ? 1 : 0) + (v.pas < 100 ? 1 : 0) + (v.spo2 < 90 ? 1 : 0);
      return s == 0
        ? { r: 0, u: 'pts', d: 0, interp: 'Bajo riesgo (mortalidad a 30 días 1,0% en la cohorte de derivación)', lvl: 'ok' }
        : { r: s, u: 'pts', d: 0, interp: 'Riesgo no bajo (mortalidad a 30 días 10,9% en la cohorte de derivación)', lvl: 'bad' };
    },
    ref: 'Jiménez D, Aujesky D, Moores L, et al. Simplification of the pulmonary embolism severity index for prognostication in patients with acute symptomatic pulmonary embolism. Arch Intern Med. 2010;170(15):1383-1389.',
    url: 'https://doi.org/10.1001/archinternmed.2010.199', verif: V,
    pop: 'Pacientes con TEP sintomático agudo (registro RIETE y cohorte española).',
    lim: 'No incluye disfunción del VD ni troponina. Un sPESI 0 con signos de disfunción del VD no es bajo riesgo según la ESC.',
    tests: [
      { v: { edad: 60, fc: 90, pas: 120, spo2: 95 }, r: 0 },
      { v: { edad: 85, neo: true, fc: 115, pas: 120, spo2: 95 }, r: 3 }
    ]
  },
  {
    id: 'centor-mcisaac', m: 's', cat: 'resp-infecto', tags: ['s:infectologia'], n: 'Centor / McIsaac', sig: 'Centor',
    syn: ['centor', 'mcisaac', 'faringitis', 'estreptococo', 'faringoamigdalitis'],
    tipo: 'regla de decisión',
    fin: 'Estima la probabilidad de faringitis por estreptococo del grupo A.',
    ver: 'McIsaac 1998 (Centor modificado con ajuste por edad); se informa también el Centor original (0–4).',
    formula: '1 punto c/u: exudado/tumefacción amigdalina, adenopatías cervicales anteriores dolorosas, T > 38 °C, ausencia de tos. Edad 3–14 +1 · 15–44 0 · ≥ 45 −1.\nMcIsaac: ≤ 0 1–2,5% · 1 5–10% · 2 11–17% · 3 28–35% · ≥ 4 51–53%.',
    in: I_CENTOR,
    calc: v => {
      const c = pts(v, I_CENTOR), s = c + (v.edad < 15 ? 1 : v.edad >= 45 ? -1 : 0);
      const p = s <= 0 ? '1–2,5%' : s == 1 ? '5–10%' : s == 2 ? '11–17%' : s == 3 ? '28–35%' : '51–53%';
      return { r: s, u: 'pts', d: 0, lab: 'McIsaac', interp: `Probabilidad de estreptococo del grupo A: ${p}`, lvl: s <= 1 ? 'ok' : s <= 3 ? 'warn' : 'bad', more: [['Centor (sin ajuste por edad)', c]] };
    },
    ref: 'Centor RM, Witherspoon JM, Dalton HP, Brody CE, Link K. The diagnosis of strep throat in adults in the emergency room. Med Decis Making. 1981;1(3):239-246. · McIsaac WJ, White D, Tannenbaum D, Low DE. A clinical score to reduce unnecessary antibiotic use in patients with sore throat. CMAJ. 1998;158(1):75-83.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/9475915/', verif: V,
    pop: 'Centor: adultos en guardia. McIsaac: niños ≥ 3 años y adultos en atención primaria (Canadá).',
    lim: 'Las probabilidades dependen de la prevalencia local. El Centor original usa «exudado amigdalino» y «antecedente de fiebre». La decisión de tratar debe apoyarse en test rápido o cultivo según la guía local.',
    tests: [
      { v: { exu: true, adn: true, fiebre: true, tos: true, edad: 10 }, r: 5 },
      { v: { exu: true, edad: 50 }, r: 0 }
    ]
  },
  {
    id: 'alerta-sepsis-local', m: 's', cat: 'resp-infecto', n: 'Herramientas de alerta de sepsis según protocolos locales', sig: '',
    syn: ['alerta sepsis', 'codigo sepsis', 'protocolo sepsis', 'tamizaje sepsis'],
    tipo: 'regla de decisión',
    fin: 'Tamizaje y activación de respuesta ante sospecha de sepsis según el protocolo de cada institución.',
    ver: 'Depende de la institución.',
    ref: 'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
    url: 'https://doi.org/10.1097/CCM.0000000000005337', verif: V,
    pop: 'Según el protocolo institucional.',
    lim: 'La Surviving Sepsis Campaign 2021 recomienda que cada hospital use un programa de tamizaje de sepsis, sin imponer una herramienta única.',
    pend: 'No existe una herramienta universal: los criterios y umbrales de alerta («código sepsis») dependen del protocolo validado de cada institución. Cargar el protocolo local cuando esté disponible; mientras tanto usar qSOFA, SIRS, NEWS2 y SOFA del catálogo.'
  },

  // ═════════════ INFECTOLOGÍA ═════════════
  {
    id: 'duke-iscvid-2023', m: 's', cat: 'infectologia', n: 'Criterios de Duke-ISCVID 2023 para endocarditis', sig: 'Duke-ISCVID',
    syn: ['duke', 'endocarditis', 'endocarditis infecciosa', 'iscvid', 'criterios de duke'],
    tipo: 'criterio diagnóstico',
    fin: 'Clasifica la sospecha de endocarditis infecciosa como definitiva, posible o rechazada.',
    ver: 'Duke-ISCVID 2023 (Fowler et al.), actualización de los criterios de Duke modificados.',
    formula: 'Definitiva: criterio patológico, o 2 mayores, o 1 mayor + 3 menores, o 5 menores.\nPosible: 1 mayor + 1 menor, o 3 menores.\nRechazada: diagnóstico alternativo firme; ausencia de recurrencia con < 4 días de antibióticos; sin evidencia en cirugía/autopsia con < 4 días de antibióticos; o no cumple criterios de posible.',
    in: I_DUKE,
    calc: v => {
      const M = DUKE_MAY.filter(([id]) => v[id]).length, m = DUKE_MEN.filter(([id]) => v[id]).length;
      const tx = `${M} mayor(es), ${m} menor(es)`;
      if (v.pat1 || v.pat2) return { r: 'EI definitiva', interp: 'Por criterio patológico · ' + tx, lvl: 'bad' };
      if (M >= 2 || (M >= 1 && m >= 3) || m >= 5) return { r: 'EI definitiva', interp: 'Por criterios clínicos · ' + tx, lvl: 'bad' };
      if (v.rch1 || v.rch2 || v.rch3) return { r: 'EI rechazada', interp: 'Por criterio de rechazo · ' + tx, lvl: 'ok' };
      if ((M >= 1 && m >= 1) || m >= 3) return { r: 'EI posible', interp: tx, lvl: 'warn' };
      return { r: 'EI rechazada', interp: 'No cumple criterios de posible · ' + tx, lvl: 'ok' };
    },
    ref: 'Fowler VG, Durack DT, Selton-Suty C, et al. The 2023 Duke-International Society for Cardiovascular Infectious Diseases Criteria for Infective Endocarditis: Updating the Modified Duke Criteria. Clin Infect Dis. 2023;77(4):518-526.',
    url: 'https://doi.org/10.1093/cid/ciad271', verif: V,
    pop: 'Pacientes con sospecha de endocarditis infecciosa (válvula nativa, protésica y dispositivos).',
    lim: 'Cada categoría de criterio se cuenta una sola vez. Las definiciones de microorganismos típicos/atípicos y los umbrales de PET/TC están detallados en la publicación. Herramienta de clasificación (originalmente para investigación): no reemplaza el juicio del equipo de endocarditis.',
    tests: [
      { v: { mmic: true, mimg: true }, r: 'definitiva' },
      { v: { mmic: true, fiebre: true }, r: 'posible' },
      { v: { fiebre: true, pred: true }, r: 'rechazada' },
      { v: { pat2: true }, r: 'definitiva' }
    ]
  },
  {
    id: 'lrinec', m: 's', cat: 'infectologia', n: 'LRINEC (fascitis necrotizante)', sig: 'LRINEC',
    syn: ['lrinec', 'fascitis necrotizante', 'infeccion necrotizante de partes blandas'],
    tipo: 'score pronóstico',
    fin: 'Ayuda a distinguir la fascitis necrotizante de otras infecciones graves de partes blandas con laboratorio de rutina.',
    ver: 'Wong 2004.',
    formula: 'PCR ≥ 150 mg/L 4 · Leucocitos 15–25 1, > 25 2 · Hb 11–13,5 1, < 11 2 · Na < 135 2 · Creatinina > 1,6 mg/dL 2 · Glucemia > 180 mg/dL 1 (máx. 13).\n≤ 5 bajo (< 50%) · 6–7 intermedio (50–75%) · ≥ 8 alto (> 75%).',
    in: I_LRINEC,
    calc: v => {
      const s = (v.pcr >= 150 ? 4 : 0) + (v.gb > 25 ? 2 : v.gb >= 15 ? 1 : 0) + (v.hb < 11 ? 2 : v.hb <= 13.5 ? 1 : 0) +
        (v.na < 135 ? 2 : 0) + (v.cr > 1.6 ? 2 : 0) + (v.glu > 180 ? 1 : 0);
      return { r: s, u: 'pts', d: 0, ...band(s, [[0, 5, 'Riesgo bajo (probabilidad de fascitis necrotizante < 50%)', 'ok'], [6, 7, 'Riesgo intermedio (50–75%)', 'warn'], [8, 13, 'Riesgo alto (> 75%)', 'bad']]) };
    },
    ref: 'Wong CH, Khin LW, Heng KS, Tan KC, Low CO. The LRINEC (Laboratory Risk Indicator for Necrotizing Fasciitis) score: a tool for distinguishing necrotizing fasciitis from other soft tissue infections. Crit Care Med. 2004;32(7):1535-1541.',
    url: 'https://doi.org/10.1097/01.ccm.0000129486.35458.7d', verif: V,
    pop: 'Pacientes con infecciones graves de partes blandas en dos hospitales de Singapur (estudio retrospectivo).',
    lim: 'Sensibilidad baja en validaciones posteriores: un LRINEC bajo NO descarta fascitis necrotizante. La sospecha clínica obliga a evaluación quirúrgica precoz.',
    tests: [
      { v: { pcr: 200, gb: 28, hb: 10.5, na: 130, cr: 2, glu: 200 }, r: 13 },
      { v: { pcr: 50, gb: 12, hb: 14, na: 138, cr: 1, glu: 110 }, r: 0 },
      { v: { pcr: 160, gb: 18, hb: 12, na: 138, cr: 1, glu: 110 }, r: 'intermedio' }
    ]
  }
];
