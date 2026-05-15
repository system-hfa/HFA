# SERA v0.1.2 — Technical Plan

**Data:** 2026-05-15
**Baseado em:** `docs/SERA_KNOWN_RISKS_v0.1.1.md`, `docs/SERA_EVIDENCE_SUFFICIENCY_AUDIT.md`, `docs/SERA_VALIDATION_v0.1.1.md`

---

## 1. Baseline de Partida

| Item | Valor |
|---|---|
| Tag | `sera-v0.1.1` |
| Commit | `5f45414` |
| Baseline | `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json` |
| Resultado | 162/162 PASS · pass_rate 100% · determinism_rate 100% |
| Provedor | DeepSeek / deepseek-reasoner |

**Regra:** v0.1.2 deve partir da v0.1.1 sem degradar nenhum resultado do baseline. Qualquer alteração no motor, regras, fixtures esperadas, runner ou schema exige novo ciclo de validação completo antes de promover novo baseline.

---

## 2. Objetivo da v0.1.2

v0.1.2 não é expansão de produto nem nova taxonomia. É uma fase de **robustez metodológica**, **cobertura adversarial** e **governança de evidência**.

Objetivos:
1. Cobrir O-C não protetivo com fixtures adversariais.
2. Formalizar política de preconditions.
3. Construir ou completar matriz código-evidência.
4. Definir smoke seletivo para PR/ciclos curtos.
5. Melhorar governança de evidência insuficiente.

---

## 3. Escopo Permitido

- Novos documentos metodológicos e de governança.
- Novas fixtures adversariais e de generalização.
- Ajuste pontual no motor **somente** se fixture nova provar lacuna real e com validação seletiva prévia.
- Ajuste no runner **somente** depois de política de preconditions documentada e aprovada.
- Definição e implementação de smoke seletivo (lista de fixtures + comando).
- Smoke global apenas no fechamento da v0.1.2.

---

## 4. Escopo Proibido

- Não alterar `tests/reports/baseline/sera-baseline-v0.1.1-smoke.json`.
- Não alterar taxonomia P/O/A/ERC sem decisão explícita e documentada.
- Não alterar site, produto, auth ou API.
- Não alterar schema de banco ou migrations.
- Não reescrever o motor de forma ampla — apenas gates cirúrgicos quando fixtures provar necessidade.
- Não alterar `expected` labels de fixtures existentes para fazer testes passarem.
- Não rodar correções automáticas de IA sem revisão humana dos diffs.
- Não rodar smoke global sem mudança testável consolidada.

---

## 5. Prioridade A — Cobertura de O-C Não Protetivo

### Contexto

O-C não exige proteção humana — proteção humana é apenas um exemplo possível de motivação. v0.1.1 passou nos casos O-C protetivos (TEST-O-C-001, TEST-O-C-002, TEST-GEN-OC-001 a 003), mas não testou O-C com outras motivações.

**Risco remanescente:** o gate `hasConsciousObjectiveDeviationEvidence` (patch `4367228`) pode ser restritivo demais lexicalmente para relatos de O-C não protetivo que usem vocabulário diferente dos padrões actuais.

**Objetivo:** criar cobertura de fixtures antes de tocar no motor.

### Fixtures Propostas

#### TEST-GEN-OC-NP-001 — Conveniência pontual

**Intenção:** operador desvia conscientemente de procedimento por conveniência, sem proteção humana e sem normalização cultural.
**Expected preliminar:** P-A / O-C / A-B / ERC 2
**Evidência positiva exigida:** o relato deve deixar claro que o operador conhecia o procedimento correto e escolheu deliberadamente não segui-lo por ser mais conveniente naquele momento, sem justificativa externa forçada.
**Armadilha metodológica:** não confundir com O-D (eficiência como objetivo primário sistêmico) — O-C é pontual, não é estratégia operacional.
**Critério PASS:** motor retorna O-C, não O-A, em 3/3 runs.

#### TEST-GEN-OC-NP-002 — Improviso consciente não emergencial

**Intenção:** operador improvisa fora do procedimento em situação não emergencial, por julgamento próprio, não por restrição externa.
**Expected preliminar:** P-A / O-C / A-A ou A-B / ERC 2
**Evidência positiva exigida:** o relato deve indicar que o operador avaliou a situação e optou conscientemente por não seguir o protocolo padrão, sem que nenhuma circunstância externa tornasse o protocolo inaplicável.
**Armadilha metodológica:** não confundir com O-A (objetivos legítimos sob restrição externa) — se a restrição foi imposta de fora, é O-A.
**Critério PASS:** motor retorna O-C, não O-A ou O-D, em 3/3 runs.

#### TEST-GEN-OC-NP-003 — Descumprimento por pressão situacional sem normalização

