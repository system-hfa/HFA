# OPS Request ID Traceability — v0.3-I-b

**Versão:** v0.3-I-b
**Data:** 2026-05-19
**Branch base:** main @ `a786283b`
**Tipo:** Implementação incremental — rastreabilidade por `request_id`

---

## 1. Objetivo

Garantir que toda requisição às rotas críticas do backend tenha um identificador único (`request_id`) que:
- aparece nos logs server-side para correlação de erros;
- é devolvido no header `x-request-id` de todas as respostas (sucesso e erro);
- é incluído no corpo de respostas de erro estruturadas (`{ detail, request_id }`);
- pode ser reutilizado do cliente via header `x-request-id` (support, debugging);
- não vaza PII em nenhuma circunstância.

---

## 2. Escopo implementado

| Rota | Método(s) | Coberta |
|---|---|---|
| `GET /api/events` | GET | ✓ |
| `POST /api/events` | POST | ✓ |
| `POST /api/analyze` | POST | ✓ |
| `GET /api/analyses/[analysisId]/pdf` | GET | ✓ |
| `GET /api/actions` | GET | ✓ |
| `POST /api/actions` | POST | ✓ |

**Helper criado:** `frontend/src/lib/observability/request-id.ts`

---

## 3. Fora de escopo desta fase

- Rotas `/api/admin/*` — somente acesso interno, baixo risco externo
- Rotas `/api/settings/*` — sem operações críticas de segurança de voo
- Rotas `/api/auth/*` — sensível; será abordado em fase futura com cuidado extra
- Rotas `/api/org/*` — insights, AI config; risco menor
- Rotas `/api/credits`, `/api/trial/*` — billing, fora do escopo desta fase
- `audit_log` — implementado em fase I-c
- Logging estruturado completo com trace propagation — P1 futuro

---

## 4. Helper criado

**Arquivo:** `frontend/src/lib/observability/request-id.ts`

### Funções exportadas

#### `getOrCreateRequestId(req: Request): string`

- Lê o header `x-request-id` da requisição.
- Sanitiza: remove caracteres não permitidos (`[^a-zA-Z0-9_\-.:/ ]`), limita a 80 caracteres.
- Se após sanitização o ID for vazio, gera um novo.
- Geração: `crypto.randomUUID()` quando disponível (Node.js ≥ 14.17, Edge Runtime); fallback `Date.now().toString(36) + random`.
- Nunca retorna string vazia.

#### `buildErrorResponse(detail: string, status: number, requestId: string): NextResponse`

- Substitui o padrão local `jsonError(message, status)` das rotas.
- Corpo: `{ detail, request_id }`.
- Header: `x-request-id: <requestId>`.

---

## 5. Rotas alteradas

### Padrão aplicado em cada handler

```ts
export async function HANDLER(req: Request, ...) {
  const requestId = getOrCreateRequestId(req)
  const jsonError = (message: string, status: number) => buildErrorResponse(message, status, requestId)
  try {
    // ... lógica ...
    return NextResponse.json({ ... }, { headers: { 'x-request-id': requestId } })
  } catch (e) {
    console.error('[/api/rota]', { requestId, error: String(e) })
    return jsonError(String(e), 500)
  }
}
```

### `frontend/src/app/api/events/route.ts`

- GET: adicionado `requestId`; `x-request-id` no response; `logEventsError` recebe `{ requestId }` via contexto.
- POST: `requestId` adicionado ao `context` inicial (`{ requestId }`); propagado para todos os `logEventsError`; `x-request-id` no response de sucesso.

### `frontend/src/app/api/analyze/route.ts`

- POST: `requestId` no início do handler; todos os `console.error` trocados por forma estruturada com `requestId`; `x-request-id` nas duas respostas de sucesso (reprocessamento e nova análise).

### `frontend/src/app/api/analyses/[analysisId]/pdf/route.ts`

- GET: `requestId` no início; `x-request-id` adicionado ao objeto `headers` do PDF binário; erros de geração agora logam `requestId`; `buildErrorResponse` em todos os `jsonError`.

### `frontend/src/app/api/actions/route.ts`

- GET + POST: `requestId` em cada handler; `x-request-id` em respostas de sucesso; log estruturado em erros.

