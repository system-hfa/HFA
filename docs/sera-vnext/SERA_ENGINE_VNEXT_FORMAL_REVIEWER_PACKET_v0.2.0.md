# SERA Engine vNext Formal Reviewer Packet v0.2.0

Status: REVIEW_PACKET_READY
Phase: A4+R-56 — Formal Reviewer Packet
NOT_FORMAL_INTER_RATER_RESULT: true
NOT_CONSENSUS_VALIDATED: true
NOT_FOR_VALIDATION_CLAIM: true
OPTIONAL_FUTURE_VALIDATION: true

## Objetivo
Preparar avaliadores reais para revisão independente dos drafts materializados, com orientação operacional consistente às regras de divergência da A4+R-55.

## Governança A4+R-57
- Este packet permanece utilizável para validação futura opcional.
- Este packet não é gate operacional obrigatório para evolução do produto.

## Escopo
- Revisão independente de 4 drafts.
- Coleta de P/O/A por eixo.
- Coleta de rationale, confidence, evidenceRefs, incertezas e alternativas rejeitadas.
- Preparação para fase posterior de intake formal dos resultados.

## Fora de escopo
- Calcular kappa.
- Executar consenso nesta fase.
- Promover casos.
- Gerar finalConclusion/HFACS/Risk/ERC/recommendations.
- Avaliar UI/produto.

## Casos incluídos

### CRC-NOMINAL-DRAFT-001
- propósito: baseline nominal para testar consistência de ausência de falha dominante.
- fronteira metodológica principal: distinção entre no-failure sustentado por evidência e fallback indevido.
- status atual: MATERIALIZED_DRAFT / NOT_CONSENSUS_VALIDATED / REVIEW_REQUIRED.
- instrução específica de cuidado: não usar P-A/O-A/A-A como default; exigir evidência positiva para no-failure.

### CRC-NEGATIVE-CONTROL-DRAFT-001
- propósito: validar contenção de over-classification sob evidência insuficiente.
- fronteira metodológica principal: UNRESOLVED/INSUFFICIENT_EVIDENCE vs no-failure por default.
- status atual: MATERIALIZED_DRAFT / NOT_CONSENSUS_VALIDATED / REVIEW_REQUIRED.
- instrução específica de cuidado: quando faltar evidência por eixo, registrar UNRESOLVED/INSUFFICIENT_EVIDENCE explicitamente.

### CRC-ADVERSARIAL-DRAFT-001
- propósito: testar bloqueio de O-E NON_EXISTENT_IN_SERA_PT_V1 no eixo Objective.
- fronteira metodológica principal: O-E NON_EXISTENT_IN_SERA_PT_V1 sem fallback automático para O-A.
- status atual: MATERIALIZED_DRAFT / NOT_CONSENSUS_VALIDATED / REVIEW_REQUIRED.
- instrução específica de cuidado: se O-E surgir como proposta, bloquear e reavaliar com base em evidência para O-A..O-D ou marcar UNRESOLVED.

### CRC-ADVERSARIAL-DRAFT-002
- propósito: testar fronteira A-A vs A-C sob ambiguidade de verificação pós-ação.
- fronteira metodológica principal: distinguir ausência de falha de ação específica de falha de feedback/verificação pós-ação própria.
- status atual: MATERIALIZED_DRAFT / NOT_CONSENSUS_VALIDATED / REVIEW_REQUIRED.
- instrução específica de cuidado: A-C só com evidência de ação executada + falha de verificação pós-ação; sem evidência suficiente, usar UNRESOLVED.

## Instruções para avaliadores
- trabalhar independentemente.
- não discutir os casos antes de registrar respostas.
- ler apenas factualSummary/evidências antes de decidir.
- não usar resultado esperado como resposta automática.
- registrar UNRESOLVED quando evidência for insuficiente.
- justificar cada eixo separadamente.
- separar percepção, objetivo e ação.
- não inferir intenção sem evidência.
- não inferir falha perceptiva por resultado ruim.
- não usar A-A/O-A/P-A como fallback para unknown.

## Regras obrigatórias A4+R-55
- no-failure não é fallback para ausência de evidência.
- O-E NON_EXISTENT_IN_SERA_PT_V1 não vira O-A automático.
- A-C exige falha de verificação pós-ação própria.
- A-A exige evidência suficiente de ausência de mecanismo específico de falha de ação.
- O-A exige evidência positiva de objetivo operacional correto.
- P-A exige evidência suficiente de ausência de falha perceptiva específica.
- se não houver evidência suficiente: UNRESOLVED/INSUFFICIENT_EVIDENCE.

## Formulário de resposta por caso

Reviewer pseudonym:
Case ID:
Review date:
P code:
P rationale:
P confidence:
P evidenceRefs:
P unresolved? yes/no:
O code:
O rationale:
O confidence:
O evidenceRefs:
O unresolved? yes/no:
A code:
A rationale:
A confidence:
A evidenceRefs:
A unresolved? yes/no:
Accepted uncertainties:
Rejected alternatives:
General notes:
Ready for consensus discussion? yes/no:
Needs more evidence? yes/no:

## Critérios de qualidade da resposta
- rationale deve citar evidência.
- confidence deve ser LOW/MEDIUM/HIGH.
- alternativas rejeitadas devem ser registradas.
- evidência insuficiente deve ser explicitada por eixo.
- nenhum eixo deve ser preenchido por default.

## Próxima fase
A4+R-57 — Formal Review Results Intake.
