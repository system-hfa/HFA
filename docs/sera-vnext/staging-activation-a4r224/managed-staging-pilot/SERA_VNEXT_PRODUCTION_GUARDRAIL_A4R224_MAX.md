# Production Guardrail — A4R224-MAX

## Critical Rule

```
PRODUCTION_FLAGS_MUST_REMAIN_FALSE
```

## Scope

This guardrail applies permanently until explicit written authorization from the repository author for production activation.

## Protected Flags

| Flag | Production value | Staging value |
|---|---|---|
| SERA_VNEXT_READONLY_ENABLED | false (MUST NOT be set) | true (controlled) |
| SERA_VNEXT_INTERNAL_PILOT_ENABLED | false (MUST NOT be set) | true (controlled) |
| NEXT_PUBLIC_SERA_VNEXT_DIAGNOSTICS_ENABLED | false (MUST NOT be set) | true (controlled) |
| SERA_VNEXT_CANDIDATE_ONLY_ENABLED | false (MUST NOT be set) | not yet provisioned |

## What "Production" Means

Production = any environment accessible by end users who are not named internal administrators explicitly authorized in writing.

## Authorization Boundary (Current)

- Local activation with real Supabase session: AUTHORIZED
- Controlled staging with named admins: AUTHORIZED
- Public production: NOT AUTHORIZED
- Productive classification: NOT AUTHORIZED
- Downstream activation: NOT AUTHORIZED

## Before Any Production Consideration

All of the following must be true:
1. Candidate-only integration blueprint executed and validated
2. Full methodology governance board review completed
3. Classification accuracy validated against full fixture set
4. P/O/A tree integration authorized
5. Risk Layer integration authorized
6. Explicit written author authorization

## Enforcement

No CI/CD enforcement exists at this phase. Human review of any environment variable change is required before deploy. Future CI enforcement recommended: lint rule or build check asserting `SERA_VNEXT_*` flags are not `true` in production config files.
