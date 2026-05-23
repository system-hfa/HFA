# SERA v0.1.4-A4-g - Stable Provider Freeze Rerun Plan

Status: operational/documentary plan  
Scope: definir critérios para rerun de freeze causal somente em condição de provedor estável  
Non-scope: patch de motor, mudança de expected/candidates/baseline

## A. Objetivo

- Repetir o freeze causal v0.1.4 apenas em condição operacional estável de provedor/modelo.
- Evitar que falhas de infraestrutura (timeout/terminated/retry instável) sejam interpretadas como regressão metodológica.
- Garantir que evidência de baseline causal venha de execução limpa e reproduzível.

## B. Critérios para invalidar report (NOISY_PROVIDER_RUN)

Um report deve ser marcado como `NOISY_PROVIDER_RUN` / `INFRA_UNSTABLE` se ocorrer qualquer item abaixo:

1. Qualquer `error` com `terminated`.
2. Qualquer `error` com `Request timed out`/`timeout`.
3. Qualquer run com `actual` vazio (`perception/objective/action` vazios e `erc_level=0`, padrão `///0`).
4. `causal_error > 0`.
5. `risk_layer_status=HOLD` quando causado por erro de execução (e não por mismatch real de ERC).
6. Duração anormal extrema compatível com timeout/retry preso.
7. Evidência de múltiplos retries transientes em sequência no mesmo ciclo.

Regra de governança:

- report inválido por infra não entra em decisão de baseline causal;
- report inválido por infra só serve como evidência operacional.

## C. Critérios de report elegível para baseline causal evidence

Um report só pode ser aceito como evidência metodológica de freeze causal se cumprir **todos**:

1. `causal_summary.error = 0`
2. `causal_summary.fail = 0`
3. `causal_summary.partial = 0`
4. `causal_summary.determinism_rate = 1`
5. Nenhum run com `actual` vazio
6. Nenhum run com `error`
7. Guardrail causal oficial retorna OK
8. Revisão humana confirma que eventuais sinais em risk layer não contaminam conclusão causal

## D. Comando recomendado para rerun

Executar somente os 9 candidates de admissão:

```bash
SERA_FIXTURE_LIST=tests/sera/methodology-admission-fixtures.txt \
SERA_N_RUNS=3 \
SERA_ALLOW_MULTI_RUN=1 \
scripts/run-sera-methodology-candidates.sh --run
```

Após gerar o report:

```bash
node tests/sera/analyze-sera-causal-report.js <report>
node tests/sera/assert-sera-causal-report-clean.js <report>
```

## E. Sequência operacional recomendada

1. Não iniciar rerun se houver sinais recentes de instabilidade do provedor.
2. Não iniciar rerun após sequência curta com múltiplos `terminated`.
3. Se surgir erro já no primeiro fixture, abortar o ciclo e classificar como infra instável.
4. Não abrir triagem de motor com base em report contaminado.
5. Não commitar reports em `tests/reports/candidates/`.
6. Registrar resultado somente quando o report for limpo pelos critérios de elegibilidade.

## F. Tratamento específico de A0-VIS-005

- O `O-D` observado na A4-f não foi reproduzido nos runs válidos da rodada noturna.
- `A0-VIS-005` permanece no freeze candidate set com atenção específica no eixo Objective.
- Se `O-D` reaparecer em report limpo (sem ruído infra), classificar como possível instabilidade metodológica real e bloquear freeze até triagem.

## G. Próxima fase recomendada

`A4-h - Stable Causal Freeze Rerun Execution`

Condições para executar:

- ambiente/provedor estável;
- sem sinais de ruído operacional ativo.

Saídas esperadas:

- se passar limpo: preparar artefato de baseline causal (ainda separado da trilha de risk layer);
- se falhar limpo: abrir triagem metodológica do candidate responsável, sem conflar com falha de infra.

## Referências de contexto usadas nesta fase

- `docs/SERA_A4_E_OFFICIAL_CAUSAL_SCORER_CONTRACT_v0.1.4.md`
- `docs/SERA_A4_F_CAUSAL_BASELINE_FREEZE_CANDIDATE_RUN_v0.1.4.md`
- `docs/SERA_A4_F2_NOISY_PROVIDER_RUN_STABILITY_NOTE_v0.1.4.md`
- `tests/reports/candidates/methodology-gate-run-1779509334.json`
- `tests/reports/candidates/methodology-gate-run-1779526966.json`
- `tests/reports/candidates/methodology-gate-run-1779541375.json`
