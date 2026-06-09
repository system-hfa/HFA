-- BLOCO 4/5: Corretiva — lifecycle events append-only + RPCs transacionais para soft-delete/restore.
--
-- Problema identificado no commit 76a3e1a:
--   1. softDeleteEvent faz dois writes sequenciais (update events + upsert tombstone) sem transação.
--   2. event_deletion_tombstones usava upsert (mutável) apesar de ser descrita como append-only.
--   3. restoreSoftDeletedEvent não registrava lifecycle event.
--   4. Sem lock FOR UPDATE → possível race entre soft-delete/restore concorrentes.
--
-- Esta migration:
--   A. Cria event_deletion_events (append-only, protegida por triggers).
--   B. Adiciona triggers append-only em event_deletion_tombstones.
--   C. Cria rpc_soft_delete_event (lock + check + update + lifecycle, atomic).
--   D. Cria rpc_restore_soft_deleted_event (lock + check + update + lifecycle, atomic).

-- ─────────────────────────────────────────
-- A. event_deletion_events (append-only lifecycle)
-- ─────────────────────────────────────────

create table if not exists public.event_deletion_events (
  id           uuid primary key default gen_random_uuid(),
  tenant_id    uuid not null references public.tenants(id) on delete cascade,
  event_id     uuid not null,
  event_status text not null,
  actor_id     uuid null references public.users(id) on delete set null,
  request_id   text null,
  metadata     jsonb not null default '{}'::jsonb,
  created_at   timestamptz not null default now(),
  constraint event_deletion_events_status_check check (
    event_status in (
      'SOFT_DELETED',
      'RESTORED',
      'PURGE_SCHEDULED',
      'PURGE_STARTED',
      'PURGE_FAILED',
      'PURGED'
    )
  )
);

comment on table public.event_deletion_events is
  'Append-only lifecycle audit for event deletion transitions. One row per state change. '
  'Never update or delete rows. Protected by triggers.';

create index if not exists event_deletion_events_tenant_event_idx
  on public.event_deletion_events(tenant_id, event_id, created_at desc);

create index if not exists event_deletion_events_tenant_status_idx
  on public.event_deletion_events(tenant_id, event_status, created_at desc);

-- Prevent DELETE
create or replace function public.prevent_event_deletion_events_delete()
returns trigger language plpgsql security definer set search_path = public, pg_catalog, pg_temp as $$
begin
  raise exception 'event_deletion_events is append-only; delete is not permitted (event_id=%)', old.event_id;
end;
$$;

drop trigger if exists tg_event_deletion_events_no_delete on public.event_deletion_events;
create trigger tg_event_deletion_events_no_delete
before delete on public.event_deletion_events
for each row execute function public.prevent_event_deletion_events_delete();

-- Prevent UPDATE
create or replace function public.prevent_event_deletion_events_update()
returns trigger language plpgsql security definer set search_path = public, pg_catalog, pg_temp as $$
begin
  raise exception 'event_deletion_events is append-only; update is not permitted (event_id=%)', old.event_id;
end;
$$;

drop trigger if exists tg_event_deletion_events_no_update on public.event_deletion_events;
create trigger tg_event_deletion_events_no_update
before update on public.event_deletion_events
for each row execute function public.prevent_event_deletion_events_update();

alter table public.event_deletion_events enable row level security;

drop policy if exists "ede_select_admin" on public.event_deletion_events;
create policy "ede_select_admin"
  on public.event_deletion_events for select
  using (
    tenant_id = public.get_tenant_id()
    and exists (
      select 1 from public.users
      where users.id = auth.uid()
        and users.tenant_id = public.get_tenant_id()
        and users.role = 'admin'::public.user_role
    )
  );

-- INSERT is service-role only in practice (RPCs use security definer).
-- Authenticated grant kept minimal to allow RPC execution from service role client.
grant select on public.event_deletion_events to authenticated;

-- ─────────────────────────────────────────
-- B. Append-only triggers for event_deletion_tombstones
-- ─────────────────────────────────────────

