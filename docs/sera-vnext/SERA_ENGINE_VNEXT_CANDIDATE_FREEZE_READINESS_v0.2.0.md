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
- O-E tratado como `NON_EXISTENT_IN_SERA_PT_V1` (fora da taxonomia canônica ativa).
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
- Três regras-síntese estabelecidas: no-failure não é fallback para unknown; O-E `NON_EXISTENT_IN_SERA_PT_V1` não vira O-A automático; A-C exige falha de verificação pós-ação própria.
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

## A4+R-68 — Real Event Adjudication Consolidation Pack

Esta fase consolidou a rodada pós-enrichment com re-adjudicação dedicada do caso 004:

- [Real Event Consolidation Pack](./SERA_ENGINE_VNEXT_REAL_EVENT_CONSOLIDATION_PACK_A4R68_v0.2.0.md)
- [Real Event Re-adjudication 004](./real-event-adjudications/REAL-EVENT-READJUDICATION-004-A4R68.md)

Estado após A4+R-68:
- 004 re-adjudicado após enrichment (`IMPROVED_MEDIUM`) e movido para `HOLD_UNRESOLVED` com `O-A` draft mantido;
- 005 permanece `TRIAGE_ONLY` com `EVIDENCE_ENRICHMENT_REQUIRED` (`IMPROVED_LOW`);
- métricas consolidadas: `totalCases=5`, `holdUnresolvedCases=3`, backlog estrito de enrichment=1 (005);
- nenhum `proposedCode` promovido;
- nenhum `releasedCode` criado;
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

## A4+R-69 — Guarded Narrative Draft Pack for Eligible Real Events

Esta fase consolidou narrativa guardada para casos elegíveis sem alterar estado causal de release:

- [Guarded Narrative Draft Contract](./SERA_ENGINE_VNEXT_GUARDED_NARRATIVE_DRAFT_CONTRACT_v0.2.0.md)
- [Guarded Narrative Real Event 001](./real-event-narratives/GUARDED-NARRATIVE-REAL-EVENT-001.md)
- [Guarded Narrative Real Event 004](./real-event-narratives/GUARDED-NARRATIVE-REAL-EVENT-004.md)
- [Guarded Narrative Draft Pack A4R69](./SERA_ENGINE_VNEXT_GUARDED_NARRATIVE_DRAFT_PACK_A4R69_v0.2.0.md)

Estado após A4+R-69:
- narrativas guardadas criadas para `001` e `004`;
- `002` e `003` mantidos fora por `HOLD_UNRESOLVED` com P/A ambíguos;
- `005` mantido fora por `TRIAGE_ONLY` + `SOURCE_PARTIAL`;
- nenhum `finalConclusion` foi produzido;
- nenhum downstream foi aberto;
- nenhum `proposedCode` foi promovido;
- `releasedCodeCount` permanece `0`;
- freeze final continua não autorizado.

## A4+R-70 — Controlled Uncertainty Reduction Pack

Esta fase consolidou matriz e plano de redução de incerteza para os 5 casos reais sem alterar estado causal de release:

- [Real Event Uncertainty Reduction Matrix A4R70](./SERA_ENGINE_VNEXT_REAL_EVENT_UNCERTAINTY_REDUCTION_MATRIX_A4R70_v0.2.0.md)
- [Real Event Uncertainty Reduction Plan A4R70](./SERA_ENGINE_VNEXT_REAL_EVENT_UNCERTAINTY_REDUCTION_PLAN_A4R70_v0.2.0.md)

Estado após A4+R-70:
- incertezas por caso/eixo consolidadas com trilhas de evidência necessárias;
- nenhuma redução automática de `UNRESOLVED`;
- nenhum `proposedCode` promovido;
- `releasedCodeCount` permanece `0`;
- nenhum downstream aberto;
- freeze final continua não autorizado.

Trilha recomendada para A4+R-71:
- opção principal: **D — Evidence Coverage Metrics on Real Events**, seguida de sprint focal de enrichment mecanístico se lacunas críticas persistirem.

## A4+R-71 — Real Event Corpus Expansion from Uploaded pdf24 Set

Esta fase ampliou inventário de corpus real-event sem classificação causal:

- [PDF24 Real Event Corpus Inventory A4R71](./SERA_ENGINE_VNEXT_PDF24_REAL_EVENT_CORPUS_INVENTORY_A4R71_v0.2.0.md)
- [Real Event Sample Expansion Plan A4R71](./SERA_ENGINE_VNEXT_REAL_EVENT_SAMPLE_EXPANSION_PLAN_A4R71_v0.2.0.md)

Estado após A4+R-71:
- PDFs `pdf24_merged*.pdf` confirmados localmente (caminhos externos ao repo) e correlacionados com índices de harvest;
- inventário de expansão de corpus criado com seleção de novos candidatos para extração futura;
- plano de expansão de amostra criado com proposta de Batch 2;
- decisão taxonômica reforçada: `O-E = NON_EXISTENT_IN_SERA_PT_V1` (apenas guardrail negativo/adversarial);
- nenhum caso classificado nesta fase;
- nenhum `releasedCode` criado;
- nenhum downstream aberto;
- freeze final continua não autorizado.

## A4+R-71 — Real Event Corpus Expansion from Uploaded pdf24 Text Set

Esta atualização de A4+R-71 priorizou corpus textual convertido (`pdf24_merged*.txt`) para expansão de amostra real-event sem classificação causal.

- [PDF24 Text Real Event Corpus Inventory A4R71](./SERA_ENGINE_VNEXT_PDF24_TEXT_REAL_EVENT_CORPUS_INVENTORY_A4R71_v0.2.0.md)
- [Real Event Sample Expansion Plan A4R71](./SERA_ENGINE_VNEXT_REAL_EVENT_SAMPLE_EXPANSION_PLAN_A4R71_v0.2.0.md)

Estado após A4+R-71 (text set):
- arquivos `.txt` convertidos foram localizados e triados;
- inventário de expansão de corpus textual foi criado;
- plano de expansão de amostra para Batch 2 foi criado;
- decisão taxonômica reforçada: `O-E = NON_EXISTENT_IN_SERA_PT_V1`;
- `O-E` não faz parte da taxonomia canônica ativa e só pode aparecer como guardrail negativo/adversarial;
- nenhum caso foi classificado nesta fase;
- nenhum `releasedCode` foi criado;
- nenhum downstream foi aberto;
- freeze final continua não autorizado.

## A4+R-72 — Structured Extraction Batch 2 from PDF24 Text Corpus

Esta fase executou extração factual estruturada em lote para os 10 casos `P1` definidos em A4+R-71:

- [Structured Extraction Batch 2 A4R72](./SERA_ENGINE_VNEXT_STRUCTURED_EXTRACTION_BATCH_2_A4R72_v0.2.0.md)
- extrações por caso em:
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-001.md`
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-002.md`
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-003.md`
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-004.md`
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-005.md`
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-006.md`
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-007.md`
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-008.md`
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-009.md`
  - `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-010.md`

Estado após A4+R-72:
- 10 casos Batch 2 extraídos;
- total de extrações real-event no programa (amostra original 5 + batch 2) agora em 15;
- classificação continua pendente para os 10 casos do Batch 2;
- nenhuma classificação SERA foi executada nesta fase de extração;
- nenhum `releasedCode` foi criado;
- nenhum downstream foi aberto;
- freeze final continua não autorizado.

## A4+R-73 — Batch 2 AI/Author Adjudication for 10 Extracted Cases

Esta fase executou adjudicação AI/Author em lote para os 10 casos extraídos no Batch 2:

- [Batch 2 AI/Author Adjudication A4R73](./SERA_ENGINE_VNEXT_BATCH_2_AI_AUTHOR_ADJUDICATION_A4R73_v0.2.0.md)
- [Batch 2 Adjudication Tracker A4R73](./real-event-adjudications-batch-2/BATCH_2_ADJUDICATION_TRACKER_A4R73_v0.2.0.md)
- adjudicações por caso em:
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-001.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-002.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-003.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-004.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-005.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-006.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-007.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-008.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-009.md`
  - `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-010.md`

Estado após A4+R-73:
- 10 casos do Batch 2 adjudicados em draft;
- total de real-event adjudication drafts agora em 15 casos;
- nenhum `releasedCode` criado;
- nenhum downstream aberto;
- freeze final continua não autorizado.

## A4+R-74 — Consolidated Metrics and Pattern Review for 15 Real Events

Esta fase consolidou os 15 eventos reais (5 iniciais + 10 Batch 2) em métricas globais e revisão de padrões metodológicos:

- [15 Real Events Consolidated Metrics A4R74](./SERA_ENGINE_VNEXT_15_REAL_EVENTS_CONSOLIDATED_METRICS_A4R74_v0.2.0.md)
- [15 Real Events Pattern Review A4R74](./SERA_ENGINE_VNEXT_15_REAL_EVENTS_PATTERN_REVIEW_A4R74_v0.2.0.md)
- [Consolidated 15 Real Events Tracker A4R74](./real-event-adjudications/CONSOLIDATED_15_REAL_EVENTS_TRACKER_A4R74_v0.2.0.md)

Estado após A4+R-74:
- 15 real events consolidados;
- métricas globais consolidadas (`totalCases=15`, `totalAxes=45`, `totalUnresolvedAxes=28`);
- padrões metodológicos principais consolidados (condition-dominant, perception/action boundary, PF/PM ambiguity, automation/mode awareness, source mismatch/source partial);
- `releasedCodeCount` permanece `0`;
- nenhum downstream aberto;
- freeze final continua não autorizado.

Próxima fase ampla recomendada:
- **A4+R-75 — Select Batch 3 to reach 30 events** (ampliar amostra para validar estabilidade metodológica com maior diversidade factual antes de qualquer trilha de release).

## A4+R-75 — Select Batch 3 to Reach 30 Real Events

Esta fase selecionou o próximo lote de expansão sem executar extração/adjudicação/classificação:

- [Batch 3 Selection A4R75](./SERA_ENGINE_VNEXT_BATCH_3_SELECTION_A4R75_v0.2.0.md)
- [Batch 3 Extraction Plan A4R75](./SERA_ENGINE_VNEXT_BATCH_3_EXTRACTION_PLAN_A4R75_v0.2.0.md)

Estado após A4+R-75:
- Batch 3 selecionado com 15 casos para levar o corpus de 15 para 30 eventos;
- seleção orientada por lacunas metodológicas (A-axis clarity, objective diversity, CRM/coordenação, procedimento/feedback);
- nenhum caso classificado nesta fase;
- nenhum `proposedCode` criado nesta fase;
- nenhum `releasedCode` criado;
- nenhum downstream aberto;
- freeze final continua não autorizado.

Próxima fase ampla recomendada:
- **A4+R-76 — Structured Extraction Batch 3 from Selected 15 Events**.

## A4+R-76 — Structured Extraction Batch 3 from Selected 15 Events

Esta fase executou extração factual estruturada em lote para os 15 casos selecionados no Batch 3:

- [Structured Extraction Batch 3 A4R76](./SERA_ENGINE_VNEXT_STRUCTURED_EXTRACTION_BATCH_3_A4R76_v0.2.0.md)
- extrações por caso em:
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-001.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-002.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-003.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-004.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-005.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-006.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-007.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-008.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-009.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-010.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-011.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-012.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-013.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-014.md`
  - `docs/sera-vnext/real-event-extractions-batch-3/REAL-EVENT-BATCH3-EXTRACTION-015.md`

Estado após A4+R-76:
- 15 casos Batch 3 extraídos;
- total real-event extractions agora em 30;
- classificação ainda pendente para os casos do Batch 3;
- nenhuma classificação SERA executada nesta fase de extração;
- nenhum `proposedCode` criado;
- nenhum `releasedCode` criado;
- nenhum downstream aberto;
- freeze final continua não autorizado.

Próxima fase ampla recomendada:
- **A4+R-77 — Batch 3 AI/Author Adjudication for 15 extracted cases**.

## A4+R-77 — Batch 3 AI/Author Adjudication for 15 Extracted Cases

Esta fase executou adjudicação AI/Author em lote para os 15 casos extraídos no Batch 3:

- [Batch 3 AI/Author Adjudication A4R77](./SERA_ENGINE_VNEXT_BATCH_3_AI_AUTHOR_ADJUDICATION_A4R77_v0.2.0.md)
- [Batch 3 Adjudication Tracker A4R77](./real-event-adjudications-batch-3/BATCH_3_ADJUDICATION_TRACKER_A4R77_v0.2.0.md)
- adjudicações por caso em `docs/sera-vnext/real-event-adjudications-batch-3/REAL-EVENT-BATCH3-ADJUDICATION-001.md` até `REAL-EVENT-BATCH3-ADJUDICATION-015.md`

Estado após A4+R-77:
- 15 casos Batch 3 adjudicados em draft;
- total real-event adjudication draft agora em 30 casos;
- `questionPath` por eixo introduzido nos novos drafts;
- métricas Batch 3: `proposedPAxes=8`, `proposedOAxes=12`, `proposedAAxes=1`, `totalUnresolvedAxes=24`;
- nenhum `releasedCode` criado;
- nenhum downstream aberto;
- freeze final continua não autorizado.

Próxima fase ampla recomendada:
- **A4+R-78 — Consolidated Metrics and QuestionPath Review for 30 Real Events**.

## A4+R-78 — Consolidated Metrics and QuestionPath Review for 30 Real Events

Esta fase consolidou os 30 eventos reais em métricas globais, revisão de padrões, cobertura de `questionPath` e decisão de próxima trilha:

- [30 Real Events Consolidated Metrics A4R78](./SERA_ENGINE_VNEXT_30_REAL_EVENTS_CONSOLIDATED_METRICS_A4R78_v0.2.0.md)
- [QuestionPath Review A4R78](./SERA_ENGINE_VNEXT_QUESTION_PATH_REVIEW_A4R78_v0.2.0.md)
- [30 Real Events Pattern Review A4R78](./SERA_ENGINE_VNEXT_30_REAL_EVENTS_PATTERN_REVIEW_A4R78_v0.2.0.md)
- [Consolidated 30 Real Events Tracker A4R78](./real-event-adjudications/CONSOLIDATED_30_REAL_EVENTS_TRACKER_A4R78_v0.2.0.md)
- [Post-30 Events Next Phase Decision A4R78](./SERA_ENGINE_VNEXT_POST_30_EVENTS_NEXT_PHASE_DECISION_A4R78_v0.2.0.md)

Estado após A4+R-78:
- 30 real events consolidated;
- métricas globais: `totalCases=30`, `totalAxes=90`, `proposedPAxes=12`, `proposedOAxes=25`, `proposedAAxes=1`, `totalUnresolvedAxes=52`;
- `questionPath` padronizado presente nos 15 casos Batch 3 e ausente/não padronizado nos 15 primeiros;
- `releasedCodeCount=0`;
- nenhum downstream aberto;
- nenhum fixture/baseline/código alterado;
- freeze final continua não autorizado.

Próxima fase ampla escolhida:
- **A4+R-79 — QuestionPath Template and Backfill Plan**.

## A4+R-79 — QuestionPath Template and Backfill Plan

Esta fase padronizou a camada documental de rastreabilidade `questionPath` e preparou o backfill dos 15 primeiros eventos sem alterar adjudicações existentes:

- [QuestionPath Canonical Template](./SERA_ENGINE_VNEXT_QUESTION_PATH_CANONICAL_TEMPLATE_v0.2.0.md)
- [QuestionPath Backfill Plan A4R79](./SERA_ENGINE_VNEXT_QUESTION_PATH_BACKFILL_PLAN_A4R79_v0.2.0.md)
- [QuestionPath Coverage Matrix A4R79](./SERA_ENGINE_VNEXT_QUESTION_PATH_COVERAGE_MATRIX_A4R79_v0.2.0.md)
- [QuestionPath Method Decision A4R79](./SERA_ENGINE_VNEXT_QUESTION_PATH_METHOD_DECISION_A4R79_v0.2.0.md)

Estado após A4+R-79:
- template canônico criado para `P_axis_questionPath`, `O_axis_questionPath` e `A_axis_questionPath`;
- plano de backfill criado para os 5 eventos iniciais e os 10 eventos Batch 2;
- matriz de cobertura criada para os 30 casos;
- method decision draft criado;
- cobertura atual de `questionPath`: `15/30`;
- alvo antes de release criteria: `30/30`;
- `releasedCodeCount=0`;
- nenhum downstream aberto;
- nenhum fixture/baseline/código alterado.

Decisão mantida:
- `questionPath` passa a ser obrigatório para novas adjudicações AI/Author;
- `questionPath` é pré-requisito documental para comparação e futura discussão de release, mas não é release gate automático;
- `O-E` permanece `NON_EXISTENT_IN_SERA_PT_V1` e só pode aparecer como guardrail negativo/adversarial.

Próxima fase recomendada:
- **A4+R-80 — QuestionPath Backfill for First 15 Events**.

O candidate freeze final permanece não autorizado.

## A4+R-79b — Normalize Legacy O-E Wording

Esta fase realizou correção documental de formulações legadas sobre O-E sem mudança funcional:

- `O-E = NON_EXISTENT_IN_SERA_PT_V1`;
- Objective ativo permanece `O-A/O-B/O-C/O-D`;
- `O-E` permanece apenas como guardrail negativo/adversarial.

Estado após A4+R-79b:
- old O-E wording normalized nos arquivos alvo desta fase;
- nenhuma alteração funcional de taxonomia, adjudicação ou métricas;
- nenhum release/downstream habilitado.

## A4+R-80 - QuestionPath Backfill for First 15 Events

Esta fase executou o backfill documental de questionPath para os 15 primeiros eventos reais e adicionou auditorias metodologicas de consistencia:

- [QuestionPath Backfill Execution A4R80](./SERA_ENGINE_VNEXT_QUESTION_PATH_BACKFILL_EXECUTION_A4R80_v0.2.0.md)
- [O-E Residual Wording Audit A4R80](./SERA_ENGINE_VNEXT_OE_RESIDUAL_WORDING_AUDIT_A4R80_v0.2.0.md)
- [Method Locks Audit A4R80](./SERA_ENGINE_VNEXT_METHOD_LOCKS_AUDIT_A4R80_v0.2.0.md)
- [QuestionPath Consistency Audit A4R80](./SERA_ENGINE_VNEXT_QUESTION_PATH_CONSISTENCY_AUDIT_A4R80_v0.2.0.md)

Estado apos A4+R-80:
- backfill executado para 15/15 casos alvo;
- questionPath coverage: 30/30;
- O-E residual audit criado;
- method locks audit criado;
- questionPath consistency audit criado;
- proposedCodeChanges=0;
- unresolvedReduced=0;
- releasedCodeCount=0;
- nenhum downstream aberto;
- nenhum fixture/baseline/codigo alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-81 - Release Criteria Design for AI/Author Proposed Codes** (docs-only primeiro), porque a cobertura de questionPath agora esta homogenea em 30/30.
- Alternativa posterior: **A4+R-81 - External Investigation Report Harvest Strategy**, se a prioridade passar a ser reduzir lacunas de fonte antes de criterios de release.

## A4+R-81 - Release Criteria Design for AI/Author Proposed Codes

Esta fase desenhou criterios documentais para futura avaliacao de release de `proposedCode` AI/Author, sem executar release real:

- [Release Criteria Design A4R81](./SERA_ENGINE_VNEXT_RELEASE_CRITERIA_DESIGN_A4R81_v0.2.0.md)
- [Release Criteria by Axis A4R81](./SERA_ENGINE_VNEXT_RELEASE_CRITERIA_BY_AXIS_A4R81_v0.2.0.md)
- [Release Criteria for Observed Codes A4R81](./SERA_ENGINE_VNEXT_RELEASE_CRITERIA_FOR_OBSERVED_CODES_A4R81_v0.2.0.md)
- [Release Eligibility Dry-Run Matrix A4R81](./SERA_ENGINE_VNEXT_RELEASE_ELIGIBILITY_DRY_RUN_MATRIX_A4R81_v0.2.0.md)
- [Release Criteria Method Decision A4R81](./SERA_ENGINE_VNEXT_RELEASE_CRITERIA_METHOD_DECISION_A4R81_v0.2.0.md)
- [Post Release Criteria Next Phase Plan A4R81](./SERA_ENGINE_VNEXT_POST_RELEASE_CRITERIA_NEXT_PHASE_PLAN_A4R81_v0.2.0.md)

Estado apos A4+R-81:
- release criteria design criado;
- criterios por eixo criados;
- criterios por codigos observados criados para `P-G`, `P-C`, `P-F`, `P-H`, `O-A`, `O-C`, `O-D` e `A-F`;
- eligibility dry-run matrix criada para 30 casos e 90 eixos;
- method decision draft criado;
- no release real;
- releasedCodeCount=0;
- proposedCodeChanges=0;
- unresolvedReduced=0;
- nenhum downstream aberto;
- nenhum fixture/baseline/codigo alterado.

Dry-run A4+R-81:
- ELIGIBLE_FOR_AUTHOR_REVIEW: 21 eixos;
- NOT_ELIGIBLE: 0 eixos no nivel de celula, porque casos triage-only continuam bloqueados por `UNRESOLVED`;
- NEEDS_ENRICHMENT: 6 eixos;
- BLOCKED_UNRESOLVED: 52 eixos;
- DESIGN_ONLY_NOT_ASSESSED: 11 eixos.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-82 - Author Review of Release Eligibility Matrix**.
- Alternativa se o autor priorizar reforco factual antes da revisao: **A4+R-82 - Source Enrichment Sprint for release-eligible candidates**.

## A4+R-82 - Author Review of Release Eligibility Matrix

Esta fase revisou documentalmente os 21 eixos marcados como `ELIGIBLE_FOR_AUTHOR_REVIEW` na matriz A4+R-81, sem criar release real:

- [Release Eligibility Author Review A4R82](./SERA_ENGINE_VNEXT_RELEASE_ELIGIBILITY_AUTHOR_REVIEW_A4R82_v0.2.0.md)
- [Release Pilot Shortlist A4R82](./SERA_ENGINE_VNEXT_RELEASE_PILOT_SHORTLIST_A4R82_v0.2.0.md)
- [Pre-Release Gap Review A4R82](./SERA_ENGINE_VNEXT_PRE_RELEASE_GAP_REVIEW_A4R82_v0.2.0.md)
- [Release Pilot Plan A4R82](./SERA_ENGINE_VNEXT_RELEASE_PILOT_PLAN_A4R82_v0.2.0.md)

Estado apos A4+R-82:
- author review matrix criada;
- shortlist criada;
- pre-release gap review criado;
- release pilot plan criado;
- releasedCodeCount permanece 0;
- proposedCodeChanges=0;
- unresolvedReduced=0;
- nenhum downstream aberto;
- nenhum fixture/baseline/codigo alterado.

Resultado da revisao A4+R-82:
- STRONG_RELEASE_PILOT_CANDIDATE: 4 eixos;
- WEAK_RELEASE_PILOT_CANDIDATE: 6 eixos;
- HOLD_FOR_ENRICHMENT: 1 eixo;
- HOLD_FOR_AUTHOR_CLARIFICATION: 5 eixos;
- HOLD_FOR_METHOD_REFINEMENT: 5 eixos;
- REJECT_FOR_RELEASE_PILOT: 0 eixos.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-83 - Author Approval Packet for P-Axis Micro-Pilot** (docs-only).
- Alternativa se a prioridade for evidência: **A4+R-83 - Source Enrichment Sprint for Held Release Candidates**.

## A4+R-83 - Author Approval Packet for P-Axis Micro-Pilot

Esta fase preparou pacote documental de aprovacao autoral futura para um micro-pilot somente do eixo P, sem executar release real:

- [P-Axis Micro-Pilot Author Approval Packet A4R83](./SERA_ENGINE_VNEXT_P_AXIS_MICRO_PILOT_AUTHOR_APPROVAL_PACKET_A4R83_v0.2.0.md)
- [Author Approval Checklist A4R83](./SERA_ENGINE_VNEXT_AUTHOR_APPROVAL_CHECKLIST_A4R83_v0.2.0.md)
- [Weak Candidate Backlog A4R83](./SERA_ENGINE_VNEXT_RELEASE_PILOT_WEAK_CANDIDATE_BACKLOG_A4R83_v0.2.0.md)
- [P-Axis Micro-Pilot Method Decision A4R83](./SERA_ENGINE_VNEXT_P_AXIS_MICRO_PILOT_METHOD_DECISION_A4R83_v0.2.0.md)
- Individual packets em `docs/sera-vnext/release-pilot-author-packets/`.

Estado apos A4+R-83:
- author approval packet criado;
- 4 individual packets criados;
- checklist criado;
- weak backlog criado;
- method decision criada;
- releasedCodeCount permanece 0;
- proposedCodeChanges=0;
- unresolvedReduced=0;
- nenhum author approval real registrado;
- nenhum downstream aberto;
- nenhum fixture/baseline/codigo alterado.

P-axis candidates empacotados:
- REAL-EVENT-0003 — P-G;
- REAL-EVENT-0015 — P-G;
- N109W — P-G;
- N11NM — P-C.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-84 - Author Decision Intake for P-Axis Micro-Pilot**.

## A4+R-84 - Author Decision Intake for P-Axis Micro-Pilot

Esta fase registrou o intake documental de decisao autoral para os quatro candidatos P-axis do micro-pilot, sem executar release real:

- [P-Axis Micro-Pilot Author Decision Intake A4R84](./SERA_ENGINE_VNEXT_P_AXIS_MICRO_PILOT_AUTHOR_DECISION_INTAKE_A4R84_v0.2.0.md)
- [P-Axis Micro-Pilot Author Decision Tracker A4R84](./release-pilot-author-packets/P_AXIS_MICRO_PILOT_AUTHOR_DECISION_TRACKER_A4R84_v0.2.0.md)
- [Post Author Decision Intake Plan A4R84](./SERA_ENGINE_VNEXT_POST_AUTHOR_DECISION_INTAKE_PLAN_A4R84_v0.2.0.md)

Status por candidato:
- REAL-EVENT-0003 — P-G: PENDING_AUTHOR_DECISION;
- REAL-EVENT-0015 — P-G: PENDING_AUTHOR_DECISION;
- N109W — P-G: PENDING_AUTHOR_DECISION;
- N11NM — P-C: PENDING_AUTHOR_DECISION.

Estado apos A4+R-84:
- decision intake criado;
- 4 packets individuais atualizados com status de intake;
- author decision tracker criado;
- nenhuma decisao autoral explicita foi fornecida no prompt;
- releasedCodeCount permanece 0;
- proposedCodeChanges=0;
- unresolvedReduced=0;
- nenhum downstream aberto;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations criado;
- nenhum fixture/baseline/codigo alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- coletar decisao explicita do autor para cada candidato antes de qualquer fase de release pilot;
- **A4+R-85 - P-Axis Release Pilot Execution** somente se o autor fornecer decisoes explicitas `APPROVE_FOR_FUTURE_RELEASE_PILOT`;
- se os candidatos forem mantidos em hold, priorizar Source Enrichment ou Method Clarification.

## A4+R-85 - P-Axis Release Pilot Execution

Esta fase executou um micro-pilot documental controlado de release somente no eixo P, apos decisao autoral explicita para os quatro candidatos:

- [P-Axis Release Pilot Execution A4R85](./SERA_ENGINE_VNEXT_P_AXIS_RELEASE_PILOT_EXECUTION_A4R85_v0.2.0.md)
- [P-Axis Release Pilot Method Decision A4R85](./SERA_ENGINE_VNEXT_P_AXIS_RELEASE_PILOT_METHOD_DECISION_A4R85_v0.2.0.md)
- [P-Axis Release Pilot Tracker A4R85](./release-pilot/P_AXIS_RELEASE_PILOT_TRACKER_A4R85_v0.2.0.md)
- release docs individuais em `docs/sera-vnext/release-pilot/`.

Estado apos A4+R-85:
- 4 P-axis release pilot docs criados;
- releasedCodeCount documental/piloto = 4;
- O-axis released = 0;
- A-axis released = 0;
- caseLevelClassifications = 0;
- downstreamOpenedCount = 0;
- finalConclusionCount = 0;
- hfacsCount = 0;
- riskCount = 0;
- recommendationsCount = 0;
- fixturePromotionCount = 0;
- baselinePromotionCount = 0;
- proposedCodeChanges = 0;
- unresolvedReduced = 0;
- nenhum selectedCode foi promovido para CLASSIFIED;
- nenhum fixture/baseline/codigo alterado.

Limitacoes do piloto:
- piloto documental;
- eixo P somente;
- sem runtime;
- sem downstream;
- sem classificacao de caso inteiro;
- sem liberacao de O/A.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-86 - P-Axis Release Pilot Audit and Rollback Readiness**.

## A4+R-86 - P-Axis Release Pilot Audit and Rollback Readiness

Esta fase auditou o micro-pilot documental A4+R-85 e preparou a prontidao de rollback/withdrawal sem alterar runtime:

- [P-Axis Release Pilot Audit A4R86](./SERA_ENGINE_VNEXT_P_AXIS_RELEASE_PILOT_AUDIT_A4R86_v0.2.0.md)
- [P-Axis Release Pilot Rollback Readiness A4R86](./SERA_ENGINE_VNEXT_P_AXIS_RELEASE_PILOT_ROLLBACK_READINESS_A4R86_v0.2.0.md)
- [P-Axis Release Traceability Matrix A4R86](./SERA_ENGINE_VNEXT_P_AXIS_RELEASE_TRACEABILITY_MATRIX_A4R86_v0.2.0.md)
- [P-Axis Release Downstream Isolation Check A4R86](./SERA_ENGINE_VNEXT_P_AXIS_RELEASE_DOWNSTREAM_ISOLATION_CHECK_A4R86_v0.2.0.md)
- [P-Axis Release Pilot Tracker A4R85](./release-pilot/P_AXIS_RELEASE_PILOT_TRACKER_A4R85_v0.2.0.md)

Estado apos A4+R-86:
- audit report criado;
- rollback readiness criado;
- traceability matrix criada;
- downstream isolation check criado;
- pAxisReleased permanece 4;
- oAxisReleased = 0;
- aAxisReleased = 0;
- downstreamOpenedCount = 0;
- runtime unchanged;
- proposedCodeChanges = 0;
- unresolvedReduced = 0;
- no selectedCode CLASSIFIED;
- nenhum fixture/baseline/codigo alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-87 - External Source Enrichment Strategy for Released P-Axis Trace Stability**; ou
- **A4+R-87 - Product/Runtime Contract for Released Axis Separation** (docs-only, sem implementacao).

## A4+R-87 - Version External Candidate Discovery Pack

Esta fase versionou no repositorio a curadoria externa ja feita no ChatGPT, sem executar busca primaria nova no Codex:

- [External Candidate Discovery A4R87](./SERA_ENGINE_VNEXT_EXTERNAL_CANDIDATE_DISCOVERY_A4R87_v0.2.0.md)
- [External Report Conclusion Quarantine Protocol A4R87](./SERA_ENGINE_VNEXT_EXTERNAL_REPORT_CONCLUSION_QUARANTINE_PROTOCOL_A4R87_v0.2.0.md)
- [External Harvest Batch 1 Plan A4R87](./SERA_ENGINE_VNEXT_EXTERNAL_HARVEST_BATCH_1_PLAN_A4R87_v0.2.0.md)
- [Released P-Axis External Enrichment Plan A4R87](./SERA_ENGINE_VNEXT_RELEASED_P_AXIS_EXTERNAL_ENRICHMENT_PLAN_A4R87_v0.2.0.md)
- [External Candidate Index A4R87](./external-candidates/EXTERNAL_CANDIDATE_INDEX_A4R87_v0.2.0.md)

Estado apos A4+R-87:
- external candidate discovery versioned;
- 16 candidatos externos curados registrados;
- 12 candidatos shortlisted para Batch 1 externo;
- busca externa primaria executada pelo ChatGPT;
- Codex apenas versionou/organizou no repo;
- nenhum proposedCode criado;
- nenhum novo releasedCode criado;
- nenhum P/O/A novo criado;
- nenhum downstream aberto;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-88 - External Harvest Batch 1 Structured Extraction**, usando somente a shortlist curada.

## A4+R-88 - External Harvest Batch 1 Structured Extraction

Esta fase executou extração factual estruturada para os 12 candidatos externos shortlisted, aplicando protocolo de quarentena de conclusões:

- [External Harvest Batch 1 Structured Extraction Summary A4R88](./SERA_ENGINE_VNEXT_EXTERNAL_HARVEST_BATCH_1_STRUCTURED_EXTRACTION_A4R88_v0.2.0.md)
- [External Batch 1 Gap Coverage Matrix A4R88](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_GAP_COVERAGE_MATRIX_A4R88_v0.2.0.md)
- [External Batch 1 Released P-Axis Linkage A4R88](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_RELEASED_P_AXIS_LINKAGE_A4R88_v0.2.0.md)
- [External Candidate Index A4R87 Updated with A4R88 extraction metadata](./external-candidates/EXTERNAL_CANDIDATE_INDEX_A4R87_v0.2.0.md)
- [External Batch 1 Extractions Folder](./external-candidates/extractions-batch-1/)

Estado apos A4+R-88:
- external Batch 1 structured extraction executado;
- 12 extracoes criadas;
- gap coverage matrix criada;
- released P-axis linkage criado;
- nenhum P/O/A novo criado;
- nenhum proposedCode criado;
- nenhum novo releasedCode criado;
- nenhum downstream aberto;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-89 - External Batch 1 Evidence Normalization and Internal Trace Anchoring** (docs-only, sem classificacao SERA).

## A4+R-89 - External Batch 1 Evidence Normalization and Internal Trace Anchoring

Esta fase normalizou as 12 extracoes externas do Batch 1 em categorias comuns de evidencia e preparou ancoragem de trace interno sem classificar eventos:

- [External Batch 1 Evidence Normalization A4R89](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_EVIDENCE_NORMALIZATION_A4R89_v0.2.0.md)
- [External Batch 1 Trace Anchoring A4R89](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_TRACE_ANCHORING_A4R89_v0.2.0.md)
- [External Batch 1 Adjudication Readiness A4R89](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_ADJUDICATION_READINESS_A4R89_v0.2.0.md)
- [External Batch 1 Internal Trace Linkage A4R89](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_INTERNAL_TRACE_LINKAGE_A4R89_v0.2.0.md)
- [External Batch 1 Next Phase Plan A4R89](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_NEXT_PHASE_PLAN_A4R89_v0.2.0.md)

Estado apos A4+R-89:
- evidence normalization criada;
- trace anchoring criado;
- adjudication readiness criado;
- internal trace linkage criado;
- next phase plan criado;
- READY_FOR_FUTURE_ADJUDICATION = 7;
- NEEDS_SOURCE_RECHECK = 3;
- ENRICHMENT_ONLY = 1;
- ADVERSARIAL_CONTROL_ONLY = 1;
- nenhum P/O/A novo criado;
- nenhum proposedCode criado;
- nenhum novo releasedCode criado;
- nenhum downstream aberto;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-90 - External Batch 1 AI/Author Adjudication Pilot for Ready Cases** (docs-only, com escopo pequeno e quarentena preservada).

## A4+R-90 - External Batch 1 AI/Author Adjudication Pilot for Ready Cases

Esta fase criou drafts documentais de adjudicacao AI/Author para os 7 casos externos marcados como READY_FOR_FUTURE_ADJUDICATION em A4+R-89:

- [External Batch 1 AI/Author Adjudication Pilot Summary A4R90](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_AI_AUTHOR_ADJUDICATION_PILOT_A4R90_v0.2.0.md)
- [External Batch 1 Adjudication Tracker A4R90](./external-candidates/adjudications-batch-1/EXTERNAL_BATCH_1_ADJUDICATION_TRACKER_A4R90_v0.2.0.md)
- [External Batch 1 Adjudication Backlog A4R90](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_ADJUDICATION_BACKLOG_A4R90_v0.2.0.md)
- [External Batch 1 Adjudications Folder](./external-candidates/adjudications-batch-1/)

Estado apos A4+R-90:
- 7 external adjudication drafts criados;
- proposedPAxes = 5;
- proposedOAxes = 1;
- proposedAAxes = 0;
- unresolvedPAxes = 2;
- unresolvedOAxes = 6;
- unresolvedAAxes = 7;
- releasedCodeCount = 0;
- downstreamOpenedCount = 0;
- conclusoes externas preservadas em quarentena;
- nenhum finalConclusion/HFACS/Risk/ERC/recommendations criado;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-91 - External Batch 1 Author Review and Source-Slicing Plan** (docs-only, revisar os 6 eixos propostos e enriquecer o caso unresolved-only).

## A4+R-91 - External Batch 1 Author Review and Source-Slicing Plan

Esta fase revisou documentalmente os 7 adjudication drafts externos da A4+R-90 e preparou plano de source-slicing sem qualquer acao de release:

- [External Batch 1 Author Review Matrix A4R91](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_AUTHOR_REVIEW_MATRIX_A4R91_v0.2.0.md)
- [External Batch 1 Source-Slicing Plan A4R91](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_SOURCE_SLICING_PLAN_A4R91_v0.2.0.md)
- [External Batch 1 Release Impact Watchlist A4R91](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_RELEASE_IMPACT_WATCHLIST_A4R91_v0.2.0.md)
- [External Batch 1 Adjudication Metrics A4R91](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_ADJUDICATION_METRICS_A4R91_v0.2.0.md)
- [External Batch 1 Next Phase Decision A4R91](./SERA_ENGINE_VNEXT_EXTERNAL_BATCH_1_NEXT_PHASE_DECISION_A4R91_v0.2.0.md)

Estado apos A4+R-91:
- author review matrix criada;
- source-slicing plan criado;
- release impact watchlist criado;
- external adjudication metrics criadas;
- next phase decision criada;
- nenhum releasedCode criado;
- nenhum downstream aberto;
- quarentena de conclusoes externas preservada;
- nenhum finalConclusion/HFACS/Risk/ERC/recommendations criado;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-92 - Source-Slicing Sprint for External Unresolved Axes**, com shortlist pequeno de author review em paralelo para casos prontos.

## A4+R-92 - Register Retrospective Author Review Decisions for P-Axis Releases

Esta fase registrou revisao autoral retroativa dos 4 releases documentais/piloto do eixo P e aplicou withdrawal documental controlado para 3 deles:

- [P-Axis Release Retrospective Author Review A4R92](./SERA_ENGINE_VNEXT_P_AXIS_RELEASE_RETROSPECTIVE_AUTHOR_REVIEW_A4R92_v0.2.0.md)
- [P-Axis Release Withdrawal A4R92](./SERA_ENGINE_VNEXT_P_AXIS_RELEASE_WITHDRAWAL_A4R92_v0.2.0.md)
- [P-Axis Release Post-Review Status A4R92](./SERA_ENGINE_VNEXT_P_AXIS_RELEASE_POST_REVIEW_STATUS_A4R92_v0.2.0.md)
- [Post Retrospective Review Next Phase A4R92](./SERA_ENGINE_VNEXT_POST_RETROSPECTIVE_REVIEW_NEXT_PHASE_A4R92_v0.2.0.md)
- [P-Axis Release Pilot Tracker A4R85](./release-pilot/P_AXIS_RELEASE_PILOT_TRACKER_A4R85_v0.2.0.md) atualizado com status efetivo apos revisao.

Estado apos A4+R-92:
- retrospective author review recorded;
- maintainedAfterReview = 1;
- withdrawnAfterReview = 3;
- effectivePReleasedAfterA4R92 = 1;
- oAxisReleased = 0;
- aAxisReleased = 0;
- downstreamOpenedCount = 0;
- runtimeChanges = 0;
- fixtureChanges = 0;
- baselineChanges = 0;
- nenhum finalConclusion/HFACS/Risk/ERC/recommendations criado;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-93 - Author Approval Dossier Format Standardization**, para endurecer gate de aprovacao antes de qualquer novo release pilot.

## A4+R-93 - Author Approval Dossier Format Standardization + Solid Event Priority Policy

Esta fase padronizou governanca de decisao autoral simples e priorizacao metodologica de eventos solidos:

- [Author Approval Dossier Standard A4R93](./SERA_ENGINE_VNEXT_AUTHOR_APPROVAL_DOSSIER_STANDARD_A4R93_v0.2.0.md)
- [Author Approval Dossier Template A4R93](./SERA_ENGINE_VNEXT_AUTHOR_APPROVAL_DOSSIER_TEMPLATE_A4R93_v0.2.0.md)
- [Solid Event Priority Policy A4R93](./SERA_ENGINE_VNEXT_SOLID_EVENT_PRIORITY_POLICY_A4R93_v0.2.0.md)
- [Ambiguous Case Parking Policy A4R93](./SERA_ENGINE_VNEXT_AMBIGUOUS_CASE_PARKING_POLICY_A4R93_v0.2.0.md)
- [Current Case Priority Review A4R93](./SERA_ENGINE_VNEXT_CURRENT_CASE_PRIORITY_REVIEW_A4R93_v0.2.0.md)
- [Post Dossier Standard Next Phase A4R93](./SERA_ENGINE_VNEXT_POST_DOSSIER_STANDARD_NEXT_PHASE_A4R93_v0.2.0.md)

Estado apos A4+R-93:
- author approval dossier standard criado;
- author approval dossier template criado;
- solid event priority policy criada;
- ambiguous case parking policy criada;
- current case priority review criado;
- nenhum release novo;
- nenhum downstream aberto;
- nenhum finalConclusion/HFACS/Risk/ERC/recommendations criado;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-94 - ChatGPT Solid Event Discovery Batch 2**, com apoio opcional do Perplexity Pro apenas para localizar fontes oficiais quando necessario.

## A4+R-94 - Reference Case Calibration Trace Design

Esta fase definiu o desenho documental e o contrato metodologico para futuros reference case calibration traces:

- [Reference Case Calibration Trace Contract A4R94](./SERA_ENGINE_VNEXT_REFERENCE_CASE_CALIBRATION_TRACE_CONTRACT_A4R94_v0.2.0.md)
- [Reference Case Calibration Trace Template A4R94](./SERA_ENGINE_VNEXT_REFERENCE_CASE_CALIBRATION_TRACE_TEMPLATE_A4R94_v0.2.0.md)
- [Reference Case Candidate Shortlist A4R94](./SERA_ENGINE_VNEXT_REFERENCE_CASE_CANDIDATE_SHORTLIST_A4R94_v0.2.0.md)
- [Reference Case Trace Pack Plan A4R94](./SERA_ENGINE_VNEXT_REFERENCE_CASE_TRACE_PACK_PLAN_A4R94_v0.2.0.md)
- [Reference Case Frontend Display Notes A4R94](./SERA_ENGINE_VNEXT_REFERENCE_CASE_FRONTEND_DISPLAY_NOTES_A4R94_v0.2.0.md)
- [Post Reference Trace Design Next Phase A4R94](./SERA_ENGINE_VNEXT_POST_REFERENCE_TRACE_DESIGN_NEXT_PHASE_A4R94_v0.2.0.md)

Estado apos A4+R-94:
- reference case trace contract criado;
- reference case trace template criado;
- reference case candidate shortlist criada;
- reference case trace pack plan criado;
- reference case frontend display notes criadas;
- nenhum release novo;
- nenhum downstream aberto;
- nenhum finalConclusion/HFACS/Risk/ERC/recommendations criado;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-95 - Build First Reference Case Trace Pack for REAL-EVENT-0003**.

## A4+R-95 - Build First Reference Case Trace Pack for REAL-EVENT-0003

Esta fase materializou o primeiro reference case calibration trace pack completo:

- [Reference Case Trace REAL-EVENT-0003 P-G A4R95 (archived)](./archive/invalid-methodology/pre-canonical/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md)
- [Reference Case Trace Pack RC1 Summary A4R95](./SERA_ENGINE_VNEXT_REFERENCE_CASE_TRACE_PACK_RC1_A4R95_v0.2.0.md)
- [Reference Case Candidate Shortlist A4R94](./SERA_ENGINE_VNEXT_REFERENCE_CASE_CANDIDATE_SHORTLIST_A4R94_v0.2.0.md) atualizado com status de pack criado.
- [Reference Case Trace Pack Plan A4R94](./SERA_ENGINE_VNEXT_REFERENCE_CASE_TRACE_PACK_PLAN_A4R94_v0.2.0.md) atualizado com execucao A4+R-95.

Estado apos A4+R-95:
- first reference case trace pack created (REAL-EVENT-0003 / P-G maintained);
- no new release created;
- no downstream opened;
- front-end future use notes preserved in trace structure;
- nenhum finalConclusion/HFACS/Risk/ERC/recommendations criado;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- **A4+R-96 - Supersede Noncanonical Reference Trace and Recover Canonical SERA Tree**.

## A4+R-96 - Supersede Noncanonical Reference Trace and Recover Canonical SERA Tree

Esta fase corrigiu governanca metodologica de reference trace apos feedback autoral direto de nao conformidade:

- [A4R95 Noncanonical Trace Error Audit A4R96](./SERA_ENGINE_VNEXT_A4R95_NONCANONICAL_TRACE_ERROR_AUDIT_A4R96_v0.2.0.md)
- [Canonical SERA Tree Source Inventory A4R96](./SERA_ENGINE_VNEXT_CANONICAL_SERA_TREE_SOURCE_INVENTORY_A4R96_v0.2.0.md)
- [Canonical Tree Reference Trace Contract A4R96](./SERA_ENGINE_VNEXT_CANONICAL_TREE_REFERENCE_TRACE_CONTRACT_A4R96_v0.2.0.md)
- [Rebuild Plan REAL-EVENT-0003 Canonical Trace A4R96](./SERA_ENGINE_VNEXT_REBUILD_REAL_EVENT_0003_CANONICAL_TRACE_PLAN_A4R96_v0.2.0.md)
- [Reference Case Trace REAL-EVENT-0003 P-G A4R95 (archived)](./archive/invalid-methodology/pre-canonical/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md) marcado como `SUPERSEDED / INVALID_FOR_REFERENCE_USE`.

Estado apos A4+R-96:
- erro metodologico registrado: `NONCANONICAL_QUESTION_FLOW`;
- A4R95 invalidado para uso de referencia/calibracao/front-end;
- release REAL-EVENT-0003 P-G mantido sem alteracao;
- nenhum release novo;
- nenhum downstream aberto;
- nenhum finalConclusion/HFACS/Risk/ERC/recommendations criado;
- nenhum fixture/baseline/codigo/runtime/UI/API/DB alterado;
- arvore canonica O/P/A confirmada (`FOUND_COMPLETE`) nas fontes Hendy/Daumas;
- proxima fase: rebuild canônico de REAL-EVENT-0003 com perguntas exatas da arvore.

## A4+R-97 - Canonical Reaudit Sweep Across All Events

Esta fase executou varredura canônica documental de todo o conjunto atualmente rastreado:

- [Canonical Reaudit Sweep All Events A4R97](./SERA_ENGINE_VNEXT_CANONICAL_REAUDIT_SWEEP_ALL_EVENTS_A4R97_v0.2.0.md)

Cobertura registrada:
- 30 real events (tracker consolidado A4R78);
- 7 candidatos externos (tracker A4R90);
- total 37 casos revisados sob guardrails canônicos A4R96.

Estado após A4+R-97:
- nenhuma mudança em release/runtime/downstream;
- REAL-EVENT-0003 mantido como prioridade de rebuild canônico;
- casos withdrawn A4R92 mantidos (REAL-EVENT-0015, N109W, N11NM);
- novos high-potential candidates identificados para trilha de referência canônica após rebuild principal.

O candidate freeze final continua não autorizado.

## A4+R-98 - Canonical Contamination Cleanup and Governance Lock

Esta fase executou limpeza ampla de contaminação canônica em artefatos vNext de referência/calibração:

- [Canonical Contamination Audit A4R98](./SERA_ENGINE_VNEXT_CANONICAL_CONTAMINATION_AUDIT_A4R98_v0.2.0.md)
- [Invalid Reference Artifact Register A4R98](./SERA_ENGINE_VNEXT_INVALID_REFERENCE_ARTIFACT_REGISTER_A4R98_v0.2.0.md)
- [Post Cleanup Rebuild Plan A4R98](./SERA_ENGINE_VNEXT_POST_CONTAMINATION_CLEANUP_REBUILD_PLAN_A4R98_v0.2.0.md)

Estado após A4+R-98:
- A4R95 permanece invalidado para uso de referência/front-end;
- A4R97 permanece como triagem/candidate review, não como trace canônico;
- nenhum reference case é considerado válido para front-end calibration até rebuild canônico completo;
- nova trava de sequência: A4+R-99 (asset pack canônico) é pré-condição para rebuild de eventos.

O candidate freeze final continua não autorizado.

## A4+R-99 - SERA Terminology Correction and Canonical Question Tree Asset Pack

Esta fase normalizou a terminologia para SERA e criou o primeiro asset canônico estruturado da árvore:

- [SERA Terminology Correction A4R99](./SERA_ENGINE_VNEXT_SERA_TERMINOLOGY_CORRECTION_A4R99_v0.2.0.md)
- [Canonical Question Tree Asset A4R99](./SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md)
- [Canonical Tree Coverage Matrix A4R99](./SERA_ENGINE_VNEXT_CANONICAL_TREE_COVERAGE_MATRIX_A4R99_v0.2.0.md)
- [Canonical Trace Validation Checklist A4R99](./SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md)

Estado após A4+R-99:
- terminologia governança normalizada para SERA;
- asset canônico de perguntas O/P/A disponível;
- nenhum evento reanalisado nesta fase;
- nenhum release/downstream/runtime alterado;
- A4+R-100 pode iniciar rebuild de REAL-EVENT-0003 apenas se o caminho necessário passar no checklist canônico.

O candidate freeze final continua não autorizado.

## A4+R-100 - Rebuild REAL-EVENT-0003 Canonical Reference Trace

Esta fase executou o rebuild canônico do reference case REAL-EVENT-0003 usando exclusivamente o asset A4R99:

- [Canonical Reference Trace REAL-EVENT-0003 P-G A4R100](./reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md)
- [REAL-EVENT-0003 Canonical Reference Rebuild Summary A4R100](./SERA_ENGINE_VNEXT_REAL_EVENT_0003_CANONICAL_REFERENCE_REBUILD_A4R100_v0.2.0.md)

Estado após A4+R-100:
- A4R95 permanece invalidado/superseded para uso de referência;
- A4R100 passa a replacement canônico com `validationStatus = PASS_WITH_LIMITATIONS`;
- resultado mantido no reference: `P-G`;
- O-axis e A-axis não liberados neste reference trace;
- nenhum release novo criado;
- nenhum downstream aberto;
- nenhum finalConclusion/HFACS/Risk/ERC/recommendations criado;
- nenhum fixture/baseline/código/runtime/UI/API/DB alterado.

Próxima fase recomendada:
- **A4+R-101 — Canonical withdrawn/boundary pack rebuild**.
- Como `PASS_WITH_LIMITATIONS`, revisão autoral adicional é recomendada antes de uso front-end como material de aprendizagem.

O candidate freeze final continua não autorizado.

## A4+R-101 — Canonical Methodology Recovery and Event Reclassification Sweep

Esta fase executou consolidação macro pós-contaminação com escopo estritamente documental:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_METHOD_RECOVERY_A4R101_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_ALL_TRACKED_EVENTS_CANONICAL_STATUS_MATRIX_A4R101_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_POST_RECOVERY_MACRO_ROADMAP_A4R101_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_PRIORITIZED_WORK_QUEUE_A4R101_v0.2.0.md`

