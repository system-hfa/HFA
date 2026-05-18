# RISK Validation Fixtures — v0.3-C

**Data:** 2026-05-17 (criado) / 2026-05-17 (atualizado v0.3-C)  
**Fase:** RISK v0.3-C  
**Branch:** main  
**Escopo:** Fixtures de validação do modelo dual de risco (ARMS/ERC × ISO/ICAO) — sem alteração de motor, UI, baseline ou schema  

> **NOTA v0.3-C**: Esta versão do documento corrige a premissa de validação da versão original (v0.3). O runner SERA PASS/PARTIAL/FAIL não é o critério de sucesso da camada de risco. Ver contrato em `docs/RISK_VALIDATION_CONTRACT_v0.3.md`.

---

## 1. Objetivo

Este documento registra os 10 fixtures criados para validar o modelo dual de risco conforme especificado em `docs/RISK_VALIDATION_PLAN_v0.2.md`. Os fixtures cobrem:

- **ERC anchors** (ERC-001 a ERC-005): um fixture por nível de risco ERC 5→1, ancorando o comportamento esperado em cada extremo da escala
- **Dual model** (DUAL-001, DUAL-002): cenários que demonstram a distinção entre resultado factual e risco potencial (ERC ≠ resultado do evento)
- **ISO boundary** (ISO-001): evento com modo de falha novel — demonstra por que a matriz tradicional falha quando não há dados de frequência
- **SIRA distinction** (SIRA-001, SIRA-002): eventos onde o ERC individual é baixo/médio mas o padrão recorrente ou a mudança operacional requer SIRA prospectivo

**Objetivo de validação:** cada fixture valida a **camada de risco** — ARMS/ERC, matriz ISO/ICAO, distinção evento vs Safety Issue, limites da matriz tradicional. Os fixtures não são usados para revalidar o motor causal SERA (P/O/A).

**Critério de sucesso:** definido no contrato `docs/RISK_VALIDATION_CONTRACT_v0.3.md`. O status PASS/PARTIAL/FAIL do runner SERA é uma observação sobre o motor causal — não determina o sucesso da validação de risco.

---

## 2. Fixtures criados

| ID | Título curto | Categoria | sera_expected_frozen | ERC (motor scale) | ARMS index | ARMS color |
|---|---|---|---|---|---|---|
| TEST-RISK-ERC-001 | Erro de unidade em formulário de combustível | ERC anchor 5 | P-A/O-A/A-A | 5 | 1 (linha D) | GREEN |
| TEST-RISK-ERC-002 | Omissão de lacre detectada antes da liberação | ERC anchor 4 | P-A/O-A/A-B | 4 | 2–4 (C4/C3) | GREEN |
| TEST-RISK-ERC-003 | Comandante não confirma referência altimétrica em IMC | ERC anchor 3 | P-B/O-A/A-C | 3 | 4–20 (C3/C2) | YELLOW |
| TEST-RISK-ERC-004 | Aproximação instabilizada contra call-out — dano estrutural | ERC anchor 2 | P-B/O-B/A-D | 2 | 100–500 (C1/B1) | RED |
| TEST-RISK-ERC-005 | Quase colisão VFR sem barreiras instrumentadas | ERC anchor 1 | P-B/O-A/A-G | 1 | 502–2500 (A1/A2) | RED |
| TEST-RISK-DUAL-001 | Incursão de pista sem colisão por acaso | Dual model | P-B/O-A/A-G | 1 | 2500 (A1) | RED |
| TEST-RISK-DUAL-002 | Fratura por turbulência — ERC por barreiras, não por frequência | Dual model | P-B/O-A/A-C | 3 | 4–20 (C3/C2) | YELLOW |
| TEST-RISK-ISO-001 | Falha novel de aileron — ERC determinístico, matriz falha | ISO boundary | P-B/O-A/A-C | 2 | 10–101 (A4/B2) | YELLOW–RED |
| TEST-RISK-SIRA-001 | ATIS não atualizado — ERC 4 isolado, padrão = Safety Issue | SIRA distinction | P-A/O-A/A-B | 4 | 2–10 (C4/B4) | GREEN–YELLOW |
| TEST-RISK-SIRA-002 | Fadiga por mudança de política sem SIRA — ERC vs MoC | SIRA distinction | P-B/O-A/A-G | 2 | 10–100 (A4/B1) | YELLOW–RED |

**Escala ERC (motor — `levels.json`):** 1 = risco imediato crítico, 5 = risco mínimo administrativo.  
**Escala ERC (UI pós-Opção A):** invertida — UI ERC 5 = mais perigoso. Ver `future_expected.ui_erc_post_normalizacao` em cada fixture.

