> ARCHIVED / NOT ACTIVE  
> Reason:  
> - INVALID_METHOD_CONTAMINATION  
> - PRE_CANONICAL  
> Usage:  
> - Do not use for SERA reference cases.  
> - Do not use for front-end calibration proof.  
> - Do not use for author approval.  
> - Historical record only.  

# Withdrawn / Boundary Reference Pack — P-Axis A4+R-96

> A4+R-98 STATUS: INVALID_FOR_REFERENCE_USE / NONCANONICAL_TRACE  
> Reason: this document contains or depends on reconstructed/generic question flow rather than exact canonical SERA tree questions.  
> Do not use for front-end calibration, reference case proof, author approval, release decision, or methodology demonstration.  
> Preserved for audit history only.  
> Rebuild required using exact canonical SERA questions.

> A4+R-97 STATUS: PRE_CANONICAL_DRAFT / NOT_FOR_CANONICAL_REFERENCE_USE_YET  
> Reason: this document is a boundary-learning pack and does not yet register exact canonical question-by-question Step-2/3/4/5 traversal.  
> Preserve for audit/governance history only until canonical rebuild format is applied.  
> If exact canonical question trace cannot be assembled, mark `REAL_TREE_MISSING` and keep this pack as non-reference historical material.

## 1. Header
- referencePackId: RC-WITHDRAWN-P-AXIS-BOUNDARY-A4R96
- referenceType: WITHDRAWN_REFERENCE_CASE / BOUNDARY_REFERENCE_CASE
- cases: REAL-EVENT-0015, N109W, N11NM
- status: REFERENCE_TRACE_DRAFT
- intendedUse: calibration of non-classification / overclassification prevention
- notFor: final accident conclusion, HFACS, Risk/ERC, recommendations, blame

## 2. Why this pack exists
Three P-axis pilot releases were later withdrawn by explicit retrospective author review in A4+R-92.  
This pack preserves the before/after methodological evolution instead of hiding it.  
Its purpose is to teach when not to keep P-G/P-C and why returning to `UNRESOLVED` can be the safer methodological outcome.  
These are calibration-negative cases for future front-end explanation of disciplined non-classification.

## 3. Case A — REAL-EVENT-0015 — withdrawn P-G
- previousCode: P-G
- authorDecision: WITHDRAW_APPROVAL
- revisedStatus: P_UNRESOLVED

### short factual summary
PH-KHB performed offshore night operations and entered a second approach after a go-around.  
In the final segment, deceleration/power/height management degraded and the helicopter impacted water.

### why P-G initially looked plausible
- dark-night, low-reference environment;
- evidence of monitoring degradation in unstable low-energy approach;
- unresolved A-axis mechanism favored conservative P-only pilot release at the time.

### key author review question that changed decision
Was perception-monitoring failure truly dominant, or was the event more consistent with action/energy-management and late corrective capability limits?

### why P-G was withdrawn
Author review determined the event appears more likely action-dominant (energy-management / inadequate corrective response under low margin), and that wrong parameters were likely perceived at least partially. This weakened P-G as dominant explanation.

### likely boundary
action/energy-management/late-recovery boundary versus pure perception failure.

### safe-operation escape point (boundary view)
The safe envelope was likely lost when second-approach profile transitioned into low-energy/high-risk state without effective recovery margin before water impact.

### mini SERA trace
- P-axis: not maintained as P-G after author review due dominance uncertainty between perception and action chain.
- O-axis: not released.
- A-axis: not released; action-dominant suspicion documented without classifying.

### rejected alternatives (in this boundary pack)
- maintain P-G rejected as overclassification risk under mixed perception/action evidence.
- release O-axis rejected due no dedicated objective release proof.
- release A-axis rejected due no fully separable mechanism trace.

### calibration lesson
Bad outcome plus dark-night context does not automatically justify perception code maintenance when action chain may be more dominant.

### frontend display note
Show "Before: P-G pilot release" and "After: withdrawn to unresolved", highlighting the decision question that changed dominance interpretation.

## 4. Case B — N109W — withdrawn P-G
- previousCode: P-G
- authorDecision: WITHDRAW_APPROVAL
- revisedStatus: P_UNRESOLVED

### short factual summary
N109W continued under VFR in mountainous terrain with deteriorating weather and later impacted terrain (CFIT profile).

### why P-G initially looked plausible
- terrain/weather monitoring context;
- continued route under deteriorating visibility suggested perceptual-monitoring pressure.

