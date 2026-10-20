// Interfaz de evoluciones: biblioteca, recorrido por apartados, componentes y texto final.
// Estado de la evolución en curso (S.ev) y evaluaciones guardadas (S.evh): solo en el dispositivo.
// Plantillas propias (S.evt) y clasificación (S.evx): se sincronizan (no tienen datos de pacientes).
import { esc } from '../data.js';
import { ic } from '../icons.js';
import { compose, renderField, normalOf, activeSecs, optLabel, optPhrase, scaleDef, TEMP, PATOL, isSet } from './engine.js';
import { SCALES, GCS, NIHSS, MUSCLES, REFLEXES, ROT_V, SENS_T, SENS_M, SENS_D, CONC, CONC_MOD, O2, LAB, DEVICES, DEV_EST, DEV_CAR, DEV_SITE, DERM, KEYM, isncsci } from './scales.js';
import { BUILTIN, CATS, MODULES } from './lib/index.js';
import { pn } from '../txt.js';

let ctx = null;
const S = () => ctx.getS(), save = () => ctx.save(), render = () => ctx.render(), $ = s => document.querySelector(s);
export const initEvo = c => { ctx = c; };
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const clone = o => JSON.parse(JSON.stringify(o));

/* ---------- biblioteca ---------- */
export const builtin = id => BUILTIN.find(t => t.id == id);
export const tpl = id => (S().evt || {})[id] || builtin(id) || null;
export function cats() {
  const s = S(); s.evx ??= { cats: null, hid: [] };
  if (!s.evx.cats) s.evx.cats = CATS.map(n => ({ n, t: BUILTIN.filter(t => t.cat == n).map(t => t.id) }));
  const known = new Set(s.evx.cats.flatMap(c => c.t));
  // plantillas nuevas (de la app o propias) que todavía no están en ninguna categoría
  [...BUILTIN, ...Object.values(s.evt || {})].forEach(t => {
    if (known.has(t.id)) return; known.add(t.id);
    let c = s.evx.cats.find(c => c.n == t.cat); if (!c) { c = { n: t.cat || 'Otras', t: [] }; s.evx.cats.push(c); }
    c.t.push(t.id);
  });
  s.evx.cats.forEach(c => (c.t = c.t.filter(id => tpl(id))));
  return s.evx.cats;
}
const E = () => (S().ev && S().ev.v == 2 ? S().ev : (S().ev = { v: 2 }));
const X = () => (E().x ??= {});
function runT() {
  const e = E(), T = tpl(e.tid); if (!T) return null;
  const extra = (e.extra || []).map(id => MODULES.find(m => m.id == id)).filter(Boolean);
  return extra.length ? { ...T, secs: [...T.secs, ...extra] } : T;
}
const baseX = () => { const e = E(); const h = (S().evh || []).find(h => h.id == e.base); return h ? h.x : null; };
const opts = () => { const e = E(); return { x: X(), base: baseX(), on: e.on || {}, sex: e.sex, out: e.out, det: e.det, lf: e.lf, nochg: e.nochg }; };
export const evoText = () => { const T = runT(); return T ? compose(T, opts()) : ''; };

/* =========================================================================
   Vistas
   ========================================================================= */
export function evo() {
  const e = E();
  if (!e.open || !runT()) return evoList();
  return evoRun();
}

let q = '';
function evoList() {
  const C = cats(), hid = new Set(S().evx.hid || []), ql = q.toLowerCase();
  const hist = (S().evh || []).slice(-5).reverse();
  const row = id => { const t = tpl(id); if (!t || hid.has(id)) return ''; if (ql && !(t.n + ' ' + (t.d || '')).toLowerCase().includes(ql)) return ''; return `<button class="row" data-r="evt" data-v="${esc(id)}"><span class="tx"><b>${esc(t.n)}${S().evt && S().evt[id] ? ' <span class="tag">editada</span>' : ''}</b>${t.d ? `<small>${esc(t.d)}</small>` : ''}</span><span class="chev">${ic('chev', 'sm')}</span></button>`; };
  const cur = e => e.tid && tpl(e.tid) ? `<div class="pan hero"><h3>Evolución en curso</h3><p class="meta">${esc(tpl(e.tid).n)}</p><div class="acts"><button class="bt" data-r="evt" data-v="${esc(e.tid)}" data-keep="1">Continuar</button></div></div>` : '';
  return `${cur(E())}<p class="meta" style="margin:4px 2px 10px">Elegí una plantilla. Marcás lo normal, lo alterado o lo no evaluable y la app redacta la evolución. Lo que no tocás no se escribe.</p>
  <div class="srw">${ic('search', 'sm')}<input class="sr" data-evq type="search" placeholder="Buscar plantilla…" value="${esc(q)}" autocomplete="off"></div>
  <div class="tools"><button class="ib txt" data-r="evcls">${ic('tree', 'sm')} Editar clasificación</button><button class="ib txt" data-r="evnew">${ic('plus', 'sm')} Plantilla nueva</button></div>
  ${C.map(c => { const rows = c.t.map(row).join(''); return rows ? `<div class="eyebrow">${esc(c.n)}</div><div class="list">${rows}</div>` : ''; }).join('')}
  ${hist.length ? `<div class="eyebrow">Evaluaciones guardadas</div><div class="list">${hist.map(h => `<button class="row" data-r="evfromh" data-v="${h.id}"><span class="tx"><b>${esc((tpl(h.tid) || {}).n || 'Plantilla eliminada')}${h.tag ? ' · ' + esc(h.tag) : ''}</b><small>${new Date(h.at).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })} · tocá para evolucionar desde esta</small></span><span class="chev">${ic('chev', 'sm')}</span></button>`).join('')}</div>` : ''}`;
}

