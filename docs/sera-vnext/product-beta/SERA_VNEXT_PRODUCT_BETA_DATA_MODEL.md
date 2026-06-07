# SERA vNext Product Beta Data Model

Migration: `supabase/migrations/20260607135727_sera_vnext_product_beta.sql`.

Tables:

- `sera_vnext_analyses`: primary persisted candidate analysis with input/output hashes, engine versions, status, review status and soft delete.
- `sera_vnext_analysis_revisions`: append-only engine history for initial analysis and reanalysis.
- `sera_vnext_analysis_reviews`: human review records with non-final decisions only.
- `sera_vnext_analysis_events`: append-only sanitized audit timeline.

Key constraints:

- Unique idempotency key: `tenant_id + client_request_id`.
- Unique revision key: `analysis_id + revision_number`.
- Check constraints block `FINAL`, `CLASSIFIED`, `READY`, and `RELEASED` states.
- Engine output checks require final-output locks to stay disabled.
- Events reject full narrative keys in payload/metadata.
