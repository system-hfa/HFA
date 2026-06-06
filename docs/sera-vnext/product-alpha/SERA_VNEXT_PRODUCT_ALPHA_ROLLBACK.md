# SERA vNext Product Alpha Rollback

Date: 2026-06-06
Status: INTERNAL

## Rollback Method

1. set `SERA_VNEXT_CANDIDATE_ONLY_ENABLED=false`;
2. set `NEXT_PUBLIC_SERA_VNEXT_CANDIDATE_UI_ENABLED=false`;
3. if needed, also disable `SERA_VNEXT_INTERNAL_PILOT_ENABLED`;
4. rebuild UI if the public flag changed;
5. confirm endpoint returns 404 and candidate page is hidden or disabled.

## Expected Result

Rollback requires no data cleanup because Product Alpha does not persist output.
