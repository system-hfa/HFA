# Auditoria de Coerência Metodológica — Daumas / Hendy / SERA vNext (A4R202-OPUS-2)

Date: 2026-06-02
Phase: A4R202-OPUS-2
Auditor: Claude Opus (independente)
Status: METHODOLOGY_COHERENCE_PASS_WITH_WARNINGS
Locks: NO_FINAL_P_O_A, NO_FINAL_ESCAPE_POINT_APPROVAL, NO_READY_PROMOTION, NO_SELECTED_CODE, NO_RELEASED_CODE, NO_FINAL_CONCLUSION, NO_CLASSIFIED_OUTPUT, NO_FIXTURE, NO_BASELINE, NO_PRODUCT, NO_HFACS, NO_RISK_ERC, NO_ARMS_ERC, NO_RECOMMENDATIONS

---

Auditor independente. Escopo read-only. Nenhuma classificação P/O/A, aprovação de ponto de fuga, promoção READY ou criação de artefato metodológico foi produzida (confirmação formal na Seção 8).

Base primária lida: Hendy DRDC TR 2002-057 (pp. 1–14 do corpo, incl. "Departure from safe operation", "Why did they do that?", Fig. 3/4/5, 12 active failures); A4R168 Daumas↔vNext mapping; A4R191-A escape-point scope contract; A4R200-A synthetic-fill policy + selection criteria; A4R202-A deep-extraction summary + human-analysis sufficiency matrix; A4R202-B candidate review + Colgan re-audit; A4R202-C questionnaire; A4R202-D author intake; A4R192 candidate-only closure readiness. Nota: o "SERA method contract v0.1.4" não está presente no repo — auditado contra os contratos disponíveis (A4R191-A, A4R199-A gate, A4R200-A).

---

## 1. Veredito geral

**METHODOLOGY_COHERENCE_PASS_WITH_WARNINGS**

O núcleo metodológico de Hendy (ponto de fuga = *departure from safe operation*; três perguntas Goal/Perception/Action; ator direto; separação active-failure/pre-condition; foco na falha ativa e não no outcome) está **preservado e rastreável** na arquitetura atual. A trilha Daumas está usada corretamente como referência humana/MDC e **não** como fonte factual ou reentry automático. Os locks (P/O/A final, ponto de fuga final, READY, fixture, baseline, produto) estão consistentemente mantidos em todos os artefatos.

Os *warnings* — nenhum bloqueador — concentram-se em: (a) o conceito **singular** de "escape point" colapsa os **dois** marcos que Hendy mantém distintos; (b) risco de a validação documental passar a substituir a validação metodológica (volume de artefatos); (c) o questionário autoral simplifica a ponto de poder induzir o autor a sentir que aprova mais do que candidate-only.

---

## 2. Matriz Hendy / Daumas / SERA vNext

