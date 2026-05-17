# PRODUCT RISK PROFILE PLAN — HFA v0.2

**Data:** 2026-05-17
**Escopo:** Plano de implementação do dashboard e perfil de risco organizacional
**Baseado em:** PRODUCT_AUDIT_v0.2-A.md · leitura direta de frontend/src/app/(dashboard)/risk-profile/page.tsx e dashboard/page.tsx

---

## 1. Estado Atual — O que já existe

### Dashboard (`/dashboard`)

| Componente | Status | Observação |
|---|---|---|
| Score de risco 0–100 + nível | ✅ | OrgScoreCard com color-coding |
| Ações vencidas / sem owner / taxa resolução | ✅ | OrgScoreCard |
| Distribuição P/O/A com top codes | ✅ | Barras horizontais com modal de detalhe |
| Top precondições | ✅ | PreconditionsChart com PreconditionDefs |
| Padrões (combinações de falha) | ✅ | Tabela com frequência e % |
| AI Insight on-demand | ✅ | AiInsightPanel (não persistido) |
| Tendência 6 meses | ✅ | SVG inline, sem tooltip |
| Eventos recentes | ✅ | Tabela simples |
| Filtro de período | ❌ | Sem filtro — sempre histórico total |
| Filtro por unidade/setor | ❌ | Não existe |
| AI Insight persistido | ❌ | Cada geração é nova chamada |
| Contador de trial/análises | ❌ | Sem noção de limite gratuito |
| Empty state encorajador | ❌ | Mensagem genérica |

### Perfil de Risco (`/risk-profile`)

| Componente | Status | Observação |
|---|---|---|
| Score card (OrgScoreCard) | ✅ | Reutiliza componente do dashboard |
| Matriz ISO 31000 5×5 clicável | ✅ | Com modal explicativo completo |
| Matriz ARMS-ERC 4×4 clicável | ✅ | Com modal explicativo completo |
| SeraReasoningPanel | ✅ | Explica raciocínio SERA → matriz |
| Top 5 precondições (sidebar) | ✅ | Barras de progresso |
| Ranking completo de precondições | ✅ | Tabela com rank, código, nome, freq, % |
| Combinações de falha | ✅ | Tabela com significado operacional |
| Distribuição temporal (TrendLine) | ✅ | SVG com polyline, indica tendência |
| AI Insight | ✅ | AiInsightPanel |
| Guia "qual matriz usar" | ✅ | Colapsável com exemplos |
| PDF export | ❌ | `alert()` placeholder |
| Filtro de período | ❌ | Histórico total apenas |
| Estado parcial com poucas análises | ❌ | Vazio genérico abaixo de 1 análise |
| Nível de risco por evento individual | ❌ | Matrizes só no perfil agregado |

---

## 2. Gaps Críticos para Demonstrar Valor com 5–10 Análises

### GAP-RP-001 — Sem estado intermediário de formação do perfil

**Problema:** com poucas análises, a tela `/risk-profile` exibe "Nenhuma análise disponível" se total_analyses = 0, ou mostra dados insuficientes sem contexto se total_analyses < 10.

**Solução MVP:** exibir estado "perfil em formação" com:
- Dados parciais que existem (score, top code, primeiras precondições)
- Barra de progresso: "3 de 10 análises mínimas para diagnóstico completo"
- Mensagem: "Continue registrando eventos — o padrão organizacional começará a emergir."

### GAP-RP-002 — Sem nível de risco por evento individual

**Problema:** o usuário vê a posição das análises nas matrizes apenas no perfil agregado. No relatório do evento (`/events/[id]`) não há indicação do nível de risco daquele evento específico.

**Solução MVP:** no relatório do evento, após as Etapas 3/4/5, inserir um mini-card com:
- Nível de risco (ERC ou Score ISO 31000) do evento
- Label contextualizado: "Este evento foi classificado como ERC 4 (Urgente)"
- Link para o perfil de risco completo

### GAP-RP-003 — Matrizes usam apenas códigos de Percepção

**Problema:** `TraditionalMatrix` e `ARMSMatrix` só plotam `distribution.perception.top_codes`. Os códigos de Objetivo e Ação não entram na classificação de risco.

**Contexto:** isso é uma limitação metodológica legítima (os mapeamentos de severidade ISO foram definidos apenas para P). A limitação está documentada na UI com ⚠️.

**Solução Fase 2:** definir mapeamentos de severidade para O e A, criando um score combinado P×O×A que reflita o evento completo. Requer pesquisa metodológica — não é para MVP.

### GAP-RP-004 — AI Insight não persistido

**Problema:** cada clique em "Gerar diagnóstico" consome tokens e retorna resultado diferente. Sem histórico, o usuário não pode comparar diagnósticos entre períodos.

**Solução MVP:** salvar o último insight gerado com timestamp no Supabase (`org_insights` table). Exibir data do insight na UI. Oferecer botão "Regenerar" separado do resultado exibido.

