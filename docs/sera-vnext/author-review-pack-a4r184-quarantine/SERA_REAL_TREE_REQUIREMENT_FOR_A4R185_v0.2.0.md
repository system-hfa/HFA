# SERA Real Tree Requirement for A4R185

Phase: A4R184-Q
Version: v0.2.0
Date: 2026-05-30
Status: GATE_ACTIVE
DOCS_ONLY
NO_EVENT_ANALYSIS
NO_AXIS_DECISION

---

## 1. Definição do REAL_TREE_GATE

O REAL_TREE_GATE é o portão metodológico obrigatório que deve ser verificado antes da execução de qualquer fase que produza decisão de eixo (P/O/A).

### Condições para PASS

O REAL_TREE_GATE somente pode ser marcado como **PASS** se, para o eixo em questão, estiver disponível uma fonte canônica que satisfaça TODOS os critérios abaixo:

| Critério | Descrição | Exigência |
|---|---|---|
| `nodeId` | Identificador de node existente na fonte | Obrigatório |
| `exactQuestionText` | Texto exato da pergunta, sem adaptação, resumo ou paráfrase | Obrigatório |
| `nodeOrder` | Ordem do node no fluxo do eixo | Obrigatório |
| `branchCondition` | Condição de ramificação (ex.: SIM/NÃO; resposta que direciona para próximo node ou leaf) | Obrigatório |
| `axis` | Eixo correspondente (P, O ou A) | Obrigatório |
| `canonicalStatus` | Status explícito de canônico/ativo na fonte | Obrigatório |

Se QUALQUER critério estiver ausente, o REAL_TREE_GATE é **FAIL**.

### Condições para FAIL

O REAL_TREE_GATE é **FAIL** nas seguintes situações:

- Nenhuma fonte canônica com node id/texto/ordem está disponível → `REAL_TREE_MISSING`
- A fonte disponível contém apenas resumo, template, backfill ou pergunta inventada → `REAL_TREE_NOT_CANONICAL_FOR_AXIS_DECISION`
- O node ID disponível é placeholder, genérico ou sem correspondência confirmada na fonte primária
- O texto da pergunta foi adaptado, parafraseado ou resumido
- A ramificação do fluxo não está documentada
- O status canônico/ativo não está explicitamente declarado

---

## 2. Árvore Canônica Disponível no Repositório

A fase A4R184-Q identificou a seguinte fonte como candidata a satisfazer o REAL_TREE_GATE:

```
docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md
```

**Status declarado**: `CANONICAL_QUESTION_TREE_ASSET`
**Node ID type**: `TECHNICAL_STABLE_ID` (não é o ID original da fonte Hendy; é ID técnico estável criado para o projeto)
**Fonte primária declarada**: `backend/app/sera/documents/SERA.pdf` + `docs/reference/hendy-sera-2003.txt`

**Nodes identificados** (técnicos estáveis):
- Eixo O: `O_ROOT`, `O_RULES`, `O_ROUTINE`, `O_MANAGED_RISK`
- Eixo P: `P_ROOT`, `P_ASSESSMENT`, `P_CAPABILITY`, `P_TIME_PRESSURE`, `P_INFORMATION_AMBIGUOUS`, `P_INFORMATION_AVAILABLE`
- Eixo A: `A_ROOT`, `A_IMPLEMENTED`, `A_CORRECT`, `A_CAPABILITY`, `A_TIME_PRESSURE`

**Aviso sobre node ID type**: os IDs são técnicos estáveis (`notOriginalSourceId=true`). Para fins de decisão metodológica, a fase A4R185 deve confirmar se esses IDs técnicos estáveis são suficientes ou se a fonte primária (`SERA.pdf`, `hendy-sera-2003.txt`) deve ser consultada diretamente para confirmação de texto e ordem.

---

## 3. Regras Invioláveis para A4R185

As seguintes regras são invioláveis para qualquer fase que produza decisão de eixo:

1. **A4R185 não pode usar perguntas inventadas.** Qualquer pergunta utilizada deve derivar diretamente de um node canônico da árvore SERA (A4R99 ou fonte primária).

2. **A4R185 não pode usar perguntas auxiliares.** Perguntas case-specific criadas para orientar a decisão (como as "perguntas por eixo" do A4R184) não constituem travessia canônica da árvore SERA.

3. **A4R185 não pode adaptar o texto de uma pergunta canônica.** O texto deve ser o texto exato do node, sem paráfrase, resumo ou simplificação.

4. **A4R185 não pode resumir uma pergunta como substituto.** "A tripulação percebeu?" não é substituto de "Avaliação correta ou adequada da situação?" (P_ASSESSMENT).

5. **Qualquer questionPath deve referenciar node IDs reais.** Cada step do questionPath deve especificar o `nodeId` correspondente na árvore canônica.

---

## 4. Status da Árvore Real (resultado de A4R184-Q)

Baseado na busca executada em 2026-05-30:

| Item | Status | Detalhe |
|---|---|---|
| Fonte canônica primária no repositório | REAL_TREE_FOUND | `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` |
| Node IDs com texto/ordem/ramificação/eixo | FOUND_COMPLETE | 15 nodes técnicos estáveis (TECHNICAL_STABLE_ID) com texto PT e EN |
| A4R184 aplica a árvore canônica | NÃO | A4R184 usa perguntas case-specific sem referência a nodeIds |
| REAL_TREE_GATE para A4R184 | FAIL | A4R184 não traversa a árvore canônica |
| REAL_TREE_GATE para A4R185 | REQUER_VERIFICAÇÃO | A4R185 deve confirmar PASS antes de executar |

---

## 5. Checklist Obrigatório para Fases Futuras

Para cada decisão de eixo em qualquer fase futura (A4R185 ou posterior), o seguinte checklist deve ser preenchido:

```
REAL_TREE_GATE: [PASS / FAIL]
canonicalSourcePath: [caminho do arquivo com a árvore canônica]
canonicalSourceConfirmed: [true / false]
axis: [P / O / A]
nodeId: [ID do node canônico]
exactQuestionText: [texto exato da pergunta, sem adaptação]
nodeOrder: [número de ordem no fluxo do eixo]
branchCondition: [condição de ramificação aplicada]
answerSelected: [resposta selecionada para este node]
evidenceRef: [referência factual que suporta a resposta]
authorDecision: [decisão autoral explícita]
```

Se REAL_TREE_GATE=FAIL, a fase deve parar e registrar o motivo.

---

## 6. Bloqueio Explícito

> **Se REAL_TREE_GATE != PASS, a fase A4R185 não pode ser executada.**

Qualquer execução de A4R185 sem REAL_TREE_GATE=PASS é considerada violação metodológica da regra maior da metodologia SERA, conforme documentado no `SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md` e no `SERA_ENGINE_VNEXT_METHODOLOGY_CONTROL_BOARD_A4R135_v0.2.0.md`.
