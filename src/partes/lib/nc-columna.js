// Biblioteca de partes quirúrgicos · Neurocirugía · Columna y otros procedimientos (versión 2)
// Datos puros. Convención para campos citados en `pasos` con {id}: la frase de la opción es un fragmento que se
// inserta tal cual dentro del paso; `p` es el envoltorio que se usa cuando el campo se escribe por sí solo.
// Las constantes de opciones se copian de neurocirugia.js (el formato no admite imports) y se amplían.

// ---------- Fuentes ----------

const R_GREEN = 'Greenberg MS. Handbook of Neurosurgery, 10.ª ed. Thieme, 2023';
const R_BENZEL = 'Steinmetz MP, Berven SH, Benzel EC (eds). Benzel\'s Spine Surgery: Techniques, Complication Avoidance, and Management, 5.ª ed. Elsevier, 2022';
const R_AO = 'AO Spine. AO Surgery Reference, módulo Spine (surgeryreference.aofoundation.org/spine)';
const R_RCS = 'Royal College of Surgeons of England. Good Surgical Practice, 2014, apartado 1.3 (registro operatorio)';
const R_NASS_HD = 'North American Spine Society. Evidence-Based Clinical Guidelines: Diagnosis and Treatment of Lumbar Disc Herniation with Radiculopathy, 2012';
const R_NASS_EST = 'North American Spine Society. Evidence-Based Clinical Guidelines: Diagnosis and Treatment of Degenerative Lumbar Spinal Stenosis, 2011';
const R_NASS_CERV = 'North American Spine Society. Evidence-Based Clinical Guidelines: Diagnosis and Treatment of Cervical Radiculopathy from Degenerative Disorders, 2010';
const R_NASS_SPL = 'North American Spine Society. Evidence-Based Clinical Guidelines: Diagnosis and Treatment of Degenerative Lumbar Spondylolisthesis, 2.ª ed., 2014';
const R_FUS = 'AANS/CNS Joint Section on Disorders of the Spine and Peripheral Nerves. Guideline update for the performance of fusion procedures for degenerative disease of the lumbar spine. J Neurosurg Spine 2014;21(1):1-139';
const R_SR = 'Smith GW, Robinson RA. The treatment of certain cervical-spine disorders by anterior removal of the intervertebral disc and interbody fusion. J Bone Joint Surg Am 1958;40-A(3):607-24';
const R_HIRA = 'Hirabayashi K, Watanabe K, Wakano K, et al. Expansive open-door laminoplasty for cervical spinal stenotic myelopathy. Spine 1983;8(7):693-9';
const R_HARMS = 'Harms J, Melcher RP. Posterior C1-C2 fusion with polyaxial screw and rod fixation. Spine 2001;26(22):2467-71';
const R_FOLEY = 'Foley KT, Holly LT, Schwender JD. Minimally invasive lumbar fusion. Spine 2003;28(15 Suppl):S26-35';
const R_RUETTEN = 'Ruetten S, Komp M, Merk H, Godolias G. Full-endoscopic interlaminar and transforaminal lumbar discectomy versus conventional microsurgical technique. Spine 2008;33(9):931-9';
const R_SCI = 'Fehlings MG, Tetreault LA, Wilson JR, et al. A clinical practice guideline for the management of patients with acute spinal cord injury and central cord syndrome: recommendations on the timing of decompressive surgery. Global Spine J 2017;7(3 Suppl):84S-94S';
const R_SCI_AANS = 'Hadley MN, Walters BC, et al. Guidelines for the management of acute cervical spine and spinal cord injuries. Neurosurgery 2013;72(Suppl 2)';
const R_SINS = 'Fisher CG, DiPaola CP, Ryken TC, et al. A novel classification system for spinal instability in neoplastic disease. Spine 2010;35(22):E1221-9';
const R_NOMS = 'Laufer I, Rubin DG, Lis E, et al. The NOMS framework: approach to the treatment of spinal metastatic tumors. Oncologist 2013;18(6):744-51';
const R_KOTH = 'Kothbauer KF, Deletis V, Epstein FJ. Motor-evoked potential monitoring for intramedullary spinal cord tumor surgery. Neurosurg Focus 1998;4(5):e1';
const R_CES = 'GIRFT, BASS, SBNS. National Suspected Cauda Equina Syndrome (CES) Pathway, febrero de 2023';
const R_NICE_VP = 'NICE. Technology appraisal guidance TA279. Percutaneous vertebroplasty and percutaneous balloon kyphoplasty for treating osteoporotic vertebral compression fractures, 2013';
const R_CHIARI = 'Pattisapu JV, Ackerman LL, Infinger LK, et al. Congress of Neurological Surgeons Systematic Review and Evidence-Based Guidelines for Patients With Chiari Malformation: Surgical Interventions. Neurosurgery 2023;93(4):731-5';
const R_PANG = 'Pang D, Wilberger JE Jr. Tethered cord syndrome in adults. J Neurosurg 1982;57(1):32-47';
const R_MMC = 'Congress of Neurological Surgeons. Systematic Review and Evidence-Based Guidelines for Pediatric Myelomeningocele. Neurosurgery 2019 (serie de capítulos; incluye momento del cierre y ventriculomegalia)';
const R_CTS = 'American Academy of Orthopaedic Surgeons. Management of Carpal Tunnel Syndrome, Evidence-Based Clinical Practice Guideline, 2024';
const R_KASSAM = 'Kassam A, Snyderman CH, Mintz A, Gardner P, Carrau RL. Expanded endonasal approach: the rostrocaudal axis. Part I. Crista galli to the sella turcica. Neurosurg Focus 2005;19(1):E3';
const R_HADAD = 'Hadad G, Bassagasteguy L, Carrau RL, et al. A novel reconstructive technique after endoscopic expanded endonasal approaches: vascular pedicle nasoseptal flap. Laryngoscope 2006;116(10):1882-6';
const R_ESPOSITO = 'Esposito F, Dusick JR, Fatemi N, Kelly DF. Graded repair of cranial base defects and cerebrospinal fluid leaks in transsphenoidal surgery. Neurosurgery 2007;60(4 Suppl 2):295-303';
const R_RHOTON = 'Rhoton AL Jr. Rhoton\'s Cranial Anatomy and Surgical Approaches. Congress of Neurological Surgeons / Lippincott Williams & Wilkins, 2003';

const REV = '2026-10';

// ---------- Opciones compartidas ----------

const VERT = [
  ['C1', 'C1'], ['C2', 'C2'], ['C3', 'C3'], ['C4', 'C4'], ['C5', 'C5'], ['C6', 'C6'], ['C7', 'C7'],
  ['T1', 'T1'], ['T2', 'T2'], ['T3', 'T3'], ['T4', 'T4'], ['T5', 'T5'], ['T6', 'T6'], ['T7', 'T7'],
  ['T8', 'T8'], ['T9', 'T9'], ['T10', 'T10'], ['T11', 'T11'], ['T12', 'T12'],
  ['L1', 'L1'], ['L2', 'L2'], ['L3', 'L3'], ['L4', 'L4'], ['L5', 'L5'], ['S1', 'S1']
];

const VERT_C = [
  ['C2', 'C2'], ['C3', 'C3'], ['C4', 'C4'], ['C5', 'C5'], ['C6', 'C6'], ['C7', 'C7'], ['T1', 'T1']
];

const VERT_OC = [
  ['Occipucio', 'el occipucio'], ['C1', 'C1'], ['C2', 'C2'], ['C3', 'C3'], ['C4', 'C4'], ['C5', 'C5'], ['C6', 'C6'],
  ['C7', 'C7'], ['T1', 'T1'], ['T2', 'T2'], ['T3', 'T3']
];

const VERT_TL = [
  ['T1', 'T1'], ['T2', 'T2'], ['T3', 'T3'], ['T4', 'T4'], ['T5', 'T5'], ['T6', 'T6'], ['T7', 'T7'],
  ['T8', 'T8'], ['T9', 'T9'], ['T10', 'T10'], ['T11', 'T11'], ['T12', 'T12'],
  ['L1', 'L1'], ['L2', 'L2'], ['L3', 'L3'], ['L4', 'L4'], ['L5', 'L5'], ['S1', 'S1'], ['S2', 'S2'], ['Ilíaco', 'el ilíaco']
];

const VERT_L = [
  ['T12', 'T12'], ['L1', 'L1'], ['L2', 'L2'], ['L3', 'L3'], ['L4', 'L4'], ['L5', 'L5'], ['S1', 'S1'], ['S2', 'S2'], ['Ilíaco', 'el ilíaco']
];

const DISC_C = [
  ['C2-C3', 'C2-C3'], ['C3-C4', 'C3-C4'], ['C4-C5', 'C4-C5'], ['C5-C6', 'C5-C6'], ['C6-C7', 'C6-C7'], ['C7-T1', 'C7-T1']
];

const DISC_L = [
  ['T12-L1', 'T12-L1'], ['L1-L2', 'L1-L2'], ['L2-L3', 'L2-L3'], ['L3-L4', 'L3-L4'], ['L4-L5', 'L4-L5'], ['L5-S1', 'L5-S1']
];

const REG = [
  ['Cervical', 'cervical'],
  ['Torácica', 'torácica'],
  ['Toracolumbar', 'toracolumbar'],
  ['Lumbar', 'lumbar'],
  ['Lumbosacra', 'lumbosacra']
];

const LADO = [['Derecha', 'derecha'], ['Izquierda', 'izquierda'], ['Bilateral', 'bilateral']];
const LADO_UNI = [['Derecha', 'derecha'], ['Izquierda', 'izquierda']];

const PRIM = [['Cirugía primaria', 'cirugía primaria'], ['Revisión', 'cirugía de revisión']];

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

const POS_CANT = [
  ['Supino, cuello en leve extensión', 'Paciente en decúbito supino con rodete interescapular y cuello en leve extensión'],
  ['Supino, cuello neutro', 'Paciente en decúbito supino con cuello en posición neutra'],
  ['Supino con tracción cervical', 'Paciente en decúbito supino con tracción cervical con pinzas de Gardner-Wells'],
  ['Supino, tracción de hombros', 'Paciente en decúbito supino con tracción caudal de los hombros fijada con cinta adhesiva']
];

