// Fórmulas y calculadoras editables. Cada cálculo muestra la fórmula que usa.
// Las fórmulas se evalúan solo con las variables declaradas y un conjunto limitado de operadores.
import { esc, hue } from './data.js';

let ctx = null;
const st = () => ctx.getS(), $ = s => document.querySelector(s);
export const initFormulas = c => { ctx = c; };
const op = { has: k => ctx.op.has(k) };

const fparse=(x,i)=>{const[c,n,e,v,r,t]=x.split('|');return{id:'f'+i,c,n,e,v:(v||'').split(';').filter(Boolean).map(y=>y.split(':')),r:r||'',t:t||''}};
const fev=(f,v)=>{try{if(!/^[\w\s+\-*\/().,<>=!?:&|%]*$/.test(f.e))return NaN;const k=f.v.map(y=>y[0]);return new Function(...k,'return ('+f.e+')')(...k.map(y=>+v[y]))}catch(e){return NaN}};
const fr=(f,v)=>{const r=fev(f,v);return isFinite(r)?r.toLocaleString('es-AR',{maximumFractionDigits:2}):'—'};
const fdef=f=>Object.fromEntries(f.v.map(y=>[y[0],y[3]]));
function fcalc(id){const f=st().fm.find(x=>x.id==id),v={};document.querySelectorAll(`[data-fk="${id}"]`).forEach(i=>v[i.dataset.vk]=i.value);$('#fr-'+id).textContent=fr(f,v)}
function fmv(){const F=(st().fm??=[]).filter(f=>f.id[0]=='u'),cs=[...new Set(F.map(f=>f.c))];
 return`<div class="pan"><h3>Mis fórmulas</h3><p class="meta">Fórmulas propias: cada una muestra la expresión que usa y podés editarla. Las del catálogo (con fuente y versión) están en Fórmulas y Scores. Verificá siempre contra tu protocolo antes de indicar algo.</p><button class="bt" data-r="fnew">+ Nueva fórmula</button></div>${F.length?'':'<div class="empty"><p>Todavía no creaste fórmulas propias.</p></div>'}`+cs.map(c=>`<details class="g" style="--h:${hue(c)}" data-k="fc${esc(c)}" ${op.has('fc'+c)?'open':''}><summary><span class="gt">${esc(c)}</span><span class="gc">${F.filter(f=>f.c==c).length}</span></summary>${F.filter(f=>f.c==c).map(f=>`<details class="sg" data-k="f${f.id}" ${op.has('f'+f.id)?'open':''}><summary>${esc(f.n)}</summary><div style="padding:4px 16px 14px"><div class="tl">${f.v.map(([k,l,u,d])=>`<label class="f">${esc(l)}${u?' ('+esc(u)+')':''}<input type="number" step="any" data-fk="${f.id}" data-vk="${k}" value="${esc(d)}"></label>`).join('')}</div><div class="pan" style="margin:10px 0"><b id="fr-${f.id}">${fr(f,fdef(f))}</b> ${esc(f.r)}</div><div class="meta">Fórmula: <code>${esc(f.e)}</code></div>${f.t?`<div class="meta">${esc(f.t)}</div>`:''}<button class="add" data-r="fedit" data-i="${f.id}" style="margin-top:8px">Editar</button></div></details>`).join('')}</details>`).join('')}
function fform(f){return`<div class="sheet bk"><div class="eh"><button data-b="c">← Volver</button></div><h3>${f.n?'Editar':'Nueva'} fórmula</h3><label class="f">Categoría<input id="fc" value="${esc(f.c)}"></label><label class="f">Nombre<input id="fn" value="${esc(f.n)}"></label><label class="f">Fórmula (con las claves de las variables)<input id="fe" value="${esc(f.e)}"></label><label class="f">Variables, una por línea: clave:etiqueta:unidad:valor<textarea id="fv">${esc(f.v.map(x=>x.join(':')).join('\n'))}</textarea></label><label class="f">Unidad del resultado<input id="fu" value="${esc(f.r)}"></label><label class="f">Nota<input id="ft" value="${esc(f.t)}"></label><p class="meta" id="fm">Podés usar + - * / ( ) ?: &lt; &gt; y Math.sqrt, Math.pow, Math.log.</p><button class="bt" data-fm="s" data-i="${f.id}">Guardar</button> <button class="add" data-fm="d" data-i="${f.id}">Eliminar</button></div>`}

export { fmv, fcalc };

export const FMR = {
  fnew() { st().fm ??= []; ctx.openSheet(fform({ id: 'u' + Date.now(), c: '', n: '', e: '', r: '', t: '', v: [] })); },
  fedit(b) { ctx.openSheet(fform(st().fm.find(x => x.id == b.dataset.i))); }
};

// Botones del formulario de edición (dentro de #bk)
export function formulaSheetClick(e) {
  const b = e.target.closest('[data-fm]'); if (!b) return false;
  const id = b.dataset.i, S = st();
  if (b.dataset.fm == 'd') { S.fm = S.fm.filter(x => x.id != id); ctx.save(); ctx.close(); return true; }
  const f = { id, c: $('#fc').value.trim() || 'Otras', n: $('#fn').value.trim(), e: $('#fe').value.trim(), r: $('#fu').value.trim(), t: $('#ft').value.trim(), v: $('#fv').value.split('\n').map(x => x.trim()).filter(Boolean).map(x => { const q = x.split(':'); return [q[0], q[1] || q[0], q[2] || '', q[3] || '0']; }) };
  if (!f.n || !f.e) { $('#fm').textContent = 'Falta el nombre o la fórmula.'; return true; }
  if (isNaN(fev(f, fdef(f)))) { $('#fm').textContent = 'La fórmula no se puede calcular: revisá las claves y los operadores.'; return true; }
  S.fm ??= [];
  const i = S.fm.findIndex(x => x.id == id); i < 0 ? S.fm.push(f) : S.fm[i] = f;
  ctx.save(); ctx.close(); return true;
}
