import './styles.css';
import { ST, IV, FL, TN, fieldsOf, mk, hue, esc, shuf, today, addD, cnt, def } from './data.js';
import * as store from './store.js';
import * as backup from './backup.js';
import * as sync from './sync.js';

const $ = s => document.querySelector(s);
let S = null, tab = 'p', qs = '', cur = null, delArm = false, sess = null;
const op = new Set(), find = id => S.items.find(x => x.id == id);

// Guarda localmente y programa la subida a la nube
const save = () => { store.save(S); sync.schedule(); };

function toast(t, ms = 3500) {
  const el = $('#toast'); el.textContent = t; el.classList.add('on');
  clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), ms);
}

/* ---------- utilidades de vista ---------- */
const bars = (o, fmt = v => v, mx) => {
  const m = mx || Math.max(1, ...Object.values(o));
  return Object.entries(o).map(([k, v]) => `<div class="br"><span>${esc(k)}</span><div class="bar"><i style="width:${v / m * 100}%"></i></div><b>${fmt(v)}</b></div>`).join('') || '<p class="meta">Sin datos todavía.</p>';
};
function streak() { let d = today(), n = 0; if (!S.hist[d]) d = addD(d, -1); while (S.hist[d]) { n++; d = addD(d, -1); } return n; }
const dueFichas = () => S.items.filter(i => i.nx && i.nx <= today());

// Preguntas: banco importado + autogeneradas desde las fichas
function qpool() {
  const out = S.qb.map((x, i) => ({ key: 'b' + i, c: x.c || 'General', q: x.q, o: x.o, a: x.a, s: x.s, e: x.e }));
  ['p', 'q'].forEach(k => {
    const A = S.items.filter(i => i.k == k && i.t.trim());
    if (A.length < 4) return;
    A.forEach(i => Object.keys(FL).forEach(f => {
      const v = (i.f[f] || '').trim(); if (v.length < 25) return;
      const o = shuf([i, ...shuf(A.filter(x => x != i)).slice(0, 3)]);
      out.push({ key: `a:${i.id}:${f}`, c: i.g || 'Fichas', q: `¿A qué ${k == 'p' ? 'patología' : 'procedimiento'} corresponde este texto de «${FL[f]}»?\n“${v.slice(0, 300)}”`, o: o.map(x => x.t), a: o.indexOf(i), s: 'Tu ficha: ' + i.t });
    }));
  });
  return out;
}

/* ---------- listas ---------- */
function banner() {
  const t = today(), hh = new Date().toTimeString().slice(0, 5), dn = S.hist[t];
  $('#bn').innerHTML = !dn && hh >= S.cfg.t && tab != 'r' && !sess ? `<div class="bn"><span>Es hora de tu repaso diario (${S.cfg.t})</span><button class="bt" data-go="r">Empezar</button></div>` : '';
}
function card(i) {
  const F = fieldsOf(i).filter(([k]) => k[0] != '_'), n = F.filter(([k]) => (i.f[k] || '').trim()).length, du = i.nx && i.nx <= today();
  return `<article class="card" style="--h:${hue(i.g)}" data-id="${i.id}"><div class="top"><span class="tag">${esc(i.k == 'q' ? (i.e || 'Sin especialidad') : TN[i.ty || 'gen'])}</span><span class="st s${i.st}">${ST[i.st]}</span></div><h3>${esc(i.t || 'Sin título')}</h3><div class="meta">${n}/${F.length} apartados${i.l.length ? ' · ' + i.l.length + ' vínculos' : ''}${du ? ' · <span class="due">Repasar hoy</span>' : ''}</div></article>`;
}
function tree(its) {
  const m = {}, ql = qs.toLowerCase();
  its.forEach(i => {
    if (ql && !(i.t + i.g + i.s + i.e + Object.values(i.f).join(' ')).toLowerCase().includes(ql)) return;
    const g = i.g || 'Sin sistema', s = i.s || 'General';
    ((m[g] ??= {})[s] ??= []).push(i);
  });
  const ks = Object.keys(m).sort();
  if (!ks.length) return `<p class="meta" style="text-align:center;padding:40px 0">${qs ? 'Nada coincide con la búsqueda.' : 'No hay fichas. Tocá “+ Nueva ficha”.'}</p>`;
  return ks.map(g => {
    const all = Object.values(m[g]).flat(), d = all.filter(i => i.st == 2).length, k = tab + g;
    return `<details class="g" style="--h:${hue(g)}" data-k="${esc(k)}" ${op.has(k) || qs ? 'open' : ''}><summary><span class="gt">${esc(g)}</span><span class="gc">${d}/${all.length}</span><span class="mb"><i style="width:${d / all.length * 100}%"></i></span></summary>${Object.keys(m[g]).sort().map(s => {
      const k2 = k + '|' + s;
      return `<details class="sg" data-k="${esc(k2)}" ${op.has(k2) || qs ? 'open' : ''}><summary>${esc(s)} <em>${m[g][s].length}</em></summary><div class="cards">${m[g][s].sort((a, b) => a.t.localeCompare(b.t)).map(card).join('')}</div></details>`;
    }).join('')}</details>`;
  }).join('');
}

