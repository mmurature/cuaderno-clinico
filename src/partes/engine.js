// Motor de partes quirúrgicos: plantilla + selecciones → parte narrativo.
// Reglas: solo se escribe lo confirmado; un campo vacío es «no documentado» y nunca se convierte en negativo;
// los pasos sugeridos se escriben solo si se confirmaron y en el orden de la lista; los críticos quedan pendientes.
import { cap, lf, list, para } from '../txt.js';

export const SECS = [['A', 'Identificación del acto quirúrgico'], ['B', 'Preparación y abordaje'], ['C', 'Hallazgos intraoperatorios'], ['D', 'Descripción técnica'], ['E', 'Material y dispositivos'], ['F', 'Pieza quirúrgica y muestras'], ['G', 'Hemostasia, cierre y finalización'], ['H', 'Postoperatorio inmediato']];

const POS = [['Decúbito dorsal', 'Paciente en decúbito dorsal'], ['Decúbito ventral', 'Paciente en decúbito ventral'], ['Decúbito lateral derecho', 'Paciente en decúbito lateral derecho'], ['Decúbito lateral izquierdo', 'Paciente en decúbito lateral izquierdo'], ['Litotomía', 'Paciente en posición de litotomía'], ['Trendelenburg', 'Paciente en decúbito dorsal en Trendelenburg'], ['Anti-Trendelenburg', 'Paciente en decúbito dorsal en anti-Trendelenburg'], ['Semisentado', 'Paciente en posición semisentada'], ['Sentado', 'Paciente en posición sentada']];

