alter table public.events
  add column if not exists deleted_at timestamptz null,
  add column if not exists deleted_by uuid null references public.users(id) on delete set null,
  add column if not exists deletion_reason text null,
  add column if not exists deletion_status text not null default 'ACTIVE',
  add column if not exists recoverable_until timestamptz null,
  add column if not exists purge_scheduled_at timestamptz null,
  add column if not exists purged_at timestamptz null;

alter table public.events
  drop constraint if exists events_deletion_status_check;

alter table public.events
  add constraint events_deletion_status_check
  check (
    deletion_status in (
      'ACTIVE',
      'SOFT_DELETED',
      'PURGE_SCHEDULED',
      'PURGE_FAILED',
      'PURGED',
      'RESTORED'
    )
  );

create index if not exists idx_events_tenant_deleted_at on public.events(tenant_id, deleted_at, created_at desc);
create index if not exists idx_events_tenant_deletion_status on public.events(tenant_id, deletion_status, recoverable_until);

create table if not exists public.event_deletion_tombstones (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  event_id_original uuid not null,
  event_title_hash text not null,
  requested_by uuid null references public.users(id) on delete set null,
  requested_at timestamptz not null default now(),
  soft_deleted_at timestamptz null,
  purged_at timestamptz null,
  reason_category text not null,
  request_id text null,
  data_categories jsonb not null default '[]'::jsonb,
  status text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists event_deletion_tombstones_tenant_event_uidx
  on public.event_deletion_tombstones(tenant_id, event_id_original);

create index if not exists event_deletion_tombstones_tenant_status_idx
  on public.event_deletion_tombstones(tenant_id, status, created_at desc);

alter table public.event_deletion_tombstones enable row level security;

drop policy if exists "event_deletion_tombstones_select_admin" on public.event_deletion_tombstones;
create policy "event_deletion_tombstones_select_admin"
  on public.event_deletion_tombstones for select
  using (
    tenant_id = public.get_tenant_id()
    and exists (
      select 1
      from public.users
      where users.id = auth.uid()
        and users.tenant_id = public.get_tenant_id()
        and lower(coalesce(users.role, '')) = 'admin'
    )
  );

drop policy if exists "event_deletion_tombstones_insert_admin" on public.event_deletion_tombstones;
create policy "event_deletion_tombstones_insert_admin"
  on public.event_deletion_tombstones for insert
  with check (
    tenant_id = public.get_tenant_id()
    and exists (
      select 1
      from public.users
      where users.id = auth.uid()
        and users.tenant_id = public.get_tenant_id()
        and lower(coalesce(users.role, '')) = 'admin'
    )
  );

grant select, insert on public.event_deletion_tombstones to authenticated;

comment on table public.event_deletion_tombstones is
  'Append-only tombstones for legacy event deletion lifecycle. Preserve minimal trace after purge.';
