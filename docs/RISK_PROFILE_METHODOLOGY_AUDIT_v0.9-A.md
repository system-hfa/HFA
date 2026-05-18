# RISK Profile Methodology Audit — v0.9-A
**Versão:** v0.9-A  
**Data:** 2026-05-18  
**Fase:** RISK v0.9-A  
**Autor:** Revisão técnica (solicitada por Filipe Daumas)  
**Status:** Auditoria documental — nenhum código alterado.

---

## 1. Propósito

Esta auditoria avalia a coerência metodológica do Risk Profile Organizacional do HFA/SERA após as correções de escala ERC (RISK v0.8-A–D). O objetivo é identificar:

- problemas de agregação de dados ordinais;
- misturas conceituais entre instrumentos;
- ausência de distinções entre evento individual, Safety Issue, tendência e risco futuro;
- riscos de comunicação de incerteza;
- coerência com a tese do produto como ferramenta de diagnóstico organizacional de fator humano.

Esta fase é exclusivamente documental. Nenhum código foi alterado.

---

## 2. Escopo e Não-Escopo

### Está no escopo

- Score organizacional e sua fórmula;
- Matriz tradicional ISO/ICAO e seus inputs;
- Matriz ARMS-ERC organizacional e sua coluna de barreira;
- Indicadores de ações corretivas;
- Tendência temporal exibida;
- Indicadores de Safety Issues;
- Linguagem e comunicação de incerteza.

### Fora do escopo desta fase

- Motor SERA causal P/O/A — já validado (v0.1.1, 162/162 PASS);
- Inversão técnica do motor (escopo RISK v0.9-C ou posterior);
- Migration de dados históricos;
- Qualquer alteração de código, fixture ou baseline.

---

## 3. Implementação Revisada

### 3.1 API: `org/intelligence/route.ts`

**Dados consultados:**
- `analyses`: perception_code, objective_code, action_code, preconditions, recommendations, erc_level
- `corrective_actions`: status, priority, due_date
- `events`: id, title, created_at (90 dias, top-5)

**Campos calculados retornados:**
| Campo | Tipo | Método |
|---|---|---|
| `score.value` | 0–100 | Fórmula proprietária ponderada (ver F-001) |
| `score.level` | critical/warning/ok | Threshold: ≥70/≥40/restante |
| `distribution` | contagens por P/O/A | Contagens diretas |
| `top_preconditions` | top-10 por frequência | Frequência na amostra |
| `top_combinations` | top-5 pares P+O, P+A, O+A | Frequência na amostra |
| `actions.open_total` | número | statuses `pending`+`in_progress` |
| `actions.open_overdue` | número | vencidos em aberto |
| `actions.resolution_rate` | % | `closed / (closed+open)` |
| `trend` | contagem por mês | Últimos 6 meses |
| `modal_erc_level` | HFA ERC Category 1–5 \| null | Moda de `erc_level` via `calculateModalHfaErcCategory` |
| `alerts` | lista de strings | Regras fixas: vencidas, top P code ≥30%, volume mensal |

**Score (fórmula, linha 243–245):**
```
base_score = ((pTotal × 1.0 + oTotal × 0.8 + aTotal × 0.6) / total / 3) × 100
penalties  = +15 se open_overdue > 0; +5 se volume_mês > 1.5× média
score      = min(base_score + penalties, 100)
```

Onde `pTotal`, `oTotal`, `aTotal` = total de análises com código não-nulo por dimensão.

### 3.2 UI: `risk-profile/page.tsx`

**Componentes de risco exibidos:**
- `OrgScoreCard` — gauge 0–100 + label (Crítico/Atenção/Normal)
- `TraditionalMatrix` — matriz 5×5 ISO/ICAO (Severidade × Probabilidade)
- `ARMSMatrix` — matriz 4×4 ARMS-ERC (SeveridadeRow × BarreiraColuna)
- `SeraReasoningPanel` — explicação SERA→ARMS para o evento mais crítico
- `TopPreconditionsPanel` — top-10 precondições por frequência
- `TrendChart` — evolução de volume mensal (6 meses)

**Entradas para a Matriz ISO/ICAO:**
- Severidade: mapeamento de código P → nível 1–5 (apenas Percepção)
- Probabilidade: frequência do top-código na amostra → nível ISO

