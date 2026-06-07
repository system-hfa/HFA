# SERA vNext Controlled Admin Pilot — Metrics

## Aggregate Metrics

| Metric                           | Value |
| -------------------------------- | ----- |
| total_cases                      | 10    |
| analyses_created                 | 10    |
| reviews_submitted                | 10    |
| reanalyses                       | 3     |
| archive_restore                  | 1     |
| exports                          | 2     |
| api_errors                       | 0     |
| ui_errors                        | 0     |
| access_denied                    | 1     |
| average_latency_ms               | 2021  |
| evidence_insufficient_rate       | 0.5   |
| more_evidence_required_rate      | 0.5   |
| accepted_working_hypothesis_rate | 0.3   |
| rejected_hypothesis_rate         | 0.2   |
| warnings_frequency               | 4.9   |
| total_audit_events               | 60    |

## Review Decision Distribution

| Decision                     | Count |
| ---------------------------- | ----- |
| ACCEPT_AS_WORKING_HYPOTHESIS | 3     |
| REJECT_WORKING_HYPOTHESIS    | 2     |
| REQUIRES_MORE_EVIDENCE       | 2     |
| RETURN_FOR_REANALYSIS        | 3     |

## Reviewer Utility Signals

| Signal               | Count | Rate |
| -------------------- | ----- | ---- |
| escape_point_useful  | 8     | 0.8  |
| poa_useful           | 0     | 0.0  |
| preconditions_useful | 1     | 0.1  |
| uncertainty_clear    | 10    | 1.0  |
| warnings_clear       | 10    | 1.0  |

## Per-Case Artifacts

See `SERA_VNEXT_CONTROLLED_PILOT_CASE_RESULTS.csv`.
