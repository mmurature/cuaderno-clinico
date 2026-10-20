// Motor de redacción de evoluciones: datos estructurados → texto médico natural.
// Reglas (del documento de la usuaria): nunca escribir el nombre del campo, omitir lo no evaluado,
// agrupar hallazgos relacionados, conservar lateralidad, valores y escalas, priorizar lo patológico
// y no inventar nada que no se haya marcado. Sin DOM: se puede probar con node.
import { cap, lf, list, bilat, pn, fmt, daysSince, fem, para } from '../txt.js';
import { SCALES, CONC, MUSCLES, REFLEXES, ROT_V, SENS_T, SENS_M, NIHSS, LAB, DEVICES, DEV_SITE, O2, KEYM, DERM, isncsci } from './scales.js';

export const SPECIAL = ['gcs', 'conc', 'orient', 'pupils', 'mrc4', 'motor', 'rot', 'patol', 'sens', 'nihss', 'asia', 'vitals', 'lab', 'dev'];
const empty = x => !x || !Object.keys(x).some(k => k != 'ev' && x[k] !== '' && x[k] != null && !(Array.isArray(x[k]) && !x[k].length));

export const optLabel = o => (Array.isArray(o) ? o[0] : o);
export const optPhrase = o => (Array.isArray(o) ? o[1] : o);
const phraseOf = (f, label) => { const o = (f.a || []).find(a => optLabel(a) == label); return o ? optPhrase(o) : label; };
export const scaleDef = sc => (sc && sc.s ? SCALES[sc.s] : sc);

// ---------- evolución temporal (manual o automática) ----------
export const TEMP = [['', '—'], ['sc', 'Sin cambios'], ['me', 'Mejoría'], ['de', 'Deterioro'], ['nu', 'Nuevo hallazgo'], ['re', 'Resuelto']];
function temporal(t, ev, nom, prev) {
  if (!ev) return null;
  if (ev == 'sc') return t + ', sin cambios respecto de la evolución previa';
  if (ev == 'me') return nom ? `Mejoría ${nom}, actualmente ${lf(t)}` : `${t}, con mejoría respecto de la evolución previa`;
  if (ev == 'de') return nom ? `Empeoramiento ${nom}, actualmente ${lf(t)}` : `${t}, con empeoramiento respecto de la evolución previa`;
  if (ev == 'nu') return `Nuevo hallazgo de ${lf(t)}`;
  if (ev == 're') return nom ? `Resolución ${nom} previamente documentada`.replace(/(del|de los) (\S+) previamente documentada/, (m, a, b) => `${a} ${b} previamente documentado`) : prev ? `Resolución de ${lf(prev)}` : t;
  return null;
}

/* =========================================================================
   Campos genéricos
   ========================================================================= */
function genText(f, x) {
  if (!x || !x.s) return null;
  let t, alt = false;
  if (x.s == 'ne') { if (!f.ne) return null; t = f.ne + (x.d ? ' ' + x.d.replace(/^\s*/, '') : ''); }
  else if (x.s == 'n') { if (!f.n) return null; t = f.n; }
  else {
    alt = true;
    const ph = bilat((x.o || []).map(l => phraseOf(f, l)));
    const parts = [];
    if (ph.length) parts.push((f.ap || '') + list(ph.map((p, i) => (i || f.ap ? lf(p) : p))));
    if (x.d) parts.push(x.d.trim());
    if (!parts.length && !x.sc && !x.nm) parts.push(`${f.l} con alteraciones`);
    t = parts.join(', ');
  }
  const sc = scaleDef(f.sc);
  if (sc && x.sc) t += ', ' + sc.p.replace('{v}', x.sc);
  if (f.num && x.nm) t += ', ' + f.num.p.replace('{v}', fmt(x.nm));
  return { t, alt };
}
function generic(f, x, b) {
  const r = genText(f, x); if (!r) return null;
  let ev = x.ev;
  if (!ev && b && b.s && b.s != 'ne' && x.s != 'ne') { if (b.s == 'a' && x.s == 'n') ev = 're'; else if (b.s == 'n' && x.s == 'a') ev = 'nu'; }
  const prev = b ? (genText(f, b) || {}).t : null;
  if (ev == 'nu' && !r.alt) ev = '';
  const tt = temporal(r.t, ev, f.nom, prev);
  return tt ? { t: tt, alt: true, brk: true } : r;
}

/* =========================================================================
   Componentes especiales
   ========================================================================= */
const R = {};

R.conc = (f, x, b, c) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'Nivel de conciencia no evaluable' + (x.d ? ' ' + x.d : '') };
  if (!x.v && !(x.m || []).length) return null;
  const t = [x.v, ...(x.m || [])].filter(Boolean).map((w, i) => (i ? lf(w) : w)).join(', ');
  const alt = (x.v && x.v != 'Vigil') || (x.m || []).length > 0;
  if (!c.hasGcs && b && b.v && x.v && b.v != x.v && !x.ev) {
    const up = CONC.indexOf(x.v) < CONC.indexOf(b.v);
    return { t: `${up ? 'Mejoría' : 'Deterioro'} del nivel de conciencia, actualmente ${lf(t)}`, alt: true, brk: true };
  }
  const tt = temporal(t, x.ev, 'del nivel de conciencia'); return tt ? { t: tt, alt: true, brk: true } : { t, alt };
};

