# SERA Engine vNext Candidate Freeze Readiness v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-57 — Candidate Freeze Readiness (atualizado com ai/author adjudication mode)

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
- Evidence category runtime warning/blocking progression (passive runtime implementado em A4+R-58).
- ~~Contrato operacional LLM (fora desta fase).~~ → Definido em A4+R-49, pendente execução.
- ~~Conjunto de casos de referência por consenso metodológico.~~ → Política definida em A4+R-49, pendente materialização dos casos.
- Adversarial Set 2 → Convertido materialmente em A4+R-51 como contract tests controlados; ainda pendente evolução para reference/consensus e uso inter-rater.
- ~~Protocolo inter-rater.~~ → Protocolo definido em A4+R-49; execução passa a trilha opcional de validação futura (não bloqueio operacional imediato).
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

## A4+R-56 — Formal Reviewer Packet

Esta fase preparou o pacote operacional para revisão real por avaliadores independentes:
- [Formal Reviewer Packet](./SERA_ENGINE_VNEXT_FORMAL_REVIEWER_PACKET_v0.2.0.md)
- [Reviewer Response Template](./reference-cases/REVIEWER_RESPONSE_TEMPLATE_v0.2.0.md)
- [Formal Review Tracker](./reference-cases/FORMAL_REVIEW_TRACKER_v0.2.0.md)

Estado após A4+R-56:
- pacote formal de revisão criado.
- revisão real ainda não executada.
- inter-rater formal ainda não executado.
- nenhum caso promovido para `CONSENSUS_VALIDATED`.
- freeze final continua não autorizado.

Pendências remanescentes:
- executar coleta real de respostas com 2+ avaliadores independentes;
- consolidar intake formal de resultados na fase A4+R-57;
- somente após intake formal e execução inter-rater reavaliar candidatura a freeze final.

## A4+R-57 — AI/Author Adjudication Operating Mode

Esta fase formalizou o modo operacional de adjudicação AI/Author:
- [AI/Author Adjudication Mode](./SERA_ENGINE_VNEXT_AI_AUTHOR_ADJUDICATION_MODE_v0.2.0.md)

Decisão registrada:
- revisão humana externa/inter-rater deixa de ser bloqueio operacional obrigatório imediato;
- agente aplica metodologia SERA-PT/HFA;
- usuário atua como adjudicador metodológico final;
- dúvidas pontuais devem ser perguntadas durante a execução;
- decisões relevantes devem ser registradas;
- erros apontados pelo usuário entram em trilha de correção controlada.

Estado após A4+R-57:
- evolução operacional do produto pode continuar sem gate obrigatório de inter-rater.
- inter-rater/kappa permanecem como validação futura opcional (especialmente para claims externos/científicos).
- nenhum caso promovido para `CONSENSUS_VALIDATED`.
- freeze final científico/externo continua não autorizado sem validação adicional.

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

## A4+R-58 — Evidence Categories Passive Runtime

Esta fase implementou evidence categories no runtime vNext como metadado passivo/opcional:

- [Evidence Category Passive Runtime](./SERA_ENGINE_VNEXT_EVIDENCE_CATEGORY_PASSIVE_RUNTIME_v0.2.0.md)
- Helper passivo e contrato de tipos adicionados no escopo `frontend/src/lib/sera-vnext/*`.
- Trial dedicado executável adicionado:
  - [Evidence Categories Passive Trial](../tests/sera-vnext/evidence-categories-passive-trial-001.ts)

Estado após A4+R-58:
- modo `PASSIVE_OPTIONAL_METADATA` materializado no runtime.
- ausência de evidence category continua sem bloqueio.
- presença de evidence category continua sem alterar classificação.
- nenhum downstream habilitado.
- nenhum `CONSENSUS_VALIDATED`.
- AI/Author adjudication permanece vigente.

Pendências remanescentes:
- calibrar possível evolução para modo `warning` sem aumento relevante de falso bloqueio/falso alarme;
- manter trilha opcional de validação externa para claims científicos/externos;
- reavaliar freeze final conforme objetivo operacional vs externo.

## A4+R-59 — Evidence Category Passive Coverage Audit

Esta fase adicionou auditoria diagnóstica passiva de cobertura de evidence categories:

- [Evidence Category Passive Coverage Audit](./SERA_ENGINE_VNEXT_EVIDENCE_CATEGORY_PASSIVE_COVERAGE_AUDIT_v0.2.0.md)
- Helper dedicado no runtime vNext:
  - `frontend/src/lib/sera-vnext/evidence-category-coverage.ts`
- Trial dedicado executável:
  - [Evidence Category Coverage Trial](../tests/sera-vnext/evidence-category-coverage-trial-001.ts)

