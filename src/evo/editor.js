// Editores de evoluciones: plantilla (apartados, campos, frases) y clasificación de la biblioteca.
// Los cambios se guardan en S.evt (plantillas) y S.evx (categorías, ocultas). Se sincronizan.
import { esc } from '../data.js';
import { ic } from '../icons.js';
import { cats, tpl, builtin } from './ui.js';
import { optLabel, optPhrase } from './engine.js';

let ctx = null, ed = null, mode = '';
const S = () => ctx.getS(), $ = s => document.querySelector(s);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const clone = o => JSON.parse(JSON.stringify(o));
export const initEvoEditor = c => { ctx = c; };

const KINDS = [['conc', 'Nivel de conciencia'], ['orient', 'Orientación'], ['gcs', 'Glasgow'], ['pupils', 'Pupilas'], ['mrc4', 'Fuerza por miembro'], ['motor', 'Fuerza por grupo muscular'], ['rot', 'ROT'], ['patol', 'Reflejos patológicos'], ['sens', 'Sensibilidad'], ['nihss', 'NIHSS'], ['asia', 'ISNCSCI (ASIA)'], ['vitals', 'Signos vitales'], ['lab', 'Laboratorio'], ['dev', 'Dispositivos y drenajes'], ['text', 'Texto libre'], ['num', 'Número']];
const KN = Object.fromEntries(KINDS);
const head = `<div class="eh"><button data-tc="close">${ic('back', 'sm')} Volver</button></div>`;

export function openEditor(m, id) {
  mode = m;
  if (m == 'tpl') ed = clone(tpl(id));
  if (m == 'new') { mode = 'tpl'; ed = { id: 'u-' + uid(), n: 'Plantilla nueva', cat: cats()[0].n, v: 1, d: '', secs: [{ id: 's' + uid(), h: 'Apartado 1', f: [] }], _new: 1 }; }
  ctx.openSheet(html(), 'evoed');
}
const redraw = () => { const bk = $('#bk'), sc = bk.scrollTop; bk.innerHTML = html(); bk.scrollTop = sc; };
const html = () => (mode == 'cls' ? clsHtml() : tplHtml());

