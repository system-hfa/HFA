# SERA vNext Expanded Reviewer Cohort — Audit Results

## Audit Events Collected

| Metric                         | Value |
| ------------------------------ | ----- |
| total_audit_events             | 150   |
| total_cases                    | 25    |
| average_events_per_case        | 6.0   |

## Event Type Verification

For every case, the following events were verified to exist:

| Event Type                  | Required | Observed |
| --------------------------- | -------- | -------- |
| analysis.created            | YES      | ALL 25   |
| analysis.viewed             | YES      | ALL 25   |
| analysis.review_submitted   | YES (ACCEPT/REJECT/MORE_EVIDENCE) | 18/25  |
| analysis.returned           | YES (RETURN_FOR_REANALYSIS) | 7/25   |
| analysis.reanalysis_requested | YES (reanalyze=true) | 7/25   |
| analysis.reanalyzed         | YES (reanalyze=true) | 7/25   |
| analysis.archived           | YES (archiveRestore=true) | 2/25   |
| analysis.restored           | YES (archiveRestore=true) | 2/25   |
| analysis.exported           | YES (exportCase=true) | 7/25   |
| analysis.viewed (cross-tenant probe) | DENIED (403) | 1 attempt |

## Security Audit Events

| Check                         | Result  |
| ----------------------------- | ------- |
| access_denied_validated       | YES     |
| cross_tenant_access_attempted | YES     |
| cross_tenant_access_blocked   | YES     |

## Audit Integrity Checks

All 150 audit events were verified against the following constraints:

- No event contains the full analysis narrative (PASS — stored separately in analysis record)
- No event contains selectedCode, releasedCode, or finalConclusion with non-null value (PASS)
- No event contains auth tokens, cookies, or JWT segments (PASS — events store sanitized actor IDs)
- Tenant and actor information is present but sanitized in event payloads (PASS)
- Each event has a `from_status` and `to_status` consistent with the state machine (PASS)

## Notable Audit Observations

1. `analysis.created` is the first event for every analysis — no analyses were found without creation events
2. `analysis.returned` events are created for RETURN_FOR_REANALYSIS decisions (distinct from `analysis.review_submitted`)
3. `analysis.reanalysis_requested` and `analysis.reanalyzed` are paired for every reanalyze operation
4. Archive/restore operations generate separate events each, preserving the full state history

## Audit Coverage Classification

```
AUDIT_PASS
```

All required event types were observed. No gaps in audit coverage detected.
No sensitive data leaked through audit events.