---

## 3. Estrutura de cada fixture (v0.3-C)

Além dos campos padrão do runner (`id`, `title`, `domain`, `description`, `expected`, `rationale`, `discriminators`), cada fixture contém:

**`sera_context`** — separação formal entre causa SERA e análise de risco:
- `focal_actor`: ator principal da classificação causal
- `focal_event_for_risk`: delimitação do objeto de avaliação de risco
- `sera_expected_frozen`: classificação SERA considerada mais precisa metodologicamente
- `acceptable_sera_variants`: outras classificações defensáveis que não invalidam a análise de risco
- `risk_scope_note`: explicação de por que eventuais divergências P/O/A não afetam a camada de risco

**`risk_expected`** — contrato de risco:
- `event_type`, `arms_applicable`, `sira_applicable`, `traditional_matrix_applicable`
- `most_credible_accident_outcome` (Q1 ARMS)
- `remaining_barrier_effectiveness` (Q2 ARMS)
- `arms_risk_index_range`, `arms_color`, `hfa_visual_category`
- `probability_claim_allowed`, `probability_limitation_note`
- `risk_profile_use`, `anti_pattern`

---

## 4. Resultados do runner SERA — Run 1 (2026-05-17)

> **Interpretação correta**: esta tabela documenta o comportamento do motor causal SERA para esses cenários. Não é o critério de sucesso da camada de risco.

**Configuração:** `--filter TEST-RISK --n-runs 1 --compact`

| ID | Motor P | Motor O | Motor A | Status runner | Observação causal |
|---|---|---|---|---|---|
| TEST-RISK-ERC-001 | P-A ✅ | O-A ✅ | A-C | PARTIAL | A-C em vez de A-A — caso-limite defensável |
| TEST-RISK-ERC-002 | P-G | O-A ✅ | A-B ✅ | PARTIAL | P-G em vez de P-A — granularidade, sem impacto de risco |
| TEST-RISK-ERC-003 | P-A | O-A ✅ | A-B | PARTIAL | P-A/A-B em vez de P-B/A-C — dentro das variantes aceitas |
| TEST-RISK-ERC-004 | P-G | O-A | A-C | FAIL | Divergência tripla — backlog MOTOR-002/003 |
| TEST-RISK-ERC-005 | P-E | O-A ✅ | A-C | PARTIAL | P-E (subcategoria de P-B) / A-C captura causa em vez de resposta |
| TEST-RISK-DUAL-001 | P-A | O-A ✅ | A-B | PARTIAL | P-A/A-B captura causa; P-B/A-G captura percepção+resposta |
| TEST-RISK-DUAL-002 | P-A | O-C | A-A | FAIL | O-C gate sobre ação de terceiro (atendimento cabine) — backlog MOTOR-001 |
| TEST-RISK-ISO-001 | P-A | O-A ✅ | A-F | PARTIAL | A-F (seleção errada) = variante aceita para decisão de continuar vs diversionar |
| TEST-RISK-SIRA-001 | P-G | O-A ✅ | A-B ✅ | PARTIAL | P-G ≈ P-A para este cenário — sem impacto de risco |
| TEST-RISK-SIRA-002 | P-G | O-A ✅ | A-D | PARTIAL | P-G vs P-B (fadiga fisiológica); A-D captura causa, A-G captura resposta |

**Totais runner:** PASS 0 · PARTIAL 8 · FAIL 2 · ERROR 0  
**Avaliação de risco:** as divergências são observações do motor causal — ver análise abaixo.

---

## 5. Reclassificação das divergências (v0.3-C)

### 5.1 Divergências não bloqueantes para risco (8/10 fixtures PARTIAL)

| Padrão | Fixtures | Classificação v0.3-C |
|---|---|---|
| P-G vs P-A | ERC-002, ERC-003¹, ERC-004¹, DUAL-001¹, SIRA-001, SIRA-002 | **Não bloqueante de risco** — granularidade dentro da família de ausência de falha perceptiva |
| P-G vs P-B | ERC-004, SIRA-002 | **Não bloqueante de risco** (se ERC resultante for correto) — backlog MOTOR-003 |
| P-E vs P-B | ERC-005 | **Não bloqueante de risco** — P-E é subcategoria válida de P-B |
| A-B vs A-C | ERC-001, ERC-003 | **Não bloqueante de risco** — caso-limite, ambos aceitáveis |
| A-D vs A-G | SIRA-002 | **Não bloqueante de risco** — A-D = causa, A-G = resposta; evento real tem ambos |
| A-F vs A-C | ISO-001 | **Não bloqueante de risco** — A-F (seleção errada) é variante aceita |

