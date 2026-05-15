# SERA Code Evidence Matrix

**Data:** 2026-05-14
**Status:** Documentação metodológica — referência para revisão, desenvolvimento e produto.

---

## 1. Introdução

Esta matriz define, para cada código SERA, a evidência positiva que sustenta a classificação, a evidência negativa que a exclui, as confusões mais comuns e exemplos de fronteira metodológica.

É uma ferramenta de referência para:
- revisores que auditam classificações;
- desenvolvedores que ajustam gates e prompts;
- produto que cria textos explicativos de UX.

**Não substitui o código runtime.** Em caso de divergência, o comportamento do pipeline prevalece sobre esta documentação até que seja intencionalmente alterado.

---

## 2. Como usar a matriz

Para cada código:

1. **Definição curta** — o que o código representa na taxonomia SERA.
2. **Evidência positiva** — marcadores textuais que sustentam o código.
3. **Evidência negativa** — marcadores textuais que excluem ou enfraquecem o código.
4. **Confusões comuns** — quais outros códigos são frequentemente confundidos com este.
5. **Exemplos de fronteira** — casos limítrofes com outro código.
6. **Fixtures relevantes** — quando conhecidas e verificadas.

---

## 3. Códigos de Percepção (Step 3)

### P-A — Nenhuma Falha de Percepção

**Definição:** O operador percebeu e interpretou corretamente as informações disponíveis. Nenhuma falha perceptiva contribuiu para o ato inseguro.

| | |
|---|---|
| **Evidência positiva** | Texto indica que o operador viu, ouviu ou recebeu a informação corretamente; não há relato de confusão, interpretação errada ou lacuna de conhecimento perceptivo |
| **Evidência negativa** | Qualquer menção a barreira sensorial, desconhecimento, erro de interpretação, distração, sobrecarga ou comunicação falha |
| **Confusões comuns** | P-G (atenção sem pressão) — diferença: P-A implica percepção correta; P-G implica falha de perceber algo presente e acessível |
| **Exemplos de fronteira** | Operador percebeu o sinal mas escolheu errado → P-A (falha está na ação/objetivo); operador não percebeu o sinal porque estava distraído → P-G |

**Fixtures relevantes:** TEST-ERC-4-001, TEST-ERC-5-001 (P-A como componente de cenários simples)

---

### P-B — Falha Sensorial

**Definição:** O operador falhou em detectar sinais visuais, auditivos, táteis ou olfativos necessários por limitação física, EPI inadequado ou condições ambientais.

| | |
|---|---|
| **Evidência positiva** | Uso de EPI que reduz percepção (protetores auriculares, máscara, luvas); ambiente ruidoso, com brilho intenso ou reflexo; barreira física à detecção; sinal obstruído ou bloqueado |
| **Evidência negativa** | Nenhuma menção a barreira sensorial física; operador estava em condições normais de percepção |
| **Confusões comuns** | P-F (percepção errônea) — diferença: P-B é falha em detectar o sinal; P-F é detectar mas interpretar errado |
| **Exemplos de fronteira** | Operador não ouviu alarme por estar com protetor auricular → P-B; operador ouviu o alarme mas interpretou como falso positivo → P-F |

---

### P-C — Falha de Conhecimento/Percepção

**Definição:** O operador não interpretou corretamente as informações disponíveis porque lhe faltava o conhecimento, a experiência ou o modelo mental correto para aquele contexto.

| | |
|---|---|
| **Evidência positiva** | "não havia recebido treinamento específico"; "desconhecia o protocolo"; "aplicou conhecimento de outro contexto"; "piloto novato"; "nunca havia operado esse modelo"; lacuna instrucional explícita |
| **Evidência negativa** | Operador tinha o conhecimento e o treinamento adequados; falha foi de atenção, não de conhecimento |
| **Confusões comuns** | P-G (atenção sem pressão), A-E (conhecimento na decisão) — diferença: P-C é quando a lacuna afeta a *interpretação* da informação percebida; A-E é quando afeta a *decisão* sobre o que fazer após perceber |
| **Exemplos de fronteira** | Médico aplica dose errada por não conhecer protocolo de altitude → P-C (não sabia interpretar o contexto); piloto experiente seleciona procedimento errado por distração → P-G |

**Fixtures relevantes:** TEST-COMBO-003, TEST-P-C-001

---

### P-D — Falha de Atenção com Pressão de Tempo

**Definição:** O operador falhou em perceber informações relevantes porque havia alta demanda de atenção e tempo insuficiente para processá-las — sobrecarga, múltiplos conflitos simultâneos, tráfego intenso.

