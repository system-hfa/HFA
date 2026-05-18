# Plano de Implementação Técnica — Escala ERC Canônica (F-001)
**Versão:** v0.7-B  
**Data:** 2026-05-17  
**Fase:** RISK v0.7-B  
**Commit base:** 7d8c717e  
**Decisão de referência:** `RISK_ERC_CANONICAL_DECISION_v0.7.md` — Opção A adotada (ERC 5=crítico, ERC 1=aceitável)  
**Status:** Plano técnico — nenhum código alterado

---

## 1. Resumo Executivo

A decisão formal adota ERC 5=crítico como escala canônica HFA/SERA (Opção A). O motor atual produz ERC 1=perigo — inversão total. Esta inversão é tecnicamente isolada: **a UI já não lê `analyses.erc_level`** (recalcula client-side), portanto não há exposição de erro ao usuário hoje.

O plano recomenda **Opção C — função de conversão pura**, implementada em fases pequenas e reversíveis, sem inversão do motor e sem migration de banco neste ciclo. A razão principal: nenhum código de UI lê `analyses.erc_level` atualmente — a única conexão a fazer é `modal_erc_level` (F-002), que pode ser implementada com uma função de conversão simples. Inversão completa do motor (com impacto em 59 fixtures + baseline) fica para uma fase futura explicitamente solicitada.

**Fases planejadas:**
- **v0.8-A**: Função pura `motorErcToHfaCategory()` + testes unitários isolados
- **v0.8-B**: Conectar F-002 (`modal_erc_level`) usando a função de conversão
- **v0.8-C**: Validar ARMS matrix no risk-profile com dado real
- **v0.8-D**: (Decisão futura) Opção B — nova coluna `hfa_erc_category` no banco, se necessário
- **v0.8-E**: Risk contract checker 10/10 + smoke seletivo

---

## 2. Decisão Formal Adotada

**Opção A:** ERC 5=crítico/ação imediata; ERC 1=aceitável/baixo.  
**Escala:** HFA ERC Category 1–5, categoria visual/operacional derivada do ARMS/ERC (EASA, 2010).  
**Referência:** `RISK_METHODOLOGY_GOVERNANCE_v0.1.md §7.6`, `RISK_ERC_CANONICAL_DECISION_v0.7.md`

---

## 3. Mapa Completo de Impacto

### 3.1 Motor (frontend/src/lib/sera/)

| Arquivo | Função | Escala atual | Valores retornados | Impacto Opção A |
|---|---|---|---|---|
| `pipeline.ts:242` | `inferErcLevel()` | 1=perigo | 1, 2, 3 | Inversão: 1→5, 2→4, 3→3 |
| `all-steps.ts:1288` | `inferDeterministicErcLevel()` | 1=perigo, 5=admin | 1, 2, 3, 4, 5 | Inversão: 1↔5, 2↔4, 3=3 |
| `all-steps.ts:3162` | LLM prompt (descrição ERC) | **Já Opção A** na descrição: "5=latente/irreversível" | LLM input | Calibração: exemplos usam ERC 1 para perigoso — invertir para ERC 4/5 |
| `rules/erc/levels.json` | Definição semântica | 1="Risco imediato, crítico" | Referência | Reescrever: 1="sem impacto", 5="risco crítico" |
| `rules/preconditions/matrix.json` | Regras de precondição | — | **0 regras** filtram por `erc_level` | Sem impacto |
| `rules/preconditions/select.ts:71` | Filtro de regras | Motor scale | Comparação | Sem impacto agora (0 regras usam filtro) |

### 3.2 UI (frontend/src/app/)

| Arquivo | Componente | Escala atual | Lê `analyses.erc_level`? | Impacto |
|---|---|---|---|---|
| `events/[id]/page.tsx` | `computeEventRisk()`, `EV_ARMS_ERC`, `ERC_STYLE` | 5=perigo ✅ | **Nunca** | Nenhum — já correto |
| `events/page.tsx` | `computeErc()`, `ARMS_ERC`, `ERC_BADGE` | 5=perigo ✅ | **Nunca** | Nenhum — já correto |
| `risk-profile/page.tsx` | `ARMSMatrix`, `ARMS_ERC`, `barrierLevel()` | 5=perigo ✅ | via `modal_erc_level` (null) | Nenhum agora; conectar após v0.8-B |

### 3.3 API (frontend/src/app/api/)

