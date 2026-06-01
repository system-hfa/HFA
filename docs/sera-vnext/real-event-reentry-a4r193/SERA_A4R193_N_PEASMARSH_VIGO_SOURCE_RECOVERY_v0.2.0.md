# SERA A4R193-N Peasmarsh Vigo Source Recovery v0.2.0

Status:
- SOURCE_RECOVERY_ONLY
- CANDIDATE_ONLY
- NO_REENTRY_EXECUTION

## 1. Objetivo

Executar source recovery continuation para REAL-EVENT-0002 (Peasmarsh) e REAL-EVENT-0004 (Vigo) para avaliar fechamento de agente-ato-momento sem executar reentry.

## 2. Fontes internas lidas

- `docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_M_PEASMARSH_VIGO_SECONDARY_STATUS_v0.2.0.md`
- `docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_N_READINESS_PLAN_v0.2.0.md`
- `docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_K_PEASMARSH_SOURCE_RECOVERY_DECISION_v0.2.0.md`
- `docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_K_SOURCE_RECOVERY_MATRIX.csv`
- `docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_J_PEASMARSH_ENRICHMENT_DECISION_v0.2.0.md`
- `docs/sera-vnext/real-event-reentry-a4r193/SERA_A4R193_J_SOURCE_ENRICHMENT_BATCH2_MATRIX.csv`
- `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0001_0002_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_REVIEW_DECISION_0001_0002_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_REVIEW_DECISION_0003_0004_0006_v0.1.4.md`
- `docs/sera-vnext/real-event-adjudications/REAL-EVENT-ADJUDICATION-002.md`
- `docs/sera-vnext/real-event-extractions/REAL-EVENT-EXTRACTION-002.md`
- `docs/sera-vnext/real-event-adjudications/REAL-EVENT-ADJUDICATION-003.md`
- `docs/sera-vnext/real-event-extractions/REAL-EVENT-EXTRACTION-003.md`
- `docs/sera-vnext/real-event-adjudications/CONSOLIDATED_30_REAL_EVENTS_TRACKER_A4R78_v0.2.0.md`
- `docs/sera-vnext/real-event-escape-point-reaudit/GLOBAL_ESCAPE_POINT_REAUDIT_TRACKER_A4R126_v0.2.0.md`
- `docs/SERA_SAFE_OPERATION_ESCAPE_POINT_v0.1.md`

## 3. Peasmarsh evidence synthesis

### 3.1 PF/PM evidence

- `REAL-EVENT-EXTRACTION-002` registra `Tripulacao de voo (PF/PM pendente de separacao factual nesta fase)`.
- `REAL-EVENT-ADJUDICATION-002` mantem `PF/PM nao decompostos no nivel necessario para fechamento de mecanismo`.
- `A4R126` mantem `DIRECT_ACTOR_UNCLEAR` para REAL-EVENT-0002.

Resultado: PF/PM boundary continua sem fechamento por ator direto.

### 3.2 Warning/callout/go-around evidence

- `REAL-EVENT-EXTRACTION-002` registra ausencia de rota de go-around briefada/disponivel.
- `REAL-EVENT-EXTRACTION-002` e `REAL-EVENT-ADJUDICATION-002` registram aviso EGPWS emitido sem percepcao da tripulacao.
- `REAL_EVENT_DEEP_EXTRACTION_0001_0002` ancora a transicao de aproximacao descontinuada para descida rumo a obstaculos.

Resultado: cadeia warning/go-around continua ambigua para isolamento do mecanismo dominante por ator.

### 3.3 SequenceRef by actor evidence

- Sequencia macro esta estavel: aproximacao noturna degradada -> descontinuacao -> ausencia de rota protegida -> descida para obstaculos.
- `REAL-EVENT-EXTRACTION-002` e `REAL_EVENT_REVIEW_DECISION_0001_0002` mantem pendencia de decomposicao PF vs PM e de callout-level timeline.

Resultado: sequenceRef por ator permanece parcial.

### 3.4 UnsafeActOrOmission evidence

