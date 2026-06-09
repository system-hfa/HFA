# SERA vNext — Contrato de Dados do Dashboard Empresarial

**Data**: 2026-06-08

---

## Dashboard Canônico

Rota UI: `/dashboard`  
Endpoint atual: `GET /api/org/intelligence` (deprecated — deve migrar para `/api/risk-profile`)

---

## Cards e Fontes

| Card | Campo da API | Tipo | Fonte |
|---|---|---|---|
| Eventos totais | `total_events` | DIRECT_COUNT | Legacy events + vNext analyses |
| Análises incluídas | `included_events` | DIRECT_COUNT | Sources com status=completed e não excluídas |
| Análises excluídas | `excluded_events` | DIRECT_COUNT | Sources com isExcluded=true |
| ERC principal | `modal_erc_level` | DERIVED_HEURISTIC | Categoria ERC mais frequente |
| Score de risco | `score` | DERIVED_HEURISTIC | Ver HEURISTIC_LIMITS |
| Ações abertas | `actions.open_total` | DIRECT_COUNT | corrective_actions status in (pending, in_progress) |
| Ações vencidas | `actions.open_overdue` | DIRECT_COUNT | open + due_date < hoje |
| Taxa de resolução | `actions.resolution_rate` | DERIVED_HEURISTIC | closed/(closed+open) |
| Análises por mês | `trend` | DIRECT_COUNT | Por mês em included_sources |
| Confiança dos dados | `data_confidence` | DERIVED_HEURISTIC | Via buildDataConfidence (min=10) |

---

## Requisitos de Consistência

1. Os números do Dashboard e do `/risk-profile` devem ser **idênticos** — ambos chamam `getRiskProfileSummaryForTenant`.
2. O Dashboard não pode mostrar placeholders como dados reais.
3. Estados loading/error/empty devem estar implementados.
4. Quando `data_confidence.level = 'LOW'`: mostrar aviso de amostra insuficiente.
5. Score de risco DEVE ser acompanhado de disclaimer de índice heurístico.

---

## Finding: Dashboard usa endpoint deprecated

O componente de dashboard (`/dashboard/page.tsx`) chama `GET /api/org/intelligence`.

**Recomendação**: migrar para `GET /api/risk-profile` para:
- Receber audit log de geração de perfil.
- Receber `x-request-id` para rastreabilidade.
- Receber campos de proveniência completos por fonte.

**Esta migração não foi executada nesta macrofase** — é próximo passo recomendado.

---

## Ação Corretiva

Para migrar dashboard para endpoint canônico:
1. Alterar chamada em `/dashboard/page.tsx` de `/api/org/intelligence` para `/api/risk-profile`.
2. Verificar que todos os campos usados existem na resposta (são idênticos — mesma função).
3. Adicionar header forwarding do `x-request-id` se o componente usar.