| | |
|---|---|
| **Evidência positiva** | Alta demanda de atenção explícita; múltiplos conflitos simultâneos; tráfego intenso; canal operacional congestionado; sobrecarga documentada; fixação em elemento específico sob pressão |
| **Evidência negativa** | Situação calma sem sobrecarga; falha ocorreu sem pressão de tempo ou alta demanda |
| **Confusões comuns** | P-G (atenção sem pressão) — diferença crítica: P-D exige evidência de alta demanda/pressão; P-G é distração sem esse contexto |
| **Exemplos de fronteira** | Controlador de tráfego perde aeronave durante pico de tráfego → P-D; controlador perde aeronave em período calmo por distração → P-G |

**Fixtures relevantes:** TEST-P-D-001

---

### P-E — Falha no Gerenciamento de Tempo

**Definição:** O operador priorizou incorretamente sua atenção — não por alta demanda externa, mas por estratégias internas de gerenciamento de tempo deficientes.

| | |
|---|---|
| **Evidência positiva** | Priorização incorreta de tarefas; sequência de ações inadequada; decisão de postergar verificação crítica por julgamento próprio de tempo; não há alta demanda externa explícita |
| **Evidência negativa** | Alta demanda operacional externa como causa principal; sobrecarga por volume de tráfego/demandas |
| **Confusões comuns** | P-D (atenção com pressão) — diferença: P-E é falha de estratégia interna; P-D é sobrecarga imposta externamente |
| **Exemplos de fronteira** | Piloto decide verificar sistema secundário antes do primário por julgamento próprio e perde evento crítico → P-E; perde evento crítico porque havia três alertas simultâneos → P-D |

---

### P-F — Falha de Percepção (Interpretação Incorreta)

**Definição:** O operador detectou as informações sensoriais disponíveis mas as interpretou incorretamente — ilusão sensorial, ambiguidade do display, dados apresentados de forma confusa.

| | |
|---|---|
| **Evidência positiva** | Ilusão sensorial documentada; display ambíguo; dados apresentados de forma que induz confusão; informação percebida mas mal-interpretada; misreading de instrumento |
| **Evidência negativa** | Operador não detectou o sinal (→ P-B); operador não sabia o que o sinal significava (→ P-C) |
| **Confusões comuns** | P-B (sensorial) e P-C (conhecimento) — P-F é sobre interpretação incorreta de sinal detectado com atenção adequada |
| **Exemplos de fronteira** | Piloto lê altímetro como 1.000 ft quando marcava 10.000 ft por confusão de escala → P-F; não viu o altímetro por causa do brilho → P-B |

---

### P-G — Falha de Atenção sem Pressão de Tempo

**Definição:** O operador falhou em perceber informações relevantes que estavam presentes e acessíveis, sem barreira física e sem pressão de tempo — distração, foco estreito, complacência.

| | |
|---|---|
| **Evidência positiva** | Informação estava visível/disponível; sem sobrecarga de demanda; situação calma; distração documentada; foco excessivo em outra tarefa sem urgência |
| **Evidência negativa** | Alta demanda operacional externa (→ P-D); barreira sensorial física (→ P-B); desconhecimento do que buscar (→ P-C) |
| **Confusões comuns** | P-D (com pressão) e P-A (sem falha) — P-G é distração em situação acessível; P-A é quando não havia falha perceptiva |
| **Exemplos de fronteira** | Técnico não verifica item de checklist por distração durante inspeção de rotina em ambiente calmo → P-G; não verifica porque havia três alertas simultâneos → P-D |

---

### P-H — Falha de Comunicação

**Definição:** As informações relevantes não foram transmitidas, foram transmitidas incorretamente, ou a comunicação entre agentes falhou — tanto humano-humano quanto máquina-humano.

| | |
|---|---|
| **Evidência positiva** | Informação não foi passada entre tripulantes/equipe; readback incorreto ou ausente; comunicação mal compreendida; frequência errada; mensagem incompleta ou ambígua |
| **Evidência negativa** | A informação foi corretamente transmitida e compreendida; o problema não era de transmissão mas de interpretação pelo receptor |
| **Confusões comuns** | P-C (conhecimento) — diferença: P-H é falha no *processo de transmissão*; P-C é falha na *capacidade de interpretar* |
| **Exemplos de fronteira** | Copiloto não verbalizou alerta por crer que piloto já havia visto → P-H; copiloto não sabia que aquele alerta requeria verbalização → P-C |

