# AUDITORIA METODOLÓGICA INDEPENDENTE — A4R202-OPUS-1

Date: 2026-06-02
Phase: A4R202-OPUS-1
Status: independent methodological audit only
Model: Claude Opus
Scope: candidate-only — sem P/O/A final, sem escape point final, sem READY, sem fixture/baseline/produto

---

## 1. Veredito geral

**`OPUS_AUDIT_PASS_WITH_WARNINGS`**

A estratégia está metodologicamente *segura na arquitetura* (guardrails fortes, separação fato/conclusão consistente, locks candidate-only respeitados em todas as fases, divulgação honesta de incerteza). Mas há quatro avisos materiais que precisam entrar explicitamente no A4R202-E e no planejamento de corpus, e que impedem um PASS limpo:

1. Os pontos de fuga candidatos de **Asiana** e **UPS** estão *acoplados/compostos* (embutem estado de automação ou abrangem uma janela de ~4 min em vez de um instante discreto).
2. A reauditoria de **Colgan** está equilibrada demais entre Candidato 1 e Candidato 2 — o Candidato 2 ("pull pós-shaker") é sedutor por *clareza de outcome*, o que é exatamente a armadilha de post-escape hunting.
3. O corpus real está **superconcentrado** em "unstable approach / continuation decision" (5 de 6 eventos) e **não tem nenhum controle positivo** (escape bem-sucedido).
4. **G-WNSB** não é reproduzível a partir do repo rastreado (PDF oficial consultado fora do corpus).

Nenhum desses é blocker porque os locks candidate-only contêm o risco. Daí PASS_WITH_WARNINGS, não PASS.

---

## 2. Veredito por evento

| Evento | Veredito |
|---|---|
| **Comair 5191** | `PROCEED_TO_CANDIDATE_ONLY_METHOD_REVIEW` |
| **Asiana 214** | `PROCEED_WITH_LIMITATION` |
| **UPS 1354** | `PROCEED_WITH_LIMITATION` |
| **Colgan 3407** | `REAUDIT_ESCAPE_POINT_BEFORE_PROCEEDING` |
| **G-WNSB** | `PROCEED_WITH_LIMITATION` |
| **Execuflight 1526** | `PROCEED_WITH_LIMITATION` |

Divirjo conscientemente dos dossiês A4R202-C em Asiana e UPS: ambos foram marcados "segue" pelo autor, mas, do ponto de vista de pureza de ponto de fuga, são `PROCEED_WITH_LIMITATION`, não proceed limpo. Comair é o único proceed limpo do top-3.

---

## 3. Tabela de auditoria por evento

