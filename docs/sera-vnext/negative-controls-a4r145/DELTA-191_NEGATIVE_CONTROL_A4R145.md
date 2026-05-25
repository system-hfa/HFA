# DELTA-191 Negative Control A4R145

Status: NEGATIVE_CONTROL_VALIDATION_ONLY
P/O/A status: NOT_CLASSIFIED
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## source files

- `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-11__1986__NTSB-USA__Lockheed-L-1011-TriStar__Delta-Air-Lines-Flight-191-L-1011-DFW-Micro.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-recovered-pool-txt/40__1986__NTSB-USA__Lockheed-L-1011-385-1__NTSB-AAR-86-05-Delta-191.txt`
- `docs/sera-vnext/source-corpus/HUMAN_FACTORS_CORPUS_SCREENING_TRACKER_A4R142_v0.2.0.md` (classification context)

## first departure technical/environmental evidence

- A4R142 tracker marks DELTA-191 as `TECHNICAL_DOMINANT_NEGATIVE_CONTROL`.
- Local TXT artifacts for this event currently show extraction-failure signatures (`TXT_EXTRACTION_FAILED`) in the available files, limiting direct narrative recovery in this phase.
- Available local evidence layer still supports technical/environmental dominant onset classification context, but with reduced confidence.

## human response after departure

- Crew response is expected to exist in original report chronology; however, current local text quality prevents fine-grained extraction in this phase.

## why response should not classify initial escape point

- Even if post-onset crew response is present, first-departure anchor for this control remains technical/environmental.
- Without clean local slice, method must avoid both overclassification and false certainty.

## anti-overclassification lesson

Low-quality local text must not push method into substituting a technical onset with speculative frontline human onset.

## negativeControlReadiness

`NEGATIVE_CONTROL_READY_WITH_CAUTION`

## recommended validation use

- Use as low-quality negative-control stress case for documentation discipline.
- Validate that the process preserves technical-dominant interpretation and requests source recovery where detail is insufficient.

## nextAction

Open targeted local source-recovery slice for DELTA-191 before any fine-grained escape-point gate work.
