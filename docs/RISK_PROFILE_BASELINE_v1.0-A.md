# Risk Profile Baseline v1.0-A

## 1. Purpose

Este documento congela formalmente o estado técnico/documental do Risk Profile após o handoff v0.9-H, criando um baseline estável de referência antes do próximo ciclo de produto.

Objetivo do freeze:
- preservar rastreabilidade entre decisão metodológica, implementação, teste e comunicação;
- evitar regressões semânticas em API/UI/helpers;
- delimitar claramente o que o perfil mede e o que não mede.

## 2. Baseline commit

- baseline commit: `15c0e450`
- branch: `main`
- data: `2026-05-18`
- status: `documentary baseline`
- referência de handoff consolidado: `docs/RISK_PROFILE_HANDOFF_v0.9-H.md`

## 3. Scope

### Inclui

- API organizacional `GET /api/org/intelligence` (`frontend/src/app/api/org/intelligence/route.ts`)
- UI `risk-profile` (`frontend/src/app/(dashboard)/risk-profile/page.tsx`)
- componente `OrgScoreCard` (`frontend/src/components/sera/OrgScoreCard.tsx`)
- helpers RISK puros:
  - `erc-conversion.ts`
  - `erc-modal.ts`
  - `erc-presentation.ts`
  - `safety-issue-candidates.ts`
  - `risk-quality-trend.ts`
  - `data-confidence.ts`
- testes RISK em `tests/sera/`
- documentação consolidada v0.8/v0.9 e governança metodológica.

### Não inclui

- motor causal SERA (`pipeline.ts`, `all-steps.ts`, `rules/erc/levels.json`)
- schema/migrations de banco
- Stripe
- onboarding de produto
- dados de demonstração
- exportação PDF final
- validação externa com especialistas.

## 4. API baseline

Endpoint: `GET /api/org/intelligence`

| Campo | Type/shape resumido | O que mede | O que não mede | Origem metodológica |
|---|---|---|---|---|
| `score` | `{ value: number, level: 'critical'|'warning'|'ok', label: string }` | Índice de Cobertura Analítica + penalidades operacionais | risco organizacional real | v0.9-B (relabel de score) |
| `distribution` | `{ perception, objective, action, total }` com contagens/%/top codes | frequência observada P/O/A | probabilidade futura, causalidade confirmada | auditoria v0.9-A + governança |
| `top_preconditions` | `Array<{ code, count, pct, name }>` | precondições mais recorrentes na base | severidade/probabilidade por exposição | v0.9-A |
| `top_combinations` | `Array<{ pair, count, pct }>` | coocorrência observada (P+O, P+A, O+A) | Safety Issue formal | v0.9-A |
| `actions` | `{ open_total, open_overdue, open_no_owner, closed_last_30d, resolution_rate }` | pendências e resolução de ações corretivas | efetividade real de mitigação | implementação auditada v0.5/v0.9-A |
| `trend` | `Array<{ month: YYYY-MM, count }>` | volume mensal de análises | qualidade/severidade do risco | pré-v0.9-D |
| `modal_erc_level` | `1|2|3|4|5|null` (HFA ERC category modal) | categoria ERC HFA modal via conversão legacy->HFA | ARMS Risk Index canônico 1-2500 | v0.8-B + v0.8-A |
| `safety_issue_candidates` | array de candidatos (`pattern_type`, `count`, `share`, `confidence`, `caveat`) | sinais heurísticos de recorrência | Safety Issue formal / SIRA | v0.9-C |
| `quality_trend` | array por mês com distribuição HFA c1..c5 + dominante + c4/c5 share | tendência qualitativa observada | probabilidade futura | v0.9-D |
| `data_confidence` | `{ level, total_analyses, valid_erc_count/share, messages, caveat }` | robustez/confiança da base | nível de risco | v0.9-E |
| `alerts` | `string[]` | alertas operacionais e de volume/pendências | diagnóstico causal completo | implementação API |

Notas de baseline:
- `modal_erc_level` usa `calculateModalHfaErcCategory` com tie-break conservador (categoria mais crítica em empate).
- `safety_issue_candidates`, `quality_trend` e `data_confidence` são campos aditivos introduzidos no ciclo v0.9.

## 5. UI baseline

Página: `frontend/src/app/(dashboard)/risk-profile/page.tsx`

Ordem congelada de painéis:
1. Header / perfil organizacional preliminar.
2. Zero-state / banner de perfil em formação.
3. Como ler este perfil.
4. Confiança dos dados.
5. Índice de Cobertura Analítica.
6. Candidatos a Safety Issue.
7. Tendência qualitativa observada.
8. Matrizes de apoio à triagem.
9. Combinações de falha.
10. Ranking de precondições.
11. AI Insight / interpretação assistida.
12. Volume de análises por mês.

Propósito resumido:
- orientação inicial e comunicação de incerteza antes de qualquer leitura de risco;
- separação explícita entre confiança dos dados, padrões recorrentes e tendência qualitativa;
- matrizes como apoio à triagem, não como conclusão isolada.