const ON = { t: 'tiempo', e: 'espacio', p: 'persona' };
function orientText(x) {
  const K = ['t', 'e', 'p'], A = K.filter(k => x[k] == 'a'), C = K.filter(k => x[k] == 'c'), N = K.filter(k => x[k] == 'ne');
  if (!A.length && !C.length && !N.length) return null;
  const ne = N.length ? `, orientación en ${list(N.map(k => ON[k]))} no evaluable` : '';
  if (A.length == 3) return { t: 'Desorientado globalmente', alt: true, n: 3 };
  if (A.length) return { t: `Desorientado en ${list(A.map(k => ON[k]))}${ne}`, alt: true, n: A.length };
  if (C.length == 3) return { t: 'Orientado en tiempo, espacio y persona', n: 0 };
  if (C.length) return { t: `Orientado en ${list(C.map(k => ON[k]))}${ne}`, n: 0 };
  return { t: 'Orientación no evaluable', n: 0 };
}
R.orient = (f, x, b) => {
  if (empty(x)) return null;
  const r = orientText(x); if (!r) return null;
  let ev = x.ev; const p = b && !empty(b) ? orientText(b) : null;
  if (!ev && p) { if (p.n > 0 && r.n == 0) ev = 're'; else if (p.n == 0 && r.n > 0) ev = 'nu'; else if (r.n > p.n) ev = 'de'; else if (r.n < p.n) ev = 'me'; }
  if (ev == 're') return { t: `${r.t}, con resolución de la desorientación previamente documentada`, alt: true, brk: true };
  const tt = temporal(r.t, ev, 'de la orientación'); return tt ? { t: tt, alt: true, brk: true } : r;
};

const gcsTot = x => (x && x.o && x.v && x.m ? +x.o + +x.m + (x.v == 'T' ? 0 : +x.v) : null);
function gcsText(x) {
  const t = gcsTot(x); if (t == null) return null;
  return x.v == 'T' ? `Glasgow ${t}T (O${x.o} VT M${x.m})` : t == 15 ? 'Glasgow 15/15' : `Glasgow ${t}/15 (O${x.o} V${x.v} M${x.m})`;
}
R.gcs = (f, x, b) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'Glasgow no evaluable' + (x.d ? ' ' + x.d : '') };
  const t = gcsText(x); if (!t) return null;
  const alt = gcsTot(x) < 15 || x.v == 'T';
  if (x.ev) { const tt = temporal(t, x.ev, 'del nivel de conciencia'); return { t: tt, alt: true, brk: true }; }
  const pt = gcsTot(b);
  if (pt != null && b.v != 'T' && x.v != 'T') {
    const nt = gcsTot(x);
    if (nt > pt) return { t: `Mejoría del nivel de conciencia, actualmente ${t}`, alt: true, brk: true };
    if (nt < pt) return { t: `${t}, con deterioro del nivel de conciencia respecto del control previo (Glasgow ${pt}/15)`, alt: true };
  }
  return { t, alt };
};

const RW = { r: 'fotorreactiva', h: 'hiporreactiva', a: 'arreactiva' };
function pupText(x) {
  const R_ = pn(x.rd), L_ = pn(x.ld);
  if (R_ == null && L_ == null && !x.rr && !x.lr) return null;
  const same = (x.rr || 'r') == (x.lr || 'r'), rr = x.rr || '', lr = x.lr || '';
  const reacPair = `pupila derecha ${RW[rr] || 'de reactividad no evaluada'} e izquierda ${RW[lr] || 'de reactividad no evaluada'}`;
  let t, aniso = false, alt = false;
  if (R_ != null && L_ != null && Math.abs(R_ - L_) >= 1) {
    aniso = alt = true;
    const big = R_ > L_ ? 'derecha' : 'izquierda', small = R_ > L_ ? 'izquierda' : 'derecha', mn = Math.min(R_, L_), mx = Math.max(R_, L_);
    t = `Anisocoria con ${mn < 3 && mx <= 4 ? 'miosis ' + small : 'midriasis ' + big} (${fmt(R_)} mm derecha y ${fmt(L_)} mm izquierda)`;
    t += rr && lr ? (same ? `, ambas pupilas ${RW[rr]}s` : ', ' + reacPair) : '';
  } else {
    const sz = R_ ?? L_;
    if (sz != null && sz <= 2) { alt = true; t = `Miosis bilateral (${fmt(sz)} mm)` + (rr && same ? ', ' + RW[rr].replace(/a$/, 'a') : ''); }
    else if (sz != null && sz >= 6) { alt = true; t = `Midriasis bilateral${rr && same ? ' ' + RW[rr] : ''} (${fmt(sz)} mm)`; }
    else t = 'Pupilas isocóricas' + (rr && lr ? (same ? ` y ${RW[rr]}s` : ', ' + reacPair) : '') + (sz != null ? `, de ${fmt(sz)} mm` : '');
    if (rr && lr && !same && sz != null && (sz <= 2 || sz >= 6)) t += ', ' + reacPair;
  }
  if (rr != 'r' || lr != 'r') alt = alt || !!(rr || lr);
  const irr = [x.rf == 'i' && 'derecha', x.lf == 'i' && 'izquierda'].filter(Boolean);
  if (irr.length == 2) { t += ', ambas irregulares'; alt = true; } else if (irr.length) { t += `, pupila ${irr[0]} irregular`; alt = true; }
  return { t, aniso, alt };
}
const RO = { r: 0, h: 1, a: 2 };
R.pupils = (f, x, b) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'Pupilas no evaluables' + (x.d ? ' ' + x.d : '') };
  const r = pupText(x); if (!r) return null;
  if (x.ev) return { t: temporal(r.t, x.ev, 'de la alteración pupilar'), alt: true, brk: true };
  const p = b && !empty(b) && b.s != 'ne' ? pupText(b) : null;
  if (p) {
    if (p.aniso && !r.aniso) return { t: `Resolución de la anisocoria previamente documentada. ${r.t}`, alt: true, brk: true };
    if (!p.aniso && r.aniso) r.t = r.t.replace(/^Anisocoria/, 'Nueva anisocoria');
    [['rr', 'derecha'], ['lr', 'izquierda']].forEach(([k, s]) => {
      if (b[k] && x[k] && RO[x[k]] > RO[b[k]]) r.t += `, con ${x[k] == 'a' ? 'pérdida' : 'disminución'} de la reactividad de la pupila ${s} respecto del control previo`;
      if (b[k] && x[k] && RO[x[k]] < RO[b[k]]) r.t += `, con recuperación de la reactividad de la pupila ${s}`;
    });
  }
  return { t: r.t, alt: r.alt };
};

