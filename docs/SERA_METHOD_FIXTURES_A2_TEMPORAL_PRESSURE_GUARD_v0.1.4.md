# SERA v0.1.4-A2-k — Isolated Temporal Pressure / Time-Management Guard

## Contexto

- A2-i corrigiu divergência O-C/O-D em `A0-DAUMAS-E02-A` (PASS após patch).
- A2-j corrigiu cluster P-C/A-E automação knowledge-gap (`A0-AUTO-001`, `A0-DAUMAS-E01-B`).
- A2-k foca cluster P-D/A-H: demanda temporal com atenção capturada por tarefa de proximidade operacional.

## Escopo

- Dois casos-alvo: `A0-AUTO-003` e `A0-DAUMAS-E02-B`.
- Eixo P (step3) → P-D e eixo A (step5) → A-H.
- `A0-CHK-002-ADJ` observado mas não usado como guia do patch (`MOVE_TO_EXPLORATORY` recomendado).
- Sem A-G, sem P-H, sem A-A/A-B, sem N_RUNS=3, sem smoke global.

## Causa técnica identificada

### Por que o motor caia em P-A / P-G em vez de P-D

1. `evidenceOfAttentionOverload` (linha ~988) checa `evidenceOfExplicitHighDemandOperationalContext`, que reconhece apenas padrões ATC/multi-aeronave: `'alta demanda'`, `'pico de trafego'`, `'trafego intenso'`, `'multiplas aeronaves'`, etc.
2. Nenhum desses termos aparece nas descriptions de A0-AUTO-003 e A0-DAUMAS-E02-B.
3. `evidenceOfOperationalCommunicationPressure` também não dispara (sem comunicação/frequência de rádio).
4. Todos os gates determinísticos de step3 são falsos → motor cai nos nós LLM.
5. LLM classifica P-A por "não vejo falha perceptiva explícita" — o texto descreve a situação, não nomeia a falha de atenção.

### Por que o motor caia em A-C / A-A em vez de A-H

1. `evidenceOfTemporalExecutionFailure` (linha ~1114) reconhece apenas interrupção de checklist/sequência: `'checklist interrompido'`, `'nao concluiu checklist'`, `'gerenciamento temporal da execucao'`, etc.
2. O padrão de "velocidade continuou caindo enquanto atenção capturada por proximidade de plataforma" não estava mapeado.
3. Gate A-H (linha ~2814) usa exclusivamente `temporalExecutionFailure` → não disparava.
4. Motor caía nos nós LLM e retornava A-A ou A-C.

## Regra implementada

### Nova função: `evidenceOfSpeedManagementAttentionCapture`

Localização: `frontend/src/lib/sera/all-steps.ts`, após `evidenceOfTimePressure`.

Requer combinação de dois blocos:

**Bloco 1 — parâmetro crítico degradando abaixo de limite seguro:**
- `'velocidade continuou caindo'`
- `'velocidade foi reduzida em voo manual abaixo da faixa segura'`
- `'abaixo da faixa segura'`
- `'ias continuou caindo'`
- `'airspeed continued decreasing'`
- `'below safe range'`

**Bloco 2 — atenção capturada por tarefa de proximidade operacional:**
- `'atencao da tripulacao estava capturada'`
- `'atencao capturada pela proximidade'`
- `'capturada pela proximidade da plataforma'`
- `'proximidade da plataforma'`
- `'necessidade de manter referencia visual'`
- `'sobrevoo de plataforma'`

Retorna `true` somente quando **ambos os blocos** têm pelo menos um match. Guard conservador: exige combinação de sinais.

**Não dispara para:**
- Qualquer monitoramento genérico sem proximidade/captura
- Qualquer emergência sem degradação de velocidade
- Awareness consciente de regra (O-C/O-D, não P-D)
- Checklist omitido (P-E ou P-G)
- Alta carga ATC sem velocidade degradando

### Step 3 — Gate P-D

Inserido imediatamente antes do Gate P-G preemptivo:

```typescript
if (evidenceOfSpeedManagementAttentionCapture(relatoNorm)) {
  → P-D (determinístico)
}
```

### Step 5 — Gate A-H

Guard adicionado à condição existente do Gate A-H:

```typescript
if (temporalExecutionFailure || evidenceOfSpeedManagementAttentionCapture(relatoNorm)) {
  → A-H (determinístico)
}
```

A mesma função serve P-D e A-H: captura exatamente o padrão de falha de gerenciamento temporal do parâmetro crítico durante execução de tarefa com atenção capturada.

## Arquivos alterados

- `frontend/src/lib/sera/all-steps.ts`
- `docs/SERA_METHOD_FIXTURES_A2_TEMPORAL_PRESSURE_GUARD_v0.1.4.md`

`pipeline.ts` não foi alterado.

## Validações executadas

### 1) Typecheck

- Comando: `cd frontend && node_modules/.bin/tsc --noEmit`
- Resultado: **PASS** (sem erros).

### 2) Candidate-only N_RUNS=1

- Comando: `SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run`
- Report: `tests/reports/candidates/methodology-gate-run-1779328628.json`
- Summary:
  - `total_fixtures=13`
  - `PASS=4`
  - `PARTIAL=9`
  - `FAIL=0`
  - `ERROR=0`
  - `determinism_rate=1`

### 3) Regressões seletivas oficiais

| Fixture | Resultado |
|---|---|
| `TEST-A-H` | PASS 1/1 |
| `TEST-A-C` | PASS 2/2 |
| `TEST-A-B` | PASS 1/1 |
| `TEST-P-D-001` | PASS 1/1 |
| `TEST-A-I-001` | PASS 1/1 |
| `TEST-A-I-002` | PASS 1/1 |
| `TEST-GEN-AI-001` | PASS 1/1 |
| `TEST-GEN-AI-002` | PASS 1/1 |

Sem regressões.

## Resultado nos casos-alvo

| Fixture | Expected | Actual antes | Actual depois | Overall |
|---|---|---|---|---|
| A0-AUTO-003 | P-D/O-A/A-H/2 | P-A/O-A/A-A | P-D/O-A/A-H/2 | **PASS** |
| A0-DAUMAS-E02-B | P-D/O-A/A-H/2 | P-A/O-A/A-C | P-D/O-A/A-H/3 | **PARTIAL** (P/O/A corretos; ERC LLM-variável) |

### Preservação de patches anteriores

| Fixture | A2-i/j | A2-k |
|---|---|---|
| A0-DAUMAS-E02-A | PASS (O-C) | PASS (sem regressão) |
| A0-AUTO-001 | PASS (P-C/A-E) | PASS (sem regressão) |
| A0-DAUMAS-E01-B | PASS (P-C/A-E) | PASS (sem regressão) |

## Riscos remanescentes

- `'abaixo da faixa segura'` é relativamente específico mas poderia aparecer em cenários de aproximação com consciência explícita (O-C). Guard requer segundo bloco (proximidade/captura), o que mitiga.
- A0-DAUMAS-E02-B: ERC=3 vs esperado=2 é variância LLM (erc_policy: ERC_REVIEW). Não é critério em A1-GOV+.
- A0-CHK-002-ADJ continua PARTIAL: `'abaixo da faixa segura'` não aparece no texto; "continuou perdendo velocidade e altura" não triggera `evidenceOfSpeedManagementAttentionCapture`. Status MOVE_TO_EXPLORATORY mantido.
- Clusters A-G e P-H não atacados.
- N_RUNS=3 permanece bloqueado.

## Próxima fase recomendada

- **A2-l**: triagem do cluster A-G (`A0-AUTO-004-ADJ`) ou revisão de expected de `A0-CHK-002-ADJ`.
- Alternativamente, consolidar com N_RUNS=1 nos 4 casos PASS antes de tentar novos clusters.
- `N_RUNS=3` bloqueado até nova decisão formal.
