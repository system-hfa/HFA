# SERA vNext Real Fixture Authorization Request - A4R211-BIG v0.2.0

Date: 2026-06-05
Phase: A4R211-BIG
Status: REAL_FIXTURE_AUTHORIZATION_REQUEST_ONLY
Scope: future real fixture authorization request package only
Mode: NON_FINAL_DOCUMENTAL_ONLY

Required locks:
- REAL_FIXTURE_AUTHORIZATION_REQUEST_ONLY
- NO_FIXTURE_CREATED
- NO_BASELINE_CREATED
- NOT_PRODUCT
- NOT_READY
- NO_SELECTED_CODE
- NO_RELEASED_CODE
- NO_FINAL_CONCLUSION
- NO_CLASSIFIED_OUTPUT
- NO_DOWNSTREAM

## 1. Objective

Transform the A4R210-BIG dry-run closure into an explicit author decision package for any later candidate-only real-fixture phase, without creating fixture, JSON fixture, baseline, runtime behavior, product behavior, final P/O/A, final escape point approval, READY, selectedCode, releasedCode, finalConclusion, CLASSIFIED output, or downstream behavior.

## 2. Authorization Request Principles

1. This package is an authorization request only.
2. This package does not create fixture.
3. This package does not create baseline.
4. This package does not approve final P/O/A.
5. This package does not approve a final escape point.
6. This package does not promote READY.
7. This package does not connect product or runtime.
8. Even if later approved, any candidate-only real-fixture phase must be separate.
9. Authorization must be nominal by component.
10. Negative controls cannot become positive examples.
11. Synthetic material cannot be treated as a real event.
12. Daumas and the human-applied case cannot become automatic fixtures.

## 3. Components Proposed For Future Authorization

### Positive candidate requests

- `Comair 5191`: `REQUEST_AUTHOR_AUTHORIZATION_FOR_REAL_FIXTURE_CREATION_FUTURE_ONLY`
- role: positive clean anchor
- limitation: non-final until a later isolated candidate-only phase

- `Asiana 214`: `REQUEST_AUTHOR_AUTHORIZATION_WITH_BOUNDARY_LIMITATION_FUTURE_ONLY`
- role: positive candidate with automation boundary warning
- mandatory warning: automation / 500 ft gate remains explicit; no automation-as-actor; no late impact hunting

- `UPS 1354`: `REQUEST_AUTHOR_AUTHORIZATION_WITH_BOUNDARY_LIMITATION_FUTURE_ONLY`
- role: positive candidate with procedure / FMC / MDA boundary warning
- mandatory warning: setup / FMC / V-S / MDA remain separated; no CFIT-as-cause; no procedure-context collapse into direct action

### Synthetic request

- `GAP-004 consequence-as-cause`: `REQUEST_AUTHOR_AUTHORIZATION_SYNTHETIC_FIXTURE_CREATION_FUTURE_ONLY`
- role: synthetic consequence-as-cause trap
- mandatory warning: synthetic only; not real event; no synthetic-real blending; no product/runtime

### Control-only requests

- `Delta 191`: `REQUEST_AUTHOR_AUTHORIZATION_CONTROL_FIXTURE_FUTURE_ONLY`
- role: environmental and technical negative control
- prohibited use: positive human failure fixture

- `USAir 427`: `REQUEST_AUTHOR_AUTHORIZATION_CONTROL_FIXTURE_FUTURE_ONLY`
- role: technical-human boundary control
- prohibited use: pure human positive fixture

- `5N-BQJ`: `REQUEST_AUTHOR_AUTHORIZATION_CONTROL_FIXTURE_FUTURE_ONLY`
- role: technical and offshore control
- prohibited use: frontline human positive fixture

## 4. Components Outside This Request

- `Colgan 3407`: rejected as positive fixture candidate; boundary-warning reference only
- `G-WNSB`: hold for source and dossier expansion
- `Execuflight 1526`: hold for source and dossier expansion
- `GAP-002 agent_migration`: not materialized; not authorized now
- `GAP-001 PF_PM separation`: retained methodology reference only
- `Daumas`: methodology and depth reference only; not factual source
- `2026-0001 crank event`: human-applied SERA reference only; no automatic fixture
- `Raw Opus inputs`: quarantine input only
- `Broad scouting inputs`: quarantine scouting input only

## 5. Explicit Author Confirmations Needed

The author must later confirm:

1. `Comair 5191` can proceed only as a future candidate-only clean anchor.
2. `Asiana 214` can proceed only with explicit automation and 500 ft boundary warning.
3. `UPS 1354` can proceed only with explicit setup / FMC / V-S / MDA boundary warning.
4. `GAP-004 consequence-as-cause` remains synthetic-only and not-real.
5. `Delta 191`, `USAir 427`, and `5N-BQJ` remain control-only.
6. `Colgan 3407` stays outside the positive fixture lane.
7. `Daumas` stays methodology-only and non-factual.
8. `2026-0001 crank event` stays human-applied-only and non-automatic.
9. no fixture is created now.
10. no baseline is created now.
11. no product/runtime path is opened now.
12. no final P/O/A is created now.
13. no final escape point is approved now.
14. no selectedCode, releasedCode, finalConclusion, or CLASSIFIED active output is opened now.

## 6. Minimum Safe Future Scope

If later approved, the minimum safe future scope is an isolated candidate-only phase under a dedicated directory outside official fixtures and outside baseline reports, with candidate naming, dedicated trials, simple rollback, and no engine/runtime or product connection.

## 7. Residual Blocks Even If Approved Later

- baseline still remains unauthorized
- product/runtime still remains blocked
- no official fixture lane may be touched
- no selectedCode, releasedCode, finalConclusion, or CLASSIFIED active output may be opened
- source and dossier holds remain for `G-WNSB` and `Execuflight 1526`
- `Colgan 3407` remains outside the positive fixture lane
- `GAP-002 agent_migration` remains blocked until materialized
- typecheck environment debt must be resolved before any code/runtime integration

## 8. Recommended Next Macrophase

Recommended next macrophase:

`A4R211-STOP - Stop and Hold Before Fixture Creation`

Reason:

- the authorization packet is complete enough for explicit human decision;
- the next move must not be automatic;
- no candidate-only real-fixture phase should start without explicit author approval.

## 9. Lock Confirmations

- fixture created: NO
- baseline created: NO
- P/O/A final classification created: NO
- final escape point approved: NO
- READY automatic promotion: NO
- selectedCode active output: BLOCKED
- releasedCode active output: BLOCKED
- finalConclusion active output: BLOCKED
- CLASSIFIED active output: BLOCKED
- fixture/baseline/product promotion: BLOCKED
- downstream release behavior: BLOCKED
- Daumas used as factual source: NO
- Daumas automatic reentry: NO
- synthetic-real blending: NO
- no HFACS-to-SERA substitution
- no Risk/ERC/ARMS layer work
