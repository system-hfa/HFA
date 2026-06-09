# HFA Frontend Data Parity

Contrato mínimo exposto em `/api/admin/stats`:
- `total_active_events`
- `soft_deleted_events`
- `analyzed_events`
- `legacy_analyses`
- `vnext_analyses`
- `risk_profile_included`
- `risk_profile_excluded`

Filtros aplicados:
- `/api/events` usa `deleted_at is null` por padrão
- `/api/events?scope=deleted` lista somente excluídos
- `risk-profile/server.ts` ignora eventos soft-deleted
