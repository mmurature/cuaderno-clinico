// Biblioteca de partes quirúrgicos · Neurocirugía (BLOQUE B)
// Datos puros. Convención para campos citados en `pasos` con {id}: la frase de la opción es un fragmento que se
// inserta tal cual dentro del paso; `p` es el envoltorio que se usa cuando el campo se escribe por sí solo.

// ---------- Opciones compartidas ----------

const POS_CRANEO = [
  ['Supino, cabeza fijada en cabezal de tres pines', 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines'],
  ['Supino, cabeza rotada y fijada', 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines'],
  ['Supino, cabeza en extensión y fijada', 'Paciente en decúbito supino con cabeza en leve extensión y fijada en cabezal de tres pines'],
  ['Supino, cabeza en apoyo en herradura', 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura'],
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
  ['Parasagital / falcina', 'parasagital'],
  ['Convexidad', 'de la convexidad'],
  ['Base de cráneo anterior', 'de la base de cráneo anterior'],
  ['Ala esfenoidal', 'del ala esfenoidal'],
  ['Selar / paraselar', 'selar y paraselar'],
  ['Intraventricular', 'intraventricular'],
  ['Cuerpo calloso', 'en cuerpo calloso'],
  ['Talámica', 'talámica'],
  ['Ganglios basales', 'en ganglios basales'],
  ['Región pineal', 'de la región pineal']
];

const INC_CRANEO = [
  ['Arciforme frontotemporal', 'arciforme frontotemporal'],
  ['Bicoronal', 'bicoronal'],
  ['En herradura', 'en herradura'],
  ['Lineal', 'lineal'],
  ['En signo de interrogación', 'en signo de interrogación'],
  ['Supraciliar', 'supraciliar'],
  ['Retroauricular', 'retroauricular']
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

const MNIO_ESP = [
  ['PEM', 'potenciales evocados motores'],
  ['PESS', 'potenciales evocados somatosensitivos'],
  ['EMG libre', 'electromiografía libre'],
  ['EMG estimulada de tornillos', 'electromiografía estimulada']
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

const CDUR = [
  ['Primario, sutura continua', 'cierre dural primario con sutura continua'],
  ['Primario, puntos separados', 'cierre dural primario con puntos separados'],
  ['Duroplastia con pericráneo', 'duroplastia con injerto de pericráneo autólogo'],
  ['Duroplastia con fascia autóloga', 'duroplastia con injerto de fascia autóloga'],
  ['Duroplastia con sustituto dural', 'duroplastia con sustituto dural'],
  ['Refuerzo con sellante', 'refuerzo de la línea de sutura con sellante dural'],
  ['Material hemostático epidural', 'colocación de material hemostático epidural']
];

const COLG = [
  ['Repuesto', 'Se repone el colgajo óseo'],
  ['No repuesto, criopreservado', 'No se repone el colgajo óseo, que se envía para criopreservación'],
  ['No repuesto, en subcutáneo abdominal', 'No se repone el colgajo óseo, que se aloja en tejido celular subcutáneo abdominal'],
  ['No repuesto, descartado', 'No se repone el colgajo óseo, que se descarta'],
  ['Craneoplastia en el mismo acto', 'Se realiza craneoplastia en el mismo acto quirúrgico']
];

const FIJ_COLG = [
  ['Placas y tornillos de titanio', 'miniplacas y tornillos de titanio'],
  ['Sistema de fijación tipo clamp', 'sistema de fijación craneal tipo clamp'],
  ['Puntos transóseos', 'puntos transóseos'],
  ['Relleno de orificios con cemento', 'relleno de orificios de trépano con cemento óseo'],
  ['Relleno de orificios con tapones', 'tapones para orificios de trépano']
];

const DTIPO_CRANEO = [
  ['Subgaleal', 'subgaleal'],
  ['Epidural', 'epidural'],
  ['Subdural', 'subdural'],
  ['En lecho quirúrgico', 'en el lecho quirúrgico'],
  ['Subgaleal aspirativo', 'subgaleal aspirativo'],
  ['Subgaleal a caída libre', 'subgaleal a caída libre']
];

const DTIPO_COLUMNA = [
  ['Subfascial aspirativo', 'subfascial aspirativo'],
  ['Epidural aspirativo', 'epidural aspirativo'],
  ['Subcutáneo', 'subcutáneo'],
  ['Prevertebral aspirativo', 'prevertebral aspirativo']
];

const LCR_ASP = [
  ['Cristalino', 'cristalino'],
  ['Xantocrómico', 'xantocrómico'],
  ['Serohemático', 'serohemático'],
  ['Hemático', 'hemático'],
  ['Turbio', 'turbio'],
  ['Purulento', 'purulento'],
  ['Hiperproteico', 'de aspecto hiperproteico']
];

const GUIA_VENT = [
  ['Reparos anatómicos', 'según reparos anatómicos'],
  ['Neuronavegación', 'guiada por neuronavegación'],
  ['Ecografía', 'guiada por ecografía'],
  ['Endoscopio', 'bajo visión endoscópica']
];

const ENTR_VENT = [
  ['Kocher', 'en punto de Kocher'],
  ['Frazier', 'en punto de Frazier'],
  ['Keen', 'en punto de Keen'],
  ['Dandy', 'en punto de Dandy'],
  ['Paine', 'en punto de Paine']
];

const CAT_VENT = [
  ['Silicona estándar', 'Se utiliza catéter ventricular de silicona estándar'],
  ['Impregnado en antibiótico', 'Se utiliza catéter ventricular impregnado en antibiótico'],
  ['Impregnado en plata', 'Se utiliza catéter ventricular impregnado en plata']
];

const VERT = [
  ['C1', 'C1'], ['C2', 'C2'], ['C3', 'C3'], ['C4', 'C4'], ['C5', 'C5'], ['C6', 'C6'], ['C7', 'C7'],
  ['T1', 'T1'], ['T2', 'T2'], ['T3', 'T3'], ['T4', 'T4'], ['T5', 'T5'], ['T6', 'T6'], ['T7', 'T7'],
  ['T8', 'T8'], ['T9', 'T9'], ['T10', 'T10'], ['T11', 'T11'], ['T12', 'T12'],
  ['L1', 'L1'], ['L2', 'L2'], ['L3', 'L3'], ['L4', 'L4'], ['L5', 'L5'], ['S1', 'S1']
];

const DISC_C = [
  ['C2-C3', 'C2-C3'], ['C3-C4', 'C3-C4'], ['C4-C5', 'C4-C5'], ['C5-C6', 'C5-C6'], ['C6-C7', 'C6-C7'], ['C7-T1', 'C7-T1']
];

const DISC_L = [
  ['T12-L1', 'T12-L1'], ['L1-L2', 'L1-L2'], ['L2-L3', 'L2-L3'], ['L3-L4', 'L3-L4'], ['L4-L5', 'L4-L5'], ['L5-S1', 'L5-S1']
];

const POS_COLUMNA = [
  ['Prono sobre marco', 'Paciente en decúbito prono sobre marco con abdomen libre'],
  ['Prono sobre almohadillas', 'Paciente en decúbito prono sobre almohadillas longitudinales con abdomen libre'],
  ['Genupectoral', 'Paciente en posición genupectoral'],
  ['Prono, cabeza fijada', 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines y cuello en leve flexión'],
  ['Supino, cuello en extensión', 'Paciente en decúbito supino con rodete interescapular y cuello en leve extensión'],
  ['Lateral', 'Paciente en decúbito lateral con flexión de la mesa a nivel lumbar']
];

const POS_LUMBAR = [
  ['Prono sobre marco', 'Paciente en decúbito prono sobre marco con abdomen libre'],
  ['Prono sobre almohadillas', 'Paciente en decúbito prono sobre almohadillas longitudinales con abdomen libre'],
  ['Genupectoral', 'Paciente en posición genupectoral']
];

const MARCA_NIVEL = [
  ['Radioscopía', 'mediante radioscopía'],
  ['Radiografía intraoperatoria', 'mediante radiografía intraoperatoria'],
  ['Navegación', 'mediante navegación intraoperatoria'],
  ['Reparos anatómicos', 'según reparos anatómicos']
];

const DUROT_REP = [
  ['Sutura primaria', 'sutura primaria'],
  ['Sutura y sellante', 'sutura primaria y sellante dural'],
  ['Parche de grasa y sellante', 'parche de grasa autóloga y sellante dural'],
  ['Parche muscular y sellante', 'parche muscular autólogo y sellante dural'],
  ['Sustituto dural y sellante', 'sustituto dural y sellante dural'],
  ['Solo sellante', 'sellante dural']
];

const CAGE_MAT = [
  ['PEEK', 'de PEEK'],
  ['Titanio', 'de titanio'],
  ['PEEK recubierto de titanio', 'de PEEK recubierto de titanio'],
  ['Titanio poroso', 'de titanio poroso']
];

const INJ = [
  ['Autoinjerto local', 'autoinjerto óseo local'],
  ['Autoinjerto de cresta ilíaca', 'autoinjerto de cresta ilíaca'],
  ['Aloinjerto', 'aloinjerto óseo'],
  ['Sustituto óseo sintético', 'sustituto óseo sintético'],
  ['Matriz ósea desmineralizada', 'matriz ósea desmineralizada']
];

// ---------- Plantillas ----------

export default [
  // 14. Craneotomía y resección de lesión intracraneal
  {
    id: 'nc-cran',
    n: 'Craneotomía y resección de lesión intracraneal',
    sp: 'Neurocirugía',
    sub: 'Oncología',
    v: 1,
    ctx: 'Lesiones intracraneales supratentoriales, intra o extraaxiales, que requieren resección o biopsia a cielo abierto. La extensión de la resección solo se escribe si fue documentada por el cirujano',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', o: LOC_SUPRA, p: 'Lesión de localización {v}', req: 1 },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', o: [
        ['Pterional', 'pterional'],
        ['Frontotemporal', 'frontotemporal'],
        ['Frontal', 'frontal'],
        ['Bifrontal', 'bifrontal'],
        ['Temporal', 'temporal'],
        ['Parietal', 'parietal'],
        ['Occipital', 'occipital'],
        ['Supraorbitario', 'supraorbitario'],
        ['Orbitocigomático', 'orbitocigomático'],
        ['Interhemisférico', 'interhemisférico'],
        ['Interhemisférico transcalloso', 'interhemisférico transcalloso'],
        ['Transcortical', 'transcortical'],
        ['Transilviano', 'transilviano']
      ] },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      { id: 'nav', l: 'Neuronavegación', sec: 'B', k: 'yn', y: 'Se utiliza neuronavegación', n: 'No se utiliza neuronavegación' },
      { id: 'navt', l: 'Sistema de navegación', sec: 'B', k: 'opt', if: ['nav', 'si'], o: [
        ['Óptica', 'Se utiliza sistema de navegación óptica'],
        ['Electromagnética', 'Se utiliza sistema de navegación electromagnética']
      ] },
      { id: 'navr', l: 'Registro', sec: 'B', k: 'opt', if: ['nav', 'si'], o: [
        ['Superficie facial', 'Se realiza registro por reconocimiento de superficie facial'],
        ['Marcadores fiduciales', 'Se realiza registro por marcadores fiduciales'],
        ['Puntos anatómicos', 'Se realiza registro por puntos anatómicos']
      ] },
      { id: 'navx', l: 'Error de registro', sec: 'B', k: 'num', u: 'mm', if: ['nav', 'si'], p: 'Error de registro de {v} mm' },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], o: MNIO_MOD, p: 'Se monitorean {v}' },
      { id: 'osea', l: 'Apertura ósea', sec: 'B', k: 'opt', p: 'Se realiza {v}', o: [
        ['Craneotomía, colgajo libre', 'craneotomía con colgajo óseo libre'],
        ['Craneotomía osteoplástica', 'craneotomía osteoplástica con colgajo pediculado'],
        ['Minicraneotomía', 'minicraneotomía'],
        ['Craniectomía', 'craniectomía'],
        ['Reapertura de craneotomía previa', 'reapertura de craneotomía previa']
      ] },
      { id: 'dura', l: 'Apertura dural', sec: 'B', k: 'opt', p: 'Se realiza apertura dural {v}', o: [
        ['En C', 'en C'],
        ['En C con base hacia el seno', 'en C con base hacia el seno venoso'],
        ['En cruz', 'en cruz'],
        ['En U', 'en U'],
        ['Lineal', 'lineal'],
        ['Circunferencial a la implantación', 'circunferencial alrededor de la implantación dural de la lesión']
      ] },
      { id: 'hcort', l: 'Hallazgos al abrir', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Cerebro tenso', 'parénquima cerebral tenso'],
        ['Cerebro relajado', 'parénquima cerebral relajado'],
        ['Corteza sin alteraciones', 'corteza de aspecto normal'],
        ['Lesión visible en superficie', 'lesión visible en la superficie cortical'],
        ['Lesión subcortical', 'lesión subcortical no visible en la superficie'],
        ['Edema perilesional', 'edema perilesional'],
        ['Componente quístico', 'componente quístico'],
        ['Hemorragia intralesional', 'hemorragia intralesional'],
        ['Calcificaciones', 'calcificaciones intralesionales']
      ] },
      { id: 'tles', l: 'Tipo de lesión', sec: 'C', k: 'opt', p: 'Se identifica {v}', o: [
        ['Intraaxial infiltrativa', 'lesión intraaxial de aspecto infiltrativo, de límites mal definidos'],
        ['Intraaxial bien delimitada', 'lesión intraaxial de límites netos'],
        ['Extraaxial con base dural', 'lesión extraaxial con implantación dural'],
        ['Intraventricular', 'lesión intraventricular'],
        ['Quística', 'lesión quística'],
        ['Sólido-quística', 'lesión sólido-quística'],
        ['Necrótica', 'lesión con áreas de aspecto necrótico'],
        ['Absceso', 'colección encapsulada de contenido purulento']
      ] },
      { id: 'tcar', l: 'Características de la lesión', sec: 'C', k: 'multi', p: 'Lesión {v}', o: [
        ['Blanda', 'de consistencia blanda'],
        ['Firme', 'de consistencia firme'],
        ['Fibrosa', 'de consistencia fibrosa'],
        ['Calcificada', 'calcificada'],
        ['Poco vascularizada', 'poco vascularizada'],
        ['Ricamente vascularizada', 'ricamente vascularizada'],
        ['Con plano de clivaje', 'con plano de clivaje identificable respecto del parénquima'],
        ['Sin plano de clivaje', 'sin plano de clivaje identificable'],
        ['Infiltra dura', 'con infiltración dural'],
        ['Infiltra seno venoso', 'con infiltración del seno venoso adyacente'],
        ['Hiperostosis', 'con hiperostosis del hueso adyacente'],
        ['Engloba vasos', 'que engloba estructuras vasculares'],
        ['Relación con nervios craneales', 'en íntima relación con nervios craneales']
      ] },
      { id: 'adj', l: 'Adyuvantes de resección', sec: 'D', k: 'multi', p: 'Se utiliza {v}', o: [
        ['Microscopio quirúrgico', 'microscopio quirúrgico'],
        ['Endoscopio', 'endoscopio'],
        ['Ecografía intraoperatoria', 'ecografía intraoperatoria'],
        ['Ácido 5-aminolevulínico', 'fluorescencia con ácido 5-aminolevulínico'],
        ['Fluoresceína sódica', 'fluorescencia con fluoresceína sódica'],
        ['Aspirador ultrasónico', 'aspirador ultrasónico']
      ] },
      { id: 'ext', l: 'Extensión de resección', sec: 'D', k: 'opt', o: EXT_RES, req: 1 },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'adherido a la pared del seno sagital superior' },
      { id: 'extc', l: 'Evaluación de la extensión', sec: 'D', k: 'multi', p: 'Extensión de resección evaluada por {v}', o: [
        ['Inspección microscópica', 'inspección microscópica del lecho'],
        ['Fluorescencia', 'fluorescencia'],
        ['Ecografía', 'ecografía intraoperatoria'],
        ['Neuronavegación', 'neuronavegación'],
        ['RM intraoperatoria', 'resonancia magnética intraoperatoria']
      ] },
      { id: 'simp', l: 'Grado de Simpson', sec: 'D', k: 'opt', o: [
        ['I', 'Resección grado I de Simpson'],
        ['II', 'Resección grado II de Simpson'],
        ['III', 'Resección grado III de Simpson'],
        ['IV', 'Resección grado IV de Simpson'],
        ['V', 'Descompresión grado V de Simpson']
      ] },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], o: MNIO_RES },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio intraoperatorio por congelación', n: 'No se realiza estudio intraoperatorio por congelación' },
      { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'sus', l: 'Suspensión dural', sec: 'G', k: 'yn', y: 'Se realizan puntos de suspensión dural', n: 'No se realizan puntos de suspensión dural' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', o: CDUR, p: 'Se realiza {v}' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza marcación de la incisión y del área de craneotomía',
      'Se realiza incisión cutánea {inc} y disección por planos',
      'Se rebate el colgajo cutáneo y muscular',
      'Se realizan orificios de trépano y {osea}',
      'Se realiza apertura dural {dura}',
      'Se incorpora microscopio quirúrgico',
      'Se realiza corticotomía y disección transparenquimatosa hasta la lesión',
      'Se realiza devascularización de la implantación dural de la lesión',
      'Se realiza disección de la interfase entre la lesión y el parénquima',
      'Se procede a la resección de la lesión con técnica microquirúrgica',
      'Se realiza revisión del lecho quirúrgico'
    ],
    ej: 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines. Se utiliza neuronavegación óptica con registro por reconocimiento de superficie facial. Se realiza incisión arciforme frontotemporal derecha, craneotomía con colgajo óseo libre y apertura dural en C. Se identifica lesión intraaxial frontal de aspecto infiltrativo, de consistencia blanda y poco vascularizada. Con microscopio quirúrgico y fluorescencia con ácido 5-aminolevulínico se procede a la resección con técnica microquirúrgica, y se realiza resección subtotal de la lesión, con remanente adyacente a la corteza motora. Se envían muestras a Anatomía Patológica. Se realiza cierre dural primario con sutura continua y refuerzo con sellante dural, y se repone el colgajo óseo fijado con miniplacas y tornillos de titanio. No se registran complicaciones intraoperatorias'
  },

  // 15. Drenaje de hematoma intracraneal
  {
    id: 'nc-hem',
    n: 'Drenaje de hematoma intracraneal',
    sp: 'Neurocirugía',
    sub: 'Trauma',
    v: 1,
    ctx: 'Evacuación de hematomas extradurales, subdurales o intraparenquimatosos mediante orificios de trépano, craneotomía o craniectomía, en contexto traumático o espontáneo',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'thema', l: 'Tipo de hematoma', sec: 'B', k: 'opt', p: 'Se interviene hematoma {v}', req: 1, o: [
        ['Extradural agudo', 'extradural agudo'],
        ['Subdural agudo', 'subdural agudo'],
        ['Subdural subagudo', 'subdural subagudo'],
        ['Subdural crónico', 'subdural crónico'],
        ['Subdural crónico reagudizado', 'subdural crónico con componente agudo'],
        ['Intraparenquimatoso', 'intraparenquimatoso'],
        ['Cerebeloso', 'cerebeloso'],
        ['Higroma subdural', 'higroma subdural']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'multi', p: 'Hematoma de localización {v}', req: 1, o: [
        ['Frontal', 'frontal'],
        ['Temporal', 'temporal'],
        ['Parietal', 'parietal'],
        ['Occipital', 'occipital'],
        ['Hemisférico', 'hemisférica'],
        ['Fosa posterior', 'en fosa posterior'],
        ['Ganglios basales', 'en ganglios basales'],
        ['Lobar', 'lobar']
      ] },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza {v}', req: 1, o: [
        ['Un orificio de trépano', 'un orificio de trépano'],
        ['Dos orificios de trépano', 'dos orificios de trépano'],
        ['Trepanación con broca fina (twist drill)', 'trepanación con broca de pequeño calibre'],
        ['Minicraneotomía', 'minicraneotomía'],
        ['Craneotomía', 'craneotomía'],
        ['Craneotomía amplia de trauma', 'craneotomía frontotemporoparietal amplia'],
        ['Craniectomía descompresiva', 'craniectomía descompresiva frontotemporoparietal'],
        ['Craniectomía suboccipital', 'craniectomía suboccipital'],
        ['Endoscópico', 'abordaje endoscópico a través de orificio de trépano']
      ] },
      { id: 'diam', l: 'Diámetro de la craniectomía', sec: 'B', k: 'num', u: 'cm', p: 'Defecto óseo de {v} cm de diámetro anteroposterior' },
      { id: 'dura', l: 'Apertura dural', sec: 'B', k: 'opt', p: 'Se realiza apertura dural {v}', o: [
        ['En cruz', 'en cruz'],
        ['En C', 'en C'],
        ['En estrella', 'en estrella'],
        ['Lineal', 'lineal']
      ] },
      { id: 'hhall', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Coágulo organizado', 'hematoma coagulado'],
        ['Hematoma líquido achocolatado', 'hematoma líquido de color achocolatado'],
        ['Componente agudo y crónico', 'hematoma con componentes agudo y crónico'],
        ['Membranas', 'membranas subdurales'],
        ['Tabicamiento', 'hematoma tabicado'],
        ['Salida a presión', 'salida del contenido a presión'],
        ['Sangrado de arteria meníngea media', 'sangrado activo de rama de la arteria meníngea media'],
        ['Sangrado de seno venoso', 'sangrado de origen venoso sinusal'],
        ['Sangrado de vena puente', 'sangrado de vena puente'],
        ['Sangrado cortical', 'sangrado cortical activo'],
        ['Contusión subyacente', 'contusión cortical subyacente'],
        ['Cerebro tumefacto', 'parénquima cerebral tumefacto'],
        ['Fractura craneal', 'fractura craneal asociada'],
        ['Fractura con hundimiento', 'fractura craneal con hundimiento']
      ] },
      { id: 'tevac', l: 'Técnica de evacuación', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Aspiración e irrigación', 'evacuación con aspiración e irrigación con solución fisiológica tibia'],
        ['Lavado a través de orificios', 'lavado del espacio subdural a través de los orificios de trépano'],
        ['Extracción de coágulos', 'extracción de coágulos con aspiración y pinzas'],
        ['Resección de membranas', 'apertura y resección de membranas'],
        ['Corticotomía', 'corticotomía para acceso al hematoma intraparenquimatoso'],
        ['Evacuación endoscópica', 'evacuación endoscópica del hematoma'],
        ['Coagulación de meníngea media', 'coagulación de la arteria meníngea media'],
        ['Resección de tejido contuso', 'resección de tejido contuso desvitalizado'],
        ['Elevación de hundimiento', 'elevación del fragmento óseo hundido']
      ] },
      { id: 'vol', l: 'Volumen evacuado', sec: 'D', k: 'num', u: 'mL', p: 'Se evacúan aproximadamente {v} mL' },
      { id: 'reexp', l: 'Estado cerebral al finalizar la evacuación', sec: 'D', k: 'opt', o: [
        ['Pulsátil', 'Al finalizar la evacuación se constata parénquima cerebral pulsátil'],
        ['Reexpansión parcial', 'Al finalizar la evacuación se constata reexpansión cerebral parcial'],
        ['Sin reexpansión', 'Al finalizar la evacuación no se constata reexpansión cerebral'],
        ['Cerebro tenso', 'Al finalizar la evacuación se constata parénquima cerebral tenso'],
        ['Protrusión por el defecto', 'Al finalizar la evacuación se constata protrusión del parénquima a través del defecto óseo']
      ] },
      { id: 'pic', l: 'Sensor de PIC', sec: 'E', k: 'yn', y: 'Se coloca sensor de presión intracraneana', n: 'No se coloca sensor de presión intracraneana' },
      { id: 'pict', l: 'Tipo de sensor', sec: 'E', k: 'opt', if: ['pic', 'si'], o: [
        ['Intraparenquimatoso', 'Sensor de presión intracraneana intraparenquimatoso'],
        ['Intraventricular', 'Sensor de presión intracraneana intraventricular'],
        ['Subdural', 'Sensor de presión intracraneana subdural']
      ] },
      { id: 'picv', l: 'PIC inicial', sec: 'E', k: 'num', u: 'mmHg', if: ['pic', 'si'], p: 'Presión intracraneana inicial de {v} mmHg' },
      { id: 'sus', l: 'Suspensión dural', sec: 'G', k: 'yn', y: 'Se realizan puntos de suspensión dural', n: 'No se realizan puntos de suspensión dural' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'opt', o: [
        ['Primario', 'Se realiza cierre dural primario'],
        ['Duroplastia con sustituto', 'Se realiza duroplastia de ampliación con sustituto dural'],
        ['Duroplastia con pericráneo', 'Se realiza duroplastia de ampliación con injerto de pericráneo autólogo'],
        ['Sustituto dural sin sutura', 'Se coloca sustituto dural sobre el defecto, sin sutura'],
        ['Sin cierre dural', 'No se realiza cierre dural']
      ] },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza marcación de la incisión según neuroimagen',
      'Se realiza incisión cutánea {inc} y disección por planos hasta plano óseo',
      'Se realiza {abord}',
      'Se realiza coagulación y apertura de la duramadre',
      'Se procede a la evacuación del hematoma',
      'Se realiza búsqueda del punto de sangrado',
      'Se realiza coagulación bipolar del punto de sangrado',
      'Se realizan maniobras de Valsalva para control de la hemostasia',
      'Se realiza lavado de la cavidad con solución fisiológica tibia hasta obtener retorno claro'
    ],
    ej: 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura. Se interviene hematoma subdural crónico de localización hemisférica izquierda. Se realiza incisión lineal y dos orificios de trépano, con apertura dural en cruz. Se constata hematoma líquido de color achocolatado con salida del contenido a presión y membranas subdurales. Se realiza lavado del espacio subdural a través de los orificios de trépano con solución fisiológica tibia hasta obtener retorno claro, y al finalizar la evacuación se constata reexpansión cerebral parcial. Se deja drenaje subdural a caída libre. Se realiza cierre por planos. No se registran complicaciones intraoperatorias'
  },

  // 16. Colocación de drenaje ventricular externo
  {
    id: 'nc-dve',
    n: 'Colocación de drenaje ventricular externo',
    sp: 'Neurocirugía',
    sub: 'Hidrocefalia',
    v: 1,
    ctx: 'Derivación externa de LCR o monitoreo de presión intracraneana por hidrocefalia aguda, hemorragia intraventricular, hipertensión endocraneana o infección del sistema derivativo. Puede realizarse en quirófano o en la cabecera del paciente',
    lat: true,
    f: [
      { id: 'amb', l: 'Ámbito', sec: 'B', k: 'opt', o: [
        ['Quirófano', 'Procedimiento realizado en quirófano'],
        ['Cabecera en UCI', 'Procedimiento realizado en la cabecera del paciente en unidad de cuidados intensivos'],
        ['Shock room', 'Procedimiento realizado en sala de emergencias']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Supino, cabeza neutra elevada', 'Paciente en decúbito supino con cabeza en posición neutra y elevada a 30 grados'],
        ['Supino, cabeza en herradura', 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura'],
        ['Supino, cabeza fijada', 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines'],
        ['Prono / lateral (entrada posterior)', 'Paciente en decúbito lateral con cabeza fijada para acceso posterior']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', p: 'Se indica colocación de drenaje ventricular externo por {v}', o: [
        ['Hidrocefalia aguda', 'hidrocefalia aguda'],
        ['Hemorragia intraventricular', 'hemorragia intraventricular'],
        ['HSA con hidrocefalia', 'hemorragia subaracnoidea con hidrocefalia'],
        ['Monitoreo de PIC', 'necesidad de monitoreo de presión intracraneana'],
        ['Hipertensión endocraneana', 'hipertensión endocraneana'],
        ['Infección de sistema derivativo', 'infección de sistema derivativo'],
        ['Disfunción valvular', 'disfunción de sistema derivativo'],
        ['Drenaje perioperatorio de LCR', 'necesidad de drenaje perioperatorio de LCR']
      ] },
      { id: 'entr', l: 'Punto de entrada', sec: 'B', k: 'opt', o: ENTR_VENT, p: 'Acceso {v}', req: 1 },
      { id: 'tre', l: 'Trepanación', sec: 'B', k: 'opt', p: 'Se realiza {v}', o: [
        ['Orificio de trépano', 'orificio de trépano'],
        ['Broca fina (twist drill)', 'trepanación con broca de pequeño calibre']
      ] },
      { id: 'guia', l: 'Técnica de punción', sec: 'B', k: 'opt', o: GUIA_VENT, p: 'Punción ventricular {v}' },
      { id: 'npas', l: 'Número de pasajes', sec: 'C', k: 'num', p: 'Se realizan {v} pasajes para la canalización ventricular' },
      { id: 'aplcr', l: 'Salida de LCR', sec: 'C', k: 'opt', o: [
        ['A presión elevada', 'Se obtiene salida de LCR a presión elevada'],
        ['Sin presión aumentada', 'Se obtiene salida de LCR sin presión aumentada'],
        ['Sin salida inmediata', 'No se obtiene salida inmediata de LCR']
      ] },
      { id: 'pap', l: 'Presión de apertura', sec: 'C', k: 'num', u: 'cmH₂O', p: 'Presión de apertura de {v} cmH₂O' },
      { id: 'lcra', l: 'Aspecto del LCR', sec: 'C', k: 'opt', o: LCR_ASP, p: 'LCR de aspecto {v}' },
      { id: 'prof', l: 'Profundidad de inserción', sec: 'D', k: 'num', u: 'cm', p: 'Catéter introducido hasta {v} cm desde la tabla externa' },
      { id: 'conf', l: 'Confirmación de colocación', sec: 'D', k: 'multi', p: 'Se confirma la posición intraventricular del catéter por {v}', o: [
        ['Salida de LCR', 'salida de LCR'],
        ['Neuronavegación', 'neuronavegación'],
        ['Ecografía', 'ecografía'],
        ['Endoscopía', 'visión endoscópica'],
        ['TC intraoperatoria', 'TC intraoperatoria']
      ] },
      { id: 'tun', l: 'Tunelización', sec: 'D', k: 'yn', y: 'Se realiza tunelización subcutánea del catéter', n: 'No se realiza tunelización subcutánea del catéter' },
      { id: 'tunl', l: 'Longitud del túnel', sec: 'D', k: 'num', u: 'cm', if: ['tun', 'si'], p: 'Túnel subcutáneo de {v} cm' },
      { id: 'cat', l: 'Catéter', sec: 'E', k: 'opt', o: CAT_VENT },
      { id: 'sist', l: 'Sistema de drenaje', sec: 'E', k: 'opt', o: [
        ['Cerrado con cámara de goteo', 'Se conecta a sistema de drenaje cerrado con cámara de goteo y bolsa colectora'],
        ['Cerrado con sensor de PIC', 'Se conecta a sistema de drenaje cerrado con transductor de presión intracraneana']
      ] },
      { id: 'pic', l: 'Sensor de PIC asociado', sec: 'E', k: 'yn', y: 'Se coloca sensor de presión intracraneana asociado', n: 'No se coloca sensor de presión intracraneana' },
      { id: 'mlcr', l: 'Muestra de LCR', sec: 'F', k: 'yn', y: 'Se toma muestra de LCR', n: 'No se toma muestra de LCR' },
      { id: 'mlcrd', l: 'Destino de la muestra', sec: 'F', k: 'multi', if: ['mlcr', 'si'], p: 'Se envía muestra de LCR para {v}', o: [
        ['Citoquímico', 'estudio citoquímico'],
        ['Cultivo', 'cultivo'],
        ['Gram', 'tinción de Gram'],
        ['Citología', 'citología']
      ] },
      { id: 'fij', l: 'Fijación', sec: 'G', k: 'multi', p: 'Se fija el catéter con {v}', o: [
        ['Bolsa de tabaco', 'punto en bolsa de tabaco en el sitio de salida'],
        ['Puntos a piel', 'puntos de fijación a piel'],
        ['Fijación en espiral', 'fijación en espiral sobre el cuero cabelludo'],
        ['Apósito transparente', 'apósito transparente']
      ] },
      { id: 'estd', l: 'Estado del sistema', sec: 'H', k: 'opt', o: [
        ['Abierto', 'Se deja el sistema abierto'],
        ['Cerrado', 'Se deja el sistema cerrado'],
        ['Abierto intermitente', 'Se deja el sistema para drenaje intermitente']
      ] },
      { id: 'nivel', l: 'Nivel indicado', sec: 'H', k: 'num', u: 'cmH₂O', p: 'Nivel de drenaje indicado a {v} cmH₂O sobre el conducto auditivo externo' }
    ],
    pasos: [
      'Se realiza tricotomía y marcación del punto de entrada {entr}',
      'Se realiza infiltración con anestésico local',
      'Se realiza incisión cutánea lineal hasta plano óseo',
      'Se realiza {tre}',
      'Se realiza coagulación y apertura de la duramadre',
      'Se realiza punción ventricular {guia}, con trayectoria dirigida al foramen de Monro',
      'Se retira el mandril y se avanza el catéter',
      'Se conecta el catéter al sistema de drenaje',
      'Se realiza cierre de la incisión'
    ],
    ej: 'Procedimiento realizado en quirófano. Paciente en decúbito supino con cabeza en posición neutra y elevada a 30 grados. Se realiza incisión cutánea lineal en punto de Kocher derecho y orificio de trépano, con coagulación y apertura de la duramadre. Se realiza punción ventricular según reparos anatómicos en un pasaje, con salida de LCR a presión elevada, de aspecto hemático. Se realiza tunelización subcutánea del catéter, que se fija con punto en bolsa de tabaco y puntos de fijación a piel, y se conecta a sistema de drenaje cerrado con cámara de goteo. Se deja el sistema abierto, con nivel indicado a 15 cmH₂O sobre el conducto auditivo externo. No se registran complicaciones'
  },

  // 17. Derivación ventriculoperitoneal
  {
    id: 'nc-dvp',
    n: 'Derivación ventriculoperitoneal',
    sp: 'Neurocirugía',
    sub: 'Hidrocefalia',
    v: 1,
    ctx: 'Derivación interna de LCR por hidrocefalia comunicante u obstructiva no pasible de tratamiento endoscópico, o recambio de sistema disfuncionante. Involucra abordaje craneal, trayecto subcutáneo y abordaje abdominal',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Supino, cabeza rotada con realce', 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y realce bajo el hombro homolateral'],
        ['Supino, cabeza rotada fijada', 'Paciente en decúbito supino con cabeza rotada y fijada en cabezal de tres pines'],
        ['Lateral', 'Paciente en decúbito lateral']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', p: 'Se indica derivación ventriculoperitoneal por {v}', o: [
        ['Hidrocefalia comunicante', 'hidrocefalia comunicante'],
        ['Hidrocefalia obstructiva', 'hidrocefalia obstructiva'],
        ['Hidrocefalia normotensiva', 'hidrocefalia normotensiva'],
        ['Posthemorrágica', 'hidrocefalia posthemorrágica'],
        ['Postinfecciosa', 'hidrocefalia postinfecciosa'],
        ['Dependencia de DVE', 'dependencia de drenaje ventricular externo'],
        ['Disfunción de sistema previo', 'disfunción de sistema derivativo previo']
      ] },
      { id: 'acra', l: 'Abordaje craneal', sec: 'B', k: 'opt', p: 'Abordaje craneal {v}', req: 1, o: [
        ['Frontal (Kocher)', 'frontal en punto de Kocher'],
        ['Parietooccipital (Frazier)', 'parietooccipital en punto de Frazier'],
        ['Parietal posterior (Keen)', 'parietal posterior en punto de Keen'],
        ['Occipital (Dandy)', 'occipital en punto de Dandy']
      ] },
      { id: 'guia', l: 'Técnica de punción', sec: 'B', k: 'opt', o: GUIA_VENT, p: 'Punción ventricular {v}' },
      { id: 'aabd', l: 'Abordaje abdominal', sec: 'B', k: 'opt', p: 'Se accede a la cavidad peritoneal {v}', o: [
        ['Minilaparotomía paraumbilical', 'mediante minilaparotomía paraumbilical'],
        ['Minilaparotomía subcostal', 'mediante minilaparotomía subcostal'],
        ['Minilaparotomía en línea media', 'mediante minilaparotomía supraumbilical en línea media'],
        ['Laparoscópico', 'por vía laparoscópica'],
        ['Trocar percutáneo', 'mediante trocar percutáneo']
      ] },
      { id: 'lcra', l: 'Aspecto del LCR', sec: 'C', k: 'opt', o: LCR_ASP, p: 'Se obtiene LCR de aspecto {v}' },
      { id: 'pap', l: 'Presión de apertura', sec: 'C', k: 'num', u: 'cmH₂O', p: 'Presión de apertura de {v} cmH₂O' },
      { id: 'hdvp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Catéter previo obstruido', 'catéter ventricular previo obstruido'],
        ['Válvula previa disfuncionante', 'válvula previa sin flujo'],
        ['Catéter distal previo desconectado', 'desconexión del catéter distal previo'],
        ['Adherencias peritoneales', 'adherencias peritoneales'],
        ['Seudoquiste abdominal', 'seudoquiste abdominal de LCR']
      ] },
      { id: 'catv', l: 'Catéter ventricular', sec: 'E', k: 'opt', o: CAT_VENT },
      { id: 'catvl', l: 'Longitud del catéter ventricular', sec: 'E', k: 'num', u: 'cm', p: 'Catéter ventricular introducido {v} cm desde la tabla externa' },
      { id: 'valv', l: 'Válvula', sec: 'E', k: 'opt', p: 'Se implanta {v}', o: [
        ['Presión fija baja', 'válvula de presión fija baja'],
        ['Presión fija media', 'válvula de presión fija media'],
        ['Presión fija alta', 'válvula de presión fija alta'],
        ['Programable', 'válvula programable'],
        ['Programable con antisifón', 'válvula programable con dispositivo antisifón'],
        ['Con unidad gravitacional', 'válvula con unidad gravitacional'],
        ['Programable con unidad gravitacional', 'válvula programable con unidad gravitacional']
      ] },
      { id: 'vaj', l: 'Ajuste de la válvula', sec: 'E', k: 'text', p: 'Válvula ajustada en {v}', ph: '120 mmH₂O / nivel indicado' },
      { id: 'vloc', l: 'Ubicación de la válvula', sec: 'E', k: 'opt', p: 'Válvula ubicada en región {v}', o: [
        ['Retroauricular', 'retroauricular'],
        ['Parietal', 'parietal'],
        ['Frontal', 'frontal'],
        ['Infraclavicular', 'infraclavicular']
      ] },
      { id: 'cdis', l: 'Catéter distal', sec: 'E', k: 'opt', o: [
        ['Silicona estándar', 'Se utiliza catéter distal de silicona estándar'],
        ['Impregnado en antibiótico', 'Se utiliza catéter distal impregnado en antibiótico'],
        ['Impregnado en plata', 'Se utiliza catéter distal impregnado en plata'],
        ['Sistema preensamblado', 'Se utiliza sistema valvular preensamblado con catéter distal']
      ] },
      { id: 'cdisl', l: 'Longitud intraperitoneal', sec: 'E', k: 'num', u: 'cm', p: 'Se dejan {v} cm de catéter distal en cavidad peritoneal' },
      { id: 'tray', l: 'Trayecto', sec: 'D', k: 'opt', p: 'Se tuneliza el catéter distal por trayecto {v}', o: [
        ['Retroauricular, cervical y torácico', 'subcutáneo retroauricular, cervical lateral y torácico anterior'],
        ['En dos tiempos con incisión intermedia', 'subcutáneo en dos tiempos con incisión torácica intermedia']
      ] },
      { id: 'pdist', l: 'Posición distal', sec: 'D', k: 'opt', o: [
        ['Cavidad peritoneal libre', 'Se introduce el extremo distal en cavidad peritoneal libre'],
        ['Bajo visión laparoscópica', 'Se introduce el extremo distal en cavidad peritoneal bajo visión laparoscópica'],
        ['Espacio suprahepático', 'Se ubica el extremo distal en espacio suprahepático bajo visión laparoscópica']
      ] },
      { id: 'func', l: 'Confirmación de funcionamiento', sec: 'D', k: 'multi', p: 'Se constata {v}', o: [
        ['Goteo espontáneo distal', 'goteo espontáneo de LCR por el extremo distal'],
        ['Llenado del reservorio', 'llenado del reservorio tras su compresión'],
        ['Flujo previo a la conexión', 'flujo de LCR por el catéter ventricular previo a la conexión'],
        ['Ausencia de goteo distal', 'ausencia de goteo espontáneo por el extremo distal']
      ] },
      { id: 'retir', l: 'Retiro de material previo', sec: 'D', k: 'multi', p: 'Se retira {v}', o: [
        ['Catéter ventricular previo', 'catéter ventricular previo'],
        ['Válvula previa', 'válvula previa'],
        ['Catéter distal previo', 'catéter distal previo'],
        ['DVE', 'drenaje ventricular externo']
      ] },
      { id: 'mlcr', l: 'Muestra de LCR', sec: 'F', k: 'yn', y: 'Se toma muestra de LCR para estudio', n: 'No se toma muestra de LCR' }
    ],
    pasos: [
      'Se realiza marcación de las incisiones craneal, retroauricular y abdominal',
      'Se realiza incisión cutánea craneal y orificio de trépano',
      'Se realiza confección del bolsillo subgaleal para la válvula',
      'Se realiza tunelización subcutánea con pasador por trayecto {tray}',
      'Se accede a la cavidad peritoneal {aabd}',
      'Se realiza coagulación y apertura de la duramadre',
      'Se realiza punción ventricular {guia} y colocación del catéter ventricular',
      'Se conecta el catéter ventricular a la válvula',
      'Se aseguran las conexiones con ligaduras',
      'Se introduce el catéter distal en la cavidad peritoneal',
      'Se realiza cierre del peritoneo y de la aponeurosis'
    ],
    ej: 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y realce bajo el hombro homolateral. Se realiza abordaje craneal parietooccipital en punto de Frazier derecho y punción ventricular guiada por neuronavegación, con obtención de LCR de aspecto cristalino. Se implanta válvula programable con dispositivo antisifón, ubicada en región retroauricular, ajustada en 120 mmH₂O. Se tuneliza el catéter distal por trayecto subcutáneo retroauricular, cervical lateral y torácico anterior, y se accede a la cavidad peritoneal mediante minilaparotomía paraumbilical. Se constata goteo espontáneo de LCR por el extremo distal, que se introduce en cavidad peritoneal libre. Se realiza cierre por planos. No se registran complicaciones intraoperatorias'
  },

  // 18. Laminectomía y descompresión espinal
  {
    id: 'nc-lam',
    n: 'Laminectomía y descompresión espinal',
    sp: 'Neurocirugía',
    sub: 'Columna',
    v: 1,
    ctx: 'Descompresión del canal raquídeo por estenosis degenerativa, quiste sinovial, lesión epidural u otra compresión medular o radicular, por vía posterior. Los niveles intervenidos son obligatorios',
    lat: false,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_COLUMNA },
      { id: 'niv', l: 'Niveles', sec: 'B', k: 'multi', o: VERT, p: 'Se interviene a nivel de {v}', req: 1 },
      { id: 'marca', l: 'Identificación del nivel', sec: 'B', k: 'opt', o: MARCA_NIVEL, p: 'Se identifica el nivel {v}' },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', o: [
        ['Posterior por línea media', 'posterior por línea media'],
        ['Posterior paramediano', 'posterior paramediano'],
        ['Unilateral con descompresión bilateral', 'posterior unilateral con descompresión bilateral'],
        ['Tubular mínimamente invasivo', 'mínimamente invasivo con retractor tubular'],
        ['Endoscópico', 'endoscópico']
      ] },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], o: MNIO_ESP, p: 'Se monitorean {v}' },
      { id: 'hesp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Hipertrofia del ligamento amarillo', 'hipertrofia del ligamento amarillo'],
        ['Hipertrofia facetaria', 'hipertrofia facetaria'],
        ['Estenosis central', 'estenosis del canal central'],
        ['Estenosis del receso lateral', 'estenosis del receso lateral'],
        ['Estenosis foraminal', 'estenosis foraminal'],
        ['Quiste sinovial', 'quiste sinovial facetario'],
        ['Hernia discal', 'hernia discal'],
        ['Osificación del LLP', 'osificación del ligamento longitudinal posterior'],
        ['Osificación del ligamento amarillo', 'osificación del ligamento amarillo'],
        ['Fibrosis epidural', 'fibrosis epidural'],
        ['Lesión epidural', 'lesión epidural'],
        ['Lipomatosis epidural', 'lipomatosis epidural'],
        ['Compresión del saco dural', 'compresión del saco dural'],
        ['Saco sin pulsatilidad', 'saco dural sin pulsatilidad'],
        ['Inestabilidad', 'movilidad anormal del segmento']
      ] },
      { id: 'desc', l: 'Descompresión realizada', sec: 'D', k: 'multi', p: 'Se realiza {v}', req: 1, o: [
        ['Laminectomía', 'laminectomía'],
        ['Hemilaminectomía', 'hemilaminectomía'],
        ['Laminotomía', 'laminotomía'],
        ['Laminoplastia', 'laminoplastia'],
        ['Flavectomía', 'flavectomía'],
        ['Foraminotomía', 'foraminotomía'],
        ['Facetectomía medial', 'facetectomía medial'],
        ['Descompresión del receso lateral', 'descompresión del receso lateral'],
        ['Descompresión contralateral (undercutting)', 'descompresión contralateral por debajo de la apófisis espinosa'],
        ['Resección de quiste sinovial', 'resección de quiste sinovial'],
        ['Resección de lesión epidural', 'resección de lesión epidural']
      ] },
      { id: 'estt', l: 'Estructuras tratadas', sec: 'D', k: 'multi', p: 'Se libera {v}', o: [
        ['Saco dural', 'el saco dural'],
        ['Médula espinal', 'la médula espinal'],
        ['Cono medular', 'el cono medular'],
        ['Cola de caballo', 'la cola de caballo'],
        ['Raíces emergentes', 'las raíces emergentes'],
        ['Raíces transitantes', 'las raíces transitantes']
      ] },
      { id: 'raiz', l: 'Raíces liberadas', sec: 'D', k: 'text', p: 'Se identifican y liberan las raíces {v}', ph: 'L5 bilaterales' },
      { id: 'exto', l: 'Extensión de resección ósea', sec: 'D', k: 'opt', o: [
        ['Preservación facetaria', 'Se preservan las articulaciones facetarias'],
        ['Facetectomía medial parcial', 'Se reseca menos de la mitad medial de las facetas'],
        ['Facetectomía de más de la mitad', 'Se reseca más de la mitad de las facetas'],
        ['Facetectomía total', 'Se realiza facetectomía total'],
        ['Preservación de la pars', 'Se preserva la pars interarticularis']
      ] },
      { id: 'disco', l: 'Tratamiento discal', sec: 'D', k: 'multi', o: [...DISC_C, ...DISC_L], p: 'Se realiza discectomía asociada en {v}' },
      { id: 'durot', l: 'Durotomía incidental', sec: 'D', k: 'yn', y: 'Se produce durotomía incidental', n: 'No se produce durotomía incidental' },
      { id: 'durotr', l: 'Reparación de durotomía', sec: 'D', k: 'opt', if: ['durot', 'si'], o: DUROT_REP, p: 'Se repara la durotomía con {v}' },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], o: MNIO_RES },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_COLUMNA, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza marcación del nivel {marca}',
      'Se realiza incisión cutánea sobre la línea media',
      'Se realiza apertura de la fascia y disección subperióstica de la musculatura paravertebral',
      'Se coloca separador autoestático',
      'Se realiza control radioscópico del nivel expuesto',
      'Se realiza resección de las apófisis espinosas',
      'Se realiza resección ósea con fresado de alta velocidad y pinzas de Kerrison',
      'Se realiza resección del ligamento amarillo',
      'Se realiza exploración de los forámenes con sonda roma'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se identifica el nivel mediante radioscopía y se realiza abordaje posterior por línea media. Se interviene a nivel de L3, L4 y L5. Se constata hipertrofia del ligamento amarillo, hipertrofia facetaria y compresión del saco dural. Se realiza laminectomía, flavectomía y foraminotomía, y se preservan las articulaciones facetarias. Se identifican y liberan las raíces L4 y L5 bilaterales. No se produce durotomía incidental. Se deja drenaje subfascial aspirativo y se realiza cierre por planos'
  },

  // 19. Discectomía cervical o lumbar
  {
    id: 'nc-disc',
    n: 'Discectomía cervical o lumbar',
    sp: 'Neurocirugía',
    sub: 'Columna',
    v: 1,
    ctx: 'Discectomía cervical por vía anterior, con o sin artrodesis o prótesis, o discectomía lumbar abierta por vía posterior. Los pasos sugeridos incluyen ambas variantes: confirmar solo los que correspondan',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_COLUMNA },
      { id: 'niv', l: 'Nivel', sec: 'B', k: 'multi', o: [...DISC_C, ...DISC_L], p: 'Se interviene el nivel {v}', req: 1 },
      { id: 'marca', l: 'Identificación del nivel', sec: 'B', k: 'opt', o: MARCA_NIVEL, p: 'Se identifica el nivel {v}' },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', req: 1, o: [
        ['Cervical anterior (Smith-Robinson)', 'cervical anterior anteromedial'],
        ['Cervical posterior', 'cervical posterior con foraminotomía'],
        ['Lumbar posterior interlaminar', 'lumbar posterior interlaminar'],
        ['Lumbar extraforaminal', 'lumbar paramediano extraforaminal'],
        ['Lumbar transforaminal', 'lumbar transforaminal']
      ] },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'hdisc', l: 'Hallazgos discales', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Protrusión', 'protrusión discal'],
        ['Hernia contenida', 'hernia discal contenida'],
        ['Extrusión', 'hernia discal extruida'],
        ['Secuestro', 'fragmento discal secuestrado'],
        ['Hernia blanda', 'hernia discal blanda'],
        ['Complejo disco-osteofitario', 'complejo disco-osteofitario'],
        ['Osteofitos posteriores', 'osteofitos posteriores'],
        ['Rotura del LLP', 'rotura del ligamento longitudinal posterior'],
        ['Disco degenerado', 'disco degenerado con pérdida de altura'],
        ['Compresión radicular', 'compresión radicular'],
        ['Compresión medular', 'compresión medular']
      ] },
      { id: 'mdisc', l: 'Material discal extraído', sec: 'D', k: 'opt', o: [
        ['Discectomía completa', 'Se realiza discectomía completa del espacio'],
        ['Solo material herniado', 'Se extrae el material discal herniado'],
        ['Fragmento secuestrado', 'Se extrae fragmento discal secuestrado'],
        ['Múltiples fragmentos', 'Se extraen múltiples fragmentos de material discal']
      ] },
      { id: 'llp', l: 'Ligamento longitudinal posterior', sec: 'D', k: 'yn', y: 'Se realiza apertura y resección del ligamento longitudinal posterior', n: 'Se preserva el ligamento longitudinal posterior' },
      { id: 'osteo', l: 'Resección de osteofitos', sec: 'D', k: 'yn', y: 'Se realiza resección de osteofitos posteriores', n: 'No se realiza resección de osteofitos' },
      { id: 'dneu', l: 'Descompresión neural', sec: 'D', k: 'multi', p: 'Se realiza descompresión de {v}', o: [
        ['Saco dural', 'el saco dural'],
        ['Médula cervical', 'la médula cervical'],
        ['Raíz emergente', 'la raíz emergente'],
        ['Raíz transitante', 'la raíz transitante'],
        ['Ambas raíces del nivel', 'ambas raíces del nivel']
      ] },
      { id: 'raiz', l: 'Raíz identificada', sec: 'D', k: 'text', p: 'Se identifica y protege la raíz {v}', ph: 'C6 derecha / L5 izquierda' },
      { id: 'durot', l: 'Durotomía incidental', sec: 'D', k: 'yn', y: 'Se produce durotomía incidental', n: 'No se produce durotomía incidental' },
      { id: 'durotr', l: 'Reparación de durotomía', sec: 'D', k: 'opt', if: ['durot', 'si'], o: DUROT_REP, p: 'Se repara la durotomía con {v}' },
      { id: 'ctrl', l: 'Control de posición', sec: 'D', k: 'opt', o: [
        ['Radioscopía', 'Se realiza control radioscópico de la posición del implante'],
        ['Radiografía intraoperatoria', 'Se realiza control con radiografía intraoperatoria de la posición del implante'],
        ['Navegación', 'Se realiza control de la posición del implante por navegación']
      ] },
      { id: 'impl', l: 'Implante', sec: 'E', k: 'opt', o: [
        ['Cage intersomático', 'Se coloca dispositivo intersomático'],
        ['Prótesis discal', 'Se coloca prótesis discal'],
        ['Injerto óseo estructural', 'Se coloca injerto óseo estructural intersomático'],
        ['Sin implante', 'No se coloca implante intersomático']
      ] },
      { id: 'cmat', l: 'Material del cage', sec: 'E', k: 'opt', o: CAGE_MAT, p: 'Dispositivo intersomático {v}' },
      { id: 'calt', l: 'Altura del implante', sec: 'E', k: 'num', u: 'mm', p: 'Implante de {v} mm de altura' },
      { id: 'crel', l: 'Relleno del cage', sec: 'E', k: 'multi', o: INJ, p: 'Se rellena el dispositivo con {v}' },
      { id: 'fij', l: 'Fijación', sec: 'E', k: 'opt', o: [
        ['Placa cervical anterior', 'Se realiza fijación con placa cervical anterior y tornillos'],
        ['Fijación integrada al cage', 'Se fija el dispositivo con tornillos o anclajes integrados'],
        ['Sin fijación adicional', 'No se realiza fijación adicional']
      ] },
      { id: 'ntor', l: 'Número de tornillos', sec: 'E', k: 'num', p: 'Se colocan {v} tornillos' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_COLUMNA, p: 'Se deja drenaje {v}' },
      { id: 'collar', l: 'Collar cervical', sec: 'H', k: 'yn', y: 'Se coloca collar cervical', n: 'No se coloca collar cervical' }
    ],
    pasos: [
      'Se realiza marcación del nivel {marca}',
      'Se realiza incisión cutánea transversa cervical y sección del platisma',
      'Se realiza disección entre el paquete vasculonervioso carotídeo y el eje visceral hasta la cara anterior de la columna',
      'Se realiza control radioscópico del nivel con aguja espinal',
      'Se realiza incisión cutánea lumbar y disección subperióstica de la musculatura paravertebral',
      'Se realiza flavectomía interlaminar y retracción medial de la raíz',
      'Se colocan separadores autoestáticos',
      'Se colocan pines de distracción intervertebral',
      'Se incorpora microscopio quirúrgico',
      'Se realiza anulotomía y discectomía con pinzas y curetas',
      'Se realiza preparación de los platillos vertebrales con fresado',
      'Se realiza medición del espacio con implantes de prueba'
    ],
    ej: 'Paciente en decúbito supino con rodete interescapular y cuello en leve extensión. Se identifica el nivel mediante radioscopía y se realiza abordaje cervical anterior anteromedial derecho, interviniendo el nivel C5-C6. Se constata hernia discal extruida con compresión radicular. Se realiza discectomía completa del espacio con apertura y resección del ligamento longitudinal posterior, y descompresión de la raíz emergente y del saco dural. Se coloca dispositivo intersomático de PEEK de 6 mm de altura, relleno con sustituto óseo sintético, y se realiza control radioscópico de la posición del implante. No se deja drenaje. Se realiza cierre por planos'
  },

  // 20. Artrodesis vertebral e instrumentación
  {
    id: 'nc-art',
    n: 'Artrodesis vertebral e instrumentación',
    sp: 'Neurocirugía',
    sub: 'Columna',
    v: 1,
    ctx: 'Fijación y fusión vertebral por inestabilidad, espondilolistesis, fractura, deformidad o tras descompresión extensa. Abordaje posterior, anterior, lateral o combinado',
    lat: false,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_COLUMNA },
      { id: 'niv', l: 'Niveles instrumentados', sec: 'B', k: 'multi', o: [...VERT, ['S2', 'S2'], ['Ilíaco', 'el ilíaco']], p: 'Se instrumentan {v}', req: 1 },
      { id: 'marca', l: 'Identificación del nivel', sec: 'B', k: 'opt', o: MARCA_NIVEL, p: 'Se identifica el nivel {v}' },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', o: [
        ['Posterior por línea media', 'posterior por línea media'],
        ['Posterior paramediano (Wiltse)', 'posterior paramediano de Wiltse'],
        ['Posterior percutáneo', 'posterior percutáneo'],
        ['Anterior cervical', 'cervical anterior'],
        ['Anterior retroperitoneal', 'anterior retroperitoneal'],
        ['Lateral transpsoas', 'lateral transpsoas'],
        ['Oblicuo prepsoas', 'oblicuo prepsoas'],
        ['Combinado anterior y posterior', 'combinado anterior y posterior']
      ] },
      { id: 'nav', l: 'Navegación', sec: 'B', k: 'yn', y: 'Se utiliza navegación intraoperatoria', n: 'No se utiliza navegación intraoperatoria' },
      { id: 'navt', l: 'Tipo de navegación', sec: 'B', k: 'opt', if: ['nav', 'si'], p: 'Navegación basada en {v}', o: [
        ['TC intraoperatoria', 'TC intraoperatoria'],
        ['Fluoroscopía 3D', 'fluoroscopía tridimensional'],
        ['TC preoperatoria', 'TC preoperatoria con registro sobre superficie ósea']
      ] },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], o: MNIO_ESP, p: 'Se monitorean {v}' },
      { id: 'hesp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Inestabilidad segmentaria', 'movilidad anormal del segmento'],
        ['Espondilolistesis', 'espondilolistesis'],
        ['Lisis ístmica', 'lisis ístmica'],
        ['Fractura vertebral', 'fractura vertebral'],
        ['Lesión ligamentaria posterior', 'lesión del complejo ligamentario posterior'],
        ['Deformidad', 'deformidad'],
        ['Calidad ósea disminuida', 'calidad ósea disminuida'],
        ['Calidad ósea conservada', 'calidad ósea conservada'],
        ['Fusión previa', 'fusión ósea previa'],
        ['Material previo', 'material de osteosíntesis previo'],
        ['Seudoartrosis', 'seudoartrosis']
      ] },
      { id: 'descas', l: 'Descompresión asociada', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Laminectomía', 'laminectomía'],
        ['Facetectomía', 'facetectomía'],
        ['Foraminotomía', 'foraminotomía'],
        ['Discectomía', 'discectomía'],
        ['Corpectomía', 'corpectomía'],
        ['Osteotomía de Smith-Petersen', 'osteotomía de Smith-Petersen'],
        ['Osteotomía de sustracción pedicular', 'osteotomía de sustracción pedicular']
      ] },
      { id: 'tins', l: 'Inserción de tornillos', sec: 'D', k: 'opt', p: 'Se insertan los tornillos {v}', o: [
        ['Manos libres', 'a mano libre según reparos anatómicos'],
        ['Guiada por radioscopía', 'bajo guía radioscópica'],
        ['Navegada', 'bajo navegación'],
        ['Percutánea', 'en forma percutánea bajo guía radioscópica'],
        ['Asistida por robot', 'con asistencia robótica']
      ] },
      { id: 'ints', l: 'Artrodesis intersomática', sec: 'D', k: 'opt', o: [
        ['TLIF', 'Se realiza artrodesis intersomática transforaminal'],
        ['PLIF', 'Se realiza artrodesis intersomática posterior'],
        ['ALIF', 'Se realiza artrodesis intersomática anterior'],
        ['Lateral', 'Se realiza artrodesis intersomática lateral'],
        ['Oblicua', 'Se realiza artrodesis intersomática oblicua'],
        ['Sin intersomática', 'No se realiza artrodesis intersomática']
      ] },
      { id: 'tart', l: 'Tipo de artrodesis', sec: 'D', k: 'multi', p: 'Se realiza artrodesis {v}', o: [
        ['Posterolateral', 'posterolateral'],
        ['Posterior', 'posterior interlaminar'],
        ['Intersomática', 'intersomática'],
        ['Occipitocervical', 'occipitocervical']
      ] },
      { id: 'decor', l: 'Decorticación', sec: 'D', k: 'yn', y: 'Se realiza decorticación del lecho de artrodesis', n: 'No se realiza decorticación' },
      { id: 'ctrl', l: 'Control de posición', sec: 'D', k: 'multi', p: 'Se realiza control de la posición de los implantes mediante {v}', o: [
        ['Radioscopía AP y lateral', 'radioscopía en proyecciones anteroposterior y lateral'],
        ['TC intraoperatoria', 'TC intraoperatoria'],
        ['Radiografía intraoperatoria', 'radiografía intraoperatoria'],
        ['Navegación', 'navegación'],
        ['Estimulación EMG de tornillos', 'estimulación electromiográfica de los tornillos']
      ] },
      { id: 'ctrlr', l: 'Resultado del control', sec: 'D', k: 'opt', o: [
        ['Implantes intrapediculares', 'Se constata ubicación intrapedicular de los tornillos en el control'],
        ['Recolocación de tornillos', 'Se recolocan tornillos a partir del control de posición'],
        ['Retiro de tornillo', 'Se retira tornillo a partir del control de posición']
      ] },
      { id: 'durot', l: 'Durotomía incidental', sec: 'D', k: 'yn', y: 'Se produce durotomía incidental', n: 'No se produce durotomía incidental' },
      { id: 'durotr', l: 'Reparación de durotomía', sec: 'D', k: 'opt', if: ['durot', 'si'], o: DUROT_REP, p: 'Se repara la durotomía con {v}' },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], o: MNIO_RES },
      { id: 'tfij', l: 'Técnica de fijación', sec: 'E', k: 'multi', p: 'Se realiza fijación con {v}', req: 1, o: [
        ['Tornillos pediculares', 'tornillos pediculares'],
        ['Tornillos de masa lateral', 'tornillos de masa lateral'],
        ['Trayectoria cortical', 'tornillos de trayectoria cortical'],
        ['Tornillos de pars C2', 'tornillos de pars de C2'],
        ['Tornillos translaminares', 'tornillos translaminares'],
        ['Tornillos transarticulares', 'tornillos transarticulares'],
        ['Placa occipital', 'placa occipital'],
        ['Tornillos ilíacos', 'tornillos ilíacos'],
        ['Tornillos S2-alar-ilíacos', 'tornillos S2-alar-ilíacos'],
        ['Ganchos laminares', 'ganchos laminares'],
        ['Placa anterior', 'placa anterior'],
        ['Tornillos cementados', 'tornillos aumentados con cemento']
      ] },
      { id: 'ntor', l: 'Número de tornillos', sec: 'E', k: 'num', p: 'Se colocan {v} tornillos' },
      { id: 'ttor', l: 'Medidas de tornillos', sec: 'E', k: 'text', p: 'Se utilizan tornillos de {v}', ph: '6,5 × 45 mm en L4 y 6,5 × 40 mm en L5' },
      { id: 'barr', l: 'Barras', sec: 'E', k: 'opt', o: [
        ['Dos de titanio', 'Se colocan dos barras de titanio'],
        ['Dos de cromo-cobalto', 'Se colocan dos barras de cromo-cobalto'],
        ['Barras múltiples', 'Se colocan barras múltiples']
      ] },
      { id: 'bdiam', l: 'Diámetro de barras', sec: 'E', k: 'num', u: 'mm', p: 'Barras de {v} mm de diámetro' },
      { id: 'conec', l: 'Conector transversal', sec: 'E', k: 'yn', y: 'Se coloca conector transversal', n: 'No se coloca conector transversal' },
      { id: 'cage', l: 'Dispositivo intersomático', sec: 'E', k: 'yn', y: 'Se coloca dispositivo intersomático', n: 'No se coloca dispositivo intersomático' },
      { id: 'cmat', l: 'Material del cage', sec: 'E', k: 'opt', if: ['cage', 'si'], o: CAGE_MAT, p: 'Dispositivo intersomático {v}' },
      { id: 'inj', l: 'Injerto', sec: 'E', k: 'multi', o: INJ, p: 'Se coloca {v} en el lecho de artrodesis' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_COLUMNA, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza marcación del nivel {marca}',
      'Se realiza incisión cutánea y apertura de la fascia',
      'Se realiza disección subperióstica hasta la base de las apófisis transversas',
      'Se identifican los puntos de entrada pediculares',
      'Se realiza preparación de los trayectos pediculares con punzón y sonda pedicular',
      'Se realiza palpación de las paredes de cada trayecto',
      'Se insertan los tornillos {tins}',
      'Se realiza preparación del espacio discal y colocación del dispositivo intersomático',
      'Se realiza contorneado y colocación de las barras',
      'Se realizan maniobras de compresión y distracción',
      'Se realiza ajuste final de los tornillos de bloqueo'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se identifica el nivel mediante radioscopía y se realiza abordaje posterior por línea media, con monitoreo de potenciales evocados motores y electromiografía libre. Se constata espondilolistesis con movilidad anormal del segmento. Se instrumentan L4 y L5 con tornillos pediculares insertados bajo guía radioscópica y se realiza artrodesis intersomática transforaminal con dispositivo intersomático de PEEK. Se colocan cuatro tornillos y dos barras de titanio, y se realiza control de la posición de los implantes mediante radioscopía en proyecciones anteroposterior y lateral. Se coloca autoinjerto óseo local en el lecho de artrodesis. No se produce durotomía incidental. Se deja drenaje subfascial aspirativo'
  },

  // 21. Microdiscectomía
  {
    id: 'nc-mdisc',
    n: 'Microdiscectomía',
    sp: 'Neurocirugía',
    sub: 'Columna',
    v: 1,
    ctx: 'Hernia discal lumbar con radiculopatía que requiere descompresión microquirúrgica de la raíz por vía interlaminar, tubular o extraforaminal. Nivel y lateralidad son obligatorios',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_LUMBAR },
      { id: 'niv', l: 'Nivel', sec: 'B', k: 'opt', o: DISC_L, p: 'Se interviene el nivel {v}', req: 1 },
      { id: 'marca', l: 'Identificación del nivel', sec: 'B', k: 'opt', o: MARCA_NIVEL, p: 'Se identifica el nivel {v}' },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', o: [
        ['Interlaminar microquirúrgico', 'interlaminar microquirúrgico'],
        ['Tubular', 'mínimamente invasivo con retractor tubular'],
        ['Extraforaminal (Wiltse)', 'extraforaminal paramediano de Wiltse'],
        ['Endoscópico interlaminar', 'endoscópico interlaminar'],
        ['Endoscópico transforaminal', 'endoscópico transforaminal']
      ] },
      { id: 'hdisc', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Hernia contenida', 'hernia discal contenida'],
        ['Hernia extruida', 'hernia discal extruida'],
        ['Secuestro', 'fragmento discal secuestrado'],
        ['Migración craneal', 'migración craneal del fragmento'],
        ['Migración caudal', 'migración caudal del fragmento'],
        ['Posterolateral', 'hernia de localización posterolateral'],
        ['Central', 'hernia de localización central'],
        ['Foraminal', 'hernia de localización foraminal'],
        ['Extraforaminal', 'hernia de localización extraforaminal'],
        ['Raíz edematosa', 'raíz edematosa'],
        ['Raíz desplazada', 'raíz desplazada'],
        ['Adherencias perirradiculares', 'adherencias perirradiculares'],
        ['Estenosis del receso asociada', 'estenosis del receso lateral asociada']
      ] },
      { id: 'raiz', l: 'Raíz', sec: 'D', k: 'text', p: 'Se identifica y protege la raíz {v}', ph: 'L5 izquierda' },
      { id: 'frag', l: 'Fragmento discal', sec: 'D', k: 'opt', o: [
        ['Fragmento único', 'Se extrae fragmento discal único'],
        ['Fragmento secuestrado', 'Se extrae fragmento discal secuestrado'],
        ['Múltiples fragmentos', 'Se extraen múltiples fragmentos discales'],
        ['Sin fragmento libre', 'No se identifica fragmento discal libre']
      ] },
      { id: 'anul', l: 'Manejo del anillo', sec: 'D', k: 'opt', o: [
        ['Anulotomía', 'Se realiza anulotomía y extracción de material discal intradiscal'],
        ['A través del defecto anular', 'Se extrae el material discal a través del defecto anular existente'],
        ['Sin acceso intradiscal', 'No se realiza extracción de material intradiscal']
      ] },
      { id: 'droot', l: 'Descompresión de la raíz', sec: 'D', k: 'opt', o: [
        ['Raíz libre y móvil', 'Al finalizar se constata raíz libre y con movilidad conservada'],
        ['Tensión radicular persistente', 'Al finalizar se constata persistencia de tensión radicular'],
        ['Foramen permeable a la sonda', 'Al finalizar se constata paso libre de la sonda roma por el foramen']
      ] },
      { id: 'durot', l: 'Durotomía incidental', sec: 'D', k: 'yn', y: 'Se produce durotomía incidental', n: 'No se produce durotomía incidental' },
      { id: 'durotr', l: 'Reparación de durotomía', sec: 'D', k: 'opt', if: ['durot', 'si'], o: DUROT_REP, p: 'Se repara la durotomía con {v}' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_COLUMNA, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza marcación del nivel {marca}',
      'Se realiza incisión cutánea paramediana',
      'Se realiza apertura de la fascia y disección subperióstica unilateral',
      'Se coloca separador',
      'Se realiza control radioscópico del nivel expuesto',
      'Se incorpora microscopio quirúrgico',
      'Se realiza laminotomía parcial y flavectomía',
      'Se identifican el saco dural y la raíz',
      'Se realiza retracción medial de la raíz',
      'Se realiza exploración del espacio epidural y del foramen con gancho romo'
    ],
    ej: 'Paciente en decúbito prono sobre almohadillas longitudinales con abdomen libre. Se identifica el nivel mediante radioscopía y se realiza abordaje interlaminar microquirúrgico izquierdo en L4-L5. Se realiza laminotomía parcial y flavectomía, y se identifica y protege la raíz L5 izquierda. Se constata hernia discal extruida de localización posterolateral con raíz desplazada. Se extrae fragmento discal secuestrado y se realiza anulotomía con extracción de material discal intradiscal. Al finalizar se constata raíz libre y con movilidad conservada. No se produce durotomía incidental. Se realiza cierre por planos'
  },

  // 22. Biopsia cerebral
  {
    id: 'nc-bx',
    n: 'Biopsia cerebral',
    sp: 'Neurocirugía',
    sub: 'Oncología',
    v: 1,
    ctx: 'Obtención de tejido para diagnóstico histológico de lesiones profundas, multifocales o no resecables, por técnica estereotáxica con marco, sin marco (navegada) o abierta',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', o: [...LOC_SUPRA, ['Tronco encefálico', 'en tronco encefálico'], ['Cerebelosa', 'cerebelosa']], p: 'Lesión objetivo de localización {v}', req: 1 },
      { id: 'obj', l: 'Lesión objetivo', sec: 'B', k: 'text', p: 'Se define como objetivo {v}', ph: 'el componente con realce de la lesión' },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', req: 1, o: [
        ['Estereotáxica con marco', 'Se realiza biopsia estereotáxica con marco'],
        ['Estereotáxica sin marco (navegada)', 'Se realiza biopsia estereotáxica sin marco guiada por neuronavegación'],
        ['Asistida por robot', 'Se realiza biopsia estereotáxica asistida por robot'],
        ['Abierta', 'Se realiza biopsia a cielo abierto mediante craneotomía'],
        ['Endoscópica', 'Se realiza biopsia endoscópica']
      ] },
      { id: 'nav', l: 'Sistema de navegación', sec: 'B', k: 'opt', o: [
        ['Navegación óptica', 'Se utiliza sistema de neuronavegación óptica'],
        ['Navegación electromagnética', 'Se utiliza sistema de neuronavegación electromagnética'],
        ['Marco estereotáctico', 'Se utiliza marco estereotáctico con cálculo de coordenadas']
      ] },
      { id: 'img', l: 'Imagen de planificación', sec: 'B', k: 'multi', p: 'Se realiza planificación sobre {v}', o: [
        ['RM con contraste', 'RM con contraste'],
        ['TC', 'TC'],
        ['Fusión RM-TC', 'fusión de RM y TC'],
        ['Perfusión / espectroscopía', 'secuencias de perfusión o espectroscopía'],
        ['PET', 'PET']
      ] },
      { id: 'tray', l: 'Trayectoria', sec: 'B', k: 'text', p: 'Se planifica trayectoria {v}', ph: 'frontal precoronal, evitando surcos y ventrículos' },
      { id: 'navx', l: 'Error de registro', sec: 'B', k: 'num', u: 'mm', p: 'Error de registro de {v} mm' },
      { id: 'hbx', l: 'Aspecto del tejido', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Aspecto patológico', 'tejido de aspecto patológico'],
        ['Aspecto necrótico', 'tejido de aspecto necrótico'],
        ['Aspecto gliótico', 'tejido de aspecto gliótico'],
        ['Material hemorrágico', 'material hemorrágico'],
        ['Contenido quístico', 'contenido quístico'],
        ['Contenido purulento', 'contenido purulento']
      ] },
      { id: 'sang', l: 'Sangrado por la cánula', sec: 'D', k: 'opt', o: [
        ['Sin sangrado', 'No se constata sangrado por la cánula al retirar el estilete'],
        ['Sangrado que cede', 'Se constata sangrado por la cánula, que cede con irrigación'],
        ['Sangrado persistente', 'Se constata sangrado persistente por la cánula']
      ] },
      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio intraoperatorio por congelación o extendido', n: 'No se realiza estudio intraoperatorio' },
      { id: 'congr', l: 'Informe intraoperatorio', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio intraoperatorio informa {v}', ph: 'transcribir lo informado por patología' }
    ],
    pasos: [
      'Se realiza colocación del marco estereotáctico bajo anestesia local',
      'Se realiza adquisición de imágenes y cálculo de coordenadas',
      'Se realiza registro del sistema de navegación',
      'Se realiza incisión cutánea y trepanación en el punto de entrada planificado',
      'Se realiza coagulación y apertura de la duramadre y de la piamadre',
      'Se introduce la aguja de biopsia hasta el objetivo',
      'Se realiza toma de muestras en distintos cuadrantes y profundidades',
      'Se retira la aguja de biopsia en forma progresiva'
    ],
    ej: 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines. Se realiza biopsia estereotáxica sin marco guiada por neuronavegación, con planificación sobre fusión de RM y TC y trayectoria frontal precoronal derecha. Se introduce la aguja de biopsia hasta el componente con realce de la lesión talámica derecha y se realiza toma de muestras en distintos cuadrantes y profundidades. Se constata tejido de aspecto patológico. No se constata sangrado por la cánula al retirar el estilete. Se obtienen cuatro muestras, que se envían a Anatomía Patológica. No se registran complicaciones intraoperatorias'
  },

  // 23. Cirugía de aneurisma cerebral
  {
    id: 'nc-aneu',
    n: 'Cirugía de aneurisma cerebral',
    sp: 'Neurocirugía',
    sub: 'Vascular',
    v: 1,
    ctx: 'Tratamiento microquirúrgico de aneurismas intracraneales rotos o no rotos, por clipado u otras técnicas. La exclusión completa solo se afirma si fue confirmada y por qué método',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'est', l: 'Estado del aneurisma', sec: 'B', k: 'opt', o: [
        ['Roto', 'Aneurisma roto'],
        ['No roto', 'Aneurisma no roto']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', p: 'Se interviene aneurisma {v}', req: 1, o: [
        ['Comunicante anterior', 'de arteria comunicante anterior'],
        ['Bifurcación de ACM', 'de la bifurcación de la arteria cerebral media'],
        ['ACM M1', 'del segmento M1 de la arteria cerebral media'],
        ['ACI-comunicante posterior', 'del segmento comunicante de la arteria carótida interna'],
        ['ACI-coroidea anterior', 'de la arteria coroidea anterior'],
        ['Bifurcación de ACI', 'de la bifurcación de la arteria carótida interna'],
        ['Oftálmico', 'oftálmico de la arteria carótida interna'],
        ['Pericallosa', 'de la arteria pericallosa'],
        ['ACA A1', 'del segmento A1 de la arteria cerebral anterior'],
        ['Punta de basilar', 'de la punta de la arteria basilar'],
        ['PICA', 'de la arteria cerebelosa posteroinferior'],
        ['Vertebral', 'de la arteria vertebral']
      ] },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', req: 1, o: [
        ['Pterional', 'pterional'],
        ['Minipterional', 'minipterional'],
        ['Orbitocigomático', 'orbitocigomático'],
        ['Supraorbitario', 'supraorbitario'],
        ['Interhemisférico', 'interhemisférico'],
        ['Subtemporal', 'subtemporal'],
        ['Retrosigmoideo', 'retrosigmoideo'],
        ['Far lateral', 'suboccipital lateral extremo']
      ] },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], o: MNIO_MOD, p: 'Se monitorean {v}' },
      { id: 'hsah', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['HSA en cisternas basales', 'hemorragia subaracnoidea en cisternas basales'],
        ['Coágulo silviano', 'coágulo en la cisura silviana'],
        ['Cerebro tenso', 'parénquima cerebral tenso'],
        ['Cerebro relajado', 'parénquima cerebral relajado'],
        ['Hematoma asociado', 'hematoma intraparenquimatoso asociado'],
        ['Vasoespasmo', 'vasoespasmo visible']
      ] },
      { id: 'morf', l: 'Morfología del aneurisma', sec: 'C', k: 'multi', p: 'Se constata aneurisma con {v}', o: [
        ['Cuello estrecho', 'cuello estrecho'],
        ['Cuello ancho', 'cuello ancho'],
        ['Multilobulado', 'saco multilobulado'],
        ['Vesícula apical', 'vesícula apical'],
        ['Pared aterosclerótica', 'pared aterosclerótica'],
        ['Cuello calcificado', 'calcificación del cuello'],
        ['Trombosis intrasacular', 'trombosis intrasacular'],
        ['Ramas desde el cuello', 'ramas que emergen del cuello'],
        ['Sitio de ruptura visible', 'sitio de ruptura identificable']
      ] },
      { id: 'cprox', l: 'Control proximal', sec: 'D', k: 'opt', o: [
        ['Intracraneal', 'Se obtiene control proximal intracraneal de la arteria portadora'],
        ['Cervical', 'Se realiza control proximal en arteria carótida cervical'],
        ['No obtenido', 'No se obtiene control proximal previo a la disección del aneurisma']
      ] },
      { id: 'ctemp', l: 'Clipado temporario', sec: 'D', k: 'yn', y: 'Se realiza clipado temporario de la arteria portadora', n: 'No se realiza clipado temporario' },
      { id: 'ttemp', l: 'Tiempo de clipado temporario', sec: 'D', k: 'num', u: 'min', if: ['ctemp', 'si'], p: 'Tiempo total de clipado temporario de {v} minutos' },
      { id: 'clip', l: 'Técnica realizada', sec: 'D', k: 'opt', p: 'Se realiza {v}', req: 1, o: [
        ['Clipado del cuello', 'clipado del cuello aneurismático'],
        ['Clipado con múltiples clips', 'clipado del cuello aneurismático con múltiples clips'],
        ['Clipado con remodelado', 'clipado con remodelación del cuello'],
        ['Reforzamiento (wrapping)', 'reforzamiento de la pared aneurismática'],
        ['Atrapamiento', 'atrapamiento del aneurisma'],
        ['Atrapamiento con bypass', 'atrapamiento del aneurisma con bypass'],
        ['Trombectomía y clipado', 'apertura del saco, trombectomía y clipado']
      ] },
      { id: 'rupt', l: 'Ruptura intraoperatoria', sec: 'D', k: 'yn', y: 'Se produce ruptura intraoperatoria del aneurisma', n: 'No se produce ruptura intraoperatoria del aneurisma' },
      { id: 'ruptm', l: 'Momento de la ruptura', sec: 'D', k: 'opt', if: ['rupt', 'si'], o: [
        ['Durante la exposición', 'La ruptura se produce durante la exposición'],
        ['Durante la disección', 'La ruptura se produce durante la disección del aneurisma'],
        ['Durante el clipado', 'La ruptura se produce durante la aplicación del clip']
      ] },
      { id: 'ctrl', l: 'Control intraoperatorio', sec: 'D', k: 'multi', p: 'Se realiza control intraoperatorio con {v}', o: [
        ['Videoangiografía con ICG', 'videoangiografía con verde de indocianina'],
        ['Videoangiografía con fluoresceína', 'videoangiografía con fluoresceína'],
        ['Doppler microvascular', 'Doppler microvascular'],
        ['Flujometría', 'flujometría'],
        ['Angiografía digital', 'angiografía digital intraoperatoria'],
        ['Punción del saco', 'punción y aspiración del saco aneurismático']
      ] },
      { id: 'repos', l: 'Reposicionamiento del clip', sec: 'D', k: 'yn', y: 'Se reposiciona el clip a partir del control intraoperatorio', n: 'No se requiere reposicionamiento del clip' },
      { id: 'excl', l: 'Exclusión del aneurisma', sec: 'D', k: 'opt', req: 1, ph: 'método de confirmación', o: [
        ['Exclusión completa confirmada por {d}', 'Se constata exclusión completa del aneurisma, confirmada por {d}'],
        ['Remanente de cuello', 'Se constata remanente de cuello aneurismático'],
        ['Exclusión incompleta', 'Se constata exclusión incompleta del aneurisma, con persistencia de relleno del saco'],
        ['Exclusión no confirmada', 'No se confirma exclusión completa del aneurisma']
      ] },
      { id: 'vasos', l: 'Estado de los vasos', sec: 'D', k: 'multi', p: 'Se constata {v}', o: [
        ['Portadora permeable', 'permeabilidad de la arteria portadora'],
        ['Ramas permeables', 'permeabilidad de las ramas distales'],
        ['Perforantes preservadas', 'preservación de las arterias perforantes visibles'],
        ['Compromiso de rama', 'compromiso de flujo en rama adyacente'],
        ['Oclusión de rama', 'oclusión de rama arterial']
      ] },
      { id: 'lterm', l: 'Fenestración de lámina terminalis', sec: 'D', k: 'yn', y: 'Se realiza fenestración de la lámina terminalis', n: 'No se realiza fenestración de la lámina terminalis' },
      { id: 'nclip', l: 'Número de clips', sec: 'E', k: 'num', p: 'Se colocan {v} clips definitivos' },
      { id: 'tclip', l: 'Tipo de clip', sec: 'E', k: 'multi', p: 'Se utiliza {v}', o: [
        ['Recto', 'clip recto'],
        ['Curvo', 'clip curvo'],
        ['Angulado', 'clip angulado'],
        ['Bayoneta', 'clip en bayoneta'],
        ['Fenestrado', 'clip fenestrado'],
        ['Mini clip', 'miniclip']
      ] },
      { id: 'dve', l: 'Drenaje ventricular externo', sec: 'E', k: 'yn', y: 'Se coloca drenaje ventricular externo', n: 'No se coloca drenaje ventricular externo' },
      { id: 'sus', l: 'Suspensión dural', sec: 'G', k: 'yn', y: 'Se realizan puntos de suspensión dural', n: 'No se realizan puntos de suspensión dural' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', o: CDUR, p: 'Se realiza {v}' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza incisión cutánea arciforme y disección interfascial del músculo temporal',
      'Se realiza craneotomía {abord}',
      'Se realiza fresado del ala menor del esfenoides',
      'Se realiza apertura dural en C',
      'Se incorpora microscopio quirúrgico',
      'Se realiza apertura de cisternas basales y drenaje de LCR',
      'Se realiza disección de la cisura silviana',
      'Se identifica la arteria portadora y se diseca el cuello aneurismático',
      'Se procede a {clip}',
      'Se realiza inspección de la arteria portadora, de las ramas y de las perforantes',
      'Se realiza lavado de las cisternas'
    ],
    ej: 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines. Se realiza abordaje pterional derecho para aneurisma no roto de la bifurcación de la arteria cerebral media. Se realiza apertura de cisternas basales y disección de la cisura silviana, y se obtiene control proximal intracraneal de la arteria portadora. Se constata aneurisma con cuello ancho. Se realiza clipado del cuello aneurismático con un clip fenestrado, sin clipado temporario. Se realiza control intraoperatorio con videoangiografía con verde de indocianina y se constata exclusión completa del aneurisma, confirmada por videoangiografía, con permeabilidad de la arteria portadora y de las ramas distales. No se produce ruptura intraoperatoria del aneurisma. Se realiza cierre dural primario con sutura continua y se repone el colgajo óseo'
  },

  // 24. Cirugía de fosa posterior
  {
    id: 'nc-fp',
    n: 'Cirugía de fosa posterior',
    sp: 'Neurocirugía',
    sub: 'Oncología',
    v: 1,
    ctx: 'Abordajes infratentoriales para resección de lesiones, evacuación de hematomas o infartos cerebelosos, descompresión de la unión craneocervical o descompresión microvascular. La lateralidad aplica en lesiones no mediales',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Prono, cabeza en flexión (Concorde)', 'Paciente en decúbito prono con cabeza en flexión y fijada en cabezal de tres pines'],
        ['Lateral (park-bench)', 'Paciente en decúbito lateral tipo park-bench con cabeza fijada en cabezal de tres pines'],
        ['Semisentado', 'Paciente en posición semisentada con cabeza en flexión y fijada en cabezal de tres pines'],
        ['Sentado', 'Paciente en posición sentada con cabeza fijada en cabezal de tres pines'],
        ['Supino, cabeza rotada', 'Paciente en decúbito supino con realce bajo el hombro y cabeza rotada hacia el lado contralateral, fijada en cabezal de tres pines']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', p: 'Se indica cirugía por {v}', o: [
        ['Lesión tumoral', 'lesión tumoral de fosa posterior'],
        ['Lesión del ángulo pontocerebeloso', 'lesión del ángulo pontocerebeloso'],
        ['Hematoma cerebeloso', 'hematoma cerebeloso'],
        ['Infarto cerebeloso', 'infarto cerebeloso con efecto de masa'],
        ['Malformación de Chiari', 'malformación de Chiari'],
        ['Conflicto neurovascular', 'conflicto neurovascular'],
        ['Malformación vascular', 'malformación vascular de fosa posterior'],
        ['Absceso', 'absceso de fosa posterior']
      ] },
      { id: 'loc', l: 'Localización de la lesión', sec: 'B', k: 'opt', p: 'Lesión de localización {v}', req: 1, o: [
        ['Vermis', 'vermiana'],
        ['Hemisferio cerebeloso', 'hemisférica cerebelosa'],
        ['Cuarto ventrículo', 'en el cuarto ventrículo'],
        ['Ángulo pontocerebeloso', 'en el ángulo pontocerebeloso'],
        ['Tronco encefálico', 'en tronco encefálico'],
        ['Unión craneocervical', 'en la unión craneocervical'],
        ['Foramen magno', 'en el foramen magno'],
        ['Región pineal', 'en la región pineal'],
        ['Clivus / petroclival', 'petroclival']
      ] },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', req: 1, o: [
        ['Suboccipital medial', 'suboccipital medial'],
        ['Retrosigmoideo', 'retrosigmoideo'],
        ['Telovelar', 'suboccipital medial telovelar'],
        ['Transvermiano', 'suboccipital medial transvermiano'],
        ['Supracerebeloso infratentorial', 'supracerebeloso infratentorial'],
        ['Far lateral', 'suboccipital lateral extremo'],
        ['Suboccipital lateral', 'suboccipital lateral']
      ] },
      { id: 'osea', l: 'Apertura ósea', sec: 'B', k: 'opt', o: [
        ['Craniectomía suboccipital', 'Se realiza craniectomía suboccipital'],
        ['Craneotomía suboccipital', 'Se realiza craneotomía suboccipital'],
        ['Craniectomía retrosigmoidea', 'Se realiza craniectomía retrosigmoidea'],
        ['Craneotomía retrosigmoidea', 'Se realiza craneotomía retrosigmoidea'],
        ['Craniectomía suboccipital y arco de C1', 'Se realiza craniectomía suboccipital y resección del arco posterior de C1']
      ] },
      { id: 'adur', l: 'Apertura dural', sec: 'B', k: 'opt', o: [
        ['En Y', 'Se realiza apertura dural en Y'],
        ['Lineal', 'Se realiza apertura dural lineal'],
        ['En C', 'Se realiza apertura dural en C con base hacia el seno sigmoideo'],
        ['Delaminación', 'Se realiza delaminación de la capa externa de la duramadre, sin apertura dural completa'],
        ['Sin apertura dural', 'No se realiza apertura dural']
      ] },
      { id: 'nav', l: 'Neuronavegación', sec: 'B', k: 'yn', y: 'Se utiliza neuronavegación', n: 'No se utiliza neuronavegación' },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], o: MNIO_MOD, p: 'Se monitorean {v}' },
      { id: 'dprec', l: 'Doppler precordial', sec: 'B', k: 'yn', y: 'Se utiliza Doppler precordial para detección de embolia aérea', n: 'No se utiliza Doppler precordial' },
      { id: 'hfp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Cerebelo tenso', 'cerebelo tenso'],
        ['Descenso amigdalino', 'descenso de las amígdalas cerebelosas'],
        ['Banda fibrosa atlantooccipital', 'banda fibrosa atlantooccipital'],
        ['Adherencias aracnoideas', 'adherencias aracnoideas'],
        ['Quiste con nódulo', 'lesión quística con nódulo mural'],
        ['Lesión sólida', 'lesión sólida'],
        ['Ocupa el cuarto ventrículo', 'lesión que ocupa el cuarto ventrículo'],
        ['Infiltra el piso del IV ventrículo', 'infiltración del piso del cuarto ventrículo'],
        ['Compresión del tronco', 'compresión del tronco encefálico'],
        ['Relación con pares craneales', 'íntima relación de la lesión con pares craneales'],
        ['Conflicto vascular', 'contacto vascular sobre el nervio craneal'],
        ['Hematoma', 'hematoma intraparenquimatoso cerebeloso'],
        ['Tejido infartado', 'tejido cerebeloso infartado'],
        ['Ventrículo dilatado', 'dilatación ventricular']
      ] },
      { id: 'procfp', l: 'Procedimiento realizado', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Resección de lesión', 'resección de la lesión'],
        ['Evacuación de hematoma', 'evacuación del hematoma'],
        ['Resección de tejido infartado', 'resección de tejido infartado'],
        ['Descompresión ósea', 'descompresión ósea suboccipital'],
        ['Sección de banda fibrosa', 'sección de la banda fibrosa atlantooccipital'],
        ['Coagulación de amígdalas', 'coagulación de las amígdalas cerebelosas'],
        ['Resección de amígdalas', 'resección subpial de las amígdalas cerebelosas'],
        ['Apertura del óbex', 'liberación del flujo de LCR a nivel del óbex'],
        ['Descompresión microvascular', 'descompresión microvascular con interposición de material entre vaso y nervio']
      ] },
      { id: 'ext', l: 'Extensión de resección', sec: 'D', k: 'opt', o: EXT_RES },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'adherido al piso del cuarto ventrículo' },
      { id: 'emb', l: 'Embolia aérea', sec: 'D', k: 'yn', y: 'Se constata embolia aérea venosa', n: 'No se constata embolia aérea' },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], o: MNIO_RES },
      { id: 'dve', l: 'Drenaje ventricular externo', sec: 'E', k: 'yn', y: 'Se coloca drenaje ventricular externo', n: 'No se coloca drenaje ventricular externo' },
      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio intraoperatorio por congelación', n: 'No se realiza estudio intraoperatorio por congelación' },
      { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'cdur', l: 'Manejo dural', sec: 'G', k: 'multi', o: CDUR, p: 'Se realiza {v}' },
      { id: 'mast', l: 'Celdas mastoideas', sec: 'G', k: 'yn', y: 'Se constata apertura de celdas mastoideas, que se sellan con cera ósea', n: 'No se constata apertura de celdas mastoideas' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: [
        ['Subfascial', 'subfascial'],
        ['Epidural', 'epidural'],
        ['Subcutáneo', 'subcutáneo']
      ], p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza incisión cutánea en línea media suboccipital',
      'Se realiza incisión cutánea retroauricular',
      'Se realiza disección de la musculatura suboccipital por planos',
      'Se identifican el seno transverso y el seno sigmoideo',
      'Se incorpora microscopio quirúrgico',
      'Se realiza apertura de la cisterna magna y drenaje de LCR',
      'Se realiza disección aracnoidea',
      'Se procede a la resección de la lesión con técnica microquirúrgica',
      'Se protege el piso del cuarto ventrículo con cotonoide',
      'Se realiza inspección del acueducto y del óbex'
    ],
    ej: 'Paciente en decúbito prono con cabeza en flexión y fijada en cabezal de tres pines. Se realiza abordaje suboccipital medial telovelar con craniectomía suboccipital y apertura dural en Y, con monitoreo de potenciales evocados motores y electromiografía de pares craneales. Se constata lesión sólida que ocupa el cuarto ventrículo. Se realiza apertura de la cisterna magna y drenaje de LCR, y se procede a la resección de la lesión con técnica microquirúrgica, protegiendo el piso del cuarto ventrículo con cotonoide. Se realiza resección completa macroscópica de la lesión. Se envían muestras a Anatomía Patológica. Se realiza duroplastia con injerto de pericráneo autólogo y refuerzo de la línea de sutura con sellante dural. No se registran complicaciones intraoperatorias'
  }
];
