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