create or replace function public.prevent_event_deletion_tombstones_delete()
returns trigger language plpgsql security definer set search_path = public, pg_catalog, pg_temp as $$
begin
  raise exception 'event_deletion_tombstones is append-only; delete is not permitted (event_id_original=%)', old.event_id_original;
end;
$$;

drop trigger if exists tg_event_deletion_tombstones_no_delete on public.event_deletion_tombstones;
create trigger tg_event_deletion_tombstones_no_delete
before delete on public.event_deletion_tombstones
for each row execute function public.prevent_event_deletion_tombstones_delete();

create or replace function public.prevent_event_deletion_tombstones_update()
returns trigger language plpgsql security definer set search_path = public, pg_catalog, pg_temp as $$
begin
  raise exception 'event_deletion_tombstones is append-only; update is not permitted (event_id_original=%)', old.event_id_original;
end;
$$;

drop trigger if exists tg_event_deletion_tombstones_no_update on public.event_deletion_tombstones;
create trigger tg_event_deletion_tombstones_no_update
before update on public.event_deletion_tombstones
for each row execute function public.prevent_event_deletion_tombstones_update();

-- ─────────────────────────────────────────
-- C. RPC: rpc_soft_delete_event (atomic)
--
-- Idempotência: se o evento já está SOFT_DELETED, retorna o estado atual sem erro.
-- Concorrência: usa SELECT FOR UPDATE no evento para bloquear operações paralelas.
-- Corrective actions abertas bloqueiam a operação.
-- ─────────────────────────────────────────