const LIMB = { msd: 'miembro superior derecho', msi: 'miembro superior izquierdo', mid: 'miembro inferior derecho', mii: 'miembro inferior izquierdo' };
function mrcText(x) {
  const K = ['msd', 'msi', 'mid', 'mii'], V = {}; K.forEach(k => (V[k] = pn(x[k])));
  const set = K.filter(k => V[k] != null); if (!set.length) return null;
  const def = set.filter(k => V[k] < 5), g = v => fmt(v) + '/5';
  if (!def.length) return { t: set.length == 4 ? 'Fuerza conservada en los cuatro miembros' : `Fuerza 5/5 en ${list(set.map(k => LIMB[k]))}`, def };
  const eq = ks => ks.every(k => V[k] == V[ks[0]]), has = ks => ks.length == def.length && ks.every(k => def.includes(k));
  const P = (w, v) => (v == 0 ? w.replace('paresia', 'plejía') : `${w} ${g(v)}`);
  let t;
  if (has(['msd', 'mid'])) t = eq(['msd', 'mid']) ? P('Hemiparesia derecha', V.msd) : `Déficit motor derecho, con fuerza ${g(V.msd)} en miembro superior y ${g(V.mid)} en miembro inferior`;
  else if (has(['msi', 'mii'])) t = eq(['msi', 'mii']) ? P('Hemiparesia izquierda', V.msi) : `Déficit motor izquierdo, con fuerza ${g(V.msi)} en miembro superior y ${g(V.mii)} en miembro inferior`;
  else if (has(['mid', 'mii'])) t = eq(['mid', 'mii']) ? P('Paraparesia', V.mid) : `Paraparesia, con fuerza ${g(V.mid)} en miembro inferior derecho y ${g(V.mii)} en el izquierdo`;
  else if (has(['msd', 'msi'])) t = eq(['msd', 'msi']) ? P('Diparesia braquial', V.msd) : `Diparesia braquial, con fuerza ${g(V.msd)} en miembro superior derecho y ${g(V.msi)} en el izquierdo`;
  else if (def.length == 4) t = eq(K) ? P('Tetraparesia', V.msd) : V.msd == V.mid && V.msi == V.mii ? `Tetraparesia, con fuerza ${g(V.msd)} en miembros derechos y ${g(V.msi)} en miembros izquierdos` : V.msd == V.msi && V.mid == V.mii ? `Tetraparesia, con fuerza ${g(V.msd)} en miembros superiores y ${g(V.mid)} en miembros inferiores` : `Tetraparesia, con fuerza ${list(K.map(k => g(V[k]) + ' en ' + LIMB[k]))}`;
  else if (def.length == 1) { const k = def[0]; t = P(`Monoparesia ${k[1] == 's' ? 'braquial' : 'crural'} ${k[2] == 'd' ? 'derecha' : 'izquierda'}`, V[k]); }
  else t = `Fuerza ${list(def.map(k => g(V[k]) + ' en ' + LIMB[k]))}`;
  if (x.dist) t += `, a predominio ${x.dist}`;
  return { t, def, V };
}
R.mrc4 = (f, x, b) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'Examen motor no evaluable' + (x.d ? ' ' + x.d : '') };
  const r = mrcText(x); if (!r) return null;
  const alt = r.def.length > 0;
  if (x.ev) return { t: temporal(r.t, x.ev, 'del déficit motor'), alt: true, brk: true };
  const p = b && !empty(b) && b.s != 'ne' ? mrcText(b) : null;
  if (p && r.V) {
    const ch = Object.keys(LIMB).filter(k => p.V && p.V[k] != null && r.V[k] != null && p.V[k] != r.V[k]);
    if (ch.length) {
      const up = ch.filter(k => r.V[k] > p.V[k]), dn = ch.filter(k => r.V[k] < p.V[k]);
      if (!p.def.length) return { t: `Nuevo hallazgo de ${lf(r.t)}`, alt: true, brk: true };
      if (!r.def.length) return { t: 'Resolución del déficit motor previamente documentado. Fuerza conservada en los cuatro miembros', alt: true, brk: true };
      if (up.length && !dn.length) return { t: ch.length == 1 ? `Mejoría del déficit motor del ${LIMB[ch[0]]}, actualmente ${fmt(r.V[ch[0]])}/5` : `Mejoría del déficit motor, actualmente ${lf(r.t)}`, alt: true, brk: true };
      if (dn.length && !up.length) return { t: ch.length == 1 ? `Empeoramiento del déficit motor del ${LIMB[ch[0]]}, con disminución de la fuerza a ${fmt(r.V[ch[0]])}/5` : `Empeoramiento del déficit motor, actualmente ${lf(r.t)}`, alt: true, brk: true };
      return { t: `${r.t}, con cambios respecto del control previo`, alt: true };
    }
  }
  return { t: r.t, alt };
};

