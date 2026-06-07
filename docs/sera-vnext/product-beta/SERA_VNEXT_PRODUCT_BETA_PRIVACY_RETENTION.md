# SERA vNext Product Beta Privacy and Retention

Current retention model:

- Soft delete via `deleted_at` and `ARCHIVED` status.
- No automatic purge in this phase.
- Export is internal and marked `INTERNAL`, `NON_FINAL`, `NOT_OPERATIONAL`.
- Audit events intentionally omit full narratives and sensitive payloads.
- Inputs are for internal pilot use only and must avoid confidential or unnecessary PII.

Future purge requires a separate retention policy and authorization.