/* ---------- repaso ---------- */
function repHome() {
  const t = today(), P = qpool(), dn = S.hist[t], du = dueFichas();
  return `<div class="pan"><h3>Repaso diario</h3><p class="meta">${dn ? `Hoy completaste ${dn.ok}/${dn.n} · ` : 'Hoy: pendiente · '}Racha: ${streak()} día(s) · ${P.length} preguntas disponibles (${S.qb.length} del banco, ${P.length - S.qb.length} de tus fichas)</p>
  <div class="tl"><label class="f">Hora<input type="time" data-cfg="t" value="${S.cfg.t}"></label><label class="f">Preguntas por día<select data-cfg="n">${[3, 5, 8, 10].map(n => `<option ${S.cfg.n == n ? 'selected' : ''}>${n}</option>`).join('')}</select></label><button class="bt" data-r="start" ${P.length ? '' : 'disabled'}>Empezar repaso</button></div>
  <p class="meta" style="margin-top:10px">Avisos: <button class="add" data-r="notif">${S.cfg.nt ? 'Activados mientras la app esté abierta' : 'Activar avisos'}</button> Para no depender de la app, poné también una alarma diaria en el celular a esa hora.</p></div>
  <div class="pan"><h3>Fichas para repasar hoy (${du.length})</h3>${du.map(i => `<button class="chip" data-r="gof" data-i="${i.id}">${esc(i.t)}</button>`).join('') || '<p class="meta">Ninguna. Asignales una fecha de repaso dentro de cada ficha.</p>'}</div>
  <div class="pan"><h3>Banco de preguntas (${S.qb.length})</h3><p class="meta">Pegá preguntas en JSON: <code>[{"c":"Anatomía","q":"…","o":["A","B","C","D"],"a":0,"e":"explicación","s":"fuente"}]</code>. Revisá siempre las preguntas contra la fuente.</p><textarea id="qa" placeholder="Pegá el JSON acá"></textarea><button class="add" data-r="addq">Agregar al banco</button><span class="meta" id="qm"></span></div>`;
}
function repQ() {
  const q = sess.qs[sess.i], a = sess.ans;
  return `<div class="pan"><div class="meta">Pregunta ${sess.i + 1} de ${sess.qs.length} · <span class="tag" style="--h:${hue(q.c)}">${esc(q.c)}</span></div><h3 class="qq">${esc(q.q)}</h3>${q.o.map((t, j) => `<button class="op${a != null ? (j == q.a ? ' ok' : j == a ? ' no' : '') : ''}" data-r="ans" data-j="${j}" ${a != null ? 'disabled' : ''}>${esc(t)}</button>`).join('')}${a != null ? `<div class="fb"><b>${a == q.a ? 'Correcto' : 'Incorrecto'}</b>${q.e ? '. ' + esc(q.e) : ''}<div class="meta">${esc(q.s || '')}</div></div><button class="bt" data-r="next">${sess.i + 1 < sess.qs.length ? 'Siguiente' : 'Terminar'}</button>` : ''}</div>`;
}

