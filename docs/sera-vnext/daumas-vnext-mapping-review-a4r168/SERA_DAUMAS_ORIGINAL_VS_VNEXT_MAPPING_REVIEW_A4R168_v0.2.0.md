# SERA Daumas Original vs SERA vNext Mapping Review — A4R168

Status:
- DRAFT_ONLY
- MAPPING_REVIEW
- NO_REANALYSIS
- NO_RELEASED_CODE
- NO_DOWNSTREAM

## 1. Objetivo

Esta fase compara os 11 codigos SERA originais reproduzidos da dissertacao Daumas em A4R167 com a arvore/taxonomia canonica SERA vNext (A4R99). Nao ha reclassificacao de casos. O objetivo e avaliar compatibilidade, risco de divergencia e necessidade de revisao futura.

## 2. Fontes

| Documento | Funcao |
|-----------|--------|
| `SERA_DAUMAS_REFERENCE_CASE_REPRODUCTION_A4R167_v0.2.0.md` | Reproducao completa dos 4 casos Daumas |
| `SERA_DAUMAS_REFERENCE_CASE_MATRIX_A4R167_v0.2.0.csv` | Matriz P/O/A dos 4 casos |
| `SERA_DAUMAS_EXTRACTION_LOG_A4R167_v0.2.0.md` | Log de extracao com duvidas metodologicas |
| `SERA_DAUMAS_CASE_SOURCE_TEXT_EXTRACT_A4R167_v0.2.0.md` | Extrato fonte ipsis litteris dos 4 casos |
| `SERA_ENGINE_VNEXT_CANONICAL_METHOD_QUESTION_LOCK_v0.2.0.md` | Lock canonico: regras de integridade |
| `SERA_ENGINE_VNEXT_CANONICAL_QUESTION_TREE_ASSET_A4R99_v0.2.0.md` | Arvore canonica completa P/O/A com leaf codes |
| `SERA_ENGINE_VNEXT_SINGLE_ESCAPE_POINT_MULTI_ACTOR_RULE_A4R166_v0.2.0.md` | Regra de ponto de fuga unico + contribuicoes multi-ator |
| `SERA_ENGINE_VNEXT_DOCUMENT_AUTHORITY_INDEX_v0.2.0.md` | Indice de autoridade documental |

## 3. Regra de revisao

- A4R167 permanece como SOURCE_REPRODUCTION.
- Esta fase nao altera codigos dos casos Daumas.
- Codigos Daumas sao avaliados apenas quanto a compatibilidade com a arvore vNext.
- Divergencia nao significa erro da dissertacao — a dissertacao usou SERA v0.1, anterior a formalizacao vNext.
- Qualquer reanalise futura exige fase propria.

## 4. Matriz de codigos avaliados

Os 11 codigos usados nos 4 casos Daumas foram verificados contra a arvore canonica A4R99.

### P-C — FALHA DE CONHECIMENTO/PERCEPCAO

- **Uso na dissertacao (DAUMAS-CASE-1)**: Piloto nao entendeu que a aeronave voltava a posicao original porque nao havia desligado o automatismo. Nao possuia a capacidade necessaria para interpretar a situacao (P_CAPABILITY = NAO_CONHECIMENTO).
- **Caminho canonico vNext**: P_ROOT → P_ASSESSMENT(NAO) → P_CAPABILITY(NAO_CONHECIMENTO) → P-C
- **Caminho na dissertacao**: Questao 1 (avaliacao correta?) NAO → Questao 2 (capacidade?) NAO → P-C
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo. O caminho de perguntas da dissertacao e estruturalmente identico ao canonico.
- **Recomendacao**: P-C mantido. Nao requer revisao.

### P-D — FALHA DE ATENCAO (pressao temporal)

- **Uso na dissertacao (DAUMAS-CASE-2)**: Nenhum tripulante percebeu a reducao critica de velocidade. Ambos qualificados (P_CAPABILITY = SIM). Pressao de tempo excessiva — menos de 5 milhas da plataforma.
- **Caminho canonico vNext**: P_ROOT → P_ASSESSMENT(NAO) → P_CAPABILITY(SIM) → P_TIME_PRESSURE(SIM_ATENCAO) → P-D
- **Caminho na dissertacao**: Questao 1 (avaliacao correta?) NAO → Questao 2 (capacidade?) SIM → Questao 3 (pressao tempo?) SIM → P-D
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo.
- **Recomendacao**: P-D mantido. Nao requer revisao.

### P-H — FALHA DE COMUNICACAO

