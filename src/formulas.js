// Fórmulas y calculadoras editables. Cada cálculo muestra la fórmula que usa.
// Las fórmulas se evalúan solo con las variables declaradas y un conjunto limitado de operadores.
import { esc, hue } from './data.js';

let ctx = null;
const st = () => ctx.getS(), $ = s => document.querySelector(s);
export const initFormulas = c => { ctx = c; };
const op = { has: k => ctx.op.has(k) };

const VD={na:'na:Na:mEq/L:140',cl:'cl:Cl:mEq/L:104',hco3:'hco3:HCO3:mEq/L:24',peso:'peso:Peso:kg:70',talla:'talla:Talla:cm:170',alb:'alb:Albúmina:g/dL:4',glu:'glu:Glucemia:mg/dL:100',pco2:'pco2:pCO2:mmHg:40'};
const FM0=['Ácido-base|Anion gap|na-(cl+hco3)|na;cl;hco3|mEq/L|Habitual 8 a 12 (sin K). Corregir si hay hipoalbuminemia.',
'Ácido-base|Anion gap corregido por albúmina|(na-(cl+hco3))+2.5*(4-alb)|na;cl;hco3;alb|mEq/L|Suma 2,5 por cada g/dL de albúmina por debajo de 4.',
'Ácido-base|Delta-delta|((na-(cl+hco3))-12)/(24-hco3)|na;cl;hco3:HCO3:mEq/L:12|—|Orientativo: menor a 0,4 acidosis hiperclorémica; 0,4 a 1 mixta; 1 a 2 acidosis con anion gap pura; mayor a 2 sugiere alcalosis metabólica asociada.',
'Ácido-base|Compensación en acidosis metabólica (Winter)|1.5*hco3+8|hco3:HCO3:mEq/L:12|mmHg (pCO2 esperada ±2)|',
'Ácido-base|Compensación en alcalosis metabólica|40+0.7*(hco3-24)|hco3:HCO3:mEq/L:36|mmHg (pCO2 esperada ±5)|',
'Ácido-base|HCO3 esperado en acidosis respiratoria|24+k*(pco2-40)|pco2:pCO2:mmHg:60;k:Factor (0,1 aguda · 0,35 crónica)::0.1|mEq/L|',
'Ácido-base|HCO3 esperado en alcalosis respiratoria|24-k*(40-pco2)|pco2:pCO2:mmHg:28;k:Factor (0,2 aguda · 0,4 crónica)::0.2|mEq/L|',
'Ácido-base|Relación PaO2/FiO2|pao2/fio2|pao2:PaO2:mmHg:90;fio2:FiO2 (0,21 a 1)::0.5|mmHg|Referencia de Berlín (con PEEP de 5 o más): 200 a 300 leve, 100 a 200 moderado, menor a 100 grave.',
'Hidroelectrolítico|Sodio corregido por glucemia|na+1.6*((glu-100)/100)|na:Na medido:mEq/L:128;glu:Glucemia:mg/dL:400|mEq/L|Algunos usan 2,4 en lugar de 1,6: editable.',
'Hidroelectrolítico|Déficit de sodio|f*peso*(nad-na)|f:Agua corporal (0,6 hombre · 0,5 mujer)::0.6;peso;nad:Na deseado:mEq/L:135;na:Na actual:mEq/L:120|mEq|El límite de corrección por día es un criterio aparte.',
'Hidroelectrolítico|Déficit de agua libre|f*peso*(na/140-1)|f:Agua corporal (0,6 hombre · 0,5 mujer)::0.6;peso;na:Na actual:mEq/L:160|L|',
'Hidroelectrolítico|Calcio corregido por albúmina|ca+0.8*(4-alb)|ca:Calcio total:mg/dL:7.5;alb:Albúmina:g/dL:2.5|mg/dL|',
'Hidroelectrolítico|Osmolaridad plasmática calculada|2*na+glu/18+urea/6|na;glu;urea:Urea:mg/dL:30|mOsm/kg|Urea en mg/dL.',
'Hidroelectrolítico|Déficit de bicarbonato|f*peso*(hd-ha)|f:Factor (0,4 a 0,5)::0.5;peso;hd:HCO3 deseado:mEq/L:20;ha:HCO3 actual:mEq/L:8|mEq|Se suele corregir solo una parte.',
'Fluidos|Mantenimiento por hora (4-2-1)|peso<=10?4*peso:peso<=20?40+2*(peso-10):60+(peso-20)|peso:Peso:kg:20|mL/h|',
'Fluidos|Mantenimiento diario (Holliday-Segar)|peso<=10?100*peso:peso<=20?1000+50*(peso-10):1500+20*(peso-20)|peso:Peso:kg:20|mL/día|',
'Fluidos|Goteo de una solución|vol*fg/min|vol:Volumen:mL:500;fg:Factor de goteo (macro 20 · micro 60):gotas/mL:20;min:Tiempo:min:240|gotas/min|',
'Fluidos|Parkland (quemados)|c*peso*sc|c:mL por kg por % de superficie quemada::4;peso;sc:Superficie quemada:%:20|mL en 24 h|La mitad en las primeras 8 horas desde la quemadura. Verificar el protocolo del servicio.',
'Fármacos|Dosis por peso|dpk*peso|dpk:Dosis:mg/kg:10;peso|mg|',
'Fármacos|Velocidad de bomba de infusión|dosis*peso*60/conc|dosis:Dosis:mcg/kg/min:0.1;peso;conc:Concentración:mcg/mL:64|mL/h|',
'Hemodinamia y neurocrítico|Presión arterial media|(pas+2*pad)/3|pas:PAS:mmHg:120;pad:PAD:mmHg:80|mmHg|',
'Hemodinamia y neurocrítico|Presión de perfusión cerebral|pam-pic|pam:PAM:mmHg:90;pic:PIC:mmHg:15|mmHg|Los objetivos dependen de la patología y del protocolo.',
'Renal y antropometría|Clearance de creatinina (Cockcroft-Gault)|(140-edad)*peso/(72*cr)*sx|edad:Edad:años:60;peso;cr:Creatinina:mg/dL:1;sx:Sexo (1 hombre · 0,85 mujer)::1|mL/min|',
'Renal y antropometría|Diuresis horaria por kg|diu/peso/h|diu:Diuresis:mL:600;peso;h:Horas:h:12|mL/kg/h|',
'Renal y antropometría|Índice de masa corporal|peso/((talla/100)**2)|peso;talla|kg/m²|',
'Renal y antropometría|Superficie corporal (Mosteller)|Math.sqrt(talla*peso/3600)|peso;talla|m²|',
'Renal y antropometría|Peso ideal (Devine)|b+0.91*(talla-152.4)|b:Base (50 hombre · 45,5 mujer)::50;talla|kg|',
'Cardiología|QT corregido (Bazett)|qt/Math.sqrt(rr)|qt:QT:s:0.4;rr:Intervalo RR:s:0.8|s|'];
const fparse=(x,i)=>{const[c,n,e,v,r,t]=x.split('|');return{id:'f'+i,c,n,e,v:(v||'').split(';').filter(Boolean).map(y=>(VD[y]||y).split(':')),r:r||'',t:t||''}};
const fev=(f,v)=>{try{if(!/^[\w\s+\-*\/().,<>=!?:&|%]*$/.test(f.e))return NaN;const k=f.v.map(y=>y[0]);return new Function(...k,'return ('+f.e+')')(...k.map(y=>+v[y]))}catch(e){return NaN}};
const fr=(f,v)=>{const r=fev(f,v);return isFinite(r)?r.toLocaleString('es-AR',{maximumFractionDigits:2}):'—'};
const fdef=f=>Object.fromEntries(f.v.map(y=>[y[0],y[3]]));
function fcalc(id){const f=st().fm.find(x=>x.id==id),v={};document.querySelectorAll(`[data-fk="${id}"]`).forEach(i=>v[i.dataset.vk]=i.value);$('#fr-'+id).textContent=fr(f,v)}
function fmv(){const F=st().fm??=FM0.map(fparse),cs=[...new Set(F.map(f=>f.c))];
 return`<div class="pan"><h3>Fórmulas y calculadoras</h3><p class="meta">Cada cálculo muestra la fórmula que usa. Podés editarla, agregar las tuyas o restaurar las originales. Verificá siempre contra tu protocolo y la bibliografía antes de indicar algo.</p><button class="bt" data-r="fnew">+ Nueva fórmula</button> <button class="add" data-r="frest">Restaurar originales</button></div>`+cs.map(c=>`<details class="g" style="--h:${hue(c)}" data-k="fc${esc(c)}" ${op.has('fc'+c)?'open':''}><summary><span class="gt">${esc(c)}</span><span class="gc">${F.filter(f=>f.c==c).length}</span></summary>${F.filter(f=>f.c==c).map(f=>`<details class="sg" data-k="f${f.id}" ${op.has('f'+f.id)?'open':''}><summary>${esc(f.n)}</summary><div style="padding:4px 16px 14px"><div class="tl">${f.v.map(([k,l,u,d])=>`<label class="f">${esc(l)}${u?' ('+esc(u)+')':''}<input type="number" step="any" data-fk="${f.id}" data-vk="${k}" value="${esc(d)}"></label>`).join('')}</div><div class="pan" style="margin:10px 0"><b id="fr-${f.id}">${fr(f,fdef(f))}</b> ${esc(f.r)}</div><div class="meta">Fórmula: <code>${esc(f.e)}</code></div>${f.t?`<div class="meta">${esc(f.t)}</div>`:''}<button class="add" data-r="fedit" data-i="${f.id}" style="margin-top:8px">Editar</button></div></details>`).join('')}</details>`).join('')}
