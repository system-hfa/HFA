# P-Axis Release Pilot N109W P-G A4R85

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

- releasePilotId: P-AXIS-RELEASE-PILOT-N109W-PG-A4R85
- phase: A4+R-85
- caseId: N109W
- shortLabel: N109W A109A II mountain CFIT
- axis: P
- proposedCode: P-G
- releasedCode: P-G
- releaseType: AUTHOR_APPROVED_P_AXIS_MICRO_PILOT
- authorDecisionRef: SERA_ENGINE_VNEXT_P_AXIS_MICRO_PILOT_AUTHOR_DECISION_INTAKE_A4R84_v0.2.0.md / A4R83-P-003
- sourcePacketRef: release-pilot-author-packets/P-AXIS-AUTHOR-PACKET-N109W-PG.md
- questionPathRef: REAL-EVENT-BATCH3-ADJUDICATION-008

## evidenceRefs
- `REAL-EVENT-BATCH3-EXTRACTION-008`: VFR flight in mountainous region, deteriorating weather, continued route, terrain impact.
- `REAL-EVENT-BATCH3-ADJUDICATION-008`: P-axis questionPath and reasoning support weather/terrain monitoring degradation.
- Consolidated tracker A4R78: N109W carried as `AUTHOR_REVIEW_READY` with P-G/O-D/A unresolved.

## releaseRationale
The author approved this P-axis micro-pilot release after the A4+R-82 strong-candidate review and A4+R-83 packet. The P-G release is limited to the perception axis: terrain/weather information was available in the operating context, deteriorating visibility was documented, and the VFR/terrain-monitoring boundary supports P-G while O-D remains separate.

## acceptedUncertainty
- Precise decision alternatives and cockpit cue sequence are not fully extracted.
- O-D objective issue remains draft-only and outside this release.
- A-axis remains `UNRESOLVED`.

## releaseLimitations
- This is a documentary pilot release only.
- It applies only to the P axis.
- It does not classify the full case.
- It does not release O or A.
- It does not change selectedCode or create CLASSIFIED status.
- It does not authorize downstream output.

## rejectedAlternatives
- `P-F` rejected without specific illusion/distortion evidence.
- `P-D` rejected because dominant excessive time pressure is not documented.
- O-D and A-axis questions are outside this P-axis release.

## rollbackTriggers
- New source contradiction.
- Method inconsistency with P-G criteria.
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