---

## 4. Códigos de Objetivo (Step 4)

### O-A — Nenhuma Falha de Objetivo

**Definição:** O objetivo do operador estava alinhado com as práticas seguras e regulamentações. Nenhuma intenção desviante contribuiu para o ato inseguro.

| | |
|---|---|
| **Evidência positiva** | Operador seguia a tarefa nominal sem intenção de desviar; erro foi de percepção ou ação, não de objetivo; boa-fé documentada |
| **Evidência negativa** | Evidência de violação intencional, ganho pessoal, atalho cultural ou objetivo protetivo explícito |
| **Confusões comuns** | O-C (violação excepcional) e O-D (intenção sem violação) — O-A não tem intenção desviante de nenhum tipo |
| **Exemplos de fronteira** | Médico aplica dose errada por desconhecer protocolo de altitude → O-A (erro instrucional, sem desvio intencional); piloto decide cruzar limite por questão de tempo → O-D |

**Fixtures relevantes:** TEST-COMBO-003, TEST-ERC-4-001, TEST-ERC-5-001

---

### O-B — Violação Rotineira

**Definição:** Desvio habitual e normalizado das práticas estabelecidas, adotado como parte do comportamento recorrente do operador ou do grupo — atalho cultural, prática aceita tacitamente.

| | |
|---|---|
| **Evidência positiva** | "todos fazem assim"; "prática aceita"; "burocracia"; "nunca ninguém foi cobrado"; "rota habitual"; histórico de repetição; desvio culturalmente tolerado |
| **Evidência negativa** | Episódio isolado sem histórico; violação por circunstância excepcional; sem menção a cultura ou prática repetida |
| **Confusões comuns** | O-C (violação excepcional) e O-D (intenção sem violação) |
| **Exemplos de fronteira** | Equipe que sempre ignora passo de checklist por considerá-lo burocracia → O-B; operador que ignora checklist pela primeira vez para atender passageiro em emergência → O-C |

---

### O-C — Violação Excepcional/Circunstancial

**Definição:** Desvio *isolado*, *consciente* e *não rotineiro* de regra, procedimento ou expectativa operacional conhecida. A motivação pode ser conveniência, improviso, pressão situacional, atalho pontual, proteção humana ou qualquer outra razão circunstancial — proteção humana é um exemplo possível, não um requisito.

| | |
|---|---|
| **Evidência positiva** | Operador sabia que estava desviando de um protocolo ou expectativa operacional; o desvio foi pontual, atípico e não habitual; o operador normalmente cumpre as regras mas desta vez fez diferente |
| **Evidência negativa** | Operador não conhecia o protocolo do qual desviou (→ O-A/A-E); violação habitual, repetida ou normalizada pela equipe (→ O-B); ganho de eficiência, economia ou produtividade como objetivo dominante (→ O-D); erro por desconhecimento ou falta de treinamento (→ O-A); pressão de prazo ou ferramenta indisponível sem desvio consciente (→ O-A) |
| **Confusões comuns** | O-A (objetivo nominal sem desvio) e O-B (violação rotineira/normalizada) — O-C exige desvio consciente de regra/procedimento/expectativa conhecida, de forma pontual e não rotineira |
| **Exemplos de fronteira** | Operador que decide pular uma etapa de verificação uma única vez por achar que não haveria problema → O-C; piloto pousa sem autorização para atender passageiro em suspeita de infarto → O-C; médico administra dose errada por desconhecer protocolo de altitude → O-A (não sabia que estava desviando) |

> **Regra crítica:** O-C exige desvio **consciente** de regra, procedimento ou expectativa operacional conhecida, de forma **pontual e não rotineira**. Proteção humana é uma motivação válida de O-C, mas não é requisito. Circunstância excepcional sem desvio consciente (erro por desconhecimento, falta de treinamento, ferramenta indisponível, pressão de prazo sem decisão de desviar) **não é O-C**. Violação habitual e normalizada culturalmente é O-B. Eficiência/economia/produtividade como objetivo dominante é O-D.

**Fixtures relevantes:** TEST-O-C-001, TEST-O-C-002, TEST-GEN-OC-001, TEST-GEN-OC-002, TEST-GEN-OC-003

---

### O-D — Falha de Intenção (Não Violação)

**Definição:** O operador escolheu intencionalmente uma ação arriscada, mas sem violar normas — o objetivo estava tecnicamente dentro das regras, mas não era conservativo. Inclui decisões de eficiência, economia ou produtividade que aumentam o risco sem cruzar limites formais.

