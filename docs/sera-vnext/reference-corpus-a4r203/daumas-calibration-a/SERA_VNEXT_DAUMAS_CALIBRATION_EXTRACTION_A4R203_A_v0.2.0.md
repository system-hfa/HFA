# SERA vNext Daumas Calibration Extraction - A4R203-A

Date: 2026-06-04
Phase: A4R203-A
Status: DOCUMENTAL_METHOD_EXTRACTION_COMPLETE

## 1. Objective

Extract Daumas as a human and methodological calibration reference for SERA vNext without using Daumas as a factual source for new real events and without turning Daumas into automatic reentry.

## 2. Method and inputs

- Primary Daumas source found in repo:
  - `metodologia/Dissertacao - Filipe Daumas - ANALISE DE FATORES HUMANOS EM INCIDENTES NA AVIACAO OFFSHORE.pdf`
  - `docs/reference/daumas-sera-offshore.txt`
- Primary Hendy source found in repo:
  - `metodologia/A-tool-for-human-factors-accident-invest-classification-risk-management-K-C-Hendy.pdf`
  - `docs/reference/hendy-sera-2003.txt`
- Supporting vNext inputs read:
  - `A4R167`
  - `A4R168`
  - `A4R200-A`
  - `A4R201-C`
  - `A4R202-A/B/C/D/DR2/E/F`

Method rule:

- Hendy remains the primary source for causal logic.
- Daumas is used here as applied methodological practice and depth reference.
- No Daumas event was reclassified in this phase.
- No final P/O/A output is created in this phase.

## 3. Extracted Daumas principles

### 3.1 Operationalizes Hendy through structured human reconstruction

Daumas applies the same core P/O/A logic through a field-oriented sequence:

- interview and recollection deepening first;
- timeline reconstruction before coding;
- explicit point-of-loss anchor before axis reasoning;
- actor-centered analysis rather than abstract error labels.

This matters because it shows how a human investigator can preserve the Hendy structure while still working with incomplete, interview-driven operational evidence.

### 3.2 Separates MDC deepening from SERA coding

The Daumas cases consistently separate:

- pre-SERA narrative and deepening;
- critical-decision reconstruction;
- later SERA coding.

This is a useful discipline for SERA vNext because it reduces the risk of coding too early and helps keep evidence collection separate from axis closure.

### 3.3 Keeps perception, objective/goal, and action distinct

Daumas is useful not because it changes the Hendy triad, but because it shows how to preserve it in practice:

- perception is anchored in what the operator believed was happening;
- objective/goal is anchored in what the operator was trying to achieve;
- action is anchored in how the operator tried to achieve it.

This is directly consistent with Hendy and with vNext candidate-only reasoning paths.

### 3.4 Treats timing as a bounded operational sequence

Daumas repeatedly works from a bounded operational moment:

- what happened just before the loss of safe operation;
- what the actor was trying to do at that moment;
- what cues were or were not recognized;
- what action followed from that understanding.

This supports the vNext distinction between:

- `earliest_controllable_ref`
- `latest_controllable_ref`
- `first_departure_from_safe_operation`
- `critical_unsafe_act`

Daumas does not replace those distinctions, but it supports deeper human reconstruction around them.

### 3.5 Preserves direct actor focus while still capturing context

Daumas is especially useful in showing that context can be rich without displacing the direct actor:

- organizational pressure can be present;
- environmental difficulty can be present;
- training and supervision limitations can be present;
- but the direct actor at the decisive moment still needs to remain explicit.

This is a strong guard against agent migration.

### 3.6 Treats preconditions as support, not substitute

Daumas carries contextual and organizational material, but the event coding is still centered on the unsafe operational moment. That is methodologically useful for vNext because it reinforces:

- context and preconditions may explain;
- they do not automatically replace the active failure under review.

### 3.7 Supports uncertainty discipline

Daumas is informative where evidence is incomplete because it still records:

- what was recalled;
- what was reconstructed;
- what remained uncertain;
- what was treated as contextual rather than direct.

This is directly useful for candidate-only review and for hold / re-audit decisions.

### 3.8 Helps resist outcome bias