Registro de estado A4+R-101:
- macro recovery completed: yes
- A4R95 remains invalid/superseded: yes
- A4R100 canonical replacement exists: yes (`PASS_WITH_LIMITATIONS`)
- new release created: no
- downstream opened: no
- freeze final authorized: no

Diretriz de sequência:
- a próxima execução deve seguir macroblocos consolidados (estabilização canônica, sweep canônico em lote, expansão sólida e contrato front-end), evitando micro-revisão isolada por evento, exceto review autoral direto em chat quando necessário.

## A4+R-102 — Block 1 Canonical Reference Stabilization

Esta fase executou o Block 1 completo em escopo técnico documental:
- [Block 1 Stabilization Summary A4R102](./SERA_ENGINE_VNEXT_BLOCK1_CANONICAL_REFERENCE_STABILIZATION_A4R102_v0.2.0.md)
- [Canonical Withdrawn Boundary Pack A4R102](./reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-CANONICAL-A4R102.md)

Registro de estado A4+R-102:
- A4R100 status mantido: `PASS_WITH_LIMITATIONS`
- A4R100 front-end readiness: `AUTHOR_REVIEW_REQUIRED_BEFORE_FRONTEND`
- A4R102 boundary pack status: `REVIEW_REQUIRED`
- A4R102 front-end readiness: `NOT_READY_AUTHOR_REVIEW_REQUIRED`
- A4R95 e A4R96 pre-canonical artifacts: permanecem inválidos para proof/front-end
- new release created: no
- release restoration of withdrawn trio: no
- downstream opened: no

Block 1 outcome:
- `BLOCK1_TECHNICAL_DOCS_COMPLETE_AUTHOR_REVIEW_PENDING`

Próxima ação macro:
- avançar para Block 2 screening em lote sem gate autoral;
- usar review autoral somente depois que trace candidates forem construídos e propostos para promoção.

## A4+R-103 — Block 2 Canonical Event Screening

Esta fase executou screening canônico em lote, sem aprovação autoral e sem promoção de artifacts:
- [Block 2 Canonical Event Screening A4R103](./SERA_ENGINE_VNEXT_BLOCK2_CANONICAL_EVENT_SCREENING_A4R103_v0.2.0.md)
- [All Events Screening Matrix A4R103](./SERA_ENGINE_VNEXT_ALL_EVENTS_SCREENING_MATRIX_A4R103_v0.2.0.md)
- [Solid Reference Candidate Shortlist A4R103](./SERA_ENGINE_VNEXT_SOLID_REFERENCE_CANDIDATE_SHORTLIST_A4R103_v0.2.0.md)
- [Parked Boundary and Ambiguous Events A4R103](./SERA_ENGINE_VNEXT_PARKED_BOUNDARY_AND_AMBIGUOUS_EVENTS_A4R103_v0.2.0.md)

Registro de estado A4+R-103:
- corpus screened: 46 rows;
- strong reference candidates: 8;
- author approval required for screening: no;
- new release created: no;
- downstream opened: no;
- freeze final authorized: no.

Próxima ação macro:
- escolher 3-5 candidatos fortes para canonical trace build;
- review autoral somente depois dos trace candidates, se houver proposta de promoção para reference/front-end/proof/release.

## A4+R-104 — Canonical Trace Draft Batch for Strong Candidates

Esta fase construiu um lote único de trace drafts canônicos a partir da shortlist A4R103, usando exclusivamente o asset canônico A4R99:
- [Canonical Trace Draft Batch A4R104](./SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_A4R104_v0.2.0.md)
- [Canonical Trace Draft Batch Gaps A4R104](./SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_GAPS_A4R104_v0.2.0.md)
- [Trace Draft REAL-EVENT-0016 A4R104](./reference-case-traces/REFERENCE-CASE-REAL-EVENT-0016-CANONICAL-DRAFT-A4R104.md)
- [Trace Draft BS211-Q400 A4R104](./reference-case-traces/REFERENCE-CASE-BS211-Q400-CANONICAL-DRAFT-A4R104.md)
- [Trace Draft EXT-002 A4R104](./reference-case-traces/REFERENCE-CASE-EXT-002-CANONICAL-DRAFT-A4R104.md)