- **Uso na dissertacao (DAUMAS-CASE-3)**: Defeito na peca do coletivo sem indicacao para a tripulacao. Informacao sobre a falha nao estava disponivel nem era correta (P_INFORMATION_AVAILABLE = NAO).
- **Caminho canonico vNext**: P_ROOT → P_ASSESSMENT(NAO) → P_CAPABILITY(SIM) → P_TIME_PRESSURE(NAO) → P_INFORMATION_AMBIGUOUS(NAO) → P_INFORMATION_AVAILABLE(NAO) → P-H
- **Caminho na dissertacao**: Questao 1 (avaliacao) NAO → Questao 2 (capacidade) SIM → Questao 3 (pressao tempo?) SIM (preocupacao em "agilizar a troca") → Questao 4 (info ilusoria?) NAO → Questao 5 (info disponivel?) NAO → P-H
- **Compatibilidade**: COMPATIBLE_WITH_CAUTION
- **Risco de divergencia**: **MEDIO**. O leaf code P-H existe como codigo canonico ativo vNext (FALHA DE COMUNICACAO, 3.3.3 Communication failure). O caminho logico converge para o mesmo destino. Porem, ha divergencia no no P_TIME_PRESSURE: a dissertacao responde SIM (preocupacao em agilizar), mas prossegue para questoes de informacao em vez de fechar em P-D ou P-E. No modelo canonico, P_TIME_PRESSURE(SIM) deveria ramificar para P-D ou P-E, nao para P_INFORMATION_AMBIGUOUS.
- **Nota importante**: O extraction log A4R167 (secao 6) afirma incorretamente que "P-H nao aparece como opcao canonica" no A4R166. **P-H ESTA PRESENTE na arvore canonica A4R99** como leaf code ativo (FALHA DE COMUNICACAO / 3.3.3 Communication failure). A afirmacao do extraction log esta superada por esta revisao.
- **Recomendacao**: P-H e COMPATIBLE como codigo, mas o caminho de perguntas do Caso 3 merece atencao. Se uma reanalise vNext for feita, o caminho canonico deve ser seguido estritamente — o que pode resultar em P-D (se a pressao de tempo for considerada o fator dominante) ou P-H (se a ausencia de informacao for dominante). Para A4R168, mantem-se SOURCE_REPRODUCTION com P-H.

### P-G — FALHA DE ATENCAO (informacao disponivel nao assimilada)

- **Uso na dissertacao (DAUMAS-CASE-4)**: Todas as informacoes indicavam que o outro lado era melhor para pousar, mas o piloto nao as assimilou adequadamente. Informacao disponivel e correta (P_INFORMATION_AVAILABLE = SIM).
- **Caminho canonico vNext**: P_ROOT → P_ASSESSMENT(NAO) → P_CAPABILITY(SIM) → P_TIME_PRESSURE(NAO) → P_INFORMATION_AMBIGUOUS(NAO) → P_INFORMATION_AVAILABLE(SIM) → P-G
- **Caminho na dissertacao**: Questao 1 (avaliacao) NAO → Questao 2 (capacidade) SIM → Questao 3 (pressao tempo) NAO → Questao 4 (info ilusoria) NAO → Questao 5 (info disponivel) SIM → P-G
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo. Caminho identico ao canonico.
- **Recomendacao**: P-G mantido. Caso 4 e forte candidato a reference case vNext pela clareza do caminho.

### O-A — NENHUMA FALHA DE INTENCAO

- **Uso na dissertacao (DAUMAS-CASE-1, DAUMAS-CASE-2)**: Objetivo conservador e consistente com normas — subir/retornar (Caso 1), reduzir velocidade para pouso (Caso 2).
- **Caminho canonico vNext**: O_ROOT → O_RULES(SIM) → O_MANAGED_RISK(SIM) → O-A
- **Caminho na dissertacao**: Consistente com normas? SIM → Conservativo/risco gerenciado? SIM → O-A
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo.
- **Recomendacao**: O-A mantido. Nao requer revisao.

### O-C — FALHA DE INTENCAO / VIOLACAO EXCEPCIONAL

- **Uso na dissertacao (DAUMAS-CASE-3)**: Nao era consistente com normas (procedimentos dizem que o piloto nao deve se envolver com outros assuntos). Nao foi violacao de rotina (primeira vez). Violacao excepcional, isolada.
- **Caminho canonico vNext**: O_ROOT → O_RULES(NAO) → O_ROUTINE(NAO) → O-C
- **Caminho na dissertacao**: Consistente com normas? NAO → Violacao de rotina? NAO → O-C
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo.
- **Recomendacao**: O-C mantido. Nao requer revisao.

