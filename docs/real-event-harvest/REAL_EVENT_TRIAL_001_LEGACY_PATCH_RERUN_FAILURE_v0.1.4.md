# Real Event Trial 001 — Legacy Guardrail Patch Rerun Failure v0.1.4
Status: FAILURE_RECORDED  
Phase: A4+R-25 — Legacy Guardrail Patch Rerun Failure  
Scope: formal record that the legacy engine guardrail patch did not resolve TRIAL-SET1-001  
Non-scope: further engine patches, fixture creation, expected P/O/A assignment, candidate JSON creation, baseline promotion, risk-layer redesign
---
## 1. Purpose
This document records that the legacy engine guardrail patch at commit `7398bc0` did not resolve the methodological failure in TRIAL-SET1-001 when rerun through the UI.
This document serves as the formal justification for halting further patches on the legacy engine and opening a vNext engine track.
This document does not alter the SERA engine.
This document does not create fixtures.
This document does not authorize JSON candidates.
This document does not authorize A5 Risk Layer.

---
## 2. Context

Trial: TRIAL-SET1-001
Event: REAL-EVENT-0001 — S-92A Thebaud

Patch chain:

Phase    Commit    Description
A4+R-22    f05d818    Technical Investigation Plan
A4+R-23    471cd90    Technical Investigation Report
A4+R-24    7398bc0    Guardrail patch: fix(sera): add guardrails for trial 001 causal consistency

The patch at 7398bc0 aimed to add containment guardrails to the legacy engine without a full rewrite. After the patch, TRIAL-SET1-001 was rerun through the UI using the same neutral input narrative from A4+R-18.

---
## 3. Rerun result

Status: FAILED_TO_CONTAIN_REAL_PATH — the patch did not prevent the core failure modes observed in the original run (A4+R-21).

### 3.1 P-A persistence

Output: P-A — Nenhuma Falha de Percepção
Conclusion: detection error (P-A)

P-A still described as a perception failure in the conclusion text. The semantic contradiction between the code label (no perception failure) and the conclusion narrative (detection error) persists.

Failure persisted: YES

### 3.2 O-A persistence

Output: O-A — Nenhuma Falha de Objetivo
Conclusion: routine violation (O-A)

O-A still described as an objective/routine violation in the conclusion text. The semantic contradiction between the code label (no objective failure) and the conclusion narrative (routine violation) persists.

Failure persisted: YES

### 3.3 A-D persistence

Output: A-D — Inabilidade para a Resposta

A-D still selected without evidence of physical, motor, ergonomic, PPE, strength, reach or body-access limitation. The neutral input contained no facts supporting physical inability to execute.

The guardrail may have added a warning or consistency check, but the code was still selected and rendered as the primary action classification.

Failure persisted: YES

### 3.4 HFACS contamination persistence

HFACS still mapped from A-D to skill-based error / physical limitation.

The downstream mapping was not blocked or caveated despite the unsupported action code.

Failure persisted: YES

### 3.5 Risk/ERC persistence

Risk/ERC still displayed as Aceitável (1) without effective caveat indicating that the causal analysis had unresolved contradictions.

Failure persisted: YES

### 3.6 Preconditions divergence persistence

Preconditions conclusion text still diverged from the deterministic preconditions list.

Failure persisted: PARTIAL (may have been partially addressed, but divergence remains)

---
## 4. Why this indicates an architectural problem

The guardrail patch at 7398bc0 attempted containment without restructuring the pipeline. The persistent failures indicate that the legacy engine has fundamental architectural characteristics that make containment insufficient:

### 4.1 Conclusion generation is not code-grounded

The final conclusion text appears to be generated from loose narrative inference rather than being mechanically derived from the selected SERA codes. No guardrail on code selection can fix a conclusion generator that reinterprets codes independently.

### 4.2 A-D gate logic has baked-in ambiguity

The A-D gate appears to match equipment/system/barrier wording patterns that overlap with genuine physical-inability cases. Adding warnings or consistency checks does not fix a gate with inherent false-positive susceptibility — it requires gate redesign.

