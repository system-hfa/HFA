# SERA v0.1.1 — Triagem das Fixtures Não-PASS

**Data:** 2026-05-14  
**Relatório base:** `tests/reports/candidates/sera-v0.1.1-smoke-failed-2026-05-14.json`  
**Smoke:** 54 fixtures · 162 runs · PASS 152 · PARTIAL 8 · FAIL 2 · ERROR 2 · pass_rate 93.8% · determinism 85.2%

---

## 1. Resumo Executivo

Das 8 fixtures não-PASS, identificam-se **dois padrões sistêmicos distintos**:

**Padrão 1 — Fronteira O-A ↔ O-C (6 confusões em 8 fixtures):**  
O modelo oscila entre O-A ("agiu sem perceber a violação") e O-C ("violação excepcional por proteção humana") em cenários onde nenhuma proteção humana está em jogo. A matriz de confusão global confirma: 5 runs esperando O-A retornaram O-C; 1 run esperando O-C retornou O-A; 1 esperando O-C retornou O-B. Esse é o eixo dominante de falha.

**Padrão 2 — Falhas de runtime (2 fixtures):**  
TEST-GEN-AI-002 gerou JSON malformado em 1 de 3 runs (SyntaxError no parse da etapa 6-7). TEST-GEN-OD-002 foi terminado por timeout após 703 s em 1 de 3 runs. Ambos os casos têm 2/3 PASS — o conteúdo semântico está correto; o problema é operacional.

Nenhuma fixture apresenta problema de percepção (eixo P) ou ERC sistêmico. Preconditions são secundários: afetam recall mas não o overall score (que já ignora preconditions no resultado final de 5 das 8 fixtures).

---

## 2. Tabela das 8 Fixtures

| Fixture | Título (resumido) | Expected | Runs (overall) | Eixo falho | Tipo |
|---------|------------------|----------|----------------|-----------|------|
| TEST-COMBO-003 | Médico administra dose errada por desconhecer protocolo altitude | P-C / O-A / A-E / ERC 2 | PASS · PASS · PARTIAL | objective (O-A→O-C, run 2) + preconditions | B |
| TEST-ERC-4-001 | Registro secundário de inspeção não crítica omitido | P-A / O-A / A-B / ERC 4 | PARTIAL · PASS · PASS | objective (O-C→O-A, run 0) + preconditions | B |
| TEST-ERC-5-001 | Campo administrativo redundante preenchido com atraso | P-A / O-A / A-A / ERC 5 | PARTIAL · PASS · PASS | objective (O-C→O-A, run 0) + preconditions | B |
| TEST-GEN-AI-002 | Operador escolhe instrução inadequada durante pico de carga | P-D / O-A / A-I / ERC 1 | PASS · FAIL · PASS | parse error JSON etapa 6-7 (run 1) | A |
| TEST-GEN-OC-002 | Operador interrompe protocolo para proteger pessoa presa | P-A / O-C / A-A / ERC 2 | PASS · PARTIAL · PARTIAL | objective (O-C→O-A run 1; O-C→O-B run 2) + ERC run 2 | B |
| TEST-GEN-OD-002 | Equipe simplifica procedimento para cumprir janela de conexão | P-A / O-D / A-A / ERC 2 | PASS · FAIL · PASS | terminated timeout 703 s (run 1) | A |
| TEST-GEN-PG-001 | Operador assume normalidade sem conferir parâmetro disponível | P-G / O-A / A-C / ERC 2 | PASS · PARTIAL · PASS | action (A-C→A-A run 1) + ERC (2→3 run 1) | C |
| TEST-T2-W2-001 | Ferramenta improvisada sob pressão de prazo | P-A / O-A / A-D / ERC 3 | PASS · PARTIAL · PARTIAL | objective (O-A→O-C, runs 1 e 2) — maioria errada | B |

**Tipos:** A = runtime/parsing/timeout · B = instabilidade objective O-A/O-C/O-B/O-D · C = instabilidade action/ERC · D = somente preconditions

---

## 3. Análise Detalhada por Fixture

### 3.1 TEST-GEN-AI-002 — Grupo A (parse error)

