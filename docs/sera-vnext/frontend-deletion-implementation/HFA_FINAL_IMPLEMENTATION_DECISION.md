# HFA Final Implementation Decision

Decisão atual:
- `FRONTEND_READY_SAFE_EVENT_DELETION_PASS_WITH_LIMITATIONS`

Justificativa:
- hard delete inseguro bloqueado
- soft delete recuperável implementado
- restore implementado
- área de eventos excluídos implementada
- relatórios produtivos sem demo silenciosa
- contrato mínimo de paridade publicado

Limitações abertas:
- purge definitivo permanece bloqueado fora de `DRY_RUN`
- sem validação staging remota nesta fase
- sem sweep completo/Playwright autenticado neste ciclo local
