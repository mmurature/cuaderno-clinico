// Texto enriquecido de las fichas: negrita, cursiva, subrayado, listas, fuente, tamaño y color.
// Se guarda como HTML limpio (lista blanca). Las fichas viejas en texto plano se siguen leyendo y se convierten al editarlas.
import { esc } from './data.js';

export const isHtml = v => /^\s*<(p|div|ul|ol|h[1-6]|b|i|u|s|strong|em|span|br|font|li)[\s>/]/i.test(v || '');
const TAGS = new Set(['P', 'DIV', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'S', 'UL', 'OL', 'LI', 'SPAN', 'H3', 'H4', 'SUB', 'SUP']);
export const FONTS = [['', 'Fuente'], ['sans', 'Sans'], ['serif', 'Serif'], ['mono', 'Mono']];
const FONT_CSS = { sans: 'system-ui, sans-serif', serif: 'Georgia, serif', mono: 'ui-monospace, Menlo, monospace' };
export const SIZES = [['', 'Tamaño'], ['0.85em', 'Pequeño'], ['1.15em', 'Grande'], ['1.4em', 'Muy grande']];
export const COLORS = [['', 'Sin color'], ['#d33f3f', 'Rojo'], ['#eb6834', 'Naranja'], ['#b8860b', 'Ocre'], ['#1baf7a', 'Verde'], ['#2a78d6', 'Azul'], ['#8e5bd6', 'Violeta'], ['#7a8794', 'Gris']];
const OKCOL = /^(#[0-9a-f]{3,8}|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\))$/i;
const OKSIZE = /^(0\.\d+|1\.\d+|[2-9](\.\d+)?)em$|^\d{2,3}%$/;

// Limpia el HTML: solo etiquetas permitidas y los estilos color, font-size, font-family, text-align.
export function sanitize(html) {
  const doc = new DOMParser().parseFromString('<body>' + String(html || '') + '</body>', 'text/html');
  const walk = (node, out) => {
    node.childNodes.forEach(n => {
      if (n.nodeType == 3) return out.appendChild(document.createTextNode(n.nodeValue));
      if (n.nodeType != 1) return;
      let tag = n.tagName;
      if (tag == 'FONT') tag = 'SPAN';
      if (!TAGS.has(tag)) { if (['SCRIPT', 'STYLE', 'IFRAME', 'OBJECT', 'EMBED', 'SVG', 'MATH'].includes(tag)) return; return walk(n, out); }
      const el = document.createElement(tag.toLowerCase());
      if (['SPAN', 'P', 'DIV', 'LI'].includes(tag)) {
        const s = n.style || {}, st = [];
        const col = (s.color || n.getAttribute('color') || '').trim();
        if (col && OKCOL.test(col)) st.push('color:' + col);
        const fs = (s.fontSize || '').trim(); if (fs && OKSIZE.test(fs)) st.push('font-size:' + fs);
        const legacy = { 1: '0.7em', 2: '0.85em', 4: '1.15em', 5: '1.4em', 6: '1.7em', 7: '2em' }[n.getAttribute && n.getAttribute('size')];
        if (!fs && legacy) st.push('font-size:' + legacy);
        const ff = (s.fontFamily || n.getAttribute('face') || '').toLowerCase();
        const fam = /mono|courier|menlo/.test(ff) ? 'mono' : /serif|georgia|times/.test(ff) && !/sans/.test(ff) ? 'serif' : /sans|arial|helvet|system/.test(ff) ? 'sans' : '';
        if (fam) st.push('font-family:' + FONT_CSS[fam]);
        if (['left', 'center', 'right', 'justify'].includes(s.textAlign)) st.push('text-align:' + s.textAlign);
        if (st.length) el.setAttribute('style', st.join(';'));
      }
      let wrap = el;
      if (tag == 'SPAN') {
        const s = n.style || {};
        if (/^(bold|[6-9]00)$/.test(s.fontWeight)) { const t = document.createElement('b'); wrap.appendChild(t); wrap = t; }
        if (s.fontStyle == 'italic') { const t = document.createElement('i'); wrap.appendChild(t); wrap = t; }
        if ((s.textDecorationLine || s.textDecoration || '').includes('underline')) { const t = document.createElement('u'); wrap.appendChild(t); wrap = t; }
      }
      walk(n, wrap); out.appendChild(el);
    });
  };
  const box = document.createElement('div'); walk(doc.body, box);
  return box.innerHTML.replace(/<(div|p)>(<br>)?<\/\1>/g, '<br>');
}
// Texto plano → HTML (listas con “- ”, párrafos y saltos de línea)
export function mdToHtml(t) {
  return String(t || '').trim().split(/\n\s*\n/).filter(Boolean).map(b => {
    const ls = b.split('\n');
    if (ls.every(l => /^\s*[-•*]\s+/.test(l))) return '<ul>' + ls.map(l => `<li>${esc(l.replace(/^\s*[-•*]\s+/, ''))}</li>`).join('') + '</ul>';
    return '<p>' + ls.map(esc).join('<br>') + '</p>';
  }).join('');
}
// Para mostrar (lectura): HTML limpio en ambos formatos
export const toView = v => (isHtml(v) ? sanitize(v) : mdToHtml(v));
// Para editar: siempre HTML
export const toEdit = toView;
// Texto plano (búsqueda, preguntas de repaso, exportación a Excel)
export function plain(v) {
  if (!isHtml(v)) return String(v || '');
  const box = document.createElement('div'); box.innerHTML = sanitize(v);
  box.querySelectorAll('li').forEach(li => li.prepend('- '));
  box.querySelectorAll('br').forEach(b => b.replaceWith('\n'));
  box.querySelectorAll('p,div,li,ul,ol,h3,h4').forEach(b => b.append('\n'));
  return box.textContent.replace(/\n{3,}/g, '\n\n').trim();
}

/* ---------- barra de herramientas ---------- */
export const toolbar = k => `<div class="rtb" role="toolbar" aria-label="Formato de texto" data-rtb="${esc(k)}">
  <button type="button" data-rc="bold" aria-label="Negrita"><b>B</b></button><button type="button" data-rc="italic" aria-label="Cursiva"><i>I</i></button><button type="button" data-rc="underline" aria-label="Subrayado"><u>U</u></button>
  <button type="button" data-rc="insertUnorderedList" aria-label="Lista con viñetas">• ≡</button><button type="button" data-rc="insertOrderedList" aria-label="Lista numerada">1. ≡</button>
  <select data-rs="font" aria-label="Fuente">${FONTS.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select>
  <select data-rs="size" aria-label="Tamaño de letra">${SIZES.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select>
  <select data-rs="color" aria-label="Color del texto">${COLORS.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select>
  <button type="button" data-rc="removeFormat" aria-label="Quitar formato">T×</button></div>`;

let saved = null;
export const saveSel = ed => { const s = getSelection(); if (s.rangeCount && ed.contains(s.anchorNode)) saved = s.getRangeAt(0).cloneRange(); };
const restore = ed => { ed.focus(); if (saved && ed.contains(saved.startContainer)) { const s = getSelection(); s.removeAllRanges(); s.addRange(saved); } };
// Aplica un comando sobre la selección del recuadro; devuelve true si cambió algo
export function exec(ed, cmd, val) {
  restore(ed);
  try { document.execCommand('styleWithCSS', false, true); } catch { /* sin soporte */ }
  if (cmd == 'font') document.execCommand('fontName', false, val ? FONT_CSS[val] : 'system-ui');
  else if (cmd == 'size') {
    if (!val) return false;
    // execCommand solo conoce 7 tamaños: se marca con 7 y se reemplaza por el tamaño elegido
    document.execCommand('fontSize', false, '7');
    const made = [];
    ed.querySelectorAll('span[style*="xxx-large"]').forEach(f => { f.style.fontSize = val; made.push(f); });
    ed.querySelectorAll('font[size="7"]').forEach(f => { const s = document.createElement('span'); s.style.fontSize = val; if (f.getAttribute('color')) s.style.color = f.getAttribute('color'); while (f.firstChild) s.appendChild(f.firstChild); f.replaceWith(s); made.push(s); });
    if (made.length) { const r = document.createRange(); r.setStartBefore(made[0]); r.setEndAfter(made[made.length - 1]); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }
  } else if (cmd == 'color') document.execCommand(val ? 'foreColor' : 'removeFormat', false, val || undefined);
  else document.execCommand(cmd, false, null);
  saveSel(ed); return true;
}
