# SERA Engine vNext Evidence Category Coverage Thresholds v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-60 — Evidence Category Coverage Quality Thresholds
NO_RUNTIME_WARNING_YET
NO_BLOCKING_GATE

## Objetivo
Definir critérios de qualidade para cobertura passiva de evidence categories como preparo para possível transição futura para `WARNING` não bloqueante, sem alterar comportamento de runtime nesta fase.

## Escopo e não-escopo
- Escopo: métricas, thresholds e critérios de decisão metodológica.
- Não-escopo: ativar warning runtime, criar gate, bloquear fluxo, alterar classificação.

## Métricas propostas
- `coverage_density_per_case`: proporção de fronteiras críticas aplicáveis em um caso que possuem hint compatível.
- `coverage_density_per_axis`: densidade de hints por eixo (`perception`, `objective`, `action`) em casos auditados.
- `coverage_density_per_critical_boundary`: cobertura por fronteira crítica específica.
- `missing_critical_hint_rate`: taxa de fronteiras críticas aplicáveis sem hint esperado.
- `passive_gap_rate`: proporção de findings `PASSIVE_GAP` no total de findings auditados.
- `false_gap_review_rate`: proporção de gaps que revisão humana/adjudicação classifica como falso gap.
- `unsupported_hint_rate`: taxa de hints presentes que não suportam fronteira crítica aplicável.
- `unknown_uncategorized_rate`: taxa de uso de `UNKNOWN_OR_UNCATEGORIZED` sobre o total de hints.

## Fronteiras críticas
- `A-D` ↔ `PHYSICAL_CAPABILITY`
- `O-B/O-C` ↔ `INTENT_AWARENESS`
- `P-D/A-H/A-I/A-J` ↔ `TIME_PRESSURE`
- `P-G/A-C` ↔ `PROCEDURAL_MONITORING` ou `FEEDBACK_VERIFICATION`
- `P-H/A-J` ↔ `COMMUNICATION_INFORMATION`
- `P-B` ↔ `SENSORY_LIMITATION`
- `P-C/A-E` ↔ `KNOWLEDGE_TRAINING`

## Thresholds iniciais sugeridos (conservadores)
- Não avançar para `WARNING` se houver menos de 10 casos/cenários auditados.
- Não avançar para `WARNING` se `false_gap_review_rate > 20%`.
- Não avançar para `WARNING` se `unknown_uncategorized_rate > 30%`.
- Permitir piloto de `WARNING` somente se:
  - `80%+` das fronteiras críticas aplicáveis têm hints consistentes nos casos auditados;
  - nenhum warning proposto alteraria classificação;
  - nenhum warning proposto bloquearia `releasedCode` ou precondition;
  - `A-A/O-A/P-A` não são tratados como fallback de ausência de hint.
- Modo futuro obrigatório para piloto: `NON_BLOCKING_WARNING`.

## Critérios para avançar de PASSIVE para WARNING
- amostra suficiente com hints passivos (>= 10 casos/cenários);
- gaps passivos revisados qualitativamente;
- ausência de evidência de falso bloqueio operacional;
- semantic guard e preconditions preservam independência metodológica;
- utilidade confirmada em adjudicação AI/Author (clareza sem poluição de alertas).

## Critérios para NÃO avançar
- baixa presença de hints em fronteiras críticas;
- gaps gerados majoritariamente por materialização fraca de casos;
- ambiguidade categorial recorrente sem regra de desambiguação;
- risco de warning ser interpretado como pseudo-gate;
- sobrecarga de alertas com queda de legibilidade/ação.

## Linguagem de segurança
- `PASSIVE_GAP` não é warning.
- `WARNING` futuro não é bloqueio.
- `HARD_GATE` não está autorizado.
- Evidence category não é fonte de verdade causal.

## Relação com AI/Author adjudication
- Decisão de avanço permanece metodológica e adjudicada pelo usuário.
- Em caso de dúvida de interpretação métrica, registrar decisão no documento de fase aplicável.

## Próximos passos
1. Coletar mais cobertura em casos adversariais e reference drafts materializados.
2. Consolidar revisão qualitativa de gaps passivos em amostra mínima.
3. Reavaliar readiness para piloto `NON_BLOCKING_WARNING` em fase posterior dedicada.
