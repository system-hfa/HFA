# SERA Baseline - HFA

## Scope

This baseline freezes, for now, the current methodological behavior of the SERA layer in HFA:

- Step 3: perception classification.
- Step 4: objective classification.
- Step 5: action classification.
- Step 6/7: basic ERC level and deterministic preconditions.

The purpose is to preserve the stabilized discriminators while new fixtures and adversarial cases are added.

## Core methodological discriminators

### Perception

- P-A: default when there is no explicit independent perceptual failure.
- P-D: attention overload, high demand, operational congestion, or frequency/channel saturation.
- P-E: temporal estimation failure, checklist timing problem, or sequence interrupted by insufficient time.
- P-G: available information not checked, complacency, or monitoring failure.
- P-H: ambiguous, incomplete, or failed communication/information transfer.

### Objective

- O-A: default when there is no explicit deviant objective.
- O-B: routine, normalized, habitual, or culturally tolerated violation.
- O-C: explicit human/protective objective, such as passenger, patient, medical emergency, or avoiding deterioration/aggravation.
- O-D: efficiency, economy, time gain, connection window, productivity, or fuel saving without normalization and without explicit human protection.

### Action

- A-A: no specific action error; the unsafe act derives from the objective.
- A-B: procedural omission or lapse.
- A-C: failure to verify the result of one's own action.
- A-D: physical, ergonomic, reach, force, PPE, or equipment execution incapacity.
- A-E: lack of knowledge, skill, training, or technical competence.
- A-F: wrong selection among available alternatives.
- A-G: supervision, delegation, or failure to verify a third party's action.
- A-H: temporal management failure during execution.
- A-I: wrong selection or instruction under explicit operational load.
- A-J: confirmation, readback, receipt, or operational communication failure.

## Precedence rules

- A-J beats A-I when communication, confirmation, readback, or receipt is the dominant mechanism.
- A-G beats A-C when verification concerns another person's delegated action.
- A-C beats A-J when the unsafe act is failure to verify the result of one's own action and communication is not central.
- O-B beats O-D when time gain occurs inside a habitual or normalized violation.
- O-C beats O-A and O-D when explicit human protection is present.
- O-D beats O-C when the evidence is only efficiency, connection, or economy without explicit human protection.
- P-E beats P-D in a pure temporal problem.
- P-D beats P-A when explicit high demand is present.

## Preconditions

Preconditions are selected after the final P/O/A/ERC codes are known.

The selection is deterministic. The LLM should not be the primary source of precondition selection. The selector uses the matrix in `rules/preconditions/matrix.json`, and the runner should receive a final array of codes, for example:

```json
["P2", "S1", "O3", "T1"]
```

## Testing strategy

The full 36 x 3 run is expensive and should not be routine.

Use static tests for helpers and preconditions on every rule change. Use `SERA_N_RUNS=1` only for real integration canaries. Use `SERA_N_RUNS=3` only for critical clusters or milestones.

## Current risk

Some rules are still calibrated from golden fixtures. The next maturity step requires broader generalization fixtures and adversarial cases.

Do not add fixture-specific overrides unless they are expressed as a general methodological rule.
