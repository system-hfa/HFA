# EXECUFLIGHT-1526 Source Slicing A4R166 v0.2.0

Status: EXECUFLIGHT_READY_FOR_CANONICAL_POA_WITH_SINGLE_ESCAPE_POINT_MULTI_ACTOR_CONTRIBUTIONS / AUTHOR_APPROVED_DRAFT / NO_DOWNSTREAM

## 1. Scope

- Event: EXECUFLIGHT-1526 only.
- Goal: confirm PF/PM roles at the critical interval and register one `escapePointId` with two `actorContributionId`.
- Non-scope: no code/runtime/release/downstream operations.

## 2. Mandatory Source

- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/32__2016__NTSB-USA__Hawker-HS-125-700A__Crash-During-Nonprecision-Instrument-Approach.txt`

## 3. PF/PM Confirmation Evidence (Official Report)

- FO was PF: lines 367-369 and 584-585.
- Captain was PM: lines 367-369 and 584-585.
- FO controlled power/descent and entered aggressive descent: lines 799-807.
- Captain verbalized concern with descent rate: lines 809-813.
- Continuation at/below MDA: lines 815-818.
- Captain did not attempt takeover: lines 412-413.
- Captain did not initiate missed approach when required: lines 419-420.
- No explicit transfer of control before critical point found in source slice.

## 4. Single Escape Point Registration

Rule anchor:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md`

| eventId | escapePointId | escapePointStatement | unsafeActOrCondition | status |
|---|---|---|---|---|
| EXECUFLIGHT-1526 | EXECUFLIGHT-1526-ESCAPE-001 | After high FAF crossing, the aircraft enters/continues aggressive descent and continuation of the approach is no longer defensibly safe. | Unsafe act chain at one escape point (PF control continuation + PM intervention omission). | ESCAPE_POINT_ACCEPTED |

## 5. Actor Contributions (Same Escape Point)

| actorContributionId | actor | role | controlledVariable | contribution | P | O | A | status |
|---|---|---|---|---|---|---|---|---|
| EXECUFLIGHT-1526-ESCAPE-001-ACTOR-FO-PF | First Officer | PF | Vertical profile / descent rate / speed / continuation of approach | Controls and continues nondefensible approach profile after high FAF crossing. | P-D | O-D | A-H | AUTHOR_APPROVED_DRAFT |
| EXECUFLIGHT-1526-ESCAPE-001-ACTOR-CAPTAIN-PM | Captain | PM | Monitoring / intervention / takeover / missed approach initiation | Verbalizes concern but does not intervene positively, does not take control, and does not initiate/order missed approach in the critical interval. | P-A | O-D | A-G | AUTHOR_APPROVED_DRAFT |

Detailed author-approved draft record:
- `docs/sera-vnext/minimal-canonical-event-test/EXECUFLIGHT-1526_AUTHOR_APPROVED_POA_DRAFT_A4R166_v0.2.0.md`

## 6. Decision

- `SOURCE_ENRICHMENT_CANDIDATE_FOUND` confirmed.
- `EXECUFLIGHT_READY_FOR_CANONICAL_POA_WITH_SINGLE_ESCAPE_POINT_MULTI_ACTOR_CONTRIBUTIONS`.
- Current classification level for this package: `AUTHOR_APPROVED_DRAFT`.

## 7. Locks Preserved

- `NO_RELEASED_CODE`
- `NO_DOWNSTREAM`
- `NO_FINAL_CONCLUSION`
- `NO_HFACS`
- `NO_RISK_ERC`
- `NO_ARMS_ERC`
- `NO_RECOMMENDATIONS`
- `NO_COMMIT`
- `NO_PUSH`
