# SERA vNext — Guardrail UI Contract (NF-02)

## Problem
Guardrails were computed but displayed only as `GUARDRAIL_VIOLATED_*` text in a generic warnings list. No dedicated panel, no human-readable labels, no evidence display, no review impact explanation.

## Solution
Created `GuardrailPanel` component (`frontend/src/components/sera/GuardrailPanel.tsx`).

### Display
- Each violated guardrail gets a dedicated card with: name, description, category, evidence list, review impact
- Cards are color-coded by category: methodology (blue), evidence (purple), boundary (amber), safety (red)
- When no guardrails are violated: green success card showing "Nenhuma salvaguarda violada"

### Human-Readable Mapping
| Guardrail Key | Display Name | Category |
|---|---|---|
| consequenceUsedAsCause | Consequência usada como causa | methodology |
| postEscapeHuntingDetected | Busca de evidência pós-fuga | evidence |
| postEscapeEvidenceUsed | Evidência pós-fuga presente | evidence |
| oeUsed | Código O-E detectado | methodology |
| inventedQuestionDetected | Pergunta reconstruída | methodology |
| actorMigrationDetected | Migração de ator | boundary |
| preconditionUsedAsEscapePoint | Precondição usada como ponto de fuga | boundary |
| codeFirstPathDetected | Caminho code-first | methodology |
| awarenessMissingForViolation | Consciência faltante para violação | safety |

### Integration
- Admin analysis detail page (`/admin/sera-vnext/analyses/[id]`) — Section 8
- Admin review page (via shared component)

### Testing
Playwright visual tests for: consequence-as-cause, post-escape usage, missing awareness, precondition-as-escape, actor migration.