R.motor = (f, x) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'Examen motor detallado no evaluable' + (x.d ? ' ' + x.d : '') };
  const G = x.g || {}, groups = { d: [], i: [], b: [] }; let any = 0;
  MUSCLES.forEach(([k, n, root]) => {
    const d = pn(G[k + '_d']), i = pn(G[k + '_i']);
    if (d != null || i != null) any = 1;
    const it = v => `${n} ${fmt(v)}/5 (${root})`;
    if (d != null && i != null && d < 5 && d == i) groups.b.push(it(d));
    else { if (d != null && d < 5) groups.d.push(it(d)); if (i != null && i < 5) groups.i.push(it(i)); }
  });
  if (!any) return null;
  const parts = [['d', 'derecha'], ['i', 'izquierda'], ['b', 'bilateral']].filter(([k]) => groups[k].length).map(([k, w]) => `Debilidad ${w} de ${list(groups[k])}`);
  let t = parts.length ? parts.map((p, i) => (i ? lf(p) : p)).join(', ') : 'Fuerza conservada en todos los grupos musculares evaluados';
  if (x.d) t += ', ' + x.d;
  const tt = temporal(t, x.ev, 'del déficit motor');
  return tt ? { t: tt, alt: true, brk: true } : { t, alt: parts.length > 0 };
};

const RADJ = { bic: 'bicipital', tri: 'tricipital', est: 'estilorradial', pat: 'patelar', aqu: 'aquílea' };
R.rot = (f, x) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'Reflejos osteotendinosos no evaluables' + (x.d ? ' ' + x.d : '') };
  const V = x.v || {}, keys = REFLEXES.map(r => r[0]), groups = new Map(); let any = 0;
  keys.forEach(k => ['d', 'i'].forEach(s => {
    const v = V[k + '_' + s]; if (v === '' || v == null) return; any = 1; const n = +v; if (n == 2) return;
    const key = (n > 2 ? 'h' : n == 1 ? 'o' : 'a') + n; if (!groups.has(key)) groups.set(key, []); groups.get(key).push([k, s]);
  }));
  if (!any) return null;
  if (!groups.size) return { t: 'ROT conservados y simétricos' };
  const out = [];
  groups.forEach((arr, key) => {
    const n = +key.slice(1), w = key[0] == 'h' ? 'Hiperreflexia' : key[0] == 'o' ? 'Hiporreflexia' : 'Arreflexia', val = n ? ` (${ROT_V[n]})` : '';
    const D = arr.filter(a => a[1] == 'd').map(a => a[0]), I = arr.filter(a => a[1] == 'i').map(a => a[0]);
    const all = s => keys.every(k => s.includes(k)), same = (a, b) => a.length == b.length && a.every(k => b.includes(k));
    if (all(D) && all(I)) return out.push(`${w} generalizada${val}`);
    if (all(D) && !I.length) return out.push(`${w} derecha${val}`);
    if (all(I) && !D.length) return out.push(`${w} izquierda${val}`);
    if (same(D, I) && same(D, ['pat', 'aqu'])) return out.push(`${w} en miembros inferiores${val}`);
    if (same(D, I) && same(D, ['bic', 'tri', 'est'])) return out.push(`${w} en miembros superiores${val}`);
    const B = D.filter(k => I.includes(k)), Do = D.filter(k => !B.includes(k)), Io = I.filter(k => !B.includes(k)), seg = [];
    if (B.length) seg.push(`${list(B.map(k => RADJ[k]))} bilateral`);
    if (Do.length) seg.push(`${list(Do.map(k => RADJ[k]))} derecha`);
    if (Io.length) seg.push(`${list(Io.map(k => RADJ[k]))} izquierda`);
    out.push(`${w} ${list(seg)}${val}`);
  });
  let t = out.map((p, i) => (i ? lf(p) : p)).join(', ');
  const tt = temporal(t, x.ev, 'de la alteración de los reflejos');
  return tt ? { t: tt, alt: true, brk: true } : { t, alt: true };
};

