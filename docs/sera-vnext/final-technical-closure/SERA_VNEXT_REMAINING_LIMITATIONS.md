# SERA vNext — Remaining Limitations (Post Technical Closure)

**Date**: 2026-06-09

## Methodology Limitations (require methodology team)

| Limitation | Finding | Impact |
|-----------|---------|--------|
| 8/22 canonical codes unreachable | F-03 | Bounded methodological coverage |
| Violation over-attribution (continuation → O-B) | F-04 | Risk of mis-attributing perception events |
| English-only axis patterns (product runs PT) | F-05 | Core classification does not function for product language |
| Baseline expectations fitted to engine output | F-02 | Reduces validation independence |
| ERC mapping is sparse heuristic | F-10 | ERC distribution under-specified |
| EvidenceRequired/ProhibitedInferences synthesized | F-16 | Metadata is engine-generated, not sourced |
| O_MANAGED_RISK PT text polarity mismatch | F-17 | Reviewer confusion risk |

## Infrastructure Limitations

| Limitation | Impact |
|-----------|--------|
| `audit_log` table missing on remote Supabase | `writeAuditLog()` is best-effort only |
| Migration `20260519000000` not applied on remote | Legacy analyses lack traceability columns (runtime fallback active) |
| Docker not available for local Supabase | Cannot run local DB for testing |
| Deploy state (Vercel) not verifiable | Cannot confirm deployed commit/migrations/flags |
| 3 risk endpoints exist (1 legacy-only diverges) | `/api/analyses/risk-profile` omits vNext + exclusions |

## Test Suite Limitations

| Limitation | Finding |
|-----------|---------|
| 176 tests dominated by static guards | F-11 |
| Cross-tenant negative test soft-skips | F-22 |
| No empirical/inter-rater validation | F-24 |
| Documentation sprawl (1287 MD files) | F-25 |

## Resolved in This Phase

| Issue | Resolution |
|-------|-----------|
| F-12: Copy overstatements | "diagnóstico" → "panorama descritivo", "perfil organizacional" → "panorama descritivo" |
| F-14: Error message leaks | `risk-profile/exclusions` sanitized — generic 500s with request_id |
| F-06: Vacuous guardrail flags | All 9 guardrails now computed from engine behavior |
| F-23: Un-audited dashboard endpoint | Dashboard uses `/api/risk-profile` (audited) |
| FK constraint bug | `submittedById` used instead of auth UUID in vNext context |
| Schema mismatch fallback | Legacy pipeline retries without missing columns |

## Non-Blocking (methodology team discretion)

| Issue | Finding |
|-------|---------|
| Legacy engine.ts dead code | F-15 |
| RLS defense-in-depth gaps | F-19 |
| JWT helper search_path | F-20 |
| A_CAPABILITY defaults SIM without evidence | F-21 |