| event_name | candidate_escape_point_quality | strongest_escape_point_candidate | alternative_escape_point_candidates | direct_actor_clarity | PF_PM_or_role_clarity | outcome_bias_risk | agent_migration_risk | technical_or_procedural_boundary_risk | evidence_sufficiency | SERA_usefulness | main_warning | recommended_verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Comair 5191 | HIGH | cruzar hold short da 26 + lineup sem verificação positiva de posição/heading | parada no hold short errado (COM-04); aceitação da clearance ainda no ponto errado (COM-05); lineup checklist como gate (COM-06) | HIGH | HIGH | LOW | MEDIUM (→ATC/obra/sinalização) | LOW | HIGH (FO recall ausente) | HIGH — espinha de verificação de posição | Não deixar a narrativa sistêmica (construção/ATC single-controller) migrar o ator direto; testar também o candidato ligeiramente mais cedo | PROCEED_TO_CANDIDATE_ONLY_METHOD_REVIEW |
| Asiana 214 | MEDIUM | gate de 500 ft AFE não rejeitado (ASI-07) — critério de descontinuação explícito | A/T HOLD não percebido (candidato atual); 5 nm ainda alto (ASI-03) | MEDIUM-HIGH | MEDIUM (instrutor/trainee → role diffusion) | MEDIUM | MEDIUM (→Boeing autoflight, ATC keep-speed) | MEDIUM-HIGH | HIGH | HIGH — automação/monitoramento | Ponto candidato embute estado de automação (A/T HOLD); co-avaliar o gate de 500 ft como candidato co-igual, não "alternativa" | PROCEED_WITH_LIMITATION |
| UPS 1354 | MEDIUM | continuação através da MDA sem level-off (UPS-07) — piso explícito; ou decisão V/S não briefada (UPS-04) | FMC não resequenciado (precondição, UPS-02); permanência em 2.500 ft (UPS-03) | HIGH | HIGH | LOW-MEDIUM | MEDIUM (→"ATC kept us high", fadiga/dispatch) | MEDIUM | HIGH | HIGH — continuação não-precisão/minimums | Ponto candidato é *composto* (precondição+decisão+bust de gate numa janela de ~4 min); decompor antes de qualquer seleção | PROCEED_WITH_LIMITATION |
| Colgan 3407 | LOW-MEDIUM | LOW_SPEED_BEFORE_STICK_SHAKER (Candidato 1) — preserva a regra "no ponto de fuga" | IMMEDIATE_POST_SHAKER_PULL (Candidato 2, pós-escape); ref-speed/icing mismatch (Candidato 3, difuso) | MEDIUM-HIGH | MEDIUM | MEDIUM | MEDIUM-HIGH (→treinamento/operador) | HIGH | MEDIUM-HIGH (deficit de 8 s é reconstrução FDR) | HIGH como *boundary/teaching* de post-escape hunting | Candidato 2 é clínico por ser o momento dramático = clareza de outcome bias; reauditar inclinando para Candidato 1, quarentenando o pull como consequência | REAUDIT_ESCAPE_POINT_BEFORE_PROCEEDING |
| G-WNSB | MEDIUM-HIGH | decaimento de airspeed abaixo de 80 kt em 3-axes/V/S sem correção de collective (candidato atual) | continuação em tempo deteriorando; falha de level-off no AVAD 300 ft/MDA | HIGH | MEDIUM-HIGH | LOW-MEDIUM | HIGH (→SOP operador, weather, 300 ft handover) | MEDIUM | HIGH no conteúdo, mas fonte **não reproduzível no repo** | HIGH — único caso offshore/helicóptero humano-dominante | Fonte primária (PDF AAIB) fora do corpus rastreado; alta pressão de migração SOP/weather sobre o ator de cabine | PROCEED_WITH_LIMITATION |
| Execuflight 1526 | MEDIUM | passar a MDA a 113 kt/flaps 45 sem missed approach (EXE-07) — gate explícito | alto/lento antes do FAF + não-takeover (candidato atual); permanência em 3.000 ft (EXE-02) | HIGH | HIGH (FO PF / capitão comando — inversão de norma) | LOW-MEDIUM | MEDIUM (→cultura operador/FAA oversight) | LOW-MEDIUM | HIGH (sem FDR, CVR ruim, radar-derived) | HIGH — não-intervenção do comandante (PF/PM + autoridade) | Ponto candidato também abrange uma janela (setup→FAF→flaps 45); decidir entre setup pré-FAF e bust de MDA | PROCEED_WITH_LIMITATION |

---

## 4. Achados críticos

