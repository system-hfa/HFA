# SERA vNext Runner Strategy Decision — A4R176

Status:
- DRAFT_ONLY
- STRATEGY_DECISION
- NO_OFFICIAL_RUNNER_CHANGE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## Contexto

A suite P1 candidate-only consolidada exige dois comportamentos ainda fora do runner oficial atual:

- suporte controlado a `NOT_APPLICABLE_AT_ESCAPE_POINT`;
- suporte controlado a contribuicoes multiator no mesmo `escapePointId`.

## Opcao A — manter apenas candidate validators

Resumo:
- baixo risco;
- pouca integracao;
- bom para curto prazo.

Vantagens:
- zero impacto em baseline e runner oficial;
- validacao de contrato continua simples.

Desvantagens:
- nao evolui fluxo executavel candidate para runner dedicado;
- limita observabilidade integrada de regressao candidate.

## Opcao B — criar runner vNext separado

Resumo:
- recomendada;
- preserva baseline legado;
- permite `NOT_APPLICABLE_AT_ESCAPE_POINT`;
- permite multiator;
- permite schema vNext;
- nao contamina runner oficial.

Vantagens:
- evolui capacidade candidate com isolamento tecnico;
- suporta contratos P1 atuais sem forcar compatibilidade retroativa no runner oficial;
- permite gate de convergencia futuro com criterios explicitos.

Desvantagens:
- aumenta manutencao de duas trilhas por periodo transitorio;
- requer contrato claro de dados e scoring vNext.

## Opcao C — adaptar runner oficial

Resumo:
- nao recomendada agora;
- maior risco;
- pode contaminar baseline e contratos antigos.

Riscos principais:
- quebra de suposicoes de schema/scoring legado;
- mistura precoce entre trilha candidate e oficial;
- impacto em historico de baseline e comparabilidade.

## Decisao

- Recomendar **Opcao B** para fase futura.
- Bloquear **Opcao C** ate aprovacao explicita.

## Condicao de desbloqueio da Opcao C

Somente avaliar adaptacao do runner oficial apos:

1. aprovacao humana formal da suite candidate consolidada;
2. contrato vNext estabilizado para nao aplicabilidade e multiator;
3. plano de migracao sem contaminacao de baseline historico;
4. fase autorizada com escopo dedicado de compatibilidade oficial.
