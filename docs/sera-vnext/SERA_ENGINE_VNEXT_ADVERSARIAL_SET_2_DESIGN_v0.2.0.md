# SERA Engine vNext Adversarial Set 2 Design v0.2.0

Status: DESIGN_ONLY
Phase: A4+R-50 — Adversarial Set 2 Design

## Objetivo
Definir um conjunto de casos adversariais sintéticos para testar fronteiras críticas da taxonomia SERA-PT v1.0, expor riscos de classificação automática incorreta e fornecer base para futuros testes de regressão. Nenhum caso adversarial é executável nesta fase — são designs para implementação futura.

## Escopo
- Definição de cenários sintéticos que forçam ambiguidade em fronteiras canônicas.
- Especificação do comportamento esperado e erros a evitar.
- Cobertura das distinções críticas da taxonomia.

## Fora de escopo
- Execução dos testes adversariais.
- Classificação real de eventos.
- Alteração de código de runtime.
- Implementação de novos gates.

## Adversarial Cases

### ADV-2-001 — Weather/warning degradation não pode virar falha perceptiva automática
- **adversarialId**: ADV-2-001
- **objetivo**: Garantir que degradação de weather/warning não seja automaticamente classificada como falha perceptiva (P-B, P-C, P-F) sem evidência de que a informação estava disponível e foi mal processada.
- **cenário**: Tripulação recebe weather report ambíguo com informação parcialmente degradada por limitação do sistema de bordo. A informação disponível era insuficiente para formar percepção completa da condição meteorológica real.
- **erro que o sistema deve evitar**: Classificar como P-B, P-C ou P-F automaticamente porque havia weather degradation. Se a informação disponível era objetivamente insuficiente, o código perceptivo pode ser P-A (sem falha perceptiva específica) ou requerer `INSUFFICIENT_EVIDENCE`.
- **eixo alvo**: P
- **código alvo**: P-A vs P-B/P-C/P-F
- **expectedBehavior**: Sistema não deve inferir falha perceptiva apenas da presença de weather degradation. Deve exigir evidência de que sinais estavam disponíveis e não foram adequadamente processados.
- **locks esperados**: downstream locked, sem finalConclusion, sem HFACS/Risk/ERC.

### ADV-2-002 — Aircraft/system state não pode virar A-D automático
- **adversarialId**: ADV-2-002
- **objetivo**: Garantir que estado da aeronave/sistema (vibração, alarme, condição física) não seja automaticamente classificado como incapacidade física/ergonômica (A-D).
- **cenário**: Alarme sonoro alto e vibração na cabine durante fase crítica. Piloto executa ação correta, mas com atraso devido à dificuldade de comunicação em ambiente ruidoso. A ação não foi impedida por limitação física do piloto, mas por condição ambiental.
- **erro que o sistema deve evitar**: Classificar como A-D (incapacidade física) porque havia condição física adversa. Sem evidência de limitação física/motora/ergonômica do ator, A-D não se aplica.
- **eixo alvo**: A
- **código alvo**: A-D vs A-H (falha de gerenciamento temporal) vs A-A (sem falha de ação)
- **expectedBehavior**: Sistema deve distinguir condição ambiental adversa de limitação física do ator.
- **locks esperados**: downstream locked.

### ADV-2-003 — Continuação operacional não vira O-C/O-D automático
- **adversarialId**: ADV-2-003
- **objetivo**: Garantir que continuar operação após condição adversa não seja automaticamente classificado como violação (O-C) ou objetivo de eficiência (O-D) sem evidência de intenção e awareness.
- **cenário**: Após weather deterioration, comandante decide continuar para destino em vez de alternar. A decisão foi baseada em informação incompleta sobre a severidade real, não em intenção de violar ou economizar. O comandante acreditava, com a informação disponível, que a continuação era segura.
- **erro que o sistema deve evitar**: Classificar como O-C ou O-D porque a continuação, em retrospecto, foi incorreta. Sem evidência de que o ator tinha consciência do desvio ou intenção de ganho, O-A (objetivo operacional correto) pode ser a classificação adequada.
- **eixo alvo**: O
- **código alvo**: O-A vs O-C vs O-D
- **expectedBehavior**: Exigir evidência de intent/rule-awareness para O-C; exigir evidência de ganho operacional para O-D.
- **locks esperados**: downstream locked.

