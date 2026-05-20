# SERA v0.1.4-A2-b — Candidate Fixture Isolation

## Contexto

A fase A1-GOV+ congelou as decisões metodológicas para fixtures SERA.

A fase A2-a inventariou o schema e o comportamento do runner atual e confirmou:

- o runner oficial carrega apenas `tests/sera/fixtures/*.json`;
- `erc_level` numérico é obrigatório para score atual;
- `ERC_REVIEW`, `erc_level=null`, `accepted_alternative`, negativos nativos e multi-act não são suportados no scorer atual;
- campos extras são tolerados por parsing, mas ignorados no score principal.

Portanto, candidates metodológicos precisam ficar isolados da trilha oficial.

## Escopo desta fase

Esta fase implementa apenas infraestrutura de isolamento técnico.

- nenhum JSON metodológico foi criado;
- nenhum runner TypeScript foi alterado;
- nenhuma fixture oficial foi alterada;
- nenhum baseline foi alterado.

## Arquivos e diretórios criados

- `tests/sera/fixtures-candidates/` e subtrilhas;
- listas TXT de planejamento:
  - `tests/sera/methodology-gate-fixtures.txt`
  - `tests/sera/methodology-exploratory-fixtures.txt`
  - `tests/sera/methodology-negative-fixtures.txt`
  - `tests/sera/methodology-multiact-fixtures.txt`
- script:
  - `scripts/run-sera-methodology-candidates.sh`
- este documento:
  - `docs/SERA_METHOD_FIXTURES_A2_CANDIDATE_ISOLATION_v0.1.4.md`

## Trilhas de candidates

- `methodology-gate`
- `methodology-exploratory`
- `methodology-negative`
- `methodology-multiact`

## Contrato das listas

As listas definem IDs planejados por trilha e podem existir antes dos JSONs.

- Elas são fonte de planejamento e organização metodológica.
- Elas não representam execução oficial do runner nesta fase.
- Elas não alteram baseline e não substituem fixtures oficiais.

## Script de candidates

Script: `scripts/run-sera-methodology-candidates.sh`

Objetivo nesta fase:

- validar infraestrutura e listas;
- permitir checagem segura sem executar runner oficial.

Modo obrigatório para A2-b:

- `--check-only`

Comportamento de `--check-only`:

- valida lista, candidate root e track;
- imprime IDs e contagens;
- informa quantos JSONs existem hoje;
- não chama `tests/sera/run.ts`;
- finaliza com `status: OK` quando a infraestrutura está íntegra.

Execução real fora do `--check-only`:

- permanece bloqueada nesta fase por decisão metodológica;
- não copia candidates para `tests/sera/fixtures`;
- retorna código `2` com mensagem clara de que a execução será habilitada em fase posterior.

## Proteções aplicadas

- não contaminar baseline oficial;
- não tocar `tests/sera/fixtures/*.json` oficiais;
- não rodar smoke global;
- não mexer no motor SERA, pipeline ou selectors;
- não criar JSONs de candidates nesta fase.

## Próxima fase recomendada

**SERA v0.1.4-A2-c — Materialize methodology gate fixtures**

Escopo sugerido para A2-c:

- criar apenas JSONs da trilha `methodology-gate`;
- validar JSON estruturalmente;
- definir estratégia segura de execução real candidate-only;
- manter `erc_level` numérico enquanto o runner atual exigir.

## Riscos remanescentes

- execução real candidate-only ainda não implementada;
- negativos e multi-act continuam sem suporte nativo no scorer atual;
- `ERC_REVIEW`/`null` continuam sem suporte no score;
- `accepted_alternative` continua sem suporte no score;
- candidates não devem ser promovidos para baseline nesta etapa.