const KL = { conc: 'Nivel de conciencia', orient: 'Orientación', gcs: 'Escala de Glasgow', pupils: 'Pupilas', mrc4: 'Fuerza por miembro (MRC)', motor: 'Fuerza por grupo muscular (MRC)', rot: 'Reflejos osteotendinosos', patol: 'Reflejos patológicos', sens: 'Sensibilidad', nihss: 'NIHSS', asia: 'ISNCSCI (ASIA)', vitals: 'Signos vitales', lab: 'Laboratorio', dev: 'Dispositivos y drenajes' };
const lbl = f => f.l || KL[f.k] || (f.k == 'scale' ? (scaleDef(f) || {}).l : '') || f.id;

function evoRun() {
  const e = E(), T = runT(), secs = activeSecs(T, e), n = secs.length, step = Math.min(Math.max(+e.step || 0, 0), n), last = step == n;
  const H = (S().evh || []).filter(h => h.tid == e.tid);
  const head = `<div class="tools"><button class="ib txt" data-r="evback">‹ Plantillas</button><button class="ib txt" data-r="evall">${ic('check', 'sm')} Examen sin alteraciones</button><button class="ib txt" data-r="evopts">${ic('filter', 'sm')} Opciones</button></div>
  <h2 class="lvl-title">${esc(T.n)}</h2>
  ${e.showOpts ? optsPanel(T, H) : ''}
  <div class="steps">${Array.from({ length: n + 1 }, (_, i) => `<button data-r="evgo" data-i="${i}" class="${i == step ? 'on' : i < step ? 'done' : ''}" aria-label="${i < n ? esc(secs[i].h) : 'Texto final'}"></button>`).join('')}</div>
  <p class="meta">${last ? 'Texto final' : `Apartado ${step + 1} de ${n}`}${e.base ? ' · comparando con la evaluación previa' : ''}</p>`;
  if (last) return head + finalPanel(T, n);
  const s = secs[step], x = X();
  const alt = s.f.filter(f => (renderField(f, x[f.id], null, opts()) || {}).alt).length, set = s.f.filter(f => isSet(f, x[f.id])).length;
  return head + `<div class="pan"><h3>${esc(s.h)}</h3><p class="meta">${set ? `${set} de ${s.f.length} completado(s)` : 'Sin completar: lo que no marques no aparece en el texto'}${alt ? ` · ${alt} con hallazgos` : ''}</p>
  <div class="acts"><button class="bt sec" data-r="evsec" data-i="${step}" data-v="n">Sin alteraciones</button><button class="bt ghost" data-r="evsec" data-i="${step}" data-v="ne">No evaluado</button><button class="bt ghost" data-r="evsec" data-i="${step}" data-v="x">Borrar</button></div>
  ${s.f.map(f => fieldHtml(f)).join('')}</div>
  <div class="stepnav">${step ? `<button class="bt sec" data-r="evgo" data-i="${step - 1}">Anterior</button>` : ''}<button class="bt" data-r="evgo" data-i="${step + 1}">${step + 1 == n ? 'Ver texto' : 'Siguiente'}</button></div>`;
}

function optsPanel(T, H) {
  const e = E(), base = T.secs.filter(s => !String(s.id).startsWith('mx-'));
  const extra = MODULES.filter(m => !(e.extra || []).includes(m.id));
  return `<div class="pan"><h3>Opciones de esta evolución</h3>
  <div class="eyebrow" style="margin-top:4px">Paciente</div><div class="seg"><button data-r="evopt" data-k="sex" data-v="" class="${e.sex != 'f' ? 'on' : ''}">Masculino</button><button data-r="evopt" data-k="sex" data-v="f" class="${e.sex == 'f' ? 'on' : ''}">Femenino</button></div>
  <div class="eyebrow">Módulos activos</div><div>${T.secs.map(s => { const on = e.on && s.id in e.on ? e.on[s.id] : !s.off; return `<button class="chip${on ? ' on' : ''}" data-r="evon" data-v="${esc(s.id)}">${esc(s.h)}</button>`; }).join('')}</div>
  ${extra.length ? `<label class="f" style="margin-top:8px">Agregar módulo<select data-evmod><option value="">Elegí…</option>${extra.map(m => `<option value="${m.id}">${esc(m.h)}</option>`).join('')}</select></label>` : ''}
  <div class="eyebrow">Comparar con una evaluación previa</div>
  ${H.length ? `<label class="f">Evaluación previa<select data-evbase><option value="">Sin comparar</option>${H.slice().reverse().map(h => `<option value="${h.id}" ${e.base == h.id ? 'selected' : ''}>${new Date(h.at).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' })}${h.tag ? ' · ' + esc(h.tag) : ''}</option>`).join('')}</select></label>
  <p class="meta">La app detecta mejoría, deterioro, hallazgos nuevos y resueltos (Glasgow, pupilas, fuerza, NIHSS, sensibilidad y los demás campos).</p>
  ${e.base ? `<div class="acts"><button class="add" data-r="evfrom">Copiar los valores de la previa (modificás solo lo que cambió)</button></div>` : ''}` : '<p class="meta">Todavía no guardaste evaluaciones de esta plantilla. Al final, tocá “Guardar evaluación” para poder comparar la próxima.</p>'}
  <label class="ck" style="margin-top:8px"><input type="checkbox" data-evopt="tmp" ${e.tmp ? 'checked' : ''}><span>Marcar evolución por hallazgo (sin cambios, mejoría, deterioro, nuevo, resuelto)</span></label>
  <div class="acts"><button class="add" data-r="evedit" data-v="${esc(e.tid)}">${ic('edit', 'sm')} Editar esta plantilla</button></div></div>`;
}

