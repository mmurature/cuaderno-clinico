// Partes quirúrgicos: biblioteca, borradores por secciones, pasos, validación, versiones y templates propios.
// Borradores y partes (S.pq): solo en el dispositivo. Templates propios (S.pqt) y favoritos (S.pqx): se sincronizan.
import { esc, today } from '../data.js';
import { ic } from '../icons.js';
import { SECS, resolve, visible, check, generate, frag } from './engine.js';
import { PBUILTIN } from './lib/index.js';

let ctx = null;
const S = () => ctx.getS(), save = () => ctx.save(), render = () => ctx.render(), $ = s => document.querySelector(s);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const clone = o => JSON.parse(JSON.stringify(o));
export const initPartes = c => { ctx = c; };

export const pbuiltin = id => PBUILTIN.find(t => t.id == id);
export const ptpl = id => (S().pqt || {})[id] || pbuiltin(id) || null;
const X = () => (S().pqx ??= { fav: [], hid: [] });
const allT = () => { const own = Object.values(S().pqt || {}); return [...PBUILTIN.map(t => (S().pqt || {})[t.id] || t), ...own.filter(t => !pbuiltin(t.id))]; };
const drafts = () => (S().pq ??= []);
export const findP = id => drafts().find(p => p.id == id);
const fmtAt = t => new Date(t).toLocaleString('es-AR', { dateStyle: 'short', timeStyle: 'short' });

/* =========================================================================
   Biblioteca
   ========================================================================= */
let q = '', spf = '';
export function viewPartes() {
  const T = allT().filter(t => !X().hid.includes(t.id)), fav = new Set(X().fav), ql = q.toLowerCase();
  const D = drafts().filter(p => p.st != 'f').sort((a, b) => b.up - a.up), F = drafts().filter(p => p.st == 'f').sort((a, b) => b.up - a.up).slice(0, 8);
  const sps = [...new Set(T.map(t => t.sp))];
  const match = t => (!ql || (t.n + ' ' + t.sp + ' ' + (t.sub || '')).toLowerCase().includes(ql)) && (!spf || t.sp == spf);
  const trow = t => `<div class="row"><button class="tx rowbtn" data-r="pnew" data-v="${esc(t.id)}"><b>${esc(t.n)}${(S().pqt || {})[t.id] ? ' <span class="tag">propio</span>' : ''}</b><small>${esc([t.sp, t.sub].filter(Boolean).join(' · '))}</small></button><button class="ib" data-r="pfav" data-v="${esc(t.id)}" aria-label="${fav.has(t.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}">${fav.has(t.id) ? '★' : '☆'}</button></div>`;
  const prow = p => { const t = ptpl(p.tid); return `<button class="row" data-nav="#/parte/${p.id}"><span class="tx"><b>${esc((p.x || {}).proc || (t || {}).n || 'Parte')}</b><small>${p.st == 'f' ? 'Finalizado' : 'Borrador'} · ${fmtAt(p.up)}</small></span><span class="st ${p.st == 'f' ? 's2' : 's1'}">${p.st == 'f' ? 'Final' : 'Borrador'}</span></button>`; };
  const rec = [...new Set(drafts().sort((a, b) => b.up - a.up).map(p => p.tid))].slice(0, 4).map(ptpl).filter(Boolean);
  const groups = sps.filter(s => !spf || s == spf).map(sp => {
    const subs = [...new Set(T.filter(t => t.sp == sp && match(t)).map(t => t.sub || 'General'))];
    if (!subs.length) return '';
    return `<div class="eyebrow">${esc(sp)}</div>` + subs.map(sb => `<p class="meta sublbl">${esc(sb)}</p><div class="list">${T.filter(t => t.sp == sp && (t.sub || 'General') == sb && match(t)).map(trow).join('')}</div>`).join('');
  }).join('');
  return `<p class="meta" style="margin:4px 2px 10px">Elegí el procedimiento, completá lo que cambia y la app redacta el parte. Nada se da por hecho: lo que no confirmás no se escribe.</p>
  ${D.length ? `<div class="eyebrow">Borradores</div><div class="list">${D.map(prow).join('')}</div>` : ''}
  <div class="srw">${ic('search', 'sm')}<input class="sr" data-pq type="search" placeholder="Buscar procedimiento…" value="${esc(q)}" autocomplete="off"></div>
  <div class="chips" style="margin-bottom:6px"><button class="chip${!spf ? ' on' : ''}" data-r="psp" data-v="">Todas</button>${sps.map(s => `<button class="chip${spf == s ? ' on' : ''}" data-r="psp" data-v="${esc(s)}">${esc(s)}</button>`).join('')}</div>
  ${!ql && fav.size ? `<div class="eyebrow">Favoritos</div><div class="list">${T.filter(t => fav.has(t.id)).map(trow).join('')}</div>` : ''}
  ${!ql && rec.length ? `<div class="eyebrow">Recientes</div><div class="list">${rec.map(trow).join('')}</div>` : ''}
  ${groups || `<div class="empty"><p>Nada coincide con “${esc(q)}”.</p></div>`}
  ${F.length ? `<div class="eyebrow">Partes finalizados</div><div class="list">${F.map(prow).join('')}</div>` : ''}
  <div class="tools" style="margin-top:14px"><button class="ib txt" data-r="pednew">${ic('plus', 'sm')} Template nuevo</button>${X().hid.length ? `<button class="ib txt" data-r="punhide">Mostrar ocultos (${X().hid.length})</button>` : ''}</div>
  <p class="meta" style="margin-top:12px">Los partes se guardan solo en este dispositivo. El texto es un borrador clínico: revisalo y validalo antes de pasarlo a la historia clínica.</p>`;
}

