# SERA Code–Evidence Matrix — Draft v0.1.2

**Data:** 2026-05-16
**Status:** Draft — não normativo; não altera motor, fixtures ou baseline.
**Foco:** códigos mais críticos para as fases v0.1.1 e v0.1.2-A.
**Relacionado:** `docs/SERA_EVIDENCE_SUFFICIENCY_AUDIT.md`, `docs/SERA_PRECONDITIONS_POLICY_v0.1.2.md`

---

## Introdução

Este documento registra, por código SERA, as evidências que confirmam ou excluem a classificação, os casos de fronteira conhecidos e os fallbacks conservadores. Não substitui o motor — descreve o que o motor deve implementar e onde ainda há lacunas.

**Convenção de leitura:**

| Campo | Significado |
|---|---|
| Evidência positiva | Padrões textuais ou semânticos que confirmam o código |
| Evidência negativa | Padrões que excluem o código (falso positivo se presentes) |
| Evidência insuficiente | Quando o relato não permite classificar com segurança |
| Falsos positivos comuns | Casos que parecem o código mas não são |
| Falsos negativos comuns | Casos que têm o código mas não são capturados |
| Fallback conservador | Código a usar quando há dúvida |
| Fixtures relevantes | IDs de fixtures que ilustram o código |

---

## PARTE I — OBJETIVO (O)

---

### O-A — Objetivo Nominal (Sem Desvio Consciente)

**Definição operacional:** O operador executa a ação com objetivo operacional correto e consistente com as normas. Não há desvio consciente de regra, procedimento ou expectativa operacional conhecida. O evento resultou de falha perceptiva, restrição externa, incapacidade ou déficit de conhecimento — não de decisão de desviar.

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | Relato descreve restrição externa (ferramenta indisponível, informação ausente, alta demanda operacional, ilusão perceptiva, briefing ambíguo); OU operador desconhecia o procedimento correto; OU operador seguia o que considerava ser a instrução correta. |
| **Evidência negativa** | Relato explicita que operador conhecia o procedimento e decidiu conscientemente não segui-lo; padrões de O-B, O-C ou O-D presentes. |
| **Evidência insuficiente** | Relato ambíguo sobre se o desvio foi consciente ou imposto por restrição — nenhum dado sobre o estado de conhecimento do operador. |
| **Falsos positivos comuns** | Situação de alta pressão onde o operador tomou decisão rápida — pode ser O-C se a decisão foi consciente de desviar, não apenas de agir. |
| **Falsos negativos comuns** | Relato de operador "impulsionado pela situação" pode ser lido como voluntário quando era reativo (P-D + O-A correto). |
| **Fallback conservador** | **O-A é sempre o fallback** quando há dúvida entre O-A e O-C — ausência de evidência de desvio consciente direciona para O-A. |
| **Gate determinístico** | `hasKnowledgeDeficitObjectiveContext` força O-A quando há déficit explícito de conhecimento/treinamento. |
| **Fixtures relevantes** | TEST-GEN-OC-NP-005 (adversarial — deve retornar O-A, não O-C); TEST-P-D-001, TEST-P-F-001, TEST-P-H-001, TEST-T2-W2-001 (pré-patch: falso O-C; pós-patch: O-A correto). |

---

### O-B — Violação Rotineira / Normalizada

**Definição operacional:** O operador desvia conscientemente de um procedimento ou norma de forma habitual, normalizada ou culturalmente tolerada. O desvio não é excepcional — é a prática estabelecida na equipe, setor ou cultura organizacional. Pode haver conivência implícita ou explícita da supervisão.

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | "todos faziam assim", "prática habitual", "prática tolerada", "ninguém seguia esse procedimento", "hábito da equipe", "era comum no setor", "supervisão sabia e não intervinha", "rotina estabelecida", "normalizado informalmente". |
| **Evidência negativa** | Desvio descrito como pontual, primeira vez, individual, sem histórico similar na equipe; decisão consciente sem precedente cultural (→ O-C). |
| **Evidência insuficiente** | Relato descreve desvio mas não especifica se era habitual ou excepcional para aquele operador/equipe. |
| **Falsos positivos comuns** | Operador veterano que comete um desvio pontual pode parecer "prática rotineira" se o relato mencionar "habitual" como contexto pessoal, não coletivo. |
| **Falsos negativos comuns** | Equipes onde a normalização é implícita e o relato descreve apenas a ação sem mencionar o contexto cultural (o desvio aparece como pontual mas é rotineiro). |
| **Fallback conservador** | O-C se o desvio for claramente consciente mas não normalizado; O-A se não houver desvio consciente evidente. |
| **Gate determinístico** | `hasExplicitRoutineNormalization` força O-B para padrões como "todos faziam assim", "prática tolerada", "hábito estabelecido". |
| **Fronteira crítica** | O-B vs. O-C: O-C é desvio pontual/excepcional; O-B é desvio sistemático/normalizado. A diferença está no padrão coletivo, não na motivação individual. |
| **Fixtures relevantes** | TEST-O-B-001; TEST-GEN-OB-001, TEST-GEN-OB-002 (P-G + O-B), TEST-GEN-OB-003 (P-A + O-B). |

