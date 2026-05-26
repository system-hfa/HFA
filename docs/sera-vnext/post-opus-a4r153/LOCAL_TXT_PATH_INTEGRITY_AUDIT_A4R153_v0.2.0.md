# Local TXT Path Integrity Audit A4R153 v0.2.0

Status: LOCAL_TXT_PATH_INTEGRITY_AUDIT_RECORDED
Phase: A4R153

## Scope

Path/event consistency audit based on Opus A4R152 findings and A4R150 registry overlays.

## Critical Finding

- BS211-Q400 path currently points to Colgan 3407 file (`TXT-029` -> Colgan path): CROSS_EVENT_MISATTRIBUTION.

## Duplicate/Alias Clusters Observed

- Colgan/BS211
- Asiana duplicates
- Delta duplicates
- Air Florida duplicates
- USAir 1493 duplicates
- US Airways 1549 duplicates
- Eastern duplicates
- EC225 Turoy duplicates
- Comair duplicates
- Air Canada 624 duplicates
- First Air 6560 duplicates
- American 965 duplicates
- American 1420 duplicates
- Kegworth duplicates
- Korean 801 duplicates
- UPS 1354 duplicates
- G-BLUN duplicates
- Bell 212 / TSB-A21P0018 duplicates
- Air-Transportation-Safety-Report duplicates

## Status

- knownCriticalMisattributionCount: 1
- duplicateOrAliasClusterCountApprox: 19
- physicalDeletionPerformed: NO
- physicalMovePerformed: NO

## Required Next Action

- A4R154 or later: machine-assisted path integrity check over registry entries and actual file headers/content fingerprints.