// Campos comunes a todos los partes (las plantillas pueden reemplazarlos con el mismo id)
export const COMMON = [
  { id: 'proc', l: 'Procedimiento realizado', sec: 'A', k: 'text', hdr: 'Procedimiento' },
  { id: 'dxpre', l: 'Diagnóstico preoperatorio', sec: 'A', k: 'text', hdr: 'Diagnóstico preoperatorio' },
  { id: 'dxpos', l: 'Diagnóstico postoperatorio', sec: 'A', k: 'text', hdr: 'Diagnóstico postoperatorio' },
  { id: 'fecha', l: 'Fecha', sec: 'A', k: 'date', hdr: 'Fecha' },
  { id: 'hora', l: 'Hora', sec: 'A', k: 'text', hdr: 'Hora', ph: '08:30 a 10:15' },
  { id: 'serv', l: 'Servicio / especialidad', sec: 'A', k: 'text', hdr: 'Servicio' },
  { id: 'cir', l: 'Cirujano/a principal', sec: 'A', k: 'text', hdr: 'Cirujano/a' },
  { id: 'ayu', l: 'Ayudantes', sec: 'A', k: 'text', hdr: 'Ayudantes' },
  { id: 'anest', l: 'Anestesiólogo/a', sec: 'A', k: 'text', hdr: 'Anestesiólogo/a' },
  { id: 'tanest', l: 'Tipo de anestesia', sec: 'A', k: 'opt', hdr: 'Anestesia', o: [['General balanceada', 'general balanceada'], ['General endovenosa total', 'general endovenosa total'], ['Raquídea', 'raquídea'], ['Peridural', 'peridural'], ['Combinada raquiperidural', 'combinada raquiperidural'], ['Bloqueo regional', 'bloqueo regional'], ['Local', 'local'], ['Local con sedación', 'local con sedación'], ['Sedación', 'sedación']] },
  { id: 'urg', l: 'Programada o urgencia', sec: 'A', k: 'opt', hdr: 'Carácter', o: [['Programada', 'cirugía programada'], ['Urgencia', 'cirugía de urgencia']] },
  { id: 'prim', l: 'Primaria o reintervención', sec: 'A', k: 'opt', hdr: 'Tipo', o: [['Cirugía primaria', 'cirugía primaria'], ['Reintervención', 'reintervención']] },
  { id: 'lat', l: 'Lateralidad', sec: 'A', k: 'opt', hdr: 'Lateralidad', onlyLat: 1, o: [['Derecha', 'derecha'], ['Izquierda', 'izquierda'], ['Bilateral', 'bilateral']] },
  { id: 'pos', l: 'Posición del paciente', sec: 'B', k: 'opt', o: POS },
  { id: 'asep', l: 'Antisepsia y campos', sec: 'B', k: 'yn', y: 'Antisepsia de piel y colocación de campos estériles', n: '' },
  { id: 'atb', l: 'Profilaxis antibiótica', sec: 'B', k: 'text', p: 'Profilaxis antibiótica con {v}', ph: 'cefazolina 2 g EV' },
  { id: 'tep', l: 'Profilaxis tromboembólica', sec: 'B', k: 'text', p: 'Profilaxis tromboembólica con {v}', ph: 'medias de compresión neumática' },
  { id: 'abord', l: 'Abordaje / incisión', sec: 'B', k: 'text', p: '{v}', ph: 'Laparotomía mediana supraumbilical' },
  { id: 'hall', l: 'Otros hallazgos', sec: 'C', k: 'text', p: '{v}', ph: 'Hallazgo incidental de divertículo de Meckel' },
  { id: 'dific', l: 'Dificultades técnicas', sec: 'D', k: 'text', p: 'Se presentan dificultades técnicas por {v}', ph: 'adherencias firmes' },
  { id: 'estr', l: 'Cambio de estrategia', sec: 'D', k: 'text', p: 'Se modifica la estrategia quirúrgica: {v}'.replace(': ', ' por '), ph: 'hallazgo de…' },
  { id: 'conv', l: 'Conversión de abordaje', sec: 'D', k: 'yn', y: 'Se convierte a cirugía abierta', n: 'Se completa el procedimiento sin conversión' },
  { id: 'convm', l: 'Motivo de la conversión', sec: 'D', k: 'text', p: 'La conversión se debe a {v}', if: ['conv', 'si'] },
  { id: 'mat', l: 'Otro material utilizado', sec: 'E', k: 'text', p: 'Se utiliza {v}', ph: 'matriz hemostática' },
  { id: 'pieza', l: 'Pieza quirúrgica', sec: 'F', k: 'opt', o: [['Se obtiene', 'Se obtiene pieza quirúrgica'], ['No se obtiene', 'No se obtiene pieza quirúrgica']] },
  { id: 'pdesc', l: 'Descripción e identificación de la pieza', sec: 'F', k: 'text', p: '{v}', if: ['pieza', 'Se obtiene'], ph: 'Pieza de 8 cm, orientada con hilo en borde superior' },
  { id: 'ap', l: 'Envío a Anatomía Patológica', sec: 'F', k: 'yn', y: 'Se envía pieza a Anatomía Patológica', n: 'No se envía pieza a Anatomía Patológica', if: ['pieza', 'Se obtiene'], req: 1 },
  { id: 'micro', l: 'Envío a microbiología', sec: 'F', k: 'yn', y: 'Se envía material a microbiología', n: '' },
  { id: 'nmu', l: 'Número de muestras', sec: 'F', k: 'num', p: 'Se obtienen {v} muestras' },
  { id: 'hemo', l: 'Hemostasia', sec: 'G', k: 'yn', y: 'Se constata hemostasia', n: 'No se logra hemostasia completa', req: 1 },
  { id: 'hmet', l: 'Método hemostático', sec: 'G', k: 'text', p: 'Hemostasia con {v}', ph: 'electrocauterio bipolar y material hemostático' },
  { id: 'irrig', l: 'Irrigación y aspiración', sec: 'G', k: 'yn', y: 'Se realiza irrigación y aspiración', n: '' },
  { id: 'dren', l: 'Drenaje', sec: 'G', k: 'yn', y: 'Se coloca drenaje', n: 'No se coloca drenaje', req: 1 },
  { id: 'dtipo', l: 'Tipo y ubicación del drenaje', sec: 'G', k: 'text', p: 'Se coloca drenaje {v}', if: ['dren', 'si'], ph: 'tipo Blake en lecho quirúrgico, exteriorizado por contraabertura' },
  { id: 'cierre', l: 'Cierre por planos', sec: 'G', k: 'text', p: '{v}', ph: 'Cierre de aponeurosis con sutura continua de material reabsorbible' },
  { id: 'piel', l: 'Cierre cutáneo', sec: 'G', k: 'opt', p: 'Cierre de piel con {v}', o: [['Intradérmica', 'sutura intradérmica'], ['Puntos separados', 'puntos separados'], ['Agrafes', 'agrafes'], ['Adhesivo tisular', 'adhesivo tisular']] },
  { id: 'cur', l: 'Curación', sec: 'G', k: 'yn', y: 'Se realiza curación con apósito estéril', n: '' },
  { id: 'rec', l: 'Recuento de gasas e instrumental', sec: 'G', k: 'opt', req: 1, o: [['Completo', 'Recuento de gasas e instrumental completo'], ['Incompleto', 'Recuento de gasas e instrumental incompleto: {d}'.replace(': ', ', ')]], ph: 'qué faltó y conducta' },
  { id: 'compl', l: 'Complicaciones intraoperatorias', sec: 'G', k: 'opt', req: 1, o: [['Sin complicaciones', 'Sin complicaciones intraoperatorias'], ['Con complicaciones', 'Se registran complicaciones intraoperatorias']] },
  { id: 'cdesc', l: 'Descripción de las complicaciones', sec: 'G', k: 'text', p: '{v}', if: ['compl', 'Con complicaciones'], req: 1 },
  { id: 'dest', l: 'Destino del paciente', sec: 'H', k: 'opt', p: 'Pasa a {v}', o: [['Sala general', 'sala general'], ['Terapia intensiva', 'la unidad de terapia intensiva'], ['Unidad coronaria', 'la unidad coronaria'], ['Recuperación anestésica', 'recuperación anestésica'], ['Alta ambulatoria', 'recuperación para alta ambulatoria']] },
  { id: 'efin', l: 'Estado al finalizar', sec: 'H', k: 'text', p: 'Al finalizar el procedimiento, {v}', ph: 'hemodinámicamente estable, extubado en quirófano' },
  { id: 'disp', l: 'Dispositivos que quedan colocados', sec: 'H', k: 'text', p: 'Queda con {v}', ph: 'sonda vesical y drenaje subgaleal' },
  { id: 'ind', l: 'Indicaciones postoperatorias documentadas', sec: 'H', k: 'text', p: '{v}' },
  { id: 'obs', l: 'Observaciones', sec: 'H', k: 'text', p: '{v}' }
];
export const REQ_COMMON = ['hemo', 'dren', 'rec', 'compl'];