function finalPanel(T, n) {
  const e = E(), txt = e.txt != null ? e.txt : evoText();
  const tg = (k, l) => `<button class="chip${e[k] ? ' on' : ''}" data-r="evopt" data-k="${k}" data-v="${e[k] ? '' : 1}">${l}</button>`;
  return `<div class="pan"><h3>Texto de la evolución</h3><p class="meta">Borrador para revisar antes de pasarlo a la historia clínica. Sin datos identificatorios.</p>
  <div class="seg"><button data-r="evopt" data-k="out" data-v="" class="${e.out != 's' ? 'on' : ''}">Texto corrido</button><button data-r="evopt" data-k="out" data-v="s" class="${e.out == 's' ? 'on' : ''}">Por apartados</button></div>
  <div style="margin-top:8px">${tg('det', 'Detalle de escalas')}${tg('lf', 'Marcar laboratorio ↑↓')}${e.base ? tg('nochg', '“Sin otros cambios”') : ''}</div>
  <textarea id="vout" ${e.txt != null ? 'data-evtxt' : 'readonly'}>${esc(txt || 'Todavía no marcaste nada.')}</textarea>
  <div class="acts"><button class="bt" data-r="evcopy">${ic('copy', 'sm')} Copiar</button>${e.txt != null ? `<button class="bt sec" data-r="evregen">Volver al texto automático</button>` : `<button class="bt sec" data-r="evtxt">${ic('edit', 'sm')} Editar texto</button>`}<span class="meta" id="vm"></span></div>
  <div class="eyebrow">Guardar para comparar la próxima vez</div>
  <div class="tl"><label class="f" style="flex:2">Etiqueta (opcional, sin nombres)<input id="evtag" placeholder="p. ej. cama 4" autocomplete="off" maxlength="30"></label><button class="bt sec" data-r="evsave">Guardar evaluación</button></div>
  <div class="acts"><button class="add" data-r="evreset">Empezar de cero</button></div></div>
  <div class="stepnav"><button class="bt sec" data-r="evgo" data-i="${n - 1}">Anterior</button></div>`;
}

/* ---------- campos ---------- */
const segB = (fid, a, v, cur, l) => `<button data-r="ex" data-f="${esc(fid)}" data-a="${a}" data-v="${esc(v)}" class="${cur == v ? 'on' : ''}">${l}</button>`;
const inp = (fid, p, val, l, extra = '') => `<label class="f">${l}<input data-ef="${esc(fid)}" data-ep="${p}" value="${esc(val ?? '')}" autocomplete="off" ${extra}></label>`;
const sel = (fid, p, val, l, o) => `<label class="f">${l}<select data-ef="${esc(fid)}" data-ep="${p}"><option value=""></option>${o.map(x => { const [v, t] = Array.isArray(x) ? x : [x, x]; return `<option value="${esc(v)}" ${String(val) === String(v) ? 'selected' : ''}>${esc(t)}</option>`; }).join('')}</select></label>`;

function fieldHtml(f) {
  const x = X()[f.id], e = E(), r = renderField(f, x, baseX() && baseX()[f.id], opts());
  const cls = r && r.alt ? ' alt' : x && x.s == 'ne' ? ' nx' : '';
  const tmp = e.tmp ? `<select class="mini" data-ef="${esc(f.id)}" data-ep="ev" aria-label="Evolución">${TEMP.map(([v, l]) => `<option value="${v}" ${(x || {}).ev == v ? 'selected' : ''}>${v ? l : 'Evolución…'}</option>`).join('')}</select>` : '';
  const pv = r && r.t ? `<p class="pv">${esc(r.t)}</p>` : '';
  return `<div class="item${cls}" data-it="${esc(f.id)}"><div class="ih"><b>${esc(lbl(f))}</b>${tmp}</div>${body(f, x || {})}${pv}</div>`;
}