---

## 6. Padrão de header `x-request-id`

| Situação | Header presente | Valor |
|---|---|---|
| Request com `x-request-id` válido | Sim | Valor sanitizado do cliente |
| Request sem `x-request-id` | Sim | UUID gerado pelo servidor |
| Request com `x-request-id` inválido (todos chars removidos) | Sim | UUID gerado pelo servidor |
| Resposta de sucesso JSON | Sim | No options object de NextResponse |
| Resposta de erro JSON | Sim | No options object de NextResponse |
| Resposta de PDF binário | Sim | No headers object do `new NextResponse(bytes, { headers })` |

---

## 7. Padrão de logs

```ts
console.error('[/api/<rota>]', { requestId, error: err.message })
```

- Nunca incluir: `raw_input`, `rawInput`, texto do relato, e-mail, tokens, secrets, stack trace de LLM.
- `userId` e `tenantId` (UUIDs internos) são permitidos nos logs quando já estavam presentes.
- `requestId` é sempre incluído em logs de erro das rotas cobertas.

### `/api/events` — log estruturado existente

A função `logEventsError` já existia e recebe `extra: Record<string, unknown>`. O `requestId` é propagado via campo `requestId` no objeto `context`:

```ts
let context: Record<string, unknown> = { requestId }
// Após auth:
context = { requestId, userId: user.userId, tenantId: user.tenantId }
// Em erro:
logEventsError(err, stage, context)
// → console.error('[/api/events Error]', { stage, message, stack, cause, requestId, userId, tenantId })
```

---

## 8. Padrão de erro

Antes (v0.3-I-a e anteriores):
```json
{ "detail": "mensagem de erro" }
```

Após esta fase (v0.3-I-b):
```json
{ "detail": "mensagem de erro", "request_id": "uuid-aqui" }
```

O campo `detail` é preservado (não quebramos clientes existentes).
O campo `request_id` é adicional.
O header `x-request-id` está presente em todas as respostas.

---

## 9. Cuidados de PII

- `requestId` é um UUID ou derivado de timestamp+random — sem PII.
- Logs nunca incluem: relato de ocorrência, e-mail do usuário, tokens JWT/API.
- `userId` e `tenantId` são UUIDs internos gerados pelo Supabase — não são dados pessoais diretos.
- O header `x-request-id` recebido do cliente é sanitizado antes do uso (removidos todos os chars fora do conjunto permitido).
- Tamanho máximo do ID externo: 80 caracteres — previne abuso de header como vetor de log injection.

---

## 10. Testes executados

| Teste | Resultado |
|---|---|
| `npx tsc --noEmit` | ✓ Sem erros |
| Gate causal SERA N=1 (14 fixtures) | ✓ 14/14 PASS |
| Smoke global | Não executado (fora de escopo desta fase) |

---

## 11. Limitações conhecidas

1. **Rotas não cobertas nesta fase:** `/api/admin/*`, `/api/auth/*`, `/api/settings/*`, `/api/org/*`, `/api/credits`, `/api/trial/*`, `/api/risk-profile`, `/api/extract-*`. Estas serão cobertas em fases futuras conforme prioridade.

2. **Propagação entre serviços:** O `request_id` não é ainda propagado para chamadas downstream (LLM, Supabase). Para correlação end-to-end completa seria necessário trace propagation (P1 futuro).

3. **Sem `audit_log`:** O `request_id` ainda não é gravado em tabela de auditoria. Isso será implementado na fase I-c.

4. **Sem middleware de request_id:** A geração é feita por handler, não por middleware global. Escolha deliberada para manter escopo cirúrgico.

5. **Sem métricas:** Contagem de requests por `request_id` prefixo/pattern não está implementada. Fase P1 futura.

---

## 12. Próxima fase recomendada

**OPS v0.3-I-c — `audit_log`**

Criar tabela `audit_log` com eventos mínimos (conforme plan v0.3-I, seção 7):
- `analysis.completed` — após pipeline SERA concluir
- `analysis.classification_overridden` — após edição manual de P/O/A/ERC
- `report.exported` — após geração de PDF formal
- `corrective_action.created`
- Usar `request_id` como campo na tabela `audit_log`
- RLS: somente service role (admin client)
