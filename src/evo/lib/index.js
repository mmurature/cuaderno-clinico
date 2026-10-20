// Biblioteca de plantillas de evolución incorporadas
import general, { MODULES } from './general.js';
import neuroA from './neuro-a.js';
import neuroB from './neuro-b.js';
import clasicas from './clasicas.js';

export const BUILTIN = [...general, ...neuroA, ...neuroB, ...clasicas];
export const CATS = ['Clínica general', 'Neurología · Examen neurológico', 'Neurología · Patologías y situaciones neuroquirúrgicas'];
export { MODULES };
