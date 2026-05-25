# SERA vNext Method Status

Nao utilizar documentos antigos como fonte de verdade sem consultar:

- [Methodology Control Board](./SERA_ENGINE_VNEXT_METHODOLOGY_CONTROL_BOARD_A4R135_v0.2.0.md)
- [Superseded and Quarantine Register](./SERA_ENGINE_VNEXT_SUPERSEDED_AND_QUARANTINE_REGISTER_A4R135_v0.2.0.md)
- [Candidate Freeze Readiness](./SERA_ENGINE_VNEXT_CANDIDATE_FREEZE_READINESS_v0.2.0.md)

## Regras

- Ponto de fuga antes de P/O/A.
- "Quando..." nao pode embutir causa, violacao ou warning como primeira saida.
- Arvore SERA real nao pode ser inventada.
- proposedCode nao e releasedCode.
- Author-approved draft parcial nao e release.
- Downstream continua bloqueado.

## Status rapido dos 7 eventos principais

| eventId | status | escapePoint | whenStatement | P | O | A |
|---|---|---|---|---|---|---|
| REAL-EVENT-0003 | AUTHOR_APPROVED_DRAFT_PARTIAL | DEFINED (A4R133) | VALID | P-G | O-A | UNRESOLVED |
| REAL-EVENT-0016 | ACTIVE_REVIEW | DEFINED (A4R130) | VALID | P-C | O-A | UNRESOLVED |
| BS211-Q400 | NEEDS_REBUILD | PATCHED (A4R134) | REVISED | P-H | O-C | A-F |
| A4R87-EXT-002 | NEEDS_REBUILD | PATCHED (A4R134) | REVISED | P-G | UNRESOLVED | UNRESOLVED |
| ASIANA-214 | ACTIVE_REVIEW | DEFINED (A4R130) | VALID | P-G | O-D | A-F |
| AMERICAN-965 | NEEDS_SOURCE_ENRICHMENT | UNRESOLVED | UNRESOLVED | review | O-D review | review |
| COMAIR-5191 | NEEDS_SOURCE_ENRICHMENT | UNRESOLVED | UNRESOLVED | P-G draft | UNRESOLVED | UNRESOLVED |

## O que NAO usar como referencia

- `reference-cases/` — pre-canonical, never validated.
- `questionpath-backfill/` — helper traces, not canonical tree.
- `release-pilot/` — P-axis micro-pilot, 3 de 4 withdrawn.
- `real-event-adjudications/` (pre-A4R126) — sem gate Hendy.
- `external-candidates/` (pre-A4R126) — sob quarentena de conclusoes.
- A4R131 author review packets — superseded by A4R132/A4R133/A4R134.
- Qualquer documento com "Quando..." nao validado.

## O que usar

- Control Board A4R135 para status atual de qualquer evento.
- A4R133 Author Decision para REAL-EVENT-0003.
- A4R134 Gate Patch para BS211-Q400 e A4R87-EXT-002 (draft, nao aprovado).
- A4R130 Full Rebuild tracker para os "Quando..." dos 5 eventos principais.
- A4R128 When Recovery tracker para UPS-1354, COLGAN-3407, UNITED-173.
- A4R99 Canonical Question Tree Asset para as perguntas da arvore SERA.

## Locks

- NO_RELEASED_CODE.
- NO_DOWNSTREAM.
- Sem finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations.
- Candidate freeze final nao autorizado.
