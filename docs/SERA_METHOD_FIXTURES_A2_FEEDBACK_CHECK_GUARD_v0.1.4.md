# SERA v0.1.4-A2-l — Isolated A-G Explicit Feedback/Check Guard

## Contexto

- A2-i corrigiu divergência O-C/O-D em `A0-DAUMAS-E02-A` (PASS após patch).
- A2-j corrigiu cluster P-C/A-E automação knowledge-gap (`A0-AUTO-001`, `A0-DAUMAS-E01-B`).
- A2-k corrigiu cluster P-D/A-H temporal pressure (`A0-AUTO-003`, `A0-DAUMAS-E02-B`).
- A2-l foca cluster A-G: falha de verificação/callout formal após ação crítica da própria tripulação.

## Escopo

- Dois casos-alvo: `A0-AUTO-004-ADJ` (primário) e `A0-CHK-003` (secundário).
- Eixo A (step5) → A-G via novo guard `evidenceOfExplicitFeedbackCheckFailure`.
- Eixo P e O não atacados (A0-CHK-003 P-G permanece pendente como residual).
- Sem alteração de JSON candidates, fixtures oficiais, baseline, N_RUNS=3, smoke global.

## Causa técnica identificada

### Por que o motor retornava A-B em vez de A-G

1. `evidenceOfSupervisionFailure` (Gate A-G, linha ~2770) requer 3 condições: supervisor actor + delegated action + third-party confirmation failure.
2. Nenhuma das duas fixtures-alvo envolve delegação a terceiro — o padrão é falha de verificação da **própria ação** via protocolo formal (callout FMA, cross-check pós-checklist).
3. `supervisionFailure = false` → motor não disparava Gate A-G.
4. Para A0-AUTO-004-ADJ: `evidenceOfProceduralOmission` detectava omissão de callout → Gate A-B.
5. Para A0-CHK-003: `evidenceOfProceduralOmission` detectava configuração física incompleta → Gate A-B.

## Regra implementada

### Nova função: `evidenceOfExplicitFeedbackCheckFailure`

Localização: `frontend/src/lib/sera/all-steps.ts`, após `evidenceOfSupervisionFailure`.

Requer combinação de dois blocos:

**Bloco 1 — protocolo formal de verificação esperado e disponível:**
- `'confirmacao do modo ativo no fma'`
- `'modo ativo no fma'`
- `'callout ou confirmacao do modo'`
- `'verificacao adicional esperada e disponivel'`
- `'cross-check de indicacao'`
- `'verificacao adicional esperada'`

**Bloco 2 — verificação/callout não executado:**
- `'nao realizou callout'`
- `'confirmacao nao foi efetivada'`

Retorna `true` somente quando **ambos os blocos** têm pelo menos um match.

**Não dispara para:**
- Supervisão/delegação a terceiro (coberto por `evidenceOfSupervisionFailure`)
- Omissão procedural genérica sem protocolo formal de verificação explícito
- Checklist interrompido (A-H)
- Knowledge gap (A-E)
- Monitoramento genérico sem callout/cross-check formal (A-C)
- Fixtures de manutenção/organização (A-G via `maintenanceOmission`)

### Step 5 — Gate A-G expandido

Adicionado `feedbackCheckFailure` à condição existente:

```typescript
const feedbackCheckFailure = evidenceOfExplicitFeedbackCheckFailure(relatoNorm)
// ...
if (supervisionFailure || maintenanceOmission || feedbackCheckFailure) {
  → A-G (determinístico)
}
```

A mesma variável é usada no `remapOrganizationalActionIfInvalidAd` para consistência.

## Arquivos alterados

- `frontend/src/lib/sera/all-steps.ts`
- `docs/SERA_METHOD_FIXTURES_A2_FEEDBACK_CHECK_GUARD_v0.1.4.md`

`pipeline.ts` não foi alterado.

## Validações executadas

### 1) Typecheck

- Comando: `cd frontend && node_modules/.bin/tsc --noEmit`
- Resultado: **PASS** (sem erros).

### 2) Candidate-only N_RUNS=1

- Comando: `SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run`
- Report: `tests/reports/candidates/methodology-gate-run-1779331177.json`
- Summary:
  - `total_fixtures=13`
  - `PASS=5`
  - `PARTIAL=8`
  - `FAIL=0`
  - `ERROR=0`
  - `determinism_rate=1`

### 3) Regressões seletivas oficiais

| Fixture | Resultado |
|---|---|
| `TEST-A-G-001` | PASS 1/1 |
| `TEST-GEN-AG-001` | PASS 1/1 |
| `TEST-A-G-002` | PARTIAL 1/1 (P-G vs P-A — pré-existente, não introduzido por A2-l) |
| `TEST-A-B-001` | PASS 1/1 |
| `TEST-A-C-001` | PASS 1/1 |
| `TEST-A-C-002` | PASS 1/1 |

Sem regressões introduzidas por A2-l.

**Nota TEST-A-G-002**: PARTIAL por P-G vs P-A no eixo percepção. A função `evidenceOfExplicitFeedbackCheckFailure` não contém termos presentes na descrição desse fixture. A divergência P-G é pré-existente e decorre do motor LLM em step3 — não está no escopo de A2-l.

## Resultado nos casos-alvo

| Fixture | Expected | Actual antes | Actual depois | Overall |
|---|---|---|---|---|
| A0-AUTO-004-ADJ | P-A/O-A/A-G/2 | P-A/O-A/A-B | P-A/O-A/A-G/3 | **PARTIAL** (P/O/A corretos; ERC LLM-variável) |
| A0-CHK-003 | P-G/O-A/A-G/? | P-A/O-A/A-B | P-A/O-A/A-G/3 | **PARTIAL** (A-G correto; P-G pendente — fora de escopo A2-l) |

### Preservação de patches anteriores

| Fixture | A2-i/j/k | A2-l |
|---|---|---|
| A0-DAUMAS-E02-A | PASS (O-C) | PASS (sem regressão) |
| A0-AUTO-001 | PASS (P-C/A-E) | PASS (sem regressão) |
| A0-DAUMAS-E01-B | PASS (P-C/A-E) | PASS (sem regressão) |
| A0-AUTO-003 | PASS (P-D/A-H) | PASS (sem regressão) |
| A0-DAUMAS-E02-B | PASS (P-D/A-H) | PASS (sem regressão) |

## Riscos remanescentes

- `'verificacao adicional esperada'` é relativamente específico mas poderia aparecer em cenários com awareness explícito. Bloco 2 requer `'nao realizou callout'` ou `'confirmacao nao foi efetivada'` — guard conservador mitiga falso positivo.
- A0-AUTO-004-ADJ: ERC=3 vs esperado=2 é variância LLM (erc_policy: ERC_REVIEW). Não é critério em A1-GOV+.
- A0-CHK-003: P-G pendente (motor retorna P-A). Step3 não atacado em A2-l.
- TEST-A-G-002: P-G pré-existente em step3. Não introduzido por A2-l.
- Clusters P-H e A-G pós-checklist (P axis) não atacados.
- N_RUNS=3 permanece bloqueado.

## Próxima fase recomendada

- **A2-m**: triagem do cluster P-G pós-checklist (`A0-CHK-003`) ou P-H (`A0-VIS-004-ADJ`, `A0-VIS-005`).
- Alternativamente, consolidar com N_RUNS=3 nos 5 casos PASS antes de tentar novos clusters.
- `N_RUNS=3` bloqueado até nova decisão formal.