/* =========================================================================
   Parte (borrador)
   ========================================================================= */
const SEC_N = Object.fromEntries(SECS);
export function viewParte(id) {
  const P = findP(id); if (!P) return `<div class="empty"><p>Este parte ya no existe.</p><button class="bt" data-nav="#/partes">Ir a partes</button></div>`;
  const T = ptpl(P.tid) || P.snap; if (!T) return '<div class="empty"><p>No se encontró el template.</p></div>';
  if (P.st == 'f') return finalView(P, T);
  const n = SECS.length, step = Math.min(Math.max(+P.step || 0, 0), n), last = step == n, F = resolve(T);
  const head = `<h2 class="lvl-title">${esc(T.n)}</h2><p class="meta" style="margin-top:-6px">${esc(T.ctx || '')}</p>
  <div class="steps">${Array.from({ length: n + 1 }, (_, i) => `<button data-r="pgo" data-i="${i}" class="${i == step ? 'on' : i < step ? 'done' : ''}" aria-label="${i < n ? SECS[i][1] : 'Revisión'}"></button>`).join('')}</div>
  <p class="meta">${last ? 'Revisión y texto' : `${SECS[step][0]}. ${SECS[step][1]}`}</p>`;
  if (last) return head + review(P, T);
  const s = SECS[step][0], fs = F.filter(f => f.sec == s);
  return head + `<div class="pan"><h3>${SEC_N[s]}</h3>${fs.map(f => pfield(P, f)).join('')}${s == 'D' ? stepsHtml(P, F) : ''}</div>
  <div class="stepnav">${step ? `<button class="bt sec" data-r="pgo" data-i="${step - 1}">Anterior</button>` : ''}<button class="bt" data-r="pgo" data-i="${step + 1}">${step + 1 == n ? 'Revisar' : 'Siguiente'}</button></div>`;
}

