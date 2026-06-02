# SERA vNext Source Depth and Locator Normalization - A4R201-C v0.2.0

## Phase purpose

A4R201-C converts the A4R201-B reconciled candidate queue into a source-depth readiness base for future detailed factual extraction.

This phase did not perform event extraction. It normalized official-source locators, separated weak or wrong sources, and assigned extraction-readiness gates for the revised top-10 queue plus the requested control and supplement events.

## Scope controls

- Hendy/SERA remains the primary causal-method source.
- Daumas is used only as a human-methodology and applied-depth reference.
- Real accident reports are factual sources only; their conclusions do not become expected SERA values.
- No fixture, baseline, product, API, risk-layer, database, or runtime file was modified.
- No source-corpus file was altered, downloaded, moved, or staged in this phase.

## Source acquisition status

No external download was executed in A4R201-C. The phase used existing local manifests, local official-report text, A4R201-B reconciliation outputs, A4R200-A routing, and prior A4R197/A4R199 source-recovery notes.

Perplexity was not executed. Events with missing or stale official locators are marked for Perplexity recheck only where local evidence is insufficient.

## Normalized source outcomes

### Confirmed and locally extractable

- Asiana Airlines Flight 214 - NTSB AAR-14/01, official PDF and local text.
- UPS Airlines Flight 1354 - NTSB AAR-14/02, official PDF and local text.
- G-WNSB Sumburgh helicopter accident - AAIB AAR 1/2016, official page/PDF and local text.
- Comair Flight 5191 - NTSB AAR-07/05, official PDF and local text.
- Colgan Air Flight 3407 - NTSB AAR-10/01, official PDF and local text.
- Execuflight Flight 1526 - NTSB AAR-16/03, official PDF and local text.
- First Air Flight 6560 - TSB A11H0002, recovered official PDF text.
- USAir Flight 427 - NTSB AAR-99/01, official PDF and local text.

### Official page confirmed but extraction needs locator cleanup

- Turkish Airlines Flight 1951 - Dutch Safety Board page is documented; official PDF or extractable official text must be confirmed before extraction.
- Pel-Air VH-NGA - ATSB official investigation page is documented; report acquisition must be retried before extraction.
- Air France Flight 358 - TSB report page is documented, but local capture appears incomplete and must be normalized before extraction.

### Needs locator recheck

- Spanair Flight JK5022 - official-looking CIAIAC PDF locator exists in prior recovery notes, but local acquisition was not confirmed.
- Air Canada Flight 759 - no local official locator found; Air Canada Flight 624 must not be substituted.
- TransAsia Airways Flight GE235 - no clean local official ASC/TTSB locator found.

### Control-only or boundary-only

- Delta Air Lines Flight 191 - official NTSB PDF locator confirmed; use as negative-control extraction, not reference promotion.
- 5N-BQJ Bristow Helicopters Nigeria ditching - local partial official text exists; keep as control-only until source boundaries and locator are clean.
- USAir Flight 427 - use as boundary extraction only.

## Weak or wrong source disposition

- Motley Rice: rejected as primary for Asiana 214.
- YouTube and media videos: rejected as primary for Turkish 1951 and TransAsia GE235.
- Wikipedia and copied summaries: rejected as primary for Spanair JK5022.
- Media accounts: rejected as primary for Pel-Air VH-NGA.
- Air Canada 624: rejected as a substitute for Air Canada 759.
- AAR-19/02 or unrelated report references: rejected as substitutes for Execuflight 1526.

## Extraction-readiness result

Six revised top-10 events are ready for deep factual extraction:

1. Asiana Airlines Flight 214.
2. UPS Airlines Flight 1354.
3. G-WNSB Sumburgh helicopter accident.
4. Comair Flight 5191.
5. Colgan Air Flight 3407.
6. Execuflight Flight 1526.

First Air Flight 6560 is also source-ready, but is retained as a control or supplement rather than a revised top-10 anchor.

## Guardrail markers

- POA final classification created: NO
- P/O/A final classification created: NO
- READY automatic promotion: NO
- fixture/baseline/product promotion: BLOCKED
- selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED
- synthetic-real blending: NO
- Daumas used as factual source: NO
- weak source accepted as primary: NO
- official report conclusion converted to expected SERA value: NO

## Next gate

The next phase may perform detailed factual extraction only for events marked `READY_FOR_DEEP_EXTRACTION`, `READY_FOR_NEGATIVE_CONTROL_EXTRACTION`, or `READY_FOR_BOUNDARY_EXTRACTION`, and only by using the detailed extraction template created in A4R201-C.

Events marked `NEEDS_LOCATOR_RECHECK`, `HOLD`, or `NEEDS_PERPLEXITY_RECHECK` remain blocked from extraction until official locator evidence is complete.