### key author review question that changed decision
Were perceptual sources "normal enough" for a simple situational-monitoring failure, or did degraded weather shift the problem into altered instrument/source processing boundary?

### why P-G was withdrawn
Author review concluded degraded meteorological context altered the perceptual source regime; the issue looked less like simple situational monitoring and more like complex cue/instrument processing under degraded context, without enough evidence for a firm P code.

### likely boundary
degraded meteorology and altered cue sources versus normal-situation P-G monitoring failure.

### safe-operation escape point (boundary view)
Before terrain margin became irrecoverably inadequate, at the deteriorating-weather continuation decision boundary.

### mini SERA trace
- P-axis: P-G not maintained due source-regime ambiguity and instrument-processing boundary uncertainty.
- O-axis: not released in this pack.
- A-axis: not released in this pack.

### rejected alternatives (in this boundary pack)
- maintain P-G rejected due over-simplification risk in degraded cue regime.
- force P-F or P-C rejected due insufficient specific evidence for illusion-only or knowledge-mode mechanism.
- release O/A rejected due non-release scope and unresolved mechanism dependencies.

### calibration lesson
Meteorology-degraded contexts can invalidate "simple monitoring" assumptions and require stronger source-specific mechanism evidence.

### frontend display note
Display this as a "weather-source boundary" exemplar: why unresolved was safer than preserving a single-axis certainty.

## 5. Case C — N11NM — withdrawn P-C
- previousCode: P-C
- authorDecision: WITHDRAW_APPROVAL
- revisedStatus: P_UNRESOLVED

### short factual summary
N11NM entered night IMC missed-approach/go-around context with unstable attitude/energy regime and LOC dynamics.

### why P-C initially looked plausible
- automation/mode-awareness narrative;
- cockpit-data references suggesting interpretation boundary under workload.

### key author review question that changed decision
Is there direct evidence of knowledge/comprehension deficiency (system/mode/configuration understanding), or only degraded perceptual context with probable disorientation?

### why P-C was withdrawn
Author review found no direct proof that the pilot lacked required knowledge/comprehension for perception processing. IFR/fog/disorientation context alone did not satisfy P-C threshold without explicit mode/system knowledge mismatch evidence.

### likely boundary
IFR/fog/disorientation environment versus evidence-backed system/mode/knowledge deficit.

### safe-operation escape point (boundary view)
During missed-approach transition where attitude/energy/mode recognition needed immediate stable integration and recovery margin narrowed.

### mini SERA trace
- P-axis: P-C not maintained due missing direct knowledge-mode mismatch proof.
- O-axis: not released.
- A-axis: not released.

### rejected alternatives (in this boundary pack)
- maintain P-C rejected due insufficient direct threshold evidence.
- force P-G rejected because current pack does not support replacing one overfit with another.
- release O/A rejected due unresolved mechanism decomposition.

### calibration lesson
Disorientation context is not a shortcut to knowledge-comprehension coding.

### frontend display note
Show this as "threshold discipline": context severity does not replace mechanism evidence.

## 6. Cross-case lessons
- Poor outcome does not prove P-G.
- Action-dominant events should not be recast as P-G to fill uncertainty.
- Degraded meteorology changes the perceptual-source regime and may invalidate simple monitoring assumptions.
- Disorientation does not prove P-C.
- IFR/fog/LOC is not an automatic proxy for knowledge/comprehension failure.
- Withdrawal is evidence of methodological control, not project failure.
- `UNRESOLVED` is a safe and valid decision when question-path evidence cannot sustain code threshold.

## 7. UI/front-end display guidance
- Display as `Boundary calibration cases`.
- Show before/after decision states (pilot release -> withdrawn).
- Show the question that changed the decision for each case.
- Show why withdrawal was methodologically safer.
- Do not present as an error list.
- Do not present as final accident cause.
- Do not open HFACS/Risk/ERC/recommendations outputs.

## 8. Evidence/quarantine
### factual evidence used
- Existing internal extraction/adjudication/backfill traces and A4+R-85/A4+R-92 review documents for each case.
- Operational sequence, context, and uncertainty statements only.

### conclusions quarantined
- external probable-cause and findings text;
- external contributing-factor labels as direct SERA code answers;
- external recommendations as mechanism proof.

### source limitations
- PF/PM role detail and action-chain granularity remain partial in parts of the cases.
- some mode/input sequencing remains incompletely reconstructed.
- these limitations are precisely why withdrawal/unresolved became the safer boundary.