**Intenção:** operador descumpre procedimento por pressão de tempo auto-imposta (não imposta por hierarquia ou falha externa), de forma pontual e não rotineira.
**Expected preliminar:** P-A / O-C / A-B / ERC 2
**Evidência positiva exigida:** o relato deve indicar que a pressão foi interna/auto-imposta, o procedimento era conhecido, o descumprimento foi pontual e não há histórico de normalização pela equipe.
**Armadilha metodológica:** não confundir com O-B se o desvio for rotineiro/normalizado culturalmente; não confundir com O-A se a pressão for externa (deadline imposto, ferramenta indisponível).
**Critério PASS:** motor retorna O-C, não O-A ou O-B, em 3/3 runs.

#### TEST-GEN-OC-NP-004 — Atalho consciente fora de procedimento

**Intenção:** operador escolhe atalho fora do procedimento padrão por convicção própria de que é equivalente, sem motivação protetiva e sem cultura de normalização.
**Expected preliminar:** P-A / O-C / A-B / ERC 2
**Evidência positiva exigida:** o relato deve mostrar que o operador tomou decisão deliberada de substituir etapa do procedimento, conhecia a alternativa padrão e considerou o atalho suficiente naquele contexto específico.
**Armadilha metodológica:** distinguir de O-D (o atalho não é motivado por eficiência primária sistêmica, mas por julgamento situacional pontual).
**Critério PASS:** motor retorna O-C, não O-A ou O-D, em 3/3 runs.

#### TEST-GEN-OC-NP-005 — Adversarial O-A: parece O-C mas não é

**Intenção:** fixture negativa — operador age de forma aparentemente incomum mas sem desvio consciente de regra conhecida (desconhece procedimento correto ou age sob restrição externa).
**Expected preliminar:** P-C ou P-H / O-A / A-E ou A-A / ERC 3
**Evidência positiva exigida:** o relato deve conter evidência de que o operador não sabia que estava descumprindo protocolo ou que a restrição veio de fora (ferramenta, informação, ordem).
**Armadilha metodológica:** testar se o gate de desvio consciente rejeita corretamente O-C quando há lacuna de conhecimento ou restrição externa.
**Critério PASS:** motor retorna O-A, não O-C, em 3/3 runs.

---

## 6. Prioridade B — Política de Preconditions

### Problema

O runner calcula `precondition_recall` internamente, mas o `overall` de uma fixture é determinado por P/O/A/ERC. Scores de preconditions podem ser PARTIAL/FAIL em runs individuais sem impactar o resultado global — o que foi aceito na v0.1.1 por ausência de política formalizada.

### Decisões a Tomar (antes de qualquer ajuste no runner)

1. `top_preconditions` é lista estrita ou conjunto de referência mínimo?
2. Recall parcial (seleciona subset correto mas incompleto) deve ser suficiente?
3. Quando FAIL de preconditions bloqueia o `overall`?
4. Há grupos de preconditions obrigatórios vs. opcionais por tipo de fixture?
5. Há severidade por tipo de precondition (P1/P2 fisiológico/psicológico vs. organizacionais)?
6. O runner precisa de campo separado `precondition_status` além do `overall`?

### Proposta Inicial (para discussão)

- Manter `overall` primário baseado em P/O/A/ERC até política aprovada.
- Tratar preconditions como métrica secundária: reportar `precondition_recall` mas não promover para bloqueio de release automaticamente.
- Criar relatório separado de `precondition_recall` no output do runner para visibilidade.
- Só bloquear release por precondition quando houver regressão em fixtures explicitamente marcadas como `precondition-critical` em seus metadados.
- **Não alterar o runner antes de a política ser documentada e aprovada.**

---

## 7. Prioridade C — Matriz Código-Evidência

### Estado Atual

`docs/SERA_CODE_EVIDENCE_MATRIX.md` existe mas está incompleto. A auditoria `SERA_EVIDENCE_SUFFICIENCY_AUDIT.md` identificou lacunas de cobertura de evidência por código, especialmente em preconditions P1/P2 e nas fronteiras entre códigos de ação.

### Plano para o Documento

Para cada código (P-A a P-H; O-A a O-D; A-A a A-J; ERC 1-4; principais preconditions), definir:

| Campo | Descrição |
|---|---|
| Evidência positiva | Padrões lexicais/semânticos que confirmam o código |
| Evidência negativa | Padrões que excluem o código (falso positivo) |
| Evidência insuficiente | Quando pedir complemento, não classificar |
| Perguntas complementares | 2-3 perguntas para coleta adicional |
| Falsos positivos comuns | Casos que parecem o código mas não são |
| Falsos negativos comuns | Casos que têm o código mas não são capturados |
| Fallback conservador | Qual código usar em caso de dúvida |