| principle | Hendy_position | Daumas_position | SERA_vNext_current_position | coherence_status | risk | recommendation |
|---|---|---|---|---|---|---|
| Separação Perception/Goal-Objective/Action | Três perguntas independentes (Fig. 4/5): Goal, Perception, Action — colunas paralelas do decision ladder | Aplica os 3 eixos nos 4 casos da dissertação (P-_/O-_/A-_), caminhos estruturalmente idênticos ao ladder | Árvore canônica A4R99 P_ROOT/O_ROOT/A_ROOT; leaf codes P-C/D/G/H, O-A/C/D, A-E/F/G/H | **preservado** | baixo | Manter. Lacuna só no caminho P do Caso-3 (P_TIME_PRESSURE), já registrada em A4R168 |
| Ponto de fuga da operação segura | "The key… is to identify the point at which there was a departure from safe operation" (p.7) | Reproduz pontos de fuga por caso; Caso-2 mantido 2A-only | "P/O/A no momento do escape point; o que vem depois é consequência" | **parcialmente preservado** | **médio-alto** | Hendy mantém **dois** marcos (ver F-01); modelar ambos explicitamente |
| Primeiro desvio vs. ato crítico (ponto sem retorno) | Fig. 3 distingue "first departure from safe operations" do "critical unsafe act… from which there is only one trajectory" | Não formaliza a distinção (SERA v0.1) | "escape point" tratado como ponto único + topologia discrete/progressive/diffuse + zoneBoundary earliest/latest (A4R191-A) | **divergência aceitável** | médio-alto | Ligar `zoneBoundary.earliest`→first-departure e `.latest`→critical-act (F-01) |
| Foco no ator direto / anti agent-migration | "Start with the operators or crews directly involved in the unsafe act" (p.8) | Analisa o ator no instante; reconhece contexto sem migrar a causa | "direct actor candidate", agent-migration risk medido por caso; G-WNSB/Colgan sinalizados HIGH | **preservado** | baixo-médio | Manter o tracking de agent-migration como gate explícito |
| Falha ativa vs. pré-condição | Separação forte (Fig. 7); pré-condições não substituem a falha ativa | MDC recupera pré-condições cognitivas (viés de hábito, viés de confirmação) sem reclassificar P/O/A | "precondition lane" separada das lanes P/O/A na extração | **preservado** | baixo | Manter lane separada; nunca promover precondition a causa P/O/A |
| Outcome bias / não caçar falha pós-evento | Counterfactual "removal would have prevented"; foco na decisão, não na severidade | Captura efeito mesmo quando raiz só é acessível via MDC | "post-escape hunting risk" e "outcome bias risk" medidos por candidato (Colgan re-audit) | **preservado** | baixo | Excelente; é o ponto mais forte da arquitetura atual |
| Papel do MDC / entrevista | IP/PCT exige goal+perception+action; "hard to imagine understanding without this information" (Exec. summary Hendy) | MDC/entrevista é o mecanismo de recuperação cognitiva; insubstituível para raiz | RR-003 reconhece: evidência não fecha "without MDC/interview structured capture" | **preservado** (como limitação assumida) | médio | Não tratar evento real documental como equivalente a caso com MDC |
| Daumas como referência, não fonte factual | (n/a — Hendy é a fonte do método) | Dissertação usa SERA v0.1, anterior à formalização vNext; é calibração, não dado | "Daumas used as factual source: NO" repetido em todos os artefatos | **preservado** | baixo | Manter o lock; usar Daumas só para calibrar caminho/raciocínio |

---

## 3. Achados críticos

### F-01 — Conceito singular de "escape point" colapsa os dois marcos de Hendy

- finding_id: F-01
- scope: TASK 1 / regra central do escape point
- severity: **HIGH**
- issue: Hendy (Fig. 3) distingue explicitamente o *first departure from safe operations* do *critical unsafe act* ("the one from which there is only one trajectory… once the critical decision has been made there is no way back"). A regra vNext ("P/O/A no escape point; o resto é consequência") usa **um** ponto. Se o escape point for fixado no primeiro desvio, o ato crítico vira "consequência" e pode ser subanalisado; se for fixado no ato crítico, a falha de monitoramento anterior some. O caso Colgan torna isso concreto: Candidate-1 (LOW_SPEED_BEFORE_STICK_SHAKER) ≈ first departure; Candidate-2 (POST_SHAKER_PULL_INPUT) ≈ critical unsafe act. O sistema hoje resolve isso mantendo ambos abertos (`ESCAPE_POINT_REAUDIT_REQUIRED`), mas o faz por prudência ad-hoc, não por regra.
- why_it_matters: É o ponto onde "consequência vira causa" — exatamente o risco que a metodologia quer evitar — mas por baixo (descartar o ato crítico) e não só por cima (caçar falha pós-evento).
- recommended_action: Formalizar que o escape point é um **par** de marcos de Hendy. Vincular `zoneBoundary.earliestControllableRef` → *first departure* e `zoneBoundary.latestControllableRef` → *critical unsafe act* (a estrutura já existe em A4R191-A; falta o binding semântico e a regra). Anchor primário do P/O/A = ato crítico; o intervalo earliest→latest é a janela legítima de análise, não "consequência".

### F-02 — "O que ocorre depois é consequência" precisa de fronteira operacional, não temporal

