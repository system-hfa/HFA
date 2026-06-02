# SERA vNext Next Phase Decision - A4R201-C

## Decision

A4R201-C authorizes a next detailed extraction phase for source-ready events only.

Authorized extraction lanes:

- READY_FOR_DEEP_EXTRACTION
- READY_FOR_NEGATIVE_CONTROL_EXTRACTION
- READY_FOR_BOUNDARY_EXTRACTION

Blocked extraction lanes:

- NEEDS_LOCATOR_RECHECK
- HOLD
- REJECT_OR_REPLACE

## Ready deep-extraction queue

Proceed first with:

1. Asiana Airlines Flight 214.
2. UPS Airlines Flight 1354.
3. G-WNSB Sumburgh helicopter accident.
4. Comair Flight 5191.
5. Colgan Air Flight 3407.
6. Execuflight Flight 1526.

Optional control/supplement extraction:

- First Air Flight 6560.
- Delta Air Lines Flight 191.
- 5N-BQJ Bristow Helicopters Nigeria ditching.
- USAir Flight 427.

## Perplexity recheck queue

Use Perplexity only for official locator recovery where local evidence is insufficient:

- Air Canada Flight 759.
- Spanair Flight JK5022.
- TransAsia Airways Flight GE235.

Manual locator retry before Perplexity may be enough for:

- Turkish Airlines Flight 1951.
- Pel-Air VH-NGA.
- Air France Flight 358.

## Rejected or substituted sources

- Air Canada Flight 624 is not a substitute for Air Canada Flight 759.
- Motley Rice is not a primary source for Asiana 214.
- YouTube and media videos are not primary sources.
- Wikipedia and copied summaries are not primary sources.
- Mirror PDFs may assist only after official locator status is recorded.

## Opus decision

Opus is not necessary now. The next phase is source extraction and locator-gated documentation, not deep model adjudication.

## Locks

- No SERA engine/runtime changes.
- No frontend/API changes.
- No Supabase or migration changes.
- No fixture or baseline changes.
- No risk-layer changes.
- No final P/O/A classification.
- No READY automatic promotion.

## Guardrail markers

- POA final classification created: NO
- P/O/A final classification created: NO
- READY automatic promotion: NO
- fixture/baseline/product promotion: BLOCKED
- selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED
- synthetic-real blending: NO
- Daumas used as factual source: NO
