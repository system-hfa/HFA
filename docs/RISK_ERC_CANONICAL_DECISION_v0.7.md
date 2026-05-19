# Decisão Canônica da Escala ERC — HFA/SERA
**Versão:** v0.7  
**Data:** 2026-05-17  
**Fase:** RISK v0.7  
**Commit base:** b2bfadeb  
**Decidido por:** Filipe Daumas  
**Status:** Decisão registrada — código NÃO alterado. Plano técnico detalhado em `RISK_ERC_IMPLEMENTATION_PLAN_v0.7-B.md`.

---

## 1. Decisão

**Opção A adotada: ERC 5 = crítico / ação imediata (escala crescente)**

| Nível | Significado | Cor | Ação |
|---|---|---|---|
| ERC 5 | Crítico — ação imediata obrigatória | Vermelho | Paralisar/investigar imediatamente |
| ERC 4 | Alto — risco elevado | Laranja | Urgente — ação em 24–48h |
| ERC 3 | Relevante — risco moderado | Amarelo | Ação corretiva requerida |
| ERC 2 | Baixo — monitorar | Cinza | Sem ação imediata; incorporar ao monitoramento |
| ERC 1 | Aceitável | Verde | Sem ação necessária |

**Natureza da escala:** Categoria visual/operacional derivada do ARMS/ERC (EASA, 2010). Não é o índice ARMS Risk canônico (valores: 1, 2, 4, 10, 20, 21, 50, 100, 101, 102, 500, 502, 2500). É uma adaptação ordinal intencional e documentada.

---

## 2. Justificativa Científica

### 2.1 Alinhamento com o padrão ARMS

O índice de risco ARMS (ARMS WG Report v4.1, 2010, seção 3.3) produz valores numéricos onde:
- **1** = menor risco ("sem potencial de acidente", célula D)
- **2500** = maior risco ("catástrofe sem barreiras", célula A×4)

A direção "número maior = maior risco" é intrínseca ao design ARMS — os valores são baseados em dados reais de acidentes, com proporção 1:5:25 entre classes de perda (seção 6.8). A escala HFA 1–5 segue esta mesma direção.

### 2.2 Por que não a Opção B (ERC 1 = perigo)

A Opção B (motor atual) é contraintuitiva e não alinhada com o padrão ARMS:
- No índice ARMS, ERC 1 é o MENOR risco — adotar ERC 1=perigo seria semanticamente oposto ao padrão.
- A lookup table ARMS (A1=5, D4=1) já implementa a Opção A — inverter a UI seria inverter tabelas que estão corretas.
- "Número menor = mais perigoso" contradiz a convenção de escalas de risco em SMS/ICAO.

### 2.3 Adaptação 1–5 vs índice 1–2500

O HFA usa escala ordinal 1–5 em vez dos 13 valores não-lineares do ARMS. Isso é uma adaptação legítima para sistemas de menor volume, conforme ARMS WG Report seção 5.3. As perdas de capacidade são:
- Impossibilidade de distinguir células dentro da mesma cor (ex: células com índice 21 vs 101 ambas = ERC 3)
- Soma ordinal em vez de proporcional para estatísticas agregadas

A adaptação é documentada como desvio formal em `RISK_ERC_SCIENTIFIC_REVIEW_v0.2.md §6.3`.

---

## 3. Estado Atual do Sistema

| Componente | Escala atual | Status vs Opção A |
|---|---|---|
| Motor: `pipeline.ts` `inferErcLevel()` | ERC 1=perigo (invertido) | ❌ Requer inversão |
| Motor: `all-steps.ts` `inferDeterministicErcLevel()` | ERC 1=perigo (invertido) | ❌ Requer inversão |
| Motor: `rules/erc/levels.json` | ERC 1=perigo (invertido) | ❌ Requer reescrita |
| DB: `analyses.erc_level` | Escala invertida (legacy) | ❌ Requer migration |
| UI: `EV_ARMS_ERC` lookup table | ERC 5=perigo ✅ | ✅ Correto — não alterar |
| UI: `ARMS_ERC` lookup table | ERC 5=perigo ✅ | ✅ Correto — não alterar |
| UI: `ERC_STYLE` | ERC 5=vermelho ✅ | ✅ Correto — não alterar |
| UI: `ercLabels` | ERC 5="Ação imediata" ✅ | ✅ Correto — não alterar |
| UI: `computeEventRisk()` | Recalcula independente do motor | ✅ Protege tela atual |
| API: `modal_erc_level` | `null` (hardcoded) | 🔒 Bloqueado até F-001 implementado |

**Proteção atual:** A UI recalcula o ERC client-side via `computeEventRisk()` sem ler `analyses.erc_level`. Isso significa que a inversão de escala do motor não afeta a tela atual. O risco de exposição ao usuário é zero enquanto essa separação for mantida.

---

## 4. O que NÃO é Escopo desta Decisão

- Alteração de código (zero linhas de código alteradas nesta fase)
- Inversão do motor (planejada para RISK v0.8)
- Migration de dados históricos (planejada para RISK v0.8)
- Conexão de `modal_erc_level` a dados reais (planejada após F-001 implementado)
- Alteração de fixtures, baseline ou runner
- Detecção de Safety Issues / SIRA (escopo separado, planejado para RISK v0.9)
- Correção da fórmula de score organizacional (F-004, escopo separado)
- Correção da linha D da lookup table (desvio menor, prioridade baixa)

---

## 5. Plano de Implementação — RISK v0.8

### 5.1 Pré-requisitos (todos devem ser cumpridos antes de alterar código)

