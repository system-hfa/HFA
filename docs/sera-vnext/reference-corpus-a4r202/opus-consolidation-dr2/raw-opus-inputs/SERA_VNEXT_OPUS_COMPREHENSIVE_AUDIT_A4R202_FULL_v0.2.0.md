# A4R202-OPUS-FULL — Comprehensive Independent Methodological Audit

Date: 2026-06-02
Phase: A4R202-OPUS-FULL
Model: Claude Opus (via Claude Sonnet 4.6 delegation)
Status: AUDIT_COMPLETE — candidate-only scope

---

## 1. Veredito geral

**`OPUS_COMPREHENSIVE_AUDIT_PASS_WITH_WARNINGS`**

A arquitetura SERA vNext está metodologicamente coerente com Hendy e com Daumas, os locks de quarentena (no-final-P/O/A, no-final-escape, no-READY, no-fixture/baseline) estão sólidos e consistentes em todos os artefatos lidos, e o Batch 1 é viável para avançar a candidate-only method review **de forma não-uniforme**. As ressalvas que impedem um PASS limpo são: (a) o questionário autoral colapsa ambiguidades de ponto de fuga que os próprios analistas marcaram como gaps; (b) risco de over-reading do autor sobre o que "aprovo/segue" significa; (c) Asiana e UPS não são tão "limpos" quanto Comair e foram empacotados na mesma primeira lane; (d) proliferação documental/gates começando a substituir validação metodológica; (e) viés do corpus para approach/energy. Nenhuma é blocker.

---

## 2. Veredito por evento principal

| Evento | Veredito |
|---|---|
| Comair 5191 | `PROCEED_TO_CANDIDATE_ONLY_METHOD_REVIEW` |
| Asiana 214 | `PROCEED_WITH_LIMITATION` |
| UPS 1354 | `PROCEED_WITH_LIMITATION` |
| Colgan 3407 | `REAUDIT_ESCAPE_POINT_BEFORE_PROCEEDING` |
| G-WNSB Sumburgh | `PROCEED_WITH_LIMITATION` |
| Execuflight 1526 | `PROCEED_WITH_LIMITATION` |

Observação independente: o intake A4R202-D já registrou `aprovo/sim/sim/sim/não/não/segue/não` para os três top-3, derivando `AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW`. Esta auditoria **mantém** Comair como o único `PROCEED` sem qualificação e rebaixa Asiana e UPS para `PROCEED_WITH_LIMITATION` — ver achados F-01, F-03, F-04. Isso não conflita com o intake (que é candidate-only), mas sinaliza que a resposta autoral "sim" sobre clareza do ponto de fuga foi mais otimista do que a própria gap matrix A4R202-A admite.

---

## 3. Tabela de auditoria por evento

