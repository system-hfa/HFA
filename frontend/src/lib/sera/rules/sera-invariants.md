# SERA Methodological Invariants — HFA

## Princípio central
O sistema deve identificar o mecanismo causal predominante da falha humana, e não apenas sua consequência operacional.

## Regras gerais
- LLM nunca pode escolher códigos fora do branch permitido.
- Todo código final deve passar por assertAllowedCode ou assertAllowedCodes.
- O sistema deve priorizar mecanismos específicos antes de fallbacks genéricos.
- A-I nunca pode atuar como fallback universal.
- O-A é default quando não há intenção desviante explícita.
- P-A é default quando não há falha perceptiva explícita.
- ERC não pode ser inferido apenas pela gravidade narrativa.

## Percepção

### P-A
- default sem falha perceptiva explícita.

### P-B
- falha sensorial.
- ruído, visibilidade, audição, sinal não detectado.

### P-C
- falha de interpretação/conhecimento perceptivo.
- desconhecimento técnico.
- incapacidade de interpretar instrumento/sistema.

### P-D
- sobrecarga atencional.
- alta demanda.
- múltiplos estímulos.
- congestionamento operacional.

### P-E
- erro de gerenciamento temporal.
- subestimação de tempo.
- pressão temporal cognitiva.

### P-F
- ilusão perceptiva.
- percepção espacial equivocada.
- distorção sensorial/cognitiva.

### P-G
- falha de monitoramento/verificação.
- complacência.
- pressuposição de normalidade.

### P-H
- falha de comunicação/informação.
- briefing ambíguo.
- instrução mal interpretada.

## Objetivo

### O-A
- objetivo operacional correto/default.

### O-B
- violação rotineira.
- desvio normalizado.
- cultura informal.
- "sempre fazemos assim".

### O-C
- violação excepcional/altruística.
- proteger pessoa/passageiro/paciente/equipe.
- emergência humana explícita.

### O-D
- objetivo de eficiência/economia/ganho operacional.
- economizar combustível.
- ganhar tempo.
- produtividade.
- otimização.

### Regras críticas
- comunicação operacional NÃO implica O-C.
- readback/frequência/coordenação NÃO geram O-C.
- O-C exige intenção humana explícita.
- eficiência/economia NÃO podem virar O-C.

## Ação

### A-A
- nenhuma falha de ação específica.

### A-B
- omissão/lapso/deslize procedural.

### A-C
- não verificar resultado da própria ação.

### A-D
- incapacidade física/ergonômica/motora.

### A-E
- falta de conhecimento/habilidade operacional.

### A-F
- seleção errada entre alternativas/procedimentos.

### A-G
- falha de supervisão/delegação/verificação de terceiros.

### A-H
- falha de gerenciamento temporal na execução.

### A-I
- seleção inadequada sob pressão temporal/carga operacional.

### A-J
- falha de confirmação/readback/comunicação operacional.

## Precedência

Antes de A-B/A-C, avaliar:
1. A-D
2. A-E
3. A-G
4. A-J
5. A-F
6. A-H
7. A-I
8. A-B/A-C

Regras:
- A-F vence A-B/A-C.
- A-G vence A-C quando envolve terceiros.
- A-J vence A-B/A-C quando a falha central é comunicação.
- A-D vence A-B quando há incapacidade física explícita.
- A-E vence A-B quando há desconhecimento explícito.

## Cross-code Exclusions

As exclusões cruzadas vivem em `rules/exclusions/` e não substituem os gates
determinísticos atuais. Elas são uma camada persistente de auditoria
metodológica para registrar por que um código vence outro quando dois rótulos
parecem próximos.

Essas exclusões documentam relações como:
- quando uma falha física A-D prevalece sobre omissão A-B/A-C;
- quando A-J só deve vencer A-C se comunicação ou confirmação for a falha
  central;
- quando P-B, P-C, P-F e P-G devem permanecer separados por mecanismo
  perceptivo;
- quando O-C é bloqueado por contexto operacional simples e exige intenção
  humana explícita.

Uso futuro previsto:
- decision trace explicável;
- validação de branch contra exclusões formais;
- relatórios de auditoria científica;
- checagem de consistência entre código final, descartes e racional.
