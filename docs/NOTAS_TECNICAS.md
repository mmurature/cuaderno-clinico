# Notas técnicas — cuaderno-v2.html

## Arquitectura
- Un solo archivo HTML con CSS y JS propios, sin framework ni build. Tipografías Fraunces y Plus Jakarta Sans desde Google Fonts (con fallbacks).
- Responsive (mobile-first), modo claro/oscuro automático por `prefers-color-scheme`, paleta pastel por variables CSS. Colores por sistema: `hue()` genera el tono a partir del nombre.
- Persistencia: `localStorage`, clave `cuaderno-v2` (migra desde `cuaderno-v1`), con copia en memoria si el almacenamiento falla. Respaldo manual copiando/pegando el JSON (botón "Respaldo").

## Modelo de datos (objeto `S`)
- `items[]`: `{id, k:'p'|'q', t (título), g (sistema), s (subsistema), e (especialidad/subespecialidad, solo q), ty (gen|tum|vas|tra, solo p), st (0 por ver, 1 en estudio, 2 dominada), nx (fecha próximo repaso), f{campo:texto}, c[{t,d}] checklist, pr[{m,t}] preferencias por médico, l[ids] vínculos bidireccionales}`
- `qb[]`: banco de preguntas `{c categoría, q, o[opciones], a índice correcto, e explicación, s fuente}`
- `rv{}`: estado de repetición espaciada por pregunta `{b caja 0-4, n próxima fecha}`; intervalos [1,2,4,8,16] días; fallar vuelve a caja 0.
- `cs{}`: aciertos/total por categoría. `hist{fecha:{ok,n}}`: sesiones diarias (racha).
- `lg[]`: registro de procedimientos realizados `{d,p,r rol,t tipo,c complicación}`, sin datos del paciente.
- `cfg{t hora, n cantidad, nt avisos, last}`.

## Funciones clave
`load/save/def/seed`, `tree()` (árbol con `<details>`), `drawEd()` (editor de ficha), `qpool()` (arma preguntas desde las fichas: "¿a qué patología corresponde este texto de «etiología»?" con 3 distractores; requiere 4+ fichas del mismo tipo con texto de 25+ caracteres), `R.*` (acciones del repaso y registro), `stats()`.

## Formato para importar preguntas al banco
`[{"c":"Anatomía","q":"…","o":["A","B","C","D"],"a":0,"e":"explicación","s":"fuente"}]`
Las preguntas basadas en bibliografía deben ser revisadas contra la fuente por la usuaria.

## Limitaciones conocidas
- Sin sincronización entre dispositivos (cada navegador guarda lo suyo).
- Los avisos usan la Notification API solo con la pestaña abierta; no hay push real ni alarma confiable. La usuaria debe sumar una alarma en el reloj del celular.
- Si se publica como artifact de Claude: no hay descargas de archivos ni acceso a hosts externos salvo fonts/cdnjs/jsdelivr; por eso el respaldo es por copiar/pegar.
- No se probó con dispositivos reales ni con volumen grande de datos. Contenido médico: las fichas vienen vacías a propósito (la usuaria las completa y verifica). Las 3 preguntas del banco son ejemplos.
- Subespecialidad y especialidad están fusionadas en un campo (`e`).

## Próximos pasos sugeridos
1. Backend con login y sincronización (p. ej. Supabase o Firebase) para el contenido de estudio; los datos de pacientes, solo locales o con cifrado de punta a punta.
2. Convertir en PWA (manifest + service worker) para instalarla y usarla sin conexión; push real o app nativa si se necesitan alarmas confiables.
3. Exportar/importar CSV, Excel y PDF; importación de preguntas desde bibliografía (ver arriba).
4. Fase 2: pendientes con prioridad, marcado de realizados y recordatorios por tiempo según prioridad.
5. Fase 3: planilla por paciente (cama + iniciales + código, sin DNI), con generación determinística de evolución: presentación de caso estilo EE.UU. y evolución diaria en el formato del hospital; borrador editable y reconfirmación de los datos del día.
6. Fase 4: registro de casos tipo ACGME (rol, supervisión, Clavien-Dindo) y tablero ampliado; plantilla específica de neurocirugía con escalas (GCS, Hunt-Hess, Fisher, WFNS, Spetzler-Martin, mJOA, etc.).
7. Más ideas: etiquetas en el banco de preguntas, vista de huecos (fichas casi vacías), modo examen cronometrado.

## Privacidad (importante antes de usar con pacientes reales)
No guardar nombre, DNI ni datos identificables. Revisar la normativa argentina de protección de datos personales e historia clínica y las políticas del hospital. No enviar datos de pacientes a servicios de IA sin autorización institucional.