| event_name | candidate_escape_point_quality | strongest_escape_point_candidate | alternative_escape_point_candidates | direct_actor_clarity | PF_PM_or_role_clarity | outcome_bias_risk | agent_migration_risk | technical_or_procedural_boundary_risk | evidence_sufficiency | SERA_usefulness | main_warning | recommended_verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Comair 5191 | HIGH | cruzar hold-short da 26 e alinhar na 26 sem verificação positiva de posição/heading | parar na hold-short errada; aceitar clearance ainda fora da 22 | HIGH | HIGH (capt taxi / FO rádio-checklist) | LOW | MEDIUM | LOW | HIGH | HIGH | migração para design/sinalização de aeroporto e controlador único | PROCEED_TO_CANDIDATE_ONLY_METHOD_REVIEW |
| Asiana 214 | MEDIUM-HIGH | A/P off + thrust idle + A/T `HOLD` sem percepção integrada | 5 nm ainda alto; 500 ft AFE não estabilizado (gate explícito) | MEDIUM-HIGH | MEDIUM-HIGH (PF aluno / instrutor PM) | MEDIUM | MEDIUM | MEDIUM-HIGH | HIGH | HIGH | enquadramento de automação puxa para technical dominance; candidato pode estar cedo demais vs gate dos 500 ft | PROCEED_WITH_LIMITATION |
| UPS 1354 | MEDIUM-HIGH | FMC não resequenciado + migração a `V/S` sem briefing + 1.500 fpm através da MDA | falha de descer estabilizado no LOC; continuação na MDA | HIGH | HIGH (capt PF / FO PM) | LOW-MEDIUM | MEDIUM | MEDIUM | HIGH | HIGH | statement **composto** (setup+execução) abrange janela, não momento discreto | PROCEED_WITH_LIMITATION |
| Colgan 3407 | MEDIUM (split não resolvido) | low-speed antes do stick shaker (preserva regra at-escape) | pull aft pós-shaker (1º ato explícito, mas pós-escape); ref-speed/icing mismatch | MEDIUM | MEDIUM | MEDIUM | MEDIUM-HIGH | HIGH | MEDIUM-HIGH | MEDIUM (alto após reauditoria) | candidato 2 arrisca consequence-as-cause; technical/stall dominance | REAUDIT_ESCAPE_POINT_BEFORE_PROCEEDING |
| G-WNSB Sumburgh | MEDIUM-HIGH | approach `3-axes`/`V/S` abaixo de 80 kt sem correção de collective rumo à MDA | continuação após piora do tempo; falha de level-off em AVAD/100 ft-acima-mínimos | MEDIUM-HIGH | MEDIUM-HIGH (comandante controle) | LOW-MEDIUM | HIGH | MEDIUM | HIGH (mas fonte não empacotada no repo) | HIGH (diversidade offshore/rotor) | SOP do operador e clima podem deslocar o ator de cabine; PDF não rastreável no corpus | PROCEED_WITH_LIMITATION |
| Execuflight 1526 | MEDIUM-HIGH | alto/lento no FAF com flaps 45 sem takeover/arremetida → descida de salvação | falha de descer no LOC; continuação na MDA a 113 kt | MEDIUM-HIGH | MEDIUM-HIGH (FO PF / capt comando) | LOW-MEDIUM | MEDIUM | LOW-MEDIUM | HIGH (sem FDR / CVR fraco) | HIGH (boundary organizacional + ação de linha) | granularidade temporal limitada; statement levemente narrativo/composto | PROCEED_WITH_LIMITATION |

---

## 4. Achados críticos