function pfield(P, f) {
  const x = P.x, na = (P.na || {})[f.id], id = esc(f.id);
  if (!visible(f, x)) return '';
  const v = x[f.id], cls = na ? ' nx' : v != null && v !== '' && !(Array.isArray(v) && !v.length) ? ' ok' : f.req ? ' req' : '';
  let b = '';
  if (f.k == 'opt' || f.k == 'multi') {
    const on = l => (f.k == 'multi' ? (v || []).includes(l) : v == l);
    b = `<div class="chips">${f.o.map(o => `<button class="chip${on(o[0]) ? ' on' : ''}" data-r="pset" data-f="${id}" data-v="${esc(o[0])}">${esc(o[0])}</button>`).join('')}</div>`;
    const needD = f.o.some(o => on(o[0]) && o[1].includes('{d}'));
    if (needD) b += `<label class="f">Detalle<input data-pf="${id}_d" value="${esc(x[f.id + '_d'] || '')}" placeholder="${esc(f.ph || '')}" autocomplete="off"></label>`;
  } else if (f.k == 'yn') b = `<div class="seg sm">${[['si', 'Sí'], ['no', 'No']].map(([k, l]) => `<button data-r="pset" data-f="${id}" data-v="${k}" class="${v == k ? 'on' : ''}">${l}</button>`).join('')}</div>`;
  else if (f.k == 'date') b = `<label class="f"><input type="date" data-pf="${id}" value="${esc(v || '')}"></label>`;
  else if (f.k == 'num') b = `<label class="f"><input data-pf="${id}" value="${esc(v || '')}" inputmode="decimal" autocomplete="off">${f.u ? `<small class="meta">${esc(f.u)}</small>` : ''}</label>`;
  else b = `<label class="f"><textarea data-pf="${id}" rows="${f.sec == 'A' ? 1 : 2}" placeholder="${esc(f.ph || '')}">${esc(v || '')}</textarea></label>`;
  const pv = frag(f, x);
  return `<div class="item${cls}"><div class="ih"><b>${esc(f.l)}${f.req ? ' <span class="reqb">obligatorio</span>' : ''}</b>${f.sec != 'A' ? `<button class="chip sm${na ? ' on' : ''}" data-r="pna" data-f="${id}">No aplica</button>` : ''}</div>${na ? '' : b}${pv && f.sec != 'A' && !na ? `<p class="pv">${esc(f.k == 'yn' ? pv : f.p ? f.p.replace('{v}', pv.charAt(0).toLowerCase() + pv.slice(1)) : pv)}</p>` : ''}</div>`;
}

function stepsHtml(P, F) {
  const St = P.steps || [];
  return `<div class="eyebrow">Pasos de la técnica</div><p class="meta">Confirmá solo los pasos que se hicieron, en el orden real. Podés editarlos, reordenarlos, quitarlos o agregar maniobras. Los campos entre llaves se completan con lo que elegiste.</p>
  ${St.map((s, i) => `<div class="pstep${s.on ? ' on' : ''}"><button class="ck2" data-r="pston" data-i="${i}" aria-label="${s.on ? 'Quitar confirmación' : 'Confirmar paso'}">${s.on ? ic('check', 'sm') : ''}</button><textarea data-pst="${i}" rows="2">${esc(s.t)}</textarea><div class="pctl"><button class="x" data-r="pstmv" data-i="${i}" data-v="-1" aria-label="Subir">↑</button><button class="x" data-r="pstmv" data-i="${i}" data-v="1" aria-label="Bajar">↓</button><button class="x" data-r="pstdel" data-i="${i}" aria-label="Quitar">×</button></div></div>`).join('')}
  <div class="acts"><button class="add" data-r="pstadd">${ic('plus', 'sm')} Agregar paso o maniobra</button><button class="add" data-r="pstall">Confirmar todos</button></div>`;
}

