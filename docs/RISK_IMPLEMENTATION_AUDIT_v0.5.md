# Auditoria de Implementação de Risco — RISK v0.5

**Data:** 2026-05-17  
**Fase:** RISK v0.5  
**HEAD:** ce9c4899 (= origin/main, working tree limpo)  
**Checker:** 10/10 OK (default e --strict)  
**Escopo:** Comparar implementação atual contra `RISK_VALIDATION_CONTRACT_v0.3.md`. Nenhum código alterado nesta fase.

---

## 1. Resumo Executivo

A implementação atual cumpre **parcialmente** o contrato de risco. A arquitetura dual (ERC por evento × ISO/ICAO organizacional) está conceitualmente correta. Os disclaimers sobre limitações metodológicas existem nas telas críticas. O banner de "perfil em formação" protege contra diagnósticos precoces.

**Violações críticas:** 3  
**Violações médias:** 4  
**Itens aceitáveis:** 8  
**Bugs identificados (não corrigidos):** 2

A violação mais grave é **F-001** (inversão de escala motor × UI), já documentada em governança e bloqueada de conexão. A segunda mais grave é a **ausência de detecção de padrões para SIRA** — o sistema não tem mecanismo para sinalizar Safety Issues recorrentes.

---

## 2. Mapa da Implementação Atual

### 2.1 Tela `/events/[id]` — Evento Individual

| Componente | Arquivo | Função | Nota |
|---|---|---|---|
| `computeEventRisk()` | `events/[id]/page.tsx:148` | ERC individual | client-side |
| `evBarrierLevel(p,o,a)` | `events/[id]/page.tsx:131` | Barrier proxy | conta falhas P/O/A |
| `EV_ARMS_SEV_ROW` | `events/[id]/page.tsx:120` | Severity row | P-B→B, P-F→B, P-A→D, else→C |
| `EV_ARMS_ERC` | `events/[id]/page.tsx:124` | Lookup table | A1=5…D4=1 |
| `ERC_STYLE` | `events/[id]/page.tsx:174` | Cor por ERC | 5=red, 1=green |
| `EventRiskCard` | `events/[id]/page.tsx:186` | Card exibido | label "ARMS-ERC" |
| ercLabels | `events/[id]/page.tsx:156` | Texto urgência | "Ação imediata obrigatória" etc. |

**Fluxo:** P/O/A codes → `evBarrierLevel()` → `EV_ARMS_ERC[sevKey+barrier]` → ERC 1–5 + label + cor.

**Não usa:** `analyses.erc_level` (motor). Recalcula client-side. Evita F-001 ao não tocar no dado do banco.

### 2.2 Tela `/risk-profile` — Perfil Organizacional

| Componente | Arquivo | Função | Nota |
|---|---|---|---|
| `TraditionalMatrix` | `risk-profile/page.tsx:244` | Matriz 5×5 ISO/ICAO | Prob × Sev |
| `ARMSMatrix` | `risk-profile/page.tsx:650` | Matriz 4×4 ARMS | org-level |
| `barrierLevel(score)` | `risk-profile/page.tsx:164` | Barrier proxy | derivado do score org |
| `countToProb(count, total)` | `risk-profile/page.tsx:191` | Probabilidade | frequência na amostra |
| `SEVERITY_MAP` | `risk-profile/page.tsx:43` | P code → ISO sev | P-B=4, P-G=3, P-A=1 |
| `ARMS_SEV_ROW` | `risk-profile/page.tsx:106` | P code → ARMS row | P-B→B, P-F→B, P-A→D |
| `ARMS_ERC` | `risk-profile/page.tsx:111` | Lookup table | idêntica à da tela evento |
| `SeraReasoningPanel` | `risk-profile/page.tsx:922` | Raciocínio SERA→matriz | explicação em-tela |
| `modal_erc_level: null` | `org/intelligence/route.ts:309` | F-002 | sempre null |

**Fluxo ARMS org:** `modal_erc_level ?? barrierLevel(score)` → todos eventos na mesma coluna de barreira.  
**Fluxo traditional:** top P-codes → `P_SEVERITY[code]` → sev; `countToProb(count, total)` → prob; score = prob × sev.