**Entradas para a Matriz ARMS:**
- SeveridadeRow: mapeamento P code → A/B/C/D (apenas P-B/P-F→B, P-A→D, restante→C)
- BarreiraColuna: `isHfaErcCategory(modal_erc_level) ? hfaErcToArmsBarrier(modal) : barrierLevel(score)`

---

## 4. Princípios Metodológicos Aplicados

1. **Categorias ordinais não são intervalos**: A escala HFA ERC 1–5 é ordinal. Somar ou fazer média aritmética de categorias ordinais produz resultado sem interpretação estável. A moda (`calculateModalHfaErcCategory`) é metodologicamente mais defensável que a média.

2. **Frequência observada ≠ probabilidade prospectiva**: A frequência de um padrão P/O/A em eventos investigados depende da taxa de reporte, do período de análise e do viés de seleção. Não é uma estimativa de probabilidade futura.

3. **Evento individual ≠ Safety Issue**: Um evento isolado revela um mecanismo causal. Um Safety Issue requer recorrência, contexto comum, múltiplas análises de mecanismo semelhante, exposição sistêmica e barreiras relacionadas.

4. **ERC individual ≠ ERC organizacional**: O ERC por evento classifica aquele evento específico. Agregar ERC de múltiplos eventos exige escolha metodológica explícita (moda, pior caso, distribuição, tendência).

5. **Incerteza deve ser comunicada**: Com amostra pequena, os indicadores são em formação. O sistema não deve apresentar resultados com aparência de consolidados quando o número de análises é insuficiente.

---

## 5. O que o Risk Profile Atual Mede

| Indicador | Natureza | Tipo |
|---|---|---|
| Total de análises | Dado observado | ✅ Direto |
| Distribuição P/O/A | Dado observado | ✅ Direto |
| Top precondições por frequência | Dado observado | ✅ Direto |
| Top combinações P+O, P+A, O+A | Dado observado | ✅ Direto |
| Modal ERC (HFA category) | Dado observado + conversão | ✅ Com conversão explícita |
| Trend de volume mensal | Dado observado | ✅ Volume bruto |
| Ações abertas / vencidas | Dado observado | ✅ Direto |
| Taxa de resolução de ações | Indicador derivado | ✅ Calculável |
| Score organizacional 0–100 | Índice heurístico | ⚠️ Proxy frágil (ver F-001) |
| Zona de risco ISO (Inaceitável/Elevado/...) | Inferência | ⚠️ Baseada em frequência observada |
| Coluna barreira ARMS organizacional | Inferência | ⚠️ Modal único para toda org |
| ERC resultante ARMS | Inferência dupla | ⚠️ Inferência sobre inferência |

---

## 6. O que Não Mede Ainda

| Ausência | Impacto |
|---|---|
| Exposição operacional (horas, voos, operações, setor, base) | Sem denominador, frequência não é comparável entre organizações |
| Safety Issues formais (recorrência + contexto + mecanismo semelhante) | O sistema não distingue padrão de evento isolado |
| Detecção de candidatos a Safety Issue | Não há algoritmo de clustering/agrupamento |
| Tendência por categoria ERC (não só volume) | O gráfico mostra só contagem total, não se ERC piorou/melhorou |
| Tendência por tipo de falha P/O/A | Volume pode estabilizar enquanto o perfil de falha muda |
| Eficácia de ações corretivas (reincidência pós-ação) | Ação fechada não é verificada por resultado |
| Qualidade e completude dos relatos | Relatos incompletos pesam igual a relatos completos |
| Viés de subnotificação | Sistema assume que eventos investigados são representativos |
| Contexto organizacional (setor, frota, equipe, período) | Sem segmentação |
| Confiança do dado (nível de evidência) | Sem indicador de qualidade por análise |
| Severidade real validada (consequência efetiva) | Severidade é inferida, não observada |
| Probabilidade futura com base em exposição | Não há modelo prospectivo |

---

## 7. Achados Metodológicos

### F-001 — BLOQUEADOR: Score organizacional é proxy de completude, não de risco

**Severidade:** Bloqueador metodológico  
**Evidência:** `org/intelligence/route.ts` linhas 243–245

```
base_score = ((pTotal × 1.0 + oTotal × 0.8 + aTotal × 0.6) / total / 3) × 100
```

