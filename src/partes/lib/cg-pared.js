// Partes quirúrgicos · Cirugía general — Pared abdominal y hernias, Infecciones, heridas y urgencias, Proctología.
// Datos puros, versión 2 del esquema (ver docs/ESQUEMA_PLANTILLAS.md, secciones 2 y 2.4).
// Convenciones:
// - En `if`/`ifn` sobre un campo opt, el valor es la etiqueta de la opción (o[0]); en yn, 'si' / 'no'.
// - Los pasos condicionados usan solo campos de variante (vr: 1), que se confirman antes de armar la lista de pasos.
// - Los campos citados en un paso con {id} tienen frases-fragmento pensadas para leerse dentro del paso.
// - Sin marcas comerciales: las mallas y los dispositivos se describen por su material o función.
export default [
  // ═════════════════════════════ PARED ABDOMINAL Y HERNIAS ═════════════════════════════

  // ───────────────────────────── Hernioplastia inguinal (abierta, TEP, TAPP) ─────────────────────────────
  {
    id: 'cg-hing',
    n: 'Hernioplastia inguinal abierta',
    sp: 'Cirugía general',
    sub: 'Pared abdominal',
    cat: 'Pared abdominal y hernias',
    syn: ['hernia inguinal', 'Lichtenstein', 'hernioplastia', 'herniorrafia', 'Shouldice', 'Bassini', 'hernia indirecta', 'hernia directa', 'inguinoescrotal', 'TEP', 'TAPP', 'laparoscópica'],
    v: 2,
    rev: '2026-10',
    ref: 'HerniaSurge Group. International guidelines for groin hernia management. Hernia 2018;22:1-165 · Stabilini C et al. Update of the international HerniaSurge guidelines for groin hernia management. BJS Open 2023;7:zrad080 · Royal College of Surgeons of England. Good Surgical Practice, 2014 (registro operatorio)',
    ctx: 'Hernia inguinal primaria o recidivada, uni o bilateral. Una sola plantilla con variante de abordaje: abierto anterior (Lichtenstein o reparación tisular), abierto preperitoneal, TEP o TAPP. La guía HerniaSurge recomienda registrar tipo EHS, abordaje previo en recidivas, manejo de nervios inguinales y datos de la malla.',
    lat: true,
    f: [
      { id: 'lat', l: 'Lateralidad', sec: 'A', k: 'opt', vr: 1, req: 1, q: 1, o: [['Derecha', 'derecha'], ['Izquierda', 'izquierda'], ['Bilateral', 'bilateral']] },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Abierta anterior', 'Se realiza abordaje abierto anterior por incisión inguinal'],
        ['Abierta preperitoneal', 'Se realiza abordaje abierto preperitoneal'],
        ['TEP', 'Se realiza abordaje laparoscópico totalmente extraperitoneal (TEP)'],
        ['TAPP', 'Se realiza abordaje laparoscópico transabdominal preperitoneal (TAPP)']
      ] },
      { id: 'recid', l: 'Primaria o recidivada', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Primaria', 'Hernia primaria'],
        ['Recidivada tras vía anterior', 'Hernia recidivada tras reparación previa por vía anterior'],
        ['Recidivada tras vía posterior', 'Hernia recidivada tras reparación previa por vía posterior (preperitoneal)'],
        ['Re-recidivada', 'Hernia con múltiples recidivas previas']
      ] },
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', q: 1, o: [
        ['Hernia sintomática', 'Indicación quirúrgica por hernia inguinal sintomática'],
        ['Asintomática, decisión compartida', 'Indicación quirúrgica por hernia inguinal asintomática, por decisión compartida con el paciente'],
        ['Incarceración', 'Indicación quirúrgica por hernia inguinal incarcerada'],
        ['Sospecha de estrangulación', 'Indicación quirúrgica por sospecha de estrangulación herniaria']
      ] },
      { id: 'neumo', l: 'Neumoperitoneo (TAPP)', sec: 'B', k: 'opt', if: ['via', 'TAPP'], o: [
        ['Técnica abierta (Hasson)', 'con técnica abierta de Hasson'],
        ['Aguja de Veress', 'con aguja de Veress'],
        ['Trocar óptico', 'con trocar de acceso óptico']
      ] },
      { id: 'acceso', l: 'Creación del espacio (TEP)', sec: 'B', k: 'opt', if: ['via', 'TEP'], o: [
        ['Balón disector', 'con balón disector'],
        ['Disección con la óptica', 'por disección con la óptica']
      ] },
      { id: 'pneu', l: 'Presión de insuflación', sec: 'B', k: 'num', u: 'mmHg', if: ['via', ['TEP', 'TAPP']], p: 'Insuflación a {v} mmHg' },

      { id: 'tipo', l: 'Tipo de hernia', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Indirecta', 'Hernia inguinal indirecta'],
        ['Directa', 'Hernia inguinal directa'],
        ['Mixta (en pantalón)', 'Hernia inguinal mixta, directa e indirecta (en pantalón)'],
        ['Inguinoescrotal', 'Hernia inguinoescrotal'],
        ['Femoral asociada', 'Hernia inguinal con hernia femoral asociada'],
        ['Obturatriz asociada', 'Hernia inguinal con hernia obturatriz asociada']
      ] },
      { id: 'ehs', l: 'Clasificación EHS', sec: 'C', k: 'text', q: 1, p: 'Clasificación EHS {v}', ph: 'P L2 (primaria, lateral, 1,5 a 3 cm)' },
      { id: 'contra', l: 'Lado contralateral (abordaje posterior)', sec: 'C', k: 'opt', if: ['via', ['TEP', 'TAPP']], o: [
        ['Sin defecto contralateral', 'Sin defecto herniario contralateral'],
        ['Defecto contralateral oculto', 'Defecto herniario contralateral no diagnosticado previamente'],
        ['No explorado', 'No se explora el lado contralateral']
      ] },
      { id: 'cont', l: 'Contenido del saco', sec: 'C', k: 'multi', q: 1, o: [
        ['Saco vacío', 'Saco herniario vacío'],
        ['Epiplón', 'Saco con contenido epiploico'],
        ['Intestino delgado', 'Saco con contenido de intestino delgado'],
        ['Colon', 'Saco con contenido de colon'],
        ['Deslizamiento vesical', 'Hernia por deslizamiento con componente vesical'],
        ['Deslizamiento colónico', 'Hernia por deslizamiento con componente colónico'],
        ['Lipoma del cordón', 'Lipoma del cordón asociado'],
        ['Lipoma preperitoneal', 'Lipoma preperitoneal asociado']
      ] },
      { id: 'viab', l: 'Viabilidad del contenido', sec: 'C', k: 'opt', req: 1, q: 1, if: ['indic', ['Incarceración', 'Sospecha de estrangulación']], o: [
        ['Viable', 'Contenido herniario viable'],
        ['Isquemia reversible', 'Contenido herniario con signos de isquemia que revierten tras la liberación'],
        ['Necrosis', 'Contenido herniario con necrosis']
      ] },
      { id: 'piso', l: 'Pared posterior', sec: 'C', k: 'opt', if: ['via', 'Abierta anterior'], o: [
        ['Conservada', 'Pared posterior del conducto inguinal conservada'],
        ['Debilitada', 'Debilidad difusa de la pared posterior del conducto inguinal'],
        ['Defecto localizado', 'Defecto localizado de la pared posterior']
      ] },

      { id: 'cordon', l: 'Cordón o ligamento redondo', sec: 'D', k: 'opt', if: ['via', 'Abierta anterior'], o: [
        ['Cordón preservado', 'Se diseca y preserva el cordón espermático con sus elementos'],
        ['Ligamento redondo preservado', 'Se identifica y preserva el ligamento redondo'],
        ['Ligamento redondo seccionado', 'Se secciona y liga el ligamento redondo']
      ] },
      { id: 'nerv', l: 'Nervios inguinales', sec: 'D', k: 'multi', q: 1, if: ['via', 'Abierta anterior'], o: [
        ['Ilioinguinal preservado', 'Se identifica y preserva el nervio ilioinguinal'],
        ['Iliohipogástrico preservado', 'Se identifica y preserva el nervio iliohipogástrico'],
        ['Rama genital preservada', 'Se identifica y preserva la rama genital del nervio genitofemoral'],
        ['Neurectomía ilioinguinal', 'Se realiza neurectomía del nervio ilioinguinal'],
        ['Neurectomía iliohipogástrica', 'Se realiza neurectomía del nervio iliohipogástrico'],
        ['No identificados', 'No se identifican los nervios inguinales']
      ] },
      { id: 'prev', l: 'Estructuras identificadas en el espacio preperitoneal', sec: 'D', k: 'multi', q: 1, if: ['via', ['TEP', 'TAPP', 'Abierta preperitoneal']], p: 'Se identifican y preservan {v}', o: [
        ['Vasos epigástricos inferiores', 'los vasos epigástricos inferiores'],
        ['Ligamento de Cooper', 'el ligamento de Cooper'],
        ['Conducto deferente', 'el conducto deferente'],
        ['Vasos espermáticos', 'los vasos espermáticos'],
        ['Vasos ilíacos externos', 'los vasos ilíacos externos'],
        ['Corona mortis', 'la corona mortis'],
        ['Nervios del triángulo del dolor', 'los nervios del triángulo del dolor']
      ] },
      { id: 'red', l: 'Reducción', sec: 'D', k: 'opt', o: [
        ['Reducible', 'Se reduce el contenido herniario a la cavidad abdominal'],
        ['Incarcerada, se reduce', 'Hernia incarcerada, se reduce el contenido a la cavidad abdominal'],
        ['Con ampliación del anillo', 'Se reduce el contenido herniario previa ampliación del anillo'],
        ['No reducible', 'Contenido herniario no reductible']
      ] },
      { id: 'saco', l: 'Tratamiento del saco', sec: 'D', k: 'opt', o: [
        ['Disección e inversión', 'Se diseca el saco herniario y se invierte al espacio preperitoneal'],
        ['Ligadura alta y resección', 'Se realiza ligadura alta y resección del saco herniario'],
        ['Sección y abandono distal', 'Se secciona el saco herniario y se abandona su segmento distal'],
        ['Reducción por tracción', 'Se reduce el saco herniario por tracción desde el espacio preperitoneal'],
        ['Apertura y revisión', 'Se abre el saco herniario y se revisa su contenido']
      ] },
      { id: 'rep', l: 'Técnica de reparación (vía anterior)', sec: 'D', k: 'opt', req: 1, q: 1, if: ['via', 'Abierta anterior'], o: [
        ['Lichtenstein', 'Se realiza reparación según técnica de Lichtenstein'],
        ['Tapón y malla', 'Se realiza reparación con tapón y malla'],
        ['Shouldice', 'Se realiza herniorrafia según técnica de Shouldice'],
        ['Bassini', 'Se realiza herniorrafia según técnica de Bassini'],
        ['McVay', 'Se realiza herniorrafia según técnica de McVay al ligamento de Cooper']
      ] },

      { id: 'malla', l: 'Malla', sec: 'E', k: 'yn', vr: 1, req: 1, q: 1, y: 'Se utiliza malla', n: 'No se utiliza malla' },
      { id: 'mtipo', l: 'Tipo de malla', sec: 'E', k: 'opt', q: 1, if: ['malla', 'si'], o: [
        ['Polipropileno', 'Malla de polipropileno'],
        ['Polipropileno de bajo peso', 'Malla de polipropileno de bajo peso, macroporo'],
        ['Autoadherente', 'Malla autoadherente'],
        ['Anatómica 3D', 'Malla anatómica tridimensional'],
        ['Poliéster', 'Malla de poliéster'],
        ['Fluoruro de polivinilideno', 'Malla de fluoruro de polivinilideno']
      ] },
      { id: 'mtam', l: 'Tamaño de la malla', sec: 'E', k: 'text', q: 1, if: ['malla', 'si'], p: 'La malla mide {v}', ph: '15 × 10 cm' },
      { id: 'fij', l: 'Fijación de la malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Sutura continua y puntos', 'Se fija la malla con sutura continua al ligamento inguinal y puntos al tendón conjunto'],
        ['Puntos separados', 'Se fija la malla con puntos separados'],
        ['Grapas reabsorbibles', 'Se fija la malla con grapas reabsorbibles'],
        ['Grapas no reabsorbibles', 'Se fija la malla con grapas no reabsorbibles'],
        ['Adhesivo tisular', 'Se fija la malla con adhesivo tisular'],
        ['Sin fijación', 'No se fija la malla']
      ] },

      { id: 'perit', l: 'Cierre del peritoneo (TAPP)', sec: 'G', k: 'opt', if: ['via', 'TAPP'], o: [
        ['Sutura continua', 'Se cierra el colgajo peritoneal con sutura continua'],
        ['Grapas', 'Se cierra el colgajo peritoneal con grapas'],
        ['Adhesivo tisular', 'Se cierra el colgajo peritoneal con adhesivo tisular']
      ] }
    ],
    pasos: [
      { t: 'Se realiza incisión inguinal y disección del tejido celular subcutáneo', if: ['via', 'Abierta anterior'] },
      { t: 'Se realiza apertura de la aponeurosis del oblicuo mayor en el sentido de sus fibras hasta el anillo inguinal superficial', if: ['via', 'Abierta anterior'] },
      { t: 'Se realiza disección y reparo del cordón espermático', if: ['via', 'Abierta anterior'] },
      { t: 'Se realiza apertura del cremáster y disección del saco herniario hasta el anillo inguinal profundo', if: ['via', 'Abierta anterior'] },
      { t: 'Se reseca el lipoma del cordón', if: ['via', 'Abierta anterior'] },
      { t: 'Se explora el piso inguinal y el orificio femoral', if: ['via', 'Abierta anterior'] },
      { t: 'Se coloca la malla sobre la pared posterior, con su extremo medial superpuesto al tubérculo del pubis y sus colas rodeando el cordón', if: ['rep', 'Lichtenstein'] },
      { t: 'Se cruzan y fijan las colas de la malla por fuera del anillo inguinal profundo', if: ['rep', 'Lichtenstein'] },
      { t: 'Se cierra la aponeurosis del oblicuo mayor con sutura continua', if: ['via', 'Abierta anterior'] },

      { t: 'Se realiza incisión inguinal o suprainguinal y se accede al espacio preperitoneal sin apertura del peritoneo', if: ['via', 'Abierta preperitoneal'] },

      { t: 'Se accede a la cavidad peritoneal a nivel umbilical y se realiza neumoperitoneo {neumo}', if: ['via', 'TAPP'] },
      { t: 'Se colocan dos trocares de trabajo bajo visión directa', if: ['via', 'TAPP'] },
      { t: 'Se realiza exploración de la cavidad abdominal y de ambos orificios miopectíneos', if: ['via', 'TAPP'] },
      { t: 'Se realiza incisión del peritoneo desde la espina ilíaca anterosuperior hasta el ligamento umbilical medial y se desarrolla el colgajo peritoneal', if: ['via', 'TAPP'] },

      { t: 'Se realiza incisión infraumbilical y apertura de la vaina anterior del recto', if: ['via', 'TEP'] },
      { t: 'Se rechaza el músculo recto lateralmente y se accede al espacio preperitoneal', if: ['via', 'TEP'] },
      { t: 'Se crea el espacio preperitoneal {acceso}', if: ['via', 'TEP'] },
      { t: 'Se colocan dos trocares de trabajo en la línea media infraumbilical bajo visión directa', if: ['via', 'TEP'] },

      { t: 'Se diseca el espacio de Retzius hasta el ligamento de Cooper y la sínfisis del pubis', if: ['via', ['TEP', 'TAPP', 'Abierta preperitoneal']] },
      { t: 'Se diseca el espacio de Bogros lateralmente hasta la espina ilíaca anterosuperior', if: ['via', ['TEP', 'TAPP', 'Abierta preperitoneal']] },
      { t: 'Se reduce el saco herniario y se realiza parietalización de los elementos del cordón', if: ['via', ['TEP', 'TAPP', 'Abierta preperitoneal']] },
      { t: 'Se coloca la malla en el espacio preperitoneal cubriendo el orificio miopectíneo', if: ['via', ['TEP', 'TAPP', 'Abierta preperitoneal']] },
      { t: 'Se desinsufla el espacio preperitoneal bajo visión directa, controlando la posición del borde inferior de la malla', if: ['via', 'TEP'] },
      { t: 'Se retiran los trocares bajo visión directa y se evacua el neumoperitoneo', if: ['via', 'TAPP'] },
      { t: 'Se cierra la aponeurosis de los orificios de trocar de 10 mm o más', if: ['via', ['TEP', 'TAPP']] }
    ],
    ej: 'Hernioplastia inguinal derecha. Se realiza abordaje abierto anterior por incisión inguinal. Hernia primaria. Indicación quirúrgica por hernia inguinal sintomática. Se realiza incisión inguinal y disección del tejido celular subcutáneo, apertura de la aponeurosis del oblicuo mayor y disección y reparo del cordón espermático. Hernia inguinal indirecta, clasificación EHS P L2, con saco con contenido epiploico. Se diseca el saco herniario y se invierte al espacio preperitoneal. Se identifica y preserva el nervio ilioinguinal, el nervio iliohipogástrico y la rama genital del nervio genitofemoral. Se realiza reparación según técnica de Lichtenstein con malla de polipropileno de bajo peso, macroporo, de 15 × 10 cm, que se fija con sutura continua al ligamento inguinal y puntos al tendón conjunto. Se cierra la aponeurosis del oblicuo mayor con sutura continua. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },
  { id: 'cg-hing-tep', n: 'Hernioplastia inguinal laparoscópica TEP', cat: 'Pared abdominal y hernias', syn: ['TEP', 'totalmente extraperitoneal', 'hernia inguinal laparoscópica', 'videolaparoscópica', 'VLP', 'hernia bilateral'], alias: 'cg-hing', set: { via: 'TEP', malla: 'si' } },
  { id: 'cg-hing-tapp', n: 'Hernioplastia inguinal laparoscópica TAPP', cat: 'Pared abdominal y hernias', syn: ['TAPP', 'transabdominal preperitoneal', 'hernia inguinal laparoscópica', 'videolaparoscópica', 'VLP'], alias: 'cg-hing', set: { via: 'TAPP', malla: 'si' } },

  // ───────────────────────────── Hernia crural o femoral ─────────────────────────────
  {
    id: 'cg-hfem',
    n: 'Reparación de hernia crural o femoral',
    sp: 'Cirugía general',
    sub: 'Pared abdominal',
    cat: 'Pared abdominal y hernias',
    syn: ['hernia crural', 'hernia femoral', 'Lockwood', 'McVay', 'Lotheissen', 'tapón femoral', 'anillo crural'],
    v: 1,
    rev: '2026-10',
    ref: 'HerniaSurge Group. International guidelines for groin hernia management. Hernia 2018;22:1-165 (capítulo de hernia femoral) · Stabilini C et al. Update of the international HerniaSurge guidelines for groin hernia management. BJS Open 2023;7:zrad080 · Birindelli A et al. 2017 update of the WSES guidelines for emergency repair of complicated abdominal wall hernias. World J Emerg Surg 2017;12:37',
    ctx: 'Hernia femoral electiva o de urgencia (alta tasa de incarceración). Variante de abordaje: infrainguinal (Lockwood), transinguinal (Lotheissen-McVay), preperitoneal abierto, TEP, TAPP o laparotomía cuando hay compromiso intestinal. HerniaSurge sugiere reparación preperitoneal con malla en la cirugía electiva.',
    lat: true,
    f: [
      { id: 'lat', l: 'Lateralidad', sec: 'A', k: 'opt', vr: 1, req: 1, q: 1, o: [['Derecha', 'derecha'], ['Izquierda', 'izquierda'], ['Bilateral', 'bilateral']] },
      { id: 'pres', l: 'Presentación', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Reductible', 'Hernia femoral reductible'],
        ['Incarcerada', 'Hernia femoral incarcerada'],
        ['Con signos de estrangulación', 'Hernia femoral con signos clínicos de estrangulación']
      ] },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Infrainguinal (Lockwood)', 'Se realiza abordaje infrainguinal por incisión por debajo del ligamento inguinal'],
        ['Transinguinal (Lotheissen-McVay)', 'Se realiza abordaje transinguinal por incisión inguinal'],
        ['Preperitoneal abierto', 'Se realiza abordaje preperitoneal abierto por incisión suprainguinal'],
        ['TEP', 'Se realiza abordaje laparoscópico totalmente extraperitoneal (TEP)'],
        ['TAPP', 'Se realiza abordaje laparoscópico transabdominal preperitoneal (TAPP)'],
        ['Laparotomía', 'Se realiza laparotomía mediana infraumbilical']
      ] },
      { id: 'recid', l: 'Primaria o recidivada', sec: 'B', k: 'opt', vr: 1, o: [
        ['Primaria', 'Hernia primaria'],
        ['Recidivada', 'Hernia recidivada']
      ] },

      { id: 'tam', l: 'Tamaño del orificio femoral', sec: 'C', k: 'text', q: 1, p: 'Orificio femoral de {v}', ph: '1,5 cm' },
      { id: 'cont', l: 'Contenido del saco', sec: 'C', k: 'multi', q: 1, o: [
        ['Saco vacío', 'Saco herniario vacío'],
        ['Grasa preperitoneal', 'Saco con grasa preperitoneal'],
        ['Epiplón', 'Saco con contenido epiploico'],
        ['Intestino delgado', 'Saco con contenido de intestino delgado'],
        ['Pinzamiento lateral (Richter)', 'Pinzamiento lateral de la pared intestinal (hernia de Richter)'],
        ['Vejiga', 'Saco con componente vesical']
      ] },
      { id: 'viab', l: 'Viabilidad del contenido', sec: 'C', k: 'opt', req: 1, q: 1, if: ['pres', ['Incarcerada', 'Con signos de estrangulación']], o: [
        ['Viable', 'Contenido herniario viable'],
        ['Isquemia reversible', 'Contenido herniario con signos de isquemia que revierten tras la liberación'],
        ['Viabilidad dudosa', 'Contenido herniario de viabilidad dudosa'],
        ['Necrosis', 'Contenido herniario con necrosis']
      ] },
      { id: 'asoc', l: 'Hernia inguinal asociada', sec: 'C', k: 'opt', o: [
        ['Sin hernia inguinal asociada', 'Sin hernia inguinal asociada'],
        ['Directa asociada', 'Hernia inguinal directa asociada'],
        ['Indirecta asociada', 'Hernia inguinal indirecta asociada'],
        ['Obturatriz asociada', 'Hernia obturatriz asociada']
      ] },
      { id: 'prev', l: 'Estructuras identificadas y preservadas', sec: 'C', k: 'multi', q: 1, p: 'Se identifican y preservan {v}', o: [
        ['Vena femoral', 'la vena femoral'],
        ['Ligamento inguinal', 'el ligamento inguinal'],
        ['Ligamento lacunar', 'el ligamento lacunar'],
        ['Ligamento de Cooper', 'el ligamento de Cooper'],
        ['Corona mortis', 'la corona mortis'],
        ['Cordón o ligamento redondo', 'el cordón espermático o ligamento redondo'],
        ['Nervio ilioinguinal', 'el nervio ilioinguinal']
      ] },

      { id: 'red', l: 'Reducción', sec: 'D', k: 'opt', o: [
        ['Reducción simple', 'Se reduce el contenido herniario a la cavidad abdominal'],
        ['Sección del ligamento lacunar', 'Se reduce el contenido previa sección medial del ligamento lacunar'],
        ['Sección del ligamento inguinal', 'Se reduce el contenido previa sección del ligamento inguinal, que luego se repara'],
        ['Tracción desde el abdomen', 'Se reduce el contenido por tracción desde la cavidad abdominal']
      ] },
      { id: 'saco', l: 'Tratamiento del saco', sec: 'D', k: 'opt', o: [
        ['Apertura y revisión', 'Se abre el saco herniario y se revisa su contenido'],
        ['Ligadura alta y resección', 'Se realiza ligadura alta y resección del saco herniario'],
        ['Inversión', 'Se invierte el saco herniario al espacio preperitoneal']
      ] },
      { id: 'resec', l: 'Resección del contenido', sec: 'D', k: 'opt', q: 1, if: ['pres', ['Incarcerada', 'Con signos de estrangulación']], o: [
        ['Sin resección', 'No se realiza resección del contenido herniario'],
        ['Resección de epiplón', 'Se reseca el epiplón no viable'],
        ['Resección intestinal y anastomosis', 'Se realiza resección del segmento intestinal no viable y anastomosis {d}']
      ], ph: 'tipo de anastomosis' },
      { id: 'rep', l: 'Reparación del orificio femoral', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Malla preperitoneal', 'Se coloca malla en el espacio preperitoneal cubriendo el orificio miopectíneo'],
        ['Tapón de malla', 'Se ocluye el orificio femoral con tapón de malla fijado a los ligamentos inguinal, lacunar y pectíneo'],
        ['Rafia inguinopectínea', 'Se cierra el orificio femoral con puntos entre el ligamento inguinal y el ligamento pectíneo'],
        ['McVay', 'Se realiza reparación según técnica de McVay al ligamento de Cooper']
      ] },

      { id: 'malla', l: 'Malla', sec: 'E', k: 'yn', vr: 1, req: 1, q: 1, y: 'Se utiliza malla', n: 'No se utiliza malla' },
      { id: 'mtipo', l: 'Tipo de malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Polipropileno', 'Malla de polipropileno'],
        ['Polipropileno de bajo peso', 'Malla de polipropileno de bajo peso, macroporo'],
        ['Tapón preformado', 'Tapón preformado de polipropileno'],
        ['Poliéster', 'Malla de poliéster'],
        ['Biosintética reabsorbible', 'Malla biosintética reabsorbible']
      ] },
      { id: 'mtam', l: 'Tamaño de la malla', sec: 'E', k: 'text', if: ['malla', 'si'], p: 'La malla mide {v}', ph: '15 × 10 cm' },
      { id: 'fij', l: 'Fijación de la malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Puntos separados', 'Se fija la malla con puntos separados'],
        ['Grapas reabsorbibles', 'Se fija la malla con grapas reabsorbibles'],
        ['Adhesivo tisular', 'Se fija la malla con adhesivo tisular'],
        ['Sin fijación', 'No se fija la malla']
      ] }
    ],
    pasos: [
      { t: 'Se realiza incisión infrainguinal paralela al ligamento inguinal sobre la tumoración', if: ['via', 'Infrainguinal (Lockwood)'] },
      { t: 'Se diseca el saco herniario hasta su cuello en el orificio femoral, medial a la vena femoral', if: ['via', 'Infrainguinal (Lockwood)'] },
      { t: 'Se realiza incisión inguinal y apertura de la aponeurosis del oblicuo mayor', if: ['via', 'Transinguinal (Lotheissen-McVay)'] },
      { t: 'Se abre la fascia transversalis y se expone el orificio femoral desde el conducto inguinal', if: ['via', 'Transinguinal (Lotheissen-McVay)'] },
      { t: 'Se accede al espacio preperitoneal y se expone el orificio femoral desde su cara posterior', if: ['via', 'Preperitoneal abierto'] },
      { t: 'Se realiza incisión infraumbilical, se accede al espacio preperitoneal y se crea el espacio con la óptica', if: ['via', 'TEP'] },
      { t: 'Se realiza neumoperitoneo, exploración de la cavidad y apertura del colgajo peritoneal', if: ['via', 'TAPP'] },
      { t: 'Se diseca el espacio de Retzius hasta el ligamento de Cooper', if: ['via', ['TEP', 'TAPP', 'Preperitoneal abierto']] },
      { t: 'Se realiza exploración de la cavidad abdominal y del asa comprometida', if: ['via', 'Laparotomía'] },
      { t: 'Se aísla el saco con compresas antes de su apertura', if: ['pres', ['Incarcerada', 'Con signos de estrangulación']] },
      { t: 'Se toma el contenido con pinza atraumática antes de liberar el anillo, para evitar su reducción sin evaluación', if: ['pres', ['Incarcerada', 'Con signos de estrangulación']] },
      { t: 'Se aplican compresas tibias sobre el asa y se reevalúa su viabilidad tras un período de espera', if: ['pres', ['Incarcerada', 'Con signos de estrangulación']] },
      'Se protege la vena femoral durante la colocación de los puntos de fijación',
      'Se explora el orificio inguinal y el obturador en busca de defectos asociados'
    ],
    ej: 'Reparación de hernia femoral derecha. Hernia femoral incarcerada. Se realiza abordaje preperitoneal abierto por incisión suprainguinal. Se accede al espacio preperitoneal y se expone el orificio femoral desde su cara posterior. Orificio femoral de 1,5 cm, con saco con contenido epiploico. Se aísla el saco con compresas antes de su apertura. Contenido herniario viable. Sin hernia inguinal asociada. Se identifican y preservan la vena femoral, el ligamento de Cooper y la corona mortis. Se reduce el contenido previa sección medial del ligamento lacunar. No se realiza resección del contenido herniario. Se coloca malla en el espacio preperitoneal cubriendo el orificio miopectíneo, de polipropileno de bajo peso, macroporo, de 15 × 10 cm, fijada con puntos separados. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Hernia umbilical y epigástrica (primarias de pared) · con o sin malla ─────────────────────────────
  {
    id: 'cg-hven',
    n: 'Reparación de hernia umbilical',
    sp: 'Cirugía general',
    sub: 'Pared abdominal',
    cat: 'Pared abdominal y hernias',
    syn: ['hernia umbilical', 'hernioplastia umbilical', 'herniorrafia umbilical', 'hernia paraumbilical', 'hernia ventral primaria', 'Mayo', 'IPOM', 'eTEP', 'Spiegel'],
    v: 2,
    rev: '2026-10',
    ref: 'Henriksen NA et al. Guidelines for treatment of umbilical and epigastric hernias from the European Hernia Society and Americas Hernia Society. Br J Surg 2020;107:171-190 · Muysoms FE et al. Classification of primary and incisional abdominal wall hernias. Hernia 2009;13:407-414 · Bittner R et al. Update of guidelines for laparoscopic treatment of ventral and incisional abdominal wall hernias (International Endohernia Society). Surg Endosc 2019;33:3069-3139',
    ctx: 'Hernia ventral primaria (umbilical, paraumbilical, epigástrica, de Spiegel o lumbar). Variantes: localización, abordaje (abierto, laparoscópico intraperitoneal, laparoscópico preperitoneal o eTEP) y uso de malla. La guía EHS/AHS sugiere malla en defectos de 1 cm o más, preferentemente en plano preperitoneal o retromuscular, con superposición de 3 cm.',
    lat: false,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Umbilical', 'Hernia umbilical'],
        ['Paraumbilical', 'Hernia paraumbilical'],
        ['Epigástrica', 'Hernia epigástrica de línea media'],
        ['Múltiple de línea media', 'Defectos herniarios múltiples de línea media'],
        ['Spiegel', 'Hernia de Spiegel'],
        ['Lumbar', 'Hernia lumbar primaria']
      ] },
      { id: 'recid', l: 'Primaria o recidivada', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Primaria', 'Hernia primaria'],
        ['Recidivada', 'Hernia recidivada tras reparación previa']
      ] },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Abierto', 'Se realiza abordaje abierto'],
        ['Laparoscópico intraperitoneal', 'Se realiza abordaje laparoscópico intraperitoneal'],
        ['Laparoscópico preperitoneal', 'Se realiza abordaje laparoscópico transabdominal preperitoneal'],
        ['Endoscópico extraperitoneal (eTEP)', 'Se realiza abordaje endoscópico extraperitoneal (eTEP)']
      ] },
      { id: 'malla', l: 'Malla', sec: 'E', k: 'yn', vr: 1, req: 1, q: 1, y: 'Se utiliza malla', n: 'No se utiliza malla' },
      { id: 'incis', l: 'Incisión', sec: 'B', k: 'opt', if: ['via', 'Abierto'], o: [
        ['Periumbilical inferior', 'incisión periumbilical inferior'],
        ['Periumbilical lateral', 'incisión periumbilical lateral'],
        ['Vertical sobre el defecto', 'incisión vertical sobre el defecto'],
        ['Transversa sobre el defecto', 'incisión transversa sobre el defecto']
      ] },

      { id: 'tam', l: 'Tamaño del defecto', sec: 'C', k: 'text', req: 1, q: 1, p: 'Defecto aponeurótico de {v}', ph: '2 × 2 cm' },
      { id: 'diast', l: 'Diástasis de rectos', sec: 'C', k: 'opt', o: [
        ['Sin diástasis', 'Sin diástasis de los rectos asociada'],
        ['Diástasis asociada', 'Diástasis de los rectos asociada, con separación interrectal de {d}']
      ], ph: 'cm' },
      { id: 'cont', l: 'Contenido', sec: 'C', k: 'multi', q: 1, o: [
        ['Saco vacío', 'Saco herniario vacío'],
        ['Grasa preperitoneal', 'Contenido de grasa preperitoneal'],
        ['Epiplón', 'Saco con contenido epiploico'],
        ['Intestino delgado', 'Saco con contenido de intestino delgado'],
        ['Colon', 'Saco con contenido de colon']
      ] },
      { id: 'viab', l: 'Viabilidad del contenido', sec: 'C', k: 'opt', o: [
        ['Viable', 'Contenido herniario viable'],
        ['Isquemia reversible', 'Contenido herniario con signos de isquemia que revierten tras la liberación'],
        ['Necrosis', 'Contenido herniario con necrosis']
      ] },
      { id: 'adh', l: 'Adherencias', sec: 'C', k: 'opt', o: [
        ['Sin adherencias', 'Sin adherencias del contenido al saco'],
        ['Epiploparietales', 'Adherencias epiploparietales'],
        ['Intestinales firmes', 'Adherencias firmes de asas intestinales al saco']
      ] },
      { id: 'asoc', l: 'Defectos asociados', sec: 'C', k: 'opt', o: [
        ['Sin defectos asociados', 'Sin otros defectos de la línea media'],
        ['Defecto asociado', 'Defecto asociado en {d}']
      ], ph: 'localización y tamaño' },

      { id: 'red', l: 'Reducción', sec: 'D', k: 'opt', o: [
        ['Reducible', 'Se reduce el contenido herniario a la cavidad abdominal'],
        ['Incarcerada, se reduce', 'Hernia incarcerada, se reduce el contenido a la cavidad abdominal'],
        ['Con ampliación del anillo', 'Se reduce el contenido herniario previa ampliación del anillo'],
        ['Resección del contenido', 'Se reseca el contenido epiploico no viable']
      ] },
      { id: 'fasc', l: 'Cierre del defecto', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Sutura continua', 'Se cierra el defecto aponeurótico con sutura continua'],
        ['Puntos separados', 'Se cierra el defecto aponeurótico con puntos separados'],
        ['Imbricación (Mayo)', 'Se cierra el defecto con imbricación aponeurótica según técnica de Mayo'],
        ['Cierre laparoscópico', 'Se cierra el defecto por vía laparoscópica con sutura continua'],
        ['Sin cierre (puenteo)', 'No se cierra el defecto aponeurótico y se realiza reparación en puente con malla']
      ] },
      { id: 'fsut', l: 'Material de sutura fascial', sec: 'D', k: 'text', p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'polidioxanona 0' },

      { id: 'mtipo', l: 'Tipo de malla', sec: 'E', k: 'opt', q: 1, if: ['malla', 'si'], o: [
        ['Polipropileno', 'Malla de polipropileno'],
        ['Polipropileno de bajo peso', 'Malla de polipropileno de bajo peso, macroporo'],
        ['Con cara antiadherente', 'Malla con cara antiadherente apta para uso intraperitoneal'],
        ['Parche umbilical preformado', 'Parche preformado de doble capa para defectos umbilicales'],
        ['Poliéster', 'Malla de poliéster'],
        ['Biosintética reabsorbible', 'Malla biosintética reabsorbible']
      ] },
      { id: 'plano', l: 'Plano de colocación', sec: 'E', k: 'opt', q: 1, if: ['malla', 'si'], p: 'Se coloca la malla {v}', o: [
        ['Onlay', 'en posición supraaponeurótica (onlay)'],
        ['Inlay', 'en posición intraaponeurótica (inlay)'],
        ['Retromuscular (sublay)', 'en posición retromuscular (sublay)'],
        ['Preperitoneal', 'en posición preperitoneal'],
        ['Intraperitoneal (IPOM)', 'en posición intraperitoneal (IPOM)']
      ] },
      { id: 'mtam', l: 'Tamaño de la malla', sec: 'E', k: 'text', q: 1, if: ['malla', 'si'], p: 'La malla mide {v}', ph: '10 × 10 cm' },
      { id: 'solap', l: 'Superposición', sec: 'E', k: 'text', if: ['malla', 'si'], p: 'La malla supera los bordes del defecto en {v}', ph: '3 cm en todas las direcciones' },
      { id: 'fij', l: 'Fijación de la malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Puntos transfixiantes', 'Se fija la malla con puntos transfixiantes'],
        ['Sutura continua al borde', 'Se fija la malla con sutura continua en su periferia'],
        ['Puntos separados', 'Se fija la malla con puntos separados'],
        ['Grapas en doble corona', 'Se fija la malla con grapas en doble corona'],
        ['Adhesivo tisular', 'Se fija la malla con adhesivo tisular'],
        ['Sin fijación', 'No se fija la malla']
      ] },

      { id: 'omb', l: 'Ombligo', sec: 'G', k: 'opt', o: [
        ['Reconstrucción', 'Se reconstruye el ombligo con fijación de su base a la aponeurosis'],
        ['Onfalectomía', 'Se realiza onfalectomía']
      ] }
    ],
    pasos: [
      { t: 'Se realiza {incis} y disección del tejido celular subcutáneo hasta el saco herniario', if: ['via', 'Abierto'] },
      { t: 'Se desinserta la piel umbilical del saco herniario', if: ['loc', ['Umbilical', 'Paraumbilical']] },
      { t: 'Se diseca el saco herniario hasta su cuello y se delimitan los bordes del defecto aponeurótico', if: ['via', 'Abierto'] },
      { t: 'Se abre el saco herniario y se revisa su contenido', if: ['via', 'Abierto'] },
      { t: 'Se reseca el excedente del saco herniario', if: ['via', 'Abierto'] },
      { t: 'Se explora la línea media en busca de defectos asociados', if: ['via', 'Abierto'] },
      { t: 'Se diseca el espacio preperitoneal o retromuscular para la colocación de la malla', if: ['malla', 'si'] },

      { t: 'Se accede a la cavidad peritoneal en el flanco, alejado del defecto, y se realiza neumoperitoneo', if: ['via', ['Laparoscópico intraperitoneal', 'Laparoscópico preperitoneal']] },
      { t: 'Se colocan los trocares de trabajo en el flanco bajo visión directa', if: ['via', ['Laparoscópico intraperitoneal', 'Laparoscópico preperitoneal']] },
      { t: 'Se liberan las adherencias de la pared abdominal anterior y se reduce el contenido herniario', if: ['via', ['Laparoscópico intraperitoneal', 'Laparoscópico preperitoneal']] },
      { t: 'Se mide el defecto por vía intraabdominal con el neumoperitoneo descendido', if: ['via', ['Laparoscópico intraperitoneal', 'Laparoscópico preperitoneal']] },
      { t: 'Se introduce la malla y se despliega sobre la cara peritoneal de la pared, centrada en el defecto', if: ['via', 'Laparoscópico intraperitoneal'] },
      { t: 'Se realiza incisión del peritoneo y desarrollo del colgajo preperitoneal alrededor del defecto', if: ['via', 'Laparoscópico preperitoneal'] },
      { t: 'Se cierra el colgajo peritoneal sobre la malla', if: ['via', 'Laparoscópico preperitoneal'] },

      { t: 'Se accede al espacio retromuscular por vía endoscópica y se desarrolla mediante insuflación', if: ['via', 'Endoscópico extraperitoneal (eTEP)'] },
      { t: 'Se realiza cruce de la línea media con sección de la hoja posterior en el borde medial de cada vaina', if: ['via', 'Endoscópico extraperitoneal (eTEP)'] },
      { t: 'Se cierra la hoja posterior de la vaina de los rectos', if: ['via', 'Endoscópico extraperitoneal (eTEP)'] },

      { t: 'Se retiran los trocares bajo visión directa y se cierra la aponeurosis de los orificios de 10 mm o más', ifn: ['via', 'Abierto'] }
    ],
    ej: 'Hernia umbilical. Hernia primaria. Se realiza abordaje abierto. Se realiza incisión periumbilical inferior y disección del tejido celular subcutáneo hasta el saco herniario. Se desinserta la piel umbilical del saco herniario. Defecto aponeurótico de 2 × 2 cm, con saco con contenido epiploico. Contenido herniario viable. Se diseca el espacio preperitoneal o retromuscular para la colocación de la malla. Se reduce el contenido herniario a la cavidad abdominal. Se cierra el defecto aponeurótico con puntos separados. Para el cierre aponeurótico se utiliza polipropileno 0. Se utiliza malla de polipropileno de bajo peso, macroporo. Se coloca la malla en posición preperitoneal. La malla mide 8 × 8 cm. Se fija la malla con puntos separados. Se reconstruye el ombligo con fijación de su base a la aponeurosis. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },
  { id: 'cg-hepi', n: 'Reparación de hernia epigástrica', cat: 'Pared abdominal y hernias', syn: ['hernia epigástrica', 'hernia de línea alba', 'hernia supraumbilical', 'hernia ventral primaria'], alias: 'cg-hven', set: { loc: 'Epigástrica' } },
  { id: 'cg-hmalla', n: 'Reparación de hernia con malla', cat: 'Pared abdominal y hernias', syn: ['hernioplastia', 'hernioplastia con malla', 'malla', 'prótesis', 'onlay', 'sublay', 'IPOM', 'preperitoneal'], alias: 'cg-hven', set: { malla: 'si' } },
  { id: 'cg-hsmalla', n: 'Reparación de hernia sin malla', cat: 'Pared abdominal y hernias', syn: ['herniorrafia', 'rafia', 'sutura simple', 'Mayo', 'reparación tisular'], alias: 'cg-hven', set: { malla: 'no' } },

  // ───────────────────────────── Hernia incisional o eventración ─────────────────────────────
  {
    id: 'cg-hinc',
    n: 'Reparación de hernia incisional o eventración',
    sp: 'Cirugía general',
    sub: 'Pared abdominal',
    cat: 'Pared abdominal y hernias',
    syn: ['eventración', 'eventroplastia', 'hernia incisional', 'Rives-Stoppa', 'retromuscular', 'separación de componentes', 'TAR', 'liberación del transverso', 'Ramírez', 'IPOM', 'eTEP', 'eventración en sitio de trocar'],
    v: 1,
    rev: '2026-10',
    ref: 'Sanders DL et al. Midline incisional hernia guidelines: the European Hernia Society. Br J Surg 2023;110:1732-1768 · Muysoms FE et al. Classification of primary and incisional abdominal wall hernias. Hernia 2009;13:407-414 · Bittner R et al. Update of guidelines for laparoscopic treatment of ventral and incisional abdominal wall hernias (International Endohernia Society). Surg Endosc 2019;33:3069-3139',
    ctx: 'Eventración mediana o lateral, primera reparación o recidivada. Variantes: abordaje (abierto, laparoscópico intraperitoneal, eTEP), técnica abierta (Rives-Stoppa, TAR, separación anterior, onlay, IPOM abierto, rafia) y uso de malla. Registrar localización EHS, ancho y largo del defecto, malla previa y plano de la malla.',
    lat: false,
    f: [
      { id: 'ehs', l: 'Localización (EHS)', sec: 'B', k: 'multi', vr: 1, req: 1, q: 1, p: 'Eventración {v}', o: [
        ['M1 subxifoidea', 'mediana subxifoidea (EHS M1)'],
        ['M2 epigástrica', 'mediana epigástrica (EHS M2)'],
        ['M3 umbilical', 'mediana umbilical (EHS M3)'],
        ['M4 infraumbilical', 'mediana infraumbilical (EHS M4)'],
        ['M5 suprapúbica', 'mediana suprapúbica (EHS M5)'],
        ['L1 subcostal', 'lateral subcostal (EHS L1)'],
        ['L2 flanco', 'lateral de flanco (EHS L2)'],
        ['L3 ilíaca', 'lateral ilíaca (EHS L3)'],
        ['L4 lumbar', 'lateral lumbar (EHS L4)'],
        ['Sitio de trocar', 'en sitio de trocar previo']
      ] },
      { id: 'recid', l: 'Primera reparación o recidiva', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Primera reparación', 'Primera reparación de la eventración'],
        ['Recidivada sin malla previa', 'Eventración recidivada tras reparación previa sin malla'],
        ['Recidivada con malla previa', 'Eventración recidivada tras reparación previa con malla']
      ] },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Abierto', 'Se realiza abordaje abierto sobre la cicatriz previa'],
        ['Laparoscópico intraperitoneal', 'Se realiza abordaje laparoscópico intraperitoneal'],
        ['Endoscópico extraperitoneal (eTEP)', 'Se realiza abordaje endoscópico extraperitoneal (eTEP)']
      ] },
      { id: 'tec', l: 'Técnica de reparación abierta', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, if: ['via', 'Abierto'], o: [
        ['Rives-Stoppa', 'Se realiza reparación retromuscular según técnica de Rives-Stoppa'],
        ['TAR', 'Se realiza separación posterior de componentes con liberación del músculo transverso (TAR)'],
        ['Separación anterior de componentes', 'Se realiza separación anterior de componentes'],
        ['Onlay', 'Se realiza cierre aponeurótico y refuerzo con malla supraaponeurótica'],
        ['IPOM abierto', 'Se realiza reparación con malla intraperitoneal por vía abierta'],
        ['Rafia sin malla', 'Se realiza rafia aponeurótica sin malla']
      ] },
      { id: 'malla', l: 'Malla', sec: 'E', k: 'yn', vr: 1, req: 1, q: 1, y: 'Se utiliza malla', n: 'No se utiliza malla' },
      { id: 'prep', l: 'Preparación preoperatoria de la pared', sec: 'B', k: 'multi', o: [
        ['Sin preparación', 'Sin preparación preoperatoria de la pared'],
        ['Toxina botulínica', 'Con aplicación preoperatoria de toxina botulínica en la musculatura lateral'],
        ['Neumoperitoneo progresivo', 'Con neumoperitoneo progresivo preoperatorio']
      ] },

      { id: 'ancho', l: 'Ancho del defecto', sec: 'C', k: 'num', u: 'cm', req: 1, q: 1, p: 'Ancho máximo del defecto de {v} cm' },
      { id: 'largo', l: 'Longitud del defecto', sec: 'C', k: 'num', u: 'cm', q: 1, p: 'Longitud del defecto de {v} cm' },
      { id: 'ndef', l: 'Número de defectos', sec: 'C', k: 'opt', o: [
        ['Defecto único', 'Defecto único'],
        ['Defectos múltiples', 'Defectos múltiples, {d}']
      ], ph: 'número y ubicación' },
      { id: 'cont', l: 'Contenido', sec: 'C', k: 'multi', o: [
        ['Saco vacío', 'Saco herniario vacío'],
        ['Epiplón', 'Saco con contenido epiploico'],
        ['Intestino delgado', 'Saco con contenido de intestino delgado'],
        ['Colon', 'Saco con contenido de colon']
      ] },
      { id: 'adh', l: 'Adherencias', sec: 'C', k: 'opt', o: [
        ['Sin adherencias', 'Sin adherencias viscerales a la pared'],
        ['Epiploparietales', 'Adherencias epiploparietales'],
        ['Intestinales firmes', 'Adherencias firmes de asas intestinales a la cicatriz y al saco']
      ] },
      { id: 'mprev', l: 'Malla previa', sec: 'C', k: 'opt', if: ['recid', 'Recidivada con malla previa'], o: [
        ['Integrada', 'Malla de reparación previa integrada a los tejidos'],
        ['Plegada o migrada', 'Malla de reparación previa plegada o migrada'],
        ['Con signos de infección', 'Malla de reparación previa con signos de infección'],
        ['No hallada', 'No se encuentra la malla de reparación previa']
      ] },
      { id: 'tegu', l: 'Piel sobre la eventración', sec: 'C', k: 'opt', o: [
        ['Sin alteraciones', 'Piel sobre la eventración sin alteraciones'],
        ['Adelgazada', 'Piel adelgazada sobre la eventración'],
        ['Ulcerada', 'Piel ulcerada sobre la eventración']
      ] },

      { id: 'adhes', l: 'Adhesiólisis', sec: 'D', k: 'yn', y: 'Se realiza adhesiólisis de la pared abdominal anterior', n: 'No se realiza adhesiólisis' },
      { id: 'enter', l: 'Enterotomía', sec: 'D', k: 'opt', if: ['adhes', 'si'], o: [
        ['Sin enterotomía', 'No se producen enterotomías durante la adhesiólisis'],
        ['Enterotomía reparada', 'Se produce enterotomía durante la adhesiólisis, que se repara con {d}']
      ], ph: 'sutura en dos planos' },
      { id: 'expl', l: 'Malla previa: conducta', sec: 'D', k: 'opt', if: ['recid', 'Recidivada con malla previa'], o: [
        ['No se retira', 'No se retira la malla previa'],
        ['Retiro parcial', 'Se realiza retiro parcial de la malla previa'],
        ['Retiro total', 'Se realiza retiro total de la malla previa']
      ] },
      { id: 'fasc', l: 'Cierre de la línea media', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Cierre completo', 'Se cierra la línea media aponeurótica en toda su extensión'],
        ['Cierre parcial con puenteo', 'Se realiza cierre parcial de la línea media, con puenteo del defecto remanente con malla'],
        ['Sin cierre (puenteo)', 'No se cierra la línea media aponeurótica y se realiza reparación en puente con malla']
      ] },
      { id: 'fsut', l: 'Material de sutura fascial', sec: 'D', k: 'text', p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'sutura monofilamento de lenta absorción 0' },

      { id: 'mtipo', l: 'Tipo de malla', sec: 'E', k: 'opt', q: 1, if: ['malla', 'si'], o: [
        ['Polipropileno', 'Malla de polipropileno'],
        ['Polipropileno de bajo peso', 'Malla de polipropileno de bajo peso, macroporo'],
        ['Con cara antiadherente', 'Malla con cara antiadherente apta para uso intraperitoneal'],
        ['Poliéster', 'Malla de poliéster'],
        ['Fluoruro de polivinilideno', 'Malla de fluoruro de polivinilideno'],
        ['Biosintética reabsorbible', 'Malla biosintética reabsorbible'],
        ['Biológica', 'Malla biológica']
      ] },
      { id: 'plano', l: 'Plano de colocación', sec: 'E', k: 'opt', q: 1, if: ['malla', 'si'], p: 'Se coloca la malla {v}', o: [
        ['Onlay', 'en posición supraaponeurótica (onlay)'],
        ['Inlay', 'en posición intraaponeurótica (inlay)'],
        ['Retromuscular (sublay)', 'en posición retromuscular (sublay)'],
        ['Preperitoneal', 'en posición preperitoneal'],
        ['Intraperitoneal (IPOM)', 'en posición intraperitoneal (IPOM)']
      ] },
      { id: 'mtam', l: 'Tamaño de la malla', sec: 'E', k: 'text', q: 1, if: ['malla', 'si'], p: 'La malla mide {v}', ph: '30 × 30 cm' },
      { id: 'solap', l: 'Superposición', sec: 'E', k: 'text', if: ['malla', 'si'], p: 'La malla supera los bordes del defecto en {v}', ph: '5 cm en todas las direcciones' },
      { id: 'fij', l: 'Fijación de la malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Sin fijación', 'No se fija la malla'],
        ['Puntos transfixiantes', 'Se fija la malla con puntos transfixiantes'],
        ['Puntos separados', 'Se fija la malla con puntos separados'],
        ['Grapas en doble corona', 'Se fija la malla con grapas en doble corona'],
        ['Adhesivo tisular', 'Se fija la malla con adhesivo tisular']
      ] },

      { id: 'piel2', l: 'Manejo de la piel', sec: 'G', k: 'multi', o: [
        ['Resección de cicatriz', 'Se reseca la cicatriz previa'],
        ['Dermolipectomía', 'Se realiza dermolipectomía del excedente cutáneo'],
        ['Presión negativa incisional', 'Se coloca terapia de presión negativa incisional']
      ] }
    ],
    pasos: [
      { t: 'Se realiza incisión sobre la cicatriz previa y disección del tejido celular subcutáneo hasta el saco', if: ['via', 'Abierto'] },
      { t: 'Se diseca el saco y se delimitan los bordes aponeuróticos del defecto', if: ['via', 'Abierto'] },
      { t: 'Se abre el saco y se accede a la cavidad peritoneal', if: ['via', 'Abierto'] },
      { t: 'Se explora la totalidad de la cicatriz previa en busca de defectos asociados', if: ['via', 'Abierto'] },
      { t: 'Se incide la hoja posterior de la vaina de los rectos en su borde medial, de ambos lados', if: ['tec', ['Rives-Stoppa', 'TAR']] },
      { t: 'Se diseca el espacio retromuscular hasta la línea semilunar, preservando los pedículos neurovasculares perforantes', if: ['tec', ['Rives-Stoppa', 'TAR']] },
      { t: 'Se incide la hoja posterior medial a la línea semilunar y se secciona el músculo transverso del abdomen', if: ['tec', 'TAR'] },
      { t: 'Se desarrolla el espacio pretransversal o preperitoneal lateralmente hasta el músculo psoas', if: ['tec', 'TAR'] },
      { t: 'Se cierra la hoja posterior en la línea media con sutura continua', if: ['tec', ['Rives-Stoppa', 'TAR']] },
      { t: 'Se coloca la malla en el espacio retromuscular, extendida hasta los límites de la disección', if: ['tec', ['Rives-Stoppa', 'TAR']] },
      { t: 'Se levantan colgajos cutáneos hasta superar la línea semilunar', if: ['tec', 'Separación anterior de componentes'] },
      { t: 'Se secciona la aponeurosis del oblicuo mayor 1 a 2 cm por fuera de la línea semilunar y se separa del oblicuo menor en el plano avascular', if: ['tec', 'Separación anterior de componentes'] },
      { t: 'Se diseca el plano supraaponeurótico para la colocación de la malla', if: ['tec', 'Onlay'] },

      { t: 'Se accede a la cavidad peritoneal en el flanco, alejado del defecto, y se realiza neumoperitoneo', if: ['via', 'Laparoscópico intraperitoneal'] },
      { t: 'Se colocan los trocares de trabajo en el flanco bajo visión directa', if: ['via', 'Laparoscópico intraperitoneal'] },
      { t: 'Se reduce el contenido herniario y se mide el defecto por vía intraabdominal con el neumoperitoneo descendido', if: ['via', 'Laparoscópico intraperitoneal'] },
      { t: 'Se introduce la malla y se despliega sobre la cara peritoneal de la pared, centrada en el defecto', if: ['via', 'Laparoscópico intraperitoneal'] },

      { t: 'Se accede al espacio retromuscular por vía endoscópica y se desarrolla mediante insuflación', if: ['via', 'Endoscópico extraperitoneal (eTEP)'] },
      { t: 'Se realiza cruce de la línea media con sección de la hoja posterior en el borde medial de cada vaina', if: ['via', 'Endoscópico extraperitoneal (eTEP)'] },
      { t: 'Se reduce el saco herniario desde el espacio extraperitoneal', if: ['via', 'Endoscópico extraperitoneal (eTEP)'] },
      { t: 'Se cierra la hoja posterior y se coloca la malla en el espacio retromuscular', if: ['via', 'Endoscópico extraperitoneal (eTEP)'] },

      { t: 'Se retiran los trocares bajo visión directa y se cierra la aponeurosis de los orificios de 10 mm o más', ifn: ['via', 'Abierto'] }
    ],
    ej: 'Eventración mediana umbilical (EHS M3) y mediana infraumbilical (EHS M4). Primera reparación de la eventración. Se realiza abordaje abierto sobre la cicatriz previa. Se realiza reparación retromuscular según técnica de Rives-Stoppa. Se realiza incisión sobre la cicatriz previa y disección del tejido celular subcutáneo hasta el saco, y se delimitan los bordes aponeuróticos del defecto. Ancho máximo del defecto de 7 cm. Longitud del defecto de 12 cm. Saco con contenido epiploico, con adherencias epiploparietales. Se incide la hoja posterior de la vaina de los rectos en su borde medial, de ambos lados, y se diseca el espacio retromuscular hasta la línea semilunar, preservando los pedículos neurovasculares perforantes. Se cierra la hoja posterior en la línea media con sutura continua y se coloca la malla en el espacio retromuscular. Se cierra la línea media aponeurótica en toda su extensión. Se utiliza malla de polipropileno de bajo peso, macroporo, de 30 × 20 cm. No se fija la malla. Se coloca drenaje aspirativo en el espacio retromuscular. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Hernia complicada, incarcerada o estrangulada ─────────────────────────────
  {
    id: 'cg-hcomp',
    n: 'Reparación de hernia complicada, incarcerada o estrangulada',
    sp: 'Cirugía general',
    sub: 'Pared abdominal',
    cat: 'Pared abdominal y hernias',
    syn: ['hernia incarcerada', 'hernia atascada', 'hernia estrangulada', 'hernia complicada', 'obstrucción herniaria', 'Richter', 'Amyand', 'Littré', 'resección intestinal'],
    v: 1,
    rev: '2026-10',
    ref: 'Birindelli A et al. 2017 update of the WSES guidelines for emergency repair of complicated abdominal wall hernias. World J Emerg Surg 2017;12:37 · HerniaSurge Group. International guidelines for groin hernia management. Hernia 2018;22:1-165 · Sanders DL et al. Midline incisional hernia guidelines: the European Hernia Society. Br J Surg 2023;110:1732-1768',
    ctx: 'Hernia de pared abdominal o inguinofemoral con incarceración, estrangulación, obstrucción o perforación. Variantes: localización, complicación y abordaje. La guía WSES recomienda documentar la viabilidad del contenido, la necesidad de resección y el grado de contaminación del campo (clase CDC), que condiciona el uso de malla.',
    lat: false,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Inguinal derecha', 'Hernia inguinal derecha'],
        ['Inguinal izquierda', 'Hernia inguinal izquierda'],
        ['Femoral derecha', 'Hernia femoral derecha'],
        ['Femoral izquierda', 'Hernia femoral izquierda'],
        ['Umbilical', 'Hernia umbilical'],
        ['Epigástrica', 'Hernia epigástrica'],
        ['Incisional', 'Eventración'],
        ['Spiegel', 'Hernia de Spiegel'],
        ['Obturatriz', 'Hernia obturatriz'],
        ['Paraestomal', 'Hernia paraestomal']
      ] },
      { id: 'comp', l: 'Complicación', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Incarcerada', 'Hernia incarcerada'],
        ['Estrangulada', 'Hernia con signos clínicos de estrangulación'],
        ['Con obstrucción intestinal', 'Hernia incarcerada con obstrucción intestinal'],
        ['Con perforación o peritonitis', 'Hernia complicada con perforación del contenido y peritonitis']
      ] },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Abierto sobre la hernia', 'Se realiza abordaje abierto directo sobre la hernia'],
        ['Abierto preperitoneal', 'Se realiza abordaje abierto preperitoneal'],
        ['Laparoscópico', 'Se realiza abordaje laparoscópico'],
        ['Laparotomía mediana', 'Se realiza laparotomía mediana']
      ] },
      { id: 'evol', l: 'Tiempo de evolución', sec: 'B', k: 'text', q: 1, p: 'Cuadro de {v} de evolución', ph: '12 horas' },

      { id: 'cont', l: 'Contenido', sec: 'C', k: 'multi', req: 1, q: 1, o: [
        ['Epiplón', 'Saco con contenido epiploico'],
        ['Intestino delgado', 'Saco con contenido de intestino delgado'],
        ['Colon', 'Saco con contenido de colon'],
        ['Pinzamiento lateral (Richter)', 'Pinzamiento lateral de la pared intestinal (hernia de Richter)'],
        ['Apéndice (Amyand)', 'Saco con contenido apendicular (hernia de Amyand)'],
        ['Divertículo de Meckel (Littré)', 'Saco con divertículo de Meckel (hernia de Littré)'],
        ['Vejiga', 'Saco con componente vesical'],
        ['Anexo', 'Saco con contenido anexial']
      ] },
      { id: 'liq', l: 'Líquido del saco', sec: 'C', k: 'opt', o: [
        ['Sin líquido', 'Sin líquido en el saco herniario'],
        ['Seroso', 'Líquido seroso en el saco herniario'],
        ['Serohemático', 'Líquido serohemático en el saco herniario'],
        ['Turbio o purulento', 'Líquido turbio en el saco herniario'],
        ['Fecaloideo', 'Líquido de aspecto fecaloideo en el saco herniario']
      ] },
      { id: 'crit', l: 'Criterios de viabilidad evaluados', sec: 'C', k: 'multi', p: 'Se evalúa la viabilidad del contenido por {v}', o: [
        ['Coloración', 'la coloración de la serosa'],
        ['Peristalsis', 'la peristalsis'],
        ['Pulso mesentérico', 'el pulso mesentérico'],
        ['Sangrado al corte', 'el sangrado al corte'],
        ['Fluorescencia con verde de indocianina', 'la perfusión con verde de indocianina']
      ] },
      { id: 'viab', l: 'Viabilidad del contenido', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Viable', 'Contenido herniario viable'],
        ['Isquemia reversible', 'Contenido herniario con signos de isquemia que revierten tras la liberación del anillo y la aplicación de compresas tibias'],
        ['Viabilidad dudosa', 'Contenido herniario de viabilidad dudosa'],
        ['Necrosis', 'Contenido herniario con necrosis'],
        ['Necrosis y perforación', 'Contenido herniario necrótico y perforado']
      ] },
      { id: 'tam', l: 'Tamaño del defecto', sec: 'C', k: 'text', p: 'Defecto de {v}', ph: '2 cm' },
      { id: 'cdc', l: 'Contaminación del campo (CDC)', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Limpio (clase I)', 'Campo quirúrgico limpio (clase I)'],
        ['Limpio-contaminado (clase II)', 'Campo quirúrgico limpio-contaminado (clase II)'],
        ['Contaminado (clase III)', 'Campo quirúrgico contaminado (clase III)'],
        ['Sucio (clase IV)', 'Campo quirúrgico sucio (clase IV)']
      ] },

      { id: 'liber', l: 'Liberación del contenido', sec: 'D', k: 'opt', o: [
        ['Sección del anillo', 'Se secciona el anillo herniario para liberar el contenido'],
        ['Sección del ligamento lacunar', 'Se secciona el ligamento lacunar para liberar el contenido'],
        ['Sin sección del anillo', 'Se libera el contenido sin sección del anillo'],
        ['Reducción espontánea', 'El contenido herniario se reduce espontáneamente antes de su evaluación']
      ] },
      { id: 'explo', l: 'Evaluación del contenido reducido', sec: 'D', k: 'opt', if: ['liber', 'Reducción espontánea'], o: [
        ['Por el saco con óptica', 'Se explora el contenido reducido a través del saco herniario con óptica laparoscópica'],
        ['Laparoscopía', 'Se realiza laparoscopía exploradora para evaluar el contenido reducido'],
        ['Laparotomía', 'Se realiza laparotomía para evaluar el contenido reducido'],
        ['Por tracción a través del saco', 'Se exterioriza el asa a través del saco para su evaluación']
      ] },
      { id: 'resec', l: 'Resección', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Sin resección', 'No se realiza resección del contenido herniario'],
        ['Resección de epiplón', 'Se reseca el epiplón no viable'],
        ['Resección intestinal', 'Se realiza resección del segmento de intestino delgado no viable'],
        ['Resección de colon', 'Se realiza resección del segmento colónico no viable'],
        ['Apendicectomía', 'Se realiza apendicectomía']
      ] },
      { id: 'rlong', l: 'Longitud resecada', sec: 'D', k: 'num', u: 'cm', if: ['resec', ['Resección intestinal', 'Resección de colon']], p: 'Se resecan {v} cm de intestino' },
      { id: 'anast', l: 'Reconstrucción', sec: 'D', k: 'opt', if: ['resec', ['Resección intestinal', 'Resección de colon']], o: [
        ['Anastomosis manual', 'Se realiza anastomosis manual'],
        ['Anastomosis mecánica', 'Se realiza anastomosis mecánica'],
        ['Ostomía', 'Se confecciona ostomía'],
        ['Reconstrucción diferida', 'Se cierran los cabos y se difiere la reconstrucción del tránsito']
      ] },
      { id: 'rtec', l: 'Técnica de reparación de la pared', sec: 'D', k: 'text', q: 1, p: 'La reparación de la pared se realiza mediante {v}', ph: 'técnica de Lichtenstein' },
      { id: 'difer', l: 'Reparación diferida', sec: 'D', k: 'yn', y: 'Se difiere la reparación definitiva de la pared', n: 'Se realiza la reparación definitiva de la pared en el mismo acto' },

      { id: 'malla', l: 'Malla', sec: 'E', k: 'yn', vr: 1, req: 1, q: 1, y: 'Se utiliza malla', n: 'No se utiliza malla' },
      { id: 'mtipo', l: 'Tipo de malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Polipropileno', 'Malla de polipropileno'],
        ['Polipropileno de bajo peso', 'Malla de polipropileno de bajo peso, macroporo'],
        ['Con cara antiadherente', 'Malla con cara antiadherente apta para uso intraperitoneal'],
        ['Biosintética reabsorbible', 'Malla biosintética reabsorbible'],
        ['Biológica', 'Malla biológica']
      ] },
      { id: 'plano', l: 'Plano de colocación', sec: 'E', k: 'opt', if: ['malla', 'si'], p: 'Se coloca la malla {v}', o: [
        ['Onlay', 'en posición supraaponeurótica (onlay)'],
        ['Retromuscular (sublay)', 'en posición retromuscular (sublay)'],
        ['Preperitoneal', 'en posición preperitoneal'],
        ['Sobre la pared posterior inguinal', 'sobre la pared posterior del conducto inguinal'],
        ['Intraperitoneal (IPOM)', 'en posición intraperitoneal (IPOM)']
      ] },
      { id: 'mtam', l: 'Tamaño de la malla', sec: 'E', k: 'text', if: ['malla', 'si'], p: 'La malla mide {v}', ph: '15 × 10 cm' },
      { id: 'fij', l: 'Fijación de la malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Sutura continua', 'Se fija la malla con sutura continua'],
        ['Puntos separados', 'Se fija la malla con puntos separados'],
        ['Sin fijación', 'No se fija la malla']
      ] }
    ],
    pasos: [
      { t: 'Se realiza incisión sobre la tumoración herniaria y disección hasta el saco', if: ['via', 'Abierto sobre la hernia'] },
      { t: 'Se accede al espacio preperitoneal y se expone el cuello del saco', if: ['via', 'Abierto preperitoneal'] },
      { t: 'Se accede a la cavidad peritoneal, se realiza neumoperitoneo y exploración laparoscópica', if: ['via', 'Laparoscópico'] },
      { t: 'Se reduce el contenido con tracción suave con pinzas atraumáticas', if: ['via', 'Laparoscópico'] },
      { t: 'Se realiza laparotomía mediana y exploración de la cavidad abdominal', if: ['via', 'Laparotomía mediana'] },
      { t: 'Se aísla el saco con compresas antes de su apertura', ifn: ['via', 'Laparoscópico'] },
      { t: 'Se abre el saco herniario y se aspira su contenido líquido', ifn: ['via', 'Laparoscópico'] },
      { t: 'Se toma muestra del líquido del saco para cultivo' },
      { t: 'Se toma el contenido con pinza atraumática antes de liberar el anillo, para evitar su reducción sin evaluación', ifn: ['via', 'Laparoscópico'] },
      'Se aplican compresas tibias sobre el asa y se reevalúa su viabilidad tras un período de espera',
      'Se cambian guantes e instrumental antes de la reparación de la pared',
      'Se realiza lavado del saco y del área quirúrgica con solución fisiológica'
    ],
    ej: 'Hernia inguinal derecha. Hernia incarcerada con obstrucción intestinal. Se realiza abordaje abierto directo sobre la hernia. Cuadro de 12 horas de evolución. Se realiza incisión sobre la tumoración herniaria y disección hasta el saco. Se aísla el saco con compresas antes de su apertura, se abre el saco herniario y se aspira su contenido líquido. Saco con contenido de intestino delgado, con líquido serohemático. Se evalúa la viabilidad del contenido por la coloración de la serosa, la peristalsis y el pulso mesentérico. Contenido herniario con signos de isquemia que revierten tras la liberación del anillo y la aplicación de compresas tibias. Campo quirúrgico limpio (clase I). Se secciona el anillo herniario para liberar el contenido. No se realiza resección del contenido herniario. La reparación de la pared se realiza mediante técnica de Lichtenstein. Se utiliza malla de polipropileno de bajo peso, macroporo, fijada con sutura continua. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Cierre de pared por dehiscencia ─────────────────────────────
  {
    id: 'cg-dehis',
    n: 'Cierre de pared abdominal por dehiscencia',
    sp: 'Cirugía general',
    sub: 'Pared abdominal',
    cat: 'Pared abdominal y hernias',
    syn: ['evisceración', 'dehiscencia aponeurótica', 'eventración aguda', 'burst abdomen', 'resutura de pared', 'cierre de abdomen abierto', 'puntos de retención'],
    v: 1,
    rev: '2026-10',
    ref: 'Deerenberg EB et al. Updated guideline for closure of abdominal wall incisions from the European and American Hernia Societies. Br J Surg 2022;109:1239-1250 · Coccolini F et al. The open abdomen in trauma and non-trauma patients: WSES guidelines. World J Emerg Surg 2018;13:7',
    ctx: 'Dehiscencia aponeurótica postoperatoria con o sin evisceración, o cierre de un abdomen abierto. Variantes: tipo de dehiscencia y técnica de cierre (en masa con puntos pequeños, retención, malla de refuerzo o en puente, cierre temporario). Registrar estado de los bordes, sutura previa, infección y relación sutura-herida.',
    lat: false,
    f: [
      { id: 'tipo', l: 'Tipo', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Evisceración', 'Dehiscencia aponeurótica completa con evisceración'],
        ['Dehiscencia cubierta', 'Dehiscencia aponeurótica con piel indemne, sin evisceración'],
        ['Dehiscencia parcial', 'Dehiscencia aponeurótica parcial'],
        ['Abdomen abierto', 'Abdomen abierto con cierre temporario previo']
      ] },
      { id: 'tec', l: 'Técnica de cierre', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Cierre continuo en masa', 'Se realiza cierre aponeurótico en masa con sutura continua'],
        ['Puntos de retención', 'Se realiza cierre con puntos totales de retención'],
        ['Cierre con malla de refuerzo', 'Se realiza cierre aponeurótico con malla de refuerzo'],
        ['Malla en puente', 'Se realiza reparación con malla en puente sin aproximación aponeurótica'],
        ['Separación de componentes', 'Se realiza separación de componentes para el cierre de la línea media'],
        ['Cierre temporario', 'Se realiza cierre temporario del abdomen']
      ] },
      { id: 'dpo', l: 'Día postoperatorio', sec: 'B', k: 'num', q: 1, p: 'Día {v} del postoperatorio de la cirugía índice' },
      { id: 'ciri', l: 'Cirugía índice', sec: 'B', k: 'text', q: 1, p: 'Antecedente de {v}', ph: 'laparotomía mediana por oclusión intestinal' },

      { id: 'long', l: 'Longitud de la dehiscencia', sec: 'C', k: 'num', u: 'cm', q: 1, p: 'Dehiscencia de {v} cm de longitud' },
      { id: 'bordes', l: 'Bordes aponeuróticos', sec: 'C', k: 'multi', req: 1, q: 1, o: [
        ['Viables', 'Bordes aponeuróticos viables'],
        ['Con necrosis', 'Bordes aponeuróticos con necrosis'],
        ['Desflecados', 'Bordes aponeuróticos desflecados'],
        ['Retraídos', 'Retracción lateral de los bordes aponeuróticos']
      ] },
      { id: 'sutp', l: 'Sutura previa', sec: 'C', k: 'opt', o: [
        ['Íntegra que corta el tejido', 'Sutura previa íntegra que secciona la aponeurosis'],
        ['Rota', 'Sutura previa rota'],
        ['Nudo desanudado', 'Sutura previa con nudo desanudado'],
        ['No identificada', 'No se identifica la sutura previa']
      ] },
      { id: 'infec', l: 'Infección', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin signos de infección', 'Sin signos de infección de la herida'],
        ['Infección superficial', 'Infección de la herida superficial'],
        ['Infección profunda', 'Infección profunda de la herida'],
        ['Colección intraabdominal', 'Colección intraabdominal asociada en {d}']
      ], ph: 'localización' },
      { id: 'visc', l: 'Vísceras expuestas', sec: 'C', k: 'opt', o: [
        ['Sin lesiones', 'Asas intestinales sin lesiones'],
        ['Adheridas a los bordes', 'Asas intestinales adheridas a los bordes de la herida'],
        ['Lesión serosa', 'Lesión serosa de asa intestinal'],
        ['Fístula enteroatmosférica', 'Fístula enteroatmosférica']
      ] },

      { id: 'bites', l: 'Técnica de sutura', sec: 'D', k: 'opt', if: ['tec', ['Cierre continuo en masa', 'Cierre con malla de refuerzo', 'Separación de componentes']], o: [
        ['Puntos pequeños', 'Se realiza técnica de puntos pequeños, con bocados de 5 mm cada 5 mm'],
        ['Puntos grandes', 'Se realiza cierre con bocados de 1 cm cada 1 cm']
      ] },
      { id: 'fsut', l: 'Material de sutura', sec: 'D', k: 'text', q: 1, p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'sutura monofilamento de lenta absorción 2-0' },
      { id: 'slong', l: 'Longitud de sutura utilizada', sec: 'D', k: 'num', u: 'cm', p: 'Se utilizan {v} cm de sutura' },
      { id: 'temp', l: 'Sistema de cierre temporario', sec: 'D', k: 'opt', if: ['tec', 'Cierre temporario'], p: 'Cierre temporario {v}', o: [
        ['Presión negativa abdominal', 'con sistema de presión negativa abdominal'],
        ['Presión negativa con tracción fascial', 'con presión negativa y tracción fascial mediada por malla'],
        ['Bolsa de Bogotá', 'con bolsa de Bogotá'],
        ['Cierre de piel solo', 'con cierre de piel sin cierre aponeurótico']
      ] },

      { id: 'malla', l: 'Malla', sec: 'E', k: 'yn', vr: 1, q: 1, y: 'Se utiliza malla', n: 'No se utiliza malla' },
      { id: 'mtipo', l: 'Tipo de malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Polipropileno', 'Malla de polipropileno'],
        ['Polipropileno de bajo peso', 'Malla de polipropileno de bajo peso, macroporo'],
        ['Con cara antiadherente', 'Malla con cara antiadherente apta para uso intraperitoneal'],
        ['Biosintética reabsorbible', 'Malla biosintética reabsorbible'],
        ['Biológica', 'Malla biológica']
      ] },
      { id: 'plano', l: 'Plano de colocación', sec: 'E', k: 'opt', if: ['malla', 'si'], p: 'Se coloca la malla {v}', o: [
        ['Onlay', 'en posición supraaponeurótica (onlay)'],
        ['Retromuscular (sublay)', 'en posición retromuscular (sublay)'],
        ['Preperitoneal', 'en posición preperitoneal'],
        ['Intraperitoneal (IPOM)', 'en posición intraperitoneal (IPOM)']
      ] },
      { id: 'mtam', l: 'Tamaño de la malla', sec: 'E', k: 'text', if: ['malla', 'si'], p: 'La malla mide {v}', ph: '30 × 15 cm' },
      { id: 'fij', l: 'Fijación de la malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Sutura continua al borde', 'Se fija la malla con sutura continua en su periferia'],
        ['Puntos separados', 'Se fija la malla con puntos separados'],
        ['Puntos transfixiantes', 'Se fija la malla con puntos transfixiantes'],
        ['Sin fijación', 'No se fija la malla']
      ] },

      { id: 'pielm', l: 'Manejo de la piel', sec: 'G', k: 'opt', o: [
        ['Piel abierta', 'Se deja la piel abierta'],
        ['Piel abierta con presión negativa', 'Se deja la piel abierta con terapia de presión negativa'],
        ['Presión negativa incisional', 'Se cierra la piel y se coloca terapia de presión negativa incisional'],
        ['Cierre primario', 'Se realiza cierre primario de la piel']
      ] }
    ],
    pasos: [
      'Se cubren las asas expuestas con compresas húmedas tibias',
      'Se retiran los puntos de piel y se explora la herida en toda su extensión',
      'Se retira la sutura aponeurótica previa',
      'Se toma muestra de la herida para cultivo',
      'Se explora la cavidad abdominal en busca de colecciones o fugas',
      'Se liberan las asas adheridas a los bordes de la herida',
      'Se debridan los bordes aponeuróticos desvitalizados',
      'Se interpone el epiplón mayor entre las asas y la pared',
      { t: 'Se cierra la aponeurosis con sutura continua, incluyendo solo la aponeurosis y manteniendo una relación sutura-herida de al menos 4 a 1', if: ['tec', ['Cierre continuo en masa', 'Cierre con malla de refuerzo', 'Separación de componentes']] },
      { t: 'Se colocan puntos totales de retención protegidos con dispositivos de apoyo cutáneo', if: ['tec', 'Puntos de retención'] },
      { t: 'Se coloca lámina protectora visceral sobre las asas y se instala el sistema de cierre temporario', if: ['tec', 'Cierre temporario'] }
    ],
    ej: 'Dehiscencia aponeurótica completa con evisceración. Día 7 del postoperatorio de la cirugía índice. Antecedente de laparotomía mediana por oclusión intestinal. Se cubren las asas expuestas con compresas húmedas tibias. Se retiran los puntos de piel y se explora la herida en toda su extensión. Dehiscencia de 15 cm de longitud. Bordes aponeuróticos viables. Sutura previa íntegra que secciona la aponeurosis. Sin signos de infección de la herida. Asas intestinales sin lesiones. Se retira la sutura aponeurótica previa y se explora la cavidad abdominal en busca de colecciones o fugas. Se realiza cierre aponeurótico en masa con sutura continua. Se cierra la aponeurosis con sutura continua, incluyendo solo la aponeurosis y manteniendo una relación sutura-herida de al menos 4 a 1. Se realiza técnica de puntos pequeños, con bocados de 5 mm cada 5 mm. Para el cierre aponeurótico se utiliza sutura monofilamento de lenta absorción 2-0. No se utiliza malla. Se deja la piel abierta con terapia de presión negativa. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ═════════════════════════════ INFECCIONES, HERIDAS Y URGENCIAS ═════════════════════════════

  // ───────────────────────────── Incisión y drenaje de absceso superficial ─────────────────────────────
  {
    id: 'cg-abs',
    n: 'Incisión y drenaje de absceso superficial',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Infecciones, heridas y urgencias',
    syn: ['drenaje de absceso', 'avenamiento', 'absceso de partes blandas', 'absceso cutáneo', 'forúnculo', 'ántrax', 'absceso glúteo', 'absceso axilar', 'hidradenitis', 'toilette'],
    v: 2,
    rev: '2026-10',
    ref: 'Stevens DL et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the Infectious Diseases Society of America. Clin Infect Dis 2014;59:e10-e52 · Sartelli M et al. WSES/GAIS/WSIS/SIS-E/AAST global clinical pathways for patients with skin and soft tissue infections. World J Emerg Surg 2022;17:3',
    ctx: 'Absceso de piel y partes blandas superficiales (subcutáneo) que requiere evacuación. Incisión sobre la zona de fluctuación, evacuación, ruptura de tabiques y manejo de la cavidad. Los abscesos perianales tienen plantilla propia en Proctología.',
    lat: false,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Partes blandas', 'Absceso de partes blandas en {d}'],
        ['Pared abdominal', 'Absceso de pared abdominal en {d}'],
        ['Glúteo', 'Absceso glúteo {d}'],
        ['Axilar', 'Absceso axilar {d}'],
        ['Mamario', 'Absceso mamario {d}'],
        ['Cervical superficial', 'Absceso cervical superficial {d}'],
        ['Miembro superior', 'Absceso de partes blandas de miembro superior {d}'],
        ['Miembro inferior', 'Absceso de partes blandas de miembro inferior {d}'],
        ['Pilonidal', 'Absceso pilonidal sacrococcígeo'],
        ['Herida quirúrgica', 'Absceso de herida quirúrgica {d}']
      ], ph: 'región y lado' },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', q: 1, o: [
        ['Sobre la zona de fluctuación', 'Se realiza incisión sobre la zona de mayor fluctuación'],
        ['Siguiendo líneas de tensión', 'Se realiza incisión siguiendo las líneas de tensión de la piel sobre la colección'],
        ['Elíptica con huso cutáneo', 'Se realiza incisión elíptica con resección de un huso cutáneo sobre la colección'],
        ['Lateral a la línea media', 'Se realiza incisión lateral a la línea media'],
        ['Punción-aspiración ecoguiada', 'Se realiza punción-aspiración guiada por ecografía']
      ] },

      { id: 'tam', l: 'Tamaño de la colección', sec: 'C', k: 'text', q: 1, p: 'Colección de aproximadamente {v}', ph: '4 × 3 cm' },
      { id: 'car', l: 'Características del contenido', sec: 'C', k: 'multi', q: 1, p: 'Colección de contenido {v}', o: [
        ['Purulento', 'purulento'],
        ['Seropurulento', 'seropurulento'],
        ['Hematopurulento', 'hematopurulento'],
        ['Fétido', 'de olor fétido'],
        ['Tabicada', 'con tabiques'],
        ['Con detritus', 'con detritus necróticos']
      ] },
      { id: 'celu', l: 'Celulitis perilesional', sec: 'C', k: 'opt', o: [
        ['Sin celulitis', 'Sin celulitis perilesional'],
        ['Con celulitis', 'Celulitis perilesional de {d}']
      ], ph: 'extensión en cm' },
      { id: 'necro', l: 'Tejido necrótico', sec: 'C', k: 'opt', o: [
        ['Sin necrosis', 'Sin tejido necrótico'],
        ['Necrosis del subcutáneo', 'Necrosis del tejido celular subcutáneo'],
        ['Compromiso fascial', 'Compromiso de la fascia subyacente']
      ] },
      { id: 'cext', l: 'Cuerpo extraño', sec: 'C', k: 'opt', o: [
        ['Sin cuerpo extraño', 'No se identifica cuerpo extraño'],
        ['Con cuerpo extraño', 'Se identifica cuerpo extraño, {d}']
      ], ph: 'tipo' },
      { id: 'fist', l: 'Trayecto fistuloso', sec: 'C', k: 'opt', o: [
        ['No identificado', 'No se identifica trayecto fistuloso'],
        ['Identificado', 'Se identifica trayecto fistuloso {d}']
      ], ph: 'dirección y profundidad' },

      { id: 'vol', l: 'Cantidad drenada', sec: 'D', k: 'num', u: 'mL', p: 'Se drenan aproximadamente {v} mL' },

      { id: 'micro', l: 'Toma de muestras para microbiología', sec: 'F', k: 'multi', q: 1, o: [
        ['Cultivo y antibiograma', 'Se toma muestra del contenido para cultivo y antibiograma'],
        ['Cultivo anaerobio', 'Se toma muestra para cultivo de gérmenes anaerobios'],
        ['Hongos', 'Se toma muestra para cultivo micológico'],
        ['Micobacterias', 'Se toma muestra para cultivo de micobacterias'],
        ['Tejido para cultivo', 'Se envía tejido de la pared de la cavidad para cultivo'],
        ['No se toman muestras', 'No se toman muestras para microbiología']
      ] },

      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['No se realiza', 'No se realiza lavado de la cavidad'],
        ['Solución fisiológica', 'Se realiza lavado de la cavidad con solución fisiológica'],
        ['Solución antiséptica', 'Se realiza lavado de la cavidad con solución antiséptica diluida']
      ] },
      { id: 'herida', l: 'Manejo de la cavidad', sec: 'G', k: 'opt', q: 1, o: [
        ['Abierta con taponaje', 'Se deja la cavidad abierta con taponaje de gasa'],
        ['Abierta sin taponaje', 'Se deja la cavidad abierta, sin taponaje'],
        ['Drenaje laminar', 'Se deja drenaje laminar en la cavidad'],
        ['Presión negativa', 'Se coloca sistema de terapia de presión negativa'],
        ['Cierre primario', 'Se realiza cierre primario']
      ] }
    ],
    pasos: [
      'Se infiltra la piel sobre la colección con anestésico local',
      'Se identifica la zona de máxima fluctuación',
      'Se realiza punción exploradora de la colección',
      'Se realiza incisión sobre la colección y apertura de la cavidad',
      'Se evacua el contenido de la colección',
      'Se realiza exploración digital de la cavidad y ruptura de tabiques',
      'Se reseca el tejido desvitalizado',
      'Se realiza resección de un huso cutáneo de los bordes de la incisión'
    ],
    ej: 'Absceso glúteo izquierdo. Se realiza incisión sobre la zona de mayor fluctuación. Se infiltra la piel sobre la colección con anestésico local y se realiza punción exploradora de la colección. Colección de aproximadamente 4 × 3 cm, de contenido purulento y de olor fétido. Sin celulitis perilesional. Sin tejido necrótico. Se evacua el contenido de la colección y se realiza exploración digital de la cavidad y ruptura de tabiques. Se drenan aproximadamente 25 mL. Se toma muestra del contenido para cultivo y antibiograma. Se realiza lavado de la cavidad con solución fisiológica. Se deja la cavidad abierta con taponaje de gasa. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Drenaje de absceso profundo o intraabdominal ─────────────────────────────
  {
    id: 'cg-absp',
    n: 'Drenaje de absceso profundo o intraabdominal',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Infecciones, heridas y urgencias',
    syn: ['absceso intraabdominal', 'colección intraabdominal', 'absceso subfrénico', 'absceso pelviano', 'absceso del psoas', 'absceso hepático', 'drenaje percutáneo', 'pigtail', 'absceso del Douglas'],
    v: 1,
    rev: '2026-10',
    ref: 'Sartelli M et al. The management of intra-abdominal infections from a global perspective: 2017 WSES guidelines for management of intra-abdominal infections. World J Emerg Surg 2017;12:29 · Stevens DL et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the IDSA. Clin Infect Dis 2014;59:e10-e52',
    ctx: 'Colección profunda o intraabdominal que requiere drenaje percutáneo guiado por imágenes, laparoscópico, por laparotomía, extraperitoneal o transrectal/transvaginal. La guía WSES de infecciones intraabdominales prioriza el drenaje percutáneo en abscesos bien delimitados y accesibles.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Percutáneo ecoguiado', 'Se realiza drenaje percutáneo guiado por ecografía'],
        ['Percutáneo guiado por TC', 'Se realiza drenaje percutáneo guiado por tomografía computada'],
        ['Laparoscópico', 'Se realiza abordaje laparoscópico'],
        ['Laparotomía', 'Se realiza laparotomía'],
        ['Extraperitoneal abierto', 'Se realiza abordaje abierto extraperitoneal'],
        ['Transrectal o transvaginal', 'Se realiza drenaje por vía transrectal o transvaginal'],
        ['Abierto de plano profundo', 'Se realiza abordaje abierto hasta el plano profundo de partes blandas']
      ] },
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Subfrénico derecho', 'Absceso subfrénico derecho'],
        ['Subfrénico izquierdo', 'Absceso subfrénico izquierdo'],
        ['Subhepático', 'Absceso subhepático'],
        ['Hepático', 'Absceso hepático {d}'],
        ['Esplénico', 'Absceso esplénico'],
        ['Periapendicular', 'Absceso periapendicular'],
        ['Pelviano (Douglas)', 'Absceso pelviano en fondo de saco de Douglas'],
        ['Interasas', 'Absceso interasas'],
        ['Paracólico derecho', 'Absceso paracólico derecho'],
        ['Paracólico izquierdo', 'Absceso paracólico izquierdo'],
        ['Retroperitoneal', 'Absceso retroperitoneal'],
        ['Psoas derecho', 'Absceso del psoas derecho'],
        ['Psoas izquierdo', 'Absceso del psoas izquierdo'],
        ['Profundo de partes blandas', 'Absceso profundo de partes blandas en {d}']
      ], ph: 'segmento o región' },
      { id: 'indic', l: 'Contexto', sec: 'B', k: 'opt', q: 1, o: [
        ['Colección postoperatoria', 'Colección postoperatoria'],
        ['Apendicular', 'Absceso secundario a apendicitis aguda'],
        ['Diverticular', 'Absceso secundario a diverticulitis'],
        ['Falla de drenaje previo', 'Indicación quirúrgica por falla del drenaje percutáneo previo'],
        ['Otro', 'Colección en contexto de {d}']
      ], ph: 'cuadro clínico' },
      { id: 'tecp', l: 'Técnica de colocación del catéter', sec: 'B', k: 'opt', if: ['via', ['Percutáneo ecoguiado', 'Percutáneo guiado por TC']], o: [
        ['Seldinger', 'mediante técnica de Seldinger'],
        ['Trocar', 'mediante técnica de trocar']
      ] },

      { id: 'tam', l: 'Tamaño de la colección', sec: 'C', k: 'text', q: 1, p: 'Colección de aproximadamente {v}', ph: '6 × 5 cm' },
      { id: 'car', l: 'Características del contenido', sec: 'C', k: 'multi', q: 1, p: 'Colección de contenido {v}', o: [
        ['Purulento', 'purulento'],
        ['Seropurulento', 'seropurulento'],
        ['Hematopurulento', 'hematopurulento'],
        ['Bilioso', 'bilioso'],
        ['Fecaloideo', 'fecaloideo'],
        ['Fétido', 'de olor fétido']
      ] },
      { id: 'tab', l: 'Loculación', sec: 'C', k: 'opt', o: [
        ['Unilocular', 'Colección unilocular'],
        ['Multiloculada', 'Colección multiloculada']
      ] },
      { id: 'comun', l: 'Comunicación con víscera', sec: 'C', k: 'opt', o: [
        ['Sin comunicación evidente', 'Sin comunicación evidente con víscera hueca'],
        ['Con comunicación', 'Comunicación de la colección con {d}']
      ], ph: 'víscera' },
      { id: 'perit', l: 'Peritonitis', sec: 'C', k: 'opt', ifn: ['via', ['Percutáneo ecoguiado', 'Percutáneo guiado por TC', 'Transrectal o transvaginal']], o: [
        ['Sin peritonitis generalizada', 'Sin peritonitis generalizada'],
        ['Peritonitis localizada', 'Peritonitis localizada'],
        ['Peritonitis generalizada', 'Peritonitis generalizada']
      ] },

      { id: 'vol', l: 'Cantidad drenada', sec: 'D', k: 'num', u: 'mL', q: 1, p: 'Se drenan aproximadamente {v} mL' },

      { id: 'cate', l: 'Catéter o drenaje', sec: 'E', k: 'text', q: 1, p: 'Se deja catéter de drenaje {v}', ph: 'tipo pigtail de 10 Fr' },

      { id: 'micro', l: 'Toma de muestras para microbiología', sec: 'F', k: 'multi', q: 1, o: [
        ['Cultivo y antibiograma', 'Se toma muestra del contenido para cultivo y antibiograma'],
        ['Cultivo anaerobio', 'Se toma muestra para cultivo de gérmenes anaerobios'],
        ['Gram', 'Se toma muestra para examen directo con tinción de Gram'],
        ['Hongos', 'Se toma muestra para cultivo micológico'],
        ['Citología', 'Se envía muestra para estudio citológico'],
        ['No se toman muestras', 'No se toman muestras para microbiología']
      ] },

      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['No se realiza', 'No se realiza lavado de la cavidad'],
        ['Por catéter', 'Se realiza lavado de la cavidad a través del catéter con solución fisiológica'],
        ['Lavado local', 'Se realiza lavado y aspiración del sector de la colección'],
        ['Lavado de la cavidad', 'Se realiza lavado y aspiración de la cavidad abdominal']
      ] }
    ],
    pasos: [
      { t: 'Se identifica la colección por imágenes y se planifica un trayecto de acceso que evite vísceras y vasos', if: ['via', ['Percutáneo ecoguiado', 'Percutáneo guiado por TC']] },
      { t: 'Se infiltra el sitio de punción con anestésico local', if: ['via', ['Percutáneo ecoguiado', 'Percutáneo guiado por TC']] },
      { t: 'Se punza la colección y se coloca el catéter {tecp}', if: ['via', ['Percutáneo ecoguiado', 'Percutáneo guiado por TC']] },
      { t: 'Se controla la posición del catéter por imágenes', if: ['via', ['Percutáneo ecoguiado', 'Percutáneo guiado por TC']] },
      { t: 'Se accede a la cavidad, se realiza neumoperitoneo y exploración laparoscópica', if: ['via', 'Laparoscópico'] },
      { t: 'Se realiza exploración de la cavidad abdominal', if: ['via', 'Laparotomía'] },
      { t: 'Se protege el campo con compresas antes de abrir la colección', if: ['via', ['Laparoscópico', 'Laparotomía']] },
      { t: 'Se liberan las adherencias que limitan la colección y se abre su pared', if: ['via', ['Laparoscópico', 'Laparotomía']] },
      { t: 'Se realiza incisión y disección por planos hasta la colección, sin apertura del peritoneo', if: ['via', 'Extraperitoneal abierto'] },
      { t: 'Se realiza incisión y disección por planos hasta la colección profunda', if: ['via', 'Abierto de plano profundo'] },
      { t: 'Se punza la colección a través de la pared rectal o vaginal bajo guía digital o ecográfica y se amplía el orificio de drenaje', if: ['via', 'Transrectal o transvaginal'] },
      'Se evacua el contenido de la colección',
      { t: 'Se rompen los tabiques de la colección', ifn: ['via', ['Percutáneo ecoguiado', 'Percutáneo guiado por TC']] },
      'Se fija el catéter a la piel y se conecta a bolsa colectora'
    ],
    ej: 'Se realiza drenaje percutáneo guiado por ecografía. Absceso subfrénico derecho. Colección postoperatoria. Se identifica la colección por imágenes y se planifica un trayecto de acceso que evite vísceras y vasos. Se infiltra el sitio de punción con anestésico local. Se punza la colección y se coloca el catéter mediante técnica de Seldinger. Colección de aproximadamente 6 × 5 cm, de contenido purulento y de olor fétido. Colección unilocular. Se controla la posición del catéter por imágenes. Se evacua el contenido de la colección. Se drenan aproximadamente 120 mL. Se deja catéter de drenaje tipo pigtail de 10 Fr. Se toma muestra del contenido para cultivo y antibiograma. Se fija el catéter a la piel y se conecta a bolsa colectora. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Desbridamiento quirúrgico ─────────────────────────────
  {
    id: 'cg-desb',
    n: 'Desbridamiento quirúrgico',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Infecciones, heridas y urgencias',
    syn: ['debridamiento', 'toilette quirúrgica', 'necrosectomía de partes blandas', 'escarectomía', 'pie diabético', 'úlcera por presión', 'escara'],
    v: 1,
    rev: '2026-10',
    ref: 'Sartelli M et al. WSES/GAIS/WSIS/SIS-E/AAST global clinical pathways for patients with skin and soft tissue infections. World J Emerg Surg 2022;17:3 · Stevens DL et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the IDSA. Clin Infect Dis 2014;59:e10-e52',
    ctx: 'Resección de tejido desvitalizado, infectado o contaminado de una herida (traumática, quirúrgica, úlcera por presión, pie diabético, quemadura). Primer desbridamiento o seriado. Registrar localización, tamaño, plano comprometido, tejido resecado, defecto resultante y cultivos de tejido profundo.',
    lat: false,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'text', vr: 1, req: 1, q: 1, p: 'Herida localizada en {v}', ph: 'cara anterior de pierna derecha' },
      { id: 'tipo', l: 'Tipo de herida', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Traumática', 'Herida traumática'],
        ['Infección de sitio quirúrgico', 'Infección de sitio quirúrgico'],
        ['Úlcera por presión', 'Úlcera por presión'],
        ['Pie diabético', 'Lesión de pie diabético'],
        ['Infección necrotizante', 'Infección necrotizante de partes blandas'],
        ['Quemadura', 'Quemadura']
      ] },
      { id: 'reint', l: 'Primer desbridamiento o seriado', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Primer desbridamiento', 'Primer desbridamiento quirúrgico'],
        ['Seriado', 'Desbridamiento quirúrgico seriado, número {d}']
      ], ph: 'número' },

      { id: 'tam', l: 'Tamaño de la herida', sec: 'C', k: 'text', q: 1, p: 'Herida de {v}', ph: '8 × 5 cm, 2 cm de profundidad' },
      { id: 'prof', l: 'Plano comprometido', sec: 'C', k: 'opt', q: 1, o: [
        ['Piel y subcutáneo', 'Compromiso de piel y tejido celular subcutáneo'],
        ['Fascia', 'Compromiso que alcanza la fascia'],
        ['Músculo', 'Compromiso que alcanza el músculo'],
        ['Hueso o tendón expuesto', 'Compromiso con exposición de hueso o tendón']
      ] },
      { id: 'lecho', l: 'Tejido del lecho', sec: 'C', k: 'multi', p: 'Lecho con {v}', o: [
        ['Necrosis', 'tejido necrótico'],
        ['Esfacelos', 'esfacelos'],
        ['Fibrina', 'fibrina'],
        ['Material purulento', 'material purulento'],
        ['Granulación', 'tejido de granulación'],
        ['Cuerpo extraño', 'cuerpo extraño'],
        ['Olor fétido', 'olor fétido']
      ] },
      { id: 'tray', l: 'Trayectos o despegamientos', sec: 'C', k: 'opt', o: [
        ['Sin trayectos', 'Sin trayectos ni despegamientos'],
        ['Con trayectos', 'Trayectos o despegamientos hacia {d}']
      ], ph: 'dirección y extensión' },

      { id: 'tecd', l: 'Método de desbridamiento', sec: 'D', k: 'multi', q: 1, o: [
        ['Cortante', 'bisturí y tijera'],
        ['Cureta', 'cureta'],
        ['Electrobisturí', 'electrobisturí'],
        ['Hidrocirugía', 'sistema de hidrocirugía']
      ] },
      { id: 'res', l: 'Tejido resecado', sec: 'D', k: 'multi', q: 1, p: 'Se reseca {v}', o: [
        ['Piel', 'piel desvitalizada'],
        ['Subcutáneo', 'tejido celular subcutáneo necrótico'],
        ['Fascia', 'fascia necrótica'],
        ['Músculo', 'músculo no viable'],
        ['Hueso', 'hueso desvitalizado']
      ] },
      { id: 'defec', l: 'Defecto resultante', sec: 'D', k: 'text', p: 'Defecto resultante de {v}', ph: '10 × 6 cm' },

      { id: 'micro', l: 'Toma de muestras para microbiología', sec: 'F', k: 'multi', q: 1, o: [
        ['Tejido profundo para cultivo', 'Se envía tejido profundo para cultivo y antibiograma'],
        ['Hueso para cultivo', 'Se envía fragmento óseo para cultivo'],
        ['Cultivo anaerobio', 'Se toma muestra para cultivo de gérmenes anaerobios'],
        ['Hongos', 'Se toma muestra para cultivo micológico'],
        ['No se toman muestras', 'No se toman muestras para microbiología']
      ] },

      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['Solución fisiológica a baja presión', 'Se realiza lavado con solución fisiológica a baja presión'],
        ['Lavado pulsátil', 'Se realiza lavado pulsátil con solución fisiológica'],
        ['Solución antiséptica', 'Se realiza lavado con solución antiséptica diluida'],
        ['No se realiza', 'No se realiza lavado']
      ] },
      { id: 'herida', l: 'Manejo de la herida', sec: 'G', k: 'opt', q: 1, o: [
        ['Abierta con gasas húmedas', 'Se deja la herida abierta con curación con gasas humedecidas'],
        ['Presión negativa', 'Se coloca sistema de terapia de presión negativa'],
        ['Apósito avanzado', 'Se coloca apósito de {d}'],
        ['Cierre primario diferido planificado', 'Se deja la herida abierta para cierre primario diferido'],
        ['Cierre primario', 'Se realiza cierre primario']
      ], ph: 'tipo de apósito' },
      { id: 'plan', l: 'Plan de reintervención', sec: 'H', k: 'text', p: 'Se planifica nuevo desbridamiento en {v}', ph: '48 horas' }
    ],
    pasos: [
      'Se retira la curación previa y se inspecciona la herida',
      'Se realiza lavado inicial de la herida con solución fisiológica',
      'Se delimita el tejido desvitalizado',
      'Se reseca el tejido desvitalizado con {tecd}',
      'Se exploran los trayectos y despegamientos',
      'Se toma muestra de tejido profundo para cultivo',
      'Se realiza hemostasia del lecho'
    ],
    ej: 'Herida localizada en cara anterior de pierna derecha. Infección de sitio quirúrgico. Primer desbridamiento quirúrgico. Se retira la curación previa y se inspecciona la herida. Herida de 8 × 5 cm, 2 cm de profundidad. Compromiso de piel y tejido celular subcutáneo. Lecho con tejido necrótico, esfacelos y material purulento. Sin trayectos ni despegamientos. Se realiza lavado inicial de la herida con solución fisiológica, se delimita el tejido desvitalizado y se reseca el tejido desvitalizado con bisturí y tijera. Se reseca piel desvitalizada y tejido celular subcutáneo necrótico. Defecto resultante de 10 × 6 cm. Se envía tejido profundo para cultivo y antibiograma. Se realiza lavado con solución fisiológica a baja presión. Se coloca sistema de terapia de presión negativa. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Lavado quirúrgico de herida infectada ─────────────────────────────
  {
    id: 'cg-lavh',
    n: 'Lavado quirúrgico de herida infectada',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Infecciones, heridas y urgencias',
    syn: ['toilette de herida', 'infección de sitio quirúrgico', 'ISQ', 'apertura de herida', 'lavado de herida', 'herida infectada', 'malla expuesta'],
    v: 1,
    rev: '2026-10',
    ref: 'Stevens DL et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the IDSA. Clin Infect Dis 2014;59:e10-e52 · Sartelli M et al. WSES/GAIS/WSIS/SIS-E/AAST global clinical pathways for patients with skin and soft tissue infections. World J Emerg Surg 2022;17:3',
    ctx: 'Apertura, exploración, lavado y manejo de una herida quirúrgica o traumática infectada. Registrar la integridad de la aponeurosis, la presencia de material protésico, el volumen de irrigación y los cultivos.',
    lat: false,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'text', vr: 1, req: 1, q: 1, p: 'Herida localizada en {v}', ph: 'laparotomía mediana supraumbilical' },
      { id: 'tipo', l: 'Tipo de herida', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['ISQ superficial', 'Infección de sitio quirúrgico superficial'],
        ['ISQ profunda', 'Infección de sitio quirúrgico profunda'],
        ['Herida traumática contaminada', 'Herida traumática contaminada'],
        ['Herida con material protésico', 'Herida infectada con material protésico']
      ] },
      { id: 'apert', l: 'Apertura de la herida', sec: 'B', k: 'opt', o: [
        ['Retiro parcial de puntos', 'Se retiran puntos de la herida en forma parcial'],
        ['Retiro total de puntos', 'Se retiran todos los puntos de la herida'],
        ['Herida ya abierta', 'Herida previamente abierta']
      ] },

      { id: 'cont', l: 'Contenido de la herida', sec: 'C', k: 'multi', q: 1, o: [
        ['Purulento', 'Material purulento en la herida'],
        ['Seropurulento', 'Material seropurulento en la herida'],
        ['Hematoma infectado', 'Hematoma infectado'],
        ['Fétido', 'Olor fétido'],
        ['Sin colección', 'Sin colección en la herida']
      ] },
      { id: 'aponeu', l: 'Aponeurosis', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Íntegra', 'Aponeurosis íntegra'],
        ['Dehiscencia parcial', 'Dehiscencia aponeurótica parcial de {d}'],
        ['No aplica (sin aponeurosis subyacente)', 'Herida sin plano aponeurótico subyacente']
      ], ph: 'longitud' },
      { id: 'protes', l: 'Material protésico', sec: 'C', k: 'opt', if: ['tipo', 'Herida con material protésico'], o: [
        ['No expuesto', 'Material protésico no expuesto'],
        ['Malla expuesta integrada', 'Malla expuesta, integrada a los tejidos'],
        ['Malla expuesta no integrada', 'Malla expuesta, no integrada a los tejidos']
      ] },
      { id: 'necro', l: 'Tejido necrótico', sec: 'C', k: 'opt', o: [
        ['Sin necrosis', 'Sin tejido necrótico'],
        ['Necrosis del subcutáneo', 'Necrosis del tejido celular subcutáneo'],
        ['Compromiso fascial', 'Compromiso de la fascia']
      ] },

      { id: 'irrig', l: 'Lavado', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Solución fisiológica a baja presión', 'Se realiza lavado de la herida con solución fisiológica a baja presión'],
        ['Lavado pulsátil', 'Se realiza lavado pulsátil de la herida con solución fisiológica'],
        ['Solución antiséptica', 'Se realiza lavado de la herida con solución antiséptica diluida']
      ] },
      { id: 'ivol', l: 'Volumen de irrigación', sec: 'D', k: 'num', u: 'mL', p: 'Se utilizan {v} mL de solución para el lavado' },
      { id: 'desb', l: 'Desbridamiento asociado', sec: 'D', k: 'yn', y: 'Se reseca el tejido desvitalizado', n: 'No se requiere resección de tejido' },

      { id: 'micro', l: 'Toma de muestras para microbiología', sec: 'F', k: 'multi', q: 1, o: [
        ['Cultivo y antibiograma', 'Se toma muestra del contenido para cultivo y antibiograma'],
        ['Tejido profundo para cultivo', 'Se envía tejido profundo para cultivo'],
        ['Cultivo anaerobio', 'Se toma muestra para cultivo de gérmenes anaerobios'],
        ['No se toman muestras', 'No se toman muestras para microbiología']
      ] },

      { id: 'herida', l: 'Manejo de la herida', sec: 'G', k: 'opt', q: 1, o: [
        ['Abierta con gasas húmedas', 'Se deja la herida abierta con curación con gasas humedecidas'],
        ['Presión negativa', 'Se coloca sistema de terapia de presión negativa'],
        ['Cierre primario diferido planificado', 'Se deja la herida abierta para cierre primario diferido'],
        ['Cierre con drenaje', 'Se cierra la herida dejando drenaje']
      ] }
    ],
    pasos: [
      'Se retira la curación y se inspecciona la herida',
      'Se abre la herida en toda la extensión del sector comprometido',
      'Se toma muestra para cultivo antes del lavado',
      'Se evacua el contenido de la herida',
      'Se explora la herida en toda su extensión y se evalúa la integridad de la aponeurosis',
      'Se exploran los despegamientos del tejido celular subcutáneo'
    ],
    ej: 'Herida localizada en laparotomía mediana supraumbilical. Infección de sitio quirúrgico superficial. Se retiran todos los puntos de la herida. Se retira la curación y se inspecciona la herida. Se abre la herida en toda la extensión del sector comprometido y se toma muestra para cultivo antes del lavado. Material purulento en la herida y olor fétido. Aponeurosis íntegra. Sin tejido necrótico. Se explora la herida en toda su extensión y se evalúa la integridad de la aponeurosis. Se realiza lavado de la herida con solución fisiológica a baja presión. Se utilizan 2000 mL de solución para el lavado. Se toma muestra del contenido para cultivo y antibiograma. Se coloca sistema de terapia de presión negativa. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Tratamiento quirúrgico de infección de partes blandas ─────────────────────────────
  {
    id: 'cg-ipb',
    n: 'Tratamiento quirúrgico de infección de partes blandas',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    cat: 'Infecciones, heridas y urgencias',
    syn: ['fascitis necrotizante', 'gangrena de Fournier', 'infección necrotizante', 'celulitis necrotizante', 'mionecrosis', 'gangrena gaseosa', 'fasciotomía', 'IPBN'],
    v: 1,
    rev: '2026-10',
    ref: 'Sartelli M et al. 2018 WSES/SIS-E consensus conference: recommendations for the management of skin and soft-tissue infections. World J Emerg Surg 2018;13:58 · Sartelli M et al. WSES/GAIS/WSIS/SIS-E/AAST global clinical pathways for patients with skin and soft tissue infections. World J Emerg Surg 2022;17:3 · Stevens DL et al. IDSA SSTI guidelines 2014 update. Clin Infect Dis 2014;59:e10-e52',
    ctx: 'Exploración y desbridamiento de infección de partes blandas, en particular necrotizante, como emergencia quirúrgica. Exploración inicial o reexploración programada (en general a las 24 horas). Registrar extensión, planos comprometidos, hallazgos operatorios, viabilidad muscular, tejido resecado y cultivos de tejido profundo.',
    lat: false,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'text', vr: 1, req: 1, q: 1, p: 'Infección localizada en {v}', ph: 'muslo izquierdo' },
      { id: 'tipo', l: 'Tipo de infección', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Infección necrotizante', 'Infección necrotizante de partes blandas'],
        ['Gangrena de Fournier', 'Infección necrotizante perineal (gangrena de Fournier)'],
        ['Mionecrosis', 'Infección de partes blandas con sospecha de mionecrosis'],
        ['Infección no necrotizante complicada', 'Infección de partes blandas no necrotizante complicada']
      ] },
      { id: 'reint', l: 'Exploración inicial o reexploración', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Exploración inicial', 'Exploración quirúrgica inicial'],
        ['Reexploración programada', 'Reexploración programada, número {d}']
      ], ph: 'número' },

      { id: 'ext', l: 'Extensión del compromiso', sec: 'C', k: 'text', q: 1, p: 'Compromiso que se extiende {v}', ph: 'desde el pliegue inguinal hasta el tercio medio del muslo' },
      { id: 'planos', l: 'Planos comprometidos', sec: 'C', k: 'multi', q: 1, p: 'Compromiso de {v}', o: [
        ['Piel', 'piel'],
        ['Subcutáneo', 'tejido celular subcutáneo'],
        ['Fascia superficial', 'fascia superficial'],
        ['Fascia profunda', 'fascia profunda'],
        ['Músculo', 'músculo']
      ] },
      { id: 'hall2', l: 'Hallazgos operatorios', sec: 'C', k: 'multi', q: 1, o: [
        ['Líquido en agua de lavar platos', 'Líquido turbio de aspecto en agua de lavar platos'],
        ['Fascia grisácea', 'Fascia grisácea y desvitalizada'],
        ['Prueba del dedo positiva', 'Despegamiento fácil del plano fascial a la disección digital'],
        ['Ausencia de sangrado', 'Ausencia de sangrado de los tejidos al corte'],
        ['Trombosis de vasos subcutáneos', 'Trombosis de vasos subcutáneos'],
        ['Gas en tejidos', 'Gas en los tejidos'],
        ['Material purulento', 'Material purulento'],
        ['Sin necrosis', 'Sin tejido necrótico']
      ] },
      { id: 'musc', l: 'Viabilidad muscular', sec: 'C', k: 'opt', o: [
        ['Viable', 'Músculo de aspecto viable, con coloración, consistencia, contractilidad y sangrado conservados'],
        ['Mionecrosis', 'Músculo no viable, sin contractilidad ni sangrado'],
        ['No explorado', 'No se explora el plano muscular']
      ] },

      { id: 'res', l: 'Tejido resecado', sec: 'D', k: 'multi', q: 1, p: 'Se reseca {v}', o: [
        ['Piel', 'piel desvitalizada'],
        ['Subcutáneo', 'tejido celular subcutáneo necrótico'],
        ['Fascia', 'fascia necrótica'],
        ['Músculo', 'músculo no viable']
      ] },
      { id: 'prev', l: 'Estructuras preservadas', sec: 'D', k: 'multi', p: 'Se preservan {v}', o: [
        ['Testículos', 'los testículos'],
        ['Pene y uretra', 'el pene y la uretra'],
        ['Esfínter anal', 'el aparato esfinteriano anal'],
        ['Paquetes vasculonerviosos', 'los paquetes vasculonerviosos'],
        ['Piel viable', 'los colgajos de piel viable']
      ] },
      { id: 'amput', l: 'Amputación', sec: 'D', k: 'opt', o: [
        ['Sin amputación', 'No se realiza amputación'],
        ['Amputación', 'Se realiza amputación a nivel de {d}'],
        ['Desarticulación', 'Se realiza desarticulación a nivel de {d}']
      ], ph: 'nivel' },
      { id: 'deriv', l: 'Derivación', sec: 'D', k: 'multi', if: ['tipo', 'Gangrena de Fournier'], o: [
        ['Sin derivación', 'No se realiza derivación'],
        ['Colostomía', 'Se confecciona colostomía de derivación'],
        ['Cistostomía', 'Se realiza cistostomía suprapúbica'],
        ['Sonda vesical', 'Se coloca sonda vesical']
      ] },

      { id: 'micro', l: 'Toma de muestras para microbiología', sec: 'F', k: 'multi', req: 1, q: 1, o: [
        ['Tejido profundo para cultivo', 'Se envía tejido profundo para cultivo aerobio y anaerobio'],
        ['Gram', 'Se envía muestra para tinción de Gram'],
        ['Hongos', 'Se envía muestra para cultivo micológico'],
        ['No se toman muestras', 'No se toman muestras para microbiología']
      ] },

      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['Solución fisiológica', 'Se realiza lavado abundante con solución fisiológica'],
        ['Solución antiséptica', 'Se realiza lavado con solución antiséptica diluida'],
        ['No se realiza', 'No se realiza lavado']
      ] },
      { id: 'herida', l: 'Manejo de la herida', sec: 'G', k: 'opt', q: 1, o: [
        ['Abierta con gasas húmedas', 'Se deja la herida abierta con curación con gasas humedecidas'],
        ['Presión negativa', 'Se coloca sistema de terapia de presión negativa'],
        ['Abierta con apósito', 'Se deja la herida abierta con apósito {d}']
      ], ph: 'tipo de apósito' },
      { id: 'plan', l: 'Plan de reexploración', sec: 'H', k: 'text', q: 1, p: 'Se planifica reexploración en {v}', ph: '24 horas' }
    ],
    pasos: [
      'Se marca en la piel el límite del compromiso',
      'Se realiza incisión sobre el área comprometida hasta la fascia profunda',
      'Se explora el plano fascial mediante disección digital',
      'Se amplía la incisión hasta alcanzar tejido de aspecto viable',
      'Se realizan contraincisiones para explorar y desbridar trayectos',
      'Se reseca el tejido necrótico',
      'Se toma muestra de tejido profundo para cultivo y tinción de Gram',
      'Se realiza hemostasia del lecho'
    ],
    ej: 'Infección localizada en muslo izquierdo. Infección necrotizante de partes blandas. Exploración quirúrgica inicial. Se marca en la piel el límite del compromiso. Se realiza incisión sobre el área comprometida hasta la fascia profunda y se explora el plano fascial mediante disección digital. Compromiso que se extiende desde el pliegue inguinal hasta el tercio medio del muslo. Compromiso de tejido celular subcutáneo, fascia superficial y fascia profunda. Líquido turbio de aspecto en agua de lavar platos, fascia grisácea y desvitalizada y despegamiento fácil del plano fascial a la disección digital. Músculo de aspecto viable, con coloración, consistencia, contractilidad y sangrado conservados. Se amplía la incisión hasta alcanzar tejido de aspecto viable y se reseca el tejido necrótico. Se reseca tejido celular subcutáneo necrótico y fascia necrótica. No se realiza amputación. Se envía tejido profundo para cultivo aerobio y anaerobio. Se realiza lavado abundante con solución fisiológica. Se deja la herida abierta con curación con gasas humedecidas. No se coloca drenaje. Sin complicaciones intraoperatorias. Se planifica reexploración en 24 horas.'
  },

  // ───────────────────────────── Laparotomía de control de daños ─────────────────────────────
  {
    id: 'cg-dcl',
    n: 'Laparotomía de control de daños',
    sp: 'Cirugía general',
    sub: 'Trauma y urgencias',
    cat: 'Infecciones, heridas y urgencias',
    syn: ['control de daños', 'damage control', 'packing', 'empaquetamiento', 'abdomen abierto', 'relaparotomía programada', 'second look', 'trauma abdominal'],
    v: 1,
    rev: '2026-10',
    ref: 'Coccolini F et al. The open abdomen in trauma and non-trauma patients: WSES guidelines. World J Emerg Surg 2018;13:7 · Rossaint R et al. The European guideline on management of major bleeding and coagulopathy following trauma: sixth edition. Crit Care 2023;27:80 · Coccolini F et al. Splenic trauma: WSES classification and guidelines for adult and pediatric patients. World J Emerg Surg 2017;12:40',
    ctx: 'Laparotomía abreviada en paciente con deterioro fisiológico (acidosis, hipotermia, coagulopatía) por trauma o causa no traumática: control de la hemorragia, control de la contaminación y cierre temporario, con reintervención programada tras la reanimación. Variante: laparotomía índice o reintervención programada. Registrar compresas dejadas en la cavidad.',
    lat: false,
    f: [
      { id: 'ctxd', l: 'Contexto', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Trauma cerrado', 'Paciente con trauma abdominal cerrado'],
        ['Trauma penetrante por arma blanca', 'Paciente con trauma abdominal penetrante por arma blanca'],
        ['Trauma penetrante por arma de fuego', 'Paciente con trauma abdominal penetrante por arma de fuego'],
        ['No traumático, sepsis abdominal', 'Paciente con sepsis de origen abdominal'],
        ['No traumático, hemorragia', 'Paciente con hemorragia intraabdominal no traumática']
      ] },
      { id: 'fase', l: 'Fase', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Laparotomía índice', 'Laparotomía índice de control de daños'],
        ['Reintervención programada', 'Reintervención programada tras control de daños']
      ] },
      { id: 'fisio', l: 'Criterios para control de daños', sec: 'B', k: 'multi', q: 1, if: ['fase', 'Laparotomía índice'], p: 'Se decide estrategia de control de daños por {v}', o: [
        ['Acidosis', 'acidosis metabólica'],
        ['Hipotermia', 'hipotermia'],
        ['Coagulopatía', 'coagulopatía'],
        ['Inestabilidad hemodinámica', 'inestabilidad hemodinámica con requerimiento de vasopresores'],
        ['Transfusión masiva', 'requerimiento de transfusión masiva'],
        ['Lesiones complejas', 'lesiones complejas que requieren tiempo quirúrgico prolongado'],
        ['Hipertensión intraabdominal', 'riesgo de síndrome compartimental abdominal']
      ] },
      { id: 'ciri', l: 'Cirugía previa (reintervención)', sec: 'B', k: 'text', if: ['fase', 'Reintervención programada'], p: 'Antecedente de {v}', ph: 'laparotomía de control de daños hace 36 horas con empaquetamiento perihepático' },

      { id: 'hemop', l: 'Hemoperitoneo', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin hemoperitoneo', 'Sin hemoperitoneo'],
        ['Hemoperitoneo localizado', 'Hemoperitoneo localizado en {d}'],
        ['Hemoperitoneo masivo', 'Hemoperitoneo masivo con coágulos en los cuatro cuadrantes']
      ], ph: 'cuadrante' },
      { id: 'hvol', l: 'Volumen de hemoperitoneo', sec: 'C', k: 'num', u: 'mL', p: 'Se aspiran aproximadamente {v} mL de hemoperitoneo' },
      { id: 'contam', l: 'Contaminación', sec: 'C', k: 'opt', q: 1, o: [
        ['Sin contaminación', 'Sin contaminación entérica'],
        ['Localizada', 'Contaminación entérica localizada'],
        ['Generalizada', 'Contaminación entérica generalizada'],
        ['Fecaloidea', 'Contaminación fecaloidea de la cavidad'],
        ['Purulenta', 'Peritonitis purulenta']
      ] },
      { id: 'les', l: 'Lesiones identificadas', sec: 'C', k: 'multi', req: 1, q: 1, o: [
        ['Hígado', 'Lesión hepática'],
        ['Bazo', 'Lesión esplénica'],
        ['Estómago', 'Lesión gástrica'],
        ['Duodeno', 'Lesión duodenal'],
        ['Páncreas', 'Lesión pancreática'],
        ['Intestino delgado', 'Lesión de intestino delgado'],
        ['Mesenterio', 'Lesión del mesenterio'],
        ['Colon', 'Lesión colónica'],
        ['Recto', 'Lesión rectal'],
        ['Vejiga', 'Lesión vesical'],
        ['Riñón', 'Lesión renal'],
        ['Vascular mayor', 'Lesión vascular mayor'],
        ['Hematoma retroperitoneal zona I', 'Hematoma retroperitoneal en zona I'],
        ['Hematoma retroperitoneal zona II', 'Hematoma retroperitoneal en zona II'],
        ['Hematoma retroperitoneal zona III', 'Hematoma retroperitoneal en zona III'],
        ['Sin lesiones', 'Sin lesiones de órganos intraabdominales']
      ] },
      { id: 'ldet', l: 'Descripción y grado de las lesiones', sec: 'C', k: 'text', q: 1, p: '{v}', ph: 'Lesión hepática grado IV de la AAST en segmentos VI y VII' },

      { id: 'hctl', l: 'Control de la hemorragia', sec: 'D', k: 'multi', q: 1, o: [
        ['Empaquetamiento perihepático', 'Se realiza empaquetamiento perihepático con compresas'],
        ['Empaquetamiento pelviano preperitoneal', 'Se realiza empaquetamiento pelviano preperitoneal'],
        ['Empaquetamiento de otro sector', 'Se realiza empaquetamiento de {d}'],
        ['Maniobra de Pringle', 'Se realiza maniobra de Pringle'],
        ['Ligadura vascular', 'Se realiza ligadura vascular'],
        ['Sutura hemostática', 'Se realiza sutura hemostática del parénquima'],
        ['Derivación vascular temporal', 'Se coloca derivación vascular temporal'],
        ['Esplenectomía', 'Se realiza esplenectomía'],
        ['Nefrectomía', 'Se realiza nefrectomía'],
        ['Taponamiento con balón', 'Se realiza taponamiento con balón en el trayecto']
      ], ph: 'sector' },
      { id: 'pringle', l: 'Tiempo de Pringle', sec: 'D', k: 'num', u: 'min', if: ['hctl', 'Maniobra de Pringle'], p: 'Tiempo total de maniobra de Pringle de {v} minutos' },
      { id: 'cctl', l: 'Control de la contaminación', sec: 'D', k: 'multi', q: 1, o: [
        ['Resección con cierre de cabos', 'Se reseca el segmento intestinal lesionado con cierre de cabos con sutura mecánica, sin anastomosis'],
        ['Rafia primaria', 'Se realiza rafia primaria de la lesión de {d}'],
        ['Ligadura de cabos', 'Se ligan los cabos intestinales'],
        ['Ostomía', 'Se confecciona ostomía'],
        ['Drenaje externo', 'Se coloca drenaje externo de la lesión'],
        ['Sin contaminación que controlar', 'No se requiere control de la contaminación']
      ], ph: 'víscera' },
      { id: 'ncomp', l: 'Compresas dejadas en la cavidad', sec: 'D', k: 'num', req: 1, q: 1, if: ['hctl', ['Empaquetamiento perihepático', 'Empaquetamiento pelviano preperitoneal', 'Empaquetamiento de otro sector']], p: 'Se dejan {v} compresas en la cavidad, registradas en el recuento' },
      { id: 'reconst', l: 'Reconstrucción (reintervención)', sec: 'D', k: 'multi', if: ['fase', 'Reintervención programada'], o: [
        ['Retiro de compresas', 'Se retiran todas las compresas del empaquetamiento'],
        ['Anastomosis', 'Se realiza anastomosis intestinal'],
        ['Ostomía', 'Se confecciona ostomía'],
        ['Reparación vascular definitiva', 'Se realiza reparación vascular definitiva'],
        ['Reempaquetamiento', 'Se realiza nuevo empaquetamiento']
      ] },

      { id: 'tac', l: 'Cierre del abdomen', sec: 'G', k: 'opt', req: 1, q: 1, o: [
        ['Presión negativa abdominal', 'Se realiza cierre temporario con sistema de presión negativa abdominal'],
        ['Presión negativa con tracción fascial', 'Se realiza cierre temporario con presión negativa y tracción fascial mediada por malla'],
        ['Bolsa de Bogotá', 'Se realiza cierre temporario con bolsa de Bogotá'],
        ['Cierre de piel solo', 'Se realiza cierre de piel sin cierre aponeurótico'],
        ['Cierre aponeurótico definitivo', 'Se realiza cierre aponeurótico definitivo']
      ] },
      { id: 'plan', l: 'Plan de reintervención', sec: 'H', k: 'text', q: 1, p: 'Se planifica reintervención en {v}', ph: '24 a 48 horas, tras reanimación en terapia intensiva' }
    ],
    pasos: [
      { t: 'Se realiza laparotomía mediana xifopubiana', if: ['fase', 'Laparotomía índice'] },
      { t: 'Se evacua el hemoperitoneo y los coágulos', if: ['fase', 'Laparotomía índice'] },
      { t: 'Se realiza empaquetamiento transitorio de los cuatro cuadrantes', if: ['fase', 'Laparotomía índice'] },
      { t: 'Se retira el sistema de cierre temporario', if: ['fase', 'Reintervención programada'] },
      { t: 'Se retiran las compresas previa irrigación con solución fisiológica', if: ['fase', 'Reintervención programada'] },
      'Se realiza exploración sistemática de la cavidad abdominal por cuadrantes',
      'Se procede al control de la hemorragia',
      'Se procede al control de la contaminación',
      'Se explora el retroperitoneo según la zona del hematoma',
      'Se realiza lavado de la cavidad con solución fisiológica tibia',
      { t: 'Se cubren las asas con lámina protectora visceral', if: ['fase', 'Laparotomía índice'] }
    ],
    ej: 'Paciente con trauma abdominal cerrado. Laparotomía índice de control de daños. Se decide estrategia de control de daños por acidosis metabólica, hipotermia y coagulopatía. Se realiza laparotomía mediana xifopubiana y se evacua el hemoperitoneo y los coágulos. Hemoperitoneo masivo con coágulos en los cuatro cuadrantes. Se aspiran aproximadamente 2500 mL de hemoperitoneo. Sin contaminación entérica. Lesión hepática. Lesión hepática grado IV de la AAST en segmentos VI y VII. Se realiza empaquetamiento transitorio de los cuatro cuadrantes y exploración sistemática de la cavidad abdominal por cuadrantes. Se procede al control de la hemorragia. Se realiza maniobra de Pringle y empaquetamiento perihepático con compresas. Tiempo total de maniobra de Pringle de 15 minutos. Se dejan 6 compresas en la cavidad, registradas en el recuento. Se cubren las asas con lámina protectora visceral. Se realiza cierre temporario con sistema de presión negativa abdominal. Recuento de gasas e instrumental completo. Sin complicaciones intraoperatorias. Se planifica reintervención en 24 a 48 horas, tras reanimación en terapia intensiva.'
  },

  // ───────────────────────────── Esplenectomía ─────────────────────────────
  {
    id: 'cg-espl',
    n: 'Esplenectomía por trauma o indicación programada',
    sp: 'Cirugía general',
    sub: 'Trauma y urgencias',
    cat: 'Infecciones, heridas y urgencias',
    syn: ['esplenectomía', 'bazo', 'trauma esplénico', 'esplenectomía laparoscópica', 'PTI', 'púrpura trombocitopénica', 'esferocitosis', 'esplenomegalia'],
    v: 1,
    rev: '2026-10',
    ref: 'Coccolini F et al. Splenic trauma: WSES classification and guidelines for adult and pediatric patients. World J Emerg Surg 2017;12:40 · Rossaint R et al. The European guideline on management of major bleeding and coagulopathy following trauma: sixth edition. Crit Care 2023;27:80',
    ctx: 'Esplenectomía de urgencia por trauma esplénico con inestabilidad o falla del manejo no operatorio, o programada por enfermedad hematológica, esplenomegalia o lesión focal. Variantes: indicación y abordaje (laparotomía o laparoscópica). Registrar grado de lesión, bazos accesorios, control del hilio, cola del páncreas y vacunación.',
    lat: false,
    f: [
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Trauma esplénico', 'Indicación quirúrgica por trauma esplénico'],
        ['Falla del manejo no operatorio', 'Indicación quirúrgica por falla del manejo no operatorio de trauma esplénico'],
        ['Púrpura trombocitopénica inmune', 'Indicación quirúrgica por púrpura trombocitopénica inmune refractaria'],
        ['Anemia hemolítica', 'Indicación quirúrgica por anemia hemolítica'],
        ['Esplenomegalia sintomática', 'Indicación quirúrgica por esplenomegalia sintomática'],
        ['Lesión focal esplénica', 'Indicación quirúrgica por lesión focal esplénica'],
        ['Quiste o absceso esplénico', 'Indicación quirúrgica por quiste o absceso esplénico'],
        ['Otra', 'Indicación quirúrgica por {d}']
      ], ph: 'indicación' },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Laparotomía mediana', 'Se realiza laparotomía mediana'],
        ['Laparotomía subcostal izquierda', 'Se realiza laparotomía subcostal izquierda'],
        ['Laparoscópica', 'Se realiza abordaje laparoscópico'],
        ['Laparoscópica mano asistida', 'Se realiza abordaje laparoscópico mano asistido']
      ] },
      { id: 'vacu', l: 'Vacunación', sec: 'B', k: 'yn', y: 'Vacunación preoperatoria antineumocócica, antimeningocócica y contra Haemophilus influenzae tipo b documentada', n: 'Sin vacunación preoperatoria documentada' },

      { id: 'aast', l: 'Grado de lesión (AAST)', sec: 'C', k: 'opt', q: 1, if: ['indic', ['Trauma esplénico', 'Falla del manejo no operatorio']], o: [
        ['Grado I', 'Lesión esplénica grado I de la AAST'],
        ['Grado II', 'Lesión esplénica grado II de la AAST'],
        ['Grado III', 'Lesión esplénica grado III de la AAST'],
        ['Grado IV', 'Lesión esplénica grado IV de la AAST'],
        ['Grado V', 'Lesión esplénica grado V de la AAST']
      ] },
      { id: 'les', l: 'Descripción de la lesión', sec: 'C', k: 'text', if: ['indic', ['Trauma esplénico', 'Falla del manejo no operatorio']], p: '{v}', ph: 'Laceración que compromete el hilio, con desvascularización del polo inferior' },
      { id: 'hemop', l: 'Hemoperitoneo', sec: 'C', k: 'opt', o: [
        ['Sin hemoperitoneo', 'Sin hemoperitoneo'],
        ['Localizado', 'Hemoperitoneo localizado en hipocondrio izquierdo'],
        ['Masivo', 'Hemoperitoneo masivo']
      ] },
      { id: 'hvol', l: 'Volumen de hemoperitoneo', sec: 'C', k: 'num', u: 'mL', p: 'Se aspiran aproximadamente {v} mL de hemoperitoneo' },
      { id: 'tam', l: 'Tamaño del bazo', sec: 'C', k: 'text', p: 'Bazo de {v}', ph: '18 cm de diámetro mayor' },
      { id: 'acces', l: 'Bazos accesorios', sec: 'C', k: 'opt', q: 1, o: [
        ['No se identifican', 'No se identifican bazos accesorios'],
        ['Identificados', 'Se identifican bazos accesorios en {d}, que se resecan'],
        ['No explorados', 'No se realiza búsqueda de bazos accesorios']
      ], ph: 'hilio, epiplón gastroesplénico, ligamento esplenocólico' },
      { id: 'otras', l: 'Lesiones asociadas', sec: 'C', k: 'text', p: 'Lesiones asociadas {v}', ph: 'en cola de páncreas y diafragma izquierdo' },

      { id: 'prev', l: 'Estructuras identificadas y preservadas', sec: 'D', k: 'multi', q: 1, p: 'Se identifican y preservan {v}', o: [
        ['Cola del páncreas', 'la cola del páncreas'],
        ['Estómago', 'la curvatura mayor gástrica'],
        ['Ángulo esplénico del colon', 'el ángulo esplénico del colon'],
        ['Diafragma', 'el diafragma'],
        ['Glándula suprarrenal izquierda', 'la glándula suprarrenal izquierda']
      ] },
      { id: 'cortos', l: 'Vasos gástricos cortos', sec: 'D', k: 'opt', o: [
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ultrasónico', 'bisturí ultrasónico'],
        ['Ligaduras', 'ligaduras'],
        ['Clips', 'clips']
      ] },
      { id: 'hilio', l: 'Control del hilio', sec: 'D', k: 'opt', req: 1, q: 1, o: [
        ['Ligadura arterial previa', 'Se realiza ligadura previa de la arteria esplénica en el borde superior del páncreas'],
        ['Ligadura individual', 'Se realiza ligadura individual de la arteria y la vena esplénicas'],
        ['Sutura mecánica vascular', 'Se secciona el hilio esplénico con sutura mecánica vascular'],
        ['Ligadura en masa', 'Se realiza ligadura del hilio en masa']
      ] },

      { id: 'extr', l: 'Extracción de la pieza', sec: 'F', k: 'opt', o: [
        ['En bolsa con fragmentación', 'Se extrae la pieza en bolsa, con fragmentación dentro de la bolsa'],
        ['En bolsa entera', 'Se extrae la pieza entera en bolsa por ampliación de la incisión'],
        ['Por la laparotomía', 'Se extrae la pieza por la laparotomía']
      ] },
      { id: 'peso', l: 'Peso de la pieza', sec: 'F', k: 'num', u: 'g', p: 'Pieza de {v} g' }
    ],
    pasos: [
      { t: 'Se evacua el hemoperitoneo y se realiza empaquetamiento de los cuatro cuadrantes', if: ['indic', ['Trauma esplénico', 'Falla del manejo no operatorio']] },
      { t: 'Se comprime manualmente el hilio esplénico', if: ['indic', ['Trauma esplénico', 'Falla del manejo no operatorio']] },
      { t: 'Se accede a la cavidad, se realiza neumoperitoneo y se colocan los trocares de trabajo bajo visión directa', if: ['via', ['Laparoscópica', 'Laparoscópica mano asistida']] },
      'Se realiza exploración de la cavidad abdominal en busca de bazos accesorios',
      'Se moviliza el ángulo esplénico del colon',
      'Se abre la transcavidad de los epiplones y se seccionan los vasos gástricos cortos con {cortos}',
      'Se seccionan los ligamentos esplenorrenal y esplenofrénico',
      { t: 'Se moviliza el bazo hacia la línea media', if: ['via', ['Laparotomía mediana', 'Laparotomía subcostal izquierda']] },
      'Se diseca el hilio esplénico bajo visión de la cola del páncreas',
      { t: 'Se coloca el bazo en bolsa de extracción', if: ['via', ['Laparoscópica', 'Laparoscópica mano asistida']] },
      'Se revisa el lecho esplénico, la cola del páncreas y la curvatura mayor gástrica'
    ],
    ej: 'Indicación quirúrgica por púrpura trombocitopénica inmune refractaria. Se realiza abordaje laparoscópico. Vacunación preoperatoria antineumocócica, antimeningocócica y contra Haemophilus influenzae tipo b documentada. Se accede a la cavidad, se realiza neumoperitoneo y se colocan los trocares de trabajo bajo visión directa. Se realiza exploración de la cavidad abdominal en busca de bazos accesorios. Sin hemoperitoneo. Se identifican bazos accesorios en epiplón gastroesplénico, que se resecan. Se moviliza el ángulo esplénico del colon, se abre la transcavidad de los epiplones y se seccionan los vasos gástricos cortos con dispositivo de sellado vascular. Se seccionan los ligamentos esplenorrenal y esplenofrénico. Se diseca el hilio esplénico bajo visión de la cola del páncreas. Se identifican y preservan la cola del páncreas y la curvatura mayor gástrica. Se secciona el hilio esplénico con sutura mecánica vascular. Se coloca el bazo en bolsa de extracción. Se extrae la pieza en bolsa, con fragmentación dentro de la bolsa, y se envía a Anatomía Patológica. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Hemostasia quirúrgica por hemorragia ─────────────────────────────
  {
    id: 'cg-hemq',
    n: 'Hemostasia quirúrgica por hemorragia',
    sp: 'Cirugía general',
    sub: 'Trauma y urgencias',
    cat: 'Infecciones, heridas y urgencias',
    syn: ['reintervención por sangrado', 'relaparotomía por hemorragia', 'hemoperitoneo', 'hematoma', 'sangrado postoperatorio', 'revisión de hemostasia', 'hemostasia'],
    v: 1,
    rev: '2026-10',
    ref: 'Rossaint R et al. The European guideline on management of major bleeding and coagulopathy following trauma: sixth edition. Crit Care 2023;27:80 · Coccolini F et al. The open abdomen in trauma and non-trauma patients: WSES guidelines. World J Emerg Surg 2018;13:7',
    ctx: 'Exploración y control quirúrgico de una hemorragia: postoperatoria, traumática o de otro origen, abdominal o de pared. Variantes: contexto y abordaje. Registrar volumen, origen del sangrado (o su ausencia), método hemostático, hemoderivados y compresas dejadas.',
    lat: false,
    f: [
      { id: 'orig', l: 'Contexto', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Hemorragia postoperatoria', 'Reintervención por hemorragia postoperatoria'],
        ['Hemorragia traumática', 'Hemorragia de origen traumático'],
        ['Hematoma de pared', 'Hematoma de pared abdominal'],
        ['Hemorragia espontánea', 'Hemorragia intraabdominal espontánea']
      ] },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Reapertura de la incisión previa', 'Se reabre la incisión previa'],
        ['Laparotomía', 'Se realiza laparotomía'],
        ['Laparoscopía', 'Se realiza abordaje laparoscópico'],
        ['Exploración de la herida', 'Se explora la herida quirúrgica']
      ] },
      { id: 'ciri', l: 'Cirugía previa', sec: 'B', k: 'text', q: 1, if: ['orig', 'Hemorragia postoperatoria'], p: 'Antecedente de {v}', ph: 'colecistectomía laparoscópica hace 6 horas' },

      { id: 'hemop', l: 'Hemoperitoneo o hematoma', sec: 'C', k: 'opt', q: 1, o: [
        ['Hemoperitoneo localizado', 'Hemoperitoneo localizado en {d}'],
        ['Hemoperitoneo difuso', 'Hemoperitoneo difuso'],
        ['Hematoma organizado', 'Hematoma organizado en {d}'],
        ['Hematoma de pared', 'Hematoma de pared abdominal'],
        ['Sin hemoperitoneo', 'Sin hemoperitoneo']
      ], ph: 'localización' },
      { id: 'hvol', l: 'Volumen evacuado', sec: 'C', k: 'num', u: 'mL', q: 1, p: 'Se evacuan aproximadamente {v} mL de sangre y coágulos' },
      { id: 'sitio', l: 'Sangrado identificado', sec: 'C', k: 'multi', req: 1, q: 1, o: [
        ['Arterial activo', 'Sangrado arterial activo'],
        ['Venoso', 'Sangrado venoso'],
        ['En napa', 'Sangrado en napa'],
        ['De línea de sutura o anastomosis', 'Sangrado de la línea de sutura o anastomosis'],
        ['De orificio de trocar', 'Sangrado de orificio de trocar'],
        ['Sin sangrado activo', 'Sin sangrado activo identificado']
      ] },
      { id: 'sloc', l: 'Origen del sangrado', sec: 'C', k: 'text', q: 1, p: 'Origen del sangrado en {v}', ph: 'rama de la arteria cística' },

      { id: 'met', l: 'Método hemostático', sec: 'D', k: 'multi', req: 1, q: 1, o: [
        ['Ligadura', 'Se realiza ligadura del vaso sangrante'],
        ['Sutura hemostática', 'Se realiza sutura hemostática'],
        ['Clips', 'Se aplican clips hemostáticos'],
        ['Electrocoagulación', 'Se realiza electrocoagulación'],
        ['Sellador de vasos', 'Se aplica dispositivo de sellado vascular'],
        ['Agente hemostático tópico', 'Se aplica agente hemostático tópico'],
        ['Empaquetamiento', 'Se realiza empaquetamiento con compresas'],
        ['Resección del órgano sangrante', 'Se realiza resección de {d}'],
        ['Sin maniobra específica', 'No se requiere maniobra hemostática específica']
      ], ph: 'órgano' },
      { id: 'ncomp', l: 'Compresas dejadas en la cavidad', sec: 'D', k: 'num', req: 1, q: 1, if: ['met', 'Empaquetamiento'], p: 'Se dejan {v} compresas en la cavidad, registradas en el recuento' },
      { id: 'transf', l: 'Hemoderivados intraoperatorios', sec: 'D', k: 'text', p: 'Se transfunden {v}', ph: '2 unidades de glóbulos rojos y 2 de plasma fresco congelado' },
      { id: 'atx', l: 'Ácido tranexámico', sec: 'D', k: 'yn', y: 'Se administra ácido tranexámico', n: 'No se administra ácido tranexámico' }
    ],
    pasos: [
      'Se evacuan los coágulos y el hemoperitoneo',
      'Se realiza compresión y empaquetamiento transitorio del área',
      'Se explora sistemáticamente el lecho quirúrgico, las líneas de sutura y los orificios de trocar',
      'Se busca el origen del sangrado retirando las compresas en forma secuencial',
      'Se procede a la hemostasia del punto sangrante',
      'Se realiza lavado con solución fisiológica tibia y se revisa el campo'
    ],
    ej: 'Reintervención por hemorragia postoperatoria. Se realiza abordaje laparoscópico. Antecedente de colecistectomía laparoscópica hace 6 horas. Se evacuan los coágulos y el hemoperitoneo. Hemoperitoneo localizado en espacio subhepático. Se evacuan aproximadamente 600 mL de sangre y coágulos. Sangrado arterial activo. Origen del sangrado en rama de la arteria cística. Se explora sistemáticamente el lecho quirúrgico, las líneas de sutura y los orificios de trocar, y se procede a la hemostasia del punto sangrante. Se aplican clips hemostáticos. Se realiza lavado con solución fisiológica tibia y se revisa el campo. Se constata hemostasia. Se coloca drenaje tipo Blake en espacio subhepático. Sin complicaciones intraoperatorias.'
  },

  // ═════════════════════════════ PROCTOLOGÍA ═════════════════════════════

  // ───────────────────────────── Hemorroidectomía ─────────────────────────────
  {
    id: 'cg-hrr',
    n: 'Hemorroidectomía',
    sp: 'Cirugía general',
    sub: 'Coloproctología',
    cat: 'Proctología',
    syn: ['hemorroides', 'Milligan-Morgan', 'Ferguson', 'hemorroidopexia', 'PPH', 'Longo', 'desarterialización', 'THD', 'DGHAL', 'enfermedad hemorroidal'],
    v: 1,
    rev: '2026-10',
    ref: 'Davis BR et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the management of hemorrhoids. Dis Colon Rectum 2018;61:284-292 · van Tol RR et al. European Society of ColoProctology: guideline for haemorrhoidal disease. Colorectal Dis 2020;22:650-662',
    ctx: 'Enfermedad hemorroidal grado III-IV o refractaria al tratamiento instrumental. Variantes técnicas: hemorroidectomía abierta (Milligan-Morgan), cerrada (Ferguson), con dispositivo de sellado, hemorroidopexia con sutura mecánica o desarterialización guiada por Doppler. Registrar paquetes tratados y preservación de puentes mucocutáneos y del esfínter interno.',
    lat: false,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Abierta (Milligan-Morgan)', 'Se realiza hemorroidectomía abierta según técnica de Milligan-Morgan'],
        ['Cerrada (Ferguson)', 'Se realiza hemorroidectomía cerrada según técnica de Ferguson'],
        ['Con dispositivo de sellado', 'Se realiza hemorroidectomía excisional con dispositivo de sellado vascular'],
        ['Hemorroidopexia con sutura mecánica', 'Se realiza hemorroidopexia con sutura mecánica circular'],
        ['Desarterialización guiada por Doppler', 'Se realiza desarterialización hemorroidal guiada por Doppler con mucopexia']
      ] },

      { id: 'grado', l: 'Grado', sec: 'C', k: 'opt', q: 1, o: [
        ['Grado II', 'Enfermedad hemorroidal interna grado II'],
        ['Grado III', 'Enfermedad hemorroidal interna grado III'],
        ['Grado IV', 'Enfermedad hemorroidal interna grado IV'],
        ['Mixta', 'Enfermedad hemorroidal mixta, interna y externa'],
        ['Trombosada', 'Enfermedad hemorroidal con trombosis']
      ] },
      { id: 'asoc', l: 'Hallazgos asociados', sec: 'C', k: 'multi', o: [
        ['Sin fisura ni fístula', 'Sin fisura ni fístula asociadas'],
        ['Fisura anal', 'Fisura anal asociada'],
        ['Fístula', 'Orificio fistuloso asociado'],
        ['Plicomas', 'Plicomas asociados'],
        ['Lesión de aspecto polipoide', 'Lesión de aspecto polipoide en {d}']
      ], ph: 'localización' },

      { id: 'paq', l: 'Paquetes tratados', sec: 'D', k: 'multi', req: 1, q: 1, p: 'Se tratan los paquetes hemorroidales {v}', o: [
        ['Lateral izquierdo (3 h)', 'lateral izquierdo (hora 3 en litotomía)'],
        ['Anterior derecho (11 h)', 'anterior derecho (hora 11 en litotomía)'],
        ['Posterior derecho (7 h)', 'posterior derecho (hora 7 en litotomía)'],
        ['Accesorio', 'accesorio en {d}']
      ], ph: 'hora en litotomía' },
      { id: 'pedi', l: 'Tratamiento del pedículo', sec: 'D', k: 'opt', if: ['tec', ['Abierta (Milligan-Morgan)', 'Cerrada (Ferguson)']], o: [
        ['Ligadura transfixiante', 'punto transfixiante de material reabsorbible'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Electrocoagulación', 'electrocoagulación']
      ] },
      { id: 'prev', l: 'Estructuras preservadas', sec: 'D', k: 'multi', q: 1, o: [
        ['Esfínter anal interno', 'Se identifica y preserva el esfínter anal interno'],
        ['Puentes mucocutáneos', 'Se preservan puentes mucocutáneos entre las heridas'],
        ['Pared vaginal posterior', 'Se controla la indemnidad de la pared vaginal posterior antes del disparo']
      ] },
      { id: 'bolsa', l: 'Altura de la jareta (sutura mecánica)', sec: 'D', k: 'num', u: 'cm', if: ['tec', 'Hemorroidopexia con sutura mecánica'], p: 'Jareta submucosa a {v} cm por encima de la línea pectínea' },
      { id: 'narter', l: 'Ramas arteriales ligadas', sec: 'D', k: 'num', if: ['tec', 'Desarterialización guiada por Doppler'], p: 'Se ligan {v} ramas arteriales' },

      { id: 'anillo', l: 'Anillo de mucosa (sutura mecánica)', sec: 'F', k: 'opt', if: ['tec', 'Hemorroidopexia con sutura mecánica'], o: [
        ['Completo', 'Se obtiene anillo de mucosa completo'],
        ['Incompleto', 'Se obtiene anillo de mucosa incompleto']
      ] },

      { id: 'tapon', l: 'Taponaje', sec: 'G', k: 'opt', o: [
        ['Sin taponaje', 'No se deja taponaje endoanal'],
        ['Gasa', 'Se deja gasa endoanal'],
        ['Esponja hemostática', 'Se deja esponja hemostática endoanal']
      ] }
    ],
    pasos: [
      'Se realiza tacto rectal y anoscopía bajo anestesia',
      'Se coloca separador anal',
      'Se infiltra la región perianal con anestésico local',
      { t: 'Se toma el paquete hemorroidal con pinza y se tracciona hacia afuera', if: ['tec', ['Abierta (Milligan-Morgan)', 'Cerrada (Ferguson)', 'Con dispositivo de sellado']] },
      { t: 'Se realiza incisión cutánea en V en la base del paquete', if: ['tec', ['Abierta (Milligan-Morgan)', 'Cerrada (Ferguson)']] },
      { t: 'Se diseca el paquete separándolo de las fibras del esfínter anal interno', if: ['tec', ['Abierta (Milligan-Morgan)', 'Cerrada (Ferguson)']] },
      { t: 'Se liga el pedículo hemorroidal con {pedi} y se reseca el paquete', if: ['tec', ['Abierta (Milligan-Morgan)', 'Cerrada (Ferguson)']] },
      { t: 'Se sella y secciona el paquete con dispositivo de sellado vascular', if: ['tec', 'Con dispositivo de sellado'] },
      { t: 'Se cierra la herida con sutura continua de material reabsorbible', if: ['tec', 'Cerrada (Ferguson)'] },
      { t: 'Se coloca dilatador anal circular', if: ['tec', 'Hemorroidopexia con sutura mecánica'] },
      { t: 'Se realiza jareta submucosa a {bolsa} cm por encima de la línea pectínea', if: ['tec', 'Hemorroidopexia con sutura mecánica'] },
      { t: 'Se introduce la sutura mecánica circular, se anuda la jareta y se realiza el disparo', if: ['tec', 'Hemorroidopexia con sutura mecánica'] },
      { t: 'Se revisa la línea de sutura mecánica', if: ['tec', 'Hemorroidopexia con sutura mecánica'] },
      { t: 'Se introduce el proctoscopio con sonda Doppler', if: ['tec', 'Desarterialización guiada por Doppler'] },
      { t: 'Se localizan las ramas arteriales por señal Doppler y se ligan con puntos en X', if: ['tec', 'Desarterialización guiada por Doppler'] },
      { t: 'Se realiza mucopexia con sutura continua sobre los paquetes prolapsados', if: ['tec', 'Desarterialización guiada por Doppler'] }
    ],
    ej: 'Se realiza hemorroidectomía cerrada según técnica de Ferguson. Se realiza tacto rectal y anoscopía bajo anestesia y se coloca separador anal. Enfermedad hemorroidal interna grado III. Sin fisura ni fístula asociadas. Se infiltra la región perianal con anestésico local. Se toma el paquete hemorroidal con pinza y se tracciona hacia afuera, se realiza incisión cutánea en V en la base del paquete y se diseca el paquete separándolo de las fibras del esfínter anal interno. Se liga el pedículo hemorroidal con punto transfixiante de material reabsorbible y se reseca el paquete. Se cierra la herida con sutura continua de material reabsorbible. Se tratan los paquetes hemorroidales lateral izquierdo (hora 3 en litotomía), anterior derecho (hora 11 en litotomía) y posterior derecho (hora 7 en litotomía). Se identifica y preserva el esfínter anal interno y se preservan puentes mucocutáneos entre las heridas. Se envía pieza a Anatomía Patológica. No se deja taponaje endoanal. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Fistulotomía anal ─────────────────────────────
  {
    id: 'cg-fist',
    n: 'Fistulotomía anal',
    sp: 'Cirugía general',
    sub: 'Coloproctología',
    cat: 'Proctología',
    syn: ['fístula anal', 'fístula perianal', 'fistulectomía', 'fístula interesfinteriana', 'fístula transesfinteriana', 'puesta a plano', 'Parks'],
    v: 1,
    rev: '2026-10',
    ref: 'Gaertner WB et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the management of anorectal abscess, fistula-in-ano, and rectovaginal fistula. Dis Colon Rectum 2022;65:964-985',
    ctx: 'Fístula anal simple (interesfinteriana o transesfinteriana baja) apta para puesta a plano. La guía ASCRS recomienda documentar la clasificación de Parks, la ubicación de los orificios y la porción de esfínter comprometida, y reservar las técnicas preservadoras para fístulas complejas.',
    lat: false,
    f: [
      { id: 'clasif', l: 'Clasificación de Parks', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Subcutánea', 'Fístula subcutánea'],
        ['Interesfinteriana', 'Fístula interesfinteriana'],
        ['Transesfinteriana baja', 'Fístula transesfinteriana baja'],
        ['Transesfinteriana alta', 'Fístula transesfinteriana alta'],
        ['Supraesfinteriana', 'Fístula supraesfinteriana'],
        ['Extraesfinteriana', 'Fístula extraesfinteriana']
      ] },
      { id: 'recid', l: 'Primaria o recidivada', sec: 'B', k: 'opt', vr: 1, o: [
        ['Primaria', 'Fístula primaria'],
        ['Recidivada', 'Fístula recidivada tras tratamiento previo']
      ] },

      { id: 'oe', l: 'Orificio externo', sec: 'C', k: 'text', q: 1, p: 'Orificio externo en {v}', ph: 'hora 7 en litotomía, a 3 cm del margen anal' },
      { id: 'oi', l: 'Orificio interno', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Identificado', 'Se identifica orificio interno en {d}'],
        ['No identificado', 'No se identifica orificio interno']
      ], ph: 'hora 6, a nivel de la línea pectínea' },
      { id: 'ident', l: 'Método de identificación del trayecto', sec: 'C', k: 'multi', p: 'Se identifica el trayecto mediante {v}', o: [
        ['Estilete', 'estilete'],
        ['Agua oxigenada', 'inyección de agua oxigenada'],
        ['Azul de metileno', 'inyección de azul de metileno'],
        ['Tracción del orificio externo', 'tracción del orificio externo']
      ] },
      { id: 'compr', l: 'Esfínter comprometido', sec: 'C', k: 'text', q: 1, p: 'El trayecto compromete {v}', ph: 'menos de un tercio del esfínter externo' },
      { id: 'ramif', l: 'Trayectos secundarios', sec: 'C', k: 'opt', o: [
        ['Sin trayectos secundarios', 'Sin trayectos secundarios'],
        ['En herradura', 'Trayecto en herradura'],
        ['Extensión secundaria', 'Extensión secundaria hacia {d}']
      ], ph: 'dirección' },

      { id: 'prev', l: 'Estructuras preservadas', sec: 'D', k: 'multi', o: [
        ['Esfínter externo por encima del trayecto', 'Se preservan las fibras del esfínter anal externo por encima del trayecto'],
        ['Haz puborrectal', 'Se identifica y preserva el haz puborrectal']
      ] },
      { id: 'marsup', l: 'Marsupialización', sec: 'D', k: 'yn', y: 'Se marsupializan los bordes de la herida con puntos de material reabsorbible', n: 'No se marsupializa la herida' }
    ],
    pasos: [
      'Se realiza tacto rectal y anoscopía bajo anestesia',
      'Se canaliza el trayecto fistuloso con estilete desde el orificio externo hasta el orificio interno',
      'Se secciona sobre el estilete la piel, el tejido celular subcutáneo y las fibras esfinterianas comprendidas en el trayecto',
      'Se realiza curetaje del tejido de granulación del trayecto',
      'Se toma biopsia del trayecto',
      'Se regularizan los bordes de la herida'
    ],
    ej: 'Fístula interesfinteriana. Fístula primaria. Se realiza tacto rectal y anoscopía bajo anestesia. Orificio externo en hora 7 en litotomía, a 3 cm del margen anal. Se identifica orificio interno en hora 6, a nivel de la línea pectínea. Se identifica el trayecto mediante estilete e inyección de agua oxigenada. El trayecto compromete la porción más baja del esfínter interno. Sin trayectos secundarios. Se canaliza el trayecto fistuloso con estilete desde el orificio externo hasta el orificio interno y se secciona sobre el estilete la piel, el tejido celular subcutáneo y las fibras esfinterianas comprendidas en el trayecto. Se realiza curetaje del tejido de granulación del trayecto y se regularizan los bordes de la herida. Se marsupializan los bordes de la herida con puntos de material reabsorbible. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Colocación de setón ─────────────────────────────
  {
    id: 'cg-seton',
    n: 'Colocación de setón',
    sp: 'Cirugía general',
    sub: 'Coloproctología',
    cat: 'Proctología',
    syn: ['setón', 'sedal', 'setón laxo', 'setón de drenaje', 'setón cortante', 'fístula compleja', 'Crohn perianal'],
    v: 1,
    rev: '2026-10',
    ref: 'Gaertner WB et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the management of anorectal abscess, fistula-in-ano, and rectovaginal fistula. Dis Colon Rectum 2022;65:964-985',
    ctx: 'Fístula anal compleja, transesfinteriana alta, en enfermedad de Crohn o asociada a absceso, en la que no corresponde fistulotomía primaria. Variante: setón laxo de drenaje, cortante o como primer tiempo de técnica preservadora de esfínter.',
    lat: false,
    f: [
      { id: 'tset', l: 'Tipo de setón', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Laxo de drenaje', 'Se coloca setón laxo de drenaje'],
        ['Cortante', 'Se coloca setón cortante'],
        ['Primer tiempo de técnica preservadora', 'Se coloca setón laxo como primer tiempo de técnica preservadora de esfínter']
      ] },
      { id: 'clasif', l: 'Clasificación de Parks', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Interesfinteriana', 'Fístula interesfinteriana'],
        ['Transesfinteriana baja', 'Fístula transesfinteriana baja'],
        ['Transesfinteriana alta', 'Fístula transesfinteriana alta'],
        ['Supraesfinteriana', 'Fístula supraesfinteriana'],
        ['Extraesfinteriana', 'Fístula extraesfinteriana']
      ] },
      { id: 'crohn', l: 'Enfermedad de Crohn', sec: 'B', k: 'yn', y: 'Paciente con enfermedad de Crohn perianal conocida', n: 'Sin antecedente de enfermedad de Crohn' },

      { id: 'oe', l: 'Orificio externo', sec: 'C', k: 'text', q: 1, p: 'Orificio externo en {v}', ph: 'hora 5 en litotomía, a 4 cm del margen anal' },
      { id: 'oi', l: 'Orificio interno', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Identificado', 'Se identifica orificio interno en {d}'],
        ['No identificado', 'No se identifica orificio interno']
      ], ph: 'hora 6, a nivel de la línea pectínea' },
      { id: 'compr', l: 'Esfínter comprometido', sec: 'C', k: 'text', q: 1, p: 'El trayecto compromete {v}', ph: 'más de un tercio del esfínter externo' },
      { id: 'ramif', l: 'Trayectos secundarios', sec: 'C', k: 'opt', o: [
        ['Sin trayectos secundarios', 'Sin trayectos secundarios'],
        ['En herradura', 'Trayecto en herradura'],
        ['Extensión secundaria', 'Extensión secundaria hacia {d}']
      ], ph: 'dirección' },
      { id: 'absc', l: 'Absceso asociado', sec: 'C', k: 'opt', o: [
        ['Sin absceso', 'Sin absceso asociado'],
        ['Con absceso', 'Absceso asociado en {d}']
      ], ph: 'espacio' },

      { id: 'nset', l: 'Número de setones', sec: 'D', k: 'num', p: 'Se colocan {v} setones' },
      { id: 'smat', l: 'Material del setón', sec: 'E', k: 'opt', q: 1, p: 'Setón de {v}', o: [
        ['Banda elástica de silicona', 'banda elástica de silicona'],
        ['Sutura no reabsorbible', 'sutura no reabsorbible gruesa'],
        ['Drenaje laminar fino', 'drenaje laminar fino']
      ] }
    ],
    pasos: [
      'Se realiza tacto rectal y anoscopía bajo anestesia',
      'Se canaliza el trayecto fistuloso con estilete desde el orificio externo hasta el orificio interno',
      'Se drena el absceso asociado y se curetea el trayecto',
      { t: 'Se secciona la piel y el tejido celular subcutáneo sobre el trayecto', if: ['tset', 'Cortante'] },
      'Se pasa el setón a través del trayecto con el estilete',
      { t: 'Se anuda el setón sin tensión, dejando un asa holgada', if: ['tset', ['Laxo de drenaje', 'Primer tiempo de técnica preservadora']] },
      { t: 'Se anuda el setón con tensión sobre las fibras esfinterianas', if: ['tset', 'Cortante'] }
    ],
    ej: 'Se coloca setón laxo de drenaje. Fístula transesfinteriana alta. Sin antecedente de enfermedad de Crohn. Se realiza tacto rectal y anoscopía bajo anestesia. Orificio externo en hora 5 en litotomía, a 4 cm del margen anal. Se identifica orificio interno en hora 6, a nivel de la línea pectínea. El trayecto compromete más de un tercio del esfínter externo. Sin trayectos secundarios. Sin absceso asociado. Se canaliza el trayecto fistuloso con estilete desde el orificio externo hasta el orificio interno, se pasa el setón a través del trayecto con el estilete y se anuda el setón sin tensión, dejando un asa holgada. Setón de banda elástica de silicona. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Drenaje de absceso perianal o perirrectal ─────────────────────────────
  {
    id: 'cg-absper',
    n: 'Drenaje de absceso perianal o perirrectal',
    sp: 'Cirugía general',
    sub: 'Coloproctología',
    cat: 'Proctología',
    syn: ['absceso perianal', 'absceso isquiorrectal', 'absceso anorrectal', 'absceso interesfinteriano', 'absceso supraelevador', 'absceso en herradura', 'Hanley'],
    v: 1,
    rev: '2026-10',
    ref: 'Gaertner WB et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the management of anorectal abscess, fistula-in-ano, and rectovaginal fistula. Dis Colon Rectum 2022;65:964-985',
    ctx: 'Absceso anorrectal que requiere drenaje. La guía ASCRS recomienda incisión lo más cercana posible al margen anal, sin buscar agresivamente el orificio interno; si se identifica una fístula simple puede realizarse fistulotomía, y en las complejas, setón laxo.',
    lat: false,
    f: [
      { id: 'loc', l: 'Localización', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Perianal', 'Absceso perianal {d}'],
        ['Isquiorrectal', 'Absceso isquiorrectal {d}'],
        ['Interesfinteriano', 'Absceso interesfinteriano {d}'],
        ['Supraelevador', 'Absceso supraelevador {d}'],
        ['En herradura (postanal profundo)', 'Absceso en herradura del espacio postanal profundo']
      ], ph: 'lado y hora en litotomía' },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Incisión perianal', 'Se realiza incisión cutánea sobre la colección, próxima al margen anal'],
        ['Transanal', 'Se realiza drenaje por vía transanal, con apertura de la pared sobre la colección'],
        ['Con catéter', 'Se realiza drenaje con catéter a través de una incisión puntiforme'],
        ['Hanley modificada', 'Se realiza drenaje del espacio postanal profundo según técnica de Hanley modificada, con contraaberturas laterales']
      ] },

      { id: 'tam', l: 'Tamaño de la colección', sec: 'C', k: 'text', p: 'Colección de aproximadamente {v}', ph: '4 × 3 cm' },
      { id: 'car', l: 'Características del contenido', sec: 'C', k: 'multi', q: 1, p: 'Colección de contenido {v}', o: [
        ['Purulento', 'purulento'],
        ['Fecaloideo', 'fecaloideo'],
        ['Fétido', 'de olor fétido'],
        ['Tabicada', 'con tabiques']
      ] },
      { id: 'fist', l: 'Fístula', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['No identificada', 'No se identifica orificio fistuloso interno'],
        ['Identificada', 'Se identifica orificio fistuloso interno en {d}'],
        ['No explorada', 'No se explora en busca de orificio fistuloso']
      ], ph: 'hora en litotomía' },
      { id: 'vol', l: 'Cantidad drenada', sec: 'D', k: 'num', u: 'mL', p: 'Se drenan aproximadamente {v} mL' },
      { id: 'cfist', l: 'Conducta sobre la fístula', sec: 'D', k: 'opt', if: ['fist', 'Identificada'], o: [
        ['Sin procedimiento', 'No se realiza procedimiento sobre la fístula'],
        ['Fistulotomía primaria', 'Se realiza fistulotomía primaria de trayecto simple'],
        ['Setón laxo', 'Se coloca setón laxo a través del trayecto fistuloso']
      ] },
      { id: 'cate', l: 'Catéter', sec: 'E', k: 'text', if: ['via', 'Con catéter'], p: 'Se deja catéter {v}', ph: 'tipo Pezzer de 12 Fr' },

      { id: 'micro', l: 'Toma de muestras para microbiología', sec: 'F', k: 'multi', o: [
        ['Cultivo y antibiograma', 'Se toma muestra del contenido para cultivo y antibiograma'],
        ['Cultivo anaerobio', 'Se toma muestra para cultivo de gérmenes anaerobios'],
        ['No se toman muestras', 'No se toman muestras para microbiología']
      ] },
      { id: 'herida', l: 'Manejo de la cavidad', sec: 'G', k: 'opt', q: 1, o: [
        ['Abierta con taponaje', 'Se deja la cavidad abierta con taponaje de gasa'],
        ['Abierta sin taponaje', 'Se deja la cavidad abierta, sin taponaje'],
        ['Catéter', 'Se deja catéter de drenaje fijado a la piel'],
        ['Drenaje laminar', 'Se deja drenaje laminar en la cavidad']
      ] }
    ],
    pasos: [
      'Se realiza tacto rectal y anoscopía bajo anestesia',
      'Se realiza punción exploradora de la colección',
      { t: 'Se realiza incisión cutánea lo más próxima posible al margen anal, sobre la colección', if: ['via', 'Incisión perianal'] },
      { t: 'Se realiza incisión de la pared rectal sobre la colección por vía transanal', if: ['via', 'Transanal'] },
      { t: 'Se realiza incisión en la línea media posterior, entre el cóccix y el margen anal, con sección del ligamento anococcígeo superficial', if: ['via', 'Hanley modificada'] },
      'Se evacua el contenido de la colección',
      'Se realiza exploración digital de la cavidad y ruptura de tabiques',
      'Se busca el orificio interno con estilete, sin forzar el trayecto',
      { t: 'Se reseca un huso cutáneo de los bordes de la incisión', if: ['via', 'Incisión perianal'] }
    ],
    ej: 'Absceso isquiorrectal izquierdo, hora 3 en litotomía. Se realiza incisión cutánea sobre la colección, próxima al margen anal. Se realiza tacto rectal y anoscopía bajo anestesia y punción exploradora de la colección. Se realiza incisión cutánea lo más próxima posible al margen anal, sobre la colección. Colección de aproximadamente 5 × 4 cm, de contenido purulento y de olor fétido. Se evacua el contenido de la colección y se realiza exploración digital de la cavidad y ruptura de tabiques. Se drenan aproximadamente 40 mL. No se identifica orificio fistuloso interno. Se toma muestra del contenido para cultivo y antibiograma. Se deja la cavidad abierta con taponaje de gasa. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Fisura anal ─────────────────────────────
  {
    id: 'cg-fisu',
    n: 'Fisurectomía o tratamiento quirúrgico de fisura anal',
    sp: 'Cirugía general',
    sub: 'Coloproctología',
    cat: 'Proctología',
    syn: ['fisura anal', 'esfinterotomía lateral interna', 'ELI', 'fisurectomía', 'toxina botulínica', 'colgajo anocutáneo', 'esfinterotomía'],
    v: 1,
    rev: '2026-10',
    ref: 'Davids JS et al. The American Society of Colon and Rectal Surgeons clinical practice guideline for the management of anal fissures. Dis Colon Rectum 2023;66:190-199',
    ctx: 'Fisura anal crónica refractaria al tratamiento médico. Variantes: esfinterotomía lateral interna abierta o cerrada (tratamiento de elección según ASCRS), fisurectomía (aislada o asociada), infiltración de toxina botulínica o colgajo de avance anocutáneo en pacientes con tono normal o riesgo de incontinencia.',
    lat: false,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Esfinterotomía lateral interna abierta', 'Se realiza esfinterotomía lateral interna abierta'],
        ['Esfinterotomía lateral interna cerrada', 'Se realiza esfinterotomía lateral interna cerrada'],
        ['Fisurectomía', 'Se realiza fisurectomía'],
        ['Fisurectomía con esfinterotomía', 'Se realiza fisurectomía asociada a esfinterotomía lateral interna'],
        ['Fisurectomía con toxina botulínica', 'Se realiza fisurectomía asociada a infiltración de toxina botulínica'],
        ['Toxina botulínica', 'Se realiza infiltración de toxina botulínica en el esfínter anal interno'],
        ['Colgajo de avance anocutáneo', 'Se realiza colgajo de avance anocutáneo']
      ] },

      { id: 'loc', l: 'Localización', sec: 'C', k: 'opt', req: 1, q: 1, o: [
        ['Posterior', 'Fisura anal posterior (hora 6 en litotomía)'],
        ['Anterior', 'Fisura anal anterior (hora 12 en litotomía)'],
        ['Lateral', 'Fisura anal lateral en {d}'],
        ['Múltiple', 'Fisuras anales múltiples']
      ], ph: 'hora en litotomía' },
      { id: 'cron', l: 'Signos de cronicidad', sec: 'C', k: 'multi', q: 1, p: 'Fisura con {v}', o: [
        ['Plicoma centinela', 'plicoma centinela'],
        ['Papila hipertrófica', 'papila hipertrófica'],
        ['Fibras del esfínter interno expuestas', 'fibras del esfínter anal interno expuestas en el lecho'],
        ['Bordes indurados', 'bordes indurados']
      ] },
      { id: 'tono', l: 'Tono esfinteriano', sec: 'C', k: 'opt', o: [
        ['Hipertonía', 'Hipertonía del esfínter anal'],
        ['Conservado', 'Tono esfinteriano conservado'],
        ['Disminuido', 'Tono esfinteriano disminuido']
      ] },

      { id: 'eli', l: 'Extensión de la esfinterotomía', sec: 'D', k: 'opt', q: 1, if: ['tec', ['Esfinterotomía lateral interna abierta', 'Esfinterotomía lateral interna cerrada', 'Fisurectomía con esfinterotomía']], o: [
        ['Hasta el vértice de la fisura', 'Se secciona el esfínter anal interno hasta la altura del vértice de la fisura'],
        ['Hasta la línea pectínea', 'Se secciona el esfínter anal interno hasta la línea pectínea']
      ] },
      { id: 'elado', l: 'Lado de la esfinterotomía', sec: 'D', k: 'opt', if: ['tec', ['Esfinterotomía lateral interna abierta', 'Esfinterotomía lateral interna cerrada', 'Fisurectomía con esfinterotomía']], p: 'Esfinterotomía {v}', o: [
        ['Lateral izquierda', 'lateral izquierda'],
        ['Lateral derecha', 'lateral derecha']
      ] },
      { id: 'tbdos', l: 'Dosis de toxina botulínica', sec: 'D', k: 'num', u: 'U', if: ['tec', ['Toxina botulínica', 'Fisurectomía con toxina botulínica']], p: 'Se infiltran {v} unidades de toxina botulínica' },
      { id: 'tbsit', l: 'Sitios de infiltración', sec: 'D', k: 'text', if: ['tec', ['Toxina botulínica', 'Fisurectomía con toxina botulínica']], p: 'La infiltración se distribuye en {v}', ph: 'ambos lados de la fisura, en el esfínter interno' },
      { id: 'plic', l: 'Plicoma centinela', sec: 'D', k: 'yn', y: 'Se reseca el plicoma centinela', n: 'No se reseca el plicoma centinela' },
      { id: 'papi', l: 'Papila hipertrófica', sec: 'D', k: 'yn', y: 'Se reseca la papila hipertrófica', n: 'No se reseca la papila hipertrófica' }
    ],
    pasos: [
      'Se realiza tacto rectal y anoscopía bajo anestesia',
      'Se coloca separador anal',
      { t: 'Se palpa el surco interesfinteriano lateral', if: ['tec', ['Esfinterotomía lateral interna abierta', 'Esfinterotomía lateral interna cerrada', 'Fisurectomía con esfinterotomía']] },
      { t: 'Se realiza incisión radial sobre el surco interesfinteriano lateral', if: ['tec', ['Esfinterotomía lateral interna abierta', 'Fisurectomía con esfinterotomía']] },
      { t: 'Se diseca el esfínter anal interno separándolo de la mucosa y del esfínter externo, y se secciona', if: ['tec', ['Esfinterotomía lateral interna abierta', 'Fisurectomía con esfinterotomía']] },
      { t: 'Se introduce bisturí de hoja fina en el surco interesfinteriano y se secciona el esfínter interno', if: ['tec', 'Esfinterotomía lateral interna cerrada'] },
      { t: 'Se resecan los bordes fibrosos y el lecho de la fisura sin seccionar el esfínter interno', if: ['tec', ['Fisurectomía', 'Fisurectomía con esfinterotomía', 'Fisurectomía con toxina botulínica']] },
      { t: 'Se infiltra la toxina botulínica en el esfínter anal interno', if: ['tec', ['Toxina botulínica', 'Fisurectomía con toxina botulínica']] },
      { t: 'Se reseca el lecho de la fisura y se talla un colgajo anocutáneo', if: ['tec', 'Colgajo de avance anocutáneo'] },
      { t: 'Se avanza el colgajo sobre el defecto y se fija con puntos de material reabsorbible', if: ['tec', 'Colgajo de avance anocutáneo'] },
      'Se realiza compresión digital del sitio de la esfinterotomía'
    ],
    ej: 'Se realiza esfinterotomía lateral interna abierta. Se realiza tacto rectal y anoscopía bajo anestesia y se coloca separador anal. Fisura anal posterior (hora 6 en litotomía). Fisura con plicoma centinela y fibras del esfínter anal interno expuestas en el lecho. Hipertonía del esfínter anal. Se palpa el surco interesfinteriano lateral, se realiza incisión radial sobre el surco interesfinteriano lateral y se diseca el esfínter anal interno separándolo de la mucosa y del esfínter externo, y se secciona. Se secciona el esfínter anal interno hasta la altura del vértice de la fisura. Esfinterotomía lateral izquierda. Se reseca el plicoma centinela. Se envía pieza a Anatomía Patológica. No se coloca drenaje. Sin complicaciones intraoperatorias.'
  },

  // ───────────────────────────── Quiste pilonidal ─────────────────────────────
  {
    id: 'cg-pilo',
    n: 'Resección de quiste pilonidal',
    sp: 'Cirugía general',
    sub: 'Coloproctología',
    cat: 'Proctología',
    syn: ['quiste pilonidal', 'sinus pilonidal', 'enfermedad pilonidal', 'Karydakis', 'Bascom', 'cleft lift', 'Limberg', 'colgajo romboidal', 'pit picking', 'EPSiT', 'sacrococcígeo'],
    v: 1,
    rev: '2026-10',
    ref: 'Johnson EK et al. The American Society of Colon and Rectal Surgeons clinical practice guidelines for the management of pilonidal disease. Dis Colon Rectum 2019;62:146-157',
    ctx: 'Enfermedad pilonidal sacrococcígea crónica, primaria o recidivada. Variantes técnicas: resección con cierre por segunda intención, cierre primario en línea media, marsupialización, colgajos de lateralización (Karydakis, elevación del pliegue de Bascom, Limberg) y técnicas mínimamente invasivas. La guía ASCRS desaconseja el cierre en línea media y favorece técnicas que lateralizan la herida.',
    lat: false,
    f: [
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', vr: 1, req: 1, q: 1, o: [
        ['Resección con herida abierta', 'Se realiza resección del seno pilonidal con cierre por segunda intención'],
        ['Resección con cierre en línea media', 'Se realiza resección del seno pilonidal con cierre primario en línea media'],
        ['Resección con marsupialización', 'Se realiza resección del seno pilonidal con marsupialización'],
        ['Colgajo de Karydakis', 'Se realiza resección y colgajo de avance según técnica de Karydakis'],
        ['Elevación del pliegue (Bascom)', 'Se realiza elevación del pliegue interglúteo según técnica de Bascom'],
        ['Colgajo romboidal (Limberg)', 'Se realiza resección y colgajo romboidal de Limberg'],
        ['Extracción de orificios (pit picking)', 'Se realiza extracción de los orificios y curetaje de la cavidad'],
        ['Endoscópica', 'Se realiza tratamiento endoscópico del seno pilonidal']
      ] },
      { id: 'pres', l: 'Primaria o recidivada', sec: 'B', k: 'opt', vr: 1, q: 1, o: [
        ['Primaria', 'Enfermedad pilonidal primaria'],
        ['Recidivada', 'Enfermedad pilonidal recidivada tras tratamiento previo']
      ] },

      { id: 'norif', l: 'Orificios en la línea media', sec: 'C', k: 'num', q: 1, p: 'Se identifican {v} orificios en la línea media' },
      { id: 'olat', l: 'Orificios laterales', sec: 'C', k: 'opt', o: [
        ['Sin orificios laterales', 'Sin orificios laterales'],
        ['Con orificios laterales', 'Orificios laterales en {d}']
      ], ph: 'lado y distancia a la línea media' },
      { id: 'tam', l: 'Extensión del seno', sec: 'C', k: 'text', q: 1, p: 'Seno de {v}', ph: '5 cm de longitud' },
      { id: 'cont', l: 'Contenido del seno', sec: 'C', k: 'multi', p: 'Seno con {v}', o: [
        ['Pelos', 'pelos'],
        ['Material purulento', 'material purulento'],
        ['Tejido de granulación', 'tejido de granulación'],
        ['Detritus', 'detritus']
      ] },
      { id: 'tray', l: 'Trayectos secundarios', sec: 'C', k: 'opt', o: [
        ['Sin trayectos secundarios', 'Sin trayectos secundarios'],
        ['Con trayectos secundarios', 'Trayectos secundarios hacia {d}']
      ], ph: 'dirección' },

      { id: 'tinc', l: 'Colorante', sec: 'D', k: 'yn', y: 'Se inyecta azul de metileno por los orificios para delimitar el trayecto', n: 'No se utiliza colorante' },
      { id: 'prof', l: 'Profundidad de la resección', sec: 'D', k: 'opt', if: ['tec', ['Resección con herida abierta', 'Resección con cierre en línea media', 'Resección con marsupialización', 'Colgajo de Karydakis', 'Colgajo romboidal (Limberg)']], o: [
        ['Limitada al seno', 'Se reseca el seno sin alcanzar la fascia presacra'],
        ['Hasta la fascia presacra', 'Se reseca el seno hasta la fascia presacra']
      ] },

      { id: 'herida', l: 'Manejo de la herida', sec: 'G', k: 'opt', q: 1, o: [
        ['Abierta con taponaje', 'Se deja la herida abierta con taponaje de gasa'],
        ['Presión negativa', 'Se coloca sistema de terapia de presión negativa'],
        ['Cierre lateralizado', 'Se cierra la piel con la línea de sutura alejada de la línea media'],
        ['Cierre en línea media', 'Se cierra la piel en la línea media']
      ] }
    ],
    pasos: [
      'Se marca el área de contacto de los pliegues glúteos con los glúteos aproximados',
      'Se identifican los orificios de la línea media y los laterales',
      'Se canaliza el trayecto con estilete',
      { t: 'Se realiza incisión elíptica que incluye los orificios y se reseca el seno en bloque', if: ['tec', ['Resección con herida abierta', 'Resección con cierre en línea media', 'Resección con marsupialización']] },
      { t: 'Se suturan los bordes de la piel al fondo de la herida', if: ['tec', 'Resección con marsupialización'] },
      { t: 'Se realiza resección elíptica asimétrica lateralizada', if: ['tec', 'Colgajo de Karydakis'] },
      { t: 'Se moviliza un colgajo del borde medial, se avanza sobre el defecto y se fija su base a la fascia sacrococcígea', if: ['tec', 'Colgajo de Karydakis'] },
      { t: 'Se reseca la piel del lado afectado y se eleva un colgajo del lado contralateral', if: ['tec', 'Elevación del pliegue (Bascom)'] },
      { t: 'Se curetea la cavidad por debajo del colgajo y se aplana el pliegue interglúteo', if: ['tec', 'Elevación del pliegue (Bascom)'] },
      { t: 'Se diseña un colgajo romboidal, se reseca el área romboidal con el seno y se rota el colgajo fasciocutáneo sobre el defecto', if: ['tec', 'Colgajo romboidal (Limberg)'] },
      { t: 'Se extraen los orificios con resección mínima de piel', if: ['tec', 'Extracción de orificios (pit picking)'] },
      { t: 'Se realiza incisión lateral de drenaje y se curetea la cavidad retirando los pelos', if: ['tec', 'Extracción de orificios (pit picking)'] },
      { t: 'Se introduce el fistuloscopio por el orificio y se retiran los pelos y el tejido de granulación bajo visión', if: ['tec', 'Endoscópica'] },
      { t: 'Se cauterizan las paredes del trayecto bajo visión endoscópica', if: ['tec', 'Endoscópica'] }
    ],
    ej: 'Se realiza resección y colgajo de avance según técnica de Karydakis. Enfermedad pilonidal primaria. Se marca el área de contacto de los pliegues glúteos con los glúteos aproximados. Se identifican los orificios de la línea media y los laterales y se canaliza el trayecto con estilete. Se identifican 3 orificios en la línea media. Sin orificios laterales. Seno de 5 cm de longitud. Seno con pelos y tejido de granulación. Sin trayectos secundarios. Se inyecta azul de metileno por los orificios para delimitar el trayecto. Se realiza resección elíptica asimétrica lateralizada. Se moviliza un colgajo del borde medial, se avanza sobre el defecto y se fija su base a la fascia sacrococcígea. Se reseca el seno sin alcanzar la fascia presacra. Se envía pieza a Anatomía Patológica. Se coloca drenaje aspirativo en el lecho. Se cierra la piel con la línea de sutura alejada de la línea media. Sin complicaciones intraoperatorias.'
  }
];