---

### O-C — Violação Excepcional (Desvio Consciente Pontual)

**Definição operacional:** O operador desvia conscientemente de procedimento, regra ou expectativa operacional **conhecida**, de forma **pontual** e **não rotineira**, por motivação situacional própria. Não requer proteção humana como motivação — O-C por conveniência, improviso, pressão circunstancial ou julgamento próprio é igualmente válido.

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | Relato contém evidência explícita de: (a) conhecimento do procedimento correto ("sabia que era obrigatório", "conhecia a norma", "tinha pleno conhecimento"); E (b) decisão consciente de não segui-lo ("decidiu não cumprir", "optou por não seguir o protocolo", "adotou atalho fora do procedimento", "optou por não seguir o procedimento"). Caráter pontual: "primeira vez", "decisão individual", "sem histórico similar na equipe". |
| **Evidência negativa** | Operador desconhecia o procedimento (→ O-A); desvio é prática habitual/normalizada (→ O-B); motivação é ganho sistêmico de eficiência/economia/tempo como objetivo primário (→ O-D); restrição externa tornou o procedimento inaplicável (→ O-A). |
| **Evidência insuficiente** | Situação descrita como "excepcional" ou "incomum" sem que haja evidência de que o operador conhecia o procedimento e decidiu conscientemente descumpri-lo. Situação excepcional **sozinha** não basta para O-C. |
| **Falsos positivos comuns** | (1) Alta demanda operacional (P-D) + decisão rápida → LLM pode interpretar como "desvio excepcional consciente" (era o caso dos PARTIALs pré-patch). (2) Ilusão perceptiva (P-F) → LLM pode confundir "ação contrária ao procedimento por ilusão" com "desvio consciente". (3) Briefing ambíguo (P-H) → "inspeção do sistema errado" não é desvio consciente. (4) Ferramenta indisponível (T2-W2) → improviso forçado por restrição externa não é O-C. |
| **Falsos negativos comuns** | O-C não-protetivo com vocabulário fora dos 28 padrões lexicais do gate `hasConsciousObjectiveDeviationEvidence` — o LLM classifica O-C corretamente mas o gate pós-LLM descarta e retorna O-A conservador. Requer que o relato contenha ao menos um dos padrões lexicais reconhecidos. |
| **Fallback conservador** | **O-A** — quando há dúvida sobre se o desvio foi consciente de regra conhecida, o fallback é O-A. O gate `hasConsciousObjectiveDeviationEvidence` implementa este fallback: na ausência de evidência lexical de desvio consciente, O-C retornado pelo LLM é convertido para O-A. |
| **Gate determinístico pré-LLM** | `hasExplicitProtectiveHumanIntent` → O-C direto (casos protetivos com emergência/paciente). `hasExplicitRoutineNormalization` → O-B (bloqueia O-C). `hasExplicitEfficiencyObjective` → O-D (bloqueia O-C). `hasKnowledgeDeficitObjectiveContext` → O-A (bloqueia O-C). |
| **Gate determinístico pós-LLM** | `hasConsciousObjectiveDeviationEvidence` — quando LLM retorna O-C, este gate verifica presença de ao menos um dos 28 padrões lexicais de desvio consciente. Se ausente, retorna O-A. |
| **Padrões lexicais confirmados (gate)** | "sabia que era contra", "sabia que era proibido", "sabia que nao devia", "decidiu descumprir", "decidiu nao cumprir", "decidiu nao seguir o procedimento", "decidiu nao seguir o protocolo", "optou por descumprir", "optou por nao seguir o procedimento", "optou por nao seguir o protocolo", "optou por nao cumprir", "optou por ignorar o procedimento", "conhecia o procedimento e decid", "conhecia a norma e decid", "violou conscientemente", "descumpriu conscientemente", "descumpriu deliberadamente", "ignorou deliberadamente", "adotou atalho fora do procedimento", entre outros (28 no total em `all-steps.ts:1212`). |
| **Fixtures relevantes** | TEST-O-C-001, TEST-O-C-002 (O-C protetivo); TEST-GEN-OC-001, TEST-GEN-OC-002, TEST-GEN-OC-003 (O-C protetivo com variação); TEST-GEN-OC-NP-001, NP-002 (O-C não-protetivo — P-A/O-C/A-A); TEST-GEN-OC-NP-003 (O-C + P-G/A-B gates); TEST-GEN-OC-NP-004 (O-C não-protetivo — petroquímica); TEST-GEN-OC-NP-005 (adversarial — bloqueia O-C, retorna O-A). |

