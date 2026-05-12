# SERA Rules: Organizational

Esta camada documenta como as regras SERA sao organizadas para manter
determinismo, auditabilidade e separacao entre dimensoes conceituais.

## Step 2: Goal, Perception, Action

O Step 2 organiza a avaliacao em tres dimensoes:

- `Goal`: verifica se o objetivo e identificavel, consistente com o pedido e
  adequado ao contexto.
- `Perception`: verifica se a leitura do estado atual e sustentada por sinais,
  evidencias ou contexto suficiente.
- `Action`: verifica se a acao resultante e coerente com o objetivo e com a
  percepcao aceita pela arvore.

Essas dimensoes devem permanecer separadas porque cada uma responde a uma
pergunta diferente:

- `Goal`: "O que esta sendo buscado?"
- `Perception`: "Como o estado atual foi entendido?"
- `Action`: "O que sera feito a partir disso?"

## P/O/A como arvores de decisao

P/O/A devem ser implementadas e revisadas como arvores de decisao, nao como uma
lista plana de 22 falhas equivalentes.

Uma lista plana enfraquece o Step 2 porque faz todas as falhas parecerem
semanticamente intercambiaveis. A arvore preserva dependencia causal:

- um no de `Goal` decide se existe objetivo avaliavel;
- um ramo de `Perception` so deve rodar quando o objetivo relevante ja foi
  estabelecido;
- um ramo de `Action` so deve validar a acao contra o objetivo e a percepcao
  aceitos pelos ramos anteriores.

O resultado esperado de uma avaliacao Step 2 deve indicar a dimensao afetada e,
quando aplicavel, o caminho da arvore que levou a decisao. Isso torna a falha
mais diagnostica do que um codigo isolado.

## Implicacao para novas regras

Ao adicionar uma regra P/O/A, primeiro identifique o ramo conceitual onde ela
vive. Se a regra puder ser aplicada sem depender de nenhuma decisao anterior,
ela provavelmente pertence a precondicoes ou validacao geral, nao ao miolo da
arvore Step 2.

