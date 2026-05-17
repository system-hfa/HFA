# Auditoria de Metodologia de Risco — HFA/SERA
**Versão:** v0.1  
**Data:** 2026-05-17  
**Autor:** Revisão técnica Claude (solicitada por Filipe Daumas)  
**Status:** Rascunho — aguardando revisão humana

---

## 1. Escopo e Objetivo

Esta auditoria examina as implementações de matrizes de risco, cálculo de ERC (Event Risk Classification) e perfil de risco organizacional no sistema HFA/SERA. O objetivo é identificar inconsistências metodológicas, lacunas de validação e riscos de integridade antes de qualquer expansão do produto (dashboard organizacional, trial público, novos clientes).

A auditoria **não propõe nem executa mudanças de código**. Apenas documenta o estado atual.

---

## 2. Arquivos Revisados

| Arquivo | Descrição |
|---|---|
| `frontend/src/lib/sera/pipeline.ts` | Pipeline SERA principal; funções `inferErcLevel()` e `runSeraPipeline()` |
| `frontend/src/lib/sera/all-steps.ts` | Motor de classificação; `inferDeterministicErcLevel()` (linha 1288) |
| `frontend/src/lib/sera/rules/erc/levels.json` | Definição canônica dos níveis ERC no motor |
| `frontend/src/lib/sera/types.ts` | Tipos TypeScript; `Step67Result.erc_level` |
| `frontend/src/app/(dashboard)/events/[id]/page.tsx` | Visualização por evento; `computeEventRisk()`, `EV_ARMS_ERC`, `EventRiskCard` |
| `frontend/src/app/(dashboard)/events/page.tsx` | Lista de eventos; badge ERC |
| `frontend/src/app/(dashboard)/risk-profile/page.tsx` | Dashboard organizacional; `ARMS_ERC`, `barrierLevel()`, ISO 31000 |
| `frontend/src/app/api/org/intelligence/route.ts` | API de inteligência organizacional; fórmula de score |
| `tests/sera/fixtures/TEST-ERC-4-001.json` | Fixture de teste ERC 4 |
| `tests/sera/fixtures/TEST-ERC-5-001.json` | Fixture de teste ERC 5 |

---

## 3. Componentes Analisados

### 3.1 Sistema ERC do Motor (pipeline.ts)

**Escala definida em `levels.json`:**
```
nível 1 → "Risco imediato, crítico, com baixa margem de recuperação"
nível 2 → "Risco alto, mas ainda com alguma barreira"
nível 3 → "Risco moderado, localizado"
nível 4 → "Risco baixo a moderado"
nível 5 → "Risco mínimo, administrativo"
```
**Escala: 1 = mais perigoso, 5 = mais seguro.**

**`inferErcLevel()` (pipeline.ts, linha 242) — fallback quando LLM não retorna ERC:**
```typescript
if (objective === 'O-B') return 1          // objetivo violado: ERC máximo
if (action === 'A-I' || action === 'A-J') return 1
if (hasAny(t, ['conflito iminente', ...])) return 1
if (action === 'A-B' || 'A-D' || 'A-G') return 3
if (action === 'A-C' || 'A-E' || 'A-F' || 'A-H') return 2
// fallback universal → 2
```

**`inferDeterministicErcLevel()` (all-steps.ts, linha 1288) — overrides determinísticos:**
```typescript
if (actionCode === 'A-A' && evidenceOfAdministrativeRedundantNoOperationalImpact(text)) return 5
if (objectiveCode === 'O-B' && actionCode === 'A-A') return 1
if (perceptionCode === 'P-H' && actionCode === 'A-A') return 3
```
Usa a mesma escala: 1=mais perigoso, 5=mais seguro.

**Fixtures de teste disponíveis:** apenas ERC-4 e ERC-5 (baixo risco). Nenhum fixture para ERC-1, ERC-2, ERC-3 (alto risco).

---

### 3.2 ERC Exibido na UI (events/[id]/page.tsx)

**`EV_ARMS_ERC` (lookup table ARMS, linha 124):**
```typescript
const EV_ARMS_ERC: Record<string, number> = {
  A1: 5, A2: 5, A3: 4, A4: 3,
  B1: 4, B2: 4, B3: 3, B4: 2,
  C1: 3, C2: 3, C3: 2, C4: 1,
  D1: 2, D2: 2, D3: 1, D4: 1,
}
```

**`ERC_STYLE` (linha 174):**
```typescript
5: { bg: 'bg-red-950', ... }    // vermelho — mais perigoso
1: { bg: 'bg-green-950', ... }  // verde — aceitável
```

