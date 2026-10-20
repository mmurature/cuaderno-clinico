// Plantillas del prototipo, convertidas al esquema nuevo (cada ítem: normal / alterado / no evaluable).
export default [
 {
  "id": "cx-ampliado",
  "n": "Examen neurológico ampliado (funciones superiores)",
  "cat": "Neurología · Examen neurológico",
  "v": 1,
  "d": "Estado mental detallado, nervios craneales, motor, reflejos, coordinación y sensibilidad (plantilla del prototipo)",
  "secs": [
   {
    "id": "s0",
    "h": "Estado mental",
    "f": [
     {
      "id": "gcs",
      "k": "gcs"
     },
     {
      "id": "f0_0",
      "l": "Nivel de alerta, atención y cooperación",
      "n": "Vigil, atento y cooperador",
      "a": [
       "Somnoliento",
       "Obnubilado",
       "Estuporoso",
       "Comatoso",
       "Fluctuante",
       "Inatento",
       "No cooperador"
      ]
     },
     {
      "id": "f0_1",
      "l": "Orientación",
      "n": "Orientado en tiempo, espacio y persona",
      "a": [
       "Desorientado en tiempo",
       "Desorientado en espacio",
       "Desorientado en persona"
      ]
     },
     {
      "id": "f0_2",
      "l": "Memoria",
      "n": "Memoria reciente y remota conservadas",
      "a": [
       "Amnesia reciente",
       "Amnesia remota",
       "Amnesia anterógrada",
       "Amnesia retrógrada"
      ]
     },
     {
      "id": "f0_3",
      "l": "Lenguaje",
      "n": "Habla espontánea fluente, sin parafasias; comprensión, denominación, repetición, lectura y escritura conservadas",
      "a": [
       "Afasia de Broca",
       "Afasia de Wernicke",
       "Afasia global",
       "Afasia de conducción",
       "Afasia anómica",
       "Afasia transcortical",
       "Mutismo",
       "Parafasias",
       "Anomia",
       "Alexia"
      ]
     },
     {
      "id": "f0_4",
      "l": "Cálculo, orientación derecha-izquierda, gnosias y escritura",
      "n": "Cálculo conservado, sin confusión derecha-izquierda, sin agnosia digital ni agrafia",
      "a": [
       "Acalculia",
       "Confusión derecha-izquierda",
       "Agnosia digital",
       "Agrafia"
      ]
     },
     {
      "id": "f0_5",
      "l": "Praxias",
      "n": "Sin apraxia",
      "a": [
       "Apraxia ideomotora",
       "Apraxia ideatoria",
       "Apraxia del vestir",
       "Apraxia de la marcha"
      ]
     },
     {
      "id": "f0_6",
      "l": "Negligencia y construcciones",
      "n": "Sin heminegligencia; praxis constructiva conservada",
      "a": [
       "Heminegligencia izquierda",
       "Heminegligencia derecha",
       "Apraxia constructiva",
       "Extinción visual"
      ]
     },
     {
      "id": "f0_7",
      "l": "Secuenciación y signos de liberación frontal",
      "n": "Tareas de secuenciación sin alteraciones; sin signos de liberación frontal",
      "a": [
       "Perseveración",
       "Alteración de secuencias motoras",
       "Reflejo glabelar",
       "Hociqueo",
       "Reflejo de succión",
       "Reflejo de prensión"
      ]
     },
     {
      "id": "f0_8",
      "l": "Lógica y abstracción",
      "n": "Pensamiento lógico y capacidad de abstracción conservados",
      "a": [
       "Pensamiento concreto",
       "Juicio alterado",
       "Abstracción disminuida"
      ]
     },
     {
      "id": "f0_9",
      "l": "Delirios y alucinaciones",
      "n": "Sin ideas delirantes ni alucinaciones",
      "a": [
       "Ideas delirantes",
       "Alucinaciones visuales",
       "Alucinaciones auditivas"
      ]
     },
     {
      "id": "f0_10",
      "l": "Estado de ánimo",
      "n": "Ánimo eutímico",
      "a": [
       "Ánimo deprimido",
       "Labilidad emocional",
       "Euforia",
       "Apatía",
       "Abulia",
       "Ansiedad"
      ]
     }
    ]
   },
   {
    "id": "s1",
    "h": "Nervios craneales",
    "f": [
     {
      "id": "f1_0",
      "l": "I · Olfatorio",
      "n": "Olfación conservada bilateral",
      "a": [
       "Hiposmia",
       "Anosmia derecha",
       "Anosmia izquierda",
       "Anosmia bilateral"
      ]
     },
     {
      "id": "f1_1",
      "l": "II · Fondo de ojo",
      "n": "Papilas de bordes netos, sin edema de papila ni hemorragias retinianas",
      "a": [
       "Edema de papila",
       "Palidez papilar",
       "Hemorragias retinianas",
       "Pulso venoso espontáneo ausente",
       "No evaluable"
      ]
     },
     {
      "id": "f1_2",
      "l": "II · Visión",
      "n": "Agudeza visual y campos visuales por confrontación conservados",
      "a": [
       "Disminución de agudeza visual",
       "Hemianopsia homónima derecha",
       "Hemianopsia homónima izquierda",
       "Cuadrantopsia",
       "Hemianopsia bitemporal",
       "Escotoma",
       "Amaurosis"
      ]
     },
     {
      "id": "f1_3",
      "l": "II, III · Respuestas pupilares",
      "n": "Pupilas isocóricas, normorreactivas a la luz y a la acomodación; reflejo fotomotor directo y consensual conservado, sin defecto pupilar aferente relativo",
      "a": [
       "Anisocoria",
       "Midriasis derecha",
       "Midriasis izquierda",
       "Miosis",
       "Pupila arreactiva",
       "Defecto pupilar aferente relativo"
      ]
     },
     {
      "id": "f1_4",
      "l": "III, IV, VI · Movimientos extraoculares",
      "n": "Motilidad ocular extrínseca conservada en todas las posiciones de la mirada, sin diplopía ni nistagmo",
      "a": [
       "Paresia del III par",
       "Paresia del IV par",
       "Paresia del VI par",
       "Oftalmoplejía internuclear",
       "Desviación conjugada de la mirada",
       "Nistagmo",
       "Diplopía",
       "Ptosis palpebral"
      ]
     },
     {
      "id": "f1_5",
      "l": "V · Sensibilidad facial y músculos masticatorios",
      "n": "Sensibilidad facial conservada en V1, V2 y V3 bilateral, reflejo corneano presente; maseteros y temporales con trofismo y fuerza conservados",
      "a": [
       "Hipoestesia V1",
       "Hipoestesia V2",
       "Hipoestesia V3",
       "Reflejo corneano abolido",
       "Debilidad de músculos masticatorios",
       "Desviación mandibular"
      ]
     },
     {
      "id": "f1_6",
      "l": "VII · Mímica facial y gusto",
      "n": "Facies simétrica en reposo y en la mímica, frente arrugable bilateral, cierre palpebral completo; gusto conservado",
      "a": [
       "Parálisis facial central",
       "Parálisis facial periférica",
       "Asimetría del surco nasogeniano",
       "Signo de Bell",
       "Ageusia"
      ]
     },
     {
      "id": "f1_7",
      "l": "VIII · Audición y sistema vestibular",
      "n": "Audición conservada bilateral, Rinne positivo y Weber centrado; sin nistagmo ni vértigo",
      "a": [
       "Hipoacusia neurosensorial",
       "Hipoacusia de conducción",
       "Acúfenos",
       "Vértigo",
       "Nistagmo"
      ]
     },
     {
      "id": "f1_8",
      "l": "IX, X · Paladar y reflejo nauseoso",
      "n": "Elevación simétrica del paladar blando, úvula central, reflejo nauseoso presente",
      "a": [
       "Desviación uvular",
       "Hipomovilidad del paladar",
       "Reflejo nauseoso abolido",
       "Disfagia"
      ]
     },
     {
      "id": "f1_9",
      "l": "Músculos de la articulación (V, VII, IX, X, XII)",
      "n": "Articulación de la palabra conservada, sin disartria ni disfonía",
      "a": [
       "Disartria",
       "Disfonía",
       "Voz nasal"
      ]
     },
     {
      "id": "f1_10",
      "l": "XI · Esternocleidomastoideo y trapecio",
      "n": "Esternocleidomastoideos y trapecios simétricos, con fuerza conservada",
      "a": [
       "Debilidad del esternocleidomastoideo",
       "Debilidad del trapecio",
       "Atrofia"
      ]
     },
     {
      "id": "f1_11",
      "l": "XII · Lengua",
      "n": "Lengua central en reposo y en la protrusión, sin atrofia ni fasciculaciones, con movilidad conservada",
      "a": [
       "Desviación lingual derecha",
       "Desviación lingual izquierda",
       "Atrofia lingual",
       "Fasciculaciones linguales"
      ]
     }
    ]
   },
   {
    "id": "s2",
    "h": "Examen motor",
    "f": [
     {
      "id": "f2_0",
      "l": "Observación",
      "n": "Sin movimientos involuntarios, temblor ni hipocinesia",
      "a": [
       "Temblor de reposo",
       "Temblor postural",
       "Temblor intencional",
       "Corea",
       "Atetosis",
       "Distonía",
       "Mioclonías",
       "Hipocinesia",
       "Bradicinesia"
      ]
     },
     {
      "id": "f2_1",
      "l": "Inspección",
      "n": "Eutrofia muscular, sin atrofias ni fasciculaciones",
      "a": [
       "Atrofia muscular",
       "Fasciculaciones",
       "Hipertrofia"
      ]
     },
     {
      "id": "f2_2",
      "l": "Palpación",
      "n": "Masas musculares indoloras a la palpación, sin fasciculaciones",
      "a": [
       "Dolor a la palpación",
       "Fasciculaciones"
      ]
     },
     {
      "id": "f2_3",
      "l": "Tono muscular",
      "n": "Eutonía, sin espasticidad, rigidez ni hipotonía",
      "a": [
       "Espasticidad",
       "Rigidez en rueda dentada",
       "Rigidez en tubo de plomo",
       "Hipotonía",
       "Paratonía"
      ],
      "sc": {
       "s": "ashworth"
      }
     },
     {
      "id": "f2_4",
      "l": "Pruebas funcionales",
      "n": "Maniobra de Barré sin deriva pronadora ni claudicación; movimientos finos de los dedos y golpeteo rápido del pie conservados y simétricos",
      "a": [
       "Deriva pronadora derecha",
       "Deriva pronadora izquierda",
       "Claudicación de miembros inferiores",
       "Alteración de movimientos finos de los dedos",
       "Enlentecimiento del golpeteo del pie"
      ]
     },
     {
      "id": "f2_5",
      "l": "Fuerza de grupos musculares",
      "n": "Fuerza 5/5 (MRC) en todos los grupos musculares de los cuatro miembros, simétrica",
      "a": [
       "Hemiparesia derecha",
       "Hemiparesia izquierda",
       "Hemiplejía",
       "Paraparesia",
       "Tetraparesia",
       "Monoparesia",
       "Paresia distal",
       "Debilidad proximal"
      ],
      "sc": {
       "l": "Fuerza (MRC)",
       "o": [
        "0/5",
        "1/5",
        "2/5",
        "3/5",
        "4-/5",
        "4/5",
        "4+/5"
       ],
       "p": "fuerza {v}"
      }
     }
    ]
   },
   {
    "id": "s3",
    "h": "Reflejos",
    "f": [
     {
      "id": "f3_0",
      "l": "Reflejos osteotendinosos",
      "n": "Reflejos osteotendinosos bicipital, tricipital, estilorradial, rotuliano y aquiliano ++/++++, simétricos",
      "a": [
       "Hiperreflexia generalizada",
       "Hiperreflexia derecha",
       "Hiperreflexia izquierda",
       "Hiporreflexia",
       "Arreflexia",
       "Clonus",
       "Reflejo aductor cruzado"
      ],
      "sc": {
       "l": "ROT",
       "o": [
        "0",
        "+",
        "++",
        "+++",
        "++++"
       ],
       "p": "ROT {v}"
      }
     },
     {
      "id": "f3_1",
      "l": "Respuesta plantar",
      "n": "Respuesta plantar flexora bilateral",
      "a": [
       "Signo de Babinski derecho",
       "Signo de Babinski izquierdo",
       "Signo de Babinski bilateral",
       "Respuesta plantar indiferente"
      ]
     },
     {
      "id": "f3_2",
      "l": "Reflejos en situaciones especiales",
      "n": "Sin signos de lesión medular, sin signos de liberación frontal ni posturas anormales",
      "a": [
       "Signo de Hoffmann",
       "Reflejo bulbocavernoso abolido",
       "Reflejo cremastérico abolido",
       "Reflejos cutáneo-abdominales abolidos",
       "Postura de decorticación",
       "Postura de descerebración",
       "Reflejo de prensión"
      ]
     }
    ]
   },
   {
    "id": "s4",
    "h": "Coordinación y marcha",
    "f": [
     {
      "id": "f4_0",
      "l": "Coordinación apendicular",
      "n": "Movimientos alternantes rápidos, prueba dedo-nariz y talón-rodilla sin dismetría ni sobrepaso; sin temblor intencional",
      "a": [
       "Disdiadococinesia derecha",
       "Disdiadococinesia izquierda",
       "Dismetría derecha",
       "Dismetría izquierda",
       "Sobrepaso",
       "Temblor intencional",
       "Ataxia apendicular"
      ]
     },
     {
      "id": "f4_1",
      "l": "Prueba de Romberg",
      "n": "Romberg negativo",
      "a": [
       "Romberg positivo",
       "Lateropulsión"
      ]
     },
     {
      "id": "f4_2",
      "l": "Marcha",
      "n": "Marcha con base de sustentación normal y braceo conservado; marcha en tándem, en puntas y en talones sin alteraciones",
      "a": [
       "Marcha atáxica",
       "Marcha guadañante (hemiparética)",
       "Marcha espástica",
       "Marcha en estepaje",
       "Marcha parkinsoniana",
       "Marcha anserina",
       "Base de sustentación ampliada",
       "Imposibilidad de marcha en tándem",
       "Imposibilidad de marcha en talones",
       "Imposibilidad de marcha en puntas"
      ]
     }
    ]
   },
   {
    "id": "s5",
    "h": "Sensibilidad",
    "f": [
     {
      "id": "f5_0",
      "l": "Sensibilidad primaria",
      "n": "Sensibilidad dolorosa, térmica, vibratoria, artrocinética y táctil leve conservada y simétrica, sin nivel sensitivo; discriminación de dos puntos conservada",
      "a": [
       "Hipoestesia termoalgésica",
       "Hipopalestesia",
       "Alteración de la sensibilidad artrocinética",
       "Hipoestesia táctil",
       "Nivel sensitivo",
       "Hemihipoestesia derecha",
       "Hemihipoestesia izquierda",
       "Disestesias",
       "Alodinia"
      ]
     },
     {
      "id": "f5_1",
      "l": "Sensibilidad cortical",
      "n": "Grafestesia y estereognosia conservadas",
      "a": [
       "Agrafestesia",
       "Astereognosia",
       "Alteración de discriminación de dos puntos"
      ]
     },
     {
      "id": "f5_2",
      "l": "Extinción",
      "n": "Sin extinción sensitiva a la estimulación bilateral simultánea",
      "a": [
       "Extinción sensitiva derecha",
       "Extinción sensitiva izquierda"
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "cx-screening",
  "n": "Examen neurológico de screening (5 a 10 minutos)",
  "cat": "Neurología · Examen neurológico",
  "v": 1,
  "d": "Versión breve del examen neurológico (plantilla del prototipo)",
  "secs": [
   {
    "id": "s0",
    "h": "Estado mental",
    "f": [
     {
      "id": "gcs",
      "k": "gcs"
     },
     {
      "id": "f0_0",
      "l": "Nivel de alerta y orientación",
      "n": "Vigil, orientado en tiempo, espacio y persona",
      "a": [
       "Somnoliento",
       "Obnubilado",
       "Estuporoso",
       "Comatoso",
       "Desorientado en tiempo",
       "Desorientado en espacio",
       "Desorientado en persona"
      ]
     },
     {
      "id": "f0_1",
      "l": "Atención",
      "n": "Atención conservada, con meses del año en orden directo e inverso sin errores",
      "a": [
       "Errores en orden inverso",
       "Inatento",
       "Fluctuante"
      ]
     },
     {
      "id": "f0_2",
      "l": "Registro y evocación diferida",
      "n": "Registro inmediato de 3 objetos conservado; evocación diferida a los 4 minutos 3/3",
      "a": [
       "Registro alterado",
       "Evocación diferida disminuida"
      ],
      "sc": {
       "l": "Evocación diferida",
       "o": [
        "0/3",
        "1/3",
        "2/3"
       ],
       "p": "evocación diferida {v}"
      }
     },
     {
      "id": "f0_3",
      "l": "Denominación",
      "n": "Denominación de partes de un reloj conservada",
      "a": [
       "Anomia",
       "Parafasias"
      ]
     },
     {
      "id": "f0_4",
      "l": "Conducta, lenguaje y afecto",
      "n": "Conducta adecuada, lenguaje fluente y afecto apropiado",
      "a": [
       "Conducta inapropiada",
       "Afasia",
       "Disartria",
       "Labilidad emocional",
       "Ánimo deprimido",
       "Apatía"
      ]
     }
    ]
   },
   {
    "id": "s1",
    "h": "Nervios craneales",
    "f": [
     {
      "id": "f1_0",
      "l": "Reflejos pupilares a la luz",
      "n": "Pupilas isocóricas, normorreactivas a la luz",
      "a": [
       "Anisocoria",
       "Midriasis derecha",
       "Midriasis izquierda",
       "Miosis",
       "Pupila arreactiva",
       "Defecto pupilar aferente relativo"
      ]
     },
     {
      "id": "f1_1",
      "l": "Fondo de ojo",
      "n": "Papilas de bordes netos, sin edema de papila ni hemorragias retinianas",
      "a": [
       "Edema de papila",
       "Palidez papilar",
       "Hemorragias retinianas",
       "No evaluable"
      ]
     },
     {
      "id": "f1_2",
      "l": "Campos visuales y extinción visual",
      "n": "Campos visuales por confrontación conservados, sin extinción visual",
      "a": [
       "Hemianopsia homónima derecha",
       "Hemianopsia homónima izquierda",
       "Cuadrantopsia",
       "Hemianopsia bitemporal",
       "Extinción visual"
      ]
     },
     {
      "id": "f1_3",
      "l": "Seguimiento ocular horizontal y vertical",
      "n": "Seguimientos oculares suaves, horizontales y verticales, conservados; sin nistagmo ni diplopía",
      "a": [
       "Seguimiento sacádico",
       "Limitación de la mirada horizontal",
       "Limitación de la mirada vertical",
       "Nistagmo",
       "Diplopía"
      ]
     },
     {
      "id": "f1_4",
      "l": "Sensibilidad facial al tacto leve y extinción",
      "n": "Sensibilidad táctil facial conservada y simétrica, sin extinción",
      "a": [
       "Hipoestesia facial derecha",
       "Hipoestesia facial izquierda",
       "Extinción sensitiva facial"
      ]
     },
     {
      "id": "f1_5",
      "l": "Simetría facial (sonrisa emocional y voluntaria)",
      "n": "Facies simétrica en la sonrisa emocional y voluntaria",
      "a": [
       "Parálisis facial central",
       "Parálisis facial periférica",
       "Disociación automático-voluntaria"
      ]
     },
     {
      "id": "f1_6",
      "l": "Audición (frote de dedos)",
      "n": "Audición conservada bilateral al frote de dedos",
      "a": [
       "Hipoacusia derecha",
       "Hipoacusia izquierda"
      ]
     },
     {
      "id": "f1_7",
      "l": "Elevación del paladar y calidad de la voz",
      "n": "Elevación simétrica del paladar blando; voz de timbre normal",
      "a": [
       "Desviación uvular",
       "Disfonía",
       "Voz nasal",
       "Disartria"
      ]
     },
     {
      "id": "f1_8",
      "l": "Rotación cefálica y elevación de hombros contra resistencia",
      "n": "Fuerza conservada y simétrica en la rotación cefálica y la elevación de los hombros contra resistencia",
      "a": [
       "Debilidad del ECM derecho",
       "Debilidad del ECM izquierdo",
       "Debilidad del trapecio derecho",
       "Debilidad del trapecio izquierdo"
      ]
     },
     {
      "id": "f1_9",
      "l": "Protrusión lingual",
      "n": "Lengua en la línea media en la protrusión",
      "a": [
       "Desviación lingual derecha",
       "Desviación lingual izquierda",
       "Atrofia lingual",
       "Fasciculaciones"
      ]
     }
    ]
   },
   {
    "id": "s2",
    "h": "Examen motor",
    "f": [
     {
      "id": "f2_0",
      "l": "Deriva",
      "n": "Sin deriva pronadora ni claudicación de los miembros superiores",
      "a": [
       "Deriva pronadora derecha",
       "Deriva pronadora izquierda",
       "Claudicación de miembros superiores"
      ]
     },
     {
      "id": "f2_1",
      "l": "Golpeteo rápido de manos y pies",
      "n": "Golpeteo rápido de manos y pies conservado y simétrico",
      "a": [
       "Enlentecimiento de la mano derecha",
       "Enlentecimiento de la mano izquierda",
       "Enlentecimiento del pie derecho",
       "Enlentecimiento del pie izquierdo"
      ]
     },
     {
      "id": "f2_2",
      "l": "Tono de miembros superiores e inferiores",
      "n": "Eutonía en miembros superiores e inferiores",
      "a": [
       "Espasticidad",
       "Rigidez",
       "Hipotonía"
      ],
      "sc": {
       "s": "ashworth"
      }
     },
     {
      "id": "f2_3",
      "l": "Fuerza proximal y distal bilateral",
      "n": "Fuerza 5/5 (MRC) bilateral y simétrica en extensores y abductores de los dedos, extensores de muñeca, bíceps, tríceps, deltoides, iliopsoas, cuádriceps, flexores de rodilla y dorsiflexores del pie y del hallux",
      "a": [
       "Hemiparesia derecha",
       "Hemiparesia izquierda",
       "Paraparesia",
       "Tetraparesia",
       "Paresia distal",
       "Debilidad proximal"
      ],
      "sc": {
       "l": "Fuerza (MRC)",
       "o": [
        "0/5",
        "1/5",
        "2/5",
        "3/5",
        "4-/5",
        "4/5",
        "4+/5"
       ],
       "p": "fuerza {v}"
      }
     }
    ]
   },
   {
    "id": "s3",
    "h": "Reflejos",
    "f": [
     {
      "id": "f3_0",
      "l": "Reflejos osteotendinosos bilaterales",
      "n": "Reflejos bicipital, braquiorradial, rotuliano y aquiliano ++/++++, simétricos",
      "a": [
       "Hiperreflexia generalizada",
       "Hiperreflexia derecha",
       "Hiperreflexia izquierda",
       "Hiporreflexia",
       "Arreflexia",
       "Clonus"
      ],
      "sc": {
       "l": "ROT",
       "o": [
        "0",
        "+",
        "++",
        "+++",
        "++++"
       ],
       "p": "ROT {v}"
      }
     },
     {
      "id": "f3_1",
      "l": "Respuesta plantar",
      "n": "Respuesta plantar flexora bilateral",
      "a": [
       "Signo de Babinski derecho",
       "Signo de Babinski izquierdo",
       "Signo de Babinski bilateral"
      ]
     }
    ]
   },
   {
    "id": "s4",
    "h": "Coordinación y marcha",
    "f": [
     {
      "id": "f4_0",
      "l": "Dedo-nariz-dedo y talón-rodilla bilateral",
      "n": "Prueba dedo-nariz-dedo y talón-rodilla bilateral sin dismetría ni temblor intencional",
      "a": [
       "Dismetría derecha",
       "Dismetría izquierda",
       "Temblor intencional",
       "Ataxia apendicular"
      ]
     },
     {
      "id": "f4_1",
      "l": "Marcha y marcha en tándem",
      "n": "Marcha con base de sustentación normal; marcha en tándem sin alteraciones",
      "a": [
       "Marcha atáxica",
       "Marcha guadañante",
       "Marcha espástica",
       "Marcha en estepaje",
       "Marcha parkinsoniana",
       "Base de sustentación ampliada",
       "Imposibilidad de marcha en tándem"
      ]
     }
    ]
   },
   {
    "id": "s5",
    "h": "Sensibilidad",
    "f": [
     {
      "id": "f5_0",
      "l": "Tacto leve en manos y pies, con extinción",
      "n": "Sensibilidad táctil leve conservada en manos y pies, sin extinción",
      "a": [
       "Hipoestesia táctil distal",
       "Hipoestesia unilateral",
       "Extinción sensitiva"
      ]
     },
     {
      "id": "f5_1",
      "l": "Dolor o temperatura en pies",
      "n": "Sensibilidad dolorosa o térmica conservada en ambos pies",
      "a": [
       "Hipoestesia termoalgésica distal",
       "Hipoestesia unilateral"
      ]
     },
     {
      "id": "f5_2",
      "l": "Vibración y posición articular en pies",
      "n": "Sensibilidad vibratoria y artrocinética conservada en ambos pies",
      "a": [
       "Hipopalestesia distal",
       "Alteración de la sensibilidad artrocinética"
      ]
     }
    ]
   }
  ]
 }
];
