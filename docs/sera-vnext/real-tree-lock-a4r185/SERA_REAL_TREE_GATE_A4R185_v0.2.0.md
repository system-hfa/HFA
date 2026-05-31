# SERA Real Tree Gate A4R185 v0.2.0

Status: REAL_TREE_GATE_LOCKED
Phase: A4R185-TREE-LOCK
Methodology: SERA

## 1. REAL_TREE_GATE

`REAL_TREE_GATE=PASS_WITH_LIMITATIONS`

## 2. Fonte canônica autorizada

- `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`

## 3. Escopo autorizado

- Preparar travessia futura de eixos P/O/A usando exclusivamente nodes presentes em A4R99.
- Referenciar `nodeId`, pergunta exata e condição de branch documentada.
- Bloquear avanço de eixo quando condição de branch/ancoragem não for satisfatória.

## 4. Escopo proibido

- Executar fechamento definitivo de eixos nesta fase.
- Criar código selecionado/liberado, fixture, baseline ou downstream.
- Usar perguntas auxiliares como substituto de node real.

## 5. Regras obrigatórias de uso futuro

1. Usar somente `nodeId` real/técnico estável presente em A4R99.
2. Usar pergunta exata do node.
3. Não traduzir livremente como substituto.
4. Não resumir pergunta como substituto.
5. Não criar perguntas auxiliares.
6. Não criar `questionPath` se `nodeId` não estiver presente.
7. Se o evento não puder ser percorrido com nodes reais, marcar `AXIS_TREE_TRAVERSAL_BLOCKED`.
8. Se branch não estiver clara, marcar `BRANCH_CONDITION_NOT_EXPLICIT` e não forçar decisão.
9. Qualquer decisão futura deve manter `notFinalClassification=true` até fase própria de release.
10. A4R184 permanece inválido para decisão por eixo até reconstrução com esta árvore.

## 6. Limitações formais registradas

- `nodeIdType=TECHNICAL_STABLE_ID_NOT_ORIGINAL_SOURCE_ID` em todo o asset.
- Deve ser preservada rastreabilidade para fonte primária declarada (Daumas/Hendy) quando necessário.