`pTotal`, `oTotal`, `aTotal` são **contagens de análises que têm pelo menos um código** em cada dimensão — não refletem a gravidade dos códigos. Uma organização com 100% de análises classificadas como P-A/O-A/A-A (todos "sem falha") teria o mesmo `pTotal/oTotal/aTotal` que uma com 100% P-B/O-B/A-G (máxima falha em todas dimensões), porque o que é contado é a presença de qualquer código, não o valor semântico.

**Risco:** A UI apresenta o score como "Score de Risco" com gauge colorido e labels "Crítico/Atenção/Normal", induzindo o usuário a interpretar como risco real quando o dado subjacente é proxy de completude de análise.

**Recomendação:** Renomear para "Índice de Atividade de SMS" ou equivalente, com disclaimer explícito. Ou decompor em componentes separados: completude de análise, severidade de falhas detectadas, status de ações. Evitar "score de risco" quando o cálculo não mede severidade, frequência ou probabilidade.

---

### F-002 — ALTO: Matriz ARMS usa coluna de barreira única para toda a organização

**Severidade:** Alta  
**Evidência:** `risk-profile/page.tsx` linhas 656–658, 946–948

```typescript
const barrier = isHfaErcCategory(data.modal_erc_level)
  ? hfaErcToArmsBarrier(data.modal_erc_level)
  : barrierLevel(data.score.value)
```

Toda a organização é projetada em uma única coluna da matriz ARMS-ERC — o modal ERC. Isso significa que todos os eventos do dashboard aparecem na mesma coluna de barreira, independentemente de eventos individuais terem ERC muito diferentes. A diversidade de ERC da organização desaparece.

**Exemplo:** Organização com 10 eventos ERC=5 (crítico) e 2 eventos ERC=1 (baixo) tem `modal_erc_level=5`, barrier=1. Mas os 2 eventos de ERC baixo também são exibidos na coluna "sem barreiras".

**Risco:** A matriz ARMS organizacional não reflete a distribuição real de risco — apenas o extremo modal.

**Recomendação:** Manter a abordagem atual como simplificação consciente, com disclaimer explícito. Ou exibir distribuição por coluna de barreira: "X eventos em barreira 1, Y eventos em barreira 2..." Ou exibir o modal com nota de que representa o pior caso mais frequente.

---

### F-003 — ALTO: Tendência temporal mostra apenas volume, não qualidade de risco

**Severidade:** Alta  
**Evidência:** `TrendChart` e `trend` da API

O gráfico de tendência mostra apenas a contagem de análises por mês. Não mostra se os eventos ficaram mais ou menos graves (por ERC, por categoria P/O/A, por severidade ISO). Volume crescente pode significar cultura de reporte mais madura — não necessariamente risco crescente. Volume decrescente pode ser subnotificação — não necessariamente melhora.

**Risco:** Usuário interpreta volume crescente como "risco aumentou" e volume decrescente como "risco caiu", quando a relação pode ser oposta.

**Recomendação:** Adicionar contexto ao gráfico de tendência: "Volume crescente pode indicar melhor cultura de reporte". Ou adicionar linha de tendência ERC médio/modal ao longo do tempo.

---

### F-004 — ALTO: Sem detecção de padrões para Safety Issues

**Severidade:** Alta  
**Evidência:** Todo o código de `org/intelligence` e `risk-profile`

O sistema mostra `top_combinations` (pares de códigos mais frequentes) e `top_preconditions`, mas não tem nenhum mecanismo para:
- identificar quando um padrão constitui um Safety Issue candidato;
- alertar quando a mesma combinação P+O aparece com contexto semelhante;
- distinguir padrão de coincidência;
- calcular limiar de recorrência significativa.

O contrato metodológico (`RISK_VALIDATION_CONTRACT_v0.3.md §6.6`) já apontou este ponto como violação: "Padrão recorrente É sinalizado para SIRA — VIOLA".

**Risco:** O produto comunica implicitamente que está fazendo análise organizacional, mas não realiza o passo crítico de agregar eventos em padrões com nível de evidência suficiente.

**Recomendação:** Criar "Safety Issue Candidates" como feature separada (RISK v0.9-C), com critério explícito de recorrência mínima, contexto semelhante e mecanismo causal comum.

---

### F-005 — ALTO: Probabilidade ISO é frequência na amostra, sem ajuste de exposição

