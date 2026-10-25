// Catálogo de «Fórmulas y Scores»: junta los archivos de herramientas y define las categorías.
import fa from './formulas-a.js';
import fb from './formulas-b.js';
import sn from './scores-neuro.js';
import sc from './scores-clinica.js';
import so from './scores-otros.js';
import sg from './scores-organos.js';

export const TOOLS = [...fa, ...fb, ...sn, ...sc, ...so, ...sg];

export const MODS = { f: 'Fórmulas', s: 'Scores y escalas' };
export const MDESC = { f: 'Cálculos, conversiones y dosificación', s: 'Scores, escalas y reglas de decisión clínica' };
export const CATS = {
  f: { 'acido-base': 'Ácido-base', 'medio-interno': 'Medio interno y electrolitos', fluidos: 'Fluidos y quemados', farmacos: 'Fármacos e infusiones', hemodinamia: 'Hemodinamia', respiratorio: 'Respiratorio y ventilación', nefrologia: 'Nefrología', antropometria: 'Antropometría', cardiologia: 'Cardiología', neuro: 'Neurología y neurocrítico', hematologia: 'Hematología y transfusión', gastro: 'Gastroenterología', endocrino: 'Endocrinología', nutricion: 'Nutrición', obstetricia: 'Obstetricia', pediatria: 'Pediatría', epidemiologia: 'Epidemiología y estadística' },
  s: { neuro: 'Neurología y neurocirugía', cardiologia: 'Cardiología', uti: 'Terapia intensiva', 'resp-infecto': 'Respiratorio', nefrologia: 'Nefrología', cirugia: 'Cirugía y riesgo quirúrgico', gastro: 'Gastroenterología y hepatología', hematologia: 'Hematología y trombosis', endocrino: 'Endocrinología', infectologia: 'Infectología', trauma: 'Trauma y emergencias', nutricion: 'Nutrición', obstetricia: 'Obstetricia', pediatria: 'Pediatría', anestesia: 'Anestesia', reuma: 'Reumatología', dermato: 'Dermatología', epidemiologia: 'Epidemiología' }
};
export const tool = id => TOOLS.find(t => t.id == id);
// Una herramienta vive en una sola categoría y se muestra también en las que figuran en `tags` (sin duplicarla).
export const inCat = (t, m, c) => (t.m == m && t.cat == c) || (t.tags || []).includes(m + ':' + c);
