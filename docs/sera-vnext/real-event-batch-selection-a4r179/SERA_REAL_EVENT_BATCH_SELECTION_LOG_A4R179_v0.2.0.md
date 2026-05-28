# SERA Real Event Batch Selection Log — A4R179

## Comandos rodados
- git status --short --untracked-files=all
- git rev-parse HEAD origin/main
- git log --oneline --decorate -8
- validadores P1 candidate-only (4 scripts node)
- python3 para auditoria do A4R178 e ajuste focal de consistencia A4R179

## Arquivos lidos
- A4R177 obrigatorios (arquitetura, coverage target, synthetic gap policy, macro plan)
- A4R178 obrigatorios (inventory, summary, coverage map, dedupe register, plano A4R179)
- A4R176 matriz P1 candidate suite
- fixtures-candidates P1A/P1B para contexto

## Criterios usados
- scoring HIGH/MEDIUM/LOW/BLOCKED por qualidade, bucket, clareza, multi-actor/negative control, potencial de cobertura, risco de duplicata e necessidade de enriquecimento
- selecao por lanes com diversidade metodologica
- prioridade para gap de cobertura em codigos `not_covered_in_P1`

## Contagens
- candidatos no inventario A4R178: 382
- grupos de duplicata preliminar: 19
- lote A4R179 na matriz: 24

Lanes:
- Positive source candidates: 8
- Negative control candidates: 2
- P1 replication negative control: 1
- Multi-actor candidates: 4
- Boundary/ambiguous candidates: 4
- Insufficient evidence / UNRESOLVED candidates: 1
- Tracker/backfill review candidates: 2
- Source enrichment candidates: 2

Status:
- SELECT_FOR_A4R180_BATCH_1: 8
- SELECT_AS_NEGATIVE_CONTROL: 2
- P1_REPLICATION_NEGATIVE_CONTROL: 1
- SELECT_AS_MULTI_ACTOR: 4
- SELECT_AS_BOUNDARY_CASE: 3
- SELECT_AS_UNRESOLVED_CANDIDATE: 1
- SOURCE_ENRICHMENT_REQUIRED: 2
- DUPLICATE_REVIEW_REQUIRED: 1
- NOT_DIRECT_EVENT_SOURCE_FOR_A4R180: 2

## Ajustes de consistencia A4R179-fix
- lane `Clean positive candidates` renomeado para `Positive source candidates`.
- `A4R179-SEL-0021` e `A4R179-SEL-0022` reclassificados como `NOT_DIRECT_EVENT_SOURCE_FOR_A4R180` (tracker/backfill review).
- `A4R179-SEL-0009` (`US-AIRWAYS-1549`) reclassificado para `P1 replication negative control` com status `P1_REPLICATION_NEGATIVE_CONTROL`.
- dicionarios python crus removidos de decision/log e substituidos por listas legiveis.
- reforco documental: `HIGH_POTENTIAL` e hipotese de selecao, nao cobertura adjudicada.

## Resumo de auditoria A4R178 (base da selecao)
- sourceBucket: SOURCE_CORPUS_OFFICIAL_REPORT=187, REAL_EVENT_EXTRACTION=89, TRACKER_OR_INDEX=64, EXTERNAL_CANDIDATE=21, OFFICIAL_REPORT_SOURCE_SLICE=17, UNKNOWN_DOCS_SOURCE=3, LOCAL_UNTRACKED_SOURCE=1
- sourceQuality: HIGH=180, MEDIUM=110, LOW=65, UNKNOWN=27
- status: CANDIDATE_FOR_BATCH_SELECTION=220, NEEDS_SOURCE_ENRICHMENT=87, POSSIBLE_DUPLICATE=54, INVENTORIED_ONLY=20, HOLD=1
- escapePointClarity: UNCLEAR=188, PARTIAL=127, NOT_ASSESSED=67
- actorClarity: UNCLEAR=188, PARTIAL=127, NOT_ASSESSED=67
- multiActorPotential: UNKNOWN=375, POTENTIAL_MULTI_ACTOR=6, LOW=1
- negativeControlPotential: UNKNOWN=373, MEDIUM=8, HIGH=1

## Validacoes
- CSV selection e coverage gap validados com parse e checks de consistencia.
- validacao de escopo sem alteracao de runner/baseline/fixtures oficiais.

## Limitacoes
- potencial de cobertura ainda hipotetico
- sem adjudicacao final
- dedupe ainda parcial para parte do corpus

## Proximos passos
- A4R180: extracao estruturada por evento selecionado, com bloqueio para tracker/backfill sem fonte primaria.

## Confirmacao de escopo
- sem classificação SERA final
- sem fixture
- sem baseline
- sem runner
- sem chamada LLM/API