- finding_id: F-02
- scope: TASK 1 / TASK 6
- severity: **MEDIUM**
- issue: A formulação atual é temporal ("depois"). Hendy é causal/counterfactual ("removal would have prevented"). Um critério puramente temporal pode classificar como "consequência" um ato crítico que ocorre cronologicamente depois do primeiro desvio mas que ainda é a falha ativa primária.
- why_it_matters: Sem fronteira counterfactual, "post-escape" pode cortar a falha ativa de Hendy.
- recommended_action: Reescrever a regra: "não se caça falha **após o ato crítico/ponto sem retorno**; entre o primeiro desvio e o ato crítico a operação ainda é recuperável e portanto analisável". Alinhar com a definição counterfactual de Hendy.

### F-03 — Validação documental tende a substituir validação metodológica

- finding_id: F-03
- scope: TASK 6
- severity: **MEDIUM**
- issue: ~80+ artefatos entre A4R191 e A4R202, com locks, gates e matrizes redundantes. O encadeamento de status ("AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW", readiness matrices, next-phase decisions) cria um forte *sense of validity* que é sobretudo processual. Nenhum caso passou ainda por method review P/O/A real — toda a robustez atual é de **contenção**, não de **validação metodológica**.
- why_it_matters: Risco de o projeto confundir "arquitetura bem-travada" com "método validado". O método só se valida quando um caso atravessa o ladder P/O/A sob julgamento autoral — o que ainda está bloqueado (corretamente).
- recommended_action: Antes de gerar mais artefatos de gate, executar **um** candidate-only method review ponta-a-ponta (sem desbloquear final) para provar que o método produz P/O/A coerente. Tratar a próxima fase como redução de artefatos, não expansão.

### F-04 — Questionário autoral simplifica a ponto de poder confundir o autor sobre o que aprova

- finding_id: F-04
- scope: TASK 5
- severity: **MEDIUM**
- issue: As 8 perguntas A4R202-C usam "aprovo / sim / segue". O intake A4R202-D corretamente isola o status derivado e nega conversão em READY/P-O-A. Mas a pergunta 4 ("A evidência factual é suficiente?") faz o autor **gatekeepar suficiência de evidência** — função que deveria ser do critério objetivo (Seção 4), não do julgamento autoral; e o trio "aprovo/sim/segue" tem ergonomia de aprovação final.
- why_it_matters: Risco F-04 é o autor sentir que validou o caso (escape point + ator + evidência) quando só autorizou entrada em revisão candidate-only.
- recommended_action: (1) Renomear o ato de "aprovo" para "libero para revisão candidate-only". (2) Tirar a suficiência de evidência do questionário autoral e movê-la para o gate objetivo da Seção 4 (autor confirma, não decide). (3) Incluir no topo de cada questionário a frase: "isto NÃO aprova P/O/A, ponto de fuga, nem READY".

### F-05 — Colgan: tratar evento real parcial como forte demais (risco latente, hoje contido)

- finding_id: F-05
- scope: TASK 4
- severity: **LOW**
- issue: O low-speed window de Colgan é reconstrução pós-acidente do FDR. O sistema corretamente o mantém em re-audit. O risco é de, em pressão de fechamento, promover essa reconstrução a anchor "forte".
- why_it_matters: Reconstrução ≠ callout vivo; promovê-la inflaria a força do candidate.
- recommended_action: Manter Colgan fora do top-tier até o re-audit fechar o par earliest/latest (F-01). Não usar como reference anchor enquanto a percepção no pré-warning não tiver evidência direta (não reconstruída).

### F-06 — Lane de percepção parcialmente inferida de automation-state em vez de reconhecimento explícito

- finding_id: F-06
- scope: TASK 3 / TASK 4
- severity: **LOW**
- issue: Em Asiana 214 e UPS 1354 a perception lane é "sufficient but partly inferred from automation-state use rather than explicit cockpit recognition language" (A4R202-B). Hendy define perception como "what the person believed was the state of the world" — crença, não uso de modo.
- why_it_matters: Inferir percepção do estado de automação aproxima-se de inferir crença a partir do comportamento — circularidade que Hendy evita.
- recommended_action: Marcar explicitamente, na evidence lane, quando a percepção é **inferida** vs **verbalizada** (CVR). Inferida é desejável-mas-não-mandatória; não deve ser registrada como percepção de força alta.

### NOTE N-01 — Caso-3 Daumas (P-H) tem divergência de caminho conhecida

