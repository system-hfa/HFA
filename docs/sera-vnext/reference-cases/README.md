# Reference Cases Directory

Status: DRAFT_SKELETON
Phase: A4+R-50 — Consensus Reference Cases Skeleton

## Objetivo
Este diretório contém os consensus reference cases do pipeline SERA vNext, organizados conforme a [Consensus Reference Cases Policy](../SERA_ENGINE_VNEXT_CONSENSUS_REFERENCE_CASES_POLICY_v0.2.0.md) e usando o [Consensus Reference Case Template](../SERA_ENGINE_VNEXT_CONSENSUS_REFERENCE_CASE_TEMPLATE_v0.2.0.md).

## Status atual
**Nenhum caso neste diretório está validado para consenso.** Todos os drafts e skeletons continuam `NOT_CONSENSUS_VALIDATED`. O status `CONSENSUS_VALIDATED` só será atribuído após revisão por pelo menos 2 avaliadores qualificados e execução do protocolo aplicável.

## Workflow de status
1. `DRAFT_CASE_SKELETON` -> estrutura inicial sem conteúdo completo.
2. `MATERIALIZED_DRAFT` -> caso preenchido (sintético/real tratado), ainda sem consenso.
3. `REVIEW_READY` -> pronto para revisão formal.
4. `UNDER_REVIEW` -> em revisão por avaliadores independentes.
5. `CONSENSUS_CANDIDATE` -> discussão de consenso em curso com divergências registradas.
6. `CONSENSUS_VALIDATED` -> consenso formalmente registrado.
7. `REJECTED_OR_DEFERRED` -> rejeitado ou adiado.

Regras mandatórias:
- Não promover qualquer caso sem 2+ avaliadores independentes.
- Não usar `CONSENSUS_VALIDATED` sem execução do protocolo inter-rater aplicável.
- Caso materializado ou adversarial executável não equivale a consenso.

## Estrutura de nomenclatura
- `CRC-NNN` — caso nominal de referência.
- `CRC-NC-NNN` — caso de negative control.
- `CRC-ADV-NNN` — caso adversarial.
- `CRC-AMB-NNN` — caso de ambiguidade.
- `CRC-MA-NNN` — caso multi-actor.

Padrão de arquivos para novas materializações:
- `CRC-DRAFT-XXX.md`
- `CRC-ADVERSARIAL-DRAFT-XXX.md`
- `CRC-NEGATIVE-CONTROL-DRAFT-XXX.md`
- `CRC-CONSENSUS-XXX.md` somente após consenso real documentado.

## Arquivos

| Arquivo | Tipo | Status |
|---------|------|--------|
| CRC-SKELETON-001.md | Nominal | DRAFT_CASE_SKELETON |
| CRC-NEGATIVE-CONTROL-SKELETON-001.md | Negative control | DRAFT_CASE_SKELETON |
| CRC-ADVERSARIAL-SKELETON-001.md | Adversarial | DRAFT_CASE_SKELETON |
| CRC-ADVERSARIAL-DRAFT-001.md | Adversarial | MATERIALIZED_DRAFT / NOT_CONSENSUS_VALIDATED |
| CRC-NOMINAL-DRAFT-001.md | Nominal | MATERIALIZED_DRAFT / NOT_CONSENSUS_VALIDATED |
| CRC-NEGATIVE-CONTROL-DRAFT-001.md | Negative control | MATERIALIZED_DRAFT / NOT_CONSENSUS_VALIDATED |
| CRC-ADVERSARIAL-DRAFT-002.md | Adversarial | MATERIALIZED_DRAFT / NOT_CONSENSUS_VALIDATED |

## Pacote de revisão
- [Reference Case Review Package](../SERA_ENGINE_VNEXT_REFERENCE_CASE_REVIEW_PACKAGE_v0.2.0.md)
- [Review Tracker](./REVIEW_TRACKER_v0.2.0.md)

Todos os drafts listados acima permanecem `NOT_CONSENSUS_VALIDATED` nesta fase.

## Como adicionar um caso
1. Copiar o [template](../SERA_ENGINE_VNEXT_CONSENSUS_REFERENCE_CASE_TEMPLATE_v0.2.0.md).
2. Preencher todos os campos obrigatórios.
3. Submeter a revisão por pelo menos 2 avaliadores.
4. Atualizar esta tabela quando o caso for promovido a `CONSENSUS_VALIDATED`.

## Regras
- Nenhum caso neste diretório constitui verdade causal absoluta.
- Nenhum caso substitui julgamento humano em novos eventos.
- Nenhum caso valida cientificamente a metodologia.
- `CONSENSUS_VALIDATED` é proibido sem 2+ avaliadores e sem execução do protocolo aplicável.
- Linguagem: `consensus reference case for calibration`.
