# SERA vNext Controlled Admin Pilot — Environment

## Environment Record

| Field               | Value                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| Date                | 2026-06-07                                                                                                  |
| Commit baseline     | ae9e6e440566bbc01278f2eeccf2366cb06ec7a9                                                                    |
| Environment type    | CONTROLLED_INTERNAL_REMOTE                                                                                  |
| Project ref         | czwlmds...gjqo (sanitized)                                                                                  |
| Region              | West US (North California)                                                                                  |
| Migrations applied  | 20260607135727_sera_vnext_product_beta.sql; 20260607164500_sera_vnext_product_beta_non_final_status_fix.sql |
| Database validation | PASS (16/16 DB checks, 5/5 RLS checks)                                                                      |
| Rollback validation | PASS (AVAILABLE -> UI_DISABLED -> API_DISABLED -> AVAILABLE)                                                |

## Feature Flags (pilot only — defaults remain false)

```text
SERA_VNEXT_PRODUCT_BETA_ENABLED=true
NEXT_PUBLIC_SERA_VNEXT_PRODUCT_BETA_UI_ENABLED=true
SERA_VNEXT_READONLY_ENABLED=true
SERA_VNEXT_INTERNAL_PILOT_ENABLED=true
SERA_VNEXT_CANDIDATE_ONLY_ENABLED=true
```

Flags were set in process environment for the controlled run. Code defaults remain false and were not changed for general availability.

## Restrictions

- Feature flags apply only to this controlled run.
- Public production access was not opened.
- Common users remain blocked by server-side admin gating.
- Final classification and downstream outputs remain blocked by API and database constraints.
- Data is persistent and auditable, but remains non-final and internal only.

## Not Recorded Here

- Database password
- Service role key
- JWT tokens
- Full connection strings
- Any direct participant PII
