-- Reconcile the tombstone read policy additively without rewriting the applied
-- lifecycle migration. Public user IDs are not guaranteed to equal auth.uid().

drop policy if exists "event_deletion_tombstones_select_admin"
  on public.event_deletion_tombstones;

create policy "event_deletion_tombstones_select_admin"
  on public.event_deletion_tombstones
  for select
  to authenticated
  using (
    tenant_id = coalesce(
      nullif(current_setting('request.jwt.claims', true)::jsonb #>> '{app_metadata,tenant_id}', '')::uuid,
      nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id', '')::uuid,
      public.get_tenant_id()
    )
    and lower(coalesce(
      nullif(current_setting('request.jwt.claims', true)::jsonb #>> '{app_metadata,role}', ''),
      nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'role', ''),
      ''
    )) = 'admin'
  );

drop policy if exists "event_deletion_tombstones_insert_admin"
  on public.event_deletion_tombstones;

revoke insert on public.event_deletion_tombstones from authenticated;
