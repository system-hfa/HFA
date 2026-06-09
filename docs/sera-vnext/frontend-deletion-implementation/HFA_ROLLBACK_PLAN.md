# HFA Rollback Plan

Rollback lógico:
- não chamar as novas rotas de exclusão
- manter `DELETE /api/events/:id` bloqueado
- reverter migration aditiva apenas com plano manual controlado

Rollback de UX:
- remover CTA de exclusão recuperável
- manter somente leitura de eventos e restauração desligada
