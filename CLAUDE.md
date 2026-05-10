## ⚠️ Regras de Operação (OBRIGATÓRIO — válido para todas as sessões)

### Eficiência de contexto
- Leia APENAS arquivos explicitamente listados na tarefa
- NUNCA explore estrutura de pastas sem pedido explícito
- NUNCA rode comandos de diagnóstico antes de agir
- Máximo 3 arquivos lidos por tarefa salvo instrução contrária
- Se precisar de mais contexto: pergunte antes de ler, nunca explore por conta própria

### Git
- NUNCA usar git worktree — trabalhar sempre no branch atual do repositório principal
- Commits pequenos e atômicos por tarefa
- Mensagem de commit: tipo(escopo): descrição em português
- Sempre verificar em qual branch está antes de commitar

### Código
- Classes Tailwind: NUNCA usar template literals em className (ex: `bg-${cor}-500`)
- Cores dinâmicas: sempre usar objeto de mapeamento estático
- Fetch no cliente: sempre incluir header Authorization: Bearer token
- Erros: nunca catch silencioso — sempre logar ou relançar
- Sem comentários desnecessários no código

### Stack (referência rápida)
- Next.js 14 App Router + TypeScript + Tailwind CSS + Supabase
- Runtime de produção: Next.js puro — pasta backend/ é legado, ignorar completamente
- Pipeline SERA: frontend/src/lib/sera/
- Auth: requireBearerUser em frontend/src/lib/server/api-auth.ts
- Multi-tenant: sempre filtrar por tenant_id nas queries Supabase
