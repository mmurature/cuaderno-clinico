// Biblioteca de partes quirúrgicos incorporados: solo Cirugía general y Neurocirugía.
import a from './cg-abdominal.js';
import b from './cg-pared.js';
import c from './cg-otros.js';
import d from './nc-craneal.js';
import e from './nc-lcr-vascular.js';
import f from './nc-columna.js';
const ALL = [...a, ...b, ...c, ...d, ...e, ...f];
const base = new Map(ALL.filter(t => !t.alias).map(t => [t.id, t]));
// Un alias es la misma plantilla con una variante preseleccionada (set): se resuelve una sola vez, sin duplicar el contenido.
export const PBUILTIN = ALL.map(t => (t.alias ? { ...base.get(t.alias), id: t.id, n: t.n, cat: t.cat, syn: t.syn || [], aliasOf: t.alias, set: t.set || {} } : t));