### ADV-2-004 — A-A vs A-C: ausência de falha de ação vs feedback pós-ação própria
- **adversarialId**: ADV-2-004
- **objetivo**: Testar a fronteira canônica entre A-A (sem falha de ação específica) e A-C (falha de feedback/verificação pós-ação própria).
- **cenário**: Piloto executa checklist pós-decolagem. Todos os itens são executados. Um item do checklist, se verificado visualmente, revelaria uma anomalia, mas o piloto apenas executa o item sem verificar o resultado. A ação de executar o item foi correta; a falha foi na verificação do resultado.
- **erro que o sistema deve evitar**: Classificar como A-A quando há falha de verificação pós-ação (A-C), ou classificar como A-C quando a ação em si não foi executada (seria A-B, omissão). A distinção A-A/A-C é canônica e deve ser preservada: A-A = ação coerente, sem mecanismo de falha; A-C = ação executada, mas resultado não verificado.
- **eixo alvo**: A
- **código alvo**: A-A vs A-C vs A-B
- **expectedBehavior**: A-C deve ser selecionado quando há evidência de que a ação foi executada mas seu resultado não foi verificado.
- **locks esperados**: downstream locked.

### ADV-2-005 — P-D vs P-G: atenção com vs sem pressão temporal dominante
- **adversarialId**: ADV-2-005
- **objetivo**: Testar a fronteira canônica entre P-D (sobrecarga atencional com pressão temporal dominante) e P-G (falha de monitoramento/verificação sem pressão dominante).
- **cenário**: Piloto monitorando múltiplos instrumentos durante aproximação. Um instrumento indica desvio, mas o piloto não percebe. A carga de trabalho é alta, mas não há evidência de pressão temporal excessiva — o piloto tinha tempo suficiente para scan completo, apenas não o fez adequadamente.
- **erro que o sistema deve evitar**: Classificar como P-D automaticamente por alta carga de trabalho. `timePressureExcessive` deve ser o discriminador: se não há evidência de pressão temporal dominante, P-G é a classificação correta.
- **eixo alvo**: P
- **código alvo**: P-D vs P-G
- **expectedBehavior**: Exigir evidência de `timePressureExcessive` para P-D. Sem ela, default é P-G quando há falha de monitoramento.
- **locks esperados**: downstream locked.

### ADV-2-006 — A-F vs A-I: seleção com vs sem pressão temporal
- **adversarialId**: ADV-2-006
- **objetivo**: Testar a fronteira entre A-F (seleção errada entre alternativas, sem pressão dominante) e A-I (seleção inadequada sob pressão temporal dominante).
- **cenário**: Piloto seleciona procedimento errado entre dois disponíveis. Há ambiguidade sobre se a pressão temporal foi o fator determinante ou se foi erro de julgamento mesmo com tempo adequado. O cenário deve ser construído com pressão temporal limítrofe para forçar a distinção.
- **erro que o sistema deve evitar**: Classificar A-I sem evidência de `timePressureExcessive` dominante. Ou classificar A-F quando a pressão temporal era claramente o fator determinante.
- **eixo alvo**: A
- **código alvo**: A-F vs A-I
- **expectedBehavior**: `timePressureExcessive` como discriminador canônico. Evidência de pressão temporal deve ser explícita para A-I.
- **locks esperados**: downstream locked.

### ADV-2-007 — A-G vs A-J: supervisão/coordenação vs comunicação sob pressão temporal
- **adversarialId**: ADV-2-007
- **objetivo**: Testar a fronteira entre A-G (falha de feedback/supervisão de terceiros, sem pressão dominante) e A-J (falha de feedback/comunicação sob pressão temporal dominante).
- **cenário**: Controlador de tráfego aéreo não verifica readback de piloto. Há pressão de tráfego elevada. A falha é de verificação de comunicação (readback) com pressão temporal? Ou é falha de supervisão/coordenação sem pressão dominante?
- **erro que o sistema deve evitar**: Confundir falha de supervisão (A-G, domínio de terceiro, sem pressão temporal) com falha de comunicação/readback sob pressão (A-J, domínio comunicacional, com `timePressureExcessive`). A presença de pressão temporal e o tipo de falha (supervisão vs comunicação) são os discriminadores.
- **eixo alvo**: A
- **código alvo**: A-G vs A-J
- **expectedBehavior**: A-J requer evidência de falha comunicacional + `timePressureExcessive`. A-G requer evidência de falha de supervisão/coordenação sobre terceiro, sem pressão dominante.
- **locks esperados**: downstream locked.

