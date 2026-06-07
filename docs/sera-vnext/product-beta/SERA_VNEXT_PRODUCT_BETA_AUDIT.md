# SERA vNext Product Beta Audit

Audit table: `sera_vnext_analysis_events`.

Events include request ID, tenant, actor, analysis ID, timestamp, status transition and sanitized metadata.

Implemented event types:

- `analysis.created`
- `analysis.viewed`
- `analysis.reanalysis_requested`
- `analysis.reanalyzed`
- `analysis.review_started`
- `analysis.review_submitted`
- `analysis.returned`
- `analysis.archived`
- `analysis.restored`
- `analysis.access_denied`
- `analysis.exported`

Full narratives, tokens, cookies, stack traces and secrets are not written into audit payloads.
