# SERA Rules: Validation

Esta camada descreve como validar resultados SERA sem depender de fixtures no
momento de manutencao das regras.

## Validacao deterministica

Validacoes devem confirmar que uma regra:

- retorna o mesmo resultado para a mesma entrada;
- registra a dimensao avaliada quando houver classificacao P/O/A;
- preserva o caminho logico da arvore quando houver decisao encadeada;
- falha de forma explicita quando os dados nao atendem as precondicoes.

## determinism_rate

`determinism_rate` representa uma adaptacao computacional da confiabilidade
interanalista.

Em avaliacao humana, a confiabilidade interanalista mede se avaliadores
independentes chegam a classificacoes compatíveis quando observam o mesmo caso.
No SERA, a adaptacao computacional mede se execucoes independentes da mesma
regra, com a mesma entrada e o mesmo contrato, convergem para a mesma decisao.

Essa metrica nao substitui revisao conceitual humana. Ela verifica se a regra
esta operacionalmente estavel o bastante para que divergencias restantes sejam
tratadas como problema de criterio, dados ou modelagem da arvore, e nao como
variacao acidental de execucao.

## Uso no Step 2

Para Goal, Perception e Action, `determinism_rate` deve ser lido no contexto da
arvore de decisao. O alvo nao e apenas repetir o mesmo codigo de falha, mas
repetir o mesmo caminho logico ate a decisao final.