### ADV-2-008 — O-B vs O-C: rotina/normalização vs violação excepcional
- **adversarialId**: ADV-2-008
- **objetivo**: Testar a fronteira entre O-B (violação rotineira normalizada) e O-C (violação excepcional/circunstancial).
- **cenário**: Em uma organização, um procedimento é frequentemente "atalhado" por vários operadores, mas não há evidência de tolerância formal da organização. Um novo operador segue o atalho observado em colegas. Isso é normalização cultural (O-B) ou violação excepcional individual (O-C)?
- **erro que o sistema deve evitar**: Classificar O-B sem evidência de repetição/normalização/tolerância organizacional. Ou classificar O-C quando há evidência de prática habitual tolerada.
- **eixo alvo**: O
- **código alvo**: O-B vs O-C
- **expectedBehavior**: O-B exige evidência de habitualidade e normalização cultural. O-C exige evidência de consciência do desvio + caráter não rotineiro.
- **locks esperados**: downstream locked.

### ADV-2-009 — O-D vs O-C: eficiência sem violação vs violação consciente
- **adversarialId**: ADV-2-009
- **objetivo**: Testar a fronteira entre O-D (objetivo de eficiência/economia, sem violação formal) e O-C (violação excepcional consciente).
- **cenário**: Comandante escolhe rota mais curta, dentro dos limites operacionais, mas menos conservadora que a rota padrão recomendada. Não há violação de regra formal, mas há escolha de eficiência com margem reduzida. Isso é O-D (eficiência sem violação) ou O-C (violação consciente de procedimento)?
- **erro que o sistema deve evitar**: Classificar O-C quando não há violação formal de regra, apenas escolha menos conservadora. Ou classificar O-D quando há violação consciente de procedimento estabelecido.
- **eixo alvo**: O
- **código alvo**: O-D vs O-C
- **expectedBehavior**: O-D requer evidência de objetivo de eficiência/economia sem violação formal. O-C requer evidência de violação consciente de regra conhecida.
- **locks esperados**: downstream locked.

### ADV-2-010 — P-B vs P-C: limitação sensorial vs conhecimento/interpretação
- **adversarialId**: ADV-2-010
- **objetivo**: Testar a fronteira entre P-B (falha sensorial física) e P-C (falha de interpretação por conhecimento perceptivo).
- **cenário**: Piloto não detecta luz de alerta no painel. A luz estava funcionando e dentro do campo visual. O piloto olhou na direção, mas não reconheceu o significado do alerta por falta de familiaridade com aquele sistema específico. Isso é barreira sensorial (P-B) ou déficit de conhecimento interpretativo (P-C)?
- **erro que o sistema deve evitar**: Classificar P-B quando o sinal foi fisicamente percebido mas não interpretado. Classificar P-C quando o sinal não foi fisicamente detectável (barreira sensorial).
- **eixo alvo**: P
- **código alvo**: P-B vs P-C
- **expectedBehavior**: P-B requer barreira sensorial/ambiental explícita. P-C requer déficit de conhecimento interpretativo. Se o sinal foi detectado sensorialmente mas não compreendido, é P-C.
- **locks esperados**: downstream locked.

### ADV-2-011 — P-H vs A-J: falha de informação perceptiva vs falha de comunicação na ação
- **adversarialId**: ADV-2-011
- **objetivo**: Testar a fronteira entre P-H (falha de comunicação/informação no eixo Perception) e A-J (falha de feedback/comunicação no eixo Action, sob pressão temporal).
- **cenário**: Controlador transmite instrução ambígua. Piloto recebe e executa ação baseada em interpretação errada da instrução. A falha está na transmissão da informação (P-H, perceptivo, informação ambígua recebida) ou na verificação de readback/comunicação (A-J, falha de fechamento de loop comunicacional)?
- **erro que o sistema deve evitar**: Classificar A-J quando a falha primária é de transmissão de informação (domínio perceptivo). Ou classificar P-H quando há falha de verificação de comunicação na ação (domínio de ação, com pressão temporal).
- **eixo alvo**: P / A
- **código alvo**: P-H vs A-J
- **expectedBehavior**: P-H = falha na transmissão humano-humano ou humano-máquina (domínio perceptivo). A-J = falha de readback/recebimento/fechamento de loop sob pressão temporal (domínio de ação).
- **locks esperados**: downstream locked.

### ADV-2-012 — Evidence insufficient: caso deve permanecer UNRESOLVED
- **adversarialId**: ADV-2-012
- **objetivo**: Garantir que o sistema não classifique quando a evidência é insuficiente para qualquer código.
- **cenário**: Evento com documentação mínima: "aeronave desviou da altitude autorizada". Sem informação sobre percepção do piloto, intenção, condições operacionais, ou qualquer evidência adicional. Apenas o fato do desvio.
- **erro que o sistema deve evitar**: Classificar qualquer código P/O/A baseado apenas no fato do desvio. O sistema deve retornar `INSUFFICIENT_EVIDENCE` ou `UNRESOLVED` para todos os eixos.
- **eixo alvo**: P, O, A
- **código alvo**: INSUFFICIENT_EVIDENCE / UNRESOLVED
- **expectedBehavior**: Nenhum código liberado. Status `INSUFFICIENT_EVIDENCE` para cada eixo.
- **locks esperados**: downstream locked.

