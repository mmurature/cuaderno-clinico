// Biblioteca de partes quirúrgicos · Traumatología y ortopedia (BLOQUE C)
// Datos puros. Convención para campos citados en `pasos` con {id}: la frase de la opción es un fragmento que se
// inserta tal cual dentro del paso; `p` es el envoltorio que se usa cuando el campo se escribe por sí solo.

const DTIPO_ORTO = [
  ['Subfascial aspirativo', 'subfascial aspirativo'],
  ['Intraarticular aspirativo', 'intraarticular aspirativo'],
  ['Subcutáneo', 'subcutáneo']
];

const NV_DISTAL = [
  ['Pulsos distales palpables', 'pulsos distales palpables'],
  ['Pulsos distales no palpables', 'pulsos distales no palpables'],
  ['Relleno capilar conservado', 'relleno capilar distal conservado'],
  ['Relleno capilar enlentecido', 'relleno capilar distal enlentecido']
];

export default [
  // 25. Reducción abierta y fijación interna
  {
    id: 'tr-rafi',
    n: 'Reducción abierta y fijación interna',
    sp: 'Traumatología y ortopedia',
    sub: 'Trauma',
    v: 1,
    ctx: 'Fracturas desplazadas, inestables o articulares que requieren reducción a cielo abierto y osteosíntesis con placas, tornillos, clavos o agujas. Hueso, segmento y lateralidad son obligatorios',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Supino', 'Paciente en decúbito supino'],
        ['Supino con mesa de mano', 'Paciente en decúbito supino con miembro superior sobre mesa de mano'],
        ['Supino en mesa de tracción', 'Paciente en decúbito supino en mesa de tracción'],
        ['Decúbito lateral', 'Paciente en decúbito lateral'],
        ['Prono', 'Paciente en decúbito prono'],
        ['Silla de playa', 'Paciente en posición de silla de playa']
      ] },
      { id: 'isq', l: 'Isquemia', sec: 'B', k: 'yn', y: 'Se coloca manguito de isquemia neumático', n: 'No se utiliza isquemia' },
      { id: 'isqp', l: 'Presión de isquemia', sec: 'B', k: 'num', u: 'mmHg', if: ['isq', 'si'], p: 'Isquemia a {v} mmHg' },
      { id: 'hueso', l: 'Hueso', sec: 'B', k: 'opt', p: 'Se interviene fractura de {v}', req: 1, o: [
        ['Clavícula', 'clavícula'],
        ['Escápula', 'escápula'],
        ['Húmero', 'húmero'],
        ['Olécranon', 'olécranon'],
        ['Radio', 'radio'],
        ['Cúbito', 'cúbito'],
        ['Radio y cúbito', 'radio y cúbito'],
        ['Metacarpiano', 'metacarpiano'],
        ['Falange (mano)', 'falange de la mano'],
        ['Pelvis', 'anillo pelviano'],
        ['Acetábulo', 'acetábulo'],
        ['Fémur', 'fémur'],
        ['Rótula', 'rótula'],
        ['Tibia', 'tibia'],
        ['Tibia y peroné', 'tibia y peroné'],
        ['Peroné', 'peroné'],
        ['Tobillo', 'tobillo'],
        ['Calcáneo', 'calcáneo'],
        ['Metatarsiano', 'metatarsiano']
      ] },
      { id: 'seg', l: 'Segmento', sec: 'B', k: 'opt', req: 1, o: [
        ['Epifisario proximal', 'Compromiso epifisario proximal'],
        ['Metafisario proximal', 'Compromiso metafisario proximal'],
        ['Diafisario', 'Compromiso diafisario'],
        ['Metafisario distal', 'Compromiso metafisario distal'],
        ['Epifisario distal', 'Compromiso epifisario distal'],
        ['Unimaleolar', 'Compromiso unimaleolar'],
        ['Bimaleolar', 'Compromiso bimaleolar'],
        ['Trimaleolar', 'Compromiso trimaleolar']
      ] },
      { id: 'clas', l: 'Clasificación', sec: 'B', k: 'text', p: 'Fractura clasificada como {v}', ph: 'AO/OTA 42-A2' },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', o: [
        ['Anterior', 'anterior'],
        ['Anterolateral', 'anterolateral'],
        ['Lateral', 'lateral'],
        ['Posterior', 'posterior'],
        ['Posterolateral', 'posterolateral'],
        ['Medial', 'medial'],
        ['Anteromedial', 'anteromedial'],
        ['Deltopectoral', 'deltopectoral'],
        ['Volar de Henry', 'volar de Henry'],
        ['Dorsal', 'dorsal'],
        ['Mínimamente invasivo (MIPO)', 'mínimamente invasivo con inserción percutánea de la placa'],
        ['Ilioinguinal', 'ilioinguinal'],
        ['Kocher-Langenbeck', 'de Kocher-Langenbeck']
      ] },
      { id: 'tfrac', l: 'Tipo de fractura', sec: 'C', k: 'multi', p: 'Se constata fractura {v}', o: [
        ['Transversal', 'de trazo transversal'],
        ['Oblicua', 'de trazo oblicuo'],
        ['Espiroidea', 'de trazo espiroideo'],
        ['Conminuta', 'conminuta'],
        ['Segmentaria', 'segmentaria'],
        ['Tercer fragmento en ala de mariposa', 'con tercer fragmento en ala de mariposa'],
        ['Extensión articular', 'con extensión articular'],
        ['Hundimiento articular', 'con hundimiento articular'],
        ['Desplazada', 'desplazada'],
        ['Acortamiento', 'con acortamiento'],
        ['Angulación', 'con angulación'],
        ['Expuesta', 'expuesta']
      ] },
      { id: 'pblan', l: 'Hallazgos del foco', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Hematoma fracturario', 'hematoma fracturario'],
        ['Interposición de partes blandas', 'interposición de partes blandas en el foco'],
        ['Contaminación del foco', 'contaminación del foco fracturario'],
        ['Lesión muscular', 'lesión muscular'],
        ['Desperiostización', 'desperiostización de los fragmentos'],
        ['Conminución metafisaria', 'conminución metafisaria'],
        ['Callo en formación', 'callo óseo en formación'],
        ['Hueso osteoporótico', 'calidad ósea disminuida']
      ] },
      { id: 'nerv', l: 'Estructura neurovascular protegida', sec: 'C', k: 'text', p: 'Se identifica y protege {v}', ph: 'el nervio radial' },
      { id: 'tred', l: 'Técnica de reducción', sec: 'D', k: 'opt', p: 'Se realiza reducción {v}', o: [
        ['Directa con pinzas', 'directa a cielo abierto con pinzas de reducción'],
        ['Indirecta por ligamentotaxis', 'indirecta por tracción y ligamentotaxis'],
        ['Con distractor', 'con distractor femoral'],
        ['Con joystick', 'con agujas de Schanz como palanca'],
        ['Elevación de superficie articular', 'con elevación de la superficie articular hundida']
      ] },
      { id: 'temp', l: 'Fijación provisoria', sec: 'D', k: 'multi', p: 'Se realiza fijación provisoria con {v}', o: [
        ['Agujas de Kirschner', 'agujas de Kirschner'],
        ['Pinzas de reducción', 'pinzas de reducción'],
        ['Placa como reducción', 'la placa a modo de guía de reducción']
      ] },
      { id: 'cred', l: 'Calidad de la reducción', sec: 'D', k: 'opt', req: 1, o: [
        ['Anatómica', 'Se obtiene reducción anatómica'],
        ['Casi anatómica', 'Se obtiene reducción casi anatómica'],
        ['Restitución de eje, longitud y rotación', 'Se restituyen eje, longitud y rotación, sin reducción anatómica de los fragmentos intermedios'],
        ['Escalón articular residual', 'Persiste escalón articular residual'],
        ['Desplazamiento residual', 'Persiste desplazamiento residual de los fragmentos']
      ] },
      { id: 'rx', l: 'Control radiológico', sec: 'D', k: 'opt', req: 1, o: [
        ['Radioscopía en dos proyecciones', 'Se realiza control radioscópico en proyecciones anteroposterior y lateral'],
        ['Radioscopía', 'Se realiza control radioscópico'],
        ['Radiografía intraoperatoria', 'Se realiza control con radiografía intraoperatoria'],
        ['No realizado', 'No se realiza control radiológico intraoperatorio']
      ] },
      { id: 'rxr', l: 'Resultado del control radiológico', sec: 'D', k: 'text', p: 'El control radiológico muestra {v}', ph: 'describir la reducción y la posición de los implantes' },
      { id: 'estab', l: 'Estabilidad final', sec: 'D', k: 'opt', req: 1, o: [
        ['Montaje estable', 'Se constata estabilidad del montaje a la movilización'],
        ['Estabilidad articular', 'Se constata estabilidad articular a las maniobras de estrés'],
        ['Sindesmosis estable', 'Se constata estabilidad de la sindesmosis a la prueba de gancho'],
        ['Inestabilidad residual', 'Se constata inestabilidad residual']
      ] },
      { id: 'impl', l: 'Implantes', sec: 'E', k: 'multi', p: 'Se realiza osteosíntesis con {v}', req: 1, o: [
        ['Placa bloqueada', 'placa bloqueada'],
        ['Placa anatómica bloqueada', 'placa anatómica bloqueada'],
        ['Placa de compresión', 'placa de compresión dinámica'],
        ['Placa de neutralización', 'placa de neutralización'],
        ['Placa de sostén', 'placa de sostén'],
        ['Placa de reconstrucción', 'placa de reconstrucción'],
        ['Clavo endomedular bloqueado', 'clavo endomedular bloqueado'],
        ['Tornillos interfragmentarios', 'tornillos de compresión interfragmentaria'],
        ['Tornillos canulados', 'tornillos canulados'],
        ['Tornillo sindesmal', 'tornillo transindesmal'],
        ['Agujas de Kirschner', 'agujas de Kirschner'],
        ['Banda de tensión', 'banda de tensión con alambre'],
        ['Cerclaje', 'cerclaje con alambre'],
        ['Fijador externo', 'fijador externo']
      ] },
      { id: 'norif', l: 'Orificios de la placa', sec: 'E', k: 'num', p: 'Se utiliza placa de {v} orificios' },
      { id: 'tdet', l: 'Detalle de tornillos', sec: 'E', k: 'text', p: 'Se colocan tornillos {v}', ph: '3 bloqueados proximales y 3 corticales distales' },
      { id: 'inj', l: 'Injerto óseo', sec: 'E', k: 'multi', p: 'Se coloca {v}', o: [
        ['Autoinjerto', 'autoinjerto óseo'],
        ['Aloinjerto', 'aloinjerto óseo'],
        ['Sustituto óseo', 'sustituto óseo sintético']
      ] },
      { id: 'isqt', l: 'Tiempo de isquemia', sec: 'G', k: 'num', u: 'min', if: ['isq', 'si'], p: 'Tiempo de isquemia de {v} minutos' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_ORTO, p: 'Se deja drenaje {v}' },
      { id: 'inm', l: 'Inmovilización', sec: 'H', k: 'opt', o: [
        ['Férula', 'Se coloca férula'],
        ['Yeso', 'Se coloca yeso'],
        ['Cabestrillo', 'Se coloca cabestrillo'],
        ['Ortesis', 'Se coloca ortesis'],
        ['Sin inmovilización', 'No se coloca inmovilización']
      ] },
      { id: 'nvd', l: 'Estado neurovascular distal', sec: 'H', k: 'multi', o: NV_DISTAL, p: 'Al finalizar se constatan {v}' }
    ],
    pasos: [
      'Se realiza incisión cutánea y abordaje {abord}',
      'Se realiza disección por planos con identificación de las estructuras neurovasculares',
      'Se expone el foco fracturario',
      'Se realiza limpieza del foco con extracción del hematoma y del tejido interpuesto',
      'Se procede a la reducción {tred}',
      'Se realiza control radioscópico de la reducción provisoria',
      'Se presenta y posiciona el implante',
      'Se realiza perforación, medición y colocación de los tornillos',
      'Se realizan maniobras de movilización para evaluar la estabilidad del montaje'
    ],
    ej: 'Paciente en decúbito supino con miembro superior sobre mesa de mano, con manguito de isquemia neumático. Se interviene fractura de radio izquierdo, con compromiso epifisario distal, clasificada como AO/OTA 23-C2. Se realiza abordaje volar de Henry y se constata fractura conminuta con extensión articular. Se realiza reducción directa a cielo abierto con pinzas de reducción y fijación provisoria con agujas de Kirschner, y se obtiene reducción anatómica. Se realiza osteosíntesis con placa anatómica bloqueada. Se realiza control radioscópico en proyecciones anteroposterior y lateral y se constata estabilidad del montaje a la movilización. Se coloca férula. Al finalizar se constatan pulsos distales palpables y relleno capilar distal conservado'
  },

  // 26. Artroplastia
  {
    id: 'tr-artro',
    n: 'Artroplastia',
    sp: 'Traumatología y ortopedia',
    sub: 'Reconstrucción articular',
    v: 1,
    ctx: 'Reemplazo articular parcial o total, primario o de revisión, de cadera, rodilla, hombro u otras articulaciones, por artrosis, fractura, necrosis o falla de una artroplastia previa. Los pasos sugeridos incluyen variantes de cadera y rodilla: confirmar solo los que correspondan',
    lat: true,
    f: [
      { id: 'pos', l: 'Posición', sec: 'B', k: 'opt', o: [
        ['Decúbito lateral', 'Paciente en decúbito lateral con soportes pelvianos'],
        ['Supino', 'Paciente en decúbito supino'],
        ['Supino con soporte de rodilla', 'Paciente en decúbito supino con soporte para flexión de rodilla'],
        ['Silla de playa', 'Paciente en posición de silla de playa']
      ] },
      { id: 'isq', l: 'Isquemia', sec: 'B', k: 'yn', y: 'Se coloca manguito de isquemia neumático', n: 'No se utiliza isquemia' },
      { id: 'art', l: 'Articulación', sec: 'B', k: 'opt', p: 'Se interviene {v}', req: 1, o: [
        ['Cadera', 'la cadera'],
        ['Rodilla', 'la rodilla'],
        ['Hombro', 'el hombro'],
        ['Codo', 'el codo'],
        ['Tobillo', 'el tobillo']
      ] },
      { id: 'rev', l: 'Primaria o revisión', sec: 'B', k: 'opt', req: 1, o: [
        ['Primaria', 'Se realiza artroplastia primaria'],
        ['Revisión de ambos componentes', 'Se realiza revisión de ambos componentes protésicos'],
        ['Revisión de un componente', 'Se realiza revisión de un componente protésico'],
        ['Recambio de inserto', 'Se realiza recambio aislado del inserto'],
        ['Conversión a total', 'Se realiza conversión de artroplastia parcial a total'],
        ['Primer tiempo con espaciador', 'Se realiza retiro de componentes y colocación de espaciador'],
        ['Segundo tiempo (reimplante)', 'Se realiza reimplante protésico en segundo tiempo']
      ] },
      { id: 'tipo', l: 'Tipo de prótesis', sec: 'B', k: 'opt', p: 'Se implanta prótesis {v}', req: 1, o: [
        ['Total', 'total'],
        ['Parcial (hemiartroplastia)', 'parcial'],
        ['Parcial bipolar', 'parcial bipolar'],
        ['Unicompartimental medial', 'unicompartimental medial'],
        ['Unicompartimental lateral', 'unicompartimental lateral'],
        ['Total invertida', 'total invertida'],
        ['De superficie', 'de superficie'],
        ['Constreñida / bisagra', 'constreñida']
      ] },
      { id: 'abord', l: 'Abordaje', sec: 'B', k: 'opt', p: 'Se realiza abordaje {v}', o: [
        ['Posterolateral', 'posterolateral'],
        ['Lateral directo (Hardinge)', 'lateral directo de Hardinge'],
        ['Anterior directo', 'anterior directo'],
        ['Anterolateral', 'anterolateral'],
        ['Parapatelar medial', 'parapatelar medial'],
        ['Subvasto', 'subvasto'],
        ['Midvasto', 'midvasto'],
        ['Parapatelar lateral', 'parapatelar lateral'],
        ['Deltopectoral', 'deltopectoral'],
        ['Superolateral', 'superolateral']
      ] },
      { id: 'hart', l: 'Hallazgos', sec: 'C', k: 'multi', p: 'Se constata {v}', o: [
        ['Cambios degenerativos avanzados', 'cambios degenerativos articulares avanzados'],
        ['Pérdida de cartílago', 'pérdida del cartílago articular'],
        ['Osteofitos', 'osteofitos marginales'],
        ['Defecto óseo', 'defecto óseo'],
        ['Necrosis de cabeza femoral', 'colapso de la cabeza femoral'],
        ['Fractura de cuello femoral', 'fractura del cuello femoral'],
        ['Sinovitis', 'sinovitis'],
        ['Deformidad en varo', 'deformidad en varo'],
        ['Deformidad en valgo', 'deformidad en valgo'],
        ['Contractura en flexión', 'contractura en flexión'],
        ['Lesión del manguito rotador', 'lesión del manguito rotador'],
        ['Aflojamiento de componentes', 'aflojamiento de componentes previos'],
        ['Desgaste del polietileno', 'desgaste del polietileno'],
        ['Metalosis', 'metalosis'],
        ['Líquido articular turbio', 'líquido articular turbio']
      ] },
      { id: 'comp', l: 'Componentes implantados', sec: 'E', k: 'multi', p: 'Se implantan {v}', req: 1, o: [
        ['Componente acetabular', 'componente acetabular'],
        ['Inserto de polietileno', 'inserto de polietileno'],
        ['Inserto cerámico', 'inserto cerámico'],
        ['Cabeza metálica', 'cabeza femoral metálica'],
        ['Cabeza cerámica', 'cabeza femoral cerámica'],
        ['Cabeza bipolar', 'cabeza bipolar'],
        ['Vástago femoral', 'vástago femoral'],
        ['Componente femoral (rodilla)', 'componente femoral de rodilla'],
        ['Componente tibial', 'componente tibial'],
        ['Componente rotuliano', 'componente rotuliano'],
        ['Vástago humeral', 'vástago humeral'],
        ['Glenosfera / componente glenoideo', 'componente glenoideo'],
        ['Tornillos acetabulares', 'tornillos acetabulares'],
        ['Aumentos o cuñas', 'aumentos metálicos'],
        ['Vástagos de extensión', 'vástagos de extensión'],
        ['Espaciador', 'espaciador con antibiótico']
      ] },
      { id: 'tam', l: 'Medidas de los componentes', sec: 'E', k: 'text', p: 'Se implantan componentes de tamaño {v}', ph: 'acetábulo 52 mm, cabeza 32 mm +0, vástago 12' },
      { id: 'ntor', l: 'Tornillos acetabulares', sec: 'E', k: 'num', p: 'Se colocan {v} tornillos acetabulares' },
      { id: 'fij', l: 'Fijación', sec: 'D', k: 'opt', o: [
        ['Cementada', 'Se realiza fijación cementada de los componentes'],
        ['No cementada', 'Se realiza fijación no cementada de los componentes por ajuste a presión'],
        ['Híbrida', 'Se realiza fijación híbrida de los componentes'],
        ['Híbrida inversa', 'Se realiza fijación híbrida inversa de los componentes']
      ] },
      { id: 'cem', l: 'Técnica de cementación', sec: 'D', k: 'multi', p: 'Se realiza cementación {v}', o: [
        ['Con presurización', 'con técnica de presurización'],
        ['Con restrictor', 'con restrictor de canal'],
        ['Con pistola de cemento', 'con inyección retrógrada'],
        ['Manual', 'con técnica manual'],
        ['Cemento con antibiótico', 'con cemento con antibiótico']
      ] },
      { id: 'estab', l: 'Estabilidad', sec: 'D', k: 'opt', req: 1, o: [
        ['Estable en todo el rango', 'Se constata estabilidad articular en todo el rango de movilidad evaluado'],
        ['Balance ligamentario simétrico', 'Se constata balance ligamentario simétrico en flexión y extensión'],
        ['Inestabilidad residual', 'Se constata inestabilidad residual'],
        ['Luxación con maniobra de provocación', 'Se constata luxación con maniobra de provocación']
      ] },
      { id: 'rom', l: 'Rango de movilidad comprobado', sec: 'D', k: 'text', p: 'Se comprueba rango de movilidad de {v}', ph: 'flexión de 0 a 120 grados' },
      { id: 'long', l: 'Longitud de miembros', sec: 'D', k: 'opt', o: [
        ['Equiparada', 'Se constata longitud de miembros equiparada'],
        ['Alargamiento', 'Se constata alargamiento del miembro intervenido'],
        ['Acortamiento', 'Se constata acortamiento del miembro intervenido']
      ] },
      { id: 'rx', l: 'Control radiológico', sec: 'D', k: 'opt', o: [
        ['Radioscopía', 'Se realiza control radioscópico de la posición de los componentes'],
        ['Radiografía intraoperatoria', 'Se realiza control con radiografía intraoperatoria'],
        ['No realizado', 'No se realiza control radiológico intraoperatorio']
      ] },
      { id: 'fxi', l: 'Fractura intraoperatoria', sec: 'D', k: 'yn', y: 'Se produce fractura periprotésica intraoperatoria', n: 'No se produce fractura periprotésica intraoperatoria' },
      { id: 'fxit', l: 'Tratamiento de la fractura', sec: 'D', k: 'text', if: ['fxi', 'si'], p: 'Se trata la fractura intraoperatoria con {v}', ph: 'cerclaje con alambre' },
      { id: 'rotex', l: 'Reparación capsular', sec: 'G', k: 'yn', y: 'Se realiza reparación de la cápsula y de los rotadores externos', n: 'No se realiza reparación capsular' },
      { id: 'infil', l: 'Infiltración periarticular', sec: 'G', k: 'yn', y: 'Se realiza infiltración periarticular con anestésico local', n: 'No se realiza infiltración periarticular' },
      { id: 'isqt', l: 'Tiempo de isquemia', sec: 'G', k: 'num', u: 'min', if: ['isq', 'si'], p: 'Tiempo de isquemia de {v} minutos' },
      { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'opt', if: ['dren', 'si'], o: DTIPO_ORTO, p: 'Se deja drenaje {v}' },
      { id: 'nvd', l: 'Estado neurovascular distal', sec: 'H', k: 'multi', o: NV_DISTAL, p: 'Al finalizar se constatan {v}' }
    ],
    pasos: [
      'Se realiza incisión cutánea y abordaje {abord}',
      'Se realiza artrotomía',
      'Se realiza luxación de la articulación',
      'Se realiza osteotomía del cuello femoral',
      'Se realiza preparación del acetábulo con fresado secuencial',
      'Se realiza preparación del canal femoral con raspas',
      'Se realizan cortes óseos femorales y tibiales con guías de corte',
      'Se realiza equilibrado ligamentario',
      'Se realiza reducción de prueba con componentes de prueba',
      'Se implantan los componentes definitivos',
      'Se realiza reducción articular'
    ],
    ej: 'Paciente en decúbito lateral con soportes pelvianos. Se interviene la cadera derecha y se realiza abordaje posterolateral. Se constata colapso de la cabeza femoral y cambios degenerativos articulares avanzados. Se realiza osteotomía del cuello femoral, preparación del acetábulo con fresado secuencial y del canal femoral con raspas, y reducción de prueba con componentes de prueba. Se realiza artroplastia primaria y se implanta prótesis total con fijación no cementada de los componentes por ajuste a presión, con componente acetabular, inserto de polietileno, cabeza femoral cerámica y vástago femoral. Se constata estabilidad articular en todo el rango de movilidad evaluado y longitud de miembros equiparada. Se realiza reparación de la cápsula y de los rotadores externos. No se registran complicaciones intraoperatorias'
  }
];
