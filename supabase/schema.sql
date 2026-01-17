-- A.I. KIDS LABS — Schema mínimo (seasons + missions)

create table if not exists public.seasons (
  id text primary key,
  title text not null,
  description text not null,
  image text,
  created_at timestamptz not null default now()
);

create table if not exists public.missions (
  id text primary key,
  season_id text not null references public.seasons(id) on delete cascade,
  numero int not null,
  titulo text not null,
  description text not null,
  thumb text,
  locked boolean not null default false,
  created_at timestamptz not null default now(),
  unique (season_id, numero)
);

create index if not exists missions_season_id_numero_idx on public.missions (season_id, numero);

alter table public.seasons enable row level security;
alter table public.missions enable row level security;

drop policy if exists "public_read_seasons" on public.seasons;
create policy "public_read_seasons"
on public.seasons
for select
to public
using (true);

drop policy if exists "public_read_missions" on public.missions;
create policy "public_read_missions"
on public.missions
for select
to public
using (true);

drop policy if exists "auth_write_seasons" on public.seasons;
create policy "auth_write_seasons"
on public.seasons
for all
to authenticated
using (true)
with check (true);

drop policy if exists "auth_write_missions" on public.missions;
create policy "auth_write_missions"
on public.missions
for all
to authenticated
using (true)
with check (true);