| finding_id | event_or_scope | severity | issue | why_it_matters | recommended_action |
|---|---|---|---|---|---|
| F-01 | Asiana 214 | HIGH | Ponto de fuga ancorado em **estado de automação** (A/T `HOLD`) em vez de momento de decisão/ação humana | A/T HOLD é consequência da ação FLCH+idle e da lógica Boeing; ancorar ali importa technical dominance para dentro da própria definição de escape (tech-dominance já MEDIUM-HIGH) | No A4R202-E, tratar o gate de 500 ft AFE como candidato co-igual; manter A/T HOLD como precondição/contexto, não como o escape |
| F-02 | UPS 1354 | HIGH | Ponto de fuga **composto** abrange ~4 min (FMC→V/S→MDA), misturando precondição, decisão e bust de gate | Escape point deve ser instante discreto; um span impede teste limpo de "perception vs action lane domina" (o próprio gap matrix marca SETUP_VS_EXECUTION_BOUNDARY) | Decompor em 3 âncoras candidatas discretas antes de qualquer seleção; preferir MDA-continuation ou decisão-V/S |
| F-03 | Colgan 3407 | HIGH | A reauditoria está **simétrica demais** entre Candidato 1 (low-speed pré-shaker) e Candidato 2 (pull pós-shaker) | A "clareza HIGH" do Candidato 2 é artefato de outcome/post-escape hunting — uma vez disparado o shaker, a operação segura já saiu; selecioná-lo é caçar o erro de recuperação | Reaudit deve declarar o Candidato 2 como pós-escape (consequência) e inclinar a fronteira candidata para o Candidato 1; usar Colgan como boundary/teaching de anti-post-escape-hunting |
| F-04 | Corpus (conjunto) | HIGH | **Superconcentração**: 5/6 eventos são unstable-approach/continuation; só Comair é família distinta | Um corpus calibrador precisa de espalhamento por família de gap; clustering vicia a calibração para um único tipo de armadilha | Parar de adicionar approach-continuation; Batch 2 deve priorizar famílias ausentes (ver §5/§7) |
| F-05 | Corpus (conjunto) | HIGH | **Nenhum controle positivo** (evento onde a tripulação escapou com segurança no ponto de fuga) | Sem o lado "operação ainda segura" é difícil calibrar a fronteira do que é escape vs operação normal; corpus 100% de acidentes enviesa | Buscar 1 evento real de go-around/escape bem-sucedido (Perplexity) ou desenhar sintético positivo |
| F-06 | G-WNSB | HIGH | Fonte primária (PDF AAIB) **não rastreada no repo**; extração feita via staging temporário off-corpus | Corpus calibrador precisa ser reproduzível a partir das fontes versionadas; reviewers futuros não conseguem reproduzir | Normalizar um extrato/locator package rastreado antes de uso comparativo (Codex), conforme já sinalizado NON_BLOCKING — elevado para condição de uso |
| F-07 | Comair 5191 | MEDIUM | Candidato pode estar levemente **tarde**: lineup já "trava" o erro; última verificação positiva é antes (parada/clearance/lineup checklist) | Distinção escape point (última chance de preservar) vs ponto de manifestação (erro fisicamente cometido) | Co-testar parada no hold short errado e o lineup checklist como gate de cross-check no A4R202-E |
| F-08 | Asiana 214 | MEDIUM | **Role diffusion** instrutor/trainee é a maior do top-3 | Não-intervenção do instrutor atrai migração para "sistema de treinamento/instrutor/Boeing/ATC" | Fixar lane de ator integrado de cabine; tratar instrutor como monitoring lane, não como ator substituto |
| F-09 | UPS / Execuflight | MEDIUM | Ambos têm âncora "ATC kept us high" / cultura operador embutida na narrativa | Atratores nativos de agent migration dentro do próprio material | Marcar esses trechos como contexto/precondição explícito no packet de review |
| F-10 | Escopo Daumas | MEDIUM | Risco de Daumas virar **oráculo de facto** (anchoring) e de **circularidade** se usado para desenhar *e* validar | Reduz generalidade frente a Hendy e pode vazar conclusões para expected values | Catálogo Daumas só *depois* do A4R202-E; rótulo "method, not fact"; nunca a mesma instância Daumas para design e validação |
| F-11 | Corpus | LOW | Possível **sunk-cost** em Colgan (mantido apesar de ambiguidade real) | Defensável por valor de boundary case, mas vigiar para não forçar reentry | Reter Colgan só como boundary/teaching; não promover a reference candidate sem reaudit limpa |
| F-12 | Comair / Colgan | NOTE | Em ambos o FO recall está ausente (perception lane parcialmente reconstruída) | Limitação honesta e já documentada; não bloqueia | Carregar nota de incerteza explícita para a fase de análise humana |

