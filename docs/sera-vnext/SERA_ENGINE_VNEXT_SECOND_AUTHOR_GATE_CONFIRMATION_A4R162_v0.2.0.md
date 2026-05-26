# SERA Engine vNext Second Author Gate Confirmation A4R162 v0.2.0

Status: SECOND_AUTHOR_GATE_CONFIRMATION_RECORDED
Phase: A4R162
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Record second author confirmation decisions for the two provisional A4R161 gates (COLGAN-3407 and HELIOS-522) with minor wording adjustments only.

## Inputs

- A4R160 author decision intake and matrix.
- A4R161 approved/provisional gate set and matrix.

## Decisions

- COLGAN-3407: CONFIRM_WITH_MINOR_EDIT
- HELIOS-522: CONFIRM_WITH_MINOR_EDIT

## Rationale by Event

### COLGAN-3407

- gate can leave provisional status.
- wording keeps methodology boundary: no impact onset and no automatic stick-shaker onset.
- threshold is framed as defensible energy/speed margin relative to configuration and low-speed-cue proximity.
- no P/O/A opened.

Final Quando:
"Quando, na aproximacao final, a velocidade/margem de energia da aeronave passou a ficar fora da faixa defensavel para a configuracao e para a proximidade do low-speed cue, sem restauracao estabilizadora antes da ativacao do stick shaker, a operacao deixou de estar em trajetoria segura/defensavel."

### HELIOS-522

- gate can leave provisional status.
- gate remains interval logic and is not reduced to a warning-only point.
- warning remains a factual marker, while onset is unsafe pressurization state through takeoff/climb interval.
- no P/O/A opened.

Final Quando:
"Quando a aeronave decolou e continuou a subida com o sistema de pressurizacao em estado nao defensavel e, no intervalo ate o warning de altitude de cabine, esse estado seguro nao foi restaurado antes da incapacitacao posterior, a operacao deixou de estar em trajetoria segura/defensavel."

## Scope Declaration

- no P/O/A opened
- no releasedCode
- no downstream
- no finalConclusion

## Impact

- both provisional gates become author-confirmed with minor edit.
- future P/O/A remains closed until explicit authorization.

## Metrics

- secondAuthorConfirmationCreatedCount: 1
- provisionalGatesReviewedCount: 2
- provisionalGatesConfirmedWithMinorEditCount: 2
- provisionalGatesStillProvisionalCount: 0
- provisionalGatesHeldCount: 0
- secondAuthorGateFilesCreatedCount: 2
- finalGateConfirmationMatrixCreatedCount: 1
- finalConfirmedGateCount: 5
- negativeControlConfirmedCount: 1
- futurePOAOpenedCount: 0
- poaClassifiedCount: 0
- releasedCodeCreatedCount: 0
- downstreamOpenedCount: 0
- finalConclusionCreatedCount: 0
- hfacsCreatedCount: 0
- riskErcCreatedCount: 0
- recommendationsCreatedCount: 0
- corpusFilesModifiedCount: 0
- corpusFilesMovedCount: 0
- corpusFilesDeletedCount: 0
- codeFixtureBaselineChangedCount: 0
- nextPhaseDecisionCreatedCount: 1
