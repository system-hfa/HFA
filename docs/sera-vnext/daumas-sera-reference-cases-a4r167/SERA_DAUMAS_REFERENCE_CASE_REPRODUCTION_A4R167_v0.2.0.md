# SERA Daumas Reference Case Reproduction — A4R167

Status:
- AUTHOR_APPROVED_FOR_REPRODUCTION
- SOURCE_REPRODUCTION
- NO_REANALYSIS
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo

Esta fase reproduz fielmente os 4 casos analisados na dissertacao Daumas (2018), que aplicou a tecnica MDC (Metodo da Decisao Critica) em conjunto com a ferramenta SERA para analise de incidentes na aviacao offshore. Nao ha reclassificacao livre. Todo o conteudo de P/O/A e pre-condicoes e extraido diretamente da dissertacao.

## 2. Fonte primaria

- Arquivo: "Dissertacao - Filipe Daumas - ANALISE DE FATORES HUMANOS EM INCIDENTES NA AVIACAO OFFSHORE.pdf"
- Caminho no repo: `metodologia/Dissertacao - Filipe Daumas - ANALISE DE FATORES HUMANOS EM INCIDENTES NA AVIACAO OFFSHORE.pdf`
- TXT extraido: `docs/reference/daumas-sera-offshore.txt` (5680 linhas, 273KB)
- Ano: 2018
- Universidade: UFF - Universidade Federal Fluminense
- Orientadora: DSc. Carmen Lucia Campos Guizze
- Secoes consultadas: Cap 4 (4.1 a 4.4), Figuras 7-10, Tabelas 5-18

## 3. Regra de uso

- A dissertacao e fonte primaria para estes 4 casos.
- Nao reinterpretar livremente.
- Nao inventar perguntas SERA — usar exatamente as perguntas da dissertacao.
- Campos nao explicitos na dissertacao devem ficar `SOURCE_NOT_EXTRACTED` ou `SOURCE_AMBIGUOUS`.
- Nao converter automaticamente em fixture/baseline/releasedCode.
- As pre-condicoes sao extraidas das tabelas da dissertacao; nao inferir novas.

## 4. Casos extraidos

### Caso Daumas 1

#### 1. Identificacao
- caseId: DAUMAS-CASE-1
- entrevista: Entrevista 1
- fonte: Secao 4.1, p.52-63; Figura 7 (p.56); Tabelas 5-7 (p.60-62)
- perfil do piloto entrevistado: 20 anos de experiencia, 8.000h helicoptero, 6.000h offshore, 8 anos como comandante, 4.000h como comandante
- contextualizacao: voo offshore com instrucao de linha a bordo; piloto entrevistado era instrutor; outro piloto (aluno) era comandante de outra aeronave em adaptacao para o S-76, com cargo superior na empresa, origem militar, pouca experiencia na maquina

#### 2. Resumo factual

Durante um voo de instrucao em condicoes meteorologicas ruins (chuva, visibilidade restrita), a aeronave voava a 500 pes em condicoes nao visuais entre plataformas. O piloto instrutor (entrevistado) determinou que arremeteriam apos 2 minutos sem ver nada. Ao comunicar a decisao de arremeter, o outro piloto questionou e, em seguida, tentou manobrar a aeronave manualmente sem desacoplar o Flight Director. Como o automatismo ainda estava acoplado, a aeronave tentava retornar a posicao original a cada vez que ele soltava os comandos. O piloto interpretou o comportamento como "pane seria". O instrutor explicou o erro e assumiu o comando. No retorno, acendeu a luz de transmissao e o outro piloto minimizou o alerta ("no 76 isso e normal porque esta chovendo"). O instrutor decidiu descer para o litoral e prosseguiu visual ate o destino.

#### 3. Linha do tempo

| Seq | Fato | Fonte |
|-----|------|-------|
| 00:00 | Descida para pouso encontra condicoes de visibilidade restrita | p.56 |
| 00:05 | Instrutor estipula mais 2 milhas antes de arremeter | p.56 |
| 00:06 | Instrutor informa decisao de arremeter; outro piloto questiona | p.56 |
| 00:07 | Outro piloto puxa ciclico e coletivo sem desacoplar FD | p.56 |
| 00:08 | Outro piloto acha que ha pane; instrutor explica erro e assume comando | p.56 |
| 00:25 | Luz de transmissao acende no retorno; outro piloto diz ser "normal com chuva" | p.56 |
| 00:26 | Instrutor decide descer para o litoral; outro piloto discorda; instrutor impoe decisao | p.56 |
| 00:50 | Retorno e pouso na base sem mais ocorrencias | p.56 |

