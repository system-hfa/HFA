# SERA Engine vNext Release Pilot Shortlist A4R82 v0.2.0

Status: DESIGN_ONLY  
Phase: A4+R-82 — Author Review of Release Eligibility Matrix  
NO_RELEASED_CODE  
NO_DOWNSTREAM  
NO_FIXTURE  
NO_BASELINE

## Objective
List the axes that remain possible future release pilot candidates after A4+R-82 author-review filtering. This shortlist does not create release and does not alter proposed P/O/A values.

## Strong Candidates
| caseId | axis | proposedCode | why included | blocking concerns | required author action before release | required source action before release | downstreamLocked |
|---|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | P | P-G | Strong perception/action boundary with no enrichment flag. | A-axis remains unresolved. | Approve P-only pilot scope and accepted uncertainty. | Confirm evidenceRefs and questionPath anchors. | true |
| REAL-EVENT-0015 | P | P-G | High-value dark-night P-axis boundary case. | A-axis input/callout chain remains unresolved. | Approve P-only review while preserving A unresolved. | Confirm monitoring/cue evidence anchors. | true |
| N109W | P | P-G | High-source VFR/terrain-monitoring boundary case. | O-D remains separate and held. | Approve P-only review independent of O-D. | Confirm P-G evidenceRefs and limitations. | true |
| N11NM | P | P-C | High-source automation/mode-awareness case. | A-axis remains unresolved. | Approve P-C threshold and P/A separation. | Confirm automation/mode cue anchors. | true |

## Weak Candidates
| caseId | axis | proposedCode | why included | blocking concerns | required author action before release | required source action before release | downstreamLocked |
|---|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | O | O-A | Useful constrained O-A compatible-objective control. | O-A overuse and fallback risk. | Approve O-A control inclusion and limitations. | Confirm no objective-deviation evidence is being ignored. | true |
| D-HHNH | P | P-G | Coherent Batch 3 P-G path. | MEDIUM source quality. | Accept medium-source limitation or defer. | Confirm whether source detail is sufficient. | true |
| G-BHYB | P | P-F | Only P-F draft and useful visual-distortion test. | Single observed P-F pattern. | Confirm P-F vs P-G threshold. | Confirm environmental/perceptual anchors. | true |
| HL9294 | P | P-G | High-source P-G path in objective-diversity case. | O-D sensitivity in same case. | Decide whether P can be reviewed before O-D. | Confirm P evidence can stand independent of O-D. | true |
| N11NM | O | O-A | Possible O-A control paired with strong P-C case. | O-A overuse risk. | Approve as one limited O-A control, not default policy. | Confirm objective-compatible evidence anchors. | true |
| BS211-Q400 | P | P-H | Communication/information-chain draft with high source quality. | Same case has rare O-C and A-F drafts. | Approve P-H-only pilot scope while holding O/A. | Confirm information-chain evidenceRefs. | true |

## Not Selected for First Pilot
| caseId | axis | proposedCode | reason not selected |
|---|---|---|---|
| REAL-EVENT-0001 | P | P-G | HOLD_FOR_ENRICHMENT due PF/PM/action ambiguity and enrichment flag. |
| REAL-EVENT-0001 | O | O-A | HOLD_FOR_METHOD_REFINEMENT due O-A fallback risk and enrichment flag. |
| REAL-EVENT-0015 | O | O-A | HOLD_FOR_METHOD_REFINEMENT; not central to pilot question. |
| REAL-EVENT-0016 | P | P-C | HOLD_FOR_AUTHOR_CLARIFICATION; automation/action separation still sensitive. |
| REAL-EVENT-0016 | O | O-A | HOLD_FOR_METHOD_REFINEMENT; O-A sampling policy needed. |
| D-HHNH | O | O-A | HOLD_FOR_METHOD_REFINEMENT; O-A overuse risk. |
| G-BHYB | O | O-A | HOLD_FOR_METHOD_REFINEMENT; P-F is the informative axis. |
| HL9294 | O | O-D | HOLD_FOR_AUTHOR_CLARIFICATION; O-D threshold needs author decision. |
| N109W | O | O-D | HOLD_FOR_AUTHOR_CLARIFICATION; O-D threshold needs author decision. |
| BS211-Q400 | O | O-C | HOLD_FOR_AUTHOR_CLARIFICATION; only O-C draft and consciousness threshold sensitive. |
| BS211-Q400 | A | A-F | HOLD_FOR_AUTHOR_CLARIFICATION; only proposed A code in corpus. |

## Guardrails
- No `UNRESOLVED` axis is included.
- Active Objective pilot scope excludes any code outside `O-A/O-B/O-C/O-D`.
- No release is created by this shortlist.
- Downstream remains locked for every shortlisted axis.
