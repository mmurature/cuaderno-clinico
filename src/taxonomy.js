// Clasificación por defecto. Es editable desde la app (“Editar clasificación”) y se guarda en S.tx.
// Patologías: capítulo (especialidad) > tema > fichas (subtemas).
// Procedimientos: especialidad > subespecialidad > fichas.

export const CAPITULOS = {
  'Cardiología': ['Electrocardiograma normal', 'Dolor precordial', 'Enfermedades de la aorta', 'Hipertensión en pacientes internados', 'Insuficiencia cardíaca', 'Enfermedad valvular', 'Miocardiopatías', 'Enfermedades del pericardio', 'Taquiarritmias', 'Bradiarritmias', 'Síncope', 'Enfermedad vascular periférica', 'Riesgo quirúrgico'],
  'Neumonología': ['Pruebas funcionales', 'Disnea', 'Asma', 'Enfermedad pulmonar obstructiva crónica', 'Neumoconiosis', 'Enfermedad pulmonar intersticial', 'Hemoptisis', 'Nódulo pulmonar solitario', 'Síndrome de apnea obstructiva del sueño', 'Tromboembolismo pulmonar', 'Hipertensión pulmonar', 'Enfermedades de la pleura', 'Insuficiencia respiratoria', 'Asistencia ventilatoria mecánica invasiva y ventilación no invasiva', 'Síndrome de distrés respiratorio agudo'],
  'Gastroenterología': ['Hemorragia digestiva', 'Disfagia', 'Abdomen agudo', 'Patología isquémica intestinal', 'Diarrea, constipación, íleo', 'Hepatitis virales', 'Enfermedades infiltrativas del hígado', 'Insuficiencia hepática', 'Enfermedad vascular hepática', 'Cirrosis y complicaciones', 'Enfermedades de la vía biliar', 'Pancreatitis'],
  'Nefrología': ['Insuficiencia renal aguda', 'Insuficiencia renal crónica', 'Estado ácido base', 'Metabolismo fosfocálcico', 'Alteraciones del sodio', 'Trastornos del potasio', 'Análisis de orina', 'Enfermedad glomerular', 'Enfermedad túbulointersticial', 'Enfermedad vascular renal', 'Litiasis renal'],
  'Hematología': ['Anemia', 'Anemia aplásica', 'Síndrome mieloproliferativo crónico - síndrome mielodisplásico', 'Leucemias agudas', 'Linfomas', 'Enfermedad de células plasmáticas', 'Enfermedad por IgG4', 'Microangiopatía y trastornos plaquetarios', 'Coagulopatía e hipercoagulabilidad', 'Trasplante de médula ósea'],
  'Oncología': ['Melanoma', 'Cáncer de pulmón', 'Cáncer de mama', 'Cáncer ginecológico', 'Cáncer de vejiga', 'Cáncer de próstata y testículo', 'Cáncer de colon', 'Cáncer de vía biliar y páncreas', 'Tumor primario de origen desconocido', 'Emergencias oncológicas', 'Toxicidad limitante de la radioterapia y la quimioterapia'],
  'Infectología': ['Endocarditis infecciosa', 'Infecciones de la piel y tejidos blandos', 'Osteomielitis', 'Infección por Clostridium difficile', 'Enfermedades de transmisión sexual', 'Infección urinaria', 'Meningitis aguda', 'Encefalitis y absceso cerebral', 'Infecciones de la vía aérea superior', 'Neumonía aguda de la comunidad', 'Infecciones por Herpes virus', 'Síndrome mononucleosiforme', 'Parasitosis intestinales frecuentes', 'Tuberculosis', 'Virus de la inmunodeficiencia humana', 'Fiebre de origen desconocido', 'Infecciones intrahospitalarias', 'Neutropenia febril y micosis oportunistas', 'Infecciones en trasplantados', 'Uso racional de antibacterianos'],
  'Endocrinología': ['Patología hipotálamo-hipofisaria', 'Patología suprarrenal', 'Patología tiroidea', 'Patología paratiroidea', 'Diabetes tipo I y II', 'Dislipemia', 'Osteoporosis', 'Enfermedad de Paget', 'Porfirias'],
  'Reumatología': ['Monoartritis aguda', 'Artritis reumatoide', 'Espondiloartropatías seronegativas', 'Lupus eritematoso sistémico', 'Vasculitis', 'Esclerodermia y síndrome de Sjögren', 'Crioglobulinemia', 'Sarcoidosis', 'Amiloidosis', 'Enfermedad inflamatoria intestinal', 'Artrosis y fibromialgia', 'Enfermedad de Still del adulto'],
  'Neurología': ['Síndrome confusional agudo', 'Convulsiones', 'Mareos y vértigo', 'Accidente cerebrovascular', 'Enfermedad de la unión neuromuscular', 'Neuropatía periférica', 'Enfermedad muscular', 'Esclerosis lateral amiotrófica y esclerosis múltiple', 'Síndrome medular agudo', 'Cefalea', 'Demencia', 'Enfermedad de Parkinson', 'Tumores del sistema nervioso central', 'Hipertensión endocraneana'],
  'Dermatología': ['Reacción cutánea a fármacos', 'Alergia'],
  'Oftalmología': ['Ojo rojo', 'Secreción ocular'],
  'Otorrinolaringología': ['Otitis media aguda y otitis media crónica', 'Otitis externa', 'Hipoacusia'],
  'Toxicología': ['Decontaminación. Antídotos de uso común', 'Síndromes relacionados al consumo inadecuado de alcohol']
};