/* ---------- estadísticas ---------- */
function stats() {
  const P = S.items.filter(i => i.k == 'p'), Q = S.items.filter(i => i.k == 'q'), L = S.lg, dm = a => a.filter(i => i.st == 2).length;
  const sys = cnt(P, i => i.g || 'Sin sistema'), dom = {};
  Object.keys(sys).forEach(g => dom[g] = Math.round(P.filter(i => (i.g || 'Sin sistema') == g && i.st == 2).length / sys[g] * 100));
  const cat = {}; Object.entries(S.cs).forEach(([c, v]) => cat[c] = Math.round(v.ok / v.n * 100));
  const cp = L.filter(x => x.c == 'Sí').length, mo = cnt(L, x => x.d.slice(0, 7));
  const tot = Object.values(S.hist).reduce((a, v) => a + v.n, 0), okk = Object.values(S.hist).reduce((a, v) => a + v.ok, 0);
  return `<div class="kp"><div><b>${P.length}</b>patologías (${dm(P)} dominadas)</div><div><b>${Q.length}</b>fichas de procedimientos</div><div><b>${L.length}</b>procedimientos realizados</div><div><b>${streak()}</b>días de racha</div></div>
  <div class="pan"><h3>Estudio</h3><p class="meta">Dominio por sistema</p>${bars(dom, v => v + '%', 100)}<p class="meta" style="margin-top:10px">Estado de las fichas</p>${bars(cnt(S.items, i => ST[i.st]))}<p class="meta" style="margin-top:10px">Precisión en repasos por categoría (${tot ? Math.round(okk / tot * 100) + '% global' : 'sin datos'})</p>${bars(cat, v => v + '%', 100)}</div>
  <div class="pan"><h3>Registro de procedimientos realizados</h3><p class="meta">Sin datos identificables del paciente: solo procedimiento, rol y resultado.</p><div class="tl"><label class="f">Fecha<input type="date" id="lf-d" value="${today()}"></label><label class="f">Procedimiento<input id="lf-p" list="ql"></label><datalist id="ql">${Q.map(i => `<option value="${esc(i.t)}">`).join('')}</datalist><label class="f">Rol<select id="lf-r"><option>Cirujano</option><option>Ayudante</option><option>Observador</option></select></label><label class="f">Tipo<select id="lf-t"><option>Electivo</option><option>Urgencia</option></select></label><label class="f">Complicación<select id="lf-c"><option>No</option><option>Sí</option></select></label><button class="bt" data-r="addlog">Registrar</button></div></div>
  <div class="pan"><h3>Estadísticas quirúrgicas</h3><p class="meta">Complicaciones: ${L.length ? Math.round(cp / L.length * 100) + '% (' + cp + ' de ' + L.length + ')' : 'sin datos'}</p><p class="meta">Por rol</p>${bars(cnt(L, x => x.r))}<p class="meta" style="margin-top:10px">Electivo vs urgencia</p>${bars(cnt(L, x => x.t))}<p class="meta" style="margin-top:10px">Procedimientos más frecuentes</p>${bars(Object.fromEntries(Object.entries(cnt(L, x => x.p || 'Sin nombre')).sort((a, b) => b[1] - a[1]).slice(0, 6)))}<p class="meta" style="margin-top:10px">Por mes</p>${bars(Object.fromEntries(Object.entries(mo).sort().slice(-6)))}<p class="meta" style="margin-top:10px">Últimos registros</p>${L.slice(-5).reverse().map(x => `<div class="li"><span class="meta" style="flex:1">${x.d} · ${esc(x.p)} · ${x.r} · ${x.t}${x.c == 'Sí' ? ' · complicación' : ''}</span><button class="x" data-r="dellog" data-i="${S.lg.indexOf(x)}" aria-label="Borrar">×</button></div>`).join('')}</div>`;
}

