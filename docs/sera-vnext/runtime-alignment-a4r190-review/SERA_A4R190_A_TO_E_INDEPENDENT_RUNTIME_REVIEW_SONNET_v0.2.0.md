# SERA A4R190 A-to-E Independent Runtime Audit — Sonnet v0.2.0

Auditor: Claude Sonnet 4.6 (independent pass)
Date: 2026-05-30
Branch: main
HEAD: a26952099f6af68fcec5b4e318aaf479b9dbe4ed
origin/main: a26952099f6af68fcec5b4e318aaf479b9dbe4ed
Git state: clean (untracked tmp/ and source-corpus only; no staged/modified files)

---

## 1. Veredito Geral

**PASS_WITH_WARNINGS**

Nenhum BLOCKER identificado. Um achado HIGH (risco de integração futura com UI). Dois achados MEDIUM. Quatro achados LOW. A4R190-F pode começar.

---

## 2. Resultado dos Testes

| Teste | Resultado |
|---|---|
| canonical-tree-trial-001 | PASS |
| canonical-codes-trial-001 | PASS |
| canonical-code-enforcement-trial-001 | PASS |
| oe-nonexistent-normalization-trial-001 | PASS |
| canonical-traversal-skeleton-trial-001 | PASS |
| canonical-traversal-adapter-trial-001 | PASS |
| adversarial-set-2-contract-trial-001 | PASS |
| code-release-gate-trial-001 | PASS |
| code-traceability-trial-001 | PASS |
| dry-run-trial-001 | PASS |
| dry-run-trial-set-1 | PASS |
| evidence-categories-passive-trial-001 | PASS |
| evidence-category-coverage-trial-001 | PASS |
| manual-classification-trial-001 | PASS |
| preconditions-from-released-codes-trial-001 | PASS |
| preconditions-traceability-refinement-trial-001 | PASS |
| semantic-consistency-released-codes-trial-001 | PASS |

**Suite completa: 17/17 PASS**

---

## 3. Resultado do Typecheck

```
cd frontend && npx tsc --noEmit
(sem saída = sem erros)
```

**TypeScript: PASS — zero erros**

---

## 4. Respostas Diretas às Perguntas de Auditoria

### Q1 — O runtime A4R190-A/E usa efetivamente a árvore canônica real por nodeId?

**SIM.** `canonical-tree.ts` define `SERA_CANONICAL_TREE_NODES` com exatamente 34 rows sourced em A4R99, cada uma com `nodeInventoryId` (A4R185-NINV-0001 a 0034) e `nodeId` real (P_ROOT, O_RULES, A_IMPLEMENTED, etc.). O engine de travessia (`canonical-traversal.ts`) constrói `CANONICAL_TRAVERSAL_NODE_INDEX` exclusivamente a partir desses nodes. Toda travessia é feita por `nodeId`. `assertCanonicalTreeInventoryInvariants()` valida contagens (P=13, O=7, A=14) em runtime. Nenhum nó fantasma ou ID inventado encontrado.

---

### Q2 — Há qualquer pergunta inventada, auxiliar, local, P-1/P-2/O-1/A-1 ou case-specific question no runtime novo?

**NÃO.** Todos os campos `exactQuestionTextPt` e `exactQuestionTextEn` em `canonical-tree.ts` foram copiados literalmente de A4R99. Não há perguntas auxiliares, resumidas, ou case-specific no runtime. O engine de travessia nunca sintetiza texto de pergunta — apenas repassa os campos canônicos do node. Verificado com inspeção linha a linha de `canonical-tree.ts` vs A4R99.

---

### Q3 — O runtime preserva exactQuestionTextPt/exactQuestionTextEn sem reescrever a árvore?

**SIM.** Campos são armazenados verbatim. `getCanonicalQuestionText(node, locale)` é função de leitura pura. O skeleton test verifica explicitamente que `pRootStep.exactQuestionTextPt === pRoot.exactQuestionTextPt` e `pRootStep.exactQuestionTextEn === pRoot.exactQuestionTextEn`. Nenhuma transformação, truncamento ou normalização de texto de pergunta foi encontrado no runtime.

---

### Q4 — O adapter A4R190-E consegue simular travessia sem fechar P/O/A?

**SIM.** Todo output do adapter tem `selectedCodeAllowed: false`, `releasedCodeAllowed: false`, `poaClosureAllowed: false`, `downstreamAllowed: false`, `finalConclusionAllowed: false`. A função `assertAdapterOutputLocks()` verifica todos esses campos, incluindo ausência dos campos `selectedCode`, `releasedCode` e `finalConclusion` no objeto. O test case 9 do adapter-trial aplica `assertAdapterOutputLocks` e `assertCandidateOnlyLocks` em todos os 8 cenários.

