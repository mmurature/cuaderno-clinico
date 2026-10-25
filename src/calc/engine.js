// Motor de «Fórmulas y Scores»: valida entradas, convierte unidades y llama al cálculo. Sin DOM.
// Nunca completa un campo vacío con cero ni con un valor «normal».
export function prep(T, raw, units = {}) {
  const v = {}, miss = [];
  for (const i of T.in) {
    if (i.t == 'head') continue;
    let x = raw[i.id];
    if (i.t == 'chk') { v[i.id] = !!x; continue; }
    if (x === undefined || x === '' || x === null) { if (i.req === 0) { v[i.id] = null; continue; } miss.push(i.l); continue; }
    if (i.t == 'num') {
      x = +String(x).replace(',', '.');
      if (!isFinite(x)) return { bad: `${i.l}: valor no válido` };
      const k = +units[i.id] || 0;
      if (k > 0 && i.alt && i.alt[k - 1]) x = i.alt[k - 1].f(x);
      if ((i.min != null && x < i.min) || (i.max != null && x > i.max)) return { bad: `${i.l}: fuera del rango admitido (${i.min ?? '−∞'} a ${i.max ?? '∞'} ${i.u || ''})` };
    } else if (i.t == 'sel') {
      const o = (i.o || []).find(o => String(o[0]) === String(x)); if (!o) return { bad: `${i.l}: opción no válida` }; x = o[0];
    }
    v[i.id] = x;
  }
  return miss.length ? { miss } : { v };
}
export function run(T, raw, units) {
  const p = prep(T, raw, units);
  if (!p.v) return p;
  let r; try { r = T.calc(p.v); } catch (e) { return { bad: 'No se pudo calcular con estos valores.' }; }
  return r ? { r } : { bad: 'Con estos valores el cálculo no corresponde.' };
}