export const PATOL = [['bab_d', 'Babinski derecho'], ['bab_i', 'Babinski izquierdo'], ['hof_d', 'Hoffmann derecho'], ['hof_i', 'Hoffmann izquierdo'], ['clo_d', 'Clonus aquíleo derecho'], ['clo_i', 'Clonus aquíleo izquierdo']];
R.patol = (f, x) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'Reflejos patológicos no evaluables' + (x.d ? ' ' + x.d : '') };
  const on = PATOL.filter(([k]) => x[k]).map(p => p[1]);
  if (!on.length) return x.s == 'n' ? { t: 'Respuesta plantar flexora bilateral, sin Hoffmann ni clonus' } : null;
  const t = list(bilat(on).map((p, i) => (i ? lf(p) : p)));
  const tt = temporal(t, x.ev, 'de los reflejos patológicos');
  return tt ? { t: tt, alt: true, brk: true } : { t, alt: true };
};

const SIDE_M = { d: 'derecho', i: 'izquierdo', b: 'bilateral' }, SIDE_F = { d: 'derecha', i: 'izquierda', b: 'bilateral' };
function sensOne(s) {
  const T = (SENS_T.find(t => t[0] == s.t) || [, 'Hipoestesia'])[1], fem_ = ['hipo', 'anes', 'hiper', 'hialg', 'alod', 'hipop'].includes(s.t || 'hipo');
  const mods = (s.m || []).length && s.m.length < 5 && ['hipo', 'anes', 'hiper'].includes(s.t || 'hipo') ? ' ' + list(s.m.map(m => SENS_M.find(x => x[0] == m)[1])) : '';
  const sm = SIDE_M[s.l] || '', sf = SIDE_F[s.l] || '', de = (s.de || '').trim(), tl = T + mods;
  switch (s.dz) {
    case 'hemi': return ['hipo', 'anes'].includes(s.t || 'hipo') && s.l != 'b' ? `Hemi${lf(T)}${mods} ${sf}`.trim() : `${tl} en hemicuerpo ${sm}`.trim();
    case 'ms': return s.l == 'b' ? `${tl} en ambos miembros superiores` : `${tl} en miembro superior ${sm}`.trim();
    case 'mi': return s.l == 'b' ? `${tl} en ambos miembros inferiores` : `${tl} en miembro inferior ${sm}`.trim();
    case 'derm': return `${tl} en territorio ${de || 'radicular'} ${sm}`.trim();
    case 'nerv': return `${tl} en territorio del nervio ${de} ${sm}`.replace(/\s+/g, ' ').trim();
    case 'nivel': return `${tl} con nivel sensitivo ${de}`.trim();
    case 'guante': return `${tl} en guante${s.l && s.l != 'b' ? ' ' + sm : ''}`;
    case 'calcetin': return `${tl} en calcetín${s.l && s.l != 'b' ? ' ' + sm : ''}`;
    case 'tronco': return `${tl} en tronco${de ? ' ' + de : ''}`;
    case 'cara': return `${tl} facial ${fem_ ? sf : sm}`.trim();
    case 'silla': return `${tl} en silla de montar`;
    default: return `${tl}${de ? ' ' + de : ''}${sf ? ' ' + sf : ''}`;
  }
}
R.sens = (f, x, b) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'Sensibilidad no evaluable' + (x.d ? ' ' + x.d : '') };
  const F = (x.f || []).filter(s => s.t || s.dz);
  if (!F.length) {
    if (x.s != 'n') return null;
    if (b && (b.f || []).length && !x.ev) return { t: 'Resolución del déficit sensitivo previamente documentado. Sensibilidad conservada', alt: true, brk: true };
    return { t: 'Sensibilidad conservada' };
  }
  const t = F.map((s, i) => (i ? lf(sensOne(s)) : sensOne(s))).join(', ') + (x.d ? ', ' + x.d : '');
  if (x.ev) return { t: temporal(t, x.ev, 'del déficit sensitivo'), alt: true, brk: true };
  if (b && b.s == 'n' && !(b.f || []).length) return { t: `Nuevo hallazgo de ${lf(t)}`, alt: true, brk: true };
  return { t, alt: true };
};

const nihTot = x => { if (!x || !x.v) return null; const V = x.v; if (!NIHSS.every(([k]) => V[k] !== '' && V[k] != null)) return null; return NIHSS.reduce((t, [k]) => t + (V[k] == 'NV' ? 0 : +V[k]), 0); };
R.nihss = (f, x, b, c) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'NIHSS no evaluable' + (x.d ? ' ' + x.d : '') };
  const tot = nihTot(x);
  if (tot == null) { const n = NIHSS.filter(([k]) => (x.v || {})[k] !== '' && (x.v || {})[k] != null).length; return n ? { t: `NIHSS incompleto (${n} de 15 ítems evaluados)`, alt: true } : null; }
  let t = `NIHSS ${tot}`;
  if (c.det) { const nz = NIHSS.filter(([k]) => x.v[k] != 0).map(([k]) => `${k} ${x.v[k]}`); if (nz.length) t += ` (${nz.join(', ')})`; }
  const pt = nihTot(b);
  if (!x.ev && pt != null && pt != tot) t += `, con ${tot > pt ? 'aumento' : 'descenso'} de ${Math.abs(tot - pt)} punto${Math.abs(tot - pt) > 1 ? 's' : ''} respecto del control previo (NIHSS ${pt})`;
  else if (!x.ev && pt != null) t += ', sin cambios respecto del control previo';
  const tt = temporal(t, x.ev, 'del puntaje NIHSS');
  return tt ? { t: tt, alt: true, brk: true } : { t, alt: tot > 0 || pt != null };
};

