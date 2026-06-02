# SERA vNext Deep Extraction Summary - A4R202-A v0.2.0

## Phase scope

A4R202-A extracted factual detail for six Batch-1 reference-event candidates without creating:

- any final P/O/A classification
- any final escape point approval
- any READY promotion
- any selectedCode/releasedCode/finalConclusion/CLASSIFIED output
- any fixture, baseline, product, API, or runtime artifacts

## Events covered

1. Asiana Airlines Flight 214
2. UPS Airlines Flight 1354
3. G-WNSB Sumburgh helicopter accident
4. Comair Flight 5191
5. Colgan Air Flight 3407
6. Execuflight Flight 1526

## Extraction depth result

- All six events now contain source identification, factual timeline, candidate-only escape-point statement, actor mapping, evidence-lane collection, quarantine of report conclusions, bias/sufficiency filters, and explicit blocked outputs.
- Asiana 214, UPS 1354, G-WNSB, Comair 5191, and Execuflight 1526 are sufficiently deep for candidate-only methodological review.
- Colgan 3407 is also sufficiently deep, but its candidate escape point still requires a focused re-audit before comparative reference use.

## Main cross-event patterns observed

- Approach setup and late-path recovery pressures are central in Asiana 214, UPS 1354, G-WNSB, Colgan 3407, and Execuflight 1526.
- Positive position verification is the central factual spine in Comair 5191.
- Several packets show tension between explicit procedural gates and continued operation past those gates, but A4R202-A stops at factual extraction and does not classify that tension.

## Source sufficiency note

- Five packets were built from local official-report text already present in the repo.
- G-WNSB required consultation of the direct official AAIB PDF because the tracked repo only held the GOV.UK summary-page capture. That PDF was used through temporary staging only and then removed.

## Recommended next gate

- Proceed to a candidate-only human-analysis phase.
- Do not initiate A4R202-B with any final-methodology outputs unlocked.
- Re-audit Colgan 3407 escape-point timing before any reference-case calibration use.

## Guardrail markers

- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- fixture/baseline/product promotion: BLOCKED
- selectedCode/releasedCode/finalConclusion/CLASSIFIED active output: BLOCKED
- synthetic-real blending: NO
- Daumas used as factual source: NO
