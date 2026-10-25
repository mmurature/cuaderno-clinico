// Pantalla de «Fórmulas y Scores»: dos módulos, categorías, buscador global, favoritos y la ficha de cada herramienta.
// Los valores cargados se guardan solo en memoria (son datos de pacientes): no se escriben en disco ni se sincronizan.
// Favoritos (S.cx.fav): se sincronizan.
import { esc } from '../data.js';
import { ic } from '../icons.js';
import { TOOLS, MODS, MDESC, CATS, tool, inCat } from './lib/index.js';
import { run } from './engine.js';

let ctx = null;
const S = () => ctx.getS(), $ = s => document.querySelector(s);
export const initCalc = c => { ctx = c; };
const X = () => (S().cx ??= { fav: [] });
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const vals = {}, units = {}, done = {};
let cq = '', favOnly = false, catF = '';
const catName = (m, c) => (CATS[m] || {})[c] || c;
export const fmtN = (x, d) => (typeof x == 'number' ? x.toLocaleString('es-AR', { minimumFractionDigits: d ?? 0, maximumFractionDigits: d ?? 2 }) : String(x));

/* ---------- búsqueda ---------- */
function score(t, q) {
  const w = norm(q).split(/\s+/).filter(Boolean); if (!w.length) return 1;
  const n = norm(t.n), sg = norm(t.sig), sy = norm((t.syn || []).join(' ')), cats = norm([catName(t.m, t.cat), ...(t.tags || []).map(g => catName(...g.split(':')))].join(' ')), fin = norm(t.fin), id = norm(t.id);
  let tot = 0;
  for (const x of w) {
    let s = 0;
    if (sg == x) s = 100; else if (n.startsWith(x)) s = 60; else if (sg.includes(x) || id.includes(x)) s = 50; else if (n.includes(x)) s = 40; else if (sy.includes(x)) s = 30; else if (cats.includes(x)) s = 20; else if (fin.includes(x)) s = 10;
    if (!s) return 0; tot += s;
  }
  return tot;
}
const search = (m, c) => TOOLS.filter(t => (!m || t.m == m) && (!c || inCat(t, t.m, c)) && (!favOnly || X().fav.includes(t.id)))
  .map(t => [t, score(t, cq)]).filter(a => a[1] > 0).sort((a, b) => b[1] - a[1] || a[0].n.localeCompare(b[0].n, 'es')).map(a => a[0]);

/* ---------- listas ---------- */
const trow = (t, showMod) => `<div class="row"><button class="tx rowbtn" data-nav="#/formulas/t/${esc(t.id)}"><b>${esc(t.n)}${t.sig && !t.n.includes(t.sig) ? ' <span class="tag">' + esc(t.sig) + '</span>' : ''}${t.pend ? ' <span class="st s1">pendiente</span>' : ''}</b><small>${esc((showMod ? MODS[t.m] + ' · ' : '') + catName(t.m, t.cat) + ' · ' + (t.tipo || ''))}</small></button><button class="ib" data-r="cfav" data-v="${esc(t.id)}" aria-label="${X().fav.includes(t.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}">${X().fav.includes(t.id) ? '★' : '☆'}</button></div>`;
const searchBox = ph => `<div class="srw">${ic('search', 'sm')}<input class="sr" data-cq type="search" placeholder="${ph}" value="${esc(cq)}" autocomplete="off"></div>
  <div class="chips" style="margin-bottom:8px"><button class="chip sm${favOnly ? ' on' : ''}" data-r="cfavonly">★ Favoritos</button></div>`;
const catsFor = (m, list) => [...new Set(list.map(t => t.m == m ? t.cat : null).filter(Boolean))];