| Arquivo | Campo | Estado atual | Impacto |
|---|---|---|---|
| `org/intelligence/route.ts:309` | `modal_erc_level` | `null` (hardcoded — F-002) | Conectar após v0.8-A usando função de conversão |
| `risk-profile/route.ts` | — | Não lê `erc_level` | Nenhum |
| `analyses/risk-profile/route.ts` | — | Não lê `erc_level` | Nenhum |

### 3.4 Dados (testes e banco)

| Artefato | Volume | Escala atual | Impacto Estratégia Recomendada C |
|---|---|---|---|
| Fixtures não-RISK (`tests/sera/fixtures/*.json`) | 59 arquivos, ~59 valores `erc_level` | 1=perigoso: 13×erc1, 28×erc2, 16×erc3, 1×erc4, 1×erc5 | **Nenhum** — fixtures testam o motor; motor não muda |
| Fixtures RISK (`TEST-RISK-ERC-002.json`) | 1 arquivo, erc_level:4 | Motor scale | **Nenhum** — checker valida contrato de risco, não `erc_level` motor |
| Baseline (`tests/reports/baseline/`) | 648 entradas `erc_level` | Motor scale | **Nenhum** — motor não muda |
| DB `analyses.erc_level` | Dados históricos | 1=perigo (motor) | Tratado como `legacy_erc_level` — nunca exibido diretamente na UI |

---

## 4. Separação de Escalas: Três Conceitos

| Nome | Descrição | Onde existe | Valores |
|---|---|---|---|
| `legacy_motor_erc_level` | Valor produzido pelo motor atual (e histórico no banco) | `analyses.erc_level` (DB), `step6_7.erc_level` (pipeline) | 1=perigo; 5=admin/seguro |
| `hfa_erc_category` | Categoria visual HFA 1–5, Opção A — exibida ao usuário | UI today: client-side via `computeEventRisk()` / `computeErc()`. Futuramente: via conversão de `legacy_motor_erc_level` | 1=aceitável; 5=crítico |
| `arms_risk_index` | Índice ARMS canônico (13 valores não-lineares) | **Não existe no sistema atual** — conceito futuro | 1, 2, 4, 10, 20, 21, 50, 100, 101, 102, 500, 502, 2500 |

**`hfa_erc_category` hoje**: não é um campo — é um conceito. Toda UI calcula client-side sem ler o banco.  
**`hfa_erc_category` após v0.8**: será o output da função `motorErcToHfaCategory(legacy_motor_erc_level)`.  
**`arms_risk_index`**: reservado para futura implementação de agregação estatística conforme ARMS WG Report §3.5.

---

## 5. Avaliação das Três Estratégias para `analyses.erc_level`

### 5.1 Estratégia A — Inversão Completa do Motor

**O que é:** Inverter `inferErcLevel()`, `inferDeterministicErcLevel()`, `levels.json`, atualizar fixtures, rebuild baseline, executar DB migration `UPDATE analyses SET erc_level = 6 - erc_level`.

| Aspecto | Avaliação |
|---|---|
| **Prós** | Motor e banco ficam semanticamente corretos. Fixtures documentam a escala canônica. LLM produz valores nativamente corretos. |
| **Contras** | 59 arquivos de fixture precisam ser atualizados. Baseline inteiro precisa ser reconstruído. Calibração do LLM precisa ser atualizada. DB migration em `analyses`. |
| **Risco** | Alto. Mudança em 60+ arquivos aumenta chance de erro. Inversão incompleta (esquecer uma função) cria bug silencioso. |
| **Dados históricos** | DB migration: `6 - erc_level` para todos os registros existentes. |
| **Validação** | Run completo de todos os 59+ fixtures + rebuild de baseline + smoke seletivo. |
| **Estimativa de trabalho** | Alta. Afeta motor + 60+ fixtures + baseline + DB. |

### 5.2 Estratégia B — Nova Coluna `hfa_erc_category`

**O que é:** Manter motor como está, criar migration para nova coluna `hfa_erc_category INT` na tabela `analyses`, populá-la com `6 - erc_level` para dados históricos, salvar converted value em novas análises, UI/API lê a nova coluna.

| Aspecto | Avaliação |
|---|---|
| **Prós** | Motor inalterado. Fixtures inalterados. Separação explícita no schema. Histórico preservado em duas colunas. |
| **Contras** | Requer migration de DB. Motor precisa salvar `hfa_erc_category` em novos registros. Duplicação de dado. |
| **Risco** | Médio. Migration é reversível; risco de inconsistência entre as duas colunas. |
| **Dados históricos** | `hfa_erc_category = 6 - erc_level` via migration. Nenhum dado perdido. |
| **Validação** | Verificar que novas análises salvam `hfa_erc_category` correto. |
| **Estimativa de trabalho** | Média. Migration + 1 salvamento no pipeline + leitura em `org/intelligence`. |

