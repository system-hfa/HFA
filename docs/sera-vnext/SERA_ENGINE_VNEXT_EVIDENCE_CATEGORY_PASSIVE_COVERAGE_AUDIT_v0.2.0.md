# SERA Engine vNext Evidence Category Passive Coverage Audit v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-59 — Evidence Category Passive Coverage Audit

## Objetivo
Adicionar auditoria leve de cobertura das evidence categories passivas para diagnosticar presença/ausência de hints em fronteiras críticas sem alterar classificação e sem criar gates.

## Relação com A4+R-58
- A4+R-58 materializou `PASSIVE_OPTIONAL_METADATA` no runtime.
- A4+R-59 adiciona leitura diagnóstica de cobertura sobre os hints já existentes.
- Esta fase não converte gaps em warning bloqueante.

## Contrato de input
A auditoria aceita entradas passivas, com `evidenceCategoryHints` opcionais:
- `ReleasedCodeTraceabilityResult` ou lista de traces;
- `PreconditionsFromReleasedCodesResult` ou lista de candidates;
- lista genérica de itens (`axis`, `code`, `evidenceCategoryHints`).

## Contrato de output
A auditoria retorna sumário passivo:
- `status`: `PASSIVE_COVERAGE_RECORDED` ou `PASSIVE_COVERAGE_INCOMPLETE`;
- `mode`: `PASSIVE_OPTIONAL_METADATA`;
- contagem de categorias observadas;
- `findings` por fronteira/código;
- `passiveDiagnostics` textuais (não bloqueantes).

## Fronteiras críticas auditadas
- `A-D` ↔ `PHYSICAL_CAPABILITY`
- `O-B/O-C` ↔ `INTENT_AWARENESS`
- `P-D/A-H/A-I/A-J` ↔ `TIME_PRESSURE`
- `P-G/A-C` ↔ `PROCEDURAL_MONITORING` ou `FEEDBACK_VERIFICATION`
- `P-H/A-J` ↔ `COMMUNICATION_INFORMATION`
- `P-B` ↔ `SENSORY_LIMITATION`
- `P-C/A-E` ↔ `KNOWLEDGE_TRAINING`

## Diferença entre passive gap e warning
- `PASSIVE_GAP`: diagnóstico de ausência de hint esperado para uma fronteira crítica.
- `WARNING` (futuro): validação ativa no fluxo.

Nesta fase, `PASSIVE_GAP` não altera gate, não altera status de eixo e não bloqueia processamento.

## Nenhum bloqueio criado
A auditoria não injeta bloqueios em:
- semantic consistency;
- code release gate;
- preconditions derivation.

## Nenhuma alteração de classificação
A auditoria não altera:
- `releasedCode`;
- `selectedCode`;
- status de classificação;
- locks de downstream.

## Cenários testados
- Hints suficientes -> cobertura registrada.
- Hints ausentes -> cobertura incompleta com gap passivo.
- `A-D` sem `PHYSICAL_CAPABILITY` -> gap passivo.
- `O-C` sem `INTENT_AWARENESS` -> gap passivo.
- `O-E` permanece `NON_EXISTENT_IN_SERA_PT_V1`.
- Locks downstream preservados.
- `selectedCode` permanece `UNRESOLVED`.

## Limitações
- Auditoria depende do que já foi anexado como hint passivo.
- Não resolve qualidade semântica da evidência; apenas cobertura categorial esperada.
- Não substitui revisão metodológica por eixo.

## Critérios futuros para avançar para WARNING
- volume mínimo de casos com hints estáveis por fronteira crítica;
- baixa taxa de falso gap em amostra controlada;
- revisão metodológica humana/adjudicação AI/Author consolidada;
- ausência de regressão em locks e em comportamento de classificação.

## Transition to Warning: not active yet
- Transição para warning **não está ativa** nesta fase.
- Qualquer avanço para warning depende de critérios de qualidade definidos em:
  - [SERA_ENGINE_VNEXT_EVIDENCE_CATEGORY_COVERAGE_THRESHOLDS_v0.2.0.md](./SERA_ENGINE_VNEXT_EVIDENCE_CATEGORY_COVERAGE_THRESHOLDS_v0.2.0.md)
- Enquanto isso, `PASSIVE_GAP` permanece exclusivamente diagnóstico e não bloqueante.

## Próxima fase recomendada
Calibração de thresholds diagnósticos (ainda passivos) e definição de critérios objetivos para eventual modo `WARNING` sem bloqueio automático inicial.