**Severidade:** Alta  
**Evidência:** `countToProb()` em `risk-profile/page.tsx` linha ~191

```typescript
function countToProb(count: number, total: number): number {
  const pct = total > 0 ? count / total : 0
  if (pct > 0.75) return 5
  if (pct > 0.50) return 4
  if (pct > 0.25) return 3
  if (pct > 0.10) return 2
  return 1
}
```

A "probabilidade" é simplesmente a fração do código mais frequente dentro da amostra de eventos investigados. Não considera: quantos eventos não foram investigados, quantas operações ocorreram, qual a taxa de reporte, qual o período coberto.

A UI já tem um disclaimer adequado: "Nota: esta é uma aproximação baseada em eventos investigados." Mas o enquadramento como "Probabilidade ISO" com valores 1–5 (Improvável→Frequente) ainda pode confundir o usuário.

**Risco:** Usuário confunde probabilidade dentro da amostra com probabilidade operacional real.

**Recomendação:** Renomear de "Probabilidade" para "Frequência Relativa na Amostra" no SeraReasoningPanel. Manter o disclaimer existente. Não mudar a escala numérica (isso seria breaking change visual).

---

### F-006 — MÉDIO: Severidade ISO usa apenas código de Percepção

**Severidade:** Média  
**Evidência:** `SEVERITY_MAP` em `risk-profile/page.tsx` linha 43; `P_SEVERITY` linha 102

```typescript
const SEVERITY_MAP = {
  'P-B': { level: 4, ... },  // Grave
  'P-A': { level: 1, ... },  // Negligível
  // apenas P-* no mapa
}
```

Eventos com P-A (sem falha de percepção) mas O-B (falha de objetivo máxima, que no motor retorna ERC=1) recebem severidade 1 (Negligível) na matriz ISO. O código de Ação mais severo (A-I, A-J) também não influencia a severidade ISO.

**Nota:** Esta limitação foi documentada na auditoria v0.1 como F-006/F-007. Permanece como achado, mas a decisão de incluir ou não O/A na severidade ISO requer aprovação do autor do método (Tipo 3 — extensão metodológica, conforme Governança v0.1.md §5.1).

**Recomendação:** Documentar explicitamente na UI: "Severidade baseada no mecanismo de percepção SERA — eventos com falhas de objetivo ou ação predominantes podem ter severidade estimada diferente pela análise individual." Ou criar `SEVERITY_MAP` que inclua O e A em fase futura.

---

### F-007 — MÉDIO: Matriz ARMS (organização) e Matriz ARMS (evento) usam métodos diferentes de barreira

**Severidade:** Média  
**Evidência:** Dois `barrierLevel()` diferentes

- `events/[id]/page.tsx`: `evBarrierLevel(p,o,a)` — conta falhas P/O/A (0–3 falhas → barreira 4–1)
- `risk-profile/page.tsx`: `hfaErcToArmsBarrier(modal_erc_level)` ou `barrierLevel(score)` — derivado do modal ERC ou score 0–100

Os dois métodos são distintos e podem produzir barreiras muito diferentes para o mesmo evento. Não há razão documentada para usar métodos diferentes nas duas telas.

**Recomendação:** Documentar explicitamente que as duas matrizes são instrumentos diferentes (evento individual vs. perfil organizacional) com inputs diferentes. A separação é intencional pela decisão do modelo dual (RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md §2), mas deve ser explicada na UI.

---

### F-008 — MÉDIO: Comunicação de incerteza ausente nas matrizes individuais

**Severidade:** Média  
**Evidência:** `TraditionalMatrix` e `ARMSMatrix` components

O banner "perfil em formação" (quando `total_analyses < 10`) aparece apenas no header da página. As matrizes individuais não têm indicador de amostra insuficiente próprio. Com 2 análises, a matriz é exibida da mesma forma que com 200.

**Recomendação:** Adicionar em cada matriz: "Baseado em N análises — com N < 10, interpretação preliminar." Isso é especialmente importante para a coluna de barreira ARMS, que depende do modal ERC.

---

### F-009 — MÉDIO: Alerta de "eventos este mês vs média" está sempre presente

**Severidade:** Média  
**Evidência:** `org/intelligence/route.ts` linha 276