### Prioridade de Preenchimento

1. O-C (crítico — fronteira com O-A é o principal risco ativo).
2. O-A / O-B (fronteira O-B vs. O-D; fronteira O-A vs. O-C restrição externa).
3. P-G / P-A (fronteira over-match identificada em L3-01 da auditoria).
4. A-B / A-C (fronteira omissão vs. checagem própria).
5. Preconditions P1/P2 (risco de invenção de base identificado em L6-03).

---

## 8. Prioridade D — Smoke Seletivo

### Três Níveis Propostos

| Nível | Fixtures | Runs | Uso |
|---|---|---|---|
| `smoke-fast` | 12–15 | 1 | Gate de PR, validação rápida de patch |
| `smoke-focused` | Fixtures afetadas + vizinhas | 3 | Validação de patch metodológico |
| `smoke-release` | 54+ | 3 | Promoção de baseline |

### Composição Sugerida para `smoke-fast`

| Grupo | Fixtures | Objetivo |
|---|---|---|
| Percepção | TEST-P-D-001, TEST-P-H-001 | Fronteira P/O (restrição externa vs. desvio) |
| Objetivo O-C | TEST-O-C-001, TEST-GEN-OC-001 | O-C protetivo — sem regressão |
| Objetivo O-B/O-D | TEST-O-B-001, TEST-O-D-001 | Fronteira O-B/O-D — sem regressão |
| Ação | TEST-A-C-001 (ou similar), TEST-A-B-001 | Fronteira A-B/A-C |
| Combo | TEST-COMBO-001, TEST-COMBO-003 | Múltiplos steps |
| Adversarial O-A | TEST-GEN-OC-NP-005 (nova) | Falso O-C rejeitado corretamente |
| ERC | 1 fixture ERC baixa severidade | ERC sem regressão |
| Evidência bruta | 1 fixture raw evidence | Dado incompleto aceito |

**Implementação:** adicionar flag `--smoke-fast` ao runner ou criar lista em `tests/sera/smoke-fast.json`. Não alterar runner antes da política de preconditions.

---

## 9. Sequência de Commits v0.1.2

1. `docs(sera): plan v0.1.2 robustness cycle`
2. `test(sera): add O-C non-protective fixtures (NP-001 a NP-005)`
3. `docs(sera): define precondition scoring policy`
4. `test(sera): mark precondition-critical fixtures`
5. `docs(sera): complete code evidence matrix O-C and O-A`
6. `fix(sera): adjust objective guard if fixtures prove gap` *(somente se necessário)*
7. `test(sera): add smoke-fast fixture selector`
8. `docs(sera): record v0.1.2 validation`

---

## 10. Critérios de Aceite v0.1.2

| Critério | Obrigatório |
|---|---|
| Baseline v0.1.1 não regredir | Sim |
| O-C protetivo continuar PASS (TEST-O-C-001, TEST-O-C-002, TEST-GEN-OC-001 a 003) | Sim |
| O-C não protetivo passar (TEST-GEN-OC-NP-001 a 004) | Sim |
| Adversarial O-A não virar O-C (TEST-GEN-OC-NP-005) | Sim |
| O-B e O-D sem regressão | Sim |
| Política de preconditions documentada | Sim |
| Smoke-fast definido e funcional | Sim |
| Smoke global final com 3 runs no fechamento | Sim — antes de promover baseline v0.1.2 |

---

## 11. Riscos da v0.1.2

| Risco | Mitigação |
|---|---|
| Overfitting em fixtures novas | Adversariais negativas (NP-005) + revisão humana de expected |
| Gate O-C lexicalmente restritivo demais | Criar fixtures positivas com vocabulário diverso antes de tocar no gate |
| Expansão de escopo não planejada | Escopo explícito neste documento; qualquer adição requer decisão |
| Custo de smoke global | Smoke-fast para iteração; smoke global apenas no fechamento |
| Divergência entre docs e runtime | Matriz código-evidência deve refletir o motor real, não aspiração |
| Alteração indevida de expected labels | Proibido explicitamente — expected só muda com decisão metodológica |
| Confusão entre métrica de precondition e overall | Não promover regressão de precondition para bloqueio sem política aprovada |

---

## 12. Não Fazer Agora

- Não mexer no produto/site.
- Não alterar baseline v0.1.1.
- Não criar nova taxonomia.
- Não alterar o runner antes de a política de preconditions estar documentada.
- Não adicionar fixtures sem expected claro e fundamentado.
- Não rodar smoke global até haver mudança testável consolidada.
- Não usar correção automática de IA sem revisão humana dos diffs.
- Não criar fixtures sem considerar o adversarial correspondente (teste negativo).