**Nota crítica — O-C não exige proteção humana:**
> Esta distinção está implementada no patch `4367228` e validada nas fixtures NP-001 a NP-004. Qualquer gate ou prompt que restrinja O-C a casos de proteção humana viola a definição metodológica. O gate A-A(O-C) em Step 5 usa a justificativa "objetivo protetivo/humano explícito" como template interno — isso não implica que O-C seja exclusivamente protetivo.

---

### O-D — Objetivo de Eficiência / Economia

**Definição operacional:** O operador desvia conscientemente do procedimento com objetivo **primário** de ganhar tempo, reduzir custo, aumentar eficiência ou produtividade operacional como meta sistemática. A motivação é o ganho operacional, não proteção humana nem conveniência situacional pontual.

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | "reduzir combustível", "ganhar tempo", "cumprir janela de conexão", "reduzir tempo de voo", "rota mais curta", "produtividade", "eficiência operacional", "economia de recursos", "objetivo de desempenho". |
| **Evidência negativa** | Motivação é proteção humana (→ O-C protetivo); motivação é conveniência circunstancial pontual sem objetivo sistêmico (→ O-C); desvio é normalizado/habitual (→ O-B). |
| **Evidência insuficiente** | Relato menciona "mais rápido" sem indicar que o ganho de tempo era o objetivo principal — pode ser O-C com atalho pontual. |
| **Falsos positivos comuns** | O-C com vocabulário de eficiência ("acabar mais rápido", "sem perder tempo") pode ser lido como O-D se o relato não deixar claro que é situacional. |
| **Falsos negativos comuns** | O-D encoberto por justificativas operacionais ("era necessário", "para atender o cliente") sem usar o vocabulário padrão do gate. |
| **Fallback conservador** | O-C se há desvio consciente pontual sem objetivo sistêmico; O-A se não há evidência de desvio consciente. |
| **Gate determinístico** | `hasExplicitEfficiencyObjective` em `rules/objective/select.ts` força O-D para padrões de eficiência/produtividade/tempo. |
| **Fronteira crítica** | O-D vs. O-C: O-D é estratégico/sistêmico; O-C é situacional/pontual. Se o ganho de eficiência é o objetivo central e recorrente, é O-D. Se é atalho situacional, é O-C. |
| **Fixtures relevantes** | TEST-O-D-001, TEST-O-D-002; TEST-GEN-OD-001, TEST-GEN-OD-002, TEST-GEN-OD-003. |

---

## PARTE II — PERCEPÇÃO (P)

---

### P-A — Percepção Ativa / Sem Falha Perceptiva

**Definição operacional:** O operador percebeu corretamente o ambiente e as informações relevantes. A falha não está na percepção — está na decisão, conhecimento ou execução. P-A é o código padrão quando não há evidência de falha perceptiva específica.

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | Relato descreve situação clara sem barreiras sensoriais, sem ambiguidade de informação, sem restrição de tempo grave. Operador via/ouvia/lia as informações corretamente. |
| **Evidência negativa** | Evidência de barreira sensorial (→ P-B), déficit de conhecimento interpretativo (→ P-C), sobrecarga atencional (→ P-D), ilusão perceptiva (→ P-F), falha de monitoramento (→ P-G), falha de canal de informação (→ P-H). |
| **Evidência insuficiente** | Relato não descreve o estado perceptivo do operador — assume-se P-A por ausência de evidência contrária (fallback conservador). |
| **Falsos positivos comuns** | Violação rotineira (O-B) pode ter P-A correto; cuidado ao não confundir ausência de falha perceptiva com ausência de falha geral. |
| **Falsos negativos comuns** | Relato com omissão de etapa de verificação pode ser lido como P-A quando deveria ser P-G (monitoramento falhou). |
| **Fallback conservador** | **P-A é o fallback universal** — na ausência de evidência de falha perceptiva específica, P-A é retornado. |
| **Fixtures relevantes** | A maioria das fixtures O-C, O-B, O-D tem P-A; TEST-GEN-OC-NP-001, NP-002, NP-004. |

