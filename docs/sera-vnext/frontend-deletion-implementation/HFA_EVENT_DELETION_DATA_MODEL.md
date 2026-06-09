# HFA Event Deletion Data Model

- `events` recebeu colunas aditivas:
  - `deleted_at`
  - `deleted_by`
  - `deletion_reason`
  - `deletion_status`
  - `recoverable_until`
  - `purge_scheduled_at`
  - `purged_at`
- Status suportados:
  - `ACTIVE`
  - `SOFT_DELETED`
  - `PURGE_SCHEDULED`
  - `PURGE_FAILED`
  - `PURGED`
  - `RESTORED`
- `event_deletion_tombstones` preserva trilha mínima por tenant:
  - hash do título
  - ator
  - `request_id`
  - categorias de dados
  - status

Escopo atual:
- legado `events/analyses/corrective_actions`
- sem alteração metodológica em SERA, P/O/A, árvore canônica ou fixtures

Limitação atual:
- purge definitivo permanece bloqueado fora de `DRY_RUN`