**Runs:**
- Run 0: PASS — P-D / O-A / A-I / ERC 1 ✓
- Run 1: FAIL — todos os campos vazios; erro: `SyntaxError: Unexpected token 'O', ..."clusoes": O incident"... is not valid JSON`
- Run 2: PASS — P-D / O-A / A-I / ERC 1 ✓

**Eixo falho:** parsing/runtime. O LLM gerou texto literal ("O incident") dentro de um campo JSON que o parser esperava uma string entre aspas. Duração run 1: 60 030 ms (normal) — não foi timeout, foi output malformado.

**Causa provável:** o LLM escreveu um valor de campo sem aspas ou com texto antes da aspa de fechamento. Isso é um bug esporádico na geração JSON do modelo, provavelmente em campo de texto livre dentro de `precondicoes[].evidencia_no_relato`.

**Tipo:** A — bug de parsing (não há retry na pipeline).

**Recomendação:** Adicionar retry com re-parse na etapa 6-7 quando `SyntaxError`. Alternativa: usar `json_repair` ou extrair JSON com regex como fallback. Não tocar na fixture.

**Risco metodológico:** Baixo. Retry puro não altera semântica do teste.

---

### 3.2 TEST-GEN-OD-002 — Grupo A (timeout/terminated)

**Runs:**
- Run 0: PASS — P-A / O-D / A-A / ERC 2 ✓ (65 747 ms)
- Run 1: FAIL — terminated; `duration_ms: 703 445` (~11,7 min); todos os campos vazios
- Run 2: PASS — P-A / O-D / A-A / ERC 2 ✓ (71 597 ms)

**Eixo falho:** runtime/timeout. O run 1 ficou suspenso por quase 12 minutos antes de ser terminado. Runs normais para esta fixture completam em ~70 s.

**Causa provável:** hang em chamada de API — provavelmente a requisição LLM ficou pendente sem resposta e não havia timeout configurado na pipeline (ou o timeout era superior a 703 s).

**Tipo:** A — timeout operacional (não há retry nem timeout explícito curto).

**Recomendação:** Configurar timeout explícito na chamada LLM (ex.: 120 s) e retry automático em caso de `terminated`. Não tocar na fixture. O conteúdo semântico está correto quando a pipeline funciona.

**Risco metodológico:** Baixo. Timeout + retry é correção de infra, não de metodologia.

---

### 3.3 TEST-COMBO-003 — Grupo B (O-A→O-C, 1/3 runs)

**Runs:**
- Run 0: PASS — P-C / O-A / A-E / ERC 2 ✓ (preconditions FAIL: P6,O4 vs esperado P6,P7,O3,O4,S3)
- Run 1: PASS — P-C / O-A / A-E / ERC 2 ✓ (preconditions FAIL: P6,O4 vs esperado P6,P7,O3,O4,S3)
- Run 2: PARTIAL — P-C / **O-C** / A-E / ERC 2 (preconditions FAIL: P6,O4)

**Eixo falho principal:** objective (1/3 O-A→O-C). Preconditions FAIL em todas as runs (secondary).

**Causa provável (objective):** Cenário médico de bordo em altitude — o LLM pode associar "situação de emergência a bordo" + "dose" + "desconhece protocolo" como motivação protetiva (O-C = violação excepcional por proteção humana), quando na verdade a lacuna é cognitiva/instrucional (desconhece o protocolo = P-C). Os discriminadores da fixture não mencionam explicitamente "Não é O-C."

**Causa provável (preconditions):** O modelo identificou consistentemente apenas P6 e O4, omitindo P7, O3, S3. O conjunto esperado é grande (5 precondições); o modelo pode estar truncando a lista por limite de tokens na resposta.

**Tipo:** B (instabilidade de objective) + Grupo D secundário (preconditions).

**Recomendação:**
- Fixture: adicionar discriminador `"Não é O-C: o médico não violou protocolo intencionalmente para proteger alguém — ele desconhecia o protocolo. Violações por lacuna instrucional são O-A, não O-C."`.
- Preconditions: investigar se o prompt limita o número de precondições retornadas.

**Risco metodológico:** Adicionar discriminador não altera o golden, apenas guia o modelo. Baixo risco.

---

### 3.4 TEST-ERC-4-001 — Grupo B (O-A→O-C, 1/3 runs)