### O-D — FALHA DE INTENCAO / NAO VIOLACAO

- **Uso na dissertacao (DAUMAS-CASE-4)**: Pousar era o objetivo do voo (consistente com normas), mas o procedimento define pouso pelo lado mais favoravel. Nao gerenciou adequadamente o risco — escolheu opcao arriscada intencionalmente.
- **Caminho canonico vNext**: O_ROOT → O_RULES(SIM) → O_MANAGED_RISK(NAO) → O-D
- **Caminho na dissertacao**: Consistente com normas? SIM → Conservativo/risco gerenciado? NAO → O-D
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo.
- **Recomendacao**: O-D mantido. Nao requer revisao.

### A-E — FALHA DE CONHECIMENTO (DECISAO)

- **Uso na dissertacao (DAUMAS-CASE-1)**: Piloto nao possuia experiencia de voo nem conhecimento dos sistemas da aeronave para formar acao apropriada. A_CAPABILITY = NAO_CONHECIMENTO.
- **Caminho canonico vNext**: A_ROOT → A_IMPLEMENTED(SIM) → A_CORRECT(NAO) → A_CAPABILITY(NAO_CONHECIMENTO) → A-E
- **Caminho na dissertacao**: Implementada como pretendida? SIM → Correta/adequada? NAO → Capacidade? NAO → A-E
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo.
- **Recomendacao**: A-E mantido. Nao requer revisao.

### A-H — FALHA NO GERENCIAMENTO DO TEMPO

- **Uso na dissertacao (DAUMAS-CASE-2)**: Priorizacao de atencao incorreta — piloto se preocupou mais em ver a plataforma do que em pilotar. Pressao de tempo excessiva. A_TIME_PRESSURE = SIM_GERENCIAMENTO.
- **Caminho canonico vNext**: A_ROOT → A_IMPLEMENTED(SIM) → A_CORRECT(NAO) → A_CAPABILITY(SIM) → A_TIME_PRESSURE(SIM_GERENCIAMENTO) → A-H
- **Caminho na dissertacao**: Implementada como pretendida? SIM → Correta/adequada? NAO → Capacidade? SIM → Pressao tempo? SIM → A-H
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo. O leaf code A-H e identico em ambas as taxonomias.
- **Recomendacao**: A-H mantido. Nao requer revisao.

### A-G — FALHA DE FEEDBACK

- **Uso na dissertacao (DAUMAS-CASE-3)**: Atencao desviada do objetivo principal (pilotagem) para objetivo secundario (colaboracao burocratica). Falha de monitoramento e verificacao cruzada. A_TIME_PRESSURE = NAO_FEEDBACK.
- **Caminho canonico vNext**: A_ROOT → A_IMPLEMENTED(SIM) → A_CORRECT(NAO) → A_CAPABILITY(SIM) → A_TIME_PRESSURE(NAO_FEEDBACK) → A-G
- **Caminho na dissertacao**: Implementada como pretendida? SIM → Correta/adequada? NAO → Capacidade? SIM → Pressao tempo? NAO → A-G (justificativa: falha de monitoramento/verificacao cruzada)
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo.
- **Nota**: A-G no modelo canonico tem dois caminhos de entrada (NAO_FEEDBACK em A_IMPLEMENTED e NAO_FEEDBACK em A_TIME_PRESSURE). A dissertacao usa o segundo caminho. Ambos sao validos.
- **Recomendacao**: A-G mantido. Nao requer revisao.

### A-F — FALHA NA SELECAO DA ACAO

- **Uso na dissertacao (DAUMAS-CASE-4)**: Acao inadequada implementada apesar de existir acao adequada disponivel. Sem pressao de tempo. A_TIME_PRESSURE = NAO_SELECAO.
- **Caminho canonico vNext**: A_ROOT → A_IMPLEMENTED(SIM) → A_CORRECT(NAO) → A_CAPABILITY(SIM) → A_TIME_PRESSURE(NAO_SELECAO) → A-F
- **Caminho na dissertacao**: Implementada como pretendida? SIM → Correta/adequada? NAO → Capacidade? SIM → Pressao tempo? NAO → A-F
- **Compatibilidade**: COMPATIBLE
- **Risco de divergencia**: Baixo.
- **Recomendacao**: A-F mantido. Nao requer revisao.

## 5. Revisao por caso

### DAUMAS-CASE-1

