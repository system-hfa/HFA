# Risk Profile Handoff v0.9-H

**Versão:** v0.9-H  
**Data:** 2026-05-18  
**HEAD ao criar este documento:** `51f39db7`  
**Branch:** `main`  
**Status:** Congelamento documental das fases RISK v0.8-A a RISK v0.9-G

---

## 1. Executive Summary

O Risk Profile Organizacional do HFA/SERA passou por dez fases de desenvolvimento estruturado entre as versões v0.8-A e v0.9-G. O resultado é uma tela de diagnóstico organizacional com rastreabilidade metodológica, caveats explícitos e distinção clara entre tipos de evidência.

**O que foi estabilizado:**

- Conversão segura entre escala legacy do motor (1=crítico) e escala visual HFA (5=crítico), isolando a inversão histórica de F-001 sem alterar motor nem banco
- Modal ERC organizacional real (em vez de hardcoded null, F-002 resolvido)
- Contrato de testes API→UI que protege contra regressão de escala
- Índice de Cobertura Analítica (renomeado de "Score de Risco" — não é medida de risco real)
- Safety Issue Candidates: sinalização conservadora de recorrência com caveats obrigatórios
- Risk Quality Trend: separação de volume e qualidade/severidade observada
- Data Confidence: diferenciação explícita entre "dados insuficientes" e "risco baixo"
- Comunicação metodológica: remoção de overclaims de "risco real", "perfil real da empresa"
- Demo readiness: hierarquia de painéis que prioriza valor organizacional antes de detalhe técnico

**Problemas resolvidos:**
- F-001 (escala invertida): isolado via camada de conversão — motor intacto, UI protegida
- F-002 (modal ERC hardcoded null): resolvido em v0.8-B
- F-003 (tendência de volume ≠ qualidade): resolvido em v0.9-D
- F-004 (sem Safety Issue Candidates): resolvido em v0.9-C
- F-008 (sem comunicação de incerteza): resolvido em v0.9-E

**Estado atual do Risk Profile:**  
Metodologicamente defensável para demonstração comercial e trial. Comunica claramente as limitações. Não implementa SIRA formal, probabilidade operacional real, ARMS Risk Index canônico (1–2500), Safety Issue formal ou ajuste por exposição.

**O que ainda não está feito:**  
Ver seção 8 (Limitações conhecidas) e seção 9 (Próximas fases).

---

## 2. Current Architecture

### 2.1 API — `GET /api/org/intelligence`

Arquivo: `frontend/src/app/api/org/intelligence/route.ts`

Responsabilidades:
- Agrega todas as análises do tenant em distribuição P/O/A
- Calcula score (Índice de Cobertura Analítica)
- Calcula alertas, ações, tendência temporal
- Computa `modal_erc_level` (via `calculateModalHfaErcCategory`)
- Computa `safety_issue_candidates` (via `deriveSafetyIssueCandidates`)
- Computa `quality_trend` (via `buildRiskQualityTrend`)
- Computa `data_confidence` (via `buildDataConfidence`)

Auth: `requireBearerUser` — sempre filtra por `tenant_id`.

### 2.2 UI — `/risk-profile`

Arquivo: `frontend/src/app/(dashboard)/risk-profile/page.tsx`

Ordem atual dos painéis (após v0.9-G):
1. Header — "Perfil Organizacional" + "Diagnóstico preliminar baseado em N análises SERA registradas"
2. Zero-state — quando `total_analyses === 0`
3. Banner "em formação" — quando `1 ≤ total_analyses < 10`
4. "Como ler este perfil" — guia rápido de orientação
5. `DataConfidencePanel` — confiança da base, não nível de risco
6. `OrgScoreCard` — Índice de Cobertura Analítica
7. `SafetyIssueCandidatesPanel` — padrões recorrentes candidatos
8. `QualityTrendPanel` — tendência qualitativa observada por mês
9. Matrizes de apoio à triagem — ISO 31000 tradicional + ARMS-ERC
10. Combinações de falha mais frequentes
11. Ranking de precondições
12. `AiInsightPanel` — análise por IA
13. Volume de análises por mês (`TrendLine`)

