# Esquema de plantillas de Meditas

Hay dos bibliotecas declarativas: **evoluciones** (`src/evo/lib/*.js`) y **partes quirúrgicos** (`src/partes/lib/*.js`).
Cada archivo exporta `export default [ ... ]`, un array de plantillas. Son datos puros: sin funciones ni imports.
El motor convierte los datos estructurados en texto médico natural. **Las etiquetas de los campos (`l`) nunca aparecen
en el texto final**: lo que se escribe son las frases (`n`, `a`, `ne`, `p`, `y`, …).

Reglas de redacción para quien escribe plantillas:

- Español médico rioplatense, terminología estándar, frases cortas y directas. Género gramatical masculino
  (el motor adapta a femenino las palabras más comunes cuando se elige paciente femenino).
- Cada opción de alteración es **la frase clínica exacta** que se va a escribir, completa y con lateralidad cuando
  corresponde: `'Paresia facial central derecha'`, no `'Derecha'`.
- Las alteraciones con lado van como pares separados: `'Babinski derecho'`, `'Babinski izquierdo'`. Si se marcan las
  dos, el motor escribe «Babinski bilateral». No hace falta una opción «bilateral» aparte (se puede, si es otra cosa).
- Nunca inferir diagnósticos ni etiologías. Nunca dar por hecho algo que no se marcó («sin complicaciones»,
  «permeable», «hemostasia adecuada»…): eso solo puede salir de una opción que el usuario elige.
- Sin dos puntos tipo etiqueta en ninguna frase (`'Fuerza: 4/5'` está prohibido). Excepción: ninguna.
- Sin punto final en las frases: el motor arma las oraciones y pone la puntuación.
- Las frases normales usan términos convencionales: «conservado», «sin particularidades», «eupneico», «afebril»,
  «lúcido», «orientado en tiempo, espacio y persona».

---

## 1. Evoluciones

```js
export default [
  {
    id: 'n-tce',                       // único en toda la biblioteca, kebab-case
    n: 'Traumatismo craneoencefálico', // nombre visible
    cat: 'Neurología · Patologías',    // categoría por defecto (la usuaria la puede cambiar)
    v: 1,                              // versión de la plantilla
    d: 'Mecanismo, Glasgow, pupilas, neuroimagen y dispositivos', // descripción corta (opcional)
    secs: [
      { id: 'cons', h: 'Conciencia', f: [ /* campos */ ] },
      { id: 'img', h: 'Neuroimagen', off: true, f: [ /* … */ ] } // off: módulo desactivado por defecto
    ]
  }
];
```

Cada apartado (`secs`) es un paso de la pantalla y un módulo que se puede activar o desactivar.
Los `id` de campo deben ser únicos **dentro de la plantilla**.

### 1.1 Campo genérico (sin `k`)

Tiene tres estados en la interfaz: **Normal**, **Alterado** (se eligen opciones) y **No evaluable**.
Si el usuario no toca el campo, no aparece en el texto.

| Propiedad | Uso |
|---|---|
| `id` | identificador |
| `l` | etiqueta visible en la interfaz (nunca en el texto) |
| `n` | frase si está **Normal**. Omitirla si el campo no tiene estado normal (por ejemplo «Mecanismo»). |
| `a` | opciones de alteración. Cada una es un string (la frase) o `['Etiqueta corta', 'frase de salida']`. |
| `one` | `true` = se elige una sola opción de `a` (por defecto se pueden elegir varias) |
| `ap` | prefijo antes de la lista de alteraciones, p. ej. `'con '` |
| `ne` | frase si está **No evaluable** (p. ej. `'Marcha no evaluable'`). Si no está, «no evaluable» se omite. |
| `d` | si existe, muestra un campo de detalle libre; el texto es el placeholder (p. ej. `'lado, localización'`). El detalle se agrega después de una coma. |
| `sc` | escala asociada: `{ s: 'eva' }` (escala incorporada, ver 1.3) o `{ l: 'Godet', o: ['+', '++', '+++', '++++'], p: 'Godet {v}' }` |
| `num` | número asociado: `{ l: 'Débito', u: 'mL/h', p: 'débito de {v} mL/h' }` |
| `j` | conector: en vez de empezar oración nueva, se pega al fragmento anterior del mismo apartado (en minúscula). Valores típicos: `', '`, `' '`, `', con '`. |
| `nom` | sintagma para frases de evolución temporal: `'del déficit motor'` → «Mejoría del déficit motor, actualmente…». |
| `pri` | prioridad 1–13 según la lista del documento (1 = nivel de conciencia … 13 = hallazgos normales). Opcional. |

