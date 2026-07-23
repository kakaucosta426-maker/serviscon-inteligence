# Serviscon Intelligence

Serviscon Intelligence é a base de uma plataforma web interna para centralizar marketing, atendimento, CRM, visitas técnicas, propostas, relatórios e inteligência comercial da Serviscon. A fundação já considera evolução futura para SaaS multitenant para empresas de facilities.

## Tecnologias

- Next.js, React e TypeScript em modo rigoroso.
- Tailwind CSS para UI responsiva e consistente.
- PostgreSQL com Prisma ORM, UUIDs, migrations versionadas e seed.
- Vitest para testes automatizados planejados.
- Docker para dependências locais.

## Requisitos

- Node.js 20 ou superior.
- npm 10 ou superior.
- Docker e Docker Compose para PostgreSQL local.

## Instalação

```bash
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

## Variáveis de ambiente

Use `.env.example` como referência. Nunca versionar `.env` real, tokens, chaves ou credenciais.

## Banco de dados

O banco principal é PostgreSQL. Entidades de negócio possuem `organizationId` para isolamento multitenant, timestamps e exclusão lógica quando aplicável.

## Execução local

```bash
npm run dev
```

A aplicação inicia em `http://localhost:3000`.

## Testes e qualidade

```bash
npm run lint
npm run typecheck
npm run test
npm run format
```

## Estrutura de pastas

- `src/app`: rotas e layout do Next.js App Router.
- `src/lib`: utilitários compartilhados, incluindo helpers de tenant.
- `src/modules`: domínios de negócio organizados por módulo.
- `prisma`: schema e seed do banco.
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
- `npm run db:seed`: carrega dados de demonstração.
