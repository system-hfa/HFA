# SERA Engine vNext Independent Opus Review A4R132 v0.2.0

Status: EXTERNAL_INDEPENDENT_REVIEW_REGISTERED
Phase: A4+R-132
methodology: SERA
reviewType: EXTERNAL_INDEPENDENT_REVIEW
reviewerModel: Opus
authorDecisionStatus: AUTHOR_DECISION_PENDING
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective
Register an independent second opinion from Opus on the five A4R131 author review packets, without recording author approval, without creating releasedCode, and without opening downstream.

This is an independent review, not an author decision. The author decision remains pending for all five events.

## Scope
Included events:
- `REAL-EVENT-0003`
- `REAL-EVENT-0016`
- `BS211-Q400`
- `A4R87-EXT-002`
- `ASIANA-214`

Explicitly excluded:
- `AMERICAN-965` - remains `SOURCE_ENRICHMENT`
- `COMAIR-5191` - remains `SOURCE_ENRICHMENT`

## Files Reviewed
- `docs/sera-vnext/SERA_ENGINE_VNEXT_AUTHOR_REVIEW_PACKETS_A4R131_v0.2.0.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR_REVIEW_TRACKER_A4R131_v0.2.0.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-REAL-EVENT-0003-A4R131.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-REAL-EVENT-0016-A4R131.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-BS211-Q400-A4R131.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-A4R87-EXT-002-A4R131.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-ASIANA-214-A4R131.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md`

## Declaration
This review is an EXTERNAL_INDEPENDENT_REVIEW by Opus. It is not an author decision. It does not create releasedCode, does not open downstream, does not change P/O/A technical content, and does not register author approval. The author decision remains AUTHOR_DECISION_PENDING for all five events.

## Opus Summary Matrix

| Event | Escape Point | Quando OK? | P | O | A | Exit Quarantine? | Future Release? | Risk |
|---|---|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | APROVO com nota | SIM | APROVO — P-G | APROVO — O-A | APROVO — UNRESOLVED | SIM parcial | SIM limitado a P-G/O-A | BAIXO |
| REAL-EVENT-0016 | APROVO | SIM | PRECISO REVISAR — P-C com P-G live | APROVO — O-A | APROVO — UNRESOLVED | NÃO SEI | NÃO SEI | MÉDIO |
| BS211-Q400 | NÃO APROVO | NÃO — embute violation | APROVO COM CAUTELA — P-H com P-G live | NÃO APROVO — UNRESOLVED ou O-D | NÃO APROVO — UNRESOLVED | NÃO | NÃO | ALTO |
| A4R87-EXT-002 | PRECISO REVISAR | NÃO SEI — usa warning como marcador | APROVO COM CAUTELA — P-G | APROVO — UNRESOLVED | APROVO — UNRESOLVED | NÃO | NÃO SEI | MÉDIO |
| ASIANA-214 | APROVO | SIM | APROVO — P-G | APROVO COM CAUTELA — O-D | APROVO COM CAUTELA — A-F com A-E live | NÃO SEI | NÃO SEI | MÉDIO |

## Main Divergences

### 1. BS211-Q400
- Escape point NOT approved.
- The "Quando..." phrase embeds violation language by saying "fora da trajetoria/downwind atribuida" (outside assigned trajectory/downwind).
- The phrase possibly combines two distinct acts: exiting the assigned downwind and unstable approach.
- O-C not approved due to lack of strong evidence of conscious conflict.
- A-F not approved due to lack of CRM micro-sequence.
- Recommendation: full rebuild of the "Quando..." phrase, source enrichment for cockpit intent, O to UNRESOLVED or O-D, A to UNRESOLVED.

### 2. A4R87-EXT-002
- Escape point needs review.
- The "Quando..." phrase uses EGPWS as a temporal marker.
- EGPWS is a response to the exit, not necessarily the first exit itself.
- Recommendation: rewrite "Quando..." to isolate profile degradation before EGPWS alerts.
- Keep O/A UNRESOLVED.

