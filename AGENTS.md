# Regras para agentes Codex

- Responder em português do Brasil quando a tarefa vier em português.
- Antes de alterar código, verificar estrutura, instruções e estado do Git.
- Nunca versionar segredos, tokens, senhas ou credenciais reais.
- Manter TypeScript rigoroso; não ignorar erros de lint, typecheck ou testes sem registrar motivo.
- Preservar isolamento multitenant usando `organizationId` em entidades de negócio.
- Evitar módulos genéricos desorganizados; preferir `src/modules/<dominio>`.
- Documentar decisões arquiteturais relevantes em `docs/decisions`.
- Usar componentes acessíveis, responsivos e com estados de carregamento, erro, vazio e sucesso.
- Não implementar integrações reais sem credenciais e aprovação explícita.