function render() {
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.t == tab));
  const pq = tab == 'p' || tab == 'q';
  $('#new').hidden = !pq; banner();
  if (pq) {
    const its = S.items.filter(i => i.k == tab), d = its.filter(i => i.st == 2).length;
    $('#prog').innerHTML = `<div><b>${d}</b> de ${its.length} dominadas</div><div class="bar"><i style="width:${its.length ? d / its.length * 100 : 0}%"></i></div>`;
    $('#list').innerHTML = tree(its);
  } else {
    $('#prog').innerHTML = '';
    $('#list').innerHTML = tab == 'r'
      ? (sess ? (sess.fin ? `<div class="pan"><h3>Repaso terminado</h3><p>Acertaste ${sess.ok} de ${sess.qs.length}.</p><button class="bt" data-r="end">Volver</button></div>` : repQ()) : repHome())
      : stats();
  }
}

/* ---------- editor de ficha ---------- */
function drawEd() {
  const it = cur, ed = $('#ed'), sc = ed.scrollTop, uniq = f => [...new Set(S.items.map(f).filter(Boolean))];
  const sec = fieldsOf(it).map(([k, l]) => {
    let b;
    if (k == '_c') b = it.c.map((c, i) => `<div class="li"><input type="checkbox" data-ci="${i}" ${c.d ? 'checked' : ''}><input type="text" data-ci="${i}" value="${esc(c.t)}" placeholder="Ítem a preparar"><button class="x" data-a="xc" data-i="${i}" aria-label="Quitar">×</button></div>`).join('') + `<button class="add" data-a="ac">+ Ítem</button>`;
    else if (k == '_p') b = it.pr.map((p, i) => `<div class="pi"><div class="li"><input data-pi="${i}" data-pk="m" value="${esc(p.m)}" placeholder="Nombre del médico"><button class="x" data-a="xp" data-i="${i}" aria-label="Quitar">×</button></div><textarea data-pi="${i}" data-pk="t" placeholder="Instrumental, suturas, posición…">${esc(p.t)}</textarea></div>`).join('') + `<button class="add" data-a="ap">+ Médico</button>`;
    else b = `<textarea data-f="${k}" placeholder="Escribí acá…">${esc(it.f[k])}</textarea>`;
    return `<section><h4>${l}</h4>${b}</section>`;
  }).join('');
  const oth = S.items.filter(x => x != it && !it.l.includes(x.id)).sort((a, b) => a.t.localeCompare(b.t));
  ed.innerHTML = `<div class="sheet" style="--h:${hue(it.g)}"><div class="eh"><button data-a="close">← Volver</button><button class="del" data-a="del">${delArm ? '¿Seguro? Tocá otra vez' : 'Eliminar'}</button></div>
  <input class="ti" data-k="t" value="${esc(it.t)}" placeholder="Nombre">
  <div class="row"><label class="f">Sistema<input data-k="g" list="l1" value="${esc(it.g)}"></label><label class="f">Subsistema<input data-k="s" list="l2" value="${esc(it.s)}"></label>${it.k == 'q' ? `<label class="f">Especialidad / subespecialidad<input data-k="e" list="l3" value="${esc(it.e)}"></label>` : `<label class="f">Tipo<select data-ty>${Object.entries(TN).map(([k, v]) => `<option value="${k}" ${it.ty == k ? 'selected' : ''}>${v}</option>`).join('')}</select></label>`}</div>
  <datalist id="l1">${uniq(i => i.g).map(g => `<option value="${esc(g)}">`).join('')}</datalist><datalist id="l2">${uniq(i => i.s).map(g => `<option value="${esc(g)}">`).join('')}</datalist><datalist id="l3">${uniq(i => i.e).map(g => `<option value="${esc(g)}">`).join('')}</datalist>
  <div class="seg">${ST.map((s, i) => `<button data-a="st" data-v="${i}" class="s${i}${it.st == i ? ' on' : ''}">${s}</button>`).join('')}</div>
  <div class="tl"><label class="f">Próximo repaso<input type="date" data-k="nx" value="${it.nx || ''}"></label><button class="add" data-a="rep">Repasada hoy</button></div>${sec}
  <section><h4>Fichas relacionadas</h4>${it.l.map(id => find(id)).filter(Boolean).map(x => `<button class="chip" data-a="go" data-i="${x.id}">${esc(x.t)}</button>`).join('')}<select data-add><option value="">+ Vincular ficha…</option>${oth.map(x => `<option value="${x.id}">${x.k == 'p' ? 'Patología' : 'Procedimiento'} · ${esc(x.t)}</option>`).join('')}</select></section></div>`;
  ed.querySelectorAll('textarea').forEach(grow);
  ed.scrollTop = sc;
}
const grow = t => { t.style.height = 'auto'; t.style.height = Math.max(t.scrollHeight + 2, 78) + 'px'; };
const lock = on => { document.body.style.overflow = on ? 'hidden' : ''; };
function openEd(it) { cur = it; delArm = false; $('#ed').hidden = false; lock(true); drawEd(); }
function closeAll() { $('#ed').hidden = true; $('#bk').hidden = true; $('#bk').dataset.view = ''; lock(false); cur = null; store.flush(); render(); }