### 2.3 API `/api/org/intelligence` — Score Organizacional

| Campo | Cálculo | Observação |
|---|---|---|
| `base_score` | `((pTotal×1.0 + oTotal×0.8 + aTotal×0.6) / total / 3) × 100` | Ver bug §6.1 |
| `penalties` | +15 se `open_overdue > 0`; +5 se volume > 1.5× média | 2 penalidades possíveis |
| `score.value` | `min(base_score + penalties, 100)` | Capped em 100 |
| `scoreLevel` | `>= 70` → critical; `>= 40` → warning; else → ok | |
| `modal_erc_level` | `null` (hardcoded) | F-002 não resolvido |

### 2.4 Dashboard `/dashboard`

- Exibe `OrgScoreCard` com score 0–100
- Modal do score explica o cálculo com texto explícito
- Não exibe ERC por evento individualmente
- Usa dados da API `org/intelligence`

---

## 3. Tabela de Conformidade com o Contrato

| # | Critério do Contrato (§6 do CONTRACT v0.3) | Status | Evidência |
|---|---|---|---|
| 6.1 | ARMS/ERC NÃO afirma probabilidade de recorrência por evento | **CUMPRE** | Card diz "estimado com base nas evidências"; sem "probabilidade X%" |
| 6.2 | Matriz tradicional NÃO afirma probabilidade real sem base | **VIOLA PARCIALMENTE** | Disclamer existe mas usa freq. na amostra como proxy de probabilidade ISO |
| 6.3 | UI não apresenta categoria HFA 1–5 como ARMS canônico sem nota | **VIOLA** | Card diz "ARMS-ERC" sem indicar que é adaptação ordinal 1–5 |
| 6.4 | Risk profile com n<10 exibe aviso de amostra insuficiente | **CUMPRE PARCIALMENTE** | Banner "em formação" existe, mas só no header; matrizes não têm aviso próprio |
| 6.5 | Evento isolado NÃO aciona SIRA automaticamente | **CUMPRE** | SIRA não está implementado; não há trigger automático |
| 6.6 | Padrão recorrente É sinalizado para SIRA | **VIOLA** | Nenhum mecanismo de detecção de Safety Issues ou recomendação de SIRA |

---

## 4. Violações Críticas

### 4.1 CRÍTICA — F-001: Inversão de escala motor × UI — decisão registrada, implementação pendente

**Localização:** `frontend/src/lib/sera/pipeline.ts` (motor), `events/[id]/page.tsx` (UI)

**Estado (atualizado 2026-05-17, RISK v0.7):** Decisão formal registrada — **Opção A adotada**: ERC 5=crítico, ERC 1=aceitável, escala HFA 1–5 como canônica. Código NÃO alterado. Motor ainda usa ERC 1=perigo. A UI está protegida porque `computeEventRisk()` recalcula independentemente sem ler `analyses.erc_level`.

**Impacto remanescente:** Bloquear conexão UI↔motor até que RISK v0.8 inverta o motor e execute migration de dados históricos. F-002 permanece bloqueado até F-001 ser implementado.

**Referência:** `RISK_METHODOLOGY_GOVERNANCE_v0.1.md §7.6`, `RISK_ERC_CANONICAL_DECISION_v0.7.md`.

---

### 4.2 CRÍTICA — F-002: `modal_erc_level` hardcoded null

**Localização:** `frontend/src/app/api/org/intelligence/route.ts:309`

```typescript
modal_erc_level: null,  // hardcoded
```

**Impacto:** A matriz ARMS no risk-profile usa `barrierLevel(data.score.value)` como coluna de barreira para TODOS os eventos da organização. Não há diferenciação de barreira por evento — todos os eventos compartilham a mesma coluna de barreira (derivada do score org heurístico).

**Consequência:** A matriz ARMS no risk-profile é essencialmente um gráfico de distribuição de severidade com uma coluna de barreira constante — não um ARMS real.

**UI reconhece isso parcialmente:** O SeraReasoningPanel exibe "Estimada pelo score HFA: X (nenhuma análise com ERC calculado ainda)" quando `modal_erc_level` é null. Mas a matriz ainda é exibida como ARMS.