**`ercLabels` (linha 156):**
```typescript
5: 'Ação imediata obrigatória'
1: 'Aceitável'
```

**Escala da UI: 5 = mais perigoso, 1 = mais seguro. Inverso do motor.**

**`computeEventRisk()` (linha 148):** calcula ERC inteiramente no cliente a partir dos códigos P/O/A, usando `EV_ARMS_ERC`. **Não usa o campo `erc_level` armazenado no banco de dados.**

---

### 3.3 Matriz ARMS-ERC no Dashboard (risk-profile/page.tsx)

**`ARMS_ERC` (linha 111) — tabela idêntica à de events/[id]:**
```typescript
const ARMS_ERC: Record<string, number> = {
  A1: 5, A2: 5, A3: 4, A4: 3,
  B1: 4, B2: 4, B3: 3, B4: 2,
  C1: 3, C2: 3, C3: 2, C4: 1,
  D1: 2, D2: 2, D3: 1, D4: 1,
}
```

**`barrierLevel(score)` (linha 164):** usa o score organizacional (0-100) para derivar o nível de barreira:
```typescript
function barrierLevel(score: number): 1 | 2 | 3 | 4 {
  if (score >= 70) return 1   // score crítico → barreira mínima (1)
  if (score >= 40) return 2
  if (score >= 20) return 3
  return 4                     // score baixo → barreira efetiva (4)
}
```

---

### 3.4 Matriz ISO 31000 (risk-profile/page.tsx)

**Mapeamento de severidade SERA → ISO (SEVERITY_MAP, linha 43):**
```
P-B (Falha Sensorial)     → nível 4 (Grave)
P-F (Informação Ilusória) → nível 4 (Grave)
P-C, P-D, P-E, P-G       → nível 3 (Moderada)
P-H (Falha Comunicação)   → nível 2 (Menor)
P-A (Sem falha)           → nível 1 (Negligível)
```
**Apenas códigos de Percepção** são mapeados para severidade. Códigos de Objetivo e Ação não influenciam a matriz ISO.

**Mapeamento de probabilidade (`countToProb`):**
```typescript
> 75% das análises → Prob 5 (Frequente)
> 50%              → Prob 4 (Provável)
> 25%              → Prob 3 (Ocasional)
> 10%              → Prob 2 (Remoto)
demais             → Prob 1 (Improvável)
```

**Score da célula:** `prob × sev`  
**Zonas de risco:** ≥17 = Inaceitável, ≥10 = Elevado, ≥5 = Tolerável, <5 = Aceitável.

---

### 3.5 Score Organizacional (org/intelligence/route.ts)

**Fórmula de score (linha 242):**
```typescript
const base_score =
  total > 0
    ? ((pTotal * 1.0 + oTotal * 0.8 + aTotal * 0.6) / total / 3) * 100
    : 0
```
Onde `pTotal`, `oTotal`, `aTotal` = contagem de análises com código não-nulo por categoria.

**Penalidades:** +15 se há ações vencidas; +5 se eventos do mês > 1,5× média mensal.

**Score máximo teórico** (todas análises com todos os 3 códigos, sem penalidades):  
`(1.0 + 0.8 + 0.6) / 3 × 100 = 80`  
Com penalidades máximas: `80 + 15 + 5 = 100`.

**Limites:** critical ≥70, warning ≥40, ok <40.

**Status de ações** (linha 204): usa `openStatuses = new Set(['open', 'in_progress'])`, mas o schema de `corrective_actions` usa `'pending'` e `'in_progress'` — `'open'` não é um status válido. Resultado: `open_total` = 0 sempre (ações `pending` nunca são contadas como abertas).

---

## 4. Achados

### F-001 — CRÍTICO: Inversão de Escala ERC entre Motor e UI

**Severidade:** Crítica  
**Impacto:** Qualitativo — erros de interpretação pelo usuário final e pelos desenvolvedores

**Descrição:**  
O motor (`pipeline.ts`, `levels.json`) armazena `erc_level` com escala **1 = mais perigoso, 5 = mais seguro**. A UI (`events/[id]/page.tsx`, `risk-profile/page.tsx`) exibe ERC com escala **5 = mais perigoso, 1 = mais seguro**. As duas escalas são completamente inversas.

**Evidência:**
- `levels.json`: `"level": 1` → `"Risco imediato, crítico"`
- `inferErcLevel()`: retorna `1` para `O-B` (falha de objetivo mais severa)
- `ERC_STYLE[5]`: `bg-red-950` (vermelho, perigo)
- `ercLabels[5]`: `'Ação imediata obrigatória'`