#### 4. Ponto de fuga da operacao segura

"Momento em que o piloto tenta manobrar a aeronave com o automatismo ainda acoplado." (p.58, secao 4.1.2.1)

#### 5. Ato ou condicao insegura

"O piloto tenta manobrar a aeronave com o automatismo ainda acoplado em baixa altitude e com condicoes ruins de visibilidade." (p.58, secao 4.1.2.2)

Observacoes adicionais da dissertacao: O outro piloto (nao o entrevistado), responsavel pela pilotagem naquele momento, apos a ordem de retornar, tentou subir sem desligar o automatismo. Quando soltava os comandos, a aeronave tentava retornar a posicao original realizando manobra brusca.

#### 6. Perguntas SERA e respostas

**Objetivo:**
- Pergunta: O que o operador estava tentando alcancar? Qual era a intencao ou o objetivo que o levou a cometer o ato inseguro?
- Resposta da dissertacao: O piloto estava tentando manobrar a aeronave para subir e retornar para o continente.
- Classificacao: O-A (NENHUMA FALHA DE INTENCAO) — A opcao escolhida foi adequada e conservadora. Subir para retornar era o correto. Consistente com normas. Conservativo e com risco gerenciado.

**Percepcao:**
- Pergunta: O que o operador acreditou que estava acontecendo no ambiente com relacao ao objetivo que pretendia alcancar?
- Resposta da dissertacao: O piloto acreditou que a aeronave estivesse com defeito.
- Classificacao: P-C (FALHA DE CONHECIMENTO/PERCEPCAO) — Avaliacao nao correspondia a realidade. O piloto nao entendeu que a aeronave tentava voltar a posicao original porque ele nao havia desligado o automatismo. Nao possuia a capacidade necessaria para interpretar a situacao.

**Acao:**
- Pergunta: Como o operador estava tentando alcancar os objetivos?
- Resposta da dissertacao: O piloto tentou pilotar a aeronave manualmente sem cancelar o automatismo.
- Classificacao: A-E (FALHA DE CONHECIMENTO/DECISAO) — Acao implementada como pretendida, mas nao era correta nem adequada. O piloto nao possuia os conhecimentos basicos ou habilidades necessarias para tomar a acao correta. Nao sabia a resposta correta para a situacao.

#### 7. Classificacao final SERA

- P: P-C (Falha de Conhecimento/Percepcao)
- O: O-A (Nenhuma Falha de Intencao)
- A: A-E (Falha de Conhecimento/Decisao)
- Pre-condicoes:
  - Treinamento e Selecao — treinamento anterior nao foi eficaz; piloto apresentava duvidas basicas sobre sistemas
  - Monitoramento e Supervisao — empresa nao percebeu as limitacoes do piloto
  - Vigilancia — apesar da deficiencia tecnica e comportamental, organizacao nao detectou nem corrigiu a tempo
- Outras classificacoes: nenhuma

#### 8. Observacoes

- A dissertacao aplica a versao original do SERA (v0.1). Os codigos P-C, O-A, A-E seguem a taxonomia SERA classica, que e compativel com a taxonomia SERA vNext, mas pode ter pequenas diferencas de nomenclatura na descricao expandida.
- O caso envolve dois pilotos com papeis distintos (instrutor vs aluno em adaptacao), mas a dissertacao analisa a falha do piloto que executou a acao insegura (o aluno). O instrutor (entrevistado) nao e analisado como ator da falha.
- A identificacao de "ponto de fuga" na dissertacao e consistente com a abordagem A4R166, mas usa terminologia levemente diferente (nao usa "escapePointId").
- Nao ha actor split formal na dissertacao; o caso e tratado como single-actor.
- Lacunas: A dissertacao nao detalha o modelo exato do Flight Director nem a versao do sistema de automatismo.
- Diferenca potencial com A4R166: A4R166 usa "escape point" + "unsafe act/condition" + POA separados por ator. A dissertacao usa "ponto de fuga" + "ato ou condicao insegura" + analise POA unica. O mapeamento e direto, mas a estrutura difere.

#### 9. Status

- AUTHOR_APPROVED_FOR_REPRODUCTION
- NO_RELEASED_CODE
- NO_DOWNSTREAM

