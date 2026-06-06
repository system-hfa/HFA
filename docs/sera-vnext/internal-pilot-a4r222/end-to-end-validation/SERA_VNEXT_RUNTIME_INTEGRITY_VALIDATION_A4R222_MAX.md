# Runtime Integrity Validation A4R222-MAX

Validated integrity:
- Official baseline validates before mutation tests.
- All fail-closed mutation cases throw validation failures.
- Official baseline, fixture set, and expected output files retain mtimes after trials.
- Runtime service returns repeatable read-only status.
- No baseline/fixture repair is attempted.
- No writes are performed.

Validated by:
- `tests/sera-vnext/runtime-integrity-a4r222max-trial-001.ts`
- `tests/sera-vnext/runtime-performance-a4r222max-trial-001.ts`
- full `tests/sera-vnext/*.ts` sweep.
