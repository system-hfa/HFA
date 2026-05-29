# SERA Real Event Structured Extraction Log A4R180 v0.2.0

Status: STRUCTURED_EXTRACTION_LOG
Phase: A4+R-180
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## 1. Comandos rodados

### 1.1 Estado git
- `git status --short --untracked-files=all`
- `git rev-parse HEAD origin/main`
- `git log --oneline --decorate -12`

Confirmação: HEAD == origin/main == 5a4c86b10f8c17944d871a7c26b42eb7ada691ef. Branch: main. Repositório limpo de modificações tracked; arquivos untracked pré-existentes em `tmp/` (zip A4R179) e `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/40__1986__NTSB-USA__Lockheed-L-1011-385-1__NTSB-AAR-86-05-Delta-191.txt`.

### 1.2 Validadores P1
- `node docs/sera-vnext/fixture-implementation-contract-a4r172/validate-sera-reference-p1a-fixtures.mjs` → OK
- `node docs/sera-vnext/candidate-runner-a4r173/validate-reference-p1a-candidate-runner.mjs` → PASS
- `node docs/sera-vnext/candidate-runner-a4r175/validate-reference-p1b-candidate-runner.mjs` → PASS
- `node docs/sera-vnext/candidate-runner-a4r175/validate-reference-p1-candidate-suite.mjs` → PASS

Todos os validadores indicaram: baselineTouched=false, officialFixturesTouched=false, apiCall=false, llmCall=false.

### 1.3 Criação de diretórios
- `mkdir -p docs/sera-vnext/real-event-structured-extraction-a4r180/extractions`

### 1.4 Python verificação de existência de fontes
- Script Python verificou os 24 sourcePaths da matriz A4R179 — todos os 24 retornaram EXISTS.

### 1.5 Listagem de TXT pools
- `find docs/sera-vnext/official-report-source-slices -name "*.md"` (17 slices listados)
- `ls docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/`
- `ls docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/`
- `ls docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/`

Todos os PDFs selecionados em A4R179 têm TXT companion correspondente.

## 2. Arquivos lidos (fontes consultadas)

### 2.1 A4R179
- `docs/sera-vnext/real-event-batch-selection-a4r179/SERA_REAL_EVENT_BATCH_SELECTION_MATRIX_A4R179_v0.2.0.csv` (24 linhas)
- `docs/sera-vnext/real-event-batch-selection-a4r179/SERA_A4R180_STRUCTURED_EXTRACTION_PLAN_v0.2.0.md`

### 2.2 A4R178 (referenciado, não lido detalhadamente nesta fase)
- Referência cruzada via matriz A4R179 a `SERA_REAL_EVENT_CORPUS_INVENTORY_A4R178_v0.2.0.csv`

### 2.3 Source slices oficiais (A4R106/A4R115/A4R119) — TODOS LIDOS
- `docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-ASIANA-214-A4R106.md`
- `docs/sera-vnext/official-report-source-slices/a4r106/SOURCE-SLICE-COMAIR-5191-A4R106.md`
- `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-AMERICAN-1420-A4R115.md`
- `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-COLGAN-3407-A4R115.md`
- `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-HELIOS-522-A4R115.md`
- `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-UPS-1354-A4R115.md`
- `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-US-AIRWAYS-1549-A4R115.md`
- `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-USAIR-427-A4R115.md`
- `docs/sera-vnext/official-report-source-slices/a4r115/SOURCE-SLICE-KOREAN-801-BOUNDARY-A4R115.md`
- `docs/sera-vnext/official-report-source-slices/a4r119/SOURCE-SLICE-ATLAS-3591-A4R119.md`
- `docs/sera-vnext/official-report-source-slices/a4r119/SOURCE-SLICE-UNITED-173-A4R119.md`
- `docs/sera-vnext/official-report-source-slices/a4r119/SOURCE-SLICE-UNITED-232-A4R119.md`

