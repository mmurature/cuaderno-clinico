// Partes quirúrgicos · Cirugía general · Cirugía abdominal y digestiva. Datos puros (ver docs/ESQUEMA_PLANTILLAS.md, sección 2 y 2.4).
// Convenciones:
// - En `if` sobre un campo opt, el valor es la etiqueta de la opción (o[0]); con array, cualquiera de los valores. En yn, 'si' / 'no'.
// - `via` es el campo de variante de abordaje. Las plantillas con abordaje laparoscópico reemplazan los comunes `conv`/`convm`
//   para que la conversión salga de la variante y no se contradiga con ella.
// - Los campos citados en un paso con {id} tienen frases-fragmento pensadas para leerse dentro del paso.

// ───────────── Fuentes ─────────────
const R_RCS = 'Royal College of Surgeons of England. Good Surgical Practice. Londres, RCS England, 2014 (contenido mínimo del parte operatorio)';
const R_APP = 'Di Saverio S, et al. Diagnosis and treatment of acute appendicitis: 2020 update of the WSES Jerusalem guidelines. World J Emerg Surg. 2020;15:27';
const R_TG18 = 'Wakabayashi G, et al. Tokyo Guidelines 2018: surgical management of acute cholecystitis: safe steps in laparoscopic cholecystectomy for acute cholecystitis. J Hepatobiliary Pancreat Sci. 2018;25(1):73-86';
const R_SAFE = 'Brunt LM, et al. Safe Cholecystectomy Multi-society Practice Guideline and State-of-the-Art Consensus Conference on Prevention of Bile Duct Injury During Cholecystectomy (SAGES y sociedades asociadas). Surg Endosc. 2020;34:2827-2855';
const R_EAES = 'Boni L, et al. EAES rapid guideline: management of common bile duct stones. Surg Endosc. 2022;36:7863-7876';
const R_LCBDE = 'Tsuda S. Laparoscopic common bile duct exploration. SAGES Wiki, sección hepatobiliar';
const R_ASBO = 'ten Broek RPG, et al. Bologna guidelines for diagnosis and management of adhesive small bowel obstruction (ASBO): 2017 update of the evidence-based guidelines from the WSES ASBO working group. World J Emerg Surg. 2018;13:24';
const R_PPU = 'Tarasconi A, et al. Perforated and bleeding peptic ulcer: WSES guidelines. World J Emerg Surg. 2020;15:3';
const R_AMI = 'Bala M, et al. Acute mesenteric ischemia: updated guidelines of the World Society of Emergency Surgery. World J Emerg Surg. 2022;17:54';
const R_IAI = 'Sartelli M, et al. The management of intra-abdominal infections from a global perspective: 2017 WSES guidelines for management of intra-abdominal infections. World J Emerg Surg. 2017;12:29';
const R_OST = 'Davis BR, et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for Ostomy Surgery. Dis Colon Rectum. 2022;65(10):1173-1190';
const R_CCR = 'Vogel JD, et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Treatment of Colon Cancer. Dis Colon Rectum. 2022;65(2):148-177';
const R_DIV = 'Hall J, et al. The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Treatment of Left-Sided Colonic Diverticulitis. Dis Colon Rectum. 2020;63(6):728-747';
const R_STAMM = 'Barutwanayo G, Davis R. Stamm Gastrostomy. Open Manual of Surgery in Resource-Limited Settings (Vanderbilt Global Surgical Atlas), 2022';
const R_JEJ = 'Feeding Jejunostomy Tube. StatPearls (artículo archivado), actualización 2023';
const R_ESPEN = 'Weimann A, et al. ESPEN practical guideline: Clinical nutrition in surgery. Clin Nutr. 2021;40(7):4745-4761';
const S = ' · ';

const CAT = 'Cirugía abdominal y digestiva';
const REV = '2026-10';

// ───────────── Bloques reutilizables (datos) ─────────────
const NEUMO_O = [
  ['Técnica abierta (Hasson)', 'con técnica abierta de Hasson'],
  ['Aguja de Veress', 'con aguja de Veress'],
  ['Trocar óptico', 'con trocar de acceso óptico']
];
const VIA_LC = [
  ['Laparoscópica', 'Se realiza abordaje laparoscópico'],
  ['Convertida a abierta', 'Se inicia abordaje laparoscópico con conversión a cirugía abierta']
];
const VIA_3 = [
  ['Abierta', 'Se realiza abordaje abierto'],
  ['Laparoscópica', 'Se realiza abordaje laparoscópico'],
  ['Convertida a abierta', 'Se inicia abordaje laparoscópico con conversión a cirugía abierta']
];
const LAPS = ['Laparoscópica', 'Convertida a abierta'];
const OPEN = ['Abierta', 'Convertida a abierta'];
// reemplazos de los comunes de conversión, atados a la variante `via`
const CONV = { id: 'conv', l: 'Conversión de abordaje', sec: 'D', k: 'opt', if: ['via', 'Laparoscópica'], o: [
  ['Sin conversión', 'Se completa el procedimiento por vía laparoscópica, sin conversión']
] };
const CONVM = { id: 'convm', l: 'Motivo de la conversión', sec: 'D', k: 'text', req: 1, if: ['via', 'Convertida a abierta'], p: 'La conversión a cirugía abierta se debe a {v}', ph: 'adherencias firmes, anatomía no identificable, sangrado' };
const LIQ_O = [
  ['Sin líquido libre', 'Sin líquido libre en cavidad'],
  ['Seroso', 'Líquido libre seroso'],
  ['Serohemático', 'Líquido libre serohemático'],
  ['Hemoperitoneo', 'Hemoperitoneo'],
  ['Turbio', 'Líquido libre turbio'],
  ['Purulento', 'Líquido libre purulento'],
  ['Bilioso', 'Líquido libre bilioso'],
  ['Intestinal', 'Líquido libre de aspecto intestinal'],
  ['Fecaloideo', 'Líquido libre fecaloideo']
];
const ANAS_CONF = [
  ['Latero-lateral isoperistáltica', 'latero-lateral isoperistáltica'],
  ['Latero-lateral antiperistáltica', 'latero-lateral antiperistáltica'],
  ['Término-terminal', 'término-terminal'],
  ['Término-lateral', 'término-lateral'],
  ['Látero-terminal', 'látero-terminal']
];
const ANAS_TEC = [
  ['Manual en un plano', 'manual en un plano'],
  ['Manual en dos planos', 'manual en dos planos'],
  ['Mecánica lineal con cierre manual', 'mecánica con sutura lineal y cierre manual de la boca de enterotomía'],
  ['Mecánica lineal total', 'mecánica con sutura lineal y cierre mecánico de la boca de enterotomía']
];
const ESTANQ_O = [
  ['No realizada', 'No se realiza prueba de estanqueidad'],
  ['Neumática sin fuga', 'Se realiza prueba neumática de estanqueidad, sin evidencia de fuga'],
  ['Con colorante sin fuga', 'Se realiza prueba de estanqueidad con colorante, sin evidencia de fuga'],
  ['Fuga reparada', 'Se realiza prueba de estanqueidad con evidencia de fuga, que se repara con puntos de refuerzo']
];
const MAD_O = [
  ['Con eversión (Brooke)', 'Se realiza maduración primaria con eversión según técnica de Brooke y fijación mucocutánea con puntos separados'],
  ['Al ras, sin eversión', 'Se realiza maduración primaria al ras de la piel con fijación mucocutánea con puntos separados'],
  ['No madurada', 'No se realiza maduración primaria']
];
const LOC_OST = [
  ['Fosa ilíaca derecha', 'fosa ilíaca derecha'],
  ['Fosa ilíaca izquierda', 'fosa ilíaca izquierda'],
  ['Flanco derecho', 'flanco derecho'],
  ['Flanco izquierdo', 'flanco izquierdo'],
  ['Hipocondrio derecho', 'hipocondrio derecho'],
  ['Hipocondrio izquierdo', 'hipocondrio izquierdo'],
  ['Sitio marcado', 'el sitio marcado en el preoperatorio'],
  ['Extremo de la laparotomía', 'el extremo de la laparotomía']
];
const CIERRE_LAP = [
  ['Continuo', 'Se realiza cierre aponeurótico con sutura continua'],
  ['Puntos pequeños', 'Se realiza cierre aponeurótico con técnica de puntos pequeños'],
  ['Puntos separados', 'Se realiza cierre aponeurótico con puntos separados'],
  ['Puntos totales de retención', 'Se realiza cierre con puntos totales de retención'],
  ['Abdomen abierto con presión negativa', 'Se deja abdomen abierto con sistema de terapia de presión negativa'],
  ['Abdomen abierto con bolsa', 'Se deja abdomen abierto con contención mediante bolsa plástica (bolsa de Bogotá)'],
  ['Cierre temporal de piel', 'Se realiza cierre temporal de la piel sin cierre aponeurótico']
];

