# SERA vNext Controlled Admin Pilot — Audit Results

## API Trial Audit Evidence

| Check                  | Result           |
| ---------------------- | ---------------- |
| API trial participant  | PILOT-ADMIN-01   |
| Blocked probe          | PILOT-BLOCKED-01 |
| Recorded revisions     | 2                |
| Recorded reviews       | 1                |
| Create latency (ms)    | 1945             |
| Review latency (ms)    | 2423             |
| Reanalyze latency (ms) | 2174             |
| Export latency (ms)    | 1613             |

### Event Types Confirmed

| Event type                    | Count |
| ----------------------------- | ----- |
| analysis.archived             | 1     |
| analysis.created              | 1     |
| analysis.exported             | 1     |
| analysis.reanalysis_requested | 1     |
| analysis.reanalyzed           | 1     |
| analysis.restored             | 1     |
| analysis.returned             | 1     |
| analysis.review_started       | 1     |
| analysis.viewed               | 1     |

## Browser Trial Observability

| Signal                      | Result                                     |
| --------------------------- | ------------------------------------------ |
| Route checks                | 4                                          |
| Network checks              | 1                                          |
| Observed request count      | 92                                         |
| Audit timeline visible      | true                                       |
| Non-final marker visible    | true                                       |
| Final action buttons absent | true                                       |
| Console warnings            | Total messages: 0 (Errors: 0, Warnings: 0) |

## Controlled Pilot Audit Summary

- Total audit events across pilot cases: 60
- Access-denied path validated: 1
- Export path validated in pilot cases: 2
- Archive/restore validated in pilot cases: 1
