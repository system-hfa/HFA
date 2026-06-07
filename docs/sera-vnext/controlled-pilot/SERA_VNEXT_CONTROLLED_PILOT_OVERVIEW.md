# SERA vNext Controlled Admin Pilot — Overview

## Scope

This macrophase validated SERA vNext Product Beta as an internal, non-final, audit-ready admin workflow on a controlled remote environment. The phase did not reopen methodology, engine logic, canonical tree, fixtures, baselines, or Product Alpha locks.

## What Was Validated

- Real API flow for create, list, detail, review, reanalyze, archive, restore, and export
- Real browser flow for admin list, create, detail, review, reanalyze, archive, restore, and export
- Real database constraints and RLS behavior
- Controlled pilot across 10 named internal cases
- Feature-flag rollback from available to hidden states and back
- Root-level full sweep across 150 files under `tests/sera-vnext/*.ts`

## Outcome

- Product Beta status: PASS for controlled internal admin pilot
- Operational status: CONTINUE_WITH_LIMITATIONS
- Methodology status: unchanged
- Engine status: unchanged and still separately validated at 39/39 PASS
- Public release status: not authorized

## Evidence Summary

| Measure                   | Result |
| ------------------------- | ------ |
| Pilot cases               | 10     |
| Analyses created          | 10     |
| Reviews submitted         | 10     |
| Reanalyses                | 3      |
| Archive/restore cycles    | 1      |
| Exports                   | 2      |
| Audit events              | 60     |
| API errors                | 0      |
| UI errors                 | 0      |
| Access-denied checks      | 1      |
| Average case latency (ms) | 2021   |

## Main Limitations

- `PILOT_SINGLE_ADMIN_LIMITATION`: the productive cohort remained one named enterprise admin plus one blocked-access probe.
- Candidate P/O/A output was not yet actionable enough for reviewer confidence in the pilot workflow.
- Preconditions were rarely useful in current beta output.
- One non-blocking font preload warning appeared on the review page during the browser trial.

## Main Corrections Made During The Phase

- Fixed public-user mirroring so real admin sessions persist against `public.users` correctly.
- Fixed the non-final status DB constraint so `HUMAN_REVIEW_COMPLETED_NON_FINAL` is accepted while true final statuses remain blocked.
