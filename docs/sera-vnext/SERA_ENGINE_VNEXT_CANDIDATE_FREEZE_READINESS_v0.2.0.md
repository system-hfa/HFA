# SERA Engine vNext Candidate Freeze Readiness v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-54 — Candidate Freeze Readiness (atualizado com independent review dry run)

## Objetivo
Consolidar o estado de maturidade do núcleo causal vNext e explicitar critérios mínimos para um candidate freeze futuro, sem declarar validação metodológica final.

## Estado atual (A4+R-45 até A4+R-48)
- Taxonomia canônica SERA-PT v1.0 definida.
- Decisão autoral A-A/A-C ratificada e estável.
- Code Release Gate ativo e auditável.
- Semantic Consistency Guard ativo.
- Preconditions candidatas derivadas de released codes.
- Traceability de released code ativo (hendyCategory/isNoFailure/timePressureExcessive/derivationPath).
- Locks downstream preservados.

## Critérios já atendidos
- Taxonomia canônica publicada.
- Decisão autoral A-A/A-C aplicada.
- O-E reservado/inativo aplicado.
- Release gate e semantic guard com testes dedicados.
- Preconditions candidatas com rastreabilidade mínima.
- Sem import legacy no fluxo vNext.
- Testes vNext da cadeia causal executando com sucesso.

## Critérios pendentes para freeze robusto
- Evidence category runtime (atualmente design-only).
- ~~Contrato operacional LLM (fora desta fase).~~ → Definido em A4+R-49, pendente execução.
- ~~Conjunto de casos de referência por consenso metodológico.~~ → Política definida em A4+R-49, pendente materialização dos casos.
- Adversarial Set 2 → Convertido materialmente em A4+R-51 como contract tests controlados; ainda pendente evolução para reference/consensus e uso inter-rater.
- ~~Protocolo inter-rater.~~ → Protocolo definido em A4+R-49, pendente execução.
- Plano final de integração (ainda sem UI/API/DB).

## Gate de linguagem metodológica
Ainda não chamar de metodologia validada cientificamente.

Linguagem recomendada:
- `candidate causal core under validation`

Linguagem a evitar nesta fase:
- `scientifically validated`
- `production-ready full methodology`

## A4+R-50 — Consensus Reference Cases Skeleton + Adversarial Set 2 (documentos adicionados)

Dois artefatos preparatórios foram criados nesta fase, avançando a prontidão sem executar validação empírica:

- [Consensus Reference Case Template](../docs/sera-vnext/SERA_ENGINE_VNEXT_CONSENSUS_REFERENCE_CASE_TEMPLATE_v0.2.0.md) — estrutura padrão para documentar casos de referência.
- [Reference Cases Directory](../docs/sera-vnext/reference-cases/) — diretório com skeletons (CRC-SKELETON-001, CRC-NEGATIVE-CONTROL-SKELETON-001, CRC-ADVERSARIAL-SKELETON-001), todos com status `DRAFT_CASE_SKELETON` e `NOT_CONSENSUS_VALIDATED`.
- [Adversarial Set 2 Design](../docs/sera-vnext/SERA_ENGINE_VNEXT_ADVERSARIAL_SET_2_DESIGN_v0.2.0.md) — 14 casos adversariais desenhados cobrindo fronteiras críticas da taxonomia, todos com status `DESIGN_ONLY`.

Estes artefatos preparam o terreno para materialização futura, mas não a executam:
- Templates e skeletons existem, mas nenhum caso real foi materializado.
- Adversarial set 2 está desenhado, mas não implementado como testes executáveis.
- Consensus reference cases continuam pendentes de materialização com dados reais ou sintéticos completos.
- Inter-rater protocol continua pendente de execução.

O candidate freeze final permanece não autorizado.
Três documentos de governança metodológica foram criados nesta fase, reduzindo lacunas de governança sem executar validação empírica:

- [LLM Operational Contract](../docs/sera-vnext/SERA_ENGINE_VNEXT_LLM_OPERATIONAL_CONTRACT_v0.2.0.md) — define limites operacionais do uso de LLM como auxiliar, não autoridade classificatória.
- [Consensus Reference Cases Policy](../docs/sera-vnext/SERA_ENGINE_VNEXT_CONSENSUS_REFERENCE_CASES_POLICY_v0.2.0.md) — define política de criação e governança de casos de referência por consenso.
- [Inter-Rater Reliability Protocol](../docs/sera-vnext/SERA_ENGINE_VNEXT_INTER_RATER_PROTOCOL_v0.2.0.md) — define protocolo para avaliação de confiabilidade entre revisores.

Estes documentos estabelecem a base de governança, mas sua mera existência não executa validação empírica. O candidate freeze final continua pendente até que:
- evidence category runtime seja implementado ou a decisão de manter design-only seja formalizada;
- consensus reference cases sejam materializados (casos reais documentados);
- adversarial Set 2 seja executado;
- protocolo inter-rater seja executado com thresholds aceitáveis;
- plano de integração seja definido.

## A4+R-51 — Adversarial Set 2 Contract Tests (execução controlada)

Esta fase converteu o design adversarial em contratos vNext executáveis sem abrir downstream:
- [Adversarial Set 2 Contract Tests](../docs/sera-vnext/SERA_ENGINE_VNEXT_ADVERSARIAL_SET_2_CONTRACT_TESTS_v0.2.0.md)
- [Trial executável](../tests/sera-vnext/adversarial-set-2-contract-trial-001.ts)

Estado metodológico após A4+R-51:
- Adversarial Set 2 está parcialmente/materialmente convertido em testes de contrato.
- O pacote continua `candidate causal core under validation`.
- Ainda não é consensus reference.
- Ainda não é evidência inter-rater.
- Ainda não autoriza freeze final.

Pendências remanescentes:
- materialização de consensus reference cases (sem marcar como `CONSENSUS_VALIDATED` nesta etapa);
- execução formal do protocolo inter-rater;
- decisão explícita sobre evidence categories runtime (ou formalização de manutenção em design-only);
- plano de integração final preservando locks metodológicos.

## A4+R-52 — Reference Case Materialization Prep + Evidence Category Passive Decision

Esta fase adicionou governança operacional para saída do estado puramente skeleton:
- [Reference Case Materialization Guide](./SERA_ENGINE_VNEXT_REFERENCE_CASE_MATERIALIZATION_GUIDE_v0.2.0.md) criado.
- [Evidence Category Passive Decision](./SERA_ENGINE_VNEXT_EVIDENCE_CATEGORY_PASSIVE_DECISION_v0.2.0.md) criado com recomendação `PASSIVE_OPTIONAL_METADATA`.
- Primeiro draft materializado sem consenso criado:
  - [CRC-ADVERSARIAL-DRAFT-001](./reference-cases/CRC-ADVERSARIAL-DRAFT-001.md)

Estado após A4+R-52:
- Nenhum caso foi promovido para `CONSENSUS_VALIDATED`.
- Evidence categories seguem sem obrigatoriedade e sem bloqueio (modo passivo recomendado).
- Freeze final permanece não autorizado.

Pendências remanescentes:
- materializar mais drafts com cobertura de fronteiras críticas;
- executar revisão independente 2+ avaliadores por caso candidato;
- executar protocolo inter-rater com thresholds aceitos;
- só depois avaliar promoção de casos para consenso e readiness de freeze final.

## A4+R-53 — Reference Case Draft Batch + Review Package

Esta fase consolidou um lote inicial de drafts e o pacote de revisão independente:
- novos drafts materializados:
  - [CRC-NOMINAL-DRAFT-001](./reference-cases/CRC-NOMINAL-DRAFT-001.md)
  - [CRC-NEGATIVE-CONTROL-DRAFT-001](./reference-cases/CRC-NEGATIVE-CONTROL-DRAFT-001.md)
  - [CRC-ADVERSARIAL-DRAFT-002](./reference-cases/CRC-ADVERSARIAL-DRAFT-002.md)
