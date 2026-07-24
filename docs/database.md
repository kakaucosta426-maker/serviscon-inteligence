# Banco de Dados

## Diretrizes

- PostgreSQL como banco transacional.
- Prisma ORM com migrations versionadas.
- UUIDs como identificadores públicos.
- `organizationId` em entidades pertencentes a uma organização.
- `createdAt`, `updatedAt` e `deletedAt` quando houver exclusão lógica.
- Índices por organização, estágio, entidade e campos de deduplicação.

## Entidades iniciais

- `Organization`: cliente/tenant da plataforma.
- `User`: usuário interno com papel.
- `Company`: empresa cliente ou prospect.
- `Contact`: pessoa vinculada ou não a empresa.
- `Lead`: oportunidade inicial captada por formulário, WhatsApp, campanhas ou entrada manual.
- `PipelineStage`: etapa configurável do funil.
- `Opportunity`: negociação no CRM.
- `Activity`: tarefa, ligação, reunião, mensagem, visita ou follow-up.
- `TechnicalVisit`: agendamento e diagnóstico técnico.
- `AuditLog`: registro de ações relevantes.

## Deduplicação

A primeira camada usa restrições únicas por organização para documento de empresa e e-mail de contato. Regras futuras devem considerar telefone normalizado, domínio de e-mail, similaridade de nomes e revisão humana antes de mesclar registros.