| finding_id | event_or_scope | severity | issue | why_it_matters | recommended_action |
|---|---|---|---|---|---|
| F-01 | Author review model + Asiana/UPS | HIGH | A gap matrix A4R202-A marca `ESCAPE_POINT_BOUNDARY` (Asiana) e `SETUP_VS_EXECUTION_BOUNDARY` (UPS) como MEDIUM/NON_BLOCKING, mas o questionário pergunta apenas "escape point claro? sim/não" e o autor respondeu "sim" para ambos. A camada analítica e a camada autoral discordam implicitamente. | O ponto de fuga é o coração do método; deixar o autor declarar "claro" sem expor os candidatos alternativos esconde justamente a decisão que mais importa e fabrica falsa convergência. | Antes do próximo intake, acrescentar pergunta que apresente os candidatos rivais e peça escolha/adiamento explícito ("X, Y ou indefinir?") para eventos com boundary flag. |
| F-02 | Author review model | HIGH | A string derivada `AUTHOR_APPROVED_FOR_CANDIDATE_ONLY_METHOD_REVIEW` somada a "aprovo" + "segue" cria risco de o autor crer que aprovou mais (P/O/A, escape final, READY). | Author decision sem critérios fortes vira falso selo de validade; o termo "segue" é ambíguo. | Adicionar pergunta de acknowledgment explícita ("entendo que isto é candidate-only e NÃO aprova P/O/A final, ponto de fuga final nem READY?") e renomear o estado para algo que carregue "candidate-only" na própria escolha. |
| F-03 | Asiana 214 | MEDIUM | Candidate escape point embute estado de automação (`A/T HOLD`), com technical-dominance MEDIUM-HIGH, e pode ser cedo demais frente ao gate explícito dos 500 ft (que tem critério operacional de descontinuação). | Risco de transformar lógica de sistema em causa e de "cedo demais" antes da percepção de baixa energia da tripulação. | Levar Asiana para method review **com warning de boundary**; testar explicitamente o candidato dos 500 ft contra o candidato de automação antes de qualquer estabilização. |
| F-04 | UPS 1354 | MEDIUM | O statement é composto: FMC não resequenciado + troca para V/S sem briefing + 1.500 fpm através da MDA. Abrange uma janela, não um instante. | A regra Hendy/SERA exige momento único de fuga; um statement-janela arrisca smear entre setup (precondição) e execução (falha ativa). | Na method review, separar setup (precondição) do primeiro ato de continuação inseguro discreto e decidir o instante único. |
| F-05 | G-WNSB | MEDIUM | A extração consultou o PDF AAIB externamente e o removeu após staging; o corpus rastreado só tem a captura da página GOV.UK. Não reproduzível a partir do repo. | Viola na prática o critério de "locator verificável" de A4R200-A para reviewers futuros, mesmo sendo NON_BLOCKING. | Antes da author-dossier expansion, normalizar um extrato/locator rastreável (fora do source-corpus se necessário) — tarefa de Codex. |
| F-06 | Corpus (conjunto) | MEDIUM | 4 de 6 eventos do Batch 1 são approach/energy (Asiana, UPS, Colgan, Execuflight). Comair (surface) e G-WNSB (offshore/rotor) são as únicas quebras de viés. | Corpus calibrador enviesado para approach/CFIT/unstable subrepresenta no-failure/A-A boundary, controle negativo técnico/ambiental, e decisão fora de approach. | Reservar as próximas vagas reais/sintéticas para famílias ausentes; não adicionar mais um approach-energy real sem necessidade. |
| F-07 | Arquitetura/governança | MEDIUM-HIGH | Proliferação de fases (A4R196→A4R202, cada uma com A/B/C/D/E) e de artefatos quase-duplicados (LOG + REPORT + matrizes CSV + NEXT_PHASE_DECISION + blocos de lock repetidos). | Validação documental começa a substituir validação metodológica; manutenção e foco causal sofrem; falso senso de validade por volume. | Inserir um architecture-simplification checkpoint: consolidar locks num único contrato referenciado, reduzir NEXT_PHASE_DECISION redundantes, manter 1 índice de estado vivo em vez de N. |
| F-08 | Colgan 3407 | HIGH | Split de ponto de fuga não resolvido; o candidato 2 (pull pós-shaker) é o 1º ato explícito mas é provavelmente **pós-escape** (recuperação), arriscando consequence-as-cause; candidato 1 honra a regra mas é parcialmente reconstruído. | Escolher o candidato 2 cedo migra a análise para a fase de consequência e distorce o ator direto e o timing P/O/A. | Manter `ESCAPE_POINT_REAUDIT_REQUIRED`; reauditoria focada (Opus) antes de qualquer uso comparativo. |
| F-09 | Coerência Daumas | LOW | No Daumas Case-3, o caminho diverge no nó `P_TIME_PRESSURE` (responde SIM mas segue para questões de informação → P-H, quando o canônico ramificaria para P-D/P-E). | Sinaliza que a árvore canônica pode forçar leaf diferente do julgamento humano — item legítimo de calibração método↔humano. | Registrar como item de calibração para a futura fase Daumas; não reclassificar agora. |
| F-10 | Coerência Hendy | NOTE | "Ponto de fuga / escape point" não é termo de Hendy; é overlay SERA vNext/Daumas sobre o conceito de active failure vs pre-condition. | Aceitável, mas se não documentado pode ser usado para **truncar** a análise em vez de **localizar** a falha ativa. | Documentar explicitamente que o escape point serve para localizar a active failure no laço P/O/A, não para encerrar a análise das pré-condições. |

---

## 5. Matriz Hendy / Daumas / SERA vNext