### 5.3 Estratégia C — Função de Conversão Pura (Recomendada)

**O que é:** Adicionar `motorErcToHfaCategory(n: number): number` como função pura isolada. Motor não muda. Fixtures não mudam. Sem migration. Quando `modal_erc_level` for conectado, passa pelo conversor.

| Aspecto | Avaliação |
|---|---|
| **Prós** | Zero mudanças em motor/fixtures/baseline. Zero migration. Isolada e testável unitariamente. Reverte com delete de função. Imediato: habilita F-002 sem nenhuma mudança de DB. |
| **Contras** | Camada de conversão implícita: se código futuro ler `analyses.erc_level` direto (sem conversor), exibirá valor invertido. Requer documentação rigorosa da convenção. |
| **Risco** | Baixo agora. Risco futuro: inconsistência se conversão for esquecida. Mitigado por: 0 código de UI lê `analyses.erc_level` hoje. |
| **Dados históricos** | `analyses.erc_level` permanece em escala legacy. Sem migration. Tratado como opaco para a UI. |
| **Validação** | Teste unitário de `motorErcToHfaCategory()`. Checker 10/10. Smoke seletivo nos 5 níveis ERC. |
| **Estimativa de trabalho** | Baixa. 1 arquivo novo de utilidade + 1 conexão em `org/intelligence` + testes. |

---

## 6. Estratégia Recomendada: Opção C

**Justificativa:**

1. Nenhum código de UI ou API lê `analyses.erc_level` atualmente. A desconexão motor↔UI já existe e está documentada. Corrigi-la de forma invasiva (Opção A) troca um problema documentado por um risco de regressão em 60+ arquivos.

2. O único lugar onde a conversão precisa acontecer agora é `modal_erc_level` em `org/intelligence` (F-002). Uma função pura `motorErcToHfaCategory()` resolve isso de forma limpa e testável.

3. Se no futuro o motor precisar produzir valores na escala HFA para outros consumidores (API pública, novos relatórios, exportação), a Opção B (nova coluna) pode ser implementada incrementalmente como v0.8-D, com a Opção C como stepping stone — a função de conversão já existirá.

4. A inversão completa (Opção A) deve ser planejada explicitamente como fase separada quando houver: (a) necessidade clara de alinhamento total, (b) tempo para atualizar todos os fixtures, (c) decisão documentada sobre LLM calibration, (d) baseline pronto para rebuild.

**Implementação da função de conversão:**

```typescript
// frontend/src/lib/sera/erc-conversion.ts

/**
 * Converte o ERC produzido pelo motor (legado: 1=crítico, 5=mínimo) para a
 * categoria visual HFA (canônica: 5=crítico, 1=mínimo — Opção A, RISK v0.7).
 * NÃO alterar sem decisão formal em RISK_METHODOLOGY_GOVERNANCE_v0.1.md §7.6.
 */
export function motorErcToHfaCategory(motorErc: number): number {
  const map: Record<number, number> = { 1: 5, 2: 4, 3: 3, 4: 2, 5: 1 }
  return map[motorErc] ?? motorErc
}

export function hfaCategoryToMotorErc(hfaCategory: number): number {
  return motorErcToHfaCategory(hfaCategory) // função é seu próprio inverso
}
```

---

## 7. Fases de Implementação

### Fase v0.8-A — Função pura + testes unitários

**Objetivo:** Criar `motorErcToHfaCategory()` com cobertura de teste completa.

**Arquivos:**
- Criar: `frontend/src/lib/sera/erc-conversion.ts`
- Criar: `tests/sera/erc-conversion.test.ts` (ou equivalente)

**Testes obrigatórios:**
```
motorErcToHfaCategory(1) === 5   // crítico no motor → crítico na UI
motorErcToHfaCategory(2) === 4
motorErcToHfaCategory(3) === 3   // 3 é simétrico
motorErcToHfaCategory(4) === 2
motorErcToHfaCategory(5) === 1   // mínimo no motor → mínimo na UI
motorErcToHfaCategory(motorErcToHfaCategory(n)) === n  // auto-inverso
```

**Restrições:** Não alterar nenhum outro arquivo. Não alterar motor.  
**Validação:** `npx tsc --noEmit` + teste unitário da função.

---

### Fase v0.8-B — Conectar F-002 (`modal_erc_level`)