// Plantilla efectiva: campos comunes + específicos (los del mismo id reemplazan al común)
export function resolve(T) {
  const own = new Map((T.f || []).map(f => [f.id, f]));
  const out = [];
  SECS.forEach(([s]) => {
    COMMON.filter(f => f.sec == s).forEach(c => {
      if (c.onlyLat && !T.lat) return;
      if (own.has(c.id)) { out.push({ ...c, ...own.get(c.id), hdr: c.hdr }); own.delete(c.id); }
      else out.push({ ...c, ...(c.id == 'lat' && T.lat ? { req: 1 } : {}) });
    });
  });
  // los específicos van antes de los comunes de cada sección (salvo en A)
  const spec = [...own.values()];
  return SECS.flatMap(([s]) => {
    const com = out.filter(f => f.sec == s), sp = spec.filter(f => f.sec == s);
    if (s == 'A') return [...com, ...sp];
    if (s == 'G') return [...sp, ...com];
    // en B: posición y antisepsia primero, después lo específico, después el resto
    if (s == 'B') { const first = com.filter(f => ['pos', 'asep', 'atb', 'tep'].includes(f.id)); return [...first, ...sp, ...com.filter(f => !first.includes(f))]; }
    return [...sp, ...com];
  }).filter(f => !(T.hide || []).includes(f.id));
}

/* ---------- valores ---------- */
const optOf = (f, label) => (f.o || []).find(o => o[0] == label);
export function visible(f, x) {
  if (!f.if) return true;
  const v = x[f.if[0]];
  return Array.isArray(v) ? v.includes(f.if[1]) : v == f.if[1];
}
// Fragmento del valor (sin envoltorio): se usa dentro de los pasos
export function frag(f, x) {
  const v = x[f.id]; if (v === '' || v == null || (Array.isArray(v) && !v.length)) return null;
  const d = (x[f.id + '_d'] || '').trim(), D = s => s.replace(/\{d\}/g, d || '…');
  if (f.k == 'opt') { const o = optOf(f, v); return o ? D(o[1]) : null; }
  if (f.k == 'multi') { const ps = v.map(l => optOf(f, l)).filter(Boolean).map(o => D(o[1])); return ps.length ? list(ps.map((p, i) => (i ? lf(p) : p))) : null; }
  if (f.k == 'yn') return v == 'si' ? D(f.y || '') : v == 'no' ? D(f.n || '') : null;
  if (f.k == 'date') return new Date(v + 'T12:00:00').toLocaleDateString('es-AR');
  return String(v).trim();
}
export function sentence(f, x) {
  const fr = frag(f, x); if (!fr) return null;
  if (f.k == 'yn') return fr;
  return f.p ? f.p.replace('{v}', f.k == 'opt' || f.k == 'multi' ? lf(fr) : fr) : fr;
}
export const isFilled = (f, x) => { const v = x[f.id]; return !(v === '' || v == null || (Array.isArray(v) && !v.length)); };