---

### P-C — Déficit de Conhecimento Interpretativo

**Definição operacional:** O operador tinha acesso sensorial adequado à informação, mas não tinha o conhecimento ou treinamento necessário para interpretar corretamente o que percebia. A falha é epistêmica, não sensorial.

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | "não sabia o que significava", "desconhecia o procedimento", "não havia recebido treinamento específico", "não conhecia o sistema", "não estava familiarizado com", "não havia sido informado sobre". |
| **Evidência negativa** | Barreira sensorial presente (→ P-B); operador conhecia o procedimento e decidiu ignorá-lo (→ P-A + O-C); alta demanda atencional (→ P-D). |
| **Evidência insuficiente** | Relato menciona "não percebeu" sem especificar se foi por falta de conhecimento ou outro mecanismo. |
| **Falsos positivos comuns** | Operador novo que comete desvio pode ter P-C ou P-A + O-A dependendo de se o desvio foi por desconhecimento ou por restrição externa. |
| **Falsos negativos comuns** | Operador terceirizado ou novo no projeto — o relato pode não explicitar que "não sabia" se isso é implícito no contexto. |
| **Fallback conservador** | P-A se não há evidência clara de déficit de conhecimento. |
| **Gate determinístico** | Gate P-C no Step 3 (`evidenceOfKnowledgeDeficit`, `evidenceOfInterpretiveKnowledgeDeficit`) força P-C quando há evidência lexical de déficit. |
| **Cascata com O-A** | P-C + `hasKnowledgeDeficitObjectiveContext` → força O-A — se operador desconhecia o protocolo, não há desvio consciente, portanto O-A. |
| **Fixtures relevantes** | TEST-GEN-OC-NP-005 (adversarial: P-C + O-A + A-E, soldador sem treinamento para pré-aquecimento). |

---

### P-G — Falha de Monitoramento

**Definição operacional:** O operador falhou em verificar, conferir ou monitorar uma condição ou informação que estava disponível e que deveria ter sido verificada por iniciativa própria — seja por complacência, hábito ou excesso de confiança.

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | "não verificou", "não conferiu", "não checou", "assumiu normalidade", "assumiu que estava correto", "deveria ter verificado", "condição disponível não conferida", "sem verificar o estado". |
| **Evidência negativa** | Informação não estava disponível para o operador (→ P-H); sobrecarga atencional impediu verificação (→ P-D); barreira sensorial (→ P-B). |
| **Evidência insuficiente** | Relato descreve omissão de etapa mas não especifica se a condição estava disponível para verificação. |
| **Falsos positivos comuns** | O-B (violação rotineira) com omissão de etapa de verificação pode ativar P-G mesmo quando o mecanismo dominante é objetivo desviante (L3-01 da auditoria). Exemplo: TEST-O-B-001 teve 1 run com P-G incorreto. |
| **Falsos negativos comuns** | Relato descreve resultado da omissão (componente não instalado) sem mencionar que houve falha de verificação — P-G pode não ser ativado. |
| **Fallback conservador** | P-A se não há evidência de monitoramento esperado que foi omitido. |
| **Gate determinístico** | Gate P-G no Step 3 (`evidenceOfMonitoringFailure`). Risco de over-match em contextos O-B (lacuna L3-01). |
| **Cascata com A-B** | P-G + omissão de passo obrigatório → A-B. Exemplo: TEST-GEN-OC-NP-003 (mecânico aeronáutico, two-person rule). |
| **Fixtures relevantes** | TEST-P-G-001; TEST-GEN-PG-001; TEST-GEN-OB-001, TEST-GEN-OB-002 (P-G + O-B); TEST-GEN-OC-NP-003 (P-G + O-C + A-B). |

---

## PARTE III — AÇÃO (A)

---

### A-A — Ação Coerente com Percepção (sem falha de execução)