| | |
|---|---|
| **Evidência positiva** | Objetivo de reduzir tempo, combustível, custo ou aumentar produtividade; decisão consciente de não seguir a alternativa mais segura disponível; excesso de confiança na própria capacidade de gerenciar o risco |
| **Evidência negativa** | Violação de norma explícita (→ O-B ou O-C); objetivo puramente nominal sem intenção de eficiência (→ O-A) |
| **Confusões comuns** | O-B (violação rotineira) — diferença: O-D não viola norma formalmente; O-B viola norma de forma habitual |
| **Exemplos de fronteira** | Piloto decide voar por rota mais curta não prevista sem violar norma → O-D; piloto que sempre voa por essa rota não prevista porque "todos fazem" → O-B |

> **Regra O-D vs O-B:** O-D puro (sem histórico de normalização) permanece O-D. Para O-B, é necessário evidência de prática habitual, aceita culturalmente ou tolerada pela supervisão.

**Fixtures relevantes:** TEST-O-D-001, TEST-O-D-002

---

## 5. Códigos de Ação (Step 5)

### A-A — Nenhuma Falha de Ação

**Definição:** Não há falha no segmento de ação. A ação do operador foi coerente com sua percepção e seu objetivo — mesmo que estes estivessem errados. A causa do evento está em outra etapa (percepção ou objetivo).

| | |
|---|---|
| **Evidência positiva** | Operador agiu de forma consistente com o que percebia e pretendia; execução foi correta dado o estado mental do operador; não há omissão, deslize, seleção errada ou falha de feedback identificável |
| **Evidência negativa** | Qualquer evidência de passo omitido, execução errada, seleção inadequada ou ausência de verificação |
| **Confusões comuns** | A-B (deslize) — diferença: A-A implica que a ação foi executada corretamente conforme a intenção do operador |
| **Exemplos de fronteira** | Piloto executa procedimento incorreto porque seu objetivo era O-C → A-A; executa procedimento correto mas omite etapa → A-B |

---

### A-B — Deslizes, Omissões e Lapsos

**Definição:** Omissão de passo de procedimento conhecido, erro motor na execução, esquecimento de etapa — a ação falhou na execução física ou sequencial, não no conhecimento ou na intenção.

| | |
|---|---|
| **Evidência positiva** | Passo omitido; etapa pulada em checklist; erro de digitação/acionamento; lapso de memória em procedimento conhecido; execução incompleta de sequência |
| **Evidência negativa** | Operador não conhecia o passo (→ A-E); operador não verificou resultado (→ A-C); operador escolheu o procedimento errado conscientemente (→ A-F) |
| **Confusões comuns** | A-C (feedback de execução) — diferença: A-B é omissão de passo; A-C é omissão de verificar resultado da ação |
| **Exemplos de fronteira** | Técnico conclui inspeção sem preencher registro secundário por lapso → A-B; técnico conclui intervenção sem verificar se sistema respondeu → A-C |

**Fixtures relevantes:** TEST-A-B-001, TEST-ERC-4-001

---

### A-C — Falha no Feedback da Execução

**Definição:** O operador realizou a ação mas não verificou se o resultado foi o esperado antes de prosseguir — ausência de checagem do feedback de sua própria intervenção.

| | |
|---|---|
| **Evidência positiva** | Operador não conferiu resultado após intervenção; parâmetro não confirmado após ajuste; ação executada sem verificação do retorno do sistema; verificação de confirmação omitida após procedimento |
| **Evidência negativa** | Operador verificou o resultado e foi enganado pelo sistema (→ A-G); operador não executou a ação (→ A-B) |
| **Confusões comuns** | A-B (omissão de passo) e A-G (feedback geral) — A-C é sobre não verificar o *resultado de sua própria ação*; A-G é sobre não obter feedback do *sistema como um todo* |
| **Exemplos de fronteira** | Piloto ajusta potência e não confirma indicação no instrumento antes da decolagem → A-C; técnico executa manutenção mas não testa o sistema após → A-C |

---

### A-D — Inabilidade para a Resposta

**Definição:** Limitação física, motora, ergonômica, de equipamento ou de EPI impediu a execução da ação correta — o operador queria mas não conseguia fisicamente realizar.