### 2.3 Helpers Puros (sem Supabase, sem React, sem browser)

| Helper | Arquivo | Exporta |
|---|---|---|
| ERC Conversion | `frontend/src/lib/sera/erc-conversion.ts` | `coerceMotorErcToHfaCategory`, `isHfaErcCategory` |
| ERC Modal | `frontend/src/lib/sera/erc-modal.ts` | `calculateModalHfaErcCategory` |
| ERC Presentation | `frontend/src/lib/sera/erc-presentation.ts` | `hfaErcToArmsBarrier` |
| Safety Issue Candidates | `frontend/src/lib/sera/safety-issue-candidates.ts` | `deriveSafetyIssueCandidates` |
| Risk Quality Trend | `frontend/src/lib/sera/risk-quality-trend.ts` | `buildRiskQualityTrend` |
| Data Confidence | `frontend/src/lib/sera/data-confidence.ts` | `buildDataConfidence` |

### 2.4 Componentes UI

| Componente | Arquivo |
|---|---|
| `OrgScoreCard` | `frontend/src/components/sera/OrgScoreCard.tsx` |
| `AiInsightPanel` | `frontend/src/components/sera/AiInsightPanel.tsx` |
| Demais painéis | Definidos inline em `risk-profile/page.tsx` |

### 2.5 Testes Unitários

Localização: `tests/sera/`

Padrão: `node:assert/strict` + `npx tsx` — sem vitest/jest, sem Supabase/React/browser.

### 2.6 Documentação

Localização: `docs/`

Docs de governança base:
- `RISK_METHODOLOGY_GOVERNANCE_v0.1.md` — processo de mudança, escala ERC canônica
- `RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md` — modelo dual: evento vs. organizacional
- `RISK_VALIDATION_CONTRACT_v0.3.md` — contrato de validação de risco
- `RISK_IMPLEMENTATION_AUDIT_v0.5.md` — auditoria de conformidade com contrato

---

## 3. Consolidated Methodological Decisions

### 3.1 Escala ERC — decisão canônica (v0.8-A, baseada em Opção A)

- **`analyses.erc_level` no banco** usa escala legacy do motor: `1 = crítico/ação imediata`, `5 = mínimo/aceitável`
- **HFA ERC Category** (escala visual): `5 = crítico`, `4 = alto`, `3 = moderado`, `2 = baixo`, `1 = aceitável`
- **Conversão**: `coerceMotorErcToHfaCategory(legacy)` inverte: `1→5, 2→4, 3→3, 4→2, 5→1`. Retorna `null` para inválidos
- **Motivação**: Opção A escolhida formalmente por Filipe Daumas (2026-05-17): "número maior = risco maior" é intrínseco ao padrão ARMS WG Report v4.1 (2010) §3.3
- **Motor e banco NÃO foram invertidos**: a inversão de `inferErcLevel()`, `inferDeterministicErcLevel()` e `levels.json` foi decidida mas não implementada. A camada de conversão isola este débito técnico
- **Dados históricos**: `analyses.erc_level` ainda usa escala legacy; sem migration executada

### 3.2 ARMS Risk Index canônico — não implementado

O ARMS Risk Index canônico é uma escala de 1 a 2500 (produto de 13 valores de desfecho × 13 valores de barreira). O HFA/SERA usa uma adaptação ordinal simplificada de 1–5, documentada como desvio intencional em `RISK_ERC_SCIENTIFIC_REVIEW_v0.2.md §6.3`. Esta adaptação é legítima para triagem organizacional, mas não deve ser apresentada como "ARMS ERC" padrão sem nota explicativa.

### 3.3 Modal ERC organizacional — resolve F-002

`modal_erc_level` na API retorna a HFA ERC Category mais frequente entre as análises com ERC válido. Empate favorece a categoria mais crítica (conservative tie-breaker). Implementado em v0.8-B via `calculateModalHfaErcCategory`.

### 3.4 Barreira ARMS organizacional — aproximação por conversão

`hfaErcToArmsBarrier(hfaCategory)` converte HFA ERC → nível de barreira ARMS (1–4):
- HFA 5 → barreira 1 (sem barreiras)
- HFA 4 → barreira 2
- HFA 3 → barreira 3
- HFA 2 → barreira 4
- HFA 1 → barreira 4 (cap)