function body(f, x) {
  const id = f.id;
  if (!f.k) {
    const s = x.s || '', hasA = (f.a || []).length;
    const seg = `<div class="seg sm">${f.n ? segB(id, 'st', 'n', s, 'Normal') : ''}${hasA || f.d ? segB(id, 'st', 'a', s, f.n ? 'Alterado' : 'Presente') : ''}${segB(id, 'st', 'ne', s, f.ne ? 'No evaluable' : 'No evaluado')}</div>`;
    let more = '';
    if (s == 'a') {
      more += hasA ? `<div class="chips">${f.a.map(o => `<button class="chip${(x.o || []).includes(optLabel(o)) ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="opt" data-v="${esc(optLabel(o))}">${esc(optLabel(o))}</button>`).join('')}</div>` : '';
      const sc = scaleDef(f.sc);
      more += `<div class="tl">${f.d ? inp(id, 'd', x.d, 'Detalle', `placeholder="${esc(f.d)}"`) : ''}${sc ? sel(id, 'sc', x.sc, sc.l, sc.o.map(o => (Array.isArray(o) ? [o[0], o[0] + (o[1] ? ' · ' + o[1] : '')] : o))) : ''}${f.num ? inp(id, 'nm', x.nm, f.num.l + (f.num.u ? ` (${f.num.u})` : ''), 'inputmode="decimal"') : ''}</div>`;
    }
    if (s == 'n' && (f.sc || f.num)) { const sc = scaleDef(f.sc); more += `<div class="tl">${sc ? sel(id, 'sc', x.sc, sc.l, sc.o.map(o => (Array.isArray(o) ? [o[0], o[0] + (o[1] ? ' · ' + o[1] : '')] : o))) : ''}${f.num ? inp(id, 'nm', x.nm, f.num.l, 'inputmode="decimal"') : ''}</div>`; }
    if (s == 'ne' && f.ne) more += `<div class="tl">${inp(id, 'd', x.d, 'Motivo (opcional)', 'placeholder="p. ej. por sedación"')}</div>`;
    if (!f.n && !hasA && !f.d) return seg;
    return seg + more;
  }
  const ne = `<button class="chip${x.s == 'ne' ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="ne">No evaluable</button>`;
  const nb = (l = 'Normal') => `<button class="chip" data-r="ex" data-f="${esc(id)}" data-a="norm">${ic('check', 'sm')} ${l}</button>`;
  const clr = `<button class="chip" data-r="ex" data-f="${esc(id)}" data-a="clr">Borrar</button>`;
  const neIn = x.s == 'ne' ? `<div class="tl">${inp(id, 'd', x.d, 'Motivo (opcional)', 'placeholder="p. ej. por sedación"')}</div>` : '';
  const bar = (n = 'Normal') => `<div class="chips">${nb(n)}${ne}${clr}</div>`;
  switch (f.k) {
    case 'text': return `<div class="tl"><label class="f" style="flex:1 1 100%"><textarea data-ef="${esc(id)}" data-ep="v" rows="2" placeholder="${esc(f.ph || '')}">${esc(x.v || '')}</textarea></label></div>`;
    case 'num': return `<div class="tl">${inp(id, 'v', x.v, f.u || 'Valor', 'inputmode="decimal"')}</div>`;
    case 'scale': { const S_ = scaleDef(f); return `<div class="opts">${S_.o.map(o => { const [v, d] = Array.isArray(o) ? o : [o, '']; return `<button class="op2${String(x.v) === String(v) ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="set" data-p="v" data-v="${esc(v)}"><b>${esc(v)}</b>${d ? `<span>${esc(d)}</span>` : ''}</button>`; }).join('')}</div>`; }
    case 'conc': return `${bar('Vigil')}${x.s == 'ne' ? neIn : `<div class="seg sm wrap">${CONC.map(c => segB(id, 'set', c, x.v, c).replace('data-v=', 'data-p="v" data-v=')).join('')}</div><div class="chips">${CONC_MOD.map(m => `<button class="chip${(x.m || []).includes(m) ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="arr" data-p="m" data-v="${m}">${m}</button>`).join('')}</div>`}`;
    case 'orient': return `${bar('Orientado')}${x.s == 'ne' ? neIn : [['t', 'Tiempo'], ['e', 'Espacio'], ['p', 'Persona']].map(([k, l]) => `<div class="rowc"><span>${l}</span><div class="seg sm">${[['c', 'Conservada'], ['a', 'Alterada'], ['ne', 'N/E']].map(([v, t]) => `<button data-r="ex" data-f="${esc(id)}" data-a="set" data-p="${k}" data-v="${v}" class="${x[k] == v ? 'on' : ''}">${t}</button>`).join('')}</div></div>`).join('')}`;
    case 'gcs': {
      const tot = x.o && x.v && x.m ? +x.o + +x.m + (x.v == 'T' ? 0 : +x.v) : null;
      return `${bar('15/15')}${x.s == 'ne' ? neIn : `<div class="tl">${[['o', 'Apertura ocular (O)'], ['v', 'Respuesta verbal (V)'], ['m', 'Respuesta motora (M)']].map(([k, l]) => sel(id, k, x[k], l, GCS[k].map(([v, t]) => [v, `${v} · ${t}`]))).join('')}<b class="tot">${tot != null ? tot + (x.v == 'T' ? 'T' : '/15') : '—'}</b></div>`}`;
    }
    case 'pupils': {
      const sz = ['1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '7', '8', '9'];
      const col = (s, l) => `<div class="pcol"><b>${l}</b>${sel(id, s + 'd', x[s + 'd'], 'Diámetro (mm)', sz.map(v => [v, v.replace('.', ',') + ' mm']))}<div class="seg sm">${[['r', 'Reactiva'], ['h', 'Hipo'], ['a', 'Arreactiva']].map(([v, t]) => `<button data-r="ex" data-f="${esc(id)}" data-a="set" data-p="${s}r" data-v="${v}" class="${x[s + 'r'] == v ? 'on' : ''}">${t}</button>`).join('')}</div><div class="seg sm">${[['r', 'Redonda'], ['i', 'Irregular']].map(([v, t]) => `<button data-r="ex" data-f="${esc(id)}" data-a="set" data-p="${s}f" data-v="${v}" class="${x[s + 'f'] == v ? 'on' : ''}">${t}</button>`).join('')}</div></div>`;
      return `${bar('Isocóricas, 3 mm, reactivas')}${x.s == 'ne' ? neIn : `<div class="pgrid">${col('r', 'Derecha')}${col('l', 'Izquierda')}</div>`}`;
    }
    case 'mrc4': {
      const g = Array.from({ length: 6 }, (_, i) => [String(5 - i), `${5 - i}/5`]);
      return `${bar('5/5 en los cuatro')}${x.s == 'ne' ? neIn : `<div class="pgrid">${sel(id, 'msd', x.msd, 'Superior derecho', g)}${sel(id, 'msi', x.msi, 'Superior izquierdo', g)}${sel(id, 'mid', x.mid, 'Inferior derecho', g)}${sel(id, 'mii', x.mii, 'Inferior izquierdo', g)}</div><div class="tl">${sel(id, 'dist', x.dist, 'Predominio', ['proximal', 'distal'])}</div>`}`;
    }
    case 'motor': {
      const g = Array.from({ length: 6 }, (_, i) => String(5 - i)), G = x.g || {};
      const cell = (k) => `<select data-ef="${esc(id)}" data-ep="g.${k}" aria-label="${k}"><option value="">·</option>${g.map(v => `<option ${G[k] === v ? 'selected' : ''}>${v}</option>`).join('')}</select>`;
      return `${bar('5/5 en todos')}${x.s == 'ne' ? neIn : `<table class="tb"><thead><tr><th>Músculo</th><th>Raíz</th><th>Der.</th><th>Izq.</th></tr></thead><tbody>${MUSCLES.map(([k, n, r]) => `<tr><td>${esc(n)}</td><td class="meta">${r}</td><td>${cell(k + '_d')}</td><td>${cell(k + '_i')}</td></tr>`).join('')}</tbody></table><div class="tl">${inp(id, 'd', x.d, 'Asociación del déficit (raíz, nervio, distribución)', 'placeholder="p. ej. compatible con territorio L5"')}</div>`}`;
    }
    case 'rot': {
      const V = x.v || {}, cell = k => `<select data-ef="${esc(id)}" data-ep="v.${k}" aria-label="${k}"><option value="">·</option>${ROT_V.map((t, i) => `<option value="${i}" ${String(V[k]) === String(i) ? 'selected' : ''}>${t}</option>`).join('')}</select>`;
      return `${bar('++ simétricos')}${x.s == 'ne' ? neIn : `<table class="tb"><thead><tr><th>Reflejo</th><th>Der.</th><th>Izq.</th></tr></thead><tbody>${REFLEXES.map(([k, n]) => `<tr><td>${cap1(n)}</td><td>${cell(k + '_d')}</td><td>${cell(k + '_i')}</td></tr>`).join('')}</tbody></table>`}`;
    }
    case 'patol': return `${bar('Ausentes')}${x.s == 'ne' ? neIn : `<div class="chips">${PATOL.map(([k, l]) => `<button class="chip${x[k] ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="tgl" data-p="${k}">${l}</button>`).join('')}</div>`}`;
    case 'sens': {
      const F = x.f || [];
      return `${bar('Conservada')}${x.s == 'ne' ? neIn : F.map((s, i) => `<div class="sub"><div class="tl">${sel(id, `f.${i}.t`, s.t, 'Hallazgo', SENS_T)}${sel(id, `f.${i}.dz`, s.dz, 'Distribución', SENS_D)}</div>
        <div class="chips">${SENS_M.map(([k, l]) => `<button class="chip${(s.m || []).includes(k) ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="arr" data-p="f.${i}.m" data-v="${k}">${l}</button>`).join('')}</div>
        <div class="tl"><div class="seg sm">${[['d', 'Derecho'], ['i', 'Izquierdo'], ['b', 'Bilateral']].map(([v, t]) => `<button data-r="ex" data-f="${esc(id)}" data-a="set" data-p="f.${i}.l" data-v="${v}" class="${s.l == v ? 'on' : ''}">${t}</button>`).join('')}</div>${['derm', 'nerv', 'nivel', 'tronco'].includes(s.dz) ? inp(id, `f.${i}.de`, s.de, s.dz == 'nerv' ? 'Nervio' : s.dz == 'nivel' ? 'Nivel' : 'Raíz o segmento', 'placeholder="p. ej. L5"') : ''}<button class="x" data-r="ex" data-f="${esc(id)}" data-a="rm" data-p="f" data-i="${i}" aria-label="Quitar">×</button></div></div>`).join('') + `<button class="add" data-r="ex" data-f="${esc(id)}" data-a="push" data-p="f" data-v='{"t":"hipo"}'>${ic('plus', 'sm')} Agregar hallazgo sensitivo</button>`}`;
    }
    case 'nihss': {
      const V = x.v || {}, tot = NIHSS.every(([k]) => V[k] !== '' && V[k] != null) ? NIHSS.reduce((t, [k]) => t + (V[k] == 'NV' ? 0 : +V[k]), 0) : null;
      return `${bar('Todo en 0')}${x.s == 'ne' ? neIn : NIHSS.map(([k, n, o, nv]) => sel(id, 'v.' + k, V[k], `${k}. ${n}`, [...o.map((t, i) => [String(i), `${i} · ${t}`]), ...(nv ? [['NV', 'NV · no valorable']] : [])])).join('') + `<p class="tot">NIHSS ${tot ?? '—'}${tot == null ? ' (completá los 15 ítems)' : ''}</p>`}`;
    }
    case 'asia': return asiaHtml(id, x, bar, neIn);
    case 'vitals': return `<div class="chips"><button class="chip${x.afe ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="tgl" data-p="afe">Afebril</button>${segB(id, 'set', 'e', x.hd, 'Hemodinámicamente estable').replace('class="', 'class="chip ').replace('data-v=', 'data-p="hd" data-v=')}${segB(id, 'set', 'i', x.hd, 'Inestable').replace('class="', 'class="chip ').replace('data-v=', 'data-p="hd" data-v=')}${clr}</div>
      <div class="pgrid">${inp(id, 't', x.t, 'T (°C)', 'inputmode="decimal"')}${inp(id, 'fc', x.fc, 'FC (lpm)', 'inputmode="numeric"')}${inp(id, 'pas', x.pas, 'PA sistólica', 'inputmode="numeric"')}${inp(id, 'pad', x.pad, 'PA diastólica', 'inputmode="numeric"')}${inp(id, 'fr', x.fr, 'FR (rpm)', 'inputmode="numeric"')}${inp(id, 'sat', x.sat, 'SatO₂ (%)', 'inputmode="numeric"')}${sel(id, 'o2', x.o2, 'Soporte de O₂', O2.map(([v, t]) => [v, t]))}${inp(id, 'o2v', x.o2v, 'Flujo o FiO₂', 'placeholder="a 2 L/min"')}${inp(id, 'glu', x.glu, 'Glucemia (mg/dL)', 'inputmode="numeric"')}</div>
      <div class="chips"><button class="chip${x.rit == 'i' ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="set" data-p="rit" data-v="i">Ritmo irregular</button><button class="chip${x.pam ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="tgl" data-p="pam">Incluir PAM</button></div>`;
    case 'lab': {
      const V = x.v || {}, hbLo = E().sex == 'f' ? 12 : 13, hbHi = E().sex == 'f' ? 16 : 17;
      return `<div class="pgrid lab">${LAB.map(([k, l, u, lo, hi]) => { if (k == 'hb') [lo, hi] = [hbLo, hbHi]; const n = pn(V[k]), fl = n == null ? '' : n > hi ? ' up' : n < lo ? ' dn' : ''; return `<label class="f${fl}">${esc(l.charAt(0).toUpperCase() + l.slice(1))}${u ? ` <small>${esc(u)}</small>` : ''}<input data-ef="${esc(id)}" data-ep="v.${k}" value="${esc(V[k] ?? '')}" inputmode="decimal" autocomplete="off" placeholder="${lo}–${hi}"></label>`; }).join('')}</div>
      ${(x.ex || []).map((r, i) => `<div class="tl">${inp(id, `ex.${i}.n`, r.n, 'Determinación')}${inp(id, `ex.${i}.v`, r.v, 'Valor', 'inputmode="decimal"')}${inp(id, `ex.${i}.u`, r.u, 'Unidad')}<button class="x" data-r="ex" data-f="${esc(id)}" data-a="rm" data-p="ex" data-i="${i}" aria-label="Quitar">×</button></div>`).join('')}
      <div class="tl"><button class="add" data-r="ex" data-f="${esc(id)}" data-a="push" data-p="ex" data-v="{}">${ic('plus', 'sm')} Otra determinación</button>${clr}</div><p class="meta">Los rangos de referencia son orientativos y varían según el laboratorio. Las alteraciones se marcan, pero nunca se convierten en diagnósticos.</p>`;
    }
    case 'dev': {
      const L = x.list || [], types = f.types || Object.keys(DEVICES);
      return `<div class="chips"><button class="chip${x.s == 'n' && !L.length ? ' on' : ''}" data-r="ex" data-f="${esc(id)}" data-a="set" data-p="s" data-v="n">Sin dispositivos</button>${clr}</div>` + L.map((d, i) => devHtml(id, d, i)).join('') +
        `<label class="f">Agregar dispositivo<select data-evdev="${esc(id)}"><option value="">Elegí…</option>${types.map(t => `<option>${esc(t)}</option>`).join('')}</select></label>`;
    }
  }
  return '';
}
const cap1 = s => s.charAt(0).toUpperCase() + s.slice(1);

function devHtml(id, d, i) {
  const props = (DEVICES[d.ty] || ['m', 'pedcs'])[1], P = k => props.includes(k), p = k => `list.${i}.${k}`;
  const est = d.ty == 'SNG' ? DEV_EST.SNG : DEV_EST._;
  return `<div class="sub"><div class="ih"><b>${esc(d.ty)}</b><button class="x" data-r="ex" data-f="${esc(id)}" data-a="rm" data-p="list" data-i="${i}" aria-label="Quitar">×</button></div>
  <div class="seg sm">${[['d', 'Derecho'], ['i', 'Izquierdo'], ['b', 'Bilateral'], ['', 'Sin lado']].map(([v, t]) => `<button data-r="ex" data-f="${esc(id)}" data-a="set" data-p="${p('lado')}" data-v="${v}" class="${(d.lado || '') == v ? 'on' : ''}">${t}</button>`).join('')}</div>
  <div class="pgrid">${d.ty == 'Otro dispositivo' ? inp(id, p('nom'), d.nom, 'Nombre') : ''}${inp(id, p('loc'), d.loc, 'Localización', 'placeholder="p. ej. yugular interno"')}
  ${P('p') ? sel(id, p('perm'), d.perm, 'Permeabilidad', [['p', 'Permeable'], ['n', 'No permeable']]) : ''}${P('e') ? sel(id, p('est'), d.est, 'Estado', est) : ''}${P('n') ? inp(id, p('niv'), d.niv, 'Nivel (cmH₂O)', 'inputmode="decimal"') : ''}${P('v') ? inp(id, p('pic'), d.pic, 'PIC (mmHg)', 'inputmode="decimal"') : ''}
  ${P('d') ? inp(id, p('deb'), d.deb, d.ty == 'Sonda vesical' ? 'Diuresis' : 'Débito', 'inputmode="decimal"') + sel(id, p('du'), d.du, 'Unidad', ['mL/h', 'mL/24 h', 'mL']) : ''}${P('c') ? sel(id, p('car'), d.car, 'Aspecto', DEV_CAR) : ''}
  ${P('s') ? sel(id, p('sit'), d.sit, 'Sitio de inserción', DEV_SITE.map(([v, t]) => [v, t.charAt(0).toUpperCase() + t.slice(1)])) : ''}<label class="f">Colocación<input type="date" data-ef="${esc(id)}" data-ep="${p('fe')}" value="${esc(d.fe || '')}"></label></div></div>`;
}

function asiaHtml(id, x, bar, neIn) {
  if (x.s == 'ne') return bar('Todo normal') + neIn;
  const c = (k, key, opts) => `<select data-ef="${esc(id)}" data-ep="${k}.${key}" aria-label="${key}"><option value="">·</option>${opts.map(v => `<option ${String((x[k] || {})[key]) === v ? 'selected' : ''}>${v}</option>`).join('')}</select>`;
  const M = ['0', '1', '2', '3', '4', '5', 'NT'], Sn = ['0', '1', '2', 'NT'];
  const has = ['m', 'lt', 'pp'].some(k => x[k] && Object.keys(x[k]).length), r = has ? isncsci(x) : null;
  return `${bar('Todo normal')}
  <p class="meta">Motor 0–5 por músculo clave; sensibilidad 0 ausente, 1 alterada, 2 normal. Lo que dejes vacío se toma como normal y queda marcado como no evaluado.</p>
  <div class="sub"><b>Rellenar rápido</b><div class="tl">${sel(id, 'fill.from', (x.fill || {}).from, 'Desde (hacia caudal)', DERM)}${sel(id, 'fill.lt', (x.fill || {}).lt, 'Tacto', Sn.slice(0, 3))}${sel(id, 'fill.pp', (x.fill || {}).pp, 'Pinchazo', Sn.slice(0, 3))}${sel(id, 'fill.m', (x.fill || {}).m, 'Motor', M.slice(0, 6))}${sel(id, 'fill.side', (x.fill || {}).side, 'Lado', [['b', 'Ambos'], ['d', 'Derecho'], ['i', 'Izquierdo']])}<button class="bt sec" data-r="ex" data-f="${esc(id)}" data-a="asiafill">Aplicar</button></div></div>
  <details class="g"><summary>Motor (músculos clave)</summary><table class="tb"><thead><tr><th>Nivel</th><th>Músculo</th><th>D</th><th>I</th></tr></thead><tbody>${KEYM.map(([l, n]) => `<tr><td>${l}</td><td>${n}</td><td>${c('m', l + 'd', M)}</td><td>${c('m', l + 'i', M)}</td></tr>`).join('')}</tbody></table></details>
  <details class="g"><summary>Sensibilidad (tacto ligero y pinchazo)</summary><table class="tb"><thead><tr><th>Derm.</th><th>TL D</th><th>TL I</th><th>PP D</th><th>PP I</th></tr></thead><tbody>${DERM.map(d => `<tr><td>${d}</td><td>${c('lt', d + 'd', Sn)}</td><td>${c('lt', d + 'i', Sn)}</td><td>${c('pp', d + 'd', Sn)}</td><td>${c('pp', d + 'i', Sn)}</td></tr>`).join('')}</tbody></table></details>
  <div class="rowc"><span>Contracción anal voluntaria</span><div class="seg sm">${segB(id, 'set', 'si', x.vac, 'Sí').replace('data-v=', 'data-p="vac" data-v=')}${segB(id, 'set', 'no', x.vac, 'No').replace('data-v=', 'data-p="vac" data-v=')}</div></div>
  <div class="rowc"><span>Presión anal profunda</span><div class="seg sm">${segB(id, 'set', 'si', x.dap, 'Sí').replace('data-v=', 'data-p="dap" data-v=')}${segB(id, 'set', 'no', x.dap, 'No').replace('data-v=', 'data-p="dap" data-v=')}</div></div>
  ${r ? `<div class="kp"><div><b>${r.ais}</b>AIS</div><div><b>${r.nli}</b>Nivel neurológico</div><div><b>${r.uems}/50</b>Motor MMSS</div><div><b>${r.lems}/50</b>Motor MMII</div></div><p class="meta">Calculado con las reglas de la clasificación ISNCSCI. Ante casos dudosos (ítems NT, niveles sin músculo clave) verificalo con la calculadora oficial de ASIA.</p>` : ''}`;
}

/* =========================================================================
   Acciones
   ========================================================================= */
const getP = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
function setP(o, p, v) { const ks = p.split('.'); let a = o; ks.slice(0, -1).forEach((k, i) => { if (a[k] == null) a[k] = /^\d+$/.test(ks[i + 1]) ? [] : {}; a = a[k]; }); a[ks[ks.length - 1]] = v; }
const fieldOf = id => runT().secs.flatMap(s => s.f).find(f => f.id == id);
const keepScroll = () => render();

export const EVR = {
  evt(b) {
    const e = E(), id = b.dataset.v;
    if (!b.dataset.keep && e.tid != id) { S().ev = { v: 2, tid: id, open: 1, step: 0, sex: e.sex }; }
    else { e.tid = id; e.open = 1; }
    save(); render(); scrollTo(0, 0);
  },
  evback() { E().open = 0; save(); render(); },
  evgo(b) { E().step = +b.dataset.i; save(); render(); scrollTo(0, 0); },
  evopts() { E().showOpts = !E().showOpts; render(); },
  evall() {
    const T = runT(), x = X();
    activeSecs(T, E()).forEach(s => s.f.forEach(f => { const n = normalOf(f, x[f.id]); if (n) x[f.id] = n; }));
    save(); render(); ctx.toast('Todo marcado como normal. Cambiá solo lo alterado.');
  },
  evsec(b) {
    const s = activeSecs(runT(), E())[+b.dataset.i], x = X(), v = b.dataset.v;
    s.f.forEach(f => { if (v == 'x') delete x[f.id]; else if (v == 'n') { const n = normalOf(f, x[f.id]); if (n) x[f.id] = n; } else if (!['text', 'num', 'scale', 'lab', 'dev', 'vitals'].includes(f.k)) x[f.id] = { s: 'ne' }; });
    save(); render();
  },
  evon(b) { const e = E(), T = runT(), s = T.secs.find(s => s.id == b.dataset.v), cur = e.on && s.id in e.on ? e.on[s.id] : !s.off; (e.on ??= {})[s.id] = !cur; save(); render(); },
  evopt(b) { const e = E(); e[b.dataset.k] = b.dataset.v || ''; if (b.dataset.k == 'out' || b.dataset.k == 'det' || b.dataset.k == 'lf' || b.dataset.k == 'nochg') e.txt = null; save(); render(); },
  evfrom() { const e = E(), h = (S().evh || []).find(h => h.id == e.base); if (!h) return; e.x = clone(h.x); e.on = clone(h.on || {}); e.extra = [...(h.extra || [])]; e.step = 0; save(); render(); ctx.toast('Valores copiados: modificá solo lo que cambió'); },
  evfromh(b) { const h = (S().evh || []).find(h => h.id == b.dataset.v); if (!h || !tpl(h.tid)) return; S().ev = { v: 2, tid: h.tid, open: 1, step: 0, base: h.id, x: clone(h.x), on: clone(h.on || {}), extra: [...(h.extra || [])], sex: h.sex }; save(); render(); ctx.toast('Comparando con la evaluación guardada'); },
  evsave() {
    const e = E(), tag = ($('#evtag') || {}).value || '';
    const H = (S().evh ??= []);
    H.push({ id: uid(), tid: e.tid, at: Date.now(), tag: tag.trim().slice(0, 30), x: clone(X()), on: clone(e.on || {}), extra: [...(e.extra || [])], sex: e.sex });
    if (H.length > 60) H.splice(0, H.length - 60);
    save(); ctx.toast('Evaluación guardada en este dispositivo'); render();
  },
  evcopy() { const t = $('#vout'); if (!t) return; t.select(); try { navigator.clipboard.writeText(t.value); } catch { document.execCommand('copy'); } $('#vm').textContent = ' Copiado.'; },
  evtxt() { E().txt = evoText(); save(); render(); },
  evregen() { E().txt = null; save(); render(); },
  evreset(b) { if (!b.dataset.arm) { b.dataset.arm = 1; b.textContent = '¿Seguro? Tocá otra vez'; return; } const e = E(); S().ev = { v: 2, tid: e.tid, open: 1, step: 0, sex: e.sex }; save(); render(); },
  ex(b) {
    const d = b.dataset, f = fieldOf(d.f), x = X(); if (!f) return;
    const cur = x[d.f] || {};
    switch (d.a) {
      case 'st': x[d.f] = cur.s == d.v ? {} : Object.assign(cur, { s: d.v }); if (d.v != 'a') { delete x[d.f].o; } break;
      case 'opt': { cur.s = 'a'; const o = cur.o || []; const i = o.indexOf(d.v); if (f.one) cur.o = i >= 0 ? [] : [d.v]; else { i >= 0 ? o.splice(i, 1) : o.push(d.v); cur.o = o; } x[d.f] = cur; break; }
      case 'set': { const p = d.p || 's'; if (String(getP(cur, p)) === d.v) setP(cur, p, ''); else setP(cur, p, d.v); if (cur.s == 'ne' && p != 's') delete cur.s; x[d.f] = cur; break; }
      case 'tgl': setP(cur, d.p, !getP(cur, d.p)); if (cur.s == 'ne') delete cur.s; x[d.f] = cur; break;
      case 'arr': { const a = getP(cur, d.p) || []; const i = a.indexOf(d.v); i >= 0 ? a.splice(i, 1) : a.push(d.v); setP(cur, d.p, a); x[d.f] = cur; break; }
      case 'push': { const a = getP(cur, d.p) || []; a.push(JSON.parse(d.v || '{}')); setP(cur, d.p, a); if (cur.s == 'n' && d.p == 'f') delete cur.s; x[d.f] = cur; break; }
      case 'rm': { const a = getP(cur, d.p) || []; a.splice(+d.i, 1); setP(cur, d.p, a); break; }
      case 'ne': x[d.f] = cur.s == 'ne' ? {} : { s: 'ne' }; break;
      case 'norm': x[d.f] = normalOf(f, cur) || cur; break;
      case 'clr': delete x[d.f]; break;
      case 'asiafill': {
        const F = cur.fill || {}, i0 = DERM.indexOf(F.from); if (i0 < 0) return ctx.toast('Elegí desde qué dermatoma');
        const sides = F.side == 'd' ? ['d'] : F.side == 'i' ? ['i'] : ['d', 'i'];
        DERM.slice(i0).forEach(dm => sides.forEach(s => { if (F.lt) setP(cur, `lt.${dm}${s}`, F.lt); if (F.pp) setP(cur, `pp.${dm}${s}`, F.pp); }));
        if (F.m) KEYM.forEach(([l]) => { const li = DERM.indexOf(l); if (li >= i0) sides.forEach(s => setP(cur, `m.${l}${s}`, F.m)); });
        x[d.f] = cur; break;
      }
    }
    E().txt = null; save(); keepScroll();
  },
  evcls() { ctx.openEditor('cls'); },
  evedit(b) { ctx.openEditor('tpl', b.dataset.v); },
  evnew() { ctx.openEditor('new'); }
};

// Campos de texto y selects (delegados desde la vista)
export function evoInput(e) {
  const t = e.target, d = t.dataset;
  if (d.evq != null) { q = t.value; const v = $('#view'); v.innerHTML = evo(); const i = v.querySelector('[data-evq]'); i.focus(); i.setSelectionRange(q.length, q.length); return true; }
  if (d.evtxt != null) { E().txt = t.value; save(); return true; }
  if (d.ef == null || t.tagName == 'SELECT') return false;
  const x = X(), cur = x[d.ef] || {}; setP(cur, d.ep, t.value); if (cur.s == 'ne' && d.ep != 'd') delete cur.s; x[d.ef] = cur; E().txt = null; save();
  // vista previa en vivo de la frase del campo
  const f = fieldOf(d.ef), it = t.closest('.item');
  if (f && it) { const r = renderField(f, cur, baseX() && baseX()[f.id], opts()); let pv = it.querySelector(':scope > .pv'); if (r && r.t) { if (!pv) { pv = document.createElement('p'); pv.className = 'pv'; it.appendChild(pv); } pv.textContent = r.t; it.classList.toggle('alt', !!r.alt); } else if (pv) pv.remove(); }
  return true;
}
export function evoChange(e) {
  const t = e.target, d = t.dataset;
  if (d.evmod != null) { if (t.value) { (E().extra ??= []).push(t.value); save(); render(); } return true; }
  if (d.evbase != null) { E().base = t.value || null; E().txt = null; save(); render(); return true; }
  if (d.evdev != null) { if (t.value) { const x = X(), cur = x[d.evdev] || {}; (cur.list ??= []).push({ ty: t.value }); delete cur.s; x[d.evdev] = cur; save(); render(); } return true; }
  if (d.evopt != null) { E()[d.evopt] = t.checked; save(); render(); return true; }
  if (d.ef == null) return false;
  if (t.tagName != 'SELECT') return true; // los campos de texto ya se guardaron con «input»; redibujar acá se comería el próximo toque
  const x = X(), cur = x[d.ef] || {}; setP(cur, d.ep, t.value); if (cur.s == 'ne' && d.ep != 'd' && d.ep != 'ev') delete cur.s; x[d.ef] = cur; E().txt = null; save(); render();
  return true;
}