---

### Q5 — O skeleton A4R190-D e o adapter A4R190-E conseguem chegar a leaf sem emitir selectedCode/releasedCode/CLASSIFIED?

**SIM.** Ao chegar em leaf, o skeleton retorna `status: 'LEAF_REACHED_NOT_CLASSIFIED'` com `leafCandidate` tendo `selectedCodeAllowed: false` e `releasedCodeAllowed: false`. O adapter retorna `status: 'TRAVERSAL_SIMULATED_LEAF_REACHED_NOT_CLASSIFIED'`. A função `assertNoFinalClassification()` verifica ausência de `selectedCode`, `releasedCode` e `finalConclusion` em qualquer output. Os skeleton test cases 5, 6, 7 e 8 verificam isso explicitamente para P-A, O(non-O-E), A-A e P genérico.

---

### Q6 — O-E está completamente bloqueado como NON_EXISTENT_IN_SERA_PT_V1?

**SIM, em múltiplas camadas:**

1. **Type layer:** `CanonicalObjectiveLeafCode = 'O-A' | 'O-B' | 'O-C' | 'O-D'` — O-E excluído em compile time.
2. **Allowlist layer:** `SERA_CANONICAL_OBJECTIVE_LEAF_CODES` não inclui O-E.
3. **Non-existent layer:** `SERA_CANONICAL_NON_EXISTENT_CODES = ['O-E']` e `SERA_CANONICAL_FORBIDDEN_CODES = ['O-E']`.
4. **Assertion layer:** `assertCanonicalSeraLeafCode('O', 'O-E')` lança `NON_EXISTENT_IN_SERA_PT_V1`.
5. **Traversal layer:** `validateCanonicalTraversalAnswer` rejeita O-E como answer inválida em qualquer node.
6. **Human decision layer:** `validateHumanAxisDecision` com `proposedCode='O-E'` retorna `valid: false` com mensagem `NON_EXISTENT_IN_SERA_PT_V1`.
7. **Traceability layer:** `buildReleasedCodeTraceability` define `status='NON_EXISTENT_CODE'` e warning `NON_EXISTENT_IN_SERA_PT_V1` para O-E.
8. **Preconditions layer:** `derivePreconditionsFromReleasedCodes` bloqueia O-E com `NON_EXISTENT_IN_SERA_PT_V1`.
9. **Adapter layer:** injeção de O-E como answerValue retorna `TRAVERSAL_BLOCKED_BY_INVALID_ANSWER`.

---

### Q7 — Há algum caminho ativo que ainda aceite O-E, mesmo indiretamente?

**NÃO para caminho ativo.** Todos os 5 pontos de entrada possíveis (travessia, proposta humana, traceabilidade, precondições, cobertura de evidências) bloqueiam ou marcam O-E como NON_EXISTENT.

**Observação MEDIUM (veja achado M-001):** O tipo `HumanValidatedAxisClassification.releasedCode` é `string | null` em vez de `CanonicalSeraLeafCode | null`. Isso permite que O-E apareça em um objeto `CodeReleaseGateResult` sem erro de compilação. O bloqueio acontece nas camadas downstream (traceabilidade e precondições), não no próprio gate. Por design, o gate aceita o resultado como input de teste e as camadas downstream corrigem. Não é um caminho "ativo" de aceitação, mas é uma ausência de bloqueio compile-time no boundary do gate.

---

### Q8 — Há divergência entre canonical-codes.ts e canonical-tree.ts?

**NÃO.** Alinhamento perfeito verificado:
- P: P-A…P-H (8 leaf codes) — canonical-tree.ts tem exatamente 8 transições LEAF para eixo P, para esses 8 codes.
- O: O-A…O-D (4 leaf codes) — canonical-tree.ts tem exatamente 4 transições LEAF para eixo O, para esses 4 codes. O-E ausente em ambos.
- A: A-A…A-J (10 leaf codes) — canonical-tree.ts tem exatamente 10 transições LEAF para eixo A, para esses 10 codes.

O engine de travessia aplica `assertCanonicalSeraLeafCode(axis, leafCode)` ao processar transições LEAF — qualquer divergência futura seria capturada como `AXIS_TRAVERSAL_BLOCKED`.

---

### Q9 — Há divergência entre A4R99/A4R185 e o modelo runtime A4R190-A?

