# SERA v0.1.1 — Release Candidate

**Data:** 2026-05-14
**Status:** Release Candidate — smoke global near-pass, validação seletiva pós-fix completa.
**Baseline oficial v0.1.1:** ainda não promovido (aguarda smoke global definitivo).

---

## 1. Estado do baseline v0.1

O baseline v0.1 representa o primeiro conjunto estável de fixtures SERA com resultados dourados registrados. Serviu como referência de regressão para o desenvolvimento das correções incluídas na v0.1.1.

---

## 2. Objetivo da v0.1.1

Corrigir falhas de classificação identificadas no smoke global v0.1 e aumentar a determinismo do pipeline sem alterar fixtures nem baseline. As correções foram desenvolvidas iterativamente com reteste seletivo e validadas por smoke global completo (near-pass).

---

## 3. Correções incluídas

### 3.1 TEST-O-D-001 — improvement confirmado
- **Problema:** O-D (objetivo de eficiência puro) era classificado incorretamente em runs anteriores.
- **Correção:** Regra determinística para diferenciar O-D de O-B (violação rotineira) quando o contexto é de ganho operacional sem histórico de normalização.
- **Resultado:** TEST-O-D-001 passou de PARTIAL/FAIL para PASS 3/3 e foi registrado como improvement no smoke v0.1.1.

### 3.2 O-D puro vs O-B rotineiro
- **Problema:** Casos de objetivo de eficiência eram às vezes capturados como violação rotineira (O-B) sem evidência de normalização cultural.
- **Correção:** Refinamento da fronteira entre O-D e O-B na regra determinística de objetivo: O-B exige histórico explícito de prática aceita/normalizada; sem esse histórico, objetivo de eficiência permanece O-D.

### 3.3 Runtime — parse/timeout/retry
- **Problema:** Falhas transientes do LLM (timeout, JSON malformado) causavam erros não recuperáveis que contaminavam a run inteira.
- **Correção:** Implementação de retry com backoff para falhas transientes de LLM e JSON parse. O pipeline agora reintenta antes de classificar como ERROR.

### 3.4 O-A/O-C — exige proteção humana explícita
- **Problema:** O-C era atribuído em casos onde não havia evidência explícita e literal de objetivo protetivo humano. Exceções circunstanciais (pressão de prazo, ferramenta indisponível, omissão administrativa) acionavam O-C incorretamente.
- **Correção:** Gates determinísticos e instruções de prompt reforçadas: O-C exige que o operador tenha desviado conscientemente de um protocolo conhecido, motivado por proteger uma pessoa de risco imediato. Circunstâncias excepcionais sem esse desvio intencional permanecem O-A.

### 3.5 A-C pós-intervenção/parâmetro
- **Problema:** Checks de parâmetro realizados após a intervenção principal eram classificados como A-C em vez de permanecer na categoria correta.
- **Correção:** Regra geral que reclassifica verificações pós-intervenção de parâmetro como A-C quando o padrão do relato confirma essa sequência.

### 3.6 TEST-COMBO-003 — conhecimento médico/protocolo permanece O-A
- **Problema:** "Médico de bordo administra dose errada por desconhecer protocolo de altitude." Em 1/3 runs do smoke v0.1.1, o LLM classificava o objetivo como O-C (proteção humana) porque confundia *atender o paciente como função nominal* com *desviar conscientemente de protocolo conhecido para proteger alguém*.
- **Correção:** Gate determinístico inserido em `runStep4` antes do LLM: quando o relato contém evidência explícita de déficit de conhecimento/treinamento (`nao havia recebido treinamento`, `desconhecia o protocolo`, `lacuna de conhecimento`, etc.), o pipeline força O-A sem consultar o LLM. Lacuna instrucional não é desvio motivado por objetivo protetivo.
- **Segurança:** Os fixtures O-C legítimos são capturados por `classifyObjectiveByRules` antes de chegar ao novo gate — sem regressão.

---

## 4. Resultado do smoke global near-pass (v0.1.1)

Relatório: `tests/reports/run-1778786318335.json`

| Métrica | Valor |
|---|---|
| Fixtures testadas | 54 |
| Total de runs | 162 |
| PASS | 161 |
| PARTIAL | 1 |
| FAIL | 0 |
| ERROR | 0 |
| pass_rate | 99.38% |
| determinism_rate | 98.15% |

**Comparação contra baseline v0.1:**
- pass_rate: 98.1% → 99.4% (+1.2%)
- determinism_rate: 100.0% → 98.1% (−1.9%)
- improvements: 1 (TEST-O-D-001)
- regressions: 1 (TEST-COMBO-003, oscilação de objetivo O-A→O-C em 1/3)

**Único bloqueio:** TEST-COMBO-003 — objective O-C em 1 das 3 runs (perception, action e ERC corretos nas 3 runs).

---

## 5. Resultado da validação seletiva pós-fix

Executada após a correção do gate de knowledge deficit em `runStep4`.

| Fixture / Grupo | Runs | PASS | PARTIAL | FAIL | Rate | Det | Status |
|---|---|---|---|---|---|---|---|
| TEST-COMBO-003 | 10 | 10 | 0 | 0 | 100% | 100% | ✅ Corrigido |
| TEST-O-C-001 | 3 | 3 | 0 | 0 | 100% | 100% | ✅ O-C mantido |
| TEST-O-C-002 | 3 | 3 | 0 | 0 | 100% | 100% | ✅ O-C mantido |
| TEST-GEN-OC-001 | 3 | 3 | 0 | 0 | 100% | 100% | ✅ O-C mantido |
| TEST-GEN-OC-002 | 3 | 3 | 0 | 0 | 100% | 100% | ✅ O-C mantido |
| TEST-GEN-OC-003 | 3 | 3 | 0 | 0 | 100% | 100% | ✅ O-C mantido |
| TEST-O-D-001 | 3 | 3 | 0 | 0 | 100% | 100% | ✅ improvement mantido |
| Grupo combo (3 fixtures) | 9 | 9 | 0 | 0 | 100% | 100% | ✅ |
| Grupo objective (5 fixtures) | 15 | 15 | 0 | 0 | 100% | 100% | ✅ |
| **Total seletivo** | **53** | **53** | **0** | **0** | **100%** | **100%** | ✅ |

---

## 6. Decisão

**O build v0.1.1 pode ser tratado como release candidate.**

Fundamentos:
- O único bloqueio do smoke near-pass (TEST-COMBO-003) foi corrigido e passou 10/10.
- Nenhum fixture O-C legítimo regrediu — o gate é seguro.
- O improvement de TEST-O-D-001 está preservado.
- A mudança é mínima: 13 linhas adicionadas em 1 arquivo (`frontend/src/lib/sera/all-steps.ts`), gate determinístico puro sem alteração de lógica existente.
- Grupos combo e objective 100% limpos.

**O baseline oficial v0.1.1 ainda não deve ser promovido** sem novo smoke global completo. A promoção requer que o smoke definitivo passe 54/54 fixtures sem PARTIAL.

---

## 7. Próximo passo

1. Aguardar janela de tempo disponível.
2. Rodar smoke global definitivo:
   ```bash
   bash scripts/run-sera-v0.1.1-smoke.sh
   ```
3. Verificar que o resultado é 54/54 fixtures, 162/162 runs, 0 PARTIAL, 0 FAIL, 0 ERROR.
4. Se aprovado, promover baseline:
   ```bash
   bash scripts/promote-sera-v0.1.1-baseline.sh tests/reports/run-<id>.json
   ```
5. Registrar promoção em `docs/SERA_BASELINE_V0_1_1.md`.