**Objetivo:** Substituir `modal_erc_level: null` por valor real calculado a partir de `analyses.erc_level` com conversão.

**Arquivo:** `frontend/src/app/api/org/intelligence/route.ts`

**Lógica:**
```typescript
import { motorErcToHfaCategory } from '@/lib/sera/erc-conversion'

// Na query, adicionar erc_level ao select:
.select('... perception_code, objective_code, action_code, erc_level ...')

// Calcular o modal ERC da organização (valor mais frequente):
const ercValues = analysesData
  .map(a => a.erc_level)
  .filter((v): v is number => typeof v === 'number')
const modalMotorErc = ercValues.length > 0 ? modeOf(ercValues) : null
const modal_erc_level = modalMotorErc !== null
  ? motorErcToHfaCategory(modalMotorErc)
  : null

// Retornar:
modal_erc_level,  // agora é hfa_erc_category (1–5, 5=crítico)
```

**Nota sobre `modeOf()`:** Usar frequência dos valores; em caso de empate, retornar o valor mais alto (mais crítico).

**Restrições:** Não alterar motor. Não alterar fixtures. Não alterar schema.  
**Validação:** `tsc --noEmit` + checker 10/10 + verificar que `modal_erc_level` não é mais null em org com análises.

---

### Fase v0.8-C — Validar ARMS matrix com dado real

**Objetivo:** Verificar que a matriz ARMS no risk-profile usa o `modal_erc_level` real após v0.8-B, e que a exibição está correta (ERC 5 → barreira col.1 "não efetiva").

**Arquivo:** `frontend/src/app/(dashboard)/risk-profile/page.tsx`

**O que verificar manualmente:**
- Org com análises → `modal_erc_level` não é mais null → `SeraReasoningPanel` deve mostrar "Calculado a partir de X análises" em vez de "Estimada pelo score HFA"
- A coluna de barreira da matriz ARMS deve corresponder ao nível correto (ERC 5 → barrier col.1 = não efetiva)
- Sem regressão na matriz tradicional

**Não alterar:** Nenhum código de cálculo. Apenas verificação manual/visual.

---

### Fase v0.8-D — (Opcional, decisão futura) Nova coluna `hfa_erc_category`

**Objetivo:** Se necessário para novos consumidores (exportação, API pública, relatórios), adicionar coluna explícita no banco.

**Não fazer antes de:** identificar necessidade concreta de leitura direta do banco para `hfa_erc_category`.

**O que seria necessário:**
- Migration: `ALTER TABLE analyses ADD COLUMN hfa_erc_category INTEGER;`
- Migration: `UPDATE analyses SET hfa_erc_category = 6 - erc_level WHERE erc_level IS NOT NULL;`
- Pipeline update: ao salvar análise, calcular e persistir `hfa_erc_category`
- Atualizar leituras de `analyses.erc_level` para usar `hfa_erc_category`

**Restrições desta fase:** Não fazer em v0.8. Planejar separadamente quando necessário.

---

### Fase v0.8-E — Validação e fechamento

**Objetivo:** Confirmar que F-001 (conversão) e F-002 (modal_erc_level) estão resolvidos.

**Checks obrigatórios:**
```bash
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict   # 10/10 OK
cd frontend && npx tsc --noEmit                                    # 0 erros
git diff --name-only HEAD -- frontend/src/lib/sera/pipeline.ts frontend/src/lib/sera/all-steps.ts tests/sera/fixtures
# deve retornar vazio (motor e fixtures inalterados)
```

**Smoke seletivo** (se disponível):
```bash
npx tsx tests/sera/run.ts --group erc    # grupo erc específico
```

**Não rodar:** smoke global.

---

## 8. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Código futuro lê `analyses.erc_level` sem conversor | Médio | Alto — exibe ERC invertido | Adicionar tipo `LegacyMotorErc` em TypeScript; convenção de nome `motorErc` em variáveis que leem o campo raw |
| `modal_erc_level` calculado incorretamente (moda errada) | Baixo | Médio | Teste com org de dados reais antes do deploy |
| `motorErcToHfaCategory()` importado em contexto errado | Baixo | Baixo | Teste auto-inverso garante integridade |
| Inversão do motor feita sem este plano em contexto | Médio | Alto — conflito com v0.8-A/B | Registrar F-001-STATUS em CLAUDE.md ou governance |
| Precondition rules futuras adicionam filtro `erc_level` | Baixo | Médio — filtro usaria escala errada | Decisão: precondition rules devem usar `hfa_erc_category`, não `legacy_motor_erc_level` |

