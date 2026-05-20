# SERA v0.1.4-A2-c — Methodology Gate Candidate JSON

## Contexto

- A1-GOV+ congelou expected P/O/A metodologico e a governanca de adaptacoes.
- A2-a inventariou schema/runner e confirmou limitacoes tecnicas atuais.
- A2-b criou isolamento candidate-only com listas e `--check-only` seguro.
- A2-c materializa apenas os gate candidates em trilha isolada.

## Escopo

- Criados 17 JSONs em `tests/sera/fixtures-candidates/methodology-gate/`.
- Nenhum JSON oficial foi criado em `tests/sera/fixtures/`.
- Nenhum baseline foi alterado.
- Nenhuma alteracao em motor SERA/pipeline/selectors.

## Schema usado

Schema aplicado por fixture:

- `id`, `title`, `domain`, `description`, `expected`, `rationale`, `discriminators`.
- `expected` com `perception_code`, `objective_code`, `action_code`, `erc_level` numerico.
- Metadata extra (`methodology_notes`, `sera_context`, `adaptation_note`) e inerte para o scorer atual.

## Politica ERC nesta fase

- `expected.erc_level` foi mantido numerico para compatibilidade tecnica do runner atual.
- Valor ERC nos candidates foi tratado como placeholder tecnico.
- Politica metodologica permanece: ERC em `ERC_REVIEW` e nao criterio central de PASS/FAIL em A1-GOV+.

## JSONs criados (17)

- `A0-VIS-003` — P-G / O-A / A-A
- `A0-VIS-005` — P-H / O-A / A-A
- `A0-AUTO-001` — P-C / O-A / A-E
- `A0-AUTO-003` — P-D / O-A / A-H
- `A0-FUEL-002` — P-G / O-A / A-A
- `A0-CONFIG-001` — P-G / O-A / A-A
- `A0-CONFIG-002` — P-G / O-A / A-A
- `A0-SEP-002` — P-G / O-A / A-A
- `A0-SEP-005` — P-G / O-A / A-A
- `A0-CHK-001` — P-G / O-A / A-A
- `A0-CHK-003` — P-G / O-A / A-G
- `A0-VIS-004-ADJ` — P-H / O-A / A-A
- `A0-AUTO-004-ADJ` — P-A / O-A / A-G
- `A0-CHK-002-ADJ` — P-D / O-A / A-H
- `A0-DAUMAS-E01-B` — P-C / O-A / A-E
- `A0-DAUMAS-E02-A` — P-A / O-C / A-F
- `A0-DAUMAS-E02-B` — P-D / O-A / A-H

## Protecoes aplicadas

- Candidate-only: somente em `fixtures-candidates/methodology-gate`.
- Sem mudanca de baseline oficial.
- Sem execucao de smoke global.
- Execucao real candidate-only continua nao habilitada.

## Validacao executada

- `JSON.parse` em todos os 17 arquivos.
- Checagem lista-vs-arquivos (`methodology-gate-fixtures.txt`).
- Checagem de chaves obrigatorias e tipo numerico de `expected.erc_level`.
- `scripts/run-sera-methodology-candidates.sh --check-only`.

## Riscos remanescentes

- Execucao real candidate-only segue bloqueada por design nesta etapa.
- Runner oficial continua sem leitura nativa de `fixtures-candidates`.
- ERC continua placeholder tecnico em candidates.
- Negativos e multi-act ainda nao materializados nesta fase.

## Proxima fase recomendada

- **A2-d**: decidir e implementar estrategia segura de execucao candidate-only (sem contaminar fixtures oficiais e baseline), mantendo gate oficial intacto.
