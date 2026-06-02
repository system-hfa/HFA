# SERA vNext Next Phase Decision A4R202-B

Date: 2026-06-02
Phase: A4R202-B
Status: decision memo only

## 1. Batch 1 review result

Batch 1 now has a controlled candidate-only review layer on top of A4R202-A.

Event routing after A4R202-B:

- `Comair 5191`: `AUTHOR_REVIEW_READY_CANDIDATE_ONLY`
- `Asiana 214`: `AUTHOR_REVIEW_READY_WITH_LIMITATION`
- `UPS 1354`: `AUTHOR_REVIEW_READY_WITH_LIMITATION`
- `G-WNSB Sumburgh`: `AUTHOR_REVIEW_READY_WITH_LIMITATION`
- `Execuflight 1526`: `AUTHOR_REVIEW_READY_WITH_LIMITATION`
- `Colgan 3407`: `ESCAPE_POINT_REAUDIT_REQUIRED`

## 2. Conservative next phase recommendation

Recommended route:

- `A4R202-C - Methodological Review of top 3 only`

Suggested top 3:

1. `Comair 5191`
2. `Asiana 214`
3. `UPS 1354`

Reason:

- these three give the best combined balance of source sufficiency, direct-actor stability, and author-review usefulness;
- Comair is the cleanest position-verification case;
- Asiana and UPS provide strong candidate-only boundary work with manageable limitations;
- this route is more conservative than opening all six simultaneously.

## 3. Events that can enter author review

- `Comair 5191`
- `Asiana 214`
- `UPS 1354`

Second-lane candidates after the first intake:

- `G-WNSB Sumburgh`
- `Execuflight 1526`

## 4. Events that require re-audit or slower handling

- `Colgan 3407`
  keep in `ESCAPE_POINT_REAUDIT_REQUIRED` until the early low-speed candidate and the immediate post-shaker candidate are explicitly re-compared under author review preparation rules.

## 5. Opus decision

- Opus required now: `NO`
- Reconsider Opus only if a real methodological disagreement remains unresolved after the Colgan re-audit or if Asiana/G-WNSB author review produces stable competing candidate-boundary arguments.

## 6. Explicit non-go items for the next phase

- no final P/O/A classification
- no final escape point approval
- no READY promotion
- no selectedCode/releasedCode/finalConclusion/CLASSIFIED output
- no fixture, baseline, product, API, or runtime use
- no HFACS-to-SERA substitution
- no Risk/ERC/ARMS layer work

## 7. Lock preservation

- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- fixture/baseline/product promotion: BLOCKED
- selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED
- synthetic-real blending: NO
- Daumas used as factual source: NO
