// Partes quirúrgicos · Bloque A — Cirugía general. Datos puros (ver docs/ESQUEMA_PLANTILLAS.md, sección 2).
// Convenciones:
// - En `if` sobre un campo opt, el valor es la etiqueta de la opción (o[0]). En yn, 'si' / 'no'.
// - Los campos citados en un paso con {id} tienen frases-fragmento pensadas para leerse dentro del paso.
export default [
  // ───────────────────────────── 1. Apendicectomía laparoscópica ─────────────────────────────
  {
    id: 'cg-apl',
    n: 'Apendicectomía laparoscópica',
    sp: 'Cirugía general',
    sub: 'Colorrectal',
    v: 1,
    ctx: 'Apendicitis aguda confirmada o sospechada. Abordaje laparoscópico habitual de tres puertos, con extracción de la pieza en bolsa.',
    lat: false,
    f: [
      { id: 'neumo', l: 'Neumoperitoneo', sec: 'B', k: 'opt', o: [
        ['Técnica abierta (Hasson)', 'con técnica abierta de Hasson'],
        ['Aguja de Veress', 'con aguja de Veress'],
        ['Trocar óptico', 'con trocar de acceso óptico']
      ] },
      { id: 'pneu', l: 'Presión de neumoperitoneo', sec: 'B', k: 'num', u: 'mmHg', p: 'Neumoperitoneo a {v} mmHg' },
      { id: 'puertos', l: 'Puertos', sec: 'B', k: 'opt', o: [
        ['3 puertos (umbilical, suprapúbico, FII)', 'Se colocan tres trocares, umbilical, suprapúbico y en fosa ilíaca izquierda'],
        ['3 puertos (umbilical, FII, hipogastrio)', 'Se colocan tres trocares, umbilical, en fosa ilíaca izquierda y en hipogastrio'],
        ['Puerto único umbilical', 'Se realiza abordaje por puerto único umbilical'],
        ['Puerto adicional', 'Se colocan trocares según disposición habitual y un trocar adicional en {d}']
      ], ph: 'localización del trocar adicional' },

      { id: 'estado', l: 'Estado del apéndice', sec: 'C', k: 'opt', req: 1, p: 'Se identifica apéndice cecal {v}', o: [
        ['Inflamado', 'inflamado'],
        ['Aspecto normal', 'de aspecto macroscópico normal'],
        ['Lesión de aspecto tumoral', 'con lesión de aspecto tumoral en {d}'],
        ['Apendicolito palpable', 'inflamado, con apendicolito palpable']
      ], ph: 'punta, cuerpo o base' },
      { id: 'grado', l: 'Grado de inflamación', sec: 'C', k: 'opt', if: ['estado', 'Inflamado'], o: [
        ['Congestivo', 'Apéndice congestivo y edematoso'],
        ['Flegmonoso', 'Apéndice flegmonoso, con exudado fibrinoso en su superficie'],
        ['Gangrenoso', 'Apéndice gangrenoso']
      ] },
      { id: 'posap', l: 'Posición anatómica', sec: 'C', k: 'opt', p: 'Apéndice en posición {v}', o: [
        ['Pelviana', 'pelviana'],
        ['Retrocecal', 'retrocecal'],
        ['Subcecal', 'subcecal'],
        ['Paracecal', 'paracecal'],
        ['Preileal', 'preileal'],
        ['Retroileal', 'retroileal'],
        ['Subhepática', 'subhepática']
      ] },
      { id: 'perf', l: 'Perforación', sec: 'C', k: 'opt', o: [
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
      { id: 'liq', l: 'Líquido libre', sec: 'C', k: 'opt', o: [
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
      { id: 'base', l: 'Base apendicular', sec: 'C', k: 'opt', req: 1, o: [
        ['Viable', 'Base apendicular viable'],
        ['Con compromiso inflamatorio', 'Base apendicular con compromiso inflamatorio'],
        ['Necrótica o perforada', 'Base apendicular necrótica'],
        ['Compromiso cecal', 'Compromiso inflamatorio de la pared cecal adyacente a la base']
      ] },

      { id: 'meso', l: 'Sección del mesoapéndice', sec: 'D', k: 'opt', o: [
        ['Bipolar', 'energía bipolar'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ultrasónico', 'bisturí ultrasónico'],
        ['Clips', 'clips y tijera'],
        ['Monopolar', 'electrocauterio monopolar']
      ] },
      { id: 'cbase', l: 'Cierre y sección de la base', sec: 'D', k: 'opt', req: 1, o: [
        ['Dos lazos preformados', 'dos lazos preformados proximales y uno distal'],
        ['Lazos preformados', 'lazos preformados'],
        ['Sutura mecánica lineal', 'sutura mecánica lineal endoscópica'],
        ['Sutura mecánica incluyendo ciego', 'sutura mecánica lineal endoscópica incluyendo un rodete de pared cecal'],
        ['Clips de polímero', 'clips de polímero con traba'],
        ['Ligadura intracorpórea', 'ligadura intracorpórea']
      ] },

      { id: 'carga', l: 'Carga de sutura mecánica', sec: 'E', k: 'text', if: ['cbase', 'Sutura mecánica lineal'], p: 'Se utiliza carga de {v}', ph: '45 mm, vascular' },

      { id: 'extr', l: 'Extracción de la pieza', sec: 'F', k: 'opt', o: [
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
      ] }
    ],
    pasos: [
      'Se accede a la cavidad peritoneal a nivel umbilical y se realiza neumoperitoneo {neumo}',
      'Se colocan los trocares accesorios bajo visión directa',
      'Se realiza exploración laparoscópica de la cavidad abdominal',
      'Se coloca al paciente en Trendelenburg con lateralización izquierda',
      'Se identifica el ciego y se siguen las tenias hasta la base apendicular',
      'Se liberan las adherencias periapendiculares',
      'Se realiza disección y sección del mesoapéndice con {meso}',
      'Se esqueletiza la base apendicular',
      'Se realiza cierre y sección de la base apendicular con {cbase}',
      'Se revisa el muñón apendicular y el lecho del mesoapéndice',
      'Se retiran los trocares bajo visión directa y se evacua el neumoperitoneo'
    ],
    ej: 'Se accede a la cavidad peritoneal a nivel umbilical con técnica abierta de Hasson y se realiza neumoperitoneo a 12 mmHg. Se colocan tres trocares, umbilical, suprapúbico y en fosa ilíaca izquierda. Se identifica apéndice cecal inflamado, flegmonoso, en posición retrocecal, sin evidencia de perforación ni necrosis, con líquido seropurulento en fosa ilíaca derecha. Se constata base apendicular viable. Se realiza disección y sección del mesoapéndice con energía bipolar, y cierre y sección de la base apendicular con dos lazos preformados proximales y uno distal. Se extrae la pieza en bolsa de extracción a través del puerto umbilical y se envía a Anatomía Patológica. Se realiza lavado y aspiración de fosa ilíaca derecha. No se coloca drenaje. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 2. Apendicectomía convencional ─────────────────────────────
  {
    id: 'cg-apc',
    n: 'Apendicectomía convencional',
    sp: 'Cirugía general',
    sub: 'Colorrectal',
    v: 1,
    ctx: 'Apendicitis aguda cuando no se dispone de laparoscopia, está contraindicada o se convierte. Abordaje habitual por incisión en fosa ilíaca derecha.',
    lat: false,
    f: [
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', req: 1, o: [
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
      { id: 'estado', l: 'Estado del apéndice', sec: 'C', k: 'opt', req: 1, p: 'Apéndice cecal {v}', o: [
        ['Inflamado', 'inflamado'],
        ['Aspecto normal', 'de aspecto macroscópico normal'],
        ['Lesión de aspecto tumoral', 'con lesión de aspecto tumoral en {d}'],
        ['Apendicolito palpable', 'inflamado, con apendicolito palpable']
      ], ph: 'punta, cuerpo o base' },
      { id: 'grado', l: 'Grado de inflamación', sec: 'C', k: 'opt', if: ['estado', 'Inflamado'], o: [
        ['Congestivo', 'Apéndice congestivo y edematoso'],
        ['Flegmonoso', 'Apéndice flegmonoso, con exudado fibrinoso en su superficie'],
        ['Gangrenoso', 'Apéndice gangrenoso']
      ] },
      { id: 'posap', l: 'Posición anatómica', sec: 'C', k: 'opt', p: 'Apéndice en posición {v}', o: [
        ['Pelviana', 'pelviana'],
        ['Retrocecal', 'retrocecal'],
        ['Subcecal', 'subcecal'],
        ['Paracecal', 'paracecal'],
        ['Preileal', 'preileal'],
        ['Retroileal', 'retroileal'],
        ['Subhepática', 'subhepática']
      ] },
      { id: 'perf', l: 'Perforación', sec: 'C', k: 'opt', o: [
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
      { id: 'liq', l: 'Líquido libre', sec: 'C', k: 'opt', o: [
        ['Sin líquido libre', 'Sin líquido libre en cavidad'],
        ['Seroso', 'Líquido seroso en fosa ilíaca derecha'],
        ['Seropurulento', 'Líquido seropurulento en fosa ilíaca derecha'],
        ['Purulento', 'Líquido purulento en fosa ilíaca derecha'],
        ['Fecaloideo', 'Líquido de aspecto fecaloideo']
      ] },
      { id: 'colec', l: 'Colección', sec: 'C', k: 'opt', o: [
        ['Sin colección', 'Sin colecciones organizadas'],
        ['Absceso periapendicular', 'Absceso periapendicular'],
        ['Absceso pelviano', 'Absceso en fondo de saco de Douglas']
      ] },
      { id: 'base', l: 'Base apendicular', sec: 'C', k: 'opt', req: 1, o: [
        ['Viable', 'Base apendicular viable'],
        ['Con compromiso inflamatorio', 'Base apendicular con compromiso inflamatorio'],
        ['Necrótica o perforada', 'Base apendicular necrótica'],
        ['Compromiso cecal', 'Compromiso inflamatorio de la pared cecal adyacente a la base']
      ] },

      { id: 'meso', l: 'Sección del mesoapéndice', sec: 'D', k: 'opt', o: [
        ['Ligaduras sucesivas', 'ligaduras sucesivas'],
        ['Electrocauterio', 'electrocauterio'],
        ['Sellador de vasos', 'dispositivo de sellado vascular']
      ] },
      { id: 'lig', l: 'Ligadura de la base', sec: 'D', k: 'opt', req: 1, o: [
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
      { id: 'csut', l: 'Material de sutura de la pared', sec: 'G', k: 'text', p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'poliglactina 0' }
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
    ej: 'Se realiza incisión oblicua de McBurney en fosa ilíaca derecha. Se accede a la cavidad peritoneal mediante divulsión de los músculos oblicuo menor y transverso y apertura del peritoneo. Se exterioriza el ciego con el apéndice a través de la incisión, que se encuentra inflamado, gangrenoso, en posición pelviana, sin evidencia de perforación, con líquido seropurulento en fosa ilíaca derecha y base apendicular viable. Se realiza sección del mesoapéndice con ligaduras sucesivas y aplastamiento y ligadura de la base apendicular con doble ligadura con material reabsorbible, y se invagina el muñón mediante jareta seromuscular. Se envía la pieza a Anatomía Patológica. Se realiza aspiración del contenido, sin lavado. Se realiza cierre de la pared abdominal por planos, peritoneo, plano muscular y aponeurosis del oblicuo mayor. No se coloca drenaje. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 3. Colecistectomía laparoscópica ─────────────────────────────
  {
    id: 'cg-cvl',
    n: 'Colecistectomía laparoscópica',
    sp: 'Cirugía general',
    sub: 'Hepatobiliopancreática',
    v: 1,
    ctx: 'Litiasis vesicular sintomática, colecistitis aguda, pólipo vesicular o colecistectomía diferida tras pancreatitis o coledocolitiasis. La visión crítica de seguridad solo se afirma si fue documentada.',
    lat: false,
    f: [
      { id: 'neumo', l: 'Neumoperitoneo', sec: 'B', k: 'opt', o: [
        ['Técnica abierta (Hasson)', 'con técnica abierta de Hasson'],
        ['Aguja de Veress', 'con aguja de Veress'],
        ['Trocar óptico', 'con trocar de acceso óptico']
      ] },
      { id: 'pneu', l: 'Presión de neumoperitoneo', sec: 'B', k: 'num', u: 'mmHg', p: 'Neumoperitoneo a {v} mmHg' },
      { id: 'puertos', l: 'Puertos', sec: 'B', k: 'opt', o: [
        ['4 puertos (técnica americana)', 'Se colocan cuatro trocares según técnica americana'],
        ['4 puertos (técnica francesa)', 'Se colocan cuatro trocares según técnica francesa'],
        ['3 puertos', 'Se colocan tres trocares'],
        ['Trocar adicional', 'Se colocan cuatro trocares y un trocar adicional en {d}']
      ], ph: 'localización del trocar adicional' },

      { id: 'asp', l: 'Aspecto de la vesícula', sec: 'C', k: 'opt', o: [
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
      { id: 'infl', l: 'Inflamación', sec: 'C', k: 'opt', req: 1, o: [
        ['Sin inflamación aguda', 'Sin signos de inflamación aguda'],
        ['Edematosa', 'Con signos de inflamación aguda y edema parietal'],
        ['Con necrosis parietal', 'Con signos de inflamación aguda y áreas de necrosis parietal'],
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
      { id: 'anat', l: 'Anatomía biliar identificada', sec: 'C', k: 'multi', p: 'Se identifican {v}', o: [
        ['Conducto cístico', 'conducto cístico'],
        ['Arteria cística', 'arteria cística'],
        ['Vía biliar principal', 'vía biliar principal'],
        ['Arteria hepática derecha', 'arteria hepática derecha'],
        ['Surco de Rouvière', 'surco de Rouvière'],
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
      { id: 'cvs', l: 'Visión crítica de seguridad', sec: 'C', k: 'opt', req: 1, o: [
        ['Obtenida', 'Se constata visión crítica de seguridad, con triángulo hepatocístico libre de grasa y tejido fibroso, tercio inferior del lecho vesicular expuesto y solo dos estructuras ingresando a la vesícula'],
        ['Obtenida y fotodocumentada', 'Se constata visión crítica de seguridad, con triángulo hepatocístico libre de grasa y tejido fibroso, tercio inferior del lecho vesicular expuesto y solo dos estructuras ingresando a la vesícula, con registro fotográfico'],
        ['No obtenida', 'No se obtiene visión crítica de seguridad']
      ] },

      { id: 'bail', l: 'Estrategia ante visión crítica no obtenida', sec: 'D', k: 'opt', if: ['cvs', 'No obtenida'], o: [
        ['Subtotal fenestrada', 'Se realiza colecistectomía subtotal fenestrada'],
        ['Subtotal reconstituyente', 'Se realiza colecistectomía subtotal reconstituyente'],
        ['Fundus primero', 'Se realiza disección anterógrada desde el fondo vesicular'],
        ['Colangiografía para definir anatomía', 'Se realiza colangiografía intraoperatoria para definir la anatomía biliar'],
        ['Colecistostomía', 'Se realiza colecistostomía']
      ] },
      { id: 'art', l: 'Tratamiento de la arteria cística', sec: 'D', k: 'opt', req: 1, o: [
        ['Clips metálicos', 'clips metálicos'],
        ['Clips de polímero', 'clips de polímero con traba'],
        ['Energía bipolar', 'energía bipolar'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ultrasónico', 'bisturí ultrasónico']
      ] },
      { id: 'cist', l: 'Tratamiento del conducto cístico', sec: 'D', k: 'opt', req: 1, o: [
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
      { id: 'colan', l: 'Colangiografía intraoperatoria', sec: 'D', k: 'yn', y: 'Se realiza colangiografía intraoperatoria a través del conducto cístico', n: 'No se realiza colangiografía intraoperatoria' },
      { id: 'colres', l: 'Resultado de la colangiografía', sec: 'D', k: 'multi', if: ['colan', 'si'], p: 'Colangiografía con {v}', o: [
        ['Calibre conservado', 'vía biliar de calibre conservado'],
        ['Vía biliar dilatada', 'dilatación de la vía biliar'],
        ['Sin defectos de relleno', 'ausencia de defectos de relleno'],
        ['Defecto de relleno', 'defecto de relleno en {d}'],
        ['Pasaje a duodeno', 'pasaje de contraste al duodeno'],
        ['Sin pasaje a duodeno', 'ausencia de pasaje de contraste al duodeno'],
        ['Extravasación', 'extravasación de contraste']
      ], ph: 'localización del defecto' },

      { id: 'extr', l: 'Extracción de la vesícula', sec: 'F', k: 'opt', o: [
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
        ['Pólipo', 'lesión polipoidea de la mucosa']
      ] }
    ],
    pasos: [
      'Se accede a la cavidad peritoneal a nivel umbilical y se realiza neumoperitoneo {neumo}',
      'Se colocan los trocares accesorios bajo visión directa',
      'Se realiza exploración laparoscópica de la cavidad abdominal',
      'Se coloca al paciente en anti-Trendelenburg con lateralización izquierda',
      'Se tracciona el fondo vesicular en sentido cefálico y el bacinete en sentido lateral',
      'Se liberan las adherencias perivesiculares',
      'Se realiza disección del triángulo hepatocístico con apertura del peritoneo en sus caras anterior y posterior',
      'Se realiza cierre y sección de la arteria cística con {art}',
      'Se realiza cierre y sección del conducto cístico con {cist}',
      'Se realiza disección de la vesícula de su lecho hepático con {lecho}',
      'Se revisa el lecho hepático y la posición de los clips',
      'Se retiran los trocares bajo visión directa y se evacua el neumoperitoneo'
    ],
    ej: 'Se accede a la cavidad peritoneal a nivel umbilical con técnica abierta de Hasson y se realiza neumoperitoneo a 12 mmHg. Se colocan cuatro trocares según técnica americana. Vesícula de paredes engrosadas, distendida, con signos de inflamación aguda y edema parietal y adherencias laxas de epiplón mayor. Se realiza disección del triángulo hepatocístico y se constata visión crítica de seguridad, con triángulo hepatocístico libre de grasa y tejido fibroso, tercio inferior del lecho vesicular expuesto y solo dos estructuras ingresando a la vesícula, con registro fotográfico. Se realiza cierre y sección de la arteria cística y del conducto cístico con clips de polímero con traba, y disección de la vesícula de su lecho hepático con gancho monopolar. No se realiza colangiografía intraoperatoria. Se extrae la vesícula en bolsa de extracción a través del puerto umbilical y se envía a Anatomía Patológica. No se coloca drenaje. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 4. Hernioplastia inguinal ─────────────────────────────
  {
    id: 'cg-hing',
    n: 'Hernioplastia inguinal',
    sp: 'Cirugía general',
    sub: 'Pared abdominal',
    v: 1,
    ctx: 'Hernia inguinal o femoral sintomática, primaria o recidivada, programada o de urgencia por incarceración o estrangulación. Abordaje abierto anterior o laparoscópico (TAPP o TEP).',
    lat: true,
    f: [
      { id: 'recid', l: 'Primaria o recidivada', sec: 'B', k: 'opt', req: 1, o: [
        ['Primaria', 'Hernia primaria'],
        ['Recidivada', 'Hernia recidivada'],
        ['Recidivada tras reparación con malla', 'Hernia recidivada tras reparación protésica previa'],
        ['Re-recidivada', 'Hernia con múltiples recidivas previas']
      ] },
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', req: 1, o: [
        ['Abierto anterior', 'Se realiza abordaje abierto anterior por incisión inguinal'],
        ['TAPP', 'Se realiza abordaje laparoscópico transabdominal preperitoneal (TAPP)'],
        ['TEP', 'Se realiza abordaje laparoscópico totalmente extraperitoneal (TEP)'],
        ['Abierto preperitoneal', 'Se realiza abordaje abierto preperitoneal']
      ] },

      { id: 'tipo', l: 'Tipo de hernia', sec: 'C', k: 'opt', req: 1, o: [
        ['Indirecta', 'Hernia inguinal indirecta'],
        ['Directa', 'Hernia inguinal directa'],
        ['Mixta (en pantalón)', 'Hernia inguinal mixta, directa e indirecta (en pantalón)'],
        ['Femoral', 'Hernia femoral'],
        ['Inguinoescrotal', 'Hernia inguinoescrotal'],
        ['Obturatriz', 'Hernia obturatriz']
      ] },
      { id: 'ehs', l: 'Clasificación EHS', sec: 'C', k: 'text', p: 'Clasificación EHS {v}', ph: 'P L2' },
      { id: 'cont', l: 'Contenido del saco', sec: 'C', k: 'multi', o: [
        ['Saco vacío', 'Saco herniario vacío'],
        ['Epiplón', 'Saco con contenido epiploico'],
        ['Intestino delgado', 'Saco con contenido de intestino delgado'],
        ['Colon', 'Saco con contenido de colon'],
        ['Deslizamiento vesical', 'Hernia por deslizamiento con componente vesical'],
        ['Deslizamiento colónico', 'Hernia por deslizamiento con componente colónico'],
        ['Lipoma del cordón', 'Lipoma del cordón asociado']
      ] },
      { id: 'viab', l: 'Viabilidad del contenido', sec: 'C', k: 'opt', o: [
        ['Viable', 'Contenido herniario viable'],
        ['Isquemia reversible', 'Contenido herniario con signos de isquemia que revierten tras la reducción'],
        ['Necrosis', 'Contenido herniario con necrosis']
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
        ['Reducción laparoscópica', 'Se reduce el saco herniario por tracción desde el espacio preperitoneal'],
        ['Apertura y revisión', 'Se abre el saco herniario y se revisa su contenido']
      ] },
      { id: 'nerv', l: 'Nervios inguinales', sec: 'D', k: 'multi', o: [
        ['Ilioinguinal preservado', 'Se identifica y preserva el nervio ilioinguinal'],
        ['Iliohipogástrico preservado', 'Se identifica y preserva el nervio iliohipogástrico'],
        ['Rama genital preservada', 'Se identifica y preserva la rama genital del nervio genitofemoral'],
        ['Neurectomía ilioinguinal', 'Se realiza neurectomía del nervio ilioinguinal'],
        ['No identificados', 'No se identifican los nervios inguinales']
      ] },
      { id: 'rep', l: 'Reparación de pared', sec: 'D', k: 'opt', req: 1, o: [
        ['Lichtenstein', 'Se realiza reparación según técnica de Lichtenstein'],
        ['Tapón y malla', 'Se realiza reparación con tapón y malla'],
        ['Preperitoneal laparoscópica', 'Se realiza reparación con malla en el espacio preperitoneal, cubriendo el orificio miopectíneo'],
        ['Shouldice', 'Se realiza herniorrafia según técnica de Shouldice'],
        ['Bassini', 'Se realiza herniorrafia según técnica de Bassini'],
        ['McVay', 'Se realiza herniorrafia según técnica de McVay al ligamento de Cooper'],
        ['Femoral', 'Se realiza cierre del orificio femoral']
      ] },
      { id: 'malla', l: 'Malla', sec: 'E', k: 'yn', y: 'Se utiliza malla', n: 'No se utiliza malla' },
      { id: 'mtipo', l: 'Tipo de malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Polipropileno', 'Malla de polipropileno'],
        ['Polipropileno liviana', 'Malla de polipropileno de bajo peso'],
        ['Autoadhesiva', 'Malla autoadhesiva'],
        ['Anatómica 3D', 'Malla anatómica tridimensional'],
        ['Poliéster', 'Malla de poliéster']
      ] },
      { id: 'mtam', l: 'Tamaño de la malla', sec: 'E', k: 'text', if: ['malla', 'si'], p: 'La malla mide {v}', ph: '10 × 15 cm' },
      { id: 'fij', l: 'Fijación de la malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Sutura continua', 'Se fija la malla con sutura continua al ligamento inguinal y puntos al tendón conjunto'],
        ['Puntos separados', 'Se fija la malla con puntos separados'],
        ['Grapas helicoidales', 'Se fija la malla con grapas helicoidales'],
        ['Grapas reabsorbibles', 'Se fija la malla con grapas reabsorbibles'],
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
      'Se realiza incisión inguinal y apertura del tejido celular subcutáneo',
      'Se realiza apertura de la aponeurosis del oblicuo mayor hasta el anillo inguinal superficial',
      'Se realiza disección y reparo del cordón espermático',
      'Se realiza apertura del cremáster y disección del saco herniario',
      'Se reseca el lipoma del cordón',
      'Se explora el piso inguinal y el orificio femoral'
    ],
    ej: 'Se realiza abordaje abierto anterior por incisión inguinal derecha. Se realiza apertura de la aponeurosis del oblicuo mayor y disección y reparo del cordón espermático. Hernia primaria, inguinal indirecta, con saco con contenido epiploico viable. Se diseca el saco herniario y se invierte al espacio preperitoneal. Se identifica y preserva el nervio ilioinguinal. Se realiza reparación según técnica de Lichtenstein con malla de polipropileno de bajo peso, que se fija con sutura continua al ligamento inguinal y puntos al tendón conjunto. No se coloca drenaje. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 5. Hernioplastia umbilical o ventral ─────────────────────────────
  {
    id: 'cg-hven',
    n: 'Hernioplastia umbilical o ventral',
    sp: 'Cirugía general',
    sub: 'Pared abdominal',
    v: 1,
    ctx: 'Hernia umbilical, epigástrica, de Spiegel o eventración sintomática o complicada. Reparación abierta o laparoscópica, con o sin malla según el tamaño del defecto.',
    lat: false,
    f: [
      { id: 'via', l: 'Abordaje', sec: 'B', k: 'opt', o: [
        ['Abierto', 'Se realiza abordaje abierto'],
        ['Laparoscópico intraperitoneal', 'Se realiza abordaje laparoscópico intraperitoneal'],
        ['Endoscópico extraperitoneal (eTEP)', 'Se realiza abordaje endoscópico extraperitoneal (eTEP)']
      ] },

      { id: 'loc', l: 'Localización', sec: 'C', k: 'multi', req: 1, o: [
        ['Umbilical', 'Defecto herniario umbilical'],
        ['Periumbilical', 'Defecto herniario periumbilical'],
        ['Epigástrica', 'Defecto herniario epigástrico de línea media'],
        ['Eventración mediana', 'Eventración de línea media'],
        ['Eventración en sitio de trocar', 'Eventración en sitio de trocar previo'],
        ['Eventración subcostal', 'Eventración subcostal'],
        ['Spiegel', 'Hernia de Spiegel'],
        ['Lumbar', 'Hernia lumbar']
      ] },
      { id: 'tam', l: 'Tamaño del defecto', sec: 'C', k: 'text', p: 'Defecto aponeurótico de {v}', ph: '3 × 4 cm' },
      { id: 'cont', l: 'Contenido', sec: 'C', k: 'multi', o: [
        ['Saco vacío', 'Saco herniario vacío'],
        ['Grasa preperitoneal', 'Contenido de grasa preperitoneal'],
        ['Epiplón', 'Saco con contenido epiploico'],
        ['Intestino delgado', 'Saco con contenido de intestino delgado'],
        ['Colon', 'Saco con contenido de colon']
      ] },
      { id: 'viab', l: 'Viabilidad del contenido', sec: 'C', k: 'opt', o: [
        ['Viable', 'Contenido herniario viable'],
        ['Isquemia reversible', 'Contenido herniario con signos de isquemia que revierten tras la reducción'],
        ['Necrosis', 'Contenido herniario con necrosis']
      ] },
      { id: 'adh', l: 'Adherencias', sec: 'C', k: 'opt', o: [
        ['Sin adherencias', 'Sin adherencias del contenido al saco'],
        ['Epiploparietales', 'Adherencias epiploparietales'],
        ['Intestinales firmes', 'Adherencias firmes de asas intestinales al saco']
      ] },

      { id: 'red', l: 'Reducción', sec: 'D', k: 'opt', o: [
        ['Reducible', 'Se reduce el contenido herniario a la cavidad abdominal'],
        ['Incarcerada, se reduce', 'Hernia incarcerada, se reduce el contenido a la cavidad abdominal'],
        ['Con ampliación del anillo', 'Se reduce el contenido herniario previa ampliación del anillo'],
        ['Resección del contenido', 'Se reseca el contenido epiploico no viable']
      ] },
      { id: 'fasc', l: 'Cierre fascial', sec: 'D', k: 'opt', o: [
        ['Sutura continua', 'Se realiza cierre del defecto aponeurótico con sutura continua'],
        ['Puntos separados', 'Se realiza cierre del defecto aponeurótico con puntos separados'],
        ['Imbricación (Mayo)', 'Se realiza cierre aponeurótico con imbricación según técnica de Mayo'],
        ['Separación de componentes anterior', 'Se realiza separación de componentes anterior y cierre de la línea media'],
        ['Liberación del transverso', 'Se realiza separación de componentes posterior con liberación del músculo transverso y cierre de la línea media'],
        ['Sin cierre (puenteo)', 'No se cierra el defecto aponeurótico, se realiza reparación en puente con malla'],
        ['Cierre laparoscópico', 'Se realiza cierre laparoscópico del defecto con sutura continua']
      ] },
      { id: 'fsut', l: 'Material de sutura fascial', sec: 'D', k: 'text', p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'polidioxanona 0' },
      { id: 'malla', l: 'Malla', sec: 'E', k: 'yn', y: 'Se utiliza malla', n: 'No se utiliza malla' },
      { id: 'mtipo', l: 'Tipo de malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Polipropileno', 'Malla de polipropileno'],
        ['Polipropileno liviana', 'Malla de polipropileno de bajo peso'],
        ['Con cara antiadherente', 'Malla con cara antiadherente apta para uso intraperitoneal'],
        ['Poliéster', 'Malla de poliéster'],
        ['Biosintética reabsorbible', 'Malla biosintética reabsorbible']
      ] },
      { id: 'mtam', l: 'Tamaño de la malla', sec: 'E', k: 'text', if: ['malla', 'si'], p: 'La malla mide {v}', ph: '15 × 15 cm' },
      { id: 'plano', l: 'Plano de colocación', sec: 'E', k: 'opt', if: ['malla', 'si'], p: 'Se coloca la malla {v}', o: [
        ['Onlay', 'en posición supraaponeurótica (onlay)'],
        ['Inlay', 'en posición intraaponeurótica (inlay)'],
        ['Retromuscular (sublay)', 'en posición retromuscular (sublay)'],
        ['Preperitoneal', 'en posición preperitoneal'],
        ['Intraperitoneal (IPOM)', 'en posición intraperitoneal (IPOM)']
      ] },
      { id: 'fij', l: 'Fijación de la malla', sec: 'E', k: 'opt', if: ['malla', 'si'], o: [
        ['Puntos transfixiantes', 'Se fija la malla con puntos transfixiantes'],
        ['Sutura continua al borde', 'Se fija la malla con sutura continua en su periferia'],
        ['Puntos separados', 'Se fija la malla con puntos separados'],
        ['Grapas helicoidales', 'Se fija la malla con grapas helicoidales en doble corona'],
        ['Adhesivo tisular', 'Se fija la malla con adhesivo tisular'],
        ['Sin fijación', 'No se fija la malla']
      ] },

      { id: 'omb', l: 'Ombligo', sec: 'G', k: 'opt', o: [
        ['Reconstrucción', 'Se reconstruye el ombligo con fijación de su base a la aponeurosis'],
        ['Onfalectomía', 'Se realiza onfalectomía']
      ] }
    ],
    pasos: [
      'Se realiza incisión cutánea y disección del tejido celular subcutáneo hasta el saco herniario',
      'Se diseca el saco herniario hasta su cuello y se delimitan los bordes del defecto aponeurótico',
      'Se abre el saco herniario y se revisa su contenido',
      'Se liberan las adherencias del contenido herniario',
      'Se reseca el excedente del saco herniario',
      'Se explora la línea media en busca de defectos asociados',
      'Se diseca el espacio para la colocación de la malla'
    ],
    ej: 'Se realiza abordaje abierto con incisión periumbilical. Defecto herniario umbilical, con defecto aponeurótico de 3 × 3 cm y saco con contenido epiploico viable. Se diseca el saco herniario hasta su cuello y se reduce el contenido a la cavidad abdominal. Se diseca el espacio preperitoneal y se coloca malla de polipropileno de bajo peso de 10 × 10 cm en posición preperitoneal, fijada con puntos separados. Se realiza cierre del defecto aponeurótico con puntos separados de polipropileno 0. Se reconstruye el ombligo con fijación de su base a la aponeurosis. No se coloca drenaje. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 6. Laparotomía exploradora ─────────────────────────────
  {
    id: 'cg-lap',
    n: 'Laparotomía exploradora',
    sp: 'Cirugía general',
    sub: 'Abdomen agudo y trauma',
    v: 1,
    ctx: 'Abdomen agudo, peritonitis, trauma abdominal con inestabilidad o signos de lesión visceral, o diagnóstico incierto que requiere exploración. Exploración sistemática por compartimentos.',
    lat: false,
    f: [
      { id: 'abord', l: 'Tipo de incisión', sec: 'B', k: 'opt', req: 1, o: [
        ['Mediana supra e infraumbilical', 'Se realiza laparotomía mediana supra e infraumbilical'],
        ['Mediana supraumbilical', 'Se realiza laparotomía mediana supraumbilical'],
        ['Mediana infraumbilical', 'Se realiza laparotomía mediana infraumbilical'],
        ['Subcostal derecha', 'Se realiza laparotomía subcostal derecha'],
        ['Subcostal bilateral', 'Se realiza laparotomía subcostal bilateral'],
        ['Transversa', 'Se realiza laparotomía transversa {d}'],
        ['Sobre laparotomía previa', 'Se realiza laparotomía sobre cicatriz previa {d}']
      ], ph: 'localización' },

      { id: 'liq', l: 'Líquido libre', sec: 'C', k: 'opt', o: [
        ['Sin líquido libre', 'Sin líquido libre en cavidad'],
        ['Seroso', 'Líquido libre seroso'],
        ['Serohemático', 'Líquido libre serohemático'],
        ['Hemoperitoneo', 'Hemoperitoneo'],
        ['Purulento', 'Líquido libre purulento'],
        ['Bilioso', 'Líquido libre bilioso'],
        ['Intestinal', 'Líquido libre de aspecto intestinal'],
        ['Fecaloideo', 'Líquido libre fecaloideo']
      ] },
      { id: 'liqvol', l: 'Volumen aspirado', sec: 'C', k: 'num', u: 'mL', p: 'Se aspiran aproximadamente {v} mL' },
      { id: 'sang', l: 'Sangrado', sec: 'C', k: 'opt', o: [
        ['Sin sangrado activo', 'Sin sangrado activo'],
        ['Sangrado activo', 'Sangrado activo con origen en {d}'],
        ['Coágulos sin sangrado activo', 'Coágulos en {d}, sin sangrado activo'],
        ['Hematoma retroperitoneal', 'Hematoma retroperitoneal en {d}']
      ], ph: 'origen o zona (p. ej. bazo, zona II derecha)' },
      { id: 'perf', l: 'Perforación', sec: 'C', k: 'opt', o: [
        ['Sin perforación', 'Sin evidencia de perforación de víscera hueca'],
        ['Gástrica', 'Perforación gástrica en {d}'],
        ['Duodenal', 'Perforación duodenal en {d}'],
        ['Intestino delgado', 'Perforación de intestino delgado en {d}'],
        ['Colónica', 'Perforación colónica en {d}'],
        ['Múltiples', 'Perforaciones múltiples en {d}']
      ], ph: 'localización y tamaño' },
      { id: 'isq', l: 'Isquemia', sec: 'C', k: 'opt', o: [
        ['Sin isquemia', 'Sin signos de isquemia intestinal'],
        ['Isquemia reversible', 'Isquemia intestinal que revierte tras la liberación, en {d}'],
        ['Necrosis segmentaria', 'Necrosis intestinal segmentaria en {d}'],
        ['Isquemia extensa', 'Isquemia intestinal extensa en {d}']
      ], ph: 'segmento y extensión' },
      { id: 'les', l: 'Lesiones viscerales', sec: 'C', k: 'multi', o: [
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
      { id: 'rsup', l: 'Compartimento supramesocolónico', sec: 'C', k: 'text', p: 'En el compartimento supramesocolónico se constata {v}', ph: 'hígado, vesícula, estómago, duodeno, bazo' },
      { id: 'rinf', l: 'Compartimento inframesocolónico', sec: 'C', k: 'text', p: 'En el compartimento inframesocolónico se constata {v}', ph: 'intestino delgado, colon' },
      { id: 'rpel', l: 'Pelvis', sec: 'C', k: 'text', p: 'En la pelvis se constata {v}', ph: 'útero y anexos, vejiga, recto' },
      { id: 'rret', l: 'Retroperitoneo', sec: 'C', k: 'text', p: 'En el retroperitoneo se constata {v}', ph: 'hematomas, colecciones' },

      { id: 'procs', l: 'Procedimientos realizados', sec: 'D', k: 'multi', p: 'Se realiza {v}', o: [
        ['Adhesiólisis', 'adhesiólisis'],
        ['Sección de brida', 'sección de brida'],
        ['Rafia de perforación', 'rafia de la perforación'],
        ['Parche de epiplón', 'cierre de la perforación con parche de epiplón'],
        ['Resección intestinal', 'resección intestinal'],
        ['Esplenectomía', 'esplenectomía'],
        ['Hepatorrafia', 'hepatorrafia'],
        ['Empaquetamiento perihepático', 'empaquetamiento perihepático'],
        ['Colecistectomía', 'colecistectomía'],
        ['Apendicectomía', 'apendicectomía'],
        ['Ligadura de vaso sangrante', 'ligadura del vaso sangrante'],
        ['Desbridamiento', 'desbridamiento de tejido necrótico'],
        ['Biopsia', 'toma de biopsia de {d}']
      ], ph: 'detalle' },
      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['No se realiza', 'No se realiza lavado de la cavidad'],
        ['Localizado', 'Se realiza lavado y aspiración de {d}'],
        ['Cuatro cuadrantes', 'Se realiza lavado y aspiración de los cuatro cuadrantes'],
        ['Cuatro cuadrantes y pelvis', 'Se realiza lavado y aspiración de los cuatro cuadrantes y la pelvis']
      ], ph: 'región' },
      { id: 'lavvol', l: 'Volumen de lavado', sec: 'G', k: 'num', u: 'mL', p: 'Se utilizan {v} mL de solución fisiológica para el lavado' },
      { id: 'cierre', l: 'Cierre abdominal', sec: 'G', k: 'opt', req: 1, o: [
        ['Continuo', 'Se realiza cierre aponeurótico con sutura continua'],
        ['Puntos pequeños', 'Se realiza cierre aponeurótico con técnica de puntos pequeños'],
        ['Puntos separados', 'Se realiza cierre aponeurótico con puntos separados'],
        ['Puntos totales de retención', 'Se realiza cierre con puntos totales de retención'],
        ['Abdomen abierto con presión negativa', 'Se deja abdomen abierto con sistema de terapia de presión negativa'],
        ['Abdomen abierto con bolsa', 'Se deja abdomen abierto con contención mediante bolsa plástica (bolsa de Bogotá)'],
        ['Cierre temporal de piel', 'Se realiza cierre temporal de la piel sin cierre aponeurótico']
      ] },
      { id: 'csut', l: 'Material de sutura aponeurótica', sec: 'G', k: 'text', p: 'Para el cierre aponeurótico se utiliza {v}', ph: 'polidioxanona 1 en lazo' }
    ],
    pasos: [
      'Se realiza apertura de la cavidad peritoneal por planos',
      'Se aspira el contenido líquido de la cavidad',
      'Se colocan separadores y se protegen los bordes de la herida',
      'Se explora el compartimento supramesocolónico, con revisión de hígado, vesícula, estómago, duodeno y bazo',
      'Se realiza maniobra de Kocher para exploración duodenal',
      'Se abre la transcavidad de los epiplones para exploración de la cara posterior gástrica y del páncreas',
      'Se explora el compartimento inframesocolónico, con revisión del intestino delgado desde el ángulo de Treitz hasta la válvula ileocecal',
      'Se revisa el marco colónico en toda su extensión',
      'Se explora la pelvis',
      'Se explora el retroperitoneo'
    ],
    ej: 'Se realiza laparotomía mediana supra e infraumbilical. Se constata líquido libre purulento, con aspiración de aproximadamente 800 mL, y perforación duodenal en cara anterior de la primera porción de 5 mm, sin sangrado activo ni signos de isquemia intestinal. Se explora el compartimento supramesocolónico y se revisa el intestino delgado desde el ángulo de Treitz hasta la válvula ileocecal y el marco colónico en toda su extensión. Se realiza cierre de la perforación con parche de epiplón. Se realiza lavado y aspiración de los cuatro cuadrantes y la pelvis con 6000 mL de solución fisiológica. Se coloca drenaje tubular en espacio subhepático. Se realiza cierre aponeurótico con técnica de puntos pequeños. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 7. Resección intestinal y anastomosis ─────────────────────────────
  {
    id: 'cg-rint',
    n: 'Resección intestinal y anastomosis',
    sp: 'Cirugía general',
    sub: 'Colorrectal',
    v: 1,
    ctx: 'Isquemia o necrosis intestinal, tumor, perforación, estenosis, vólvulo o lesión traumática de intestino delgado o colon. Anastomosis primaria, con o sin ostomía de protección, según las condiciones locales y generales.',
    lat: false,
    f: [
      { id: 'indic', l: 'Indicación', sec: 'C', k: 'opt', p: 'Se decide resección por {v}', o: [
        ['Isquemia', 'isquemia intestinal'],
        ['Necrosis', 'necrosis intestinal'],
        ['Lesión tumoral', 'lesión tumoral'],
        ['Perforación', 'perforación'],
        ['Estenosis', 'estenosis'],
        ['Vólvulo', 'vólvulo'],
        ['Invaginación', 'invaginación intestinal'],
        ['Divertículo de Meckel', 'divertículo de Meckel'],
        ['Lesión traumática', 'lesión traumática'],
        ['Fístula', 'fístula']
      ] },
      { id: 'viab', l: 'Viabilidad intestinal', sec: 'C', k: 'opt', req: 1, o: [
        ['Bordes viables', 'Se constatan bordes de resección viables, con coloración, peristalsis y pulso mesentérico conservados'],
        ['Viabilidad dudosa', 'Viabilidad dudosa de los bordes de resección'],
        ['Dudosa, se planifica reexploración', 'Viabilidad dudosa del intestino remanente, se planifica reexploración programada']
      ] },

      { id: 'seg', l: 'Segmento resecado', sec: 'D', k: 'opt', req: 1, o: [
        ['Yeyuno', 'segmento de yeyuno'],
        ['Íleon', 'segmento de íleon'],
        ['Íleon terminal y ciego', 'íleon terminal y ciego'],
        ['Colon derecho', 'colon derecho'],
        ['Colon derecho ampliado', 'colon derecho y transverso proximal'],
        ['Colon transverso', 'colon transverso'],
        ['Colon izquierdo', 'colon izquierdo'],
        ['Colon sigmoides', 'colon sigmoides'],
        ['Recto superior', 'colon sigmoides y recto superior'],
        ['Colon total', 'colon en su totalidad']
      ] },
      { id: 'tres', l: 'Tipo de resección', sec: 'D', k: 'opt', o: [
        ['Segmentaria', 'Resección segmentaria'],
        ['Oncológica', 'Resección oncológica con ligadura vascular en el origen y linfadenectomía regional'],
        ['En bloque con órgano adyacente', 'Resección en bloque con {d}']
      ], ph: 'órgano o estructura' },
      { id: 'mes', l: 'Sección del mesenterio', sec: 'D', k: 'opt', o: [
        ['Ligaduras sucesivas', 'ligaduras sucesivas'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ultrasónico', 'bisturí ultrasónico'],
        ['Ligadura del pedículo', 'ligadura y sección del pedículo vascular principal']
      ] },
      { id: 'secc', l: 'Método de sección intestinal', sec: 'D', k: 'opt', o: [
        ['Sutura mecánica lineal', 'sutura mecánica lineal cortante'],
        ['Entre pinzas', 'bisturí entre pinzas intestinales'],
        ['Electrobisturí entre pinzas', 'electrobisturí entre pinzas intestinales']
      ] },
      { id: 'anas', l: 'Anastomosis', sec: 'D', k: 'yn', y: 'Se realiza anastomosis primaria', n: 'No se realiza anastomosis' },
      { id: 'atipo', l: 'Tipo de anastomosis', sec: 'D', k: 'opt', if: ['anas', 'si'], o: [
        ['Enteroentérica', 'enteroentérica'],
        ['Ileocólica', 'ileocólica'],
        ['Colocólica', 'colocólica'],
        ['Colorrectal', 'colorrectal'],
        ['Ileorrectal', 'ileorrectal']
      ] },
      { id: 'conf', l: 'Configuración', sec: 'D', k: 'opt', if: ['anas', 'si'], o: [
        ['Término-terminal', 'término-terminal'],
        ['Latero-lateral', 'latero-lateral'],
        ['Término-lateral', 'término-lateral'],
        ['Látero-terminal', 'látero-terminal']
      ] },
      { id: 'tec', l: 'Técnica', sec: 'D', k: 'opt', if: ['anas', 'si'], o: [
        ['Manual en un plano', 'manual en un plano'],
        ['Manual en dos planos', 'manual en dos planos'],
        ['Mecánica lineal', 'mecánica con sutura lineal y cierre manual de la boca de enterotomía'],
        ['Mecánica lineal total', 'mecánica con sutura lineal y cierre mecánico de la boca de enterotomía'],
        ['Mecánica circular', 'mecánica con sutura circular']
      ] },
      { id: 'estanq', l: 'Prueba de estanqueidad', sec: 'D', k: 'opt', if: ['anas', 'si'], o: [
        ['No realizada', 'No se realiza prueba de estanqueidad'],
        ['Neumática sin fuga', 'Se realiza prueba neumática de estanqueidad, sin evidencia de fuga'],
        ['Con colorante sin fuga', 'Se realiza prueba de estanqueidad con colorante, sin evidencia de fuga'],
        ['Fuga reparada', 'Se realiza prueba de estanqueidad con evidencia de fuga, que se repara con puntos de refuerzo']
      ] },
      { id: 'brecha', l: 'Cierre de brecha mesentérica', sec: 'D', k: 'yn', y: 'Se realiza cierre de la brecha mesentérica', n: 'No se cierra la brecha mesentérica' },
      { id: 'ost', l: 'Ostomía', sec: 'D', k: 'opt', o: [
        ['Sin ostomía', 'No se confecciona ostomía'],
        ['Ileostomía de protección', 'Se confecciona ileostomía en asa de protección'],
        ['Colostomía de protección', 'Se confecciona colostomía en asa de protección'],
        ['Hartmann', 'Se confecciona colostomía terminal con cierre del muñón rectal (operación de Hartmann)'],
        ['Cabos separados', 'Se exteriorizan ambos cabos como ostomías separadas']
      ] },

      { id: 'asut', l: 'Material de sutura de la anastomosis', sec: 'E', k: 'text', if: ['anas', 'si'], p: 'Para la anastomosis se utiliza {v}', ph: 'polidioxanona 3-0' },
      { id: 'cargas', l: 'Cargas de sutura mecánica', sec: 'E', k: 'text', p: 'Se utilizan cargas de sutura mecánica de {v}', ph: '2 × 60 mm, azul' },

      { id: 'long', l: 'Longitud de la pieza', sec: 'F', k: 'num', u: 'cm', p: 'Pieza de aproximadamente {v} cm de longitud' },
      { id: 'anillos', l: 'Anillos de sutura circular', sec: 'F', k: 'yn', if: ['tec', 'Mecánica circular'], y: 'Se constatan anillos de la sutura circular completos', n: 'Anillos de la sutura circular incompletos' },
      { id: 'orient', l: 'Orientación de la pieza', sec: 'F', k: 'text', p: 'Se orienta la pieza con {v}', ph: 'hilo largo en margen proximal' }
    ],
    pasos: [
      'Se realiza exploración de la cavidad abdominal',
      'Se exterioriza el segmento intestinal comprometido',
      'Se moviliza el segmento y su mesenterio',
      'Se identifican los vasos mesentéricos correspondientes al segmento',
      'Se definen los márgenes de resección',
      'Se realiza sección del mesenterio con {mes}',
      'Se realiza sección intestinal proximal y distal con {secc}',
      'Se realiza resección de {seg}',
      'Se realiza anastomosis {atipo} {conf}, {tec}',
      'Se refuerza la línea de sutura con puntos seromusculares',
      'Se recambian guantes e instrumental antes del cierre'
    ],
    ej: 'Se decide resección por necrosis intestinal. Se exterioriza el segmento intestinal comprometido y se definen los márgenes de resección. Se realiza sección del mesenterio con dispositivo de sellado vascular y sección intestinal proximal y distal con sutura mecánica lineal cortante, con resección de segmento de íleon de aproximadamente 40 cm de longitud. Se constatan bordes de resección viables, con coloración, peristalsis y pulso mesentérico conservados. Se realiza anastomosis enteroentérica latero-lateral, mecánica con sutura lineal y cierre manual de la boca de enterotomía, y se cierra la brecha mesentérica. No se confecciona ostomía. Se envía la pieza a Anatomía Patológica. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 8. Ostomía ─────────────────────────────
  {
    id: 'cg-ost',
    n: 'Ostomía',
    sp: 'Cirugía general',
    sub: 'Colorrectal',
    v: 1,
    ctx: 'Derivación intestinal terminal o en asa, de protección de una anastomosis, por obstrucción, perforación, sepsis pelviana o como parte de una resección. Se recomienda sitio marcado en el preoperatorio cuando es posible.',
    lat: false,
    f: [
      { id: 'marca', l: 'Marcación preoperatoria', sec: 'B', k: 'yn', y: 'Sitio de ostomía marcado en el preoperatorio', n: 'Sin marcación preoperatoria del sitio de ostomía' },

      { id: 'viab', l: 'Viabilidad', sec: 'C', k: 'opt', req: 1, o: [
        ['Viable', 'Cabo intestinal viable, de coloración rosada y con sangrado de los bordes'],
        ['Congestivo', 'Cabo intestinal con signos de congestión venosa'],
        ['Viabilidad dudosa', 'Cabo intestinal de viabilidad dudosa']
      ] },

      { id: 'tipo', l: 'Tipo de ostomía', sec: 'D', k: 'opt', req: 1, o: [
        ['Ileostomía terminal', 'ileostomía terminal'],
        ['Ileostomía en asa', 'ileostomía en asa'],
        ['Colostomía terminal', 'colostomía terminal'],
        ['Colostomía en asa', 'colostomía en asa'],
        ['Doble boca (cabos separados)', 'ostomía en doble boca con cabos separados'],
        ['Yeyunostomía', 'yeyunostomía terminal']
      ] },
      { id: 'seg', l: 'Segmento intestinal', sec: 'D', k: 'opt', req: 1, o: [
        ['Yeyuno proximal', 'del yeyuno proximal'],
        ['Íleon terminal', 'del íleon terminal'],
        ['Colon transverso', 'del colon transverso'],
        ['Colon descendente', 'del colon descendente'],
        ['Colon sigmoides', 'del colon sigmoides']
      ] },
      { id: 'loc', l: 'Localización', sec: 'D', k: 'opt', req: 1, o: [
        ['Fosa ilíaca derecha', 'fosa ilíaca derecha'],
        ['Fosa ilíaca izquierda', 'fosa ilíaca izquierda'],
        ['Hipocondrio derecho', 'hipocondrio derecho'],
        ['Hipocondrio izquierdo', 'hipocondrio izquierdo'],
        ['Flanco derecho', 'flanco derecho'],
        ['Flanco izquierdo', 'flanco izquierdo'],
        ['Por la herida', 'el extremo de la laparotomía']
      ] },
      { id: 'mad', l: 'Maduración', sec: 'D', k: 'opt', o: [
        ['Con eversión (Brooke)', 'Se realiza maduración primaria con eversión según técnica de Brooke y fijación mucocutánea con puntos separados'],
        ['Sin eversión', 'Se realiza maduración primaria con fijación mucocutánea sin eversión'],
        ['No madurada', 'No se realiza maduración primaria']
      ] },
      { id: 'varilla', l: 'Varilla de soporte (ostomía en asa)', sec: 'E', k: 'yn', y: 'Se coloca varilla de soporte bajo el asa', n: 'No se coloca varilla de soporte' },

      { id: 'prot', l: 'Protrusión', sec: 'G', k: 'num', u: 'cm', p: 'Ostomía con protrusión de {v} cm sobre el plano cutáneo' },
      { id: 'bolsa', l: 'Dispositivo colector', sec: 'G', k: 'yn', y: 'Se coloca dispositivo colector', n: 'No se coloca dispositivo colector' },

      { id: 'func', l: 'Funcionamiento inicial', sec: 'H', k: 'opt', o: [
        ['No observado', 'Funcionamiento de la ostomía no observado al finalizar'],
        ['Emisión de gases', 'Ostomía con emisión de gases al finalizar'],
        ['Débito intestinal', 'Ostomía con débito de contenido intestinal al finalizar']
      ] }
    ],
    pasos: [
      'Se moviliza el segmento intestinal para su exteriorización',
      'Se realiza trepanación de la pared abdominal en {loc}, con resección circular de piel y tejido celular subcutáneo',
      'Se realiza apertura cruciforme de la aponeurosis y divulsión del músculo recto',
      'Se exterioriza el cabo intestinal a través del orificio de la pared',
      'Se fija el intestino a la aponeurosis con puntos seromusculares',
      'Se completa el cierre de la laparotomía antes de la apertura de la ostomía',
      'Se confecciona {tipo} a expensas {seg}',
      'Se realiza apertura del cabo intestinal'
    ],
    ej: 'Sitio de ostomía marcado en el preoperatorio. Se moviliza el colon sigmoides para su exteriorización y se realiza trepanación de la pared abdominal en fosa ilíaca izquierda, con resección circular de piel y tejido celular subcutáneo, apertura cruciforme de la aponeurosis y divulsión del músculo recto. Se exterioriza el cabo intestinal y se fija a la aponeurosis con puntos seromusculares. Se completa el cierre de la laparotomía y se confecciona colostomía terminal a expensas del colon sigmoides. Cabo intestinal viable, de coloración rosada y con sangrado de los bordes. Se realiza maduración primaria con eversión según técnica de Brooke y fijación mucocutánea con puntos separados, con protrusión de 1 cm sobre el plano cutáneo. Se coloca dispositivo colector. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 9. Drenaje de absceso ─────────────────────────────
  {
    id: 'cg-abs',
    n: 'Drenaje de absceso',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    v: 1,
    ctx: 'Colección purulenta de partes blandas, perianal, pilonidal o intraabdominal que requiere evacuación. Drenaje abierto, percutáneo guiado por imágenes o quirúrgico según la localización.',
    lat: false,
    f: [
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', req: 1, o: [
        ['Incisión y drenaje', 'Se realiza incisión sobre la zona de mayor fluctuación'],
        ['Percutáneo ecoguiado', 'Se realiza drenaje percutáneo guiado por ecografía'],
        ['Percutáneo guiado por TC', 'Se realiza drenaje percutáneo guiado por tomografía computada'],
        ['Laparoscópico', 'Se realiza abordaje laparoscópico'],
        ['Laparotomía', 'Se realiza laparotomía {d}'],
        ['Transrectal', 'Se realiza drenaje por vía transrectal']
      ], ph: 'tipo de incisión' },

      { id: 'loc', l: 'Localización', sec: 'C', k: 'opt', req: 1, o: [
        ['Partes blandas', 'Absceso de partes blandas en {d}'],
        ['Pared abdominal', 'Absceso de pared abdominal en {d}'],
        ['Perianal', 'Absceso perianal {d}'],
        ['Isquiorrectal', 'Absceso isquiorrectal {d}'],
        ['Interesfinteriano', 'Absceso interesfinteriano'],
        ['Pilonidal', 'Absceso pilonidal sacrococcígeo'],
        ['Glúteo', 'Absceso glúteo {d}'],
        ['Axilar', 'Absceso axilar {d}'],
        ['Mamario', 'Absceso mamario {d}'],
        ['Intraabdominal', 'Absceso intraabdominal en {d}'],
        ['Pelviano', 'Absceso pelviano']
      ], ph: 'región y lado' },
      { id: 'car', l: 'Características de la colección', sec: 'C', k: 'multi', p: 'Colección de contenido {v}', o: [
        ['Purulento', 'purulento'],
        ['Seropurulento', 'seropurulento'],
        ['Hematopurulento', 'hematopurulento'],
        ['Fecaloideo', 'fecaloideo'],
        ['Fétido', 'de olor fétido'],
        ['Tabicada', 'con tabiques'],
        ['Con detritus', 'con detritus necróticos']
      ] },
      { id: 'necro', l: 'Tejido necrótico', sec: 'C', k: 'opt', o: [
        ['Sin necrosis', 'Sin tejido necrótico'],
        ['Necrosis del subcutáneo', 'Necrosis del tejido celular subcutáneo'],
        ['Compromiso fascial', 'Compromiso de la fascia subyacente']
      ] },
      { id: 'fist', l: 'Trayecto fistuloso', sec: 'C', k: 'opt', o: [
        ['No identificado', 'No se identifica trayecto fistuloso'],
        ['Identificado', 'Se identifica trayecto fistuloso {d}']
      ], ph: 'orificio interno, relación con el esfínter' },

      { id: 'vol', l: 'Cantidad drenada', sec: 'D', k: 'num', u: 'mL', p: 'Se drenan aproximadamente {v} mL' },

      { id: 'micro', l: 'Toma de muestras para microbiología', sec: 'F', k: 'multi', o: [
        ['Cultivo y antibiograma', 'Se toma muestra del contenido para cultivo y antibiograma'],
        ['Cultivo anaerobio', 'Se toma muestra para cultivo de gérmenes anaerobios'],
        ['Hongos', 'Se toma muestra para cultivo micológico'],
        ['Micobacterias', 'Se toma muestra para cultivo de micobacterias'],
        ['Hisopado', 'Se toma hisopado de la cavidad'],
        ['Tejido para cultivo', 'Se envía tejido de la pared de la cavidad para cultivo'],
        ['No se toman muestras', 'No se toman muestras para microbiología']
      ] },

      { id: 'irrig', l: 'Lavado', sec: 'G', k: 'opt', o: [
        ['No se realiza', 'No se realiza lavado de la cavidad'],
        ['Solución fisiológica', 'Se realiza lavado de la cavidad con solución fisiológica'],
        ['Solución antiséptica', 'Se realiza lavado de la cavidad con solución antiséptica diluida'],
        ['Por catéter', 'Se realiza lavado de la cavidad a través del catéter']
      ] },
      { id: 'herida', l: 'Manejo de la cavidad', sec: 'G', k: 'opt', o: [
        ['Abierta con taponaje', 'Se deja la cavidad abierta con taponaje de gasa'],
        ['Abierta sin taponaje', 'Se deja la cavidad abierta, sin taponaje'],
        ['Presión negativa', 'Se coloca sistema de terapia de presión negativa'],
        ['Setón', 'Se coloca setón laxo a través del trayecto fistuloso'],
        ['Catéter percutáneo', 'Se deja catéter de drenaje percutáneo fijado a la piel'],
        ['Cierre primario', 'Se realiza cierre primario']
      ] }
    ],
    pasos: [
      'Se identifica la zona de máxima fluctuación',
      'Se realiza punción exploradora de la colección',
      'Se realiza incisión sobre la colección y apertura de la cavidad',
      'Se evacua el contenido de la colección',
      'Se realiza exploración digital de la cavidad y ruptura de tabiques',
      'Se reseca el tejido desvitalizado',
      'Se realiza resección de un huso cutáneo de los bordes de la incisión'
    ],
    ej: 'Se realiza incisión sobre la zona de mayor fluctuación. Absceso perianal izquierdo, con colección de contenido purulento y de olor fétido, sin tejido necrótico. Se evacua el contenido de la colección, con drenaje de aproximadamente 30 mL, y se realiza exploración digital de la cavidad y ruptura de tabiques. No se identifica trayecto fistuloso. Se toma muestra del contenido para cultivo y antibiograma. Se realiza lavado de la cavidad con solución fisiológica y se deja abierta con taponaje de gasa. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 10. Tiroidectomía ─────────────────────────────
  {
    id: 'cg-tir',
    n: 'Tiroidectomía',
    sp: 'Cirugía general',
    sub: 'Endocrina',
    v: 1,
    ctx: 'Nódulo tiroideo con citología indeterminada, sospechosa o maligna, bocio compresivo o retroesternal, o hipertiroidismo con indicación quirúrgica. Hemitiroidectomía o tiroidectomía total según el caso.',
    lat: true,
    f: [
      { id: 'monit', l: 'Neuromonitorización', sec: 'B', k: 'yn', y: 'Se utiliza neuromonitorización del nervio laríngeo recurrente', n: 'No se utiliza neuromonitorización' },
      { id: 'nmtipo', l: 'Tipo de neuromonitorización', sec: 'B', k: 'opt', if: ['monit', 'si'], o: [
        ['Intermitente', 'Neuromonitorización intermitente'],
        ['Continua', 'Neuromonitorización continua con electrodo vagal']
      ] },

      { id: 'thall', l: 'Hallazgos tiroideos', sec: 'C', k: 'multi', o: [
        ['Glándula de aspecto normal', 'Glándula tiroides de tamaño y aspecto conservados'],
        ['Bocio multinodular', 'Glándula tiroides aumentada de tamaño, multinodular'],
        ['Nódulo único', 'Nódulo tiroideo único en {d}'],
        ['Extensión retroesternal', 'Bocio con extensión retroesternal'],
        ['Consistencia firme', 'Parénquima de consistencia aumentada'],
        ['Infiltración extratiroidea', 'Lesión con signos macroscópicos de infiltración de {d}'],
        ['Adenopatías centrales', 'Adenopatías en el compartimento central'],
        ['Lóbulo piramidal', 'Lóbulo piramidal presente']
      ], ph: 'lóbulo, polo o estructura' },

      { id: 'tipo', l: 'Procedimiento', sec: 'D', k: 'opt', req: 1, o: [
        ['Hemitiroidectomía', 'hemitiroidectomía con istmectomía'],
        ['Tiroidectomía total', 'tiroidectomía total'],
        ['Tiroidectomía casi total', 'tiroidectomía casi total'],
        ['Istmectomía', 'istmectomía'],
        ['Totalización', 'totalización de tiroidectomía']
      ] },
      { id: 'vasc', l: 'Tratamiento de los pedículos', sec: 'D', k: 'opt', o: [
        ['Ligaduras', 'ligaduras'],
        ['Sellador de vasos', 'dispositivo de sellado vascular'],
        ['Ultrasónico', 'bisturí ultrasónico'],
        ['Bipolar', 'energía bipolar']
      ] },
      { id: 'nerv', l: 'Estructuras identificadas', sec: 'D', k: 'multi', o: [
        ['Recurrente derecho', 'Se identifica y preserva el nervio laríngeo recurrente derecho'],
        ['Recurrente izquierdo', 'Se identifica y preserva el nervio laríngeo recurrente izquierdo'],
        ['Laríngeo superior derecho', 'Se identifica la rama externa del nervio laríngeo superior derecho'],
        ['Laríngeo superior izquierdo', 'Se identifica la rama externa del nervio laríngeo superior izquierdo'],
        ['Laríngeo no recurrente derecho', 'Se identifica nervio laríngeo no recurrente derecho'],
        ['Recurrente no identificado', 'No se identifica el nervio laríngeo recurrente {d}']
      ], ph: 'lado' },
      { id: 'para', l: 'Paratiroides', sec: 'D', k: 'multi', o: [
        ['Superior derecha', 'Se identifica y preserva la glándula paratiroides superior derecha'],
        ['Inferior derecha', 'Se identifica y preserva la glándula paratiroides inferior derecha'],
        ['Superior izquierda', 'Se identifica y preserva la glándula paratiroides superior izquierda'],
        ['Inferior izquierda', 'Se identifica y preserva la glándula paratiroides inferior izquierda'],
        ['Autotrasplante', 'Se realiza autotrasplante de tejido paratiroideo en el músculo esternocleidomastoideo'],
        ['No identificadas', 'No se identifican glándulas paratiroides {d}'],
        ['Paratiroides en la pieza', 'Se identifica glándula paratiroides en la pieza']
      ], ph: 'lado' },
      { id: 'nmres', l: 'Resultado de la neuromonitorización', sec: 'D', k: 'opt', if: ['monit', 'si'], o: [
        ['Señal conservada', 'Señal de neuromonitorización conservada al finalizar la disección'],
        ['Pérdida de señal', 'Pérdida de señal de neuromonitorización {d}'],
        ['Disminución de amplitud', 'Disminución de la amplitud de la señal de neuromonitorización {d}']
      ], ph: 'lado' }
    ],
    pasos: [
      'Se realiza incisión cervical transversa y sección del platisma',
      'Se tallan colgajos subplatismales superior e inferior',
      'Se realiza apertura de la línea media entre los músculos pretiroideos',
      'Se separan los músculos pretiroideos y se expone el lóbulo tiroideo',
      'Se realiza ligadura y sección de la vena tiroidea media con {vasc}',
      'Se diseca el polo superior y se secciona su pedículo con {vasc}, en contacto con la glándula',
      'Se diseca el surco traqueoesofágico',
      'Se secciona el ligamento de Berry',
      'Se realiza sección del istmo',
      'Se completa la {tipo}',
      'Se realiza maniobra de Valsalva para control de la hemostasia',
      'Se aproximan los músculos pretiroideos en la línea media'
    ],
    ej: 'Se utiliza neuromonitorización intermitente del nervio laríngeo recurrente. Se realiza incisión cervical transversa, sección del platisma y apertura de la línea media entre los músculos pretiroideos. Glándula tiroides aumentada de tamaño, multinodular. Se diseca el polo superior y se secciona su pedículo con dispositivo de sellado vascular, y se completa la tiroidectomía total. Se identifican y preservan ambos nervios laríngeos recurrentes y las glándulas paratiroides superiores e inferiores, con señal de neuromonitorización conservada al finalizar la disección. Se constata hemostasia tras maniobra de Valsalva. Se envía la pieza a Anatomía Patológica. Se coloca drenaje aspirativo en lecho tiroideo. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 11. Cirugía de mama ─────────────────────────────
  {
    id: 'cg-mama',
    n: 'Cirugía de mama',
    sp: 'Cirugía general',
    sub: 'Mama',
    v: 1,
    ctx: 'Lesión mamaria benigna o maligna, palpable o no palpable con marcación prequirúrgica. Cirugía conservadora o mastectomía, con o sin estadificación axilar.',
    lat: true,
    f: [
      { id: 'marc', l: 'Marcación de la lesión', sec: 'B', k: 'opt', o: [
        ['Palpable', 'Lesión palpable, sin marcación prequirúrgica'],
        ['Arpón', 'Lesión no palpable con marcación prequirúrgica con arpón'],
        ['Marcador localizador', 'Lesión no palpable con marcador localizador prequirúrgico'],
        ['Radioguiada (ROLL)', 'Lesión no palpable con marcación radioguiada (ROLL)'],
        ['Clip de marcación', 'Lesión marcada con clip, localizada por ecografía intraoperatoria']
      ] },
      { id: 'abord', l: 'Incisión', sec: 'B', k: 'opt', o: [
        ['Periareolar', 'Se realiza incisión periareolar'],
        ['Radiada', 'Se realiza incisión radiada sobre la lesión'],
        ['Arciforme', 'Se realiza incisión arciforme sobre la lesión'],
        ['Surco submamario', 'Se realiza incisión en el surco submamario'],
        ['Elíptica transversa (Stewart)', 'Se realiza incisión elíptica transversa de Stewart incluyendo el complejo areola-pezón'],
        ['Axilar', 'Se realiza incisión axilar'],
        ['Otra', 'Se realiza incisión {d}']
      ], ph: 'tipo y localización' },

      { id: 'loc', l: 'Localización de la lesión', sec: 'C', k: 'opt', p: 'Lesión localizada en {v}', o: [
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
      ] },
      { id: 'radio', l: 'Radio horario y distancia', sec: 'C', k: 'text', p: 'Lesión a hora {v}', ph: '10, a 3 cm del pezón' },

      { id: 'mproc', l: 'Procedimiento', sec: 'D', k: 'opt', req: 1, o: [
        ['Biopsia escisional', 'biopsia escisional'],
        ['Tumorectomía', 'tumorectomía'],
        ['Cuadrantectomía', 'cuadrantectomía'],
        ['Ampliación de márgenes', 'ampliación de márgenes'],
        ['Mastectomía simple', 'mastectomía simple total'],
        ['Mastectomía con conservación de piel', 'mastectomía con conservación de piel'],
        ['Mastectomía con conservación del CAP', 'mastectomía con conservación del complejo areola-pezón'],
        ['Mastectomía radical modificada', 'mastectomía radical modificada'],
        ['Solo procedimiento axilar', 'procedimiento axilar sin resección mamaria']
      ] },
      { id: 'tres', l: 'Extensión de la resección', sec: 'D', k: 'multi', p: 'La resección incluye {v}', o: [
        ['Piel suprayacente', 'piel suprayacente'],
        ['Fascia del pectoral mayor', 'fascia del músculo pectoral mayor'],
        ['Complejo areola-pezón', 'complejo areola-pezón'],
        ['Prolongación axilar', 'prolongación axilar'],
        ['Músculo pectoral', 'resección parcial del músculo pectoral mayor']
      ] },
      { id: 'gc', l: 'Ganglio centinela', sec: 'D', k: 'opt', o: [
        ['No se realiza', 'No se realiza biopsia de ganglio centinela'],
        ['Radiotrazador', 'Se realiza biopsia de ganglio centinela con radiotrazador'],
        ['Colorante', 'Se realiza biopsia de ganglio centinela con colorante azul'],
        ['Técnica combinada', 'Se realiza biopsia de ganglio centinela con técnica combinada de radiotrazador y colorante'],
        ['Verde de indocianina', 'Se realiza biopsia de ganglio centinela con verde de indocianina'],
        ['Sin migración', 'No se identifica ganglio centinela']
      ] },
      { id: 'gcn', l: 'Número de ganglios centinela', sec: 'D', k: 'num', p: 'Se extraen {v} ganglios centinela' },
      { id: 'gcint', l: 'Estudio intraoperatorio del ganglio', sec: 'D', k: 'opt', o: [
        ['No se envía', 'No se envía el ganglio centinela a estudio intraoperatorio'],
        ['Congelación', 'Se envía el ganglio centinela a estudio intraoperatorio por congelación']
      ] },
      { id: 'gcres', l: 'Resultado de la congelación', sec: 'D', k: 'text', if: ['gcint', 'Congelación'], p: 'Estudio por congelación informado como {v}', ph: 'negativo para metástasis' },
      { id: 'vac', l: 'Vaciamiento axilar', sec: 'D', k: 'opt', o: [
        ['No se realiza', 'No se realiza vaciamiento axilar'],
        ['Niveles I y II', 'Se realiza vaciamiento axilar de niveles I y II'],
        ['Niveles I a III', 'Se realiza vaciamiento axilar de niveles I a III']
      ] },
      { id: 'nerv', l: 'Estructuras axilares preservadas', sec: 'D', k: 'multi', o: [
        ['Vena axilar', 'Se identifica y preserva la vena axilar'],
        ['Nervio torácico largo', 'Se identifica y preserva el nervio torácico largo'],
        ['Nervio toracodorsal', 'Se identifica y preserva el pedículo toracodorsal'],
        ['Intercostobraquial preservado', 'Se preserva el nervio intercostobraquial'],
        ['Intercostobraquial seccionado', 'Se secciona el nervio intercostobraquial']
      ] },

      { id: 'marg', l: 'Márgenes y orientación de la pieza', sec: 'F', k: 'multi', o: [
        ['Orientada con hilos', 'Se orienta la pieza con hilos de reparo {d}'],
        ['Radiografía de pieza', 'Se realiza radiografía de la pieza, que incluye la lesión y el marcador'],
        ['Ecografía de pieza', 'Se realiza ecografía de la pieza, que incluye la lesión'],
        ['Congelación de márgenes', 'Se envían márgenes a estudio intraoperatorio por congelación'],
        ['Margen macroscópico libre', 'Margen macroscópico libre a la evaluación intraoperatoria'],
        ['Ampliación de margen', 'Se realiza ampliación del margen {d}'],
        ['Márgenes enviados por separado', 'Se envían los márgenes del lecho por separado, rotulados']
      ], ph: 'convención u orientación (p. ej. corto superior, largo lateral)' }
    ],
    pasos: [
      'Se localiza la lesión según la marcación prequirúrgica',
      'Se tallan colgajos cutáneos superior e inferior',
      'Se realiza resección de la lesión con margen macroscópico de tejido sano',
      'Se diseca la glándula mamaria de la fascia del músculo pectoral mayor',
      'Se marcan los bordes del lecho quirúrgico con clips',
      'Se realiza remodelación glandular con puntos de aproximación',
      'Se realiza incisión axilar y apertura de la fascia clavipectoral',
      'Se identifica el ganglio centinela mediante sonda gamma o tinción'
    ],
    ej: 'Se realiza incisión arciforme sobre la lesión de mama izquierda, no palpable, con marcación prequirúrgica con arpón, localizada en el cuadrante superoexterno a hora 2, a 4 cm del pezón. Se realiza tumorectomía con margen macroscópico de tejido sano, incluyendo la fascia del músculo pectoral mayor. Se orienta la pieza con hilos de reparo, corto superior y largo lateral, y se realiza radiografía de la pieza, que incluye la lesión y el marcador. Se marcan los bordes del lecho quirúrgico con clips y se realiza remodelación glandular. Se realiza biopsia de ganglio centinela con técnica combinada, con extracción de 2 ganglios centinela. No se realiza vaciamiento axilar. Se envía el material a Anatomía Patológica. No se coloca drenaje. No se registran complicaciones intraoperatorias.'
  },

  // ───────────────────────────── 12. Colocación de vía venosa central ─────────────────────────────
  {
    id: 'cg-vvc',
    n: 'Colocación de vía venosa central',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    v: 1,
    ctx: 'Necesidad de acceso venoso central para fármacos vasoactivos, nutrición parenteral, monitoreo hemodinámico, hemodiálisis o accesos periféricos insuficientes. Se recomienda guía ecográfica en tiempo real.',
    lat: true,
    f: [
      { id: 'sitio', l: 'Sitio de inserción', sec: 'B', k: 'opt', req: 1, o: [
        ['Yugular interna', 'yugular interna'],
        ['Subclavia', 'subclavia'],
        ['Axilar', 'axilar'],
        ['Femoral', 'femoral']
      ] },
      { id: 'eco', l: 'Guía ecográfica', sec: 'B', k: 'opt', o: [
        ['Tiempo real, eje corto', 'bajo guía ecográfica en tiempo real en eje corto'],
        ['Tiempo real, eje largo', 'bajo guía ecográfica en tiempo real en eje largo'],
        ['Marcación previa', 'con marcación ecográfica previa'],
        ['Reparos anatómicos', 'por reparos anatómicos']
      ] },

      { id: 'int', l: 'Número de intentos', sec: 'D', k: 'opt', o: [
        ['1', 'Acceso venoso al primer intento de punción'],
        ['2', 'Acceso venoso al segundo intento de punción'],
        ['3', 'Acceso venoso al tercer intento de punción'],
        ['Más de 3', 'Acceso venoso luego de más de tres intentos de punción'],
        ['Cambio de sitio', 'Se cambia de sitio de punción por imposibilidad de acceso {d}']
      ], ph: 'sitio inicial' },

      { id: 'cat', l: 'Tipo de catéter', sec: 'E', k: 'opt', req: 1, o: [
        ['CVC no tunelizado', 'venoso central no tunelizado'],
        ['Hemodiálisis no tunelizado', 'de hemodiálisis no tunelizado'],
        ['CVC tunelizado', 'venoso central tunelizado'],
        ['Introductor de alto flujo', 'introductor de alto flujo']
      ] },
      { id: 'lum', l: 'Número de lúmenes', sec: 'E', k: 'opt', o: [
        ['1', 'monolumen'],
        ['2', 'bilumen'],
        ['3', 'trilumen'],
        ['4', 'tetralumen'],
        ['5', 'pentalumen']
      ] },
      { id: 'calib', l: 'Calibre y longitud', sec: 'E', k: 'text', p: 'Catéter de {v}', ph: '7 Fr, 20 cm' },

      { id: 'conf', l: 'Confirmación de posición', sec: 'G', k: 'multi', req: 1, o: [
        ['Reflujo por todos los lúmenes', 'Se constata reflujo venoso por todos los lúmenes'],
        ['Guía en la vena por ecografía', 'Se visualiza la guía dentro de la vena por ecografía'],
        ['ECG intracavitario', 'Se confirma la posición del extremo por electrocardiograma intracavitario'],
        ['Ecografía con burbujas', 'Se confirma la posición por ecografía con prueba de burbujas'],
        ['Rx con punta en unión cavoatrial', 'Radiografía de tórax con extremo del catéter en la unión cavoatrial'],
        ['Rx sin neumotórax', 'Radiografía de tórax sin evidencia de neumotórax'],
        ['Rx pendiente', 'Se solicita radiografía de tórax de control']
      ] },
      { id: 'fijc', l: 'Fijación del catéter', sec: 'G', k: 'opt', o: [
        ['Puntos a piel', 'Se fija el catéter a la piel con puntos de sutura'],
        ['Dispositivo sin sutura', 'Se fija el catéter con dispositivo de fijación sin sutura'],
        ['Puntos y dispositivo', 'Se fija el catéter con puntos de sutura y dispositivo de fijación']
      ] },
      { id: 'marca', l: 'Marca en piel', sec: 'G', k: 'num', u: 'cm', p: 'Catéter fijado a {v} cm en piel' }
    ],
    pasos: [
      'Se realiza evaluación ecográfica de la vena y de las estructuras vecinas',
      'Se coloca al paciente en Trendelenburg',
      'Se realiza infiltración con anestésico local',
      'Se realiza punción de la vena {sitio} {eco}',
      'Se pasa la guía metálica a través de la aguja según técnica de Seldinger',
      'Se retira la aguja y se realiza dilatación del trayecto',
      'Se avanza el catéter {cat} {lum} sobre la guía',
      'Se retira la guía metálica',
      'Se aspira y lava cada lumen con solución fisiológica'
    ],
    ej: 'Se realiza evaluación ecográfica de la vena yugular interna derecha y se coloca al paciente en Trendelenburg. Se realiza infiltración con anestésico local y punción de la vena yugular interna bajo guía ecográfica en tiempo real en eje corto, con acceso venoso al primer intento de punción. Se pasa la guía metálica según técnica de Seldinger, se dilata el trayecto y se avanza el catéter venoso central no tunelizado trilumen de 7 Fr, 20 cm, sobre la guía. Se constata reflujo venoso por todos los lúmenes y se lavan con solución fisiológica. Se fija el catéter a la piel con puntos de sutura, a 15 cm en piel, y se realiza curación oclusiva. Se solicita radiografía de tórax de control. No se registran complicaciones durante el procedimiento.'
  },

  // ───────────────────────────── 13. Traqueostomía ─────────────────────────────
  {
    id: 'cg-traq',
    n: 'Traqueostomía',
    sp: 'Cirugía general',
    sub: 'Procedimientos',
    v: 1,
    ctx: 'Ventilación mecánica prolongada, destete dificultoso, obstrucción de la vía aérea superior o manejo de secreciones. Técnica abierta o percutánea por dilatación, idealmente con control broncoscópico.',
    lat: false,
    f: [
      { id: 'indic', l: 'Indicación', sec: 'B', k: 'opt', p: 'Se indica traqueostomía por {v}', o: [
        ['ARM prolongada', 'requerimiento de ventilación mecánica prolongada'],
        ['Destete dificultoso', 'destete dificultoso de la ventilación mecánica'],
        ['Obstrucción de vía aérea superior', 'obstrucción de la vía aérea superior'],
        ['Manejo de secreciones', 'manejo de secreciones'],
        ['Protección de la vía aérea', 'protección de la vía aérea'],
        ['Cirugía de cabeza y cuello', 'cirugía de cabeza y cuello']
      ] },
      { id: 'tec', l: 'Técnica', sec: 'B', k: 'opt', req: 1, o: [
        ['Abierta', 'Se realiza traqueostomía abierta'],
        ['Percutánea por dilatación progresiva', 'Se realiza traqueostomía percutánea con dilatadores progresivos'],
        ['Percutánea con dilatador único', 'Se realiza traqueostomía percutánea con dilatador único cónico'],
        ['Percutánea con pinza dilatadora', 'Se realiza traqueostomía percutánea con pinza dilatadora sobre guía']
      ] },
      { id: 'fbc', l: 'Control broncoscópico', sec: 'B', k: 'yn', y: 'Se realiza control broncoscópico durante el procedimiento', n: 'No se realiza control broncoscópico' },
      { id: 'ecoc', l: 'Ecografía cervical previa', sec: 'B', k: 'yn', y: 'Se realiza ecografía cervical previa para identificar estructuras vasculares y anillos traqueales', n: 'No se realiza ecografía cervical previa' },

      { id: 'anat', l: 'Hallazgos cervicales', sec: 'C', k: 'multi', o: [
        ['Sin particularidades', 'Anatomía cervical sin particularidades'],
        ['Cuello corto', 'Cuello corto y ancho'],
        ['Istmo voluminoso', 'Istmo tiroideo voluminoso'],
        ['Venas yugulares anteriores prominentes', 'Venas yugulares anteriores prominentes'],
        ['Desviación traqueal', 'Desviación traqueal {d}'],
        ['Tráquea profunda', 'Tráquea de ubicación profunda']
      ], ph: 'sentido' },
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
      { id: 'vent', l: 'Apertura traqueal (técnica abierta)', sec: 'D', k: 'opt', if: ['tec', 'Abierta'], o: [
        ['Incisión horizontal', 'Se realiza apertura traqueal horizontal entre anillos'],
        ['Incisión en H', 'Se realiza apertura traqueal en H'],
        ['Incisión vertical', 'Se realiza apertura traqueal vertical'],
        ['Colgajo de Björk', 'Se confecciona colgajo traqueal de base inferior (colgajo de Björk)'],
        ['Ventana traqueal', 'Se reseca ventana traqueal anterior']
      ] },

      { id: 'can', l: 'Tipo de cánula', sec: 'E', k: 'opt', req: 1, o: [
        ['Con balón', 'Se coloca cánula de traqueostomía con balón'],
        ['Con balón y aspiración subglótica', 'Se coloca cánula de traqueostomía con balón y aspiración subglótica'],
        ['Fenestrada con balón', 'Se coloca cánula de traqueostomía fenestrada con balón'],
        ['Sin balón', 'Se coloca cánula de traqueostomía sin balón'],
        ['Longitud ajustable', 'Se coloca cánula de traqueostomía con balón y longitud ajustable']
      ] },
      { id: 'tam', l: 'Diámetro interno de la cánula', sec: 'E', k: 'num', u: 'mm', p: 'Cánula de {v} mm de diámetro interno' },

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
        ['Puntos de reparo traqueales', 'Se dejan puntos de reparo traqueales exteriorizados']
      ] }
    ],
    pasos: [
      'Se realiza infiltración con anestésico local y vasoconstrictor',
      'Se realiza incisión cervical transversa entre el cartílago cricoides y la horquilla esternal',
      'Se separan los músculos pretiroideos en la línea media',
      'Se expone la cara anterior de la tráquea y se identifican los anillos traqueales',
      'Se retira parcialmente el tubo endotraqueal hasta ubicar su extremo por encima del sitio de apertura',
      'Se realiza punción traqueal con aguja y se pasa la guía metálica',
      'Se realiza dilatación del trayecto sobre la guía',
      'Se inserta la cánula y se insufla el balón',
      'Se retira el tubo endotraqueal'
    ],
    ej: 'Se indica traqueostomía por requerimiento de ventilación mecánica prolongada. Se realiza traqueostomía percutánea con dilatador único cónico, con control broncoscópico durante el procedimiento. Se realiza infiltración con anestésico local e incisión cervical transversa, y se retira parcialmente el tubo endotraqueal. Se realiza punción traqueal entre el segundo y el tercer anillo traqueal, se pasa la guía metálica y se dilata el trayecto. Se coloca cánula de traqueostomía con balón de 8 mm de diámetro interno, y se confirma la posición intratraqueal por broncoscopia y mediante capnografía. Se conecta la cánula al circuito de ventilación mecánica y se fija con puntos a la piel y cinta alrededor del cuello. No se registran complicaciones durante el procedimiento.'
  }
];
