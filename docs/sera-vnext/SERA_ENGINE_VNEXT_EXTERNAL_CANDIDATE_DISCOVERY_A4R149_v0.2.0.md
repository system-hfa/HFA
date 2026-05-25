# SERA Engine vNext External Candidate Discovery A4R149 v0.2.0

Status: EXTERNAL_DISCOVERY_RECORDED
Phase: A4R149
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## objective

Register a discovery-only shortlist of 25 external real-event candidates under the A4R137 escape-point premise, with first-layer source hygiene and no methodological authority promotion.

## why a new discovery is needed after A4R137

A4R137 reset the causal anchor to "P/O/A at escape point". The external shortlist must therefore be versioned under this premise before any ingestion/extraction decision.

## relationship to Perplexity shortlist

- A4R149 preserves the 25 externally shortlisted events and the original five categories.
- A4R149 treats the list as candidate-only and non-validated.
- A4R149 adds source-hygiene statuses and next actions; it does not validate causal claims.

## relationship to Opus audit pending

- A4R148 prepared Opus audit handoff for the 89-TXT local corpus.
- A4R149 does not replace the Opus audit; it creates a separate external-discovery layer for later reconciliation.
- Reconciliation must occur before any external ingestion batch is authorized.

## source hygiene rule

Use investigation-authority primary sources when available; mark secondary links for replacement or source recovery; and block ingestion until source hygiene is resolved.

## summary by category

| category | eventCount |
|---|---:|
| HF_POSITIVE_CANDIDATE | 5 |
| HF_MIXED_TECHNICAL_HUMAN | 5 |
| TECHNICAL_OR_ENVIRONMENTAL_NEGATIVE_CONTROL | 5 |
| SYSTEMIC_ORGANIZATIONAL_BOUNDARY | 5 |
| SOURCE_RECOVERY_HIGH_VALUE | 5 |

## top candidates by future use

### future real-event reaudits
- Colgan Air 3407
- UPS 1354
- G-WNSB Super Puma Sumburgh
- Jazz JZA7795
- Air Canada AC624

### negative controls
- Qantas QF32
- Qantas QF72
- Cougar 91 (A09A0016)
- EC225 G-REDW/G-CHCN
- Air France AF66

### rotorcraft/offshore candidates
- G-WNSB Super Puma Sumburgh
- Cougar S-92A (A11H0001)
- CHO S-92A (A19A0055)
- Cougar 91 (A09A0016)
- EC225 G-REDW/G-CHCN

### source recovery priorities
- Asiana 214 (replace media PDF with NTSB primary)
- Air France A319 F-GRHT (recover BEA primary)
- Air France AF66 (recover BEA final)
- Eastern 401 (legible official copy recovery)
- Carson S-61N (NTSB report/docket mapping)

### systemic/organizational boundary candidates
- Execuflight 1526
- Corporate 5966
- Comair 5191
- Alaska 261
- Carson S-61N

## restrictions

- EXTERNAL_DISCOVERY_ONLY: this package does not create corpus authority.
- No report/PDF downloads executed in A4R149.
- No corpus ingestion, no extraction, no reaudit, and no P/O/A classification.
- No reference-case authority, no released code, and no downstream opening.
- No finalConclusion, HFACS, Risk/ERC, ARMS/ERC, or recommendations.

## locks preserved

- NO_RELEASED_CODE
- NO_DOWNSTREAM
- corpusIngestionStatus = NOT_INGESTED for all 25 candidates
- poaStatus = NOT_CLASSIFIED for all 25 candidates