- **Original**: P-C / O-A / A-E
- **P-C**: COMPATIBLE — caminho identico ao canonico (P_CAPABILITY = NAO_CONHECIMENTO)
- **O-A**: COMPATIBLE — objetivo conservador de subir/retornar
- **A-E**: COMPATIBLE — operador nao possuia conhecimento para acao correta
- **Risco**: Baixo. Todos os 3 codigos tem caminhos canonicos claros.
- **Nota**: A dissertacao analisa apenas o piloto-aluno como ator. Nao ha actor split. Uma reanalise vNext poderia considerar contribuicoes separadas do instrutor, mas isso nao afeta a compatibilidade dos codigos.

### DAUMAS-CASE-2

- **Original**: P-D / O-A / A-H
- **P-D**: COMPATIBLE — pressao temporal capturou atencao (P_TIME_PRESSURE = SIM_ATENCAO)
- **O-A**: COMPATIBLE — objetivo de reduzir velocidade para pouso
- **A-H**: COMPATIBLE — gerenciamento do tempo/priorizacao incorreta
- **Risco**: Baixo para os codigos em si.
- **Registro de escopo**: Caso 2 permanece em 2A. 2B nao foi aberto. A barreira de 500 ft permanece como contexto/MDC. Eventual reanalise futura do Caso 2 com escopo proprio de ponto de fuga, se autorizada, exigira fase separada.
- **Nota**: A transferencia negativa de aprendizado (Bell 412 → S-76) e um fator contextual rico que o MDC capturou bem. A analise SERA capturou o efeito (P-D, A-H) mas nao a causa raiz do vies de habito — isso e proprio da limitacao do SERA sem MDC.

### DAUMAS-CASE-3

- **Original**: P-H / O-C / A-G
- **P-H**: COMPATIBLE_WITH_CAUTION — P-H e codigo canonico ativo vNext (FALHA DE COMUNICACAO, 3.3.3). O codigo em si e compativel. Porem, o caminho de perguntas da dissertacao diverge no no P_TIME_PRESSURE (responde SIM mas prossegue para questoes de informacao). Uma reanalise vNext estrita poderia resultar em P-D se a pressao de tempo for considerada o fator dominante no caminho canonico.
- **O-C**: COMPATIBLE — violacao excepcional, nao rotineira, caminho identico ao canonico
- **A-G**: COMPATIBLE — falha de feedback/monitoramento, caminho identico ao canonico (A_TIME_PRESSURE = NAO_FEEDBACK)
- **Risco**: MEDIO — apenas no eixo P, devido a divergencia de caminho no no P_TIME_PRESSURE. O-C e A-G sao COMPATIBLE.
- **Correcao ao extraction log A4R167**: A secao 6 do extraction log afirma que "P-H nao aparece como opcao canonica" no A4R166. Esta afirmacao e incorreta. P-H esta presente na arvore canonica A4R99. O extraction log deve ser atualizado em fase futura.
- **HFACS/pre-condicoes**: Mantidas como SOURCE_REPRODUCTION. Nao afetam a compatibilidade P/O/A.

### DAUMAS-CASE-4

- **Original**: P-G / O-D / A-F
- **P-G**: COMPATIBLE — informacao disponivel e correta, mas nao assimilada. Caminho identico ao canonico.
- **O-D**: COMPATIBLE — objetivo consistente com normas, mas nao gerenciou risco. Caminho identico.
- **A-F**: COMPATIBLE — selecao inadequada da acao sem pressao de tempo. Caminho identico.
- **Risco**: Baixo. Caso mais compativel com vNext dos 4.
- **Nota**: Este caso e o candidato mais forte a reference case vNext. O caminho de perguntas e limpo, a logica e linear, e os fatores psicologicos (Vies de Confirmacao) sao bem documentados no MDC. A dissertacao captura a dinamica completa: conversa previa → decisao → consciencia do risco → pouso → reconhecimento do erro.

## 6. Divergencias e riscos metodologicos

### 6.1 P-H — Codigo canonico confirmado, caminho com ressalva

**Constatacao**: Diferentemente do registrado no extraction log A4R167, P-H (FALHA DE COMUNICACAO) EXISTE como leaf code canonico ativo na arvore vNext A4R99. O codigo em si e COMPATIBLE.

**Divergencia de caminho**: No Caso 3, a dissertacao responde SIM a questao de pressao de tempo no eixo P (preocupacao em "agilizar a troca"), mas prossegue para questoes de informacao em vez de fechar em P-D ou P-E. No modelo canonico, P_TIME_PRESSURE(SIM) ramifica para P-D (SIM_ATENCAO) ou P-E (SIM_GERENCIAMENTO), nao para P_INFORMATION_AMBIGUOUS.

