# SERA Engine vNext Priority Batch Gaps and Holds A4R119 v0.2.0

Status: GAPS_AND_HOLDS
Phase: A4+R-119
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Primary gaps identified
1. EASTERN-401 official-text gap
- recovered official TXT is form-feed-only/unusable.
- existing full-pool text is secondary-like artifact and not sufficient for draft trace governance.
- hold status applied: `HOLD_OCR_REQUIRED`.

2. UNITED-173 OCR quality gap
- source is official and usable, but OCR degradation can affect line-level interpretation.
- trace remains `REVIEW_REQUIRED` pending tighter source confirmation.

3. ATLAS-3591 objective-vs-action boundary gap
- high-confidence P evidence is strong.
- O and A can be over-coupled if mode-change evidence is reused without axis-specific rationale.
- trace kept `REVIEW_REQUIRED` with live boundary alternatives.

4. UNITED-232 technical-dominant framing gap
- catastrophic technical failure can trigger outcome bias in A-axis interpretation.
- draft explicitly preserves adversarial check that nominal A branch may remain valid.

## Held candidates and reasons
| eventId | holdStatus | reason |
|---|---|---|
| EASTERN-401 | HOLD_OCR_REQUIRED | usable official TXT not available; secondary artifact not enough for controlled trace draft. |

## Deferred candidates by Opus recommendation lane
- Batch 2 deferred: EXECUFLIGHT-1526, EC225-NORTH-SEA, CROSSAIR-3597.
- Batch 3/boundary deferred: COUGAR-S92A, PINNACLE-3701, FIRST-AIR-6560.

## Methodological caution flags
- keep outcome-neutral logic in A-axis decisions.
- avoid over-objective closure when intent evidence is indirect.
- prevent double-counting of shared P/A facts.
- preserve technical-dominant boundaries when human failure is not dominant.

## Next gating condition
Before any future review bundle decision on A4R119 outputs, run independent QA pass across the three new drafts and keep EASTERN-401 blocked until official OCR-quality text is recovered.

## A4R120 post-QA gating update
- Independent QA intake was executed in A4R120 and trace stabilization patches were applied.
- Updated status after A4R120:
  - `UNITED-173`: future-review eligible with OCR warning.
  - `UNITED-232`: future-review eligible with mandatory display warning.
  - `ATLAS-3591`: remains `PATCHED_REVIEW_REQUIRED` (not future-bundle eligible yet).
  - `EASTERN-401`: remains `HOLD_OCR_REQUIRED`.
- Additional methodological gate introduced:
  - boundary alternatives must be canonically reachable from selected path answers;
  - multi-actor traces must declare `tracedActor` and justify combined scope when used.

## A4R121 Eastern-401 hold supersession note
- EASTERN-401 `HOLD_OCR_REQUIRED` is superseded for future cycles by official-source recovery in A4R121.
- New state:
  - `TRACE_DRAFT_ALLOWED_WITH_LIMITATIONS` with legacy-scan legibility caveat.
- Hold-lane governance remains active for any event where official text is still unusable.

## A4R122 hold-lane update for EASTERN-401
- EASTERN-401 is no longer in hard hold for future cycles.
- Current controlled state after A4R122:
  - `REVIEW_AFTER_MINOR_PATCH_APPLIED`
  - `READY_WITH_WARNINGS`
- Residual gap remains:
  - source legibility (`LEGACY_SCAN_LIMITED_LEGIBILITY`) still requires caution in line-level interpretation.
- Method gate remains active:
  - avoid P/A double-counting from shared altitude-cue facts;
  - keep A-axis boundary-live framing until author adjudication.