**Bloqueante de:** resolução de F-001 (conectar `modal_erc_level` requer F-001 resolvido primeiro).

---

### 4.3 CRÍTICA — Ausência total de detecção de Safety Issues (SIRA)

**Localização:** Não existe

**Contrato §6.6:** "Se um padrão de eventos similares for identificado na base de dados, o sistema deve sinalizar que SIRA é recomendado."

**Estado atual:** O sistema não detecta padrões recorrentes. Cada evento é tratado como independente. A traditional matrix mostra frequência de P-codes mas não aciona alerta de SIRA quando um padrão é identificado. `top_combinations` no API lista pares de falhas frequentes mas sem interpretação de Safety Issue.

**Impacto metodológico:** Um padrão como "P-G aparece em 4 eventos de uma mesma companhia em 3 meses" (fixture TEST-RISK-SIRA-001) não seria sinalizado. Isso viola diretamente o contrato.

**Nota:** Este é um gap estrutural, não um bug. Requer implementação de nova funcionalidade.

---

## 5. Violações Médias

### 5.1 MÉDIA — Label "ARMS-ERC" sem nota de adaptação (bloqueante 6.3)

**Localização:** `events/[id]/page.tsx:195`

```tsx
<span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">ARMS-ERC</span>
...
<span className="text-[9px] text-slate-600 mt-0.5">de 5</span>
```

**Problema:** O card exibe "ARMS-ERC" e "de 5" sem nota explicando que a escala HFA 1–5 é uma adaptação ordinal do índice ARMS canônico (1–2500, 13 valores). Um usuário poderia interpretar "ERC 5" como referência direta ao padrão ARMS.

**Contrato §6.3:** A UI deve distinguir escala HFA 1–5 do índice ARMS canônico com nota explicativa.

**Recomendação:** Adicionar subtexto ou tooltip: "Escala HFA 1–5 (adaptação do ARMS Working Group 2010)".

---

### 5.2 MÉDIA — Probabilidade na matriz tradicional = frequência na amostra

**Localização:** `risk-profile/page.tsx:191-199` (`countToProb`) e modal das células

```tsx
<p className="text-xs text-slate-400 mt-1">
  Foram encontrados {selected.cell.count} evento{...} com este padrão de falha nos dados analisados.
  A frequência observada corresponde ao nível {selected.prob} — {PROB_LABELS[selected.prob - 1].name} — da escala ISO 31000.
</p>
```

**Problema:** O texto diz "A frequência observada corresponde ao nível X da escala ISO 31000" — isso equipara "frequência dentro da amostra de eventos investigados" à probabilidade ISO 31000. ISO 31000 usa probabilidade de ocorrência na operação, não frequência na amostra de relatos.

**Disclaimer existe** (no rodapé da matriz): "A probabilidade nesta matriz é inferida da frequência relativa dos padrões de falha dentro do banco de eventos investigados — não da frequência operacional real." — Mas o disclaimer é genérico (cita apenas "subestimar") e não inibe a afirmação de probabilidade no modal.

**Recomendação:** Reformular o modal para dizer "frequência do padrão nas análises" em vez de "nível ISO 31000"; ou adicionar nota mais explícita no modal.

---

### 5.3 MÉDIA — Banner "em formação" só no header da página

**Localização:** `risk-profile/page.tsx:1343-1369`

```typescript
const isForming = totalAnalyses > 0 && totalAnalyses < 10
```

**Problema:** O banner "Perfil de risco em formação" é exibido apenas no topo da página para 1–9 análises. As matrizes (traditional e ARMS) são exibidas normalmente abaixo sem aviso adicional. Um usuário que faz scroll diretamente para as matrizes pode não ver o aviso.

**Contrato §6.4:** O aviso de amostra insuficiente deveria estar visível próximo às matrizes.

**Recomendação:** Adicionar nota de "dados preliminares" diretamente nas matrizes quando `isForming`.

---

### 5.4 MÉDIA — AiInsightPanel gera `nivel_risco` sem restrições metodológicas

**Localização:** `components/sera/AiInsightPanel.tsx:17`

```typescript
interface InsightData {
  nivel_risco: string  // gerado por LLM
  ...
}
```

