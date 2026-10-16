# Meditas

(Antes “Cuaderno clínico”.) App web instalable (PWA) para estudiar patologías y procedimientos, armar evoluciones y usar calculadoras clínicas; más adelante, para el trabajo diario de la residencia. Funciona sin conexión y en celular y compu. Si se configura Supabase, sincroniza entre dispositivos.

## Estructura

```
index.html            página principal
src/app.js            interfaz: rutas, navegación, Hoy, fichas (lectura/edición), repaso, Más, hojas
src/icons.js          íconos y logo en SVG
src/theme.js          identidades visuales (pastel, cuaderno, clínico) y modo claro/oscuro
src/data.js           plantillas de fichas, modelo de datos y utilidades
src/taxonomy.js       clasificación por defecto: capítulos y temas, especialidades
src/evolucion.js      plantillas de evolución (normal / alterado / no evaluado)
src/formulas.js       fórmulas y calculadoras editables
src/store.js          guardado local en IndexedDB (migra desde los prototipos v1/v2)
src/backup.js         respaldo .json y exportación .csv
src/sync.js           sincronización opcional con Supabase
supabase/schema.sql   tabla y permisos para la sincronización
public/               íconos
.github/workflows/    deploy automático a GitHub Pages
legacy/, docs/        prototipos originales y documentación del traspaso
```

## Correr en la compu

Requiere Node 20.19+ o 22.12+.

```
npm install
npm run dev
```

Abrí la dirección que muestra (http://localhost:5173). Para probar desde el celular en la misma red: `npm run dev -- --host` y abrí la IP que aparece.

## Publicar en GitHub Pages

1. Creá un repo vacío en GitHub llamado `cuaderno-clinico`.
2. En esta carpeta:
   ```
   git init
   git add .
   git commit -m "Base técnica: Vite + PWA + IndexedDB"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/cuaderno-clinico.git
   git push -u origin main
   ```
3. En el repo: Settings → Pages → Source: **GitHub Actions**.
4. Cada push a `main` publica la app en `https://<tu-usuario>.github.io/cuaderno-clinico/`.

## Activar la sincronización (Supabase)

1. Creá un proyecto gratis en https://supabase.com.
2. SQL Editor → New query → pegá `supabase/schema.sql` → Run.
3. Authentication → URL Configuration: en **Site URL** y **Redirect URLs** poné `https://<tu-usuario>.github.io/cuaderno-clinico/` (y `http://localhost:5173/` para desarrollo).
4. Project Settings → API: copiá la **Project URL** y la clave **anon public**.
5. En GitHub: Settings → Secrets and variables → Actions → pestaña **Variables** → agregá `SUPABASE_URL` y `SUPABASE_ANON_KEY`. Volvé a correr el workflow (Actions → Deploy → Run workflow).
6. Para desarrollo local: copiá `.env.example` como `.env` y completá los mismos valores.

La clave anon es pública por diseño: la seguridad la dan las reglas de Row Level Security del `schema.sql` (cada usuaria solo ve su fila).

### Cómo sincroniza

- Todo se guarda primero en el dispositivo; la nube recibe los cambios unos segundos después.
- Si los dos dispositivos cambiaron algo sin sincronizar, gana el cambio más reciente y el otro queda guardado como **copia automática** (se puede restaurar desde Respaldo).
- Los datos de pacientes (fase 3) nunca se suben: van a vivir cifrados solo en el dispositivo.

## Pasar los datos del prototipo

En el prototipo viejo: Respaldo → Copiar. En la app nueva: Respaldo → pegar en “Traer datos del prototipo” → Restaurar. Si la app nueva se abre en el mismo navegador y origen que el prototipo, la migración es automática.

## Privacidad

No cargar nombre, DNI ni datos identificables de pacientes. Antes de usarla con casos reales, revisar la Ley 25.326 (protección de datos personales), la Ley 26.529 (derechos del paciente e historia clínica) y las políticas del hospital.
