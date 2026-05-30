# SERA A4R185 Real Tree Rebuild Plan

Phase: A4R184-Q (planejamento de A4R185)  
Version: v0.2.0  
Date: 2026-05-30  
Status: PLAN_DRAFT  
DOCS_ONLY  
NO_EVENT_ANALYSIS  
NO_AXIS_DECISION

---

## 1. Objetivo

Este documento registra o plano futuro para reconstruir o fluxo de decisão de eixo dos 5 eventos do BATCH_A utilizando exclusivamente a árvore canônica SERA (A4R99 ou fonte primária). A execução deste plano é A4R185 ou fase posterior designada.

**Este documento é plano, não autorização.** A execução somente pode começar após REAL_TREE_GATE=PASS.

---

## 2. Pré-condição Inviolável

> **Se REAL_TREE_GATE != PASS, o plano A4R185 não pode ser executado.**

O REAL_TREE_GATE=PASS exige confirmação de que a fonte canônica disponível satisfaz TODOS os critérios de node id/texto/ordem/ramificação/eixo/status canônico. Ver `SERA_REAL_TREE_REQUIREMENT_FOR_A4R185_v0.2.0.md`.

---

## 3. Plano por Etapas

### Etapa 1 — Localizar e confirmar a árvore real SERA

**Ação**: Confirmar que `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` satisfaz os critérios de REAL_TREE_GATE.

**Verificação obrigatória**:
- Confirmar que os node IDs técnicos estáveis (ex.: `P_ROOT`, `P_ASSESSMENT`) são suficientes como referência operacional, OU
- Consultar diretamente `docs/reference/hendy-sera-2003.txt` e `docs/reference/daumas-sera-offshore.txt` para confirmar texto e ordem

**Resultado esperado**:
- `REAL_TREE_GATE=PASS` se fonte satisfaz todos os critérios
- `REAL_TREE_GATE=FAIL` com `REAL_TREE_MISSING` se nenhuma fonte satisfatória for encontrada

**Bloqueio**: se FAIL, parar imediatamente. Não executar Etapas 2–5.

---

### Etapa 2 — Validar node IDs, texto exato e ordem

**Ação**: Para cada eixo (P, O, A), verificar na fonte canônica confirmada:

| Item | Verificação |
|---|---|
| Node ID | Confirmado na fonte (não inferido) |
| Texto exato | Copiado literalmente da fonte (não parafraseado) |
| Ordem no fluxo | Confirmada na fonte (não reconstruída) |
| Condição de ramificação | Confirmada na fonte (SIM/NÃO/opção específica) |
| Leaf code | Confirmado na fonte |

**Resultado esperado**: tabela de verificação por eixo com status CONFIRMED ou UNCONFIRMED para cada node.

**Bloqueio**: qualquer node com UNCONFIRMED no texto exato é bloqueador para o eixo correspondente.

---

### Etapa 3 — Mapear cada evento ao fluxo real da árvore, sem inventar pergunta

**Ação**: Para cada um dos 5 eventos do BATCH_A (Asiana 214, Comair 5191, American 1420, UPS 1354, United 173), percorrer o fluxo da árvore canônica node por node.

**Regras obrigatórias**:
- Cada step deve registrar o `nodeId` canônico
- A pergunta aplicada deve ser o texto exato do node (sem adaptação)
- A resposta deve ser selecionada com base em evidência factual dos documentos de extração (A4R180/A4R180B)
- Nenhuma pergunta auxiliar pode ser inserida entre nodes
- Se evidência for insuficiente para responder um node, registrar `INSUFFICIENT_EVIDENCE` e não avançar nesse eixo

**Resultado esperado**: questionPath por eixo por evento, com node IDs e respostas documentadas.

---

### Etapa 4 — Registrar decisões autorais respondendo nodes reais

**Ação**: Para cada node onde a resposta gera uma decisão com impacto (ex.: `P_ASSESSMENT`: SIM → P-A; NÃO → continuar), o autor registra explicitamente:

- O node ID respondido
- O texto exato da pergunta
- A resposta selecionada
- A evidência factual citada
- O racional de por que essa resposta e não outra

**Restrição**: a resposta deve ser baseada em evidência factual, não em inferência de outcome.

---

### Etapa 5 — Manter notFinalClassification=true até fase posterior

**Ação**: Mesmo após completar o questionPath com a árvore canônica, manter:

```
notFinalClassification=true
poaClosureAllowed=false
```

O fechamento P/O/A e a liberação de código canônico são responsabilidade de fase posterior designada (A4R186 ou posterior), após validação completa do questionPath e aprovação metodológica.

---

## 4. Eventos do BATCH_A

| eventKey | reviewId atual | Lacuna principal identificada em A4R184 |
|---|---|---|
| Asiana 214 SFO | A4R184-REVIEW-0001 | CVR anchor discreto não isolado; boundary P/A temporal |
| Comair 5191 LEX | A4R184-REVIEW-0002 | Separabilidade P/A no mesmo fragmento (F3) |
| American 1420 LIT | A4R184-REVIEW-0003 | Altitude/janela de go-around não especificada; double-count P/A |
| UPS 1354 BHM | A4R184-REVIEW-0006 | Mode change sem briefing: alocação F2 a P ou A |
| United 173 PDX | A4R184-REVIEW-0017 | OCR artifacts; timestamp/fuel quantity não isolado |

**Nota**: estas lacunas foram identificadas em A4R184, mas não podem ser resolvidas pelas "perguntas por eixo" do A4R184. Devem ser resolvidas pela travessia canônica da árvore SERA em A4R185.

---

## 5. Bloqueio Explícito Final

> **Se REAL_TREE_GATE != PASS antes de iniciar A4R185, toda a fase deve ser bloqueada. Nenhuma etapa pode ser executada. O resultado correto para uma fase bloqueada é REAL_TREE_MISSING com parada completa da execução.**

O inferno operacional é pavimentado com perguntas "metodologicamente razoáveis" que substituem a árvore real. A única defesa é o REAL_TREE_GATE.
