// Modelo de datos, plantillas y utilidades puras (sin DOM).

export const ST = ['Por ver', 'En estudio', 'Dominada'];
export const IV = [1, 3, 14]; // días hasta el próximo repaso de una ficha según su estado

export const PF = [['def', 'Definición'], ['eti', 'Etiología'], ['epi', 'Epidemiología'], ['fis', 'Fisiopatología'], ['cli', 'Cuadro clínico'], ['dx', 'Diagnóstico'], ['ddx', 'Diagnósticos diferenciales'], ['tx', 'Tratamiento'], ['pro', 'Pronóstico'], ['per', 'Perlas'], ['src', 'Fuente y fecha de revisión']];
export const QF = [['pre', 'Prequirúrgico'], ['pos', 'Posicionamiento del paciente'], ['qx', 'Preparación del quirófano'], ['_c', 'Checklist de requisitos'], ['_p', 'Preferencias por médico de planta'], ['pas', 'Paso a paso'], ['com', 'Complicaciones y su resolución'], ['seg', 'Seguimiento posoperatorio'], ['src', 'Fuente y fecha de revisión']];
// Apartados extra según el tipo de patología
export const TX = {
  tum: [['est', 'Clasificación y estadificación'], ['his', 'Histología y marcadores']],
  vas: [['esc', 'Escalas y clasificaciones'], ['img', 'Estudios de imagen clave']],
  tra: [['esc', 'Escalas de gravedad'], ['man', 'Manejo inicial']]
};
export const TN = { gen: 'General', tum: 'Tumoral', vas: 'Vascular', tra: 'Traumática' };
// Apartados que se usan para generar preguntas automáticas
export const FL = { def: 'definición', eti: 'etiología', epi: 'epidemiología', fis: 'fisiopatología', cli: 'cuadro clínico', dx: 'diagnóstico', tx: 'tratamiento', pre: 'prequirúrgico', pas: 'paso a paso', com: 'complicaciones' };

export const fieldsOf = it => {
  if (it.k == 'q') return QF;
  const F = [...PF];
  F.splice(7, 0, ...(TX[it.ty] || []));
  return F;
};

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
export const mk = (k, t, g = '', s = '', e = '', ty = 'gen') => ({ id: uid(), k, t, g, s, e, ty, st: 0, nx: '', f: {}, c: [], pr: [], l: [] });

export const hue = g => { let h = 0; for (const c of g || 'x') h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const shuf = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
export const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
export const addD = (d, n) => { const x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
export const cnt = (a, f) => a.reduce((m, x) => { const k = f(x); m[k] = (m[k] || 0) + 1; return m; }, {});

const SN = 'Sistema nervioso', SD = 'Sistema digestivo';
export function seed() {
  return {
    items: [
      mk('p', 'Hemorragia subaracnoidea aneurismática', SN, 'Vascular', '', 'vas'), mk('p', 'ACV isquémico', SN, 'Vascular', '', 'vas'),
      mk('p', 'Traumatismo craneoencefálico', SN, 'Trauma', '', 'tra'), mk('p', 'Hidrocefalia', SN, 'LCR e hidrocefalia'),
      mk('p', 'Glioblastoma', SN, 'Tumores', '', 'tum'), mk('p', 'Hernia de disco lumbar', SN, 'Columna'),
      mk('p', 'Colecistitis aguda', SD, 'Páncreas y vía biliar'), mk('p', 'Apendicitis aguda', SD, 'Intestino'),
      mk('q', 'Craneotomía', SN, 'Craneal', 'Neurocirugía'), mk('q', 'Derivación ventricular externa', SN, 'LCR e hidrocefalia', 'Neurocirugía'),
      mk('q', 'Laminectomía lumbar', SN, 'Columna', 'Neurocirugía · Columna'), mk('q', 'Colecistectomía', SD, 'Páncreas y vía biliar', 'Cirugía general'),
      mk('q', 'Apendicectomía', SD, 'Intestino', 'Cirugía general')
    ],
    qb: [
      { c: 'Anatomía', q: '¿Qué nervio craneal inerva el músculo recto lateral del ojo?', o: ['III', 'IV', 'VI', 'VII'], a: 2, s: 'Ejemplo (reemplazalo con tu bibliografía)' },
      { c: 'Fisiología', q: '¿Cuál es el principal neurotransmisor inhibitorio del SNC del adulto?', o: ['Glutamato', 'GABA', 'Dopamina', 'Acetilcolina'], a: 1, s: 'Ejemplo' },
      { c: 'Histología', q: '¿Qué células forman la mielina en el sistema nervioso central?', o: ['Células de Schwann', 'Astrocitos', 'Oligodendrocitos', 'Microglía'], a: 2, s: 'Ejemplo' }
    ]
  };
}

// Completa un estado con todos los campos esperados (sirve para datos viejos o importados).
export const def = o => Object.assign(
  { items: [], lg: [], qb: [], rv: {}, cs: {}, hist: {}, meta: { updatedAt: 0, syncedAt: 0 } },
  o,
  { cfg: Object.assign({ t: '20:00', n: 5 }, o && o.cfg), meta: Object.assign({ updatedAt: 0, syncedAt: 0 }, o && o.meta) }
);

// Migra el formato v1 (procedimientos con la especialidad en g) al v2.
export function migrateV1(j) {
  (j.items || []).forEach(i => {
    if (i.k == 'q' && i.e == null) { i.e = i.g; i.g = ''; }
    i.s ??= ''; i.ty ??= 'gen'; i.nx ??= ''; i.l ??= []; i.c ??= []; i.pr ??= []; i.f ??= {};
  });
  return j;
}

export const isValidState = o => o && typeof o == 'object' && Array.isArray(o.items);