Registro de estado A4+R-104:
- candidates in batch: 3 (`REAL-EVENT-0016`, `BS211-Q400`, `EXT-002`);
- trace drafts created: 3;
- validation status: all 3 as `PASS_WITH_LIMITATIONS`;
- author approval used in this phase: no;
- new release created: no;
- downstream opened: no;
- frontend readiness after batch: `NOT_READY_AUTHOR_REVIEW_REQUIRED`;
- freeze final authorized: no.

Próxima ação macro:
- se pelo menos 2 drafts mantiverem `PASS_WITH_LIMITATIONS` ou melhor após revisão de consistência, preparar bundle único de review autoral;
- se menos de 2 drafts passarem, executar source-slice expansion antes de qualquer bundle de review.

## A4+R-105 — ChatGPT Curated Official Report Shortlist and Next Trace Batch Plan

Esta fase registrou curadoria técnica de fontes oficiais e replanejou a próxima rodada de trace drafts:
- [Curated Source Inventory A4R105](./SERA_ENGINE_VNEXT_CURATED_SOURCE_INVENTORY_A4R105_v0.2.0.md)
- [A4R104 Hold and Official Report Strategy A4R105](./SERA_ENGINE_VNEXT_A4R104_HOLD_AND_OFFICIAL_REPORT_STRATEGY_A4R105_v0.2.0.md)
- [ChatGPT Curated Official Report Shortlist A4R105](./SERA_ENGINE_VNEXT_CHATGPT_CURATED_OFFICIAL_REPORT_SHORTLIST_A4R105_v0.2.0.md)
- [Next Canonical Trace Batch Plan A4R105](./SERA_ENGINE_VNEXT_NEXT_CANONICAL_TRACE_BATCH_PLAN_A4R105_v0.2.0.md)
- [A4R104 vs Curated Official Reports Comparison A4R105](./SERA_ENGINE_VNEXT_A4R104_VS_CURATED_OFFICIAL_REPORTS_COMPARISON_A4R105_v0.2.0.md)

Registro de estado A4+R-105:
- A4R104 status: `HELD_EXPLORATORY` (valid and retained, not invalidated);
- curated official shortlist completed: yes (top-10 registered);
- top-3 selected for A4R106: `ASIANA-214`, `COMAIR-5191`, `KOREAN-801`;
- no author approval used in this phase;
- no release created;
- no downstream opened;
- frontend readiness remains not ready for promotion;
- freeze final authorized: no.

Próxima ação macro:
- executar A4R106 para construir três canonical trace drafts a partir do top-3 oficial curado;
- manter A4R104 como fallback exploratório para rodada posterior de source-slice, sem promoção nesta etapa.

## A4+R-106 — Canonical Trace Drafts from Curated Official Top-3

Esta fase construiu três trace drafts canônicos a partir de relatórios oficiais locais:
- [Batch Summary A4R106](./SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_A4R106_v0.2.0.md)
- [Batch Gaps A4R106](./SERA_ENGINE_VNEXT_CANONICAL_TRACE_DRAFT_BATCH_GAPS_A4R106_v0.2.0.md)
- [Cross-case Consistency A4R106](./SERA_ENGINE_VNEXT_A4R106_CROSS_CASE_CONSISTENCY_REVIEW_v0.2.0.md)
- [Trace Draft ASIANA-214 A4R106](./reference-case-traces/REFERENCE-CASE-ASIANA-214-CANONICAL-DRAFT-A4R106.md)
- [Trace Draft COMAIR-5191 A4R106](./reference-case-traces/REFERENCE-CASE-COMAIR-5191-CANONICAL-DRAFT-A4R106.md)
- [Trace Draft KOREAN-801 A4R106](./reference-case-traces/REFERENCE-CASE-KOREAN-801-CANONICAL-DRAFT-A4R106.md)

Registro de estado A4+R-106:
- source slice status: 3/3 `ADEQUATE_FOR_TRACE_DRAFT`;
- validation status: 3/3 `PASS_WITH_LIMITATIONS`;
- author approval used in this phase: no;
- new release created: no;
- downstream opened: no;
- frontend readiness: `NOT_READY_AUTHOR_REVIEW_REQUIRED`.

Próxima ação macro:
- preparar um único bundle de review autoral para o lote A4R106;
- manter promoção/release/downstream fechados até decisão pós-review.

## A4+R-105b — Official Report Corpus Local Archive and Extraction Prep

This phase consolidated the curated official-report corpus locally and prepared extraction artifacts:
- local archive manifest created;
- attachment-PDF discovery/download completed for local HTML sources when available;
- PDF/HTML to TXT conversion completed with extraction index and search index.

Status controls for A4R105b:
- no SERA classification performed;
- no author approval requested;
- no release created;
- no downstream opened.

## A4+R-107 — Canonical Trace Quality Audit and Review Bundle

This phase prepared quality-audit and author-review artifacts for the A4R106 top-3 drafts:
- canonical quality audit;
- node-level evidence matrix;
- self-contained author review bundle;
- post-review gate plan.

A4R107 controls:
- author approval requested in repository: no;
- release created: no;
- downstream opened: no;
- front-end promotion: no.

## A4+R-108 — Chat Author Review Bundle Prep

This phase prepared the chat review package and intake placeholder for eligible A4R106 cases.

A4R108 controls:
- author review performed: no;
- author decision recorded: no;
- release created: no;
- downstream opened: no.

Included in bundle:
- COMAIR-5191
- KOREAN-801

Excluded from approval bundle:
- ASIANA-214 (pending review/source-slice refinement pathway)

## A4+R-109 — Register Chat Author Decisions for A4R106 Eligible Cases

This phase recorded chat-based author decisions for eligible A4R106 cases:
- COMAIR-5191: approved with limitations (`P-G` internal draft);
- KOREAN-801: approved with limitations (`P-F` internal boundary draft);
- ASIANA-214: not reviewed in A4R109 and remains `REVIEW_REQUIRED`.

A4R109 controls:
- releases created: none;
- downstream opened: none;
- O/A closure: none;
- baseline/front-end promotion: none.

## A4+R-110 — Objective and Action Expansion Feasibility for Approved P References

This phase evaluated only O/A feasibility for approved P internal references, without O/A closure:
- [Objective Action Feasibility A4R110](./SERA_ENGINE_VNEXT_OBJECTIVE_ACTION_FEASIBILITY_A4R110_v0.2.0.md)
- [Objective Action Source Gaps A4R110](./SERA_ENGINE_VNEXT_OBJECTIVE_ACTION_SOURCE_GAPS_A4R110_v0.2.0.md)
- [P O A Boundary Review A4R110](./SERA_ENGINE_VNEXT_P_O_A_BOUNDARY_REVIEW_A4R110_v0.2.0.md)

Readiness impact:
- COMAIR-5191:
  - objective: `O_SOURCE_SLICE_REQUIRED`
  - action: `A_SOURCE_SLICE_REQUIRED`
- KOREAN-801:
  - objective: `O_UNRESOLVED`
  - action: `A_UNRESOLVED`
- ASIANA-214: unchanged `REVIEW_REQUIRED` (outside A4R110 expansion scope)

A4R110 controls:
- no O/A axis closure;
- no release created;
- no downstream opened;
- no baseline/front-end promotion.

## A4+R-111 — Full-Axis Reference Candidate Rebalancing

This phase corrected reference-governance scope from P-focused internal drafts to explicit P/O/A requirement:
- [Full Axis Scope Correction A4R111](./SERA_ENGINE_VNEXT_FULL_AXIS_REFERENCE_SCOPE_CORRECTION_A4R111_v0.2.0.md)
- [A4R105 Shortlist Full-Axis Coverage A4R111](./SERA_ENGINE_VNEXT_A4R105_SHORTLIST_FULL_AXIS_COVERAGE_A4R111_v0.2.0.md)
- [Axis-Balanced Candidate Matrix A4R111](./SERA_ENGINE_VNEXT_AXIS_BALANCED_REFERENCE_CANDIDATE_MATRIX_A4R111_v0.2.0.md)
- [Official Reserve O/A Screening A4R111](./SERA_ENGINE_VNEXT_OFFICIAL_RESERVE_O_A_SCREENING_A4R111_v0.2.0.md)
- [Next Full-Axis Trace Batch Plan A4R111](./SERA_ENGINE_VNEXT_NEXT_FULL_AXIS_TRACE_BATCH_PLAN_A4R111_v0.2.0.md)

Readiness impact:
- COMAIR-5191 and KOREAN-801 remain approved as P-only internal drafts;
- these approvals are not invalidated, but they do not satisfy full-reference P/O/A completeness;
- next draft batch must be selected for balanced P/O/A documentation from the start.

A4R111 controls:
- no P/O/A closure;
- no release created;
- no downstream opened;
- no baseline/front-end promotion.

## A4+R-113 — Repository Methodology Cleanup and Corpus Hygiene

This phase executed repository-level methodology cleanup and corpus hygiene without changing engine/runtime/UI/API/DB scope:
- [Repository Methodology Cleanup Audit A4R113](./SERA_ENGINE_VNEXT_REPOSITORY_METHODOLOGY_CLEANUP_AUDIT_A4R113_v0.2.0.md)
- [Corpus Versioning Policy A4R113](./SERA_ENGINE_VNEXT_CORPUS_VERSIONING_POLICY_A4R113_v0.2.0.md)
- [Active Source Index A4R113](./SERA_ENGINE_VNEXT_ACTIVE_SOURCE_INDEX_A4R113_v0.2.0.md)

Readiness impact:
- active canonical sources are explicitly indexed and locked;
- invalid/pre-canonical artifacts moved to archive with non-active header;
- corpus versioning boundary defined (TXT/CSV/manifests versioned; PDF/HTML local-only);
- next macro step remains A4R112 full-corpus mining.

A4R113 controls:
- no P/O/A closure;
- no release created;
- no downstream opened;
- no baseline/front-end promotion.

## A4+R-112 — Full Official Report Corpus Mining and P/O/A Candidate Selection

This phase mined the combined A4R111 corpus (two 50-candidate feeds) using archived manifests and extracted TXT files, with selection constrained to full-axis P/O/A planning:
- [Official Report Corpus Audit A4R112](./SERA_ENGINE_VNEXT_OFFICIAL_REPORT_CORPUS_AUDIT_A4R112_v0.2.0.md)
- [Full Corpus Unified Candidate Index A4R112](./SERA_ENGINE_VNEXT_FULL_CORPUS_UNIFIED_CANDIDATE_INDEX_A4R112_v0.2.0.md)
- [Full Corpus P/O/A Signal Mining A4R112](./SERA_ENGINE_VNEXT_FULL_CORPUS_POA_SIGNAL_MINING_A4R112_v0.2.0.md)
- [Full Corpus P/O/A Candidate Matrix A4R112](./SERA_ENGINE_VNEXT_FULL_CORPUS_POA_CANDIDATE_MATRIX_A4R112_v0.2.0.md)
- [Axis-Balanced Shortlist A4R112](./SERA_ENGINE_VNEXT_AXIS_BALANCED_SHORTLIST_A4R112_v0.2.0.md)
- [Next Full-Axis Trace Batch Plan A4R112](./SERA_ENGINE_VNEXT_NEXT_FULL_AXIS_TRACE_BATCH_PLAN_A4R112_v0.2.0.md)

Readiness impact:
- combined pool audited: 96 candidates;
- downloaded official reports: 59;
- TXT extractions usable for mining: 57;
- COMAIR-5191 and KOREAN-801 remain P-only internal/boundary drafts and are not treated as complete full-axis references;
- next full-axis batch selection is updated from corpus-wide mining evidence.

A4R112 controls:
- no P/O/A closure;
- no release created;
- no downstream opened;
- no baseline/front-end promotion.

## A4+R-114 — Reconcile A4R112/A4R113 History and Prepare Full-Axis Trace Batch

This phase reconciled history and governance alignment between A4R113 cleanup/hygiene and A4R112 corpus mining outputs:
- [A4R112/A4R113 Reconciliation A4R114](./SERA_ENGINE_VNEXT_A4R112_A4R113_RECONCILIATION_A4R114_v0.2.0.md)

Readiness impact:
- A4R113 commit and A4R112 commit are both contained in `HEAD` with linear sequence (`b3ad94c` -> `702e8c0`);
- active source index now explicitly includes A4R112 mining outputs;
- next macro action remains full-axis trace batch from A4R112 selection:
  - `UC-003` UPS-1354
  - `UC-004` AMERICAN-1420
  - `UC-002` ASIANA-214
  - `UC-001` COLGAN-3407
  - `UC-039` US AIRWAYS 1549
- COMAIR-5191 and KOREAN-801 remain P-only internal/boundary drafts, not complete reference cases.

A4R114 controls:
- no P/O/A closure;
- no release created;
- no downstream opened;
- no baseline/front-end promotion.

## A4+R-115 — Expanded Full-Axis Trace Candidate Build

Esta fase executou construção expandida de candidatos full-axis a partir do corpus A4R112, sem release/downstream:
- 10 eventos source-sliced em `docs/sera-vnext/official-report-source-slices/a4r115/`
- 6 traces full-axis em `docs/sera-vnext/reference-case-traces/*A4R115*.md`
- 4 eventos mantidos como `HELD_SOURCE_INSUFFICIENT`, `HELD_OVERCLASSIFICATION_RISK` ou `BOUNDARY_ONLY`

Estado metodológico após A4R115:
- P/O/A foi documentado em todos os traces full-axis construídos.
- Não houve fechamento oficial P/O/A, release, ou baseline promotion.
- `COMAIR-5191` e `KOREAN-801` permanecem P-only/internal boundary e não são reference cases completos.
- Casos com maior prontidão para review bundle: `UPS-1354`, `AMERICAN-1420`, `COLGAN-3407`, `US AIRWAYS 1549`.
- Casos mantidos em `REVIEW_REQUIRED`: `ASIANA-214`, `AMERICAN-965`.

Readiness gate após A4R115:
- Há massa crítica para um único author-review bundle full-axis (>=3 casos úteis).
- Freeze final continua não autorizado.

## A4+R-116 — Recovered Corpus Integration and A4R115 Method QA

Esta fase integrou metadata e TXT recuperados pelo DeepSeek e executou QA metodológico independente dos trace drafts A4R115:
- [Recovered Corpus Integration A4R116](./SERA_ENGINE_VNEXT_RECOVERED_CORPUS_INTEGRATION_A4R116_v0.2.0.md)
- [Recovered Corpus Impact on A4R115 A4R116](./SERA_ENGINE_VNEXT_RECOVERED_CORPUS_IMPACT_ON_A4R115_A4R116_v0.2.0.md)
- [A4R115 Full-Axis Trace Method QA A4R116](./SERA_ENGINE_VNEXT_A4R115_FULL_AXIS_TRACE_METHOD_QA_A4R116_v0.2.0.md)
- [A4R115 Review Bundle Eligibility Audit A4R116](./SERA_ENGINE_VNEXT_A4R115_REVIEW_BUNDLE_ELIGIBILITY_AUDIT_A4R116_v0.2.0.md)
- [A4R115 Review-Required Cases Audit A4R116](./SERA_ENGINE_VNEXT_A4R115_REVIEW_REQUIRED_CASES_AUDIT_A4R116_v0.2.0.md)
- [A4R115 Held Boundary Audit A4R116](./SERA_ENGINE_VNEXT_A4R115_HELD_BOUNDARY_AUDIT_A4R116_v0.2.0.md)

Corpus outcome:
- 10 recovered TXT files with usable content incorporated as `ACTIVE_CORPUS_SUPPLEMENT`.
- 2 recovered scanned/empty TXT placeholders kept local-only as OCR deferred.
- 8 ATSB network-blocked cases, 4 official URL/download-failed cases, 7 secondary-source-only cases, 2 not-found cases, and 8 source-recheck cases remain deferred.

A4R115 QA outcome:
- `UPS-1354`, `COLGAN-3407`, and `US-AIRWAYS-1549` remain suitable for author review with explicit warnings where needed.
- `AMERICAN-1420` requires a minor caution/status wording patch before inclusion in an author-review bundle.
- `ASIANA-214` and `AMERICAN-965` remain outside bundle promotion as `REVIEW_REQUIRED` cases.
- `HELIOS-522`, `USAIR-427`, `TUROY EC225`, and `KOREAN-801` remain held/boundary.

A4R116 controls:
- no new trace draft;
- no P/O/A closure;
- no release created;
- no downstream opened;
- no final causation artifact, HF taxonomy artifact, risk layer, ERC, ARMS, or safety recommendation artifact created;
- no fixture/baseline/code/runtime/UI/API/DB change.

Freeze final continua não autorizado.

## A4+R-117 - Opus Audit Intake and A4R115 Trace Corrections

Esta fase registrou intake da auditoria externa Opus e aplicou patch metodológico documental antes de qualquer author review bundle:
- [Opus External Audit Intake A4R117](./SERA_ENGINE_VNEXT_OPUS_EXTERNAL_AUDIT_INTAKE_A4R117_v0.2.0.md)
- [UPS-1354 Double-Counting Caution Patch A4R117](./SERA_ENGINE_VNEXT_UPS1354_DOUBLE_COUNTING_CAUTION_PATCH_A4R117_v0.2.0.md)
- [AMERICAN-1420 Substantive Patch A4R117](./SERA_ENGINE_VNEXT_AMERICAN_1420_SUBSTANTIVE_PATCH_A4R117_v0.2.0.md)
- [Post-Opus Next Phase Plan A4R117](./SERA_ENGINE_VNEXT_POST_OPUS_REVIEW_NEXT_PHASE_PLAN_A4R117_v0.2.0.md)

Decisão de governança aplicada:
- `AMERICAN-1420` removido do conjunto ready-for-bundle e movido para `REWORK_REQUIRED` por risco substantivo de overclassification em P/O/A.
- `UPS-1354` mantido com warning obrigatório de double-counting e boundary live (`P-F/P-G`, `A-F/A-G`).
- `COLGAN-3407` e `US-AIRWAYS-1549` mantidos como candidatos estáveis para próximo bundle.
- `ASIANA-214` e `AMERICAN-965` permanecem fora (`HOLD_OVERCLASSIFICATION_RISK`/`REVIEW_REQUIRED`).
- held/boundary (`HELIOS-522`, `USAIR-427`, `TUROY EC225`, `KOREAN-801`) permanecem corretos.
- recovered corpus não altera decisões A4R115.