| principle | Hendy_position | Daumas_position | SERA_vNext_current_position | coherence_status | risk | recommendation |
|---|---|---|---|---|---|---|
| Separação Perception / Goal-Objective / Action | Núcleo PCT: sente→percebe→compara com goal/setpoint→formula ação (Fig. 2; STEPS 3/4/5) | Aplica P/O/A nos 4 casos offshore com caminhos compatíveis | Eixos P/O/A com árvore canônica A4R99 (leaf codes P-/O-/A-) | preservado | baixo | Manter; é o ponto mais sólido da coerência |
| Active failure vs pre-condition | Distinção central; pré-condições em 3 camadas | Captura efeito (P-D/A-H) mas nem sempre raiz (vies de hábito) — limite reconhecido do SERA sem MDC | Escape point separa falha ativa de consequência/contexto downstream | preservado | baixo | Manter; explicitar que pré-condições não somem após o escape |
| Análise **no** ponto de fuga (anti post-escape hunting) | Implícito: falha ativa é o ponto de intervenção | Reproduz pontos de fuga da dissertação | Regra central A4R200-A; reaudita Colgan por essa razão | parcialmente preservado | médio | Colgan é o teste; reforçar a regra contra candidato pós-shaker |
| Single escape point + multi-actor contributions | Operador goal-directed; foco no laço | Não implementa actor split (analisa ator único) | Regra A4R166 single-escape + multi-actor; "crew-integrated actor" | divergência aceitável | baixo-médio | Manter; vigiar para não diluir ator direto em "crew collective" |
| Taxonomia por decision ladders (leaf codes) | Decision ladders / perguntas sobre goal, conhecimento, ação | 11 códigos compatíveis/compatíveis-com-cautela | Árvore A4R99 fiel; P-H path com ressalva | preservado | baixo | Registrar divergência P_TIME_PRESSURE (F-09) |
| Usabilidade humana do método | "complexidade mais imaginada que real"; ladders são perguntas simples | Operacionalização humana real (dissertação aplicada) | Questionário autoral simples; mas governança pesada ao redor | parcialmente preservado | médio-alto | Simplificar governança (F-07); preservar simplicidade das perguntas de método |
| Raciocínio causal claro vs excesso documental | Modelo enxuto, orientado a causa | Análise narrativa rica mas focada | Muitos gates/locks/CSVs em torno de pouca classificação ativa | divergência perigosa (incipiente) | médio-alto | Architecture-simplification checkpoint antes de Batch 2 |

---

## 6. Critérios mínimos de evidência

| evidence_dimension | mandatory_or_desirable | minimum_required | missing_means | status_if_missing |
|---|---|---|---|---|
| source/locator (oficial, rastreável) | mandatory | relatório oficial com locator verificável no repo | candidato não reproduzível | SOURCE_ENRICHMENT_REQUIRED |
| timeline | mandatory | cronologia suficiente para localizar o escape point | não há âncora para falha ativa | REAUDIT_REQUIRED |
| candidate escape point | mandatory | 1 statement "quando…" discreto, pré-consequência | método sem ponto de intervenção | REAUDIT_REQUIRED |
| direct actor | mandatory | ator atribuível no instante de escape | risco de agent migration | REAUDIT_REQUIRED |
| PF/PM ou role attribution | desirable (mandatory quando crew) | papéis de controle vs monitoramento separados | ator difuso ("crew collective") | PROCEED_WITH_LIMITATION |
| callout/communication | desirable | presença/ausência de callouts relevantes | percepção parcialmente inferida | PROCEED_WITH_LIMITATION |
| warning/alert | desirable | estado de warning no/antes do escape | risco de ancorar no warning (Colgan) | PROCEED_WITH_LIMITATION |
| procedure/SOP | desirable | gate procedural explícito quando existir | perde âncora de objetivo/regra | PROCEED_WITH_LIMITATION |
| aircraft/system state | desirable | estado de automação/config no escape | leitura técnica frágil | PROCEED_WITH_LIMITATION |
| environmental/technical context | desirable | contexto para separar técnico de humano | technical dominance não controlável | PROCEED_WITH_LIMITATION |
| perception-relevant facts | mandatory (mínimo) | fatos de percepção antes/no escape | eixo P não sustentável | REAUDIT_REQUIRED |
| objective/goal-relevant facts | mandatory (mínimo) | objetivo operacional no escape | eixo O não sustentável | REAUDIT_REQUIRED |
| action-relevant facts | mandatory (mínimo) | ato controlável no escape | eixo A não sustentável | REAUDIT_REQUIRED |
| preconditions | desirable | pré-condições disponíveis sem virar causa | análise rasa de contexto | PROCEED_WITH_LIMITATION |
| outcome quarantine | mandatory | consequência separada da causa | outcome bias / consequence-as-cause | REAUDIT_REQUIRED |
| external conclusion quarantine | mandatory | fatos separados de conclusões do relatório | dependência de conclusão externa | SOURCE_ENRICHMENT_REQUIRED |