**NÃO.** Verificado row a row:
- 34 nodes numerados A4R185-NINV-0001 a 0034 presentes em `canonical-tree.ts`.
- Todos os `nodeId`, `branchCondition`, `nextNodeId`, `leafCode`, `exactQuestionTextPt`, `exactQuestionTextEn` batem com A4R99.
- Distribuição P=13, O=7, A=14 confirmada por `assertCanonicalTreeInventoryInvariants()`.
- Nodes ROOT com `branchCondition: 'START'` presentes para P, O e A.
- Nenhum node extra ou modificado encontrado.

---

### Q10 — Há risco de o adapter aceitar answerValue fora das opções reais do node?

**RISCO BAIXO / controlado.** O adapter chama `validateCanonicalTraversalAnswer(decision.nodeId, decision.answerValue)` antes de aceitar qualquer decisão. A validação verifica que o `answerValue` (após `.trim()`) coincida exatamente com um dos `branchCondition` canônicos do node. Respostas inválidas resultam em `TRAVERSAL_BLOCKED_BY_INVALID_ANSWER`. Testado em adapter-trial case 7 e skeleton-trial case 3.

**Achado LOW (L-001):** O adapter faz `.trim()` mas não `.toUpperCase()`. Os `branchCondition` do tree são case-sensitive (ex: "SIM", "NÃO", "NÃO_SENSORIAL"). Um integrador que passe "sim" ao invés de "SIM" receberá `INVALID_ANSWER`. Isso é comportamento correto mas pode surpreender integradores futuros. Documentar no A4R190-F.

---

### Q11 — Há risco de traversal incompleto ser interpretado como leaf ou decisão final?

**NÃO.** Traversal incompleto retorna `NEXT_NODE_READY`, `TRAVERSAL_EXTENSION_REQUIRED` ou `NODE_PENDING` — nunca `LEAF_REACHED_NOT_CLASSIFIED`. O adapter mapeia corretamente para `TRAVERSAL_INCOMPLETE_EXTENSION_REQUIRED`. A função `assertNoFinalClassification` verifica que nenhum output incompleto tem campos de classificação final. Testado em skeleton-trial case 9 e adapter-trial case 4.

---

### Q12 — Há risco de o front-end futuro usar leaf reached como classificação final?

**RISCO HIGH (H-001).** O objeto `CanonicalTraversalLeafCandidate` expõe `leafCode: CanonicalSeraLeafCode` diretamente. Embora `selectedCodeAllowed: false` e `releasedCodeAllowed: false` sejam garantias passivas, esses campos NÃO podem impedir tecnicamente que um front-end leia `leafCandidate.leafCode` e o apresente como resultado ao usuário.

O runtime não tem mecanismo ativo (ex: campo opaco, função de acesso protegida) que impeça uso direto do `leafCode`. A proteção é documental e por convenção, não estrutural. Isso deve ser endereçado em A4R190-F com documentação explícita de integration contract e possivelmente um accessor pattern ou wrapper type que sinalize o estado candidato sem expor o código diretamente.

---

### Q13 — O bilingual lock PT/EN está respeitado no runtime ou há lógica dependente de idioma?

**SIM, completamente respeitado.** A lógica de travessia é puramente baseada em `nodeId` e `branchCondition` — language-agnostic. Os campos `exactQuestionTextPt` e `exactQuestionTextEn` são exclusivamente para display. `getCanonicalQuestionText(node, locale)` é função de leitura sem efeito em traversal. Nenhuma lógica de negócio no runtime depende de idioma. Conforme com A4R188 bilingual lock.

---

### Q14 — Os testes atuais cobrem os principais caminhos P/O/A, extensão, bloqueio autoral, node inválido e answer inválido?

**SIM para caminhos principais.** Cobertura atual:
- P leaf (P-A): skeleton-trial #5, adapter-trial #1 ✓
- O leaf (O-A): adapter-trial #2, skeleton-trial #6 ✓
- A leaf (A-A): skeleton-trial #7, adapter-trial #3 ✓
- O-E bloqueado: adapter-trial #8, skeleton-trial #6, oe-nonexistent-trial ✓
- Extension required: adapter-trial #4, skeleton-trial #9 ✓
- Blocked by author: adapter-trial #5 ✓
- Invalid node: adapter-trial #6, skeleton-trial #4 ✓
- Invalid answer: adapter-trial #7, skeleton-trial #3 ✓
- Lock assertions: adapter-trial #9 ✓
- Escape point scope passivo: skeleton-trial #10 ✓

**Lacunas (veja Q15).**

---

### Q15 — Quais testes ainda faltam antes de integrar o traversal com fluxo real ou UI?

Testes ausentes identificados (candidatos para A4R190-F ou G):

