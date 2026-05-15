# SERA Evidence Sufficiency

**Data:** 2026-05-14
**Status:** Referência metodológica — orientação para classificação, produto e testes.

---

## 1. Propósito

Definir quando a evidência contida no relato é suficiente para classificar um evento SERA, quando deve gerar baixa confiança, quando deve solicitar complemento ao investigador e quando deve bloquear a análise por falta de base factual.

Este documento orienta o comportamento do pipeline, o design de produto e a criação de fixtures de teste.

---

## 2. Princípio fundamental

- A classificação deve ser proporcional à evidência disponível.
- Não inferir certeza quando o texto não sustenta a conclusão.
- Dados brutos podem ser suficientes, mas nem todo dado bruto é suficiente.
- O sistema deve apoiar o investigador, não substituir julgamento humano.

---

## 3. Níveis de suficiência

| Nível | Definição | Ação recomendada | Exemplo de situação |
|---|---|---|---|
| **Suficiente** | O texto contém fatos observáveis, agente identificável e sequência mínima que sustenta a classificação sem contradição forte | Classificar com confiança | Relato descreve o que o operador viu, o que decidiu e o que executou, com contexto de risco claro |
| **Parcial** | O texto tem evidência, mas ela é ambígua, incompleta ou admite mais de uma interpretação plausível | Classificar com baixa confiança; indicar alternativa; sugerir perguntas | Relato menciona o erro mas não descreve o que o operador sabia antes de agir; dois códigos são igualmente plausíveis |
| **Insuficiente** | Faltam dados críticos para identificar o ato inseguro, o agente ou o mecanismo de falha | Gerar perguntas complementares específicas; não classificar | Texto descreve apenas o resultado do evento sem descrever o que foi feito ou omitido |
| **Contraditória** | O texto contém afirmações que se excluem mutuamente sobre o mesmo fato | Reportar contradição; não resolver arbitrariamente | Relato afirma em um trecho que o operador recebeu o briefing e em outro que não havia sido informado |

---

## 4. Critérios gerais para evidência suficiente

Para que a classificação prossiga com confiança, o texto deve conter ao menos:

1. **Fato observável** — algo que aconteceu ou não aconteceu, descrito de forma factual, não apenas como opinião ou conclusão.
2. **Sequência temporal mínima** — é possível identificar o antes, o durante e o depois do ato inseguro, ainda que de forma implícita.
3. **Agente identificável** — quem realizou ou omitiu a ação, mesmo que implícito pelo contexto operacional.
4. **Ato inseguro identificável** — o que foi feito, omitido, selecionado errado ou não verificado.
5. **Consequência ou risco identificável** — algum efeito real ou potencial que ancora o ERC e justifica a análise.
6. **Indício textual por eixo** — ao menos um elemento que aponte para percepção, objetivo ou ação, permitindo discriminar o código mais adequado.
7. **Ausência de contradição forte** — o texto não nega o que afirma sobre o mesmo evento no mesmo contexto.

---

## 5. Evidência mínima por eixo

### Percepção (Step 3)

Para classificar percepção, o texto deve indicar se houve ou não falha no processo perceptivo. É necessário distinguir o tipo de falha:

| Pergunta central | O operador percebeu e interpretou corretamente as informações disponíveis no momento? |
|---|---|

- **Não viu / não ouviu:** sugere barreira sensorial (P-B) ou ausência de atenção (P-G ou P-D).
- **Não percebeu:** pode ser atenção, barreira ou conhecimento — o contexto deve discriminar.
- **Não interpretou corretamente:** aponta para P-C (conhecimento) ou P-F (percepção errônea).
- **Não monitorou:** aponta para P-E (gerenciamento de atenção) ou P-G (foco estreito).
- **Não recebeu:** aponta para P-H (falha de comunicação entre agentes).
- **Percepção sem falha:** texto indica que a informação estava disponível e foi corretamente processada (P-A).

A ausência de relato sobre percepção não é evidência automática de falha ou ausência de falha. O contexto deve sustentar a conclusão.

### Objetivo (Step 4)

Para classificar objetivo, o texto deve conter indício do que o operador pretendia fazer no momento do ato inseguro.

| Pergunta central | A intenção do operador estava alinhada com as normas? |
|---|---|

- **Objetivo operacional nominal:** operador pretendia cumprir a tarefa corretamente; falha foi de percepção ou execução (O-A).
- **Objetivo rotineiro normalizado:** indício explícito de prática aceita tacitamente, repetida culturalmente (O-B). Exige evidência de normalização, não apenas de repetição.
- **Objetivo protetivo excepcional:** indício explícito e literal de desvio consciente de protocolo *conhecido*, motivado por proteger uma pessoa de risco imediato (O-C). Circunstância excepcional sozinha não basta — deve haver intenção protetiva declarada ou fortemente evidenciada.
- **Objetivo de eficiência:** indício de ganho de tempo, economia ou otimização sem violação de norma (O-D). Exige ausência de normalização cultural e ausência de violação intencional.