**Definição operacional:** O operador executou a ação que pretendia executar, de forma coerente com sua percepção e crença no momento. A falha não está na execução — está na decisão ou conhecimento que gerou a ação errada. A-A não significa "ação correta" — significa "ação executada conforme intenção".

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | Ação foi executada deliberadamente conforme o plano do operador; não houve lapso, esquecimento ou erro motor; resultado foi consequência direta da intenção (mesmo que errada). |
| **Evidência negativa** | Operador tentou fazer X mas fez Y por erro motor (→ A-C); operador esqueceu etapa conhecida (→ A-B se omissão obrigatória); operador selecionou procedimento errado (→ A-F); operador teve incapacidade física (→ A-D). |
| **Evidência insuficiente** | Relato descreve o resultado mas não o processo de execução — não é possível distinguir A-A de A-C. |
| **Falsos positivos comuns** | O-C com A-A correto pode ser confundido com A-F quando o operador deliberadamente escolheu um procedimento incompleto (ver NP-004 original). |
| **Falsos negativos comuns** | Ação deliberada de desvio descrita com linguagem de "não fez X" pode ser lida como A-B (omissão) em vez de A-A (desvio intencional executado). |
| **Fallback conservador** | A-A é o fallback para O-C quando não há indicação de falha de execução. Gate A-A (O-C) no Step 5 força A-A para cenários O-C sem outro gate específico. |
| **Gates determinísticos** | Gate A-A (barreira sensorial), Gate A-A (objetivo protetivo), Gate A-A (briefing ambíguo), Gate A-A (violação rotineira), Gate A-A (eficiência), Gate A-A (O-C forçado). |
| **Nó LLM crítico** | Nó 2 de Step 5: "A ação foi coerente com a percepção/crença do operador no momento?" → Sim = A-A. Resposta depende de como o relato descreve a motivação da ação. |
| **Fixtures relevantes** | TEST-O-C-001, TEST-O-C-002, TEST-GEN-OC-001..003, NP-001, NP-002, NP-004; TEST-O-B-001, TEST-GEN-OB-003. |

---

### A-B — Omissão de Passo Obrigatório

**Definição operacional:** O operador não executou uma etapa específica e obrigatória do procedimento — seja por esquecimento, complacência ou priorização inadequada. A omissão não foi necessariamente intencional (distingue-se de desvio consciente A-A sob O-C).

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | "não instalou", "não travou", "não reinstalou", "não completou checklist", "omitiu passo", "passo obrigatório não executado", "etapa foi omitida", "pino de travamento não reinstalado". |
| **Evidência negativa** | Operador deliberadamente escolheu não executar a etapa (→ A-A sob O-C se desvio consciente); operador verificou sua própria ação e não detectou erro (→ A-C); ação foi executada mas de forma errada (→ A-F). |
| **Evidência insuficiente** | Relato descreve resultado (componente faltando) mas não deixa claro se a etapa foi omitida ou se houve falha em outra etapa. |
| **Falsos positivos comuns** | O-C com omissão deliberada (tipo NP-003) ativa o gate A-B mesmo sendo uma omissão intencional. O gate não verifica se a omissão foi voluntária — verifica apenas se houve omissão de passo obrigatório. |
| **Falsos negativos comuns** | Omissão descrita como "não fez porque não sabia que devia" — pode ser lida como A-E (conhecimento insuficiente) em vez de A-B. |
| **Fallback conservador** | A-B quando há evidência de etapa específica não executada, independente de intencionalidade. |
| **Gate determinístico** | Gate A-B no Step 5 (`evidenceOfProceduralOmission`). Verifica padrões léxicos de omissão física/procedural. |
| **Cascata com P-G** | P-G + A-B: quando a omissão é também falha de monitoramento da própria ação. Exemplo: TEST-GEN-OC-NP-003 (mecânico que não chamou segundo verificador — P-G gate + A-B gate, ambos determinísticos). |
| **Fronteira A-B / A-C** | A-B: etapa não executada. A-C: etapa executada mas operador não verificou sua própria execução. Gate A-C bloqueado por `AND NOT proceduralOmission`. |
| **Fixtures relevantes** | TEST-A-B-001; TEST-GEN-AB-001; TEST-GEN-OC-NP-003 (O-C + P-G + A-B). |

---

### A-E — Ação por Déficit de Conhecimento / Treinamento

**Definição operacional:** O operador executou a ação errada (ou não executou a correta) porque não tinha o conhecimento, treinamento ou competência técnica necessária. A falha é de capacidade/formação, não de decisão ou execução.

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | "não havia recebido treinamento específico", "desconhecia o procedimento", "não sabia que era necessário", "falta de familiaridade com o sistema", "nunca havia operado aquele equipamento", "treinamento insuficiente". |
| **Evidência negativa** | Operador tinha treinamento e conhecimento adequados — a falha foi de outra natureza (→ A-A, A-B, A-F conforme o caso). |
| **Evidência insuficiente** | Relato descreve resultado incorreto sem especificar se operador tinha ou não o conhecimento necessário. |
| **Falsos positivos comuns** | Operador experiente que comete erro por complacência (→ A-B ou A-C) pode ter "falta de atenção" confundida com "déficit de conhecimento". |
| **Falsos negativos comuns** | Terceirizado ou novato em contexto específico — treinamento insuficiente pode não ser mencionado explicitamente se o relato focar no resultado. |
| **Fallback conservador** | A-B se houve omissão de etapa conhecida; A-E apenas se há evidência de déficit de conhecimento. |
| **Gate determinístico** | Gate A-E no Step 5 (`evidenceOfKnowledgeDeficit`). Normalmente acompanha P-C e O-A. |
| **Cascata típica** | P-C + O-A + A-E: tríade de déficit de conhecimento. ERC acompanha como nível 2-3. |
| **Fixtures relevantes** | TEST-A-E-001; TEST-GEN-OC-NP-005 (P-C + O-A + A-E, ERC2). |

