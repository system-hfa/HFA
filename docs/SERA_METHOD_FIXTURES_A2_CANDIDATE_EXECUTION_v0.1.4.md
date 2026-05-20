# SERA v0.1.4-A2-d — Candidate-only Execution Harness

## Contexto

- A2-b criou isolamento candidate-only (`fixtures-candidates`, listas e check-only).
- A2-c materializou 17 JSONs da trilha `methodology-gate`.
- A2-d habilita execucao candidate-only segura sem tocar fixtures oficiais.

## Escopo

- Somente trilha `methodology-gate`.
- Execucao via copia temporaria fora do repo.
- Sem alteracao de `tests/sera/fixtures/*.json` oficiais.
- Sem baseline.
- Sem smoke global.

## Estrategia tecnica

- O harness usa diretorio temporario em `/tmp`.
- O repo e copiado para a area temporaria (com exclusoes de paths pesados/gerados).
- Na copia temporaria, `tests/sera/fixtures` e substituido apenas pelos candidates da lista.
- O runner oficial (`tests/sera/run.ts`) roda somente nessa copia.
- O report gerado e copiado para `tests/reports/candidates/` no repo real.
- O repo real nao recebe candidates em fixtures oficiais.

## Comandos

```bash
scripts/run-sera-methodology-candidates.sh --check-only
scripts/run-sera-methodology-candidates.sh --run
SERA_N_RUNS=1 scripts/run-sera-methodology-candidates.sh --run
```

## Politica N_RUNS

- Default: `SERA_N_RUNS=1`.
- `SERA_N_RUNS>1` e bloqueado por padrao.
- Para liberar explicitamente: `SERA_ALLOW_MULTI_RUN=1`.
- Bateria noturna/global nao faz parte desta fase.

## Politica ERC

- `expected.erc_level` numerico permanece placeholder tecnico de compatibilidade.
- ERC ainda nao e contrato metodologico principal nesta fase.
- Divergencia ERC deve ser interpretada com cautela, dado o status de placeholder.

## Riscos remanescentes

- Runner oficial ainda nao possui directory override nativo.
- Negativos e multi-act seguem fora deste harness.
- `accepted_alternative` nao e suportado no scorer atual.
- `pass_rate` pode falhar por impacto de ERC placeholder.
- Este harness nao substitui baseline oficial.

## Proxima fase

- **A2-e**: executar/triar resultados dos candidates em `N_RUNS=1` e analisar divergencias.
- `N_RUNS=3` (noturno) somente apos triagem controlada de `N_RUNS=1`.
