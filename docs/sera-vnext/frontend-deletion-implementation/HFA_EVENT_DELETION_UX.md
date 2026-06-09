# HFA Event Deletion UX

Rotas atualizadas:
- `/events`
- `/events/deleted`
- `/reports/event/[id]`
- `/reports/executive`

Regras aplicadas:
- não usar `Excluir` isolado
- usar `Excluir evento e dados relacionados`
- separar `Desconsiderar do Perfil de Risco`
- exibir área explícita de eventos excluídos
- mostrar prazo de recuperação
- remover fallback demo silencioso em relatórios produtivos

Limitação:
- a ação de exclusão profunda foi implementada na lista de eventos; a tela detalhada ainda precisa paridade total de CTA.