**Impacto**: Se uma reanalise vNext estrita for aplicada ao Caso 3, o eixo P poderia resultar em P-D (se pressao de tempo for dominante) ou P-H (se ausencia de informacao for dominante). Ambos sao defensaveis dependendo de qual fator o analista considerar primario.

**Recomendacao**: Manter P-H como SOURCE_REPRODUCTION. Nao reclassificar em A4R168. Registrar a divergencia de caminho para consideracao em eventual reanalise futura.

### 6.2 A-E — Compatibilidade confirmada

A-E (FALHA DE CONHECIMENTO/DECISAO) existe como leaf code canonico (A_CAPABILITY = NAO_CONHECIMENTO). O caminho da dissertacao no Caso 1 e identico ao canonico. A descricao "operador nao sabia a resposta correta" e consistente com a definicao vNext.

### 6.3 A-F vs A-G — Distincao preservada

Ambos os codigos existem na arvore canonica com distincao clara:
- A-F (NAO_SELECAO): acao inadequada selecionada apesar de alternativa adequada disponivel, sem pressao de tempo
- A-G (NAO_FEEDBACK): falha de monitoramento/verificacao cruzada, sem pressao de tempo

A dissertacao usa A-F no Caso 4 (decisao de pousar pelo lado errado) e A-G no Caso 3 (retirar mao do coletivo por desvio de atencao). Ambas as aplicacoes sao consistentes com as definicoes canonicas.

### 6.4 A-H — Compatibilidade confirmada

A-H (FALHA NO GERENCIAMENTO DO TEMPO) existe como leaf code canonico (A_TIME_PRESSURE = SIM_GERENCIAMENTO). O caminho da dissertacao no Caso 2 e identico ao canonico. A descricao "priorizacao de atencao incorreta" e consistente.

### 6.5 O-C — Compatibilidade confirmada

O-C (FALHA DE INTENCAO / VIOLACAO EXCEPCIONAL) existe como leaf code canonico (O_ROUTINE = NAO). O caminho da dissertacao no Caso 3 e identico ao canonico.

### 6.6 Ponto de fuga

- A4R167 reproduz pontos de fuga da dissertacao.
- A4R168 nao reabre ponto de fuga.
- Caso 2 2B nao foi aberto.
- A regra A4R166 (single escape point + multi-actor contributions) e compativel com a abordagem da dissertacao, embora a dissertacao nao implemente actor split.
- Caso 2 permanece 2A only; eventual reanalise futura exige fase separada com escopo proprio de ponto de fuga.

## 7. Decisao preliminar

| caseId | originalPOA | vNextCompatibility | riskLevel | recommendation | nextAction |
|--------|------------|-------------------|-----------|----------------|------------|
| DAUMAS-CASE-1 | P-C / O-A / A-E | COMPATIBLE | LOW | Manter SOURCE_REPRODUCTION. Todos os 3 codigos com caminhos canonicos diretos. | Nenhuma. Reference case viavel para vNext. |
| DAUMAS-CASE-2 | P-D / O-A / A-H | COMPATIBLE | LOW | Manter SOURCE_REPRODUCTION. Codigos compativeis. 2B nao aberto. | Nenhuma. Reanalise futura com escopo proprio de ponto de fuga se autorizada. |
| DAUMAS-CASE-3 | P-H / O-C / A-G | COMPATIBLE_WITH_CAUTION | MEDIUM | Manter SOURCE_REPRODUCTION. P-H e codigo canonico confirmado, mas caminho P diverge no no P_TIME_PRESSURE. | Registrar divergencia. Corrigir extraction log A4R167 quanto a afirmacao incorreta sobre P-H. |
| DAUMAS-CASE-4 | P-G / O-D / A-F | COMPATIBLE | LOW | Manter SOURCE_REPRODUCTION. Caminho mais limpo dos 4 casos. Forte candidato a reference case. | Nenhuma. Priorizar Caso 4 como reference case se houver fase de validacao vNext. |

## 8. Limites

- Sem reanalise.
- Sem release.
- Sem downstream.
- Sem fixture.
- Sem baseline.
- Sem runtime.
- Sem HFACS ativo.
- Sem Risk/ERC.
- Sem ARMS/ERC.
- Sem recommendations.
- Sem alteracao de codigos A4R167.
- Sem abertura de 2B no Caso 2.