---

### Caso Daumas 2

#### 1. Identificacao
- caseId: DAUMAS-CASE-2
- entrevista: Entrevista 2
- fonte: Secao 4.2, p.64-72; Figura 8 (p.66); Tabelas 8-10 (p.69-72)
- perfil do piloto entrevistado: 21 anos de experiencia, 8.000h helicoptero, 7.000h offshore, 9 anos como comandante, 4.500h como comandante
- contextualizacao: voo de treinamento a comando; outro piloto era comandante do Bell 412 em adaptacao para o S-76; o outro piloto sentou na posicao de comandante (direita)

#### 2. Resumo factual

Durante aproximacao para pouso em plataforma offshore, a aeronave estava em condicoes meteorologicas ruins (IMC a 500 pes, teto baixo). O piloto entrevistado (instrutor) consultou o outro piloto e decidiram tentar o pouso. A 3-4 milhas da plataforma, o instrutor avistou a plataforma e abandonou a pilotagem para manter o visual. O outro piloto, acostumado com aeronave sem automacao (Bell 412), desacoplou o Flight Director e tentou reduzir a velocidade manualmente "barra na barra" como faria no outro equipamento. A aeronave entrou em condicao critica: velocidade zerou, razao de descida >1000 ft/min, parametros de motor no vermelho. O outro piloto estava olhando para fora. O instrutor assumiu o comando, reduziu o coletivo, inclinou o nariz para baixo e recuperou a aeronave. Retornaram ao aeroporto.

#### 3. Linha do tempo

| Seq | Fato | Fonte |
|-----|------|-------|
| 0s | Piloto abandona o automatismo desacoplando o FD | p.66 |
| 30s | Aeronave zera velocidade e apresenta RD > 1000 ft/min | p.66 |
| 32s | Torque proximo de 100% (limite) | p.66 |
| 35s | Outro piloto (instrutor) assume o comando | p.66 |
| 38s | Instrutor reduz coletivo e inclina nariz para baixo com ciclico | p.66 |
| 45s | Aeronave recupera razao de subida, baixa o torque, aumenta velocidade, RD positivo | p.66 |
| 55s | Piloto acopla o automatismo | p.66 |
| 1min | Recuperacao da atitude anormal | p.66 |
| 1:10min | Abandono da missao e retorno para o continente | p.66 |

#### 4. Ponto de fuga da operacao segura

"Momento em que o piloto cancela o automatismo da aeronave e tenta pilotar manualmente." (p.67, secao 4.2.2.1)

#### 5. Ato ou condicao insegura

"O piloto cancela o automatismo da aeronave e tenta reduzir a velocidade manualmente causando uma reducao de velocidade alem do limite seguro." (p.67, secao 4.2.2.2)

Observacoes adicionais da dissertacao: O outro piloto, apos a ordem para reduzir a velocidade, cancela o automatismo e reduz a velocidade manualmente sem monitorar os parametros adequadamente, fazendo com que a velocidade reduza mais do que deveria ate entrar em situacao perigosa.

#### 6. Perguntas SERA e respostas

**Objetivo:**
- Pergunta: O que o operador estava tentando alcancar? Qual era a intencao ou o objetivo que o levou a cometer o ato inseguro?
- Resposta da dissertacao: Reduzir a velocidade da aeronave para realizar o sobrevoo e pouso na plataforma.
- Classificacao: O-A (NENHUMA FALHA DE INTENCAO) — Objetivo coerente e conservador. Reduzir velocidade para circuito de trafego e pouso era o procedimento adequado.

**Percepcao:**
- Pergunta: O que o operador acreditou que estava acontecendo no ambiente com relacao ao objetivo que pretendia alcancar?
- Resposta da dissertacao: Acreditou que a aeronave estivesse reduzindo a velocidade de forma segura.
- Classificacao: P-D (FALHA DE ATENCAO) — Avaliacao nao correspondia a realidade. Nenhum tripulante percebeu a reducao critica de velocidade. Ambos eram qualificados (P-Capacity = SIM). Havia pressao de tempo excessiva (menos de 5 milhas da plataforma). A preocupacao com a proximidade da plataforma capturou a atencao.

