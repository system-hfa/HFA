# RISK Data Confidence — v0.9-E

**Versão:** v0.9-E  
**Data:** 2026-05-18  
**Fase:** RISK v0.9-E  
**Status:** Entregue — helper puro, testes, API e UI.

---

## 1. Objetivo

Implementar indicadores de confiança dos dados no Risk Profile Organizacional, fechando a lacuna de comunicação de incerteza identificada na auditoria RISK v0.9-A.

O sistema precisa diferenciar claramente:
- "risco baixo" (conclusão substantiva)
- "sem dados suficientes" (limitação da base)
- "perfil em formação" (estado transitório)
- "amostra moderada / consolidada" (grau de cobertura)

Essas categorias são metodologicamente distintas e não devem ser confundidas.

---

## 2. Relação com a auditoria v0.9-A

F-008 (MEDIUM) identificava: "Sem comunicação de incerteza nas matrizes individuais e no perfil organizacional."

Esta fase cria `data_confidence`, campo que acompanha o perfil inteiro e informa o usuário sobre a robustez da base antes de interpretar qualquer resultado.

### Princípio central

> "Ausência de evidência não é evidência de ausência."

- "Não há eventos críticos registrados" ≠ "risco baixo"
- "Poucas análises" ≠ "organização segura"
- "Sem candidatos a Safety Issue" ≠ "sem Safety Issues"
- "Sem ERC válido" ≠ "baixo risco"

---

## 3. Diferença entre confiança dos dados e nível de risco

| Conceito | O que comunica | Implementado? |
|---|---|---|
| **Nível de risco** | Severidade/probabilidade observada de evento adverso | ❌ Não implementado (exige SIRA, exposição, barreiras) |
| **Índice de Cobertura Analítica** | Completude da classificação P/O/A + pendências | ✅ v0.9-B |
| **Confiança dos dados** | Robustez da base para interpretação do perfil | ✅ Esta fase |
| **Qualidade da tendência** | Distribuição ERC por mês | ✅ v0.9-D |

---

## 4. Shape do campo `data_confidence`

```ts
data_confidence: {
  level: 'insufficient' | 'limited' | 'moderate' | 'strong'
  total_analyses: number
  minimum_recommended: number          // 10 (configurável)
  valid_erc_count: number
  valid_erc_share: number              // 0–1
  has_safety_issue_candidates: boolean
  messages: string[]
  caveat: string
}
```

---

## 5. Regras de cálculo

### 5.1 Level

| Condição | Level |
|---|---|
| `total_analyses === 0` | `insufficient` |
| `total_analyses > 0` e `total_analyses < minimum_recommended` | `limited` |
| `total_analyses >= minimum_recommended` e `valid_erc_share < 0.8` | `moderate` |
| `total_analyses >= minimum_recommended` e `valid_erc_share >= 0.8` | `strong` |

"Strong" significa confiança/cobertura mais consolidada — **não** significa risco alto ou baixo.

### 5.2 valid_erc_count

Contagem de análises com `erc_level` válido após conversão legacy → HFA via `coerceMotorErcToHfaCategory`. Calculado diretamente sobre o array de analyses no servidor.

### 5.3 Mensagens

| Condição | Mensagem |
|---|---|
| `total = 0` | "Ainda não há análises suficientes para formar um perfil organizacional." |
| `total < minimum` | "Perfil em formação: recomenda-se pelo menos N análises para leitura inicial." |
| `valid_erc_share < 0.8` (com total > 0) | "Parte das análises ainda não possui ERC válido; interpretações por risco devem ser cautelosas." |
| `has_safety_issue_candidates = true` | "Candidatos a Safety Issue indicam recorrência observada e requerem revisão de contexto, exposição e barreiras." |
| `has_safety_issue_candidates = false` (com total > 0) | "Ausência de candidatos a Safety Issue não significa ausência de padrões organizacionais." |

### 5.4 Caveat (fixo)

> "Este indicador comunica confiança dos dados, não nível de risco. Baixa confiança não significa risco baixo ou alto; significa que a base ainda é limitada para conclusões organizacionais robustas."

---

## 6. O que não foi implementado

- Probabilidade operacional
- Taxa de ocorrência ajustada por exposição (horas de voo, ciclos, etc.)
- Detecção real de subnotificação (exigiria dados externos de exposição)
- Modelo estatístico de confiança de intervalo
- Safety Issue formal
- SIRA

---

## 7. Arquivos criados/alterados

| Arquivo | Tipo | Mudança |
|---|---|---|
| `frontend/src/lib/sera/data-confidence.ts` | **Criado** | Helper puro |
| `tests/sera/test-data-confidence.ts` | **Criado** | 28 testes unitários |
| `frontend/src/app/api/org/intelligence/route.ts` | **Alterado** | Import + `validErcCount` + `data_confidence` no response |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | **Alterado** | Import tipo + campo na interface + componente + painel |
| `docs/RISK_DATA_CONFIDENCE_v0.9-E.md` | **Criado** | Este documento |

### O que não foi alterado

- Motor SERA (`pipeline.ts`, `all-steps.ts`, `levels.json`)
- Database schema / migrations
- Fixtures e baseline (`sera-v0.1.1`)
- Score formula
- Safety Issue Candidates helper
- Risk Quality Trend helper
- ERC conversion / modal / presentation
- Matrizes (tradicional e ARMS)
- Todos os campos existentes no response da API

---

## 8. Testes

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

---

## 9. Próxima fase recomendada

**RISK v0.9-F — Revisão de comunicação metodológica do Risk Profile**

Objetivo:
- Harmonizar títulos, disclaimers e explicações de todos os painéis
- Garantir que cada painel comunique claramente se mostra dado observado, inferência, tendência ou candidato
- Preparar a tela para demonstração comercial / trial de 10 análises
- Revisão de copy end-to-end

---

## 10. Referências

| Documento | Relevância |
|---|---|
| `docs/RISK_PROFILE_METHODOLOGY_AUDIT_v0.9-A.md` | F-008: comunicação de incerteza insuficiente |
| `frontend/src/lib/sera/data-confidence.ts` | Helper puro |
| `tests/sera/test-data-confidence.ts` | Testes unitários |
| `frontend/src/app/api/org/intelligence/route.ts` | Integração API |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | UI |
