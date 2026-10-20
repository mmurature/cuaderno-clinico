// Evolución clínica general por módulos (A–K del documento) y módulos independientes.
export default [
  {
    id: 'cl-general', n: 'Evolución general por sistemas', cat: 'Clínica general', v: 1,
    d: 'Estado general, signos vitales, examen por sistemas, balance, dispositivos, laboratorio y plan. Activá solo los módulos que necesites.',
    secs: [
      { id: 'eg', h: 'Estado general', f: [
        { id: 'eg', l: 'Estado general', n: 'Buen estado general', a: ['Regular estado general', 'Mal estado general'], one: true, pri: 1 },
        { id: 'sensorio', l: 'Sensorio', n: 'lúcido', a: ['Somnoliento', 'Obnubilado', 'Estuporoso', 'Comatoso', 'Agitado', 'Confuso'], ne: 'sensorio no evaluable', j: ', ', nom: 'del sensorio', pri: 1 },
        { id: 'orient', k: 'orient', j: ', ' },
        { id: 'com', l: 'Comunicación', n: 'comunicación adecuada', a: ['disártrico', 'afásico', 'anártrico', 'con mutismo'], ne: 'comunicación no evaluable', j: ', ' },
        { id: 'colab', l: 'Colaboración', n: 'colaborador', a: ['Parcialmente colaborador', 'No colaborador'], one: true, j: ', ' }
      ] },
      { id: 'sv', h: 'Signos vitales', f: [{ id: 'sv', k: 'vitals' }] },
      { id: 'resp', h: 'Aparato respiratorio', f: [
        { id: 'patron', l: 'Patrón respiratorio', n: 'Eupneico', a: ['Taquipneico', 'Bradipneico', 'Apneico', 'Con uso de músculos accesorios', 'Con tiraje'], nom: 'de la mecánica respiratoria' },
        { id: 'oxi', l: 'Oxigenación', n: 'al aire ambiente', a: [['Cánula nasal', 'con cánula nasal'], ['Máscara simple', 'con máscara simple'], ['Máscara con reservorio', 'con máscara con reservorio'], ['Venturi', 'con máscara Venturi'], ['Alto flujo', 'con cánula nasal de alto flujo'], ['VNI', 'con ventilación no invasiva'], ['ARM', 'en asistencia respiratoria mecánica']], one: true, d: 'flujo o FiO₂ (p. ej. a 2 L/min)', j: ', ' },
        { id: 'ausc', l: 'Auscultación', n: 'Murmullo vesicular conservado bilateralmente', a: ['Murmullo vesicular disminuido', 'Murmullo vesicular abolido'], d: 'localización (p. ej. en base derecha)', nom: 'de la auscultación' },
        { id: 'ruidos', l: 'Ruidos agregados', n: 'sin ruidos agregados', ap: 'con ', a: ['sibilancias', 'roncus', 'crepitantes', 'estertores', 'estridor', 'roce pleural'], d: 'distribución (bilaterales, bibasales, en hemitórax derecho…)', j: ', ' }
      ] },
      { id: 'cv', h: 'Aparato cardiovascular', f: [
        { id: 'rc', l: 'Ruidos cardíacos', n: 'Ruidos cardíacos normofonéticos, ritmo regular, sin soplos', a: ['Ritmo irregular', 'Ruidos cardíacos hipofonéticos', 'Soplo sistólico', 'Soplo diastólico', 'R3', 'R4'], d: 'foco e intensidad del soplo' },
        { id: 'pulsos', l: 'Pulsos', n: 'Pulsos periféricos presentes y simétricos', a: ['Pulsos periféricos disminuidos', 'Pulsos periféricos ausentes', 'Pulsos asimétricos'], d: 'localización' },
        { id: 'edemas', l: 'Edemas', n: 'Sin edemas', a: ['Edema bilateral de miembros inferiores', 'Edema de miembro inferior derecho', 'Edema de miembro inferior izquierdo', 'Edema generalizado'], sc: { l: 'Godet', o: ['+', '++', '+++', '++++'], p: 'con godet {v}' }, nom: 'de los edemas' }
      ] },
      { id: 'abd', h: 'Abdomen', f: [
        { id: 'insp', l: 'Inspección', n: 'Abdomen plano', a: ['Abdomen globoso', 'Abdomen distendido'], one: true },
        { id: 'palp', l: 'Palpación', n: 'blando, depresible e indoloro', a: ['blando y depresible, doloroso a la palpación', 'doloroso a la palpación', 'tenso'], one: true, j: ', ' },
        { id: 'dolor', l: 'Localización del dolor', a: ['en epigastrio', 'en hipocondrio derecho', 'en hipocondrio izquierdo', 'en flanco derecho', 'en flanco izquierdo', 'en fosa ilíaca derecha', 'en fosa ilíaca izquierda', 'en hipogastrio', 'en forma difusa'], j: ' ' },
        { id: 'def', l: 'Defensa', n: 'sin defensa ni signos de irritación peritoneal', a: ['con defensa', 'con contractura', 'con signos de irritación peritoneal'], d: 'localización (p. ej. local)', j: ', ' },
        { id: 'rha', l: 'Ruidos hidroaéreos', n: 'con ruidos hidroaéreos presentes', a: ['con ruidos hidroaéreos aumentados', 'con ruidos hidroaéreos disminuidos', 'con ruidos hidroaéreos ausentes'], one: true, j: ', ' },
        { id: 'otros', l: 'Otros hallazgos', n: 'Sin visceromegalias', a: ['Masa palpable', 'Hepatomegalia', 'Esplenomegalia', 'Ascitis'], d: 'localización y características' }
      ] },
      { id: 'ext', h: 'Extremidades', f: [
        { id: 'perf', l: 'Perfusión', n: 'Extremidades con perfusión y temperatura conservadas', a: ['Perfusión distal disminuida', 'Extremidades frías', 'Palidez de extremidades', 'Cianosis distal', 'Eritema de extremidades'], d: 'localización' },
        { id: 'pex', l: 'Pulsos distales', n: 'pulsos distales conservados', a: ['pulsos distales disminuidos', 'pulsos distales ausentes'], d: 'cuáles', j: ', ' },
        { id: 'edex', l: 'Edemas', n: 'sin edemas', a: ['con edema unilateral', 'con edema bilateral'], d: 'localización', j: ', ' }
      ] },
      { id: 'piel', h: 'Piel', f: [
        { id: 'color', l: 'Coloración', n: 'Piel normocoloreada', a: ['Palidez cutánea', 'Ictericia', 'Cianosis', 'Eritema', 'Diaforesis'] },
        { id: 'les', l: 'Lesiones', n: 'sin lesiones', ap: 'con ', a: ['eritema', 'máculas', 'pápulas', 'vesículas', 'ampollas', 'úlcera', 'escara', 'equimosis', 'hematoma'], d: 'localización (p. ej. en región sacra)', j: ', ' }
      ] },
      { id: 'neu', h: 'Neurológico', off: true, f: [
        { id: 'gcs', k: 'gcs' },
        { id: 'pup', k: 'pupils' },
        { id: 'neuro', l: 'Examen neurológico', n: 'Sin déficit motor ni sensitivo focal', a: ['Déficit motor focal', 'Déficit sensitivo focal', 'Signos meníngeos', 'Alteración de pares craneales'], d: 'detalle y lateralidad' }
      ] },
      { id: 'bal', h: 'Balance y diuresis', off: true, f: [
        { id: 'diu', k: 'num', l: 'Diuresis (mL/24 h)', p: 'Diuresis de {v} mL en 24 h', u: 'mL' },
        { id: 'bal', k: 'num', l: 'Balance (mL)', p: 'balance de {v} mL', u: 'mL', j: ', ' },
        { id: 'catarsis', l: 'Catarsis', n: 'catarsis positiva', a: ['sin catarsis', 'catarsis líquida'], d: 'días o características', j: ', ' }
      ] },
      { id: 'disp', h: 'Dispositivos y drenajes', off: true, f: [{ id: 'dev', k: 'dev' }] },
      { id: 'lab', h: 'Laboratorio', off: true, f: [{ id: 'lab', k: 'lab' }] },
      { id: 'est', h: 'Estudios complementarios', off: true, f: [{ id: 'est', k: 'text', l: 'Estudios', p: '{v}', ph: 'Radiografía de tórax sin infiltrados' }] },
      { id: 'evol', h: 'Evolución respecto de controles previos', off: true, f: [{ id: 'evol', k: 'text', l: 'Evolución', p: '{v}', ph: 'Evoluciona con mejoría del dolor abdominal' }] },
      { id: 'plan', h: 'Conducta y plan', off: true, f: [{ id: 'plan', k: 'text', l: 'Conducta', p: '{v}', ph: 'Se rota esquema antibiótico según cultivos' }] }
    ]
  },
  { id: 'cl-sv', n: 'Signos vitales', cat: 'Clínica general', v: 1, d: 'Módulo independiente', secs: [{ id: 'sv', h: 'Signos vitales', f: [{ id: 'sv', k: 'vitals' }] }] },
  { id: 'cl-lab', n: 'Laboratorio', cat: 'Clínica general', v: 1, d: 'Valores con unidades y rango de referencia; se marca lo aumentado o disminuido', secs: [{ id: 'lab', h: 'Laboratorio', f: [{ id: 'lab', k: 'lab' }] }] },
  { id: 'cl-dev', n: 'Dispositivos y drenajes', cat: 'Clínica general', v: 1, d: 'Catéteres, sondas, DVE y drenajes: permeabilidad, débito y sitio de inserción', secs: [{ id: 'dev', h: 'Dispositivos y drenajes', f: [{ id: 'dev', k: 'dev' }] }] }
];

// Módulos que se pueden sumar a cualquier evolución
export const MODULES = [
  { id: 'mx-sv', h: 'Signos vitales', f: [{ id: 'mx_sv', k: 'vitals' }] },
  { id: 'mx-neu', h: 'Glasgow y pupilas', f: [{ id: 'mx_gcs', k: 'gcs' }, { id: 'mx_pup', k: 'pupils' }] },
  { id: 'mx-dev', h: 'Dispositivos y drenajes', f: [{ id: 'mx_dev', k: 'dev' }] },
  { id: 'mx-lab', h: 'Laboratorio', f: [{ id: 'mx_lab', k: 'lab' }] },
  { id: 'mx-est', h: 'Estudios complementarios', f: [{ id: 'mx_est', k: 'text', l: 'Estudios', p: '{v}', ph: 'TC de control sin cambios' }] },
  { id: 'mx-plan', h: 'Conducta y plan', f: [{ id: 'mx_plan', k: 'text', l: 'Conducta', p: '{v}', ph: 'Control neurológico cada 2 h' }] }
];
