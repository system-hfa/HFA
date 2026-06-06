# SERA vNext Product Alpha Runbook

Date: 2026-06-06
Status: INTERNAL

## Enablement

1. keep all candidate flags false by default;
2. enable in controlled environment only:
   - `SERA_VNEXT_READONLY_ENABLED=true`
   - `SERA_VNEXT_INTERNAL_PILOT_ENABLED=true`
   - `SERA_VNEXT_CANDIDATE_ONLY_ENABLED=true`
   - `NEXT_PUBLIC_SERA_VNEXT_CANDIDATE_UI_ENABLED=true`
3. access `/admin/sera-vnext/candidate` as enterprise admin.

## Operator Use

1. paste event narrative text;
2. trigger candidate-only analysis;
3. review facts, timeline, candidate window, and reasoning lanes;
4. choose local-only review state;
5. treat output as hypothesis, not final classification.
