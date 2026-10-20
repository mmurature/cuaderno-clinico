// Neurología y neurocirugía (parte A): examen neurológico y patologías neuroquirúrgicas agudas.
// Datos puros según docs/ESQUEMA_PLANTILLAS.md, sección 1.
export default [
  // ============================================================
  // BLOQUE 1 — EXAMEN NEUROLÓGICO
  // ============================================================
  {
    id: 'nx-completo',
    n: 'Examen neurológico completo',
    cat: 'Neurología · Examen neurológico',
    v: 1,
    d: 'Conciencia, orientación, Glasgow, lenguaje, pupilas, pares, fuerza, tono, reflejos, sensibilidad, coordinación, marcha y signos meníngeos',
    secs: [
      {
        id: 'cons', h: 'Conciencia y funciones superiores', f: [
          { id: 'conc', k: 'conc' },
          { id: 'orient', k: 'orient', j: ', ' },
          { id: 'gcs', k: 'gcs', j: ', ' },
          { id: 'colab', l: 'Colaboración', n: 'Colaborador', a: ['Parcialmente colaborador', 'No colaborador'], one: true, ne: 'Colaboración no evaluable', j: ', ' },
          {
            id: 'leng', l: 'Lenguaje', n: 'Lenguaje conservado',
            a: ['Afasia', 'Disfasia', 'Afasia expresiva', 'Afasia receptiva', 'Afasia mixta', 'Afasia global', 'Anomia', 'Alexia', 'Agrafia', 'Disartria', 'Anartria', 'Mutismo'],
            ne: 'Lenguaje no evaluable', d: 'detalle (p. ej. con comprensión conservada)', nom: 'del trastorno del lenguaje', pri: 7
          }
        ]
      },
      {
        id: 'pc', h: 'Pupilas y pares craneales', f: [
          { id: 'pup', k: 'pupils' },
          {
            id: 'moe', l: 'Motilidad ocular', n: 'Motilidad ocular extrínseca conservada',
            a: ['Limitación de la motilidad ocular derecha', 'Limitación de la motilidad ocular izquierda', 'Diplopía', 'Nistagmo horizontal', 'Nistagmo vertical', 'Nistagmo rotatorio'],
            ne: 'Motilidad ocular no evaluable', d: 'dirección afectada (p. ej. en la abducción)', nom: 'del trastorno de la motilidad ocular', pri: 3
          },
          {
            id: 'facial', l: 'Motilidad facial', n: 'Facies simétrica',
            a: ['Paresia facial central derecha', 'Paresia facial central izquierda', 'Paresia facial periférica derecha', 'Paresia facial periférica izquierda'],
            ne: 'Motilidad facial no evaluable', nom: 'de la paresia facial', pri: 3
          }
        ]
      },
      {
        id: 'mot', h: 'Motor y reflejos', f: [
          { id: 'mrc', k: 'mrc4' },
          {
            id: 'tono', l: 'Tono', n: 'Tono muscular conservado',
            a: ['Hipotonía', 'Hipertonía', 'Espasticidad', 'Rigidez', 'Paratonía'],
            ne: 'Tono muscular no evaluable', d: 'distribución (p. ej. en hemicuerpo derecho)', sc: { s: 'ashworth' }, nom: 'de la alteración del tono', pri: 6
          },
          { id: 'rot', k: 'rot' },
          { id: 'patol', k: 'patol' }
        ]
      },
      {
        id: 'sens', h: 'Sensibilidad', f: [
          { id: 'sens', k: 'sens' }
        ]
      },
      {
        id: 'cereb', h: 'Coordinación y marcha', f: [
          {
            id: 'coord', l: 'Coordinación', n: 'Coordinación conservada',
            a: [
              'Dismetría en prueba índice-nariz derecha', 'Dismetría en prueba índice-nariz izquierda',
              'Dismetría en prueba talón-rodilla derecha', 'Dismetría en prueba talón-rodilla izquierda',
              'Temblor de intención derecho', 'Temblor de intención izquierdo',
              'Disdiadococinesia derecha', 'Disdiadococinesia izquierda',
              'Ataxia apendicular derecha', 'Ataxia apendicular izquierda', 'Ataxia de tronco'
            ],
            ne: 'Coordinación no evaluable', d: 'detalle (p. ej. no evaluable en miembros izquierdos por paresia)', nom: 'de los trastornos de la coordinación', pri: 6
          },
          {
            id: 'marcha', l: 'Marcha', n: 'Marcha conservada', one: true,
            a: ['Marcha atáxica', 'Marcha hemiparética derecha', 'Marcha hemiparética izquierda', 'Marcha espástica', 'Marcha parkinsoniana', 'Marcha en steppage', 'Marcha apráxica', 'Marcha inestable', 'Imposibilidad para la deambulación'],
            ne: 'Marcha no evaluable', d: 'asistencia (p. ej. con andador)', nom: 'de la marcha', pri: 6
          }
        ]
      },
      {
        id: 'men', h: 'Signos meníngeos', f: [
          {
            id: 'mening', l: 'Signos meníngeos', n: 'Sin signos meníngeos',
            a: ['Rigidez de nuca', 'Kernig positivo', 'Brudzinski positivo'],
            ne: 'Signos meníngeos no evaluables', nom: 'de los signos meníngeos', pri: 10
          }
        ]
      }
    ]
  },

  {
    id: 'nx-glasgow',
    n: 'Glasgow',
    cat: 'Neurología · Examen neurológico',
    v: 1,
    d: 'Apertura ocular, respuesta verbal y motora con total automático y comparación con la evaluación previa',
    secs: [
      {
        id: 'gcs', h: 'Escala de coma de Glasgow', f: [
          { id: 'gcs', k: 'gcs' },
          { id: 'hora', k: 'text', l: 'Hora de evaluación', p: 'en el control de las {v}', ph: '14:30 h', j: ' ' }
        ]
      }
    ]
  },

  {
    id: 'nx-pares',
    n: 'Pares craneales',
    cat: 'Neurología · Examen neurológico',
    v: 1,
    d: 'Examen detallado de los pares craneales I a XII',
    allN: 'Pares craneales sin déficit evidente',
    secs: [
      
      {
        id: 'p12', h: 'I y II — Olfatorio y óptico', f: [
          { id: 'olf', l: 'I — Olfato', n: 'Olfato conservado', a: ['Hiposmia', 'Anosmia'], one: true, d: 'lado (p. ej. derecha)', ne: 'Olfato no evaluable', nom: 'de la alteración olfatoria' },
          {
            id: 'av', l: 'II — Agudeza visual', n: 'Agudeza visual conservada',
            a: ['Disminución de la agudeza visual derecha', 'Disminución de la agudeza visual izquierda', 'Amaurosis derecha', 'Amaurosis izquierda'],
            d: 'valor (p. ej. cuenta dedos a 1 m)', ne: 'Agudeza visual no evaluable', nom: 'del déficit visual', pri: 3
          },
          {
            id: 'cv', l: 'II — Campos visuales', n: 'Campos visuales conservados por confrontación',
            a: ['Hemianopsia homónima derecha', 'Hemianopsia homónima izquierda', 'Hemianopsia bitemporal', 'Cuadrantanopsia superior derecha', 'Cuadrantanopsia superior izquierda', 'Cuadrantanopsia inferior derecha', 'Cuadrantanopsia inferior izquierda'],
            d: 'detalle', ne: 'Campos visuales no evaluables', nom: 'del defecto campimétrico', pri: 3
          },
          {
            id: 'fo', l: 'II — Fondo de ojo', n: 'Fondo de ojo sin particularidades',
            a: ['Edema de papila derecho', 'Edema de papila izquierdo', 'Palidez papilar derecha', 'Palidez papilar izquierda', 'Hemorragias retinianas'],
            d: 'detalle', ne: 'Fondo de ojo no evaluable', nom: 'del edema de papila'
          },
          { id: 'pup', k: 'pupils' },
          { id: 'dpa', l: 'II — Defecto pupilar aferente', n: 'Sin defecto pupilar aferente', a: ['Defecto pupilar aferente relativo derecho', 'Defecto pupilar aferente relativo izquierdo'], ne: 'Defecto pupilar aferente no evaluable' },
          { id: 'altvis', l: 'II — Síntomas visuales', n: 'Sin síntomas visuales', a: ['Visión borrosa', 'Fotopsias', 'Escotomas', 'Amaurosis fugaz'], d: 'detalle (p. ej. en ojo derecho)' }
        ]
      },
      {
        id: 'p346', h: 'III, IV y VI — Oculomotores', f: [
          {
            id: 'moe', l: 'Movimientos oculares', n: 'Motilidad ocular extrínseca conservada',
            a: [
              'Paresia del III par derecho', 'Paresia del III par izquierdo',
              'Paresia del IV par derecho', 'Paresia del IV par izquierdo',
              'Paresia del VI par derecho', 'Paresia del VI par izquierdo',
              'Paresia de la mirada vertical superior', 'Paresia de la mirada vertical inferior'
            ],
            d: 'movimiento limitado (p. ej. limitación de la abducción)', ne: 'Motilidad ocular no evaluable', nom: 'del trastorno de la motilidad ocular', pri: 3
          },
          {
            id: 'mirconj', l: 'Mirada conjugada', n: 'Sin desviación conjugada de la mirada', one: true,
            a: ['Desviación conjugada de la mirada hacia la derecha', 'Desviación conjugada de la mirada hacia la izquierda', 'Desviación conjugada de la mirada hacia abajo', 'Desviación conjugada de la mirada hacia arriba'],
            nom: 'de la desviación de la mirada', pri: 3
          },
          { id: 'ptosis', l: 'Ptosis', n: 'Sin ptosis palpebral', a: ['Ptosis palpebral derecha', 'Ptosis palpebral izquierda'], d: 'parcial o completa', nom: 'de la ptosis palpebral' },
          { id: 'dipl', l: 'Diplopía', n: 'Sin diplopía', a: ['Diplopía horizontal', 'Diplopía vertical', 'Diplopía oblicua'], d: 'dirección de la mirada en que aparece', ne: 'Diplopía no evaluable', nom: 'de la diplopía' },
          {
            id: 'posoc', l: 'Posición ocular', n: 'Ojos alineados en posición primaria',
            a: ['Exotropía derecha', 'Exotropía izquierda', 'Endotropía derecha', 'Endotropía izquierda', 'Hipertropía derecha', 'Hipertropía izquierda', 'Desviación oblicua de los ojos'],
            d: 'detalle'
          },
          { id: 'nist', l: 'Nistagmo', n: 'Sin nistagmo', a: ['Nistagmo horizontal', 'Nistagmo vertical', 'Nistagmo rotatorio', 'Nistagmo evocado por la mirada'], d: 'dirección del componente rápido', nom: 'del nistagmo' }
        ]
      },
      {
        id: 'p57', h: 'V y VII — Trigémino y facial', f: [
          {
            id: 'sensv', l: 'V — Sensibilidad facial', n: 'Sensibilidad facial conservada',
            a: ['Hipoestesia en territorio V1 derecho', 'Hipoestesia en territorio V1 izquierdo', 'Hipoestesia en territorio V2 derecho', 'Hipoestesia en territorio V2 izquierdo', 'Hipoestesia en territorio V3 derecho', 'Hipoestesia en territorio V3 izquierdo', 'Hipoestesia en hemicara derecha', 'Hipoestesia en hemicara izquierda', 'Anestesia en hemicara derecha', 'Anestesia en hemicara izquierda'],
            ne: 'Sensibilidad facial no evaluable', nom: 'de la hipoestesia facial', pri: 8
          },
          { id: 'corneal', l: 'V — Reflejo corneal', n: 'Reflejo corneal presente bilateralmente', a: ['Reflejo corneal disminuido derecho', 'Reflejo corneal disminuido izquierdo', 'Reflejo corneal abolido derecho', 'Reflejo corneal abolido izquierdo'], ne: 'Reflejo corneal no evaluable' },
          { id: 'mast', l: 'V — Músculos masticatorios', n: 'Fuerza de músculos masticatorios conservada', a: ['Paresia de músculos masticatorios derecha', 'Paresia de músculos masticatorios izquierda'], d: 'desviación mandibular', ne: 'Músculos masticatorios no evaluables' },
          {
            id: 'facial', l: 'VII — Facial', n: 'Facies simétrica',
            a: ['Paresia facial central derecha', 'Paresia facial central izquierda', 'Paresia facial periférica derecha', 'Paresia facial periférica izquierda'],
            d: 'grado (p. ej. House-Brackmann III)', ne: 'Motilidad facial no evaluable', nom: 'de la paresia facial', pri: 3
          }
        ]
      },
      {
        id: 'p8', h: 'VIII — Vestibulococlear', f: [
          { id: 'audic', l: 'Audición', n: 'Audición conservada', a: ['Hipoacusia derecha', 'Hipoacusia izquierda', 'Acúfenos'], d: 'Weber y Rinne', ne: 'Audición no evaluable', nom: 'de la hipoacusia' },
          { id: 'vestib', l: 'Signos vestibulares', n: 'Sin signos vestibulares', a: ['Vértigo', 'Romberg positivo', 'Lateropulsión derecha', 'Lateropulsión izquierda'], d: 'detalle', ne: 'Signos vestibulares no evaluables', nom: 'de los signos vestibulares' }
        ]
      },
      {
        id: 'pbaj', h: 'IX a XII — Pares bajos', f: [
          { id: 'deglu', l: 'IX y X — Deglución', n: 'Deglución conservada', a: ['Disfagia para líquidos', 'Disfagia para sólidos', 'Tos con la ingesta'], d: 'detalle', ne: 'Deglución no evaluable', nom: 'de la disfagia' },
          { id: 'voz', l: 'IX y X — Voz', n: 'Voz sin particularidades', a: ['Disfonía', 'Voz nasal', 'Voz bitonal'], ne: 'Voz no evaluable', nom: 'de la disfonía' },
          { id: 'nause', l: 'IX y X — Reflejo nauseoso', n: 'Reflejo nauseoso presente', a: ['Reflejo nauseoso disminuido', 'Reflejo nauseoso abolido'], one: true, ne: 'Reflejo nauseoso no evaluable' },
          { id: 'palad', l: 'IX y X — Paladar', n: 'Elevación simétrica del velo del paladar', a: ['Menor elevación del hemivelo del paladar derecho', 'Menor elevación del hemivelo del paladar izquierdo'], ne: 'Elevación del paladar no evaluable' },
          { id: 'uvula', l: 'IX y X — Úvula', n: 'Úvula central', a: ['Desviación de la úvula hacia la derecha', 'Desviación de la úvula hacia la izquierda'], one: true },
          { id: 'p11', l: 'XI — Trapecio y esternocleidomastoideo', n: 'Fuerza de trapecio y esternocleidomastoideo conservada', a: ['Paresia del trapecio derecho', 'Paresia del trapecio izquierdo', 'Paresia del esternocleidomastoideo derecho', 'Paresia del esternocleidomastoideo izquierdo'], ne: 'XI par no evaluable' },
          { id: 'lengdesv', l: 'XII — Posición lingual', n: 'Lengua central en la protrusión', a: ['Desviación lingual hacia la derecha en la protrusión', 'Desviación lingual hacia la izquierda en la protrusión'], one: true, ne: 'Protrusión lingual no evaluable' },
          { id: 'lengmov', l: 'XII — Movilidad lingual', n: 'Movilidad lingual conservada', a: ['Movilidad lingual disminuida'], ne: 'Movilidad lingual no evaluable' },
          { id: 'lengtrof', l: 'XII — Trofismo lingual', n: 'Sin atrofia ni fasciculaciones linguales', a: ['Hemiatrofia lingual derecha', 'Hemiatrofia lingual izquierda', 'Fasciculaciones linguales'] }
        ]
      }
    ]
  },

  {
    id: 'nx-motorsens',
    n: 'Examen motor y sensitivo detallado',
    cat: 'Neurología · Examen neurológico',
    v: 1,
    d: 'Fuerza por grupo muscular con raíz, tono, reflejos y sensibilidad por modalidad y distribución',
    secs: [
      {
        id: 'fza', h: 'Fuerza muscular', f: [
          { id: 'motor', k: 'motor' },
          {
            id: 'patron', l: 'Patrón del déficit',
            a: ['Déficit de predominio proximal', 'Déficit de predominio distal', 'Déficit en territorio radicular', 'Déficit en territorio de nervio periférico'],
            d: 'raíz o nervio (p. ej. L5 derecha, nervio peroneo común izquierdo)', pri: 6
          }
        ]
      },
      {
        id: 'tono', h: 'Tono', f: [
          {
            id: 'tono', l: 'Tono', n: 'Tono muscular conservado',
            a: ['Hipotonía', 'Hipertonía', 'Espasticidad', 'Rigidez', 'Paratonía'],
            ne: 'Tono muscular no evaluable', d: 'distribución (p. ej. en miembro inferior izquierdo)', sc: { s: 'ashworth' }, nom: 'de la alteración del tono', pri: 6
          }
        ]
      },
      {
        id: 'refl', h: 'Reflejos', f: [
          { id: 'rot', k: 'rot' },
          { id: 'patol', k: 'patol' }
        ]
      },
      {
        id: 'sens', h: 'Sensibilidad', f: [
          { id: 'sens', k: 'sens' },
          { id: 'nivsens', k: 'text', l: 'Nivel sensitivo', p: 'Nivel sensitivo {v}', ph: 'T10' }
        ]
      }
    ]
  },

  // ============================================================
  // BLOQUE 2 — PATOLOGÍAS Y SITUACIONES NEUROQUIRÚRGICAS
  // ============================================================
  {
    id: 'nx-acv',
    n: 'ACV / Stroke + NIHSS',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Tipo de ACV, tiempos, territorio, tratamiento, examen focal, NIHSS y Rankin modificada',
    secs: [
      {
        id: 'gen', h: 'Datos del evento', f: [
          {
            id: 'tipo', l: 'Tipo de ACV', one: true,
            a: [['Isquémico', 'ACV isquémico'], ['Hemorrágico', 'ACV hemorrágico'], ['HSA', 'Hemorragia subaracnoidea'], ['Indeterminado', 'ACV de tipo indeterminado']]
          },
          { id: 'inicio', k: 'text', l: 'Fecha y hora de inicio', p: 'Inicio de los síntomas {v}', ph: 'el 18/10 a las 14:30 h' },
          { id: 'ucn', k: 'text', l: 'Última vez conocido normal', p: 'Última vez visto asintomático {v}', ph: 'el 18/10 a las 13:00 h' },
          {
            id: 'lat', l: 'Lateralidad', one: true,
            a: ['Compromiso hemisférico derecho', 'Compromiso hemisférico izquierdo', 'Compromiso de fosa posterior', 'Compromiso bihemisférico']
          },
          {
            id: 'terr', l: 'Territorio vascular', ap: 'en territorio de la ', j: ', ',
            a: [
              'arteria cerebral media derecha', 'arteria cerebral media izquierda',
              'arteria cerebral anterior derecha', 'arteria cerebral anterior izquierda',
              'arteria cerebral posterior derecha', 'arteria cerebral posterior izquierda',
              'arteria carótida interna derecha', 'arteria carótida interna izquierda',
              'arteria vertebral derecha', 'arteria vertebral izquierda',
              'arteria cerebelosa posteroinferior derecha', 'arteria cerebelosa posteroinferior izquierda',
              'arteria basilar', 'circulación posterior'
            ],
            d: 'rama o segmento (p. ej. M2 superior)'
          },
          { id: 'loc', k: 'text', l: 'Localización', p: '{v}', ph: 'Lesión cortico-subcortical frontoparietal derecha' },
          {
            id: 'trat', l: 'Tratamiento realizado', ap: 'Se realizó ',
            a: ['trombólisis endovenosa', 'trombectomía mecánica', 'craniectomía descompresiva', 'drenaje quirúrgico del hematoma', 'colocación de DVE'],
            d: 'fecha, hora o resultado (p. ej. el 18/10 a las 16 h, TICI 2b)'
          },
          {
            id: 'evt', l: 'Evolución temporal', one: true,
            a: ['Déficit estable desde el inicio', 'Déficit fluctuante', 'Déficit en progresión', 'Mejoría progresiva del déficit', 'Resolución completa del déficit'],
            d: 'tiempo de evolución (p. ej. 6 h desde el inicio)'
          }
        ]
      },
      {
        id: 'nx', h: 'Examen neurológico', f: [
          { id: 'conc', k: 'conc' },
          { id: 'gcs', k: 'gcs', j: ', ' },
          { id: 'pup', k: 'pupils' },
          {
            id: 'mirada', l: 'Mirada', n: 'Sin desviación de la mirada', one: true,
            a: ['Paresia parcial de la mirada conjugada hacia la derecha', 'Paresia parcial de la mirada conjugada hacia la izquierda', 'Desviación conjugada forzada de la mirada hacia la derecha', 'Desviación conjugada forzada de la mirada hacia la izquierda'],
            ne: 'Mirada no evaluable', nom: 'del trastorno de la mirada', pri: 3
          },
          {
            id: 'cv', l: 'Campos visuales', n: 'Campos visuales conservados por confrontación',
            a: ['Hemianopsia homónima derecha', 'Hemianopsia homónima izquierda', 'Cuadrantanopsia homónima superior derecha', 'Cuadrantanopsia homónima superior izquierda', 'Cuadrantanopsia homónima inferior derecha', 'Cuadrantanopsia homónima inferior izquierda'],
            ne: 'Campos visuales no evaluables', nom: 'del defecto campimétrico', pri: 3
          },
          {
            id: 'facial', l: 'Paresia facial', n: 'Facies simétrica',
            a: ['Paresia facial central derecha', 'Paresia facial central izquierda', 'Paresia facial periférica derecha', 'Paresia facial periférica izquierda'],
            ne: 'Motilidad facial no evaluable', nom: 'de la paresia facial', pri: 3
          },
          { id: 'mrc', k: 'mrc4' },
          { id: 'sens', k: 'sens' },
          {
            id: 'leng', l: 'Lenguaje', n: 'Lenguaje conservado',
            a: ['Afasia expresiva', 'Afasia receptiva', 'Afasia mixta', 'Afasia global', 'Anomia', 'Mutismo'],
            ne: 'Lenguaje no evaluable', d: 'detalle (p. ej. con comprensión conservada)', nom: 'de la afasia', pri: 7
          },
          { id: 'disart', l: 'Disartria', n: 'Sin disartria', a: ['Disartria leve', 'Disartria moderada a severa', 'Anartria'], one: true, ne: 'Articulación de la palabra no evaluable', nom: 'de la disartria', pri: 7 },
          {
            id: 'ataxia', l: 'Ataxia', n: 'Sin ataxia de miembros',
            a: ['Ataxia de miembro superior derecho', 'Ataxia de miembro superior izquierdo', 'Ataxia de miembro inferior derecho', 'Ataxia de miembro inferior izquierdo'],
            ne: 'Coordinación no evaluable', nom: 'de la ataxia', pri: 6
          },
          {
            id: 'neglig', l: 'Negligencia / extinción', n: 'Sin negligencia ni extinción',
            a: ['Heminegligencia derecha', 'Heminegligencia izquierda', 'Extinción visual derecha', 'Extinción visual izquierda', 'Extinción táctil derecha', 'Extinción táctil izquierda', 'Anosognosia'],
            ne: 'Negligencia no evaluable', nom: 'de la negligencia', pri: 3
          }
        ]
      },
      {
        id: 'nihss', h: 'NIHSS', f: [
          { id: 'nihss', k: 'nihss' }
        ]
      },
      {
        id: 'mrs', h: 'Rankin modificada', off: true, f: [
          { id: 'mrs', k: 'scale', s: 'mrs' }
        ]
      },
      {
        id: 'img', h: 'Neuroimagen', off: true, f: [
          { id: 'img', k: 'text', l: 'Neuroimagen', p: '{v}', ph: 'TC de cerebro de control sin transformación hemorrágica' }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Control de TC a las 24 h y NIHSS seriado' }
        ]
      }
    ]
  },

  {
    id: 'nx-hsa',
    n: 'Hemorragia subaracnoidea',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Estado neurológico, cefalea, signos meníngeos, vasoespasmo, hidrocefalia, sodio, DVE y escalas Hunt-Hess, WFNS y Fisher modificada',
    secs: [
      {
        id: 'gen', h: 'Contexto', f: [
          { id: 'dia', k: 'num', l: 'Día desde el sangrado', p: 'Día {v} de evolución desde el sangrado', u: '' },
          { id: 'proc', k: 'text', l: 'Tratamiento o procedimientos realizados', p: 'Se realizó {v}', ph: 'embolización endovascular del aneurisma con coils el 15/10' }
        ]
      },
      {
        id: 'nx', h: 'Estado neurológico', f: [
          { id: 'conc', k: 'conc' },
          { id: 'gcs', k: 'gcs', j: ', ' },
          { id: 'pup', k: 'pupils' },
          {
            id: 'focal', l: 'Déficit focal', n: 'Sin déficit focal evidente',
            a: ['Hemiparesia derecha', 'Hemiparesia izquierda', 'Paresia del III par derecho', 'Paresia del III par izquierdo', 'Paresia del VI par derecho', 'Paresia del VI par izquierdo', 'Paresia facial central derecha', 'Paresia facial central izquierda', 'Afasia', 'Abulia'],
            d: 'detalle (p. ej. fuerza 4/5)', ne: 'Déficit focal no evaluable', nom: 'del déficit focal', pri: 3
          },
          { id: 'cefalea', l: 'Cefalea', n: 'Sin cefalea', a: ['Cefalea leve', 'Cefalea moderada', 'Cefalea intensa'], one: true, sc: { s: 'eva' }, ne: 'Cefalea no evaluable', nom: 'de la cefalea' },
          { id: 'mening', l: 'Signos meníngeos', n: 'Sin signos meníngeos', a: ['Rigidez de nuca', 'Kernig positivo', 'Brudzinski positivo'], ne: 'Signos meníngeos no evaluables', nom: 'de los signos meníngeos', pri: 10 },
          {
            id: 'crisis', l: 'Crisis epilépticas', n: 'Sin crisis epilépticas',
            a: ['Crisis focal', 'Crisis focal con evolución a tónico-clónica bilateral', 'Crisis tónico-clónica generalizada', 'Estado de mal epiléptico'],
            d: 'número, hora y duración'
          }
        ]
      },
      {
        id: 'compl', h: 'Vasoespasmo e hidrocefalia', f: [
          {
            id: 'vasoesp', l: 'Vasoespasmo / isquemia cerebral diferida', n: 'Sin vasoespasmo diagnosticado',
            a: ['Vasoespasmo angiográfico', 'Vasoespasmo por Doppler transcraneal', 'Isquemia cerebral diferida'],
            d: 'territorio y velocidades (p. ej. ACM derecha 160 cm/s)', nom: 'del vasoespasmo', pri: 3
          },
          {
            id: 'hidro', l: 'Hidrocefalia', n: 'Sin hidrocefalia',
            a: ['Hidrocefalia', 'Aumento del tamaño ventricular respecto del control previo'],
            d: 'detalle', nom: 'de la hidrocefalia', pri: 9
          }
        ]
      },
      {
        id: 'vit', h: 'Signos vitales y temperatura', f: [
          { id: 'vit', k: 'vitals' },
          { id: 'fiebre', l: 'Curva térmica', n: 'Sin registros febriles en las últimas 24 h', a: ['Registros febriles en las últimas 24 h'], d: 'temperatura máxima (p. ej. 38,5 °C)' }
        ]
      },
      {
        id: 'medio', h: 'Sodio y balance', f: [
          { id: 'na', l: 'Sodio', n: 'Natremia dentro de rango', a: ['Hiponatremia', 'Hipernatremia'], one: true, num: { l: 'Na', u: 'mEq/L', p: 'Na {v} mEq/L' }, nom: 'de la alteración del sodio' },
          { id: 'bal', l: 'Balance hídrico', a: ['Balance positivo', 'Balance negativo', 'Balance neutro'], one: true, num: { l: 'Volumen', u: 'mL', p: '{v} mL en 24 h' } }
        ]
      },
      {
        id: 'dev', h: 'DVE y drenajes', f: [
          { id: 'dev', k: 'dev', types: ['DVE', 'Drenaje lumbar'] }
        ]
      },
      {
        id: 'esc', h: 'Escalas', f: [
          { id: 'hh', k: 'scale', s: 'hh' },
          { id: 'wfns', k: 'scale', s: 'wfns', j: ', ' },
          { id: 'mfisher', k: 'scale', s: 'mfisher', j: ', ' }
        ]
      },
      {
        id: 'img', h: 'Estudios', off: true, f: [
          { id: 'vasc', k: 'text', l: 'Estudio vascular', p: '{v}', ph: 'Angio-TC con aneurisma de arteria comunicante anterior de 6 mm' },
          { id: 'img', k: 'text', l: 'Neuroimagen', p: '{v}', ph: 'TC de control sin resangrado ni aumento del tamaño ventricular' }
        ]
      },
      {
        id: 'lab', h: 'Laboratorio', off: true, f: [
          { id: 'lab', k: 'lab' }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Doppler transcraneal diario y control de natremia cada 12 h' }
        ]
      }
    ]
  },

  {
    id: 'nx-tce',
    n: 'Traumatismo craneoencefálico',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Mecanismo, síntomas iniciales, Glasgow, pupilas, déficit focal, heridas, neuroimagen, PIC, dispositivos y cirugía',
    secs: [
      {
        id: 'gen', h: 'Traumatismo y antecedentes', f: [
          { id: 'mec', k: 'text', l: 'Mecanismo', p: 'Traumatismo por {v}', ph: 'caída de propia altura' },
          { id: 'fecha', k: 'text', l: 'Fecha y hora', p: 'ocurrido {v}', ph: 'el 17/10 a las 22 h', j: ', ' },
          { id: 'pdc', l: 'Pérdida de conocimiento', n: 'Sin pérdida de conocimiento', a: ['Pérdida de conocimiento'], d: 'duración (p. ej. de 2 minutos)', ne: 'Se desconoce si presentó pérdida de conocimiento' },
          { id: 'amnesia', l: 'Amnesia', n: 'Sin amnesia del episodio', a: ['Amnesia del episodio', 'Amnesia anterógrada', 'Amnesia retrógrada'], ne: 'Amnesia no evaluable' },
          { id: 'vomit', l: 'Vómitos', n: 'Sin vómitos', a: ['Vómitos', 'Vómitos reiterados'], one: true, d: 'número de episodios' },
          { id: 'crisis', l: 'Crisis', n: 'Sin crisis epilépticas', a: ['Crisis focal', 'Crisis tónico-clónica generalizada'], d: 'número y momento respecto del traumatismo' },
          {
            id: 'acoag', l: 'Anticoagulación / antiagregación', n: 'Sin tratamiento anticoagulante ni antiagregante',
            a: ['En tratamiento anticoagulante', 'En tratamiento antiagregante', 'En doble antiagregación', 'Anticoagulación revertida'],
            d: 'fármaco y última dosis'
          }
        ]
      },
      {
        id: 'cx', h: 'Cirugía realizada', off: true, f: [
          { id: 'cxr', k: 'text', l: 'Cirugía realizada', p: 'Se realizó {v}', ph: 'craniectomía descompresiva frontotemporoparietal derecha el 17/10' },
          { id: 'dpo', k: 'num', l: 'Día postoperatorio', p: 'día {v} de postoperatorio', u: '', j: ', ' }
        ]
      },
      {
        id: 'nx', h: 'Estado neurológico', f: [
          { id: 'conc', k: 'conc' },
          { id: 'orient', k: 'orient', j: ', ' },
          { id: 'gcs', k: 'gcs', j: ', ' },
          { id: 'pup', k: 'pupils' },
          { id: 'mrc', k: 'mrc4' },
          {
            id: 'pcfocal', l: 'Pares craneales', n: 'Pares craneales sin déficit evidente',
            a: ['Paresia del III par derecho', 'Paresia del III par izquierdo', 'Paresia del VI par derecho', 'Paresia del VI par izquierdo', 'Paresia facial central derecha', 'Paresia facial central izquierda', 'Paresia facial periférica derecha', 'Paresia facial periférica izquierda', 'Hemianopsia homónima derecha', 'Hemianopsia homónima izquierda'],
            ne: 'Pares craneales no evaluables', nom: 'del déficit de pares craneales', pri: 3
          },
          { id: 'leng', l: 'Lenguaje', n: 'Lenguaje conservado', a: ['Afasia expresiva', 'Afasia receptiva', 'Afasia mixta', 'Disartria', 'Mutismo'], ne: 'Lenguaje no evaluable', nom: 'del trastorno del lenguaje', pri: 7 },
          { id: 'cefalea', l: 'Cefalea', n: 'Sin cefalea', a: ['Cefalea leve', 'Cefalea moderada', 'Cefalea intensa'], one: true, sc: { s: 'eva' }, ne: 'Cefalea no evaluable', nom: 'de la cefalea' },
          {
            id: 'deter', l: 'Deterioro neurológico', n: 'Sin deterioro neurológico respecto del control previo',
            a: ['Deterioro del nivel de conciencia respecto del control previo', 'Nuevo déficit focal', 'Aparición de anisocoria'],
            d: 'detalle y hora', pri: 1
          }
        ]
      },
      {
        id: 'pic', h: 'Presión intracraneal', off: true, f: [
          { id: 'picv', k: 'num', l: 'PIC', p: 'PIC de {v} mmHg', u: 'mmHg' },
          { id: 'ppc', k: 'num', l: 'PPC', p: 'PPC de {v} mmHg', u: 'mmHg', j: ', ' },
          {
            id: 'hte', l: 'Signos de hipertensión endocraneana', n: 'Sin signos de hipertensión endocraneana',
            a: ['Cefalea progresiva', 'Vómitos', 'Deterioro del nivel de conciencia', 'Bradicardia e hipertensión arterial', 'Edema de papila', 'Elevaciones sostenidas de la PIC'],
            d: 'detalle', nom: 'de los signos de hipertensión endocraneana', pri: 9
          }
        ]
      },
      {
        id: 'ext', h: 'Heridas y signos de fractura de base', f: [
          {
            id: 'heridas', l: 'Heridas', n: 'Sin heridas',
            a: ['Herida cortante en cuero cabelludo', 'Herida suturada en cuero cabelludo', 'Hematoma subgaleal', 'Excoriaciones'],
            d: 'localización (p. ej. región parietal derecha)', nom: 'de las heridas', pri: 11
          },
          {
            id: 'fxbase', l: 'Signos de fractura de base', n: 'Sin signos de fractura de base de cráneo',
            a: ['Equimosis periorbitaria derecha', 'Equimosis periorbitaria izquierda', 'Equimosis retroauricular derecha', 'Equimosis retroauricular izquierda', 'Otorragia derecha', 'Otorragia izquierda', 'Otorraquia derecha', 'Otorraquia izquierda', 'Rinorragia', 'Rinorraquia'],
            pri: 3
          }
        ]
      },
      {
        id: 'dev', h: 'Dispositivos y drenajes', off: true, f: [
          { id: 'dev', k: 'dev', types: ['DVE', 'Sensor de PIC', 'Drenaje subdural', 'Drenaje subgaleal'] }
        ]
      },
      {
        id: 'img', h: 'Neuroimagen', off: true, f: [
          { id: 'tc', k: 'text', l: 'Neuroimagen', p: '{v}', ph: 'TC con contusión frontal derecha sin progresión respecto del control previo' },
          {
            id: 'hic', l: 'Hemorragia intracraneal', n: 'Sin hemorragia intracraneal',
            a: ['Hematoma extradural derecho', 'Hematoma extradural izquierdo', 'Hematoma subdural agudo derecho', 'Hematoma subdural agudo izquierdo', 'Contusiones hemorrágicas', 'Hemorragia subaracnoidea traumática', 'Hemorragia intraventricular'],
            d: 'localización, espesor o volumen (p. ej. frontoparietal de 8 mm)', nom: 'de la hemorragia intracraneal', pri: 12
          },
          { id: 'fx', l: 'Fracturas', n: 'Sin fracturas', a: ['Fractura lineal de calota', 'Fractura con hundimiento de calota', 'Fractura de base de cráneo', 'Fractura de macizo facial'], d: 'localización', pri: 12 },
          { id: 'edema', l: 'Edema', n: 'Sin signos de edema cerebral', a: ['Edema cerebral difuso', 'Edema perilesional', 'Borramiento de surcos', 'Compresión de cisternas basales'], d: 'localización', nom: 'del edema cerebral', pri: 12 },
          { id: 'dlm', l: 'Desviación de línea media', n: 'Sin desviación de línea media', a: ['Desviación de línea media hacia la derecha', 'Desviación de línea media hacia la izquierda'], one: true, num: { l: 'Desviación', u: 'mm', p: 'de {v} mm' }, nom: 'de la desviación de línea media', pri: 12 },
          { id: 'hidro', l: 'Hidrocefalia', n: 'Sin dilatación ventricular', a: ['Dilatación ventricular', 'Hidrocefalia'], one: true, nom: 'de la dilatación ventricular', pri: 12 },
          { id: 'marshall', k: 'scale', s: 'marshall' }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'TC de control a las 24 h y controles neurológicos horarios' }
        ]
      }
    ]
  },

  {
    id: 'nx-postop',
    n: 'Paciente neurocrítico / postoperatorio neuroquirúrgico',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Cirugía y día postoperatorio, estado general, neurológico, herida, drenajes, balance, estudios y complicaciones',
    secs: [
      {
        id: 'cx', h: 'Cirugía', f: [
          { id: 'proc', k: 'text', l: 'Procedimiento realizado', p: 'Postoperatorio de {v}', ph: 'craneotomía frontotemporal derecha y exéresis de lesión' },
          { id: 'fecha', k: 'text', l: 'Fecha de cirugía', p: 'del {v}', ph: '16/10', j: ' ' },
          { id: 'dpo', k: 'num', l: 'Día postoperatorio', p: 'día {v} postoperatorio', u: '', j: ', ' },
          { id: 'indic', k: 'text', l: 'Indicación quirúrgica', p: 'Cirugía indicada por {v}', ph: 'lesión expansiva frontal derecha' }
        ]
      },
      {
        id: 'gen', h: 'Estado general', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'vit', k: 'vitals' },
          { id: 'fiebre', l: 'Curva térmica', n: 'Sin registros febriles en las últimas 24 h', a: ['Registros febriles en las últimas 24 h'], d: 'temperatura máxima (p. ej. 38,5 °C)' },
          { id: 'dolor', l: 'Dolor', n: 'Sin dolor', a: ['Dolor en herida quirúrgica', 'Cefalea', 'Cervicalgia', 'Dolor radicular'], sc: { s: 'eva' }, d: 'localización o lado', ne: 'Dolor no evaluable', nom: 'del dolor' },
          { id: 'nv', l: 'Náuseas / vómitos', n: 'Sin náuseas ni vómitos', a: ['Náuseas', 'Vómitos'], d: 'número de episodios' }
        ]
      },
      {
        id: 'nx', h: 'Estado neurológico', f: [
          { id: 'conc', k: 'conc' },
          { id: 'orient', k: 'orient', j: ', ' },
          { id: 'gcs', k: 'gcs', j: ', ' },
          { id: 'pup', k: 'pupils' },
          {
            id: 'facial', l: 'Motilidad facial', n: 'Facies simétrica',
            a: ['Paresia facial central derecha', 'Paresia facial central izquierda', 'Paresia facial periférica derecha', 'Paresia facial periférica izquierda'],
            ne: 'Motilidad facial no evaluable', nom: 'de la paresia facial', pri: 3
          },
          { id: 'mrc', k: 'mrc4' },
          { id: 'sens', k: 'sens' },
          { id: 'leng', l: 'Lenguaje', n: 'Lenguaje conservado', a: ['Afasia expresiva', 'Afasia receptiva', 'Afasia mixta', 'Anomia', 'Disartria', 'Mutismo'], ne: 'Lenguaje no evaluable', nom: 'del trastorno del lenguaje', pri: 7 },
          { id: 'nxotros', k: 'text', l: 'Otros hallazgos neurológicos', p: '{v}', ph: 'Hemianopsia homónima izquierda por confrontación' }
        ]
      },
      {
        id: 'her', h: 'Herida y apósitos', f: [
          {
            id: 'herida', l: 'Herida quirúrgica', n: 'Herida quirúrgica limpia y seca',
            a: ['Herida quirúrgica con secreción serosa', 'Herida quirúrgica con secreción serohemática', 'Dehiscencia de herida quirúrgica', 'Fístula de LCR por herida quirúrgica', 'Colección subgaleal', 'Edema periherida'],
            d: 'localización y extensión', nom: 'de la herida quirúrgica', pri: 11
          },
          {
            id: 'infec', l: 'Signos de infección', n: 'sin signos de infección', ap: 'con ', j: ', ',
            a: ['eritema perilesional', 'calor local', 'secreción purulenta', 'fluctuación'],
            pri: 11
          },
          { id: 'aposito', l: 'Apósito', n: 'Apósito limpio y seco', a: ['Apósito manchado con contenido serohemático', 'Apósito manchado con contenido hemático', 'Apósito manchado con contenido claro', 'Apósito despegado'], pri: 11 }
        ]
      },
      {
        id: 'dev', h: 'Drenajes y dispositivos', f: [
          { id: 'dev', k: 'dev' }
        ]
      },
      {
        id: 'bal', h: 'Diuresis y balance', off: true, f: [
          { id: 'diur', l: 'Diuresis', n: 'Diuresis conservada', a: ['Oliguria', 'Poliuria'], one: true, num: { l: 'Diuresis', u: 'mL/24 h', p: '{v} mL en 24 h' } },
          { id: 'balh', l: 'Balance hídrico', a: ['Balance positivo', 'Balance negativo', 'Balance neutro'], one: true, num: { l: 'Volumen', u: 'mL', p: '{v} mL en 24 h' } }
        ]
      },
      {
        id: 'lab', h: 'Laboratorio', off: true, f: [
          { id: 'lab', k: 'lab' }
        ]
      },
      {
        id: 'img', h: 'Neuroimagen', off: true, f: [
          { id: 'img', k: 'text', l: 'Neuroimagen', p: '{v}', ph: 'TC postoperatoria sin colecciones ni sangrado en el lecho quirúrgico' }
        ]
      },
      {
        id: 'compl', h: 'Complicaciones', f: [
          {
            id: 'compl', l: 'Complicaciones', n: 'Sin complicaciones postoperatorias',
            a: ['Hematoma del lecho quirúrgico', 'Fístula de LCR', 'Infección del sitio quirúrgico', 'Crisis epiléptica', 'Neumoencéfalo', 'Nuevo déficit neurológico', 'Hiponatremia', 'Hipernatremia'],
            d: 'detalle'
          }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Retiro de drenaje subgaleal y control de TC' }
        ]
      }
    ]
  },

  {
    id: 'nx-dve',
    n: 'DVE / hidrocefalia',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Indicación, estado y débito del DVE, PIC, sitio de inserción, signos de infección, neuroexamen y tamaño ventricular',
    secs: [
      {
        id: 'ind', h: 'Indicación', f: [
          { id: 'indic', k: 'text', l: 'Indicación', p: 'DVE colocado por {v}', ph: 'hidrocefalia aguda en contexto de hemorragia subaracnoidea' },
          { id: 'diadve', k: 'num', l: 'Día de DVE', p: 'día {v} de DVE', u: '', j: ', ' }
        ]
      },
      {
        id: 'nx', h: 'Estado neurológico', f: [
          { id: 'conc', k: 'conc' },
          { id: 'orient', k: 'orient', j: ', ' },
          { id: 'gcs', k: 'gcs', j: ', ' },
          { id: 'pup', k: 'pupils' },
          {
            id: 'focal', l: 'Déficit focal', n: 'Sin déficit focal evidente',
            a: ['Hemiparesia derecha', 'Hemiparesia izquierda', 'Paresia del III par derecho', 'Paresia del III par izquierdo', 'Paresia facial central derecha', 'Paresia facial central izquierda', 'Afasia'],
            d: 'detalle (p. ej. fuerza 4/5)', ne: 'Déficit focal no evaluable', nom: 'del déficit focal', pri: 3
          },
          {
            id: 'hte', l: 'Signos de hipertensión endocraneana', n: 'Sin signos de hipertensión endocraneana',
            a: ['Cefalea', 'Vómitos', 'Deterioro del nivel de conciencia', 'Bradicardia e hipertensión arterial', 'Paresia del VI par derecho', 'Paresia del VI par izquierdo', 'Edema de papila', 'Mirada en sol poniente'],
            d: 'detalle', nom: 'de los signos de hipertensión endocraneana', pri: 9
          }
        ]
      },
      {
        id: 'dev', h: 'DVE', f: [
          { id: 'dev', k: 'dev', types: ['DVE'] },
          {
            id: 'ref', l: 'Referencia del nivel', one: true, j: ', ',
            a: [['CAE', 'nivel referenciado al conducto auditivo externo'], ['Trago', 'nivel referenciado al trago'], ['Canto externo', 'nivel referenciado al canto externo del ojo']],
            pri: 11
          },
          { id: 'cierre', l: 'Prueba de cierre', one: true, a: ['En prueba de cierre', 'Prueba de cierre tolerada', 'Prueba de cierre no tolerada'], d: 'horas de cierre o motivo', pri: 11 },
          {
            id: 'sitio', l: 'Sitio de inserción', n: 'Sitio de inserción sin signos inflamatorios',
            a: ['Eritema en sitio de inserción', 'Secreción serosa por sitio de inserción', 'Secreción purulenta por sitio de inserción', 'Pérdida de LCR pericatéter', 'Fluctuación en sitio de inserción'],
            d: 'extensión', nom: 'del sitio de inserción', pri: 11
          }
        ]
      },
      {
        id: 'pic', h: 'Presión intracraneal', off: true, f: [
          { id: 'picv', k: 'num', l: 'PIC', p: 'PIC de {v} mmHg', u: 'mmHg' },
          { id: 'ppc', k: 'num', l: 'PPC', p: 'PPC de {v} mmHg', u: 'mmHg', j: ', ' },
          {
            id: 'onda', l: 'Onda / registro', n: 'Onda de PIC con P1 mayor que P2',
            a: ['Onda de PIC con P2 mayor que P1', 'Onda de PIC amortiguada', 'Ondas plateau', 'Elevaciones sostenidas de la PIC'],
            d: 'detalle', pri: 9
          }
        ]
      },
      {
        id: 'infec', h: 'Signos de infección', f: [
          { id: 'fiebre', l: 'Curva térmica', n: 'Sin registros febriles en las últimas 24 h', a: ['Registros febriles en las últimas 24 h'], d: 'temperatura máxima (p. ej. 38,5 °C)' },
          { id: 'mening', l: 'Signos meníngeos', n: 'Sin signos meníngeos', a: ['Rigidez de nuca', 'Kernig positivo', 'Brudzinski positivo'], ne: 'Signos meníngeos no evaluables', nom: 'de los signos meníngeos', pri: 10 }
        ]
      },
      {
        id: 'img', h: 'Neuroimagen y LCR', off: true, f: [
          { id: 'tc', k: 'text', l: 'Neuroimagen', p: '{v}', ph: 'TC con extremo del catéter en asta frontal derecha' },
          {
            id: 'tamv', l: 'Tamaño ventricular', one: true,
            a: ['Disminución del tamaño ventricular respecto del control previo', 'Tamaño ventricular sin cambios respecto del control previo', 'Aumento del tamaño ventricular respecto del control previo', 'Ventrículos colapsados'],
            d: 'medida (p. ej. índice de Evans 0,35)', pri: 12
          },
          { id: 'citoq', k: 'text', l: 'Citoquímico de LCR', p: '{v}', ph: 'Citoquímico de LCR con 15 células/mm³, glucorraquia 60 mg/dL y proteinorraquia 45 mg/dL' }
        ]
      },
      {
        id: 'evo', h: 'Evolución', off: true, f: [
          { id: 'evo', k: 'text', l: 'Evolución', p: '{v}', ph: 'Débito en descenso progresivo en las últimas 48 h' }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Prueba de cierre del DVE durante 24 h y TC de control' }
        ]
      }
    ]
  }
];