Esta conversão é uma aproximação organizacional. Não representa a efetividade de barreira de um evento específico.

### 3.5 SIRA formal — não implementado

O SIRA (Safety Issue Risk Assessment) requer análise formal de exposição operacional, frequência de voo/ciclos e barreiras sistêmicas. Esta análise não existe no sistema. Safety Issue Candidates (v0.9-C) são heurísticos preliminares, não SIRA.

### 3.6 Safety Issue Candidates — heurística conservadora, não Safety Issues formais

Critérios para candidato:
- Combinação P+O, P+A ou O+A com `count ≥ 3`
- `share ≥ 0.20` se `total_analyses ≥ 10`; sem limite de share se `total < 10` (apenas count mínimo)
- Precondições: `count ≥ 3` e `share ≥ 0.20` se `total ≥ 10`
- Confidence: `preliminary` se `total < 10`, `moderate` se `total ≥ 10`
- Top 5 candidatos; caveat obrigatório em cada um
- Não constitui Safety Issue formal sem revisão de contexto, exposição e barreiras

### 3.7 Risk Quality Trend — tendência descritiva, não previsão

`quality_trend` agrupa análises por `YYYY-MM`, converte `erc_level` legacy → HFA, conta distribuição HFA 1–5 por mês. Não é ajustado por exposição operacional. `dominant_category` usa moda com conservative tie-breaker (maior HFA ganha empate). Não estima probabilidade futura.

### 3.8 Data Confidence — confiança dos dados, não nível de risco

`data_confidence` comunica a robustez da base analítica disponível. Levels:
- `insufficient`: `total_analyses === 0`
- `limited`: `0 < total_analyses < minimum_recommended` (default: 10)
- `moderate`: `total_analyses ≥ min` e `valid_erc_share < 0.8`
- `strong`: `total_analyses ≥ min` e `valid_erc_share ≥ 0.8`

Baixa confiança não significa risco baixo ou alto — significa base ainda limitada. Este é o princípio central: "ausência de evidência não é evidência de ausência."

### 3.9 Índice de Cobertura Analítica — não é score de risco

Fórmula: `base_score = ((pTotal×1.0 + oTotal×0.8 + aTotal×0.6) / total / 3) × 100`. Penalidades: `+15` se `open_overdue > 0`; `+5` se volume este mês > 150% da média dos últimos 3 meses. Range 0–100.

O índice mede completude de classificação P/O/A e pressão operacional pendente — não risco organizacional real. Renomeado de "Score de Risco" em v0.9-B para comunicar propósito correto.

### 3.10 Matriz organizacional — apoio à triagem, sem exposição real

A matriz tradicional (ISO 31000) usa frequência relativa na amostra como proxy de probabilidade. Não é ajustada por frequência operacional real (horas de voo, ciclos, etc.). A matriz ARMS usa `modal_erc_level` ou `barrierLevel(score)` como proxy de barreira organizacional. Ambas funcionam como apoio à triagem, não como SIRA estruturado.

---

## 4. API Fields

### Endpoint: `GET /api/org/intelligence`

| Campo | O que mede | O que NÃO mede | Nível metodológico |
|---|---|---|---|
| `score.value` (0–100) | Cobertura analítica P/O/A + penalidades operacionais | Risco organizacional real | Proxy |
| `score.level` | Zona do índice: `ok/warning/critical` | Nível de risco | Proxy |
| `distribution.perception/objective/action` | Frequência de cada categoria SERA nas análises | Causa raiz confirmada; probabilidade futura | Dado observado |
| `top_preconditions` | Precondições mais frequentes por count e % | Probabilidade de recorrência | Dado observado |
| `top_combinations` | Coocorrências de categorias SERA | Causalidade confirmada | Dado observado |
| `actions.open_total/overdue` | Ações corretivas abertas/vencidas | Efetividade real das ações | Dado observado |
| `trend` | Volume de análises por mês (últimos 6 meses) | Qualidade/severidade das análises | Dado observado |
| `modal_erc_level` | HFA ERC Category mais frequente entre análises com ERC válido | ERC médio ponderado por exposição | Inferência conservadora |
| `safety_issue_candidates` | Padrões com recorrência ≥ 3 e share ≥ 20% | Safety Issues formais; SIRA | Candidato (heurística) |
| `quality_trend` | Distribuição mensal por HFA ERC Category | Tendência futura; probabilidade operacional | Tendência descritiva |
| `data_confidence` | Robustez da base para leitura do perfil | Nível de risco | Confiança |
| `alerts` | Alertas textuais de ações vencidas, picos de volume, recomendações sem ação | Diagnóstico de risco | Dado observado |
| `total_analyses` | Count total de análises do tenant | — | Dado observado |
| `total_events_90d` | Events dos últimos 90 dias | — | Dado observado |
| `recent_events` | 5 eventos mais recentes com P/O/A codes | — | Dado observado |

