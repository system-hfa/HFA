# SERA Engine vNext Axis-Balanced Reference Candidate Matrix A4R111 v0.2.0

Status: AXIS_BALANCED_REFERENCE_CANDIDATE_MATRIX  
Phase: A4+R-111  
DOCS_ONLY  
FULL_AXIS_REBALANCING_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## Best P candidates
| candidateId | whyStrongForP | guardrailNote |
|---|---|---|
| COMAIR-5191 | high cue-availability chain with explicit runway mismatch timeline | keep as P-only internal draft until O/A evidentiary path improves |
| KOREAN-801 | strong ambiguity/monitoring boundary under nonprecision approach constraints | keep boundary status explicit; do not extrapolate to O/A |
| ASIANA-214 | rich automation-mode, speed/path awareness, and delayed recognition chain | P strength does not imply O/A closure |
| UPS-1354 | nonprecision approach with clear monitoring and profile-control evidence | maintain quarantine of probable-cause text |

## Best O candidates
| candidateId | objective-oriented evidence potential | currentReadiness |
|---|---|---|
| AMERICAN-1420 | continuation/decision pressure under weather and operational constraints | HIGH for full-axis batch |
| UPS-1354 | continuation of nonprecision approach and go-around threshold management | HIGH for full-axis batch |
| AIR-CANADA-624 | approach continuation decisions under adverse cues; potential nominal O branch | MEDIUM/HIGH |
| ASIANA-214 | completion objective under sequencing with risk-management boundary | MEDIUM (needs tighter intent-risk slicing) |
| FIRST-AIR-6560 | objective continuity and CRM divergence potential | MEDIUM after source-slice expansion |

## Best A candidates
| candidateId | action-oriented evidence potential | currentReadiness |
|---|---|---|
| ASIANA-214 | mode handling, callout timing, delayed go-around response | MEDIUM/HIGH |
| AMERICAN-1420 | landing execution chain under adverse context, checklist/timing burden | HIGH |
| UPS-1354 | descent profile execution, callouts, stabilization and response sequence | HIGH |
| KEGWORTH-GOBME | wrong-engine response/action selection under ambiguous cues | MEDIUM after deeper extraction |
| COMAIR-5191 | taxi/lineup/cross-check/takeoff sequence is explicit | MEDIUM with source-slice refinement |

## Best multi-axis candidates
| candidateId | multiAxisReason | expectedConstraint |
|---|---|---|
| UPS-1354 | balanced signal for P, O, and A from data-rich report | manage overclassification at O/A boundaries |
| AMERICAN-1420 | strong O and A with sufficient P context for full trace | preserve quarantine of conclusions |
| ASIANA-214 | strong P/A plus potentially recoverable O branch | method/source review still needed before promotion |
| AIR-CANADA-624 | good balance with potential nominal branches in O/A | requires careful separation of environment vs operator axis |

## Best nominal/no-failure axis candidates
| candidateId | likelyNominalAxisValue | note |
|---|---|---|
| AIR-CANADA-624 | O and/or A may allow nominal/no-failure path depending on factual branching | useful to calibrate non-failure documentation discipline |
| COMAIR-5191 | O may trend nominal while P/A hold failure pressure | must avoid using nominal O as shortcut for A |
| FIRST-AIR-6560 | potential nominal branch in one axis with failure in another | needs denser extraction to confirm |
| ASIANA-214 | one of O/A branches may remain nominal while the other is non-nominal | requires tighter source slicing before any closure attempt |

## A4R111 matrix conclusion
- P-only strength is insufficient for complete reference designation.
- Next batch should prioritize candidates with better combined O/A evidence while keeping P documented.
- Boundary-heavy events remain useful, but should not dominate a full-axis reference batch alone.
