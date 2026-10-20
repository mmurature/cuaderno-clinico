// Panel de rendimiento quirúrgico: solo procedimientos realizados (S.lg), sin datos del paciente.
import { esc, today, cnt } from './data.js';
import { ic } from './icons.js';

let ctx = null, per = 'all';
const S = () => ctx.getS(), $ = s => document.querySelector(s);
export const initStats = c => { ctx = c; };

const ym = d => d.slice(0, 7);
const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
function monthsBack(n) { const d = new Date(); d.setDate(1); const out = []; for (let i = n - 1; i >= 0; i--) { const x = new Date(d.getFullYear(), d.getMonth() - i, 1); out.push(x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0')); } return out; }
function inPeriod(x) {
  if (per == 'all') return true;
  const t = today();
  if (per == 'mes') return ym(x.d) == ym(t);
  if (per == 'anio') return x.d.slice(0, 4) == t.slice(0, 4);
  const m = per == '3m' ? 3 : 12, from = monthsBack(m)[0];
  return ym(x.d) >= from;
}
const espOf = x => x.e || (S().items.find(i => i.k == 'q' && i.t.trim().toLowerCase() == (x.p || '').trim().toLowerCase()) || {}).e || 'Sin especialidad';

// Barras horizontales de un solo color (magnitud): etiqueta, barra, número y porcentaje
const hbars = (rows, tot) => rows.length ? `<div class="hb">${rows.map(([k, v, extra]) => `<div class="hbr" data-tip="${esc(k)}: ${v} (${pct(v, tot)}%)${extra ? ' · ' + esc(extra) : ''}"><span class="hbl">${esc(k)}</span><span class="hbt"><i style="width:${Math.max(2, (v / rows[0][1]) * 100)}%"></i></span><b>${v}</b><small>${pct(v, tot)}%</small></div>`).join('')}</div>` : '<p class="meta">Sin datos en este período.</p>';

// Barra 100 % apilada con leyenda y etiquetas directas (categorías: hasta 3 colores validados)
function stack(parts, tot) {
  const P = parts.filter(p => p[1] > 0);
  if (!tot) return '<p class="meta">Sin datos en este período.</p>';
  return `<div class="stk" role="img" aria-label="${esc(P.map(p => `${p[0]} ${pct(p[1], tot)}%`).join(', '))}">${P.map(([l, v, c]) => `<i class="${c}" style="flex:${v}" data-tip="${esc(l)}: ${v} (${pct(v, tot)}%)"></i>`).join('')}</div>
  <div class="lgd">${parts.map(([l, v, c]) => `<span><i class="${c}"></i>${esc(l)} <b>${pct(v, tot)}%</b> <small>(${v})</small></span>`).join('')}</div>`;
}

// Columnas por mes (últimos 12), una sola serie
function months(L) {
  const M = monthsBack(12), c = cnt(L, x => ym(x.d)), mx = Math.max(1, ...M.map(m => c[m] || 0));
  const W = 336, H = 120, bw = W / 12, top = 14;
  return `<svg class="mchart" viewBox="0 0 ${W} ${H + 18}" role="img" aria-label="Procedimientos por mes, últimos 12 meses">
  <line x1="0" y1="${H}" x2="${W}" y2="${H}" class="ax"/>
  ${M.map((m, i) => { const v = c[m] || 0, h = v ? Math.max(3, (v / mx) * (H - top)) : 0, x = i * bw + 4, w = bw - 8, lab = MES[+m.slice(5) - 1];
    return `<g data-tip="${lab} ${m.slice(0, 4)}: ${v} procedimiento${v == 1 ? '' : 's'}"><rect class="hit" x="${i * bw}" y="0" width="${bw}" height="${H}"/>${v ? `<path class="bar" d="M${x},${H} V${H - h + 4} q0,-4 4,-4 h${w - 8} q4,0 4,4 V${H} Z"/>` : ''}${v && (v == mx || i == 11) ? `<text x="${x + w / 2}" y="${H - h - 4}" class="vl">${v}</text>` : ''}<text x="${x + w / 2}" y="${H + 13}" class="tk">${lab}</text></g>`; }).join('')}
  </svg>`;
}

export function viewStats() {
  const all = S().lg || [], L = all.filter(inPeriod), n = L.length;
  const cir = L.filter(x => x.r == 'Cirujano').length, ayu = L.filter(x => x.r == 'Ayudante').length, obs = L.filter(x => x.r == 'Observador').length;
  const urg = L.filter(x => x.t == 'Urgencia').length, cp = L.filter(x => x.c == 'Sí').length;
  const t = today(), thisM = all.filter(x => ym(x.d) == ym(t)).length, prevM = all.filter(x => ym(x.d) == monthsBack(2)[0]).length;
  const delta = thisM - prevM, uniq = new Set(L.map(x => (x.p || '').trim().toLowerCase())).size;
  const top = Object.entries(cnt(L, x => x.p || 'Sin nombre')).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => [k, v, `${L.filter(x => (x.p || 'Sin nombre') == k && x.r == 'Cirujano').length} como cirujano/a`]);
  const esp = Object.entries(cnt(L, espOf)).sort((a, b) => b[1] - a[1]);
  const kp = (icn, val, lab, sub, cls = '') => `<div class="kt${cls}"><span class="ki">${ic(icn)}</span><b>${val}</b><span>${lab}</span>${sub ? `<small>${sub}</small>` : ''}</div>`;
  const PER = [['all', 'Todo'], ['12m', '12 meses'], ['3m', '3 meses'], ['anio', 'Este año'], ['mes', 'Este mes']];
  const Q = S().items.filter(i => i.k == 'q'), ESP = Object.keys((S().tx || {}).q || {});
  return `<div class="chips filt">${PER.map(([k, l]) => `<button class="chip${per == k ? ' on' : ''}" data-r="sper" data-v="${k}">${l}</button>`).join('')}</div>
  <div class="kgrid">
    ${kp('scalpel', n, 'procedimientos', uniq ? `${uniq} distinto${uniq == 1 ? '' : 's'}` : '')}
    ${kp('user', pct(cir, n) + '%', 'como cirujano/a', `${cir} de ${n}`)}
    ${kp('clock', pct(urg, n) + '%', 'de urgencia', `${urg} de ${n}`)}
    ${kp('alert', pct(cp, n) + '%', 'con complicaciones', `${cp} de ${n}`, cp ? ' warnk' : '')}
    ${kp('stats', thisM, 'este mes', prevM || thisM ? `${delta > 0 ? '▲ ' + delta : delta < 0 ? '▼ ' + -delta : '='} vs. mes anterior` : '')}
  </div>
  ${n || all.length ? `<div class="pan"><h3>Actividad mensual</h3><p class="meta">Últimos 12 meses (todas las fechas)</p>${months(all)}</div>
  <div class="pan"><h3>Tu rol</h3>${stack([['Cirujano/a', cir, 'c1'], ['Ayudante', ayu, 'c2'], ['Observador/a', obs, 'c3']], n)}</div>
  <div class="pan"><h3>Electivo y urgencia</h3>${stack([['Electivo', n - urg, 'c1'], ['Urgencia', urg, 'c2']], n)}</div>
  <div class="pan"><h3>Por especialidad</h3>${hbars(esp, n)}</div>
  <div class="pan"><h3>Procedimientos más frecuentes</h3>${hbars(top, n)}</div>` : `<div class="empty">${ic('stats')}<p>Todavía no registraste procedimientos. Registralos acá abajo o desde un parte quirúrgico finalizado.</p></div>`}
  <div class="pan"><h3>Registrar procedimiento realizado</h3><p class="meta">Sin datos identificables del paciente: solo procedimiento, rol y resultado.</p><div class="tl"><label class="f">Fecha<input type="date" id="lf-d" value="${today()}"></label><label class="f" style="flex:2">Procedimiento<input id="lf-p" list="ql" autocomplete="off"></label><datalist id="ql">${Q.map(i => `<option value="${esc(i.t)}">`).join('')}</datalist><label class="f">Especialidad<select id="lf-e"><option value="">—</option>${ESP.map(e => `<option>${esc(e)}</option>`).join('')}</select></label><label class="f">Rol<select id="lf-r"><option>Cirujano</option><option>Ayudante</option><option>Observador</option></select></label><label class="f">Tipo<select id="lf-t"><option>Electivo</option><option>Urgencia</option></select></label><label class="f">Complicación<select id="lf-c"><option>No</option><option>Sí</option></select></label></div><div class="acts"><button class="bt" data-r="addlog">Registrar</button></div></div>
  ${all.length ? `<details class="g"><summary>Ver todos los registros en tabla (${L.length})</summary><table class="tb wide"><thead><tr><th>Fecha</th><th>Procedimiento</th><th>Especialidad</th><th>Rol</th><th>Tipo</th><th>Compl.</th><th></th></tr></thead><tbody>${L.slice().reverse().map(x => `<tr><td>${x.d}</td><td>${esc(x.p)}</td><td>${esc(espOf(x))}</td><td>${x.r}</td><td>${x.t}</td><td>${x.c}</td><td><button class="x" data-r="dellog" data-i="${all.indexOf(x)}" aria-label="Borrar">×</button></td></tr>`).join('')}</tbody></table></details>` : ''}`;
}

export const SR = {
  sper(b) { per = b.dataset.v; ctx.render(); },
  addlog() {
    const g = i => $('#lf-' + i).value;
    if (!g('p').trim()) return ctx.toast('Escribí el procedimiento');
    const p = g('p').trim(), e = g('e') || (S().items.find(i => i.k == 'q' && i.t.trim().toLowerCase() == p.toLowerCase()) || {}).e || '';
    S().lg.push({ d: g('d') || today(), p, r: g('r'), t: g('t'), c: g('c'), e }); ctx.save(); ctx.render(); ctx.toast('Registrado');
  },
  dellog(b) { S().lg.splice(+b.dataset.i, 1); ctx.save(); ctx.render(); }
};

// Tooltip compartido para las marcas de los gráficos (hover en compu, toque en celular)
export function bindTips() {
  const tip = document.createElement('div'); tip.id = 'tip'; tip.setAttribute('role', 'tooltip'); document.body.appendChild(tip);
  const show = (el, x, y) => { tip.textContent = el.dataset.tip; tip.classList.add('on'); const r = tip.getBoundingClientRect(); tip.style.left = Math.min(innerWidth - r.width - 8, Math.max(8, x - r.width / 2)) + 'px'; tip.style.top = Math.max(8, y - r.height - 12) + 'px'; };
  document.addEventListener('pointerover', e => { const el = e.target.closest && e.target.closest('#view [data-tip]'); if (el) show(el, e.clientX, e.clientY); else tip.classList.remove('on'); });
  document.addEventListener('pointermove', e => { const el = e.target.closest && e.target.closest('#view [data-tip]'); if (el && tip.classList.contains('on')) show(el, e.clientX, e.clientY); });
  addEventListener('scroll', () => tip.classList.remove('on'), { passive: true });
}
