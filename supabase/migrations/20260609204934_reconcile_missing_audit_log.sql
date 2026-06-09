-- The remote migration history contains 20260519001000, but public.audit_log
-- was absent in staging. Reconcile the schema additively without rewriting history.

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  tenant_id uuid null,
  user_id uuid null,
  request_id text null,
  event_type text not null,
  entity_type text null,
  entity_id uuid null,
  route text null,
  method text null,
  status text not null default 'success',
  metadata jsonb not null default '{}'::jsonb,
  constraint audit_log_event_type_nonempty check (event_type <> ''),
  constraint audit_log_status_values check (status in ('success', 'partial', 'failed', 'blocked'))
);

create index if not exists idx_audit_log_tenant_time
  on public.audit_log(tenant_id, created_at desc);

create index if not exists idx_audit_log_request_id
  on public.audit_log(request_id)
  where request_id is not null;

create index if not exists idx_audit_log_event_type_time
  on public.audit_log(event_type, created_at desc);

create index if not exists idx_audit_log_entity
  on public.audit_log(entity_type, entity_id)
  where entity_type is not null;

alter table public.audit_log enable row level security;

drop policy if exists "audit_log_service_role_only" on public.audit_log;
create policy "audit_log_service_role_only"
  on public.audit_log
  for all
  using (false)
  with check (false);

revoke all on public.audit_log from public, anon, authenticated;

comment on table public.audit_log is
  'Durable service-role-only audit log. Never store narratives, tokens, secrets, or PII in metadata.';
