-- Final additive closure for recoverable event deletion and synthetic-only purge.
-- Previously applied migrations are intentionally not modified here.

alter table public.event_deletion_events
  drop constraint if exists event_deletion_events_status_check;

alter table public.event_deletion_events
  add constraint event_deletion_events_status_check check (
    event_status in (
      'DELETION_IMPACT_VIEWED',
      'DELETION_REQUESTED',
      'SOFT_DELETED',
      'RESTORED',
      'PURGE_SCHEDULED',
      'PURGE_STARTED',
      'STORAGE_DELETE_FAILED',
      'PURGE_FAILED',
      'PURGED',
      'HARD_DELETE_DENIED'
    )
  );

create unique index if not exists event_deletion_events_idempotency_uidx
  on public.event_deletion_events(tenant_id, event_id, event_status, request_id)
  where request_id is not null;

drop policy if exists "event_deletion_tombstones_insert_admin" on public.event_deletion_tombstones;
revoke insert on public.event_deletion_tombstones from authenticated;

create or replace function public.assert_event_deletion_admin(
  p_tenant_id uuid,
  p_actor_id uuid
)
returns void
language plpgsql
security definer
set search_path = public, pg_catalog, pg_temp
as $$
begin
  if not exists (
    select 1
    from public.users u
    where u.id = p_actor_id
      and u.tenant_id = p_tenant_id
      and u.role = 'admin'::public.user_role
      and u.is_active = true
  ) then
    raise exception 'EVENT_DELETE_FORBIDDEN';
  end if;
end;
$$;

revoke all on function public.assert_event_deletion_admin(uuid, uuid) from public, anon, authenticated;
grant execute on function public.assert_event_deletion_admin(uuid, uuid) to service_role;