**Campos backward-compatible:** todos os campos pré-v0.9-C continuam presentes e inalterados. `safety_issue_candidates`, `quality_trend` e `data_confidence` foram adicionados como campos novos em v0.9-C, v0.9-D e v0.9-E respectivamente.

---

## 5. UI Panels

### 1. Header — Perfil Organizacional
**Propósito:** Contextualizar a tela como diagnóstico preliminar baseado em análises registradas.  
**Fonte:** `total_analyses` da API.  
**Caveat:** "Diagnóstico preliminar baseado em N análises SERA registradas."

### 2. Zero-state / Banner "em formação"
**Propósito:** Orientar usuário novo; evitar leitura precipitada de perfil incompleto.  
**Fonte:** `total_analyses === 0` ou `< 10`.  
**Caveat:** "Dados preliminares — com menos de 10 análises, as matrizes indicam sinais iniciais, não perfil consolidado."

### 3. "Como ler este perfil" (v0.9-G)
**Propósito:** Guiar a leitura de novos usuários em demo/trial.  
**Fonte:** texto estático, exibido quando `hasAnalyses`.  
**Copy:** "O perfil organiza as análises em três leituras: confiança da base, padrões recorrentes e tendência qualitativa. As matrizes funcionam como apoio à triagem — não como conclusão isolada."

### 4. DataConfidencePanel (v0.9-E)
**Propósito:** Comunicar robustez da base antes de qualquer leitura de padrões.  
**Fonte:** `data_confidence` da API → `buildDataConfidence`.  
**Caveat:** "Este indicador comunica confiança dos dados, não nível de risco."

### 5. OrgScoreCard / Índice de Cobertura Analítica (v0.9-B)
**Propósito:** Indicador de completude analítica e pressão operacional pendente.  
**Fonte:** `score`, `actions` da API.  
**Caveat:** "Mede cobertura analítica P/O/A e pendências operacionais — não é uma medida direta de risco organizacional."

### 6. SafetyIssueCandidatesPanel (v0.9-C)
**Propósito:** Sinalizar padrões recorrentes que merecem revisão aprofundada.  
**Fonte:** `safety_issue_candidates` da API → `deriveSafetyIssueCandidates`.  
**Caveat por candidato:** "Candidato preliminar. Não constitui Safety Issue formal sem revisão de contexto, exposição operacional e barreiras."

### 7. QualityTrendPanel (v0.9-D)
**Propósito:** Separar tendência qualitativa/severidade do volume mensal.  
**Fonte:** `quality_trend` da API → `buildRiskQualityTrend`.  
**Caveat:** "Distribuição mensal por categoria HFA ERC. Não ajustada por exposição operacional; volume maior pode refletir maior reporte ou uso da ferramenta."

### 8. Matrizes de apoio à triagem (v0.9-F/G)
**Propósito:** Posicionar padrões organizacionais em frameworks de referência (ISO 31000, ARMS-ERC).  
**Fonte:** `distribution`, `score`, `modal_erc_level` da API.  
**Caveat tradicional:** "A probabilidade nesta matriz é inferida da frequência relativa dos padrões de falha dentro do banco de eventos investigados — não da frequência operacional real."  
**Caveat ARMS:** "Esta abordagem captura a condição das barreiras no momento do evento — não uma estimativa estatística baseada em dados históricos."