Estado após A4+R-59:
- cobertura passiva por fronteira crítica agora é auditável;
- gaps são registrados como diagnóstico passivo (`PASSIVE_GAP`) e não como bloqueio;
- evidence categories continuam opcionais/passivas;
- nenhum downstream habilitado;
- AI/Author adjudication permanece vigente.

Pendências remanescentes:
- consolidar volume de casos para calibrar thresholds de qualidade de cobertura;
- decidir critérios objetivos de transição para modo `warning` futuro sem gate bloqueante imediato;
- manter validação externa opcional para claims científicos/externos.

## A4+R-60 — Evidence Category Coverage Quality Thresholds

Esta fase definiu critérios de qualidade para cobertura passiva antes de qualquer transição para warning:

- [Evidence Category Coverage Thresholds](./SERA_ENGINE_VNEXT_EVIDENCE_CATEGORY_COVERAGE_THRESHOLDS_v0.2.0.md)

Estado após A4+R-60:
- thresholds iniciais definidos para avaliar prontidão de cobertura passiva;
- warning runtime ainda não ativo;
- hard gate não autorizado;
- classificação e gates existentes permanecem inalterados.

Pendências remanescentes:
- coletar amostra mínima para medir métricas propostas com estabilidade;
- validar taxa de falso gap e taxa de `UNKNOWN_OR_UNCATEGORIZED` em revisão qualitativa;
- reavaliar eventual piloto de `NON_BLOCKING_WARNING` em fase posterior dedicada;
- freeze final continua não autorizado.

## A4+R-61 — Real Event Corpus Inventory + Sample Selection

Esta fase iniciou a trilha de uso de corpora reais/compilados sem classificação causal:

- [Real Event Corpus Inventory](./SERA_ENGINE_VNEXT_REAL_EVENT_CORPUS_INVENTORY_v0.2.0.md)
- [Real Event Case Extraction Plan](./SERA_ENGINE_VNEXT_REAL_EVENT_CASE_EXTRACTION_PLAN_v0.2.0.md)

Estado após A4+R-61:
- inventário documental de corpus real criado;
- amostra inicial de casos candidatos selecionada para extração futura;
- extração estruturada ainda pendente de execução;
- classificação SERA ainda não executada nesta trilha;
- nenhum fixture oficial criado;
- nenhum baseline alterado;
- warning de evidence category ainda não ativo;
- freeze final continua não autorizado.

Pendências remanescentes:
- executar extração estruturada da amostra com registro de incerteza por caso;
- confirmar/localizar fontes primárias faltantes para referências `pdf24_merged*.pdf`;
- manter separação estrita entre fato extraído e hipótese metodológica futura;
- só depois avançar para fase de classificação AI/Author controlada.

## A4+R-62 — Real Event Structured Extraction Sample

Esta fase executou a primeira extração factual estruturada sobre subamostra do corpus real:

- [Real Event Structured Extraction Sample](./SERA_ENGINE_VNEXT_REAL_EVENT_STRUCTURED_EXTRACTION_SAMPLE_v0.2.0.md)
- extrações por caso em:
  - `docs/sera-vnext/real-event-extractions/REAL-EVENT-EXTRACTION-001.md`
  - `docs/sera-vnext/real-event-extractions/REAL-EVENT-EXTRACTION-002.md`
  - `docs/sera-vnext/real-event-extractions/REAL-EVENT-EXTRACTION-003.md`
  - `docs/sera-vnext/real-event-extractions/REAL-EVENT-EXTRACTION-004.md`
  - `docs/sera-vnext/real-event-extractions/REAL-EVENT-EXTRACTION-005.md`

Estado após A4+R-62:
- sample estruturado criado;
- classificação SERA ainda não executada;
- nenhum fixture oficial criado;
- nenhum baseline alterado;
- nenhum downstream habilitado;
- próxima fase planejada: adjudicação AI/Author controlada (se autorizada).

## A4+R-63 — AI/Author SERA Adjudication Pilot

Esta fase executou a primeira rodada de adjudicação AI/Author controlada sobre o sample estruturado:

- [Real Event AI/Author Adjudication Pilot](./SERA_ENGINE_VNEXT_REAL_EVENT_AI_AUTHOR_ADJUDICATION_PILOT_v0.2.0.md)
- arquivos de adjudicação/triage em:
  - `docs/sera-vnext/real-event-adjudications/REAL-EVENT-ADJUDICATION-001.md`
  - `docs/sera-vnext/real-event-adjudications/REAL-EVENT-ADJUDICATION-002.md`
  - `docs/sera-vnext/real-event-adjudications/REAL-EVENT-ADJUDICATION-003.md`
  - `docs/sera-vnext/real-event-adjudications/REAL-EVENT-ADJUDICATION-004.md`
  - `docs/sera-vnext/real-event-adjudications/REAL-EVENT-TRIAGE-005.md`

