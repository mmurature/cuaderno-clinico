-- Cuaderno clínico: tabla de sincronización.
-- Pegar y ejecutar en Supabase → SQL Editor → New query.
-- Un documento JSON por usuaria con el contenido de estudio (fichas, preguntas, repasos, registro).
-- NO se guardan datos de pacientes acá.

create table if not exists public.cuadernos (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- La hora de cada cambio la pone el servidor (evita problemas con relojes de distintos dispositivos).
create or replace function public.cuadernos_touch() returns trigger
language plpgsql as $$
begin
  new.updated_at := clock_timestamp();
  return new;
end $$;

drop trigger if exists cuadernos_touch on public.cuadernos;
create trigger cuadernos_touch before insert or update on public.cuadernos
  for each row execute function public.cuadernos_touch();

-- Seguridad: cada usuaria ve y modifica solo su propia fila.
alter table public.cuadernos enable row level security;

drop policy if exists "leer lo propio" on public.cuadernos;
create policy "leer lo propio" on public.cuadernos
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "crear lo propio" on public.cuadernos;
create policy "crear lo propio" on public.cuadernos
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "editar lo propio" on public.cuadernos;
create policy "editar lo propio" on public.cuadernos
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
