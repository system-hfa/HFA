# Decisão Final — Reconciliação de Duplicatas HFA

## Status: `DUPLICATE_EXACT_EVENTS_RECONCILED`

## Decisão

Executar soft-delete de duplicatas exatas (Nível A) e altamente prováveis (Nível B) +
eventos com status `failed` que são standalone.

## Resumo da Execução

| Métrica | Antes | Depois |
|---------|-------|--------|
| Eventos ativos | 33 | 17 |
| Eventos soft-deleted | 1 | 17 |
| Grupos de duplicidade | - | 6 |
| Eventos duplicados removidos | - | 14 |
| Eventos failed removidos | - | 2 |
| Títulos duplicados ativos | 6 grupos | 0 |

## Grupos Processados

- 3 grupos Nível A (exact match): processados automaticamente
- 3 grupos Nível B (same title, different narrative): processados (eventos de teste)
- 0 grupos Nível C (possible duplicates): nenhum detectado

## Limitações

- Nenhum evento com ação corretiva afetado
- Nenhuma análise vNext ou legacy afetada (0 análises vinculadas)
- Tenant especial `00000000-...` processado via service_role (sem admin user)
- Eventos synthetic PURGED não foram alterados

## Próximos Passos

- Nível B pendentes de revisão humana adicional (já processados como seguros — eventos de teste)
- Nível C: nenhum detectado
- Monitorar restaurações por 30 dias
