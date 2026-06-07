# SERA vNext Controlled Admin Pilot — Rollback Results

## Rollback Path

- Transition: AVAILABLE -> UI_DISABLED -> API_DISABLED -> AVAILABLE
- Participant: PILOT-ADMIN-01
- Tenant: 3a68c15d****

## HTTP Results

| Step                        | Observed result                  |
| --------------------------- | -------------------------------- |
| available_before_api_status | 200                              |
| ui_disabled_api_status      | 200                              |
| ui_disabled_ui_message      | SERA vNext Product Beta disabled |
| api_disabled_api_status     | 404                              |
| available_after_api_status  | 200                              |

## Interpretation

- UI hide behavior and API fail-closed behavior were both confirmed.
- Re-enabling restored normal internal availability without code revert.
- Rollback behavior is adequate for a controlled internal pilot.
