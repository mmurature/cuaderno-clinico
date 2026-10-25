// Partes quirúrgicos · Cirugía general — Cirugía endocrina y mamaria; Accesos y procedimientos frecuentes.
// Datos puros (ver docs/ESQUEMA_PLANTILLAS.md, sección 2 y 2.4).
// Convenciones:
// - En `if` sobre un campo opt, el valor es la etiqueta de la opción (o[0]). En yn, 'si' / 'no'. En multi, basta con que esté marcada.
// - Los campos citados en un paso con {id} tienen frases-fragmento pensadas para leerse dentro del paso.
// - La lateralidad usa el campo común `lat` (`lat: true`); en los procedimientos de línea media o bilaterales sin lado se marca «no aplica».

// ---------- Opciones compartidas ----------


const POS_CUELLO = [
  ['Supino con hiperextensión cervical', 'Paciente en decúbito dorsal con rodete interescapular e hiperextensión cervical'],
  ['Supino con hiperextensión y anti-Trendelenburg', 'Paciente en decúbito dorsal con rodete interescapular, hiperextensión cervical y anti-Trendelenburg']
];

// Nervio laríngeo recurrente: identificación documentada, con negativos explícitos
const NLR = [
  ['NLR derecho identificado y preservado', 'Se identifica y preserva el nervio laríngeo recurrente derecho'],
  ['NLR izquierdo identificado y preservado', 'Se identifica y preserva el nervio laríngeo recurrente izquierdo'],
  ['NLR derecho no identificado', 'No se identifica el nervio laríngeo recurrente derecho'],
  ['NLR izquierdo no identificado', 'No se identifica el nervio laríngeo recurrente izquierdo'],
  ['Laríngeo no recurrente derecho', 'Se identifica y preserva nervio laríngeo no recurrente derecho'],
  ['Bifurcación extralaríngea', 'Se identifica bifurcación extralaríngea del nervio laríngeo recurrente {d}'],
  ['NLR resecado por infiltración', 'Se reseca un segmento del nervio laríngeo recurrente {d} por infiltración'],
  ['Lesión del NLR', 'Se constata lesión del nervio laríngeo recurrente {d}']
];

const NM_TIPO = [
  ['Intermitente', 'Neuromonitorización intermitente'],
  ['Continua', 'Neuromonitorización continua con electrodo vagal']
];

const NM_RES = [
  ['Señal final conservada bilateral', 'Señal de neuromonitorización conservada al finalizar la disección en ambos lados'],
  ['Señal final conservada', 'Señal de neuromonitorización conservada al finalizar la disección {d}'],
  ['Pérdida de señal', 'Pérdida de señal de neuromonitorización {d}'],
  ['Disminución de amplitud', 'Disminución de la amplitud de la señal de neuromonitorización {d}']
];

const GLAND = [
  ['Superior derecha', 'la glándula paratiroides superior derecha'],
  ['Inferior derecha', 'la glándula paratiroides inferior derecha'],
  ['Superior izquierda', 'la glándula paratiroides superior izquierda'],
  ['Inferior izquierda', 'la glándula paratiroides inferior izquierda'],
  ['Ectópica', 'una glándula paratiroides ectópica {d}'],
  ['Supernumeraria', 'una glándula paratiroides supernumeraria {d}']
];

const CONG_Y = 'Se envía material para estudio intraoperatorio por congelación';
const CONG_N = 'No se realiza estudio intraoperatorio por congelación';

const MARC_MAMA = [
  ['Palpable', 'Lesión palpable, sin marcación prequirúrgica'],
  ['Arpón', 'Lesión no palpable con marcación prequirúrgica con arpón'],
  ['Marcador localizador', 'Lesión no palpable con marcador localizador prequirúrgico'],
  ['Radioguiada (ROLL)', 'Lesión no palpable con marcación radioguiada (ROLL)'],
  ['Clip de marcación con ecografía intraoperatoria', 'Lesión marcada con clip, localizada por ecografía intraoperatoria']
];

const INC_MAMA = [
  ['Periareolar', 'Se realiza incisión periareolar'],
  ['Radiada', 'Se realiza incisión radiada sobre la lesión'],
  ['Arciforme', 'Se realiza incisión arciforme sobre la lesión'],
  ['Surco submamario', 'Se realiza incisión en el surco submamario'],
  ['Axilar', 'Se realiza incisión axilar'],
  ['Otra', 'Se realiza incisión {d}']
];

const LOC_MAMA = [
  ['CSE', 'el cuadrante superoexterno'],
  ['CSI', 'el cuadrante superointerno'],
  ['CIE', 'el cuadrante inferoexterno'],
  ['CII', 'el cuadrante inferointerno'],
  ['Unión de cuadrantes superiores', 'la unión de cuadrantes superiores'],
  ['Unión de cuadrantes externos', 'la unión de cuadrantes externos'],
  ['Unión de cuadrantes inferiores', 'la unión de cuadrantes inferiores'],
  ['Unión de cuadrantes internos', 'la unión de cuadrantes internos'],
  ['Retroareolar', 'la región retroareolar'],
  ['Prolongación axilar', 'la prolongación axilar']
];

const TRAZ = [
  ['Radiocoloide con tecnecio-99m', 'radiocoloide marcado con tecnecio-99m'],
  ['Colorante azul', 'colorante azul'],
  ['Verde de indocianina', 'verde de indocianina con detección por fluorescencia'],
  ['Trazador magnético', 'trazador magnético de óxido de hierro superparamagnético']
];

const GC_INT = [
  ['No se envía', 'No se envía el ganglio centinela a estudio intraoperatorio'],
  ['Congelación', 'Se envía el ganglio centinela a estudio intraoperatorio por congelación'],
  ['Impronta citológica', 'Se envía el ganglio centinela para impronta citológica intraoperatoria'],
  ['Análisis molecular intraoperatorio', 'Se envía el ganglio centinela para análisis molecular intraoperatorio']
];

const AX_NERV = [
  ['Vena axilar', 'Se identifica y preserva la vena axilar'],
  ['Nervio torácico largo', 'Se identifica y preserva el nervio torácico largo'],
  ['Pedículo toracodorsal', 'Se identifica y preserva el pedículo toracodorsal'],
  ['Nervio pectoral medial', 'Se identifica y preserva el pedículo pectoral medial'],
  ['Intercostobraquial preservado', 'Se identifica y preserva el nervio intercostobraquial'],
  ['Intercostobraquial seccionado', 'Se secciona el nervio intercostobraquial'],
  ['Torácico largo no identificado', 'No se identifica el nervio torácico largo'],
  ['Toracodorsal no identificado', 'No se identifica el pedículo toracodorsal']
];

const REF_TIR = 'Patel KN, Yip L, Lubitz CC, et al. The American Association of Endocrine Surgeons Guidelines for the Definitive Surgical Management of Thyroid Disease in Adults. Ann Surg 2020;271(3):e21-e93; Haugen BR, et al. 2015 American Thyroid Association Management Guidelines for Adult Patients with Thyroid Nodules and Differentiated Thyroid Cancer. Thyroid 2016;26(1):1-133; Randolph GW, et al. Electrophysiologic recurrent laryngeal nerve monitoring during thyroid and parathyroid surgery: International Standards Guideline Statement. Laryngoscope 2011;121(Suppl 1):S1-S16; Royal College of Surgeons of England. Good Surgical Practice, 2014 (registro operatorio)';
const REF_MAMA = 'NCCN Clinical Practice Guidelines in Oncology: Breast Cancer (versión vigente); Moran MS, et al. Society of Surgical Oncology–American Society for Radiation Oncology consensus guideline on margins for breast-conserving surgery with whole-breast irradiation in stages I and II invasive breast cancer. J Clin Oncol 2014;32(14):1507-1515; Brackstone M, et al. Management of the Axilla in Early-Stage Breast Cancer: Ontario Health (Cancer Care Ontario) and ASCO Guideline. J Clin Oncol 2021;39(27):3056-3082; Townsend CM, et al. Sabiston Textbook of Surgery, 21.ª ed. Elsevier, 2021; Royal College of Surgeons of England. Good Surgical Practice, 2014';
const REF_ACC = "Practice Guidelines for Central Venous Access 2020: An Updated Report by the American Society of Anesthesiologists Task Force on Central Venous Access. Anesthesiology 2020;132(1):8-43; O'Grady NP, et al. Guidelines for the Prevention of Intravascular Catheter-Related Infections, CDC/HICPAC 2011 (actualización 2017); Gorski LA, et al. Infusion Therapy Standards of Practice, 9th ed. J Infus Nurs 2024;47(1S):S1-S285 (INS); Lamperti M, et al. International evidence-based recommendations on ultrasound-guided vascular access. Intensive Care Med 2012;38(7):1105-1117";