**Runs:**
- Run 0: PARTIAL — P-A / **O-C** / A-B / ERC 4 (preconditions FAIL)
- Run 1: PASS — P-A / O-A / A-B / ERC 4 ✓ (preconditions FAIL: P2,T2,S3 vs W1,O3)
- Run 2: PASS — P-A / O-A / A-B / ERC 4 ✓ (preconditions PARTIAL: P2,T2,O3 — tem O3 mas não W1)

**Eixo falho principal:** objective (1/3 O-C em vez de O-A). Preconditions: W1 ausente nas 3 runs.

**Causa provável (objective):** "Registro secundário de inspeção não crítica omitido" — o LLM pode interpretar a omissão como decisão deliberada de proteção de eficiência (mas isso seria O-D, não O-C). A confusão O-A↔O-C aqui é idêntica ao padrão sistêmico: cenários de baixa gravidade (ERC 4-5) em que a ação é uma omissão/atraso sendo classificados como O-C esporadicamente.

**Causa provável (preconditions):** W1 ("disponibilidade de ferramentas/recursos") ausente consistentemente. Pode ser que a fixture enfatiza aspectos organizacionais (O3) mas não deixa W1 explícito o suficiente no texto do relato.

**Tipo:** B + Grupo D (preconditions).

**Recomendação:**
- Fixture: adicionar discriminador para O-C (mesmo padrão do COMBO-003).
- Preconditions: revisar se o relato menciona disponibilidade de recursos (W1) de forma suficientemente clara.

**Risco metodológico:** Baixo.

---

### 3.5 TEST-ERC-5-001 — Grupo B (O-A→O-C, 1/3 runs)

**Runs:**
- Run 0: PARTIAL — P-A / **O-C** / A-A / ERC 5 (preconditions PASS)
- Run 1: PASS — P-A / O-A / A-A / ERC 5 ✓ (preconditions PASS)
- Run 2: PASS — P-A / O-A / A-A / ERC 5 ✓ (preconditions FAIL: lista vazia vs O3)

**Eixo falho principal:** objective (1/3 O-C em vez de O-A). ERC 5 = mínima gravidade.

**Causa provável:** Mesmo padrão sistêmico O-A↔O-C. "Campo administrativo redundante preenchido com atraso" — o LLM interpretou o atraso como decisão consciente de proteção, não como simples descuido/omissão. Scenarios ERC 4-5 (baixíssima gravidade) são especialmente vulneráveis a essa confusão porque o modelo parece associar "há uma regra descumprida" → "foi uma decisão intencional" → O-C.

**Causa provável (preconditions run 2):** Lista vazia retornada — o modelo às vezes não preenche precondições em cenários de baixa gravidade onde as violações são menores.

**Tipo:** B + Grupo D (preconditions secundário).

**Recomendação:**
- Fixture: adicionar discriminador O-A vs O-C.
- Pipeline: investigar por que preconditions às vezes retornam lista vazia.

**Risco metodológico:** Baixo.

---

### 3.6 TEST-GEN-OC-002 — Grupo B (O-C→O-A/O-B, 2/3 runs incorretos — alta gravidade)

**Runs:**
- Run 0: PASS — P-A / O-C / A-A / ERC 2 ✓
- Run 1: PARTIAL — P-A / **O-A** / A-A / ERC 2 (preconditions PARTIAL: falta S1)
- Run 2: PARTIAL — P-A / **O-B** / A-A / **ERC 1** (preconditions FAIL)

**Eixo falho principal:** objective (2/3 errado: O-A e O-B em vez de O-C) + ERC no run 2 (1 em vez de 2).

**Causa provável:** A fixture descreve cenário claro de O-C (operador interrompe protocolo para proteger pessoa presa em área de risco com equipamento em movimento). Os discriminadores já mencionam "NÃO é O-B" e "NÃO é O-D", mas não mencionam "NÃO é O-A". O LLM em run 1 classifica como O-A (ação sem percepção de violação — impossível aqui, pois o operador claramente sabia que estava fora da sequência). Em run 2 classifica como O-B (violação rotineira), que os discriminadores já excluem.

Isso indica que os discriminadores existentes não estão sendo suficientemente capturados pelo modelo, ou que a fronteira O-B↔O-C↔O-A ainda é fluida nesta classe de cenário.

