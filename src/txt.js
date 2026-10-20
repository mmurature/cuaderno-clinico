// Utilidades de redacción compartidas por evoluciones y partes quirúrgicos.

// Palabras que conservan la mayúscula aunque queden en medio de una oración
const KEEP = /^(Glasgow|Babinski|Hoffmann?|Kernig|Brudzinski|Las[eè]gue|Spurling|Lhermitte|Romberg|Godet|Hunt|Fisher|Marshall|Rankin|Ashworth|Frankel|Nurick|Todd|Cushing|Bell|Barré|Mingazzini|Hasson|Parkinson|Wernicke|Broca|Trendelenburg|Mayfield|Simpson|Valsalva|Hb|Hto|Na|K|Cl|Ca|Mg|Anatomía Patológica)/;
export const cap = s => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
export const lf = s => {
  if (!s) return s;
  if (KEEP.test(s)) return s;
  const w = s.split(/[\s,]/)[0];
  if (w.length > 1 && (/[A-ZÁÉÍÓÚ0-9₂]/.test(w.charAt(1)) || /^[A-Z]{2,}/.test(w))) return s; // siglas: DVE, PA, SatO₂, NIHSS, TC
  return s.charAt(0).toLowerCase() + s.slice(1);
};
// «a, b y c»
export const list = a => (a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' y ' + a[a.length - 1]);

// Une pares lateralizados: «Babinski derecho» + «Babinski izquierdo» → «Babinski bilateral»
const SIDE = /^(.*?)\s+(derech|izquierd)(o|a|os|as)$/i;
export function bilat(ph) {
  const out = [...ph];
  for (let i = 0; i < out.length; i++) {
    const m = SIDE.exec(out[i]); if (!m || /^(hemi|marcha hemi|desviaci)/i.test(m[1])) continue;
    const other = m[2].toLowerCase().startsWith('derech') ? 'izquierd' : 'derech';
    const j = out.findIndex((p, k) => { if (k == i) return false; const n = SIDE.exec(p); return n && n[1].toLowerCase() == m[1].toLowerCase() && n[2].toLowerCase() == other && n[3] == m[3]; });
    if (j >= 0) { out[i] = m[1] + (m[3].endsWith('s') ? ' bilaterales' : ' bilateral'); out.splice(j, 1); }
  }
  return out;
}

// Números escritos a mano («38.5» o «38,5») → número
export const pn = v => { if (v === '' || v == null) return null; const n = parseFloat(String(v).replace(',', '.')); return isNaN(n) ? null : n; };
export const fmt = (v, dec) => {
  const n = pn(v); if (n == null) return String(v ?? '');
  const d = dec ?? (String(v).replace(',', '.').split('.')[1] || '').length;
  return n.toLocaleString('es-AR', { minimumFractionDigits: d, maximumFractionDigits: d });
};
export const daysSince = d => { if (!d) return null; const a = new Date(d + 'T12:00:00'), b = new Date(); b.setHours(12, 0, 0, 0); return Math.round((b - a) / 864e5); };

// Concordancia femenina para «paciente femenina» (solo palabras de la lista)
const FEM = {
  'lúcido': 'lúcida', 'orientado': 'orientada', 'desorientado': 'desorientada', 'somnoliento': 'somnolienta', 'obnubilado': 'obnubilada',
  'estuporoso': 'estuporosa', 'comatoso': 'comatosa', 'agitado': 'agitada', 'confuso': 'confusa', 'colaborador': 'colaboradora',
  'eupneico': 'eupneica', 'taquipneico': 'taquipneica', 'bradipneico': 'bradipneica', 'apneico': 'apneica', 'hipertenso': 'hipertensa',
  'hipotenso': 'hipotensa', 'taquicárdico': 'taquicárdica', 'bradicárdico': 'bradicárdica', 'normohidratado': 'normohidratada',
  'deshidratado': 'deshidratada', 'pálido': 'pálida', 'ictérico': 'ictérica', 'cianótico': 'cianótica', 'diaforético': 'diaforética',
  'sedado': 'sedada', 'intubado': 'intubada', 'extubado': 'extubada', 'atento': 'atenta', 'inatento': 'inatenta', 'despierto': 'despierta',
  'adormecido': 'adormecida', 'asintomático': 'asintomática', 'subfebril': 'subfebril', 'cooperador': 'cooperadora', 'cooperativo': 'cooperativa',
  'conectado': 'conectada', 'desconectado': 'desconectada', 'reactivo': 'reactiva', 'arreactivo': 'arreactiva', 'apático': 'apática', 'abúlico': 'abúlica',
  'eutímico': 'eutímica', 'ansioso': 'ansiosa', 'deprimido': 'deprimida', 'irritable': 'irritable', 'postrado': 'postrada', 'afásico': 'afásica', 'disártrico': 'disártrica'
};
export function fem(t) {
  return t.replace(/[A-Za-zÁÉÍÓÚáéíóúñÑ]+/g, w => { const l = w.toLowerCase(), f = FEM[l]; if (!f) return w; return w[0] == w[0].toUpperCase() ? cap(f) : f; });
}

// Oraciones → párrafo con mayúscula inicial y punto final
export const para = ss => ss.filter(Boolean).map(s => cap(s.trim()).replace(/[.\s]+$/, '')).filter(Boolean).map(s => s + '.').join(' ');
