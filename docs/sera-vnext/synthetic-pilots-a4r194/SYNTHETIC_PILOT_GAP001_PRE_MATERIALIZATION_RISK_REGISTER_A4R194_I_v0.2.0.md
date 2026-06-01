# Synthetic Pilot GAP-001 Pre-Materialization Risk Register A4R194-I v0.2.0

Status:
- RISK_REGISTER_ONLY
- PRE_MATERIALIZATION
- PRODUCT_BLOCKED

Fonte operacional de desenho: Daumas.

Este registro lista os riscos que devem permanecer controlados antes de qualquer
materializacao em A4R194-J. Nenhum risco aqui autoriza materializacao; todos sao
condicoes de guarda.

## Riscos

- RR-001 — residual lexical/agent ambiguity: `OPEN`.
  - Mitigacao parcial: PF/PM com `agentId` distinto (synthetic-pf-001 / synthetic-pm-001).
  - Acao antes de J: manter linguagem anti-fallback e rotulagem sintetica estrita.

- RR-003 — MDC/intake partial mitigation: `PARTIALLY_MITIGATED`.
  - Cobertura: envelope de intake estruturado A4R192-A/B/C, sem integracao produtiva.
  - Acao antes de J: confirmar que o draft materializado nao cria caminho produtivo.

- synthetic-as-real confusion.
  - Guarda: `notARealEvent = true` e boundaryEvidenceRefs marcados como placeholders
    sinteticos; nenhum uso como referencia real.

- hidden crew collective fallback.
  - Guarda: `crewCollectiveContextOnly = true`; crew collective nao pode substituir PF/PM.

- warning-as-anchor.
  - Guarda: TYPE-07_WARNING_TRAP mantem warning/callout do PM na zona de consequencia,
    nunca como anchor de escape-point.

- consequence-as-cause.
  - Guarda: `consequenceMayBeUsedAsCause = false`; consequencia nao pode virar causa.

- premature fixture conversion.
  - Guarda: `fixtureAllowed = false`; nenhuma promocao a fixture em I nem em J.

- premature baseline conversion.
  - Guarda: `baselineAllowed = false`; nenhuma promocao a baseline em I nem em J.

- product leakage.
  - Guarda: `productAllowed = false`; sem abertura de produto/UI/API; sem classificacao
    final, selectedCode, releasedCode ou finalConclusion.

## Conclusao do registro

Todos os riscos permanecem sob guarda. RR-001 segue `OPEN` e RR-003 segue
`PARTIALLY_MITIGATED`. Nenhuma condicao deste registro libera materializacao automatica.