**Severidade:** Alta — 2/3 runs incorretos, overall_accuracy = 0.33. Esta é a fixture com pior resultado semântico do smoke.

**Tipo:** B (alta instabilidade de objective, bi-direcional).

**Recomendação:**
- Fixture: adicionar discriminador explícito "NÃO é O-A: o operador estava ciente de que estava violando a sequência — O-A requer ausência de consciência da violação."
- Pipeline: considerar gate adicional no nó objective que verifica se há intenção explícita declarada no relato (se sim, exclui O-A automaticamente).
- Avaliar se este cenário precisa de mais contexto no relato para tornar O-C inambíguo.

**Risco metodológico:** Médio. Adicionar gate determinístico no nó objective altera o comportamento do pipeline para toda a classe O-C; requer validação ampla. Adicionar discriminador na fixture tem risco baixo.

---

### 3.7 TEST-GEN-PG-001 — Grupo C (A-C→A-A, 1/3 runs)

**Runs:**
- Run 0: PASS — P-G / O-A / A-C / ERC 2 ✓
- Run 1: PARTIAL — P-G / O-A / **A-A** / **ERC 3** (preconditions FAIL: só P2)
- Run 2: PASS — P-G / O-A / A-C / ERC 2 ✓

**Eixo falho:** action (A-C→A-A, 1/3) + ERC corolário (2→3).

**Causa provável:** A-C = ação adequada em contexto inadequado (assume normalidade sem verificar parâmetro). A-A = ação adequada em contexto adequado. Em run 1, o modelo parece ter interpretado a ação como correta para o contexto percebido pelo operador (que assumia normalidade), sem considerar que a percepção era falha (P-G = assumption of normality). Quando o modelo não captura a nuance P-G↔A-C, tende a "resolver" a inconsistência assumindo A-A. O ERC sobe de 2 para 3 provavelmente como consequência de A-A (se a ação está correta, o risco seria maior?).

**Tipo:** C (instabilidade de action + ERC corolário).

**Recomendação:**
- Fixture: adicionar discriminador "NÃO é A-A: a ação foi executada em contexto inadequado por suposição errônea de normalidade (P-G) — A-A exige que contexto e ação estejam ambos corretos."
- Pipeline: verificar se o prompt para o nó action considera explicitamente o perception_code já determinado.

**Risco metodológico:** Baixo.

---

### 3.8 TEST-T2-W2-001 — Grupo B (O-A→O-C, 2/3 runs — possível problema de golden label)

**Runs:**
- Run 0: PASS — P-A / O-A / A-D / ERC 3 ✓ (preconditions PARTIAL: P1,W1,W2,O2,O4 vs T2,W2,W1,O4)
- Run 1: PARTIAL — P-A / **O-C** / A-D / ERC 3 (preconditions PARTIAL)
- Run 2: PARTIAL — P-A / **O-C** / A-D / ERC 3 (preconditions PARTIAL)

**Eixo falho:** objective (2/3 O-C em vez de O-A — maioria errada). ERC e action estáveis. Preconditions PARTIAL consistentemente (falta T2, tem extras P1/O2).

**Causa provável:** Este é o caso mais grave do Grupo B e merece análise especial. O cenário descreve uma equipe que usa ferramenta improvisada para cumprir prazo. O golden label é O-A ("tarefa continuava sendo a intervenção regular, sem objetivo de dano"). Mas o LLM interpreta consistentemente (2/3) como O-C.

Duas hipóteses:
1. **Hipótese 1 — Instabilidade do modelo:** O modelo confunde O-C com outros tipos de violação consciente. Aqui a equipe sabia que estava usando ferramenta inadequada (violação consciente), o que poderia ser O-D (eficiência) mais do que O-A.
2. **Hipótese 2 — Golden label possivelmente impreciso:** O fixture discrimina "Não é O-D", mas não "Não é O-C" e nem "Não é O-B". Se a equipe sabia que a ferramenta era inadequada e decidiu continuar mesmo assim sob pressão de prazo, isso está mais próximo de O-D (eficiência/prazo) ou até O-B (violação rotineira por pressão) do que O-A. O-A implica ausência de consciência da violação.