### 2.4 TXT companheiros (lidos parcialmente — head/sumário/history)
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/24__1996__Aeronautica-Civil-Colombia__Boeing-757-223__Controlled-Flight-Into-Terrain-American-Air.txt` (history of flight detalhado, CVR/ATC excerpts)
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/5__2000__NTSB-USA__Boeing-747-300__Controlled-Flight-Into-Terrain-Korean-Air-Fl.txt` (índice estrutural; conteúdo via slice cross-referência)
- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/46__2021__TSB-Canada__Light-helicopter-or-small-aircraft-see-report-for-exact-type__Air-transportation-safety-investigation-repor.txt` (summary + history of flight)
- `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/NEW50-24__2015__TSB-Canada__Bell-206B__TSB-A13W0070-Bell-206B-Fort-McMurray.txt` (summary + history of flight + GPS waypoint sequence)
- `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-29__2006__NTSB-USA__Sikorsky-S-76A__Sikorsky-S-76A-offshore-CFIT-Gulf-of-Mexic.txt` (TXT MISMATCH detectado — contém Cessna 172R FTW02LA122, NÃO Sikorsky S-76A)

### 2.5 Reaudit / tracker / backfill / external candidates
- `docs/sera-vnext/real-event-reaudits-a4r139/REAL-EVENT-0003_REAUDIT_AT_ESCAPE_POINT_A4R139_v0.2.0.md` (escape point statement + P/O/A axis sections)
- `docs/sera-vnext/real-event-questionpath-backfill/QUESTIONPATH-BACKFILL-BATCH2-001.md` (header)
- `docs/sera-vnext/real-event-escape-point-reaudit/QUEUE_B_P0_POA_REVIEW_TRACKER_A4R129_v0.2.0.md` (header + tabela de 7 eventos)
- `docs/sera-vnext/external-candidates/extractions-batch-1/EXT-BATCH1-EXTRACTION-001.md` (header)
- `docs/sera-vnext/external-candidates/extractions-batch-1/EXT-BATCH1-EXTRACTION-002.md` (header)

## 3. Fontes acessadas (por SEL)

| selectionId | sourceAccessStatus | notas |
|---|---|---|
| SEL-0001 | ACCESSED | Source slice A4R106 |
| SEL-0002 | ACCESSED | Source slice A4R106 |
| SEL-0003 | ACCESSED | Source slice A4R115 |
| SEL-0004 | ACCESSED | Source slice A4R115 |
| SEL-0005 | ACCESSED | Source slice A4R115 (PARTIAL_FOR_TRACE_DRAFT) |
| SEL-0006 | ACCESSED | Source slice A4R115 |
| SEL-0007 | ACCESSED | Source slice A4R119 |
| SEL-0008 | ACCESSED_VIA_COMPANION_SLICE | PDF não lido direto; conteúdo no slice 0007 |
| SEL-0009 | ACCESSED | Source slice A4R115 |
| SEL-0010 | ACCESSED_VIA_TXT_COMPANION | TXT 24__... lido detalhadamente |
| SEL-0011 | ACCESSED_VIA_TXT_COMPANION | TXT 5__... índice + slice 0016 cross-ref |
| SEL-0012 | ACCESSED_VIA_TXT_COMPANION | TXT 46__... summary + history of flight |
| SEL-0013 | ACCESSED_VIA_TXT_COMPANION | TXT NEW50-24__... summary + history + GPS |
| SEL-0014 | SOURCE_PARTIAL_TXT_MISMATCH | TXT NEW50-29 contém Cessna 172R FTW02LA122 (mismatch) |
| SEL-0015 | ACCESSED | Source slice A4R115 (HELD_OVERCLASSIFICATION_RISK) |
| SEL-0016 | ACCESSED | Source slice A4R115 |
| SEL-0017 | ACCESSED | Source slice A4R119 |
| SEL-0018 | ACCESSED | Source slice A4R119 |
| SEL-0019 | ACCESSED_VIA_TXT_COMPANION | Duplicate de SEL-0009 |
| SEL-0020 | ACCESSED | Reaudit A4R139 |
| SEL-0021 | ACCESSED | Backfill header |
| SEL-0022 | ACCESSED | Tracker header + tabela |
| SEL-0023 | ACCESSED | External extraction draft (NEEDS_SOURCE_ENRICHMENT) |
| SEL-0024 | ACCESSED | External extraction draft (NEEDS_SOURCE_ENRICHMENT) |

## 4. Quantidades

- Total candidatos A4R179: 24
- Total extractionIds criados: 24
- Extrações completas: 17
- Extrações duplicate (consolidáveis): 3 (0008, 0011, 0019)
- Extrações HOLD: 4 (0014, 0015, 0021, 0022)
- Extrações NEEDS_SOURCE_ENRICHMENT: 3 (0014, 0023, 0024) — 0014 também hold
- Negative controls handled: 2 (0009, 0019)
- Multi-actor handled: 5 (0004, 0007, 0008, 0010, 0018) — sendo 0008 consolidação com 0007
- Lanes representadas: 8

## 5. Holds explicitamente registrados

- 0014 — Sikorsky S-76A — TXT_MISMATCH (Cessna 172R FTW02LA122) — necessita leitura direta do PDF ou re-extração do TXT
- 0015 — USAir 427 — HELD_OVERCLASSIFICATION_RISK por dominância de sistema rudder no relatório
- 0021 — QUESTIONPATH-BACKFILL-BATCH2-001 — NOT_DIRECT_EVENT_SOURCE_FOR_A4R180 (tracker/backfill)
- 0022 — QUEUE_B_P0_POA_REVIEW_TRACKER_A4R129 — NOT_DIRECT_EVENT_SOURCE_FOR_A4R180 (tracker)

## 6. Validações realizadas

Ver `SERA_REAL_EVENT_STRUCTURED_EXTRACTION_LOG_A4R180_v0.2.0.md` seção 7 (validations).

## 7. Limitações

1. **TXT mismatch (0014)**: amostragem para verificar se outros TXT companions têm mismatch similar não foi exaustiva.
2. **PDFs não lidos diretamente**: por escopo "Não chamar LLM/API" e foco em TXT companions, PDFs foram referenciados mas não lidos diretamente.
3. **Korean Air 801 (0011)**: TXT foi acessado apenas via estrutura/índice; conteúdo factual veio via slice A4R115 (0016).
4. **Duplicates**: 3 pares identificados como apontando para o mesmo evento físico (0007+0008, 0009+0019, 0011+0016); A4R181 deve consolidar.
5. **Multi-actor framing**: lanes A4R179 selecionaram 0012 e 0013 como multi-actor, mas natureza single-pilot torna framing questionável; A4R181 deve revisar.

## 8. Confirmação de sem classificação SERA final

Confirmação explícita:
- NENHUM fechamento P/O/A foi feito.
- NENHUM selectedCode com status fechado foi usado.
- NENHUM released code SERA foi proposto.
- NENHUM `finalConclusion` foi documentado.
- NENHUM HFACS/Risk/ERC/ARMS/ERC foi aplicado.
- NENHUMA recommendation foi gerada.
- NENHUMA promoção candidate → official foi realizada.
- NENHUM commit/push foi realizado.
- NENHUMA chamada LLM/API foi feita.
- NENHUMA alteração de fixtures/baseline/runner/runtime/.ts/motor SERA/release/downstream foi realizada.

Todos os 24 arquivos de extração e o resumo carregam locks:
- STRUCTURED_EXTRACTION_ONLY
- NO_FINAL_P_O_A
- NO_FIXTURE
- NO_BASELINE
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 9. Próximo passo

A4R181 — Author Adjudication Real Event Batch — conforme `SERA_A4R181_AUTHOR_ADJUDICATION_PLAN_v0.2.0.md`.