| Cenário | Prioridade |
|---|---|
| Per-leaf path coverage para cada um dos 19 leaf codes não testados (P-B..P-H, O-B..O-D, A-B..A-J exceto A-A) | MEDIUM |
| Cross-axis injection no adapter (node de eixo O sendo passado como eixo P) | HIGH |
| Multi-axis batch simultâneo (P+O+A no mesmo `buildCanonicalTraversalFromNodeDecisions`) | MEDIUM |
| intakeNodeIds com múltiplos cenários de extensão por eixo | MEDIUM |
| Adapter com `approvedEscapePointScope` passivo (não deve bloquear) | LOW |
| Traversal com `answerValue` com espaço extra (whitespace trim) | LOW |
| Tentativa de injeção de `leafCode` diretamente via answerValue (ex: "P-A" como answerValue no node P_ASSESSMENT) | HIGH |

---

### Q16 — O escape point scope ainda está apenas passivo? Isso está seguro?

**SIM, passivo e seguro para esta fase.** `ApprovedEscapePointScope` é aceito como parâmetro opcional, armazenado apenas como `approvedEscapePointScopeAccepted: Boolean(input.approvedEscapePointScope)`, não influencia path de travessia, não abre downstream, não fecha eixos, não altera status. O skeleton-trial #10 confirma que scope aceito não bloqueia travessia. Para A4R190-D/E, essa postura é correta.

**Observação MEDIUM (M-002):** O campo `approvedEscapePointScopeAccepted` no output é o único registro de que um scope foi fornecido. Não há log de qual `scopeId` foi passado, nem validação de que o `scopeStatement` faz sentido para o eixo em curso. Quando o scope passar a ser enforced em fases futuras, será necessário adicionar auditoria do scopeId.

---

### Q17 — A4R190-F deve avançar agora ou há correções obrigatórias antes?

**A4R190-F pode começar.** Critérios de entrada A4R190-F conforme SERA_A4R190_F_READINESS_PLAN:
- A4R190-E adapter trial: PASS ✓
- Full `tests/sera-vnext/*.ts` suite: 17/17 PASS ✓
- Frontend typecheck: PASS ✓
- No protected-path tracked modifications: confirmado ✓

Nenhum BLOCKER identificado. Os achados H-001, M-001, M-002 devem ser endereçados durante A4R190-F (não impedem início), com H-001 sendo obrigatório antes de qualquer integração produtiva ou UI.

---

### Q18 — Há algo que exige Opus antes de continuar?

**NÃO.** A4R190-F conforme definido (intake normalization utilities, richer audit traces, stricter extension diagnostics, candidato-only locks inalterados) é escopo determinístico de engenharia. Sonnet 4.6 é adequado. Opus seria warranted apenas se A4R190-F incluísse decisões semânticas de metodologia SERA, ambiguidade de boundary do escape point, ou design de novos comportamentos de classificação — nada disso está no escopo de F como definido.

---

## 5. Achados Classificados

### HIGH

#### H-001 — `leafCode` em `CanonicalTraversalLeafCandidate` exposto sem barreira estrutural

**Risco:** Um front-end pode ler `output.leafCandidate.leafCode` e apresentá-lo como classificação final. Os campos `selectedCodeAllowed: false` e `releasedCodeAllowed: false` são verificações passivas, não barreiras de acesso. O `leafCode` é um `CanonicalSeraLeafCode` tipado publicamente.

**Impacto:** Classificação prematura ou indevida ao usuário sem passar pelo release gate.

**Recomendação para A4R190-F:** Adicionar integration contract explícito documentando que `leafCode` em `LEAF_REACHED_NOT_CLASSIFIED` é candidato não-liberado. Considerar accessor pattern ou branded type que sinalize o estado candidato. Mínimo: warning explícito no JSDoc do campo `leafCandidate`.

**Status:** Deve ser endereçado antes de integração produtiva.

---

### MEDIUM

#### M-001 — `HumanValidatedAxisClassification.releasedCode` tipado como `string | null` em vez de `CanonicalSeraLeafCode | null`

**Risco:** O-E pode aparecer em `CodeReleaseGateResult.axisReleases[].releasedCode` sem erro de compilação. O bloqueio de O-E acontece nas camadas de traceabilidade e precondições downstream, não no gate.

**Impacto:** Um integrador do gate poderia montar um `CodeReleaseGateResult` com O-E como `releasedCode` e o TypeScript não reclamaria no ponto de construção. O runtime downstream bloqueia corretamente, mas a proteção compile-time está ausente no boundary.

**Recomendação:** Mudar o tipo de `releasedCode` para `CanonicalSeraLeafCode | null` em `HumanValidatedAxisClassification`. Isso eliminaria a possibilidade de O-E aparecer com compile-time acceptance.

