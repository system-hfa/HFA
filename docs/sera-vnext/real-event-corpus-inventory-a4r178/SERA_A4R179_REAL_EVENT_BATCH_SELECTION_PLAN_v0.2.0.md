# SERA A4R179 — Real Event Batch Selection by Coverage Gap

## Objetivos
- selecionar lote inicial de eventos reais por lacuna de cobertura P/O/A (hipotese);
- maximizar diversidade metodologica sem classificacao final;
- preparar insumos para extracao estruturada da fase seguinte.

## Entradas
- SERA_REAL_EVENT_CORPUS_INVENTORY_A4R178_v0.2.0.csv
- SERA_REAL_EVENT_PRELIMINARY_COVERAGE_MAP_A4R178_v0.2.0.csv
- SERA_REAL_EVENT_PRELIMINARY_DEDUPLICATION_REGISTER_A4R178_v0.2.0.csv
- matriz A4R177 e matrizes P1 A4R176/A4R175.

## Criterios de selecao
- prioridade por `priorityForBatchSelection` (P1 antes de P2/P3);
- preferir `TRACKED` com `sourceQuality` HIGH/MEDIUM;
- incluir mistura de clareza (`CLEAR_POTENTIAL`/`PARTIAL`) e casos `UNCLEAR` para lacunas reais;
- evitar grupos `POSSIBLE_DUPLICATE` sem consolidacao humana;
- manter separacao entre fato, conclusao original e hipotese SERA.

## Tamanho recomendado do lote inicial
- 24 a 36 eventos reais, em ondas de 8-12 para revisao incremental.

## Buckets recomendados
- positive clean cases;
- negative controls;
- multiator;
- ambiguous boundaries;
- insufficient evidence / UNRESOLVED candidates.

## Proibicoes
- sem classificacao final;
- sem fixture;
- sem baseline;
- sem sinteticos ainda.
