# SERA vNext — Test Suite Reliability Closure (F-22)

## Problem
28 test skips in the audit sweep included race/timeouts and helpers counted as tests.

## Resolution

### Skip Audit
Each skip classified as: environment dependency, expected, unexpected, race/timeout, helper, obsolete.

### Rules Enforced
- race/timeout = test failure until stabilized (not acceptable skip)
- No soft skip masking server unavailable
- No "PASS" without executing test object
- No label check used as E2E
- No grep as proof of UI
- No helper executed as test

### Test Type Separation
- `unit` — pure function tests
- `contract` — type/interface tests
- `static` — lint/typecheck
- `integration` — component integration
- `real DB` — Supabase-dependent
- `real API` — HTTP endpoint tests
- `real UI/E2E` — Playwright browser tests

### Sweep Manifest
- Helpers excluded from test count
- `find tests/sera-vnext -maxdepth 1 -type f -name '*trial*.ts'` — root-level trial files
- Subdirectory runners: engine-validation-v01, engine-validation-v02, engine-validation-v03-naturalistic, reachability, product-unification, final-technical-closure

### Gate
- failed = 0
- unexpected_skips = 0
- race_timeouts = 0
