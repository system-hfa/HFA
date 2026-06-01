# SERA A4R194-I Readiness Plan v0.2.0

Status:
- READINESS_ONLY
- POST_FINAL_AUDIT_DECISION_GATE
- PRODUCT_BLOCKED

## Diretriz para A4R194-I

Apos a auditoria final A4R194-H (`FINAL_DRAFT_AUDIT_PASS_WITH_WARNINGS`), a decisao fica
entre duas opcoes, sempre sob controle humano:

- Opcao preferida (conservadora): encerrar o bloco do piloto sintetico GAP-001 PF/PM e
  nao materializar. O draft permanece design-only como artefato de governanca.
- Opcao alternativa: preparar um controlled materialization draft somente com nova
  autorizacao humana explicita registrada, e ainda assim sem fixture, sem baseline e sem
  produto.

## Bloqueios permanentes nesta etapa

- Produto/UI/API continua bloqueado.
- Fixture continua bloqueado.
- Baseline continua bloqueado.
- Sem fechamento final P/O/A e sem downstream.
- Sem HFACS, Risk/ERC, ARMS/ERC nem recommendations.
- RR-001: `OPEN`. RR-003: `PARTIALLY_MITIGATED`.

## Restricoes para uma eventual fase I

- Se houver fase I, ela ainda nao pode criar fixture, baseline nem produto.
- Materializacao controlada, se autorizada, limita-se a um unico draft de caso piloto.
- Variante `PM_PRIMARY_MONITORING_FAILURE` exige novo `syntheticPilotId`, novo `scopeId`,
  nova sequencia e nova auditoria.
- Materializacao nunca e automatica apos a auditoria.
