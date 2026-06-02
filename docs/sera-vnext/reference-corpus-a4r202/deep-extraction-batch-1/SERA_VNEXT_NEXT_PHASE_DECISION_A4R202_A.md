# SERA vNext Next Phase Decision A4R202-A

Date: 2026-06-01
Phase: A4R202-A
Status: decision memo only

## 1. Batch 1 extraction result

The six Batch-1 events now have factual extraction packets deep enough for candidate-only human-analysis work:

1. Asiana 214
2. UPS 1354
3. G-WNSB Sumburgh
4. Comair 5191
5. Colgan 3407
6. Execuflight 1526

No event was promoted to READY, baseline, fixture, product, or final classification status.

## 2. Recommended next phase

Execute `A4R202-B` as a candidate-only human-analysis review phase.

Scope:

- test candidate escape point boundaries;
- test direct-actor stability;
- inspect factual evidence lanes for perception, objective, action, and preconditions;
- keep all outputs provisional and review-oriented.

## 3. Suggested order

Lane 1:

1. Asiana 214
2. UPS 1354
3. Comair 5191

Reason:
these three packets have the cleanest factual anchors and the lowest escape-point ambiguity.

Lane 2:

1. G-WNSB Sumburgh
2. Execuflight 1526

Reason:
both packets are sufficient, but each carries stronger mode/procedure/context interactions that deserve slower candidate review.

Lane 3:

1. Colgan 3407

Reason:
the extraction is sufficient, but the candidate escape point remains the least stable of the six and should be re-audited before any comparative reference use.

## 4. Explicit non-go items for the next phase

- no final P/O/A classification
- no final escape point approval
- no selectedCode/releasedCode/finalConclusion/CLASSIFIED output
- no fixture, baseline, product, API, or runtime use
- no HFACS-to-SERA substitution
- no Risk/ERC/ARMS layer work
- no synthetic fill

## 5. Colgan special note

Colgan 3407 is not blocked from future human-analysis review, but it should enter that phase with an explicit `ESCAPE_POINT_REAUDIT_FIRST` marker. The extracted packet is methodologically useful; the candidate escape point is simply less settled than the other five events.

## 6. Lock preservation

- POA final classification created: NO
- P/O/A final classification created: NO
- READY automatic promotion: NO
- fixture/baseline/product promotion: BLOCKED
- selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED
- synthetic-real blending: NO
- Daumas used as factual source: NO