function review(P, T) {
  const c = check(T, P), gen = generate(T, P), txt = P.txt != null ? P.txt : gen, edited = P.txt != null;
  const ok = !c.pend.length && !c.contra.length;
  return `${c.contra.length ? `<div class="pan warnp bad"><h3>Contradicciones</h3><ul>${c.contra.map(m => `<li>${esc(m)}</li>`).join('')}</ul><p class="meta">Resolvelas antes de finalizar.</p></div>` : ''}
  ${c.pend.length ? `<div class="pan warnp"><h3>Pendiente de confirmar (${c.pend.length})</h3><ul>${c.pend.map(m => `<li>${esc(m)}</li>`).join('')}</ul><p class="meta">Completalos o marcá “No aplica”. El parte no se puede finalizar con datos obligatorios sin documentar.</p></div>` : ''}
  ${c.warn.length ? `<div class="pan"><ul class="meta">${c.warn.map(m => `<li>${esc(m)}</li>`).join('')}</ul></div>` : ''}
  <div class="pan"><h3>Parte quirúrgico</h3>${edited ? '<p class="meta">Editaste el texto a mano. Si cambiás datos, tocá “Regenerar con cambios” (la versión actual queda guardada).</p>' : ''}
  <textarea id="pout" data-ptxt ${edited ? '' : 'readonly'} rows="16">${esc(txt)}</textarea>
  <div class="acts"><button class="bt" data-r="pcopy">${ic('copy', 'sm')} Copiar</button>${edited ? `<button class="bt sec" data-r="pregen">Regenerar con cambios</button>` : `<button class="bt sec" data-r="pedit">${ic('edit', 'sm')} Editar texto final</button>`}<span class="meta" id="pm"></span></div>
  ${(P.vers || []).length ? `<details class="g"><summary>Versiones anteriores (${P.vers.length})</summary>${P.vers.slice().reverse().map((v, i) => `<div class="li"><span class="meta" style="flex:1">${fmtAt(v.at)}</span><button class="add" data-r="pver" data-i="${P.vers.length - 1 - i}">Recuperar</button></div>`).join('')}</details>` : ''}
  <div class="acts" style="margin-top:14px"><button class="bt" data-r="pfin" ${ok ? '' : 'disabled'}>${ic('check', 'sm')} Finalizar parte</button></div></div>
  <div class="pan"><h3>Más acciones</h3><div class="tl"><label class="f" style="flex:2">Nombre del template personalizado<input id="pqn" placeholder="${esc(T.n)} (mi técnica)" autocomplete="off"></label><button class="bt sec" data-r="psavet">Guardar como template</button></div>
  <div class="acts"><button class="add" data-r="pdup">Duplicar parte</button><button class="add" data-r="ped" data-v="${esc(T.id)}">${ic('edit', 'sm')} Editar template</button><button class="add dan" data-r="pdel">${ic('trash', 'sm')} Eliminar borrador</button></div></div>
  <div class="stepnav"><button class="bt sec" data-r="pgo" data-i="${SECS.length - 1}">Anterior</button></div>`;
}

function finalView(P, T) {
  const logged = P.lg;
  return `<h2 class="lvl-title">${esc((P.x || {}).proc || T.n)}</h2><p class="meta">Finalizado el ${fmtAt(P.fin.at)} · template v${P.tv || 1}. Un parte finalizado no cambia aunque después edites el template.</p>
  <div class="pan"><textarea id="pout" readonly rows="18">${esc(P.fin.txt)}</textarea><div class="acts"><button class="bt" data-r="pcopy">${ic('copy', 'sm')} Copiar</button><button class="bt sec" data-r="pdup">Duplicar como borrador nuevo</button><span class="meta" id="pm"></span></div></div>
  <div class="pan"><h3>${logged ? 'Registrado en tus estadísticas' : 'Registrar en tus procedimientos'}</h3>${logged ? '<p class="meta">Ya figura en Estadísticas.</p>' : `<p class="meta">Suma este procedimiento a tu panel de rendimiento (sin datos del paciente).</p><div class="tl"><label class="f">Tu rol<select id="prol"><option>Cirujano</option><option>Ayudante</option><option>Observador</option></select></label><button class="bt" data-r="plog">Registrar</button></div>`}</div>
  <div class="acts"><button class="add dan" data-r="pdel">${ic('trash', 'sm')} Eliminar parte</button></div>`;
}

/* =========================================================================
   Acciones
   ========================================================================= */
