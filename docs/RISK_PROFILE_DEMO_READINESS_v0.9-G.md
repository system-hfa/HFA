# RISK Profile Demo Readiness — v0.9-G

**Versão:** v0.9-G  
**Data:** 2026-05-18  
**Fase:** RISK v0.9-G  
**Status:** Entregue — hierarquia visual, ordem de painéis, copy.

---

## 1. Objetivo

RISK v0.9-G prepara o Risk Profile Organizacional para demonstração comercial e trial. O objetivo é tornar a primeira leitura mais clara: confiança da base, padrões recorrentes e tendência qualitativa devem aparecer como proposta de valor central, enquanto as matrizes permanecem disponíveis como ferramentas de apoio à triagem.

Esta fase não altera cálculos, contratos de API ou metodologia. Apenas ajusta hierarquia de layout e comunicação visível.

---

## 2. Problema resolvido

Após as fases v0.9-A a v0.9-F, o Risk Profile estava metodologicamente correto e bem comunicado, mas a tela ainda apresentava:

- **Densidade excessiva** na primeira dobra: OrgScoreCard + Matrizes dominavam a leitura
- **Valor organizacional deslocado**: Safety Issue Candidates e Tendência Qualitativa apareciam tarde (seções 5.5 e 8)
- **Ausência de orientação** para usuário novo: sem guia de leitura, sem hierarquia clara
- **Títulos genéricos**: "Matriz de Risco", "Distribuição Temporal" não comunicavam propósito metodológico

Um usuário novo na demonstração comercial chegava primeiro às matrizes antes de ver os candidatos a Safety Issue e a tendência qualitativa — exatamente os indicadores que diferenciam o produto de um simples classificador de eventos.

---

## 3. Princípios de hierarquia aplicados

| Bloco | Pergunta respondida | Painéis |
|---|---|---|
| **1 — Orientação e confiança** | A base é confiável para interpretar? | "Como ler", Confiança dos dados, Índice de Cobertura Analítica |
| **2 — Valor organizacional** | Quais padrões e tendências emergem? | Candidatos a Safety Issue, Tendência qualitativa observada |
| **3 — Matrizes de apoio** | Como os padrões se posicionam em triagem? | Matrizes de apoio à triagem (ISO 31000 + ARMS-ERC) |
| **4 — Detalhamento** | Quais combinações e precondições? Qual foi o raciocínio da IA? | Combinações, Precondições, IA, Volume por mês |

---

## 4. Painéis reorganizados e copy ajustada

### 4.1 Nova ordem de painéis

**Antes (ordem de renderização):**
1. Header
2. Zero-state
3. Banner "em formação"
4. OrgScoreCard (Índice de Cobertura Analítica)
5. DataConfidencePanel (Confiança dos dados)
6. Matrizes (Grid 2 colunas + SeraReasoningPanel + Precondições)
7. Combinações de falha
8. Ranking de Precondições
9. Candidatos a Safety Issue
10. Análise por IA
11. Distribuição Temporal
12. Tendência Qualitativa Observada

**Depois (ordem de renderização):**
1. Header
2. Zero-state
3. Banner "em formação"
4. **[NOVO]** "Como ler este perfil" — guia rápido de orientação
5. Confiança dos dados (movido antes do OrgScoreCard)
6. Índice de Cobertura Analítica (movido para depois da Confiança)
7. **[MOVIDO]** Candidatos a Safety Issue (era seção 9)
8. **[MOVIDO]** Tendência qualitativa observada (era seção 12)
9. Matrizes de apoio à triagem (renomeado)
10. Combinações de falha
11. Ranking de Precondições
12. Análise por IA
13. **[RENOMEADO]** Volume de análises por mês (era "Distribuição Temporal")

### 4.2 Bloco "Como ler este perfil" (novo)

```
O perfil organiza as análises em três leituras:
confiança da base, padrões recorrentes e tendência qualitativa.
As matrizes funcionam como apoio à triagem — não como conclusão isolada.
```

Posicionado imediatamente após o header/forming banner, apenas quando `hasAnalyses`.

### 4.3 Renomeações de título

