# SERA v0.1.4-A3 — Release Gate and ERC Retry Readiness

## 1. Purpose
Integrar operacionalmente o guardrail `scripts/assert-sera-report-clean.js` como gate de release, criar wrapper guardado para execucao de candidates, e documentar readiness para ERC retry.

## 2. Phase Scope

In scope:
- Validacao operacional do guardrail `scripts/assert-sera-report-clean.js` em reports limpos e reports com fail/error
- Criacao do wrapper `scripts/run-sera-methodology-candidates-guarded.sh`
- Execucao de SERA_N_RUNS=1 com 13 fixtures methodology-gate
- Aplicacao do guardrail no report gerado
- Documentacao de readiness

Out of scope (not modified):
- `frontend/src/lib/sera/pipeline.ts`
- `frontend/src/lib/sera/all-steps.ts`
- `frontend/src/lib/sera/types.ts`
- candidates JSON files
- baseline fixtures
- `erc_question_trace` implementation

## 3. Initial State
- Repository: `/Users/filipedaumas/SAAS/HFA`
- Branch: `main`
- Guardrail script: `scripts/assert-sera-report-clean.js` (existing)
- Runner script: `scripts/run-sera-methodology-candidates.sh` (existing)
- Fixture list: `tests/sera/methodology-gate-fixtures.txt` (13 fixtures)

## 4. Guardrail Validation

### 4.1 Clean report test
- Report: `methodology-gate-run-1779486844.json` (fail=0, error=0, pass=29, partial=10)
- Result: `Guardrail OK: report is clean` (exit 0)

### 4.2 Bad report test
- Report: `methodology-gate-run-1779491597.json` (fail=1, error=1, pass=27, partial=11)
- Result: `Guardrail violation: fail > 0 or error > 0` (exit 1)

### 4.3 Fresh N_RUNS=1 execution
- Command: `SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run`
- Report: `methodology-gate-run-1779493666.json`
- Results: 13f x 1r | PASS 9 | PARTIAL 4 | FAIL 0 | ERROR 0 | rate 69.2% | det 100.0%
- Guardrail: `Guardrail OK: report is clean` (exit 0)
- Non-PASS fixtures: A0-CHK-001, A0-CHK-002-ADJ, A0-DAUMAS-E02-B, A0-FUEL-002

## 5. Guarded Wrapper

Created `scripts/run-sera-methodology-candidates-guarded.sh`:
- Phase 1: executes existing A2-d runner with forwarded arguments
- Phase 2: locates the most recent report in `tests/reports/candidates/`
- Phase 3: applies `node scripts/assert-sera-report-clean.js` on the report
- Exits with guardrail exit code (0 = approved, 1 = rejected)

Usage: `SERA_N_RUNS=1 scripts/run-sera-methodology-candidates-guarded.sh`

## 6. ERC Retry Readiness Assessment

### 6.1 Current state
- `erc_question_trace` remains reverted/rejected in active code
- ERC experimental trace was reverted after validation failure (commit `9670951`)
- Trace contract v0.1.4 defines `question_trace` contract but ERC trace is not included

### 6.2 Gate readiness
- Guardrail blocks promotion when `fail > 0` or `error > 0` in the report
- Wrapper ensures guardrail is always applied after candidate execution
- Anchor rules (`--require-anchor FIXTURE=POA`) available for invariant enforcement

### 6.3 Prerequisites for ERC retry
- Gate infrastructure operational (guardrail + guarded runner)
- Non-PASS fixtures identified and stable across runs
- PARTIAL fixtures do not block the gate (only FAIL/ERROR do)
- Anchor stability confirmed via historical report analysis in prior phases

## 7. Files Changed
- `scripts/run-sera-methodology-candidates-guarded.sh` (new)
- `docs/SERA_A3_RELEASE_GATE_AND_ERC_RETRY_READINESS_v0.1.4.md` (new)

## 8. Validation Artifacts
- Guardrail clean test: exit 0
- Guardrail bad test: exit 1
- N_RUNS=1 report: `tests/reports/candidates/methodology-gate-run-1779493666.json` (clean, fail=0, error=0)
- Guardrail on fresh report: exit 0
- No engine files modified
- No candidates/baseline modified
