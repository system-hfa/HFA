# SERA Engine vNext Human Factors Corpus Screening Summary A4R142 v0.2.0

Status: CORPUS_SCREENING_SUMMARY_RECORDED  
Phase: A4R142  
methodology: SERA  
releaseStatus: NO_RELEASED_CODE  
downstreamStatus: NO_DOWNSTREAM

## resumo quantitativo

- totalCorpusTxtFilesConsidered: 89
- filesScreenedCount: 89

Category counts:
- HF_POSITIVE_CANDIDATE: 9
- HF_MIXED_TECHNICAL_HUMAN: 47
- TECHNICAL_DOMINANT_NEGATIVE_CONTROL: 4
- SOURCE_INSUFFICIENT: 16
- DUPLICATE_OR_ALREADY_TRACKED: 10
- OUT_OF_SCOPE: 3

Additional counts:
- knownEventMappedCount: 20
- negativeControlCandidateCount: 4

## top candidates for future real-event reaudit intake

Priority set (screening-level only, no P/O/A):
1. ASIANA-214 (`a4r111-full` + `a4r105-curated`)
2. COMAIR-5191 (`a4r111-full` + `a4r105-curated`)
3. AMERICAN-965 (`a4r105-curated`)
4. AMERICAN-1420 (`a4r105-curated`)
5. BS211-Q400 / Colgan 3407 (`a4r111-full`)
6. HELIOS-522 (`a4r111-new50`)
7. KOREAN-801 (`a4r105-curated`)
8. REAL-EVENT-0016 evidence packet (`txt-events/pdf24_merged.txt`)
9. TUROY-EC225 (`a4r111-full` / `a4r111-new50`)
10. ATLAS-3591 (`a4r111-new50`)

topFutureReauditCandidateCount: 10

## technical negative control candidates

1. US-AIRWAYS-1549 (`a4r111-full`, `a4r111-new50`)
2. DELTA-191 variant (`a4r111-new50`)
3. DELTA-191 recovered mirror (`a4r111-recovered`)

These are preserved to validate anti-overclassification behavior when technical/environment onset dominates first departure.

## source insufficient cases

16 files were tagged `SOURCE_INSUFFICIENT`, mostly due low local TXT signal quality (sparse OCR/content extraction).  
Recommended action: local text recovery or replacement with better local extraction before candidate promotion.

## duplicates/already tracked

10 files were tagged `DUPLICATE_OR_ALREADY_TRACKED`, including:
- mirrored pool copies of the same occurrence;
- aggregate `pdf24_merged-*` packets (non-single-event direct input).

Recommended action: keep one canonical source per event and avoid duplicate processing.

## recommended next batches

### Batch A — high-value HF intake
- ASIANA-214, COMAIR-5191, AMERICAN-965, AMERICAN-1420, BS211-Q400, HELIOS-522.

### Batch B — mixed technical-human separation
- TUROY-EC225, ATLAS-3591, UPS-1354, KOREAN-801, EASTERN-401 packet lanes.

### Batch C — negative-control validation set
- US-AIRWAYS-1549 and DELTA-191 technical-dominant entries.

### Batch D — source-quality recovery
- all `SOURCE_INSUFFICIENT` entries before reuse.

## warning

No P/O/A was classified in A4R142.  
This output is an intake-screening layer only and must not be interpreted as P/O/A reference material.

## locks preserved

- NO_RELEASED_CODE
- NO_DOWNSTREAM
- no selectedCode classified
- no finalConclusion, HFACS, Risk/ERC, ARMS/ERC, recommendations
- no code/fixture/baseline/corpus modification

## A4R143 Independent Audit Overlay

- A4R143 audit recorded.
- A4R142 remains valid only as intake screening.
- HF_MIXED category must not be treated as final operational lane.
- SOURCE_INSUFFICIENT can mean poor local extraction, not poor event.
- Technical dominant cases remain negative controls.
- Revised lane structure must be used before selecting pilots.
- No P/O/A authority created.
- Future Claude/Opus audit may supersede or refine this overlay.
