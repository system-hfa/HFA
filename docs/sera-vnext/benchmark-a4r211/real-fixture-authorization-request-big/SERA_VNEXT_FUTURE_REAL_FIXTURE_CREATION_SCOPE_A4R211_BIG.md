# SERA vNext Future Real Fixture Scope - A4R211-BIG

Date: 2026-06-05
Phase: A4R211-BIG
Status: FUTURE_SCOPE_PROPOSAL_ONLY
Mode: NON_FINAL_DOCUMENTAL_ONLY

## 1. Purpose

Define the minimum safe scope of a later candidate-only real-fixture phase, without executing that phase now.

## 2. Proposed Isolation

If later approved, use an isolated directory such as:

`tests/sera-vnext/fixture-candidates/`

The isolated directory must stay separate from:

- `tests/sera/fixtures/`
- baseline reports
- product/runtime imports
- API/UI wiring

## 3. Proposed Candidate Set

### Positive candidates

- `Comair 5191`
- `Asiana 214`
- `UPS 1354`

### Synthetic candidate

- `GAP-004 consequence-as-cause`

### Controls

- `Delta 191`
- `USAir 427`
- `5N-BQJ`

## 4. Not Included

- `Colgan 3407`
- `Daumas`
- `2026-0001 crank event`
- `GAP-001 PF_PM separation`
- `GAP-002 agent_migration`
- `G-WNSB`
- `Execuflight 1526`

## 5. Mandatory Rules For The Later Phase

1. use isolated files only
2. use `candidate` naming
3. candidate naming must remain explicit
4. do not alter official fixtures
5. do not alter baseline
6. do not connect engine or runtime
7. do not connect product
8. do not treat outputs as baseline
9. create a dedicated trial
10. keep rollback simple by deleting isolated files only
11. require explicit author approval before starting

## 6. Residual Blocks

Even if the later phase is opened:

- no baseline authorization appears
- no product/runtime authorization appears
- no final P/O/A appears automatically
- no final escape point appears automatically
- no READY promotion appears automatically
- no selectedCode, releasedCode, finalConclusion, or CLASSIFIED active output appears

## 7. Lock Confirmations

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
