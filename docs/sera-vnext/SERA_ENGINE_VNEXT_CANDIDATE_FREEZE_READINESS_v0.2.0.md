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
