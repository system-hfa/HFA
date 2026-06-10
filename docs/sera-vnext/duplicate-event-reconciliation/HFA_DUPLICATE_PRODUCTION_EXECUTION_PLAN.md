# Plano de Execução em Produção — Reconciliação de Duplicatas HFA

## Pré-requisitos

- [x] Staging executado com sucesso (2026-06-09/10)
- [x] 16 eventos soft-deleted em staging, 0 falhas
- [x] TypeScript: sem erros
- [x] Build: sucesso
- [x] Lint: 0 erros
- [ ] Regressão canônica: executando
- [ ] Revisão humana dos grupos Nível B
- [ ] Backup do banco de produção

## Sequência de Execução

### Fase 1: Detecção (READ-ONLY)

```bash
npx tsx scripts/sera-vnext/find-duplicate-events.ts --dry-run
npx tsx scripts/sera-vnext/reconcile-duplicate-events.ts --dry-run
```

Saídas: `tmp/hfa-duplicate-event-reconciliation/dry-run.json`, `dry-run.csv`

### Fase 2: Revisão

- Revisar cada grupo Nível A (exact match): aprovação automática
- Revisar cada grupo Nível B (same title): confirmar que são eventos de teste
- Nível C: não agir sem revisão humana
- Verificar ausência de corrective actions abertas
- Verificar ausência de análises vinculadas

### Fase 3: Execução

```bash
npx tsx scripts/sera-vnext/reconcile-duplicate-events.ts --execute
```

### Fase 4: Validação

- Verificar eventos ativos
- Verificar Dashboard
- Verificar Perfil de Risco
- Verificar ausência de duplicatas
- Verificar ausência de eventos failed

## Rollback

Ver `HFA_DUPLICATE_ROLLBACK.md` — todos os eventos recuperáveis por 30 dias.