export default [
  // ───────────────────────────── Tiroidectomía (total, casi total, totalización, hemitiroidectomía) ─────────────────────────────
  {
    id: 'cg-tir',
    n: 'Tiroidectomía total',
    sp: 'Cirugía general',
    sub: 'Endocrina',
    cat: 'Cirugía endocrina y mamaria',
    syn: ['tiroidectomía', 'tiroidectomía casi total', 'totalización de tiroidectomía', 'bocio', 'cáncer de tiroides', 'Graves', 'TT'],
    v: 2,
    rev: '2026-10',
    ref: REF_TIR,
    ctx: 'Nódulo tiroideo con citología indeterminada, sospechosa o maligna, bocio compresivo o retroesternal, o hipertiroidismo con indicación quirúrgica. La variante define la extensión (total, casi total, totalización, hemitiroidectomía o istmectomía). La identificación del nervio laríngeo recurrente y de las paratiroides se documenta por lado, incluyendo cuando no se identifican',
    lat: true,
    f: [
      { id: 'ext', l: 'Extensión de la resección', sec: 'D', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Tiroidectomía total', 'tiroidectomía total'],
        ['Tiroidectomía casi total', 'tiroidectomía casi total, con remanente {d}'],
        ['Totalización', 'totalización de tiroidectomía, con resección del lóbulo remanente'],
        ['Hemitiroidectomía', 'hemitiroidectomía con istmectomía'],
        ['Lobectomía sin istmectomía', 'lobectomía tiroidea sin istmectomía'],
        ['Istmectomía', 'istmectomía']
      ], ph: 'lado y tamaño estimado del remanente' },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'multi', q: 1, p: 'Se indica cirugía por {v}', o: [
        ['Citología indeterminada', 'nódulo tiroideo con citología indeterminada'],
        ['Citología sospechosa o maligna', 'nódulo tiroideo con citología sospechosa o maligna'],
        ['Bocio con síntomas compresivos', 'bocio con síntomas compresivos'],
        ['Bocio retroesternal', 'bocio con extensión retroesternal'],
        ['Hipertiroidismo', 'hipertiroidismo con indicación quirúrgica'],
        ['Totalización', 'indicación de totalización tras cirugía tiroidea previa'],
        ['Otra', '{d}']
      ], ph: 'indicación' },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CUELLO },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', p: 'Se realiza {v}', o: [
        ['Transversa de Kocher', 'incisión cervical transversa de Kocher'],
        ['En pliegue cutáneo', 'incisión cervical transversa en un pliegue cutáneo'],
        ['Reducida', 'incisión cervical transversa reducida'],
        ['Sobre cicatriz previa', 'incisión cervical sobre la cicatriz previa'],
        ['Ampliada', 'incisión cervical ampliada {d}']
      ], ph: 'extensión' },
      { id: 'incl', l: 'Longitud de la incisión', sec: 'B', k: 'num', u: 'cm', p: 'Incisión de {v} cm' },
      { id: 'monit', l: 'Neuromonitorización', sec: 'B', k: 'yn', q: 1, y: 'Se utiliza neuromonitorización del nervio laríngeo recurrente', n: 'No se utiliza neuromonitorización' },
      { id: 'nmtipo', l: 'Tipo de neuromonitorización', sec: 'B', k: 'opt', if: ['monit', 'si'], o: NM_TIPO },
      { id: 'nmbase', l: 'Señal basal', sec: 'B', k: 'opt', if: ['monit', 'si'], o: [
        ['V1 y R1 registradas', 'Se registra señal basal del nervio vago y del nervio laríngeo recurrente'],
        ['Sin señal basal', 'No se obtiene señal basal {d}']
      ], ph: 'lado' },

      { id: 'thall', l: 'Hallazgos tiroideos', sec: 'C', k: 'multi', q: 1, o: [
        ['Glándula de aspecto normal', 'Glándula tiroides de tamaño y aspecto conservados'],
        ['Bocio multinodular', 'Glándula tiroides aumentada de tamaño, multinodular'],
        ['Nódulo único', 'Nódulo tiroideo único en {d}'],
        ['Extensión retroesternal', 'Bocio con extensión retroesternal'],
        ['Consistencia aumentada', 'Parénquima de consistencia aumentada'],
        ['Infiltración extratiroidea', 'Lesión con signos macroscópicos de infiltración de {d}'],
        ['Adenopatías centrales', 'Adenopatías en el compartimento central'],
        ['Adenopatías laterales', 'Adenopatías en el compartimento lateral'],
        ['Lóbulo piramidal', 'Lóbulo piramidal presente'],
        ['Adherencias por cirugía previa', 'Adherencias firmes en el lecho por cirugía previa']
      ], ph: 'lóbulo, polo o estructura' },
      { id: 'retro', l: 'Acceso al componente retroesternal', sec: 'D', k: 'opt', if: ['thall', 'Extensión retroesternal'], o: [
        ['Cervical', 'Se extrae el componente retroesternal por vía cervical'],
        ['Esternotomía parcial', 'Se realiza esternotomía parcial para la extracción del componente retroesternal'],
        ['Esternotomía total', 'Se realiza esternotomía mediana para la extracción del componente retroesternal']
      ] },
      { id: 'vasc', l: 'Tratamiento de los pedículos', sec: 'D', k: 'opt', o: [
        ['Ligaduras', 'ligaduras'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ultrasónico', 'bisturí ultrasónico'],
        ['Bipolar', 'energía bipolar'],
        ['Clips', 'clips']
      ] },
      { id: 'nrl', l: 'Nervio laríngeo recurrente', sec: 'D', k: 'multi', q: 1, req: 1, o: NLR, ph: 'lado' },
      { id: 'nls', l: 'Rama externa del laríngeo superior', sec: 'D', k: 'multi', o: [
        ['Derecha identificada', 'Se identifica y preserva la rama externa del nervio laríngeo superior derecho'],
        ['Izquierda identificada', 'Se identifica y preserva la rama externa del nervio laríngeo superior izquierdo'],
        ['Derecha no identificada', 'No se identifica la rama externa del nervio laríngeo superior derecho'],
        ['Izquierda no identificada', 'No se identifica la rama externa del nervio laríngeo superior izquierdo']
      ] },
      { id: 'para', l: 'Paratiroides', sec: 'D', k: 'multi', q: 1, o: [
        ['Superior derecha preservada', 'Se identifica y preserva la glándula paratiroides superior derecha'],
        ['Inferior derecha preservada', 'Se identifica y preserva la glándula paratiroides inferior derecha'],
        ['Superior izquierda preservada', 'Se identifica y preserva la glándula paratiroides superior izquierda'],
        ['Inferior izquierda preservada', 'Se identifica y preserva la glándula paratiroides inferior izquierda'],
        ['No identificadas', 'No se identifican glándulas paratiroides {d}'],
        ['Paratiroides desvascularizada', 'Se constata glándula paratiroides desvascularizada {d}'],
        ['Autotrasplante', 'Se realiza autotrasplante de tejido paratiroideo en {d}'],
        ['Paratiroides en la pieza', 'Se identifica glándula paratiroides en la pieza']
      ], ph: 'lado o sitio' },
      { id: 'nmres', l: 'Señal final de neuromonitorización', sec: 'D', k: 'opt', if: ['monit', 'si'], o: NM_RES, ph: 'lado' },
      { id: 'nmcond', l: 'Conducta ante pérdida de señal', sec: 'D', k: 'opt', if: ['nmres', 'Pérdida de señal'], o: [
        ['Se difiere el lado contralateral', 'Se difiere la resección contralateral por pérdida de señal (cirugía en etapas)'],
        ['Se completa el procedimiento', 'Se completa la resección contralateral']
      ] },
      { id: 'vc', l: 'Vaciamiento central', sec: 'D', k: 'opt', o: [
        ['No se realiza', 'No se realiza vaciamiento del compartimento central'],
        ['Ipsilateral', 'Se realiza vaciamiento del compartimento central (nivel VI) ipsilateral'],
        ['Bilateral', 'Se realiza vaciamiento del compartimento central (nivel VI) bilateral'],
        ['Niveles VI y VII', 'Se realiza vaciamiento del compartimento central y del mediastino superior (niveles VI y VII)']
      ] },

      { id: 'adj', l: 'Adyuvantes', sec: 'E', k: 'multi', p: 'Se utiliza {v}', o: [
        ['Autofluorescencia', 'autofluorescencia en infrarrojo cercano para identificación de paratiroides'],
        ['Verde de indocianina', 'angiografía con verde de indocianina para evaluar la perfusión paratiroidea'],
        ['Magnificación', 'magnificación con lupas'],
        ['Hemostático tópico', 'material hemostático tópico en el lecho']
      ] },

      { id: 'pori', l: 'Orientación de la pieza', sec: 'F', k: 'text', p: 'Se orienta la pieza con hilo de reparo en {v}', ph: 'polo superior derecho' },
      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: CONG_Y, n: CONG_N },
      { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' }
    ],
    pasos: [
      'Se realiza {inc} y sección del platisma',
      'Se tallan colgajos subplatismales superior e inferior',
      'Se realiza apertura de la línea media entre los músculos pretiroideos',
      { t: 'Se registra la señal basal del nervio vago con el electrodo de estimulación', if: ['monit', 'si'] },
      'Se separan los músculos pretiroideos y se expone el lóbulo tiroideo',
      { t: 'Se realiza disección en un campo con adherencias por cirugía previa', if: ['ext', 'Totalización'] },
      'Se realiza ligadura y sección de la vena tiroidea media con {vasc}',
      'Se diseca el polo superior y se secciona su pedículo con {vasc}, en contacto con la cápsula glandular',
      'Se identifican las glándulas paratiroides y se disecan respetando su pedículo vascular',
      'Se identifica el nervio laríngeo recurrente en el surco traqueoesofágico y se sigue hasta su entrada en la laringe',
      { t: 'Se realiza estimulación del nervio laríngeo recurrente durante la disección', if: ['monit', 'si'] },
      'Se secciona el ligamento de Berry bajo visión del nervio laríngeo recurrente',
      { t: 'Se secciona el istmo en el borde del lóbulo contralateral', if: ['ext', ['Hemitiroidectomía', 'Istmectomía']] },
      { t: 'Se repiten las maniobras sobre el lóbulo contralateral', if: ['ext', ['Tiroidectomía total', 'Tiroidectomía casi total']] },
      'Se completa la {ext}',
      { t: 'Se realiza estimulación vagal y del nervio laríngeo recurrente al finalizar la resección', if: ['monit', 'si'] },
      'Se revisa la pieza en busca de tejido paratiroideo',
      'Se realiza maniobra de Valsalva para control de la hemostasia',
      'Se aproximan los músculos pretiroideos en la línea media',
      'Se aproxima el platisma con puntos reabsorbibles'
    ],
    ej: 'Se indica cirugía por bocio con síntomas compresivos. Paciente en decúbito dorsal con rodete interescapular e hiperextensión cervical. Se utiliza neuromonitorización intermitente del nervio laríngeo recurrente, con registro de señal basal del nervio vago y del recurrente. Se realiza incisión cervical transversa de Kocher y sección del platisma, se tallan colgajos subplatismales y se abre la línea media. Glándula tiroides aumentada de tamaño, multinodular. Se diseca el polo superior y se secciona su pedículo con dispositivo de sellado vascular, en contacto con la cápsula glandular. Se identifica el nervio laríngeo recurrente en el surco traqueoesofágico y se secciona el ligamento de Berry bajo su visión; se repiten las maniobras sobre el lóbulo contralateral y se completa la tiroidectomía total. Se identifican y preservan ambos nervios laríngeos recurrentes y las cuatro glándulas paratiroides. Señal de neuromonitorización conservada al finalizar la disección en ambos lados. No se realiza vaciamiento del compartimento central. Se orienta la pieza con hilo de reparo en polo superior derecho y se envía a Anatomía Patológica. Se constata hemostasia tras maniobra de Valsalva. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },
  {
    id: 'cg-tir-hemi',
    n: 'Hemitiroidectomía o lobectomía tiroidea',
    sp: 'Cirugía general',
    cat: 'Cirugía endocrina y mamaria',
    syn: ['hemitiroidectomía', 'lobectomía tiroidea', 'lobectomía', 'nódulo tiroideo', 'istmectomía'],
    alias: 'cg-tir',
    set: { ext: 'Hemitiroidectomía' }
  },

  // ───────────────────────────── Paratiroidectomía ─────────────────────────────
  {
    id: 'cg-paratir',
    n: 'Paratiroidectomía',
    sp: 'Cirugía general',
    sub: 'Endocrina',
    cat: 'Cirugía endocrina y mamaria',
    syn: ['paratiroides', 'adenoma paratiroideo', 'hiperparatiroidismo', 'paratiroidectomía focalizada', 'exploración cervical bilateral', 'paratiroidectomía subtotal'],
    v: 1,
    rev: '2026-10',
    ref: 'Wilhelm SM, Wang TS, Ruan DT, et al. The American Association of Endocrine Surgeons Guidelines for Definitive Management of Primary Hyperparathyroidism. JAMA Surg 2016;151(10):959-968; Randolph GW, et al. Electrophysiologic recurrent laryngeal nerve monitoring during thyroid and parathyroid surgery: International Standards Guideline Statement. Laryngoscope 2011;121(Suppl 1):S1-S16; Townsend CM, et al. Sabiston Textbook of Surgery, 21.ª ed. Elsevier, 2021; Royal College of Surgeons of England. Good Surgical Practice, 2014',
    ctx: 'Hiperparatiroidismo primario, secundario, terciario, persistente o recurrente. La variante define la técnica: focalizada guiada por localización preoperatoria, exploración bilateral, subtotal, total con o sin autotrasplante, o reexploración. Las glándulas se documentan una por una (resecadas, de aspecto normal o no identificadas)',
    lat: true,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'D', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Focalizada', 'paratiroidectomía focalizada mínimamente invasiva'],
        ['Exploración bilateral', 'exploración cervical bilateral'],
        ['Subtotal', 'paratiroidectomía subtotal'],
        ['Total con autotrasplante', 'paratiroidectomía total con autotrasplante'],
        ['Total sin autotrasplante', 'paratiroidectomía total sin autotrasplante'],
        ['Reexploración', 'reexploración cervical por hiperparatiroidismo persistente o recurrente']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CUELLO },
      { id: 'loci', l: 'Localización preoperatoria', sec: 'B', k: 'multi', q: 1, p: 'Localización preoperatoria por {v}', o: [
        ['Ecografía cervical', 'ecografía cervical'],
        ['Centellograma con sestamibi', 'centellograma con sestamibi'],
        ['SPECT-TC', 'SPECT-TC'],
        ['TC 4D', 'tomografía computada de cuatro fases'],
        ['PET-TC con colina', 'PET-TC con colina'],
        ['Sin localización concordante', 'estudios sin localización concordante']
      ] },
      { id: 'locr', l: 'Lesión localizada en', sec: 'B', k: 'text', p: 'Lesión localizada preoperatoriamente en {v}', ph: 'posición inferior izquierda' },
      { id: 'monit', l: 'Neuromonitorización', sec: 'B', k: 'yn', y: 'Se utiliza neuromonitorización del nervio laríngeo recurrente', n: 'No se utiliza neuromonitorización' },
      { id: 'nmtipo', l: 'Tipo de neuromonitorización', sec: 'B', k: 'opt', if: ['monit', 'si'], o: NM_TIPO },
      { id: 'adj', l: 'Adyuvantes de localización', sec: 'B', k: 'multi', p: 'Se utiliza {v}', o: [
        ['Ecografía intraoperatoria', 'ecografía intraoperatoria'],
        ['Sonda gamma', 'sonda gamma con técnica radioguiada'],
        ['Autofluorescencia', 'autofluorescencia en infrarrojo cercano'],
        ['Verde de indocianina', 'angiografía con verde de indocianina']
      ] },

      { id: 'gaum', l: 'Glándulas aumentadas de tamaño', sec: 'C', k: 'multi', q: 1, p: 'Se identifica aumento de tamaño de {v}', o: GLAND, ph: 'localización' },
      { id: 'gnorm', l: 'Glándulas de aspecto normal', sec: 'C', k: 'multi', p: 'Se identifica con aspecto macroscópico normal {v}', o: GLAND, ph: 'localización' },
      { id: 'gnoid', l: 'Glándulas no identificadas', sec: 'C', k: 'multi', p: 'No se identifica {v}', o: GLAND.slice(0, 4) },
      { id: 'expl', l: 'Sitios explorados en búsqueda de glándula', sec: 'C', k: 'multi', p: 'Se exploran {v}', o: [
        ['Timo cervical', 'el timo cervical'],
        ['Retroesofágico', 'el espacio retroesofágico y paraesofágico'],
        ['Vaina carotídea', 'la vaina carotídea'],
        ['Intratiroideo', 'el parénquima tiroideo por ecografía intraoperatoria'],
        ['Mediastino superior', 'el mediastino superior por vía cervical']
      ] },

      { id: 'gres', l: 'Glándulas resecadas', sec: 'D', k: 'multi', q: 1, req: 1, p: 'Se realiza resección de {v}', o: GLAND, ph: 'localización' },
      { id: 'remn', l: 'Remanente paratiroideo', sec: 'D', k: 'text', if: ['tec', 'Subtotal'], p: 'Se deja remanente paratiroideo de {v}', ph: 'aproximadamente 50 mg de la glándula inferior izquierda, marcado con clip' },
      { id: 'auto', l: 'Sitio del autotrasplante', sec: 'D', k: 'opt', if: ['tec', 'Total con autotrasplante'], o: [
        ['Esternocleidomastoideo', 'Se implantan fragmentos de tejido paratiroideo en el músculo esternocleidomastoideo {d}'],
        ['Antebrazo', 'Se implantan fragmentos de tejido paratiroideo en el músculo braquiorradial del antebrazo {d}'],
        ['Subcutáneo', 'Se implantan fragmentos de tejido paratiroideo en tejido celular subcutáneo {d}']
      ], ph: 'lado, número de fragmentos y marcación' },
      { id: 'crio', l: 'Criopreservación', sec: 'D', k: 'yn', y: 'Se envía tejido paratiroideo para criopreservación', n: 'No se criopreserva tejido paratiroideo' },
      { id: 'tim', l: 'Timectomía cervical', sec: 'D', k: 'yn', y: 'Se realiza timectomía cervical transcervical', n: 'No se realiza timectomía cervical' },
      { id: 'nrl', l: 'Nervio laríngeo recurrente', sec: 'D', k: 'multi', q: 1, req: 1, o: NLR, ph: 'lado' },
      { id: 'nmres', l: 'Señal final de neuromonitorización', sec: 'D', k: 'opt', if: ['monit', 'si'], o: NM_RES, ph: 'lado' },
      { id: 'pthio', l: 'PTH intraoperatoria', sec: 'D', k: 'yn', q: 1, y: 'Se realiza determinación intraoperatoria de PTH', n: 'No se realiza determinación intraoperatoria de PTH' },
      { id: 'pthb', l: 'PTH basal', sec: 'D', k: 'num', u: 'pg/mL', if: ['pthio', 'si'], p: 'PTH basal de {v} pg/mL' },
      { id: 'pth10', l: 'PTH a los 10 minutos', sec: 'D', k: 'num', u: 'pg/mL', if: ['pthio', 'si'], p: 'PTH de {v} pg/mL a los 10 minutos de la exéresis' },
      { id: 'pthx', l: 'Otras determinaciones de PTH', sec: 'D', k: 'text', if: ['pthio', 'si'], p: 'Determinaciones adicionales de PTH de {v}', ph: '45 pg/mL a los 20 minutos' },

      { id: 'cong', l: 'Estudio por congelación', sec: 'F', k: 'yn', y: CONG_Y, n: CONG_N },
      { id: 'congr', l: 'Informe de congelación', sec: 'F', k: 'text', if: ['cong', 'si'], p: 'El estudio por congelación informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'peso', l: 'Peso de la glándula', sec: 'F', k: 'text', p: 'Glándula resecada de {v}', ph: '1,2 g, 2 x 1 cm' }
    ],
    pasos: [
      { t: 'Se realiza incisión cervical transversa reducida sobre la proyección de la lesión localizada', if: ['tec', 'Focalizada'] },
      { t: 'Se realiza incisión cervical transversa y sección del platisma', ifn: ['tec', 'Focalizada'] },
      'Se separan los músculos pretiroideos y se moviliza el lóbulo tiroideo en sentido medial',
      { t: 'Se toma muestra de sangre para PTH basal', if: ['pthio', 'si'] },
      'Se identifica el nervio laríngeo recurrente',
      { t: 'Se explora el sitio de localización preoperatoria', if: ['tec', 'Focalizada'] },
      { t: 'Se exploran las cuatro posiciones paratiroideas en forma bilateral', ifn: ['tec', 'Focalizada'] },
      'Se diseca la glándula patológica respetando su cápsula',
      'Se liga el pedículo vascular de la glándula y se realiza su exéresis',
      { t: 'Se reseca parcialmente la glándula más normal y se marca el remanente vascularizado con clip', if: ['tec', 'Subtotal'] },
      { t: 'Se toma muestra de sangre para PTH a los 10 minutos de la exéresis', if: ['pthio', 'si'] },
      { t: 'Se fragmenta el tejido paratiroideo y se implanta en bolsillos musculares marcados con sutura no reabsorbible', if: ['tec', 'Total con autotrasplante'] },
      'Se realiza maniobra de Valsalva para control de la hemostasia',
      'Se aproximan los músculos pretiroideos en la línea media',
      'Se aproxima el platisma con puntos reabsorbibles'
    ],
    ej: 'Se realiza paratiroidectomía focalizada mínimamente invasiva izquierda. Localización preoperatoria por ecografía cervical y SPECT-TC, con lesión localizada en posición inferior izquierda. Se realiza incisión cervical transversa reducida, se separan los músculos pretiroideos y se toma muestra de sangre para PTH basal. Se identifica el nervio laríngeo recurrente y se explora el sitio de localización preoperatoria. Se identifica aumento de tamaño de la glándula paratiroides inferior izquierda, que se diseca respetando su cápsula; se liga su pedículo y se realiza su exéresis. Se identifica y preserva el nervio laríngeo recurrente izquierdo. Se realiza determinación intraoperatoria de PTH, basal de 180 pg/mL y de 32 pg/mL a los 10 minutos de la exéresis. Se envía la glándula a Anatomía Patológica. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Cirugía conservadora de mama (tumorectomía y biopsia) ─────────────────────────────
  {
    id: 'cg-mama',
    n: 'Tumorectomía o resección local mamaria',
    sp: 'Cirugía general',
    sub: 'Mama',
    cat: 'Cirugía endocrina y mamaria',
    syn: ['tumorectomía', 'cuadrantectomía', 'mastectomía parcial', 'cirugía conservadora de mama', 'resección segmentaria', 'ampliación de márgenes', 'oncoplastia'],
    v: 2,
    rev: '2026-10',
    ref: REF_MAMA,
    ctx: 'Lesión mamaria benigna o maligna, palpable o no palpable con marcación prequirúrgica. La variante define el procedimiento (biopsia escisional, tumorectomía, cuadrantectomía o ampliación de márgenes). Puede asociarse estadificación axilar en el mismo acto',
    lat: true,
    f: [
      { id: 'mproc', l: 'Procedimiento', sec: 'D', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Biopsia escisional', 'biopsia escisional'],
        ['Tumorectomía', 'tumorectomía'],
        ['Tumorectomía oncoplástica', 'tumorectomía con técnica oncoplástica'],
        ['Cuadrantectomía', 'cuadrantectomía'],
        ['Ampliación de márgenes', 'ampliación de márgenes']
      ] },
      { id: 'marc', l: 'Marcación de la lesión', sec: 'B', k: 'opt', q: 1, o: MARC_MAMA },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', o: INC_MAMA, ph: 'tipo y localización' },

      { id: 'loc', l: 'Localización de la lesión', sec: 'C', k: 'opt', q: 1, p: 'Lesión localizada en {v}', o: LOC_MAMA },
      { id: 'radio', l: 'Radio horario y distancia', sec: 'C', k: 'text', p: 'Lesión a hora {v}', ph: '10, a 3 cm del pezón' },
      { id: 'hmama', l: 'Características de la lesión', sec: 'C', k: 'multi', p: 'Lesión {v}', o: [
        ['Bien delimitada', 'de bordes bien delimitados'],
        ['Mal delimitada', 'de bordes mal delimitados'],
        ['Firme', 'de consistencia firme'],
        ['Quística', 'de contenido quístico'],
        ['Adherida a la piel', 'adherida a la piel'],
        ['Adherida a la fascia', 'adherida a la fascia del pectoral mayor']
      ] },

      { id: 'tres', l: 'Extensión de la resección', sec: 'D', k: 'multi', p: 'La resección incluye {v}', o: [
        ['Piel suprayacente', 'piel suprayacente'],
        ['Fascia del pectoral mayor', 'fascia del músculo pectoral mayor'],
        ['Tejido hasta la fascia', 'tejido glandular en todo su espesor hasta la fascia'],
        ['Lecho de la resección previa', 'el lecho de la resección previa']
      ] },
      { id: 'onco', l: 'Remodelación', sec: 'D', k: 'opt', o: [
        ['Sin remodelación', 'No se realiza remodelación glandular'],
        ['Remodelación glandular', 'Se realiza remodelación glandular con colgajos de avance'],
        ['Oncoplastia nivel I', 'Se realiza oncoplastia de nivel I'],
        ['Oncoplastia nivel II', 'Se realiza oncoplastia de nivel II con técnica {d}']
      ], ph: 'técnica de mamoplastia' },
      { id: 'clips', l: 'Marcación del lecho', sec: 'D', k: 'yn', y: 'Se marcan los bordes del lecho quirúrgico con clips', n: 'No se marca el lecho con clips' },
      { id: 'axila', l: 'Procedimiento axilar asociado', sec: 'D', k: 'opt', q: 1, o: [
        ['Sin procedimiento axilar', 'No se realiza procedimiento axilar'],
        ['Ganglio centinela', 'Se realiza biopsia de ganglio centinela en el mismo acto'],
        ['Linfadenectomía axilar', 'Se realiza linfadenectomía axilar en el mismo acto']
      ] },
      { id: 'gctr', l: 'Trazador del ganglio centinela', sec: 'D', k: 'multi', if: ['axila', 'Ganglio centinela'], p: 'Ganglio centinela identificado con {v}', o: TRAZ },
      { id: 'gcn', l: 'Número de ganglios centinela', sec: 'D', k: 'num', if: ['axila', 'Ganglio centinela'], p: 'Se extraen {v} ganglios centinela' },
      { id: 'gcint', l: 'Estudio intraoperatorio del ganglio', sec: 'D', k: 'opt', if: ['axila', 'Ganglio centinela'], o: GC_INT },
      { id: 'gcres', l: 'Resultado intraoperatorio del ganglio', sec: 'D', k: 'text', if: ['gcint', ['Congelación', 'Impronta citológica', 'Análisis molecular intraoperatorio']], p: 'El estudio intraoperatorio del ganglio informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'vac', l: 'Niveles de linfadenectomía', sec: 'D', k: 'opt', if: ['axila', 'Linfadenectomía axilar'], o: [
        ['Niveles I y II', 'Linfadenectomía axilar de niveles I y II'],
        ['Niveles I a III', 'Linfadenectomía axilar de niveles I a III']
      ] },

      { id: 'mrec', l: 'Marcador en la pieza', sec: 'F', k: 'multi', ifn: ['marc', 'Palpable'], o: [
        ['Arpón íntegro', 'Se constata el arpón íntegro en la pieza'],
        ['Marcador localizador en la pieza', 'Se constata el marcador localizador en la pieza'],
        ['Clip en la radiografía', 'Se constata el clip de marcación en la radiografía de la pieza'],
        ['Marcador no recuperado', 'No se constata el marcador en la pieza']
      ] },
      { id: 'marg', l: 'Márgenes y orientación de la pieza', sec: 'F', k: 'multi', q: 1, o: [
        ['Orientada con hilos', 'Se orienta la pieza con hilos de reparo {d}'],
        ['Radiografía de pieza', 'Se realiza radiografía de la pieza'],
        ['Ecografía de pieza', 'Se realiza ecografía de la pieza'],
        ['Congelación de márgenes', 'Se envían márgenes a estudio intraoperatorio por congelación'],
        ['Ampliación de margen', 'Se realiza ampliación del margen {d}'],
        ['Márgenes del lecho por separado', 'Se envían los márgenes del lecho por separado, rotulados']
      ], ph: 'convención u orientación (p. ej. corto superior, largo lateral)' },
      { id: 'margr', l: 'Evaluación intraoperatoria de márgenes', sec: 'F', k: 'text', p: 'Evaluación intraoperatoria de márgenes informada como {v}', ph: 'transcribir lo informado' }
    ],
    pasos: [
      'Se localiza la lesión según la marcación prequirúrgica',
      { t: 'Se realiza ecografía intraoperatoria para localizar la lesión', if: ['marc', 'Clip de marcación con ecografía intraoperatoria'] },
      { t: 'Se localiza con sonda gamma el punto de máxima actividad', if: ['marc', 'Radioguiada (ROLL)'] },
      'Se realiza la incisión cutánea planificada y se tallan colgajos cutáneos',
      { t: 'Se realiza escisión completa de la lesión', if: ['mproc', 'Biopsia escisional'] },
      { t: 'Se reseca la lesión con margen macroscópico de tejido sano', if: ['mproc', ['Tumorectomía', 'Tumorectomía oncoplástica', 'Cuadrantectomía']] },
      { t: 'Se reseca el margen indicado del lecho de la tumorectomía previa', if: ['mproc', 'Ampliación de márgenes'] },
      'Se orienta la pieza con hilos de reparo antes de separarla del campo',
      { t: 'Se envía la pieza a control radiológico o ecográfico', ifn: ['marc', 'Palpable'] },
      { t: 'Se marcan los bordes del lecho quirúrgico con clips', ifn: ['mproc', 'Biopsia escisional'] },
      { t: 'Se movilizan colgajos glandulares y se realiza la remodelación', if: ['mproc', ['Tumorectomía oncoplástica', 'Cuadrantectomía']] },
      { t: 'Se realiza incisión axilar y apertura de la fascia clavipectoral', if: ['axila', ['Ganglio centinela', 'Linfadenectomía axilar']] },
      { t: 'Se identifica el ganglio centinela mediante sonda gamma, colorante o fluorescencia y se realiza su exéresis', if: ['axila', 'Ganglio centinela'] },
      'Se realiza cierre del tejido glandular y del tejido celular subcutáneo'
    ],
    ej: 'Paciente con lesión no palpable de mama izquierda con marcación prequirúrgica con arpón, localizada en el cuadrante superoexterno a hora 2, a 4 cm del pezón. Se realiza incisión arciforme sobre la lesión. Se reseca la lesión con margen macroscópico de tejido sano y se realiza tumorectomía, con resección que incluye la fascia del músculo pectoral mayor. Se orienta la pieza con hilos de reparo, corto superior y largo lateral, y se realiza radiografía de la pieza; se constata el arpón íntegro en la pieza. Se marcan los bordes del lecho con clips y se realiza remodelación glandular con colgajos de avance. Se realiza biopsia de ganglio centinela en el mismo acto, identificado con radiocoloide marcado con tecnecio-99m y colorante azul, con extracción de 2 ganglios centinela. Se envía el material a Anatomía Patológica. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },
  {
    id: 'cg-mama-bx',
    n: 'Biopsia mamaria quirúrgica',
    sp: 'Cirugía general',
    cat: 'Cirugía endocrina y mamaria',
    syn: ['biopsia escisional de mama', 'biopsia radioquirúrgica', 'biopsia con arpón', 'exéresis de nódulo mamario', 'fibroadenoma'],
    alias: 'cg-mama',
    set: { mproc: 'Biopsia escisional' }
  },

  // ───────────────────────────── Mastectomía ─────────────────────────────
  {
    id: 'cg-mast',
    n: 'Mastectomía',
    sp: 'Cirugía general',
    sub: 'Mama',
    cat: 'Cirugía endocrina y mamaria',
    syn: ['mastectomía simple', 'mastectomía radical modificada', 'Madden', 'mastectomía con conservación de piel', 'mastectomía con conservación de pezón', 'skin sparing', 'nipple sparing', 'MRM'],
    v: 1,
    rev: '2026-10',
    ref: REF_MAMA,
    ctx: 'Cáncer de mama no candidato a cirugía conservadora, recurrencia local o indicación de reducción de riesgo. La variante define el tipo de mastectomía y la lateralidad (incluye bilateral). En la conservación del complejo areola-pezón se documenta la evaluación del margen retroareolar',
    lat: true,
    f: [
      { id: 'tipo', l: 'Tipo de mastectomía', sec: 'D', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Simple total', 'mastectomía simple total'],
        ['Conservadora de piel', 'mastectomía con conservación de piel'],
        ['Conservadora de piel y CAP', 'mastectomía con conservación de piel y del complejo areola-pezón'],
        ['Radical modificada', 'mastectomía radical modificada']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', o: [
        ['Elíptica transversa (Stewart)', 'Se realiza incisión elíptica transversa de Stewart incluyendo el complejo areola-pezón'],
        ['Elíptica oblicua', 'Se realiza incisión elíptica oblicua incluyendo el complejo areola-pezón'],
        ['Periareolar', 'Se realiza incisión periareolar'],
        ['Surco submamario', 'Se realiza incisión en el surco submamario'],
        ['Radiada lateral', 'Se realiza incisión radiada lateral'],
        ['Otra', 'Se realiza incisión {d}']
      ], ph: 'tipo y localización' },

      { id: 'hmast', l: 'Hallazgos', sec: 'C', k: 'multi', o: [
        ['Lesión palpable', 'Lesión palpable en {d}'],
        ['Compromiso cutáneo', 'Compromiso cutáneo sobre la lesión'],
        ['Adherencia a la fascia', 'Lesión adherida a la fascia del pectoral mayor'],
        ['Adenopatías axilares palpables', 'Adenopatías axilares palpables'],
        ['Fibrosis por radioterapia', 'Fibrosis de los tejidos por radioterapia previa']
      ], ph: 'cuadrante' },

      { id: 'plano', l: 'Disección de colgajos', sec: 'D', k: 'opt', o: [
        ['Electrobisturí', 'electrobisturí'],
        ['Tijera', 'disección con tijera'],
        ['Tumescencia y tijera', 'infiltración tumescente y disección con tijera']
      ] },
      { id: 'fasc', l: 'Fascia del pectoral mayor', sec: 'D', k: 'yn', y: 'Se incluye la fascia del músculo pectoral mayor en la pieza', n: 'Se preserva la fascia del músculo pectoral mayor' },
      { id: 'retro', l: 'Margen retroareolar', sec: 'D', k: 'opt', if: ['tipo', 'Conservadora de piel y CAP'], o: [
        ['Enviado por separado', 'Se envía el margen retroareolar por separado'],
        ['Congelación', 'Se envía el margen retroareolar a estudio intraoperatorio por congelación'],
        ['No enviado por separado', 'No se envía el margen retroareolar por separado']
      ] },
      { id: 'retror', l: 'Resultado del margen retroareolar', sec: 'D', k: 'text', if: ['retro', 'Congelación'], p: 'El estudio del margen retroareolar informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'axila', l: 'Procedimiento axilar', sec: 'D', k: 'opt', q: 1, ifn: ['tipo', 'Radical modificada'], o: [
        ['Sin procedimiento axilar', 'No se realiza procedimiento axilar'],
        ['Ganglio centinela', 'Se realiza biopsia de ganglio centinela'],
        ['Linfadenectomía axilar', 'Se realiza linfadenectomía axilar']
      ] },
      { id: 'gctr', l: 'Trazador del ganglio centinela', sec: 'D', k: 'multi', if: ['axila', 'Ganglio centinela'], p: 'Ganglio centinela identificado con {v}', o: TRAZ },
      { id: 'gcn', l: 'Número de ganglios centinela', sec: 'D', k: 'num', if: ['axila', 'Ganglio centinela'], p: 'Se extraen {v} ganglios centinela' },
      { id: 'niv', l: 'Niveles axilares resecados', sec: 'D', k: 'opt', ifn: ['axila', ['Sin procedimiento axilar', 'Ganglio centinela']], o: [
        ['Niveles I y II', 'Se resecan los niveles axilares I y II'],
        ['Niveles I a III', 'Se resecan los niveles axilares I a III']
      ] },
      { id: 'nerv', l: 'Estructuras axilares', sec: 'D', k: 'multi', ifn: ['axila', 'Sin procedimiento axilar'], o: AX_NERV },

      { id: 'recon', l: 'Reconstrucción inmediata', sec: 'E', k: 'opt', q: 1, o: [
        ['Sin reconstrucción', 'No se realiza reconstrucción inmediata'],
        ['Expansor tisular', 'Se realiza reconstrucción inmediata con expansor tisular'],
        ['Implante definitivo', 'Se realiza reconstrucción inmediata con implante mamario'],
        ['Colgajo autólogo', 'Se realiza reconstrucción inmediata con colgajo {d}'],
        ['A cargo de cirugía plástica', 'La reconstrucción inmediata queda a cargo del equipo de cirugía plástica, con parte propio']
      ], ph: 'tipo de colgajo' },
      { id: 'rplano', l: 'Plano del implante o expansor', sec: 'E', k: 'opt', if: ['recon', ['Expansor tisular', 'Implante definitivo']], o: [
        ['Prepectoral', 'Implante en plano prepectoral'],
        ['Subpectoral', 'Implante en plano subpectoral'],
        ['Plano dual', 'Implante en plano dual']
      ] },
      { id: 'rvol', l: 'Volumen del implante o expansor', sec: 'E', k: 'text', if: ['recon', ['Expansor tisular', 'Implante definitivo']], p: 'Volumen de {v}', ph: '350 mL, llenado inicial de 150 mL' },
      { id: 'rmatr', l: 'Matriz o malla', sec: 'E', k: 'yn', if: ['recon', ['Expansor tisular', 'Implante definitivo']], y: 'Se utiliza matriz dérmica o malla de cobertura', n: 'No se utiliza matriz ni malla de cobertura' },

      { id: 'pori', l: 'Orientación de la pieza', sec: 'F', k: 'text', p: 'Se orienta la pieza con {v}', ph: 'hilo corto en prolongación axilar' }
    ],
    pasos: [
      'Se marca la incisión con el paciente en posición',
      'Se realiza la incisión cutánea planificada',
      'Se tallan colgajos cutáneos superior, inferior, medial y lateral en el plano de la fascia superficial con {plano}',
      { t: 'Se diseca el complejo areola-pezón preservando su piel y se reseca el tejido ductal retroareolar', if: ['tipo', 'Conservadora de piel y CAP'] },
      'Se diseca la glándula mamaria de la fascia del músculo pectoral mayor en sentido medial a lateral',
      { t: 'Se realiza disección axilar en continuidad con la pieza', if: ['tipo', 'Radical modificada'] },
      'Se extrae la pieza y se orienta con hilos de reparo',
      { t: 'Se realiza incisión axilar y apertura de la fascia clavipectoral', if: ['axila', ['Ganglio centinela', 'Linfadenectomía axilar']] },
      { t: 'Se identifica el ganglio centinela mediante sonda gamma, colorante o fluorescencia y se realiza su exéresis', if: ['axila', 'Ganglio centinela'] },
      { t: 'Se confecciona el bolsillo para la reconstrucción', if: ['recon', ['Expansor tisular', 'Implante definitivo']] },
      { t: 'Se coloca el expansor o implante en el bolsillo confeccionado', if: ['recon', ['Expansor tisular', 'Implante definitivo']] },
      'Se revisan los colgajos cutáneos',
      'Se realiza cierre del tejido celular subcutáneo'
    ],
    ej: 'Se realiza incisión elíptica transversa de Stewart incluyendo el complejo areola-pezón de la mama derecha. Se tallan colgajos cutáneos superior, inferior, medial y lateral en el plano de la fascia superficial con electrobisturí, y se diseca la glándula mamaria de la fascia del pectoral mayor en sentido medial a lateral. Se incluye la fascia del músculo pectoral mayor en la pieza. Se realiza mastectomía simple total. Se realiza biopsia de ganglio centinela, identificado con radiocoloide marcado con tecnecio-99m, con extracción de 2 ganglios centinela. Se identifica y preserva el nervio intercostobraquial. No se realiza reconstrucción inmediata. Se orienta la pieza con hilo corto en prolongación axilar y se envía a Anatomía Patológica. Se constata hemostasia. Se coloca drenaje aspirativo en lecho de mastectomía. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Biopsia de ganglio centinela ─────────────────────────────
  {
    id: 'cg-gc',
    n: 'Biopsia de ganglio centinela',
    sp: 'Cirugía general',
    sub: 'Mama',
    cat: 'Cirugía endocrina y mamaria',
    syn: ['ganglio centinela', 'BGC', 'GC', 'linfadenectomía selectiva', 'disección axilar dirigida', 'ganglio clipado'],
    v: 1,
    rev: '2026-10',
    ref: 'Brackstone M, et al. Management of the Axilla in Early-Stage Breast Cancer: Ontario Health (Cancer Care Ontario) and ASCO Guideline. J Clin Oncol 2021;39(27):3056-3082; Lyman GH, et al. Sentinel Lymph Node Biopsy for Patients With Early-Stage Breast Cancer: American Society of Clinical Oncology Clinical Practice Guideline Update. J Clin Oncol 2017;35(5):561-564; NCCN Clinical Practice Guidelines in Oncology: Breast Cancer y Melanoma: Cutaneous (versiones vigentes); Townsend CM, et al. Sabiston Textbook of Surgery, 21.ª ed. Elsevier, 2021',
    ctx: 'Estadificación ganglionar regional en cáncer de mama o melanoma cutáneo sin ganglios clínicamente comprometidos, o tras tratamiento neoadyuvante (incluida la recuperación del ganglio marcado con clip). La variante define la región y el lado',
    lat: true,
    f: [
      { id: 'reg', l: 'Región', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza biopsia de ganglio centinela {v}', o: [
        ['Axilar', 'axilar'],
        ['Inguinal', 'inguinal'],
        ['Cervical', 'cervical'],
        ['Otra', 'en {d}']
      ], ph: 'región' },
      { id: 'tr', l: 'Trazador', sec: 'B', k: 'multi', q: 1, req: 1, p: 'Se utiliza {v}', o: TRAZ },
      { id: 'iny', l: 'Sitio de inyección', sec: 'B', k: 'multi', p: 'Inyección {v} del trazador', o: [
        ['Periareolar', 'periareolar'],
        ['Subareolar', 'subareolar'],
        ['Peritumoral', 'peritumoral'],
        ['Intradérmica', 'intradérmica'],
        ['Perilesional en la cicatriz', 'perilesional en la cicatriz de la biopsia previa']
      ] },
      { id: 'linfo', l: 'Linfocentellograma preoperatorio', sec: 'B', k: 'yn', y: 'Se dispone de linfocentellograma preoperatorio', n: 'Sin linfocentellograma preoperatorio' },
      { id: 'tadx', l: 'Ganglio marcado previamente', sec: 'B', k: 'yn', y: 'Se busca además el ganglio marcado con clip antes del tratamiento neoadyuvante', n: 'Sin ganglio marcado previamente' },

      { id: 'ident', l: 'Identificación', sec: 'C', k: 'opt', q: 1, req: 1, o: [
        ['Identificado', 'Se identifica ganglio centinela'],
        ['No identificado', 'No se identifica ganglio centinela']
      ] },
      { id: 'crit', l: 'Criterio de identificación', sec: 'C', k: 'multi', if: ['ident', 'Identificado'], p: 'Ganglio identificado por {v}', o: [
        ['Radiactividad', 'radiactividad con sonda gamma'],
        ['Tinción azul', 'tinción azul'],
        ['Fluorescencia', 'fluorescencia'],
        ['Señal magnética', 'señal magnética'],
        ['Palpación', 'palpación de ganglio sospechoso']
      ] },
      { id: 'hgc', l: 'Aspecto del ganglio', sec: 'C', k: 'multi', if: ['ident', 'Identificado'], o: [
        ['Aspecto normal', 'Ganglio de aspecto macroscópico normal'],
        ['Aumentado de tamaño', 'Ganglio aumentado de tamaño'],
        ['Consistencia firme', 'Ganglio de consistencia firme'],
        ['Sustitución macroscópica', 'Ganglio con sustitución macroscópica']
      ] },

      { id: 'gcn', l: 'Número de ganglios centinela', sec: 'D', k: 'num', q: 1, if: ['ident', 'Identificado'], p: 'Se extraen {v} ganglios centinela' },
      { id: 'gcns', l: 'Ganglios no centinela', sec: 'D', k: 'num', p: 'Se extraen además {v} ganglios no centinela' },
      { id: 'cnt', l: 'Conteo ex vivo', sec: 'D', k: 'text', if: ['tr', 'Radiocoloide con tecnecio-99m'], p: 'Conteo ex vivo de {v}', ph: 'ganglio 1, 850 cuentas en 10 s' },
      { id: 'resid', l: 'Actividad residual en el lecho', sec: 'D', k: 'text', if: ['tr', 'Radiocoloide con tecnecio-99m'], p: 'Actividad residual en el lecho de {v}', ph: 'menos del 10% del ganglio más activo' },
      { id: 'tad', l: 'Ganglio marcado con clip', sec: 'D', k: 'opt', if: ['tadx', 'si'], o: [
        ['Recuperado', 'Se recupera el ganglio marcado con clip, confirmado por radiografía de la pieza'],
        ['Recuperado, coincide con el centinela', 'El ganglio marcado con clip coincide con un ganglio centinela'],
        ['No recuperado', 'No se recupera el ganglio marcado con clip']
      ] },
      { id: 'gcint', l: 'Estudio intraoperatorio', sec: 'D', k: 'opt', q: 1, o: GC_INT },
      { id: 'gcres', l: 'Resultado intraoperatorio', sec: 'D', k: 'text', if: ['gcint', ['Congelación', 'Impronta citológica', 'Análisis molecular intraoperatorio']], p: 'El estudio intraoperatorio del ganglio informa {v}', ph: 'transcribir lo informado por patología' },
      { id: 'vac', l: 'Linfadenectomía en el mismo acto', sec: 'D', k: 'opt', o: [
        ['No se realiza', 'No se realiza linfadenectomía en el mismo acto'],
        ['Se completa linfadenectomía', 'Se completa linfadenectomía regional en el mismo acto {d}']
      ], ph: 'niveles' }
    ],
    pasos: [
      'Se realiza inyección {iny} del trazador',
      'Se realiza masaje de la zona de inyección',
      { t: 'Se localiza con sonda gamma transcutánea el punto de máxima actividad', if: ['tr', 'Radiocoloide con tecnecio-99m'] },
      'Se realiza incisión cutánea sobre el punto marcado',
      { t: 'Se realiza apertura de la fascia clavipectoral', if: ['reg', 'Axilar'] },
      'Se identifican los conductos linfáticos teñidos o el ganglio con mayor actividad',
      'Se diseca y extrae el ganglio centinela con control de los linfáticos aferentes',
      { t: 'Se mide la actividad ex vivo de cada ganglio extraído', if: ['tr', 'Radiocoloide con tecnecio-99m'] },
      { t: 'Se mide la actividad residual en el lecho', if: ['tr', 'Radiocoloide con tecnecio-99m'] },
      { t: 'Se localiza el ganglio marcado con clip y se envía la pieza a control radiológico', if: ['tadx', 'si'] },
      'Se realiza palpación del lecho en búsqueda de ganglios clínicamente sospechosos',
      'Se realiza cierre de la fascia y del tejido celular subcutáneo'
    ],
    ej: 'Se realiza biopsia de ganglio centinela axilar izquierda. Se utiliza radiocoloide marcado con tecnecio-99m y colorante azul, con inyección periareolar del trazador. Se dispone de linfocentellograma preoperatorio. Se localiza con sonda gamma el punto de máxima actividad, se realiza incisión sobre el punto marcado y apertura de la fascia clavipectoral. Se identifica ganglio centinela por radiactividad con sonda gamma y tinción azul, de aspecto macroscópico normal. Se diseca y extrae el ganglio centinela; se extraen 2 ganglios centinela, con conteo ex vivo de 850 y 210 cuentas en 10 s, y actividad residual en el lecho de menos del 10% del ganglio más activo. Se realiza palpación del lecho. No se envía el ganglio centinela a estudio intraoperatorio. No se realiza linfadenectomía en el mismo acto. Se envían los ganglios a Anatomía Patológica. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Linfadenectomía axilar ─────────────────────────────
  {
    id: 'cg-vax',
    n: 'Linfadenectomía axilar',
    sp: 'Cirugía general',
    sub: 'Mama',
    cat: 'Cirugía endocrina y mamaria',
    syn: ['vaciamiento axilar', 'disección axilar', 'linfadenectomía axilar niveles I y II', 'LA'],
    v: 1,
    rev: '2026-10',
    ref: REF_MAMA,
    ctx: 'Compromiso ganglionar axilar clínico o confirmado, ganglio centinela positivo con indicación de completamiento, persistencia ganglionar tras neoadyuvancia o recurrencia axilar, en cáncer de mama o melanoma. La variante define el lado y los niveles resecados. Se documentan las estructuras neurovasculares identificadas y preservadas',
    lat: true,
    f: [
      { id: 'niv', l: 'Niveles', sec: 'D', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza linfadenectomía axilar de {v}', o: [
        ['Niveles I y II', 'niveles I y II'],
        ['Niveles I a III', 'niveles I a III']
      ] },
      { id: 'mom', l: 'Contexto', sec: 'B', k: 'opt', q: 1, p: 'Linfadenectomía {v}', o: [
        ['Primaria', 'como procedimiento primario por compromiso ganglionar'],
        ['Tras ganglio centinela positivo', 'como completamiento tras ganglio centinela positivo'],
        ['Tras neoadyuvancia', 'tras tratamiento sistémico neoadyuvante'],
        ['Recurrencia axilar', 'por recurrencia axilar']
      ] },
      { id: 'inc', l: 'Incisión', sec: 'B', k: 'opt', o: [
        ['Transversa axilar', 'Se realiza incisión transversa axilar por debajo de la línea de implantación del vello'],
        ['En S', 'Se realiza incisión axilar en S'],
        ['Por la incisión de mastectomía', 'Se accede a la axila a través de la incisión de mastectomía'],
        ['Sobre cicatriz previa', 'Se realiza incisión sobre la cicatriz de la biopsia de ganglio centinela']
      ] },

      { id: 'hax', l: 'Hallazgos axilares', sec: 'C', k: 'multi', q: 1, o: [
        ['Sin adenopatías palpables', 'Sin adenopatías axilares palpables'],
        ['Adenopatías palpables', 'Adenopatías axilares palpables en nivel {d}'],
        ['Conglomerado ganglionar', 'Conglomerado ganglionar axilar'],
        ['Adherencia a la vena axilar', 'Adenopatías adheridas a la vena axilar'],
        ['Fibrosis', 'Fibrosis axilar por cirugía o radioterapia previa']
      ], ph: 'I, II o III' },

      { id: 'pm', l: 'Pectoral menor', sec: 'D', k: 'opt', o: [
        ['Rechazado medialmente', 'Se rechaza el músculo pectoral menor en sentido medial'],
        ['Seccionado', 'Se secciona el músculo pectoral menor'],
        ['No requiere manejo', 'No se moviliza el músculo pectoral menor']
      ] },
      { id: 'rot', l: 'Ganglios interpectorales', sec: 'D', k: 'yn', y: 'Se resecan los ganglios interpectorales de Rotter', n: 'No se resecan los ganglios interpectorales' },
      { id: 'nerv', l: 'Estructuras identificadas', sec: 'D', k: 'multi', q: 1, req: 1, o: AX_NERV },

      { id: 'pmarc', l: 'Marcación de la pieza', sec: 'F', k: 'text', p: 'Se marca la pieza con {v}', ph: 'hilo en el vértice axilar' }
    ],
    pasos: [
      'Se realiza la incisión y se tallan colgajos cutáneos superior e inferior',
      'Se identifican los bordes laterales de los músculos pectoral mayor y menor',
      'Se realiza apertura de la fascia clavipectoral',
      'Se identifica la vena axilar y se diseca el contenido axilar por debajo de ella',
      'Se ligan y seccionan las ramas venosas tributarias inferiores',
      'Se identifica el nervio torácico largo sobre la pared torácica',
      'Se identifica el pedículo toracodorsal',
      { t: 'Se diseca el nivel III por dentro del pectoral menor hasta el vértice axilar', if: ['niv', 'Niveles I a III'] },
      'Se reseca el contenido axilar en bloque de medial a lateral',
      'Se marca el vértice de la pieza',
      'Se realiza lavado de la axila'
    ],
    ej: 'Linfadenectomía como completamiento tras ganglio centinela positivo. Se accede a la axila izquierda por incisión transversa axilar. Adenopatías axilares palpables en nivel I. Se identifican los bordes de los músculos pectorales, se abre la fascia clavipectoral y se identifica la vena axilar, disecando el contenido axilar por debajo de ella. Se identifican el nervio torácico largo y el pedículo toracodorsal, y se reseca el contenido axilar en bloque. Se realiza linfadenectomía axilar de niveles I y II. Se identifica y preserva la vena axilar, el nervio torácico largo, el pedículo toracodorsal y el nervio intercostobraquial. Se marca la pieza con hilo en el vértice axilar y se envía a Anatomía Patológica. Se constata hemostasia. Se coloca drenaje aspirativo en axila exteriorizado por contraabertura. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Catéter venoso central ─────────────────────────────
  {
    id: 'cg-vvc',
    n: 'Colocación de catéter venoso central',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Accesos y procedimientos frecuentes',
    syn: ['vía venosa central', 'VVC', 'CVC', 'catéter de hemodiálisis', 'catéter tunelizado', 'yugular', 'subclavia', 'femoral', 'Seldinger'],
    v: 2,
    rev: '2026-10',
    ref: REF_ACC,
    ctx: 'Necesidad de acceso venoso central para fármacos vasoactivos, nutrición parenteral, monitoreo hemodinámico, hemodiálisis o accesos periféricos insuficientes. La variante define vena, lado y tipo de catéter. Se recomienda guía ecográfica en tiempo real, máximas barreras de esterilidad y antisepsia con clorhexidina alcohólica',
    lat: true,
    f: [
      { id: 'sitio', l: 'Vena', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [
        ['Yugular interna', 'yugular interna'],
        ['Subclavia', 'subclavia'],
        ['Axilar', 'axilar'],
        ['Femoral', 'femoral']
      ] },
      { id: 'cat', l: 'Tipo de catéter', sec: 'E', k: 'opt', vr: 1, q: 1, req: 1, o: [
        ['CVC no tunelizado', 'venoso central no tunelizado'],
        ['CVC tunelizado', 'venoso central tunelizado con manguito'],
        ['Hemodiálisis no tunelizado', 'de hemodiálisis no tunelizado'],
        ['Hemodiálisis tunelizado', 'de hemodiálisis tunelizado con manguito'],
        ['Introductor de alto flujo', 'introductor de alto flujo']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'multi', p: 'Se indica acceso venoso central para {v}', o: [
        ['Vasoactivos', 'infusión de fármacos vasoactivos'],
        ['Nutrición parenteral', 'nutrición parenteral'],
        ['Monitoreo hemodinámico', 'monitoreo hemodinámico'],
        ['Hemodiálisis', 'hemodiálisis o terapia de reemplazo renal'],
        ['Accesos periféricos insuficientes', 'accesos venosos periféricos insuficientes'],
        ['Quimioterapia', 'quimioterapia']
      ] },
      { id: 'barr', l: 'Barreras de esterilidad', sec: 'B', k: 'yn', q: 1, y: 'Se utilizan máximas barreras de esterilidad, con gorro, barbijo, camisolín y guantes estériles y campo estéril amplio', n: 'No se utilizan máximas barreras de esterilidad' },
      { id: 'antis', l: 'Antiséptico', sec: 'B', k: 'opt', o: [
        ['Clorhexidina alcohólica', 'Antisepsia de piel con clorhexidina alcohólica'],
        ['Iodopovidona', 'Antisepsia de piel con iodopovidona']
      ] },
      { id: 'lista', l: 'Lista de verificación', sec: 'B', k: 'yn', y: 'Se completa lista de verificación de inserción', n: 'No se completa lista de verificación de inserción' },
      { id: 'eco', l: 'Guía ecográfica', sec: 'B', k: 'opt', q: 1, o: [
        ['Tiempo real, eje corto', 'bajo guía ecográfica en tiempo real en eje corto'],
        ['Tiempo real, eje largo', 'bajo guía ecográfica en tiempo real en eje largo'],
        ['Tiempo real, eje oblicuo', 'bajo guía ecográfica en tiempo real en eje oblicuo'],
        ['Marcación previa', 'con marcación ecográfica previa'],
        ['Reparos anatómicos', 'por reparos anatómicos']
      ] },

      { id: 'hven', l: 'Evaluación ecográfica de la vena', sec: 'C', k: 'opt', o: [
        ['Permeable y compresible', 'Vena permeable y compresible a la evaluación ecográfica'],
        ['Trombosis', 'Imagen compatible con trombosis venosa a la evaluación ecográfica'],
        ['Calibre reducido', 'Vena de calibre reducido a la evaluación ecográfica']
      ] },

      { id: 'int', l: 'Número de intentos', sec: 'D', k: 'opt', o: [
        ['1', 'Acceso venoso al primer intento de punción'],
        ['2', 'Acceso venoso al segundo intento de punción'],
        ['3', 'Acceso venoso al tercer intento de punción'],
        ['Más de 3', 'Acceso venoso luego de más de tres intentos de punción'],
        ['Cambio de sitio', 'Se cambia de sitio de punción por imposibilidad de acceso {d}']
      ], ph: 'sitio inicial' },
      { id: 'punart', l: 'Punción arterial', sec: 'D', k: 'yn', y: 'Se produce punción arterial inadvertida, con compresión del sitio', n: 'No se produce punción arterial' },
      { id: 'tunel', l: 'Túnel subcutáneo', sec: 'D', k: 'text', if: ['cat', ['CVC tunelizado', 'Hemodiálisis tunelizado']], p: 'Se realiza túnel subcutáneo con orificio de salida en {v}', ph: 'región infraclavicular, manguito a 2 cm del orificio' },

      { id: 'lum', l: 'Número de lúmenes', sec: 'E', k: 'opt', o: [
        ['1', 'monolumen'],
        ['2', 'bilumen'],
        ['3', 'trilumen'],
        ['4', 'tetralumen'],
        ['5', 'pentalumen']
      ] },
      { id: 'calib', l: 'Calibre y longitud', sec: 'E', k: 'text', p: 'Catéter de {v}', ph: '7 Fr, 20 cm' },
      { id: 'lock', l: 'Sellado de lúmenes', sec: 'E', k: 'opt', o: [
        ['Solución fisiológica', 'Se sellan los lúmenes con solución fisiológica'],
        ['Heparina', 'Se sellan los lúmenes con solución heparinizada {d}'],
        ['Citrato', 'Se sellan los lúmenes con citrato {d}']
      ], ph: 'concentración y volumen por lumen' },

      { id: 'guia', l: 'Retiro de la guía', sec: 'G', k: 'yn', q: 1, y: 'Se constata el retiro de la guía metálica íntegra', n: 'No se constata el retiro de la guía metálica íntegra' },
      { id: 'conf', l: 'Confirmación de posición', sec: 'G', k: 'multi', req: 1, o: [
        ['Reflujo por todos los lúmenes', 'Se constata reflujo venoso por todos los lúmenes'],
        ['Guía en la vena por ecografía', 'Se visualiza la guía dentro de la vena por ecografía'],
        ['ECG intracavitario', 'Se confirma la posición del extremo por electrocardiograma intracavitario'],
        ['Ecografía con burbujas', 'Se confirma la posición por ecografía con prueba de burbujas'],
        ['Radioscopía', 'Se confirma la posición del extremo por radioscopía'],
        ['Rx con punta en unión cavoatrial', 'Radiografía de tórax con extremo del catéter en la unión cavoatrial'],
        ['Rx sin neumotórax', 'Radiografía de tórax sin evidencia de neumotórax'],
        ['Rx pendiente', 'Se solicita radiografía de tórax de control']
      ] },
      { id: 'fijc', l: 'Fijación del catéter', sec: 'G', k: 'opt', o: [
        ['Puntos a piel', 'Se fija el catéter a la piel con puntos de sutura'],
        ['Dispositivo sin sutura', 'Se fija el catéter con dispositivo de fijación sin sutura'],
        ['Puntos y dispositivo', 'Se fija el catéter con puntos de sutura y dispositivo de fijación']
      ] },
      { id: 'marca', l: 'Marca en piel', sec: 'G', k: 'num', u: 'cm', p: 'Catéter fijado a {v} cm en piel' },
      { id: 'apos', l: 'Apósito', sec: 'G', k: 'opt', o: [
        ['Transparente semipermeable', 'Se coloca apósito transparente semipermeable estéril'],
        ['Con clorhexidina', 'Se coloca apósito estéril impregnado con clorhexidina'],
        ['Gasa estéril', 'Se coloca apósito de gasa estéril']
      ] }
    ],
    pasos: [
      'Se realiza evaluación ecográfica de la vena y de las estructuras vecinas',
      { t: 'Se coloca al paciente en Trendelenburg', ifn: ['sitio', 'Femoral'] },
      'Se realiza infiltración con anestésico local',
      'Se realiza punción de la vena {sitio} {eco}',
      'Se pasa la guía metálica a través de la aguja según técnica de Seldinger',
      'Se confirma por ecografía la posición intravenosa de la guía',
      'Se retira la aguja y se realiza dilatación del trayecto',
      { t: 'Se realiza tunelización subcutánea del catéter desde el orificio de salida hasta el sitio de punción', if: ['cat', ['CVC tunelizado', 'Hemodiálisis tunelizado']] },
      { t: 'Se avanza el catéter a través de un introductor pelable', if: ['cat', ['CVC tunelizado', 'Hemodiálisis tunelizado']] },
      { t: 'Se avanza el catéter {cat} {lum} sobre la guía', ifn: ['cat', ['CVC tunelizado', 'Hemodiálisis tunelizado']] },
      'Se retira la guía metálica',
      'Se aspira y lava cada lumen con solución fisiológica'
    ],
    ej: 'Se indica acceso venoso central para infusión de fármacos vasoactivos. Se utilizan máximas barreras de esterilidad y antisepsia de piel con clorhexidina alcohólica. Se realiza evaluación ecográfica de la vena yugular interna derecha, permeable y compresible, y se coloca al paciente en Trendelenburg. Se realiza infiltración con anestésico local y punción de la vena yugular interna bajo guía ecográfica en tiempo real en eje corto, con acceso venoso al primer intento de punción. Se pasa la guía metálica según técnica de Seldinger, se confirma por ecografía su posición intravenosa, se dilata el trayecto y se avanza el catéter venoso central no tunelizado trilumen de 7 Fr, 20 cm, sobre la guía. Se constata el retiro de la guía metálica íntegra y reflujo venoso por todos los lúmenes, que se lavan con solución fisiológica. Se fija el catéter a la piel con puntos de sutura, a 15 cm en piel, y se coloca apósito transparente semipermeable estéril. Se solicita radiografía de tórax de control. Sin complicaciones durante el procedimiento.'
  },

  // ───────────────────────────── Reservorio venoso implantable ─────────────────────────────
  {
    id: 'cg-port',
    n: 'Colocación de reservorio venoso implantable',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Accesos y procedimientos frecuentes',
    syn: ['port', 'portacath', 'puerto implantable', 'catéter con reservorio subcutáneo', 'acceso venoso para quimioterapia'],
    v: 1,
    rev: '2026-10',
    ref: 'Sousa B, Furlanetto J, Hutka M, et al. Central venous access in oncology: ESMO Clinical Practice Guidelines. Ann Oncol 2015;26(Suppl 5):v152-v168; ' + REF_ACC,
    ctx: 'Acceso venoso central de largo plazo para quimioterapia, nutrición parenteral o tratamientos endovenosos intermitentes. La variante define la vena de acceso (punción ecoguiada o disección de la vena cefálica) y el lado. Se documenta la posición del extremo del catéter',
    lat: true,
    f: [
      { id: 'vena', l: 'Vena de acceso', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Acceso por {v}', o: [
        ['Yugular interna', 'vena yugular interna por punción percutánea'],
        ['Subclavia', 'vena subclavia por punción percutánea'],
        ['Axilar', 'vena axilar por punción percutánea'],
        ['Cefálica por disección', 'vena cefálica por disección en el surco deltopectoral'],
        ['Otra', 'vena {d}']
      ], ph: 'vena' },
      { id: 'eco', l: 'Guía ecográfica', sec: 'B', k: 'opt', ifn: ['vena', 'Cefálica por disección'], o: [
        ['Tiempo real', 'Punción bajo guía ecográfica en tiempo real'],
        ['Marcación previa', 'Punción con marcación ecográfica previa'],
        ['Reparos anatómicos', 'Punción por reparos anatómicos']
      ] },
      { id: 'rx', l: 'Radioscopía', sec: 'B', k: 'yn', q: 1, y: 'Se utiliza radioscopía intraoperatoria', n: 'No se utiliza radioscopía intraoperatoria' },

      { id: 'boll', l: 'Ubicación del bolsillo', sec: 'D', k: 'opt', o: [
        ['Infraclavicular', 'Se confecciona bolsillo subcutáneo infraclavicular sobre la fascia del pectoral mayor'],
        ['Otra', 'Se confecciona bolsillo subcutáneo en {d}']
      ], ph: 'ubicación' },
      { id: 'fijr', l: 'Fijación del reservorio', sec: 'D', k: 'yn', y: 'Se fija el reservorio a la fascia con puntos no reabsorbibles', n: 'No se fija el reservorio a la fascia' },
      { id: 'long', l: 'Longitud del catéter', sec: 'E', k: 'num', u: 'cm', p: 'Catéter recortado a {v} cm' },
      { id: 'calib', l: 'Calibre', sec: 'E', k: 'text', p: 'Catéter de {v}', ph: '8 Fr, silicona' },
      { id: 'res', l: 'Tipo de reservorio', sec: 'E', k: 'opt', o: [
        ['Cámara única', 'Reservorio de cámara única'],
        ['Doble cámara', 'Reservorio de doble cámara'],
        ['Apto para alta presión', 'Reservorio de cámara única apto para inyección a alta presión']
      ] },

      { id: 'conf', l: 'Confirmación de funcionamiento y posición', sec: 'G', k: 'multi', q: 1, req: 1, o: [
        ['Punta en unión cavoatrial por radioscopía', 'Se confirma por radioscopía el extremo del catéter en la unión cavoatrial'],
        ['Reflujo por el reservorio', 'Se constata reflujo venoso por el reservorio con aguja no perforante'],
        ['Infusión sin resistencia', 'Se constata infusión sin resistencia por el reservorio'],
        ['ECG intracavitario', 'Se confirma la posición del extremo por electrocardiograma intracavitario'],
        ['Rx pendiente', 'Se solicita radiografía de tórax de control']
      ] },
      { id: 'lock', l: 'Sellado', sec: 'G', k: 'opt', o: [
        ['Solución fisiológica', 'Se sella el sistema con solución fisiológica'],
        ['Heparina', 'Se sella el sistema con solución heparinizada {d}']
      ], ph: 'concentración y volumen' },
      { id: 'aguja', l: 'Aguja colocada', sec: 'G', k: 'yn', y: 'Se deja aguja no perforante colocada para uso inmediato', n: 'No se deja aguja colocada' }
    ],
    pasos: [
      'Se realiza evaluación ecográfica de la vena',
      'Se realiza infiltración con anestésico local',
      { t: 'Se realiza punción ecoguiada de la vena y se pasa la guía metálica', ifn: ['vena', 'Cefálica por disección'] },
      { t: 'Se controla por radioscopía la posición de la guía', if: ['rx', 'si'] },
      { t: 'Se realiza incisión en el surco deltopectoral, disección de la vena cefálica y venotomía', if: ['vena', 'Cefálica por disección'] },
      'Se realiza incisión y se confecciona el bolsillo subcutáneo',
      'Se tuneliza el catéter desde el bolsillo hasta el sitio de acceso venoso',
      { t: 'Se avanza el catéter a través de un introductor pelable', ifn: ['vena', 'Cefálica por disección'] },
      { t: 'Se avanza el catéter a través de la venotomía y se liga la vena cefálica sobre el catéter', if: ['vena', 'Cefálica por disección'] },
      'Se ajusta la longitud del catéter según la posición del extremo',
      'Se conecta el catéter al reservorio y se asegura con el sistema de traba',
      'Se aloja el reservorio en el bolsillo',
      'Se punza el reservorio con aguja no perforante y se lava el sistema',
      'Se cierra el bolsillo por planos'
    ],
    ej: 'Acceso por vena yugular interna derecha por punción percutánea, bajo guía ecográfica en tiempo real, con radioscopía intraoperatoria. Se realiza infiltración con anestésico local, punción ecoguiada de la vena y pasaje de la guía metálica, con control radioscópico de su posición. Se confecciona bolsillo subcutáneo infraclavicular sobre la fascia del pectoral mayor y se tuneliza el catéter hasta el sitio de acceso. Se avanza el catéter a través de un introductor pelable, se ajusta su longitud a 18 cm y se conecta al reservorio de cámara única con el sistema de traba. Se fija el reservorio a la fascia con puntos no reabsorbibles. Se confirma por radioscopía el extremo del catéter en la unión cavoatrial y se constata reflujo venoso por el reservorio con aguja no perforante. Se sella el sistema con solución fisiológica. Se cierra el bolsillo por planos. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Traqueostomía ─────────────────────────────
  {
    id: 'cg-traq',
    n: 'Traqueostomía',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Accesos y procedimientos frecuentes',
    syn: ['traqueotomía', 'TQT', 'traqueostomía percutánea', 'traqueostomía abierta', 'traqueostomía por dilatación'],
    v: 2,
    rev: '2026-10',
    ref: 'Trouillet JL, et al. Tracheotomy in the intensive care unit: guidelines from a French expert panel. Ann Intensive Care 2018;8:37; McGrath BA, et al. Multidisciplinary guidelines for the management of tracheostomy and laryngectomy airway emergencies. Anaesthesia 2012;67(9):1025-1041; Mitchell RB, et al. Clinical Consensus Statement: Tracheostomy Care. Otolaryngol Head Neck Surg 2013;148(1):6-20; Royal College of Surgeons of England. Good Surgical Practice, 2014',
    ctx: 'Ventilación mecánica prolongada, destete dificultoso, obstrucción de la vía aérea superior o manejo de secreciones. La variante define la técnica, abierta o percutánea por dilatación, idealmente con control broncoscópico y ecografía cervical previa',
    lat: false,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, o: [
        ['Abierta', 'Se realiza traqueostomía abierta'],
        ['Percutánea por dilatación progresiva', 'Se realiza traqueostomía percutánea con dilatadores progresivos'],
        ['Percutánea con dilatador único', 'Se realiza traqueostomía percutánea con dilatador único cónico'],
        ['Percutánea con pinza dilatadora', 'Se realiza traqueostomía percutánea con pinza dilatadora sobre guía']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', q: 1, p: 'Se indica traqueostomía por {v}', o: [
        ['ARM prolongada', 'requerimiento de ventilación mecánica prolongada'],
        ['Destete dificultoso', 'destete dificultoso de la ventilación mecánica'],
        ['Obstrucción de vía aérea superior', 'obstrucción de la vía aérea superior'],
        ['Manejo de secreciones', 'manejo de secreciones'],
        ['Protección de la vía aérea', 'protección de la vía aérea'],
        ['Cirugía de cabeza y cuello', 'cirugía de cabeza y cuello']
      ] },
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: POS_CUELLO },
      { id: 'fbc', l: 'Control broncoscópico', sec: 'B', k: 'yn', q: 1, y: 'Se realiza control broncoscópico durante el procedimiento', n: 'No se realiza control broncoscópico' },
      { id: 'ecoc', l: 'Ecografía cervical previa', sec: 'B', k: 'yn', y: 'Se realiza ecografía cervical previa para identificar estructuras vasculares y anillos traqueales', n: 'No se realiza ecografía cervical previa' },
      { id: 'fio2', l: 'Preoxigenación', sec: 'B', k: 'yn', y: 'Se ventila con fracción inspirada de oxígeno del 100% durante el procedimiento', n: 'No se modifica la fracción inspirada de oxígeno' },

      { id: 'anat', l: 'Hallazgos cervicales', sec: 'C', k: 'multi', o: [
        ['Sin particularidades', 'Anatomía cervical sin particularidades'],
        ['Cuello corto', 'Cuello corto y ancho'],
        ['Istmo voluminoso', 'Istmo tiroideo voluminoso'],
        ['Venas yugulares anteriores prominentes', 'Venas yugulares anteriores prominentes'],
        ['Vaso pretraqueal', 'Vaso pretraqueal en el trayecto de punción {d}'],
        ['Desviación traqueal', 'Desviación traqueal {d}'],
        ['Tráquea profunda', 'Tráquea de ubicación profunda']
      ], ph: 'sentido o localización' },
      { id: 'nivel', l: 'Nivel anatómico', sec: 'C', k: 'opt', p: 'Se accede a la tráquea entre {v}', o: [
        ['1.º y 2.º anillo', 'el primer y el segundo anillo traqueal'],
        ['2.º y 3.º anillo', 'el segundo y el tercer anillo traqueal'],
        ['3.º y 4.º anillo', 'el tercer y el cuarto anillo traqueal']
      ] },

      { id: 'istmo', l: 'Manejo del istmo tiroideo', sec: 'D', k: 'opt', o: [
        ['Rechazo cefálico', 'Se rechaza el istmo tiroideo en sentido cefálico'],
        ['Rechazo caudal', 'Se rechaza el istmo tiroideo en sentido caudal'],
        ['Sección y ligadura', 'Se secciona y liga el istmo tiroideo'],
        ['No expuesto', 'No se expone el istmo tiroideo']
      ] },
      { id: 'vent', l: 'Apertura traqueal', sec: 'D', k: 'opt', if: ['tec', 'Abierta'], o: [
        ['Incisión horizontal', 'Se realiza apertura traqueal horizontal entre anillos'],
        ['Incisión en H', 'Se realiza apertura traqueal en H'],
        ['Incisión vertical', 'Se realiza apertura traqueal vertical'],
        ['Colgajo de Björk', 'Se confecciona colgajo traqueal de base inferior (colgajo de Björk)'],
        ['Ventana traqueal', 'Se reseca ventana traqueal anterior']
      ] },
      { id: 'pmuc', l: 'Fijación del estoma (técnica abierta)', sec: 'D', k: 'yn', if: ['tec', 'Abierta'], y: 'Se realiza maduración del estoma con puntos de la tráquea a la piel', n: 'No se realiza maduración del estoma' },

      { id: 'can', l: 'Tipo de cánula', sec: 'E', k: 'opt', q: 1, req: 1, o: [
        ['Con balón', 'Se coloca cánula de traqueostomía con balón'],
        ['Con balón y aspiración subglótica', 'Se coloca cánula de traqueostomía con balón y aspiración subglótica'],
        ['Fenestrada con balón', 'Se coloca cánula de traqueostomía fenestrada con balón'],
        ['Sin balón', 'Se coloca cánula de traqueostomía sin balón'],
        ['Longitud ajustable', 'Se coloca cánula de traqueostomía con balón y longitud ajustable']
      ] },
      { id: 'tam', l: 'Diámetro interno de la cánula', sec: 'E', k: 'num', q: 1, u: 'mm', p: 'Cánula de {v} mm de diámetro interno' },

      { id: 'conf', l: 'Confirmación de posición', sec: 'G', k: 'multi', req: 1, o: [
        ['Capnografía', 'Se confirma la posición mediante capnografía con curva de CO₂ espirado'],
        ['Broncoscopia', 'Se confirma la posición intratraqueal por broncoscopia'],
        ['Auscultación bilateral', 'Murmullo vesicular bilateral a la auscultación'],
        ['Expansión simétrica', 'Expansión torácica simétrica'],
        ['Saturación conservada', 'Saturación de oxígeno conservada tras la conexión']
      ] },
      { id: 'venti', l: 'Ventilación', sec: 'G', k: 'opt', o: [
        ['Conectado a ARM', 'Se conecta la cánula al circuito de ventilación mecánica'],
        ['Ventilación espontánea', 'Se deja con ventilación espontánea y aporte de oxígeno humidificado']
      ] },
      { id: 'fij', l: 'Fijación', sec: 'G', k: 'multi', o: [
        ['Puntos a piel', 'Se fija la pestaña de la cánula a la piel con puntos'],
        ['Cinta cervical', 'Se fija la cánula con cinta alrededor del cuello'],
        ['Puntos de reparo traqueales', 'Se dejan puntos de reparo traqueales exteriorizados y rotulados']
      ] }
    ],
    pasos: [
      'Se realiza infiltración con anestésico local y vasoconstrictor',
      'Se realiza incisión cervical transversa entre el cartílago cricoides y la horquilla esternal',
      { t: 'Se separan los músculos pretiroideos en la línea media', if: ['tec', 'Abierta'] },
      { t: 'Se expone la cara anterior de la tráquea y se identifican los anillos traqueales', if: ['tec', 'Abierta'] },
      { t: 'Se realiza disección roma hasta palpar los anillos traqueales', ifn: ['tec', 'Abierta'] },
      'Se retira parcialmente el tubo endotraqueal hasta ubicar su extremo por encima del sitio de apertura',
      { t: 'Se colocan puntos de reparo traqueales laterales', if: ['tec', 'Abierta'] },
      { t: 'Se realiza punción traqueal con aguja en la línea media bajo visión broncoscópica y se pasa la guía metálica', ifn: ['tec', 'Abierta'] },
      { t: 'Se realiza dilatación del trayecto sobre la guía', ifn: ['tec', 'Abierta'] },
      'Se inserta la cánula y se insufla el balón',
      'Se aspiran secreciones a través de la cánula',
      'Se retira el tubo endotraqueal'
    ],
    ej: 'Se indica traqueostomía por requerimiento de ventilación mecánica prolongada. Se realiza traqueostomía percutánea con dilatador único cónico, con control broncoscópico durante el procedimiento y ecografía cervical previa. Se realiza infiltración con anestésico local e incisión cervical transversa, disección roma hasta palpar los anillos traqueales y se retira parcialmente el tubo endotraqueal. Se realiza punción traqueal entre el segundo y el tercer anillo traqueal bajo visión broncoscópica, se pasa la guía metálica y se dilata el trayecto. Se coloca cánula de traqueostomía con balón de 8 mm de diámetro interno, y se confirma la posición intratraqueal por broncoscopia y mediante capnografía. Se conecta la cánula al circuito de ventilación mecánica y se fija con puntos a la piel y cinta alrededor del cuello. Se constata hemostasia. Recuento de gasas e instrumental completo. Sin complicaciones durante el procedimiento.'
  },

  // ───────────────────────────── Biopsia de ganglio o tejido superficial ─────────────────────────────
  {
    id: 'cg-bxg',
    n: 'Biopsia de ganglio o tejido superficial',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Accesos y procedimientos frecuentes',
    syn: ['biopsia ganglionar', 'biopsia escisional de ganglio', 'adenopatía', 'exéresis de lesión subcutánea', 'biopsia de piel', 'linfoma'],
    v: 1,
    rev: '2026-10',
    ref: 'Townsend CM, et al. Sabiston Textbook of Surgery, 21.ª ed. Elsevier, 2021; NCCN Clinical Practice Guidelines in Oncology: B-Cell Lymphomas (versión vigente; preferencia de biopsia escisional o incisional y envío en fresco); Royal College of Surgeons of England. Good Surgical Practice, 2014',
    ctx: 'Adenopatía o lesión superficial que requiere diagnóstico histológico, cuando la punción no es diagnóstica o se sospecha linfoma. La variante define biopsia escisional o incisional y la región. Se documenta el manejo de la muestra (formol, en fresco, cultivos)',
    lat: true,
    f: [
      { id: 'tipo', l: 'Tipo de biopsia', sec: 'D', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se realiza {v}', o: [
        ['Escisional', 'biopsia escisional'],
        ['Incisional', 'biopsia incisional']
      ] },
      { id: 'reg', l: 'Región', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Lesión en región {v}', o: [
        ['Cervical', 'cervical'],
        ['Supraclavicular', 'supraclavicular'],
        ['Axilar', 'axilar'],
        ['Inguinal', 'inguinal'],
        ['Piel o tejido subcutáneo', 'de piel y tejido celular subcutáneo de {d}'],
        ['Otra', '{d}']
      ], ph: 'sitio' },
      { id: 'loc', l: 'Localización precisa', sec: 'B', k: 'text', p: 'Lesión localizada en {v}', ph: 'nivel V cervical posterior' },
      { id: 'guia', l: 'Localización intraoperatoria', sec: 'B', k: 'opt', o: [
        ['Palpación', 'Se localiza la lesión por palpación'],
        ['Marcación ecográfica previa', 'Se localiza la lesión con marcación ecográfica previa'],
        ['Ecografía intraoperatoria', 'Se localiza la lesión con ecografía intraoperatoria'],
        ['Arpón', 'Se localiza la lesión con arpón colocado previamente']
      ] },

      { id: 'hles', l: 'Características de la lesión', sec: 'C', k: 'multi', q: 1, o: [
        ['Ganglio aumentado de tamaño', 'Ganglio aumentado de tamaño'],
        ['Consistencia elástica', 'Lesión de consistencia elástica'],
        ['Consistencia firme', 'Lesión de consistencia firme'],
        ['Consistencia pétrea', 'Lesión de consistencia pétrea'],
        ['Conglomerado', 'Conglomerado ganglionar'],
        ['Móvil', 'Lesión móvil respecto de planos profundos'],
        ['Adherida a planos profundos', 'Lesión adherida a planos profundos'],
        ['Material caseoso o purulento', 'Salida de material de aspecto caseoso o purulento'],
        ['Lesión encapsulada', 'Lesión encapsulada']
      ] },
      { id: 'tam', l: 'Tamaño', sec: 'C', k: 'text', p: 'Lesión de {v}', ph: '2 x 1,5 cm' },

      { id: 'nerv', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', o: [
        ['Nervio espinal accesorio', 'Se identifica y preserva el nervio espinal accesorio'],
        ['Nervio auricular mayor', 'Se identifica y preserva el nervio auricular mayor'],
        ['Vena yugular externa', 'Se identifica y preserva la vena yugular externa'],
        ['Vena yugular interna', 'Se identifica y preserva la vena yugular interna'],
        ['Conducto torácico', 'Se identifica y preserva el conducto torácico'],
        ['Vasos femorales', 'Se identifican y preservan los vasos femorales'],
        ['Otra estructura', 'Se identifica y preserva {d}']
      ], ph: 'estructura' },
      { id: 'nles', l: 'Número de ganglios o fragmentos', sec: 'D', k: 'num', p: 'Se extraen {v} ganglios o fragmentos' },

      { id: 'mues', l: 'Procesamiento de la muestra', sec: 'F', k: 'multi', q: 1, o: [
        ['Formol', 'Se envía material en formol a Anatomía Patológica'],
        ['En fresco para hematopatología', 'Se envía material en fresco a Anatomía Patológica para estudio hematopatológico'],
        ['Citometría de flujo', 'Se envía material en fresco para citometría de flujo'],
        ['Cultivo bacteriológico', 'Se envía material para cultivo bacteriológico'],
        ['Cultivo de micobacterias', 'Se envía material para cultivo de micobacterias'],
        ['Cultivo micológico', 'Se envía material para cultivo micológico'],
        ['Impronta citológica', 'Se realiza impronta citológica del material'],
        ['Congelación', 'Se envía material para estudio intraoperatorio por congelación']
      ] },
      { id: 'congr', l: 'Informe intraoperatorio', sec: 'F', k: 'text', if: ['mues', 'Congelación'], p: 'El estudio intraoperatorio informa {v}', ph: 'transcribir lo informado por patología' }
    ],
    pasos: [
      'Se marca la lesión y la incisión siguiendo las líneas de tensión de la piel',
      'Se realiza infiltración con anestésico local',
      'Se realiza incisión cutánea y disección por planos hasta la lesión',
      'Se identifican y preservan las estructuras neurovasculares vecinas',
      { t: 'Se realiza disección pericapsular de la lesión sin pinzar su cápsula', if: ['tipo', 'Escisional'] },
      { t: 'Se liga el hilio vascular y se extrae la lesión completa', if: ['tipo', 'Escisional'] },
      { t: 'Se realiza resección en cuña de la lesión', if: ['tipo', 'Incisional'] },
      'Se divide la muestra según los estudios solicitados',
      'Se realiza cierre por planos'
    ],
    ej: 'Lesión en región supraclavicular izquierda. Se localiza la lesión por palpación. Se marca la incisión siguiendo las líneas de tensión de la piel, se realiza infiltración con anestésico local, incisión cutánea y disección por planos hasta la lesión. Ganglio aumentado de tamaño, de consistencia elástica, móvil respecto de planos profundos, de 2 x 1,5 cm. Se realiza disección pericapsular sin pinzar la cápsula, se liga el hilio vascular y se extrae la lesión completa. Se realiza biopsia escisional. Se identifica y preserva el conducto torácico. Se divide la muestra: se envía material en formol a Anatomía Patológica y en fresco para citometría de flujo. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Retiro de material quirúrgico o cuerpo extraño superficial ─────────────────────────────
  {
    id: 'cg-cext',
    n: 'Retiro de material quirúrgico o cuerpo extraño superficial',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Accesos y procedimientos frecuentes',
    syn: ['extracción de cuerpo extraño', 'retiro de reservorio', 'retiro de port', 'retiro de catéter tunelizado', 'granuloma de sutura', 'retiro de malla'],
    v: 1,
    rev: '2026-10',
    ref: "Townsend CM, et al. Sabiston Textbook of Surgery, 21.ª ed. Elsevier, 2021; Mermel LA, et al. Clinical Practice Guidelines for the Diagnosis and Management of Intravascular Catheter-Related Infection: 2009 Update by the Infectious Diseases Society of America. Clin Infect Dis 2009;49(1):1-45; Royal College of Surgeons of England. Good Surgical Practice, 2014",
    ctx: 'Extracción de material quirúrgico superficial (reservorio venoso, catéter tunelizado, sutura, malla superficial) o de cuerpo extraño de partes blandas, por infección, disfunción, fin de tratamiento, granuloma o síntomas. La variante define el material. Se documenta si se extrae íntegro y si quedan fragmentos',
    lat: true,
    f: [
      { id: 'obj', l: 'Material o cuerpo extraño', sec: 'B', k: 'opt', vr: 1, q: 1, req: 1, p: 'Se interviene para retiro de {v}', o: [
        ['Reservorio venoso implantable', 'reservorio venoso implantable'],
        ['Catéter tunelizado', 'catéter venoso tunelizado con manguito'],
        ['Material de sutura', 'material de sutura'],
        ['Malla superficial', 'malla protésica superficial'],
        ['Cuerpo extraño', 'cuerpo extraño de partes blandas {d}'],
        ['Otro material', '{d}']
      ], ph: 'tipo de material' },
      { id: 'motivo', l: 'Motivo', sec: 'B', k: 'opt', q: 1, p: 'Motivo del retiro {v}', o: [
        ['Fin de tratamiento', 'por fin de tratamiento'],
        ['Infección', 'por infección del sitio o del material'],
        ['Disfunción', 'por disfunción del dispositivo'],
        ['Exposición o extrusión', 'por exposición o extrusión del material'],
        ['Granuloma o fístula', 'por granuloma o trayecto fistuloso'],
        ['Dolor o molestias', 'por dolor o molestias locales']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'text', p: 'Material localizado en {v}', ph: 'región infraclavicular derecha' },
      { id: 'guia', l: 'Método de localización', sec: 'B', k: 'opt', o: [
        ['Palpación', 'Se localiza el material por palpación'],
        ['Ecografía', 'Se localiza el material con ecografía'],
        ['Radioscopía', 'Se localiza el material con radioscopía'],
        ['Sobre la cicatriz previa', 'Se accede sobre la cicatriz previa']
      ] },

      { id: 'hext', l: 'Hallazgos', sec: 'C', k: 'multi', q: 1, o: [
        ['Sin signos inflamatorios', 'Sin signos inflamatorios en el lecho'],
        ['Cápsula fibrosa', 'Material rodeado por cápsula fibrosa'],
        ['Tejido de granulación', 'Tejido de granulación en el lecho'],
        ['Secreción purulenta', 'Secreción purulenta en el lecho'],
        ['Trayecto fistuloso', 'Trayecto fistuloso hacia la piel'],
        ['Material expuesto', 'Material expuesto a través de la piel'],
        ['Material fragmentado', 'Material fragmentado en el lecho']
      ] },

      { id: 'integ', l: 'Extracción', sec: 'D', k: 'opt', q: 1, req: 1, o: [
        ['Íntegro', 'Se extrae el material íntegro'],
        ['Completo en fragmentos', 'Se extrae el material en fragmentos, en forma completa'],
        ['Fragmento residual', 'Se deja fragmento residual {d}']
      ], ph: 'localización y motivo' },
      { id: 'catl', l: 'Longitud del catéter retirado', sec: 'D', k: 'num', u: 'cm', if: ['obj', ['Reservorio venoso implantable', 'Catéter tunelizado']], p: 'Se retira catéter de {v} cm de longitud' },
      { id: 'capsu', l: 'Capsulectomía', sec: 'D', k: 'yn', y: 'Se realiza resección de la cápsula fibrosa', n: 'No se reseca la cápsula fibrosa' },
      { id: 'rxc', l: 'Control radioscópico', sec: 'D', k: 'yn', y: 'Se realiza control radioscópico tras la extracción', n: 'No se realiza control radioscópico' },

      { id: 'cult', l: 'Cultivos', sec: 'F', k: 'multi', o: [
        ['Material extraído', 'Se envía el material extraído para cultivo'],
        ['Punta del catéter', 'Se envía la punta del catéter para cultivo'],
        ['Tejido del lecho', 'Se envía tejido del lecho para cultivo'],
        ['Secreción', 'Se envía muestra de la secreción para cultivo']
      ] }
    ],
    pasos: [
      'Se realiza infiltración con anestésico local',
      'Se realiza incisión sobre el material o la cicatriz previa',
      'Se diseca por planos hasta la cápsula del material',
      'Se abre la cápsula y se libera el material de sus adherencias',
      { t: 'Se seccionan los puntos de fijación del reservorio a la fascia', if: ['obj', 'Reservorio venoso implantable'] },
      { t: 'Se diseca el manguito del catéter en el túnel subcutáneo', if: ['obj', ['Reservorio venoso implantable', 'Catéter tunelizado']] },
      { t: 'Se retira el catéter con tracción suave y compresión del sitio de entrada venosa', if: ['obj', ['Reservorio venoso implantable', 'Catéter tunelizado']] },
      'Se extrae el material y se revisa su integridad',
      'Se realiza curetaje y lavado del lecho',
      'Se realiza cierre por planos'
    ],
    ej: 'Se interviene para retiro de reservorio venoso implantable por fin de tratamiento, localizado en región infraclavicular derecha. Se accede sobre la cicatriz previa. Se realiza infiltración con anestésico local e incisión sobre la cicatriz, se diseca hasta la cápsula y se libera el reservorio. Material rodeado por cápsula fibrosa, sin signos inflamatorios en el lecho. Se seccionan los puntos de fijación del reservorio y se retira el catéter con tracción suave y compresión del sitio de entrada venosa. Se extrae el material íntegro, con catéter de 18 cm de longitud. Se realiza lavado del lecho y cierre por planos. Se constata hemostasia. No se coloca drenaje. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias.'
  }
];