### ADV-2-013 — O-E reserved: qualquer tentativa de uso deve bloquear
- **adversarialId**: ADV-2-013
- **objetivo**: Garantir que O-E (RESERVED / NOT_ACTIVE) não possa ser usado como código ativo em nenhuma circunstância.
- **cenário**: Um revisor tenta classificar o eixo Objective como O-E, ou um input de teste injeta código O-E como released code.
- **erro que o sistema deve evitar**: Aceitar O-E como código ativo. Qualquer tentativa deve gerar bloqueio com issue explícito: `O-E is RESERVED / NOT_ACTIVE`.
- **eixo alvo**: O
- **código alvo**: O-E (RESERVED)
- **expectedBehavior**: Bloqueio imediato. `status = RESERVED_NOT_ACTIVE`. Warning explícito.
- **locks esperados**: downstream locked.

### ADV-2-014 — Multi-actor context: fronteira sem modelar múltiplos unsafe acts
- **adversarialId**: ADV-2-014
- **objetivo**: Testar o limite do modelo atual (um ato/condição insegura por caso) em cenário multi-ator, sem implementar suporte a múltiplos unsafe acts.
- **cenário**: Dois pilotos e um controlador envolvidos em um evento. Há contribuições de múltiplos atores para o estado inseguro. O modelo atual suporta apenas um `unsafeActCondition` por caso.
- **erro que o sistema deve evitar**: Tentar classificar múltiplos atos simultaneamente no modelo atual. Ou ignorar contribuições de atores secundários.
- **eixo alvo**: P, O, A (multi-actor)
- **código alvo**: N/A — teste de fronteira do modelo
- **expectedBehavior**: O modelo deve reconhecer a limitação. O caso multi-ator deve ser documentado como limitação conhecida, não como caso de referência completo.
- **locks esperados**: downstream locked. O modelo não deve tentar classificar múltiplos atos.

## Cobertura de fronteiras canônicas

| Grupo | ADV ID | Fronteira |
|-------|--------|-----------|
| 1 | ADV-2-001 | Weather/warning → falha perceptiva automática |
| 2 | ADV-2-002 | Aircraft/system state → A-D automático |
| 3 | ADV-2-003 | Continuação operacional → O-C/O-D automático |
| 4 | ADV-2-004 | A-A vs A-C (no-failure vs feedback pós-ação própria) |
| 5 | ADV-2-005 | P-D vs P-G (atenção com/sem pressão temporal) |
| 6 | ADV-2-006 | A-F vs A-I (seleção com/sem pressão temporal) |
| 7 | ADV-2-007 | A-G vs A-J (supervisão vs comunicação sob pressão) |
| 8 | ADV-2-008 | O-B vs O-C (rotina vs violação excepcional) |
| 9 | ADV-2-009 | O-D vs O-C (eficiência vs violação) |
| 10 | ADV-2-010 | P-B vs P-C (sensorial vs conhecimento) |
| 11 | ADV-2-011 | P-H vs A-J (informação perceptiva vs comunicação na ação) |
| 12 | ADV-2-012 | Evidence insufficient → UNRESOLVED |
| 13 | ADV-2-013 | O-E reserved → bloqueio |
| 14 | ADV-2-014 | Multi-actor context → fronteira do modelo |

## Status dos casos adversariais
Todos os casos acima estão em status **DESIGN_ONLY**. Nenhum é executável nesta fase. A implementação como testes automatizados ou cenários de validação requer:
- Materialização dos cenários sintéticos com factual summaries completos.
- Definição de expected inputs/outputs precisos para o runtime.
- Integração com o pipeline de testes existente (ex.: `tests/sera-vnext/`).

## Relação com consensus reference cases
- Casos adversariais que atingirem consenso entre avaliadores podem ser promovidos a consensus reference cases do tipo `ADVERSARIAL`.
- Casos adversariais com divergência persistente devem ser mantidos como `AMBIGUITY` e documentados como limitação.

## Relação com inter-rater
- O adversarial set 2 deve ser incluído na amostra do protocolo inter-rater.
- A performance dos revisores nos casos adversariais é particularmente informativa sobre a clareza das fronteiras canônicas.

## Limitações
- Cenários são sintéticos e simplificados. Não substituem casos reais.
- Não cobrem todas as combinações possíveis de P/O/A.
- Não testam performance de runtime, apenas correção taxonômica.
- Não implementam execução automatizada.
