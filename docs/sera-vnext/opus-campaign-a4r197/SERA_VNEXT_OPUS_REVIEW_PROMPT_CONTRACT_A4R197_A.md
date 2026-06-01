# SERA vNext Opus Review Prompt Contract A4R197-A

Date: 2026-06-01
Phase: A4R197-A
Status: prompt contract only

Fonte operacional de desenho: Daumas (methodology/reference-only, sem reentry automatico).

## 1. Purpose

Este contrato define como o Opus deve atuar em futuras fases autorizadas da campanha, sem
abrir locks metodologicos ou de produto.

## 2. Mandatory instructions

- Opus deve auditar, nao promover.
- Opus deve separar evidencia observada de inferencia.
- Opus deve identificar ponto de fuga com formulacao "quando ...".
- Opus deve avaliar P/O/A apenas no ponto de fuga, se e somente se houver fase autorizada.
- Nesta campanha, Opus deve priorizar suficiencia de fonte, lacunas e riscos.
- Opus deve retornar verdicts controlados.
- Opus nao deve criar releasedCode, selectedCode, finalConclusion ou downstream.
- Opus nao deve transformar evento real em sintetico.
- Opus nao deve transformar sintetico em evento real.
- Opus nao deve usar Daumas como reentry automatico.

## 3. Source recovery verdicts permitidos

- SOURCE_RECOVERY_SUCCESS
- SOURCE_RECOVERY_PARTIAL
- SOURCE_STILL_INSUFFICIENT
- NEGATIVE_CONTROL_CANDIDATE
- BOUNDARY_CASE_ONLY
- DO_NOT_USE_FOR_REENTRY

## 4. Methodology review verdicts permitidos

- REVIEW_PASS
- REVIEW_PASS_WITH_WARNINGS
- REVIEW_HOLD
- REVIEW_BLOCKED
- REQUIRES_HUMAN_DECISION

## 5. Explicit prohibitions

- no selectedCode non-null
- no releasedCode non-null
- no finalConclusion
- no CLASSIFIED
- no fixture or baseline promotion
- no product UI API opening
- no HFACS Risk/ERC ARMS/ERC recommendations
- no automatic READY or automatic reentry

## 6. Execution gate

Este contrato e preparatorio. A aplicacao real dele exige fase posterior explicitamente
autorizada por texto humano.
