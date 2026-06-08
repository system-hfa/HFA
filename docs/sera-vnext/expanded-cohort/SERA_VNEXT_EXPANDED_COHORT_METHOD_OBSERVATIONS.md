# SERA vNext Expanded Reviewer Cohort — Method Observations

## Observation Scope

This document records only problems **observed in use** during the expanded cohort execution.
It does not re-validate the full methodology. Methodology is frozen.

## Observations

### OBS-001

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| case_id      | ec-consequence-as-cause                        |
| observation  | Engine correctly refuses to adopt post-event exceedance as the causal anchor when pre-event instability is present in the narrative. |
| classification | NO_METHOD_ISSUE                              |
| note         | Correct behavior confirmed. Escape point identified at pre-exceedance instability. |

### OBS-002

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| case_id      | ec-pf-pm-ambiguity                             |
| observation  | When actor attribution is ambiguous, the engine returns INSUFFICIENT_EVIDENCE rather than defaulting to PF, which is the correct behavior per methodology. |
| classification | NO_METHOD_ISSUE                              |
| note         | RETURN_FOR_REANALYSIS decision was appropriate. Reviewer correctly identified the gap. |

### OBS-003

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| case_id      | ec-progressive-escape-zone                     |
| observation  | Progressive escape zone without a discrete marker returns INSUFFICIENT_EVIDENCE on the escape point. The engine does not fabricate a gate when none is clearly identifiable. |
| classification | NO_METHOD_ISSUE                              |
| note         | Consistent with escape-point enforcement rules. RETURN_FOR_REANALYSIS is the expected reviewer decision. |

### OBS-004

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| case_id      | ec-precondition-confusion                      |
| observation  | Preconditions (fatigue, meteorology, cabin coordination) were correctly NOT placed at the escape point level. The escape point was identified at the specific action/omission. |
| classification | NO_METHOD_ISSUE                              |
| note         | Precondition vs escape point boundary maintained. |

### OBS-005

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| case_id      | ec-oc-temptation, ec-ac-temptation             |
| observation  | Engine does not assign O-C or A-C codes without adequate evidence. Returns null proposedCode rather than guessing. |
| classification | NO_METHOD_ISSUE                              |
| note         | Correct. O-C temptation and A-C temptation cases resolved correctly by not guessing. |

### OBS-006

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| case_id      | ec-post-escape-evidence-trap                   |
| observation  | Engine correctly marks escape point as INSUFFICIENT_EVIDENCE when available evidence is concentrated post-escape. No hallucination of pre-escape state. |
| classification | NO_METHOD_ISSUE                              |
| note         | Engine correctly respects temporal evidence boundary. |

### OBS-007

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| case_id      | ec-action-coherent-wrong-perception            |
| observation  | The engine returned CONFLICTING evidence status and required more evidence, which is correct — the case requires distinguishing the mental model state from the action state. |
| classification | NON_CRITICAL_METHOD_OBSERVATION              |
| note         | The escape point statement should ideally identify WHERE the perception error anchors to a safety gate, not just that the action was coherent with wrong perception. The case is a boundary that may require additional axis coverage documentation. |
| blocking     | NO                                             |

### OBS-008

| Field        | Value                                          |
| ------------ | ---------------------------------------------- |
| scope        | Global / all cases                             |
| observation  | candidate-only output was never confused with final conclusion. The `selectedCode`, `releasedCode`, and `finalConclusion` fields remained null in all 25 analyzed cases and all 7 exported cases. |
| classification | NO_METHOD_ISSUE                              |
| note         | Output locks confirmed functional across all 25 cases. |

## Critical Method Bug Summary

```
CRITICAL_METHOD_BUG_COUNT = 0
```

No critical method bugs were observed. All identified observations are
`NO_METHOD_ISSUE` or `NON_CRITICAL_METHOD_OBSERVATION`.

Expansion to wider cohort is not blocked by methodology issues.

## Classification Summary

| Classification                    | Count |
| --------------------------------- | ----- |
| NO_METHOD_ISSUE                   | 7     |
| NON_CRITICAL_METHOD_OBSERVATION   | 1     |
| CRITICAL_METHOD_BUG               | 0     |
| AUTHOR_DECISION_REQUIRED          | 0     |

## Overall Classification

```
NO_METHOD_ISSUE
```
