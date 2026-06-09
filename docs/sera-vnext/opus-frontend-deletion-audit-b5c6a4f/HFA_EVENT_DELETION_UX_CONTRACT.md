# HFA/SERA — Event Deletion UX Contract

## Where the action appears
| Surface | Control | Visibility |
|---|---|---|
| Events list (`/events`) | Overflow "⋯" menu per row → "Excluir evento e dados relacionados" | authorized roles only |
| Event detail (`/events/[id]`) | Header, low-emphasis destructive button, separated from "Baixar PDF" | authorized roles only |
| vNext analysis detail (admin) | Already has Archive (soft). Hard delete hidden until data-model resolved | admin, flag-gated |
| Admin page | Optional "Lixeira / Recuperação" view listing soft-deleted events within window | admin only |

Do **not** place delete on the analysis-only screens where it could be confused with editing a classification.

## Required copy (Portuguese)
- **Label (never just "Excluir"):** `Excluir evento e dados relacionados`
- **Modal title:** `Excluir definitivamente este evento?`
- **Modal body (impact line):**
  `Esta ação removerá o evento, a análise, revisões, evidências, anexos e dados derivados.`
- **Recovery line (since we recommend a window):**
  `O evento poderá ser restaurado por 30 dias. Após esse período, a exclusão é permanente e irreversível.`
- **Reinforced confirmation:** `Para confirmar, digite o título do evento: "<título>"`
- **Reason (required):** `Motivo da exclusão` (textarea, min 5 chars, + optional category select)
- **Primary button:** `Excluir evento` (disabled until title matches and reason present)
- **Cancel:** `Cancelar`

## States the UI must handle
| State | Treatment |
|---|---|
| Idle | menu item / button |
| Impact loading | spinner in modal while `GET .../deletion-impact` resolves |
| Impact loaded | show counts (analyses, revisions, reviews, audit events, attachments, evidence, corrective actions, riskProfileImpact, recoverableUntil) |
| Confirm disabled | title mismatch or empty reason |
| Submitting | button spinner; block double-submit |
| Success (soft) | toast `Evento movido para a lixeira. Recuperável até <data>.`; remove row optimistically |
| Restore available | "Desfazer" toast action for a few seconds + persistent Lixeira entry |
| Failure | inline error with request_id; do not remove row |
| Blocked (e.g. export/reanalysis in progress) | explain the block; offer retry later |

## Accessibility / polish requirements
- Replace the current `window.confirm`/`window.prompt` flow (F-017) with an in-app modal: focus trap, `Esc` to cancel, `aria-modal`, descriptive `aria-label`s.
- Destructive button uses the static danger color mapping (no Tailwind template literals per project rules).
- Distinguish visually and verbally from **Arquivar** and **Desconsiderar do Perfil** so the three are never confused.

## Differentiation banner (mandatory)
Within the modal, include a one-line clarifier:
`Diferente de "Arquivar" (oculta, mantém dados) e "Desconsiderar do Perfil" (mantém o evento, só remove dos indicadores).`

## Progress & confirmation for the async hard delete
Because hard delete is asynchronous (after the window), the UI never blocks on it. The Lixeira view shows status: `Excluído (recuperável até <data>)` → after window → `Removido permanentemente`. No raw narrative is ever shown for a permanently removed item — only the tombstone fields.