export default [
  // ───────────────────────────── 1. Apendicectomía laparoscópica ─────────────────────────────
  {
    id: 'cg-apl',
    n: 'Apendicectomía laparoscópica',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Colorrectal',
    v: 2,
    syn: ['apendicectomía videolaparoscópica', 'apendicectomía VLP', 'VLP', 'apendicitis', 'apéndice', 'laparoscopia'],
    ref: R_APP + S + R_RCS,
    rev: REV,
    ctx: 'Apendicitis aguda confirmada o sospechada. Abordaje laparoscópico habitual de tres puertos, con extracción de la pieza en bolsa. Cierre de la base con lazos, clips de polímero o sutura mecánica según hallazgos; sin invaginación del muñón. Se recomienda Anatomía Patológica de rutina.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: VIA_LC },
      { id: 'neumo', l: 'Neumoperitoneo', sec: 'B', k: 'opt', o: NEUMO_O },
      { id: 'pneu', l: 'Presión de neumoperitoneo', sec: 'B', k: 'num', u: 'mmHg', p: 'Neumoperitoneo a {v} mmHg' },
      { id: 'puertos', l: 'Puertos', sec: 'B', k: 'opt', o: [
        ['3 puertos (umbilical, suprapúbico, FII)', 'Se colocan tres trocares, umbilical, suprapúbico y en fosa ilíaca izquierda'],
        ['3 puertos (umbilical, FII, hipogastrio)', 'Se colocan tres trocares, umbilical, en fosa ilíaca izquierda y en hipogastrio'],
        ['Puerto único umbilical', 'Se realiza abordaje por puerto único umbilical'],
        ['Puerto adicional', 'Se colocan trocares según disposición habitual y un trocar adicional en {d}']
      ], ph: 'localización del trocar adicional' },
      { id: 'abord', l: 'Incisión de conversión', sec: 'B', k: 'opt', if: ['via', 'Convertida a abierta'], p: 'Se realiza {v}', o: [
        ['McBurney', 'incisión oblicua de McBurney en fosa ilíaca derecha'],
        ['Rocky-Davis', 'incisión transversa de Rocky-Davis en fosa ilíaca derecha'],
        ['Mediana infraumbilical', 'laparotomía mediana infraumbilical'],
        ['Otra', 'incisión {d}']
      ], ph: 'tipo y localización' },

      { id: 'estado', l: 'Estado del apéndice', sec: 'C', k: 'opt', req: 1, q: 1, p: 'Se identifica apéndice cecal {v}', o: [
        ['Inflamado', 'inflamado'],
        ['Aspecto normal', 'de aspecto macroscópico normal'],
        ['Lesión de aspecto tumoral', 'con lesión de aspecto tumoral en {d}'],
        ['Apendicolito palpable', 'inflamado, con apendicolito palpable']
      ], ph: 'punta, cuerpo o base' },
      { id: 'grado', l: 'Grado de inflamación', sec: 'C', k: 'opt', q: 1, if: ['estado', ['Inflamado', 'Apendicolito palpable']], o: [
        ['Congestivo', 'Apéndice congestivo y edematoso'],
        ['Flegmonoso', 'Apéndice flegmonoso, con exudado fibrinoso en su superficie'],
        ['Gangrenoso', 'Apéndice gangrenoso']
      ] },
      { id: 'posap', l: 'Posición anatómica', sec: 'C', k: 'opt', p: 'Apéndice en posición {v}', o: [
        ['Pelviana', 'pelviana'], ['Retrocecal', 'retrocecal'], ['Subcecal', 'subcecal'], ['Paracecal', 'paracecal'],
        ['Preileal', 'preileal'], ['Retroileal', 'retroileal'], ['Subhepática', 'subhepática']
      ] },
      { id: 'perf', l: 'Perforación', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin perforación', 'Sin evidencia de perforación'],
        ['Perforación en punta', 'Perforación apendicular a nivel de la punta'],
        ['Perforación en cuerpo', 'Perforación apendicular a nivel del cuerpo'],
        ['Perforación en base', 'Perforación apendicular a nivel de la base']
      ] },
      { id: 'necro', l: 'Necrosis', sec: 'C', k: 'opt', o: [
        ['Sin necrosis', 'Sin necrosis apendicular'],
        ['Necrosis parcial', 'Necrosis apendicular parcial'],
        ['Necrosis extendida a la base', 'Necrosis apendicular que se extiende a la base']
      ] },
      { id: 'plast', l: 'Plastrón o adherencias', sec: 'C', k: 'opt', o: [
        ['Sin plastrón ni adherencias', 'Sin plastrón ni adherencias periapendiculares'],
        ['Adherencias laxas', 'Adherencias laxas periapendiculares'],
        ['Adherencias firmes', 'Adherencias firmes periapendiculares'],
        ['Plastrón apendicular', 'Plastrón apendicular con epiplón y asas intestinales adyacentes']
      ] },
      { id: 'liq', l: 'Líquido libre', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin líquido libre', 'Sin líquido libre en cavidad'],
        ['Seroso en FID', 'Líquido seroso en fosa ilíaca derecha'],
        ['Seropurulento en FID', 'Líquido seropurulento en fosa ilíaca derecha'],
        ['Purulento en FID y pelvis', 'Líquido purulento en fosa ilíaca derecha y pelvis'],
        ['Peritonitis generalizada', 'Líquido purulento en los cuatro cuadrantes'],
        ['Fecaloideo', 'Líquido de aspecto fecaloideo en cavidad']
      ] },
      { id: 'colec', l: 'Colección', sec: 'C', k: 'opt', o: [
        ['Sin colección', 'Sin colecciones organizadas'],
        ['Absceso periapendicular', 'Absceso periapendicular'],
        ['Absceso pelviano', 'Absceso en fondo de saco de Douglas'],
        ['Otra localización', 'Colección en {d}']
      ], ph: 'localización' },
      { id: 'base', l: 'Base apendicular', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Viable', 'Base apendicular viable'],
        ['Con compromiso inflamatorio', 'Base apendicular con compromiso inflamatorio'],
        ['Necrótica o perforada', 'Base apendicular necrótica o perforada'],
        ['Compromiso cecal', 'Compromiso inflamatorio de la pared cecal adyacente a la base']
      ] },
      { id: 'vec', l: 'Revisión de órganos vecinos', sec: 'C', k: 'multi', o: [
        ['Íleon terminal sin alteraciones', 'Íleon terminal sin alteraciones macroscópicas'],
        ['Anexos sin alteraciones', 'Anexos sin alteraciones macroscópicas'],
        ['Divertículo de Meckel', 'Divertículo de Meckel a {d} de la válvula ileocecal'],
        ['Adenopatías mesentéricas', 'Adenopatías mesentéricas en mesenterio ileal'],
        ['Patología anexial', 'Patología anexial, {d}'],
        ['Ileítis terminal', 'Engrosamiento inflamatorio del íleon terminal']
      ], ph: 'distancia o descripción' },

      { id: 'meso', l: 'Sección del mesoapéndice', sec: 'D', k: 'opt', o: [
        ['Bipolar', 'energía bipolar'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ultrasónico', 'bisturí ultrasónico'],
        ['Clips', 'clips y tijera'],
        ['Monopolar', 'electrocauterio monopolar'],
        ['Ligaduras', 'ligaduras sucesivas']
      ] },
      { id: 'cbase', l: 'Cierre y sección de la base', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Dos lazos preformados', 'dos lazos preformados proximales y uno distal'],
        ['Lazos preformados', 'lazos preformados'],
        ['Sutura mecánica lineal', 'sutura mecánica lineal endoscópica'],
        ['Sutura mecánica incluyendo ciego', 'sutura mecánica lineal endoscópica incluyendo un rodete de pared cecal'],
        ['Clips de polímero', 'clips de polímero con traba'],
        ['Ligadura intracorpórea', 'ligadura intracorpórea'],
        ['Ligadura convencional', 'ligadura con material reabsorbible']
      ] },
      CONV, CONVM,

      { id: 'carga', l: 'Carga de sutura mecánica', sec: 'E', k: 'text', if: ['cbase', ['Sutura mecánica lineal', 'Sutura mecánica incluyendo ciego']], p: 'Se utiliza carga de sutura mecánica de {v}', ph: '45 mm, para tejido vascular' },

      { id: 'extr', l: 'Extracción de la pieza', sec: 'F', k: 'opt', q: 1, if: ['via', 'Laparoscópica'], o: [
        ['En bolsa por umbilical', 'Se extrae la pieza en bolsa de extracción a través del puerto umbilical'],
        ['En bolsa por otro puerto', 'Se extrae la pieza en bolsa de extracción a través del puerto de {d}'],
        ['A través del trocar', 'Se extrae la pieza a través del trocar de 10 mm, sin contacto con la pared'],
        ['Ampliando incisión', 'Se extrae la pieza en bolsa, previa ampliación de la incisión umbilical']
      ], ph: 'localización del puerto' },

      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['No se realiza', 'No se realiza lavado de la cavidad'],
        ['Aspiración sin lavado', 'Se realiza aspiración del contenido, sin lavado'],
        ['Lavado de FID', 'Se realiza lavado y aspiración de fosa ilíaca derecha'],
        ['Lavado de FID y pelvis', 'Se realiza lavado y aspiración de fosa ilíaca derecha y pelvis'],
        ['Lavado de los cuatro cuadrantes', 'Se realiza lavado y aspiración de los cuatro cuadrantes']
      ] },
      { id: 'faponeu', l: 'Cierre aponeurótico de puertos', sec: 'G', k: 'opt', if: ['via', 'Laparoscópica'], o: [
        ['Puerto umbilical', 'Se cierra la aponeurosis del puerto umbilical'],
        ['Puertos de 10 mm o más', 'Se cierra la aponeurosis de los puertos de 10 mm o más'],
        ['No se cierra', 'No se realiza cierre aponeurótico de los puertos']
      ] }
    ],
    pasos: [
      { t: 'Se accede a la cavidad peritoneal a nivel umbilical y se realiza neumoperitoneo {neumo}', if: ['via', LAPS] },
      { t: 'Se colocan los trocares accesorios bajo visión directa', if: ['via', LAPS] },
      { t: 'Se realiza exploración laparoscópica de la cavidad abdominal', if: ['via', LAPS] },
      { t: 'Se coloca al paciente en Trendelenburg con lateralización izquierda', if: ['via', LAPS] },
      { t: 'Se identifica el ciego y se siguen las tenias hasta la base apendicular', if: ['via', LAPS] },
      { t: 'Se evacua el neumoperitoneo, se retiran los trocares y se realiza {abord}', if: ['via', 'Convertida a abierta'] },
      { t: 'Se exterioriza el ciego con el apéndice a través de la incisión', if: ['via', 'Convertida a abierta'] },
      'Se liberan las adherencias periapendiculares',
      'Se realiza disección y sección del mesoapéndice con {meso}',
      'Se esqueletiza la base apendicular',
      'Se realiza cierre y sección de la base apendicular con {cbase}',
      'Se revisa el muñón apendicular y el lecho del mesoapéndice',
      'Se revisan los últimos 60 cm de íleon terminal',
      { t: 'Se retiran los trocares bajo visión directa y se evacua el neumoperitoneo', if: ['via', 'Laparoscópica'] }
    ],
    ej: 'Se realiza abordaje laparoscópico. Se accede a la cavidad peritoneal a nivel umbilical con técnica abierta de Hasson y se realiza neumoperitoneo a 12 mmHg. Se colocan tres trocares, umbilical, suprapúbico y en fosa ilíaca izquierda. Se identifica apéndice cecal inflamado, flegmonoso, en posición retrocecal, sin evidencia de perforación ni necrosis, con líquido seropurulento en fosa ilíaca derecha y base apendicular viable. Íleon terminal sin alteraciones macroscópicas. Se realiza disección y sección del mesoapéndice con energía bipolar, y cierre y sección de la base apendicular con dos lazos preformados proximales y uno distal. Se completa el procedimiento por vía laparoscópica, sin conversión. Se extrae la pieza en bolsa de extracción a través del puerto umbilical y se envía a Anatomía Patológica. Se realiza aspiración del contenido, sin lavado. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 2. Apendicectomía abierta ─────────────────────────────
  {
    id: 'cg-apc',
    n: 'Apendicectomía abierta',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Colorrectal',
    v: 2,
    syn: ['apendicectomía convencional', 'apendicectomía por McBurney', 'McBurney', 'Rocky-Davis', 'apendicitis', 'apéndice'],
    ref: R_APP + S + R_RCS,
    rev: REV,
    ctx: 'Apendicitis aguda cuando no se dispone de laparoscopia o está contraindicada. Abordaje habitual por incisión en fosa ilíaca derecha. La ligadura simple de la base es preferible a la invaginación del muñón; Anatomía Patológica de rutina.',
    lat: false,
    f: [
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', req: 1, q: 1, o: [
        ['McBurney', 'Se realiza incisión oblicua de McBurney en fosa ilíaca derecha'],
        ['Rocky-Davis', 'Se realiza incisión transversa de Rocky-Davis en fosa ilíaca derecha'],
        ['Paramediana derecha', 'Se realiza incisión paramediana derecha infraumbilical'],
        ['Mediana infraumbilical', 'Se realiza laparotomía mediana infraumbilical'],
        ['Otra', 'Se realiza incisión {d}']
      ], ph: 'tipo y localización' },
      { id: 'acc', l: 'Acceso a cavidad', sec: 'B', k: 'opt', o: [
        ['Divulsión muscular', 'Se accede a la cavidad peritoneal mediante divulsión de los músculos oblicuo menor y transverso y apertura del peritoneo'],
        ['Sección muscular', 'Se accede a la cavidad peritoneal mediante sección muscular y apertura del peritoneo'],
        ['Por línea media', 'Se accede a la cavidad peritoneal por apertura de la línea alba y del peritoneo']
      ] },

      { id: 'ident', l: 'Identificación del apéndice', sec: 'C', k: 'opt', o: [
        ['Por tenias', 'Se identifica el apéndice siguiendo la convergencia de las tenias cecales'],
        ['Exteriorización directa', 'Se exterioriza el ciego con el apéndice a través de la incisión'],
        ['Con movilización cecal', 'Se identifica el apéndice previa movilización del ciego'],
        ['Con ampliación de la incisión', 'Se identifica el apéndice previa ampliación de la incisión']
      ] },
      { id: 'estado', l: 'Estado del apéndice', sec: 'C', k: 'opt', req: 1, q: 1, p: 'Apéndice cecal {v}', o: [
        ['Inflamado', 'inflamado'],
        ['Aspecto normal', 'de aspecto macroscópico normal'],
        ['Lesión de aspecto tumoral', 'con lesión de aspecto tumoral en {d}'],
        ['Apendicolito palpable', 'inflamado, con apendicolito palpable']
      ], ph: 'punta, cuerpo o base' },
      { id: 'grado', l: 'Grado de inflamación', sec: 'C', k: 'opt', q: 1, if: ['estado', ['Inflamado', 'Apendicolito palpable']], o: [
        ['Congestivo', 'Apéndice congestivo y edematoso'],
        ['Flegmonoso', 'Apéndice flegmonoso, con exudado fibrinoso en su superficie'],
        ['Gangrenoso', 'Apéndice gangrenoso']
      ] },
      { id: 'posap', l: 'Posición anatómica', sec: 'C', k: 'opt', p: 'Apéndice en posición {v}', o: [
        ['Pelviana', 'pelviana'], ['Retrocecal', 'retrocecal'], ['Subcecal', 'subcecal'], ['Paracecal', 'paracecal'],
        ['Preileal', 'preileal'], ['Retroileal', 'retroileal'], ['Subhepática', 'subhepática']
      ] },
      { id: 'perf', l: 'Perforación', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin perforación', 'Sin evidencia de perforación'],
        ['Perforación en punta', 'Perforación apendicular a nivel de la punta'],
        ['Perforación en cuerpo', 'Perforación apendicular a nivel del cuerpo'],
        ['Perforación en base', 'Perforación apendicular a nivel de la base']
      ] },
      { id: 'necro', l: 'Necrosis', sec: 'C', k: 'opt', o: [
        ['Sin necrosis', 'Sin necrosis apendicular'],
        ['Necrosis parcial', 'Necrosis apendicular parcial'],
        ['Necrosis extendida a la base', 'Necrosis apendicular que se extiende a la base']
      ] },
      { id: 'plast', l: 'Plastrón o adherencias', sec: 'C', k: 'opt', o: [
        ['Sin plastrón ni adherencias', 'Sin plastrón ni adherencias periapendiculares'],
        ['Adherencias laxas', 'Adherencias laxas periapendiculares'],
        ['Adherencias firmes', 'Adherencias firmes periapendiculares'],
        ['Plastrón apendicular', 'Plastrón apendicular con epiplón y asas intestinales adyacentes']
      ] },
      { id: 'liq', l: 'Líquido libre', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin líquido libre', 'Sin líquido libre en cavidad'],
        ['Seroso', 'Líquido seroso en fosa ilíaca derecha'],
        ['Seropurulento', 'Líquido seropurulento en fosa ilíaca derecha'],
        ['Purulento', 'Líquido purulento en fosa ilíaca derecha'],
        ['Purulento que se extiende a pelvis', 'Líquido purulento en fosa ilíaca derecha que se extiende a la pelvis'],
        ['Fecaloideo', 'Líquido de aspecto fecaloideo']
      ] },
      { id: 'colec', l: 'Colección', sec: 'C', k: 'opt', o: [
        ['Sin colección', 'Sin colecciones organizadas'],
        ['Absceso periapendicular', 'Absceso periapendicular'],
        ['Absceso pelviano', 'Absceso en fondo de saco de Douglas']
      ] },
      { id: 'base', l: 'Base apendicular', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Viable', 'Base apendicular viable'],
        ['Con compromiso inflamatorio', 'Base apendicular con compromiso inflamatorio'],
        ['Necrótica o perforada', 'Base apendicular necrótica o perforada'],
        ['Compromiso cecal', 'Compromiso inflamatorio de la pared cecal adyacente a la base']
      ] },
      { id: 'vec', l: 'Revisión de órganos vecinos', sec: 'C', k: 'multi', o: [
        ['Íleon terminal sin alteraciones', 'Íleon terminal sin alteraciones macroscópicas'],
        ['Divertículo de Meckel', 'Divertículo de Meckel a {d} de la válvula ileocecal'],
        ['Adenopatías mesentéricas', 'Adenopatías mesentéricas en mesenterio ileal'],
        ['Ileítis terminal', 'Engrosamiento inflamatorio del íleon terminal']
      ], ph: 'distancia' },

      { id: 'meso', l: 'Sección del mesoapéndice', sec: 'D', k: 'opt', o: [
        ['Ligaduras sucesivas', 'ligaduras sucesivas'],
        ['Electrocauterio', 'electrocauterio'],
        ['Sellador de vasos', 'dispositivo de sellado vascular']
      ] },
      { id: 'lig', l: 'Ligadura de la base', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Ligadura simple reabsorbible', 'ligadura simple con material reabsorbible'],
        ['Doble ligadura reabsorbible', 'doble ligadura con material reabsorbible'],
        ['Ligadura transfixiante', 'ligadura transfixiante'],
        ['Sutura mecánica', 'sutura mecánica lineal']
      ] },
      { id: 'munon', l: 'Tratamiento del muñón', sec: 'D', k: 'opt', o: [
        ['Sin invaginación', 'Se deja el muñón apendicular ligado, sin invaginación'],
        ['Invaginación con jareta', 'Se invagina el muñón apendicular mediante jareta seromuscular'],
        ['Invaginación con punto en Z', 'Se invagina el muñón apendicular mediante punto en Z'],
        ['Electrocoagulación e invaginación', 'Se electrocoagula la mucosa del muñón apendicular y se invagina mediante jareta seromuscular'],
        ['Cierre cecal', 'Se realiza cierre de la pared cecal con puntos seromusculares']
      ] },

      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['No se realiza', 'No se realiza lavado de la cavidad'],
        ['Aspiración sin lavado', 'Se realiza aspiración del contenido, sin lavado'],
        ['Lavado de FID', 'Se realiza lavado y aspiración de fosa ilíaca derecha'],
        ['Lavado de FID y pelvis', 'Se realiza lavado y aspiración de fosa ilíaca derecha y pelvis']
      ] },
      { id: 'cierre', l: 'Cierre de la pared abdominal', sec: 'G', k: 'opt', o: [
        ['Por planos anatómicos', 'Se realiza cierre de la pared abdominal por planos, peritoneo, plano muscular y aponeurosis del oblicuo mayor'],
        ['Sin cierre peritoneal', 'Se realiza cierre del plano muscular y de la aponeurosis del oblicuo mayor, sin cierre peritoneal'],
        ['Aponeurosis únicamente', 'Se realiza cierre de la aponeurosis del oblicuo mayor'],
        ['Línea media', 'Se realiza cierre de la aponeurosis de la línea media con sutura continua']
      ] },
      { id: 'csut', l: 'Material de sutura de la pared', sec: 'G', k: 'text', p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'poliglactina 0' },
      { id: 'tcs', l: 'Tejido celular subcutáneo', sec: 'G', k: 'opt', o: [
        ['Cierre primario', 'Se aproxima el tejido celular subcutáneo'],
        ['Piel abierta', 'Se deja la piel y el tejido celular subcutáneo abiertos para cierre diferido'],
        ['Sin aproximación', 'No se aproxima el tejido celular subcutáneo']
      ] }
    ],
    pasos: [
      'Se realiza apertura del tejido celular subcutáneo y de la aponeurosis del oblicuo mayor en el sentido de sus fibras',
      'Se protegen los bordes de la herida',
      'Se realiza exploración de la fosa ilíaca derecha y del íleon terminal',
      'Se liberan las adherencias periapendiculares',
      'Se realiza sección del mesoapéndice con {meso}',
      'Se realiza aplastamiento y ligadura de la base apendicular con {lig}',
      'Se secciona el apéndice distal a la ligadura',
      'Se reintroduce el ciego en la cavidad',
      'Se revisa el muñón apendicular y el mesoapéndice'
    ],
    ej: 'Se realiza incisión oblicua de McBurney en fosa ilíaca derecha. Se accede a la cavidad peritoneal mediante divulsión de los músculos oblicuo menor y transverso y apertura del peritoneo. Se realiza exploración de la fosa ilíaca derecha y del íleon terminal. Apéndice cecal inflamado, gangrenoso, en posición pelviana, sin evidencia de perforación, con líquido seropurulento en fosa ilíaca derecha y base apendicular viable. Se realiza sección del mesoapéndice con ligaduras sucesivas y aplastamiento y ligadura de la base apendicular con doble ligadura con material reabsorbible. Se deja el muñón apendicular ligado, sin invaginación. Se envía pieza a Anatomía Patológica. Se realiza aspiración del contenido, sin lavado. Se realiza cierre de la pared abdominal por planos, peritoneo, plano muscular y aponeurosis del oblicuo mayor. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 3. Colecistectomía laparoscópica ─────────────────────────────
  {
    id: 'cg-cvl',
    n: 'Colecistectomía laparoscópica',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Hepatobiliopancreática',
    v: 2,
    syn: ['colecistectomía videolaparoscópica', 'CVL', 'VLP', 'colelitiasis', 'litiasis vesicular', 'colecistitis', 'vesícula'],
    ref: R_TG18 + S + R_SAFE + S + R_RCS,
    rev: REV,
    ctx: 'Litiasis vesicular sintomática, colecistitis aguda, pólipo vesicular o colecistectomía diferida tras pancreatitis o coledocolitiasis. La visión crítica de seguridad (tres criterios) solo se afirma si se documentó; si no se obtiene, se registra la estrategia de rescate (subtotal, fondo primero, imagen biliar, conversión).',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: VIA_LC },
      { id: 'neumo', l: 'Neumoperitoneo', sec: 'B', k: 'opt', o: NEUMO_O },
      { id: 'pneu', l: 'Presión de neumoperitoneo', sec: 'B', k: 'num', u: 'mmHg', p: 'Neumoperitoneo a {v} mmHg' },
      { id: 'puertos', l: 'Puertos', sec: 'B', k: 'opt', o: [
        ['4 puertos (técnica americana)', 'Se colocan cuatro trocares según técnica americana'],
        ['4 puertos (técnica francesa)', 'Se colocan cuatro trocares según técnica francesa'],
        ['3 puertos', 'Se colocan tres trocares'],
        ['Trocar adicional', 'Se colocan cuatro trocares y un trocar adicional en {d}']
      ], ph: 'localización del trocar adicional' },
      { id: 'abord', l: 'Incisión de conversión', sec: 'B', k: 'opt', if: ['via', 'Convertida a abierta'], p: 'Se realiza {v}', o: [
        ['Subcostal derecha', 'laparotomía subcostal derecha'],
        ['Mediana supraumbilical', 'laparotomía mediana supraumbilical'],
        ['Otra', 'incisión {d}']
      ], ph: 'tipo y localización' },

      { id: 'tg', l: 'Gravedad de la colecistitis (TG18)', sec: 'C', k: 'opt', o: [
        ['No aplica, sin colecistitis aguda', 'Cirugía sin colecistitis aguda'],
        ['Grado I', 'Colecistitis aguda grado I (leve) según Guías de Tokio 2018'],
        ['Grado II', 'Colecistitis aguda grado II (moderada) según Guías de Tokio 2018'],
        ['Grado III', 'Colecistitis aguda grado III (grave) según Guías de Tokio 2018']
      ] },
      { id: 'asp', l: 'Aspecto de la vesícula', sec: 'C', k: 'opt', q: 1, o: [
        ['Paredes finas', 'Vesícula de paredes finas'],
        ['Paredes engrosadas', 'Vesícula de paredes engrosadas'],
        ['Escleroatrófica', 'Vesícula escleroatrófica'],
        ['Lito impactado en bacinete', 'Vesícula con lito impactado en el bacinete'],
        ['Vesícula en porcelana', 'Vesícula de pared calcificada']
      ] },
      { id: 'dist', l: 'Distensión', sec: 'C', k: 'opt', o: [
        ['No distendida', 'No distendida'],
        ['Distendida', 'Distendida'],
        ['A tensión', 'Distendida a tensión']
      ] },
      { id: 'infl', l: 'Inflamación', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Sin inflamación aguda', 'Sin signos de inflamación aguda'],
        ['Edematosa', 'Con signos de inflamación aguda y edema parietal'],
        ['Con necrosis parietal', 'Con signos de inflamación aguda y áreas de necrosis parietal'],
        ['Empiema', 'Con empiema vesicular'],
        ['Perforada', 'Con perforación vesicular {d}'],
        ['Inflamación crónica', 'Con signos de inflamación crónica y fibrosis']
      ], ph: 'localización o colección asociada' },
      { id: 'adh', l: 'Adherencias', sec: 'C', k: 'opt', o: [
        ['Sin adherencias', 'Sin adherencias perivesiculares'],
        ['Epiplón laxo', 'Adherencias laxas de epiplón mayor a la vesícula'],
        ['Duodeno o colon', 'Adherencias firmes de duodeno o colon transverso a la vesícula'],
        ['Plastrón vesicular', 'Plastrón vesicular con epiplón, duodeno y colon'],
        ['Adherencias de cirugía previa', 'Adherencias en hemiabdomen superior por cirugías previas']
      ] },
      { id: 'anat', l: 'Estructuras identificadas', sec: 'C', k: 'multi', q: 1, p: 'Se identifican {v}', o: [
        ['Conducto cístico', 'conducto cístico'],
        ['Arteria cística', 'arteria cística'],
        ['Vía biliar principal', 'vía biliar principal'],
        ['Arteria hepática derecha', 'arteria hepática derecha'],
        ['Surco de Rouvière', 'surco de Rouvière'],
        ['Base del segmento IV', 'base del segmento IV'],
        ['Unión cístico-coledociana', 'unión cístico-coledociana']
      ] },
      { id: 'var', l: 'Variantes anatómicas', sec: 'C', k: 'multi', o: [
        ['Sin variantes evidentes', 'Sin variantes anatómicas evidentes'],
        ['Arteria cística doble', 'Arteria cística doble'],
        ['Cístico corto', 'Conducto cístico corto'],
        ['Cístico paralelo a la vía biliar', 'Conducto cístico de trayecto paralelo a la vía biliar principal'],
        ['Arteria hepática derecha en el triángulo', 'Arteria hepática derecha con trayecto dentro del triángulo hepatocístico'],
        ['Conducto biliar aberrante', 'Conducto biliar aberrante en el lecho vesicular']
      ] },
      { id: 'cvs', l: 'Visión crítica de seguridad', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Obtenida', 'Se constata visión crítica de seguridad, con triángulo hepatocístico libre de grasa y tejido fibroso, tercio inferior del lecho vesicular expuesto y solo dos estructuras ingresando a la vesícula'],
        ['Obtenida, foto en dos vistas', 'Se constata visión crítica de seguridad, con triángulo hepatocístico libre de grasa y tejido fibroso, tercio inferior del lecho vesicular expuesto y solo dos estructuras ingresando a la vesícula, con registro fotográfico en vista anterior y posterior'],
        ['Obtenida y videograbada', 'Se constata visión crítica de seguridad, con triángulo hepatocístico libre de grasa y tejido fibroso, tercio inferior del lecho vesicular expuesto y solo dos estructuras ingresando a la vesícula, con registro en video'],
        ['No obtenida', 'No se obtiene visión crítica de seguridad']
      ] },

      { id: 'bail', l: 'Estrategia ante visión crítica no obtenida', sec: 'D', k: 'opt', req: 1, q: 1, if: ['cvs', 'No obtenida'], o: [
        ['Subtotal fenestrada', 'Se realiza colecistectomía subtotal fenestrada'],
        ['Subtotal reconstituyente', 'Se realiza colecistectomía subtotal reconstituyente'],
        ['Fondo primero', 'Se realiza disección anterógrada desde el fondo vesicular'],
        ['Imagen biliar para definir anatomía', 'Se realiza estudio de imagen biliar intraoperatorio para definir la anatomía'],
        ['Conversión', 'Se decide conversión a cirugía abierta'],
        ['Colecistostomía', 'Se realiza colecistostomía'],
        ['Se suspende el procedimiento', 'Se suspende el procedimiento sin resección vesicular, con colocación de drenaje']
      ] },
      { id: 'munsub', l: 'Manejo del remanente (subtotal)', sec: 'D', k: 'opt', if: ['bail', ['Subtotal fenestrada', 'Subtotal reconstituyente']], o: [
        ['Cierre del orificio cístico desde adentro', 'Se cierra el orificio del conducto cístico desde el interior del bacinete con sutura'],
        ['Remanente cerrado con sutura', 'Se cierra el remanente vesicular con sutura'],
        ['Remanente cerrado con sutura mecánica', 'Se cierra el remanente vesicular con sutura mecánica'],
        ['Remanente abierto', 'Se deja el remanente vesicular abierto, con drenaje subhepático'],
        ['Fulguración de mucosa', 'Se fulgura la mucosa de la pared posterior remanente']
      ] },
      { id: 'art', l: 'Tratamiento de la arteria cística', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Clips metálicos', 'clips metálicos'],
        ['Clips de polímero', 'clips de polímero con traba'],
        ['Energía bipolar', 'energía bipolar'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ultrasónico', 'bisturí ultrasónico']
      ] },
      { id: 'cist', l: 'Tratamiento del conducto cístico', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Clips metálicos', 'clips metálicos'],
        ['Clips de polímero', 'clips de polímero con traba'],
        ['Lazo preformado', 'lazo preformado'],
        ['Ligadura intracorpórea', 'ligadura intracorpórea'],
        ['Sutura mecánica', 'sutura mecánica lineal endoscópica']
      ] },
      { id: 'lecho', l: 'Disección del lecho vesicular', sec: 'D', k: 'opt', o: [
        ['Gancho monopolar', 'gancho monopolar'],
        ['Espátula monopolar', 'espátula monopolar'],
        ['Ultrasónico', 'bisturí ultrasónico'],
        ['Bipolar', 'energía bipolar']
      ] },
      { id: 'derr', l: 'Derrame de bilis o cálculos', sec: 'D', k: 'multi', o: [
        ['Sin derrame', 'Sin apertura vesicular ni derrame de bilis o cálculos'],
        ['Derrame de bilis', 'Apertura accidental de la vesícula con derrame de bilis'],
        ['Caída de cálculos', 'Caída de cálculos a la cavidad'],
        ['Cálculos recuperados', 'Se recuperan los cálculos caídos a la cavidad'],
        ['Punción evacuadora', 'Se realiza punción evacuadora de la vesícula']
      ] },
      { id: 'colan', l: 'Imagen biliar intraoperatoria', sec: 'D', k: 'opt', q: 1, o: [
        ['No se realiza', 'No se realiza imagen biliar intraoperatoria'],
        ['Colangiografía transcística', 'Se realiza colangiografía intraoperatoria a través del conducto cístico'],
        ['Colangiografía por fluorescencia', 'Se realiza colangiografía por fluorescencia con verde de indocianina'],
        ['Ecografía laparoscópica', 'Se realiza ecografía laparoscópica de la vía biliar']
      ] },
      { id: 'colres', l: 'Resultado de la imagen biliar', sec: 'D', k: 'multi', ifn: ['colan', 'No se realiza'], p: 'Imagen biliar con {v}', o: [
        ['Calibre conservado', 'vía biliar de calibre conservado'],
        ['Vía biliar dilatada', 'dilatación de la vía biliar'],
        ['Sin defectos de relleno', 'ausencia de defectos de relleno'],
        ['Defecto de relleno', 'defecto de relleno en {d}'],
        ['Pasaje a duodeno', 'pasaje de contraste al duodeno'],
        ['Sin pasaje a duodeno', 'ausencia de pasaje de contraste al duodeno'],
        ['Anatomía confirmada', 'confirmación de la anatomía del cístico y de la vía biliar principal'],
        ['Extravasación', 'extravasación de contraste']
      ], ph: 'localización del defecto' },
      CONV, CONVM,

      { id: 'extr', l: 'Extracción de la vesícula', sec: 'F', k: 'opt', if: ['via', 'Laparoscópica'], o: [
        ['En bolsa por umbilical', 'Se extrae la vesícula en bolsa de extracción a través del puerto umbilical'],
        ['En bolsa por epigástrico', 'Se extrae la vesícula en bolsa de extracción a través del puerto epigástrico'],
        ['Sin bolsa por umbilical', 'Se extrae la vesícula a través del puerto umbilical, sin bolsa'],
        ['Ampliando incisión', 'Se extrae la vesícula en bolsa, previa ampliación de la incisión umbilical']
      ] },
      { id: 'cont', l: 'Contenido vesicular', sec: 'F', k: 'multi', p: 'Al abrir la pieza se constata {v}', o: [
        ['Litiasis múltiple', 'litiasis múltiple'],
        ['Lito único', 'lito único'],
        ['Barro biliar', 'barro biliar'],
        ['Contenido purulento', 'contenido purulento'],
        ['Bilis clara', 'bilis de aspecto habitual'],
        ['Pólipo', 'lesión polipoidea de la mucosa'],
        ['Engrosamiento parietal focal', 'engrosamiento parietal focal en {d}']
      ], ph: 'localización' }
    ],
    pasos: [
      { t: 'Se accede a la cavidad peritoneal a nivel umbilical y se realiza neumoperitoneo {neumo}', if: ['via', LAPS] },
      { t: 'Se colocan los trocares accesorios bajo visión directa', if: ['via', LAPS] },
      { t: 'Se realiza exploración laparoscópica de la cavidad abdominal', if: ['via', LAPS] },
      { t: 'Se coloca al paciente en anti-Trendelenburg con lateralización izquierda', if: ['via', LAPS] },
      { t: 'Se tracciona el fondo vesicular en sentido cefálico y el bacinete en sentido lateral', if: ['via', LAPS] },
      { t: 'Se liberan las adherencias perivesiculares', if: ['via', LAPS] },
      { t: 'Se realiza disección del triángulo hepatocístico, ventral a la línea entre el surco de Rouvière y la base del segmento IV, con apertura del peritoneo en sus caras anterior y posterior', if: ['via', LAPS] },
      { t: 'Se realiza pausa de verificación de la visión crítica de seguridad antes de seccionar estructuras', if: ['via', LAPS] },
      { t: 'Se evacua el neumoperitoneo, se retiran los trocares y se realiza {abord}', if: ['via', 'Convertida a abierta'] },
      'Se realiza cierre y sección de la arteria cística con {art}',
      'Se realiza cierre y sección del conducto cístico con {cist}',
      'Se realiza disección de la vesícula de su lecho hepático con {lecho}',
      'Se revisa el lecho hepático y la posición de los clips',
      { t: 'Se retiran los trocares bajo visión directa y se evacua el neumoperitoneo', if: ['via', 'Laparoscópica'] }
    ],
    ej: 'Se realiza abordaje laparoscópico. Se accede a la cavidad peritoneal a nivel umbilical con técnica abierta de Hasson y se realiza neumoperitoneo a 12 mmHg. Se colocan cuatro trocares según técnica americana. Colecistitis aguda grado II (moderada) según Guías de Tokio 2018. Vesícula de paredes engrosadas, distendida, con signos de inflamación aguda y edema parietal y adherencias laxas de epiplón mayor. Se realiza disección del triángulo hepatocístico, ventral a la línea entre el surco de Rouvière y la base del segmento IV. Se identifican conducto cístico y arteria cística. Se constata visión crítica de seguridad, con triángulo hepatocístico libre de grasa y tejido fibroso, tercio inferior del lecho vesicular expuesto y solo dos estructuras ingresando a la vesícula, con registro fotográfico en vista anterior y posterior. Se realiza cierre y sección de la arteria cística y del conducto cístico con clips de polímero con traba, y disección de la vesícula de su lecho hepático con gancho monopolar. No se realiza imagen biliar intraoperatoria. Se completa el procedimiento por vía laparoscópica, sin conversión. Se extrae la vesícula en bolsa de extracción a través del puerto umbilical y se envía a Anatomía Patológica. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 4. Colecistectomía abierta ─────────────────────────────
  {
    id: 'cg-cva',
    n: 'Colecistectomía abierta',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Hepatobiliopancreática',
    v: 1,
    syn: ['colecistectomía convencional', 'colecistectomía por laparotomía', 'Kocher', 'subcostal', 'colecistitis', 'vesícula'],
    ref: R_SAFE + S + R_TG18 + S + R_RCS,
    rev: REV,
    ctx: 'Colecistectomía por laparotomía de inicio (contraindicación de neumoperitoneo, cirugía abdominal concomitante, falta de recursos). Para la conversión desde laparoscopia usar la plantilla laparoscópica con la variante «Convertida a abierta». Los principios de identificación (visión crítica de seguridad o disección desde el fondo) y de rescate subtotal son los mismos.',
    lat: false,
    f: [
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', req: 1, q: 1, o: [
        ['Subcostal derecha (Kocher)', 'Se realiza laparotomía subcostal derecha'],
        ['Mediana supraumbilical', 'Se realiza laparotomía mediana supraumbilical'],
        ['Transversa derecha', 'Se realiza laparotomía transversa derecha'],
        ['Otra', 'Se realiza incisión {d}']
      ], ph: 'tipo y localización' },

      { id: 'asp', l: 'Aspecto de la vesícula', sec: 'C', k: 'opt', q: 1, o: [
        ['Paredes finas', 'Vesícula de paredes finas'],
        ['Paredes engrosadas', 'Vesícula de paredes engrosadas'],
        ['Escleroatrófica', 'Vesícula escleroatrófica'],
        ['Lito impactado en bacinete', 'Vesícula con lito impactado en el bacinete'],
        ['Vesícula en porcelana', 'Vesícula de pared calcificada']
      ] },
      { id: 'infl', l: 'Inflamación', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Sin inflamación aguda', 'Sin signos de inflamación aguda'],
        ['Edematosa', 'Con signos de inflamación aguda y edema parietal'],
        ['Con necrosis parietal', 'Con signos de inflamación aguda y áreas de necrosis parietal'],
        ['Empiema', 'Con empiema vesicular'],
        ['Perforada', 'Con perforación vesicular {d}'],
        ['Inflamación crónica', 'Con signos de inflamación crónica y fibrosis'],
        ['Fístula colecistoentérica', 'Con fístula colecistoentérica hacia {d}']
      ], ph: 'localización u órgano' },
      { id: 'adh', l: 'Adherencias', sec: 'C', k: 'opt', o: [
        ['Sin adherencias', 'Sin adherencias perivesiculares'],
        ['Epiplón laxo', 'Adherencias laxas de epiplón mayor a la vesícula'],
        ['Duodeno o colon', 'Adherencias firmes de duodeno o colon transverso a la vesícula'],
        ['Plastrón vesicular', 'Plastrón vesicular con epiplón, duodeno y colon']
      ] },
      { id: 'anat', l: 'Estructuras identificadas y preservadas', sec: 'C', k: 'multi', q: 1, p: 'Se identifican {v}', o: [
        ['Conducto cístico', 'conducto cístico'],
        ['Arteria cística', 'arteria cística'],
        ['Vía biliar principal', 'vía biliar principal'],
        ['Arteria hepática derecha', 'arteria hepática derecha'],
        ['Duodeno', 'duodeno'],
        ['Unión cístico-coledociana', 'unión cístico-coledociana']
      ] },
      { id: 'var', l: 'Variantes anatómicas', sec: 'C', k: 'multi', o: [
        ['Sin variantes evidentes', 'Sin variantes anatómicas evidentes'],
        ['Arteria cística doble', 'Arteria cística doble'],
        ['Cístico corto', 'Conducto cístico corto'],
        ['Arteria hepática derecha en el triángulo', 'Arteria hepática derecha con trayecto dentro del triángulo hepatocístico'],
        ['Conducto biliar aberrante', 'Conducto biliar aberrante en el lecho vesicular']
      ] },
      { id: 'cvs', l: 'Identificación segura de estructuras', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Visión crítica obtenida', 'Se constata visión crítica de seguridad, con triángulo hepatocístico libre de grasa y tejido fibroso, tercio inferior del lecho vesicular expuesto y solo dos estructuras ingresando a la vesícula'],
        ['Disección desde el fondo hasta el cístico', 'Se completa la disección desde el fondo vesicular hasta identificar el cístico como única estructura ductal que ingresa a la vesícula'],
        ['No obtenida', 'No se logra identificación segura del conducto y la arteria císticos']
      ] },

      { id: 'dir', l: 'Sentido de la disección', sec: 'D', k: 'opt', q: 1, o: [
        ['Retrógrada', 'disección retrógrada desde el triángulo hepatocístico'],
        ['Anterógrada (fondo primero)', 'disección anterógrada desde el fondo vesicular']
      ] },
      { id: 'bail', l: 'Estrategia ante identificación no segura', sec: 'D', k: 'opt', req: 1, q: 1, if: ['cvs', 'No obtenida'], o: [
        ['Subtotal fenestrada', 'Se realiza colecistectomía subtotal fenestrada'],
        ['Subtotal reconstituyente', 'Se realiza colecistectomía subtotal reconstituyente'],
        ['Colangiografía para definir anatomía', 'Se realiza colangiografía intraoperatoria para definir la anatomía biliar'],
        ['Colecistostomía', 'Se realiza colecistostomía']
      ] },
      { id: 'art', l: 'Tratamiento de la arteria cística', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Ligadura reabsorbible', 'ligadura con material reabsorbible'],
        ['Ligadura irreabsorbible', 'ligadura con material irreabsorbible'],
        ['Clips metálicos', 'clips metálicos'],
        ['Sellador de vasos', 'dispositivo de sellado vascular']
      ] },
      { id: 'cist', l: 'Tratamiento del conducto cístico', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Ligadura simple', 'ligadura simple con material reabsorbible'],
        ['Doble ligadura', 'doble ligadura con material reabsorbible'],
        ['Ligadura transfixiante', 'ligadura transfixiante'],
        ['Clips metálicos', 'clips metálicos']
      ] },
      { id: 'colan', l: 'Colangiografía intraoperatoria', sec: 'D', k: 'yn', q: 1, y: 'Se realiza colangiografía intraoperatoria a través del conducto cístico', n: 'No se realiza colangiografía intraoperatoria' },
      { id: 'colres', l: 'Resultado de la colangiografía', sec: 'D', k: 'multi', if: ['colan', 'si'], p: 'Colangiografía con {v}', o: [
        ['Calibre conservado', 'vía biliar de calibre conservado'],
        ['Vía biliar dilatada', 'dilatación de la vía biliar'],
        ['Sin defectos de relleno', 'ausencia de defectos de relleno'],
        ['Defecto de relleno', 'defecto de relleno en {d}'],
        ['Pasaje a duodeno', 'pasaje de contraste al duodeno'],
        ['Sin pasaje a duodeno', 'ausencia de pasaje de contraste al duodeno']
      ], ph: 'localización del defecto' },
      { id: 'lecho', l: 'Tratamiento del lecho hepático', sec: 'D', k: 'opt', o: [
        ['Electrocoagulación', 'Se realiza electrocoagulación del lecho hepático'],
        ['Material hemostático', 'Se coloca material hemostático en el lecho hepático'],
        ['Peritonización', 'Se peritoniza el lecho hepático'],
        ['Sin tratamiento adicional', 'No se realiza tratamiento adicional del lecho hepático']
      ] },

      { id: 'cont', l: 'Contenido vesicular', sec: 'F', k: 'multi', p: 'Al abrir la pieza se constata {v}', o: [
        ['Litiasis múltiple', 'litiasis múltiple'],
        ['Lito único', 'lito único'],
        ['Barro biliar', 'barro biliar'],
        ['Contenido purulento', 'contenido purulento'],
        ['Bilis clara', 'bilis de aspecto habitual'],
        ['Pólipo', 'lesión polipoidea de la mucosa']
      ] },

      { id: 'cierre', l: 'Cierre de la pared', sec: 'G', k: 'opt', o: [
        ['Por planos (subcostal)', 'Se realiza cierre de la pared por planos, peritoneo y plano muscular posterior y aponeurosis anterior'],
        ['Aponeurosis en un plano', 'Se realiza cierre aponeurótico en un plano con sutura continua'],
        ['Línea media', 'Se realiza cierre de la aponeurosis de la línea media con sutura continua']
      ] },
      { id: 'csut', l: 'Material de sutura de la pared', sec: 'G', k: 'text', p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'polidioxanona 1' }
    ],
    pasos: [
      'Se realiza apertura del tejido celular subcutáneo, del plano muscular y del peritoneo',
      'Se colocan separadores y se realiza exploración del hemiabdomen superior',
      'Se rechazan el duodeno, el colon y el epiplón con compresas',
      'Se liberan las adherencias perivesiculares',
      'Se tracciona el bacinete vesicular y se realiza {dir}',
      'Se realiza disección del triángulo hepatocístico',
      'Se realiza ligadura y sección de la arteria cística con {art}',
      'Se realiza ligadura y sección del conducto cístico con {cist}',
      'Se realiza separación de la vesícula de su lecho hepático',
      'Se revisa el lecho hepático y los muñones del cístico y de la arteria cística'
    ],
    ej: 'Se realiza laparotomía subcostal derecha. Se realiza apertura del tejido celular subcutáneo, del plano muscular y del peritoneo, y exploración del hemiabdomen superior. Vesícula de paredes engrosadas, con signos de inflamación crónica y fibrosis y adherencias firmes de duodeno o colon transverso a la vesícula. Se identifican conducto cístico, arteria cística y vía biliar principal. Se constata visión crítica de seguridad, con triángulo hepatocístico libre de grasa y tejido fibroso, tercio inferior del lecho vesicular expuesto y solo dos estructuras ingresando a la vesícula. Se tracciona el bacinete vesicular y se realiza disección retrógrada desde el triángulo hepatocístico. Se realiza ligadura y sección de la arteria cística con ligadura con material reabsorbible y del conducto cístico con doble ligadura con material reabsorbible. Se realiza separación de la vesícula de su lecho hepático. No se realiza colangiografía intraoperatoria. Se realiza electrocoagulación del lecho hepático. Se envía pieza a Anatomía Patológica. Se coloca drenaje tipo Blake en espacio subhepático. Se realiza cierre de la pared por planos. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 5. Exploración de la vía biliar ─────────────────────────────
  {
    id: 'cg-evb',
    n: 'Exploración de la vía biliar, abierta o laparoscópica',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Hepatobiliopancreática',
    v: 1,
    syn: ['exploración de vía biliar', 'EVB', 'coledocotomía', 'coledocolitiasis', 'exploración transcística', 'coledoscopía', 'tubo de Kehr', 'tubo en T', 'LCBDE'],
    ref: R_EAES + S + R_LCBDE + S + R_SAFE + S + R_RCS,
    rev: REV,
    ctx: 'Coledocolitiasis confirmada en la colangiografía intraoperatoria o en estudios previos, habitualmente en el mismo acto que la colecistectomía. Se intenta primero la vía transcística y se reserva la coledocotomía para cálculos grandes, múltiples o proximales. La colecistectomía asociada se documenta con su propia plantilla.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: VIA_3 },
      { id: 'acc', l: 'Acceso a la vía biliar', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Transcística', 'Se realiza exploración de la vía biliar por vía transcística'],
        ['Coledocotomía', 'Se realiza exploración de la vía biliar por coledocotomía'],
        ['Transcística convertida a coledocotomía', 'Se inicia exploración transcística de la vía biliar y se completa por coledocotomía']
      ] },
      { id: 'neumo', l: 'Neumoperitoneo', sec: 'B', k: 'opt', if: ['via', LAPS], o: NEUMO_O },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', if: ['via', OPEN], o: [
        ['Subcostal derecha', 'Se realiza laparotomía subcostal derecha'],
        ['Mediana supraumbilical', 'Se realiza laparotomía mediana supraumbilical'],
        ['Por la misma incisión', 'Se realiza la exploración a través de la incisión de la colecistectomía']
      ] },

      { id: 'diam', l: 'Diámetro del colédoco', sec: 'C', k: 'num', q: 1, u: 'mm', p: 'Colédoco de {v} mm de diámetro' },
      { id: 'colini', l: 'Colangiografía inicial', sec: 'C', k: 'multi', q: 1, p: 'Colangiografía inicial con {v}', o: [
        ['Defecto de relleno único', 'defecto de relleno único en {d}'],
        ['Defectos de relleno múltiples', 'defectos de relleno múltiples'],
        ['Lito impactado en papila', 'imagen de lito impactado a nivel de la papila'],
        ['Sin pasaje a duodeno', 'ausencia de pasaje de contraste al duodeno'],
        ['Pasaje a duodeno', 'pasaje de contraste al duodeno'],
        ['Litiasis intrahepática', 'defectos de relleno en la vía biliar intrahepática']
      ], ph: 'localización' },
      { id: 'calc', l: 'Cálculos extraídos', sec: 'C', k: 'opt', q: 1, o: [
        ['Cálculo único', 'Se extrae un cálculo de la vía biliar principal'],
        ['Cálculos múltiples', 'Se extraen múltiples cálculos de la vía biliar principal'],
        ['Barro biliar', 'Se extrae barro biliar de la vía biliar principal'],
        ['Sin cálculos', 'No se encuentran cálculos en la vía biliar principal']
      ] },
      { id: 'bilis', l: 'Aspecto de la bilis', sec: 'C', k: 'opt', o: [
        ['Habitual', 'Bilis de aspecto habitual'],
        ['Turbia', 'Bilis turbia'],
        ['Purulenta', 'Bilis purulenta']
      ] },
      { id: 'idp', l: 'Estructuras identificadas y preservadas', sec: 'C', k: 'multi', p: 'Se identifican y preservan {v}', o: [
        ['Colédoco', 'colédoco'],
        ['Unión cístico-coledociana', 'unión cístico-coledociana'],
        ['Arteria hepática', 'arteria hepática'],
        ['Duodeno', 'duodeno']
      ] },

      { id: 'dilat', l: 'Dilatación del cístico', sec: 'D', k: 'opt', if: ['acc', ['Transcística', 'Transcística convertida a coledocotomía']], o: [
        ['Sin dilatación', 'Sin dilatación del conducto cístico'],
        ['Con balón', 'Se dilata el conducto cístico con balón sobre guía'],
        ['Con dilatadores', 'Se dilata el conducto cístico con dilatadores progresivos']
      ] },
      { id: 'ext', l: 'Métodos de extracción', sec: 'D', k: 'multi', q: 1, p: 'La extracción se realiza mediante {v}', o: [
        ['Lavado a presión', 'lavado de la vía biliar con solución fisiológica a presión'],
        ['Canastilla bajo radioscopía', 'canastilla bajo control radioscópico'],
        ['Canastilla bajo coledocoscopía', 'canastilla bajo visión coledocoscópica'],
        ['Balón tipo Fogarty', 'catéter con balón tipo Fogarty'],
        ['Litotricia', 'litotricia intraductal'],
        ['Pinzas de cálculos', 'pinzas de extracción de cálculos'],
        ['Sondas de Bakes', 'dilatación con sondas de Bakes']
      ] },
      { id: 'coled', l: 'Coledocoscopía', sec: 'D', k: 'yn', y: 'Se realiza coledocoscopía', n: 'No se realiza coledocoscopía' },
      { id: 'aclar', l: 'Control de aclaramiento', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Coledocoscopía sin cálculos residuales', 'Se realiza coledocoscopía de control, sin cálculos residuales visibles'],
        ['Colangiografía sin defectos', 'Se realiza colangiografía de control, sin defectos de relleno y con pasaje de contraste al duodeno'],
        ['Cálculo residual', 'Se constata cálculo residual en {d}'],
        ['No se realiza control', 'No se realiza control de aclaramiento de la vía biliar']
      ], ph: 'localización y conducta' },
      { id: 'ccist', l: 'Cierre del conducto cístico', sec: 'D', k: 'opt', if: ['acc', 'Transcística'], o: [
        ['Clips', 'Se cierra el conducto cístico con clips'],
        ['Lazo preformado', 'Se cierra el conducto cístico con lazo preformado'],
        ['Ligadura', 'Se cierra el conducto cístico con ligadura']
      ] },
      { id: 'ccol', l: 'Cierre de la coledocotomía', sec: 'D', k: 'opt', req: 1, q: 1, if: ['acc', ['Coledocotomía', 'Transcística convertida a coledocotomía']], o: [
        ['Cierre primario', 'cierre primario'],
        ['Cierre primario sobre endoprótesis', 'cierre primario sobre endoprótesis biliar transpapilar'],
        ['Sobre tubo en T (Kehr)', 'cierre sobre tubo en T de Kehr']
      ] },
      { id: 'kehr', l: 'Calibre del tubo en T', sec: 'E', k: 'num', if: ['ccol', 'Sobre tubo en T (Kehr)'], u: 'Fr', p: 'Se utiliza tubo en T de {v} Fr, exteriorizado por contraabertura' },
      { id: 'csut', l: 'Material de sutura del colédoco', sec: 'E', k: 'text', if: ['acc', ['Coledocotomía', 'Transcística convertida a coledocotomía']], p: 'Para el cierre del colédoco se utiliza {v}', ph: 'polidioxanona 4-0, puntos separados' },
      { id: 'estanq', l: 'Control de estanqueidad', sec: 'D', k: 'opt', if: ['acc', ['Coledocotomía', 'Transcística convertida a coledocotomía']], o: [
        ['No realizado', 'No se realiza control de estanqueidad del cierre'],
        ['Sin fuga', 'Se instila solución por la vía biliar, sin evidencia de fuga en la sutura'],
        ['Fuga reparada', 'Se instila solución por la vía biliar con evidencia de fuga, que se repara con puntos adicionales']
      ] },
      CONV, CONVM,

      { id: 'calcmuestra', l: 'Destino de los cálculos', sec: 'F', k: 'opt', o: [
        ['Enviados a estudio', 'Se envían los cálculos extraídos a estudio'],
        ['Descartados', 'No se envían los cálculos a estudio']
      ] }
    ],
    pasos: [
      { t: 'Se accede a la cavidad peritoneal y se realiza neumoperitoneo {neumo}', if: ['via', LAPS] },
      { t: 'Se evacua el neumoperitoneo y se realiza conversión a cirugía abierta', if: ['via', 'Convertida a abierta'] },
      'Se realiza colangiografía intraoperatoria inicial',
      { t: 'Se amplía la cisticotomía y se introduce guía hacia el colédoco', if: ['acc', ['Transcística', 'Transcística convertida a coledocotomía']] },
      { t: 'Se realiza maniobra de Kocher', if: ['via', OPEN] },
      { t: 'Se diseca la cara anterior del colédoco distal a la unión cístico-coledociana', if: ['acc', ['Coledocotomía', 'Transcística convertida a coledocotomía']] },
      { t: 'Se colocan puntos de reparo y se realiza coledocotomía longitudinal anterior', if: ['acc', ['Coledocotomía', 'Transcística convertida a coledocotomía']] },
      'Se realiza extracción de los cálculos',
      'Se introduce el coledocoscopio y se revisa la vía biliar distal y proximal',
      { t: 'Se realiza {ccol}', if: ['acc', ['Coledocotomía', 'Transcística convertida a coledocotomía']] },
      'Se realiza control final de la vía biliar'
    ],
    ej: 'Se realiza abordaje laparoscópico. Se realiza exploración de la vía biliar por vía transcística. Se accede a la cavidad peritoneal y se realiza neumoperitoneo con técnica abierta de Hasson. Se realiza colangiografía intraoperatoria inicial. Colédoco de 8 mm de diámetro. Colangiografía inicial con defecto de relleno único en colédoco distal y ausencia de pasaje de contraste al duodeno. Se amplía la cisticotomía y se introduce guía hacia el colédoco. Se dilata el conducto cístico con balón sobre guía. Se realiza extracción de los cálculos mediante canastilla bajo visión coledocoscópica. Se extrae un cálculo de la vía biliar principal. Se realiza coledocoscopía de control, sin cálculos residuales visibles. Se cierra el conducto cístico con lazo preformado. Se completa el procedimiento por vía laparoscópica, sin conversión. Se envían los cálculos extraídos a estudio. Se coloca drenaje tipo Blake en espacio subhepático. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 6. Laparoscopia diagnóstica ─────────────────────────────
  {
    id: 'cg-lpd',
    n: 'Laparoscopia diagnóstica',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Abdomen agudo y trauma',
    v: 1,
    syn: ['laparoscopia exploradora', 'videolaparoscopia diagnóstica', 'VLP diagnóstica', 'laparoscopia de estadificación', 'carcinomatosis', 'biopsia peritoneal'],
    ref: R_IAI + S + R_RCS,
    rev: REV,
    ctx: 'Dolor abdominal de causa incierta, sospecha de lesión peritoneal en trauma estable, estadificación oncológica o toma de biopsias. Exploración sistemática por cuadrantes. Si se realiza un procedimiento terapéutico mayor, se documenta con su plantilla.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: VIA_LC },
      { id: 'motivo', l: 'Contexto', sec: 'B', k: 'opt', vr: 1, q: 1, p: 'Laparoscopia con fin {v}', o: [
        ['Diagnóstico de abdomen agudo', 'diagnóstico en abdomen agudo de causa incierta'],
        ['Estadificación oncológica', 'de estadificación oncológica'],
        ['Trauma', 'diagnóstico en trauma abdominal'],
        ['Biopsia', 'de toma de biopsias'],
        ['Reexploración', 'de reexploración postoperatoria']
      ] },
      { id: 'neumo', l: 'Neumoperitoneo', sec: 'B', k: 'opt', o: NEUMO_O },
      { id: 'pneu', l: 'Presión de neumoperitoneo', sec: 'B', k: 'num', u: 'mmHg', p: 'Neumoperitoneo a {v} mmHg' },
      { id: 'puertos', l: 'Puertos', sec: 'B', k: 'text', p: 'Se colocan {v}', ph: 'trocar umbilical de 10 mm y dos trocares de 5 mm en flancos' },

      { id: 'liq', l: 'Líquido libre', sec: 'C', k: 'opt', q: 1, o: LIQ_O },
      { id: 'rsup', l: 'Hemiabdomen superior', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin alteraciones', 'Hígado, vesícula, estómago y bazo sin alteraciones macroscópicas'],
        ['Con hallazgos', 'En el hemiabdomen superior se constata {d}']
      ], ph: 'descripción' },
      { id: 'rinf', l: 'Intestino y mesenterio', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin alteraciones', 'Intestino delgado, colon y mesenterio sin alteraciones macroscópicas'],
        ['Con hallazgos', 'En el intestino y el mesenterio se constata {d}']
      ], ph: 'descripción' },
      { id: 'rpel', l: 'Pelvis', sec: 'C', k: 'opt', o: [
        ['Sin alteraciones', 'Pelvis sin alteraciones macroscópicas'],
        ['Con hallazgos', 'En la pelvis se constata {d}']
      ], ph: 'descripción' },
      { id: 'perit', l: 'Peritoneo', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin implantes', 'Sin implantes peritoneales visibles'],
        ['Implantes localizados', 'Implantes peritoneales localizados en {d}'],
        ['Carcinomatosis difusa', 'Implantes peritoneales difusos'],
        ['Implantes en epiplón', 'Implantes en epiplón mayor']
      ], ph: 'localización' },
      { id: 'pci', l: 'Índice de carcinomatosis peritoneal (PCI)', sec: 'C', k: 'num', if: ['perit', ['Implantes localizados', 'Carcinomatosis difusa', 'Implantes en epiplón']], p: 'Índice de carcinomatosis peritoneal de {v}' },
      { id: 'meth', l: 'Metástasis hepáticas visibles', sec: 'C', k: 'opt', if: ['motivo', 'Estadificación oncológica'], o: [
        ['Sin lesiones hepáticas', 'Sin lesiones hepáticas visibles en superficie'],
        ['Con lesiones hepáticas', 'Lesiones hepáticas de superficie en {d}']
      ], ph: 'segmentos' },
      { id: 'lesp', l: 'Penetración peritoneal (trauma)', sec: 'C', k: 'opt', if: ['motivo', 'Trauma'], o: [
        ['Sin penetración', 'Sin evidencia de penetración peritoneal'],
        ['Penetración sin lesión visceral', 'Penetración peritoneal sin lesión visceral visible'],
        ['Penetración con lesión visceral', 'Penetración peritoneal con lesión de {d}']
      ], ph: 'órgano' },

      { id: 'biop', l: 'Biopsias', sec: 'D', k: 'multi', p: 'Se toman biopsias de {v}', o: [
        ['Peritoneo parietal', 'peritoneo parietal'],
        ['Epiplón', 'epiplón mayor'],
        ['Hígado', 'hígado'],
        ['Implante', 'implante peritoneal en {d}'],
        ['Adenopatía', 'adenopatía en {d}']
      ], ph: 'localización' },
      { id: 'citol', l: 'Citología del lavado peritoneal', sec: 'D', k: 'yn', y: 'Se realiza lavado peritoneal para citología', n: 'No se realiza citología del lavado peritoneal' },
      CONV, CONVM
    ],
    pasos: [
      'Se accede a la cavidad peritoneal a nivel umbilical y se realiza neumoperitoneo {neumo}',
      'Se colocan los trocares accesorios bajo visión directa',
      'Se realiza exploración laparoscópica sistemática de los cuatro cuadrantes',
      'Se moviliza al paciente en Trendelenburg y anti-Trendelenburg con lateralizaciones para la exploración',
      'Se revisa el intestino delgado con pinzas atraumáticas desde la válvula ileocecal en sentido proximal',
      'Se aspira el líquido libre y se toma muestra para cultivo',
      { t: 'Se realiza conversión a laparotomía', if: ['via', 'Convertida a abierta'] },
      { t: 'Se retiran los trocares bajo visión directa y se evacua el neumoperitoneo', if: ['via', 'Laparoscópica'] }
    ],
    ej: 'Se realiza abordaje laparoscópico. Laparoscopia con fin de estadificación oncológica. Se accede a la cavidad peritoneal a nivel umbilical con técnica abierta de Hasson y se realiza neumoperitoneo a 12 mmHg. Se colocan los trocares accesorios bajo visión directa y se realiza exploración laparoscópica sistemática de los cuatro cuadrantes. Sin líquido libre en cavidad. Hígado, vesícula, estómago y bazo sin alteraciones macroscópicas. Implantes en epiplón mayor. Índice de carcinomatosis peritoneal de 4. Sin lesiones hepáticas visibles en superficie. Se toman biopsias de epiplón mayor. Se realiza lavado peritoneal para citología. Se completa el procedimiento por vía laparoscópica, sin conversión. Se envía pieza a Anatomía Patológica. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 7. Laparotomía exploradora ─────────────────────────────
  {
    id: 'cg-lap',
    n: 'Laparotomía exploradora',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Abdomen agudo y trauma',
    v: 2,
    syn: ['laparotomía', 'LE', 'exploración abdominal', 'trauma abdominal', 'relaparotomía', 'second look', 'reexploración'],
    ref: R_IAI + S + R_AMI + S + R_RCS,
    rev: REV,
    ctx: 'Trauma abdominal con inestabilidad o signos de lesión visceral, abdomen agudo de diagnóstico incierto o reexploración programada. Exploración sistemática por compartimentos. Para peritonitis con foco conocido usar «Laparotomía por abdomen agudo o peritonitis»; las resecciones se documentan con su plantilla.',
    lat: false,
    f: [
      { id: 'ctxl', l: 'Contexto', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Diagnóstico incierto', 'Laparotomía exploradora por cuadro abdominal de diagnóstico incierto'],
        ['Trauma', 'Laparotomía exploradora por trauma abdominal'],
        ['Reexploración programada', 'Reexploración programada'],
        ['Reexploración no programada', 'Reexploración no programada']
      ] },
      { id: 'abord', l: 'Tipo de incisión', sec: 'B', k: 'opt', req: 1, q: 1, o: [
        ['Mediana supra e infraumbilical', 'Se realiza laparotomía mediana supra e infraumbilical'],
        ['Mediana supraumbilical', 'Se realiza laparotomía mediana supraumbilical'],
        ['Mediana infraumbilical', 'Se realiza laparotomía mediana infraumbilical'],
        ['Subcostal derecha', 'Se realiza laparotomía subcostal derecha'],
        ['Subcostal bilateral', 'Se realiza laparotomía subcostal bilateral'],
        ['Transversa', 'Se realiza laparotomía transversa {d}'],
        ['Sobre laparotomía previa', 'Se realiza laparotomía sobre cicatriz previa {d}'],
        ['Apertura del cierre temporal', 'Se retira el sistema de cierre temporal del abdomen']
      ], ph: 'localización' },

      { id: 'liq', l: 'Líquido libre', sec: 'C', k: 'opt', q: 1, o: LIQ_O },
      { id: 'liqvol', l: 'Volumen aspirado', sec: 'C', k: 'num', u: 'mL', p: 'Se aspiran aproximadamente {v} mL' },
      { id: 'sang', l: 'Sangrado', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin sangrado activo', 'Sin sangrado activo'],
        ['Sangrado activo', 'Sangrado activo con origen en {d}'],
        ['Coágulos sin sangrado activo', 'Coágulos en {d}, sin sangrado activo'],
        ['Hematoma retroperitoneal', 'Hematoma retroperitoneal en {d}']
      ], ph: 'origen o zona (p. ej. bazo, zona II derecha)' },
      { id: 'perf', l: 'Perforación', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin perforación', 'Sin evidencia de perforación de víscera hueca'],
        ['Gástrica', 'Perforación gástrica en {d}'],
        ['Duodenal', 'Perforación duodenal en {d}'],
        ['Intestino delgado', 'Perforación de intestino delgado en {d}'],
        ['Colónica', 'Perforación colónica en {d}'],
        ['Múltiples', 'Perforaciones múltiples en {d}']
      ], ph: 'localización y tamaño' },
      { id: 'isq', l: 'Isquemia', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin isquemia', 'Sin signos de isquemia intestinal'],
        ['Isquemia reversible', 'Isquemia intestinal que revierte tras la liberación, en {d}'],
        ['Necrosis segmentaria', 'Necrosis intestinal segmentaria en {d}'],
        ['Isquemia extensa', 'Isquemia intestinal extensa en {d}']
      ], ph: 'segmento y extensión' },
      { id: 'les', l: 'Lesiones viscerales', sec: 'C', k: 'multi', q: 1, o: [
        ['Sin lesiones viscerales', 'Sin lesiones viscerales'],
        ['Hepática', 'Lesión hepática'],
        ['Esplénica', 'Lesión esplénica'],
        ['Gástrica', 'Lesión gástrica'],
        ['Duodenal', 'Lesión duodenal'],
        ['Pancreática', 'Lesión pancreática'],
        ['Intestino delgado', 'Lesión de intestino delgado'],
        ['Colon', 'Lesión colónica'],
        ['Mesenterio', 'Lesión del mesenterio'],
        ['Renal', 'Lesión renal'],
        ['Vesical', 'Lesión vesical'],
        ['Diafragmática', 'Lesión diafragmática'],
        ['Vascular mayor', 'Lesión vascular mayor']
      ] },
      { id: 'adh', l: 'Adherencias', sec: 'C', k: 'opt', o: [
        ['Sin adherencias', 'Sin adherencias'],
        ['Laxas', 'Adherencias laxas'],
        ['Firmes', 'Síndrome adherencial con adherencias firmes'],
        ['Brida obstructiva', 'Brida con obstrucción intestinal en {d}']
      ], ph: 'localización' },
      { id: 'viabrex', l: 'Viabilidad en la reexploración', sec: 'C', k: 'opt', if: ['ctxl', ['Reexploración programada', 'Reexploración no programada']], o: [
        ['Intestino viable', 'Intestino remanente viable, con coloración, peristalsis y pulso mesentérico conservados'],
        ['Nuevas áreas de necrosis', 'Nuevas áreas de necrosis intestinal en {d}'],
        ['Dehiscencia', 'Dehiscencia de la anastomosis o de la sutura en {d}']
      ], ph: 'localización' },
      { id: 'rsup', l: 'Compartimento supramesocolónico', sec: 'C', k: 'text', p: 'En el compartimento supramesocolónico se constata {v}', ph: 'hígado, vesícula, estómago, duodeno, bazo' },
      { id: 'rinf', l: 'Compartimento inframesocolónico', sec: 'C', k: 'text', p: 'En el compartimento inframesocolónico se constata {v}', ph: 'intestino delgado, colon' },
      { id: 'rpel', l: 'Pelvis', sec: 'C', k: 'text', p: 'En la pelvis se constata {v}', ph: 'útero y anexos, vejiga, recto' },
      { id: 'rret', l: 'Retroperitoneo', sec: 'C', k: 'text', p: 'En el retroperitoneo se constata {v}', ph: 'hematomas, colecciones' },

      { id: 'procs', l: 'Procedimientos realizados', sec: 'D', k: 'multi', q: 1, p: 'Se realiza {v}', o: [
        ['Adhesiólisis', 'adhesiólisis'],
        ['Sección de brida', 'sección de brida'],
        ['Rafia de perforación', 'rafia de la perforación'],
        ['Resección intestinal', 'resección intestinal'],
        ['Esplenectomía', 'esplenectomía'],
        ['Hepatorrafia', 'hepatorrafia'],
        ['Empaquetamiento perihepático', 'empaquetamiento perihepático'],
        ['Empaquetamiento pelviano', 'empaquetamiento pelviano'],
        ['Ligadura de vaso sangrante', 'ligadura del vaso sangrante'],
        ['Desempaquetamiento', 'retiro de compresas de empaquetamiento previo'],
        ['Desbridamiento', 'desbridamiento de tejido necrótico'],
        ['Biopsia', 'toma de biopsia de {d}'],
        ['Solo exploración', 'exploración sin procedimiento terapéutico']
      ], ph: 'detalle' },
      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['No se realiza', 'No se realiza lavado de la cavidad'],
        ['Localizado', 'Se realiza lavado y aspiración de {d}'],
        ['Cuatro cuadrantes', 'Se realiza lavado y aspiración de los cuatro cuadrantes'],
        ['Cuatro cuadrantes y pelvis', 'Se realiza lavado y aspiración de los cuatro cuadrantes y la pelvis']
      ], ph: 'región' },
      { id: 'lavvol', l: 'Volumen de lavado', sec: 'G', k: 'num', u: 'mL', p: 'Se utilizan {v} mL de solución fisiológica para el lavado' },
      { id: 'cierre', l: 'Cierre abdominal', sec: 'G', k: 'opt', req: 1, q: 1, o: CIERRE_LAP },
      { id: 'csut', l: 'Material de sutura aponeurótica', sec: 'G', k: 'text', p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'polidioxanona 1 en lazo' },
      { id: 'reex', l: 'Reexploración planificada', sec: 'H', k: 'yn', y: 'Se planifica reexploración programada', n: 'No se planifica reexploración' }
    ],
    pasos: [
      'Se realiza apertura de la cavidad peritoneal por planos',
      'Se aspira el contenido líquido de la cavidad',
      { t: 'Se realiza empaquetamiento de los cuatro cuadrantes y se retiran las compresas en forma ordenada', if: ['ctxl', 'Trauma'] },
      'Se colocan separadores y se protegen los bordes de la herida',
      'Se explora el compartimento supramesocolónico, con revisión de hígado, vesícula, estómago, duodeno y bazo',
      'Se realiza maniobra de Kocher para exploración duodenal',
      'Se abre la transcavidad de los epiplones para exploración de la cara posterior gástrica y del páncreas',
      'Se explora el compartimento inframesocolónico, con revisión del intestino delgado desde el ángulo de Treitz hasta la válvula ileocecal',
      'Se revisa el marco colónico en toda su extensión',
      'Se explora la pelvis',
      'Se explora el retroperitoneo',
      { t: 'Se revisan las anastomosis y las líneas de sutura previas', if: ['ctxl', ['Reexploración programada', 'Reexploración no programada']] }
    ],
    ej: 'Laparotomía exploradora por trauma abdominal. Se realiza laparotomía mediana supra e infraumbilical. Se realiza apertura de la cavidad peritoneal por planos y se aspira el contenido líquido de la cavidad. Hemoperitoneo, con aspiración de aproximadamente 1200 mL. Sangrado activo con origen en polo inferior del bazo. Sin evidencia de perforación de víscera hueca. Lesión esplénica. Se realiza empaquetamiento de los cuatro cuadrantes y se retiran las compresas en forma ordenada. Se explora el compartimento supramesocolónico, con revisión de hígado, vesícula, estómago, duodeno y bazo, y se revisa el intestino delgado desde el ángulo de Treitz hasta la válvula ileocecal y el marco colónico en toda su extensión. Se realiza esplenectomía. Se realiza lavado y aspiración de los cuatro cuadrantes. Se coloca drenaje tubular en celda esplénica. Se realiza cierre aponeurótico con sutura continua. No se planifica reexploración. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 8. Laparotomía por abdomen agudo o peritonitis ─────────────────────────────
  {
    id: 'cg-lpp',
    n: 'Laparotomía por abdomen agudo o peritonitis',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Abdomen agudo y trauma',
    v: 1,
    syn: ['peritonitis', 'peritonitis generalizada', 'peritonitis secundaria', 'abdomen agudo', 'control del foco', 'control de daños', 'abdomen abierto', 'lavado peritoneal'],
    ref: R_IAI + S + R_AMI + S + R_RCS,
    rev: REV,
    ctx: 'Peritonitis secundaria o terciaria y abdomen agudo quirúrgico. Objetivos documentables: identificación del foco, control del foco, toma de cultivos, lavado y decisión de cierre definitivo o temporal. En paciente con inestabilidad grave se documenta la estrategia de control de daños. El procedimiento sobre el órgano (resección, rafia, apendicectomía) puede documentarse además con su plantilla.',
    lat: false,
    f: [
      { id: 'estr0', l: 'Estrategia', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Cirugía definitiva', 'Se plantea cirugía con resolución definitiva del foco'],
        ['Control de daños', 'Se plantea estrategia de control de daños']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', req: 1, o: [
        ['Mediana supra e infraumbilical', 'Se realiza laparotomía mediana supra e infraumbilical'],
        ['Mediana supraumbilical', 'Se realiza laparotomía mediana supraumbilical'],
        ['Mediana infraumbilical', 'Se realiza laparotomía mediana infraumbilical'],
        ['Sobre laparotomía previa', 'Se realiza laparotomía sobre cicatriz previa'],
        ['Otra', 'Se realiza laparotomía {d}']
      ], ph: 'tipo' },

      { id: 'extp', l: 'Extensión de la peritonitis', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Localizada', 'Peritonitis localizada en {d}'],
        ['Generalizada', 'Peritonitis generalizada'],
        ['Sin peritonitis', 'Sin signos de peritonitis']
      ], ph: 'cuadrante o región' },
      { id: 'liq', l: 'Características del contenido', sec: 'C', k: 'multi', q: 1, p: 'Se constata contenido {v}', o: [
        ['Seroso turbio', 'seroso turbio'],
        ['Purulento', 'purulento'],
        ['Fecaloideo', 'fecaloideo'],
        ['Bilioso', 'bilioso'],
        ['Intestinal', 'de aspecto intestinal'],
        ['Hemático', 'hemático'],
        ['Con restos alimentarios', 'con restos alimentarios']
      ] },
      { id: 'liqvol', l: 'Volumen aspirado', sec: 'C', k: 'num', u: 'mL', p: 'Se aspiran aproximadamente {v} mL' },
      { id: 'fib', l: 'Fibrina y colecciones', sec: 'C', k: 'multi', o: [
        ['Sin fibrina ni colecciones', 'Sin fibrina ni colecciones organizadas'],
        ['Fibrina laxa', 'Fibrina laxa sobre asas y peritoneo'],
        ['Fibrina adherida', 'Fibrina firmemente adherida a las asas'],
        ['Absceso subfrénico', 'Absceso subfrénico {d}'],
        ['Absceso pelviano', 'Absceso pelviano'],
        ['Absceso interasas', 'Abscesos interasas']
      ], ph: 'derecho o izquierdo' },
      { id: 'foco', l: 'Foco identificado', sec: 'C', k: 'opt', req: 1, q: 1, p: 'Se identifica como foco {v}', o: [
        ['Apendicular', 'apendicitis aguda perforada'],
        ['Gastroduodenal', 'perforación gastroduodenal en {d}'],
        ['Intestino delgado', 'perforación de intestino delgado en {d}'],
        ['Colon', 'perforación colónica en {d}'],
        ['Diverticular', 'diverticulitis perforada de colon sigmoides'],
        ['Isquemia intestinal', 'necrosis intestinal en {d}'],
        ['Vesicular', 'colecistitis perforada'],
        ['Dehiscencia anastomótica', 'dehiscencia de la anastomosis {d}'],
        ['Ginecológico', 'origen ginecológico, {d}'],
        ['No identificado', 'no se identifica foco']
      ], ph: 'localización y tamaño' },
      { id: 'hinch', l: 'Clasificación de Hinchey', sec: 'C', k: 'opt', if: ['foco', 'Diverticular'], o: [
        ['Hinchey III', 'Hinchey III, peritonitis purulenta generalizada'],
        ['Hinchey IV', 'Hinchey IV, peritonitis fecal generalizada']
      ] },

      { id: 'cfoco', l: 'Control del foco', sec: 'D', k: 'multi', req: 1, q: 1, p: 'Para el control del foco se realiza {v}', o: [
        ['Apendicectomía', 'apendicectomía'],
        ['Rafia de perforación', 'rafia de la perforación'],
        ['Rafia con parche de epiplón', 'rafia de la perforación con parche de epiplón'],
        ['Resección con anastomosis', 'resección intestinal con anastomosis primaria'],
        ['Resección con ostomía', 'resección intestinal con ostomía'],
        ['Resección con cabos cerrados', 'resección intestinal con cierre de los cabos, en discontinuidad'],
        ['Operación de Hartmann', 'resección con colostomía terminal y cierre del muñón rectal (operación de Hartmann)'],
        ['Colecistectomía', 'colecistectomía'],
        ['Desmontaje de anastomosis', 'desmontaje de la anastomosis con ostomía'],
        ['Drenaje de colecciones', 'drenaje de las colecciones'],
        ['Exteriorización', 'exteriorización del segmento perforado'],
        ['Sin control del foco posible', 'drenaje amplio, sin posibilidad de control definitivo del foco']
      ] },
      { id: 'fibrem', l: 'Remoción de fibrina', sec: 'D', k: 'opt', o: [
        ['No se realiza', 'No se realiza remoción de fibrina'],
        ['Fibrina laxa', 'Se retira la fibrina laxa, sin desbridamiento de la adherida a las asas']
      ] },
      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', q: 1, o: [
        ['No se realiza', 'No se realiza lavado de la cavidad'],
        ['Aspiración sin lavado', 'Se realiza aspiración del contenido, sin lavado'],
        ['Localizado', 'Se realiza lavado y aspiración de {d}'],
        ['Cuatro cuadrantes y pelvis', 'Se realiza lavado y aspiración de los cuatro cuadrantes y la pelvis']
      ], ph: 'región' },
      { id: 'lavvol', l: 'Volumen de lavado', sec: 'G', k: 'num', u: 'mL', p: 'Se utilizan {v} mL de solución fisiológica tibia para el lavado' },
      { id: 'cierre', l: 'Cierre abdominal', sec: 'G', k: 'opt', req: 1, q: 1, o: CIERRE_LAP },
      { id: 'csut', l: 'Material de sutura aponeurótica', sec: 'G', k: 'text', p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'polidioxanona 1 en lazo' },
      { id: 'reex', l: 'Reexploración planificada', sec: 'H', k: 'opt', q: 1, o: [
        ['A demanda', 'Se indica reexploración a demanda según evolución'],
        ['Programada', 'Se planifica reexploración programada en {d}'],
        ['No se planifica', 'No se planifica reexploración']
      ], ph: '24 a 48 horas' }
    ],
    pasos: [
      'Se realiza apertura de la cavidad peritoneal por planos',
      'Se toma muestra del líquido peritoneal para cultivo',
      'Se aspira el contenido de la cavidad',
      'Se colocan separadores y se protegen los bordes de la herida',
      'Se realiza exploración sistemática de la cavidad abdominal en busca del foco',
      'Se drenan las colecciones y se rompen los tabiques interasas',
      { t: 'Se realiza control del foco con el menor tiempo operatorio posible y sin restituir el tránsito', if: ['estr0', 'Control de daños'] },
      'Se revisa el intestino delgado desde el ángulo de Treitz hasta la válvula ileocecal',
      'Se realiza lavado de la cavidad con solución fisiológica tibia hasta obtener líquido claro',
      'Se recambian guantes e instrumental antes del cierre'
    ],
    ej: 'Se plantea cirugía con resolución definitiva del foco. Se realiza laparotomía mediana supra e infraumbilical. Se realiza apertura de la cavidad peritoneal por planos, se toma muestra del líquido peritoneal para cultivo y se aspira el contenido de la cavidad. Se realiza exploración sistemática de la cavidad abdominal en busca del foco. Peritonitis generalizada. Se constata contenido purulento, con aspiración de aproximadamente 1500 mL. Fibrina laxa sobre asas y peritoneo. Se identifica como foco perforación gastroduodenal en cara anterior del bulbo duodenal, de 8 mm. Para el control del foco se realiza rafia de la perforación con parche de epiplón. Se envía material a microbiología. Se realiza lavado y aspiración de los cuatro cuadrantes y la pelvis con 8000 mL de solución fisiológica tibia. Se coloca drenaje tubular en espacio subhepático. Se realiza cierre aponeurótico con técnica de puntos pequeños. Se indica reexploración a demanda según evolución. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 9. Adhesiólisis ─────────────────────────────
  {
    id: 'cg-adh',
    n: 'Adhesiólisis por bridas u obstrucción intestinal',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Abdomen agudo y trauma',
    v: 1,
    syn: ['adhesiólisis', 'bridotomía', 'sección de brida', 'oclusión intestinal', 'obstrucción intestinal', 'síndrome adherencial', 'brida', 'ASBO'],
    ref: R_ASBO + S + R_RCS,
    rev: REV,
    ctx: 'Obstrucción intestinal por bridas o adherencias que no resuelve con tratamiento médico o con signos de sufrimiento intestinal. Abordaje laparoscópico en casos seleccionados de obstrucción simple (brida única, poca distensión); abierto o conversión ante distensión marcada o adherencias complejas. Documentar punto de transición, viabilidad y enterotomías.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: VIA_3 },
      { id: 'neumo', l: 'Neumoperitoneo', sec: 'B', k: 'opt', if: ['via', LAPS], o: [
        ['Técnica abierta (Hasson)', 'con técnica abierta de Hasson'],
        ['Trocar óptico', 'con trocar de acceso óptico'],
        ['Fuera de cicatrices previas', 'con técnica abierta, alejada de las cicatrices previas']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', if: ['via', OPEN], o: [
        ['Mediana', 'Se realiza laparotomía mediana'],
        ['Sobre laparotomía previa', 'Se realiza laparotomía sobre cicatriz previa'],
        ['Minilaparotomía dirigida', 'Se realiza minilaparotomía sobre el punto de transición'],
        ['Otra', 'Se realiza laparotomía {d}']
      ], ph: 'tipo' },

      { id: 'causa', l: 'Causa de la obstrucción', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Brida única', 'Brida única que genera obstrucción de intestino delgado'],
        ['Adherencias múltiples', 'Adherencias múltiples con acodamiento de asas'],
        ['Hernia interna', 'Hernia interna a través de {d}'],
        ['Vólvulo sobre brida', 'Vólvulo de intestino delgado sobre brida'],
        ['Asa cerrada', 'Obstrucción en asa cerrada por brida'],
        ['Sin causa adherencial', 'No se identifica causa adherencial de obstrucción']
      ], ph: 'orificio' },
      { id: 'trans', l: 'Punto de transición', sec: 'C', k: 'text', q: 1, p: 'Punto de transición en {v}', ph: 'íleon, a 80 cm de la válvula ileocecal' },
      { id: 'dilat', l: 'Asas proximales', sec: 'C', k: 'opt', o: [
        ['Distensión leve', 'Asas proximales con distensión leve'],
        ['Distensión marcada', 'Asas proximales con distensión marcada'],
        ['Sin distensión', 'Asas proximales sin distensión']
      ] },
      { id: 'viab', l: 'Viabilidad del asa comprometida', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Viable', 'Asa comprometida viable, con coloración, peristalsis y pulso mesentérico conservados'],
        ['Recupera tras liberación', 'Asa con signos de sufrimiento que recupera coloración y peristalsis tras la liberación y aplicación de compresas tibias'],
        ['Viabilidad dudosa', 'Asa de viabilidad dudosa en {d}'],
        ['Necrosis', 'Necrosis del asa comprometida en {d}']
      ], ph: 'segmento y extensión' },
      { id: 'liq', l: 'Líquido libre', sec: 'C', k: 'opt', o: [
        ['Sin líquido libre', 'Sin líquido libre en cavidad'],
        ['Seroso', 'Líquido libre seroso'],
        ['Serohemático', 'Líquido libre serohemático'],
        ['Turbio o fecaloideo', 'Líquido libre turbio de aspecto intestinal']
      ] },

      { id: 'disec', l: 'Técnica de adhesiólisis', sec: 'D', k: 'opt', o: [
        ['Tijera fría', 'disección con tijera fría'],
        ['Tijera con energía mínima', 'disección con tijera, con uso mínimo de energía'],
        ['Digital', 'disección digital y con tijera']
      ] },
      { id: 'ext', l: 'Extensión de la adhesiólisis', sec: 'D', k: 'opt', q: 1, o: [
        ['Limitada al punto de transición', 'Se limita la adhesiólisis al punto de transición'],
        ['Completa', 'Se realiza adhesiólisis completa desde el ángulo de Treitz hasta la válvula ileocecal']
      ] },
      { id: 'entero', l: 'Lesiones de la pared intestinal', sec: 'D', k: 'multi', req: 1, q: 1, o: [
        ['Sin enterotomías ni deserosamientos', 'Sin enterotomías ni deserosamientos'],
        ['Deserosamiento reparado', 'Deserosamiento en {d}, que se repara con puntos seromusculares'],
        ['Enterotomía reparada', 'Enterotomía en {d}, que se repara con sutura'],
        ['Enterotomía con resección', 'Enterotomía en {d} que requiere resección del segmento']
      ], ph: 'localización' },
      { id: 'res', l: 'Resección intestinal', sec: 'D', k: 'yn', q: 1, y: 'Se realiza resección del segmento comprometido', n: 'No se realiza resección intestinal' },
      { id: 'desc', l: 'Descompresión', sec: 'D', k: 'opt', o: [
        ['No se realiza', 'No se realiza descompresión intestinal'],
        ['Retrógrada hacia el estómago', 'Se realiza descompresión retrógrada del contenido intestinal hacia el estómago y aspiración por sonda nasogástrica']
      ] },
      { id: 'barr', l: 'Barrera antiadherente', sec: 'E', k: 'text', p: 'Se coloca barrera antiadherente de {v}', ph: 'hialuronato con carboximetilcelulosa' },
      CONV, CONVM
    ],
    pasos: [
      { t: 'Se accede a la cavidad peritoneal y se realiza neumoperitoneo {neumo}', if: ['via', LAPS] },
      { t: 'Se colocan los trocares accesorios bajo visión directa, alejados del punto de transición presunto', if: ['via', LAPS] },
      { t: 'Se realiza apertura de la cavidad peritoneal con cuidado de las asas adheridas a la pared', if: ['via', 'Abierta'] },
      'Se realiza exploración de la cavidad abdominal',
      'Se identifica el asa colapsada y se recorre en sentido retrógrado desde la válvula ileocecal hasta el punto de transición',
      'Se realiza sección de la brida y liberación de las adherencias con {disec}',
      'Se revisa el intestino delgado desde el ángulo de Treitz hasta la válvula ileocecal',
      'Se revisa la pared de las asas liberadas en busca de lesiones serosas o enterotomías',
      { t: 'Se realiza conversión a laparotomía', if: ['via', 'Convertida a abierta'] },
      { t: 'Se retiran los trocares bajo visión directa y se evacua el neumoperitoneo', if: ['via', 'Laparoscópica'] }
    ],
    ej: 'Se realiza abordaje laparoscópico. Se accede a la cavidad peritoneal y se realiza neumoperitoneo con técnica abierta, alejada de las cicatrices previas. Se realiza exploración de la cavidad abdominal. Brida única que genera obstrucción de intestino delgado. Punto de transición en íleon, a 80 cm de la válvula ileocecal. Asas proximales con distensión leve. Asa comprometida viable, con coloración, peristalsis y pulso mesentérico conservados. Se identifica el asa colapsada y se recorre en sentido retrógrado desde la válvula ileocecal hasta el punto de transición. Se realiza sección de la brida y liberación de las adherencias con disección con tijera fría. Se revisa el intestino delgado desde el ángulo de Treitz hasta la válvula ileocecal. Se limita la adhesiólisis al punto de transición. Sin enterotomías ni deserosamientos. No se realiza resección intestinal. Se completa el procedimiento por vía laparoscópica, sin conversión. No se obtiene pieza quirúrgica. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 10. Enterectomía con anastomosis ─────────────────────────────
  {
    id: 'cg-rint',
    n: 'Enterectomía con anastomosis',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Colorrectal',
    v: 2,
    syn: ['enterectomía', 'resección de intestino delgado', 'resección intestinal', 'resección ileal', 'resección yeyunal', 'anastomosis enteroentérica', 'resección ileocecal', 'divertículo de Meckel'],
    ref: R_AMI + S + R_ASBO + S + R_OST + S + R_RCS,
    rev: REV,
    ctx: 'Resección de intestino delgado por tumor, estenosis, enfermedad inflamatoria, divertículo de Meckel, invaginación, lesión traumática o compromiso vascular. Reconstrucción con anastomosis primaria u ostomía según condiciones locales y generales. Documentar longitud resecada e intestino remanente.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: [
        ['Abierta', 'Se realiza abordaje abierto'],
        ['Laparoscópica asistida', 'Se realiza abordaje laparoscópico con exteriorización del segmento por minilaparotomía'],
        ['Laparoscópica intracorpórea', 'Se realiza abordaje laparoscópico con anastomosis intracorpórea'],
        ['Convertida a abierta', 'Se inicia abordaje laparoscópico con conversión a cirugía abierta']
      ] },
      { id: 'rec', l: 'Reconstrucción', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Anastomosis primaria', 'Se realiza resección con anastomosis primaria'],
        ['Ostomía', 'Se realiza resección con ostomía, sin anastomosis']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'text', p: '{v}', ph: 'Laparotomía mediana infraumbilical / minilaparotomía periumbilical de 5 cm' },

      { id: 'les', l: 'Hallazgo en el segmento', sec: 'C', k: 'opt', q: 1, o: [
        ['Lesión tumoral', 'Lesión de aspecto tumoral en {d}'],
        ['Estenosis', 'Estenosis intestinal en {d}'],
        ['Segmento inflamatorio', 'Segmento intestinal con engrosamiento inflamatorio en {d}'],
        ['Divertículo de Meckel', 'Divertículo de Meckel de base ancha, a {d} de la válvula ileocecal'],
        ['Invaginación', 'Invaginación intestinal en {d}'],
        ['Lesión traumática', 'Lesión traumática de intestino delgado en {d}'],
        ['Isquemia segmentaria', 'Isquemia segmentaria en {d}'],
        ['Perforación', 'Perforación intestinal en {d}']
      ], ph: 'localización y extensión' },
      { id: 'mesadp', l: 'Mesenterio y adenopatías', sec: 'C', k: 'opt', o: [
        ['Sin adenopatías', 'Mesenterio sin adenopatías palpables'],
        ['Adenopatías', 'Adenopatías mesentéricas en {d}'],
        ['Mesenterio engrosado', 'Mesenterio engrosado con grasa reptante']
      ], ph: 'localización' },
      { id: 'viab', l: 'Viabilidad de los bordes', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Bordes viables', 'Se constatan bordes de resección viables, con coloración, peristalsis, sangrado de los bordes y pulso mesentérico conservados'],
        ['Viables con fluorescencia', 'Se constatan bordes de resección viables, con perfusión confirmada por fluorescencia con verde de indocianina'],
        ['Viabilidad dudosa', 'Viabilidad dudosa de los bordes de resección']
      ] },

      { id: 'seg', l: 'Segmento resecado', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Yeyuno', 'segmento de yeyuno'],
        ['Íleon', 'segmento de íleon'],
        ['Íleon terminal y ciego', 'íleon terminal y ciego'],
        ['Divertículo con segmento ileal', 'divertículo de Meckel con el segmento ileal adyacente'],
        ['Múltiples segmentos', 'múltiples segmentos de intestino delgado']
      ] },
      { id: 'distt', l: 'Distancia al ángulo de Treitz', sec: 'C', k: 'num', u: 'cm', p: 'Segmento comprometido a {v} cm del ángulo de Treitz' },
      { id: 'distv', l: 'Distancia a la válvula ileocecal', sec: 'C', k: 'num', u: 'cm', p: 'Segmento comprometido a {v} cm de la válvula ileocecal' },
      { id: 'mes', l: 'Sección del mesenterio', sec: 'D', k: 'opt', o: [
        ['Ligaduras sucesivas', 'ligaduras sucesivas'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ultrasónico', 'bisturí ultrasónico'],
        ['Ligadura del pedículo', 'ligadura y sección del pedículo vascular correspondiente']
      ] },
      { id: 'secc', l: 'Método de sección intestinal', sec: 'D', k: 'opt', o: [
        ['Sutura mecánica lineal', 'sutura mecánica lineal cortante'],
        ['Entre pinzas', 'bisturí entre pinzas intestinales'],
        ['Electrobisturí entre pinzas', 'electrobisturí entre pinzas intestinales']
      ] },
      { id: 'atipo', l: 'Tipo de anastomosis', sec: 'D', k: 'opt', req: 1, q: 1, if: ['rec', 'Anastomosis primaria'], o: [
        ['Yeyunoyeyunal', 'yeyunoyeyunal'],
        ['Yeyunoileal', 'yeyunoileal'],
        ['Ileoileal', 'ileoileal'],
        ['Ileocólica', 'ileocólica']
      ] },
      { id: 'conf', l: 'Configuración', sec: 'D', k: 'opt', req: 1, q: 1, if: ['rec', 'Anastomosis primaria'], o: ANAS_CONF },
      { id: 'atec', l: 'Técnica de anastomosis', sec: 'D', k: 'opt', req: 1, q: 1, if: ['rec', 'Anastomosis primaria'], o: ANAS_TEC },
      { id: 'estanq', l: 'Prueba de estanqueidad', sec: 'D', k: 'opt', if: ['rec', 'Anastomosis primaria'], o: ESTANQ_O },
      { id: 'brecha', l: 'Cierre de brecha mesentérica', sec: 'D', k: 'yn', y: 'Se realiza cierre de la brecha mesentérica', n: 'No se cierra la brecha mesentérica' },
      { id: 'otipo', l: 'Tipo de ostomía', sec: 'D', k: 'opt', req: 1, q: 1, if: ['rec', 'Ostomía'], o: [
        ['Ileostomía terminal', 'ileostomía terminal'],
        ['Yeyunostomía terminal', 'yeyunostomía terminal'],
        ['Cabos separados (doble boca)', 'ostomía en doble boca con cabos separados'],
        ['Ostomía terminal y fístula mucosa', 'ostomía terminal del cabo proximal y fístula mucosa del cabo distal']
      ] },
      { id: 'oloc', l: 'Localización de la ostomía', sec: 'D', k: 'opt', req: 1, if: ['rec', 'Ostomía'], o: LOC_OST },
      { id: 'mad', l: 'Maduración', sec: 'D', k: 'opt', if: ['rec', 'Ostomía'], o: MAD_O },
      CONV,
      { id: 'convm', l: 'Motivo de la conversión', sec: 'D', k: 'text', req: 1, if: ['via', 'Convertida a abierta'], p: 'La conversión a cirugía abierta se debe a {v}', ph: 'adherencias firmes, distensión' },

      { id: 'asut', l: 'Material de sutura de la anastomosis', sec: 'E', k: 'text', if: ['rec', 'Anastomosis primaria'], p: 'Para la anastomosis se utiliza {v}', ph: 'polidioxanona 3-0' },
      { id: 'cargas', l: 'Cargas de sutura mecánica', sec: 'E', k: 'text', p: 'Se utilizan cargas de sutura mecánica de {v}', ph: '2 cargas de 60 mm para tejido intermedio' },

      { id: 'long', l: 'Longitud resecada', sec: 'F', k: 'num', q: 1, u: 'cm', p: 'Pieza de aproximadamente {v} cm de longitud' },
      { id: 'remn', l: 'Intestino delgado remanente', sec: 'F', k: 'num', q: 1, u: 'cm', p: 'Se estima un intestino delgado remanente de {v} cm' },
      { id: 'orient', l: 'Orientación de la pieza', sec: 'F', k: 'text', p: 'Se orienta la pieza con {v}', ph: 'hilo largo en margen proximal' }
    ],
    pasos: [
      { t: 'Se realiza exploración laparoscópica de la cavidad abdominal', if: ['via', ['Laparoscópica asistida', 'Laparoscópica intracorpórea', 'Convertida a abierta']] },
      { t: 'Se realiza exploración de la cavidad abdominal', if: ['via', 'Abierta'] },
      'Se identifica el segmento comprometido y se recorre el intestino delgado desde el ángulo de Treitz hasta la válvula ileocecal',
      { t: 'Se realiza minilaparotomía con protector de herida y se exterioriza el segmento', if: ['via', 'Laparoscópica asistida'] },
      { t: 'Se exterioriza el segmento intestinal comprometido', if: ['via', ['Abierta', 'Convertida a abierta']] },
      'Se definen los márgenes de resección',
      'Se realiza sección del mesenterio con {mes}',
      'Se realiza sección intestinal proximal y distal con {secc}',
      'Se realiza resección de {seg}',
      { t: 'Se realiza anastomosis {atipo} {conf}, {atec}', if: ['rec', 'Anastomosis primaria'] },
      { t: 'Se cierra la enterotomía de la anastomosis con sutura intracorpórea', if: ['via', 'Laparoscópica intracorpórea'] },
      { t: 'Se exterioriza el cabo proximal en {oloc} y se confecciona {otipo}', if: ['rec', 'Ostomía'] },
      'Se mide el intestino delgado remanente',
      'Se recambian guantes e instrumental antes del cierre'
    ],
    ej: 'Se realiza abordaje abierto. Se realiza resección con anastomosis primaria. Laparotomía mediana infraumbilical. Se realiza exploración de la cavidad abdominal. Estenosis intestinal en íleon distal, de 4 cm de extensión. Segmento comprometido a 40 cm de la válvula ileocecal. Mesenterio sin adenopatías palpables. Se identifica el segmento comprometido y se recorre el intestino delgado desde el ángulo de Treitz hasta la válvula ileocecal. Se exterioriza el segmento intestinal comprometido y se definen los márgenes de resección. Se realiza sección del mesenterio con dispositivo de sellado vascular y sección intestinal proximal y distal con sutura mecánica lineal cortante, con resección de segmento de íleon. Se constatan bordes de resección viables, con coloración, peristalsis, sangrado de los bordes y pulso mesentérico conservados. Se realiza anastomosis ileoileal latero-lateral isoperistáltica, mecánica con sutura lineal y cierre manual de la boca de enterotomía. Se realiza cierre de la brecha mesentérica. Pieza de aproximadamente 15 cm de longitud. Se estima un intestino delgado remanente de 450 cm. Se envía pieza a Anatomía Patológica. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 11. Enterectomía con ostomía (alias) ─────────────────────────────
  {
    id: 'cg-rint-ost',
    n: 'Enterectomía con ostomía',
    cat: CAT,
    syn: ['enterectomía con ileostomía', 'enterectomía con yeyunostomía', 'resección intestinal con ostomía', 'cabos separados', 'doble boca'],
    alias: 'cg-rint',
    set: { rec: 'Ostomía' }
  },

  // ───────────────────────────── 12. Colectomía derecha ─────────────────────────────
  {
    id: 'cg-cder',
    n: 'Colectomía derecha',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Colorrectal',
    v: 1,
    syn: ['hemicolectomía derecha', 'colectomía derecha ampliada', 'hemicolectomía derecha extendida', 'cáncer de colon derecho', 'anastomosis ileotransversa', 'escisión completa del mesocolon', 'CME'],
    ref: R_CCR + S + R_RCS,
    rev: REV,
    ctx: 'Tumor de ciego, colon ascendente, ángulo hepático o transverso proximal; también enfermedad benigna del colon derecho. En cirugía oncológica se documenta ligadura vascular en el origen, linfadenectomía regional, márgenes y estructuras preservadas. Anastomosis ileocólica, intracorpórea o extracorpórea.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: VIA_3 },
      { id: 'ext', l: 'Extensión', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Colectomía derecha', 'Se realiza colectomía derecha'],
        ['Colectomía derecha ampliada', 'Se realiza colectomía derecha ampliada al colon transverso']
      ] },
      { id: 'onco', l: 'Intención', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Oncológica', 'Resección con criterio oncológico'],
        ['No oncológica', 'Resección sin criterio oncológico']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', if: ['via', OPEN], o: [
        ['Mediana', 'Se realiza laparotomía mediana supra e infraumbilical'],
        ['Transversa derecha', 'Se realiza laparotomía transversa derecha'],
        ['Otra', 'Se realiza laparotomía {d}']
      ], ph: 'tipo' },
      { id: 'mov', l: 'Sentido de la disección', sec: 'B', k: 'opt', o: [
        ['Medial a lateral', 'Se realiza disección de medial a lateral'],
        ['Lateral a medial', 'Se realiza disección de lateral a medial'],
        ['Craneal a caudal', 'Se realiza disección de craneal a caudal']
      ] },

      { id: 'tum', l: 'Localización de la lesión', sec: 'C', k: 'opt', q: 1, if: ['onco', 'Oncológica'], p: 'Lesión tumoral en {v}', o: [
        ['Ciego', 'ciego'],
        ['Colon ascendente', 'colon ascendente'],
        ['Ángulo hepático', 'ángulo hepático'],
        ['Transverso proximal', 'colon transverso proximal'],
        ['Tatuaje sin lesión palpable', 'zona tatuada, sin lesión palpable']
      ] },
      { id: 'tser', l: 'Compromiso parietal', sec: 'C', k: 'opt', q: 1, if: ['onco', 'Oncológica'], o: [
        ['Sin compromiso seroso', 'Sin compromiso macroscópico de la serosa'],
        ['Compromiso seroso', 'Con compromiso macroscópico de la serosa'],
        ['Adherida a órgano vecino', 'Con adherencia o infiltración de {d}']
      ], ph: 'órgano' },
      { id: 'mtt', l: 'Enfermedad a distancia', sec: 'C', k: 'multi', q: 1, if: ['onco', 'Oncológica'], o: [
        ['Sin metástasis hepáticas', 'Sin lesiones hepáticas visibles ni palpables'],
        ['Sin carcinomatosis', 'Sin implantes peritoneales'],
        ['Metástasis hepáticas', 'Lesiones hepáticas en {d}'],
        ['Carcinomatosis', 'Implantes peritoneales en {d}']
      ], ph: 'localización' },
      { id: 'benig', l: 'Hallazgo', sec: 'C', k: 'text', if: ['onco', 'No oncológica'], p: 'Se constata {v}', ph: 'engrosamiento inflamatorio del colon derecho' },
      { id: 'idp', l: 'Estructuras identificadas y preservadas', sec: 'C', k: 'multi', req: 1, q: 1, p: 'Se identifican y preservan {v}', o: [
        ['Uréter derecho', 'uréter derecho'],
        ['Vasos gonadales derechos', 'vasos gonadales derechos'],
        ['Duodeno', 'duodeno'],
        ['Cabeza del páncreas', 'cabeza del páncreas'],
        ['Vena mesentérica superior', 'vena mesentérica superior'],
        ['Tronco gastrocólico', 'tronco gastrocólico']
      ] },

      { id: 'vasc', l: 'Ligadura vascular', sec: 'D', k: 'multi', req: 1, q: 1, p: 'Se realiza ligadura y sección de {v}', o: [
        ['Ileocólicos en el origen', 'los vasos ileocólicos en su origen'],
        ['Cólicos derechos', 'los vasos cólicos derechos'],
        ['Rama derecha de la cólica media', 'la rama derecha de los vasos cólicos medios'],
        ['Cólicos medios en el origen', 'los vasos cólicos medios en su origen'],
        ['Próxima al colon', 'los vasos próximos a la pared colónica']
      ] },
      { id: 'vmet', l: 'Método de control vascular', sec: 'D', k: 'opt', o: [
        ['Clips', 'clips'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ligadura', 'ligadura con material irreabsorbible'],
        ['Sutura mecánica vascular', 'sutura mecánica vascular']
      ] },
      { id: 'cme', l: 'Plano mesocólico', sec: 'D', k: 'opt', if: ['onco', 'Oncológica'], o: [
        ['Escisión completa del mesocolon', 'Se realiza escisión completa del mesocolon en el plano embriológico, con fascia intacta'],
        ['Plano mesocólico', 'Se realiza disección en el plano mesocólico'],
        ['Plano intramesocólico', 'Disección en plano intramesocólico en {d}']
      ], ph: 'sector' },
      { id: 'secc', l: 'Sección intestinal', sec: 'D', k: 'opt', o: [
        ['Sutura mecánica lineal', 'sutura mecánica lineal cortante'],
        ['Entre pinzas', 'bisturí entre pinzas intestinales']
      ] },
      { id: 'asitio', l: 'Sitio de la anastomosis', sec: 'D', k: 'opt', q: 1, if: ['via', 'Laparoscópica'], p: 'Anastomosis {v}', o: [
        ['Intracorpórea', 'intracorpórea'],
        ['Extracorpórea', 'extracorpórea, a través de la incisión de extracción']
      ] },
      { id: 'conf', l: 'Configuración de la anastomosis ileocólica', sec: 'D', k: 'opt', req: 1, q: 1, o: ANAS_CONF },
      { id: 'atec', l: 'Técnica de anastomosis', sec: 'D', k: 'opt', req: 1, q: 1, o: ANAS_TEC },
      { id: 'estanq', l: 'Prueba de estanqueidad', sec: 'D', k: 'opt', o: ESTANQ_O },
      { id: 'perf', l: 'Perfusión de la anastomosis', sec: 'D', k: 'opt', o: [
        ['Clínica', 'Se evalúa la perfusión de los cabos por coloración y sangrado de los bordes'],
        ['Fluorescencia', 'Se evalúa la perfusión de los cabos con fluorescencia con verde de indocianina']
      ] },
      { id: 'brecha', l: 'Cierre del defecto mesentérico', sec: 'D', k: 'yn', y: 'Se realiza cierre del defecto mesentérico', n: 'No se cierra el defecto mesentérico' },
      CONV, CONVM,

      { id: 'cargas', l: 'Cargas de sutura mecánica', sec: 'E', k: 'text', p: 'Se utilizan cargas de sutura mecánica de {v}', ph: '1 carga de 60 mm vascular, 3 cargas de 60 mm para tejido intermedio' },
      { id: 'asut', l: 'Material de sutura de la anastomosis', sec: 'E', k: 'text', p: 'Para la anastomosis se utiliza {v}', ph: 'sutura barbada reabsorbible 3-0' },

      { id: 'extr', l: 'Extracción de la pieza', sec: 'F', k: 'opt', if: ['via', 'Laparoscópica'], o: [
        ['Pfannenstiel', 'Se extrae la pieza con protector de herida por incisión de Pfannenstiel'],
        ['Periumbilical', 'Se extrae la pieza con protector de herida por minilaparotomía periumbilical'],
        ['Transversa derecha', 'Se extrae la pieza con protector de herida por minilaparotomía transversa derecha']
      ] },
      { id: 'long', l: 'Longitud de la pieza', sec: 'F', k: 'num', u: 'cm', p: 'Pieza de aproximadamente {v} cm de longitud' },
      { id: 'marg', l: 'Márgenes macroscópicos', sec: 'F', k: 'opt', if: ['onco', 'Oncológica'], o: [
        ['Libres', 'Márgenes proximal, distal y radial macroscópicamente libres'],
        ['Margen comprometido', 'Margen {d} macroscópicamente comprometido']
      ], ph: 'cuál' },
      { id: 'orient', l: 'Orientación de la pieza', sec: 'F', k: 'text', p: 'Se orienta la pieza con {v}', ph: 'hilo en el pedículo ileocólico' }
    ],
    pasos: [
      { t: 'Se accede a la cavidad peritoneal y se realiza neumoperitoneo', if: ['via', LAPS] },
      { t: 'Se colocan los trocares bajo visión directa', if: ['via', LAPS] },
      'Se realiza exploración de la cavidad abdominal, con revisión hepática y peritoneal',
      { t: 'Se evacua el neumoperitoneo y se realiza conversión a laparotomía', if: ['via', 'Convertida a abierta'] },
      'Se identifica y tracciona el pedículo ileocólico',
      'Se realiza ligadura y sección de {vasc} con {vmet}',
      'Se desarrolla el plano entre el mesocolon y la fascia de Toldt-Gerota, con rechazo del duodeno y de la cabeza del páncreas',
      'Se secciona la fascia de Toldt a lo largo del colon ascendente',
      'Se moviliza el ángulo hepático con sección del ligamento hepatocólico y separación del epiplón mayor',
      { t: 'Se secciona el epiplón mayor y el mesocolon transverso hasta el nivel de sección', if: ['ext', 'Colectomía derecha ampliada'] },
      'Se realiza sección del íleon terminal y del colon transverso con {secc}',
      'Se realiza anastomosis ileocólica {conf}, {atec}',
      'Se recambian guantes e instrumental antes del cierre'
    ],
    ej: 'Se realiza abordaje laparoscópico. Se realiza colectomía derecha. Resección con criterio oncológico. Se realiza disección de medial a lateral. Se accede a la cavidad peritoneal y se realiza neumoperitoneo, y se colocan los trocares bajo visión directa. Se realiza exploración de la cavidad abdominal, con revisión hepática y peritoneal. Lesión tumoral en colon ascendente, sin compromiso macroscópico de la serosa. Sin lesiones hepáticas visibles ni palpables y sin implantes peritoneales. Se identifican y preservan uréter derecho, vasos gonadales derechos, duodeno y cabeza del páncreas. Se identifica y tracciona el pedículo ileocólico y se realiza ligadura y sección de los vasos ileocólicos en su origen y de la rama derecha de los vasos cólicos medios con clips. Se realiza escisión completa del mesocolon en el plano embriológico, con fascia intacta. Se realiza sección del íleon terminal y del colon transverso con sutura mecánica lineal cortante, y anastomosis ileocólica latero-lateral isoperistáltica, mecánica con sutura lineal y cierre manual de la boca de enterotomía. Anastomosis intracorpórea. Se evalúa la perfusión de los cabos con fluorescencia con verde de indocianina. Se completa el procedimiento por vía laparoscópica, sin conversión. Se extrae la pieza con protector de herida por incisión de Pfannenstiel. Márgenes proximal, distal y radial macroscópicamente libres. Se envía pieza a Anatomía Patológica. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 13. Colectomía izquierda o sigmoidectomía ─────────────────────────────
  {
    id: 'cg-cizq',
    n: 'Colectomía izquierda o sigmoidectomía',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Colorrectal',
    v: 1,
    syn: ['hemicolectomía izquierda', 'sigmoidectomía', 'colectomía sigmoidea', 'operación de Hartmann', 'Hartmann', 'diverticulitis', 'cáncer de sigmoides', 'anastomosis colorrectal'],
    ref: R_CCR + S + R_DIV + S + R_OST + S + R_RCS,
    rev: REV,
    ctx: 'Tumor de colon descendente o sigmoides, enfermedad diverticular complicada o recurrente, vólvulo de sigmoides o estenosis. Reconstrucción con anastomosis primaria (con o sin ileostomía de protección) u operación de Hartmann según condiciones locales y generales. Documentar nivel de ligadura vascular, movilización del ángulo esplánico, estructuras preservadas y control de la anastomosis.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: VIA_3 },
      { id: 'ext', l: 'Extensión', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Sigmoidectomía', 'Se realiza sigmoidectomía'],
        ['Colectomía izquierda', 'Se realiza colectomía izquierda']
      ] },
      { id: 'onco', l: 'Intención', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Oncológica', 'Resección con criterio oncológico'],
        ['No oncológica', 'Resección sin criterio oncológico']
      ] },
      { id: 'rec', l: 'Reconstrucción', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Anastomosis primaria', 'Se realiza resección con anastomosis primaria'],
        ['Anastomosis con ileostomía de protección', 'Se realiza resección con anastomosis primaria e ileostomía de protección'],
        ['Hartmann', 'Se realiza resección con colostomía terminal y cierre del muñón rectal (operación de Hartmann)']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', if: ['via', OPEN], o: [
        ['Mediana', 'Se realiza laparotomía mediana supra e infraumbilical'],
        ['Mediana infraumbilical', 'Se realiza laparotomía mediana infraumbilical'],
        ['Otra', 'Se realiza laparotomía {d}']
      ], ph: 'tipo' },
      { id: 'mov', l: 'Sentido de la disección', sec: 'B', k: 'opt', o: [
        ['Medial a lateral', 'Se realiza disección de medial a lateral'],
        ['Lateral a medial', 'Se realiza disección de lateral a medial']
      ] },

      { id: 'tum', l: 'Localización de la lesión', sec: 'C', k: 'opt', q: 1, if: ['onco', 'Oncológica'], p: 'Lesión tumoral en {v}', o: [
        ['Ángulo esplénico', 'ángulo esplénico'],
        ['Colon descendente', 'colon descendente'],
        ['Sigmoides', 'colon sigmoides'],
        ['Unión rectosigmoidea', 'unión rectosigmoidea'],
        ['Tatuaje sin lesión palpable', 'zona tatuada, sin lesión palpable']
      ] },
      { id: 'tser', l: 'Compromiso parietal', sec: 'C', k: 'opt', if: ['onco', 'Oncológica'], o: [
        ['Sin compromiso seroso', 'Sin compromiso macroscópico de la serosa'],
        ['Compromiso seroso', 'Con compromiso macroscópico de la serosa'],
        ['Adherida a órgano vecino', 'Con adherencia o infiltración de {d}']
      ], ph: 'órgano' },
      { id: 'mtt', l: 'Enfermedad a distancia', sec: 'C', k: 'multi', if: ['onco', 'Oncológica'], o: [
        ['Sin metástasis hepáticas', 'Sin lesiones hepáticas visibles ni palpables'],
        ['Sin carcinomatosis', 'Sin implantes peritoneales'],
        ['Metástasis hepáticas', 'Lesiones hepáticas en {d}'],
        ['Carcinomatosis', 'Implantes peritoneales en {d}']
      ], ph: 'localización' },
      { id: 'hinch', l: 'Hallazgo diverticular (Hinchey)', sec: 'C', k: 'opt', q: 1, if: ['onco', 'No oncológica'], o: [
        ['Sin perforación', 'Enfermedad diverticular sin perforación ni absceso'],
        ['Hinchey I', 'Diverticulitis con absceso pericólico (Hinchey I)'],
        ['Hinchey II', 'Diverticulitis con absceso pelviano o a distancia (Hinchey II)'],
        ['Hinchey III', 'Diverticulitis con peritonitis purulenta generalizada (Hinchey III)'],
        ['Hinchey IV', 'Diverticulitis con peritonitis fecal generalizada (Hinchey IV)'],
        ['Fístula colovesical', 'Fístula colovesical'],
        ['Vólvulo', 'Vólvulo de colon sigmoides {d}'],
        ['Estenosis', 'Estenosis de colon sigmoides']
      ], ph: 'viable o con necrosis' },
      { id: 'idp', l: 'Estructuras identificadas y preservadas', sec: 'C', k: 'multi', req: 1, q: 1, p: 'Se identifican y preservan {v}', o: [
        ['Uréter izquierdo', 'uréter izquierdo'],
        ['Vasos gonadales izquierdos', 'vasos gonadales izquierdos'],
        ['Nervios hipogástricos', 'nervios hipogástricos'],
        ['Plexo hipogástrico superior', 'plexo hipogástrico superior'],
        ['Vasos ilíacos izquierdos', 'vasos ilíacos izquierdos'],
        ['Bazo', 'bazo'],
        ['Cola del páncreas', 'cola del páncreas']
      ] },

      { id: 'vasc', l: 'Nivel de ligadura vascular', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Mesentérica inferior en el origen', 'ligadura alta de la arteria mesentérica inferior en su origen'],
        ['Debajo de la cólica izquierda', 'ligadura de la arteria mesentérica inferior por debajo del origen de la arteria cólica izquierda'],
        ['Próxima al colon', 'ligadura de los vasos sigmoideos próximos a la pared colónica']
      ] },
      { id: 'vmi', l: 'Vena mesentérica inferior', sec: 'D', k: 'opt', o: [
        ['En el borde inferior del páncreas', 'Se liga la vena mesentérica inferior en el borde inferior del páncreas'],
        ['A nivel de la arteria', 'Se liga la vena mesentérica inferior a nivel de la arteria'],
        ['No se liga', 'No se liga la vena mesentérica inferior']
      ] },
      { id: 'vmet', l: 'Método de control vascular', sec: 'D', k: 'opt', o: [
        ['Clips', 'clips'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ligadura', 'ligadura con material irreabsorbible'],
        ['Sutura mecánica vascular', 'sutura mecánica vascular']
      ] },
      { id: 'angesp', l: 'Ángulo esplénico', sec: 'D', k: 'yn', q: 1, y: 'Se realiza movilización del ángulo esplénico', n: 'No se moviliza el ángulo esplénico' },
      { id: 'dist', l: 'Nivel de sección distal', sec: 'D', k: 'opt', q: 1, p: 'Se realiza sección distal a nivel de {v}', o: [
        ['Unión rectosigmoidea', 'la unión rectosigmoidea, en la confluencia de las tenias'],
        ['Recto superior', 'el recto superior'],
        ['Colon sigmoides distal', 'el colon sigmoides distal']
      ] },
      { id: 'atec', l: 'Técnica de anastomosis', sec: 'D', k: 'opt', req: 1, q: 1, ifn: ['rec', 'Hartmann'], o: [
        ['Circular término-terminal (doble grapado)', 'término-terminal mecánica con sutura circular transanal, con técnica de doble grapado'],
        ['Circular término-lateral', 'término-lateral mecánica con sutura circular transanal'],
        ['Manual término-terminal', 'término-terminal manual'],
        ['Manual colocólica', 'colocólica manual']
      ] },
      { id: 'anillos', l: 'Anillos de la sutura circular', sec: 'D', k: 'yn', ifn: ['rec', 'Hartmann'], y: 'Se constatan anillos de la sutura circular completos', n: 'Anillos de la sutura circular incompletos' },
      { id: 'estanq', l: 'Prueba de estanqueidad', sec: 'D', k: 'opt', ifn: ['rec', 'Hartmann'], o: [
        ['No realizada', 'No se realiza prueba de estanqueidad'],
        ['Neumática sin fuga', 'Se realiza prueba neumática de estanqueidad con la pelvis bajo solución, sin evidencia de fuga'],
        ['Endoscópica sin fuga', 'Se realiza control endoscópico con insuflación, sin evidencia de fuga ni sangrado de la línea de sutura'],
        ['Fuga reparada', 'Se realiza prueba de estanqueidad con evidencia de fuga, que se repara con puntos de refuerzo']
      ] },
      { id: 'perf', l: 'Perfusión de los cabos', sec: 'D', k: 'opt', o: [
        ['Clínica', 'Se evalúa la perfusión de los cabos por coloración y sangrado de los bordes'],
        ['Fluorescencia', 'Se evalúa la perfusión de los cabos con fluorescencia con verde de indocianina']
      ] },
      { id: 'munon', l: 'Cierre del muñón rectal', sec: 'D', k: 'opt', req: 1, if: ['rec', 'Hartmann'], o: [
        ['Sutura mecánica', 'Se cierra el muñón rectal con sutura mecánica lineal'],
        ['Sutura manual', 'Se cierra el muñón rectal con sutura manual'],
        ['Con puntos de reparo', 'Se cierra el muñón rectal con sutura mecánica y se marcan sus extremos con puntos de reparo irreabsorbibles']
      ] },
      { id: 'oloc', l: 'Localización de la ostomía', sec: 'D', k: 'opt', req: 1, ifn: ['rec', 'Anastomosis primaria'], o: LOC_OST },
      CONV, CONVM,

      { id: 'carga', l: 'Grapadoras y cargas', sec: 'E', k: 'text', p: 'Se utilizan {v}', ph: 'sutura mecánica lineal endoscópica con 2 cargas de 60 mm y sutura circular de 29 mm' },

      { id: 'extr', l: 'Extracción de la pieza', sec: 'F', k: 'opt', if: ['via', 'Laparoscópica'], o: [
        ['Pfannenstiel', 'Se extrae la pieza con protector de herida por incisión de Pfannenstiel'],
        ['Fosa ilíaca izquierda', 'Se extrae la pieza con protector de herida por minilaparotomía en fosa ilíaca izquierda'],
        ['Por el sitio de ostomía', 'Se extrae la pieza con protector de herida por el sitio de la ostomía']
      ] },
      { id: 'long', l: 'Longitud de la pieza', sec: 'F', k: 'num', u: 'cm', p: 'Pieza de aproximadamente {v} cm de longitud' },
      { id: 'marg', l: 'Márgenes macroscópicos', sec: 'F', k: 'opt', if: ['onco', 'Oncológica'], o: [
        ['Libres', 'Márgenes proximal, distal y radial macroscópicamente libres'],
        ['Margen comprometido', 'Margen {d} macroscópicamente comprometido']
      ], ph: 'cuál' }
    ],
    pasos: [
      { t: 'Se accede a la cavidad peritoneal y se realiza neumoperitoneo', if: ['via', LAPS] },
      { t: 'Se colocan los trocares bajo visión directa', if: ['via', LAPS] },
      'Se realiza exploración de la cavidad abdominal, con revisión hepática y peritoneal',
      { t: 'Se evacua el neumoperitoneo y se realiza conversión a laparotomía', if: ['via', 'Convertida a abierta'] },
      'Se coloca al paciente en Trendelenburg con lateralización derecha y se rechaza el intestino delgado',
      'Se incide el peritoneo a nivel del promontorio y se desarrolla el plano retromesocólico',
      'Se identifica el uréter izquierdo antes de la sección vascular',
      'Se realiza {vasc} con {vmet}',
      'Se secciona la fascia de Toldt a lo largo del colon descendente y sigmoides',
      { t: 'Se moviliza el ángulo esplénico con sección del ligamento esplenocólico y separación del epiplón mayor', if: ['ext', 'Colectomía izquierda'] },
      'Se secciona el mesorrecto superior hasta el nivel de sección distal',
      'Se realiza sección distal con sutura mecánica lineal',
      'Se exterioriza el colon y se realiza sección proximal',
      { t: 'Se coloca el yunque de la sutura circular en el cabo proximal con jareta', if: ['atec', ['Circular término-terminal (doble grapado)', 'Circular término-lateral']] },
      { t: 'Se realiza anastomosis {atec}', ifn: ['rec', 'Hartmann'] },
      { t: 'Se confecciona ileostomía en asa de protección en {oloc}', if: ['rec', 'Anastomosis con ileostomía de protección'] },
      { t: 'Se exterioriza el cabo proximal y se confecciona colostomía terminal en {oloc}', if: ['rec', 'Hartmann'] },
      'Se recambian guantes e instrumental antes del cierre'
    ],
    ej: 'Se realiza abordaje laparoscópico. Se realiza sigmoidectomía. Resección sin criterio oncológico. Se realiza resección con anastomosis primaria. Se realiza disección de medial a lateral. Se accede a la cavidad peritoneal y se realiza neumoperitoneo, y se colocan los trocares bajo visión directa. Se realiza exploración de la cavidad abdominal, con revisión hepática y peritoneal. Enfermedad diverticular sin perforación ni absceso. Se identifican y preservan uréter izquierdo, vasos gonadales izquierdos y nervios hipogástricos. Se incide el peritoneo a nivel del promontorio y se desarrolla el plano retromesocólico. Se realiza ligadura de la arteria mesentérica inferior por debajo del origen de la arteria cólica izquierda con dispositivo de sellado vascular. Se secciona la fascia de Toldt. Se realiza sección distal con sutura mecánica lineal a nivel de la unión rectosigmoidea, en la confluencia de las tenias. Se coloca el yunque de la sutura circular en el cabo proximal con jareta y se realiza anastomosis término-terminal mecánica con sutura circular transanal, con técnica de doble grapado. No se moviliza el ángulo esplénico. Se constatan anillos de la sutura circular completos. Se realiza prueba neumática de estanqueidad con la pelvis bajo solución, sin evidencia de fuga. Se completa el procedimiento por vía laparoscópica, sin conversión. Se extrae la pieza con protector de herida por incisión de Pfannenstiel. Se envía pieza a Anatomía Patológica. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 14. Resección intestinal de urgencia ─────────────────────────────
  {
    id: 'cg-rurg',
    n: 'Resección intestinal por isquemia, perforación u otra urgencia',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Abdomen agudo y trauma',
    v: 1,
    syn: ['isquemia mesentérica', 'necrosis intestinal', 'infarto intestinal', 'resección de urgencia', 'hernia estrangulada', 'vólvulo', 'control de daños', 'second look', 'cabos cerrados'],
    ref: R_AMI + S + R_IAI + S + R_OST + S + R_RCS,
    rev: REV,
    ctx: 'Resección de intestino delgado o colon por isquemia, perforación, vólvulo, hernia estrangulada o trauma, en contexto de urgencia. Resecar todo el intestino francamente necrótico y preservar el viable; ante viabilidad dudosa o inestabilidad, control de daños con cabos cerrados, cierre temporal y reexploración en 24 a 48 horas. Documentar extensión, remanente y criterios de viabilidad.',
    lat: false,
    f: [
      { id: 'causa', l: 'Causa', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Isquemia mesentérica', 'Resección intestinal de urgencia por isquemia mesentérica'],
        ['Perforación', 'Resección intestinal de urgencia por perforación'],
        ['Vólvulo', 'Resección intestinal de urgencia por vólvulo'],
        ['Hernia estrangulada', 'Resección intestinal de urgencia por hernia estrangulada'],
        ['Trauma', 'Resección intestinal de urgencia por trauma'],
        ['Otra', 'Resección intestinal de urgencia por {d}']
      ], ph: 'causa' },
      { id: 'estrat', l: 'Estrategia de reconstrucción', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Anastomosis primaria', 'Se realiza resección con anastomosis primaria'],
        ['Ostomía', 'Se realiza resección con ostomía'],
        ['Control de daños (cabos cerrados)', 'Se realiza resección con cierre de los cabos en discontinuidad, según estrategia de control de daños']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', o: [
        ['Mediana', 'Se realiza laparotomía mediana supra e infraumbilical'],
        ['Sobre laparotomía previa', 'Se realiza laparotomía sobre cicatriz previa'],
        ['Inguinal o herniaria', 'Se realiza resección a través de la incisión herniaria'],
        ['Reapertura del abdomen abierto', 'Se retira el sistema de cierre temporal del abdomen']
      ] },

      { id: 'segs', l: 'Segmentos comprometidos', sec: 'C', k: 'multi', req: 1, q: 1, p: 'Compromiso de {v}', o: [
        ['Yeyuno', 'yeyuno'],
        ['Íleon', 'íleon'],
        ['Íleon terminal', 'íleon terminal'],
        ['Ciego y colon derecho', 'ciego y colon derecho'],
        ['Colon transverso', 'colon transverso'],
        ['Colon izquierdo', 'colon izquierdo'],
        ['Sigmoides', 'colon sigmoides']
      ] },
      { id: 'estado', l: 'Estado del segmento', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Isquemia sin necrosis', 'Isquemia intestinal sin necrosis transmural'],
        ['Necrosis transmural', 'Necrosis intestinal transmural'],
        ['Necrosis con perforación', 'Necrosis intestinal con perforación'],
        ['Perforación sin necrosis', 'Perforación intestinal sin necrosis de la pared vecina'],
        ['Lesión traumática', 'Lesión traumática de la pared intestinal con compromiso de más del 50 % de la circunferencia'],
        ['Desgarro mesentérico', 'Desgarro del mesenterio con desvascularización del segmento']
      ] },
      { id: 'pulso', l: 'Pulso mesentérico', sec: 'C', k: 'opt', if: ['causa', 'Isquemia mesentérica'], o: [
        ['Presente', 'Pulso arterial mesentérico presente'],
        ['Ausente', 'Pulso arterial mesentérico ausente en {d}'],
        ['Trombosis venosa', 'Signos de trombosis venosa mesentérica']
      ], ph: 'territorio' },
      { id: 'contam', l: 'Contaminación', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin contaminación', 'Sin contaminación de la cavidad'],
        ['Localizada', 'Contaminación localizada'],
        ['Generalizada', 'Contaminación generalizada'],
        ['Fecaloidea', 'Contaminación fecaloidea generalizada']
      ] },
      { id: 'viab', l: 'Criterios de viabilidad del remanente', sec: 'C', k: 'multi', req: 1, q: 1, p: 'Intestino remanente con {v}', o: [
        ['Coloración conservada', 'coloración conservada'],
        ['Peristalsis', 'peristalsis presente'],
        ['Sangrado de bordes', 'sangrado de los bordes de sección'],
        ['Pulso mesentérico', 'pulso mesentérico palpable'],
        ['Fluorescencia', 'perfusión confirmada por fluorescencia con verde de indocianina'],
        ['Viabilidad dudosa', 'zonas de viabilidad dudosa en {d}']
      ], ph: 'localización' },
      { id: 'vic', l: 'Válvula ileocecal', sec: 'C', k: 'opt', o: [
        ['Preservada', 'Se preserva la válvula ileocecal'],
        ['Resecada', 'Se reseca la válvula ileocecal']
      ] },

      { id: 'mes', l: 'Sección del mesenterio', sec: 'D', k: 'opt', o: [
        ['Ligaduras sucesivas', 'ligaduras sucesivas'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Próxima al intestino', 'ligaduras próximas a la pared intestinal']
      ] },
      { id: 'secc', l: 'Sección intestinal', sec: 'D', k: 'opt', o: [
        ['Sutura mecánica lineal', 'sutura mecánica lineal cortante'],
        ['Entre pinzas', 'bisturí entre pinzas intestinales']
      ] },
      { id: 'atec', l: 'Técnica de anastomosis', sec: 'D', k: 'opt', req: 1, q: 1, if: ['estrat', 'Anastomosis primaria'], o: [
        ['Manual en un plano', 'manual en un plano'],
        ['Manual en dos planos', 'manual en dos planos'],
        ['Mecánica lineal con cierre manual', 'mecánica con sutura lineal y cierre manual de la boca de enterotomía']
      ] },
      { id: 'conf', l: 'Configuración', sec: 'D', k: 'opt', if: ['estrat', 'Anastomosis primaria'], o: ANAS_CONF },
      { id: 'otipo', l: 'Tipo de ostomía', sec: 'D', k: 'opt', req: 1, q: 1, if: ['estrat', 'Ostomía'], o: [
        ['Ileostomía terminal', 'ileostomía terminal'],
        ['Yeyunostomía terminal', 'yeyunostomía terminal'],
        ['Colostomía terminal', 'colostomía terminal'],
        ['Cabos separados (doble boca)', 'ostomía en doble boca con cabos separados']
      ] },
      { id: 'oloc', l: 'Localización de la ostomía', sec: 'D', k: 'opt', if: ['estrat', 'Ostomía'], o: LOC_OST },
      { id: 'revasc', l: 'Revascularización', sec: 'D', k: 'opt', if: ['causa', 'Isquemia mesentérica'], o: [
        ['No se realiza', 'No se realiza procedimiento de revascularización'],
        ['Por cirugía vascular', 'Se realiza revascularización mesentérica por el equipo de cirugía vascular, {d}'],
        ['Endovascular previa', 'Revascularización endovascular realizada previamente']
      ], ph: 'técnica' },

      { id: 'long', l: 'Longitud resecada', sec: 'F', k: 'num', q: 1, u: 'cm', p: 'Pieza de aproximadamente {v} cm de longitud' },
      { id: 'remn', l: 'Intestino delgado remanente', sec: 'F', k: 'num', req: 1, q: 1, u: 'cm', p: 'Se estima un intestino delgado remanente de {v} cm' },

      { id: 'cierre', l: 'Cierre abdominal', sec: 'G', k: 'opt', req: 1, q: 1, o: CIERRE_LAP },
      { id: 'reex', l: 'Reexploración planificada', sec: 'H', k: 'opt', req: 1, q: 1, o: [
        ['Programada', 'Se planifica reexploración programada en {d}'],
        ['A demanda', 'Se indica reexploración a demanda según evolución'],
        ['No se planifica', 'No se planifica reexploración']
      ], ph: '24 a 48 horas' }
    ],
    pasos: [
      'Se realiza apertura de la cavidad peritoneal y se aspira el contenido',
      'Se toma muestra del líquido peritoneal para cultivo',
      'Se realiza exploración de la cavidad abdominal y se recorre todo el intestino desde el ángulo de Treitz hasta el recto',
      { t: 'Se palpa el pulso de la arteria mesentérica superior en la raíz del mesenterio', if: ['causa', 'Isquemia mesentérica'] },
      { t: 'Se realiza devolvulación del segmento', if: ['causa', 'Vólvulo'] },
      { t: 'Se libera el anillo herniario y se evalúa el asa tras aplicación de compresas tibias', if: ['causa', 'Hernia estrangulada'] },
      'Se definen los márgenes de resección en intestino viable',
      'Se realiza sección del mesenterio con {mes}',
      'Se realiza sección intestinal proximal y distal con {secc}',
      { t: 'Se realiza anastomosis {conf}, {atec}', if: ['estrat', 'Anastomosis primaria'] },
      { t: 'Se confecciona {otipo} en {oloc}', if: ['estrat', 'Ostomía'] },
      { t: 'Se dejan los cabos intestinales cerrados con sutura mecánica, en discontinuidad', if: ['estrat', 'Control de daños (cabos cerrados)'] },
      'Se mide el intestino delgado remanente',
      'Se realiza lavado de la cavidad con solución fisiológica tibia'
    ],
    ej: 'Resección intestinal de urgencia por isquemia mesentérica. Se realiza resección con cierre de los cabos en discontinuidad, según estrategia de control de daños. Se realiza laparotomía mediana supra e infraumbilical. Se realiza apertura de la cavidad peritoneal y se aspira el contenido, y se toma muestra del líquido peritoneal para cultivo. Se realiza exploración de la cavidad abdominal y se recorre todo el intestino desde el ángulo de Treitz hasta el recto. Compromiso de íleon. Necrosis intestinal transmural. Pulso arterial mesentérico presente. Contaminación localizada. Intestino remanente con coloración conservada, peristalsis presente y zonas de viabilidad dudosa en yeyuno distal. Se preserva la válvula ileocecal. Se definen los márgenes de resección en intestino viable, se realiza sección del mesenterio con dispositivo de sellado vascular y sección intestinal proximal y distal con sutura mecánica lineal cortante. Se dejan los cabos intestinales cerrados con sutura mecánica, en discontinuidad. Pieza de aproximadamente 120 cm de longitud. Se estima un intestino delgado remanente de 220 cm. Se envía pieza a Anatomía Patológica. Se deja abdomen abierto con sistema de terapia de presión negativa. Se planifica reexploración programada en 24 a 48 horas. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 15. Cierre de perforación gastroduodenal ─────────────────────────────
  {
    id: 'cg-perf',
    n: 'Cierre de perforación gastroduodenal, con o sin parche',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Abdomen agudo y trauma',
    v: 1,
    syn: ['úlcera perforada', 'perforación duodenal', 'perforación gástrica', 'úlcera péptica perforada', 'rafia', 'parche de epiplón', 'Graham', 'Cellan-Jones', 'ulcerorrafia'],
    ref: R_PPU + S + R_IAI + S + R_RCS,
    rev: REV,
    ctx: 'Úlcera péptica gastroduodenal perforada. En perforaciones menores de 2 cm, cierre primario con o sin parche de epiplón; laparoscópico en paciente estable. Las úlceras gástricas grandes o con sospecha de malignidad requieren biopsia o resección. Las resecciones gástricas se documentan aparte.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: VIA_3 },
      { id: 'org', l: 'Localización', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Duodenal', 'Perforación de la cara anterior del bulbo duodenal'],
        ['Pilórica', 'Perforación pilórica'],
        ['Prepilórica', 'Perforación gástrica prepilórica'],
        ['Gástrica', 'Perforación gástrica en {d}']
      ], ph: 'cuerpo, antro, curvatura menor' },
      { id: 'neumo', l: 'Neumoperitoneo', sec: 'B', k: 'opt', if: ['via', LAPS], o: NEUMO_O },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', if: ['via', OPEN], o: [
        ['Mediana supraumbilical', 'Se realiza laparotomía mediana supraumbilical'],
        ['Mediana supra e infraumbilical', 'Se realiza laparotomía mediana supra e infraumbilical']
      ] },

      { id: 'diam', l: 'Diámetro de la perforación', sec: 'C', k: 'num', req: 1, q: 1, u: 'mm', p: 'Perforación de {v} mm de diámetro' },
      { id: 'bord', l: 'Bordes', sec: 'C', k: 'opt', q: 1, o: [
        ['Blandos', 'Bordes de la perforación blandos'],
        ['Indurados', 'Bordes de la perforación indurados'],
        ['Friables', 'Bordes de la perforación friables'],
        ['Sospechosos de malignidad', 'Bordes de aspecto sospechoso de malignidad']
      ] },
      { id: 'liq', l: 'Contaminación', sec: 'C', k: 'opt', q: 1, o: [
        ['Localizada supramesocolónica', 'Líquido bilioso y fibrina localizados en el espacio supramesocolónico'],
        ['Generalizada', 'Peritonitis generalizada con líquido bilioso y fibrina'],
        ['Con restos alimentarios', 'Peritonitis generalizada con restos alimentarios'],
        ['Purulenta', 'Peritonitis purulenta generalizada']
      ] },
      { id: 'otras', l: 'Otros hallazgos gastroduodenales', sec: 'C', k: 'multi', o: [
        ['Sin otras lesiones', 'Sin otras lesiones gastroduodenales visibles'],
        ['Úlcera en espejo', 'Úlcera en cara posterior del bulbo'],
        ['Estenosis pilórica', 'Signos de estenosis pilórica'],
        ['Sangrado', 'Sangrado activo por la úlcera']
      ] },

      { id: 'tcier', l: 'Técnica de cierre', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Rafia simple', 'rafia simple con puntos separados'],
        ['Rafia con parche de epiplón (Cellan-Jones)', 'rafia con puntos separados y parche de epiplón pediculado anudado sobre la sutura'],
        ['Parche de epiplón sin rafia (Graham)', 'parche de epiplón pediculado fijado sobre la perforación con puntos que se anudan sobre el epiplón'],
        ['Resección en cuña', 'resección en cuña de la úlcera y cierre de la pared gástrica']
      ] },
      { id: 'biop', l: 'Biopsia de bordes', sec: 'D', k: 'opt', q: 1, if: ['org', ['Gástrica', 'Prepilórica', 'Pilórica']], o: [
        ['Se toma biopsia', 'Se toma biopsia de los bordes de la úlcera'],
        ['Biopsia por congelación', 'Se toma biopsia de los bordes de la úlcera para estudio por congelación'],
        ['No se toma', 'No se toma biopsia de los bordes de la úlcera']
      ] },
      { id: 'estanq', l: 'Prueba de estanqueidad', sec: 'D', k: 'opt', o: [
        ['No realizada', 'No se realiza prueba de estanqueidad'],
        ['Aire por sonda sin fuga', 'Se realiza prueba de estanqueidad con insuflación de aire por sonda nasogástrica bajo solución, sin evidencia de fuga'],
        ['Colorante sin fuga', 'Se realiza prueba de estanqueidad con colorante por sonda nasogástrica, sin evidencia de fuga'],
        ['Fuga reparada', 'Se realiza prueba de estanqueidad con evidencia de fuga, que se repara con puntos adicionales']
      ] },
      { id: 'sng', l: 'Sonda nasogástrica', sec: 'D', k: 'yn', y: 'Se verifica la posición de la sonda nasogástrica en el estómago', n: 'No se coloca sonda nasogástrica' },
      CONV, CONVM,

      { id: 'sut', l: 'Material de sutura', sec: 'E', k: 'text', q: 1, p: 'Para el cierre se utiliza {v}', ph: 'poliglactina 2-0, puntos separados' },

      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['Supramesocolónico', 'Se realiza lavado y aspiración del espacio supramesocolónico'],
        ['Cuatro cuadrantes y pelvis', 'Se realiza lavado y aspiración de los cuatro cuadrantes y la pelvis'],
        ['Aspiración sin lavado', 'Se realiza aspiración del contenido, sin lavado']
      ] },
      { id: 'lavvol', l: 'Volumen de lavado', sec: 'G', k: 'num', u: 'mL', p: 'Se utilizan {v} mL de solución fisiológica tibia para el lavado' }
    ],
    pasos: [
      { t: 'Se accede a la cavidad peritoneal a nivel umbilical y se realiza neumoperitoneo {neumo}', if: ['via', LAPS] },
      { t: 'Se colocan los trocares accesorios bajo visión directa', if: ['via', LAPS] },
      'Se realiza exploración de la cavidad abdominal',
      { t: 'Se evacua el neumoperitoneo y se realiza conversión a laparotomía', if: ['via', 'Convertida a abierta'] },
      'Se aspira el contenido y se toma muestra para cultivo',
      'Se separa el lóbulo hepático izquierdo y se expone la región antropilórica y el bulbo duodenal',
      'Se identifica la perforación',
      'Se moviliza un pedículo de epiplón mayor bien vascularizado',
      'Se realiza cierre de la perforación con {tcier}, en sentido transversal al eje del órgano',
      'Se revisa la línea de sutura'
    ],
    ej: 'Se realiza abordaje laparoscópico. Perforación de la cara anterior del bulbo duodenal. Se accede a la cavidad peritoneal a nivel umbilical con técnica abierta de Hasson y se realiza neumoperitoneo, y se colocan los trocares accesorios bajo visión directa. Se realiza exploración de la cavidad abdominal. Perforación de 6 mm de diámetro. Bordes de la perforación blandos. Peritonitis generalizada con líquido bilioso y fibrina. Sin otras lesiones gastroduodenales visibles. Se aspira el contenido y se toma muestra para cultivo, se expone el bulbo duodenal y se identifica la perforación. Se realiza cierre de la perforación con rafia con puntos separados y parche de epiplón pediculado anudado sobre la sutura, en sentido transversal al eje del órgano. Se realiza prueba de estanqueidad con insuflación de aire por sonda nasogástrica bajo solución, sin evidencia de fuga. Se completa el procedimiento por vía laparoscópica, sin conversión. Para el cierre se utiliza poliglactina 2-0, puntos separados. Se realiza lavado y aspiración de los cuatro cuadrantes y la pelvis. Se coloca drenaje tipo Blake en espacio subhepático. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 16. Confección de ileostomía (y colostomía) ─────────────────────────────
  {
    id: 'cg-ost',
    n: 'Confección de ileostomía',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Colorrectal',
    v: 2,
    syn: ['ileostomía', 'ileostomía en asa', 'ileostomía terminal', 'ileostomía de protección', 'ostomía', 'estoma', 'Brooke', 'derivación intestinal'],
    ref: R_OST + S + R_RCS,
    rev: REV,
    ctx: 'Derivación intestinal terminal o en asa: protección de una anastomosis, obstrucción, perforación, sepsis pelviana, enfermedad perianal o como parte de una resección. Se recomienda sitio marcado en el preoperatorio cuando es posible. La ileostomía se madura con eversión (Brooke); la colostomía, habitualmente al ras.',
    lat: false,
    f: [
      { id: 'org', l: 'Órgano', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, p: 'Se confecciona {v}', o: [
        ['Ileostomía', 'ileostomía'],
        ['Colostomía', 'colostomía']
      ] },
      { id: 'conf', l: 'Configuración', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, p: 'Ostomía {v}', o: [
        ['En asa', 'en asa'],
        ['Terminal', 'terminal'],
        ['Doble boca (cabos separados)', 'en doble boca con cabos separados'],
        ['Terminal con fístula mucosa', 'terminal con fístula mucosa del cabo distal']
      ] },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: [
        ['Trepanación local', 'Se realiza la ostomía por trepanación local, sin laparotomía'],
        ['Laparoscópica', 'Se realiza abordaje laparoscópico para la movilización del segmento'],
        ['Durante laparotomía', 'Se confecciona la ostomía en el curso de la laparotomía']
      ] },
      { id: 'marca', l: 'Marcación preoperatoria', sec: 'B', k: 'yn', q: 1, y: 'Sitio de ostomía marcado en el preoperatorio', n: 'Sin marcación preoperatoria del sitio de ostomía' },

      { id: 'seg', l: 'Segmento exteriorizado', sec: 'C', k: 'opt', req: 1, q: 1, p: 'Segmento exteriorizado {v}', o: [
        ['Íleon terminal', 'del íleon terminal'],
        ['Íleon distal', 'del íleon distal'],
        ['Colon transverso', 'del colon transverso'],
        ['Colon descendente', 'del colon descendente'],
        ['Colon sigmoides', 'del colon sigmoides']
      ] },
      { id: 'distv', l: 'Distancia a la válvula ileocecal', sec: 'C', k: 'num', if: ['org', 'Ileostomía'], u: 'cm', p: 'Asa exteriorizada a {v} cm de la válvula ileocecal' },
      { id: 'viab', l: 'Viabilidad', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Viable', 'Cabo intestinal viable, de coloración rosada y con sangrado de los bordes'],
        ['Congestivo', 'Cabo intestinal con signos de congestión venosa'],
        ['Viabilidad dudosa', 'Cabo intestinal de viabilidad dudosa']
      ] },
      { id: 'pared', l: 'Pared abdominal', sec: 'C', k: 'opt', o: [
        ['Sin particularidades', 'Pared abdominal sin particularidades en el sitio elegido'],
        ['Panículo adiposo grueso', 'Panículo adiposo grueso en el sitio elegido'],
        ['Mesenterio corto', 'Mesenterio corto que limita la exteriorización']
      ] },

      { id: 'loc', l: 'Localización', sec: 'D', k: 'opt', req: 1, q: 1, o: LOC_OST },
      { id: 'trep', l: 'Tamaño de la trepanación', sec: 'D', k: 'num', u: 'cm', p: 'Trepanación de aproximadamente {v} cm de diámetro' },
      { id: 'orient', l: 'Orientación del asa', sec: 'D', k: 'opt', if: ['conf', 'En asa'], o: [
        ['Aferente cefálico', 'Se orienta el asa con el cabo aferente en posición cefálica'],
        ['Aferente caudal', 'Se orienta el asa con el cabo aferente en posición caudal']
      ] },
      { id: 'fij', l: 'Fijación a la pared', sec: 'D', k: 'opt', o: [
        ['A la aponeurosis', 'Se fija el intestino a la aponeurosis con puntos seromusculares'],
        ['Sin fijación aponeurótica', 'No se fija el intestino a la aponeurosis']
      ] },
      { id: 'mad', l: 'Maduración', sec: 'D', k: 'opt', q: 1, o: MAD_O },
      { id: 'malla', l: 'Malla profiláctica paraestomal', sec: 'E', k: 'text', p: 'Se coloca malla profiláctica {v}', ph: 'de polipropileno de bajo peso en posición retromuscular' },
      { id: 'varilla', l: 'Varilla de soporte', sec: 'E', k: 'yn', if: ['conf', 'En asa'], y: 'Se coloca varilla de soporte bajo el asa', n: 'No se coloca varilla de soporte' },

      { id: 'prot', l: 'Protrusión', sec: 'G', k: 'num', q: 1, u: 'cm', p: 'Ostomía con protrusión de {v} cm sobre el plano cutáneo' },
      { id: 'bolsa', l: 'Dispositivo colector', sec: 'G', k: 'yn', y: 'Se coloca dispositivo colector', n: 'No se coloca dispositivo colector' },

      { id: 'func', l: 'Funcionamiento inicial', sec: 'H', k: 'opt', o: [
        ['No observado', 'Funcionamiento de la ostomía no observado al finalizar'],
        ['Emisión de gases', 'Ostomía con emisión de gases al finalizar'],
        ['Débito intestinal', 'Ostomía con débito de contenido intestinal al finalizar']
      ] }
    ],
    pasos: [
      { t: 'Se realiza exploración laparoscópica y se identifica el segmento a exteriorizar', if: ['via', 'Laparoscópica'] },
      'Se moviliza el segmento intestinal para su exteriorización sin tensión',
      'Se realiza trepanación de la pared abdominal en {loc}, con resección circular de piel y tejido celular subcutáneo',
      'Se realiza apertura cruciforme de la aponeurosis anterior y divulsión del músculo recto',
      'Se abre el peritoneo y se calibra el orificio',
      'Se exterioriza el intestino a través del orificio de la pared',
      { t: 'Se pasa una cinta o varilla por el meso del asa a nivel de su borde mesentérico', if: ['conf', 'En asa'] },
      { t: 'Se secciona el intestino y se cierra el cabo distal', if: ['conf', 'Terminal'] },
      'Se completa el cierre de la laparotomía y se protege la herida antes de la apertura de la ostomía',
      { t: 'Se realiza enterotomía transversal en el borde antimesentérico del asa', if: ['conf', 'En asa'] },
      'Se confecciona {org} {conf} a expensas {seg}'
    ],
    ej: 'Se confecciona ileostomía en asa. Se confecciona la ostomía en el curso de la laparotomía. Sitio de ostomía marcado en el preoperatorio. Segmento exteriorizado del íleon terminal. Asa exteriorizada a 25 cm de la válvula ileocecal. Cabo intestinal viable, de coloración rosada y con sangrado de los bordes. Se moviliza el segmento intestinal para su exteriorización sin tensión. Se realiza trepanación de la pared abdominal en fosa ilíaca derecha, con resección circular de piel y tejido celular subcutáneo, apertura cruciforme de la aponeurosis anterior y divulsión del músculo recto. Se exterioriza el intestino y se orienta el asa con el cabo aferente en posición cefálica. Se completa el cierre de la laparotomía antes de la apertura de la ostomía y se realiza enterotomía transversal en el borde antimesentérico del asa. Se realiza maduración primaria con eversión según técnica de Brooke y fijación mucocutánea con puntos separados. No se coloca varilla de soporte. Ostomía con protrusión de 2 cm sobre el plano cutáneo. Se coloca dispositivo colector. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 17. Confección de colostomía (alias) ─────────────────────────────
  {
    id: 'cg-col',
    n: 'Confección de colostomía',
    cat: CAT,
    syn: ['colostomía', 'colostomía en asa', 'colostomía terminal', 'colostomía derivativa', 'sigmoidostomía', 'transversostomía', 'estoma'],
    alias: 'cg-ost',
    set: { org: 'Colostomía' }
  },

  // ───────────────────────────── 18. Cierre de ostomía ─────────────────────────────
  {
    id: 'cg-cost',
    n: 'Cierre de ostomía',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Colorrectal',
    v: 1,
    syn: ['cierre de ileostomía', 'cierre de colostomía', 'reconstrucción del tránsito', 'restitución del tránsito', 'reversión de Hartmann', 'reconstrucción de Hartmann', 'cierre de estoma'],
    ref: R_OST + S + R_DIV + S + R_RCS,
    rev: REV,
    ctx: 'Restitución del tránsito intestinal tras ileostomía o colostomía en asa (cierre local periestomal) o tras operación de Hartmann (habitualmente por laparotomía o laparoscopia, con anastomosis colorrectal). Se documenta estudio previo de la anastomosis distal o del muñón rectal, técnica de anastomosis, estanqueidad y manejo de la herida.',
    lat: false,
    f: [
      { id: 'tipo', l: 'Tipo de cierre', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Ileostomía en asa', 'Se realiza cierre de ileostomía en asa'],
        ['Colostomía en asa', 'Se realiza cierre de colostomía en asa'],
        ['Reconstrucción tras Hartmann', 'Se realiza reconstrucción del tránsito tras operación de Hartmann']
      ] },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: [
        ['Periestomal', 'Se realiza abordaje local periestomal'],
        ['Laparotomía', 'Se realiza laparotomía'],
        ['Laparoscópica', 'Se realiza abordaje laparoscópico'],
        ['Convertida a abierta', 'Se inicia abordaje laparoscópico con conversión a cirugía abierta']
      ] },
      { id: 'prev', l: 'Estudio distal previo', sec: 'B', k: 'opt', o: [
        ['Sin estenosis ni fuga', 'Estudio contrastado o endoscópico previo del cabo distal sin estenosis ni fuga'],
        ['No realizado', 'Sin estudio previo del cabo distal'],
        ['Con hallazgos', 'Estudio previo del cabo distal con {d}']
      ], ph: 'hallazgo' },

      { id: 'adh', l: 'Adherencias', sec: 'C', k: 'opt', o: [
        ['Sin adherencias', 'Sin adherencias significativas'],
        ['Periestomales', 'Adherencias periestomales'],
        ['Firmes en pelvis', 'Adherencias firmes en pelvis sobre el muñón rectal'],
        ['Generalizadas', 'Síndrome adherencial generalizado']
      ] },
      { id: 'herpe', l: 'Hernia paraestomal', sec: 'C', k: 'opt', o: [
        ['Sin hernia', 'Sin hernia paraestomal'],
        ['Con hernia', 'Hernia paraestomal con defecto aponeurótico de {d}']
      ], ph: 'tamaño en cm' },
      { id: 'munon', l: 'Muñón rectal', sec: 'C', k: 'opt', q: 1, if: ['tipo', 'Reconstrucción tras Hartmann'], o: [
        ['Identificado sin dificultad', 'Muñón rectal identificado, con puntos de reparo visibles'],
        ['Identificado con dilatador transanal', 'Muñón rectal identificado con ayuda de dilatador transanal'],
        ['Con dificultad', 'Muñón rectal identificado con dificultad por fibrosis pelviana']
      ] },
      { id: 'idp', l: 'Estructuras identificadas y preservadas', sec: 'C', k: 'multi', if: ['tipo', 'Reconstrucción tras Hartmann'], p: 'Se identifican y preservan {v}', o: [
        ['Uréter izquierdo', 'uréter izquierdo'],
        ['Nervios hipogástricos', 'nervios hipogástricos'],
        ['Vasos ilíacos', 'vasos ilíacos izquierdos']
      ] },

      { id: 'atec', l: 'Técnica de restitución', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Enterorrafia transversal', 'cierre transversal de la enterotomía, sin resección'],
        ['Resección y latero-lateral mecánica', 'resección del segmento de la ostomía y anastomosis latero-lateral mecánica'],
        ['Resección y término-terminal manual', 'resección del segmento de la ostomía y anastomosis término-terminal manual'],
        ['Colorrectal circular (doble grapado)', 'anastomosis colorrectal término-terminal mecánica con sutura circular transanal'],
        ['Colorrectal circular término-lateral', 'anastomosis colorrectal término-lateral mecánica con sutura circular transanal'],
        ['Colorrectal manual', 'anastomosis colorrectal manual']
      ] },
      { id: 'angesp', l: 'Ángulo esplénico', sec: 'D', k: 'yn', if: ['tipo', 'Reconstrucción tras Hartmann'], y: 'Se realiza movilización del ángulo esplénico', n: 'No se moviliza el ángulo esplénico' },
      { id: 'anillos', l: 'Anillos de la sutura circular', sec: 'D', k: 'yn', if: ['atec', ['Colorrectal circular (doble grapado)', 'Colorrectal circular término-lateral']], y: 'Se constatan anillos de la sutura circular completos', n: 'Anillos de la sutura circular incompletos' },
      { id: 'estanq', l: 'Prueba de estanqueidad', sec: 'D', k: 'opt', o: ESTANQ_O },
      { id: 'perf', l: 'Perfusión de los cabos', sec: 'D', k: 'opt', o: [
        ['Clínica', 'Se evalúa la perfusión de los cabos por coloración y sangrado de los bordes'],
        ['Fluorescencia', 'Se evalúa la perfusión de los cabos con fluorescencia con verde de indocianina']
      ] },
      { id: 'prot', l: 'Ostomía de protección', sec: 'D', k: 'opt', if: ['tipo', 'Reconstrucción tras Hartmann'], o: [
        ['No', 'No se confecciona ostomía de protección'],
        ['Ileostomía en asa', 'Se confecciona ileostomía en asa de protección']
      ] },
      CONV, CONVM,

      { id: 'carga', l: 'Grapadoras y cargas', sec: 'E', k: 'text', p: 'Se utilizan {v}', ph: 'sutura mecánica lineal de 75 mm con 2 cargas' },
      { id: 'mallap', l: 'Malla en el sitio de la ostomía', sec: 'E', k: 'text', p: 'Se coloca malla {v} en el sitio de la ostomía', ph: 'de polipropileno en posición retromuscular' },

      { id: 'cierreap', l: 'Cierre aponeurótico del sitio', sec: 'G', k: 'opt', o: [
        ['Puntos separados', 'Se cierra la aponeurosis del sitio de ostomía con puntos separados'],
        ['Sutura continua', 'Se cierra la aponeurosis del sitio de ostomía con sutura continua']
      ] },
      { id: 'piel', l: 'Cierre cutáneo', sec: 'G', k: 'opt', q: 1, o: [
        ['Jareta', 'Se cierra la piel del sitio de ostomía con sutura en jareta, dejando un orificio central'],
        ['Lineal', 'Se cierra la piel del sitio de ostomía en forma lineal'],
        ['Abierta', 'Se deja la herida del sitio de ostomía abierta para cierre por segunda intención'],
        ['Presión negativa', 'Se coloca sistema de terapia de presión negativa en la herida del sitio de ostomía']
      ] }
    ],
    pasos: [
      { t: 'Se realiza incisión periestomal circunferencial a nivel de la unión mucocutánea', if: ['via', 'Periestomal'] },
      { t: 'Se diseca el asa del tejido celular subcutáneo y de la aponeurosis hasta liberar la cavidad peritoneal', if: ['via', 'Periestomal'] },
      { t: 'Se desmonta la colostomía terminal y se cierra o se protege el cabo', if: ['tipo', 'Reconstrucción tras Hartmann'] },
      { t: 'Se accede a la cavidad y se realiza adhesiólisis', if: ['via', ['Laparotomía', 'Laparoscópica', 'Convertida a abierta']] },
      { t: 'Se libera el muñón rectal de las adherencias pelvianas', if: ['tipo', 'Reconstrucción tras Hartmann'] },
      { t: 'Se coloca el yunque de la sutura circular en el cabo de colon con jareta', if: ['atec', ['Colorrectal circular (doble grapado)', 'Colorrectal circular término-lateral']] },
      'Se exterioriza el asa y se resecan los bordes cutáneos y la mucosa evertida',
      'Se realiza restitución del tránsito con {atec}',
      'Se reintroduce el intestino en la cavidad',
      'Se recambian guantes e instrumental antes del cierre'
    ],
    ej: 'Se realiza cierre de ileostomía en asa. Se realiza abordaje local periestomal. Estudio contrastado o endoscópico previo del cabo distal sin estenosis ni fuga. Se realiza incisión periestomal circunferencial a nivel de la unión mucocutánea y se diseca el asa del tejido celular subcutáneo y de la aponeurosis hasta liberar la cavidad peritoneal. Adherencias periestomales. Sin hernia paraestomal. Se exterioriza el asa y se realiza restitución del tránsito con resección del segmento de la ostomía y anastomosis latero-lateral mecánica. Se reintroduce el intestino en la cavidad. Se envía pieza a Anatomía Patológica. Se cierra la aponeurosis del sitio de ostomía con puntos separados. Se cierra la piel del sitio de ostomía con sutura en jareta, dejando un orificio central. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 19. Gastrostomía quirúrgica ─────────────────────────────
  {
    id: 'cg-gtt',
    n: 'Gastrostomía quirúrgica',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Esófago-gástrica',
    v: 1,
    syn: ['gastrostomía', 'Stamm', 'Janeway', 'gastrostomía laparoscópica', 'sonda de gastrostomía', 'GTT', 'alimentación enteral'],
    ref: R_STAMM + S + R_ESPEN + S + R_RCS,
    rev: REV,
    ctx: 'Acceso enteral de largo plazo o descompresión gástrica cuando la gastrostomía endoscópica o percutánea no es posible o está contraindicada, o como gesto asociado a otra cirugía. Técnica de Stamm (sonda con jaretas concéntricas y gastropexia), Janeway (tubo gástrico) o laparoscópica con gastropexia.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: [
        ['Abierta', 'Se realiza abordaje abierto'],
        ['Laparoscópica', 'Se realiza abordaje laparoscópico']
      ] },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Stamm', 'Se realiza gastrostomía según técnica de Stamm'],
        ['Janeway', 'Se realiza gastrostomía según técnica de Janeway, con tubo gástrico'],
        ['Con anclajes en T', 'Se realiza gastrostomía con gastropexia mediante anclajes en T']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', if: ['via', 'Abierta'], o: [
        ['Mediana supraumbilical', 'Se realiza laparotomía mediana supraumbilical corta'],
        ['Transversa izquierda', 'Se realiza incisión transversa en hipocondrio izquierdo'],
        ['Por la laparotomía de otro procedimiento', 'Se realiza a través de la laparotomía del procedimiento asociado']
      ] },

      { id: 'estom', l: 'Estómago', sec: 'C', k: 'opt', o: [
        ['Sin particularidades', 'Estómago sin particularidades, que alcanza la pared sin tensión'],
        ['Pequeño o retraído', 'Estómago de tamaño reducido o retraído'],
        ['Distendido', 'Estómago distendido'],
        ['Con lesión', 'Estómago con {d}']
      ], ph: 'hallazgo' },
      { id: 'sitio', l: 'Sitio de gastrotomía', sec: 'D', k: 'opt', q: 1, o: [
        ['Cara anterior del cuerpo', 'cara anterior del cuerpo gástrico, próxima a la curvatura mayor'],
        ['Cara anterior del antro', 'cara anterior del antro gástrico'],
        ['Otro', '{d}']
      ], ph: 'localización' },
      { id: 'jar', l: 'Jaretas', sec: 'D', k: 'opt', if: ['tec', 'Stamm'], o: [
        ['Dos concéntricas', 'Se colocan dos jaretas seromusculares concéntricas'],
        ['Una', 'Se coloca una jareta seromuscular']
      ] },
      { id: 'sonda', l: 'Tipo de sonda', sec: 'E', k: 'opt', req: 1, q: 1, o: [
        ['De gastrostomía con balón', 'sonda de gastrostomía con balón y tope externo'],
        ['De bajo perfil', 'dispositivo de gastrostomía de bajo perfil'],
        ['Tipo Pezzer o Malecot', 'sonda tipo Pezzer'],
        ['Foley', 'sonda tipo Foley']
      ] },
      { id: 'fr', l: 'Calibre', sec: 'E', k: 'num', q: 1, u: 'Fr', p: 'Sonda de {v} Fr' },
      { id: 'balon', l: 'Volumen del balón', sec: 'E', k: 'num', u: 'mL', p: 'Balón insuflado con {v} mL de agua estéril' },
      { id: 'pexia', l: 'Gastropexia', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Puntos a peritoneo y aponeurosis', 'Se fija la pared gástrica al peritoneo parietal y a la aponeurosis con puntos alrededor del orificio de salida'],
        ['Anclajes en T', 'Se fija la pared gástrica a la pared abdominal con anclajes en T'],
        ['Puntos transparietales', 'Se fija la pared gástrica a la pared abdominal con puntos transparietales']
      ] },
      { id: 'salida', l: 'Sitio de salida', sec: 'D', k: 'opt', o: [
        ['Hipocondrio izquierdo', 'hipocondrio izquierdo'],
        ['Epigastrio izquierdo', 'epigastrio, a la izquierda de la línea media']
      ] },
      { id: 'fijext', l: 'Fijación externa', sec: 'G', k: 'opt', o: [
        ['Tope externo', 'Se ajusta el tope externo sin tensión sobre la piel'],
        ['Punto a piel', 'Se fija la sonda a la piel con punto de material irreabsorbible'],
        ['Tope y punto', 'Se ajusta el tope externo y se fija la sonda a la piel con punto']
      ] },
      { id: 'marca', l: 'Marca en piel', sec: 'G', k: 'num', u: 'cm', p: 'Sonda con marca de {v} cm a nivel de la piel' },
      { id: 'perm', l: 'Control de la sonda', sec: 'D', k: 'opt', q: 1, o: [
        ['Permeable sin fuga', 'Se instila solución fisiológica por la sonda, con pasaje libre y sin fuga pericatéter'],
        ['Fuga reforzada', 'Se instila solución fisiológica por la sonda, con fuga pericatéter que se refuerza con puntos'],
        ['No se controla', 'No se realiza control de la sonda con instilación']
      ] }
    ],
    pasos: [
      { t: 'Se accede a la cavidad peritoneal y se realiza neumoperitoneo', if: ['via', 'Laparoscópica'] },
      'Se identifica el estómago y se selecciona el sitio de gastrotomía en {sitio}',
      'Se verifica que el estómago alcance la pared abdominal sin tensión',
      'Se realiza contraabertura en {salida} y se introduce la sonda en la cavidad',
      { t: 'Se colocan dos jaretas seromusculares concéntricas alrededor del sitio elegido', if: ['tec', 'Stamm'] },
      { t: 'Se confecciona un tubo gástrico de pared anterior con sutura mecánica y se exterioriza', if: ['tec', 'Janeway'] },
      { t: 'Se colocan anclajes en T bajo visión laparoscópica y se introduce la sonda por técnica de Seldinger con dilatación', if: ['tec', 'Con anclajes en T'] },
      { t: 'Se realiza gastrotomía, se introduce la sonda y se insufla el balón', if: ['tec', 'Stamm'] },
      { t: 'Se anudan las jaretas invaginando la pared gástrica alrededor de la sonda', if: ['tec', 'Stamm'] },
      'Se fija el estómago a la pared abdominal alrededor del sitio de salida',
      { t: 'Se retiran los trocares bajo visión directa y se evacua el neumoperitoneo', if: ['via', 'Laparoscópica'] }
    ],
    ej: 'Se realiza abordaje abierto. Se realiza gastrostomía según técnica de Stamm. Se realiza laparotomía mediana supraumbilical corta. Estómago sin particularidades, que alcanza la pared sin tensión. Se identifica el estómago y se selecciona el sitio de gastrotomía en cara anterior del cuerpo gástrico, próxima a la curvatura mayor. Se realiza contraabertura en hipocondrio izquierdo y se introduce la sonda en la cavidad. Se colocan dos jaretas seromusculares concéntricas alrededor del sitio elegido, se realiza gastrotomía, se introduce la sonda y se insufla el balón, y se anudan las jaretas invaginando la pared gástrica alrededor de la sonda. Se fija la pared gástrica al peritoneo parietal y a la aponeurosis con puntos alrededor del orificio de salida. Se instila solución fisiológica por la sonda, con pasaje libre y sin fuga pericatéter. Se utiliza sonda de gastrostomía con balón y tope externo de 20 Fr. Balón insuflado con 7 mL de agua estéril. No se obtiene pieza quirúrgica. Se ajusta el tope externo sin tensión sobre la piel. Sonda con marca de 3 cm a nivel de la piel. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 20. Yeyunostomía de alimentación ─────────────────────────────
  {
    id: 'cg-yey',
    n: 'Yeyunostomía de alimentación',
    sp: 'Cirugía general',
    cat: CAT,
    sub: 'Esófago-gástrica',
    v: 1,
    syn: ['yeyunostomía', 'yeyunostomía de Witzel', 'Witzel', 'yeyunostomía con catéter', 'needle catheter jejunostomy', 'NCJ', 'alimentación enteral'],
    ref: R_JEJ + S + R_ESPEN + S + R_RCS,
    rev: REV,
    ctx: 'Acceso enteral pospilórico en cirugía mayor del tracto digestivo superior, desnutrición o imposibilidad de alimentación gástrica. Técnica de Witzel (túnel seroso), catéter con aguja (túnel submucoso) o laparoscópica. Fijación del asa a la pared para evitar torsión y fuga.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, o: [
        ['Abierta', 'Se realiza abordaje abierto'],
        ['Laparoscópica', 'Se realiza abordaje laparoscópico'],
        ['Asociada a otro procedimiento', 'Se realiza en el curso de la laparotomía del procedimiento asociado']
      ] },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Witzel', 'Se realiza yeyunostomía de alimentación según técnica de Witzel'],
        ['Catéter con aguja', 'Se realiza yeyunostomía de alimentación con catéter colocado por punción y túnel submucoso'],
        ['Sonda con balón por Seldinger', 'Se realiza yeyunostomía de alimentación con sonda con balón colocada por técnica de Seldinger']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', if: ['via', 'Abierta'], o: [
        ['Mediana supraumbilical', 'Se realiza laparotomía mediana supraumbilical corta'],
        ['Transversa izquierda', 'Se realiza incisión transversa en hemiabdomen superior izquierdo']
      ] },

      { id: 'distt', l: 'Distancia al ángulo de Treitz', sec: 'C', k: 'num', req: 1, q: 1, u: 'cm', p: 'Se selecciona asa yeyunal a {v} cm del ángulo de Treitz' },
      { id: 'yey', l: 'Yeyuno', sec: 'C', k: 'opt', o: [
        ['Sin particularidades', 'Yeyuno sin particularidades'],
        ['Edematoso', 'Yeyuno edematoso'],
        ['Adherencias', 'Adherencias en el yeyuno proximal']
      ] },

      { id: 'sonda', l: 'Sonda o catéter', sec: 'E', k: 'opt', req: 1, q: 1, o: [
        ['Sonda de yeyunostomía', 'sonda de yeyunostomía'],
        ['Catéter de yeyunostomía con aguja', 'catéter de yeyunostomía con aguja'],
        ['Sonda con balón', 'sonda con balón'],
        ['Sonda de alimentación de silicona', 'sonda de alimentación de silicona']
      ] },
      { id: 'fr', l: 'Calibre', sec: 'E', k: 'num', q: 1, u: 'Fr', p: 'Sonda de {v} Fr' },
      { id: 'tunel', l: 'Longitud del túnel', sec: 'D', k: 'num', u: 'cm', p: 'Túnel de aproximadamente {v} cm' },
      { id: 'sentido', l: 'Dirección de la sonda', sec: 'D', k: 'opt', o: [
        ['Isoperistáltica', 'Se dirige la sonda en sentido isoperistáltico'],
        ['Antiperistáltica', 'Se dirige la sonda en sentido antiperistáltico']
      ] },
      { id: 'pexia', l: 'Fijación del asa a la pared', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Circunferencial con antitorsión', 'Se fija el asa al peritoneo parietal alrededor del sitio de salida, con puntos antitorsión a 3 a 5 cm del orificio'],
        ['Circunferencial', 'Se fija el asa al peritoneo parietal alrededor del sitio de salida'],
        ['Anclajes en T', 'Se fija el asa a la pared abdominal con anclajes en T']
      ] },
      { id: 'salida', l: 'Sitio de salida', sec: 'D', k: 'opt', o: [
        ['Hipocondrio izquierdo', 'hipocondrio izquierdo'],
        ['Flanco izquierdo', 'flanco izquierdo']
      ] },
      { id: 'perm', l: 'Control de la sonda', sec: 'D', k: 'opt', q: 1, o: [
        ['Permeable sin fuga', 'Se instila solución fisiológica por la sonda, con pasaje libre y sin fuga'],
        ['Fuga reforzada', 'Se instila solución fisiológica por la sonda, con fuga que se refuerza con puntos'],
        ['No se controla', 'No se realiza control de la sonda con instilación']
      ] },
      { id: 'fijext', l: 'Fijación externa', sec: 'G', k: 'opt', o: [
        ['Punto a piel', 'Se fija la sonda a la piel con punto de material irreabsorbible'],
        ['Dispositivo de fijación', 'Se fija la sonda con dispositivo de fijación externa']
      ] },
      { id: 'marca', l: 'Marca en piel', sec: 'G', k: 'num', u: 'cm', p: 'Sonda con marca de {v} cm a nivel de la piel' }
    ],
    pasos: [
      { t: 'Se accede a la cavidad peritoneal, se realiza neumoperitoneo y se coloca al paciente en anti-Trendelenburg', if: ['via', 'Laparoscópica'] },
      'Se identifica el ángulo de Treitz y se selecciona un asa de yeyuno proximal que alcance la pared sin tensión',
      'Se realiza contraabertura en {salida} y se introduce la sonda en la cavidad',
      { t: 'Se coloca una jareta seromuscular en el borde antimesentérico y se realiza enterotomía en su centro', if: ['tec', 'Witzel'] },
      { t: 'Se introduce la sonda en la luz yeyunal y se anuda la jareta', if: ['tec', 'Witzel'] },
      { t: 'Se confecciona un túnel seroso sobre la sonda con puntos seromusculares', if: ['tec', 'Witzel'] },
      { t: 'Se punza la pared yeyunal con la aguja, se realiza túnel submucoso y se avanza el catéter a la luz', if: ['tec', 'Catéter con aguja'] },
      { t: 'Se fija el catéter con jareta seromuscular en el sitio de entrada', if: ['tec', 'Catéter con aguja'] },
      { t: 'Se coloca la guía en la luz yeyunal, se dilata el trayecto y se introduce la sonda con balón', if: ['tec', 'Sonda con balón por Seldinger'] },
      'Se fija el asa a la pared abdominal alrededor del sitio de salida',
      { t: 'Se retiran los trocares bajo visión directa y se evacua el neumoperitoneo', if: ['via', 'Laparoscópica'] }
    ],
    ej: 'Se realiza en el curso de la laparotomía del procedimiento asociado. Se realiza yeyunostomía de alimentación según técnica de Witzel. Se identifica el ángulo de Treitz y se selecciona un asa de yeyuno proximal que alcance la pared sin tensión. Se selecciona asa yeyunal a 30 cm del ángulo de Treitz. Yeyuno sin particularidades. Se realiza contraabertura en hipocondrio izquierdo y se introduce la sonda en la cavidad. Se coloca una jareta seromuscular en el borde antimesentérico y se realiza enterotomía en su centro, se introduce la sonda en la luz yeyunal y se anuda la jareta, y se confecciona un túnel seroso sobre la sonda con puntos seromusculares. Túnel de aproximadamente 5 cm. Se dirige la sonda en sentido isoperistáltico. Se fija el asa al peritoneo parietal alrededor del sitio de salida, con puntos antitorsión a 3 a 5 cm del orificio. Se instila solución fisiológica por la sonda, con pasaje libre y sin fuga. Se utiliza sonda de yeyunostomía de 12 Fr. No se obtiene pieza quirúrgica. Se fija la sonda a la piel con punto de material irreabsorbible. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  }
];