Ejemplo, del aparato respiratorio:

```js
{ id: 'patron', l: 'Patrón respiratorio', n: 'Eupneico', a: ['Taquipneico', 'Bradipneico', 'Apneico', 'Con uso de músculos accesorios'] },
{ id: 'ausc', l: 'Auscultación', n: 'Murmullo vesicular conservado bilateralmente', a: ['Murmullo vesicular disminuido', 'Murmullo vesicular ausente'], d: 'localización (p. ej. en base derecha)' },
{ id: 'ruidos', l: 'Ruidos agregados', n: 'sin ruidos agregados', ap: 'con ', a: ['sibilancias', 'roncus', 'crepitantes', 'estertores', 'estridor', 'roce pleural'], d: 'distribución (p. ej. bibasales)', j: ', ' }
```
→ «Eupneico. Murmullo vesicular conservado bilateralmente, sin ruidos agregados.»
→ «Taquipneico, con uso de músculos accesorios. Murmullo vesicular disminuido, en base derecha, con crepitantes, bibasales.»

### 1.2 Campos simples con `k`

```js
{ id: 'mec', k: 'text', l: 'Mecanismo', p: 'Traumatismo por {v}', ph: 'caída de propia altura' }   // texto libre
{ id: 'dpo', k: 'num',  l: 'Día postoperatorio', p: 'Día {v} de postoperatorio', u: '' }           // número
{ id: 'hh',  k: 'scale', s: 'hh' }                                                                  // escala incorporada
{ id: 'x',   k: 'scale', l: 'Mi escala', o: [['1', 'descripción'], ['2', '…']], p: 'Mi escala {v}' } // escala propia
```

### 1.3 Componentes especiales (solo `id`, `k` y opcionalmente `l`, `j`)

| `k` | Qué hace | Ejemplo de salida |
|---|---|---|
| `gcs` | Glasgow O/V/M (V puede ser «T» intubado). Calcula total, compara con la evaluación previa. | «Glasgow 13/15 (O3 V4 M6), con deterioro del nivel de conciencia» |
| `conc` | Estado de conciencia (vigil, somnoliento, obnubilado, estuporoso, comatoso, agitado, confuso) | «Vigil» |
| `orient` | Orientación en tiempo, espacio y persona por separado | «Desorientado en tiempo y espacio» |
| `pupils` | Diámetro, forma y reactividad de cada pupila | «Anisocoria con midriasis derecha, ambas pupilas fotorreactivas» |
| `mrc4` | Fuerza MRC 0–5 de MSD, MSI, MID, MII; reconoce hemi/para/tetra/monoparesia | «Hemiparesia derecha 3/5» |
| `motor` | Fuerza por grupo muscular (deltoides … flexores plantares), por lado, con raíz | «Déficit de dorsiflexión derecha 4/5 (L4)» |
| `rot` | ROT bicipital, tricipital, estilorradial, patelar, aquíleo, por lado (0 a ++++) | «Hiperreflexia patelar y aquílea bilateral (+++)» |
| `patol` | Babinski, Hoffmann y clonus por lado | «Babinski derecho» |
| `sens` | Hallazgos sensitivos: tipo, modalidades, distribución, lado | «Hipoestesia en territorio L5 derecho» |
| `nihss` | Los 15 ítems oficiales del NIHSS, total automático, comparación | «NIHSS 8, con descenso de 4 puntos respecto del control previo» |
| `asia` | ISNCSCI: motor de músculos clave, tacto ligero y pinchazo por dermatoma, función sacra; calcula nivel neurológico, AIS y ZPP | «AIS C, nivel neurológico C6» |
| `vitals` | T, PA, PAM, FC, FR, SatO₂ con soporte de O₂, glucemia; marca valores fuera de rango | «Afebril, FC 78 lpm, PA 120/70 mmHg, FR 16 rpm, SatO₂ 98% al aire ambiente» |
| `lab` | Valores de laboratorio con unidades y rangos de referencia | «Laboratorio: Hb 10,2 g/dL, leucocitos 14.200/mm³…» |
| `dev` | Dispositivos y drenajes (catéteres, sondas, DVE, drenajes…) con permeabilidad, débito, sitio de inserción. Opcional `types: ['DVE', …]` para restringir la lista. | «DVE derecho permeable, abierto a 10 cmH₂O, con débito de 8 mL/h de aspecto serohemático» |

