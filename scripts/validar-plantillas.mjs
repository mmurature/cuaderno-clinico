// Valida la estructura de las bibliotecas de plantillas. Uso: node scripts/validar-plantillas.mjs archivo.js [...]
import { pathToFileURL } from 'node:url';

const SPECIAL = ['gcs', 'conc', 'orient', 'pupils', 'mrc4', 'motor', 'rot', 'patol', 'sens', 'nihss', 'asia', 'vitals', 'lab', 'dev'];
const SCALES = ['hh', 'wfns', 'mfisher', 'mrs', 'rass', 'eva', 'marshall', 'ashworth', 'mjoa', 'nurick', 'frankel'];
const EVF = ['id', 'k', 'l', 'n', 'a', 'one', 'ap', 'ne', 'd', 'sc', 'num', 'j', 'nom', 'pri', 'p', 'ph', 'u', 's', 'o', 'types', 'lo', 'hi'];
const PF = ['id', 'l', 'sec', 'k', 'o', 'p', 'y', 'n', 'u', 'req', 'ph', 'if', 'ifn', 'def', 'vr', 'q'];
const COMMON = ['proc', 'dxpre', 'dxpos', 'fecha', 'hora', 'serv', 'cir', 'ayu', 'anest', 'tanest', 'urg', 'prim', 'pos', 'asep', 'atb', 'tep', 'lat', 'abord', 'hall', 'dific', 'estr', 'conv', 'mat', 'pieza', 'pdesc', 'ap', 'micro', 'nmu', 'hemo', 'irrig', 'dren', 'dtipo', 'cierre', 'piel', 'cur', 'rec', 'compl', 'cdesc', 'dest', 'efin', 'disp', 'ind', 'obs', 'prog', 'indic', 'sangr', 'fluid', 'resp', 'matric', 'estid', 'hmet', 'convm'];

const errs = [], warn = [], aliases = [], all = new Map();
const E = (w, m) => errs.push(w + ': ' + m), W = (w, m) => warn.push(w + ': ' + m);
const phrases = [];
const isStr = x => typeof x == 'string' && x.trim();
const optPhrase = o => (Array.isArray(o) ? o[1] : o);

function checkPhrase(w, s) {
  if (typeof s != 'string') return;
  phrases.push(s);
  if (/^[A-ZÁÉÍÓÚa-záéíóúñ ]{2,40}:\s/.test(s)) E(w, `frase con etiqueta «${s}»`);
  if (/\.\s*$/.test(s) && !/(etc|mm|cm)\.$/.test(s)) W(w, `frase con punto final «${s}»`);
}

function evo(T, file) {
  const ids = new Set();
  for (const t of T) {
    const w = `${file} › ${t.id}`;
    if (!isStr(t.id) || !isStr(t.n) || !isStr(t.cat) || !Array.isArray(t.secs)) { E(w, 'falta id/n/cat/secs'); continue; }
    const fids = new Set(), sids = new Set();
    t.secs.forEach(s => {
      const ws = w + ' › ' + s.id;
      if (!isStr(s.id) || !isStr(s.h) || !Array.isArray(s.f) || !s.f.length) E(ws, 'apartado sin id/h/f');
      if (sids.has(s.id)) E(ws, 'id de apartado repetido'); sids.add(s.id);
      s.f.forEach(f => {
        const wf = ws + ' › ' + f.id;
        if (!isStr(f.id)) return E(ws, 'campo sin id');
        if (fids.has(f.id)) E(wf, 'id de campo repetido'); fids.add(f.id);
        Object.keys(f).forEach(k => EVF.includes(k) || E(wf, 'propiedad desconocida ' + k));
        if (f.k && !['text', 'num', 'scale', ...SPECIAL].includes(f.k)) E(wf, 'k desconocido ' + f.k);
        if (f.k == 'scale' && !f.s && !Array.isArray(f.o)) E(wf, 'escala sin s ni o');
        if (f.k == 'scale' && f.s && !SCALES.includes(f.s)) E(wf, 'escala incorporada desconocida ' + f.s);
        if (f.sc && f.sc.s && !SCALES.includes(f.sc.s)) E(wf, 'sc.s desconocida ' + f.sc.s);
        if (!f.k) {
          if (!isStr(f.l)) E(wf, 'campo genérico sin l');
          if (!f.n && !(f.a && f.a.length) && !f.ne) E(wf, 'campo genérico sin n, a ni ne');
          (f.a || []).forEach(o => { if (Array.isArray(o) && (o.length != 2 || !isStr(o[0]) || !isStr(o[1]))) E(wf, 'opción mal formada'); checkPhrase(wf, optPhrase(o)); });
          checkPhrase(wf, f.n); checkPhrase(wf, f.ne);
        }
        if ((f.k == 'text' || f.k == 'num') && !isStr(f.p)) E(wf, 'text/num sin p');
        if (f.p && f.k != 'scale' && !String(f.p).includes('{v}')) E(wf, 'p sin {v}');
      });
    });
    if (ids.has(t.id)) E(w, 'id de plantilla repetido'); ids.add(t.id);
  }
}