const pair = (o, unit = '') => (o.d == o.i ? `${o.d}${unit} bilateral` : `${o.d}${unit} derecho y ${o.i}${unit} izquierdo`);
R.asia = (f, x, b, c) => {
  if (empty(x)) return null;
  if (x.s == 'ne') return { t: 'Examen ISNCSCI no evaluable' + (x.d ? ' ' + x.d : '') };
  const has = ['m', 'lt', 'pp'].some(k => x[k] && Object.keys(x[k]).length);
  if (!has) return null;
  const r = isncsci(x);
  if (r.ais == 'E') return { t: 'AIS E, con función motora y sensitiva normal en todos los segmentos', alt: false };
  let t = `AIS ${r.ais}, nivel neurológico de la lesión ${r.nli == 'INT' ? 'no determinado (examen sensitivo intacto)' : r.nli}, lesión ${r.ais == 'A' ? 'completa' : 'incompleta'}`;
  t += `. Nivel sensitivo ${pair(r.sl).replace(/INT/g, 'intacto')} y nivel motor ${pair(r.ml).replace(/INT/g, 'intacto')}`;
  const zs = r.zs.d && r.zs.i ? r.zs : null, zm = r.zm.d && r.zm.i ? r.zm : null;
  const pairF = o => (o.d == o.i ? `${o.d} bilateral` : `${o.d} derecha y ${o.i} izquierda`);
  if (r.ais == 'A' && (zs || zm)) t += `. Zona de preservación parcial${zs ? ' sensitiva ' + pairF(zs) : ''}${zs && zm ? ' y' : ''}${zm ? ' motora ' + pairF(zm) : ''}`;
  if (c.det) t += `. Puntaje motor de miembros superiores ${r.uems}/50 y de miembros inferiores ${r.lems}/50; tacto ligero ${r.ltt}/112 y pinchazo ${r.ppt}/112`;
  if (r.nt) t += ' (con ítems no evaluables)';
  if (b && !empty(b) && !x.ev) { const p = isncsci(b); if (p.ais != r.ais) t += `, con cambio de AIS ${p.ais} a ${r.ais} respecto del control previo`; }
  const tt = temporal(t, x.ev, 'del examen neurológico medular');
  return tt ? { t: tt, alt: true, brk: true } : { t, alt: true };
};

R.vitals = (f, x) => {
  if (empty(x)) return null;
  const first = [], alt = [], nor = []; let isAlt = false;
  const T = pn(x.t);
  if (T != null) { const s = `T ${fmt(x.t, 1)} °C`; if (T >= 38) { first.push(`Febril (${s})`); isAlt = true; } else if (T >= 37.5) { first.push(`Subfebril (${s})`); isAlt = true; } else if (T < 35) { first.push(`Hipotermia (${s})`); isAlt = true; } else first.push(`Afebril (${s})`); }
  else if (x.afe) first.push('Afebril');
  if (x.hd == 'e') first.push('hemodinámicamente estable'); if (x.hd == 'i') { first.push('hemodinámicamente inestable'); isAlt = true; }
  const S = pn(x.pas), D = pn(x.pad);
  if (S != null && D != null) {
    let s = `PA ${S}/${D} mmHg`; if (x.pam) s += ` (PAM ${Math.round((S + 2 * D) / 3)} mmHg)`;
    if (S >= 140 || D >= 90) alt.push(`hipertenso (${s})`); else if (S < 90) alt.push(`hipotenso (${s})`); else nor.push(s);
  }
  const FC = pn(x.fc);
  if (FC != null) { const s = `FC ${FC} lpm${x.rit == 'i' ? ', irregular' : ''}`; if (FC > 100) alt.push(`taquicárdico (${s})`); else if (FC < 60) alt.push(`bradicárdico (${s})`); else (x.rit == 'i' ? alt : nor).push(s); }
  const FR = pn(x.fr);
  if (FR != null) { const s = `FR ${FR} rpm`; if (FR > 20) alt.push(`taquipneico (${s})`); else if (FR < 12) alt.push(`bradipneico (${s})`); else nor.push(s); }
  const SA = pn(x.sat);
  if (SA != null) { const o = (O2.find(o => o[0] == (x.o2 || 'aa')) || O2[0])[1]; const s = `SatO₂ ${SA}% ${o}${x.o2 && x.o2 != 'aa' && x.o2v ? ' ' + x.o2v.trim() : ''}`; (SA < 92 ? alt : nor).push(s); }
  const GL = pn(x.glu);
  if (GL != null) (GL > 180 || GL < 70 ? alt : nor).push(`glucemia ${GL} mg/dL`);
  if (alt.length || first.some(p => /Febril|Subfebril|Hipotermia|inestable/.test(p))) isAlt = true;
  const all = [...first, ...alt, ...nor]; if (!all.length) return null;
  return { t: all.map((p, i) => (i ? lf(p) : p)).join(', '), alt: isAlt };
};

