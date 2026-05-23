# SERA Engine vNext Candidate Freeze Readiness v0.2.0

Status: DRAFT_FOR_REVIEW  
Phase: A4+R-48 — Candidate Freeze Readiness Prep

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
- Contrato operacional LLM (fora desta fase).
- Conjunto de casos de referência por consenso metodológico.
- Adversarial Set 2.
- Protocolo inter-rater.
- Plano final de integração (ainda sem UI/API/DB).

## Gate de linguagem metodológica
Ainda não chamar de metodologia validada cientificamente.

Linguagem recomendada:
- `candidate causal core under validation`

Linguagem a evitar nesta fase:
- `scientifically validated`
- `production-ready full methodology`

## Leitura de prontidão atual
- **Pronto para evolução controlada** de contratos técnicos e rastreabilidade.
- **Não pronto** para freeze metodológico final com claims externos fortes.

## Próximas fases recomendadas
1. Consolidar evidence categories em modo passivo -> warning -> regra.
2. Fechar pacote de referência e protocolo inter-rater.
3. Executar adversarial Set 2 e revisão de consistência.
4. Só então preparar freeze candidate formal.
