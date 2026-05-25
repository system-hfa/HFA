# REAL-EVENT-0003 Autopilot Disconnect Source Enrichment A4R132 v0.2.0

Status:
- SOURCE_ENRICHMENT_RECORDED
- REAL-EVENT-0003_ONLY
- NOT_CLASSIFIED
- NO_P_O_A_CLASSIFICATION
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Fontes Pesquisadas

### Fonte primaria local
- `docs/sera-vnext/source-corpus/txt-events/pdf24_merged-3.txt`
  - TSB Aviation Investigation Report A15P0217, Helijet International Inc., Sikorsky S-76C+, C-GHHJ, Tofino/Long Beach Airport, 15 November 2015.
  - Trechos pesquisados: linhas aproximadas 112940-116200, com foco em history of flight, helicopter systems, SOPs, helicopter control analysis, findings and safety action.

### Artefatos locais SERA pesquisados
- `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-001.md`
- `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-001.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_QUEUE_B_P0_FULL_REBUILD_A4R130_v0.2.0.md`
- `docs/sera-vnext/author-review-packets-a4r131/AUTHOR-REVIEW-REAL-EVENT-0003-A4R131.md`
- `docs/real-event-harvest/REAL_EVENT_FACTUAL_HARVEST_BATCH_1_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_DEEP_EXTRACTION_0003_0004_0006_v0.1.4.md`
- `docs/real-event-harvest/REAL_EVENT_REVIEW_DECISION_0003_0004_0006_v0.1.4.md`

### Termos pesquisados
- `REAL-EVENT-0003`
- `Tofino`
- `A4R72-B2-001`
- `A4R73`
- `A4R100`
- `autopilot`
- `disconnect`
- `disconnected`
- `disengage`
- `disengaged`
- `decouple`
- `decoupled`
- `AP`
- `automatic flight`
- `mode`
- `SAS`
- `AFCS`
- `flight director`
- `rotor decay`
- `low speed`
- `descent rate`

## 2. Trechos Relevantes Encontrados

### TSB A15P0217 - summary

The local primary report states that, while conducting a visual approach to Runway 29, the crew disengaged the autopilot at 600 feet ASL and maneuvered toward the planned landing area. It then describes the subsequent low airspeed, high descent rate, rotor speed decay and loss of directional control.

Source: `docs/sera-vnext/source-corpus/txt-events/pdf24_merged-3.txt`, around lines 112955-112966.

### TSB A15P0217 - event sequence

The report gives a specific time and actor: at 0239:01, the PF disengaged the autopilot. After that, the helicopter began to decelerate while maintaining constant altitude. At 0.3 NM from the Runway 29 threshold, airspeed decreased below 60 KIAS, approximately VMINI, and pitch attitude increased beyond 14 degrees nose-up. The PF then commented that they were closer to the flashing green light than expected and lowered the collective to minimum power.

Source: `docs/sera-vnext/source-corpus/txt-events/pdf24_merged-3.txt`, around lines 113214-113233.

### TSB A15P0217 - no system malfunction indication

The report states that records indicated the helicopter was certified, equipped and maintained according to approved procedures, had no known deficiencies before the flight, and that the investigation found no indication of a system-related malfunction during the flight.

Source: `docs/sera-vnext/source-corpus/txt-events/pdf24_merged-3.txt`, around lines 113520-113525.

### TSB A15P0217 - SOP context for autopilot use

The report records that a coupled autopilot can reduce workload and increase accuracy when used correctly. For an NVFR approach, the SOPs stated no coupled flight in the visual circuit or near traffic, no coupled flight below 1000 feet, and to decouple before final approach checks or sooner.

Source: `docs/sera-vnext/source-corpus/txt-events/pdf24_merged-3.txt`, around lines 114664-114676.

### TSB A15P0217 - minimum airspeed context

The report states that the SOPs did not define a minimum airspeed for an NVFR approach, but did reiterate that VMINI was 60 KIAS for IMC, and that below best-rate-of-climb speed the aircraft could decelerate quickly and require increased power.

Source: `docs/sera-vnext/source-corpus/txt-events/pdf24_merged-3.txt`, around lines 114686-114701.

### TSB A15P0217 - analysis

The report analysis states that approximately 10 seconds after the autopilot was decoupled, speed decreased below 60 KIAS and pitch attitude increased beyond 14 degrees nose-up. It describes the PF adjusting the approach after recognizing the landing zone was closer than expected, and says large control inputs made to adjust descent angle and speed resulted in a hazardous approach profile.

Source: `docs/sera-vnext/source-corpus/txt-events/pdf24_merged-3.txt`, around lines 115181-115206.

### Local SERA artifacts

The A4R72 extraction, A4R73 adjudication, A4R100 canonical trace and A4R130 rebuild all preserve the autopilot event as a factual approach transition, but they do not add a better reason for the disconnect beyond the TSB chronology. Earlier harvest docs explicitly identify "why the autopilot was disconnected" as a question requiring clarification.

