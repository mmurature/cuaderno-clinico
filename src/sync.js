// Sincronización opcional con Supabase.
// Se activa sola si existen VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY (ver README).
// Guarda el estado de estudio completo como un documento JSON por usuaria (tabla `cuadernos`).
// Nunca sube datos de pacientes: esos van a vivir solo en el dispositivo (fase 3).
import { def } from './data.js';

const SB_URL = import.meta.env.VITE_SUPABASE_URL, SB_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const enabled = !!(SB_URL && SB_KEY);

// Claves que nunca salen del dispositivo
const LOCAL_ONLY = ['meta', 'vault'];
const LOCAL_CFG = ['nt', 'last'];

let sb = null, user = null, status = enabled ? 'out' : 'off', lastError = '', busy = false, again = false, timer = null;
let hooks = { get: () => null, apply: () => {}, backup: async () => {}, onStatus: () => {}, notify: () => {} };

const set = (s, err = '') => { status = s; lastError = err; hooks.onStatus(s, err); };
export const getStatus = () => ({ status, error: lastError, email: user?.email || '' });

export async function init(h) {
  hooks = { ...hooks, ...h };
  if (!enabled) return set('off');
  try {
    const { createClient } = await import('@supabase/supabase-js');
    sb = createClient(SB_URL, SB_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    const { data } = await sb.auth.getSession();
    user = data.session?.user || null;
    sb.auth.onAuthStateChange((ev, session) => {
      const was = user?.id; user = session?.user || null;
      if (ev == 'PASSWORD_RECOVERY') hooks.onRecovery?.();
      if (user && user.id != was) syncNow();
      if (!user) set('out');
    });
    if (user) syncNow(); else set('out');
  } catch (e) { set('err', 'No se pudo iniciar la sincronización: ' + (e.message || e)); }
  addEventListener('online', () => syncNow());
  addEventListener('offline', () => user && set('offline'));
  document.addEventListener('visibilitychange', () => { if (document.visibilityState == 'visible') syncNow(); else if (timer) { clearTimeout(timer); syncNow(); } });
  setInterval(() => { if (document.visibilityState == 'visible') syncNow(); }, 120000);
}

// Llamar después de cada cambio local: sube los cambios unos segundos después.
export function schedule() {
  if (!user) return;
  clearTimeout(timer);
  timer = setTimeout(() => { timer = null; syncNow(); }, 3000);
}

const payload = S => {
  const o = { ...S, cfg: { ...S.cfg } };
  LOCAL_ONLY.forEach(k => delete o[k]);
  LOCAL_CFG.forEach(k => delete o.cfg[k]);
  return o;
};

function fromRemote(row, S) {
  const n = def(structuredClone(row.data));
  LOCAL_CFG.forEach(k => { if (S.cfg[k] !== undefined) n.cfg[k] = S.cfg[k]; });
  if (S.vault) n.vault = S.vault;
  n.meta = { ...S.meta, uid: user.id, remoteAt: Date.parse(row.updated_at), updatedAt: S.meta.updatedAt, syncedLocal: S.meta.updatedAt };
  return n;
}

export async function syncNow() {
  if (!user || !sb) return;
  if (!navigator.onLine) return set('offline');
  if (busy) { again = true; return; }
  busy = true; set('busy');
  try {
    const S = hooks.get();
    const { data: row, error } = await sb.from('cuadernos').select('data, updated_at').eq('user_id', user.id).maybeSingle();
    if (error) throw error;
    const m = S.meta, remoteAt = row ? Date.parse(row.updated_at) : 0;
    const first = m.uid != user.id;
    const localDirty = first ? m.updatedAt > 0 : m.updatedAt > (m.syncedLocal || 0);
    const remoteChanged = !!row && (first || remoteAt > (m.remoteAt || 0));

    if (!row) await push(S, null);
    else if (remoteChanged && !localDirty) hooks.apply(fromRemote(row, S));
    else if (localDirty && !remoteChanged) await push(S, row.updated_at);
    else if (localDirty && remoteChanged) {
      // Los dos lados cambiaron: gana el más reciente y el otro queda guardado como copia.
      if (!first && m.updatedAt > remoteAt) {
        await hooks.backup(fromRemote(row, S), 'nube');
        await push(S, row.updated_at);
        hooks.notify('Había cambios en otro dispositivo; se guardó una copia (Respaldo).');
      } else {
        await hooks.backup(S, 'este dispositivo');
        hooks.apply(fromRemote(row, S));
        hooks.notify('Se cargaron tus datos de la nube; lo que había acá quedó como copia (Respaldo).');
      }
    }
    set('ok');
  } catch (e) {
    set('err', e.message || String(e));
  } finally {
    busy = false;
    if (again) { again = false; syncNow(); }
  }
}

// Sube con control de concurrencia: si otro dispositivo escribió en el medio, se vuelve a sincronizar.
async function push(S, expected) {
  const at = S.meta.updatedAt, data = payload(S);
  let res;
  if (expected) res = await sb.from('cuadernos').update({ data }).eq('user_id', user.id).eq('updated_at', expected).select('updated_at');
  else res = await sb.from('cuadernos').insert({ user_id: user.id, data }).select('updated_at');
  if (res.error) { if (res.error.code == '23505') { again = true; return; } throw res.error; }
  if (!res.data.length) { again = true; return; }
  const cur = hooks.get();
  cur.meta.uid = user.id; cur.meta.remoteAt = Date.parse(res.data[0].updated_at); cur.meta.syncedLocal = at;
  hooks.apply(cur, { silent: true });
}

const redirect = () => location.origin + import.meta.env.BASE_URL;
const msg = e => ({
  'Invalid login credentials': 'Mail o contraseña incorrectos.',
  'Email not confirmed': 'Falta confirmar el mail: revisá tu casilla.',
  'User already registered': 'Ese mail ya tiene cuenta: iniciá sesión.'
}[e.message] || e.message);

export async function signIn(email, password) {
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw new Error(msg(error));
}
export async function signUp(email, password) {
  const { data, error } = await sb.auth.signUp({ email, password, options: { emailRedirectTo: redirect() } });
  if (error) throw new Error(msg(error));
  return !data.session; // true = hay que confirmar el mail
}
export async function resetPassword(email) {
  const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: redirect() });
  if (error) throw new Error(msg(error));
}
export async function updatePassword(password) {
  const { error } = await sb.auth.updateUser({ password });
  if (error) throw new Error(msg(error));
}
export async function signOut() { await sb.auth.signOut(); user = null; set('out'); }
