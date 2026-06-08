# SERA Risk Profile Exclusion Model

## Decision

Use an auxiliary table instead of physical delete or in-place mutation of legacy/vNext product tables.

Table:

- `public.risk_profile_exclusions`

## Columns

- `id`
- `tenant_id`
- `source_type`
- `source_id`
- `excluded_by`
- `excluded_at`
- `reason`
- `restored_by`
- `restored_at`
- `created_at`
- `updated_at`

## Source Types

- `legacy_event`
- `sera_vnext_analysis`

## Constraints

- one active exclusion per `(tenant_id, source_type, source_id)`;
- tenant-scoped RLS;
- no anon grant.

## Rationale

Benefits:

- no destructive delete;
- one model for legacy and Product Beta;
- restore path is explicit;
- audit trail is preserved;
- no need to reopen causal tables or methodology artifacts.
