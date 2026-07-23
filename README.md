# Serviscon Intelligence

Serviscon Intelligence é a plataforma web interna para marketing, atendimento, relacionamento e inteligência comercial da Serviscon. Esta entrega implementa a fundação funcional do painel administrativo: autenticação local, sessão persistida, proteção básica contra tentativas repetidas de login, logout, estrutura multitenant, usuários, papéis, permissões, layout administrativo, dashboard inicial, banco PostgreSQL com Prisma, migration e seed de demonstração.

## Tecnologias

- Next.js, React e TypeScript em modo rigoroso.
- Tailwind CSS para UI responsiva e acessível.
- PostgreSQL com Prisma ORM, UUIDs, migrations versionadas e seed manual.
- Node Test Runner para regras críticas de autenticação, rate limiting e tenant.
- Docker Compose para PostgreSQL local.
- npm como gerenciador de pacotes único, usando o registry oficial `https://registry.npmjs.org/`.

## Requisitos

- Node.js 24 LTS. A versão recomendada está em `.nvmrc`.
- npm 10 ou superior.
- Docker e Docker Compose para PostgreSQL local.

## Instalação

```bash
npm install
cp .env.example .env
```

Edite `.env` localmente e defina valores próprios para `SEED_DEMO_PASSWORD`. Não use credenciais reais em documentação, commits ou exemplos versionados.

## Banco de dados

```bash
docker compose up -d postgres
npm run db:generate
npm run db:migrate
npm run db:seed
```

A migration inicial cria `Organization`, `User`, `Session` e `AuditLog`, com `organizationId` para isolamento multitenant e papéis/permissões para controle de acesso.

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

## Deploy na Vercel

- Root Directory: `.`.
- Framework Preset: Next.js.
- Package Manager: npm.
- Install Command: `npm install`.
- Build Command: `npm run build`.
- Output Directory: manter o padrão do Next.js.
- Node.js: 24.x, compatível com `.nvmrc` e `engines.node`.

O script de build executa `prisma generate && next build`, garantindo Prisma Client antes do build sem executar seed e sem rodar migrations destrutivas. Migrations devem ser aplicadas fora do build, em etapa controlada de release, usando conexão segura com o banco de produção:

```bash
npm run db:deploy
```

Variáveis necessárias na Vercel:

- `DATABASE_URL`: conexão PostgreSQL de produção.
- `APP_BASE_URL`: URL pública da aplicação.
- `SESSION_TTL`: duração da sessão, por exemplo `8h`.
- `LOGIN_RATE_LIMIT_MAX`: máximo de tentativas por janela, por exemplo `5`.
- `LOGIN_RATE_LIMIT_WINDOW`: janela do limite de login, por exemplo `15m`.
- `STORAGE_PROVIDER`: `local` no desenvolvimento; storage externo em produção futura.
- `QUEUE_PROVIDER`: `memory` no desenvolvimento; fila externa em produção futura.

`SEED_DEMO_PASSWORD` é apenas para ambientes de demonstração/homologação e não deve ser configurada para produção, salvo execução controlada e temporária de seed não produtivo.

Não há `vercel.json` porque o projeto segue a detecção padrão de Next.js da Vercel e não precisa de overrides neste momento.


## Referência visual e posicionamento

A interface administrativa usa como referência conceitual o site institucional da Serviscon, priorizando uma identidade corporativa para terceirização premium, gestão completa, equipe qualificada, qualidade operacional e os serviços de limpeza, portaria, recepção, jardinagem, supervisão e manutenção predial. A plataforma não copia imagens ou ativos externos; os elementos foram reinterpretados para uso interno no painel.

## Estrutura de pastas

- `src/app`: rotas do Next.js, login, layout administrativo e dashboard.
- `src/components/admin`: componentes do layout administrativo.
- `src/lib`: infraestrutura compartilhada, incluindo Prisma e compatibilidade de tenant.
- `src/modules/auth`: autenticação, hash/verificação de senha, sessão persistida, rate limiting, logout e server action de login.
- `src/modules/organizations`: regras de isolamento multitenant.
- `src/modules/permissions`: RBAC e matriz de permissões.
- `src/modules/users`: dados utilitários para seed de usuários demo.
- `prisma`: schema, migrations e seed do banco.
- `tests`: testes automatizados de autenticação, rate limiting e isolamento por organização.
- `docs`: documentação técnica, produto, arquitetura e decisões.

## Comandos disponíveis

- `npm run dev`: servidor de desenvolvimento.
- `npm run build`: gera Prisma Client e executa build de produção.
- `npm run start`: servidor de produção após build.
- `npm run lint`: lint do projeto.
- `npm run typecheck`: verificação TypeScript.
- `npm run test`: testes automatizados.
- `npm run db:generate`: gera Prisma Client.
- `npm run db:migrate`: executa migration de desenvolvimento.
- `npm run db:deploy`: aplica migrations em ambientes controlados com `prisma migrate deploy`.
- `npm run db:seed`: carrega organização e usuários de demonstração.


## Limitações atuais

- O rate limiting ainda é em memória e deve ser substituído por Redis, Upstash ou serviço equivalente antes de produção multi-instância.
- Ainda não há recuperação de senha, rotação automática de sessões expiradas nem Row Level Security no PostgreSQL.
- CRM, WhatsApp, campanhas, propostas, visitas técnicas e IA não fazem parte desta entrega.