$('#ed').oninput = e => {
  const t = e.target, it = cur, d = t.dataset; if (!it) return;
  if (d.f) it.f[d.f] = t.value;
  else if (d.k) it[d.k] = t.value;
  else if (d.ci != null) { t.type == 'checkbox' ? it.c[d.ci].d = t.checked : it.c[d.ci].t = t.value; }
  else if (d.pi != null) it.pr[d.pi][d.pk] = t.value;
  if (t.tagName == 'TEXTAREA') grow(t);
  save();
};
$('#ed').onchange = e => {
  const t = e.target;
  if (t.hasAttribute('data-ty')) { cur.ty = t.value; save(); drawEd(); }
  if (t.hasAttribute('data-add') && t.value) { const o = find(t.value); cur.l.push(o.id); o.l.includes(cur.id) || o.l.push(cur.id); save(); drawEd(); }
};
$('#ed').onclick = e => {
  const b = e.target.closest('[data-a]');
  if (!b) { if (e.target.id == 'ed') closeAll(); return; }
  const a = b.dataset.a, it = cur, i = +b.dataset.i;
  if (a == 'close') return closeAll();
  if (a == 'go') { cur = find(b.dataset.i); delArm = false; return drawEd(); }
  if (a == 'del') {
    if (!delArm) { delArm = true; drawEd(); return; }
    S.items.forEach(x => x.l = x.l.filter(y => y != it.id));
    S.items = S.items.filter(x => x != it); save(); toast('Ficha eliminada');
    return closeAll();
  }
  if (a == 'st') it.st = +b.dataset.v;
  if (a == 'rep') { it.nx = addD(today(), IV[it.st]); toast('Próximo repaso: ' + it.nx); }
  if (a == 'ac') it.c.push({ t: '', d: false });
  if (a == 'xc') it.c.splice(i, 1);
  if (a == 'ap') it.pr.push({ m: '', t: '' });
  if (a == 'xp') it.pr.splice(i, 1);
  save(); drawEd();
};
document.addEventListener('keydown', e => { if (e.key == 'Escape' && (cur || !$('#bk').hidden)) closeAll(); });

