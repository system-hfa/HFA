# REAL-EVENT-BATCH3-EXTRACTION-014

Status:
- STRUCTURED_EXTRACTION_DRAFT
- BATCH_3
- NOT_CLASSIFIED
- NOT_FIXTURE
- NOT_BASELINE
- NOT_CONSENSUS_VALIDATED
- NOT_FOR_DOWNSTREAM
- NO_PROPOSED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_RECOMMENDATIONS

- extractionId: A4R76-B3-014
- batchId: A4R76_BATCH_3
- sourceCandidateId: A4R75-B3-014
- originalRealEventId: REAL-EVENT-0032 (G-EZWM)
- sourceDocument: /Users/filipedaumas/Downloads/pdf24_convertPdfTo-5/pdf24_merged-3.txt
- sourceLocator: lines 2865-2965 (AAIB Bulletin 12/2014 listing and correspondence references)
- shortLabel: A320 G-EZWM AAIB correspondence triage extraction
- aircraftOperation: Airbus A320-214 commercial air transport
- eventType: correspondence-level occurrence with limited factual detail
- sourceType: TXT_CONVERTED_FROM_PDF + INDEX_CORROBORATION
- extractionConfidence: LOW
- anchorQuality: MEDIUM

## factualSummary
Available text confirms AAIB bulletin listing for A320 G-EZWM with correspondence investigation identifiers, but currently provides limited operational sequence depth for full factual reconstruction.

## eventSequence
1. Event is listed in AAIB Bulletin 12/2014 with registration and reference code.
2. Extracted material indicates correspondence-investigation style entry.
3. Detailed chronology, operational context, and actor sequence are not fully present in current extract.

## unsafeStateCandidate
Candidate unresolved due to limited factual sequence in currently extracted bulletin-level text.

## unsafeActConditionCandidate
Not inferable at robust level from current source depth; remains unresolved at extraction stage.

## directActorCandidate
Unresolved in current extraction due to source granularity.

## evidenceFragments
- "AAIB Bulletin: 12/2014 ... G-EZWM"
- "Aircraft Type and Registration: Airbus A320-214, G-EZWM"
- investigation reference identifier snippets

## uncertaintyNotes
- Source is correspondence-level and lacks dense event chronology.
- Not enough extracted detail to support deep mechanism hypotheses.
- Requires primary-report enrichment before strong adjudication confidence.

## excludedInformation
- No inference from missing details.
- No import of external assumptions or third-party summaries as factual certainty.
- No recommendation or cause-statement import.

## possibleEvidenceCategoryHints
- SOURCE_GRANULARITY_LIMIT
- COMMERCIAL_TRANSPORT_PLACEHOLDER
- ENRICHMENT_REQUIRED

## adjudicationQuestions
- Can a primary AAIB/official narrative source be added for chronology depth?
- What minimum sequence is needed to move from triage to robust adjudication?
- Should this remain controlled low-confidence candidate in A4+R-77?

- sourceEnrichmentNeeded: yes
- nextStepRecommendation: Keep in Batch 3 with triage/enrichment lock before deeper adjudication.
