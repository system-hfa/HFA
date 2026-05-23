# SERA Engine vNext Dry Run — Trial 001 v0.2.0
Status: DRAFT_FOR_REVIEW  
Phase: A4+R-31 — Controlled Dry Run for Trial 001 against vNext Steps 1-3  
Scope: local dry-run validation of vNext steps 1-3 only  
Non-scope: P/O/A implementation, legacy integration, UI integration, API integration, DB writes, HFACS/Risk/ERC outputs

## 1. Purpose
This document records a controlled local dry-run of SERA Engine vNext using the neutral narrative for `TRIAL-SET1-001 / REAL-EVENT-0001`.
The goal is to validate the current behavior of:
- Step 1 factual extraction;
- Step 2 operational unsafe state + decision antecedents separation;
- Step 3 unsafe act vs unsafe condition separation.

## 2. Command executed
```bash
npx tsx tests/sera-vnext/dry-run-trial-001.ts
```

## 3. Narrative used (exact neutral input)
```text
A Sikorsky S-92A was conducting an offshore transport flight from Halifax/Stanfield International Airport to the Thebaud Central Facility with two pilots and passengers on board. The flight was conducted under IFR to an offshore installation.

At the destination, the crew attempted two instrument approaches. Both approaches were unsuccessful because of low cloud and poor visibility. During the second missed approach, the crew obtained visual contact with the offshore facility and then proceeded with a visual approach.

Shortly after the visual approach began, the helicopter developed a high rate of descent and low airspeed. During the recovery, engine torque increased significantly. The descent was arrested at very low height above the water. No injuries were reported.

The event occurred in an offshore visual approach environment with degraded visual references. Available information included aircraft instruments, visual contact with the facility, flight path and airspeed cues, crew monitoring, standard operating procedures and onboard warning systems. The available warning system did not generate an alert in the relevant configuration/envelope.

The available source material does not fully establish, in this neutral narrative, which pilot was flying, which pilot was monitoring, the exact callouts, the precise timing of recognition, or the exact control inputs during the recovery.
```

## 4. Dry-run result
Dry-run status: `PASS`  
Printed message: `SERA vNext Trial 001 dry-run PASS`

## 5. Output summary (vNext)
- `engineVersion`: `sera-vnext-v0.2.0`
- `unsafeState.operationalUnsafeState`: present
- `unsafeState.decisionAntecedents`: present and separated
- `unsafeActCondition`: present
- `poaClassification.*.selectedCode`: `NOT_CLASSIFIED`
- `humanReview.required`: `true`
- `causalAssurance.status`: `PARTIAL_STEPS_1_3_NOT_CLASSIFIED`

## 6. Step 1 evaluation — factual extraction
Observed expected factual capture:
- aircraft/system: `Sikorsky S-92A`, warning/alerting system
- operation type: offshore helicopter transport under IFR context
- location: Thebaud Central Facility offshore
- approach sequence retained:
  - unsuccessful instrument approaches
  - transition to visual approach
  - low-airspeed/high-descent development
  - very-low-height recovery
  - warning barrier did not alert
- environment retained:
  - low cloud
  - poor visibility
  - degraded visual references
  - offshore context
- missing data retained:
  - PF/PM definition gaps
  - missing callouts
  - missing recognition timing
  - missing exact control inputs

Assessment: Step 1 behavior is aligned with neutral factual extraction intent and avoids causal/risk labeling.

## 7. Step 2 evaluation — unsafe state / escape-point formulation
Observed behavior:
- decision antecedent represented as visual continuation after unsuccessful instrument attempts in degraded weather.
- operational unsafe state represented as low-airspeed/high-rate-of-descent condition below safe profile in degraded references, including warning-barrier timing gap.
- final outcome represented as very-low-height recovery with no reported injuries.

Assessment: separation between antecedent and operational state is explicit and consistent with vNext design intent.

## 8. Step 3 evaluation — unsafe act vs unsafe condition
Observed behavior:
- unsafe act statement present, with moderate confidence and uncertainty markers.
- unsafe condition statement present, with high confidence and barrier degradation preserved.
- dominance result: `mixed`.

Assessment: implementation does not force active-failure dominance and preserves uncertainty for missing PF/PM/callouts/timing/inputs.

## 9. Confirmations
- no P/O/A classification implemented beyond `NOT_CLASSIFIED`
- no HFACS output
- no Risk/ERC output
- no legacy engine import in vNext or script
- no UI integration
- no DB/Supabase write
- human review remains required
- causal assurance is not passed yet

## 10. Findings
- Steps 1-3 now produce structured, reviewable output for Trial 001.
- Operational unsafe-state framing is stronger than decision-only framing.
- Unsafe-condition evidence and warning-barrier degradation are preserved.
- Confidence and uncertainty channels are available for later guardrails.

## 11. Adjustments needed before P/O/A phase
- refine PF/PM missing-data detection to reduce implicit assumptions.
- improve confidence heuristics to avoid overconfidence when evidence is sparse.
- add deterministic consistency checks linking Step 1 missing data to Step 3 uncertainty completeness.
- prepare Step 4 direct-actor implementation to avoid premature actor commitment.

## 12. Next steps
- A4+R-32: implement P/O/A statements and classification with strict `NOT_CLASSIFIED -> classified` transition rules and assurance gates.
- keep HFACS/Risk/ERC excluded from causal core until post-assurance phases.
