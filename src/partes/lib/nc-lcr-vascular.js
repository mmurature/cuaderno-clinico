// Biblioteca de partes quirúrgicos · Neurocirugía · Hidrocefalia y LCR / Neurocirugía vascular (versión 2)
// Datos puros. Convención para campos citados en `pasos` con {id}: la frase de la opción es un fragmento que se
// inserta tal cual dentro del paso; `p` es el envoltorio que se usa cuando el campo se escribe por sí solo.
// Reemplaza a 'nc-dve', 'nc-dvp' y 'nc-aneu' de neurocirugia.js (mismos ids, ampliados).

// ---------- Fuentes ----------

const R_GREEN = 'Greenberg MS. Handbook of Neurosurgery, 10.ª ed. Thieme; 2023';
const R_YOUM = 'Winn HR (ed.). Youmans and Winn Neurological Surgery, 8.ª ed. Elsevier; 2022';
const R_RCS = 'Royal College of Surgeons of England. Good Surgical Practice; 2014 (contenido mínimo del parte operatorio)';
const R_EVD = 'Fried HI, Nathan BR, Rowe AS et al. The Insertion and Management of External Ventricular Drains: An Evidence-Based Consensus Statement (Neurocritical Care Society). Neurocrit Care 2016;24:61-81';
const R_HCRN = 'Kestle JRW et al. Reducing shunt infection: a standardized protocol (Hydrocephalus Clinical Research Network). J Neurosurg Pediatr 2011;8:22-29';
const R_ETV = 'Kulkarni AV et al. Endoscopic third ventriculostomy in the treatment of childhood hydrocephalus (ETV Success Score). J Pediatr 2009;155:254-259';
const R_HADAD = 'Hadad G, Bassagasteguy L, Carrau RL et al. A novel reconstructive technique after endoscopic expanded endonasal approaches: vascular pedicle nasoseptal flap. Laryngoscope 2006;116:1882-1886';
const R_RHOTON = 'Rhoton AL Jr. Cranial Anatomy and Surgical Approaches. Congress of Neurological Surgeons / Lippincott Williams & Wilkins; 2003';
const R_SAH = 'Hoh BL, Ko NU, Amin-Hanjani S et al. 2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage (AHA/ASA). Stroke 2023;54:e314-e370';
const R_UIA = 'Thompson BG et al. Guidelines for the Management of Patients With Unruptured Intracranial Aneurysms (AHA/ASA). Stroke 2015;46:2368-2400';
const R_LAWA = 'Lawton MT. Seven Aneurysms: Tenets and Techniques for Clipping. Thieme; 2011';
const R_LAWM = 'Lawton MT. Seven AVMs: Tenets and Techniques for Resection. Thieme; 2014';
const R_SM = 'Spetzler RF, Martin NA. A proposed grading system for arteriovenous malformations. J Neurosurg 1986;65:476-483';
const R_LY = 'Lawton MT, Kim H, McCulloch CE et al. A supplementary grading scale for selecting patients with brain arteriovenous malformations for surgery. Neurosurgery 2010;66:702-713';
const R_ICH = 'Greenberg SM, Ziai WC, Cordonnier C et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage (AHA/ASA). Stroke 2022;53:e282-e361';
const R_BARKER = 'Barker FG 2nd, Jannetta PJ, Bissonette DJ et al. The long-term outcome of microvascular decompression for trigeminal neuralgia. N Engl J Med 1996;334:1077-1083';
const refs = (...r) => r.join(' · ');

// ---------- Opciones compartidas (copiadas de neurocirugia.js, que no las exporta) ----------

