# RISK Safety Issue Candidates — v0.9-C

**Versão:** v0.9-C  
**Data:** 2026-05-18  
**Fase:** RISK v0.9-C  
**Status:** Entregue — helper puro, testes, API e UI.

---

## 1. Objetivo

Implementar uma primeira versão conservadora de "Safety Issue Candidates" no Risk Profile Organizacional, atendendo ao achado **F-004 (HIGH)** da auditoria metodológica RISK v0.9-A.

A tese do produto HFA/SERA é ser uma ferramenta de diagnóstico de fator humano organizacional — não apenas um classificador de eventos isolados. Para isso, o sistema precisa identificar padrões recorrentes de fatores humanos em múltiplas análises, mas sem afirmar prematuramente que são Safety Issues formais.

---

## 2. Relação com F-004 (auditoria v0.9-A)

F-004 identificava: "Sem mecanismo de Safety Issue — o sistema não distingue padrão recorrente de evento isolado."

Esta fase cria o primeiro mecanismo de agregação de sinais recorrentes, apresentados como **candidatos** com linguagem conservadora e disclaimer explícito.

---

## 3. Diferenciação conceitual

| Nível | Definição | Implementado? |
|---|---|---|
| **Evento individual** | Ocorrência única com análise SERA (P/O/A) | ✅ Fase anterior |
| **Padrão recorrente** | Combinação P/O/A aparecendo em múltiplas análises | ✅ Esta fase |
| **Safety Issue Candidate** | Sinal de recorrência que merece investigação organizacional | ✅ Esta fase |
| **Safety Issue formal** | Problema sistêmico confirmado, com contexto, exposição e barreiras avaliadas | ❌ Fase futura |
| **SIRA** | Systemic Investigation and Risk Assessment — metodologia formal de Safety Issue | ❌ Fase futura |

Safety Issue Candidates são **sinais de recorrência**, não conclusões formais. Eles orientam investigação organizacional, priorização de revisão e eventual abertura de análise SIRA. A promoção de um candidato para Safety Issue formal exige revisão humana, contexto operacional, exposição, barreiras e evidência adicional.

---

## 4. Critérios implementados

| Critério | Valor |
|---|---|
| Count mínimo | ≥ 3 ocorrências |
| Share mínimo (total ≥ 10) | ≥ 20% das análises |
| Share mínimo (total < 10) | sem exigência de share |
| Confidence (total ≥ 10) | `moderate` |
| Confidence (total < 10) | `preliminary` |
| Limite de candidatos | top 5 |
| Ordenação | count desc → share desc → id asc |
| Fontes | combinações P+O, P+A, O+A + precondições |

### Exemplo

| Cenário | total | count | share | Resultado |
|---|---|---|---|---|
| `[P-B + O-D]` em 10 análises, 3 vezes | 10 | 3 | 30% | ✅ moderate |
| `[P-B + O-D]` em 20 análises, 3 vezes | 20 | 3 | 15% | ❌ abaixo de 20% |
| `[P-B + O-D]` em 5 análises, 3 vezes | 5 | 3 | 60% | ✅ preliminary |
| `[P-B + O-D]` em 10 análises, 2 vezes | 10 | 2 | 20% | ❌ count < 3 |

---

## 5. O que não foi implementado

- SIRA formal
- Probabilidade futura de ocorrência
- Exposição operacional (horas de voo, ciclos, frequência)
- Clustering semântico avançado de relatos
- Causalidade organizacional confirmada
- Severity assessment de Safety Issue
- Safety Issue formal (requer revisão humana e contexto completo)

---

## 6. Shape do campo `safety_issue_candidates` na API

```ts
safety_issue_candidates: Array<{
  id: string                                    // e.g. "P+O:P-B:O-D"
  pattern_type: 'P+O' | 'P+A' | 'O+A' | 'precondition'
  primary_code: string                          // e.g. "P-B"
  secondary_code?: string                       // e.g. "O-D" (absent for precondition)
  label: string                                 // e.g. "P-B + O-D"
  count: number                                 // número de ocorrências
  share: number                                 // 0–1 (ex: 0.3 = 30%)
  confidence: 'preliminary' | 'moderate'
  rationale: string                             // texto descritivo
  caveat: string                                // disclaimer de não-Safety Issue formal
}>
```

O campo é sempre presente no response (array vazio se não há candidatos).

---

## 7. Arquivos criados/alterados

| Arquivo | Tipo | Mudança |
|---|---|---|
| `frontend/src/lib/sera/safety-issue-candidates.ts` | **Criado** | Helper puro |
| `tests/sera/test-safety-issue-candidates.ts` | **Criado** | 27 testes unitários |
| `frontend/src/app/api/org/intelligence/route.ts` | **Alterado** | Import + derivação de candidatos + campo no response |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | **Alterado** | Import tipo + campo na interface + componente + painel |
| `docs/RISK_SAFETY_ISSUE_CANDIDATES_v0.9-C.md` | **Criado** | Este documento |

### O que não foi alterado

- Motor SERA (`pipeline.ts`, `all-steps.ts`, `levels.json`)
- Database schema / migrations
- Fixtures e baseline (`sera-v0.1.1`)
- Score formula
- Thresholds
- ERC conversion / modal / presentation
- Matrizes (tradicional e ARMS)
- P/O/A logic
- Auth / tenant

---

## 8. Testes

```bash
npx tsx tests/sera/test-safety-issue-candidates.ts   # 27 testes, PASS
npx tsx tests/sera/test-erc-conversion.ts             # 75 testes, PASS
npx tsx tests/sera/test-erc-modal.ts                  # 10 testes, PASS
npx tsx tests/sera/test-erc-presentation.ts           # 9 testes, PASS
npx tsx tests/sera/test-erc-api-ui-contract.ts        # 38 testes, PASS
npx tsx tests/sera/analyze-risk-validation-contract.ts         # 10/10 OK
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict  # 10/10 OK
```

Typecheck: não conclusivo por `TS6053` pré-existente de infraestrutura (`node_modules`). Sem erros nos arquivos alterados nesta fase.

---

## 9. Próxima fase recomendada

**RISK v0.9-D — Tendência por qualidade**

Objetivo:
- Separar volume de análises de qualidade/severidade do risco
- Exibir tendência por HFA ERC Category e/ou por grupos P/O/A
- Evitar interpretar aumento de volume como aumento automático de risco

Ou, se o objetivo prioritário for melhorar comunicação do Índice de Cobertura:

**RISK v0.9-D — Decomposição do índice**
- Separar o índice em seus componentes (cobertura P/O/A, ações vencidas, volume)
- Eliminar o número único opaco

---

## 10. Referências

| Documento | Relevância |
|---|---|
| `docs/RISK_PROFILE_METHODOLOGY_AUDIT_v0.9-A.md` | F-004: sem mecanismo de Safety Issue |
| `frontend/src/lib/sera/safety-issue-candidates.ts` | Helper puro |
| `tests/sera/test-safety-issue-candidates.ts` | Testes unitários |
| `frontend/src/app/api/org/intelligence/route.ts` | Integração API |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | UI |
