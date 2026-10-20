// Biblioteca de evoluciones — Neurología · Patologías y situaciones neuroquirúrgicas (fichas 10 a 19)
// Datos puros según docs/ESQUEMA_PLANTILLAS.md, sección 1.

export default [
  // ───────────────────────────── FICHA 10 — TUMOR CEREBRAL ─────────────────────────────
  {
    id: 'nx-tumor',
    n: 'Tumor cerebral',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Localización, síntomas, examen neurológico, corticoides, anticonvulsivantes, herida y neuroimagen',
    secs: [
      {
        id: 'ctx', h: 'Lesión y procedimiento', f: [
          { id: 'loc', k: 'text', l: 'Localización', p: 'Lesión {v}', ph: 'frontal' },
          { id: 'lat', l: 'Lateralidad', a: [['Derecha', 'derecha'], ['Izquierda', 'izquierda'], ['Bilateral', 'bilateral'], ['Línea media', 'de línea media']], one: true, j: ' ' },
          { id: 'dx', k: 'text', l: 'Diagnóstico conocido', p: 'Con diagnóstico conocido de {v}', ph: 'glioblastoma IDH no mutado (anatomía patológica)' },
          { id: 'dpo', k: 'num', l: 'Día postoperatorio', p: 'Día {v} de postoperatorio', u: '' },
          { id: 'proc', k: 'text', l: 'Procedimiento realizado', p: 'Se realizó {v}', ph: 'craneotomía frontal derecha con exéresis lesional' }
        ]
      },
      {
        id: 'gral', h: 'Estado general y conciencia', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'conc', k: 'conc' },
          { id: 'orient', k: 'orient', j: ', ' },
          { id: 'gcs', k: 'gcs', j: ', ' }
        ]
      },
      {
        id: 'sint', h: 'Síntomas', f: [
          { id: 'cef', l: 'Cefalea', n: 'Sin cefalea', a: ['Cefalea holocraneana', 'Cefalea frontal', 'Cefalea occipital', 'Cefalea en sitio quirúrgico', 'Cefalea de predominio matutino'], one: true, sc: { s: 'eva' }, nom: 'de la cefalea', pri: 9 },
          { id: 'nyv', l: 'Náuseas y vómitos', n: 'sin náuseas ni vómitos', a: ['náuseas', 'vómitos', 'vómitos en chorro'], ap: 'con ', j: ', ', pri: 9 },
          { id: 'crisis', l: 'Crisis', n: 'Sin crisis', a: ['Crisis focal motora derecha', 'Crisis focal motora izquierda', 'Crisis focal con alteración de la conciencia', 'Crisis focal a bilateral tónico-clónica', 'Crisis tónico-clónica generalizada'], d: 'número, duración, horario', nom: 'de las crisis', pri: 3 },
          { id: 'sintx', k: 'text', l: 'Otros síntomas', p: 'Refiere {v}', ph: 'visión borrosa y mareos' }
        ]
      },
      {
        id: 'neuro', h: 'Examen neurológico', f: [
          { id: 'pupils', k: 'pupils' },
          { id: 'pc', l: 'Pares craneales', n: 'Pares craneales sin alteraciones', a: ['Paresia facial central derecha', 'Paresia facial central izquierda', 'Hemianopsia homónima derecha', 'Hemianopsia homónima izquierda', 'Paresia del III par derecho', 'Paresia del III par izquierdo', 'Paresia del VI par derecho', 'Paresia del VI par izquierdo', 'Disminución de la agudeza visual derecha', 'Disminución de la agudeza visual izquierda', 'Hipoacusia derecha', 'Hipoacusia izquierda', 'Disfagia', 'Disfonía'], d: 'detalle', nom: 'del compromiso de pares craneales', pri: 3 },
          { id: 'leng', l: 'Lenguaje', n: 'Lenguaje conservado', a: ['Afasia motora', 'Afasia sensitiva', 'Afasia mixta', 'Afasia nominal', 'Disartria', 'Mutismo'], ne: 'Lenguaje no evaluable', nom: 'del trastorno del lenguaje', pri: 7 },
          { id: 'cogn', l: 'Estado cognitivo', n: 'Sin alteraciones cognitivas groseras', a: ['Bradipsiquia', 'Inatención', 'Alteración de la memoria reciente', 'Desinhibición', 'Apatía', 'Abulia', 'Heminegligencia izquierda', 'Heminegligencia derecha'], ne: 'Estado cognitivo no evaluable', nom: 'del compromiso cognitivo' },
          { id: 'mrc4', k: 'mrc4' },
          { id: 'sens', k: 'sens' },
          { id: 'patol', k: 'patol' }
        ]
      },
      {
        id: 'trat', h: 'Corticoides y anticonvulsivantes', f: [
          { id: 'cort', k: 'text', l: 'Corticoides', p: 'Corticoterapia con {v}', ph: 'dexametasona 4 mg c/6 h' },
          { id: 'aed', k: 'text', l: 'Anticonvulsivantes', p: 'Tratamiento anticonvulsivante con {v}', ph: 'levetiracetam 500 mg c/12 h' }
        ]
      },
      {
        id: 'herida', h: 'Herida y drenajes', off: true, f: [
          { id: 'her', l: 'Herida quirúrgica', n: 'Herida quirúrgica limpia y seca, sin signos de flogosis', a: ['Herida con eritema perilesional', 'Herida con secreción serosa', 'Herida con secreción purulenta', 'Dehiscencia de herida', 'Fístula de LCR por herida', 'Colección subgaleal'], d: 'localización, características', ne: 'Herida no evaluada', pri: 11 },
          { id: 'dev', k: 'dev' }
        ]
      },
      {
        id: 'img', h: 'Neuroimagen', off: true, f: [
          { id: 'imgest', k: 'text', l: 'Estudio realizado', p: 'Se realizó {v}', ph: 'TC de cerebro de control a las 24 h' },
          { id: 'sangr', l: 'Sangrado', n: 'Sin evidencia de sangrado', a: ['Hematoma en lecho quirúrgico', 'Sangrado intralesional', 'Hematoma subdural', 'Hematoma epidural', 'Hemorragia intraventricular'], d: 'volumen, localización', pri: 12 },
          { id: 'edema', l: 'Edema', n: 'sin edema perilesional', a: ['edema perilesional leve', 'edema perilesional moderado', 'edema perilesional extenso'], one: true, j: ', ', pri: 12 },
          { id: 'masa', l: 'Efecto de masa', n: 'sin efecto de masa', a: ['efecto de masa con compresión ventricular', 'borramiento de surcos', 'compresión de cisternas basales', 'herniación subfalcina', 'herniación uncal'], j: ', ', pri: 12 },
          { id: 'lm', l: 'Desviación de línea media', n: 'sin desviación de la línea media', a: ['desviación de la línea media'], num: { l: 'Desviación', u: 'mm', p: 'de {v} mm' }, j: ', ', pri: 12 },
          { id: 'imgotro', k: 'text', l: 'Otros hallazgos', p: '{v}', ph: 'Neumoencéfalo frontal bilateral' }
        ]
      },
      {
        id: 'compl', h: 'Complicaciones', off: true, f: [
          { id: 'cx', l: 'Complicaciones', n: 'Sin complicaciones', a: ['Fístula de LCR', 'Infección del sitio quirúrgico', 'Hematoma postoperatorio', 'Hiponatremia', 'Diabetes insípida', 'Trombosis venosa profunda', 'Neumonía'], d: 'detalle' }
        ]
      },
      {
        id: 'evol', h: 'Evolución', f: [
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Descenso progresivo de dexametasona. RM de cerebro con contraste a las 48 h' }
        ]
      }
    ]
  },

  // ───────────────────────────── FICHA 11 — COLUMNA CERVICAL ─────────────────────────────
  {
    id: 'nx-cervical',
    n: 'Columna cervical',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Dolor y EVA, examen motor por raíces, mielopatía, Spurling, Lhermitte, función, imagen y postoperatorio',
    secs: [
      {
        id: 'gral', h: 'Estado general', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'conc', k: 'conc', j: ', ' }
        ]
      },
      {
        id: 'dolor', h: 'Dolor', f: [
          { id: 'daxial', l: 'Dolor cervical', n: 'Sin cervicalgia', a: ['Cervicalgia axial', 'Cervicalgia mecánica', 'Cervicalgia de características inflamatorias'], nom: 'de la cervicalgia', pri: 8 },
          { id: 'irr', l: 'Irradiación', a: ['irradiación a región interescapular', 'irradiación a región occipital', 'irradiación a hombro derecho', 'irradiación a hombro izquierdo'], ap: 'con ', j: ', ', pri: 8 },
          { id: 'drad', l: 'Dolor radicular', n: 'Sin dolor radicular', a: ['Dolor radicular en miembro superior derecho', 'Dolor radicular en miembro superior izquierdo'], d: 'territorio (p. ej. C6, hasta primer dedo)', nom: 'del dolor radicular', pri: 8 },
          { id: 'eva', k: 'scale', s: 'eva', j: ', ', nom: 'del dolor' }
        ]
      },
      {
        id: 'neuro', h: 'Examen neurológico', f: [
          { id: 'motor', k: 'motor' },
          { id: 'sens', k: 'sens' },
          { id: 'nivs', l: 'Nivel sensitivo', n: 'Sin nivel sensitivo', a: [['C4', 'Nivel sensitivo C4'], ['C5', 'Nivel sensitivo C5'], ['C6', 'Nivel sensitivo C6'], ['C7', 'Nivel sensitivo C7'], ['C8', 'Nivel sensitivo C8'], ['T1', 'Nivel sensitivo T1'], ['T2', 'Nivel sensitivo T2'], ['T4', 'Nivel sensitivo T4']], one: true, ne: 'Nivel sensitivo no evaluable', nom: 'del nivel sensitivo', pri: 3 },
          { id: 'rot', k: 'rot' },
          { id: 'patol', k: 'patol' },
          { id: 'destr', l: 'Destreza manual', n: 'Destreza manual conservada', a: ['Torpeza manual derecha', 'Torpeza manual izquierda', 'Dificultad para abotonarse', 'Dificultad para la escritura', 'Prueba de prensión y liberación enlentecida'], ne: 'Destreza manual no evaluable', nom: 'de la torpeza manual', pri: 6 }
        ]
      },
      {
        id: 'signos', h: 'Signos especiales', f: [
          { id: 'spurl', l: 'Spurling', n: 'Spurling negativo bilateral', a: ['Spurling positivo derecho', 'Spurling positivo izquierdo'], ne: 'Maniobra de Spurling no evaluable' },
          { id: 'lherm', l: 'Lhermitte', n: 'sin signo de Lhermitte', a: ['signo de Lhermitte'], j: ', ' },
          { id: 'mielo', l: 'Signos de mielopatía', n: 'Sin signos de mielopatía', a: ['Signo de Trömner derecho', 'Signo de Trömner izquierdo', 'Reflejo radial invertido derecho', 'Reflejo radial invertido izquierdo', 'Signo de escape del meñique derecho', 'Signo de escape del meñique izquierdo', 'Atrofia de la musculatura intrínseca de la mano derecha', 'Atrofia de la musculatura intrínseca de la mano izquierda', 'Espasticidad en miembros inferiores'], nom: 'de los signos de mielopatía', pri: 3 }
        ]
      },
      {
        id: 'func', h: 'Función', f: [
          { id: 'marcha', l: 'Marcha', n: 'Marcha conservada', a: ['Marcha espástica', 'Marcha atáxica', 'Marcha con aumento de la base de sustentación', 'Marcha con asistencia', 'Marcha con andador', 'Imposibilidad para la marcha'], ne: 'Marcha no evaluable', nom: 'de la marcha' },
          { id: 'equil', l: 'Equilibrio', n: 'equilibrio conservado', a: ['Romberg positivo', 'inestabilidad en tándem', 'inestabilidad postural'], ne: 'Equilibrio no evaluable', j: ', ' },
          { id: 'msfun', l: 'Función de miembros superiores', n: 'Funcionalidad de miembros superiores conservada', a: ['Limitación funcional del miembro superior derecho', 'Limitación funcional del miembro superior izquierdo', 'Dependencia para actividades de la vida diaria'] },
          { id: 'esf', l: 'Esfínteres', n: 'Control esfinteriano conservado', a: ['Urgencia miccional', 'Retención urinaria', 'Incontinencia urinaria', 'Incontinencia fecal'], ne: 'Control esfinteriano no evaluable', nom: 'de la disfunción esfinteriana', pri: 3 },
          { id: 'mjoa', k: 'scale', s: 'mjoa' },
          { id: 'nurick', k: 'scale', s: 'nurick', j: ', ' }
        ]
      },
      {
        id: 'img', h: 'Imagen', off: true, f: [
          { id: 'imgest', k: 'text', l: 'Estudio realizado', p: 'Se realizó {v}', ph: 'RM de columna cervical' },
          { id: 'alin', l: 'Alineación', n: 'Alineación conservada', a: ['Rectificación de la lordosis cervical', 'Cifosis cervical', 'Anterolistesis', 'Retrolistesis', 'Escoliosis'], d: 'nivel (p. ej. C4-C5)', pri: 12 },
          { id: 'fx', l: 'Fractura', n: 'sin evidencia de fractura', a: ['fractura de cuerpo vertebral', 'fractura de elementos posteriores', 'fractura de odontoides', 'fractura en estallido'], d: 'nivel (p. ej. C5)', j: ', ', pri: 12 },
          { id: 'lux', l: 'Luxación', n: 'sin luxación', a: ['luxación facetaria derecha', 'luxación facetaria izquierda', 'subluxación'], d: 'nivel', j: ', ', pri: 12 },
          { id: 'comp', l: 'Compresión', n: 'Sin compresión medular ni radicular', a: ['Compresión medular', 'Compresión radicular derecha', 'Compresión radicular izquierda', 'Compresión del saco dural'], d: 'nivel', pri: 12 },
          { id: 'esten', l: 'Estenosis', n: 'sin estenosis del canal', a: ['estenosis del canal cervical', 'estenosis foraminal derecha', 'estenosis foraminal izquierda'], d: 'nivel', j: ', ', pri: 12 },
          { id: 'hernia', l: 'Hernia discal', n: 'Sin hernia discal', a: ['Hernia discal central', 'Hernia discal paramediana derecha', 'Hernia discal paramediana izquierda', 'Hernia discal foraminal derecha', 'Hernia discal foraminal izquierda', 'Protrusión discal'], d: 'nivel (p. ej. C5-C6)', pri: 12 },
          { id: 'lesmed', l: 'Lesión medular', n: 'Sin alteración de la señal medular', a: ['Hiperintensidad medular en T2', 'Edema medular', 'Contusión medular', 'Mielomalacia'], d: 'nivel', pri: 12 }
        ]
      },
      {
        id: 'pop', h: 'Postoperatorio', off: true, f: [
          { id: 'dpo', k: 'num', l: 'Día postoperatorio', p: 'Día {v} de postoperatorio', u: '' },
          { id: 'proc', k: 'text', l: 'Procedimiento', p: 'Se realizó {v}', ph: 'discectomía y artrodesis cervical anterior C5-C6' },
          { id: 'her', l: 'Herida quirúrgica', n: 'Herida quirúrgica limpia y seca, sin signos de flogosis', a: ['Herida con eritema perilesional', 'Herida con secreción serosa', 'Herida con secreción purulenta', 'Dehiscencia de herida', 'Hematoma cervical', 'Tumefacción cervical'], d: 'características', ne: 'Herida no evaluada', pri: 11 },
          { id: 'dev', k: 'dev' },
          { id: 'ortesis', l: 'Collar u ortesis', a: ['Con collar cervical rígido', 'Con collar cervical blando', 'Con halo chaleco', 'Sin ortesis cervical'], one: true },
          { id: 'movil', l: 'Movilidad', n: 'Deambula sin asistencia', a: ['Deambula con asistencia', 'Deambula con andador', 'Sedestación tolerada', 'Movilización fuera de cama', 'Reposo en cama'], ne: 'Movilidad no evaluable' },
          { id: 'disf', l: 'Deglución y voz', n: 'Sin disfagia ni disfonía', a: ['Disfagia', 'Disfonía'] }
        ]
      },
      {
        id: 'evol', h: 'Evolución', f: [
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Radiografía de columna cervical de control. Kinesioterapia motora' }
        ]
      }
    ]
  },

  // ─────────────────────────── FICHA 12 — COLUMNA TORÁCICA Y LUMBAR ───────────────────────────
  {
    id: 'nx-lumbar',
    n: 'Columna torácica y lumbar',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Dolor, EVA, patrón radicular, examen motor por raíces, Lasègue, esfínteres, silla de montar, imagen y cirugía',
    secs: [
      {
        id: 'gral', h: 'Estado general', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'conc', k: 'conc', j: ', ' }
        ]
      },
      {
        id: 'dolor', h: 'Dolor', f: [
          { id: 'daxial', l: 'Dolor', n: 'Sin dolor lumbar', a: ['Lumbalgia axial', 'Lumbalgia mecánica', 'Lumbalgia de características inflamatorias', 'Dorsalgia', 'Dolor dorsolumbar'], nom: 'del dolor lumbar', pri: 8 },
          { id: 'irr', l: 'Irradiación', a: ['irradiación a región glútea derecha', 'irradiación a región glútea izquierda', 'irradiación a miembro inferior derecho', 'irradiación a miembro inferior izquierdo', 'irradiación en cinturón'], ap: 'con ', d: 'hasta dónde (p. ej. hasta el pie)', j: ', ', pri: 8 },
          { id: 'prad', l: 'Patrón radicular', n: 'Sin dolor radicular', a: [['L2 derecho', 'Dolor radicular en territorio L2 derecho'], ['L2 izquierdo', 'Dolor radicular en territorio L2 izquierdo'], ['L3 derecho', 'Dolor radicular en territorio L3 derecho'], ['L3 izquierdo', 'Dolor radicular en territorio L3 izquierdo'], ['L4 derecho', 'Dolor radicular en territorio L4 derecho'], ['L4 izquierdo', 'Dolor radicular en territorio L4 izquierdo'], ['L5 derecho', 'Dolor radicular en territorio L5 derecho'], ['L5 izquierdo', 'Dolor radicular en territorio L5 izquierdo'], ['S1 derecho', 'Dolor radicular en territorio S1 derecho'], ['S1 izquierdo', 'Dolor radicular en territorio S1 izquierdo']], nom: 'del dolor radicular', pri: 8 },
          { id: 'eva', k: 'scale', s: 'eva', j: ', ', nom: 'del dolor' }
        ]
      },
      {
        id: 'neuro', h: 'Examen neurológico', f: [
          { id: 'motor', k: 'motor' },
          { id: 'sens', k: 'sens' },
          { id: 'nivs', l: 'Nivel sensitivo', n: 'Sin nivel sensitivo', a: [['T2', 'Nivel sensitivo T2'], ['T4', 'Nivel sensitivo T4'], ['T6', 'Nivel sensitivo T6'], ['T8', 'Nivel sensitivo T8'], ['T10', 'Nivel sensitivo T10'], ['T12', 'Nivel sensitivo T12'], ['L1', 'Nivel sensitivo L1']], one: true, ne: 'Nivel sensitivo no evaluable', nom: 'del nivel sensitivo', pri: 3 },
          { id: 'rot', k: 'rot' },
          { id: 'patol', k: 'patol' }
        ]
      },
      {
        id: 'signos', h: 'Maniobras y marcha', f: [
          { id: 'laseg', l: 'Lasègue', n: 'Lasègue negativo bilateral', a: ['Lasègue positivo derecho', 'Lasègue positivo izquierdo'], d: 'ángulo (p. ej. a 40°)', ne: 'Maniobra de Lasègue no evaluable' },
          { id: 'lasx', l: 'Lasègue cruzado', n: 'Lasègue cruzado negativo', a: ['Lasègue cruzado positivo derecho', 'Lasègue cruzado positivo izquierdo'], j: ', ' },
          { id: 'marcha', l: 'Marcha', n: 'Marcha conservada', a: ['Marcha antálgica', 'Steppage derecho', 'Steppage izquierdo', 'Imposibilidad para la marcha en talones', 'Imposibilidad para la marcha en puntas de pie', 'Claudicación neurógena', 'Marcha espástica', 'Marcha con asistencia', 'Imposibilidad para la marcha'], ne: 'Marcha no evaluable', nom: 'de la marcha' }
        ]
      },
      {
        id: 'esf', h: 'Esfínteres y silla de montar', f: [
          { id: 'esfin', l: 'Función esfinteriana', n: 'Control esfinteriano conservado', a: ['Retención urinaria', 'Incontinencia urinaria', 'Urgencia miccional', 'Incontinencia fecal', 'Disminución del tono anal'], ne: 'Control esfinteriano no evaluable', nom: 'de la disfunción esfinteriana', pri: 3 },
          { id: 'silla', l: 'Anestesia en silla de montar', n: 'sin anestesia en silla de montar', a: ['anestesia en silla de montar', 'hipoestesia en silla de montar'], one: true, ne: 'Sensibilidad en silla de montar no evaluable', j: ', ', nom: 'de la hipoestesia en silla de montar', pri: 3 }
        ]
      },
      {
        id: 'img', h: 'Imagen', off: true, f: [
          { id: 'imgest', k: 'text', l: 'Estudio realizado', p: 'Se realizó {v}', ph: 'RM de columna lumbosacra' },
          { id: 'alin', l: 'Alineación', n: 'Alineación conservada', a: ['Rectificación de la lordosis lumbar', 'Anterolistesis', 'Retrolistesis', 'Escoliosis', 'Cifosis'], d: 'nivel y grado (p. ej. L4-L5 grado I)', pri: 12 },
          { id: 'fx', l: 'Fractura', n: 'sin evidencia de fractura', a: ['fractura por compresión', 'fractura en estallido', 'fractura por distracción', 'fractura-luxación'], d: 'nivel (p. ej. L1)', j: ', ', pri: 12 },
          { id: 'hernia', l: 'Hernia discal', n: 'Sin hernia discal', a: ['Hernia discal central', 'Hernia discal paramediana derecha', 'Hernia discal paramediana izquierda', 'Hernia discal foraminal derecha', 'Hernia discal foraminal izquierda', 'Hernia discal extruida', 'Protrusión discal'], d: 'nivel (p. ej. L4-L5)', pri: 12 },
          { id: 'esten', l: 'Estenosis', n: 'sin estenosis del canal', a: ['estenosis del canal central', 'estenosis del receso lateral derecho', 'estenosis del receso lateral izquierdo', 'estenosis foraminal derecha', 'estenosis foraminal izquierda'], d: 'nivel', j: ', ', pri: 12 },
          { id: 'comp', l: 'Compresión', n: 'Sin compresión radicular', a: ['Compresión radicular derecha', 'Compresión radicular izquierda', 'Compresión del saco dural', 'Compresión del cono medular', 'Compresión medular'], d: 'raíz o nivel (p. ej. raíz L5)', pri: 12 }
        ]
      },
      {
        id: 'pop', h: 'Cirugía y postoperatorio', off: true, f: [
          { id: 'dpo', k: 'num', l: 'Día postoperatorio', p: 'Día {v} de postoperatorio', u: '' },
          { id: 'proc', k: 'text', l: 'Cirugía', p: 'Se realizó {v}', ph: 'microdiscectomía L4-L5 derecha' },
          { id: 'her', l: 'Herida quirúrgica', n: 'Herida quirúrgica limpia y seca, sin signos de flogosis', a: ['Herida con eritema perilesional', 'Herida con secreción serosa', 'Herida con secreción purulenta', 'Dehiscencia de herida', 'Fístula de LCR por herida'], d: 'características', ne: 'Herida no evaluada', pri: 11 },
          { id: 'dev', k: 'dev' },
          { id: 'ortesis', l: 'Ortesis', a: ['Con corset toracolumbosacro', 'Con corset de Jewett', 'Con faja lumbar', 'Sin ortesis'], one: true },
          { id: 'movil', l: 'Movilidad', n: 'Deambula sin asistencia', a: ['Deambula con asistencia', 'Deambula con andador', 'Sedestación tolerada', 'Movilización fuera de cama', 'Reposo en cama'], ne: 'Movilidad no evaluable' }
        ]
      },
      {
        id: 'evol', h: 'Evolución', f: [
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Deambulación asistida. Analgesia por horario' }
        ]
      }
    ]
  },

  // ─────────────────────────── FICHA 13 — LESIÓN MEDULAR + ASIA/ISNCSCI ───────────────────────────
  {
    id: 'nx-medular',
    n: 'Lesión medular · ASIA/ISNCSCI',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'ISNCSCI con nivel neurológico, AIS y ZPP; mecanismo, estabilidad, cirugía, funciones vesical, intestinal y sexual, movilidad y respiración',
    secs: [
      {
        id: 'ctx', h: 'Mecanismo y nivel', f: [
          { id: 'mec', l: 'Mecanismo', a: [['Caída de altura', 'Lesión por caída de altura'], ['Accidente de tránsito', 'Lesión por accidente de tránsito'], ['Zambullida', 'Lesión por zambullida en aguas poco profundas'], ['Arma de fuego', 'Lesión por herida de arma de fuego'], ['Arma blanca', 'Lesión por herida de arma blanca'], ['Deportiva', 'Lesión durante actividad deportiva'], ['No traumática', 'Lesión medular no traumática']], one: true, d: 'detalle (p. ej. por hiperflexión)' },
          { id: 'tev', k: 'num', l: 'Días desde la lesión', p: 'Día {v} desde la lesión', u: 'días' },
          { id: 'nivrad', k: 'text', l: 'Nivel radiológico', p: 'Nivel lesional radiológico {v}', ph: 'C5-C6' }
        ]
      },
      {
        id: 'gral', h: 'Estado general y signos vitales', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'conc', k: 'conc', j: ', ' },
          { id: 'vitals', k: 'vitals' }
        ]
      },
      {
        id: 'isncsci', h: 'ISNCSCI / ASIA', f: [
          { id: 'asia', k: 'asia' }
        ]
      },
      {
        id: 'refl', h: 'Reflejos', off: true, f: [
          { id: 'rot', k: 'rot' },
          { id: 'patol', k: 'patol' },
          { id: 'bulbo', l: 'Reflejo bulbocavernoso', n: 'Reflejo bulbocavernoso presente', a: ['Reflejo bulbocavernoso ausente'], ne: 'Reflejo bulbocavernoso no evaluable' }
        ]
      },
      {
        id: 'img', h: 'Imagen y estabilidad', off: true, f: [
          { id: 'imgest', k: 'text', l: 'Estudio realizado', p: 'Se realizó {v}', ph: 'RM de columna cervical' },
          { id: 'lesmed', l: 'Lesión medular en imagen', n: 'Sin alteración de la señal medular', a: ['Hiperintensidad medular en T2', 'Edema medular', 'Contusión medular', 'Hemorragia intramedular', 'Sección medular', 'Compresión medular'], d: 'nivel y extensión (p. ej. C5-C6, 2 segmentos)', pri: 12 },
          { id: 'estab', l: 'Estabilidad', n: 'Lesión estable', a: ['Lesión inestable'], ne: 'Estabilidad de la lesión aún no definida', pri: 12 }
        ]
      },
      {
        id: 'cx', h: 'Cirugía', off: true, f: [
          { id: 'dpo', k: 'num', l: 'Día postoperatorio', p: 'Día {v} de postoperatorio', u: '' },
          { id: 'proc', k: 'text', l: 'Cirugía', p: 'Se realizó {v}', ph: 'descompresión y artrodesis C4-C6 por vía anterior' },
          { id: 'her', l: 'Herida quirúrgica', n: 'Herida quirúrgica limpia y seca, sin signos de flogosis', a: ['Herida con eritema perilesional', 'Herida con secreción serosa', 'Herida con secreción purulenta', 'Dehiscencia de herida', 'Fístula de LCR por herida'], d: 'características', ne: 'Herida no evaluada', pri: 11 },
          { id: 'dev', k: 'dev' },
          { id: 'ortesis', l: 'Ortesis', a: ['Con collar cervical rígido', 'Con halo chaleco', 'Con corset toracolumbosacro', 'Sin ortesis'], one: true }
        ]
      },
      {
        id: 'auton', h: 'Funciones vesical, intestinal y sexual', f: [
          { id: 'vesical', l: 'Función vesical', n: 'Micción espontánea', a: ['Retención urinaria', 'Incontinencia urinaria', 'Con sonda vesical permanente', 'Con cateterismo intermitente'], ne: 'Función vesical no evaluable', nom: 'de la función vesical' },
          { id: 'intest', l: 'Función intestinal', n: 'Tránsito intestinal conservado', a: ['Constipación', 'Ausencia de catarsis', 'Distensión abdominal', 'Incontinencia fecal', 'Con programa de evacuación intestinal'], ne: 'Función intestinal no evaluable' },
          { id: 'sexual', l: 'Función sexual', n: 'Función sexual conservada', a: ['Disfunción eréctil', 'Priapismo', 'Alteración de la sensibilidad genital'], ne: 'Función sexual no evaluada' }
        ]
      },
      {
        id: 'resp', h: 'Respiración', f: [
          { id: 'respir', l: 'Respiración', n: 'Eupneico, sin requerimiento de soporte ventilatorio', a: ['Respiración diafragmática', 'Taquipneico', 'Uso de músculos accesorios', 'Tos débil', 'Requerimiento de oxígeno suplementario', 'En ventilación no invasiva', 'En asistencia respiratoria mecánica', 'Con traqueostomía'], d: 'detalle (p. ej. FiO₂ 35%)', nom: 'de la mecánica respiratoria' }
        ]
      },
      {
        id: 'movil', h: 'Movilidad y piel', f: [
          { id: 'movil', l: 'Movilidad', n: 'Deambula sin asistencia', a: ['Reposo en cama', 'Rotación en bloque', 'Sedestación con asistencia', 'Transferencias con asistencia', 'En silla de ruedas', 'Deambula con asistencia', 'Deambula con andador'], ne: 'Movilidad no evaluable' },
          { id: 'piel', l: 'Lesiones por presión', n: 'Sin lesiones por presión', a: ['Lesión por presión sacra', 'Lesión por presión en talón derecho', 'Lesión por presión en talón izquierdo', 'Lesión por presión trocantérea derecha', 'Lesión por presión trocantérea izquierda', 'Lesión por presión occipital'], d: 'estadio (p. ej. estadio II)' }
        ]
      },
      {
        id: 'evol', h: 'Evolución', f: [
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Kinesioterapia respiratoria y motora. Cateterismo intermitente c/6 h' }
        ]
      }
    ]
  },

  // ───────────────────────────── FICHA 14 — RADICULOPATÍA ─────────────────────────────
  {
    id: 'nx-radic',
    n: 'Radiculopatía',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Dolor radicular, irradiación, EVA, déficit sensitivo y motor por raíz, reflejos, maniobras provocativas, imagen y EMG',
    secs: [
      {
        id: 'dolor', h: 'Dolor radicular', f: [
          { id: 'drad', l: 'Dolor radicular', n: 'Sin dolor radicular', a: [['Cervical', 'Dolor radicular cervical'], ['Torácica', 'Dolor radicular torácico'], ['Lumbar', 'Dolor radicular lumbar'], ['Sacra', 'Dolor radicular sacro']], one: true, nom: 'del dolor radicular', pri: 8 },
          { id: 'irr', l: 'Irradiación', a: ['irradiación a miembro superior derecho', 'irradiación a miembro superior izquierdo', 'irradiación a miembro inferior derecho', 'irradiación a miembro inferior izquierdo', 'irradiación en hemicinturón derecho', 'irradiación en hemicinturón izquierdo'], ap: 'con ', d: 'distribución (p. ej. hasta el dorso del pie)', j: ' ', pri: 8 },
          { id: 'eva', k: 'scale', s: 'eva', j: ', ', nom: 'del dolor radicular' },
          { id: 'raiz', k: 'text', l: 'Raíz sospechada o diagnosticada', p: 'Compromiso de raíz {v}', ph: 'L5 derecha (sospechado)' },
          { id: 'parest', l: 'Parestesias', n: 'Sin parestesias', a: ['Parestesias en miembro superior derecho', 'Parestesias en miembro superior izquierdo', 'Parestesias en miembro inferior derecho', 'Parestesias en miembro inferior izquierdo'], d: 'distribución (p. ej. en territorio L5)', nom: 'de las parestesias', pri: 8 }
        ]
      },
      {
        id: 'neuro', h: 'Examen neurológico', f: [
          { id: 'sens', k: 'sens' },
          { id: 'motor', k: 'motor' },
          { id: 'rot', k: 'rot' }
        ]
      },
      {
        id: 'maniob', h: 'Maniobras provocativas', f: [
          { id: 'spurl', l: 'Spurling', n: 'Spurling negativo bilateral', a: ['Spurling positivo derecho', 'Spurling positivo izquierdo'], ne: 'Maniobra de Spurling no evaluable' },
          { id: 'laseg', l: 'Lasègue', n: 'Lasègue negativo bilateral', a: ['Lasègue positivo derecho', 'Lasègue positivo izquierdo'], d: 'ángulo (p. ej. a 40°)', ne: 'Maniobra de Lasègue no evaluable' },
          { id: 'lasx', l: 'Lasègue cruzado', n: 'Lasègue cruzado negativo', a: ['Lasègue cruzado positivo derecho', 'Lasègue cruzado positivo izquierdo'], j: ', ' },
          { id: 'otrasm', l: 'Otras maniobras', n: 'Resto de las maniobras provocativas negativas', a: ['Bragard positivo derecho', 'Bragard positivo izquierdo', 'Wassermann positivo derecho', 'Wassermann positivo izquierdo', 'Signo de abducción del hombro positivo derecho', 'Signo de abducción del hombro positivo izquierdo', 'Alivio del dolor con la distracción cervical'] }
        ]
      },
      {
        id: 'est', h: 'Imagen y electromiografía', off: true, f: [
          { id: 'imgest', k: 'text', l: 'Estudio realizado', p: 'Se realizó {v}', ph: 'RM de columna lumbosacra' },
          { id: 'hernia', l: 'Hernia discal', n: 'Sin hernia discal', a: ['Hernia discal central', 'Hernia discal paramediana derecha', 'Hernia discal paramediana izquierda', 'Hernia discal foraminal derecha', 'Hernia discal foraminal izquierda', 'Hernia discal extruida', 'Protrusión discal'], d: 'nivel (p. ej. L4-L5)', pri: 12 },
          { id: 'esten', l: 'Estenosis', n: 'sin estenosis', a: ['estenosis foraminal derecha', 'estenosis foraminal izquierda', 'estenosis del receso lateral derecho', 'estenosis del receso lateral izquierdo', 'estenosis del canal central'], d: 'nivel', j: ', ', pri: 12 },
          { id: 'comp', l: 'Compresión radicular', n: 'sin compresión radicular', a: ['compresión radicular derecha', 'compresión radicular izquierda'], d: 'raíz (p. ej. raíz L5)', j: ', ', pri: 12 },
          { id: 'emg', k: 'text', l: 'Electromiografía', p: 'Electromiografía que evidencia {v}', ph: 'signos de denervación aguda en territorio L5 derecho' }
        ]
      },
      {
        id: 'trat', h: 'Tratamiento realizado', off: true, f: [
          { id: 'med', k: 'text', l: 'Tratamiento médico', p: 'En tratamiento con {v}', ph: 'pregabalina 75 mg c/12 h y AINE' },
          { id: 'proc', k: 'text', l: 'Procedimiento', p: 'Se realizó {v}', ph: 'bloqueo radicular selectivo L5 derecho' },
          { id: 'kine', l: 'Rehabilitación', a: ['En plan de kinesioterapia', 'Sin rehabilitación iniciada'], one: true }
        ]
      },
      {
        id: 'evol', h: 'Evolución', f: [
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Control en consultorio en 2 semanas con RM' }
        ]
      }
    ]
  },

  // ─────────────────────────── FICHA 15 — SÍNDROME DE CAUDA EQUINA ───────────────────────────
  {
    id: 'nx-cauda',
    n: 'Síndrome de cauda equina',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Hallazgos de alarma (silla de montar, tono anal, retención urinaria), dolor, déficit motor bilateral, imagen y cirugía',
    secs: [
      {
        id: 'gral', h: 'Estado general', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'conc', k: 'conc', j: ', ' }
        ]
      },
      {
        id: 'alarma', h: 'Hallazgos de alarma', f: [
          { id: 'silla', l: 'Anestesia en silla de montar', n: 'Sin anestesia en silla de montar', a: ['Anestesia en silla de montar', 'Hipoestesia en silla de montar'], one: true, ne: 'Sensibilidad en silla de montar no evaluable', nom: 'de la hipoestesia en silla de montar', pri: 3 },
          { id: 'perin', l: 'Sensibilidad perineal', n: 'sensibilidad perineal conservada', a: ['hipoestesia perineal', 'anestesia perineal', 'hipoestesia perianal', 'hipoestesia genital'], ne: 'Sensibilidad perineal no evaluable', j: ', ', nom: 'de la hipoestesia perineal', pri: 3 },
          { id: 'tono', l: 'Tono anal', n: 'Tono anal conservado', a: ['Tono anal disminuido', 'Tono anal ausente'], one: true, ne: 'Tono anal no evaluado', pri: 3 },
          { id: 'cav', l: 'Contracción anal voluntaria', n: 'contracción anal voluntaria presente', a: ['contracción anal voluntaria disminuida', 'contracción anal voluntaria ausente'], one: true, ne: 'Contracción anal voluntaria no evaluable', j: ', ', pri: 3 },
          { id: 'vesical', l: 'Función urinaria', n: 'Micción espontánea conservada', a: ['Retención urinaria', 'Incontinencia urinaria', 'Incontinencia por rebosamiento', 'Disminución de la sensación de llenado vesical', 'Chorro miccional débil'], num: { l: 'Residuo posmiccional', u: 'mL', p: 'con residuo posmiccional de {v} mL' }, ne: 'Función urinaria no evaluable', nom: 'de la disfunción vesical', pri: 3 },
          { id: 'intest', l: 'Función intestinal', n: 'Sin alteraciones del ritmo evacuatorio', a: ['Incontinencia fecal', 'Constipación de reciente comienzo', 'Pérdida de la sensación de evacuación'], ne: 'Función intestinal no evaluable', pri: 3 },
          { id: 'sexual', l: 'Función sexual', n: 'Sin disfunción sexual referida', a: ['Disfunción eréctil de reciente comienzo', 'Disminución de la sensibilidad genital'], ne: 'Función sexual no evaluada', pri: 3 }
        ]
      },
      {
        id: 'dolor', h: 'Dolor', f: [
          { id: 'dlum', l: 'Dolor lumbar', n: 'Sin lumbalgia', a: ['Lumbalgia', 'Lumbalgia de inicio agudo', 'Lumbalgia de intensidad progresiva'], one: true, nom: 'del dolor lumbar', pri: 8 },
          { id: 'drad', l: 'Dolor radicular', n: 'Sin dolor radicular', a: ['Dolor radicular en miembro inferior derecho', 'Dolor radicular en miembro inferior izquierdo'], d: 'territorio (p. ej. S1)', nom: 'del dolor radicular', pri: 8 },
          { id: 'eva', k: 'scale', s: 'eva', j: ', ', nom: 'del dolor' }
        ]
      },
      {
        id: 'neuro', h: 'Examen neurológico', f: [
          { id: 'motor', k: 'motor' },
          { id: 'sens', k: 'sens' },
          { id: 'rot', k: 'rot' },
          { id: 'patol', k: 'patol' },
          { id: 'marcha', l: 'Marcha', n: 'Marcha conservada', a: ['Marcha antálgica', 'Steppage derecho', 'Steppage izquierdo', 'Marcha con asistencia', 'Imposibilidad para la marcha'], ne: 'Marcha no evaluable', nom: 'de la marcha' }
        ]
      },
      {
        id: 'img', h: 'Imagen', off: true, f: [
          { id: 'imgest', k: 'text', l: 'Estudio realizado', p: 'Se realizó {v}', ph: 'RM de columna lumbosacra de urgencia' },
          { id: 'comp', l: 'Compresión', n: 'Sin compresión de raíces de la cola de caballo', a: ['Compresión de raíces de la cola de caballo', 'Hernia discal central masiva', 'Estenosis severa del canal', 'Lesión ocupante del canal', 'Colección epidural', 'Compresión del cono medular'], d: 'nivel (p. ej. L4-L5)', pri: 12 }
        ]
      },
      {
        id: 'pop', h: 'Procedimiento y postoperatorio', off: true, f: [
          { id: 'dpo', k: 'num', l: 'Día postoperatorio', p: 'Día {v} de postoperatorio', u: '' },
          { id: 'proc', k: 'text', l: 'Procedimiento realizado', p: 'Se realizó {v}', ph: 'descompresión y discectomía L4-L5 de urgencia' },
          { id: 'her', l: 'Herida quirúrgica', n: 'Herida quirúrgica limpia y seca, sin signos de flogosis', a: ['Herida con eritema perilesional', 'Herida con secreción serosa', 'Herida con secreción purulenta', 'Dehiscencia de herida', 'Fístula de LCR por herida'], d: 'características', ne: 'Herida no evaluada', pri: 11 },
          { id: 'dev', k: 'dev' }
        ]
      },
      {
        id: 'evol', h: 'Evolución neurológica', f: [
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Control de residuo posmiccional. Evaluación neurológica c/4 h' }
        ]
      }
    ]
  },

  // ─────────────────────── FICHA 16 — CRISIS EPILÉPTICA / STATUS EPILÉPTICO ───────────────────────
  {
    id: 'nx-crisis',
    n: 'Crisis epiléptica · Status epiléptico',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Semiología de la crisis, recuperación, déficit postictal, precipitantes, medicación, estudios y status',
    secs: [
      {
        id: 'gral', h: 'Estado general y conciencia', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'conc', k: 'conc' },
          { id: 'orient', k: 'orient', j: ', ' },
          { id: 'gcs', k: 'gcs', j: ', ' }
        ]
      },
      {
        id: 'crisis', h: 'Descripción de la crisis', f: [
          { id: 'tipo', l: 'Tipo de crisis', n: 'Sin nuevas crisis', a: ['Crisis tónico-clónica generalizada', 'Crisis focal motora', 'Crisis focal con alteración de la conciencia', 'Crisis focal sin alteración de la conciencia', 'Crisis focal a bilateral tónico-clónica', 'Crisis de ausencia', 'Crisis mioclónica', 'Crisis atónica'], one: true, d: 'horario', nom: 'de las crisis', pri: 3 },
          { id: 'inicio', l: 'Inicio', a: ['de inicio focal', 'de inicio generalizado', 'de inicio desconocido'], one: true, j: ', ' },
          { id: 'dur', k: 'num', l: 'Duración', p: 'de {v} min de duración', u: 'min', j: ', ' },
          { id: 'cconc', l: 'Conciencia durante la crisis', a: ['con pérdida de conciencia', 'con alteración parcial de la conciencia', 'con conciencia preservada'], one: true, j: ', ' },
          { id: 'desv', l: 'Desviación ocular', n: 'Sin desviación oculocefálica', a: ['Desviación oculocefálica hacia la derecha', 'Desviación oculocefálica hacia la izquierda', 'Desviación ocular hacia arriba'], one: true },
          { id: 'mov', l: 'Movimientos', a: ['Movimientos tónico-clónicos generalizados', 'Movimientos clónicos en hemicuerpo derecho', 'Movimientos clónicos en hemicuerpo izquierdo', 'Postura tónica', 'Mioclonías'], j: ', ' },
          { id: 'autom', l: 'Automatismos', n: 'sin automatismos', a: ['automatismos oroalimentarios', 'automatismos manuales', 'automatismos gestuales'], ap: 'con ', j: ', ' },
          { id: 'mord', l: 'Mordedura lingual', n: 'Sin mordedura lingual', a: ['Mordedura lingual'] },
          { id: 'incont', l: 'Incontinencia', n: 'sin relajación de esfínteres', a: ['incontinencia urinaria', 'incontinencia fecal'], ap: 'con ', j: ', ' },
          { id: 'frec', l: 'Frecuencia', a: ['Episodio único', 'Crisis recurrentes', 'Crisis en salvas'], one: true, num: { l: 'Episodios en 24 h', u: '', p: '{v} episodios en las últimas 24 h' } }
        ]
      },
      {
        id: 'post', h: 'Recuperación y estado postictal', f: [
          { id: 'recup', l: 'Recuperación', n: 'Recuperación completa del nivel de conciencia', a: ['Recuperación parcial del nivel de conciencia', 'Sin recuperación del nivel de conciencia entre crisis'], one: true, num: { l: 'Tiempo hasta la recuperación', u: 'min', p: 'a los {v} min' }, pri: 1 },
          { id: 'postic', l: 'Estado postictal', n: 'Sin estado postictal', a: ['Somnolencia postictal', 'Confusión postictal', 'Agitación postictal', 'Cefalea postictal'], nom: 'del estado postictal' },
          { id: 'todd', l: 'Déficit postictal', n: 'Sin déficit focal postictal', a: ['Paresia de Todd derecha', 'Paresia de Todd izquierda', 'Afasia postictal', 'Hemianopsia postictal derecha', 'Hemianopsia postictal izquierda'], d: 'fuerza, duración', nom: 'del déficit postictal', pri: 3 }
        ]
      },
      {
        id: 'neuro', h: 'Examen neurológico', f: [
          { id: 'pupils', k: 'pupils' },
          { id: 'mrc4', k: 'mrc4' },
          { id: 'leng', l: 'Lenguaje', n: 'Lenguaje conservado', a: ['Afasia motora', 'Afasia sensitiva', 'Afasia mixta', 'Disartria'], ne: 'Lenguaje no evaluable', nom: 'del trastorno del lenguaje', pri: 7 }
        ]
      },
      {
        id: 'status', h: 'Status epiléptico', off: true, f: [
          { id: 'stat', l: 'Status epiléptico', a: ['Actividad convulsiva continua', 'Crisis recurrentes sin recuperación de la conciencia entre episodios', 'Actividad epiléptica no convulsiva en EEG'], pri: 1 },
          { id: 'sdur', k: 'num', l: 'Duración del status', p: 'de {v} min de evolución', u: 'min', j: ', ' },
          { id: 'sconc', l: 'Estado de conciencia', a: ['Compromiso persistente del sensorio', 'Coma', 'Vigil entre episodios'], one: true, pri: 1 },
          { id: 'sresp', l: 'Compromiso respiratorio', n: 'Sin compromiso respiratorio', a: ['Desaturación', 'Requerimiento de oxígeno suplementario', 'Requerimiento de intubación orotraqueal', 'En asistencia respiratoria mecánica', 'Broncoaspiración'] },
          { id: 'strat', k: 'text', l: 'Tratamiento administrado', p: 'Se administró {v}', ph: 'lorazepam 4 mg EV y carga de levetiracetam 60 mg/kg' },
          { id: 'sevol', l: 'Evolución del status', a: ['Cese de la actividad convulsiva', 'Persistencia de la actividad convulsiva', 'Recurrencia de crisis', 'Status refractario'], one: true }
        ]
      },
      {
        id: 'fact', h: 'Factores asociados', f: [
          { id: 'precip', l: 'Factores precipitantes', n: 'Sin factores precipitantes conocidos', a: ['Privación de sueño', 'Abandono de medicación antiepiléptica', 'Consumo de alcohol', 'Abstinencia alcohólica', 'Fiebre', 'Alteración metabólica', 'Infección intercurrente', 'Fotoestimulación'], d: 'detalle' },
          { id: 'fiebre', l: 'Fiebre', n: 'Afebril', a: ['Febril', 'Subfebril'], one: true, num: { l: 'Temperatura', u: '°C', p: '{v} °C' } },
          { id: 'trauma', l: 'Trauma asociado', n: 'Sin traumatismo asociado', a: ['Traumatismo craneoencefálico durante la crisis', 'Herida en cuero cabelludo', 'Traumatismo facial', 'Luxación de hombro', 'Fractura'], d: 'localización' }
        ]
      },
      {
        id: 'trat', h: 'Medicación antiepiléptica', f: [
          { id: 'fae', k: 'text', l: 'Medicación antiepiléptica', p: 'En tratamiento con {v}', ph: 'levetiracetam 1000 mg c/12 h' },
          { id: 'adher', l: 'Adherencia', n: 'Refiere adecuada adherencia al tratamiento', a: ['Mala adherencia al tratamiento', 'Abandono del tratamiento', 'Omisión de dosis', 'Cambio reciente de medicación'], ne: 'Adherencia no evaluable' }
        ]
      },
      {
        id: 'est', h: 'Estudios', off: true, f: [
          { id: 'eeg', k: 'text', l: 'EEG', p: 'EEG que evidencia {v}', ph: 'actividad epileptiforme temporal izquierda' },
          { id: 'img', k: 'text', l: 'Neuroimagen', p: '{v}', ph: 'TC de cerebro sin lesiones agudas' },
          { id: 'lab', k: 'lab' }
        ]
      },
      {
        id: 'evol', h: 'Evolución', f: [
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'EEG de control. Dosaje de niveles plasmáticos' }
        ]
      }
    ]
  },

  // ─────────────────────── FICHA 17 — ALTERACIÓN DEL SENSORIO / COMA ───────────────────────
  {
    id: 'nx-coma',
    n: 'Alteración del sensorio · Coma',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Nivel de conciencia, Glasgow, pupilas, reflejos de tronco, respuesta motora, patrón respiratorio, sedación y vía aérea',
    secs: [
      {
        id: 'gral', h: 'Estado general y signos vitales', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'vitals', k: 'vitals' }
        ]
      },
      {
        id: 'concs', h: 'Nivel de conciencia', f: [
          { id: 'conc', k: 'conc' },
          { id: 'gcs', k: 'gcs', j: ', ' },
          { id: 'sed', l: 'Sedación', n: 'Sin sedación', a: ['Bajo sedoanalgesia', 'Con sedación en descenso', 'Con sedación suspendida'], one: true, d: 'fármacos y dosis (p. ej. con propofol y fentanilo)' },
          { id: 'rass', k: 'scale', s: 'rass', j: ', ' }
        ]
      },
      {
        id: 'tronco', h: 'Pupilas y reflejos de tronco', f: [
          { id: 'pupils', k: 'pupils' },
          { id: 'corneal', l: 'Reflejos corneales', n: 'Reflejo corneal presente bilateral', a: ['Reflejo corneal ausente derecho', 'Reflejo corneal ausente izquierdo', 'Reflejo corneal disminuido derecho', 'Reflejo corneal disminuido izquierdo'], ne: 'Reflejo corneal no evaluable', nom: 'del reflejo corneal', pri: 2 },
          { id: 'mo', l: 'Motilidad ocular', n: 'Motilidad ocular extrínseca conservada', a: ['Desviación conjugada de la mirada hacia la derecha', 'Desviación conjugada de la mirada hacia la izquierda', 'Desviación oblicua (skew)', 'Mirada desconjugada', 'Paresia del III par derecho', 'Paresia del III par izquierdo', 'Paresia del VI par derecho', 'Paresia del VI par izquierdo', 'Movimientos oculares erráticos (roving)', 'Bobbing ocular'], ne: 'Motilidad ocular no evaluable', pri: 2 },
          { id: 'oce', l: 'Reflejos oculocefálicos', n: 'reflejos oculocefálicos presentes', a: ['reflejos oculocefálicos ausentes', 'reflejos oculocefálicos disminuidos'], one: true, ne: 'Reflejos oculocefálicos no evaluables', j: ', ', pri: 2 }
        ]
      },
      {
        id: 'motor', h: 'Respuesta motora y lateralización', f: [
          { id: 'motresp', l: 'Respuesta motora', n: 'Moviliza los cuatro miembros', a: ['Localiza el estímulo doloroso', 'Retira al estímulo doloroso', 'Postura de decorticación derecha', 'Postura de decorticación izquierda', 'Postura de descerebración derecha', 'Postura de descerebración izquierda', 'Sin respuesta motora al estímulo doloroso'], ne: 'Respuesta motora no evaluable', nom: 'de la respuesta motora', pri: 6 },
          { id: 'lat', l: 'Lateralización', n: 'Sin signos de lateralización', a: ['Hemiparesia derecha', 'Hemiparesia izquierda', 'Menor movilización del hemicuerpo derecho', 'Menor movilización del hemicuerpo izquierdo'], ne: 'Lateralización no evaluable', nom: 'del déficit motor', pri: 3 },
          { id: 'patol', k: 'patol' },
          { id: 'conv', l: 'Convulsiones', n: 'Sin actividad convulsiva', a: ['Crisis tónico-clónica generalizada', 'Crisis focal motora derecha', 'Crisis focal motora izquierda', 'Mioclonías multifocales', 'Movimientos anormales sutiles'], d: 'número, duración', pri: 3 }
        ]
      },
      {
        id: 'resp', h: 'Respiración y vía aérea', f: [
          { id: 'patron', l: 'Patrón respiratorio', n: 'Patrón respiratorio regular', a: ['Respiración de Cheyne-Stokes', 'Hiperventilación neurógena central', 'Respiración apnéustica', 'Respiración atáxica', 'Respiración en salvas', 'Apnea'], ne: 'Patrón respiratorio no evaluable por ventilación mecánica' },
          { id: 'via', l: 'Vía aérea', n: 'Ventila espontáneamente sin dispositivo de vía aérea', a: ['Con intubación orotraqueal', 'Con traqueostomía', 'Con cánula orofaríngea'], one: true },
          { id: 'vent', l: 'Ventilación', a: ['en asistencia respiratoria mecánica en modo controlado', 'en asistencia respiratoria mecánica en modo asistido', 'en ventilación espontánea con presión de soporte', 'en ventilación no invasiva', 'con oxígeno por cánula nasal', 'con máscara con reservorio'], one: true, d: 'parámetros (p. ej. FiO₂ 40%, PEEP 5)', j: ', ' }
        ]
      },
      {
        id: 'est', h: 'Estudios', off: true, f: [
          { id: 'img', k: 'text', l: 'Neuroimagen', p: '{v}', ph: 'TC de cerebro sin lesiones agudas' },
          { id: 'lab', k: 'lab' }
        ]
      },
      {
        id: 'causa', h: 'Causa conocida', off: true, f: [
          { id: 'causa', k: 'text', l: 'Causa conocida', p: 'Cuadro secundario a {v}', ph: 'hematoma subdural agudo (confirmado por TC)' }
        ]
      },
      {
        id: 'evol', h: 'Evolución', f: [
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Ventana de sedación diaria. EEG' }
        ]
      }
    ]
  },

  // ───────────────────────────── FICHA 18 — NEUROINFECCIÓN ─────────────────────────────
  {
    id: 'nx-infeccion',
    n: 'Neuroinfección',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Fiebre, signos meníngeos, sensorio, déficit focal, LCR, microbiología, neuroimagen y dispositivos',
    secs: [
      {
        id: 'ctx', h: 'Diagnóstico y tratamiento', off: true, f: [
          { id: 'dx', k: 'text', l: 'Diagnóstico conocido', p: 'Con diagnóstico de {v}', ph: 'ventriculitis asociada a DVE con cultivo de LCR positivo' },
          { id: 'atb', k: 'text', l: 'Tratamiento antimicrobiano', p: 'En tratamiento con {v}', ph: 'vancomicina y meropenem (día 3)' }
        ]
      },
      {
        id: 'gral', h: 'Estado general y signos vitales', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'fiebre', l: 'Fiebre', n: 'Afebril en las últimas 24 h', a: ['Registros febriles en las últimas 24 h', 'Fiebre persistente', 'Fiebre de reciente comienzo'], one: true, num: { l: 'Temperatura máxima', u: '°C', p: 'con temperatura máxima de {v} °C' } },
          { id: 'vitals', k: 'vitals' },
          { id: 'sepsis', l: 'Signos de sepsis', n: 'Sin signos de hipoperfusión', a: ['Hipotensión arterial', 'Requerimiento de vasopresores', 'Taquicardia', 'Taquipnea', 'Relleno capilar enlentecido', 'Livideces', 'Oliguria'] },
          { id: 'piel', l: 'Lesiones cutáneas', n: 'Sin lesiones cutáneas', a: ['Exantema petequial', 'Púrpura', 'Exantema maculopapular', 'Lesiones vesiculares'], d: 'distribución' }
        ]
      },
      {
        id: 'neuro', h: 'Examen neurológico', f: [
          { id: 'conc', k: 'conc' },
          { id: 'orient', k: 'orient', j: ', ' },
          { id: 'gcs', k: 'gcs', j: ', ' },
          { id: 'cef', l: 'Cefalea', n: 'Sin cefalea', a: ['Cefalea holocraneana', 'Cefalea frontal', 'Cefalea occipital'], one: true, sc: { s: 'eva' }, nom: 'de la cefalea', pri: 9 },
          { id: 'pupils', k: 'pupils' },
          { id: 'pc', l: 'Pares craneales', n: 'Pares craneales sin alteraciones', a: ['Paresia facial periférica derecha', 'Paresia facial periférica izquierda', 'Paresia facial central derecha', 'Paresia facial central izquierda', 'Paresia del III par derecho', 'Paresia del III par izquierdo', 'Paresia del VI par derecho', 'Paresia del VI par izquierdo', 'Hipoacusia derecha', 'Hipoacusia izquierda'], d: 'detalle', nom: 'del compromiso de pares craneales', pri: 3 },
          { id: 'mrc4', k: 'mrc4' },
          { id: 'leng', l: 'Lenguaje', n: 'Lenguaje conservado', a: ['Afasia motora', 'Afasia sensitiva', 'Afasia mixta', 'Disartria'], ne: 'Lenguaje no evaluable', nom: 'del trastorno del lenguaje', pri: 7 },
          { id: 'crisis', l: 'Crisis', n: 'Sin crisis', a: ['Crisis focal motora derecha', 'Crisis focal motora izquierda', 'Crisis focal con alteración de la conciencia', 'Crisis tónico-clónica generalizada'], d: 'número, duración', pri: 3 }
        ]
      },
      {
        id: 'men', h: 'Signos meníngeos', f: [
          { id: 'rigidez', l: 'Rigidez de nuca', n: 'Sin rigidez de nuca', a: ['Rigidez de nuca'], ne: 'Rigidez de nuca no evaluable', nom: 'de la rigidez de nuca', pri: 10 },
          { id: 'kernig', l: 'Kernig', n: 'Kernig negativo', a: ['Kernig positivo'], j: ', ', pri: 10 },
          { id: 'brudz', l: 'Brudzinski', n: 'Brudzinski negativo', a: ['Brudzinski positivo'], j: ', ', pri: 10 }
        ]
      },
      {
        id: 'dev', h: 'Dispositivos y drenajes', off: true, f: [
          { id: 'dev', k: 'dev' },
          { id: 'her', l: 'Herida quirúrgica', n: 'Herida quirúrgica limpia y seca, sin signos de flogosis', a: ['Herida con eritema perilesional', 'Herida con secreción serosa', 'Herida con secreción purulenta', 'Dehiscencia de herida', 'Fístula de LCR por herida', 'Exposición de material'], d: 'localización', ne: 'Herida no evaluada', pri: 11 }
        ]
      },
      {
        id: 'lab', h: 'Laboratorio y hemocultivos', off: true, f: [
          { id: 'lab', k: 'lab' },
          { id: 'hemoc', l: 'Hemocultivos', n: 'Hemocultivos negativos', a: ['Hemocultivos positivos', 'Hemocultivos pendientes'], one: true, d: 'germen (p. ej. para S. aureus)', pri: 12 }
        ]
      },
      {
        id: 'lcr', h: 'Líquido cefalorraquídeo', off: true, f: [
          { id: 'pl', l: 'Obtención de la muestra', a: ['Se realizó punción lumbar', 'Se tomó muestra de LCR de la DVE', 'Se tomó muestra de LCR del reservorio'], one: true },
          { id: 'aspecto', l: 'Aspecto del LCR', n: 'LCR de aspecto cristal de roca', a: ['LCR turbio', 'LCR purulento', 'LCR xantocrómico', 'LCR hemorrágico', 'LCR opalescente'], one: true, pri: 12 },
          { id: 'papert', k: 'num', l: 'Presión de apertura', p: 'presión de apertura de {v} cmH₂O', u: 'cmH₂O', j: ', ' },
          { id: 'cel', k: 'num', l: 'Células', p: '{v} células/mm³', u: '/mm³', j: ', ' },
          { id: 'predom', l: 'Predominio celular', a: ['a predominio polimorfonuclear', 'a predominio linfocitario', 'a predominio mononuclear'], one: true, j: ' ' },
          { id: 'prot', k: 'num', l: 'Proteínas', p: 'proteinorraquia de {v} mg/dL', u: 'mg/dL', j: ', ' },
          { id: 'gluc', k: 'num', l: 'Glucosa', p: 'glucorraquia de {v} mg/dL', u: 'mg/dL', j: ', ' },
          { id: 'glucs', k: 'num', l: 'Glucemia simultánea', p: 'con glucemia simultánea de {v} mg/dL', u: 'mg/dL', j: ' ' },
          { id: 'lcrotro', k: 'text', l: 'Otros datos del LCR', p: '{v}', ph: 'Gram sin gérmenes, lactato 6 mmol/L' }
        ]
      },
      {
        id: 'micro', h: 'Microbiología', off: true, f: [
          { id: 'micro', k: 'text', l: 'Microbiología', p: '{v}', ph: 'Cultivo de LCR con desarrollo de S. epidermidis, sensibilidad pendiente' }
        ]
      },
      {
        id: 'img', h: 'Neuroimagen', off: true, f: [
          { id: 'img', k: 'text', l: 'Neuroimagen', p: '{v}', ph: 'RM de cerebro con realce leptomeníngeo difuso' }
        ]
      },
      {
        id: 'evol', h: 'Evolución', f: [
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Nueva punción lumbar a las 48 h. Ajuste antibiótico según antibiograma' }
        ]
      }
    ]
  },

  // ───────────────────────────── FICHA 19 — CEFALEA ─────────────────────────────
  {
    id: 'nx-cefalea',
    n: 'Cefalea',
    cat: 'Neurología · Patologías y situaciones neuroquirúrgicas',
    v: 1,
    d: 'Características, EVA, síntomas asociados, signos de alarma, examen neurológico y estudios',
    secs: [
      {
        id: 'gral', h: 'Estado general', f: [
          { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true },
          { id: 'conc', k: 'conc', j: ', ' }
        ]
      },
      {
        id: 'carac', h: 'Características', f: [
          { id: 'cef', l: 'Cefalea', n: 'Sin cefalea', a: [['Primera cefalea', 'Primer episodio de cefalea'], ['Cefalea habitual', 'Cefalea de características habituales'], ['Reciente comienzo', 'Cefalea de reciente comienzo']], one: true, nom: 'de la cefalea', pri: 9 },
          { id: 'inicio', l: 'Inicio', a: ['de inicio súbito', 'de inicio progresivo', 'de inicio insidioso'], one: true, j: ', ' },
          { id: 'tev', k: 'text', l: 'Tiempo de evolución', p: 'de {v} de evolución', ph: '48 h', j: ', ' },
          { id: 'loc', l: 'Localización', a: ['frontal', 'temporal', 'parietal', 'occipital', 'holocraneana', 'retroocular', 'periorbitaria', 'en vértex', 'nucal'], ap: 'de localización ', j: ', ' },
          { id: 'lat', l: 'Lateralidad', a: ['derecha', 'izquierda', 'bilateral', 'alternante'], one: true, j: ' ' },
          { id: 'irr', l: 'Irradiación', a: ['irradiación a región nucal', 'irradiación a región frontal', 'irradiación a región cervical', 'irradiación a hemicara derecha', 'irradiación a hemicara izquierda'], ap: 'con ', j: ', ' },
          { id: 'car', l: 'Carácter', a: ['opresivo', 'pulsátil', 'punzante', 'lancinante', 'urente'], ap: 'de carácter ', j: ', ' },
          { id: 'eva', k: 'scale', s: 'eva', j: ', ', nom: 'de la cefalea' },
          { id: 'dur', k: 'text', l: 'Duración', p: 'Episodios de {v} de duración', ph: '4 a 6 h' },
          { id: 'frec', k: 'text', l: 'Frecuencia', p: 'con una frecuencia de {v}', ph: '3 episodios por semana', j: ', ' },
          { id: 'desenc', l: 'Desencadenantes', n: 'Sin desencadenantes identificados', a: ['estrés', 'ayuno', 'privación de sueño', 'consumo de alcohol', 'estímulos lumínicos', 'menstruación'], ap: 'Desencadenada por ' },
          { id: 'alivio', l: 'Factores de alivio', n: 'sin factores de alivio identificados', a: ['analgésicos', 'reposo', 'decúbito', 'oscuridad', 'sueño'], ap: 'mejora con ', j: ', ' }
        ]
      },
      {
        id: 'alarma', h: 'Signos de alarma', f: [
          { id: 'thund', l: 'Cefalea en estallido (thunderclap)', n: 'Sin inicio en estallido', a: ['Cefalea en estallido (thunderclap)'], pri: 3 },
          { id: 'patron', l: 'Nuevo patrón', n: 'sin cambio en su patrón habitual de cefalea', a: ['cefalea de patrón nuevo o cambiante'], j: ', ', pri: 3 },
          { id: 'focal', l: 'Déficit focal', n: 'Sin déficit neurológico focal', a: ['Déficit neurológico focal'], d: 'descripción (p. ej. hemiparesia derecha)', nom: 'del déficit focal', pri: 3 },
          { id: 'sensorio', l: 'Alteración de conciencia', n: 'sin alteración de la conciencia', a: ['alteración del nivel de conciencia', 'síncope asociado'], j: ', ', pri: 1 },
          { id: 'fiebre', l: 'Fiebre', n: 'Afebril', a: ['Fiebre'], num: { l: 'Temperatura', u: '°C', p: 'de {v} °C' } },
          { id: 'inmuno', l: 'Inmunosupresión', n: 'Sin inmunosupresión conocida', a: ['Paciente inmunosuprimido'], d: 'causa (p. ej. por corticoterapia)' },
          { id: 'cancer', l: 'Cáncer conocido', n: 'sin antecedente oncológico', a: ['antecedente de neoplasia'], d: 'tipo', j: ', ' },
          { id: 'emb', l: 'Embarazo o puerperio', n: 'sin embarazo ni puerperio en curso', a: ['cursando embarazo', 'cursando puerperio'], one: true, d: 'semanas', j: ', ' },
          { id: 'trauma', l: 'Trauma', n: 'sin antecedente traumático', a: ['antecedente de traumatismo craneoencefálico reciente'], j: ', ' },
          { id: 'papil', l: 'Papiledema', n: 'Fondo de ojo sin papiledema', a: ['Papiledema derecho', 'Papiledema izquierdo'], ne: 'Fondo de ojo no evaluado', pri: 9 },
          { id: 'valsalva', l: 'Esfuerzo o Valsalva', n: 'Sin relación con el esfuerzo ni con maniobras de Valsalva', a: ['Cefalea desencadenada por esfuerzo', 'Cefalea desencadenada por maniobras de Valsalva', 'Cefalea desencadenada por la tos', 'Cefalea desencadenada por la actividad sexual'], pri: 9 },
          { id: 'posic', l: 'Cefalea posicional', n: 'sin componente posicional', a: ['cefalea que empeora en bipedestación y mejora en decúbito', 'cefalea que empeora en decúbito'], one: true, j: ', ', pri: 9 }
        ]
      },
      {
        id: 'asoc', h: 'Síntomas asociados', f: [
          { id: 'nyv', l: 'Náuseas y vómitos', n: 'Sin náuseas ni vómitos', a: ['Náuseas', 'Vómitos', 'Vómitos en chorro'], pri: 9 },
          { id: 'foto', l: 'Fotofobia y fonofobia', n: 'sin fotofobia ni fonofobia', a: ['fotofobia', 'fonofobia', 'osmofobia'], ap: 'con ', j: ', ' },
          { id: 'aura', l: 'Aura', n: 'Sin aura', a: ['Aura visual', 'Aura sensitiva', 'Aura del lenguaje', 'Aura motora'], d: 'descripción y duración' },
          { id: 'visual', l: 'Alteraciones visuales', n: 'Sin alteraciones visuales', a: ['Visión borrosa', 'Diplopía', 'Amaurosis fugaz', 'Escotomas', 'Disminución de la agudeza visual'] },
          { id: 'crisis', l: 'Crisis', n: 'Sin crisis', a: ['Crisis focal', 'Crisis tónico-clónica generalizada'], d: 'número, duración', pri: 3 }
        ]
      },
      {
        id: 'neuro', h: 'Examen neurológico', f: [
          { id: 'gcs', k: 'gcs' },
          { id: 'pupils', k: 'pupils' },
          { id: 'pc', l: 'Pares craneales', n: 'Pares craneales sin alteraciones', a: ['Paresia del III par derecho', 'Paresia del III par izquierdo', 'Paresia del VI par derecho', 'Paresia del VI par izquierdo', 'Paresia facial central derecha', 'Paresia facial central izquierda', 'Hemianopsia homónima derecha', 'Hemianopsia homónima izquierda'], d: 'detalle', pri: 3 },
          { id: 'mrc4', k: 'mrc4' },
          { id: 'sens', k: 'sens' },
          { id: 'coord', l: 'Coordinación', n: 'Sin signos cerebelosos', a: ['Dismetría derecha', 'Dismetría izquierda', 'Disdiadococinesia derecha', 'Disdiadococinesia izquierda', 'Ataxia de la marcha', 'Romberg positivo'], ne: 'Coordinación no evaluable' },
          { id: 'mening', l: 'Signos meníngeos', n: 'Sin signos meníngeos', a: ['Rigidez de nuca', 'Kernig positivo', 'Brudzinski positivo'], ne: 'Signos meníngeos no evaluables', pri: 10 }
        ]
      },
      {
        id: 'est', h: 'Estudios', off: true, f: [
          { id: 'tc', k: 'text', l: 'TC', p: 'TC de cerebro {v}', ph: 'sin evidencia de sangrado ni lesiones agudas' },
          { id: 'rm', k: 'text', l: 'RM', p: 'RM de cerebro {v}', ph: 'sin lesiones estructurales' },
          { id: 'angiotc', k: 'text', l: 'Angio-TC', p: 'Angio-TC de vasos intracraneales {v}', ph: 'sin evidencia de aneurismas ni malformaciones vasculares' },
          { id: 'angiorm', k: 'text', l: 'Angio-RM', p: 'Angio-RM {v}', ph: 'sin evidencia de trombosis venosa' },
          { id: 'pl', k: 'text', l: 'Punción lumbar', p: 'Punción lumbar con {v}', ph: 'LCR cristal de roca, presión de apertura 18 cmH₂O, sin xantocromía' },
          { id: 'otros', k: 'text', l: 'Otros estudios', p: '{v}', ph: 'Fondo de ojo por oftalmología sin papiledema' }
        ]
      },
      {
        id: 'evol', h: 'Evolución', f: [
          { id: 'analg', k: 'text', l: 'Analgesia recibida', p: 'Recibió {v}', ph: 'ketorolac 30 mg EV' },
          { id: 'evo', l: 'Evolución respecto del control previo', a: ['Sin cambios respecto de la evolución previa', 'Mejoría clínica respecto del control previo', 'Empeoramiento clínico respecto del control previo'], one: true }
        ]
      },
      {
        id: 'plan', h: 'Plan', off: true, f: [
          { id: 'plan', k: 'text', l: 'Plan', p: '{v}', ph: 'Analgesia por horario. Control de signos de alarma' }
        ]
      }
    ]
  }
];
