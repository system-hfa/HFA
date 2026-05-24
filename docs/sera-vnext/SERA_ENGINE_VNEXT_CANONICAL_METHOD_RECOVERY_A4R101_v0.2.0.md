# SERA Engine vNext Canonical Method Recovery A4R101 v0.2.0

Status: CANONICAL_METHOD_RECOVERY  
Phase: A4+R-101  
DOCS_ONLY  
MACRO_AUDIT_ONLY  
NO_RELEASE  
NO_DOWNSTREAM

## 1. O que foi contaminado
- Reference trace A4R95 com fluxo de perguntas genéricas por placeholders e sem travessia canônica da árvore SERA.
- Família de `questionPath backfill` com perguntas auxiliares sintéticas (`Was ...`) sem texto exato canônico.
- Boundary pack pré-canônico (A4R96) sem registro obrigatório por nó/pergunta/opção canônica.
- Adjudicações históricas e alguns trackers que usam helper question-path não canônico para triagem.

## 2. O que foi limpo
- Governança de contaminação consolidada em A4R98:
  - `SERA_ENGINE_VNEXT_CANONICAL_CONTAMINATION_AUDIT_A4R98_v0.2.0.md`
  - `SERA_ENGINE_VNEXT_INVALID_REFERENCE_ARTIFACT_REGISTER_A4R98_v0.2.0.md`
- Terminologia travada em SERA (A4R99), sem uso de nomenclatura híbrida com barra.
- Contrato canônico reforçado para trace de referência.

## 3. O que ainda é inválido para reference/front-end
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-A4R95.md` (superseded/invalid).
- `docs/sera-vnext/SERA_ENGINE_VNEXT_WITHDRAWN_BOUNDARY_REFERENCE_PACK_A4R96_v0.2.0.md`.
- `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-WITHDRAWN-P-AXIS-BOUNDARY-PACK-A4R96.md`.
- `docs/sera-vnext/real-event-questionpath-backfill/*.md` para uso de proof/calibration/front-end.
- Adjudicações históricas com helper question-path não canônico permanecem material de triagem, não de prova canônica.

## 4. O que foi restaurado
- Asset canônico da árvore SERA:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- Matriz de cobertura canônica:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TREE_COVERAGE_MATRIX_A4R99_v0.2.0.md`
- Checklist de validação canônica:
  - `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_TRACE_VALIDATION_CHECKLIST_A4R99_v0.2.0.md`
- Rebuild canônico do reference trace do REAL-EVENT-0003:
  - `docs/sera-vnext/reference-case-traces/REFERENCE-CASE-REAL-EVENT-0003-PG-CANONICAL-A4R100.md`
  - status de validação: `PASS_WITH_LIMITATIONS`

## 5. O que continua bloqueado
- Qualquer trace que não use o asset canônico A4R99 como fonte obrigatória do fluxo.
- Qualquer eixo/trace com nó, pergunta, opção, next node ou leaf ausente no asset:
  - marcar `CANONICAL_NODE_MISSING`
  - parar construção do trace
- Qualquer uso de backfill/questionPath não canônico como prova metodológica, material de front-end calibration ou decisão de release.

## 6. Estado atual seguro
- Release efetivo mantido: REAL-EVENT-0003 `P-G` (somente eixo P; sem O/A release).
- Withdrawn mantidos por decisão autoral A4R92: REAL-EVENT-0015, N109W, N11NM.
- External adjudicated drafts (Batch 1): sem release.
- Downstream permanece fechado.
- Nenhuma alteração de runtime, fixtures, baseline, UI/API/DB, migrações.

## 7. Próxima estratégia macro
1. Estabilizar referência canônica já reconstruída (A4R100) via review autoral final.
2. Reclassificar canonicamente o universo rastreado (37 eventos) em lote macro por elegibilidade de referência.
3. Rebuild canônico do pack withdrawn/boundary em lote único, sem microfases por evento.
4. Só após positivo + boundary canônicos aprovados, avançar contrato de dados para front-end calibration.

## Guardrails permanentes
- Metodologia ativa: SERA.
- Proibido usar perguntas inventadas, equivalentes, resumidas ou traduzidas livremente para fluxo decisório.
- Em ausência de elemento canônico obrigatório: `CANONICAL_NODE_MISSING` e status `BLOCKED/UNRESOLVED/PARKED`.
