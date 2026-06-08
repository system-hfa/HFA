# SERA Risk Profile Data Contract

## Canonical Response

Primary response payload:

- `score`
- `distribution`
- `top_preconditions`
- `top_combinations`
- `actions`
- `trend`
- `alerts`
- `total_analyses`
- `total_events_90d`
- `modal_erc_level`
- `safety_issue_candidates`
- `quality_trend`
- `data_confidence`
- `total_events`
- `included_events`
- `excluded_events`
- `completed_analyses`
- `error_analyses`
- `confidence`
- `erc_distribution`
- `perception_distribution`
- `objective_distribution`
- `action_distribution`
- `precondition_distribution`
- `recurring_patterns`
- `source_events_included`
- `source_events_excluded`
- `recent_events`
- `limitations`
- `generated_at`

## Source Event Shape

Each normalized source event carries:

- source identity: `id`, `source`, `tenantId`
- display metadata: `title`, `createdAt`, `occurredAt`
- status: `received | processing | completed | error | draft | archived`
- analysis linkage: `analysisId`
- optional version metadata: `engineVersion`, `methodologyVersion`
- optional P/O/A fields
- optional ERC summary
- optional preconditions/warnings
- exclusion state:
  - `isExcludedFromRiskProfile`
  - `exclusionId`
  - `exclusionReason`
  - `exclusionAt`

## Inclusion Rules

Included in the profile calculation:

- completed legacy events with linked analyses, not excluded;
- compatible vNext analyses mapped to `completed`, not excluded.

Excluded from the profile calculation:

- active exclusions;
- errored records;
- draft/processing/received records;
- archived/deleted records;
- incompatible vNext rows without usable P/O/A or precondition signal.
