# Arquitetura

## Decisão recomendada

O MVP deve usar Next.js modular com App Router, Server Components, Server Actions/API Routes conforme necessidade, TypeScript rigoroso, Prisma e PostgreSQL. Essa escolha reduz complexidade operacional inicial e mantém fronteiras claras por domínio. Um NestJS separado poderá ser extraído quando integrações, filas, webhooks e regras assíncronas exigirem escala independente.

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
- APIs devem validar entrada com schemas tipados.
- UI deve expor estados de carregamento, erro, vazio e sucesso.
- Integrações externas devem usar portas e adaptadores.

## Multitenancy

O isolamento inicial será por coluna `organizationId`, obrigatória nas entidades de negócio. Queries devem sempre filtrar por organização derivada da sessão. Em produção, recomenda-se adicionar Row Level Security no PostgreSQL para defesa em profundidade.

## Infraestrutura futura

- PostgreSQL gerenciado.
- Storage S3 compatível para anexos.
- Redis/filas para webhooks, notificações, IA e sincronizações.
- Observabilidade com logs estruturados, métricas e tracing.
