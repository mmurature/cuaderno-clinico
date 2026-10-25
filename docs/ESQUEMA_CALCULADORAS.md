# Esquema del catálogo «Fórmulas y Scores»

Cada archivo de `src/calc/lib/` exporta `export default [ ... ]` con herramientas. Pueden importar ayudas de `../h.js`
(`rd`, `pts`, `band`, `years`, `days`, `U`) y, solo para ASIA, `isncsci` de `../../evo/scales.js`.

## Herramienta

```js
{
  id: 'ag',                       // único en todo el catálogo, kebab-case
  m: 'f',                         // 'f' = Fórmulas · 's' = Scores y escalas
  cat: 'acido-base',              // categoría PRINCIPAL (ver lista)
  tags: ['f:endocrino'],          // accesos cruzados 'módulo:categoría' (no se duplica la herramienta)
  n: 'Anion gap (brecha aniónica)',
  sig: 'AG',                      // sigla (puede ser '')
  syn: ['brecha anionica', 'gap'],// sinónimos para el buscador (opcional)
  tipo: 'cálculo',                // cálculo · estimación · índice · dosificación · conversión · score pronóstico · escala clínica · regla de decisión · clasificación · criterio diagnóstico
  fin: 'Para qué sirve, en una o dos oraciones.',
  ver: 'Versión o año de la herramienta (p. ej. «CKD-EPI 2021, sin coeficiente racial»)',
  formula: 'AG = Na⁺ − (Cl⁻ + HCO₃⁻)',  // fórmula o método exacto (texto; puede tener saltos de línea \n)
  in: [ /* entradas */ ],
  calc: v => ({ /* resultado */ }), // recibe valores ya validados y convertidos; devuelve null si no corresponde calcular
  ref: 'Autores. Título. Revista. Año;vol:páginas.',
  url: 'https://doi.org/...',     // opcional
  verif: '2026-10',               // fecha de verificación
  pop: 'Población en la que fue validada',
  lim: 'Limitaciones y advertencias (se muestran junto al resultado).',
  pend: 'Motivo',                 // SOLO si no se pudo verificar: la herramienta aparece como «pendiente de verificación» y no calcula
  tests: [ { v: { na: 140, cl: 104, hco3: 24 }, r: 12 } ]   // casos de prueba con resultado de referencia
}
```

## Entradas (`in`)

| `t` | Uso | Propiedades |
|---|---|---|
| `num` | número | `id`, `l` (etiqueta), `u` (unidad canónica), `min`, `max`, `step`, `req` (por defecto obligatorio; `req: 0` = opcional), `alt: [U.creat_umol]` unidades alternativas que se convierten a la canónica |
| `sel` | opción única | `o: [[valor, 'Etiqueta', puntos?], …]`; si el 3.er elemento es número, `pts()` lo suma |
| `chk` | criterio sí/no | `pts` (por defecto 1). Sin marcar = no (nunca «faltante»). Usar solo cuando el criterio original es presente/ausente. |
| `date` | fecha | `id`, `l` |
| `head` | subtítulo visual | `l` |

Reglas: el motor no llama a `calc` si falta una entrada obligatoria o un valor está fuera de `min`/`max`. Nunca completar un campo vacío como cero o normal. Si un score necesita todos sus ítems, que sean `sel` obligatorios (no `chk`).

## Resultado

```js
{ r: 12, u: 'mEq/L', d: 0,          // valor principal, unidad y decimales
  lab: 'Anion gap',                 // rótulo del valor (opcional)
  interp: 'Elevado (> 12 mEq/L)',   // interpretación conforme a la fuente (opcional)
  lvl: 'warn',                      // 'ok' | 'warn' | 'bad' | ''  (color del resultado)
  more: [['Delta ratio', '1,4']],   // resultados secundarios (opcional)
  note: 'Nota que depende del caso' // advertencia contextual (opcional)
}
```

`r` puede ser texto cuando el resultado no es numérico (clasificaciones, criterios cumplidos o no).

## Categorías

Fórmulas (`m: 'f'`): `acido-base`, `medio-interno`, `fluidos`, `farmacos`, `hemodinamia`, `respiratorio`, `nefrologia`,
`antropometria`, `cardiologia`, `neuro`, `hematologia`, `gastro`, `endocrino`, `nutricion`, `obstetricia`, `pediatria`, `epidemiologia`.

Scores (`m: 's'`): `neuro`, `cardiologia`, `uti`, `resp-infecto`, `nefrologia`, `cirugia`, `gastro`, `hematologia`, `endocrino`,
`infectologia`, `trauma`, `nutricion`, `obstetricia`, `pediatria`, `anestesia`, `reuma`, `dermato`, `epidemiologia`.

## Exactitud

- Fórmulas y scores publicados, con coeficientes, puntos y umbrales verificados contra la fuente original o una guía oficial.
- Versión explícita cuando hay varias. No inventar puntos, umbrales, interpretaciones ni bibliografía.
- Si no se puede verificar, `pend` con el motivo y sin `calc`.
- Sin recomendaciones terapéuticas automáticas. Un resultado nunca es un diagnóstico.
- Validar: `node scripts/validar-calc.mjs src/calc/lib/<archivo>.js` (estructura y casos de prueba).