The Daumas cases are operationally useful because the coding is tied to the decision/action boundary rather than to later consequence severity. This is especially helpful for:

- consequence quarantine;
- decision-before-outcome analysis;
- avoiding late-hindsight anchoring.

## 4. Hendy / Daumas / SERA vNext relation

Condensed reading:

- Hendy provides the causal structure and the logic of active failure versus preconditions.
- Daumas shows how a human analyst operationalizes that structure through interview-aware reconstruction, offshore practice, and contextual depth.
- SERA vNext should keep Hendy as the logical authority while borrowing Daumas for depth, analyst discipline, and warning control.

## 5. Depth checklist effect

Daumas materially strengthens the expected detail level for:

- source locator awareness;
- temporal sequence;
- actor directness;
- PF/PM or role attribution when applicable;
- cue recognition versus action execution separation;
- communication and warning context;
- precondition/context notes that do not overrun the active failure;
- explicit uncertainty and evidence-against notes.

## 6. Real-event support

Daumas should support real events as a methodological depth lane only.

- `Comair 5191`: strengthens cue chain and identity-verification discipline without changing clean-anchor status.
- `Asiana 214`: strengthens automation-state and gate-awareness reconstruction without letting automation context replace the crew boundary.
- `UPS 1354`: strengthens setup-versus-execution decomposition and shared-model caution.
- `Colgan 3407`: strengthens window discipline and PF/PM monitoring reconstruction, but does not close the disputed boundary by itself.
- `G-WNSB`: strengthens offshore/helicopter human-dominant detail and actor-migration guardrails.
- `Execuflight 1526`: strengthens command nonintervention and shared-model detail where reconstruction is modestly incomplete.

## 7. Synthetic support

Daumas is useful for synthetic design only as a design-depth lane.

Strongest uses:

- consequence-as-cause traps;
- agent migration traps;
- PF/PM separation;
- warning/callout/go-around framing;
- automation/mode awareness;
- technical-human boundary;
- no-failure boundary;
- objective ambiguity;
- perception/action mismatch.

It should shape:

- the minimum human detail needed;
- the minimum contextual realism needed;
- the failure modes the synthetic must avoid.

It should not be used to auto-materialize any synthetic now.

## 8. Permitted and prohibited use

Permitted:

- methodological reference;
- applied depth reference;
- evidence-depth checklist source;
- reasoning-pattern source;
- support for candidate-only review preparation;
- support for author review preparation;
- support for governance and synthetic guardrails.

Prohibited:

- factual source substitution for external real events;
- automatic reentry trigger;
- automatic baseline or fixture trigger;
- selectedCode or releasedCode justification;
- finalConclusion or READY trigger;
- product behavior shortcut.

## 9. Candidate-only result

Daumas status in A4R203-A:

- source found in repo: YES
- usable as methodological calibration source: YES
- usable as factual source for new real-event evidence: NO
- automatic reentry authority: NO
- automatic READY authority: NO
- baseline or fixture authority: NO

## 10. Next-phase position

Best immediate route:

`A4R203-B - Daumas Calibration Author Review`

Why:

- the primary Daumas and Hendy sources are now confirmed and extracted;
- the methodological patterns are now explicit enough for a controlled human review;
- Colgan and the broader corpus should consume Daumas only after the calibration lane is explicitly reviewed.

Deferred after that:

- `A4R203-B - Governance Simplification Checkpoint`
- `A4R202-G - Colgan Author Dossier`
- `A4R204-A - Synthetic GAP-004 Controlled Design`

Governance note:

- governance simplification should come before any synthetic materialization.

## 11. Lock confirmations

- Daumas used as factual source: NO
- Daumas automatic reentry: NO
- Daumas automatic READY promotion: NO
- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- selectedCode active output: BLOCKED
- releasedCode active output: BLOCKED
- finalConclusion active output: BLOCKED
- CLASSIFIED active output: BLOCKED
- fixture/baseline/product promotion: BLOCKED
- downstream release behavior: BLOCKED
- synthetic-real blending: NO
- no HFACS-to-SERA substitution
- no Risk/ERC/ARMS layer work
- no final recommendation output
