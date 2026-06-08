# SERA Risk Profile Real Data Audit

Date: 2026-06-08

## Summary

The Risk Profile page was reading `/api/org/intelligence`, not `/api/risk-profile`.
That endpoint aggregated only legacy `analyses` rows and ignored:

- legacy `events` without linked `analyses`;
- active exclusion intent;
- `sera_vnext_analyses`;
- schema drift where `analyses.erc_level` may be absent.

This created a user-visible mismatch: the Events page showed completed legacy events while the Risk Profile could stay at zero or fail on legacy ERC field access.

## Confirmed Cause

For the enterprise tenant audited in the staging-linked database:

- the Events page universe contained completed legacy events such as `trial 3`, `Trial set 1 b`, `TRIAL-SET1-001`, `Teste 10`, `SK76 - Accident`;
- legacy `events` and linked legacy `analyses` existed;
- `sera_vnext_analyses` also existed in high volume;
- the old Risk Profile implementation did not normalize those universes into one canonical source list.

## Existing Tables

Legacy:

- `public.events`
- `public.analyses`
- `public.corrective_actions`

Product Beta:

- `public.sera_vnext_analyses`
- `public.sera_vnext_analysis_revisions`
- `public.sera_vnext_analysis_reviews`
- `public.sera_vnext_analysis_events`

New in this phase:

- `public.risk_profile_exclusions`

## Existing Routes

- `/api/org/intelligence` — dashboard/company intelligence surface
- `/api/risk-profile` — dedicated risk-profile endpoint
- `/api/analyses/risk-profile` — legacy alias surface
- `/api/events`
- `/api/events/[eventId]`

## Canonical Source Decision

Canonical universe for the product Risk Profile:

1. legacy `events` + linked legacy `analyses` remain first-class because the current Events page already shows that universe;
2. `sera_vnext_analyses` are included only when compatible with the Risk Profile contract:
   - tenant-scoped;
   - not archived/deleted;
   - expose usable P/O/A candidate codes and/or preconditions.

## Fields Available for Consolidation

Legacy source:

- title
- created/occurred timestamps
- status
- P/O/A codes
- preconditions

Compatible Product Beta source:

- title
- created timestamp
- status/review status
- candidate P/O/A codes
- preconditions from `engine_output.preconditions`
- warnings/limitations/uncertainties

## Operational Conclusion

The product fix belongs entirely to product/data/UI scope.
No SERA methodology, engine logic, canonical tree, fixtures, baseline, or expected outputs were reopened.