**Agravante:** O campo `analyses.erc_level` (armazenado pelo motor com escala 1=perigo) **nunca é exibido na UI**. `computeEventRisk()` recalcula o ERC no cliente usando a escala invertida (5=perigo). São dois sistemas ERC paralelos sem reconciliação.

**Risco operacional:** Se no futuro o ERC armazenado for exibido diretamente, um evento classificado como ERC 1 pelo motor (máximo perigo) apareceria como "Aceitável" na UI. O inverso também se aplica: ERC 5 do motor (administrativo) apareceria como "Ação imediata obrigatória".

---

### F-002 — CRÍTICO: `modal_erc_level` sempre nulo no dashboard

**Severidade:** Crítica (dado sem uso)  
**Impacto:** Dashboard de perfil de risco não reflete o ERC real das análises

**Descrição:**  
A API `/api/org/intelligence` retorna `modal_erc_level: null` (hardcoded, linha 309). O dashboard consome este campo mas recebe sempre nulo. Consequentemente, a exibição ARMS-ERC no perfil organizacional **não representa os dados reais** dos eventos — usa apenas o score derivado da fórmula proprietária.

---

### F-003 — ALTA: Dois métodos incompatíveis para nível de barreira ARMS

**Severidade:** Alta  
**Impacto:** O mesmo indicador (barreira ARMS) é calculado de forma diferente em duas telas

**Descrição:**

Em `events/[id]/page.tsx`, `evBarrierLevel()` conta a quantidade de códigos não-"A" entre P, O, A:
```typescript
const fails = [p !== 'P-A', o !== 'O-A', a !== 'A-A'].filter(Boolean).length
// 3 falhas → barreira 1 (pior); 0 falhas → barreira 4 (melhor)
```

Em `risk-profile/page.tsx`, `barrierLevel()` usa o score organizacional (0-100):
```typescript
if (score >= 70) return 1
if (score >= 40) return 2
if (score >= 20) return 3
return 4
```

Estes dois métodos são metodologicamente incompatíveis. O mesmo evento pode resultar em barreira 3 na página individual e barreira 2 no dashboard, sem que haja razão metodológica para a diferença.

---

### F-004 — ALTA: Fórmula de score organizacional sem base metodológica documentada

**Severidade:** Alta  
**Impacto:** O "Score de Risco Organizacional" exibido no dashboard não se conecta a nenhum framework publicado

**Descrição:**  
A fórmula `((pTotal * 1.0 + oTotal * 0.8 + aTotal * 0.6) / total / 3) * 100` é uma média ponderada de presença de códigos. Os pesos (1.0, 0.8, 0.6) e a divisão por 3 não têm referência metodológica documentada (ISO 31000, ICAO SMM, ou qualquer outra fonte citada no código ou nos docs).

**Consequência:** O score aparece com autoridade visual (gauge colorido, rótulos "Crítico/Atenção/Normal") mas seu cálculo é opaco e não validado. Um usuário que perguntar "por que meu score é 47?" não tem como obter uma resposta metodologicamente fundamentada.

---

### F-005 — ALTA: Status de ações abertas sempre zerado no dashboard

**Severidade:** Alta  
**Impacto:** O widget "Ações em aberto" no perfil de risco sempre exibe 0

**Descrição:**  
Em `org/intelligence/route.ts` linha 204:
```typescript
const openStatuses = new Set(['open', 'in_progress'])
```
O schema real de `corrective_actions.status` usa `'pending'`, `'in_progress'`, `'completed'`, `'cancelled'`. O status `'open'` não existe. Portanto, ações com status `'pending'` — que são todas as ações recém-criadas — nunca são contadas como abertas.

**Efeito:** `open_total` = apenas ações `in_progress`. Ações `pending` são ignoradas. A penalidade de +15 para `open_overdue` também é afetada: ações vencidas com status `pending` não acionam a penalidade.

---

### F-006 — MÉDIA: Matriz ISO 31000 usa apenas códigos de Percepção

**Severidade:** Média  
**Impacto:** Eventos com falhas de Objetivo ou Ação graves sem falha de Percepção aparecem com severidade negligível

**Descrição:**  
`SEVERITY_MAP` e `P_SEVERITY` mapeiam apenas códigos `P-*`. Um evento com `P-A` (sem falha de percepção) mas `O-B` (falha de objetivo grave) ou `A-I` (ação catastrófica) recebe severidade 1 (Negligível) na matriz ISO 31000, pois apenas o código de percepção é considerado.

