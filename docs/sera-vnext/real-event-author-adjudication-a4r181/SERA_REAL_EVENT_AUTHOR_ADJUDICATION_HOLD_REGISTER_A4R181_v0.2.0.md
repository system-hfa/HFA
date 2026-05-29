# SERA Real Event Author Adjudication Hold Register A4R181 v0.2.0

Status: HOLD_REGISTER_PREPARED
Phase: A4+R-181
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM
locks: NOT_FOR_FIXTURE, NOT_FOR_BASELINE, NOT_FINAL_P_O_A, NOT_RELEASED_CODE, NOT_DOWNSTREAM

## 1. Objetivo

Este registro lista os candidatos que NÃO recebem decisão autoral direta em A4R181 porque exigem ação prévia: consolidação de duplicatas, repair de fonte, boundary review técnico-vs-operador, ou source enrichment. Para cada um define-se o motivo do hold, a ação prévia necessária e o destino esperado.

Nenhum item aqui fecha P, O ou A; nenhum cria fixture, baseline, código liberado ou downstream. Holds são preparatórios.

## 2. Resumo dos holds

| ID | Evento | Batch | Status | Motivo do hold | Ação prévia |
|---|---|---|---|---|---|
| 0007 | Atlas 3591 | C | CONSOLIDATION_REQUIRED | Duplicata (par com 0008) | Consolidar antes de decisão de eixo |
| 0008 | Atlas 3591 (dup) | C | CONSOLIDATION_REQUIRED | Duplicata (par com 0007) + SOURCE_PARTIAL | Consolidar; usar 0007 como âncora |
| 0009 | US Airways 1549 | C | CONSOLIDATION_REQUIRED | Duplicata (par com 0019) + negative control | Consolidar; documentar eixos nominais |
| 0019 | US Airways 1549 (dup) | C | CONSOLIDATION_REQUIRED | Duplicata (par com 0009) | Consolidar com 0009 |
| 0011 | Korean Air 801 Guam | C | CONSOLIDATION_REQUIRED | Duplicata (par com 0016) + governance P-only prévia | Consolidar; respeitar/justificar reabertura A4R109/A4R110 |
| 0016 | Korean Air 801 (dup) | C | CONSOLIDATION_REQUIRED | Duplicata (par com 0011) | Consolidar com 0011 |
| 0014 | Sikorsky S-76A | D | HOLD_REPAIR_REQUIRED | SOURCE_MISMATCH (TXT companion contém evento errado) | Repair de fonte antes de qualquer extração-base |
| 0015 | USAir 427 | D | HOLD_BOUNDARY_REVIEW | TECHNICAL_DOMINANCE_BOUNDARY (rudder hardover) | Boundary review técnico-vs-operador antes de trace |
| 0020 | REAL-EVENT-0003 Tofino | D | HOLD_UNRESOLVED | SOURCE_PARTIAL preservado como UNRESOLVED | Manter unresolved; cross-reference |
| 0021 | QuestionPath backfill | D | HOLD_CROSS_REFERENCE_ONLY | Sem fonte de evento direta | Cross-reference com 0020 |
| 0022 | Queue B tracker | D | HOLD_CROSS_REFERENCE_ONLY | Sem fonte de evento direta | Cross-reference com individuais |
| 0023 | S-92A Sable Island | D | HOLD_SOURCE_ENRICHMENT_PENDING | NEEDS_SOURCE_ENRICHMENT (TSB A19A0055) | Source enrichment antes de adjudicação |
| 0024 | AW139 night over-water | D | HOLD_SOURCE_ENRICHMENT_PENDING | NEEDS_SOURCE_ENRICHMENT (NTSB ERA19FA210) | Source enrichment antes de adjudicação |

## 3. Consolidação obrigatória (BATCH_C)

Três pares de duplicatas precisam ser fundidos em uma adjudicação por grupo antes de qualquer decisão de eixo. A regra de ponto de fuga único deve ser preservada na consolidação: um escapePointId por grupo, com actorContributionId distintos se multi-actor.