---

## 9. Critérios de Rollback

A implementação de cada fase é reversível independentemente:

**v0.8-A rollback:** Delete `erc-conversion.ts` e seu teste. Zero impacto em produção (ainda não usado).

**v0.8-B rollback:** Reverter `org/intelligence/route.ts` para `modal_erc_level: null`. Sem impacto em UI (risk-profile já lida com null via `barrierLevel(score)`).

**v0.8-C rollback:** N/A — é verificação, não mudança de código.

**v0.8-D rollback:** Reverter migration (`DROP COLUMN hfa_erc_category`). Sem perda de dados (`erc_level` original preservado).

---

## 10. O que NÃO Fazer

- **Não inverter o motor nesta fase** (`inferErcLevel`, `inferDeterministicErcLevel`). Isso requer: atualização de 59 fixtures + rebuild de baseline + revisão da calibração do LLM + decisão explícita.
- **Não conectar `modal_erc_level` sem usar `motorErcToHfaCategory()`**. Conectar diretamente causaria inversão: ERC motor=1 (perigo) → UI ERC=1 (aceitável) = errado.
- **Não alterar `levels.json` sem inverter o motor simultaneamente**. Os dois devem ser alterados na mesma fase.
- **Não criar fixtures ERC v0.8 ainda**. Os fixtures da decisão v0.7 já cobrem os 5 casos conceituais — criar fixtures executáveis requer motor atualizado (v0.8-A ou futura inversão).
- **Não misturar F-001 com lançamento de trial ou novas features de produto.**
- **Não rodar smoke global** como validação de risco. O smoke global testa o motor P/O/A, não a escala ERC de display.
- **Não usar `hfa_erc_category` como nome de variável em código que ainda usa o motor legado.** Nomear claramente como `motorErc` ou `legacyErc` até a conversão ser aplicada.

---

## 11. Testes Obrigatórios por Fase

### v0.8-A (função de conversão)

```typescript
// erc-conversion.test.ts
describe('motorErcToHfaCategory', () => {
  it('converte 1 (motor crítico) para 5 (UI crítico)', () => expect(motorErcToHfaCategory(1)).toBe(5))
  it('converte 2 para 4', () => expect(motorErcToHfaCategory(2)).toBe(4))
  it('3 permanece 3 (simétrico)', () => expect(motorErcToHfaCategory(3)).toBe(3))
  it('converte 4 para 2', () => expect(motorErcToHfaCategory(4)).toBe(2))
  it('converte 5 (motor mínimo) para 1 (UI mínimo)', () => expect(motorErcToHfaCategory(5)).toBe(1))
  it('é auto-inverso', () => {
    for (let n = 1; n <= 5; n++) {
      expect(motorErcToHfaCategory(motorErcToHfaCategory(n))).toBe(n)
    }
  })
})
```

### v0.8-B (conexão F-002)

- `GET /api/org/intelligence` com org que tem análises: `modal_erc_level` não deve ser null
- Valor retornado deve ser 1–5 na escala HFA (5=crítico)
- Org sem análises: `modal_erc_level` = null (mantido)
- `tsc --noEmit` sem erros

### v0.8-E (validação final)

```bash
npx tsx tests/sera/analyze-risk-validation-contract.ts --strict
# Expected: 10/10 OK, WARN 0, FAIL 0, exit 0

git diff --name-only HEAD -- frontend/src/lib/sera/ tests/sera/fixtures/ tests/reports/baseline/
# Expected: (vazio)
```

---

## 12. Referências

| Documento | Seção relevante |
|---|---|
| `RISK_ERC_CANONICAL_DECISION_v0.7.md` | Decisão formal, plano de implementação conceitual |
| `RISK_METHODOLOGY_GOVERNANCE_v0.1.md §7.6` | Decisão formal registrada |
| `RISK_IMPLEMENTATION_AUDIT_v0.5.md §4.1` | F-001 como implementação pendente |
| `RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md §7` | Componentes que requerem mudança vs corretos |
| `frontend/src/lib/sera/pipeline.ts:242` | `inferErcLevel()` — escala motor atual |
| `frontend/src/lib/sera/all-steps.ts:1288` | `inferDeterministicErcLevel()` — escala motor atual |
| `frontend/src/lib/sera/rules/erc/levels.json` | Definição semântica dos níveis (invertida) |
| `frontend/src/app/api/org/intelligence/route.ts:309` | `modal_erc_level: null` — F-002 |
