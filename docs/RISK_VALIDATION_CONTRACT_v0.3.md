# Contrato de Validação de Risco — HFA/SERA
**Versão:** v0.3  
**Data:** 2026-05-17  
**Fase:** RISK v0.3-C  
**Status:** Ativo — vigente para fases RISK v0.3 e posteriores até revisão formal  

---

## 1. Objetivo dos fixtures de risco

Os fixtures `TEST-RISK-*` existem para validar a **camada de risco** do HFA/SERA — não para revalidar o motor causal SERA (percepção/objetivo/ação/precondições).

O motor causal SERA já foi validado e baselineado:
- **v0.1.1**: smoke global 162/162 PASS — baseline oficial promovido
- **v0.1.2**: fixtures adicionais de robustez metodológica

Os fixtures TEST-RISK-* documentam e validam:
- O modelo ARMS/ERC aplicado a eventos individuais históricos
- O modelo ISO/ICAO aplicado ao perfil organizacional
- A distinção entre ERC de evento isolado e SIRA de Safety Issue ou mudança operacional
- Os limites da matriz tradicional probabilidade × severidade
- Os anti-padrões metodológicos de risco mais comuns

---

## 2. Diferença entre validação SERA e validação de risco

| Dimensão | Validação SERA (motor causal) | Validação de risco |
|---|---|---|
| **Objeto** | Classificação P/O/A de um relato | ERC, ARMS index, categorias, barreiras |
| **Runner atual** | `tests/sera/run.ts` — compara P/O/A/ERC_level | Não existe ainda — futura tarefa |
| **Critério de sucesso** | PASS/PARTIAL/FAIL por comparação de códigos | Contrato de risco (este documento) |
| **Divergência P-G vs P-A** | Relevante — mede acurácia do motor | Irrelevante se não muda o ERC |
| **Divergência A-C vs A-B** | Relevante — mede granularidade | Irrelevante para a maioria dos fixtures |
| **ERC incorreto** | Parcialmente capturado pelo runner | **Bloqueante de risco** |
| **Probabilidade afirmada** | Fora do escopo do motor causal | **Bloqueante de risco** |

**Princípio central**: O status PASS/PARTIAL/FAIL do runner SERA atual **não é critério final de sucesso da camada de risco**. Um fixture pode ser PARTIAL no runner e ainda assim validar corretamente o modelo de risco. Um fixture pode ser PASS no runner e ainda assim conter um erro metodológico de risco.

---

## 3. Campos obrigatórios de `risk_expected`

Cada fixture TEST-RISK-* deve conter um campo `risk_expected` (aceito pelo schema por ser campo extra ignorado pelo runner) com os seguintes subcampos:

| Campo | Tipo | Descrição |
|---|---|---|
| `event_type` | `"historical_event"` \| `"safety_issue"` \| `"future_change"` | Natureza do objeto de avaliação |
| `arms_applicable` | `boolean` | Se ARMS/ERC é o instrumento correto para este objeto |
| `sira_applicable` | `boolean` | Se SIRA é aplicável (evento qualifica Safety Issue ou mudança operacional) |
| `traditional_matrix_applicable` | `"agreed"` \| `"limited"` \| `"not_applicable"` | Aplicabilidade da matriz probabilidade × severidade |
| `most_credible_accident_outcome` | `string` | Desfecho mais crível se o evento tivesse escalado (Q1 do ERC) |
| `remaining_barrier_effectiveness` | `"effective"` \| `"limited"` \| `"minimal"` \| `"not_effective"` | Efetividade das barreiras remanescentes (Q2 do ERC) |
| `arms_risk_index_range` | `string` | Faixa de índice ARMS esperada (1–2500) |
| `arms_color` | `"GREEN"` \| `"YELLOW"` \| `"RED"` | Cor ARMS esperada |
| `hfa_visual_category` | `string` | Categoria visual HFA pós-normalização Opção A |
| `probability_claim_allowed` | `boolean` | Se é metodologicamente correto afirmar probabilidade de recorrência |
| `probability_limitation_note` | `string` | Explicação do limite probabilístico aplicável |
| `risk_profile_use` | `"allowed"` \| `"limited"` \| `"not_allowed"` | Se o evento deve entrar no cálculo de risk profile organizacional |
| `anti_pattern` | `string` | Erro metodológico de risco que este fixture documenta |