const cur = () => { const m = location.hash.match(/^#\/parte\/([^/]+)/); return m ? findP(decodeURIComponent(m[1])) : null; };
const touch = P => { P.up = Date.now(); };
function newDraft(T) {
  const x = Object.assign({ proc: T.n, serv: T.sp, fecha: today() }, clone(T.def || {}));
  const steps = (T.pasos || []).map(t => (typeof t == 'string' ? { t, on: false } : { t: t.t, on: !!t.on }));
  const P = { id: uid(), tid: T.id, tv: T.v || 1, at: Date.now(), up: Date.now(), st: 'b', step: 0, x, na: {}, steps, txt: null, vers: [] };
  drafts().push(P); return P;
}
export const PR = {
  psp(b) { spf = b.dataset.v; render(); },
  pfav(b) { const f = X().fav, i = f.indexOf(b.dataset.v); i >= 0 ? f.splice(i, 1) : f.push(b.dataset.v); save(); render(); },
  punhide() { X().hid = []; save(); render(); },
  pnew(b) { const T = ptpl(b.dataset.v); if (!T) return; const P = newDraft(T); save(); ctx.go('#/parte/' + P.id); },
  pgo(b) { const P = cur(); P.step = +b.dataset.i; save(); render(); scrollTo(0, 0); },
  pset(b) {
    const P = cur(), T = ptpl(P.tid), f = resolve(T).find(f => f.id == b.dataset.f), v = b.dataset.v;
    if (f.k == 'multi') { const a = P.x[f.id] || []; const i = a.indexOf(v); i >= 0 ? a.splice(i, 1) : a.push(v); P.x[f.id] = a; }
    else P.x[f.id] = P.x[f.id] == v ? '' : v;
    delete (P.na || {})[f.id]; P.txt = P.txt; touch(P); save(); render();
  },
  pna(b) { const P = cur(); (P.na ??= {})[b.dataset.f] = !P.na[b.dataset.f]; touch(P); save(); render(); },
  pston(b) { const P = cur(), s = P.steps[+b.dataset.i]; s.on = !s.on; touch(P); save(); render(); },
  pstall() { const P = cur(); P.steps.forEach(s => (s.on = true)); touch(P); save(); render(); },
  pstmv(b) { const P = cur(), i = +b.dataset.i, j = i + +b.dataset.v; if (j < 0 || j >= P.steps.length) return; [P.steps[i], P.steps[j]] = [P.steps[j], P.steps[i]]; touch(P); save(); render(); },
  pstdel(b) { const P = cur(); P.steps.splice(+b.dataset.i, 1); touch(P); save(); render(); },
  pstadd() { const P = cur(); P.steps.push({ t: 'Se realiza ', on: true }); touch(P); save(); render(); setTimeout(() => { const t = document.querySelectorAll('[data-pst]'); const l = t[t.length - 1]; if (l) { l.focus(); l.setSelectionRange(l.value.length, l.value.length); } }, 50); },
  pcopy() { const t = $('#pout'); t.select(); try { navigator.clipboard.writeText(t.value); } catch { document.execCommand('copy'); } $('#pm').textContent = ' Copiado.'; },
  pedit() { const P = cur(); P.txt = generate(ptpl(P.tid), P); touch(P); save(); render(); },
  pregen() { const P = cur(); (P.vers ??= []).push({ at: Date.now(), txt: P.txt }); P.txt = null; touch(P); save(); render(); ctx.toast('Versión anterior guardada'); },
  pver(b) { const P = cur(), v = P.vers[+b.dataset.i]; if (P.txt != null) P.vers.push({ at: Date.now(), txt: P.txt }); else P.vers.push({ at: Date.now(), txt: generate(ptpl(P.tid), P) }); P.txt = v.txt; touch(P); save(); render(); },
  pfin() {
    const P = cur(), T = ptpl(P.tid), c = check(T, P); if (c.pend.length || c.contra.length) return ctx.toast('Hay datos pendientes o contradicciones');
    const txt = P.txt != null ? P.txt : generate(T, P);
    P.fin = { at: Date.now(), txt }; P.st = 'f'; P.tv = T.v || 1; P.snap = clone(T); touch(P); save(); render(); ctx.toast('Parte finalizado');
  },
  plog() {
    const P = cur(), T = ptpl(P.tid) || P.snap, x = P.x;
    S().lg.push({ d: x.fecha || today(), p: x.proc || T.n, r: $('#prol').value, t: x.urg == 'Urgencia' ? 'Urgencia' : 'Electivo', c: x.compl == 'Con complicaciones' ? 'Sí' : 'No', e: T.sp, pq: P.id });
    P.lg = 1; save(); render(); ctx.toast('Registrado en Estadísticas');
  },
  pdup() { const P = cur(), T = ptpl(P.tid) || P.snap, n = newDraft(T); n.x = clone(P.x); n.na = clone(P.na || {}); n.steps = clone(P.steps); n.x.fecha = today(); save(); ctx.go('#/parte/' + n.id); ctx.toast('Copia creada como borrador'); },
  pdel(b) { if (!b.dataset.arm) { b.dataset.arm = 1; b.textContent = '¿Seguro? Tocá otra vez'; return; } const P = cur(); S().pq = drafts().filter(p => p != P); save(); ctx.go('#/partes', true); },
  psavet() {
    const P = cur(), T = ptpl(P.tid), name = (($('#pqn') || {}).value || '').trim() || T.n + ' (mi técnica)';
    const def = clone(P.x); ['proc', 'fecha', 'hora', 'dxpre', 'dxpos', 'cir', 'ayu', 'anest'].forEach(k => delete def[k]);
    const nt = { ...clone(T), id: 'u-' + uid(), n: name, v: 1, base: T.id, def, pasos: P.steps.map(s => ({ t: s.t, on: s.on })) };
    (S().pqt ??= {})[nt.id] = nt; save(); ctx.toast('Template guardado: ' + name); render();
  },
  ped(b) { openPEditor(b.dataset.v); },
  pednew() { openPEditor(null); }
};
export function partesInput(e) {
  const t = e.target, d = t.dataset;
  if (d.pq != null) { q = t.value; const v = $('#view'); v.innerHTML = viewPartes(); const i = v.querySelector('[data-pq]'); i.focus(); i.setSelectionRange(q.length, q.length); return true; }
  const P = cur(); if (!P) return false;
  if (d.pf != null) { P.x[d.pf] = t.value; touch(P); save(); const pv = t.closest('.item')?.querySelector('.pv'); if (pv) { const f = resolve(ptpl(P.tid)).find(f => f.id == d.pf); const fr = f && frag(f, P.x); if (fr) pv.textContent = f.p ? f.p.replace('{v}', fr) : fr; } return true; }
  if (d.pst != null) { P.steps[+d.pst].t = t.value; touch(P); save(); return true; }
  if (d.ptxt != null && P.txt != null) { P.txt = t.value; touch(P); save(); return true; }
  return false;
}
export function partesChange(e) { const t = e.target, d = t.dataset; const P = cur(); if (!P) return false; if (d.pf != null) { P.x[d.pf] = t.value; touch(P); save(); return true; } return false; }

/* =========================================================================
   Editor de templates
   ========================================================================= */
let ed = null;
const SECO = SECS.slice(1).map(([k, l]) => [k, `${k}. ${l}`]);
function openPEditor(id) {
  ed = id ? clone(ptpl(id)) : { id: 'u-' + uid(), n: 'Template nuevo', sp: 'Neurocirugía', sub: '', v: 1, ctx: '', f: [], pasos: [], _new: 1 };
  ed.pasos = (ed.pasos || []).map(p => (typeof p == 'string' ? p : p.t));
  ctx.openSheet(pedHtml(), 'ped');
}
const lines = o => (o || []).map(x => `${x[0]} = ${x[1]}`).join('\n');
const pedRedraw = () => { const bk = $('#bk'), sc = bk.scrollTop; bk.innerHTML = pedHtml(); bk.scrollTop = sc; };
function pedHtml() {
  const isB = !!pbuiltin(ed.id), over = isB && (S().pqt || {})[ed.id], F = resolve(ed);
  const inp = (p, l, v, ph = '') => `<label class="f">${l}<input data-pe="${p}" value="${esc(v || '')}" placeholder="${esc(ph)}" autocomplete="off"></label>`;
  return `<div class="sheet"><div class="eh"><button data-pc="close">${ic('back', 'sm')} Volver</button></div><h3>${ed._new ? 'Template nuevo' : 'Editar template'}</h3>
  <p class="meta">Los cambios no modifican los partes ya finalizados. Cada vez que guardás, la versión aumenta (ahora v${ed.v || 1}).</p>
  ${inp('n', 'Nombre del procedimiento', ed.n)}<div class="tl">${inp('sp', 'Especialidad', ed.sp)}${inp('sub', 'Subespecialidad', ed.sub)}</div>
  <label class="f">Indicaciones y contexto<textarea data-pe="ctx" rows="2">${esc(ed.ctx || '')}</textarea></label>
  <label class="ck"><input type="checkbox" data-pe-chk="lat" ${ed.lat ? 'checked' : ''}><span>Requiere lateralidad</span></label>
  <div class="eyebrow">Pasos sugeridos (en orden)</div>
  ${ed.pasos.map((p, i) => `<div class="li"><textarea data-pe="pasos.${i}" rows="2" style="flex:1">${esc(p)}</textarea><button class="x" data-pc="pup" data-i="${i}" aria-label="Subir">↑</button><button class="x" data-pc="pdel" data-i="${i}" aria-label="Quitar">×</button></div>`).join('')}
  <div class="acts"><button class="add" data-pc="padd">${ic('plus', 'sm')} Paso</button></div>
  <div class="eyebrow">Campos</div><p class="meta">Podés ocultar secciones o campos irrelevantes, marcar obligatorios y editar las opciones frecuentes («Etiqueta = frase»).</p>
  ${SECS.slice(1).map(([s, l]) => `<details class="g"><summary>${s}. ${l}</summary>${F.filter(f => f.sec == s).map(f => { const own = (ed.f || []).findIndex(g => g.id == f.id); const p = own >= 0 ? `f.${own}` : null;
      return `<div class="sub"><div class="ih"><b>${esc(f.l)}</b><small class="meta">${({ opt: 'una opción', multi: 'varias', yn: 'sí/no', text: 'texto', num: 'número', date: 'fecha' })[f.k] || f.k}</small></div>
      <div class="chips"><button class="chip${f.req ? ' on' : ''}" data-pc="req" data-v="${esc(f.id)}">Obligatorio</button><button class="chip" data-pc="hide" data-v="${esc(f.id)}">Ocultar</button>${p ? `<button class="chip" data-pc="fdel" data-i="${own}">Quitar</button>` : ''}</div>
      ${p ? inp(p + '.l', 'Etiqueta', f.l) + ((f.k == 'opt' || f.k == 'multi') ? `<label class="f">Opciones (una por línea: Etiqueta = frase)<textarea data-pe-lines="${p}.o" rows="4">${esc(lines(f.o))}</textarea></label>` : '') + (f.k == 'yn' ? inp(p + '.y', 'Frase si es sí', f.y) + inp(p + '.n', 'Frase si es no', f.n) : '') + (['text', 'num', 'opt', 'multi'].includes(f.k) ? inp(p + '.p', 'Frase ({v} = valor; vacío = la opción sola)', f.p) : '') : ''}</div>`; }).join('')}
    <div class="tl"><label class="f">Agregar campo<select data-pc-add="${s}"><option value="">Tipo…</option><option value="opt">Una opción</option><option value="multi">Varias opciones</option><option value="yn">Sí / no</option><option value="text">Texto libre</option><option value="num">Número</option></select></label></div></details>`).join('')}
  ${(ed.hide || []).length ? `<div class="eyebrow">Ocultos</div><div>${ed.hide.map(h => `<button class="chip" data-pc="unhide" data-v="${esc(h)}">${esc(h)} · mostrar</button>`).join('')}</div>` : ''}
  <div class="acts" style="margin-top:18px"><button class="bt" data-pc="save">${ic('check', 'sm')} Guardar template</button>${over ? '<button class="bt ghost" data-pc="restore">Restaurar original</button>' : ''}${!isB && !ed._new ? `<button class="bt dan" data-pc="delt">${ic('trash', 'sm')} Eliminar template</button>` : ''}${isB ? '<button class="bt ghost" data-pc="hidet">Ocultar de la biblioteca</button>' : ''}</div></div>`;
}
function setP(o, p, v) { const ks = p.split('.'); let a = o; ks.slice(0, -1).forEach(k => (a = a[k])); a[ks[ks.length - 1]] = v; }
export function bindPEditor(bk) {
  bk.addEventListener('input', e => {
    if (bk.dataset.view != 'ped') return; const t = e.target, d = t.dataset;
    if (d.pe) setP(ed, d.pe, t.value);
    if (d.peLines) setP(ed, d.peLines, t.value.split('\n').map(l => l.trim()).filter(Boolean).map(l => { const m = l.split(/\s+=\s+/); return m.length == 2 ? [m[0], m[1]] : [l, l]; }));
  });
  bk.addEventListener('change', e => {
    if (bk.dataset.view != 'ped') return; const t = e.target, d = t.dataset;
    if (d.peChk) ed[d.peChk] = t.checked;
    if (d.pcAdd != null && t.value) { const k = t.value, f = { id: 'u' + uid(), l: 'Campo nuevo', sec: d.pcAdd, k }; if (k == 'opt' || k == 'multi') f.o = [['Opción', 'frase de la opción']]; if (k == 'yn') { f.y = 'Se realiza …'; f.n = ''; } if (k == 'text' || k == 'num') f.p = '{v}'; (ed.f ??= []).push(f); pedRedraw(); }
  });
  bk.addEventListener('click', e => {
    if (bk.dataset.view != 'ped') return; const b = e.target.closest('[data-pc]'); if (!b) return; const d = b.dataset, i = +d.i;
    const own = id => { let f = (ed.f || []).find(g => g.id == id); if (!f) { const c = resolve(ed).find(g => g.id == id); f = { id, l: c.l, sec: c.sec, k: c.k }; (ed.f ??= []).push(f); } return f; };
    switch (d.pc) {
      case 'close': return ctx.close();
      case 'pup': if (i > 0) [ed.pasos[i - 1], ed.pasos[i]] = [ed.pasos[i], ed.pasos[i - 1]]; break;
      case 'pdel': ed.pasos.splice(i, 1); break;
      case 'padd': ed.pasos.push('Se realiza '); break;
      case 'fdel': ed.f.splice(i, 1); break;
      case 'req': { const f = own(d.v); f.req = f.req ? 0 : 1; break; }
      case 'hide': (ed.hide ??= []).push(d.v); break;
      case 'unhide': ed.hide = ed.hide.filter(h => h != d.v); break;
      case 'save': { const t = clone(ed); delete t._new; t.v = (t.v || 1) + (ed._new ? 0 : 1); (S().pqt ??= {})[t.id] = t; save(); ctx.toast('Template guardado (v' + t.v + ')'); return ctx.close(); }
      case 'restore': delete S().pqt[ed.id]; save(); ctx.toast('Template original restaurado'); return ctx.close();
      case 'delt': if (!d.arm) { b.dataset.arm = 1; b.textContent = '¿Seguro? Tocá otra vez'; return; } delete S().pqt[ed.id]; save(); return ctx.close();
      case 'hidet': X().hid.push(ed.id); save(); return ctx.close();
    }
    pedRedraw();
  });
}
