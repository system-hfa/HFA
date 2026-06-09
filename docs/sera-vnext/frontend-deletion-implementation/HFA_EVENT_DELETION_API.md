# HFA Event Deletion API

Rotas implementadas:

- `GET /api/events/:id/deletion-impact`
  - admin-only
  - tenant-scoped
  - sem mutação
- `POST /api/events/:id/delete-request`
  - payload:
    - `reason`
    - `confirmationTitle`
  - valida:
    - admin
    - tenant
    - título exato
    - motivo obrigatório
    - idempotência
    - bloqueio por ações corretivas abertas
- `POST /api/events/:id/restore`
  - restaura dentro da janela
- `POST /api/events/:id/purge`
  - apenas `DRY_RUN` nesta fase
- `DELETE /api/events/:id`
  - retorna `EVENT_HARD_DELETE_DISABLED`

Contrato de impacto atual:
- `event`
- `legacyAnalyses`
- `vnextAnalyses`
- `revisions`
- `reviews`
- `auditEvents`
- `evidenceItems`
- `attachments`
- `exports`
- `correctiveActions`
- `riskProfileIncluded`
- `recoverableDays`
- `hardDeleteAvailable`