**Acao:**
- Pergunta: Como o operador estava tentando alcancar os objetivos?
- Resposta da dissertacao: Cancelando o automatismo e reduzindo a velocidade manualmente.
- Classificacao: A-H (FALHA NO GERENCIAMENTO DO TEMPO) — Acao implementada como pretendida, mas nao era correta. O piloto era qualificado (A-Capacity = SIM), mas houve pressao de tempo excessiva. Priorizacao de atencao incorreta: preocupou-se mais em ver a plataforma do que em pilotar. A responsabilidade de localizar a plataforma era do outro piloto.

#### 7. Classificacao final SERA

- P: P-D (Falha de Atencao)
- O: O-A (Nenhuma Falha de Intencao)
- A: A-H (Falha no Gerenciamento do Tempo)
- Pre-condicoes:
  - Treinamento e Selecao — treinamento tecnico e comportamental (CRM) insuficiente para preparar o piloto para situacoes de risco
  - Pressao do Tempo — ao se aproximarem da plataforma sem condicoes visuais, criaram situacao de vulnerabilidade
  - Fatores Ambientais — condicoes meteorologicas de visibilidade e teto inadequadas
  - Monitoramento e Supervisao — piloto entrevistado (comandante) falhou em monitorar as acoes do outro piloto
- Outras classificacoes: nenhuma

#### 8. Observacoes

- A dissertacao identifica que o treinamento CRM nao foi suficiente para prever condicoes criticas onde a divisao de tarefas precisa ser bem definida.
- O piloto agiu por habito (transferencia negativa de aprendizado do Bell 412 para o S-76).
- A decisao inicial de continuar o voo mesmo em condicoes abaixo dos minimos (500 pes, IMC) foi uma barreira de seguranca ultrapassada antes do ponto de fuga.
- Diferenca com A4R166: A4R166 exigiria actor split formal, mas a dissertacao trata como falha do piloto que executou a acao. A decisao previa de continuar em condicoes abaixo dos minimos poderia ser um "pre-escape-point condition" no modelo A4R166.
- Lacunas: A dissertacao nao especifica se a altitude de 500 pes estava legalmente permitida ou era uma violacao regulatoria previa.
- **DECISAO AUTORAL A4R167**: Caso Daumas 2 permanece em escopo 2A apenas. Escopo 2B (analise alternativa da barreira de 500 pes como possivel escopo proprio de ponto de fuga) NAO e aberto nesta fase. A barreira dos 500 pes permanece como contexto/MDC — registrada como informacao relevante da dissertacao, mas sem abertura de novo escape point. Uma eventual reanalise SERA vNext devera ocorrer em fase separada, com escopo proprio de ponto de fuga e, se necessario, contribuicoes de ator documentadas dentro desse escopo, fora do A4R167.

#### 9. Status

- AUTHOR_APPROVED_FOR_REPRODUCTION
- NO_RELEASED_CODE
- NO_DOWNSTREAM

---

### Caso Daumas 3

#### 1. Identificacao
- caseId: DAUMAS-CASE-3
- entrevista: Entrevista 3
- fonte: Secao 4.3, p.74-85; Figura 9 (p.77); Tabelas 11-14 (p.80-84)
- perfil do piloto entrevistado: 24 anos de experiencia, 12.500h helicoptero, 12.000h offshore, 16 anos como comandante, 10.000h como comandante
- contextualizacao: voo offshore regular; pouso em plataforma; troca de passageiros no helideck; piloto entrevistado estava pilotando; copiloto fazia fonia/burocracia

#### 2. Resumo factual

Apos pouso normal em plataforma (realizado pelo copiloto pois o vento favorecia o lado dele), o piloto entrevistado reassumiu os comandos. O comissario abriu a porta, desceu, pegou documentacao de troca de passageiros e estendeu o braco com a papelada para dentro do cockpit. O copiloto estava ocupado com calculos e anotacoes. O piloto entrevistado, para "ajudar a agilizar", retirou a mao esquerda do coletivo (sem apoia-lo na perna) e pegou os papeis. O coletivo subiu sozinho (defeito em uma peca). A aeronave movimentou-se para frente no helideck. Os calcos explodiram. O piloto percebeu o movimento, pensou primeiro em "parking brake", depois entendeu que o coletivo havia subido. Recolocou o coletivo para baixo com cuidado (lembrando de um acidente anterior onde pouso brusco danificou a estrutura). A aeronave parou cerca de 1,5m a frente. Ninguem se feriu. Passageiros nem perceberam.

#### 3. Linha do tempo

