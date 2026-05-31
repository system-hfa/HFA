# SERA Real Tree Structural Audit A4R185 v0.2.0

Status: STRUCTURAL_AUDIT_COMPLETE
Phase: A4R185-TREE-LOCK
Methodology: SERA
DOCS_ONLY
NO_EVENT_ADJUDICATION
NO_AXIS_DECISION

## 1. Fonte auditada

- Primary source: `docs/sera-vnext/SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md`
- Declared status in source: `CANONICAL_QUESTION_TREE_ASSET`
- Node ID policy in source: `TECHNICAL_STABLE_ID` with `notOriginalSourceId=true`

## 2. Resultado do inventário estrutural

Base: `docs/sera-vnext/real-tree-lock-a4r185/SERA_REAL_TREE_NODE_INVENTORY_A4R185_v0.2.0.csv`

- Total de linhas de node/branch inventariadas: 34
- Eixo O: 7 linhas (4 nodes únicos)
- Eixo P: 13 linhas (6 nodes únicos)
- Eixo A: 14 linhas (5 nodes únicos)

## 3. Quantidade de nodes utilizáveis por eixo

Critério aplicado (`usableForAxisDecision=true`): presença de `nodeId`, `axis`, texto exato PT ou EN, `nodeOrder` e `canonicalStatus`.

- Eixo O utilizável: 7/7
- Eixo P utilizável: 13/13
- Eixo A utilizável: 14/14

## 4. Quantidade de nodes com lacunas

- Linhas com lacuna bloqueadora (`branchCondition` ausente): 0
- Linhas com limitação metodológica relevante: 34
- Tipo de limitação recorrente: `TECHNICAL_STABLE_ID_NOT_ORIGINAL_SOURCE_ID`

## 5. Lacunas e limitações registradas

1. IDs de node são técnicos estáveis, não IDs originais da fonte Hendy (`notOriginalSourceId=true`).
2. O status canônico é explícito no documento (header), mas não há campo row-level separado de governança por node além da tabela de asset.
3. O próprio A4R99 registra divergências/consistências de rotulagem inline no eixo A (nota de divergência de adaptação PT).
4. Guardrail explícito de inexistência de `O-E` ativo exige tratamento de validação downstream para evitar uso indevido.

## 6. Decisão de gate estrutural

`REAL_TREE_GATE=PASS_WITH_LIMITATIONS`

### Justificativa

- A4R99 contém `nodeId`, `axis`, `order`, texto exato PT/EN, opções de resposta e `nextNodeId`/leaf em nível suficiente para travessia controlada futura.
- Há limitação formal de proveniência de ID (`TECHNICAL_STABLE_ID_NOT_ORIGINAL_SOURCE_ID`), portanto não é apropriado declarar PASS pleno sem ressalvas.
- Não foi identificada lacuna bloqueadora de fluxo mínimo por eixo no asset A4R99.

## 7. Declaração de escopo da fase

- Esta fase não executa decisão P/O/A.
- Esta fase não responde nodes.
- Esta fase não cria `questionPath` de eventos.
- Esta fase apenas valida a fonte canônica para uso futuro.