- severity: **NOTE**
- issue: A4R168 já registra: no P_TIME_PRESSURE o caminho da dissertação responde SIM mas segue para questões de informação em vez de fechar em P-D/P-E. Mantido como SOURCE_REPRODUCTION.
- recommended_action: Quando Daumas for usado como calibração de caminho, usar Caso-4 (mais limpo) como âncora primária e Caso-3 apenas como teste de robustez do ladder. Corrigir a afirmação superada do extraction log A4R167 sobre "P-H não canônico".

---

## 4. Critérios mínimos de evidência (candidate-only)

Derivados de Hendy (as três perguntas exigem goal+perception+action; o ato/condição deve ser observável; começa-se pelo ator direto) e do selection-criteria A4R200-A.

| evidence_dimension | mandatory_or_desirable | minimum_required | missing_means | status_if_missing |
|---|---|---|---|---|
| Fonte oficial + locator | **mandatory** | Relatório oficial rastreável + referência localizável | Sem rastreabilidade não há fato; só narrativa | **HOLD / DISCARD** |
| Timeline | **mandatory** | Sequência temporal suficiente para localizar o instante controlável | Não há como ancorar escape point | **HOLD** |
| Ator direto | **mandatory** | Ator atribuível no instante do desvio/ato crítico | Viola o "start with the operator directly involved" → agent migration | **HOLD** |
| Ato/condição insegura observável (PF do desvio) | **mandatory** | "What was done" ou "what was" observável (Hendy) | Sem falha ativa observável não há objeto de análise | **HOLD** |
| Ação (A) | **mandatory** | O que o ator fez para atingir o goal no instante | Falta uma das 3 perguntas de Hendy | **HOLD** |
| Objetivo/goal (O) | **mandatory** | Intenção/goal no instante | Falta uma das 3 perguntas | **HOLD** |
| Percepção (P) | **mandatory, mas pode ser inferida** | Crença sobre o estado do mundo; se inferida, rotular como inferida | Inferência circular se vier só de automation-state | **HOLD se ausente; WARN se só inferida** |
| Separação fato × conclusão externa | **mandatory** | Conclusões do relatório em quarentena, não como dado | Outcome bias entra como fato | **HOLD** |
| PF/PM attribution | **desirable** | Quem pilotava / monitorava | Reduz nitidez do ator, não bloqueia se ator-coletivo é defensável | **WARN / proceed-with-limitation** |
| Callout / warning / go-around mechanism | **desirable** | Evidência de gate procedural explícito | Enfraquece a leitura de "opção ainda existia" | **WARN** |
| Procedimento / SOP aplicável | **desirable** | Norma de referência no instante | Dificulta O-axis (consistente com regras?) | **WARN** |
| Contexto / precondition | **desirable (lane separada)** | Suficiente para não migrar para causa | Risco de precondition virar causa | **WARN; nunca promover a P/O/A** |

Regra de bloqueio: ausência de **qualquer** mandatory ⇒ HOLD (não DISCARD automático — pode ir para SOURCE_RECOVERY). Percepção apenas inferida ⇒ prossegue com WARN, nunca como força alta. Conclusão externa usada como fato ⇒ HOLD imediato (é a porta de entrada do outcome bias).

---

## 5. Real / Daumas / Synthetic — recomendação

| gap_or_need | best_source_type | reason | risk | recommendation |
|---|---|---|---|---|
| GAP-004 (consequence-as-cause) | **synthetic primeiro** | A armadilha precisa ser isolada do ruído de um caso real; é teste de método, não representação | Synthetic-real blending se a lane não for rotulada | Synthetic isolado, lane explícita; usar Colgan como *teste real* da mesma armadilha **depois**, não como fonte |
| GAP-002 (agent migration) | **evento real forte** (G-WNSB, Comair) | Migração de agente aparece naturalmente em casos com SOP/ATC/contexto forte | Insistir em real fraco | Real forte + guardrail de ator direto; synthetic só se nenhum real isolar a migração |
| Percepção pré-warning (Colgan) | **Daumas/MDC-style — mas indisponível para evento real** | Só MDC recupera crença pré-warning; reconstrução FDR ≠ crença | Tratar reconstrução como percepção forte (F-05) | Manter HOLD da P-lane; não preencher com synthetic (seria inventar cognição) |
| Calibração do ladder P/O/A | **Daumas (Caso-4)** | Caminho mais limpo, MDC documenta viés de confirmação | Usar Daumas como dado factual | Calibração de caminho/raciocínio only; lock factual mantido |
| Cobertura de eixo O (violação excepcional) | **real (Execuflight/UPS) + Daumas Caso-3 como check** | O-C/O-D bem evidenciados nos reais | Caso-3 tem divergência de caminho (N-01) | Real primário; Daumas Caso-3 só como robustez |
| Lacuna sem real forte e mal definida | **nenhum ainda** | Política A4R200-A: não sintetizar lacuna mal definida | Pular para fixture | Definir a lacuna antes; HOLD |