- Evidencia observavel permanece no formato conservador: transicao/go-around com trajetoria sem protecao suficiente de separacao de obstaculo.
- `REAL-EVENT-ADJUDICATION-002` mantem combinacao ambigua entre condicao dominante e conduta possivel.

Resultado: unsafeActOrOmission continua sem atribuicao robusta por ator.

### 3.5 BoundaryEvidenceRefs evidence

- Ha referencias estaveis para night low-visibility context, no-go-around-route e warning barrier nao efetiva.
- `A4R126` continua bloqueado por `BLOCKED_DIRECT_ACTOR_UNCLEAR / SOURCE_ENRICHMENT`.

Resultado: boundary refs suficientes para manter hold metodologico, insuficientes para reentry review.

### 3.6 Peasmarsh decision

`PEASMARSH_REMAINS_SOURCE_EXTRACTION_REQUIRED`

## 4. Vigo evidence synthesis

### 4.1 PF/PM evidence

- `REAL-EVENT-EXTRACTION-003` registra tripulacao de voo com possivel interacao mission crew e papeis nao segregados.
- `REAL-EVENT-ADJUDICATION-003` mantem ausencia de separacao robusta PF/PM/mission crew.
- `A4R126` mantem REAL-EVENT-0004 em `DIRECT_ACTOR_UNCLEAR`.

Resultado: PF/PM e ator direto continuam insuficientes para fechamento.

### 4.2 Warning/callout/go-around evidence

- `REAL-EVENT-EXTRACTION-003` registra descida para cerca de 50 ft sem alerta sonoro.
- `REAL-EVENT-ADJUDICATION-003` trata ausencia de alerta sonoro como condicao/barreira degradada, sem fechar mecanismo humano especifico.
- `REAL_EVENT_REVIEW_DECISION_0003_0004_0006` mantem necessidade de source extraction adicional antes de candidate draft.

Resultado: warning/barrier chain continua incompleta para reentry readiness.

### 4.3 SequenceRef by actor evidence

- Sequencia macro esta estavel: positioning SAR/training -> descida inadvertida -> baixa altura -> sem alerta sonoro.
- `REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006` mantem aberto quem monitorou altitude/altura e quem controlou perfil vertical.

Resultado: sequenceRef por ator permanece insuficiente.

### 4.4 UnsafeActOrOmission evidence

- Unsafe act permanece candidato nao conclusivo (monitoramento/controle vertical possivelmente insuficientes).
- Componente de condicao permanece forte (task workload + aural warning barrier degradada + interacao mission crew).

Resultado: unsafeActOrOmission nao fecha em atribuicao robusta por ator.

### 4.5 BoundaryEvidenceRefs evidence

- Existem refs para envelope vertical, 50 ft over water e warning barrier ausente/degradada.
- `A4R126` e `A4R78` mantem HOLD_UNRESOLVED com decomposicao de ator pendente.

Resultado: boundary refs ainda insuficientes para promover reentry review.

### 4.6 Vigo decision

`VIGO_REMAINS_HOLD_SOURCE_INSUFFICIENT`

## 5. Comparison with A4R193-K and A4R193-J

- Peasmarsh em J era `HOLD_SOURCE_INSUFFICIENT`, em K passou para `SOURCE_EXTRACTION_REQUIRED`, e em N permanece `SOURCE_EXTRACTION_REQUIRED`.
- Vigo em J era `HOLD_SOURCE_INSUFFICIENT`, em K permaneceu `HOLD_SOURCE_INSUFFICIENT`, e em N permanece `HOLD_SOURCE_INSUFFICIENT`.
- N confirma progresso documental sem liberar reentry automatico.

## 6. Reentry and lane guards

- Proibido reentry automatico nesta fase.
- Sem reentry de Peasmarsh.
- Sem reentry de Vigo.
- Thebaud permanece `THEBAUD_REMAINS_HOLD_AGENT_ACT_MOMENT`.
- Sinteticos permanecem bloqueados.
- Produto/UI/API permanecem bloqueados.
- RR-001: `OPEN`.
- RR-003: `PARTIALLY_MITIGATED`.
- Daumas lane preservada.
