# HFA Event Deletion Corrective Actions

Política implementada:
- exclusão bloqueada se existir ação corretiva `pending` ou `in_progress`
- nenhuma cascade é disparada pelo novo fluxo

Limitação:
- o banco legado ainda mantém FKs antigas; a mitigação desta fase é de lifecycle/API, não de purge real
