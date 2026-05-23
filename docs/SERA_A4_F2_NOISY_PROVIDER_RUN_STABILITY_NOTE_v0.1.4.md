# SERA v0.1.4-A4-f2 - Noisy Provider Run Stability Note

Status: documentation note (non-methodological decision)  
Scope: registrar instabilidade operacional de provedor/modelo em rodada noturna  
Non-scope: patch de motor, mudança de expected, promoção de baseline

## 1. Escopo

Esta nota documenta uma rodada noturna com sinais de instabilidade de infraestrutura/provedor, para evitar uso indevido desses resultados como evidência metodológica de baseline causal.

Classificação desta rodada:

- `NOISY_PROVIDER_RUN`
- `INFRA_UNSTABLE`

## 2. Reports analisados

- `tests/reports/candidates/methodology-gate-run-1779526966.json` (targeted stress A0-VIS-005, N_RUNS=9)
- `tests/reports/candidates/methodology-gate-run-1779541375.json` (full admission recheck, 9 candidates x 3 runs)

## 3. Sintomas de instabilidade observados

### 3.1 Targeted stress A0-VIS-005 (N_RUNS=9)

- 4 runs válidos com `P-H/O-A/A-A/3` (`PASS`).
- 5 runs com falha operacional `terminated/timeout` e `actual` vazio (`///0`).
- `causal_error=5`.

Conclusão operacional:

- a execução não é um stress metodológico válido;
- o ruído de execução domina o resultado.

### 3.2 Full admission recheck (9 x 3)

- total_runs: 27
- legacy: pass=21, partial=3, fail=3, error=3
- causal: pass=24, partial=0, fail=0, error=3
- causal_determinism_rate=0.7777777777777778
- risk mismatch em `A0-AUTO-003`, `A0-DAUMAS-E02-A`, `A0-VIS-003`
- erros operacionais (`terminated/timeout`) em `A0-AUTO-001` e `A0-AUTO-003`
- `A0-VIS-005` passou 3/3 com `P-H/O-A/A-A/3`

Conclusão operacional:

- presença simultânea de `error`, `fail` e queda de determinismo indica contaminação operacional;
- não há base para interpretação metodológica de regressão causal.

## 4. Por que esses reports não podem ser usados como baseline evidence

1. Há falhas de execução do provedor/modelo (`terminated/timeout`) afetando diretamente os outputs.
2. O volume de erro operacional invalida a comparação metodológica entre runs.
3. Determinismo causal abaixo de 1.0 nesta condição reflete ruído operacional, não necessariamente instabilidade de regra causal.
4. A rodada mistura comportamento metodológico e indisponibilidade operacional, quebrando o critério de evidência limpa para freeze.

## 5. Achado específico sobre A0-VIS-005

- O `O-D` observado em execução anterior (A4-f) **não foi reproduzido nos runs válidos** desta rodada noturna.
- Nos runs válidos, `A0-VIS-005` permaneceu em `P-H/O-A/A-A/3`.
- Portanto, não há evidência nova para decisão metodológica de ajuste em `expected` ou motor.

## 6. Recomendação

Repetir o freeze candidate causal em janela/provedor estável, com execução limpa (sem `terminated/timeout`) e aplicar guardrail causal somente sobre report operacionalmente saudável.

## 7. Declaração de não-ação metodológica

Nesta fase A4-f2:

- não houve decisão metodológica nova;
- não houve patch de motor;
- não houve alteração de `expected`;
- não houve promoção de baseline;
- não houve validação de risk layer como baseline;
- reports permanecem como artefatos de diagnóstico operacional e não devem ser commitados.