Conjunto estável pós-Opus para próximo author review bundle (fase futura):
- `UPS-1354`
- `COLGAN-3407`
- `US-AIRWAYS-1549`

A4R117 controles:
- nenhuma decisão autoral registrada;
- nenhum fechamento release de P/O/A;
- nenhum release criado;
- nenhum downstream aberto.

## A4+R-119 — Opus Corpus Discovery Intake and Priority Batch Start

Esta fase registrou intake da auditoria Opus sobre o pacote A4R118 e iniciou lote prioritário de source-slice/trace draft sem decisão autoral:
- [Opus Corpus Discovery Audit Intake A4R119](./SERA_ENGINE_VNEXT_OPUS_CORPUS_DISCOVERY_AUDIT_INTAKE_A4R119_v0.2.0.md)
- [Priority Candidate Source Validation A4R119](./SERA_ENGINE_VNEXT_PRIORITY_CANDIDATE_SOURCE_VALIDATION_A4R119_v0.2.0.md)
- [Priority Source-Slice Trace Batch A4R119](./SERA_ENGINE_VNEXT_PRIORITY_SOURCE_SLICE_TRACE_BATCH_A4R119_v0.2.0.md)
- [Priority Batch Gaps and Holds A4R119](./SERA_ENGINE_VNEXT_PRIORITY_BATCH_GAPS_AND_HOLDS_A4R119_v0.2.0.md)

Resultado macro A4R119:
- A4R118 discovery package foi revisado e incorporado sob governança Opus.
- lote prioritário avaliado: `UNITED-173`, `ATLAS-3591`, `EASTERN-401`, `UNITED-232`.
- source slices criados: `UNITED-173`, `ATLAS-3591`, `UNITED-232`.
- trace drafts full-axis criados: `UNITED-173`, `ATLAS-3591`, `UNITED-232`.
- `EASTERN-401` ficou em `HOLD_OCR_REQUIRED` por insuficiência de TXT oficial utilizável.

Controles A4R119:
- nenhuma decisão autoral registrada;
- nenhum fechamento release de P/O/A;
- nenhum release criado;
- nenhum downstream aberto;
- nenhum artefato de conclusão final, HF taxonomy, Risk/ERC, ARMS/ERC ou recommendations criado.

## A4+R-120 — A4R119 Independent QA Intake and Trace Stabilization

Esta fase estabilizou metodologicamente os traces A4R119 antes de qualquer author review bundle:
- [A4R119 External QA Intake A4R120](./SERA_ENGINE_VNEXT_A4R119_EXTERNAL_QA_INTAKE_A4R120_v0.2.0.md)
- [UNITED-173 Source Quality Caution A4R120](./SERA_ENGINE_VNEXT_UNITED_173_SOURCE_QUALITY_CAUTION_A4R120_v0.2.0.md)
- [UNITED-232 Nominal Adversarial Display Patch A4R120](./SERA_ENGINE_VNEXT_UNITED_232_NOMINAL_ADVERSARIAL_DISPLAY_PATCH_A4R120_v0.2.0.md)
- [ATLAS-3591 Substantive Patch A4R120](./SERA_ENGINE_VNEXT_ATLAS_3591_SUBSTANTIVE_PATCH_A4R120_v0.2.0.md)
- [Trace Boundary Path and Actor Scope Rule A4R120](./SERA_ENGINE_VNEXT_TRACE_BOUNDARY_PATH_AND_ACTOR_SCOPE_RULE_A4R120_v0.2.0.md)

Resultado macro A4R120:
- `UNITED-173` e `UNITED-232` mantidos como candidatos estáveis para futuro review lane (com warnings obrigatórios).
- `ATLAS-3591` recebeu patch substantivo e permanece `REVIEW_REQUIRED` (fora de bundle).
- `EASTERN-401` permanece `HOLD_OCR_REQUIRED`.
- nova regra formal aplicada: consistência de boundary path e declaração de `tracedActor`.

Conjunto estável para futuro author review bundle após A4R120:
- `UPS-1354`
- `COLGAN-3407`
- `US-AIRWAYS-1549`
- `UNITED-173`
- `UNITED-232`

Controles A4R120:
- nenhuma decisão autoral registrada;
- nenhum fechamento release de P/O/A;
- nenhum release criado;
- nenhum downstream aberto;
- nenhum artefato de conclusão final, HF taxonomy, Risk/ERC, ARMS/ERC ou recommendations criado.

## A4+R-121 — Eastern-401 Official Recovery and Controlled Re-entry

Esta fase executou recuperação oficial de fonte para EASTERN-401 e reentrada controlada no pipeline de draft:
- [Eastern-401 Official Source Recovery A4R121](./SERA_ENGINE_VNEXT_EASTERN_401_OFFICIAL_SOURCE_RECOVERY_A4R121_v0.2.0.md)
- [Source Slice Eastern-401 A4R121](./official-report-source-slices/a4r121/SOURCE-SLICE-EASTERN-401-A4R121.md)
- [Trace Draft Eastern-401 A4R121](./reference-case-traces/REFERENCE-CASE-EASTERN-401-FULL-AXIS-CANONICAL-DRAFT-A4R121.md)

Resultado macro A4R121:
- EASTERN-401 saiu de `HOLD_OCR_REQUIRED` para `TRACE_DRAFT_ALLOWED_WITH_LIMITATIONS`.
- Reentrada ocorreu com caveat explícito de legibilidade (legacy scan).
- Nenhuma decisão autoral foi registrada.
- Nenhum release/downstream foi criado.

## A4+R-122 - Eastern-401 Trace Stabilization After Independent QA

Esta fase estabilizou o trace EASTERN-401 A4R121 após intake de QA independente:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_EASTERN_401_INDEPENDENT_QA_INTAKE_A4R122_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_EASTERN_401_STABILIZATION_PATCH_A4R122_v0.2.0.md`

Resultado de governança:
- `canonicalPathIntegrity` permanece PASS;
- controle explícito de double-counting P/A foi adicionado;
- framing temporal O-axis foi reforçado (`O-A` inicial vs `O-D` janela crítica);
- A-axis mantém alternativas boundary-live (`A-F`, `A-G`) com `A-C` apenas como draft plausível;
- EASTERN-401 passa para `REVIEW_AFTER_MINOR_PATCH_APPLIED` com `READY_WITH_WARNINGS` para futuro lane de author review.

Controles A4R122:
- nenhuma decisão autoral registrada;
- nenhum fechamento release de P/O/A;
- nenhum release criado;
- nenhum downstream aberto;
- nenhum artifact de final causation, HF taxonomy, risk/ERC, ARMS/ERC ou recommendations criado.

## A4+R-123 - Real Event Reference Set Consolidation and Synthetic Model Readiness

Esta fase consolidou a governança do conjunto real de referência após A4R122 e definiu prontidão para a frente sintética sem criar eventos sintéticos:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_REFERENCE_SET_CONSOLIDATION_A4R123_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_POA_COVERAGE_MATRIX_A4R123_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_HELD_AND_REWORK_REGISTER_A4R123_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_SYNTHETIC_MODEL_EVENT_READINESS_A4R123_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_POST_REAL_EVENT_REFERENCE_ROADMAP_A4R123_v0.2.0.md`

Consolidação real A4R123:
- conjunto `review-ready/warning-bound` consolidado em 6 eventos:
  - `UPS-1354`
  - `COLGAN-3407`
  - `US-AIRWAYS-1549`
  - `UNITED-173`
  - `UNITED-232`
  - `EASTERN-401`
- casos fora do bundle registrados com condição de reabertura explícita.
- matriz de cobertura P/O/A consolidada para orientar próximos lotes.

Readiness sintético A4R123:
- framework sintético marcado como pronto para fase futura.
- criação de eventos sintéticos nesta fase: não.

Controles A4R123:
- nenhuma decisão autoral registrada;
- nenhum fechamento release de P/O/A;
- nenhum release criado;
- nenhum downstream aberto;
- nenhum artefato final-causation/HF taxonomy/Risk/ERC/ARMS/ERC/recommendations criado.

## A4+R-124 - Real Event Reference Rationale and Canonical Question Trace Dossier

Esta fase adicionou explicação auditável do funil de seleção real e dossiê canônico detalhado dos 6 eventos consolidados:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_SELECTION_FUNNEL_EXPLANATION_A4R124_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_NON_SELECTED_REAL_EVENTS_USE_REGISTER_A4R124_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_CANONICAL_TRACE_DOSSIER_A4R124_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_REFERENCE_EXPLAINER_FOR_AUTHOR_A4R124_v0.2.0.md`

Resultado A4R124:
- justificativa do funil e da consolidação em 6 casos documentada;
- registro de uso dos não selecionados por categoria de governança documentado;
- trilhas P/O/A canônicas dos 6 eventos detalhadas com perguntas exatas, respostas, evidências, alternativas e limites.

Controles A4R124:
- nenhum evento sintético criado;
- nenhuma decisão autoral registrada;
- nenhum fechamento release de P/O/A;
- nenhum release criado;
- nenhum downstream aberto.

## A4+R-125 - Real Event Author Review Intake and Escape-Point Reconciliation

Esta fase registrou intake da revisão autoral/metodológica e reconciliou o ponto de fuga da operação segura para os eventos reais consolidados:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_AUTHOR_REVIEW_INTAKE_A4R125_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_REAL_EVENT_ESCAPE_POINT_RECONCILIATION_A4R125_v0.2.0.md`

Resultado macro A4R125:
- UPS-1354 corrigido no eixo Percepção de `P-F` para `P-G` (com `O-D` e `A-F` mantidos);
- EASTERN-401 rebaixado para `REVIEW_AFTER_ESCAPE_POINT_PATCH` e removido temporariamente do bundle;
- lane autoral imediato passa para 5 eventos:
  - `UPS-1354`
  - `COLGAN-3407`
  - `US-AIRWAYS-1549`
  - `UNITED-173`
  - `UNITED-232`
- EASTERN-401 permanece útil e não descartado, condicionado a patch de separação `preEscapeEvidence`/`postEscapeEvidence`.

Controles A4R125:
- nenhuma decisão autoral virou release;
- nenhum `releasedCode` criado;
- nenhum release criado;
- nenhum downstream aberto;
- nenhum artefato de final-causation/HF taxonomy/Risk/ERC/ARMS/ERC/recommendations criado.

## A4+R-126 - Global Real Event Escape-Point Reaudit and Pre-Gate Quarantine

Esta fase executou a reauditoria global do passivo de eventos reais SERA vNext antes da formalizacao do gate Hendy de ponto de fuga da operacao segura:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_GLOBAL_ESCAPE_POINT_REAUDIT_A4R126_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/GLOBAL_ESCAPE_POINT_REAUDIT_TRACKER_A4R126_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_PRE_GATE_EVENT_QUARANTINE_REGISTER_A4R126_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_EVENT_ARTIFACT_DEPENDENCY_MATRIX_A4R126_v0.2.0.md`

Gate adicional incorporado:
- `escapePointWhenStatement` passa a ser campo obrigatorio.
- `escapePointWhenStatementPreviouslyExplicit` passa a registrar se o campo "Quando..." ja existia no artefato anterior.
- O formato exigido e: `Quando [ato/condicao observavel] colocou [variavel operacional controlada] fora de [limite seguro/estado esperado].`
- Eventos sem essa frase evidenciavel permanecem `ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED` e nao sao tratados como validados.
- O bloqueio formal `BLOCKED_ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED` foi incorporado como status de gate complementar, sem substituir decisoes metodologicas mais fortes ja registradas.

Resultado macro A4R126:
- totalFilesScanned: 638
- totalRelevantFiles: 406
- totalUniqueEvents auditados: 52
- eventos com prior proposedCode pre-gate: 43
- eventos com releasedCode historico afetado: 4
- explicitEscapePointWhenStatementAlreadyPresent: 0
- escapePointWhenStatementDefinedByReaudit: 5
- escapePointWhenStatementUnresolved: 47
- blockedEscapePointWhenStatementUnresolved: 47
- eventos `PASS_REQUIRES_MINOR_WORDING_FIX`: 3
- eventos `PARTIAL_REQUIRES_POA_REVIEW`: 14
- eventos `FAIL_REQUIRES_REBUILD`: 4
- eventos `BLOCKED/PARKED`: 31
- priorProposedCodesQuarantined: 43
- releasedCodesAffected: 4
- downstreamOpenedCount: 0

Estado de freeze apos A4R126:
- eventos pre-gate permanecem em quarentena;
- freeze final ainda nao autorizado;
- release/downstream continuam bloqueados salvo registros historicos explicitamente auditados, que tambem ficam sob cautela pre-gate;
- reference cases, author packets e questionPath/backfills nao podem ser usados para consenso, treinamento, frontend calibration ou downstream ate satisfazerem o gate Hendy.
- eventos com `ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED` nao podem ser usados como release, referencia, consenso, treinamento ou downstream.

Proxima fase recomendada:
- rebuild dos `FAIL_REQUIRES_REBUILD` com prompt completo do gate Hendy;
- P/O/A review dos `PARTIAL_REQUIRES_POA_REVIEW`;
- source enrichment dos `BLOCKED_SOURCE_PARTIAL`;
- complemento/rebuild dos casos com `BLOCKED_ESCAPE_POINT_WHEN_STATEMENT_UNRESOLVED`, conforme a causa metodologica principal registrada;
- limpeza ou rebuild de artefatos contaminados por helper/pre-canonical tree material;
- somente depois retomar novas analises.

## A4+R-127 - Post A4R126 Recovery Triage

Esta fase transformou a reauditoria A4R126 em um plano operacional de recuperacao controlada, sem executar rebuild P/O/A, sem classificar novos eventos e sem abrir downstream:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_POST_A4R126_RECOVERY_TRIAGE_A4R127_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/POST_A4R126_RECOVERY_QUEUE_A4R127_v0.2.0.md`

Resultado macro A4R127:
- totalEventsTriaged: 52
- queueAWhenOnly: 3
- queueBPOAReview: 14
- queueCFullRebuild: 4
- queueDSourceEnrichment: 11
- queueEParked: 19
- queueFDuplicateOrSuperseded: 1
- priorityP0/P1/P2/P3: 19/7/10/16
- priorReleasedCodeAffected: 4
- priorReferenceCaseAffected: 18
- priorAuthorApprovalAffected: 10
- priorQuestionPathAffected: 30
- priorProposedCodeAffected: 43
- downstreamOpenedCount: 0

Proximas fases possiveis:
- `QUEUE_A_WHEN_ONLY` para complemento formal de campos Hendy;
- `QUEUE_C_FULL_REBUILD` para os eventos fail com gate Hendy completo;
- `QUEUE_B_POA_REVIEW` para revisao focada dos eixos apos ponto de fuga explicitado;
- `QUEUE_D_SOURCE_ENRICHMENT` para fortalecer evidencia antes de qualquer rebuild;
- `QUEUE_E_PARKED` para decisoes de fronteira tecnica, condicional, ator direto ou arvore real;
- `QUEUE_F_DUPLICATE_OR_SUPERSEDED` para limpeza de dependencia documental.

## A4+R-128 - Queue A P0 Escape-Point Gate Recovery

Esta fase processou apenas os eventos A4R127 com `assignedQueue=QUEUE_A_WHEN_ONLY` e `priority=P0`, formalizando o gate Hendy completo do ponto de fuga sem executar rebuild P/O/A, sem classificar novos eventos e sem abrir downstream:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_QUEUE_A_P0_WHEN_RECOVERY_A4R128_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/QUEUE_A_P0_WHEN_RECOVERY_TRACKER_A4R128_v0.2.0.md`

Eventos elegiveis processados:
- `UPS-1354`
- `COLGAN-3407`
- `UNITED-173`

Resultado macro A4R128:
- totalQueueAP0Eligible: 3
- escapePointGateRecovered: 3
- remainsInQuarantine: 0
- whenStatementValid: 3
- whenStatementInvalid: 0
- preventabilityPass: 3
- directActorClear: 3
- poaChangedCount: 0
- releasedCodeCreatedCount: 0
- downstreamOpenedCount: 0

Estado de freeze apos A4R128:
- o gate de ponto de fuga foi recuperado apenas para `UPS-1354`, `COLGAN-3407` e `UNITED-173`;
- P/O/A permanece draft/proposed e nao foi alterado;
- release e downstream continuam bloqueados;
- caveats existentes permanecem ativos, incluindo double-counting em `UPS-1354` e OCR/source-quality em `UNITED-173`;
- freeze final continua nao autorizado.

Proxima fase recomendada:
- executar `QUEUE_B_POA_REVIEW` por batch controlado depois de confirmar `escapePointWhenStatement` valido por evento;
- executar `QUEUE_C_FULL_REBUILD` apenas com prompt completo do gate Hendy para eventos ja marcados como rebuild;
- executar `QUEUE_D_SOURCE_ENRICHMENT` antes de tentar recuperar casos com fonte parcial.

## A4+R-129 - Queue B P0 POA Review Gate Diagnostic

Esta fase processou apenas os eventos A4R127 com `assignedQueue=QUEUE_B_POA_REVIEW` e `priority=P0`, mas nao executou revisao P/O/A substantiva porque todos permanecem sem ponto de fuga Hendy pronto:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_QUEUE_B_P0_POA_REVIEW_A4R129_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/QUEUE_B_P0_POA_REVIEW_TRACKER_A4R129_v0.2.0.md`

Eventos elegiveis processados:
- `REAL-EVENT-0003`
- `REAL-EVENT-0016`
- `BS211-Q400`
- `A4R87-EXT-002`
- `ASIANA-214`
- `AMERICAN-965`
- `COMAIR-5191`

Resultado macro A4R129:
- totalQueueBP0Eligible: 7
- escapePointReadyCount: 0
- escapePointNotReadyCount: 7
- whenStatementValid: 0
- whenStatementInvalid: 0
- poaReviewedCount: 0
- priorPOARetainedCount: 0
- draftPOARevisedCount: 0
- pAxisUnresolved: 7
- oAxisUnresolved: 7
- aAxisUnresolved: 7
- requiresAuthorReviewCount: 0
- requiresFullRebuildCount: 5
- remainsInQuarantineCount: 7
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0

Estado de freeze apos A4R129:
- nenhum evento `QUEUE_B` P0 saiu da quarentena;
- nenhum P/O/A foi retido, revisado ou convertido em saida final;
- release e downstream continuam bloqueados;
- freeze final continua nao autorizado.