---

### A-F — Seleção Incorreta de Procedimento

**Definição operacional:** O operador selecionou ou aplicou o procedimento, método ou sequência errada — não por falha de execução motora nem por omissão, mas por escolha de alternativa inadequada.

| Campo | Conteúdo |
|---|---|
| **Evidência positiva** | "escolheu o procedimento errado", "aplicou o método inadequado", "selecionou a opção incorreta", "utilizou alternativa não autorizada para aquela situação", "executou sequência errada". |
| **Evidência negativa** | Operador executou o procedimento correto mas cometeu erro motor (→ A-C); operador omitiu etapa (→ A-B); operador agiu corretamente conforme sua intenção (→ A-A). |
| **Evidência insuficiente** | Relato descreve resultado incorreto sem especificar se foi escolha de método errado ou falha de execução. |
| **Falsos positivos comuns** | O-C com escolha deliberada de procedimento incompleto pode ser classificado como A-F em vez de A-A — depende de Nó 2 (coerência com crença). Se operador SABIA que estava fazendo incompleto, Nó 2 pode responder "Não" → A-F. |
| **Falsos negativos comuns** | Ilusão perceptiva (P-F) leva a seleção de controle errado — pode ser capturado por gate A-F (ilusão perceptiva) antes de chegar ao LLM. |
| **Fallback conservador** | A-F quando há evidência de escolha errada de método; A-B se foi omissão; A-A se foi intenção coerente. |
| **Gate determinístico** | Gate A-F (ilusão perceptiva), Gate A-F (seleção errada) em Step 5; Nó 5 sem pressão (LLM) → A-F quando deliberadamente selecionou execução incompleta. |
| **Nota NP-004** | O cenário original de NP-004 (inspeção de 14 pontos reduzida a 10) produzia A-F porque o LLM em Nó 2 concluía que a ação NÃO era coerente com a crença (o controlador sabia que eram 14 obrigatórios). O rewrite do cenário para SIS automático vs. manual produziu A-A porque Nó 2 concluiu que a ação ERA coerente com a crença do operador (achava que manual era suficiente). |
| **Fixtures relevantes** | TEST-A-F-001; TEST-COMBO-001 (P-G + O-A + A-F). |

---

## PARTE IV — ERC (Nível de Risco Contribuinte)

### ERC — Tabela de Combinações Determinísticas

O motor (`inferDeterministicErcLevel`) sobrescreve o LLM para ~12 combinações conhecidas. As mais relevantes para as fases recentes:

| Combinação | ERC determinístico | Justificativa |
|---|---|---|
| O-B + A-A (qualquer P) | 1 | Violação rotineira sem incapacidade |
| A-C (qualquer) | 2 | Falha de auto-verificação — severidade moderada |
| P-H + A-A | 3 | Falha de canal de informação |
| P-D + A-A | 3 | Sobrecarga atencional |
| A-B (qualquer) | 3 | Omissão de etapa obrigatória |
| O-C + A-A + P-A | 2 | Violação consciente pontual sem agravante |
| P-C + O-A + A-E | 2 | Déficit de conhecimento — causa sistêmica/formação |

**Nota:** ERC não determinístico (LLM) ocorre quando a combinação não está coberta pela função `inferDeterministicErcLevel`. Isso pode gerar variação entre runs — identificado como risco em TEST-GEN-OC-NP-004 (versão original com A-F).

---

## PARTE V — PRECONDITIONS PRIORITÁRIAS

### Preconditions de Alta Relevância para as Fases Recentes

Para cada precondition, são descritas: definição, evidência positiva e fixtures de referência. A análise completa de todas as preconditions será feita em documento separado.

---

**P2 — Julgamento Individual / Estado Psicológico**

