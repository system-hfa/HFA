# Segurança — Reconciliação de Duplicatas HFA

## Proteções Implementadas

### Tenant Isolation
- Cada grupo de duplicidade é confinado a um único tenant_id
- Cross-tenant grouping é bloqueado na detecção
- Soft-delete verifica tenant_id do evento

### Admin-Only
- Ações de reconciliação requerem service_role ou admin autenticado
- RLS policies garantem isolamento por tenant

### Idempotência
- Soft-delete verifica `deleted_at IS NULL` antes de atualizar
- Lifecycle events usam request_id único para prevenir duplicação

### Recuperação
- Todos os soft-deletes são recuperáveis por 30 dias
- `recoverable_until` registrado em cada evento
- Restore reverte deletion_status para ACTIVE

### Contra Abusos
- Sem hard delete de dados humanos
- Sem purge de produção
- Sem exclusão em massa sem preview
- Payload validation via esquema de banco
