# Política de Duplicidade de Eventos — HFA

## Princípio

Eventos duplicados distorcem todas as métricas do sistema: Dashboard, Perfil de Risco, distribuição P/O/A, ERC, e relatórios. Cada ocorrência real deve ser representada por exatamente um registro canônico.

## Definição de Duplicidade

### Nível A — Duplicata Exata
- Mesmo tenant
- Título normalizado idêntico
- Hash de narrativa idêntico (SHA-256 dos primeiros 16 bytes)
- Mesma data de ocorrência
- Mesma referência/fonte

**Ação:** Soft-delete automático dos duplicados após validação de ausência de conflitos.

### Nível B — Duplicata Altamente Provável
- Mesmo tenant
- Título normalizado idêntico
- Narrativas diferentes (eventos de teste ou submissões repetidas)
- OU: mesma data + título + tenant, mas fonte diferente

**Ação:** Exige revisão. Soft-delete permitido após confirmação de que são eventos repetidos, não ocorrências distintas.

### Nível C — Possível Duplicata
- Similaridade parcial de título (>80%)
- Mesmo tenant
- Evidência insuficiente para decisão automática

**Ação:** Não excluir automaticamente. Revisão humana obrigatória.

## O Que NÃO Configura Duplicidade

- Títulos semelhantes em tenants diferentes
- Eventos com datas diferentes e narrativas diferentes (mesmo com título similar)
- Eventos soft-deleted comparados com ativos para nova duplicação
