# SERA Engine vNext Real Event 0003 Pilot Reaudit A4R139 v0.2.0

Status: PILOT_REAUDIT_COMPLETED
Phase: A4+R-139
methodology: SERA
eventId: REAL-EVENT-0003
authorDecisionStatus: NO_NEW_AUTHOR_DECISION
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Execute the first pilot reaudit under the A4R138 protocol, applying the "P/O/A at escape point" rule (A4R137) to REAL-EVENT-0003 (Tofino night approach near-CFIT). Test whether the protocol produces a valid reaudit or reveals methodological/source gaps.

## Relation to A4R137 and A4R138

- A4R137: Established that P/O/A must be analyzed at the escape-point moment, suspending all prior P/O/A as reference.
- A4R138: Defined the mandatory 6-step protocol for reaudit.
- A4R139 (this phase): Applies the protocol to the first pilot event.

## Pilot Summary

REAL-EVENT-0003 was chosen as first pilot because it had the most pre-existing enrichment: the A4R132 autopilot disconnect enrichment provided specific evidence about the manual/voluntary nature of the autopilot disconnect at 0239:01, and the A4R133 author decision had already approved P-G/O-A (now suspended by A4R137).

### Key Source Facts

| fact | source |
|---|---|
| PF manually disengaged autopilot at 0239:01, 600 ft ASL | TSB A15P0217 |
| SOP: no coupled flight below 1000 ft, decouple before final approach | TSB A15P0217 |
| No system malfunction during flight | TSB A15P0217 |
| ~10s after disconnect: speed < 60 KIAS, pitch > 14° | TSB A15P0217 |
| PF recognized landing zone closer than expected | TSB A15P0217 |
| Large control inputs → hazardous profile | TSB A15P0217 |
| Near-CFIT recovery at very low height | TSB A15P0217 |

### Reaudit Result

| field | value |
|---|---|
| escapePointStatus | SOURCE_PARTIAL |
| sourceConfidence | MEDIUM |
| P | UNRESOLVED |
| O | O-A (HIGH confidence) |
| A | UNRESOLVED |
| blockedReasons | BLOCK_POA_SOURCE_PARTIAL, BLOCK_POA_ACTION_INFERRED_FROM_OUTCOME |
| reAuditDecision | PARTIAL_REAUDIT_AT_ESCAPE_POINT |

## Findings

### 1. Escape point is a progressive zone, not a single discrete moment

The autopilot disconnect at 0239:01 was contextual and SOP-compliant — not the escape point. The departure from safe operation occurred progressively in the manual/visual segment that followed: deceleration, then low speed, then excessive pitch, then large corrective inputs, then hazardous profile. The source describes this as a process, not a single observable act.

This creates a fundamental challenge for the "at escape point" rule: when the escape is progressive, there is no single discrete moment to anchor P/O/A to. The protocol handles this via SOURCE_PARTIAL, which correctly blocks axes that require a precise moment (P, A) while allowing axes that can be evaluated across the escape zone (O).

### 2. O-axis survives the reaudit robustly

The objective at the escape-point zone was to complete the visual approach and land safely. This is independently evidenced:
- The autopilot disconnect was SOP-compliant (transition to visual approach is normal).
- There is no evidence of any objective other than landing safely.
- The PF's corrective actions (lowering collective, adjusting descent) are consistent with trying to land safely, not with an intentional unsafe objective.
- The near-CFIT outcome does not retroactively create an unsafe objective.

O-A holds with HIGH confidence and does NOT depend on post-escape inference.

### 3. P-axis cannot be validated at the escape point

The prior P-G classification (A4R133) was based on a general inference: "flight-state cues were available/monitorable, but were not integrated/monitored in time." This inference is drawn from the outcome (hazardous profile developed), not from specific evidence of what the PF perceived at the first moment of deviation.

The source describes what the PF recognized AFTER the deviation progressed (closer-than-expected landing zone). It does not document what the PF perceived at the exact first moment the approach began to deviate. Without this, P cannot be classified under the at-escape-point rule.

This is the protocol working as designed: it blocks a classification that was previously accepted because the evidence does not anchor it at the escape-point moment.

### 4. A-axis remains blocked for the same reason as pre-A4R137

The PF/PM interaction chain, the specific control inputs at the first moment of deviation (versus later corrective inputs), and the action mechanism are not decomposed in the available source. This was true before A4R137 (A was UNRESOLVED in A4R133) and remains true under the at-escape-point rule.

Additionally, BLOCK_POA_ACTION_INFERRED_FROM_OUTCOME fires because the actions documented in the source (large control inputs) are corrective actions after the deviation developed. The action at the escape-point moment is not directly documented.

## Protocol Assessment

### What Worked

1. The temporal separation (pre-escape / escape / post-escape) was effective at isolating the autopilot disconnect as context rather than escape point.
2. The Hendy gate correctly identified SOURCE_PARTIAL when the escape is a progressive zone.
3. The block system correctly prevented P and A classification where evidence at the escape-point moment was insufficient.
4. The protocol correctly allowed O-A to survive because objective evidence does not depend on a single discrete moment.
5. The protocol did not produce a false classification — it produced a conservative, evidence-bounded result.

### Problems Found

1. **Progressive escape points challenge the "single moment" assumption.** The protocol assumes a discrete observable escape point. When the escape is a progressive degradation (airspeed decreasing, attitude diverging), the protocol correctly returns SOURCE_PARTIAL, but this may be a recurring pattern across events. The protocol could benefit from explicit guidance on progressive/gradual escape points.

2. **MEDIUM source confidence for escape point may be common.** Many real events will have similar source limitations. The protocol's block on P/A when confidence < HIGH could result in many UNRESOLVED P/A axes across the 52 events. This is methodologically correct (conservative) but operationally expensive.

3. **The "safe limit" problem.** When the source does not define a precise safe limit (SOP had no minimum NVFR approach speed), the escape point boundary is inherently fuzzy. This is not a protocol defect — it reflects real source limitations.

## Methodological Decision

The A4R139 pilot validates that the A4R138 protocol works: it correctly identifies source limitations, blocks unsupported classifications, and preserves well-supported ones. The result (PARTIAL_REAUDIT_AT_ESCAPE_POINT, O-A only, P/A UNRESOLVED) is conservative and evidence-bounded.

The prior A4R133 P-G approval is not reinstated. The reaudit demonstrates that P-G was inferred from outcome (hazardous profile developed = monitoring must have failed), not from perception evidence at the escape-point moment. This confirms that the A4R137 reset was necessary.

## Next Steps

1. Author review of this pilot reaudit result.
2. Decide whether to accept P = UNRESOLVED as final for REAL-EVENT-0003 or pursue source enrichment targeting PF perception at the first moment of deviation.
3. Decide whether to accept A = UNRESOLVED as final or pursue PF/PM chain decomposition.
4. O-A can proceed as draft reference on O-axis only, with SOURCE_PARTIAL caveat on escape point precision.
5. Execute Pilot 2: REAL-EVENT-0016 source enrichment for GPS/autopilot failure vs. interpretation.
6. Consider protocol amendment for progressive/gradual escape points based on this pilot finding.

## Locks

- NO_NEW_AUTHOR_DECISION — prior A4R133 P/O/A approval remains suspended.
- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.
- No runtime, UI, API, DB, migration, fixture, baseline, or code changes.
