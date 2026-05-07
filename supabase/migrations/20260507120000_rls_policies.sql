-- ─────────────────────────────────────────
-- ENTREGA 2 CORRIGIDA: RLS + POLICIES
-- Usa auth.uid() e JWT claims corretamente
-- ─────────────────────────────────────────

-- Função helper no schema PUBLIC (não auth)
create or replace function public.get_tenant_id()
returns uuid
language sql stable
security definer
set search_path = public
as $$
  select nullif(
    current_setting('request.jwt.claims', true)::json
    ->> 'tenant_id',
    ''
  )::uuid;
$$;

-- ─── TENANTS ───
alter table tenants enable row level security;

create policy "tenant_select"
  on tenants for select
  using (id = public.get_tenant_id());

create policy "tenant_update"
  on tenants for update
  using (id = public.get_tenant_id());

-- ─── USERS ───
alter table users enable row level security;

create policy "users_select"
  on users for select
  using (tenant_id = public.get_tenant_id());

create policy "users_insert"
  on users for insert
  with check (tenant_id = public.get_tenant_id());

create policy "users_update"
  on users for update
  using (tenant_id = public.get_tenant_id());

-- ─── EVENTS ───
alter table events enable row level security;

create policy "events_select"
  on events for select
  using (tenant_id = public.get_tenant_id());

create policy "events_insert"
  on events for insert
  with check (tenant_id = public.get_tenant_id());

create policy "events_update"
  on events for update
  using (tenant_id = public.get_tenant_id());

-- ─── ANALYSES ───
alter table analyses enable row level security;

create policy "analyses_select"
  on analyses for select
  using (tenant_id = public.get_tenant_id());

create policy "analyses_insert"
  on analyses for insert
  with check (tenant_id = public.get_tenant_id());

-- ─── CORRECTIVE_ACTIONS ───
alter table corrective_actions enable row level security;

create policy "corrective_actions_select"
  on corrective_actions for select
  using (tenant_id = public.get_tenant_id());

create policy "corrective_actions_insert"
  on corrective_actions for insert
  with check (tenant_id = public.get_tenant_id());

create policy "corrective_actions_update"
  on corrective_actions for update
  using (tenant_id = public.get_tenant_id());

-- ─── CREDIT_TRANSACTIONS ───
alter table credit_transactions enable row level security;

create policy "credit_transactions_select"
  on credit_transactions for select
  using (tenant_id = public.get_tenant_id());

-- ─── CREDIT_PACKAGES ───
alter table credit_packages enable row level security;

create policy "credit_packages_select"
  on credit_packages for select
  using (is_active = true);