### Ação (Step 5)

Para classificar ação, o texto deve descrever o que foi feito, omitido ou executado incorretamente.

| Pergunta central | O ato inseguro envolveu falha de execução, seleção, supervisão, feedback, conhecimento ou limitação física? |
|---|---|

- **Ato inseguro presente:** identifica deslize/lapso, seleção errada, ausência de verificação, decisão por déficit de conhecimento, falha de supervisão ou comunicação, limitação física.
- **Omissão:** o operador não realizou etapa necessária — distinguir se foi esquecimento (A-B), falta de verificação (A-C/A-G), limitação (A-D) ou decisão (A-E/A-F).
- **Ação sem falha de execução:** a falha estava em percepção ou objetivo, e a ação foi coerente com o que o operador percebeu e pretendia (A-A).

### ERC (Nível de Capacidade de Recuperação)

Para classificar o ERC, o texto deve conter indicação de gravidade, risco, barreiras e consequência real ou potencial.

| Pergunta central | Qual a severidade do evento e qual a capacidade de recuperação existente? |
|---|---|

- **Dano real ou irreversível:** ancora ERC 1 ou ERC 2 dependendo da magnitude e das barreiras.
- **Quase-acidente com exposição real:** ancora ERC 3.
- **Falha detectada posteriormente, sem exposição direta:** ancora ERC 4.
- **Omissão ou falha redundante sem impacto:** ancora ERC 5.

Ausência de relato de dano não significa ERC 5 automaticamente — pode significar que o relato está incompleto.

### Precondições

Precondições devem ser ancoradas em texto, não inferidas por plausibilidade genérica.

- Não classificar fadiga como precondição apenas porque o evento ocorreu em turno noturno, sem menção textual.
- Não inferir treinamento insuficiente apenas porque o operador errou — pode ser deslize ou seleção errada.
- Não inferir pressão de tempo sem indício explícito de urgência, demanda ou conflito de prioridades.
- Não inferir cultura organizacional sem indício de prática normalizada, histórico de tolerância ou supervisão ausente.

---

## 6. Quando classificar mesmo com relato bruto

O sistema pode classificar com confiança quando:

- O texto contém elementos suficientes para cada eixo SERA, mesmo sem estrutura formal.
- A ambiguidade presente não altera o código final (ex.: texto admite P-G ou P-D, mas o código de ação seria A-A em ambos os casos).
- Um gate determinístico é aplicável com base em vocabulário textual explícito.
- A evidência negativa (ausência explícita de um mecanismo) exclui as alternativas principais.
- O relato é curto, mas objetivo — descreve o que o operador fez e o contexto de forma direta.

---

## 7. Quando marcar baixa confiança

O sistema deve sinalizar baixa confiança quando:

- O texto está incompleto ou truncado, sem informação sobre etapas relevantes.
- Múltiplas interpretações são igualmente plausíveis e nenhuma pode ser descartada pelo texto.
- Falta contexto temporal — não é possível reconstituir a sequência antes/durante/depois.
- O objetivo do operador não está identificável no texto, direto ou implicitamente.
- Ação e consequência estão misturadas sem separação factual.
- O texto usa linguagem conclusiva sem evidência factual subjacente (ex.: "o piloto errou" sem descrever o que foi feito).
- Há terminologia técnica ambígua sem contexto suficiente para discriminar.

---

## 8. Quando bloquear ou pedir complemento

O sistema deve solicitar informação complementar ou indicar insuficiência quando:

- Não há ato inseguro identificável no texto.
- Não há agente identificado, nem explícito nem implícito pelo contexto.
- Não há evento operacional — o texto descreve apenas opinião, análise retrospectiva ou comentário.
- Faltam dados críticos para distinguir dois códigos com consequências metodológicas distintas.
- A evidência disponível é contraditória e a contradição é crítica para a classificação.
- O texto descreve situação genérica ou hipotética, sem ocorrência específica.

---

## 9. Perguntas complementares

Quando a evidência for insuficiente, o sistema deve gerar perguntas específicas — não perguntas genéricas.

### Percepção

- O operador viu, ouviu ou recebeu a informação relevante antes de agir?
- A informação estava disponível e acessível no momento do evento?
- Havia barreira sensorial (ruído, brilho, obstrução, EPI) que impediu a detecção?
- Houve interpretação incorreta apesar de atenção adequada (ilusão, display ambíguo)?

### Objetivo

- Qual era a intenção operacional declarada ou aparente do operador no momento?
- O objetivo era cumprir a tarefa nominal conforme o protocolo?
- Havia prática rotineira normalizada ou aceita tacitamente pela equipe?
- Havia objetivo de proteger uma pessoa em risco imediato que motivou o desvio?
- Havia objetivo de eficiência, economia de tempo ou simplificação do processo?

