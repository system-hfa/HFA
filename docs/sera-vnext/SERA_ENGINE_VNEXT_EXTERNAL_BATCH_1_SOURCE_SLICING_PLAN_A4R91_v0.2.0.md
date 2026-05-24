# SERA Engine vNext External Batch 1 Source-Slicing Plan A4R91 v0.2.0

Status: SOURCE_SLICING_PLAN  
Phase: A4+R-91  
DOCS_ONLY  
REVIEW_ONLY  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objective
Define factual slices needed to reduce unresolved axes in future phases while preserving external conclusion quarantine.

| adjudicationId | unresolvedAxis | missingSliceType | neededEvidence | sourceLocationHint | currentBlocker | futureUse | doNotInferRule |
|---|---|---|---|---|---|---|---|
| EXT-BATCH1-ADJUDICATION-001 | O | OBJECTIVE_EVIDENCE | Explicit objective selection traces independent from outcome severity | Objective/procedure narrative sections and operational decision timeline | Objective path under-anchored | Test whether objective remains unresolved after slicing | Do not infer objective quality from result alone |
| EXT-BATCH1-ADJUDICATION-001 | A | CHECKLIST_OR_CALLOUT_SEQUENCE | Own-action verification callouts and post-action checks | Cockpit callout chronology and handling sequence | Own-action feedback loop not isolated | Distinguish unresolved action from feedback failure | Do not convert missing detail into no-failure assumption |
| EXT-BATCH1-ADJUDICATION-002 | O | OBJECTIVE_EVIDENCE | Objective trace separate from warning outcome | Mission objective timeline and decision context | Objective trace not isolated | Validate continued unresolved O or clarify objective path | Do not infer objective inadequacy from alerts alone |
| EXT-BATCH1-ADJUDICATION-002 | A | ALERT_RESPONSE_TIMING | Precise warning-response timing and control inputs after each alert | CVR/FDR timing blocks and warning chronology tables | Action mechanism remains ambiguous | Separate monitoring issue from action execution path | Do not map alert non-response directly to action code |
| EXT-BATCH1-ADJUDICATION-004 | O | PROCEDURAL_CONTEXT | Decision points around repeated approaches and visual transition | Approach-attempt timeline and decision/cue notes | Objective path under-sliced | Re-test unresolved O with stronger evidence | Do not infer objective code from continuation only |
| EXT-BATCH1-ADJUDICATION-004 | A | CHECKLIST_OR_CALLOUT_SEQUENCE | Action execution and verification sequence in terminal approach | Crew callouts, checklist steps, and response timing | Action path unresolved by coarse summary | Clarify if action remains unresolved | Do not infer action fault from impact outcome |
| EXT-BATCH1-ADJUDICATION-006 | P | ALERT_RESPONSE_TIMING | Alert/system-state timing and crew monitoring transitions | TAWS state chronology with route/altitude progression | P path currently unresolved due mixed signals | Determine if perception trace is dominant or not | Do not import probable-cause framing into P decision |
| EXT-BATCH1-ADJUDICATION-006 | A | ACTION_INPUT_OBSERVABLE | Observable pilot inputs and verification after TAWS-related context | Flight-control input timeline and operational communications | Action remains entangled with objective context | Separate action trace from objective draft | Do not treat objective concern as action failure by default |
| EXT-BATCH1-ADJUDICATION-007 | P | PF_PM_TIMELINE | Cue availability and monitoring sequence by role in terminal segment | Terminal segment narrative with role-specific timing | Evidence depth insufficient | Enable first-pass P review | Do not infer perception issue from rollover alone |
| EXT-BATCH1-ADJUDICATION-007 | O | OBJECTIVE_EVIDENCE | Objective trace and operational decision rationale | Mission/objective context sections | No objective anchor | Decide if O remains unresolved | Do not infer objective issue from severity |
| EXT-BATCH1-ADJUDICATION-007 | A | ACTION_INPUT_OBSERVABLE | Detailed terminal control inputs and feedback checks | Low-altitude handling sequence and control response timing | Action mechanism not specific | Enable first-pass A review | Do not infer action failure solely from upset outcome |
| EXT-BATCH1-ADJUDICATION-008 | O | OBJECTIVE_EVIDENCE | Objective trace independent from AFCS behavior | Approach objective timeline and decision anchors | Objective unresolved due mode-focused evidence | Keep or reduce O unresolved with factual support | Do not infer objective path from automation anomalies |
| EXT-BATCH1-ADJUDICATION-008 | A | MODE_STATE_SEQUENCE | AFCS mode transitions aligned with crew actions and checks | AFCS mode logs/sequence and crew interaction chronology | Action and mode interpretation still mixed | Separate perception proposal from action axis | Do not attribute AFCS behavior automatically to crew action failure |
| EXT-BATCH1-ADJUDICATION-012 | O | OBJECTIVE_EVIDENCE | Objective trace in fixed-wing mode-management context | Objective/decision timeline in report narrative | O unresolved with limited objective anchors | Confirm unresolved O or clarify objective path | Do not derive objective from crash endpoint |
| EXT-BATCH1-ADJUDICATION-012 | A | MODE_STATE_SEQUENCE | Mode/status transitions with pilot inputs and verification loops | Mode status timeline, control-input blocks, and callouts | Action unresolved due coarse chronology | Clarify action trace boundary | Do not collapse mode confusion into automatic action failure |

## Slicing Summary
- PF_PM_TIMELINE=1
- ALERT_RESPONSE_TIMING=2
- MODE_STATE_SEQUENCE=2
- ACTION_INPUT_OBSERVABLE=3
- CHECKLIST_OR_CALLOUT_SEQUENCE=2
- PROCEDURAL_CONTEXT=1
- OBJECTIVE_EVIDENCE=7
- TECHNICAL_CONDITION_BOUNDARY=0