export function viewCalc(r) {
  const m = r.m, c = r.c;
  if (r.t) return viewTool(r.t);
  if (r.mias) return r.mias;
  const q = !!cq.trim() || favOnly;
  if (!m) {
    const fav = X().fav.map(tool).filter(Boolean);
    const cards = ['f', 's'].map(k => { const n = TOOLS.filter(t => t.m == k).length, nc = new Set(TOOLS.filter(t => t.m == k).map(t => t.cat)).size; return `<button class="row" data-nav="#/formulas/${k}"><span class="tx"><b>${MODS[k]}</b><small>${MDESC[k]} · ${n} herramientas en ${nc} categorías</small></span><span class="chev">${ic('chev', 'sm')}</span></button>`; }).join('');
    if (!q) return `${searchBox('Buscar nombre, sigla o uso…')}<div class="eyebrow">Módulos</div><div class="list">${cards}</div>
      ${fav.length ? `<div class="eyebrow">Favoritos</div><div class="list">${fav.map(t => trow(t, true)).join('')}</div>` : ''}
      <div class="eyebrow">Mis fórmulas</div><div class="list"><button class="row" data-nav="#/formulas/mias"><span class="tx"><b>Fórmulas propias</b><small>Las que creaste vos, editables</small></span><span class="chev">${ic('chev', 'sm')}</span></button></div>
      <p class="meta" style="margin-top:14px">Cada herramienta muestra su fuente, versión y fecha de verificación. Los resultados orientan: no reemplazan el criterio clínico ni los protocolos de tu servicio.</p>`;
  }
  let L = search(m, c);
  if (catF) L = L.filter(t => inCat(t, t.m, catF));
  const chips = q && !m ? (() => { const cs = [...new Set(search().flatMap(t => [t.cat, ...(t.tags || []).map(g => g.split(':')[1])]))]; return cs.length > 1 ? `<div class="chips" style="margin-bottom:8px"><button class="chip sm${!catF ? ' on' : ''}" data-r="ccat" data-v="">Todas las especialidades</button>${cs.map(k => `<button class="chip sm${catF == k ? ' on' : ''}" data-r="ccat" data-v="${esc(k)}">${esc(CATS.f[k] || CATS.s[k] || k)}</button>`).join('')}</div>` : ''; })() : '';
  if (!m) return `${searchBox('Buscar nombre, sigla o uso…')}${chips}<div class="list">${L.map(t => trow(t, true)).join('') || '<div class="empty"><p>Nada coincide.</p></div>'}</div>`;
  if (!c) {
    const all = TOOLS.filter(t => t.m == m), cs = Object.keys(CATS[m]).filter(k => all.some(t => inCat(t, m, k)));
    return `${searchBox('Buscar en ' + MODS[m].toLowerCase() + '…')}${q ? `<div class="list">${L.map(t => trow(t)).join('') || '<div class="empty"><p>Nada coincide.</p></div>'}</div>`
      : `<div class="list">${cs.map(k => `<button class="row" data-nav="#/formulas/${m}/${k}"><span class="tx"><b>${esc(CATS[m][k])}</b><small>${all.filter(t => inCat(t, m, k)).length} herramientas</small></span><span class="chev">${ic('chev', 'sm')}</span></button>`).join('')}</div>`}`;
  }
  return `${searchBox('Buscar en ' + esc(catName(m, c)) + '…')}<div class="list">${L.map(t => trow(t)).join('') || '<div class="empty"><p>Nada coincide.</p></div>'}</div>`;
}

