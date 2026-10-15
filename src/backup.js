// Respaldo y exportación a archivos: JSON completo (restaurable) y CSV (para Excel).
import { fieldsOf, ST, today, def, migrateV1, isValidState } from './data.js';

export function download(name, text, type) {
  const blob = new Blob([text], { type }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

export function exportJSON(S) {
  download(`meditas-respaldo-${today()}.json`, JSON.stringify({ app: 'meditas', version: 3, exportedAt: new Date().toISOString(), data: S }, null, 1), 'application/json');
}

// Acepta el archivo de respaldo nuevo o el JSON pegado en los prototipos v1/v2.
export function parseBackup(text) {
  const o = JSON.parse(text), d = o && o.data && ['meditas', 'cuaderno-clinico'].includes(o.app) ? o.data : o;
  if (!isValidState(d)) throw new Error('El archivo no es un respaldo válido.');
  return def(migrateV1(d));
}

export const pickFile = (accept = '.json,application/json') => new Promise(res => {
  const i = document.createElement('input'); i.type = 'file'; i.accept = accept;
  i.onchange = () => res(i.files[0] || null);
  i.click();
});

// CSV con ; y BOM para que Excel en español lo abra con acentos y columnas bien.
const cell = v => { const s = String(v ?? ''); return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const toCSV = rows => '﻿' + rows.map(r => r.map(cell).join(';')).join('\r\n');

export function exportFichasCSV(S, k) {
  const its = S.items.filter(i => i.k == k);
  const keys = new Map();
  its.forEach(i => fieldsOf(i).forEach(([f, l]) => { if (f[0] != '_') keys.set(f, l); }));
  const head = ['Nombre', k == 'q' ? 'Especialidad' : 'Capítulo', k == 'q' ? 'Subespecialidad' : 'Tema', 'Estado', 'Última revisión', 'Próximo repaso', ...keys.values()];
  if (k == 'q') head.push('Checklist', 'Preferencias por médico');
  const rows = its.map(i => {
    const r = [i.t, k == 'q' ? i.e : i.g, i.s, ST[i.st], i.ra || '', i.nx, ...[...keys.keys()].map(f => i.f[f] || '')];
    if (k == 'q') r.push(i.c.map(c => (c.d ? '[x] ' : '[ ] ') + c.t).join('\n'), i.pr.map(p => p.m + ': ' + p.t).join('\n'));
    return r;
  });
  download(`meditas-${k == 'p' ? 'patologias' : 'procedimientos'}-${today()}.csv`, toCSV([head, ...rows]), 'text/csv;charset=utf-8');
}

export function exportLogCSV(S) {
  const rows = S.lg.map(x => [x.d, x.p, x.r, x.t, x.c]);
  download(`meditas-registro-procedimientos-${today()}.csv`, toCSV([['Fecha', 'Procedimiento', 'Rol', 'Tipo', 'Complicación'], ...rows]), 'text/csv;charset=utf-8');
}
