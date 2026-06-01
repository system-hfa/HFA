# SERA A4R194-F Readiness Plan v0.2.0

Status:
- READINESS_ONLY
- POST_DRAFT_AUDIT_GATE
- PRODUCT_BLOCKED

## Diretriz para A4R194-F

- A4R194-F deve ser uma auditoria independente Opus/GPT-5.5 do synthetic case draft
  design-only produzido em A4R194-E.
- A auditoria deve confirmar:
  - separacao PF/PM mantida e imutavel no desenho;
  - `sequenceRef` por ator presente;
  - `boundaryEvidenceRefs` apenas sinteticos;
  - consequence boundary bloqueando consequence-as-cause;
  - ausencia de selectedCode/releasedCode/finalConclusion;
  - ausencia de HFACS/Risk/ERC/ARMS/ERC/recommendations;
  - ausencia de pergunta de metodo inventada;
  - ausencia de fixture/baseline;
  - produto/UI/API bloqueado.

## Decisao subsequente

- Se a auditoria A4R194-F passar, uma fase futura ainda deve decidir, com autorizacao
  humana explicita, se materializa o piloto sob controle ou permanece design-only.
- Materializacao nunca e automatica apos a auditoria.

## Bloqueios permanentes nesta etapa

- Produto/UI/API continua bloqueado.
- Fixture continua bloqueado.
- Baseline continua bloqueado.
- Sem fechamento final P/O/A e sem downstream.
- RR-001: `OPEN`. RR-003: `PARTIALLY_MITIGATED`.