const POS_CPOST = [
  ['Prono, cabezal de tres pines', 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines y cuello en posición neutra'],
  ['Prono, cabezal, leve flexión', 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines y cuello en leve flexión'],
  ['Prono, apoyacabezas en herradura', 'Paciente en decúbito prono con cabeza sobre apoyacabezas en herradura'],
  ['Prono con tracción cervical', 'Paciente en decúbito prono con tracción cervical con pinzas de Gardner-Wells'],
  ['Semisentado', 'Paciente en posición semisentada con cabeza fijada en cabezal de tres pines']
];

const POS_CRANEO = [
  ['Supino, cabeza fijada en cabezal de tres pines', 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines'],
  ['Supino, cabeza rotada y fijada', 'Paciente en decúbito supino con cabeza rotada hacia el lado contralateral y fijada en cabezal de tres pines'],
  ['Supino, cabeza en extensión y fijada', 'Paciente en decúbito supino con cabeza en leve extensión y fijada en cabezal de tres pines'],
  ['Supino, cabeza en apoyo en herradura', 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura'],
  ['Lateral (park-bench)', 'Paciente en decúbito lateral tipo park-bench con cabeza fijada en cabezal de tres pines'],
  ['Prono, cabeza fijada', 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines'],
  ['Semisentado', 'Paciente en posición semisentada con cabeza fijada en cabezal de tres pines']
];

const MARCA_NIVEL = [
  ['Radioscopía', 'mediante radioscopía'],
  ['Radiografía intraoperatoria', 'mediante radiografía intraoperatoria'],
  ['Navegación', 'mediante navegación intraoperatoria'],
  ['Conteo radioscópico desde el sacro', 'mediante conteo radioscópico desde el sacro'],
  ['Conteo radioscópico desde C2', 'mediante conteo radioscópico desde C2'],
  ['Marcador preoperatorio', 'mediante marcador colocado en forma preoperatoria y radioscopía'],
  ['Reparos anatómicos', 'según reparos anatómicos']
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
  ['Pérdida de potenciales', 'Se registra pérdida de los potenciales'],
  ['Descargas EMG', 'Se registran descargas en la electromiografía libre durante la manipulación radicular']
];

const MNIO_ALERTA = [
  ['Aviso a anestesia y aumento de PAM', 'aviso a anestesia y aumento de la presión arterial media'],
  ['Revisión del posicionamiento', 'revisión del posicionamiento del paciente'],
  ['Suspensión de la maniobra', 'suspensión transitoria de la maniobra en curso'],
  ['Irrigación con solución tibia', 'irrigación del campo con solución fisiológica tibia'],
  ['Revisión o retiro de implante', 'revisión o retiro del último implante colocado'],
  ['Liberación de la retracción', 'liberación de la retracción'],
  ['Prueba de despertar', 'prueba de despertar intraoperatoria']
];

const DUROT_REP = [
  ['Sutura primaria', 'sutura primaria'],
  ['Sutura y sellante', 'sutura primaria y sellante dural'],
  ['Parche de grasa y sellante', 'parche de grasa autóloga y sellante dural'],
  ['Parche muscular y sellante', 'parche muscular autólogo y sellante dural'],
  ['Sustituto dural y sellante', 'sustituto dural y sellante dural'],
  ['Solo sellante', 'sellante dural'],
  ['Clips para durotomía', 'clips no penetrantes para durotomía']
];

const CDUR_ESP = [
  ['Sutura continua hermética', 'cierre dural primario hermético con sutura continua'],
  ['Puntos separados', 'cierre dural primario con puntos separados'],
  ['Duroplastia con sustituto dural', 'duroplastia con sustituto dural'],
  ['Duroplastia con fascia autóloga', 'duroplastia con injerto de fascia autóloga'],
  ['Refuerzo con sellante', 'refuerzo de la línea de sutura con sellante dural'],
  ['Refuerzo con parche de grasa', 'refuerzo con parche de grasa autóloga'],
  ['Puntos de suspensión dural', 'puntos de suspensión dural lateral']
];

const CAGE_MAT = [
  ['PEEK', 'de PEEK'],
  ['Titanio', 'de titanio'],
  ['PEEK recubierto de titanio', 'de PEEK recubierto de titanio'],
  ['Titanio poroso', 'de titanio poroso'],
  ['Titanio impreso 3D', 'de titanio de manufactura aditiva']
];

const INJ = [
  ['Autoinjerto local', 'autoinjerto óseo local'],
  ['Autoinjerto de cresta ilíaca', 'autoinjerto de cresta ilíaca'],
  ['Aloinjerto', 'aloinjerto óseo'],
  ['Sustituto óseo sintético', 'sustituto óseo sintético'],
  ['Matriz ósea desmineralizada', 'matriz ósea desmineralizada'],
  ['Médula ósea aspirada', 'aspirado de médula ósea autóloga']
];

const CTRL = [
  ['Radioscopía AP y lateral', 'radioscopía en proyecciones anteroposterior y lateral'],
  ['Radiografía intraoperatoria', 'radiografía intraoperatoria'],
  ['TC intraoperatoria', 'TC intraoperatoria'],
  ['Fluoroscopía 3D', 'fluoroscopía tridimensional'],
  ['Navegación', 'navegación'],
  ['EMG estimulada de tornillos', 'estimulación electromiográfica de los tornillos'],
  ['Palpación de trayectos', 'palpación de las paredes de cada trayecto con sonda']
];

const NAVT = [
  ['TC intraoperatoria', 'TC intraoperatoria'],
  ['Fluoroscopía 3D', 'fluoroscopía tridimensional'],
  ['TC preoperatoria', 'TC preoperatoria con registro sobre superficie ósea']
];

const TINS = [
  ['Manos libres', 'a mano libre según reparos anatómicos'],
  ['Guiada por radioscopía', 'bajo guía radioscópica'],
  ['Navegada', 'bajo navegación'],
  ['Percutánea', 'en forma percutánea bajo guía radioscópica'],
  ['Asistida por robot', 'con asistencia robótica']
];

const BARR = [
  ['Dos barras de titanio', 'Se colocan dos barras de titanio'],
  ['Dos barras de cromo-cobalto', 'Se colocan dos barras de cromo-cobalto'],
  ['Barras múltiples', 'Se colocan barras múltiples con conectores'],
  ['Barras de transición', 'Se colocan barras de transición de diámetro variable']
];

const DTIPO_COLUMNA = [
  ['Subfascial aspirativo', 'subfascial aspirativo'],
  ['Epidural aspirativo', 'epidural aspirativo'],
  ['Subcutáneo', 'subcutáneo'],
  ['Prevertebral aspirativo', 'prevertebral aspirativo'],
  ['Retroperitoneal aspirativo', 'retroperitoneal aspirativo'],
  ['Subfascial a caída libre', 'subfascial a caída libre']
];

const DTIPO_CRANEO = [
  ['Subgaleal', 'subgaleal'],
  ['Epidural', 'epidural'],
  ['Subdural', 'subdural'],
  ['En lecho quirúrgico', 'en el lecho quirúrgico'],
  ['Subgaleal aspirativo', 'subgaleal aspirativo'],
  ['Subgaleal a caída libre', 'subgaleal a caída libre']
];

const CIERRE_POST = [
  ['Musculatura paravertebral', 'aproximación de la musculatura paravertebral'],
  ['Fascia, puntos separados', 'cierre de la fascia con puntos separados de material reabsorbible'],
  ['Fascia, sutura continua', 'cierre de la fascia con sutura continua de material reabsorbible'],
  ['Fascia hermética', 'cierre hermético de la fascia'],
  ['Ligamento supraespinoso', 'reinserción del ligamento supraespinoso'],
  ['Tejido celular subcutáneo', 'cierre del tejido celular subcutáneo con material reabsorbible'],
  ['Terapia de presión negativa', 'colocación de sistema de terapia de presión negativa sobre la herida']
];

const CIERRE_ANT_C = [
  ['Platisma', 'aproximación del músculo platisma con sutura reabsorbible'],
  ['Tejido celular subcutáneo', 'cierre del tejido celular subcutáneo con material reabsorbible']
];

const EXT_RES = [
  ['Resección completa macroscópica', 'Se realiza resección completa macroscópica de la lesión'],
  ['Resección casi total', 'Se realiza resección casi total de la lesión'],
  ['Resección subtotal', 'Se realiza resección subtotal de la lesión'],
  ['Resección parcial', 'Se realiza resección parcial de la lesión'],
  ['Biopsia', 'Se realiza toma de biopsia de la lesión, sin resección']
];

const ADJ_MICRO = [
  ['Microscopio quirúrgico', 'microscopio quirúrgico'],
  ['Exoscopio', 'exoscopio'],
  ['Endoscopio', 'endoscopio'],
  ['Ecografía intraoperatoria', 'ecografía intraoperatoria'],
  ['Aspirador ultrasónico', 'aspirador ultrasónico'],
  ['Fluoresceína sódica', 'fluorescencia con fluoresceína sódica'],
  ['Ácido 5-aminolevulínico', 'fluorescencia con ácido 5-aminolevulínico']
];

const HALL_DEG = [
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
  ['Lipomatosis epidural', 'lipomatosis epidural'],
  ['Compresión del saco dural', 'compresión del saco dural'],
  ['Saco sin pulsatilidad', 'saco dural sin pulsatilidad'],
  ['Movilidad anormal del segmento', 'movilidad anormal del segmento']
];

const COLG = [
  ['Repuesto', 'Se repone el colgajo óseo'],
  ['No repuesto, criopreservado', 'No se repone el colgajo óseo, que se envía para criopreservación'],
  ['No repuesto, descartado', 'No se repone el colgajo óseo, que se descarta'],
  ['Craneoplastia en el mismo acto', 'Se realiza craneoplastia en el mismo acto quirúrgico']
];

const FIJ_COLG = [
  ['Placas y tornillos de titanio', 'miniplacas y tornillos de titanio'],
  ['Sistema de fijación tipo clamp', 'sistema de fijación craneal tipo clamp'],
  ['Puntos transóseos', 'puntos transóseos'],
  ['Cemento óseo', 'cemento óseo']
];

const CDUR_CRANEO = [
  ['Primario, sutura continua', 'cierre dural primario con sutura continua'],
  ['Primario, puntos separados', 'cierre dural primario con puntos separados'],
  ['Duroplastia con pericráneo', 'duroplastia con injerto de pericráneo autólogo'],
  ['Duroplastia con fascia autóloga', 'duroplastia con injerto de fascia autóloga'],
  ['Duroplastia con sustituto dural', 'duroplastia con sustituto dural'],
  ['Injerto de grasa autóloga', 'colocación de injerto de grasa autóloga'],
  ['Refuerzo con sellante', 'refuerzo de la línea de sutura con sellante dural']
];

// ---------- Bloques de campos compartidos (datos, se insertan con ...) ----------

const MNIO_F = [
  { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', req: 1, q: 1, y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
  { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], req: 1, o: MNIO_ESP, p: 'Se monitorean {v}' },
  { id: 'mniob', l: 'Registros basales', sec: 'B', k: 'yn', if: ['mnio', 'si'], y: 'Se obtienen registros basales luego del posicionamiento', n: 'No se obtienen registros basales luego del posicionamiento' },
  { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], req: 1, o: MNIO_RES },
  { id: 'mnioa', l: 'Conducta ante alerta del monitoreo', sec: 'D', k: 'multi', if: ['mnior', ['Caída transitoria', 'Caída persistente', 'Pérdida de potenciales', 'Descargas EMG']], o: MNIO_ALERTA, p: 'Ante la alerta del monitoreo se realiza {v}' }
];

const DUROT_F = [
  { id: 'durot', l: 'Durotomía incidental', sec: 'D', k: 'yn', req: 1, q: 1, y: 'Se produce durotomía incidental', n: 'No se produce durotomía incidental' },
  { id: 'durotl', l: 'Localización y tamaño de la durotomía', sec: 'D', k: 'text', if: ['durot', 'si'], p: 'Durotomía localizada {v}', ph: 'en la cara lateral derecha del saco a nivel L4-L5, de 5 mm, con aracnoides indemne' },
  { id: 'durotr', l: 'Reparación de la durotomía', sec: 'D', k: 'multi', if: ['durot', 'si'], req: 1, o: DUROT_REP, p: 'Se repara la durotomía con {v}' },
  { id: 'durotv', l: 'Prueba de Valsalva', sec: 'D', k: 'yn', if: ['durot', 'si'], y: 'Se realiza maniobra de Valsalva para evaluar la estanqueidad de la reparación', n: 'No se realiza maniobra de Valsalva' }
];

const NAV_F = [
  { id: 'nav', l: 'Navegación', sec: 'B', k: 'yn', y: 'Se utiliza navegación intraoperatoria', n: 'No se utiliza navegación intraoperatoria' },
  { id: 'navt', l: 'Tipo de navegación', sec: 'B', k: 'opt', if: ['nav', 'si'], o: NAVT, p: 'Navegación basada en {v}' },
  { id: 'navref', l: 'Ubicación de la referencia', sec: 'B', k: 'text', if: ['nav', 'si'], p: 'Se fija la referencia de navegación en {v}', ph: 'la apófisis espinosa de L3 / la cresta ilíaca posterior derecha' }
];

const TRAZ_F = { id: 'traz', l: 'Trazabilidad de implantes', sec: 'E', k: 'yn', y: 'Se adjuntan a la historia clínica las etiquetas de trazabilidad de los implantes', n: 'No se adjuntan las etiquetas de trazabilidad de los implantes' };

const DREN_COL = { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_COLUMNA, p: 'Se deja drenaje {v}' };
const CIERRE_P = { id: 'cierre', l: 'Cierre por planos', sec: 'G', k: 'multi', o: CIERRE_POST, p: 'Se realiza {v}' };
const CIERRE_AC = { id: 'cierre', l: 'Cierre por planos', sec: 'G', k: 'multi', o: CIERRE_ANT_C, p: 'Se realiza {v}' };
const PRIM_F = { id: 'prim', l: 'Primaria o revisión', sec: 'A', k: 'opt', vr: 1, q: 1, o: PRIM };
const MARCA_F = { id: 'marca', l: 'Confirmación del nivel', sec: 'B', k: 'opt', req: 1, q: 1, o: MARCA_NIVEL, p: 'Se confirma el nivel {v}' };
const COLLAR_F = { id: 'collar', l: 'Ortesis cervical', sec: 'H', k: 'opt', o: [
  ['Collar blando', 'Se coloca collar cervical blando'],
  ['Collar rígido', 'Se coloca collar cervical rígido'],
  ['Halo chaleco', 'Se coloca halo chaleco'],
  ['Sin ortesis', 'No se coloca ortesis cervical']
] };

// ---------- Plantillas ----------

export default [
  // ===================== Columna cervical =====================

  // ACDF
  {
    id: 'nc-acdf',
    n: 'Discectomía cervical anterior y artrodesis (ACDF)',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna cervical',
    syn: ['ACDF', 'discectomía cervical anterior', 'artrodesis cervical anterior', 'Smith-Robinson', 'Cloward', 'hernia de disco cervical', 'cage cervical', 'placa cervical anterior'],
    v: 2,
    ctx: 'Radiculopatía o mielopatía cervical por hernia discal o complejo disco-osteofitario de uno o más niveles, tratada por vía anterior con discectomía, descompresión y artrodesis intersomática con o sin placa. Niveles, confirmación radioscópica del nivel e implante por nivel son obligatorios. La artroplastia discal no está incluida en esta plantilla',
    lat: false,
    ref: [R_SR, R_BENZEL, R_AO, R_NASS_CERV, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Niveles', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: DISC_C, p: 'Se interviene a nivel de {v}' },
      { id: 'lado', l: 'Lado del abordaje', sec: 'B', k: 'opt', vr: 1, q: 1, o: [['Derecho', 'del lado derecho'], ['Izquierdo', 'del lado izquierdo']], p: 'Se realiza abordaje cervical anterior {v}' },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CANT },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: [
        ['Transversa en pliegue cutáneo', 'transversa en un pliegue cutáneo cervical'],
        ['Oblicua preesternocleidomastoidea', 'oblicua sobre el borde anterior del esternocleidomastoideo'],
        ['Sobre cicatriz previa', 'sobre la cicatriz previa']
      ], p: 'Se realiza incisión cutánea {v}' },
      MARCA_F,
      ...MNIO_F,
      { id: 'hdisc', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Hernia blanda', 'hernia discal blanda'],
        ['Extrusión', 'hernia discal extruida'],
        ['Secuestro', 'fragmento discal secuestrado por detrás del ligamento longitudinal posterior'],
        ['Complejo disco-osteofitario', 'complejo disco-osteofitario'],
        ['Osteofitos uncovertebrales', 'osteofitos uncovertebrales'],
        ['Rotura del LLP', 'rotura del ligamento longitudinal posterior'],
        ['LLP hipertrófico u osificado', 'ligamento longitudinal posterior hipertrófico u osificado'],
        ['Disco degenerado', 'disco degenerado con pérdida de altura'],
        ['Compresión radicular', 'compresión radicular'],
        ['Compresión medular', 'compresión medular'],
        ['Fusión o material previo', 'material de osteosíntesis o fusión previa en nivel adyacente']
      ] },
      { id: 'llp', l: 'Ligamento longitudinal posterior', sec: 'D', k: 'yn', q: 1, y: 'Se realiza apertura y resección del ligamento longitudinal posterior', n: 'Se preserva el ligamento longitudinal posterior' },
      { id: 'unc', l: 'Descompresión uncovertebral', sec: 'D', k: 'opt', o: [
        ['Bilateral', 'Se realiza descompresión uncovertebral y foraminotomía anterior bilateral'],
        ['Derecha', 'Se realiza descompresión uncovertebral y foraminotomía anterior derecha'],
        ['Izquierda', 'Se realiza descompresión uncovertebral y foraminotomía anterior izquierda'],
        ['No se realiza', 'No se realiza descompresión uncovertebral']
      ] },
      { id: 'dneu', l: 'Estructuras descomprimidas', sec: 'D', k: 'multi', q: 1, p: 'Se realiza descompresión de {v}', o: [
        ['Saco dural', 'el saco dural'],
        ['Médula cervical', 'la médula cervical'],
        ['Raíz derecha', 'la raíz derecha del nivel'],
        ['Raíz izquierda', 'la raíz izquierda del nivel'],
        ['Ambas raíces', 'ambas raíces del nivel']
      ] },
      { id: 'raiz', l: 'Raíces descomprimidas', sec: 'D', k: 'text', p: 'Se descomprimen las raíces {v}', ph: 'C6 derecha y C7 bilateral' },
      { id: 'estp', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', p: 'Se identifican y preservan {v}', o: [
        ['Eje carotídeo', 'el eje carotídeo'],
        ['Eje visceral', 'el eje visceral traqueoesofágico'],
        ['Nervio laríngeo recurrente', 'el nervio laríngeo recurrente'],
        ['Nervio laríngeo superior', 'el nervio laríngeo superior'],
        ['Arteria vertebral', 'la arteria vertebral'],
        ['Músculos largos del cuello', 'los músculos largos del cuello'],
        ['Cadena simpática cervical', 'la cadena simpática cervical'],
        ['Conducto torácico', 'el conducto torácico']
      ] },
      ...DUROT_F,
      { id: 'impl', l: 'Implante intersomático', sec: 'E', k: 'opt', req: 1, q: 1, o: [
        ['Cage aislado', 'Se coloca dispositivo intersomático sin fijación integrada'],
        ['Cage con fijación integrada', 'Se coloca dispositivo intersomático con tornillos o anclajes integrados'],
        ['Aloinjerto estructural', 'Se coloca aloinjerto óseo estructural intersomático'],
        ['Injerto tricortical de cresta ilíaca', 'Se coloca autoinjerto tricortical de cresta ilíaca intersomático']
      ] },
      { id: 'cmat', l: 'Material del dispositivo', sec: 'E', k: 'opt', if: ['impl', ['Cage aislado', 'Cage con fijación integrada']], o: CAGE_MAT, p: 'Dispositivo intersomático {v}' },
      { id: 'implv', l: 'Implante por nivel (medidas)', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se colocan {v}', ph: 'dispositivo de 6 mm de altura, 14 × 12 mm y 7° de lordosis en C5-C6; de 7 mm en C6-C7' },
      { id: 'crel', l: 'Relleno del dispositivo', sec: 'E', k: 'multi', o: INJ, p: 'Se rellena el dispositivo con {v}' },
      { id: 'placa', l: 'Placa anterior', sec: 'E', k: 'opt', q: 1, o: [
        ['Placa anterior', 'Se realiza fijación con placa cervical anterior de titanio y tornillos'],
        ['Sin placa', 'No se coloca placa cervical anterior']
      ] },
      { id: 'placav', l: 'Medidas de placa y tornillos', sec: 'E', k: 'text', if: ['placa', 'Placa anterior'], req: 1, p: 'Placa y tornillos {v}', ph: 'de 37,5 mm de longitud, con 6 tornillos de ángulo variable de 4,0 × 14 mm en C5, C6 y C7' },
      { id: 'ctrl', l: 'Control de implantes', sec: 'D', k: 'multi', q: 1, o: CTRL, p: 'Se realiza control de la posición de los implantes mediante {v}' },
      TRAZ_F,
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_COLUMNA, p: 'Se deja drenaje {v}' },
      CIERRE_AC,
      COLLAR_F
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea cervical anterior {lado}',
      'Se realiza sección del platisma y disección subplatismal',
      'Se diseca por el plano entre el músculo esternocleidomastoideo y el paquete carotídeo, lateralmente, y el eje visceral, medialmente',
      'Se incide la fascia prevertebral y se expone la cara anterior de la columna',
      'Se realiza control radioscópico del nivel con aguja espinal en el disco',
      { t: 'Se realiza disección a través del tejido cicatrizal y se expone el material previo', if: ['prim', 'Revisión'] },
      { t: 'Se retira la placa previa', if: ['prim', 'Revisión'] },
      'Se realiza disección subperióstica de los músculos largos del cuello',
      'Se colocan separadores autoestáticos por debajo de los músculos largos del cuello',
      'Se colocan pines de distracción intervertebral',
      'Se incorpora microscopio quirúrgico',
      'Se realiza anulotomía y discectomía con pinzas y curetas hasta el ligamento longitudinal posterior',
      'Se realiza resección de osteofitos posteriores con fresado de alta velocidad y pinzas de Kerrison',
      { t: 'Se realiza apertura y resección del ligamento longitudinal posterior', if: ['llp', 'si'] },
      { t: 'Se realiza descompresión uncovertebral con fresado y pinzas de Kerrison', ifn: ['unc', 'No se realiza'] },
      'Se explora el espacio epidural ventral y los forámenes con gancho romo',
      'Se realiza preparación de los platillos vertebrales preservando la cortical',
      'Se realiza medición del espacio con implantes de prueba bajo control radioscópico',
      'Se coloca el dispositivo intersomático y se libera la distracción',
      { t: 'Se coloca placa cervical anterior y se fijan los tornillos con su mecanismo de bloqueo', if: ['placa', 'Placa anterior'] },
      'Se realiza control radioscópico final',
      'Se retiran los separadores y se revisan el eje visceral y el paquete carotídeo'
    ],
    ej: 'Paciente en decúbito supino con rodete interescapular y cuello en leve extensión. Se realiza monitoreo neurofisiológico intraoperatorio de potenciales evocados motores y somatosensitivos. Se realiza marcación cutánea del nivel mediante radioscopía e incisión cutánea cervical anterior del lado derecho. Se interviene a nivel de C5-C6. Se constata hernia discal extruida con compresión radicular. Se realiza anulotomía y discectomía, apertura y resección del ligamento longitudinal posterior y descompresión uncovertebral derecha. Se coloca dispositivo intersomático sin fijación integrada, de PEEK, de 6 mm de altura y 14 × 12 mm, relleno con sustituto óseo sintético, y se realiza fijación con placa cervical anterior de titanio de 20 mm con cuatro tornillos de 4,0 × 14 mm. Se realiza control de la posición de los implantes mediante radioscopía en proyecciones anteroposterior y lateral. No se produce durotomía incidental. No se registran cambios en el monitoreo neurofisiológico. Se realiza aproximación del músculo platisma y cierre del tejido celular subcutáneo. Sin complicaciones intraoperatorias'
  },

  // Corpectomía cervical
  {
    id: 'nc-corp',
    n: 'Corpectomía cervical y reconstrucción',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna cervical',
    syn: ['corpectomía cervical anterior', 'ACCF', 'somatectomía cervical', 'OPLL', 'osificación del ligamento longitudinal posterior', 'cage expandible cervical', 'malla de titanio'],
    v: 2,
    ctx: 'Mielopatía cervical por compresión retrovertebral (OPLL, complejo disco-osteofitario retrocorporal, fractura, tumor o infección) que requiere resección de uno o más cuerpos vertebrales por vía anterior y reconstrucción con dispositivo o injerto y placa. Cuerpos resecados, implante y su fijación son obligatorios',
    lat: false,
    ref: [R_BENZEL, R_AO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'cuer', l: 'Cuerpos vertebrales resecados', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT_C, p: 'Se realiza corpectomía de {v}' },
      { id: 'discs', l: 'Discos resecados', sec: 'B', k: 'multi', vr: 1, o: DISC_C, p: 'Se realiza discectomía de {v}' },
      { id: 'lado', l: 'Lado del abordaje', sec: 'B', k: 'opt', vr: 1, q: 1, o: [['Derecho', 'del lado derecho'], ['Izquierdo', 'del lado izquierdo']], p: 'Se realiza abordaje cervical anterior {v}' },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CANT },
      MARCA_F,
      ...MNIO_F,
      ...NAV_F,
      { id: 'hcorp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['OPLL', 'osificación del ligamento longitudinal posterior'],
        ['Osificación adherida a la dura', 'osificación adherida firmemente a la duramadre'],
        ['Complejo disco-osteofitario retrocorporal', 'complejo disco-osteofitario con extensión retrocorporal'],
        ['Fragmento retropulsado', 'fragmento óseo retropulsado'],
        ['Tejido tumoral', 'tejido de aspecto tumoral'],
        ['Tejido de aspecto infeccioso', 'tejido de aspecto infeccioso'],
        ['Hueso osteoporótico', 'calidad ósea disminuida'],
        ['Compresión medular', 'compresión medular']
      ] },
      { id: 'ancho', l: 'Ancho de la corpectomía', sec: 'D', k: 'num', u: 'mm', p: 'Corpectomía de {v} mm de ancho' },
      { id: 'llp', l: 'Manejo del LLP u osificación', sec: 'D', k: 'opt', q: 1, o: [
        ['Resección del LLP', 'Se realiza resección del ligamento longitudinal posterior'],
        ['Resección de la osificación', 'Se realiza resección de la osificación del ligamento longitudinal posterior'],
        ['Flotación de la osificación', 'Se adelgaza y libera la osificación, que se deja flotante sobre la duramadre'],
        ['Preservación del LLP', 'Se preserva el ligamento longitudinal posterior']
      ] },
      { id: 'dneu', l: 'Estructuras descomprimidas', sec: 'D', k: 'multi', p: 'Se realiza descompresión de {v}', o: [
        ['Saco dural', 'el saco dural'],
        ['Médula cervical', 'la médula cervical'],
        ['Raíces de los niveles', 'las raíces de los niveles intervenidos']
      ] },
      { id: 'estp', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', p: 'Se identifican y preservan {v}', o: [
        ['Eje carotídeo', 'el eje carotídeo'],
        ['Eje visceral', 'el eje visceral traqueoesofágico'],
        ['Nervio laríngeo recurrente', 'el nervio laríngeo recurrente'],
        ['Arterias vertebrales', 'ambas arterias vertebrales en los límites laterales de la corpectomía'],
        ['Articulaciones uncovertebrales', 'las articulaciones uncovertebrales como reparo lateral']
      ] },
      ...DUROT_F,
      { id: 'drlum', l: 'Drenaje lumbar de LCR', sec: 'D', k: 'yn', if: ['durot', 'si'], y: 'Se coloca drenaje lumbar externo de LCR', n: 'No se coloca drenaje lumbar externo de LCR' },
      { id: 'recon', l: 'Reconstrucción', sec: 'E', k: 'opt', req: 1, q: 1, o: [
        ['Cage expandible', 'Se reconstruye el defecto con dispositivo de reemplazo vertebral expandible'],
        ['Malla de titanio', 'Se reconstruye el defecto con malla cilíndrica de titanio'],
        ['Injerto de peroné', 'Se reconstruye el defecto con aloinjerto estructural de peroné'],
        ['Injerto de cresta ilíaca', 'Se reconstruye el defecto con autoinjerto tricortical de cresta ilíaca']
      ] },
      { id: 'implv', l: 'Medidas del dispositivo de reconstrucción', sec: 'E', k: 'text', req: 1, q: 1, p: 'Dispositivo de reconstrucción {v}', ph: 'de 16 mm de diámetro, expandido a 32 mm de altura, con lordosis de 6°, de C5 a C7' },
      { id: 'crel', l: 'Relleno del dispositivo', sec: 'E', k: 'multi', o: INJ, p: 'Se rellena el dispositivo con {v}' },
      { id: 'placav', l: 'Placa y tornillos', sec: 'E', k: 'text', req: 1, p: 'Se realiza fijación con placa cervical anterior {v}', ph: 'de 47,5 mm, con 4 tornillos de 4,0 × 16 mm en C4 y C7' },
      { id: 'supp', l: 'Fijación posterior complementaria', sec: 'E', k: 'yn', y: 'Se asocia fijación posterior en el mismo acto quirúrgico', n: 'No se asocia fijación posterior en el mismo acto quirúrgico' },
      { id: 'ctrl', l: 'Control de implantes', sec: 'D', k: 'multi', q: 1, o: CTRL, p: 'Se realiza control de la posición de los implantes mediante {v}' },
      TRAZ_F,
      DREN_COL,
      CIERRE_AC,
      COLLAR_F
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea cervical anterior {lado}',
      'Se realiza sección del platisma y disección por el plano entre el paquete carotídeo y el eje visceral',
      'Se incide la fascia prevertebral y se expone la cara anterior de los cuerpos vertebrales',
      'Se realiza control radioscópico del nivel con aguja espinal',
      'Se realiza disección subperióstica de los músculos largos del cuello y se colocan separadores autoestáticos',
      'Se colocan pines de distracción en los cuerpos adyacentes',
      'Se realiza discectomía de los espacios {discs}',
      'Se incorpora microscopio quirúrgico',
      'Se realiza corpectomía con gubia y fresado de alta velocidad, delimitada lateralmente por las articulaciones uncovertebrales',
      'Se adelgaza la cortical posterior con fresa diamantada y se reseca con pinzas de Kerrison',
      'Se explora el espacio epidural ventral y los forámenes con gancho romo',
      'Se realiza preparación de los platillos de los cuerpos adyacentes',
      'Se mide el defecto y se coloca el dispositivo de reconstrucción bajo control radioscópico',
      'Se coloca placa cervical anterior y se fijan los tornillos con su mecanismo de bloqueo',
      'Se realiza control radioscópico final',
      'Se retiran los separadores y se revisan el eje visceral y el paquete carotídeo'
    ],
    ej: 'Paciente en decúbito supino con rodete interescapular y cuello en leve extensión. Se realiza monitoreo de potenciales evocados motores y somatosensitivos. Se realiza abordaje cervical anterior del lado izquierdo y se confirma el nivel mediante radioscopía. Se realiza discectomía de C5-C6 y C6-C7 y corpectomía de C6, de 16 mm de ancho. Se constata osificación del ligamento longitudinal posterior con compresión medular, y se realiza resección de la osificación. Se reconstruye el defecto con dispositivo de reemplazo vertebral expandible de 16 mm de diámetro expandido a 30 mm, relleno con autoinjerto óseo local, y se realiza fijación con placa cervical anterior de 42,5 mm con 4 tornillos de 4,0 × 16 mm en C5 y C7. Se realiza control de la posición de los implantes mediante radioscopía en proyecciones anteroposterior y lateral. No se produce durotomía incidental. Se deja drenaje prevertebral aspirativo'
  },

  // Laminectomía (cervical, torácica y lumbar)
  {
    id: 'nc-lam',
    n: 'Laminectomía lumbar descompresiva',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['laminectomía', 'descompresión lumbar', 'descompresión posterior', 'hemilaminectomía', 'laminotomía', 'flavectomía', 'estenosis lumbar', 'over the top', 'ULBD'],
    v: 2,
    ctx: 'Descompresión del canal raquídeo por vía posterior en estenosis degenerativa, quiste sinovial, lipomatosis o lesión epidural, a nivel cervical, torácico o lumbar. Región, niveles, técnica y confirmación del nivel son obligatorios. Si se asocia instrumentación, documentarla en la plantilla de artrodesis correspondiente',
    lat: false,
    ref: [R_NASS_EST, R_BENZEL, R_AO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'reg', l: 'Región', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [['Cervical', 'cervical'], ['Torácica', 'torácica'], ['Lumbar', 'lumbar']], p: 'Descompresión de columna {v}' },
      { id: 'niv', l: 'Niveles', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT, p: 'Se interviene a nivel de {v}' },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Laminectomía completa', 'laminectomía completa con resección de las apófisis espinosas'],
        ['Laminotomías bilaterales', 'laminotomías bilaterales con preservación de la línea media'],
        ['Abordaje unilateral con descompresión bilateral', 'descompresión bilateral por abordaje unilateral'],
        ['Hemilaminectomía', 'hemilaminectomía']
      ], p: 'Se realiza {v}' },
      { id: 'lado', l: 'Lado del abordaje', sec: 'B', k: 'opt', if: ['tec', ['Abordaje unilateral con descompresión bilateral', 'Hemilaminectomía']], o: [['Derecho', 'derecho'], ['Izquierdo', 'izquierdo']], p: 'Abordaje del lado {v}' },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [...POS_LUMBAR, ...POS_CPOST] },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, p: 'Se realiza abordaje {v}', o: [
        ['Posterior por línea media', 'posterior por línea media'],
        ['Tubular mínimamente invasivo', 'mínimamente invasivo con retractor tubular'],
        ['Endoscópico', 'endoscópico']
      ] },
      MARCA_F,
      ...MNIO_F,
      { id: 'hesp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [...HALL_DEG, ['Lesión epidural', 'lesión epidural']] },
      { id: 'desc', l: 'Gestos de descompresión', sec: 'D', k: 'multi', req: 1, q: 1, p: 'Se realiza {v}', o: [
        ['Flavectomía', 'flavectomía'],
        ['Foraminotomía', 'foraminotomía'],
        ['Facetectomía medial', 'facetectomía medial'],
        ['Descompresión del receso lateral', 'descompresión del receso lateral'],
        ['Descompresión contralateral (undercutting)', 'descompresión contralateral por debajo de la apófisis espinosa'],
        ['Resección de quiste sinovial', 'resección de quiste sinovial'],
        ['Resección de lipomatosis epidural', 'resección de tejido graso epidural'],
        ['Resección de lesión epidural', 'resección de lesión epidural'],
        ['Discectomía', 'discectomía']
      ] },
      { id: 'estt', l: 'Estructuras descomprimidas', sec: 'D', k: 'multi', p: 'Se libera {v}', o: [
        ['Saco dural', 'el saco dural'],
        ['Médula espinal', 'la médula espinal'],
        ['Cono medular', 'el cono medular'],
        ['Cola de caballo', 'la cola de caballo'],
        ['Raíces emergentes', 'las raíces emergentes'],
        ['Raíces transitantes', 'las raíces transitantes']
      ] },
      { id: 'raiz', l: 'Raíces liberadas', sec: 'D', k: 'text', p: 'Se identifican y liberan las raíces {v}', ph: 'L4 y L5 bilaterales' },
      { id: 'exto', l: 'Estructuras óseas y ligamentarias preservadas', sec: 'D', k: 'multi', p: 'Se preservan {v}', o: [
        ['Articulaciones facetarias', 'las articulaciones facetarias'],
        ['Pars interarticularis', 'la pars interarticularis'],
        ['Ligamentos supra e interespinosos', 'los ligamentos supraespinoso e interespinoso'],
        ['Apófisis espinosas', 'las apófisis espinosas'],
        ['Más del 50 % de cada faceta', 'más de la mitad de cada articulación facetaria']
      ] },
      ...DUROT_F,
      { id: 'fus', l: 'Instrumentación asociada', sec: 'D', k: 'yn', y: 'Se asocia instrumentación y artrodesis en el mismo acto quirúrgico, documentada por separado', n: 'No se asocia instrumentación ni artrodesis' },
      DREN_COL,
      CIERRE_P,
      { id: 'collar', l: 'Ortesis cervical', sec: 'H', k: 'opt', if: ['reg', 'Cervical'], o: [
        ['Collar blando', 'Se coloca collar cervical blando'],
        ['Collar rígido', 'Se coloca collar cervical rígido'],
        ['Sin ortesis', 'No se coloca ortesis cervical']
      ] }
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea sobre la línea media',
      { t: 'Se realiza resección de la cicatriz cutánea previa', if: ['prim', 'Revisión'] },
      { t: 'Se realiza apertura de la fascia y disección subperióstica bilateral de la musculatura paravertebral hasta el borde lateral de las facetas', if: ['tec', ['Laminectomía completa', 'Laminotomías bilaterales']] },
      { t: 'Se realiza apertura de la fascia y disección subperióstica unilateral de la musculatura paravertebral', if: ['tec', ['Abordaje unilateral con descompresión bilateral', 'Hemilaminectomía']] },
      { t: 'Se realiza disección subperióstica preservando las inserciones musculares en C2 y C7', if: ['reg', 'Cervical'] },
      'Se colocan separadores autoestáticos',
      'Se realiza control radioscópico del nivel expuesto',
      { t: 'Se realiza disección de la fibrosis epidural desde el hueso sano hacia el defecto previo', if: ['prim', 'Revisión'] },
      { t: 'Se realiza resección de las apófisis espinosas', if: ['tec', 'Laminectomía completa'] },
      { t: 'Se realiza laminectomía con fresado de alta velocidad en el borde lateral de las láminas y extracción en bloque o fragmentada', if: ['tec', 'Laminectomía completa'] },
      { t: 'Se realizan laminotomías bilaterales con fresado y pinzas de Kerrison preservando las apófisis espinosas', if: ['tec', 'Laminotomías bilaterales'] },
      { t: 'Se realiza laminotomía ipsilateral e inclinación de la mesa y del microscopio para descompresión contralateral por debajo de la apófisis espinosa', if: ['tec', 'Abordaje unilateral con descompresión bilateral'] },
      { t: 'Se realiza hemilaminectomía con fresado y pinzas de Kerrison', if: ['tec', 'Hemilaminectomía'] },
      'Se incorpora microscopio quirúrgico',
      { t: 'Se realiza flavectomía y resección del ligamento amarillo hasta los recesos laterales', ifn: ['reg', 'Cervical'] },
      { t: 'Se realiza resección del ligamento amarillo sin introducir instrumental por debajo de las láminas', if: ['reg', ['Cervical', 'Torácica']] },
      { t: 'Se realiza descompresión de los recesos laterales y foraminotomía con pinzas de Kerrison', ifn: ['reg', 'Cervical'] },
      'Se realiza exploración de los forámenes con sonda roma'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se realiza marcación cutánea del nivel mediante radioscopía e incisión sobre la línea media. Se interviene a nivel de L4 y L5. Se realiza laminectomía completa con resección de las apófisis espinosas. Se constata hipertrofia del ligamento amarillo, hipertrofia facetaria y estenosis del canal central. Se realiza flavectomía, descompresión del receso lateral y foraminotomía, y se liberan el saco dural y las raíces transitantes. Se preservan las articulaciones facetarias y la pars interarticularis. No se produce durotomía incidental. Se deja drenaje subfascial aspirativo. Se realiza cierre de la fascia con puntos separados de material reabsorbible y cierre del tejido celular subcutáneo'
  },
  { id: 'nc-lam-c', n: 'Laminectomía cervical descompresiva', cat: 'Columna cervical', syn: ['laminectomía cervical', 'descompresión cervical posterior', 'mielopatía cervical', 'estenosis cervical'], alias: 'nc-lam', set: { reg: 'Cervical', tec: 'Laminectomía completa' } },
  { id: 'nc-estl', n: 'Descompresión por estenosis del canal lumbar', cat: 'Columna torácica y lumbar', syn: ['estenosis lumbar', 'canal estrecho lumbar', 'claudicación neurógena', 'descompresión microquirúrgica', 'ULBD', 'over the top', 'laminotomía bilateral'], alias: 'nc-lam', set: { reg: 'Lumbar' } },

  // Laminoplastia cervical
  {
    id: 'nc-lpl',
    n: 'Laminoplastia cervical',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna cervical',
    syn: ['laminoplastia', 'open door', 'puerta abierta', 'Hirabayashi', 'doble puerta', 'French door', 'Kurokawa', 'mielopatía cervical multinivel'],
    v: 2,
    ctx: 'Mielopatía cervical multinivel con alineación preservada (estenosis degenerativa, OPLL) tratada por expansión del canal posterior conservando los elementos posteriores. Niveles, técnica, lado de apertura y fijación por nivel son obligatorios',
    lat: false,
    ref: [R_HIRA, R_BENZEL, R_AO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Láminas intervenidas', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT_C, p: 'Se realiza laminoplastia de {v}' },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Puerta abierta', 'laminoplastia en puerta abierta'],
        ['Doble puerta', 'laminoplastia en doble puerta con apertura en la línea media']
      ], p: 'Se realiza {v}' },
      { id: 'apert', l: 'Lado de apertura', sec: 'B', k: 'opt', vr: 1, if: ['tec', 'Puerta abierta'], req: 1, o: [['Derecho', 'derecho'], ['Izquierdo', 'izquierdo']], p: 'Lado de apertura {v}, con bisagra contralateral' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CPOST },
      MARCA_F,
      ...MNIO_F,
      { id: 'hesp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Hipertrofia del ligamento amarillo', 'hipertrofia del ligamento amarillo'],
        ['Estenosis central', 'estenosis del canal central'],
        ['Saco sin pulsatilidad', 'saco dural sin pulsatilidad'],
        ['Expansión del saco tras la apertura', 'expansión del saco dural luego de la apertura laminar'],
        ['Adherencias epidurales', 'adherencias epidurales']
      ] },
      { id: 'c2c7', l: 'Manejo de C2 y C7', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Preservación de inserciones en C2', 'preservación de las inserciones del semiespinoso cervical en C2'],
        ['Domo de C2', 'domo laminar de C2'],
        ['Domo de C7', 'domo laminar de C7'],
        ['Laminectomía de C7', 'laminectomía de C7'],
        ['Preservación del ligamento nucal', 'preservación del ligamento nucal']
      ] },
      { id: 'foraf', l: 'Foraminotomía asociada', sec: 'D', k: 'text', p: 'Se realiza foraminotomía asociada de {v}', ph: 'C4-C5 bilateral' },
      { id: 'fij', l: 'Fijación de las láminas', sec: 'E', k: 'multi', req: 1, q: 1, p: 'Se mantiene la apertura laminar con {v}', o: [
        ['Miniplacas de laminoplastia', 'miniplacas de titanio de laminoplastia y tornillos'],
        ['Espaciadores', 'espaciadores interlaminares'],
        ['Injerto óseo', 'injerto óseo estructural'],
        ['Suturas de anclaje', 'suturas de anclaje a la cápsula facetaria']
      ] },
      { id: 'implv', l: 'Implantes por nivel', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se colocan {v}', ph: 'miniplacas de 10 mm en C3, C5 y C6 y de 12 mm en C4, con tornillos de 2,0 × 5 mm' },
      ...DUROT_F,
      { id: 'ctrl', l: 'Control radioscópico', sec: 'D', k: 'multi', o: CTRL, p: 'Se realiza control de la posición de los implantes mediante {v}' },
      TRAZ_F,
      DREN_COL,
      CIERRE_P,
      COLLAR_F
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea sobre la línea media cervical posterior',
      'Se realiza disección subperióstica de la musculatura paravertebral hasta la unión de lámina y masa lateral, preservando las cápsulas facetarias',
      'Se realiza control radioscópico del nivel expuesto',
      'Se resecan las apófisis espinosas de los niveles intervenidos',
      { t: 'Se realiza surco de bisagra con fresado de la cortical dorsal en la unión de lámina y masa lateral del lado contralateral a la apertura', if: ['tec', 'Puerta abierta'] },
      { t: 'Se realiza osteotomía completa del lado de apertura con fresado y pinzas de Kerrison', if: ['tec', 'Puerta abierta'] },
      { t: 'Se realizan surcos de bisagra bilaterales y osteotomía de las láminas en la línea media', if: ['tec', 'Doble puerta'] },
      'Se secciona el ligamento amarillo en los extremos craneal y caudal',
      'Se realiza apertura progresiva de las láminas y liberación de adherencias epidurales',
      'Se realiza hemostasia del plexo venoso epidural con bipolar y material hemostático',
      'Se fijan las láminas en posición abierta con {fij}',
      'Se realiza control radioscópico final'
    ],
    ej: 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines y cuello en posición neutra. Se realiza monitoreo de potenciales evocados motores y somatosensitivos y se confirma el nivel mediante radioscopía. Se realiza laminoplastia en puerta abierta de C3, C4, C5 y C6, con lado de apertura derecho y bisagra contralateral. Se preservan las inserciones del semiespinoso cervical en C2. Se fijan las láminas en posición abierta con miniplacas de titanio de laminoplastia y tornillos, de 10 mm en C3, C5 y C6 y de 12 mm en C4. Se constata expansión del saco dural luego de la apertura laminar. No se produce durotomía incidental. No se registran cambios en el monitoreo neurofisiológico. Se deja drenaje subfascial aspirativo'
  },

  // Foraminotomía (cervical y lumbar)
  {
    id: 'nc-fora',
    n: 'Foraminotomía cervical',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna cervical',
    syn: ['foraminotomía', 'keyhole', 'foraminotomía posterior', 'Frykholm', 'foraminotomía de Scoville', 'radiculopatía cervical', 'estenosis foraminal', 'hernia foraminal'],
    v: 2,
    ctx: 'Radiculopatía por estenosis foraminal o hernia discal foraminal tratada por ampliación del foramen por vía posterior (abierta, tubular o endoscópica), a nivel cervical o lumbar. Región, nivel, lado, raíz y confirmación del nivel son obligatorios',
    lat: true,
    ref: [R_NASS_CERV, R_NASS_EST, R_BENZEL, R_AO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'reg', l: 'Región', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [['Cervical', 'cervical'], ['Lumbar', 'lumbar']], p: 'Foraminotomía {v}' },
      { id: 'niv', l: 'Nivel', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: [...DISC_C, ...DISC_L], p: 'Se interviene el foramen {v}' },
      { id: 'lat', l: 'Lado', sec: 'A', k: 'opt', vr: 1, req: 1, q: 1, o: LADO },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, q: 1, p: 'Se realiza abordaje {v}', o: [
        ['Posterior abierto', 'posterior abierto paramediano'],
        ['Tubular mínimamente invasivo', 'mínimamente invasivo con retractor tubular'],
        ['Endoscópico', 'endoscópico'],
        ['Paramediano extraforaminal (Wiltse)', 'paramediano extraforaminal de Wiltse']
      ] },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [...POS_CPOST, ...POS_LUMBAR] },
      MARCA_F,
      ...MNIO_F,
      { id: 'hfor', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Estenosis foraminal ósea', 'estenosis foraminal de origen óseo'],
        ['Hipertrofia facetaria', 'hipertrofia facetaria'],
        ['Osteofito uncovertebral', 'osteofito uncovertebral'],
        ['Hernia foraminal blanda', 'hernia discal foraminal blanda'],
        ['Hernia extraforaminal', 'hernia discal extraforaminal'],
        ['Raíz edematosa', 'raíz edematosa'],
        ['Raíz comprimida', 'raíz comprimida en su trayecto foraminal'],
        ['Plexo venoso ingurgitado', 'plexo venoso foraminal ingurgitado']
      ] },
      { id: 'raiz', l: 'Raíz descomprimida', sec: 'D', k: 'text', req: 1, q: 1, p: 'Se descomprime la raíz {v}', ph: 'C6 derecha / L5 izquierda' },
      { id: 'faces', l: 'Resección facetaria', sec: 'D', k: 'opt', o: [
        ['Menos del 50 %', 'Se reseca menos de la mitad medial de la articulación facetaria'],
        ['Más del 50 %', 'Se reseca más de la mitad de la articulación facetaria'],
        ['Sin resección facetaria', 'No se reseca la articulación facetaria']
      ] },
      { id: 'hdisc', l: 'Exéresis de hernia', sec: 'D', k: 'yn', y: 'Se extrae material discal foraminal', n: 'No se extrae material discal' },
      { id: 'estp', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', p: 'Se identifican y preservan {v}', o: [
        ['Raíz y ganglio', 'la raíz y su ganglio sensitivo'],
        ['Arteria vertebral', 'la arteria vertebral'],
        ['Plexo venoso', 'el plexo venoso foraminal'],
        ['Pars interarticularis', 'la pars interarticularis'],
        ['Raíz transitante', 'la raíz transitante']
      ] },
      ...DUROT_F,
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea paramediana {lat}',
      'Se realiza apertura de la fascia y disección muscular unilateral',
      'Se realiza control radioscópico del nivel expuesto',
      'Se incorpora microscopio quirúrgico',
      { t: 'Se expone la unión de las láminas con la masa lateral en el punto V', if: ['reg', 'Cervical'] },
      { t: 'Se realiza fresado de la lámina y de la porción medial de la faceta en forma de ojo de cerradura', if: ['reg', 'Cervical'] },
      { t: 'Se reseca el ligamento amarillo lateral y se expone el borde lateral del saco dural', if: ['reg', 'Cervical'] },
      { t: 'Se expone el borde lateral de la pars interarticularis y la faceta superior', if: ['reg', 'Lumbar'] },
      { t: 'Se realiza resección de la porción medial de la faceta superior y del ligamento amarillo foraminal con fresado y pinzas de Kerrison', if: ['reg', 'Lumbar'] },
      { t: 'Se realiza abordaje extraforaminal entre las apófisis transversas y se identifica la raíz emergente', if: ['abord', 'Paramediano extraforaminal (Wiltse)'] },
      'Se identifica la raíz y se sigue en su trayecto foraminal',
      'Se realiza hemostasia del plexo venoso foraminal con bipolar y material hemostático',
      { t: 'Se realiza extracción del material discal herniado por la axila o el hombro de la raíz', if: ['hdisc', 'si'] },
      'Se realiza exploración del foramen con sonda roma'
    ],
    ej: 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines y cuello en leve flexión. Se realiza marcación cutánea del nivel mediante radioscopía e incisión cutánea paramediana izquierda. Se interviene el foramen C6-C7. Se realiza fresado de la lámina y de la porción medial de la faceta en forma de ojo de cerradura. Se constata hernia discal foraminal blanda y raíz comprimida en su trayecto foraminal. Se descomprime la raíz C7 izquierda y se reseca menos de la mitad medial de la articulación facetaria. Se extrae material discal foraminal. No se produce durotomía incidental. Se realiza cierre de la fascia con puntos separados de material reabsorbible'
  },
  { id: 'nc-fora-l', n: 'Foraminotomía lumbar', cat: 'Columna torácica y lumbar', syn: ['foraminotomía lumbar', 'estenosis foraminal lumbar', 'descompresión foraminal', 'Wiltse', 'extraforaminal'], alias: 'nc-fora', set: { reg: 'Lumbar' } },

  // Artrodesis cervical posterior
  {
    id: 'nc-cpost',
    n: 'Artrodesis cervical posterior',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna cervical',
    syn: ['artrodesis cervical posterior', 'fijación cervical posterior', 'tornillos de masa lateral', 'Magerl', 'Harms', 'Goel-Harms', 'C1-C2', 'occipitocervical', 'artrodesis occipitocervical', 'instrumentación cervical posterior'],
    v: 2,
    ctx: 'Fijación y fusión cervical posterior u occipitocervical por inestabilidad, fractura, deformidad, mielopatía con laminectomía asociada o patología craneocervical. Niveles, técnica de fijación por nivel, implantes con medidas y control de posición son obligatorios. La placa cervical anterior se documenta en ACDF o corpectomía',
    lat: false,
    ref: [R_HARMS, R_BENZEL, R_AO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Niveles instrumentados', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT_OC, p: 'Se instrumentan {v}' },
      { id: 'obj', l: 'Objetivo', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Instrumentación y artrodesis', 'Se realiza instrumentación y artrodesis'],
        ['Instrumentación sin artrodesis', 'Se realiza instrumentación sin artrodesis']
      ] },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CPOST },
      MARCA_F,
      ...NAV_F,
      ...MNIO_F,
      { id: 'hesp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Inestabilidad segmentaria', 'movilidad anormal del segmento'],
        ['Luxación facetaria', 'luxación facetaria'],
        ['Fractura de masa lateral', 'fractura de masa lateral'],
        ['Lesión ligamentaria posterior', 'lesión del complejo ligamentario posterior'],
        ['Inestabilidad atlantoaxoidea', 'inestabilidad atlantoaxoidea'],
        ['Calidad ósea disminuida', 'calidad ósea disminuida'],
        ['Anomalía de la arteria vertebral', 'trayecto anómalo de la arteria vertebral'],
        ['Material previo', 'material de osteosíntesis previo']
      ] },
      { id: 'descas', l: 'Descompresión asociada', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Laminectomía', 'laminectomía'],
        ['Foraminotomía', 'foraminotomía'],
        ['Resección del arco posterior de C1', 'resección del arco posterior de C1'],
        ['Craniectomía suboccipital', 'craniectomía suboccipital'],
        ['Reducción de luxación facetaria', 'reducción abierta de luxación facetaria']
      ] },
      { id: 'tfij', l: 'Técnica de fijación', sec: 'E', k: 'multi', req: 1, q: 1, p: 'Se realiza fijación con {v}', o: [
        ['Masa lateral subaxial', 'tornillos de masa lateral subaxiales'],
        ['Masa lateral de C1', 'tornillos de masa lateral de C1'],
        ['Pedicular de C2', 'tornillos pediculares de C2'],
        ['Pars de C2', 'tornillos de pars de C2'],
        ['Translaminar de C2', 'tornillos translaminares de C2'],
        ['Transarticular C1-C2', 'tornillos transarticulares C1-C2'],
        ['Pedicular de C7 o torácico', 'tornillos pediculares de C7 o torácicos'],
        ['Placa occipital', 'placa occipital con tornillos bicorticales'],
        ['Alambrado o cintas sublaminares', 'alambrado o cintas sublaminares']
      ] },
      { id: 'tins', l: 'Inserción de tornillos', sec: 'D', k: 'opt', o: TINS, p: 'Se insertan los tornillos {v}' },
      { id: 'implv', l: 'Implantes por nivel (medidas)', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se colocan {v}', ph: 'tornillos poliaxiales de 3,5 × 14 mm en masas laterales de C4, C5 y C6 bilaterales' },
      { id: 'barr', l: 'Barras', sec: 'E', k: 'opt', o: BARR },
      { id: 'bdiam', l: 'Diámetro de barras', sec: 'E', k: 'num', u: 'mm', p: 'Barras de {v} mm de diámetro' },
      { id: 'conec', l: 'Conector transversal', sec: 'E', k: 'yn', y: 'Se coloca conector transversal', n: 'No se coloca conector transversal' },
      { id: 'ctrl', l: 'Control de implantes', sec: 'D', k: 'multi', req: 1, q: 1, o: CTRL, p: 'Se realiza control de la posición de los implantes mediante {v}' },
      { id: 'ctrlr', l: 'Conducta tras el control', sec: 'D', k: 'opt', o: [
        ['Sin cambios', 'No se modifican implantes luego del control de posición'],
        ['Recolocación de tornillos', 'Se recolocan tornillos a partir del control de posición'],
        ['Retiro de tornillo', 'Se retira tornillo a partir del control de posición']
      ] },
      { id: 'decor', l: 'Decorticación', sec: 'D', k: 'yn', if: ['obj', 'Instrumentación y artrodesis'], y: 'Se realiza decorticación de láminas y facetas', n: 'No se realiza decorticación' },
      { id: 'inj', l: 'Injerto', sec: 'E', k: 'multi', if: ['obj', 'Instrumentación y artrodesis'], o: INJ, p: 'Se coloca {v} en el lecho de artrodesis' },
      { id: 'estp', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', p: 'Se identifican y preservan {v}', o: [
        ['Arteria vertebral', 'la arteria vertebral'],
        ['Raíz y ganglio de C2', 'la raíz y el ganglio de C2'],
        ['Plexo venoso C1-C2', 'el plexo venoso atlantoaxoideo'],
        ['Cápsulas facetarias adyacentes', 'las cápsulas facetarias de los niveles adyacentes'],
        ['Inserciones musculares en C2', 'las inserciones musculares en la apófisis espinosa de C2']
      ] },
      ...DUROT_F,
      TRAZ_F,
      DREN_COL,
      CIERRE_P,
      COLLAR_F
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea sobre la línea media cervical posterior',
      { t: 'Se realiza resección de la cicatriz y disección a través del tejido cicatrizal hasta el material previo', if: ['prim', 'Revisión'] },
      'Se realiza disección subperióstica de la musculatura paravertebral hasta el borde lateral de las masas laterales',
      'Se realiza control radioscópico del nivel expuesto',
      { t: 'Se expone el arco posterior de C1 y la masa lateral de C1 por debajo del arco, con retracción caudal de la raíz C2', if: ['tfij', 'Masa lateral de C1'] },
      { t: 'Se realiza hemostasia del plexo venoso atlantoaxoideo con bipolar y material hemostático', if: ['tfij', ['Masa lateral de C1', 'Transarticular C1-C2']] },
      { t: 'Se identifican los puntos de entrada de las masas laterales subaxiales y se perforan con broca con tope', if: ['tfij', 'Masa lateral subaxial'] },
      { t: 'Se identifica el borde medial del pedículo de C2 y se prepara el trayecto bajo control radioscópico', if: ['tfij', ['Pedicular de C2', 'Pars de C2', 'Transarticular C1-C2']] },
      { t: 'Se expone la escama occipital y se realizan perforaciones bicorticales en la quilla occipital', if: ['tfij', 'Placa occipital'] },
      'Se realiza palpación de las paredes de cada trayecto con sonda',
      'Se insertan los tornillos {tins}',
      { t: 'Se realiza la descompresión asociada', if: ['descas', ['Laminectomía', 'Foraminotomía', 'Resección del arco posterior de C1', 'Craniectomía suboccipital', 'Reducción de luxación facetaria']] },
      'Se realiza contorneado y colocación de las barras',
      'Se realiza ajuste final de los tornillos de bloqueo',
      { t: 'Se realiza decorticación de láminas y facetas con fresado de alta velocidad', if: ['decor', 'si'] },
      { t: 'Se coloca injerto en el lecho de artrodesis', if: ['obj', 'Instrumentación y artrodesis'] },
      'Se realiza control radioscópico final'
    ],
    ej: 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines y cuello en posición neutra. Se realiza monitoreo de potenciales evocados motores y somatosensitivos y se confirma el nivel mediante radioscopía. Se realiza instrumentación y artrodesis. Se instrumentan C3, C4, C5 y C6. Se realiza laminectomía. Se realiza fijación con tornillos de masa lateral subaxiales, insertados a mano libre según reparos anatómicos, y se colocan tornillos poliaxiales de 3,5 × 14 mm bilaterales en C3, C4, C5 y C6 con dos barras de titanio de 3,5 mm. Se realiza control de la posición de los implantes mediante radioscopía en proyecciones anteroposterior y lateral. Se coloca autoinjerto óseo local en el lecho de artrodesis. No se produce durotomía incidental. No se registran cambios en el monitoreo neurofisiológico. Se deja drenaje subfascial aspirativo'
  },
  { id: 'nc-cinst', n: 'Instrumentación cervical', cat: 'Columna cervical', syn: ['instrumentación cervical', 'fijación cervical', 'tornillos cervicales', 'fijación C1-C2', 'fijación occipitocervical'], alias: 'nc-cpost' },

  // Revisión o retiro de material
  {
    id: 'nc-rev',
    n: 'Revisión o retiro de material de osteosíntesis espinal',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['retiro de material', 'retiro de tornillos', 'revisión de artrodesis', 'recambio de instrumentación', 'seudoartrosis', 'infección de material', 'extensión de artrodesis', 'enfermedad de segmento adyacente'],
    v: 2,
    ctx: 'Reintervención sobre instrumentación espinal previa por infección, seudoartrosis, falla o malposición de implantes, enfermedad de segmento adyacente o retiro electivo. Región, niveles, motivo, acción, implantes retirados y colocados son obligatorios. Ante sospecha de infección, documentar número de muestras para cultivo y envío de implantes',
    lat: false,
    ref: [R_BENZEL, R_AO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'reg', l: 'Región', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: REG, p: 'Revisión de instrumentación {v}' },
      { id: 'niv', l: 'Niveles intervenidos', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: [['Occipucio', 'el occipucio'], ...VERT, ['S2', 'S2'], ['Ilíaco', 'el ilíaco']], p: 'Se interviene a nivel de {v}' },
      { id: 'via', l: 'Vía', sec: 'B', k: 'opt', vr: 1, q: 1, o: [['Posterior', 'posterior'], ['Anterior', 'anterior'], ['Combinada', 'combinada anterior y posterior']], p: 'Se realiza abordaje por vía {v}' },
      { id: 'mot', l: 'Motivo de la reintervención', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, p: 'Se reinterviene por {v}', o: [
        ['Infección', 'sospecha de infección del sitio quirúrgico'],
        ['Seudoartrosis', 'seudoartrosis'],
        ['Rotura de implante', 'rotura de implante'],
        ['Aflojamiento', 'aflojamiento de implantes'],
        ['Malposición', 'malposición de implante'],
        ['Enfermedad de segmento adyacente', 'enfermedad de segmento adyacente'],
        ['Prominencia o dolor por material', 'prominencia o dolor atribuido al material'],
        ['Retiro electivo', 'retiro electivo del material']
      ] },
      { id: 'acc', l: 'Acción', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Retiro total', 'Se planifica retiro total del material'],
        ['Retiro parcial', 'Se planifica retiro parcial del material'],
        ['Recambio', 'Se planifica recambio de implantes'],
        ['Extensión de la instrumentación', 'Se planifica extensión de la instrumentación'],
        ['Revisión de la artrodesis', 'Se planifica revisión de la artrodesis con reinstrumentación']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [...POS_COLUMNA, ...POS_CPOST] },
      MARCA_F,
      ...NAV_F,
      ...MNIO_F,
      { id: 'hrev', l: 'Hallazgos', sec: 'C', k: 'multi', req: 1, q: 1, p: 'Se constata {v}', o: [
        ['Tornillos aflojados', 'aflojamiento de tornillos'],
        ['Halo de osteólisis', 'osteólisis alrededor de los tornillos'],
        ['Rotura de barra', 'rotura de barra'],
        ['Rotura de tornillo', 'rotura de tornillo'],
        ['Desensamble', 'desensamble de tornillo de bloqueo'],
        ['Migración de dispositivo', 'migración del dispositivo intersomático'],
        ['Fusión sólida', 'masa de fusión continua sin movilidad a la exploración'],
        ['Movilidad en la fusión', 'movilidad en la masa de fusión a la exploración'],
        ['Colección purulenta', 'colección de aspecto purulento'],
        ['Tejido de granulación', 'tejido de granulación periimplante'],
        ['Fibrosis', 'fibrosis cicatrizal'],
        ['Material sin alteraciones', 'material de osteosíntesis sin alteraciones macroscópicas']
      ] },
      { id: 'retv', l: 'Implantes retirados', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se retiran {v}', ph: 'tornillos pediculares bilaterales de L4 y L5 y dos barras' },
      { id: 'newv', l: 'Implantes colocados por nivel', sec: 'E', k: 'text', if: ['acc', ['Recambio', 'Extensión de la instrumentación', 'Revisión de la artrodesis']], req: 1, p: 'Se colocan {v}', ph: 'tornillos de 7,5 × 45 mm en L4 y L5 bilaterales y tornillos de 6,5 × 45 mm en L3 bilaterales' },
      { id: 'barr', l: 'Barras', sec: 'E', k: 'opt', if: ['acc', ['Recambio', 'Extensión de la instrumentación', 'Revisión de la artrodesis']], o: BARR },
      { id: 'tins', l: 'Inserción de tornillos', sec: 'D', k: 'opt', if: ['acc', ['Recambio', 'Extensión de la instrumentación', 'Revisión de la artrodesis']], o: TINS, p: 'Se insertan los tornillos {v}' },
      { id: 'ctrl', l: 'Control de implantes', sec: 'D', k: 'multi', o: CTRL, p: 'Se realiza control de la posición de los implantes mediante {v}' },
      { id: 'inj', l: 'Injerto', sec: 'E', k: 'multi', o: INJ, p: 'Se coloca {v} en el lecho de artrodesis' },
      { id: 'desb', l: 'Desbridamiento', sec: 'D', k: 'yn', if: ['mot', 'Infección'], y: 'Se realiza desbridamiento de tejidos desvitalizados y lavado a presión', n: 'No se realiza desbridamiento' },
      { id: 'cult', l: 'Muestras para cultivo', sec: 'F', k: 'num', p: 'Se toman {v} muestras de tejido periimplante para cultivo' },
      { id: 'soni', l: 'Envío de implantes para sonicación', sec: 'F', k: 'yn', y: 'Se envían los implantes retirados para sonicación y cultivo', n: 'No se envían implantes para sonicación' },
      { id: 'atbloc', l: 'Antibiótico local', sec: 'E', k: 'text', p: 'Se coloca antibiótico local {v}', ph: 'vancomicina en polvo 1 g en el lecho' },
      ...DUROT_F,
      TRAZ_F,
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea sobre la cicatriz previa con resección de sus bordes',
      'Se realiza disección a través del tejido cicatrizal hasta exponer el material de osteosíntesis',
      { t: 'Se toman muestras de tejido periimplante para cultivo antes de la administración de antibiótico', if: ['mot', 'Infección'] },
      'Se identifican todos los implantes y se constata su estado',
      'Se aflojan los tornillos de bloqueo y se retiran las barras',
      'Se retiran los tornillos con el destornillador correspondiente',
      { t: 'Se realiza extracción de tornillo roto con instrumental de extracción', if: ['hrev', 'Rotura de tornillo'] },
      'Se realiza curetaje de los trayectos y palpación de sus paredes',
      { t: 'Se explora la masa de fusión en busca de movilidad', if: ['mot', 'Seudoartrosis'] },
      { t: 'Se realiza desbridamiento de tejidos desvitalizados y lavado a presión con solución fisiológica', if: ['mot', 'Infección'] },
      { t: 'Se preparan los trayectos y se colocan los nuevos implantes', if: ['acc', ['Recambio', 'Revisión de la artrodesis']] },
      { t: 'Se extiende la exposición a los niveles adyacentes y se colocan los nuevos implantes', if: ['acc', 'Extensión de la instrumentación'] },
      { t: 'Se realiza decorticación y colocación de injerto', if: ['acc', ['Revisión de la artrodesis', 'Extensión de la instrumentación']] },
      { t: 'Se realiza contorneado y colocación de barras y ajuste final de los tornillos de bloqueo', if: ['acc', ['Recambio', 'Extensión de la instrumentación', 'Revisión de la artrodesis']] },
      'Se realiza control radioscópico final'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se reinterviene por seudoartrosis y aflojamiento de implantes, con revisión de la artrodesis con reinstrumentación. Se interviene a nivel de L4 y L5. Se realiza incisión sobre la cicatriz previa y disección a través del tejido cicatrizal. Se constata osteólisis alrededor de los tornillos y movilidad en la masa de fusión a la exploración. Se retiran tornillos pediculares bilaterales de L4 y L5 y dos barras. Se colocan tornillos de 7,5 × 45 mm en L4 y L5 bilaterales bajo guía radioscópica y dos barras de titanio. Se toman 5 muestras de tejido periimplante para cultivo y se envían los implantes retirados para sonicación. Se realiza control de la posición de los implantes mediante radioscopía en proyecciones anteroposterior y lateral. No se produce durotomía incidental'
  },
  { id: 'nc-rev-c', n: 'Revisión o retiro de instrumentación cervical', cat: 'Columna cervical', syn: ['retiro de placa cervical', 'revisión cervical', 'retiro de material cervical', 'seudoartrosis cervical'], alias: 'nc-rev', set: { reg: 'Cervical' } },

  // ===================== Columna torácica y lumbar =====================

  // Microdiscectomía
  {
    id: 'nc-mdisc',
    n: 'Microdiscectomía lumbar',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['microdiscectomía', 'hernia de disco lumbar', 'discectomía microquirúrgica', 'Caspar', 'Williams', 'hernia discal recidivada', 'tubular', 'ciática'],
    v: 2,
    ctx: 'Hernia discal lumbar con radiculopatía que requiere descompresión microquirúrgica de la raíz por vía interlaminar, tubular o extraforaminal. Nivel, lado, raíz y confirmación radioscópica del nivel son obligatorios',
    lat: true,
    ref: [R_NASS_HD, R_BENZEL, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Nivel', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: DISC_L, p: 'Se interviene el nivel {v}' },
      { id: 'lat', l: 'Lado', sec: 'A', k: 'opt', vr: 1, req: 1, q: 1, o: LADO_UNI },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_LUMBAR },
      MARCA_F,
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, q: 1, p: 'Se realiza abordaje {v}', o: [
        ['Interlaminar microquirúrgico', 'interlaminar microquirúrgico'],
        ['Tubular', 'mínimamente invasivo con retractor tubular'],
        ['Extraforaminal (Wiltse)', 'extraforaminal paramediano de Wiltse']
      ] },
      ...MNIO_F,
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
        ['Fibrosis epidural', 'fibrosis epidural'],
        ['Anomalía radicular', 'anomalía radicular'],
        ['Estenosis del receso asociada', 'estenosis del receso lateral asociada']
      ] },
      { id: 'raiz', l: 'Raíz', sec: 'D', k: 'text', req: 1, q: 1, p: 'Se identifica y protege la raíz {v}', ph: 'L5 izquierda' },
      { id: 'frag', l: 'Fragmento discal', sec: 'D', k: 'opt', q: 1, o: [
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
      { id: 'droot', l: 'Estado de la raíz al finalizar', sec: 'D', k: 'opt', o: [
        ['Raíz libre y móvil', 'Al finalizar se constata raíz libre y con movilidad conservada'],
        ['Tensión radicular persistente', 'Al finalizar se constata persistencia de tensión radicular'],
        ['Foramen permeable a la sonda', 'Al finalizar se constata paso libre de la sonda roma por el foramen']
      ] },
      ...DUROT_F,
      { id: 'epid', l: 'Medidas en el espacio epidural', sec: 'D', k: 'multi', p: 'Se coloca {v}', o: [
        ['Corticoide epidural', 'corticoide epidural sobre la raíz'],
        ['Injerto de grasa libre', 'injerto de grasa libre epidural'],
        ['Material hemostático', 'material hemostático epidural']
      ] },
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea paramediana {lat}',
      { t: 'Se realiza apertura de la fascia y disección subperióstica unilateral', ifn: ['abord', ['Tubular', 'Extraforaminal (Wiltse)']] },
      { t: 'Se introducen dilatadores secuenciales y se fija el retractor tubular sobre la unión laminofacetaria', if: ['abord', 'Tubular'] },
      { t: 'Se realiza disección por el plano entre multífido y longísimo hasta la unión de la pars con la apófisis transversa', if: ['abord', 'Extraforaminal (Wiltse)'] },
      { t: 'Se coloca separador autoestático', if: ['abord', 'Interlaminar microquirúrgico'] },
      'Se realiza control radioscópico del nivel expuesto',
      'Se incorpora microscopio quirúrgico',
      { t: 'Se realiza disección de la fibrosis epidural desde el borde óseo sano', if: ['prim', 'Revisión'] },
      { t: 'Se realiza laminotomía parcial y flavectomía', ifn: ['abord', 'Extraforaminal (Wiltse)'] },
      { t: 'Se reseca el ligamento intertransverso y se identifica la raíz emergente en el espacio extraforaminal', if: ['abord', 'Extraforaminal (Wiltse)'] },
      'Se identifican el saco dural y la raíz',
      { t: 'Se realiza retracción medial de la raíz', ifn: ['abord', 'Extraforaminal (Wiltse)'] },
      'Se realiza hemostasia del plexo venoso epidural con bipolar',
      'Se realiza extracción del material discal herniado con pinzas',
      'Se realiza exploración del espacio epidural y del foramen con gancho romo'
    ],
    ej: 'Paciente en decúbito prono sobre almohadillas longitudinales con abdomen libre. Se realiza marcación cutánea del nivel mediante radioscopía e incisión cutánea paramediana izquierda. Se realiza abordaje interlaminar microquirúrgico. Se interviene el nivel L4-L5. Se realiza laminotomía parcial y flavectomía, y se identifica y protege la raíz L5 izquierda. Se constata hernia discal extruida de localización posterolateral con raíz desplazada. Se extrae fragmento discal secuestrado y se realiza anulotomía con extracción de material discal intradiscal. Al finalizar se constata raíz libre y con movilidad conservada. No se produce durotomía incidental. Se realiza cierre de la fascia con puntos separados de material reabsorbible y cierre del tejido celular subcutáneo'
  },

  // Discectomía lumbar abierta
  {
    id: 'nc-disc',
    n: 'Discectomía lumbar abierta',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['discectomía lumbar', 'discectomía convencional', 'hemilaminectomía y discectomía', 'hernia de disco lumbar', 'hernia discal', 'discectomía con lupas'],
    v: 2,
    ctx: 'Hernia discal lumbar con radiculopatía tratada por vía posterior interlaminar abierta o con hemilaminectomía, con magnificación por lupas o sin ella. Nivel, lado, raíz y confirmación radioscópica del nivel son obligatorios. Para la técnica con microscopio usar Microdiscectomía lumbar',
    lat: true,
    ref: [R_NASS_HD, R_BENZEL, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Nivel', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: DISC_L, p: 'Se interviene el nivel {v}' },
      { id: 'lat', l: 'Lado', sec: 'A', k: 'opt', vr: 1, req: 1, q: 1, o: LADO },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_LUMBAR },
      MARCA_F,
      { id: 'abord', l: 'Técnica de acceso', sec: 'B', k: 'opt', vr: 1, q: 1, p: 'Se realiza abordaje {v}', o: [
        ['Interlaminar', 'interlaminar abierto'],
        ['Hemilaminectomía', 'con hemilaminectomía'],
        ['Laminectomía', 'con laminectomía']
      ] },
      { id: 'magn', l: 'Magnificación', sec: 'B', k: 'opt', o: [
        ['Lupas', 'Se utilizan lupas de magnificación'],
        ['Sin magnificación', 'Se trabaja sin magnificación óptica']
      ] },
      ...MNIO_F,
      { id: 'hdisc', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Protrusión', 'protrusión discal'],
        ['Hernia contenida', 'hernia discal contenida'],
        ['Extrusión', 'hernia discal extruida'],
        ['Secuestro', 'fragmento discal secuestrado'],
        ['Hernia central voluminosa', 'hernia discal central voluminosa'],
        ['Disco degenerado', 'disco degenerado con pérdida de altura'],
        ['Compresión radicular', 'compresión radicular'],
        ['Compresión del saco dural', 'compresión del saco dural'],
        ['Fibrosis epidural', 'fibrosis epidural']
      ] },
      { id: 'raiz', l: 'Raíz', sec: 'D', k: 'text', req: 1, q: 1, p: 'Se identifica y protege la raíz {v}', ph: 'S1 derecha' },
      { id: 'mdisc', l: 'Material discal extraído', sec: 'D', k: 'opt', q: 1, o: [
        ['Solo material herniado', 'Se extrae el material discal herniado'],
        ['Fragmento secuestrado', 'Se extrae fragmento discal secuestrado'],
        ['Discectomía amplia del espacio', 'Se realiza discectomía amplia del espacio'],
        ['Múltiples fragmentos', 'Se extraen múltiples fragmentos de material discal']
      ] },
      { id: 'droot', l: 'Estado de la raíz al finalizar', sec: 'D', k: 'opt', o: [
        ['Raíz libre y móvil', 'Al finalizar se constata raíz libre y con movilidad conservada'],
        ['Tensión radicular persistente', 'Al finalizar se constata persistencia de tensión radicular']
      ] },
      ...DUROT_F,
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea sobre la línea media',
      'Se realiza apertura de la fascia y disección subperióstica de la musculatura paravertebral',
      'Se coloca separador autoestático',
      'Se realiza control radioscópico del nivel expuesto',
      { t: 'Se realiza disección de la fibrosis epidural desde el borde óseo sano', if: ['prim', 'Revisión'] },
      { t: 'Se realiza flavectomía interlaminar', if: ['abord', 'Interlaminar'] },
      { t: 'Se realiza hemilaminectomía con pinzas de Kerrison y flavectomía', if: ['abord', 'Hemilaminectomía'] },
      { t: 'Se realiza laminectomía y flavectomía bilateral', if: ['abord', 'Laminectomía'] },
      'Se identifican el saco dural y la raíz y se realiza retracción medial de la raíz',
      'Se realiza hemostasia del plexo venoso epidural con bipolar',
      'Se realiza anulotomía y discectomía con pinzas y curetas',
      'Se realiza exploración del espacio epidural y del foramen con gancho romo'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se realiza marcación cutánea del nivel mediante radioscopía. Se interviene el nivel L5-S1. Se realiza abordaje con hemilaminectomía derecha con lupas de magnificación. Se identifica y protege la raíz S1 derecha. Se constata hernia discal extruida con compresión radicular. Se extrae el material discal herniado. Al finalizar se constata raíz libre y con movilidad conservada. No se produce durotomía incidental. Se realiza cierre de la fascia con puntos separados de material reabsorbible'
  },

  // Discectomía lumbar endoscópica
  {
    id: 'nc-edisc',
    n: 'Discectomía lumbar endoscópica',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['discectomía endoscópica', 'endoscopía de columna', 'PELD', 'TELD', 'IELD', 'full endoscopic', 'transforaminal', 'interlaminar endoscópica', 'triángulo de Kambin'],
    v: 2,
    ctx: 'Hernia discal lumbar con radiculopatía tratada con endoscopio de canal de trabajo por vía transforaminal o interlaminar, bajo irrigación continua. Vía, nivel, lado, raíz y control radioscópico son obligatorios',
    lat: true,
    ref: [R_RUETTEN, R_NASS_HD, R_BENZEL, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'via', l: 'Vía', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Transforaminal', 'transforaminal'],
        ['Interlaminar', 'interlaminar']
      ], p: 'Se realiza discectomía endoscópica por vía {v}' },
      { id: 'niv', l: 'Nivel', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: DISC_L, p: 'Se interviene el nivel {v}' },
      { id: 'lat', l: 'Lado', sec: 'A', k: 'opt', vr: 1, req: 1, q: 1, o: LADO_UNI },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [...POS_LUMBAR, ['Lateral', 'Paciente en decúbito lateral con el lado sintomático hacia arriba']] },
      MARCA_F,
      { id: 'dist', l: 'Distancia del punto de entrada a la línea media', sec: 'B', k: 'num', u: 'cm', if: ['via', 'Transforaminal'], p: 'Punto de entrada a {v} cm de la línea media' },
      { id: 'endo', l: 'Endoscopio', sec: 'E', k: 'text', p: 'Se utiliza endoscopio {v}', ph: 'de 30° de ángulo, con canal de trabajo de 4,1 mm y vaina de 7 mm' },
      { id: 'cont', l: 'Contacto verbal con el paciente', sec: 'B', k: 'yn', y: 'Se mantiene contacto verbal con el paciente durante el procedimiento para evaluar síntomas radiculares', n: 'Sin contacto verbal con el paciente durante el procedimiento' },
      ...MNIO_F,
      { id: 'hdisc', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Hernia contenida', 'hernia discal contenida'],
        ['Hernia extruida', 'hernia discal extruida'],
        ['Secuestro', 'fragmento discal secuestrado'],
        ['Migración', 'migración del fragmento'],
        ['Foraminal', 'hernia de localización foraminal'],
        ['Raíz edematosa', 'raíz edematosa'],
        ['Estenosis foraminal', 'estenosis foraminal asociada']
      ] },
      { id: 'forp', l: 'Foraminoplastia', sec: 'D', k: 'yn', if: ['via', 'Transforaminal'], y: 'Se realiza foraminoplastia con fresa o escoplo endoscópico de la faceta articular superior', n: 'No se realiza foraminoplastia' },
      { id: 'raiz', l: 'Raíz', sec: 'D', k: 'text', req: 1, q: 1, p: 'Se identifica y protege la raíz {v}', ph: 'L5 derecha' },
      { id: 'frag', l: 'Fragmento discal', sec: 'D', k: 'opt', q: 1, o: [
        ['Fragmento único', 'Se extrae fragmento discal único'],
        ['Múltiples fragmentos', 'Se extraen múltiples fragmentos discales'],
        ['Sin fragmento libre', 'No se identifica fragmento discal libre']
      ] },
      { id: 'anrf', l: 'Radiofrecuencia del anillo', sec: 'D', k: 'yn', y: 'Se realiza coagulación por radiofrecuencia del anillo fibroso', n: 'No se realiza coagulación del anillo' },
      { id: 'droot', l: 'Estado de la raíz al finalizar', sec: 'D', k: 'opt', o: [
        ['Raíz libre y pulsátil', 'Al finalizar se constata raíz libre y con pulsatilidad bajo visión endoscópica'],
        ['Tensión radicular persistente', 'Al finalizar se constata persistencia de tensión radicular']
      ] },
      ...DUROT_F,
      { id: 'cierre', l: 'Cierre', sec: 'G', k: 'multi', o: [
        ['Fascia', 'cierre de la fascia con un punto de material reabsorbible'],
        ['Tejido celular subcutáneo', 'cierre del tejido celular subcutáneo']
      ], p: 'Se realiza {v}' },
      DREN_COL
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca} y del trayecto de punción',
      { t: 'Se realiza infiltración local del trayecto', if: ['via', 'Transforaminal'] },
      { t: 'Se realiza punción con aguja hacia el triángulo de Kambin bajo control radioscópico anteroposterior y lateral', if: ['via', 'Transforaminal'] },
      { t: 'Se introduce alambre guía, dilatadores secuenciales y vaina de trabajo hasta el foramen', if: ['via', 'Transforaminal'] },
      { t: 'Se realiza incisión de 8 mm sobre el espacio interlaminar y se introduce dilatador y vaina hasta el ligamento amarillo', if: ['via', 'Interlaminar'] },
      'Se realiza control radioscópico de la posición de la vaina',
      'Se introduce el endoscopio con irrigación continua de solución fisiológica',
      { t: 'Se realiza apertura del ligamento amarillo y retracción medial de la raíz con la vaina', if: ['via', 'Interlaminar'] },
      { t: 'Se identifica la raíz emergente y se avanza hacia el espacio epidural ventral', if: ['via', 'Transforaminal'] },
      'Se realiza hemostasia con radiofrecuencia bipolar',
      'Se realiza extracción del material discal herniado con pinzas endoscópicas',
      'Se explora el espacio epidural y el trayecto de la raíz bajo visión endoscópica',
      'Se retiran el endoscopio y la vaina'
    ],
    ej: 'Paciente en decúbito prono sobre almohadillas longitudinales con abdomen libre. Se realiza discectomía endoscópica por vía transforaminal. Se interviene el nivel L4-L5. Punto de entrada a 11 cm de la línea media. Se realiza marcación del nivel mediante radioscopía, punción hacia el triángulo de Kambin e introducción de la vaina de trabajo. Se mantiene contacto verbal con el paciente durante el procedimiento. Se constata hernia discal extruida de localización foraminal. Se identifica y protege la raíz L4 derecha. Se extraen múltiples fragmentos discales. No se produce durotomía incidental. Se realiza cierre de la fascia con un punto de material reabsorbible'
  },

  // Artrodesis lumbar posterior / instrumentación transpedicular
  {
    id: 'nc-art',
    n: 'Artrodesis lumbar posterior',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['artrodesis posterolateral', 'PLF', 'fijación transpedicular', 'tornillos pediculares', 'artrodesis lumbar', 'instrumentación lumbar', 'fijación percutánea', 'artrodesis vertebral'],
    v: 2,
    ctx: 'Fijación transpedicular y fusión posterolateral torácica, lumbar o lumbosacra por inestabilidad, espondilolistesis, fractura, deformidad o tras descompresión extensa, abierta o percutánea. Niveles, técnica de fijación, implantes por nivel y control de posición son obligatorios. La fusión intersomática se documenta en las plantillas TLIF/PLIF o ALIF',
    lat: false,
    ref: [R_FUS, R_NASS_SPL, R_BENZEL, R_AO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'reg', l: 'Región', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: REG.filter(o => o[0] != 'Cervical'), p: 'Instrumentación de columna {v}' },
      { id: 'niv', l: 'Niveles instrumentados', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT_TL, p: 'Se instrumentan {v}' },
      { id: 'via', l: 'Vía', sec: 'B', k: 'opt', vr: 1, q: 1, p: 'Se realiza abordaje {v}', o: [
        ['Abierta por línea media', 'posterior abierto por línea media'],
        ['Paramediana (Wiltse)', 'posterior paramediano de Wiltse'],
        ['Percutánea', 'posterior percutáneo']
      ] },
      { id: 'obj', l: 'Objetivo', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Instrumentación y artrodesis', 'Se realiza instrumentación y artrodesis'],
        ['Instrumentación sin artrodesis', 'Se realiza instrumentación sin artrodesis']
      ] },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_COLUMNA },
      MARCA_F,
      ...NAV_F,
      ...MNIO_F,
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
        ['Material previo', 'material de osteosíntesis previo']
      ] },
      { id: 'descas', l: 'Descompresión asociada', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Laminectomía', 'laminectomía'],
        ['Facetectomía', 'facetectomía'],
        ['Foraminotomía', 'foraminotomía'],
        ['Osteotomía de Smith-Petersen', 'osteotomía de Smith-Petersen'],
        ['Osteotomía de Ponte', 'osteotomía de Ponte'],
        ['Osteotomía de sustracción pedicular', 'osteotomía de sustracción pedicular']
      ] },
      { id: 'tfij', l: 'Técnica de fijación', sec: 'E', k: 'multi', req: 1, q: 1, p: 'Se realiza fijación con {v}', o: [
        ['Tornillos pediculares', 'tornillos pediculares'],
        ['Trayectoria cortical', 'tornillos de trayectoria cortical'],
        ['Tornillos ilíacos', 'tornillos ilíacos'],
        ['Tornillos S2-alar-ilíacos', 'tornillos S2-alar-ilíacos'],
        ['Ganchos laminares', 'ganchos laminares'],
        ['Tornillos fenestrados cementados', 'tornillos fenestrados aumentados con cemento'],
        ['Tornillos de anclaje en el cuerpo (fractura)', 'tornillos de anclaje en el cuerpo vertebral fracturado']
      ] },
      { id: 'tins', l: 'Inserción de tornillos', sec: 'D', k: 'opt', q: 1, o: TINS, p: 'Se insertan los tornillos {v}' },
      { id: 'implv', l: 'Implantes por nivel (medidas)', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se colocan {v}', ph: 'tornillos poliaxiales de 6,5 × 45 mm en L4 y de 6,5 × 40 mm en L5, bilaterales' },
      { id: 'barr', l: 'Barras', sec: 'E', k: 'opt', o: BARR },
      { id: 'bdiam', l: 'Diámetro de barras', sec: 'E', k: 'num', u: 'mm', p: 'Barras de {v} mm de diámetro' },
      { id: 'conec', l: 'Conector transversal', sec: 'E', k: 'yn', y: 'Se coloca conector transversal', n: 'No se coloca conector transversal' },
      { id: 'cem', l: 'Cemento', sec: 'E', k: 'text', if: ['tfij', 'Tornillos fenestrados cementados'], p: 'Se inyecta {v}', ph: '2 mL de PMMA por tornillo en L4 y L5' },
      { id: 'ctrl', l: 'Control de implantes', sec: 'D', k: 'multi', req: 1, q: 1, o: CTRL, p: 'Se realiza control de la posición de los implantes mediante {v}' },
      { id: 'ctrlr', l: 'Conducta tras el control', sec: 'D', k: 'opt', o: [
        ['Sin cambios', 'No se modifican implantes luego del control de posición'],
        ['Recolocación de tornillos', 'Se recolocan tornillos a partir del control de posición'],
        ['Retiro de tornillo', 'Se retira tornillo a partir del control de posición']
      ] },
      { id: 'tart', l: 'Tipo de artrodesis', sec: 'D', k: 'multi', if: ['obj', 'Instrumentación y artrodesis'], p: 'Se realiza artrodesis {v}', o: [
        ['Posterolateral', 'posterolateral intertransversa'],
        ['Posterior', 'posterior interlaminar'],
        ['Facetaria', 'facetaria']
      ] },
      { id: 'decor', l: 'Decorticación', sec: 'D', k: 'yn', if: ['obj', 'Instrumentación y artrodesis'], y: 'Se realiza decorticación del lecho de artrodesis', n: 'No se realiza decorticación' },
      { id: 'inj', l: 'Injerto', sec: 'E', k: 'multi', if: ['obj', 'Instrumentación y artrodesis'], o: INJ, p: 'Se coloca {v} en el lecho de artrodesis' },
      ...DUROT_F,
      TRAZ_F,
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      { t: 'Se realiza incisión cutánea sobre la línea media y apertura de la fascia', if: ['via', 'Abierta por línea media'] },
      { t: 'Se realiza disección subperióstica hasta la base de las apófisis transversas', if: ['via', 'Abierta por línea media'] },
      { t: 'Se realizan incisiones paramedianas y disección por el plano entre multífido y longísimo', if: ['via', 'Paramediana (Wiltse)'] },
      { t: 'Se realizan incisiones cutáneas paramedianas sobre la proyección de los pedículos', if: ['via', 'Percutánea'] },
      { t: 'Se canalizan los pedículos con agujas tipo Jamshidi bajo control radioscópico y se colocan alambres guía', if: ['via', 'Percutánea'] },
      { t: 'Se realiza disección a través del tejido cicatrizal hasta el material previo', if: ['prim', 'Revisión'] },
      { t: 'Se identifican los puntos de entrada pediculares', ifn: ['via', 'Percutánea'] },
      { t: 'Se realiza preparación de los trayectos pediculares con punzón y sonda pedicular', ifn: ['via', 'Percutánea'] },
      'Se realiza palpación o estimulación de las paredes de cada trayecto',
      'Se insertan los tornillos {tins}',
      { t: 'Se realiza la descompresión asociada', if: ['descas', ['Laminectomía', 'Facetectomía', 'Foraminotomía', 'Osteotomía de Smith-Petersen', 'Osteotomía de Ponte', 'Osteotomía de sustracción pedicular']] },
      { t: 'Se pasan las barras en forma percutánea a través de las extensiones de los tornillos', if: ['via', 'Percutánea'] },
      { t: 'Se realiza contorneado y colocación de las barras', ifn: ['via', 'Percutánea'] },
      'Se realizan maniobras de compresión, distracción o reducción',
      'Se realiza ajuste final de los tornillos de bloqueo',
      { t: 'Se realiza decorticación de apófisis transversas y facetas con fresado de alta velocidad', if: ['decor', 'si'] },
      { t: 'Se coloca injerto en el lecho de artrodesis', if: ['obj', 'Instrumentación y artrodesis'] },
      'Se realiza control radioscópico final'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se realiza monitoreo de potenciales evocados motores y electromiografía libre y estimulada, y se confirma el nivel mediante radioscopía. Se realiza abordaje posterior abierto por línea media con instrumentación y artrodesis. Se constata espondilolistesis con movilidad anormal del segmento. Se instrumentan L4 y L5 con tornillos pediculares insertados bajo guía radioscópica, de 6,5 × 45 mm en L4 y de 6,5 × 40 mm en L5 bilaterales, con dos barras de titanio de 5,5 mm. Se realiza control de la posición de los implantes mediante radioscopía en proyecciones anteroposterior y lateral y estimulación electromiográfica de los tornillos. Se realiza decorticación y artrodesis posterolateral intertransversa con autoinjerto óseo local. No se produce durotomía incidental. Se deja drenaje subfascial aspirativo'
  },
  { id: 'nc-itp', n: 'Instrumentación transpedicular', cat: 'Columna torácica y lumbar', syn: ['instrumentación transpedicular', 'tornillos pediculares', 'fijación transpedicular', 'fijación percutánea', 'osteosíntesis transpedicular', 'fijación de fractura toracolumbar'], alias: 'nc-art' },

  // TLIF / PLIF
  {
    id: 'nc-lif',
    n: 'Fusión intersomática lumbar TLIF',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['TLIF', 'MIS-TLIF', 'PLIF', 'fusión intersomática transforaminal', 'fusión intersomática posterior', 'artrodesis intersomática', 'cage lumbar', '360 posterior'],
    v: 2,
    ctx: 'Artrodesis intersomática lumbar por vía posterior, transforaminal unilateral (abierta o mínimamente invasiva) o posterior bilateral, con fijación transpedicular. Técnica, espacios, lado de la facetectomía, dispositivo por nivel, tornillos por nivel y control de posición son obligatorios',
    lat: true,
    ref: [R_FUS, R_NASS_SPL, R_FOLEY, R_BENZEL, R_AO, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['TLIF abierta', 'artrodesis intersomática transforaminal abierta'],
        ['TLIF mínimamente invasiva', 'artrodesis intersomática transforaminal mínimamente invasiva'],
        ['PLIF', 'artrodesis intersomática posterior bilateral']
      ], p: 'Se realiza {v}' },
      { id: 'niv', l: 'Espacios intersomáticos', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: DISC_L, p: 'Se realiza fusión intersomática en {v}' },
      { id: 'nivi', l: 'Vértebras instrumentadas', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT_L, p: 'Se instrumentan {v}' },
      { id: 'lat', l: 'Lado de la facetectomía', sec: 'A', k: 'opt', vr: 1, req: 1, q: 1, o: LADO },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_LUMBAR },
      MARCA_F,
      ...NAV_F,
      ...MNIO_F,
      { id: 'hesp', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [...HALL_DEG, ['Espondilolistesis', 'espondilolistesis'], ['Lisis ístmica', 'lisis ístmica'], ['Calidad ósea disminuida', 'calidad ósea disminuida']] },
      { id: 'facet', l: 'Facetectomía', sec: 'D', k: 'opt', q: 1, o: [
        ['Unilateral total', 'Se realiza facetectomía total unilateral'],
        ['Bilateral total', 'Se realiza facetectomía total bilateral'],
        ['Parcial medial bilateral', 'Se realiza facetectomía medial parcial bilateral']
      ] },
      { id: 'raices', l: 'Raíces identificadas y protegidas', sec: 'D', k: 'text', req: 1, p: 'Se identifican y protegen {v}', ph: 'la raíz emergente L4 y la transitante L5 izquierdas' },
      { id: 'desc', l: 'Descompresión asociada', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Laminectomía', 'laminectomía'],
        ['Descompresión contralateral', 'descompresión contralateral por debajo de la apófisis espinosa'],
        ['Foraminotomía', 'foraminotomía'],
        ['Reducción de la listesis', 'reducción de la espondilolistesis']
      ] },
      { id: 'cage', l: 'Tipo de dispositivo intersomático', sec: 'E', k: 'opt', req: 1, q: 1, o: [
        ['Recto', 'Se coloca dispositivo intersomático recto'],
        ['Curvo de colocación anterior', 'Se coloca dispositivo intersomático curvo en el tercio anterior del espacio'],
        ['Expandible', 'Se coloca dispositivo intersomático expandible'],
        ['Dos dispositivos', 'Se colocan dos dispositivos intersomáticos']
      ] },
      { id: 'cmat', l: 'Material del dispositivo', sec: 'E', k: 'opt', o: CAGE_MAT, p: 'Dispositivo intersomático {v}' },
      { id: 'implc', l: 'Dispositivo por nivel (medidas)', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se colocan {v}', ph: 'dispositivo de 10 mm de altura, 28 mm de longitud y 8° de lordosis en L4-L5' },
      { id: 'inj', l: 'Injerto', sec: 'E', k: 'multi', o: INJ, p: 'Se coloca {v} en el espacio discal y dentro del dispositivo' },
      { id: 'tins', l: 'Inserción de tornillos', sec: 'D', k: 'opt', o: TINS, p: 'Se insertan los tornillos {v}' },
      { id: 'implt', l: 'Tornillos por nivel (medidas)', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se colocan {v}', ph: 'tornillos poliaxiales de 6,5 × 45 mm en L4 y L5 bilaterales' },
      { id: 'barr', l: 'Barras', sec: 'E', k: 'opt', o: BARR },
      { id: 'bdiam', l: 'Diámetro de barras', sec: 'E', k: 'num', u: 'mm', p: 'Barras de {v} mm de diámetro' },
      { id: 'ctrl', l: 'Control de implantes', sec: 'D', k: 'multi', req: 1, q: 1, o: CTRL, p: 'Se realiza control de la posición de los implantes mediante {v}' },
      { id: 'ctrlr', l: 'Conducta tras el control', sec: 'D', k: 'opt', o: [
        ['Sin cambios', 'No se modifican implantes luego del control de posición'],
        ['Recolocación de implantes', 'Se recolocan implantes a partir del control de posición']
      ] },
      ...DUROT_F,
      TRAZ_F,
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      { t: 'Se realiza incisión cutánea sobre la línea media y disección subperióstica hasta las apófisis transversas', if: ['tec', ['TLIF abierta', 'PLIF']] },
      { t: 'Se realizan incisiones paramedianas, dilatación secuencial y colocación de retractor tubular o expandible sobre la faceta', if: ['tec', 'TLIF mínimamente invasiva'] },
      'Se realiza control radioscópico del nivel expuesto',
      { t: 'Se realiza disección a través del tejido cicatrizal hasta el material previo', if: ['prim', 'Revisión'] },
      'Se preparan los trayectos pediculares y se insertan los tornillos {tins}',
      'Se incorpora microscopio quirúrgico',
      { t: 'Se realiza facetectomía total con osteótomo y fresado del lado {lat}', if: ['tec', ['TLIF abierta', 'TLIF mínimamente invasiva']] },
      { t: 'Se realiza laminectomía y facetectomía medial bilateral', if: ['tec', 'PLIF'] },
      'Se reseca el ligamento amarillo y se identifican la raíz emergente y la transitante',
      'Se realiza hemostasia del plexo venoso epidural con bipolar',
      { t: 'Se realiza distracción del espacio con barra temporaria contralateral', if: ['tec', ['TLIF abierta', 'TLIF mínimamente invasiva']] },
      { t: 'Se realiza retracción medial del saco dural en forma alternada de ambos lados', if: ['tec', 'PLIF'] },
      'Se realiza anulotomía y discectomía con pinzas, curetas y raspas',
      'Se realiza preparación de los platillos vertebrales preservando la cortical',
      'Se realiza medición del espacio con implantes de prueba bajo control radioscópico',
      'Se coloca injerto en el espacio discal anterior',
      'Se inserta el dispositivo intersomático bajo control radioscópico protegiendo las raíces',
      'Se realiza contorneado y colocación de las barras y compresión sobre el dispositivo',
      'Se realiza ajuste final de los tornillos de bloqueo',
      'Se realiza control radioscópico final'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se realiza monitoreo de potenciales evocados motores y electromiografía libre y estimulada. Se realiza artrodesis intersomática transforaminal abierta. Se realiza fusión intersomática en L4-L5 y se instrumentan L4 y L5. Se constata espondilolistesis y estenosis del receso lateral. Se realiza facetectomía total unilateral izquierda y se identifican y protegen la raíz emergente L4 y la transitante L5 izquierdas. Se coloca dispositivo intersomático curvo en el tercio anterior del espacio, de PEEK, de 10 mm de altura y 28 mm de longitud, con autoinjerto óseo local. Se colocan tornillos poliaxiales de 6,5 × 45 mm en L4 y L5 bilaterales y dos barras de titanio de 5,5 mm. Se realiza control de la posición de los implantes mediante radioscopía en proyecciones anteroposterior y lateral. No se produce durotomía incidental. Se deja drenaje subfascial aspirativo'
  },
  { id: 'nc-plif', n: 'Fusión intersomática lumbar PLIF', cat: 'Columna torácica y lumbar', syn: ['PLIF', 'fusión intersomática posterior', 'artrodesis intersomática posterior'], alias: 'nc-lif', set: { tec: 'PLIF', lat: 'Bilateral' } },

  // ALIF
  {
    id: 'nc-alif',
    n: 'Fusión intersomática lumbar anterior ALIF',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['ALIF', 'fusión intersomática anterior', 'abordaje retroperitoneal', 'artrodesis anterior lumbar', 'L5-S1 anterior'],
    v: 2,
    ctx: 'Artrodesis intersomática lumbar por vía anterior retroperitoneal o transperitoneal, habitualmente en L4-L5 o L5-S1, con dispositivo con o sin fijación integrada. Espacios, abordaje, manejo vascular, dispositivo por nivel y control radioscópico son obligatorios. El acceso suele realizarlo un cirujano de acceso',
    lat: false,
    ref: [R_FUS, R_BENZEL, R_AO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Espacios intersomáticos', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: DISC_L, p: 'Se realiza fusión intersomática anterior en {v}' },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, p: 'Se realiza abordaje {v}', o: [
        ['Retroperitoneal paramediano izquierdo', 'retroperitoneal paramediano izquierdo'],
        ['Retroperitoneal paramediano derecho', 'retroperitoneal paramediano derecho'],
        ['Retroperitoneal por Pfannenstiel', 'retroperitoneal por incisión de Pfannenstiel'],
        ['Transperitoneal', 'transperitoneal por laparotomía mediana']
      ] },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Supino', 'Paciente en decúbito supino con rodete bajo la región lumbar'],
        ['Supino en Trendelenburg', 'Paciente en decúbito supino en Trendelenburg con rodete bajo la región lumbar']
      ] },
      { id: 'acc', l: 'Cirujano de acceso', sec: 'B', k: 'text', p: 'El acceso es realizado por {v}', ph: 'el equipo de Cirugía Vascular' },
      MARCA_F,
      ...MNIO_F,
      { id: 'oxi', l: 'Oximetría de miembro inferior', sec: 'B', k: 'yn', y: 'Se monitoriza la oximetría de pulso del miembro inferior izquierdo durante la retracción vascular', n: 'No se monitoriza la oximetría del miembro inferior' },
      { id: 'hdisc', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Disco degenerado', 'disco degenerado con pérdida de altura'],
        ['Osteofitos anteriores', 'osteofitos anteriores'],
        ['Espondilolistesis', 'espondilolistesis'],
        ['Bifurcación vascular baja', 'bifurcación iliocava baja'],
        ['Adherencias perivasculares', 'adherencias perivasculares']
      ] },
      { id: 'vasc', l: 'Manejo vascular', sec: 'D', k: 'multi', q: 1, p: 'Se realiza {v}', o: [
        ['Ligadura de vasos sacros medios', 'ligadura de los vasos sacros medios'],
        ['Ligadura de vena iliolumbar', 'ligadura de la vena iliolumbar'],
        ['Ligadura de vena lumbar ascendente', 'ligadura de la vena lumbar ascendente'],
        ['Movilización de vasos ilíacos izquierdos', 'movilización de los vasos ilíacos izquierdos hacia la derecha'],
        ['Movilización de aorta y vena cava', 'movilización de la aorta y la vena cava hacia la derecha']
      ] },
      { id: 'estp', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', p: 'Se identifican y preservan {v}', o: [
        ['Peritoneo', 'el saco peritoneal'],
        ['Uréter', 'el uréter'],
        ['Plexo hipogástrico superior', 'el plexo hipogástrico superior'],
        ['Cadena simpática lumbar', 'la cadena simpática lumbar'],
        ['Nervio genitofemoral', 'el nervio genitofemoral'],
        ['Vasos ilíacos', 'los vasos ilíacos comunes']
      ] },
      { id: 'lesv', l: 'Lesión vascular', sec: 'D', k: 'yn', req: 1, y: 'Se produce lesión vascular', n: 'No se produce lesión vascular' },
      { id: 'lesvd', l: 'Descripción y reparación de la lesión vascular', sec: 'D', k: 'text', if: ['lesv', 'si'], req: 1, p: 'Lesión vascular {v}', ph: 'de 3 mm en la vena ilíaca común izquierda, reparada con sutura de polipropileno 5-0 por Cirugía Vascular' },
      { id: 'disc', l: 'Discectomía', sec: 'D', k: 'opt', o: [
        ['Discectomía total', 'Se realiza discectomía total hasta el anillo posterior'],
        ['Con liberación del LLP', 'Se realiza discectomía total con liberación del ligamento longitudinal posterior']
      ] },
      { id: 'cage', l: 'Dispositivo intersomático', sec: 'E', k: 'opt', req: 1, q: 1, o: [
        ['Con fijación integrada', 'Se coloca dispositivo intersomático con tornillos integrados'],
        ['Con placa anterior', 'Se coloca dispositivo intersomático con placa anterior'],
        ['Sin fijación', 'Se coloca dispositivo intersomático sin fijación anterior']
      ] },
      { id: 'cmat', l: 'Material del dispositivo', sec: 'E', k: 'opt', o: CAGE_MAT, p: 'Dispositivo intersomático {v}' },
      { id: 'implc', l: 'Dispositivo por nivel (medidas)', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se colocan {v}', ph: 'dispositivo de 14 mm de altura, 32 × 26 mm y 12° de lordosis en L5-S1, con 3 tornillos de 5,0 × 25 mm' },
      { id: 'inj', l: 'Injerto', sec: 'E', k: 'multi', o: INJ, p: 'Se rellena el dispositivo con {v}' },
      { id: 'ctrl', l: 'Control de implantes', sec: 'D', k: 'multi', req: 1, q: 1, o: CTRL, p: 'Se realiza control de la posición de los implantes mediante {v}' },
      { id: 'post', l: 'Fijación posterior', sec: 'D', k: 'yn', y: 'Se asocia fijación posterior en el mismo acto quirúrgico, documentada por separado', n: 'No se asocia fijación posterior en el mismo acto' },
      TRAZ_F,
      DREN_COL,
      { id: 'cierre', l: 'Cierre por planos', sec: 'G', k: 'multi', p: 'Se realiza {v}', o: [
        ['Vaina posterior del recto', 'cierre de la vaina posterior del recto'],
        ['Vaina anterior del recto', 'cierre de la vaina anterior del recto con sutura continua'],
        ['Aponeurosis', 'cierre de la aponeurosis con sutura continua'],
        ['Tejido celular subcutáneo', 'cierre del tejido celular subcutáneo']
      ] }
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión cutánea y apertura de la vaina anterior del recto',
      { t: 'Se desarrolla el espacio retroperitoneal con rechazo medial del saco peritoneal', ifn: ['abord', 'Transperitoneal'] },
      { t: 'Se realiza apertura del peritoneo posterior y rechazo de las asas intestinales', if: ['abord', 'Transperitoneal'] },
      'Se identifican el uréter y los vasos ilíacos',
      'Se realiza disección roma del plexo hipogástrico superior sin uso de monopolar',
      'Se realiza ligadura de los vasos segmentarios necesarios para la exposición',
      'Se colocan separadores vasculares autoestáticos',
      'Se realiza control radioscópico del nivel con aguja en el disco',
      'Se realiza incisión rectangular del anillo anterior',
      'Se realiza discectomía con pinzas, curetas y raspas',
      'Se realiza preparación de los platillos vertebrales preservando la cortical',
      'Se realiza distracción del espacio y medición con implantes de prueba bajo control radioscópico',
      'Se inserta el dispositivo intersomático bajo control radioscópico',
      { t: 'Se colocan los tornillos de fijación integrada', if: ['cage', 'Con fijación integrada'] },
      { t: 'Se coloca la placa anterior y se fijan los tornillos', if: ['cage', 'Con placa anterior'] },
      'Se realiza control radioscópico final',
      'Se retiran los separadores y se revisan los vasos, el uréter y la integridad del peritoneo'
    ],
    ej: 'Paciente en decúbito supino con rodete bajo la región lumbar. El acceso es realizado por el equipo de Cirugía Vascular. Se realiza abordaje retroperitoneal paramediano izquierdo y se confirma el nivel mediante radioscopía. Se realiza fusión intersomática anterior en L5-S1. Se realiza ligadura de los vasos sacros medios. Se identifican y preservan el uréter y el plexo hipogástrico superior. No se produce lesión vascular. Se realiza discectomía total hasta el anillo posterior. Se coloca dispositivo intersomático con tornillos integrados, de titanio poroso, de 14 mm de altura y 12° de lordosis, con 3 tornillos de 5,0 × 25 mm, relleno con aloinjerto óseo. Se realiza control de la posición de los implantes mediante radioscopía en proyecciones anteroposterior y lateral. Se realiza cierre de la vaina anterior del recto con sutura continua y del tejido celular subcutáneo'
  },

  // Lesión medular traumática
  {
    id: 'nc-trm',
    n: 'Descompresión por lesión medular traumática',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['lesión medular traumática', 'trauma raquimedular', 'TRM', 'fractura vertebral', 'luxación cervical', 'fractura estallido', 'descompresión urgente', 'fijación de fractura'],
    v: 2,
    ctx: 'Descompresión del canal y estabilización en lesión medular traumática aguda cervical, torácica o toracolumbar, por vía anterior, posterior o combinada. Niveles lesionados e instrumentados, vía, tiempo desde el traumatismo, implantes por nivel y control de posición son obligatorios. La clasificación y el AIS se transcriben de la evaluación preoperatoria, no se infieren',
    lat: false,
    ref: [R_SCI, R_SCI_AANS, R_AO, R_BENZEL, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'reg', l: 'Región', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: REG, p: 'Lesión de columna {v}' },
      { id: 'nivl', l: 'Nivel lesionado', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT, p: 'Nivel lesionado {v}' },
      { id: 'via', l: 'Vía', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [['Posterior', 'posterior'], ['Anterior', 'anterior'], ['Combinada', 'combinada anterior y posterior']], p: 'Se realiza abordaje por vía {v}' },
      { id: 'tlesh', l: 'Horas desde el traumatismo', sec: 'B', k: 'num', u: 'h', req: 1, q: 1, p: 'Se interviene a las {v} h del traumatismo' },
      { id: 'clas', l: 'Clasificación AO Spine', sec: 'B', k: 'text', q: 1, p: 'Lesión clasificada como {v} según AO Spine', ph: 'C6-C7 tipo C, F4 bilateral' },
      { id: 'aisp', l: 'AIS preoperatorio', sec: 'B', k: 'opt', q: 1, p: 'AIS preoperatorio {v}', o: [['A', 'A'], ['B', 'B'], ['C', 'C'], ['D', 'D'], ['E', 'E'], ['No evaluable', 'no evaluable']] },
      { id: 'pam', l: 'PAM objetivo', sec: 'B', k: 'num', u: 'mmHg', p: 'Se indica a anestesia mantener presión arterial media mayor de {v} mmHg' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [...POS_CPOST, ...POS_COLUMNA] },
      { id: 'trasl', l: 'Traslado a la mesa', sec: 'B', k: 'yn', y: 'Se realiza traslado a la mesa quirúrgica en bloque con protección de la columna', n: 'No se documenta traslado en bloque' },
      MARCA_F,
      ...NAV_F,
      ...MNIO_F,
      { id: 'htrm', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Luxación facetaria', 'luxación facetaria'],
        ['Faceta encaramada', 'faceta encaramada'],
        ['Fractura de láminas', 'fractura de láminas'],
        ['Fragmento retropulsado', 'fragmento óseo retropulsado en el canal'],
        ['Hernia discal traumática', 'hernia discal traumática'],
        ['Hematoma epidural', 'hematoma epidural'],
        ['Lesión del complejo ligamentario posterior', 'lesión del complejo ligamentario posterior'],
        ['Desgarro dural traumático', 'desgarro dural traumático'],
        ['Raíces herniadas por el desgarro', 'raíces herniadas a través del desgarro dural'],
        ['Saco dural tenso', 'saco dural tenso'],
        ['Médula de aspecto contuso', 'médula de aspecto contuso']
      ] },
      { id: 'red', l: 'Reducción', sec: 'D', k: 'opt', q: 1, o: [
        ['Cerrada preoperatoria', 'La reducción se obtiene en forma cerrada con tracción previa a la cirugía'],
        ['Abierta intraoperatoria', 'Se realiza reducción abierta intraoperatoria'],
        ['Con instrumentación', 'Se realiza reducción mediante maniobras sobre la instrumentación'],
        ['No requiere', 'No se requiere reducción']
      ] },
      { id: 'desc', l: 'Descompresión', sec: 'D', k: 'multi', req: 1, q: 1, p: 'Se realiza {v}', o: [
        ['Laminectomía', 'laminectomía'],
        ['Facetectomía', 'facetectomía'],
        ['Discectomía', 'discectomía'],
        ['Corpectomía', 'corpectomía'],
        ['Descompresión transpedicular', 'descompresión transpedicular con impactación del fragmento retropulsado'],
        ['Evacuación de hematoma epidural', 'evacuación de hematoma epidural'],
        ['Duroplastia expansiva', 'durotomía y duroplastia expansiva']
      ] },
      { id: 'tdur', l: 'Reparación de desgarro dural traumático', sec: 'D', k: 'multi', if: ['htrm', 'Desgarro dural traumático'], o: DUROT_REP, p: 'Se repara el desgarro dural traumático con {v}' },
      { id: 'niv', l: 'Niveles instrumentados', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: [['Occipucio', 'el occipucio'], ...VERT, ['S2', 'S2'], ['Ilíaco', 'el ilíaco']], p: 'Se instrumentan {v}' },
      { id: 'tfij', l: 'Técnica de fijación', sec: 'E', k: 'multi', req: 1, q: 1, p: 'Se realiza fijación con {v}', o: [
        ['Tornillos de masa lateral', 'tornillos de masa lateral'],
        ['Tornillos pediculares', 'tornillos pediculares'],
        ['Tornillos en vértebra fracturada', 'tornillos de anclaje en la vértebra fracturada'],
        ['Placa cervical anterior', 'placa cervical anterior'],
        ['Dispositivo intersomático', 'dispositivo intersomático'],
        ['Reemplazo vertebral', 'dispositivo de reemplazo vertebral'],
        ['Tornillos cementados', 'tornillos aumentados con cemento']
      ] },
      { id: 'tins', l: 'Inserción de tornillos', sec: 'D', k: 'opt', o: TINS, p: 'Se insertan los tornillos {v}' },
      { id: 'implv', l: 'Implantes por nivel (medidas)', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se colocan {v}', ph: 'tornillos de 6,0 × 45 mm en T11, T12, L2 y L3 bilaterales, barras de titanio de 5,5 mm' },
      { id: 'ctrl', l: 'Control de implantes', sec: 'D', k: 'multi', req: 1, q: 1, o: CTRL, p: 'Se realiza control de la posición de los implantes y de la alineación mediante {v}' },
      { id: 'inj', l: 'Injerto', sec: 'E', k: 'multi', o: INJ, p: 'Se coloca {v} en el lecho de artrodesis' },
      ...DUROT_F,
      TRAZ_F,
      DREN_COL,
      CIERRE_P,
      COLLAR_F
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      { t: 'Se realiza incisión sobre la línea media posterior y disección subperióstica con cuidado sobre los elementos fracturados', if: ['via', ['Posterior', 'Combinada']] },
      { t: 'Se realiza abordaje cervical anterior por el plano entre el paquete carotídeo y el eje visceral', if: ['reg', 'Cervical'] },
      'Se realiza control radioscópico del nivel expuesto',
      { t: 'Se realiza reducción de la luxación facetaria con resección de la punta de la faceta superior', if: ['htrm', ['Luxación facetaria', 'Faceta encaramada']] },
      'Se preparan los trayectos y se insertan los tornillos {tins}',
      'Se incorpora microscopio quirúrgico',
      'Se realiza la descompresión del canal y se retiran los fragmentos y el hematoma que comprimen el saco dural',
      { t: 'Se realiza durotomía longitudinal y duroplastia expansiva con sustituto dural', if: ['desc', 'Duroplastia expansiva'] },
      { t: 'Se reintroducen las raíces herniadas y se repara el desgarro dural', if: ['htrm', 'Raíces herniadas por el desgarro'] },
      'Se explora el espacio epidural con gancho romo',
      'Se realiza contorneado y colocación de las barras y maniobras de reducción',
      'Se realiza ajuste final de los tornillos de bloqueo',
      'Se realiza control radioscópico final de implantes y alineación'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre, trasladado a la mesa en bloque con protección de la columna. Se interviene a las 9 h del traumatismo. Lesión clasificada como L1 tipo A4 N3 según AO Spine. AIS preoperatorio C. Se indica a anestesia mantener presión arterial media mayor de 85 mmHg. Se realiza monitoreo de potenciales evocados motores y somatosensitivos. Se realiza abordaje por vía posterior y se confirma el nivel mediante radioscopía. Se constata fragmento óseo retropulsado en el canal. Se realiza laminectomía y descompresión transpedicular con impactación del fragmento retropulsado. Se instrumentan T11, T12, L2 y L3 con tornillos pediculares bajo guía radioscópica, de 6,0 × 45 mm bilaterales, con dos barras de titanio. Se realiza control de la posición de los implantes y de la alineación mediante radioscopía en proyecciones anteroposterior y lateral. No se produce durotomía incidental'
  },

  // Tumor vertebral
  {
    id: 'nc-tvert',
    n: 'Resección de tumor vertebral',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['tumor vertebral', 'metástasis vertebral', 'cirugía de separación', 'separation surgery', 'corpectomía', 'vertebrectomía', 'resección en bloque', 'compresión medular metastásica', 'SINS', 'NOMS'],
    v: 2,
    ctx: 'Lesión tumoral vertebral primaria o metastásica con compresión epidural o inestabilidad, tratada con descompresión y estabilización (cirugía de separación), corpectomía con reconstrucción o resección en bloque. Niveles, objetivo, vía, extensión de la resección e implantes son obligatorios. La histología no se infiere: se transcribe lo informado por patología',
    lat: false,
    ref: [R_NOMS, R_SINS, R_BENZEL, R_AO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Vértebras afectadas', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT, p: 'Lesión en {v}' },
      { id: 'obj', l: 'Objetivo', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Descompresión y estabilización', 'Se realiza descompresión circunferencial del saco dural y estabilización (cirugía de separación)'],
        ['Corpectomía con reconstrucción', 'Se realiza corpectomía con reconstrucción de la columna anterior'],
        ['Resección en bloque', 'Se realiza resección en bloque de la lesión'],
        ['Biopsia y estabilización', 'Se realiza biopsia y estabilización']
      ] },
      { id: 'via', l: 'Vía', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Posterior', 'posterior'],
        ['Posterolateral transpedicular', 'posterolateral transpedicular'],
        ['Costotransversectomía', 'por costotransversectomía'],
        ['Anterior', 'anterior'],
        ['Combinada', 'combinada anterior y posterior']
      ], p: 'Se realiza abordaje {v}' },
      { id: 'emb', l: 'Embolización preoperatoria', sec: 'B', k: 'yn', y: 'Paciente con embolización preoperatoria de la lesión', n: 'Sin embolización preoperatoria' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_COLUMNA },
      MARCA_F,
      ...NAV_F,
      ...MNIO_F,
      { id: 'recup', l: 'Recuperador de sangre', sec: 'B', k: 'yn', y: 'Se utiliza recuperador intraoperatorio de sangre con filtro de leucocitos', n: 'No se utiliza recuperador intraoperatorio de sangre' },
      { id: 'htum', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Tejido friable', 'tejido tumoral friable'],
        ['Tejido firme', 'tejido tumoral de consistencia firme'],
        ['Muy vascularizado', 'lesión ricamente vascularizada'],
        ['Componente epidural', 'componente epidural con compresión del saco dural'],
        ['Componente paravertebral', 'componente paravertebral'],
        ['Destrucción del cuerpo', 'destrucción del cuerpo vertebral'],
        ['Destrucción de elementos posteriores', 'destrucción de elementos posteriores'],
        ['Plano con la dura', 'plano de clivaje identificable con la duramadre'],
        ['Infiltración dural', 'infiltración de la duramadre']
      ] },
      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio intraoperatorio por congelación', n: 'No se realiza estudio por congelación' },
      { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'ext', l: 'Extensión de la resección', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Intralesional', 'Se realiza resección intralesional'],
        ['Marginal', 'Se realiza resección marginal'],
        ['En bloque con margen amplio', 'Se realiza resección en bloque con margen amplio'],
        ['Biopsia', 'Se realiza toma de biopsia sin resección']
      ] },
      { id: 'sep', l: 'Separación del saco dural', sec: 'D', k: 'text', p: 'Se obtiene separación entre la lesión y el saco dural de {v}', ph: '2 a 3 mm circunferencial' },
      { id: 'raizs', l: 'Raíces sacrificadas', sec: 'D', k: 'text', p: 'Se ligan y seccionan las raíces {v}', ph: 'T7 derecha' },
      { id: 'recon', l: 'Reconstrucción anterior', sec: 'E', k: 'opt', o: [
        ['Dispositivo expandible', 'Se reconstruye la columna anterior con dispositivo de reemplazo vertebral expandible'],
        ['Malla de titanio', 'Se reconstruye la columna anterior con malla de titanio'],
        ['Cemento', 'Se reconstruye la columna anterior con polimetilmetacrilato'],
        ['Sin reconstrucción anterior', 'No se realiza reconstrucción anterior']
      ] },
      { id: 'implv', l: 'Implantes por nivel (medidas)', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se colocan {v}', ph: 'tornillos fenestrados de 6,0 × 45 mm en T6, T8 y T9 bilaterales; dispositivo expandible de 18 × 30 mm en T7' },
      { id: 'cem', l: 'Cemento', sec: 'E', k: 'text', p: 'Se inyecta {v}', ph: '2 mL de PMMA por tornillo' },
      { id: 'ctrl', l: 'Control de implantes', sec: 'D', k: 'multi', req: 1, q: 1, o: CTRL, p: 'Se realiza control de la posición de los implantes mediante {v}' },
      ...DUROT_F,
      TRAZ_F,
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión sobre la línea media y disección subperióstica',
      'Se realiza control radioscópico del nivel expuesto',
      'Se preparan los trayectos y se insertan los tornillos por encima y por debajo de la lesión',
      'Se coloca barra temporaria contralateral',
      'Se realiza laminectomía y facetectomía del nivel afectado',
      { t: 'Se realiza resección de la costilla proximal y de la apófisis transversa', if: ['via', 'Costotransversectomía'] },
      { t: 'Se realiza pediculectomía y vaciamiento transpedicular del cuerpo vertebral', if: ['via', ['Posterolateral transpedicular', 'Costotransversectomía']] },
      'Se toman muestras de la lesión para estudio histológico',
      'Se realiza resección del componente epidural y separación del saco dural',
      'Se realiza resección del ligamento longitudinal posterior',
      { t: 'Se realiza corpectomía y preparación de los platillos adyacentes', if: ['obj', ['Corpectomía con reconstrucción', 'Resección en bloque']] },
      { t: 'Se realizan osteotomías con sierra de hilo y se extrae la pieza en bloque', if: ['obj', 'Resección en bloque'] },
      { t: 'Se coloca el dispositivo de reconstrucción anterior bajo control radioscópico', if: ['obj', ['Corpectomía con reconstrucción', 'Resección en bloque']] },
      'Se realiza contorneado y colocación de las barras definitivas',
      'Se realiza ajuste final de los tornillos de bloqueo',
      'Se realiza control radioscópico final'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se realiza monitoreo de potenciales evocados motores y somatosensitivos y se confirma el nivel mediante radioscopía. Lesión en T7. Se realiza descompresión circunferencial del saco dural y estabilización (cirugía de separación) por abordaje posterolateral transpedicular. Se constata tejido tumoral friable con componente epidural y compresión del saco dural. Se realiza resección intralesional, con separación entre la lesión y el saco dural de 2 mm circunferencial. Se colocan tornillos fenestrados de 6,0 × 45 mm en T5, T6, T8 y T9 bilaterales con dos barras de titanio. Se envían muestras a Anatomía Patológica. No se produce durotomía incidental'
  },

  // Intradural extramedular
  {
    id: 'nc-ide',
    n: 'Resección de lesión intradural extramedular',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['intradural extramedular', 'schwannoma espinal', 'meningioma espinal', 'neurofibroma', 'tumor intradural', 'ependimoma mixopapilar', 'tumor de la cola de caballo'],
    v: 2,
    ctx: 'Resección microquirúrgica de lesión intradural extramedular a cualquier nivel por vía posterior con durotomía planificada. Niveles, posición de la lesión respecto de la médula, manejo de la raíz de origen o de la base dural, extensión de la resección y cierre dural son obligatorios. La histología no se infiere',
    lat: false,
    ref: [R_BENZEL, R_KOTH, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Niveles', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT, p: 'Se interviene a nivel de {v}' },
      { id: 'loc', l: 'Posición respecto de la médula', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Dorsal', 'Lesión de localización dorsal'],
        ['Dorsolateral derecha', 'Lesión de localización dorsolateral derecha'],
        ['Dorsolateral izquierda', 'Lesión de localización dorsolateral izquierda'],
        ['Ventral', 'Lesión de localización ventral'],
        ['Ventrolateral derecha', 'Lesión de localización ventrolateral derecha'],
        ['Ventrolateral izquierda', 'Lesión de localización ventrolateral izquierda'],
        ['Entre raíces de la cola de caballo', 'Lesión entre las raíces de la cola de caballo'],
        ['En reloj de arena', 'Lesión con componente intra y extradural en reloj de arena']
      ] },
      { id: 'osea', l: 'Acceso óseo', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Laminectomía', 'laminectomía'],
        ['Hemilaminectomía', 'hemilaminectomía'],
        ['Laminotomía con reposición (laminoplastia)', 'laminotomía en bloque para reposición posterior']
      ], p: 'Se realiza {v}' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [...POS_LUMBAR, ...POS_CPOST] },
      MARCA_F,
      ...NAV_F,
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', req: 1, q: 1, y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], req: 1, p: 'Se monitorean {v}', o: [...MNIO_ESP, ['Onda D', 'onda D epidural'], ['Estimulación directa de raíces', 'estimulación directa de raíces y fascículos'], ['Reflejo bulbocavernoso', 'reflejo bulbocavernoso']] },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], req: 1, o: MNIO_RES },
      { id: 'mnioa', l: 'Conducta ante alerta', sec: 'D', k: 'multi', if: ['mnior', ['Caída transitoria', 'Caída persistente', 'Pérdida de potenciales', 'Descargas EMG']], o: MNIO_ALERTA, p: 'Ante la alerta del monitoreo se realiza {v}' },
      { id: 'eco', l: 'Ecografía antes de la apertura dural', sec: 'B', k: 'yn', y: 'Se realiza ecografía intraoperatoria para localizar la lesión antes de la apertura dural', n: 'No se realiza ecografía intraoperatoria' },
      { id: 'hles', l: 'Características de la lesión', sec: 'C', k: 'multi', p: 'Se identifica lesión {v}', o: [
        ['Encapsulada', 'encapsulada'],
        ['Dependiente de raíz', 'dependiente de una raíz o fascículo'],
        ['Con implantación dural', 'con implantación dural'],
        ['Calcificada', 'calcificada'],
        ['Blanda', 'de consistencia blanda'],
        ['Firme', 'de consistencia firme'],
        ['Vascularizada', 'vascularizada'],
        ['Con plano aracnoideo', 'con plano aracnoideo respecto de la médula'],
        ['Adherida a la médula', 'adherida a la superficie medular'],
        ['Con desplazamiento medular', 'que desplaza la médula']
      ] },
      { id: 'adj', l: 'Adyuvantes', sec: 'D', k: 'multi', p: 'Se utiliza {v}', o: ADJ_MICRO },
      { id: 'raizo', l: 'Raíz o fascículo de origen', sec: 'D', k: 'text', p: 'Se secciona el fascículo de origen de la lesión {v}', ph: 'de la raíz sensitiva T10 derecha, sin respuesta a la estimulación a 2 mA' },
      { id: 'bdur', l: 'Manejo de la base dural', sec: 'D', k: 'opt', o: [
        ['Coagulación', 'Se realiza coagulación de la implantación dural'],
        ['Resección de la hoja interna', 'Se realiza resección de la hoja interna de la duramadre en la implantación'],
        ['Resección completa y duroplastia', 'Se realiza resección de la implantación dural y duroplastia']
      ] },
      { id: 'ext', l: 'Extensión de la resección', sec: 'D', k: 'opt', req: 1, q: 1, o: EXT_RES },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'adherido a la cara ventral de la médula' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', req: 1, q: 1, o: CDUR_ESP, p: 'Se realiza {v}' },
      { id: 'valsa', l: 'Prueba de Valsalva', sec: 'G', k: 'yn', y: 'Se realiza maniobra de Valsalva para evaluar la estanqueidad del cierre dural', n: 'No se realiza maniobra de Valsalva' },
      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio intraoperatorio por congelación', n: 'No se realiza estudio por congelación' },
      { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'lamr', l: 'Reposición laminar', sec: 'E', k: 'text', if: ['osea', 'Laminotomía con reposición (laminoplastia)'], p: 'Se reponen las láminas con {v}', ph: 'miniplacas de titanio' },
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión sobre la línea media y disección subperióstica',
      'Se realiza control radioscópico del nivel expuesto',
      'Se realiza {osea}',
      'Se realiza hemostasia epidural meticulosa antes de la apertura dural',
      'Se incorpora microscopio quirúrgico',
      'Se realiza durotomía longitudinal en la línea media y se fijan los bordes con puntos de reparo',
      'Se realiza apertura de la aracnoides',
      'Se identifican los polos craneal y caudal de la lesión',
      { t: 'Se secciona el ligamento dentado para rotar la médula', if: ['loc', ['Ventral', 'Ventrolateral derecha', 'Ventrolateral izquierda']] },
      'Se disecan la lesión y las raíces en el plano aracnoideo',
      'Se estimula el fascículo de origen antes de su sección',
      'Se realiza vaciamiento intracapsular de la lesión',
      'Se realiza disección de la cápsula y extracción de la lesión',
      'Se realiza irrigación del espacio subaracnoideo',
      'Se realiza cierre dural'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se realiza monitoreo de potenciales evocados motores y somatosensitivos y onda D epidural. Se confirma el nivel mediante radioscopía. Se interviene a nivel de T10 y T11. Lesión de localización dorsolateral derecha. Se realiza laminectomía, durotomía longitudinal en la línea media y apertura de la aracnoides. Se identifica lesión encapsulada, dependiente de una raíz o fascículo, con plano aracnoideo respecto de la médula. Se secciona el fascículo de origen de la lesión de la raíz sensitiva T10 derecha, sin respuesta a la estimulación a 2 mA. Se realiza resección completa macroscópica de la lesión. No se registran cambios en el monitoreo neurofisiológico. Se realiza cierre dural primario hermético con sutura continua y refuerzo con sellante dural. Se envía pieza a Anatomía Patológica'
  },

  // Intramedular
  {
    id: 'nc-im',
    n: 'Resección de lesión intramedular',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['tumor intramedular', 'ependimoma', 'astrocitoma medular', 'hemangioblastoma medular', 'cavernoma medular', 'mielotomía'],
    v: 2,
    ctx: 'Resección microquirúrgica de lesión intramedular por mielotomía, con monitoreo de potenciales motores y onda D. Niveles, tipo de mielotomía, extensión de la resección, resultado del monitoreo y cierre dural son obligatorios. La histología no se infiere',
    lat: false,
    ref: [R_KOTH, R_BENZEL, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Niveles', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT, p: 'Se interviene a nivel de {v}' },
      { id: 'osea', l: 'Acceso óseo', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Laminectomía', 'laminectomía'],
        ['Laminotomía con reposición (laminoplastia)', 'laminotomía en bloque para reposición posterior']
      ], p: 'Se realiza {v}' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [...POS_LUMBAR, ...POS_CPOST] },
      MARCA_F,
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', req: 1, q: 1, y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], req: 1, p: 'Se monitorean {v}', o: [
        ['PEM musculares', 'potenciales evocados motores musculares'],
        ['Onda D', 'onda D epidural'],
        ['PESS', 'potenciales evocados somatosensitivos'],
        ['Mapeo de columnas dorsales', 'mapeo de columnas dorsales'],
        ['Reflejo bulbocavernoso', 'reflejo bulbocavernoso']
      ] },
      { id: 'ondad', l: 'Onda D basal', sec: 'B', k: 'num', u: 'µV', if: ['mnio', 'si'], p: 'Amplitud basal de la onda D de {v} µV' },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], req: 1, o: [
        ['Sin cambios', 'No se registran cambios en el monitoreo neurofisiológico durante el procedimiento'],
        ['Pérdida de PEM con onda D estable', 'Se registra pérdida de potenciales motores musculares con onda D estable'],
        ['Caída de onda D menor del 50 %', 'Se registra caída de la amplitud de la onda D menor del 50 %'],
        ['Caída de onda D mayor del 50 %', 'Se registra caída de la amplitud de la onda D mayor del 50 %'],
        ['Caída transitoria con recuperación', 'Se registra caída transitoria de los potenciales, con recuperación durante el procedimiento']
      ] },
      { id: 'mnioa', l: 'Conducta ante alerta', sec: 'D', k: 'multi', if: ['mnior', ['Pérdida de PEM con onda D estable', 'Caída de onda D menor del 50 %', 'Caída de onda D mayor del 50 %', 'Caída transitoria con recuperación']], o: MNIO_ALERTA, p: 'Ante la alerta del monitoreo se realiza {v}' },
      { id: 'eco', l: 'Ecografía', sec: 'B', k: 'yn', y: 'Se realiza ecografía intraoperatoria para delimitar la lesión antes de la apertura dural', n: 'No se realiza ecografía intraoperatoria' },
      { id: 'mielo', l: 'Mielotomía', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Línea media posterior', 'en la línea media posterior'],
        ['Zona de entrada de raíces dorsales', 'en la zona de entrada de las raíces dorsales'],
        ['Sobre el punto de afloramiento', 'sobre el punto de afloramiento de la lesión']
      ], p: 'Se realiza mielotomía {v}' },
      { id: 'mielol', l: 'Longitud de la mielotomía', sec: 'D', k: 'num', u: 'mm', p: 'Mielotomía de {v} mm de longitud' },
      { id: 'hles', l: 'Características de la lesión', sec: 'C', k: 'multi', p: 'Se identifica lesión {v}', o: [
        ['Plano de clivaje', 'con plano de clivaje identificable'],
        ['Sin plano', 'sin plano de clivaje identificable'],
        ['Quiste polar', 'con quiste polar'],
        ['Siringe asociada', 'con siringomielia asociada'],
        ['Hemosiderina', 'con hemosiderina perilesional'],
        ['Vascularizada', 'vascularizada'],
        ['Médula expandida', 'con expansión de la médula']
      ] },
      { id: 'adj', l: 'Adyuvantes', sec: 'D', k: 'multi', p: 'Se utiliza {v}', o: ADJ_MICRO },
      { id: 'ext', l: 'Extensión de la resección', sec: 'D', k: 'opt', req: 1, q: 1, o: EXT_RES },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'en el polo craneal por ausencia de plano' },
      { id: 'pial', l: 'Sutura pial', sec: 'D', k: 'yn', y: 'Se realiza aproximación de la piamadre con puntos', n: 'No se realiza sutura pial' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', req: 1, q: 1, o: CDUR_ESP, p: 'Se realiza {v}' },
      { id: 'valsa', l: 'Prueba de Valsalva', sec: 'G', k: 'yn', y: 'Se realiza maniobra de Valsalva para evaluar la estanqueidad del cierre dural', n: 'No se realiza maniobra de Valsalva' },
      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio intraoperatorio por congelación', n: 'No se realiza estudio por congelación' },
      { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'lamr', l: 'Reposición laminar', sec: 'E', k: 'text', if: ['osea', 'Laminotomía con reposición (laminoplastia)'], p: 'Se reponen las láminas con {v}', ph: 'miniplacas de titanio' },
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión sobre la línea media y disección subperióstica',
      'Se realiza control radioscópico del nivel expuesto',
      'Se realiza {osea}',
      'Se realiza hemostasia epidural meticulosa antes de la apertura dural',
      'Se incorpora microscopio quirúrgico',
      'Se realiza durotomía longitudinal en la línea media y se fijan los bordes con puntos de reparo',
      'Se realiza apertura de la aracnoides y se identifica la línea media posterior entre las venas dorsales',
      'Se realiza mielotomía {mielo} con microbisturí y disección roma',
      'Se colocan puntos de tracción en la piamadre',
      'Se toma muestra de la lesión para estudio histológico',
      'Se realiza disección en el plano entre la lesión y la médula desde los polos',
      'Se realiza resección de la lesión con microdisección y aspirador ultrasónico de baja potencia',
      'Se realiza hemostasia del lecho con irrigación y material hemostático, con bipolar a baja intensidad',
      'Se realiza cierre dural'
    ],
    ej: 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines y cuello en posición neutra. Se realiza monitoreo de potenciales evocados motores musculares, onda D epidural y potenciales evocados somatosensitivos. Se interviene a nivel de C4, C5 y C6. Se realiza laminotomía en bloque para reposición posterior, durotomía longitudinal y apertura de la aracnoides. Se realiza mielotomía en la línea media posterior de 25 mm de longitud. Se identifica lesión con plano de clivaje identificable y con quiste polar. Se realiza resección completa macroscópica de la lesión. Se registra pérdida de potenciales motores musculares con onda D estable. Se realiza cierre dural primario hermético con sutura continua y se reponen las láminas con miniplacas de titanio. Se envía pieza a Anatomía Patológica'
  },

  // Cauda equina
  {
    id: 'nc-ces',
    n: 'Descompresión por síndrome de cauda equina',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['síndrome de cauda equina', 'cola de caballo', 'CES', 'hernia discal masiva', 'retención urinaria', 'descompresión urgente lumbar'],
    v: 2,
    ctx: 'Descompresión urgente de la cola de caballo por hernia discal masiva u otra compresión del canal lumbar. Nivel, causa, técnica, tiempo desde el inicio de los síntomas esfinterianos (si consta) y confirmación del nivel son obligatorios. La clasificación del cuadro se transcribe de la evaluación preoperatoria',
    lat: false,
    ref: [R_CES, R_NASS_HD, R_GREEN, R_BENZEL, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Nivel', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: DISC_L, p: 'Se interviene el nivel {v}' },
      { id: 'tces', l: 'Presentación clínica', sec: 'B', k: 'opt', q: 1, p: 'Presentación clínica {v}', o: [
        ['CES incompleto (CES-I)', 'de síndrome de cauda equina incompleto, sin retención urinaria'],
        ['CES con retención (CES-R)', 'de síndrome de cauda equina con retención urinaria'],
        ['CES sospechado', 'de síndrome de cauda equina sospechado']
      ] },
      { id: 'tini', l: 'Horas desde el inicio de los síntomas esfinterianos', sec: 'B', k: 'num', u: 'h', q: 1, p: 'Se interviene a las {v} h del inicio de los síntomas esfinterianos' },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Laminectomía', 'laminectomía'],
        ['Hemilaminectomía bilateral', 'hemilaminectomía bilateral'],
        ['Laminotomía unilateral ampliada', 'laminotomía unilateral ampliada'],
        ['Microdiscectomía', 'abordaje microquirúrgico interlaminar']
      ], p: 'Se realiza {v}' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_LUMBAR },
      MARCA_F,
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', req: 1, y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], req: 1, p: 'Se monitorean {v}', o: [...MNIO_ESP, ['Reflejo bulbocavernoso', 'reflejo bulbocavernoso'], ['EMG de esfínter anal', 'electromiografía del esfínter anal externo']] },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], req: 1, o: MNIO_RES },
      { id: 'causa', l: 'Hallazgos', sec: 'C', k: 'multi', req: 1, q: 1, p: 'Se constata {v}', o: [
        ['Hernia central masiva', 'hernia discal central masiva'],
        ['Secuestro', 'fragmento discal secuestrado'],
        ['Hematoma epidural', 'hematoma epidural'],
        ['Absceso epidural', 'colección epidural de aspecto purulento'],
        ['Lesión tumoral', 'lesión de aspecto tumoral'],
        ['Estenosis severa', 'estenosis severa del canal'],
        ['Saco dural comprimido', 'compresión severa del saco dural'],
        ['Raíces tensas', 'raíces de la cola de caballo a tensión']
      ] },
      { id: 'desc', l: 'Gestos de descompresión', sec: 'D', k: 'multi', req: 1, p: 'Se realiza {v}', o: [
        ['Discectomía', 'discectomía con extracción del material herniado'],
        ['Discectomía bilateral', 'discectomía por ambos lados del saco'],
        ['Flavectomía', 'flavectomía'],
        ['Foraminotomía', 'foraminotomía'],
        ['Evacuación de hematoma', 'evacuación de hematoma epidural'],
        ['Drenaje de colección', 'drenaje de colección epidural']
      ] },
      { id: 'raiz', l: 'Raíces descomprimidas', sec: 'D', k: 'text', p: 'Se descomprimen el saco dural y las raíces {v}', ph: 'S1 bilaterales' },
      { id: 'sacof', l: 'Estado del saco al finalizar', sec: 'D', k: 'opt', o: [
        ['Saco pulsátil', 'Al finalizar se constata saco dural pulsátil'],
        ['Saco sin pulsatilidad', 'Al finalizar se constata saco dural sin pulsatilidad']
      ] },
      ...DUROT_F,
      DREN_COL,
      CIERRE_P,
      { id: 'sv', l: 'Sonda vesical', sec: 'H', k: 'yn', y: 'Queda con sonda vesical', n: 'No queda con sonda vesical' }
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión sobre la línea media',
      { t: 'Se realiza apertura de la fascia y disección subperióstica bilateral', ifn: ['tec', ['Laminotomía unilateral ampliada', 'Microdiscectomía']] },
      { t: 'Se realiza apertura de la fascia y disección subperióstica unilateral', if: ['tec', ['Laminotomía unilateral ampliada', 'Microdiscectomía']] },
      'Se coloca separador autoestático',
      'Se realiza control radioscópico del nivel expuesto',
      'Se realiza {tec} con fresado y pinzas de Kerrison',
      'Se incorpora microscopio quirúrgico',
      'Se realiza flavectomía amplia antes de manipular el saco dural',
      'Se identifica el borde lateral del saco y la raíz, sin retracción del saco comprimido',
      'Se realiza anulotomía y extracción del material discal por lateral del saco',
      'Se explora el espacio epidural ventral y los forámenes con gancho romo'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Presentación clínica de síndrome de cauda equina con retención urinaria. Se interviene a las 14 h del inicio de los síntomas esfinterianos. Se confirma el nivel mediante radioscopía. Se interviene el nivel L4-L5. Se realiza laminectomía. Se constata hernia discal central masiva con compresión severa del saco dural. Se realiza flavectomía y discectomía por ambos lados del saco. Se descomprimen el saco dural y las raíces L5 bilaterales. Al finalizar se constata saco dural pulsátil. No se produce durotomía incidental. Queda con sonda vesical'
  },

  // Vertebroplastia / cifoplastia
  {
    id: 'nc-vpl',
    n: 'Vertebroplastia',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Columna torácica y lumbar',
    syn: ['vertebroplastia', 'vertebroplastia percutánea', 'cementación vertebral', 'PMMA', 'fractura osteoporótica', 'aumentación vertebral'],
    v: 2,
    ctx: 'Aumentación vertebral percutánea con polimetilmetacrilato bajo control radioscópico, con o sin creación previa de cavidad con balón (cifoplastia). Técnica, niveles, vía, volumen de cemento por nivel y control de fuga son obligatorios',
    lat: false,
    ref: [R_NICE_VP, R_BENZEL, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Vertebroplastia', 'vertebroplastia percutánea'],
        ['Cifoplastia con balón', 'cifoplastia percutánea con balón'],
        ['Aumentación con implante expansible', 'aumentación vertebral percutánea con implante expansible']
      ], p: 'Se realiza {v}' },
      { id: 'niv', l: 'Niveles', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT.filter(o => /^[TL]/.test(o[0])), p: 'Se tratan {v}' },
      { id: 'via', l: 'Vía', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Bipedicular', 'bipedicular'],
        ['Unipedicular', 'unipedicular'],
        ['Extrapedicular', 'extrapedicular']
      ], p: 'Acceso {v}' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_LUMBAR },
      { id: 'img', l: 'Guía por imágenes', sec: 'B', k: 'opt', req: 1, q: 1, o: [
        ['Radioscopía biplanar', 'bajo radioscopía biplanar'],
        ['Radioscopía con un arco en C', 'bajo radioscopía con arco en C alternando proyecciones'],
        ['TC o navegación', 'bajo guía tomográfica o navegación']
      ], p: 'Procedimiento realizado {v}' },
      { id: 'trocar', l: 'Calibre del trocar', sec: 'E', k: 'text', p: 'Se utilizan trocares de {v}', ph: '11 G' },
      { id: 'bx', l: 'Biopsia', sec: 'F', k: 'yn', y: 'Se toma biopsia ósea por el trocar antes de la inyección de cemento', n: 'No se toma biopsia ósea' },
      { id: 'balv', l: 'Inflado del balón por nivel', sec: 'D', k: 'text', if: ['tec', ['Cifoplastia con balón', 'Aumentación con implante expansible']], p: 'Se infla el balón o se expande el implante con {v}', ph: '3 mL de contraste a 200 psi en L1 bilateral' },
      { id: 'cem', l: 'Cemento por nivel', sec: 'E', k: 'text', req: 1, q: 1, p: 'Se inyectan {v}', ph: '4 mL de PMMA en L1 y 3,5 mL en T12' },
      { id: 'fuga', l: 'Fuga de cemento', sec: 'D', k: 'multi', req: 1, q: 1, p: 'En el control radioscópico se observa {v}', o: [
        ['No se observa fuga', 'ausencia de fuga de cemento'],
        ['Discal', 'fuga de cemento al disco adyacente'],
        ['Venosa paravertebral', 'fuga de cemento a venas paravertebrales'],
        ['Epidural', 'fuga de cemento al espacio epidural'],
        ['Foraminal', 'fuga de cemento foraminal'],
        ['Paravertebral en partes blandas', 'fuga de cemento a partes blandas paravertebrales']
      ] },
      { id: 'cierre', l: 'Cierre', sec: 'G', k: 'multi', p: 'Se realiza {v}', o: [
        ['Punto simple', 'cierre de los orificios de entrada con punto simple'],
        ['Adhesivo tisular', 'cierre de los orificios de entrada con adhesivo tisular'],
        ['Apósito', 'colocación de apósito sobre los orificios de entrada']
      ] }
    ],
    pasos: [
      'Se realiza identificación de los niveles por conteo radioscópico',
      'Se alinean los platillos y los pedículos en las proyecciones anteroposterior y lateral',
      'Se realiza infiltración con anestésico local de piel y periostio',
      'Se realizan incisiones puntiformes sobre la proyección de los pedículos',
      'Se introducen los trocares por vía {via} hasta el tercio anterior del cuerpo vertebral bajo control radioscópico',
      { t: 'Se toma biopsia ósea a través del trocar', if: ['bx', 'si'] },
      { t: 'Se introduce el balón y se infla con contraste bajo control de presión y radioscopía', if: ['tec', 'Cifoplastia con balón'] },
      { t: 'Se introduce y se expande el implante bajo control radioscópico', if: ['tec', 'Aumentación con implante expansible'] },
      { t: 'Se retira el balón y se rellena la cavidad con cemento', if: ['tec', 'Cifoplastia con balón'] },
      'Se prepara el cemento y se inyecta en fase pastosa bajo control radioscópico lateral continuo',
      'Se interrumpe la inyección al alcanzar el muro posterior o ante cualquier fuga',
      'Se retiran los trocares luego del fraguado inicial',
      'Se realiza control radioscópico final'
    ],
    ej: 'Paciente en decúbito prono sobre almohadillas longitudinales con abdomen libre. Se realiza vertebroplastia percutánea. Se tratan L1. Acceso bipedicular. Procedimiento realizado bajo radioscopía biplanar. Se introducen los trocares por vía bipedicular hasta el tercio anterior del cuerpo vertebral y se toma biopsia ósea a través del trocar. Se inyectan 4 mL de PMMA en L1. En el control radioscópico se observa ausencia de fuga de cemento. Se realiza cierre de los orificios de entrada con punto simple'
  },
  { id: 'nc-cifo', n: 'Cifoplastia', cat: 'Columna torácica y lumbar', syn: ['cifoplastia', 'cifoplastia con balón', 'kyphoplasty', 'aumentación vertebral con balón', 'fractura osteoporótica'], alias: 'nc-vpl', set: { tec: 'Cifoplastia con balón' } },

  // ===================== Otros procedimientos neuroquirúrgicos =====================

  // Chiari
  {
    id: 'nc-chiari',
    n: 'Descompresión de Chiari',
    sp: 'Neurocirugía',
    sub: 'Unión craneocervical',
    cat: 'Otros procedimientos neuroquirúrgicos',
    syn: ['Chiari', 'malformación de Chiari', 'descompresión de fosa posterior', 'craniectomía suboccipital', 'duroplastia', 'siringomielia', 'PFD', 'PFDD'],
    v: 2,
    ctx: 'Malformación de Chiari tipo I sintomática, con o sin siringomielia, tratada con descompresión de la fosa posterior y del arco de C1, con o sin duroplastia y manejo de amígdalas. Técnica, extensión ósea, manejo dural y aracnoideo y cierre son obligatorios',
    lat: false,
    ref: [R_CHIARI, R_GREEN, R_BENZEL, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Descompresión ósea sin apertura dural', 'descompresión ósea de fosa posterior sin apertura dural'],
        ['Descompresión con delaminación dural', 'descompresión ósea con delaminación de la hoja externa de la duramadre'],
        ['Descompresión con duroplastia', 'descompresión ósea con apertura dural y duroplastia'],
        ['Descompresión con duroplastia y manejo amigdalino', 'descompresión ósea con apertura dural, manejo de amígdalas cerebelosas y duroplastia']
      ], p: 'Se realiza {v}' },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Prono, cabezal en flexión', 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines en flexión y retracción del mentón'],
        ['Prono, herradura', 'Paciente en decúbito prono con cabeza sobre apoyacabezas en herradura en flexión']
      ] },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', req: 1, q: 1, y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], req: 1, p: 'Se monitorean {v}', o: [
        ['PEM', 'potenciales evocados motores'],
        ['PESS', 'potenciales evocados somatosensitivos'],
        ['PEAT', 'potenciales evocados auditivos de tronco']
      ] },
      { id: 'mniob', l: 'Registros basales', sec: 'B', k: 'yn', if: ['mnio', 'si'], y: 'Se obtienen registros basales antes y después del posicionamiento en flexión', n: 'No se obtienen registros basales' },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], req: 1, o: MNIO_RES },
      { id: 'crani', l: 'Dimensiones de la craniectomía', sec: 'D', k: 'text', q: 1, p: 'Craniectomía suboccipital de {v}', ph: '3 × 3 cm' },
      { id: 'c1', l: 'Arco de C1', sec: 'D', k: 'opt', q: 1, o: [
        ['Resección del arco de C1', 'Se realiza resección del arco posterior de C1'],
        ['Resección de C1 y parcial de C2', 'Se realiza resección del arco posterior de C1 y laminectomía parcial de C2'],
        ['Sin resección de C1', 'No se reseca el arco posterior de C1']
      ] },
      { id: 'banda', l: 'Banda fibrosa atlantooccipital', sec: 'D', k: 'yn', y: 'Se reseca la banda fibrosa atlantooccipital', n: 'No se identifica banda fibrosa atlantooccipital' },
      { id: 'eco', l: 'Ecografía intraoperatoria', sec: 'D', k: 'yn', y: 'Se realiza ecografía intraoperatoria para evaluar la posición amigdalina y el flujo de LCR', n: 'No se realiza ecografía intraoperatoria' },
      { id: 'hchi', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Descenso amigdalino', 'descenso de las amígdalas cerebelosas'],
        ['Amígdalas hasta C1', 'amígdalas cerebelosas hasta el nivel de C1'],
        ['Amígdalas hasta C2', 'amígdalas cerebelosas hasta el nivel de C2'],
        ['Aracnoides engrosada', 'aracnoides engrosada'],
        ['Adherencias aracnoideas', 'adherencias aracnoideas'],
        ['Velo sobre el foramen de Magendie', 'membrana aracnoidea que ocluye el foramen de Magendie'],
        ['Salida libre de LCR por el obex', 'salida de LCR por el obex luego de la disección'],
        ['Amígdalas isquémicas', 'amígdalas de aspecto gliótico o isquémico'],
        ['Seno occipital prominente', 'seno occipital o marginal prominente']
      ] },
      { id: 'arac', l: 'Manejo aracnoideo', sec: 'D', k: 'opt', if: ['tec', ['Descompresión con duroplastia', 'Descompresión con duroplastia y manejo amigdalino']], o: [
        ['Aracnoides preservada', 'Se preserva la aracnoides'],
        ['Apertura aracnoidea', 'Se realiza apertura de la aracnoides y liberación de adherencias'],
        ['Apertura del foramen de Magendie', 'Se realiza apertura de la aracnoides y del foramen de Magendie']
      ] },
      { id: 'amig', l: 'Manejo amigdalino', sec: 'D', k: 'opt', if: ['tec', 'Descompresión con duroplastia y manejo amigdalino'], req: 1, o: [
        ['Coagulación subpial', 'Se realiza coagulación subpial de las amígdalas cerebelosas'],
        ['Resección subpial', 'Se realiza resección subpial de las amígdalas cerebelosas'],
        ['Separación de amígdalas', 'Se separan las amígdalas cerebelosas sin resección']
      ] },
      { id: 'pica', l: 'Arterias cerebelosas posteroinferiores', sec: 'D', k: 'yn', y: 'Se identifican y preservan las arterias cerebelosas posteroinferiores', n: 'No se exponen las arterias cerebelosas posteroinferiores' },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', if: ['tec', ['Descompresión con duroplastia', 'Descompresión con duroplastia y manejo amigdalino']], req: 1, o: [
        ['Duroplastia con pericráneo', 'duroplastia con injerto de pericráneo autólogo'],
        ['Duroplastia con fascia autóloga', 'duroplastia con injerto de fascia autóloga'],
        ['Duroplastia con sustituto dural', 'duroplastia con sustituto dural'],
        ['Sutura continua', 'sutura continua de la duroplastia'],
        ['Refuerzo con sellante', 'refuerzo de la línea de sutura con sellante dural']
      ], p: 'Se realiza {v}' },
      { id: 'valsa', l: 'Prueba de Valsalva', sec: 'G', k: 'yn', if: ['tec', ['Descompresión con duroplastia', 'Descompresión con duroplastia y manejo amigdalino']], y: 'Se realiza maniobra de Valsalva para evaluar la estanqueidad del cierre dural', n: 'No se realiza maniobra de Valsalva' },
      ...DUROT_F.map(f => f.id == 'durot' ? { ...f, if: ['tec', ['Descompresión ósea sin apertura dural', 'Descompresión con delaminación dural']] } : f),
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' },
      { id: 'cierre', l: 'Cierre por planos', sec: 'G', k: 'multi', p: 'Se realiza {v}', o: [
        ['Musculatura suboccipital', 'aproximación de la musculatura suboccipital'],
        ['Fascia nucal hermética', 'cierre hermético de la fascia nucal'],
        ['Tejido celular subcutáneo', 'cierre del tejido celular subcutáneo']
      ] }
    ],
    pasos: [
      'Se realiza incisión cutánea sobre la línea media desde la protuberancia occipital externa hasta la apófisis espinosa de C2',
      'Se realiza disección por el rafe avascular de la línea media',
      { t: 'Se toma injerto de pericráneo', if: ['cdur', 'Duroplastia con pericráneo'] },
      'Se realiza disección subperióstica de la escama occipital y del arco posterior de C1, sin exceder 1,5 cm lateral a la línea media en C1',
      'Se realiza craniectomía suboccipital con fresado de alta velocidad y pinzas de Kerrison incluyendo el borde posterior del foramen magno',
      'Se realiza resección del arco posterior de C1',
      'Se reseca la banda fibrosa atlantooccipital',
      { t: 'Se realiza ecografía intraoperatoria antes de la apertura dural', if: ['eco', 'si'] },
      'Se incorpora microscopio quirúrgico',
      { t: 'Se realiza delaminación de la hoja externa de la duramadre', if: ['tec', 'Descompresión con delaminación dural'] },
      { t: 'Se realiza apertura dural en Y con control del seno occipital y marginal con clips o ligadura', if: ['tec', ['Descompresión con duroplastia', 'Descompresión con duroplastia y manejo amigdalino']] },
      { t: 'Se realiza apertura de la aracnoides y disección de adherencias', if: ['arac', ['Apertura aracnoidea', 'Apertura del foramen de Magendie']] },
      { t: 'Se realiza manejo subpial de las amígdalas cerebelosas con bipolar', if: ['tec', 'Descompresión con duroplastia y manejo amigdalino'] },
      { t: 'Se explora el foramen de Magendie y el obex', if: ['arac', 'Apertura del foramen de Magendie'] },
      { t: 'Se realiza duroplastia con sutura continua', if: ['tec', ['Descompresión con duroplastia', 'Descompresión con duroplastia y manejo amigdalino']] }
    ],
    ej: 'Paciente en decúbito prono con cabeza fijada en cabezal de tres pines en flexión y retracción del mentón. Se realiza monitoreo de potenciales evocados motores y somatosensitivos, con registros basales antes y después del posicionamiento en flexión. Se realiza descompresión ósea con apertura dural y duroplastia. Craniectomía suboccipital de 3 × 3 cm. Se realiza resección del arco posterior de C1 y se reseca la banda fibrosa atlantooccipital. Se realiza apertura dural en Y. Se constata amígdalas cerebelosas hasta el nivel de C1 y aracnoides engrosada. Se realiza apertura de la aracnoides y del foramen de Magendie. Se identifican y preservan las arterias cerebelosas posteroinferiores. Se realiza duroplastia con injerto de pericráneo autólogo, sutura continua y refuerzo con sellante dural. No se registran cambios en el monitoreo neurofisiológico. Se realiza cierre hermético de la fascia nucal'
  },

  // Desanclaje medular
  {
    id: 'nc-tether',
    n: 'Desanclaje medular',
    sp: 'Neurocirugía',
    sub: 'Columna',
    cat: 'Otros procedimientos neuroquirúrgicos',
    syn: ['médula anclada', 'tethered cord', 'sección de filum terminale', 'filum engrosado', 'lipoma del cono', 'desanclaje', 'diastematomielia', 'médula anclada retenida'],
    v: 2,
    ctx: 'Síndrome de médula anclada por filum terminale engrosado, lipoma del cono, anclaje cicatrizal posterior a reparación de mielomeningocele o malformación de médula dividida. Nivel, causa, técnica, monitoreo con estimulación antes de seccionar y cierre dural son obligatorios',
    lat: false,
    ref: [R_PANG, R_GREEN, R_BENZEL, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'niv', l: 'Niveles', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT.filter(o => /^[TLS]/.test(o[0])), p: 'Se interviene a nivel de {v}' },
      { id: 'causa', l: 'Causa del anclaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Filum terminale', 'filum terminale engrosado'],
        ['Lipoma del cono', 'lipoma del cono medular'],
        ['Anclaje cicatrizal', 'anclaje cicatrizal posterior a reparación de defecto espinal'],
        ['Médula dividida', 'malformación de médula dividida'],
        ['Seno dérmico', 'seno dérmico']
      ], p: 'Anclaje medular por {v}' },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_LUMBAR },
      MARCA_F,
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', req: 1, q: 1, y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], req: 1, p: 'Se monitorean {v}', o: [
        ['PEM', 'potenciales evocados motores'],
        ['PESS', 'potenciales evocados somatosensitivos'],
        ['EMG libre de miembros inferiores', 'electromiografía libre de miembros inferiores'],
        ['EMG de esfínter anal', 'electromiografía del esfínter anal externo'],
        ['Reflejo bulbocavernoso', 'reflejo bulbocavernoso'],
        ['Estimulación directa', 'estimulación directa de estructuras intradurales']
      ] },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], req: 1, o: MNIO_RES },
      { id: 'osea', l: 'Acceso óseo', sec: 'B', k: 'opt', o: [
        ['Laminectomía', 'laminectomía'],
        ['Laminotomía', 'laminotomía'],
        ['Interlaminar sin resección ósea', 'abordaje interlaminar sin resección ósea']
      ], p: 'Se realiza {v}' },
      { id: 'hteth', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Filum engrosado', 'filum terminale engrosado'],
        ['Filum infiltrado por grasa', 'filum terminale infiltrado por tejido graso'],
        ['Filum tenso', 'filum terminale a tensión'],
        ['Cono bajo', 'cono medular de posición baja'],
        ['Lipoma adherido al cono', 'lipoma adherido al cono medular'],
        ['Adherencias cicatrizales', 'adherencias cicatrizales de la médula a la duramadre'],
        ['Tabique óseo o fibroso', 'tabique óseo o fibroso entre hemimédulas']
      ] },
      { id: 'filst', l: 'Estimulación del filum antes de la sección', sec: 'D', k: 'num', u: 'mA', if: ['causa', 'Filum terminale'], p: 'Se estimula el filum terminale con {v} mA antes de su sección' },
      { id: 'filr', l: 'Respuesta a la estimulación', sec: 'D', k: 'opt', if: ['causa', 'Filum terminale'], o: [
        ['Sin respuesta', 'Sin respuesta motora ni esfinteriana a la estimulación del filum'],
        ['Con respuesta', 'Se registra respuesta a la estimulación del filum']
      ] },
      { id: 'filseg', l: 'Segmento de filum resecado', sec: 'F', k: 'num', u: 'mm', if: ['causa', 'Filum terminale'], p: 'Se reseca un segmento de filum terminale de {v} mm' },
      { id: 'desan', l: 'Gestos de desanclaje', sec: 'D', k: 'multi', req: 1, q: 1, p: 'Se realiza {v}', o: [
        ['Coagulación y sección del filum', 'coagulación y sección del filum terminale'],
        ['Resección parcial del lipoma', 'resección parcial del lipoma'],
        ['Resección casi total del lipoma', 'resección casi total del lipoma'],
        ['Reconstrucción del cono', 'reconstrucción pial del cono medular'],
        ['Liberación de adherencias', 'liberación de adherencias cicatrizales'],
        ['Resección del tabique', 'resección del tabique y reconstrucción en un único saco dural']
      ] },
      { id: 'estp', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', p: 'Se identifican y preservan {v}', o: [
        ['Raíces sacras', 'las raíces sacras'],
        ['Raíces de la cola de caballo', 'las raíces de la cola de caballo'],
        ['Cono medular', 'el cono medular'],
        ['Vasos del filum', 'los vasos del filum para su coagulación']
      ] },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', req: 1, q: 1, o: CDUR_ESP, p: 'Se realiza {v}' },
      { id: 'valsa', l: 'Prueba de Valsalva', sec: 'G', k: 'yn', y: 'Se realiza maniobra de Valsalva para evaluar la estanqueidad del cierre dural', n: 'No se realiza maniobra de Valsalva' },
      DREN_COL,
      CIERRE_P
    ],
    pasos: [
      'Se realiza marcación cutánea del nivel {marca}',
      'Se realiza incisión sobre la línea media',
      { t: 'Se realiza resección de la cicatriz previa y disección hasta la duramadre', if: ['prim', 'Revisión'] },
      'Se realiza disección subperióstica y {osea}',
      'Se incorpora microscopio quirúrgico',
      'Se realiza durotomía longitudinal en la línea media y se fijan los bordes con puntos de reparo',
      'Se realiza apertura de la aracnoides',
      { t: 'Se identifica el filum terminale por su aspecto y su vaso superficial, separándolo de las raíces', if: ['causa', 'Filum terminale'] },
      'Se realiza estimulación directa de las estructuras antes de su sección',
      { t: 'Se coagula el filum y se secciona en dos puntos, resecando el segmento intermedio', if: ['causa', 'Filum terminale'] },
      { t: 'Se diseca la interfase entre el lipoma y el cono medular y se reseca el lipoma con aspirador ultrasónico o láser', if: ['causa', 'Lipoma del cono'] },
      { t: 'Se liberan las adherencias de la médula a la duramadre con microdisección', if: ['causa', 'Anclaje cicatrizal'] },
      { t: 'Se reseca el tabique entre las hemimédulas', if: ['causa', 'Médula dividida'] },
      'Se realiza cierre dural'
    ],
    ej: 'Paciente en decúbito prono sobre marco con abdomen libre. Se realiza monitoreo de potenciales evocados motores, electromiografía del esfínter anal externo y reflejo bulbocavernoso. Anclaje medular por filum terminale engrosado. Se interviene a nivel de L5 y S1. Se realiza laminotomía, durotomía longitudinal y apertura de la aracnoides. Se constata filum terminale infiltrado por tejido graso. Se estimula el filum terminale con 3 mA antes de su sección, sin respuesta motora ni esfinteriana. Se realiza coagulación y sección del filum terminale con resección de un segmento de 8 mm. No se registran cambios en el monitoreo neurofisiológico. Se realiza cierre dural primario hermético con sutura continua y refuerzo con sellante dural'
  },

  // Mielomeningocele
  {
    id: 'nc-mmc',
    n: 'Reparación de mielomeningocele o defecto espinal',
    sp: 'Neurocirugía',
    sub: 'Pediatría',
    cat: 'Otros procedimientos neuroquirúrgicos',
    syn: ['mielomeningocele', 'MMC', 'espina bífida', 'meningocele', 'disrafismo espinal', 'cierre de defecto espinal', 'neurulación de placoda'],
    v: 2,
    ctx: 'Cierre posnatal de mielomeningocele, meningocele u otro defecto espinal abierto. Nivel, tipo de defecto, horas de vida, dimensiones, manejo de la placoda, cierre dural, fascial y cutáneo son obligatorios. La derivación de LCR, si se realiza en el mismo acto, se documenta por separado',
    lat: false,
    ref: [R_MMC, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'tdef', l: 'Tipo de defecto', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Mielomeningocele', 'mielomeningocele'],
        ['Meningocele', 'meningocele'],
        ['Mielosquisis', 'mielosquisis'],
        ['Lipomielomeningocele', 'lipomielomeningocele']
      ], p: 'Se interviene {v}' },
      { id: 'niv', l: 'Nivel del defecto', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, o: VERT.filter(o => /^[TLS]/.test(o[0])), p: 'Defecto a nivel de {v}' },
      { id: 'hvida', l: 'Horas de vida', sec: 'B', k: 'num', u: 'h', q: 1, p: 'Se interviene a las {v} h de vida' },
      { id: 'dim', l: 'Dimensiones del defecto', sec: 'B', k: 'text', req: 1, q: 1, p: 'Defecto de {v}', ph: '4 × 3 cm' },
      { id: 'saco', l: 'Estado del saco', sec: 'C', k: 'opt', o: [
        ['Íntegro', 'Saco íntegro, sin pérdida de LCR'],
        ['Roto', 'Saco roto con pérdida de LCR'],
        ['Epitelizado', 'Defecto epitelizado']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Prono sobre rodetes', 'Paciente en decúbito prono sobre rodetes con abdomen libre y protección térmica']
      ] },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'estim', l: 'Estimulación de la placoda', sec: 'D', k: 'yn', y: 'Se realiza estimulación directa de la placoda y de las raíces', n: 'No se realiza estimulación directa de la placoda' },
      { id: 'hmmc', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Placoda identificable', 'placoda neural identificable'],
        ['Raíces ventrales visibles', 'raíces emergiendo de la cara ventral de la placoda'],
        ['Lipoma asociado', 'componente lipomatoso asociado'],
        ['Médula dividida', 'malformación de médula dividida asociada'],
        ['Filum engrosado', 'filum terminale engrosado'],
        ['Cifosis', 'deformidad cifótica asociada']
      ] },
      { id: 'plac', l: 'Manejo de la placoda', sec: 'D', k: 'multi', req: 1, q: 1, p: 'Se realiza {v}', o: [
        ['Resección de la zona epitelial', 'resección circunferencial de la zona de unión epitelial de la placoda'],
        ['Neurulación', 'neurulación de la placoda con puntos piales'],
        ['Sección del filum', 'sección del filum terminale'],
        ['Liberación de la placoda', 'liberación de la placoda de la duramadre']
      ] },
      { id: 'cdur', l: 'Cierre dural', sec: 'G', k: 'multi', req: 1, q: 1, o: CDUR_ESP, p: 'Se realiza {v}' },
      { id: 'cfas', l: 'Cierre fascial', sec: 'G', k: 'opt', req: 1, o: [
        ['Colgajos fasciales', 'Se realiza cierre con colgajos de fascia toracolumbar rotados hacia la línea media'],
        ['Cierre primario', 'Se realiza cierre fascial primario'],
        ['Sin cierre fascial', 'No se realiza cierre fascial independiente']
      ] },
      { id: 'cpiel', l: 'Cierre cutáneo', sec: 'G', k: 'opt', req: 1, q: 1, o: [
        ['Primario', 'Se realiza cierre cutáneo primario sin tensión'],
        ['Con despegamiento', 'Se realiza cierre cutáneo con despegamiento subcutáneo amplio'],
        ['Con incisiones de descarga', 'Se realiza cierre cutáneo con incisiones de descarga laterales'],
        ['Con colgajos', 'Se realiza cierre cutáneo con colgajos, junto a Cirugía Plástica']
      ] },
      { id: 'cult', l: 'Cultivo', sec: 'F', k: 'yn', y: 'Se toma muestra de LCR para cultivo', n: 'No se toma muestra de LCR para cultivo' }
    ],
    pasos: [
      'Se realiza antisepsia del defecto con solución acuosa',
      'Se realiza incisión circunferencial en la unión entre la zona epitelial y la piel sana',
      'Se identifica la placoda neural y se separa del epitelio que la rodea',
      'Se reseca el remanente epitelial de los bordes de la placoda',
      'Se realiza neurulación de la placoda con puntos piales',
      'Se diseca la duramadre desde su reflexión lateral hasta la línea media',
      'Se realiza cierre dural hermético sobre la placoda',
      'Se tallan colgajos de fascia toracolumbar y se rotan hacia la línea media',
      'Se realiza despegamiento subcutáneo para cierre cutáneo sin tensión'
    ],
    ej: 'Paciente en decúbito prono sobre rodetes con abdomen libre y protección térmica. Se interviene mielomeningocele. Defecto a nivel de L4, L5 y S1. Se interviene a las 20 h de vida. Defecto de 4 × 3 cm. Saco roto con pérdida de LCR. Se realiza resección circunferencial de la zona de unión epitelial de la placoda y neurulación de la placoda con puntos piales. Se constata placoda neural identificable. Se realiza cierre dural primario hermético con sutura continua. Se realiza cierre con colgajos de fascia toracolumbar rotados hacia la línea media. Se realiza cierre cutáneo con despegamiento subcutáneo amplio'
  },

  // Nervio periférico
  {
    id: 'nc-npe',
    n: 'Descompresión de nervio periférico, por ejemplo túnel carpiano',
    sp: 'Neurocirugía',
    sub: 'Nervio periférico',
    cat: 'Otros procedimientos neuroquirúrgicos',
    syn: ['túnel carpiano', 'síndrome del túnel carpiano', 'liberación del túnel carpiano', 'neurolisis', 'atrapamiento nervioso', 'túnel cubital', 'nervio cubital', 'canal de Guyon', 'peroneo', 'túnel tarsiano', 'meralgia parestésica', 'transposición cubital'],
    v: 2,
    ctx: 'Liberación de un nervio periférico atrapado (mediano en el carpo, cubital en el codo o en el canal de Guyon, peroneo común, tibial en el túnel tarsiano, cutáneo femoral lateral), abierta o endoscópica, con o sin transposición. Nervio, lado, técnica, estructuras liberadas y preservadas son obligatorios',
    lat: true,
    ref: [R_CTS, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'nerv', l: 'Nervio y sitio', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Mediano en el túnel carpiano', 'del nervio mediano en el túnel carpiano'],
        ['Cubital en el codo', 'del nervio cubital en el codo'],
        ['Cubital en el canal de Guyon', 'del nervio cubital en el canal de Guyon'],
        ['Peroneo común en la cabeza del peroné', 'del nervio peroneo común en la cabeza del peroné'],
        ['Tibial en el túnel tarsiano', 'del nervio tibial en el túnel tarsiano'],
        ['Cutáneo femoral lateral', 'del nervio cutáneo femoral lateral en la espina ilíaca anterosuperior']
      ], p: 'Se realiza descompresión {v}' },
      { id: 'lat', l: 'Lado', sec: 'A', k: 'opt', vr: 1, req: 1, q: 1, o: LADO },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Abierta', 'liberación abierta'],
        ['Mínimamente invasiva', 'liberación por miniincisión'],
        ['Endoscópica', 'liberación endoscópica'],
        ['Transposición subcutánea', 'liberación y transposición anterior subcutánea'],
        ['Transposición submuscular', 'liberación y transposición anterior submuscular']
      ], p: 'Se realiza {v}' },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Supino, brazo en mesa de mano', 'Paciente en decúbito supino con miembro superior en abducción sobre mesa de mano'],
        ['Supino, miembro inferior', 'Paciente en decúbito supino con miembro inferior en rotación'],
        ['Lateral', 'Paciente en decúbito lateral']
      ] },
      { id: 'isq', l: 'Isquemia', sec: 'B', k: 'opt', o: [
        ['Manguito neumático', 'Se coloca manguito de isquemia neumático'],
        ['Sin isquemia, anestesia local con adrenalina', 'Se realiza el procedimiento sin manguito, con anestesia local con adrenalina'],
        ['Sin isquemia', 'Se realiza el procedimiento sin manguito de isquemia']
      ] },
      { id: 'isqp', l: 'Presión del manguito', sec: 'B', k: 'num', u: 'mmHg', if: ['isq', 'Manguito neumático'], p: 'Presión del manguito de {v} mmHg' },
      { id: 'isqt', l: 'Tiempo de isquemia', sec: 'G', k: 'num', u: 'min', if: ['isq', 'Manguito neumático'], p: 'Tiempo total de isquemia de {v} min' },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'text', p: 'Se realiza incisión {v}', ph: 'longitudinal palmar de 3 cm en línea con el cuarto dedo, distal al pliegue de flexión de la muñeca' },
      { id: 'hnpe', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Nervio aplanado', 'nervio aplanado en el sitio de compresión'],
        ['Constricción en reloj de arena', 'constricción en reloj de arena'],
        ['Hiperemia epineural', 'hiperemia epineural'],
        ['Pseudoneuroma proximal', 'engrosamiento proximal a la compresión'],
        ['Tenosinovitis', 'tenosinovitis de los flexores'],
        ['Ligamento engrosado', 'ligamento o retináculo engrosado'],
        ['Lesión ocupante', 'lesión ocupante de espacio'],
        ['Subluxación del nervio', 'subluxación del nervio con la flexión']
      ] },
      { id: 'lib', l: 'Estructuras liberadas', sec: 'D', k: 'multi', req: 1, q: 1, p: 'Se secciona {v}', o: [
        ['Ligamento transverso del carpo', 'el ligamento transverso del carpo en toda su extensión'],
        ['Fascia antebraquial distal', 'la fascia antebraquial distal'],
        ['Retináculo cubital (Osborne)', 'el retináculo del túnel cubital y la arcada de Osborne'],
        ['Fascia del flexor cubital del carpo', 'la fascia entre las cabezas del flexor cubital del carpo'],
        ['Arcada de Struthers', 'la arcada de Struthers'],
        ['Septo intermuscular medial', 'el septo intermuscular medial'],
        ['Techo del canal de Guyon', 'el techo del canal de Guyon'],
        ['Fascia del peroneo largo', 'la fascia del músculo peroneo largo'],
        ['Retináculo flexor del tobillo', 'el retináculo flexor del tobillo'],
        ['Ligamento inguinal (fascículo)', 'la fascia y el ligamento inguinal sobre el nervio']
      ] },
      { id: 'estp', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', q: 1, p: 'Se identifican y preservan {v}', o: [
        ['Rama motora tenar', 'la rama motora tenar del nervio mediano'],
        ['Rama cutánea palmar', 'la rama cutánea palmar del nervio mediano'],
        ['Arco palmar superficial', 'el arco palmar superficial'],
        ['Nervio cutáneo antebraquial medial', 'las ramas del nervio cutáneo antebraquial medial'],
        ['Ramas articulares y motoras del cubital', 'las ramas motoras del nervio cubital'],
        ['Rama profunda del cubital', 'la rama profunda motora del nervio cubital'],
        ['Arteria cubital', 'la arteria cubital'],
        ['Ramas del peroneo', 'las ramas profunda y superficial del nervio peroneo'],
        ['Arteria tibial posterior', 'el paquete tibial posterior']
      ] },
      { id: 'neuint', l: 'Neurolisis interna', sec: 'D', k: 'yn', y: 'Se realiza neurolisis interna', n: 'No se realiza neurolisis interna' },
      { id: 'transp', l: 'Estabilidad tras la transposición', sec: 'D', k: 'text', if: ['tec', ['Transposición subcutánea', 'Transposición submuscular']], p: 'Se fija el nervio transpuesto con {v}', ph: 'un colgajo fasciodérmico del epicóndilo medial' },
      { id: 'tenos', l: 'Tenosinovectomía', sec: 'D', k: 'yn', if: ['nerv', 'Mediano en el túnel carpiano'], y: 'Se realiza tenosinovectomía de los flexores', n: 'No se realiza tenosinovectomía' },
      { id: 'cierre', l: 'Cierre', sec: 'G', k: 'multi', p: 'Se realiza {v}', o: [
        ['Tejido celular subcutáneo', 'cierre del tejido celular subcutáneo'],
        ['Piel con puntos separados', 'cierre de piel con puntos separados de nailon'],
        ['Vendaje compresivo', 'vendaje compresivo blando'],
        ['Férula', 'colocación de férula']
      ] }
    ],
    pasos: [
      { t: 'Se realiza infiltración con anestésico local', if: ['isq', ['Sin isquemia, anestesia local con adrenalina', 'Sin isquemia']] },
      'Se realiza incisión cutánea y disección del tejido celular subcutáneo',
      { t: 'Se secciona la fascia palmar superficial y se expone el ligamento transverso del carpo', if: ['nerv', 'Mediano en el túnel carpiano'] },
      { t: 'Se secciona el ligamento transverso del carpo por su borde cubital, de distal a proximal, bajo visión directa del nervio', if: ['nerv', 'Mediano en el túnel carpiano'] },
      { t: 'Se introduce el endoscopio en el túnel carpiano y se secciona el ligamento bajo visión endoscópica', if: ['tec', 'Endoscópica'] },
      { t: 'Se identifica el nervio cubital proximal al epicóndilo medial y se sigue en sentido distal', if: ['nerv', 'Cubital en el codo'] },
      { t: 'Se moviliza el nervio con su irrigación y se transpone por delante del epicóndilo medial', if: ['tec', ['Transposición subcutánea', 'Transposición submuscular']] },
      { t: 'Se evalúa la estabilidad del nervio en flexión y extensión del codo', if: ['nerv', 'Cubital en el codo'] },
      { t: 'Se identifica el nervio peroneo común por detrás del bíceps femoral y se sigue alrededor del cuello del peroné', if: ['nerv', 'Peroneo común en la cabeza del peroné'] },
      { t: 'Se secciona el retináculo flexor y se siguen las ramas plantares medial y lateral', if: ['nerv', 'Tibial en el túnel tarsiano'] },
      'Se explora el nervio en todo el trayecto liberado',
      { t: 'Se libera el manguito de isquemia y se realiza hemostasia', if: ['isq', 'Manguito neumático'] }
    ],
    ej: 'Paciente en decúbito supino con miembro superior en abducción sobre mesa de mano. Se realiza descompresión del nervio mediano en el túnel carpiano derecho. Se realiza liberación abierta. Se realiza el procedimiento sin manguito, con anestesia local con adrenalina. Se realiza incisión longitudinal palmar de 3 cm en línea con el cuarto dedo. Se secciona el ligamento transverso del carpo en toda su extensión y la fascia antebraquial distal. Se constata nervio aplanado en el sitio de compresión e hiperemia epineural. Se identifican y preservan la rama motora tenar del nervio mediano y el arco palmar superficial. No se realiza neurolisis interna. Se realiza cierre de piel con puntos separados de nailon y vendaje compresivo blando'
  },

  // Endonasal endoscópica
  {
    id: 'nc-eea',
    n: 'Cirugía endoscópica endonasal para lesiones seleccionadas de base de cráneo o hipófisis',
    sp: 'Neurocirugía',
    sub: 'Base de cráneo',
    cat: 'Otros procedimientos neuroquirúrgicos',
    syn: ['endoscópica endonasal', 'transesfenoidal', 'adenoma de hipófisis', 'tumor hipofisario', 'abordaje endonasal expandido', 'EEA', 'colgajo nasoseptal', 'Hadad', 'craneofaringioma', 'cordoma de clivus', 'fístula de LCR'],
    v: 2,
    ctx: 'Abordaje endoscópico endonasal transesfenoidal o expandido (transtuberculum, transplanum, transcribiforme, transclival, transodontoideo) para lesiones selares y de base de cráneo. Corredor, colgajo, apertura, extensión de resección, grado de fístula intraoperatoria y reconstrucción por capas son obligatorios. La histología no se infiere',
    lat: false,
    ref: [R_KASSAM, R_HADAD, R_ESPOSITO, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'corr', l: 'Corredor', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Transesfenoidal selar', 'transesfenoidal selar'],
        ['Transtuberculum / transplanum', 'transtuberculum y transplanum'],
        ['Transcribiforme', 'transcribiforme'],
        ['Transclival', 'transclival'],
        ['Transodontoideo', 'transodontoideo'],
        ['Transpterigoideo', 'transpterigoideo']
      ], p: 'Se realiza abordaje endoscópico endonasal {v}' },
      { id: 'tecn', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Binarial a cuatro manos', 'Se trabaja por vía binarial con técnica a cuatro manos'],
        ['Mononarial', 'Se trabaja por vía mononarial']
      ] },
      { id: 'equipo', l: 'Equipo de ORL', sec: 'B', k: 'text', p: 'El tiempo nasal es realizado junto con {v}', ph: 'el equipo de Otorrinolaringología' },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Supino, cabezal, leve rotación', 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines, leve rotación hacia el cirujano y leve extensión'],
        ['Supino, herradura', 'Paciente en decúbito supino con cabeza sobre apoyacabezas en herradura']
      ] },
      { id: 'nav', l: 'Navegación', sec: 'B', k: 'yn', y: 'Se utiliza neuronavegación', n: 'No se utiliza neuronavegación' },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], p: 'Se monitorean {v}', o: [
        ['PESS', 'potenciales evocados somatosensitivos'],
        ['PEM', 'potenciales evocados motores'],
        ['Potenciales visuales', 'potenciales evocados visuales'],
        ['EMG de pares craneales', 'electromiografía de pares craneales']
      ] },
      { id: 'colg', l: 'Colgajo', sec: 'B', k: 'opt', q: 1, o: [
        ['Nasoseptal pediculado', 'Se talla colgajo nasoseptal pediculado en la arteria septal posterior'],
        ['Colgajo de rescate', 'Se realiza incisión de rescate del pedículo del colgajo nasoseptal'],
        ['Sin colgajo', 'No se talla colgajo nasoseptal']
      ] },
      { id: 'turb', l: 'Manejo de cornetes', sec: 'B', k: 'multi', p: 'Se realiza {v}', o: [
        ['Lateralización de cornetes medios', 'lateralización de los cornetes medios'],
        ['Turbinectomía media', 'resección del cornete medio'],
        ['Septectomía posterior', 'septectomía posterior'],
        ['Etmoidectomía posterior', 'etmoidectomía posterior']
      ] },
      { id: 'hselar', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Seno esfenoidal selar', 'seno esfenoidal de neumatización selar'],
        ['Seno presellar', 'seno esfenoidal de neumatización preselar'],
        ['Tabiques hacia la carótida', 'tabiques intersinusales insertados sobre el canal carotídeo'],
        ['Piso selar adelgazado', 'piso selar adelgazado'],
        ['Lesión blanda', 'lesión de consistencia blanda'],
        ['Lesión firme', 'lesión de consistencia firme'],
        ['Invasión del seno cavernoso', 'extensión hacia el seno cavernoso'],
        ['Hipófisis normal identificada', 'glándula hipofisaria normal identificable'],
        ['Descenso del diafragma selar', 'descenso del diafragma selar']
      ] },
      { id: 'dopp', l: 'Doppler de carótidas', sec: 'D', k: 'yn', y: 'Se localizan ambas arterias carótidas internas con doppler antes de la apertura dural', n: 'No se utiliza doppler' },
      { id: 'adj', l: 'Adyuvantes', sec: 'D', k: 'multi', p: 'Se utiliza {v}', o: [
        ['Endoscopio de 0°', 'endoscopio de 0°'],
        ['Endoscopio angulado', 'endoscopio angulado de 30° o 45°'],
        ['Aspirador ultrasónico', 'aspirador ultrasónico'],
        ['Fluoresceína', 'fluorescencia con fluoresceína sódica']
      ] },
      { id: 'ext', l: 'Extensión de la resección', sec: 'D', k: 'opt', req: 1, q: 1, o: EXT_RES },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'en el seno cavernoso derecho' },
      { id: 'fist', l: 'Fístula de LCR intraoperatoria', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Grado 0', 'No se observa fístula de LCR intraoperatoria con maniobra de Valsalva'],
        ['Grado 1', 'Se observa fístula de LCR intraoperatoria pequeña, sin defecto diafragmático evidente (grado 1)'],
        ['Grado 2', 'Se observa fístula de LCR intraoperatoria moderada con defecto diafragmático (grado 2)'],
        ['Grado 3', 'Se observa fístula de LCR intraoperatoria con defecto amplio de base de cráneo (grado 3)']
      ] },
      { id: 'recon', l: 'Reconstrucción', sec: 'G', k: 'multi', req: 1, q: 1, p: 'Se realiza reconstrucción con {v}', o: [
        ['Injerto de grasa abdominal', 'injerto de grasa abdominal autóloga'],
        ['Fascia lata', 'injerto de fascia lata autóloga'],
        ['Sustituto dural intradural', 'sustituto dural en posición intradural'],
        ['Sustituto dural extradural', 'sustituto dural en posición extradural'],
        ['Injerto rígido', 'injerto rígido de hueso o cartílago'],
        ['Colgajo nasoseptal', 'colgajo nasoseptal sobre el defecto'],
        ['Sellante', 'sellante dural'],
        ['Taponaje con balón', 'balón de sonda inflado en el seno esfenoidal'],
        ['Taponaje nasal', 'taponaje nasal']
      ] },
      { id: 'dlum', l: 'Drenaje lumbar', sec: 'G', k: 'yn', y: 'Se coloca drenaje lumbar externo de LCR', n: 'No se coloca drenaje lumbar externo de LCR' },
      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio intraoperatorio por congelación', n: 'No se realiza estudio por congelación' },
      { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'lesvasc', l: 'Lesión vascular', sec: 'D', k: 'yn', req: 1, y: 'Se produce lesión vascular', n: 'No se produce lesión vascular' },
      { id: 'lesvd', l: 'Descripción y manejo de la lesión vascular', sec: 'D', k: 'text', if: ['lesvasc', 'si'], req: 1, p: 'Lesión vascular {v}', ph: 'de la arteria carótida interna izquierda, controlada con parche muscular y compresión, con angiografía posterior' }
    ],
    pasos: [
      'Se realiza descongestión de la mucosa nasal con algodones embebidos en vasoconstrictor',
      'Se introduce el endoscopio y se identifican los cornetes, el septum y el receso esfenoetmoidal',
      { t: 'Se talla el colgajo nasoseptal y se aloja en la rinofaringe', if: ['colg', 'Nasoseptal pediculado'] },
      'Se realiza esfenoidotomía amplia y resección de los tabiques intersinusales',
      'Se identifican los reparos del seno esfenoidal con neuronavegación',
      { t: 'Se realiza resección del piso selar con fresado y pinzas de Kerrison', if: ['corr', 'Transesfenoidal selar'] },
      { t: 'Se realiza fresado del tubérculo selar y del planum esfenoidal', if: ['corr', 'Transtuberculum / transplanum'] },
      { t: 'Se realiza fresado del clivus entre ambas arterias carótidas paraclivales', if: ['corr', 'Transclival'] },
      { t: 'Se realiza resección de la lámina cribosa y de la crista galli', if: ['corr', 'Transcribiforme'] },
      'Se localizan las arterias carótidas internas con doppler',
      'Se realiza apertura dural',
      'Se realiza resección de la lesión con curetas y aspiración, en sentido inferior, lateral y luego superior',
      'Se explora la cavidad con endoscopio angulado',
      'Se realiza maniobra de Valsalva para evaluar fístula de LCR',
      'Se realiza reconstrucción por capas del defecto',
      { t: 'Se rota el colgajo nasoseptal sobre el defecto', if: ['colg', ['Nasoseptal pediculado', 'Colgajo de rescate']] }
    ],
    ej: 'Paciente en decúbito supino con cabeza fijada en cabezal de tres pines, leve rotación hacia el cirujano y leve extensión. Se utiliza neuronavegación. Se realiza abordaje endoscópico endonasal transesfenoidal selar y se trabaja por vía binarial con técnica a cuatro manos. Se realiza lateralización de los cornetes medios y septectomía posterior, con colgajo de rescate. Se constata seno esfenoidal de neumatización selar, lesión de consistencia blanda y glándula hipofisaria normal identificable. Se localizan ambas arterias carótidas internas con doppler antes de la apertura dural. Se realiza resección completa macroscópica de la lesión. No se observa fístula de LCR intraoperatoria con maniobra de Valsalva. Se realiza reconstrucción con sustituto dural en posición extradural y sellante dural. No se produce lesión vascular. Se envía pieza a Anatomía Patológica'
  },

  // Base de cráneo abierta
  {
    id: 'nc-bcr',
    n: 'Abordaje y resección de lesión de base de cráneo',
    sp: 'Neurocirugía',
    sub: 'Base de cráneo',
    cat: 'Otros procedimientos neuroquirúrgicos',
    syn: ['base de cráneo', 'orbitocigomático', 'retrosigmoideo', 'Kawase', 'transpetroso', 'far lateral', 'presigmoideo', 'meningioma de base', 'schwannoma vestibular', 'ángulo pontocerebeloso', 'clinoidectomía'],
    v: 2,
    ctx: 'Abordaje microquirúrgico transcraneal a lesiones de las fosas anterior, media o posterior de la base de cráneo. Abordaje, lado, osteotomías, relación con nervios craneales y vasos, extensión de la resección y reconstrucción de la base son obligatorios. La histología no se infiere',
    lat: true,
    ref: [R_RHOTON, R_GREEN, R_RCS].join('; '),
    rev: REV,
    f: [
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, p: 'Se realiza abordaje {v}', o: [
        ['Pterional ampliado', 'pterional ampliado'],
        ['Orbitocigomático', 'orbitocigomático'],
        ['Subfrontal', 'subfrontal'],
        ['Subtemporal', 'subtemporal'],
        ['Transpetroso anterior (Kawase)', 'transpetroso anterior de Kawase'],
        ['Presigmoideo', 'presigmoideo'],
        ['Retrosigmoideo', 'retrosigmoideo'],
        ['Far lateral', 'lateral extremo'],
        ['Translaberíntico', 'translaberíntico']
      ] },
      { id: 'lat', l: 'Lado', sec: 'A', k: 'opt', vr: 1, req: 1, q: 1, o: LADO },
      PRIM_F,
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CRANEO },
      { id: 'nav', l: 'Neuronavegación', sec: 'B', k: 'yn', y: 'Se utiliza neuronavegación', n: 'No se utiliza neuronavegación' },
      { id: 'mnio', l: 'Monitoreo neurofisiológico', sec: 'B', k: 'yn', req: 1, q: 1, y: 'Se realiza monitoreo neurofisiológico intraoperatorio', n: 'No se realiza monitoreo neurofisiológico intraoperatorio' },
      { id: 'mniom', l: 'Modalidades de monitoreo', sec: 'B', k: 'multi', if: ['mnio', 'si'], req: 1, p: 'Se monitorean {v}', o: [
        ['PEM', 'potenciales evocados motores'],
        ['PESS', 'potenciales evocados somatosensitivos'],
        ['PEAT', 'potenciales evocados auditivos de tronco'],
        ['EMG facial', 'electromiografía del nervio facial'],
        ['EMG de pares bajos', 'electromiografía de pares craneales bajos'],
        ['EMG oculomotora', 'electromiografía de nervios oculomotores'],
        ['Potenciales visuales', 'potenciales evocados visuales']
      ] },
      { id: 'mnior', l: 'Resultado del monitoreo', sec: 'D', k: 'opt', if: ['mnio', 'si'], req: 1, o: MNIO_RES },
      { id: 'osteo', l: 'Osteotomías y fresados', sec: 'B', k: 'multi', p: 'Se realiza {v}', o: [
        ['Osteotomía orbitaria', 'osteotomía del techo y pared lateral de la órbita'],
        ['Osteotomía cigomática', 'osteotomía del arco cigomático'],
        ['Clinoidectomía anterior extradural', 'clinoidectomía anterior extradural'],
        ['Destechamiento del canal óptico', 'destechamiento del canal óptico'],
        ['Petrosectomía anterior', 'petrosectomía anterior'],
        ['Mastoidectomía', 'mastoidectomía'],
        ['Resección del cóndilo occipital', 'resección parcial del cóndilo occipital'],
        ['Fresado de la pared posterior del CAI', 'fresado de la pared posterior del conducto auditivo interno']
      ] },
      { id: 'drlcr', l: 'Drenaje de LCR', sec: 'B', k: 'opt', o: [
        ['Drenaje lumbar', 'Se coloca drenaje lumbar externo de LCR'],
        ['Apertura de cisternas', 'Se realiza apertura de cisternas para drenaje de LCR'],
        ['Ninguno', 'No se realiza drenaje de LCR']
      ] },
      { id: 'hles', l: 'Características de la lesión', sec: 'C', k: 'multi', p: 'Lesión {v}', o: [
        ['Extraaxial con base dural', 'extraaxial con implantación dural'],
        ['Blanda', 'de consistencia blanda'],
        ['Firme', 'de consistencia firme'],
        ['Vascularizada', 'ricamente vascularizada'],
        ['Con plano aracnoideo', 'con plano aracnoideo respecto del tronco y los nervios'],
        ['Sin plano', 'sin plano de clivaje identificable'],
        ['Engloba vasos', 'que engloba estructuras vasculares'],
        ['Hiperostosis', 'con hiperostosis del hueso adyacente'],
        ['Invade seno cavernoso', 'con extensión al seno cavernoso']
      ] },
      { id: 'estp', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', q: 1, p: 'Se identifican y preservan {v}', o: [
        ['Nervio óptico y quiasma', 'el nervio óptico y el quiasma'],
        ['Arteria carótida interna', 'la arteria carótida interna'],
        ['Nervio oculomotor', 'el nervio oculomotor'],
        ['Nervio trigémino', 'el nervio trigémino'],
        ['Nervio facial', 'el nervio facial'],
        ['Nervio vestibulococlear', 'el nervio vestibulococlear'],
        ['Pares craneales bajos', 'los pares craneales bajos'],
        ['Arteria basilar y ramas', 'la arteria basilar y sus ramas'],
        ['Arteria vertebral y PICA', 'la arteria vertebral y la arteria cerebelosa posteroinferior'],
        ['Seno sigmoideo y transverso', 'los senos transverso y sigmoideo'],
        ['Vena de Labbé', 'la vena de Labbé'],
        ['Vena petrosa superior', 'la vena petrosa superior'],
        ['Tronco encefálico', 'la superficie del tronco encefálico']
      ] },
      { id: 'facst', l: 'Estimulación del nervio facial al finalizar', sec: 'D', k: 'text', if: ['mniom', 'EMG facial'], p: 'El nervio facial responde a la estimulación proximal con {v}', ph: '0,05 mA' },
      { id: 'adj', l: 'Adyuvantes', sec: 'D', k: 'multi', p: 'Se utiliza {v}', o: [...ADJ_MICRO.filter(o => o[0] != 'Ácido 5-aminolevulínico'), ['Doppler micro', 'doppler microvascular'], ['Videoangiografía con verde de indocianina', 'videoangiografía con verde de indocianina']] },
      { id: 'ext', l: 'Extensión de la resección', sec: 'D', k: 'opt', req: 1, q: 1, o: EXT_RES },
      { id: 'simp', l: 'Grado de Simpson', sec: 'D', k: 'opt', o: [
        ['I', 'Resección grado I de Simpson'],
        ['II', 'Resección grado II de Simpson'],
        ['III', 'Resección grado III de Simpson'],
        ['IV', 'Resección grado IV de Simpson'],
        ['V', 'Descompresión grado V de Simpson']
      ] },
      { id: 'rem', l: 'Remanente', sec: 'D', k: 'text', p: 'Se deja remanente {v}', ph: 'adherido al seno cavernoso' },
      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: 'Se envía muestra para estudio intraoperatorio por congelación', n: 'No se realiza estudio por congelación' },
      { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'cdur', l: 'Cierre dural y reconstrucción', sec: 'G', k: 'multi', req: 1, q: 1, o: CDUR_CRANEO, p: 'Se realiza {v}' },
      { id: 'cmast', l: 'Celdas mastoideas o senos abiertos', sec: 'G', k: 'multi', p: 'Se realiza {v}', o: [
        ['Cera ósea en celdas', 'sellado de celdas mastoideas con cera ósea'],
        ['Obliteración con grasa', 'obliteración con injerto de grasa autóloga'],
        ['Colgajo de pericráneo', 'colgajo pediculado de pericráneo sobre el defecto de base'],
        ['Exclusión del seno frontal', 'exclusión del seno frontal']
      ] },
      { id: 'colg', l: 'Colgajo óseo', sec: 'G', k: 'opt', o: COLG },
      { id: 'fij', l: 'Fijación del colgajo', sec: 'E', k: 'multi', o: FIJ_COLG, p: 'Se fija el colgajo óseo con {v}' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_CRANEO, p: 'Se deja drenaje {v}' }
    ],
    pasos: [
      'Se realiza marcación de la incisión y de la craneotomía con neuronavegación',
      'Se realiza incisión cutánea y disección por planos con preservación de la rama frontal del nervio facial',
      { t: 'Se realiza disección interfascial del músculo temporal', if: ['abord', ['Pterional ampliado', 'Orbitocigomático']] },
      { t: 'Se realiza craneotomía frontotemporal y osteotomía orbitocigomática en una o dos piezas', if: ['abord', 'Orbitocigomático'] },
      { t: 'Se realizan orificios de trépano en el asterion y craneotomía expuesta hasta el borde de los senos transverso y sigmoideo', if: ['abord', 'Retrosigmoideo'] },
      { t: 'Se realiza craniectomía suboccipital lateral, resección del arco de C1 y fresado del cóndilo occipital', if: ['abord', 'Far lateral'] },
      { t: 'Se realiza craneotomía temporal y elevación extradural de la dura de la fosa media hasta el borde petroso', if: ['abord', ['Subtemporal', 'Transpetroso anterior (Kawase)']] },
      'Se realizan las osteotomías y fresados de la base',
      'Se realiza apertura dural',
      'Se incorpora microscopio quirúrgico',
      'Se realiza apertura de cisternas y drenaje de LCR',
      'Se realiza devascularización de la implantación de la lesión',
      'Se realiza vaciamiento intracapsular de la lesión',
      'Se realiza disección extracapsular en el plano aracnoideo respecto de nervios y vasos',
      'Se realiza estimulación de los nervios craneales en riesgo',
      'Se realiza revisión del lecho quirúrgico',
      'Se sellan las celdas aéreas abiertas y se reconstruye la base'
    ],
    ej: 'Paciente en decúbito lateral tipo park-bench con cabeza fijada en cabezal de tres pines. Se utiliza neuronavegación y monitoreo de potenciales evocados auditivos de tronco y electromiografía del nervio facial. Se realiza abordaje retrosigmoideo izquierdo con craneotomía expuesta hasta el borde de los senos transverso y sigmoideo. Se realiza apertura dural y de la cisterna magna. Lesión extraaxial de consistencia firme, con plano aracnoideo respecto del tronco y los nervios. Se realiza vaciamiento intracapsular y disección extracapsular. Se identifican y preservan el nervio facial y los pares craneales bajos. El nervio facial responde a la estimulación proximal con 0,05 mA. Se realiza resección casi total de la lesión, con remanente adherido al nervio facial en el poro acústico. Se realiza duroplastia con sustituto dural y sellado de celdas mastoideas con cera ósea. Se repone el colgajo óseo'
  }
];