| Antes | Depois | Justificativa |
|---|---|---|
| `"Matriz de Risco"` | `"Matrizes de apoio à triagem"` | Comunica propósito (triagem) em vez de conclusão (risco) |
| `"Distribuição Temporal"` | `"Volume de análises por mês"` | Mais específico; separado da qualidade/severidade |

### 4.4 Subtítulo adicionado — Volume de análises por mês

> "Frequência de registros — separada da qualidade/severidade observada."

### 4.5 Zero-state — passo 3 atualizado

Antes: "Com 10 análises, as matrizes, precondições recorrentes e tendências revelam os primeiros padrões organizacionais observados"

Depois: "Com 10 análises, o perfil mostra confiança da base, candidatos a Safety Issue, tendência qualitativa e matrizes de apoio à triagem"

**Justificativa:** A nova descrição nomeia explicitamente as três leituras-chave do produto para que o usuário saiba o que esperar.

---

## 5. O que não foi alterado

- Motor SERA (`pipeline.ts`, `all-steps.ts`, `levels.json`)
- Database schema / migrations
- Fixtures e baseline (`sera-v0.1.1`)
- Score formula (Índice de Cobertura Analítica)
- Helpers: Safety Issue Candidates, Risk Quality Trend, Data Confidence, ERC
- API (`route.ts`) — nenhum campo adicionado ou removido
- Matrizes — lógica, células, cálculo, ARMS
- Componentes internos: `DataConfidencePanel`, `SafetyIssueCandidatesPanel`, `QualityTrendPanel`, `SeraReasoningPanel`, `TraditionalMatrix`, `ARMSMatrix`
- `OrgScoreCard.tsx`
- Tipos e interfaces
- Testes unitários

---

## 6. Validações

```bash
npx tsx tests/sera/test-data-confidence.ts          # 28 testes, PASS
npx tsx tests/sera/test-risk-quality-trend.ts        # 32 testes, PASS
npx tsx tests/sera/test-safety-issue-candidates.ts   # 27 testes, PASS
npx tsx tests/sera/test-erc-conversion.ts            # 75 testes, PASS
npx tsx tests/sera/test-erc-modal.ts                 # 10 testes, PASS
npx tsx tests/sera/test-erc-presentation.ts          # 9 testes, PASS
npx tsx tests/sera/test-erc-api-ui-contract.ts       # 38 testes, PASS
npx tsx tests/sera/analyze-risk-validation-contract.ts           # 10/10 OK
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict  # 10/10 OK
```

Typecheck: não conclusivo por `TS6053` pré-existente de infraestrutura (`node_modules`). Sem erros nos arquivos alterados nesta fase.

Áreas protegidas verificadas: `pipeline.ts`, `all-steps.ts`, `levels.json`, fixtures, baseline, migrations, `route.ts`, helpers — nenhum alterado.

---

## 7. Arquivos alterados

| Arquivo | Tipo | Mudança |
|---|---|---|
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | **Alterado** | Reordenação de painéis + bloco guia + renomeações |
| `docs/RISK_PROFILE_DEMO_READINESS_v0.9-G.md` | **Criado** | Este documento |

---

## 8. Próxima fase recomendada

**RISK v0.9-H — Handoff e congelamento do Risk Profile v0.9**

Objetivo:
- Documentar estado final das fases v0.9-A a v0.9-G
- Registrar decisões metodológicas consolidadas
- Listar todas as validações por fase
- Preparar baseline documental para próxima rodada de produto

---

## 9. Referências

| Documento | Relevância |
|---|---|
| `docs/RISK_PROFILE_METHODOLOGY_AUDIT_v0.9-A.md` | Auditoria de origem |
| `docs/RISK_PROFILE_SCORE_RELABEL_v0.9-B.md` | Score → Índice de Cobertura |
| `docs/RISK_SAFETY_ISSUE_CANDIDATES_v0.9-C.md` | Candidatos a Safety Issue |
| `docs/RISK_QUALITY_TREND_v0.9-D.md` | Tendência qualitativa |
| `docs/RISK_DATA_CONFIDENCE_v0.9-E.md` | Confiança dos dados |
| `docs/RISK_PROFILE_COMMUNICATION_REVIEW_v0.9-F.md` | Revisão de comunicação |