| | |
|---|---|
| **Evidência positiva** | Limitação de força, alcance ou destreza explícita; EPI impedindo execução; equipamento inadequado ou mal posicionado; ergonomia deficiente; incapacidade física documentada |
| **Evidência negativa** | Operador poderia executar fisicamente mas escolheu não fazer (→ A-F) ou não sabia o que fazer (→ A-E) |
| **Confusões comuns** | A-E (conhecimento) — diferença: A-D é limitação física; A-E é limitação de conhecimento |
| **Exemplos de fronteira** | Operador não consegue acionar válvula por limitação de força em EPI → A-D; não sabe qual válvula acionar → A-E |

---

### A-E — Falha de Conhecimento/Decisão

**Definição:** A decisão sobre o que fazer foi errada por falta de conhecimento específico da tarefa, do contexto ou do protocolo correto — o operador sabia que precisava agir mas não sabia como agir corretamente.

| | |
|---|---|
| **Evidência positiva** | Operador aplicou protocolo errado por desconhecer o correto para o contexto; falta de treinamento específico para a situação; dose/procedimento incorreto por lacuna instrucional; "não havia recebido treinamento específico" |
| **Evidência negativa** | Operador conhecia o procedimento correto mas não executou (→ A-B); operador escolheu entre opções conhecidas e escolheu errado (→ A-F) |
| **Confusões comuns** | A-F (seleção errada) — diferença: A-E o operador não tinha o conhecimento; A-F o operador tinha o conhecimento mas escolheu errado |
| **Exemplos de fronteira** | Médico administra dose hospitalar em ambiente aeronáutico por não conhecer protocolo de altitude → A-E; médico conhece os dois protocolos e escolhe o errado → A-F |

**Fixtures relevantes:** TEST-COMBO-003, TEST-A-E-001

---

### A-F — Falha na Seleção da Ação

**Definição:** O operador selecionou o procedimento, checklist, modo, rota ou item errado entre opções que estavam disponíveis e conhecidas — escolha incorreta entre alternativas compreendidas.

| | |
|---|---|
| **Evidência positiva** | Operador selecionou opção errada entre opções disponíveis; procedimento incorreto escolhido tendo acesso ao correto; modo, frequência ou rota errada escolhida conscientemente |
| **Evidência negativa** | Operador não tinha acesso à opção correta (→ A-E); operador omitiu passo sem escolha consciente (→ A-B) |
| **Confusões comuns** | A-E (conhecimento) |
| **Exemplos de fronteira** | Piloto seleciona QRH errado entre dois disponíveis → A-F; seleciona procedimento que não conhecia existir → A-E |

---

### A-G — Falha de Feedback

**Definição:** O operador não obteve ou não buscou feedback do sistema/ambiente após sua ação — ausência de verificação do estado resultante, sem pressão de tempo.

| | |
|---|---|
| **Evidência positiva** | Operador não verificou indicação após acionamento; ausência de monitoramento do sistema após intervenção; feedback disponível mas não consultado |
| **Evidência negativa** | Feedback estava indisponível ou inacessível (problema do sistema); pressão de tempo impediu verificação (→ A-J) |
| **Confusões comuns** | A-C (feedback de execução) e A-J (feedback com pressão de tempo) |

---

### A-H — Falha no Gerenciamento do Tempo (Ação)

**Definição:** Alocação incorreta de tempo na execução — ação realizada muito cedo, muito tarde ou em sequência incorreta por decisão interna do operador, sem pressão de tempo explícita.

| | |
|---|---|
| **Evidência positiva** | Timing incorreto da execução; ação realizada fora de janela ideal por decisão própria; sequenciamento equivocado |
| **Evidência negativa** | Pressão de tempo externa explícita (→ A-I ou A-J) |
| **Confusões comuns** | A-I (seleção sob pressão) |

---

### A-I — Falha na Seleção da Ação por Pressão do Tempo

**Definição:** Seleção errada de ação motivada por pressão de tempo explícita — o operador escolheu incorretamente porque o tempo disponível era insuficiente.

| | |
|---|---|
| **Evidência positiva** | Pressão de tempo explícita documentada; seleção errada sob urgência real; instrução ou seleção operacional errada em contexto de tempo restrito |
| **Evidência negativa** | Seleção errada sem pressão de tempo (→ A-F); seleção correta mas atrasada (→ A-H) |
| **Confusões comuns** | A-F (sem pressão) e A-H (timing sem urgência) |

---

### A-J — Falha de Feedback por Pressão do Tempo

**Definição:** Ausência de verificação de feedback causada por pressão de tempo — o operador não verificou o resultado porque não havia tempo.

