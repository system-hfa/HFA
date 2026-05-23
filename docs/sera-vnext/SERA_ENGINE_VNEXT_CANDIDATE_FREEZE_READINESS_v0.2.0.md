# SERA Engine vNext Candidate Freeze Readiness v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-51 — Candidate Freeze Readiness (atualizado com contract tests do adversarial set 2)

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

## Leitura de prontidão atual
- **Pronto para evolução controlada** de contratos técnicos e rastreabilidade.
- **Não pronto** para freeze metodológico final com claims externos fortes.

## Próximas fases recomendadas
1. Consolidar evidence categories em modo passivo -> warning -> regra.
2. Fechar pacote de referência e protocolo inter-rater.
3. Executar adversarial Set 2 e revisão de consistência.
4. Só então preparar freeze candidate formal.
