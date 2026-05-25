# SERA Engine vNext Integrated Corpus Reconciliation A4R150 v0.2.0

Status: INTEGRATED_CORPUS_RECONCILIATION_RECORDED
Phase: A4R150
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Unify the local 89-TXT corpus and A4R149 external shortlist into one integrated reconciliation layer for Opus preparation, without opening any causal or downstream workflow.

## relation to A4R142/A4R143/A4R148/A4R149

- A4R142/A4R143 provide intake-only local corpus categories and lane cautions.
- A4R148 defines independent Opus audit rules and reconciliation protocol.
- A4R149 contributes 25 external discovery candidates with source-hygiene statuses.
- A4R150 integrates these layers into one operational manifest and one recovery queue.

## why a single integrated front now

A4R150 removes parallel-triage risk by consolidating local and external candidates in one matrix, one Opus manifest, and one source-recovery queue.

## reconciliation criteria

1. Preserve intake-only boundaries (no P/O/A, no extraction, no release).
2. Prioritize overlap local+external where source quality is adequate or recoverable.
3. Preserve technical/environment negative controls for anti-overclassification tests.
4. Keep secondary links and source-insufficient cases in recovery queues.

## quantitative summary

- localTxtFilesConsideredCount: 89
- externalCandidateCount: 25
- overlapLocalExternalCount: 15
- integratedRegistryRowCount: 92
- opusCorePacketCount: 10
- opusSecondaryPacketCount: 53
- opusNegativeControlPacketCount: 8
- opusSourceRecoveryOnlyCount: 19
- opusExcludeForNowCount: 2

## key findings

- Strong local/external overlap exists in high-value events (e.g., ASIANA-214, COMAIR-5191, UPS-1354, AIR-CANADA-624, EASTERN-401, HELIOS-522).
- Several external candidates can reinforce weak local lanes after source confirmation (e.g., QANTAS-QF32, QANTAS-QF72, COUGAR-A09A0016).
- Source-recovery pressure remains concentrated in secondary-link and legacy-poor-text items.
- Duplicate/out-of-scope packets are isolated in exclude lanes to avoid contamination of Opus priorities.

## locks preserved

- no P/O/A classification
- no corpus ingestion
- no reaudits
- no fixtures, no release, no downstream
- no finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations
- no code/runtime/UI/API/DB/migration changes

## next step

Execute A4R151 Opus audit intake using the single A4R150 packet manifest, then run A4R152 post-Opus reconciliation and small-batch selection.