### 9. Combinações de falha / Ranking de precondições
**Propósito:** Detalhar coocorrências SERA e precondições de contexto.  
**Fonte:** `top_combinations`, `top_preconditions` da API.  
**Nível:** Dado observado — frequência de ocorrência em análises registradas.

### 10. AiInsightPanel
**Propósito:** Análise inferencial por IA sobre os padrões organizacionais predominantes.  
**Fonte:** Componente externo (`AiInsightPanel`), token de autenticação.  
**Caveat:** Análise baseada nos padrões SERA observados — não determina risco absoluto.

### 11. Volume de análises por mês (v0.9-G, renomeado de "Distribuição Temporal")
**Propósito:** Mostrar frequência de registros separada da qualidade/severidade.  
**Fonte:** `trend` da API.  
**Caveat:** "Frequência de registros — separada da qualidade/severidade observada."

---

## 6. Test Suites

### Suítes unitárias — helpers puros

| Arquivo | Testes | Cobertura principal |
|---|---|---|
| `tests/sera/test-erc-conversion.ts` | **75** | Todos os 5 valores legacy → HFA, inputs inválidos, tipos, null/undefined |
| `tests/sera/test-erc-modal.ts` | **10** | Modal com empate (conservative tie-breaker), array vazio, valores mistos |
| `tests/sera/test-erc-presentation.ts` | **9** | `hfaErcToArmsBarrier`: HFA 1–5 → barrier 1–4, cap em HFA 1/2→4 |
| `tests/sera/test-erc-api-ui-contract.ts` | **38** | Fluxo completo legacy→HFA→modal→barrier; proteção contra regressão de escala |
| `tests/sera/test-safety-issue-candidates.ts` | **27** | Zero state, count mínimo, share, confidence, sorting, top 5, caveat, ids |
| `tests/sera/test-risk-quality-trend.ts` | **32** | Agrupamento mensal, conversão legacy, tie-breaker, critical_or_high, inválidos |
| `tests/sera/test-data-confidence.ts` | **28** | 4 levels, cap validErcCount, negativos, mensagens, caveat, minimumRecommended |
| **Total** | **219** | |

### Contrato de validação de risco

| Checker | Status |
|---|---|
| `analyze-risk-validation-contract.ts` (default) | 10/10 OK |
| `analyze-risk-validation-contract.ts --strict` | 10/10 OK |

### TypeScript

- `npx tsc --noEmit` no diretório `frontend/`: erro pré-existente `TS6053` em `node_modules/@types/d3-*` e `next.config.ts` — infraestrutura, não corrigível neste scope.
- **Sem erros nos arquivos alterados pelas fases v0.8-A a v0.9-G.**

### Proteção de área

Todos os commits das fases foram verificados para garantir que os seguintes arquivos **não foram alterados**:
- `frontend/src/lib/sera/pipeline.ts`
- `frontend/src/lib/sera/all-steps.ts`
- `frontend/src/lib/sera/rules/erc/levels.json`
- `tests/sera/fixtures/`
- `tests/reports/baseline/`
- `schema/migrations/`
- `scripts/`

---

## 7. Validation Status

| Área | Status |
|---|---|
| Motor SERA (`pipeline.ts`, `all-steps.ts`) | ✅ Intacto — nunca alterado em v0.8–v0.9 |
| Classificação P/O/A | ✅ Intacta — lógica causal não tocada |
| Fixtures de validação | ✅ Intactos — nenhuma fixture alterada |
| Baseline SERA v0.1.1 (162/162) | ✅ Intacto |
| Schema/migrations do banco | ✅ Intactos — nenhuma migration executada |
| Score formula (Índice de Cobertura) | ✅ Fórmula não alterada desde v0.9-B |
| Matrizes tradicional e ARMS | ✅ Células e lookups não alterados |
| Campos de API | ✅ Todos os campos pré-existentes preservados; 3 campos novos adicionados |
| Testes de regressão de ERC | ✅ 219 testes passando |
| Risk contract checker | ✅ 10/10 default e strict |

---

## 8. Known Limitations