---

## 3. Cards que o Dashboard Deve ter

### Bloco 1 — Saúde Organizacional (acima da dobra)

```
┌─────────────────────────────────────────────────────┐
│  SCORE DE RISCO    ANÁLISES     TENDÊNCIA            │
│  67 / 100          12 total     ↑ Crescente          │
│  Nível: WARNING    90d: 4       (últimos 3 meses)    │
└─────────────────────────────────────────────────────┘
```

| Card | Dado | Por quê |
|---|---|---|
| Score de risco | 0–100 + nível + label | Número único para gestão — acessível sem contexto técnico |
| Total de análises | Contador geral | Denominador para todas as métricas |
| Tendência | ↑/↓/→ dos últimos 3 meses | Responde "estamos melhorando?" |

### Bloco 2 — Ações Corretivas

```
┌──────────────┬──────────────┬──────────────┐
│ Abertas      │ Vencidas     │ Taxa resolução│
│ 8            │ 3 🔴         │ 67%           │
└──────────────┴──────────────┴──────────────┘
```

### Bloco 3 — Padrões de Falha (dobra)

- Distribuição P/O/A com top code por categoria
- Top 5 precondições com barra de frequência
- Top 3 combinações de falha com significado operacional

### Bloco 4 — Eventos Recentes

- Últimos 5 eventos com código P/O/A e data
- Link para relatório completo
- Badge de nível de risco por evento (ERC ou ISO)

### Bloco 5 — AI Insight (sob demanda)

- Diagnóstico principal (1 parágrafo)
- Top 3 recomendações com prioridade
- Data de geração + botão "Regenerar"

---

## 4. Gráficos

| Gráfico | Tipo | Dado | Prioridade |
|---|---|---|---|
| Tendência de análises | Line chart (SVG inline ou recharts) | trend: month × count | MVP |
| Distribuição P/O/A | Horizontal bar | distribution.{poa}.pct | MVP |
| Top precondições | Horizontal bar com rank | top_preconditions | MVP |
| Score ao longo do tempo | Line chart | score_history (futuro) | Fase 2 |
| Heatmap de combinações | Grid colorido | top_combinations | Fase 2 |

---

## 5. Filtros

### MVP

- **Nenhum filtro** — mostrar histórico total com dados disponíveis.
- Prioridade é encher o dashboard de valor antes de fragmentá-lo por filtro.

### Fase 2 (após 10+ análises por empresa)

| Filtro | Opções | Impacto |
|---|---|---|
| Período | 30d / 90d / 6m / 12m / tudo | Reduz total_analyses — métricas calculadas sobre subconjunto |
| Unidade/setor | Depende do campo operation_type | Requer novo campo no schema |

---

## 6. Métricas de Risco

### Nível organizacional (perfil acumulado)

| Métrica | Cálculo atual | Limitação |
|---|---|---|
| Score de risco 0–100 | Algoritmo em `/api/org/intelligence` | Não documentado no frontend |
| Nível ISO 31000 | Prob × Sev de top code de percepção | Só usa Percepção |
| ERC modal | Moda de erc_level por análise | Dependente de analyses com ERC calculado |
| Taxa de resolução de ações | closed_last_30d / open_total | Fórmula aproximada |

### Nível por evento

| Métrica | Status | Onde exibir |
|---|---|---|
| ERC do evento | ❌ ausente | `/events/[id]` — após Etapas 3/4/5 |
| Score ISO do evento | ❌ ausente | `/events/[id]` — após Etapas 3/4/5 |
| Nível de risco (label) | ❌ ausente | `events/page.tsx` — coluna na lista |

---

## 7. Consolidação de Dados por Empresa

O sistema já é multi-tenant via `tenant_id`. Todas as queries em `/api/org/intelligence` filtram por tenant automaticamente.

Gaps de consolidação:

1. **Score histórico não persiste** — o score é calculado on-demand, não há tabela `score_history`. Impossível mostrar evolução do score ao longo do tempo sem isso.

2. **AI Insight não persiste** — cada diagnóstico é ephemero. Sem `org_insights` table, não há comparação entre diagnósticos.

3. **Análise conta como do tenant, não da unidade** — sem campo de unidade/setor nas análises, consolidação por setor é impossível.

### Ações de consolidação para MVP

Nenhuma mudança de schema necessária para MVP — os dados existentes são suficientes para demonstrar valor.

Para Fase 2:
- Criar `score_history(tenant_id, calculated_at, score, level)` — inserir ao concluir cada análise
- Criar `org_insights(tenant_id, generated_at, insight_json)` — persistir AI Insights

---

## 8. Como Usar ERC e Matriz Tradicional

### No perfil de risco (já implementado)

- **ISO 31000:** Prob × Sev usando top_codes de percepção. Modal explica raciocínio.
- **ARMS-ERC:** Sev (mapeada do código P) × Barreira (inferida do score ou `modal_erc_level`). Modal explica raciocínio.

