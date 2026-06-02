# SERA vNext Perplexity Reconciliation A4R201-B Report v0.2.0

Status: CANDIDATE_RECONCILIATION_ONLY
Phase: A4R201-B
Date: 2026-06-01

## Objective

Audit the Perplexity A4R201-A1 event scouting output against the existing repository corpus, without promoting any event into methodology, fixture, baseline, product, or downstream use.

## Input Limitation

The full raw A4R201-A1 Perplexity output with all submitted URLs was not present in the attached paste. This reconciliation therefore uses:

- the 30 candidate identifiers and visible issue markers named in the A4R201-B brief;
- local repo evidence from A4R149, A4R180, A4R186, A4R197-E, A4R199-A, A4R200-A, and source-corpus indexes;
- explicit `SOURCE_NOT_VERIFIED` or `SOURCE_NOT_PROVIDED_IN_ATTACHMENT` where the raw submitted URL was unavailable.

No new web search, source download, PDF extraction, or source-corpus modification was performed.

## Method

Each candidate was checked for repo presence, source/link quality, factual depth, SERA utility, and methodological risks. Existing report conclusions, probable causes, and labels were not used as SERA expected values. Candidate use remains limited to source recovery planning and reference-corpus triage.

## General Evaluation

The Perplexity output is useful as a scouting instrument, but not as an ingestion matrix. Its main weaknesses are secondary-source leakage, contaminated URL fields, summary-only descriptions, duplicate events already present in the repo, and several candidates whose value depends on detailed extraction rather than the short narrative supplied by Perplexity.

## Existing Corpus Comparison

Already represented or partially represented in the repo:

- Colgan 3407, Asiana 214, UPS 1354, G-WNSB/Sumburgh, Air France 447, Execuflight 1526, Comair 5191, Delta 191, USAir 427, N109W, N11NM, 5N-BQJ.
- Thebaud, Peasmarsh, and Vigo already appear in A4R197-E/A4R200-A routing. Vigo remains source-insufficient.
- Spanair, Turkish 1951, and Pel-Air appear in A4R111/perplexity candidate and failed-link recovery records but need cleaner official locators before use.

## Main Problems Found

- C-002 Asiana used a non-primary source marker in the submitted material; the repo already flags the candidate as needing replacement with an NTSB official locator.
- C-006 Turkish 1951 used a YouTube marker; this is not acceptable as a primary source.
- C-009 Spanair used a weak public-summary marker; the repo has a CIAIAC official locator recovery note but no completed source ingestion.
- C-010 Pel-Air used secondary aviation media markers; the official ATSB locator must control.
- C-016 Execuflight had report-number inconsistency; repo evidence supports NTSB AAR-16/03, not AAR-19/02.
- C-020 and C-021 used generic or repeated docket-style links; both need event-specific official locators.
- C-022 Air France 358 had a mismatched First Air link in the Perplexity top list; TSB A05H0002 is the correct authority path.
- C-024 Korean Air Cargo needs authority/source validation before any deep extraction.
- C-028 Aeroperu cannot use Skybrary as primary source.
- C-029 Emirates A380 cannot use Simple Flying as primary source and needs TSIB/official authority confirmation.
- C-030 is too underspecified and potentially redundant; it should be replaced unless the raw source output is recovered.

## Strong Candidates

Strong candidates for controlled future extraction are Asiana 214, UPS 1354, G-WNSB/Sumburgh, Colgan 3407, Comair 5191, Turkish 1951, Spanair JK5022, Pel-Air VH-NGA, Execuflight 1526, and Air Canada 759. These are not READY events; they are candidates for source recovery or already-existing repo reconciliation.

## Duplicate Or Already-Represented Candidates

Asiana 214, Colgan 3407, UPS 1354, G-WNSB/Sumburgh, Air France 447, Comair 5191, Execuflight 1526, Delta 191, USAir 427, N109W, N11NM, and 5N-BQJ are already represented in repo discovery, extraction, source-slice, or hold-control records.

## Weak Or Wrong Source Candidates

The highest source/link hygiene issues are C-002, C-006, C-009, C-010, C-016, C-020, C-021, C-022, C-024, C-028, C-029, and C-030. These require correction, rejection, or replacement before any source-depth work.

## Deep Extraction Need

Candidates that should not be accepted from summary text alone include Turkish 1951, Spanair JK5022, Pel-Air VH-NGA, First Air 6560, Air Canada 759, Air France 358, TransAsia GE235, Korean Air Cargo, Aeroperu 603, and Emirates A380/TSIB candidate. Required detail includes sequence timing, PF/PM or direct actor role, warning/callout sequence, FDR/CVR or equivalent timeline, procedure context, and evidence before or at the escape-point candidate.

## Negative And Boundary Controls

Delta 191 remains a technical/environmental negative control. USAir 427 and 5N-BQJ remain technical-human boundary or technical-dominance controls. N109W and N11NM remain HOLD and must not be reactivated without human decision.

## Rejections Or Replacements

Vigo remains replace unless a primary CIAIAC source is recovered. C-030 should be rejected or replaced because the attached material did not identify the event or a usable authority source. Emirates A380 should be held or replaced if no TSIB/official locator exists. Aeroperu can only proceed after primary authority source recovery.

## Daumas Relationship

Daumas is useful as a human/methodological reference for MDC/offshore operationalization, not as a factual source for real events. Daumas may help compare whether real-event records have enough decision-context granularity, but it does not create automatic reentry, POA closure, READY promotion, selectedCode, releasedCode, finalConclusion, fixture, baseline, or product status.

## Next Phase Recommendation

Run A4R201-C as a source-depth recovery and locator normalization phase. Priority should be official locator cleanup and deep extraction queue execution for the revised shortlist. Opus is not needed now; reserve it for later boundary cases after official-source slices exist. Do not ask Perplexity for more events until the source/link audit backlog is closed.

## Locks Preserved

- Web search executed: NO.
- Source download executed: NO.
- Source corpus altered: NO.
- POA final classification created: NO.
- READY automatic promotion: NO.
- Fixture, baseline, and product promotion: BLOCKED.
- selectedCode, releasedCode, finalConclusion, and CLASSIFIED active output: BLOCKED.
- HFACS/Risk/ERC/ARMS/recommendations: BLOCKED.