### 8.1 Motor ERC ainda usa escala legacy invertida

`analyses.erc_level` = escala motor (1=crítico). A inversão de `inferErcLevel()`, `inferDeterministicErcLevel()` e `levels.json` foi decidida formalmente (Opção A, Filipe Daumas, 2026-05-17) mas não implementada. A camada de conversão (`coerceMotorErcToHfaCategory`) isola o problema, mas o débito técnico persiste.

**Impacto:** Análises SERA continuam gerando `erc_level` com semântica invertida no banco. Nenhuma tela exibe este valor raw — a conversão é obrigatória e aplicada em todos os pontos de consumo.

### 8.2 Sem exposição operacional

Todas as métricas são baseadas em análises registradas, não em frequência operacional real (horas de voo, número de pousos, ciclos de manutenção). Não é possível calcular taxa de eventos por 1000 horas ou probabilidade absoluta de ocorrência.

### 8.3 Sem probabilidade futura

`quality_trend` e `data_confidence` são descritivos. Não há modelo preditivo, sem regressão temporal, sem estimativa de probabilidade de eventos futuros.

### 8.4 Safety Issue Candidates não são Safety Issues formais

Os candidatos (v0.9-C) são heurísticos baseados em contagem e share. Não substituem o processo formal de Safety Issue Assessment (análise de contexto, exposição, barreiras sistêmicas, review por especialista).

### 8.5 SIRA não implementado

Safety Issue Risk Assessment estruturado, conforme ICAO SMS §4.3 e ARMS WG guidance, não existe no sistema. O perfil organizacional é um proxy aproximado — não um SIRA.

### 8.6 Matriz tradicional usa aproximação de probabilidade

`countToProb(count, total)` mapeia frequência relativa na amostra para nível de probabilidade ISO (1–5). Esta aproximação depende da taxa de reporte da organização. Eventos não reportados ou não investigados não estão incluídos.

### 8.7 ARMS organizacional usa uma barreira para toda a organização

O `modal_erc_level` (ou `barrierLevel(score)` como fallback) aplica um único nível de barreira para todo o perfil organizacional. Eventos individuais podem ter barreiras muito diferentes. Esta é uma aproximação de triagem, não avaliação por evento.

### 8.8 Quality Trend não ajusta por volume de análises

Um mês com 2 análises críticas e um mês com 20 análises críticas podem ter o mesmo `dominant_category`. O `critical_or_high_share` mitiga parcialmente isso, mas não normaliza por exposição.

### 8.9 Typecheck de infraestrutura (TS6053)

Erro pré-existente em `node_modules/@types/d3-*` e `next.config.ts`. Não corrigível no scope deste projeto sem alterar configuração de infraestrutura.

### 8.10 Validação externa com especialistas pendente

Os critérios metodológicos (Safety Issue Candidates, quality_trend, data_confidence thresholds) foram definidos de forma conservadora com base em princípios de safety management, mas ainda não foram validados externamente por especialistas em investigação de acidentes ou auditores de SMS.

### 8.11 Sem análise estatística de concordância

Não existe ainda análise Kappa, F1 ou matriz de confusão comparando as saídas do sistema com classificações de especialistas humanos para os mesmos eventos.

---

## 9. Recommended Next Phases

### RISK v1.0-A — Freeze Risk Profile v0.9 baseline
**Objetivo:** Criar artefato técnico de baseline do estado atual antes de expansão.  
**Escopo:**
- Gerar snapshot da API (fixture de resposta esperada para tenant de teste)
- Capturar screenshots do Risk Profile em estados: zero, forming (5 análises), completo (15+ análises)
- Criar checklist de congelamento com assinatura do autor do método
- Marcar tag git `risk-profile-v0.9-freeze`

### RISK v1.0-B — Data Confidence refinement
**Objetivo:** Enriquecer o indicador de confiança com dimensões adicionais.  
**Escopo:**
- Completude de relatos (campos obrigatórios preenchidos vs. vazios)
- Qualidade de evidência (relatos com histórico suficiente vs. genéricos)
- Proxy de subnotificação (comparação com benchmarks externos se disponíveis)
- Refinamento dos thresholds de `minimumRecommended` por tipo/porte de organização