A fixture diz "Para manter o prazo, a equipe utilizou uma ferramenta improvisada" — há consciência explícita da violação. O rationale diz "O-A: a tarefa continuava sendo a intervenção regular, sem objetivo de dano" — mas O-A não é definido por ausência de objetivo de dano, e sim por ausência de consciência da violação.

**Atenção:** Este caso pode indicar um erro no golden label (deveria ser O-D ou O-B, não O-A), não um erro do modelo.

**Tipo:** B — mas com suspeita de golden label incorreto (requer revisão metodológica antes de qualquer correção).

**Recomendação (antes de qualquer correção de código ou fixture):**
- Revisar com o especialista SERA se O-A é de fato o código correto para este cenário, dado que há consciência explícita da violação.
- Se confirmado O-A: adicionar discriminadores "Não é O-C", "Não é O-B", "Não é O-D" e esclarecer o critério.
- Se o golden deveria ser O-D ou O-B: corrigir o golden label.

**Risco metodológico:** Alto se mudar o golden label — impacta baseline e comparação histórica.

---

## 4. Classificação por Grupo

### Grupo A — Bugs operacionais/parsing/timeout (2 fixtures)

| Fixture | Problema | Solução |
|---------|---------|---------|
| TEST-GEN-AI-002 | JSON malformado na etapa 6-7 (1/3 runs) | Retry com re-parse + fallback json_repair |
| TEST-GEN-OD-002 | Timeout 703 s (1/3 runs) | Timeout explícito ≤120 s + retry automático |

### Grupo B — Instabilidade de objective (5 fixtures)

| Fixture | Confusão | Severity | Golden OK? |
|---------|---------|----------|-----------|
| TEST-COMBO-003 | O-A→O-C (1/3) | Baixa | Sim |
| TEST-ERC-4-001 | O-A→O-C (1/3) | Baixa | Sim |
| TEST-ERC-5-001 | O-A→O-C (1/3) | Baixa | Sim |
| TEST-GEN-OC-002 | O-C→O-A/O-B (2/3) | Alta | Sim |
| TEST-T2-W2-001 | O-A→O-C (2/3) | Alta | **Revisar** |

**Padrão sistêmico O-A↔O-C:** A matriz de confusão global mostra 5 ocorrências O-A→O-C e 2 O-C→{O-A,O-B} em 162 runs. Isso é um sinal claro de que a fronteira O-A/O-C no prompt da pipeline é ambígua para o modelo.

### Grupo C — Instabilidade de action/ERC (1 fixture)

| Fixture | Confusão | Severity |
|---------|---------|---------|
| TEST-GEN-PG-001 | A-C→A-A (1/3), ERC 2→3 (1/3) | Baixa |

### Grupo D — Somente preconditions (cross-cutting, não afeta overall)

Presentes em: TEST-COMBO-003, TEST-ERC-4-001, TEST-ERC-5-001, TEST-T2-W2-001. Preconditions não afetam o overall score atualmente; são tratados como informação secundária. O recall médio é baixo mas não causa PARTIAL/FAIL. Pode ser atacado em sprint separado.

---

## 5. Matriz de Confusão Global — Objective

```
Expected O-A → actual O-A: 111  |  actual O-C: 5  |  actual "": 1
Expected O-C → actual O-C: 13  |  actual O-A: 1  |  actual O-B: 1
Expected O-B → actual O-B: 15
Expected O-D → actual O-D: 14  |  actual "": 1
```

A boundary O-A↔O-C concentra **7 das 8 falhas** não-runtime do smoke. Nenhuma outra fronteira de objective foi violada.

---

## 6. Plano de Correção Priorizado

### Prioridade 1 — Grupo A: correções de runtime (impacto imediato, risco zero)

**P1.1 — Retry em parse error (TEST-GEN-AI-002)**
- Onde: pipeline SERA, etapa de parse JSON 6-7
- O que: detectar `SyntaxError` e re-executar a chamada LLM (máx 2 retries)
- Risco: zero — não altera semântica
- Critério de sucesso: TEST-GEN-AI-002 → 3/3 PASS em re-run

**P1.2 — Timeout + retry (TEST-GEN-OD-002)**
- Onde: wrapper de chamada LLM na pipeline
- O que: configurar timeout de 120 s; em caso de terminated, retry automático (máx 2x)
- Risco: zero — não altera semântica
- Critério de sucesso: TEST-GEN-OD-002 → 3/3 PASS em re-run

