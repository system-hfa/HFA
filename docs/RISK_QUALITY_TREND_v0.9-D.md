# RISK Quality Trend — v0.9-D

**Versão:** v0.9-D  
**Data:** 2026-05-18  
**Fase:** RISK v0.9-D  
**Status:** Entregue — helper puro, testes, API e UI.

---

## 1. Objetivo

Separar volume de análises de qualidade/severidade observada no Risk Profile Organizacional, atendendo ao achado **F-003 (HIGH)** da auditoria metodológica RISK v0.9-A.

Hoje o gráfico de tendência mostra apenas volume mensal de eventos/análises. Isso é metodologicamente frágil: aumento de volume pode significar maior uso da ferramenta, melhor cultura de reporte, ou simplesmente mais eventos — não necessariamente mais risco. Esta fase adiciona uma segunda leitura qualitativa baseada na distribuição de HFA ERC Category por mês.

---

## 2. Relação com F-003 (auditoria v0.9-A)

F-003 identificava: "A tendência atual mostra apenas volume mensal. Volume crescente pode ser confundido com risco crescente, e decrescente com melhoria — sem ajuste por reporte, exposição ou qualidade."

Esta fase cria `quality_trend`, campo separado de `trend`, para dar uma leitura qualitativa da composição das análises por mês.

---

## 3. Diferenciação conceitual

| Conceito | Definição | Implementado? |
|---|---|---|
| **Volume de análises** | Quantidade de eventos/análises por período | ✅ Campo `trend` (pré-existente) |
| **Tendência qualitativa observada** | Distribuição de HFA ERC Category por mês | ✅ Esta fase (`quality_trend`) |
| **Risco futuro** | Probabilidade de evento adverso em período futuro | ❌ Fase futura |
| **Exposição operacional** | Horas de voo, ciclos, turnos, taxa por exposição | ❌ Fase futura |

**Volume ≠ qualidade.** Um mês com 10 análises todas com HFA ERC 1 (aceitável) tem menor percentual crítico/alto do que um mês com 2 análises ambas HFA ERC 5 (crítico).

---

## 4. Shape do novo campo `quality_trend`

```ts
quality_trend: Array<{
  month: string                          // "YYYY-MM"
  total: number                          // análises com ERC válido no mês
  hfa_erc: {
    c1: number                           // HFA 1 (aceitável)
    c2: number
    c3: number                           // HFA 3 (moderado)
    c4: number
    c5: number                           // HFA 5 (crítico)
  }
  dominant_hfa_erc_category: 1 | 2 | 3 | 4 | 5 | null
  critical_or_high_count: number         // c4 + c5
  critical_or_high_share: number         // 0–1
}>
```

O campo é sempre presente no response (array vazio se não há dados com ERC válido).

---

## 5. Regras de cálculo

| Regra | Detalhe |
|---|---|
| Agrupamento | `YYYY-MM` extraído de `analyses.created_at` (ISO string) |
| Conversão ERC | Legacy motor (1=crítico) → HFA Category via `coerceMotorErcToHfaCategory` |
| Inválidos | `null`, strings, floats, fora de {1..5} → ignorados; análise não entra no mês |
| `created_at` inválido | `null`, vazio, sem prefixo `YYYY-MM` → análise ignorada |
| Dominante | Moda da categoria HFA no mês; empate → categoria mais alta (conservador) |
| `critical_or_high_count` | `c4 + c5` (HFA 4 e 5 = Alto e Crítico) |
| `critical_or_high_share` | `(c4 + c5) / total` se total > 0; caso contrário 0 |
| Ordenação | Meses em ordem ascendente (`YYYY-MM` string sort) |

---

## 6. O que não foi implementado

- Taxa por exposição operacional (horas de voo, ciclos, etc.)
- Forecast ou previsão de tendência futura
- Inferência estatística robusta (tendência linear, regressão, etc.)
- Ajuste por cultura de reporte (subnotificação)
- Safety Issue formal
- SIRA

---

## 7. Arquivos criados/alterados

| Arquivo | Tipo | Mudança |
|---|---|---|
| `frontend/src/lib/sera/risk-quality-trend.ts` | **Criado** | Helper puro |
| `tests/sera/test-risk-quality-trend.ts` | **Criado** | 32 testes unitários |
| `frontend/src/app/api/org/intelligence/route.ts` | **Alterado** | Import + `buildRiskQualityTrend` + campo `quality_trend` no response |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | **Alterado** | Import tipo + campo na interface + componente + painel "Tendência qualitativa observada" |
| `docs/RISK_QUALITY_TREND_v0.9-D.md` | **Criado** | Este documento |

### O que não foi alterado

- Motor SERA (`pipeline.ts`, `all-steps.ts`, `levels.json`)
- Database schema / migrations
- Fixtures e baseline (`sera-v0.1.1`)
- Score formula
- Safety Issue Candidates helper
- ERC conversion / modal / presentation
- Matrizes (tradicional e ARMS)
- Campo `trend` (volume mensal pré-existente)

---

## 8. Testes

```bash
npx tsx tests/sera/test-risk-quality-trend.ts       # 32 testes, PASS
npx tsx tests/sera/test-safety-issue-candidates.ts  # 27 testes, PASS
npx tsx tests/sera/test-erc-conversion.ts           # 75 testes, PASS
npx tsx tests/sera/test-erc-modal.ts                # 10 testes, PASS
npx tsx tests/sera/test-erc-presentation.ts         # 9 testes, PASS
npx tsx tests/sera/test-erc-api-ui-contract.ts      # 38 testes, PASS
npx tsx tests/sera/analyze-risk-validation-contract.ts         # 10/10 OK
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict  # 10/10 OK
```

Typecheck: não conclusivo por `TS6053` pré-existente de infraestrutura (`node_modules`). Sem erros nos arquivos alterados nesta fase.

---

## 9. Texto de disclaimer na UI

> "Distribuição mensal por categoria HFA ERC. Não ajustada por exposição operacional — volume maior pode refletir maior reporte ou uso da ferramenta, não necessariamente aumento de risco."

Rodapé do painel:

> "Esta tendência não estima probabilidade operacional. Descreve a composição qualitativa das análises por mês. Considere amostra, reporte, exposição e qualidade dos relatos."

---

## 10. Próxima fase recomendada

**RISK v0.9-E — Indicadores de confiança dos dados**

Objetivo:
- Comunicar amostra mínima e seu impacto na confiabilidade do perfil
- Qualidade/completude dos relatos
- Risco de subnotificação (ausência de dados ≠ risco baixo)
- Nível de confiança do perfil organizacional
- Diferenciar "sem dados" de "risco baixo"

---

## 11. Referências

| Documento | Relevância |
|---|---|
| `docs/RISK_PROFILE_METHODOLOGY_AUDIT_v0.9-A.md` | F-003: tendência mostra volume, não qualidade |
| `frontend/src/lib/sera/risk-quality-trend.ts` | Helper puro |
| `tests/sera/test-risk-quality-trend.ts` | Testes unitários |
| `frontend/src/app/api/org/intelligence/route.ts` | Integração API |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | UI |