**Problema:** O campo `nivel_risco` é gerado por IA sobre os dados de inteligência da organização. Não há controle sobre o que o LLM pode afirmar — poderia gerar "risco crítico — probabilidade de acidente em X%" ou linguagem equivalente.

**Mitigação atual:** Este painel é on-demand (o usuário precisa clicar "Gerar Diagnóstico IA"); não é exibido por padrão.

**Recomendação:** Verificar o prompt da API `/api/org/ai-insight` e restringir linguagem de probabilidade absoluta.

---

## 6. Bugs Específicos Identificados (sem correção nesta fase)

### 6.1 Bug — Score quasi-constante para qualquer org com análises completas

**Localização:** `frontend/src/app/api/org/intelligence/route.ts:242-246`

```typescript
const base_score =
  total > 0
    ? ((pTotal * 1.0 + oTotal * 0.8 + aTotal * 0.6) / total / 3) * 100
    : 0
```

**Problema:** `pTotal`, `oTotal`, `aTotal` são contagens de análises com código presente (não-nulo). Se toda análise produz P, O e A code (que é o caso padrão), então `pTotal ≈ oTotal ≈ aTotal ≈ total`.

Resultado: `base_score ≈ ((1.0 + 0.8 + 0.6) / 3) × 100 = 80` para qualquer organização com análises completas — independentemente de se os códigos são P-A (sem falha) ou P-B (falha grave).

**Consequência:** O score não diferencia entre uma org com todas análises P-A (zero percepção comprometida) e uma org com todas P-B (percepção comprometida em todos os eventos). Ambas têm base_score ≈ 80. A diferenciação ocorre apenas por penalidades (overdue actions e picos de eventos).

**Referência:** F-004 em `RISK_METHODOLOGY_GOVERNANCE_v0.1.md`. Sem referência metodológica documentada.

---

### 6.2 Bug — `evBarrierLevel()` usa contagem de falhas P/O/A como proxy de barreira

**Localização:** `events/[id]/page.tsx:131-137`

```typescript
function evBarrierLevel(p, o, a): 1 | 2 | 3 | 4 {
  const fails = [p && p !== 'P-A', o && o !== 'O-A', a && a !== 'A-A'].filter(Boolean).length
  if (fails >= 3) return 1  // "ausentes"
  if (fails === 2) return 2  // "mínimas"
  if (fails === 1) return 3  // "limitadas"
  return 4  // "efetivas"
}
```

**Problema:** A função usa a quantidade de dimensões SERA com falha (P ≠ P-A, O ≠ O-A, A ≠ A-A) como proxy de efetividade de barreira. Isso confunde:
1. **Multiplicidade de falhas causais** (quantas dimensões SERA falharam) com
2. **Efetividade de barreiras remanescentes** (quão robustas eram as proteções entre o evento e o acidente)

ARMS Q2 é sobre barreiras técnicas, procedurais e supervisórias remanescentes — não sobre dimensões de falha humana. Um evento P-B/O-A/A-A (apenas percepção comprometida) recebe `barrier=3` ("limitadas"), mas as barreiras reais podem ter sido robustas ou inexistentes independentemente do código SERA.

**Impacto prático:** É uma adaptação heurística defensável por ser simples e consistente. Mas produz classificações que divergem do método ARMS nos casos de borda (ex: evento P-B/O-B/A-A = 2 falhas → barrier=2, mas se havia copiloto efetivo como backup, a barreira real era efetiva).

**Nota:** Este bug não está listado no backlog de motor (MOTOR-001 a MOTOR-004) porque é da UI/computação, não do motor SERA. Registrar como F-009.

---

## 7. Itens Aceitáveis por Enquanto