- [x] Decisão formal registrada (`RISK_METHODOLOGY_GOVERNANCE_v0.1.md §7.6`) ← **concluído nesta fase**
- [ ] Fixtures ERC 1, 2, 3, 4, 5 criados (mínimo 1 relato representativo por nível)
- [ ] Validação smoke com motor ATUAL para documentar estado pré-inversão (baseline ERC)
- [ ] Política de migração explícita decidida para `analyses.erc_level` histórico

### 5.2 Sequência de implementação

1. **Criar fixtures ERC 1–5** — relatos representativos para cada nível na escala Opção A
2. **Validação pré-implementação** — rodar fixtures com motor atual; registrar como `baseline_erc_pre_inversion.json`
3. **Inverter `inferErcLevel()`** — em `pipeline.ts`: substituir `return 1` por `return 5`, `return 2` por `return 4`, etc.
4. **Inverter `inferDeterministicErcLevel()`** — mesmo padrão em `all-steps.ts`
5. **Reescrever `levels.json`** — atualizar semântica: nível 1 = "sem potencial de acidente", nível 5 = "risco catastrófico"
6. **Validação pós-implementação** — rodar fixtures com motor invertido; confirmar concordância motor × UI
7. **Decidir e executar migration** — opções: recalcular (recomendado), renomear para `legacy_erc_level`, ou manter com flag
8. **Conectar F-002** — substituir `modal_erc_level: null` por dado real de `analyses.erc_level` (pós-migration)
9. **Deploy** — somente após passos 1–8 concluídos e checker 10/10 OK

### 5.3 Regra de não mistura

A inversão do motor **não deve ser combinada** com lançamento de trial, novas features de produto ou outras correções metodológicas (ex: F-004, linha D). Cada mudança deve ser um commit/fase isolado.

---

## 6. Testes Necessários

### 6.1 Fixtures ERC por nível (a criar em RISK v0.8)

| Fixture | Relato representativo | ERC esperado pós-inversão |
|---|---|---|
| TEST-ERC-LEVEL-1 | Evento sem falhas SERA (P-A/O-A/A-A) — sem potencial de acidente | ERC 1 (aceitável) |
| TEST-ERC-LEVEL-2 | Evento com 1 falha menor (P-A/O-A/A-B) — potencial baixo | ERC 2 (monitorar) |
| TEST-ERC-LEVEL-3 | Evento com falha moderada (P-B/O-A/A-C) — barreiras limitadas | ERC 3 (ação corretiva) |
| TEST-ERC-LEVEL-4 | Evento com 2 falhas graves (P-B/O-B/A-D) — barreiras mínimas | ERC 4 (urgente) |
| TEST-ERC-LEVEL-5 | Evento com 3 falhas graves (P-B/O-B/A-G) — sem barreiras efetivas | ERC 5 (ação imediata) |

### 6.2 Testes de concordância motor × UI

Após a inversão, para cada fixture ERC 1–5:
- Motor (`inferErcLevel`) deve retornar o mesmo nível que `computeEventRisk()` na UI
- `analyses.erc_level` pós-migration deve mapear para a mesma cor na UI
- ERC 5 sempre deve exibir vermelho; ERC 1 sempre deve exibir verde

### 6.3 Testes de regressão

- Checker de risco (10/10 OK) deve continuar passando com motor invertido
- Fixtures TEST-RISK-ERC-001 a TEST-RISK-ERC-005 não devem mudar de resultado (são baseados em relatos factuais, não em `analyses.erc_level`)

---

## 7. Nota sobre fixtures SERA e ambiguidade de escala

O runner SERA (`tests/sera/runner.ts`) compara `result.erc_level` com `fixture.expected.erc_level` diretamente, sem conversão. Portanto, **`expected.erc_level` nas fixtures usa a escala legacy do motor** (1 = crítico, 5 = mínimo), não a escala visual HFA (Opção A).

Enquanto a inversão do motor (seção 5.2) não for implementada, qualquer fixture que esperasse o acidente crítico como `erc_level: 1` está correta funcionalmente — mas pode ser mal interpretada por um leitor humano que veja "ERC 1 = Aceitável" na UI.

**Regra de escrita para fixtures e documentação do motor:**
- Escrever `erc_level = 1 (motor legacy = crítico)` quando documentar o valor crítico no motor.
- Nunca escrever apenas "ERC 1" em documentos que misturem contexto motor e UI.
- A UI sempre exibirá o valor convertido: motor `1` → HFA ERC `5` (crítico/vermelho).

Esta ambiguidade será eliminada quando a inversão do motor for implementada em RISK v0.8 (seção 5.2), após o que motor e UI usarão a mesma direção (5 = crítico).

---

## 8. Referências

| Documento | Relevância |
|---|---|
| `RISK_ERC_SCIENTIFIC_REVIEW_v0.2.md §6.4` | Análise F-001 vs padrão ARMS |
| `RISK_MATRIX_DUAL_MODEL_DECISION_v0.2.md §6` | Avaliação técnica das opções |
| `RISK_METHODOLOGY_GOVERNANCE_v0.1.md §7` | Processo de decisão e registro formal |
| `RISK_IMPLEMENTATION_AUDIT_v0.5.md §4.1` | Estado da inversão pré-decisão |
| `RISK_ERC_IMPLEMENTATION_PLAN_v0.7-B.md` | **Plano técnico detalhado** — fases v0.8-A/B/C/D/E, função de conversão, estratégia recomendada |
| ARMS WG Report v4.1 (2010), seção 3.3 | Índice ERC canônico e direção da escala |
| ARMS WG Report v4.1 (2010), seção 5.3 | Permissão de adaptação para organizações menores |
