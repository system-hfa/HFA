# HFA Test Manifest Contract

Manifest: tests/sera-vnext/test-manifest.json
Runner: scripts/run-sera-vnext-regression.ts

Manifest totals:
- tests discovered: 205
- requiredForRegression: 161
- optional/gates/environment-dependent: 44
- types: CONTRACT 42, STATIC 33, UNIT 83, REAL_UI 16, REAL_API 18, REAL_DB 9, GATE 4

Runner responsibilities:
- load frontend/.env.local;
- check LOCAL_FRONTEND_SERVER reachability;
- skip optional environment tests only when declared requirements are missing;
- classify expected v03 NOT_READY separately;
- report discovered, executed, passed, failed, skipped, gates, environment_missing, race_timeouts, unexpected_skips.

Final server-backed run executed all 205 entries with zero required failures and zero skips.