Campos opcionais adicionais:
- `sira_note`: orientação específica de SIRA se `sira_applicable: true`
- `focal_event_for_risk`: delimitação do escopo do evento (em `sera_context`)
- `focal_actor`: ator focal para classificação causal (em `sera_context`)

---

## 4. Critérios de sucesso da camada de risco

O runner atual NÃO valida `risk_expected`. Enquanto um runner de risco não for implementado, os critérios de sucesso são verificados manualmente por revisão do fixture e comparação com ARMS WG 2010.

**Um fixture de risco é bem-sucedido quando:**

1. `most_credible_accident_outcome` identifica corretamente o desfecho mais crível (Q1 ARMS)
2. `remaining_barrier_effectiveness` reflete corretamente as barreiras remanescentes (Q2 ARMS)
3. `arms_risk_index_range` é consistente com Q1 × Q2 na matriz 4×4 ARMS
4. `probability_claim_allowed` está correto (false para todos os eventos históricos individuais)
5. `sira_applicable` está correto (true apenas quando há evidência de padrão ou mudança operacional)
6. `traditional_matrix_applicable` está correto (not_applicable para falhas novel sem histórico)
7. O `anti_pattern` documenta um erro metodológico real e não trivial

---

## 5. O que o runner atual valida e o que ainda não valida

### Valida (runner `tests/sera/run.ts`)
- Códigos P/O/A produzidos pelo motor causal SERA
- Nível ERC inferido pelo motor (`erc_level` em `expected`)
- Estabilidade determinística (variância entre runs)
- Precondições (recall parcial)

### Não valida (runner futuro de risco)
- `risk_expected.most_credible_accident_outcome` vs output do motor
- `risk_expected.remaining_barrier_effectiveness` vs output do motor
- `risk_expected.arms_risk_index_range` vs `computeEventRisk()` output
- `risk_expected.probability_claim_allowed` — verificação de que o sistema não afirma probabilidade
- `risk_expected.risk_profile_use` — verificação de que eventos isolados não influenciam indevidamente o perfil

A criação de um runner de risco específico é tarefa da fase RISK v0.4+.

---

## 6. Critérios bloqueantes reais para a camada de risco

Os critérios abaixo são bloqueantes para uso em produção. **São independentes dos códigos P/O/A.**

### 6.1 ARMS/ERC usa probabilidade de recorrência em evento individual
**Bloqueante.** O ERC mede risco do evento específico naquele dia — não probabilidade de que evento similar ocorra novamente. Se qualquer componente do sistema afirmar "a probabilidade de este tipo de evento ocorrer é X%" como parte da classificação ERC, está incorreto.

**Onde verificar:** output de `computeEventRisk()`, labels de urgência na UI, textos explicativos do ERC em `/events/[id]`.

### 6.2 Matriz tradicional afirma probabilidade real sem base
**Bloqueante.** A matriz ISO/ICAO no risk profile usa `barrierLevel(score)` para aproximar a dimensão de frequência, mas não pode afirmar probabilidade absoluta. Se a UI exibir "probabilidade: 35%" ou equivalente baseado em score 0–100, está incorreto.

### 6.3 UI trata categoria visual como ARMS canônico
**Bloqueante pós-Opção A.** A escala HFA 1–5 é uma simplificação legítima do índice ARMS 1–2500 (13 valores). Não pode ser apresentada como "ARMS ERC" padrão sem nota explicativa de que é uma adaptação. Antes da implementação da Opção A, a inversão motor vs UI (F-001) é um bloqueante adicional.

### 6.4 Risk profile faz afirmação consolidada com amostra pequena
**Bloqueante.** Com n < 30 eventos, o perfil organizacional não tem validade estatística para afirmar "sua organização tem risco elevado". A UI deve exibir aviso de amostra insuficiente abaixo de um limiar a definir.

### 6.5 Evento isolado tratado como Safety Issue sem evidência de padrão
**Bloqueante.** Eventos com `risk_expected.sira_applicable: false` não devem acionar SIRA automaticamente apenas por terem ERC alto. ERC alto de evento isolado indica urgência de investigação — não necessariamente Safety Issue sistêmica.

### 6.6 Safety Issue recorrente tratada como evento isolado
**Bloqueante.** Se um padrão de eventos similares (como 4 ocorrências em 3 meses) for identificado na base de dados, o sistema deve sinalizar que SIRA é recomendado — não tratar cada ocorrência como evento isolado independente.