export const ESPECIALIDADES = {
  'Neurocirugía': ['Vascular', 'Oncología', 'Columna', 'Funcional y epilepsia', 'Pediátrica', 'Trauma', 'Hidrocefalia', 'Nervio periférico'],
  'Cirugía general': ['Esofagogástrica', 'Colorrectal', 'Hepatobiliopancreática', 'Pared abdominal', 'Endocrina', 'Mama']
};

export const TX_VERSION = 2;
const clone = o => JSON.parse(JSON.stringify(o));

// Devuelve la clasificación del estado, creándola o migrándola si hace falta.
// Migración v1 → v2: patologías pasan de “sistemas” a “capítulos”; procedimientos quedan solo con
// Neurocirugía y Cirugía general. Se conservan los grupos viejos que ya tengan fichas, para no esconder nada.
export function ensureTx(S) {
  if (S.tx && S.txv >= TX_VERSION) return S.tx;
  const old = S.tx || { p: {}, q: {} }, n = { p: clone(CAPITULOS), q: clone(ESPECIALIDADES) };
  for (const k of ['p', 'q']) {
    const G = i => (k == 'q' ? i.e : i.g);
    S.items.filter(i => i.k == k && G(i)).forEach(i => {
      const g = G(i), s = i.s;
      n[k][g] ??= [];
      if (s && !n[k][g].includes(s)) n[k][g].push(s);
    });
    // grupos agregados a mano por la usuaria en la versión anterior
    Object.entries(old[k] || {}).forEach(([g, subs]) => {
      if (k == 'q' && !n[k][g] && !S.items.some(i => i.k == k && G(i) == g)) return; // especialidades por defecto viejas sin uso: se descartan
      if (k == 'p' && !n[k][g] && !S.items.some(i => i.k == k && G(i) == g)) return; // sistemas viejos sin fichas: se descartan
      n[k][g] ??= [];
      subs.forEach(s => { if (!n[k][g].includes(s) && S.items.some(i => i.k == k && G(i) == g && i.s == s)) n[k][g].push(s); });
    });
  }
  S.tx = n; S.txv = TX_VERSION;
  return n;
}

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];
export const roman = n => ROM[n] || String(n + 1);
