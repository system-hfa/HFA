# Runtime Service Contract A4R221-MAX

Service files:
- `frontend/src/lib/sera-vnext-runtime/feature-flags.ts`
- `frontend/src/lib/sera-vnext-runtime/runtime-service.ts`
- `frontend/src/lib/sera-vnext-runtime/runtime-errors.ts`
- existing baseline loader and validator files in `frontend/src/lib/sera-vnext-runtime/`

Main API:
- `getSeraVNextRuntimeStatus()`

Status shapes:
- `{ enabled: false, status: 'DISABLED' }`
- `{ enabled: true, status: 'AVAILABLE', baselineId, namespace, fixture counts, locks, warnings }`
- `{ enabled: true, status: 'ERROR', errorCode, safeMessage }`

Read-only guarantees:
- Reads the official vNext baseline, fixture set, and expected outputs only.
- Does not write files.
- Does not access Supabase or any database.
- Does not import the legacy product SERA engine.
- Does not produce selected code, released code, final conclusion, classified output, ready promotion, recommendations, HFACS, Risk/ERC, or ARMS/ERC.

Fail-closed rule:
- Any validation inconsistency returns `ERROR` from the service instead of `AVAILABLE`.