Sources:
- `docs/sera-vnext/real-event-extractions-batch-2/REAL-EVENT-BATCH2-EXTRACTION-001.md`
- `docs/sera-vnext/real-event-adjudications-batch-2/REAL-EVENT-BATCH2-ADJUDICATION-001.md`
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_QUEUE_B_P0_FULL_REBUILD_A4R130_v0.2.0.md`
- `docs/real-event-harvest/REAL_EVENT_FACTUAL_HARVEST_BATCH_1_v0.1.4.md`

## 3. Resposta Direta: Por Que o Autopilot Desconectou?

Resposta direta: a melhor evidencia encontrada indica desconexao voluntaria/manual pelo PF durante a transicao para a fase visual/manual da aproximacao.

O relatorio primario suporta:
- actor: PF;
- timing: 0239:01;
- flight phase: final visual approach toward the planned landing area;
- system status after disconnect: helicopter decelerated, then entered low-speed/high-descent-rate state;
- technical status: no indication of system-related malfunction during the flight.

O relatorio primario nao demonstra:
- desconexao automatica;
- desconexao por limite do sistema;
- falha tecnica do autopilot;
- modo inadequado como causa direta da desconexao;
- comando inadvertido;
- perda de acoplamento causada por condicao operacional antes da desconexao.

O motivo subjetivo exato do PF nao e declarado em uma frase direta pelo relatorio. O contexto operacional mais sustentado e que a desconexao ocorreu para continuar a aproximacao visual/manual, em ambiente em que SOP local limitava coupled flight below 1000 feet and required decoupling before final approach checks or sooner. Como a desconexao ocorreu a 600 feet ASL and after final approach checks, the source supports a manual/voluntary disconnect more strongly than a procedural-timing-compliant disconnect.

## 4. Distincao Entre Hipoteses

| hipotese | status | evidencia |
|---|---|---|
| 1. desconexao voluntaria pelo piloto | SUPPORTED | TSB: "PF disengaged the autopilot" at 0239:01; summary says the crew disengaged it at 600 feet ASL. |
| 2. desconexao automatica | NOT_SUPPORTED | No local evidence found that the autopilot disconnected automatically. |
| 3. limite do sistema | NOT_SUPPORTED_AS_DISCONNECT_CAUSE | VMINI and low-speed limitations are relevant after disconnect; no source says a system limit caused the disconnect. |
| 4. falha tecnica | NOT_SUPPORTED | TSB found no indication of system-related malfunction during the flight. |
| 5. modo inadequado | INSUFFICIENT_DATA_AS_CAUSE | SOP/mode context exists, but no source states that an incorrect mode caused the autopilot to disconnect. |
| 6. comando inadvertido | NOT_SUPPORTED | No local source found evidence of inadvertent command. |
| 7. perda de acoplamento por condicao operacional | NOT_SUPPORTED_AS_PRIMARY | The low-speed/high-descent-rate condition developed after the PF disengaged the autopilot. |
| 8. informacao nao encontrada | PARTIAL | The subjective reason for the PF action is not explicitly stated; however, actor/timing/manual nature are found. |

## 5. Grau de Confianca

Confidence: HIGH for manual/voluntary PF disengagement.

Confidence: MEDIUM for the operational context that the disconnect supported transition to visual/manual final approach, because the TSB chronology and SOP context support it, but the report does not state the PF's subjective rationale as a direct quote or finding.

Confidence: HIGH that the local evidence does not support automatic disconnect, technical failure, command inadvertence, or pre-disconnect operational-condition decoupling.

## 6. Impacto Metodologico

| field | value | note |
|---|---|---|
| escapePointConfirmed | YES_WITH_NOTE | The source enrichment supports keeping the escape point after autopilot disconnect, at the observable degradation into low speed/high descent/rotor decay. The autopilot disconnect itself should remain contextual, not the escape point by itself. |
| escapePointNeedsRebuild | NO | No new evidence found requiring rebuild of the A4R130 escape-point gate for this event. |
| sourceInsufficient | NO_FOR_DISCONNECT_MECHANISM; PARTIAL_FOR_SUBJECTIVE_RATIONALE | Primary evidence identifies PF manual disengagement. It does not fully explain the internal reason for the PF action. |

## 7. Recomendacao

Recommendation: READY_FOR_REBUILD

Rationale:
- Primary source located locally.
- Manual PF disengagement is sufficiently anchored for source enrichment.
- No evidence of automatic disconnect or technical failure was found.
- Further rebuild/review should not treat autopilot disconnect as causal by itself.
- Further rebuild/review should preserve the distinction between manual disconnect context and the later observable unsafe energy/descent/rotor state.

## 8. Locks

- No SERA P/O/A classification was performed.
- No `releasedCode` was created.
- No `selectedCode CLASSIFIED` was created.
- No final conclusion was generated.
- No downstream was opened.
- No fixture, baseline, code, UI, API, DB, migration or source-corpus file was changed.