/* ---------- acciones de repaso y registro ---------- */
const R = {
  start() {
    const t = today(), P = qpool(), dueK = k => S.rv[k] && S.rv[k].n <= t, nw = k => !S.rv[k];
    sess = { qs: [...shuf(P.filter(p => dueK(p.key))), ...shuf(P.filter(p => nw(p.key))), ...shuf(P.filter(p => S.rv[p.key] && !dueK(p.key)))].slice(0, S.cfg.n), i: 0, ok: 0, ans: null };
    render();
  },
  ans(b) {
    const q = sess.qs[sess.i], j = +b.dataset.j, ok = j == q.a, r = S.rv[q.key] || { b: 0 };
    r.b = ok ? Math.min(r.b + 1, 4) : 0; r.n = addD(today(), ok ? [1, 2, 4, 8, 16][r.b] : 1); S.rv[q.key] = r;
    const c = S.cs[q.c] || { ok: 0, n: 0 }; c.n++; ok && c.ok++; S.cs[q.c] = c;
    sess.ans = j; ok && sess.ok++; save(); render();
  },
  next() {
    if (sess.i + 1 < sess.qs.length) { sess.i++; sess.ans = null; }
    else { const h = S.hist[today()] || { ok: 0, n: 0 }; h.ok += sess.ok; h.n += sess.qs.length; S.hist[today()] = h; sess.fin = 1; save(); }
    render();
  },
  end() { sess = null; render(); },
  gof(b) { openEd(find(b.dataset.i)); },
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
  dellog(b) { S.lg.splice(+b.dataset.i, 1); save(); render(); }
};
$('#list').onclick = e => {
  const c = e.target.closest('.card'); if (c) return openEd(find(c.dataset.id));
  const g = e.target.closest('[data-go]'); if (g) { tab = g.dataset.go; return render(); }
  const b = e.target.closest('[data-r]'); if (b) R[b.dataset.r](b);
};
$('#bn').onclick = e => { const g = e.target.closest('[data-go]'); if (g) { tab = g.dataset.go; render(); } };
$('#list').onchange = e => { const c = e.target.dataset.cfg; if (c) { S.cfg[c] = c == 'n' ? +e.target.value : e.target.value; save(); } };
$('#list').addEventListener('toggle', e => { const k = e.target.dataset.k; if (k && !qs) e.target.open ? op.add(k) : op.delete(k); }, true);
$('#tabs').onclick = e => { const b = e.target.closest('button'); if (b) { tab = b.dataset.t; render(); } };
$('#q').oninput = e => { qs = e.target.value; if (tab != 'p' && tab != 'q') tab = 'p'; render(); };
$('#new').onclick = () => { const it = mk(tab, ''); S.items.push(it); save(); openEd(it); $('#ed .ti').focus(); };

