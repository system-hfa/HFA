# SERA vNext Fixture Candidate Package - A4R208-BIG v0.2.0

Date: 2026-06-05
Phase: A4R208-BIG
Status: FIXTURE_CANDIDATE_PACKAGE_DESIGN_COMPLETE
Scope: fixture candidate package design only
Mode: NON_FINAL_DOCUMENTAL_ONLY

Required locks:
- NOT_FIXTURE
- NOT_BASELINE
- NOT_PRODUCT
- NOT_READY
- NO_SELECTED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_CLASSIFIED_OUTPUT
- NO_DOWNSTREAM

## 1. Objective

Transform the A4R207-BIG future gate dry run into a structured future fixture candidate package, without creating any fixture, baseline, product behavior, runtime behavior, final P/O/A, final escape point approval, READY promotion, active selected/released/final output, or downstream behavior.

A4R208-BIG organizes candidate roles, control roles, exclusions, limitations, and the future authorization packet shape. It does not authorize any fixture.

## 2. Candidate Package Principles

1. Candidate package is not fixture.
2. Candidate package is not baseline.
3. Candidate package does not approve final P/O/A.
4. Candidate package does not approve final escape point.
5. Candidate package only organizes candidates for future authorization.
6. Real fixture creation requires future explicit human authorization.
7. Boundary and negative controls remain separated from positive candidates.
8. Daumas and the human-applied case do not become automatic fixtures.
9. Synthetic material is not real-event evidence.
10. GAP-002 does not enter as a fixture item while not materialized.

## 3. Future Positive Candidate Package

### Tier 1

`Comair 5191`

- status: future positive candidate strongest;
- role: clean anchor;
- limitation: still no final P/O/A and no fixture now;
- required future gates: author approval, adversarial review, expected-output design.

### Tier 2

`Asiana 214`

- status: future positive candidate with boundary limitation;
- role: automation and mode boundary;
- limitation: automation / 500 ft gate warning;
- required future gates: boundary-specific author approval and adversarial review.

`UPS 1354`

- status: future positive candidate with boundary limitation;
- role: procedure / FMC / MDA boundary;
- limitation: setup / execution / MDA warning;
- required future gates: boundary-specific author approval and adversarial review.

### Tier 3 / Second Wave

`G-WNSB`

- status: second wave future-only;
- role: offshore / helicopter NPA monitoring;
- limitation: locator and source normalization needed.

`Execuflight 1526`

- status: second wave future-only;
- role: unstable approach and PM failure;
- limitation: needs expanded author dossier.

## 4. Boundary / Negative Control Package

`Delta 191`

- control type: environmental / technical negative control;
- allowed control use: test resistance to technical and environmental dominance being misread as positive human failure;
- prohibited use: positive human failure reference.

`USAir 427`

- control type: technical-human boundary;
- allowed control use: test resistance to forced frontline human attribution when technical evidence dominates;
- prohibited use: pure human positive fixture.

`5N-BQJ`

- control type: technical / offshore boundary;
- allowed control use: test resistance to offshore technical dominance being converted into a frontline human positive reference;
- prohibited use: frontline human positive reference.

`Colgan 3407`

- control type: warning-window / PF-PM boundary;
- current status: not fixture eligible now;
- prohibited use: positive reference.

## 5. Synthetic Package

`GAP-004 consequence-as-cause`

- status: synthetic design future-only;
- role: consequence-as-cause quarantine;
- fixture status: not fixture now;
- future requirement: author approval before any synthetic fixture design.

`GAP-002 agent_migration`

- status: not materialized;
- role: agent migration readiness only;
- fixture status: not candidate package fixture item now.

`GAP-001 PF_PM separation`

- status: retained, audited, reference only;
- role: PF/PM guardrail reference;
- fixture status: not active fixture candidate.

## 6. Methodology-Only / Exclusion Summary

`Daumas`

- allowed use: methodology and depth reference only;
- prohibited use: factual source or fixture source.

`2026-0001 crank event`

- allowed use: human-applied SERA reference only;
- recorded status: human classification input only;
- methodological value: A-A / slip and precondition separation;
- prohibited use: automatic fixture or positive fixture now.

`Raw Opus inputs`

- allowed use: audit input only;
- prohibited use: active methodology alone.

`Broad scouting inputs`

- allowed use: raw scouting only;
- prohibited use: authoritative corpus.

## 7. Limitation Summary

- `Comair 5191`: strongest candidate, but no final expected output yet.
- `Asiana 214`: automation boundary must remain explicit.
- `UPS 1354`: setup / procedure / FMC / MDA boundary must remain explicit.
- `G-WNSB`: source and locator normalization are required before any future package expansion.
- `Execuflight 1526`: second-wave dossier is not complete.
- `Delta 191`: environmental dominance prevents positive human-reference use.
- `USAir 427`: technical-human boundary prevents pure positive human-reference use.
- `5N-BQJ`: technical/offshore dominance and source-depth limits prevent positive human-reference use.
- `Colgan 3407`: escape window instability blocks positive candidate use now.
- `GAP-004 consequence-as-cause`: synthetic and non-real.
- `GAP-002 agent_migration`: not materialized.
- `Daumas`: non-factual source.
- `2026-0001 crank event`: non-automatic fixture.

## 8. Future Authorization Criteria

Before any real fixture can be created, a future authorization phase must provide:

1. candidate/component identity;
2. proposed role;
3. source traceability status;
4. escape window stability;
5. actor attribution status;
6. evidence sufficiency;
7. evidence against;
8. boundary warning;
9. negative/control role;
10. synthetic-real separation;
11. Daumas compliance;
12. human-applied case compliance;
13. explicit author decision;
14. adversarial review decision;
15. confirmations that the item is not fixture yet, not baseline, has no final P/O/A, has no product use, and has no downstream dependency.

## 9. Next Macrophase

Next macrophase:

`A4R209-BIG - Fixture Candidate Authorization Packet`

Reason:

- A4R208-BIG is internally consistent as a candidate package design;
- the next missing work is explicit future authorization packet intake;
- fixture creation, baseline creation, product/runtime planning, and final expected outputs remain outside scope.

## 10. Lock Confirmations

- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- selectedCode active output: BLOCKED
- releasedCode active output: BLOCKED
- finalConclusion active output: BLOCKED
- CLASSIFIED active output: BLOCKED
- fixture created: NO
- baseline created: NO
- fixture/baseline/product promotion: BLOCKED
- downstream release behavior: BLOCKED
- Daumas used as factual source: NO
- Daumas automatic reentry: NO
- synthetic-real blending: NO
- no HFACS-to-SERA substitution
- no Risk/ERC/ARMS layer work
- no final recommendation output