| | |
|---|---|
| **Evidência positiva** | Pressão de tempo impediu verificação do resultado; operador seguiu em frente sem confirmar por urgência real |
| **Evidência negativa** | Ausência de verificação sem pressão de tempo (→ A-G) |
| **Confusões comuns** | A-G (sem pressão) |

---

## 6. Níveis ERC (Error Resolution Capacity)

Os níveis ERC descrevem a severidade e a capacidade de recuperação do sistema no momento do ato inseguro. ERC 1 representa a condição mais severa (menor capacidade de recuperação); ERC 5 representa a menos severa.

### ERC 1 — Alta Severidade / Baixa Capacidade de Recuperação

**Definição:** O ato inseguro criou ou poderia criar consequência severa com poucas ou nenhuma barreira remanescente.

| | |
|---|---|
| **Evidência positiva** | Violação rotineira normalizada (O-B + A-A) *[a revisar: confirmar combinação exata no código]*; seleção ou feedback errado sob pressão de tempo crítica (A-I + P-D; A-J + P-D) |
| **Evidência negativa** | Barreiras remanescentes significativas presentes; detecção imediata possível |
| **Exemplos** | Controlador perde aeronave sob alta demanda → seleção de instrução errada; rotina normalizada de ignorar checklist crítico |

---

### ERC 2 — Severidade Significativa / Capacidade de Recuperação Limitada

**Definição:** Risco operacional concreto com barreiras presentes mas limitadas.

| | |
|---|---|
| **Evidência positiva** | Violação excepcional com falha de objetivo (O-C + A-A); falha de feedback na execução (A-C); seleção errada com percepção errônea (A-F + P-F); objetivo de eficiência sem violação (O-D) |
| **Evidência negativa** | Consequência já material sem barreiras (→ ERC 1); degradação menor com detecção fácil (→ ERC 3) |
| **Exemplos** | Médico administra dose errada por desconhecer protocolo (A-E + P-C) → ERC 2 *[a revisar: verificar regra exata]*; piloto seleciona checklist errado durante crise |

---

### ERC 3 — Severidade Média / Capacidade de Recuperação Presente

**Definição:** Quase-acidente, degradação técnica ou exposição operacional significativa, mas com capacidade de recuperação real.

| | |
|---|---|
| **Evidência positiva** | Falha de percepção com ação nominal (P-C + A-A; P-B + A-A; P-D + A-A; P-H + A-A); deslize ou lapso (A-B na maioria dos contextos); falha de feedback geral (A-G) |
| **Evidência negativa** | Impacto real já material (→ ERC 1 ou 2); impacto mínimo ou nulo (→ ERC 4 ou 5) |
| **Exemplos** | Técnico omite etapa de checklist sem consequência imediata mas com risco potencial; controlador perde aeronave por falha de comunicação com recuperação imediata |

---

### ERC 4 — Baixa Severidade / Boa Capacidade de Recuperação

**Definição:** Falha de baixo impacto operacional, sem degradação técnica imediata, com detecção posterior possível.

| | |
|---|---|
| **Evidência positiva** | Omissão de registro secundário não crítico; falha detectada em revisão posterior sem necessidade de retrabalho técnico |
| **Evidência negativa** | Impacto operacional real (→ ERC 3); sem impacto algum (→ ERC 5) |
| **Exemplos** | Técnico não preenche registro de controle interno após inspeção; omissão detectada no fim do turno sem consequência operacional |

**Fixtures relevantes:** TEST-ERC-4-001

---

### ERC 5 — Severidade Mínima / Capacidade de Recuperação Total

**Definição:** O ato inseguro não produziu impacto técnico, operacional ou de segurança. Nenhuma barreira foi testada.

| | |
|---|---|
| **Evidência positiva** | Campo ou ação redundante sem impacto; omissão que não afetou comunicação, rastreabilidade crítica ou segurança |
| **Evidência negativa** | Qualquer impacto técnico, operacional ou de segurança, mesmo que mínimo |
| **Exemplos** | Operador preenche campo redundante com atraso no mesmo turno, antes do fechamento, sem afetar nenhuma decisão |

**Fixtures relevantes:** TEST-ERC-5-001

---

## 7. Pré-condições

As pré-condições SERA identificam os fatores organizacionais, humanos e ambientais que contribuíram para o ato inseguro. Devem ser ancoradas em texto explícito — não inferidas genericamente.

### Família P — Operador (P1–P7)

