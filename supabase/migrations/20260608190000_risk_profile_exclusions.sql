create table if not exists public.risk_profile_exclusions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  source_type text not null,
  source_id uuid not null,
  excluded_by uuid not null,
  excluded_at timestamptz not null default now(),
  reason text null,
  restored_by uuid null,
  restored_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint risk_profile_exclusions_source_type_check
    check (source_type in ('legacy_event', 'sera_vnext_analysis'))
);

create unique index if not exists risk_profile_exclusions_active_source_uidx
  on public.risk_profile_exclusions(tenant_id, source_type, source_id)
  where restored_at is null;

create index if not exists risk_profile_exclusions_tenant_time_idx
  on public.risk_profile_exclusions(tenant_id, excluded_at desc);

create index if not exists risk_profile_exclusions_source_lookup_idx
  on public.risk_profile_exclusions(tenant_id, source_type, source_id, restored_at);

drop trigger if exists set_risk_profile_exclusions_updated_at on public.risk_profile_exclusions;
create trigger set_risk_profile_exclusions_updated_at
before update on public.risk_profile_exclusions
for each row execute function public.set_updated_at();

alter table public.risk_profile_exclusions enable row level security;

create policy "risk_profile_exclusions_select"
  on public.risk_profile_exclusions for select
  using (tenant_id = public.get_tenant_id());

create policy "risk_profile_exclusions_insert"
  on public.risk_profile_exclusions for insert
  with check (tenant_id = public.get_tenant_id());

create policy "risk_profile_exclusions_update"
  on public.risk_profile_exclusions for update
  using (tenant_id = public.get_tenant_id());

grant select, insert, update on public.risk_profile_exclusions to authenticated;