Regra de agregação proposta: faltando **qualquer** mandatory → no máximo `HOLD`/`REAUDIT_REQUIRED`; mandatory completos + desejáveis parciais → `PROCEED_WITH_LIMITATION`; mandatory completos + desejáveis fortes + boundary risk baixo → elegível a `STRONG_REFERENCE_CANDIDATE` (apenas Comair hoje).

---

## 7. Gap coverage table

| gap_or_family | current_best_real_event | coverage_quality | Daumas_relevance | synthetic_needed | more_real_event_search_needed | priority | notes |
|---|---|---|---|---|---|---|---|
| PF/PM separation | UPS 1354 / Colgan 3407 | boa (UPS), aberta (Colgan) | alta (Daumas separa papéis) | não | não | média | UPS é a âncora; Colgan depende da reauditoria |
| agent migration | Comair 5191 (boundary aeroporto/ATC) | boa como teste de resistência | média | parcial (GAP-002) | não | alta | Comair força o método a não migrar para ATC/airport |
| consequence-as-cause | Colgan 3407 | aberta (é o caso-teste) | média | sim (GAP-004 primeiro) | não | alta | sintético GAP-004 antes de fechar Colgan |
| warning/callout/go-around | Asiana 214 / Execuflight 1526 | suficiente | média | não | não | média | risco de ancorar no warning em vez do escape |
| automation/mode awareness | Asiana 214 | boa, mas technical-dominance | baixa (Daumas é low-automation) | não | desejável (Turkish 1951 após source fix) | média | não sobre-ler automação como causa |
| technical/environmental negative control | — (nenhum dedicado) | **ausente** | baixa | sim | sim | alta | lacuna real; nenhum controle negativo técnico no Batch 1 |
| technical-human boundary | Asiana 214 / Colgan 3407 | parcial | média | parcial | não | média | ambos com technical dominance alto |
| unstable approach / continuation decision | UPS 1354 / Execuflight 1526 | forte | alta | não | não | baixa (já coberto) | risco de excesso de similares aqui |
| CFIT with clear chronology | UPS 1354 | forte | média | não | não | baixa | bem coberto |
| offshore/helicopter human-dominant | G-WNSB | boa (após packaging fix) | **muito alta** (4 casos Daumas são offshore) | não | desejável | média | preservar via Daumas + G-WNSB |
| CRM monitoring/cross-check | Colgan / Asiana (intra-approach) | parcial | alta | parcial | desejável (fora de approach) | média | falta cross-check fora do approach |
| decision point before outcome | Execuflight (continuation) | parcial | alta (Daumas Case-4) | sim | desejável | média | Daumas Case-4 é o yardstick mais limpo |
| SAR/training helicopter | — | ausente | alta (Daumas Case-1/2 treino) | sim | desejável | baixa-média | candidato a Daumas calibration + sintético |
| precondition-rich cases | Colgan / G-WNSB | boa | alta | não | não | baixa | risco de pré-condição virar causa |
| procedural noncompliance vs perceptual mismatch | UPS (V/S unbriefed) vs Asiana (A/T HOLD) | boa | alta | parcial | não | média | bom contraste já presente |
| no-failure / A-A boundary | — | **ausente** | média | sim | sim | alta | sem caso "sem falha", o método não tem boundary negativo |

---

## 8. Corpus routing table