| Código | Nome | Evidência positiva | Evidência insuficiente |
|---|---|---|---|
| P1 | Estado fisiológico | doença, fadiga física, medicamentos, condição médica explícita | "estava cansado" sem contexto médico/jornada |
| P2 | Estado psicológico | ansiedade, estresse, excesso de confiança documentado, atitude de risco | estado emocional genérico sem evidência textual |
| P3 | Fatores sociais | pressão de colegas, dinâmica de grupo, dificuldade interpessoal explícita | menção genérica a "ambiente de equipe" |
| P4 | Habilidade do operador | limitação de destreza ou coordenação motora para a tarefa específica | "operador inexperiente" sem especificação |
| P5 | Prontidão pessoal | nível de descanso, alimentação ou estado de alerta explicitamente comprometidos | ausência de menção a estado de prontidão |
| P6 | Seleção e treinamento | "não havia recebido treinamento"; "treinamento insuficiente"; "lacuna instrucional" | experiência geral sem foco na tarefa específica |
| P7 | Qualificação e autorização | habilitação ausente ou inadequada para a tarefa; não estava autorizado para o tipo | dúvida sobre qualificação sem evidência textual |

### Família T — Tempo e Tarefa (T1–T2)

| Código | Nome | Evidência positiva | Evidência insuficiente |
|---|---|---|---|
| T1 | Pressão de tempo sistêmica | demanda de tempo imposta pela organização; janela restrita definida externamente | "havia pressa" sem origem organizacional |
| T2 | Adequação dos objetivos | objetivos da tarefa incompatíveis com recursos ou capacidade disponíveis | objetivos apenas descritos, sem evidência de inadequação |

### Família W — Ambiente de Trabalho (W1–W3)

| Código | Nome | Evidência positiva | Evidência insuficiente |
|---|---|---|---|
| W1 | Ambiente tecnológico | design de equipamento, interface, display ou ferramenta que contribuiu para o erro | menção genérica a equipamento sem evidência de contribuição |
| W2 | Espaço de trabalho | ergonomia, layout ou organização física do posto de trabalho como fator | ambiente descrito sem evidência de impacto ergonômico |
| W3 | Ambiente operacional | condições externas explícitas: clima, visibilidade, ruído, temperatura, terreno | condições mencionadas sem vínculo com o ato inseguro |

### Família S — Supervisão (S1–S3)

| Código | Nome | Evidência positiva | Evidência insuficiente |
|---|---|---|---|
| S1 | Formulação de intenções | objetivos mal definidos pelos líderes; intenção inconsistente com procedimentos | ausência de supervisão sem evidência de falha na formulação |
| S2 | Comunicação de intenções | objetivos não comunicados claramente; mal-entendido entre líder e executor | comunicação descrita sem evidência de falha |
| S3 | Monitoramento e supervisão | supervisão ausente, ineficaz ou que falhou em identificar desvio | supervisor presente mas sem evidência de falha de monitoramento |

### Família O — Organização (O1–O6)

| Código | Nome | Evidência positiva | Evidência insuficiente |
|---|---|---|---|
| O1 | Missão organizacional | missão além da capacidade da organização de executar com segurança | missão apenas descrita |
| O2 | Provisão de recursos | recursos humanos, materiais ou financeiros insuficientes explicitamente | menção a falta de recursos sem vínculo causal |
| O3 | Regras e regulamentos | normas inconsistentes, conflitantes ou que não gerenciavam o risco adequadamente | normas mencionadas sem evidência de inadequação |
| O4 | Processos e práticas | ausência de procedimento operacional padrão para a situação; falha no processo formal | procedimentos genéricos sem evidência de lacuna específica |
| O5 | Clima organizacional | organização priorizava produção sobre segurança; inibição de reporte explícita | clima mencionado sem evidência textual específica |
| O6 | Vigilância sistêmica | desvios sistemáticos não detectados pela organização apesar de repetição | ausência de detecção sem evidência de caráter sistemático |

---

## 8. Fronteiras metodológicas críticas

### O-A vs O-C

O-A: objetivo nominal, sem intenção desviante. O operador não desviou conscientemente de regra ou procedimento.
O-C: desvio consciente de regra, procedimento ou expectativa operacional **conhecida**, de forma pontual e não rotineira. A motivação pode ser qualquer razão circunstancial — proteção humana é um exemplo possível, não um requisito.

**Regra:** Se o operador não sabia que estava desviando de um protocolo (lacuna de conhecimento), é O-A — não O-C. O-C exige desvio consciente + caráter excepcional/não rotineiro.