/* ---------- pasos ---------- */
const refs = t => (t.match(/\{(\w+)\}/g) || []).map(m => m.slice(1, -1));
export function stepText(st, F, x) {
  let miss = [];
  const t = st.t.replace(/\{(\w+)\}/g, (m, k) => { const f = F.find(f => f.id == k); const v = f && visible(f, x) ? frag(f, x) : null; if (!v) { miss.push(f ? f.l : k); return '[' + (f ? f.l.toLowerCase() : k) + ']'; } return f.k == 'opt' || f.k == 'multi' ? lf(v) : v; });
  return { t, miss };
}

/* ---------- validación ---------- */
export function check(T, P) {
  const F = resolve(T), x = P.x || {}, na = P.na || {}, pend = [], contra = [], warn = [];
  const cited = new Set((P.steps || []).flatMap(s => refs(s.t)));
  F.forEach(f => {
    if (!visible(f, x) || na[f.id]) return;
    const req = f.req || (REQ_COMMON.includes(f.id) && !T.noReq?.includes(f.id));
    if (req && !isFilled(f, x)) pend.push(f.l);
    if (f.k == 'multi' && Array.isArray(x[f.id]) && x[f.id].length > 1 && x[f.id].some(l => /^(sin|no|ausencia)\b/i.test(l))) contra.push(`«${f.l}»: hay una opción negativa marcada junto con hallazgos`);
    if (cited.has(f.id) && isFilled(f, x) && !(P.steps || []).some(s => s.on && refs(s.t).includes(f.id))) warn.push(`«${f.l}» solo se escribe dentro de un paso que todavía no confirmaste`);
  });
  const filled = id => isFilled(F.find(f => f.id == id) || { id }, x);
  if (x.compl == 'Sin complicaciones' && (x.cdesc || '').trim()) contra.push('Marcaste «sin complicaciones» y también describiste complicaciones');
  if (x.dren == 'no' && filled('dtipo')) contra.push('Marcaste que no se colocó drenaje pero completaste el tipo de drenaje');
  if (x.pieza == 'No se obtiene' && (x.ap == 'si' || filled('pdesc'))) contra.push('Marcaste que no se obtuvo pieza pero hay datos de la pieza o del envío a Anatomía Patológica');
  if (x.conv == 'no' && filled('convm')) contra.push('Marcaste que no hubo conversión pero completaste el motivo');
  (P.steps || []).filter(s => s.on).forEach(s => { const r = stepText(s, F, x); if (r.miss.length) pend.push(`Paso «${r.t.slice(0, 50)}…»: falta ${list(r.miss.map(m => m.toLowerCase()))}`); });
  if (!(P.steps || []).some(s => s.on)) warn.push('Todavía no confirmaste ningún paso de la técnica');
  return { pend, contra, warn };
}

/* ---------- texto ---------- */
export function generate(T, P) {
  const F = resolve(T), x = P.x || {}, na = P.na || {};
  const use = f => visible(f, x) && !na[f.id];
  const cited = new Set((P.steps || []).filter(s => s.on).flatMap(s => refs(s.t)));
  const S = s => F.filter(f => f.sec == s && use(f) && !cited.has(f.id));
  const header = F.filter(f => f.sec == 'A' && use(f)).map(f => { const v = frag(f, x); return v ? `${f.hdr || f.l}: ${f.k == 'opt' ? cap(v) : v}` : null; }).filter(Boolean);
  const sentences = s => S(s).map(f => {
    if (f.id == 'dren' && x.dren == 'si' && use(F.find(g => g.id == 'dtipo') || {}) && isFilled(F.find(g => g.id == 'dtipo') || { id: 'dtipo' }, x)) return null;
    return sentence(f, x);
  }).filter(Boolean);
  const steps = (P.steps || []).filter(s => s.on).map(s => stepText(s, F, x).t);
  // los hallazgos se insertan después de la exploración o la apertura (si hay un paso así), para respetar la cronología
  let at = -1; steps.forEach((t, i) => { if (i < Math.max(2, steps.length * 0.6) && /explora|apertura dural|durotom|se accede|se expone|se identifica/i.test(t)) at = i; });
  const C = sentences('C'), Fs = sentences('F');
  // «Se obtiene pieza quirúrgica» sobra si otro campo ya describe la pieza
  const Fx = Fs.length > 1 ? Fs.filter(t => t != 'Se obtiene pieza quirúrgica') : Fs;
  const tech = at >= 0 ? [...steps.slice(0, at + 1), ...C, ...steps.slice(at + 1)] : [...C, ...steps];
  const body = [...sentences('B'), ...tech, ...sentences('D'), ...sentences('E'), ...Fx, ...sentences('G')];
  const post = sentences('H');
  const out = [];
  if (header.length) out.push(header.join('\n'));
  if (body.length) out.push('Descripción del procedimiento\n' + para(body));
  if (post.length) out.push(para(post));
  return out.join('\n\n');
}
