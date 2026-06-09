# HFA Event Deletion Audit

Eventos adicionados ao catálogo crítico:
- `event.deletion_impact_viewed`
- `event.deletion_requested`
- `event.soft_deleted`
- `event.restored`
- `event.purge_started`
- `event.purge_scheduled`
- `event.storage_delete_failed`
- `event.purge_failed`
- `event.purged`
- `event.hard_delete_denied`

Princípio:
- falha de gravação crítica aborta a operação