---

## 5. Gap coverage table

| gap_or_family | current_best_real_event | coverage_quality | Daumas_relevance | synthetic_needed | more_real_event_search_needed | priority | notes |
|---|---|---|---|---|---|---|---|
| PF/PM separation | Execuflight 1526 (FO PF / capitão não assume) | PARTIAL | HIGH | MAYBE | YES (caso limpo de cross-check desenhado) | HIGH | Asiana cobre parcialmente via instrutor; falta caso "PM deveria intervir" limpo |
| Agent migration | Comair (→ATC/obra), G-WNSB (→SOP) | GOOD | HIGH | NO | NO | MEDIUM | Eventos reais são *ideais* aqui — carregam pressão de migração autêntica; real-first sobre sintético |
| Consequence-as-cause / post-escape hunting | Colgan 3407 (pull-not-push) | PARTIAL (depende da reaudit cair no Cand.1) | HIGH | YES (isolar a armadilha) | NO | HIGH | GAP-004 prioritário; Colgan dá âncora real + sintético isola o trap limpo |
| Warning/callout/go-around | UPS/Asiana/Execuflight/G-WNSB (gates *furados*) | PARTIAL (só o lado negativo) | MEDIUM | MAYBE | YES (go-around *executado*) | HIGH | Falta o lado positivo do gate (ver F-05) |
| Automation/mode awareness | Asiana (A/T HOLD), UPS (V/S vs profile) | GOOD | LOW | NO | NO | LOW-MEDIUM | Real suficiente |
| Technical/environmental negative control | Delta 191 (microburst), 5N-BQJ (DAFCS/TRIM) | GOOD | LOW | NO | NO | LOW | Bem servido; manter como negative controls |
| Technical-human boundary | USAir 427 (rudder) | ADEQUATE | LOW-MEDIUM | NO | MAYBE | LOW-MEDIUM | Boundary case suficiente |
| Unstable approach / continuation decision | Asiana/UPS/G-WNSB/Execuflight | SATURATED | MEDIUM | NO | **NO (parar)** | NONE | Família super-representada (F-04) |
| CFIT with clear chronology | UPS 1354, Execuflight 1526 | GOOD | LOW | NO | MAYBE (CFIT não-approach) | LOW | Atuais são todos approach-CFIT |
| Offshore/helicopter human-dominant | G-WNSB (único) | THIN | MEDIUM | MAYBE | YES (mais um) | MEDIUM | 5N-BQJ é controle técnico, não humano-dominante |
| CRM monitoring/cross-check | Execuflight, Asiana, Colgan | PARTIAL | HIGH | MAYBE | MAYBE | MEDIUM-HIGH | Sem caso onde o cross-check é a espinha primária |
| Decision point before outcome | Comair 5191 (limpo) | GOOD | MEDIUM | NO | NO | LOW | Bem coberto por Comair |

---

## 6. Daumas recommendation

**Como usar:**

- Como **referência de nível de detalhe cognitivo/contextual** no ponto de fuga (melhor uso) — calibrar o "quanto é suficiente" vs over-reading nas extrações.
- Como **observação de padrões de raciocínio P/O/A** (ancoragem de escape point, preservação de ator direto, separação fato vs conclusão, anti-outcome-bias) — observar a *forma*, não copiar a conclusão.
- Como **insumo de desenho de sintéticos** (design-only): padrões Daumas podem semear casos que isolam um trap específico como um humano experiente o enquadraria.
- Cross-check de qualidade mínima de evidência — secundário aos critérios A4R200-A, que já fazem o trabalho pesado.

**Como NÃO usar (confirmado contra o plano A4R200-A):**

- Não como fonte factual de evento real.
- Não como reentry automático.
- Não como baseline/fixture.
- Não como justificativa de selectedCode/releasedCode/finalConclusion.
- Não como oráculo que substitui Hendy (em conflito conceitual, Hendy prevalece).

