// Ayudas puras para las calculadoras de «Fórmulas y Scores». Sin DOM.

// Redondeo seguro
export const rd = (x, d = 1) => (x == null || !isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);

// Suma de puntos de los criterios: chk (pts si está marcado) y sel (3.er elemento de la opción)
export function pts(v, ins) {
  return ins.reduce((t, i) => {
    if (i.t == 'chk') return t + (v[i.id] ? (i.pts ?? 1) : 0);
    if (i.t == 'sel') { const o = (i.o || []).find(o => String(o[0]) === String(v[i.id])); return t + (o && typeof o[2] == 'number' ? o[2] : 0); }
    return t;
  }, 0);
}

// Banda de interpretación: bands = [[min, max, 'texto', 'ok'|'warn'|'bad'], …] (incluye extremos)
export function band(x, bands) {
  const b = bands.find(([mn, mx]) => x >= mn && x <= mx);
  return b ? { interp: b[2], lvl: b[3] || '' } : { interp: '', lvl: '' };
}

// Edad en años a partir de una fecha ISO (o null)
export const years = d => (d ? (Date.now() - new Date(d + 'T12:00:00')) / (365.25 * 864e5) : null);
export const days = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);

// Conversiones de unidades frecuentes (al valor canónico)
export const U = {
  creat_umol: { u: 'µmol/L', f: x => x / 88.42 },      // → mg/dL
  glu_mmol: { u: 'mmol/L', f: x => x * 18.016 },        // → mg/dL
  urea_mmol: { u: 'mmol/L', f: x => x * 6.006 },        // urea → mg/dL
  bun_mgdl: { u: 'BUN mg/dL', f: x => x * 2.14 },       // BUN → urea mg/dL
  alb_gl: { u: 'g/L', f: x => x / 10 },                 // → g/dL
  ca_mmol: { u: 'mmol/L', f: x => x * 4.008 },          // → mg/dL
  bili_umol: { u: 'µmol/L', f: x => x / 17.1 },         // → mg/dL
  hb_gl: { u: 'g/L', f: x => x / 10 },                  // → g/dL
  lb: { u: 'lb', f: x => x * 0.4536 },                  // → kg
  inch: { u: 'pulgadas', f: x => x * 2.54 },            // → cm
  kpa: { u: 'kPa', f: x => x * 7.5006 },                // → mmHg
  f_temp: { u: '°F', f: x => (x - 32) * 5 / 9 }         // → °C
};