### RISK v1.0-C — Safety Issue Candidates v2
**Objetivo:** Refinar critérios de candidatos com contexto temporal e operacional.  
**Escopo:**
- Janela temporal configurável (últimos 90 dias vs. histórico completo)
- Associação com ações corretivas (candidato com ação aberta vs. sem ação)
- Agravamento por ERC (candidato com maioria ERC 4–5 → confidence mais alta)
- Revisão humana: flag "revisado" / "descartado" por analista
- Ainda sem SIRA formal

### RISK v1.0-D — External Validation Plan
**Objetivo:** Preparar o sistema para validação científica por especialistas externos.  
**Escopo:**
- Selecionar 20–30 casos reais anonimizados com classificação de especialista como ground truth
- Calcular Kappa de Cohen para P/O/A vs. especialista
- Calcular Precision/Recall para Safety Issue Candidates
- Calcular concordância de ERC entre sistema e painel de especialistas
- Documentar discordâncias sistemáticas e recomendar ajustes

### PRODUCT v0.3-A — Demo/Trial polish
**Objetivo:** Preparar a experiência de onboarding para empresa nova.  
**Escopo:**
- Dados de exemplo pré-carregados (10 análises simuladas de organização fictícia)
- Fluxo guiado das 10 análises gratuitas
- Explicação metodológica em-tela (tooltip educativo por painel)
- Relatório exportável do perfil para decisores

### PAPER v0.1 — Estrutura de artigo metodológico
**Objetivo:** Formalizar o método computacional SERA para publicação.  
**Escopo:**
- Metodologia de classificação P/O/A + ERC
- Validação interna (testes, fixtures, baseline)
- Comparação com frameworks existentes (HFACS, TEM, SHELL)
- Plano de validação externa (v1.0-D como insumo)

---

## 10. Handoff for Next Agent

### Estado atual
```
branch:    main
HEAD:      51f39db7
origin:    51f39db7 (sincronizado)
```

### Arquivos-chave

| Arquivo | Tipo | Papel |
|---|---|---|
| `frontend/src/app/api/org/intelligence/route.ts` | API | Único endpoint — agrega tudo |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | UI | Tela principal — 1850+ linhas |
| `frontend/src/components/sera/OrgScoreCard.tsx` | Componente | Índice de Cobertura Analítica |
| `frontend/src/lib/sera/erc-conversion.ts` | Helper | Conversão legacy→HFA |
| `frontend/src/lib/sera/erc-modal.ts` | Helper | Modal ERC organizacional |
| `frontend/src/lib/sera/erc-presentation.ts` | Helper | HFA→barrier ARMS |
| `frontend/src/lib/sera/safety-issue-candidates.ts` | Helper | Safety Issue Candidates |
| `frontend/src/lib/sera/risk-quality-trend.ts` | Helper | Tendência qualitativa |
| `frontend/src/lib/sera/data-confidence.ts` | Helper | Confiança dos dados |
| `docs/RISK_METHODOLOGY_GOVERNANCE_v0.1.md` | Governance | Escala ERC, processo de mudança |
| `docs/RISK_VALIDATION_CONTRACT_v0.3.md` | Governance | Contrato de validação de risco |

### O que NÃO mexer sem processo formal

- `frontend/src/lib/sera/pipeline.ts` — motor SERA
- `frontend/src/lib/sera/all-steps.ts` — steps do motor
- `frontend/src/lib/sera/rules/erc/levels.json` — escala ERC do motor
- `tests/sera/fixtures/` — fixtures de validação
- `tests/reports/baseline/` — baseline SERA v0.1.1 (162/162)
- Fórmula do Índice de Cobertura (score formula)
- Lookup tables `ARMS_ERC` e `EV_ARMS_ERC` (matrizes de risco)

### Comandos de validação

