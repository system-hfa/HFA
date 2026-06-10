# Plano de Rollback — Reconciliação de Duplicatas HFA

## Restauração Individual (30 dias)

Cada evento soft-deleted pode ser restaurado individualmente:

```sql
UPDATE public.events
SET deleted_at = NULL,
    deletion_status = 'ACTIVE',
    deletion_reason = NULL,
    deleted_by = NULL,
    recoverable_until = NULL
WHERE id = '<event_id>'
  AND deletion_status = 'SOFT_DELETED'
  AND recoverable_until > now();
```

## Restauração em Lote

Para restaurar todos os duplicados de um grupo:

1. Identificar grupo pelo group_id
2. Listar duplicate_event_ids
3. Executar UPDATE para cada um
4. Registrar lifecycle event RESTORED

## Rollback Total

```sql
UPDATE public.events
SET deleted_at = NULL,
    deletion_status = 'ACTIVE',
    deletion_reason = NULL,
    deleted_by = NULL,
    recoverable_until = NULL
WHERE deletion_reason IN ('DUPLICATE_EVENT_RECONCILIATION', 'FAILED_EVENT_CLEANUP')
  AND deletion_status = 'SOFT_DELETED'
  AND recoverable_until > now();
```

## Pós-Rollback

- Recalcular Dashboard e Perfil de Risco
- Verificar contagem de eventos ativos
- Verificar ausência de duplicidade residual

## Hard Delete / Purge

**NÃO DISPONÍVEL para dados humanos.** Apenas eventos synthetic `[PURGED SYNTHETIC FIXTURE]` podem ser purgados.