Síntese: o sequenciamento atual (synthetic só quando real é fraco/incompleto **e** Daumas não cobre **e** a armadilha precisa de isolamento) está **correto**. O único risco material é F-05 (não promover reconstrução a evidência real forte) e a tentação de preencher a percepção pré-warning de Colgan com synthetic — o que seria inventar cognição e deve ser proibido.

---

## 6. Author review — recomendação

O modelo é **seguro na contenção, frágil na ergonomia**.

**Seguro:** o intake A4R202-D registra respostas literais, não infere ausências, e o status derivado `AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW` está corretamente isolado de READY/P-O-A/fixture/baseline, com lista explícita de consequências proibidas. A separação candidate-only ↔ method review ↔ READY ↔ fixture ↔ baseline está bem feita no nível de status.

**Frágil — corrigir antes do candidate-only method review:**

1. **F-04** — o verbo "aprovo" + "segue" tem ergonomia de aprovação final. Renomear para "libero para revisão candidate-only".
2. A pergunta 4 (suficiência de evidência) transfere ao autor um julgamento que deve ser do critério objetivo da Seção 4. O autor deve **confirmar** o critério, não substituí-lo.
3. As perguntas binárias (sim/não) sobre outcome bias e agent migration são úteis como sinal, mas **simplificam demais** para casos HIGH (G-WNSB, Colgan). Para casos com risco ≥ MEDIUM-HIGH, exigir uma justificativa de uma linha, não só "não".
4. Tornar o lock-reminder não-ignorável: cabeçalho fixo "isto NÃO aprova P/O/A final, ponto de fuga final, nem READY" em cada bloco de evento.

Risco central a evitar: o autor achar que validou o caso. Hoje o **texto do status** protege; a **experiência do questionário** não. Alinhar os dois.

---

## 7. Próxima fase recomendada

Duas rotas, em ordem:

**Rota 1 (prioritária) — Corrigir critérios antes:**
Resolver F-01 (binding earliest/latest ↔ first-departure/critical-act), F-02 (fronteira counterfactual em vez de temporal) e F-04 (ergonomia autoral). São de baixo custo, alto retorno metodológico, e destravam o Colgan re-audit de forma principista em vez de ad-hoc.

**Rota 2 — A4R202-E candidate-only method review com escopo mínimo: um único caso (Comair 5191):**
É o packet mais limpo (HIGH em todas as lanes, post-escape-hunting e technical-dominance LOW). Provar o ladder P/O/A ponta-a-ponta em **um** caso, sem desbloquear final, valida o método de fato (mitiga F-03) sem inflar a arquitetura.

**Não recomendado agora:** Batch-2 deep extraction (amplia volume antes de validar método); synthetic fill (depende de GAP-004 definido e dos critérios corrigidos); Daumas calibration extraction como fase própria pode esperar — Caso-4 já está mapeado e basta para calibrar o primeiro method review.

---

## 8. Confirmação de bloqueios

Confirmo explicitamente que esta auditoria:

- **não** produziu P/O/A final;
- **não** aprovou ponto de fuga final (apenas analisei os candidatos existentes como auditor);
- **não** promoveu READY;
- **não** criou `selectedCode` / `releasedCode` / `finalConclusion` / `CLASSIFIED`;
- **não** criou fixture / baseline / produto;
- **não** usou Daumas como fonte factual (tratei a dissertação só como referência de método/calibração);
- **não** criou HFACS / Risk / ERC / ARMS / recommendations;
- **não** acessou git, **não** commitou, **não** rodou testes, **não** fez busca externa nem baixou fontes (lidos apenas PDFs e markdowns já presentes localmente no repo).