/* ---------- herramienta ---------- */
function field(t, i) {
  if (i.t == 'head') return `<div class="eyebrow" style="flex:1 1 100%;margin:8px 0 0">${esc(i.l)}</div>`;
  const v = (vals[t.id] ||= {})[i.id], id = `data-cv="${esc(i.id)}"`;
  if (i.t == 'chk') return `<label class="f ck3"><input type="checkbox" ${id} ${v ? 'checked' : ''}> <span>${esc(i.l)}</span></label>`;
  const req = i.req === 0 ? '' : ' *';
  if (i.t == 'sel') return `<label class="f">${esc(i.l)}${req}<select ${id}><option value="">— elegir —</option>${i.o.map(o => `<option value="${esc(o[0])}" ${String(v) === String(o[0]) ? 'selected' : ''}>${esc(o[1])}</option>`).join('')}</select></label>`;
  if (i.t == 'date') return `<label class="f">${esc(i.l)}${req}<input type="date" ${id} value="${esc(v || '')}"></label>`;
  const k = (units[t.id] ||= {})[i.id] || 0, alt = i.alt || [];
  const u = alt.length ? `<select class="un" data-cu="${esc(i.id)}" aria-label="Unidad de ${esc(i.l)}"><option value="0" ${!k ? 'selected' : ''}>${esc(i.u || '')}</option>${alt.map((a, j) => `<option value="${j + 1}" ${k == j + 1 ? 'selected' : ''}>${esc(a.u)}</option>`).join('')}</select>` : '';
  return `<label class="f">${esc(i.l)}${req}${!alt.length && i.u ? ' <span class="un1">(' + esc(i.u) + ')</span>' : ''}<span class="nrow"><input type="number" inputmode="decimal" step="${i.step || 'any'}" ${id} value="${esc(v ?? '')}">${u}</span></label>`;
}
function resHtml(t) {
  if (!done[t.id]) return '';
  const o = run(t, vals[t.id] || {}, units[t.id] || {});
  if (o.miss) return `<div class="pan warnp"><b>Faltan datos obligatorios</b><ul class="meta">${o.miss.map(l => `<li>${esc(l)}</li>`).join('')}</ul><p class="meta">No se calcula con datos incompletos: ningún campo se completa con cero ni con un valor normal.</p></div>`;
  if (o.bad) return `<div class="pan warnp bad"><b>${esc(o.bad)}</b></div>`;
  const r = o.r, lv = r.lvl || '';
  return `<div class="pan cres lv-${lv || 'n'}" role="status"><div class="meta">${esc(r.lab || 'Resultado')}</div><div class="big">${esc(fmtN(r.r, r.d))}${r.u ? ' <small>' + esc(r.u) + '</small>' : ''}</div>${r.interp ? `<div class="int">${esc(r.interp)}</div>` : ''}
    ${(r.more || []).length ? `<dl class="mre">${r.more.map(([a, b]) => `<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>` : ''}
    ${r.note ? `<p class="meta">${esc(r.note)}</p>` : ''}</div>`;
}
function viewTool(id) {
  const t = tool(id); if (!t) return '<div class="empty"><p>Herramienta no encontrada.</p><button class="bt" data-nav="#/formulas">Ir al catálogo</button></div>';
  const fav = X().fav.includes(t.id);
  const tags = [t.cat, ...(t.tags || []).map(g => g.split(':')[1])];
  const head = `<div class="pan"><div class="chips" style="margin:0 0 6px"><span class="tag">${esc(MODS[t.m])}</span> <span class="tag">${esc(catName(t.m, t.cat))}</span>${(t.tags || []).map(g => `<span class="tag">${esc(catName(...g.split(':')))}</span>`).join(' ')}</div>
    <h2 class="lvl-title" style="margin:4px 0">${esc(t.n)}${t.sig && !t.n.includes(t.sig) ? ` <small class="meta">(${esc(t.sig)})</small>` : ''} <button class="ib" data-r="cfav" data-v="${esc(t.id)}" aria-label="${fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}">${fav ? '★' : '☆'}</button></h2>
    <p class="meta"><b>Tipo:</b> ${esc(t.tipo || '')}${t.ver ? ' · <b>Versión:</b> ' + esc(t.ver) : ''}</p><p>${esc(t.fin || '')}</p></div>`;
  const src = `<details class="g"><summary><span class="gt">Fórmula, fuente y límites</span></summary><div style="padding:4px 16px 14px">
    ${t.formula ? `<div class="meta"><b>Fórmula / método</b></div><pre class="fx">${esc(t.formula)}</pre>` : ''}
    ${t.pop ? `<p class="meta"><b>Población:</b> ${esc(t.pop)}</p>` : ''}
    ${t.lim ? `<p class="meta"><b>Limitaciones:</b> ${esc(t.lim)}</p>` : ''}
    <p class="meta"><b>Referencia:</b> ${esc(t.ref || 'sin referencia')}${t.url ? ` · <a href="${esc(t.url)}" target="_blank" rel="noopener noreferrer">enlace</a>` : ''}</p>
    <p class="meta"><b>Última verificación:</b> ${esc(t.verif || 's/d')}</p></div></details>`;
  if (t.pend) return head + `<div class="pan warnp"><b>Pendiente de verificación</b><p class="meta">${esc(t.pend)}</p><p class="meta">No se calcula hasta confirmar los datos con la fuente original.</p></div>` + src;
  return head + `<form class="pan" data-cform autocomplete="off" novalidate><div class="tl">${t.in.map(i => field(t, i)).join('')}</div><p class="meta">* obligatorio</p>
    <div class="tools"><button class="bt" type="button" data-r="ccalc" data-v="${esc(t.id)}">Calcular</button> <button class="bt sec" type="button" data-r="cclear" data-v="${esc(t.id)}">Limpiar</button></div></form><div id="cres">${resHtml(t)}</div>${src}
    <p class="meta">El resultado es una ayuda para el criterio clínico, no un diagnóstico ni una indicación.</p>`;
}

/* ---------- eventos ---------- */
export const CR = {
  cfav(b) { const f = X(), id = b.dataset.v; f.fav = f.fav.includes(id) ? f.fav.filter(x => x != id) : [...f.fav, id]; ctx.save(); ctx.render(); },
  cfavonly() { favOnly = !favOnly; ctx.render(); },
  ccat(b) { catF = b.dataset.v; ctx.render(); },
  ccalc(b) { const id = b.dataset.v; done[id] = true; $('#cres').innerHTML = resHtml(tool(id)); $('#cres').scrollIntoView({ block: 'nearest', behavior: 'smooth' }); },
  cclear(b) { const id = b.dataset.v; vals[id] = {}; units[id] = {}; done[id] = false; ctx.render(); }
};
const cur = () => { const m = location.hash.match(/#\/formulas\/t\/([^/]+)/); return m && tool(decodeURIComponent(m[1])); };
export function calcInput(e) {
  const t = e.target, d = t.dataset;
  if (d.cq != null) { cq = t.value; catF = ''; const v = $('#view'), r = ctx.route(); v.innerHTML = viewCalc(r); const i = v.querySelector('[data-cq]'); i.focus(); i.setSelectionRange(cq.length, cq.length); return true; }
  const T = cur(); if (!T) return false;
  if (d.cv != null) { (vals[T.id] ||= {})[d.cv] = t.type == 'checkbox' ? t.checked : t.value; if (done[T.id]) { done[T.id] = false; $('#cres').innerHTML = ''; } return true; }
  if (d.cu != null) { (units[T.id] ||= {})[d.cu] = t.value; if (done[T.id]) { done[T.id] = false; $('#cres').innerHTML = ''; } return true; }
  return false;
}
export const calcReset = () => { cq = ''; favOnly = false; catF = ''; };