- package de revisão:
  - [Reference Case Review Package](./SERA_ENGINE_VNEXT_REFERENCE_CASE_REVIEW_PACKAGE_v0.2.0.md)
- tracker de revisão:
  - [Review Tracker](./reference-cases/REVIEW_TRACKER_v0.2.0.md)

Estado após A4+R-53:
- lote inicial de drafts materializados disponível para revisão independente.
- nenhum caso foi promovido para `CONSENSUS_VALIDATED`.
- inter-rater ainda não executado.
- freeze final continua não autorizado.

Pendências remanescentes:
- concluir revisão independente (2+ avaliadores) para todos os drafts do lote;
- registrar divergências por eixo e consolidar candidatos a consenso em fase posterior;
- executar protocolo inter-rater e avaliar thresholds;
- somente após isso reavaliar autorização de freeze final.

## A4+R-54 — Independent Review Dry Run

Esta fase executou um dry run documental de revisão independente sobre os 4 drafts materializados:
- [Review Dry Run](./reference-cases/REVIEW_DRY_RUN_A4R54_v0.2.0.md)
- [Dry Run Summary](./SERA_ENGINE_VNEXT_REFERENCE_CASE_DRY_RUN_REVIEW_SUMMARY_v0.2.0.md)
- [Review Tracker atualizado](./reference-cases/REVIEW_TRACKER_v0.2.0.md)

Estado após A4+R-54:
- dry run de revisão independente realizado.
- não é inter-rater formal.
- não gera kappa.
- nenhum caso promovido para `CONSENSUS_VALIDATED`.
- freeze final continua não autorizado.

Pendências remanescentes:
- executar revisão formal com avaliadores reais independentes (2+);
- preparar `CONSENSUS_CANDIDATE` apenas após revisão formal;
- executar protocolo inter-rater com métricas completas;
- somente após evidência formal reavaliar readiness para freeze final.

## A4+R-55 — Dry Run Divergence Resolution Guide

Esta fase transformou as divergências encontradas no dry run A4+R-54 em guia de decisão para revisores reais:

- [Dry Run Divergence Resolution Guide](./SERA_ENGINE_VNEXT_DRY_RUN_DIVERGENCE_RESOLUTION_GUIDE_v0.2.0.md) criado.
- Três regras-síntese estabelecidas: no-failure não é fallback para unknown; O-E reservado não vira O-A automático; A-C exige falha de verificação pós-ação própria.
- [Review Package](./SERA_ENGINE_VNEXT_REFERENCE_CASE_REVIEW_PACKAGE_v0.2.0.md) atualizado com as regras pré-revisão.
- [Review Tracker](./reference-cases/REVIEW_TRACKER_v0.2.0.md) atualizado com referência ao guia.

Estado após A4+R-55:
- Divergências do dry run foram transformadas em orientações para revisão real.
- Ainda não é inter-rater formal.
- Nenhum caso foi promovido para CONSENSUS_VALIDATED.
- Freeze final continua não autorizado.

Pendências remanescentes:
- Executar revisão real com avaliadores independentes aplicando o guia A4+R-55.
- Executar protocolo inter-rater com métricas completas.
- Somente após evidência formal reavaliar readiness para freeze final.

## Leitura de prontidão atual
- **Pronto para evolução controlada** de contratos técnicos e rastreabilidade.
- **Não pronto** para freeze metodológico final com claims externos fortes.

## Próximas fases recomendadas
1. Consolidar evidence categories em modo passivo -> warning -> regra.
2. Fechar pacote de referência e protocolo inter-rater.
3. Executar adversarial Set 2 e revisão de consistência.
4. Só então preparar freeze candidate formal.
