# HFA Event Deletion Storage

Estado atual:
- inventário mínimo por `analyses.source_file_url`
- purge somente em `DRY_RUN`
- sem remoção de objeto durante soft delete

Objetivo preservado:
- manter anexos durante a janela de recuperação
- só executar remoção definitiva quando houver purge controlado autorizado
