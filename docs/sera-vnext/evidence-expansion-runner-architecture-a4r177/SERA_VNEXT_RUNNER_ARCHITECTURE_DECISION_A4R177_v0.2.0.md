# SERA vNext Runner Architecture Decision — A4R177

Status:
- DRAFT_ONLY
- RUNNER_ARCHITECTURE_DECISION
- NO_RUNNER_IMPLEMENTATION
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Decisão principal

- runner legado permanece intocado;
- runner vNext separado e recomendado.

## 2. Diretriz de escopo

O runner vNext deve ler apenas trilhas separadas candidate/reference, sem alterar fluxo oficial.

## 3. Capacidades obrigatórias do runner vNext

Deve suportar:
- normal P/O/A;
- `NOT_APPLICABLE_AT_ESCAPE_POINT`;
- `UNRESOLVED`;
- multiator por `actorContributionId` no mesmo `escapePointId`;
- negative controls;
- synthetic cases com marcacao explicita;
- `evidenceQuality`;
- `sourceType`.

## 4. Isolamento técnico

Nao tocar:
- `tests/sera/runner.ts`
- `tests/sera/run.ts`
- `tests/sera/report.ts`
- `tests/sera/fixtures/**`
- baseline legado.

## 5. baseline vNext

- baseline vNext deve ser separado do baseline legado;
- baseline vNext inicia em trilha candidate-only;
- qualquer convergencia futura exige fase dedicada e autorizacao explicita.

## 6. Limite desta fase

- nenhuma implementacao de runner vNext nesta fase A4R177.

## 7. Critérios para autorizar A4R178

1. inventario inicial de corpus real confirmado;
2. arquitetura macro do runner vNext aprovada;
3. matriz de cobertura P/O/A inicial aprovada;
4. politica de eventos sintéticos aprovada;
5. confirmacao de isolamento completo do legado.