## 6. Helper baseline

| Helper | Função | Input | Output | Testes associados |
|---|---|---|---|---|
| `erc-conversion.ts` | conversão segura legacy motor ERC -> HFA ERC | `unknown` ou `LegacyMotorErcLevel` | `HfaErcCategory` ou `null` | `test-erc-conversion` (75), `test-erc-api-ui-contract` |
| `erc-modal.ts` | calcula categoria modal HFA | `unknown[]` (erc_level raw) | `HfaErcCategory \| null` | `test-erc-modal` (10), `test-erc-api-ui-contract` |
| `erc-presentation.ts` | mapeia HFA ERC para coluna de barreira ARMS (1-4) | `HfaErcCategory` | `1|2|3|4` | `test-erc-presentation` (9), `test-erc-api-ui-contract` |
| `safety-issue-candidates.ts` | deriva candidatos heurísticos de recorrência | total, combinações, precondições | `SafetyIssueCandidate[]` | `test-safety-issue-candidates` (27) |
| `risk-quality-trend.ts` | agrupa distribuição HFA por mês e calcula dominante/share crítico-alto | análises com `created_at` e `erc_level` | `RiskQualityTrendPoint[]` | `test-risk-quality-trend` (32) |
| `data-confidence.ts` | calcula nível de confiança da base | total, ERC válido, candidatos, mínimo recomendado | `DataConfidence` | `test-data-confidence` (28) |

## 7. Test baseline

Suites registradas:
- `test-erc-conversion` — 75
- `test-erc-modal` — 10
- `test-erc-presentation` — 9
- `test-erc-api-ui-contract` — 38
- `test-safety-issue-candidates` — 27
- `test-risk-quality-trend` — 32
- `test-data-confidence` — 28
- `risk contract checker default` — 10/10
- `risk contract checker strict` — 10/10

Total consolidado:
- 219 testes + 2 risk checkers.

## 8. Methodological baseline

Decisões e caveats congelados:
- ERC legacy do motor permanece distinto da categoria visual HFA (conversão obrigatória em consumo).
- HFA ERC Category não é ARMS Risk Index canônico (1-2500).
- Safety Issue Candidates não são Safety Issues formais.
- `quality_trend` descreve composição observada; não estima probabilidade futura.
- `data_confidence` mede robustez de dados; não mede risco.
- Índice de Cobertura Analítica não mede risco real.
- matrizes (ISO/ICAO e ARMS) são instrumentos de apoio à triagem.
- SIRA formal não está implementado.

## 9. Known limitations

- sem exposição operacional (horas/ciclos/taxa por operação);
- sem probabilidade futura operacional;
- sem SIRA formal;
- sem Safety Issue formal;
- candidatos são heurísticos de recorrência;
- `quality_trend` não normaliza por exposição;
- matriz tradicional usa aproximação de probabilidade por frequência observada;
- ARMS organizacional usa aproximação agregada de barreira;
- histórico de TS6053 de infraestrutura em fases anteriores (não reproduzido neste freeze: `frontend` `npx tsc --noEmit` PASS);
- validação externa com especialistas permanece pendente.

## 10. Change control after baseline

Regras pós-freeze:
- mudança em API do Risk Profile deve atualizar este baseline e/ou contrato API/UI.
- mudança em helper RISK exige atualização/adição de teste correspondente.
- mudança metodológica exige atualização documental explícita (governança/metodologia).
- mudança no motor SERA exige nova rodada de validação e novo baseline.
- mudança visual no Risk Profile deve preservar disclaimers e limites metodológicos.

## 11. Validation commands

```bash
git status --short
git log --oneline -30
git rev-parse HEAD
git rev-parse origin/main

npx tsx tests/sera/test-data-confidence.ts
npx tsx tests/sera/test-risk-quality-trend.ts
npx tsx tests/sera/test-safety-issue-candidates.ts
npx tsx tests/sera/test-erc-conversion.ts
npx tsx tests/sera/test-erc-modal.ts
npx tsx tests/sera/test-erc-presentation.ts
npx tsx tests/sera/test-erc-api-ui-contract.ts

cd frontend && npx tsc --noEmit
cd ..

npx tsx tests/sera/analyze-risk-validation-contract.ts
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict

# verificação de áreas protegidas
git diff --name-only HEAD -- \
  frontend/src/lib/sera/pipeline.ts \
  frontend/src/lib/sera/all-steps.ts \
  frontend/src/lib/sera/rules/erc/levels.json \
  tests/sera/fixtures \
  tests/reports/baseline \
  schema/migrations \
  scripts \
  frontend/src/app/api/org/intelligence/route.ts \
  frontend/src/app/(dashboard)/risk-profile/page.tsx \
  frontend/src/components/sera/OrgScoreCard.tsx \
  frontend/src/lib/sera \
  tests/sera
```

## 12. Next phase

Recomendação principal:
- `PRODUCT v0.3-A — Onboarding/demo/trial readiness`.

Alternativa técnica:
- `RISK v1.0-B — API/UI contract snapshot`.