```bash
# Todos os testes unitários
npx tsx tests/sera/test-erc-conversion.ts           # 75 testes
npx tsx tests/sera/test-erc-modal.ts                # 10 testes
npx tsx tests/sera/test-erc-presentation.ts         # 9 testes
npx tsx tests/sera/test-erc-api-ui-contract.ts      # 38 testes
npx tsx tests/sera/test-safety-issue-candidates.ts  # 27 testes
npx tsx tests/sera/test-risk-quality-trend.ts       # 32 testes
npx tsx tests/sera/test-data-confidence.ts          # 28 testes

# Contrato de validação de risco
npx tsx tests/sera/analyze-risk-validation-contract.ts
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict

# Typecheck (TS6053 em node_modules é pré-existente — ignorar)
cd frontend && npx tsc --noEmit 2>&1 | grep -v "node_modules" | grep -v ".next/"
```

### Próxima recomendação

Decidir entre as opções da seção 9 antes de iniciar próximo ciclo. Sugestão de prioridade:
1. **PRODUCT v0.3-A** (demo/trial polish) — maior impacto comercial imediato
2. **RISK v1.0-A** (freeze baseline) — governança técnica antes de expansão
3. **RISK v1.0-C** (Safety Issue Candidates v2) — melhoria metodológica

---

## 11. Phase Commit Map

| Fase | Commit | Descrição |
|---|---|---|
| v0.8-A | `fdf95d0a` | ERC legacy conversion utility + testes |
| v0.8-B | `e53facbd` | Modal ERC em org/intelligence (F-002) |
| v0.8-C | `6aa0db2b` + `e3353e2b` | Normalização ERC presentation + audit doc |
| v0.8-D | `86cb6ef3` | ERC API→UI contract tests (38 testes) |
| v0.9-A | `82dd1a31` | Auditoria metodológica (10 achados) |
| v0.9-B | `dcc06974` | Score → Índice de Cobertura Analítica |
| v0.9-C | `ff457d81` | Safety Issue Candidates |
| v0.9-D | `ad2941db` | Qualitative Risk Trend |
| v0.9-E | `95843d7b` | Data Confidence |
| v0.9-F | `08b3f6c8` | Communication review |
| v0.9-G | `51f39db7` | Demo readiness |
| v0.9-H | *(este commit)* | Handoff documental |

---

## 12. References

| Documento | Relevância |
|---|---|
| `RISK_METHODOLOGY_GOVERNANCE_v0.1.md` | Escala ERC canônica, processo de mudança, Opção A |
| `RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md` | Modelo dual evento vs. organizacional |
| `RISK_VALIDATION_CONTRACT_v0.3.md` | Contrato de validação, critérios bloqueantes |
| `RISK_IMPLEMENTATION_AUDIT_v0.5.md` | Auditoria de conformidade com o contrato |
| `RISK_ERC_CONVERSION_v0.8-A.md` | Conversão legacy→HFA |
| `RISK_ERC_MODAL_v0.8-B.md` | Modal ERC, F-002 |
| `RISK_ERC_CONSUMPTION_AUDIT_v0.8-C.md` | hfaErcToArmsBarrier, auditoria de consumo |
| `RISK_ERC_API_UI_CONTRACT_v0.8-D.md` | Testes de contrato API→UI |
| `RISK_PROFILE_METHODOLOGY_AUDIT_v0.9-A.md` | 10 achados metodológicos |
| `RISK_PROFILE_SCORE_RELABEL_v0.9-B.md` | Renomeação Score → Índice de Cobertura |
| `RISK_SAFETY_ISSUE_CANDIDATES_v0.9-C.md` | Safety Issue Candidates |
| `RISK_QUALITY_TREND_v0.9-D.md` | Tendência qualitativa |
| `RISK_DATA_CONFIDENCE_v0.9-E.md` | Confiança dos dados |
| `RISK_PROFILE_COMMUNICATION_REVIEW_v0.9-F.md` | Revisão de comunicação metodológica |
| `RISK_PROFILE_DEMO_READINESS_v0.9-G.md` | Demo readiness |
| ARMS WG Report v4.1 (2010) | Padrão ARMS/ERC, base da escala HFA |
| ISO 31000:2018 | Framework de gestão de risco |
| ICAO Doc 9859 (SMM, 4ª ed.) | Matriz de risco SMS/ISO |
| Daumas (2018) | Metodologia SERA primária |
| Hendy (2003) Annex A | Modelo de processamento de informação P/O/A |
