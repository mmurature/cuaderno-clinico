// Guardado local en IndexedDB (más espacio y más estable que localStorage).
// Todo el estado vive en un registro 'state'. Si IndexedDB no está disponible
// (modo privado viejo, permisos), cae a localStorage y, en último caso, a memoria.
import { def, seed, migrateV1, isValidState } from './data.js';

// El nombre de la base queda como 'cuaderno-clinico' (nombre anterior de la app) para no perder datos guardados.
const DB = 'cuaderno-clinico', STORE = 'kv', KEY = 'state';
let dbp = null, mem = null, backend = 'idb';

function open() {
  if (dbp) return dbp;
  dbp = new Promise((res, rej) => {
    if (!('indexedDB' in globalThis)) return rej(new Error('sin IndexedDB'));
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(STORE);
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
    r.onblocked = () => rej(new Error('IndexedDB bloqueada'));
  });
  return dbp;
}

async function idb(mode, fn) {
  const db = await open();
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, mode), st = tx.objectStore(STORE);
    const r = fn(st);
    tx.oncomplete = () => res(r && 'result' in r ? r.result : undefined);
    tx.onerror = tx.onabort = () => rej(tx.error);
  });
}

export const getRaw = async k => {
  try { return await idb('readonly', st => st.get(k)); }
  catch { backend = 'ls'; try { const v = localStorage.getItem('cc:' + k); return v ? JSON.parse(v) : undefined; } catch { backend = 'mem'; return k == KEY ? mem : undefined; } }
};
export const setRaw = async (k, v) => {
  if (backend == 'idb') { try { await idb('readwrite', st => st.put(v, k)); return; } catch { backend = 'ls'; } }
  if (backend == 'ls') { try { localStorage.setItem('cc:' + k, JSON.stringify(v)); return; } catch { backend = 'mem'; } }
  if (k == KEY) mem = v;
};

// Carga el estado: IndexedDB → migración desde los prototipos (localStorage) → datos de ejemplo.
export async function load() {
  const s = await getRaw(KEY);
  if (isValidState(s)) return def(migrateV1(s));
  try {
    const v2 = localStorage.getItem('cuaderno-v2');
    if (v2) { const st = def(migrateV1(JSON.parse(v2))); await setRaw(KEY, st); return st; }
    const v1 = localStorage.getItem('cuaderno-v1');
    if (v1) { const st = def(migrateV1(JSON.parse(v1))); await setRaw(KEY, st); return st; }
  } catch { /* sin localStorage: seguimos */ }
  return def(seed());
}

// Guardado con un pequeño retardo para no escribir en cada tecla.
let timer = null, pending = null;
export function save(state, { touch = true } = {}) {
  if (touch) state.meta.updatedAt = Date.now();
  pending = state;
  clearTimeout(timer);
  timer = setTimeout(flush, 250);
}
export async function flush() {
  clearTimeout(timer);
  if (!pending) return;
  const s = pending; pending = null;
  // structuredClone evita guardar referencias que se sigan mutando a mitad de la escritura
  await setRaw(KEY, structuredClone(s));
}
addEventListener('pagehide', flush);
document.addEventListener('visibilitychange', () => { if (document.visibilityState == 'hidden') flush(); });

// Pide al navegador que no borre los datos si falta espacio (importante en iPhone).
export const persist = () => navigator.storage?.persist?.().catch(() => false);
export const backendName = () => backend;
