import './styles.css';
import { ST, IV, FL, LV, fieldsOf, groupOf, mk, hue, esc, shuf, today, addD, cnt, def, migrateV1 } from './data.js';
import * as store from './store.js';
import * as backup from './backup.js';
import * as sync from './sync.js';
import { ensureTx, roman } from './taxonomy.js';
import { initEvo, evo, EVR, evoInput, evoChange } from './evolucion.js';
import { initFormulas, fmv, fcalc, FMR, formulaSheetClick } from './formulas.js';
import { ic, logo } from './icons.js';
import { SKINS, getUI, setUI, applyUI } from './theme.js';

const $ = s => document.querySelector(s);
const clone = o => (typeof structuredClone == 'function' ? structuredClone(o) : JSON.parse(JSON.stringify(o)));
let S = null, sess = null, qs = '', clsK = 'p', lastKey = '', lastDepth = 0, inAppNav = 0;
const op = new Set(), fresh = new Set(), find = id => S.items.find(x => x.id == id);
const pref = (() => { try { return JSON.parse(localStorage.getItem('meditas-pref') || '{}'); } catch { return {}; } })();
const savePref = () => { try { localStorage.setItem('meditas-pref', JSON.stringify(pref)); } catch { /* ok */ } };

// Guarda localmente y programa la subida a la nube
const save = () => { store.save(S); sync.schedule(); };
function toast(t, ms = 3200) {
  const el = $('#toast'); el.textContent = t; el.classList.add('on');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), ms);
}
const fmtD = d => (d ? new Date(d + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
const enc = encodeURIComponent, dec = s => { try { return decodeURIComponent(s); } catch { return s; } };

/* =========================================================================
   Rutas (por hash, así el botón “atrás” del celular funciona)
   ========================================================================= */
function parse() {
  const p = (location.hash.replace(/^#\/?/, '') || 'hoy').split('/').map(dec);
  const [a, b, c, d] = p;
  if (a == 'fichas') return { v: 'fichas', sec: 'fichas', k: b == 'q' ? 'q' : 'p', g: c ?? null, s: d ?? null, depth: 1 + (c != null) + (d != null) };
  if (a == 'ficha') return { v: 'ficha', sec: 'fichas', id: b, edit: c == 'editar', depth: 4 };
  if (a == 'repaso') return { v: 'repaso', sec: 'repaso', depth: 1 };
  if (a == 'evolucion') return { v: 'evolucion', sec: 'evolucion', depth: 1 };
  if (a == 'mas' && b) return { v: b, sec: 'mas', depth: 2 };
  if (a == 'mas') return { v: 'mas', sec: 'mas', depth: 1 };
  return { v: 'hoy', sec: 'hoy', depth: 0 };
}
const go = (h, replace = false) => {
  if (replace) { history.replaceState(null, '', h); render(); }
  else if (location.hash == h) render();
  else { inAppNav++; location.hash = h; }
};
const noneOf = k => (k == 'q' ? 'Sin especialidad' : 'Sin capítulo');
const fichasPath = (k, g, s) => '#/fichas/' + k + (g != null ? '/' + enc(g) : '') + (s != null ? '/' + enc(s) : '');
function parentOf(r) {
  if (r.v == 'ficha') { const it = find(r.id); return it ? fichasPath(it.k, groupOf(it) || noneOf(it.k), it.s || 'General') : '#/fichas/p'; }
  if (r.v == 'fichas') return r.s != null ? fichasPath(r.k, r.g) : r.g != null ? fichasPath(r.k) : '#/hoy';
  if (r.sec == 'mas' && r.v != 'mas') return '#/mas';
  return '#/hoy';
}
function back() {
  const r = parse();
  if (r.v == 'ficha') leaveFicha(r.id);
  if (inAppNav > 0) { inAppNav--; history.back(); } else go(parentOf(r), true);
}
addEventListener('hashchange', () => render());

/* =========================================================================
   Utilidades de datos
   ========================================================================= */
function streak() { let d = today(), n = 0; if (!S.hist[d]) d = addD(d, -1); while (S.hist[d]) { n++; d = addD(d, -1); } return n; }
const dueFichas = () => S.items.filter(i => i.nx && i.nx <= today());
const bars = (o, fmt = v => v, mx) => {
  const m = mx || Math.max(1, ...Object.values(o));
  return Object.entries(o).map(([k, v]) => `<div class="br"><span>${esc(k)}</span><div class="bar"><i style="width:${v / m * 100}%"></i></div><b>${fmt(v)}</b></div>`).join('') || '<p class="meta">Sin datos todavía.</p>';
};
const groupLabel = (k, g) => { const i = Object.keys(ensureTx(S)[k]).indexOf(g); return k == 'p' && i >= 0 ? `${roman(i)}. ${g}` : g; };
const temaLabel = (k, g, s) => { const i = (ensureTx(S)[k][g] || []).indexOf(s); return k == 'p' && i >= 0 ? `${i + 1}. ${s}` : s; };
// Texto de ficha → HTML legible: párrafos, saltos de línea y listas con “- ”.
function md(t) {
  return String(t).trim().split(/\n\s*\n/).map(b => {
    const ls = b.split('\n');
    if (ls.every(l => /^\s*[-•*]\s+/.test(l))) return '<ul>' + ls.map(l => `<li>${esc(l.replace(/^\s*[-•*]\s+/, ''))}</li>`).join('') + '</ul>';
    return '<p>' + ls.map(esc).join('<br>') + '</p>';
  }).join('');
}

// Preguntas: autogeneradas desde las fichas (+ banco importado en el modo mixto).
const MODES = { p: 'Patologías', q: 'Procedimientos', x: 'Mixto' };
function qpool(m = S.cfg.m || 'x') {
  const out = m == 'x' ? S.qb.map((x, i) => ({ key: 'b' + i, c: x.c || 'General', q: x.q, o: x.o, a: x.a, s: x.s, e: x.e })) : [];
  ['p', 'q'].filter(k => m == 'x' || m == k).forEach(k => {
    const A = S.items.filter(i => i.k == k && i.t.trim());
    if (A.length < 4) return;
    A.forEach(i => Object.keys(FL).forEach(f => {
      const v = (i.f[f] || '').trim(); if (v.length < 25) return;
      const o = shuf([i, ...shuf(A.filter(x => x != i)).slice(0, 3)]);
      out.push({ key: `a:${i.id}:${f}`, c: groupOf(i) || 'Fichas', q: `¿A qué ${k == 'p' ? 'patología' : 'procedimiento'} corresponde este texto de «${FL[f]}»?\n“${v.slice(0, 300)}”`, o: o.map(x => x.t), a: o.indexOf(i), s: 'Tu ficha: ' + i.t });
      const B = A.filter(x => x != i && (x.f[f] || '').trim().length >= 25);
      if (B.length >= 3) {
        const cut = t => t.trim().slice(0, 220) + (t.trim().length > 220 ? '…' : '');
        const o2 = shuf([i, ...shuf(B).slice(0, 3)]);
        out.push({ key: `b:${i.id}:${f}`, c: groupOf(i) || 'Fichas', q: `${i.t}: ¿cuál es su ${FL[f]}?`, o: o2.map(x => cut(x.f[f])), a: o2.indexOf(i), s: 'Tu ficha: ' + i.t });
      }
    }));
  });
  return out;
}

/* =========================================================================
   Barra de navegación y barra superior
   ========================================================================= */
const NAV = [['hoy', 'home', 'Hoy', '#/hoy'], ['fichas', 'book', 'Fichas', '#/fichas/p'], ['repaso', 'repaso', 'Repaso', '#/repaso'], ['evolucion', 'evo', 'Evolución', '#/evolucion'], ['mas', 'more', 'Más', '#/mas']];
function drawNav(sec) {
  $('#nav').innerHTML = `<div class="brand">${logo('')}<span>Medi<em>tas</em></span></div>` + NAV.map(([k, i, l, h]) => `<button data-nav="${h}" class="${sec == k ? 'on' : ''}" aria-label="${l}" ${sec == k ? 'aria-current="page"' : ''}><span class="pill">${ic(i)}</span><span>${l}</span></button>`).join('');
}
const SHORT = { off: 'Local', out: 'Entrar', ok: 'Sync', busy: 'Sync…', err: 'Error', offline: 'Offline' };
const STL = { off: 'Solo local', out: 'Iniciar sesión', ok: 'Sincronizado', busy: 'Sincronizando…', err: 'Error de sync', offline: 'Sin conexión' };
const syncBtn = () => { const s = sync.getStatus().status; return `<button class="ib" data-sheet="acct" aria-label="Cuenta: ${STL[s]}"><i class="dot ${({ ok: 'ok', busy: 'busy', err: 'err' })[s] || ''}"></i><span style="font-size:13px">${SHORT[s]}</span></button>`; };

function drawTop(r) {
  let title = '', left = '', right = syncBtn();
  const backBtn = `<button class="ib" data-back aria-label="Volver">${ic('back')}</button>`;
  if (r.v == 'hoy') title = `${logo()}<span>Medi<em>tas</em></span>`;
  else if (r.v == 'fichas') { title = r.depth > 1 ? (r.s != null ? esc(r.s) : esc(groupLabel(r.k, r.g))) : 'Fichas'; if (r.depth > 1) left = backBtn; }
  else if (r.v == 'ficha') {
    const it = find(r.id); left = backBtn;
    right = it ? (r.edit ? `<button class="ib txt" data-r="mode" data-v="read">${ic('check', 'sm')} Listo</button>` : `<button class="ib txt" data-r="mode" data-v="edit">${ic('edit', 'sm')} Editar</button>`) : '';
  }
  else if (r.v == 'repaso') title = 'Repaso';
  else if (r.v == 'evolucion') title = 'Evolución';
  else if (r.v == 'mas') title = 'Más';
  else { left = backBtn; title = { formulas: 'Fórmulas', estadisticas: 'Estadísticas' }[r.v] || ''; }
  $('#top').innerHTML = `${left}<h1>${title}</h1>${right}`;
}

/* =========================================================================
   Vistas
   ========================================================================= */
const rowFicha = i => `<button class="row" data-open="${i.id}" style="--h:${hue(groupOf(i))}"><span class="sw"></span><span class="tx"><b>${esc(i.t || 'Sin título')}</b><small>${esc([groupOf(i) || noneOf(i.k), i.s].filter(Boolean).join(' · '))}</small></span><span class="st s${i.st}">${ST[i.st]}</span></button>`;

/* ---------- Hoy ---------- */
function viewHoy() {
  const h = new Date().getHours(), hi = h < 6 ? 'Buenas noches' : h < 13 ? 'Buen día' : h < 20 ? 'Buenas tardes' : 'Buenas noches';
  const date = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' });
  const t = today(), dn = S.hist[t], P = qpool(), du = dueFichas(), n = Math.min(S.cfg.n, P.length);
  const kind = k => S.items.filter(i => i.k == k), dom = a => a.filter(i => i.st == 2).length;
  const rec = S.items.filter(i => i.ra && i.t).sort((a, b) => (b.ra > a.ra ? 1 : b.ra < a.ra ? -1 : 0)).slice(0, 4);
  const prog = (l, a) => `<div class="prog-row"><span>${l}</span><div class="bar"><i style="width:${a.length ? dom(a) / a.length * 100 : 0}%"></i></div><b>${dom(a)}/${a.length}</b></div>`;
  return `<div class="hello"><h2>${hi}</h2><p>${date}</p></div>
  <div class="pan hero"><h3>${dn ? 'Repaso de hoy completo' : 'Repaso de hoy'}</h3><p class="meta">${dn ? `Acertaste ${dn.ok} de ${dn.n}` : P.length ? `${n} preguntas · ${MODES[S.cfg.m || 'x'].toLowerCase()}` : 'Completá algunas fichas para generar preguntas'} · racha ${streak()} día(s)</p>
    <div class="acts">${dn ? `<button class="bt" data-nav="#/repaso">Repasar de nuevo</button>` : `<button class="bt" data-r="start" ${P.length ? '' : 'disabled'}>Empezar</button>`}</div></div>
  ${du.length ? `<div class="eyebrow">Para repasar hoy</div><div class="list">${du.map(rowFicha).join('')}</div>` : ''}
  <div class="eyebrow">Accesos rápidos</div>
  <div class="quick"><button data-r="newf" data-k="p"><span class="ic">${ic('steth')}</span>Nueva patología</button><button data-r="newf" data-k="q"><span class="ic">${ic('scalpel')}</span>Nuevo procedimiento</button><button data-nav="#/evolucion"><span class="ic">${ic('evo')}</span>Evolución</button><button data-nav="#/mas/formulas"><span class="ic">${ic('calc')}</span>Fórmulas</button></div>
  <div class="eyebrow">Tu progreso</div><div class="pan">${prog('Patologías', kind('p'))}${prog('Procedimientos', kind('q'))}</div>
  ${rec.length ? `<div class="eyebrow">Últimas modificadas</div><div class="list">${rec.map(rowFicha).join('')}</div>` : ''}`;
}

/* ---------- Fichas por niveles ---------- */
function card(i) {
  const F = fieldsOf(i).filter(([k]) => k[0] != '_'), n = F.filter(([k]) => (i.f[k] || '').trim()).length, du = i.nx && i.nx <= today();
  return `<article class="card" style="--h:${hue(groupOf(i))}" data-open="${i.id}"><div class="top2"><span class="tag" style="--h:${hue(groupOf(i))}">${esc(i.s || 'General')}</span><span class="st s${i.st}">${ST[i.st]}</span></div><h3>${esc(i.t || 'Sin título')}</h3><div class="meta">${n}/${F.length} apartados${du ? ' · <span class="due">Repasar hoy</span>' : ''}</div></article>`;
}
function groupsOf(k) {
  const T = ensureTx(S)[k], m = new Map(), none = noneOf(k);
  const its = S.items.filter(i => i.k == k);
  if (its.some(i => !groupOf(i))) m.set(none, []); // las fichas sin clasificar aparecen primero, para que se vean
  Object.keys(T).forEach(g => m.set(g, []));
  its.forEach(i => { const g = groupOf(i) || none; if (!m.has(g)) m.set(g, []); m.get(g).push(i); });
  return m;
}
function viewFichas(r) {
  const seg = `<div class="seg"><button data-nav="#/fichas/p" class="${r.k == 'p' ? 'on' : ''}">Patologías</button><button data-nav="#/fichas/q" class="${r.k == 'q' ? 'on' : ''}">Procedimientos</button></div>`;
  const search = `<div class="srw">${ic('search', 'sm')}<input class="sr" data-q type="search" enterkeyhint="search" placeholder="Buscar en ${r.k == 'p' ? 'patologías' : 'procedimientos'}…" value="${esc(qs)}"></div>`;
  return (r.depth == 1 ? seg + search : '') + `<div id="fl">${fichasList(r)}</div>`;
}
function fichasList(r) {
  const T = ensureTx(S)[r.k], [, L2] = LV[r.k], none = noneOf(r.k), hide = !!pref.hide;
  if (qs && r.depth == 1) {
    const ql = qs.toLowerCase(), res = S.items.filter(i => i.k == r.k && (i.t + ' ' + i.g + ' ' + i.s + ' ' + i.e + ' ' + Object.values(i.f).join(' ')).toLowerCase().includes(ql));
    return res.length ? `<p class="meta" style="margin:0 2px 8px">${res.length} resultado(s)</p><div class="list">${res.map(rowFicha).join('')}</div>` : `<div class="empty">${ic('search')}<p>Nada coincide con “${esc(qs)}”.</p></div>`;
  }
  if (r.g == null) {
    const rows = [...groupsOf(r.k).entries()].filter(([, a]) => !hide || a.length).map(([g, a]) => {
      const d = a.filter(i => i.st == 2).length;
      return `<button class="row${a.length ? '' : ' dim'}" data-nav="${fichasPath(r.k, g)}" style="--h:${hue(g)}"><span class="sw"></span><span class="tx"><b>${esc(groupLabel(r.k, g))}</b><small>${a.length ? `${a.length} ficha(s) · ${d} dominada(s)` : 'Sin fichas todavía'}</small></span><span class="mini"><i style="width:${a.length ? d / a.length * 100 : 0}%"></i></span><span class="chev">${ic('chev', 'sm')}</span></button>`;
    }).join('');
    return `<div class="tools"><button class="chip${hide ? ' on' : ''}" data-r="hide">${ic('filter', 'sm')} Ocultar vacíos</button><button class="ib txt" data-r="cls" data-k="${r.k}">${ic('tree', 'sm')} Editar clasificación</button></div><div class="list">${rows || `<div class="empty">Todavía no hay fichas.</div>`}</div>`;
  }
  const crumbs = `<div class="crumbs"><button data-nav="${fichasPath(r.k)}">${r.k == 'p' ? 'Patologías' : 'Procedimientos'}</button>${r.s != null ? `› <button data-nav="${fichasPath(r.k, r.g)}">${esc(groupLabel(r.k, r.g))}</button>` : ''}</div>`;
  const its = S.items.filter(i => i.k == r.k && (groupOf(i) || none) == r.g);
  if (r.s == null) {
    let m = new Map((T[r.g] || []).map(s => [s, []]));
    its.forEach(i => { const s = i.s || 'General'; if (!m.has(s)) m.set(s, []); m.get(s).push(i); });
    if (m.has('General')) { const a = m.get('General'); m.delete('General'); m = new Map([['General', a], ...m]); }
    const rows = [...m.entries()].filter(([, a]) => !hide || a.length).map(([s, a]) => `<button class="row${a.length ? '' : ' dim'}" data-nav="${fichasPath(r.k, r.g, s)}"><span class="tx"><b>${esc(temaLabel(r.k, r.g, s))}</b><small>${a.length ? a.length + ' ficha(s)' : 'Vacío'}</small></span><span class="chev">${ic('chev', 'sm')}</span></button>`).join('');
    return crumbs + `<h2 class="lvl-title">${esc(groupLabel(r.k, r.g))}</h2><p class="meta" style="margin:-6px 2px 12px">${its.length} ficha(s)</p><div class="list">${rows || `<div class="empty">Sin ${L2.toLowerCase()}s. Agregalos desde “Editar clasificación”.</div>`}</div>`;
  }
  const a = its.filter(i => (i.s || 'General') == r.s).sort((x, y) => x.t.localeCompare(y.t));
  return crumbs + `<h2 class="lvl-title">${esc(temaLabel(r.k, r.g, r.s))}</h2>` + (a.length ? `<div class="cards">${a.map(card).join('')}</div>` : `<div class="empty">${ic('book')}<p>Todavía no hay fichas acá.</p><button class="bt" data-r="newf" data-k="${r.k}" data-g="${esc(r.g)}" data-s="${esc(r.s)}">${ic('plus', 'sm')} Nueva ficha</button></div>`);
}

/* ---------- Ficha: lectura y edición ---------- */
function viewFicha(r) {
  const it = find(r.id);
  if (!it) return `<div class="empty"><p>Esta ficha ya no existe.</p><button class="bt" data-nav="#/fichas/p">Ir a fichas</button></div>`;
  const G = groupOf(it), seg = `<div class="seg st3">${ST.map((s, i) => `<button data-r="st" data-v="${i}" class="s${i}${it.st == i ? ' on' : ''}">${s}</button>`).join('')}</div>`;
  const metaLine = `<p class="meta">${it.ra ? 'Última revisión: ' + fmtD(it.ra) : 'Sin modificaciones todavía'}${it.nx ? ' · Próximo repaso: ' + fmtD(it.nx) : ''}</p>`;
  return `<div class="${r.edit ? 'ed' : ''}" id="fwrap">${r.edit ? fichaEdit(it, seg) : fichaRead(it, G, seg, metaLine)}</div>`;
}
function fichaRead(it, G, seg, metaLine) {
  const F = fieldsOf(it), has = k => (k == '_c' ? it.c.length : k == '_p' ? it.pr.length : (it.f[k] || '').trim());
  const filled = F.filter(([k]) => has(k));
  const sec = filled.map(([k, l]) => {
    let b;
    if (k == '_c') b = it.c.map((c, i) => `<label class="ck${c.d ? ' done' : ''}"><input type="checkbox" data-ck="${i}" ${c.d ? 'checked' : ''}><span>${esc(c.t || 'Ítem')}</span></label>`).join('');
    else if (k == '_p') b = it.pr.map(p => `<p><b>${esc(p.m || 'Médico')}:</b> ${esc(p.t)}</p>`).join('');
    else b = md(it.f[k]);
    return `<section id="s-${k}"><h4>${l}</h4>${b}</section>`;
  }).join('');
  const rel = it.l.map(find).filter(Boolean);
  return `<div class="fh"><button class="tag" style="--h:${hue(G)};border:0" data-nav="${fichasPath(it.k, G || noneOf(it.k), it.s || 'General')}">${esc([G || noneOf(it.k), it.s].filter(Boolean).join(' · '))}</button>
    <h2 class="ti-r">${esc(it.t || 'Sin título')}</h2>${metaLine}${seg}
    <div class="acts"><button class="chip" data-r="rep">${ic('clock', 'sm')} Repasada hoy</button></div></div>
  ${filled.length > 1 ? `<div class="toc">${filled.map(([k, l]) => `<button data-toc="s-${k}">${l}</button>`).join('')}</div>` : ''}
  ${filled.length ? `<div class="rd">${sec}</div>` : `<div class="empty">${ic('edit')}<p>Esta ficha está vacía.</p><button class="bt" data-r="mode" data-v="edit">Completar ficha</button></div>`}
  ${rel.length ? `<div class="eyebrow">Fichas relacionadas</div><div>${rel.map(x => `<button class="chip" data-open="${x.id}">${esc(x.t)}</button>`).join('')}</div>` : ''}`;
}
function fichaEdit(it, seg) {
  const T = ensureTx(S)[it.k], G = it.k == 'q' ? 'e' : 'g', [L1, L2] = LV[it.k], gv = it[G] || '';
  const gs = [...new Set([...Object.keys(T), ...S.items.filter(x => x.k == it.k && x[G]).map(x => x[G])])];
  const ss = [...new Set([...(T[gv] || []), ...S.items.filter(x => x.k == it.k && x[G] == gv && x.s).map(x => x.s)])];
  const sec = fieldsOf(it).map(([k, l]) => {
    let b;
    if (k == '_c') b = it.c.map((c, i) => `<div class="li"><input type="checkbox" data-ci="${i}" ${c.d ? 'checked' : ''} aria-label="Hecho"><input type="text" data-ci="${i}" value="${esc(c.t)}" placeholder="Ítem a preparar"><button class="x" data-r="xc" data-i="${i}" aria-label="Quitar">×</button></div>`).join('') + `<button class="add" data-r="ac">${ic('plus', 'sm')} Ítem</button>`;
    else if (k == '_p') b = it.pr.map((p, i) => `<div class="pi"><div class="li"><input data-pi="${i}" data-pk="m" value="${esc(p.m)}" placeholder="Nombre del médico"><button class="x" data-r="xp" data-i="${i}" aria-label="Quitar">×</button></div><textarea data-pi="${i}" data-pk="t" placeholder="Instrumental, suturas, posición…">${esc(p.t)}</textarea></div>`).join('') + `<button class="add" data-r="ap">${ic('plus', 'sm')} Médico</button>`;
    else b = `<textarea data-f="${k}" placeholder="Escribí acá… (las líneas que empiezan con “- ” se muestran como lista)">${esc(it.f[k])}</textarea>`;
    return `<section><h4>${l}</h4>${b}</section>`;
  }).join('');
  const oth = S.items.filter(x => x != it && !it.l.includes(x.id)).sort((a, b) => a.t.localeCompare(b.t));
  return `<input class="ti" data-k="t" value="${esc(it.t)}" placeholder="Nombre de la ${it.k == 'p' ? 'patología' : 'ficha'}" enterkeyhint="done">
  <div class="row2"><label class="f">${L1}<select data-sel="${G}"><option value="">${noneOf(it.k)}</option>${gs.map(g => `<option ${g == gv ? 'selected' : ''} value="${esc(g)}">${esc(groupLabel(it.k, g))}</option>`).join('')}</select></label>
  <label class="f">${L2}<select data-sel="s"><option value="">General</option>${ss.map(s => `<option ${s == it.s ? 'selected' : ''} value="${esc(s)}">${esc(temaLabel(it.k, gv, s))}</option>`).join('')}</select></label></div>
  <p class="meta">¿Falta un ${L1.toLowerCase()} o ${L2.toLowerCase()}? <button class="ib txt" style="min-height:32px;padding:0 4px" data-r="cls" data-k="${it.k}">Editar clasificación</button></p>
  ${seg}<div class="tl"><label class="f">Próximo repaso<input type="date" data-k="nx" value="${it.nx || ''}"></label><button class="chip" data-r="rep">${ic('clock', 'sm')} Repasada hoy</button></div>${sec}
  <section><h4>Fichas relacionadas</h4>${it.l.map(find).filter(Boolean).map(x => `<button class="chip" data-r="unlink" data-i="${x.id}">${esc(x.t)} ×</button>`).join('')}
  <label class="f"><select data-add><option value="">+ Vincular ficha…</option>${oth.map(x => `<option value="${x.id}">${x.k == 'p' ? 'Patología' : 'Procedimiento'} · ${esc(x.t || 'Sin título')}</option>`).join('')}</select></label></section>
  <div class="acts" style="margin-top:28px"><button class="bt dan" data-r="del">${ic('trash', 'sm')} Eliminar ficha</button></div>`;
}
const isEmpty = it => !it.t.trim() && !Object.values(it.f).some(v => (v || '').trim()) && !it.c.length && !it.pr.length;
// Al salir de una ficha nueva que quedó vacía, se descarta para no dejar fichas fantasma.
function leaveFicha(id) {
  const it = find(id);
  if (it && fresh.has(id) && isEmpty(it)) { S.items = S.items.filter(x => x != it); save(); toast('Ficha vacía descartada'); }
  else if (it && fresh.has(id)) toast('Guardada en ' + [groupOf(it) || noneOf(it.k), it.s || 'General'].join(' › '));
  fresh.delete(id);
}
function touch(it) { const t = today(); if (it.ra != t) it.ra = t; }
const grow = t => { t.style.height = 'auto'; t.style.height = Math.max(t.scrollHeight + 2, 84) + 'px'; };

/* ---------- Repaso ---------- */
function viewRepaso() {
  if (sess) return sess.fin ? `<div class="pan" style="text-align:center"><h3>Repaso terminado</h3><p style="font-size:34px;margin:8px 0" class="serif">${sess.ok}/${sess.qs.length}</p><p class="meta">Racha: ${streak()} día(s)</p><button class="bt" data-r="end">Volver</button></div>` : repQ();
  const t = today(), P = qpool(), dn = S.hist[t], du = dueFichas(), m = S.cfg.m || 'x';
  return `<div class="pan"><h3>Repaso diario</h3><p class="meta">${dn ? `Hoy completaste ${dn.ok}/${dn.n} · ` : 'Hoy: pendiente · '}Racha: ${streak()} día(s) · ${P.length} preguntas disponibles</p>
  <div class="seg">${Object.entries(MODES).map(([k, l]) => `<button data-r="qmode" data-v="${k}" class="${m == k ? 'on' : ''}">${l}</button>`).join('')}</div>
  <div class="tl"><label class="f">Hora del aviso<input type="time" data-cfg="t" value="${S.cfg.t}"></label><label class="f">Preguntas por día<select data-cfg="n">${[3, 5, 8, 10].map(n => `<option ${S.cfg.n == n ? 'selected' : ''}>${n}</option>`).join('')}</select></label></div>
  <div class="acts"><button class="bt wide" data-r="start" ${P.length ? '' : 'disabled'}>Empezar repaso</button></div>
  <p class="meta">Las preguntas se arman con el texto de tus fichas: hacen falta al menos 4 fichas del mismo tipo con apartados completos.</p>
  <p class="meta">Avisos: <button class="add" data-r="notif">${S.cfg.nt ? 'Activados mientras la app esté abierta' : 'Activar avisos'}</button> Para no depender de la app, poné también una alarma diaria en el celular.</p></div>
  <div class="eyebrow">Fichas para repasar hoy (${du.length})</div>${du.length ? `<div class="list">${du.map(rowFicha).join('')}</div>` : '<p class="meta" style="margin:0 4px 12px">Ninguna. Asignales una fecha de repaso dentro de cada ficha.</p>'}
  <div class="eyebrow">Banco de preguntas (${S.qb.length})</div><div class="pan"><p class="meta">Pegá preguntas en JSON: <code>[{"c":"Anatomía","q":"…","o":["A","B","C","D"],"a":0,"e":"explicación","s":"fuente"}]</code>. Solo aparecen en el modo mixto. Revisalas siempre contra la fuente.</p><textarea id="qa" placeholder="Pegá el JSON acá"></textarea><button class="add" data-r="addq">Agregar al banco</button><span class="meta" id="qm"></span></div>`;
}
function repQ() {
  const q = sess.qs[sess.i], a = sess.ans;
  return `<div class="steps">${sess.qs.map((_, i) => `<button class="${i < sess.i ? 'done' : i == sess.i ? 'on' : ''}" tabindex="-1" aria-hidden="true"></button>`).join('')}</div>
  <div class="pan"><div class="meta">Pregunta ${sess.i + 1} de ${sess.qs.length} · <span class="tag" style="--h:${hue(q.c)}">${esc(q.c)}</span></div><h3 class="qq">${esc(q.q)}</h3>${q.o.map((t, j) => `<button class="op${a != null ? (j == q.a ? ' ok' : j == a ? ' no' : '') : ''}" data-r="ans" data-j="${j}" ${a != null ? 'disabled' : ''}>${esc(t)}</button>`).join('')}${a != null ? `<div class="fb"><b>${a == q.a ? 'Correcto' : 'Incorrecto'}</b>${q.e ? '. ' + esc(q.e) : ''}<div class="meta">${esc(q.s || '')}</div></div><button class="bt wide" data-r="next">${sess.i + 1 < sess.qs.length ? 'Siguiente' : 'Terminar'}</button>` : ''}</div>`;
}

/* ---------- Más, fórmulas, estadísticas ---------- */
function viewMas() {
  const row = (attr, i, t, s) => `<button class="row" ${attr}><span class="ic">${ic(i)}</span><span class="tx"><b>${t}</b><small>${esc(s)}</small></span><span class="chev">${ic('chev', 'sm')}</span></button>`;
  const st = sync.getStatus(), ui = getUI();
  return `<div class="eyebrow">Herramientas</div><div class="list">${row('data-nav="#/mas/formulas"', 'calc', 'Fórmulas y calculadoras', 'Ácido-base, electrolitos, fluidos, fármacos…')}${row('data-nav="#/mas/estadisticas"', 'stats', 'Estadísticas y registro quirúrgico', 'Dominio, precisión, procedimientos realizados')}</div>
  <div class="eyebrow">Organización</div><div class="list">${row('data-r="cls" data-k="p"', 'tree', 'Clasificación de patologías', 'Capítulos y temas')}${row('data-r="cls" data-k="q"', 'tree', 'Clasificación de procedimientos', 'Especialidades y subespecialidades')}</div>
  <div class="eyebrow">App</div><div class="list">${row('data-sheet="look"', 'palette', 'Apariencia', SKINS[ui.skin].n + ' · ' + { auto: 'automático', light: 'claro', dark: 'oscuro' }[ui.mode])}${row('data-sheet="bk"', 'save', 'Respaldo y exportación', 'Descargar, restaurar, Excel')}${row('data-sheet="acct"', 'user', 'Cuenta y sincronización', st.email || STL[st.status])}</div>
  <p class="meta" style="text-align:center;margin-top:20px">Meditas · los datos de pacientes nunca salen del dispositivo</p>`;
}
function viewStats() {
  const P = S.items.filter(i => i.k == 'p'), Q = S.items.filter(i => i.k == 'q'), L = S.lg, dm = a => a.filter(i => i.st == 2).length;
  const sys = cnt(P, i => i.g || 'Sin capítulo'), dom = {};
  Object.keys(sys).forEach(g => dom[g] = Math.round(P.filter(i => (i.g || 'Sin capítulo') == g && i.st == 2).length / sys[g] * 100));
  const cat = {}; Object.entries(S.cs).forEach(([c, v]) => cat[c] = Math.round(v.ok / v.n * 100));
  const cp = L.filter(x => x.c == 'Sí').length, mo = cnt(L, x => x.d.slice(0, 7));
  const tot = Object.values(S.hist).reduce((a, v) => a + v.n, 0), okk = Object.values(S.hist).reduce((a, v) => a + v.ok, 0);
  return `<div class="kp"><div><b>${P.length}</b>patologías (${dm(P)} dominadas)</div><div><b>${Q.length}</b>procedimientos</div><div><b>${L.length}</b>realizados</div><div><b>${streak()}</b>días de racha</div></div>
  <div class="pan"><h3>Estudio</h3><p class="meta">Dominio por capítulo</p>${bars(dom, v => v + '%', 100)}<p class="meta" style="margin-top:10px">Estado de las fichas</p>${bars(cnt(S.items, i => ST[i.st]))}<p class="meta" style="margin-top:10px">Precisión en repasos por categoría (${tot ? Math.round(okk / tot * 100) + '% global' : 'sin datos'})</p>${bars(cat, v => v + '%', 100)}</div>
  <div class="pan"><h3>Registrar procedimiento realizado</h3><p class="meta">Sin datos identificables del paciente: solo procedimiento, rol y resultado.</p><div class="tl"><label class="f">Fecha<input type="date" id="lf-d" value="${today()}"></label><label class="f">Procedimiento<input id="lf-p" list="ql"></label><datalist id="ql">${Q.map(i => `<option value="${esc(i.t)}">`).join('')}</datalist><label class="f">Rol<select id="lf-r"><option>Cirujano</option><option>Ayudante</option><option>Observador</option></select></label><label class="f">Tipo<select id="lf-t"><option>Electivo</option><option>Urgencia</option></select></label><label class="f">Complicación<select id="lf-c"><option>No</option><option>Sí</option></select></label></div><div class="acts"><button class="bt" data-r="addlog">Registrar</button></div></div>
  <div class="pan"><h3>Estadísticas quirúrgicas</h3><p class="meta">Complicaciones: ${L.length ? Math.round(cp / L.length * 100) + '% (' + cp + ' de ' + L.length + ')' : 'sin datos'}</p><p class="meta">Por rol</p>${bars(cnt(L, x => x.r))}<p class="meta" style="margin-top:10px">Electivo vs urgencia</p>${bars(cnt(L, x => x.t))}<p class="meta" style="margin-top:10px">Procedimientos más frecuentes</p>${bars(Object.fromEntries(Object.entries(cnt(L, x => x.p || 'Sin nombre')).sort((a, b) => b[1] - a[1]).slice(0, 6)))}<p class="meta" style="margin-top:10px">Por mes</p>${bars(Object.fromEntries(Object.entries(mo).sort().slice(-6)))}<p class="meta" style="margin-top:10px">Últimos registros</p>${L.slice(-5).reverse().map(x => `<div class="li"><span class="meta" style="flex:1">${x.d} · ${esc(x.p)} · ${x.r} · ${x.t}${x.c == 'Sí' ? ' · complicación' : ''}</span><button class="x" data-r="dellog" data-i="${S.lg.indexOf(x)}" aria-label="Borrar">×</button></div>`).join('')}</div>`;
}

/* =========================================================================
   Render
   ========================================================================= */
function render() {
  if (!S) return;
  const r = parse(), key = location.hash || '#/hoy', changed = key != lastKey, y = scrollY;
  drawNav(r.sec); drawTop(r);
  const v = $('#view');
  v.innerHTML = r.v == 'hoy' ? viewHoy() : r.v == 'fichas' ? viewFichas(r) : r.v == 'ficha' ? viewFicha(r) : r.v == 'repaso' ? viewRepaso()
    : r.v == 'evolucion' ? evo() : r.v == 'mas' ? viewMas() : r.v == 'formulas' ? fmv() : r.v == 'estadisticas' ? viewStats() : viewHoy();
  v.querySelectorAll('textarea[data-f],textarea[data-pi]').forEach(grow);
  const fab = $('#fab');
  fab.hidden = r.v != 'fichas' || !!qs;
  if (r.v == 'fichas') { fab.innerHTML = `${ic('plus')}<span>Nueva ficha</span>`; fab.dataset.k = r.k; fab.dataset.g = r.g ?? ''; fab.dataset.s = r.s ?? ''; }
  if (changed) {
    const cls = r.depth < lastDepth ? 'enter-back' : 'enter';
    v.classList.remove('enter', 'enter-back', 'fade', 'mode-anim'); void v.offsetWidth; v.classList.add(cls);
    scrollTo(0, 0); lastKey = key; lastDepth = r.depth;
  } else scrollTo(0, y);
}
// Cambia entre lectura y edición con una transición suave
function swapMode(h) {
  const run = () => { history.replaceState(null, '', h); lastKey = h; render(); };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !reduce) document.startViewTransition(run);
  else { run(); const w = $('#view'); w.classList.remove('mode-anim', 'enter', 'enter-back'); void w.offsetWidth; w.classList.add('mode-anim'); }
}
addEventListener('scroll', () => { $('#top').classList.toggle('scrolled', scrollY > 4); }, { passive: true });

/* =========================================================================
   Acciones
   ========================================================================= */
const cur = () => { const r = parse(); return r.v == 'ficha' ? find(r.id) : null; };
function newFicha(k, g = '', s = '') {
  const it = mk(k, '');
  if (g && g != noneOf(k)) { if (k == 'q') it.e = g; else it.g = g; }
  if (s && s != 'General') it.s = s;
  S.items.push(it); fresh.add(it.id); save();
  go('#/ficha/' + it.id + '/editar');
  setTimeout(() => $('#view .ti')?.focus(), 350);
}
const R = {
  mode(b) {
    const it = cur(); if (!it) return;
    if (b.dataset.v == 'read') {
      if (fresh.has(it.id) && isEmpty(it)) { return back(); }
      if (fresh.has(it.id)) { fresh.delete(it.id); toast('Guardada en ' + [groupOf(it) || noneOf(it.k), it.s || 'General'].join(' › ')); }
      store.flush(); swapMode('#/ficha/' + it.id);
    } else swapMode('#/ficha/' + it.id + '/editar');
  },
  st(b) { const it = cur(); it.st = +b.dataset.v; touch(it); save(); render(); },
  rep() { const it = cur(); it.nx = addD(today(), IV[it.st]); save(); render(); toast('Próximo repaso: ' + fmtD(it.nx)); },
  ac() { const it = cur(); it.c.push({ t: '', d: false }); touch(it); save(); render(); },
  xc(b) { const it = cur(); it.c.splice(+b.dataset.i, 1); touch(it); save(); render(); },
  ap() { const it = cur(); it.pr.push({ m: '', t: '' }); touch(it); save(); render(); },
  xp(b) { const it = cur(); it.pr.splice(+b.dataset.i, 1); touch(it); save(); render(); },
  unlink(b) { const it = cur(), o = find(b.dataset.i); it.l = it.l.filter(x => x != b.dataset.i); if (o) o.l = o.l.filter(x => x != it.id); save(); render(); },
  del(b) {
    const it = cur(); if (!it) return;
    if (!b.dataset.arm) { b.dataset.arm = 1; b.innerHTML = `${ic('trash', 'sm')} ¿Seguro? Tocá otra vez`; return; }
    const to = parentOf(parse());
    S.items.forEach(x => x.l = x.l.filter(y => y != it.id)); S.items = S.items.filter(x => x != it); fresh.delete(it.id); save();
    toast('Ficha eliminada'); go(to, true);
  },
  newf(b) { newFicha(b.dataset.k, b.dataset.g, b.dataset.s); },
  hide() { pref.hide = !pref.hide; savePref(); render(); },
  cls(b) { clsK = b.dataset.k || parse().k || 'p'; openSheet(clsHtml(), 'cls'); },
  qmode(b) { S.cfg.m = b.dataset.v; save(); render(); },
  start() {
    const t = today(), P = qpool(), dueK = k => S.rv[k] && S.rv[k].n <= t, nw = k => !S.rv[k];
    sess = { qs: [...shuf(P.filter(p => dueK(p.key))), ...shuf(P.filter(p => nw(p.key))), ...shuf(P.filter(p => S.rv[p.key] && !dueK(p.key)))].slice(0, S.cfg.n), i: 0, ok: 0, ans: null };
    if (parse().v != 'repaso') go('#/repaso'); else render();
  },
  ans(b) {
    const q = sess.qs[sess.i], j = +b.dataset.j, ok = j == q.a, r = S.rv[q.key] || { b: 0 };
    r.b = ok ? Math.min(r.b + 1, 4) : 0; r.n = addD(today(), ok ? [1, 2, 4, 8, 16][r.b] : 1); S.rv[q.key] = r;
    const c = S.cs[q.c] || { ok: 0, n: 0 }; c.n++; ok && c.ok++; S.cs[q.c] = c;
    sess.ans = j; ok && sess.ok++; save(); render();
    try { navigator.vibrate && navigator.vibrate(ok ? 12 : [10, 40, 10]); } catch { /* sin vibración */ }
  },
  next() {
    if (sess.i + 1 < sess.qs.length) { sess.i++; sess.ans = null; }
    else { const h = S.hist[today()] || { ok: 0, n: 0 }; h.ok += sess.ok; h.n += sess.qs.length; S.hist[today()] = h; sess.fin = 1; save(); }
    render();
  },
  end() { sess = null; render(); },
  notif() {
    if (!('Notification' in window)) return toast('Este navegador no permite avisos. En iPhone, instalá la app primero.');
    Notification.requestPermission().then(p => { S.cfg.nt = p == 'granted'; save(); render(); });
  },
  addq() {
    try {
      const a = JSON.parse($('#qa').value);
      if (!Array.isArray(a) || a.some(x => !x.q || !Array.isArray(x.o) || x.o.length < 2 || x.a == null || x.a < 0 || x.a >= x.o.length)) throw 0;
      S.qb.push(...a); save(); render(); toast(a.length + ' pregunta(s) agregadas');
    } catch { $('#qm').textContent = ' Formato inválido.'; }
  },
  addlog() {
    const g = i => $('#lf-' + i).value;
    if (!g('p').trim()) return toast('Escribí el procedimiento');
    S.lg.push({ d: g('d') || today(), p: g('p').trim(), r: g('r'), t: g('t'), c: g('c') }); save(); render(); toast('Registrado');
  },
  dellog(b) { S.lg.splice(+b.dataset.i, 1); save(); render(); },
  ...EVR, ...FMR
};

/* ---------- eventos globales ---------- */
document.addEventListener('click', e => {
  const t = e.target;
  if (t.closest('#bk')) return; // las hojas tienen su propio manejo
  const nav = t.closest('[data-nav]');
  if (nav) { e.preventDefault(); const r = parse(); if (r.v == 'ficha') leaveFicha(r.id); if (nav.closest('#nav')) { qs = ''; sess = nav.dataset.nav == '#/repaso' ? sess : sess; } return go(nav.dataset.nav); }
  if (t.closest('[data-back]')) return back();
  const o = t.closest('[data-open]'); if (o) return go('#/ficha/' + o.dataset.open);
  const sh = t.closest('[data-sheet]'); if (sh) return ({ acct: () => openAccount(), bk: () => openBackup(), look: () => openLook() })[sh.dataset.sheet]();
  const toc = t.closest('[data-toc]'); if (toc) { document.getElementById(toc.dataset.toc)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
  if (t.closest('#fab')) { const f = $('#fab').dataset; return newFicha(f.k, f.g, f.s); }
  const b = t.closest('[data-r]'); if (b && R[b.dataset.r]) R[b.dataset.r](b);
});
$('#view').addEventListener('input', e => {
  const t = e.target, d = t.dataset;
  if (d.q != null) { qs = t.value; $('#fl').innerHTML = fichasList(parse()); $('#fab').hidden = !!qs; return; }
  if (d.fk) return fcalc(d.fk);
  if (d.vt) return evoInput(e);
  const it = cur(); if (!it) return;
  if (d.f) it.f[d.f] = t.value;
  else if (d.k) it[d.k] = t.value;
  else if (d.ci != null) { if (t.type == 'checkbox') it.c[d.ci].d = t.checked; else it.c[d.ci].t = t.value; }
  else if (d.pi != null) it.pr[d.pi][d.pk] = t.value;
  else return;
  if (t.tagName == 'TEXTAREA') grow(t);
  touch(it); save();
});
$('#view').addEventListener('change', e => {
  const t = e.target, d = t.dataset;
  if (d.cfg) { S.cfg[d.cfg] = d.cfg == 'n' ? +t.value : t.value; save(); return; }
  if (d.vs != null || d.gk) return evoChange(e);
  const it = cur(); if (!it) return;
  if (d.ck != null) { it.c[+d.ck].d = t.checked; save(); t.closest('.ck').classList.toggle('done', t.checked); return; }
  if (d.sel) { it[d.sel] = t.value; if (d.sel != 's') it.s = ''; touch(it); save(); render(); return; }
  if (t.hasAttribute('data-add') && t.value) { const o = find(t.value); it.l.push(o.id); o.l.includes(it.id) || o.l.push(it.id); save(); render(); }
});
// recuerda qué desplegables de fórmulas quedaron abiertos
$('#view').addEventListener('toggle', e => { const k = e.target.dataset && e.target.dataset.k; if (k) e.target.open ? op.add(k) : op.delete(k); }, true);
document.addEventListener('keydown', e => { if (e.key == 'Escape' && !$('#bk').hidden) closeSheet(); });

/* =========================================================================
   Hojas: clasificación, apariencia, respaldo, cuenta
   ========================================================================= */
const lock = on => { document.body.style.overflow = on ? 'hidden' : ''; };
function openSheet(h, view = 'sheet') { const bk = $('#bk'); bk.hidden = false; bk.dataset.view = view; lock(true); bk.innerHTML = h; bk.scrollTop = 0; }
function closeSheet() { const bk = $('#bk'); bk.hidden = true; bk.dataset.view = ''; bk.innerHTML = ''; lock(false); store.flush(); render(); }
const sheetHead = (attr = 'data-b="c"') => `<div class="eh"><button ${attr}>${ic('back', 'sm')} Volver</button></div>`;
$('#bk').addEventListener('click', e => { if (e.target.id == 'bk') closeSheet(); });

function clsHtml() {
  const T = ensureTx(S)[clsK], P = clsK == 'p', [L1, L2] = LV[clsK];
  return `<div class="sheet">${sheetHead()}<h3>Clasificación de ${P ? 'patologías' : 'procedimientos'}</h3><p class="meta">${L1} › ${L2.toLowerCase()}. Agregá, quitá o reordená. Solo se pueden quitar los que no tienen fichas.</p>
  ${Object.keys(T).map((g, gi) => `<div class="pan"><div class="li"><b style="flex:1">${P ? roman(gi) + '. ' : ''}${esc(g)}</b><button class="x" data-c="ug" data-g="${esc(g)}" aria-label="Subir">↑</button><button class="x" data-c="dg" data-g="${esc(g)}" aria-label="Quitar">×</button></div><div>${T[g].map((x, si) => `<button class="chip" data-c="ds" data-g="${esc(g)}" data-s="${esc(x)}">${P ? si + 1 + '. ' : ''}${esc(x)} ×</button>`).join('')}</div><div class="tl"><input class="sr" style="padding-left:14px;flex:1" placeholder="Nuevo ${L2.toLowerCase()}" data-cin="${esc(g)}"><button class="add" data-c="as" data-g="${esc(g)}">Agregar</button></div></div>`).join('')}
  <div class="tl"><input class="sr" id="cg" style="padding-left:14px;flex:1" placeholder="Nuevo ${L1.toLowerCase()}"><button class="bt" data-c="ag">Agregar</button></div><p class="meta" id="cm"></p></div>`;
}
$('#bk').addEventListener('click', e => {
  if (formulaSheetClick(e)) return;
  const b = e.target.closest('[data-c]'); if (!b) return;
  const T = ensureTx(S)[clsK], d = b.dataset, c = d.c, use = f => S.items.some(i => i.k == clsK && f(i));
  let m = '';
  if (c == 'ag') { const v = $('#cg').value.trim(); if (v && !T[v]) T[v] = []; }
  if (c == 'as') { const v = document.querySelector(`[data-cin="${CSS.escape(d.g)}"]`).value.trim(); if (v && !T[d.g].includes(v)) T[d.g].push(v); }
  if (c == 'dg') { if (use(i => groupOf(i) == d.g)) m = 'No se puede quitar: tiene fichas.'; else delete T[d.g]; }
  if (c == 'ds') { if (use(i => groupOf(i) == d.g && i.s == d.s)) m = 'No se puede quitar: tiene fichas.'; else T[d.g] = T[d.g].filter(x => x != d.s); }
  if (c == 'ug') { const ks = Object.keys(T), p = ks.indexOf(d.g); if (p > 0) { [ks[p - 1], ks[p]] = [ks[p], ks[p - 1]]; S.tx[clsK] = Object.fromEntries(ks.map(k => [k, T[k]])); } }
  save(); const bk = $('#bk'), sc = bk.scrollTop; bk.innerHTML = clsHtml(); bk.scrollTop = sc; $('#cm').textContent = m;
});

function lookHtml() {
  const ui = getUI();
  return `<div class="sheet">${sheetHead()}<h3>Apariencia</h3><p class="meta">Se guarda en este dispositivo.</p>
  <div class="eyebrow">Estilo</div><div class="skins">${Object.entries(SKINS).map(([k, s]) => `<button class="skin${ui.skin == k ? ' on' : ''}" data-ui-skin="${k}"><b>${s.n}</b><div class="sws">${s.sw.map(c => `<i style="background:${c}"></i>`).join('')}</div><small>${s.d}</small></button>`).join('')}</div>
  <div class="eyebrow">Modo</div><div class="seg">${[['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([k, l]) => `<button data-ui-mode="${k}" class="${ui.mode == k ? 'on' : ''}">${k == 'light' ? ic('sun', 'sm') : k == 'dark' ? ic('moon', 'sm') : ''} ${l}</button>`).join('')}</div></div>`;
}
const openLook = () => openSheet(lookHtml(), 'look');
$('#bk').addEventListener('click', e => {
  const s = e.target.closest('[data-ui-skin]'), m = e.target.closest('[data-ui-mode]');
  if (!s && !m) return;
  setUI(s ? { skin: s.dataset.uiSkin } : { mode: m.dataset.uiMode });
  $('#bk').innerHTML = lookHtml();
});

function replaceState(n, msg) { S = def(migrateV1(n)); ensureTx(S); sess = null; save(); render(); if (msg) toast(msg); }
async function openBackup() {
  const copy = await store.getRaw('copia');
  openSheet(`<div class="sheet">${sheetHead()}<h3>Respaldo y exportación</h3>
  <p class="meta">Tus datos se guardan en este dispositivo${sync.enabled ? ' y, si iniciaste sesión, en tu cuenta' : ''}. Descargá un respaldo de vez en cuando.</p>
  <div class="acts"><button class="bt" data-b="exp">${ic('save', 'sm')} Descargar respaldo (.json)</button><button class="bt sec" data-b="imp">Restaurar desde archivo</button></div>
  <div class="eyebrow">Exportar para Excel</div>
  <div class="acts"><button class="add" data-b="csvp">Patologías (.csv)</button><button class="add" data-b="csvq">Procedimientos (.csv)</button><button class="add" data-b="csvl">Registro quirúrgico (.csv)</button></div>
  ${copy ? `<div class="eyebrow">Copia automática</div><p class="meta">Guardada el ${new Date(copy.at).toLocaleString('es-AR')} (desde ${esc(copy.from)}).</p><div class="acts"><button class="add" data-b="cpy">Restaurar esa copia</button></div>` : ''}
  <div class="eyebrow">Traer datos del prototipo</div><p class="meta">En el prototipo anterior tocá “Respaldo”, copiá el texto y pegalo acá.</p>
  <textarea id="bt" placeholder="Pegá el texto de respaldo"></textarea><div class="acts"><button class="add" data-b="paste">Restaurar desde el texto pegado</button></div>
  <p class="meta" id="bm"></p></div>`, 'bk');
}
$('#bk').addEventListener('click', async e => {
  const b = e.target.closest('[data-b]')?.dataset.b; if (!b) return;
  const fail = m => { $('#bm').textContent = m; $('#bm').className = 'meta err'; };
  try {
    if (b == 'c') return closeSheet();
    if (b == 'exp') { await store.flush(); backup.exportJSON(S); }
    if (b == 'csvp') backup.exportFichasCSV(S, 'p');
    if (b == 'csvq') backup.exportFichasCSV(S, 'q');
    if (b == 'csvl') backup.exportLogCSV(S);
    const keep = from => store.setRaw('copia', { at: Date.now(), from, data: clone(S) });
    if (b == 'imp') { const f = await backup.pickFile(); if (!f) return; const n = backup.parseBackup(await f.text()); await keep('antes de restaurar'); closeSheet(); replaceState(n, 'Respaldo restaurado'); }
    if (b == 'paste') { const n = backup.parseBackup($('#bt').value); await keep('antes de restaurar'); closeSheet(); replaceState(n, 'Datos restaurados'); }
    if (b == 'cpy') { const c = await store.getRaw('copia'); await keep('antes de restaurar la copia'); closeSheet(); replaceState(c.data, 'Copia restaurada'); }
  } catch (err) { fail(err instanceof SyntaxError ? 'El texto no es un respaldo válido.' : err.message || 'No se pudo completar.'); }
});

let recovery = false;
function accountHtml(note = '') {
  const st = sync.getStatus();
  let body;
  if (!sync.enabled) body = `<p>La sincronización no está configurada en esta versión. Tus datos se guardan solo en este dispositivo: usá “Respaldo” para pasarlos a otro.</p>`;
  else if (recovery) body = `<p>Elegí una contraseña nueva.</p><label class="f">Contraseña nueva<input type="password" id="ap" autocomplete="new-password" minlength="8"></label><div class="acts"><button class="bt" data-u="newpw">Guardar contraseña</button></div>`;
  else if (st.status == 'out') body = `<p class="meta">Con una cuenta, tus fichas, preguntas y repasos se sincronizan entre el celular y la compu. Los datos de pacientes nunca se suben.</p>
    <label class="f">Mail<input type="email" id="ae" autocomplete="email" inputmode="email" autocapitalize="off"></label>
    <label class="f" style="margin-top:10px">Contraseña<input type="password" id="ap" autocomplete="current-password" minlength="8"></label>
    <div class="acts"><button class="bt" data-u="in">Iniciar sesión</button><button class="bt sec" data-u="up">Crear cuenta</button><button class="add" data-u="forgot">Olvidé mi contraseña</button></div>`;
  else body = `<p>Sesión iniciada como <b>${esc(st.email)}</b>.</p><p class="meta">Estado: ${STL[st.status]}${st.error ? ' · ' + esc(st.error) : ''}</p>
    <div class="acts"><button class="bt" data-u="now">${ic('sync', 'sm')} Sincronizar ahora</button><button class="bt sec" data-u="outb">Cerrar sesión</button></div>
    <p class="meta">Al cerrar sesión los datos quedan en este dispositivo.</p>`;
  return `<div class="sheet">${sheetHead('data-u="c"')}<h3>Cuenta y sincronización</h3>${body}<p class="meta" id="am">${esc(note)}</p></div>`;
}
const openAccount = (note = '') => openSheet(accountHtml(note), 'acct');
$('#bk').addEventListener('click', async e => {
  const u = e.target.closest('[data-u]')?.dataset.u; if (!u) return;
  const em = () => ($('#ae')?.value || '').trim(), pw = () => $('#ap')?.value || '';
  const note = (m, err) => { const el = $('#am'); el.textContent = m; el.className = 'meta' + (err ? ' err' : ''); };
  const redraw = n => { $('#bk').innerHTML = accountHtml(n); };
  try {
    if (u == 'c') return closeSheet();
    if (u == 'in') { if (!em() || !pw()) return note('Completá mail y contraseña.', 1); note('Entrando…'); await sync.signIn(em(), pw()); redraw('Listo. Sincronizando…'); }
    if (u == 'up') {
      if (!em() || pw().length < 8) return note('Usá un mail válido y una contraseña de 8 caracteres o más.', 1);
      note('Creando cuenta…');
      const confirm = await sync.signUp(em(), pw());
      if (confirm) note('Te mandamos un mail para confirmar la cuenta. Después volvé e iniciá sesión.'); else redraw('Cuenta creada.');
    }
    if (u == 'forgot') { if (!em()) return note('Escribí tu mail primero.', 1); await sync.resetPassword(em()); note('Te mandamos un mail para elegir una contraseña nueva.'); }
    if (u == 'newpw') { if (pw().length < 8) return note('Mínimo 8 caracteres.', 1); await sync.updatePassword(pw()); recovery = false; redraw('Contraseña actualizada.'); }
    if (u == 'now') await sync.syncNow();
    if (u == 'outb') { await sync.signOut(); redraw(); }
  } catch (err) { note(err.message || 'No se pudo completar.', 1); }
});
function onStatus() {
  if (S) drawTop(parse());
  if (!$('#bk').hidden && $('#bk').dataset.view == 'acct') $('#bk').innerHTML = accountHtml();
}

/* =========================================================================
   Arranque
   ========================================================================= */
setInterval(() => {
  if (!S) return;
  const t = today();
  if (S.cfg.nt && S.cfg.last != t && !S.hist[t] && new Date().toTimeString().slice(0, 5) >= S.cfg.t) {
    S.cfg.last = t; store.save(S, { touch: false });
    try { new Notification('Repaso diario', { body: 'Es hora de tu repaso de hoy.' }); } catch { /* sin permiso */ }
  }
}, 30000);

initEvo({ getS: () => S, save, render });
initFormulas({ getS: () => S, save, render, toast, op, openSheet, close: () => closeSheet() });
applyUI();

// El splash avisa cuando terminó la animación (window.__splash); se espera también a que carguen los datos.
function hideSplash() {
  const sp = $('#splash'); if (!sp) return;
  const out = () => { sp.classList.add('out'); setTimeout(() => sp.remove(), 500); };
  Promise.race([window.__splash || Promise.resolve(), new Promise(r => setTimeout(r, 5000))]).then(() => setTimeout(out, 250));
}

(async () => {
  try { S = await store.load(); } catch { S = def({}); toast('No se pudieron leer los datos guardados.'); }
  ensureTx(S);
  if (!location.hash) history.replaceState(null, '', '#/hoy');
  render(); hideSplash();
  store.persist();
  sync.init({
    get: () => S,
    apply: (n, { silent } = {}) => {
      S = n; ensureTx(S); store.save(S, { touch: false });
      // no se redibuja mientras se edita una ficha, para no interrumpir lo que se está escribiendo
      if (!silent && !(parse().v == 'ficha' && parse().edit)) render();
    },
    backup: async (data, from) => store.setRaw('copia', { at: Date.now(), from, data: clone(data) }),
    onStatus,
    notify: m => toast(m, 6000),
    onRecovery: () => { recovery = true; openAccount(); }
  });
})();
