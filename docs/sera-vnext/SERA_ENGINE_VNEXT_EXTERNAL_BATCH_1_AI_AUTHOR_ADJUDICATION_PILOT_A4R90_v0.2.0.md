# SERA Engine vNext External Batch 1 AI/Author Adjudication Pilot A4R90 v0.2.0

Status: AI_AUTHOR_ADJUDICATION_PILOT_SUMMARY  
Phase: A4+R-90  
DOCS_ONLY  
DRAFT_ONLY  
NO_RELEASED_CODE  
NO_DOWNSTREAM

## Objective
Execute a documentary AI/Author adjudication pilot for the seven external Batch 1 extractions marked READY_FOR_FUTURE_ADJUDICATION in A4+R-89, preserving external conclusion quarantine and downstream locks.

## Included Cases
- EXT-BATCH1-EXTRACTION-001 — A4R87-EXT-001 — S-92A inadvertent descent near Sable Island
- EXT-BATCH1-EXTRACTION-002 — A4R87-EXT-002 — AW139 night over-water EGPWS warning sequence
- EXT-BATCH1-EXTRACTION-004 — A4R87-EXT-004 — Helijet S-76C+ night approach near Tofino / Long Beach
- EXT-BATCH1-EXTRACTION-006 — A4R87-EXT-006 — C208B TAWS inhibited CFIT sequence
- EXT-BATCH1-EXTRACTION-007 — A4R87-EXT-007 — S-76C++ helideck/platform rollover sequence
- EXT-BATCH1-EXTRACTION-008 — A4R87-EXT-008 — S-92A go-around mode / AFCS and low-airspeed descent near water
- EXT-BATCH1-EXTRACTION-012 — A4R87-EXT-012 — Citation CJ4 mode/autopilot status event

## Excluded Cases and Reason
- EXT-003: ENRICHMENT_ONLY, legacy source limits standalone readiness.
- EXT-005: NEEDS_SOURCE_RECHECK, partial access and low extraction confidence.
- EXT-009: ADVERSARIAL_CONTROL_ONLY, condition-dominant control case.
- EXT-010: NEEDS_SOURCE_RECHECK, notified-event locator only.
- EXT-011: NEEDS_SOURCE_RECHECK, notified-event locator only.

## Adjudication Summary Table
| adjudicationId | extractionId | proposedP | proposedO | proposedA | maturityStatus | mainUncertainty | nextStep |
|---|---|---|---|---|---|---|---|
| EXT-BATCH1-ADJUDICATION-001 | EXT-BATCH1-EXTRACTION-001 | P-G | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | Specific callouts/parameters need field-level slicing | Author review of P draft |
| EXT-BATCH1-ADJUDICATION-002 | EXT-BATCH1-EXTRACTION-002 | P-G | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | Warning response must not be treated as automatic action/perception label | Author review of P draft |
| EXT-BATCH1-ADJUDICATION-004 | EXT-BATCH1-EXTRACTION-004 | P-G | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | Objective/action paths under-sliced | Author review of P draft |
| EXT-BATCH1-ADJUDICATION-006 | EXT-BATCH1-EXTRACTION-006 | UNRESOLVED | O-D | UNRESOLVED | AUTHOR_REVIEW_READY | Strong external causal language requires strict quarantine | Author review of O draft |
| EXT-BATCH1-ADJUDICATION-007 | EXT-BATCH1-EXTRACTION-007 | UNRESOLVED | UNRESOLVED | UNRESOLVED | EVIDENCE_ENRICHMENT_REQUIRED | Terminal action mechanism not specific enough | Enrich terminal handling sequence |
| EXT-BATCH1-ADJUDICATION-008 | EXT-BATCH1-EXTRACTION-008 | P-C | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | AFCS behavior must be separated from crew interpretation | Author review of P draft |
| EXT-BATCH1-ADJUDICATION-012 | EXT-BATCH1-EXTRACTION-012 | P-C | UNRESOLVED | UNRESOLVED | AUTHOR_REVIEW_READY | Medium-confidence mode/status chronology | Author review of P draft |

## Metrics
- totalAdjudicated=7
- totalAxes=21
- proposedPAxes=5
- proposedOAxes=1
- proposedAAxes=0
- unresolvedPAxes=2
- unresolvedOAxes=6
- unresolvedAAxes=7
- releasedCodeCount=0
- downstreamOpenedCount=0

## Quarantine Compliance
- Probable cause statements were not used as SERA answer keys.
- Contributing factors were not imported as labels.
- Safety recommendations were excluded.
- External causal language was recorded only as quarantined context.
- All draft proposals are AI/Author documentary drafts only.

## Next Recommended Phase
A4+R-91 — External Batch 1 Author Review and Source-Slicing Plan, focused on reviewing the six draft proposed axes and enriching the one unresolved-only case before any release discussion.

