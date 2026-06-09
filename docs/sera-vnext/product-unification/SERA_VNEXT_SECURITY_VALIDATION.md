# SERA vNext — Validação de Segurança

**Data**: 2026-06-08

---

## Modelo de Segurança

### Autenticação

Todas as rotas usam `requireBearerUser` (usuários comuns) ou `requireAdmin` (rotas Product Beta).

- Sem token válido → 401
- Token válido mas role insuficiente → 403 (Product Beta exige `admin`)

### Tenant Isolation

| Camada | Mecanismo |
|---|---|
| RLS no DB | `sera_vnext_beta_can_use(tenant_id)` — verifica tenant_id do JWT |
| App server | `.eq('tenant_id', user.tenantId)` em todas as queries |
| Exclusões | `.eq('tenant_id', tenantId)` + validação de `source_id` |

### Feature Flag Bypass

- Flags server-side lidas via `process.env` — não expostas ao cliente.
- Cliente não pode forçar flag on via header ou payload.
- `NEXT_PUBLIC_*` flags são somente para UI; o servidor verifica `SERA_VNEXT_PRODUCT_BETA_ENABLED` independentemente.

---

## Testes de Segurança a Executar

### Auth

- [ ] Sem token → 401 em todas as rotas
- [ ] Token expirado → 401
- [ ] Token de outro tenant → dados não retornados (RLS)

### Tenant

- [ ] Análise de tenant A não é visível para tenant B (IDOR)
- [ ] Exclusão de análise de tenant A por usuário de tenant B → 404
- [ ] Export de análise cross-tenant → 404

### Product Beta

- [ ] Usuário sem role admin → 404 (feature disabled)
- [ ] Admin de tenant correto → acesso permitido
- [ ] Admin de tenant errado → RLS bloca

### Feature Flag

- [ ] `SERA_VNEXT_PRODUCT_BETA_ENABLED=false` → rotas retornam 404
- [ ] Client flag on / server flag off → servidor usa legacy, UI mostra indicador (aceitável como estado transitório)
- [ ] Legacy bypass tentativa de chamar API vNext diretamente → auth/flag check

### Idempotência

- [ ] Mesma `clientRequestId` com payload igual → 200 (idempotent)
- [ ] Mesma `clientRequestId` com payload diferente → 409 (CONFLICT)
- [ ] Cross-tenant com mesmo `clientRequestId` → isolado por `(tenant_id, client_request_id)`

### Erros

- [ ] Erro interno não vaza stack trace na resposta
- [ ] Erro interno não vaza SQL na resposta
- [ ] Erro interno não vaza mensagem Supabase bruta
- [ ] requestId presente em todas as respostas de erro

---

## Constraints de Banco Verificadas

| Constraint | Efeito de Segurança |
|---|---|
| `sera_vnext_analyses_no_final_status` | Bloca status com FINAL/CLASSIFIED/READY/RELEASED |
| `sera_vnext_analyses_non_final_output_lock` | Bloca selectedCode, releasedCode, finalConclusion, classifiedOutput, readyPromotion, downstreamAllowed |
| `sera_vnext_analyses_versions_locked` | Bloca engine_version diferente de 0.1.0 |
| `sera_vnext_events_no_narrative_payload` | Bloca narrative/raw_input em eventos de auditoria |
| RLS `sera_vnext_beta_can_use` | Restringe acesso ao tenant+admin correto |

---

## Achados Não Resolvidos Nesta Fase

1. Dashboard chama `/api/org/intelligence` sem audit log — finding F-23. Parcialmente mitigado: endpoint agora retorna requestId. Migração para `/api/risk-profile` recomendada.
2. RLS da tabela `risk_profile_exclusions` não foi auditada nesta macrofase. A migration existente cria RLS adequada baseada em tenant_id; auditoria formal fica para próxima fase.
