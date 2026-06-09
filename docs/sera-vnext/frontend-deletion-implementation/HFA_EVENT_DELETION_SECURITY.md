# HFA Event Deletion Security

Controles implementados:
- admin gate via `requireAdmin`
- tenant scoping em todas as rotas novas
- confirmação por título exato
- motivo obrigatório
- trilha crítica de auditoria
- bloqueio explícito de hard delete
- RLS para `event_deletion_tombstones`

Riscos remanescentes:
- purge real segue bloqueado
- validação staging/Playwright autenticada ainda pendente
