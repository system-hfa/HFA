# HFA Global Regression Results

Final canonical run: tmp/hfa-global-regression-closure/canonical-regression-final-with-server.log

```json
{
  "tests_discovered": 205,
  "tests_executed": 205,
  "tests_passed": 158,
  "tests_failed": 0,
  "tests_skipped": 0,
  "gates_passed": 3,
  "gates_not_ready": 1,
  "environment_missing": 0,
  "race_timeouts": 0,
  "unexpected_skips": 0
}
```

Additional final checks:
- typecheck: tmp/hfa-global-regression-closure/typecheck-after-cleanup.log, exit 0.
- lint: tmp/hfa-global-regression-closure/lint-after-cleanup.log, exit 0 with 22 pre-existing warnings.
- build: tmp/hfa-global-regression-closure/build-after-cleanup.log, exit 0.
- targeted Product Alpha/runtime/analyze: tmp/hfa-global-regression-closure/targeted-after-cleanup.log, exit 0.
- frontend HTTP smoke: tmp/hfa-global-regression-closure/frontend-smoke-http-final.log, exit 0.

Generated report timestamp/output diffs were restored and not committed.