create or replace function public.request_event_soft_delete(
  p_event_id uuid,
  p_tenant_id uuid,
  p_actor_id uuid,
  p_reason text,
  p_confirmation_title text,
  p_request_id text,
  p_unknown_dependencies text[] default '{}'::text[]
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog, pg_temp
as $$
declare
  v_event record;
  v_analysis_id uuid;
  v_open_actions integer := 0;
  v_now timestamptz := clock_timestamp();
  v_recoverable_until timestamptz := clock_timestamp() + interval '30 days';
  v_affected integer;
begin
  perform public.assert_event_deletion_admin(p_tenant_id, p_actor_id);

  if p_request_id is null or length(btrim(p_request_id)) = 0 then
    raise exception 'EVENT_DELETE_CONFLICT';
  end if;
  if p_reason is null or length(btrim(p_reason)) = 0 then
    raise exception 'EVENT_DELETE_REASON_REQUIRED';
  end if;
  if coalesce(array_length(p_unknown_dependencies, 1), 0) > 0 then
    raise exception 'EVENT_DELETE_IMPACT_INCOMPLETE';
  end if;

  select e.id, e.title, e.deleted_at, e.deletion_status, e.recoverable_until
  into v_event
  from public.events e
  where e.id = p_event_id
    and e.tenant_id = p_tenant_id
  for update;

  if not found then
    raise exception 'EVENT_NOT_FOUND';
  end if;

  if exists (
    select 1
    from public.event_deletion_events de
    where de.tenant_id = p_tenant_id
      and de.event_id = p_event_id
      and de.event_status = 'SOFT_DELETED'
      and de.request_id = p_request_id
  ) then
    return jsonb_build_object(
      'event_id', p_event_id,
      'status', 'SOFT_DELETED',
      'deleted_at', v_event.deleted_at,
      'recoverable_until', v_event.recoverable_until,
      'idempotent', true
    );
  end if;

  if v_event.title is distinct from p_confirmation_title then
    raise exception 'EVENT_DELETE_TITLE_MISMATCH';
  end if;
  if v_event.deleted_at is not null then
    raise exception 'EVENT_DELETE_ALREADY_DELETED';
  end if;

  select a.id into v_analysis_id
  from public.analyses a
  where a.event_id = p_event_id
    and a.tenant_id = p_tenant_id
  limit 1;

  if v_analysis_id is not null then
    select count(*) into v_open_actions
    from public.corrective_actions ca
    where ca.tenant_id = p_tenant_id
      and ca.analysis_id = v_analysis_id
      and ca.status in ('pending', 'in_progress');
  end if;

  if v_open_actions > 0 then
    raise exception 'EVENT_DELETE_CORRECTIVE_ACTION_BLOCK';
  end if;

  update public.events
  set deleted_at = v_now,
      deleted_by = p_actor_id,
      deletion_reason = btrim(p_reason),
      deletion_status = 'SOFT_DELETED',
      recoverable_until = v_recoverable_until,
      purge_scheduled_at = null,
      purged_at = null,
      updated_at = v_now
  where id = p_event_id
    and tenant_id = p_tenant_id
    and deleted_at is null;

  get diagnostics v_affected = row_count;
  if v_affected <> 1 then
    raise exception 'EVENT_DELETE_CONFLICT';
  end if;

  insert into public.event_deletion_events
    (tenant_id, event_id, event_status, actor_id, request_id, metadata)
  values
    (p_tenant_id, p_event_id, 'DELETION_REQUESTED', p_actor_id, p_request_id,
     jsonb_build_object('reason_category', 'USER_REQUEST')),
    (p_tenant_id, p_event_id, 'SOFT_DELETED', p_actor_id, p_request_id,
     jsonb_build_object('recoverable_until', v_recoverable_until));

  insert into public.audit_log
    (tenant_id, user_id, request_id, event_type, entity_type, entity_id, route, method, metadata)
  values
    (p_tenant_id, p_actor_id, p_request_id, 'event.deletion_requested', 'event', p_event_id,
     '/api/events/:eventId/delete-request', 'POST', '{}'::jsonb),
    (p_tenant_id, p_actor_id, p_request_id, 'event.soft_deleted', 'event', p_event_id,
     '/api/events/:eventId/delete-request', 'POST',
     jsonb_build_object('recoverable_until', v_recoverable_until));

  return jsonb_build_object(
    'event_id', p_event_id,
    'status', 'SOFT_DELETED',
    'deleted_at', v_now,
    'recoverable_until', v_recoverable_until,
    'idempotent', false
  );
end;
$$;

revoke all on function public.request_event_soft_delete(uuid, uuid, uuid, text, text, text, text[]) from public, anon, authenticated;
grant execute on function public.request_event_soft_delete(uuid, uuid, uuid, text, text, text, text[]) to service_role;

create or replace function public.restore_soft_deleted_event(
  p_event_id uuid,
  p_tenant_id uuid,
  p_actor_id uuid,
  p_request_id text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog, pg_temp
as $$
declare
  v_event record;
  v_now timestamptz := clock_timestamp();
  v_affected integer;
begin
  perform public.assert_event_deletion_admin(p_tenant_id, p_actor_id);

  select e.id, e.deleted_at, e.deletion_status, e.recoverable_until, e.purge_scheduled_at
  into v_event
  from public.events e
  where e.id = p_event_id
    and e.tenant_id = p_tenant_id
  for update;

  if not found then
    raise exception 'EVENT_NOT_FOUND';
  end if;

  if exists (
    select 1 from public.event_deletion_events de
    where de.tenant_id = p_tenant_id
      and de.event_id = p_event_id
      and de.event_status = 'RESTORED'
      and de.request_id = p_request_id
  ) then
    return jsonb_build_object('event_id', p_event_id, 'status', 'RESTORED', 'restored_at', v_now, 'idempotent', true);
  end if;

  if exists (
    select 1 from public.event_deletion_events de
    where de.tenant_id = p_tenant_id
      and de.event_id = p_event_id
      and de.event_status in ('PURGE_STARTED', 'PURGED')
  ) then
    raise exception 'EVENT_RESTORE_NOT_ALLOWED';
  end if;
  if v_event.deleted_at is null or v_event.deletion_status not in ('SOFT_DELETED', 'PURGE_SCHEDULED', 'PURGE_FAILED') then
    raise exception 'EVENT_RESTORE_NOT_ALLOWED';
  end if;
  if v_event.recoverable_until is null or v_event.recoverable_until < v_now then
    raise exception 'EVENT_RESTORE_WINDOW_EXPIRED';
  end if;

  update public.events
  set deleted_at = null,
      deleted_by = null,
      deletion_reason = null,
      deletion_status = 'RESTORED',
      recoverable_until = null,
      purge_scheduled_at = null,
      purged_at = null,
      updated_at = v_now
  where id = p_event_id
    and tenant_id = p_tenant_id
    and deletion_status in ('SOFT_DELETED', 'PURGE_SCHEDULED', 'PURGE_FAILED');

  get diagnostics v_affected = row_count;
  if v_affected <> 1 then
    raise exception 'EVENT_DELETE_CONFLICT';
  end if;

  insert into public.event_deletion_events
    (tenant_id, event_id, event_status, actor_id, request_id, metadata)
  values
    (p_tenant_id, p_event_id, 'RESTORED', p_actor_id, p_request_id,
     jsonb_build_object('cancelled_purge_schedule', v_event.purge_scheduled_at is not null));

  insert into public.audit_log
    (tenant_id, user_id, request_id, event_type, entity_type, entity_id, route, method, metadata)
  values
    (p_tenant_id, p_actor_id, p_request_id, 'event.restored', 'event', p_event_id,
     '/api/events/:eventId/restore', 'POST', '{}'::jsonb);

  return jsonb_build_object('event_id', p_event_id, 'status', 'RESTORED', 'restored_at', v_now, 'idempotent', false);
end;
$$;

revoke all on function public.restore_soft_deleted_event(uuid, uuid, uuid, text) from public, anon, authenticated;
grant execute on function public.restore_soft_deleted_event(uuid, uuid, uuid, text) to service_role;

create or replace function public.schedule_event_purge(
  p_event_id uuid,
  p_tenant_id uuid,
  p_actor_id uuid,
  p_request_id text,
  p_unknown_dependencies text[] default '{}'::text[],
  p_purge_blockers text[] default '{}'::text[]
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog, pg_temp
as $$
declare
  v_event record;
  v_now timestamptz := clock_timestamp();
begin
  perform public.assert_event_deletion_admin(p_tenant_id, p_actor_id);

  select e.id, e.title, e.deleted_at, e.deletion_status, e.recoverable_until, e.purge_scheduled_at
  into v_event
  from public.events e
  where e.id = p_event_id
    and e.tenant_id = p_tenant_id
  for update;

  if not found then raise exception 'EVENT_NOT_FOUND'; end if;
  if coalesce(array_length(p_unknown_dependencies, 1), 0) > 0
     or coalesce(array_length(p_purge_blockers, 1), 0) > 0 then
    raise exception 'EVENT_PURGE_NOT_ELIGIBLE';
  end if;
  if v_event.deleted_at is null or v_event.deletion_status <> 'SOFT_DELETED' then
    raise exception 'EVENT_PURGE_NOT_ELIGIBLE';
  end if;
  if v_event.recoverable_until is null or v_event.recoverable_until >= v_now then
    raise exception 'EVENT_PURGE_NOT_ELIGIBLE';
  end if;

  update public.events
  set deletion_status = 'PURGE_SCHEDULED',
      purge_scheduled_at = v_now,
      updated_at = v_now
  where id = p_event_id and tenant_id = p_tenant_id and deletion_status = 'SOFT_DELETED';

  insert into public.event_deletion_events
    (tenant_id, event_id, event_status, actor_id, request_id, metadata)
  values
    (p_tenant_id, p_event_id, 'PURGE_SCHEDULED', p_actor_id, p_request_id,
     jsonb_build_object('synthetic_only', left(v_event.title, 19) = '[EVENT_DELETE_TEST]'));

  insert into public.audit_log
    (tenant_id, user_id, request_id, event_type, entity_type, entity_id, route, method, metadata)
  values
    (p_tenant_id, p_actor_id, p_request_id, 'event.purge_scheduled', 'event', p_event_id,
     '/api/events/:eventId/purge', 'POST', jsonb_build_object('mode', 'EXECUTE_SYNTHETIC'));

  return jsonb_build_object('event_id', p_event_id, 'status', 'PURGE_SCHEDULED', 'scheduled_at', v_now);
end;
$$;

revoke all on function public.schedule_event_purge(uuid, uuid, uuid, text, text[], text[]) from public, anon, authenticated;
grant execute on function public.schedule_event_purge(uuid, uuid, uuid, text, text[], text[]) to service_role;

create or replace function public.mark_event_purge_failed(
  p_event_id uuid,
  p_tenant_id uuid,
  p_actor_id uuid,
  p_request_id text,
  p_failure_code text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog, pg_temp
as $$
declare
  v_now timestamptz := clock_timestamp();
begin
  perform public.assert_event_deletion_admin(p_tenant_id, p_actor_id);

  perform 1 from public.events e
  where e.id = p_event_id and e.tenant_id = p_tenant_id
  for update;
  if not found then raise exception 'EVENT_NOT_FOUND'; end if;

  update public.events
  set deletion_status = 'PURGE_FAILED', updated_at = v_now
  where id = p_event_id and tenant_id = p_tenant_id;

  insert into public.event_deletion_events
    (tenant_id, event_id, event_status, actor_id, request_id, metadata)
  values
    (p_tenant_id, p_event_id, 'PURGE_FAILED', p_actor_id, p_request_id,
     jsonb_build_object('failure_code', left(coalesce(p_failure_code, 'UNKNOWN'), 80)));

  insert into public.audit_log
    (tenant_id, user_id, request_id, event_type, entity_type, entity_id, route, method, status, metadata)
  values
    (p_tenant_id, p_actor_id, p_request_id, 'event.purge_failed', 'event', p_event_id,
     '/api/events/:eventId/purge', 'POST', 'failed',
     jsonb_build_object('failure_code', left(coalesce(p_failure_code, 'UNKNOWN'), 80)));

  return jsonb_build_object('event_id', p_event_id, 'status', 'PURGE_FAILED', 'failed_at', v_now);
end;
$$;

revoke all on function public.mark_event_purge_failed(uuid, uuid, uuid, text, text) from public, anon, authenticated;
grant execute on function public.mark_event_purge_failed(uuid, uuid, uuid, text, text) to service_role;

create or replace function public.complete_event_purge(
  p_event_id uuid,
  p_tenant_id uuid,
  p_actor_id uuid,
  p_request_id text,
  p_secondary_confirmation text
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_catalog, pg_temp
as $$
declare
  v_event record;
  v_analysis_id uuid;
  v_tombstone_id uuid;
  v_now timestamptz := clock_timestamp();
begin
  perform public.assert_event_deletion_admin(p_tenant_id, p_actor_id);

  select e.id, e.title, e.deleted_at, e.deletion_status
  into v_event
  from public.events e
  where e.id = p_event_id and e.tenant_id = p_tenant_id
  for update;

  if not found then raise exception 'EVENT_NOT_FOUND'; end if;
  if v_event.deletion_status = 'PURGED' then
    return jsonb_build_object('event_id', p_event_id, 'status', 'PURGED', 'idempotent', true);
  end if;
  if v_event.deletion_status <> 'PURGE_SCHEDULED'
     or left(v_event.title, 19) <> '[EVENT_DELETE_TEST]'
     or p_secondary_confirmation <> 'PURGE_SYNTHETIC_FIXTURE_ONLY' then
    raise exception 'EVENT_PURGE_NOT_ELIGIBLE';
  end if;

  insert into public.event_deletion_events
    (tenant_id, event_id, event_status, actor_id, request_id, metadata)
  values
    (p_tenant_id, p_event_id, 'PURGE_STARTED', p_actor_id, p_request_id,
     jsonb_build_object('synthetic_only', true));

  insert into public.event_deletion_tombstones
    (tenant_id, event_id_original, event_title_hash, requested_by, requested_at,
     soft_deleted_at, purged_at, reason_category, request_id, data_categories, status)
  values
    (p_tenant_id, p_event_id, encode(digest(v_event.title, 'sha256'), 'hex'), p_actor_id, v_now,
     v_event.deleted_at, v_now, 'SYNTHETIC_FIXTURE_PURGE', p_request_id,
     '["event","analysis","storage","audit_minimum"]'::jsonb, 'PURGED')
  returning id into v_tombstone_id;

  select a.id into v_analysis_id
  from public.analyses a
  where a.event_id = p_event_id and a.tenant_id = p_tenant_id
  limit 1;

  if v_analysis_id is not null then
    update public.analyses
    set event_summary = '[PURGED SYNTHETIC FIXTURE]',
        escape_point = null,
        unsafe_agent = null,
        unsafe_act = null,
        perception_justification = null,
        perception_discarded = null,
        objective_justification = null,
        objective_discarded = null,
        action_justification = null,
        action_discarded = null,
        conclusions = null,
        recommendations = null,
        preconditions = null,
        pdf_url = null,
        raw_llm_output = null,
        source_file_url = null,
        updated_at = v_now
    where id = v_analysis_id and tenant_id = p_tenant_id;
  end if;

  update public.sera_vnext_analyses
  set title = '[PURGED SYNTHETIC FIXTURE]',
      narrative = '[PURGED SYNTHETIC FIXTURE DATA REDACTED FOR AUDIT RETENTION]',
      narrative_hash = encode(digest('[PURGED SYNTHETIC FIXTURE DATA REDACTED FOR AUDIT RETENTION]', 'sha256'), 'hex'),
      source_reference = null,
      engine_input = '{}'::jsonb,
      engine_output = '{"selectedCode":null,"releasedCode":null,"finalConclusion":null,"classifiedOutput":false,"readyPromotion":false,"downstreamAllowed":false}'::jsonb,
      warnings = '[]'::jsonb,
      uncertainties = '[]'::jsonb,
      limitations = '["PURGED_SYNTHETIC_FIXTURE"]'::jsonb,
      escape_point_statement = null,
      direct_actor = null,
      perception_candidate_code = null,
      objective_candidate_code = null,
      action_candidate_code = null,
      metadata = jsonb_build_object('purgedSyntheticFixture', true, 'tombstoneId', v_tombstone_id),
      updated_at = v_now,
      deleted_at = v_now
  where tenant_id = p_tenant_id and source_reference = p_event_id::text;

  update public.events
  set title = '[PURGED SYNTHETIC FIXTURE]',
      raw_input = '[PURGED SYNTHETIC FIXTURE DATA REDACTED]',
      operation_type = null,
      aircraft_type = null,
      occurred_at = null,
      deletion_reason = null,
      deletion_status = 'PURGED',
      recoverable_until = null,
      purge_scheduled_at = null,
      purged_at = v_now,
      updated_at = v_now
  where id = p_event_id and tenant_id = p_tenant_id;

  insert into public.event_deletion_events
    (tenant_id, event_id, event_status, actor_id, request_id, metadata)
  values
    (p_tenant_id, p_event_id, 'PURGED', p_actor_id, p_request_id,
     jsonb_build_object('synthetic_only', true, 'tombstone_id', v_tombstone_id));

  insert into public.audit_log
    (tenant_id, user_id, request_id, event_type, entity_type, entity_id, route, method, metadata)
  values
    (p_tenant_id, p_actor_id, p_request_id, 'event.purged', 'event', p_event_id,
     '/api/events/:eventId/purge', 'POST',
     jsonb_build_object('synthetic_only', true, 'tombstone_id', v_tombstone_id));

  return jsonb_build_object(
    'event_id', p_event_id,
    'status', 'PURGED',
    'purged_at', v_now,
    'tombstone_id', v_tombstone_id,
    'idempotent', false
  );
end;
$$;

revoke all on function public.complete_event_purge(uuid, uuid, uuid, text, text) from public, anon, authenticated;
grant execute on function public.complete_event_purge(uuid, uuid, uuid, text, text) to service_role;