R.lab = (f, x, b, c) => {
  if (empty(x)) return null;
  const V = x.v || {}, out = []; let isAlt = false;
  LAB.forEach(([k, l, u, lo, hi, dec, th]) => {
    const n = pn(V[k]); if (n == null) return;
    let [mn, mx] = [lo, hi]; if (k == 'hb' && c.sex != 'f') [mn, mx] = [13, 17];
    const flag = n > mx ? '↑' : n < mn ? '↓' : ''; if (flag) isAlt = true;
    const val = th ? Math.round(n).toLocaleString('es-AR', { useGrouping: true }) : fmt(V[k], Math.min(dec, (String(V[k]).replace(',', '.').split('.')[1] || '').length || 0));
    const unit = !u ? '' : /^[/%]/.test(u) ? u : ' ' + u;
    out.push(`${l} ${val}${unit}${c.lf && flag ? ' ' + flag : ''}`);
  });
  (x.ex || []).filter(e => e.n && e.v).forEach(e => out.push(`${e.n} ${fmt(e.v)}${e.u ? ' ' + e.u : ''}`));
  if (x.otros) out.push(x.otros.trim());
  if (!out.length) return null;
  return { t: 'Laboratorio: ' + out.join(', '), alt: isAlt };
};

const devSite = k => (DEV_SITE.find(s => s[0] == k) || [, ''])[1];
function devOne(d) {
  const [g, props] = DEVICES[d.ty] || ['m', 'pedcs'], A = (m, f) => (g == 'f' ? f : m);
  let name = d.nom || d.ty;
  if (d.lado) name += ' ' + (d.lado == 'd' ? A('derecho', 'derecha') : d.lado == 'i' ? A('izquierdo', 'izquierda') : 'bilateral');
  if (d.loc) name += ' ' + d.loc.trim();
  const parts = [name + (d.perm == 'p' ? ' permeable' : d.perm == 'n' ? ' no permeable' : '')];
  const est = d.est ? (d.ty == 'SNG' ? d.est : A(d.est, d.est.replace(/o$/, 'a'))) : '';
  if (est || d.niv) parts.push([est, d.niv ? `a ${fmt(d.niv)} cmH₂O` : ''].filter(Boolean).join(' '));
  if (d.pic) parts.push(`con PIC de ${fmt(d.pic)} mmHg`);
  const unit = d.du || (d.ty == 'DVE' || d.ty == 'Drenaje lumbar' ? 'mL/h' : 'mL/24 h');
  const what = d.ty == 'Sonda vesical' ? 'diuresis' : 'débito';
  if (d.deb) parts.push(`con ${what} de ${fmt(d.deb)} ${unit}${d.car ? ' de aspecto ' + d.car : ''}`);
  else if (d.car) parts.push(`con ${what} de aspecto ${d.car}`);
  const n = daysSince(d.fe); if (n != null && n >= 0) parts.push(`día ${n} de colocación`);
  const s1 = parts.join(', ');
  return d.sit ? `${s1}. Sitio de inserción ${devSite(d.sit)}` : s1;
}
R.dev = (f, x) => {
  if (empty(x)) return null;
  const L = (x.list || []).filter(d => d.ty);
  if (!L.length) return x.s == 'n' ? { t: 'Sin dispositivos invasivos' } : null;
  const alt = L.some(d => d.perm == 'n' || ['eri', 'sec', 'inf'].includes(d.sit) || /purulento|turbio|hemático|fecaloide/.test(d.car || ''));
  return { t: L.map(devOne).join('. '), alt };
};

/* =========================================================================
   Campos simples
   ========================================================================= */
function simple(f, x, b) {
  if (!x || x.v === '' || x.v == null) return null;
  if (f.k == 'text') return { t: f.p.replace('{v}', String(x.v).trim().replace(/\.$/, '')), alt: true };
  if (f.k == 'num') return { t: f.p.replace('{v}', fmt(x.v)), alt: true };
  if (f.k == 'scale') {
    const S = scaleDef(f); if (!S) return null;
    let t = S.p.replace('{v}', x.v);
    if (b && b.v && b.v != x.v) t += ` (control previo ${S.p.replace('{v}', b.v).replace(/^[^ ]+ /, '')})`;
    return { t, alt: !['0', 'E'].includes(String(x.v)) || f.s == 'rass' && x.v != '0' };
  }
  return null;
}

/* =========================================================================
   Armado del texto
   ========================================================================= */
export function renderField(f, x, b, c) {
  if (!f.k) return generic(f, x, b);
  if (R[f.k]) return R[f.k](f, x || {}, b, c);
  return simple(f, x, b);
}
export const activeSecs = (T, st) => T.secs.filter(s => (st.on && s.id in st.on ? st.on[s.id] : !s.off));

// Une oraciones normales del tipo «X conservado»: «Sensibilidad y lenguaje conservados»
function mergeConserved(units) {
  const out = [], RX = /^(.+?) conservad([oa])s?$/;
  for (const u of units) {
    const m0 = !u.alt && RX.exec(u.t), m = m0 && m0[1].split(' ').length <= 3 && !/[,;]/.test(m0[1]) ? m0 : null, p = out[out.length - 1];
    if (m && p && p.cm && p.cm.length < 3) { p.cm.push([m[1], m[2]]); continue; }
    out.push(m ? { ...u, cm: [[m[1], m[2]]] } : u);
  }
  return out.map(u => {
    if (!u.cm || u.cm.length < 2) return u;
    const allF = u.cm.every(c => c[1] == 'a');
    return { ...u, t: list(u.cm.map((c, i) => (i ? lf(c[0]) : c[0]))) + ' conservad' + (allF ? 'as' : 'os') };
  });
}