| # | Item | Por que é aceitável |
|---|---|---|
| 1 | ERC card disclaimer: "Nível de risco estimado com base nas evidências disponíveis" | Linguagem correta — sem afirmação de probabilidade |
| 2 | Disclaimer da matriz traditional no rodapé | Existe e é relevante — incompleto mas presente |
| 3 | Separação dual model: eventos → ERC, org → matrices | Arquitetura conceitualmente correta |
| 4 | Banner "Perfil em formação" para n < 10 | Protege contra diagnóstico precoce |
| 5 | `computeEventRisk()` não lê `analyses.erc_level` | Evita F-001 ativamente |
| 6 | SeraReasoningPanel reconhece barreira estimada por score | "Estimada pelo score HFA" quando modal_erc_level=null |
| 7 | ARMS explanation no risk-profile | Texto claro: "não usa probabilidade histórica — usa barreiras" |
| 8 | Guia de quando usar cada matriz | "Use a Matriz ARMS-ERC quando..." — orienta corretamente |
| 9 | Referências explícitas no modal das células | "ARMS Working Group (EASA, 2010)", "ISO 31000:2018" |
| 10 | AiInsightPanel é on-demand | Não exibido por padrão — limita exposição de linguagem LLM |

---

## 8. Recomendações de Implementação por Ordem

### Prioridade 1 — Bloqueantes de produção

**R1. Resolver F-001 (inversão de escala motor × UI)**
- Seguir `RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md` seção 8 (sequência de implementação)
- Pré-requisito: decisão formal em `RISK_METHODOLOGY_GOVERNANCE_v0.1.md` §7.6
- Impacto: desbloqueia F-002 e melhora consistência metodológica

**R2. Após F-001: conectar F-002 (`modal_erc_level`)**
- Calcular barrier modal real a partir de `analyses.erc_level` histórico (usando escala corrigida)
- Substituir `modal_erc_level: null` por dado real
- Impacto: ARMS matrix no risk-profile passa a usar dados reais de barreira

### Prioridade 2 — Violações médias

**R3. Adicionar nota no card ERC do evento**
- Subtexto ou tooltip: "Escala HFA 1–5 — adaptação do ARMS Working Group 2010"
- Arquivo: `events/[id]/page.tsx:195`
- Esforço: baixo (1 linha de texto)

**R4. Reformular linguagem de probabilidade no modal da matriz traditional**
- Substituir "A frequência observada corresponde ao nível X da escala ISO 31000" por
  "X eventos com este padrão de falha foram identificados na amostra (≈ probabilidade X)"
- Arquivo: `risk-profile/page.tsx` — modal de células traditional
- Esforço: médio (reformulação de texto)

**R5. Aviso de amostra insuficiente nas matrizes (não só no header)**
- Quando `isForming`, adicionar nota "dados preliminares" abaixo de cada matriz
- Arquivo: `risk-profile/page.tsx`
- Esforço: baixo

**R6. Verificar prompt do ai-insight para `nivel_risco`**
- Ler `frontend/src/app/api/org/ai-insight/route.ts`
- Restringir linguagem de probabilidade absoluta no prompt
- Esforço: baixo

### Prioridade 3 — Extensões estruturais

**R7. Implementar detecção básica de Safety Issues**
- Quando top_codes mostrar um código dominando > X% com tendência crescente, adicionar alerta de SIRA
- Integrar com `alerts` da API `org/intelligence`
- Esforço: médio-alto (nova funcionalidade)

**R8. Corrigir fórmula de score (F-004)**
- Substituir contagem de análises com código presente por medida de severidade dos códigos
- Usar `P_SEVERITY` e equivalentes para O/A como peso da contribuição
- Requer decisão metodológica (Tipo 2 em RISK_METHODOLOGY_GOVERNANCE)
- Esforço: médio (API + calibração)

**R9. Corrigir `evBarrierLevel()` (F-009)**
- Considerar inputs adicionais além de P/O/A para calcular barreira remanescente
- Por enquanto: é adaptação aceitável; corrigir só se houver casos documentados de divergência
- Esforço: alto (requer redesign da coleta de dados de barreira)

---

## 9. O que NÃO Corrigir Ainda

- **Motor SERA (P/O/A):** Backlog MOTOR-001 a MOTOR-004 é fora do escopo de risco.
- **Lookup tables `EV_ARMS_ERC` e `ARMS_ERC`:** Já corretas para Opção A (não alterar antes da decisão F-001).
- **`ERC_STYLE` e `ercLabels`:** Corretos para a escala UI (não alterar).
- **`barrierLevel(score)` para org profile:** Heurística aceitável enquanto F-002 não é resolvido; corrigir F-002 primeiro.
- **`SEVERITY_MAP` (P codes → ISO severity):** Requer validação com Daumas (2018); não alterar sem referência.
- **Fixtures TEST-RISK-\*:** Aprovados pelo checker 10/10 OK; não alterar sem nova tarefa de risco.
- **Linha D da lookup table (D1=2, D2=2):** Desvio menor do padrão ARMS; sem impacto crítico no momento.