Proxima fase recomendada:
- executar uma fase dedicada de `FULL_REBUILD_WITH_ESCAPE_POINT_GATE` para os cinco casos `QUEUE_B` P0 de alta dependencia que nao precisam primeiro de nova source slice;
- executar `SOURCE_ENRICHMENT` para `AMERICAN-965` e `COMAIR-5191` antes de qualquer tentativa de revisao P/O/A.

## A4+R-130 - Queue B P0 Full Rebuild With Escape-Point Gate

Esta fase processou apenas os cinco eventos A4R129 `QUEUE_B_POA_REVIEW` P0 encaminhados para `FULL_REBUILD_WITH_ESCAPE_POINT_GATE`, aplicando o gate Hendy antes de qualquer P/O/A draft:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_QUEUE_B_P0_FULL_REBUILD_A4R130_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/QUEUE_B_P0_FULL_REBUILD_TRACKER_A4R130_v0.2.0.md`

Eventos processados:
- `REAL-EVENT-0003`
- `REAL-EVENT-0016`
- `BS211-Q400`
- `A4R87-EXT-002`
- `ASIANA-214`

Eventos excluidos para `SOURCE_ENRICHMENT`:
- `AMERICAN-965`
- `COMAIR-5191`

Resultado macro A4R130:
- totalQueueBP0FullRebuildEligible: 5
- excludedForSourceEnrichment: 2
- escapePointDefinedCount: 5
- escapePointBlockedCount: 0
- whenStatementValidCount: 5
- whenStatementInvalidCount: 0
- classificationPermissionGrantedCount: 5
- poaRebuiltDraftCount: 5
- requiresAuthorReviewCount: 5
- remainsInQuarantineCount: 5
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0

Estado de freeze apos A4R130:
- os cinco casos receberam `escapePointWhenStatement` valido e gate Hendy documentado;
- os cinco casos receberam somente `REBUILT_POA_DRAFT_NOT_RELEASED`;
- todos permanecem `NOT_FOR_RELEASE`, `NOT_FOR_REFERENCE_CASE`, `NOT_FOR_CONSENSUS`, `NOT_FOR_TRAINING` e `NOT_FOR_DOWNSTREAM` ate revisao autoral e governanca de release;
- nenhum `releasedCode`, `selectedCode CLASSIFIED`, conclusao final, HF taxonomy, Risk/ERC, ARMS/ERC ou recommendation ativa foi criado;
- nenhum arquivo de fonte/corpus, codigo, fixture, baseline, UI/API/DB/migration ou `.ts` foi alterado;
- freeze final continua nao autorizado.

Proxima fase recomendada:
- revisao autoral dos cinco `REBUILT_POA_DRAFT_NOT_RELEASED`, com prioridade para as fronteiras P/A de `ASIANA-214` e O/A de `BS211-Q400`;
- `SOURCE_ENRICHMENT` para `AMERICAN-965` e `COMAIR-5191` antes de qualquer rebuild;
- fase separada para `QUEUE_C_FULL_REBUILD`, sem abrir downstream automaticamente.

## A4+R-131 - Author Review Packets for A4R130 Rebuilt Drafts

Esta fase preparou pacotes simples de decisao autoral para os cinco eventos reconstruidos em A4R130:
- `docs/sera-vnext/SERA_ENGINE_VNEXT_AUTHOR_REVIEW_PACKETS_A4R131_v0.2.0.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR_REVIEW_TRACKER_A4R131_v0.2.0.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-REAL-EVENT-0003-A4R131.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-REAL-EVENT-0016-A4R131.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-BS211-Q400-A4R131.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-A4R87-EXT-002-A4R131.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-ASIANA-214-A4R131.md`

Eventos incluidos:
- `REAL-EVENT-0003`
- `REAL-EVENT-0016`
- `BS211-Q400`
- `A4R87-EXT-002`
- `ASIANA-214`

Eventos excluidos por `SOURCE_ENRICHMENT`:
- `AMERICAN-965`
- `COMAIR-5191`

Resultado macro A4R131:
- totalAuthorReviewPacketsCreated: 5
- eventsIncluded: 5
- eventsExcludedForSourceEnrichment: 2
- authorDecisionPendingCount: 5
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0
- poaChangedCount: 0
- sourceEnrichmentPerformedCount: 0

Estado de freeze apos A4R131:
- nenhum pacote registra aprovacao autoral;
- todos permanecem `AUTHOR_DECISION_PENDING`;
- todos permanecem `NO_RELEASED_CODE` e `NO_DOWNSTREAM`;
- P/O/A tecnico da A4R130 nao foi alterado;
- nenhuma source enrichment foi executada;
- `AMERICAN-965` e `COMAIR-5191` nao foram processados;
- freeze final continua nao autorizado.

Proxima fase recomendada:
- coletar respostas autorais para os cinco pacotes;
- registrar as decisoes autorais em fase separada;
- manter release/downstream bloqueados ate governanca explicita posterior.

## A4+R-132 — Independent Opus Review Register

Esta fase registrou a revisao independente do Opus sobre os cinco pacotes A4R131 e preparou uma folha de decisao autoral, sem registrar aprovacao autoral:

- [Independent Opus Review A4R132](./SERA_ENGINE_VNEXT_INDEPENDENT_OPUS_REVIEW_A4R132_v0.2.0.md)
- [Author Decision Intake After Opus A4R132](./author-review-packets-a4r131/AUTHOR_DECISION_INTAKE_AFTER_OPUS_A4R132_v0.2.0.md)

Estado apos A4+R-132:
- revisao Opus registrada como EXTERNAL_INDEPENDENT_REVIEW;
- nenhuma decisao autoral registrada;
- nenhum releasedCode criado;
- nenhum downstream aberto;
- nenhum P/O/A alterado;
- BS211-Q400 e A4R87-EXT-002 nao devem avancar sem correcao do gate/ponto de fuga;
- REAL-EVENT-0003 e o unico candidato claro para aprovacao parcial;
- REAL-EVENT-0016 e ASIANA-214 exigem decisao autoral consciente sobre boundaries;
- riscos sistemicos registrados: 4 (frase "Quando" como veiculo de pre-classificacao, warnings como marcador temporal, carryover bias A4R130, tratamento de fronteiras P/O/A);
- freeze final continua nao autorizado.

Proxima fase recomendada:
- coleta de decisao autoral explicita usando a folha AUTHOR_DECISION_INTAKE_AFTER_OPUS_A4R132;
- prioridade: corrigir gate BS211-Q400 e A4R87-EXT-002 antes de qualquer aprovacao;
- REAL-EVENT-0003 pronto para aprovacao parcial imediata;
- REAL-EVENT-0016 e ASIANA-214 requerem decisao consciente sobre boundaries P-C/P-G e A-F/A-E.

## A4+R-133 — Author Decision for REAL-EVENT-0003 and Consolidated Event Status

Esta fase registrou a decisao autoral consolidada para REAL-EVENT-0003, incorporando o source enrichment sobre a desconexao manual do autopilot, sem criar releasedCode e sem aprovar os outros quatro eventos A4R131:

- [Author Decision REAL-EVENT-0003 A4R133](./SERA_ENGINE_VNEXT_AUTHOR_DECISION_REAL_EVENT_0003_A4R133_v0.2.0.md)
- [Author Decision Status After A4R133](./author-review-packets-a4r131/AUTHOR_DECISION_STATUS_AFTER_A4R133_v0.2.0.md)

Estado apos A4+R-133:

REAL-EVENT-0003:
- status: AUTHOR_APPROVED_DRAFT_PARTIAL;
- ponto de fuga: APROVADO COM NOTA — desconexao manual do autopilot pelo PF as 0239:01 como contexto, nao como falha SERA;
- "Quando..." revisado: inclui "apos a desconexao manual do autopilot pelo PF durante a transicao para aproximacao visual/manual";
- P-G aprovado, O-A aprovado, A-UNRESOLVED mantido;
- saida parcial da quarentena apenas como AUTHOR_APPROVED_DRAFT_PARTIAL;
- nao serve como referencia completa do eixo A;
- nenhum releasedCode, downstream, finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations.

Demais eventos:
- REAL-EVENT-0016: AUTHOR_REVIEW_PENDING (fronteira P-C vs P-G pendente);
- BS211-Q400: NOT_APPROVED_REQUIRES_REBUILD (gate e ponto de fuga precisam de rebuild);
- A4R87-EXT-002: REQUIRES_ESCAPE_POINT_PATCH (EGPWS como marcador temporal precisa revisao);
- ASIANA-214: AUTHOR_REVIEW_PENDING (O-D threshold e A-F vs A-E pendentes);
- AMERICAN-965 e COMAIR-5191: nao processados (source-enrichment lane).

Metricas:
- authorDecisionsRecordedCount: 1
- authorApprovedDraftPartialCount: 1
- authorReviewPendingCount: 2
- notApprovedRequiresRebuildCount: 1
- requiresEscapePointPatchCount: 1
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- rebuild do gate BS211-Q400 (ponto de fuga e quando);
- patch do escape point A4R87-EXT-002 (isolar degradacao pre-EGPWS);
- coleta de decisao autoral consciente para REAL-EVENT-0016 (P-C vs P-G) e ASIANA-214 (A-F vs A-E);
- REAL-EVENT-0003 aguarda fase futura de release governance.

## A4+R-134 — Gate Patch for BS211-Q400 and A4R87-EXT-002

Esta fase executou patch metodologico do gate "Quando..." para os dois eventos bloqueados em A4R133, sem aprovar P/O/A:

- [Gate Patch BS211 and A4R87 A4R134](./SERA_ENGINE_VNEXT_GATE_PATCH_BS211_A4R87_A4R134_v0.2.0.md)
- [Gate Patch Status A4R134](./author-review-packets-a4r131/GATE_PATCH_STATUS_A4R134_v0.2.0.md)

### BS211-Q400 — Gate Rebuild

- Problema: "fora da trajetoria/downwind atribuida" embutia linguagem de violacao e pre-determinava O-C.
- Correcao aplicada: substituido por "com perda de estabilidade e desalinhamento de pista apos o contexto de sequenciamento ATC" (degradacao observavel, sem violacao).
- unsafeActOrCondition: aproximacao perdeu estabilidade e alinhamento apos contexto de sequenciamento ATC.
- controlledVariable: estabilidade da aproximacao e alinhamento de pista.
- safeLimit: reentrada estabilizada com alinhamento mantido ou aproximacao descontinuada com margem segura.
- temporalConfidence: MEDIUM.
- O-C e A-F permanecem drafts de alto risco, nao aprovados.

### A4R87-EXT-002 — Escape Point Patch

- Problema: "multiplos alertas EGPWS ativos" usado como marcador temporal; EGPWS e consequencia da saida, nao a saida em si.
- Correcao aplicada: substituido por "perfil de altitude degradado com separacao vertical reduzida" (degradacao do perfil antes dos alertas).
- unsafeActOrCondition: voo noturno entrou em perfil de descida com altitude degradada e separacao reduzida, ativando alertas EGPWS como consequencia.
- controlledVariable: separacao vertical sobre agua, altitude path e perfil de voo monitorado.
- safeLimit: perfil noturno monitorado mantendo separacao segura com recuperacao tempestiva antes de ativacao de alertas.
- temporalConfidence: MEDIUM — A4R130 explicita que degradacao precedeu os alertas.
- Cronologia EGPWS permanece valida como evidencia/anchor, nao como primeira saida.

### Eventos nao alterados (do A4R133)

| eventId | status |
|---|---|
| REAL-EVENT-0003 | AUTHOR_APPROVED_DRAFT_PARTIAL — P-G/O-A aprovados, A-UNRESOLVED |
| REAL-EVENT-0016 | AUTHOR_REVIEW_PENDING — P-C vs P-G boundary |
| ASIANA-214 | AUTHOR_REVIEW_PENDING — O-D threshold e A-F vs A-E boundary |

### Exclusoes mantidas

| eventId | reason |
|---|---|
| AMERICAN-965 | source-enrichment lane |
| COMAIR-5191 | source-enrichment lane |

Estado apos A4+R-134:

- gate patch aplicado para BS211-Q400 e A4R87-EXT-002;
- ambos com status PATCHED_GATE_DRAFT_NOT_APPROVED;
- ambos permanecem REMAINS_IN_QUARANTINE;
- nenhum P/O/A foi revisado, aprovado ou alterado;
- REAL-EVENT-0003 mantido como AUTHOR_APPROVED_DRAFT_PARTIAL;
- REAL-EVENT-0016 e ASIANA-214 mantidos como AUTHOR_REVIEW_PENDING;
- AMERICAN-965 e COMAIR-5191 permanecem em source-enrichment lane;
- riscos sistemicos abordados: "Quando" como veiculo de pre-classificacao (BS211) e warnings como marcador temporal (A4R87).

Metricas A4R134:
- eventsProcessedForGatePatch: 2
- gatePatchDraftedCount: 2
- gateRebuildIncompleteCount: 0
- escapePointSourceInsufficientCount: 0
- authorDecisionRecordedCount: 0
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0
- sourceEnrichmentPerformedCount: 0

Controles A4R134:
- NO_NEW_AUTHOR_DECISION;
- NO_RELEASED_CODE para todos os 5 eventos;
- NO_DOWNSTREAM para todos os 5 eventos;
- nenhuma mudanca P/O/A desde A4R130/A4R131/A4R133;
- nenhum source enrichment executado;
- nenhum processamento de AMERICAN-965 ou COMAIR-5191;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhum runtime, UI, API, DB, migration, fixture, baseline ou codigo alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- revisao autoral do gate patch para BS211-Q400 e A4R87-EXT-002;
- se gates aceitos: prosseguir para revisao P/O/A de ambos;
- se gates rejeitados: marcar GATE_REBUILD_INCOMPLETE ou ESCAPE_POINT_SOURCE_INSUFFICIENT;
- coleta de decisao autoral consciente para REAL-EVENT-0016 e ASIANA-214;
- O-C/A-F do BS211-Q400 permanecem alto risco — recomendar UNRESOLVED/O-D para O e UNRESOLVED para A;
- REAL-EVENT-0003 aguarda future release governance.

## A4+R-135 — Documentation Hygiene and Methodology Control Board

Esta fase criou uma camada de governanca documental para limpar a confusao metodologica acumulada, sem apagar historico e sem alterar codigo:

- [Methodology Control Board A4R135](./SERA_ENGINE_VNEXT_METHODOLOGY_CONTROL_BOARD_A4R135_v0.2.0.md)
- [Superseded and Quarantine Register A4R135](./SERA_ENGINE_VNEXT_SUPERSEDED_AND_QUARANTINE_REGISTER_A4R135_v0.2.0.md)
- [Method Status README A4R135](./README_METHOD_STATUS_A4R135.md)

### Control Board

- fonte unica de verdade para o estado metodologico de todos os eventos reais SERA vNext.
- tabela mestre cobre os 7 eventos prioritarios e os 52 eventos A4R126 de forma compacta.
- 13 status metodologicos definidos com regras de uso para referencia, treinamento e calibracao.
- regras supremas formalizadas: ponto de fuga antes de P/O/A, "Quando..." sem violacao/warning, arvore canonica nao inventavel, proposedCode != releasedCode, downstream bloqueado.

### Superseded and Quarantine Register

- 8 categorias de documentos marcados como nao utilizaveis para referencia atual.
- categorias: pre-gate artifacts, helper/noncanonical traces, pre-A4R126 adjudications, A4R131 packets superseded, "Quando..." nao validados, drafts nao aprovados, historical-only, external conclusion quarantine.
- nenhum documento foi apagado ou movido.

### Method Status README

- README curto para humanos e agentes com regras, status rapido dos 7 eventos, e listas do que usar e nao usar.

Estado apos A4+R-135:

- control board criado como fonte unica de verdade metodologica;
- superseded register criado com 8 categorias de documentos quarantinados;
- README de status criado para orientacao rapida;
- todos os 52 eventos A4R126 listados no control board;
- 7 eventos principais com status detalhado;
- nenhum documento apagado;
- nenhum documento movido;
- nenhuma decisao autoral nova;
- nenhum P/O/A novo;
- nenhum releasedCode;
- nenhum downstream;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations.

Metricas A4R135:
- controlBoardCreatedCount: 1
- supersededRegisterCreatedCount: 1
- methodStatusReadmeCreatedCount: 1
- totalEventsListedInControlBoard: 52
- authorApprovedDraftPartialCount: 1 (REAL-EVENT-0003)
- activeReviewCount: 2 (REAL-EVENT-0016, ASIANA-214)
- needsRebuildCount: 2 (BS211-Q400, A4R87-EXT-002)
- needsSourceEnrichmentCount: 2 (AMERICAN-965, COMAIR-5191)
- parkedOrHistoricalOnlyCount: 19 (QUEUE_E) + 1 (QUEUE_F) = 20
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0
- documentsDeletedCount: 0
- documentsMovedCount: 0

Controles A4R135:
- NO_NEW_AUTHOR_DECISION;
- NO_RELEASED_CODE;
- NO_DOWNSTREAM;
- nenhum P/O/A alterado;
- nenhum documento apagado ou movido;
- nenhum source enrichment;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhum runtime, UI, API, DB, migration, fixture, baseline ou codigo alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada:
- revisao autoral do gate patch A4R134 para BS211-Q400 e A4R87-EXT-002;
- coleta de decisao autoral para REAL-EVENT-0016 e ASIANA-214;
- source enrichment para AMERICAN-965 e COMAIR-5191;
- rebuild dos eventos QUEUE_C com gate Hendy completo;
- consultar sempre o Control Board A4R135 antes de usar qualquer documento pre-A4R135 como referencia.

## A4+R-136 — Author Decision Prep for Active Review Cases

Esta fase preparou folha objetiva de decisao autoral para os dois eventos ACTIVE_REVIEW do Control Board A4R135, sem registrar aprovacao:

- [Author Decision Prep A4R136](./SERA_ENGINE_VNEXT_AUTHOR_DECISION_PREP_ACTIVE_REVIEW_A4R136_v0.2.0.md)
- [Decision Form REAL-EVENT-0016 and ASIANA-214 A4R136](./author-review-packets-a4r131/AUTHOR_DECISION_FORM_REAL_EVENT_0016_ASIANA_214_A4R136_v0.2.0.md)

### REAL-EVENT-0016

- decisao pendente: P-C vs P-G.
- argumentos P-C: automation/interface interpretation, mode-state understanding deficit.
- argumentos P-G: information available and correct, not monitored/integrated.
- O-A e A-UNRESOLVED mantidos como plausiveis.

### ASIANA-214

- Percepcao: P-G (recomendado) vs P-F (automacao ambigua).
- Objetivo: O-D (threshold) vs O-A (sem objetivo inseguro isolado).
- Acao: A-F (selecao/execucao) vs A-E (knowledge/mental model).
- Formulario cobre todas as combinacoes.

Estado apos A4+R-136:

- folha de decisao criada para REAL-EVENT-0016 e ASIANA-214;
- formulario com opcoes objetivas por eixo e decisao geral;
- nenhuma decisao autoral registrada;
- nenhum P/O/A alterado;
- nenhum release/downstream.

Metricas A4R136:
- authorDecisionPrepCreatedCount: 1
- authorDecisionFormsCreatedCount: 1
- eventsPreparedForAuthorDecision: 2
- authorDecisionRecordedCount: 0
- poaChangedCount: 0
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0
- sourceEnrichmentPerformedCount: 0

Controles A4R136:
- NO_NEW_AUTHOR_DECISION;
- NO_RELEASED_CODE;
- NO_DOWNSTREAM;
- nenhum P/O/A alterado;
- nenhum source enrichment;
- BS211-Q400, A4R87-EXT-002, AMERICAN-965, COMAIR-5191 nao processados;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhum runtime, UI, API, DB, migration, fixture, baseline ou codigo alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada (A4R136):
- autor responder o formulario A4R136 para REAL-EVENT-0016 e ASIANA-214;
- apos resposta: registrar decisoes em fase separada;
- paralelamente: revisao autoral do gate patch A4R134;
- source enrichment para AMERICAN-965 e COMAIR-5191.

## A4+R-137 — Methodological Reset: P/O/A at Escape Point

Esta fase registra uma correcao metodologica critica: a analise P/O/A deve ocorrer no momento do ponto de fuga da operacao segura, e nao a partir dos eventos posteriores ao ponto de fuga.

- [P/O/A at Escape Point Method Reset A4R137](./SERA_ENGINE_VNEXT_POA_AT_ESCAPE_POINT_METHOD_RESET_A4R137_v0.2.0.md)
- [Real Event POA Reaudit Reset Register A4R137](./SERA_ENGINE_VNEXT_REAL_EVENT_POA_REAUDIT_RESET_REGISTER_A4R137_v0.2.0.md)

### Regra Central

A pergunta correta NAO e:

> "Que falhas ocorreram depois que a trajetoria ja estava degradada?"

A pergunta correta E:

> "No momento em que a operacao saiu do estado seguro, por que aquele ponto de fuga aconteceu?"

### Per-Eixo

- **P (Percepcao):** O que o operador percebeu/acreditava no momento do ponto de fuga?
- **O (Objetivo):** Qual era o objetivo no momento do ponto de fuga?
- **A (Acao):** Que acao estava sendo executada/tentada no momento do ponto de fuga?

### Impacto nos Eventos Reais

**Todos os P/O/A de eventos reais estao suspensos como referencia atual** ate reauditoria explicita sob a regra "P/O/A at escape point".

Fases afetadas:
- A4R129 — Queue B P0 POA Review diagnostic
- A4R130 — Queue B P0 Full Rebuild drafts
- A4R131 — Author review packets
- A4R132 — Opus independent review (interpretacoes de P/O/A apenas)
- A4R133 — Author decision for REAL-EVENT-0003 (aprovacao de P/O/A apenas)
- A4R136 — Author decision forms for REAL-EVENT-0016 and ASIANA-214
- Todos os 52 eventos A4R126 com P/O/A nao explicitamente vinculado ao momento do ponto de fuga

### Status dos 7 Eventos Prioritarios (pos-A4R137)

| eventId | resetStatus (A4R137) | escapePoint | P/O/A reference |
|---|---|---|---|
| REAL-EVENT-0003 | POA_APPROVAL_SUSPENDED | DEFINED (A4R133) | NO — suspended |
| REAL-EVENT-0016 | NEEDS_SOURCE_ENRICHMENT_FOR_ESCAPE_POINT_POA | DEFINED (A4R130) | NO |
| BS211-Q400 | FULL_REBUILD_REQUIRED_AT_ESCAPE_POINT | PATCHED (A4R134) | NO |
| A4R87-EXT-002 | ESCAPE_POINT_AND_POA_REAUDIT_REQUIRED | PATCHED (A4R134) | NO |
| ASIANA-214 | POA_REAUDIT_REQUIRED_AT_ESCAPE_POINT | DEFINED (A4R130) | NO |
| AMERICAN-965 | NEEDS_SOURCE_ENRICHMENT | UNRESOLVED | NO |
| COMAIR-5191 | NEEDS_SOURCE_ENRICHMENT | UNRESOLVED | NO |

### O Que Permanece Valido

- Extracoes factuais (A4R62, A4R72, A4R76, A4R88)
- Source enrichment factual (A4R67, A4R132 autopilot)
- Timelines e evidence anchors
- "Quando..." statements que passam o gate Hendy
- Gate patch documents (A4R134)
- Control Board e Quarantine Register (A4R135)
- Arvore SERA canonica (A4R99)
- Regras metodologicas, locks e definicoes

### Controles A4R137

- NO_NEW_AUTHOR_DECISION — aprovacoes autorais anteriores suspensas para referencia P/O/A;
- NO_RELEASED_CODE;
- NO_DOWNSTREAM;
- nenhum P/O/A reclassificado;
- nenhum source enrichment executado;
- nenhum documento deletado ou movido;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhum runtime, UI, API, DB, migration, fixture, baseline ou codigo alterado.

### Metricas A4R137

- methodResetCreatedCount: 1
- poaAtEscapePointRuleRegisteredCount: 1
- realEventPOAReferenceSuspendedCount: 52
- priorityEventsResetCount: 7
- authorApprovedDraftsSuspendedCount: 1 (REAL-EVENT-0003)
- documentsDeletedCount: 0
- documentsMovedCount: 0
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0
- poaReclassifiedCount: 0
- sourceEnrichmentPerformedCount: 0

O candidate freeze final continua nao autorizado. O metodo foi resetado para a regra "P/O/A at escape point" e todas as analises de eventos reais precisam ser revalidadas sob essa regra antes de qualquer release ou downstream.

Proxima fase recomendada (A4R137):
- reauditar REAL-EVENT-0003 P/O/A no momento do ponto de fuga (autopilot disconnect);
- source enrichment para REAL-EVENT-0016: GPS/autopilot failure vs interpretation no escape point;
- reauditar ASIANA-214 O-axis no momento do ponto de fuga;
- full rebuild para BS211-Q400 com gate patch A4R134 + P/O/A no escape point;
- reauditar A4R87-EXT-002 com gate patch A4R134 + P/O/A no momento pre-EGPWS;
- source enrichment para AMERICAN-965 e COMAIR-5191 com foco em evidencia no escape point;
- expandir reauditoria para os 52 eventos restantes conforme capacidade.

## A4+R-138 — Real Event Reaudit Protocol: P/O/A at Escape Point

Esta fase cria o protocolo formal para reauditoria de eventos reais sob a regra "P/O/A at escape point" (A4R137), sem executar nenhuma reauditoria.

- [Real Event Reaudit Protocol A4R138](./SERA_ENGINE_VNEXT_REAL_EVENT_REAUDIT_PROTOCOL_A4R138_v0.2.0.md)
- [Reaudit Template A4R138](./REAL_EVENT_REAUDIT_TEMPLATE_A4R138.md)
- [Reaudit Pilot Plan A4R138](./SERA_ENGINE_VNEXT_REAL_EVENT_REAUDIT_PILOT_PLAN_A4R138_v0.2.0.md)

### Protocolo

Sequencia obrigatoria em 6 passos:
1. Separacao temporal: pre-escape context, escape point moment, post-escape consequence.
2. Gate Hendy do ponto de fuga com 12 campos obrigatorios e 9 valores de escapePointStatus.
3. Validacao do "Quando..." — nucleo nao pode conter causa psicologica, violacao, codigo SERA, warning consequente, resultado final.
4. P/O/A no momento do ponto de fuga: cada eixo responde apenas ao que existia no momento exato da saida do estado seguro.
5. Bloqueios automaticos: 8 codigos de bloqueio (BLOCK_POA_*) que impedem classificacao quando evidencias sao insuficientes ou post-escape.
6. Saidas permitidas: 8 status (REAUDITED_AT_ESCAPE_POINT_DRAFT a CONDITION_DOMINANT) — nenhum release/downstream.

### Template

Template canonico criado com campos para: identificacao do evento, pre-escape context, escape point moment, post-escape consequences, P/O/A no escape point (com evidencias, confianca, mecanismo), blocos ativos, decisao de reauditoria e controles.

### Plano Piloto

Ordem definida para as primeiras reauditorias:
1. REAL-EVENT-0003 — tem enrichment do autopilot manual disconnect
2. REAL-EVENT-0016 — precisa distinguir falha tecnica GPS/autopilot vs interpretacao
3. ASIANA-214 — testa objetivo no ponto de fuga
4. BS211-Q400 — so depois de revisar gate patch A4R134
5. A4R87-EXT-002 — so depois de isolar momento pre-EGPWS

Criterios de sucesso e parada definidos. Nenhuma reauditoria executada nesta fase.

### Controles A4R138

- NO_NEW_AUTHOR_DECISION;
- NO_RELEASED_CODE;
- NO_DOWNSTREAM;
- nenhuma reauditoria executada;
- nenhum P/O/A reclassificado;
- nenhum source enrichment;
- nenhum documento deletado ou movido;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhum runtime, UI, API, DB, migration, fixture, baseline ou codigo alterado.

### Metricas A4R138

- protocolCreatedCount: 1
- templateCreatedCount: 1
- pilotPlanCreatedCount: 1
- eventsReauditedCount: 0
- poaReclassifiedCount: 0
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0
- sourceEnrichmentPerformedCount: 0
- documentsDeletedCount: 0
- documentsMovedCount: 0

O candidate freeze final continua nao autorizado. O protocolo de reauditoria foi criado mas nenhuma reauditoria foi executada ainda.

Proxima fase recomendada (A4R138):
- autor revisar e aprovar o protocolo A4R138;
- executar piloto 1: REAL-EVENT-0003 P/O/A no momento do ponto de fuga;
- source enrichment pre-piloto para REAL-EVENT-0016: GPS/autopilot failure vs interpretation;
- gate patch review para BS211-Q400 e A4R87-EXT-002 antes de seus pilotos.

## A4+R-139 — Pilot 1: REAL-EVENT-0003 P/O/A Reaudit at Escape Point

Esta fase aplica o protocolo A4R138 ao primeiro evento-piloto: REAL-EVENT-0003 (Tofino night approach near-CFIT).

- [REAL-EVENT-0003 Reaudit at Escape Point A4R139](./real-event-reaudits-a4r139/REAL-EVENT-0003_REAUDIT_AT_ESCAPE_POINT_A4R139_v0.2.0.md)
- [Pilot Reaudit Report A4R139](./SERA_ENGINE_VNEXT_REAL_EVENT_0003_PILOT_REAUDIT_A4R139_v0.2.0.md)

### Resultado

| field | value |
|---|---|
| escapePointStatus | SOURCE_PARTIAL |
| sourceConfidence | MEDIUM |
| P | UNRESOLVED |
| O | O-A (HIGH confidence) |
| A | UNRESOLVED |
| blockedReasons | BLOCK_POA_SOURCE_PARTIAL, BLOCK_POA_ACTION_INFERRED_FROM_OUTCOME |
| reAuditDecision | PARTIAL_REAUDIT_AT_ESCAPE_POINT |

### Achados Principais

1. A desconexao manual do autopilot (0239:01, 600 ft ASL) foi contextual/SOP-compliant — nao e o ponto de fuga. O ponto de fuga ocorreu depois, quando o perfil manual/visual comecou a divergir progressivamente.

2. O ponto de fuga e uma zona progressiva (desaceleracao → baixa velocidade → pitch excessivo → grandes inputs → perfil perigoso), nao um momento discreto unico. A fonte nao permite isolar o primeiro momento exato com HIGH confidence → escapePointStatus = SOURCE_PARTIAL.

3. O-A sobrevive a reauditoria com HIGH confidence: o objetivo no ponto de fuga era completar a aproximacao visual e pousar com seguranca. Nao ha evidencia de objetivo inseguro em nenhum momento. As acoes corretivas posteriores do PF (baixar coletivo, ajustar trajetoria) sao consistentes com objetivo seguro.

4. P-G NAO foi reinstated: a classificacao anterior de P-G foi baseada em inferencia generica de falha de monitoramento a partir do desfecho (perfil perigoso), nao em evidencia de percepcao no momento do ponto de fuga. A fonte descreve o que o PF reconheceu DEPOIS que o desvio progrediu (zona de pouso mais proxima que o esperado), nao no primeiro momento do desvio.

5. A permanece UNRESOLVED: as acoes documentadas (grandes inputs de controle) sao correcoes pos-desvio, nao acoes no momento do ponto de fuga. Cadeia PF/PM nao foi decomposta.

### Avaliacao do Protocolo

O protocolo A4R138 funcionou: identificou corretamente limitacoes da fonte, bloqueou classificacoes nao suportadas (P e A) e preservou a unica classificacao bem suportada (O-A). O resultado e conservador e baseado em evidencia.

Problema encontrado: pontos de fuga progressivos desafiam a premissa de "momento discreto". Recomenda-se guidance explicita para zonas de escape progressivo.

### Controles A4R139

- NO_NEW_AUTHOR_DECISION — aprovacao anterior A4R133 P/O/A permanece suspensa;
- NO_RELEASED_CODE;
- NO_DOWNSTREAM;
- nenhum outro evento processado;
- nenhum P/O/A reclassificado alem de REAL-EVENT-0003;
- nenhum source enrichment executado;
- nenhum documento deletado ou movido;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhum runtime, UI, API, DB, migration, fixture, baseline ou codigo alterado.

### Metricas A4R139

- pilotEventsProcessedCount: 1
- eventId: REAL-EVENT-0003
- escapePointDefinedCount: 0 (SOURCE_PARTIAL, nao DEFINED)
- escapePointUnresolvedCount: 0
- poaReauditedAtEscapePointCount: 1 (PARTIAL)
- pCodeDraft: UNRESOLVED
- oCodeDraft: O-A
- aCodeDraft: UNRESOLVED
- unresolvedAxisCount: 2
- blockedReasonsCount: 2
- needsSourceEnrichmentCount: 0
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0
- finalConclusionCreatedCount: 0
- documentsDeletedCount: 0
- documentsMovedCount: 0

O candidate freeze final continua nao autorizado. O primeiro piloto de reauditoria foi concluido com resultado PARTIAL_REAUDIT_AT_ESCAPE_POINT.

Proxima fase recomendada:
- autor revisar resultado do piloto A4R139 e decidir sobre P=UNRESOLVED e A=UNRESOLVED como finais ou buscar enrichment adicional;
- source enrichment pre-piloto para REAL-EVENT-0016: GPS/autopilot failure vs interpretation;
- executar piloto 2: REAL-EVENT-0016 reaudit at escape point;
- considerar emenda ao protocolo A4R138 para pontos de fuga progressivos/graduais.

## A4+R-140 — Progressive Escape Point Guidance and Protocol Amendment

Esta fase formaliza guidance metodologica para casos em que o ponto de fuga nao e um instante discreto, mas uma zona progressiva de degradacao.

- [Progressive Escape Point Guidance A4R140](./SERA_ENGINE_VNEXT_PROGRESSIVE_ESCAPE_POINT_GUIDANCE_A4R140_v0.2.0.md)
- [Real Event Reaudit Protocol A4R138](./SERA_ENGINE_VNEXT_REAL_EVENT_REAUDIT_PROTOCOL_A4R138_v0.2.0.md) (amended)
- [Reaudit Template A4R138](./REAL_EVENT_REAUDIT_TEMPLATE_A4R138.md) (amended)
- [Reaudit Pilot Plan A4R138](./SERA_ENGINE_VNEXT_REAL_EVENT_REAUDIT_PILOT_PLAN_A4R138_v0.2.0.md) (amended)

### Resultado A4R140

- guidance progressiva criada e registrada;
- protocolo/template/plano piloto atualizados para distinguir `DISCRETE_ESCAPE_POINT` vs `PROGRESSIVE_ESCAPE_ZONE`;
- nenhum evento reauditado nesta fase;
- nenhum P/O/A alterado nesta fase;
- nenhum releasedCode;
- nenhum downstream;
- nenhum source enrichment.

### Impacto sobre A4R139 (REAL-EVENT-0003)

O resultado A4R139 permanece valido e inalterado:
- `escapePointStatus = SOURCE_PARTIAL`
- `P = UNRESOLVED`
- `O = O-A`
- `A = UNRESOLVED`
- `reAuditDecision = PARTIAL_REAUDIT_AT_ESCAPE_POINT`

Reinterpretacao formal A4R140:
- caso tratado como `PROGRESSIVE_ESCAPE_ZONE`;
- O-A valido no inicio documentavel da zona de fuga progressiva;
- P e A bloqueados por insuficiencia de evidencia no inicio da zona, nao por falha de protocolo.

### Metricas A4R140

- progressiveGuidanceCreatedCount: 1
- protocolAmendedCount: 1
- templateAmendedCount: 1
- pilotPlanAmendedCount: 1
- methodReadmeUpdatedCount: 1
- eventsReauditedCount: 0
- poaReclassifiedCount: 0
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0
- sourceEnrichmentPerformedCount: 0
- documentsDeletedCount: 0
- documentsMovedCount: 0

### Controles A4R140

- NO_NEW_AUTHOR_DECISION;
- NO_RELEASED_CODE;
- NO_DOWNSTREAM;
- nenhuma reauditoria executada;
- nenhum P/O/A reclassificado;
- nenhum source enrichment;
- nenhum documento deletado ou movido;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhum runtime, UI, API, DB, migration, fixture, baseline ou codigo alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada (A4R140):
- aplicar a declaracao obrigatoria de temporalidade do escape point em REAL-EVENT-0016 e ASIANA-214 antes de qualquer P/O/A;
- em BS211-Q400 e A4R87-EXT-002, impedir uso de critical point/warning como escape point;
- executar pilotos seguintes sob a nova guidance progressiva, mantendo bloqueio conservador quando `sourceCanIdentifyFirstDeparture != YES`.

## A4R141 — Source Enrichment for REAL-EVENT-0016 GPS/Autopilot at Escape Point

Esta fase executou source enrichment focal e local para REAL-EVENT-0016 antes do piloto 2 de reauditoria:

- [REAL-EVENT-0016 GPS/Autopilot Source Enrichment A4R141](./source-enrichment/REAL-EVENT-0016_GPS_AUTOPILOT_ENRICHMENT_A4R141_v0.2.0.md)
- [REAL-EVENT-0016 Source Enrichment Summary A4R141](./SERA_ENGINE_VNEXT_REAL_EVENT_0016_SOURCE_ENRICHMENT_A4R141_v0.2.0.md)

### Resultado A4R141

- enrichment executado com fontes locais existentes;
- evidencia favorece leitura de interpretacao/mode-state da automacao como dominante;
- sem evidencia local confirmando falha tecnica preimpacto de autopilot;
- ambiguidade residual mantida para timeline fina de mode-state e cadeia de acao;
- pronto para piloto 2 em modo condicional (`CONDITIONAL_READY_PILOT2`).

### Escopo e Controles

- nenhum P/O/A classificado nesta fase;
- nenhum release/downstream;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhum fixture/baseline/codigo alterado.

### Metricas A4R141

- sourceEnrichmentPerformedCount: 1
- eventId: REAL-EVENT-0016
- poaReclassifiedCount: 0
- releasedCodeCreatedCount: 0
- selectedCodeClassifiedCount: 0
- downstreamOpenedCount: 0
- finalConclusionCreatedCount: 0
- documentsDeletedCount: 0
- documentsMovedCount: 0

O candidate freeze final continua nao autorizado.

Proxima fase recomendada (A4R141):
- executar A4R142 (piloto 2) para REAL-EVENT-0016 sob A4R138/A4R140, com entrada condicional explicitando:
  - technical failure nao suportada pela evidencia local atual;
  - ancoragem estrita no escape point;
  - bloqueio conservador de eixos nao separaveis.

## A4R141-b — Supplemental Local Corpus Search for REAL-EVENT-0016

Esta fase executou busca complementar no corpus local TXT especificado:

- [REAL-EVENT-0016 Local Corpus Search Addendum A4R141-b](./source-enrichment/REAL-EVENT-0016_LOCAL_CORPUS_SEARCH_ADDENDUM_A4R141B_v0.2.0.md)

### Resultado A4R141-b

- escopo ampliado para os 89 TXT do corpus local/oficial solicitado;
- decisao: `A4R141_CONFIRMED`;
- resposta central mantida: interpretacao/mode-state dominante (B);
- confianca mantida em `MEDIUM`;
- pronto para piloto 2 segue `CONDITIONAL`;
- nenhum P/O/A classificado.

### Controles A4R141-b

- nenhum release/downstream;
- nenhum finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhum fixture/baseline/codigo alterado.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada (A4R141-b):
- iniciar A4R142 apenas com entrada condicional sob A4R138/A4R140 e registro explicito de que A4R141 foi confirmado por A4R141-b no escopo de 89 TXT;
- manter bloqueio conservador de eixos nao separaveis no momento inicial de fuga.

## A4R142 — Human Factors Corpus Screening and Negative Control Protocol

Esta fase criou uma camada de triagem metodologica para os 89 TXT do corpus local:

- [Human Factors Corpus Screening Protocol A4R142](./SERA_ENGINE_VNEXT_HUMAN_FACTORS_CORPUS_SCREENING_PROTOCOL_A4R142_v0.2.0.md)
- [Human Factors Corpus Screening Tracker A4R142](./source-corpus/HUMAN_FACTORS_CORPUS_SCREENING_TRACKER_A4R142_v0.2.0.md)
- [Human Factors Corpus Screening Summary A4R142](./SERA_ENGINE_VNEXT_HUMAN_FACTORS_CORPUS_SCREENING_SUMMARY_A4R142_v0.2.0.md)

### Resultado A4R142

- 89 TXT triados por valor metodologico de fator humano;
- separacao explicita entre candidatos HF, casos mistos, negative controls tecnicos, fonte insuficiente, duplicados e fora de escopo;
- nenhum P/O/A classificado;
- nenhum release/downstream.

### Controles A4R142

- sem finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- sem alteracao de fixture/baseline/codigo/corpus.

O candidate freeze final continua nao autorizado.

Proxima fase recomendada (A4R142):
- abrir batch de intake focado nos top candidatos HF e mistos com melhor fonte;
- executar trilha paralela de validacao de negative controls tecnicos;
- recuperar qualidade de fonte dos casos SOURCE_INSUFFICIENT antes de qualquer tentativa de reaudit.

## A4R143 — Independent ChatGPT Audit of A4R142 Corpus Screening

Esta fase registrou auditoria independente do ChatGPT 5.5 sobre a triagem A4R142:

- [Independent ChatGPT A4R142 Audit A4R143](./SERA_ENGINE_VNEXT_INDEPENDENT_CHATGPT_A4R142_AUDIT_A4R143_v0.2.0.md)

### Resultado A4R143

- independent audit created;
- A4R142 accepted as intake inventory only;
- corrective overlay added to summary and tracker;
- no P/O/A;
- no release/downstream;
- future Claude/Opus audit deferred to A4R144.

### Direcao de proxima fase apos A4R143

- next phase should not blindly proceed to REAL-EVENT-0016;
- next phase options:
  1. source-slice intake for Lane A solid HF candidates;
  2. negative-control validation pack Lane C;
  3. source recovery Lane B;
  4. conditional pilot 2 REAL-EVENT-0016 only if explicitly chosen.

## A4R144 — Lane A Source-Slice Intake Pack

Esta fase criou um pacote de intake por source-slice para candidatos Lane A:

- [Lane A Source-Slice Intake A4R144](./SERA_ENGINE_VNEXT_LANE_A_SOURCE_SLICE_INTAKE_A4R144_v0.2.0.md)
- [Lane A Source-Slice Tracker A4R144](./lane-a-source-slices-a4r144/LANE_A_SOURCE_SLICE_TRACKER_A4R144_v0.2.0.md)

### Resultado A4R144

- lane a source-slice intake criado;
- 7 eventos avaliados (ASIANA-214, COMAIR-5191, AMERICAN-965, AMERICAN-1420, KOREAN-801, UPS-1354, UNITED-173);
- nenhum P/O/A classificado;
- nenhum release/downstream;
- nenhum codigo/fixture/baseline/corpus alterado.

### Proximos passos apos A4R144

- iniciar preparacao de gate de escape point para COMAIR-5191, UPS-1354 e UNITED-173;
- tratar ASIANA-214 e AMERICAN-1420 com trilha de cautela temporal (progressive/post-escape contamination risk);
- mover AMERICAN-965 para source recovery antes de selecao de piloto;
- manter KOREAN-801 em hold boundary-complex ate separacao clara entre cadeia frontline e fatores sistemicos.

## A4R145 — Gate Readiness and Negative Control Balance Pack

Esta fase criou um pacote balanceado de preparacao metodologica:

- [Gate Readiness and Negative Control Balance A4R145](./SERA_ENGINE_VNEXT_GATE_READINESS_AND_NEGATIVE_CONTROL_BALANCE_A4R145_v0.2.0.md)
- [Gate + Negative Control Tracker A4R145](./gate-readiness-a4r145/GATE_READINESS_AND_NEGATIVE_CONTROL_TRACKER_A4R145_v0.2.0.md)
- [Gate Readiness Files A4R145](./gate-readiness-a4r145/)
- [Negative Controls A4R145](./negative-controls-a4r145/)

### Resultado A4R145

- gate readiness criado para 3 candidatos positivos: COMAIR-5191, UPS-1354, UNITED-173;
- negative-control validation pack criado para 2 controles: US-AIRWAYS-1549, DELTA-191;
- nenhum P/O/A classificado;
- nenhum release/downstream;
- nenhum codigo/fixture/baseline/corpus alterado.

### Proximos passos apos A4R145

- preparar gate draft completo (sem P/O/A) para COMAIR-5191, UPS-1354 e UNITED-173;
- manter validacao anti-overclassification com US-AIRWAYS-1549;
- abrir source-recovery local para DELTA-191 antes de uso detalhado de gate.

## A4R146 — Escape-Point Gate Drafts for Lane A Candidates

Esta fase criou drafts estruturados de gate de ponto de fuga para 3 candidatos Lane A:

- [Escape-Point Gate Drafts A4R146](./SERA_ENGINE_VNEXT_ESCAPE_POINT_GATE_DRAFTS_A4R146_v0.2.0.md)
- [Escape-Point Gate Draft Tracker A4R146](./escape-point-gates-a4r146/ESCAPE_POINT_GATE_DRAFT_TRACKER_A4R146_v0.2.0.md)
- [Escape-Point Gate Draft Files A4R146](./escape-point-gates-a4r146/)

### Resultado A4R146

- 3 escape-point gate drafts criados: COMAIR-5191, UPS-1354, UNITED-173;
- COMAIR-5191: gate draft ready (author review required for final wording quality);
- UPS-1354: gate draft ready with caution (warning/outcome contamination guard required);
- UNITED-173: gate draft ready with caution (pre-flameout anchor hardening required);
- nenhum P/O/A classificado;
- nenhum release/downstream;
- nenhum codigo/fixture/baseline/corpus alterado.

### Proximos passos apos A4R146

- executar revisao autoral focada do texto "Quando..." para COMAIR-5191 e UNITED-173;
- consolidar micro-anchors temporais dos 3 casos em pacote de gate final (ainda sem P/O/A);
- somente apos gate autoral consolidado considerar entrada de fase de reaudit.

## A4R147 — Synthetic Event Governance and Design Contract

Esta fase criou governanca metodologica para eventos sinteticos SERA vNext:

- [Synthetic Event Governance A4R147](./SERA_ENGINE_VNEXT_SYNTHETIC_EVENT_GOVERNANCE_A4R147_v0.2.0.md)
- [Synthetic Event Template A4R147](./SYNTHETIC_EVENT_TEMPLATE_A4R147.md)
- [Synthetic Event Taxonomy A4R147](./SERA_ENGINE_VNEXT_SYNTHETIC_EVENT_TAXONOMY_A4R147_v0.2.0.md)
- [Synthetic Event Future Workflow A4R147](./SERA_ENGINE_VNEXT_SYNTHETIC_EVENT_FUTURE_WORKFLOW_A4R147_v0.2.0.md)

### Resultado A4R147

- synthetic governance criada;
- nenhum evento sintetico final criado;
- nenhum synthetic fixture criado;
- nenhum P/O/A classificado;
- nenhum release/downstream;
- nenhum codigo/fixture/baseline/corpus alterado.

### Controles A4R147

- sem finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- sem alteracao de runtime, UI, API, DB, migration ou engine SERA;
- sem modificacao de eventos reais.

### Proximos passos apos A4R147

- eventos sinteticos podem ser preparados em trilha documental, mas nao finalizados como fixtures antes da reconciliacao das auditorias Opus/Claude em eventos reais;
- proxima fase sintetica recomendada: A4R148 para synthetic case design pack (documents only), mantendo bloqueios de release/downstream.

## A4R148 — Opus Audit Handoff Prep

Esta fase criou apenas pacote de preparacao documental para auditoria Opus:

- [Opus Audit Handoff Prep A4R148](./SERA_ENGINE_VNEXT_OPUS_AUDIT_HANDOFF_PREP_A4R148_v0.2.0.md)
- [Opus Audit Prompt A4R148](./OPUS_AUDIT_PROMPT_A4R148.md)
- [Opus Audit Reconciliation Checklist A4R148](./OPUS_AUDIT_RECONCILIATION_CHECKLIST_A4R148.md)

### Resultado A4R148

- handoff prep criado;
- prompt Opus criado;
- reconciliation checklist criado;
- nenhum evento revisado;
- nenhum P/O/A;
- nenhum release/downstream.

### Controles A4R148

- nenhum evento sintetico final criado;
- nenhum synthetic fixture criado;
- nenhuma alteracao de codigo/fixture/baseline/corpus;
- sem finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations.

### Proximo passo apos A4R148

- executar auditoria Opus fora do repo usando somente o ZIP puro dos 89 TXT;
- reconciliar Opus x ChatGPT x Codex em fase dedicada antes de qualquer mudanca de lane operacional.

## A4R149 — External Candidate Discovery Under Escape-Point Premise

Esta fase registrou a shortlist externa de 25 eventos como camada discovery-only:

- [External Candidate Discovery A4R149](./SERA_ENGINE_VNEXT_EXTERNAL_CANDIDATE_DISCOVERY_A4R149_v0.2.0.md)
- [External Candidate Index A4R149](./external-candidates-a4r149/EXTERNAL_CANDIDATE_INDEX_A4R149_v0.2.0.md)
- [External Candidate Source Hygiene A4R149](./external-candidates-a4r149/EXTERNAL_CANDIDATE_SOURCE_HYGIENE_A4R149_v0.2.0.md)
- [External Candidate Category Summary A4R149](./external-candidates-a4r149/EXTERNAL_CANDIDATE_CATEGORY_SUMMARY_A4R149_v0.2.0.md)
- [External Candidate Next Phase Plan A4R149](./external-candidates-a4r149/EXTERNAL_CANDIDATE_NEXT_PHASE_PLAN_A4R149_v0.2.0.md)

### Resultado A4R149

- external candidate discovery criado;
- 25 eventos registrados;
- nenhuma ingestao de corpus;
- nenhum P/O/A classificado;
- status de source hygiene registrado para todos os 25 eventos;
- auditoria Opus dos 89 TXT permanece pendente.

### Controles A4R149

- no corpus ingestion;
- no P/O/A;
- no release/downstream;
- no finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhuma alteracao de codigo/fixture/baseline/corpus.

## A4R150 — Integrated Corpus + External Candidate Reconciliation for Opus

Esta fase integrou em uma unica frente os 89 TXT locais e os 25 candidatos externos A4R149:

- [Integrated Corpus Reconciliation A4R150](./SERA_ENGINE_VNEXT_INTEGRATED_CORPUS_RECONCILIATION_A4R150_v0.2.0.md)
- [Integrated Event Source Matrix A4R150](./integrated-corpus-reconciliation-a4r150/INTEGRATED_EVENT_SOURCE_MATRIX_A4R150_v0.2.0.md)
- [Opus Audit Packet Manifest A4R150](./integrated-corpus-reconciliation-a4r150/OPUS_AUDIT_PACKET_MANIFEST_A4R150_v0.2.0.md)
- [Source Recovery Queue A4R150](./integrated-corpus-reconciliation-a4r150/SOURCE_RECOVERY_QUEUE_A4R150_v0.2.0.md)
- [Post-Opus Selection Candidate Plan A4R150](./integrated-corpus-reconciliation-a4r150/POST_OPUS_SELECTION_CANDIDATE_PLAN_A4R150_v0.2.0.md)

### Resultado A4R150

- integra 89 TXT + 25 externos em matriz unica;
- nao cria P/O/A;
- nao cria corpus ingestion;
- nao baixa relatorios;
- cria manifest unico para Opus;
- cria fila unificada de source recovery;
- cria plano pos-Opus de lote pequeno.

### Controles A4R150

- sem reauditoria de eventos;
- sem selectedCode CLASSIFIED, sem releasedCode;
- sem downstream;
- sem finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhuma alteracao de codigo/fixture/baseline/corpus.

## A4R151 — Official Source Hygiene and Download Prep for Opus Packet

Esta fase executou somente higiene de fonte oficial e verificacao de qualidade de artefatos temporarios para o pacote Opus:

- [Source Hygiene Execution A4R151](./source-hygiene-a4r151/SOURCE_HYGIENE_EXECUTION_A4R151_v0.2.0.md)
- [Official Source Status Matrix A4R151](./source-hygiene-a4r151/OFFICIAL_SOURCE_STATUS_MATRIX_A4R151_v0.2.0.md)
- [Opus Ready Packet Manifest A4R151](./source-hygiene-a4r151/OPUS_READY_PACKET_MANIFEST_A4R151_v0.2.0.md)
- [Source Recovery Remaining Queue A4R151](./source-hygiene-a4r151/SOURCE_RECOVERY_REMAINING_QUEUE_A4R151_v0.2.0.md)
- [Source Quality Notes A4R151](./source-hygiene-a4r151/SOURCE_QUALITY_NOTES_A4R151_v0.2.0.md)

### Resultado A4R151

- valida links oficiais prioritarios para pacote Opus;
- registra qualidade de PDF/TXT/OCR em camada documental;
- nao cria P/O/A;
- nao cria corpus ingestion;
- nao versiona PDFs baixados em tmp;
- organiza pacote OPUS_READY_CORE / OPUS_READY_NEGATIVE_CONTROLS / OPUS_SOURCE_RECOVERY_PENDING.
- OPUS_READY representa prioridade de deep-review, nao limite de escopo de auditoria.

### Controles A4R151

- sem reauditoria de eventos;
- sem selectedCode CLASSIFIED, sem releasedCode;
- sem downstream;
- sem finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhuma alteracao de codigo/fixture/baseline/corpus.

## A4R151b — Perplexity Source Recovery Addendum and Full Opus Scope Correction

Esta fase adiciona addendum de source recovery e corrige escopo total da auditoria Opus:

- [Source Recovery Addendum A4R151b](./source-hygiene-a4r151/SOURCE_RECOVERY_ADDENDUM_A4R151B_v0.2.0.md)
- [Official Source Recovery Matrix A4R151b](./source-hygiene-a4r151/OFFICIAL_SOURCE_RECOVERY_MATRIX_A4R151B_v0.2.0.md)
- [Opus Packet Delta A4R151b](./source-hygiene-a4r151/OPUS_PACKET_DELTA_A4R151B_v0.2.0.md)

### Resultado A4R151b

- Perplexity/web source recovery addendum criado;
- full Opus scope clarification aplicada;
- universo de auditoria preservado em 89 TXT + 25 externos;
- OPUS_READY subset mantido como prioridade de deep-review, nao limite de escopo;
- nenhum P/O/A.

### Controles A4R151b

- sem reauditoria de eventos;
- sem selectedCode CLASSIFIED, sem releasedCode;
- sem downstream;
- sem finalConclusion, HFACS, Risk/ERC, ARMS/ERC ou recommendations;
- nenhuma alteracao de codigo/fixture/baseline/corpus.

## A4R152 — Push A4R151b and Clean Opus Packet Assembly

- [Opus Packet Assembly A4R152](./SERA_ENGINE_VNEXT_OPUS_PACKET_ASSEMBLY_A4R152_v0.2.0.md)

### Resultado A4R152

- pacote Opus montado localmente em `tmp/a4r152-opus-packet/`;
- ZIP local gerado e nao versionado;
- escopo integrado 89 TXT + 25 externos preservado;
- sem P/O/A;
- sem release/downstream.

### Controles A4R152

- sem alteracao de corpus;
- sem versionamento de PDF/HTML de relatorio;
- sem alteracao de codigo/fixture/baseline.