| Seq | Fato | Fonte |
|-----|------|-------|
| 00:00 | Piloto mantinha mao no coletivo conforme procedimento padrao | p.77 |
| 00:01 | Piloto tira a mao do coletivo para pegar papel do comissario | p.77 |
| 00:02 | Coletivo comeca a subir sozinho | p.77 |
| 00:04 | Aeronave comeca a andar para frente; calcos explodem | p.77 |
| 00:05 | Piloto percebe movimento; pensa ser parking brake; aperta pedais de freio ate o batente | p.77 |
| 00:05 | Piloto percebe que nao e freio, localiza coletivo subindo e o empurra para baixo | p.77 |
| 00:07 | Aeronave para ~1,5m a frente da posicao original | p.77 |

#### 4. Ponto de fuga da operacao segura

"Momento em que o piloto retira a mao do coletivo para ajudar com a documentacao." (p.78, secao 4.3.2.1)

#### 5. Ato ou condicao insegura

"O piloto retira a mao do coletivo e a aeronave se movimenta no helideck." (p.78, secao 4.3.2.2)

Observacoes adicionais da dissertacao: O piloto afirma que foi um procedimento errado causado por um lapso de atencao. Ele nunca havia retirado as maos dos comandos anteriormente. A aeronave apresentava defeito em uma peca do coletivo (lote de fabrica com problema), que causou o movimento involuntario para cima.

#### 6. Perguntas SERA e respostas

**Objetivo:**
- Pergunta: O que o operador estava tentando alcancar? Qual era a intencao ou o objetivo que o levou a cometer o ato inseguro?
- Resposta da dissertacao: O piloto estava tentando ajudar no processo de troca dos passageiros pegando os documentos das maos do comissario.
- Classificacao: O-C (FALHA DE INTENCAO / VIOLACAO EXCEPCIONAL) — Nao era consistente com normas (procedimentos dizem que o piloto responsavel pela pilotagem nao deve se envolver com outros assuntos). Nao foi violacao de rotina (primeira vez que o piloto fez isso). Violacao excepcional, isolada, nao representa padrao de comportamento. Supoe-se que nao foi deliberada e que o piloto acreditava que a aeronave estava segura.

**Percepcao:**
- Pergunta: O que o operador acreditou que estava acontecendo no ambiente com relacao ao objetivo que pretendia alcancar?
- Resposta da dissertacao: O piloto acreditou que a aeronave estivesse sob controle pousada no helideck.
- Classificacao: P-H (FALHA DE COMUNICACAO) — Avaliacao nao correspondia a realidade. O piloto nao sabia do defeito na peca do coletivo. Havia capacidade de perceber (P-Capacity = SIM). Havia pressao de tempo (preocupacao em "agilizar a troca"). Informacao sobre a falha nao estava disponivel nem era correta (a aeronave parecia OK, mas nao estava).

**Acao:**
- Pergunta: Como o operador estava tentando alcancar os objetivos?
- Resposta da dissertacao: O piloto retirou a mao do coletivo para pegar os documentos das maos do comissario.
- Classificacao: A-G (FALHA DE FEEDBACK) — Acao implementada como pretendida (pegou os documentos). Nao era correta nem adequada (a responsabilidade era do outro piloto). Havia capacidade para acao correta (A-Capacity = SIM). Sem pressao real de tempo. A atencao foi desviada do objetivo principal (pilotagem) para um objetivo secundario (colaboracao burocratica). Houve falha de monitoramento e verificacao cruzada.

#### 7. Classificacao final SERA

- P: P-H (Falha de Comunicacao — comunicacao homem-maquina degradada por falta de indicacao do defeito)
- O: O-C (Falha de Intencao / Violacao Excepcional)
- A: A-G (Falha de Feedback)
- Pre-condicoes:
  - Aspectos Psicologicos — motivacao excessiva para "ajudar a agilizar" + fadiga mental por ritmo intenso de voos
  - Aspectos Fisiologicos — cansaco fisico (final da quinzena de trabalho)
  - Equipamento — defeito na peca do coletivo, sem indicacao para a tripulacao
  - Vigilancia — outras aeronaves da mesma empresa ja tiveram o mesmo problema, mas a organizacao nao identificou nem divulgou
- Outras classificacoes: nenhuma

#### 8. Observacoes