### 3.1 DUPLICATE_GROUP_ATLAS_3591 (0007 + 0008)
- 0007 é a extração mais completa (NARRATIVE_SUFFICIENT); 0008 marca SOURCE_PARTIAL_NEEDS_CAUTION.
- Ação: fundir em adjudicação única ancorada em 0007; 0008 contribui apenas onde acrescenta fato não-redundante.
- Cuidado: não double-count o mesmo fato presente nas duas extrações.

### 3.2 DUPLICATE_GROUP_US_AIRWAYS_1549 (0009 + 0019)
- Ambas NARRATIVE_SUFFICIENT. Evento de negative control (ditching bem-sucedido).
- Ação: fundir; documentar explicitamente os eixos nominais. Outcome bem-sucedido/heroico NÃO prova ausência de falha — os eixos devem ser avaliados pelos fatos, não pelo desfecho.

### 3.3 DUPLICATE_GROUP_KOREAN_801 (0011 + 0016)
- Ambas NARRATIVE_THIN_NEEDS_ENRICHMENT. Governance P-only prévia (A4R109/A4R110).
- Ação: fundir; respeitar a governance prévia ou justificar explicitamente a reabertura antes de qualquer adjudicação de eixo.

## 4. Holds de fonte e boundary (BATCH_D)

### 4.1 0014 — Sikorsky S-76A — HOLD_REPAIR_REQUIRED
- Motivo: o TXT companion contém um evento diferente (Cessna 172R, FTW02LA122). Não se pode adjudicar com fonte de outro evento.
- Ação prévia: repair de fonte (localizar/anexar o relatório correto do S-76A). Risco de propagação: verificar se outros TXT companions têm o mesmo problema.
- Destino: só retorna a candidato após repair confirmado.

### 4.2 0015 — USAir 427 — HOLD_BOUNDARY_REVIEW
- Motivo: dominância técnica (rudder hardover) cria boundary técnico-vs-operador. Falha técnica dominante não deve ser atribuída a operador.
- Ação prévia: boundary review formal antes de qualquer trace, separando dimensão técnica de dimensão humana.
- Destino: retorna a candidato apenas se o boundary review identificar um eixo humano defensável.

### 4.3 0020 — REAL-EVENT-0003 Tofino — HOLD_UNRESOLVED
- Motivo: SOURCE_PARTIAL; o estado UNRESOLVED foi preservado de fase anterior.
- Ação prévia: manter unresolved; usar como cross-reference para 0021.

### 4.4 0021 — QuestionPath backfill — HOLD_CROSS_REFERENCE_ONLY
- Motivo: não há fonte de evento direta (HOLD_NO_DIRECT_EVENT_SOURCE).
- Ação prévia: tratar como cross-reference com 0020; não adjudicar como evento.

### 4.5 0022 — Queue B tracker — HOLD_CROSS_REFERENCE_ONLY
- Motivo: não há fonte de evento direta; é um tracker.
- Ação prévia: cross-reference com os candidatos individuais; não adjudicar como evento.

### 4.6 0023 — S-92A Sable Island — HOLD_SOURCE_ENRICHMENT_PENDING
- Motivo: NEEDS_SOURCE_ENRICHMENT; fonte TSB A19A0055 pendente de enriquecimento.
- Ação prévia: source enrichment antes de adjudicação.

### 4.7 0024 — AW139 night over-water — HOLD_SOURCE_ENRICHMENT_PENDING
- Motivo: NEEDS_SOURCE_ENRICHMENT; fonte NTSB ERA19FA210 pendente de enriquecimento.
- Ação prévia: source enrichment antes de adjudicação.

## 5. Regra preservada

Em nenhum hold se descreve o caso como tendo mais de um ponto de fuga. Mantém-se a regra de ponto de fuga único; quando há dúvida de escopo, formula-se como escopo próprio de ponto de fuga a ser decidido em fase futura. O outcome não é o ponto de fuga em nenhum caso. Nenhuma probable cause externa é importada como código SERA.

## 6. Próxima ação

- BATCH_C: executar as três consolidações (seção 3) e então gerar adjudicação por grupo.
- BATCH_D: executar repair (0014), boundary review (0015), source enrichment (0023/0024); manter cross-reference (0020/0021/0022).
- Nenhuma destas ações ocorre em A4R181; este registro apenas as enumera e justifica.
