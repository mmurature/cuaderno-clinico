// Identidad visual (skin) y modo claro/oscuro. Se guarda por dispositivo.
export const SKINS = {
  clinico: { n: 'Clínico moderno', d: 'Blanco y verde azulado, sans precisa, más información por pantalla. Predeterminado.', sw: ['#0c8587', '#dff1f1', '#15202a', '#f3f6f8'] },
  cuaderno: { n: 'Cuaderno', d: 'Papel crema, tinta azul, renglones. Se siente como tus apuntes.', sw: ['#2f5482', '#f4efe4', '#a8443a', '#fffdf7'] }
};
export const DEFAULT_SKIN = 'clinico';
const KEY = 'meditas-ui';

export function getUI() {
  try { const o = JSON.parse(localStorage.getItem(KEY) || '{}'); return { skin: SKINS[o.skin] ? o.skin : DEFAULT_SKIN, mode: ['auto', 'light', 'dark'].includes(o.mode) ? o.mode : 'auto' }; }
  catch { return { skin: DEFAULT_SKIN, mode: 'auto' }; }
}
const mq = typeof matchMedia == 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;
const resolved = mode => (mode == 'auto' ? (mq && mq.matches ? 'dark' : 'light') : mode);

export function applyUI(ui = getUI(), animate = false) {
  const r = document.documentElement;
  if (animate) { r.classList.add('theme-anim'); setTimeout(() => r.classList.remove('theme-anim'), 450); }
  r.dataset.skin = ui.skin; r.dataset.mode = resolved(ui.mode);
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.content = getComputedStyle(r).getPropertyValue('--bg').trim() || '#f3f6f8';
}
export function setUI(patch) {
  const ui = { ...getUI(), ...patch };
  try { localStorage.setItem(KEY, JSON.stringify(ui)); } catch { /* sin almacenamiento: solo en esta sesión */ }
  applyUI(ui, true);
  return ui;
}
mq && mq.addEventListener && mq.addEventListener('change', () => { if (getUI().mode == 'auto') applyUI(getUI(), true); });