const ANCHOR = ['conc', 'gcs', 'orient', 'vitals'];
// c: { x, base, sex, out ('c' corrido | 's' por apartados), det, lf, nochg }
export function compose(T, c) {
  const X = c.x || {}, B = c.base || null, secs = activeSecs(T, c);
  c = { ...c, hasGcs: T.secs.some(s => s.f.some(f => f.k == 'gcs')) };
  // «Todos sin alteraciones» con frase resumen (por ejemplo, pares craneales)
  if (T.allN) {
    const fs = secs.flatMap(s => s.f);
    if (fs.length && fs.every(f => !f.k && (!f.n || (X[f.id] || {}).s == 'n'))) return finish([T.allN], c);
  }
  const blocks = [];
  secs.forEach(s => {
    const units = []; let cur = null;
    s.f.forEach((f, i) => {
      const r = renderField(f, X[f.id], B && B[f.id], c); if (!r || !r.t) return;
      const fr = { ...r, f };
      if (f.j && cur && !r.brk) { cur.frags.push(fr); cur.alt = cur.alt || r.alt; }
      else { cur = { frags: [fr], alt: !!r.alt, anchor: ANCHOR.includes(f.k) || f.pri <= 2, i }; units.push(cur); }
    });
    units.forEach(u => (u.t = u.frags.map((fr, i) => (i ? (fr.f.j || ', ') + lf(fr.t) : fr.t)).join('')));
    // conciencia y signos vitales primero, después lo patológico, después lo normal
    const ord = [...units.filter(u => u.anchor), ...units.filter(u => !u.anchor && u.alt), ...units.filter(u => !u.anchor && !u.alt)];
    // los reflejos patológicos se integran al déficit motor o a los ROT alterados: «Hemiparesia derecha 3/5 con Babinski derecho»
    for (let i = ord.length - 1; i > 0; i--) {
      const u = ord[i], p = ord[i - 1], pf = p.frags[p.frags.length - 1].f;
      if (u.frags.length == 1 && u.frags[0].f.k == 'patol' && u.alt && p.alt && ['mrc4', 'rot', 'motor'].includes(pf.k)) { p.t += ' con ' + lf(u.t); ord.splice(i, 1); }
    }
    const sentences = (c.out == 's' ? units : mergeConserved(ord)).map(u => u.t);
    if (sentences.length) blocks.push({ h: s.h, t: para(sentences) });
  });
  if (!blocks.length) return '';
  if (c.out == 's') return finish(blocks.map(b => `${b.h}: ${b.t}`), c, true);
  return finish(blocks.map(b => b.t), c, true);
}
function finish(lines, c, already) {
  let txt = (already ? lines : [para(lines)]).join('\n');
  if (c.nochg) txt += '\nSin otros cambios respecto de la evolución previa.';
  if (c.out != 's') txt = scrubLabels(txt);
  if (c.sex == 'f') txt = fem(txt);
  return txt;
}

// Revisión final: ninguna oración puede empezar con «Etiqueta:» (salvo «Laboratorio:»)
export function scrubLabels(t) {
  return t.replace(/(^|[.]\s+|\n)([A-ZÁÉÍÓÚ][A-Za-zÁÉÍÓÚáéíóúñ ]{2,30}):\s+(\S)/g, (m, a, lab, nx) => (/^Laboratorio$/.test(lab) ? m : a + nx.toUpperCase()));
}

/* =========================================================================
   Valores «normales» por componente (para «Sin alteraciones»)
   ========================================================================= */
export function normalOf(f, cur) {
  switch (f.k) {
    case undefined: return f.n ? { s: 'n' } : cur;
    case 'conc': return { v: 'Vigil', m: [] };
    case 'orient': return { t: 'c', e: 'c', p: 'c' };
    case 'gcs': return { o: 4, v: 5, m: 6 };
    case 'pupils': return { rd: '3', ld: '3', rf: 'r', lf: 'r', rr: 'r', lr: 'r' };
    case 'mrc4': return { msd: '5', msi: '5', mid: '5', mii: '5' };
    case 'motor': return { g: Object.fromEntries(MUSCLES.flatMap(([k]) => [[k + '_d', '5'], [k + '_i', '5']])) };
    case 'rot': return { v: Object.fromEntries(REFLEXES.flatMap(([k]) => [[k + '_d', '2'], [k + '_i', '2']])) };
    case 'patol': return { s: 'n' };
    case 'sens': return { s: 'n', f: [] };
    case 'nihss': return { v: Object.fromEntries(NIHSS.map(([k]) => [k, '0'])) };
    case 'asia': return { m: Object.fromEntries(KEYM.flatMap(([k]) => [[k + 'd', '5'], [k + 'i', '5']])), lt: Object.fromEntries(DERM.flatMap(d => [[d + 'd', '2'], [d + 'i', '2']])), pp: Object.fromEntries(DERM.flatMap(d => [[d + 'd', '2'], [d + 'i', '2']])), vac: 'si', dap: 'si' };
    case 'vitals': return Object.assign({}, cur, { afe: cur && pn(cur.t) != null ? cur.afe : 1, hd: 'e' });
    default: return cur;
  }
}
export const isSet = (f, x) => (!f.k ? !!(x && x.s) : !empty(x) && !(x.v === '' && Object.keys(x).length == 1));
