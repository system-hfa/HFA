# REFERENCE CASE - AMERICAN-1420 - FULL AXIS CANONICAL DRAFT A4R115

status: CANONICAL_TRACE_DRAFT
phase: A4R115
eventId: AMERICAN-1420
unifiedCandidateId: UC-004
methodology: SERA
canonicalTreeSource: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
checklist: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
reportSource: NTSB AAR-01/02 local TXT/PDF
validationStatus: REVIEW_REQUIRED_AFTER_OPUS_AUDIT
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM
frontendReadiness: NOT_READY_REVIEW_REQUIRED
reviewBundleStatus: NOT_READY_FOR_AUTHOR_REVIEW_BUNDLE

## 1. Event factual summary
American 1420 continued toward Little Rock in severe weather, with repeated wind, windshear, visibility, and visual-reference problems. The aircraft landed and overran runway 4R. FDR/CVR data show final low-altitude cues, touchdown, non-symmetric spoiler deployment, braking, and reverse-thrust sequence.

## 2. Escape point definition
Primary escape point: final approach when severe weather, crosswind/windshear alerts, loss of visual contact, and unstable cues were present. Secondary escape point: after touchdown, where spoiler deployment/braking verification was critical.

## 3. Canonical source preflight
- asset file: A4R99 canonical tree asset
- checklist file: A4R99 validation checklist
- node path availability: P, O, and A nodes used below exist in A4R99
- missing nodes: none identified

## 4. P-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| P_ROOT | O que o operador acreditou que estava acontecendo no ambiente com relação ao objetivo que pretendia alcançar? | What did the operator or crewmember believe was the state of the world with respect to the goal(s)? | START | AA1420-E2, AA1420-E3, AA1420-E4 | P_ASSESSMENT | Crew belief concerned runway/weather/visual approach feasibility. |
| P_ASSESSMENT | Avaliação correta ou adequada da situação? | Correct or adequate assessment of the situation? | NÃO | AA1420-E2, AA1420-E3, AA1420-E4 | P_CAPABILITY | Final approach evidence shows difficulty maintaining visual and stable cues. |
| P_CAPABILITY | Possuía a capacidade necessária para sentir e perceber a situação? | Had the pre-requisite capability to sense and perceive the situation? | SIM | AA1420-E2, AA1420-E4 | P_TIME_PRESSURE | Weather/visibility information was available; no sensory incapacity shown. |
| P_TIME_PRESSURE | A pressão do tempo percebida era excessiva? | Time pressure excessive? | SIM_ATENCAO | AA1420-E1, AA1420-E2, AA1420-E4 | P-D | Expedited arrival/duty/weather pressure plausibly compressed attention in final approach. |

P-axis provisional outcome: P-D draft candidate.
Rejected alternative: P-G remains possible because cues were available and correct; P-D is retained only as draft because timing/pressure evidence is strong.

A4R117 patch note on P-axis:
- `P-D` is not sustained as a closure-quality outcome in current form.
- `P-F`, `P-G`, and `UNRESOLVED` remain conservative live alternatives.
- Expedite-arrival and weather context alone are not treated as sufficient evidence of excessive perceived time pressure.

## 5. O-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| O_ROOT | O que o operador estava tentando alcançar? Qual era a intenção ou o objetivo que o levou a cometer o ato inseguro? | What was the operator or crew member trying to achieve...what was the intent or goal(s) that led to the unsafe act? | START | AA1420-E1, AA1420-E2, AA1420-E3 | O_RULES | Objective was to complete landing at Little Rock before weather closed the opportunity. |
| O_RULES | O objetivo era consistente com as regras, regulamentos e procedimentos operacionais estabelecidos e também era consistente com um bom gerenciamento de riscos? | Was the GOAL consistent with rules, regulations and SOPs, and was it also consistent with good risk management? | NÃO | AA1420-E2, AA1420-E3, AA1420-E4 | O_ROUTINE | Continuation in severe weather and possible crosswind exceedance make rule/risk consistency doubtful. |
| O_ROUTINE | Violação de rotina? | Routine violation? | NÃO | AA1420-E2, AA1420-E4 | O-C | The slice does not support routine violation as an organizationally repeated pattern. |

O-axis provisional outcome: O-C draft candidate.
Rejected alternative: O-D possible if author treats the objective as non-violation poor risk management rather than exceptional violation.

A4R117 patch note on O-axis:
- `O-C` is treated as overclassification risk in current framing.
- `O-D` and `UNRESOLVED` are conservative live alternatives.
- Exceptional-violation framing requires explicit evidence of deliberate violation behavior, not only SOP deviation or poor outcome.

## 6. A-axis canonical path
| nodeId | exactQuestionTextPT | exactQuestionTextENAnchor | answerOptionSelected | evidenceIds | nextNodeId/leaf | uncertainty |
|---|---|---|---|---|---|---|
| A_ROOT | Como o operador estava tentando atingir o objetivo? | How was the operator trying to achieve the goal(s)? | START | AA1420-E4, AA1420-E5, AA1420-E6 | A_IMPLEMENTED | Actions include final approach control, landing rollout, spoiler/brake/reverse-thrust management. |
| A_IMPLEMENTED | A ação foi implementada como pretendida? | Implemented as intended? | NÃO_DESLIZE_LAPSO_ERRO | AA1420-E5, AA1420-E6 | A-C | Spoiler deployment/verification chain supports implementation error candidate. |

A-axis provisional outcome: A-C draft candidate.
Rejected alternative: A-F possible for continuing landing, but spoiler/brake rollout facts are stronger for action implementation.

A4R117 patch note on A-axis:
- `A-C` is treated as fragile in current framing.
- `A-F` and `UNRESOLVED` remain conservative live alternatives.
- Non-symmetric spoiler behavior does not isolate a human lapse by itself.

## 7. Axis outcome summary
| axis | status | provisional outcome |
|---|---|---|
| P | REVIEW_REQUIRED_AFTER_OPUS_AUDIT | P-F or P-G or UNRESOLVED (P-D non-closure) |
| O | REVIEW_REQUIRED_AFTER_OPUS_AUDIT | O-D or UNRESOLVED (O-C overclassification risk) |
| A | REVIEW_REQUIRED_AFTER_OPUS_AUDIT | A-F or UNRESOLVED (A-C fragile) |

No final classification is created.

## 8. Evidence crosswalk
| evidenceId | supports |
|---|---|
| AA1420-E2 | P_CAPABILITY, P_TIME_PRESSURE, O_RULES |
| AA1420-E4 | P_ASSESSMENT, P_TIME_PRESSURE, O_ROUTINE |
| AA1420-E6 | A_IMPLEMENTED |

## 9. Rejected alternatives
- P-G: held because time/weather pressure appears central, but needs author review.
- O-D: plausible if no exceptional-violation framing is accepted.
- A-F: not primary because spoiler implementation/verification is more concrete in the source slice.

## 10. Quarantine of external investigation conclusions
Probable cause, contributing factors, findings, and safety recommendations are quarantined and not used as SERA answer keys.

## 11. Source gaps
- Need substantive rework before any author-review bundle intake.
- Need dedicated objective-evidence pass before any exceptional-violation framing reuse.
- Need action-branch recheck to separate human execution issues from system-state effects.

## 12. Front-end future display notes
Draft only; not final causation; not risk scoring; not a safety recommendation; not release-ready.

## 13. Review questions for author
- AMERICAN-1420 is not ready for author-review bundle in A4R117.
- Next valid step is rework/retrace with conservative alternatives preserved and no forced closure.