/* ---------- respaldo ---------- */
function replaceState(n, msg) { S = def(n); sess = null; save(); render(); if (msg) toast(msg); }
async function drawBackup() {
  const copy = await store.getRaw('copia');
  $('#bk').innerHTML = `<div class="sheet"><div class="eh"><button data-b="c">← Volver</button></div><h3>Respaldo y exportación</h3>
  <p class="meta">Tus datos se guardan en este dispositivo${sync.enabled ? ' y, si iniciaste sesión, en tu cuenta' : ''}. Descargá un respaldo de vez en cuando.</p>
  <div class="acts"><button class="bt" data-b="exp">Descargar respaldo (.json)</button><button class="bt sec" data-b="imp">Restaurar desde archivo</button></div>
  <h4 style="margin-top:18px">Exportar para Excel</h4>
  <div class="acts"><button class="add" data-b="csvp">Patologías (.csv)</button><button class="add" data-b="csvq">Procedimientos (.csv)</button><button class="add" data-b="csvl">Registro quirúrgico (.csv)</button></div>
  ${copy ? `<h4 style="margin-top:18px">Copia automática</h4><p class="meta">Guardada el ${new Date(copy.at).toLocaleString('es-AR')} (desde ${esc(copy.from)}) al resolver un conflicto de sincronización.</p><div class="acts"><button class="add" data-b="cpy">Restaurar esa copia</button></div>` : ''}
  <h4 style="margin-top:18px">Traer datos del prototipo</h4><p class="meta">En el prototipo anterior tocá “Respaldo”, copiá el texto y pegalo acá.</p>
  <textarea id="bt" placeholder="Pegá el texto de respaldo"></textarea><div class="acts"><button class="add" data-b="paste">Restaurar desde el texto pegado</button></div>
  <p class="meta" id="bm"></p></div>`;
}
$('#bkb').onclick = async () => { $('#bk').hidden = false; lock(true); await drawBackup(); };
$('#bk').onclick = async e => {
  const b = e.target.closest('[data-b]')?.dataset.b;
  if (!b) { if (e.target.id == 'bk') closeAll(); return; }
  const fail = m => { $('#bm').textContent = m; $('#bm').className = 'meta err'; };
  try {
    if (b == 'c') return closeAll();
    if (b == 'exp') { await store.flush(); backup.exportJSON(S); }
    if (b == 'csvp') backup.exportFichasCSV(S, 'p');
    if (b == 'csvq') backup.exportFichasCSV(S, 'q');
    if (b == 'csvl') backup.exportLogCSV(S);
    if (b == 'imp') {
      const f = await backup.pickFile(); if (!f) return;
      const n = backup.parseBackup(await f.text());
      await store.setRaw('copia', { at: Date.now(), from: 'antes de restaurar', data: structuredClone(S) });
      replaceState(n, 'Respaldo restaurado'); closeAll();
    }
    if (b == 'paste') {
      const n = backup.parseBackup($('#bt').value);
      await store.setRaw('copia', { at: Date.now(), from: 'antes de restaurar', data: structuredClone(S) });
      replaceState(n, 'Datos restaurados'); closeAll();
    }
    if (b == 'cpy') {
      const c = await store.getRaw('copia');
      await store.setRaw('copia', { at: Date.now(), from: 'antes de restaurar la copia', data: structuredClone(S) });
      replaceState(c.data, 'Copia restaurada'); closeAll();
    }
  } catch (err) { fail(err instanceof SyntaxError ? 'El texto no es un respaldo válido.' : err.message || 'No se pudo completar.'); }
};