### Prioridade 2 — Revisão metodológica de TEST-T2-W2-001 (bloqueante antes de corrigir Grupo B)

**P2 — Validar golden label de TEST-T2-W2-001**
- O que: revisar com especialista SERA se O-A é correto dado que a equipe tinha consciência explícita da violação. Se O-D/O-B for mais adequado, corrigir golden antes de qualquer smoke.
- Risco: Alto se mudar golden — impacta baseline e histórico comparativo. Documentar decisão.
- Não fazer commit do golden alterado sem aprovação metodológica explícita.

### Prioridade 3 — Grupo B: adicionar discriminadores nas fixtures (após P2)

**P3.1 — Discriminadores O-A↔O-C sistêmicos**
- Fixtures: TEST-COMBO-003, TEST-ERC-4-001, TEST-ERC-5-001 (e possivelmente TEST-T2-W2-001 se golden confirmado)
- O que: adicionar `"Não é O-C: O-C requer violação intencional motivada por proteção de pessoa em risco imediato. Violações por desconhecimento, omissão ou atraso sem esse motivador explícito são O-A."` no campo `discriminators`.
- Risco: Baixo — discriminadores não alteram o golden, apenas guiam o modelo.

**P3.2 — Discriminador O-A em TEST-GEN-OC-002**
- O que: adicionar `"NÃO é O-A: o operador estava consciente de que agia fora da sequência autorizada — O-A requer ausência de consciência da violação."` no campo `discriminators`.
- Risco: Baixo.

### Prioridade 4 — Grupo C: discriminador A-C em TEST-GEN-PG-001

**P4 — Discriminador A-C↔A-A**
- O que: adicionar `"Não é A-A: a ação foi executada em contexto inadequado — A-A exige que tanto a ação quanto o contexto estejam corretos. Aqui, P-G (suposição de normalidade) torna o contexto inadequado, portanto A-C."`.
- Risco: Baixo.

### Prioridade 5 — Grupo D: preconditions (sprint separado, não bloqueia)

- Investigar por que preconditions retornam lista vazia em alguns runs (TEST-ERC-5-001 run 2, TEST-GEN-AI-002 baseline)
- Investigar por que W1 é consistentemente omitido em TEST-ERC-4-001
- Investigar truncamento de lista em TEST-COMBO-003 (5 precondições esperadas, apenas 2 retornadas)

---

## 7. Critérios para Novo Smoke Global

Antes de promover baseline v0.1.1, exigir:

1. **Grupo A resolvido:** TEST-GEN-AI-002 e TEST-GEN-OD-002 → 3/3 PASS em run isolado.
2. **Golden de TEST-T2-W2-001 validado** por especialista SERA (aceitar O-A ou corrigir para O-D/O-B).
3. **Fixtures de Grupo B com discriminadores adicionados** (TEST-COMBO-003, ERC-4-001, ERC-5-001, GEN-OC-002, T2-W2-001).
4. **New smoke global com n_runs=3:** target pass_rate ≥ 96% (155/162) e determinism_rate ≥ 90% (49/54 fixtures fully deterministic).
5. Nenhum FAIL ou ERROR no smoke (tolerância zero para runtime errors após P1).
6. TEST-GEN-OC-002 e TEST-T2-W2-001 → mínimo 2/3 PASS.

---

## 8. Resumo de Riscos Metodológicos

| Correção | Risco | Justificativa |
|---------|------|--------------|
| Retry/timeout pipeline | Zero | Infra, não semântica |
| Adicionar discriminadores fixtures | Baixo | Não altera golden label |
| Corrigir golden TEST-T2-W2-001 | Alto | Impacta baseline e comparação histórica |
| Gate determinístico O-A/O-C na pipeline | Médio | Altera comportamento global para toda classe O-C |
| Alterar prompt do nó objective | Médio-Alto | Efeito global em todas as 54 fixtures |

**Recomendação geral:** aplicar P1 (runtime) e P3/P4 (discriminadores) primeiro — são cirúrgicos e reversíveis. Validar T2-W2-001 antes de qualquer mudança de golden. Só então executar novo smoke global.
