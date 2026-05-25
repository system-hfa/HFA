# SERA Engine vNext Real Event Selection Funnel Explanation A4R124 v0.2.0

Status: REAL_EVENT_SELECTION_FUNNEL_EXPLAINED
Phase: A4+R-124
methodology: SERA
releaseStatus: NO_RELEASE
downstreamStatus: NO_DOWNSTREAM

## Objetivo
Explicar de forma auditável por que um corpus amplo resultou em 6 eventos reais `review-ready/warning-bound` no conjunto consolidado A4R123.

## Explicação do funil
A redução para 6 não significa que apenas 6 eventos são úteis. Significa que apenas 6 atingiram, ao mesmo tempo, os critérios de:
- source adequacy para P/O/A completo;
- integridade canônica SERA auditável;
- risco de overclassification sob controle;
- estabilidade após QA interno/externo e patches.

Os demais eventos continuam úteis em lanes diferentes: `REWORK_REQUIRED`, `HOLD_OVERCLASSIFICATION_RISK`, `HELD_TECHNICAL_DOMINANT`, `BOUNDARY_ONLY`, `SOURCE_RECHECK_REQUIRED`, `REDUNDANT_OR_DEFERRED`, `METHOD_SCOPE_BOUNDARY` ou `FUTURE_CANDIDATE`.

## Tabela do funil
| stage | approximateInput | output | rejection/filter reason | methodological rationale |
|---|---:|---:|---|---|
| Full corpus unification (A4R112) | ~96 unified candidates | ~57 TXT usable for mining | Download/extraction gaps, source recheck, weak/secondary material | Não confundir volume bruto com evidência auditável |
| POA signal mining + shortlist (A4R112) | ~57 | shortlist axis-balanced + parked queue | Sinal baixo, fonte insuficiente, redundância, baixa confiabilidade | Priorização por densidade útil + qualidade de fonte |
| Expanded real-event build (A4R115) | shortlist priorizado | 10 source slices + 6 full-axis trace drafts + held/boundary set | Evidência incompleta por eixo, risco técnico-dominante, fragilidade de closure | Todo evento precisa P/O/A; ausência vira hold/boundary, não fechamento forçado |
| Independent QA + Opus intake (A4R116/A4R117) | 6 drafts principais + helds | downsizing de prontidão e patches (ex.: AMERICAN-1420 fora) | Overclassification risk, weak rationale por nó, double-counting | Conservadorismo aumenta confiabilidade do método |
| Priority discovery + stabilization (A4R119/A4R120) | 20 candidatos auditados por Opus | novos candidatos estabilizados (UNITED-173, UNITED-232), ATLAS fora | Fonte/OCR, actor-scope, A-axis fragilidade | Entrada incremental só com gate metodológico explícito |
| Eastern recovery + stabilization (A4R121/A4R122) | EASTERN-401 em hold antigo | EASTERN-401 reaberto com warnings | Legibilidade limitada, risco P/A double-counting, A-axis boundary-live | Reentrada controlada evita falsa certeza |
| Consolidation (A4R123) | conjunto pós-QA | 6 review-ready/warning-bound | Todos os demais ainda requerem rework/hold/defer/recheck | Reference set conservador é requisito de credibilidade, não limitação do corpus |

## Por que “6” aumenta credibilidade
- Evita transformar triagem em aprovação automática.
- Preserva separação entre draft governado e release.
- Impede classificar por outcome ou por pressão de pipeline.
- Garante que cada caso esteja alinhado à árvore canônica SERA, com warnings explícitos.

## Diferença entre lanes
- `reference positive review-ready/warning-bound`: caso apto a futura author-review lane com caveats.
- `boundary`: útil para limites metodológicos, não para fechamento positivo imediato.
- `held`: bloqueado por fonte, escopo, dominância técnica ou risco de overclassification.
- `rework`: precisa retrace/patch substantivo antes de retornar.
- `deferred`: priorização de fila, não descarte.

## Nota de governança
A4R124 não cria trace novo, não altera classificação P/O/A, não registra decisão autoral, não cria release e não abre downstream.
