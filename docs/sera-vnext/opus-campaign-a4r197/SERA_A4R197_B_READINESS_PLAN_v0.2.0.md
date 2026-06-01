# SERA A4R197-B Readiness Plan v0.2.0

Date: 2026-06-01
Target phase: A4R197-B
Status:
- READINESS_ONLY
- HUMAN_DECISION_REQUIRED
- A4R197_B_NOT_STARTED

## 1. Suggested scope

A4R197-B sugere auditoria Opus de:

- A4R196-A checkpoint;
- GAP-001 PF/PM controlled draft lineage (J K L);
- locks de promocao e bloqueios downstream.

## 2. Suggested inputs

- docs/sera-vnext/checkpoint-a4r196/*
- docs/sera-vnext/synthetic-pilots-a4r194/*A4R194_J*
- docs/sera-vnext/synthetic-pilots-a4r194/*A4R194_L*
- SERA_VNEXT_OPUS_REVIEW_PROMPT_CONTRACT_A4R197_A.md

## 3. Allowed outputs

- review verdict pack;
- warnings and methodological risk notes;
- lock preservation checklist;
- recommendation for next authorized route without execution.

## 4. Forbidden outputs

- selectedCode non-null;
- releasedCode non-null;
- finalConclusion;
- CLASSIFIED;
- fixture or baseline promotion;
- product UI API opening;
- HFACS Risk/ERC ARMS/ERC recommendations;
- automatic reentry or automatic READY.

## 5. Success criteria

- revisão independente consistente com A4R196-A locks;
- separacao clara entre evidencia e inferencia;
- ausencia de promocao indevida;
- definicao clara de riscos e bloqueios.

## 6. Blocking criteria

- tentativa de abrir locks de promocao;
- tentativa de classificar P/O/A sem fase autorizada para isso;
- confusao real-event vs synthetic;
- uso de outcome pos ponto de fuga para forcar classificacao.

## 7. Explicit note

A4R197-B_NOT_STARTED. Esta readiness nao inicia a fase.