### 4.3 Downstream modules are independently coupled

HFACS and risk/ERC modules appear to render from the action code without verifying whether the causal analysis itself passed consistency checks. Adding per-module guards creates a whack-a-mole pattern rather than a pipeline integrity guarantee.

### 4.4 Escape point defaults to decision rather than operational state

The engine continues to anchor the escape point at a crew decision rather than at the operational state where safe margin was lost. This is a structural default, not a parameterization issue — it requires pipeline redesign to distinguish causal antecedents from the safe-operation escape point.

---
## 5. Decision

Do not apply further patches to the legacy engine for this failure mode.

Legacy engine status: FROZEN_AS_CONTAINMENT_ONLY

The legacy engine remains usable for:
- existing baseline validation;
- non-real-event analysis where code consistency has been manually verified;
- reference comparison during vNext development.

The legacy engine must not be used for:
- real-event system trials (002–005);
- real-event JSON candidate generation;
- A5 Risk Layer input;
- any new validation claim without explicit human review.

---
## 6. Legacy SERA engine assessment

Dimension    Assessment
Causal pipeline    Functional for baseline fixtures; fragile for real events
Code-conclusion consistency    Not guaranteed; conclusion generation is independent of code semantics
A-D gate    False-positive susceptible on equipment/system/barrier wording
Downstream integrity    HFACS and risk/ERC do not verify upstream consistency
Escape point    Defaults to decision-centered framing
Patchability    Containment-level patches cannot fix architectural coupling

---
## 7. Blocking status

Trials blocked:

Trial    Status
TRIAL-SET1-002    BLOCKED — legacy engine frozen
TRIAL-SET1-003    BLOCKED — legacy engine frozen
TRIAL-SET1-004    BLOCKED — legacy engine frozen
TRIAL-SET1-005    BLOCKED — legacy engine frozen

Phases blocked:

A5 Risk Layer    BLOCKED
JSON candidates from real events    BLOCKED
Real-event baseline promotion    BLOCKED

---
## 8. SERA Engine vNext track

Open a new track for SERA Engine vNext with the following architectural requirements derived from this failure:

### 8.1 Code-grounded conclusion

The conclusion text must be mechanically derived from the selected codes and their documented semantics. P-A must never be described as a perception failure. O-A must never be described as an objective failure. The conclusion generator must have zero independent inference capacity for code interpretation.

### 8.2 A-D gate redesign

The A-D gate must require explicit evidence of physical, motor, ergonomic, PPE, strength, reach or body-access limitation. Equipment/system/barrier wording must not trigger A-D. Anti-gates must reject A-D when the evidence describes aircraft system degradation rather than operator physical limitation.

### 8.3 Downstream consistency gates

HFACS and risk/ERC modules must verify that the causal analysis passed consistency checks before rendering. If the causal output has semantic contradictions, downstream modules must suppress or caveat their output.

### 8.4 Escape point operational anchoring

The escape point must be anchored at the operational state where safe margin was lost, not at a crew decision. Decision antecedents may be captured in preconditions or the unsafe act/condition chain, but the escape point must describe the degraded operational state.

### 8.5 Pipeline integrity

The full pipeline (input → codes → conclusion → preconditions → HFACS → risk/ERC) must maintain trace consistency. Each downstream module must read from the normalized upstream output, not perform independent inference.

---
## 9. Recommended next phase

Recommended next phase:

A4+R-26 — ADR: Legacy Engine Freeze and SERA Engine vNext

Deliverable:

docs/real-event-harvest/ADR_SERA_ENGINE_VNEXT_v0.1.4.md

Purpose:

Formal architecture decision record to freeze the legacy engine and define the vNext engine requirements, scope, and non-regression criteria.

---
## 10. Final status

This document records a real patch rerun failure.

It does not implement fixes.

It does not alter SERA.

It does not alter the causal baseline.

It keeps real-event trials 002–005 blocked.

It keeps A5 Risk Layer blocked.

It opens the SERA Engine vNext track.
