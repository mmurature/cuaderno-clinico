// Modelo de datos, plantillas y utilidades puras (sin DOM).

export const ST = ['Por ver', 'En estudio', 'Dominada'];
export const IV = [1, 3, 14]; // días hasta el próximo repaso de una ficha según su estado

export const PF = [['def', 'Definición'], ['eti', 'Etiología'], ['epi', 'Epidemiología'], ['fis', 'Fisiopatología'], ['cli', 'Cuadro clínico'], ['dx', 'Diagnóstico'], ['ddx', 'Diagnósticos diferenciales'], ['tx', 'Tratamiento'], ['pro', 'Pronóstico'], ['per', 'Perlas']];
export const QF = [['pre', 'Prequirúrgico'], ['pos', 'Posicionamiento del paciente'], ['qx', 'Preparación del quirófano'], ['_c', 'Checklist de requisitos'], ['_p', 'Preferencias por médico de planta'], ['pas', 'Paso a paso'], ['com', 'Complicaciones y su resolución'], ['seg', 'Seguimiento posoperatorio']];
// Apartados que se usan para generar preguntas automáticas
export const FL = { def: 'definición', eti: 'etiología', epi: 'epidemiología', fis: 'fisiopatología', cli: 'cuadro clínico', dx: 'diagnóstico', tx: 'tratamiento', pre: 'prequirúrgico', pas: 'paso a paso', com: 'complicaciones' };

export const fieldsOf = it => (it.k == 'q' ? QF : PF);
// Nombres de los niveles de clasificación
export const LV = { p: ['Capítulo', 'Tema'], q: ['Especialidad', 'Subespecialidad'] };
export const groupOf = i => (i.k == 'q' ? i.e : i.g);

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
// k: 'p' patología | 'q' procedimiento · g: capítulo (p) · e: especialidad (q) · s: tema o subespecialidad
// ra: fecha de la última modificación (se actualiza sola)
export const mk = (k, t, g = '', s = '', e = '') => ({ id: uid(), k, t, g, s, e, st: 0, nx: '', ra: '', f: {}, c: [], pr: [], l: [] });

export const hue = g => { let h = 0; for (const c of g || 'x') h = (h * 31 + c.charCodeAt(0)) % 360; return h; };
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const shuf = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);
export const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
export const addD = (d, n) => { const x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
export const cnt = (a, f) => a.reduce((m, x) => { const k = f(x); m[k] = (m[k] || 0) + 1; return m; }, {});

export function seed() {
  const NL = 'Neurología', GE = 'Gastroenterología', NC = 'Neurocirugía', CG = 'Cirugía general';
  return {
    items: [
      mk('p', 'Hemorragia subaracnoidea aneurismática', NL, 'Accidente cerebrovascular'), mk('p', 'ACV isquémico', NL, 'Accidente cerebrovascular'),
      mk('p', 'Glioblastoma', NL, 'Tumores del sistema nervioso central'), mk('p', 'Insuficiencia cardíaca descompensada', 'Cardiología', 'Insuficiencia cardíaca'),
      mk('p', 'Colecistitis aguda', GE, 'Enfermedades de la vía biliar'), mk('p', 'Apendicitis aguda', GE, 'Abdomen agudo'),
      mk('q', 'Craneotomía', '', 'Oncología', NC), mk('q', 'Derivación ventricular externa', '', 'Hidrocefalia', NC),
      mk('q', 'Laminectomía lumbar', '', 'Columna', NC), mk('q', 'Colecistectomía', '', 'Hepatobiliopancreática', CG),
      mk('q', 'Apendicectomía', '', 'Colorrectal', CG)
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
  { items: [], lg: [], qb: [], rv: {}, cs: {}, hist: {}, ev: {}, evh: [], evt: {}, pq: [], pqt: {}, meta: { updatedAt: 0, syncedAt: 0 } },
  o,
  { cfg: Object.assign({ t: '20:00', n: 5, m: 'x' }, o && o.cfg), meta: Object.assign({ updatedAt: 0, syncedAt: 0 }, o && o.meta) }
);

// Migra el formato v1 (procedimientos con la especialidad en g) al v2.
export function migrateV1(j) {
  (j.items || []).forEach(i => {
    if (i.k == 'q' && i.e == null) { i.e = i.g; i.g = ''; }
    i.s ??= ''; i.nx ??= ''; i.ra ??= ''; i.l ??= []; i.c ??= []; i.pr ??= []; i.f ??= {};
    // Se quitó el apartado “Fuente y fecha de revisión”: su texto pasa al final de otro apartado para no perderlo.
    const src = (i.f.src || '').trim();
    if (src) { const k = i.k == 'q' ? 'seg' : 'per'; i.f[k] = ((i.f[k] || '').trim() + '\n\nFuente: ' + src).trim(); }
    delete i.f.src; delete i.ty;
  });
  return j;
}

export const isValidState = o => o && typeof o == 'object' && Array.isArray(o.items);