---

## 10. Critérios para RISK v0.6

A próxima fase (RISK v0.6) será autorizada quando ao menos um dos seguintes for cumprido:

**Critério A — Decisão formal F-001:**
- `RISK_METHODOLOGY_GOVERNANCE_v0.1.md` §7.6 preenchido com decisão de Opção A ou B
- Fixtures de validação para os 5 níveis ERC criados e passando
- Plano de migração de `analyses.erc_level` definido

**Critério B — Implementação de avisos (sem F-001):**
- R3: nota de adaptação no card ERC (esforço baixo)
- R4: reformulação de linguagem de probabilidade
- R5: aviso de amostra nas matrizes
- Checker 10/10 OK após qualquer mudança de fixture

**Critério C — Detecção básica de Safety Issues:**
- Alertas de SIRA recomendado quando padrão recorrente detectado
- Threshold configurável (ex: mesmo P-code em > 30% das análises em 90d)

Independente do critério: **F-002 bloqueado** até que F-001 seja resolvido.

---

## Apêndice — Achados por Arquivo

### `events/[id]/page.tsx`

| Achado | Linha | Nível | Detalhe |
|---|---|---|---|
| Label "ARMS-ERC" sem nota de adaptação | 195 | MÉDIO | Sem indicar que é HFA 1–5, não índice 1–2500 |
| Disclaimer adequado no card | 218 | OK | "Nível estimado... revise antes do relatório" |
| `evBarrierLevel()` usa P/O/A como proxy | 131 | BUG/ADAPTAÇÃO | Aceitável mas impreciso em casos de borda |
| Sem afirmação de probabilidade | — | OK | Nenhuma ocorrência de "probabilidade X%" |
| Escala 1–5 visível ("de 5") | 196 | OK | Correto — informa que é escala de 5 |

### `risk-profile/page.tsx`

| Achado | Linha | Nível | Detalhe |
|---|---|---|---|
| ARMS matrix usa 1 coluna de barreira para toda org | 654 | CRÍTICO (F-002) | Dependente de modal_erc_level=null |
| `countToProb()` = frequência na amostra | 191 | MÉDIO | Não é probabilidade operacional |
| Modal da célula: "corresponde ao nível ISO 31000" | 329 | MÉDIO | Equipara freq. amostra a prob. ISO |
| Disclaimer no rodapé da traditional matrix | 514–523 | OK | Existe; incompleto mas presente |
| Banner "perfil em formação" | 1343 | PARCIAL | Só no header; não nas matrizes |
| Guia de quando usar cada matriz | 1430 | OK | Texto claro e correto |
| ARMS explanation (sem probabilidade) | 900–915 | OK | Explicação metodológica correta |
| `SeraReasoningPanel` identifica estimativa | 988 | OK | "Estimada pelo score HFA" quando null |

### `api/org/intelligence/route.ts`

| Achado | Linha | Nível | Detalhe |
|---|---|---|---|
| `modal_erc_level: null` | 309 | CRÍTICO (F-002) | Hardcoded |
| Score formula quasi-constante | 242 | BUG (F-004) | base_score ≈ 80 para qualquer org com análises |
| `openStatuses = ['pending','in_progress']` | 204 | OK | Já corrigido (F-005 histórico) |
| `closedStatus = 'completed'` | 213 | OK | Correto |
| `alerts` tem avisos operacionais úteis | 261–286 | OK | Overdue, top_code, unresolvedRecommendations |

---

## Integridade do Motor

Nenhum arquivo protegido foi alterado nesta fase:

```
git diff HEAD -- frontend/src/lib/sera tests/sera/baseline.json tests/sera/run.ts 
              tests/sera/fixtures/schema.ts schema/migrations scripts
→ (sem output)
```

Apenas este documento foi criado: `docs/RISK_IMPLEMENTATION_AUDIT_v0.5.md`.