| event_name | current_role | recommended_role | keep_or_replace | next_action | reason |
|---|---|---|---|---|---|
| Comair 5191 | top-3 author-approved (candidate-only) | STRONG_REFERENCE_CANDIDATE | keep | candidate-only method review (lane 1, anchor) | escape point discreto, ator claro, outcome bias LOW, technical LOW |
| Asiana 214 | top-3 author-approved | PROCEED_WITH_LIMITATION | keep | method review com warning de boundary (auto vs 500 ft) | valor alto em automação, mas technical-dominance MEDIUM-HIGH |
| UPS 1354 | top-3 author-approved | PROCEED_WITH_LIMITATION | keep | method review após desambiguar statement composto | forte, mas escape point setup-vs-execução |
| Colgan 3407 | ESCAPE_POINT_REAUDIT_REQUIRED | REAUDIT_REQUIRED | keep | reauditoria focada (Opus) antes de intake | split não resolvido; risco consequence-as-cause |
| G-WNSB Sumburgh | lane-2 candidate | PROCEED_WITH_LIMITATION + DEEP_EXTRACTION_REQUIRED (packaging) | keep | normalizar locator rastreável → author dossier | única diversidade offshore/rotor; fonte não empacotada |
| Execuflight 1526 | lane-2 candidate | PROCEED_WITH_LIMITATION | keep | author dossier (lane 2) | útil para boundary organizacional; granularidade limitada |
| Turkish 1951 | KEEP_AFTER_SOURCE_FIX | HOLD → SOURCE_ENRICHMENT | keep | Perplexity/locator DSB antes de uso | automation-energy valioso, mas source marker inválido |
| Spanair 5022 | KEEP_AFTER_SOURCE_FIX | HOLD → SOURCE_ENRICHMENT | keep | recuperar locator oficial (config/TOWS) | diversifica para configuration/checklist |
| Pel-Air VH-NGA | KEEP_AFTER_SOURCE_FIX | HOLD → SOURCE_ENRICHMENT | keep | extrair ATSB full report | fuel/weather decision chain (não-approach) |
| Air Canada 759 | HOLD_PENDING_SOURCE | HOLD | keep | verificar identidade de evento/fonte | surface conflict, mas fonte não verificada |
| Delta 191 / USAir 427 / TransAsia / First Air / 5N-BQJ | fila complementar | NEGATIVE_CONTROL_ONLY ou BOUNDARY_CASE_ONLY (a triar) | triar | triagem rápida de utilidade (Codex) | provável uso como controles, não referências |
| N109W / N11NM / Vigo / Thebaud / Peasmarsh | fila complementar | candidatos a DAUMAS_CALIBRATION / SYNTHETIC_FILL | triar | avaliar como calibração/sintético | provavelmente não são referências reais fortes |

---

## 9. Real / Daumas / Synthetic recommendation

- **Continuar com evento real:** automation/mode awareness (Turkish após source fix), configuration/checklist (Spanair após source fix), fuel/weather decision não-approach (Pel-Air após source fix), surface conflict (Air Canada 759 se fonte verificar). Estes têm contraparte real forte e não devem virar sintético.
- **Ir para Daumas calibration:** offshore/rotor human-dominant, decisão antes do outcome (Daumas Case-4 é o yardstick mais limpo), treino/SAR helicopter, e o nível mínimo de detalhe cognitivo. Daumas é referência de profundidade, **não** fonte factual.
- **Ir para sintético:** consequence-as-cause (GAP-004, primeiro), agent migration (GAP-002, depois), controle negativo técnico/ambiental, e no-failure / A-A boundary — gaps que real+Daumas não cobrem limpo e que precisam de isolamento da armadilha metodológica.
- **Voltar ao Perplexity:** apenas para a campanha externa de 20–40 candidatos reais com fonte oficial, focada nas famílias ausentes (negative control técnico, decisão não-approach) e nos source fixes (Turkish/Spanair/Pel-Air). Não pedir P/O/A, não pedir conclusão, não pedir escolha de ponto de fuga.
- **Já suficientemente coberto:** unstable approach / continuation, CFIT com cronologia, procedural-noncompliance-vs-perceptual-mismatch. **Não** adicionar mais approach-energy real sem necessidade (F-06).

---

## 10. Author review recommendation