Escalas incorporadas para `k: 'scale'` (o `sc: { s: … }`): `hh` (Hunt-Hess), `wfns`, `mfisher` (Fisher modificada),
`mrs` (Rankin modificada), `rass`, `eva` (0–10), `marshall` (TC en TCE), `ashworth`, `mjoa`, `nurick`, `frankel`.

---

## 2. Partes quirúrgicos

```js
export default [
  {
    id: 'cg-apl',
    n: 'Apendicectomía laparoscópica',
    sp: 'Cirugía general',          // especialidad
    sub: 'Colorrectal',             // subespecialidad (opcional)
    v: 1,
    ctx: 'Apendicitis aguda confirmada o sospechada. Abordaje laparoscópico de tres puertos.', // indicaciones y contexto
    lat: false,                     // true si el procedimiento requiere lateralidad (activa el campo común `lat`)
    f: [ /* campos específicos */ ],
    pasos: [ /* pasos sugeridos, en orden */ ],
    ej: 'Texto de ejemplo de un parte generado con todos los datos confirmados.'
  }
];
```

### 2.1 Campos de parte

| Propiedad | Uso |
|---|---|
| `id`, `l` | identificador y etiqueta visible |
| `sec` | sección donde se inserta: `'B'` preparación y abordaje · `'C'` hallazgos · `'D'` técnica (después de los pasos) · `'E'` material y dispositivos · `'F'` pieza y muestras · `'G'` hemostasia, cierre y finalización · `'H'` postoperatorio inmediato |
| `k` | `'opt'` una opción · `'multi'` varias · `'yn'` sí/no · `'text'` texto libre · `'num'` número |
| `o` | opciones de `opt`/`multi`: `['Etiqueta', 'frase']`. La frase puede llevar `{d}` para el detalle libre. |
| `p` | envoltorio de la frase: `'Se identifica apéndice {v}'`. En `multi`, `{v}` es la lista unida con comas y «y». En `text`/`num`, `{v}` es el valor. |
| `y`, `n` | frases de `yn` para «sí» y «no» (p. ej. `y: 'Se realiza lavado de la cavidad'`, `n: 'No se realiza lavado'`) |
| `u` | unidad de `num` |
| `req` | `1` = obligatorio para finalizar el parte |
| `ph` | placeholder del texto libre o del detalle |
| `if` | `['otroCampo', 'valor']` = se muestra y se usa solo si el otro campo tiene ese valor (en `yn`, el valor es `'si'` o `'no'`) |

Estados de todos los campos: sin completar = **no documentado** (no se escribe nada; si es `req`, queda pendiente),
**no aplica** (se omite y deja de estar pendiente), y en `opt`/`multi`/`yn`, los valores elegidos. El motor nunca convierte
un campo vacío en un hallazgo negativo.

### 2.2 Campos comunes (los provee el motor; no repetirlos salvo para reemplazarlos)

