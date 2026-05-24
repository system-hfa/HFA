# SERA Engine vNext Evidence Category Passive Runtime v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-58 — Evidence Categories Passive Runtime

## Objetivo
Implementar evidence categories no runtime vNext como metadado opcional/passivo, sem bloqueio obrigatório, sem alteração de classificação e sem abertura downstream.

## Relação com A4+R-52 e A4+R-57
- A4+R-52 definiu a decisão `PASSIVE_OPTIONAL_METADATA`.
- A4+R-57 mantém modo AI/Author adjudication, com adjudicação metodológica final pelo usuário.
- Esta fase materializa a decisão passiva no runtime sem transformar categoria em gate.

## Contrato de tipos
Adições no contrato vNext:
- `SeraVNextEvidenceCategoryMode = "PASSIVE_OPTIONAL_METADATA"`.
- `SeraVNextEvidenceCategoryHint`.
- Campo opcional `evidenceCategoryHints?` em:
  - `SeraVNextCodeTraceability`.
  - `VNextPreconditionCandidate`.

## Modo PASSIVE_OPTIONAL_METADATA
- Hints podem ser normalizados/mapeados/inferidos de forma conservadora.
- Hints podem ser propagados para rastreabilidade e preconditions.
- Hints não mudam `releasedCode`, `selectedCode` ou status de classificação.
- Hints não são obrigatórios.

## Categorias suportadas
- `PHYSICAL_CAPABILITY`
- `INTENT_AWARENESS`
- `TIME_PRESSURE`
- `COMMUNICATION_INFORMATION`
- `PROCEDURAL_MONITORING`
- `KNOWLEDGE_TRAINING`
- `SUPERVISION_COORDINATION`
- `OPERATIONAL_EFFICIENCY_PRESSURE`
- `SENSORY_LIMITATION`
- `PERCEPTUAL_AMBIGUITY`
- `FEEDBACK_VERIFICATION`
- `RULE_NORM_CONTEXT`
- `UNKNOWN_OR_UNCATEGORIZED`

## O que muda
- Runtime passa a aceitar e carregar hints passivos de evidence category.
- Traceability pode anexar hints por mapeamento conservador de código e sinais textuais.
- Preconditions pode receber hints via propagação da traceability.

## O que não muda
- Não há novo bloqueio por ausência de category.
- Category não altera classificação P/O/A.
- `selectedCode` permanece `UNRESOLVED` no core analisado.
- `O-E` permanece `NON_EXISTENT_IN_SERA_PT_V1`.
- A-A/A-C não são redefinidos.
- Sem downstream, sem `finalConclusion`, sem HFACS, sem Risk/ERC, sem recommendations.

## Ausência de categoria não bloqueia
A ausência de `evidenceCategoryHints` foi testada e não é tratada como bloqueio de fluxo por si só.

## Categoria não altera classificação
Hints passivos são metadados de suporte; não participam de promoção para `CLASSIFIED` e não alteram `releasedCode`.

## Categoria não libera downstream
Locks de downstream permanecem ativos (`downstream`, `finalConclusion`, `HFACS`, `Risk/ERC`, `recommendations`).

## Cenários testados
- Presença de hints preservada sem alterar código/status.
- Ausência de hints não bloqueia o fluxo.
- `PHYSICAL_CAPABILITY` pode acompanhar `A-D` como hint.
- `O-E` continua `NON_EXISTENT_IN_SERA_PT_V1`.
- Locks de downstream preservados.
- `selectedCode` permanece `UNRESOLVED`.

## Limitações
- Inferência textual é conservadora e não normativa.
- Hints não substituem evidência metodológica por eixo.
- Sem mudança de regra do semantic guard nesta fase.

## Atualização A4+R-59 — Passive Coverage Audit
- Auditoria passiva de cobertura categorial adicionada como diagnóstico não bloqueante.
- Gaps de cobertura são registrados como `PASSIVE_GAP` sem efeito de gate.
- Nenhuma mudança em `releasedCode`/`selectedCode`/status de classificação.
- Nenhum warning obrigatório novo no runtime nesta fase.

## Próxima fase recomendada
Evoluir de passivo para `warning` em escopo controlado, apenas após calibração de falso alarme/falso bloqueio e revisão metodológica incremental.