function partes(T, file) {
  for (const t of T) {
    const w = `${file} › ${t.id}`;
    if (t.alias) { if (!isStr(t.id) || !isStr(t.n) || !isStr(t.cat)) E(w, 'alias sin id/n/cat'); aliases.push([w, t.alias, t.set || {}]); continue; }
    if (!isStr(t.id) || !isStr(t.n) || !isStr(t.sp) || !Array.isArray(t.f) || !Array.isArray(t.pasos)) { E(w, 'falta id/n/sp/f/pasos'); continue; }
    all.set(t.id, t);
    if (!isStr(t.cat)) W(w, 'sin cat'); if (!isStr(t.ref)) W(w, 'sin ref');
    if (!isStr(t.ctx)) W(w, 'sin ctx'); if (!isStr(t.ej)) W(w, 'sin ej');
    const ids = new Set();
    t.f.forEach(f => {
      const wf = w + ' › ' + f.id;
      if (!isStr(f.id) || !isStr(f.l)) return E(wf, 'campo sin id/l');
      if (ids.has(f.id)) E(wf, 'id repetido'); ids.add(f.id);
      Object.keys(f).forEach(k => PF.includes(k) || E(wf, 'propiedad desconocida ' + k));
      if (!'ABCDEFGH'.includes(f.sec) || !f.sec) E(wf, 'sec inválida ' + f.sec);
      if (!['opt', 'multi', 'yn', 'text', 'num'].includes(f.k)) E(wf, 'k inválido ' + f.k);
      if ((f.k == 'opt' || f.k == 'multi') && !(Array.isArray(f.o) && f.o.length && f.o.every(o => Array.isArray(o) && o.length == 2))) E(wf, 'o mal formado');
      if (f.k == 'yn' && !isStr(f.y)) E(wf, 'yn sin y');
      if ((f.k == 'text' || f.k == 'num') && !(f.p || '').includes('{v}')) E(wf, 'text/num sin p con {v}');
      (f.o || []).forEach(o => checkPhrase(wf, o[1])); checkPhrase(wf, f.y); checkPhrase(wf, f.n);
      if (f.if && !(Array.isArray(f.if) && f.if.length == 2)) E(wf, 'if mal formado');
      if (f.ifn && !(Array.isArray(f.ifn) && f.ifn.length == 2)) E(wf, 'ifn mal formado');
      if (COMMON.includes(f.id)) W(wf, 'reemplaza un campo común');
    });
    t.f.forEach(f => { if (f.if && !ids.has(f.if[0]) && !COMMON.includes(f.if[0])) E(w + ' › ' + f.id, 'if apunta a un campo inexistente ' + f.if[0]); });
    t.pasos.forEach((p0, i) => {
      if (p0 && typeof p0 == 'object') { const c = p0.if || p0.ifn; if (!isStr(p0.t) || (c && !(ids.has(c[0]) || COMMON.includes(c[0])))) E(w, 'paso condicionado mal formado ' + i); }
      const p = p0 && typeof p0 == 'object' ? p0.t : p0;
      if (!isStr(p)) return E(w, 'paso vacío ' + i);
      checkPhrase(w + ' › paso ' + (i + 1), p);
      (p.match(/\{(\w+)\}/g) || []).forEach(m => { const k = m.slice(1, -1); if (!ids.has(k) && !COMMON.includes(k)) E(w + ' › paso ' + (i + 1), 'cita un campo inexistente ' + k); });
      if (/(adecuad|sin complicaci|correct|satisfactori|exitos)/i.test(p)) W(w + ' › paso ' + (i + 1), 'el paso afirma un resultado: «' + p + '»');
    });
  }
}

for (const file of process.argv.slice(2)) {
  const T = (await import(pathToFileURL(file).href + '?t=' + Date.now())).default;
  if (!Array.isArray(T)) { E(file, 'no exporta un array'); continue; }
  (T[0] && T[0].secs ? evo : partes)(T, file);
  console.log(`${file}: ${T.length} plantilla(s)`);
}
aliases.forEach(([w, a, set]) => { const t = all.get(a); if (!t) return W(w, 'alias a una plantilla de otro archivo o inexistente: ' + a); Object.entries(set).forEach(([k, v]) => { const f = t.f.find(f => f.id == k); if (!f) return E(w, 'set: campo inexistente ' + k); if ((f.k == 'opt' || f.k == 'multi') && !f.o.some(o => o[0] == v)) E(w, `set: «${v}» no es una opción de ${k}`); }); });
warn.forEach(w => console.log('aviso  ' + w));
errs.forEach(e => console.log('ERROR  ' + e));
console.log(errs.length ? `${errs.length} error(es)` : 'OK, sin errores');
process.exit(errs.length ? 1 : 0);