A (encabezado): `proc` procedimiento, `dxpre`, `dxpos`, `fecha`, `hora`, `serv`, `cir`, `ayu`, `anest`, `tanest`, `urg`, `prim`.
B: `pos` posición, `asep` antisepsia y campos, `atb` profilaxis antibiótica, `tep` profilaxis tromboembólica, `lat` lateralidad (si `lat: true`), `abord` abordaje/incisión (texto).
C: `hall` hallazgos libres. D: `dific` dificultades técnicas, `estr` cambio de estrategia, `conv` conversión.
E: `mat` otro material. F: `pieza` (se obtiene / no se obtiene), `pdesc` descripción, `ap` Anatomía Patológica, `micro` microbiología, `nmu` número de muestras.
G: `hemo` hemostasia, `irrig` irrigación y aspiración, `dren` drenaje (sí/no) + `dtipo` tipo y ubicación, `cierre` cierre por planos, `piel` cierre cutáneo, `cur` curación, `rec` recuento de gasas e instrumental, `compl` complicaciones + `cdesc`.
H: `dest` destino, `efin` estado al finalizar, `disp` dispositivos que quedan, `ind` indicaciones documentadas, `obs` observaciones.

Si una plantilla define un campo con el mismo `id` que uno común, lo reemplaza (por ejemplo, un `dren` con opciones
específicas). Los campos comunes `compl`, `rec`, `dren`, `hemo` y, si hay pieza, `ap` son obligatorios.

### 2.3 Pasos

`pasos` es la secuencia habitual del procedimiento. Son **sugerencias**: en la interfaz cada paso arranca sin confirmar y
el usuario confirma, edita, reordena, agrega o quita. En el parte se escriben solo los confirmados, en el orden de la lista.

- Cada paso es una oración impersonal en presente: «Se realiza…», «Se identifica…», «Se procede a…».
- Un paso describe la maniobra, nunca su resultado («Se realiza hemostasia con electrocauterio», no «…con adecuada hemostasia»).
- Un paso puede citar un campo con `{idDelCampo}`: «Se secciona la base apendicular con {base}». Si ese campo no se completa,
  el paso queda marcado como incompleto.
- Sin punto final.

### 2.4 Catálogo por categorías, variantes y modo rápido (versión 2)

Propiedades nuevas de la plantilla:

| Propiedad | Uso |
|---|---|
| `cat` | categoría del catálogo, exactamente como figura en la lista de la especialidad (p. ej. `'Cirugía abdominal y digestiva'`) |
| `syn` | sinónimos y abreviaturas para el buscador: `['apendicectomía videolaparoscópica', 'VLP', 'apéndice']` |
| `ref` | fuentes usadas para armar la plantilla (técnica y campos) |
| `rev` | fecha de revisión de la plantilla, `'2026-10'` |
| `alias` / `set` | entrada del catálogo que reutiliza otra plantilla con una variante preseleccionada: `{ id: 'cg-hing-tep', n: 'Hernioplastia inguinal laparoscópica TEP', cat: '…', syn: [...], alias: 'cg-hing', set: { via: 'TEP' } }`. Una entrada alias no lleva `f` ni `pasos`. |

Propiedades nuevas de los campos:

| Propiedad | Uso |
|---|---|
| `vr: 1` | campo de **variante** (técnica, lado, nivel, localización, primaria/revisión): se pregunta en el paso «Variante», antes del formulario |
| `q: 1` | campo esencial: aparece también en el **parte rápido**. En el parte detallado aparecen todos. Los `req` siempre aparecen. |
| `if` | `['campo', 'valor']` o `['campo', ['valor1', 'valor2']]` (cualquiera de los valores). En `opt` el valor es la etiqueta de la opción; en `yn`, `'si'`/`'no'`. |
| `ifn` | igual que `if` pero negado: el campo se muestra si el otro **no** tiene ese valor |

Pasos condicionados a la variante: un paso puede ser un string o `{ t: 'Se realiza …', if: ['via', 'TAPP'] }`
(también `ifn`). Al confirmar la variante se arma la lista de pasos que corresponde.

Campos comunes nuevos (los provee el motor): `prog` procedimiento programado (si difiere del realizado), `indic` indicación quirúrgica,
`sangr` pérdida sanguínea estimada (mL), `fluid` fluidos administrados, `resp` profesional responsable, `matric` matrícula, `estid` estructuras identificadas y preservadas (sección C).
Usar campos específicos para «estructuras anatómicas identificadas y preservadas» (sección C o D) cuando la técnica lo requiere.