```typescript
alerts.push(`${eventsThisMonth} evento${...} este mês vs média de ${monthlyAvgRounded}/mês`)
```

Este alerta é gerado independentemente de haver desvio real. Com 0 eventos este mês e média 0, o alerta aparece como "0 eventos este mês vs média de 0/mês" — sem valor informativo.

**Recomendação:** Suprimir este alerta quando `eventsThisMonth === 0 && monthlyAvg === 0`, ou quando não há desvio estatisticamente significativo.

---

### F-010 — BAIXO: Três pesos do score (1.0, 0.8, 0.6) sem referência documentada

**Severidade:** Baixa  
**Evidência:** `base_score = ((pTotal × 1.0 + oTotal × 0.8 + aTotal × 0.6) / total / 3) × 100`

Os pesos refletem uma intuição plausível (Percepção > Objetivo > Ação em termos de "responsabilidade ou completude da análise"), mas não há referência metodológica documentada no código ou nos docs. Para uma ferramenta com pretensão de rigor SMS/SGSO, pesos não documentados são vulneráveis a questionamento.

**Recomendação:** Documentar em comentário de código a justificativa dos pesos, ou tornar o score transparente na UI com componentes separados.

---

## 8. Riscos de Agregação Ordinal

A escala HFA ERC 1–5 é **ordinal**: cada nível é uma categoria com significado, não um ponto em um eixo numérico linear. Opções metodológicas para agregar:

| Método | Defensabilidade | Usado? |
|---|---|---|
| **Moda** (valor mais frequente) | ✅ Alta — `calculateModalHfaErcCategory` | ✅ Sim |
| **Máximo** (pior caso) | ✅ Alta — conservador | ❌ Não |
| **Distribuição** (% por nível) | ✅ Alta — mais informativo | ❌ Não exibido |
| **Média aritmética** | ⛔ Frágil — implica intervalo | ❌ Não usado para ERC |
| **Score ponderado** (base_score) | ⚠️ Frágil — proxy de completude | ⚠️ Usado para dimensões P/O/A |

**Conclusão:** O uso de moda para ERC é correto. O uso de pesos para P/O/A no score é aceitável como heurística mas deve ser comunicado como tal, não como "score de risco".

---

## 9. Evento vs Safety Issue vs Tendência vs Risco Futuro

O sistema atual não faz formalmente esta distinção:

| Conceito | Definição | Status no sistema |
|---|---|---|
| **Evento individual** | Um relato analisado via SERA causal | ✅ Implementado (`/events/[id]`) |
| **Padrão recorrente** | Mesma categoria/combinação em múltiplos eventos | ⚠️ Parcialmente — top_combinations sem limiar |
| **Safety Issue candidato** | Padrão + contexto + mecanismo semelhante + impacto | ❌ Não implementado |
| **Safety Issue formal** | SIRA com causas raiz, barreiras, exposição e tratamento | ❌ Não implementado |
| **Tendência temporal** | Variação de frequência/qualidade ao longo do tempo | ⚠️ Parcialmente — só volume |
| **Risco futuro** | Inferência prospectiva com exposição, barreiras, frequência base | ❌ Não implementado |

O Risk Profile atual opera principalmente no nível de "padrão recorrente" (distribuição de P/O/A), com aspiração implícita de "risco organizacional", sem o passo crítico de Safety Issue e sem denominador de exposição.

---

## 10. Separação das Matrizes

O modelo dual (ERC individual × ISO organizacional) está conceitualmente correto, conforme `RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md §2`. Os pontos de atenção:

| Aspecto | Status |
|---|---|
| Separação visual entre ERC individual e perfil organizacional | ✅ Telas diferentes |
| Uso do modal ERC na matriz ARMS organizacional | ✅ Com `hfaErcToArmsBarrier` (v0.8-C) |
| Método de barreira distinto entre telas | ⚠️ Intencional, mas não explicado na UI |
| ERC organizacional como coluna única vs distribuição | ⚠️ Simplificação não declarada |
| HFA ERC Category não confundida com ARMS Index 1–2500 | ✅ Documentado e testado |
| SIRA não misturado ao evento individual | ✅ SIRA não implementado — sem risco de mistura |

---

## 11. Comunicação de Incerteza

