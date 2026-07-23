# Banco de Dados

## Entrega funcional inicial

O banco inicial cobre autenticação, estrutura multitenant, usuários, perfis/permissões e auditoria. CRM, contatos, leads, atividades, visitas técnicas e propostas permanecem planejados para fases seguintes.

## Diretrizes

- PostgreSQL como banco transacional.
- Prisma ORM com migrations versionadas.
- UUIDs como identificadores públicos.
- `organizationId` nas entidades pertencentes a uma organização.
- `createdAt`, `updatedAt` e `deletedAt` quando houver exclusão lógica.
- Índices por organização, papel e entidade auditada.

## Entidades criadas agora

- `Organization`: tenant/cliente da plataforma.
- `User`: usuário autenticável com `passwordHash`, papel, permissões, status ativo, timestamps e vínculo obrigatório à organização.
- `AuditLog`: registro de ações relevantes por organização.

## Seed de demonstração

O seed cria a organização `Serviscon` e cinco usuários de demonstração: Administrador, Marketing, Comercial, Operacional e Gestor. A senha é lida de `SEED_DEMO_PASSWORD` e não deve ser documentada com valor real.

## Próximas entidades planejadas

- `Company`, `Contact`, `Lead`, `PipelineStage`, `Opportunity`, `Activity`, `TechnicalVisit`, `Proposal` e anexos serão introduzidos quando suas funcionalidades forem implementadas.
