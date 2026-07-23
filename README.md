# Serviscon Intelligence

Serviscon Intelligence é a plataforma web interna para marketing, atendimento, relacionamento e inteligência comercial da Serviscon. Esta entrega implementa a fundação funcional do painel administrativo: autenticação local, estrutura multitenant, usuários, papéis, permissões, layout administrativo, dashboard inicial, banco PostgreSQL com Prisma, migration e seed de demonstração.

## Tecnologias

- Next.js, React e TypeScript em modo rigoroso.
- Tailwind CSS para UI responsiva e acessível.
- PostgreSQL com Prisma ORM, UUIDs, migrations versionadas e seed.
- Node Test Runner para regras críticas de autenticação e tenant.
- Docker Compose para PostgreSQL local.

## Requisitos

- Node.js 20 ou superior.
- npm 10 ou superior.
- Docker e Docker Compose para PostgreSQL local.

## Instalação

```bash
npm install
cp .env.example .env
```

Edite `.env` localmente e defina valores próprios para `NEXTAUTH_SECRET` e `SEED_DEMO_PASSWORD`. Não use credenciais reais em documentação, commits ou exemplos versionados.

## Banco de dados

```bash
docker compose up -d postgres
npm run db:generate
npm run db:migrate
npm run db:seed
```

A migration inicial cria `Organization`, `User` e `AuditLog`, com `organizationId` para isolamento multitenant e papéis/permissões para controle de acesso.

## Usuários de demonstração

O seed cria a organização `Serviscon` e usuários demo para Administrador, Marketing, Comercial, Operacional e Gestor. A senha desses usuários deve ser definida localmente por `SEED_DEMO_PASSWORD` antes de executar o seed.

## Execução local

```bash
npm run dev
```

A aplicação inicia em `http://localhost:3000`. A rota raiz redireciona para `/dashboard`; usuários não autenticados são redirecionados para `/login`.

## Testes e qualidade

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run format
```

## Estrutura de pastas

- `src/app`: rotas do Next.js, login, layout administrativo e dashboard.
- `src/components/admin`: componentes do layout administrativo.
- `src/lib`: infraestrutura compartilhada, incluindo Prisma e compatibilidade de tenant.
- `src/modules/auth`: autenticação, hash/verificação de senha, sessão e server action de login.
- `src/modules/organizations`: regras de isolamento multitenant.
- `src/modules/permissions`: RBAC e matriz de permissões.
- `src/modules/users`: dados utilitários para seed de usuários demo.
- `prisma`: schema, migrations e seed do banco.
- `tests`: testes automatizados de autenticação e isolamento por organização.
- `docs`: documentação técnica, produto, arquitetura e decisões.

## Comandos disponíveis

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: build de produção.
- `npm run start`: servidor de produção após build.
- `npm run lint`: lint do projeto.
- `npm run typecheck`: verificação TypeScript.
- `npm run test`: testes automatizados.
- `npm run db:generate`: gera Prisma Client.
- `npm run db:migrate`: executa migration local.
- `npm run db:seed`: carrega organização e usuários de demonstração.