**Qual artefato criar depois:**

Um **catálogo de padrões-método Daumas** — conjunto de *movimentos metodológicos nomeados* (padrões de ancoragem de escape point, de preservação de ator, de separação fato/conclusão, de resistência a outcome bias) mapeados aos gaps ativos, cada um rotulado "method, not fact". **Criar só DEPOIS do A4R202-E**, para não pré-enviesar a revisão dos top-3.

**Riscos a controlar:**

1. Anchoring — analistas convergindo para "o que Daumas diria".
2. Circularidade design+validação (nunca a mesma instância para ambos).
3. Vazamento de conclusões Daumas para expected values reais.
4. Over-fit a um único estilo humano, reduzindo generalidade.

---

## 7. Real vs synthetic recommendation

**Continuar com evento real:**

- Agent migration (eventos reais carregam pressão autêntica — real-first).
- Automation/mode awareness, technical negative controls, technical-human boundary, decision-point-before-outcome — já cobertos, manter.
- Consequence-as-cause: manter Colgan como âncora real (após reaudit limpa).

**Ir para sintético (design-only, GAP-004 primeiro, GAP-002 depois):**

- Isolamento limpo de **consequence-as-cause / post-escape hunting** (um caso onde o erro dramático pós-escape obviamente *não* é o ponto de fuga).
- Possível **PF/PM cross-check** limpo se a busca real não achar caso desenhado.
- Possível **controle positivo** (escape bem-sucedido) se não houver evento real adequado.

**Precisam busca Perplexity (eventos reais novos):**

- **Controle positivo** (go-around/escape executado no ponto de fuga) — lacuna estrutural (F-05).
- **Mais um offshore/helicóptero humano-dominante** (G-WNSB é único).
- **CFIT não-approach** ou família distinta para quebrar o clustering (F-04).
- Substituir Vigo (DISCARD_OR_REPLACE por fonte insuficiente).

**Já suficientemente coberto (não buscar mais):**

- Unstable approach / continuation decision (SATURADO).
- Negative controls técnicos (Delta 191, 5N-BQJ).
- Automation/mode awareness.

---

## 8. Próxima fase recomendada

**`A4R202-E com Comair + Asiana + UPS, mas com warnings`** (primária).

Justificativa: os três têm aprovação de autor (A4R202-D) e os avisos F-01/F-02/F-07/F-08 são contidos pelos locks candidate-only — exatamente o tipo de tensão que uma revisão de método deve resolver. O A4R202-E deve carregar como requisito explícito:

- Co-avaliar gate de 500 ft como candidato co-igual em Asiana.
- Decompor a âncora composta de UPS em 3 candidatos discretos.
- Testar candidatos mais cedo em Comair (parada no hold short errado; lineup checklist como gate).

**Imediatamente em paralelo/sequência (não na mesma lane):**

- **Colgan-only re-audit** sharpened (inclinando para Candidato 1, quarentenando Candidato 2 como pós-escape) — antes de qualquer uso comparativo de Colgan.
- **Deep Extraction Batch 2** focado em quebrar o clustering: controle positivo + offshore humano-dominante + família não-approach (após scouting Perplexity).

---

## 9. Confirmação de bloqueios

Confirmo explicitamente que esta auditoria:

- **NÃO** produziu P/O/A final.
- **NÃO** aprovou ponto de fuga final (preferências entre candidatos são apenas candidate-only, para orientar a reaudit/review).
- **NÃO** promoveu READY.
- **NÃO** criou selectedCode / releasedCode / finalConclusion / CLASSIFIED.
- **NÃO** criou fixture / baseline / produto / UI / API.
- **NÃO** usou Daumas como fonte factual de evento real.
- **NÃO** criou HFACS / Risk / ERC / ARMS / recommendations.
- **NÃO** acessou git, **NÃO** commitou, **NÃO** criou arquivos no repo durante a auditoria, **NÃO** rodou testes, **NÃO** fez busca externa, **NÃO** baixou fontes.