const POS_CRANEO = [
  ['Supino, cabeza fijada en cabezal de tres pines', 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines'],
  ['Supino, cabeza rotada y fijada', 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines'],
  ['Supino, cabeza en extensión y fijada', 'Paciente en decúbito supino con cabeza en leve extensión y fijada en cabezal de tres pines'],
  ['Supino, cabeza en apoyo en herradura', 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura'],
  ['Lateral (park-bench)', 'Paciente en decúbito lateral tipo park-bench con cabeza fijada en cabezal de tres pines'],
  ['Prono, cabeza fijada', 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines'],
  ['Semisentado', 'Paciente en posición semisentada con cabeza fijada en cabezal de tres pines']
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

const MNIO_RES = [
  ['Sin cambios', 'No se registran cambios en el monitoreo neurofisiológico durante el procedimiento'],
  ['Caída transitoria', 'Se registra caída transitoria de los potenciales, con recuperación durante el procedimiento'],
  ['Caída persistente', 'Se registra caída persistente de los potenciales al finalizar el procedimiento'],
  ['Pérdida de potenciales', 'Se registra pérdida de los potenciales']
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

const CDUR_DESC = [
  ['Primario', 'Se realiza cierre dural primario'],
  ['Duroplastia con sustituto', 'Se realiza duroplastia de ampliación con sustituto dural'],
  ['Duroplastia con pericráneo', 'Se realiza duroplastia de ampliación con injerto de pericráneo autólogo'],
  ['Sustituto dural sin sutura', 'Se coloca sustituto dural sobre el defecto, sin sutura'],
  ['Sin cierre dural', 'No se realiza cierre dural']
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

// ---------- Opciones propias de este archivo ----------

const MLCR_DEST = [
  ['Citoquímico', 'estudio citoquímico'],
  ['Cultivo', 'cultivo'],
  ['Gram', 'tinción de Gram'],
  ['Citología', 'citología']
];

const VALV_PROG = ['Programable', 'Programable con antisifón', 'Programable con unidad gravitacional'];
const VALV_GRAV = ['Con unidad gravitacional', 'Programable con unidad gravitacional'];
const DVP_REV = ['Revisión', 'Recambio completo'];

const ANEU_LOC = [
  ['Comunicante anterior', 'de arteria comunicante anterior'],
  ['ACA A1', 'del segmento A1 de la arteria cerebral anterior'],
  ['Pericallosa', 'de la arteria pericallosa'],
  ['Bifurcación de ACM', 'de la bifurcación de la arteria cerebral media'],
  ['ACM M1', 'del segmento M1 de la arteria cerebral media'],
  ['ACM distal', 'distal de la arteria cerebral media'],
  ['ACI-comunicante posterior', 'del segmento comunicante de la arteria carótida interna'],
  ['ACI-coroidea anterior', 'de la arteria coroidea anterior'],
  ['Bifurcación de ACI', 'de la bifurcación de la arteria carótida interna'],
  ['Oftálmico / paraclinoideo', 'oftálmico o paraclinoideo de la arteria carótida interna'],
  ['Hipofisario superior', 'de la arteria hipofisaria superior'],
  ['Punta de basilar', 'de la punta de la arteria basilar'],
  ['Cerebelosa superior', 'de la arteria cerebelosa superior'],
  ['Cerebral posterior', 'de la arteria cerebral posterior'],
  ['PICA', 'de la arteria cerebelosa posteroinferior'],
  ['Vertebral', 'de la arteria vertebral']
];

const GRADO_I_V = [['I', 'I'], ['II', 'II'], ['III', 'III'], ['IV', 'IV'], ['V', 'V']];

const PIC_T = [
  ['Intraparenquimatoso', 'Se coloca sensor de presión intracraneana intraparenquimatoso'],
  ['Intraventricular', 'Se coloca sensor de presión intracraneana intraventricular'],
  ['Subdural', 'Se coloca sensor de presión intracraneana subdural']
];

const REEXP = [
  ['Pulsátil', 'Al finalizar la evacuación se constata parénquima cerebral pulsátil'],
  ['Relajado', 'Al finalizar la evacuación se constata parénquima cerebral relajado'],
  ['Cerebro tenso', 'Al finalizar la evacuación se constata parénquima cerebral tenso'],
  ['Protrusión por el defecto', 'Al finalizar la evacuación se constata protrusión del parénquima a través del defecto óseo']
];

// ---------- Plantillas ----------

export default [
  // ===================== Hidrocefalia y líquido cefalorraquídeo =====================

  // Colocación de drenaje ventricular externo
  {
    id: 'nc-dve',
    n: 'Colocación de drenaje ventricular externo (DVE)',
    sp: 'Neurocirugía',
    sub: 'Hidrocefalia',
    cat: 'Hidrocefalia y líquido cefalorraquídeo',
    syn: ['DVE', 'ventriculostomía', 'drenaje ventricular', 'EVD', 'catéter ventricular externo', 'punción ventricular'],
    ref: refs(R_EVD, R_GREEN, R_YOUM, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Derivación externa de LCR o monitoreo de presión intracraneana por hidrocefalia aguda, hemorragia intraventricular, hipertensión endocraneana o infección del sistema derivativo. Puede realizarse en quirófano o en la cabecera del paciente. La ubicación del catéter solo se da por verificada si se documenta el método',
    lat: true,
    hide: ['dren', 'dtipo'],
    noReq: ['dren'],
    f: [
      { id: 'amb', l: 'Ámbito', sec: 'B', k: 'opt', q: 1, o: [
        ['Quirófano', 'Procedimiento realizado en quirófano'],
        ['Cabecera en UCI', 'Procedimiento realizado en la cabecera del paciente en unidad de cuidados intensivos'],
        ['Shock room', 'Procedimiento realizado en sala de emergencias']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Supino, cabeza neutra elevada', 'Paciente en decúbito supino con cabeza en posición neutra y elevada a 30 grados'],
        ['Supino, cabeza en herradura', 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura'],
        ['Supino, cabeza fijada', 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines'],
        ['Lateral (entrada posterior)', 'Paciente en decúbito lateral con cabeza fijada para acceso posterior']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', q: 1, p: 'Se indica colocación de drenaje ventricular externo por {v}', o: [
        ['Hidrocefalia aguda', 'hidrocefalia aguda'],
        ['Hemorragia intraventricular', 'hemorragia intraventricular'],
        ['HSA con hidrocefalia', 'hemorragia subaracnoidea con hidrocefalia'],
        ['Monitoreo de PIC', 'necesidad de monitoreo de presión intracraneana'],
        ['Hipertensión endocraneana', 'hipertensión endocraneana'],
        ['Infección de sistema derivativo', 'infección de sistema derivativo'],
        ['Disfunción valvular', 'disfunción de sistema derivativo'],
        ['Drenaje perioperatorio de LCR', 'necesidad de drenaje perioperatorio de LCR']
      ] },
      { id: 'entr', l: 'Punto de entrada', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: ENTR_VENT, p: 'Acceso {v}' },
      { id: 'guia', l: 'Técnica de punción', sec: 'B', k: 'opt', vr: 1, q: 1, o: GUIA_VENT, p: 'Punción ventricular {v}' },
      { id: 'tre', l: 'Trepanación', sec: 'B', k: 'opt', p: 'Se realiza {v}', o: [
        ['Orificio de trépano', 'orificio de trépano'],
        ['Broca fina (twist drill)', 'trepanación con broca de pequeño calibre']
      ] },
      { id: 'npas', l: 'Número de pasajes', sec: 'C', k: 'num', p: 'Se realizan {v} pasajes para la canalización ventricular' },
      { id: 'aplcr', l: 'Salida de LCR', sec: 'C', k: 'opt', o: [
        ['A presión elevada', 'Se obtiene salida de LCR a presión elevada'],
        ['Sin presión aumentada', 'Se obtiene salida de LCR sin presión aumentada'],
        ['Sin salida inmediata', 'No se obtiene salida inmediata de LCR']
      ] },
      { id: 'pap', l: 'Presión de apertura (si se midió)', sec: 'C', k: 'num', u: 'cmH₂O', p: 'Presión de apertura de {v} cmH₂O' },
      { id: 'lcra', l: 'Aspecto del LCR', sec: 'C', k: 'opt', q: 1, o: LCR_ASP, p: 'LCR de aspecto {v}' },
      { id: 'prof', l: 'Profundidad de inserción', sec: 'D', k: 'num', u: 'cm', q: 1, p: 'Catéter introducido hasta {v} cm desde la tabla externa' },
      { id: 'conf', l: 'Verificación de la ubicación del catéter', sec: 'D', k: 'opt', q: 1, req: 1, ph: 'salida de LCR y neuronavegación', o: [
        ['Salida de LCR', 'Se verifica la ubicación intraventricular del catéter por la salida de LCR'],
        ['Neuronavegación', 'Se verifica la ubicación del catéter mediante neuronavegación'],
        ['Ecografía', 'Se verifica la ubicación del catéter mediante ecografía intraoperatoria'],
        ['Visión endoscópica', 'Se verifica la ubicación del catéter bajo visión endoscópica'],
        ['TC intraoperatoria', 'Se verifica la ubicación del catéter mediante TC intraoperatoria'],
        ['Varios métodos ({d})', 'Se verifica la ubicación del catéter mediante {d}'],
        ['Sin verificación intraoperatoria', 'No se realiza verificación intraoperatoria de la ubicación del catéter']
      ] },
      { id: 'tun', l: 'Tunelización', sec: 'D', k: 'yn', y: 'Se realiza tunelización subcutánea del catéter', n: 'No se realiza tunelización subcutánea del catéter' },
      { id: 'tunl', l: 'Longitud del túnel', sec: 'D', k: 'num', u: 'cm', if: ['tun', 'si'], p: 'Túnel subcutáneo de {v} cm' },
      { id: 'cat', l: 'Catéter', sec: 'E', k: 'opt', q: 1, o: CAT_VENT },
      { id: 'sist', l: 'Sistema de drenaje', sec: 'E', k: 'opt', o: [
        ['Cerrado con cámara de goteo', 'Se conecta a sistema de drenaje cerrado con cámara de goteo y bolsa colectora'],
        ['Cerrado con transductor de PIC', 'Se conecta a sistema de drenaje cerrado con transductor de presión intracraneana']
      ] },
      { id: 'pic', l: 'Sensor de PIC asociado', sec: 'E', k: 'yn', y: 'Se coloca sensor de presión intracraneana asociado', n: 'No se coloca sensor de presión intracraneana asociado' },
      { id: 'mlcr', l: 'Muestra de LCR', sec: 'F', k: 'yn', y: 'Se toma muestra de LCR', n: 'No se toma muestra de LCR' },
      { id: 'mlcrd', l: 'Destino de la muestra', sec: 'F', k: 'multi', if: ['mlcr', 'si'], p: 'Se envía muestra de LCR para {v}', o: MLCR_DEST },
      { id: 'fij', l: 'Fijación', sec: 'G', k: 'multi', p: 'Se fija el catéter con {v}', o: [
        ['Bolsa de tabaco', 'punto en bolsa de tabaco en el sitio de salida'],
        ['Puntos a piel', 'puntos de fijación a piel'],
        ['Fijación en espiral', 'fijación en espiral sobre el cuero cabelludo'],
        ['Apósito transparente', 'apósito transparente']
      ] },
      { id: 'estd', l: 'Estado del sistema', sec: 'H', k: 'opt', q: 1, o: [
        ['Abierto', 'Se deja el sistema abierto'],
        ['Cerrado', 'Se deja el sistema cerrado'],
        ['Abierto intermitente', 'Se deja el sistema para drenaje intermitente']
      ] },
      { id: 'nivel', l: 'Nivel indicado', sec: 'H', k: 'num', u: 'cmH₂O', q: 1, p: 'Nivel de drenaje indicado a {v} cmH₂O sobre el conducto auditivo externo' }
    ],
    pasos: [
      'Se realiza tricotomía y marcación del punto de entrada {entr}',
      { t: 'Se realiza registro de neuronavegación y planificación de la trayectoria', if: ['guia', 'Neuronavegación'] },
      'Se realiza infiltración con anestésico local',
      'Se realiza incisión cutánea lineal hasta plano óseo',
      'Se realiza {tre}',
      'Se realiza coagulación y apertura de la duramadre',
      { t: 'Se realiza punción ventricular con trayectoria dirigida al canto interno del ojo homolateral en el plano coronal y al conducto auditivo externo en el plano sagital', if: ['entr', 'Kocher'] },
      { t: 'Se realiza punción ventricular con trayectoria según los reparos del punto de entrada', ifn: ['entr', 'Kocher'] },
      { t: 'Se realiza punción ventricular bajo guía ecográfica a través del orificio de trépano', if: ['guia', 'Ecografía'] },
      'Se retira el mandril y se avanza el catéter',
      { t: 'Se tuneliza el catéter por vía subcutánea hasta un sitio de salida alejado de la incisión', if: ['tun', 'si'] },
      'Se conecta el catéter al sistema de drenaje',
      'Se realiza cierre de la incisión'
    ],
    ej: 'Procedimiento realizado en quirófano. Paciente en decúbito supino con cabeza en posición neutra y elevada a 30 grados. Se realiza incisión cutánea lineal en punto de Kocher derecho y orificio de trépano, con coagulación y apertura de la duramadre. Se realiza punción ventricular según reparos anatómicos en un pasaje, con salida de LCR a presión elevada, de aspecto hemático, y presión de apertura de 28 cmH₂O. Catéter impregnado en antibiótico introducido hasta 6 cm desde la tabla externa. Se verifica la ubicación intraventricular del catéter por la salida de LCR. Se realiza tunelización subcutánea del catéter, que se fija con punto en bolsa de tabaco y puntos de fijación a piel, y se conecta a sistema de drenaje cerrado con cámara de goteo. Se deja el sistema abierto, con nivel indicado a 15 cmH₂O sobre el conducto auditivo externo. No se registran complicaciones intraoperatorias'
  },

  // Retiro de drenaje ventricular externo
  {
    id: 'nc-dver',
    n: 'Retiro de DVE',
    sp: 'Neurocirugía',
    sub: 'Hidrocefalia',
    cat: 'Hidrocefalia y líquido cefalorraquídeo',
    syn: ['retiro de drenaje ventricular externo', 'extracción de DVE', 'retiro de ventriculostomía', 'EVD removal'],
    ref: refs(R_EVD, R_GREEN, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Retiro de drenaje ventricular externo por resolución de la indicación, infección, disfunción o conversión a derivación interna. La integridad del catéter y la ausencia de fuga solo se escriben si se constataron',
    lat: true,
    hide: ['dren', 'dtipo'],
    noReq: ['dren'],
    f: [
      { id: 'amb', l: 'Ámbito', sec: 'B', k: 'opt', q: 1, o: [
        ['Quirófano', 'Procedimiento realizado en quirófano'],
        ['Cabecera en UCI', 'Procedimiento realizado en la cabecera del paciente en unidad de cuidados intensivos'],
        ['Sala general', 'Procedimiento realizado en la cabecera del paciente en sala general']
      ] },
      { id: 'indic', l: 'Motivo del retiro', sec: 'B', k: 'opt', q: 1, p: 'Se indica retiro del drenaje ventricular externo por {v}', o: [
        ['Resolución de la indicación', 'resolución de la indicación que motivó su colocación'],
        ['Infección asociada', 'infección asociada al drenaje'],
        ['Disfunción del catéter', 'disfunción del catéter'],
        ['Conversión a derivación interna', 'conversión a derivación interna de LCR'],
        ['Desplazamiento del catéter', 'desplazamiento del catéter']
      ] },
      { id: 'dperm', l: 'Días de permanencia', sec: 'B', k: 'num', u: 'días', p: 'Drenaje con {v} días de permanencia' },
      { id: 'pcie', l: 'Prueba de cierre previa', sec: 'B', k: 'opt', o: [
        ['Realizada', 'El retiro se realiza luego de prueba de cierre del drenaje documentada en la historia clínica'],
        ['No realizada', 'El retiro se realiza sin prueba de cierre previa']
      ] },
      { id: 'mlcr', l: 'Muestra de LCR previa al retiro', sec: 'F', k: 'yn', y: 'Se toma muestra de LCR antes del retiro', n: 'No se toma muestra de LCR' },
      { id: 'mlcrd', l: 'Destino de la muestra', sec: 'F', k: 'multi', if: ['mlcr', 'si'], p: 'Se envía muestra de LCR para {v}', o: MLCR_DEST },
      { id: 'punta', l: 'Cultivo de la punta del catéter', sec: 'F', k: 'yn', y: 'Se envía punta del catéter a cultivo', n: 'No se envía punta del catéter a cultivo' },
      { id: 'integ', l: 'Integridad del catéter retirado', sec: 'D', k: 'opt', q: 1, req: 1, ph: 'descripción', o: [
        ['Íntegro', 'Se constata la integridad del catéter retirado en toda su longitud'],
        ['Resistencia al retiro', 'Se constata resistencia al retiro del catéter ({d})'],
        ['Fragmento retenido', 'Se constata retención de un fragmento del catéter ({d})']
      ] },
      { id: 'ccie', l: 'Cierre del orificio', sec: 'G', k: 'opt', q: 1, p: 'Se cierra el orificio de salida con {v}', o: [
        ['Bolsa de tabaco', 'el punto en bolsa de tabaco'],
        ['Puntos separados', 'puntos separados'],
        ['Agrafe', 'agrafe'],
        ['Adhesivo tisular', 'adhesivo tisular']
      ] },
      { id: 'fuga', l: 'Fuga de LCR al finalizar', sec: 'G', k: 'opt', ph: 'descripción y conducta', o: [
        ['Sin fuga constatada', 'No se constata salida de LCR por el orificio al finalizar'],
        ['Fuga constatada', 'Se constata salida de LCR por el orificio de salida ({d})']
      ] }
    ],
    pasos: [
      'Se cierra el sistema y se desconecta el catéter del circuito de drenaje',
      'Se realiza antisepsia del sitio de salida y del trayecto del catéter',
      { t: 'Se toma muestra de LCR desde el puerto proximal del sistema', if: ['mlcr', 'si'] },
      'Se retiran los puntos de fijación',
      'Se retira el catéter con tracción suave y continua',
      'Se inspecciona el catéter retirado en toda su longitud',
      { t: 'Se secciona la punta del catéter con instrumental estéril para cultivo', if: ['punta', 'si'] },
      'Se cierra el orificio de salida con {ccie}',
      'Se coloca apósito oclusivo'
    ],
    ej: 'Procedimiento realizado en la cabecera del paciente en unidad de cuidados intensivos. Se indica retiro del drenaje ventricular externo por resolución de la indicación que motivó su colocación. Drenaje con 9 días de permanencia. El retiro se realiza luego de prueba de cierre del drenaje documentada en la historia clínica. Se retira el catéter con tracción suave y continua y se inspecciona en toda su longitud. Se constata la integridad del catéter retirado en toda su longitud. Se envía punta del catéter a cultivo. Se cierra el orificio de salida con el punto en bolsa de tabaco y se coloca apósito oclusivo. No se constata salida de LCR por el orificio al finalizar. Sin complicaciones intraoperatorias'
  },

  // Derivación ventriculoperitoneal (primaria, revisión, recambio)
  {
    id: 'nc-dvp',
    n: 'Colocación de derivación ventriculoperitoneal (DVP)',
    sp: 'Neurocirugía',
    sub: 'Hidrocefalia',
    cat: 'Hidrocefalia y líquido cefalorraquídeo',
    syn: ['DVP', 'derivación ventrículo peritoneal', 'válvula de derivación', 'shunt', 'VP shunt', 'colocación de válvula'],
    ref: refs(R_HCRN, R_GREEN, R_YOUM, R_RCS),
    rev: '2026-10',
    v: 2,
    def: { tipo: 'Primaria' },
    ctx: 'Derivación interna de LCR por hidrocefalia comunicante u obstructiva no pasible de tratamiento endoscópico, o revisión y recambio de un sistema disfuncionante. Involucra abordaje craneal, trayecto subcutáneo y abordaje abdominal. El funcionamiento del sistema solo se describe con los hallazgos constatados; el ajuste de una válvula programable es obligatorio',
    lat: true,
    f: [
      { id: 'tipo', l: 'Tipo de procedimiento', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [
        ['Primaria', 'Se realiza colocación primaria de derivación ventriculoperitoneal'],
        ['Revisión', 'Se realiza revisión de sistema de derivación ventriculoperitoneal'],
        ['Recambio completo', 'Se realiza recambio completo de sistema de derivación ventriculoperitoneal']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Supino, cabeza rotada con realce', 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y realce bajo el hombro homolateral'],
        ['Supino, cabeza rotada fijada', 'Paciente en decúbito supino con cabeza rotada y fijada en cabezal de tres pines'],
        ['Lateral', 'Paciente en decúbito lateral']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', q: 1, p: 'Se indica el procedimiento por {v}', o: [
        ['Hidrocefalia comunicante', 'hidrocefalia comunicante'],
        ['Hidrocefalia obstructiva', 'hidrocefalia obstructiva'],
        ['Hidrocefalia normotensiva', 'hidrocefalia normotensiva'],
        ['Posthemorrágica', 'hidrocefalia posthemorrágica'],
        ['Postinfecciosa', 'hidrocefalia postinfecciosa'],
        ['Dependencia de DVE', 'dependencia de drenaje ventricular externo'],
        ['Disfunción proximal', 'sospecha de disfunción proximal del sistema'],
        ['Disfunción distal', 'sospecha de disfunción distal del sistema'],
        ['Disfunción valvular', 'sospecha de disfunción de la válvula'],
        ['Sobredrenaje', 'sobredrenaje del sistema']
      ] },
      { id: 'acra', l: 'Abordaje craneal', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Abordaje craneal {v}', o: [
        ['Frontal (Kocher)', 'frontal en punto de Kocher'],
        ['Parietooccipital (Frazier)', 'parietooccipital en punto de Frazier'],
        ['Parietal posterior (Keen)', 'parietal posterior en punto de Keen'],
        ['Occipital (Dandy)', 'occipital en punto de Dandy'],
        ['Por orificio previo', 'a través del orificio de trépano previo']
      ] },
      { id: 'guia', l: 'Técnica de punción', sec: 'B', k: 'opt', vr: 1, q: 1, o: GUIA_VENT, p: 'Punción ventricular {v}' },
      { id: 'aabd', l: 'Abordaje abdominal', sec: 'B', k: 'opt', vr: 1, p: 'Se accede a la cavidad peritoneal {v}', o: [
        ['Minilaparotomía paraumbilical', 'mediante minilaparotomía paraumbilical'],
        ['Minilaparotomía subcostal', 'mediante minilaparotomía subcostal'],
        ['Minilaparotomía en línea media', 'mediante minilaparotomía supraumbilical en línea media'],
        ['Laparoscópico', 'por vía laparoscópica'],
        ['Trocar percutáneo', 'mediante trocar percutáneo']
      ] },
      { id: 'lcra', l: 'Aspecto del LCR', sec: 'C', k: 'opt', q: 1, o: LCR_ASP, p: 'Se obtiene LCR de aspecto {v}' },
      { id: 'pap', l: 'Presión de apertura (si se midió)', sec: 'C', k: 'num', u: 'cmH₂O', p: 'Presión de apertura de {v} cmH₂O' },
      { id: 'comp', l: 'Componentes explorados', sec: 'C', k: 'multi', if: ['tipo', DVP_REV], q: 1, p: 'Se exploran {v}', o: [
        ['Catéter ventricular', 'el catéter ventricular'],
        ['Válvula', 'la válvula'],
        ['Catéter distal', 'el catéter distal'],
        ['Conexiones', 'las conexiones del sistema']
      ] },
      { id: 'hdvp', l: 'Hallazgos del sistema', sec: 'C', k: 'multi', if: ['tipo', DVP_REV], q: 1, p: 'Se constata {v}', o: [
        ['Catéter ventricular sin flujo', 'ausencia de flujo espontáneo por el catéter ventricular'],
        ['Catéter ventricular con flujo', 'flujo espontáneo de LCR por el catéter ventricular'],
        ['Catéter ventricular obstruido por detritos', 'obstrucción del catéter ventricular por detritos o tejido'],
        ['Plexo coroideo adherido', 'plexo coroideo adherido al catéter ventricular'],
        ['Válvula sin flujo', 'ausencia de flujo a través de la válvula'],
        ['Catéter distal sin flujo', 'ausencia de flujo por el catéter distal'],
        ['Desconexión', 'desconexión entre componentes del sistema'],
        ['Fractura del catéter', 'fractura del catéter'],
        ['Migración del catéter distal', 'migración del catéter distal'],
        ['Adherencias peritoneales', 'adherencias peritoneales'],
        ['Seudoquiste abdominal', 'seudoquiste abdominal de LCR']
      ] },
      { id: 'retir', l: 'Material retirado', sec: 'D', k: 'multi', if: ['tipo', DVP_REV], p: 'Se retira {v}', o: [
        ['Catéter ventricular previo', 'el catéter ventricular previo'],
        ['Válvula previa', 'la válvula previa'],
        ['Catéter distal previo', 'el catéter distal previo'],
        ['DVE', 'el drenaje ventricular externo']
      ] },
      { id: 'reempl', l: 'Componentes nuevos colocados', sec: 'D', k: 'multi', if: ['tipo', DVP_REV], q: 1, p: 'Se colocan {v} nuevos', o: [
        ['Catéter ventricular', 'catéter ventricular'],
        ['Válvula', 'válvula'],
        ['Catéter distal', 'catéter distal'],
        ['Conectores', 'conectores']
      ] },
      { id: 'tray', l: 'Trayecto', sec: 'D', k: 'opt', p: 'Se tuneliza el catéter distal por trayecto {v}', o: [
        ['Retroauricular, cervical y torácico', 'subcutáneo retroauricular, cervical lateral y torácico anterior'],
        ['En dos tiempos con incisión intermedia', 'subcutáneo en dos tiempos con incisión torácica intermedia'],
        ['Trayecto previo', 'subcutáneo previo']
      ] },
      { id: 'pdist', l: 'Posición distal', sec: 'D', k: 'opt', o: [
        ['Cavidad peritoneal libre', 'Se introduce el extremo distal en cavidad peritoneal libre'],
        ['Bajo visión laparoscópica', 'Se introduce el extremo distal en cavidad peritoneal bajo visión laparoscópica'],
        ['Espacio suprahepático', 'Se ubica el extremo distal en espacio suprahepático bajo visión laparoscópica']
      ] },
      { id: 'func', l: 'Evaluación del flujo', sec: 'D', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Flujo por catéter ventricular', 'flujo de LCR por el catéter ventricular previo a la conexión'],
        ['Goteo espontáneo distal', 'goteo espontáneo de LCR por el extremo distal'],
        ['Llenado del reservorio', 'llenado del reservorio tras su compresión'],
        ['Ausencia de goteo distal', 'ausencia de goteo espontáneo por el extremo distal']
      ] },
      { id: 'catv', l: 'Catéter ventricular', sec: 'E', k: 'opt', o: CAT_VENT },
      { id: 'catvl', l: 'Longitud del catéter ventricular', sec: 'E', k: 'num', u: 'cm', q: 1, p: 'Catéter ventricular introducido {v} cm desde la tabla externa' },
      { id: 'valv', l: 'Válvula', sec: 'E', k: 'opt', q: 1, p: 'Se implanta {v}', o: [
        ['Presión fija baja', 'válvula de presión fija baja'],
        ['Presión fija media', 'válvula de presión fija media'],
        ['Presión fija alta', 'válvula de presión fija alta'],
        ['Programable', 'válvula programable'],
        ['Programable con antisifón', 'válvula programable con dispositivo antisifón'],
        ['Con unidad gravitacional', 'válvula de presión fija con unidad gravitacional'],
        ['Programable con unidad gravitacional', 'válvula programable con unidad gravitacional'],
        ['Se conserva la válvula previa', 'se conserva la válvula previa']
      ] },
      { id: 'vaj', l: 'Ajuste de la válvula programable', sec: 'E', k: 'text', if: ['valv', VALV_PROG], q: 1, req: 1, p: 'Válvula ajustada en {v}', ph: '120 mmH₂O' },
      { id: 'vver', l: 'Verificación del ajuste', sec: 'E', k: 'yn', if: ['valv', VALV_PROG], y: 'Se verifica el ajuste de la válvula con el dispositivo de lectura', n: 'No se verifica el ajuste de la válvula con dispositivo de lectura' },
      { id: 'vgrav', l: 'Presión de la unidad gravitacional', sec: 'E', k: 'text', if: ['valv', VALV_GRAV], p: 'Unidad gravitacional de {v}', ph: '20 cmH₂O' },
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
      { id: 'mlcr', l: 'Muestra de LCR', sec: 'F', k: 'yn', y: 'Se toma muestra de LCR', n: 'No se toma muestra de LCR' },
      { id: 'mlcrd', l: 'Destino de la muestra', sec: 'F', k: 'multi', if: ['mlcr', 'si'], p: 'Se envía muestra de LCR para {v}', o: MLCR_DEST },
      { id: 'cult', l: 'Cultivo del material retirado', sec: 'F', k: 'yn', if: ['tipo', DVP_REV], y: 'Se envía el material retirado a cultivo', n: 'No se envía el material retirado a cultivo' }
    ],
    pasos: [
      'Se realiza marcación de las incisiones craneal, retroauricular y abdominal',
      { t: 'Se realiza incisión cutánea craneal y orificio de trépano', if: ['tipo', 'Primaria'] },
      { t: 'Se realiza reapertura de la incisión craneal previa y exposición del sistema', if: ['tipo', DVP_REV] },
      { t: 'Se desconectan los componentes y se evalúa el flujo de cada uno', if: ['tipo', DVP_REV] },
      { t: 'Se retira el catéter ventricular previo con rotación y tracción suave', if: ['tipo', DVP_REV] },
      { t: 'Se realiza confección del bolsillo subgaleal para la válvula', ifn: ['tipo', 'Revisión'] },
      { t: 'Se realiza tunelización subcutánea con pasador por trayecto {tray}', ifn: ['tipo', 'Revisión'] },
      'Se accede a la cavidad peritoneal {aabd}',
      { t: 'Se realiza coagulación y apertura de la duramadre', if: ['tipo', 'Primaria'] },
      'Se realiza punción ventricular {guia} y colocación del catéter ventricular',
      'Se evalúa la salida de LCR por el catéter ventricular',
      { t: 'Se programa la válvula en {vaj}', if: ['valv', VALV_PROG] },
      'Se conecta el catéter ventricular a la válvula',
      'Se aseguran las conexiones con ligaduras',
      'Se evalúa el goteo de LCR por el extremo distal',
      'Se introduce el catéter distal en la cavidad peritoneal',
      'Se realiza cierre del peritoneo y de la aponeurosis'
    ],
    ej: 'Se realiza colocación primaria de derivación ventriculoperitoneal. Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y realce bajo el hombro homolateral. Abordaje craneal parietooccipital en punto de Frazier derecho y punción ventricular guiada por neuronavegación, con obtención de LCR de aspecto cristalino. Se implanta válvula programable con dispositivo antisifón, ubicada en región retroauricular, y se programa la válvula en 120 mmH₂O; se verifica el ajuste con el dispositivo de lectura. Se tuneliza el catéter distal por trayecto subcutáneo retroauricular, cervical lateral y torácico anterior, y se accede a la cavidad peritoneal mediante minilaparotomía paraumbilical. Se constata goteo espontáneo de LCR por el extremo distal, que se introduce en cavidad peritoneal libre. Se realiza cierre por planos. Sin complicaciones intraoperatorias'
  },

  // Revisión o recambio de DVP → variante de nc-dvp
  {
    id: 'nc-dvp-rev',
    n: 'Revisión o recambio de DVP',
    cat: 'Hidrocefalia y líquido cefalorraquídeo',
    syn: ['revisión valvular', 'recambio valvular', 'disfunción de DVP', 'revisión de shunt', 'recambio de sistema derivativo'],
    alias: 'nc-dvp',
    set: { tipo: 'Revisión' }
  },

  // Retiro de sistema de derivación
  {
    id: 'nc-shret',
    n: 'Retiro de sistema de derivación',
    sp: 'Neurocirugía',
    sub: 'Hidrocefalia',
    cat: 'Hidrocefalia y líquido cefalorraquídeo',
    syn: ['retiro de válvula', 'retiro de DVP', 'explante de derivación', 'extracción de sistema derivativo', 'shunt removal'],
    ref: refs(R_GREEN, R_YOUM, R_HCRN, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Retiro parcial o total de un sistema de derivación de LCR por infección, exposición del material, independencia de la derivación o conversión a drenaje externo. Los componentes que quedan in situ se documentan en forma explícita',
    lat: true,
    f: [
      { id: 'tsis', l: 'Tipo de sistema', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se interviene sistema de derivación {v}', o: [
        ['Ventriculoperitoneal', 'ventriculoperitoneal'],
        ['Ventriculoatrial', 'ventriculoatrial'],
        ['Ventriculopleural', 'ventriculopleural'],
        ['Lumboperitoneal', 'lumboperitoneal'],
        ['Quistoperitoneal', 'quistoperitoneal'],
        ['Subduroperitoneal', 'subduroperitoneal']
      ] },
      { id: 'indic', l: 'Motivo del retiro', sec: 'B', k: 'opt', q: 1, p: 'Se indica retiro del sistema por {v}', o: [
        ['Infección del sistema', 'infección del sistema derivativo'],
        ['Exposición del material', 'exposición del material a través de la piel'],
        ['Independencia de la derivación', 'independencia de la derivación'],
        ['Disfunción con conversión a DVE', 'disfunción del sistema, con conversión a drenaje ventricular externo'],
        ['Seudoquiste abdominal', 'seudoquiste abdominal de LCR'],
        ['Complicación abdominal', 'complicación abdominal asociada al catéter distal']
      ] },
      { id: 'lcra', l: 'Aspecto del LCR', sec: 'C', k: 'opt', o: LCR_ASP, p: 'Se obtiene LCR de aspecto {v}' },
      { id: 'pap', l: 'Presión de apertura (si se midió)', sec: 'C', k: 'num', u: 'cmH₂O', p: 'Presión de apertura de {v} cmH₂O' },
      { id: 'hret', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Material purulento en el trayecto', 'material purulento en el trayecto del sistema'],
        ['Cápsula fibrosa', 'cápsula fibrosa alrededor de los componentes'],
        ['Exposición del material', 'exposición del material a través de la piel'],
        ['Catéter fracturado', 'fractura del catéter'],
        ['Catéter ventricular adherido', 'adherencia del catéter ventricular al plexo coroideo o a la pared ventricular'],
        ['Seudoquiste abdominal', 'seudoquiste abdominal de LCR']
      ] },
      { id: 'comp', l: 'Componentes retirados', sec: 'D', k: 'multi', q: 1, req: 1, p: 'Se retira {v}', o: [
        ['Catéter ventricular', 'el catéter ventricular'],
        ['Válvula', 'la válvula'],
        ['Reservorio', 'el reservorio'],
        ['Catéter distal', 'el catéter distal'],
        ['Catéter lumbar', 'el catéter lumbar'],
        ['Conectores', 'los conectores']
      ] },
      { id: 'tret', l: 'Técnica de retiro del catéter ventricular', sec: 'D', k: 'opt', if: ['comp', 'Catéter ventricular'], o: [
        ['Tracción suave con rotación', 'con tracción suave y rotación'],
        ['Coagulación por estilete', 'con coagulación monopolar a través de estilete metálico introducido en el catéter'],
        ['Bajo visión endoscópica', 'bajo visión endoscópica']
      ] },
      { id: 'resto', l: 'Material que queda in situ', sec: 'D', k: 'opt', q: 1, req: 1, ph: 'qué componente y motivo', o: [
        ['Retiro total', 'Se retiran todos los componentes del sistema'],
        ['Catéter ventricular in situ', 'Se deja el catéter ventricular in situ ({d})'],
        ['Catéter distal in situ', 'Se deja el catéter distal in situ ({d})'],
        ['Fragmento retenido', 'Queda fragmento retenido del sistema ({d})']
      ] },
      { id: 'sang', l: 'Sangrado al retirar el catéter ventricular', sec: 'D', k: 'yn', if: ['comp', 'Catéter ventricular'], y: 'Se produce sangrado intraventricular al retirar el catéter', n: 'No se produce sangrado intraventricular al retirar el catéter' },
      { id: 'dve', l: 'DVE en el mismo acto', sec: 'E', k: 'yn', q: 1, y: 'Se coloca drenaje ventricular externo en el mismo acto', n: 'No se coloca drenaje ventricular externo' },
      { id: 'dvel', l: 'Ubicación del DVE', sec: 'E', k: 'text', if: ['dve', 'si'], p: 'Drenaje ventricular externo colocado {v}', ph: 'por nuevo orificio en punto de Kocher contralateral, tunelizado' },
      { id: 'cult', l: 'Material enviado a cultivo', sec: 'F', k: 'multi', p: 'Se envía a cultivo {v}', o: [
        ['LCR', 'LCR'],
        ['Catéter ventricular', 'el catéter ventricular'],
        ['Válvula', 'la válvula'],
        ['Catéter distal', 'el catéter distal'],
        ['Material del trayecto', 'material del trayecto']
      ] }
    ],
    pasos: [
      'Se realiza reapertura de la incisión craneal previa',
      'Se expone la válvula y se desconecta el sistema',
      { t: 'Se toma muestra de LCR desde el catéter ventricular', if: ['cult', 'LCR'] },
      { t: 'Se retira el catéter ventricular {tret}', if: ['comp', 'Catéter ventricular'] },
      { t: 'Se realiza incisión sobre el trayecto del catéter distal y se exterioriza el catéter', if: ['comp', 'Catéter distal'] },
      { t: 'Se retira el catéter distal por tracción suave', if: ['comp', 'Catéter distal'] },
      { t: 'Se realiza punción ventricular y colocación de drenaje ventricular externo por un sitio separado', if: ['dve', 'si'] },
      'Se realiza lavado de los bolsillos y del trayecto con solución fisiológica'
    ],
    ej: 'Se interviene sistema de derivación ventriculoperitoneal derecho. Se indica retiro del sistema por infección del sistema derivativo. Se realiza reapertura de la incisión craneal previa, se expone la válvula y se desconecta el sistema, y se toma muestra de LCR, de aspecto turbio. Se constata material purulento en el trayecto del sistema. Se retira el catéter ventricular con tracción suave y rotación y se retira el catéter distal por tracción suave desde una incisión cervical. Se retiran todos los componentes del sistema. No se produce sangrado intraventricular al retirar el catéter. Se coloca drenaje ventricular externo en el mismo acto, por nuevo orificio en punto de Kocher contralateral. Se envía a cultivo LCR, el catéter ventricular, la válvula y el catéter distal. Sin complicaciones intraoperatorias'
  },

  // Ventriculostomía endoscópica del tercer ventrículo
  {
    id: 'nc-etv',
    n: 'Ventriculostomía endoscópica del tercer ventrículo',
    sp: 'Neurocirugía',
    sub: 'Hidrocefalia',
    cat: 'Hidrocefalia y líquido cefalorraquídeo',
    syn: ['VET', 'TVE', 'tercer ventriculostomía', 'ETV', 'premamilostomía', 'ventriculocisternostomía endoscópica'],
    ref: refs(R_GREEN, R_YOUM, R_ETV, R_RHOTON, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Tratamiento de la hidrocefalia obstructiva (estenosis del acueducto, tumores de la región pineal o tectal, lesiones de fosa posterior) mediante apertura endoscópica del piso del tercer ventrículo. Puede asociar biopsia, septostomía o fenestración de quistes. El flujo a través de la estomía solo se escribe si se observó',
    lat: true,
    f: [
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', q: 1, p: 'Se indica ventriculostomía endoscópica por {v}', o: [
        ['Estenosis del acueducto', 'hidrocefalia obstructiva por estenosis del acueducto'],
        ['Tumor pineal o tectal', 'hidrocefalia obstructiva por lesión de la región pineal o tectal'],
        ['Lesión de fosa posterior', 'hidrocefalia obstructiva por lesión de fosa posterior'],
        ['Quiste aracnoideo', 'hidrocefalia asociada a quiste aracnoideo'],
        ['Disfunción de sistema derivativo', 'disfunción de sistema derivativo previo'],
        ['Otra hidrocefalia obstructiva', 'hidrocefalia obstructiva']
      ] },
      { id: 'etvss', l: 'ETV Success Score (si se calculó)', sec: 'B', k: 'num', p: 'ETV Success Score preoperatorio de {v}' },
      { id: 'entr', l: 'Punto de entrada', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza orificio de trépano {v}', o: [
        ['Precoronal (Kocher)', 'precoronal en punto de Kocher'],
        ['Planificado por neuronavegación', 'en punto de entrada planificado por neuronavegación'],
        ['Por orificio previo', 'a través de orificio de trépano previo']
      ] },
      { id: 'guia', l: 'Técnica de punción', sec: 'B', k: 'opt', vr: 1, q: 1, p: 'Punción ventricular {v}', o: [
        ['Reparos anatómicos', 'según reparos anatómicos'],
        ['Neuronavegación', 'guiada por neuronavegación'],
        ['Bajo visión endoscópica', 'bajo visión endoscópica']
      ] },
      { id: 'endo', l: 'Endoscopio', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Rígido', 'Se utiliza neuroendoscopio rígido'],
        ['Flexible', 'Se utiliza neuroendoscopio flexible']
      ] },
      { id: 'lcra', l: 'Aspecto del LCR', sec: 'C', k: 'opt', o: LCR_ASP, p: 'LCR de aspecto {v}' },
      { id: 'pap', l: 'Presión de apertura (si se midió)', sec: 'C', k: 'num', u: 'cmH₂O', p: 'Presión de apertura de {v} cmH₂O' },
      { id: 'hvent', l: 'Hallazgos endoscópicos', sec: 'C', k: 'multi', q: 1, p: 'Se identifica {v}', o: [
        ['Foramen de Monro dilatado', 'foramen de Monro dilatado'],
        ['Reparos del ventrículo lateral', 'plexo coroideo, vena talamoestriada y vena septal en el ventrículo lateral'],
        ['Piso delgado y traslúcido', 'piso del tercer ventrículo delgado y traslúcido'],
        ['Piso engrosado u opaco', 'piso del tercer ventrículo engrosado u opaco'],
        ['Cuerpos mamilares', 'cuerpos mamilares'],
        ['Receso infundibular', 'receso infundibular'],
        ['Arteria basilar visible', 'arteria basilar visible a través del piso'],
        ['Membranas intraventriculares', 'membranas intraventriculares'],
        ['Detritos o sangre', 'detritos o restos hemáticos intraventriculares'],
        ['Lesión intraventricular', 'lesión intraventricular']
      ] },
      { id: 'perf', l: 'Perforación del piso', sec: 'D', k: 'opt', q: 1, p: 'Se perfora el piso del tercer ventrículo {v}', o: [
        ['Instrumento romo', 'con instrumento romo'],
        ['Catéter balón', 'con catéter balón'],
        ['Pinza', 'con pinza'],
        ['Coagulación de baja energía', 'con coagulación de baja energía']
      ] },
      { id: 'dil', l: 'Dilatación de la estomía', sec: 'D', k: 'opt', p: 'Se dilata la estomía {v}', o: [
        ['Catéter balón de doble lumen', 'con catéter balón de doble lumen'],
        ['Catéter balón de embolectomía', 'con catéter balón de embolectomía'],
        ['Apertura de pinza', 'con apertura de pinza']
      ] },
      { id: 'dmm', l: 'Tamaño de la estomía', sec: 'D', k: 'num', u: 'mm', p: 'Estomía de aproximadamente {v} mm' },
      { id: 'lili', l: 'Membrana de Liliequist', sec: 'D', k: 'opt', o: [
        ['Abierta', 'Se abre la membrana de Liliequist'],
        ['No identificada', 'No se identifica membrana de Liliequist independiente'],
        ['No abierta', 'No se abre la membrana de Liliequist']
      ] },
      { id: 'flujo', l: 'Observación a través de la estomía', sec: 'D', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Movimiento pulsátil de los bordes', 'movimiento pulsátil de los bordes de la estomía'],
        ['Flujo de LCR', 'flujo de LCR a través de la estomía'],
        ['Cisterna prepontina libre', 'cisterna prepontina libre de membranas'],
        ['Membranas en cisterna prepontina', 'membranas aracnoideas en la cisterna prepontina'],
        ['Ausencia de movimiento', 'ausencia de movimiento a través de la estomía']
      ] },
      { id: 'asoc', l: 'Procedimientos asociados', sec: 'D', k: 'multi', p: 'Se realiza además {v}', o: [
        ['Biopsia', 'toma de biopsia endoscópica'],
        ['Septostomía', 'septostomía'],
        ['Fenestración de quiste', 'fenestración de quiste'],
        ['Acueductoplastia', 'acueductoplastia'],
        ['Coagulación de plexo coroideo', 'coagulación del plexo coroideo']
      ] },
      { id: 'sang', l: 'Sangrado intraventricular', sec: 'D', k: 'yn', y: 'Se produce sangrado intraventricular durante el procedimiento', n: 'No se produce sangrado intraventricular durante el procedimiento' },
      { id: 'sangm', l: 'Manejo del sangrado', sec: 'D', k: 'multi', if: ['sang', 'si'], p: 'Se maneja con {v}', o: [
        ['Irrigación continua', 'irrigación continua con solución tibia'],
        ['Coagulación bipolar', 'coagulación bipolar'],
        ['Compresión con balón', 'compresión con catéter balón']
      ] },
      { id: 'irr', l: 'Solución de irrigación', sec: 'D', k: 'text', p: 'Se utiliza irrigación con {v}', ph: 'solución de Ringer lactato tibia' },
      { id: 'dve', l: 'DVE al finalizar', sec: 'E', k: 'yn', y: 'Se deja drenaje ventricular externo', n: 'No se deja drenaje ventricular externo' },
      { id: 'resv', l: 'Reservorio ventricular', sec: 'E', k: 'yn', y: 'Se coloca reservorio ventricular subgaleal', n: 'No se coloca reservorio ventricular' },
      { id: 'mlcr', l: 'Muestra de LCR', sec: 'F', k: 'yn', y: 'Se toma muestra de LCR', n: 'No se toma muestra de LCR' },
      { id: 'mlcrd', l: 'Destino de la muestra', sec: 'F', k: 'multi', if: ['mlcr', 'si'], p: 'Se envía muestra de LCR para {v}', o: MLCR_DEST },
      { id: 'otre', l: 'Oclusión del orificio de trépano', sec: 'G', k: 'opt', p: 'Se ocluye el orificio de trépano con {v}', o: [
        ['Esponja de gelatina', 'esponja hemostática de gelatina'],
        ['Polvo de hueso', 'polvo de hueso autólogo'],
        ['Tapón', 'tapón para orificio de trépano'],
        ['Cemento óseo', 'cemento óseo']
      ] }
    ],
    pasos: [
      'Se realiza incisión cutánea lineal hasta plano óseo',
      'Se realiza orificio de trépano {entr}',
      'Se realiza coagulación y apertura de la duramadre',
      'Se realiza punción ventricular con la camisa del endoscopio {guia}',
      'Se introduce el endoscopio en el ventrículo lateral',
      'Se identifican el foramen de Monro, el plexo coroideo y las venas talamoestriada y septal',
      'Se avanza el endoscopio a través del foramen de Monro hacia el tercer ventrículo',
      'Se identifican los cuerpos mamilares y el receso infundibular',
      'Se perfora el piso del tercer ventrículo en la línea media, por delante de los cuerpos mamilares y por detrás del receso infundibular, {perf}',
      'Se dilata la estomía {dil}',
      'Se avanza el endoscopio a través de la estomía y se inspecciona la cisterna prepontina',
      { t: 'Se realiza septostomía', if: ['asoc', 'Septostomía'] },
      { t: 'Se toma biopsia endoscópica de la lesión', if: ['asoc', 'Biopsia'] },
      'Se realiza irrigación continua durante el procedimiento',
      'Se retira el endoscopio bajo visión directa del trayecto',
      'Se ocluye el orificio de trépano con {otre}'
    ],
    ej: 'Se indica ventriculostomía endoscópica por hidrocefalia obstructiva por estenosis del acueducto. Se utiliza neuroendoscopio rígido. Se realiza orificio de trépano precoronal en punto de Kocher derecho y punción ventricular con la camisa del endoscopio según reparos anatómicos, con LCR de aspecto cristalino. Se identifican el foramen de Monro, el plexo coroideo y las venas talamoestriada y septal, y en el tercer ventrículo se identifica piso delgado y traslúcido, cuerpos mamilares y receso infundibular. Se perfora el piso en la línea media con instrumento romo y se dilata la estomía con catéter balón de doble lumen. Se abre la membrana de Liliequist. Se constata movimiento pulsátil de los bordes de la estomía y cisterna prepontina libre de membranas. No se produce sangrado intraventricular. Se ocluye el orificio de trépano con esponja hemostática de gelatina. Sin complicaciones intraoperatorias'
  },

  // Colocación de drenaje lumbar
  {
    id: 'nc-dl',
    n: 'Colocación de drenaje lumbar',
    sp: 'Neurocirugía',
    sub: 'Hidrocefalia',
    cat: 'Hidrocefalia y líquido cefalorraquídeo',
    syn: ['drenaje lumbar externo', 'DLE', 'catéter lumbar', 'drenaje espinal', 'lumbar drain'],
    ref: refs(R_GREEN, R_YOUM, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Drenaje externo de LCR por vía lumbar para manejo de fístulas, prueba de drenaje en hidrocefalia normotensiva o relajación cerebral intraoperatoria. Requiere descartar previamente contraindicaciones para la punción lumbar (efecto de masa, hidrocefalia obstructiva, coagulopatía)',
    lat: false,
    hide: ['dren', 'dtipo'],
    noReq: ['dren'],
    f: [
      { id: 'amb', l: 'Ámbito', sec: 'B', k: 'opt', o: [
        ['Quirófano', 'Procedimiento realizado en quirófano'],
        ['Cabecera en UCI', 'Procedimiento realizado en la cabecera del paciente en unidad de cuidados intensivos'],
        ['Sala general', 'Procedimiento realizado en la cabecera del paciente en sala general']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', q: 1, o: [
        ['Decúbito lateral con flexión', 'Paciente en decúbito lateral con flexión de caderas, rodillas y columna'],
        ['Sentado con flexión', 'Paciente sentado con flexión de la columna'],
        ['Decúbito lateral bajo anestesia general', 'Paciente bajo anestesia general en decúbito lateral con flexión de la columna']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', q: 1, p: 'Se indica drenaje lumbar por {v}', o: [
        ['Fístula de LCR', 'fístula de LCR'],
        ['Protección de reparación dural', 'protección de reparación dural o de base de cráneo'],
        ['Prueba en hidrocefalia normotensiva', 'prueba de drenaje en sospecha de hidrocefalia normotensiva'],
        ['Relajación cerebral intraoperatoria', 'necesidad de relajación cerebral intraoperatoria'],
        ['Seudomeningocele', 'seudomeningocele'],
        ['Infección del SNC con indicación de drenaje', 'infección del sistema nervioso central con indicación de drenaje de LCR']
      ] },
      { id: 'niv', l: 'Espacio de punción', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Punción en espacio {v}', o: [
        ['L2-L3', 'L2-L3'], ['L3-L4', 'L3-L4'], ['L4-L5', 'L4-L5'], ['L5-S1', 'L5-S1']
      ] },
      { id: 'acc', l: 'Acceso', sec: 'B', k: 'opt', vr: 1, o: [
        ['Línea media', 'por línea media'],
        ['Paramediano', 'por vía paramediana']
      ] },
      { id: 'agu', l: 'Aguja', sec: 'B', k: 'text', p: 'Se utiliza aguja de Tuohy {v}', ph: '14 G' },
      { id: 'nint', l: 'Número de intentos', sec: 'C', k: 'num', p: 'Se realizan {v} intentos de punción' },
      { id: 'pap', l: 'Presión de apertura (si se midió)', sec: 'C', k: 'num', u: 'cmH₂O', p: 'Presión de apertura de {v} cmH₂O' },
      { id: 'lcra', l: 'Aspecto del LCR', sec: 'C', k: 'opt', q: 1, o: LCR_ASP, p: 'LCR de aspecto {v}' },
      { id: 'pare', l: 'Parestesias durante la inserción', sec: 'C', k: 'yn', y: 'Se registran parestesias radiculares durante la inserción', n: 'No se registran parestesias radiculares durante la inserción' },
      { id: 'clong', l: 'Longitud intratecal del catéter', sec: 'D', k: 'num', u: 'cm', q: 1, p: 'Se introducen {v} cm de catéter en el espacio subaracnoideo' },
      { id: 'cpiel', l: 'Marca del catéter en piel', sec: 'D', k: 'num', u: 'cm', p: 'Marca del catéter a nivel de piel en {v} cm' },
      { id: 'conf', l: 'Verificación del catéter', sec: 'D', k: 'opt', q: 1, req: 1, ph: 'método', o: [
        ['Flujo libre de LCR', 'Se verifica flujo libre de LCR por el catéter'],
        ['Flujo escaso de LCR', 'Se constata flujo escaso de LCR por el catéter'],
        ['Radioscopía', 'Se verifica la posición del catéter mediante radioscopía'],
        ['Otro método ({d})', 'Se verifica la posición del catéter mediante {d}'],
        ['Sin flujo de LCR', 'No se obtiene flujo de LCR por el catéter']
      ] },
      { id: 'tun', l: 'Tunelización', sec: 'D', k: 'yn', y: 'Se realiza tunelización subcutánea del catéter', n: 'No se realiza tunelización subcutánea del catéter' },
      { id: 'sist', l: 'Sistema de drenaje', sec: 'E', k: 'opt', o: [
        ['Cerrado con cámara de goteo', 'Se conecta a sistema de drenaje cerrado con cámara de goteo y bolsa colectora'],
        ['Cerrado con transductor', 'Se conecta a sistema de drenaje cerrado con transductor de presión']
      ] },
      { id: 'mlcr', l: 'Muestra de LCR', sec: 'F', k: 'yn', y: 'Se toma muestra de LCR', n: 'No se toma muestra de LCR' },
      { id: 'mlcrd', l: 'Destino de la muestra', sec: 'F', k: 'multi', if: ['mlcr', 'si'], p: 'Se envía muestra de LCR para {v}', o: MLCR_DEST },
      { id: 'fij', l: 'Fijación', sec: 'G', k: 'multi', p: 'Se fija el catéter con {v}', o: [
        ['Puntos a piel', 'puntos de fijación a piel'],
        ['Dispositivo de fijación', 'dispositivo adhesivo de fijación'],
        ['Apósito transparente', 'apósito transparente']
      ] },
      { id: 'estd', l: 'Estado del sistema', sec: 'H', k: 'opt', q: 1, o: [
        ['Abierto', 'Se deja el sistema abierto'],
        ['Cerrado', 'Se deja el sistema cerrado'],
        ['Drenaje intermitente', 'Se deja el sistema para drenaje intermitente']
      ] },
      { id: 'nivel', l: 'Nivel indicado', sec: 'H', k: 'num', u: 'cmH₂O', p: 'Nivel de drenaje indicado a {v} cmH₂O' },
      { id: 'vdeb', l: 'Débito indicado', sec: 'H', k: 'num', u: 'mL/h', p: 'Débito indicado de {v} mL/h' }
    ],
    pasos: [
      'Se identifican las crestas ilíacas y el espacio intervertebral {niv}',
      'Se realiza infiltración con anestésico local',
      'Se introduce la aguja de Tuohy {acc} con el bisel orientado en sentido cefálico hasta el espacio subaracnoideo',
      'Se retira el mandril y se mide la presión de apertura con manómetro',
      'Se avanza el catéter a través de la aguja en sentido cefálico',
      'Se retira la aguja sosteniendo el catéter',
      'Se conecta el catéter al sistema de drenaje cerrado',
      'Se fija el catéter y se coloca apósito oclusivo'
    ],
    ej: 'Procedimiento realizado en quirófano. Paciente en decúbito lateral con flexión de caderas, rodillas y columna. Se indica drenaje lumbar por fístula de LCR. Punción en espacio L3-L4 por línea media con aguja de Tuohy 14 G, en un intento, con LCR de aspecto cristalino. No se registran parestesias radiculares durante la inserción. Se introducen 12 cm de catéter en el espacio subaracnoideo y se verifica flujo libre de LCR por el catéter. Se conecta a sistema de drenaje cerrado con cámara de goteo y se fija con puntos a piel y apósito transparente. Se deja el sistema abierto, con débito indicado de 10 mL/h. Sin complicaciones'
  },

  // Reparación de fístula de LCR
  {
    id: 'nc-fist',
    n: 'Reparación de fístula de LCR',
    sp: 'Neurocirugía',
    sub: 'Base de cráneo',
    cat: 'Hidrocefalia y líquido cefalorraquídeo',
    syn: ['fístula de líquido cefalorraquídeo', 'rinorraquia', 'otorraquia', 'cierre de fístula', 'reparación endoscópica de fístula', 'CSF leak'],
    ref: refs(R_GREEN, R_YOUM, R_HADAD, R_RHOTON, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Cierre de fístulas de LCR craneales (rinorraquia, otorraquia) por vía endoscópica endonasal o transcraneal, o espinales posquirúrgicas o espontáneas. La estanqueidad de la reparación solo se escribe si se evaluó y con qué maniobra',
    lat: false,
    f: [
      { id: 'via', l: 'Vía', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [
        ['Endoscópica endonasal', 'Se realiza reparación de fístula de LCR por vía endoscópica endonasal'],
        ['Transcraneal', 'Se realiza reparación de fístula de LCR por vía transcraneal'],
        ['Espinal', 'Se realiza reparación de fístula de LCR espinal']
      ] },
      { id: 'etio', l: 'Etiología', sec: 'B', k: 'opt', q: 1, p: 'Fístula de origen {v}', o: [
        ['Espontánea', 'espontáneo'],
        ['Postraumática', 'postraumático'],
        ['Posquirúrgica', 'posquirúrgico'],
        ['Iatrogénica endonasal', 'iatrogénico tras cirugía endonasal']
      ] },
      { id: 'pres', l: 'Presentación', sec: 'B', k: 'opt', p: 'Se presenta como {v}', o: [
        ['Rinorraquia', 'rinorraquia'],
        ['Otorraquia', 'otorraquia'],
        ['Fístula cutánea', 'fístula cutánea de LCR'],
        ['Seudomeningocele', 'seudomeningocele']
      ] },
      { id: 'loc', l: 'Localización del defecto', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, ifn: ['via', 'Espinal'], p: 'Defecto localizado en {v}', o: [
        ['Lámina cribosa', 'la lámina cribosa'],
        ['Techo etmoidal', 'el techo etmoidal'],
        ['Pared posterior del seno frontal', 'la pared posterior del seno frontal'],
        ['Planum esfenoidal', 'el planum esfenoidal'],
        ['Selar', 'la región selar'],
        ['Receso lateral del esfenoides', 'el receso lateral del seno esfenoidal'],
        ['Clival', 'el clivus'],
        ['Tegmen timpánico o mastoideo', 'el tegmen timpánico o mastoideo'],
        ['Fosa media', 'el piso de la fosa media'],
        ['Fosa posterior', 'la fosa posterior']
      ] },
      { id: 'nivesp', l: 'Nivel espinal', sec: 'B', k: 'text', vr: 1, q: 1, if: ['via', 'Espinal'], p: 'Fístula espinal a nivel {v}', ph: 'L4-L5, sitio de laminectomía previa' },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', o: [
        ['Transetmoidal endoscópico', 'endoscópico transetmoidal'],
        ['Transesfenoidal endoscópico', 'endoscópico transesfenoidal'],
        ['Transpterigoideo endoscópico', 'endoscópico transpterigoideo'],
        ['Draf III / frontal endoscópico', 'endoscópico al seno frontal'],
        ['Subfrontal unilateral', 'subfrontal unilateral'],
        ['Bifrontal', 'bifrontal'],
        ['Fosa media', 'por fosa media'],
        ['Transmastoideo', 'transmastoideo'],
        ['Reapertura de abordaje espinal previo', 'por reapertura del abordaje espinal previo']
      ] },
      { id: 'fluo', l: 'Fluoresceína intratecal', sec: 'B', k: 'yn', y: 'Se administra fluoresceína intratecal', n: 'No se utiliza fluoresceína intratecal' },
      { id: 'fluod', l: 'Dosis y vía de la fluoresceína', sec: 'B', k: 'text', if: ['fluo', 'si'], p: 'Fluoresceína intratecal {v}', ph: 'diluida en LCR, a través del drenaje lumbar, con consentimiento documentado' },
      { id: 'ident', l: 'Identificación del defecto', sec: 'C', k: 'opt', q: 1, req: 1, ph: 'descripción', o: [
        ['Defecto identificado', 'Se identifica el defecto osteodural ({d})'],
        ['Fuga activa identificada', 'Se identifica salida activa de LCR a través del defecto'],
        ['Fuga con fluoresceína', 'Se identifica salida de LCR teñido con fluoresceína a través del defecto'],
        ['Defecto no identificado', 'No se identifica el sitio de la fístula']
      ] },
      { id: 'dtam', l: 'Tamaño del defecto', sec: 'C', k: 'num', u: 'mm', p: 'Defecto de aproximadamente {v} mm' },
      { id: 'meni', l: 'Meningocele o meningoencefalocele', sec: 'C', k: 'yn', ifn: ['via', 'Espinal'], y: 'Se identifica meningocele o meningoencefalocele asociado', n: 'No se identifica meningocele asociado' },
      { id: 'recon', l: 'Reconstrucción', sec: 'D', k: 'multi', q: 1, req: 1, p: 'Se realiza reconstrucción con {v}', o: [
        ['Injerto inlay de fascia', 'injerto de fascia en posición inlay'],
        ['Injerto onlay de fascia', 'injerto de fascia en posición onlay'],
        ['Injerto de grasa autóloga', 'injerto de grasa autóloga'],
        ['Sustituto dural', 'sustituto dural'],
        ['Colgajo nasoseptal', 'colgajo nasoseptal pediculado'],
        ['Injerto libre de mucosa', 'injerto libre de mucosa'],
        ['Colgajo de cornete medio', 'colgajo de cornete medio'],
        ['Injerto rígido', 'injerto rígido de hueso o cartílago'],
        ['Colgajo pericraneal', 'colgajo pericraneal pediculado'],
        ['Sutura dural primaria', 'sutura dural primaria'],
        ['Parche muscular', 'parche muscular autólogo'],
        ['Cera en celdillas', 'cera para hueso en celdillas mastoideas'],
        ['Sellante dural', 'sellante dural']
      ] },
      { id: 'vals', l: 'Prueba de Valsalva', sec: 'D', k: 'opt', o: [
        ['Sin salida de LCR', 'No se constata salida de LCR durante la maniobra de Valsalva'],
        ['Con salida de LCR', 'Se constata salida de LCR durante la maniobra de Valsalva'],
        ['No realizada', 'No se realiza maniobra de Valsalva']
      ] },
      { id: 'dl', l: 'Drenaje lumbar', sec: 'E', k: 'yn', y: 'Se coloca drenaje lumbar en el mismo acto', n: 'No se coloca drenaje lumbar' },
      { id: 'tapo', l: 'Taponaje nasal', sec: 'E', k: 'opt', if: ['via', 'Endoscópica endonasal'], o: [
        ['Reabsorbible', 'Se coloca taponaje nasal reabsorbible'],
        ['No reabsorbible', 'Se coloca taponaje nasal no reabsorbible'],
        ['Sonda balón', 'Se coloca sonda balón de soporte en la cavidad nasal'],
        ['Sin taponaje', 'No se coloca taponaje nasal']
      ] },
      { id: 'feru', l: 'Láminas septales', sec: 'E', k: 'yn', if: ['via', 'Endoscópica endonasal'], y: 'Se colocan láminas de silicona septales', n: 'No se colocan láminas septales' },
      { id: 'donan', l: 'Sitio dador', sec: 'F', k: 'multi', p: 'Se obtiene injerto de {v}', o: [
        ['Fascia lata', 'fascia lata'],
        ['Grasa abdominal', 'grasa abdominal'],
        ['Grasa del muslo', 'grasa del muslo'],
        ['Fascia temporal', 'fascia temporal'],
        ['Pericráneo', 'pericráneo'],
        ['Cornete', 'cornete']
      ] }
    ],
    pasos: [
      { t: 'Se realiza descongestión de la mucosa nasal con algodones embebidos en vasoconstrictor', if: ['via', 'Endoscópica endonasal'] },
      { t: 'Se introduce el endoscopio por la fosa nasal y se identifican los reparos anatómicos', if: ['via', 'Endoscópica endonasal'] },
      { t: 'Se realiza tallado del colgajo nasoseptal pediculado en la arteria septal posterior', if: ['recon', 'Colgajo nasoseptal'] },
      { t: 'Se realiza exposición del defecto mediante abordaje {abord}', if: ['via', 'Endoscópica endonasal'] },
      { t: 'Se realiza incisión cutánea y craneotomía', if: ['via', 'Transcraneal'] },
      { t: 'Se talla colgajo pericraneal pediculado', if: ['recon', 'Colgajo pericraneal'] },
      { t: 'Se diseca la duramadre basal hasta exponer el defecto', if: ['via', 'Transcraneal'] },
      { t: 'Se realiza reapertura de la incisión previa y disección por planos', if: ['via', 'Espinal'] },
      { t: 'Se evacúa el seudomeningocele y se reseca su pared', if: ['pres', 'Seudomeningocele'] },
      'Se identifica el defecto dural',
      { t: 'Se coagula y reseca el meningoencefalocele hasta el nivel del defecto óseo', if: ['meni', 'si'] },
      { t: 'Se cruentan los bordes del defecto retirando la mucosa circundante', if: ['via', 'Endoscópica endonasal'] },
      'Se realiza reconstrucción por capas con {recon}',
      'Se realiza maniobra de Valsalva para evaluar la estanqueidad de la reparación',
      { t: 'Se realiza cierre hermético de la fascia y cierre por planos', if: ['via', 'Espinal'] }
    ],
    ej: 'Se realiza reparación de fístula de LCR por vía endoscópica endonasal. Fístula de origen espontáneo, que se presenta como rinorraquia, con defecto localizado en el techo etmoidal izquierdo. Se administra fluoresceína intratecal diluida en LCR a través del drenaje lumbar. Se realiza abordaje endoscópico transetmoidal y se identifica salida de LCR teñido con fluoresceína a través del defecto, de aproximadamente 4 mm, con meningocele asociado que se coagula y reseca. Se cruentan los bordes del defecto y se realiza reconstrucción con injerto de fascia en posición inlay, injerto libre de mucosa y sellante dural. No se constata salida de LCR durante la maniobra de Valsalva. Se coloca taponaje nasal reabsorbible. Sin complicaciones intraoperatorias'
  },

  // Reparación de defecto dural
  {
    id: 'nc-dur',
    n: 'Reparación de defecto dural',
    sp: 'Neurocirugía',
    cat: 'Hidrocefalia y líquido cefalorraquídeo',
    syn: ['duroplastia', 'reparación de durotomía', 'cierre de duramadre', 'seudomeningocele', 'plástica dural', 'durorrafia'],
    ref: refs(R_GREEN, R_YOUM, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Reparación de defectos durales craneales o espinales: durotomía incidental, seudomeningocele, defecto dural posquirúrgico o postraumático. Si la reparación es parte de otra cirugía, puede documentarse dentro del parte principal',
    lat: false,
    f: [
      { id: 'reg', l: 'Región', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [
        ['Craneal', 'Se realiza reparación de defecto dural craneal'],
        ['Espinal', 'Se realiza reparación de defecto dural espinal']
      ] },
      { id: 'cont', l: 'Contexto', sec: 'B', k: 'opt', vr: 1, q: 1, p: 'Defecto {v}', o: [
        ['Durotomía incidental', 'por durotomía incidental en el mismo acto quirúrgico'],
        ['Seudomeningocele', 'con seudomeningocele'],
        ['Posquirúrgico diferido', 'posquirúrgico diferido'],
        ['Postraumático', 'postraumático']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'text', q: 1, req: 1, p: 'Defecto localizado en {v}', ph: 'cara posterior del saco dural a nivel L4-L5' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [...POS_CRANEO, ['Prono sobre marco', 'Paciente en decúbito prono sobre marco con abdomen libre'], ['Prono sobre almohadillas', 'Paciente en decúbito prono sobre almohadillas longitudinales con abdomen libre']] },
      { id: 'dtam', l: 'Tamaño del defecto', sec: 'C', k: 'num', u: 'mm', p: 'Defecto dural de aproximadamente {v} mm' },
      { id: 'hdur', l: 'Hallazgos', sec: 'C', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Salida activa de LCR', 'salida activa de LCR'],
        ['Raíces herniadas', 'raíces nerviosas herniadas a través del defecto'],
        ['Parénquima herniado', 'parénquima herniado a través del defecto'],
        ['Colección de LCR', 'colección de LCR en el lecho'],
        ['Bordes durales friables', 'bordes durales friables'],
        ['Bordes durales retraídos', 'bordes durales retraídos'],
        ['Signos de infección', 'signos locales de infección']
      ] },
      { id: 'tec', l: 'Técnica de reparación', sec: 'D', k: 'multi', q: 1, req: 1, p: 'Se realiza reparación con {v}', o: [
        ['Sutura primaria continua', 'sutura dural primaria continua'],
        ['Sutura primaria con puntos separados', 'sutura dural primaria con puntos separados'],
        ['Injerto de pericráneo', 'injerto de pericráneo autólogo'],
        ['Injerto de fascia', 'injerto de fascia autóloga'],
        ['Sustituto dural suturado', 'sustituto dural suturado'],
        ['Sustituto dural sin sutura', 'sustituto dural sin sutura'],
        ['Parche de grasa', 'parche de grasa autóloga'],
        ['Parche muscular', 'parche muscular autólogo'],
        ['Sellante dural', 'sellante dural']
      ] },
      { id: 'rrai', l: 'Reposición de estructuras herniadas', sec: 'D', k: 'yn', y: 'Se reponen las estructuras herniadas al espacio subaracnoideo', n: 'No se realiza reposición de estructuras herniadas' },
      { id: 'vals', l: 'Prueba de Valsalva', sec: 'D', k: 'opt', o: [
        ['Sin salida de LCR', 'No se constata salida de LCR durante la maniobra de Valsalva'],
        ['Con salida de LCR', 'Se constata salida de LCR durante la maniobra de Valsalva'],
        ['No realizada', 'No se realiza maniobra de Valsalva']
      ] },
      { id: 'dl', l: 'Drenaje lumbar', sec: 'E', k: 'yn', y: 'Se coloca drenaje lumbar en el mismo acto', n: 'No se coloca drenaje lumbar' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], p: 'Se deja drenaje {v}', o: [
        ['Subgaleal', 'subgaleal'],
        ['Subfascial a caída libre', 'subfascial a caída libre'],
        ['Subcutáneo', 'subcutáneo'],
        ['Epidural', 'epidural']
      ] }
    ],
    pasos: [
      { t: 'Se realiza reapertura de la incisión previa y disección por planos hasta el plano dural', ifn: ['cont', 'Durotomía incidental'] },
      { t: 'Se evacúa la colección y se reseca la pared del seudomeningocele', if: ['cont', 'Seudomeningocele'] },
      'Se identifican los bordes del defecto dural',
      { t: 'Se reponen las estructuras herniadas al espacio subaracnoideo', if: ['rrai', 'si'] },
      'Se realiza reparación con {tec}',
      'Se realiza maniobra de Valsalva para evaluar la estanqueidad de la reparación',
      { t: 'Se realiza cierre hermético de la fascia', if: ['reg', 'Espinal'] }
    ],
    ej: 'Se realiza reparación de defecto dural espinal. Defecto con seudomeningocele, localizado en la cara posterior del saco dural a nivel L4-L5. Paciente en decúbito prono sobre marco con abdomen libre. Se realiza reapertura de la incisión previa, se evacúa la colección y se reseca la pared del seudomeningocele. Se constata salida activa de LCR y bordes durales retraídos. Se realiza reparación con sutura dural primaria con puntos separados, parche de grasa autóloga y sellante dural. No se constata salida de LCR durante la maniobra de Valsalva. Se realiza cierre hermético de la fascia. No se coloca drenaje. Sin complicaciones intraoperatorias'
  },

  // ===================== Neurocirugía vascular =====================

  // Clipado de aneurisma intracraneal (roto / no roto)
  {
    id: 'nc-aneu',
    n: 'Clipado de aneurisma intracraneal roto',
    sp: 'Neurocirugía',
    sub: 'Vascular',
    cat: 'Neurocirugía vascular',
    syn: ['clipado de aneurisma', 'aneurisma roto', 'HSA aneurismática', 'microcirugía de aneurisma', 'clipping', 'aneurisma cerebral'],
    ref: refs(R_SAH, R_UIA, R_LAWA, R_RHOTON, R_GREEN, R_YOUM, R_RCS),
    rev: '2026-10',
    v: 2,
    def: { est: 'Roto' },
    ctx: 'Tratamiento microquirúrgico de aneurismas intracraneales rotos o no rotos, por clipado u otras técnicas. La exclusión completa solo se afirma si fue confirmada y por qué método. Los tiempos de clipado temporario y los eventos de ruptura se registran tal como ocurrieron',
    lat: true,
    f: [
      { id: 'est', l: 'Estado del aneurisma', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [
        ['Roto', 'Aneurisma roto'],
        ['No roto', 'Aneurisma no roto']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se interviene aneurisma {v}', o: ANEU_LOC },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza abordaje {v}', o: [
        ['Pterional', 'pterional'],
        ['Minipterional', 'minipterional'],
        ['Orbitocigomático', 'orbitocigomático'],
        ['Supraorbitario', 'supraorbitario'],
        ['Interhemisférico', 'interhemisférico'],
        ['Subtemporal', 'subtemporal'],
        ['Retrosigmoideo', 'retrosigmoideo'],
        ['Far lateral', 'suboccipital lateral extremo']
      ] },
      { id: 'hh', l: 'Hunt y Hess', sec: 'B', k: 'opt', if: ['est', 'Roto'], p: 'Grado {v} de Hunt y Hess al ingreso', o: GRADO_I_V },
      { id: 'wfns', l: 'WFNS', sec: 'B', k: 'opt', if: ['est', 'Roto'], p: 'Grado {v} de la WFNS', o: GRADO_I_V },
      { id: 'mfis', l: 'Fisher modificada', sec: 'B', k: 'opt', if: ['est', 'Roto'], p: 'Grado {v} de la escala de Fisher modificada', o: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']] },
      { id: 'dias', l: 'Días desde el sangrado', sec: 'B', k: 'num', if: ['est', 'Roto'], p: 'Cirugía en el día {v} desde el sangrado' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], o: MNIO_MOD, p: 'Se monitorean {v}' },
      { id: 'relaj', l: 'Medidas de relajación cerebral', sec: 'B', k: 'multi', p: 'Se utiliza {v} para relajación cerebral', o: [
        ['Drenaje lumbar', 'drenaje lumbar'],
        ['DVE previo', 'el drenaje ventricular externo previo'],
        ['Punción ventricular de Paine', 'punción ventricular en punto de Paine'],
        ['Apertura de cisternas', 'apertura de cisternas basales'],
        ['Fenestración de lámina terminalis', 'fenestración de la lámina terminalis'],
        ['Osmoterapia (anestesia)', 'osmoterapia administrada por anestesia']
      ] },
      { id: 'hsah', l: 'Hallazgos', sec: 'C', k: 'multi', if: ['est', 'Roto'], q: 1, p: 'Se constata {v}', o: [
        ['HSA en cisternas basales', 'hemorragia subaracnoidea en cisternas basales'],
        ['Coágulo silviano', 'coágulo en la cisura silviana'],
        ['Cerebro tenso', 'parénquima cerebral tenso'],
        ['Cerebro relajado', 'parénquima cerebral relajado'],
        ['Hematoma asociado', 'hematoma intraparenquimatoso asociado'],
        ['Vasoespasmo', 'vasoespasmo visible']
      ] },
      { id: 'hnr', l: 'Hallazgos', sec: 'C', k: 'multi', if: ['est', 'No roto'], q: 1, p: 'Se constata {v}', o: [
        ['Cisternas sin hemorragia', 'cisternas sin signos de hemorragia'],
        ['Cerebro relajado', 'parénquima cerebral relajado'],
        ['Adherencias aracnoideas', 'adherencias aracnoideas'],
        ['Aneurisma adicional', 'aneurisma adicional']
      ] },
      { id: 'morf', l: 'Morfología del aneurisma', sec: 'C', k: 'multi', p: 'Se constata aneurisma con {v}', o: [
        ['Cuello estrecho', 'cuello estrecho'],
        ['Cuello ancho', 'cuello ancho'],
        ['Multilobulado', 'saco multilobulado'],
        ['Vesícula apical', 'vesícula apical'],
        ['Pared delgada', 'pared delgada'],
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
      { id: 'ctemp', l: 'Clipado temporario', sec: 'D', k: 'yn', q: 1, y: 'Se realiza clipado temporario de la arteria portadora', n: 'No se realiza clipado temporario' },
      { id: 'ttemp', l: 'Tiempo total de clipado temporario', sec: 'D', k: 'num', u: 'min', if: ['ctemp', 'si'], q: 1, req: 1, p: 'Tiempo total de clipado temporario de {v} minutos' },
      { id: 'ntemp', l: 'Episodios de clipado temporario', sec: 'D', k: 'num', if: ['ctemp', 'si'], p: 'Se realizan {v} episodios de clipado temporario' },
      { id: 'nprot', l: 'Neuroprotección solicitada', sec: 'D', k: 'text', if: ['ctemp', 'si'], p: 'Se solicita a anestesia {v}', ph: 'elevación de la presión arterial media y supresión en ráfagas durante el clipado temporario' },
      { id: 'clip', l: 'Técnica realizada', sec: 'D', k: 'opt', q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Clipado del cuello', 'clipado del cuello aneurismático'],
        ['Clipado con múltiples clips', 'clipado del cuello aneurismático con múltiples clips'],
        ['Clipado con remodelado', 'clipado con remodelación del cuello'],
        ['Reforzamiento (wrapping)', 'reforzamiento de la pared aneurismática'],
        ['Atrapamiento', 'atrapamiento del aneurisma'],
        ['Atrapamiento con bypass', 'atrapamiento del aneurisma con bypass'],
        ['Trombectomía y clipado', 'apertura del saco, trombectomía y clipado']
      ] },
      { id: 'rupt', l: 'Ruptura intraoperatoria', sec: 'D', k: 'yn', q: 1, req: 1, y: 'Se produce ruptura intraoperatoria del aneurisma', n: 'No se produce ruptura intraoperatoria del aneurisma' },
      { id: 'ruptm', l: 'Momento de la ruptura', sec: 'D', k: 'opt', if: ['rupt', 'si'], o: [
        ['Durante la exposición', 'La ruptura se produce durante la exposición'],
        ['Durante la disección', 'La ruptura se produce durante la disección del aneurisma'],
        ['Durante el clipado', 'La ruptura se produce durante la aplicación del clip']
      ] },
      { id: 'ruptc', l: 'Manejo de la ruptura', sec: 'D', k: 'multi', if: ['rupt', 'si'], p: 'Se maneja con {v}', o: [
        ['Doble aspiración', 'doble aspiración'],
        ['Compresión con cotonoide', 'compresión con cotonoide'],
        ['Clipado temporario', 'clipado temporario de la arteria portadora'],
        ['Clipado definitivo', 'clipado definitivo'],
        ['Adenosina (anestesia)', 'paro cardíaco transitorio inducido con adenosina por anestesia']
      ] },
      { id: 'ctrl', l: 'Control intraoperatorio', sec: 'D', k: 'multi', q: 1, p: 'Se realiza control intraoperatorio con {v}', o: [
        ['Videoangiografía con ICG', 'videoangiografía con verde de indocianina'],
        ['Videoangiografía con fluoresceína', 'videoangiografía con fluoresceína'],
        ['Doppler microvascular', 'Doppler microvascular'],
        ['Flujometría', 'flujometría'],
        ['Angiografía digital', 'angiografía digital intraoperatoria'],
        ['Punción del saco', 'punción y aspiración del saco aneurismático']
      ] },
      { id: 'repos', l: 'Reposicionamiento del clip', sec: 'D', k: 'yn', y: 'Se reposiciona el clip a partir del control intraoperatorio', n: 'No se reposiciona el clip' },
      { id: 'excl', l: 'Exclusión del aneurisma', sec: 'D', k: 'opt', q: 1, req: 1, ph: 'método de confirmación', o: [
        ['Exclusión completa confirmada por {d}', 'Se constata exclusión completa del aneurisma, confirmada por {d}'],
        ['Remanente de cuello', 'Se constata remanente de cuello aneurismático'],
        ['Exclusión incompleta', 'Se constata exclusión incompleta del aneurisma, con persistencia de relleno del saco'],
        ['Exclusión no confirmada', 'No se confirma intraoperatoriamente la exclusión completa del aneurisma']
      ] },
      { id: 'vasos', l: 'Estado de los vasos', sec: 'D', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Portadora permeable', 'permeabilidad de la arteria portadora'],
        ['Ramas permeables', 'permeabilidad de las ramas distales'],
        ['Perforantes preservadas', 'preservación de las arterias perforantes visibles'],
        ['Compromiso de rama', 'compromiso de flujo en rama adyacente'],
        ['Oclusión de rama', 'oclusión de rama arterial']
      ] },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], o: MNIO_RES },
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
      { t: 'Se realiza incisión cutánea arciforme frontotemporal y disección interfascial del músculo temporal', if: ['abord', ['Pterional', 'Minipterional', 'Orbitocigomático']] },
      { t: 'Se realiza incisión supraciliar', if: ['abord', 'Supraorbitario'] },
      { t: 'Se realiza incisión retroauricular', if: ['abord', ['Retrosigmoideo', 'Far lateral']] },
      'Se realiza craneotomía para abordaje {abord}',
      { t: 'Se realiza fresado del ala menor del esfenoides', if: ['abord', ['Pterional', 'Minipterional', 'Orbitocigomático']] },
      'Se realiza apertura dural',
      'Se incorpora microscopio quirúrgico',
      { t: 'Se realiza punción ventricular en punto de Paine para drenaje de LCR', if: ['relaj', 'Punción ventricular de Paine'] },
      'Se realiza apertura de cisternas basales y drenaje de LCR',
      { t: 'Se realiza disección de la cisura silviana', if: ['abord', ['Pterional', 'Minipterional', 'Orbitocigomático']] },
      { t: 'Se realiza aspiración del coágulo cisternal', if: ['est', 'Roto'] },
      { t: 'Se realiza evacuación del hematoma intraparenquimatoso', if: ['hsah', 'Hematoma asociado'] },
      'Se identifica la arteria portadora y se obtiene control proximal',
      'Se diseca el cuello aneurismático y las ramas adyacentes',
      { t: 'Se coloca clip temporario en la arteria portadora', if: ['ctemp', 'si'] },
      'Se procede a {clip}',
      { t: 'Se retira el clip temporario', if: ['ctemp', 'si'] },
      'Se realiza inspección de la arteria portadora, de las ramas y de las perforantes',
      { t: 'Se realiza fenestración de la lámina terminalis', if: ['lterm', 'si'] },
      'Se realiza lavado de las cisternas'
    ],
    ej: 'Aneurisma roto. Se interviene aneurisma de arteria comunicante anterior, con grado III de Hunt y Hess al ingreso, en el día 1 desde el sangrado. Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines. Se realiza abordaje pterional derecho, apertura de cisternas basales y disección de la cisura silviana, con aspiración del coágulo cisternal. Se constata hemorragia subaracnoidea en cisternas basales. Se obtiene control proximal intracraneal de la arteria portadora. Se realiza clipado temporario, con tiempo total de 4 minutos, y clipado del cuello aneurismático. No se produce ruptura intraoperatoria del aneurisma. Se realiza control intraoperatorio con videoangiografía con verde de indocianina y se constata exclusión completa del aneurisma, confirmada por videoangiografía, con permeabilidad de la arteria portadora y de las ramas distales. Se realiza fenestración de la lámina terminalis. Se realiza cierre dural primario con sutura continua y se repone el colgajo óseo. Sin complicaciones intraoperatorias'
  },

  // Clipado de aneurisma no roto → variante de nc-aneu
  {
    id: 'nc-aneu-nr',
    n: 'Clipado de aneurisma intracraneal no roto',
    cat: 'Neurocirugía vascular',
    syn: ['aneurisma no roto', 'aneurisma incidental', 'clipado electivo', 'clipping', 'aneurisma cerebral'],
    alias: 'nc-aneu',
    set: { est: 'No roto' }
  },

  // Malformación arteriovenosa cerebral
  {
    id: 'nc-mav',
    n: 'Tratamiento quirúrgico de malformación arteriovenosa cerebral',
    sp: 'Neurocirugía',
    sub: 'Vascular',
    cat: 'Neurocirugía vascular',
    syn: ['MAV', 'malformación arteriovenosa', 'resección de MAV', 'AVM', 'nido malformativo'],
    ref: refs(R_SM, R_LY, R_LAWM, R_GREEN, R_YOUM, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Resección microquirúrgica de malformaciones arteriovenosas cerebrales, rotas o no rotas, con o sin embolización previa. La graduación de Spetzler-Martin se registra tal como la documentó el equipo. La resección completa solo se afirma si se confirmó y con qué método',
    lat: true,
    f: [
      { id: 'loc', l: 'Localización del nido', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Malformación arteriovenosa de localización {v}', o: [
        ['Frontal', 'frontal'],
        ['Temporal', 'temporal'],
        ['Parietal', 'parietal'],
        ['Occipital', 'occipital'],
        ['Insular / silviana', 'insular o silviana'],
        ['Parasagital / interhemisférica', 'parasagital o interhemisférica'],
        ['Callosa', 'callosa'],
        ['Intraventricular', 'intraventricular'],
        ['Ganglios basales / talámica', 'en ganglios basales o tálamo'],
        ['Cerebelosa', 'cerebelosa'],
        ['Tronco encefálico', 'en tronco encefálico']
      ] },
      { id: 'rot', l: 'Presentación', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Rota', 'Malformación con antecedente de ruptura'],
        ['No rota', 'Malformación sin antecedente de ruptura']
      ] },
      { id: 'smt', l: 'Tamaño del nido', sec: 'B', k: 'opt', p: 'Nido {v}', o: [
        ['Menor de 3 cm', 'menor de 3 cm'],
        ['De 3 a 6 cm', 'de 3 a 6 cm'],
        ['Mayor de 6 cm', 'mayor de 6 cm']
      ] },
      { id: 'sme', l: 'Elocuencia', sec: 'B', k: 'yn', y: 'Nido en área elocuente', n: 'Nido en área no elocuente' },
      { id: 'smv', l: 'Drenaje venoso', sec: 'B', k: 'opt', o: [
        ['Superficial', 'Drenaje venoso exclusivamente superficial'],
        ['Profundo', 'Drenaje venoso profundo']
      ] },
      { id: 'smg', l: 'Grado de Spetzler-Martin (documentado)', sec: 'B', k: 'opt', q: 1, p: 'Grado {v} de Spetzler-Martin', o: GRADO_I_V },
      { id: 'lyg', l: 'Puntaje suplementario de Lawton-Young', sec: 'B', k: 'num', p: 'Puntaje suplementario de Lawton-Young de {v}' },
      { id: 'emb', l: 'Embolización previa', sec: 'B', k: 'yn', q: 1, y: 'Con embolización endovascular previa', n: 'Sin embolización previa' },
      { id: 'embd', l: 'Detalle de la embolización', sec: 'B', k: 'text', if: ['emb', 'si'], p: 'Embolización previa {v}', ph: 'de aferencias de la ACM con agente líquido, 48 h antes' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'osea', l: 'Apertura ósea', sec: 'B', k: 'opt', p: 'Se realiza {v}', o: [
        ['Craneotomía', 'craneotomía'],
        ['Craneotomía amplia', 'craneotomía amplia que expone el nido y sus venas de drenaje'],
        ['Craneotomía que cruza la línea media', 'craneotomía que cruza la línea media'],
        ['Craniectomía suboccipital', 'craniectomía suboccipital'],
        ['Craneotomía suboccipital', 'craneotomía suboccipital']
      ] },
      { id: 'nav', l: 'Neuronavegación', sec: 'B', k: 'yn', y: 'Se utiliza neuronavegación', n: 'No se utiliza neuronavegación' },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], o: MNIO_MOD, p: 'Se monitorean {v}' },
      { id: 'hmav', l: 'Hallazgos', sec: 'C', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Venas arterializadas en superficie', 'venas arterializadas en la superficie cortical'],
        ['Nido cortical', 'nido con componente cortical visible'],
        ['Nido subcortical', 'nido subcortical'],
        ['Hematoma', 'hematoma asociado'],
        ['Gliosis y hemosiderina', 'gliosis y depósito de hemosiderina perinidal'],
        ['Material de embolización', 'material de embolización en el nido'],
        ['Aneurisma asociado', 'aneurisma asociado al nido o a una aferencia']
      ] },
      { id: 'afer', l: 'Aferencias identificadas', sec: 'C', k: 'multi', p: 'Se identifican aferencias de {v}', o: [
        ['ACA', 'la arteria cerebral anterior'],
        ['ACM', 'la arteria cerebral media'],
        ['ACP', 'la arteria cerebral posterior'],
        ['Coroidea anterior', 'la arteria coroidea anterior'],
        ['Coroideas posteriores', 'las arterias coroideas posteriores'],
        ['Perforantes', 'arterias perforantes'],
        ['SCA', 'la arteria cerebelosa superior'],
        ['AICA', 'la arteria cerebelosa anteroinferior'],
        ['PICA', 'la arteria cerebelosa posteroinferior'],
        ['Ramas meníngeas', 'ramas meníngeas']
      ] },
      { id: 'vdren', l: 'Drenaje venoso identificado', sec: 'C', k: 'multi', p: 'Se identifica drenaje venoso hacia {v}', o: [
        ['Seno sagital superior', 'el seno sagital superior'],
        ['Seno transverso', 'el seno transverso'],
        ['Vena de Labbé', 'la vena de Labbé'],
        ['Vena de Trolard', 'la vena de Trolard'],
        ['Venas silvianas', 'las venas silvianas superficiales'],
        ['Vena basal de Rosenthal', 'la vena basal de Rosenthal'],
        ['Sistema venoso profundo', 'el sistema venoso profundo']
      ] },
      { id: 'adj', l: 'Adyuvantes', sec: 'D', k: 'multi', p: 'Se utiliza {v}', o: [
        ['Microscopio quirúrgico', 'microscopio quirúrgico'],
        ['Videoangiografía con ICG', 'videoangiografía con verde de indocianina'],
        ['Doppler microvascular', 'Doppler microvascular'],
        ['Angiografía digital intraoperatoria', 'angiografía digital intraoperatoria'],
        ['Microclips para vasos profundos', 'microclips para vasos profundos'],
        ['Ecografía intraoperatoria', 'ecografía intraoperatoria']
      ] },
      { id: 'sang', l: 'Sangrado del nido durante la disección', sec: 'D', k: 'yn', q: 1, y: 'Se produce sangrado del nido durante la disección', n: 'No se produce sangrado del nido durante la disección' },
      { id: 'sangm', l: 'Manejo del sangrado', sec: 'D', k: 'text', if: ['sang', 'si'], p: 'El sangrado se maneja con {v}', ph: 'compresión con cotonoide y coagulación bipolar de baja potencia' },
      { id: 'ext', l: 'Extensión de la resección', sec: 'D', k: 'opt', q: 1, req: 1, ph: 'método de confirmación o descripción', o: [
        ['Resección completa confirmada por {d}', 'Se realiza resección completa del nido, confirmada por {d}'],
        ['Resección sin confirmación intraoperatoria', 'Se realiza resección del nido sin confirmación intraoperatoria de su completitud'],
        ['Remanente de nido', 'Se constata remanente de nido ({d})'],
        ['Resección parcial planificada', 'Se realiza resección parcial planificada del nido como parte de un tratamiento por etapas'],
        ['Resección suspendida', 'Se suspende la resección ({d})']
      ] },
      { id: 'hfin', l: 'Estado al finalizar la resección', sec: 'D', k: 'multi', p: 'Al finalizar la resección se constata {v}', o: [
        ['Parénquima relajado', 'parénquima cerebral relajado'],
        ['Tumefacción cerebral', 'tumefacción cerebral'],
        ['Sangrado persistente del lecho', 'sangrado persistente del lecho']
      ] },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], o: MNIO_RES },
      { id: 'dve', l: 'Drenaje ventricular externo', sec: 'E', k: 'yn', y: 'Se coloca drenaje ventricular externo', n: 'No se coloca drenaje ventricular externo' },
      { id: 'pic', l: 'Sensor de PIC', sec: 'E', k: 'yn', y: 'Se coloca sensor de presión intracraneana', n: 'No se coloca sensor de presión intracraneana' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', o: CDUR, p: 'Se realiza {v}' },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza incisión cutánea y disección por planos',
      'Se realiza {osea}',
      'Se realiza apertura dural cuidando las venas arterializadas adheridas a la duramadre',
      'Se incorpora microscopio quirúrgico',
      { t: 'Se realiza videoangiografía con verde de indocianina previa a la resección', if: ['adj', 'Videoangiografía con ICG'] },
      'Se realiza apertura aracnoidea e identificación de las aferencias arteriales y de la vena de drenaje principal',
      'Se coagulan y seccionan las aferencias arteriales terminales en su ingreso al nido, preservando las arterias en tránsito',
      'Se realiza disección circunferencial del nido en el plano perinidal',
      { t: 'Se ocluyen los vasos profundos con microclips', if: ['adj', 'Microclips para vasos profundos'] },
      'Se preserva la vena de drenaje principal hasta completar la desarterialización del nido',
      'Se coagula y secciona la vena de drenaje principal',
      'Se reseca el nido en bloque',
      'Se realiza inspección del lecho quirúrgico',
      { t: 'Se realiza videoangiografía con verde de indocianina posterior a la resección', if: ['adj', 'Videoangiografía con ICG'] },
      { t: 'Se realiza angiografía digital intraoperatoria', if: ['adj', 'Angiografía digital intraoperatoria'] },
      'Se solicita elevación de la presión arterial para evaluar la hemostasia del lecho'
    ],
    ej: 'Malformación arteriovenosa de localización parietal izquierda, sin antecedente de ruptura, con nido de 3 a 6 cm, en área no elocuente y drenaje venoso exclusivamente superficial; grado II de Spetzler-Martin. Con embolización endovascular previa. Se realiza craneotomía amplia que expone el nido y sus venas de drenaje, y apertura dural cuidando las venas arterializadas. Se constata venas arterializadas en la superficie cortical y material de embolización en el nido. Se identifican aferencias de la arteria cerebral media y drenaje venoso hacia el seno sagital superior. Se coagulan y seccionan las aferencias, se realiza disección circunferencial del nido y se secciona la vena de drenaje principal al final, con resección del nido en bloque. No se produce sangrado del nido durante la disección. Se realiza resección completa del nido, confirmada por videoangiografía con verde de indocianina. Se envía pieza a Anatomía Patológica. Se realiza cierre dural primario y se repone el colgajo óseo. Sin complicaciones intraoperatorias'
  },

  // Evacuación quirúrgica de hemorragia intracerebral espontánea
  {
    id: 'nc-hic',
    n: 'Evacuación quirúrgica de hemorragia intracerebral',
    sp: 'Neurocirugía',
    sub: 'Vascular',
    cat: 'Neurocirugía vascular',
    syn: ['HIC', 'hematoma intraparenquimatoso espontáneo', 'ACV hemorrágico', 'hemorragia cerebelosa', 'evacuación de hematoma', 'ICH'],
    ref: refs(R_ICH, R_GREEN, R_YOUM, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Evacuación de hemorragia intracerebral espontánea supratentorial o cerebelosa por craneotomía, técnica mínimamente invasiva endoscópica o estereotáctica, o craniectomía descompresiva. El remanente y la presencia de una lesión subyacente solo se escriben si se constataron',
    lat: true,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Hemorragia intracerebral {v}', o: [
        ['Lobar frontal', 'lobar frontal'],
        ['Lobar temporal', 'lobar temporal'],
        ['Lobar parietal', 'lobar parietal'],
        ['Lobar occipital', 'lobar occipital'],
        ['Putaminal / ganglios basales', 'en ganglios basales'],
        ['Talámica', 'talámica'],
        ['Cerebelosa', 'cerebelosa']
      ] },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza evacuación {v}', o: [
        ['Craneotomía', 'por craneotomía'],
        ['Endoscópica mínimamente invasiva', 'endoscópica mínimamente invasiva a través de minicraneotomía'],
        ['Con vaina tubular', 'mínimamente invasiva a través de vaina tubular guiada por neuronavegación'],
        ['Aspiración estereotáctica con catéter', 'por aspiración estereotáctica con catéter'],
        ['Craniectomía suboccipital', 'por craniectomía suboccipital'],
        ['Craniectomía descompresiva', 'con craniectomía descompresiva']
      ] },
      { id: 'ivh', l: 'Extensión ventricular', sec: 'B', k: 'yn', y: 'Con extensión intraventricular', n: 'Sin extensión intraventricular' },
      { id: 'volp', l: 'Volumen estimado preoperatorio', sec: 'B', k: 'num', u: 'mL', p: 'Volumen estimado preoperatorio de {v} mL' },
      { id: 'ichs', l: 'Puntaje ICH (si se documentó)', sec: 'B', k: 'num', p: 'Puntaje ICH de {v}' },
      { id: 'anticoag', l: 'Antitrombóticos y reversión', sec: 'B', k: 'text', p: 'Antitrombóticos previos y reversión {v}', ph: 'anticoagulación con antagonista de vitamina K, revertida con concentrado de complejo protrombínico' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'nav', l: 'Neuronavegación', sec: 'B', k: 'yn', y: 'Se utiliza neuronavegación', n: 'No se utiliza neuronavegación' },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      { id: 'diam', l: 'Diámetro de la craniectomía', sec: 'B', k: 'num', u: 'cm', if: ['tec', 'Craniectomía descompresiva'], p: 'Defecto óseo de {v} cm de diámetro anteroposterior' },
      { id: 'hhic', l: 'Hallazgos', sec: 'C', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Coágulo organizado', 'coágulo organizado'],
        ['Coágulo líquido', 'componente líquido del hematoma'],
        ['Sangrado activo', 'sangrado activo en la cavidad'],
        ['Cerebro tenso', 'parénquima cerebral tenso'],
        ['Comunicación ventricular', 'comunicación de la cavidad con el sistema ventricular'],
        ['Vasos anómalos', 'vasos de aspecto anómalo en la pared de la cavidad'],
        ['Tejido de aspecto lesional', 'tejido de aspecto lesional en la pared de la cavidad']
      ] },
      { id: 'vole', l: 'Volumen evacuado', sec: 'D', k: 'num', u: 'mL', q: 1, p: 'Se evacúan aproximadamente {v} mL' },
      { id: 'resid', l: 'Remanente', sec: 'D', k: 'opt', q: 1, req: 1, ph: 'descripción', o: [
        ['Sin remanente visible', 'No se observa remanente de coágulo en la inspección de la cavidad'],
        ['Remanente adherido', 'Se deja remanente de coágulo adherido al parénquima ({d})'],
        ['No evaluable', 'No se evalúa el remanente en forma intraoperatoria']
      ] },
      { id: 'bx', l: 'Biopsia de la pared', sec: 'F', k: 'yn', y: 'Se toma biopsia de la pared de la cavidad', n: 'No se toma biopsia de la pared de la cavidad' },
      { id: 'reexp', l: 'Estado cerebral al finalizar', sec: 'D', k: 'opt', o: REEXP },
      { id: 'catc', l: 'Catéter en la cavidad', sec: 'E', k: 'yn', y: 'Se deja catéter en la cavidad del hematoma', n: 'No se deja catéter en la cavidad' },
      { id: 'catcd', l: 'Uso indicado del catéter', sec: 'E', k: 'text', if: ['catc', 'si'], p: 'Catéter en la cavidad para {v}', ph: 'drenaje pasivo / trombólisis según protocolo indicado' },
      { id: 'dve', l: 'Drenaje ventricular externo', sec: 'E', k: 'yn', y: 'Se coloca drenaje ventricular externo', n: 'No se coloca drenaje ventricular externo' },
      { id: 'pic', l: 'Sensor de PIC', sec: 'E', k: 'yn', y: 'Se coloca sensor de presión intracraneana', n: 'No se coloca sensor de presión intracraneana' },
      { id: 'pict', l: 'Tipo de sensor', sec: 'E', k: 'opt', if: ['pic', 'si'], o: PIC_T },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'opt', o: CDUR_DESC },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      { t: 'Se realiza registro de neuronavegación y planificación de la trayectoria al hematoma', if: ['nav', 'si'] },
      'Se realiza incisión cutánea {inc} y disección por planos',
      { t: 'Se realiza craneotomía', if: ['tec', 'Craneotomía'] },
      { t: 'Se realiza minicraneotomía', if: ['tec', ['Endoscópica mínimamente invasiva', 'Con vaina tubular']] },
      { t: 'Se realiza orificio de trépano', if: ['tec', 'Aspiración estereotáctica con catéter'] },
      { t: 'Se realiza craniectomía suboccipital', if: ['tec', 'Craniectomía suboccipital'] },
      { t: 'Se realiza craniectomía descompresiva frontotemporoparietal', if: ['tec', 'Craniectomía descompresiva'] },
      'Se realiza coagulación y apertura de la duramadre',
      { t: 'Se realiza corticotomía y disección transparenquimatosa hasta el hematoma', if: ['tec', ['Craneotomía', 'Craniectomía suboccipital', 'Craniectomía descompresiva']] },
      { t: 'Se introduce la vaina tubular hasta el hematoma según la trayectoria planificada', if: ['tec', 'Con vaina tubular'] },
      { t: 'Se introduce el endoscopio y se evacúa el hematoma por aspiración bajo visión directa', if: ['tec', ['Endoscópica mínimamente invasiva', 'Con vaina tubular']] },
      { t: 'Se introduce el catéter en el hematoma según la trayectoria planificada y se realiza aspiración suave', if: ['tec', 'Aspiración estereotáctica con catéter'] },
      { t: 'Se procede a la evacuación del hematoma con aspiración e irrigación', ifn: ['tec', ['Endoscópica mínimamente invasiva', 'Con vaina tubular', 'Aspiración estereotáctica con catéter']] },
      'Se realiza inspección de la pared de la cavidad en busca de lesión subyacente',
      'Se realiza hemostasia de la cavidad con coagulación bipolar y material hemostático'
    ],
    ej: 'Hemorragia intracerebral lobar temporal derecha, sin extensión intraventricular, con volumen estimado preoperatorio de 55 mL. Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines. Se realiza evacuación por craneotomía. Se realiza incisión arciforme frontotemporal, craneotomía, apertura dural y corticotomía hasta el hematoma. Se constata coágulo organizado. Se procede a la evacuación del hematoma con aspiración e irrigación, y se evacúan aproximadamente 45 mL. Se realiza inspección de la pared de la cavidad y no se observa remanente de coágulo en la inspección. Se toma biopsia de la pared de la cavidad. Al finalizar la evacuación se constata parénquima cerebral pulsátil. Se realiza cierre dural primario y se repone el colgajo óseo. Sin complicaciones intraoperatorias'
  },

  // Descompresión por hematoma asociado a HSA
  {
    id: 'nc-hsah',
    n: 'Descompresión quirúrgica por hematoma asociado a hemorragia subaracnoidea',
    sp: 'Neurocirugía',
    sub: 'Vascular',
    cat: 'Neurocirugía vascular',
    syn: ['hematoma por HSA', 'hematoma silviano', 'craniectomía en HSA', 'evacuación de hematoma aneurismático', 'HSA con hematoma'],
    ref: refs(R_SAH, R_GREEN, R_YOUM, R_RCS),
    rev: '2026-10',
    v: 2,
    ctx: 'Evacuación de hematoma intraparenquimatoso o subdural asociado a hemorragia subaracnoidea aneurismática, con o sin craniectomía descompresiva. Si el aneurisma se clipa en el mismo acto, se documenta además con la plantilla de clipado. El tratamiento del aneurisma se registra en forma explícita',
    lat: true,
    f: [
      { id: 'thema', l: 'Tipo y localización del hematoma', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se interviene hematoma {v} asociado a hemorragia subaracnoidea', o: [
        ['Temporal', 'intraparenquimatoso temporal'],
        ['Frontal', 'intraparenquimatoso frontal'],
        ['Silviano', 'silviano'],
        ['Frontobasal / gyrus rectus', 'frontobasal'],
        ['Interhemisférico', 'interhemisférico'],
        ['Subdural agudo', 'subdural agudo'],
        ['Cerebeloso', 'cerebeloso']
      ] },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Craneotomía', 'craneotomía con evacuación del hematoma'],
        ['Craniectomía descompresiva', 'craniectomía descompresiva con evacuación del hematoma'],
        ['Craneotomía y craniectomía', 'craneotomía con evacuación del hematoma y conversión a craniectomía descompresiva'],
        ['Craniectomía suboccipital', 'craniectomía suboccipital con evacuación del hematoma']
      ] },
      { id: 'aneu', l: 'Tratamiento del aneurisma', sec: 'B', k: 'opt', q: 1, req: 1, o: [
        ['Clipado en el mismo acto', 'El aneurisma responsable se trata con clipado en el mismo acto quirúrgico, documentado en parte específico'],
        ['Tratado previamente por vía endovascular', 'El aneurisma responsable fue tratado previamente por vía endovascular'],
        ['Tratado previamente por clipado', 'El aneurisma responsable fue tratado previamente por clipado'],
        ['No tratado en este acto', 'El aneurisma responsable no se trata en este acto quirúrgico'],
        ['Sin aneurisma identificado', 'No se identifica aneurisma responsable en los estudios disponibles']
      ] },
      { id: 'hh', l: 'Hunt y Hess', sec: 'B', k: 'opt', p: 'Grado {v} de Hunt y Hess', o: GRADO_I_V },
      { id: 'wfns', l: 'WFNS', sec: 'B', k: 'opt', p: 'Grado {v} de la WFNS', o: GRADO_I_V },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: INC_CRANEO, p: 'Se realiza incisión cutánea {v}' },
      { id: 'diam', l: 'Diámetro de la craniectomía', sec: 'B', k: 'num', u: 'cm', if: ['tec', ['Craniectomía descompresiva', 'Craneotomía y craniectomía']], p: 'Defecto óseo de {v} cm de diámetro anteroposterior' },
      { id: 'dura', l: 'Apertura dural', sec: 'B', k: 'opt', p: 'Se realiza apertura dural {v}', o: [
        ['En C', 'en C'],
        ['En cruz', 'en cruz'],
        ['En estrella', 'en estrella']
      ] },
      { id: 'hall2', l: 'Hallazgos', sec: 'C', k: 'multi', q: 1, p: 'Se constata {v}', o: [
        ['Cerebro tenso', 'parénquima cerebral tenso'],
        ['HSA en cisternas', 'hemorragia subaracnoidea en cisternas'],
        ['Coágulo organizado', 'hematoma coagulado'],
        ['Sangrado activo', 'sangrado activo'],
        ['Hematoma subdural asociado', 'hematoma subdural asociado'],
        ['Protrusión del parénquima', 'protrusión del parénquima a través de la apertura dural']
      ] },
      { id: 'vole', l: 'Volumen evacuado', sec: 'D', k: 'num', u: 'mL', p: 'Se evacúan aproximadamente {v} mL' },
      { id: 'reexp', l: 'Estado cerebral al finalizar', sec: 'D', k: 'opt', q: 1, o: REEXP },
      { id: 'lterm', l: 'Fenestración de lámina terminalis', sec: 'D', k: 'yn', y: 'Se realiza fenestración de la lámina terminalis', n: 'No se realiza fenestración de la lámina terminalis' },
      { id: 'dve', l: 'Drenaje ventricular externo', sec: 'E', k: 'yn', q: 1, y: 'Se coloca drenaje ventricular externo', n: 'No se coloca drenaje ventricular externo' },
      { id: 'pic', l: 'Sensor de PIC', sec: 'E', k: 'yn', y: 'Se coloca sensor de presión intracraneana', n: 'No se coloca sensor de presión intracraneana' },
      { id: 'pict', l: 'Tipo de sensor', sec: 'E', k: 'opt', if: ['pic', 'si'], o: PIC_T },
      { id: 'picv', l: 'PIC inicial', sec: 'E', k: 'num', u: 'mmHg', if: ['pic', 'si'], p: 'Presión intracraneana inicial de {v} mmHg' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'opt', o: CDUR_DESC },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', q: 1, o: COLG },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza incisión cutánea {inc} y disección por planos',
      { t: 'Se realiza craneotomía', if: ['tec', ['Craneotomía', 'Craneotomía y craniectomía']] },
      { t: 'Se realiza craniectomía descompresiva frontotemporoparietal con descompresión temporal basal', if: ['tec', ['Craniectomía descompresiva', 'Craneotomía y craniectomía']] },
      { t: 'Se realiza craniectomía suboccipital', if: ['tec', 'Craniectomía suboccipital'] },
      'Se realiza apertura dural {dura}',
      'Se incorpora microscopio quirúrgico',
      'Se procede a la evacuación del hematoma con aspiración e irrigación',
      { t: 'Se realiza apertura de cisternas basales y drenaje de LCR', ifn: ['tec', 'Craniectomía suboccipital'] },
      { t: 'Se realiza fenestración de la lámina terminalis', if: ['lterm', 'si'] },
      'Se realiza hemostasia de la cavidad con coagulación bipolar y material hemostático',
      { t: 'Se realiza duroplastia de ampliación', if: ['tec', ['Craniectomía descompresiva', 'Craneotomía y craniectomía']] }
    ],
    ej: 'Se interviene hematoma intraparenquimatoso temporal derecho asociado a hemorragia subaracnoidea. El aneurisma responsable fue tratado previamente por vía endovascular. Grado IV de Hunt y Hess. Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines. Se realiza incisión en signo de interrogación y craniectomía descompresiva frontotemporoparietal con evacuación del hematoma, con defecto óseo de 13 cm de diámetro anteroposterior, y apertura dural en estrella. Se constata parénquima cerebral tenso y hematoma coagulado. Se evacúan aproximadamente 50 mL. Al finalizar la evacuación se constata parénquima cerebral pulsátil. Se coloca sensor de presión intracraneana intraparenquimatoso. Se realiza duroplastia de ampliación con sustituto dural. No se repone el colgajo óseo, que se envía para criopreservación. Sin complicaciones intraoperatorias'
  },

  // Descompresión microvascular (neuralgia del trigémino / espasmo hemifacial)
  {
    id: 'nc-dmv',
    n: 'Descompresión microvascular para neuralgia del trigémino',
    sp: 'Neurocirugía',
    sub: 'Funcional',
    cat: 'Neurocirugía vascular',
    syn: ['DMV', 'MVD', 'Jannetta', 'neuralgia trigeminal', 'descompresión neurovascular', 'conflicto neurovascular'],
    ref: refs(R_BARKER, R_RHOTON, R_GREEN, R_YOUM, R_RCS),
    rev: '2026-10',
    v: 2,
    def: { diag: 'Neuralgia del trigémino' },
    ctx: 'Descompresión microvascular por vía retrosigmoidea del nervio trigémino (neuralgia del trigémino) o del nervio facial (espasmo hemifacial). El conflicto neurovascular, la técnica de descompresión y las estructuras preservadas se registran tal como se constataron',
    lat: true,
    f: [
      { id: 'diag', l: 'Indicación', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [
        ['Neuralgia del trigémino', 'Se realiza descompresión microvascular del nervio trigémino por neuralgia del trigémino'],
        ['Espasmo hemifacial', 'Se realiza descompresión microvascular del nervio facial por espasmo hemifacial']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Lateral (park-bench)', 'Paciente en decúbito lateral tipo park-bench con cabeza fijada en cabezal de tres pines'],
        ['Supino, cabeza rotada con realce', 'Paciente en decúbito supino con realce bajo el hombro homolateral y cabeza rotada y fijada en cabezal de tres pines'],
        ['Semisentado', 'Paciente en posición semisentada con cabeza fijada en cabezal de tres pines']
      ] },
      { id: 'osea', l: 'Apertura ósea', sec: 'B', k: 'opt', vr: 1, q: 1, p: 'Se realiza {v} retrosigmoidea', o: [
        ['Craniectomía', 'craniectomía'],
        ['Craneotomía', 'craneotomía']
      ] },
      { id: 'seno', l: 'Exposición de senos', sec: 'B', k: 'multi', p: 'Se expone {v}', o: [
        ['Borde del seno transverso', 'el borde inferior del seno transverso'],
        ['Borde del seno sigmoideo', 'el borde posterior del seno sigmoideo'],
        ['Unión transverso-sigmoidea', 'la unión transverso-sigmoidea']
      ] },
      { id: 'mast', l: 'Apertura de celdillas mastoideas', sec: 'B', k: 'yn', y: 'Se abren celdillas mastoideas', n: 'No se abren celdillas mastoideas' },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', q: 1, y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], p: 'Se monitorean {v}', o: [
        ['PEAT', 'potenciales evocados auditivos de tronco'],
        ['EMG facial', 'electromiografía facial'],
        ['Respuesta lateral', 'respuesta lateral del nervio facial'],
        ['EMG de pares bajos', 'electromiografía de pares craneales bajos'],
        ['PESS', 'potenciales evocados somatosensitivos']
      ] },
      { id: 'lsri', l: 'Respuesta lateral al inicio', sec: 'B', k: 'opt', if: ['diag', 'Espasmo hemifacial'], o: [
        ['Presente', 'Se registra respuesta lateral al inicio del procedimiento'],
        ['Ausente', 'No se registra respuesta lateral al inicio del procedimiento']
      ] },
      { id: 'vasos', l: 'Conflicto neurovascular', sec: 'C', k: 'multi', q: 1, req: 1, p: 'Se identifica conflicto neurovascular con {v}', o: [
        ['Cerebelosa superior', 'la arteria cerebelosa superior'],
        ['AICA', 'la arteria cerebelosa anteroinferior'],
        ['PICA', 'la arteria cerebelosa posteroinferior'],
        ['Vertebral', 'la arteria vertebral'],
        ['Basilar', 'la arteria basilar'],
        ['Vena petrosa superior o tributaria', 'la vena petrosa superior o una de sus tributarias'],
        ['Vena transversa pontina', 'la vena transversa pontina'],
        ['Otra vena', 'otra estructura venosa'],
        ['Sin conflicto identificado', 'ningún vaso, sin conflicto identificable']
      ] },
      { id: 'sitt', l: 'Sitio del conflicto en el trigémino', sec: 'C', k: 'opt', if: ['diag', 'Neuralgia del trigémino'], p: 'Conflicto a nivel de {v}', o: [
        ['Zona de entrada de la raíz', 'la zona de entrada de la raíz en la protuberancia'],
        ['Porción cisternal media', 'la porción cisternal media del nervio'],
        ['Próximo al cavum de Meckel', 'la porción próxima al cavum de Meckel']
      ] },
      { id: 'sith', l: 'Sitio del conflicto en el facial', sec: 'C', k: 'opt', if: ['diag', 'Espasmo hemifacial'], p: 'Conflicto a nivel de {v}', o: [
        ['Zona de salida de la raíz', 'la zona de salida de la raíz del nervio facial en el tronco'],
        ['Unión con el tronco', 'la porción adherida a la superficie del tronco'],
        ['Porción cisternal', 'la porción cisternal del nervio']
      ] },
      { id: 'sev', l: 'Grado de compresión', sec: 'C', k: 'opt', p: 'Se constata {v}', o: [
        ['Contacto', 'contacto vascular con el nervio'],
        ['Desplazamiento o deformación', 'desplazamiento o deformación del nervio'],
        ['Indentación con surco', 'indentación del nervio con surco visible'],
        ['Atrofia o decoloración', 'atrofia o decoloración focal del nervio']
      ] },
      { id: 'arac', l: 'Aracnoides', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Engrosada', 'aracnoides engrosada'],
        ['Adherencias', 'adherencias aracnoideas']
      ] },
      { id: 'tdec', l: 'Técnica de descompresión', sec: 'D', k: 'multi', q: 1, req: 1, p: 'Se realiza descompresión mediante {v}', o: [
        ['Liberación aracnoidea', 'liberación aracnoidea'],
        ['Interposición de fieltro', 'interposición de fieltro de politetrafluoroetileno entre el vaso y el nervio'],
        ['Transposición arterial', 'transposición arterial con fijación a la duramadre'],
        ['Transposición con adhesivo', 'transposición arterial con fijación con adhesivo tisular'],
        ['Coagulación y sección de vena', 'coagulación y sección de la vena conflictiva'],
        ['Neurólisis interna', 'neurólisis interna del nervio trigémino'],
        ['Rizotomía parcial', 'rizotomía parcial del nervio trigémino']
      ] },
      { id: 'vpet', l: 'Vena petrosa superior', sec: 'D', k: 'opt', o: [
        ['Preservada', 'Se preserva la vena petrosa superior'],
        ['Coagulada parcialmente', 'Se coagulan y seccionan tributarias de la vena petrosa superior'],
        ['Coagulada y seccionada', 'Se coagula y secciona la vena petrosa superior']
      ] },
      { id: 'pres', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', q: 1, p: 'Se identifican y preservan {v}', o: [
        ['Nervio trigémino', 'el nervio trigémino'],
        ['Nervio troclear', 'el nervio troclear'],
        ['Complejo VII-VIII', 'el complejo facial-vestibulococlear'],
        ['Pares bajos', 'los pares craneales bajos'],
        ['Arteria laberíntica', 'la arteria laberíntica'],
        ['Perforantes del tronco', 'las perforantes del tronco']
      ] },
      { id: 'lsrf', l: 'Respuesta lateral tras la descompresión', sec: 'D', k: 'opt', if: ['diag', 'Espasmo hemifacial'], o: [
        ['Desaparece', 'Se registra desaparición de la respuesta lateral tras la descompresión'],
        ['Disminuye', 'Se registra disminución de la respuesta lateral tras la descompresión'],
        ['Persiste', 'Se registra persistencia de la respuesta lateral tras la descompresión']
      ] },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], o: MNIO_RES },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', o: CDUR, p: 'Se realiza {v}' },
      { id: 'creco', l: 'Reconstrucción ósea', sec: 'G', k: 'opt', o: [
        ['Colgajo repuesto', 'Se repone el colgajo óseo'],
        ['Cemento óseo', 'Se realiza craneoplastia con cemento óseo'],
        ['Malla de titanio', 'Se realiza craneoplastia con malla de titanio'],
        ['Sin reconstrucción', 'No se realiza reconstrucción ósea']
      ] },
      { id: 'fij', l: 'Fijación', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija con {v}' }
    ],
    pasos: [
      'Se realiza incisión retroauricular lineal y disección muscular hasta el plano óseo',
      'Se realiza {osea} retrosigmoidea',
      { t: 'Se ocluyen las celdillas mastoideas con cera para hueso', if: ['mast', 'si'] },
      'Se realiza apertura dural con base hacia el seno sigmoideo',
      'Se incorpora microscopio quirúrgico',
      { t: 'Se drena LCR de la cisterna del ángulo pontocerebeloso', if: ['diag', 'Neuralgia del trigémino'] },
      { t: 'Se drena LCR de la cisterna cerebelomedular lateral', if: ['diag', 'Espasmo hemifacial'] },
      { t: 'Se realiza disección supracerebelosa lateral a lo largo del tentorio', if: ['diag', 'Neuralgia del trigémino'] },
      { t: 'Se identifica y diseca el complejo venoso petroso superior', if: ['diag', 'Neuralgia del trigémino'] },
      { t: 'Se identifica el nervio trigémino desde la zona de entrada de la raíz hasta el cavum de Meckel', if: ['diag', 'Neuralgia del trigémino'] },
      { t: 'Se realiza disección infrafloccular por debajo del complejo facial-vestibulococlear siguiendo los pares craneales bajos', if: ['diag', 'Espasmo hemifacial'] },
      { t: 'Se eleva el flóculo y el plexo coroideo del foramen de Luschka', if: ['diag', 'Espasmo hemifacial'] },
      { t: 'Se identifica la zona de salida de la raíz del nervio facial en el tronco', if: ['diag', 'Espasmo hemifacial'] },
      'Se libera la aracnoides alrededor del nervio y del vaso conflictivo',
      'Se moviliza el vaso conflictivo y se realiza descompresión mediante {tdec}',
      'Se inspecciona el nervio en toda su longitud en busca de conflictos adicionales',
      'Se realiza irrigación del ángulo pontocerebeloso con solución fisiológica tibia',
      'Se realiza cierre dural hermético'
    ],
    ej: 'Se realiza descompresión microvascular del nervio trigémino por neuralgia del trigémino derecha. Paciente en decúbito lateral tipo park-bench con cabeza fijada en cabezal de tres pines. Se realiza monitoreo neurofisiológico intraoperatorio de potenciales evocados auditivos de tronco. Se realiza incisión retroauricular y craniectomía retrosigmoidea con exposición de la unión transverso-sigmoidea, y se ocluyen las celdillas mastoideas con cera para hueso. Se realiza disección supracerebelosa lateral a lo largo del tentorio y se identifica el nervio trigémino. Se identifica conflicto neurovascular con la arteria cerebelosa superior a nivel de la zona de entrada de la raíz en la protuberancia, con indentación del nervio con surco visible. Se realiza descompresión mediante liberación aracnoidea e interposición de fieltro de politetrafluoroetileno entre el vaso y el nervio. Se preserva la vena petrosa superior. Se identifican y preservan el nervio troclear y el complejo facial-vestibulococlear. No se registran cambios en el monitoreo neurofisiológico. Se realiza cierre dural primario con sutura continua y refuerzo con sellante dural, y craneoplastia con cemento óseo. Sin complicaciones intraoperatorias'
  },

  // Descompresión microvascular para espasmo hemifacial → variante de nc-dmv
  {
    id: 'nc-dmv-hfs',
    n: 'Descompresión microvascular para espasmo hemifacial',
    cat: 'Neurocirugía vascular',
    syn: ['espasmo hemifacial', 'DMV del facial', 'MVD', 'Jannetta', 'conflicto neurovascular del facial'],
    alias: 'nc-dmv',
    set: { diag: 'Espasmo hemifacial' }
  }
];