create or replace function public.rpc_soft_delete_event(
  p_event_id   uuid,
  p_tenant_id  uuid,
  p_actor_id   uuid,
  p_reason     text,
  p_request_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog, pg_temp
as $$
declare
  v_event          record;
  v_analysis_id    uuid;
  v_open_actions   int;
  v_now            timestamptz := clock_timestamp();
  v_recoverable    timestamptz := clock_timestamp() + interval '30 days';
  v_affected       int;
begin
  -- Lock the event row to prevent concurrent modifications.
  select e.id, e.tenant_id, e.title, e.deleted_at, e.deletion_status
  into   v_event
  from   public.events e
  where  e.id = p_event_id
    and  e.tenant_id = p_tenant_id
  for update;

  if not found then
    raise exception 'EVENT_NOT_FOUND';
  end if;

  -- Idempotent: already soft-deleted → return current state.
  if v_event.deleted_at is not null and v_event.deletion_status = 'SOFT_DELETED' then
    return jsonb_build_object(
      'event_id',          p_event_id,
      'status',            'SOFT_DELETED',
      'idempotent',        true,
      'deleted_at',        v_event.deleted_at
    );
  end if;

  -- Reject any non-ACTIVE state.
  if v_event.deleted_at is not null then
    raise exception 'EVENT_NOT_ACTIVE status=%', v_event.deletion_status;
  end if;

  -- Lookup legacy analysis (1:1 UNIQUE relationship).
  select a.id into v_analysis_id
  from   public.analyses a
  where  a.event_id = p_event_id
  limit 1;

  -- Block if open corrective actions exist.
  if v_analysis_id is not null then
    select count(*) into v_open_actions
    from   public.corrective_actions ca
    where  ca.analysis_id = v_analysis_id
      and  ca.tenant_id   = p_tenant_id
      and  ca.status in ('pending', 'in_progress');

    if v_open_actions > 0 then
      raise exception 'EVENT_DELETE_BLOCKED_BY_OPEN_CORRECTIVE_ACTIONS';
    end if;
  end if;

  -- Atomic update (filter on deleted_at IS NULL as final concurrency guard).
  update public.events
  set
    deleted_at        = v_now,
    deleted_by        = p_actor_id,
    deletion_reason   = btrim(p_reason),
    deletion_status   = 'SOFT_DELETED',
    recoverable_until = v_recoverable,
    purge_scheduled_at = null,
    purged_at         = null,
    updated_at        = v_now
  where id         = p_event_id
    and tenant_id  = p_tenant_id
    and deleted_at is null;

  get diagnostics v_affected = row_count;

  if v_affected = 0 then
    raise exception 'EVENT_SOFT_DELETE_CONCURRENT_MODIFICATION';
  end if;

  -- Append lifecycle event (protected by append-only trigger).
  insert into public.event_deletion_events
    (tenant_id, event_id, event_status, actor_id, request_id, metadata)
  values
    (p_tenant_id, p_event_id, 'SOFT_DELETED', p_actor_id, p_request_id,
     jsonb_build_object(
       'recoverable_until', v_recoverable,
       'reason_category',   'USER_REQUEST'
     ));

  return jsonb_build_object(
    'event_id',          p_event_id,
    'status',            'SOFT_DELETED',
    'deleted_at',        v_now,
    'recoverable_until', v_recoverable,
    'idempotent',        false
  );
end;
$$;

comment on function public.rpc_soft_delete_event(uuid, uuid, uuid, text, text) is
  'Atomic soft-delete for a legacy event. Blocks on open corrective actions. '
  'Idempotent for already-soft-deleted events. Uses FOR UPDATE lock for concurrency safety.';

grant execute on function public.rpc_soft_delete_event(uuid, uuid, uuid, text, text) to service_role;

-- ─────────────────────────────────────────
-- D. RPC: rpc_restore_soft_deleted_event (atomic)
--
-- Bloqueia se a janela de recuperação expirou ou se o evento não está SOFT_DELETED.
-- Registra lifecycle event RESTORED.
-- ─────────────────────────────────────────

create or replace function public.rpc_restore_soft_deleted_event(
  p_event_id   uuid,
  p_tenant_id  uuid,
  p_actor_id   uuid,
  p_request_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog, pg_temp
as $$
declare
  v_event    record;
  v_now      timestamptz := clock_timestamp();
  v_affected int;
begin
  -- Lock the event row.
  select e.id, e.tenant_id, e.deleted_at, e.deletion_status, e.recoverable_until
  into   v_event
  from   public.events e
  where  e.id = p_event_id
    and  e.tenant_id = p_tenant_id
  for update;

  if not found then
    raise exception 'EVENT_NOT_FOUND';
  end if;

  if v_event.deleted_at is null or v_event.deletion_status != 'SOFT_DELETED' then
    raise exception 'EVENT_NOT_SOFT_DELETED status=%', coalesce(v_event.deletion_status, 'ACTIVE');
  end if;

  if v_event.recoverable_until is null or v_event.recoverable_until < v_now then
    raise exception 'EVENT_RESTORE_WINDOW_EXPIRED expired_at=%', v_event.recoverable_until;
  end if;

  -- Atomic restore (filter on deletion_status as final concurrency guard).
  update public.events
  set
    deleted_at         = null,
    deleted_by         = null,
    deletion_reason    = null,
    deletion_status    = 'RESTORED',
    recoverable_until  = null,
    purge_scheduled_at = null,
    purged_at          = null,
    updated_at         = v_now
  where id             = p_event_id
    and tenant_id      = p_tenant_id
    and deletion_status = 'SOFT_DELETED';

  get diagnostics v_affected = row_count;

  if v_affected = 0 then
    raise exception 'EVENT_RESTORE_CONCURRENT_MODIFICATION';
  end if;

  -- Append lifecycle event.
  insert into public.event_deletion_events
    (tenant_id, event_id, event_status, actor_id, request_id, metadata)
  values
    (p_tenant_id, p_event_id, 'RESTORED', p_actor_id, p_request_id, '{}'::jsonb);

  return jsonb_build_object(
    'event_id',    p_event_id,
    'status',      'RESTORED',
    'restored_at', v_now
  );
end;
$$;

comment on function public.rpc_restore_soft_deleted_event(uuid, uuid, uuid, text) is
  'Atomic restore of a soft-deleted event. Rejects if recovery window expired. '
  'Uses FOR UPDATE lock for concurrency safety. Appends RESTORED lifecycle event.';

grant execute on function public.rpc_restore_soft_deleted_event(uuid, uuid, uuid, text) to service_role;
