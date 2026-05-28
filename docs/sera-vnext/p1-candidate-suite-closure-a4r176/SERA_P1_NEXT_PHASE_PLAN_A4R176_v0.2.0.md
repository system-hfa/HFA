# SERA P1 Next Phase Plan — A4R176

Status:
- DRAFT_ONLY
- NEXT_PHASE_PLAN
- NO_OFFICIAL_RUNNER_CHANGE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## Objetivo da proxima fase

Projetar e validar o runner vNext separado para trilha candidate, sem alterar runner oficial nem baseline.

## Escopo recomendado

1. definir schema vNext candidate para P/O/A:
   - suporte a `NOT_APPLICABLE_AT_ESCAPE_POINT`;
   - suporte a multiator com `actorContributionId`.
2. definir politica de scoring vNext:
   - matching causal sem dependencia de ERC oficial;
   - contrato explicito para casos de nao aplicabilidade.
3. construir validador/runner vNext isolado:
   - leitura exclusiva de `tests/sera/fixtures-candidates/`;
   - saida em pasta candidate de relatorios;
   - sem impacto em `tests/sera/runner.ts`.
4. definir gates de promocao:
   - gate metodologico;
   - gate tecnico;
   - gate de compatibilidade.

## Entregaveis recomendados

- documento de arquitetura runner vNext;
- matriz de compatibilidade P1 candidate x vNext schema;
- prototipo de runner vNext separado;
- validacao end-to-end candidate-only para P1.

## Criterios de encerramento da proxima fase

- runner vNext separado funcional para suite P1 candidate;
- zero alteracao no runner oficial e baseline;
- aprovacao humana do contrato de scoring e schema vNext.
