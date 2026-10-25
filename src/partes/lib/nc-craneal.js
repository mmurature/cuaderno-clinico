// Partes quirúrgicos · Neurocirugía — Cirugía craneal y neurooncología.
// Datos puros (ver docs/ESQUEMA_PLANTILLAS.md, sección 2 y 2.4).
// Convenciones:
// - Campos citados en `pasos` con {id}: la frase de la opción es un fragmento que se inserta dentro del paso;
//   `p` es el envoltorio que se usa cuando el campo se escribe por sí solo.
// - En `if` sobre un campo opt, el valor es la etiqueta de la opción (o[0]); en yn, 'si' / 'no'; en multi, basta con que esté marcada.
// - La lateralidad usa el campo común `lat` (`lat: true`); en lesiones de línea media se marca «no aplica».
// - La extensión de resección y el grado de Simpson solo se escriben si el cirujano los documenta.

// ---------- Opciones compartidas (copiadas de neurocirugia.js y ampliadas) ----------

const POS_CRANEO = [
  ['Supino, cabeza fijada en cabezal de tres pines', 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines'],
  ['Supino, cabeza rotada y fijada', 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines'],
  ['Supino, cabeza en extensión y fijada', 'Paciente en decúbito supino con cabeza en leve extensión y fijada en cabezal de tres pines'],
  ['Supino, cabeza en apoyo en herradura', 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura'],
  ['Supino, realce bajo el hombro', 'Paciente en decúbito supino con realce bajo el hombro ipsilateral y cabeza rotada'],
  ['Lateral (park-bench)', 'Paciente en decúbito lateral tipo park-bench con cabeza fijada en cabezal de tres pines'],
  ['Prono, cabeza fijada', 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines'],
  ['Semisentado', 'Paciente en posición semisentada con cabeza fijada en cabezal de tres pines']
];

const LOC_SUPRA = [
  ['Frontal', 'frontal'],
  ['Temporal', 'temporal'],
  ['Parietal', 'parietal'],
  ['Occipital', 'occipital'],
  ['Frontotemporal', 'frontotemporal'],
  ['Frontoparietal', 'frontoparietal'],
  ['Temporoparietal', 'temporoparietal'],
  ['Parietooccipital', 'parietooccipital'],
  ['Insular', 'insular'],
  ['Parasagital', 'parasagital'],
  ['Intraventricular', 'intraventricular'],
  ['Cuerpo calloso', 'en cuerpo calloso'],
  ['Talámica', 'talámica'],
  ['Ganglios basales', 'en ganglios basales'],
  ['Región pineal', 'de la región pineal']
];

const LOC_HEM = [
  ['Frontal', 'frontal'],
  ['Temporal', 'temporal'],
  ['Parietal', 'parietal'],
  ['Occipital', 'occipital'],
  ['Frontotemporal', 'frontotemporal'],
  ['Temporoparietal', 'temporoparietal'],
  ['Frontotemporoparietal', 'frontotemporoparietal'],
  ['Hemisférica', 'hemisférica'],
  ['Fosa posterior', 'en fosa posterior']
];

const INC_CRANEO = [
  ['Arciforme frontotemporal', 'arciforme frontotemporal'],
  ['Bicoronal', 'bicoronal'],
  ['En herradura', 'en herradura'],
  ['Lineal', 'lineal'],
  ['En signo de interrogación', 'en signo de interrogación'],
  ['En T (Kempe)', 'en T'],
  ['Supraciliar', 'supraciliar'],
  ['Retroauricular', 'retroauricular'],
  ['Sobre cicatriz previa', 'sobre la cicatriz previa']
];

const MNIO_MOD = [
  ['PEM', 'potenciales evocados motores'],
  ['PESS', 'potenciales evocados somatosensitivos'],
  ['EMG libre', 'electromiografía libre'],
  ['Mapeo cortical motor', 'mapeo cortical motor por estimulación directa'],
  ['Mapeo subcortical', 'mapeo subcortical por estimulación directa'],
  ['Mapeo del lenguaje (paciente despierto)', 'mapeo del lenguaje con paciente despierto'],
  ['Inversión de fase', 'inversión de fase de potenciales somatosensitivos para localización del surco central'],
  ['Electrocorticografía', 'electrocorticografía'],
  ['Potenciales visuales', 'potenciales evocados visuales'],
  ['PEAT', 'potenciales evocados auditivos de tronco'],
  ['EMG de pares craneales', 'electromiografía de pares craneales']
];

const MNIO_RES = [
  ['Sin cambios', 'No se registran cambios en el monitoreo neurofisiológico durante el procedimiento'],
  ['Caída transitoria', 'Se registra caída transitoria de los potenciales, con recuperación durante el procedimiento'],
  ['Caída persistente', 'Se registra caída persistente de los potenciales al finalizar el procedimiento'],
  ['Pérdida de potenciales', 'Se registra pérdida de los potenciales']
];

const EXT_RES = [
  ['Resección completa macroscópica', 'Se realiza resección completa macroscópica de la lesión'],
  ['Resección casi total', 'Se realiza resección casi total de la lesión'],
  ['Resección subtotal', 'Se realiza resección subtotal de la lesión'],
  ['Resección parcial', 'Se realiza resección parcial de la lesión'],
  ['Biopsia', 'Se realiza toma de biopsia de la lesión, sin resección']
];

const EXT_EVAL = [
  ['Inspección microscópica', 'inspección microscópica del lecho'],
  ['Fluorescencia', 'fluorescencia'],
  ['Ecografía', 'ecografía intraoperatoria'],
  ['Neuronavegación', 'neuronavegación'],
  ['RM intraoperatoria', 'resonancia magnética intraoperatoria']
];

const ADJ = [
  ['Microscopio quirúrgico', 'microscopio quirúrgico'],
  ['Exoscopio', 'exoscopio'],
  ['Endoscopio', 'endoscopio'],
  ['Ecografía intraoperatoria', 'ecografía intraoperatoria'],
  ['Ácido 5-aminolevulínico', 'fluorescencia con ácido 5-aminolevulínico'],
  ['Fluoresceína sódica', 'fluorescencia con fluoresceína sódica'],
  ['Aspirador ultrasónico', 'aspirador ultrasónico'],
  ['RM intraoperatoria', 'resonancia magnética intraoperatoria']
];

const CDUR = [
  ['Primario, sutura continua', 'cierre dural primario con sutura continua'],
  ['Primario, puntos separados', 'cierre dural primario con puntos separados'],
  ['Duroplastia con pericráneo', 'duroplastia con injerto de pericráneo autólogo'],
  ['Duroplastia con fascia autóloga', 'duroplastia con injerto de fascia autóloga'],
  ['Duroplastia con sustituto dural', 'duroplastia con sustituto dural'],
  ['Refuerzo con sellante', 'refuerzo de la línea de sutura con sellante dural'],
  ['Material hemostático epidural', 'colocación de material hemostático epidural'],
  ['Sin cierre dural', 'no se realiza cierre dural']
];

const CDUR_EXP = [
  ['Duroplastia de expansión con sustituto', 'Se realiza duroplastia de expansión con sustituto dural'],
  ['Duroplastia de expansión con pericráneo', 'Se realiza duroplastia de expansión con injerto de pericráneo autólogo'],
  ['Sustituto dural sin sutura', 'Se coloca sustituto dural sobre el defecto, sin sutura'],
  ['Cierre dural primario', 'Se realiza cierre dural primario'],
  ['Sin cierre dural', 'No se realiza cierre dural']
];

const COLG = [
  ['Repuesto', 'Se repone el colgajo óseo'],
  ['No repuesto, criopreservado', 'No se repone el colgajo óseo, que se envía para criopreservación'],
  ['No repuesto, en subcutáneo abdominal', 'No se repone el colgajo óseo, que se aloja en tejido celular subcutáneo abdominal'],
  ['No repuesto, descartado', 'No se repone el colgajo óseo, que se descarta'],
  ['No repuesto, enviado a Anatomía Patológica', 'No se repone el colgajo óseo, que se envía a Anatomía Patológica'],
  ['Craneoplastia en el mismo acto', 'Se realiza craneoplastia en el mismo acto quirúrgico con {d}']
];

const FIJ_COLG = [
  ['Placas y tornillos de titanio', 'miniplacas y tornillos de titanio'],
  ['Sistema de fijación tipo clamp', 'sistema de fijación craneal tipo clamp'],
  ['Puntos transóseos', 'puntos transóseos'],
  ['Relleno de orificios con cemento', 'relleno de orificios de trépano con cemento óseo'],
  ['Relleno de orificios con tapones', 'tapones para orificios de trépano']
];

const DTIPO_CRANEO = [
  ['Subgaleal aspirativo', 'subgaleal aspirativo'],
  ['Subgaleal a caída libre', 'subgaleal a caída libre'],
  ['Epidural', 'epidural'],
  ['Subdural', 'subdural'],
  ['En lecho quirúrgico', 'en el lecho quirúrgico']
];

const PIC_T = [
  ['Intraparenquimatoso', 'Sensor de presión intracraneana intraparenquimatoso'],
  ['Intraventricular', 'Sensor de presión intracraneana intraventricular acoplado a drenaje ventricular'],
  ['Subdural', 'Sensor de presión intracraneana subdural']
];

const CONG_Y = 'Se envía muestra para estudio intraoperatorio por congelación';
const CONG_N = 'No se realiza estudio intraoperatorio por congelación';

// Campos de navegación, monitoreo y congelación reutilizados (objetos de datos, sin funciones)
const NAV_F = [
  { id: 'nav', l: 'Neuronavegación', sec: 'B', k: 'yn', q: 1, y: 'Se utiliza neuronavegación', n: 'No se utiliza neuronavegación' },
  { id: 'navt', l: 'Sistema de navegación', sec: 'B', k: 'opt', if: ['nav', 'si'], o: [
    ['Óptica', 'Se utiliza sistema de navegación óptica'],
    ['Electromagnética', 'Se utiliza sistema de navegación electromagnética']
  ] },
  { id: 'navr', l: 'Registro', sec: 'B', k: 'opt', if: ['nav', 'si'], o: [
    ['Superficie facial', 'Se realiza registro por reconocimiento de superficie facial'],
    ['Marcadores fiduciales', 'Se realiza registro por marcadores fiduciales'],
    ['Puntos anatómicos', 'Se realiza registro por puntos anatómicos'],
    ['TC intraoperatoria', 'Se realiza registro automático con TC intraoperatoria']
  ] },
  { id: 'navx', l: 'Error de registro', sec: 'B', k: 'num', u: 'mm', if: ['nav', 'si'], p: 'Error de registro de {v} mm' }
];

const MNIO_F = [
  { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', q: 1, y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
  { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], o: MNIO_MOD, p: 'Se monitorean {v}' },
  { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], o: MNIO_RES }
];

const CONG_F = [
  { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', q: 1, y: CONG_Y, n: CONG_N },
  { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' }
];

const PIC_F = [
  { id: 'pic', l: 'Sensor de PIC', sec: 'E', k: 'yn', y: 'Se coloca sensor de presión intracraneana', n: 'No se coloca sensor de presión intracraneana' },
  { id: 'pict', l: 'Tipo de sensor', sec: 'E', k: 'opt', if: ['pic', 'si'], o: PIC_T },
  { id: 'picv', l: 'PIC inicial', sec: 'E', k: 'num', u: 'mmHg', if: ['pic', 'si'], p: 'Presión intracraneana inicial de {v} mmHg' }
];

// ---------- Referencias ----------

const R_BASE = "Greenberg MS. Greenberg's Handbook of Neurosurgery, 10th ed. Thieme, 2023; Winn HR (ed). Youmans and Winn Neurological Surgery, 8th ed. Elsevier, 2022";
const R_RCS = 'Royal College of Surgeons of England. Good Surgical Practice, 2014 (registro operatorio)';
const R_TBI = 'Bullock MR, Chesnut R, Ghajar J, et al. Guidelines for the surgical management of traumatic brain injury. Neurosurgery 2006;58(3 Suppl):S1-S62; Carney N, et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition (Brain Trauma Foundation 2016). Neurosurgery 2017;80(1):6-15';
const R_GLIO = 'Weller M, et al. EANO guidelines on the diagnosis and treatment of diffuse gliomas of adulthood. Nat Rev Clin Oncol 2021;18(3):170-186; Stummer W, et al. Fluorescence-guided surgery with 5-aminolevulinic acid for resection of malignant glioma: a randomised controlled multicentre phase III trial. Lancet Oncol 2006;7(5):392-401';

export default [
  // ───────────────────────────── Craneotomía y resección de tumor cerebral (intraaxial) ─────────────────────────────
  {
    id: 'nc-cran',
    n: 'Craneotomía y resección de tumor cerebral',
    sp: 'Neurocirugía',
    sub: 'Oncología',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['craneotomía', 'resección tumoral', 'glioma', 'glioblastoma', 'tumor cerebral', 'cirugía con paciente despierto', 'awake', '5-ALA'],
    v: 2,
    rev: '2026-10',
    ref: R_GLIO + '; ' + R_BASE + '; ' + R_RCS,
    ctx: 'Lesión intraaxial supratentorial con indicación de resección a cielo abierto. La variante define la localización y si el procedimiento es con paciente despierto. Las lesiones extraaxiales (meningioma), metastásicas y de fosa posterior tienen plantilla propia. La extensión de resección solo se escribe si fue documentada por el cirujano',
    lat: true,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: LOC_SUPRA, p: 'Lesión de localización {v}' },
      { id: 'modo', l: 'Modalidad', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Anestesia general', 'Procedimiento bajo anestesia general'],
        ['Paciente despierto', 'Procedimiento con paciente despierto para mapeo intraoperatorio']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'plan', l: 'Planificación preoperatoria', sec: 'B', k: 'multi', p: 'Planificación con {v}', o: [
        ['RM con contraste', 'RM con contraste'],
        ['RM funcional', 'RM funcional'],
        ['Tractografía', 'tractografía por tensor de difusión'],
        ['Estimulación magnética transcraneal', 'mapeo por estimulación magnética transcraneal navegada'],
        ['PET', 'PET']
      ] },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', o: [
        ['Pterional', 'pterional'],
        ['Frontotemporal', 'frontotemporal'],
        ['Frontal', 'frontal'],
        ['Bifrontal', 'bifrontal'],
        ['Temporal', 'temporal'],
        ['Parietal', 'parietal'],
        ['Occipital', 'occipital'],
        ['Supraorbitario', 'supraorbitario'],
        ['Interhemisférico', 'interhemisférico'],
        ['Interhemisférico transcalloso', 'interhemisférico transcalloso'],
        ['Transcortical', 'transcortical'],
        ['Transilviano', 'transilviano'],
        ['Transsulcal', 'transsulcal']
      ] },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      ...NAV_F,
      ...MNIO_F,
      { id: 'osea', l: 'Apertura ósea', sec: 'B', k: 'opt', q: 1, p: 'Se realiza {v}', o: [
        ['Craneotomía, colgajo libre', 'craneotomía con colgajo óseo libre'],
        ['Craneotomía osteoplástica', 'craneotomía osteoplástica con colgajo pediculado'],
        ['Minicraneotomía', 'minicraneotomía'],
        ['Reapertura de craneotomía previa', 'reapertura de craneotomía previa']
      ] },
      { id: 'dura', l: 'Apertura dural', sec: 'B', k: 'opt', p: 'Se realiza apertura dural {v}', o: [
        ['En C', 'en C'],
        ['En C con base hacia el seno', 'en C con base hacia el seno venoso'],
        ['En cruz', 'en cruz'],
        ['En U', 'en U'],
        ['Lineal', 'lineal']
      ] },

      { id: 'hcort', l: 'Hallazgos al abrir', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Cerebro tenso', 'parénquima cerebral tenso'],
        ['Cerebro relajado', 'parénquima cerebral relajado'],
        ['Corteza sin alteraciones', 'corteza de aspecto normal'],
        ['Lesión visible en superficie', 'lesión visible en la superficie cortical'],
        ['Lesión subcortical', 'lesión subcortical no visible en la superficie'],
        ['Giros ensanchados', 'giros corticales ensanchados'],
        ['Adherencias por cirugía previa', 'adherencias corticodurales por cirugía previa']
      ] },
      { id: 'tles', l: 'Tipo de lesión', sec: 'C', k: 'opt', q: 1, p: 'Se identifica {v}', o: [
        ['Intraaxial infiltrativa', 'lesión intraaxial de aspecto infiltrativo, de límites mal definidos'],
        ['Intraaxial bien delimitada', 'lesión intraaxial de límites netos'],
        ['Intraventricular', 'lesión intraventricular'],
        ['Quística', 'lesión quística'],
        ['Sólido-quística', 'lesión sólido-quística'],
        ['Con áreas necróticas', 'lesión con áreas de aspecto necrótico']
      ] },
      { id: 'tcar', l: 'Características de la lesión', sec: 'C', k: 'multi', p: 'Lesión {v}', o: [
        ['Blanda', 'de consistencia blanda'],
        ['Firme', 'de consistencia firme'],
        ['Calcificada', 'calcificada'],
        ['Poco vascularizada', 'poco vascularizada'],
        ['Ricamente vascularizada', 'ricamente vascularizada'],
        ['Con plano de clivaje', 'con plano de clivaje identificable respecto del parénquima'],
        ['Sin plano de clivaje', 'sin plano de clivaje identificable'],
        ['Hemorragia intralesional', 'con hemorragia intralesional']
      ] },

      { id: 'adj', l: 'Adyuvantes de resección', sec: 'D', k: 'multi', q: 1, p: 'Se utiliza {v}', o: ADJ },
      { id: 'fluo', l: 'Fluorescencia observada', sec: 'D', k: 'opt', if: ['adj', 'Ácido 5-aminolevulínico'], o: [
        ['Intensa', 'Se observa fluorescencia intensa en la lesión'],
        ['Tenue', 'Se observa fluorescencia tenue en la periferia de la lesión'],
        ['Sin fluorescencia', 'No se observa fluorescencia en la lesión'],
        ['Fluorescencia residual en el lecho', 'Se observa fluorescencia residual en el lecho {d}']
      ], ph: 'localización' },
      { id: 'mapr', l: 'Áreas elocuentes identificadas', sec: 'D', k: 'text', p: 'Se identifican por estimulación {v}', ph: 'respuestas motoras de mano en el margen posterior' },
      { id: 'ext', l: 'Extensión de resección', sec: 'D', k: 'opt', q: 1, req: 1, o: EXT_RES },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'adyacente al tracto corticoespinal' },
      { id: 'extc', l: 'Evaluación de la extensión', sec: 'D', k: 'multi', p: 'Extensión de resección evaluada por {v}', o: EXT_EVAL },
      { id: 'vent', l: 'Apertura ventricular', sec: 'D', k: 'yn', y: 'Se produce apertura del sistema ventricular', n: 'No se abre el sistema ventricular' },
      { id: 'lecho', l: 'Material en el lecho', sec: 'E', k: 'multi', p: 'Se coloca en el lecho {v}', o: [
        ['Hemostático reabsorbible', 'material hemostático reabsorbible'],
        ['Implantes de carmustina', 'implantes de carmustina'],
        ['Sellante', 'sellante']
      ] },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },

      ...CONG_F,
      { id: 'mol', l: 'Muestra para estudio molecular', sec: 'F', k: 'yn', y: 'Se envía muestra en fresco para estudio molecular o banco de tumores', n: 'No se envía muestra en fresco para estudio molecular' },

      { id: 'sus', l: 'Suspensión dural', sec: 'G', k: 'yn', y: 'Se realizan puntos de suspensión dural', n: 'No se realizan puntos de suspensión dural' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', q: 1, req: 1, o: CDUR, p: 'Se realiza {v}' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', q: 1, o: COLG, ph: 'material' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      { t: 'Se realiza registro del sistema de navegación y se planifica la craneotomía sobre la proyección de la lesión', if: ['nav', 'si'] },
      'Se realiza marcación de la incisión y del área de craneotomía',
      'Se realiza incisión cutánea {inc} y disección por planos',
      'Se rebate el colgajo cutáneo y muscular',
      { t: 'Se retira el material de fijación de la craneotomía previa', if: ['osea', 'Reapertura de craneotomía previa'] },
      'Se realizan orificios de trépano y {osea}',
      'Se realiza apertura dural {dura}',
      'Se incorpora microscopio quirúrgico',
      { t: 'Se despierta al paciente y se verifica su colaboración para el mapeo', if: ['modo', 'Paciente despierto'] },
      { t: 'Se realiza mapeo cortical por estimulación eléctrica directa', if: ['mniom', ['Mapeo cortical motor', 'Mapeo del lenguaje (paciente despierto)']] },
      { t: 'Se realiza ecografía intraoperatoria para localizar la lesión', if: ['adj', 'Ecografía intraoperatoria'] },
      'Se realiza corticotomía y disección transparenquimatosa hasta la lesión',
      'Se procede a la resección de la lesión con técnica microquirúrgica',
      { t: 'Se realiza mapeo subcortical durante la resección', if: ['mniom', 'Mapeo subcortical'] },
      { t: 'Se evalúa la fluorescencia del lecho con filtro de luz azul', if: ['adj', 'Ácido 5-aminolevulínico'] },
      { t: 'Se realiza control ecográfico del lecho', if: ['adj', 'Ecografía intraoperatoria'] },
      'Se realiza revisión del lecho quirúrgico',
      'Se cubre el lecho con material hemostático y se irriga con solución fisiológica'
    ],
    ej: 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines. Procedimiento bajo anestesia general. Lesión de localización frontal derecha. Se utiliza neuronavegación óptica con registro por reconocimiento de superficie facial, con error de registro de 1,8 mm. Se realiza incisión cutánea arciforme frontotemporal, craneotomía con colgajo óseo libre y apertura dural en C. Se identifica lesión intraaxial de aspecto infiltrativo, de límites mal definidos, de consistencia blanda. Con microscopio quirúrgico y fluorescencia con ácido 5-aminolevulínico se realiza corticotomía y se procede a la resección con técnica microquirúrgica; se observa fluorescencia intensa en la lesión. Se realiza resección subtotal de la lesión, con remanente adyacente al tracto corticoespinal. Se envía muestra para estudio intraoperatorio por congelación. Se envían muestras a Anatomía Patológica. Se realiza cierre dural primario con sutura continua y refuerzo con sellante dural, y se repone el colgajo óseo fijado con miniplacas y tornillos de titanio. Se constata hemostasia. Se deja drenaje subgaleal aspirativo. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Biopsia cerebral (estereotáxica, navegada, robótica, abierta, endoscópica) ─────────────────────────────
  {
    id: 'nc-bx',
    n: 'Biopsia cerebral estereotáxica',
    sp: 'Neurocirugía',
    sub: 'Oncología',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['biopsia estereotáctica', 'biopsia con marco', 'biopsia navegada', 'biopsia sin marco', 'biopsia robótica', 'biopsia cerebral'],
    v: 2,
    rev: '2026-10',
    ref: R_BASE + '; ' + R_GLIO + '; ' + R_RCS,
    ctx: 'Obtención de tejido para diagnóstico histológico y molecular de lesiones profundas, multifocales, elocuentes o no resecables. La variante define la técnica: estereotáxica con marco, sin marco guiada por navegación, asistida por robot, endoscópica o abierta por craneotomía',
    lat: true,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [
        ['Estereotáxica con marco', 'Se realiza biopsia estereotáxica con marco'],
        ['Estereotáxica sin marco (navegada)', 'Se realiza biopsia estereotáxica sin marco guiada por neuronavegación'],
        ['Asistida por robot', 'Se realiza biopsia estereotáxica asistida por robot'],
        ['Endoscópica', 'Se realiza biopsia endoscópica'],
        ['Abierta', 'Se realiza biopsia a cielo abierto mediante craneotomía']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [...LOC_SUPRA, ['Tronco encefálico', 'en tronco encefálico'], ['Cerebelosa', 'cerebelosa']], p: 'Lesión objetivo de localización {v}' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'obj', l: 'Lesión objetivo', sec: 'B', k: 'text', p: 'Se define como objetivo {v}', ph: 'el componente con realce de la lesión' },
      { id: 'img', l: 'Imagen de planificación', sec: 'B', k: 'multi', p: 'Se realiza planificación sobre {v}', o: [
        ['RM con contraste', 'RM con contraste'],
        ['TC', 'TC'],
        ['Fusión RM-TC', 'fusión de RM y TC'],
        ['Perfusión o espectroscopía', 'secuencias de perfusión o espectroscopía'],
        ['PET', 'PET']
      ] },
      { id: 'navr', l: 'Registro', sec: 'B', k: 'opt', ifn: ['tec', 'Estereotáxica con marco'], o: [
        ['Superficie facial', 'Se realiza registro por reconocimiento de superficie facial'],
        ['Marcadores fiduciales', 'Se realiza registro por marcadores fiduciales'],
        ['Puntos anatómicos', 'Se realiza registro por puntos anatómicos'],
        ['TC intraoperatoria', 'Se realiza registro automático con TC intraoperatoria']
      ] },
      { id: 'navx', l: 'Error de registro', sec: 'B', k: 'num', u: 'mm', p: 'Error de registro de {v} mm' },
      { id: 'tray', l: 'Trayectoria', sec: 'B', k: 'text', p: 'Se planifica trayectoria {v}', ph: 'frontal precoronal, evitando surcos y ventrículos' },
      { id: 'ntray', l: 'Número de trayectorias', sec: 'B', k: 'num', p: 'Se utilizan {v} trayectorias' },

      { id: 'hbx', l: 'Aspecto del tejido', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Aspecto patológico', 'tejido de aspecto patológico'],
        ['Aspecto necrótico', 'tejido de aspecto necrótico'],
        ['Aspecto gliótico', 'tejido de aspecto gliótico'],
        ['Material hemorrágico', 'material hemorrágico'],
        ['Contenido quístico', 'contenido quístico'],
        ['Contenido purulento', 'contenido purulento']
      ] },

      { id: 'prof', l: 'Profundidades de muestreo', sec: 'D', k: 'text', p: 'Se toman muestras a {v}', ph: '0, 5 y 10 mm del objetivo, en cuatro cuadrantes' },
      { id: 'sang', l: 'Sangrado por la cánula', sec: 'D', k: 'opt', ifn: ['tec', 'Abierta'], o: [
        ['Sin sangrado', 'No se constata sangrado por la cánula al retirar el estilete'],
        ['Sangrado que cede', 'Se constata sangrado por la cánula, que cede con irrigación'],
        ['Sangrado persistente', 'Se constata sangrado persistente por la cánula']
      ] },
      { id: 'cong', l: 'Estudio intraoperatorio', sec: 'F', k: 'yn', q: 1, y: 'Se envía muestra para estudio intraoperatorio por congelación o extendido', n: 'No se realiza estudio intraoperatorio' },
      { id: 'congr', l: 'Informe intraoperatorio', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio intraoperatorio informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'mol', l: 'Muestra para estudio molecular', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio molecular', n: 'No se envía muestra para estudio molecular' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', if: ['tec', 'Abierta'], o: CDUR, p: 'Se realiza {v}' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', if: ['tec', 'Abierta'], o: COLG, ph: 'material' }
    ],
    pasos: [
      { t: 'Se realiza colocación del marco estereotáctico bajo anestesia local', if: ['tec', 'Estereotáxica con marco'] },
      { t: 'Se realiza adquisición de imágenes con el marco colocado y cálculo de coordenadas', if: ['tec', 'Estereotáxica con marco'] },
      { t: 'Se realiza registro del sistema de navegación', if: ['tec', ['Estereotáxica sin marco (navegada)', 'Endoscópica', 'Abierta']] },
      { t: 'Se realiza registro del robot y se alinea el brazo con la trayectoria planificada', if: ['tec', 'Asistida por robot'] },
      { t: 'Se realiza incisión cutánea y trepanación en el punto de entrada planificado', ifn: ['tec', 'Abierta'] },
      { t: 'Se realiza coagulación y apertura puntiforme de la duramadre y de la piamadre', ifn: ['tec', 'Abierta'] },
      { t: 'Se introduce la aguja de biopsia hasta el objetivo', if: ['tec', ['Estereotáxica con marco', 'Estereotáxica sin marco (navegada)', 'Asistida por robot']] },
      { t: 'Se realiza toma de muestras en distintos cuadrantes y profundidades', if: ['tec', ['Estereotáxica con marco', 'Estereotáxica sin marco (navegada)', 'Asistida por robot']] },
      { t: 'Se retira la aguja de biopsia en forma progresiva', if: ['tec', ['Estereotáxica con marco', 'Estereotáxica sin marco (navegada)', 'Asistida por robot']] },
      { t: 'Se introduce el endoscopio en el sistema ventricular y se toma biopsia bajo visión directa', if: ['tec', 'Endoscópica'] },
      { t: 'Se realiza incisión cutánea y craneotomía centrada en la lesión', if: ['tec', 'Abierta'] },
      { t: 'Se realiza apertura dural y corticotomía sobre la lesión', if: ['tec', 'Abierta'] },
      { t: 'Se toman muestras de la lesión bajo microscopio quirúrgico', if: ['tec', 'Abierta'] },
      'Se realiza cierre de la incisión'
    ],
    ej: 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines. Se realiza biopsia estereotáxica sin marco guiada por neuronavegación. Lesión objetivo de localización talámica derecha; se define como objetivo el componente con realce de la lesión. Se realiza planificación sobre fusión de RM y TC y se planifica trayectoria frontal precoronal, evitando surcos y ventrículos. Se realiza registro del sistema de navegación, incisión cutánea y trepanación en el punto de entrada, y coagulación y apertura de la duramadre y la piamadre. Se introduce la aguja de biopsia hasta el objetivo y se toman muestras en distintos cuadrantes y profundidades. Se constata tejido de aspecto patológico. No se constata sangrado por la cánula al retirar el estilete. Se envía muestra para estudio intraoperatorio por congelación o extendido. Se obtienen 4 muestras, que se envían a Anatomía Patológica. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },
  {
    id: 'nc-bx-cran',
    n: 'Craneotomía para biopsia de lesión intracraneal',
    sp: 'Neurocirugía',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['biopsia abierta', 'biopsia a cielo abierto', 'craneotomía para biopsia'],
    alias: 'nc-bx',
    set: { tec: 'Abierta' }
  },

  // ───────────────────────────── Resección de metástasis intracraneal ─────────────────────────────
  {
    id: 'nc-met',
    n: 'Resección de lesión metastásica intracraneal',
    sp: 'Neurocirugía',
    sub: 'Oncología',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['metástasis cerebral', 'resección de metástasis', 'lesión secundaria', 'MTS cerebral'],
    v: 1,
    rev: '2026-10',
    ref: 'Nahed BV, et al. Congress of Neurological Surgeons Systematic Review and Evidence-Based Guidelines on the Role of Surgery in the Management of Adults With Metastatic Brain Tumors. Neurosurgery 2019;84(3):E152-E155; Vogelbaum MA, et al. Treatment for Brain Metastases: ASCO-SNO-ASTRO Guideline. J Clin Oncol 2022;40(5):492-516; ' + R_BASE + '; ' + R_RCS,
    ctx: 'Metástasis cerebral única o dominante sintomática, con efecto de masa, necesidad diagnóstica o radionecrosis versus recidiva. La variante define localización. Se documenta la técnica de resección (en bloque o fragmentada) y la extensión según lo constatado por el cirujano',
    lat: true,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [...LOC_SUPRA, ['Cerebelosa', 'cerebelosa']], p: 'Lesión de localización {v}' },
      { id: 'nles', l: 'Lesiones tratadas', sec: 'B', k: 'opt', q: 1, o: [
        ['Lesión única', 'Se interviene lesión única'],
        ['Una de varias', 'Se interviene una de varias lesiones intracraneales {d}'],
        ['Varias en el mismo acto', 'Se intervienen varias lesiones en el mismo acto {d}']
      ], ph: 'cuáles' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      ...NAV_F,
      ...MNIO_F,
      { id: 'osea', l: 'Apertura ósea', sec: 'B', k: 'opt', p: 'Se realiza {v}', o: [
        ['Craneotomía, colgajo libre', 'craneotomía con colgajo óseo libre'],
        ['Minicraneotomía', 'minicraneotomía'],
        ['Craniectomía suboccipital', 'craniectomía suboccipital'],
        ['Reapertura de craneotomía previa', 'reapertura de craneotomía previa']
      ] },
      { id: 'dura', l: 'Apertura dural', sec: 'B', k: 'opt', p: 'Se realiza apertura dural {v}', o: [
        ['En C', 'en C'],
        ['En cruz', 'en cruz'],
        ['En U', 'en U'],
        ['Lineal', 'lineal']
      ] },

      { id: 'hmet', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Lesión en superficie', 'lesión visible en la superficie cortical'],
        ['Lesión subcortical', 'lesión subcortical'],
        ['Plano de gliosis', 'plano de gliosis perilesional identificable'],
        ['Sin plano', 'ausencia de plano de clivaje identificable'],
        ['Componente quístico', 'componente quístico'],
        ['Hemorragia intralesional', 'hemorragia intralesional'],
        ['Necrosis central', 'área central de aspecto necrótico'],
        ['Contacto con duramadre', 'contacto de la lesión con la duramadre'],
        ['Contacto ventricular', 'contacto de la lesión con el epéndimo']
      ] },

      { id: 'adj', l: 'Adyuvantes de resección', sec: 'D', k: 'multi', p: 'Se utiliza {v}', o: ADJ },
      { id: 'tecm', l: 'Técnica de resección', sec: 'D', k: 'opt', q: 1, o: [
        ['En bloque', 'Se realiza resección en bloque por el plano perilesional'],
        ['Fragmentada', 'Se realiza resección fragmentada de la lesión'],
        ['Vaciamiento y resección capsular', 'Se realiza vaciamiento interno y posterior resección de la cápsula']
      ] },
      { id: 'supra', l: 'Resección supramarginal', sec: 'D', k: 'yn', y: 'Se reseca un margen de parénquima perilesional en área no elocuente', n: 'No se reseca margen de parénquima perilesional' },
      { id: 'ext', l: 'Extensión de resección', sec: 'D', k: 'opt', q: 1, req: 1, o: EXT_RES },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'adherido a la cápsula interna' },
      { id: 'extc', l: 'Evaluación de la extensión', sec: 'D', k: 'multi', p: 'Extensión de resección evaluada por {v}', o: EXT_EVAL },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },

      ...CONG_F,
      { id: 'mol', l: 'Muestra para estudio molecular', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio molecular', n: 'No se envía muestra para estudio molecular' },

      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', q: 1, req: 1, o: CDUR, p: 'Se realiza {v}' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG, ph: 'material' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      { t: 'Se realiza registro del sistema de navegación y se planifica la craneotomía sobre la proyección de la lesión', if: ['nav', 'si'] },
      'Se realiza incisión cutánea {inc} y disección por planos',
      { t: 'Se retira el material de fijación de la craneotomía previa', if: ['osea', 'Reapertura de craneotomía previa'] },
      'Se realizan orificios de trépano y {osea}',
      'Se realiza apertura dural {dura}',
      'Se incorpora microscopio quirúrgico',
      'Se realiza corticotomía o abordaje transsulcal hasta la lesión',
      'Se diseca la lesión por el plano de gliosis perilesional',
      'Se procede a la resección de la lesión con técnica microquirúrgica',
      'Se realiza revisión del lecho quirúrgico',
      'Se cubre el lecho con material hemostático y se irriga con solución fisiológica'
    ],
    ej: 'Lesión de localización parietal izquierda. Se interviene lesión única. Se utiliza neuronavegación óptica. Se realiza incisión cutánea lineal, craneotomía con colgajo óseo libre y apertura dural en cruz. Se constata lesión subcortical con plano de gliosis perilesional identificable. Se realiza abordaje transsulcal hasta la lesión, que se diseca por el plano de gliosis. Se realiza resección en bloque por el plano perilesional. Se realiza resección completa macroscópica de la lesión, evaluada por inspección microscópica del lecho y neuronavegación. Se envían muestras a Anatomía Patológica. Se realiza cierre dural primario con sutura continua y se repone el colgajo óseo fijado con miniplacas y tornillos de titanio. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Resección de lesión de fosa posterior ─────────────────────────────
  {
    id: 'nc-fp',
    n: 'Resección de lesión de fosa posterior',
    sp: 'Neurocirugía',
    sub: 'Oncología',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['fosa posterior', 'suboccipital', 'retrosigmoideo', 'cerebelo', 'cuarto ventrículo', 'ángulo pontocerebeloso', 'APC', 'telovelar'],
    v: 2,
    rev: '2026-10',
    ref: R_BASE + '; Bullock MR, et al. Surgical management of posterior fossa mass lesions. Neurosurgery 2006;58(3 Suppl):S47-S55; ' + R_RCS,
    ctx: 'Lesiones infratentoriales tumorales, quísticas, hemorrágicas o infecciosas con indicación de resección o evacuación. La variante define abordaje y localización. Incluye manejo de la hidrocefalia asociada y monitoreo de pares craneales cuando corresponde. La lateralidad aplica en lesiones no mediales',
    lat: true,
    f: [
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza abordaje {v}', o: [
        ['Suboccipital medial', 'suboccipital medial'],
        ['Telovelar', 'suboccipital medial telovelar'],
        ['Transvermiano', 'suboccipital medial transvermiano'],
        ['Suboccipital lateral', 'suboccipital lateral'],
        ['Retrosigmoideo', 'retrosigmoideo'],
        ['Supracerebeloso infratentorial', 'supracerebeloso infratentorial'],
        ['Far lateral', 'suboccipital lateral extremo']
      ] },
      { id: 'loc', l: 'Localización de la lesión', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Lesión de localización {v}', o: [
        ['Vermis', 'vermiana'],
        ['Hemisferio cerebeloso', 'hemisférica cerebelosa'],
        ['Cuarto ventrículo', 'en el cuarto ventrículo'],
        ['Ángulo pontocerebeloso', 'en el ángulo pontocerebeloso'],
        ['Tronco encefálico', 'en tronco encefálico'],
        ['Foramen magno', 'en el foramen magno'],
        ['Región pineal', 'en la región pineal'],
        ['Petroclival', 'petroclival']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Prono, cabeza en flexión (Concorde)', 'Paciente en decúbito prono con cabeza en flexión y fijada en cabezal de tres pines'],
        ['Lateral (park-bench)', 'Paciente en decúbito lateral tipo park-bench con cabeza fijada en cabezal de tres pines'],
        ['Semisentado', 'Paciente en posición semisentada con cabeza en flexión y fijada en cabezal de tres pines'],
        ['Supino, cabeza rotada', 'Paciente en decúbito supino con realce bajo el hombro y cabeza rotada hacia el lado contralateral, fijada en cabezal de tres pines']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', p: 'Se indica cirugía por {v}', o: [
        ['Lesión tumoral', 'lesión tumoral de fosa posterior'],
        ['Lesión del ángulo pontocerebeloso', 'lesión del ángulo pontocerebeloso'],
        ['Hematoma cerebeloso', 'hematoma cerebeloso'],
        ['Infarto cerebeloso', 'infarto cerebeloso con efecto de masa'],
        ['Absceso', 'absceso de fosa posterior'],
        ['Lesión quística', 'lesión quística de fosa posterior']
      ] },
      { id: 'dprec', l: 'Doppler precordial', sec: 'B', k: 'yn', y: 'Se utiliza Doppler precordial para detección de embolia aérea', n: 'No se utiliza Doppler precordial' },
      ...NAV_F,
      ...MNIO_F,
      { id: 'osea', l: 'Apertura ósea', sec: 'B', k: 'opt', o: [
        ['Craniectomía suboccipital', 'Se realiza craniectomía suboccipital'],
        ['Craneotomía suboccipital', 'Se realiza craneotomía suboccipital'],
        ['Craniectomía retrosigmoidea', 'Se realiza craniectomía retrosigmoidea'],
        ['Craneotomía retrosigmoidea', 'Se realiza craneotomía retrosigmoidea'],
        ['Con arco posterior de C1', 'Se realiza craniectomía suboccipital y resección del arco posterior de C1']
      ] },
      { id: 'adur', l: 'Apertura dural', sec: 'B', k: 'opt', o: [
        ['En Y', 'Se realiza apertura dural en Y'],
        ['Lineal', 'Se realiza apertura dural lineal'],
        ['En C', 'Se realiza apertura dural en C con base hacia el seno sigmoideo']
      ] },

      { id: 'hfp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Cerebelo tenso', 'cerebelo tenso'],
        ['Quiste con nódulo', 'lesión quística con nódulo mural'],
        ['Lesión sólida', 'lesión sólida'],
        ['Ocupa el cuarto ventrículo', 'lesión que ocupa el cuarto ventrículo'],
        ['Infiltra el piso del IV ventrículo', 'infiltración del piso del cuarto ventrículo'],
        ['Compresión del tronco', 'compresión del tronco encefálico'],
        ['Relación con pares craneales', 'íntima relación de la lesión con pares craneales'],
        ['Hematoma', 'hematoma intraparenquimatoso cerebeloso'],
        ['Tejido infartado', 'tejido cerebeloso infartado'],
        ['Contenido purulento', 'colección de contenido purulento']
      ] },
      { id: 'tcar', l: 'Características de la lesión', sec: 'C', k: 'multi', p: 'Lesión {v}', o: [
        ['Blanda', 'de consistencia blanda'],
        ['Firme', 'de consistencia firme'],
        ['Poco vascularizada', 'poco vascularizada'],
        ['Ricamente vascularizada', 'ricamente vascularizada'],
        ['Con plano de clivaje', 'con plano de clivaje identificable'],
        ['Sin plano de clivaje', 'sin plano de clivaje identificable']
      ] },
      { id: 'pcr', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', o: [
        ['Nervio facial', 'Se identifica y preserva el nervio facial'],
        ['Nervio vestibulococlear', 'Se identifica y preserva el nervio vestibulococlear'],
        ['Nervio trigémino', 'Se identifica y preserva el nervio trigémino'],
        ['Pares bajos', 'Se identifican y preservan los pares craneales bajos'],
        ['Arteria cerebelosa posteroinferior', 'Se identifica y preserva la arteria cerebelosa posteroinferior'],
        ['Arteria cerebelosa anteroinferior', 'Se identifica y preserva la arteria cerebelosa anteroinferior'],
        ['Vena petrosa', 'Se identifica y preserva la vena petrosa superior'],
        ['Piso del cuarto ventrículo', 'Se protege el piso del cuarto ventrículo'],
        ['Vena petrosa coagulada', 'Se coagula y secciona la vena petrosa superior']
      ] },

      { id: 'adj', l: 'Adyuvantes de resección', sec: 'D', k: 'multi', p: 'Se utiliza {v}', o: ADJ },
      { id: 'procfp', l: 'Procedimiento realizado', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Resección de lesión', 'resección de la lesión'],
        ['Evacuación de hematoma', 'evacuación del hematoma'],
        ['Resección de tejido infartado', 'resección de tejido infartado'],
        ['Drenaje de colección', 'drenaje de la colección'],
        ['Fenestración de quiste', 'fenestración de la pared del quiste']
      ] },
      { id: 'ext', l: 'Extensión de resección', sec: 'D', k: 'opt', q: 1, req: 1, o: EXT_RES },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'adherido al piso del cuarto ventrículo' },
      { id: 'extc', l: 'Evaluación de la extensión', sec: 'D', k: 'multi', p: 'Extensión de resección evaluada por {v}', o: EXT_EVAL },
      { id: 'emb', l: 'Embolia aérea', sec: 'D', k: 'yn', y: 'Se constata embolia aérea venosa', n: 'No se constata embolia aérea' },
      { id: 'dve', l: 'Drenaje ventricular externo', sec: 'E', k: 'yn', q: 1, y: 'Se coloca drenaje ventricular externo', n: 'No se coloca drenaje ventricular externo' },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },

      ...CONG_F,

      { id: 'cdur', l: 'Manejo dural', sec: 'G', k: 'multi', q: 1, req: 1, o: CDUR, p: 'Se realiza {v}' },
      { id: 'mast', l: 'Celdas mastoideas', sec: 'G', k: 'yn', y: 'Se constata apertura de celdas mastoideas, que se sellan con cera ósea', n: 'No se constata apertura de celdas mastoideas' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG, ph: 'material' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: [
        ['Subfascial', 'subfascial'],
        ['Epidural', 'epidural'],
        ['Subcutáneo', 'subcutáneo']
      ], p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      { t: 'Se coloca drenaje ventricular externo por trépano de Frazier antes del abordaje', if: ['dve', 'si'] },
      { t: 'Se realiza incisión cutánea en línea media suboccipital', if: ['abord', ['Suboccipital medial', 'Telovelar', 'Transvermiano', 'Supracerebeloso infratentorial']] },
      { t: 'Se realiza incisión cutánea retroauricular', if: ['abord', ['Retrosigmoideo', 'Suboccipital lateral']] },
      { t: 'Se realiza incisión cutánea en palo de hockey', if: ['abord', 'Far lateral'] },
      'Se realiza disección de la musculatura suboccipital por planos',
      { t: 'Se identifican el seno transverso y el seno sigmoideo y su unión', if: ['abord', ['Retrosigmoideo', 'Suboccipital lateral', 'Far lateral']] },
      { t: 'Se identifica y controla la arteria vertebral en su segmento extradural', if: ['abord', 'Far lateral'] },
      'Se incorpora microscopio quirúrgico',
      'Se realiza apertura de la cisterna magna y drenaje de LCR',
      { t: 'Se abren la tela coroidea y el velo medular inferior', if: ['abord', 'Telovelar'] },
      { t: 'Se realiza incisión del vermis inferior', if: ['abord', 'Transvermiano'] },
      { t: 'Se retrae el cerebelo en sentido caudal y se coagulan las venas puente supracerebelosas', if: ['abord', 'Supracerebeloso infratentorial'] },
      'Se realiza disección aracnoidea',
      { t: 'Se protege el piso del cuarto ventrículo con cotonoide', if: ['loc', 'Cuarto ventrículo'] },
      'Se procede a la resección de la lesión con técnica microquirúrgica',
      { t: 'Se realiza inspección del acueducto y del óbex', if: ['loc', 'Cuarto ventrículo'] },
      'Se realiza revisión del lecho quirúrgico'
    ],
    ej: 'Paciente en decúbito prono con cabeza en flexión y fijada en cabezal de tres pines. Se realiza abordaje suboccipital medial telovelar. Lesión de localización en el cuarto ventrículo. Se realiza monitoreo neurofisiológico intraoperatorio de potenciales evocados motores y electromiografía de pares craneales. Se realiza craniectomía suboccipital y apertura dural en Y. Se constata lesión sólida que ocupa el cuarto ventrículo. Se realiza apertura de la cisterna magna y drenaje de LCR, se abren la tela coroidea y el velo medular inferior, y se procede a la resección con técnica microquirúrgica, protegiendo el piso del cuarto ventrículo con cotonoide. Se realiza resección completa macroscópica de la lesión. No se registran cambios en el monitoreo neurofisiológico durante el procedimiento. Se envían muestras a Anatomía Patológica. Se realiza duroplastia con injerto de pericráneo autólogo y refuerzo de la línea de sutura con sellante dural. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Resección de lesión extraaxial (meningioma) ─────────────────────────────
  {
    id: 'nc-mng',
    n: 'Resección de lesión extraaxial, como meningioma',
    sp: 'Neurocirugía',
    sub: 'Oncología',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['meningioma', 'lesión extraaxial', 'tumor de base de cráneo', 'meningioma de la convexidad', 'meningioma parasagital', 'Simpson'],
    v: 1,
    rev: '2026-10',
    ref: 'Simpson D. The recurrence of intracranial meningiomas after surgical treatment. J Neurol Neurosurg Psychiatry 1957;20(1):22-39; Goldbrunner R, et al. EANO guideline on the diagnosis and management of meningiomas. Neuro Oncol 2021;23(11):1821-1834; ' + R_BASE + '; ' + R_RCS,
    ctx: 'Lesión extraaxial con implantación dural (meningioma u otras) con indicación de resección. La variante define localización. El grado de Simpson y el manejo de la duramadre, del hueso y del seno venoso solo se escriben si el cirujano los documenta',
    lat: true,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Lesión extraaxial de localización {v}', o: [
        ['Convexidad', 'de la convexidad'],
        ['Parasagital', 'parasagital'],
        ['Falcina', 'falcina'],
        ['Ala esfenoidal', 'del ala esfenoidal'],
        ['Esfenoorbitaria', 'esfenoorbitaria'],
        ['Surco olfatorio', 'del surco olfatorio'],
        ['Tubérculo selar', 'del tubérculo selar'],
        ['Tentorial', 'tentorial'],
        ['Ángulo pontocerebeloso', 'del ángulo pontocerebeloso'],
        ['Petroclival', 'petroclival'],
        ['Foramen magno', 'del foramen magno'],
        ['Intraventricular', 'intraventricular']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'embol', l: 'Embolización preoperatoria', sec: 'B', k: 'yn', y: 'Paciente con embolización preoperatoria de la lesión', n: 'Sin embolización preoperatoria' },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', o: [
        ['Sobre la convexidad', 'centrado en la implantación de la lesión'],
        ['Pterional', 'pterional'],
        ['Orbitocigomático', 'orbitocigomático'],
        ['Supraorbitario', 'supraorbitario'],
        ['Bifrontal', 'bifrontal'],
        ['Interhemisférico', 'interhemisférico'],
        ['Retrosigmoideo', 'retrosigmoideo'],
        ['Suboccipital', 'suboccipital'],
        ['Far lateral', 'suboccipital lateral extremo'],
        ['Endoscópico endonasal', 'endoscópico endonasal']
      ] },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      ...NAV_F,
      ...MNIO_F,
      { id: 'osea', l: 'Apertura ósea', sec: 'B', k: 'opt', p: 'Se realiza {v}', o: [
        ['Craneotomía, colgajo libre', 'craneotomía con colgajo óseo libre'],
        ['Craneotomía que cruza la línea media', 'craneotomía que cruza la línea media sobre el seno sagital superior'],
        ['Craniectomía', 'craniectomía'],
        ['Reapertura de craneotomía previa', 'reapertura de craneotomía previa']
      ] },
      { id: 'dura', l: 'Apertura dural', sec: 'B', k: 'opt', p: 'Se realiza apertura dural {v}', o: [
        ['Circunferencial a la implantación', 'circunferencial alrededor de la implantación dural de la lesión'],
        ['En C con base hacia el seno', 'en C con base hacia el seno venoso'],
        ['En cruz', 'en cruz'],
        ['En U', 'en U']
      ] },

      { id: 'hmng', l: 'Hallazgos', sec: 'C', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Hiperostosis', 'hiperostosis del hueso adyacente'],
        ['Infiltración ósea', 'infiltración tumoral del hueso'],
        ['Infiltración dural', 'infiltración dural más allá de la implantación'],
        ['Cola dural', 'engrosamiento dural perilesional'],
        ['Plano aracnoideo conservado', 'plano aracnoideo conservado entre la lesión y la corteza'],
        ['Sin plano aracnoideo', 'pérdida del plano aracnoideo con adherencia pial'],
        ['Edema cortical', 'edema cortical adyacente'],
        ['Engloba vasos', 'lesión que engloba estructuras vasculares'],
        ['Relación con nervios craneales', 'íntima relación de la lesión con nervios craneales']
      ] },
      { id: 'tcar', l: 'Características de la lesión', sec: 'C', k: 'multi', p: 'Lesión {v}', o: [
        ['Blanda', 'de consistencia blanda, aspirable'],
        ['Firme', 'de consistencia firme'],
        ['Fibrosa', 'de consistencia fibrosa'],
        ['Calcificada', 'calcificada'],
        ['Poco vascularizada', 'poco vascularizada'],
        ['Ricamente vascularizada', 'ricamente vascularizada']
      ] },
      { id: 'seno', l: 'Relación con el seno venoso', sec: 'C', k: 'opt', o: [
        ['Sin contacto', 'Sin contacto de la lesión con senos venosos'],
        ['Contacta la pared externa', 'La lesión contacta la pared externa del seno {d}'],
        ['Invade la luz del seno', 'La lesión invade la luz del seno {d}'],
        ['Seno ocluido', 'Seno {d} ocluido por la lesión']
      ], ph: 'seno' },

      { id: 'adj', l: 'Adyuvantes de resección', sec: 'D', k: 'multi', p: 'Se utiliza {v}', o: ADJ },
      { id: 'nerv', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', o: [
        ['Venas corticales de drenaje', 'Se identifican y preservan las venas corticales de drenaje'],
        ['Seno sagital superior', 'Se preserva el seno sagital superior'],
        ['Nervio óptico', 'Se identifica y preserva el nervio óptico'],
        ['Arteria carótida interna', 'Se identifica y preserva la arteria carótida interna'],
        ['Complejo de la arteria cerebral anterior', 'Se identifican y preservan las arterias cerebrales anteriores'],
        ['Arteria cerebral media', 'Se identifican y preservan las ramas de la arteria cerebral media'],
        ['Nervios craneales', 'Se identifican y preservan los nervios craneales {d}']
      ], ph: 'cuáles' },
      { id: 'simp', l: 'Grado de Simpson', sec: 'D', k: 'opt', q: 1, req: 1, o: [
        ['I', 'Resección grado I de Simpson, con resección de la duramadre de implantación y del hueso comprometido'],
        ['II', 'Resección grado II de Simpson, con coagulación de la implantación dural'],
        ['III', 'Resección grado III de Simpson, sin resección ni coagulación de la implantación dural'],
        ['IV', 'Resección grado IV de Simpson, con remanente tumoral'],
        ['V', 'Descompresión grado V de Simpson, con o sin biopsia']
      ] },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'en la pared lateral del seno cavernoso' },
      { id: 'msen', l: 'Manejo del seno venoso', sec: 'D', k: 'opt', ifn: ['seno', 'Sin contacto'], o: [
        ['Remanente en la pared del seno', 'Se deja remanente adherido a la pared del seno, coagulado'],
        ['Resección de la pared y reparación', 'Se reseca la pared del seno comprometida y se repara con {d}'],
        ['Resección del seno ocluido', 'Se reseca el segmento ocluido del seno']
      ], ph: 'material de reparación' },
      { id: 'mhue', l: 'Manejo del hueso', sec: 'D', k: 'opt', if: ['hmng', ['Hiperostosis', 'Infiltración ósea']], o: [
        ['Fresado de la hiperostosis', 'Se fresa el hueso hiperostótico'],
        ['Resección y reemplazo', 'Se reseca el hueso comprometido y se reemplaza por {d}'],
        ['Sin manejo óseo', 'No se reseca el hueso comprometido']
      ], ph: 'material' },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },

      ...CONG_F,

      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', q: 1, req: 1, o: CDUR, p: 'Se realiza {v}' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG, ph: 'material' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      { t: 'Se realiza registro del sistema de navegación y se marcan los bordes de la lesión y del seno venoso', if: ['nav', 'si'] },
      'Se realiza incisión cutánea {inc} y disección por planos',
      'Se preserva un colgajo de pericráneo vascularizado',
      'Se realizan orificios de trépano y {osea}',
      'Se coagulan las arterias meníngeas que irrigan la implantación',
      'Se realiza apertura dural {dura}',
      'Se incorpora microscopio quirúrgico',
      'Se realiza devascularización de la implantación dural de la lesión',
      'Se realiza vaciamiento interno de la lesión',
      'Se diseca la cápsula de la lesión en el plano aracnoideo, con cotonoides',
      'Se procede a la resección de la lesión con técnica microquirúrgica',
      'Se reseca o coagula la duramadre de implantación',
      'Se realiza revisión del lecho quirúrgico'
    ],
    ej: 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines. Lesión extraaxial de localización de la convexidad frontal izquierda. Se utiliza neuronavegación óptica. Se realiza incisión cutánea en herradura, se preserva colgajo de pericráneo, craneotomía con colgajo óseo libre y apertura dural circunferencial alrededor de la implantación. Se constata hiperostosis del hueso adyacente y plano aracnoideo conservado entre la lesión y la corteza. Lesión de consistencia firme, ricamente vascularizada, sin contacto con senos venosos. Bajo microscopio quirúrgico se devasculariza la implantación, se realiza vaciamiento interno con aspirador ultrasónico y se diseca la cápsula en el plano aracnoideo. Se identifican y preservan las venas corticales de drenaje. Resección grado I de Simpson, con resección de la duramadre de implantación y del hueso comprometido. Se fresa el hueso hiperostótico. Se envían muestras a Anatomía Patológica. Se realiza duroplastia con injerto de pericráneo autólogo y se repone el colgajo óseo fijado con miniplacas y tornillos de titanio. Se constata hemostasia. Se deja drenaje subgaleal aspirativo. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Craniectomía descompresiva ─────────────────────────────
  {
    id: 'nc-cdesc',
    n: 'Craniectomía descompresiva',
    sp: 'Neurocirugía',
    sub: 'Trauma',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['hemicraniectomía', 'craniectomía descompresiva', 'craniectomía bifrontal', 'infarto maligno', 'hipertensión endocraneana refractaria', 'HTE', 'CD'],
    v: 1,
    rev: '2026-10',
    ref: 'Carney N, et al. Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition (Brain Trauma Foundation 2016). Neurosurgery 2017;80(1):6-15; Hawryluk GWJ, et al. Guidelines for the Management of Severe Traumatic Brain Injury: 2020 Update of the Decompressive Craniectomy Recommendations. Neurosurgery 2020;87(3):427-434; Hutchinson PJ, et al. Consensus statement from the International Consensus Meeting on the Role of Decompressive Craniectomy in the Management of Traumatic Brain Injury. Acta Neurochir 2019;161(7):1261-1274; Hutchinson PJ, et al. Trial of Decompressive Craniectomy for Traumatic Intracranial Hypertension (RESCUEicp). N Engl J Med 2016;375(12):1119-1130; Vahedi K, et al. Early decompressive surgery in malignant infarction of the middle cerebral artery: a pooled analysis of three randomised controlled trials. Lancet Neurol 2007;6(3):215-222; ' + R_BASE,
    ctx: 'Hipertensión endocraneana refractaria postraumática, edema cerebral con efecto de masa, infarto maligno de la arteria cerebral media o hemorragia con tumefacción. La variante define el tipo (frontotemporoparietal unilateral, bifrontal o suboccipital). Se documentan el tamaño del defecto óseo, el manejo dural y el destino del colgajo óseo',
    lat: true,
    f: [
      { id: 'tipo', l: 'Tipo de craniectomía', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza craniectomía descompresiva {v}', o: [
        ['Frontotemporoparietal unilateral', 'frontotemporoparietal unilateral'],
        ['Bifrontal', 'bifrontal'],
        ['Suboccipital', 'suboccipital']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', q: 1, p: 'Se indica craniectomía descompresiva por {v}', o: [
        ['HTE refractaria postraumática', 'hipertensión endocraneana refractaria postraumática'],
        ['Lesión traumática con tumefacción', 'lesión traumática con tumefacción cerebral'],
        ['Infarto maligno de la ACM', 'infarto maligno de la arteria cerebral media'],
        ['Infarto cerebeloso con efecto de masa', 'infarto cerebeloso con efecto de masa'],
        ['Hemorragia con tumefacción', 'hemorragia intracraneal con tumefacción cerebral'],
        ['Otra', '{d}']
      ], ph: 'indicación' },
      { id: 'mom', l: 'Momento', sec: 'B', k: 'opt', o: [
        ['Primaria', 'Craniectomía primaria, en el mismo acto de la evacuación de una lesión'],
        ['Secundaria', 'Craniectomía secundaria por hipertensión endocraneana refractaria al tratamiento médico']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },

      { id: 'hcd', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Duramadre tensa', 'duramadre tensa'],
        ['Cerebro tumefacto', 'parénquima cerebral tumefacto'],
        ['Hematoma subdural', 'hematoma subdural asociado'],
        ['Contusiones', 'contusiones corticales'],
        ['Tejido infartado', 'tejido cerebral de aspecto infartado'],
        ['Protrusión por el defecto', 'protrusión del parénquima a través del defecto óseo']
      ] },

      { id: 'diam', l: 'Diámetro anteroposterior', sec: 'D', k: 'num', q: 1, req: 1, u: 'cm', p: 'Defecto óseo de {v} cm de diámetro anteroposterior' },
      { id: 'diamv', l: 'Diámetro vertical', sec: 'D', k: 'num', u: 'cm', p: 'Defecto óseo de {v} cm de diámetro vertical' },
      { id: 'temp', l: 'Descompresión temporal', sec: 'D', k: 'yn', if: ['tipo', 'Frontotemporoparietal unilateral'], y: 'Se completa la descompresión de la escama temporal hasta el piso de la fosa media', n: 'No se completa la descompresión temporal hasta el piso de la fosa media' },
      { id: 'adur', l: 'Apertura dural', sec: 'D', k: 'opt', o: [
        ['En estrella', 'Se realiza apertura dural en estrella'],
        ['En C amplia', 'Se realiza apertura dural amplia en C'],
        ['Cruciforme', 'Se realiza apertura dural cruciforme'],
        ['Bifrontal con sección de la hoz', 'Se realiza apertura dural bifrontal con ligadura del seno sagital superior anterior y sección de la hoz'],
        ['Sin apertura dural', 'No se realiza apertura dural']
      ] },
      { id: 'evac', l: 'Lesiones evacuadas', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Hematoma subdural', 'evacuación del hematoma subdural'],
        ['Hematoma epidural', 'evacuación del hematoma epidural'],
        ['Contusión', 'resección de tejido contuso desvitalizado'],
        ['Hematoma intraparenquimatoso', 'evacuación del hematoma intraparenquimatoso'],
        ['Tejido infartado', 'resección de tejido infartado']
      ] },
      { id: 'cdur', l: 'Manejo dural', sec: 'G', k: 'opt', q: 1, req: 1, o: CDUR_EXP },
      { id: 'colg', l: 'Destino del colgajo óseo', sec: 'G', k: 'opt', q: 1, req: 1, o: [
        ['Criopreservado', 'Se envía el colgajo óseo para criopreservación'],
        ['En subcutáneo abdominal', 'Se aloja el colgajo óseo en tejido celular subcutáneo abdominal'],
        ['Descartado', 'Se descarta el colgajo óseo'],
        ['Enviado a Anatomía Patológica o cultivo', 'Se envía el colgajo óseo a Anatomía Patológica o cultivo']
      ] },
      ...PIC_F,
      { id: 'dve', l: 'Drenaje ventricular externo', sec: 'E', k: 'yn', y: 'Se coloca drenaje ventricular externo', n: 'No se coloca drenaje ventricular externo' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza marcación de la incisión según neuroimagen',
      'Se realiza incisión cutánea {inc} y disección por planos',
      'Se rebate el colgajo cutáneo y muscular',
      { t: 'Se realizan orificios de trépano y craniectomía frontotemporoparietal amplia, a no menos de 2 cm de la línea media', if: ['tipo', 'Frontotemporoparietal unilateral'] },
      { t: 'Se reseca la escama temporal y el ala esfenoidal hasta el piso de la fosa media', if: ['tipo', 'Frontotemporoparietal unilateral'] },
      { t: 'Se realizan orificios de trépano y craniectomía bifrontal hasta el piso de la fosa anterior', if: ['tipo', 'Bifrontal'] },
      { t: 'Se sellan los senos frontales abiertos', if: ['tipo', 'Bifrontal'] },
      { t: 'Se realiza craniectomía suboccipital amplia con apertura del foramen magno', if: ['tipo', 'Suboccipital'] },
      'Se coagulan los bordes óseos con cera ósea',
      'Se realizan puntos de suspensión dural en los bordes del defecto',
      'Se realiza apertura dural amplia',
      'Se realiza duroplastia de expansión',
      'Se realiza cierre de la galea y de la piel sobre el defecto'
    ],
    ej: 'Se indica craniectomía descompresiva por hipertensión endocraneana refractaria postraumática. Se realiza craniectomía descompresiva frontotemporoparietal unilateral derecha. Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura. Se realiza incisión cutánea en signo de interrogación, se rebate el colgajo y se realiza craniectomía frontotemporoparietal amplia, a no menos de 2 cm de la línea media, con resección de la escama temporal hasta el piso de la fosa media. Se constata duramadre tensa y parénquima cerebral tumefacto. Defecto óseo de 14 cm de diámetro anteroposterior. Se realiza apertura dural en estrella y duroplastia de expansión con sustituto dural. Se envía el colgajo óseo para criopreservación. Se coloca sensor de presión intracraneana intraparenquimatoso. Se constata hemostasia. Se deja drenaje subgaleal a caída libre. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Cranioplastia ─────────────────────────────
  {
    id: 'nc-cplast',
    n: 'Cranioplastia',
    sp: 'Neurocirugía',
    sub: 'Trauma',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['craneoplastia', 'plastia craneal', 'reposición de colgajo óseo', 'implante craneal a medida', 'PEEK', 'malla de titanio'],
    v: 1,
    rev: '2026-10',
    ref: 'Iaccarino C, Kolias A, Adelson PD, et al. Consensus statement from the international consensus meeting on post-traumatic cranioplasty. Acta Neurochir 2021;163(2):423-440; ' + R_BASE + '; ' + R_RCS,
    ctx: 'Reconstrucción de un defecto craneal posterior a craniectomía descompresiva, resección ósea tumoral o infección del colgajo. La variante define el material (hueso autólogo o implante). Se documenta el estado de la piel, el manejo del plano dural y la fijación',
    lat: true,
    f: [
      { id: 'mat2', l: 'Material', sec: 'E', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza cranioplastia con {v}', o: [
        ['Autólogo criopreservado', 'hueso autólogo criopreservado'],
        ['Autólogo de subcutáneo abdominal', 'hueso autólogo conservado en tejido celular subcutáneo abdominal'],
        ['PEEK a medida', 'implante de polieteretercetona diseñado a medida'],
        ['Titanio a medida', 'placa de titanio diseñada a medida'],
        ['Malla de titanio', 'malla de titanio modelada intraoperatoriamente'],
        ['PMMA modelado', 'polimetilmetacrilato modelado intraoperatoriamente'],
        ['PMMA prefabricado', 'implante prefabricado de polimetilmetacrilato'],
        ['Hidroxiapatita', 'implante de hidroxiapatita']
      ] },
      { id: 'loc', l: 'Localización del defecto', sec: 'B', k: 'opt', q: 1, p: 'Defecto craneal {v}', o: [
        ['Frontotemporoparietal', 'frontotemporoparietal'],
        ['Bifrontal', 'bifrontal'],
        ['Frontal', 'frontal'],
        ['Temporal', 'temporal'],
        ['Parietal', 'parietal'],
        ['Occipital', 'occipital'],
        ['Suboccipital', 'suboccipital']
      ] },
      { id: 'interv', l: 'Intervalo desde la craniectomía', sec: 'B', k: 'text', p: 'Cranioplastia a {v} de la craniectomía', ph: '3 meses' },
      { id: 'piel0', l: 'Estado del colgajo cutáneo', sec: 'B', k: 'multi', o: [
        ['Íntegro', 'Colgajo cutáneo íntegro, sin signos de infección'],
        ['Hundido', 'Colgajo cutáneo hundido sobre el defecto'],
        ['Abombado', 'Colgajo cutáneo abombado sobre el defecto'],
        ['Piel adelgazada', 'Piel adelgazada sobre el defecto'],
        ['Dehiscencia previa', 'Antecedente de dehiscencia o úlcera del colgajo']
      ] },
      { id: 'dvp', l: 'Derivación ventricular', sec: 'B', k: 'yn', y: 'Paciente portador de derivación ventricular', n: 'Paciente sin derivación ventricular' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },

      { id: 'hcp', l: 'Hallazgos', sec: 'C', k: 'multi', o: [
        ['Plano de clivaje', 'Plano de clivaje identificable entre el colgajo cutáneo y el sustituto dural'],
        ['Adherencias firmes', 'Adherencias firmes entre el colgajo cutáneo y el plano dural'],
        ['Colección', 'Colección subgaleal o epidural {d}'],
        ['Reabsorción ósea', 'Signos de reabsorción del hueso autólogo'],
        ['Bordes óseos irregulares', 'Bordes óseos irregulares']
      ], ph: 'aspecto' },

      { id: 'durr', l: 'Plano dural', sec: 'D', k: 'opt', q: 1, o: [
        ['Sin apertura dural', 'No se produce apertura dural durante la disección'],
        ['Apertura reparada con sutura', 'Se produce apertura dural, que se repara con sutura'],
        ['Apertura reparada con sustituto', 'Se produce apertura dural, que se repara con sustituto dural y sellante']
      ] },
      { id: 'ajus', l: 'Ajuste del implante', sec: 'D', k: 'opt', o: [
        ['Sin modelado', 'El implante se adapta al defecto sin necesidad de modelado'],
        ['Recorte de bordes', 'Se recortan los bordes del implante o del defecto para su ajuste'],
        ['Fresado del borde óseo', 'Se fresan los bordes óseos del defecto para su ajuste']
      ] },
      { id: 'fij', l: 'Fijación', sec: 'E', k: 'multi', q: 1, o: [...FIJ_COLG, ['Tornillos del implante a medida', 'tornillos y anclajes propios del implante']], p: 'Se fija la cranioplastia con {v}' },
      { id: 'susp', l: 'Suspensión dural al implante', sec: 'E', k: 'yn', y: 'Se suspende la duramadre al implante con puntos centrales', n: 'No se realiza suspensión dural al implante' },

      { id: 'cult', l: 'Cultivo del hueso', sec: 'F', k: 'yn', if: ['mat2', ['Autólogo criopreservado', 'Autólogo de subcutáneo abdominal']], y: 'Se envía muestra del hueso autólogo para cultivo', n: 'No se envía el hueso autólogo a cultivo' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza incisión cutánea {inc} sobre la cicatriz previa',
      'Se diseca el colgajo cutáneo del plano dural respetando la galea',
      'Se exponen los bordes óseos del defecto en toda su circunferencia',
      'Se reseca el tejido fibroso de los bordes óseos',
      { t: 'Se descongela y prepara el colgajo óseo autólogo', if: ['mat2', 'Autólogo criopreservado'] },
      { t: 'Se extrae el colgajo óseo del tejido celular subcutáneo abdominal', if: ['mat2', 'Autólogo de subcutáneo abdominal'] },
      { t: 'Se modela el implante sobre el defecto', if: ['mat2', ['Malla de titanio', 'PMMA modelado']] },
      { t: 'Se irriga el polimetilmetacrilato con solución fisiológica durante su fraguado', if: ['mat2', 'PMMA modelado'] },
      'Se presenta el implante sobre el defecto y se verifica su ajuste',
      'Se fija el implante a los bordes óseos',
      'Se realiza cierre de la galea y de la piel'
    ],
    ej: 'Defecto craneal frontotemporoparietal derecho, cranioplastia a 3 meses de la craniectomía. Colgajo cutáneo hundido sobre el defecto, íntegro, sin signos de infección. Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura. Se realiza incisión cutánea en signo de interrogación sobre la cicatriz previa y se diseca el colgajo cutáneo del plano dural. Plano de clivaje identificable entre el colgajo cutáneo y el sustituto dural. Se exponen los bordes óseos del defecto en toda su circunferencia. No se produce apertura dural durante la disección. Se realiza cranioplastia con implante de polieteretercetona diseñado a medida, que se adapta al defecto sin necesidad de modelado, y se fija con miniplacas y tornillos de titanio. Se suspende la duramadre al implante con puntos centrales. Se constata hemostasia. Se deja drenaje subgaleal aspirativo. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Hematoma epidural ─────────────────────────────
  {
    id: 'nc-hed',
    n: 'Evacuación de hematoma epidural',
    sp: 'Neurocirugía',
    sub: 'Trauma',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['hematoma extradural', 'HED', 'hematoma epidural agudo', 'arteria meníngea media'],
    v: 1,
    rev: '2026-10',
    ref: 'Bullock MR, et al. Surgical management of acute epidural hematomas. Neurosurgery 2006;58(3 Suppl):S7-S15; ' + R_TBI + '; ' + R_BASE,
    ctx: 'Hematoma epidural agudo con indicación quirúrgica, generalmente traumático. La variante define localización y técnica (craneotomía o craniectomía). Se documentan el origen del sangrado si se identifica, la suspensión dural y el destino del colgajo óseo',
    lat: true,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'multi', vr: 1, q: 1, req: 1, p: 'Hematoma epidural de localización {v}', o: LOC_HEM },
      { id: 'abord', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Craneotomía', 'craneotomía centrada en el hematoma'],
        ['Craneotomía amplia', 'craneotomía frontotemporoparietal amplia'],
        ['Craniectomía', 'craniectomía centrada en el hematoma'],
        ['Craniectomía suboccipital', 'craniectomía suboccipital'],
        ['Trépano de urgencia', 'orificio de trépano de urgencia sobre el hematoma']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },

      { id: 'fract', l: 'Fractura', sec: 'C', k: 'opt', o: [
        ['Sin fractura', 'No se constata fractura craneal'],
        ['Fractura lineal', 'Se constata fractura craneal lineal {d}'],
        ['Fractura con hundimiento', 'Se constata fractura craneal con hundimiento {d}']
      ], ph: 'localización' },
      { id: 'hhed', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Coágulo organizado', 'hematoma epidural coagulado'],
        ['Componente líquido', 'hematoma con componente líquido'],
        ['Despegamiento dural', 'despegamiento dural extenso'],
        ['Duramadre tensa', 'duramadre tensa'],
        ['Hematoma subdural asociado', 'coloración azulada de la duramadre sugestiva de colección subdural']
      ] },
      { id: 'orig', l: 'Origen del sangrado', sec: 'C', k: 'opt', q: 1, o: [
        ['Arteria meníngea media', 'Se identifica sangrado activo de rama de la arteria meníngea media'],
        ['Seno venoso', 'Se identifica sangrado de origen venoso sinusal {d}'],
        ['Diploe', 'Se identifica sangrado de origen diploico en el trazo de fractura'],
        ['No identificado', 'No se identifica el origen del sangrado']
      ], ph: 'seno' },

      { id: 'vol', l: 'Volumen evacuado', sec: 'D', k: 'num', u: 'mL', p: 'Se evacúan aproximadamente {v} mL' },
      { id: 'dura', l: 'Manejo de la duramadre', sec: 'D', k: 'opt', q: 1, o: [
        ['No se abre', 'No se abre la duramadre'],
        ['Apertura para inspección', 'Se abre la duramadre para inspección del espacio subdural {d}'],
        ['Reparación de desgarro', 'Se repara desgarro dural con {d}']
      ], ph: 'hallazgo o material' },
      { id: 'sus', l: 'Suspensión dural', sec: 'G', k: 'multi', q: 1, o: [
        ['Periférica', 'Se realizan puntos de suspensión dural periféricos'],
        ['Central', 'Se realiza punto de suspensión dural central al colgajo óseo'],
        ['No se realiza', 'No se realizan puntos de suspensión dural']
      ] },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', q: 1, req: 1, o: COLG, ph: 'material' },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', if: ['colg', 'Repuesto'], o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      ...PIC_F,
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza marcación de la incisión según neuroimagen',
      'Se realiza incisión cutánea {inc} y disección por planos hasta plano óseo',
      'Se realiza {abord}',
      'Se evacúa el hematoma epidural con aspiración e irrigación',
      'Se realiza búsqueda del punto de sangrado',
      'Se realiza coagulación bipolar del punto de sangrado',
      'Se aplica cera ósea en el foramen espinoso y en los bordes de fractura',
      'Se realiza lavado del espacio epidural con solución fisiológica tibia',
      'Se realizan puntos de suspensión dural'
    ],
    ej: 'Hematoma epidural de localización temporal izquierda. Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura. Se realiza incisión cutánea en signo de interrogación, disección por planos y craneotomía centrada en el hematoma. Se constata fractura craneal lineal temporal y hematoma epidural coagulado. Se evacúa el hematoma con aspiración e irrigación y se identifica sangrado activo de rama de la arteria meníngea media, que se coagula con bipolar. Se evacúan aproximadamente 60 mL. No se abre la duramadre. Se realizan puntos de suspensión dural periféricos y central. Se repone el colgajo óseo, fijado con miniplacas y tornillos de titanio. Se constata hemostasia. Se deja drenaje subgaleal aspirativo. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Hematoma subdural agudo ─────────────────────────────
  {
    id: 'nc-hsda',
    n: 'Evacuación de hematoma subdural agudo',
    sp: 'Neurocirugía',
    sub: 'Trauma',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['hematoma subdural agudo', 'HSDA', 'HSD agudo', 'craneotomía de trauma'],
    v: 1,
    rev: '2026-10',
    ref: 'Bullock MR, et al. Surgical management of acute subdural hematomas. Neurosurgery 2006;58(3 Suppl):S16-S24; ' + R_TBI + '; Hutchinson PJ, et al. Decompressive Craniectomy versus Craniotomy for Acute Subdural Hematoma (RESCUE-ASDH). N Engl J Med 2023;388(24):2219-2229; ' + R_BASE,
    ctx: 'Hematoma subdural agudo traumático o espontáneo con indicación quirúrgica. La variante define la técnica: craneotomía (colgajo repuesto) o craniectomía descompresiva. Se documentan el origen del sangrado si se identifica, el estado cerebral al finalizar, el manejo dural y el destino del colgajo',
    lat: true,
    f: [
      { id: 'abord', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Craneotomía amplia', 'craneotomía frontotemporoparietal amplia'],
        ['Craneotomía limitada', 'craneotomía centrada en el hematoma'],
        ['Craniectomía descompresiva', 'craniectomía descompresiva frontotemporoparietal']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'multi', vr: 1, q: 1, req: 1, p: 'Hematoma subdural agudo de localización {v}', o: LOC_HEM },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      { id: 'dura', l: 'Apertura dural', sec: 'B', k: 'opt', p: 'Se realiza apertura dural {v}', o: [
        ['En C', 'en C'],
        ['En estrella', 'en estrella'],
        ['En cruz', 'en cruz'],
        ['Escalonada', 'escalonada, con evacuación progresiva']
      ] },

      { id: 'hsda', l: 'Hallazgos', sec: 'C', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Duramadre tensa', 'duramadre tensa y azulada'],
        ['Coágulo', 'hematoma subdural coagulado'],
        ['Componente líquido', 'hematoma con componente líquido'],
        ['Contusión subyacente', 'contusión cortical subyacente'],
        ['Laceración cortical', 'laceración cortical'],
        ['Cerebro tumefacto', 'parénquima cerebral tumefacto'],
        ['Hemorragia subaracnoidea', 'hemorragia subaracnoidea'],
        ['Fractura craneal', 'fractura craneal asociada']
      ] },
      { id: 'orig', l: 'Origen del sangrado', sec: 'C', k: 'multi', o: [
        ['Vena puente', 'Se identifica sangrado de vena puente'],
        ['Arteria cortical', 'Se identifica sangrado de arteria cortical'],
        ['Contusión', 'Se identifica sangrado a partir de la contusión cortical'],
        ['Seno venoso', 'Se identifica sangrado de origen venoso sinusal'],
        ['No identificado', 'No se identifica el origen del sangrado']
      ] },

      { id: 'tevac', l: 'Técnica de evacuación', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Aspiración e irrigación', 'evacuación con aspiración e irrigación con solución fisiológica tibia'],
        ['Extracción de coágulos', 'extracción de coágulos con aspiración y pinzas'],
        ['Resección de tejido contuso', 'resección de tejido contuso desvitalizado'],
        ['Coagulación de vena puente', 'coagulación de la vena puente sangrante'],
        ['Hemostático sobre el seno', 'colocación de material hemostático sobre el seno venoso']
      ] },
      { id: 'vol', l: 'Volumen evacuado', sec: 'D', k: 'num', u: 'mL', p: 'Se evacúan aproximadamente {v} mL' },
      { id: 'reexp', l: 'Estado cerebral al finalizar', sec: 'D', k: 'opt', q: 1, o: [
        ['Pulsátil', 'Al finalizar la evacuación se constata parénquima cerebral pulsátil, por debajo del plano óseo'],
        ['A nivel del plano óseo', 'Al finalizar la evacuación se constata parénquima cerebral a nivel del plano óseo'],
        ['Tenso', 'Al finalizar la evacuación se constata parénquima cerebral tenso'],
        ['Protrusión por el defecto', 'Al finalizar la evacuación se constata protrusión del parénquima a través del defecto óseo']
      ] },
      { id: 'diam', l: 'Diámetro de la craniectomía', sec: 'D', k: 'num', u: 'cm', if: ['abord', 'Craniectomía descompresiva'], p: 'Defecto óseo de {v} cm de diámetro anteroposterior' },
      { id: 'cdur', l: 'Manejo dural', sec: 'G', k: 'opt', q: 1, req: 1, o: CDUR_EXP },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', q: 1, req: 1, o: COLG, ph: 'material' },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', if: ['colg', 'Repuesto'], o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      ...PIC_F,
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza marcación de la incisión según neuroimagen',
      'Se realiza incisión cutánea {inc} y disección por planos hasta plano óseo',
      'Se realiza {abord}',
      { t: 'Se reseca la escama temporal hasta el piso de la fosa media', if: ['abord', 'Craniectomía descompresiva'] },
      'Se realiza apertura dural {dura}',
      'Se procede a la evacuación del hematoma',
      'Se realiza búsqueda del punto de sangrado',
      'Se realiza coagulación bipolar del punto de sangrado',
      'Se realiza lavado del espacio subdural con solución fisiológica tibia hasta obtener retorno claro',
      'Se realizan maniobras de Valsalva para control de la hemostasia',
      'Se realizan puntos de suspensión dural'
    ],
    ej: 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura. Se realiza incisión cutánea en signo de interrogación y craneotomía frontotemporoparietal amplia. Hematoma subdural agudo de localización frontotemporoparietal derecha. Se realiza apertura dural en C. Se constata duramadre tensa y azulada, hematoma subdural coagulado y contusión cortical subyacente. Se evacúa el hematoma con aspiración e irrigación y extracción de coágulos, se identifica sangrado de vena puente que se coagula con bipolar, y se lava el espacio subdural hasta obtener retorno claro. Se evacúan aproximadamente 80 mL. Al finalizar la evacuación se constata parénquima cerebral pulsátil, por debajo del plano óseo. Se realiza cierre dural primario. Se repone el colgajo óseo, fijado con miniplacas y tornillos de titanio. Se coloca sensor de presión intracraneana intraparenquimatoso. Se constata hemostasia. Se deja drenaje subgaleal aspirativo. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Hematoma subdural crónico por trépanos ─────────────────────────────
  {
    id: 'nc-hem',
    n: 'Drenaje de hematoma subdural crónico mediante trépanos',
    sp: 'Neurocirugía',
    sub: 'Trauma',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['hematoma subdural crónico', 'HSDC', 'trépanos', 'evacuación por trépano', 'twist drill', 'higroma'],
    v: 2,
    rev: '2026-10',
    ref: 'Santarius T, Kirkpatrick PJ, Ganesan D, et al. Use of drains versus no drains after burr-hole evacuation of chronic subdural haematoma: a randomised controlled trial. Lancet 2009;374(9695):1067-1073; ' + R_BASE + '; ' + R_RCS,
    ctx: 'Hematoma subdural crónico o subagudo sintomático, uni o bilateral. La variante define la técnica (uno o dos orificios de trépano, o trepanación con broca fina) y la lateralidad, que puede ser bilateral. Se documenta el aspecto del contenido, el lavado y el drenaje',
    lat: true,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Un orificio de trépano', 'evacuación a través de un orificio de trépano'],
        ['Dos orificios de trépano', 'evacuación a través de dos orificios de trépano'],
        ['Trepanación con broca fina', 'evacuación por trepanación con broca de pequeño calibre']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', q: 1, p: 'Hematoma subdural crónico de localización {v}', o: [
        ['Hemisférica', 'hemisférica'],
        ['Frontoparietal', 'frontoparietal'],
        ['Frontal', 'frontal'],
        ['Parietal', 'parietal'],
        ['Temporoparietal', 'temporoparietal']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: [['Lineal', 'lineal'], ['Dos incisiones lineales', 'en dos incisiones lineales'], ['Puntiforme', 'puntiforme']], p: 'Se realiza incisión cutánea {v}' },

      { id: 'cont', l: 'Contenido', sec: 'C', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Líquido achocolatado', 'hematoma líquido de color achocolatado'],
        ['Líquido claro o xantocrómico', 'contenido líquido xantocrómico'],
        ['Componente agudo', 'componente de coágulos recientes'],
        ['Membranas', 'membranas subdurales'],
        ['Tabicamiento', 'hematoma tabicado'],
        ['Salida a presión', 'salida del contenido a presión']
      ] },

      { id: 'memb', l: 'Manejo de membranas', sec: 'D', k: 'opt', o: [
        ['Apertura de la membrana externa', 'Se coagula y abre la membrana externa'],
        ['Fenestración de tabiques', 'Se fenestran los tabiques accesibles a través del trépano'],
        ['Sin manejo de membranas', 'No se manipulan las membranas']
      ] },
      { id: 'vol', l: 'Volumen evacuado', sec: 'D', k: 'num', u: 'mL', p: 'Se evacúan aproximadamente {v} mL' },
      { id: 'reexp', l: 'Estado cerebral al finalizar', sec: 'D', k: 'opt', o: [
        ['Reexpansión', 'Al finalizar se constata reexpansión cerebral a través del trépano'],
        ['Reexpansión parcial', 'Al finalizar se constata reexpansión cerebral parcial'],
        ['Sin reexpansión', 'Al finalizar no se constata reexpansión cerebral']
      ] },
      { id: 'aire', l: 'Manejo del aire residual', sec: 'D', k: 'yn', y: 'Se llena el espacio subdural con solución fisiológica antes del cierre para reducir el aire residual', n: 'No se realiza llenado del espacio subdural con solución fisiológica' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], p: 'Se deja drenaje {v}', o: [
        ['Subdural a caída libre', 'subdural a caída libre, exteriorizado por contraabertura'],
        ['Subperióstico', 'subperióstico a caída libre'],
        ['Subgaleal', 'subgaleal a caída libre']
      ] },
      { id: 'tap', l: 'Orificios de trépano', sec: 'G', k: 'opt', o: [
        ['Sin relleno', 'No se rellenan los orificios de trépano'],
        ['Tapones', 'Se colocan tapones en los orificios de trépano'],
        ['Material hemostático', 'Se coloca material hemostático en los orificios de trépano']
      ] }
    ],
    pasos: [
      'Se realiza marcación de los puntos de trepanación según neuroimagen',
      'Se realiza incisión cutánea {inc} y disección hasta plano óseo',
      { t: 'Se realizan dos orificios de trépano, frontal y parietal', if: ['tec', 'Dos orificios de trépano'] },
      { t: 'Se realiza un orificio de trépano parietal', if: ['tec', 'Un orificio de trépano'] },
      { t: 'Se realiza trepanación con broca de pequeño calibre', if: ['tec', 'Trepanación con broca fina'] },
      'Se coagula la duramadre y se realiza apertura dural en cruz',
      'Se procede a la evacuación del hematoma',
      'Se realiza lavado del espacio subdural con solución fisiológica tibia hasta obtener retorno claro',
      'Se realizan maniobras de Valsalva para control de la hemostasia',
      'Se introduce el drenaje en el espacio subdural y se exterioriza por contraabertura',
      'Se realiza cierre de la galea y de la piel'
    ],
    ej: 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura. Se realiza evacuación a través de dos orificios de trépano. Hematoma subdural crónico de localización hemisférica izquierda. Se realiza incisión cutánea en dos incisiones lineales, se realizan orificios de trépano frontal y parietal y apertura dural en cruz. Se constata hematoma líquido de color achocolatado, con salida del contenido a presión y membranas subdurales. Se coagula y abre la membrana externa. Se lava el espacio subdural con solución fisiológica tibia hasta obtener retorno claro. Se evacúan aproximadamente 120 mL. Al finalizar se constata reexpansión cerebral parcial. Se llena el espacio subdural con solución fisiológica antes del cierre. Se deja drenaje subdural a caída libre, exteriorizado por contraabertura. Se constata hemostasia. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Hematoma intraparenquimatoso ─────────────────────────────
  {
    id: 'nc-hip',
    n: 'Evacuación de hematoma intraparenquimatoso',
    sp: 'Neurocirugía',
    sub: 'Vascular',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['hematoma intracerebral', 'HIC', 'hemorragia intraparenquimatosa', 'hematoma lobar', 'hematoma cerebeloso', 'evacuación endoscópica', 'MISTIE'],
    v: 1,
    rev: '2026-10',
    ref: 'Greenberg SM, Ziai WC, Cordonnier C, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage: A Guideline From the American Heart Association/American Stroke Association. Stroke 2022;53(7):e282-e361; Pradilla G, et al. Trial of Early Minimally Invasive Removal of Intracerebral Hemorrhage (ENRICH). N Engl J Med 2024;390(14):1277-1289; Hanley DF, et al. Efficacy and safety of minimally invasive surgery with thrombolysis in intracerebral haemorrhage evacuation (MISTIE III). Lancet 2019;393(10175):1021-1032; ' + R_BASE,
    ctx: 'Hematoma intraparenquimatoso espontáneo o traumático con indicación de evacuación (lobar con deterioro, cerebeloso con compresión del tronco o hidrocefalia). La variante define la técnica (craneotomía, evacuación endoscópica o mínimamente invasiva, aspiración estereotáxica con catéter) y la localización. No se infiere la etiología',
    lat: true,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Craneotomía', 'craneotomía y evacuación del hematoma'],
        ['Endoscópica', 'evacuación endoscópica del hematoma a través de minicraneotomía o trépano'],
        ['Mínimamente invasiva con vaina', 'evacuación mínimamente invasiva a través de vaina transparenquimatosa'],
        ['Aspiración estereotáxica con catéter', 'aspiración estereotáxica y colocación de catéter en el hematoma'],
        ['Craniectomía suboccipital', 'craniectomía suboccipital y evacuación del hematoma cerebeloso']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Hematoma intraparenquimatoso de localización {v}', o: [
        ['Lobar frontal', 'lobar frontal'],
        ['Lobar temporal', 'lobar temporal'],
        ['Lobar parietal', 'lobar parietal'],
        ['Lobar occipital', 'lobar occipital'],
        ['Ganglios basales', 'en ganglios basales'],
        ['Talámica', 'talámica'],
        ['Cerebelosa', 'cerebelosa']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      ...NAV_F,

      { id: 'hhip', l: 'Hallazgos', sec: 'C', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Cerebro tenso', 'parénquima cerebral tenso'],
        ['Hematoma en superficie', 'hematoma que aflora en la superficie cortical'],
        ['Coágulo organizado', 'coágulo organizado'],
        ['Componente líquido', 'hematoma con componente líquido'],
        ['Sangrado activo', 'sangrado activo en la cavidad'],
        ['Tejido anómalo en la pared', 'tejido de aspecto anómalo en la pared de la cavidad'],
        ['Apertura ventricular', 'comunicación de la cavidad con el sistema ventricular']
      ] },

      { id: 'acc', l: 'Vía de acceso', sec: 'D', k: 'opt', o: [
        ['Corticotomía', 'Se realiza corticotomía en el punto más cercano al hematoma'],
        ['Transsulcal', 'Se accede al hematoma por vía transsulcal'],
        ['Trayectoria navegada', 'Se accede al hematoma por trayectoria planificada con neuronavegación']
      ] },
      { id: 'vol', l: 'Volumen evacuado', sec: 'D', k: 'num', u: 'mL', p: 'Se evacúan aproximadamente {v} mL' },
      { id: 'bxp', l: 'Biopsia de la pared', sec: 'F', k: 'yn', q: 1, y: 'Se toma biopsia de la pared de la cavidad', n: 'No se toma biopsia de la pared de la cavidad' },
      { id: 'catl', l: 'Catéter intrahematoma', sec: 'E', k: 'yn', if: ['tec', 'Aspiración estereotáxica con catéter'], y: 'Se deja catéter en el hematoma para drenaje', n: 'No se deja catéter en el hematoma' },
      { id: 'dve', l: 'Drenaje ventricular externo', sec: 'E', k: 'yn', y: 'Se coloca drenaje ventricular externo', n: 'No se coloca drenaje ventricular externo' },
      ...PIC_F,

      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', if: ['tec', ['Craneotomía', 'Craniectomía suboccipital']], o: CDUR, p: 'Se realiza {v}' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', if: ['tec', ['Craneotomía', 'Craniectomía suboccipital', 'Endoscópica']], o: COLG, ph: 'material' },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', if: ['colg', 'Repuesto'], o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      { t: 'Se realiza registro del sistema de navegación y se planifica la trayectoria al hematoma', if: ['nav', 'si'] },
      'Se realiza incisión cutánea {inc} y disección por planos',
      { t: 'Se realizan orificios de trépano y craneotomía centrada en el hematoma', if: ['tec', 'Craneotomía'] },
      { t: 'Se realiza craniectomía suboccipital', if: ['tec', 'Craniectomía suboccipital'] },
      { t: 'Se realiza trépano o minicraneotomía en el punto de entrada planificado', if: ['tec', ['Endoscópica', 'Mínimamente invasiva con vaina', 'Aspiración estereotáxica con catéter']] },
      'Se realiza apertura dural',
      { t: 'Se introduce la vaina transparenquimatosa hasta el hematoma', if: ['tec', ['Endoscópica', 'Mínimamente invasiva con vaina']] },
      { t: 'Se evacúa el hematoma bajo visión endoscópica con aspiración e irrigación', if: ['tec', 'Endoscópica'] },
      { t: 'Se introduce el catéter hasta el centro del hematoma y se realiza aspiración suave', if: ['tec', 'Aspiración estereotáxica con catéter'] },
      { t: 'Se procede a la evacuación del hematoma con aspiración e irrigación bajo microscopio', if: ['tec', ['Craneotomía', 'Craniectomía suboccipital', 'Mínimamente invasiva con vaina']] },
      'Se realiza búsqueda de puntos de sangrado en la cavidad',
      'Se realiza coagulación bipolar de los puntos de sangrado',
      'Se realiza lavado de la cavidad con solución fisiológica tibia',
      'Se cubre la cavidad con material hemostático'
    ],
    ej: 'Hematoma intraparenquimatoso de localización lobar temporal derecha. Se utiliza neuronavegación óptica. Se realiza craneotomía y evacuación del hematoma. Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines. Se realiza incisión cutánea arciforme frontotemporal, craneotomía centrada en el hematoma y apertura dural. Se constata parénquima cerebral tenso y coágulo organizado. Se realiza corticotomía en el punto más cercano al hematoma y se procede a la evacuación con aspiración e irrigación bajo microscopio, con coagulación bipolar de los puntos de sangrado. Se evacúan aproximadamente 45 mL. Se toma biopsia de la pared de la cavidad. Se realiza cierre dural primario con sutura continua y se repone el colgajo óseo fijado con miniplacas y tornillos de titanio. Se constata hemostasia. Se deja drenaje subgaleal aspirativo. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Absceso cerebral ─────────────────────────────
  {
    id: 'nc-abs',
    n: 'Drenaje de absceso cerebral',
    sp: 'Neurocirugía',
    sub: 'Infecciones',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['absceso cerebral', 'aspiración de absceso', 'escisión de absceso', 'empiema', 'infección intracraneal'],
    v: 1,
    rev: '2026-10',
    ref: 'Bodilsen J, D\'Alessandris QG, Humphreys H, et al. European Society of Clinical Microbiology and Infectious Diseases guidelines on diagnosis and treatment of brain abscess in children and adults. Clin Microbiol Infect 2024;30(1):66-89; Brouwer MC, Tunkel AR, McKhann GM, van de Beek D. Brain abscess. N Engl J Med 2014;371(5):447-456; ' + R_BASE,
    ctx: 'Absceso cerebral con indicación de aspiración diagnóstica y terapéutica o de escisión. La variante define la técnica (aspiración guiada por navegación o estereotaxia, aspiración por trépano guiada por ecografía, o craneotomía con escisión de la cápsula). Se documenta el envío de muestras a microbiología y si había antibióticos previos a la toma',
    lat: true,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Aspiración navegada o estereotáxica', 'aspiración del absceso guiada por neuronavegación o estereotaxia'],
        ['Aspiración por trépano con ecografía', 'aspiración del absceso a través de orificio de trépano guiada por ecografía'],
        ['Craneotomía y escisión', 'craneotomía y escisión del absceso con su cápsula'],
        ['Craneotomía y drenaje', 'craneotomía y drenaje del absceso sin escisión de la cápsula']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [...LOC_SUPRA, ['Cerebelosa', 'cerebelosa'], ['Tronco encefálico', 'en tronco encefálico']], p: 'Lesión de localización {v}' },
      { id: 'nles', l: 'Número de lesiones', sec: 'B', k: 'opt', o: [
        ['Única', 'Absceso único'],
        ['Múltiples, se trata una', 'Abscesos múltiples, se interviene {d}'],
        ['Multiloculado', 'Absceso multiloculado']
      ], ph: 'cuál' },
      { id: 'atbp', l: 'Antibióticos previos a la toma', sec: 'B', k: 'opt', q: 1, o: [
        ['Sin antibióticos previos', 'Toma de muestras sin antibioticoterapia previa'],
        ['Con antibióticos previos', 'Toma de muestras con antibioticoterapia iniciada previamente {d}']
      ], ph: 'desde cuándo' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      ...NAV_F,

      { id: 'asp', l: 'Aspecto del contenido', sec: 'C', k: 'multi', q: 1, p: 'Se obtiene {v}', o: [
        ['Purulento', 'contenido purulento'],
        ['Espeso', 'contenido purulento espeso'],
        ['Fétido', 'contenido de olor fétido'],
        ['Seropurulento', 'contenido seropurulento'],
        ['Necrótico', 'material de aspecto necrótico']
      ] },
      { id: 'caps', l: 'Cápsula', sec: 'C', k: 'opt', o: [
        ['Bien formada', 'Cápsula bien formada'],
        ['Delgada', 'Cápsula delgada'],
        ['Sin cápsula definida', 'Sin cápsula definida (fase de cerebritis)']
      ] },
      { id: 'vent', l: 'Relación con el ventrículo', sec: 'C', k: 'opt', o: [
        ['Sin comunicación', 'Sin comunicación de la cavidad con el sistema ventricular'],
        ['Rotura ventricular', 'Se constata comunicación de la cavidad con el sistema ventricular']
      ] },

      { id: 'vol', l: 'Volumen aspirado', sec: 'D', k: 'num', u: 'mL', p: 'Se aspiran aproximadamente {v} mL' },
      { id: 'lav', l: 'Lavado de la cavidad', sec: 'D', k: 'opt', o: [
        ['Solución fisiológica', 'Se realiza lavado de la cavidad con solución fisiológica'],
        ['Sin lavado', 'No se realiza lavado de la cavidad']
      ] },
      { id: 'catd', l: 'Catéter de drenaje en la cavidad', sec: 'E', k: 'yn', y: 'Se deja catéter de drenaje en la cavidad', n: 'No se deja catéter en la cavidad' },
      { id: 'dve', l: 'Drenaje ventricular externo', sec: 'E', k: 'yn', y: 'Se coloca drenaje ventricular externo', n: 'No se coloca drenaje ventricular externo' },

      { id: 'mmic', l: 'Muestras para microbiología', sec: 'F', k: 'multi', q: 1, req: 1, o: [
        ['Gram y cultivo aerobio', 'Se envía material para tinción de Gram y cultivo aerobio'],
        ['Cultivo anaerobio', 'Se envía material en medio para cultivo anaerobio'],
        ['Micobacterias', 'Se envía material para estudio de micobacterias'],
        ['Hongos', 'Se envía material para estudio micológico'],
        ['Estudio molecular', 'Se envía material para estudio molecular de identificación bacteriana'],
        ['Parásitos', 'Se envía material para estudio parasitológico'],
        ['No se envían', 'No se envían muestras a microbiología']
      ] },
      { id: 'apc', l: 'Anatomía Patológica', sec: 'F', k: 'yn', y: 'Se envía la cápsula o tejido de la pared a Anatomía Patológica', n: 'No se envía tejido a Anatomía Patológica' },

      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', if: ['tec', ['Craneotomía y escisión', 'Craneotomía y drenaje']], o: CDUR, p: 'Se realiza {v}' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', if: ['tec', ['Craneotomía y escisión', 'Craneotomía y drenaje']], o: COLG, ph: 'material' }
    ],
    pasos: [
      { t: 'Se realiza registro del sistema de navegación y se planifica la trayectoria al centro del absceso', if: ['nav', 'si'] },
      'Se realiza incisión cutánea {inc} y disección por planos',
      { t: 'Se realiza orificio de trépano en el punto de entrada planificado', if: ['tec', ['Aspiración navegada o estereotáxica', 'Aspiración por trépano con ecografía']] },
      { t: 'Se localiza el absceso con ecografía a través del trépano', if: ['tec', 'Aspiración por trépano con ecografía'] },
      { t: 'Se realizan orificios de trépano y craneotomía centrada en la lesión', if: ['tec', ['Craneotomía y escisión', 'Craneotomía y drenaje']] },
      'Se coagula la duramadre y se realiza apertura dural',
      { t: 'Se introduce cánula de punta roma hasta el centro de la cavidad', if: ['tec', ['Aspiración navegada o estereotáxica', 'Aspiración por trépano con ecografía']] },
      'Se aspira el contenido en forma suave y se toman muestras para microbiología',
      { t: 'Se diseca la cápsula del parénquima circundante y se reseca en bloque', if: ['tec', 'Craneotomía y escisión'] },
      'Se realiza lavado de la cavidad con solución fisiológica',
      'Se realiza cierre de la incisión'
    ],
    ej: 'Se realiza aspiración del absceso guiada por neuronavegación o estereotaxia. Lesión de localización frontal derecha. Absceso único. Toma de muestras sin antibioticoterapia previa. Se utiliza neuronavegación óptica. Se realiza registro y planificación de la trayectoria al centro del absceso, incisión cutánea lineal, orificio de trépano en el punto de entrada y apertura dural. Se introduce cánula de punta roma hasta el centro de la cavidad y se aspira el contenido en forma suave. Se obtiene contenido purulento espeso. Cápsula bien formada. Se aspiran aproximadamente 15 mL. Se envía material para tinción de Gram y cultivo aerobio, en medio para cultivo anaerobio, para estudio de micobacterias y micológico. No se deja catéter en la cavidad. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Craneotomía por lesión traumática ─────────────────────────────
  {
    id: 'nc-trau',
    n: 'Craneotomía para descompresión o tratamiento de lesión traumática',
    sp: 'Neurocirugía',
    sub: 'Trauma',
    cat: 'Cirugía craneal y neurooncología',
    syn: ['fractura con hundimiento', 'elevación de hundimiento', 'contusión cerebral', 'herida penetrante craneal', 'TEC', 'TCE', 'fístula de LCR', 'craneotomía de trauma'],
    v: 1,
    rev: '2026-10',
    ref: 'Bullock MR, et al. Surgical management of depressed cranial fractures. Neurosurgery 2006;58(3 Suppl):S56-S60; Bullock MR, et al. Surgical management of traumatic parenchymal lesions. Neurosurgery 2006;58(3 Suppl):S25-S46; ' + R_TBI + '; ' + R_BASE,
    ctx: 'Lesión craneoencefálica traumática distinta de los hematomas epidural o subdural aislados: fractura con hundimiento, contusión hemorrágica con efecto de masa, herida penetrante, compromiso del seno frontal o desgarro dural con fístula de LCR. La variante define la lesión tratada (pueden ser varias)',
    lat: true,
    f: [
      { id: 'les', l: 'Lesión tratada', sec: 'B', k: 'multi', vr: 1, q: 1, req: 1, p: 'Se interviene por {v}', o: [
        ['Fractura con hundimiento', 'fractura craneal con hundimiento'],
        ['Contusión hemorrágica', 'contusión hemorrágica con efecto de masa'],
        ['Herida penetrante', 'herida craneoencefálica penetrante'],
        ['Compromiso del seno frontal', 'fractura con compromiso del seno frontal'],
        ['Desgarro dural o fístula de LCR', 'desgarro dural con fístula de LCR'],
        ['Lesión de seno venoso', 'lesión de seno venoso dural']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'multi', vr: 1, q: 1, req: 1, p: 'Lesión de localización {v}', o: LOC_HEM },
      { id: 'herida', l: 'Herida', sec: 'B', k: 'opt', o: [
        ['Cerrada', 'Lesión cerrada, sin herida de cuero cabelludo comunicante'],
        ['Abierta limpia', 'Herida de cuero cabelludo abierta, sin contaminación macroscópica'],
        ['Abierta contaminada', 'Herida de cuero cabelludo abierta, con contaminación macroscópica'],
        ['Orificio de entrada y salida', 'Herida penetrante con orificio de entrada y de salida {d}']
      ], ph: 'localización' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: [...INC_CRANEO, ['Incorporando la herida', 'incorporando la herida traumática']], p: 'Se realiza incisión cutánea {v}' },
      { id: 'osea', l: 'Apertura ósea', sec: 'B', k: 'opt', p: 'Se realiza {v}', o: [
        ['Craneotomía alrededor del hundimiento', 'craneotomía alrededor del área de hundimiento'],
        ['Craneotomía', 'craneotomía centrada en la lesión'],
        ['Craneotomía bifrontal', 'craneotomía bifrontal'],
        ['Craniectomía', 'craniectomía']
      ] },

      { id: 'htr', l: 'Hallazgos', sec: 'C', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Hundimiento mayor al espesor de la tabla', 'hundimiento mayor que el espesor de la tabla ósea'],
        ['Fragmentos óseos intradurales', 'fragmentos óseos intradurales'],
        ['Cuerpos extraños', 'cuerpos extraños en el trayecto'],
        ['Desgarro dural', 'desgarro dural'],
        ['Salida de LCR', 'salida de LCR'],
        ['Contusión', 'contusión cortical'],
        ['Laceración cortical', 'laceración cortical'],
        ['Pared posterior del seno frontal fracturada', 'fractura de la pared posterior del seno frontal'],
        ['Mucosa sinusal expuesta', 'mucosa del seno frontal expuesta'],
        ['Lesión de seno venoso', 'lesión del seno venoso dural']
      ] },
      { id: 'prof', l: 'Profundidad del hundimiento', sec: 'C', k: 'num', u: 'mm', if: ['les', 'Fractura con hundimiento'], p: 'Hundimiento de {v} mm' },

      { id: 'tevac', l: 'Maniobras realizadas', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Elevación del hundimiento', 'elevación de los fragmentos óseos hundidos'],
        ['Resección de tejido contuso', 'resección de tejido contuso desvitalizado'],
        ['Evacuación de hematoma asociado', 'evacuación del hematoma asociado'],
        ['Debridamiento del trayecto', 'debridamiento del trayecto con extracción de fragmentos óseos y cuerpos extraños accesibles'],
        ['Lavado del trayecto', 'lavado del trayecto con solución fisiológica']
      ] },
      { id: 'fseno', l: 'Manejo del seno frontal', sec: 'D', k: 'opt', if: ['les', 'Compromiso del seno frontal'], o: [
        ['Cranealización', 'Se realiza cranealización del seno frontal con resección de la pared posterior y de la mucosa'],
        ['Reparación de la pared anterior', 'Se reduce y fija la pared anterior del seno frontal'],
        ['Obliteración', 'Se realiza obliteración del seno frontal con exéresis de la mucosa'],
        ['Exclusión con pericráneo', 'Se excluye el seno frontal con colgajo de pericráneo vascularizado']
      ] },
      { id: 'mseno', l: 'Manejo del seno venoso', sec: 'D', k: 'opt', if: ['les', 'Lesión de seno venoso'], o: [
        ['Hemostático y compresión', 'Se controla el sangrado del seno con material hemostático y compresión'],
        ['Sutura directa', 'Se realiza sutura directa de la pared del seno'],
        ['Parche', 'Se repara el seno con parche de {d}']
      ], ph: 'material' },
      { id: 'cext', l: 'Cuerpos extraños', sec: 'D', k: 'opt', if: ['les', 'Herida penetrante'], o: [
        ['Extraídos', 'Se extraen los cuerpos extraños accesibles'],
        ['Retenidos profundos', 'Se dejan cuerpos extraños profundos no accesibles {d}']
      ], ph: 'localización' },
      { id: 'frag', l: 'Fragmentos óseos', sec: 'G', k: 'opt', q: 1, o: [
        ['Repuestos', 'Se reponen los fragmentos óseos tras su lavado'],
        ['Repuestos y fijados', 'Se reponen los fragmentos óseos tras su lavado y se fijan con {d}'],
        ['Descartados', 'Se descartan los fragmentos óseos contaminados o conminutos'],
        ['Reemplazo con malla', 'Se reemplazan los fragmentos óseos con malla de titanio']
      ], ph: 'material de fijación' },
      { id: 'cdur', l: 'Reparación dural', sec: 'G', k: 'multi', q: 1, req: 1, o: CDUR, p: 'Se realiza {v}' },
      ...PIC_F,
      ...CONG_F.slice(0, 0),
      { id: 'cult', l: 'Cultivo', sec: 'F', k: 'yn', y: 'Se envían muestras del trayecto para cultivo', n: 'No se envían muestras para cultivo' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      { t: 'Se realiza lavado y debridamiento de la herida de cuero cabelludo', if: ['herida', ['Abierta limpia', 'Abierta contaminada', 'Orificio de entrada y salida']] },
      'Se realiza incisión cutánea {inc} y disección por planos hasta plano óseo',
      'Se realiza {osea}',
      { t: 'Se realizan orificios de trépano en hueso sano alrededor del hundimiento', if: ['les', 'Fractura con hundimiento'] },
      { t: 'Se elevan los fragmentos óseos hundidos', if: ['les', 'Fractura con hundimiento'] },
      'Se inspecciona la duramadre y se amplía el desgarro dural para explorar el espacio subdural',
      { t: 'Se reseca el tejido contuso desvitalizado con aspiración y bipolar', if: ['les', 'Contusión hemorrágica'] },
      { t: 'Se debrida el trayecto penetrante y se extraen los fragmentos óseos y cuerpos extraños accesibles', if: ['les', 'Herida penetrante'] },
      { t: 'Se talla un colgajo de pericráneo vascularizado', if: ['les', ['Compromiso del seno frontal', 'Desgarro dural o fístula de LCR']] },
      'Se realiza lavado del lecho con solución fisiológica tibia',
      'Se realiza reparación dural hermética',
      'Se realizan puntos de suspensión dural'
    ],
    ej: 'Se interviene por fractura craneal con hundimiento. Lesión de localización parietal derecha. Herida de cuero cabelludo abierta, sin contaminación macroscópica. Se realiza lavado y debridamiento de la herida, incisión cutánea incorporando la herida traumática y disección hasta plano óseo. Se realizan orificios de trépano en hueso sano alrededor del hundimiento y se realiza craneotomía alrededor del área de hundimiento, con elevación de los fragmentos óseos. Se constata hundimiento mayor que el espesor de la tabla ósea y desgarro dural. Hundimiento de 12 mm. Se inspecciona el espacio subdural y se lava el lecho con solución fisiológica tibia. Se realiza duroplastia con injerto de pericráneo autólogo. Se reponen los fragmentos óseos tras su lavado y se fijan con miniplacas de titanio. Se constata hemostasia. Se deja drenaje subgaleal aspirativo. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  }
];