**Exemplo:** O-B é o objetivo mais severo no motor (retorna ERC=1). Na matriz ISO 31000, se o operador percebeu corretamente mas tomou decisão incorreta (O-B), o evento aparece como "Negligível" na matriz.

---

### F-007 — MÉDIA: ARMS Severity Row usa apenas Percepção

**Severidade:** Média  
**Impacto:** Falhas de Ação severas (A-I, A-J) não elevam a linha de severidade ARMS

**Descrição:**  
`ARMS_SEV_ROW` e `EV_ARMS_SEV_ROW` mapeiam apenas P-B e P-F para linha B. Todos os outros códigos caem em C (default) ou D (P-A). Ações como A-I (ato inseguro extremo) ou objetivos como O-B não têm influência na linha de severidade ARMS.

---

### F-008 — BAIXA: Fixtures de teste cobrem apenas casos de baixo risco

**Severidade:** Baixa  
**Impacto:** Cobertura de teste do motor ERC limitada ao quadrante "seguro"

**Descrição:**  
Os fixtures disponíveis são `TEST-ERC-4-001.json` (ERC 4) e `TEST-ERC-5-001.json` (ERC 5) — ambos casos de baixo risco. Não há fixtures para ERC 1, 2 ou 3 (médio a alto risco). A validação do motor é assimétrica: os casos que mais importam clinicamente não têm cobertura de regressão.

---

## 5. Resumo dos Achados

| ID | Severidade | Componente afetado | Descrição resumida |
|---|---|---|---|
| F-001 | 🔴 CRÍTICO | Motor ↔ UI (ERC) | Escala ERC invertida — motor 1=perigo, UI 5=perigo |
| F-002 | 🔴 CRÍTICO | Dashboard (modal_erc_level) | ERC organizacional sempre nulo — não reflete dados reais |
| F-003 | 🟠 ALTA | Barreira ARMS (dois métodos) | Cálculo de barreira incompatível entre eventos/[id] e risk-profile |
| F-004 | 🟠 ALTA | Score organizacional | Fórmula proprietária sem base metodológica documentada |
| F-005 | 🟠 ALTA | Status de ações (API) | `'open'` não existe no schema — open_total sempre sub-conta |
| F-006 | 🟡 MÉDIA | ISO 31000 (severidade) | Apenas percepção mapeia severidade; objetivo/ação ignorados |
| F-007 | 🟡 MÉDIA | ARMS severity row | Linha de severidade ARMS ignora códigos de objetivo e ação |
| F-008 | 🟢 BAIXA | Fixtures de teste | Cobertura de ERC limitada ao quadrante de baixo risco |

---

## 6. Recomendações Prioritárias

### Imediato (bloquear antes de trial público)

1. **F-005**: Corrigir `openStatuses` para `['pending', 'in_progress']` — bug simples, impacto alto, risco de regressão baixo.

2. **F-001**: Definir formalmente a escala ERC canônica do produto. Duas opções:
   - **Opção A:** Adotar a escala da UI (5=perigo) como canônica — reescrever motor e levels.json para inverter a escala armazenada.
   - **Opção B:** Adotar a escala do motor (1=perigo) como canônica — reescrever a UI para exibir corretamente.
   - Qualquer que seja a escolha, deve ser documentada e aplicada consistentemente. Enquanto houver dois sistemas paralelos, não há como validar a coerência das saídas.

### Curto prazo (antes de expansão do dashboard)

3. **F-004**: Documentar a base metodológica da fórmula de score OU substituir por uma métrica com referência publicada.

4. **F-003**: Unificar o cálculo de barreira ARMS em uma função única, usada por ambas as telas.

5. **F-002**: Implementar o cálculo de `modal_erc_level` na API de inteligência (moda do ERC das análises do tenant).

### Médio prazo (para maturidade metodológica)

6. **F-006 / F-007**: Avaliar se a inclusão de códigos de Objetivo e Ação na severidade é metodologicamente suportada pela referência Daumas (2018) / Hendy (2003). Documentar decisão.

7. **F-008**: Criar fixtures de regressão para ERC 1, 2 e 3.

---

## 7. Limitações desta Auditoria

- Esta auditoria é baseada em leitura de código. Não inclui validação empírica dos resultados contra casos reais de investigação de acidentes.
- As referências citadas no código (Daumas 2018, Hendy 2003, ICAO Doc 9859) não foram consultadas diretamente — a auditoria verifica apenas a coerência interna entre a implementação e o que o código documenta como referência.
- A auditoria não avalia a qualidade das classificações LLM (passos 3/4/5) — foco exclusivo nos mecanismos de risco.
