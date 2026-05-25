# SERA Engine vNext Human Factors Corpus Screening Protocol A4R142 v0.2.0

Status: CORPUS_SCREENING_PROTOCOL_RECORDED  
Phase: A4R142  
methodology: SERA  
authorDecisionStatus: NO_NEW_AUTHOR_DECISION  
releaseStatus: NO_RELEASED_CODE  
downstreamStatus: NO_DOWNSTREAM

## objective

Create an intake-screening layer for the local 89-TXT corpus to separate:
1. human-factors-positive candidates;
2. mixed technical-human candidates;
3. technical-dominant negative controls;
4. source-insufficient items;
5. duplicate/already-tracked items;
6. out-of-scope items.

## why A4R142 is needed

A4R141/A4R141-b were focal enrichments for REAL-EVENT-0016.  
A4R142 broadens methodology intake to the full local TXT corpus so SERA/HFA can prioritize high-value cases without overclassifying human factors where source evidence does not support it.

## relationship to Hendy/SERA and A4R137/A4R140

- Hendy/SERA requires identifying departure from safe operation before any P/O/A.
- A4R137 requires P/O/A at escape point, not post-outcome inference.
- A4R140 requires temporal discipline in progressive escape cases.
- A4R142 is an **intake layer only**: it prepares candidates and controls, but does not execute P/O/A.

## definition of human factors candidate

A case is a human-factors candidate when source text shows factual indications relevant to operator/crew cognition, intent, action, coordination, procedures, supervision, or operational management near departure from safe operation.

## definition of technical dominant negative control

A case is technical-dominant negative control when the best supported first-departure trigger is technical/environmental and human evidence is insufficient to support human-dominant interpretation at escape-point timing.

Negative controls are preserved to validate that the method blocks forced human classification.

## category definitions

### `HF_POSITIVE_CANDIDATE`
Strong factual human-factor signal near likely first departure from safe operation.

### `HF_MIXED_TECHNICAL_HUMAN`
Human and technical mechanisms both appear relevant; separation required before any P/O/A.

### `TECHNICAL_DOMINANT_NEGATIVE_CONTROL`
Technical/environment trigger appears dominant; retain as anti-overclassification control.

### `SOURCE_INSUFFICIENT`
Current TXT has inadequate narrative quality/density for reliable screening.

### `DUPLICATE_OR_ALREADY_TRACKED`
Mirrored report or aggregate packet that overlaps already tracked material.

### `OUT_OF_SCOPE`
Non-event artifact or non-single-event methodology/library material.

## evidence hints

Screening considered broad families of cues:
- event structure: accident/incident/history/findings/probable cause;
- human-factors cues: decision, monitoring, awareness, communication, CRM, checklist, procedure, workload, training, automation/interface;
- technical cues: failure/malfunction/defect/maintenance/bird strike/weather-driven technical onset;
- operational escape cues: descent/approach/stall/LOC/terrain/runway deviation and similar.

## screening method

For each TXT:
1. capture file identity (`filePath`, pool, inferred label);
2. apply broad term-based triage (not hit-count-only);
3. assign one category with confidence (`HIGH/MEDIUM/LOW`);
4. register compact evidence summaries and next action;
5. map known event IDs where pattern match is clear;
6. tag negative-control eligibility where applicable.

Output is recorded in:
- `docs/sera-vnext/source-corpus/HUMAN_FACTORS_CORPUS_SCREENING_TRACKER_A4R142_v0.2.0.md`
- `docs/sera-vnext/SERA_ENGINE_VNEXT_HUMAN_FACTORS_CORPUS_SCREENING_SUMMARY_A4R142_v0.2.0.md`

## rules against overclassification

- No P/O/A axis classification is allowed in A4R142.
- Presence of pilot/crew in narrative is not enough to infer human dominance.
- Post-outcome evidence cannot substitute escape-point evidence.
- Mixed cases remain mixed until first-departure mechanism is separated.
- Technical-dominant cases are preserved as controls, not promoted to human examples.

## how to use technical failures

Technical-dominant reports should be retained as `TECHNICAL_DOMINANT_NEGATIVE_CONTROL` for:
- testing classifier restraint;
- validating block behavior against forced human attribution;
- benchmarking future screening quality.

They are not positive P/O/A exemplars.

## locks preserved

- NO_NEW_AUTHOR_DECISION
- NO_RELEASED_CODE
- NO_DOWNSTREAM
- no P/O/A classification
- no finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations
- no code/runtime/UI/API/DB/migration/fixture/baseline change
- no corpus/source-file alteration