| Elemento | Status |
|---|---|
| Banner "perfil em formação" com N < 10 | ✅ Presente no header |
| Disclaimer "frequência na amostra ≠ probabilidade real" no SeraReasoningPanel | ✅ Presente |
| Disclaimer "não é ARMS canônico" no EventRiskCard | ✅ Presente |
| Indicador de amostra nas matrizes individuais | ❌ Ausente |
| Score com decomposição de componentes | ❌ Ausente — score único sem explicação |
| Aviso quando `modal_erc_level` é baseado em poucas análises | ❌ Ausente |
| Aviso sobre viés de subnotificação | ❌ Ausente |

---

## 12. Modelo Futuro Recomendado

### Camada 1 — Dados observados (já presente, parcialmente)
- Total de análises, período, distribuição P/O/A — ✅
- Distribuição por HFA ERC Category (histograma) — ❌ falta
- Ações abertas/concluídas/vencidas — ✅
- Eventos por setor/base/tipo de operação — ❌ falta

### Camada 2 — Padrões recorrentes
- Clusters de categorias semelhantes com contagem e % — ⚠️ parcial (top_combinations)
- Limiar de recorrência significativa (ex: ≥3 ocorrências) — ❌ falta
- Combinações com contexto semelhante identificadas — ❌ falta

### Camada 3 — Safety Issue Candidates
- Só promover para candidato quando: recorrência ≥ N, contexto semelhante, mecanismo causal similar — ❌ falta
- Exibir como "candidato", não "Safety Issue confirmado" — ❌ falta
- Ligar candidatos a ações corretivas — ❌ falta

### Camada 4 — Tendência temporal
- Tendência por categoria ERC ao longo do tempo — ❌ falta
- Tendência por tipo de falha P/O/A — ❌ falta
- Separar volume de taxa (requer denominador) — ❌ falta

### Camada 5 — Tratamento e maturidade
- Reincidência após ação corretiva — ❌ falta
- Eficácia percebida (resultado de ação) — ❌ falta
- Barreiras reforçadas por Safety Issue — ❌ falta

### Camada 6 — Síntese executiva
- Substituir "score único" por diagnóstico narrativo em camadas — ❌ falta
- Linguagem: "Perfil em formação: padrão dominante X com Y% de recorrência" — ❌ falta
- Confiança explícita: "Baseado em N análises — diagnóstico preliminar" — ⚠️ parcial

---

## 13. Roadmap v0.9-B a v1.0

### RISK v0.9-B — Refatorar score organizacional
**Objetivo:** Rebaixar "score de risco" para "índice de atividade" ou decompor em subindicadores.  
**Escopo:** `org/intelligence/route.ts` (score), `OrgScoreCard.tsx`, `risk-profile/page.tsx` (labels).  
**Critério de sucesso:** Score não é mais apresentado como "risco" sem decomposição. Componentes separados (completude, ações, volume) são exibidos ou documentados.  
**Risco:** Breaking change visual para usuários que já leram o score como risco.

### RISK v0.9-C — Safety Issue Candidates
**Objetivo:** Detectar padrões recorrentes e apresentá-los como candidatos (não confirmados).  
**Escopo:** `org/intelligence/route.ts` (novo campo `safety_issue_candidates`), novo painel em `risk-profile`.  
**Critério:** ≥3 análises com mesma combinação P+O em janela de 90 dias = candidato.  
**Risco:** Falsos positivos com amostra pequena — mitigado pelo limiar mínimo.

### RISK v0.9-D — Tendência por qualidade
**Objetivo:** Mostrar evolução de ERC e categorias P/O/A ao longo do tempo, não apenas volume.  
**Escopo:** `org/intelligence/route.ts` (trend por ERC bucket), `TrendChart`.  
**Critério:** Separação entre "volume de análises" e "qualidade de risco" na tendência.

### RISK v0.9-E — Indicadores de confiança
**Objetivo:** Amostra mínima, qualidade por análise, risco de subnotificação.  
**Escopo:** API (novo campo `data_confidence`), UI (indicador de confiança).  
**Critério:** Score e matrizes exibem nível de confiança vinculado ao N.

### RISK v1.0 — Risk Profile metodologicamente estável
**Objetivo:** Perfil em camadas, Safety Issues, tendência por qualidade, exportação, validação com especialistas.  
**Pré-requisitos:** v0.9-B, v0.9-C, v0.9-D, v0.9-E concluídos.

---

