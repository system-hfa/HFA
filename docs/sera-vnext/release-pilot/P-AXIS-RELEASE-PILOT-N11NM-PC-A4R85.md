# P-Axis Release Pilot N11NM P-C A4R85

Status:
- RELEASE_PILOT_DOCUMENT
- DOCS_ONLY
- AXIS_ONLY
- P_AXIS_ONLY
- DOWNSTREAM_LOCKED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CASE_CLASSIFICATION
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- releasePilotId: P-AXIS-RELEASE-PILOT-N11NM-PC-A4R85
- phase: A4+R-85
- caseId: N11NM
- shortLabel: N11NM AW109S missed-approach LOC
- axis: P
- proposedCode: P-C
- releasedCode: P-C
- releaseType: AUTHOR_APPROVED_P_AXIS_MICRO_PILOT
- authorDecisionRef: SERA_ENGINE_VNEXT_P_AXIS_MICRO_PILOT_AUTHOR_DECISION_INTAKE_A4R84_v0.2.0.md / A4R83-P-004
- sourcePacketRef: release-pilot-author-packets/P-AXIS-AUTHOR-PACKET-N11NM-PC.md
- questionPathRef: REAL-EVENT-BATCH3-ADJUDICATION-009

## evidenceRefs
- `REAL-EVENT-BATCH3-EXTRACTION-009`: night IMC missed-approach sequence, unstable energy/attitude regime, automation/energy/cockpit-data context.
- `REAL-EVENT-BATCH3-ADJUDICATION-009`: P-axis questionPath supports P-C and rejects P-G as less specific.
- Consolidated tracker A4R78: N11NM carried as `AUTHOR_REVIEW_READY` automation_mode_awareness pattern.

## releaseRationale
The author approved this P-axis micro-pilot release after the A4+R-82 strong-candidate review and A4+R-83 packet. The P-C release is limited to the perception axis: mode, airspeed, attitude, torque, and cockpit-data cues were available, and the supported mechanism is knowledge-mediated mode/state interpretation rather than general monitoring failure.

## acceptedUncertainty
- Exact mode-selection timeline and callout chain remain partially extracted.
- A-axis action/input/feedback chain remains unresolved.
- P-C threshold is accepted for this pilot while preserving P/A separation.

## releaseLimitations
- This is a documentary pilot release only.
- It applies only to the P axis.
- It does not classify the full case.
- It does not release O or A.
- It does not change selectedCode or create CLASSIFIED status.
- It does not authorize downstream output.

## rejectedAlternatives
- `P-G` rejected as less specific than automation/mode interpretation in the draft.
- `P-F` not selected because night IMC is contextual rather than the dominant P mechanism.
- A-axis alternatives remain outside this P-axis release.

## rollbackTriggers
- New source contradiction.
- Method inconsistency with P-C criteria.
- Author withdrawal.
- Downstream misuse or whole-case classification attempt.

## downstreamLocks
- finalConclusionLocked: true
- hfacsLocked: true
- riskLocked: true
- recommendationsLocked: true
- caseClassificationLocked: true
- fixturePromotionLocked: true
- baselinePromotionLocked: true

## nonScope
- O-axis
- A-axis
- finalConclusion
- HFACS
- Risk/ERC
- recommendations
- UI/API/DB
- runtime

## nextStepRecommendation
Carry this pilot record to A4+R-86 for P-axis release pilot audit and rollback readiness.