### No relatório do evento (a implementar)

**Mini-card de risco por evento** após Etapas 3/4/5:

```
┌──────────────────────────────────────┐
│ CLASSIFICAÇÃO DE RISCO DO EVENTO     │
│                                      │
│  ISO 31000: Elevado (Score 12)       │
│  ARMS-ERC: ERC 4 — Urgente           │
│                                      │
│  Ação requerida em curto prazo       │
│  → Criar ação corretiva              │
└──────────────────────────────────────┘
```

Cálculo:
- ISO: usa `perception_code` do evento → mapeia para severity via `P_SEVERITY` → prob inferida do histórico do tenant → score = prob × sev
- ARMS: usa `perception_code` → `ARMS_SEV_ROW` para severidade → `modal_erc_level` do tenant para barreira → ERC = `ARMS_ERC[cellKey]`

---

## 9. Como Mostrar Top Fatores Humanos

### Já implementado

- Top precondições com código, nome, frequência, percentual
- Ranking completo na tabela
- Top 5 no sidebar da coluna de raciocínio

### A fortalecer

1. **Precondições com definição inline** — o usuário vê o código `P2` mas não sabe o que é. O `PRECONDITION_DEFS` existe no dashboard mas não no perfil de risco.

2. **Ligação precondição → recomendação** — "P2 (estado psicológico) aparece em 5 análises. Isso sugere..."  A ligação hoje é feita via AI Insight (on-demand, não persiste) mas deveria existir como lógica estática mínima.

3. **Precondições por evento** — o relatório do evento já exibe precondições individuais com justificativa. Bom. Falta: badge "precondição recorrente" quando a precondição aparece em >30% das análises do tenant.

---

## 10. Como Mostrar Recomendações Abertas

### Estado atual

- `/actions` lista ações corretivas com texto de `responsible` e status (open/in_progress/completed)
- Sem `due_date`, sem `priority`, sem `owner_user_id` selecionável

### MVP de recomendações abertas no dashboard

Card "Ações em Aberto" com:
- Total de ações abertas
- Vencidas (se due_date existir) ou em atraso (criadas há mais de 30d sem resolução)
- Botão "Ver todas" → `/actions`

### Fase 2 — Gestão real

Campos mínimos para que o módulo de ações seja gerenciável:
- `due_date: date` — quando deve ser resolvida
- `priority: 'low' | 'medium' | 'high' | 'critical'` — badge colorido
- `owner_user_id: uuid` — responsável selecionável entre usuários do tenant

---

## 11. Como Mostrar Valor com 5–10 Análises

### Estado atual

Com 10 análises, o sistema mostra:
- Score calculado (ex: 54 / warning)
- Distribuição P/O/A com top codes
- 1–3 precondições no ranking
- 1–2 combinações
- Tendência com 1–2 pontos (insuficiente para linha)
- Matrizes com algumas células preenchidas

### O que falta para o valor ser perceptível com 10 análises

1. **Insight destacado** — "O padrão mais frequente na sua empresa é X, aparecendo em Y% dos eventos."
2. **Progresso narrativo** — "Com mais Z análises, o perfil estará completo."
3. **Comparação interna** — "O evento mais recente tem risco maior/menor que a média da empresa."
4. **CTA de continuidade** — após cada análise, "Você está a X análises de um diagnóstico completo."

Nenhum desses requer mudança de schema — são apenas mudanças de UI e copy.

---

## 12. MVP vs Futuro

### MVP (implementar primeiro)

| Item | Tela | Esforço |
|---|---|---|
| Estado "perfil em formação" com 1–4 análises | `/risk-profile` | 2h |
| Mini-card de risco por evento | `/events/[id]` | 3h |
| Contador de análises gratuitas | todas as telas | 1h |
| Badge de nível de risco na lista de eventos | `/events` | 1h |
| "Precondição recorrente" no relatório | `/events/[id]` | 2h |
| CTA "Criar ação" vinculado a cada recomendação | `/events/[id]` | 1h |
| Empty state encorajador no dashboard | `/dashboard` | 2h |
| Persiste AI Insight (schema + read/write) | `/api/org/ai-insight` | 4h |

**Total estimado MVP:** ~16h de desenvolvimento

### Fase 2 (após validação de valor)

| Item | Dependência |
|---|---|
| Filtro de período no dashboard | Supabase query com date range |
| Score histórico | `score_history` table |
| Breakdown por unidade/setor | Campo `unit` nas análises |
| Mapeamento O e A para matrizes | Pesquisa metodológica |
| Gestão de ações (due_date, priority, owner) | Schema migration |
| PDF de perfil de risco | Server-side rendering |

---

*Documento criado em 2026-05-17 · Fase v0.2-C · Não alterar motor SERA, fixtures ou baseline*
