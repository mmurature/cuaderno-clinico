// Valida el catálogo de Fórmulas y Scores y corre los casos de prueba.
// Uso: node scripts/validar-calc.mjs src/calc/lib/archivo.js [...]   (sin argumentos: todos)
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { prep } from '../src/calc/engine.js';

const FC = ['acido-base', 'medio-interno', 'fluidos', 'farmacos', 'hemodinamia', 'respiratorio', 'nefrologia', 'antropometria', 'cardiologia', 'neuro', 'hematologia', 'gastro', 'endocrino', 'nutricion', 'obstetricia', 'pediatria', 'epidemiologia'];
const SC = ['neuro', 'cardiologia', 'uti', 'resp-infecto', 'nefrologia', 'cirugia', 'gastro', 'hematologia', 'endocrino', 'infectologia', 'trauma', 'nutricion', 'obstetricia', 'pediatria', 'anestesia', 'reuma', 'dermato', 'epidemiologia'];
const KEYS = ['id', 'm', 'cat', 'tags', 'n', 'sig', 'syn', 'tipo', 'fin', 'ver', 'formula', 'in', 'calc', 'ref', 'url', 'verif', 'pop', 'lim', 'pend', 'tests'];
const errs = [], warn = []; let ok = 0, nt = 0;
const E = (w, m) => errs.push(w + ': ' + m), W = (w, m) => warn.push(w + ': ' + m);

let files = process.argv.slice(2);
const dir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../src/calc/lib');
if (!files.length) files = fs.readdirSync(dir).filter(f => f.endsWith('.js') && f != 'index.js').map(f => path.join(dir, f));
const seen = new Map();

for (const file of files) {
  const T = (await import(pathToFileURL(path.resolve(file)).href)).default;
  if (!Array.isArray(T)) { E(file, 'no exporta un array'); continue; }
  for (const t of T) {
    const w = path.basename(file) + ' › ' + t.id;
    Object.keys(t).forEach(k => KEYS.includes(k) || E(w, 'propiedad desconocida ' + k));
    if (!t.id || !t.n || !['f', 's'].includes(t.m)) { E(w, 'falta id/n/m'); continue; }
    if (seen.has(t.id)) E(w, 'id repetido (también en ' + seen.get(t.id) + ')'); seen.set(t.id, path.basename(file));
    if (!(t.m == 'f' ? FC : SC).includes(t.cat)) E(w, 'categoría inválida ' + t.cat);
    (t.tags || []).forEach(g => { const [m, c] = g.split(':'); if (!['f', 's'].includes(m) || !(m == 'f' ? FC : SC).includes(c)) E(w, 'tag inválido ' + g); });
    ['tipo', 'fin', 'ref', 'lim', 'ver'].forEach(k => t[k] || W(w, 'sin ' + k));
    if (t.pend) { if (t.calc) W(w, 'pendiente pero con calc'); continue; }
    if (typeof t.calc != 'function' || !Array.isArray(t.in)) { E(w, 'sin calc o sin in'); continue; }
    if (!t.formula) W(w, 'sin formula/método');
    const ids = new Set();
    t.in.forEach(i => { if (i.t == 'head') return; if (!i.id || !i.l || !['num', 'sel', 'chk', 'date'].includes(i.t)) E(w, 'entrada mal formada ' + JSON.stringify(i).slice(0, 80)); if (ids.has(i.id)) E(w, 'entrada repetida ' + i.id); ids.add(i.id); if (i.t == 'sel' && !(Array.isArray(i.o) && i.o.length)) E(w, 'sel sin opciones ' + i.id); });
    if (!(t.tests || []).length) { E(w, 'sin casos de prueba'); continue; }
    t.tests.forEach((c, k) => {
      nt++;
      const p = prep(t, c.v);
      if (!p.v) return E(w, `prueba ${k + 1}: entrada ${p.miss ? 'faltante ' + p.miss : 'inválida ' + p.bad}`);
      let r; try { r = t.calc(p.v); } catch (e) { return E(w, `prueba ${k + 1}: excepción ${e.message}`); }
      if (!r) return E(w, `prueba ${k + 1}: calc devolvió null`);
      const tol = c.tol ?? (typeof c.r == 'number' ? Math.max(Math.abs(c.r) * 0.005, 0.01) : 0);
      const good = typeof c.r == 'number' ? Math.abs(+r.r - c.r) <= tol : String(r.r).toLowerCase().includes(String(c.r).toLowerCase()) || String(r.interp || '').toLowerCase().includes(String(c.r).toLowerCase());
      if (!good) E(w, `prueba ${k + 1}: esperado ${c.r}, obtenido ${r.r}${r.interp ? ' (' + r.interp + ')' : ''}`); else ok++;
    });
    // un caso con un obligatorio faltante no debe calcular
    const req = t.in.find(i => ['num', 'sel'].includes(i.t) && i.req !== 0);
    if (req && t.tests[0]) { const v = { ...t.tests[0].v }; delete v[req.id]; if (prep(t, v).v) E(w, 'falta un obligatorio y aun así calcula'); }
  }
}
warn.forEach(x => console.log('aviso  ' + x));
errs.forEach(x => console.log('ERROR  ' + x));
console.log(`${seen.size} herramienta(s), ${ok}/${nt} pruebas OK, ${errs.length} error(es)`);
process.exit(errs.length ? 1 : 0);