/* ---------- cuenta y sincronización ---------- */
const SHORT = { off: 'Local', out: 'Entrar', ok: 'Sync', busy: 'Sync…', err: 'Error', offline: 'Offline' };
const STL = { off: 'Solo local', out: 'Iniciar sesión', ok: 'Sincronizado', busy: 'Sincronizando…', err: 'Error de sync', offline: 'Sin conexión' };
function onStatus(s) {
  $('#syd').className = 'dot ' + ({ ok: 'ok', busy: 'busy', err: 'err' }[s] || '');
  $('#syl').textContent = SHORT[s] || 'Cuenta';
  if (!$('#bk').hidden && $('#bk').dataset.view == 'acct') drawAccount();
}
let recovery = false;
function drawAccount(note = '') {
  const st = sync.getStatus(), bk = $('#bk'); bk.dataset.view = 'acct';
  let body;
  if (!sync.enabled) body = `<p>La sincronización todavía no está configurada en esta versión. Tus datos se guardan solo en este dispositivo: usá “Respaldo” para pasarlos a otro.</p>`;
  else if (recovery) body = `<p>Elegí una contraseña nueva.</p><label class="f">Contraseña nueva<input type="password" id="ap" autocomplete="new-password" minlength="8"></label><div class="acts"><button class="bt" data-u="newpw">Guardar contraseña</button></div>`;
  else if (st.status == 'out') body = `<p class="meta">Con una cuenta, tus fichas, preguntas y repasos se sincronizan entre el celular y la compu. Los datos de pacientes nunca se suben.</p>
    <label class="f">Mail<input type="email" id="ae" autocomplete="email" inputmode="email"></label>
    <label class="f" style="margin-top:8px;display:block">Contraseña<input type="password" id="ap" autocomplete="current-password" minlength="8"></label>
    <div class="acts"><button class="bt" data-u="in">Iniciar sesión</button><button class="bt sec" data-u="up">Crear cuenta</button><button class="add" data-u="forgot">Olvidé mi contraseña</button></div>`;
  else body = `<p>Sesión iniciada como <b>${esc(st.email)}</b>.</p><p class="meta">Estado: ${STL[st.status]}${st.error ? ' · ' + esc(st.error) : ''}</p>
    <div class="acts"><button class="bt" data-u="now">Sincronizar ahora</button><button class="bt sec" data-u="outb">Cerrar sesión</button></div>
    <p class="meta">Al cerrar sesión los datos quedan en este dispositivo.</p>`;
  bk.innerHTML = `<div class="sheet"><div class="eh"><button data-u="c">← Volver</button></div><h3>Cuenta y sincronización</h3>${body}<p class="meta" id="am">${esc(note)}</p></div>`;
}
$('#syb').onclick = () => { $('#bk').hidden = false; lock(true); drawAccount(); };
$('#bk').addEventListener('click', async e => {
  const u = e.target.closest('[data-u]')?.dataset.u; if (!u) return;
  const em = () => ($('#ae')?.value || '').trim(), pw = () => $('#ap')?.value || '';
  const note = (m, err) => { const el = $('#am'); el.textContent = m; el.className = 'meta' + (err ? ' err' : ''); };
  try {
    if (u == 'c') { $('#bk').dataset.view = ''; return closeAll(); }
    if (u == 'in') { if (!em() || !pw()) return note('Completá mail y contraseña.', 1); note('Entrando…'); await sync.signIn(em(), pw()); drawAccount('Listo. Sincronizando…'); }
    if (u == 'up') {
      if (!em() || pw().length < 8) return note('Usá un mail válido y una contraseña de 8 caracteres o más.', 1);
      note('Creando cuenta…');
      const confirm = await sync.signUp(em(), pw());
      if (confirm) note('Te mandamos un mail para confirmar la cuenta. Después volvé e iniciá sesión.'); else drawAccount('Cuenta creada.');
    }
    if (u == 'forgot') { if (!em()) return note('Escribí tu mail primero.', 1); await sync.resetPassword(em()); note('Te mandamos un mail para elegir una contraseña nueva.'); }
    if (u == 'newpw') { if (pw().length < 8) return note('Mínimo 8 caracteres.', 1); await sync.updatePassword(pw()); recovery = false; drawAccount('Contraseña actualizada.'); }
    if (u == 'now') { await sync.syncNow(); }
    if (u == 'outb') { await sync.signOut(); drawAccount(); }
  } catch (err) { note(err.message || 'No se pudo completar.', 1); }
});

/* ---------- arranque ---------- */
setInterval(() => {
  if (!S) return; banner();
  const t = today();
  if (S.cfg.nt && S.cfg.last != t && !S.hist[t] && new Date().toTimeString().slice(0, 5) >= S.cfg.t) {
    S.cfg.last = t; store.save(S, { touch: false });
    try { new Notification('Repaso diario', { body: 'Es hora de tu repaso de hoy.' }); } catch { /* sin permiso */ }
  }
}, 30000);

(async () => {
  S = await store.load();
  render();
  store.persist();
  sync.init({
    get: () => S,
    apply: (n, { silent } = {}) => {
      S = n; store.save(S, { touch: false });
      if (!silent) { if (cur) cur = find(cur.id) || null; if (cur) drawEd(); else if ($('#ed').hidden === false) closeAll(); render(); }
    },
    backup: async (data, from) => store.setRaw('copia', { at: Date.now(), from, data: structuredClone(data) }),
    onStatus,
    notify: m => toast(m, 6000),
    onRecovery: () => { recovery = true; $('#bk').hidden = false; lock(true); drawAccount(); }
  });
})();