- **O modelo atual é seguro o suficiente para candidate-only, mas não para a próxima leva sem ajuste.** Os locks no intake estão corretos (aprovo≠READY, sim≠escape final, segue≠P/O/A final), o que é bom.
- **Melhorar antes do próximo intake:**
  1. Acrescentar pergunta de acknowledgment explícita de escopo ("entendo que isto é candidate-only e NÃO aprova P/O/A final, ponto de fuga final nem READY?") — mitiga F-02.
  2. Para eventos com boundary flag (Asiana, UPS), substituir a pergunta binária "escape point claro?" por uma escolha entre os candidatos rivais ("o ponto de fuga deve ser X, Y, ou indefinir?") — mitiga F-01.
  3. Trocar o rótulo de roteamento "segue" por algo inequívoco ("seguir apenas para method review candidate-only").
- **As respostas simples são suficientes** para registrar intenção, mas insuficientes para capturar a ambiguidade de ponto de fuga que os analistas já documentaram; hoje há divergência silenciosa entre a gap matrix e o "sim" do autor.
- **Pergunta adicional a incluir:** uma que force o autor a reconhecer a existência de candidato alternativo quando a gap matrix marcar boundary — caso contrário o método "esconde" sua própria incerteza do decisor humano.

---

## 11. Tooling recommendation

**Opus — onde agrega valor agora:** (1) reauditoria focada do ponto de fuga de Colgan (ambiguidade genuína que exige julgamento, não documentação); (2) a candidate-only method review dos top-3 (raciocínio de método, contraste de candidatos rivais em Asiana/UPS); (3) o architecture-simplification checkpoint (F-07). **Onde é desperdício:** consolidação de CSV, escrita de LOG, normalização de locator, registro de intake, triagem mecânica de fila. **Próximas 2–3 tarefas Opus:** Colgan re-audit → top-3 method review (com warnings) → revisão de simplificação arquitetural.

**Codex — o que deve consolidar:** normalizar o locator rastreável de G-WNSB (F-05); consolidar os blocos de lock repetidos num único contrato referenciado; triar a fila complementar (eventos 7–21) em negative/boundary/HOLD; corrigir o extraction log A4R167 (afirmação incorreta sobre P-H, F-09); registrar respostas autorais e estados. Tudo determinístico/operacional.

**Perplexity — quando voltar:** somente na campanha externa futura (Etapa B do roadmap A4R200-A) para 20–40 candidatos reais; focar nas famílias ausentes (controle negativo técnico, decisão não-approach, no-failure boundary) e nos source fixes (Turkish/Spanair/Pel-Air). **Não pedir:** P/O/A, conclusões, escolha de ponto de fuga, classificação, ou tratamento de Daumas como fonte factual.

---

## 12. Próxima fase recomendada

- **Rota principal:** `A4R202-E candidate-only method review dos top 3` em lane dividida — **Comair como âncora limpa** (`PROCEED`), **Asiana + UPS com warnings explícitos de boundary** (`PROCEED_WITH_LIMITATION`), conforme F-03/F-04. Justificativa: os três já têm author intake registrado, são os mais fortes do Batch 1, e a method review é exatamente onde o contraste de candidatos rivais deve acontecer — mas a uniformidade do intake precisa ser corrigida com warnings carregados para frente.
- **Rota secundária:** `Colgan-only re-audit` (Opus), porque é o único top-tier com ambiguidade estrutural de ponto de fuga e risco de consequence-as-cause; resolvê-lo destrava tanto o uso comparativo quanto o desenho do sintético GAP-004.
- **Forte terceira (recomendo encaixar logo):** `Architecture simplification checkpoint` (F-07) antes do Deep Extraction Batch 2, para evitar que a validação documental ultrapasse a metodológica. Não escolhida como principal apenas porque não bloqueia o avanço dos top-3, mas o custo de adiá-la cresce a cada fase.

---

## 13. Confirmação de bloqueios

Esta auditoria confirma explicitamente que:

- não produziu P/O/A final
- não aprovou ponto de fuga final (todos os escape points permanecem candidate-only)
- não promoveu READY
- não criou selectedCode / releasedCode / finalConclusion
- não criou fixture / baseline / produto
- não usou Daumas como fonte factual de evento real (Daumas tratado apenas como referência humana/metodológica)
- não criou HFACS / Risk / ERC / ARMS / recommendations
- não criou recomendação operacional
- não acessou git, não commitou, não rodou testes, não fez busca externa, não baixou fontes, não criou CSV operacional para commit