Estado após A4+R-63:
- AI/Author adjudication pilot executado;
- drafts de proposed P/O/A existem em nível documental, mas não são `releasedCode`;
- nenhum fixture oficial criado;
- nenhum baseline alterado;
- nenhum downstream habilitado;
- freeze final continua não autorizado.

## A4+R-64 — AI/Author Adjudication Refinement + Evidence Enrichment Gate

Esta fase consolidou critérios operacionais de maturidade para adjudicação real-event:

- [Real Event Adjudication Refinement Gate](./SERA_ENGINE_VNEXT_REAL_EVENT_ADJUDICATION_REFINEMENT_GATE_v0.2.0.md)
- [Real Event Adjudication Refinement Summary](./SERA_ENGINE_VNEXT_REAL_EVENT_ADJUDICATION_REFINEMENT_SUMMARY_v0.2.0.md)

Estado após A4+R-64:
- refinement gate criado;
- maturity status por caso adicionados nas adjudicações;
- casos com `EVIDENCE_ENRICHMENT_REQUIRED` explicitados;
- nenhum `proposedCode` promovido para `releasedCode`;
- nenhum fixture oficial criado;
- nenhum baseline alterado;
- nenhum downstream habilitado;
- freeze final continua não autorizado.

## A4+R-65 — Author Decision Intake + Source Enrichment Plan

Esta fase consolidou decisões autorais pendentes e separou trilha de enrichment:

- [Author Decision Intake Real Events](./SERA_ENGINE_VNEXT_AUTHOR_DECISION_INTAKE_REAL_EVENTS_v0.2.0.md)
- [Real Event Source Enrichment Plan](./SERA_ENGINE_VNEXT_REAL_EVENT_SOURCE_ENRICHMENT_PLAN_v0.2.0.md)

Estado após A4+R-65:
- author decision intake criado;
- source enrichment plan criado;
- status de intake adicionados aos 5 casos de adjudicação/triage;
- `proposedCode` continua em modo draft;
- nenhum `releasedCode` criado;
- nenhum downstream habilitado;
- freeze final continua não autorizado.

## A4+R-66 — Real Event Adjudication Coverage Metrics

Esta fase mediu cobertura metodológica da adjudicação real-event sem alterar decisões de código:

- [Real Event Adjudication Coverage Metrics](./SERA_ENGINE_VNEXT_REAL_EVENT_ADJUDICATION_COVERAGE_METRICS_v0.2.0.md)
- [Adjudication Coverage Tracker](./real-event-adjudications/ADJUDICATION_COVERAGE_TRACKER_v0.2.0.md)

Estado após A4+R-66:
- `totalCases=5`, `totalAxes=15`;
- `totalDraftProposedCodes=5`;
- `totalUnresolvedAxes=10` (`66.7%`), com concentração em eixo A (`5/5 unresolved`);
- gaps de enrichment claramente delimitados para 004/005;
- nenhum `releasedCode`;
- nenhum downstream habilitado;
- freeze final continua não autorizado.

## A4+R-67 — Source Enrichment Execution for 004/005

Esta fase executou enrichment de fonte para os casos bloqueados em A4+R-66:

- [Real Event Source Enrichment Execution](./SERA_ENGINE_VNEXT_REAL_EVENT_SOURCE_ENRICHMENT_EXECUTION_v0.2.0.md)

Estado após A4+R-67:
- enrichment executado para 004 e 005;
- 004 recebeu melhora de anchor para `IMPROVED_MEDIUM` e pode seguir para nova adjudicação controlada;
- 005 recebeu melhora limitada (`IMPROVED_LOW`) e permanece `TRIAGE_ONLY`/`ENRICHMENT_REQUIRED`;
- nenhum `proposedCode` foi alterado;
- nenhum `releasedCode` foi criado;
- nenhum downstream habilitado;
- freeze final continua não autorizado.

## Leitura de prontidão atual
- **Pronto para evolução controlada** de contratos técnicos e rastreabilidade.
- **Não pronto** para freeze metodológico final com claims externos fortes.

## Próximas fases recomendadas
1. Consolidar evidence categories em modo passivo -> warning -> regra.
2. Executar intake de adjudicações AI/Author com registro de decisões e correções controladas.
3. Manter trilha opcional de validação externa (inter-rater/kappa) para uso futuro.
4. Só então avaliar freeze candidate conforme objetivo (operacional interno vs científico/externo).