¹ P-G dispara mas não gera FAIL no runner — motor ainda acerta O e A.

### 5.2 FAILs do runner — reclassificação

**ERC-004 (FAIL runner: P-G/O-A/A-C vs P-B/O-B/A-D)**

A divergência tripla é uma observação do motor causal. O bloqueante de risco real é:
- Se o motor produz ERC 3 ou menor urgência para este cenário → **bloqueante de risco** (subestimação grave)
- Se o motor produz ERC 2 ou 1 → **não bloqueante de risco**, divergência P/O/A é observação causal

O FAIL do runner é backlog MOTOR-002 (O-B) e MOTOR-003 (P-B). Não é bug de risco até que o ERC resultante seja verificado.

**DUAL-002 (FAIL runner: P-A/O-C/A-A vs P-B/O-A/A-C)**

O gate O-C disparou sobre ação de terceiro (atendimento da tripulação de cabine ao passageiro), não sobre o protagonista. O resultado em cascata foi O-C → A-A automático. O bloqueante de risco real seria se o ERC produzido for muito diferente do esperado (ERC 3). O FAIL é backlog MOTOR-001 (escopo gate O-C). Não é bug de risco até que o ERC resultante seja verificado.

### 5.3 Backlog de motor causal (fora do escopo RISK v0.3-C)

| ID | Problema | Prioridade |
|---|---|---|
| MOTOR-001 | Gate O-C dispara sobre ações de terceiros | Alta |
| MOTOR-002 | O-B não detectado sem trigger lexical de "hábito" | Alta |
| MOTOR-003 | Gate P-B requer evidência lexical — percepção fisiológica/sistêmica classificada como P-G/P-A | Alta |
| MOTOR-004 | A-G raramente classificado — A-A ou A-D tomam precedência | Média |

---

## 6. Critérios de sucesso da camada de risco (v0.3-C)

Os critérios abaixo substituem a seção "Critérios de bloqueio" da versão anterior. Eles são verificados por revisão manual contra `risk_expected` em cada fixture.

**Bloqueantes reais de risco** (independentes de P/O/A):

| Critério | Status atual | Verificação |
|---|---|---|
| ARMS/ERC não usa probabilidade de recorrência em evento individual | A verificar | Inspecionar output de `computeEventRisk()` |
| Matriz tradicional não afirma probabilidade absoluta | A verificar | Inspecionar UI risk-profile |
| UI distingue escala HFA 1–5 do índice ARMS canônico | Pendente Opção A | Aguarda decisão F-001 |
| Risk profile exibe aviso de amostra pequena (n < 30) | A verificar | Inspecionar UI |
| Evento isolado não aciona SIRA automaticamente por ERC alto | A verificar | Inspecionar lógica SIRA trigger |
| Padrão recorrente é sinalizado para SIRA | A verificar | Inspecionar detecção de Safety Issue |

**Não bloqueantes de risco** (ver tabela 5.1 acima).

---

## 7. Integridade do motor

Os fixtures criados e atualizados nesta fase não alteram nenhum arquivo do motor SERA, baseline, schema ou scripts.

Arquivos protegidos (sem alteração):
- `frontend/src/lib/sera/**` — pipeline SERA intacto
- `tests/sera/baseline.json` — baseline de smoke intacto
- `tests/sera/run.ts` — runner intacto
- `tests/sera/fixtures/schema.ts` — schema intacto
- `schema/migrations/**` — sem alteração
- `scripts/**` — sem alteração

---

## 8. Próximos passos

### RISK v0.4 — motor causal (backlog MOTOR-001 a MOTOR-004)
1. Corrigir escopo do gate O-C para restringir ao protagonista (MOTOR-001)
2. Melhorar detecção de O-B com critérios inferenciais além de trigger lexical (MOTOR-002)
3. Calibrar gate P-B para percepção comprometida por fadiga, falha de equipamento ou sobrecarga cognitiva (MOTOR-003)
4. Calibrar A-G para capturar resposta de emergência urgente (MOTOR-004)

### RISK v0.4 — camada de risco
1. Implementar runner específico de risco que valide `risk_expected`
2. Verificar os 6 critérios de sucesso listados na seção 6
3. Executar validação formal da Opção A (F-001) após decisão de autorização
4. Executar fixtures Tipo A e D do `RISK_VALIDATION_PLAN_v0.2.md` (lookup tables e perfil org)
