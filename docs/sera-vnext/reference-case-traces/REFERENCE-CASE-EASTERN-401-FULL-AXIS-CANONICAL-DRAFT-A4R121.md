# REFERENCE CASE - EASTERN-401 - FULL AXIS CANONICAL DRAFT A4R121

status: CANONICAL_TRACE_DRAFT
phase: A4R121
eventId: EASTERN-401
unifiedCandidateId: UC-044
methodology: SERA
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
reportSource: NTSB AAR-73-14 (FAA-hosted official PDF) local extracted TXT
validationStatus: REVIEW_AFTER_ESCAPE_POINT_PATCH
releaseStatus: NO_RELEASE
downstreamStatus: CLOSED
frontendReadiness: NOT_READY_PENDING_ESCAPE_POINT_PATCH
authorReviewReadiness: NOT_READY_PENDING_ESCAPE_POINT_PATCH
reviewBundleStatus: REMOVED_PENDING_ESCAPE_POINT_PATCH
sourceQualityStatus: LEGACY_SCAN_LIMITED_LEGIBILITY

## 1. Event factual summary
EASTERN-401 diverted from landing completion after nose-gear indicator anomaly, maintained a troubleshooting segment near 2,000 ft, and descended unnoticed during crew fixation on gear-status resolution tasks. Aircraft impacted terrain in darkness.

## 2. Escape point definition
Primary escape point: first altitude-deviation alert/cue interval during troubleshooting, where instrument cross-check and immediate altitude recovery should have interrupted fixation.
Patch requirement: evidence must be explicitly split into `preEscapeEvidence` and `postEscapeEvidence` before bundle re-entry; post-escape-only evidence cannot independently close P/O/A dominance.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified
- source caution: LEGACY_SCAN_LIMITED_LEGIBILITY remains active; path depends on readable CVR/ATC/altitude/mode sequence and stays warning-bound.

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | E401-E1, E401-E2 | P_ASSESSMENT | Crew belief centered on gear-indication problem while altitude state degraded. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | E401-E1, E401-E2 | P_CAPABILITY | Adequate assessment of altitude trend was not sustained in final segment. |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | E401-E1 | P_TIME_PRESSURE | Core flight-instrument cues were available. |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | NÃO | E401-E2 | P_INFORMATION_AMBIGUOUS | No strong evidence that excessive time pressure is the dominant branch. |
| P_INFORMATION_AMBIGUOUS | A informação era ilusória ou ambígua? | Information illusory or ambiguous? | NÃO | E401-E1 | P_INFORMATION_AVAILABLE | Instrument/alert information was available, with no primary ambiguity evidence. |
| P_INFORMATION_AVAILABLE | A informação estava disponível e correta? | Information available and correct? | SIM | E401-E1 | P-G | Attentional/perception integration failure candidate remains primary. |

P-axis provisional outcome: P-G draft candidate.
Rejected alternative: P-F remains live only as boundary if author review interprets mode/cue interaction as primary ambiguity channel.
Escape-point control:
- P-G remains usable only when tied to cues and non-integration observable before critical margin loss.
- If support collapses to post-escape perception only, P-axis must be downgraded to boundary/UNRESOLVED in future patching.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | E401-E4, E401-E5 | O_RULES | Objective was to resolve gear indication and safely return for landing. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | SIM | E401-E4 | O_MANAGED_RISK | Initial objective was operationally legitimate. |
| O_MANAGED_RISK | O ato inseguro resultou do exercício de uma meta que, embora consistente com as Regras e Regulamentos, não era consistente com os procedimentos operacionais estabelecidos ou não gerenciava ou limitava o risco? | GOAL conservative, managed risk, consistent with SOPs? | NÃO | E401-E5 | O-D | Continuation under degraded altitude-monitoring state suggests unmanaged-risk intent failure. |

O-axis provisional outcome: O-D draft candidate.
Rejected alternative: O-A rejected for late-phase continuation window where risk control degraded.
Temporal framing control:
- O-A remains defensible in the initial troubleshooting segment where resolving the gear-light anomaly was operationally legitimate.
- O-D is applied only in the critical late window, based on continued troubleshooting while altitude-risk management degraded.
- O-D is not inferred from crash outcome; it is tied to the observed continuation logic under active altitude-loss cues.
- If O-D support depends only on post-escape hindsight, O-axis must fall back to O-A/UNRESOLVED pending refined split evidence.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | E401-E6, E401-E7 | A_IMPLEMENTED | Actions included troubleshooting focus, cockpit task redistribution, and incomplete altitude recovery response. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | NÃO_DESLIZE_LAPSO_ERRO | E401-E6, E401-E7 | A-C | Current draft treats omitted timely altitude recovery as implementation-error candidate. |

A-axis provisional outcome: A-C draft candidate.
Rejected alternatives:
- A-F remains live if author review treats the primary failure as action-selection inadequacy (continuing troubleshooting instead of immediate altitude recovery priority).
- A-G remains live if author review weights available alert/feedback cues as inadequately transformed into timely corrective response.
- A-C remains plausible but not a clean closure; A-axis stays boundary-live for author adjudication.
Escape-point control:
- A-C remains a draft hypothesis only where pre-escape implementation evidence exists.
- If A evidence is predominantly post-escape, keep A-F/A-G as active boundaries and avoid dominant closure.

## 7. P/A double-counting control
- P-G is used for perception-state integration: altitude/descida cues were available but not effectively integrated into situational awareness.
- A-C is used for implementation behavior: corrective control/recovery was not effectively executed in time.
- Shared factual nucleus (available altitude cues plus delayed recovery) is not counted twice as the same claim; each axis uses distinct rationale.
- If A-C support is read as perception-only evidence, A-axis closure must remain boundary-live (A-F/A-G) instead of forced dominance.

## 8. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | REVIEW_REQUIRED_PENDING_ESCAPE_POINT_PATCH | P-G draft hypothesis (P-F boundary live) |
| O | REVIEW_REQUIRED_PENDING_ESCAPE_POINT_PATCH | O-D draft hypothesis (O-A early-phase alternative retained) |
| A | REVIEW_REQUIRED_BOUNDARY_LIVE | A-C draft plausibility only (A-F/A-G boundary live) |

No final classification is created.

## 9. Evidence crosswalk
| evidenceId | supports |
|---|---|
| E401-E1 | P_ASSESSMENT, P_INFORMATION_AVAILABLE |
| E401-E5 | O_MANAGED_RISK |
| E401-E7 | A_IMPLEMENTED |

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendation material are quarantined and not used as SERA answer keys.

## 11. Source gaps
- source is official but derived from legacy-scan extraction with residual noise;
- additional clean transcription would reduce uncertainty in borderline nodes;
- source caveat remains mandatory: LEGACY_SCAN_LIMITED_LEGIBILITY.
- pre/post escape-point evidence split is pending and required before any future bundle re-entry.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- Are P/O/A dominant hypotheses still supported when restricted to pre-escape evidence only?
- Is A-axis better represented as A-C or A-F once pre/post escape split is explicit?
- Does A-G gain weight once alert-to-response timing is re-checked line-by-line with pre-escape anchoring?