/* ---------- plantilla ---------- */
const linesOf = a => (a || []).map(o => (Array.isArray(o) ? `${o[0]} = ${o[1]}` : o)).join('\n');
function tplHtml() {
  const C = cats(), isB = !!builtin(ed.id), over = isB && S().evt && S().evt[ed.id];
  const curCat = (C.find(c => c.t.includes(ed.id)) || {}).n || ed.cat;
  const fld = (i, j, f) => {
    const p = `secs.${i}.f.${j}`, kind = f.k ? KN[f.k] || f.k : 'Normal / alterado / no evaluable';
    const inp = (k, l, ph = '') => `<label class="f">${l}<input data-te="${p}.${k}" value="${esc(f[k] || '')}" placeholder="${esc(ph)}" autocomplete="off"></label>`;
    let b = inp('l', 'Etiqueta (no se escribe en el texto)');
    if (!f.k) b += inp('n', 'Frase si está normal', 'p. ej. Marcha conservada') + `<label class="f">Alteraciones (una por línea; «Etiqueta = frase» si querés una etiqueta corta)<textarea data-te-lines="${p}.a" rows="4">${esc(linesOf(f.a))}</textarea></label>` + inp('ne', 'Frase si no es evaluable', 'p. ej. Marcha no evaluable') + inp('d', 'Pedir detalle (texto de ayuda)', 'p. ej. lado, localización') +
      `<div class="tl"><label class="ck"><input type="checkbox" data-te-chk="${p}.one" ${f.one ? 'checked' : ''}><span>Una sola alteración</span></label><label class="f">Unir con el campo anterior<select data-te-sel="${p}.j">${[['', 'No (oración nueva)'], [', ', 'Con coma'], [' ', 'Con espacio'], [', con ', 'Con «, con»']].map(([v, l]) => `<option value="${esc(v)}" ${(f.j || '') == v ? 'selected' : ''}>${l}</option>`).join('')}</select></label></div>`;
    else if (f.k == 'text' || f.k == 'num') b += inp('p', 'Frase ({v} es lo que escribís)', '{v}') + inp('ph', 'Ejemplo');
    return `<details class="g"><summary>${esc(f.l || KN[f.k] || f.id)} <small class="meta">${esc(kind)}</small></summary>${b}<div class="acts"><button class="add" data-tc="fup" data-i="${i}" data-j="${j}">↑ Subir</button><button class="add" data-tc="fdel" data-i="${i}" data-j="${j}">${ic('trash', 'sm')} Quitar campo</button></div></details>`;
  };
  return `<div class="sheet">${head}<h3>${ed._new ? 'Plantilla nueva' : 'Editar plantilla'}</h3>
  <p class="meta">Agregá, quitá o modificá apartados y hallazgos. Las frases son lo que se escribe en la evolución: escribilas completas y con lateralidad.</p>
  <label class="f">Nombre<input data-te="n" value="${esc(ed.n)}" autocomplete="off"></label>
  <label class="f">Descripción<input data-te="d" value="${esc(ed.d || '')}" autocomplete="off"></label>
  <label class="f">Categoría<select data-te-sel="cat">${C.map(c => `<option ${c.n == curCat ? 'selected' : ''}>${esc(c.n)}</option>`).join('')}</select></label>
  ${ed.secs.map((s, i) => `<div class="pan"><div class="li"><input type="text" data-te="secs.${i}.h" value="${esc(s.h)}" aria-label="Nombre del apartado"><button class="x" data-tc="sup" data-i="${i}" aria-label="Subir">↑</button><button class="x" data-tc="sdel" data-i="${i}" aria-label="Quitar apartado">×</button></div>
    <label class="ck"><input type="checkbox" data-te-chk-inv="secs.${i}.off" ${s.off ? '' : 'checked'}><span>Activo por defecto</span></label>
    ${s.f.map((f, j) => fld(i, j, f)).join('')}
    <div class="tl"><button class="add" data-tc="fadd" data-i="${i}">${ic('plus', 'sm')} Campo normal/alterado</button><label class="f">Agregar componente<select data-te-kadd="${i}"><option value="">Elegí…</option>${KINDS.map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select></label></div></div>`).join('')}
  <div class="acts"><button class="add" data-tc="sadd">${ic('plus', 'sm')} Apartado</button></div>
  <div class="acts" style="margin-top:18px"><button class="bt" data-tc="save">${ic('check', 'sm')} Guardar plantilla</button><button class="bt sec" data-tc="dup">Duplicar</button>
  ${over ? `<button class="bt ghost" data-tc="restore">Restaurar original</button>` : ''}${!isB && !ed._new ? `<button class="bt dan" data-tc="del">${ic('trash', 'sm')} Eliminar</button>` : ''}</div>
  <p class="meta" id="tem"></p></div>`;
}
const getP = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
function setP(o, p, v) { const ks = p.split('.'); let a = o; ks.slice(0, -1).forEach(k => (a = a[k])); a[ks[ks.length - 1]] = v; }
const parseLines = t => t.split('\n').map(l => l.trim()).filter(Boolean).map(l => { const m = l.split(/\s+=\s+/); return m.length == 2 ? [m[0].trim(), m[1].trim()] : l; });

function moveTo(id, catName) {
  const C = cats(); C.forEach(c => (c.t = c.t.filter(x => x != id)));
  let c = C.find(c => c.n == catName); if (!c) { c = { n: catName, t: [] }; C.push(c); }
  c.t.push(id);
}
function saveTpl() {
  const s = S(); s.evt ??= {};
  const catSel = $('#bk [data-te-sel="cat"]'), cat = catSel ? catSel.value : ed.cat;
  const t = clone(ed); delete t._new; t.cat = cat; t.v = (t.v || 1) + (ed._new ? 0 : 1);
  t.secs.forEach(sec => sec.f.forEach(f => { Object.keys(f).forEach(k => { if (f[k] === '' || f[k] === false) delete f[k]; }); if (!f.k && !f.n && !(f.a || []).length && !f.ne && !f.d) f.n = f.l || 'Sin particularidades'; }));
  s.evt[t.id] = t; ed = clone(t);
  const now = cats().find(c => c.t.includes(t.id)); if (!now || now.n != cat) moveTo(t.id, cat);
  ctx.save();
}

/* ---------- clasificación ---------- */
function clsHtml() {
  const C = cats(), hid = new Set(S().evx.hid || []);
  return `<div class="sheet">${head}<h3>Clasificación de evoluciones</h3><p class="meta">Renombrá, reordená, agregá o quitá categorías; mové plantillas entre categorías u ocultá las que no uses.</p>
  ${C.map((c, i) => `<div class="pan"><div class="li"><input type="text" data-cc="${i}" value="${esc(c.n)}" aria-label="Nombre de la categoría"><button class="x" data-tc="cup" data-i="${i}" aria-label="Subir">↑</button><button class="x" data-tc="cdel" data-i="${i}" aria-label="Quitar categoría">×</button></div>
    ${c.t.map((id, j) => { const t = tpl(id); return `<div class="li"><span class="meta" style="flex:1;${hid.has(id) ? 'text-decoration:line-through' : ''}">${esc(t.n)}</span><select data-cmv="${esc(id)}" aria-label="Mover a">${C.map(o => `<option ${o == c ? 'selected' : ''}>${esc(o.n)}</option>`).join('')}</select><button class="x" data-tc="tup" data-i="${i}" data-j="${j}" aria-label="Subir">↑</button><button class="x" data-tc="thide" data-v="${esc(id)}" aria-label="${hid.has(id) ? 'Mostrar' : 'Ocultar'}">${hid.has(id) ? '◌' : '●'}</button></div>`; }).join('') || '<p class="meta">Vacía.</p>'}</div>`).join('')}
  <div class="tl"><input class="sr" id="ccn" style="padding-left:14px;flex:1" placeholder="Nueva categoría" autocomplete="off"><button class="bt" data-tc="cadd">Agregar</button></div><p class="meta" id="tem"></p></div>`;
}

/* ---------- eventos de la hoja ---------- */
export function bindEvoEditor(bk) {
  bk.addEventListener('input', e => {
    if (bk.dataset.view != 'evoed') return;
    const t = e.target, d = t.dataset;
    if (d.te) setP(ed, d.te, t.value);
    if (d.teLines) setP(ed, d.teLines, parseLines(t.value));
    if (d.cc != null) { cats()[+d.cc].n = t.value; ctx.save(); }
  });
  bk.addEventListener('change', e => {
    if (bk.dataset.view != 'evoed') return;
    const t = e.target, d = t.dataset;
    if (d.teChk) setP(ed, d.teChk, t.checked);
    if (d.teChkInv) setP(ed, d.teChkInv, !t.checked);
    if (d.teSel && d.teSel != 'cat') setP(ed, d.teSel, t.value);
    if (d.teKadd != null && t.value) { const k = t.value, f = { id: 'u' + uid(), k }; if (k == 'text' || k == 'num') Object.assign(f, { l: KN[k], p: '{v}' }); ed.secs[+d.teKadd].f.push(f); redraw(); }
    if (d.cmv) { moveTo(d.cmv, t.value); ctx.save(); redraw(); }
  });
  bk.addEventListener('click', e => {
    if (bk.dataset.view != 'evoed') return;
    const b = e.target.closest('[data-tc]'); if (!b) return;
    const d = b.dataset, i = +d.i, j = +d.j, msg = m => { const el = $('#tem'); if (el) el.textContent = m; };
    const swap = (a, k) => { if (k > 0) [a[k - 1], a[k]] = [a[k], a[k - 1]]; };
    switch (d.tc) {
      case 'close': return ctx.close();
      case 'sup': swap(ed.secs, i); break;
      case 'sdel': if (ed.secs.length < 2) return msg('La plantilla necesita al menos un apartado.'); ed.secs.splice(i, 1); break;
      case 'sadd': ed.secs.push({ id: 's' + uid(), h: 'Apartado nuevo', f: [] }); break;
      case 'fadd': ed.secs[i].f.push({ id: 'u' + uid(), l: 'Campo nuevo', n: '', a: [] }); break;
      case 'fup': swap(ed.secs[i].f, j); break;
      case 'fdel': ed.secs[i].f.splice(j, 1); break;
      case 'save': saveTpl(); ctx.toast('Plantilla guardada'); ctx.close(); return;
      case 'dup': { saveTpl(); const c = clone(ed); c.id = 'u-' + uid(); c.n = ed.n + ' (copia)'; c.v = 1; S().evt[c.id] = c; moveTo(c.id, c.cat); ctx.save(); ed = clone(c); ctx.toast('Copia creada'); break; }
      case 'restore': delete S().evt[ed.id]; ctx.save(); ctx.toast('Plantilla original restaurada'); ctx.close(); return;
      case 'del': if (!d.arm) { b.dataset.arm = 1; b.textContent = '¿Seguro? Tocá otra vez'; return; } delete S().evt[ed.id]; cats().forEach(c => (c.t = c.t.filter(x => x != ed.id))); ctx.save(); ctx.close(); return;
      case 'cup': swap(cats(), i); ctx.save(); break;
      case 'cdel': if (cats()[i].t.length) return msg('Solo se pueden quitar categorías vacías. Mové o ocultá sus plantillas primero.'); cats().splice(i, 1); ctx.save(); break;
      case 'cadd': { const v = ($('#ccn').value || '').trim(); if (v && !cats().some(c => c.n == v)) cats().push({ n: v, t: [] }); ctx.save(); break; }
      case 'tup': swap(cats()[i].t, j); ctx.save(); break;
      case 'thide': { const h = (S().evx.hid ??= []), k = h.indexOf(d.v); k >= 0 ? h.splice(k, 1) : h.push(d.v); ctx.save(); break; }
    }
    redraw();
  });
}
