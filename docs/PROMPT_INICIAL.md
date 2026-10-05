# Prompt de especificación (versión acordada)

Quiero que actúes como mi desarrollador full-stack y diseñador de producto. Vamos a construir, paso a paso, una web app (mobile-first, usable en el celular durante la guardia) que funcione como base de datos personal de patologías y procedimientos para un residente de especialidad quirúrgica.

## Usuaria y contexto
Soy médica recién recibida en Argentina, preparándome para una residencia en neurocirugía. La app es para mi uso diario como residente: registrar y consultar rápido pacientes/patologías, procedimientos, evolución y pendientes. Debe ser rápida, ordenada y usable con una mano.

## Principios de diseño
- Carga rápida: menos de 60 segundos por caso. Listas desplegables, plantillas, valores recientes autocompletados, campos opcionales colapsados.
- Estandarizada pero configurable: campos con vocabularios controlados (desplegables editables), más un campo de notas libres.
- Todo filtrable y exportable (CSV/Excel y PDF). Los datos nunca quedan atrapados en la app.
- Tablero de resumen que muestre en qué categorías hay poca experiencia.
- Funciona sin conexión o con sincronización simple.

## Privacidad (requisito de diseño)
- No almacenar nombre completo, DNI ni datos directamente identificables. Usar ID propio (iniciales + número interno o código generado) y edad/sexo.
- Datos cifrados, login obligatorio y opción de que los datos queden solo en el dispositivo.
- Revisar qué normativa aplica en Argentina (protección de datos personales e historia clínica) antes de usarlo con casos reales.

## Módulos
1. Patologías (ficha del caso): fecha, ID anónimo, edad, sexo, diagnóstico (CIE-10), servicio/sala, antecedentes, estudios, tratamiento, estado, notas.
2. Procedimientos (registro operatorio, inspirado en case logs ACGME): fecha, ID del caso, uno o varios procedimientos por caso, rol (cirujano / ayudante / asistente docente / observador), nivel de supervisión, electivo/urgencia, hospital, médico a cargo, código de procedimiento configurable, duración, complicaciones, reintervención.
3. Seguimiento postoperatorio: alta, medicación, controles (1.º, 2.º, 30 y 90 días), evolución y resultado funcional.
4. Pase de guardia / pendientes: lista con tareas pendientes, estudios por pedir, interconsultas; vista imprimible.
5. Tablero y reportes: casos por categoría y rol, electivo vs urgencia, tasa de complicaciones, línea de tiempo, exportación.
6. Fichas de referencia propias: resúmenes cargados por la usuaria. La app NO genera recomendaciones clínicas por sí sola.

## Plantillas
- Fase A, genérica quirúrgica (cualquier especialidad).
- Fase B, neurocirugía: subespecialidades (vascular, oncología, columna, TCE, hidrocefalia, funcional, pediátrica, periférico); escalas (GCS, mRS, KPS, GOS, ASA, Hunt-Hess, Fisher modificada, WFNS, Spetzler-Martin, ASIA/Frankel, mJOA/Nurick, Marshall/Rotterdam, índice de Evans); tumores (localización, lateralidad, grado OMS, marcadores moleculares, extensión de resección); procedimientos (craneotomía, DVE, DVP, laminectomía/artrodesis, embolización/clipado, biopsia, PIC, etc.); complicaciones (Clavien-Dindo), reoperación a 30 días, infección, fístula de LCR, déficit nuevo.

## Forma de trabajo
- Proponer 2 o 3 opciones de tecnología con pros y contras y recomendar una (la usuaria es principiante).
- MVP primero, con datos ficticios.
- Explicar cada paso en lenguaje simple.
- Avisar si algo pedido es mala idea o hay algo mejor.