| Campo | Conteúdo |
|---|---|
| Definição | Fator cognitivo/psicológico do operador: julgamento equivocado, complacência, excesso de confiança, estado mental relevante. |
| Evidência positiva | "decidiu", "julgou", "avaliou", "acreditou", "optou", "considerou aceitável", "excesso de confiança", "complacência". |
| Risco de noise | P2 pode ser inferido por plausibilidade em qualquer cenário humano sem evidência direta de estado psicológico. |
| Fixtures | NP-001..004 (via matrix rule O-C__A-A). |

---

**P3 — Complacência / Hábito**

| Campo | Conteúdo |
|---|---|
| Definição | Automatismo, rotina que adormece a atenção crítica, excesso de familiaridade com a tarefa. |
| Evidência positiva | "rotina", "habitual", "sempre fez assim", "automático", "não prestou atenção porque era comum", "complacência". |
| Risco de noise | P3 pode ser confundida com O-B (normalização coletiva) — P3 é fator individual, O-B é fenômeno coletivo. |
| Fixtures | TEST-O-B-001, TEST-GEN-OB-001, TEST-GEN-OB-002. |

---

**P5 — Falta de Aptidão / Qualificação para a Tarefa Específica**

| Campo | Conteúdo |
|---|---|
| Definição | Operador não qualificado/certificado para o tipo específico de tarefa, equipamento ou material envolvido. |
| Evidência positiva | "não havia recebido treinamento específico para aquele material", "contrato não especificava requisitos de qualificação", "terceirizado sem certificação para aquele projeto". |
| Fixtures | TEST-GEN-OC-NP-005 (soldador terceirizado, top_preconditions inclui P5). |

---

**P6 — Falta de Conhecimento / Treinamento Genérico**

| Campo | Conteúdo |
|---|---|
| Definição | Operador não tinha o conhecimento ou treinamento necessário para a ação em questão. Menos específico que P5. |
| Evidência positiva | "não sabia", "desconhecia", "não treinado", "falta de familiaridade", "nenhum treinamento sobre". |
| Distinção P5 vs. P6 | P5: falta de qualificação formal para a tarefa específica. P6: falta de conhecimento/treinamento em sentido mais amplo. |
| Fixtures | TEST-GEN-OC-NP-005; TEST-A-E-001. |

---

**S1 — Pressão Social / Organizacional**

| Campo | Conteúdo |
|---|---|
| Definição | Pressão de pessoas, hierarquia, cultura organizacional ou expectativas externas que influenciaram a decisão do operador. |
| Evidência positiva | "pressão da supervisão", "cliente exigia", "passageiro", "paciente", "pressão para terminar", "expectativa da equipe". |
| Risco de bias | A regra `O-C__A-A` na matrix.json lista evidências de S1 enviesadas para proteção humana ("passageiro", "paciente", "doente"). Fixtures O-C não-protetivo não acionam essas evidências — recall de S1 cai. A regra precisa ser ampliada. |
| Fixtures | TEST-O-C-001 (S1 com passageiro); NP-001..004 (S1 ausente ou não acionado por vocabulário). |

---

**S3 — Falta de Supervisão / Verificação por Terceiros**

| Campo | Conteúdo |
|---|---|
| Definição | Ausência ou falha de supervisão, revisão, verificação por outra pessoa que deveria ter detectado ou prevenido o evento. |
| Evidência positiva | "sem supervisão", "não houve revisão", "verificação independente não realizada", "supervisor não estava presente". |
| Risco de noise | S3 pode ser inferido em qualquer cenário sem menção a supervisão — o LLM tende a incluir S3 por plausibilidade. |
| Fixtures | TEST-GEN-OC-NP-003 (two-person rule omitida — S3 é precondition esperada). |

---

**O1 — Alta Carga / Demanda Operacional**

| Campo | Conteúdo |
|---|---|
| Definição | Volume de trabalho, número de tarefas simultâneas ou complexidade operacional acima do normal. |
| Evidência positiva | "alta demanda", "sobrecarga", "múltiplas aeronaves", "pressão operacional", "carga de trabalho elevada". |
| Fixtures | TEST-P-D-001, TEST-A-I-001 (alta demanda ATC). |

---

**O3 — Ausência / Falha de Procedimento Formal**

| Campo | Conteúdo |
|---|---|
| Definição | Procedimento ausente, inadequado, não atualizado ou não comunicado que contribuiu para o evento. |
| Evidência positiva | "procedimento não especificava", "norma não cobria", "ausência de protocolo", "contrato não especificava". |
| Fixtures | TEST-GEN-OC-NP-005 ("contrato de terceirização não especificava requisitos de qualificação por material"). |