### 3. REAL-EVENT-0016
- Escape point approved.
- P-C is acceptable as draft, but P-G remains a live alternative.
- Author decision must consciously choose between P-C and P-G.
- O-A and A-UNRESOLVED are defensible.

### 4. ASIANA-214
- Escape point approved.
- P-G approved.
- O-D and A-F approved with caution.
- A-E remains a live alternative.
- Can exit quarantine only if the author consciously accepts these boundaries.

### 5. REAL-EVENT-0003
- Cleanest case.
- Can exit as partial author draft P-G/O-A/A-UNRESOLVED.
- Low risk.
- Does not serve as a complete A-axis reference.

## Systemic Risks

### 1. "Quando" Phrase as Pre-Classification Vehicle
The "Quando" phrase can become a vehicle for pre-classification. Example: BS211-Q400 using "fora da trajetoria atribuida" (outside assigned trajectory), which pre-determines O-C.

### 2. Warnings as Escape-Point Temporal Markers
Warnings such as EGPWS/TAWS/stick shaker may be used as temporal markers for the escape point. The warning may be a consequence of the exit, not the exit itself. Example: A4R87-EXT-002.

### 3. A4R130 Carryover Bias
A4R130 may have carryover bias by retaining previous drafts in several cases. Full rebuild must challenge previous drafts, not merely preserve them.

### 4. Boundary Treatment
The P-G/P-F, P-C/P-G, O-D/O-C, A-F/A-E boundaries require explicit treatment. Cases where boundaries are live should not advance without conscious author decision.

## Recommendations by Event

### REAL-EVENT-0003
- Can proceed as partial author draft (P-G/O-A/A-UNRESOLVED).
- Lowest risk in the set.
- Does not serve as a complete A-axis reference.

### REAL-EVENT-0016
- P-C vs P-G boundary requires conscious author decision.
- O-A and A-UNRESOLVED are defensible.
- Do not advance without author decision on P-axis boundary.

### BS211-Q400
- Full rebuild of "Quando..." phrase required.
- Source enrichment for cockpit intent recommended.
- Do not advance to author approval without gate correction.
- O and A should be revised to UNRESOLVED or milder codes.

### A4R87-EXT-002
- "Quando..." phrase needs revision to isolate pre-warning degradation.
- Keep O/A UNRESOLVED.
- Do not advance without escape-point gate correction.

### ASIANA-214
- P-G approved.
- O-D and A-F approved with caution.
- A-E remains a live alternative.
- Can advance only if the author consciously accepts P-F/P-G and A-F/A-E boundaries.

## Locks Preserved
- AUTHOR_DECISION_PENDING for all 5 events.
- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- No P/O/A change from A4R130/A4R131.
- No source enrichment.
- No processing of `AMERICAN-965` or `COMAIR-5191`.
- No runtime, UI, API, DB, migration, fixture, baseline or code changes.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.

## Metrics
| metric | value |
|---|---:|
| independentReviewRegisteredCount | 1 |
| eventsReviewedByOpus | 5 |
| authorDecisionStillPendingCount | 5 |
| opusApproveNowCount | 1 |
| opusConditionalOrReviewCount | 3 |
| opusDoNotApproveCount | 1 |
| systemicRisksRecordedCount | 4 |
| releasedCodeCreatedCount | 0 |
| selectedCodeClassifiedCount | 0 |
| downstreamOpenedCount | 0 |
| poaChangedCount | 0 |
| sourceEnrichmentPerformedCount | 0 |

## Next Steps
1. Author reviews the Opus independent review.
2. Author records decisions using the AUTHOR_DECISION_INTAKE_AFTER_OPUS_A4R132 sheet.
3. BS211-Q400 and A4R87-EXT-002 should not advance without gate/escape-point correction.
4. REAL-EVENT-0003 is the only clear candidate for partial approval.
5. REAL-EVENT-0016 and ASIANA-214 require conscious author decision on boundaries.
6. Keep release/downstream blocked until explicit later governance.
