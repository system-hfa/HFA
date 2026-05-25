# SERA vNext Method Status

## A4R137 METHOD RESET

**Do not use any real-event P/O/A as methodological reference unless it has been reaudited under the P/O/A-at-escape-point rule (A4R137).**

- [Method Reset A4R137](./SERA_ENGINE_VNEXT_POA_AT_ESCAPE_POINT_METHOD_RESET_A4R137_v0.2.0.md)
- [Reset Register A4R137](./SERA_ENGINE_VNEXT_REAL_EVENT_POA_REAUDIT_RESET_REGISTER_A4R137_v0.2.0.md)
- [Methodology Control Board](./SERA_ENGINE_VNEXT_METHODOLOGY_CONTROL_BOARD_A4R135_v0.2.0.md)
- [Superseded and Quarantine Register](./SERA_ENGINE_VNEXT_SUPERSEDED_AND_QUARANTINE_REGISTER_A4R135_v0.2.0.md)
- [Reaudit Protocol A4R138](./SERA_ENGINE_VNEXT_REAL_EVENT_REAUDIT_PROTOCOL_A4R138_v0.2.0.md)
- [Reaudit Template](./REAL_EVENT_REAUDIT_TEMPLATE_A4R138.md)
- [Reaudit Pilot Plan](./SERA_ENGINE_VNEXT_REAL_EVENT_REAUDIT_PILOT_PLAN_A4R138_v0.2.0.md)
- [Progressive Escape Point Guidance A4R140](./SERA_ENGINE_VNEXT_PROGRESSIVE_ESCAPE_POINT_GUIDANCE_A4R140_v0.2.0.md)
- [Human Factors Corpus Screening Protocol A4R142](./SERA_ENGINE_VNEXT_HUMAN_FACTORS_CORPUS_SCREENING_PROTOCOL_A4R142_v0.2.0.md)
- [Human Factors Corpus Screening Tracker A4R142](./source-corpus/HUMAN_FACTORS_CORPUS_SCREENING_TRACKER_A4R142_v0.2.0.md)
- [Human Factors Corpus Screening Summary A4R142](./SERA_ENGINE_VNEXT_HUMAN_FACTORS_CORPUS_SCREENING_SUMMARY_A4R142_v0.2.0.md)
- [Candidate Freeze Readiness](./SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md)

## Regras

- Ponto de fuga antes de P/O/A.
- **P/O/A deve ser analisado no momento do ponto de fuga, nao a partir de eventos posteriores.** (A4R137)
- **Progressive escape zones exigem guidance A4R140 antes da decisao P/O/A.**
- "Quando..." nao pode embutir causa, violacao ou warning como primeira saida.
- Arvore SERA real nao pode ser inventada.
- proposedCode nao e releasedCode.
- Author-approved draft parcial nao e release.
- Downstream continua bloqueado.

## Status rapido dos 7 eventos principais (pós-A4R137)

| eventId | resetStatus (A4R137) | escapePoint | P/O/A reference |
|---|---|---|---|
| REAL-EVENT-0003 | POA_APPROVAL_SUSPENDED | DEFINED (A4R133) | NO — suspended |
| REAL-EVENT-0016 | NEEDS_SOURCE_ENRICHMENT_FOR_ESCAPE_POINT_POA | DEFINED (A4R130) | NO |
| BS211-Q400 | FULL_REBUILD_REQUIRED_AT_ESCAPE_POINT | PATCHED (A4R134) | NO |
| A4R87-EXT-002 | ESCAPE_POINT_AND_POA_REAUDIT_REQUIRED | PATCHED (A4R134) | NO |
| ASIANA-214 | POA_REAUDIT_REQUIRED_AT_ESCAPE_POINT | DEFINED (A4R130) | NO |
| AMERICAN-965 | NEEDS_SOURCE_ENRICHMENT | UNRESOLVED | NO |
| COMAIR-5191 | NEEDS_SOURCE_ENRICHMENT | UNRESOLVED | NO |

## O que NAO usar como referencia

- Qualquer P/O/A de evento real nao reauditado sob a regra "at escape point" (A4R137).
- `reference-cases/` — pre-canonical, never validated.
- `questionpath-backfill/` — helper traces, not canonical tree.
- `release-pilot/` — P-axis micro-pilot, 3 de 4 withdrawn.
- `real-event-adjudications/` (pre-A4R126) — sem gate Hendy.
- `external-candidates/` (pre-A4R126) — sob quarentena de conclusoes.
- A4R129/A4R130/A4R131/A4R132 (P/O/A) / A4R133 (P/O/A approval) / A4R136 — P/O/A suspended.

## O que usar

- A4R138 Reaudit Protocol para protocolo formal de reauditoria (template, piloto, regras).
- A4R137 Reset Register para status atual de P/O/A.
- A4R135 Control Board (com override A4R137) para status de evento.
- Factual extractions, source enrichment, timelines, evidence anchors (nao P/O/A).
- A4R134 Gate Patch para BS211-Q400 e A4R87-EXT-002 (draft, nao aprovado).
- A4R128 When Recovery tracker para "Quando..." de UPS-1354, COLGAN-3407, UNITED-173.
- A4R99 Canonical Question Tree Asset para as perguntas da arvore SERA.

## Locks

- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- Sem finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations.
- Candidate freeze final nao autorizado.