---

**T1 — Pressão de Tempo / Urgência**

| Campo | Conteúdo |
|---|---|
| Definição | Fator temporal que influenciou a decisão ou ação — prazo, urgência, janela operacional. |
| Evidência positiva | "antes do fim do turno", "urgência", "prazo", "janela de tempo", "queria concluir antes". |
| Distinção T1 vs. O-D | T1 é uma precondition (fator que contribuiu); O-D é o objetivo (reduzir tempo era o fim em si). |
| Fixtures | TEST-GEN-OC-NP-003 ("pressão auto-imposta, queria concluir antes do fim do turno" → T1 esperada). |

---

**W1 — Falha de Equipamento / Sistema / Interface**

| Campo | Conteúdo |
|---|---|
| Definição | Equipamento, sistema ou interface que falhou, estava indisponível, mal projetado ou mal identificado. |
| Evidência positiva | "ferramenta indisponível", "equipamento defeituoso", "interface confusa", "sistema sem feedback". |
| Risco de noise | W1 pode ser inferida como "precondição organizacional" em qualquer cenário sem evidência direta de falha de equipamento. |
| Fixtures | TEST-T2-W2-001 (ferramenta inadequada → W2 + W1); TEST-GEN-OC-NP-003 (W1 na matrix P-G + A-B). |

---

## PARTE VI — Fronteiras Críticas e Decisões de Classificação

### Diagrama de fronteiras principais

```
Objetivo:
  O-A ←→ O-C: presença de desvio CONSCIENTE de regra CONHECIDA
  O-C ←→ O-B: caráter PONTUAL vs. HABITUAL/NORMALIZADO
  O-C ←→ O-D: motivação SITUACIONAL vs. EFICIÊNCIA SISTÊMICA
  O-A ←→ O-D: há desvio consciente com objetivo de eficiência → O-D; sem desvio → O-A

Percepção:
  P-A ←→ P-G: houve falha de MONITORAMENTO/VERIFICAÇÃO esperada?
  P-A ←→ P-C: há déficit de CONHECIMENTO INTERPRETATIVO?
  P-G ←→ P-A (em O-B): gate P-G pode over-match em violações rotineiras (lacuna L3-01)

Ação:
  A-A ←→ A-B: ação INTENCIONAL coerente vs. OMISSÃO de passo obrigatório
  A-A ←→ A-F: ação COERENTE com crença vs. SELEÇÃO de procedimento errado
  A-B ←→ A-C: omissão de ETAPA vs. falha de VERIFICAÇÃO da própria ação
  A-E ←→ A-B: déficit de CONHECIMENTO vs. OMISSÃO de etapa conhecida
```

### Regra de desambiguação para O-C vs. O-A em pressão temporal

| Situação | Classificação correta | Razão |
|---|---|---|
| Pressão de tempo **auto-imposta**, operador conhecia o procedimento e escolheu não cumprir | O-C | Pressão interna + desvio consciente de regra conhecida |
| Pressão de tempo **imposta externamente** (deadline, cliente, hierarquia), operador seguiu o que conseguia | O-A | Restrição externa sem desvio consciente |
| Urgência médica real, operador desviou para proteger paciente | O-C protetivo | Desvio consciente com motivação protetiva |
| Alta demanda operacional (ATC, tráfego aéreo intenso), ação inadequada por sobrecarga | O-A + P-D | Restrição de capacidade externa, não desvio consciente |

---

## Apêndice — Issues Abertas para v0.1.2-B

| ID | Tipo | Descrição | Prioridade |
|---|---|---|---|
| EVM-001 | `matrix.json` | Regra `O-C__A-A` com evidências de S1 e T1 enviesadas para O-C protetivo — recall cai para O-C não-protetivo | Alta |
| EVM-002 | Gate | `evidenceOfMonitoringFailure` pode over-match em contextos O-B puro — risco de P-G falso em violações rotineiras | Alta |
| EVM-003 | Gate | ERC não determinístico para A-F + O-C — `inferDeterministicErcLevel` não cobre essa combinação | Média |
| EVM-004 | Fixtures | Fixtures NP-001..004 sem precondition-critical marcada — recall de 60% não é avaliado por classe | Média |
| EVM-005 | Docs | Matriz incompleta para códigos P-B, P-D, P-E, P-F, P-H, A-C, A-D, A-G, A-H, A-I, A-J | Baixa |
| EVM-006 | Motor | Pipeline não implementa estado "insuficiente" — sempre classifica, nunca retorna perguntas complementares (PCC-01) | Baixa |