| Caso | Código |
|---|---|
| Médico aplica dose errada por não conhecer protocolo de altitude | O-A |
| Piloto pousa sem autorização para atender passageiro com suspeita de infarto | O-C |
| Operador segue procedimento que acredita ser o correto mas não é | O-A |
| Operador sabe que viola procedimento mas decide fazê-lo para salvar colega | O-C |
| Operador decide pular uma etapa de verificação uma única vez por achar desnecessária | O-C |
| Profissional descumpre protocolo isoladamente por pressão situacional, sem ser prática habitual | O-C |

---

### O-D vs O-B

O-D: objetivo de eficiência/economia sem violação formal, decisão pontual.
O-B: violação normalizada culturalmente, prática habitual tolerada.

**Regra:** O-D puro (sem histórico de normalização) permanece O-D. O-B exige evidência de repetição ou tolerância cultural.

| Caso | Código |
|---|---|
| Piloto decide rota mais curta (sem violar norma) para economizar combustível | O-D |
| Equipe que sempre usa essa rota mais curta porque "todos fazem" | O-B |

---

### A-B vs A-C

A-B: omissão de passo de procedimento.
A-C: falha em verificar resultado da própria ação.

| Caso | Código |
|---|---|
| Técnico não preenche registro após inspeção | A-B |
| Técnico executa ajuste e não verifica se o sistema respondeu | A-C |

---

### A-C vs A-A

A-C: falha de verificação de resultado da ação (ação foi realizada).
A-A: nenhuma falha de ação — ação foi executada corretamente conforme a intenção.

**Regra:** Se o operador agiu exatamente como pretendia e a falha estava na percepção ou objetivo, a ação é A-A. A-C só se aplica quando há ação + ausência de checagem do resultado.

---

### P-G vs P-A

P-G: o operador falhou em perceber algo presente e acessível (distração).
P-A: o operador percebeu e interpretou corretamente.

**Regra:** P-A implica percepção correta; P-G implica falha de atenção sem barreira física ou de conhecimento.

---

### P-D vs P-G

P-D: falha de atenção sob alta demanda e pressão de tempo.
P-G: falha de atenção sem pressão de tempo ou alta demanda.

**Regra:** P-D exige evidência explícita de sobrecarga, múltiplos conflitos ou pressão de tempo. Sem essa evidência, a distração é P-G.

---

### P-C vs A-E

P-C: a lacuna de conhecimento afetou a *interpretação* das informações percebidas (etapa perceptiva).
A-E: a lacuna de conhecimento afetou a *decisão* sobre o que fazer (etapa de ação).

**Regra:** Quando a falta de conhecimento impediu o operador de entender o que estava vendo/lendo, é P-C. Quando entendeu a situação mas não sabia qual ação tomar, é A-E. Frequentemente coexistem (P-C + A-E).

---

### ERC 2 vs ERC 3

ERC 2: risco operacional concreto, barreiras limitadas.
ERC 3: quase-acidente ou degradação técnica com capacidade de recuperação real.

*[a revisar: a fronteira exata entre ERC 2 e ERC 3 depende da combinação de códigos e do contexto — verificar regras determinísticas no código runtime]*

---

### ERC 4 vs ERC 5

ERC 4: baixo impacto, detecção posterior possível, sem degradação operacional imediata.
ERC 5: sem impacto técnico, operacional ou de segurança de nenhum tipo.

**Regra:** Se houve qualquer necessidade de correção ou retrabalho, é ERC 4. Se o evento não produziu consequência alguma, é ERC 5.

---

## 9. Relação com código e fixtures

Esta matriz é documentação metodológica. Em caso de divergência entre documentação e comportamento:

| Fonte | Prevalência |
|---|---|
| 1. Schema/migrations | Estrutura de dados — sempre prevalece |
| 2. Código runtime | Comportamento atual do pipeline |
| 3. Baseline/rules | Intenção metodológica registrada |
| 4. Fixtures | Validação de regressão |
| 5. Docs (este arquivo) | Orientação para revisão e evolução |

Quando esta matriz diverge do código, abrir issue metodológica — não alterar o código sem revisão.

---

## 10. Próximos passos

- [ ] Completar fixtures relevantes para cada código com links exatos verificados.
- [ ] Mapear explicitamente cada gate determinístico no código runtime para cada código.
- [ ] Transformar a seção de fronteiras metodológicas em checklist de revisão de fixture.
- [ ] Usar como base para textos de UX de explicabilidade (por que o sistema classificou X).
- [ ] Revisar itens marcados como "a revisar" com base no código runtime atual.
- [ ] Validar ERC 2 vs ERC 3 com fixtures específicas de cada combinação.
