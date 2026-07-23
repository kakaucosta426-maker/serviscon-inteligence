# Arquitetura

## Decisão recomendada

O MVP usa Next.js modular com App Router, Server Components, Server Actions onde necessário, TypeScript rigoroso, Prisma e PostgreSQL. Essa escolha reduz complexidade operacional inicial e mantém fronteiras claras por domínio. Um NestJS separado poderá ser extraído quando integrações, filas, webhooks e regras assíncronas exigirem escala independente.

## Entrega funcional atual

- Autenticação local com hash PBKDF2-SHA512 e tratamento de erro sem expor detalhes sensíveis.
- Sessão HTTP-only para acesso ao layout administrativo.
- Layout administrativo com menu principal e dashboard inicial.
- RBAC inicial por papéis: Administrador, Marketing, Comercial, Operacional e Gestor.
- Estrutura multitenant por `organizationId` e helpers de validação de tenant.
- Prisma schema, migration SQL e seed de demonstração.
- Testes de autenticação e isolamento por organização.

## Módulos previstos

- autenticação;
- organizações;
- usuários e permissões;
- contatos e empresas;
- leads;
- oportunidades e pipelines;
- atividades;
- visitas técnicas;
- propostas;
- mensagens;
- automações;
- integrações;
- campanhas;
- relatórios;
- auditoria;
- inteligência artificial.

## Padrões

- Toda regra de negócio deve ficar em `src/modules/<dominio>`.
- Acesso a dados deve receber contexto de organização e usuário.
- APIs e Server Actions devem validar entrada e retornar erros seguros.
- UI deve expor estados de carregamento, erro, vazio e sucesso conforme a funcionalidade evoluir.
- Integrações externas devem usar portas e adaptadores.

## Multitenancy

O isolamento inicial é por coluna `organizationId`, obrigatória nas entidades de negócio. Queries devem sempre filtrar por organização derivada da sessão. Em produção, recomenda-se adicionar Row Level Security no PostgreSQL para defesa em profundidade.
