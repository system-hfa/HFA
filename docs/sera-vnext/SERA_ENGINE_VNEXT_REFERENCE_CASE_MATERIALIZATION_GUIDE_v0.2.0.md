# SERA Engine vNext Reference Case Materialization Guide v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-52 — Reference Case Materialization Guide

## Objetivo
Definir o fluxo controlado para materialização de reference cases no SERA vNext sem promoção automática para consenso, sem abertura downstream e sem claim de validação científica.

## Diferença entre níveis de maturidade do caso
- `skeleton`: estrutura inicial com placeholders (`DRAFT_CASE_SKELETON`).
- `materialized draft`: caso preenchido com conteúdo factual sintético ou real tratado, ainda sem consenso (`MATERIALIZED_DRAFT`).
- `reviewed case`: caso com conteúdo revisável completo e pronto para ciclo formal de revisão (`REVIEW_READY` / `UNDER_REVIEW`).
- `consensus reference`: caso promovido após processo formal com 2+ avaliadores independentes (`CONSENSUS_CANDIDATE` -> `CONSENSUS_VALIDATED`).

## Estados permitidos
- `DRAFT_CASE_SKELETON`
- `MATERIALIZED_DRAFT`
- `REVIEW_READY`
- `UNDER_REVIEW`
- `CONSENSUS_CANDIDATE`
- `CONSENSUS_VALIDATED`
- `REJECTED_OR_DEFERRED`

## Regras mandatórias
- Nenhum caso pode virar `CONSENSUS_VALIDATED` sem 2+ avaliadores independentes.
- Caso materializado não é consenso.
- Caso adversarial executável não é consenso.
- `CONSENSUS_VALIDATED` não pode ser usado para abrir downstream, promover `selectedCode` para `CLASSIFIED`, gerar `finalConclusion`, HFACS, Risk/ERC ou recommendations.

## Requisitos mínimos para `MATERIALIZED_DRAFT`
- `factualSummary` completo.
- `unsafeState` definido.
- `unsafeActCondition` definido.
- `directActor` definido.
- `proposed P/O/A`, se houver.
- `evidenceRefs` listadas.
- `acceptedUncertainty` declarada.
- `rejectedAlternatives` registradas.
- `expectedLocks` explícitos.

## Requisitos para `REVIEW_READY`
- Evidência suficiente para revisão humana.
- Status de incerteza declarado de forma explícita.
- Nenhuma violação da decisão canônica A-A/A-C.
- `O-E` não ativo.
- Locks downstream esperados explícitos e preservados.

## Critérios para `CONSENSUS_CANDIDATE`
- 2+ revisores independentes.
- Rationale por eixo (P/O/A) para cada proposta.
- Divergências documentadas por eixo.
- Reunião de consenso realizada e registrada.

## Critérios para `CONSENSUS_VALIDATED`
- Decisão consensual registrada.
- Divergências resolvidas ou explicitamente aceitas.
- Não contradiz a taxonomia canônica SERA-PT v1.0.
- Não contradiz a decisão autoral A-A/A-C (`A-A` no-failure; `A-C` feedback/verificação pós-ação própria).
- Não usa `O-E` como código ativo.

## Relação com inter-rater
- Casos `REVIEW_READY` e `CONSENSUS_CANDIDATE` formam a base operacional para execução do protocolo inter-rater.
- Inter-rater executado é evidência de confiabilidade; materialização isolada não é.
- `CONSENSUS_VALIDATED` sem trilha inter-rater deve ser evitado como base de claim forte.

## Relação com candidate freeze
- Materialização é pré-requisito para freeze robusto, mas não suficiente.
- Freeze final exige: casos materializados, ciclo de revisão formal, inter-rater executado com threshold aceitável e locks metodológicos preservados.
- Enquanto houver apenas `MATERIALIZED_DRAFT`/`REVIEW_READY`, freeze final permanece não autorizado.
