-- SERA vNext Product Beta: internal persistence, human review and audit trail.
-- This migration is intentionally additive and does not alter legacy SERA tables,
-- baseline fixtures, risk-layer schema, billing, or existing analysis contracts.

create extension if not exists "pgcrypto";

create or replace function public.sera_vnext_beta_jwt_tenant_id()
returns uuid
language sql
stable
as $$
  select coalesce(
    nullif(current_setting('request.jwt.claims', true)::jsonb #>> '{app_metadata,tenant_id}', '')::uuid,
    nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'tenant_id', '')::uuid,
    public.get_tenant_id()
  );
$$;

create or replace function public.sera_vnext_beta_jwt_role()
returns text
language sql
stable
as $$
  select lower(coalesce(
    nullif(current_setting('request.jwt.claims', true)::jsonb #>> '{app_metadata,role}', ''),
    nullif(current_setting('request.jwt.claims', true)::jsonb ->> 'role', ''),
    ''
  ));
$$;

create or replace function public.sera_vnext_beta_can_use(target_tenant_id uuid)
returns boolean
language sql
stable
as $$
  select target_tenant_id is not null
    and target_tenant_id = public.sera_vnext_beta_jwt_tenant_id()
    and public.sera_vnext_beta_jwt_role() = 'admin';
$$;

create or replace function public.prevent_sera_vnext_append_only_update()
returns trigger
language plpgsql
as $$
begin
  raise exception 'sera_vnext_append_only_table_cannot_be_updated';
end;
$$;

create or replace function public.prevent_sera_vnext_append_only_delete()
returns trigger
language plpgsql
as $$
begin
  raise exception 'sera_vnext_append_only_table_cannot_be_deleted';
end;
$$;

create table if not exists public.sera_vnext_analyses (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  created_by uuid not null references public.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null,

  status text not null default 'CANDIDATE_ANALYSIS_CREATED',
  review_status text not null default 'NOT_REVIEWED',

  title text not null,
  narrative text not null,
  narrative_hash text not null,
  source_type text not null,
  source_reference text null,

  client_request_id text not null,
  request_id text not null,

  engine_version text not null,
  methodology_version text not null,
  baseline_id text not null,
  fixture_set_id text not null,
  input_schema_version text not null,
  output_schema_version text not null,
  code_commit text not null,

  engine_input jsonb not null,
  engine_output jsonb not null,
  engine_output_hash text not null,

  escape_point_status text null,
  escape_point_statement text null,
  direct_actor text null,

  perception_candidate_code text null,
  objective_candidate_code text null,
  action_candidate_code text null,

  warnings jsonb not null default '[]'::jsonb,
  uncertainties jsonb not null default '[]'::jsonb,
  limitations jsonb not null default '[]'::jsonb,

  current_revision integer not null default 1,
  metadata jsonb not null default '{}'::jsonb,

  constraint sera_vnext_analyses_title_nonempty check (length(btrim(title)) > 0),
  constraint sera_vnext_analyses_narrative_nonempty check (length(btrim(narrative)) >= 40),
  constraint sera_vnext_analyses_client_request_nonempty check (length(btrim(client_request_id)) > 0),
  constraint sera_vnext_analyses_request_nonempty check (length(btrim(request_id)) > 0),
  constraint sera_vnext_analyses_status_values check (status in (
    'CANDIDATE_ANALYSIS_CREATED',
    'UNDER_HUMAN_REVIEW',
    'REQUIRES_MORE_EVIDENCE',
    'RETURNED_FOR_REANALYSIS',
    'HUMAN_REVIEW_COMPLETED_NON_FINAL',
    'ARCHIVED'
  )),
  constraint sera_vnext_analyses_review_status_values check (review_status in (
    'NOT_REVIEWED',
    'IN_REVIEW',
    'WORKING_HYPOTHESIS_ACCEPTED',
    'WORKING_HYPOTHESIS_REJECTED',
    'MORE_EVIDENCE_REQUIRED',
    'REANALYSIS_REQUIRED',
    'REVIEW_COMPLETED_NON_FINAL'
  )),
  constraint sera_vnext_analyses_no_final_status check (
    status !~* '(FINAL|CLASSIFIED|READY|RELEASED)'
    and review_status !~* '(FINAL|CLASSIFIED|READY|RELEASED)'
  ),
  constraint sera_vnext_analyses_versions_locked check (
    engine_version = '0.1.0'
    and methodology_version = 'SERA_PT_V1_FROZEN'
    and baseline_id = 'SERA_VNEXT_BASELINE_V0'
    and fixture_set_id = 'SERA_VNEXT_FIXTURE_SET_V0'
  ),
  constraint sera_vnext_analyses_json_arrays check (
    jsonb_typeof(warnings) = 'array'
    and jsonb_typeof(uncertainties) = 'array'
    and jsonb_typeof(limitations) = 'array'
  ),
  constraint sera_vnext_analyses_non_final_output_lock check (
    coalesce(engine_output ->> 'selectedCode', '') = ''
    and coalesce(engine_output ->> 'releasedCode', '') = ''
    and coalesce(engine_output ->> 'finalConclusion', '') = ''
    and coalesce((engine_output ->> 'classifiedOutput')::boolean, false) = false
    and coalesce((engine_output ->> 'readyPromotion')::boolean, false) = false
    and coalesce((engine_output ->> 'downstreamAllowed')::boolean, false) = false
  )
);

create table if not exists public.sera_vnext_analysis_revisions (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references public.sera_vnext_analyses(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  revision_number integer not null,
  created_by uuid not null references public.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  request_id text not null,
  engine_version text not null,
  engine_input jsonb not null,
  engine_output jsonb not null,
  engine_output_hash text not null,
  reason text not null,
  metadata jsonb not null default '{}'::jsonb,

  constraint sera_vnext_revisions_number_positive check (revision_number > 0),
  constraint sera_vnext_revisions_reason_nonempty check (length(btrim(reason)) > 0),
  constraint sera_vnext_revisions_no_final_output_lock check (
    coalesce(engine_output ->> 'selectedCode', '') = ''
    and coalesce(engine_output ->> 'releasedCode', '') = ''
    and coalesce(engine_output ->> 'finalConclusion', '') = ''
    and coalesce((engine_output ->> 'classifiedOutput')::boolean, false) = false
    and coalesce((engine_output ->> 'readyPromotion')::boolean, false) = false
    and coalesce((engine_output ->> 'downstreamAllowed')::boolean, false) = false
  )
);

create table if not exists public.sera_vnext_analysis_reviews (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references public.sera_vnext_analyses(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  reviewer_id uuid not null references public.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  decision text not null,
  review_notes text null,
  escape_point_assessment text null,
  perception_assessment text null,
  objective_assessment text null,
  action_assessment text null,
  preconditions_assessment text null,
  evidence_sufficiency text not null default 'UNRESOLVED',
  requires_more_evidence boolean not null default false,
  review_version integer not null default 1,
  request_id text not null,
  metadata jsonb not null default '{}'::jsonb,

  constraint sera_vnext_reviews_decision_values check (decision in (
    'ACCEPT_AS_WORKING_HYPOTHESIS',
    'REJECT_WORKING_HYPOTHESIS',
    'REQUIRES_MORE_EVIDENCE',
    'RETURN_FOR_REANALYSIS'
  )),
  constraint sera_vnext_reviews_no_final_decision check (decision !~* '(FINAL|CLASSIFIED|READY|RELEASED)'),
  constraint sera_vnext_reviews_evidence_values check (evidence_sufficiency in (
    'SUFFICIENT_FOR_WORKING_HYPOTHESIS',
    'INSUFFICIENT',
    'CONFLICTING',
    'UNRESOLVED'
  )),
  constraint sera_vnext_reviews_version_positive check (review_version > 0)
);

create table if not exists public.sera_vnext_analysis_events (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid null references public.sera_vnext_analyses(id) on delete cascade,
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  actor_id uuid null references public.users(id) on delete set null,
  event_type text not null,
  created_at timestamptz not null default now(),
  request_id text not null,
  from_status text null,
  to_status text null,
  payload jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,

  constraint sera_vnext_events_type_values check (event_type in (
    'analysis.created',
    'analysis.viewed',
    'analysis.reanalysis_requested',
    'analysis.reanalyzed',
    'analysis.review_started',
    'analysis.review_submitted',
    'analysis.returned',
    'analysis.archived',
    'analysis.restored',
    'analysis.access_denied',
    'analysis.exported'
  )),
  constraint sera_vnext_events_payload_object check (jsonb_typeof(payload) = 'object'),
  constraint sera_vnext_events_metadata_object check (jsonb_typeof(metadata) = 'object'),
  constraint sera_vnext_events_no_narrative_payload check (
    not (payload ? 'narrative')
    and not (payload ? 'raw_input')
    and not (payload ? 'eventText')
    and not (metadata ? 'narrative')
    and not (metadata ? 'raw_input')
    and not (metadata ? 'eventText')
  )
);

create unique index if not exists sera_vnext_analyses_tenant_client_request_uidx
  on public.sera_vnext_analyses(tenant_id, client_request_id);

create index if not exists sera_vnext_analyses_tenant_created_idx
  on public.sera_vnext_analyses(tenant_id, created_at desc)
  where deleted_at is null;

create index if not exists sera_vnext_analyses_tenant_status_idx
  on public.sera_vnext_analyses(tenant_id, status, review_status, created_at desc)
  where deleted_at is null;

create index if not exists sera_vnext_analyses_created_by_idx
  on public.sera_vnext_analyses(tenant_id, created_by, created_at desc)
  where deleted_at is null;

create index if not exists sera_vnext_analyses_title_search_idx
  on public.sera_vnext_analyses using gin (to_tsvector('simple', coalesce(title, '')));

create unique index if not exists sera_vnext_revisions_analysis_revision_uidx
  on public.sera_vnext_analysis_revisions(analysis_id, revision_number);

create index if not exists sera_vnext_revisions_tenant_analysis_idx
  on public.sera_vnext_analysis_revisions(tenant_id, analysis_id, revision_number desc);

create index if not exists sera_vnext_reviews_tenant_analysis_idx
  on public.sera_vnext_analysis_reviews(tenant_id, analysis_id, created_at desc);

create index if not exists sera_vnext_events_tenant_analysis_time_idx
  on public.sera_vnext_analysis_events(tenant_id, analysis_id, created_at desc);

create index if not exists sera_vnext_events_request_id_idx
  on public.sera_vnext_analysis_events(request_id);

create trigger set_sera_vnext_analyses_updated_at
before update on public.sera_vnext_analyses
for each row execute function public.set_updated_at();

create trigger set_sera_vnext_reviews_updated_at
before update on public.sera_vnext_analysis_reviews
for each row execute function public.set_updated_at();

create trigger prevent_sera_vnext_revision_update
before update on public.sera_vnext_analysis_revisions
for each row execute function public.prevent_sera_vnext_append_only_update();

create trigger prevent_sera_vnext_revision_delete
before delete on public.sera_vnext_analysis_revisions
for each row execute function public.prevent_sera_vnext_append_only_delete();

create trigger prevent_sera_vnext_event_update
before update on public.sera_vnext_analysis_events
for each row execute function public.prevent_sera_vnext_append_only_update();

create trigger prevent_sera_vnext_event_delete
before delete on public.sera_vnext_analysis_events
for each row execute function public.prevent_sera_vnext_append_only_delete();

alter table public.sera_vnext_analyses enable row level security;
alter table public.sera_vnext_analysis_revisions enable row level security;
alter table public.sera_vnext_analysis_reviews enable row level security;
alter table public.sera_vnext_analysis_events enable row level security;

create policy "sera_vnext_analyses_admin_select"
  on public.sera_vnext_analyses for select
  to authenticated
  using (public.sera_vnext_beta_can_use(tenant_id) and deleted_at is null);

create policy "sera_vnext_analyses_admin_insert"
  on public.sera_vnext_analyses for insert
  to authenticated
  with check (public.sera_vnext_beta_can_use(tenant_id));

create policy "sera_vnext_analyses_admin_update"
  on public.sera_vnext_analyses for update
  to authenticated
  using (public.sera_vnext_beta_can_use(tenant_id))
  with check (public.sera_vnext_beta_can_use(tenant_id));

create policy "sera_vnext_revisions_admin_select"
  on public.sera_vnext_analysis_revisions for select
  to authenticated
  using (public.sera_vnext_beta_can_use(tenant_id));

create policy "sera_vnext_revisions_admin_insert"
  on public.sera_vnext_analysis_revisions for insert
  to authenticated
  with check (public.sera_vnext_beta_can_use(tenant_id));

create policy "sera_vnext_reviews_admin_select"
  on public.sera_vnext_analysis_reviews for select
  to authenticated
  using (public.sera_vnext_beta_can_use(tenant_id));

create policy "sera_vnext_reviews_admin_insert"
  on public.sera_vnext_analysis_reviews for insert
  to authenticated
  with check (public.sera_vnext_beta_can_use(tenant_id));

create policy "sera_vnext_events_admin_select"
  on public.sera_vnext_analysis_events for select
  to authenticated
  using (public.sera_vnext_beta_can_use(tenant_id));

create policy "sera_vnext_events_admin_insert"
  on public.sera_vnext_analysis_events for insert
  to authenticated
  with check (public.sera_vnext_beta_can_use(tenant_id));

grant select, insert, update on public.sera_vnext_analyses to authenticated;
grant select, insert on public.sera_vnext_analysis_revisions to authenticated;
grant select, insert on public.sera_vnext_analysis_reviews to authenticated;
grant select, insert on public.sera_vnext_analysis_events to authenticated;

comment on table public.sera_vnext_analyses is 'SERA vNext Product Beta internal candidate analyses. Non-final output only; human review required.';
comment on table public.sera_vnext_analysis_revisions is 'Append-only engine output history for SERA vNext Product Beta reanalysis.';
comment on table public.sera_vnext_analysis_reviews is 'Human review records for non-final SERA vNext working hypotheses.';
comment on table public.sera_vnext_analysis_events is 'Append-only sanitized audit timeline for SERA vNext Product Beta. Do not store full narratives or sensitive payloads.';
comment on column public.sera_vnext_analyses.engine_output is 'Candidate-only engine output. selectedCode, releasedCode, finalConclusion, CLASSIFIED, READY and downstream outputs remain blocked.';
comment on column public.sera_vnext_analysis_events.payload is 'Sanitized event payload. Never include narrative, tokens, cookies, stack traces, PII, or secrets.';
