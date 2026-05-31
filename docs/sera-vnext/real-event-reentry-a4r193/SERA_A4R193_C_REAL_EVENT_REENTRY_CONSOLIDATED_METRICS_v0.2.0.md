# SERA A4R193-C Real Event Re-entry Consolidated Metrics v0.2.0

## A. Inventario consolidado

1. `REAL-EVENT-COPTERLINE-S76-EST-2005-PILOT-001`
2. `REAL-EVENT-ASIANA214-SFO2013-REENTRY-001`
3. `REAL-EVENT-COMAIR-5191-LEX-2006-REENTRY-001`
4. `REAL-EVENT-UNITED-173-PDX-1978-REENTRY-001`
5. `REAL-EVENT-USAIR-427-PIT-1994-REENTRY-001`

## B. Metricas consolidadas

### Contagem principal

- total reentrado: `5`
- `READY_FOR_CANDIDATE_ONLY_TRIAL`: `4`
- `SOURCE_INSUFFICIENT_FOR_REENTRY`: `1`
- `HOLD tecnico`: `1`

### Point topology por evento

- Copterline: `discrete`
- Asiana: `progressive`
- Comair: `progressive`
- United 173: `progressive`
- USAir 427: `diffuse` (HOLD)

Distribuicao:

- `discrete`: `1`
- `progressive`: `3`
- `diffuse`: `1`

### Agent kind por evento

- Copterline: `maintenance_or_org`
- Asiana: `crew_collective`
- Comair: `crew_collective`
- United 173: `crew_collective`
- USAir 427: `system_or_condition_dominant`

Distribuicao:

- `maintenance_or_org`: `1`
- `crew_collective`: `3`
- `system_or_condition_dominant`: `1`

### Metadata P/O/A candidate-only

- Copterline: `P-G`, `O-A`, `A-G` (metadata only)
- Asiana: P/O/A metadata presentes sem release
- Comair: P/A metadata presentes + `O-E` somente como non-existent
- United 173: P/O/A metadata presentes sem release
- USAir 427: P/O/A em modo HOLD

### Riscos metodologicos (contagem)

- risco de agent migration: `5/5`
- risco de post-event analysis: `5/5`
- risco de consequence-as-basis: `5/5`
- tecnico-dominante: `1/5` (USAir 427)

## C. Cobertura metodologica atual

- manutencao/organizacao: coberto (Copterline)
- `crew_collective`: coberto (Asiana, Comair, United 173)
- progressive zone: coberto (3 eventos)
- discrete point: coberto (Copterline)
- diffuse/HOLD: coberto (USAir 427)
- technical-dominant hold: coberto (USAir 427)
- O-E non-existent: coberto via Comair (metadata apenas)
- A-D prevention boundary: coberto por regra de consequencia vs causa e por casos de migracao
- consequencia vs causa: coberto em todos os casos
- agent migration risk: coberto em todos os casos

## D. Lacunas remanescentes

1. Granularidade PF/PM/FE individual
- lacuna: modelos atuais permanecem majoritariamente `crew_collective`

2. Eventos com fonte insuficiente
- lacuna: USAir 427 permanece bloqueado por dominancia tecnica

3. Eventos de percepcao pura
- lacuna: poucos casos com isolamento limpo de P sem mistura forte com A

4. Eventos de objetivo com violacao consciente
- lacuna: O-axis com evidencia de intencao consciente segue fraco

5. Eventos action-specific sem mistura tecnica
- lacuna: varios casos combinam acao e limitacoes de contexto tecnico

6. Casos de comunicacao/informacao
- lacuna: cobertura limitada para falhas comunicacionais puras em cadeia multi-ator

7. Casos de time pressure
- lacuna: pressao temporal aparece implicitamente, mas sem pacote dedicado

8. Lacunas candidatas a sinteticos (futuro)
- lacuna: combinacoes adversariais de migracao de agente + pressao temporal + ambiguidade de ownership textual

## E. Classificacao de lacunas e decisao por lacuna

| lacuna | classificacao |
|---|---|
| PF/PM/FE granularidade | REAL_EVENT_ADDITIONAL_CANDIDATE_NEEDED |
| USAir 427 technical hold | REAL_EVENT_MORE_SOURCE_REQUIRED |
| percepcao pura isolada | REAL_EVENT_ADDITIONAL_CANDIDATE_NEEDED |
| objetivo com violacao consciente | REAL_EVENT_ADDITIONAL_CANDIDATE_NEEDED |
| action-specific sem mistura tecnica | REAL_EVENT_ADDITIONAL_CANDIDATE_NEEDED |
| comunicacao/informacao | REAL_EVENT_ADDITIONAL_CANDIDATE_NEEDED |
| time pressure dedicado | SYNTHETIC_CANDIDATE_NEEDED_LATER |
| ambiguidade lexical multiagente extrema | SYNTHETIC_CANDIDATE_NEEDED_LATER |
| abertura produto/UI/API | NOT_READY_FOR_PRODUCT |
| evento tecnico sem fonte suficiente (USAir 427) | HOLD |

## F. Conclusao

- nao avancar para produto nesta fase
- nao integrar UI/API nesta fase
- nao criar sinteticos nesta fase
- recomendacao para A4R193-D: priorizar `REAL_EVENT_MORE_SOURCE_REQUIRED` + `REAL_EVENT_ADDITIONAL_CANDIDATE_NEEDED` antes de qualquer autorizacao para sinteticos
- decisao formal A4R193-C: `NOT_READY_FOR_PRODUCT` e `REAL_ONLY_CONTINUE_WITH_SOURCE_ENRICHMENT`
