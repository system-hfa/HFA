# SERA Engine vNext Consensus Reference Case Template v0.2.0

Status: TEMPLATE
Phase: A4+R-50 — Consensus Reference Cases Skeleton

## Objetivo
Fornecer a estrutura padrão para documentar consensus reference cases no pipeline SERA vNext, garantindo rastreabilidade, reprodutibilidade e aderência à política de governança metodológica.

## Como usar
1. Copiar este template para um novo arquivo no diretório `docs/sera-vnext/reference-cases/`.
2. Preencher todos os campos obrigatórios.
3. Submeter a no mínimo 2 avaliadores qualificados.
4. Registrar divergências e decisão de consenso.
5. Somente após consenso, alterar `consensusStatus` para `CONSENSUS_VALIDATED`.

**Este template não deve ser usado como caso validado. É apenas estrutura.**

## Estrutura obrigatória

### caseId
`CRC-XXX` — identificador único. Ex.: `CRC-001`, `CRC-NC-001`, `CRC-ADV-001`.

### sourceType
Um de: `REAL_EVENT | SYNTHETIC | ADVERSARIAL | NEGATIVE_CONTROL | AMBIGUITY`.

### factualSummary
Resumo factual do evento ou cenário, em linguagem neutra, sem classificação causal. Deve conter:
- contexto operacional;
- sequência de eventos relevante;
- condições ambientais/organizacionais quando aplicável.

### unsafeState
Descrição do estado inseguro relevante para a análise.

### unsafeActCondition
Descrição do ato ou condição insegura sob análise. Um único ato/condição por caso nesta fase.

### directActor
Descrição do ator direto (papel operacional, sem dados pessoais).

### proposed P/O/A (por avaliador, antes de consenso)
| Axis | Avaliador 1 | Avaliador 2 | ... |
|------|-------------|-------------|-----|
| P    |             |             |     |
| O    |             |             |     |
| A    |             |             |     |

Confidence por eixo: `LOW | MEDIUM | HIGH`

### released P/O/A por consenso
Códigos finais acordados após reunião de consenso:

| Axis | Code | Confidence |
|------|------|------------|
| P    |      |            |
| O    |      |            |
| A    |      |            |

### rationale por eixo
- **P**: justificativa baseada em evidência para o código Perception.
- **O**: justificativa baseada em evidência para o código Objective.
- **A**: justificativa baseada em evidência para o código Action.

### evidenceRefs
Lista de referências a evidências que suportam a classificação. Formato: `[E-XXX] descrição curta`.

### acceptedUncertainty
Incertezas reconhecidas e mantidas no consenso. O que não se sabe, o que poderia mudar a classificação.

### rejectedAlternatives
| Axis | Rejected Code | Rationale for Rejection |
|------|--------------|------------------------|
| P    |              |                         |
| O    |              |                         |
| A    |              |                         |

### expectedLocks
- `downstreamLocked = true`
- `finalConclusionLocked = true`
- `hfacsLocked = true`
- `riskLocked = true`
- `recommendationsLocked = true`
- `selectedCodesRemainUnresolved`
- `causalCoreOnly = true`

### evidenceCategoryHints (opcional, design-only)
Categorias de evidência sugeridas, sem obrigatoriedade de runtime:
- `PHYSICAL_CAPABILITY | INTENT_AWARENESS | TIME_PRESSURE | COMMUNICATION_INFORMATION | PROCEDURAL_MONITORING | KNOWLEDGE_TRAINING | SUPERVISION_COORDINATION | OPERATIONAL_EFFICIENCY_PRESSURE | SENSORY_LIMITATION | PERCEPTUAL_AMBIGUITY | FEEDBACK_VERIFICATION | RULE_NORM_CONTEXT | UNKNOWN_OR_UNCATEGORIZED`

### reviewerNotes
Observações dos revisores, contexto adicional, limitações do caso, sugestões de uso.

### consensusStatus
Um de:
- `DRAFT_CASE_SKELETON` — caso em elaboração, não revisado.
- `UNDER_CONSENSUS_REVIEW` — em revisão por avaliadores.
- `CONSENSUS_VALIDATED` — consenso atingido, caso promovido a referência.
- `CONSENSUS_BLOCKED` — divergência não resolvida, caso não promovido.

## Regras
- **Não usar como verdade absoluta.** Este caso é referência de consenso, não prova de causalidade real.
- **Não promover sem pelo menos 2 avaliadores.** `consensusStatus = CONSENSUS_VALIDATED` exige revisão documentada.
- **Respeitar A-A/A-C.** `A-A` = sem falha de ação específica; `A-C` = falha de feedback/verificação pós-ação própria.
- **Respeitar O-E NON_EXISTENT_IN_SERA_PT_V1.** `O-E` não pode ser usado como código ativo. Qualquer tentativa deve gerar bloqueio.
- **Não abrir HFACS/Risk/ERC/recommendations/finalConclusion.** Locks downstream devem permanecer ativos.
- **Não usar para claim de validação científica.** Linguagem: `consensus reference case for calibration`.