---

## 7. Critérios NÃO bloqueantes para a camada de risco

As divergências abaixo, quando identificadas pelo runner SERA, não são bloqueantes para a camada de risco:

| Divergência | Por que não é bloqueante de risco |
|---|---|
| P-A vs P-G | Ambos indicam ausência de falha perceptiva primária. Não afetam Q1 ou Q2 do ERC. |
| P-B vs P-E | P-E (timing) é subcategoria válida de P-B. Ambos indicam percepção comprometida. |
| A-B vs A-C | Omissão de passo vs não-verificação de resultado — mesmo lapso de ângulos distintos. |
| A-D vs A-G | A-D captura a causa (limitação física); A-G captura a resposta (ação urgente). Ambos reais. |
| A-C vs A-F | Não-confirmação de resultado vs seleção errada entre alternativas — defensáveis. |
| P-A vs P-B (se ERC não muda) | Se o ERC computado pelo motor não muda com a variação P-A/P-B, não é bloqueante de risco. |

**Quando P/O/A PASSA a ser bloqueante de risco:** se a variação no código P/O/A produz sistematicamente um ERC errado (ex.: sempre ERC 3 para cenários que deveriam ser ERC 1). Nesse caso, o problema não é o código P/O/A — é o algoritmo de inferência ERC que deve ser investigado.

---

## 8. `sera_context` — separação formal entre causa e risco

Cada fixture TEST-RISK-* deve conter um campo `sera_context` com:

```json
{
  "sera_context": {
    "focal_actor": "ator principal da classificação causal",
    "focal_event_for_risk": "o evento cujo risco está sendo avaliado",
    "sera_expected_frozen": {
      "perception_code": "P-X",
      "objective_code": "O-X",
      "action_code": "A-X"
    },
    "acceptable_sera_variants": ["P-A/O-A/A-B", "P-G/O-A/A-B"],
    "risk_scope_note": "explicação de por que divergências P/O/A não afetam a camada de risco"
  }
}
```

`sera_expected_frozen` documenta a classificação causal SERA que o autor considera mais precisa metodologicamente. `acceptable_sera_variants` documenta outras classificações defensáveis que NÃO invalidam a análise de risco.

---

## 9. Backlog de motor causal (fora do escopo RISK v0.3-C)

Os seguintes problemas do motor causal SERA foram identificados como observações, não como bloqueantes de risco. Devem ser endereçados em fase específica de motor causal (fora de RISK):

| ID | Problema | Fixtures afetados |
|---|---|---|
| MOTOR-001 | Gate O-C dispara sobre ações de terceiros no relato (não apenas do protagonista) | DUAL-002 |
| MOTOR-002 | O-B não detectado sem trigger lexical explícito de "hábito" ou "padrão normalizado" | ERC-004 |
| MOTOR-003 | Gate P-B requer evidência lexical explícita; percepção comprometida por fadiga ou falha de equipamento classificada como P-G ou P-A | ERC-003, ERC-004, ERC-005, DUAL-001, DUAL-002, ISO-001, SIRA-002 |
| MOTOR-004 | A-G (ação urgente) raramente classificado; A-A ou A-D tomam precedência | ERC-005, DUAL-001, SIRA-002 |

Esses problemas **não são bloqueantes para RISK v0.3-C**. São observações que informam o roadmap de evolução do motor causal.

---

## 10. Plano futuro para runner risk-specific

A validação automatizada da camada de risco requer um runner dedicado que:

1. Execute o pipeline SERA em cada fixture
2. Extraia `computeEventRisk()` output (ARMS index, cor, label)
3. Compare com `risk_expected.arms_risk_index_range` e `arms_color`
4. Valide `probability_claim_allowed` — verifique que o sistema não afirma probabilidade onde não é permitido
5. Valide `traditional_matrix_applicable` — verifique que `not_applicable` não produz output de matriz na UI
6. Reporte PASS/PARTIAL/FAIL específico para a camada de risco

Critério de PASS para o runner de risco:
- `arms_color` correto: PASS
- `arms_risk_index_range` dentro da faixa: PASS
- `remaining_barrier_effectiveness` consistente com ERC computado: PASS
- Nenhuma afirmação de probabilidade onde `probability_claim_allowed: false`: PASS

Este runner é tarefa da fase RISK v0.4+.