- Este caso e notavel por envolver uma combinacao de falha humana (violacao excepcional por fadiga/motivacao) e falha tecnica latente (defeito de fabrica na peca do coletivo).
- A dissertacao relata que eventos semelhantes ocorreram em outras bases da empresa no mundo (Australia, Mar do Norte, Asia) e nao foram reportados — falha organizacional de Vigilancia.
- A fadiga e identificada como fator central: "o maior problema nao foi a pane tecnica e sim o estado mental de cansaco".
- O piloto relata que estava no "final da quinzena de trabalho apos um acumulo de muitos dias voados" — primeiro voo do dia, mas acumulo de fadiga.
- Diferenca com A4R166: A dissertacao usa P-H (Falha de Comunicacao) para uma falha homem-maquina. No A4R166, P-H nao esta no canonical question tree — seria necessario verificar se o mapeamento P-H → taxonomy A4R166 e valido.
- Lacunas: A dissertacao nao identifica o numero exato do lote da peca defeituosa nem a data de fabricacao.

#### 9. Status

- AUTHOR_APPROVED_FOR_REPRODUCTION
- NO_RELEASED_CODE
- NO_DOWNSTREAM

---

### Caso Daumas 4

#### 1. Identificacao
- caseId: DAUMAS-CASE-4
- entrevista: Entrevista 4
- fonte: Secao 4.4, p.86-96; Figura 10 (p.87); Tabelas 15-18 (p.90-96)
- perfil do piloto entrevistado: 18 anos de experiencia, 7.000h helicoptero, 6.000h offshore, 12 anos como comandante, 4.500h como comandante
- contextualizacao: pouso em plataforma onde ja havia ocorrido um acidente anterior com outra aeronave do mesmo tipo que colidiu a cauda com a estrutura

#### 2. Resumo factual

Aeronave se aproxima de plataforma offshore para pouso. Um piloto de outra aeronave havia perguntado pelo radio se o entrevistado tinha percebido que, nos ultimos dias, os pousos estavam mais favoraveis para quem estava voando na esquerda (lado do copiloto). O entrevistado respondeu que nao achava que era o caso. Ao sobrevoar a plataforma para reconhecimento, o entrevistado julgou que o lado melhor para pousar era o seu lado (direita). Realizou o pouso com margem de erro reduzida, passando perto dos obstaculos. Durante a aproximacao, teve a conviccao de que "trabalharia mais para fazer o pouso". Apenas apos pousado, ao olhar as estruturas da plataforma, percebeu que o lado oposto (do outro piloto) teria menos obstaculos, passaria mais longe dos obstaculos e ofereceria margem de erro maior.

#### 3. Linha do tempo

| Seq | Fato | Fonte |
|-----|------|-------|
| 00:00 | Piloto de outra aeronave pergunta pelo radio se entrevistado percebeu que pousos estavam favorecendo o lado esquerdo; entrevistado responde que nao | p.87 |
| 00:25 | Aeronave sobrevoa a plataforma para reconhecimento do lado de pouso | p.87 |
| 00:26 | Piloto decide pousar pelo seu lado | p.87 |
| 00:27 | Durante aproximacao, piloto tem conviccao de que trabalharia mais para fazer o pouso | p.87 |
| 00:30 | Aeronave pousa no helideck | p.87 |
| 00:34 | Apos pouso, piloto percebe que o outro lado teria sido mais facil e menos arriscado | p.87 |

#### 4. Ponto de fuga da operacao segura

"Momento em que o piloto entrevistado toma a decisao de fazer o pouso pelo seu lado." (p.89, secao 4.4.2.1)

#### 5. Ato ou condicao insegura

"Pouso realizado pelo lado que oferecia um risco maior do que o necessario." (p.89, secao 4.4.2.2)

Observacoes adicionais da dissertacao: O piloto decidiu pousar pelo seu lado fazendo com que a aeronave passasse mais perto do que o necessario dos obstaculos da plataforma.

#### 6. Perguntas SERA e respostas

**Objetivo:**
- Pergunta: O que o operador estava tentando alcancar? Qual era a intencao ou o objetivo que o levou a cometer o ato inseguro?
- Resposta da dissertacao: Pousar na plataforma.
- Classificacao: O-D (FALHA DE INTENCAO / NAO VIOLACAO) — Pousar era o objetivo do voo (consistente com normas). Mas os procedimentos definem que o pouso deve ser feito pelo lado mais favoravel conforme vento e obstaculos. A percepcao estava correta e foi escolhida intencionalmente a opcao arriscada. Nao gerenciou adequadamente o risco.

