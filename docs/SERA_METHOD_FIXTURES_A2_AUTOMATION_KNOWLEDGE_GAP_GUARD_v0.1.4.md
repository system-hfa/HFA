# SERA v0.1.4-A2-j — Isolated Automation Knowledge-Gap Guard

## Contexto

- A2-i corrigiu a divergência O-C/O-D em `A0-DAUMAS-E02-A` (PASS após patch).
- Clusters P-C/A-E e P-D/A-H permaneciam pendentes.
- Esta fase aplica patch mínimo e isolado no cluster P-C/A-E (automação / knowledge gap).
- P-D/A-H e A-G ficam fora do escopo desta fase.

## Escopo

- Dois casos-alvo: `A0-AUTO-001` e `A0-DAUMAS-E01-B`.
- Eixo P (step3) e eixo A (step5) corrigidos pelo mesmo guard.
- Sem alteração de JSON candidates, fixtures oficiais, baseline ou smoke global.
- Sem `N_RUNS=3`.

## Causa técnica identificada

1. `evidenceOfKnowledgeDeficit` é usada em step3 (gate P-C, linha 1778) e step5 (gate A-E, linha 2719).
2. A função verificava termos como `'desconhecia'`, `'falta de conhecimento'`, `'sem treinamento'`, etc.
3. As descriptions dos dois casos de automação acoplada não continham nenhum desses termos — o gap de conhecimento estava codificado como estado da aeronave, não como descrição explícita de lacuna.
4. `technicalKnowledgeDeficit = false` → step3 caia no LLM → P-A; step5 caia no LLM → A-C.

## Causa raiz por fixture

### A0-AUTO-001

- Description: `"o diretor de voo/autopilot permanecia acoplado a modo anterior"`
- Nenhum termo de knowledge deficit explícito → gate P-C não disparava → P-A (motor).
- Gate A-E também não disparava → motor escolhia A-C via LLM.
- Expected: P-C/O-A/A-E. Actual anterior: P-A/O-A/A-C.

### A0-DAUMAS-E01-B

- Description: `"a automacao permanecia acoplada"` + `"instrutor esclareceu"`
- Nenhum termo de knowledge deficit explícito → gate P-C disparava corretamente (P-C preservado).
- Gate A-E não disparava → motor escolhia A-C via LLM.
- Expected: P-C/O-A/A-E. Actual anterior: P-C/O-A/A-C.

## Regra implementada

Adicionados dois termos a `evidenceOfKnowledgeDeficit` em `all-steps.ts`:

- `'acoplado a modo anterior'` — cobre A0-AUTO-001 (FD/autopilot acoplado a modo anterior).
- `'automacao permanecia acoplada'` — cobre A0-DAUMAS-E01-B (automação acoplada descoberta via instructor).

Ambos os termos são precisos e específicos ao cenário de knowledge gap de automação acoplada. Não há risco de falso positivo em fixtures existentes.

## Arquivos alterados

- `frontend/src/lib/sera/all-steps.ts`
- `docs/SERA_METHOD_FIXTURES_A2_AUTOMATION_KNOWLEDGE_GAP_GUARD_v0.1.4.md`

## Validações executadas

### 1) Typecheck

- Comando: `cd frontend && node_modules/.bin/tsc --noEmit`
- Resultado: **PASS** (sem erros).

### 2) Candidate-only N_RUNS=1

- Comando: `SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run`
- Report: `tests/reports/candidates/methodology-gate-run-1779326748.json`
- Summary:
  - `total_fixtures=13`
  - `PASS=2`
  - `PARTIAL=11`
  - `FAIL=0`
  - `ERROR=0`
  - `determinism_rate=1`

### 3) Regressões seletivas oficiais

- `TEST-A-E` → PASS (1/1)
- `TEST-A-C` → PASS (2/2)
- `TEST-A-B` → PASS (1/1)

### 4) Verificação A0-DAUMAS-E02-A

- Actual: P-A/O-C/A-F (todos corretos). Overall PARTIAL por ERC=1 vs expected=2.
- ERC é LLM-variável; `erc_policy: ERC_REVIEW`; não é critério P/O/A.
- O patch A2-j não contém termos presentes na description de E02-A (`acoplado a modo anterior`, `automacao permanecia acoplada`).
- Nenhuma regressão causada pelo patch.

## Resultado nos casos-alvo

| Fixture | Expected | Actual antes | Actual depois | Overall |
|---|---|---|---|---|
| A0-AUTO-001 | P-C/O-A/A-E/2 | P-A/O-A/A-C/3 | P-C/O-A/A-E/2 | **PASS** |
| A0-DAUMAS-E01-B | P-C/O-A/A-E/2 | P-C/O-A/A-C/2 | P-C/O-A/A-E/2 | **PASS** |

## Riscos remanescentes

- Termos adicionados são muito específicos; risco de falso positivo avaliado como baixo.
- Clusters P-D/A-H e A-G não atacados nesta fase.
- `N_RUNS=3` permanece bloqueado.

## Próxima fase recomendada

- **A2-k**: triagem do cluster P-D/A-H (`A0-AUTO-003`, `A0-DAUMAS-E02-B`, `A0-CHK-002-ADJ`) com regressão seletiva antes de patch.
- `N_RUNS=3` permanece bloqueado até nova decisão formal.
