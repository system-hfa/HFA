# SERA vNext — Contrato de Erros e Observabilidade

**Data**: 2026-06-08

---

## Envelope de Erro Sanitizado

Todas as rotas retornam erros neste formato:

```typescript
{
  error: {
    code: string      // código interno (ex: "INTELLIGENCE_ERROR")
    message: string   // mensagem sanitizada, sem stack, sem SQL
    requestId: string // para rastreabilidade
  }
}
```

Ou, nas rotas Product Beta via `SeraVNextProductError`:
```typescript
{
  detail: string      // mensagem sanitizada
  errorCode: string   // código do erro
  request_id: string  // para rastreabilidade
}
```

---

## O que NUNCA retornar em erros de API

- `error.message` bruto de exceções internas
- Stack trace
- Mensagens Supabase internas (`PGRST_*`, `23505`, etc.)
- SQL interno
- PII de usuários
- Tokens, cookies, auth state

---

## Correções Implementadas

### F-14: Raw API errors

| Rota | Antes | Depois |
|---|---|---|
| `/api/org/intelligence` | `jsonError(String(e), 500)` | `jsonError('INTELLIGENCE_ERROR', 'Falha ao gerar perfil de risco.', 500, requestId)` |
| `/api/analyze` (outer catch) | `jsonError(String(e), 500)` | `jsonError('Erro interno na análise SERA.', 500)` |

### F-22: Soft-skip que mascara checks

Investigado: `isCompatibleVNextRow` em `risk-profile/server.ts` retorna `false` para análises sem P/O/A. Contagem de excluídos por incompatibilidade é reportada em `limitations`. Não é soft-skip — é filtro explícito com limitação declarada.

### F-23: Dashboard em endpoint não auditado

`/api/org/intelligence` não tinha audit log. Mantido sem audit log por ser deprecated, mas agora retorna `requestId` e `x-request-id` no header para rastreabilidade. O endpoint canônico `/api/risk-profile` tem audit log completo.

---

## Eventos de Observabilidade

### Existentes (audit_log)

| Evento | Rota |
|---|---|
| `event_created` | /api/analyze |
| `analysis_started` | /api/analyze |
| `analysis_completed` | /api/analyze |
| `analysis_partial` | /api/analyze |
| `analysis_failed` | /api/analyze |
| `risk_profile.generated` | /api/risk-profile |
| `risk_profile.exclusion_created` | /api/risk-profile/exclusions |
| `risk_profile.exclusion_restored` | /api/risk-profile/exclusions/[id] |

### Product Beta (sera_vnext_analysis_events)

| Evento | Trigger |
|---|---|
| `analysis.created` | POST /api/admin/sera-vnext/analyses |
| `analysis.reanalysis_requested` | POST .../reanalyze |
| `analysis.reanalyzed` | POST .../reanalyze (após conclusão) |
| `analysis.review_started` | POST .../reviews |
| `analysis.review_submitted` | POST .../reviews |
| `analysis.archived` | POST .../archive |
| `analysis.restored` | POST .../restore |
| `analysis.exported` | GET .../export |

### Metadata mandatória nos eventos

- `tenant_id`
- `request_id`
- `engine_version` / `engine_runtime_version`
- `source_flow`
- Sem narrativa, sem raw_input, sem PII, sem tokens

---

## Logs Internos

Formato interno permitido:
```typescript
console.error('[rota]', { requestId, stage, message: e.message })
```

Stack trace pode aparecer em logs internos mas não em respostas de API.