---

#### M-002 — `approvedEscapePointScope` aceito sem log de scopeId ou validação de relevância

**Risco:** Quando escape point for enforced em fases futuras, a rastreabilidade do scope aplicado estará ausente no output atual.

**Recomendação para A4R190-F:** Adicionar `acceptedScopeId?: string` ao output quando scope for provido, para rastreabilidade futura.

---

### LOW

#### L-001 — Case sensitivity de `answerValue` não documentada para integradores

**Risco:** Um integrador que passe "sim" ao invés de "SIM" receberá `INVALID_ANSWER`. Correto por design, mas pode causar confusão.

**Recomendação:** Documentar no contrato de integração de A4R190-F que `answerValue` deve ser o `branchCondition` exato do node (case-sensitive, com diacríticos PT).

---

#### L-002 — `lastStep?.status === 'NEXT_NODE_READY'` spread desnecessário em `runCanonicalAxisTraversal`

**Arquivo:** `canonical-traversal.ts` linha 473.

**Observação:** O condicional `...(lastStep?.status === 'NEXT_NODE_READY' ? { nextNodeId: expectedNodeId } : {})` é sempre `true` quando o código pós-loop é alcançado (porque se `lastStep` não fosse `NEXT_NODE_READY`, o loop teria retornado antecipadamente). Não é um bug — o comportamento está correto — mas o código é defensivo desnecessariamente.

**Recomendação:** Simplificar para `nextNodeId: expectedNodeId` ou adicionar comentário explicando o invariante.

---

#### L-003 — Cobertura de testes por leaf individual incompleta

**Faltam:** testes individuais para P-B, P-C, P-D, P-E, P-F, P-G, P-H, O-B, O-C, O-D, A-B, A-C, A-D, A-E, A-F, A-G, A-H, A-I, A-J como target leaf nas trials de traversal.

**Recomendação:** Adicionar `canonical-traversal-all-leaves-trial-001.ts` em A4R190-F cobrindo todos os 22 leaf codes restantes.

---

#### L-004 — Cross-axis node injection não testado no adapter

**Faltam:** testes onde um node de eixo O é injetado com `axis: 'P'` no adapter, e onde o `answerValue` é um `leafCode` literal (ex: "P-A") injetado como branch answer.

**Recomendação:** Adicionar em `canonical-traversal-adapter-trial-001.ts` ou novo arquivo de adversarial trials.

---

### FALSE_POSITIVE

#### FP-001 — Aparência de O-E no pipeline de code-traceability

**Observação aparente:** `buildReleasedCodeTraceability` processa O-E e inclui steps com texto referenciando O-E em `buildBaseDerivationPath`.

**Por que é falso positivo:** Isso é por design — o código trata O-E como input negativo de controle, aplica status `NON_EXISTENT_CODE`, e emite warning `NON_EXISTENT_IN_SERA_PT_V1`. O O-E não é "aceito" — é registrado com a marcação correta. Testado em `oe-nonexistent-normalization-trial-001.ts`.

---

#### FP-002 — `assertCanonicalTreeInventoryInvariants()` não chamada automaticamente

**Observação aparente:** A função existe mas não é chamada no module initialization, apenas nos testes.

**Por que é falso positivo:** Esta é uma função de teste/auditoria, não uma verificação de runtime produtivo. Chamar no module init causaria overhead desnecessário em produção. O test trial chama explicitamente.

---

## 6. Confirmação de Não-Modificação

- Nenhum arquivo de código modificado.
- Nenhum arquivo de doc modificado.
- Nenhum `git add` executado.
- Nenhum commit criado.
- Nenhum push executado.
- Único arquivo criado nesta auditoria: este relatório em `docs/sera-vnext/runtime-alignment-a4r190-review/` (diretório novo, não rastreado antes).

---

## 7. Resumo Executivo

O runtime SERA vNext após A4R190-A/B/C/D/E está metodologicamente alinhado com a árvore canônica real. Nenhuma pergunta inventada, nenhum O-E ativo, nenhum fechamento prematuro de P/O/A, nenhum downstream aberto. O-E tem proteção em 9 camadas independentes. A travessia por nodeId é fiel ao A4R99/A4R185. O bilingual lock é respeitado. Todos os 17 testes passam. TypeScript sem erros.

O único risco que requer atenção antes de integração com UI é o **H-001**: o campo `leafCode` em `CanonicalTraversalLeafCandidate` é tecnicamente acessível por código de front-end sem barreira estrutural. Deve ser endereçado com documentação explícita de integration contract ou accessor pattern antes de qualquer integração produtiva.

**A4R190-F pode começar. Opus não é necessário.**
