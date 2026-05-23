# Reference Cases Directory

Status: DRAFT_SKELETON
Phase: A4+R-50 — Consensus Reference Cases Skeleton

## Objetivo
Este diretório contém os consensus reference cases do pipeline SERA vNext, organizados conforme a [Consensus Reference Cases Policy](../SERA_ENGINE_VNEXT_CONSENSUS_REFERENCE_CASES_POLICY_v0.2.0.md) e usando o [Consensus Reference Case Template](../SERA_ENGINE_VNEXT_CONSENSUS_REFERENCE_CASE_TEMPLATE_v0.2.0.md).

## Status atual
**Nenhum caso neste diretório está validado para consenso.** Todos os arquivos `CRC-SKELETON-*` são skeletons, não casos de referência. O status `CONSENSUS_VALIDATED` só será atribuído após revisão por pelo menos 2 avaliadores qualificados.

## Estrutura de nomenclatura
- `CRC-NNN` — caso nominal de referência.
- `CRC-NC-NNN` — caso de negative control.
- `CRC-ADV-NNN` — caso adversarial.
- `CRC-AMB-NNN` — caso de ambiguidade.
- `CRC-MA-NNN` — caso multi-actor.

## Arquivos

| Arquivo | Tipo | Status |
|---------|------|--------|
| CRC-SKELETON-001.md | Nominal | DRAFT_CASE_SKELETON |
| CRC-NEGATIVE-CONTROL-SKELETON-001.md | Negative control | DRAFT_CASE_SKELETON |
| CRC-ADVERSARIAL-SKELETON-001.md | Adversarial | DRAFT_CASE_SKELETON |

## Como adicionar um caso
1. Copiar o [template](../SERA_ENGINE_VNEXT_CONSENSUS_REFERENCE_CASE_TEMPLATE_v0.2.0.md).
2. Preencher todos os campos obrigatórios.
3. Submeter a revisão por pelo menos 2 avaliadores.
4. Atualizar esta tabela quando o caso for promovido a `CONSENSUS_VALIDATED`.

## Regras
- Nenhum caso neste diretório constitui verdade causal absoluta.
- Nenhum caso substitui julgamento humano em novos eventos.
- Nenhum caso valida cientificamente a metodologia.
- Linguagem: `consensus reference case for calibration`.
