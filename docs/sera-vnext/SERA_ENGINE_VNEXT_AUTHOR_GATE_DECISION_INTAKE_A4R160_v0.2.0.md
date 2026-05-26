# SERA Engine vNext Author Gate Decision Intake A4R160 v0.2.0

Status: AUTHOR_GATE_DECISION_INTAKE_RECORDED
Phase: A4R160
methodology: SERA
releaseStatus: NO_RELEASED_CODE
downstreamStatus: NO_DOWNSTREAM

## Objective

Register author review decisions for the five A4R159 gate candidates without opening P/O/A.

## Review Origin

- Source of review: ChatGPT author review over A4R159 gate-prep pack (`A4R160_CHATGPT_GATE_REVIEW_PACK.zip`).
- Intake in this phase is documentary only.

## Reviewed Events

- COMAIR-5191
- COLGAN-3407
- EXECUFLIGHT-1526
- HELIOS-522
- US-AIRWAYS-1549

## Author Decision Summary

| eventId | A4R159 status | author decision | corrected Quando | rationale | next action |
|---|---|---|---|---|---|
| COMAIR-5191 | GATE_CANDIDATE_READY_FOR_AUTHOR_REVIEW | APPROVE_WITH_MINOR_EDIT | "Quando a aeronave alinhou e iniciou a decolagem na RWY 26 como se estivesse na pista autorizada RWY 22, antes da aceleracao em pista incompativel e dos impactos subsequentes, a operacao deixou de estar em trajetoria segura/defensavel." | Keep gate at wrong-runway alignment/takeoff initiation, not hold-short crossing alone. | APPLY_MINOR_EDIT_IN_A4R161 |
| COLGAN-3407 | GATE_CANDIDATE_READY_WITH_CAUTION | REVISE_GATE | "Quando, na aproximacao final, a velocidade/margem de energia caiu abaixo da faixa operacional defensavel para a configuracao da aeronave sem correcao estabilizadora oportuna, antes da ativacao do stick shaker e da perda final de controle, a operacao deixou de estar em trajetoria segura/defensavel." | Current wording is too abstract; anchor on defensible energy threshold for configuration. | REVISE_GATE_WORDING_IN_A4R161 |
| EXECUFLIGHT-1526 | GATE_CANDIDATE_READY_WITH_CAUTION | APPROVE_WITH_MINOR_EDIT | "Quando, ja estabelecida no localizer, a aeronave permaneceu fora do perfil vertical defensavel de aproximacao e a continuidade passou a exigir uma recuperacao vertical agressiva/incompativel com uma aproximacao estabilizada antes da MDA, a operacao deixou de estar em trajetoria segura/defensavel." | Keep focus on loss of defensible vertical profile, not descent rate as standalone cause. | APPLY_MINOR_EDIT_IN_A4R161 |
| HELIOS-522 | GATE_CANDIDATE_READY_WITH_CAUTION | REVISE_GATE | "Quando a aeronave iniciou/continuou a subida com o sistema de pressurizacao em estado nao defensavel e, no intervalo que culmina no warning de altitude de cabine, nao houve restauracao do estado seguro antes da incapacitacao posterior, a operacao deixou de estar em trajetoria segura/defensavel." | Treat as uncertain interval; warning is marker, not automatic single-point gate. | REVISE_TO_INTERVAL_GATE_IN_A4R161 |
| US-AIRWAYS-1549 | GATE_CANDIDATE_READY_WITH_CAUTION | APPROVE_GATE | "Quando a colisao com aves resultou em perda quase total de empuxo nos dois motores durante a subida inicial, antes das decisoes de retorno, alternativa ou amerissagem, a operacao deixou de estar em trajetoria segura/defensavel." | Correct negative control onset remains technical/environmental. | KEEP_AND_RECONFIRM_IN_A4R161 |

## Decision Totals

- APPROVE_GATE: 1
- APPROVE_WITH_MINOR_EDIT: 2
- REVISE_GATE: 2
- REJECT_GATE: 0
- HOLD_FOR_SOURCE_OR_METHOD_REVIEW: 0

## Scope Locks

- no P/O/A opened
- no gate applied yet
- no A4R159 files modified
- next phase required to apply revisions

## Metrics

- authorGateDecisionIntakeCreatedCount: 1
- eventsReviewedCount: 5
- gateApprovedCount: 1
- gateApprovedWithMinorEditCount: 2
- gateRevisionRequiredCount: 2
- gateRejectedCount: 0
- gateHoldCount: 0
- authorDecisionMatrixCreatedCount: 1
- gateRevisionApplicationQueueCreatedCount: 1
- nextPhaseDecisionCreatedCount: 1
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
