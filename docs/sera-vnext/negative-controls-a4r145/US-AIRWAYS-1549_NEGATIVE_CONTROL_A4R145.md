# US-AIRWAYS-1549 Negative Control A4R145

Status: NEGATIVE_CONTROL_VALIDATION_ONLY
P/O/A status: NOT_CLASSIFIED
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## source files

- `docs/sera-vnext/source-corpus/official-reports/a4r111-full-pool-txt/39__2010__NTSB-USA__Airbus-A320-214__Aircraft-Accident-Report-AAR-10-03-US-Airwa.txt`
- `docs/sera-vnext/source-corpus/official-reports/a4r111-new50-pool-txt/NEW50-15__2010__NTSB-USA__Airbus-A320-214__US-Airways-Flight-1549-A320-214-Ditching-Hu.txt`
- `docs/sera-vnext/source-corpus/HUMAN_FACTORS_CORPUS_SCREENING_TRACKER_A4R142_v0.2.0.md` (classification context)

## first departure technical/environmental evidence

- Local source titles and abstract sections document bird encounter followed by near-total loss of thrust in both engines.
- Timeline snippets include immediate post-bird-strike thrust-loss communications.
- First departure appears technical/environmental/exogenous at onset.

## human response after departure

- Crew response includes emergency handling, checklist attempts, and forced water landing execution.
- This response is operationally relevant but occurs after technical onset.

## why response should not classify initial escape point

- A4R137/A4R138 require first departure anchor, not post-departure recovery behavior.
- Reconstructing initial escape as a frontline human-act onset would violate temporal anchoring.

## anti-overclassification lesson

When technical/environmental onset is explicit, preserve it as first departure and use crew behavior only as post-onset response analysis, not as forced human-causal replacement.

## negativeControlReadiness

`NEGATIVE_CONTROL_READY`

## recommended validation use

- Include in anti-overclassification checks for future gate drafting.
- Use as boundary test against converting post-onset response into initial frontline P/O/A trigger.

## nextAction

Keep in Lane C validation pack and pair with one low-quality control (DELTA-191) to test behavior under mixed source quality.