**Percepcao:**
- Pergunta: O que o operador acreditou que estava acontecendo no ambiente com relacao ao objetivo que pretendia alcancar?
- Resposta da dissertacao: Acreditou que seria melhor realizar o pouso pelo seu lado.
- Classificacao: P-G (FALHA DE ATENCAO) — Avaliacao nao era correta (condicoes de vento e obstaculos favoreciam o outro piloto). Possuia capacidade de perceber (P-Capacity = SIM). Sem pressao de tempo excessiva. Informacao nao era ilusoria nem ambigua. Todas as informacoes estavam disponiveis e corretas — mas o piloto nao as assimilou adequadamente.

**Acao:**
- Pergunta: Como o operador estava tentando alcancar os objetivos?
- Resposta da dissertacao: Realizando, ele proprio, o pouso na plataforma.
- Classificacao: A-F (FALHA NA SELECAO DA ACAO) — Acao implementada como pretendida (pousou sem problemas). Nao era correta nem adequada (todas as condicoes indicavam que o outro piloto deveria pousar). Possuia capacidade, conhecimento e habilidades para a acao correta (A-Capacity = SIM). Sem pressao de tempo. Falha no processo de decisao: uma acao inadequada foi implementada apesar de existir acao adequada disponivel.

#### 7. Classificacao final SERA

- P: P-G (Falha de Atencao — informacao disponivel, mas nao assimilada)
- O: O-D (Falha de Intencao / Nao Violacao — opcao arriscada escolhida intencionalmente)
- A: A-F (Falha na Selecao da Acao)
- Pre-condicoes:
  - Aspectos Psicologicos — Vies de Confirmacao (respondeu ao outro piloto que nao havia predominancia de lado, depois agiu para confirmar essa resposta); lembranca do acidente anterior na mesma plataforma afetou o julgamento; excesso de zelo tambem levou ao risco
- Outras classificacoes: nenhuma

#### 8. Observacoes

- A dissertacao identifica um padrao psicologico duplo: (a) Vies de Confirmacao — o piloto buscou validar sua afirmacao anterior de que nao havia predominancia de lado e (b) influencia emocional do acidente anterior na mesma plataforma.
- O caso ilustra que "o exagero na prevencao tambem pode levar ao risco" — o piloto assumiu o pouso por considerar a situacao perigosa e a si mesmo mais experiente, mas acabou aumentando o risco.
- O entrevistado afirma que, se nao tivesse conversado com o outro piloto sobre o lado do pouso e se nao houvesse o acidente anterior, teria agido diferente.
- Diferenca com A4R166: A dissertacao usa P-G e A-F que existem na taxonomia SERA classica. E preciso verificar se esses codigos tem correspondencia exata no canonical question tree A4R166.
- Lacunas: A dissertacao nao quantifica a diferenca de risco entre os dois lados (distancia exata dos obstaculos, angulo do vento).

#### 9. Status

- AUTHOR_APPROVED_FOR_REPRODUCTION
- NO_RELEASED_CODE
- NO_DOWNSTREAM

---

## 5. Tabela resumo dos 4 casos

| Caso | P | O | A | Pre-condicoes principais |
|------|---|---|---|--------------------------|
| DAUMAS-CASE-1 | P-C (Conhecimento/Percepcao) | O-A (Nenhuma Falha) | A-E (Conhecimento/Decisao) | Treinamento, Supervisao, Vigilancia |
| DAUMAS-CASE-2 | P-D (Atencao) | O-A (Nenhuma Falha) | A-H (Gerenc. Tempo) | Treinamento, Pressao Tempo, Fatores Ambientais, Supervisao |
| DAUMAS-CASE-3 | P-H (Comunicacao) | O-C (Violacao Excepcional) | A-G (Feedback) | Psicologico, Fisiologico, Equipamento, Vigilancia |
| DAUMAS-CASE-4 | P-G (Atencao) | O-D (Intencao/Nao Violacao) | A-F (Selecao da Acao) | Psicologico (Vies Confirmacao, Estresse) |

## 6. Locks

- NO_RELEASED_CODE
- NO_DOWNSTREAM
- NO_FINAL_CONCLUSION
- NO_HFACS
- NO_RISK_ERC
- NO_ARMS_ERC
- NO_RECOMMENDATIONS