function fform(f){return`<div class="sheet bk"><div class="eh"><button data-b="c">← Volver</button></div><h3>${f.n?'Editar':'Nueva'} fórmula</h3><label class="f">Categoría<input id="fc" value="${esc(f.c)}"></label><label class="f">Nombre<input id="fn" value="${esc(f.n)}"></label><label class="f">Fórmula (con las claves de las variables)<input id="fe" value="${esc(f.e)}"></label><label class="f">Variables, una por línea: clave:etiqueta:unidad:valor<textarea id="fv">${esc(f.v.map(x=>x.join(':')).join('\n'))}</textarea></label><label class="f">Unidad del resultado<input id="fu" value="${esc(f.r)}"></label><label class="f">Nota<input id="ft" value="${esc(f.t)}"></label><p class="meta" id="fm">Podés usar + - * / ( ) ?: &lt; &gt; y Math.sqrt, Math.pow, Math.log.</p><button class="bt" data-fm="s" data-i="${f.id}">Guardar</button> <button class="add" data-fm="d" data-i="${f.id}">Eliminar</button></div>`}

export { fmv, fcalc };

export const FMR = {
  fnew() { st().fm ??= FM0.map(fparse); ctx.openSheet(fform({ id: 'u' + Date.now(), c: '', n: '', e: '', r: '', t: '', v: [] })); },
  fedit(b) { ctx.openSheet(fform(st().fm.find(x => x.id == b.dataset.i))); },
  frest() { st().fm = [...FM0.map(fparse), ...(st().fm || []).filter(x => x.id[0] == 'u')]; ctx.save(); ctx.render(); ctx.toast('Fórmulas originales restauradas'); }
};

// Botones del formulario de edición (dentro de #bk)
export function formulaSheetClick(e) {
  const b = e.target.closest('[data-fm]'); if (!b) return false;
  const id = b.dataset.i, S = st();
  if (b.dataset.fm == 'd') { S.fm = S.fm.filter(x => x.id != id); ctx.save(); ctx.close(); return true; }
  const f = { id, c: $('#fc').value.trim() || 'Otras', n: $('#fn').value.trim(), e: $('#fe').value.trim(), r: $('#fu').value.trim(), t: $('#ft').value.trim(), v: $('#fv').value.split('\n').map(x => x.trim()).filter(Boolean).map(x => { const q = x.split(':'); return [q[0], q[1] || q[0], q[2] || '', q[3] || '0']; }) };
  if (!f.n || !f.e) { $('#fm').textContent = 'Falta el nombre o la fórmula.'; return true; }
  if (isNaN(fev(f, fdef(f)))) { $('#fm').textContent = 'La fórmula no se puede calcular: revisá las claves y los operadores.'; return true; }
  S.fm ??= FM0.map(fparse);
  const i = S.fm.findIndex(x => x.id == id); i < 0 ? S.fm.push(f) : S.fm[i] = f;
  ctx.save(); ctx.close(); return true;
}