### Ação

- O que exatamente foi feito ou omitido pelo operador?
- A ação planejada foi executada corretamente na sequência esperada?
- Houve seleção errada entre opções conhecidas disponíveis?
- Houve falha de supervisão, supervisão passiva ou ausência de supervisão?
- Houve falha de comunicação entre agentes — informação não transmitida ou transmitida incorretamente?

### ERC

- Houve dano real — lesão, perda material, falha crítica de sistema?
- Houve quase-acidente — evento que poderia ter causado dano mas não causou?
- Havia barreiras remanescentes que impediram o dano?
- Qual era o pior resultado plausível dado o que aconteceu?

### Precondições

- Havia pressão de tempo imposta pelo sistema operacional ou pela situação?
- Havia ferramenta inadequada, defeituosa ou indisponível?
- O operador tinha treinamento específico para o contexto e a tarefa?
- Havia supervisão ativa ou o operador operava de forma autônoma?
- Havia fadiga, prontidão reduzida ou turno prolongado?
- Havia problema de comunicação entre turnos, equipes ou níveis hierárquicos?

---

## 10. Regra de ouro

> **"Classificar quando há base; perguntar quando falta base; nunca inventar base."**

O sistema deve ser transparente sobre o que sustenta cada classificação. O investigador deve poder ver qual trecho do texto originou cada código, qual foi a lógica aplicada e onde estão as lacunas.

---

## 11. Relação com entrevista estruturada

A entrevista estruturada é o mecanismo mais eficaz para fechar lacunas de evidência, mas não é requisito para a análise inicial.

- **Entrevista fecha lacunas:** permite perguntar diretamente sobre o que o operador percebeu, pretendia e executou, com rastreabilidade.
- **Não é pré-requisito:** o sistema deve analisar o relato bruto disponível, identificar lacunas e sugerir perguntas específicas para preencher essas lacunas.
- **Entrevistas podem ser sugeridas:** quando o texto bruto é insuficiente para uma ou mais etapas SERA, o sistema indica quais perguntas deveriam ser feitas na entrevista.
- **Perguntas devem ser guiadas pelos gaps:** não gerar questionário genérico — perguntar especificamente o que falta para fechar a classificação em aberto.

---

## 12. Implicações para UI/produto

A interface deve:

- Mostrar o nível de confiança de cada classificação de forma visível e compreensível.
- Mostrar qual trecho do texto sustentou cada código — rastreabilidade textual.
- Mostrar quais lacunas foram identificadas por eixo.
- Sugerir perguntas complementares específicas quando houver lacuna.
- Permitir que o investigador adicione informação e reclassifique com base em evidência complementar.
- Deixar claro que a classificação é assistiva — a decisão final pertence ao investigador.
- Nunca apresentar classificação como definitiva sem revisão humana explícita.

---

## 13. Implicações para testes

- Criar fixtures com relato suficiente e expectativa de classificação com confiança.
- Criar fixtures com relato insuficiente — comportamento esperado é indicar lacuna e sugerir pergunta, não classificar.
- Criar fixtures com dados contraditórios — comportamento esperado é reportar contradição, não resolver arbitrariamente.
- Criar fixtures com dados brutos longos — verificar que o classificador extrai os elementos relevantes sem ser guiado.
- Criar fixtures com dados fragmentados — verificar comportamento de suficiência parcial.
- Criar fixtures de casos onde o sistema deve perguntar, não classificar — verificar que o pipeline não força código com base fraca.

---

## 14. Decisões explícitas

| Decisão | Motivação |
|---|---|
| Não tratar ausência de evidência como evidência negativa forte, exceto quando regra metodológica permitir | Ausência pode ser lacuna de relato, não fato negativo |
| Não preencher lacunas com conhecimento externo não citado no relato | Rastreabilidade exige que toda conclusão tenha base no texto |
| Não esconder incerteza do usuário | Investigador precisa saber o que o sistema sabe e o que não sabe |
| Não promover confiança alta sem evidência textual que a sustente | Confiança inflada prejudica o investigador e compromete a auditoria |
| Não depender de entrevista estruturada para iniciar análise | Dados reais são heterogêneos; a análise deve partir do que existe |

---

## 15. Próximos passos

- [ ] Criar fixtures de evidência insuficiente — relatos que não contêm ato inseguro identificável.
- [ ] Criar fixtures de casos contraditórios — relatos com afirmações que se excluem.
- [ ] Criar camada explícita de confidence/sufficiency no pipeline com output estruturado.
- [ ] Integrar camada de suficiência com módulo de entrevista — sugestão de perguntas por gap.
- [ ] Revisar textos do site para refletir comportamento de suficiência e perguntas complementares.
- [ ] Mapear evidência textual usada por código — rastreabilidade por eixo.
- [ ] Criar benchmark separado para relato bruto vs. relato estruturado (comparativo de acurácia).
