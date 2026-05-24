# SERA Engine vNext External Harvest Batch 1 Plan A4R87 v0.2.0

Status: HARVEST_PLAN_DRAFT  
Phase: A4+R-87 — Version External Candidate Discovery Pack  
DOCS_ONLY  
NO_CLASSIFICATION  
NO_PROPOSED_CODE  
NO_NEW_RELEASED_CODE  
NO_DOWNSTREAM

## Objective
Plan structured factual harvesting for the curated external shortlist without performing SERA classification in this phase.

## Batch 1 Shortlist (12)
| candidateId | agency | reportId / event | primaryPurpose |
|---|---|---|---|
| A4R87-EXT-001 | TSB | A19A0055 | Offshore action/monitoring evidence enrichment |
| A4R87-EXT-002 | NTSB | ERA19FA210 | Warning response and perception/action boundary stress |
| A4R87-EXT-003 | AAIB UK | 5/1988 G-BHYB | Known-case anchor enrichment and trace stabilization |
| A4R87-EXT-004 | TSB | A15P0217 | REAL-EVENT-0003 P-axis release challenge/reinforcement |
| A4R87-EXT-005 | ATSB | AO-2024-007 | Mode awareness fixed-wing adversarial coverage |
| A4R87-EXT-006 | NTSB | AAR-18/02 | Objective/procedure boundary with strict quarantine |
| A4R87-EXT-007 | NTSB | CEN10FA079 | Helideck action/feedback mechanism evidence |
| A4R87-EXT-008 | TSB | A11H0001 | Offshore AFCS/mode awareness enrichment |
| A4R87-EXT-009 | TSB | A23P0136 | Condition-dominant adversarial control |
| A4R87-EXT-010 | BEA | PK-TVY notified event | Preliminary locator and offshore context anchor |
| A4R87-EXT-011 | BEA | 5N-BQJ notified event | Existing-case enrichment reference |
| A4R87-EXT-012 | NTSB | CEN17FA072 | Automation feedback fixed-wing boundary test |

## Future Extraction Fields (A4+R-88 Input Contract)
- candidateId
- sourceAgency
- reportId
- sourceUrl
- sourceType (final report, preliminary, notified event locator)
- operationContext
- aircraftType
- factualTimeline
- factualEvidence
- evidenceAnchors
- excludedConclusions
- sourceQualityNote
- needsUrlRecheck

## Non-Scope for This Phase
- No P/O/A assignment.
- No code proposal.
- No release action.
- No runtime output.

## Preparation for A4+R-88
1. Run structured extraction only for shortlisted 12.
2. Apply quarantine protocol to all external conclusions.
3. Link extracted evidence to existing internal cases when applicable.
4. Record unresolved evidence gaps without forcing classification.

## A4+R-88 Execution Update
- 12 structured extractions completed for the shortlisted Batch 1 candidates.
- No classification executed.
- No proposed code created.
- No new released code created.
- No downstream output opened.

Generated in A4+R-88:
- [External Harvest Batch 1 Structured Extraction Summary A4R88](./SERA_ENGINE_VNEXT_EXTERNAL_HARVEST_BATCH_1_STRUCTURED_EXTRACTION_A4R88_v0.2.0.md)
- [External Batch 1 Gap Coverage Matrix A4R88](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_GAP_COVERAGE_MATRIX_A4R88_v0.2.0.md)
- [External Batch 1 Released P-Axis Linkage A4R88](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_RELEASED_P_AXIS_LINKAGE_A4R88_v0.2.0.md)

Next phase recommendation:
- A4+R-89 — External Batch 1 Evidence Normalization and Internal Trace Anchoring (docs-only).
