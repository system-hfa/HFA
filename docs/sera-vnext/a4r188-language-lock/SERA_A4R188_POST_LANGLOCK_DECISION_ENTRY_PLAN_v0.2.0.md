# SERA A4R188 Post-LANGLOCK Decision Entry Plan v0.2.0

status: ENTRY_PLAN_ACTIVE
phase: A4R188-POST-LANGLOCK
prerequisite: A4R188-PREFLIGHT-LANGLOCK_COMMITTED
locks: NOT_FINAL_CLASSIFICATION | NOT_POA_CLOSURE | NOT_SELECTED_CODE | NOT_FIXTURE | NOT_BASELINE | NOT_DOWNSTREAM
DOCS_ONLY
NO_EVENT_ANALYSIS
NO_AXIS_DECISION

---

## 1. Pré-condições obrigatórias para iniciar A4R188 decisório

A4R188 decisório (preenchimento de authorDecision para os 35 nodes da A4R187) **só pode começar após**:

1. **Commit do pacote A4R188-PREFLIGHT**: todos os arquivos em `docs/sera-vnext/a4r188-preflight-traversal-guardrails/` devem estar commitados e em `origin/main`
2. **Commit do pacote A4R188-LANGLOCK**: todos os arquivos em `docs/sera-vnext/a4r188-language-lock/` devem estar commitados e em `origin/main`
3. **HEAD == origin/main** confirmado antes de iniciar qualquer decisão
4. **Leitura obrigatória antes de decisão** (na sessão em que A4R188 decisório será executado):
   - `SERA_A4R188_PREFLIGHT_TRAVERSAL_GUARDRAILS_v0.2.0.md`
   - `SERA_A4R188_CORRECTED_AUTHOR_DECISION_RECORDING_PLAN_v0.2.0.md`
   - `SERA_BILINGUAL_TERMINOLOGY_AND_TRANSLATION_LOCK_A4R188_v0.2.0.md`
   - `SERA_BILINGUAL_TERMINOLOGY_GLOSSARY_A4R188_v0.2.0.csv`

---

## 2. Fontes a usar em A4R188 decisório

O autor deve usar **exatamente** estas fontes durante a fase decisória:

| Fonte | Papel |
|---|---|
| `SERA_AUTHOR_NODE_DECISION_INTAKE_MATRIX_A4R187_v0.2.0.csv` | Lista dos 35 nodes base com campos para preenchimento |
| `SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` | Fonte única de nodeId e exactQuestionTextPt/EN |
| `SERA_REAL_TREE_NODE_INVENTORY_A4R185_v0.2.0.csv` | Validar que cada nodeId existe antes de usar |
| `SERA_REAL_EVENT_AUTHOR_DECISION_MATRIX_A4R182_v0.2.0.csv` | Escopos de ponto de fuga por evento |
| A4R180 extractions por evento (0001, 0002, 0003, 0006, 0017) | Evidência factual por evento |
| `SERA_A4R188_TRAVERSAL_EXTENSION_POLICY_MATRIX_v0.2.0.csv` | Quando e como criar registros de extensão |
| `SERA_A4R188_EVENT_SPECIFIC_RATIONALE_CHECKLIST_v0.2.0.md` | Checklist de qualidade do rationale por node |
| `SERA_BILINGUAL_TERMINOLOGY_GLOSSARY_A4R188_v0.2.0.csv` | Termos canônicos PT/EN para rationale |
| `SERA_TERMINOLOGY_FORBIDDEN_SYNONYMS_A4R188_v0.2.0.csv` | Termos proibidos — verificar antes de redigir rationale |

---

## 3. Protocolo de uso terminológico em rationale

Para cada `authorDecisionRationale` escrito em A4R188:

### 3.1 Verificação de termos

1. Verificar se o rationale usa algum termo da lista `SERA_TERMINOLOGY_FORBIDDEN_SYNONYMS_A4R188_v0.2.0.csv` (coluna `termOrPattern`)
2. Se houver correspondência: substituir pelo `allowedReplacement` antes de registrar
3. Verificar se o conceito metodológico usa o termo PT canônico do glossário (coluna `canonicalPt`)
4. Para eixo O: confirmar que "Objetivo" está sendo usado no sentido de intenção do operador no ponto de fuga — não no sentido de meta organizacional
5. Para eixo P: confirmar que "Percepção" está referenciada a um node canônico específico — não como awareness genérico
6. Para eixo A: confirmar que "Ação" descreve o que o operador fez no ponto de fuga — não ações de recuperação posteriores

### 3.2 Critério de bloqueio por ambiguidade terminológica

Se aparecer um termo ambíguo no rationale que não possa ser substituído sem alterar o conteúdo factual:

1. Registrar `TERMINOLOGY_REVIEW_REQUIRED: true` no campo de notas do node
2. **Não registrar authorDecision** para este node nesta sessão
3. Descrever o termo ambíguo e o motivo da ambiguidade
4. Escalar para revisão autoral na próxima sessão

### 3.3 Glossário como árbitro

Se houver dúvida sobre o uso correto de qualquer termo metodológico, o glossário `SERA_BILINGUAL_TERMINOLOGY_GLOSSARY_A4R188_v0.2.0.csv` é o árbitro. A coluna `allowedUse` define o uso correto; a coluna `forbiddenSynonymsOrUses` define o que é proibido.

---

## 4. Protocolo de travessia

Seguir o plano corrigido `SERA_A4R188_CORRECTED_AUTHOR_DECISION_RECORDING_PLAN_v0.2.0.md` integralmente. Resumo dos pontos críticos:

1. Para cada node da A4R187: ler A4R180 do evento → identificar fragmentos factuais → registrar authorDecision → escrever rationale factual → verificar se traversal exige extensão
2. Se authorDecision resultar em branch que não é leaf: criar registro de extensão com `intakeId: A4R188-EXT-{NNNN}`
3. Para United 173: declarar `escapePointTemporalBoundary` antes de qualquer node
4. Critério de conclusão: pelo menos 25/35 nodes com decisão ≠ PENDING + todos os eixos de todos os eventos com pelo menos 1 decisão ≠ PENDING

---

## 5. O que A4R188 decisório não pode fazer

- Não fechar P/O/A (poaClosureAllowed=false)
- Não criar código selecionado com status ativo (selectedCodeAllowed=false)
- Não criar código liberado com status ativo
- Não criar fixture, baseline, downstream
- Não abrir HFACS, Risk/ERC, ARMS/ERC, recommendations
- Não inventar nodeId além de A4R99
- Não usar A4R184-Q como fonte de perguntas
- Não usar consequência posterior ao ponto de fuga como causa P/O/A
- Não usar termos proibidos da matriz FORB-001 a FORB-023 em rationale

---

## 6. Locks preservados

```
notFinalClassification=true
poaClosureAllowed=false
selectedCodeAllowed=false
fixturePromotionAllowed=false
baselinePromotionAllowed=false
downstreamAllowed=false
axisClosureAllowed=false
A4R184_QUARANTINE_PRESERVED=true
TERMINOLOGY_LOCK=SERA_BILINGUAL_TERMINOLOGY_AND_TRANSLATION_LOCK_A4R188_v0.2.0.md
```
