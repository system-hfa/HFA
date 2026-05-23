# SERA Engine vNext Inter-Rater Reliability Protocol v0.2.0

Status: DRAFT_FOR_REVIEW
Phase: A4+R-49 — Inter-Rater Reliability Protocol

## Objetivo
Definir o protocolo metodológico para avaliação de confiabilidade entre revisores (inter-rater reliability) na aplicação da taxonomia SERA-PT/HFA, estabelecendo métricas, procedimentos e thresholds para uso como gate de qualidade metodológica futura.

## Por que inter-rater é necessário antes de claim forte de validação
- A classificação SERA-PT depende de julgamento humano informado por evidências, não de algoritmo determinístico.
- Sem evidência de concordância entre revisores, não é possível afirmar que a taxonomia produz classificações consistentes.
- O protocolo inter-rater fornece a base empírica mínima para claims de confiabilidade metodológica.
- Thresholds de concordância aceitáveis devem ser estabelecidos antes de qualquer declaração de validação.

## Escopo
- Avaliar consistência de revisores humanos usando SERA-PT/HFA.
- Análise por eixo P/O/A (Perception, Objective, Action).
- Análise por no-failure vs failure (distinção `A-A` vs códigos de falha ativa).
- Análise por categorias críticas: códigos com variável de pressão temporal (`P-D`/`P-G`, `A-F`/`A-I`, `A-G`/`A-J`), `A-A`/`A-C`, `O-B`/`O-C`/`O-D`.
- Análise qualitativa de divergências.

## Fora de escopo
- Provar causa real absoluta dos eventos analisados.
- Validar Risk/ERC.
- Validar HFACS.
- Validar recomendações.
- Validar UI/produto.
- Substituir validação empírica completa da metodologia.

## Amostra recomendada
- **Tamanho**: 15 a 25 casos na rodada inicial.
- **Composição**:
  - Casos reais (eventos operacionais documentados).
  - Casos sintéticos (construídos para testar códigos específicos).
  - Casos negativos (eventos sem fator humano relevante, ou `A-A`).
  - Casos adversariais (projetados para expor ambiguidades de fronteira taxonômica).
- **Diversidade**:
  - Incluir eventos offshore quando possível.
  - Incluir casos com pressão temporal, intenção, feedback, comunicação e ausência de falha.
  - Buscar cobertura dos eixos P, O, A e das principais distinções canônicas.

## Revisores
- **Número mínimo**: 2 avaliadores para piloto inicial.
- **Número recomendado**: 3 ou mais avaliadores treinados quando possível.
- **Requisitos**:
  - Treinamento documentado na taxonomia SERA-PT v1.0.
  - Familiaridade com a decisão autoral A-A/A-C.
  - Familiaridade com o status `RESERVED` de `O-E`.
- **Registro**: background e treinamento de cada revisor, sem dados pessoais sensíveis.

## Métricas

### Concordância simples por eixo
Percentual de concordância exata entre revisores para cada eixo P, O, A separadamente.

### Cohen kappa (2 revisores)
Calculado para cada par de revisores, por eixo e para o conjunto completo P/O/A.

### Fleiss kappa (3+ revisores)
Calculado para o conjunto de revisores quando houver 3 ou mais, por eixo e para o conjunto completo.

### Análise qualitativa de divergências
- Identificar padrões de divergência sistemática.
- Classificar divergências por tipo: ambiguidade taxonômica, evidência insuficiente, erro de interpretação, fronteira de código.
- Documentar resolução ou manutenção de cada divergência.

### Taxa de INSUFFICIENT_EVIDENCE/UNRESOLVED
- Proporção de casos em que revisores indicam `INSUFFICIENT_EVIDENCE` ou `UNRESOLVED`.
- Concordância sobre insuficiência de evidência é tão importante quanto concordância sobre classificação.

## Thresholds sugeridos
- **kappa >= 0.60**: aceitável inicial para taxonomia complexa com múltiplas categorias. Indica concordância moderada, suficiente para continuar desenvolvimento metodológico.
- **kappa >= 0.80**: forte. Indica concordância substancial, desejável para declaração de confiabilidade.
- **kappa < 0.60**: requer revisão. Indica necessidade de refinamento taxonômico, treinamento adicional ou revisão de definições canônicas.
- **Divergências críticas**: qualquer padrão de divergência que afete códigos canônicos fundamentais (ex.: `A-A`/`A-C`, `O-B`/`O-C`, variáveis de pressão temporal) deve gerar revisão de taxonomia ou treinamento, independentemente do kappa global.

## Procedimento

### Fase 1: Preparação
1. Selecionar amostra de casos conforme critérios acima.
2. Preparar material de cada caso: factual summary, evidências, unsafe state/act.
3. Treinar revisores na taxonomia SERA-PT v1.0, decisão autoral A-A/A-C, e status de `O-E`.
4. Fornecer documentação canônica de referência.

### Fase 2: Classificação independente
1. Cada revisor classifica independentemente todos os casos.
2. Registro de P/O/A para cada caso.
3. Registro de rationale para cada classificação.
4. Registro de confidence (LOW/MEDIUM/HIGH) para cada eixo.
5. Revisores não comunicam entre si durante esta fase.

### Fase 3: Coleta e análise
1. Calcular métricas de concordância (simples, kappa).
2. Identificar casos com divergência.
3. Classificar divergências por tipo e severidade.

### Fase 4: Reunião de consenso
1. Revisores discutem casos divergentes.
2. Registrar rationale de cada revisor para a divergência.
3. Buscar consenso quando possível, sem forçar concordância artificial.
4. Documentar divergências mantidas e suas razões.

### Fase 5: Registro e atualização
1. Casos com consenso podem ser promovidos a consensus reference cases.
2. Divergências documentadas alimentam revisão de taxonomia ou treinamento.
3. Atualizar documentação metodológica com achados do protocolo.

## Resultado esperado
- Este protocolo define o método, mas não executa o estudo.
- A execução do protocolo é gate futuro para candidate freeze.
- Não declarar validação final até que o protocolo seja executado com thresholds aceitáveis.
- O resultado do protocolo, quando executado, será documentado como evidência de confiabilidade metodológica, não como prova de validade científica absoluta.

## Relação com candidate freeze
- O protocolo inter-rater é pré-requisito para declaração de candidate freeze final.
- A definição do protocolo (este documento) reduz a lacuna de governança, mas não a fecha.
- A execução do protocolo com resultados aceitáveis é condição necessária para o freeze.

## Linguagem metodológica
- Após execução bem-sucedida: `inter-rater reliability assessed, kappa >= [valor]`
- Antes da execução: `inter-rater protocol defined, study pending`
- Evitar: `validated by inter-rater agreement`, `scientifically proven reliable`
