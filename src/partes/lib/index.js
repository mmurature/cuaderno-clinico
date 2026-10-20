// Biblioteca de templates de partes quirúrgicos incorporados
import cg from './cirugia-general.js';
import nc from './neurocirugia.js';
import tr from './traumatologia.js';
export const PBUILTIN = [...cg, ...nc, ...tr];