## 14. Validação Executada

Esta fase é documental. Testes de código existentes foram confirmados verdes:

```
npx tsx tests/sera/test-erc-conversion.ts    → 75/75 PASS
npx tsx tests/sera/test-erc-modal.ts         → 10/10 PASS
npx tsx tests/sera/test-erc-presentation.ts  → 9/9 PASS
npx tsx tests/sera/test-erc-api-ui-contract.ts → 38/38 PASS
cd frontend && npx tsc --noEmit              → 0 erros de código
risk contract checker default               → 10/10 OK
risk contract checker --strict              → 10/10 OK, WARN 0, FAIL 0
```

Nenhum código foi alterado nesta fase.

---

## 15. Arquivos Revisados

| Arquivo | Existência |
|---|---|
| `docs/RISK_METHODOLOGY_AUDIT_v0.1.md` | ✅ Lido |
| `docs/RISK_METHODOLOGY_GOVERNANCE_v0.1.md` | ✅ Lido |
| `docs/RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md` | ✅ Lido |
| `docs/RISK_IMPLEMENTATION_AUDIT_v0.5.md` | ✅ Lido |
| `docs/RISK_ERC_CANONICAL_DECISION_v0.7.md` | ✅ (revisado anteriormente) |
| `docs/RISK_ERC_IMPLEMENTATION_PLAN_v0.7-B.md` | ✅ (revisado anteriormente) |
| `docs/RISK_ERC_CONVERSION_v0.8-A.md` | ✅ (revisado anteriormente) |
| `docs/RISK_ERC_MODAL_v0.8-B.md` | ✅ (revisado anteriormente) |
| `docs/RISK_ERC_CONSUMPTION_AUDIT_v0.8-C.md` | ✅ (revisado anteriormente) |
| `docs/RISK_ERC_API_UI_CONTRACT_v0.8-D.md` | ✅ (revisado anteriormente) |
| `docs/PRODUCT_AUDIT_v0.2-A.md` | ✅ Lido |
| `docs/RISK_VALIDATION_CONTRACT_v0.3.md` | ✅ (revisado anteriormente) |
| `docs/PRODUCT_ROADMAP_v0.2.md` | — Não lido nesta fase |
| `docs/SERA_GOVERNANCE.md` | ❌ Não encontrado |
| `docs/SERA_FROZEN_v0.1.md` | ❌ Não encontrado |
| `frontend/src/app/api/org/intelligence/route.ts` | ✅ Lido integralmente |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | ✅ Lido parcialmente (componentes de risco) |
| `frontend/src/lib/sera/erc-conversion.ts` | ✅ Lido |
| `frontend/src/lib/sera/erc-modal.ts` | ✅ Lido |
| `frontend/src/lib/sera/erc-presentation.ts` | ✅ Lido |

---

## 16. Conclusão

O Risk Profile Organizacional do HFA/SERA tem uma arquitetura dual conceitualmente correta (ERC individual × ISO organizacional), com disclaimers adequados nas telas críticas e proteções contra dados invertidos (v0.8-A–D). As correções das fases anteriores eliminaram os bugs de inversão de escala ERC.

Os achados desta auditoria são de natureza diferente — não são bugs de implementação, mas limitações metodológicas estruturais que precisam ser comunicadas e gradualmente resolvidas:

1. **F-001 (Bloqueador):** O score é proxy de completude, não de risco. A nomenclatura induz interpretação errada.
2. **F-002–F-004 (Alta prioridade):** Barreira única para toda a org, tendência sem qualidade, ausência de Safety Issue candidates.
3. **F-005–F-007 (Média prioridade):** Probabilidade como frequência relativa, severidade só de Percepção, barreira distinta entre telas.
4. **F-008–F-010 (Média/Baixa):** Comunicação de incerteza ausente nas matrizes, alertas triviais, pesos sem referência.

O roadmap v0.9-B a v1.0 proposto permite endereçar estes achados de forma incremental, isolada e testável, sem quebrar o estado atual de funcionamento do sistema.

**A tese do produto** — diagnóstico de fator humano organizacional, não apenas soma de eventos — requer a implementação de Safety Issue Candidates (v0.9-C) para ser plenamente realizável. Sem este passo, o Risk Profile permanece no nível de "estatística de eventos" em vez de "diagnóstico organizacional".
