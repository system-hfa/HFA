# Regras de Merge de Dados — Duplicatas HFA

## Dados Simples

Campos vazios do canônico podem receber valores do duplicado somente quando:
- Não há conflito (campo vazio no canônico, preenchido no duplicado)
- Fonte é rastreável (registrado em audit log)
- Mudança é auditada com event_reconciliation_events

## Análises

- Se apenas um evento possui análise: preservar vínculo no canônico
- Se ambos possuem análises: manter ambas associadas ao grupo, marcar uma como `SUPERSEDED`
- NUNCA apagar análise revisada
- NUNCA recalcular automaticamente

## Revisões e Reviews

- Preservar histórico completo
- Mover vínculo para o canônico quando semanticamente equivalente
- Registrar movimentação em audit log

## Ações Corretivas

- NUNCA apagar ação corretiva
- Mover vínculo para o canônico somente se semanticamente seguro
- Ações abertas bloqueiam exclusão automática do duplicado
- Manter referência ao tombstone quando mover

## Anexos

- Detectar conteúdo igual por hash (SHA-256)
- Não duplicar anexos idênticos
- Preservar anexos únicos do duplicado no canônico
- NÃO apagar storage na soft-delete

## Audit Events

- Preservar todos os audit events originais
- Adicionar audit event de reconciliação
