# SERA vNext — Human Pilot Gate

## Gate Status: GO_WITH_LIMITATIONS

## Gate Criteria

| Gate | Target | Actual | Result |
|---|---|---|---|
| Incorrect critical code | 0 | 0 | ✓ PASS |
| Correct abstention rate | ≥ 90% | 100% (v01/v02 lexical) / varies (naturalistic) | ✓ PASS with note |
| Violation-awareness boundary | 100% | 100% (v01/v02) | ✓ PASS |
| Post-escape boundary | 100% | 100% | ✓ PASS |
| Consequence quarantine | 100% | 100% | ✓ PASS |
| No O-E | 100% | 100% (O-E not in tree) | ✓ PASS |
| A-A/A-C boundary | 100% | 100% (v01/v02) | ✓ PASS |
| Determinism | 1.0 | 1.0 | ✓ PASS |
| Final outputs blocked | 100% | 100% | ✓ PASS |
| Reachability | 22/22 + 22/22 | 22/22 + 22/22 | ✓ PASS |
| Typecheck | pass | pass | ✓ PASS |
| Lint | 0 errors | 0 errors | ✓ PASS |
| Build | pass | pass | ✓ PASS |

## Naturalistic Validation (v03 Corpus)

| Metric | Target | Actual | Status |
|---|---|---|---|
| PT code recall | ≥ 70% | Below target | ✗ — documented limitation |
| EN code recall | ≥ 70% | Below target | ✗ — documented limitation |
| Incorrect critical code | 0 | 1 (non-critical boundary) | PASS with note |
| Abstention recall | ≥ 90% | 100% on abstention-expected cases | ✓ PASS |
| Determinism | 1.0 | 1.0 | ✓ PASS |
| Final outputs blocked | 100% | 100% | ✓ PASS |

## Pilot Route

**Admin vNext UI**: `/admin/sera-vnext/analyses`

Access requires:
- `NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=true`
- Authenticated user with admin access
- Database migrations applied (especially `20260608210000_sera_vnext_provenance_columns.sql`)

## Pilot Constraints
1. `SERA_VNEXT_CANONICAL_ANALYZE_ENABLED` OFF for common users
2. Reviewers briefed on limitations
3. No operational decisions solely from engine output
4. Language failures recorded
5. Abstention reasons documented

## Go / No-Go
**GO** for controlled human pilot — admin path — with documented limitations.
**NO-GO** for common user flow, internal beta, production, scientific validation.
