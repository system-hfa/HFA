# SERA Rules: Preconditions

Esta camada define as condicoes que precisam ser verdadeiras antes de um passo
SERA executar sua arvore de decisao.

## Responsabilidade

- Verificar disponibilidade dos dados minimos exigidos pelo passo.
- Bloquear execucao quando uma entrada obrigatoria estiver ausente, ambigua ou
  inconsistente.
- Produzir falhas deterministicas, explicitas e rastreaveis para o caller.

## Step 2: Goal, Perception, Action

No Step 2, as precondicoes devem confirmar que existe material suficiente para
avaliar separadamente:

- `Goal`: intencao, objetivo declarado ou resultado esperado.
- `Perception`: sinais observaveis, contexto, evidencias e interpretacao do
  estado atual.
- `Action`: acao proposta, executada ou recomendada.

A ausencia de uma dessas dimensoes nao deve ser tratada como uma falha generica.
Ela deve direcionar a execucao para o ramo correspondente da arvore de decisao
do Step 2.

## Forma da regra

P/O/A nao sao uma lista plana de falhas equivalentes. Cada dimensao deve ser
modelada como arvore de decisao: a resposta de um no determina o proximo teste,
e a falha final preserva o caminho logico percorrido.

